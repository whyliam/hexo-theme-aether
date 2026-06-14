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
  inferredSeriesName,
  isNotePost,
  isRegularPost,
  isVisualPost,
  slugifySeries
} = require('../lib/aether-content');

const stripTags = (html = '') => String(html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const CAT_ZH = {
  'AI & Systems'          : 'AI 与系统',
  'AI-Systems'            : 'AI 与系统',
  'Notes & Reflections'   : '笔记与随笔',
  'Notes-Reflections'     : '笔记与随笔',
  'Product & Intelligence': '产品与判断',
  'Product-Intelligence'  : '产品与判断',
  'Travel & Visuals'      : '旅行与影像',
  'Travel-Visuals'        : '旅行与影像',
  '技术'                    : '技术'
};

function catLabel(name) {
  return CAT_ZH[name] || name;
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


// ---------- Latest writing ----------
hexo.extend.helper.register('aether_latest', function(limit) {
  const cfg = (this.theme.aether && this.theme.aether.latest) || {};
  const n = limit || cfg.limit || 6;
  return (this.site.posts || { toArray: () => [] }).toArray()
    .filter(isRegularPost)
    .sort((a, b) => b.date - a.date)
    .slice(0, n);
});


// ---------- Visuals ----------
hexo.extend.helper.register('aether_visuals', function(limit) {
  const cfg = (this.theme.aether && this.theme.aether.visuals) || {};
  const n = limit || cfg.limit || 5;
  return (this.site.posts || { toArray: () => [] }).toArray()
    .filter(isVisualPost)
    .sort((a, b) => b.date - a.date)
    .slice(0, n);
});


// ---------- Notes ----------
hexo.extend.helper.register('aether_notes', function(limit) {
  const cfg = (this.theme.aether && this.theme.aether.notes) || {};
  const n = limit || cfg.limit || 4;
  return (this.site.posts || { toArray: () => [] }).toArray()
    .filter(isNotePost)
    .sort((a, b) => b.date - a.date)
    .slice(0, n);
});


// ---------- Series (auto-aggregate from frontmatter `series`) ----------
hexo.extend.helper.register('aether_series', function() {
  const all = (this.site.posts || { toArray: () => [] }).toArray()
    .filter(isRegularPost)
    .map(post => ({ post, name: inferredSeriesName(post) }))
    .filter(item => item.name);

  const map = new Map();
  all.forEach(({ post, name }) => {
    if (!map.has(name)) map.set(name, []);
    map.get(name).push(post);
  });

  const out = [];
  map.forEach((posts, name) => {
    posts.sort((a, b) => a.date - b.date);
    const slug = slugifySeries(name);
    out.push({
      name,
      slug,
      url        : '/series/' + encodeURI(slug) + '/',
      count      : posts.length,
      latest_date: posts[posts.length - 1].date,
      posts      : posts.map((p, idx) => ({
        index: String(idx + 1).padStart(2, '0'),
        title: p.title,
        url  : '/' + p.path,
        date : p.date
      }))
    });
  });

  // sort series by latest update desc
  out.sort((a, b) => b.latest_date - a.latest_date);
  return out;
});


// ---------- Knowledge index ----------
// Returns four-card data for the home "Knowledge Index" section.
// If `theme.aether.kindex.items` is configured, use that; otherwise auto-derive from categories.
hexo.extend.helper.register('aether_kindex', function() {
  const cfg = (this.theme.aether && this.theme.aether.kindex) || {};
  if (Array.isArray(cfg.items) && cfg.items.length) {
    return cfg.items;
  }

  const cats = (this.site.categories || { toArray: () => [] }).toArray()
    .filter(c => c.length > 0)
    .sort((a, b) => b.length - a.length)
    .slice(0, 4);

  return cats.map((cat, idx) => {
    const latest = cat.posts
      .toArray()
      .sort((a, b) => b.date - a.date)[0];
    return {
      index      : String(idx + 1).padStart(2, '0'),
      category   : catLabel(cat.name).toUpperCase(),
      title      : catLabel(cat.name),
      description: latest ? latest.description || '' : '',
      count      : cat.length,
      latest_date: latest ? latest.date : null,
      tags       : [],
      url        : '/' + cat.path
    };
  });
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
function postShape(post, override) {
  return {
    title   : (override && override.title) || post.title,
    url     : '/' + post.path,
    date    : post.date,
    category: post.categories && post.categories.length
      ? catLabel(post.categories.toArray ? post.categories.toArray()[0].name : post.categories[0].name)
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
      return post ? postShape(post, typeof p === 'object' ? p : null) : null;
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
        .map(p => postShape(p));
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
        .map(p => postShape(p));
    }

    // Fallback: pick from a named series
    if (!resolved.length && item.series) {
      const n = item.limit || 3;
      resolved = all
        .filter(p => p.series === item.series)
        .sort((a, b) => a.date - b.date)
        .slice(0, n)
        .map(p => postShape(p));
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
  return '/' + post.path;
});

hexo.extend.helper.register('aether_post_category', function(post) {
  if (!post || !post.categories || !post.categories.length) return '';
  const first = post.categories.toArray ? post.categories.toArray()[0] : post.categories[0];
  return first ? catLabel(first.name) : '';
});
