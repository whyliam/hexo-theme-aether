/* global hexo */
'use strict';

// Hexo's index and archive generators emit no pages before the first article.
hexo.extend.generator.register('aether-empty-home', function(locals) {
  if (hexo.theme.config.scheme !== 'Aether' || locals.posts.length) return [];
  const prefix = String(hexo.config.index_generator?.path || '').replace(/^\/+|\/+$/g, '');
  const archive = String(hexo.config.archive_dir || 'archives').replace(/^\/+|\/+$/g, '');
  return [{
    path  : (prefix ? prefix + '/' : '') + 'index.html',
    layout: 'index',
    data  : { posts: locals.posts, current: 1, total: 1 }
  }, {
    path  : archive + '/index.html',
    layout: 'archive',
    data  : { posts: locals.posts, archive: true, current: 1, total: 1 }
  }];
});
