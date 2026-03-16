# 智能沈浸式簡轉繁 Safari 腳本

> 專為 Safari 優化的 Userscript，智能偵測簡體中文並提供沈浸式一鍵繁體轉換體驗。

---

## ✨ 特色功能

**智能偵測**
僅在偵測到網頁為簡體中文時才顯示按鈕，繁體或英文網站完全不介入。

**沈浸式 UI**
- 進入網頁即顯示
- 向下捲動閱讀時自動隱藏，不擋視線
- 輕微向上撥動，按鈕立即浮現，隨點即轉

**手動觸發**
只有你點擊按鈕時才執行轉換，省電且不干擾正常瀏覽。

---

## 🛠️ 安裝教學

### 前置需求

- **Safari**（macOS / iOS / iPadOS）
- **[Userscripts](https://apps.apple.com/app/userscripts/id1463298887)** 擴充功能（直接點擊連結 App Store 免費下載）
- 前往「設定」→ Safari → 延伸功能 → 開啟 Userscripts 並將權限「其他網站」設為「允許」
### 安裝步驟

在 Safari 中直接開啟以下連結，Userscripts 會自動提示安裝：

```
https://raw.githubusercontent.com/xnski/safari-s2t/main/cn2tw.user.js
```

> 若未自動彈出安裝介面，可手動將 `cn2tw.user.js` 存入 Userscripts 設定的指定資料夾。

### 使用方式

1. 開啟任何簡體中文網頁，右下角會出現半透明「繁」字按鈕
2. 點擊按鈕，網頁文字即轉換為繁體中文（台灣正體）
3. 若需還原，點擊已變成 ✓ 的按鈕，確認後重新整理頁面

---

## 🔒 資安說明

本腳本設計原則為**最小權限、本地處理、完全透明**。

| 項目 | 說明 |
|---|---|
| **本地處理** | 所有文字轉換在裝置本地端完成，不經過任何伺服器 |
| **外部依賴** | 透過 `@require` 從 jsDelivr CDN 載入 opencc-js，版本鎖定於 `v1.0.5`，防止供應鏈異動 |
| **最小權限** | 聲明 `@grant none`，不申請任何 Userscript 特殊 API（如跨站請求等） |
| **代碼自律** | 程式碼中無任何 `fetch`、`XHR`、`document.cookie` 等聯網或資料外傳邏輯 |
| **欄位保護** | 自動跳過 `INPUT`、`TEXTAREA`（輸入框）與 `CODE`、`PRE`（程式碼區塊），密碼與私訊不受影響 |
| **完全公開** | 所有原始碼公開於此，歡迎自行審閱（Audit） |

> ⚠️ 補充說明：`@grant none` 限制的是 Userscript 擴充功能層級的特殊權限，並非網頁原生 JavaScript 的所有能力。本腳本的隱私保護來自**程式碼本身沒有撰寫任何外傳邏輯**，而非依賴沙盒機制。

---

## 📦 技術細節

| 項目 | 說明 |
|---|---|
| 轉換函式庫 | [opencc-js](https://github.com/nk2028/opencc-js) v1.0.5 |
| 轉換模式 | `cn → twp`（簡轉繁，台灣用詞） |
| 適用範圍 | 所有網站（`*://*/*`） |
| 執行時機 | `document-end`（DOM 載入完成後） |

---

## 📜 授權

[MIT License](LICENSE)
