# Portfolio website

Personal portfolio of Dinoy, Android developer: apps, talks, blogs and ways to get in touch.

**Live:** [dinoyraj.com](https://dinoyraj.com)

Built with [Expressive Kit](https://github.com/dinoy-raj/Material-3-expressive-design-system-skill), a Material 3 Expressive design system.

## Pages

Every route has its own pre-rendered HTML file, so search engines and link previews see each page's content and head without running JavaScript: `index.html` (home), `talks.html`, `<app>.html` and `<app>/privacypolicy.html` / `<app>/termsofservice.html`. They are generated from `index.html`, which holds all the code and content. After changing the page, run `node design/prerender.js`; it rewrites every page file and `sitemap.xml`.
