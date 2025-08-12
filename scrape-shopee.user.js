// ==UserScript==
// @name         Shopee Scraper
// @namespace    https://shopee.co.id/
// @version      1.0.4
// @description  Shopee scrape all in one
// @author       By Naufal Abiyyu & AI
// @match        https://shopee.co.id/*
// @icon         https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/ca5d12cb33c0998393a11b61962377b4.png
// @require      https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      script.google.com
// @connect      script.googleusercontent.com
// @updateURL    https://github.com/vinzmobile1/tampermonkey/raw/refs/heads/main/scrape-shopee.user.js
// @downloadURL  https://github.com/vinzmobile1/tampermonkey/raw/refs/heads/main/scrape-shopee.user.js
// ==/UserScript==

(function() {
    'use strict';
const _0x462b9b = _0x13a4;
function _0xa220() {
    const _0x550990 = [
        'Price(IDR)',
        '</tbody></table></div>',
        'activated',
        'stringify',
        '</li>',
        'Stock',
        '\x20|\x20Revenue\x2030\x20Days:\x20',
        ';\x20document.getElementById(\x27downloadBtn\x27).addEventListener(\x27click\x27,()=>{const\x20ws=XLSX.utils.aoa_to_sheet([headers,\x20...rows]);\x20const\x20wb=XLSX.utils.book_new();\x20XLSX.utils.book_append_sheet(wb,ws,\x22Produk\x22);\x20XLSX.writeFile(wb,\x22shopee_store_',
        'div',
        '162372QndsfL',
        'style=\x22height:\x2014px;\x20margin-right:\x204px;\x20vertical-align:\x20middle;\x22',
        'wkdaelpmissisiht',
        'Jan',
        'hasOwnProperty',
        '\x22\x20siap</strong>\x20(',
        'utf-8',
        'reload',
        'body',
        'Gagal\x20mendeteksi\x20Shop\x20ID.\x20Silakan\x20refresh\x20halaman\x20toko.',
        '<tr>',
        '<img\x20src=\x22https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.69/pc/e4734dab67ee2f9ebd5a.png\x22\x20',
        'url',
        '843819kjMnAW',
        'Sold(Total)',
        'is_official_shop',
        'padStart',
        '</h1><button\x20id=\x22downloadBtn\x22>Download\x20Excel</button></div><h3>Total\x20Item:\x20',
        'now',
        '\x20|\x20Total\x20Revenue:\x20',
        'Profit\x20(ROAS)',
        'Item\x20ID',
        '4665932oXEZbr',
        'bid-keyword',
        'Detail\x20Produk:\x20',
        'flex',
        'price',
        '</tr>',
        'long',
        'https://down-id.img.susercontent.com/file/',
        'Shop\x20ID',
        'keyword',
        'Tampilkan\x20Data\x20Tersimpan',
        '20px',
        'fetch',
        'error',
        '</th>',
        'expiry_date',
        'Scraping...',
        '\x20|\x20Sold\x2030\x20Days:\x20',
        'catch',
        'Scraping...\x20[',
        'Produk\x20Toko',
        '<i>Arahkan\x20ke\x20halaman\x20toko,\x20pencarian,\x20atau\x20produk\x20untuk\x20memulai...</i>',
        'Mar',
        'opacity\x200.3s,\x20background-color\x200.3s',
        '8px',
        'scrapedAt',
        'shop_',
        'Toko/Kampanye',
        'substr',
        'backgroundColor',
        'getMonth',
        'getItem',
        'Nov',
        '✔️\x20<strong\x20style=\x22color:#17a2b8;\x22>Detail\x20Produk\x20Siap</strong><br>',
        'Manual',
        'Rating\x20Count',
        'Refresh\x20&\x20Scrape\x20Data',
        'Lainnya\x20(',
        'replace',
        'const\x20rows\x20=\x20',
        'total_revenue',
        '[\x20+\x20]',
        'log',
        'open',
        'historical_sold',
        '.xlsx\x22);\x20});',
        'numeric',
        'Kata\x20Kunci\x20(eCPC)',
        'random',
        'shop_name',
        'username',
        'URL',
        '✔️\x20<strong\x20style=\x22color:#007bff;\x22>Pencarian\x20\x22',
        'predicted_gmv',
        'id-ID',
        '<i>Data\x20cache\x20rusak.</i>',
        'Date\x20Created',
        '<a\x20href=\x22',
        'collapsed',
        '</div><script>',
        '[Main\x20Script]\x20Sinyal\x20scrape-finished\x20diterima!',
        'getElementById',
        'Feb',
        'bid_price',
        '5px',
        'shopeeScraperData_',
        '%\x20▼</span>',
        'adjusted_bid_price',
        'act_password',
        'pushState',
        '0\x202px\x206px\x20rgba(0,0,0,0.1)',
        '/api/v4/search/search_items',
        'Selesai!\x20Menampilkan...',
        'none',
        'space-between',
        'json_data',
        'Buffer\x20underflow',
        'devices',
        'style=\x22display:\x20none;\x22',
        'pgmv',
        'innerHTML',
        'Gagal\x20membuka\x20tab\x20baru.\x20Mohon\x20izinkan\x20pop-up.',
        'message',
        '18768266hNwHen',
        '1365haJzYv',
        'shopee_scraper_ui_state',
        'bid-type',
        'Arial',
        '</a>',
        'Target\x20CIR/ROAS',
        'Product\x20Name',
        'Rating',
        '7OcyQpf',
        '14px',
        'item_rating',
        '<!DOCTYPE\x20html><html\x20lang=\x22id\x22><head><meta\x20charset=\x22UTF-8\x22><title>',
        'disabled',
        'validate',
        'Shopee\x20URL',
        'scraper-main-container',
        'brand',
        'Arial,\x20sans-serif',
        'Data\x20Tersimpan',
        '\x0amakeTableSortable(\x27resultTable\x27);',
        'Gagal\x20memproses\x20data\x20detail\x20produk.',
        'test',
        'children',
        'Belum\x20Ada\x20Data\x20Tersimpan',
        'Brand',
        'shopData',
        'ads_keyword',
        'shop_id',
        '</script></body></html>',
        '6640092NOiNSU',
        'Data\x20tersimpan:\x20<strong>',
        '10px\x2015px',
        'model_id',
        'click',
        'ad_objective',
        'Mall',
        'Shop\x20Name',
        'data',
        'item_basic',
        'Star',
        'Star+',
        'Predicted\x20GMV\x20(Rp)',
        'number',
        'sticky-col',
        '.xlsx\x22);});',
        'origin-deduction',
        'Tampilkan\x20Data\x20(',
        'complete',
        '#007bff;\x20font-weight:bold;',
        'startsWith',
        'removeItem',
        'map',
        'account-details-content',
        '#fff',
        '#ee4d2d',
        'searchParams',
        'location',
        'sold',
        'Konversi\x20(ROI)',
        'Price',
        '</strong></p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20style=\x22font-size:13px;\x20margin:\x2010px\x200\x205px\x200;\x22>Perangkat\x20Terdaftar:</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<ul\x20style=\x22margin:0;\x20padding-left:\x2020px;\x20font-size:\x2013px;\x22>',
        'Apr',
        'expanded',
        'Jun',
        'Revenue\x2030\x20Days',
        'activation-container',
        'target_keyword',
        'getHours',
        '10000',
        '0\x204px\x208px\x20rgba(0,0,0,0.1)',
        'ctime',
        'rating_star',
        'Kata\x20Kunci\x20(CPC)',
        '%\x20▲</span>',
        '1px\x20solid\x20#eee',
        'close',
        'display',
        'Tidak\x20ada\x20data\x20hasil\x20pencarian.',
        'sticky-col-',
        '3KpDbZE',
        '9999',
        'Shop\x20Location',
        'indexOf',
        'target_cir',
        'Tidak\x20Diketahui',
        'application/json',
        'Ad\x20Objective',
        'Sesi\x20berakhir:\x20',
        '0.5',
        '\x20★</span><br><span\x20style=\x22font-size:\x2010px;\x20color:\x20#888;\x22>Shop\x20ID:\x20',
        'pricing-type',
        'textContent',
        'shop_location',
        'dispatchEvent',
        '1px\x20solid\x20#ccc',
        '0,0%',
        '<i>Belum\x20ada\x20data\x20tersimpan.</i>',
        'button',
        'join',
        'readyState',
        '</span><br><span>Produk:\x20',
        'Agu',
        'getMinutes',
        '300px',
        '144zFosWD',
        ';\x20const\x20rows=',
        ';\x20document.getElementById(\x27downloadBtn\x27).addEventListener(\x27click\x27,\x20()\x20=>\x20{\x20const\x20ws\x20=\x20XLSX.utils.json_to_sheet(rows);\x20const\x20wb\x20=\x20XLSX.utils.book_new();\x20XLSX.utils.book_append_sheet(wb,\x20ws,\x20\x22ProductDetail\x22);\x20XLSX.writeFile(wb,\x20\x22shopee_detail_',
        '320px',
        'substring',
        '<strong\x20style=\x22color:\x20#ee4d2d;\x20font-size:\x2014px;\x22>',
        'addEventListener',
        'charCodeAt',
        'scrape-finished',
        'Tampilkan\x20Detail\x20Produk',
        '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20style=\x22font-size:13px;\x20margin:\x204px\x200;\x22>Username:\x20<strong>',
        'keys',
        'innerText',
        'Tidak\x20ada\x20data\x20tersimpan\x20untuk\x20toko\x20ini.',
        'search',
        'avg_sold_per_month',
        '</tr></thead><tbody>',
        'responseText',
        'Sold\x2030\x20Days',
        '<td\x20class=\x22',
        'Bid\x20(Rp)',
        '/search',
        'push',
        '\x20item)<br>',
        'history',
        'Konversi\x20(ROI\x20v2)',
        'Apakah\x20Anda\x20yakin\x20ingin\x20menghapus\x20akun\x20dari\x20browser\x20ini?',
        '</strong>',
        '<th\x20class=\x22',
        'Image',
        '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h3\x20style=\x22margin-top:0;\x20color:#ee4d2d;\x22>Aktivasi\x20Tools</h3>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20style=\x22font-size:13px;\x20color:#555;\x22>Silakan\x20masukkan\x20akun\x20Anda.</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20type=\x22text\x22\x20id=\x22act_username\x22\x20placeholder=\x22Username\x22\x20style=\x22width:\x2095%;\x20padding:\x208px;\x20margin-bottom:\x2010px;\x20border:\x201px\x20solid\x20#ddd;\x20border-radius:\x204px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20type=\x22password\x22\x20id=\x22act_password\x22\x20placeholder=\x22Password\x22\x20style=\x22width:\x2095%;\x20padding:\x208px;\x20margin-bottom:\x2015px;\x20border:\x201px\x20solid\x20#ddd;\x20border-radius:\x204px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22act_btn_login\x22\x20style=\x22width:\x20100%;\x20padding:\x2010px;\x20background-color:\x20#007bff;\x20color:\x20white;\x20border:\x20none;\x20border-radius:\x204px;\x20cursor:\x20pointer;\x22>Aktivasi</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20id=\x22act_status\x22\x20style=\x22margin-top:\x2015px;\x20font-size:\x2013px;\x20color:\x20red;\x22></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20',
        'toLocaleDateString',
        'createElement',
        'injected-scraper-v5',
        'localStorage',
        '</h1><button\x20id=\x22downloadBtn\x22>Download\x20Excel</button></div><div\x20class=\x22table-container\x22><table\x20id=\x22resultTable\x22><thead><tr>',
        'then',
        '4KfdoeT',
        '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20(function()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x27use\x20strict\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20startInjectedScraping\x20=\x20async\x20(shop_id,\x20shop_name_from_event)\x20=>\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20limit=30,\x20delay=1500;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20getCookie=(name)=>{const\x20v=`;\x20${document.cookie}`,p=v.split(`;\x20${name}=`);if(p.length===2)return\x20p.pop().split(\x27;\x27).shift();return\x27\x27};\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20createShopeeURL=(name,shopid,itemid)=>{if(!name||!shopid||!itemid)return\x27N/A\x27;const\x20n=String(name).trim().toLowerCase().replace(/\x5cs+/g,\x27-\x27).replace(/[^\x5cw-]+/g,\x27\x27).substring(0,70);return`https://shopee.co.id/${n}-i.${shopid}.${itemid}`;};\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20extractFields=(item)=>{const\x20n=item?.name??\x27N/A\x27,p=typeof\x20item?.price===\x27number\x27?parseFloat((item.price/100000).toFixed(2)):\x27N/A\x27,s30=item?.sold??item?.monthly_sold??\x27N/A\x27,hs=item?.historical_sold??\x27N/A\x27,sn=item?.shop_name??\x27N/A\x27,is=item?.item_status??(item?.stock===0?\x27sold_out\x27:\x27normal\x27),st=is===\x27normal\x27?\x27Ready\x27:is===\x27sold_out\x27?\x27Sold\x20Out\x27:is,it=String(item?.itemid??\x27N/A\x27),si=String(item?.shopid??\x27N/A\x27),ct=item?.ctime,ud=typeof\x20ct===\x27number\x27?new\x20Date(ct*1000).toISOString().split(\x27T\x27)[0]:\x27N/A\x27,ir=item?.item_rating,rc=ir?.rating_count?.[0]??0,rsr=ir?.rating_star??0,rs=Number(rsr).toFixed(1),sl=item?.shop_location??\x27N/A\x27,url=createShopeeURL(n,si,it);return[n,p,s30,hs,url,sn,st,it,si,ud,rs,rc,sl]};\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20fetchReady=async(o)=>fetch(\x27https://shopee.co.id/api/v4/shop/rcmd_items\x27,{method:\x27POST\x27,headers:{\x27accept\x27:\x27application/json\x27,\x27content-type\x27:\x27application/json\x27,\x27x-api-source\x27:\x27pc\x27,\x27x-csrftoken\x27:getCookie(\x27csrftoken\x27),\x27x-requested-with\x27:\x27XMLHttpRequest\x27,\x27x-shopee-language\x27:\x27id\x27},credentials:\x27include\x27,body:JSON.stringify({bundle:\x22shop_page_category_tab_main\x22,shop_id,limit,offset:o,sort_type:13})}).then(r=>r.json());\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20fetchSold=async(o)=>fetch(`https://shopee.co.id/api/v4/shop/search_items?filter_sold_out=1&limit=${limit}&offset=${o}&order=desc&shopid=${shop_id}&sort_by=pop`,{credentials:\x27include\x27}).then(r=>r.json());\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20allItems=[];\x20let\x20offset=0,\x20hasMore=true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20while(hasMore){const\x20d=await\x20fetchReady(offset),i=d?.data?.items||[];if(i.length>0){allItems.push(...i);offset+=limit;\x20localStorage.setItem(\x27shopee_scrape_progress_count\x27,\x20allItems.length);}if(d?.data?.no_more||i.length<limit)hasMore=false;await\x20new\x20Promise(r=>setTimeout(r,delay));}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20offset=0;hasMore=true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20while(hasMore){const\x20d=await\x20fetchSold(offset),i=d.items||[];if(i.length>0){allItems.push(...i.map(it=>it.item_basic));offset+=limit;\x20localStorage.setItem(\x27shopee_scrape_progress_count\x27,\x20allItems.length);}if(i.length<limit)hasMore=false;await\x20new\x20Promise(r=>setTimeout(r,delay));}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x20alert(`[Injected\x20Scraper]\x20Scraping\x20gagal:\x20${e.message}`);\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if(allItems.length\x20>\x200)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20headers=[\x22Item\x20Name\x22,\x22Price(IDR)\x22,\x22Sold(30\x20Days)\x22,\x22Sold(Total)\x22,\x22Shopee\x20URL\x22,\x22Shop\x20Name\x22,\x22Status\x22,\x22ItemID\x22,\x22ShopID\x22,\x22Upload\x20Date\x22,\x22Rating\x22,\x22Rating\x20Count\x22,\x22Shop\x20Location\x22];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20rows=allItems.map(i=>extractFields(i));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20shopData={name:\x20shop_name_from_event,\x20shop_id};\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20dataToStore={headers,rows,shopData,scrapedAt:new\x20Date().toISOString()};\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20localStorage.setItem(`shopeeScraperData_${shop_id}`,\x20JSON.stringify(dataToStore));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(`[Injected]\x20Data\x20untuk\x20${shop_name_from_event}\x20berhasil\x20disimpan\x20ke\x20localStorage.`);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20document.dispatchEvent(new\x20CustomEvent(\x27scrape-finished\x27));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20};\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20document.addEventListener(\x27start-shopee-scrape\x27,\x20e\x20=>\x20startInjectedScraping(e.detail.shop_id,\x20e.detail.shop_name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27[+]\x20Injected\x20Shopee\x20Scraper\x20v5.4\x20logic\x20loaded.\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20})();\x0a\x20\x20\x20\x20\x20\x20\x20\x20',
        'Cost\x20(Rp)',
        'Sold(30\x20Days)',
        'get',
        'toLocaleString',
        'device_',
        '</strong><br><span>Followers:\x20',
        '1px\x20solid\x20#bde0ff',
        'from',
        'act_btn_login',
        'Total\x20Produk:\x20',
        'rating_count',
        'bid-price',
        'Sold\x20Trend',
        '#17a2b8',
        'Organik',
        '3098792UWQKYj',
        'models',
        'appendChild',
        'toLowerCase',
        'logout',
        'Tidak\x20ada\x20data\x20detail\x20produk.',
        '\x20Produk)',
        '10zqstkg',
        '<div\x20class=\x22header-controls\x22><h1>',
        'block',
        'login',
        'https://shopee.co.id/',
        'column',
        'remove',
        'itemid',
        'subarray',
        'bid-infos',
        'shopee_scrape_progress_count',
        '/api/v4/shop/get_shop_base',
        'Mei',
        '[\x20-\x20]',
        'toFixed',
        '</h3><div\x20class=\x22table-container\x22><table\x20id=\x22resultTable\x22><thead><tr>',
        'Username\x20dan\x20password\x20tidak\x20boleh\x20kosong.',
        'product_review',
        'deviceId',
        'Reguler',
        'getFullYear',
        '</strong></p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20style=\x22font-size:13px;\x20margin:\x204px\x200;\x22>Aktif\x20hingga:\x20<strong>',
        'Total\x20Sold',
        'rows',
        'follower_count',
        '</td>',
        'trim',
        '1.5',
        'origin',
        'style',
        'sold_trend',
        'Terjadi\x20kesalahan.',
        'forEach',
        '10px',
        'stock',
        '\x22\x20target=\x22_blank\x22\x20rel=\x22noopener\x20noreferrer\x22>',
        'Seller\x20Type',
        'wrap-text',
        'json',
        'Ad\x20Type',
        'opacity',
        'round',
        'items',
        'white',
        'includes',
        'Review',
        'Okt',
        '99105sLMvIU',
        'getDate',
        'Avg\x20Sold/Month',
        'pointer',
        'Hasil\x20Pencarian:\x20',
        '</ul>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22act_btn_logout\x22\x20style=\x22width:\x20100%;\x20padding:\x206px;\x20background-color:\x20#dc3545;\x20color:\x20white;\x20border:\x20none;\x20border-radius:\x204px;\x20cursor:\x20pointer;\x20margin-top:\x2015px;\x20font-size:\x2013px;\x22>Hapus\x20Akun\x20dari\x20Browser\x20Ini</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20',
        'length',
        'popstate',
        'status',
        'function\x20makeTableSortable(tableId){const\x20table=document.getElementById(tableId),headers=table.querySelectorAll(\x27thead\x20th\x27);let\x20sortDirections=Array.from(headers).map(()=>null);headers.forEach((header,index)=>{header.addEventListener(\x27click\x27,()=>{const\x20tbody=table.querySelector(\x27tbody\x27),rows=Array.from(tbody.rows),currentDir=sortDirections[index],newDir=currentDir===\x27asc\x27?\x27desc\x27:\x27asc\x27;sortDirections.fill(null);headers.forEach(h=>h.querySelector(\x27span.sort-indicator\x27)?.remove());sortDirections[index]=newDir;const\x20indicator=document.createElement(\x27span\x27);indicator.className=\x27sort-indicator\x27;indicator.textContent=newDir===\x27asc\x27?\x27\x20▲\x27:\x27\x20▼\x27;header.appendChild(indicator);rows.sort((a,b)=>{const\x20cellA=a.cells[index].innerText.trim(),cellB=b.cells[index].innerText.trim(),numA=parseFloat(cellA.replace(/\x5c./g,\x22\x22).replace(\x22,\x22,\x22.\x22)),numB=parseFloat(cellB.replace(/\x5c./g,\x22\x22).replace(\x22,\x22,\x22.\x22));let\x20comparison=0;if(!isNaN(numA)&&!isNaN(numB)){comparison=numA-numB}else{comparison=cellA.localeCompare(cellB,\x27id-ID\x27,{numeric:true,sensitivity:\x27base\x27})}return\x20newDir===\x27asc\x27?comparison:-comparison});while(tbody.firstChild){tbody.removeChild(tbody.firstChild)}tbody.append(...rows)})})}',
        'name',
        '12px',
        '12px\x2015px',
        'Otomatis',
        'Total\x20Revenue',
        'image',
        'Jul',
        'document',
        'warn',
        'pathname',
        'Default\x20Variation',
        'is_preferred_plus_seller',
        'shopee_verified',
        'assign',
        'shopid',
        'bid_type_str',
        '<li\x20style=\x22font-size:11px;\x20color:',
        '#28a745',
        '<span\x20style=\x22color:green;\x22>+',
        'N/A',
        'item',
        '<th>',
        'parse',
        '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h4\x20style=\x22margin:0;\x20color:#0056b3;\x20font-size:\x2016px;\x22>Info\x20Akun</h4>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20id=\x22toggle-account-info\x22\x20style=\x22cursor:\x20pointer;\x20font-weight:\x20bold;\x20padding:\x200\x205px;\x20font-size:\x2018px;\x20color:\x20#0056b3;\x22>[\x20-\x20]</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'
    ];
    _0xa220 = function () {
        return _0x550990;
    };
    return _0xa220();
}
(function (_0x3acefe, _0x307869) {
    const _0x1e696f = _0x13a4, _0x22ab79 = _0x3acefe();
    while (!![]) {
        try {
            const _0x2dcdf6 = -parseInt(_0x1e696f(0x15f)) / 0x1 * (-parseInt(_0x1e696f(0xe0)) / 0x2) + -parseInt(_0x1e696f(0xa2)) / 0x3 * (parseInt(_0x1e696f(0x168)) / 0x4) + parseInt(_0x1e696f(0x127)) / 0x5 * (parseInt(_0x1e696f(0xbb)) / 0x6) + parseInt(_0x1e696f(0x1c4)) / 0x7 * (parseInt(_0x1e696f(0xf1)) / 0x8) + -parseInt(_0x1e696f(0x70)) / 0x9 * (parseInt(_0x1e696f(0xf8)) / 0xa) + parseInt(_0x1e696f(0x1bb)) / 0xb + parseInt(_0x1e696f(0x152)) / 0xc * (-parseInt(_0x1e696f(0x1bc)) / 0xd);
            if (_0x2dcdf6 === _0x307869)
                break;
            else
                _0x22ab79['push'](_0x22ab79['shift']());
        } catch (_0x2b250f) {
            _0x22ab79['push'](_0x22ab79['shift']());
        }
    }
}(_0xa220, 0xe381f));
let interceptedShopData = null, interceptedSearchData = {
        'items': [],
        'keyword': null
    }, interceptedProductDetail = {
        'data': null,
        'url': null
    }, uiCreated = ![], scraperInfoPanel, scraperStatusArea, refreshButton, showStoredButton, showSearchButton, showDetailButton;
const originalFetch = unsafeWindow[_0x462b9b(0x174)];
unsafeWindow[_0x462b9b(0x174)] = async function (..._0x44f57c) {
    const _0x324ff8 = _0x462b9b, _0x546360 = await originalFetch['apply'](unsafeWindow, _0x44f57c), _0x1d2031 = typeof _0x44f57c[0x0] === 'string' ? _0x44f57c[0x0] : _0x44f57c[0x0][_0x324ff8(0x15e)];
    if (_0x546360['ok']) {
        const _0x30988f = _0x546360['clone']();
        if (_0x1d2031[_0x324ff8(0x124)](_0x324ff8(0x103)))
            _0x30988f[_0x324ff8(0x11e)]()[_0x324ff8(0xdf)](_0x3e4896 => {
                const _0x1e5ebb = _0x324ff8;
                if (_0x3e4896[_0x1e5ebb(0x78)] && _0x3e4896[_0x1e5ebb(0x78)][_0x1e5ebb(0x13f)]) {
                    interceptedShopData = _0x3e4896[_0x1e5ebb(0x78)];
                    if (uiCreated)
                        updateUI();
                }
            })[_0x324ff8(0x17a)](_0x191888 => {
            });
        else {
            if (_0x1d2031['includes'](_0x324ff8(0x1af)))
                _0x30988f[_0x324ff8(0x11e)]()[_0x324ff8(0xdf)](_0x89380c => {
                    const _0x4a2c8c = _0x324ff8;
                    if (_0x89380c && _0x89380c['items'] && _0x89380c[_0x4a2c8c(0x122)][_0x4a2c8c(0x12d)] > 0x0) {
                        const _0x5ceabc = new URL(_0x1d2031, unsafeWindow[_0x4a2c8c(0x8b)][_0x4a2c8c(0x114)])[_0x4a2c8c(0x8a)][_0x4a2c8c(0xe4)](_0x4a2c8c(0x171)) || 'Unknown';
                        interceptedSearchData[_0x4a2c8c(0x171)] !== _0x5ceabc && (interceptedSearchData = {
                            'items': [],
                            'keyword': _0x5ceabc
                        });
                        interceptedSearchData[_0x4a2c8c(0x122)]['push'](..._0x89380c[_0x4a2c8c(0x122)]);
                        if (uiCreated)
                            updateUI();
                    }
                })[_0x324ff8(0x17a)](_0x4a4017 => {
                });
            else
                _0x1d2031['includes']('/api/v4/pdp/get_pc') && _0x30988f[_0x324ff8(0x11e)]()['then'](_0x506d9d => {
                    const _0x4f57c3 = _0x324ff8;
                    if (_0x506d9d && _0x506d9d[_0x4f57c3(0x78)] && _0x506d9d[_0x4f57c3(0x78)][_0x4f57c3(0x145)]) {
                        interceptedProductDetail = {
                            'data': _0x506d9d,
                            'url': _0x1d2031
                        };
                        if (uiCreated)
                            updateUI();
                    }
                })[_0x324ff8(0x17a)](_0x226ecf => {
                });
        }
    }
    return _0x546360;
};
function onUrlChange() {
    const _0x5ed801 = _0x462b9b;
    if (!uiCreated)
        return;
    const _0x1325cb = unsafeWindow[_0x5ed801(0x8b)][_0x5ed801(0x13a)], _0x2c9933 = /^\/([a-zA-Z0-9_.-]+)$/[_0x5ed801(0x1d1)](_0x1325cb) && !_0x1325cb[_0x5ed801(0x124)](_0x5ed801(0xc9)) && !/-i\.\d+\.\d+/['test'](_0x1325cb), _0x5288a6 = /-i\.\d+\.\d+/['test'](_0x1325cb), _0x5e2112 = _0x1325cb[_0x5ed801(0x84)](_0x5ed801(0xd0));
    if (!_0x5288a6)
        interceptedProductDetail = {
            'data': null,
            'url': null
        };
    if (!_0x5e2112)
        interceptedSearchData = {
            'items': [],
            'keyword': null
        };
    if (!_0x2c9933)
        interceptedShopData = null;
    updateUI();
}
(function (_0x55504c) {
    const _0x5499c4 = _0x462b9b, _0x2f7595 = _0x55504c[_0x5499c4(0x1ad)];
    _0x55504c[_0x5499c4(0x1ad)] = function (_0x52de7f) {
        const _0x41f504 = _0x2f7595['apply'](_0x55504c, arguments);
        return onUrlChange(), _0x41f504;
    }, unsafeWindow[_0x5499c4(0xc1)](_0x5499c4(0x12e), onUrlChange);
}(unsafeWindow[_0x462b9b(0xd3)]));
const API_URL = 'https://script.google.com/macros/s/AKfycbzLxkI1cLZNd0JJD-B9quBgMlyItqJnWLwiEFZ9eqN6mNVszOEyRgNlUJwc8ZmQ4FL_Og/exec', STATE_KEY = 'shopee_scraper_activation_state', UI_STATE_KEY = _0x462b9b(0x1bd);
function createActivationUI() {
    const _0x466498 = _0x462b9b, _0x4b3ec8 = document['getElementById'](_0x466498(0x94));
    if (_0x4b3ec8)
        _0x4b3ec8[_0x466498(0xfe)]();
    const _0x43e1bf = document[_0x466498(0xdb)](_0x466498(0x151));
    _0x43e1bf['id'] = _0x466498(0x94), Object[_0x466498(0x13e)](_0x43e1bf[_0x466498(0x115)], {
        'position': 'fixed',
        'bottom': _0x466498(0x173),
        'left': _0x466498(0x173),
        'zIndex': _0x466498(0x97),
        'backgroundColor': _0x466498(0x88),
        'border': _0x466498(0xb1),
        'borderRadius': _0x466498(0x180),
        'boxShadow': _0x466498(0x98),
        'padding': _0x466498(0x173),
        'fontFamily': _0x466498(0x1bf),
        'width': _0x466498(0xba)
    }), _0x43e1bf[_0x466498(0x1b8)] = _0x466498(0xd9), document['body'][_0x466498(0xf3)](_0x43e1bf), document[_0x466498(0x1a5)](_0x466498(0xea))[_0x466498(0xc1)]('click', handleLogin);
}
async function createMainUI(_0x465a53) {
    const _0x2e8fcd = _0x462b9b, _0x85891 = document[_0x2e8fcd(0x1a5)](_0x2e8fcd(0x94));
    if (_0x85891)
        _0x85891[_0x2e8fcd(0xfe)]();
    const _0x1a7cfe = document['getElementById'](_0x2e8fcd(0x1cb));
    if (_0x1a7cfe)
        _0x1a7cfe[_0x2e8fcd(0xfe)]();
    const _0xd81c34 = document[_0x2e8fcd(0xdb)]('div');
    _0xd81c34['id'] = _0x2e8fcd(0x1cb), Object[_0x2e8fcd(0x13e)](_0xd81c34['style'], {
        'position': 'fixed',
        'bottom': '20px',
        'left': _0x2e8fcd(0x173),
        'zIndex': _0x2e8fcd(0xa3),
        'display': _0x2e8fcd(0x16b),
        'flexDirection': _0x2e8fcd(0xfd),
        'gap': _0x2e8fcd(0x119),
        'width': _0x2e8fcd(0xbe),
        'fontFamily': _0x2e8fcd(0x1cd)
    });
    const _0x5eb3a1 = document[_0x2e8fcd(0xdb)](_0x2e8fcd(0x151));
    Object['assign'](_0x5eb3a1[_0x2e8fcd(0x115)], {
        'backgroundColor': '#f0f8ff',
        'border': _0x2e8fcd(0xe8),
        'borderRadius': _0x2e8fcd(0x180),
        'padding': _0x2e8fcd(0x133),
        'boxShadow': _0x2e8fcd(0x1ae)
    });
    const _0x321b83 = document[_0x2e8fcd(0xdb)](_0x2e8fcd(0x151));
    Object['assign'](_0x321b83[_0x2e8fcd(0x115)], {
        'display': 'flex',
        'justifyContent': _0x2e8fcd(0x1b2),
        'alignItems': 'center',
        'marginBottom': _0x2e8fcd(0x119)
    }), _0x321b83['innerHTML'] = _0x2e8fcd(0x148);
    const _0x4d39e3 = document[_0x2e8fcd(0xdb)](_0x2e8fcd(0x151));
    _0x4d39e3['id'] = _0x2e8fcd(0x87);
    const _0x1d29d5 = new Date(_0x465a53['expiry_date'])[_0x2e8fcd(0xda)](_0x2e8fcd(0x19e), {
            'day': _0x2e8fcd(0x196),
            'month': _0x2e8fcd(0x16e),
            'year': 'numeric'
        }), _0x4a3dc8 = _0x465a53[_0x2e8fcd(0x1b5)]['map'](_0x984274 => _0x2e8fcd(0x141) + (_0x984274 === _0x465a53['deviceId'] ? _0x2e8fcd(0x83) : '#555;') + '\x22>' + _0x984274 + '\x20' + (_0x984274 === _0x465a53[_0x2e8fcd(0x10a)] ? '(Browser\x20ini)' : '') + _0x2e8fcd(0x14d))[_0x2e8fcd(0xb5)]('');
    _0x4d39e3[_0x2e8fcd(0x1b8)] = _0x2e8fcd(0xc5) + _0x465a53[_0x2e8fcd(0x19a)] + _0x2e8fcd(0x10d) + _0x1d29d5 + _0x2e8fcd(0x8f) + _0x4a3dc8 + _0x2e8fcd(0x12c), _0x5eb3a1[_0x2e8fcd(0xf3)](_0x321b83), _0x5eb3a1[_0x2e8fcd(0xf3)](_0x4d39e3), _0xd81c34['appendChild'](_0x5eb3a1);
    const _0x5987b2 = document[_0x2e8fcd(0xdb)]('div');
    _0x5987b2['id'] = 'scraper-panel', Object[_0x2e8fcd(0x13e)](_0x5987b2[_0x2e8fcd(0x115)], {
        'backgroundColor': _0x2e8fcd(0x88),
        'border': _0x2e8fcd(0xb1),
        'borderRadius': _0x2e8fcd(0x180),
        'padding': '12px\x2015px',
        'boxShadow': _0x2e8fcd(0x1ae),
        'display': _0x2e8fcd(0x16b),
        'flexDirection': 'column',
        'gap': _0x2e8fcd(0x119)
    }), scraperInfoPanel = document[_0x2e8fcd(0xdb)](_0x2e8fcd(0x151)), Object[_0x2e8fcd(0x13e)](scraperInfoPanel['style'], {
        'fontSize': _0x2e8fcd(0x132),
        'lineHeight': _0x2e8fcd(0x113)
    }), scraperStatusArea = document[_0x2e8fcd(0xdb)](_0x2e8fcd(0x151)), Object[_0x2e8fcd(0x13e)](scraperStatusArea['style'], {
        'marginTop': '10px',
        'paddingTop': '10px',
        'borderTop': _0x2e8fcd(0x9d)
    }), scraperInfoPanel[_0x2e8fcd(0xf3)](document[_0x2e8fcd(0xdb)](_0x2e8fcd(0x151))), scraperInfoPanel[_0x2e8fcd(0xf3)](scraperStatusArea);
    const _0x1c9d69 = document[_0x2e8fcd(0xdb)](_0x2e8fcd(0x151));
    Object['assign'](_0x1c9d69['style'], {
        'display': 'flex',
        'flexDirection': _0x2e8fcd(0xfd),
        'gap': _0x2e8fcd(0x180)
    }), refreshButton = document[_0x2e8fcd(0xdb)](_0x2e8fcd(0xb4)), refreshButton[_0x2e8fcd(0xc7)] = _0x2e8fcd(0x18c), refreshButton['style']['backgroundColor'] = _0x2e8fcd(0x89), showStoredButton = document[_0x2e8fcd(0xdb)](_0x2e8fcd(0xb4)), showStoredButton[_0x2e8fcd(0xc7)] = _0x2e8fcd(0x172), showStoredButton[_0x2e8fcd(0x115)][_0x2e8fcd(0x185)] = _0x2e8fcd(0x142), showSearchButton = document[_0x2e8fcd(0xdb)]('button'), showSearchButton[_0x2e8fcd(0xc7)] = 'Tampilkan\x20Hasil\x20Pencarian', showSearchButton['style'][_0x2e8fcd(0x185)] = '#007bff', showDetailButton = document['createElement'](_0x2e8fcd(0xb4)), showDetailButton[_0x2e8fcd(0xc7)] = _0x2e8fcd(0xc4), showDetailButton[_0x2e8fcd(0x115)][_0x2e8fcd(0x185)] = _0x2e8fcd(0xef);
    const _0x49f191 = [
        refreshButton,
        showStoredButton,
        showSearchButton,
        showDetailButton
    ];
    _0x49f191[_0x2e8fcd(0x118)](_0x54e47d => {
        const _0x15d84a = _0x2e8fcd;
        Object[_0x15d84a(0x13e)](_0x54e47d[_0x15d84a(0x115)], {
            'color': _0x15d84a(0x123),
            'border': _0x15d84a(0x1b1),
            'borderRadius': _0x15d84a(0x1a8),
            'cursor': _0x15d84a(0x12a),
            'padding': _0x15d84a(0x72),
            'fontSize': _0x15d84a(0x1c5),
            'transition': _0x15d84a(0x17f),
            'display': _0x15d84a(0x1b1)
        }), _0x1c9d69[_0x15d84a(0xf3)](_0x54e47d);
    }), _0x5987b2['appendChild'](scraperInfoPanel), _0x5987b2[_0x2e8fcd(0xf3)](_0x1c9d69), _0xd81c34['appendChild'](_0x5987b2), document[_0x2e8fcd(0x15a)][_0x2e8fcd(0xf3)](_0xd81c34), document[_0x2e8fcd(0x1a5)]('act_btn_logout')[_0x2e8fcd(0xc1)](_0x2e8fcd(0x74), handleLogout), refreshButton[_0x2e8fcd(0xc1)]('click', startStoreScraping), showStoredButton[_0x2e8fcd(0xc1)](_0x2e8fcd(0x74), showStoredData), showSearchButton[_0x2e8fcd(0xc1)](_0x2e8fcd(0x74), displaySearchResults), showDetailButton[_0x2e8fcd(0xc1)](_0x2e8fcd(0x74), displayProductDetail);
    const _0x103286 = document[_0x2e8fcd(0x1a5)]('toggle-account-info'), _0x5d7837 = (_0x5b15aa, _0x32561f = ![]) => {
            const _0x3c5c96 = _0x2e8fcd;
            _0x5b15aa === _0x3c5c96(0x1a2) ? (_0x4d39e3[_0x3c5c96(0x115)]['display'] = 'none', _0x103286['textContent'] = _0x3c5c96(0x191)) : (_0x4d39e3[_0x3c5c96(0x115)]['display'] = _0x3c5c96(0xfa), _0x103286[_0x3c5c96(0xae)] = _0x3c5c96(0x105)), !_0x32561f && GM_setValue(UI_STATE_KEY, _0x5b15aa);
        };
    _0x103286['addEventListener'](_0x2e8fcd(0x74), () => {
        const _0x1bdf88 = _0x2e8fcd, _0x239242 = _0x4d39e3[_0x1bdf88(0x115)][_0x1bdf88(0x9f)] === _0x1bdf88(0x1b1) ? _0x1bdf88(0x91) : _0x1bdf88(0x1a2);
        _0x5d7837(_0x239242);
    });
    const _0x305df2 = await GM_getValue(UI_STATE_KEY, _0x2e8fcd(0x91));
    _0x5d7837(_0x305df2, !![]), uiCreated = !![], updateUI();
}
function apiCall(_0x5dee48, _0x10f37b) {
    return new Promise((_0x23b099, _0x811083) => {
        const _0xbee65b = _0x13a4;
        GM_xmlhttpRequest({
            'method': 'POST',
            'url': API_URL,
            'data': JSON[_0xbee65b(0x14c)]({
                'action': _0x5dee48,
                ..._0x10f37b
            }),
            'headers': { 'Content-Type': _0xbee65b(0xa8) },
            'onload': function (_0x38cb35) {
                const _0x414763 = _0xbee65b;
                try {
                    const _0xee6223 = JSON[_0x414763(0x147)](_0x38cb35[_0x414763(0xcc)]);
                    _0x23b099(_0xee6223);
                } catch (_0x197036) {
                    _0x811083({
                        'status': _0x414763(0x175),
                        'message': 'Gagal\x20memproses\x20respon\x20API.'
                    });
                }
            },
            'onerror': function (_0x59dc55) {
                _0x811083({
                    'status': 'error',
                    'message': 'Gagal\x20terhubung\x20ke\x20server\x20aktivasi.'
                });
            }
        });
    });
}
async function handleLogin() {
    const _0x59dbea = _0x462b9b, _0x20f1ac = document[_0x59dbea(0x1a5)]('act_username')['value'][_0x59dbea(0x112)](), _0x279168 = document[_0x59dbea(0x1a5)](_0x59dbea(0x1ac))['value'][_0x59dbea(0x112)](), _0x4875af = document[_0x59dbea(0x1a5)]('act_status'), _0x2f15d3 = document[_0x59dbea(0x1a5)](_0x59dbea(0xea));
    if (!_0x20f1ac || !_0x279168) {
        _0x4875af['textContent'] = _0x59dbea(0x108);
        return;
    }
    _0x4875af[_0x59dbea(0xae)] = 'Memverifikasi...', _0x2f15d3[_0x59dbea(0x1c8)] = !![];
    let _0x20b07b = await GM_getValue(STATE_KEY, {});
    !_0x20b07b[_0x59dbea(0x10a)] && (_0x20b07b[_0x59dbea(0x10a)] = _0x59dbea(0xe6) + Date[_0x59dbea(0x164)]() + Math[_0x59dbea(0x198)]()['toString'](0x24)[_0x59dbea(0x184)](0x2, 0x9));
    try {
        const _0x18d32e = await apiCall(_0x59dbea(0xfb), {
            'username': _0x20f1ac,
            'password': _0x279168,
            'deviceId': _0x20b07b[_0x59dbea(0x10a)]
        });
        if (_0x18d32e[_0x59dbea(0x12f)] === 'success') {
            const _0x1679f6 = {
                'activated': !![],
                'username': _0x20f1ac,
                'deviceId': _0x20b07b[_0x59dbea(0x10a)],
                'expiry_date': _0x18d32e[_0x59dbea(0x78)]['expiry_date'],
                'devices': _0x18d32e[_0x59dbea(0x78)][_0x59dbea(0x1b5)] || []
            };
            await GM_setValue(STATE_KEY, _0x1679f6), createMainUI(_0x1679f6);
        } else
            _0x4875af[_0x59dbea(0xae)] = _0x18d32e[_0x59dbea(0x1ba)] || _0x59dbea(0x117), _0x2f15d3['disabled'] = ![];
    } catch (_0x1c5ccc) {
        _0x4875af[_0x59dbea(0xae)] = _0x1c5ccc[_0x59dbea(0x1ba)] || 'Error\x20tidak\x20diketahui.', _0x2f15d3[_0x59dbea(0x1c8)] = ![];
    }
}
async function handleLogout() {
    const _0x3705d9 = _0x462b9b;
    if (!confirm(_0x3705d9(0xd5)))
        return;
    const _0x209580 = await GM_getValue(STATE_KEY, {});
    _0x209580[_0x3705d9(0x14b)] && await apiCall(_0x3705d9(0xf5), {
        'username': _0x209580[_0x3705d9(0x19a)],
        'deviceId': _0x209580[_0x3705d9(0x10a)]
    }), await GM_deleteValue(STATE_KEY), unsafeWindow['location'][_0x3705d9(0x159)]();
}
async function initialize() {
    const _0x14043d = _0x462b9b;
    injectScraper();
    let _0x29f63d = await GM_getValue(STATE_KEY, {});
    if (_0x29f63d && _0x29f63d[_0x14043d(0x14b)] && _0x29f63d[_0x14043d(0x19a)] && _0x29f63d[_0x14043d(0x10a)])
        try {
            const _0x3ffecb = await apiCall(_0x14043d(0x1c9), {
                'username': _0x29f63d['username'],
                'deviceId': _0x29f63d[_0x14043d(0x10a)]
            });
            _0x3ffecb[_0x14043d(0x12f)] === 'success' ? (_0x29f63d['expiry_date'] = _0x3ffecb[_0x14043d(0x78)][_0x14043d(0x177)], _0x29f63d[_0x14043d(0x1b5)] = _0x3ffecb[_0x14043d(0x78)][_0x14043d(0x1b5)], await GM_setValue(STATE_KEY, _0x29f63d), createMainUI(_0x29f63d)) : (await GM_deleteValue(STATE_KEY), createActivationUI(), setTimeout(() => {
                const _0x5efbc3 = _0x14043d, _0x5e900e = document[_0x5efbc3(0x1a5)]('act_status');
                if (_0x5e900e)
                    _0x5e900e[_0x5efbc3(0xae)] = _0x5efbc3(0xaa) + _0x3ffecb[_0x5efbc3(0x1ba)];
            }, 0x1f4));
        } catch (_0x8a14b0) {
            console[_0x14043d(0x139)]('Gagal\x20memvalidasi\x20sesi,\x20mengizinkan\x20penggunaan\x20offline.', _0x8a14b0[_0x14043d(0x1ba)]), createMainUI(_0x29f63d);
        }
    else
        createActivationUI();
}
function startStoreScraping() {
    const _0x4c1268 = _0x462b9b, _0x3e9d39 = interceptedShopData?.[_0x4c1268(0x13f)], _0x12ce9b = interceptedShopData?.[_0x4c1268(0x131)];
    if (!_0x3e9d39) {
        alert(_0x4c1268(0x15b));
        return;
    }
    refreshButton[_0x4c1268(0x1c8)] = !![], showStoredButton['disabled'] = !![], refreshButton[_0x4c1268(0xc7)] = _0x4c1268(0x178);
    let _0x3ff962;
    const _0x2d44e7 = () => {
        const _0x5e2dea = _0x4c1268, _0x499b94 = unsafeWindow['localStorage'][_0x5e2dea(0x187)](_0x5e2dea(0x102));
        _0x499b94 && (refreshButton[_0x5e2dea(0xc7)] = _0x5e2dea(0x17b) + _0x499b94 + ']');
    };
    _0x3ff962 = setInterval(_0x2d44e7, 0x1f4), unsafeWindow[_0x4c1268(0x138)][_0x4c1268(0xc1)](_0x4c1268(0xc3), () => {
        const _0x2a9b8d = _0x4c1268;
        clearInterval(_0x3ff962), unsafeWindow[_0x2a9b8d(0xdd)][_0x2a9b8d(0x85)](_0x2a9b8d(0x102)), console[_0x2a9b8d(0x192)](_0x2a9b8d(0x1a4)), refreshButton[_0x2a9b8d(0xc7)] = _0x2a9b8d(0x1b0), showStoredData(), setTimeout(() => {
            const _0x5d945f = _0x2a9b8d;
            refreshButton[_0x5d945f(0x1c8)] = ![], refreshButton[_0x5d945f(0xc7)] = _0x5d945f(0x18c), updateUI();
        }, 0x7d0);
    }, { 'once': !![] });
    const _0x1fe40b = new CustomEvent('start-shopee-scrape', {
        'detail': {
            'shop_id': _0x3e9d39,
            'shop_name': _0x12ce9b || _0x4c1268(0x182) + _0x3e9d39
        }
    });
    unsafeWindow['document'][_0x4c1268(0xb0)](_0x1fe40b);
}
function injectScraper() {
    const _0x71fca0 = _0x462b9b;
    if (document[_0x71fca0(0x1a5)]('injected-scraper-v5'))
        return;
    const _0x1b5118 = _0x71fca0(0xe1), _0x233047 = document[_0x71fca0(0xdb)]('script');
    _0x233047['id'] = _0x71fca0(0xdc), _0x233047['textContent'] = _0x1b5118, (document['head'] || document['documentElement'])['appendChild'](_0x233047);
}
function showStoredData() {
    const _0x48b13a = _0x462b9b, _0x465d4e = interceptedShopData?.['shopid'];
    if (!_0x465d4e)
        return;
    const _0x1a96c6 = unsafeWindow[_0x48b13a(0xdd)][_0x48b13a(0x187)](_0x48b13a(0x1a9) + _0x465d4e);
    if (_0x1a96c6)
        try {
            const _0xb8b1dd = JSON[_0x48b13a(0x147)](_0x1a96c6);
            displayStoreResultsInNewTab(_0xb8b1dd['headers'], _0xb8b1dd[_0x48b13a(0x10f)], _0xb8b1dd[_0x48b13a(0x1d5)], _0x48b13a(0x1ce));
        } catch (_0x1c0f08) {
            alert('Gagal\x20memuat\x20data\x20tersimpan,\x20mungkin\x20data\x20rusak.');
        }
    else
        alert(_0x48b13a(0xc8));
}
function displaySearchResults() {
    const _0x490570 = _0x462b9b;
    if (!interceptedSearchData || interceptedSearchData[_0x490570(0x122)]['length'] === 0x0) {
        alert(_0x490570(0xa0));
        return;
    }
    const _0xb15940 = interceptedSearchData['items'][_0x490570(0x86)](extractSearchItemData)['filter'](Boolean), _0x4fcc58 = Array[_0x490570(0xe9)](new Map(_0xb15940['map'](_0x4638a4 => [
            _0x4638a4[_0x490570(0xff)],
            _0x4638a4
        ]))['values']());
    _0x4fcc58[_0x490570(0x118)](_0x4e3862 => {
        const _0x4389c3 = _0x490570;
        _0x4e3862['revenue_30_days'] = _0x4e3862[_0x4389c3(0x16c)] * _0x4e3862[_0x4389c3(0x8c)], _0x4e3862[_0x4389c3(0x190)] = _0x4e3862['price'] * _0x4e3862[_0x4389c3(0x194)];
        const _0x421b34 = _0x4e3862[_0x4389c3(0x99)] === _0x4389c3(0x144) ? 0x1 : (new Date()[_0x4389c3(0x10c)]() - new Date(_0x4e3862[_0x4389c3(0x99)])[_0x4389c3(0x10c)]()) * 0xc + (new Date()[_0x4389c3(0x186)]() - new Date(_0x4e3862['ctime'])[_0x4389c3(0x186)]()) + 0x1 || 0x1;
        _0x4e3862[_0x4389c3(0xca)] = Math['round'](_0x4e3862[_0x4389c3(0x194)] / _0x421b34), _0x4e3862[_0x4389c3(0x116)] = _0x4e3862[_0x4389c3(0xca)] > 0x0 ? (_0x4e3862['sold'] - _0x4e3862[_0x4389c3(0xca)]) / _0x4e3862[_0x4389c3(0xca)] : _0x4e3862['sold'] > 0x0 ? 0x1 : 0x0;
    });
    const _0x3d27ec = {
            'name': _0x490570(0x1c2),
            'brand': 'Brand',
            'price': _0x490570(0x8e),
            'sold': _0x490570(0xcd),
            'historical_sold': _0x490570(0x10e),
            'revenue_30_days': _0x490570(0x93),
            'total_revenue': _0x490570(0x135),
            'seller_type': 'Seller\x20Type',
            'bid_type': _0x490570(0x11f),
            'ad_objective': _0x490570(0xa9),
            'bid_price': _0x490570(0xcf),
            'actual_cost': _0x490570(0xe2),
            'predicted_gmv': _0x490570(0x7c),
            'target_keyword': 'Target\x20Keyword',
            'target_cir_percent': _0x490570(0x1c1),
            'avg_sold_per_month': _0x490570(0x129),
            'sold_trend': _0x490570(0xee),
            'rating_star': 'Rating',
            'rating_count': _0x490570(0x125),
            'shop_name': 'Shop\x20Name',
            'shop_location': _0x490570(0xa4),
            'ctime': _0x490570(0x1a0),
            'stock': _0x490570(0x14e),
            'itemid': _0x490570(0x167),
            'shopid': _0x490570(0x170),
            'shopee_url': _0x490570(0x1ca),
            'image_url': _0x490570(0xd8)
        }, _0x2d4294 = [
            _0x490570(0xd8),
            _0x490570(0x1a0),
            _0x490570(0x1c2),
            'Shop\x20Name',
            _0x490570(0x11c),
            'Sold\x20Trend',
            _0x490570(0x8e),
            _0x490570(0xcd),
            'Total\x20Sold',
            _0x490570(0x129),
            _0x490570(0x93),
            _0x490570(0x135),
            _0x490570(0x1c3),
            _0x490570(0x125),
            _0x490570(0x11f),
            _0x490570(0xa9),
            'Target\x20Keyword',
            'Bid\x20(Rp)',
            _0x490570(0xe2),
            _0x490570(0x7c),
            'Target\x20CIR/ROAS',
            _0x490570(0xa4),
            _0x490570(0x1d4),
            _0x490570(0x14e),
            'Item\x20ID',
            _0x490570(0x170),
            _0x490570(0x1ca)
        ], _0x15f921 = _0x4fcc58['map'](_0x40d4b9 => {
            const _0x183e79 = _0x490570, _0x5ccbd1 = {};
            for (const _0x40bac5 in _0x40d4b9) {
                if (_0x3d27ec[_0x40bac5]) {
                    if (_0x40bac5 === _0x183e79(0x199)) {
                        const _0x306bdb = document['createElement'](_0x183e79(0x151));
                        _0x306bdb[_0x183e79(0x1b8)] = _0x40d4b9[_0x40bac5], _0x5ccbd1[_0x3d27ec[_0x40bac5]] = _0x306bdb[_0x183e79(0xae)] || _0x306bdb[_0x183e79(0xc7)] || '';
                    } else
                        _0x5ccbd1[_0x3d27ec[_0x40bac5]] = _0x40d4b9[_0x40bac5];
                }
            }
            return _0x5ccbd1;
        }), _0x2d0cd8 = _0x15f921['map'](_0x44f089 => {
            const _0x43ebe5 = {};
            return _0x2d4294['forEach'](_0x477a65 => {
                _0x43ebe5[_0x477a65] = _0x44f089[_0x477a65];
            }), _0x43ebe5;
        }), _0x130635 = Object[_0x490570(0xc6)](_0x2d0cd8[0x0]), _0x147b66 = _0x490570(0x12b) + interceptedSearchData[_0x490570(0x171)], _0x382bc1 = _0x130635[_0x490570(0x86)]((_0x583144, _0x4d2274) => {
            const _0x5c895d = _0x490570;
            let _0x36c4ef = [], _0x33be23 = '';
            return _0x4d2274 < 0x4 && _0x36c4ef['push']('sticky-col', _0x5c895d(0xa1) + (_0x4d2274 + 0x1)), _0x583144 === _0x5c895d(0x11c) && (_0x33be23 = _0x5c895d(0x1b6)), _0x5c895d(0xd7) + _0x36c4ef[_0x5c895d(0xb5)]('\x20') + '\x22\x20' + _0x33be23 + '>' + _0x583144 + _0x5c895d(0x176);
        })['join'](''), _0x32a824 = _0x2d0cd8[_0x490570(0x86)](_0x20f8a4 => {
            const _0x4ea521 = _0x490570, _0x4d16df = _0x130635[_0x4ea521(0x86)]((_0x393ba3, _0x582232) => {
                    const _0x2e1e8d = _0x4ea521;
                    let _0x474cbb = _0x20f8a4[_0x393ba3], _0x4ea8b5 = _0x474cbb, _0x1b6c85 = [], _0x5018db = '';
                    _0x582232 < 0x4 && _0x1b6c85[_0x2e1e8d(0xd1)](_0x2e1e8d(0x7e), _0x2e1e8d(0xa1) + (_0x582232 + 0x1));
                    _0x393ba3 === _0x2e1e8d(0x11c) && (_0x5018db = _0x2e1e8d(0x1b6));
                    (_0x393ba3 === _0x2e1e8d(0x1c2) || _0x393ba3 === _0x2e1e8d(0x1ca)) && _0x1b6c85[_0x2e1e8d(0xd1)](_0x2e1e8d(0x11d));
                    if (_0x393ba3 === 'Image' && _0x474cbb)
                        _0x4ea8b5 = '<img\x20src=\x22' + _0x474cbb + '\x22>';
                    else {
                        if (_0x393ba3 === _0x2e1e8d(0x1ca) && _0x474cbb !== _0x2e1e8d(0x144))
                            _0x4ea8b5 = _0x2e1e8d(0x1a1) + _0x474cbb + '\x22\x20target=\x22_blank\x22\x20rel=\x22noopener\x20noreferrer\x22>' + _0x474cbb + _0x2e1e8d(0x1c0);
                        else {
                            if (_0x393ba3 === _0x2e1e8d(0x77)) {
                                const _0x4178e6 = _0x20f8a4[_0x2e1e8d(0x11c)], _0x6b3ba = _0x2e1e8d(0x153);
                                let _0x4748c6 = '';
                                if (_0x4178e6 === 'Mall')
                                    _0x4748c6 = '<img\x20src=\x22https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.69/pc/7c9110f78e069acbced7.png\x22\x20' + _0x6b3ba + '>';
                                else {
                                    if (_0x4178e6 === _0x2e1e8d(0x7b))
                                        _0x4748c6 = _0x2e1e8d(0x15d) + _0x6b3ba + '>';
                                    else
                                        _0x4178e6 === _0x2e1e8d(0x7a) && (_0x4748c6 = '<img\x20src=\x22https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.69/pc/a425c915798471b33e5d.png\x22\x20' + _0x6b3ba + '>');
                                }
                                _0x4ea8b5 = _0x4748c6 + _0x474cbb;
                            } else {
                                if (_0x393ba3 === 'Rating' && typeof _0x474cbb === _0x2e1e8d(0x7d))
                                    _0x4ea8b5 = _0x474cbb[_0x2e1e8d(0xe5)](_0x2e1e8d(0x19e), {
                                        'minimumFractionDigits': 0x1,
                                        'maximumFractionDigits': 0x1
                                    });
                                else {
                                    if (_0x393ba3 === _0x2e1e8d(0xee) && typeof _0x474cbb === 'number') {
                                        const _0x383dcd = _0x474cbb * 0x64;
                                        if (_0x383dcd > 0.1)
                                            _0x4ea8b5 = _0x2e1e8d(0x143) + _0x383dcd[_0x2e1e8d(0x106)](0x0)[_0x2e1e8d(0x18e)]('.', ',') + _0x2e1e8d(0x9c);
                                        else {
                                            if (_0x383dcd < -0.1)
                                                _0x4ea8b5 = '<span\x20style=\x22color:red;\x22>' + _0x383dcd['toFixed'](0x0)[_0x2e1e8d(0x18e)]('.', ',') + _0x2e1e8d(0x1aa);
                                            else
                                                _0x4ea8b5 = _0x2e1e8d(0xb2);
                                        }
                                    } else {
                                        if ((_0x393ba3 === _0x2e1e8d(0xcf) || _0x393ba3 === _0x2e1e8d(0xe2) || _0x393ba3 === 'Revenue\x2030\x20Days' || _0x393ba3 === _0x2e1e8d(0x135) || _0x393ba3 === _0x2e1e8d(0x7c)) && typeof _0x474cbb === 'number')
                                            _0x4ea8b5 = Math['round'](_0x474cbb)['toLocaleString'](_0x2e1e8d(0x19e));
                                        else
                                            typeof _0x474cbb === _0x2e1e8d(0x7d) && (_0x4ea8b5 = _0x474cbb[_0x2e1e8d(0xe5)]('id-ID'));
                                    }
                                }
                            }
                        }
                    }
                    return _0x2e1e8d(0xce) + _0x1b6c85[_0x2e1e8d(0xb5)]('\x20') + '\x22\x20' + _0x5018db + '>' + (_0x4ea8b5 ?? '') + '</td>';
                })['join']('');
            return _0x4ea521(0x15c) + _0x4d16df + _0x4ea521(0x16d);
        })[_0x490570(0xb5)](''), _0x495d1b = _0x490570(0xf9) + _0x147b66 + _0x490570(0x163) + _0x2d0cd8[_0x490570(0x12d)] + _0x490570(0x107) + _0x382bc1 + _0x490570(0xcb) + _0x32a824 + _0x490570(0x14a), _0x5c09d1 = _0x490570(0x18f) + JSON['stringify'](_0x2d0cd8) + ';\x20document.getElementById(\x27downloadBtn\x27).addEventListener(\x27click\x27,\x20()\x20=>\x20{\x20const\x20ws\x20=\x20XLSX.utils.json_to_sheet(rows);\x20const\x20wb\x20=\x20XLSX.utils.book_new();\x20XLSX.utils.book_append_sheet(wb,\x20ws,\x20\x22SearchResults\x22);\x20XLSX.writeFile(wb,\x20\x22shopee_search_' + interceptedSearchData[_0x490570(0x171)]['replace'](/[^a-zA-Z0-9]/g, '_') + '.xlsx\x22);\x20});';
    createNewTabHTML(_0x147b66, _0x495d1b, _0x5c09d1);
}
function displayProductDetail() {
    const _0x6ce40e = _0x462b9b;
    if (!interceptedProductDetail || !interceptedProductDetail[_0x6ce40e(0x78)]) {
        alert(_0x6ce40e(0xf6));
        return;
    }
    const _0x53761d = extractProductDetailData(interceptedProductDetail['data']);
    if (!_0x53761d[_0x6ce40e(0x12d)]) {
        alert(_0x6ce40e(0x1d0));
        return;
    }
    const _0xf38561 = Object[_0x6ce40e(0xc6)](_0x53761d[0x0]), _0x3deb17 = _0x6ce40e(0x16a) + _0x53761d[0x0]['Product\x20Name'], _0x123d07 = _0x53761d[_0x6ce40e(0x86)](_0x57b0a2 => _0x6ce40e(0x15c) + _0xf38561[_0x6ce40e(0x86)](_0x1bd7a0 => {
            const _0x2317ec = _0x6ce40e;
            let _0x5ed245 = '', _0x4beacd = _0x57b0a2[_0x1bd7a0];
            if (_0x1bd7a0 === _0x2317ec(0x1c2) || _0x1bd7a0 === _0x2317ec(0x19b))
                _0x5ed245 = _0x2317ec(0x11d);
            if (_0x1bd7a0 === _0x2317ec(0x19b) && _0x4beacd !== _0x2317ec(0x144))
                _0x4beacd = _0x2317ec(0x1a1) + _0x4beacd + _0x2317ec(0x11b) + _0x4beacd + _0x2317ec(0x1c0);
            else {
                if (_0x1bd7a0 === _0x2317ec(0x1c3) && typeof _0x4beacd === 'number')
                    _0x4beacd = _0x4beacd[_0x2317ec(0xe5)](_0x2317ec(0x19e), {
                        'minimumFractionDigits': 0x1,
                        'maximumFractionDigits': 0x1
                    });
                else
                    typeof _0x4beacd === _0x2317ec(0x7d) && (_0x4beacd = _0x4beacd[_0x2317ec(0xe5)](_0x2317ec(0x19e)));
            }
            return '<td\x20class=\x22' + _0x5ed245 + '\x22>' + (_0x4beacd ?? '') + _0x2317ec(0x111);
        })[_0x6ce40e(0xb5)]('') + '</tr>')[_0x6ce40e(0xb5)](''), _0xf1db48 = _0x6ce40e(0xf9) + _0x3deb17 + _0x6ce40e(0xde) + _0xf38561[_0x6ce40e(0x86)](_0x3abfea => _0x6ce40e(0x146) + _0x3abfea + _0x6ce40e(0x176))[_0x6ce40e(0xb5)]('') + _0x6ce40e(0xcb) + _0x123d07 + _0x6ce40e(0x14a), _0x305006 = _0x6ce40e(0x18f) + JSON['stringify'](_0x53761d) + _0x6ce40e(0xbd) + _0x53761d[0x0]['Product\x20Name'][_0x6ce40e(0x18e)](/[^a-zA-Z0-9]/g, '_')[_0x6ce40e(0xbf)](0x0, 0x14) + _0x6ce40e(0x195);
    createNewTabHTML(_0x3deb17, _0xf1db48, _0x305006);
}
function createNewTabHTML(_0x5babc1, _0xfb02fd, _0x9b4ccb) {
    const _0x5b2e5c = _0x462b9b, _0x160896 = window[_0x5b2e5c(0x193)]();
    if (!_0x160896) {
        alert(_0x5b2e5c(0x1b9));
        return;
    }
    const _0x33f793 = _0x5b2e5c(0x130), _0x4b6a21 = _0x33f793 + _0x9b4ccb + _0x5b2e5c(0x1cf), _0x13e3d5 = _0x5b2e5c(0x1c7) + _0x5babc1 + '</title><script\x20src=\x22https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js\x22></script><style>body{font-family:-apple-system,BlinkMacSystemFont,\x22Segoe\x20UI\x22,Roboto,Helvetica,Arial,sans-serif;margin:0;background-color:#f4f4f4;color:#333}.container{max-width:95%;margin:20px\x20auto;padding:20px;background-color:#fff;box-shadow:0\x202px\x2010px\x20rgba(0,0,0,0.1);border-radius:8px}.header-controls{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:20px}h1{color:#ee4d2d}#downloadBtn{background-color:#007bff;color:white;border:none;padding:12px\x2020px;border-radius:5px;cursor:pointer;font-size:16px;font-weight:bold}#downloadBtn:hover{background-color:#0056b3}.table-container{max-height:80vh;overflow-x:auto;border:1px\x20solid\x20#ddd}table{width:100%;border-collapse:separate;border-spacing:0;border-right:1px\x20solid\x20#ddd;border-bottom:1px\x20solid\x20#ddd;}th,td{padding:8px\x2012px;border-top:1px\x20solid\x20#ddd;border-left:1px\x20solid\x20#ddd;text-align:left;vertical-align:top;white-space:nowrap;}td.wrap-text{white-space:normal;}thead\x20th{position:sticky;top:0;z-index:1;background-color:#f2f2f2;font-weight:bold;cursor:pointer;user-select:none}th:hover{background-color:#e9e9e9}img{max-width:60px;max-height:60px}span.sort-indicator{color:#333;font-size:0.9em;}span[style*=\x22color:green\x22],span[style*=\x22color:red\x22]{white-space:nowrap;}.sticky-col{position:sticky;left:0;z-index:2;background-color:#fff;}thead\x20.sticky-col{z-index:3;background-color:#f2f2f2;}.sticky-col-1{left:0px;}.sticky-col-2{left:80px;}.sticky-col-3{left:200px;min-width:350px;}.sticky-col-4{left:550px;min-width:200px;}</style></head><body><div\x20class=\x22container\x22>' + _0xfb02fd + _0x5b2e5c(0x1a3) + _0x4b6a21 + _0x5b2e5c(0x6f);
    _0x160896[_0x5b2e5c(0x138)][_0x5b2e5c(0x193)](), _0x160896[_0x5b2e5c(0x138)]['write'](_0x13e3d5), _0x160896['document'][_0x5b2e5c(0x9e)]();
}
function displayStoreResultsInNewTab(_0x351c12, _0x240371, _0x5b1f6d, _0x1607e3 = _0x462b9b(0x17c)) {
    const _0x5bd3f3 = _0x462b9b, _0x346d77 = _0x351c12['indexOf']('Price(IDR)'), _0x388aa0 = _0x351c12[_0x5bd3f3(0xa5)](_0x5bd3f3(0xe3)), _0x421ded = _0x351c12[_0x5bd3f3(0xa5)](_0x5bd3f3(0x160));
    let _0x28240b = 0x0, _0x32909d = 0x0, _0x264a4f = 0x0;
    _0x346d77 !== -0x1 && _0x388aa0 !== -0x1 && _0x421ded !== -0x1 && _0x240371[_0x5bd3f3(0x118)](_0x2a31e5 => {
        const _0x32762b = parseFloat(_0x2a31e5[_0x346d77]) || 0x0, _0x4cf7de = parseInt(_0x2a31e5[_0x388aa0], 0xa) || 0x0, _0x508574 = parseInt(_0x2a31e5[_0x421ded], 0xa) || 0x0;
        _0x28240b += _0x4cf7de, _0x32909d += _0x32762b * _0x4cf7de, _0x264a4f += _0x32762b * _0x508574;
    });
    const _0x334f1d = _0x5bd3f3(0xeb) + _0x240371[_0x5bd3f3(0x12d)][_0x5bd3f3(0xe5)]('id-ID') + _0x5bd3f3(0x179) + _0x28240b[_0x5bd3f3(0xe5)](_0x5bd3f3(0x19e)) + _0x5bd3f3(0x14f) + Math['round'](_0x32909d)[_0x5bd3f3(0xe5)](_0x5bd3f3(0x19e)) + _0x5bd3f3(0x165) + Math[_0x5bd3f3(0x121)](_0x264a4f)[_0x5bd3f3(0xe5)](_0x5bd3f3(0x19e)), _0x195c01 = _0x1607e3 + '\x20-\x20' + _0x5b1f6d[_0x5bd3f3(0x131)], _0x5bb574 = _0x240371['map'](_0x34f0c2 => {
            const _0x174f26 = _0x5bd3f3, _0x15eff2 = _0x34f0c2[_0x174f26(0x86)]((_0x140881, _0x537cde) => {
                    const _0x4c0d84 = _0x174f26, _0x3f163b = _0x351c12[_0x537cde];
                    let _0xe35af8 = String(_0x140881 ?? '')[_0x4c0d84(0x18e)](/</g, '<')['replace'](/>/g, '>'), _0x147f3f = '';
                    if (_0x3f163b === _0x4c0d84(0x1ca))
                        _0xe35af8 = _0x4c0d84(0x1a1) + _0x140881 + _0x4c0d84(0x11b) + _0x140881 + '</a>', _0x147f3f = _0x4c0d84(0x11d);
                    else {
                        if (_0x3f163b === 'Item\x20Name')
                            _0x147f3f = _0x4c0d84(0x11d);
                        else {
                            if (_0x3f163b === 'Rating')
                                _0xe35af8 = parseFloat(_0x140881)[_0x4c0d84(0xe5)](_0x4c0d84(0x19e), {
                                    'minimumFractionDigits': 0x1,
                                    'maximumFractionDigits': 0x1
                                });
                            else
                                (_0x3f163b === _0x4c0d84(0x149) || _0x3f163b === _0x4c0d84(0xe3) || _0x3f163b === _0x4c0d84(0x160) || _0x3f163b === _0x4c0d84(0x18b)) && (_0xe35af8 = parseFloat(_0x140881)[_0x4c0d84(0xe5)](_0x4c0d84(0x19e)));
                        }
                    }
                    return _0x4c0d84(0xce) + _0x147f3f + '\x22>' + _0xe35af8 + _0x4c0d84(0x111);
                })['join']('');
            return _0x174f26(0x15c) + _0x15eff2 + _0x174f26(0x16d);
        })[_0x5bd3f3(0xb5)](''), _0x8d82ec = _0x5bd3f3(0xf9) + _0x195c01 + '</h1><button\x20id=\x22downloadBtn\x22>Download\x20Excel</button></div><h3>' + _0x334f1d + _0x5bd3f3(0x107) + _0x351c12[_0x5bd3f3(0x86)](_0x5bd427 => _0x5bd3f3(0x146) + _0x5bd427 + '</th>')[_0x5bd3f3(0xb5)]('') + _0x5bd3f3(0xcb) + _0x5bb574 + _0x5bd3f3(0x14a), _0x2d4b77 = 'const\x20headers=' + JSON[_0x5bd3f3(0x14c)](_0x351c12) + _0x5bd3f3(0xbc) + JSON['stringify'](_0x240371) + _0x5bd3f3(0x150) + _0x5b1f6d[_0x5bd3f3(0x131)]['replace'](/[^a-zA-Z0-9]/g, '_') + _0x5bd3f3(0x7f);
    createNewTabHTML(_0x195c01, _0x8d82ec, _0x2d4b77);
}
function decodeShopeeJsonData(_0x478eec) {
    const _0x2526f3 = _0x462b9b;
    if (!_0x478eec || typeof _0x478eec !== 'string')
        return null;
    let _0x2a5b80 = _0x478eec;
    const _0x4d6464 = _0x478eec[_0x2526f3(0xa5)]('|');
    _0x4d6464 !== -0x1 && (_0x2a5b80 = _0x478eec[_0x2526f3(0xbf)](_0x4d6464 + 0x1));
    let _0x216e5b;
    try {
        const _0x514b66 = fixBase64Padding(_0x2a5b80), _0x2e0599 = atob(_0x514b66);
        _0x216e5b = new Uint8Array(_0x2e0599[_0x2526f3(0x12d)]);
        for (let _0x196ed7 = 0x0; _0x196ed7 < _0x2e0599['length']; _0x196ed7++) {
            _0x216e5b[_0x196ed7] = _0x2e0599[_0x2526f3(0xc2)](_0x196ed7);
        }
    } catch (_0x5407c0) {
        return null;
    }
    let _0x2be67a = 0x0;
    const _0x5a4460 = [], _0x222c48 = new TextDecoder(_0x2526f3(0x158), { 'fatal': ![] });
    while (_0x2be67a < _0x216e5b[_0x2526f3(0x12d)]) {
        try {
            let _0x4627d2;
            [_0x4627d2, _0x2be67a] = readVarint(_0x216e5b, _0x2be67a);
            const _0x145f72 = _0x4627d2 & 0x7;
            if (_0x145f72 === 0x2) {
                let _0x89cb19;
                [_0x89cb19, _0x2be67a] = readVarint(_0x216e5b, _0x2be67a);
                const _0x21c7d0 = _0x2be67a + _0x89cb19;
                if (_0x21c7d0 > _0x216e5b[_0x2526f3(0x12d)])
                    break;
                const _0x507f98 = _0x216e5b[_0x2526f3(0x100)](_0x2be67a, _0x21c7d0);
                _0x2be67a = _0x21c7d0;
                try {
                    const _0xa0b6aa = _0x222c48['decode'](_0x507f98);
                    _0xa0b6aa[_0x2526f3(0x84)]('{') && _0xa0b6aa['endsWith']('}') && _0x5a4460[_0x2526f3(0xd1)](JSON['parse'](_0xa0b6aa));
                } catch (_0x45bdd9) {
                }
            } else
                _0x2be67a = skipField(_0x216e5b, _0x2be67a, _0x145f72);
        } catch (_0x32213d) {
            break;
        }
    }
    if (_0x5a4460[_0x2526f3(0x12d)] > 0x0)
        return _0x5a4460['reduce']((_0x585ca1, _0xf4bc2b) => JSON[_0x2526f3(0x14c)](_0x585ca1)[_0x2526f3(0x12d)] > JSON[_0x2526f3(0x14c)](_0xf4bc2b)['length'] ? _0x585ca1 : _0xf4bc2b);
    return null;
}
function extractSearchItemData(_0x3b7419) {
    const _0x36cb26 = _0x462b9b;
    if (!_0x3b7419 || !_0x3b7419[_0x36cb26(0x79)])
        return null;
    const _0x101a6a = _0x3b7419[_0x36cb26(0x79)];
    let _0x5b3314 = _0x36cb26(0x10b);
    if (_0x101a6a[_0x36cb26(0x161)])
        _0x5b3314 = _0x36cb26(0x76);
    else {
        if (_0x101a6a[_0x36cb26(0x13c)])
            _0x5b3314 = _0x36cb26(0x7b);
        else
            _0x101a6a[_0x36cb26(0x13d)] && (_0x5b3314 = _0x36cb26(0x7a));
    }
    let _0x2eabb8 = {
        'bid_type_str': _0x36cb26(0xf0),
        'ad_objective': '-',
        'bid_price': 0x0,
        'actual_cost': 0x0,
        'target_keyword': '-',
        'target_cir': 0x0,
        'predicted_gmv': 0x0
    };
    if (_0x3b7419['json_data']) {
        const _0x55f1ad = decodeShopeeJsonData(_0x3b7419[_0x36cb26(0x1b3)]);
        if (_0x55f1ad) {
            if (_0x55f1ad[_0x36cb26(0x156)](_0x36cb26(0x1ab)))
                _0x2eabb8['bid_type_str'] = 'Otomatis', _0x2eabb8[_0x36cb26(0x75)] = _0x55f1ad[_0x36cb26(0xa6)] > 0x0 ? _0x36cb26(0x166) : _0x36cb26(0xd4), _0x2eabb8[_0x36cb26(0x1a7)] = (_0x55f1ad[_0x36cb26(0x1ab)] || 0x0) / 0x186a0, _0x2eabb8[_0x36cb26(0x19d)] = (_0x55f1ad[_0x36cb26(0x1b7)] || 0x0) / 0x186a0, _0x2eabb8[_0x36cb26(0xa6)] = (_0x55f1ad[_0x36cb26(0xa6)] || 0x0) * 0x64;
            else {
                if (_0x55f1ad[_0x36cb26(0x156)](_0x36cb26(0x1be))) {
                    const _0x45c50b = _0x55f1ad[_0x36cb26(0x1be)];
                    switch (_0x45c50b) {
                    case 0x0:
                        _0x2eabb8[_0x36cb26(0x140)] = _0x36cb26(0x18a), _0x2eabb8['ad_objective'] = _0x36cb26(0x9b);
                        break;
                    case 0x9:
                        _0x2eabb8[_0x36cb26(0x140)] = _0x36cb26(0x18a), _0x2eabb8[_0x36cb26(0x75)] = _0x36cb26(0x197);
                        break;
                    case 0x1e:
                        _0x2eabb8[_0x36cb26(0x140)] = _0x36cb26(0x134), _0x2eabb8[_0x36cb26(0x75)] = _0x36cb26(0x183);
                        break;
                    case 0x1f:
                        _0x2eabb8[_0x36cb26(0x140)] = _0x36cb26(0x134), _0x2eabb8['ad_objective'] = 'Jangkauan/Trafik';
                        break;
                    case 0x25:
                        _0x2eabb8[_0x36cb26(0x140)] = _0x36cb26(0x134), _0x2eabb8[_0x36cb26(0x75)] = _0x36cb26(0x8d);
                        break;
                    case 0x29:
                        _0x2eabb8[_0x36cb26(0x140)] = _0x36cb26(0x134), _0x2eabb8[_0x36cb26(0x75)] = _0x36cb26(0x166);
                        break;
                    default:
                        _0x2eabb8['bid_type_str'] = _0x36cb26(0x18d) + _0x45c50b + ')', _0x2eabb8['ad_objective'] = _0x36cb26(0xa7);
                    }
                    if (_0x55f1ad[_0x36cb26(0xad)] === 0x1)
                        _0x2eabb8[_0x36cb26(0x75)] = 'Iklan\x20Produk\x20Serupa';
                    _0x2eabb8[_0x36cb26(0x1a7)] = (_0x55f1ad[_0x36cb26(0xed)] || 0x0) / 0x186a0, _0x2eabb8['actual_cost'] = (_0x55f1ad[_0x36cb26(0x80)] || 0x0) / 0x186a0, _0x2eabb8[_0x36cb26(0x95)] = _0x55f1ad[_0x36cb26(0x169)] || _0x55f1ad[_0x36cb26(0x171)] || '-';
                    if (_0x2eabb8[_0x36cb26(0x95)] === _0x36cb26(0x154))
                        _0x2eabb8[_0x36cb26(0x95)] = '-';
                    [
                        0x1e,
                        0x1f,
                        0x25,
                        0x29
                    ][_0x36cb26(0x124)](_0x45c50b) && _0x55f1ad[_0x36cb26(0x101)]?.[0x0] && (_0x2eabb8['target_cir'] = (_0x55f1ad[_0x36cb26(0x101)][0x0][_0x36cb26(0xa6)] || 0x0) * 0x64);
                }
            }
        }
    } else
        _0x3b7419['ads_keyword'] && (_0x2eabb8[_0x36cb26(0x140)] = 'Manual*', _0x2eabb8[_0x36cb26(0x75)] = 'Kata\x20Kunci*', _0x2eabb8['target_keyword'] = _0x3b7419[_0x36cb26(0x1d6)]);
    return {
        'name': _0x101a6a['name'] || _0x36cb26(0x144),
        'price': _0x101a6a[_0x36cb26(0x16c)] ? _0x101a6a['price'] / 0x186a0 : 0x0,
        'sold': _0x101a6a['sold'] || 0x0,
        'historical_sold': _0x101a6a[_0x36cb26(0x194)] || 0x0,
        'brand': _0x101a6a[_0x36cb26(0x1cc)] || '-',
        'rating_star': _0x101a6a[_0x36cb26(0x1c6)]?.['rating_star'] || 0x0,
        'rating_count': _0x101a6a[_0x36cb26(0x1c6)]?.[_0x36cb26(0xec)]?.[0x0] || 0x0,
        'shop_name': _0x101a6a['shop_name'] || _0x36cb26(0x144),
        'seller_type': _0x5b3314,
        'shop_location': _0x101a6a['shop_location'] || '-',
        'ctime': _0x101a6a['ctime'] ? new Date(_0x101a6a['ctime'] * 0x3e8)['toISOString']()['split']('T')[0x0] : _0x36cb26(0x144),
        'stock': _0x101a6a[_0x36cb26(0x11a)] || 0x0,
        'itemid': String(_0x101a6a[_0x36cb26(0xff)] || _0x36cb26(0x144)),
        'shopid': String(_0x101a6a[_0x36cb26(0x13f)] || 'N/A'),
        'shopee_url': createShopeeURL(_0x101a6a[_0x36cb26(0x131)], _0x101a6a[_0x36cb26(0x13f)], _0x101a6a[_0x36cb26(0xff)]),
        'image_url': _0x101a6a[_0x36cb26(0x136)] ? _0x36cb26(0x16f) + _0x101a6a[_0x36cb26(0x136)] : '',
        'bid_type': _0x2eabb8[_0x36cb26(0x140)],
        'ad_objective': _0x2eabb8[_0x36cb26(0x75)],
        'bid_price': _0x2eabb8[_0x36cb26(0x1a7)],
        'actual_cost': _0x2eabb8['actual_cost'],
        'predicted_gmv': _0x2eabb8[_0x36cb26(0x19d)],
        'target_keyword': _0x2eabb8[_0x36cb26(0x95)],
        'target_cir_percent': _0x2eabb8[_0x36cb26(0xa6)] > 0x0 ? _0x2eabb8[_0x36cb26(0xa6)][_0x36cb26(0xe5)](_0x36cb26(0x19e), {
            'minimumFractionDigits': 0x1,
            'maximumFractionDigits': 0x1
        }) + '%' : '-'
    };
}
function extractProductDetailData(_0x5151ae) {
    const _0x34cca6 = _0x462b9b;
    if (!_0x5151ae || !_0x5151ae[_0x34cca6(0x78)] || !_0x5151ae[_0x34cca6(0x78)][_0x34cca6(0x145)])
        return [];
    const _0x319819 = _0x5151ae[_0x34cca6(0x78)][_0x34cca6(0x145)], _0x230075 = _0x5151ae[_0x34cca6(0x78)][_0x34cca6(0x109)] || {}, _0x2a3980 = _0x5151ae[_0x34cca6(0x78)]['shop_detailed'] || {}, _0x45ee0b = _0x319819['title'] || _0x34cca6(0x144), _0x42c049 = _0x319819['item_id'] || _0x34cca6(0x144), _0x43381f = _0x319819[_0x34cca6(0x1d7)] || _0x34cca6(0x144), _0x50a574 = _0x230075[_0x34cca6(0x194)] || 0x0;
    let _0x18d5c5 = _0x319819[_0x34cca6(0xf2)] || [];
    return !_0x18d5c5[_0x34cca6(0x12d)] && (_0x18d5c5 = [{
            'name': _0x34cca6(0x13b),
            'price': _0x319819[_0x34cca6(0x16c)] || 0x0,
            'stock': _0x319819[_0x34cca6(0x11a)] || 0x0,
            'sold': _0x50a574,
            'model_id': _0x34cca6(0x144)
        }]), _0x18d5c5[_0x34cca6(0x86)](_0x4aeb9f => {
        const _0x5bfdba = _0x34cca6, _0xe42ca5 = _0x319819[_0x5bfdba(0x1c6)]?.[_0x5bfdba(0x9a)], _0x2796e0 = _0xe42ca5 ? Number(_0xe42ca5[_0x5bfdba(0x106)](0x1)) : 0x0, _0x1c5a99 = {
                'URL': createShopeeURL(_0x45ee0b, _0x43381f, _0x42c049),
                'Product\x20Name': _0x45ee0b,
                'Variation\x20Name': _0x4aeb9f[_0x5bfdba(0x131)] || _0x5bfdba(0x144),
                'Price': (_0x4aeb9f[_0x5bfdba(0x16c)] || 0x0) / 0x186a0,
                'Stock': _0x4aeb9f[_0x5bfdba(0x11a)] || 0x0,
                'Sold\x20Variation': _0x4aeb9f[_0x5bfdba(0x8c)] || 0x0,
                'Total\x20Sold': _0x50a574,
                'Rating': _0x2796e0,
                'Review': _0x230075['total_rating_count'] || 0x0,
                'Brand': _0x319819['brand'] || '-',
                'Model\x20ID': String(_0x4aeb9f[_0x5bfdba(0x73)] || _0x5bfdba(0x144)),
                'Product\x20ID': String(_0x42c049),
                'Shop\x20ID': String(_0x43381f),
                'Shop\x20Location': _0x319819[_0x5bfdba(0xaf)] || '-',
                'Shop\x20Name': _0x2a3980[_0x5bfdba(0x131)] || '-'
            };
        return _0x1c5a99;
    });
}
function createShopeeURL(_0x527f37, _0x39dd4e, _0x4b9787) {
    const _0x3d7545 = _0x462b9b;
    if (!_0x527f37 || !_0x39dd4e || !_0x4b9787)
        return _0x3d7545(0x144);
    const _0x48543d = String(_0x527f37)[_0x3d7545(0x112)]()[_0x3d7545(0xf4)]()[_0x3d7545(0x18e)](/\s+/g, '-')['replace'](/[^\w-]+/g, '')[_0x3d7545(0xbf)](0x0, 0x46);
    return _0x3d7545(0xfc) + _0x48543d + '-i.' + _0x39dd4e + '.' + _0x4b9787;
}
function formatScrapeTime(_0x1bf17d) {
    const _0x3c5825 = _0x462b9b;
    if (!_0x1bf17d)
        return '';
    const _0x411852 = [
            _0x3c5825(0x155),
            _0x3c5825(0x1a6),
            _0x3c5825(0x17e),
            _0x3c5825(0x90),
            _0x3c5825(0x104),
            _0x3c5825(0x92),
            _0x3c5825(0x137),
            _0x3c5825(0xb8),
            'Sep',
            _0x3c5825(0x126),
            _0x3c5825(0x188),
            'Des'
        ], _0x3ed41f = new Date(_0x1bf17d), _0x42cb5c = String(_0x3ed41f[_0x3c5825(0x128)]())[_0x3c5825(0x162)](0x2, '0'), _0x3a3cf2 = _0x411852[_0x3ed41f[_0x3c5825(0x186)]()], _0x7e7fd = _0x3ed41f['getFullYear'](), _0x5378d3 = String(_0x3ed41f[_0x3c5825(0x96)]())[_0x3c5825(0x162)](0x2, '0'), _0x1b2287 = String(_0x3ed41f[_0x3c5825(0xb9)]())[_0x3c5825(0x162)](0x2, '0');
    return _0x42cb5c + '\x20' + _0x3a3cf2 + '\x20' + _0x7e7fd + '\x20' + _0x5378d3 + ':' + _0x1b2287;
}
function fixBase64Padding(_0x2a5ee0) {
    const _0x23c9b2 = _0x462b9b;
    if (!_0x2a5ee0)
        return '';
    try {
        const _0x26a304 = _0x2a5ee0[_0x23c9b2(0x12d)] % 0x4;
        return _0x2a5ee0['padEnd'](_0x2a5ee0[_0x23c9b2(0x12d)] + (_0x26a304 === 0x0 ? 0x0 : 0x4 - _0x26a304), '=');
    } catch (_0x5bc450) {
        return '';
    }
}
function readVarint(_0x4aa3fd, _0x5d916a) {
    const _0x40b29b = _0x462b9b;
    let _0x50d0ba = 0x0, _0x1edc6b = 0x0;
    while (!![]) {
        if (_0x5d916a >= _0x4aa3fd[_0x40b29b(0x12d)])
            throw Error(_0x40b29b(0x1b4));
        const _0x2e437a = _0x4aa3fd[_0x5d916a];
        _0x5d916a += 0x1, _0x50d0ba |= (_0x2e437a & 0x7f) << _0x1edc6b;
        if ((_0x2e437a & 0x80) === 0x0)
            return [
                _0x50d0ba,
                _0x5d916a
            ];
        _0x1edc6b += 0x7;
    }
}
function _0x13a4(_0x290362, _0x293274) {
    const _0xa22086 = _0xa220();
    return _0x13a4 = function (_0x13a41d, _0xec51ef) {
        _0x13a41d = _0x13a41d - 0x6f;
        let _0x1e5e7a = _0xa22086[_0x13a41d];
        return _0x1e5e7a;
    }, _0x13a4(_0x290362, _0x293274);
}
function skipField(_0x28e300, _0x32299f, _0x12aa77) {
    const _0x4b3e64 = _0x462b9b;
    try {
        if (_0x12aa77 === 0x0)
            return [, _0x32299f] = readVarint(_0x28e300, _0x32299f), _0x32299f;
        if (_0x12aa77 === 0x1)
            return _0x32299f + 0x8;
        if (_0x12aa77 === 0x5)
            return _0x32299f + 0x4;
        if (_0x12aa77 === 0x2) {
            let _0x7583a3;
            return [_0x7583a3, _0x32299f] = readVarint(_0x28e300, _0x32299f), _0x32299f + _0x7583a3;
        }
        return _0x28e300[_0x4b3e64(0x12d)];
    } catch {
        return _0x28e300[_0x4b3e64(0x12d)];
    }
}
function updateUI() {
    const _0x91f5ec = _0x462b9b;
    if (!uiCreated)
        return;
    const _0x2282a1 = unsafeWindow[_0x91f5ec(0x8b)][_0x91f5ec(0x13a)], _0x5c0c02 = !!interceptedShopData, _0x5b1a9c = /-i\.\d+\.\d+/[_0x91f5ec(0x1d1)](_0x2282a1) && !!interceptedProductDetail[_0x91f5ec(0x78)], _0x2b3bc9 = _0x2282a1[_0x91f5ec(0x84)](_0x91f5ec(0xd0)) && interceptedSearchData['items']['length'] > 0x0, _0x335729 = scraperInfoPanel[_0x91f5ec(0x1d2)][0x0];
    [
        refreshButton,
        showStoredButton,
        showSearchButton,
        showDetailButton
    ][_0x91f5ec(0x118)](_0x4b10dc => _0x4b10dc[_0x91f5ec(0x115)][_0x91f5ec(0x9f)] = _0x91f5ec(0x1b1));
    if (_0x5c0c02) {
        refreshButton[_0x91f5ec(0x115)][_0x91f5ec(0x9f)] = _0x91f5ec(0xfa), showStoredButton[_0x91f5ec(0x115)][_0x91f5ec(0x9f)] = _0x91f5ec(0xfa);
        const _0x41ab26 = interceptedShopData, _0x1cb988 = Number(_0x41ab26['rating_star'])['toFixed'](0x2);
        _0x335729[_0x91f5ec(0x1b8)] = _0x91f5ec(0xc0) + _0x41ab26['name'] + _0x91f5ec(0xe7) + _0x41ab26[_0x91f5ec(0x110)][_0x91f5ec(0xe5)]('id-ID') + _0x91f5ec(0xb7) + _0x41ab26['item_count']['toLocaleString'](_0x91f5ec(0x19e)) + '</span><br><span>Rating:\x20' + _0x1cb988 + _0x91f5ec(0xac) + _0x41ab26[_0x91f5ec(0x13f)] + '</span>';
        const _0x20aeac = 'shopeeScraperData_' + _0x41ab26['shopid'], _0x1b470e = unsafeWindow[_0x91f5ec(0xdd)][_0x91f5ec(0x187)](_0x20aeac);
        if (_0x1b470e)
            try {
                const _0x59bcfc = JSON[_0x91f5ec(0x147)](_0x1b470e);
                scraperStatusArea[_0x91f5ec(0x1b8)] = _0x91f5ec(0x71) + formatScrapeTime(_0x59bcfc[_0x91f5ec(0x181)]) + _0x91f5ec(0xd6), showStoredButton[_0x91f5ec(0x1c8)] = ![], showStoredButton[_0x91f5ec(0x115)][_0x91f5ec(0x120)] = '1', showStoredButton[_0x91f5ec(0xc7)] = _0x91f5ec(0x81) + _0x59bcfc[_0x91f5ec(0x10f)][_0x91f5ec(0x12d)] + _0x91f5ec(0xf7);
            } catch (_0x5ad87b) {
                scraperStatusArea[_0x91f5ec(0x1b8)] = _0x91f5ec(0x19f);
            }
        else
            scraperStatusArea[_0x91f5ec(0x1b8)] = _0x91f5ec(0xb3), showStoredButton['disabled'] = !![], showStoredButton[_0x91f5ec(0x115)]['opacity'] = _0x91f5ec(0xab), showStoredButton[_0x91f5ec(0xc7)] = _0x91f5ec(0x1d3);
    } else {
        _0x335729[_0x91f5ec(0x1b8)] = '<strong\x20style=\x22color:\x20#333;\x20font-size:\x2014px;\x22>Status\x20Deteksi\x20Data</strong>';
        let _0x574dda = '';
        _0x2b3bc9 && (showSearchButton['style']['display'] = _0x91f5ec(0xfa), _0x574dda += _0x91f5ec(0x19c) + interceptedSearchData[_0x91f5ec(0x171)] + _0x91f5ec(0x157) + interceptedSearchData['items'][_0x91f5ec(0x12d)] + _0x91f5ec(0xd2)), _0x5b1a9c && (showDetailButton['style'][_0x91f5ec(0x9f)] = _0x91f5ec(0xfa), _0x574dda += _0x91f5ec(0x189)), scraperStatusArea['innerHTML'] = _0x574dda || _0x91f5ec(0x17d);
    }
}
document[_0x462b9b(0xb6)] === _0x462b9b(0x82) || document[_0x462b9b(0xb6)] === 'interactive' ? initialize() : window[_0x462b9b(0xc1)]('DOMContentLoaded', initialize);
    
})();
