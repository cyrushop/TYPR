# 客廳音響布局 3D 模型

3.5 m × 9.1 m 客廳連飯廳的瀏覽器 3D 模型。共有兩個方案，各自一頁、各自一個 JSON：

| 方案 | 網頁 | 資料 | 離線版 |
|---|---|---|---|
| 縱向（第三版，喇叭在廳中間向窗發聲；保留作比較） | `index.html` | `scene-data.json` | `dist/living-room-3d-offline.html` |
| 橫向（維持現有聆聽方向，JBL K2 S9500 放器材架左右，魚缸及長櫃向飯廳移） | `layout-b.html` | `scene-data-b.json` | `dist/living-room-3d-layout-b-offline.html` |

項目要求見 `CLAUDE.md`，縱向方案的布局說明見 `布局規劃.md`。橫向方案的待量度清單在 `scene-data-b.json` 的 `meta.to_measure`，網頁「待確認」分頁亦會列出。

## 開啟方法

| 用途 | 做法 |
|---|---|
| 直接分享／沒有網絡 | 開啟 `dist/` 內的離線版（three.js 及 JSON 已內嵌，可離線使用） |
| 修改 JSON 後即時更新 | 在此資料夾執行 `python3 -m http.server 8000`，開啟 http://localhost:8000 （橫向方案：http://localhost:8000/layout-b.html ），改完 JSON 重新整理即可 |
| 直接雙擊 `index.html` | 需要網絡（three.js 由 CDN 載入）；瀏覽器會封鎖讀取本地 JSON，頁面會請你選擇 `scene-data.json` |

修改任何一個 JSON 後，如要更新離線版（兩頁同時輸出）：

```bash
npm install
npm run build
```

## 功能

- 視角：立體鳥瞰、坐喺梳化望、由飯廳望、俯視（取自 JSON 的 `cameras`）；第一身行走（WASD／方向鍵，手機用搖桿；視線 1.6 m）
- 顯示：落幕／收幕、尺寸標示、聆聽三角、投影光束、未確認標示（虛線框）
- 方案：梳化靠窗／梳化離窗 0.35 m（只移動梳化及聆聽位，茶几維持原位）
- 截圖：一鍵輸出全部預設視角的 PNG（1920×1080 至 3840×2160，可選擇不含標示）
- 資料面板：可行性檢查（聆聽三角、通道、投影幕視線、投射比、光束與吊燈、物件重疊）、待確認清單、物件列表；點擊模型物件可查看尺寸

## 檔案

- `index.html`：主程式（單一檔案）
- `scene-data.json`：唯一尺寸及座標來源
- `tools/build-offline.mjs`：產生離線版
- `prototype.html`：原有原型（保留作參考）
- `photos/`：現場參考相片（只有 5 張，檔名按內容命名）
