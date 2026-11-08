# Portfolio website

Personal portfolio of Dinoy, Android developer: apps, talks, blogs and ways to get in touch.

**Live:** [dinoyraj.com](https://dinoyraj.com)

Built with [Expressive Kit](https://github.com/dinoy-raj/Material-3-expressive-design-system-skill), a Material 3 Expressive design system.

## Pages

`index.html` is the whole site. Every app page (`/<slug>`) and its legal pages (`/<slug>/privacypolicy`, `/<slug>/termsofservice`) also has a static copy at `<slug>/…/index.html`. Each copy has its own title, description, canonical URL, social tags, JSON-LD and pre-rendered content, so search engines and link previews see the right page without running JavaScript. These copies are generated: after any change to `index.html`, run

```sh
node design/prerender.js
```

and commit the result.
