#!/usr/bin/env node
/*
 * Writes the crawler-facing parts of index.html from the page's own data constants
 * (SERVICES, APPS, LINKS, TALKS, EVENTS, BLOGS), so they never drift from what React renders:
 *
 *   <!-- seo:jsonld -->   … structured data (Person, WebSite, ProfilePage) in <head>
 *   <!-- seo:static -->   … plain HTML inside #root for crawlers and AI agents that do not run
 *                           JavaScript. React replaces it on mount; it stays invisible unless
 *                           the scripts fail to load, so people never see it flash.
 *
 * Run after editing those constants:  node tools/prerender.js
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'index.html');
const SITE = 'https://dinoyraj.com/';
const FULL_NAME = 'Dinoy Raj';

let src = fs.readFileSync(FILE, 'utf8');

// Evaluate the data block of the page script (no DOM or React needed: only constants and unused functions).
const start = src.indexOf('  const NAME = ');
const end = src.indexOf('  const STATEMENT = ');
if (start < 0 || end < 0) throw new Error('Could not find the data constants in index.html');
const data = new Function(src.slice(start, end) + '\nreturn { NAME, EMAIL, SERVICES, APPS, LINKS, TALKS, EVENTS, BLOGS };')();
const { EMAIL, SERVICES, APPS, LINKS, TALKS, EVENTS, BLOGS } = data;

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const person = {
  '@type': 'Person',
  '@id': SITE + '#person',
  name: FULL_NAME,
  givenName: 'Dinoy',
  familyName: 'Raj',
  url: SITE,
  image: SITE + 'assets/dinoy.jpg',
  jobTitle: 'Android Developer',
  description: 'Android developer and conference speaker who designs and builds focused Android apps in Kotlin and Jetpack Compose.',
  email: 'mailto:' + EMAIL,
  knowsAbout: ['Android', 'Kotlin', 'Jetpack Compose', 'Material 3 Expressive', 'Design systems', 'Gemini Nano', 'On-device AI', 'Android launchers', 'App Functions'],
  sameAs: Object.values(LINKS),
};
const jsonld = {
  '@context': 'https://schema.org',
  '@graph': [
    person,
    { '@type': 'WebSite', '@id': SITE + '#website', url: SITE, name: FULL_NAME, inLanguage: 'en', publisher: { '@id': SITE + '#person' } },
    { '@type': 'ProfilePage', '@id': SITE + '#profile', url: SITE, name: FULL_NAME + ' · Android Developer & Speaker', isPartOf: { '@id': SITE + '#website' }, mainEntity: { '@id': SITE + '#person' }, primaryImageOfPage: SITE + 'assets/og.jpg' },
  ],
};
const jsonldBlock = `<script type="application/ld+json">\n${JSON.stringify(jsonld, null, 1).replace(/</g, '\\u003c')}\n</script>`;

const li = (items, f) => `<ul>\n${items.map(x => '  <li>' + f(x) + '</li>').join('\n')}\n</ul>`;
const staticBlock = `<div class="seo-static">
<header><p><a href="/">${FULL_NAME}</a></p></header>
<main>
<h1>${FULL_NAME}, Android Developer</h1>
<p>I'm ${FULL_NAME}, an Android developer who designs the apps before building them. I build focused Android apps in Kotlin and Jetpack Compose: timers, habit trackers, link managers, and blockers for the feeds that eat your evening. Every project starts from Expressive Kit, my own Material 3 Expressive design system.</p>
<h2>Services</h2>
${li(SERVICES, s => `<strong>${esc(s.name)}</strong>: ${esc(s.tags.join(', '))}`)}
<h2>My apps</h2>
${li(APPS, a => `<h3>${esc(a.name)}</h3><p>${esc(a.store)}${a.status === 'wip' ? ' (in progress)' : ''}. ${esc(a.desc)}</p>${a.links ? ' ' + a.links.map(([l, h]) => `<a href="${esc(h)}">${esc(a.name)} on ${esc(l)}</a>`).join(' · ') : ''}`)}
<p><a href="${esc(LINKS.play)}">All apps on Google Play</a></p>
<h2>Talks</h2>
${li(TALKS, t => `${esc(t.text)} (${esc(t.sub)})`)}
<p><a href="${esc(LINKS.sessionize)}">All talks on Sessionize</a></p>
<h3>Where I'm speaking</h3>
${li(EVENTS, e => `${esc(e.name)}, ${esc(e.where)}, ${esc(e.when)}${e.up ? ' (upcoming)' : ''}`)}
<h2>Blogs</h2>
${li(BLOGS, b => `<a href="${esc(b.href)}">${esc(b.title)}</a>: ${esc(b.blurb)} (${esc(b.eyebrow)})`)}
<p><a href="${esc(LINKS.medium)}">Read all on Medium</a></p>
<h2>Contact</h2>
<p>Email: <a href="mailto:${esc(EMAIL)}">${esc(EMAIL)}</a></p>
${li([['GitHub', LINKS.github], ['LinkedIn', LINKS.linkedin], ['Medium', LINKS.medium], ['Sessionize', LINKS.sessionize], ['Google Play', LINKS.play], ['X', LINKS.x], ['YouTube', LINKS.youtube], ['Instagram', LINKS.instagram]], ([l, h]) => `<a href="${esc(h)}">${l}</a>`)}
</main>
</div>`;

function put(marker, block) {
  const re = new RegExp(`<!-- ${marker} -->[\\s\\S]*?<!-- /${marker} -->`);
  if (!re.test(src)) throw new Error(`Marker <!-- ${marker} --> not found in index.html`);
  src = src.replace(re, () => `<!-- ${marker} -->\n${block}\n<!-- /${marker} -->`);
}
put('seo:jsonld', jsonldBlock);
put('seo:static', staticBlock);
fs.writeFileSync(FILE, src);
console.log('index.html: JSON-LD and static fallback updated.');
