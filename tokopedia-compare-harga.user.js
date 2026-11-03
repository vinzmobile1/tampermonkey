// ==UserScript==
// @name         Tokopedia Compare Harga
// @namespace    compare-harga
// @version      1.5
// @description  Tangkap hasil SearchProductV5Query di halaman pencarian Tokopedia, tampilkan di tabel dengan sort harga & pencarian
// @match        https://www.tokopedia.com/*
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==
/* global module */ // module hanya ada saat dites di Node

(function () {
  'use strict';

  // Response GraphQL Tokopedia berupa array (batched); ambil products dari tiap SearchProductV5Query
  function extractProducts(json) {
    return [].concat(json).flatMap(r => r?.data?.searchProductV5?.data?.products || []).map(p => ({
      id: p.id,
      name: p.name,
      url: p.url,
      shop: p.shop?.name || '',
      city: p.shop?.city || '',
      priceText: p.price?.text || '',
      price: p.price?.number || 0,
      original: p.price?.original || '',
      // "100+ terjual" ada di labelGroups (position ri_product_credibility)
      sold: (p.labelGroups || []).find(l => /terjual/i.test(l.title || ''))?.title || '',
      badgeUrl: p.badge?.url || '',
    }));
  }

  // shortcut: tipe toko ditebak dari nama file badge; baru badge_os (Mall) yang terkonfirmasi, tambah pola kalau ketemu URL lain
  function shopType(badgeUrl) {
    if (!badgeUrl) return 'Toko Biasa';
    if (/official_store|badge_os/i.test(badgeUrl)) return 'Mall';
    if (/power|pm_|_pm|gold/i.test(badgeUrl)) return 'Power Shop';
    return '';
  }

  // "Rp20.999.000" -> 20999000 ; "1,5rb+ terjual" -> 1500
  const priceNum = s => Number(String(s).replace(/\D/g, '')) || 0;
  const soldNum = s => (parseFloat(String(s).replace(',', '.')) || 0) * (/rb/i.test(s) ? 1e3 : /jt/i.test(s) ? 1e6 : 1);

  const SORTS = {
    name: p => p.name.toLowerCase(),
    shop: p => p.shop.toLowerCase(),
    city: p => p.city.toLowerCase(),
    price: p => p.price,
    original: p => priceNum(p.original),
    sold: p => soldNum(p.sold),
  };

  function sortProducts(list, key, dir) {
    const f = SORTS[key], m = dir === 'asc' ? 1 : -1;
    return [...list].sort((a, b) => {
      const x = f(a), y = f(b);
      return m * (typeof x === 'string' ? x.localeCompare(y) : x - y);
    });
  }

  // Varian ada di component "new_variant_options" -> data[0].children (response PDPMainInfo)
  function extractVariants(json) {
    const comp = [].concat(json)[0]?.data?.pdpMainInfo?.components?.find(c => c.name === 'new_variant_options');
    return (comp?.data?.[0]?.children || []).map(c => ({
      productName: c.productName,
      stock: c.stock?.stock ?? '',
      price: Number(c.price) || 0,
      priceFmt: c.priceFmt || '',
      slashPriceFmt: c.slashPriceFmt || '',
      productURL: c.productURL,
    })).sort((a, b) => a.price - b.price);
  }

  if (typeof module !== 'undefined') { module.exports = { extractProducts, extractVariants, shopType, soldNum, sortProducts }; return; }

  const products = new Map(); // id -> product, supaya scroll/request ulang tidak dobel
  const variants = new Map(); // id -> 'loading' | Error | array varian (cache, dipanggil sekali per produk)
  const openIds = new Set();  // baris yang detailnya sedang terbuka (bertahan saat tabel re-render)
  let currentQ = null;
  let sortKey = 'price', sortDir = 'asc';

  function add(json) {
    const q = new URLSearchParams(location.search).get('q');
    if (q !== currentQ) { products.clear(); currentQ = q; } // pencarian baru -> reset
    for (const p of extractProducts(json)) products.set(p.id, p);
    render();
  }

  // Pola deteksi sama dengan Tokopedia Scraper Pro 6.4: hook fetch milik halaman (unsafeWindow), bukan sandbox
  const isTarget = url => String(url).includes('graphql/SearchProductV5Query');
  const page = unsafeWindow;

  const origFetch = page.fetch;
  page.fetch = async function (...args) {
    const res = await origFetch.apply(page, args);
    const url = typeof args[0] === 'string' ? args[0] : args[0]?.url;
    if (res.ok && isTarget(url)) {
      // Tokopedia sering abort request (AbortController); ambil data saat halaman sendiri membaca body
      const origText = res.text.bind(res), origJson = res.json.bind(res);
      res.text = () => origText().then(t => { try { add(JSON.parse(t)); } catch (e) {} return t; });
      res.json = () => origJson().then(d => { add(d); return d; });
      // Cadangan kalau halaman membaca lewat body stream; abort = request dibatalkan, abaikan
      res.clone().json().then(add).catch(e => {
        if (e.name !== 'AbortError') console.error('CompareHarga: gagal proses SearchProductV5Query', e);
      });
    }
    return res;
  };

  // Cadangan kalau Tokopedia memakai XHR
  const origOpen = page.XMLHttpRequest.prototype.open;
  page.XMLHttpRequest.prototype.open = function (method, url) {
    if (isTarget(url)) this.addEventListener('load', () => { try { add(JSON.parse(this.responseText)); } catch (e) {} });
    return origOpen.apply(this, arguments);
  };

  // Query ringkas PDPMainInfo: hanya field varian yang dipakai
  const PDP_QUERY = `query PDPMainInfo($productKey: String, $shopDomain: String, $layoutID: String, $extraPayload: String, $queryParam: String, $source: String, $userLocation: pdpUserLocation) {
    pdpMainInfo(shopDomain: $shopDomain, productKey: $productKey, layoutID: $layoutID, extraPayload: $extraPayload, queryParam: $queryParam, source: $source, userLocation: $userLocation) {
      components { name data { ... on pdpDataProductVariant { children { productName price priceFmt slashPriceFmt productURL stock { stock } } } } }
    }
  }`;

  async function loadVariants(p) {
    variants.set(p.id, 'loading');
    render();
    try {
      // URL produk: https://www.tokopedia.com/<shopDomain>/<productKey>?...
      const parts = new URL(p.url).pathname.split('/').filter(Boolean);
      const res = await origFetch.call(page, 'https://gql.tokopedia.com/graphql/PDPMainInfo', {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json', 'x-source': 'tokopedia-lite', 'x-device': 'desktop', 'x-tkpd-akamai': 'pdpMainInfo' },
        body: JSON.stringify([{
          operationName: 'PDPMainInfo',
          variables: { productKey: parts[parts.length - 1], shopDomain: parts[0], layoutID: '', extraPayload: '', queryParam: '', source: 'P1', userLocation: {} },
          query: PDP_QUERY,
        }]),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json?.[0]?.errors) throw new Error(json[0].errors[0]?.message || 'GraphQL error');
      variants.set(p.id, extractVariants(json));
    } catch (e) {
      console.error('CompareHarga: gagal ambil varian', e);
      variants.set(p.id, e);
    }
    render();
  }

  function toggleDetail(p) {
    if (openIds.has(p.id)) openIds.delete(p.id);
    else { openIds.add(p.id); if (!variants.has(p.id) || variants.get(p.id) instanceof Error) loadVariants(p); }
    render();
  }

  function detailRow(p) {
    const tr = document.createElement('tr');
    tr.className = 'tch-detail';
    const td = tr.insertCell();
    td.colSpan = 9;
    const v = variants.get(p.id);
    if (v === 'loading' || v === undefined) { td.textContent = 'Memuat varian...'; return tr; }
    if (v instanceof Error) { td.textContent = `Gagal memuat varian: ${v.message} (klik Detail lagi untuk coba ulang)`; return tr; }
    if (!v.length) { td.textContent = 'Produk ini tidak punya varian.'; return tr; }
    const table = document.createElement('table');
    table.innerHTML = '<thead><tr><th>Nama Varian</th><th>Stok</th><th>Price</th><th>Harga</th><th>Harga Coret</th><th>URL</th></tr></thead>';
    const body = table.createTBody();
    for (const x of v) {
      const r = body.insertRow();
      const cell = (text, cls) => { const c = r.insertCell(); c.textContent = text; if (cls) c.className = cls; return c; };
      cell(x.productName);
      cell(x.stock, 'num');
      cell(x.price, 'num');
      cell(x.priceFmt, 'num');
      cell(x.slashPriceFmt || '-', x.slashPriceFmt ? 'num orig' : 'num');
      const a = document.createElement('a');
      a.href = x.productURL; a.target = '_blank'; a.textContent = 'Buka';
      cell('').appendChild(a);
    }
    td.appendChild(table);
    return tr;
  }

  // ---------- UI ----------
  let badge, modal, tbody, searchInput, info;

  function buildUI() {
    const css = document.createElement('style');
    css.textContent = `
      #tch-btn{position:fixed;bottom:12px;left:12px;z-index:2147483646;background:#03ac0e;color:#fff;border:0;border-radius:8px;padding:8px 14px;font:600 13px sans-serif;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.25)}
      #tch-modal{position:fixed;inset:5vh 5vw;z-index:2147483647;background:#fff;border-radius:10px;box-shadow:0 8px 40px rgba(0,0,0,.4);display:none;flex-direction:column;font:13px sans-serif;color:#222}
      #tch-modal header{display:flex;gap:8px;align-items:center;padding:12px;border-bottom:1px solid #ddd}
      #tch-modal header input{flex:1;padding:7px 10px;border:1px solid #ccc;border-radius:6px}
      #tch-modal header button{padding:7px 12px;border:1px solid #ccc;border-radius:6px;background:#f6f6f6;cursor:pointer}
      #tch-q{padding:10px 12px 0;font-size:15px}
      #tch-modal .wrap{overflow:auto;flex:1}
      #tch-modal table{border-collapse:collapse;width:100%}
      #tch-modal th,#tch-modal td{border-bottom:1px solid #eee;padding:6px 8px;text-align:left;vertical-align:top}
      #tch-modal th{position:sticky;top:0;background:#fafafa}
      #tch-modal td.num{white-space:nowrap;text-align:right}
      #tch-modal td.orig{color:#999;text-decoration:line-through}
      #tch-modal td a{color:#03ac0e;word-break:break-all}
      #tch-modal .tch-dbtn{padding:4px 10px;border:1px solid #03ac0e;border-radius:6px;background:#fff;color:#03ac0e;cursor:pointer;white-space:nowrap}
      #tch-modal .tch-dbtn.open{background:#03ac0e;color:#fff}
      #tch-modal tr.tch-detail>td{background:#f3fbf4;padding:8px 8px 8px 40px}
      #tch-modal tr.tch-detail th{position:static;background:#e6f5e8}
      #tch-modal th[data-sort]{cursor:pointer;user-select:none;white-space:nowrap}
      #tch-modal th[data-sort]:hover{background:#eef7ef}
      #tch-modal th.sorted{color:#03ac0e}
      #tch-modal .tch-badge{display:inline-flex;align-items:center;gap:4px;margin-top:3px;font-size:11px;color:#666}
      #tch-modal .tch-badge img{height:16px}`;
    document.head.appendChild(css);

    badge = document.createElement('button');
    badge.id = 'tch-btn';
    badge.onclick = () => { modal.style.display = 'flex'; render(); searchInput.focus(); };

    modal = document.createElement('div');
    modal.id = 'tch-modal';
    modal.innerHTML = `
      <header>
        <strong>Compare Harga</strong><span id="tch-info"></span>
        <input id="tch-search" placeholder="Cari nama produk / toko / kota...">
        <button id="tch-close">Tutup</button>
      </header>
      <div id="tch-q"></div>
      <div class="wrap"><table>
        <thead><tr><th>#</th><th data-sort="name">Nama Produk</th><th>URL</th><th data-sort="shop">Nama Toko</th><th data-sort="city">Kota</th><th data-sort="price">Harga Final</th><th data-sort="original">Harga Original</th><th data-sort="sold">Terjual</th><th></th></tr></thead>
        <tbody></tbody>
      </table></div>`;
    tbody = modal.querySelector('tbody');
    info = modal.querySelector('#tch-info');
    searchInput = modal.querySelector('#tch-search');
    searchInput.oninput = render;
    // Klik nama kolom: kolom sama -> balik arah, kolom lain -> mulai dari asc
    for (const th of modal.querySelectorAll('thead th[data-sort]')) {
      th.dataset.label = th.textContent;
      th.onclick = () => {
        sortDir = sortKey === th.dataset.sort && sortDir === 'asc' ? 'desc' : 'asc';
        sortKey = th.dataset.sort;
        render();
      };
    }
    modal.querySelector('#tch-close').onclick = () => { modal.style.display = 'none'; };
    document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.style.display = 'none'; });
    // Klik di luar modal (selain tombol Show Data) = tutup
    document.addEventListener('mousedown', e => {
      if (modal.style.display === 'flex' && !modal.contains(e.target) && !badge.contains(e.target)) modal.style.display = 'none';
    });

    document.body.append(badge, modal);
    render();
  }

  function render() {
    if (!badge) return;
    badge.textContent = products.size ? `✔ ${products.size} produk ter-scrape · Show Data` : 'Belum ada data · Show Data';
    if (modal.style.display !== 'flex') return;

    for (const th of modal.querySelectorAll('thead th[data-sort]')) {
      const on = th.dataset.sort === sortKey;
      th.className = on ? 'sorted' : '';
      th.textContent = th.dataset.label + (on ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ' ⇅');
    }
    const kw = searchInput.value.trim().toLowerCase();
    const rows = sortProducts(
      [...products.values()].filter(p => !kw || `${p.name} ${p.shop} ${p.city}`.toLowerCase().includes(kw)),
      sortKey, sortDir);
    info.textContent = `(${rows.length} dari ${products.size})`;
    modal.querySelector('#tch-q').textContent = `Hasil pencarian: "${currentQ || '-'}"`;

    tbody.replaceChildren(...rows.flatMap((p, i) => {
      const tr = document.createElement('tr');
      const cell = (text, cls) => { const td = tr.insertCell(); td.textContent = text; if (cls) td.className = cls; return td; };
      cell(i + 1);
      cell(p.name);
      const a = document.createElement('a');
      a.href = p.url; a.target = '_blank'; a.textContent = p.url.split('?')[0]; // tampilkan tanpa tracking param
      cell('').appendChild(a);
      const shopTd = cell(p.shop);
      const b = document.createElement('div');
      b.className = 'tch-badge';
      if (p.badgeUrl) { const img = document.createElement('img'); img.src = p.badgeUrl; img.alt = ''; b.appendChild(img); }
      b.append(shopType(p.badgeUrl));
      shopTd.append(document.createElement('br'), b);
      cell(p.city);
      cell(p.priceText, 'num');
      cell(p.original || '-', p.original ? 'num orig' : 'num');
      cell(p.sold || '-', 'num');
      const btn = document.createElement('button');
      const open = openIds.has(p.id);
      btn.className = open ? 'tch-dbtn open' : 'tch-dbtn';
      btn.textContent = open ? 'Detail ▲' : 'Detail ▼';
      btn.onclick = () => toggleDetail(p);
      cell('').appendChild(btn);
      return open ? [tr, detailRow(p)] : [tr];
    }));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildUI);
  else buildUI();
})();
