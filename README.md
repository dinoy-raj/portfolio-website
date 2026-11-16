# Portfolio website

Personal portfolio of Dinoy, Android developer: apps, talks, blogs and ways to get in touch.

**Live:** [dinoyraj.com](https://dinoyraj.com)

Built with [Expressive Kit](https://github.com/dinoy-raj/material-3-expressive-skill), a Material 3 Expressive design system.

## Pages

Every page is pre-rendered to static HTML: `index.html` is the home page and the template, and every other route (`/apps`, `/about`, `/talks`, `/talks/<slug>`, `/<app>` and its legal pages) is written next to it as `<path>.html`, which Vercel serves without the extension (`cleanUrls`). Routes, titles, descriptions and structured data live in the app script, `kit/app.js` (`ROUTES`, `routeHead`, `routeJsonLd`), which every page loads after its first paint and the browser caches across pages. After changing any content or `kit/app.js`, regenerate every page and `sitemap.xml` (this also updates the `?v=` hashes of `kit/app.js` and `kit/bundle.js`, which are cached for a year):

```sh
node design/prerender.js
```

## Expressive Kit

`/material-3-expressive-skill` is not built here: `vercel.json` rewrites it to the kit's GitHub Pages site, which redeploys on every merge to that repository's `main`. Its pages and styles live in [material-3-expressive-skill](https://github.com/dinoy-raj/material-3-expressive-skill) (`scripts/build_site.py`, `scripts/site.css`).
