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

React 18 and htm load from CDNs; fonts and Material Symbols load from Google Fonts.

## Before publishing

Replace the placeholders in `index.html`:

- `EMAIL` (currently `hello@yourdomain.com`)
- the portrait placeholder in the hero
- the GitHub, LinkedIn, Play Store and Instagram links
- the case-study and notes links
- the contact form, which needs a backend or form service to send messages

## Deploy

Deployed on Vercel (project `dinoport`, domains dinoyraj.com and www.dinoyraj.com). Every push to `main` triggers a production deployment; pushes to other branches get preview URLs.

`vercel.json` sets the framework to "Other", so Vercel serves the folder as static files with no install or build step.
