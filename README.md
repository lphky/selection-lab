# 選擇結構實驗室

香港中學選擇控制結構互動教材。六個單元、24 題原創題、同步偽代碼／SVG 流程圖／變量／輸出、教師展示及本機進度。純 HTML、CSS、JavaScript，無外部依賴與個人資料收集。

網站：https://lphky.github.io/selection-lab/ 。原始碼：https://github.com/lphky/selection-lab 。

## 使用與開發

以靜態伺服器提供根目錄，例如 `python3 -m http.server 8080`。執行 `node --test tests/*.test.mjs` 驗證教學邏輯。GitHub Pages 從 main 分支根目錄發布；所有資源為相對路徑。

`content.mjs` 定義節點、判斷函式及題庫；`engine.mjs` 依同一節點產生執行快照；`app.mjs` 呈現互動介面；`style.css` 管理響應式版面。

答案可在前端原始碼中查看。教師展示模式是課堂輔助，並無保密或防作弊保障。學習進度僅存在目前瀏覽器，可從首頁清除。

參考使用者提供的課本圖片之概念範圍，以原創文字、互動圖及題目重寫；不發布原圖。實體 iPad／Safari 驗證狀況見 docs/TEST-RESULTS.md。
