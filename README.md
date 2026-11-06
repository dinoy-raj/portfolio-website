# Portfolio website

Personal portfolio for Dinoy, Android developer. A single static page built with Expressive Kit, a Material 3 Expressive design system.

## Run locally

No build step. Serve the folder with any static server:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Structure

- `index.html`: the page, its styles and its React components
- `kit/bundle.css`, `kit/bundle.js`: Expressive Kit component styles and components (`window.Expressive`)
- `assets/apps/`: app icons and screenshots for the My Apps section, taken from each app's own Play Store assets and resized to WebP. Each app's title, description and links live in the `APPS` list in `index.html`
- `design/launcher-shots/`: the source for the launcher's five screenshots, drawn in HTML to match the Simple Launcher promo video (Inter, dot-matrix clock, text pinned apps, widget cards). Run `node design/launcher-shots/render.js "$PWD/design/launcher-shots"` to render them to PNG at 540×1212, then convert them to `assets/apps/launcher-1..5.webp`

React 18 and htm load from CDNs; fonts and Material Symbols load from Google Fonts.

## SEO

- `<head>` in `index.html` carries the title, description, canonical, Open Graph/Twitter tags and JSON-LD (`ProfilePage`, `WebSite`, `Person` with `sameAs` links). Update `sameAs` when `LINKS` changes.
- `#root` holds a static copy of the page for crawlers that don't run JavaScript. React replaces it on load. When you change apps, talks, events or blogs, update that copy too.
- `robots.txt` and `sitemap.xml` sit at the root. Bump `<lastmod>` when content changes.
- `assets/og.png` (social card) and the PNG icons are rendered from `design/og/og.html`: `node design/og/render.js "$PWD"`
- `vercel.json` sets security headers, asset caching and `noindex` on `/design/*`.

## Before publishing

Replace the placeholders in `index.html`:

- the contact form, which needs a backend or form service to send messages

## Content sources

Social links, talks and blogs live in the `LINKS`, `TALKS`, `EVENTS` and `BLOGS` constants near the top of the script in `index.html`. They mirror [Linktree](https://linktr.ee/dinoyraj), [Sessionize](https://sessionize.com/dinoy/) and [Medium](https://dinoyraj.medium.com/); update them there when those change.

## Deploy

Works on GitHub Pages as is: Settings → Pages → deploy from the `main` branch, root folder.
