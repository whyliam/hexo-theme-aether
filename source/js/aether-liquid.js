// A restrained specular response inspired by liquidGL's fluid interaction.
// This is a DOM/CSS highlight, not liquidGL's GPU background refraction.
(function() {
  'use strict';

  const preference = matchMedia('(prefers-reduced-motion: reduce), (prefers-reduced-transparency: reduce), (hover: none)');
  const surfaces = [];
  const follow = Number(document.body.dataset.aetherFollow || 100);

  function setup() {
    if (document.body.dataset.aetherPointer === 'false') return;
    document.querySelectorAll('.header, .aether-home .aether-series-lead').forEach(element => {
      let frame = 0;
      let last = 0;
      let x = 18;
      let y = 0;
      let targetX = x;
      let targetY = y;

      function reset() {
        cancelAnimationFrame(frame);
        frame = 0;
        x = 18;
        targetX = 18;
        y = 0;
        targetY = 0;
        element.style.removeProperty('--aether-liquid-x');
        element.style.removeProperty('--aether-liquid-y');
      }

      function paint(time) {
        frame = 0;
        if (preference.matches || document.hidden) { reset(); return; }
        const progress = 1 - Math.exp(-Math.min(time - last, 64) / follow);
        last = time;
        x += (targetX - x) * progress;
        y += (targetY - y) * progress;
        element.style.setProperty('--aether-liquid-x', x.toFixed(2) + '%');
        element.style.setProperty('--aether-liquid-y', y.toFixed(2) + '%');
        if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.1) frame = requestAnimationFrame(paint);
      }

      function move(nextX, nextY) {
        if (preference.matches || document.hidden) return;
        targetX = nextX;
        targetY = nextY;
        if (follow === 0) {
          x = nextX;
          y = nextY;
          element.style.setProperty('--aether-liquid-x', x.toFixed(2) + '%');
          element.style.setProperty('--aether-liquid-y', y.toFixed(2) + '%');
          return;
        }
        if (!frame) { last = performance.now(); frame = requestAnimationFrame(paint); }
      }

      element.addEventListener('pointermove', event => {
        if (event.pointerType !== 'mouse' || preference.matches) return;
        const rect = element.getBoundingClientRect();
        move(Math.max(0, Math.min(100, (event.clientX - rect.left) / rect.width * 100)), Math.max(0, Math.min(100, (event.clientY - rect.top) / rect.height * 100)));
      }, { passive: true });
      element.addEventListener('pointerleave', () => move(18, 0));
      surfaces.push(reset);
    });
    preference.addEventListener('change', () => surfaces.forEach(reset => reset()));
    document.addEventListener('visibilitychange', () => { if (document.hidden) surfaces.forEach(reset => reset()); });
    window.addEventListener('pagehide', () => surfaces.forEach(reset => reset()));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once: true });
  else setup();
})();
