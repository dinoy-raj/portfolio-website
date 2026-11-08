// Renders every route to static HTML, so each page paints before any script loads and search engines see each page's own content.
// "/" goes into index.html; every other route gets its own file built from index.html as the template, with its own head
// (title, description, canonical, social tags, JSON-LD) and its own markup inside #root:
//   /talks -> talks.html, /<slug> -> <slug>.html, /<slug>/privacypolicy -> <slug>/privacypolicy.html (and termsofservice)
// Vercel (cleanUrls) and GitHub Pages serve those at the extensionless URLs. React hydrates the markup in place.
// Re-run after changing the page's content, its routes or its head:   node design/prerender.js
// It serves the site itself. Needs Playwright (pre-installed in Claude Code cloud sessions; elsewhere: npm i -g playwright).
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), http = require('http');
const ROOT = path.join(__dirname, '..'), SITE = 'https://dinoyraj.com';
const START = '<!-- prerender:start -->', END = '<!-- prerender:end -->';
const LD_START = '<!-- seo:jsonld -->', LD_END = '<!-- /seo:jsonld -->';
const SERVER = 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom-server-legacy.browser.production.min.js';
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.svg': 'image/svg+xml' };

const template = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Every route is served the template, as the live site served index.html for all of them before they had files of their own.
function serve() {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(ROOT, url);
    if (file.startsWith(ROOT) && path.extname(file) && fs.existsSync(file) && fs.statSync(file).isFile()) {
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
      return fs.createReadStream(file).pipe(res);
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(template);
  });
  return new Promise(r => server.listen(0, '127.0.0.1', () => r(server)));
}

// Swaps one tag's attribute value in the head; throws if the tag is missing so a template change can't silently drop it.
function setAttr(src, tagRe, attr, value) {
  let hit = false;
  const out = src.replace(tagRe, tag => { hit = true; return tag.replace(new RegExp(attr + '="[^"]*"'), attr + '="' + esc(value) + '"'); });
  if (!hit) throw new Error('tag not found in index.html: ' + tagRe);
  return out;
}

function page(meta, markup) {
  const home = meta.path === '/';
  let s = template;
  const head = s.slice(0, s.indexOf('</head>')), rest = s.slice(head.length);
  let h = head.replace(/<title>[^<]*<\/title>/, '<title>' + esc(meta.title) + '</title>');
  h = setAttr(h, /<meta name="description"[^>]*>/, 'content', meta.desc);
  h = setAttr(h, /<link rel="canonical"[^>]*>/, 'href', SITE + meta.path);
  h = setAttr(h, /<meta property="og:url"[^>]*>/, 'content', SITE + meta.path);
  h = setAttr(h, /<meta property="og:title"[^>]*>/, 'content', meta.title);
  h = setAttr(h, /<meta name="twitter:title"[^>]*>/, 'content', meta.title);
  if (!home) {
    h = setAttr(h, /<meta property="og:description"[^>]*>/, 'content', meta.desc);
    h = setAttr(h, /<meta name="twitter:description"[^>]*>/, 'content', meta.desc);
    h = setAttr(h, /<meta property="og:type"[^>]*>/, 'content', 'website');
    h = h.replace(/<meta property="profile:[^>]*>\n/g, ''); // profile tags belong to og:type profile, the home page
    h = h.replace(/<link rel="preload" as="image" href="\/assets\/dinoy\.webp"[^>]*>\n/, ''); // the portrait is only on the home page
    // Keep the site-wide Person and WebSite; this page's own nodes replace the home page's ProfilePage.
    const a = h.indexOf(LD_START), z = h.indexOf(LD_END);
    if (a < 0 || z < a) throw new Error('JSON-LD markers not found in index.html');
    const block = h.slice(a, z), json = block.slice(block.indexOf('{'), block.lastIndexOf('}') + 1);
    const ld = JSON.parse(json);
    ld['@graph'] = ld['@graph'].filter(n => n['@type'] === 'Person' || n['@type'] === 'WebSite').concat(meta.ld);
    h = h.slice(0, a) + LD_START + '\n<script type="application/ld+json">\n' + JSON.stringify(ld, null, 1) + '\n</script>\n' + h.slice(z);
  }
  s = h + rest;
  const a = s.indexOf(START), z = s.indexOf(END);
  if (a < 0 || z < a) throw new Error('prerender markers not found in index.html');
  // No whitespace inside #root: hydration matches child nodes one for one. data-route tells the page which route this markup is.
  return s.slice(0, a + START.length) + '<div id="root" data-route="' + esc(meta.key) + '">' + markup + '</div>' + s.slice(z);
}

(async () => {
  const server = await serve();
  const base = 'http://127.0.0.1:' + server.address().port;
  const b = await chromium.launch();
  const render = async route => {
    const p = await b.newPage();
    const errors = [];
    p.on('pageerror', e => errors.push(e.message));
    // The page hands its root element and the route's head to this hook instead of mounting, so the HTML is React's first render, untouched by effects.
    await p.addInitScript(() => { window.__prerender = (el, meta) => { window.__app = el; window.__meta = meta; }; });
    await p.goto(base + route, { waitUntil: 'networkidle' });
    await p.waitForFunction(() => window.__app, null, { timeout: 15000 });
    await p.addScriptTag({ url: SERVER });
    const out = await p.evaluate(() => ({ markup: ReactDOMServer.renderToString(window.__app), meta: window.__meta }));
    await p.close();
    if (errors.length) throw new Error(route + ': ' + errors.join('; '));
    return out;
  };

  const home = await render('/');
  // The app slugs come from the page itself (the all-apps view links every app), so a new app gets its pages without touching this script.
  const pg = await b.newPage();
  await pg.goto(base + '/#all-apps', { waitUntil: 'networkidle' });
  await pg.waitForSelector('.all-apps .apps-grid');
  const apps = [...new Set(await pg.$$eval('.all-apps a.open[href^="/"]', as => as.map(a => a.getAttribute('href').slice(1))))];
  await pg.close();
  if (!apps.length) throw new Error('no app links found on /#all-apps');
  const routes = ['/talks', ...apps.flatMap(s => ['/' + s, '/' + s + '/privacypolicy', '/' + s + '/termsofservice'])];

  const written = [];
  fs.writeFileSync(path.join(ROOT, 'index.html'), page(home.meta, home.markup));
  written.push('/');
  for (const route of routes) {
    const { markup, meta } = await render(route);
    if (meta.path !== route) throw new Error('route ' + route + ' rendered as ' + meta.path);
    const file = path.join(ROOT, route.slice(1) + '.html');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, page(meta, markup));
    written.push(route);
  }
  await b.close();
  server.close();

  // The sitemap lists exactly the pages written, dated today.
  const today = new Date().toISOString().slice(0, 10);
  const urls = written.map(r => '  <url>\n    <loc>' + SITE + r + '</loc>\n    <lastmod>' + today + '</lastmod>\n' +
    (r === '/' ? '    <image:image><image:loc>' + SITE + '/assets/dinoy.jpg</image:loc></image:image>\n' : '') + '  </url>\n').join('');
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' + urls + '</urlset>\n');
  console.log('Pre-rendered ' + written.length + ' pages and rewrote sitemap.xml');
})().catch(e => { console.error(e); process.exit(1); });
