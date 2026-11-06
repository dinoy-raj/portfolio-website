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
- `kit/bundle.js`: Expressive Kit components (`window.Expressive`). The kit's component styles are inlined in a `<style>` in the `<head>` of `index.html` so they don't block the first paint
- `assets/fonts/`: self-hosted fonts (Google Sans Flex, Fraunces, Google Sans Code: latin and latin-ext cuts; Material Symbols Rounded: only the icons the page uses), declared by the `@font-face` rules in the `<head>` of `index.html`
- `kit/vendor/`: React 18.3.1, ReactDOM 18.3.1 and htm 3.1.1, served from this site rather than CDNs
- `assets/apps/`: app icons and screenshots for the My Apps section, taken from each app's own Play Store assets and resized to WebP. Each screenshot `name-N.webp` (540 px wide) has a `name-N-270.webp` copy for phones, picked through `srcset`. Each app's title, description and links live in the `APPS` list in `index.html`; its page slug, features, permissions and data note live in `DETAILS` right below it
- `design/launcher-shots/`: the source for the launcher's five screenshots, drawn in HTML to match the Simple Launcher promo video (Inter, dot-matrix clock, text pinned apps, widget cards). Run `node design/launcher-shots/render.js "$PWD/design/launcher-shots"` to render them to PNG at 540×1212, then convert them to `assets/apps/launcher-1..5.webp`

Fonts are served from this site, not from Google Fonts, so no third-party request blocks the first paint. The icon font is cut down to the icons the page uses, so a new icon will not show until the font is regenerated: add the icon to the alphabetical `icon_names` list in this URL, fetch the CSS with a desktop Chrome user agent, save the `woff2` it points to in `assets/fonts/` under a new name (fonts are cached for a year), and point the preload and `@font-face` in `index.html` at it:

```
https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0..1,0&icon_names=air,android,apps,arrow_back,arrow_downward,arrow_forward,arrow_outward,auto_awesome,bar_chart,battery_charging_full,block,bolt,calendar_month,call,category,check,close,code,content_copy,contrast,counter_1,crop_portrait,date_range,do_not_disturb_on,donut_small,edit_note,event,event_note,folder,format_list_bulleted,front_hand,gavel,grid_view,hourglass_bottom,inbox,insights,interests,keyboard_return,link,local_fire_department,lock,memory,mic,more_horiz,music_note,notifications,notifications_active,notifications_paused,open_in_full,palette,photo_camera,rule,schedule,self_improvement,share,shield_lock,shop,smart_display,smart_toy,snooze,speed,stacks,sticky_note_2,stream,style,support_agent,tag,task_alt,text_fields,timer,touch_app,trending_up,tune,video_call,view_day,waving_hand,widgets,wifi_off,work&display=swap
```

## Caching

`vercel.json` caches `/kit/` and `/assets/fonts/` for a year as immutable. The script tags in `index.html` carry a `?v=` query (the React/htm version, or the first 8 hex characters of `sha256sum kit/bundle.js`); change it whenever you change one of those files, or visitors keep the old copy.

## Pre-rendered HTML

`#root` in `index.html` holds the home page already rendered to HTML, between the `prerender:start` and `prerender:end` markers. It paints before any script loads, and React hydrates it in place. After changing the page's content, regenerate it:

```bash
python3 -m http.server 8765 &
node design/prerender.js http://localhost:8765/
```

It needs Playwright. If the markup goes stale React still renders the current page; it just has to redraw instead of hydrating.

## App pages

Clicking an app card opens its page, with its features, permissions, a privacy policy and terms of service:

- `/<slug>`, for example `/simplelauncher`
- `/<slug>/privacypolicy`
- `/<slug>/termsofservice`

App pages and legal pages are drawn by React on load; only the home page is pre-rendered. The policy and terms text is generated per app by `privacyDoc` and `termsDoc` in `index.html`, dated by `LEGAL_DATE`. These are path routes handled in the page, so the host must serve `index.html` for them: `vercel.json` rewrites exactly these slugs (any other path gets `404.html`), so add a new app's slug there and to `sitemap.xml`. Each route sets its own title, description and canonical URL. Plain GitHub Pages does not, so deep links there return 404.
## SEO

- `<head>` in `index.html` carries the title, description, canonical, Open Graph / Twitter tags (`assets/og.jpg`, 1200×630) and favicons (`favicon.svg`, `apple-touch-icon.png`)
- `robots.txt`, `sitemap.xml` and `llms.txt` sit at the root; bump `<lastmod>` in the sitemap when the page changes meaningfully
- The JSON-LD block (`seo:jsonld` in `<head>`) describes Dinoy as a Person with links to every profile; update its `sameAs` list when `LINKS` changes
- The hero letters and the icons inside headings are drawn from `data-t` / `data-icon` attributes with CSS, so they stay out of the indexed heading text
- `vercel.json` redirects `www.dinoyraj.com` to the apex domain and noindexes `design/`

## Before publishing

Replace the placeholders in `index.html`:

- the contact form, which needs a backend or form service to send messages
- review each app's permissions and data note in `DETAILS`, and the policy and terms text, against what the app really does

## Content sources

Social links, talks and blogs live in the `LINKS`, `TALKS`, `EVENTS` and `BLOGS` constants near the top of the script in `index.html`. They mirror [Linktree](https://linktr.ee/dinoyraj), [Sessionize](https://sessionize.com/dinoy/) and [Medium](https://dinoyraj.medium.com/); update them there when those change.

## Deploy

Works on GitHub Pages as is: Settings → Pages → deploy from the `main` branch, root folder.
