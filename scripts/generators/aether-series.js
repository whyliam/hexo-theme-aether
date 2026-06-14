/* global hexo */
/**
 * Aether — series generator
 *
 * For every distinct `post.series` value, generate a `/series/<slug>/`
 * page rendered with `layout/series.njk`. Each page receives:
 *   page.series_name   — the human-readable series name
 *   page.series_posts  — reverse-chronological list of posts in this series
 *   page.title         — same as series_name (used by NexT head)
 *   page.layout        — 'series'
 */
'use strict';

const {
  inferredSeriesName,
  isRegularPost,
  slugifySeries
} = require('../lib/aether-content');

hexo.extend.generator.register('aether-series', function(locals) {
  const scheme = hexo.theme.config && hexo.theme.config.scheme;
  if (scheme !== 'Aether') return [];

  const aether = hexo.theme.config && hexo.theme.config.aether;
  if (aether && aether.series_pages && aether.series_pages.enable === false) return [];

  const posts = locals.posts.toArray()
    .filter(isRegularPost)
    .map(post => ({ post, name: inferredSeriesName(post) }))
    .filter(item => item.name);
  if (!posts.length) return [];

  // Group by series name
  const groups = new Map();
  posts.forEach(({ post, name }) => {
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push(post);
  });

  const out = [];

  // Index page at /series/
  const seriesList = [];
  groups.forEach((items, name) => {
    items.sort((a, b) => b.date - a.date);
    const recent = items.slice(0, 3);
    seriesList.push({
      name,
      slug        : slugifySeries(name),
      count       : items.length,
      latest_date : items[0].date,
      first_date  : items[items.length - 1].date,
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
    const slug = slugifySeries(name);
    items.sort((a, b) => b.date - a.date);

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
