/* global hexo */
'use strict';
const path = require('path');

hexo.extend.filter.register('theme_inject', injects => {
  const { waline } = hexo.theme.config;
  if (!waline || !waline.enable || !waline.serverURL) return;
  injects.comment.raw('waline', '<div class="comments waline-container" id="waline"></div>', {}, { cache: true });
  injects.bodyEnd.file('waline', path.join(hexo.theme_dir, 'layout/_third-party/comments/waline.njk'));
});
