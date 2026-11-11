/* global hexo */
'use strict';
const { aggregateSeries } = require('../lib/aether-content');
hexo.extend.generator.register('aether-series', function(locals) {
  const config = hexo.theme.config;
  if (config.scheme !== 'Aether' || config.aether?.series_pages?.enable === false) return [];
  const series = aggregateSeries(locals.posts, config.aether?.series?.rules || []);
  if (!series.length) return [];
  return [{
    path  : 'series/index.html', layout: 'series-index',
    data  : { title: '系列', layout: 'series-index', series_list: series, comments: false }
  }, ...series.map(item => ({
    path  : `series/${item.slug}/index.html`, layout: 'series',
    data  : { title       : item.name, layout      : 'series', series_name : item.name,
      series_slug : item.slug, series_posts: item.posts, comments    : false }
  }))];
});
