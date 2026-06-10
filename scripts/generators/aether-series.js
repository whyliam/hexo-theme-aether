/* global hexo */
/**
 * Aether — series generator
 *
 * For every distinct `post.series` value, generate a `/series/<slug>/`
 * page rendered with `layout/series.njk`. Each page receives:
 *   page.series_name   — the human-readable series name
 *   page.series_posts  — chronological list of posts in this series
 *   page.title         — same as series_name (used by NexT head)
 *   page.layout        — 'series'
 */
'use strict';

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[\s\u3000]+/g, '-')
    .replace(/[^\w一-鿿-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    || 'series';
}

hexo.extend.generator.register('aether-series', function(locals) {
  const scheme = hexo.theme.config && hexo.theme.config.scheme;
  if (scheme !== 'Aether') return [];

  const aether = hexo.theme.config && hexo.theme.config.aether;
  if (aether && aether.series_pages && aether.series_pages.enable === false) return [];

  const posts = locals.posts.filter(p => p.series).toArray();
  if (!posts.length) return [];

  // Group by series name
  const groups = new Map();
  posts.forEach(p => {
    const name = p.series;
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push(p);
  });

  const out = [];

  // Index page at /series/
  const seriesList = [];
  groups.forEach((items, name) => {
    items.sort((a, b) => a.date - b.date);
    const recent = items.slice(-3).reverse();
    seriesList.push({
      name,
      slug       : slugify(name),
      count      : items.length,
      latest_date: items[items.length - 1].date,
      first_date : items[0].date,
      recent_posts: recent.map(p => ({
        title: p.title,
        path : p.path,
        date : p.date
      }))
    });
  });
  seriesList.sort((a, b) => b.latest_date - a.latest_date);

  out.push({
    path  : 'series/index.html',
    layout: 'series-index',
    data  : {
      title      : '系列',
      layout     : 'series-index',
      series_list: seriesList,
      comments   : false
    }
  });

  // One page per series
  groups.forEach((items, name) => {
    const slug = slugify(name);
    items.sort((a, b) => a.date - b.date);

    out.push({
      path  : `series/${slug}/index.html`,
      layout: 'series',
      data  : {
        title       : name,
        layout      : 'series',
        series_name : name,
        series_slug : slug,
        series_posts: items.map((p, idx) => ({
          index      : String(idx + 1).padStart(2, '0'),
          title      : p.title,
          path       : p.path,
          permalink  : p.permalink,
          date       : p.date,
          updated    : p.updated,
          description: p.description,
          excerpt    : p.excerpt
        })),
        comments: false
      }
    });
  });

  return out;
});
