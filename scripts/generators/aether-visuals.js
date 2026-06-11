/* global hexo */
/**
 * Aether — visuals index generator
 *
 * Emits a single `/visuals/` page that lists every `type: visual` post,
 * rendered with `layout/visuals.njk`. Hidden entirely when no visual posts
 * exist.
 */
'use strict';

const { isVisualPost } = require('../lib/aether-content');

hexo.extend.generator.register('aether-visuals', function(locals) {
  const scheme = hexo.theme.config && hexo.theme.config.scheme;
  if (scheme !== 'Aether') return [];

  const aether = hexo.theme.config && hexo.theme.config.aether;
  if (aether && aether.visuals_page && aether.visuals_page.enable === false) return [];

  const posts = locals.posts.toArray().filter(isVisualPost);
  if (!posts.length) return [];

  posts.sort((a, b) => b.date - a.date);

  return [{
    path  : 'visuals/index.html',
    layout: 'visuals',
    data  : {
      title       : '影像',
      layout      : 'visuals',
      visual_posts: posts.map((p, idx) => ({
        index      : String(idx + 1).padStart(3, '0'),
        title      : p.title,
        path       : p.path,
        permalink  : p.permalink,
        date       : p.date,
        location   : p.location,
        camera     : p.camera,
        cover      : p.cover || (p.photos && p.photos.length ? p.photos[0] : null),
        photos     : p.photos || [],
        description: p.description,
        excerpt    : p.excerpt
      })),
      comments: false
    }
  }];
});
