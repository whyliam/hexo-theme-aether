/* global NexT, CONFIG */

(() => {
  let instance;
  let client;
  document.addEventListener('page:loaded', async () => {
    instance?.destroy();
    instance = null;
    if (!CONFIG.page.comments || !document.querySelector('#waline')) return;
    const element = document.querySelector('#waline');
    await NexT.utils.loadComments('#waline');
    if (!element.isConnected) return;
    const config = CONFIG.waline;
    const libUrl = config.libUrl || 'https://unpkg.com/@waline/client@3.6.0/dist/waline.js';
    if (!document.querySelector('#waline-css')) {
      const style = document.createElement('link');
      style.id = 'waline-css';
      style.rel = 'stylesheet';
      style.href = config.cssUrl || 'https://unpkg.com/@waline/client@3.6.0/dist/waline.css';
      document.head.appendChild(style);
    }
    try {
      client ||= import(libUrl);
      const { init } = await client;
      if (!element.isConnected) return;
      instance = init({
        ...config,
        el: element,
        path: location.pathname,
        lang: config.lang || CONFIG.page.lang || 'zh-CN',
        requiredMeta: config.requiredMeta || config.requiredFields || [],
        pageview: Boolean(config.visitor),
        comment: Boolean(config.comment_count)
      });
    } catch (error) {
      client = null;
      element.textContent = '评论加载失败，请刷新页面重试。';
      console.error('Failed to load Waline', error);
    }
  });
})();
