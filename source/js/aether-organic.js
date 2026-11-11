/* eslint no-use-before-define: ["error", { "functions": false }] */
/* Aether folio: static-first, desktop-only enhancement, no render loop offscreen. */
(() => {
  'use strict';
  const script = document.currentScript;
  const base = new URL('.', script.src);
  const media = matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  const connection = navigator.connection;
  let cleanup = () => {};
  let generation = 0;
  let hasUnfolded = false;
  async function init() {
    cleanup();
    const id = ++generation;
    const el = document.querySelector('[data-organic]');
    if (!el || el.hasAttribute('data-static') || !media.matches || connection?.saveData
        || (navigator.deviceMemory && navigator.deviceMemory <= 4)
        || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)) return;
    let scene, observer, resize;
    const unfold = !hasUnfolded;
    let frame = 0; let visible = false; let stopped = false; let time = 0; let last = 0; let drawn = 0;
    let samples = 0; let slow = 0;
    let settled = false;
    const renderedPointer = { x: NaN, y: NaN };
    const target = { x: 0, y: 0 }; const pointer = { x: 0, y: 0 };
    function stop() {
      stopped = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      resize?.disconnect();
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('pagehide', stop);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', reset);
      scene?.canvas.removeEventListener('webglcontextlost', lost);
      scene?.destroy();
      el.classList.remove('is-live');
    }
    cleanup = stop;
    function tick(now) {
      frame = 0;
      if (stopped || !visible || document.hidden) return;
      const delta = last ? now - last : 16;
      last = now;
      // A sustained slow device returns to the static artwork for this visit.
      if (samples < 120) { samples++; if (delta > 48) slow++; }
      if (samples === 120 && slow > 35) { stop(); return; }
      time += delta / 1000;
      const interval = 1000 / 30;
      if (now - drawn >= interval) {
        pointer.x += (target.x - pointer.x) * 0.07;
        pointer.y += (target.y - pointer.y) * 0.07;
        if (!settled || Math.abs(pointer.x - renderedPointer.x) > 0.0001 || Math.abs(pointer.y - renderedPointer.y) > 0.0001) {
          scene.render(unfold ? time : Infinity, pointer);
          renderedPointer.x = pointer.x;
          renderedPointer.y = pointer.y;
          settled = !unfold || time >= 2.32;
        }
        drawn = now - ((now - drawn) % interval);
      }
      const moving = Math.abs(target.x - pointer.x) > 0.0001 || Math.abs(target.y - pointer.y) > 0.0001;
      if (!settled || moving) frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      if (stopped) return;
      if (visible && !document.hidden) {
        frame = requestAnimationFrame(tick);
      }
    }
    function move(event) {
      const rect = el.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width * 2) - 1;
      target.y = ((event.clientY - rect.top) / rect.height * 2) - 1;
      if (!frame) sync();
    }
    function reset() { target.x = 0; target.y = 0; if (!frame) sync(); }
    function lost(event) { event.preventDefault(); stop(); }
    try {
      const module = await import(new URL('aether-organic-scene.mjs', base).href);
      if (id !== generation || stopped) return;
      scene = module.createFolio(el.querySelector('.aether-organic__scene'), { unfold });
      hasUnfolded = true;
      scene.canvas.addEventListener('webglcontextlost', lost);
      el.classList.add('is-live');
      resize = new ResizeObserver(() => { scene.resize(); scene.render(unfold ? time : Infinity, pointer); });
      resize.observe(el);
      observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
      observer.observe(el);
      document.addEventListener('visibilitychange', sync);
      window.addEventListener('pagehide', stop, { once: true });
      el.addEventListener('pointermove', move, { passive: true });
      el.addEventListener('pointerleave', reset);
    } catch {
      stop();
    }
  }
  media.addEventListener('change', init);
  connection?.addEventListener('change', init);
  document.addEventListener('pjax:success', init);
  window.addEventListener('pageshow', event => { if (event.persisted) init(); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
