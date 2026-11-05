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

React 18 and htm load from CDNs; fonts and Material Symbols load from Google Fonts.

## Before publishing

Replace the placeholders in `index.html`:

- `EMAIL` (currently `hello@yourdomain.com`)
- the portrait placeholder in the hero
- the GitHub, LinkedIn, Play Store and Instagram links
- the notes links
- the contact form, which needs a backend or form service to send messages

## Deploy

Works on GitHub Pages as is: Settings → Pages → deploy from the `main` branch, root folder.
