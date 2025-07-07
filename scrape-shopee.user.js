// ==UserScript==
// @name         Shopee Scraper Github
// @namespace    https://shopee.co.id/
// @version      8.7.1
// @description  Update ke versi 8.7.1
// @author       By Naufal Abiyyu & Gemini AI
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

    // ===================================================================
    //      BAGIAN 0: VARIABEL GLOBAL & INTERCEPTOR (Tidak Berubah) Logic
    // ===================================================================

    let interceptedShopData = null,
        interceptedSearchData = { items: [], keyword: null },
        interceptedProductDetail = { data: null, url: null };
    let uiCreated = false, scraperInfoPanel, scraperStatusArea, refreshButton, showStoredButton, showSearchButton, showDetailButton;

    const originalFetch = unsafeWindow.fetch;
    unsafeWindow.fetch = async function(...args) {
        const response = await originalFetch.apply(unsafeWindow, args);
        const requestUrl = (typeof args[0] === 'string') ? args[0] : args[0].url;

        if (response.ok) {
            const clonedResponse = response.clone();
            if (requestUrl.includes('/api/v4/shop/get_shop_base')) {
                clonedResponse.json().then(json => {
                    if (json.data && json.data.shopid) {
                        interceptedShopData = json.data;
                        if (uiCreated) updateUI();
                    }
                }).catch(e => { /* Ignored */ });
            } else if (requestUrl.includes('/api/v4/search/search_items')) {
                clonedResponse.json().then(json => {
                    if (json && json.items && json.items.length > 0) {
                        const keyword = new URL(requestUrl, unsafeWindow.location.origin).searchParams.get('keyword') || 'Unknown';
                        if (interceptedSearchData.keyword !== keyword) {
                            interceptedSearchData = { items: [], keyword: keyword };
                        }
                        interceptedSearchData.items.push(...json.items);
                        if (uiCreated) updateUI();
                    }
                }).catch(e => { /* Ignored */ });
            } else if (requestUrl.includes('/api/v4/pdp/get_pc')) {
                 clonedResponse.json().then(json => {
                    if (json && json.data && json.data.item) {
                        interceptedProductDetail = { data: json, url: requestUrl };
                        if (uiCreated) updateUI();
                    }
                }).catch(e => { /* Ignored */ });
            }
        }
        return response;
    };

    function onUrlChange() {
        if (!uiCreated) return;
        const path = unsafeWindow.location.pathname;
        const isShopPage = /^\/([a-zA-Z0-9_.-]+)$/.test(path) && !path.includes("search") && !/-i\.\d+\.\d+/.test(path);
        const isDetailPage = /-i\.\d+\.\d+/.test(path);
        const isSearchPage = path.startsWith('/search');

        if (!isDetailPage) interceptedProductDetail = { data: null, url: null };
        if (!isSearchPage) interceptedSearchData = { items: [], keyword: null };
        if (!isShopPage) interceptedShopData = null;

        updateUI();
    }
    (function(history){
        const originalPushState = history.pushState;
        history.pushState = function(state) {
            const result = originalPushState.apply(history, arguments);
            onUrlChange();
            return result;
        };
        unsafeWindow.addEventListener('popstate', onUrlChange);
    })(unsafeWindow.history);


    // ===================================================================
    //      BAGIAN 1: SISTEM AKTIVASI (Tidak Berubah)
    // ===================================================================
    const API_URL = 'https://script.google.com/macros/s/AKfycbzLxkI1cLZNd0JJD-B9quBgMlyItqJnWLwiEFZ9eqN6mNVszOEyRgNlUJwc8ZmQ4FL_Og/exec';
    const STATE_KEY = 'shopee_scraper_activation_state';
    const UI_STATE_KEY = 'shopee_scraper_ui_state';

    function createActivationUI() {
        const oldContainer = document.getElementById('activation-container');
        if (oldContainer) oldContainer.remove();
        const container = document.createElement('div');
        container.id = 'activation-container';
        Object.assign(container.style, {
            position: 'fixed', bottom: '20px', left: '20px', zIndex: '10000',
            backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '20px', fontFamily: 'Arial',
            width: '300px'
        });
        container.innerHTML = `
            <h3 style="margin-top:0; color:#ee4d2d;">Aktivasi Tools</h3>
            <p style="font-size:13px; color:#555;">Silakan masukkan akun Anda.</p>
            <input type="text" id="act_username" placeholder="Username" style="width: 95%; padding: 8px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px;">
            <input type="password" id="act_password" placeholder="Password" style="width: 95%; padding: 8px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 4px;">
            <button id="act_btn_login" style="width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Aktivasi</button>
            <div id="act_status" style="margin-top: 15px; font-size: 13px; color: red;"></div>
        `;
        document.body.appendChild(container);
        document.getElementById('act_btn_login').addEventListener('click', handleLogin);
    }
    async function createMainUI(state) {
        const oldActivationContainer = document.getElementById('activation-container');
        if (oldActivationContainer) oldActivationContainer.remove();
        const oldMainContainer = document.getElementById('scraper-main-container');
        if (oldMainContainer) oldMainContainer.remove();

        const mainContainer = document.createElement('div');
        mainContainer.id = 'scraper-main-container';
        Object.assign(mainContainer.style, {
            position: 'fixed', bottom: '20px', left: '20px', zIndex: '9999',
            display: 'flex', flexDirection: 'column', gap: '10px', width: '320px',
            fontFamily: 'Arial, sans-serif'
        });

        const accountPanel = document.createElement('div');
        Object.assign(accountPanel.style, {
            backgroundColor: '#f0f8ff', border: '1px solid #bde0ff', borderRadius: '8px',
            padding: '12px 15px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        });

        const accountHeader = document.createElement('div');
        Object.assign(accountHeader.style, { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' });
        accountHeader.innerHTML = `
            <h4 style="margin:0; color:#0056b3; font-size: 16px;">Info Akun</h4>
            <span id="toggle-account-info" style="cursor: pointer; font-weight: bold; padding: 0 5px; font-size: 18px; color: #0056b3;">[ - ]</span>
        `;

        const accountContent = document.createElement('div');
        accountContent.id = 'account-details-content';
        const expiry = new Date(state.expiry_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        const deviceList = state.devices.map(d => `<li style="font-size:11px; color:${d === state.deviceId ? '#007bff; font-weight:bold;' : '#555;'}">${d} ${d === state.deviceId ? '(Browser ini)' : ''}</li>`).join('');
        accountContent.innerHTML = `
            <p style="font-size:13px; margin: 4px 0;">Username: <strong>${state.username}</strong></p>
            <p style="font-size:13px; margin: 4px 0;">Aktif hingga: <strong>${expiry}</strong></p>
            <p style="font-size:13px; margin: 10px 0 5px 0;">Perangkat Terdaftar:</p>
            <ul style="margin:0; padding-left: 20px; font-size: 13px;">${deviceList}</ul>
            <button id="act_btn_logout" style="width: 100%; padding: 6px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 15px; font-size: 13px;">Hapus Akun dari Browser Ini</button>
        `;

        accountPanel.appendChild(accountHeader);
        accountPanel.appendChild(accountContent);
        mainContainer.appendChild(accountPanel);

        const scraperPanel = document.createElement('div');
        scraperPanel.id = 'scraper-panel';
        Object.assign(scraperPanel.style, {
            backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px',
            padding: '12px 15px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            display: 'flex', flexDirection: 'column', gap: '10px'
        });

        scraperInfoPanel = document.createElement('div');
        Object.assign(scraperInfoPanel.style, { fontSize:'12px', lineHeight:'1.5' });
        scraperStatusArea = document.createElement('div');
        Object.assign(scraperStatusArea.style, { marginTop:"10px", paddingTop:"10px", borderTop:"1px solid #eee" });
        scraperInfoPanel.appendChild(document.createElement('div'));
        scraperInfoPanel.appendChild(scraperStatusArea);

        const buttonContainer = document.createElement('div');
        Object.assign(buttonContainer.style, { display:'flex', flexDirection:'column', gap:'8px' });
        refreshButton = document.createElement('button'); refreshButton.innerText = 'Refresh & Scrape Data'; refreshButton.style.backgroundColor = '#ee4d2d';
        showStoredButton = document.createElement('button'); showStoredButton.innerText = 'Tampilkan Data Tersimpan'; showStoredButton.style.backgroundColor = '#28a745';
        showSearchButton = document.createElement('button'); showSearchButton.innerText = "Tampilkan Hasil Pencarian"; showSearchButton.style.backgroundColor = '#007bff';
        showDetailButton = document.createElement('button'); showDetailButton.innerText = "Tampilkan Detail Produk"; showDetailButton.style.backgroundColor = '#17a2b8';
        const allButtons = [refreshButton, showStoredButton, showSearchButton, showDetailButton];
        allButtons.forEach(btn => {
            Object.assign(btn.style, { color:'white', border:'none', borderRadius:'5px', cursor:'pointer', padding:'10px 15px', fontSize:'14px', transition:'opacity 0.3s, background-color 0.3s', display:'none'});
            buttonContainer.appendChild(btn);
        });

        scraperPanel.appendChild(scraperInfoPanel);
        scraperPanel.appendChild(buttonContainer);
        mainContainer.appendChild(scraperPanel);

        document.body.appendChild(mainContainer);
        document.getElementById('act_btn_logout').addEventListener('click', handleLogout);
        refreshButton.addEventListener('click', startStoreScraping);
        showStoredButton.addEventListener('click', showStoredData);
        showSearchButton.addEventListener('click', displaySearchResults);
        showDetailButton.addEventListener('click', displayProductDetail);

        const toggleButton = document.getElementById('toggle-account-info');
        const setPanelState = (state, isInitial = false) => {
            if (state === 'collapsed') {
                accountContent.style.display = 'none';
                toggleButton.textContent = '[ + ]';
            } else {
                accountContent.style.display = 'block';
                toggleButton.textContent = '[ - ]';
            }
            if (!isInitial) {
                GM_setValue(UI_STATE_KEY, state);
            }
        };

        toggleButton.addEventListener('click', () => {
            const currentState = accountContent.style.display === 'none' ? 'expanded' : 'collapsed';
            setPanelState(currentState);
        });

        const savedUiState = await GM_getValue(UI_STATE_KEY, 'expanded');
        setPanelState(savedUiState, true);

        uiCreated = true;
        updateUI();
    }
    function apiCall(action, payload) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "POST", url: API_URL, data: JSON.stringify({ action, ...payload }), headers: { "Content-Type": "application/json" },
                onload: function(response) { try { const result = JSON.parse(response.responseText); resolve(result); } catch (e) { reject({ status: 'error', message: 'Gagal memproses respon API.' }); } },
                onerror: function(error) { reject({ status: 'error', message: 'Gagal terhubung ke server aktivasi.' }); }
            });
        });
    }
    async function handleLogin() {
        const username = document.getElementById('act_username').value.trim(); const password = document.getElementById('act_password').value.trim();
        const statusEl = document.getElementById('act_status'); const loginBtn = document.getElementById('act_btn_login');
        if (!username || !password) { statusEl.textContent = 'Username dan password tidak boleh kosong.'; return; }
        statusEl.textContent = 'Memverifikasi...'; loginBtn.disabled = true; let state = await GM_getValue(STATE_KEY, {});
        if (!state.deviceId) { state.deviceId = 'device_' + Date.now() + Math.random().toString(36).substr(2, 9); }
        try {
            const result = await apiCall('login', { username, password, deviceId: state.deviceId });
            if (result.status === 'success') {
                const newState = { activated: true, username: username, deviceId: state.deviceId, expiry_date: result.data.expiry_date, devices: result.data.devices || [] };
                await GM_setValue(STATE_KEY, newState); createMainUI(newState);
            } else { statusEl.textContent = result.message || 'Terjadi kesalahan.'; loginBtn.disabled = false; }
        } catch (error) { statusEl.textContent = error.message || 'Error tidak diketahui.'; loginBtn.disabled = false; }
    }
    async function handleLogout() {
        if (!confirm('Apakah Anda yakin ingin menghapus akun dari browser ini?')) return;
        const state = await GM_getValue(STATE_KEY, {});
        if (state.activated) { await apiCall('logout', { username: state.username, deviceId: state.deviceId }); }
        await GM_deleteValue(STATE_KEY); unsafeWindow.location.reload();
    }
    async function initialize() {
        injectScraper(); let state = await GM_getValue(STATE_KEY, {});
        if (state && state.activated && state.username && state.deviceId) {
            try {
                const result = await apiCall('validate', { username: state.username, deviceId: state.deviceId });
                if (result.status === 'success') {
                    state.expiry_date = result.data.expiry_date; state.devices = result.data.devices;
                    await GM_setValue(STATE_KEY, state); createMainUI(state);
                } else {
                    await GM_deleteValue(STATE_KEY); createActivationUI();
                    setTimeout(() => { const statusEl = document.getElementById('act_status'); if (statusEl) statusEl.textContent = `Sesi berakhir: ${result.message}`; }, 500);
                }
            } catch (error) { console.warn('Gagal memvalidasi sesi, mengizinkan penggunaan offline.', error.message); createMainUI(state); }
        } else { createActivationUI(); }
    }


    // ===================================================================
    //      BAGIAN 2: FUNGSI SCRAPER & TAMPILAN
    // ===================================================================

    function startStoreScraping() {
        const shop_id = interceptedShopData?.shopid;
        const shop_name = interceptedShopData?.name;
        if (!shop_id) {
            alert('Gagal mendeteksi Shop ID. Silakan refresh halaman toko.');
            return;
        }

        refreshButton.disabled = true;
        showStoredButton.disabled = true;
        refreshButton.innerText = 'Scraping...';

        // --- PENAMBAHAN DIMULAI DI SINI ---
        // Variabel untuk menyimpan ID dari interval pengecekan progress
        let progressIntervalId;

        // Fungsi untuk mengecek progress dari localStorage
        const checkProgress = () => {
            const count = unsafeWindow.localStorage.getItem('shopee_scrape_progress_count');
            if (count) {
                refreshButton.innerText = `Scraping... [${count}]`;
            }
        };
        // Mulai pengecekan setiap 500ms
        progressIntervalId = setInterval(checkProgress, 500);
        // --- PENAMBAHAN SELESAI DI SINI ---

        unsafeWindow.document.addEventListener('scrape-finished', () => {
            // --- PENAMBAHAN DIMULAI DI SINI ---
            // Hentikan pengecekan progress
            clearInterval(progressIntervalId);
            // Bersihkan item progress dari localStorage
            unsafeWindow.localStorage.removeItem('shopee_scrape_progress_count');
            // --- PENAMBAHAN SELESAI DI SINI ---

            console.log('[Main Script] Sinyal scrape-finished diterima!');
            refreshButton.innerText = 'Selesai! Menampilkan...';
            showStoredData();
            setTimeout(() => {
                refreshButton.disabled = false;
                refreshButton.innerText = 'Refresh & Scrape Data';
                updateUI();
            }, 2000);
        }, { once: true });

        const event = new CustomEvent('start-shopee-scrape', {
            detail: {
                shop_id: shop_id,
                shop_name: shop_name || `shop_${shop_id}`
            }
        });
        unsafeWindow.document.dispatchEvent(event);
    }

    function injectScraper() {
        if (document.getElementById('injected-scraper-v5')) return;
        const injectedCode = `
            (function() {
                'use strict';
                const startInjectedScraping = async (shop_id, shop_name_from_event) => {
                    const limit=30, delay=1500;
                    const getCookie=(name)=>{const v=\`; \${document.cookie}\`,p=v.split(\`; \${name}=\`);if(p.length===2)return p.pop().split(';').shift();return''};
                    const createShopeeURL=(name,shopid,itemid)=>{if(!name||!shopid||!itemid)return'N/A';const n=String(name).trim().toLowerCase().replace(/\\s+/g,'-').replace(/[^\\w-]+/g,'').substring(0,70);return\`https://shopee.co.id/\${n}-i.\${shopid}.\${itemid}\`;};
                    const extractFields=(item)=>{const n=item?.name??'N/A',p=typeof item?.price==='number'?parseFloat((item.price/100000).toFixed(2)):'N/A',s30=item?.sold??item?.monthly_sold??'N/A',hs=item?.historical_sold??'N/A',sn=item?.shop_name??'N/A',is=item?.item_status??(item?.stock===0?'sold_out':'normal'),st=is==='normal'?'Ready':is==='sold_out'?'Sold Out':is,it=String(item?.itemid??'N/A'),si=String(item?.shopid??'N/A'),ct=item?.ctime,ud=typeof ct==='number'?new Date(ct*1000).toISOString().split('T')[0]:'N/A',ir=item?.item_rating,rc=ir?.rating_count?.[0]??0,rsr=ir?.rating_star??0,rs=Number(rsr).toFixed(1),sl=item?.shop_location??'N/A',url=createShopeeURL(n,si,it);return[n,p,s30,hs,url,sn,st,it,si,ud,rs,rc,sl]};
                    const fetchReady=async(o)=>fetch('https://shopee.co.id/api/v4/shop/rcmd_items',{method:'POST',headers:{'accept':'application/json','content-type':'application/json','x-api-source':'pc','x-csrftoken':getCookie('csrftoken'),'x-requested-with':'XMLHttpRequest','x-shopee-language':'id'},credentials:'include',body:JSON.stringify({bundle:"shop_page_category_tab_main",shop_id,limit,offset:o,sort_type:13})}).then(r=>r.json());
                    const fetchSold=async(o)=>fetch(\`https://shopee.co.id/api/v4/shop/search_items?filter_sold_out=1&limit=\${limit}&offset=\${o}&order=desc&shopid=\${shop_id}&sort_by=pop\`,{credentials:'include'}).then(r=>r.json());
                    const allItems=[]; let offset=0, hasMore=true;
                    try {
                        while(hasMore){const d=await fetchReady(offset),i=d?.data?.items||[];if(i.length>0){allItems.push(...i);offset+=limit; localStorage.setItem('shopee_scrape_progress_count', allItems.length);}if(d?.data?.no_more||i.length<limit)hasMore=false;await new Promise(r=>setTimeout(r,delay));}
                        offset=0;hasMore=true;
                        while(hasMore){const d=await fetchSold(offset),i=d.items||[];if(i.length>0){allItems.push(...i.map(it=>it.item_basic));offset+=limit; localStorage.setItem('shopee_scrape_progress_count', allItems.length);}if(i.length<limit)hasMore=false;await new Promise(r=>setTimeout(r,delay));}
                    } catch (e) { alert(\`[Injected Scraper] Scraping gagal: \${e.message}\`); }
                    if(allItems.length > 0) {
                        const headers=["Item Name","Price(IDR)","Sold(30 Days)","Sold(Total)","Shopee URL","Shop Name","Status","ItemID","ShopID","Upload Date","Rating","Rating Count","Shop Location"];
                        const rows=allItems.map(i=>extractFields(i));
                        const shopData={name: shop_name_from_event, shop_id};
                        const dataToStore={headers,rows,shopData,scrapedAt:new Date().toISOString()};
                        localStorage.setItem(\`shopeeScraperData_\${shop_id}\`, JSON.stringify(dataToStore));
                        console.log(\`[Injected] Data untuk \${shop_name_from_event} berhasil disimpan ke localStorage.\`);
                    }
                    document.dispatchEvent(new CustomEvent('scrape-finished'));
                };
                document.addEventListener('start-shopee-scrape', e => startInjectedScraping(e.detail.shop_id, e.detail.shop_name));
                console.log('[+] Injected Shopee Scraper v5.4 logic loaded.');
            })();
        `;
        const scriptElement = document.createElement('script');
        scriptElement.id = 'injected-scraper-v5';
        scriptElement.textContent = injectedCode;
        (document.head || document.documentElement).appendChild(scriptElement);
    }

    function showStoredData() {
        const shop_id = interceptedShopData?.shopid;
        if (!shop_id) return;
        const storedDataString = unsafeWindow.localStorage.getItem(`shopeeScraperData_${shop_id}`);
        if (storedDataString) {
            try {
                const d = JSON.parse(storedDataString);
                displayStoreResultsInNewTab(d.headers, d.rows, d.shopData, "Data Tersimpan");
            } catch (e) {
                alert("Gagal memuat data tersimpan, mungkin data rusak.");
            }
        } else {
            alert("Tidak ada data tersimpan untuk toko ini.");
        }
    }

    function displaySearchResults() {
        if (!interceptedSearchData || interceptedSearchData.items.length === 0) { alert("Tidak ada data hasil pencarian."); return; }
        const allExtractedItems = interceptedSearchData.items.map(extractSearchItemData).filter(Boolean);
        const uniqueItems = Array.from(new Map(allExtractedItems.map(item => [item.itemid, item])).values());
        uniqueItems.forEach(item => { item.revenue_30_days = item.price * item.sold; const months = item.ctime === 'N/A' ? 1 : ((new Date().getFullYear() - new Date(item.ctime).getFullYear()) * 12 + (new Date().getMonth() - new Date(item.ctime).getMonth()) + 1) || 1; item.avg_sold_per_month = Math.round(item.historical_sold / months); item.sold_trend = item.avg_sold_per_month > 0 ? ((item.sold - item.avg_sold_per_month) / item.avg_sold_per_month) : (item.sold > 0 ? 1 : 0); });
        const columnRenameMap = { name:'Product Name',brand:'Brand',price:'Price',sold:'Sold 30 Days',historical_sold:'Total Sold',revenue_30_days:'Revenue 30 Days',bid_type:'Ad Type',ad_objective:'Ad Objective',bid_price:'Bid (Rp)',actual_cost:'Cost (Rp)',target_keyword:'Target Keyword',target_cir_percent:'Target CIR/ROAS',avg_sold_per_month:'Avg Sold/Month',sold_trend:'Sold Trend',rating_star:'Rating',rating_count:'Review',shop_name:'Shop Name',shop_location:'Shop Location',ctime:'Date Created',stock:'Stock',itemid:'Item ID',shopid:'Shop ID',shopee_url:'Shopee URL',image_url:'Image' };
        const columnOrder = ['Image','Date Created', 'Product Name','Shop Name', 'Price','Sold 30 Days','Total Sold','Avg Sold/Month','Sold Trend','Rating','Review','Ad Type','Ad Objective','Target Keyword','Bid (Rp)','Cost (Rp)','Target CIR/ROAS','Shop Location','Brand','Stock','Item ID','Shop ID','Shopee URL'];
        const processedItems = uniqueItems.map(row => { const newRow = {}; for (const key in row) { if (columnRenameMap[key]) newRow[columnRenameMap[key]] = row[key]; } return newRow; });
        const finalItems = processedItems.map(row => { const orderedRow = {}; columnOrder.forEach(col => { orderedRow[col] = row[col]; }); return orderedRow; });
        const headers = Object.keys(finalItems[0]); const title = `Hasil Pencarian: ${interceptedSearchData.keyword}`;
        const bodyHtml = finalItems.map(row => { const rowHtml = headers.map(h => { let val = row[h]; let content = val; let className = ''; if(h === 'Product Name' || h === 'Shopee URL') className = 'wrap-text'; if (h === 'Image' && val) { content = `<img src="${val}">`; } else if (h === 'Shopee URL' && val !== 'N/A') { content = `<a href="${val}" target="_blank" rel="noopener noreferrer">${val}</a>`; } else if (h === 'Rating' && typeof val === 'number') { content = val.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }); } else if (h === 'Sold Trend' && typeof val === 'number') { const trend = val * 100; if (trend > 0.1) content = `<span style="color:green;">+${trend.toFixed(1).replace('.',',')}% ▲</span>`; else if (trend < -0.1) content = `<span style="color:red;">${trend.toFixed(1).replace('.',',')}% ▼</span>`; else content = `0,0%`; } else if ((h === 'Bid (Rp)' || h === 'Cost (Rp)') && typeof val === 'number') { content = Math.round(val).toLocaleString('id-ID'); } else if (typeof val === 'number') { content = val.toLocaleString('id-ID'); } return `<td class="${className}">${content ?? ''}</td>`; }).join(''); return `<tr>${rowHtml}</tr>`; }).join('');
        const content = `<div class="header-controls"><h1>${title}</h1><button id="downloadBtn">Download Excel</button></div><p>Total Item: ${finalItems.length}</p><div class="table-container"><table id="resultTable"><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${bodyHtml}</tbody></table></div>`;
        const script = `const rows = ${JSON.stringify(finalItems)}; document.getElementById('downloadBtn').addEventListener('click', () => { const ws = XLSX.utils.json_to_sheet(rows); const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, "SearchResults"); XLSX.writeFile(wb, "shopee_search_${interceptedSearchData.keyword.replace(/[^a-zA-Z0-9]/g, '_')}.xlsx"); });`;
        createNewTabHTML(title, content, script);
    }

    function displayProductDetail() {
        if (!interceptedProductDetail || !interceptedProductDetail.data) { alert("Tidak ada data detail produk."); return; }
        const rows = extractProductDetailData(interceptedProductDetail.data);
        if (!rows.length) { alert("Gagal memproses data detail produk."); return; }
        const headers = Object.keys(rows[0]); const title = `Detail Produk: ${rows[0]['Product Name']}`;
        const bodyHtml = rows.map(row => `<tr>${headers.map(h => { let className = ''; let content = row[h]; if (h === 'Product Name' || h === 'URL') className = 'wrap-text'; if (h === 'URL' && content !== 'N/A') { content = `<a href="${content}" target="_blank" rel="noopener noreferrer">${content}</a>`; } else if (h === 'Rating' && typeof content === 'number') { content = content.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }); } else if (typeof content === 'number') { content = content.toLocaleString('id-ID'); } return `<td class="${className}">${content ?? ''}</td>`; }).join('')}</tr>`).join('');
        const content = `<div class="header-controls"><h1>${title}</h1><button id="downloadBtn">Download Excel</button></div><div class="table-container"><table id="resultTable"><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${bodyHtml}</tbody></table></div>`;
        const script = `const rows = ${JSON.stringify(rows)}; document.getElementById('downloadBtn').addEventListener('click', () => { const ws = XLSX.utils.json_to_sheet(rows); const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, "ProductDetail"); XLSX.writeFile(wb, "shopee_detail_${rows[0]['Product Name'].replace(/[^a-zA-Z0-9]/g, '_').substring(0,20)}.xlsx"); });`;
        createNewTabHTML(title, content, script);
    }

    function createNewTabHTML(title, content, script) {
        const newTab = window.open();
        if (!newTab) { alert("Gagal membuka tab baru. Mohon izinkan pop-up."); return; }
        const sortingScript = `function makeTableSortable(tableId){const table=document.getElementById(tableId),headers=table.querySelectorAll('thead th');let sortDirections=Array.from(headers).map(()=>null);headers.forEach((header,index)=>{header.addEventListener('click',()=>{const tbody=table.querySelector('tbody'),rows=Array.from(tbody.rows),currentDir=sortDirections[index],newDir=currentDir==='asc'?'desc':'asc';sortDirections.fill(null);headers.forEach(h=>h.querySelector('span.sort-indicator')?.remove());sortDirections[index]=newDir;const indicator=document.createElement('span');indicator.className='sort-indicator';indicator.textContent=newDir==='asc'?' ▲':' ▼';header.appendChild(indicator);rows.sort((a,b)=>{const cellA=a.cells[index].innerText.trim(),cellB=b.cells[index].innerText.trim(),numA=parseFloat(cellA.replace(/[^0-9.,-]+/g,"").replace(".","").replace(",",".")),numB=parseFloat(cellB.replace(/[^0-9.,-]+/g,"").replace(".","").replace(",","."));let comparison=0;if(!isNaN(numA)&&!isNaN(numB)){comparison=numA-numB}else{comparison=cellA.localeCompare(cellB,'id-ID',{numeric:true,sensitivity:'base'})}return newDir==='asc'?comparison:-comparison});while(tbody.firstChild){tbody.removeChild(tbody.firstChild)}tbody.append(...rows)})})}`;
        const finalScript = sortingScript + script + "\nmakeTableSortable('resultTable');";
        const html = `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"><title>${title}</title><script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"><\/script><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;margin:0;background-color:#f4f4f4;color:#333}.container{max-width:95%;margin:20px auto;padding:20px;background-color:#fff;box-shadow:0 2px 10px rgba(0,0,0,0.1);border-radius:8px}.header-controls{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:20px}h1{color:#ee4d2d}#downloadBtn{background-color:#007bff;color:white;border:none;padding:12px 20px;border-radius:5px;cursor:pointer;font-size:16px;font-weight:bold}#downloadBtn:hover{background-color:#0056b3}.table-container{max-height:80vh;overflow-x:auto;border:1px solid #ddd}table{width:100%;border-collapse:collapse;}th,td{padding:8px 12px;border:1px solid #ddd;text-align:left;vertical-align:top;white-space:nowrap;}td.wrap-text{white-space:normal;}thead th{background-color:#f2f2f2;font-weight:bold;position:sticky;top:0;z-index:10;cursor:pointer;user-select:none}th:hover{background-color:#e9e9e9}img{max-width:60px;max-height:60px}span.sort-indicator{color:#333;font-size:0.9em;}span[style*="color:green"],span[style*="color:red"]{white-space:nowrap;}</style></head><body><div class="container">${content}</div><script>${finalScript}<\/script></body></html>`;
        newTab.document.open();
        newTab.document.write(html);
        newTab.document.close();
    }

    function displayStoreResultsInNewTab(headers, rows, shopData, titlePrefix = "Produk Toko") {
        const priceIndex = headers.indexOf('Price(IDR)'); const sold30DaysIndex = headers.indexOf('Sold(30 Days)'); const soldTotalIndex = headers.indexOf('Sold(Total)'); let totalSold30Days = 0; let totalRevenue30Days = 0; let totalRevenue = 0; if (priceIndex !== -1 && sold30DaysIndex !== -1 && soldTotalIndex !== -1) { rows.forEach(row => { const price = parseFloat(row[priceIndex]) || 0; const sold30 = parseInt(row[sold30DaysIndex], 10) || 0; const soldTotal = parseInt(row[soldTotalIndex], 10) || 0; totalSold30Days += sold30; totalRevenue30Days += price * sold30; totalRevenue += price * soldTotal; }); } const infoString = `Total Produk: ${rows.length.toLocaleString("id-ID")} | Sold 30 Days: ${totalSold30Days.toLocaleString("id-ID")} | Revenue 30 Days: ${Math.round(totalRevenue30Days).toLocaleString("id-ID")} | Total Revenue: ${Math.round(totalRevenue).toLocaleString("id-ID")}`; const title = `${titlePrefix} - ${shopData.name}`; const bodyHtml = rows.map(row => { const rowHtml = row.map((cell, index) => { const header = headers[index]; let content = String(cell ?? '').replace(/</g, "<").replace(/>/g, ">"); let className = ''; if (header === 'Shopee URL') { content = `<a href="${cell}" target="_blank" rel="noopener noreferrer">${cell}</a>`; className = 'wrap-text'; } else if (header === 'Item Name') { className = 'wrap-text'; } else if (header === 'Rating') { content = parseFloat(cell).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }); } else if (header === 'Price(IDR)' || header === 'Sold(30 Days)' || header === 'Sold(Total)' || header === 'Rating Count') { content = parseFloat(cell).toLocaleString('id-ID'); } return `<td class="${className}">${content}</td>`; }).join(''); return `<tr>${rowHtml}</tr>`; }).join(''); const content = `<div class="header-controls"><h1>${title}</h1><button id="downloadBtn">Download Excel</button></div><p>${infoString}</p><div class="table-container"><table id="resultTable"><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${bodyHtml}</tbody></table></div>`; const script = `const headers=${JSON.stringify(headers)}; const rows=${JSON.stringify(rows)}; document.getElementById('downloadBtn').addEventListener('click',()=>{const ws=XLSX.utils.aoa_to_sheet([headers, ...rows]); const wb=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb,ws,"Produk"); XLSX.writeFile(wb,"shopee_store_${shopData.name.replace(/[^a-zA-Z0-9]/g, '_')}.xlsx");});`; createNewTabHTML(title, content, script);
    }

    function decodeShopeeJsonData(encodedString) { if (!encodedString || typeof encodedString !== 'string') return null; let decodedBytes; try { const bs = fixBase64Padding(encodedString); if (!bs) return null; decodedBytes = Uint8Array.from(bs, c => c.charCodeAt(0)); } catch (e) { return null; } let i = 0; const jsonResults = []; const textDecoder = new TextDecoder('utf-8', { fatal: false }); while (i < decodedBytes.length) { try { let tagVal; [tagVal, i] = readVarint(decodedBytes, i); const wireType = tagVal & 7; if (wireType === 2) { let length; [length, i] = readVarint(decodedBytes, i); const endPos = i + length; if (endPos > decodedBytes.length) break; const contentBytes = decodedBytes.subarray(i, endPos); i = endPos; try { const decodedText = textDecoder.decode(contentBytes); if (decodedText.startsWith('{') && decodedText.endsWith('}')) { jsonResults.push(JSON.parse(decodedText)); } } catch (e) { /* Ignored */ } } else { i = skipField(decodedBytes, i, wireType); } } catch (e) { break; } } return jsonResults.length > 0 ? jsonResults.reduce((a, b) => JSON.stringify(a).length > JSON.stringify(b).length ? a : b) : null; }
    function extractSearchItemData(rawItem) { if (!rawItem || !rawItem.item_basic) return null; const item = rawItem.item_basic; let ad_info = { bid_type_str: 'Organik', ad_objective: '-', bid_price: 0, actual_cost: 0, target_keyword: '-', target_cir: 0 }; if (rawItem.json_data) { const decodedAdData = decodeShopeeJsonData(rawItem.json_data); if (decodedAdData) { const bid_type_code = decodedAdData['bid-type']; switch (bid_type_code) { case 0: ad_info.bid_type_str = "Manual"; ad_info.ad_objective = "Kata Kunci (CPC)"; break; case 9: ad_info.bid_type_str = "Manual"; ad_info.ad_objective = "Kata Kunci (eCPC)"; break; case 31: ad_info.bid_type_str = "Otomatis"; ad_info.ad_objective = "Jangkauan/Trafik"; break; case 37: ad_info.bid_type_str = "Otomatis"; ad_info.ad_objective = "Konversi (ROI)"; break; case 41: ad_info.bid_type_str = "Otomatis"; ad_info.ad_objective = "Profit (ROAS)"; break; default: ad_info.bid_type_str = `Lainnya (${bid_type_code})`; ad_info.ad_objective = 'Tidak Diketahui'; } ad_info.bid_price = (decodedAdData['bid-price'] || 0) / 100000; ad_info.actual_cost = (decodedAdData['origin-deduction'] || 0) / 100000; ad_info.target_keyword = decodedAdData['bid-keyword'] || decodedAdData['keyword'] || '-'; if ([31,37,41].includes(bid_type_code) && decodedAdData['bid-infos']?.[0]) { ad_info.target_cir = (decodedAdData['bid-infos'][0]['target_cir'] || 0) * 100; } } } else if (rawItem.ads_keyword) { ad_info.bid_type_str = 'Manual*'; ad_info.ad_objective = 'Kata Kunci*'; ad_info.target_keyword = rawItem.ads_keyword; } return { name: item.name||'N/A', price:item.price?item.price/100000:0, sold:item.sold||0, historical_sold:item.historical_sold||0, brand:item.brand||'-', rating_star:item.item_rating?.rating_star||0, rating_count:item.item_rating?.rating_count?.[0]||0, shop_name:item.shop_name||'N/A', shop_location:item.shop_location||'-', ctime:item.ctime?new Date(item.ctime*1000).toISOString().split('T')[0]:'N/A', stock:item.stock||0, itemid:String(item.itemid||'N/A'), shopid:String(item.shopid||'N/A'), shopee_url:createShopeeURL(item.name,item.shopid,item.itemid), image_url:item.image?`https://down-id.img.susercontent.com/file/${item.image}`:'', bid_type:ad_info.bid_type_str, ad_objective:ad_info.ad_objective, bid_price:ad_info.bid_price, actual_cost:ad_info.actual_cost, target_keyword:ad_info.target_keyword, target_cir_percent: ad_info.target_cir > 0 ? `${ad_info.target_cir.toLocaleString("id-ID",{minimumFractionDigits:1,maximumFractionDigits:1})}%` : '-' }; }
    function extractProductDetailData(detail) { if (!detail || !detail.data || !detail.data.item) return []; const item_info = detail.data.item; const product_review_info = detail.data.product_review || {}; const shop_detailed_info = detail.data.shop_detailed || {}; const product_title = item_info.title || 'N/A'; const product_id = item_info.item_id || 'N/A'; const shop_id = item_info.shop_id || 'N/A'; const historical_sold_total = product_review_info.historical_sold || 0; let models = item_info.models || []; if (!models.length) { models = [{ name: 'Default Variation', price: item_info.price || 0, normal_stock: item_info.normal_stock || 0, sold: historical_sold_total, model_id: 'N/A' }]; } return models.map(model => { const rating_value = item_info.item_rating?.rating_star; const final_rating = rating_value ? Number(rating_value.toFixed(1)) : 0; return { 'URL': createShopeeURL(product_title, shop_id, product_id), 'Product Name': product_title, 'Variation Name': model.name || 'N/A', 'Price': (model.price || 0) / 100000, 'Stock': model.normal_stock || 0, 'Sold Variation': model.sold || 0, 'Total Sold': historical_sold_total, 'Rating': final_rating, 'Review': product_review_info.total_rating_count || 0, 'Brand': item_info.brand || '-', 'Model ID': String(model.model_id || 'N/A'), 'Product ID': String(product_id), 'Shop ID': String(shop_id), 'Shop Location': item_info.shop_location || '-', 'Shop Name': shop_detailed_info.name || '-' }; }); }
    function createShopeeURL(name, shopid, itemid) { if (!name || !shopid || !itemid) return 'N/A'; const nameSlug = String(name).trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').substring(0, 70); return `https://shopee.co.id/${nameSlug}-i.${shopid}.${itemid}`; }
    function formatScrapeTime(isoString) { if (!isoString) return ""; const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']; const date = new Date(isoString); const day = String(date.getDate()).padStart(2, '0'); const month = months[date.getMonth()]; const year = date.getFullYear(); const hours = String(date.getHours()).padStart(2, '0'); const minutes = String(date.getMinutes()).padStart(2, '0'); return `${day} ${month} ${year} ${hours}:${minutes}`; }
    function fixBase64Padding(b64) { try { const r = b64.length % 4; return unsafeWindow.atob(b64.padEnd(b64.length + (r === 0 ? 0 : 4 - r), '=')); } catch (e) { return null; } }
    function readVarint(buf, pos) { let r=0, s=0; while(1) { if(pos>=buf.length) throw Error("Buffer underflow"); const b=buf[pos]; pos+=1; r|=(b&0x7F)<<s; if((b&0x80)===0) return [r,pos]; s+=7; } }
    function skipField(buf, pos, wt) { try { if(wt===0) {[,pos]=readVarint(buf,pos); return pos;} if(wt===1) return pos+8; if(wt===5) return pos+4; if(wt===2) {let len; [len,pos]=readVarint(buf,pos); return pos+len;} return buf.length; } catch { return e.length; } }

    function updateUI() {
        if (!uiCreated) return;
        const path = unsafeWindow.location.pathname;
        const isShopPage = !!interceptedShopData;
        const isDetailPage = /-i\.\d+\.\d+/.test(path) && !!interceptedProductDetail.data;
        const isSearchPage = path.startsWith('/search') && interceptedSearchData.items.length > 0;
        const infoHeader = scraperInfoPanel.children[0];
        [refreshButton, showStoredButton, showSearchButton, showDetailButton].forEach(btn => btn.style.display = 'none');

        if (isShopPage) {
            refreshButton.style.display = 'block';
            showStoredButton.style.display = 'block';
            const data = interceptedShopData;
            const rating = Number(data.rating_star).toFixed(2);
            infoHeader.innerHTML = `<strong style="color: #ee4d2d; font-size: 14px;">${data.name}</strong><br><span>Followers: ${data.follower_count.toLocaleString('id-ID')}</span><br><span>Produk: ${data.item_count.toLocaleString('id-ID')}</span><br><span>Rating: ${rating} ★</span><br><span style="font-size: 10px; color: #888;">Shop ID: ${data.shopid}</span>`;
            const storageKey = `shopeeScraperData_${data.shopid}`;
            const storedDataString = unsafeWindow.localStorage.getItem(storageKey);
            if (storedDataString) {
                try {
                    const storedData = JSON.parse(storedDataString);
                    scraperStatusArea.innerHTML = `Data tersimpan: <strong>${formatScrapeTime(storedData.scrapedAt)}</strong>`;
                    showStoredButton.disabled = false;
                    showStoredButton.style.opacity = '1';
                    showStoredButton.innerText = `Tampilkan Data (${storedData.rows.length} Produk)`;
                } catch (e) {
                    scraperStatusArea.innerHTML = '<i>Data cache rusak.</i>';
                }
            } else {
                scraperStatusArea.innerHTML = '<i>Belum ada data tersimpan.</i>';
                showStoredButton.disabled = true;
                showStoredButton.style.opacity = '0.5';
                showStoredButton.innerText = 'Belum Ada Data Tersimpan';
            }
        } else {
            infoHeader.innerHTML = '<strong style="color: #333; font-size: 14px;">Status Deteksi Data</strong>';
            let statusText = '';
            if (isSearchPage) {
                showSearchButton.style.display = 'block';
                statusText += `✔️ <strong style="color:#007bff;">Pencarian Siap</strong> (${interceptedSearchData.items.length} item)<br>`;
            }
            if (isDetailPage) {
                showDetailButton.style.display = 'block';
                statusText += `✔️ <strong style="color:#17a2b8;">Detail Produk Siap</strong><br>`;
            }
            scraperStatusArea.innerHTML = statusText || '<i>Arahkan ke halaman toko, pencarian, atau produk untuk memulai...</i>';
        }
    }


    // ===================================================================
    //      BAGIAN 3: TITIK MASUK APLIKASI
    // ===================================================================
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initialize();
    } else {
        window.addEventListener('DOMContentLoaded', initialize);
    }

})();
