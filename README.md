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
- `assets/apps/`: app icons and screenshots for the My Apps section, taken from each app's own Play Store assets and resized to WebP. Each app's title, description and links live in the `APPS` list in `index.html`; its page slug, features, permissions and data note live in `DETAILS` right below it
- `design/launcher-shots/`: the source for the launcher's five screenshots, drawn in HTML to match the Simple Launcher promo video (Inter, dot-matrix clock, text pinned apps, widget cards). Run `node design/launcher-shots/render.js "$PWD/design/launcher-shots"` to render them to PNG at 540×1212, then convert them to `assets/apps/launcher-1..5.webp`

React 18 and htm load from CDNs; fonts and Material Symbols load from Google Fonts.

## App pages

Clicking an app card opens its page, with its features, permissions, a privacy policy and terms of service:

- `/<slug>`, for example `/simplelauncher`
- `/<slug>/privacypolicy`
- `/<slug>/termsofservice`

The policy and terms text is generated per app by `privacyDoc` and `termsDoc` in `index.html`, dated by `LEGAL_DATE`. These are path routes handled in the page, so the host must serve `index.html` for them: `vercel.json` has the rewrites. Plain GitHub Pages does not, so deep links there return 404.

## Before publishing

Replace the placeholders in `index.html`:

- the contact form, which needs a backend or form service to send messages
- review each app's permissions and data note in `DETAILS`, and the policy and terms text, against what the app really does

## Content sources

Social links, talks and blogs live in the `LINKS`, `TALKS`, `EVENTS` and `BLOGS` constants near the top of the script in `index.html`. They mirror [Linktree](https://linktr.ee/dinoyraj), [Sessionize](https://sessionize.com/dinoy/) and [Medium](https://dinoyraj.medium.com/); update them there when those change.

## Deploy

Works on GitHub Pages as is: Settings → Pages → deploy from the `main` branch, root folder.
