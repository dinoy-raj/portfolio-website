# Portfolio website

Personal portfolio of Dinoy, Android developer: apps, talks, blogs and ways to get in touch.

**Live:** [dinoyraj.com](https://dinoyraj.com)

Built with [Expressive Kit](https://github.com/dinoy-raj/material-3-expressive-skill), a Material 3 Expressive design system.

## Pages

Every page is pre-rendered to static HTML: `index.html` is the home page and the template, and every other route (`/apps`, `/about`, `/talks`, `/talks/<slug>`, `/<app>` and its legal pages) is written next to it as `<path>.html`, which Vercel serves without the extension (`cleanUrls`). Routes, titles, descriptions and structured data live in the app script, `kit/app.js` (`ROUTES`, `routeHead`, `routeJsonLd`), which every page loads after its first paint and the browser caches across pages. After changing any content or `kit/app.js`, regenerate every page and `sitemap.xml` (this also updates the `?v=` hashes of `kit/app.js` and `kit/bundle.js`, which are cached for a year):

```sh
node design/prerender.js
```

## Talk slides

A talk's deck can be hosted on the site at `/talks/<slug>/slides`: a single static page with the slides inlined and a small viewer (arrow keys, click or swipe, `N` for speaker notes, `F` for full screen, `#slide-N` links). The deck source sits in `design/decks/<name>/` as exported from a Claude Slides artifact (`deck.json`, `deck.css`, `slides/<id>.html`), its images in `assets/talks/<name>/`. After changing a deck, rebuild its page:

```sh
node design/build-deck.js
```

Point the talk's `slides` and `slidesEmbed` in `kit/app.js` at `/talks/<slug>/slides` to link and embed it on the talk page.

## Expressive Kit

`/material-3-expressive-skill` is not built here: `vercel.json` rewrites it to the kit's GitHub Pages site, which redeploys on every merge to that repository's `main`. Its pages and styles live in [material-3-expressive-skill](https://github.com/dinoy-raj/material-3-expressive-skill) (`scripts/build_site.py`, `scripts/site.css`).
