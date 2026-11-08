// Renders the home page to static HTML inside #root in index.html, so it paints before any script loads,
// and writes the home page's schema.org JSON-LD (built by jsonLd() in the page) between the seo:jsonld markers in <head>.
// React hydrates that markup in place instead of redrawing it. Re-run after changing the page's content:
//   python3 -m http.server 8765 &   then   node design/prerender.js http://localhost:8765/
// Needs Playwright (pre-installed in Claude Code cloud sessions; elsewhere: npm i -g playwright).
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const START = '<!-- prerender:start -->', END = '<!-- prerender:end -->';
const LD_START = '<!-- seo:jsonld -->', LD_END = '<!-- /seo:jsonld -->';
const SERVER = 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom-server-legacy.browser.production.min.js';
(async () => {
  const url = (process.argv[2] || 'http://localhost:8765/').replace(/#.*$/, '');
  const file = path.join(__dirname, '..', 'index.html');
  const b = await chromium.launch();
  const p = await b.newPage();
  // The page hands its root element to this hook instead of mounting it, so the HTML is React's first render, untouched by effects.
  await p.addInitScript(() => { window.__prerender = (el, ld) => { window.__app = el; window.__ld = ld; }; });
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.waitForFunction(() => window.__app);
  await p.addScriptTag({ url: SERVER });
  const markup = await p.evaluate(() => ReactDOMServer.renderToString(window.__app));
  // '<' escaped so no string in the data can close the script element early.
  const ld = await p.evaluate(() => JSON.stringify(window.__ld).replace(/</g, '\\u003c'));
  await b.close();
  let src = fs.readFileSync(file, 'utf8');
  const between = (s, open, close, body) => {
    const a = s.indexOf(open), z = s.indexOf(close);
    if (a < 0 || z < a) throw new Error(open + ' markers not found in index.html');
    return s.slice(0, a + open.length) + body + s.slice(z);
  };
  src = between(src, LD_START, LD_END, '\n<script type="application/ld+json" id="jsonld">\n' + ld + '\n</script>\n');
  // No whitespace inside #root: hydration matches child nodes one for one.
  src = between(src, START, END, '<div id="root">' + markup + '</div>');
  fs.writeFileSync(file, src);
  console.log('Pre-rendered ' + markup.length + ' characters and ' + ld.length + ' characters of JSON-LD into index.html');
})();
