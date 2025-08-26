// ==UserScript==
// @name         Tokopedia Scraper
// @namespace    https://www.tokopedia.com/
// @version      6.5
// @description  Scrape produk dari toko atau kumpulkan dari pencarian (scroll), lalu ekspor ke Excel. Membutuhkan aktivasi.
// @author       logic by Naufal Abiyyu & User
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
const _0x28729b = _0x3205;
(function (_0x30c41a, _0x470731) {
    const _0x44e3dc = _0x3205, _0x5c5d15 = _0x30c41a();
    while (!![]) {
        try {
            const _0x345553 = -parseInt(_0x44e3dc(0x1bd)) / 0x1 + -parseInt(_0x44e3dc(0x22e)) / 0x2 + parseInt(_0x44e3dc(0x258)) / 0x3 * (parseInt(_0x44e3dc(0x224)) / 0x4) + parseInt(_0x44e3dc(0x211)) / 0x5 * (-parseInt(_0x44e3dc(0x1dd)) / 0x6) + parseInt(_0x44e3dc(0x202)) / 0x7 * (parseInt(_0x44e3dc(0x25e)) / 0x8) + parseInt(_0x44e3dc(0x1c5)) / 0x9 * (-parseInt(_0x44e3dc(0x25a)) / 0xa) + parseInt(_0x44e3dc(0x261)) / 0xb * (parseInt(_0x44e3dc(0x267)) / 0xc);
            if (_0x345553 === _0x470731)
                break;
            else
                _0x5c5d15['push'](_0x5c5d15['shift']());
        } catch (_0xb82962) {
            _0x5c5d15['push'](_0x5c5d15['shift']());
        }
    }
}(_0x3973, 0x6cbea));
const API_URL = _0x28729b(0x172), STATE_KEY = 'tokopedia_scraper_activation_state', UI_STATE_KEY = _0x28729b(0x1b1);
let uiContainer, infoPanel, actionPanel, scrapeButton, statusArea, resultsActionPanel, showResultsButton, downloadExcelButton, currentScrapeMode = _0x28729b(0x160), scrapeContext = {}, isScraping = ![], lastScrapeResult = null, collectedSearchProducts = [], processedProductIds = new Set();
const CONCURRENT_REQUESTS = 0xa;
function interceptFetch() {
    const _0x22ecd7 = _0x28729b, _0x5d2bf5 = unsafeWindow[_0x22ecd7(0x1f6)];
    unsafeWindow[_0x22ecd7(0x1f6)] = async function (..._0x47e9d4) {
        const _0xc4cbd9 = _0x22ecd7, _0xd8c9cd = await _0x5d2bf5[_0xc4cbd9(0x1e2)](unsafeWindow, _0x47e9d4), _0x3931c7 = typeof _0x47e9d4[0x0] === _0xc4cbd9(0x1c0) ? _0x47e9d4[0x0] : _0x47e9d4[0x0][_0xc4cbd9(0x1a2)];
        if (_0xd8c9cd['ok'] && !isScraping) {
            if (_0x3931c7[_0xc4cbd9(0x1be)](_0xc4cbd9(0x1fc))) {
                const _0x186712 = _0xd8c9cd[_0xc4cbd9(0x197)]();
                try {
                    const _0x3eb26b = (await _0x186712['json']())[0x0];
                    if (_0x3eb26b['data']?.['shopInfoByID']?.[_0xc4cbd9(0x1d6)]['length'] > 0x0) {
                        const _0x428172 = _0x3eb26b[_0xc4cbd9(0x1eb)]['shopInfoByID']['result'][0x0];
                        let _0x5cbafd = _0xc4cbd9(0x19e), _0x11f44b = '';
                        const _0x5576a8 = _0x428172[_0xc4cbd9(0x18e)];
                        if (_0x5576a8) {
                            if (_0x5576a8[_0xc4cbd9(0x179)] === 0x1 && _0x5576a8[_0xc4cbd9(0x182)])
                                _0x5cbafd = _0xc4cbd9(0x20d), _0x11f44b = _0x5576a8[_0xc4cbd9(0x182)];
                            else
                                _0x5576a8[_0xc4cbd9(0x1fb)] === 0x1 && _0x5576a8['badge'] && (_0x5cbafd = _0xc4cbd9(0x1a7), _0x11f44b = _0x5576a8[_0xc4cbd9(0x182)]);
                        }
                        currentScrapeMode = _0xc4cbd9(0x1bb), scrapeContext = {
                            'type': _0xc4cbd9(0x1bb),
                            'info': {
                                'shopID': _0x428172[_0xc4cbd9(0x23f)][_0xc4cbd9(0x234)],
                                'name': _0x428172[_0xc4cbd9(0x23f)][_0xc4cbd9(0x17f)],
                                'activeProduct': _0x428172[_0xc4cbd9(0x1f5)],
                                'location': _0x428172['location'],
                                'productSold': _0x428172[_0xc4cbd9(0x242)][_0xc4cbd9(0x25c)],
                                'badgeText': _0x5cbafd,
                                'badgeUrl': _0x11f44b
                            }
                        };
                        if (uiContainer)
                            updateUI();
                    }
                } catch (_0x215b04) {
                    console[_0xc4cbd9(0x18a)](_0xc4cbd9(0x24a), _0x215b04);
                }
            } else {
                if (_0x3931c7[_0xc4cbd9(0x1be)]('graphql/SearchProductV5Query')) {
                    const _0x2c58ac = _0xd8c9cd[_0xc4cbd9(0x197)]();
                    try {
                        const _0x521443 = (await _0x2c58ac['json']())[0x0], _0x268271 = _0x521443?.[_0xc4cbd9(0x1eb)]?.[_0xc4cbd9(0x1cd)]?.['data']?.['products'];
                        if (_0x268271 && Array[_0xc4cbd9(0x23a)](_0x268271)) {
                            _0x268271[_0xc4cbd9(0x210)](_0x5f0ead => {
                                const _0x545241 = _0xc4cbd9;
                                _0x5f0ead['id'] && !processedProductIds[_0x545241(0x190)](_0x5f0ead['id']) && (processedProductIds[_0x545241(0x252)](_0x5f0ead['id']), collectedSearchProducts[_0x545241(0x16a)]({
                                    'product_id': _0x5f0ead['id'],
                                    'product_url': _0x5f0ead['url'][_0x545241(0x1d1)]('?')[0x0],
                                    'name': _0x5f0ead[_0x545241(0x17f)],
                                    'price': { 'text_idr': _0x5f0ead[_0x545241(0x1d5)]['text'] },
                                    'shop_name': _0x5f0ead['shop'][_0x545241(0x17f)],
                                    'badge_url': _0x5f0ead['badge']?.[_0x545241(0x1a2)] || ''
                                }));
                            });
                            if (currentScrapeMode !== _0xc4cbd9(0x21c)) {
                                const _0x393458 = new URLSearchParams(window[_0xc4cbd9(0x164)][_0xc4cbd9(0x1b3)]);
                                scrapeContext = {
                                    'type': _0xc4cbd9(0x1b3),
                                    'query': _0x393458[_0xc4cbd9(0x196)]('q') || 'Unknown'
                                }, currentScrapeMode = _0xc4cbd9(0x21c);
                            }
                            if (uiContainer)
                                updateUI();
                        }
                    } catch (_0x4dd125) {
                        console[_0xc4cbd9(0x18a)](_0xc4cbd9(0x19d), _0x4dd125);
                    }
                }
            }
        }
        return _0xd8c9cd;
    };
}
interceptFetch();
function createActivationUI() {
    const _0x5efa18 = _0x28729b;
    if (document[_0x5efa18(0x257)](_0x5efa18(0x208)))
        return;
    const _0xb950d = document[_0x5efa18(0x277)](_0x5efa18(0x225));
    _0xb950d['id'] = _0x5efa18(0x208), Object[_0x5efa18(0x1c3)](_0xb950d['style'], {
        'position': 'fixed',
        'bottom': _0x5efa18(0x1d9),
        'left': '20px',
        'zIndex': '10001',
        'backgroundColor': '#fff',
        'border': _0x5efa18(0x238),
        'borderRadius': _0x5efa18(0x241),
        'boxShadow': _0x5efa18(0x1f9),
        'padding': _0x5efa18(0x1d9),
        'fontFamily': _0x5efa18(0x1c8),
        'width': _0x5efa18(0x232)
    }), _0xb950d['innerHTML'] = _0x5efa18(0x217), document[_0x5efa18(0x260)][_0x5efa18(0x1d7)](_0xb950d), document[_0x5efa18(0x257)](_0x5efa18(0x1c6))[_0x5efa18(0x240)](_0x5efa18(0x24c), handleLogin);
}
async function createMainUI(_0x40cc5e) {
    const _0x3d661d = _0x28729b, _0x3b162b = document[_0x3d661d(0x257)]('activation-container');
    if (_0x3b162b)
        _0x3b162b[_0x3d661d(0x22d)]();
    if (document[_0x3d661d(0x257)](_0x3d661d(0x228)))
        return;
    const _0xce201d = document[_0x3d661d(0x277)](_0x3d661d(0x225));
    _0xce201d['id'] = 'scraper-main-container', _0xce201d[_0x3d661d(0x184)][_0x3d661d(0x19f)] = _0x3d661d(0x1f0);
    const _0xc36d41 = document['createElement'](_0x3d661d(0x225));
    _0xc36d41[_0x3d661d(0x184)][_0x3d661d(0x19f)] = _0x3d661d(0x16f);
    const _0x286209 = document[_0x3d661d(0x277)](_0x3d661d(0x225));
    _0x286209[_0x3d661d(0x184)]['cssText'] = _0x3d661d(0x220);
    const _0x1021f7 = document['createElement'](_0x3d661d(0x225));
    _0x1021f7[_0x3d661d(0x184)][_0x3d661d(0x19f)] = _0x3d661d(0x1b8), _0x1021f7[_0x3d661d(0x191)] = _0x3d661d(0x1ed);
    const _0x5af2c2 = document[_0x3d661d(0x277)](_0x3d661d(0x225));
    _0x5af2c2['id'] = _0x3d661d(0x21b);
    const _0x4696fc = new Date(_0x40cc5e['expiry_date'])[_0x3d661d(0x169)](_0x3d661d(0x248), {
            'day': _0x3d661d(0x20e),
            'month': _0x3d661d(0x1e7),
            'year': _0x3d661d(0x20e)
        }), _0x3783f9 = _0x40cc5e[_0x3d661d(0x180)]['map'](_0x57d4f4 => _0x3d661d(0x158) + (_0x57d4f4 === _0x40cc5e[_0x3d661d(0x15a)] ? '#007bff;\x20font-weight:bold;' : '#555;') + '\x22>' + _0x57d4f4 + '\x20' + (_0x57d4f4 === _0x40cc5e[_0x3d661d(0x15a)] ? _0x3d661d(0x259) : '') + _0x3d661d(0x1c2))[_0x3d661d(0x21f)]('');
    _0x5af2c2['innerHTML'] = _0x3d661d(0x167) + _0x40cc5e[_0x3d661d(0x243)] + _0x3d661d(0x1ef) + _0x4696fc + _0x3d661d(0x1ee) + _0x3783f9 + _0x3d661d(0x246), _0x286209['appendChild'](_0x1021f7), _0x286209['appendChild'](_0x5af2c2), _0xc36d41[_0x3d661d(0x1d7)](_0x286209), createScraperUI(_0xc36d41), _0xce201d['appendChild'](_0xc36d41), document[_0x3d661d(0x260)][_0x3d661d(0x1d7)](_0xce201d), document['getElementById'](_0x3d661d(0x21e))[_0x3d661d(0x240)](_0x3d661d(0x24c), handleLogout);
    const _0x31c579 = document[_0x3d661d(0x257)](_0x3d661d(0x237)), _0x3f0632 = (_0x4c720b, _0x162e9a = ![]) => {
            const _0x4125ef = _0x3d661d;
            _0x4c720b === 'collapsed' ? (_0x5af2c2[_0x4125ef(0x184)]['display'] = 'none', _0x31c579[_0x4125ef(0x1a1)] = _0x4125ef(0x1a5)) : (_0x5af2c2[_0x4125ef(0x184)][_0x4125ef(0x1b9)] = _0x4125ef(0x26f), _0x31c579[_0x4125ef(0x1a1)] = _0x4125ef(0x1e1));
            if (!_0x162e9a)
                GM_setValue(UI_STATE_KEY, _0x4c720b);
        };
    _0x31c579[_0x3d661d(0x240)](_0x3d661d(0x24c), () => _0x3f0632(_0x5af2c2[_0x3d661d(0x184)][_0x3d661d(0x1b9)] === _0x3d661d(0x160) ? _0x3d661d(0x253) : 'collapsed'));
    const _0x1e7cdd = await GM_getValue(UI_STATE_KEY, 'expanded');
    _0x3f0632(_0x1e7cdd, !![]), initScraperLogic();
}
function apiCall(_0x40961a, _0x3a9b5a) {
    return new Promise((_0x1dfe99, _0x52f174) => {
        const _0x3da6a6 = _0x3205;
        if (API_URL === _0x3da6a6(0x207))
            return _0x52f174({ 'message': _0x3da6a6(0x274) });
        GM_xmlhttpRequest({
            'method': 'POST',
            'url': API_URL,
            'data': JSON['stringify']({
                'action': _0x40961a,
                ..._0x3a9b5a
            }),
            'headers': { 'Content-Type': _0x3da6a6(0x23d) },
            'onload': _0x21662c => {
                const _0x159cff = _0x3da6a6;
                try {
                    _0x1dfe99(JSON[_0x159cff(0x1c1)](_0x21662c[_0x159cff(0x26a)]));
                } catch (_0x4a4649) {
                    _0x52f174({ 'message': _0x159cff(0x17c) });
                }
            },
            'onerror': _0x3c413c => _0x52f174({ 'message': _0x3da6a6(0x16c) })
        });
    });
}
async function handleLogin() {
    const _0x5342fd = _0x28729b, _0x3bbf0d = document[_0x5342fd(0x257)](_0x5342fd(0x1cb))['value'][_0x5342fd(0x21d)](), _0xa2a9cf = document['getElementById'](_0x5342fd(0x23c))[_0x5342fd(0x25f)][_0x5342fd(0x21d)](), _0x1f5004 = document[_0x5342fd(0x257)](_0x5342fd(0x273)), _0xcc8e71 = document['getElementById'](_0x5342fd(0x1c6));
    if (!_0x3bbf0d || !_0xa2a9cf) {
        _0x1f5004[_0x5342fd(0x1a1)] = _0x5342fd(0x1d3);
        return;
    }
    _0x1f5004[_0x5342fd(0x1a1)] = _0x5342fd(0x26d), _0xcc8e71[_0x5342fd(0x219)] = !![];
    let _0x3c97f5 = await GM_getValue(STATE_KEY, {});
    !_0x3c97f5[_0x5342fd(0x15a)] && (_0x3c97f5['deviceId'] = _0x5342fd(0x1b7) + Date[_0x5342fd(0x1d0)]() + Math[_0x5342fd(0x1ea)]()[_0x5342fd(0x178)](0x24)[_0x5342fd(0x19b)](0x2, 0x9));
    try {
        const _0x24ef08 = await apiCall(_0x5342fd(0x165), {
            'username': _0x3bbf0d,
            'password': _0xa2a9cf,
            'deviceId': _0x3c97f5[_0x5342fd(0x15a)]
        });
        if (_0x24ef08[_0x5342fd(0x201)] === _0x5342fd(0x200)) {
            const _0xc445e0 = {
                'activated': !![],
                'username': _0x3bbf0d,
                'deviceId': _0x3c97f5[_0x5342fd(0x15a)],
                'expiry_date': _0x24ef08[_0x5342fd(0x1eb)][_0x5342fd(0x244)],
                'devices': _0x24ef08['data']['devices'] || []
            };
            await GM_setValue(STATE_KEY, _0xc445e0), createMainUI(_0xc445e0);
        } else
            _0x1f5004['textContent'] = _0x24ef08[_0x5342fd(0x1af)] || _0x5342fd(0x15d), _0xcc8e71['disabled'] = ![];
    } catch (_0x505bf1) {
        _0x1f5004['textContent'] = _0x505bf1[_0x5342fd(0x1af)] || _0x5342fd(0x20f), _0xcc8e71[_0x5342fd(0x219)] = ![];
    }
}
async function handleLogout() {
    const _0x999eea = _0x28729b;
    if (!confirm('Apakah\x20Anda\x20yakin\x20ingin\x20menghapus\x20akun\x20dari\x20browser\x20ini?'))
        return;
    const _0x4a0e60 = await GM_getValue(STATE_KEY, {});
    if (_0x4a0e60[_0x999eea(0x15e)])
        await apiCall(_0x999eea(0x264), {
            'username': _0x4a0e60['username'],
            'deviceId': _0x4a0e60[_0x999eea(0x15a)]
        });
    await GM_deleteValue(STATE_KEY), window[_0x999eea(0x164)][_0x999eea(0x229)]();
}
async function initialize() {
    const _0x40f424 = _0x28729b;
    let _0x135743 = await GM_getValue(STATE_KEY, {});
    if (_0x135743 && _0x135743[_0x40f424(0x15e)] && _0x135743['username'] && _0x135743[_0x40f424(0x15a)])
        try {
            const _0xa108f5 = await apiCall(_0x40f424(0x203), {
                'username': _0x135743['username'],
                'deviceId': _0x135743[_0x40f424(0x15a)]
            });
            _0xa108f5['status'] === 'success' ? (_0x135743[_0x40f424(0x244)] = _0xa108f5[_0x40f424(0x1eb)]['expiry_date'], _0x135743['devices'] = _0xa108f5['data'][_0x40f424(0x180)], await GM_setValue(STATE_KEY, _0x135743), createMainUI(_0x135743)) : (await GM_deleteValue(STATE_KEY), createActivationUI(), setTimeout(() => {
                const _0x3eadb2 = _0x40f424, _0x2d9d6d = document['getElementById']('act_status');
                if (_0x2d9d6d)
                    _0x2d9d6d[_0x3eadb2(0x1a1)] = _0x3eadb2(0x254) + _0xa108f5['message'];
            }, 0x1f4));
        } catch (_0x2e9fd2) {
            console[_0x40f424(0x168)](_0x40f424(0x16e), _0x2e9fd2[_0x40f424(0x1af)]), createMainUI(_0x135743);
        }
    else
        createActivationUI();
}
function createScraperUI(_0x102833) {
    const _0xe9f4c2 = _0x28729b;
    uiContainer = document[_0xe9f4c2(0x277)](_0xe9f4c2(0x225)), uiContainer['id'] = 'tokopedia-scraper-container';
    const _0xfdc5fc = document[_0xe9f4c2(0x277)](_0xe9f4c2(0x225));
    Object[_0xe9f4c2(0x1c3)](_0xfdc5fc[_0xe9f4c2(0x184)], {
        'padding': _0xe9f4c2(0x1a9),
        'backgroundColor': '#f7f7f7',
        'fontWeight': _0xe9f4c2(0x1fd),
        'borderBottom': _0xe9f4c2(0x227),
        'color': _0xe9f4c2(0x25d),
        'fontSize': _0xe9f4c2(0x270)
    }), _0xfdc5fc[_0xe9f4c2(0x1a1)] = _0xe9f4c2(0x16d), uiContainer[_0xe9f4c2(0x1d7)](_0xfdc5fc), infoPanel = document['createElement'](_0xe9f4c2(0x225)), infoPanel['id'] = _0xe9f4c2(0x1e4), Object['assign'](infoPanel['style'], {
        'padding': _0xe9f4c2(0x22a),
        'borderBottom': _0xe9f4c2(0x227)
    }), actionPanel = document[_0xe9f4c2(0x277)](_0xe9f4c2(0x225)), actionPanel['id'] = _0xe9f4c2(0x235), Object['assign'](actionPanel['style'], {
        'padding': _0xe9f4c2(0x22a),
        'display': 'flex',
        'flexDirection': _0xe9f4c2(0x214),
        'gap': _0xe9f4c2(0x16b)
    }), scrapeButton = document['createElement'](_0xe9f4c2(0x204)), scrapeButton['id'] = _0xe9f4c2(0x166), Object['assign'](scrapeButton['style'], {
        'padding': _0xe9f4c2(0x206),
        'backgroundColor': _0xe9f4c2(0x25d),
        'color': _0xe9f4c2(0x1e8),
        'border': 'none',
        'borderRadius': _0xe9f4c2(0x185),
        'cursor': 'pointer',
        'fontSize': '14px',
        'fontWeight': _0xe9f4c2(0x1fd)
    }), scrapeButton[_0xe9f4c2(0x240)](_0xe9f4c2(0x24c), startScrape), statusArea = document[_0xe9f4c2(0x277)]('div'), statusArea['id'] = 'scrape-status', Object[_0xe9f4c2(0x1c3)](statusArea[_0xe9f4c2(0x184)], {
        'fontSize': _0xe9f4c2(0x209),
        'color': _0xe9f4c2(0x1b4),
        'textAlign': 'center',
        'marginTop': _0xe9f4c2(0x185),
        'minHeight': _0xe9f4c2(0x245)
    }), actionPanel['appendChild'](scrapeButton), actionPanel[_0xe9f4c2(0x1d7)](statusArea), resultsActionPanel = document[_0xe9f4c2(0x277)](_0xe9f4c2(0x225)), resultsActionPanel['id'] = 'results-action-panel', Object[_0xe9f4c2(0x1c3)](resultsActionPanel[_0xe9f4c2(0x184)], {
        'padding': '15px',
        'display': _0xe9f4c2(0x160),
        'flexDirection': _0xe9f4c2(0x214),
        'gap': _0xe9f4c2(0x16b)
    }), showResultsButton = document[_0xe9f4c2(0x277)]('button'), Object[_0xe9f4c2(0x1c3)](showResultsButton[_0xe9f4c2(0x184)], {
        'padding': _0xe9f4c2(0x16b),
        'backgroundColor': _0xe9f4c2(0x223),
        'color': _0xe9f4c2(0x1e8),
        'border': 'none',
        'borderRadius': _0xe9f4c2(0x185),
        'cursor': _0xe9f4c2(0x213)
    }), showResultsButton['textContent'] = 'Tampilkan\x20Hasil', showResultsButton['addEventListener'](_0xe9f4c2(0x24c), handleShowResults), downloadExcelButton = document[_0xe9f4c2(0x277)](_0xe9f4c2(0x204)), Object[_0xe9f4c2(0x1c3)](downloadExcelButton[_0xe9f4c2(0x184)], {
        'padding': _0xe9f4c2(0x16b),
        'backgroundColor': _0xe9f4c2(0x1b2),
        'color': _0xe9f4c2(0x1e8),
        'border': _0xe9f4c2(0x160),
        'borderRadius': _0xe9f4c2(0x185),
        'cursor': _0xe9f4c2(0x213)
    }), downloadExcelButton['textContent'] = _0xe9f4c2(0x17d), downloadExcelButton['addEventListener']('click', handleDownloadExcel), resultsActionPanel['appendChild'](showResultsButton), resultsActionPanel['appendChild'](downloadExcelButton), uiContainer[_0xe9f4c2(0x1d7)](infoPanel), uiContainer[_0xe9f4c2(0x1d7)](actionPanel), uiContainer[_0xe9f4c2(0x1d7)](resultsActionPanel), _0x102833[_0xe9f4c2(0x1d7)](uiContainer);
}
function updateUI() {
    const _0x39a0e7 = _0x28729b;
    if (!uiContainer)
        return;
    infoPanel[_0x39a0e7(0x184)][_0x39a0e7(0x1b9)] = _0x39a0e7(0x160), actionPanel['style'][_0x39a0e7(0x1b9)] = 'none', resultsActionPanel[_0x39a0e7(0x184)][_0x39a0e7(0x1b9)] = 'none', scrapeButton['disabled'] = !![], isScraping = ![];
    switch (currentScrapeMode) {
    case 'scraping':
        isScraping = !![], scrapeButton[_0x39a0e7(0x219)] = !![], scrapeButton[_0x39a0e7(0x184)][_0x39a0e7(0x1e0)] = _0x39a0e7(0x175), actionPanel[_0x39a0e7(0x184)][_0x39a0e7(0x1b9)] = 'flex';
        break;
    case _0x39a0e7(0x26e):
        actionPanel[_0x39a0e7(0x184)]['display'] = _0x39a0e7(0x160), resultsActionPanel[_0x39a0e7(0x184)][_0x39a0e7(0x1b9)] = _0x39a0e7(0x1a8), statusArea['textContent'] = _0x39a0e7(0x1f2) + lastScrapeResult[_0x39a0e7(0x250)] + _0x39a0e7(0x195);
        (scrapeContext[_0x39a0e7(0x194)] === _0x39a0e7(0x1bb) || scrapeContext[_0x39a0e7(0x194)] === _0x39a0e7(0x1b3)) && (infoPanel['style'][_0x39a0e7(0x1b9)] = _0x39a0e7(0x26f));
        break;
    case _0x39a0e7(0x1bb):
        const _0x1604ff = parseInt(scrapeContext[_0x39a0e7(0x19c)]['productSold'] || 0x0)[_0x39a0e7(0x26b)](_0x39a0e7(0x248));
        let _0x65b7c8;
        scrapeContext[_0x39a0e7(0x19c)][_0x39a0e7(0x15f)] ? _0x65b7c8 = _0x39a0e7(0x1b0) + scrapeContext[_0x39a0e7(0x19c)]['badgeUrl'] + _0x39a0e7(0x1a3) + scrapeContext[_0x39a0e7(0x19c)]['badgeText'] + '\x22\x20title=\x22' + scrapeContext[_0x39a0e7(0x19c)][_0x39a0e7(0x20a)] + '\x22\x20style=\x22height:\x2020px;\x20vertical-align:\x20middle;\x22><span>' + scrapeContext[_0x39a0e7(0x19c)]['name'] + '</span></h4>' : _0x65b7c8 = _0x39a0e7(0x15c) + scrapeContext[_0x39a0e7(0x19c)][_0x39a0e7(0x17f)] + _0x39a0e7(0x17e);
        infoPanel[_0x39a0e7(0x191)] = _0x39a0e7(0x1c9) + _0x65b7c8 + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<ul\x20style=\x22list-style:\x20none;\x20margin:\x200;\x20padding:\x200;\x20font-size:\x2013px;\x20color:\x20#555;\x20line-height:\x201.6;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<li><strong>Lokasi:</strong>\x20' + scrapeContext['info'][_0x39a0e7(0x164)] + '</li>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<li><strong>Produk\x20Aktif:</strong>\x20' + scrapeContext['info'][_0x39a0e7(0x1f5)]['toLocaleString'](_0x39a0e7(0x248)) + '</li>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<li><strong>Produk\x20Terjual:</strong>\x20' + _0x1604ff + _0x39a0e7(0x205) + scrapeContext[_0x39a0e7(0x19c)][_0x39a0e7(0x234)] + _0x39a0e7(0x1f4), scrapeButton['textContent'] = _0x39a0e7(0x181), statusArea[_0x39a0e7(0x1a1)] = _0x39a0e7(0x186), scrapeButton[_0x39a0e7(0x219)] = ![], infoPanel[_0x39a0e7(0x184)][_0x39a0e7(0x1b9)] = _0x39a0e7(0x26f), actionPanel[_0x39a0e7(0x184)]['display'] = _0x39a0e7(0x1a8);
        break;
    case _0x39a0e7(0x21c):
        infoPanel['innerHTML'] = _0x39a0e7(0x265) + scrapeContext[_0x39a0e7(0x20c)] + '</strong>\x22</div>', scrapeButton[_0x39a0e7(0x1a1)] = _0x39a0e7(0x1ac) + collectedSearchProducts[_0x39a0e7(0x250)] + ')\x20Produk\x20Terkumpul', statusArea['innerHTML'] = _0x39a0e7(0x239), scrapeButton[_0x39a0e7(0x219)] = collectedSearchProducts['length'] === 0x0, infoPanel[_0x39a0e7(0x184)]['display'] = 'block', actionPanel[_0x39a0e7(0x184)][_0x39a0e7(0x1b9)] = _0x39a0e7(0x1a8);
        break;
    default:
        infoPanel['innerHTML'] = _0x39a0e7(0x231), infoPanel[_0x39a0e7(0x184)]['display'] = _0x39a0e7(0x26f);
        break;
    }
}
function makeApiRequest(_0xa746f7, _0x51cc29, _0x317446 = {}) {
    return new Promise((_0x3db241, _0x1b1e8f) => {
        const _0x41eb68 = _0x3205;
        GM_xmlhttpRequest({
            'method': _0x41eb68(0x23b),
            'url': _0xa746f7,
            'headers': {
                'Content-Type': _0x41eb68(0x23d),
                ..._0x317446
            },
            'data': JSON['stringify'](_0x51cc29),
            'onload': function (_0x3f7b32) {
                const _0x47d6f9 = _0x41eb68;
                _0x3f7b32[_0x47d6f9(0x201)] >= 0xc8 && _0x3f7b32[_0x47d6f9(0x201)] < 0x12c ? _0x3db241(JSON['parse'](_0x3f7b32[_0x47d6f9(0x26a)])) : _0x1b1e8f({
                    'status': _0x3f7b32[_0x47d6f9(0x201)],
                    'statusText': _0x3f7b32[_0x47d6f9(0x17b)],
                    'body': _0x3f7b32['responseText']
                });
            },
            'onerror': function (_0x28a233) {
                _0x1b1e8f(_0x28a233);
            }
        });
    });
}
async function startScrape() {
    const _0x2773e7 = _0x28729b;
    if (isScraping)
        return;
    const _0x28d695 = currentScrapeMode;
    currentScrapeMode = _0x2773e7(0x1e9), updateUI();
    try {
        let _0x30c1f8;
        if (_0x28d695 === _0x2773e7(0x1bb))
            scrapeButton[_0x2773e7(0x1a1)] = _0x2773e7(0x198), _0x30c1f8 = await fetchAllShopProducts(scrapeContext['info']['shopID']);
        else
            _0x28d695 === _0x2773e7(0x21c) && (scrapeButton[_0x2773e7(0x1a1)] = _0x2773e7(0x19a), _0x30c1f8 = collectedSearchProducts);
        if (!_0x30c1f8 || _0x30c1f8[_0x2773e7(0x250)] === 0x0)
            throw new Error('Tidak\x20ada\x20produk\x20untuk\x20diproses.');
        scrapeButton[_0x2773e7(0x1a1)] = _0x2773e7(0x22f);
        const _0x4cd61f = await fetchProductsDetails(_0x30c1f8);
        statusArea[_0x2773e7(0x1a1)] = _0x2773e7(0x20b), lastScrapeResult = mergeProductData(_0x30c1f8, _0x4cd61f), currentScrapeMode = _0x2773e7(0x26e), updateUI();
    } catch (_0x59e3bf) {
        console[_0x2773e7(0x18a)]('Tokopedia\x20Scraper\x20Error:', _0x59e3bf), alert(_0x2773e7(0x189) + _0x59e3bf[_0x2773e7(0x1af)]), currentScrapeMode = _0x28d695, updateUI();
    }
}
function _0x3973() {
    const _0x46b8dd = [
        '</strong></p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20style=\x22font-size:13px;\x20margin:\x204px\x200;\x22>Aktif\x20hingga:\x20<strong>',
        'position:\x20fixed;\x20bottom:\x2020px;\x20left:\x2020px;\x20z-index:\x209999;\x20display:\x20flex;\x20flex-direction:\x20column;\x20width:\x20320px;\x20font-family:\x20Arial,\x20sans-serif;',
        'minimumFractionDigits',
        'Proses\x20selesai!\x20(',
        'shop_name',
        '</div>',
        'activeProduct',
        'fetch',
        'readyState',
        'open',
        '0\x204px\x208px\x20rgba(0,0,0,0.1)',
        'DOMContentLoaded',
        'isGoldBadge',
        'graphql/ShopInfoCore',
        'bold',
        'startsWith',
        '\x22\x20title=\x22',
        'success',
        'status',
        '21MPmygZ',
        'validate',
        'button',
        '</li>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</ul>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22font-size:\x2011px;\x20color:\x20#999;\x20margin-top:\x2010px;\x22>Shop\x20ID:\x20',
        '10px\x2015px',
        'URL_APPS_SCRIPT_ANDA_DISINI',
        'activation-container',
        '12px',
        'badgeText',
        'Menggabungkan\x20data...',
        'query',
        'Official\x20Store',
        'numeric',
        'Error\x20tidak\x20diketahui.',
        'forEach',
        '16805PxtPba',
        'number',
        'pointer',
        'column',
        'next',
        'ttsPID',
        '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h3\x20style=\x22margin-top:0;\x20color:#00AA5B;\x22>Aktivasi\x20Scraper\x20Tokopedia</h3>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20style=\x22font-size:13px;\x20color:#555;\x22>Silakan\x20masukkan\x20akun\x20Anda.</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20type=\x22text\x22\x20id=\x22act_username\x22\x20placeholder=\x22Username\x22\x20style=\x22width:\x2095%;\x20padding:\x208px;\x20margin-bottom:\x2010px;\x20border:\x201px\x20solid\x20#ddd;\x20border-radius:\x204px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20type=\x22password\x22\x20id=\x22act_password\x22\x20placeholder=\x22Password\x22\x20style=\x22width:\x2095%;\x20padding:\x208px;\x20margin-bottom:\x2015px;\x20border:\x201px\x20solid\x20#ddd;\x20border-radius:\x204px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22act_btn_login\x22\x20style=\x22width:\x20100%;\x20padding:\x2010px;\x20background-color:\x20#007bff;\x20color:\x20white;\x20border:\x20none;\x20border-radius:\x204px;\x20cursor:\x20pointer;\x22>Aktivasi</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20id=\x22act_status\x22\x20style=\x22margin-top:\x2015px;\x20font-size:\x2013px;\x20color:\x20red;\x22></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20',
        'N/A',
        'disabled',
        'product_id_key',
        'account-details-content',
        'search_collecting',
        'trim',
        'act_btn_logout',
        'join',
        'padding:\x2012px\x2015px;\x20border-bottom:\x201px\x20solid\x20#eee;',
        'countReview',
        'filter',
        '#007bff',
        '4ACvcwX',
        'div',
        'Produk\x20Scraped',
        '1px\x20solid\x20#eee',
        'scraper-main-container',
        'reload',
        '15px',
        'Format\x20URL\x20tidak\x20valid\x20untuk\x20parsing',
        'GetShopProduct',
        'remove',
        '1417456GnacoW',
        'Fase\x202:\x20Mengambil\x20Detail...',
        'tokopedia_scrape_',
        '<div\x20style=\x22padding:\x2010px;\x20text-align:\x20center;\x20color:\x20#888;\x22>Navigasi\x20ke\x20halaman\x20toko\x20atau\x20pencarian\x20untuk\x20memulai.</div>',
        '300px',
        'goldmerchant',
        'shopID',
        'scraper-action-panel',
        '.xlsx',
        'toggle-account-info',
        '1px\x20solid\x20#ccc',
        '<strong>Scroll\x20ke\x20bawah</strong>\x20untuk\x20mengumpulkan\x20lebih\x20banyak\x20produk.',
        'isArray',
        'POST',
        'act_password',
        'application/json',
        '<th>',
        'shopCore',
        'addEventListener',
        '8px',
        'shopStats',
        'username',
        'expiry_date',
        '18px',
        '</ul>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22act_btn_logout\x22\x20style=\x22width:\x20100%;\x20padding:\x206px;\x20background-color:\x20#dc3545;\x20color:\x20white;\x20border:\x20none;\x20border-radius:\x204px;\x20cursor:\x20pointer;\x20margin-top:\x2015px;\x20font-size:\x2013px;\x22>Logout\x20dari\x20Browser\x20Ini</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20',
        'resolve',
        'id-ID',
        'official_store_badge',
        'Scraper:\x20Gagal\x20proses\x20ShopInfoCore',
        'pdpGetLayout',
        'click',
        'query\x20ShopProducts($sid:\x20String!,\x20$page:\x20Int,\x20$perPage:\x20Int,\x20$sort:\x20Int)\x20{\x20GetShopProduct(shopID:\x20$sid,\x20filter:\x20{page:\x20$page,\x20perPage:\x20$perPage,\x20sort:\x20$sort})\x20{\x20links\x20{\x20next\x20}\x20data\x20{\x20name\x20product_url\x20product_id\x20price\x20{\x20text_idr\x20}\x20}\x20}\x20}',
        'then',
        'https://gql.tokopedia.com/graphql/PDPGetLayoutQuery',
        'length',
        'keys',
        'add',
        'expanded',
        'Sesi\x20berakhir:\x20',
        'Mengambil\x20detail...\x20(',
        '</tr></thead><tbody>',
        'getElementById',
        '1043874Dcfbia',
        '(Browser\x20ini)',
        '20vGZVKW',
        '\x22\x20target=\x22_blank\x22\x20rel=\x22noopener\x20noreferrer\x22>Link</a>',
        'productSold',
        '#00AA5B',
        '1950888wkedRM',
        'value',
        'body',
        '17193935IMxrRv',
        ',\x20Total:\x20',
        'ShopProducts',
        'logout',
        '<h4\x20style=\x22margin:\x200\x200\x2010px\x200;\x20color:\x20#333;\x22>Mode\x20Pencarian</h4><div\x20style=\x22font-size:\x2013px;\x20color:\x20#555;\x22>Keyword:\x20\x22<strong>',
        '/search',
        '12fTSPof',
        'close',
        'shopName',
        'responseText',
        'toLocaleString',
        'replace',
        'Memverifikasi...',
        'finished',
        'block',
        '16px',
        '</th>',
        '<!DOCTYPE\x20html><html\x20lang=\x22id\x22><head><meta\x20charset=\x22UTF-8\x22><title>',
        'act_status',
        'URL\x20API\x20belum\x20dikonfigurasi\x20pada\x20skrip.',
        'priceFmt',
        'Product\x20URL',
        'createElement',
        'stats',
        'Request\x20Failed',
        '<li\x20style=\x22font-size:11px;\x20color:',
        'countSold',
        'deviceId',
        'maximumFractionDigits',
        '<h4\x20style=\x22margin:\x200\x200\x2010px\x200;\x20color:\x20#333;\x22>',
        'Terjadi\x20kesalahan.',
        'activated',
        'badgeUrl',
        'none',
        'Product\x20Name',
        'Price\x20Slashed',
        'product_id',
        'location',
        'login',
        'start-scrape-btn',
        '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20style=\x22font-size:13px;\x20margin:\x204px\x200;\x22>Username:\x20<strong>',
        'warn',
        'toLocaleDateString',
        'push',
        '10px',
        'Gagal\x20terhubung\x20ke\x20server\x20aktivasi.',
        'Tokopedia\x20Scraper\x20Pro',
        'Gagal\x20validasi\x20sesi,\x20mengizinkan\x20penggunaan\x20offline.',
        'background-color:\x20#fff;\x20border:\x201px\x20solid\x20#ddd;\x20border-radius:\x208px;\x20box-shadow:\x200\x204px\x2012px\x20rgba(0,0,0,0.15);',
        '</tr>',
        'components',
        'https://script.google.com/macros/s/AKfycbzRR8AL1fK1z3gPfSFDOumDLYcKNbufDw5fMjGjO7EFJPIH1f6rTKK2o6zGvvc4f_3T/exec',
        'createdAt',
        '<td\x20',
        '0.6',
        'details',
        '</td>',
        'toString',
        'isOfficial',
        'badge_url',
        'statusText',
        'Gagal\x20memproses\x20respon\x20API.',
        'Download\x20Excel\x20Langsung',
        '</h4>',
        'name',
        'devices',
        'Mulai\x20Scrape\x20Toko\x20Ini',
        'badge',
        'complete',
        'style',
        '5px',
        'Siap\x20untuk\x20scrape\x20seluruh\x20toko.',
        'catch',
        'map',
        'Terjadi\x20kesalahan\x20saat\x20scraping:\x20',
        'error',
        '<a\x20href=\x22',
        'Gagal\x20membuka\x20tab\x20baru.\x20Mohon\x20izinkan\x20pop-up\x20untuk\x20situs\x20ini.',
        'URL\x20produk\x20tidak\x20valid\x20atau\x20hilang.',
        'goldOS',
        'product_url',
        'has',
        'innerHTML',
        'Rating',
        'Gagal\x20mengambil\x20halaman\x20',
        'type',
        '\x20produk)',
        'get',
        'clone',
        'Fase\x201:\x20Mengambil\x20Daftar\x20Toko...',
        'utils',
        'Fase\x201:\x20Menggunakan\x20Produk\x20Terkumpul...',
        'substr',
        'info',
        'Scraper:\x20Gagal\x20proses\x20SearchProductV5Query',
        'Reguler',
        'cssText',
        'SKU',
        'textContent',
        'url',
        '\x22\x20alt=\x22',
        'writeFile',
        '[\x20+\x20]',
        '</tbody></table></div></div></body></html>',
        'Power\x20Merchant',
        'flex',
        '12px\x2015px',
        'style=\x22text-align:\x20right;\x22',
        'Mengambil\x20daftar\x20toko...\x20(Halaman\x20',
        'Proses\x20Detail\x20(',
        '</style></head><body><div\x20class=\x22container\x22><h1>',
        'PDPGetLayoutQuery',
        'message',
        '<h4\x20style=\x22margin:\x200\x200\x2010px\x200;\x20color:\x20#333;\x20display:\x20flex;\x20align-items:\x20center;\x20gap:\x208px;\x22><img\x20src=\x22',
        'tokopedia_scraper_ui_state',
        '#28a745',
        'search',
        '#666',
        'json_to_sheet',
        'txStats',
        'device_',
        'display:\x20flex;\x20justify-content:\x20space-between;\x20align-items:\x20center;\x20margin-bottom:\x2010px;',
        'display',
        'body{font-family:-apple-system,BlinkMacSystemFont,\x22Segoe\x20UI\x22,Roboto,Helvetica,Arial,sans-serif;margin:0;background-color:#f4f4f4;color:#333}.container{max-width:95%;margin:20px\x20auto;padding:20px;background-color:#fff;box-shadow:0\x202px\x2010px\x20rgba(0,0,0,.1);border-radius:8px}h1{color:#00AA5B}.table-container{max-height:85vh;overflow:auto;border:1px\x20solid\x20#ddd}table{width:100%;border-collapse:collapse}th,td{padding:8px\x2012px;border:1px\x20solid\x20#ddd;text-align:left;vertical-align:top;white-space:nowrap}thead\x20th{position:sticky;top:0;background-color:#f2f2f2;font-weight:700;cursor:pointer;user-select:none}thead\x20th:hover{background-color:#e9e9e9}td.wrap-text{white-space:normal;min-width:250px;}span.sort-indicator{color:#333;font-size:0.9em;padding-left:5px;}',
        'store',
        'pathname',
        '879753JuhySc',
        'includes',
        'Hasil\x20Scrape\x20-\x20',
        'string',
        'parse',
        '</li>',
        'assign',
        'Fetch\x20Error',
        '273978XBQEdp',
        'act_btn_login',
        'slice',
        'Arial',
        '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20',
        'badge_url_internal',
        'act_username',
        'stringify',
        'searchProductV5',
        '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20query\x20PDPGetLayoutQuery($shopDomain:\x20String,\x20$productKey:\x20String,\x20$layoutID:\x20String,\x20$apiVersion:\x20Float)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20pdpGetLayout(shopDomain:\x20$shopDomain,\x20productKey:\x20$productKey,\x20layoutID:\x20$layoutID,\x20apiVersion:\x20$apiVersion)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20basicInfo\x20{\x20id:\x20productID\x20shopID\x20shopName\x20ttsPID\x20txStats\x20{\x20countSold\x20}\x20stats\x20{\x20countReview\x20rating\x20}\x20createdAt\x20status\x20url\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20components\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20name\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20type\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20data\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20...\x20on\x20pdpDataProductContent\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20price\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20priceFmt\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20slashPriceFmt\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20discPercentage\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20',
        '\x22\x20style=\x22width:16px;\x20height:16px;\x20vertical-align:middle;\x20margin-right:\x205px;\x22>',
        'now',
        'split',
        'product:\x20not\x20found',
        'Username\x20dan\x20password\x20tidak\x20boleh\x20kosong.',
        'Power\x20Shop',
        'price',
        'result',
        'appendChild',
        'http',
        '20px',
        '<img\x20src=\x22',
        'Gagal\x20memproses\x20URL:\x20',
        'rating',
        '978GZjVwa',
        'Shop\x20Badge',
        'document',
        'opacity',
        '[\x20-\x20]',
        'apply',
        'script',
        'scraper-info-panel',
        'book_append_sheet',
        'default_v3',
        'long',
        'white',
        'scraping',
        'random',
        'data',
        'errors',
        '<h4\x20style=\x22margin:0;\x20color:#0056b3;\x20font-size:\x2015px;\x22>Info\x20Akun</h4><span\x20id=\x22toggle-account-info\x22\x20style=\x22cursor:\x20pointer;\x20font-weight:\x20bold;\x20padding:\x200\x205px;\x20font-size:\x2018px;\x20color:\x20#0056b3;\x22>[\x20-\x20]</span>',
        '</strong></p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20style=\x22font-size:12px;\x20margin:\x2010px\x200\x205px\x200;\x22>Perangkat\x20Terdaftar:</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<ul\x20style=\x22margin:0;\x20padding-left:\x2020px;\x20font-size:\x2012px;\x22>'
    ];
    _0x3973 = function () {
        return _0x46b8dd;
    };
    return _0x3973();
}
async function fetchAllShopProducts(_0x1e2696) {
    const _0x1efe7c = _0x28729b;
    let _0x5437e6 = [], _0x25c5f1 = 0x1, _0x48502f = !![];
    const _0x5c4b2c = {
        'x-source': 'tokopedia-lite',
        'x-device': _0x1efe7c(0x1e6)
    };
    while (_0x48502f) {
        statusArea[_0x1efe7c(0x1a1)] = _0x1efe7c(0x1ab) + _0x25c5f1 + _0x1efe7c(0x262) + _0x5437e6['length'] + ')';
        const _0x15820f = [{
                'operationName': _0x1efe7c(0x263),
                'variables': {
                    'sid': _0x1e2696,
                    'page': _0x25c5f1,
                    'perPage': 0x50,
                    'sort': 0x8
                },
                'query': _0x1efe7c(0x24d)
            }];
        try {
            const _0x470c07 = (await makeApiRequest('https://gql.tokopedia.com/graphql/ShopProducts', _0x15820f, _0x5c4b2c))[0x0];
            if (_0x470c07[_0x1efe7c(0x1ec)])
                throw new Error(JSON[_0x1efe7c(0x1cc)](_0x470c07[_0x1efe7c(0x1ec)]));
            const _0x33df74 = _0x470c07[_0x1efe7c(0x1eb)][_0x1efe7c(0x22c)], _0x1071e1 = _0x33df74['data'] || [];
            if (_0x1071e1[_0x1efe7c(0x250)] > 0x0)
                _0x5437e6['push'](..._0x1071e1);
            _0x48502f = !!_0x33df74['links'][_0x1efe7c(0x215)] && _0x1071e1[_0x1efe7c(0x250)] > 0x0, _0x25c5f1++, await new Promise(_0x3c251d => setTimeout(_0x3c251d, 0x12c));
        } catch (_0x86ab8e) {
            console[_0x1efe7c(0x18a)](_0x1efe7c(0x193) + _0x25c5f1 + ':', _0x86ab8e), _0x48502f = ![];
        }
    }
    return _0x5437e6;
}
async function fetchProductsDetails(_0x343923) {
    const _0xcd567a = _0x28729b;
    let _0x22fc2d = [];
    for (let _0x2cef5e = 0x0; _0x2cef5e < _0x343923[_0xcd567a(0x250)]; _0x2cef5e += CONCURRENT_REQUESTS) {
        const _0x19fcff = _0x343923[_0xcd567a(0x1c7)](_0x2cef5e, _0x2cef5e + CONCURRENT_REQUESTS);
        statusArea[_0xcd567a(0x1a1)] = _0xcd567a(0x255) + (_0x2cef5e + _0x19fcff['length']) + '/' + _0x343923[_0xcd567a(0x250)] + ')';
        const _0x27b254 = _0x19fcff['map'](_0x24b81b => {
                const _0x1a7543 = _0xcd567a;
                try {
                    if (!_0x24b81b[_0x1a7543(0x18f)])
                        return Promise[_0x1a7543(0x247)]({
                            'product_id_key': _0x24b81b[_0x1a7543(0x163)],
                            'error': _0x1a7543(0x18d)
                        });
                    const _0x5840f2 = new URL(_0x24b81b[_0x1a7543(0x18f)]), _0x23e0d3 = _0x5840f2[_0x1a7543(0x1bc)][_0x1a7543(0x26c)](/^\/|\/$/g, '')[_0x1a7543(0x1d1)]('/'), _0x39a19d = _0x23e0d3[0x0], _0x2a24ba = _0x23e0d3[_0x23e0d3[_0x1a7543(0x250)] - 0x1];
                    if (!_0x39a19d || !_0x2a24ba)
                        throw new Error(_0x1a7543(0x22b));
                    const _0x46148f = [{
                                'operationName': _0x1a7543(0x1ae),
                                'variables': {
                                    'shopDomain': _0x39a19d,
                                    'productKey': _0x2a24ba,
                                    'layoutID': '',
                                    'apiVersion': 0x1
                                },
                                'query': _0x1a7543(0x1ce)
                            }], _0x26f17b = {
                            'x-tkpd-akamai': _0x1a7543(0x24b),
                            'Origin': 'https://www.tokopedia.com',
                            'Referer': _0x24b81b['product_url']
                        };
                    return makeApiRequest(_0x1a7543(0x24f), _0x46148f, _0x26f17b)[_0x1a7543(0x24e)](_0x11dd64 => ({
                        'product_id_key': _0x24b81b[_0x1a7543(0x163)],
                        'details': _0x11dd64[0x0]?.[_0x1a7543(0x1eb)]?.[_0x1a7543(0x24b)],
                        'error': _0x11dd64[0x0]?.[_0x1a7543(0x1ec)] || null
                    }))[_0x1a7543(0x187)](_0x422085 => ({
                        'product_id_key': _0x24b81b[_0x1a7543(0x163)],
                        'error': _0x1a7543(0x157)
                    }));
                } catch (_0x100202) {
                    return console[_0x1a7543(0x18a)](_0x1a7543(0x1db) + _0x24b81b[_0x1a7543(0x18f)], _0x100202), Promise['resolve']({
                        'product_id_key': _0x24b81b[_0x1a7543(0x163)],
                        'error': 'URL\x20Parsing\x20Failed:\x20' + _0x100202['message']
                    });
                }
            }), _0x558f88 = await Promise['all'](_0x27b254);
        _0x22fc2d[_0xcd567a(0x16a)](..._0x558f88);
    }
    return _0x22fc2d;
}
function mergeProductData(_0x2a6b3d, _0x22fe1e) {
    const _0x9de7dc = _0x28729b, _0x38757d = new Map(_0x22fe1e[_0x9de7dc(0x188)](_0x2429e7 => [
            _0x2429e7[_0x9de7dc(0x21a)],
            _0x2429e7
        ]));
    return _0x2a6b3d[_0x9de7dc(0x188)](_0x3e895e => {
        const _0xdf129f = _0x9de7dc, _0x2fe8c4 = _0x38757d[_0xdf129f(0x196)](_0x3e895e[_0xdf129f(0x163)]), _0x4c6f11 = _0x2fe8c4?.[_0xdf129f(0x176)] || {}, _0x167a3a = _0x4c6f11['basicInfo'] || {}, _0x3dde6e = _0x3e895e[_0xdf129f(0x1d5)]['text_idr'] || '0', _0x2d07f0 = parseInt(_0x3dde6e['replace'](/Rp|\./g, ''), 0xa) || 0x0, _0x119de2 = parseInt(_0x167a3a[_0xdf129f(0x1b6)]?.[_0xdf129f(0x159)], 0xa) || 0x0, _0x34c7e5 = parseInt(_0x167a3a['stats']?.[_0xdf129f(0x221)], 0xa) || 0x0, _0xe60ec7 = _0x167a3a[_0xdf129f(0x278)]?.[_0xdf129f(0x1dc)] ?? 0x0;
        let _0x443cd4 = _0xdf129f(0x19e), _0x14eba3 = '';
        if (_0x3e895e[_0xdf129f(0x17a)]) {
            _0x14eba3 = _0x3e895e[_0xdf129f(0x17a)];
            if (_0x14eba3[_0xdf129f(0x1be)](_0xdf129f(0x249)))
                _0x443cd4 = 'Mall';
            else
                _0x14eba3['includes'](_0xdf129f(0x233)) && (_0x443cd4 = _0xdf129f(0x1d4));
        } else {
            if (scrapeContext['type'] === _0xdf129f(0x1bb)) {
                _0x443cd4 = scrapeContext['info'][_0xdf129f(0x20a)] || _0xdf129f(0x218);
                if (_0x443cd4 === _0xdf129f(0x20d))
                    _0x443cd4 = 'Mall';
                if (_0x443cd4 === _0xdf129f(0x1a7))
                    _0x443cd4 = _0xdf129f(0x1d4);
                _0x14eba3 = scrapeContext[_0xdf129f(0x19c)][_0xdf129f(0x15f)] || '';
            }
        }
        let _0x1076fa = _0xdf129f(0x218), _0x4c4e8b = _0xdf129f(0x218), _0x2e426f = _0xdf129f(0x218);
        if (_0x4c6f11[_0xdf129f(0x171)] && Array['isArray'](_0x4c6f11['components'])) {
            const _0x33f1ce = _0x4c6f11[_0xdf129f(0x171)]['find'](_0x17de69 => _0x17de69['name'] === 'product_content');
            if (_0x33f1ce && _0x33f1ce[_0xdf129f(0x1eb)] && _0x33f1ce[_0xdf129f(0x1eb)][0x0] && _0x33f1ce[_0xdf129f(0x1eb)][0x0]['price']) {
                const _0x4151e9 = _0x33f1ce[_0xdf129f(0x1eb)][0x0][_0xdf129f(0x1d5)];
                _0x1076fa = _0x4151e9[_0xdf129f(0x275)] || '0', _0x4c4e8b = _0x4151e9['slashPriceFmt'] || '0', _0x2e426f = _0x4151e9['discPercentage'] || '0';
            }
        }
        let _0xb0f7b = '';
        if (_0x2fe8c4?.[_0xdf129f(0x18a)]) {
            const _0x44aa4c = JSON[_0xdf129f(0x1cc)](_0x2fe8c4[_0xdf129f(0x18a)]);
            _0x44aa4c['includes'](_0xdf129f(0x1d2)) ? _0xb0f7b = 'Product\x20Not\x20Found' : _0xb0f7b = _0x44aa4c;
        }
        return {
            'Shop\x20ID': _0x167a3a[_0xdf129f(0x234)] ?? (scrapeContext[_0xdf129f(0x194)] === _0xdf129f(0x1bb) ? scrapeContext['info']['shopID'] : _0xdf129f(0x218)),
            'Shop\x20Badge': _0x443cd4,
            'Shop\x20Name': _0x167a3a[_0xdf129f(0x269)] ?? _0x3e895e[_0xdf129f(0x1f3)] ?? (scrapeContext['type'] === _0xdf129f(0x1bb) ? scrapeContext[_0xdf129f(0x19c)][_0xdf129f(0x17f)] : _0xdf129f(0x218)),
            'Product\x20ID': _0x3e895e['product_id'],
            'SKU': _0x167a3a[_0xdf129f(0x216)] ?? _0xdf129f(0x218),
            'Product\x20Name': _0x3e895e[_0xdf129f(0x17f)],
            'Price\x20Final': _0x1076fa,
            'Price\x20Slashed': _0x4c4e8b,
            'Discount': _0x2e426f,
            'Sold': _0x119de2,
            'Review\x20Count': _0x34c7e5,
            'Rating': _0xe60ec7,
            'Product\x20URL': _0x3e895e[_0xdf129f(0x18f)],
            'Created\x20At': _0x167a3a[_0xdf129f(0x173)] ?? _0xdf129f(0x218),
            'Status': _0x167a3a[_0xdf129f(0x201)] ?? _0xdf129f(0x218),
            'Fetch\x20Error': _0xb0f7b,
            'badge_url_internal': _0x14eba3
        };
    });
}
function _0x3205(_0x7c9d8f, _0x54c273) {
    const _0x397314 = _0x3973();
    return _0x3205 = function (_0x32051f, _0x805310) {
        _0x32051f = _0x32051f - 0x157;
        let _0x2faeb7 = _0x397314[_0x32051f];
        return _0x2faeb7;
    }, _0x3205(_0x7c9d8f, _0x54c273);
}
function handleShowResults() {
    const _0x27164b = _0x28729b;
    if (!lastScrapeResult) {
        alert('Tidak\x20ada\x20data\x20untuk\x20ditampilkan.');
        return;
    }
    const _0x837a86 = window[_0x27164b(0x1f8)]();
    if (!_0x837a86) {
        alert(_0x27164b(0x18c));
        return;
    }
    const _0x58c4f6 = _0x27164b(0x1bf) + (scrapeContext[_0x27164b(0x194)] === 'store' ? scrapeContext[_0x27164b(0x19c)][_0x27164b(0x17f)] : 'Pencarian\x20\x22' + scrapeContext[_0x27164b(0x20c)] + '\x22'), _0x1307ec = Object[_0x27164b(0x251)](lastScrapeResult[0x0])[_0x27164b(0x222)](_0x591ee9 => _0x591ee9 !== _0x27164b(0x1de) && _0x591ee9 !== _0x27164b(0x1ca)), _0x1ca173 = _0x1307ec[_0x27164b(0x188)](_0x5d02dd => _0x27164b(0x23e) + _0x5d02dd + _0x27164b(0x271))['join'](''), _0x194184 = lastScrapeResult[_0x27164b(0x188)](_0x59044c => {
            const _0x1d9901 = _0x27164b, _0x928499 = _0x1307ec[_0x1d9901(0x188)](_0x23d1bd => {
                    const _0x24da97 = _0x1d9901, _0x11dd3b = _0x59044c[_0x23d1bd];
                    let _0x414b9b;
                    const _0x1968c1 = _0x23d1bd === 'Price\x20Final' || _0x23d1bd === _0x24da97(0x162);
                    let _0x35637f = _0x1968c1 ? _0x24da97(0x1aa) : '';
                    if (_0x23d1bd === _0x24da97(0x276) && String(_0x11dd3b)[_0x24da97(0x1fe)](_0x24da97(0x1d8)))
                        _0x414b9b = _0x24da97(0x18b) + _0x11dd3b + _0x24da97(0x25b);
                    else {
                        if (_0x23d1bd === 'Shop\x20Name' && _0x59044c[_0x24da97(0x1ca)])
                            _0x414b9b = _0x24da97(0x1da) + _0x59044c[_0x24da97(0x1ca)] + _0x24da97(0x1a3) + _0x59044c[_0x24da97(0x1de)] + _0x24da97(0x1ff) + _0x59044c[_0x24da97(0x1de)] + _0x24da97(0x1cf) + _0x11dd3b;
                        else {
                            if (typeof _0x11dd3b === _0x24da97(0x212)) {
                                const _0x4ae1dd = {
                                    'minimumFractionDigits': 0x0,
                                    'maximumFractionDigits': 0x1
                                };
                                _0x23d1bd !== _0x24da97(0x192) && (_0x4ae1dd[_0x24da97(0x1f1)] = 0x0, _0x4ae1dd[_0x24da97(0x15b)] = 0x0), _0x414b9b = _0x11dd3b['toLocaleString'](_0x24da97(0x248), _0x4ae1dd), _0x35637f = _0x24da97(0x1aa);
                            } else
                                _0x414b9b = String(_0x11dd3b ?? '')[_0x24da97(0x26c)](/&/g, '&')[_0x24da97(0x26c)](/</g, '<')['replace'](/>/g, '>')[_0x24da97(0x26c)](/"/g, '\x22');
                        }
                    }
                    const _0x4df7d9 = _0x23d1bd === _0x24da97(0x161) || _0x23d1bd === _0x24da97(0x1a0) || _0x23d1bd === _0x24da97(0x1c4) ? 'class=\x22wrap-text\x22' : '';
                    return _0x24da97(0x174) + _0x4df7d9 + '\x20' + _0x35637f + '>' + _0x414b9b + _0x24da97(0x177);
                })[_0x1d9901(0x21f)]('');
            return '<tr>' + _0x928499 + _0x1d9901(0x170);
        })[_0x27164b(0x21f)](''), _0x38f2e0 = _0x27164b(0x1ba), _0x2686ed = _0x27164b(0x272) + _0x58c4f6 + '</title><style>' + _0x38f2e0 + _0x27164b(0x1ad) + _0x58c4f6 + '</h1><h3>Total\x20Produk:\x20' + lastScrapeResult[_0x27164b(0x250)][_0x27164b(0x26b)](_0x27164b(0x248)) + '</h3><div\x20class=\x22table-container\x22><table\x20id=\x22resultTable\x22><thead><tr>' + _0x1ca173 + _0x27164b(0x256) + _0x194184 + _0x27164b(0x1a6);
    _0x837a86['document']['open'](), _0x837a86[_0x27164b(0x1df)]['write'](_0x2686ed);
    const _0x29df15 = 'function\x20makeTableSortable(tableId){const\x20table=document.getElementById(tableId);if(!table)return;const\x20headers=table.querySelectorAll(\x27thead\x20th\x27);let\x20sortDirections=Array.from(headers).map(()=>null);function\x20parseIndonesianNumber(text){const\x20parsableText=String(text).replace(/Rp|\x5c./g,\x27\x27).replace(\x27,\x27,\x27.\x27);return\x20parseFloat(parsableText)}headers.forEach((header,index)=>{header.addEventListener(\x27click\x27,()=>{const\x20tbody=table.querySelector(\x27tbody\x27);const\x20rows=Array.from(tbody.rows);const\x20currentDir=sortDirections[index];const\x20newDir=currentDir===\x27asc\x27?\x27desc\x27:\x27asc\x27;sortDirections.fill(null);headers.forEach(h=>h.querySelector(\x27span.sort-indicator\x27)?.remove());sortDirections[index]=newDir;const\x20indicator=document.createElement(\x27span\x27);indicator.className=\x27sort-indicator\x27;indicator.textContent=newDir===\x27asc\x27?\x27\x20▲\x27:\x27\x20▼\x27;header.appendChild(indicator);rows.sort((a,b)=>{const\x20cellA=a.cells[index].innerText.trim();const\x20cellB=b.cells[index].innerText.trim();const\x20numA=parseIndonesianNumber(cellA);const\x20numB=parseIndonesianNumber(cellB);let\x20comparison=0;if(!isNaN(numA)&&!isNaN(numB)){comparison=numA-numB}else{comparison=cellA.localeCompare(cellB,\x27id-ID\x27,{numeric:true,sensitivity:\x27base\x27})}return\x20newDir===\x27asc\x27?comparison:-comparison});tbody.append(...rows)})})};makeTableSortable(\x27resultTable\x27);', _0x4611ce = _0x837a86[_0x27164b(0x1df)][_0x27164b(0x277)](_0x27164b(0x1e3));
    _0x4611ce[_0x27164b(0x1a1)] = _0x29df15, _0x837a86[_0x27164b(0x1df)][_0x27164b(0x260)][_0x27164b(0x1d7)](_0x4611ce), _0x837a86[_0x27164b(0x1df)][_0x27164b(0x268)]();
}
function handleDownloadExcel() {
    const _0x560f5f = _0x28729b;
    if (!lastScrapeResult) {
        alert('Tidak\x20ada\x20data\x20untuk\x20diunduh.');
        return;
    }
    const _0x12aa87 = lastScrapeResult['map'](_0x28184a => {
            const _0x1ad494 = { ..._0x28184a };
            return delete _0x1ad494['badge_url_internal'], _0x1ad494;
        }), _0x367496 = XLSX[_0x560f5f(0x199)][_0x560f5f(0x1b5)](_0x12aa87), _0x4188b2 = XLSX[_0x560f5f(0x199)]['book_new']();
    XLSX[_0x560f5f(0x199)][_0x560f5f(0x1e5)](_0x4188b2, _0x367496, _0x560f5f(0x226));
    const _0x26c883 = scrapeContext[_0x560f5f(0x194)] === _0x560f5f(0x1bb) ? scrapeContext[_0x560f5f(0x19c)]['name'] : scrapeContext[_0x560f5f(0x20c)], _0x2d5c34 = _0x26c883[_0x560f5f(0x26c)](/[^a-zA-Z0-9]/g, '_');
    XLSX[_0x560f5f(0x1a4)](_0x4188b2, _0x560f5f(0x230) + _0x2d5c34 + _0x560f5f(0x236));
}
function initScraperLogic() {
    const _0x1ebc9f = _0x28729b, _0x14868f = window[_0x1ebc9f(0x164)]['pathname'];
    if (!_0x14868f[_0x1ebc9f(0x1fe)](_0x1ebc9f(0x266))) {
    }
    updateUI();
}
document[_0x28729b(0x1f7)] === _0x28729b(0x183) || document[_0x28729b(0x1f7)] === 'interactive' ? initialize() : window[_0x28729b(0x240)](_0x28729b(0x1fa), initialize);

})();
