/*
 * Luminous elastic press — a web port of the `luminousElasticClickable` Compose modifier
 * from Expressive Clock (github.com/samuelbeckman/expressive-clock, MIT, ui/Glass.kt).
 *
 * On press:   the element squishes to 95%, stretches toward the finger on one side (the pivot moves away
 *             from the touch), drifts a couple of pixels toward it, a ripple grows from the touch point and a
 *             luminous bloom follows the finger. On release everything springs back with overshoot.
 * On hover:   (mouse only) a faint bloom follows the cursor.
 *
 * It never touches the DOM React owns: the glow is a pointer-events:none overlay in <body>, and the element only
 * gets an inline transform while it is moving (restored when it settles).
 */
(function () {
  if (window.__luminousPress) return;
  window.__luminousPress = true;

  var SELECTOR = [
    'a.ex-btn', 'button', '.lnk', '.link-arrow', '.tix-item', '.note', '.soc', '.meta', '.kit',
    '.nav-name', 'footer a', '[data-luminous]'
  ].join(',');
  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var states = new Map();
  var raf = 0, lastT = 0;

  // ---- springs (same parameters as the Compose code; mass 1) ----
  function spring(x) { return { x: x, v: 0, t: x, k: 550, z: 0.82 }; }
  function setSpring(s, k, z) { s.k = k; s.z = z; }
  function stepSpring(s, dt) {
    var c = 2 * s.z * Math.sqrt(s.k);
    for (var left = dt; left > 0; left -= 0.004) {
      var h = Math.min(0.004, left);
      s.v += (-s.k * (s.x - s.t) - c * s.v) * h;
      s.x += s.v * h;
    }
  }
  function springAtRest(s) { return Math.abs(s.x - s.t) < 0.0005 && Math.abs(s.v) < 0.005; }
  function approach(cur, target, dt, ms) { // linear tween stand-in for tween(ms)
    var d = dt * 1000 / ms;
    return cur < target ? Math.min(target, cur + d) : Math.max(target, cur - d);
  }
  var easeOut = function (p) { return 1 - Math.pow(1 - p, 3); };

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function parseColor(str) {
    var m = str && str.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    var p = m[1].split(/[ ,/]+/).filter(Boolean).map(parseFloat);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  }
  function luminance(c) { return (0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b) / 255; }
  function bgOf(n) {
    var cs = getComputedStyle(n);
    if (cs.backgroundImage && cs.backgroundImage !== 'none' && !/url\(/.test(cs.backgroundImage)) return { r: 200, g: 120, b: 40, a: 1, image: true };
    var c = parseColor(cs.backgroundColor);
    return c && c.a > 0.5 ? c : null;
  }
  function effectiveBg(el) {
    // The element itself, or a child that covers most of it (e.g. a ticket painted by its two halves) ...
    var area = el.offsetWidth * el.offsetHeight, kids = [el].concat([].slice.call(el.querySelectorAll(':scope > *, :scope > * > *')));
    for (var i = 0; i < kids.length; i++) {
      var k = kids[i], c = bgOf(k);
      if (c && k.offsetWidth * k.offsetHeight >= area * 0.4) return c;
    }
    // ... otherwise whatever it sits on.
    for (var n = el.parentElement; n && n.nodeType === 1; n = n.parentElement) { var c2 = bgOf(n); if (c2) return c2; }
    return { r: 255, g: 255, b: 255, a: 1 };
  }
  // White bloom on dark surfaces (as in the app's dark theme) and on saturated ones, where a primary tint disappears.
  function wantsWhiteBloom(c) {
    var sat = (Math.max(c.r, c.g, c.b) - Math.min(c.r, c.g, c.b)) / 255;
    return c.image || luminance(c) < 0.5 || sat > 0.35;
  }
  function primaryColor() {
    var cs = getComputedStyle(document.documentElement);
    var probe = document.createElement('i');
    probe.style.color = (cs.getPropertyValue('--primary') || '').trim() || '#a63a17';
    document.body.appendChild(probe);
    var c = parseColor(getComputedStyle(probe).color);
    probe.remove();
    return c || { r: 166, g: 58, b: 23 };
  }
  function rgba(c, a) { return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + a.toFixed(3) + ')'; }

  function getState(el) {
    var s = states.get(el);
    if (s) return s;
    var cs = getComputedStyle(el);
    var bg = effectiveBg(el);
    var tp = cs.transitionProperty;
    s = {
      el: el,
      dx: spring(0), dy: spring(0), scale: spring(1),
      lum: 0, hover: 0, hovering: false, pressed: false,
      ripple: 1, rippleX: 0.5, rippleY: 0.5, touchX: 0.5, touchY: 0.5,
      dark: wantsWhiteBloom(bg),
      primary: primaryColor(),
      radius: cs.borderRadius,
      inlineTransform: el.style.transform,
      baseTransform: '', motion: false,
      inlineOrigin: el.style.transformOrigin,
      inlineTransition: el.style.transition,
      fixTransition: /(^|,\s*)(all|transform)(\s*,|$)/.test(tp),
      overlay: null
    };
    states.set(el, s);
    return s;
  }

  function ensureOverlay(s) {
    if (s.overlay) return;
    var o = document.createElement('div');
    o.setAttribute('aria-hidden', 'true');
    o.style.cssText = 'position:fixed;pointer-events:none;z-index:2147483646;overflow:hidden;border-radius:' + s.radius;
    document.body.appendChild(o);
    s.overlay = o;
  }

  // Called on press: freeze the element's own CSS transform (e.g. a hover tilt) as the base the spring builds on,
  // and stop its transform transition from fighting the spring.
  function beginMotion(s) {
    if (s.motion) return;
    s.motion = true;
    var cs = getComputedStyle(s.el);
    s.baseTransform = cs.transform === 'none' ? '' : cs.transform + ' ';
    if (s.fixTransition) {
      s.el.style.transition = /all/.test(cs.transitionProperty)
        ? 'background-color 200ms, color 200ms, border-color 200ms, border-radius 200ms, box-shadow 200ms'
        : cs.transition.split(/,(?![^(]*\))/).filter(function (t) { return !/^\s*transform\b/.test(t); }).join(',') || 'none';
    }
  }

  function localFraction(s, e) {
    var r = s.el.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
  }

  function updateTouch(s, e) {
    var f = localFraction(s, e);
    s.touchX = f.x; s.touchY = f.y;
    if (s.pressed && !reduceMotion) {
      s.dx.t = clamp(f.x * 2 - 1, -1, 1);
      s.dy.t = clamp(f.y * 2 - 1, -1, 1);
    }
  }

  // ---- pointer wiring (delegated, capture phase so nothing upstream can swallow it) ----
  var pressedState = null;
  addEventListener('pointerdown', function (e) {
    if (e.button !== 0) return;
    var el = e.target.closest && e.target.closest(SELECTOR);
    if (!el || el.disabled) return;
    var s = getState(el);
    ensureOverlay(s);
    beginMotion(s);
    s.pressed = true; pressedState = s;
    var f = localFraction(s, e);
    s.rippleX = clamp(f.x, 0, 1); s.rippleY = clamp(f.y, 0, 1); s.ripple = 0;
    [s.dx, s.dy].forEach(function (sp) { setSpring(sp, 550, 0.82); });
    setSpring(s.scale, 1400, 1); // ≈ tween(90ms) in
    s.scale.t = reduceMotion ? 1 : 0.95;
    updateTouch(s, e);
    kick();
  }, true);

  addEventListener('pointermove', function (e) {
    if (pressedState) { updateTouch(pressedState, e); kick(); }
    if (e.pointerType !== 'mouse') return;
    var el = e.target.closest && e.target.closest(SELECTOR);
    states.forEach(function (s) { if (s.el !== el) s.hovering = false; });
    if (el && !el.disabled) {
      var s = getState(el);
      ensureOverlay(s);
      s.hovering = true;
      if (!s.pressed) updateTouch(s, e);
      kick();
    }
  }, true);

  function release() {
    var s = pressedState;
    if (!s) return;
    pressedState = null;
    s.pressed = false;
    s.dx.t = 0; s.dy.t = 0; s.scale.t = 1;
    [s.dx, s.dy].forEach(function (sp) { setSpring(sp, 350, 0.52); });
    setSpring(s.scale, 420, 0.62);
    kick();
  }
  addEventListener('pointerup', release, true);
  addEventListener('pointercancel', release, true);
  addEventListener('blur', release);
  document.addEventListener('mouseleave', function () { states.forEach(function (s) { s.hovering = false; }); kick(); });

  // ---- frame loop ----
  function kick() { if (!raf) { lastT = performance.now(); raf = requestAnimationFrame(frame); } }

  function frame(now) {
    var dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;
    raf = 0;
    var busy = false;
    states.forEach(function (s) {
      stepSpring(s.dx, dt); stepSpring(s.dy, dt); stepSpring(s.scale, dt);
      s.lum = approach(s.lum, s.pressed ? 1 : 0, dt, s.pressed ? 120 : 260);
      s.hover = approach(s.hover, s.hovering ? 1 : 0, dt, s.hovering ? 160 : 300);
      if (s.ripple < 1) s.ripple = Math.min(1, s.ripple + dt * 1000 / 420);
      var rest = !s.pressed && springAtRest(s.dx) && springAtRest(s.dy) && springAtRest(s.scale) &&
        s.lum === 0 && s.hover === 0 && s.ripple >= 1;
      if (rest) { teardown(s); return; }
      busy = true;
      render(s);
    });
    if (busy) raf = requestAnimationFrame(frame);
  }

  function teardown(s) {
    var el = s.el;
    el.style.transform = s.inlineTransform;
    el.style.transformOrigin = s.inlineOrigin;
    el.style.transition = s.inlineTransition;
    if (s.overlay) s.overlay.remove();
    states.delete(el);
  }

  function render(s) {
    var el = s.el;
    var w0 = el.offsetWidth, h0 = el.offsetHeight;
    var maxDim = Math.max(w0, h0), minDim = Math.min(w0, h0);
    // Big cards would look rubbery at the full 9.2%: scale the stretch down with size.
    var maxStretch = 0.092 * clamp(110 / maxDim, 0.22, 1);
    var maxTranslate = 2.6;
    var dx = s.dx.x, dy = s.dy.x, sc = s.scale.x;
    var stretchX = 1 + maxStretch * Math.abs(dx) - 0.03 * Math.abs(dy) * (maxStretch / 0.092);
    var stretchY = 1 + maxStretch * 1.06 * Math.abs(dy) - 0.03 * Math.abs(dx) * (maxStretch / 0.092);
    var sx = sc * stretchX, sy = sc * stretchY;
    var px = clamp(0.5 - 0.30 * dx, 0.15, 0.85), py = clamp(0.5 - 0.30 * dy, 0.15, 0.85);
    var moving = Math.abs(sx - 1) > 1e-4 || Math.abs(sy - 1) > 1e-4 || Math.abs(dx) > 1e-4 || Math.abs(dy) > 1e-4;
    if (moving) {
      el.style.transformOrigin = (px * 100).toFixed(2) + '% ' + (py * 100).toFixed(2) + '%';
      el.style.transform = s.baseTransform + 'translate(' + (dx * maxTranslate).toFixed(2) + 'px,' + (dy * maxTranslate).toFixed(2) + 'px) scale(' + sx.toFixed(4) + ',' + sy.toFixed(4) + ')';
    } else {
      el.style.transform = s.inlineTransform;
      el.style.transformOrigin = s.inlineOrigin;
    }

    // Overlay sits exactly on the (transformed) element box.
    var r = el.getBoundingClientRect(), o = s.overlay;
    o.style.left = r.left + 'px'; o.style.top = r.top + 'px';
    o.style.width = r.width + 'px'; o.style.height = r.height + 'px';

    var a = Math.max(s.lum, s.hover * 0.42);
    var p = s.primary;
    var center = s.dark ? 'rgba(255,255,255,' + (0.48 * a).toFixed(3) + ')' : rgba(p, 0.28 * a);
    var outer = s.dark ? 'rgba(128,216,255,' + (0.22 * a).toFixed(3) + ')' : rgba(p, 0.11 * a);
    var tx = (s.touchX * r.width).toFixed(1), ty = (s.touchY * r.height).toFixed(1);
    var layers = [];

    var pr = s.ripple;
    var rippleA = (1 - pr) * (s.pressed ? 1 : s.lum);
    if (pr < 1 && rippleA > 0.01) {
      var rr = 12 + (Math.max(r.width, r.height) * 0.9 - 12) * easeOut(pr);
      var rc = s.dark ? 'rgba(255,255,255,' + (0.48 * 0.85 * rippleA * s.lum).toFixed(3) + ')' : rgba(p, 0.28 * 0.85 * rippleA * s.lum);
      var ro = s.dark ? 'rgba(128,216,255,' + (0.22 * 0.45 * rippleA * s.lum).toFixed(3) + ')' : rgba(p, 0.11 * 0.45 * rippleA * s.lum);
      layers.push('radial-gradient(circle ' + rr.toFixed(1) + 'px at ' + (s.rippleX * r.width).toFixed(1) + 'px ' + (s.rippleY * r.height).toFixed(1) + 'px,' + rc + ',' + ro + ',transparent)');
    }
    if (a > 0.01) {
      var R = s.dark ? maxDim * 0.75 : minDim * 1.15 + maxDim * 0.22;
      layers.push(s.dark
        ? 'radial-gradient(circle ' + R.toFixed(1) + 'px at ' + tx + 'px ' + ty + 'px,' + center + ',' + outer + ',transparent)'
        : 'radial-gradient(circle ' + R.toFixed(1) + 'px at ' + tx + 'px ' + ty + 'px,' + center + ' 0%,' + rgba(p, 0.15 * a) + ' 38%,' + rgba(p, 0.04 * a) + ' 72%,transparent 100%)');
    }
    o.style.background = layers.join(',') || 'none';
  }
})();
