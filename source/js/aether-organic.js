/* eslint no-use-before-define: ["error", { "functions": false }] */
/* Compositor motion remains available when the optional WebGL scene cannot run. */
(() => {
  'use strict';
  const assetUrl = new URL(document.currentScript.src);
  const base = new URL('.', assetUrl);
  const motion = matchMedia('(prefers-reduced-motion: no-preference)');
  const desktop = matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine)');
  const connection = navigator.connection;
  let cleanup = () => {};
  let generation = 0;
  let hasUnfolded = false;
  async function init() {
    cleanup();
    const id = ++generation;
    const el = document.querySelector('[data-organic]');
    if (!el || el.hasAttribute('data-static') || !motion.matches) return;
    let scene, resize;
    let frame = 0; let visible = false; let stopped = false; let time = 0; let last = 0; let drawn = 0;
    let samples = 0; let slow = 0;
    const unfold = !hasUnfolded;
    const target = { x: 0, y: 0 }; const pointer = { x: 0, y: 0 };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; scroll(); sync(); });
    el.classList.add('has-motion');
    function releaseScene() {
      cancelAnimationFrame(frame);
      frame = 0;
      resize?.disconnect();
      scene?.canvas.removeEventListener('webglcontextlost', lost);
      scene?.destroy();
      scene = undefined;
      el.classList.remove('is-live');
    }
    function stop() {
      stopped = true;
      releaseScene();
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('pagehide', stop);
      window.removeEventListener('scroll', scroll);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', reset);
      el.classList.remove('has-motion', 'is-moving');
      ['--folio-x', '--folio-y', '--folio-scroll'].forEach(name => el.style.removeProperty(name));
    }
    cleanup = stop;
    function tick(now) {
      frame = 0;
      if (stopped || !scene || !visible || document.hidden) return;
      const delta = last ? now - last : 16;
      last = now;
      if (samples < 120) { samples++; if (delta > 48) slow++; }
      // Keep the lightweight breath and interaction when GPU rendering is too slow.
      if (samples === 120 && slow > 35) { releaseScene(); return; }
      time += Math.min(delta, 100) / 1000;
      const interval = 1000 / 24;
      if (now - drawn >= interval) {
        pointer.x += (target.x - pointer.x) * 0.12;
        pointer.y += (target.y - pointer.y) * 0.12;
        scene.render(unfold ? time : Infinity, pointer, time);
        drawn = now - ((now - drawn) % interval);
      }
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      const running = !stopped && visible && !document.hidden;
      el.classList.toggle('is-moving', running);
      if (running && scene) frame = requestAnimationFrame(tick);
    }
    function move(event) {
      if (event.pointerType === 'touch') return;
      const rect = el.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width * 2) - 1));
      target.y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height * 2) - 1));
      el.style.setProperty('--folio-x', `${target.x * 12}deg`);
      el.style.setProperty('--folio-y', `${-target.y * 9}deg`);
    }
    function reset() {
      target.x = 0; target.y = 0;
      el.style.setProperty('--folio-x', '0deg');
      el.style.setProperty('--folio-y', '0deg');
    }
    function scroll() {
      if (!visible || document.hidden) return;
      const section = el.closest('.aether-intro');
      const progress = Math.max(0, Math.min(1, window.scrollY / section.offsetHeight));
      el.style.setProperty('--folio-scroll', `${progress * -32}px`);
    }
    function lost(event) { event.preventDefault(); releaseScene(); }
    observer.observe(el);
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('pagehide', stop, { once: true });
    window.addEventListener('scroll', scroll, { passive: true });
    el.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerleave', reset);
    if (!desktop.matches || connection?.saveData
        || (navigator.deviceMemory && navigator.deviceMemory <= 4)
        || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)) return;
    try {
      const sceneUrl = new URL('aether-organic-scene.mjs', base);
      sceneUrl.search = assetUrl.search;
      const module = await import(sceneUrl.href);
      if (id !== generation || stopped) return;
      scene = module.createFolio(el.querySelector('.aether-organic__scene'), { unfold });
      hasUnfolded = true;
      scene.canvas.addEventListener('webglcontextlost', lost);
      el.classList.add('is-live');
      resize = new ResizeObserver(() => { scene.resize(); scene.render(unfold ? time : Infinity, pointer, time); });
      resize.observe(el);
      sync();
    } catch {
      if (id !== generation || stopped) return;
      releaseScene();
    }
  }
  motion.addEventListener('change', init);
  desktop.addEventListener('change', init);
  connection?.addEventListener('change', init);
  document.addEventListener('pjax:success', init);
  window.addEventListener('pageshow', event => { if (event.persisted) init(); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
