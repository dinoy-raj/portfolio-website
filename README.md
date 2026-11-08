# Portfolio website

Personal portfolio of Dinoy, Android developer: apps, talks, blogs and ways to get in touch.

**Live:** [dinoyraj.com](https://dinoyraj.com)

Built with [Expressive Kit](https://github.com/dinoy-raj/Material-3-expressive-design-system-skill), a Material 3 Expressive design system.

## Pages

Every page is pre-rendered to static HTML: `index.html` is the home page and the template, and every other route (`/apps`, `/about`, `/talks`, `/talks/<slug>`, `/<app>` and its legal pages) is written next to it as `<path>.html`, which Vercel serves without the extension (`cleanUrls`). Routes, titles, descriptions and structured data live in the app script in `index.html` (`ROUTES`, `routeHead`, `routeJsonLd`). After changing any content, regenerate every page and `sitemap.xml`:

```sh
node design/prerender.js
```
