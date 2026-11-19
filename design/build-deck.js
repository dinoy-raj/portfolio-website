/* Builds a talk's slide deck into one static page, /talks/<slug>/slides.

   A deck lives in design/decks/<name>/ as exported from a Claude Slides artifact:
   deck.json (title and slide order), deck.css (shared styles) and slides/<id>.html
   (one 1920×1080 <section> each). This script inlines every slide into a small viewer
   (keyboard, click, swipe, fragments, speaker notes, fullscreen) that scales the canvas
   to the window. Live <x-embed> demos become sandboxed iframes that load only while
   their slide is showing.

     node design/build-deck.js            builds every deck in DECKS
*/
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://dinoyraj.com';

const DECKS = [{
  dir: 'design/decks/breakpoint-gap',
  slug: 'adaptive-ux-foldables-multi-window-design',
  title: 'Bridge the Breakpoint Gap',
  desc: 'Slides for Bridge the Breakpoint Gap, a talk by Dinoy Raj on training product designers for foldables, postures and multi-window UX.',
  blobs: {
    '6e0f44fbf76a92f86e62a18223c77f8e': '/assets/talks/breakpoint-gap/dinoy-portrait.webp',
    'cc17449c62bbdf5df3d6d876a070ec02': '/assets/talks/breakpoint-gap/letterbox-vs-adaptive.webp',
  },
}];

const FONTS_CSS = 'https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400..700&family=Source+Code+Pro:wght@400;600&display=swap';
const SANS_FACE = "@font-face {font-family: 'Google Sans Flex'; font-style: normal; font-weight: 400 700; font-stretch: 62% 100%; font-display: swap; src: url(/assets/fonts/google-sans-flex-latin-075c1628.woff2) format('woff2'); unicode-range: U+0020-007E, U+00A0-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2013-2014, U+2018-201E, U+2022, U+2026, U+2039-203A, U+20AC, U+2122;}";

const SHAPES = {
  'arrow-right': 'polygon(0 30%,60% 30%,60% 0,100% 50%,60% 100%,60% 70%,0 70%)',
  'arrow-left': 'polygon(100% 30%,40% 30%,40% 0,0 50%,40% 100%,40% 70%,100% 70%)',
  'arrow-up': 'polygon(30% 100%,30% 40%,0 40%,50% 0,100% 40%,70% 40%,70% 100%)',
  'arrow-down': 'polygon(30% 0,30% 60%,0 60%,50% 100%,100% 60%,70% 60%,70% 0)',
  diamond: 'polygon(50% 0,100% 50%,50% 100%,0 50%)',
};

