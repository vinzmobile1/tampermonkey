// ==UserScript==
// @name         Tokopedia Scraper
// @namespace    https://www.tokopedia.com/
// @version      6.3
// @description  Scrape produk dari toko atau kumpulkan dari pencarian (scroll), lalu ekspor ke Excel. Membutuhkan aktivasi.
// @author       Gemini AI & User
// @match        https://www.tokopedia.com/*
// @icon         https://ecs7.tokopedia.net/assets-unify/img/favicon.ico
// @require      https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        unsafeWindow
// @connect      gql.tokopedia.com
// @connect      script.google.com
// @connect      script.googleusercontent.com
// ==/UserScript==

(function() {
    'use strict';

const _0x20e8a7 = _0x1e7c;
(function (_0x51d6d6, _0x2e159a) {
    const _0x31098e = _0x1e7c, _0x493611 = _0x51d6d6();
    while (!![]) {
        try {
            const _0x264d75 = parseInt(_0x31098e(0x1f9)) / 0x1 * (parseInt(_0x31098e(0x248)) / 0x2) + parseInt(_0x31098e(0x2db)) / 0x3 + -parseInt(_0x31098e(0x2bc)) / 0x4 * (parseInt(_0x31098e(0x20a)) / 0x5) + -parseInt(_0x31098e(0x21f)) / 0x6 + parseInt(_0x31098e(0x2a0)) / 0x7 * (parseInt(_0x31098e(0x240)) / 0x8) + parseInt(_0x31098e(0x2a7)) / 0x9 + parseInt(_0x31098e(0x28f)) / 0xa * (-parseInt(_0x31098e(0x2cb)) / 0xb);
            if (_0x264d75 === _0x2e159a)
                break;
            else
                _0x493611['push'](_0x493611['shift']());
        } catch (_0x34aaa6) {
            _0x493611['push'](_0x493611['shift']());
        }
    }
}(_0x13df, 0x29085));
const API_URL = _0x20e8a7(0x21a), STATE_KEY = _0x20e8a7(0x265), UI_STATE_KEY = _0x20e8a7(0x2c9);
let uiContainer, infoPanel, actionPanel, scrapeButton, statusArea, resultsActionPanel, showResultsButton, downloadExcelButton, currentScrapeMode = _0x20e8a7(0x1fb), scrapeContext = {}, isScraping = ![], lastScrapeResult = null, collectedSearchProducts = [], processedProductIds = new Set();
const CONCURRENT_REQUESTS = 0xa;
function _0x13df() {
    const _0x3c8400 = [
        '/search',
        '20px',
        'result',
        'tokopedia_scraper_activation_state',
        '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h3\x20style=\x22margin-top:0;\x20color:#00AA5B;\x22>Aktivasi\x20Scraper\x20Tokopedia</h3>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20style=\x22font-size:13px;\x20color:#555;\x22>Silakan\x20masukkan\x20akun\x20Anda.</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20type=\x22text\x22\x20id=\x22act_username\x22\x20placeholder=\x22Username\x22\x20style=\x22width:\x2095%;\x20padding:\x208px;\x20margin-bottom:\x2010px;\x20border:\x201px\x20solid\x20#ddd;\x20border-radius:\x204px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20type=\x22password\x22\x20id=\x22act_password\x22\x20placeholder=\x22Password\x22\x20style=\x22width:\x2095%;\x20padding:\x208px;\x20margin-bottom:\x2015px;\x20border:\x201px\x20solid\x20#ddd;\x20border-radius:\x204px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22act_btn_login\x22\x20style=\x22width:\x20100%;\x20padding:\x2010px;\x20background-color:\x20#007bff;\x20color:\x20white;\x20border:\x20none;\x20border-radius:\x204px;\x20cursor:\x20pointer;\x22>Aktivasi</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20id=\x22act_status\x22\x20style=\x22margin-top:\x2015px;\x20font-size:\x2013px;\x20color:\x20red;\x22></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20',
        '#666',
        'pathname',
        'Power\x20Merchant',
        'POST',
        'reload',
        'innerHTML',
        'book_new',
        '(Browser\x20ini)',
        'startsWith',
        '<img\x20src=\x22',
        'Format\x20URL\x20tidak\x20valid\x20untuk\x20parsing',
        'Proses\x20selesai!\x20(',
        'rating',
        'number',
        'Pencarian\x20\x22',
        'shopCore',
        '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20style=\x22font-size:13px;\x20margin:\x204px\x200;\x22>Username:\x20<strong>',
        'tokopedia_scrape_',
        'Arial',
        '10px\x2015px',
        'Mengambil\x20daftar\x20toko...\x20(Halaman\x20',
        'stringify',
        'Gagal\x20mengambil\x20halaman\x20',
        'book_append_sheet',
        'slice',
        'fetch',
        'badge_url_internal',
        'trim',
        'URL\x20produk\x20tidak\x20valid\x20atau\x20hilang.',
        'position:\x20fixed;\x20bottom:\x2020px;\x20left:\x2020px;\x20z-index:\x209999;\x20display:\x20flex;\x20flex-direction:\x20column;\x20width:\x20320px;\x20font-family:\x20Arial,\x20sans-serif;',
        'Username\x20dan\x20password\x20tidak\x20boleh\x20kosong.',
        'createElement',
        'numeric',
        'badgeUrl',
        'pointer',
        'body',
        'isGoldBadge',
        'scrape-status',
        '#28a745',
        'price',
        '501470lAVoOa',
        'product:\x20not\x20found',
        'Product\x20Not\x20Found',
        'white',
        'warn',
        'badge',
        'location',
        '</h3><div\x20class=\x22table-container\x22><table\x20id=\x22resultTable\x22><thead><tr>',
        'div',
        'https://gql.tokopedia.com/graphql/PDPGetLayoutQuery',
        'apply',
        'keys',
        '</th>',
        'then',
        'toggle-account-info',
        'bold',
        'button',
        '14NmiGSn',
        'info',
        'query\x20ShopProducts($sid:\x20String!,\x20$page:\x20Int,\x20$perPage:\x20Int,\x20$sort:\x20Int)\x20{\x20GetShopProduct(shopID:\x20$sid,\x20filter:\x20{page:\x20$page,\x20perPage:\x20$perPage,\x20sort:\x20$sort})\x20{\x20links\x20{\x20next\x20}\x20data\x20{\x20name\x20product_url\x20product_id\x20price\x20{\x20text_idr\x20}\x20}\x20}\x20}',
        'shopInfoByID',
        'links',
        '</h1><h3>Total\x20Produk:\x20',
        'expanded',
        '2336301olxwfi',
        'Mall',
        'block',
        'Official\x20Store',
        'random',
        'id-ID',
        'Fase\x201:\x20Menggunakan\x20Produk\x20Terkumpul...',
        '0.6',
        'SKU',
        'substr',
        'deviceId',
        'graphql/SearchProductV5Query',
        '<tr>',
        'countReview',
        'Reguler',
        'Gagal\x20validasi\x20sesi,\x20mengizinkan\x20penggunaan\x20offline.',
        'product_id',
        'https://www.tokopedia.com',
        'product_url',
        'filter',
        'GetShopProduct',
        '284EdPEXP',
        'N/A',
        'now',
        'Terjadi\x20kesalahan\x20saat\x20scraping:\x20',
        'Power\x20Shop',
        '15px',
        'json_to_sheet',
        'official_store_badge',
        '<h4\x20style=\x22margin:0;\x20color:#0056b3;\x20font-size:\x2015px;\x22>Info\x20Akun</h4><span\x20id=\x22toggle-account-info\x22\x20style=\x22cursor:\x20pointer;\x20font-weight:\x20bold;\x20padding:\x200\x205px;\x20font-size:\x2018px;\x20color:\x20#0056b3;\x22>[\x20-\x20]</span>',
        'errors',
        'query',
        'open',
        'replace',
        'tokopedia_scraper_ui_state',
        'join',
        '77rsDWmB',
        '300px',
        '<!DOCTYPE\x20html><html\x20lang=\x22id\x22><head><meta\x20charset=\x22UTF-8\x22><title>',
        'badge_url',
        'textContent',
        'Proses\x20Detail\x20(',
        '</h4>',
        'https://gql.tokopedia.com/graphql/ShopProducts',
        'add',
        'Mulai\x20Scrape\x20Toko\x20Ini',
        'store',
        'utils',
        'badgeText',
        'validate',
        'writeFile',
        '12px',
        '653547CpfGqg',
        '12px\x2015px',
        'collapsed',
        'goldmerchant',
        'login',
        'assign',
        'search',
        'document',
        '\x22\x20title=\x22',
        '#fff',
        'ShopProducts',
        '\x22\x20alt=\x22',
        'Gagal\x20membuka\x20tab\x20baru.\x20Mohon\x20izinkan\x20pop-up\x20untuk\x20situs\x20ini.',
        'shopStats',
        'Mengambil\x20detail...\x20(',
        'search_collecting',
        'Tampilkan\x20Hasil',
        'column',
        'shop',
        'addEventListener',
        'click',
        '<th>',
        'has',
        '</style></head><body><div\x20class=\x22container\x22><h1>',
        'display:\x20flex;\x20justify-content:\x20space-between;\x20align-items:\x20center;\x20margin-bottom:\x2010px;',
        'Scraper:\x20Gagal\x20proses\x20ShopInfoCore',
        'Fase\x202:\x20Mengambil\x20Detail...',
        'forEach',
        'productSold',
        '<a\x20href=\x22',
        'act_btn_logout',
        'query\x20PDPGetLayoutQuery($shopDomain:\x20String,\x20$productKey:\x20String,\x20$layoutID:\x20String,\x20$apiVersion:\x20Float)\x20{\x20pdpGetLayout(shopDomain:\x20$shopDomain,\x20productKey:\x20$productKey,\x20layoutID:\x20$layoutID,\x20apiVersion:\x20$apiVersion)\x20{\x20basicInfo\x20{\x20id:\x20productID\x20shopID\x20shopName\x20ttsPID\x20txStats\x20{\x20countSold\x20}\x20stats\x20{\x20countReview\x20rating\x20}\x20createdAt\x20status\x20url\x20}\x20}\x20}',
        'push',
        'searchProductV5',
        '5px',
        'Menggabungkan\x20data...',
        'map',
        'disabled',
        'clone',
        'getElementById',
        'toLocaleString',
        'value',
        'Shop\x20Name',
        'activeProduct',
        '16px',
        'URL\x20API\x20belum\x20dikonfigurasi\x20pada\x20skrip.',
        'scraper-info-panel',
        ')\x20Produk\x20Terkumpul',
        'stats',
        'flex',
        '</li>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<li><strong>Produk\x20Aktif:</strong>\x20',
        '<li\x20style=\x22font-size:11px;\x20color:',
        'function\x20makeTableSortable(tableId){const\x20table=document.getElementById(tableId);if(!table)return;const\x20headers=table.querySelectorAll(\x27thead\x20th\x27);let\x20sortDirections=Array.from(headers).map(()=>null);function\x20parseIndonesianNumber(text){const\x20parsableText=text.replace(/\x5c./g,\x27\x27).replace(\x27,\x27,\x27.\x27);return\x20parseFloat(parsableText)}headers.forEach((header,index)=>{header.addEventListener(\x27click\x27,()=>{const\x20tbody=table.querySelector(\x27tbody\x27);const\x20rows=Array.from(tbody.rows);const\x20currentDir=sortDirections[index];const\x20newDir=currentDir===\x27asc\x27?\x27desc\x27:\x27asc\x27;sortDirections.fill(null);headers.forEach(h=>h.querySelector(\x27span.sort-indicator\x27)?.remove());sortDirections[index]=newDir;const\x20indicator=document.createElement(\x27span\x27);indicator.className=\x27sort-indicator\x27;indicator.textContent=newDir===\x27asc\x27?\x27\x20▲\x27:\x27\x20▼\x27;header.appendChild(indicator);rows.sort((a,b)=>{const\x20cellA=a.cells[index].innerText.trim();const\x20cellB=b.cells[index].innerText.trim();const\x20numA=parseIndonesianNumber(cellA);const\x20numB=parseIndonesianNumber(cellB);let\x20comparison=0;if(!isNaN(numA)&&!isNaN(numB)){comparison=numA-numB}else{comparison=cellA.localeCompare(cellB,\x27id-ID\x27,{numeric:true,sensitivity:\x27base\x27})}return\x20newDir===\x27asc\x27?comparison:-comparison});tbody.append(...rows)})})};makeTableSortable(\x27resultTable\x27);',
        'tokopedia-scraper-container',
        'expiry_date',
        '.xlsx',
        '#007bff',
        'split',
        'string',
        'details',
        'activation-container',
        '1rEBdJN',
        'get',
        'none',
        '#007bff;\x20font-weight:bold;',
        'responseText',
        '\x22\x20target=\x22_blank\x22\x20rel=\x22noopener\x20noreferrer\x22>Link</a>',
        'ttsPID',
        '</span></h4>',
        'success',
        'status',
        'toString',
        'products',
        '<div\x20style=\x22padding:\x2010px;\x20text-align:\x20center;\x20color:\x20#888;\x22>Navigasi\x20ke\x20halaman\x20toko\x20atau\x20pencarian\x20untuk\x20memulai.</div>',
        '<h4\x20style=\x22margin:\x200\x200\x2010px\x200;\x20color:\x20#333;\x20display:\x20flex;\x20align-items:\x20center;\x20gap:\x208px;\x22><img\x20src=\x22',
        'URL\x20Parsing\x20Failed:\x20',
        '</td>',
        'DOMContentLoaded',
        '6605QCAOgI',
        '</li>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</ul>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22font-size:\x2011px;\x20color:\x20#999;\x20margin-top:\x2010px;\x22>Shop\x20ID:\x20',
        'txStats',
        'shopID',
        'center',
        'act_btn_login',
        'act_status',
        'data',
        '\x22\x20style=\x22height:\x2020px;\x20vertical-align:\x20middle;\x22><span>',
        'display',
        'username',
        'parse',
        'pdpGetLayout',
        'isArray',
        '8px',
        'logout',
        'https://script.google.com/macros/s/AKfycbzRR8AL1fK1z3gPfSFDOumDLYcKNbufDw5fMjGjO7EFJPIH1f6rTKK2o6zGvvc4f_3T/exec',
        'readyState',
        'http',
        'results-action-panel',
        '1px\x20solid\x20#eee',
        '129264lhSYQH',
        'Gagal\x20memproses\x20respon\x20API.',
        'style',
        'cssText',
        'basicInfo',
        'includes',
        '<strong>Scroll\x20ke\x20bawah</strong>\x20untuk\x20mengumpulkan\x20lebih\x20banyak\x20produk.',
        'background-color:\x20#fff;\x20border:\x201px\x20solid\x20#ddd;\x20border-radius:\x208px;\x20box-shadow:\x200\x204px\x2012px\x20rgba(0,0,0,0.15);',
        '14px',
        '</tr>',
        '18px',
        'interactive',
        'shopName',
        '</li>',
        'start-scrape-btn',
        'resolve',
        'scraping',
        'Memverifikasi...',
        'Tidak\x20ada\x20data\x20untuk\x20ditampilkan.',
        'remove',
        'body{font-family:-apple-system,BlinkMacSystemFont,\x22Segoe\x20UI\x22,Roboto,Helvetica,Arial,sans-serif;margin:0;background-color:#f4f4f4;color:#333}.container{max-width:95%;margin:20px\x20auto;padding:20px;background-color:#fff;box-shadow:0\x202px\x2010px\x20rgba(0,0,0,.1);border-radius:8px}h1{color:#00AA5B}.table-container{max-height:85vh;overflow:auto;border:1px\x20solid\x20#ddd}table{width:100%;border-collapse:collapse}th,td{padding:8px\x2012px;border:1px\x20solid\x20#ddd;text-align:left;vertical-align:top;white-space:nowrap}thead\x20th{position:sticky;top:0;background-color:#f2f2f2;font-weight:700;cursor:pointer;user-select:none}thead\x20th:hover{background-color:#e9e9e9}td.wrap-text{white-space:normal;min-width:250px;}span.sort-indicator{color:#333;font-size:0.9em;padding-left:5px;}',
        'Sesi\x20berakhir:\x20',
        'goldOS',
        'error',
        'url',
        'maximumFractionDigits',
        'appendChild',
        'account-details-content',
        'default_v3',
        'Fase\x201:\x20Mengambil\x20Daftar\x20Toko...',
        '#555;',
        '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20',
        'json',
        '421912OvtYFF',
        'message',
        '</li>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<li><strong>Produk\x20Terjual:</strong>\x20',
        'opacity',
        'length',
        '[\x20-\x20]',
        '#00AA5B',
        '<h4\x20style=\x22margin:\x200\x200\x2010px\x200;\x20color:\x20#333;\x22>Mode\x20Pencarian</h4><div\x20style=\x22font-size:\x2013px;\x20color:\x20#555;\x22>Keyword:\x20\x22<strong>',
        '103034YnIXpV',
        'Download\x20Excel\x20Langsung',
        '</strong></p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20style=\x22font-size:13px;\x20margin:\x204px\x200;\x22>Aktif\x20hingga:\x20<strong>',
        'type',
        'text_idr',
        'next',
        '\x20produk)',
        'Unknown',
        '</strong>\x22</div>',
        '#f7f7f7',
        'activated',
        'Shop\x20Badge',
        '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<ul\x20style=\x22list-style:\x20none;\x20margin:\x200;\x20padding:\x200;\x20font-size:\x2013px;\x20color:\x20#555;\x20line-height:\x201.6;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<li><strong>Lokasi:</strong>\x20',
        '0\x204px\x208px\x20rgba(0,0,0,0.1)',
        'finished',
        'Produk\x20Scraped',
        '<h4\x20style=\x22margin:\x200\x200\x2010px\x200;\x20color:\x20#333;\x22>',
        'tokopedia-lite',
        'Tokopedia\x20Scraper\x20Error:',
        'PDPGetLayoutQuery',
        'Terjadi\x20kesalahan.',
        'name',
        '</ul>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22act_btn_logout\x22\x20style=\x22width:\x20100%;\x20padding:\x206px;\x20background-color:\x20#dc3545;\x20color:\x20white;\x20border:\x20none;\x20border-radius:\x204px;\x20cursor:\x20pointer;\x20margin-top:\x2015px;\x20font-size:\x2013px;\x22>Logout\x20dari\x20Browser\x20Ini</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20',
        'write',
        'devices',
        '10px'
    ];
    _0x13df = function () {
        return _0x3c8400;
    };
    return _0x13df();
}
function interceptFetch() {
    const _0x16cb6c = _0x20e8a7, _0x21b493 = unsafeWindow['fetch'];
    unsafeWindow[_0x16cb6c(0x280)] = async function (..._0x2bb69d) {
        const _0x11d047 = _0x16cb6c, _0x489a32 = await _0x21b493[_0x11d047(0x299)](unsafeWindow, _0x2bb69d), _0x3f8698 = typeof _0x2bb69d[0x0] === _0x11d047(0x1f6) ? _0x2bb69d[0x0] : _0x2bb69d[0x0][_0x11d047(0x237)];
        if (_0x489a32['ok'] && !isScraping) {
            if (_0x3f8698[_0x11d047(0x224)]('graphql/ShopInfoCore')) {
                const _0x5a7649 = _0x489a32[_0x11d047(0x301)]();
                try {
                    const _0x574725 = (await _0x5a7649[_0x11d047(0x23f)]())[0x0];
                    if (_0x574725[_0x11d047(0x211)]?.[_0x11d047(0x2a3)]?.['result'][_0x11d047(0x244)] > 0x0) {
                        const _0x43186a = _0x574725[_0x11d047(0x211)]['shopInfoByID'][_0x11d047(0x264)][0x0];
                        let _0x4d0674 = _0x11d047(0x2b5), _0x378943 = '';
                        const _0x18a3ed = _0x43186a[_0x11d047(0x235)];
                        if (_0x18a3ed) {
                            if (_0x18a3ed['isOfficial'] === 0x1 && _0x18a3ed[_0x11d047(0x294)])
                                _0x4d0674 = 'Official\x20Store', _0x378943 = _0x18a3ed[_0x11d047(0x294)];
                            else
                                _0x18a3ed[_0x11d047(0x28b)] === 0x1 && _0x18a3ed[_0x11d047(0x294)] && (_0x4d0674 = _0x11d047(0x269), _0x378943 = _0x18a3ed[_0x11d047(0x294)]);
                        }
                        currentScrapeMode = _0x11d047(0x2d5), scrapeContext = {
                            'type': 'store',
                            'info': {
                                'shopID': _0x43186a[_0x11d047(0x276)][_0x11d047(0x20d)],
                                'name': _0x43186a[_0x11d047(0x276)]['name'],
                                'activeProduct': _0x43186a[_0x11d047(0x306)],
                                'location': _0x43186a[_0x11d047(0x295)],
                                'productSold': _0x43186a[_0x11d047(0x2e8)]['productSold'],
                                'badgeText': _0x4d0674,
                                'badgeUrl': _0x378943
                            }
                        };
                        if (uiContainer)
                            updateUI();
                    }
                } catch (_0x5614ea) {
                    console[_0x11d047(0x236)](_0x11d047(0x2f4), _0x5614ea);
                }
            } else {
                if (_0x3f8698[_0x11d047(0x224)](_0x11d047(0x2b2))) {
                    const _0x514869 = _0x489a32['clone']();
                    try {
                        const _0x3226ba = (await _0x514869['json']())[0x0], _0x4d702b = _0x3226ba?.['data']?.[_0x11d047(0x2fc)]?.[_0x11d047(0x211)]?.[_0x11d047(0x204)];
                        if (_0x4d702b && Array[_0x11d047(0x217)](_0x4d702b)) {
                            _0x4d702b[_0x11d047(0x2f6)](_0x18c870 => {
                                const _0x366591 = _0x11d047;
                                _0x18c870['id'] && !processedProductIds[_0x366591(0x2f1)](_0x18c870['id']) && (processedProductIds[_0x366591(0x2d3)](_0x18c870['id']), collectedSearchProducts[_0x366591(0x2fb)]({
                                    'product_id': _0x18c870['id'],
                                    'product_url': _0x18c870[_0x366591(0x237)][_0x366591(0x1f5)]('?')[0x0],
                                    'name': _0x18c870['name'],
                                    'price': { 'text_idr': _0x18c870['price']['text'] },
                                    'shop_name': _0x18c870[_0x366591(0x2ed)][_0x366591(0x25d)],
                                    'badge_url': _0x18c870[_0x366591(0x294)]?.[_0x366591(0x237)] || ''
                                }));
                            });
                            if (currentScrapeMode !== 'search_collecting') {
                                const _0x2944f0 = new URLSearchParams(window[_0x11d047(0x295)][_0x11d047(0x2e1)]);
                                scrapeContext = {
                                    'type': _0x11d047(0x2e1),
                                    'query': _0x2944f0['get']('q') || _0x11d047(0x24f)
                                }, currentScrapeMode = _0x11d047(0x2ea);
                            }
                            if (uiContainer)
                                updateUI();
                        }
                    } catch (_0x2f16ef) {
                        console['error']('Scraper:\x20Gagal\x20proses\x20SearchProductV5Query', _0x2f16ef);
                    }
                }
            }
        }
        return _0x489a32;
    };
}
interceptFetch();
function createActivationUI() {
    const _0x2d8369 = _0x20e8a7;
    if (document[_0x2d8369(0x302)](_0x2d8369(0x1f8)))
        return;
    const _0x4d931f = document[_0x2d8369(0x286)](_0x2d8369(0x297));
    _0x4d931f['id'] = _0x2d8369(0x1f8), Object[_0x2d8369(0x2e0)](_0x4d931f[_0x2d8369(0x221)], {
        'position': 'fixed',
        'bottom': _0x2d8369(0x263),
        'left': '20px',
        'zIndex': '10001',
        'backgroundColor': _0x2d8369(0x2e4),
        'border': '1px\x20solid\x20#ccc',
        'borderRadius': _0x2d8369(0x218),
        'boxShadow': _0x2d8369(0x255),
        'padding': _0x2d8369(0x263),
        'fontFamily': _0x2d8369(0x279),
        'width': _0x2d8369(0x2cc)
    }), _0x4d931f[_0x2d8369(0x26c)] = _0x2d8369(0x266), document['body'][_0x2d8369(0x239)](_0x4d931f), document[_0x2d8369(0x302)](_0x2d8369(0x20f))[_0x2d8369(0x2ee)](_0x2d8369(0x2ef), handleLogin);
}
async function createMainUI(_0xb8b4c5) {
    const _0x3cdd18 = _0x20e8a7, _0x177c93 = document[_0x3cdd18(0x302)]('activation-container');
    if (_0x177c93)
        _0x177c93[_0x3cdd18(0x232)]();
    if (document[_0x3cdd18(0x302)]('scraper-main-container'))
        return;
    const _0x4a42c7 = document[_0x3cdd18(0x286)](_0x3cdd18(0x297));
    _0x4a42c7['id'] = 'scraper-main-container', _0x4a42c7[_0x3cdd18(0x221)]['cssText'] = _0x3cdd18(0x284);
    const _0x3c070d = document['createElement']('div');
    _0x3c070d[_0x3cdd18(0x221)][_0x3cdd18(0x222)] = _0x3cdd18(0x226);
    const _0x51e867 = document['createElement'](_0x3cdd18(0x297));
    _0x51e867[_0x3cdd18(0x221)]['cssText'] = 'padding:\x2012px\x2015px;\x20border-bottom:\x201px\x20solid\x20#eee;';
    const _0x58ae31 = document[_0x3cdd18(0x286)](_0x3cdd18(0x297));
    _0x58ae31['style'][_0x3cdd18(0x222)] = _0x3cdd18(0x2f3), _0x58ae31[_0x3cdd18(0x26c)] = _0x3cdd18(0x2c4);
    const _0x3fd9c4 = document[_0x3cdd18(0x286)]('div');
    _0x3fd9c4['id'] = _0x3cdd18(0x23a);
    const _0xedfbab = new Date(_0xb8b4c5[_0x3cdd18(0x1f2)])['toLocaleDateString'](_0x3cdd18(0x2ac), {
            'day': _0x3cdd18(0x287),
            'month': 'long',
            'year': _0x3cdd18(0x287)
        }), _0x58251 = _0xb8b4c5['devices'][_0x3cdd18(0x2ff)](_0x5dee94 => _0x3cdd18(0x1ef) + (_0x5dee94 === _0xb8b4c5[_0x3cdd18(0x2b1)] ? _0x3cdd18(0x1fc) : _0x3cdd18(0x23d)) + '\x22>' + _0x5dee94 + '\x20' + (_0x5dee94 === _0xb8b4c5['deviceId'] ? _0x3cdd18(0x26e) : '') + _0x3cdd18(0x22c))[_0x3cdd18(0x2ca)]('');
    _0x3fd9c4[_0x3cdd18(0x26c)] = _0x3cdd18(0x277) + _0xb8b4c5[_0x3cdd18(0x214)] + _0x3cdd18(0x24a) + _0xedfbab + '</strong></p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20style=\x22font-size:12px;\x20margin:\x2010px\x200\x205px\x200;\x22>Perangkat\x20Terdaftar:</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<ul\x20style=\x22margin:0;\x20padding-left:\x2020px;\x20font-size:\x2012px;\x22>' + _0x58251 + _0x3cdd18(0x25e), _0x51e867[_0x3cdd18(0x239)](_0x58ae31), _0x51e867['appendChild'](_0x3fd9c4), _0x3c070d['appendChild'](_0x51e867), createScraperUI(_0x3c070d), _0x4a42c7['appendChild'](_0x3c070d), document[_0x3cdd18(0x28a)][_0x3cdd18(0x239)](_0x4a42c7), document[_0x3cdd18(0x302)](_0x3cdd18(0x2f9))[_0x3cdd18(0x2ee)](_0x3cdd18(0x2ef), handleLogout);
    const _0x507d20 = document[_0x3cdd18(0x302)](_0x3cdd18(0x29d)), _0x677b9a = (_0x11d849, _0x4b071d = ![]) => {
            const _0x171aa8 = _0x3cdd18;
            _0x11d849 === _0x171aa8(0x2dd) ? (_0x3fd9c4['style'][_0x171aa8(0x213)] = 'none', _0x507d20[_0x171aa8(0x2cf)] = '[\x20+\x20]') : (_0x3fd9c4[_0x171aa8(0x221)][_0x171aa8(0x213)] = _0x171aa8(0x2a9), _0x507d20[_0x171aa8(0x2cf)] = _0x171aa8(0x245));
            if (!_0x4b071d)
                GM_setValue(UI_STATE_KEY, _0x11d849);
        };
    _0x507d20[_0x3cdd18(0x2ee)](_0x3cdd18(0x2ef), () => _0x677b9a(_0x3fd9c4['style']['display'] === _0x3cdd18(0x1fb) ? 'expanded' : 'collapsed'));
    const _0x4143c7 = await GM_getValue(UI_STATE_KEY, _0x3cdd18(0x2a6));
    _0x677b9a(_0x4143c7, !![]), initScraperLogic();
}
function apiCall(_0x5e798d, _0x13a536) {
    return new Promise((_0x337457, _0x32e99b) => {
        const _0x59b930 = _0x1e7c;
        if (API_URL === 'URL_APPS_SCRIPT_ANDA_DISINI')
            return _0x32e99b({ 'message': _0x59b930(0x308) });
        GM_xmlhttpRequest({
            'method': 'POST',
            'url': API_URL,
            'data': JSON[_0x59b930(0x27c)]({
                'action': _0x5e798d,
                ..._0x13a536
            }),
            'headers': { 'Content-Type': 'application/json' },
            'onload': _0x4d3802 => {
                const _0x1ae3f8 = _0x59b930;
                try {
                    _0x337457(JSON[_0x1ae3f8(0x215)](_0x4d3802[_0x1ae3f8(0x1fd)]));
                } catch (_0x505f98) {
                    _0x32e99b({ 'message': _0x1ae3f8(0x220) });
                }
            },
            'onerror': _0x42ba23 => _0x32e99b({ 'message': 'Gagal\x20terhubung\x20ke\x20server\x20aktivasi.' })
        });
    });
}
async function handleLogin() {
    const _0x279423 = _0x20e8a7, _0x4bccac = document[_0x279423(0x302)]('act_username')[_0x279423(0x304)][_0x279423(0x282)](), _0x29b0f6 = document[_0x279423(0x302)]('act_password')[_0x279423(0x304)]['trim'](), _0x184d3b = document[_0x279423(0x302)](_0x279423(0x210)), _0x4dfda0 = document['getElementById']('act_btn_login');
    if (!_0x4bccac || !_0x29b0f6) {
        _0x184d3b[_0x279423(0x2cf)] = _0x279423(0x285);
        return;
    }
    _0x184d3b[_0x279423(0x2cf)] = _0x279423(0x230), _0x4dfda0[_0x279423(0x300)] = !![];
    let _0x5a2dfa = await GM_getValue(STATE_KEY, {});
    !_0x5a2dfa['deviceId'] && (_0x5a2dfa[_0x279423(0x2b1)] = 'device_' + Date[_0x279423(0x2be)]() + Math[_0x279423(0x2ab)]()[_0x279423(0x203)](0x24)[_0x279423(0x2b0)](0x2, 0x9));
    try {
        const _0x58a405 = await apiCall(_0x279423(0x2df), {
            'username': _0x4bccac,
            'password': _0x29b0f6,
            'deviceId': _0x5a2dfa['deviceId']
        });
        if (_0x58a405[_0x279423(0x202)] === 'success') {
            const _0x4f79e4 = {
                'activated': !![],
                'username': _0x4bccac,
                'deviceId': _0x5a2dfa[_0x279423(0x2b1)],
                'expiry_date': _0x58a405[_0x279423(0x211)][_0x279423(0x1f2)],
                'devices': _0x58a405[_0x279423(0x211)][_0x279423(0x260)] || []
            };
            await GM_setValue(STATE_KEY, _0x4f79e4), createMainUI(_0x4f79e4);
        } else
            _0x184d3b[_0x279423(0x2cf)] = _0x58a405[_0x279423(0x241)] || _0x279423(0x25c), _0x4dfda0[_0x279423(0x300)] = ![];
    } catch (_0x20071f) {
        _0x184d3b[_0x279423(0x2cf)] = _0x20071f[_0x279423(0x241)] || 'Error\x20tidak\x20diketahui.', _0x4dfda0[_0x279423(0x300)] = ![];
    }
}
async function handleLogout() {
    const _0xdf3bb3 = _0x20e8a7;
    if (!confirm('Apakah\x20Anda\x20yakin\x20ingin\x20menghapus\x20akun\x20dari\x20browser\x20ini?'))
        return;
    const _0x2049ea = await GM_getValue(STATE_KEY, {});
    if (_0x2049ea[_0xdf3bb3(0x252)])
        await apiCall(_0xdf3bb3(0x219), {
            'username': _0x2049ea[_0xdf3bb3(0x214)],
            'deviceId': _0x2049ea['deviceId']
        });
    await GM_deleteValue(STATE_KEY), window[_0xdf3bb3(0x295)][_0xdf3bb3(0x26b)]();
}
async function initialize() {
    const _0x509aa6 = _0x20e8a7;
    let _0x5ec375 = await GM_getValue(STATE_KEY, {});
    if (_0x5ec375 && _0x5ec375[_0x509aa6(0x252)] && _0x5ec375[_0x509aa6(0x214)] && _0x5ec375['deviceId'])
        try {
            const _0x341a2b = await apiCall(_0x509aa6(0x2d8), {
                'username': _0x5ec375[_0x509aa6(0x214)],
                'deviceId': _0x5ec375['deviceId']
            });
            _0x341a2b[_0x509aa6(0x202)] === _0x509aa6(0x201) ? (_0x5ec375[_0x509aa6(0x1f2)] = _0x341a2b[_0x509aa6(0x211)][_0x509aa6(0x1f2)], _0x5ec375[_0x509aa6(0x260)] = _0x341a2b['data'][_0x509aa6(0x260)], await GM_setValue(STATE_KEY, _0x5ec375), createMainUI(_0x5ec375)) : (await GM_deleteValue(STATE_KEY), createActivationUI(), setTimeout(() => {
                const _0x26616a = _0x509aa6, _0x1f9a82 = document[_0x26616a(0x302)]('act_status');
                if (_0x1f9a82)
                    _0x1f9a82[_0x26616a(0x2cf)] = _0x26616a(0x234) + _0x341a2b['message'];
            }, 0x1f4));
        } catch (_0x1757b4) {
            console[_0x509aa6(0x293)](_0x509aa6(0x2b6), _0x1757b4[_0x509aa6(0x241)]), createMainUI(_0x5ec375);
        }
    else
        createActivationUI();
}
function createScraperUI(_0x1fbd0f) {
    const _0x57a5ff = _0x20e8a7;
    uiContainer = document[_0x57a5ff(0x286)](_0x57a5ff(0x297)), uiContainer['id'] = _0x57a5ff(0x1f1);
    const _0x5ec31a = document[_0x57a5ff(0x286)](_0x57a5ff(0x297));
    Object[_0x57a5ff(0x2e0)](_0x5ec31a[_0x57a5ff(0x221)], {
        'padding': _0x57a5ff(0x2dc),
        'backgroundColor': _0x57a5ff(0x251),
        'fontWeight': _0x57a5ff(0x29e),
        'borderBottom': _0x57a5ff(0x21e),
        'color': _0x57a5ff(0x246),
        'fontSize': _0x57a5ff(0x307)
    }), _0x5ec31a[_0x57a5ff(0x2cf)] = 'Tokopedia\x20Scraper\x20Pro', uiContainer[_0x57a5ff(0x239)](_0x5ec31a), infoPanel = document[_0x57a5ff(0x286)]('div'), infoPanel['id'] = _0x57a5ff(0x309), Object[_0x57a5ff(0x2e0)](infoPanel[_0x57a5ff(0x221)], {
        'padding': _0x57a5ff(0x2c1),
        'borderBottom': '1px\x20solid\x20#eee'
    }), actionPanel = document[_0x57a5ff(0x286)]('div'), actionPanel['id'] = 'scraper-action-panel', Object['assign'](actionPanel[_0x57a5ff(0x221)], {
        'padding': _0x57a5ff(0x2c1),
        'display': _0x57a5ff(0x30c),
        'flexDirection': _0x57a5ff(0x2ec),
        'gap': '10px'
    }), scrapeButton = document[_0x57a5ff(0x286)](_0x57a5ff(0x29f)), scrapeButton['id'] = _0x57a5ff(0x22d), Object[_0x57a5ff(0x2e0)](scrapeButton[_0x57a5ff(0x221)], {
        'padding': _0x57a5ff(0x27a),
        'backgroundColor': _0x57a5ff(0x246),
        'color': _0x57a5ff(0x292),
        'border': _0x57a5ff(0x1fb),
        'borderRadius': _0x57a5ff(0x2fd),
        'cursor': _0x57a5ff(0x289),
        'fontSize': _0x57a5ff(0x227),
        'fontWeight': _0x57a5ff(0x29e)
    }), scrapeButton['addEventListener'](_0x57a5ff(0x2ef), startScrape), statusArea = document[_0x57a5ff(0x286)](_0x57a5ff(0x297)), statusArea['id'] = _0x57a5ff(0x28c), Object[_0x57a5ff(0x2e0)](statusArea[_0x57a5ff(0x221)], {
        'fontSize': _0x57a5ff(0x2da),
        'color': _0x57a5ff(0x267),
        'textAlign': _0x57a5ff(0x20e),
        'marginTop': _0x57a5ff(0x2fd),
        'minHeight': _0x57a5ff(0x229)
    }), actionPanel['appendChild'](scrapeButton), actionPanel[_0x57a5ff(0x239)](statusArea), resultsActionPanel = document['createElement'](_0x57a5ff(0x297)), resultsActionPanel['id'] = _0x57a5ff(0x21d), Object[_0x57a5ff(0x2e0)](resultsActionPanel[_0x57a5ff(0x221)], {
        'padding': _0x57a5ff(0x2c1),
        'display': _0x57a5ff(0x1fb),
        'flexDirection': 'column',
        'gap': '10px'
    }), showResultsButton = document[_0x57a5ff(0x286)]('button'), Object['assign'](showResultsButton[_0x57a5ff(0x221)], {
        'padding': _0x57a5ff(0x261),
        'backgroundColor': _0x57a5ff(0x1f4),
        'color': _0x57a5ff(0x292),
        'border': _0x57a5ff(0x1fb),
        'borderRadius': _0x57a5ff(0x2fd),
        'cursor': _0x57a5ff(0x289)
    }), showResultsButton['textContent'] = _0x57a5ff(0x2eb), showResultsButton[_0x57a5ff(0x2ee)](_0x57a5ff(0x2ef), handleShowResults), downloadExcelButton = document['createElement']('button'), Object[_0x57a5ff(0x2e0)](downloadExcelButton[_0x57a5ff(0x221)], {
        'padding': _0x57a5ff(0x261),
        'backgroundColor': _0x57a5ff(0x28d),
        'color': _0x57a5ff(0x292),
        'border': _0x57a5ff(0x1fb),
        'borderRadius': _0x57a5ff(0x2fd),
        'cursor': _0x57a5ff(0x289)
    }), downloadExcelButton[_0x57a5ff(0x2cf)] = _0x57a5ff(0x249), downloadExcelButton['addEventListener'](_0x57a5ff(0x2ef), handleDownloadExcel), resultsActionPanel['appendChild'](showResultsButton), resultsActionPanel[_0x57a5ff(0x239)](downloadExcelButton), uiContainer[_0x57a5ff(0x239)](infoPanel), uiContainer[_0x57a5ff(0x239)](actionPanel), uiContainer[_0x57a5ff(0x239)](resultsActionPanel), _0x1fbd0f[_0x57a5ff(0x239)](uiContainer);
}
function updateUI() {
    const _0x416484 = _0x20e8a7;
    if (!uiContainer)
        return;
    infoPanel[_0x416484(0x221)][_0x416484(0x213)] = _0x416484(0x1fb), actionPanel['style'][_0x416484(0x213)] = _0x416484(0x1fb), resultsActionPanel[_0x416484(0x221)][_0x416484(0x213)] = _0x416484(0x1fb), scrapeButton['disabled'] = !![], isScraping = ![];
    switch (currentScrapeMode) {
    case 'scraping':
        isScraping = !![], scrapeButton[_0x416484(0x300)] = !![], scrapeButton[_0x416484(0x221)][_0x416484(0x243)] = _0x416484(0x2ae), actionPanel[_0x416484(0x221)][_0x416484(0x213)] = _0x416484(0x30c);
        break;
    case _0x416484(0x256):
        actionPanel[_0x416484(0x221)]['display'] = _0x416484(0x1fb), resultsActionPanel[_0x416484(0x221)][_0x416484(0x213)] = _0x416484(0x30c), statusArea[_0x416484(0x2cf)] = _0x416484(0x272) + lastScrapeResult['length'] + _0x416484(0x24e);
        (scrapeContext[_0x416484(0x24b)] === _0x416484(0x2d5) || scrapeContext['type'] === _0x416484(0x2e1)) && (infoPanel[_0x416484(0x221)][_0x416484(0x213)] = _0x416484(0x2a9));
        break;
    case _0x416484(0x2d5):
        const _0x3e8c4b = parseInt(scrapeContext[_0x416484(0x2a1)][_0x416484(0x2f7)] || 0x0)[_0x416484(0x303)](_0x416484(0x2ac));
        let _0x1ef074;
        scrapeContext['info'][_0x416484(0x288)] ? _0x1ef074 = _0x416484(0x206) + scrapeContext[_0x416484(0x2a1)][_0x416484(0x288)] + _0x416484(0x2e6) + scrapeContext[_0x416484(0x2a1)][_0x416484(0x2d7)] + _0x416484(0x2e3) + scrapeContext[_0x416484(0x2a1)]['badgeText'] + _0x416484(0x212) + scrapeContext[_0x416484(0x2a1)]['name'] + _0x416484(0x200) : _0x1ef074 = _0x416484(0x258) + scrapeContext[_0x416484(0x2a1)][_0x416484(0x25d)] + _0x416484(0x2d1);
        infoPanel[_0x416484(0x26c)] = _0x416484(0x23e) + _0x1ef074 + _0x416484(0x254) + scrapeContext[_0x416484(0x2a1)][_0x416484(0x295)] + _0x416484(0x1ee) + scrapeContext[_0x416484(0x2a1)]['activeProduct'][_0x416484(0x303)]('id-ID') + _0x416484(0x242) + _0x3e8c4b + _0x416484(0x20b) + scrapeContext['info'][_0x416484(0x20d)] + '</div>', scrapeButton['textContent'] = _0x416484(0x2d4), statusArea[_0x416484(0x2cf)] = 'Siap\x20untuk\x20scrape\x20seluruh\x20toko.', scrapeButton['disabled'] = ![], infoPanel[_0x416484(0x221)][_0x416484(0x213)] = _0x416484(0x2a9), actionPanel[_0x416484(0x221)][_0x416484(0x213)] = _0x416484(0x30c);
        break;
    case _0x416484(0x2ea):
        infoPanel[_0x416484(0x26c)] = _0x416484(0x247) + scrapeContext['query'] + _0x416484(0x250), scrapeButton['textContent'] = _0x416484(0x2d0) + collectedSearchProducts[_0x416484(0x244)] + _0x416484(0x30a), statusArea[_0x416484(0x26c)] = _0x416484(0x225), scrapeButton['disabled'] = collectedSearchProducts[_0x416484(0x244)] === 0x0, infoPanel['style']['display'] = _0x416484(0x2a9), actionPanel[_0x416484(0x221)]['display'] = _0x416484(0x30c);
        break;
    default:
        infoPanel[_0x416484(0x26c)] = _0x416484(0x205), infoPanel[_0x416484(0x221)][_0x416484(0x213)] = _0x416484(0x2a9);
        break;
    }
}
function makeApiRequest(_0x1cff21, _0x47e70f, _0x2142d5 = {}) {
    return new Promise((_0x423b17, _0x556400) => {
        const _0x34d17f = _0x1e7c;
        GM_xmlhttpRequest({
            'method': _0x34d17f(0x26a),
            'url': _0x1cff21,
            'headers': {
                'Content-Type': 'application/json',
                ..._0x2142d5
            },
            'data': JSON[_0x34d17f(0x27c)](_0x47e70f),
            'onload': function (_0x22bd84) {
                const _0x4e4eb4 = _0x34d17f;
                _0x22bd84['status'] >= 0xc8 && _0x22bd84[_0x4e4eb4(0x202)] < 0x12c ? _0x423b17(JSON[_0x4e4eb4(0x215)](_0x22bd84[_0x4e4eb4(0x1fd)])) : _0x556400({
                    'status': _0x22bd84['status'],
                    'statusText': _0x22bd84['statusText'],
                    'body': _0x22bd84[_0x4e4eb4(0x1fd)]
                });
            },
            'onerror': function (_0x44e559) {
                _0x556400(_0x44e559);
            }
        });
    });
}
async function startScrape() {
    const _0x1e28f2 = _0x20e8a7;
    if (isScraping)
        return;
    const _0x4bc761 = currentScrapeMode;
    currentScrapeMode = _0x1e28f2(0x22f), updateUI();
    try {
        let _0x14c10e;
        if (_0x4bc761 === _0x1e28f2(0x2d5))
            scrapeButton[_0x1e28f2(0x2cf)] = _0x1e28f2(0x23c), _0x14c10e = await fetchAllShopProducts(scrapeContext[_0x1e28f2(0x2a1)][_0x1e28f2(0x20d)]);
        else
            _0x4bc761 === 'search_collecting' && (scrapeButton['textContent'] = _0x1e28f2(0x2ad), _0x14c10e = collectedSearchProducts);
        if (!_0x14c10e || _0x14c10e[_0x1e28f2(0x244)] === 0x0)
            throw new Error('Tidak\x20ada\x20produk\x20untuk\x20diproses.');
        scrapeButton[_0x1e28f2(0x2cf)] = _0x1e28f2(0x2f5);
        const _0x57d0f5 = await fetchProductsDetails(_0x14c10e);
        statusArea[_0x1e28f2(0x2cf)] = _0x1e28f2(0x2fe), lastScrapeResult = mergeProductData(_0x14c10e, _0x57d0f5), currentScrapeMode = _0x1e28f2(0x256), updateUI();
    } catch (_0x32e077) {
        console[_0x1e28f2(0x236)](_0x1e28f2(0x25a), _0x32e077), alert(_0x1e28f2(0x2bf) + _0x32e077[_0x1e28f2(0x241)]), currentScrapeMode = _0x4bc761, updateUI();
    }
}
async function fetchAllShopProducts(_0x5665e1) {
    const _0x4b8df1 = _0x20e8a7;
    let _0x25b864 = [], _0x10932f = 0x1, _0x4b8163 = !![];
    const _0x32c3a3 = {
        'x-source': _0x4b8df1(0x259),
        'x-device': _0x4b8df1(0x23b)
    };
    while (_0x4b8163) {
        statusArea[_0x4b8df1(0x2cf)] = _0x4b8df1(0x27b) + _0x10932f + ',\x20Total:\x20' + _0x25b864[_0x4b8df1(0x244)] + ')';
        const _0x43f768 = [{
                'operationName': _0x4b8df1(0x2e5),
                'variables': {
                    'sid': _0x5665e1,
                    'page': _0x10932f,
                    'perPage': 0x50,
                    'sort': 0x8
                },
                'query': _0x4b8df1(0x2a2)
            }];
        try {
            const _0xc03ba5 = (await makeApiRequest(_0x4b8df1(0x2d2), _0x43f768, _0x32c3a3))[0x0];
            if (_0xc03ba5[_0x4b8df1(0x2c5)])
                throw new Error(JSON[_0x4b8df1(0x27c)](_0xc03ba5[_0x4b8df1(0x2c5)]));
            const _0x39eb65 = _0xc03ba5['data'][_0x4b8df1(0x2bb)], _0x52b0db = _0x39eb65[_0x4b8df1(0x211)] || [];
            if (_0x52b0db['length'] > 0x0)
                _0x25b864[_0x4b8df1(0x2fb)](..._0x52b0db);
            _0x4b8163 = !!_0x39eb65[_0x4b8df1(0x2a4)][_0x4b8df1(0x24d)] && _0x52b0db[_0x4b8df1(0x244)] > 0x0, _0x10932f++, await new Promise(_0x38d49b => setTimeout(_0x38d49b, 0x12c));
        } catch (_0x3a42a4) {
            console[_0x4b8df1(0x236)](_0x4b8df1(0x27d) + _0x10932f + ':', _0x3a42a4), _0x4b8163 = ![];
        }
    }
    return _0x25b864;
}
function _0x1e7c(_0x28e139, _0x55eb0d) {
    const _0x13dfdf = _0x13df();
    return _0x1e7c = function (_0x1e7cfa, _0x3dd5db) {
        _0x1e7cfa = _0x1e7cfa - 0x1ee;
        let _0x28a280 = _0x13dfdf[_0x1e7cfa];
        return _0x28a280;
    }, _0x1e7c(_0x28e139, _0x55eb0d);
}
async function fetchProductsDetails(_0x2ea69b) {
    const _0x2f3ae6 = _0x20e8a7;
    let _0x4394a8 = [];
    for (let _0x1e3ac2 = 0x0; _0x1e3ac2 < _0x2ea69b['length']; _0x1e3ac2 += CONCURRENT_REQUESTS) {
        const _0x82da38 = _0x2ea69b[_0x2f3ae6(0x27f)](_0x1e3ac2, _0x1e3ac2 + CONCURRENT_REQUESTS);
        statusArea[_0x2f3ae6(0x2cf)] = _0x2f3ae6(0x2e9) + (_0x1e3ac2 + _0x82da38[_0x2f3ae6(0x244)]) + '/' + _0x2ea69b[_0x2f3ae6(0x244)] + ')';
        const _0x35b621 = _0x82da38[_0x2f3ae6(0x2ff)](_0x5e7050 => {
                const _0x32fd77 = _0x2f3ae6;
                try {
                    if (!_0x5e7050[_0x32fd77(0x2b9)])
                        return Promise[_0x32fd77(0x22e)]({
                            'product_id_key': _0x5e7050[_0x32fd77(0x2b7)],
                            'error': _0x32fd77(0x283)
                        });
                    const _0x5d24cd = new URL(_0x5e7050[_0x32fd77(0x2b9)]), _0x5c62cc = _0x5d24cd[_0x32fd77(0x268)][_0x32fd77(0x2c8)](/^\/|\/$/g, '')[_0x32fd77(0x1f5)]('/'), _0x52066e = _0x5c62cc[0x0], _0x188576 = _0x5c62cc[_0x5c62cc[_0x32fd77(0x244)] - 0x1];
                    if (!_0x52066e || !_0x188576)
                        throw new Error(_0x32fd77(0x271));
                    const _0x10ca7f = [{
                                'operationName': _0x32fd77(0x25b),
                                'variables': {
                                    'shopDomain': _0x52066e,
                                    'productKey': _0x188576,
                                    'layoutID': '',
                                    'apiVersion': 0x1
                                },
                                'query': _0x32fd77(0x2fa)
                            }], _0xb36485 = {
                            'x-tkpd-akamai': _0x32fd77(0x216),
                            'Origin': _0x32fd77(0x2b8),
                            'Referer': _0x5e7050[_0x32fd77(0x2b9)]
                        };
                    return makeApiRequest(_0x32fd77(0x298), _0x10ca7f, _0xb36485)[_0x32fd77(0x29c)](_0x53610a => ({
                        'product_id_key': _0x5e7050[_0x32fd77(0x2b7)],
                        'details': _0x53610a[0x0]?.[_0x32fd77(0x211)]?.[_0x32fd77(0x216)]?.[_0x32fd77(0x223)],
                        'error': _0x53610a[0x0]?.[_0x32fd77(0x2c5)] || null
                    }))['catch'](_0x417c07 => ({
                        'product_id_key': _0x5e7050[_0x32fd77(0x2b7)],
                        'error': 'Request\x20Failed'
                    }));
                } catch (_0x49275e) {
                    return console['error']('Gagal\x20memproses\x20URL:\x20' + _0x5e7050['product_url'], _0x49275e), Promise[_0x32fd77(0x22e)]({
                        'product_id_key': _0x5e7050['product_id'],
                        'error': _0x32fd77(0x207) + _0x49275e['message']
                    });
                }
            }), _0x445632 = await Promise['all'](_0x35b621);
        _0x4394a8['push'](..._0x445632);
    }
    return _0x4394a8;
}
function mergeProductData(_0x480a55, _0x41ae21) {
    const _0x358f46 = _0x20e8a7, _0x216a8e = new Map(_0x41ae21[_0x358f46(0x2ff)](_0x15a75b => [
            _0x15a75b['product_id_key'],
            _0x15a75b
        ]));
    return _0x480a55['map'](_0x39135e => {
        const _0x27a4c1 = _0x358f46, _0x1ec7ed = _0x216a8e[_0x27a4c1(0x1fa)](_0x39135e[_0x27a4c1(0x2b7)]), _0x496b19 = _0x1ec7ed?.[_0x27a4c1(0x1f7)] || {}, _0x401c79 = _0x39135e[_0x27a4c1(0x28e)][_0x27a4c1(0x24c)] || '0', _0x129260 = parseInt(_0x401c79[_0x27a4c1(0x2c8)](/Rp|\./g, ''), 0xa) || 0x0, _0x4584b2 = parseInt(_0x496b19[_0x27a4c1(0x20c)]?.['countSold'], 0xa) || 0x0, _0x5c6380 = parseInt(_0x496b19[_0x27a4c1(0x30b)]?.[_0x27a4c1(0x2b4)], 0xa) || 0x0, _0x4c55a2 = _0x496b19[_0x27a4c1(0x30b)]?.[_0x27a4c1(0x273)] ?? 0x0;
        let _0x10d72 = _0x27a4c1(0x2b5), _0x1aa9cb = '';
        if (_0x39135e[_0x27a4c1(0x2ce)]) {
            _0x1aa9cb = _0x39135e['badge_url'];
            if (_0x1aa9cb[_0x27a4c1(0x224)](_0x27a4c1(0x2c3)))
                _0x10d72 = _0x27a4c1(0x2a8);
            else
                _0x1aa9cb[_0x27a4c1(0x224)](_0x27a4c1(0x2de)) && (_0x10d72 = _0x27a4c1(0x2c0));
        } else {
            if (scrapeContext['type'] === 'store') {
                _0x10d72 = scrapeContext[_0x27a4c1(0x2a1)][_0x27a4c1(0x2d7)] || _0x27a4c1(0x2bd);
                if (_0x10d72 === _0x27a4c1(0x2aa))
                    _0x10d72 = 'Mall';
                if (_0x10d72 === _0x27a4c1(0x269))
                    _0x10d72 = _0x27a4c1(0x2c0);
                _0x1aa9cb = scrapeContext['info']['badgeUrl'] || '';
            }
        }
        let _0x29a1fd = '';
        if (_0x1ec7ed?.['error']) {
            const _0x29487f = JSON[_0x27a4c1(0x27c)](_0x1ec7ed[_0x27a4c1(0x236)]);
            _0x29487f['includes'](_0x27a4c1(0x290)) ? _0x29a1fd = _0x27a4c1(0x291) : _0x29a1fd = _0x29487f;
        }
        return {
            'Shop\x20ID': _0x496b19['shopID'] ?? (scrapeContext['type'] === _0x27a4c1(0x2d5) ? scrapeContext['info']['shopID'] : 'N/A'),
            'Shop\x20Badge': _0x10d72,
            'Shop\x20Name': _0x496b19[_0x27a4c1(0x22b)] ?? _0x39135e['shop_name'] ?? (scrapeContext['type'] === _0x27a4c1(0x2d5) ? scrapeContext[_0x27a4c1(0x2a1)][_0x27a4c1(0x25d)] : 'N/A'),
            'Product\x20ID': _0x39135e['product_id'],
            'SKU': _0x496b19[_0x27a4c1(0x1ff)] ?? _0x27a4c1(0x2bd),
            'Product\x20Name': _0x39135e[_0x27a4c1(0x25d)],
            'Price': _0x129260,
            'Sold': _0x4584b2,
            'Review\x20Count': _0x5c6380,
            'Rating': _0x4c55a2,
            'Product\x20URL': _0x39135e[_0x27a4c1(0x2b9)],
            'Created\x20At': _0x496b19['createdAt'] ?? _0x27a4c1(0x2bd),
            'Status': _0x496b19[_0x27a4c1(0x202)] ?? _0x27a4c1(0x2bd),
            'Fetch\x20Error': _0x29a1fd,
            'badge_url_internal': _0x1aa9cb
        };
    });
}
function handleShowResults() {
    const _0x5e1633 = _0x20e8a7;
    if (!lastScrapeResult) {
        alert(_0x5e1633(0x231));
        return;
    }
    const _0xbeec9c = window[_0x5e1633(0x2c7)]();
    if (!_0xbeec9c) {
        alert(_0x5e1633(0x2e7));
        return;
    }
    const _0x48b423 = 'Hasil\x20Scrape\x20-\x20' + (scrapeContext[_0x5e1633(0x24b)] === _0x5e1633(0x2d5) ? scrapeContext['info'][_0x5e1633(0x25d)] : _0x5e1633(0x275) + scrapeContext[_0x5e1633(0x2c6)] + '\x22'), _0x4fbdcd = Object[_0x5e1633(0x29a)](lastScrapeResult[0x0])[_0x5e1633(0x2ba)](_0x23a3e5 => _0x23a3e5 !== _0x5e1633(0x253) && _0x23a3e5 !== _0x5e1633(0x281)), _0xfe7200 = _0x4fbdcd[_0x5e1633(0x2ff)](_0x58f6a4 => _0x5e1633(0x2f0) + _0x58f6a4 + _0x5e1633(0x29b))['join'](''), _0x3d7f59 = lastScrapeResult[_0x5e1633(0x2ff)](_0x261632 => {
            const _0x5d0141 = _0x5e1633, _0x49b814 = _0x4fbdcd[_0x5d0141(0x2ff)](_0x5b6000 => {
                    const _0x333ceb = _0x5d0141, _0x1b5448 = _0x261632[_0x5b6000];
                    let _0x3ef24c;
                    if (_0x5b6000 === 'Product\x20URL' && String(_0x1b5448)[_0x333ceb(0x26f)](_0x333ceb(0x21c)))
                        _0x3ef24c = _0x333ceb(0x2f8) + _0x1b5448 + _0x333ceb(0x1fe);
                    else {
                        if (_0x5b6000 === _0x333ceb(0x305) && _0x261632[_0x333ceb(0x281)])
                            _0x3ef24c = _0x333ceb(0x270) + _0x261632[_0x333ceb(0x281)] + _0x333ceb(0x2e6) + _0x261632[_0x333ceb(0x253)] + _0x333ceb(0x2e3) + _0x261632[_0x333ceb(0x253)] + '\x22\x20style=\x22width:16px;\x20height:16px;\x20vertical-align:middle;\x20margin-right:\x205px;\x22>' + _0x1b5448;
                        else {
                            if (typeof _0x1b5448 === _0x333ceb(0x274)) {
                                const _0x353001 = {
                                    'minimumFractionDigits': 0x0,
                                    'maximumFractionDigits': 0x1
                                };
                                _0x5b6000 !== 'Rating' && (_0x353001['minimumFractionDigits'] = 0x0, _0x353001[_0x333ceb(0x238)] = 0x0), _0x3ef24c = _0x1b5448[_0x333ceb(0x303)](_0x333ceb(0x2ac), _0x353001);
                            } else
                                _0x3ef24c = String(_0x1b5448 ?? '')['replace'](/&/g, '&')[_0x333ceb(0x2c8)](/</g, '<')['replace'](/>/g, '>')[_0x333ceb(0x2c8)](/"/g, '\x22');
                        }
                    }
                    const _0x1af2e9 = _0x5b6000 === 'Product\x20Name' || _0x5b6000 === _0x333ceb(0x2af) || _0x5b6000 === 'Fetch\x20Error' ? 'class=\x22wrap-text\x22' : '';
                    return '<td\x20' + _0x1af2e9 + '>' + _0x3ef24c + _0x333ceb(0x208);
                })[_0x5d0141(0x2ca)]('');
            return _0x5d0141(0x2b3) + _0x49b814 + _0x5d0141(0x228);
        })[_0x5e1633(0x2ca)](''), _0x27ba5a = _0x5e1633(0x233), _0x12f001 = _0x5e1633(0x2cd) + _0x48b423 + '</title><style>' + _0x27ba5a + _0x5e1633(0x2f2) + _0x48b423 + _0x5e1633(0x2a5) + lastScrapeResult[_0x5e1633(0x244)][_0x5e1633(0x303)]('id-ID') + _0x5e1633(0x296) + _0xfe7200 + '</tr></thead><tbody>' + _0x3d7f59 + '</tbody></table></div></div></body></html>';
    _0xbeec9c[_0x5e1633(0x2e2)][_0x5e1633(0x2c7)](), _0xbeec9c[_0x5e1633(0x2e2)][_0x5e1633(0x25f)](_0x12f001);
    const _0x4742e6 = _0x5e1633(0x1f0), _0x3c8aae = _0xbeec9c[_0x5e1633(0x2e2)][_0x5e1633(0x286)]('script');
    _0x3c8aae[_0x5e1633(0x2cf)] = _0x4742e6, _0xbeec9c[_0x5e1633(0x2e2)][_0x5e1633(0x28a)][_0x5e1633(0x239)](_0x3c8aae), _0xbeec9c[_0x5e1633(0x2e2)]['close']();
}
function handleDownloadExcel() {
    const _0x65d4f0 = _0x20e8a7;
    if (!lastScrapeResult) {
        alert('Tidak\x20ada\x20data\x20untuk\x20diunduh.');
        return;
    }
    const _0x3b16f5 = lastScrapeResult[_0x65d4f0(0x2ff)](_0x5a2559 => {
            const _0x58ade3 = _0x65d4f0, _0x59aab3 = { ..._0x5a2559 };
            return delete _0x59aab3[_0x58ade3(0x281)], _0x59aab3;
        }), _0xaa941c = XLSX[_0x65d4f0(0x2d6)][_0x65d4f0(0x2c2)](_0x3b16f5), _0x127482 = XLSX[_0x65d4f0(0x2d6)][_0x65d4f0(0x26d)]();
    XLSX[_0x65d4f0(0x2d6)][_0x65d4f0(0x27e)](_0x127482, _0xaa941c, _0x65d4f0(0x257));
    const _0x1c2c3c = scrapeContext[_0x65d4f0(0x24b)] === _0x65d4f0(0x2d5) ? scrapeContext['info'][_0x65d4f0(0x25d)] : scrapeContext[_0x65d4f0(0x2c6)], _0x500345 = _0x1c2c3c[_0x65d4f0(0x2c8)](/[^a-zA-Z0-9]/g, '_');
    XLSX[_0x65d4f0(0x2d9)](_0x127482, _0x65d4f0(0x278) + _0x500345 + _0x65d4f0(0x1f3));
}
function initScraperLogic() {
    const _0x4ad909 = _0x20e8a7, _0x3956df = window[_0x4ad909(0x295)][_0x4ad909(0x268)];
    if (!_0x3956df[_0x4ad909(0x26f)](_0x4ad909(0x262))) {
    }
    updateUI();
}
document[_0x20e8a7(0x21b)] === 'complete' || document[_0x20e8a7(0x21b)] === _0x20e8a7(0x22a) ? initialize() : window[_0x20e8a7(0x2ee)](_0x20e8a7(0x209), initialize);
})();
