# safari-s2t

一個適用於 Safari（搭配 Userscripts 擴充功能）的 Userscript，可將網頁上的簡體中文自動轉換為繁體中文（台灣用詞）。

## 功能說明

- **自動偵測**：根據網頁語言屬性（`zh-CN`）或內文是否含有簡體字元，決定是否啟動，不符合條件的網頁完全不執行。
- **浮動按鈕**：在網頁右下角顯示「繁」字按鈕，點擊後立即轉換全頁文字。
- **智慧捲動**：向下捲動時按鈕淡出，向上拉時立即顯示，不干擾閱讀。
- **即時監控**：轉換後持續監聽新增內容（如無限滾動、動態載入），自動補轉。
- **轉換引擎**：採用 [OpenCC](https://github.com/BYVoid/OpenCC)，模式為 `cn → twp`（簡體轉臺灣正體，含詞語對照）。

## 安裝方式

### 前置需求

- **Safari**（macOS / iOS / iPadOS）
- **[Userscripts](https://apps.apple.com/tw/app/userscripts/id1463298887)** 擴充功能（App Store 免費下載）

### 安裝步驟

1. 在 Safari 中開啟以下原始檔連結：

   ```
   https://raw.githubusercontent.com/Xsinnski/safari-s2t/main/cn2tw.user.js
   ```

2. Userscripts 會自動辨識 `.user.js` 並提示安裝，點擊「安裝」即可。

3. 前往 Safari 偏好設定 → 擴充功能，確認 Userscripts 已啟用，並授權目標網站。

## 使用方式

1. 開啟任何簡體中文網頁，右下角會出現半透明「繁」字按鈕。
2. 點擊按鈕，網頁文字即轉換為繁體中文（台灣正體）。
3. 若需還原，點擊已變成 ✓ 的按鈕，確認後重新整理頁面。

## 技術細節

| 項目 | 說明 |
|------|------|
| 轉換函式庫 | opencc-js v1.0.5（CDN 載入） |
| 轉換模式 | `cn → twp`（簡轉繁，台灣用詞） |
| 適用範圍 | 所有網站 (`*://*/*`) |
| 執行時機 | `document-end`（DOM 載入完成後） |
| 權限需求 | 無（`@grant none`） |

## 授權

MIT License
