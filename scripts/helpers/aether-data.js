/* global hexo */
/**
 * Aether scheme data helpers.
 *
 * All helpers are namespaced as `aether_*` and silently degrade to empty
 * arrays / sensible fallbacks when the underlying data isn't present, so
 * the home page can render against real content (702-post production blog)
 * even when none of the posts opt in to Aether-specific frontmatter.
 *
 * Conventions
 *   site.posts                   the regular post collection
 *   post.type === 'visual'       photo set / travel log
 *   post.type === 'note'         short reflection / memo
 *   post.series                  series id, e.g. 'AI Coding Evolution'
 */
'use strict';

const {
  aggregateSeries,
  displayTitle,
  postIssue,
  isNotePost,
  isRegularPost,
  isVisualPost,
  taxonomyNames
} = require('../lib/aether-content');

const { appearanceStyle, colorMode, glassOptions, homeSections, number, sitePath } = require('../lib/aether-config');

const stripTags = (html = '') => String(html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

function catLabel(name, labels = {}) {
  return labels[name] || name;
}

function ensureArr(x) {
  if (!x) return [];
  if (Array.isArray(x)) return x;
  if (typeof x === 'string') return [x];
  if (typeof x.toArray === 'function') return x.toArray();
  return [];
}

function findBySlug(posts, slug) {
  if (!slug) return null;
  const norm = String(slug).replace(/^\/+|\/+$/g, '');
  const asDash = norm.replace(/\//g, '-');
  return posts.find(p => {
    if (!p) return false;
    const path = (p.path || '').replace(/^\/+|\/+$/g, '');
    const perma = (p.permalink || '').replace(/^\/+|\/+$/g, '');
    return p.slug === slug
      || p.slug === norm
      || path === norm
      || path === asDash
      || perma === norm
      || (path && path.endsWith('/' + norm))
      || (path && path.endsWith('/' + asDash));
  });
}


// Keep year wrappers structurally balanced inside each template loop.
hexo.extend.helper.register('aether_archive_groups', function(collection) {
  const posts = Array.isArray(collection) ? collection : collection?.toArray() || [];
  const groups = new Map();
  for (const post of posts) {
    const year = this.date(post.date, 'YYYY');
    if (!groups.has(year)) groups.set(year, { year, posts: [] });
    groups.get(year).posts.push(post);
  }
  return [...groups.values()];
});

// ---------- Latest writing ----------
hexo.extend.helper.register('aether_latest', function(limit) {
  const cfg = (this.theme.aether && this.theme.aether.latest) || {};
  const n = number(limit ?? cfg.limit, 3, 0, 50);
  return (this.site.posts || { toArray: () => [] }).toArray()
    .filter(isRegularPost)
    .sort((a, b) => b.date - a.date)
    .slice(0, n);
});


// ---------- Visuals ----------
hexo.extend.helper.register('aether_visuals', function(limit) {
  const cfg = (this.theme.aether && this.theme.aether.visuals) || {};
  const n = number(limit ?? cfg.limit, 4, 0, Number.MAX_SAFE_INTEGER);
  const posts = (this.site.posts || { toArray: () => [] }).toArray();
  const selection = ensureArr(cfg.posts);
  if (selection.length) {
    return [...new Set(selection)].map(slug => findBySlug(posts, slug)).filter(Boolean).slice(0, n);
  }
  return posts
    .filter(isVisualPost)
    .filter(post => {
      const tags = taxonomyNames(post.tags);
      return post.type === 'visual' || !tags.some(tag => /^(Typography|VisualDesign)$/i.test(tag));
    })
    .sort((a, b) => b.date - a.date)
    .slice(0, n);
});


// ---------- Notes ----------
hexo.extend.helper.register('aether_notes', function(limit) {
  const cfg = (this.theme.aether && this.theme.aether.notes) || {};
  const n = number(limit ?? cfg.limit, 3, 0, 50);
  return (this.site.posts || { toArray: () => [] }).toArray()
    .filter(isNotePost)
    .sort((a, b) => b.date - a.date)
    .slice(0, n);
});


// ---------- Series (auto-aggregate from frontmatter `series`) ----------
hexo.extend.helper.register('aether_series', function() {
  return aggregateSeries(this.site.posts, this.theme.aether?.series?.rules || []);
});


// ---------- Reading Paths ----------
// Resolves curated path items: turns `[{intent, posts: [{slug,title?}]}]` into
// the same shape but with resolved post titles + urls. Drops posts that can't
// be found, drops paths that end up with no posts/url after resolution.
//
// Fallback chain when `posts` is empty or all unresolvable:
//   1. `category` + optional `limit` → pick latest N from that category
//   2. `tag` + optional `limit` → pick latest N from that tag
//   3. `series` → pick first N from that series
//   4. `url` → render as a single-link CTA card
function postShape(post, override, labels) {
  return {
    title   : (override && override.title) || post.title,
    url     : '/' + post.path,
    date    : post.date,
    category: post.categories && post.categories.length
      ? catLabel(post.categories.toArray ? post.categories.toArray()[0].name : post.categories[0].name, labels)
      : ''
  };
}

hexo.extend.helper.register('aether_paths', function() {
  const a = this.theme.aether || {};
  const cfg = a.start_here || a.paths || {};
  const raw = ensureArr(cfg.items);
  if (!raw.length) return [];

  const all = (this.site.posts || { toArray: () => [] }).toArray();
  const out = [];

  raw.forEach((item, idx) => {
    let resolved = ensureArr(item.posts).map(p => {
      const slug = typeof p === 'string' ? p : p.slug;
      const post = findBySlug(all, slug);
      return post ? postShape(post, typeof p === 'object' ? p : null, a.taxonomy?.labels) : null;
    }).filter(Boolean);

    // Fallback: pick by category
    if (!resolved.length && item.category) {
      const n = item.limit || 3;
      const wantedLc = String(item.category).toLowerCase();
      resolved = all
        .filter(p => isRegularPost(p) && p.categories && p.categories.length
          && (p.categories.toArray ? p.categories.toArray() : p.categories)
            .some(c => c.name && c.name.toLowerCase() === wantedLc))
        .sort((a, b) => b.date - a.date)
        .slice(0, n)
        .map(p => postShape(p, null, a.taxonomy?.labels));
    }

    // Fallback: pick by tag
    if (!resolved.length && item.tag) {
      const n = item.limit || 3;
      const wantedLc = String(item.tag).toLowerCase();
      resolved = all
        .filter(p => isRegularPost(p) && p.tags && p.tags.length
          && (p.tags.toArray ? p.tags.toArray() : p.tags)
            .some(t => t.name && t.name.toLowerCase() === wantedLc))
        .sort((a, b) => b.date - a.date)
        .slice(0, n)
        .map(p => postShape(p, null, a.taxonomy?.labels));
    }

    // Fallback: pick from a named series
    if (!resolved.length && item.series) {
      const n = item.limit || 3;
      resolved = all
        .filter(p => p.series === item.series)
        .sort((a, b) => a.date - b.date)
        .slice(0, n)
        .map(p => postShape(p, null, a.taxonomy?.labels));
    }

    // CTA-style path (no posts, just a destination)
    if (!resolved.length && item.url) {
      out.push({
        index      : String(idx + 1).padStart(2, '0'),
        intent     : item.intent || '',
        description: item.description || '',
        url        : item.url,
        cta        : item.cta || '查看 →',
        posts      : []
      });
      return;
    }

    if (!resolved.length) return;
    out.push({
      index      : String(idx + 1).padStart(2, '0'),
      intent     : item.intent || '',
      description: item.description || '',
      url        : item.url || null,
      cta        : item.cta || null,
      posts      : resolved
    });
  });

  return out;
});


// ---------- Reading time ----------
hexo.extend.helper.register('aether_reading_time', function(post) {
  if (!post) return 0;
  const wordsPerMinute = 250; // Roughly tuned for mixed CJK + EN
  const text = stripTags(post.content || post.excerpt || '');
  const cjk = (text.match(/[一-鿿㐀-䶿]/g) || []).length;
  const words = text.split(/\s+/).filter(Boolean).length - cjk;
  const tokens = words + cjk;
  return Math.max(1, Math.round(tokens / wordsPerMinute));
});


// ---------- Summary fallback ----------
hexo.extend.helper.register('aether_summary', function(post, max) {
  if (!post) return '';
  const limit = max || 110;
  const explicit = post.description || post.excerpt;
  const raw = stripTags(explicit || post.content || '');
  if (raw.length <= limit) return raw;
  // try to break on a CJK punctuation or whitespace before the limit
  const trimmed = raw.slice(0, limit);
  const lastBreak = Math.max(
    trimmed.lastIndexOf('。'),
    trimmed.lastIndexOf('，'),
    trimmed.lastIndexOf('；'),
    trimmed.lastIndexOf('：'),
    trimmed.lastIndexOf(' '),
    trimmed.lastIndexOf('.'),
    trimmed.lastIndexOf(',')
  );
  return (lastBreak > limit * 0.6 ? trimmed.slice(0, lastBreak) : trimmed) + '…';
});


// ---------- Format helpers ----------
hexo.extend.helper.register('aether_pad', function(n, width = 2) {
  return String(n).padStart(width, '0');
});

hexo.extend.helper.register('aether_iso_date', function(date) {
  if (!date) return '';
  const d = date && date.toDate ? date.toDate() : new Date(date);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
});

hexo.extend.helper.register('aether_post_url', function(post) {
  if (!post) return '#';
  return sitePath(post.path, this.config?.root);
});

hexo.extend.helper.register('aether_post_category', function(post) {
  if (!post || !post.categories || !post.categories.length) return '';
  const first = post.categories.toArray ? post.categories.toArray()[0] : post.categories[0];
  return first ? catLabel(first.name, this.theme.aether?.taxonomy?.labels) : '';
});

// Use explicit photography first, then the first image in a rendered travel post.
hexo.extend.helper.register('aether_visual_cover', function(post) {
  const photo = ensureArr(post.photos)[0];
  const explicit = post.cover || (typeof photo === 'string' ? photo : photo && photo.url);
  const match = String(post.content || '').match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i);
  const cover = explicit || (match ? match[1] : '');
  // This image host supports HTTPS; avoid legacy HTTP redirects and mixed content.
  const value = String(cover);
  const hosts = this.theme.aether?.images?.https_hosts || [];
  try {
    const url = new URL(value);
    if (url.protocol === 'http:' && hosts.includes(url.hostname)) url.protocol = 'https:';
    return url.href;
  } catch {
    return value;
  }
});

// Editorial hierarchy is configured by series identity, never by its array position.
hexo.extend.helper.register('aether_series_selection', function(items, featuredName) {
  const series = ensureArr(items);
  const featured = featuredName ? series.find(item => item.name === featuredName || item.slug === featuredName) : null;
  const others = series.filter(item => item !== featured)
    .sort((a, b) => (Number(b.count) || 0) - (Number(a.count) || 0)
      || b.latest_date - a.latest_date || a.name.localeCompare(b.name));
  return { featured: featured || null, others };
});

hexo.extend.helper.register('aether_display_title', function(post) {
  return displayTitle(post, this.theme.aether?.series?.rules || []);
});
hexo.extend.helper.register('aether_post_issue', function(post) {
  return postIssue(post, this.theme.aether?.series?.rules || []);
});
hexo.extend.helper.register('aether_category_label', function(name) {
  return catLabel(name, this.theme.aether?.taxonomy?.labels);
});

hexo.extend.helper.register('aether_visual_archive', function() {
  const selected = this.aether_visuals(Number.MAX_SAFE_INTEGER);
  const paths = new Set(selected.map(post => post.path));
  const others = this.site.posts.toArray().filter(isVisualPost)
    .filter(post => !paths.has(post.path)).sort((a, b) => b.date - a.date);
  return { selected, others };
});

hexo.extend.helper.register('aether_home_sections', function() {
  return homeSections(this.theme.aether);
});
hexo.extend.helper.register('aether_styles', function() {
  return appearanceStyle(this.theme.aether);
});
hexo.extend.helper.register('aether_glass', function() {
  return glassOptions(this.theme.aether);
});
hexo.extend.helper.register('aether_text', function(key, value) {
  const text = this.theme.aether?.labels?.[key] || this.__(`aether.${key}`);
  return value === undefined ? text : text.replace('{value}', value);
});

hexo.extend.helper.register('aether_search_settings', function() {
  const cfg = this.theme.aether?.cmdk || {};
  const keys = ['loading', 'indexed', 'search_failed', 'no_results', 'results', 'post', 'series', 'visual', 'note', 'page', 'category'];
  const messages = Object.fromEntries(keys.map(key => [key, this.theme.aether?.labels?.[key] || this.__(`aether.${key}`)]));
  return JSON.stringify({
    index   : sitePath('aether-search.json', this.config.root),
    fallback: sitePath(cfg.fallback_url || 'archives/', this.config.root),
    recent  : number(cfg.recent_count, 4, 0, 20),
    limit   : number(cfg.result_limit, 30, 1, 100), messages
  });
});

hexo.extend.helper.register('aether_mode', function() { return colorMode(this.theme.aether); });
