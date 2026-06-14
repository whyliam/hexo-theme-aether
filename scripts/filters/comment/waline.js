'use strict';

module.exports = hexo => {
  const config = hexo.theme.config;
  if (!config.waline || !config.waline.enable) return;

  // Register comment filter
  hexo.extend.filter.register('theme_inject', injects => {
    injects.comment.raw('waline', '<div id="waline"></div>', {}, {cache: true});
    
    injects.bodyEnd.raw('waline', `
      <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
      <script type="module">
        import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';
        init({
          el: '#waline',
          serverURL: '${config.waline.serverURL}',
          ${config.waline.locale ? `locale: ${JSON.stringify(config.waline.locale)},` : ''}
          ${config.waline.dark !== undefined ? `dark: ${JSON.stringify(config.waline.dark)},` : ''}
          ${config.waline.meta ? `meta: ${JSON.stringify(config.waline.meta)},` : ''}
          ${config.waline.requiredMeta ? `requiredMeta: ${JSON.stringify(config.waline.requiredMeta)},` : ''}
          ${config.waline.login !== undefined ? `login: ${JSON.stringify(config.waline.login)},` : ''}
          ${config.waline.wordLimit !== undefined ? `wordLimit: ${JSON.stringify(config.waline.wordLimit)},` : ''}
          ${config.waline.pageSize !== undefined ? `pageSize: ${JSON.stringify(config.waline.pageSize)},` : ''}
          ${config.waline.imageUploader !== undefined ? `imageUploader: ${config.waline.imageUploader},` : ''}
          ${config.waline.highlighter !== undefined ? `highlighter: ${config.waline.highlighter},` : ''}
          ${config.waline.texRenderer !== undefined ? `texRenderer: ${config.waline.texRenderer},` : ''}
          ${config.waline.search !== undefined ? `search: ${config.waline.search},` : ''}
          ${config.waline.reaction ? `reaction: ${JSON.stringify(config.waline.reaction)},` : ''}
          path: window.location.pathname,
        });
      </script>
    `, {}, {cache: true});
  });
};
