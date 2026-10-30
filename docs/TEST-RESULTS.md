# 驗證結果

日期：2026-10-30。教材：選擇結構實驗室。

## 自動邏輯測試

`node --test tests/*.test.mjs`：9 組通過。

- 六單元、每單元四題、共24題，答案與解析完整。
- 遍歷各單元所有允許整數：首五單元各101個、第六單元151個，共656組輸入；輸出與獨立公式一致，全部能終止。
- 驗證 0、49、50、84、85、100 分級邊界、單一 if 初始化、外層失敗跳過內層、elseif 命中後跳過其餘條件。
- 驗證快照不共用可變資料、圖與程式碼節點完整、六種關係運算符、不合法輸入及損壞進度。
- `node --check app.mjs` 通過。

## 瀏覽器互動

以 agent-browser／Chromium 執行 `tests/browser-check.js`：88 項通過，腳本完成所有24題。

- 各單元渲染、執行、後退、重設、空白及小數檢查、合法0。
- 六個分級邊界、兩種多向寫法一致、≥ 與 > 同步切換。
- 播放暫停、更改輸入取消舊計時、點選縮排歸屬。
- 未選答案提示、首次錯誤提示、兩次錯誤解析、正確回饋、完成結果。
- 進度儲存、清除確認、取消清除、教師揭曉。

另實測：損壞 LocalStorage 後重新載入恢復空進度；模擬寫入被拒時出現提示，仍能執行示範。未見瀏覽器未處理錯誤。

## 版面

- Chromium 桌面1440×1000、平板768×1024、手機390×844，檢查版面及截圖。
- 平板及手機尺寸分別遍歷六個單元，均無整頁橫向溢出。
- 鍵盤聚焦「下一步」後按 Enter 可推進；模擬減少動態效果時 transitionDuration 為 0s。
- 流程圖可獨立縮放及捲動；控制列保持可見。互動使用原生連結、按鈕、表單及單選控制，提供焦點樣式與文字路徑。
- 截圖為同目錄 home-desktop.png、lesson-desktop.png、lesson-tablet.png、lesson-mobile.png。

## 限制

尺寸模擬不等於實體裝置測試；尚未在實體 iPad、iPhone 或 Safari 實測。教師展示提供放大、收起導覽及揭曉，不是考試保密機制。各進度只存在目前瀏覽器，不跨裝置同步。

## 部署

GitHub repo： https://github.com/lphky/selection-lab

GitHub Pages： https://lphky.github.io/selection-lab/

正式 GitHub Pages 已開啟並完成同一套88項瀏覽器檢查，全部通過。首頁、CSS、三個 JavaScript 模組及 favicon 均回傳 HTTP 200，模組為正確 JavaScript MIME 類型，未見瀏覽器未處理錯誤。GitHub 的 pages build and deployment 成功；未變更其他專案或現有網域。
