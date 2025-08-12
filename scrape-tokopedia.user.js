// ==UserScript==
// @name         Tokopedia Scraper Pro (Store & Search) v6.3 - UI FIX
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

    // ===================================================================
    //      BAGIAN 0: VARIABEL GLOBAL & INTERCEPTOR
    // ===================================================================
    const API_URL = "https://script.google.com/macros/s/AKfycbzRR8AL1fK1z3gPfSFDOumDLYcKNbufDw5fMjGjO7EFJPIH1f6rTKK2o6zGvvc4f_3T/exec"; // <-- GANTI DENGAN URL WEB APP ANDA
    const STATE_KEY = 'tokopedia_scraper_activation_state';
    const UI_STATE_KEY = 'tokopedia_scraper_ui_state';

    let uiContainer, infoPanel, actionPanel, scrapeButton, statusArea,
        resultsActionPanel, showResultsButton, downloadExcelButton;
    let currentScrapeMode = 'none', scrapeContext = {}, isScraping = false,
        lastScrapeResult = null, collectedSearchProducts = [], processedProductIds = new Set();
    const CONCURRENT_REQUESTS = 10;

    // ===================================================================
    //      BAGIAN 1: INTERCEPTOR (Dijalankan Segera)
    // ===================================================================
    function interceptFetch() {
        const originalFetch = unsafeWindow.fetch;
        unsafeWindow.fetch = async function(...args) {
            const response = await originalFetch.apply(unsafeWindow, args);
            const requestUrl = (typeof args[0] === 'string') ? args[0] : args[0].url;
            if (response.ok && !isScraping) {
                 if (requestUrl.includes('graphql/ShopInfoCore')) {
                    const clonedResponse = response.clone();
                    try {
                        const json = (await clonedResponse.json())[0];
                        if (json.data?.shopInfoByID?.result.length > 0) {
                            const info = json.data.shopInfoByID.result[0];
                            let badgeText = 'Reguler'; let badgeUrl = '';
                            const goldOS = info.goldOS;
                            if (goldOS) {
                                if (goldOS.isOfficial === 1 && goldOS.badge) { badgeText = 'Official Store'; badgeUrl = goldOS.badge; }
                                else if (goldOS.isGoldBadge === 1 && goldOS.badge) { badgeText = 'Power Merchant'; badgeUrl = goldOS.badge; }
                            }
                            currentScrapeMode = 'store';
                            scrapeContext = { type: 'store', info: { shopID: info.shopCore.shopID, name: info.shopCore.name, activeProduct: info.activeProduct, location: info.location, productSold: info.shopStats.productSold, badgeText: badgeText, badgeUrl: badgeUrl }};
                            if (uiContainer) updateUI();
                        }
                    } catch (e) { console.error('Scraper: Gagal proses ShopInfoCore', e); }
                } else if (requestUrl.includes('graphql/SearchProductV5Query')) {
                    const clonedResponse = response.clone();
                    try {
                        const json = (await clonedResponse.json())[0];
                        const products = json?.data?.searchProductV5?.data?.products;
                        if (products && Array.isArray(products)) {
                            products.forEach(p => {
                                if (p.id && !processedProductIds.has(p.id)) {
                                    processedProductIds.add(p.id);
                                    collectedSearchProducts.push({ product_id: p.id, product_url: p.url.split('?')[0], name: p.name, price: { text_idr: p.price.text }, shop_name: p.shop.name, badge_url: p.badge?.url || '' });
                                }
                            });
                            if (currentScrapeMode !== 'search_collecting') {
                                 const params = new URLSearchParams(window.location.search);
                                 scrapeContext = { type: 'search', query: params.get('q') || 'Unknown' };
                                 currentScrapeMode = 'search_collecting';
                            }
                            if (uiContainer) updateUI();
                        }
                    } catch (e) { console.error('Scraper: Gagal proses SearchProductV5Query', e); }
                }
            }
            return response;
        };
    }
    interceptFetch();

    // ===================================================================
    //      BAGIAN 2: SISTEM AKTIVASI
    // ===================================================================
    function createActivationUI() {
        if (document.getElementById('activation-container')) return;
        const container = document.createElement('div');
        container.id = 'activation-container';
        Object.assign(container.style, {
            position: 'fixed', bottom: '20px', left: '20px', zIndex: '10001',
            backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '20px', fontFamily: 'Arial',
            width: '300px'
        });
        container.innerHTML = `
            <h3 style="margin-top:0; color:#00AA5B;">Aktivasi Scraper Tokopedia</h3>
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
        if (document.getElementById('scraper-main-container')) return;

        const mainContainer = document.createElement('div');
        mainContainer.id = 'scraper-main-container';
        mainContainer.style.cssText = 'position: fixed; bottom: 20px; left: 20px; z-index: 9999; display: flex; flex-direction: column; width: 320px; font-family: Arial, sans-serif;';

        const accountAndScraperWrapper = document.createElement('div');
        accountAndScraperWrapper.style.cssText = 'background-color: #fff; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);';

        const accountPanel = document.createElement('div');
        accountPanel.style.cssText = 'padding: 12px 15px; border-bottom: 1px solid #eee;';
        const accountHeader = document.createElement('div');
        accountHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;';
        accountHeader.innerHTML = `<h4 style="margin:0; color:#0056b3; font-size: 15px;">Info Akun</h4><span id="toggle-account-info" style="cursor: pointer; font-weight: bold; padding: 0 5px; font-size: 18px; color: #0056b3;">[ - ]</span>`;

        // ===== PERBAIKAN SEPENUHNYA DI SINI =====
        const accountContent = document.createElement('div');
        accountContent.id = 'account-details-content';
        const expiry = new Date(state.expiry_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        const deviceList = state.devices.map(d => `<li style="font-size:11px; color:${d === state.deviceId ? '#007bff; font-weight:bold;' : '#555;'}">${d} ${d === state.deviceId ? '(Browser ini)' : ''}</li>`).join('');
        accountContent.innerHTML = `
            <p style="font-size:13px; margin: 4px 0;">Username: <strong>${state.username}</strong></p>
            <p style="font-size:13px; margin: 4px 0;">Aktif hingga: <strong>${expiry}</strong></p>
            <p style="font-size:12px; margin: 10px 0 5px 0;">Perangkat Terdaftar:</p>
            <ul style="margin:0; padding-left: 20px; font-size: 12px;">${deviceList}</ul>
            <button id="act_btn_logout" style="width: 100%; padding: 6px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 15px; font-size: 13px;">Logout dari Browser Ini</button>
        `;
        // ===== AKHIR DARI PERBAIKAN =====

        accountPanel.appendChild(accountHeader);
        accountPanel.appendChild(accountContent);
        accountAndScraperWrapper.appendChild(accountPanel);

        createScraperUI(accountAndScraperWrapper);
        mainContainer.appendChild(accountAndScraperWrapper);
        document.body.appendChild(mainContainer);

        document.getElementById('act_btn_logout').addEventListener('click', handleLogout);
        const toggleButton = document.getElementById('toggle-account-info');
        const setPanelState = (state, isInitial = false) => {
            if (state === 'collapsed') { accountContent.style.display = 'none'; toggleButton.textContent = '[ + ]'; }
            else { accountContent.style.display = 'block'; toggleButton.textContent = '[ - ]'; }
            if (!isInitial) GM_setValue(UI_STATE_KEY, state);
        };
        toggleButton.addEventListener('click', () => setPanelState(accountContent.style.display === 'none' ? 'expanded' : 'collapsed'));
        const savedUiState = await GM_getValue(UI_STATE_KEY, 'expanded');
        setPanelState(savedUiState, true);

        initScraperLogic();
    }

    function apiCall(action, payload) {
        return new Promise((resolve, reject) => {
            if (API_URL === "URL_APPS_SCRIPT_ANDA_DISINI") {
                 return reject({ message: 'URL API belum dikonfigurasi pada skrip.' });
            }
            GM_xmlhttpRequest({
                method: "POST", url: API_URL, data: JSON.stringify({ action, ...payload }), headers: { "Content-Type": "application/json" },
                onload: res => { try { resolve(JSON.parse(res.responseText)); } catch (e) { reject({ message: 'Gagal memproses respon API.' }); } },
                onerror: err => reject({ message: 'Gagal terhubung ke server aktivasi.' })
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
                const newState = { activated: true, username, deviceId: state.deviceId, expiry_date: result.data.expiry_date, devices: result.data.devices || [] };
                await GM_setValue(STATE_KEY, newState); createMainUI(newState);
            } else { statusEl.textContent = result.message || 'Terjadi kesalahan.'; loginBtn.disabled = false; }
        } catch (error) { statusEl.textContent = error.message || 'Error tidak diketahui.'; loginBtn.disabled = false; }
    }

    async function handleLogout() {
        if (!confirm('Apakah Anda yakin ingin menghapus akun dari browser ini?')) return;
        const state = await GM_getValue(STATE_KEY, {});
        if (state.activated) await apiCall('logout', { username: state.username, deviceId: state.deviceId });
        await GM_deleteValue(STATE_KEY); window.location.reload();
    }

    async function initialize() {
        let state = await GM_getValue(STATE_KEY, {});
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
            } catch (error) {
                console.warn('Gagal validasi sesi, mengizinkan penggunaan offline.', error.message);
                createMainUI(state);
            }
        } else { createActivationUI(); }
    }


    // ===================================================================
    //      BAGIAN 3: INTI SCRAPER (TIDAK ADA PERUBAHAN)
    // ===================================================================
    function createScraperUI(parentContainer) {
        uiContainer = document.createElement('div');
        uiContainer.id = 'tokopedia-scraper-container';
        const header = document.createElement('div');
        Object.assign(header.style, { padding: '12px 15px', backgroundColor: '#f7f7f7', fontWeight: 'bold', borderBottom: '1px solid #eee', color: '#00AA5B', fontSize: '16px' });
        header.textContent = 'Tokopedia Scraper Pro';
        uiContainer.appendChild(header);
        infoPanel = document.createElement('div');
        infoPanel.id = 'scraper-info-panel';
        Object.assign(infoPanel.style, { padding: '15px', borderBottom: '1px solid #eee' });
        actionPanel = document.createElement('div');
        actionPanel.id = 'scraper-action-panel';
        Object.assign(actionPanel.style, { padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' });
        scrapeButton = document.createElement('button');
        scrapeButton.id = 'start-scrape-btn';
        Object.assign(scrapeButton.style, { padding: '10px 15px', backgroundColor: '#00AA5B', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' });
        scrapeButton.addEventListener('click', startScrape);
        statusArea = document.createElement('div');
        statusArea.id = 'scrape-status';
        Object.assign(statusArea.style, { fontSize: '12px', color: '#666', textAlign: 'center', marginTop: '5px', minHeight: '18px' });
        actionPanel.appendChild(scrapeButton);
        actionPanel.appendChild(statusArea);
        resultsActionPanel = document.createElement('div');
        resultsActionPanel.id = 'results-action-panel';
        Object.assign(resultsActionPanel.style, { padding: '15px', display: 'none', flexDirection: 'column', gap: '10px' });
        showResultsButton = document.createElement('button');
        Object.assign(showResultsButton.style, { padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' });
        showResultsButton.textContent = 'Tampilkan Hasil';
        showResultsButton.addEventListener('click', handleShowResults);
        downloadExcelButton = document.createElement('button');
        Object.assign(downloadExcelButton.style, { padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' });
        downloadExcelButton.textContent = 'Download Excel Langsung';
        downloadExcelButton.addEventListener('click', handleDownloadExcel);
        resultsActionPanel.appendChild(showResultsButton);
        resultsActionPanel.appendChild(downloadExcelButton);
        uiContainer.appendChild(infoPanel);
        uiContainer.appendChild(actionPanel);
        uiContainer.appendChild(resultsActionPanel);
        parentContainer.appendChild(uiContainer);
    }

    function updateUI() {
        if (!uiContainer) return;
        infoPanel.style.display = 'none';
        actionPanel.style.display = 'none';
        resultsActionPanel.style.display = 'none';
        scrapeButton.disabled = true;
        isScraping = false;
        switch(currentScrapeMode) {
            case 'scraping':
                isScraping = true;
                scrapeButton.disabled = true;
                scrapeButton.style.opacity = '0.6';
                actionPanel.style.display = 'flex';
                break;
            case 'finished':
                actionPanel.style.display = 'none';
                resultsActionPanel.style.display = 'flex';
                statusArea.textContent = `Proses selesai! (${lastScrapeResult.length} produk)`;
                if (scrapeContext.type === 'store' || scrapeContext.type === 'search') {
                    infoPanel.style.display = 'block';
                }
                break;
            case 'store':
                const productSoldCount = parseInt(scrapeContext.info.productSold || 0).toLocaleString('id-ID');
                let shopTitleHtml;
                if (scrapeContext.info.badgeUrl) {
                    shopTitleHtml = `<h4 style="margin: 0 0 10px 0; color: #333; display: flex; align-items: center; gap: 8px;"><img src="${scrapeContext.info.badgeUrl}" alt="${scrapeContext.info.badgeText}" title="${scrapeContext.info.badgeText}" style="height: 20px; vertical-align: middle;"><span>${scrapeContext.info.name}</span></h4>`;
                } else {
                    shopTitleHtml = `<h4 style="margin: 0 0 10px 0; color: #333;">${scrapeContext.info.name}</h4>`;
                }
                infoPanel.innerHTML = `
                    ${shopTitleHtml}
                    <ul style="list-style: none; margin: 0; padding: 0; font-size: 13px; color: #555; line-height: 1.6;">
                        <li><strong>Lokasi:</strong> ${scrapeContext.info.location}</li>
                        <li><strong>Produk Aktif:</strong> ${scrapeContext.info.activeProduct.toLocaleString('id-ID')}</li>
                        <li><strong>Produk Terjual:</strong> ${productSoldCount}</li>
                    </ul>
                    <div style="font-size: 11px; color: #999; margin-top: 10px;">Shop ID: ${scrapeContext.info.shopID}</div>`;
                scrapeButton.textContent = 'Mulai Scrape Toko Ini';
                statusArea.textContent = 'Siap untuk scrape seluruh toko.';
                scrapeButton.disabled = false;
                infoPanel.style.display = 'block';
                actionPanel.style.display = 'flex';
                break;
            case 'search_collecting':
                infoPanel.innerHTML = `<h4 style="margin: 0 0 10px 0; color: #333;">Mode Pencarian</h4><div style="font-size: 13px; color: #555;">Keyword: "<strong>${scrapeContext.query}</strong>"</div>`;
                scrapeButton.textContent = `Proses Detail (${collectedSearchProducts.length}) Produk Terkumpul`;
                statusArea.innerHTML = '<strong>Scroll ke bawah</strong> untuk mengumpulkan lebih banyak produk.';
                scrapeButton.disabled = collectedSearchProducts.length === 0;
                infoPanel.style.display = 'block';
                actionPanel.style.display = 'flex';
                break;
            default:
                infoPanel.innerHTML = `<div style="padding: 10px; text-align: center; color: #888;">Navigasi ke halaman toko atau pencarian untuk memulai.</div>`;
                infoPanel.style.display = 'block';
                break;
        }
    }

    function makeApiRequest(url, payload, customHeaders = {}) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "POST", url: url, headers: { 'Content-Type': 'application/json', ...customHeaders }, data: JSON.stringify(payload),
                onload: function(response) {
                    if (response.status >= 200 && response.status < 300) { resolve(JSON.parse(response.responseText)); }
                    else { reject({ status: response.status, statusText: response.statusText, body: response.responseText }); }
                },
                onerror: function(error) { reject(error); }
            });
        });
    }

    async function startScrape() {
        if (isScraping) return;
        const originalMode = currentScrapeMode;
        currentScrapeMode = 'scraping'; updateUI();
        try {
            let initialProductList;
            if (originalMode === 'store') {
                scrapeButton.textContent = 'Fase 1: Mengambil Daftar Toko...';
                initialProductList = await fetchAllShopProducts(scrapeContext.info.shopID);
            } else if (originalMode === 'search_collecting') {
                scrapeButton.textContent = 'Fase 1: Menggunakan Produk Terkumpul...';
                initialProductList = collectedSearchProducts;
            }
            if (!initialProductList || initialProductList.length === 0) { throw new Error("Tidak ada produk untuk diproses."); }
            scrapeButton.textContent = 'Fase 2: Mengambil Detail...';
            const detailedProductList = await fetchProductsDetails(initialProductList);
            statusArea.textContent = "Menggabungkan data...";
            lastScrapeResult = mergeProductData(initialProductList, detailedProductList);
            currentScrapeMode = 'finished'; updateUI();
        } catch (error) {
            console.error("Tokopedia Scraper Error:", error); alert(`Terjadi kesalahan saat scraping: ${error.message}`);
            currentScrapeMode = originalMode; updateUI();
        }
    }

    async function fetchAllShopProducts(shopId) {
        let allProducts = [], currentPage = 1, hasMore = true;
        const shopListHeaders = { "x-source": "tokopedia-lite", "x-device": "default_v3" };
        while (hasMore) {
            statusArea.textContent = `Mengambil daftar toko... (Halaman ${currentPage}, Total: ${allProducts.length})`;
            const payload = [{ operationName: "ShopProducts", variables: { sid: shopId, page: currentPage, perPage: 80, sort: 8 }, query: `query ShopProducts($sid: String!, $page: Int, $perPage: Int, $sort: Int) { GetShopProduct(shopID: $sid, filter: {page: $page, perPage: $perPage, sort: $sort}) { links { next } data { name product_url product_id price { text_idr } } } }` }];
            try {
                const response = (await makeApiRequest("https://gql.tokopedia.com/graphql/ShopProducts", payload, shopListHeaders))[0];
                if (response.errors) throw new Error(JSON.stringify(response.errors));
                const productData = response.data.GetShopProduct;
                const productsOnPage = productData.data || [];
                if (productsOnPage.length > 0) allProducts.push(...productsOnPage);
                hasMore = !!productData.links.next && productsOnPage.length > 0;
                currentPage++;
                await new Promise(resolve => setTimeout(resolve, 300));
            } catch (e) { console.error(`Gagal mengambil halaman ${currentPage}:`, e); hasMore = false; }
        }
        return allProducts;
    }

    async function fetchProductsDetails(productList) {
        let allDetails = [];
        for (let i = 0; i < productList.length; i += CONCURRENT_REQUESTS) {
            const batch = productList.slice(i, i + CONCURRENT_REQUESTS);
            statusArea.textContent = `Mengambil detail... (${i + batch.length}/${productList.length})`;
            const promises = batch.map(product => {
                try {
                    if (!product.product_url) { return Promise.resolve({ product_id_key: product.product_id, error: 'URL produk tidak valid atau hilang.' }); }
                    const url = new URL(product.product_url);
                    const pathParts = url.pathname.replace(/^\/|\/$/g, '').split('/');
                    const shopDomain = pathParts[0];
                    const productKey = pathParts[pathParts.length - 1];
                    if (!shopDomain || !productKey) throw new Error("Format URL tidak valid untuk parsing");
                    const payload = [{
                        operationName: "PDPGetLayoutQuery",
                        variables: { shopDomain, productKey, layoutID: "", apiVersion: 1 },
                        query: `query PDPGetLayoutQuery($shopDomain: String, $productKey: String, $layoutID: String, $apiVersion: Float) { pdpGetLayout(shopDomain: $shopDomain, productKey: $productKey, layoutID: $layoutID, apiVersion: $apiVersion) { basicInfo { id: productID shopID shopName ttsPID txStats { countSold } stats { countReview rating } createdAt status url } } }`
                    }];
                    const pdpHeaders = { "x-tkpd-akamai": "pdpGetLayout", "Origin": "https://www.tokopedia.com", "Referer": product.product_url };
                    return makeApiRequest("https://gql.tokopedia.com/graphql/PDPGetLayoutQuery", payload, pdpHeaders)
                        .then(response => ({ product_id_key: product.product_id, details: response[0]?.data?.pdpGetLayout?.basicInfo, error: response[0]?.errors || null }))
                        .catch(error => ({ product_id_key: product.product_id, error: "Request Failed" }));
                } catch (e) {
                    console.error(`Gagal memproses URL: ${product.product_url}`, e);
                    return Promise.resolve({ product_id_key: product.product_id, error: `URL Parsing Failed: ${e.message}` });
                }
            });
            const results = await Promise.all(promises);
            allDetails.push(...results);
        }
        return allDetails;
    }

    function mergeProductData(initialList, detailList) {
        const detailsMap = new Map(detailList.map(d => [d.product_id_key, d]));
        return initialList.map(initial => {
            const detailData = detailsMap.get(initial.product_id);
            const basicInfo = detailData?.details || {};
            const priceText = initial.price.text_idr || '0';
            const priceNumber = parseInt(priceText.replace(/Rp|\./g, ''), 10) || 0;
            const soldNumber = parseInt(basicInfo.txStats?.countSold, 10) || 0;
            const reviewCountNumber = parseInt(basicInfo.stats?.countReview, 10) || 0;
            const ratingNumber = basicInfo.stats?.rating ?? 0;
            let badgeText = 'Reguler';
            let badgeUrl = '';
            if (initial.badge_url) {
                badgeUrl = initial.badge_url;
                if (badgeUrl.includes('official_store_badge')) { badgeText = 'Mall'; }
                else if (badgeUrl.includes('goldmerchant')) { badgeText = 'Power Shop'; }
            } else if (scrapeContext.type === 'store') {
                badgeText = scrapeContext.info.badgeText || 'N/A';
                if (badgeText === 'Official Store') badgeText = 'Mall';
                if (badgeText === 'Power Merchant') badgeText = 'Power Shop';
                badgeUrl = scrapeContext.info.badgeUrl || '';
            }
            let fetchErrorText = '';
            if (detailData?.error) {
                const errorString = JSON.stringify(detailData.error);
                if (errorString.includes('product: not found')) { fetchErrorText = 'Product Not Found'; }
                else { fetchErrorText = errorString; }
            }
            return {
                'Shop ID': basicInfo.shopID ?? (scrapeContext.type === 'store' ? scrapeContext.info.shopID : 'N/A'),
                'Shop Badge': badgeText,
                'Shop Name': basicInfo.shopName ?? initial.shop_name ?? (scrapeContext.type === 'store' ? scrapeContext.info.name : 'N/A'),
                'Product ID': initial.product_id, 'SKU': basicInfo.ttsPID ?? 'N/A', 'Product Name': initial.name,
                'Price': priceNumber, 'Sold': soldNumber, 'Review Count': reviewCountNumber, 'Rating': ratingNumber,
                'Product URL': initial.product_url, 'Created At': basicInfo.createdAt ?? 'N/A',
                'Status': basicInfo.status ?? 'N/A', 'Fetch Error': fetchErrorText, 'badge_url_internal': badgeUrl
            };
        });
    }

    function handleShowResults() {
        if (!lastScrapeResult) { alert("Tidak ada data untuk ditampilkan."); return; }
        const newTab = window.open(); if (!newTab) { alert("Gagal membuka tab baru. Mohon izinkan pop-up untuk situs ini."); return; }
        const title = `Hasil Scrape - ${scrapeContext.type === 'store' ? scrapeContext.info.name : `Pencarian "${scrapeContext.query}"`}`;
        const headers = Object.keys(lastScrapeResult[0]).filter(h => h !== 'Shop Badge' && h !== 'badge_url_internal');
        const headerHtml = headers.map(h => `<th>${h}</th>`).join('');
        const bodyHtml = lastScrapeResult.map(row => {
            const rowHtml = headers.map(header => {
                const val = row[header]; let cellContent;
                if (header === 'Product URL' && String(val).startsWith('http')) { cellContent = `<a href="${val}" target="_blank" rel="noopener noreferrer">Link</a>`; }
                else if (header === 'Shop Name' && row['badge_url_internal']) { cellContent = `<img src="${row['badge_url_internal']}" alt="${row['Shop Badge']}" title="${row['Shop Badge']}" style="width:16px; height:16px; vertical-align:middle; margin-right: 5px;">${val}`; }
                else if (typeof val === 'number') { const options = { minimumFractionDigits: 0, maximumFractionDigits: 1 }; if (header !== 'Rating') { options.minimumFractionDigits = 0; options.maximumFractionDigits = 0; } cellContent = val.toLocaleString('id-ID', options); }
                else { cellContent = String(val ?? '').replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"'); }
                const className = (header === 'Product Name' || header === 'SKU' || header === 'Fetch Error') ? 'class="wrap-text"' : ''; return `<td ${className}>${cellContent}</td>`;
            }).join(''); return `<tr>${rowHtml}</tr>`;
        }).join('');
        const styles = `body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;margin:0;background-color:#f4f4f4;color:#333}.container{max-width:95%;margin:20px auto;padding:20px;background-color:#fff;box-shadow:0 2px 10px rgba(0,0,0,.1);border-radius:8px}h1{color:#00AA5B}.table-container{max-height:85vh;overflow:auto;border:1px solid #ddd}table{width:100%;border-collapse:collapse}th,td{padding:8px 12px;border:1px solid #ddd;text-align:left;vertical-align:top;white-space:nowrap}thead th{position:sticky;top:0;background-color:#f2f2f2;font-weight:700;cursor:pointer;user-select:none}thead th:hover{background-color:#e9e9e9}td.wrap-text{white-space:normal;min-width:250px;}span.sort-indicator{color:#333;font-size:0.9em;padding-left:5px;}`;
        const htmlShell = `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"><title>${title}</title><style>${styles}</style></head><body><div class="container"><h1>${title}</h1><h3>Total Produk: ${lastScrapeResult.length.toLocaleString('id-ID')}</h3><div class="table-container"><table id="resultTable"><thead><tr>${headerHtml}</tr></thead><tbody>${bodyHtml}</tbody></table></div></div></body></html>`;
        newTab.document.open(); newTab.document.write(htmlShell);
        const sortingScriptContent = `function makeTableSortable(tableId){const table=document.getElementById(tableId);if(!table)return;const headers=table.querySelectorAll('thead th');let sortDirections=Array.from(headers).map(()=>null);function parseIndonesianNumber(text){const parsableText=text.replace(/\\./g,'').replace(',','.');return parseFloat(parsableText)}headers.forEach((header,index)=>{header.addEventListener('click',()=>{const tbody=table.querySelector('tbody');const rows=Array.from(tbody.rows);const currentDir=sortDirections[index];const newDir=currentDir==='asc'?'desc':'asc';sortDirections.fill(null);headers.forEach(h=>h.querySelector('span.sort-indicator')?.remove());sortDirections[index]=newDir;const indicator=document.createElement('span');indicator.className='sort-indicator';indicator.textContent=newDir==='asc'?' ▲':' ▼';header.appendChild(indicator);rows.sort((a,b)=>{const cellA=a.cells[index].innerText.trim();const cellB=b.cells[index].innerText.trim();const numA=parseIndonesianNumber(cellA);const numB=parseIndonesianNumber(cellB);let comparison=0;if(!isNaN(numA)&&!isNaN(numB)){comparison=numA-numB}else{comparison=cellA.localeCompare(cellB,'id-ID',{numeric:true,sensitivity:'base'})}return newDir==='asc'?comparison:-comparison});tbody.append(...rows)})})};makeTableSortable('resultTable');`;
        const scriptElement = newTab.document.createElement('script'); scriptElement.textContent = sortingScriptContent; newTab.document.body.appendChild(scriptElement); newTab.document.close();
    }

    function handleDownloadExcel() {
        if (!lastScrapeResult) { alert("Tidak ada data untuk diunduh."); return; }
        const dataForExport = lastScrapeResult.map(row => { const newRow = {...row}; delete newRow.badge_url_internal; return newRow; });
        const ws = XLSX.utils.json_to_sheet(dataForExport); const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Produk Scraped");
        const contextName = scrapeContext.type === 'store' ? scrapeContext.info.name : scrapeContext.query;
        const safeFileName = contextName.replace(/[^a-zA-Z0-9]/g, '_');
        XLSX.writeFile(wb, `tokopedia_scrape_${safeFileName}.xlsx`);
    }

    function initScraperLogic() {
        const path = window.location.pathname;
        if (!path.startsWith('/search')) {
            // Biarkan kosong, updateUI akan menangani mode 'store' jika data sudah ada
        }
        updateUI();
    }

    // ===================================================================
    //      BAGIAN 4: TITIK MASUK UTAMA
    // ===================================================================
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initialize();
    } else {
        window.addEventListener('DOMContentLoaded', initialize);
    }
})();
