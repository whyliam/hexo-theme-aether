/* global liquidGL */
// The lens renders material only. Text, focus and hit targets stay in the live DOM.
(() => {
  'use strict';
  const body = document.body;
  if (!body.hasAttribute('data-aether')) return;
  const selector = '[data-aether-glass="surface"], [data-aether-glass="button"]';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const transparency = matchMedia('(prefers-reduced-transparency: reduce)');
  const instances = new Map();
  const failed = new WeakSet();
  const fallbackTargets = new WeakSet();
  const fallbackFrames = new Map();
  let timer;
  let serial = 0;
  let suspended = false;

  function remove(element) {
    const record = instances.get(element);
    if (!record) return;
    clearTimeout(record.watchdog);
    record.instance.destroy();
    instances.delete(element);
    delete element.dataset.aetherLens;
    delete element.dataset.aetherGlassState;
  }

  function clear() {
    clearTimeout(timer);
    [...instances.keys()].forEach(remove);
    fallbackFrames.forEach(cancelAnimationFrame);
    fallbackFrames.clear();
  }

  function visible(element) {
    return element.isConnected && element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden';
  }

  function tint(element, style) {
    // Shader tint is multiplicative. Keep it neutral; CSS carries the accessible color.
    return element.matches('.aether-button, .aether-intro__links a:first-child, .is-on')
      ? style.getPropertyValue('--aether-accent').trim()
      : style.getPropertyValue('--aether-liquid-surface').trim();
  }

  function bindFallback(element) {
    if (element.dataset.aetherGlass !== 'surface' || fallbackTargets.has(element)) return;
    fallbackTargets.add(element);
    let x = 18;
    let y = 0;
    let targetX = x;
    let targetY = y;
    let last = 0;
    const follow = Math.max(0, Math.min(500, Number(body.dataset.aetherFollow) || 0));
    function reset() {
      cancelAnimationFrame(fallbackFrames.get(element));
      fallbackFrames.delete(element);
      element.style.removeProperty('--aether-liquid-x');
      element.style.removeProperty('--aether-liquid-y');
    }
    function paint(time) {
      fallbackFrames.delete(element);
      if (suspended || motion.matches || transparency.matches || element.dataset.aetherGlassState === 'ready') { reset(); return; }
      const step = follow === 0 ? 1 : 1 - Math.exp(-Math.min(time - last, 64) / follow);
      last = time;
      x += (targetX - x) * step;
      y += (targetY - y) * step;
      element.style.setProperty('--aether-liquid-x', x.toFixed(2) + '%');
      element.style.setProperty('--aether-liquid-y', y.toFixed(2) + '%');
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.1) fallbackFrames.set(element, requestAnimationFrame(paint));
    }
    element.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' || body.dataset.aetherPointer === 'false' || body.dataset.aetherGlass === 'false' || element.dataset.aetherGlassState === 'ready' || motion.matches || transparency.matches) return;
      const rect = element.getBoundingClientRect();
      targetX = Math.max(0, Math.min(100, (event.clientX - rect.left) / rect.width * 100));
      targetY = Math.max(0, Math.min(100, (event.clientY - rect.top) / rect.height * 100));
      if (!fallbackFrames.has(element)) {
        last = performance.now();
        fallbackFrames.set(element, requestAnimationFrame(paint));
      }
    }, { passive: true });
    element.addEventListener('pointerleave', reset);
  }

  function sync() {
    if (suspended) return;
    document.querySelectorAll(selector).forEach(bindFallback);
    if (body.dataset.aetherGlass === 'false' || transparency.matches || typeof liquidGL !== 'function') {
      clear();
      return;
    }
    const style = getComputedStyle(body);
    const resolution = Math.min(innerWidth < 768 ? 1 : 1.5, 8192 / Math.max(body.scrollHeight, body.scrollWidth));
    if (resolution < 0.1) { clear(); return; }
    instances.forEach((record, element) => {
      if (!visible(element)) remove(element);
      else record.instance.setTint(tint(element, style));
    });
    document.querySelectorAll(selector).forEach(element => {
      if (!visible(element) || instances.has(element) || failed.has(element)) return;
      const id = 'aether-lens-' + ++serial;
      element.dataset.aetherLens = id;
      element.dataset.aetherGlassState = 'loading';
      let ready = false;
      try {
        const instance = liquidGL({
          target  : '[data-aether-lens="' + id + '"]',
          snapshot: 'body',
          content : false,
          on      : { init() {
            ready = true;
            if (element.dataset.aetherLens === id) element.dataset.aetherGlassState = 'ready';
          } },
          resolution,
          engine             : 'auto',
          refraction         : 0.004,
          bevelDepth         : 0.018,
          bevelWidth         : 0.06,
          frost              : 8,
          shadow             : false,
          specular           : false,
          tilt               : false,
          draggable          : false,
          aberration         : 0,
          reveal             : 'none',
          interaction        : !motion.matches && body.dataset.aetherPointer !== 'false' ? 'fluid' : 'none',
          interactionStrength: 0.08,
          tint               : tint(element, style)
        });
        if (!instance) throw new Error('No glass instance');
        const watchdog = setTimeout(() => {
          if (ready || instances.get(element)?.instance !== instance) return;
          remove(element);
          failed.add(element);
        }, 8000);
        instances.set(element, { instance, watchdog });
      } catch (error) {
        remove(element);
        delete element.dataset.aetherLens;
        delete element.dataset.aetherGlassState;
        failed.add(element);
        console.warn('Aether: retaining CSS glass after renderer failure.', error);
      }
    });
  }

  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(sync, 100);
  }

  function rebuild() {
    clear();
    schedule();
  }

  const appearanceObserver = new MutationObserver(rebuild);
  appearanceObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-color-scheme'] });
  appearanceObserver.observe(body, { attributes: true, attributeFilter: ['data-aether-glass', 'data-aether-pointer'] });
  const visibilityObserver = new MutationObserver(schedule);
  visibilityObserver.observe(body, { attributes: true, attributeFilter: ['class'] });
  const palette = document.querySelector('.aether-cmdk');
  if (palette) {
    visibilityObserver.observe(palette, { attributes: true, attributeFilter: ['hidden'] });
    palette.addEventListener('click', event => { if (event.target.closest('[data-cmdk-filter]')) schedule(); });
  }
  document.querySelectorAll('.back-to-top, .site-nav').forEach(element => {
    visibilityObserver.observe(element, { attributes: true, attributeFilter: ['class', 'style'] });
  });
  window.addEventListener('resize', rebuild);
  motion.addEventListener('change', rebuild);
  transparency.addEventListener('change', rebuild);
  document.addEventListener('pjax:send', () => { suspended = true; clear(); });
  document.addEventListener('pjax:complete', () => { suspended = false; schedule(); });
  window.addEventListener('pagehide', () => { suspended = true; clear(); });
  window.addEventListener('pageshow', () => { suspended = false; schedule(); });
  document.addEventListener('visibilitychange', () => {
    suspended = document.hidden;
    if (suspended) clear();
    else schedule();
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, { once: true });
  else schedule();
})();
