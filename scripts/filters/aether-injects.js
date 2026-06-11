/* global hexo */
/**
 * Aether — theme_inject hook
 *
 * Mounts Aether-only partials into NexT injection points so we don't have
 * to fork _macro/post.njk:
 *   - postBodyEnd:  aether-cta  → bottom of every post (when enabled)
 *
 * NexT's `next_inject('postBodyEnd')` fires only on real post views (not the
 * homepage list), so the CTA renders exactly where we want it.
 *
 * Note: injects[type].file() resolves paths relative to hexo.base_dir, so we
 * read the partial source ourselves from theme_dir and inject it as raw.
 */
'use strict';

const fs = require('fs');
const path = require('path');

function readPartial(rel) {
  return fs.readFileSync(path.resolve(__dirname, '..', '..', 'layout', '_partials', 'post', rel), 'utf8');
}

hexo.extend.filter.register('theme_inject', injects => {
  const aether = hexo.theme.config && hexo.theme.config.aether;
  const scheme = hexo.theme.config && hexo.theme.config.scheme;
  if (scheme !== 'Aether') return;

  // Series "continue this path" nav (renders only when page.series is set)
  try {
    injects.postBodyEnd.raw('aether-series-nav', readPartial('aether-series-nav.njk'), {}, { cache: false });
  } catch (e) {
    hexo.log.warn(`[aether] failed to inject series nav: ${e.message}`);
  }

  // Bottom-of-post CTA
  if (aether && aether.cta && aether.cta.enable !== false) {
    try {
      injects.postBodyEnd.raw('aether-cta', readPartial('aether-cta.njk'), {}, { cache: false });
    } catch (e) {
      hexo.log.warn(`[aether] failed to inject post CTA: ${e.message}`);
    }
  }
}, 99);
