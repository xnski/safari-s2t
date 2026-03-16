// ==UserScript==
// @name         智能簡轉繁 (精準判定版)
// @namespace    http://tampermonkey.net/
// @version      11.0
// @description  初始顯示，下滑隱藏，上拉即現，修正下滑停頓顯示問題
// @author       Gemini
// @match        *://*/*
// @require      https://cdn.jsdelivr.net/npm/opencc-js@1.0.5/dist/umd/full.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    // 1. 簡體偵測：不符合則完全不執行
    const isSimplified = () => {
        if (document.documentElement.lang.toLowerCase().includes('zh-c')) return true;
        const bodyText = document.body.innerText.slice(0, 1000);
        return /[国这为体进应后发门无]/.test(bodyText);
    };
    if (!isSimplified()) return;

    // 2. 建立 UI 按鈕
    const btn = document.createElement('div');
    btn.innerHTML = '繁';
    Object.assign(btn.style, {
        position: 'fixed',
        bottom: '50px',
        right: '20px',
        width: '46px',
        height: '46px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        borderRadius: '50%',
        textAlign: 'center',
        lineHeight: '46px',
        fontSize: '17px',
        zIndex: '2147483647',
        backdropFilter: 'blur(4px)',
        webkitBackdropFilter: 'blur(4px)',
        transition: 'opacity 0.15s ease', 
        opacity: '0.5', // 初始載入顯示
        pointerEvents: 'auto'
    });
    document.body.appendChild(btn);

    // 3. 捲動行為控制 (引入方向記憶)
    let lastScrollY = window.scrollY;
    let scrollTimer = null;
    let lastDirection = 'up'; // 預設為 up 確保初始或置頂時顯示

    const showBtn = () => {
        btn.style.opacity = '0.5';
        btn.style.pointerEvents = 'auto';
    };

    const hideBtn = () => {
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';
    };

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;

        // 只有位移超過 5px 才判定方向變動，過濾手指細微顫抖
        if (Math.abs(delta) > 5) {
            if (delta > 0 && currentScrollY > 50) {
                // 往下滑：隱形並紀錄方向
                lastDirection = 'down';
                hideBtn();
            } else if (delta < 0) {
                // 往上拉：即現並紀錄方向
                lastDirection = 'up';
                showBtn();
            }
        }

        lastScrollY = currentScrollY;

        // 處理停止後的邏輯確保
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            // 只有最後動作是「向上」或回到「頁面頂端」時才在停下後顯示
            if (lastDirection === 'up' || window.scrollY <= 10) {
                showBtn();
            } else {
                // 如果最後是往下滑動後停住，維持隱藏
                hideBtn();
            }
        }, 150); 
    }, { passive: true });

    // 4. 轉換核心邏輯
    let hasConverted = false;
    function doConvert() {
        if (typeof OpenCC === 'undefined') return;
        const converter = OpenCC.Converter({ from: 'cn', to: 'twp' });
        
        const walk = (node) => {
            if (node.nodeType === 3) {
                const res = converter(node.nodeValue);
                if (node.nodeValue !== res) node.nodeValue = res;
            } else if (node.nodeType === 1) {
                const tag = node.tagName.toUpperCase();
                if (!['SCRIPT','STYLE','TEXTAREA','INPUT','CODE','PRE'].includes(tag)) {
                    node.childNodes.forEach(walk);
                }
            }
        };
        
        walk(document.body);

        // 點擊後開啟監控新內容
        const observer = new MutationObserver(mutations => {
            mutations.forEach(m => m.addedNodes.forEach(walk));
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // 5. 點擊互動
    btn.onclick = (e) => {
        e.stopPropagation();
        if (!hasConverted) {
            btn.style.backgroundColor = '#28a745'; 
            btn.style.opacity = '0.8'; 
            btn.innerHTML = '✓';
            doConvert();
            hasConverted = true;
        } else {
            if (confirm('是否要重新整理網頁還原為簡體？')) {
                location.reload();
            }
        }
    };

})();
