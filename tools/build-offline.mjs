// 產生可離線開啟的單一 HTML：把 three.js、程式碼及 scene-data.json 全部內嵌。
// 用法：npm install（首次）→ npm run build
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const data = JSON.parse(readFileSync(resolve(root, 'scene-data.json'), 'utf8'));

const m = html.match(/<script type="module" id="app-script">([\s\S]*?)<\/script>/);
if (!m) throw new Error('index.html 內找不到 <script type="module" id="app-script">');

const out = await build({
  stdin: { contents: m[1], resolveDir: root, loader: 'js', sourcefile: 'app.js' },
  bundle: true, format: 'esm', minify: true, target: 'es2022', write: false, legalComments: 'none',
});
const js = out.outputFiles[0].text;
const safe = (s) => s.replace(/<\/script/gi, '<\\/script');

let page = html
  .replace(/<script type="importmap">[\s\S]*?<\/script>\s*/, '')
  .replace(m[0], () => `<script>window.__SCENE_DATA__ = ${safe(JSON.stringify(data))};</script>\n<script type="module">${safe(js)}</script>`)
  .replace('<title>客廳音響布局 3D 模型</title>', '<title>客廳音響布局 3D 模型（離線版）</title>');

mkdirSync(resolve(root, 'dist'), { recursive: true });
const file = resolve(root, 'dist', 'living-room-3d-offline.html');
writeFileSync(file, page);
console.log(`已輸出 ${file}（${(page.length / 1024 / 1024).toFixed(2)} MB，資料更新日期：${data.meta?.updated ?? '未註明'}）`);
