// Renders og.html to assets/og.png (1200x630) and the icon to assets/icon-512.png, assets/apple-touch-icon.png (180) and assets/icon-192.png.
const { chromium } = require('playwright');
(async () => {
  const root = process.argv[2], src = 'file://' + root + '/design/og/og.html';
  const b = await chromium.launch();
  let p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto(src, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await p.screenshot({ path: root + '/assets/og.png' });
  for (const s of [512, 192, 180]) {
    p = await b.newPage({ viewport: { width: 512, height: 512 }, deviceScaleFactor: s / 512 });
    await p.goto(src + '?icon', { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(200);
    await p.screenshot({ path: root + '/assets/' + (s === 180 ? 'apple-touch-icon.png' : 'icon-' + s + '.png') });
  }
  await b.close();
})();
