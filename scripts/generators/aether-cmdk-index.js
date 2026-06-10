/* global hexo */
/**
 * Aether — search index for ⌘K command palette
 *
 * Generates `/aether-search.json` containing every post + page + series + visual:
 *   { kind: 'post'|'series'|'visual'|'note'|'page', title, path, date, summary, category, tags }
 *
 * Designed to be small enough to ship to the client (no pagination, no fuzzy
 * algorithm preindex — the client filter does the substring match). For 700+
 * posts the index is ~150 KB uncompressed.
 *
 * The ⌘K UI lazy-fetches this on first open and caches in memory.
 */
'use strict';

const stripTags = (html = '') =>
  String(html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

hexo.extend.generator.register('aether-cmdk-index', function(locals) {
  const scheme = hexo.theme.config && hexo.theme.config.scheme;
  if (scheme !== 'Aether') return [];

  const aether = hexo.theme.config && hexo.theme.config.aether;
  if (aether && aether.cmdk && aether.cmdk.enable === false) return [];

  const entries = [];

  // Posts (+ notes, visuals — all sit in posts collection with `type:` differentiation)
  locals.posts.toArray().forEach(p => {
    const type = (p.type || p.layout || '').toLowerCase();
    let kind = 'post';
    if (type === 'visual') kind = 'visual';
    else if (type === 'note') kind = 'note';
    const tags = p.tags && p.tags.length
      ? (p.tags.toArray ? p.tags.toArray() : p.tags).map(t => t.name)
      : [];
    let category = '';
    if (p.categories && p.categories.length) {
      const cats = p.categories.toArray ? p.categories.toArray() : p.categories;
      category = cats[0].name;
    }
    const rawSummary = p.description || p.excerpt || p.content || '';
    const summary = stripTags(rawSummary).slice(0, 140);
    entries.push({
      kind,
      title : String(p.title || ''),
      path  : '/' + p.path,
      date  : p.date ? new Date(p.date.toDate ? p.date.toDate() : p.date).toISOString().slice(0, 10) : '',
      summary,
      category,
      tags,
      series: p.series || null
    });
  });

  // Series pages
  const seriesNames = new Set();
  locals.posts.toArray().forEach(p => { if (p.series) seriesNames.add(p.series); });
  seriesNames.forEach(name => {
    const slug = String(name).toLowerCase()
      .replace(/[\s\u3000]+/g, '-')
      .replace(/[^\w一-鿿-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'series';
    entries.push({
      kind    : 'series',
      title   : name,
      path    : '/series/' + slug + '/',
      date    : '',
      summary : '系列 — 按主题组织的长期写作',
      category: 'Series',
      tags    : [],
      series  : name
    });
  });

  // Top-level pages (about, now, newsletter, visuals)
  locals.pages.toArray().forEach(pg => {
    if (!pg.title) return;
    entries.push({
      kind    : 'page',
      title   : String(pg.title),
      path    : '/' + pg.path,
      date    : pg.date ? new Date(pg.date.toDate ? pg.date.toDate() : pg.date).toISOString().slice(0, 10) : '',
      summary : stripTags(pg.description || pg.excerpt || pg.content || '').slice(0, 140),
      category: 'Page',
      tags    : [],
      series  : null
    });
  });

  // Categories (browsable)
  locals.categories.toArray().forEach(c => {
    entries.push({
      kind    : 'category',
      title   : c.name,
      path    : '/' + c.path,
      date    : '',
      summary : c.length + ' 篇文章',
      category: 'Category',
      tags    : [],
      series  : null
    });
  });

  // De-dup by (kind, path)
  const seen = new Set();
  const unique = entries.filter(e => {
    const key = e.kind + '|' + e.path;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return [{
    path: 'aether-search.json',
    data: JSON.stringify({
      generated_at: '', // intentionally blank to keep build deterministic
      total       : unique.length,
      entries     : unique
    })
  }];
});
