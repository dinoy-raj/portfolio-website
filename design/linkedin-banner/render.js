// Renders each LinkedIn banner in banners.html to PNG at 2x (3168 x 792, LinkedIn's 1584 x 396 doubled for sharpness).
// Usage: node design/linkedin-banner/render.js [outDir] [--overlay]
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const dir = __dirname;
  const out = path.resolve(process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : dir);
  const overlay = process.argv.includes('--overlay');
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1584, height: 900 }, deviceScaleFactor: overlay ? 1 : 2 });
  await p.goto('file://' + path.join(dir, 'banners.html') + (overlay ? '?overlay' : ''), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  const slides = await p.$$('.slide');
  for (let i = 0; i < slides.length; i++) {
    const file = path.join(out, `linkedin-banner-${i + 1}${overlay ? '-overlay' : ''}.png`);
    await slides[i].screenshot({ path: file });
    console.log(file);
  }
  await b.close();
})();
