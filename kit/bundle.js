/* @ds-bundle: {"format":4,"namespace":"Expressive","components":[{"name":"Button"},{"name":"IconButton"},{"name":"Fab"},{"name":"ButtonGroup"},{"name":"Chip"},{"name":"Badge"},{"name":"ValuePill"},{"name":"NavigationBar"},{"name":"TopBar"},{"name":"SearchBar"},{"name":"TextField"},{"name":"Switch"},{"name":"Slider"},{"name":"WavyProgress"},{"name":"Card"},{"name":"ListItem"},{"name":"GroupedList"},{"name":"StatTile"},{"name":"ShapeAvatar"},{"name":"BottomSheet"},{"name":"SummaryList"},{"name":"Snackbar"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  var useState = React.useState;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }
  function Icon(name, filled, extra) { return name ? h('span', { className: cx('ex-icon', filled && 'is-filled', extra), 'aria-hidden': 'true' }, name) : null; }

  /* The M3 Expressive shape library, as polar functions r(t) on a unit circle. */
  var SHAPES = {
    circle: function () { return 1; },
    cookie4: function (t) { return 1 + 0.08 * Math.cos(4 * t); },
    cookie6: function (t) { return 1 + 0.12 * Math.cos(6 * t); },
    cookie9: function (t) { return 1 + 0.075 * Math.cos(9 * t); },
    cookie12: function (t) { return 1 + 0.05 * Math.cos(12 * t); },
    clover4: function (t) { return 0.9 + 0.22 * Math.pow(Math.abs(Math.cos(2 * t)), 1.6); },
    flower5: function (t) { return 1 + 0.16 * Math.cos(5 * t); },
    flower8: function (t) { return 1 + 0.17 * Math.cos(8 * t); },
    sunny: function (t) { return 1 + 0.04 * Math.cos(8 * t + 0.4); },
    burst: function (t) { return 1 + 0.13 * Math.cos(10 * t); },
    pebble: function (t) { return 0.94 + 0.12 * Math.cos(3 * t); }
  };
  var pathCache = {};
  function shapePath(name) {
    if (pathCache[name]) return pathCache[name];
    var fn = SHAPES[name] || SHAPES.circle, N = 180, d = '';
    var max = 0, pts = [];
    for (var i = 0; i < N; i++) { var t = i / N * 2 * Math.PI, r = fn(t); max = Math.max(max, r); pts.push([r * Math.cos(t - Math.PI / 2), r * Math.sin(t - Math.PI / 2)]); }
    for (var j = 0; j < N; j++) { d += (j ? 'L' : 'M') + (pts[j][0] / max).toFixed(4) + ' ' + (pts[j][1] / max).toFixed(4); }
    return (pathCache[name] = d + 'Z');
  }

  function Button(p) {
    var variant = p.variant || 'filled', size = p.size || 'sm';
    var rest = Object.assign({}, p); ['variant', 'size', 'icon', 'tone', 'fullWidth', 'className', 'children'].forEach(function (k) { delete rest[k]; });
    return h('button', Object.assign({ type: 'button' }, rest, { className: cx('ex-press ex-btn', 'v-' + variant, 'size-' + size, p.tone && 't-' + p.tone, p.fullWidth && 'full', p.className) }), Icon(p.icon), p.children);
  }

  function IconButton(p) {
    var variant = p.variant || 'standard';
    return h('button', { type: 'button', className: cx('ex-press ex-iconbtn', 'v-' + variant, p.size === 'sm' && 'size-sm', p.selected && 'is-selected', p.className), 'aria-label': p.label, 'aria-pressed': p.selected == null ? undefined : !!p.selected, onClick: p.onClick, disabled: p.disabled }, Icon(p.icon, p.selected));
  }

  function Fab(p) {
    return h('button', { type: 'button', className: cx('ex-press ex-fab', 't-' + (p.tone || 'primary'), p.size === 'lg' && 'size-lg', p.label && 'has-label', p.className), 'aria-label': p.label ? undefined : p.ariaLabel, onClick: p.onClick }, Icon(p.icon, true), p.label);
  }

  function ButtonGroup(p) {
    var controlled = p.value !== undefined;
    var st = useState(p.defaultValue !== undefined ? p.defaultValue : (p.options[0] && p.options[0].value));
    var value = controlled ? p.value : st[0];
    var hasSub = p.options.some(function (o) { return o.sub; });
    return h('div', { role: 'radiogroup', 'aria-label': p.label, className: cx('ex-bgroup', p.fit && 'is-fit', p.tone && 't-' + p.tone, hasSub && 'has-sub', p.className) },
      p.options.map(function (o) {
        var sel = o.value === value;
        return h('button', { key: o.value, type: 'button', role: 'radio', 'aria-checked': sel, className: cx('ex-press ex-seg', sel && 'is-selected'), onClick: function () { if (!controlled) st[1](o.value); if (p.onChange) p.onChange(o.value); } },
          Icon(o.icon, sel), hasSub ? h('span', null, o.label, h('span', { className: 'ex-seg-sub' }, o.sub)) : o.label);
      }));
  }

  function Chip(p) {
    var st = useState(!!p.defaultSelected);
    var sel = p.selected !== undefined ? p.selected : st[0];
    var icon = p.icon || (sel && p.variant !== 'tonal' ? 'check' : null);
    return h('button', { type: 'button', 'aria-pressed': sel, className: cx('ex-press ex-chip', p.variant === 'tonal' && 'v-tonal', sel && 'is-selected', p.className), onClick: function () { if (p.selected === undefined) st[1](!sel); if (p.onClick) p.onClick(!sel); } },
      Icon(icon, sel), p.label, p.count != null ? h('span', { className: 'ex-chip-count' }, p.count) : null);
  }

  function Badge(p) {
    return h('span', { className: cx('ex-badge', p.tone && 't-' + p.tone, p.mono && 'is-mono', p.count != null && 'is-count', p.className) }, p.dot ? h('span', { className: 'dot' }) : null, p.count != null ? p.count : p.children);
  }

  function ValuePill(p) {
    var dir = p.direction || 'up';
    if (p.inline) return h('span', { className: cx('ex-delta', dir) }, Icon(dir === 'up' ? 'arrow_drop_up' : 'arrow_drop_down', true), p.children);
    return h('span', { className: cx('ex-vpill', dir, p.solid && 'is-solid') }, Icon(dir === 'up' ? 'arrow_drop_up' : 'arrow_drop_down', true), p.children);
  }

  function NavigationBar(p) {
    var st = useState(p.defaultValue !== undefined ? p.defaultValue : 0);
    var active = p.value !== undefined ? p.value : st[0];
    return h('nav', { className: cx('ex-navbar', p.className), 'aria-label': p.label || 'Main' },
      p.items.map(function (it, i) {
        var on = i === active;
        return h('button', { key: it.label, type: 'button', className: cx('ex-press ex-navitem', on && 'is-active'), 'aria-current': on ? 'page' : undefined, onClick: function () { if (p.value === undefined) st[1](i); if (p.onChange) p.onChange(i); } },
          h('span', { className: 'ex-navpill' }, Icon(it.icon, on), it.badge ? h(Badge, { count: it.badge }) : null), it.label);
      }));
  }

  function TopBar(p) {
    var lead = p.leading === 'back' ? h(IconButton, { icon: 'arrow_back', label: 'Back', onClick: p.onLeading }) : p.leading === 'close' ? h(IconButton, { icon: 'close', label: 'Close', onClick: p.onLeading }) : null;
    var actions = (p.actions || []).map(function (a) { return h(IconButton, { key: a.icon, icon: a.icon, label: a.label, onClick: a.onClick, selected: a.selected }); });
    if (p.size === 'small') {
      return h('header', { className: 'ex-topbar' }, h('div', { className: 'ex-topbar-row' }, lead, h('h1', { className: 'ex-topbar-title' }, p.title), h('div', { className: 'ex-topbar-actions' }, actions)));
    }
    var titleClass = p.display ? 'display-small' : 'headline-large';
    return h('header', { className: 'ex-topbar' },
      (lead || actions.length) ? h('div', { className: 'ex-topbar-row' }, lead, h('div', { className: 'ex-topbar-actions' }, actions)) : null,
      h('div', { className: 'ex-topbar-large' },
        p.eyebrow ? h('div', { className: 'eyebrow', style: { color: 'var(--on-surface-variant)' } }, p.eyebrow) : null,
        h('h1', { className: titleClass, style: p.display ? { fontFamily: 'var(--font-display)' } : null }, p.title),
        p.subtitle ? h('p', { className: 'ex-topbar-sub body-large' }, p.subtitle) : null));
  }

  function SearchBar(p) {
    var st = useState(p.defaultValue || '');
    return h('label', { className: cx('ex-search', p.className) },
      h('span', { className: 'ex-search-lead' }, Icon(p.icon || 'search')),
      h('input', { type: 'search', id: p.id, placeholder: p.placeholder || 'Search', value: st[0], onChange: function (e) { st[1](e.target.value); if (p.onChange) p.onChange(e.target.value); }, 'aria-label': p.placeholder || 'Search' }),
      st[0] ? h(IconButton, { icon: 'close', label: 'Clear', size: 'sm', onClick: function () { st[1](''); } }) : (p.trailing || null));
  }

  function TextField(p) {
    var st = useState(p.defaultValue || '');
    var Tag = p.multiline ? 'textarea' : 'input';
    return h('div', { className: cx('ex-field', p.variant === 'filled' && 'is-filled', p.error && 'is-error', p.className) },
      h('label', { className: 'ex-field-box' },
        p.label ? h('span', { className: 'ex-field-label' }, p.label) : null,
        h(Tag, { id: p.id, value: st[0], placeholder: p.placeholder, inputMode: p.inputMode, 'aria-invalid': p.error ? true : undefined, onChange: function (e) { st[1](e.target.value); if (p.onChange) p.onChange(e.target.value); } }),
        p.trailingIcon ? h('span', { className: 'ex-field-trail' }, Icon(p.trailingIcon)) : null),
      (p.error || p.supportingText) ? h('div', { className: 'ex-field-support' }, p.error || p.supportingText) : null);
  }

  function Switch(p) {
    var st = useState(!!p.defaultChecked);
    var on = p.checked !== undefined ? p.checked : st[0];
    var sw = h('button', { type: 'button', role: 'switch', 'aria-checked': on, 'aria-label': p.label, className: cx('ex-press ex-switch', on && 'is-on'), onClick: function () { if (p.checked === undefined) st[1](!on); if (p.onChange) p.onChange(!on); } },
      h('span', { className: 'thumb' }, Icon('check')));
    if (!p.label) return sw;
    return h('div', { className: 'ex-switch-row' }, h('div', { className: 'ex-switch-text' }, h('div', { className: 't' }, p.label), p.supportingText ? h('div', { className: 's' }, p.supportingText) : null), sw);
  }

  function Slider(p) {
    var min = p.min || 0, max = p.max == null ? 100 : p.max;
    var st = useState(p.defaultValue != null ? p.defaultValue : 50);
    var v = p.value != null ? p.value : st[0];
    var pct = (v - min) / (max - min) * 100;
    var fmt = p.format || function (x) { return x; };
    return h('div', { className: 'ex-slider' },
      p.label ? h('div', { className: 'ex-slider-head' }, h('span', { className: 'l' }, p.label), h('span', { className: 'v' }, fmt(v))) : null,
      p.supportingText ? h('div', { className: 'body-medium', style: { color: 'var(--on-surface-variant)', marginTop: '-4px' } }, p.supportingText) : null,
      h('div', { className: 'ex-slider-track' },
        h('div', { className: 'act', style: { width: 'calc(' + pct + '% - 6px)' } }),
        h('div', { className: 'rest', style: { width: 'calc(' + (100 - pct) + '% - 6px)' } }),
        h('input', { type: 'range', id: p.id, min: min, max: max, step: p.step || 1, value: v, 'aria-label': p.label, onChange: function (e) { var n = +e.target.value; if (p.value == null) st[1](n); if (p.onChange) p.onChange(n); } }),
        h('div', { className: 'handle', style: { left: pct + '%' } })));
  }

  function WavyProgress(p) {
    var value = Math.max(0, Math.min(1, p.value == null ? 0.5 : p.value));
    var W = 400, amp = p.flat ? 0 : 3, wl = 24, split = W * value, d = 'M2 8';
    for (var x = 2; x <= Math.max(2, split - 6); x += 2) d += 'L' + x + ' ' + (8 + amp * Math.sin(x / wl * 2 * Math.PI)).toFixed(2);
    return h('div', { className: cx('ex-progress', p.animated && 'is-animated'), role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': Math.round(value * 100), 'aria-label': p.label },
      p.label ? h('div', { className: 'ex-progress-label' }, p.label) : null,
      h('svg', { viewBox: '0 0 ' + W + ' 16', preserveAspectRatio: 'none', 'aria-hidden': 'true' },
        value > 0.01 ? h('path', { className: 'wave', d: d, vectorEffect: 'non-scaling-stroke' }) : null,
        value < 0.99 ? h('line', { className: 'rest', x1: Math.min(W - 2, split + 6), y1: 8, x2: W - 2, y2: 8, vectorEffect: 'non-scaling-stroke' }) : null,
        value < 0.99 ? h('circle', { className: 'stop', cx: W - 4, cy: 8, r: 2 }) : null));
  }

  function Card(p) {
    var Tag = p.onClick ? 'button' : 'div';
    return h(Tag, { className: cx('ex-card', 'v-' + (p.variant || 'low'), p.padding === 'sm' && 'pad-sm', p.onClick && 'is-pressable', p.className), onClick: p.onClick, style: Object.assign(p.onClick ? { border: 0, textAlign: 'left', font: 'inherit', color: 'inherit' } : {}, p.style || {}) },
      p.eyebrow ? h('div', { className: 'eyebrow' }, p.eyebrow) : null,
      p.title ? h('h3', { className: cx('ex-card-title', p.display ? 'headline-small' : 'title-large'), style: p.display ? { fontFamily: 'var(--font-display)', fontWeight: 600 } : null }, p.title) : null,
      p.body ? h('p', { className: 'ex-card-body body-medium' }, p.body) : null,
      p.children);
  }

  function ListItem(p) {
    return h(p.onClick ? 'button' : 'div', { className: cx(p.onClick && 'ex-press', 'ex-li', p.className), onClick: p.onClick, style: p.onClick ? { border: 0, font: 'inherit' } : null },
      p.leading || null,
      h('div', { className: 'ex-li-text' }, h('span', { className: 'h' }, p.headline), p.supporting ? h('span', { className: 's' }, p.supporting) : null, p.meta ? h('span', { className: 'm' }, p.meta) : null),
      p.trailing != null ? h('div', { className: 'ex-li-trail' }, p.trailing) : null);
  }

  function GroupedList(p) {
    return h('section', { className: 'ex-group' },
      p.title ? h('div', { className: 'ex-group-title' }, p.title) : null,
      React.Children.map(p.children, function (c) { return c ? h('div', { className: 'ex-group-item' }, c) : null; }));
  }

  function StatTile(p) {
    return h('div', { className: cx('ex-stat', p.tone && 't-' + p.tone) }, h('span', { className: cx('v', p.display && 'is-display') }, p.value), h('span', { className: 'l' }, p.label));
  }

  function ShapeAvatar(p) {
    var size = p.size || 40;
    return h('span', { className: cx('ex-shape', 't-' + (p.tone || 'primary-container'), p.spin && 'is-spin', p.className), style: { width: size, height: size }, role: p.label ? 'img' : undefined, 'aria-label': p.label },
      h('svg', { viewBox: '-1 -1 2 2', 'aria-hidden': 'true' }, h('path', { d: shapePath(p.shape || 'cookie9') })),
      p.icon ? h('span', { className: 'ex-shape-c' }, h('span', { className: 'ex-icon is-filled', style: { fontSize: Math.round(size * 0.5) }, 'aria-hidden': 'true' }, p.icon))
        : p.text ? h('span', { className: 'ex-shape-c', style: { fontSize: Math.round(size * 0.42) } }, p.text) : null);
  }
  ShapeAvatar.shapes = Object.keys(SHAPES);
  ShapeAvatar.path = shapePath;

  function BottomSheet(p) {
    return h('div', { className: 'ex-sheet-wrap' },
      h('div', { className: 'ex-sheet', role: 'dialog', 'aria-label': p.title },
        h('div', { className: 'ex-sheet-handle', 'aria-hidden': 'true' }),
        (p.title || p.eyebrow) ? h('div', { className: 'ex-sheet-head' },
          p.eyebrow ? h(Badge, { tone: p.eyebrowTone, mono: true, dot: true }, p.eyebrow) : null,
          p.title ? h('h2', { className: 'headline-medium', style: { fontFamily: 'var(--font-display)', fontWeight: 500 } }, p.title) : null,
          p.subtitle ? h('p', { className: 'body-medium', style: { margin: 0, color: 'var(--on-surface-variant)' } }, p.subtitle) : null) : null,
        p.children));
  }

  function SummaryList(p) {
    return h('div', { className: 'ex-summary' },
      p.rows.map(function (r, i) {
        return h('div', { key: i, className: cx('ex-summary-row', r.total && 'is-total') }, h('span', { className: 'k' }, r.label), h('span', { className: cx('val', r.tone && 't-' + r.tone) }, r.value));
      }),
      p.footnote ? h('div', { className: 'ex-summary-foot' }, p.footnote) : null);
  }

  function Snackbar(p) {
    return h('div', { className: 'ex-snack', role: 'status' }, h('span', { className: 'msg' }, p.message), p.action ? h('button', { type: 'button', className: 'ex-press', onClick: p.onAction }, p.action) : null);
  }

  var api = { Button: Button, IconButton: IconButton, Fab: Fab, ButtonGroup: ButtonGroup, Chip: Chip, Badge: Badge, ValuePill: ValuePill, NavigationBar: NavigationBar, TopBar: TopBar, SearchBar: SearchBar, TextField: TextField, Switch: Switch, Slider: Slider, WavyProgress: WavyProgress, Card: Card, ListItem: ListItem, GroupedList: GroupedList, StatTile: StatTile, ShapeAvatar: ShapeAvatar, BottomSheet: BottomSheet, SummaryList: SummaryList, Snackbar: Snackbar };
  window.Expressive = Object.assign(window.Expressive || {}, api);
})();
