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
- `kit/vendor/`: React 18.3.1, ReactDOM 18.3.1 and htm 3.1.1, served from this site rather than CDNs
- `assets/apps/`: app icons and screenshots for the My Apps section, taken from each app's own Play Store assets and resized to WebP. Each screenshot `name-N.webp` (540 px wide) has a `name-N-270.webp` copy for phones, picked through `srcset`. Each app's title, description and links live in the `APPS` list in `index.html`
- `design/launcher-shots/`: the source for the launcher's five screenshots, drawn in HTML to match the Simple Launcher promo video (Inter, dot-matrix clock, text pinned apps, widget cards). Run `node design/launcher-shots/render.js "$PWD/design/launcher-shots"` to render them to PNG at 540×1212, then convert them to `assets/apps/launcher-1..5.webp`

Fonts and Material Symbols load from Google Fonts. The icon font is cut down to the icons the page uses through `icon_names` in the `<head>` of `index.html`, so a new icon must be added to that list (alphabetical order) or it will not show.

## Pre-rendered HTML

`#root` in `index.html` holds the home page already rendered to HTML, between the `prerender:start` and `prerender:end` markers. It paints before any script loads, and React hydrates it in place. After changing the page's content, regenerate it:

```bash
python3 -m http.server 8765 &
node design/prerender.js http://localhost:8765/
```

It needs Playwright. If the markup goes stale React still renders the current page; it just has to redraw instead of hydrating.

## SEO

- `<head>` in `index.html` carries the title, description, canonical, Open Graph / Twitter tags (`assets/og.jpg`, 1200×630) and favicons (`favicon.svg`, `apple-touch-icon.png`)
- `robots.txt`, `sitemap.xml` and `llms.txt` sit at the root; bump `<lastmod>` in the sitemap when the page changes meaningfully
- The JSON-LD block (`seo:jsonld` in `<head>`) describes Dinoy as a Person with links to every profile; update its `sameAs` list when `LINKS` changes
- The hero letters and the icons inside headings are drawn from `data-t` / `data-icon` attributes with CSS, so they stay out of the indexed heading text
- `vercel.json` redirects `www.dinoyraj.com` to the apex domain and noindexes `design/`

## Before publishing

Replace the placeholders in `index.html`:

- the contact form, which needs a backend or form service to send messages

## Content sources

Social links, talks and blogs live in the `LINKS`, `TALKS`, `EVENTS` and `BLOGS` constants near the top of the script in `index.html`. They mirror [Linktree](https://linktr.ee/dinoyraj), [Sessionize](https://sessionize.com/dinoy/) and [Medium](https://dinoyraj.medium.com/); update them there when those change.

## Deploy

Works on GitHub Pages as is: Settings → Pages → deploy from the `main` branch, root folder.
