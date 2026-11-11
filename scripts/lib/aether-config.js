'use strict';

const sections = ['hero', 'latest', 'paths', 'series', 'personal', 'subscribe'];
const palettes = {
  light: { paper: '#f5f8f6', paper_tint: '#e8f0eb', surface: '#fbfdfc', surface_alt: '#eaf1ec', ink: '#18251f', ink_secondary: '#30453a', muted: '#53665b', accent: '#345b4b', accent_hover: '#203f31', accent_tint: '#e1ede5', rule: '#d3dfd7', rule_strong: '#bacdc0', environment: '#dcece3' },
  dark : { paper: '#101815', paper_tint: '#1e3027', surface: '#18251f', surface_alt: '#20352a', ink: '#eaf2ed', ink_secondary: '#d0dfd5', muted: '#acbfb2', accent: '#a8d2bb', accent_hover: '#c9ead8', accent_tint: '#243c2f', rule: '#354c3e', rule_strong: '#476452', environment: '#244234' }
};
const variables = { paper: 'paper', paper_tint: 'paper-tint', surface: 'surface', surface_alt: 'surface-2', ink: 'ink', ink_secondary: 'ink-2', muted: 'muted', accent: 'accent', accent_hover: 'accent-hover', accent_tint: 'accent-tint', rule: 'rule', rule_strong: 'rule-2', environment: 'environment' };

function number(value, fallback, min, max) {
  const result = value === undefined ? fallback : Number(value);
  if (!Number.isFinite(result) || result < min || result > max) throw new Error(`Aether: expected a number between ${min} and ${max}, received ${value}`);
  return result;
}

function color(value) {
  if (!/^#[a-f\d]{6}$/i.test(value)) throw new Error(`Aether: expected a six-digit hex color, received ${value}`);
  return value;
}

function rgba(hex, alpha) {
  color(hex);
  const rgb = [1, 3, 5].map(start => parseInt(hex.slice(start, start + 2), 16));
  return `rgba(${rgb.join(',')},${alpha})`;
}

function sitePath(path, root = '/') {
  if (!path || /^(?:[a-z][\w+.-]*:|\/\/|#)/i.test(path)) return path || '#';
  const prefix = '/' + String(root).replace(/^\/+|\/+$/g, '');
  const base = prefix === '/' ? '/' : prefix + '/';
  const absolute = '/' + String(path).replace(/^\/+/, '');
  if (base !== '/' && (absolute === prefix || absolute.startsWith(base))) return absolute;
  return base + absolute.slice(1);
}

function homeSections(config = {}) {
  const order = config.home?.sections || sections;
  if (!Array.isArray(order) || order.some(id => !sections.includes(id))) throw new Error('Aether: home.sections must contain only hero, latest, paths, series, personal, subscribe');
  return [...new Set(order)];
}

function colorMode(config = {}) {
  const mode = config.appearance?.mode || 'auto';
  if (!['auto', 'light', 'dark'].includes(mode)) throw new Error('Aether: appearance.mode must be auto, light or dark');
  return mode;
}

function glassOptions(config = {}) {
  const glass = config.appearance?.glass || {};
  return {
    enable : glass.enable !== false,
    pointer: glass.enable !== false && glass.pointer !== false,
    follow : number(glass.follow_duration, 100, 0, 500)
  };
}

function appearanceStyle(config = {}) {
  const appearance = config.appearance || {};
  const glass = appearance.glass || {};
  const layout = appearance.layout || {};
  const font = appearance.font || {};
  const result = [];
  for (const mode of ['light', 'dark']) {
    const palette = { ...palettes[mode], ...appearance.palette?.[mode] };
    const declarations = Object.entries(variables).map(([key, name]) => `--aether-${name}:${color(palette[key])}`);
    declarations.push(`--aether-muted-2:${palette.muted}`, `--aether-fg-2:${palette.muted}`, `--body-bg-color:${palette.paper}`, `--content-bg-color:${palette.paper}`, `--text-color:${palette.ink}`);
    const light = mode === 'light';
    declarations.push(
      `--aether-liquid-surface:${rgba(glass.surface?.[mode] || (light ? '#f5fff9' : '#1a2c22'), number(glass.opacity?.[mode], light ? 0.56 : 0.66, 0, 1))}`,
      `--aether-liquid-reflection:${rgba(light ? '#ffffff' : '#cef4de', number(glass.reflection?.[mode], light ? 0.82 : 0.24, 0, 1))}`,
      `--aether-liquid-rim:${rgba(light ? '#ffffff' : '#dbffe7', number(glass.rim?.[mode], light ? 0.95 : 0.36, 0, 1))}`,
      `--aether-liquid-blur:${number(glass.blur, 16, 0, 40)}px`,
      `--aether-liquid-saturation:${number(glass.saturation, 160, 100, 200)}%`,
      `--aether-site-width:${number(layout.width, 1180, 800, 1600)}px`,
      `--aether-article-width:${number(layout.article_width, 720, 480, 960)}px`,
      `--aether-gutter:${number(layout.gutter, 50, 20, 80)}px`,
      `--aether-mobile-gutter:${number(layout.mobile_gutter, 20, 12, 32)}px`
    );
    for (const key of ['serif', 'sans', 'mono']) {
      if (!font[key]) continue;
      if (!/^[\w\s,'"\-\u3400-\u9fff]+$/u.test(font[key])) throw new Error(`Aether: invalid ${key} font family`);
      declarations.push(`--aether-ff-${key}:${font[key]}`);
    }
    const selector = light ? 'body[data-aether]' : '[data-color-scheme="dark"] body[data-aether]';
    result.push(`${selector}{${declarations.join(';')}}`);
  }
  if (!glassOptions(config).enable) result.push('body[data-aether] .header,body[data-aether] .aether-home .aether-series-lead,body[data-aether] .aether-cmdk__panel,body[data-aether] .aether-si-card.is-featured,body[data-aether] .aether-subscribe-panel{background:var(--aether-surface);backdrop-filter:none;-webkit-backdrop-filter:none;box-shadow:none}body[data-aether] .header::before,body[data-aether] .aether-home .aether-series-lead::before{display:none}');
  return result.join('\n');
}

module.exports = { appearanceStyle, colorMode, glassOptions, homeSections, number, sitePath };