const attr = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function convertSlide(html, deck) {
  return html
    // Live demos: keep the page as data, the viewer mounts it in an iframe on arrival.
    .replace(/<x-embed([^>]*)>([\s\S]*?)<\/x-embed>/g, (m, a, doc) => {
      if (/Google Sans|Source Code Pro/.test(doc)) doc = doc.replace(/<head>/i, `<head><link rel="stylesheet" href="${FONTS_CSS}">`);
      return `<div class="x-embed"${a} data-doc="${attr(doc)}"></div>`;
    })
    .replace(/<x-shape kind="([a-z-]+)"([^>]*)><\/x-shape>/g, (m, kind, a) =>
      `<div class="x-shape x-${kind}"${a.replace(/style="/, `style="${SHAPES[kind] ? 'clip-path:' + SHAPES[kind] + ';' : ''}`)}></div>`)
    .replace(/src="\/_blob\/([a-f0-9]+)"/g, (m, id) => {
      if (!deck.blobs[id]) throw new Error('No asset mapped for blob ' + id);
      return `src="${deck.blobs[id]}" decoding="async"`;
    })
    // An image the deck never got a file for: a captioned placeholder.
    .replace(/<img alt="([^"]*)" style="([^"]*)">/g, (m, alt, st) =>
      `<div class="ph" role="img" aria-label="${alt}" style="${st}"><p>${alt}</p></div>`);
}

function build(deck) {
  const dir = path.join(ROOT, deck.dir);
  const index = JSON.parse(fs.readFileSync(path.join(dir, 'deck.json'), 'utf8'));
  const css = fs.readFileSync(path.join(dir, 'deck.css'), 'utf8');
  const slides = index.order.map(id => {
    if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) throw new Error('Bad slide id ' + id);
    return convertSlide(fs.readFileSync(path.join(dir, 'slides', id + '.html'), 'utf8').trim(), deck);
  });
  const talk = '/talks/' + deck.slug, url = SITE + talk + '/slides';
  const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Slides: ${deck.title} · Dinoy Raj</title>
<meta name="description" content="${attr(deck.desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="Slides: ${attr(deck.title)}">
<meta property="og:description" content="${attr(deck.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/assets/og.jpg">
<meta name="theme-color" content="#11161b">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/google-sans-flex-latin-075c1628.woff2" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap">
<style>
${SANS_FACE}
/* Deck styles, as authored */
${css}
/* Viewer */
html, body { margin: 0; height: 100%; overflow: hidden; background: #11161b; }
body { -webkit-tap-highlight-color: transparent; }
#v-stage { position: fixed; left: 0; right: 0; top: 0; bottom: 56px; overflow: hidden; touch-action: pan-y; cursor: pointer; }
#v-deck { position: absolute; left: 50%; top: 50%; width: 1920px; height: 1080px; transform-origin: 0 0; background: var(--surface); box-shadow: 0 20px 60px rgba(0,0,0,.45); }
#v-deck > section { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; box-sizing: border-box; overflow: hidden; visibility: hidden; opacity: 0; transition: opacity .35s ease, visibility 0s linear .35s; }
#v-deck > section.on { visibility: visible; opacity: 1; transition: opacity .35s ease; z-index: 1; }
#v-deck > section p, #v-deck > section h1, #v-deck > section h2, #v-deck > section h3 { margin: 0; }
#v-deck > section aside { display: none; }
#v-deck .x-embed iframe { display: block; width: 100%; height: 100%; border: 0; background: transparent; pointer-events: none; }
#v-deck .ph { display: flex; align-items: center; justify-content: center; padding: 48px; box-sizing: border-box; }
#v-deck .ph p { font-size: 32px; line-height: 44px; color: var(--ink-muted); text-align: center; max-width: 800px; }
#v-bar { position: fixed; left: 0; right: 0; bottom: 0; height: 56px; display: flex; align-items: center; gap: 4px; padding: 0 max(12px, env(safe-area-inset-right)) 0 max(12px, env(safe-area-inset-left)); color: #ebf4ff; font: 500 15px/20px 'Google Sans Flex', system-ui, sans-serif; }
#v-bar a, #v-bar button { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 40px; min-width: 40px; padding: 0 12px; border: 0; border-radius: 999px; background: transparent; color: inherit; font: inherit; text-decoration: none; cursor: pointer; }
#v-bar a:hover, #v-bar button:hover { background: rgba(235,244,255,.1); }
#v-bar :focus-visible { outline: 2px solid #e5fb79; outline-offset: 2px; }
#v-bar button[aria-pressed="true"] { background: #e5fb79; color: #3b401f; }
#v-bar svg { width: 22px; height: 22px; fill: currentColor; flex: none; }
#v-count { min-width: 76px; text-align: center; font-variant-numeric: tabular-nums; }
#v-progress { position: fixed; left: 0; bottom: 56px; height: 3px; background: #34a853; transition: width .3s ease; }
.v-grow { flex: 1; }
.v-hide-sm { }
@media (max-width: 560px) { .v-hide-sm { display: none !important; } }
#v-notes { position: fixed; left: 50%; bottom: 68px; transform: translateX(-50%); width: min(880px, calc(100% - 24px)); max-height: 42vh; overflow: auto; box-sizing: border-box; padding: 20px 24px; border-radius: 20px; background: #f7fbf8; color: #1d262f; font: 400 17px/26px 'Google Sans Flex', system-ui, sans-serif; box-shadow: 0 12px 40px rgba(0,0,0,.4); z-index: 5; }
#v-notes[hidden] { display: none; }
.v-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
</style>
</head>
<body>
<h1 class="v-sr">Slides: ${deck.title}</h1>
<main id="v-stage" aria-roledescription="carousel" aria-label="Slides">
<div id="v-deck">
${slides.join('\n')}
</div>
</main>
<div id="v-progress" aria-hidden="true"></div>
<div id="v-notes" hidden aria-live="polite"></div>
<nav id="v-bar" aria-label="Slide controls">
<a id="v-back" href="${talk}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20z"/></svg><span class="v-hide-sm">About this talk</span></a>
<span class="v-grow"></span>
<button id="v-prev" type="button" aria-label="Previous slide"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4-4.6-4.6z"/></svg></button>
<span id="v-count" aria-live="polite">1 / ${slides.length}</span>
<button id="v-next" type="button" aria-label="Next slide"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 6 8.6 7.4l4.6 4.6-4.6 4.6L10 18l6-6z"/></svg></button>
<span class="v-grow"></span>
<button id="v-note" type="button" aria-pressed="false" aria-label="Speaker notes" title="Speaker notes (N)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18h12v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"/></svg></button>
<button id="v-full" type="button" aria-label="Full screen" title="Full screen (F)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 14H5v5h5v-2H7zm-2-4h2V7h3V5H5zm12 7h-3v2h5v-5h-2zM14 5v2h3v3h2V5z"/></svg></button>
</nav>
<script>
(function () {
  var stage = document.getElementById('v-stage'), deck = document.getElementById('v-deck');
  var S = [].slice.call(deck.children), N = S.length, cur = -1;
  var count = document.getElementById('v-count'), bar = document.getElementById('v-progress');
  var notes = document.getElementById('v-notes'), noteBtn = document.getElementById('v-note');
  if (window.self !== window.top) document.getElementById('v-back').style.display = 'none';

  /* Fragments: groups by data-fragment-index, else document order. */
  var F = S.map(function (s) {
    var g = {};
    [].slice.call(s.querySelectorAll('.fragment')).forEach(function (el, i) {
      var k = el.hasAttribute('data-fragment-index') ? +el.getAttribute('data-fragment-index') : 1000 + i;
      (g[k] = g[k] || []).push(el);
    });
    return Object.keys(g).map(Number).sort(function (a, b) { return a - b; }).map(function (k) { return g[k]; });
  });
  var step = 0;
  function setStep(n) {
    step = n;
    F[cur].forEach(function (grp, i) {
      grp.forEach(function (el) {
        el.classList.toggle('visible', i < n);
        el.classList.toggle('current-fragment', i === n - 1);
      });
    });
  }

  function fit() {
    var w = stage.clientWidth, h = stage.clientHeight, k = Math.min(w / 1920, h / 1080);
    deck.style.transform = 'scale(' + k + ') translate(-50%, -50%)';
  }

  function mount(s, on) {
    [].slice.call(s.querySelectorAll('.x-embed')).forEach(function (box) {
      if (on && !box.firstChild) {
        var f = document.createElement('iframe');
        f.setAttribute('sandbox', 'allow-scripts');
        f.setAttribute('aria-hidden', 'true');
        f.setAttribute('tabindex', '-1');
        f.srcdoc = box.getAttribute('data-doc');
        box.appendChild(f);
      } else if (!on && box.firstChild) {
        box.removeChild(box.firstChild);
      }
    });
  }

  function go(i, atEnd) {
    i = Math.max(0, Math.min(N - 1, i));
    if (i !== cur) {
      var old = S[cur];
      if (old) {
        old.classList.remove('on');
        old.setAttribute('aria-hidden', 'true');
        setTimeout(function () { if (!old.classList.contains('on')) mount(old, false); }, 400);
      }
      cur = i;
      S[i].classList.add('on');
      S[i].removeAttribute('aria-hidden');
      mount(S[i], true);
    }
    setStep(atEnd ? F[cur].length : 0);
    count.textContent = (cur + 1) + ' / ' + N;
    bar.style.width = ((cur + 1) / N * 100) + '%';
    var a = S[cur].querySelector('aside');
    notes.innerHTML = a ? a.innerHTML : '<i>No notes for this slide.</i>';
    try { history.replaceState(null, '', '#slide-' + (cur + 1)); } catch (e) {}
  }
  function next() { if (step < F[cur].length) setStep(step + 1); else if (cur < N - 1) go(cur + 1); }
  function prev() { if (step > 0) setStep(step - 1); else if (cur > 0) go(cur - 1, true); }

  function toggleNotes() {
    var on = notes.hidden;
    notes.hidden = !on;
    noteBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
  function toggleFull() {
    var d = document, el = d.documentElement;
    if (d.fullscreenElement || d.webkitFullscreenElement) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
    else if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }

  document.getElementById('v-next').onclick = next;
  document.getElementById('v-prev').onclick = prev;
  noteBtn.onclick = toggleNotes;
  document.getElementById('v-full').onclick = toggleFull;
  if (!(document.fullscreenEnabled || document.webkitFullscreenEnabled)) document.getElementById('v-full').style.display = 'none';

  stage.addEventListener('click', function (e) {
    var r = stage.getBoundingClientRect();
    if (e.clientX - r.left < r.width / 4) prev(); else next();
  });
  var tx = null, ty = 0;
  stage.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { e.preventDefault(); dx < 0 ? next() : prev(); }
    tx = null;
  });
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown' || k === ' ' || k === 'Enter' && e.target === document.body) { e.preventDefault(); next(); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp' || k === 'Backspace') { e.preventDefault(); prev(); }
    else if (k === 'Home') go(0);
    else if (k === 'End') go(N - 1, true);
    else if (k === 'n' || k === 'N') toggleNotes();
    else if (k === 'f' || k === 'F') toggleFull();
  });

  S.forEach(function (s, i) {
    s.setAttribute('role', 'group');
    s.setAttribute('aria-roledescription', 'slide');
    s.setAttribute('aria-label', (i + 1) + ' of ' + N);
    s.setAttribute('aria-hidden', 'true');
  });
  window.addEventListener('resize', fit);
  fit();
  var m = /^#slide-(\\d+)$/.exec(location.hash);
  go(m ? +m[1] - 1 : 0);
  window.addEventListener('hashchange', function () {
    var h = /^#slide-(\\d+)$/.exec(location.hash);
    if (h && +h[1] - 1 !== cur) go(+h[1] - 1);
  });
})();
</script>
</body>
</html>
`;
  const out = path.join(ROOT, 'talks', deck.slug, 'slides.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page);
  console.log(`Built ${talk}/slides (${N(slides)} slides, ${page.length} characters) -> ${path.relative(ROOT, out)}`);
}
const N = a => a.length;

DECKS.forEach(build);
