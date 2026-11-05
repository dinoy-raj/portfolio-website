const { chromium } = require('playwright');
(async () => {
  const dir = process.argv[2];
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 360, height: 808 }, deviceScaleFactor: 1.5 });
  for (let i = 1; i <= 5; i++) {
    await p.goto('file://' + dir + '/screens.html?s=' + i, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
    await p.screenshot({ path: dir + '/l' + i + '.png' });
  }
  await b.close();
})();
