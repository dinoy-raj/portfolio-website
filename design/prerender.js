// Renders the home page to static HTML inside #root in index.html, so it paints before any script loads.
// React hydrates that markup in place instead of redrawing it. Re-run after changing the page's content:
//   python3 -m http.server 8765 &   then   node design/prerender.js http://localhost:8765/
// Needs Playwright (pre-installed in Claude Code cloud sessions; elsewhere: npm i -g playwright).
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const START = '<!-- prerender:start -->', END = '<!-- prerender:end -->';
const SERVER = 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom-server-legacy.browser.production.min.js';
(async () => {
  const url = (process.argv[2] || 'http://localhost:8765/').replace(/#.*$/, '');
  const file = path.join(__dirname, '..', 'index.html');
  const b = await chromium.launch();
  const p = await b.newPage();
  // The page hands its root element to this hook instead of mounting it, so the HTML is React's first render, untouched by effects.
  await p.addInitScript(() => { window.__prerender = el => { window.__app = el; }; });
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.waitForFunction(() => window.__app);
  await p.addScriptTag({ url: SERVER });
  const markup = await p.evaluate(() => ReactDOMServer.renderToString(window.__app));
  await b.close();
  const src = fs.readFileSync(file, 'utf8');
  const a = src.indexOf(START), z = src.indexOf(END);
  if (a < 0 || z < a) throw new Error('prerender markers not found in index.html');
  // No whitespace inside #root: hydration matches child nodes one for one.
  fs.writeFileSync(file, src.slice(0, a + START.length) + '<div id="root">' + markup + '</div>' + src.slice(z));
  console.log('Pre-rendered ' + markup.length + ' characters into index.html');
})();
