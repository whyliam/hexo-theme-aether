/* Aether — runtime helpers
 *
 * 1. Reading-progress bar
 * 2. ⌘K / Ctrl+K fallback
 * 3. Header scroll class (.is-scrolled / .is-compact)
 * 4. Scroll reveal — IntersectionObserver fade-up for sections
 * 5. Hero entrance choreography — staggered cascade
 * 6. Dark mode toggle + localStorage persistence
 */
(function() {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const onReady = fn =>
    (document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', fn, { once: true })
      : fn());

  // ── 1. Reading progress ──
  function setupReadingProgress() {
    const bar = $('.aether-reading-progress span');
    if (!bar) return;
    const compute = () => {
      const doc = document.documentElement;
      const total = (doc.scrollHeight - doc.clientHeight) || 1;
      bar.style.transform = 'scaleX(' + Math.max(0, Math.min(1, doc.scrollTop / total)) + ')';
    };
    let raf = 0;
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; compute(); }); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    compute();
  }

  // ── 2. ⌘K fallback ──
  function setupCmdKFallback() {
    if (document.getElementById('aether-cmdk')) return;
    document.addEventListener('keydown', e => {
      if ((e.key || '').toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        window.location.href = new URL('archives/', location.origin + (document.body.dataset.aetherRoot || '/')).href;
      }
    });
  }

  // ── 3. Header scroll ──
  function setupHeaderScroll() {
    const header = $('.header');
    if (!header) return;
    const update = () => {
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 8);

    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // ── 4. Scroll reveal ──
  function setupScrollReveal() {
    const targets = $$('[data-aether-reveal]');
    if (!targets.length) return;

    // Mark all as hidden initially
    targets.forEach(el => { el.classList.add('aether-reveal--hidden'); });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.aetherRevealDelay || '0', 10);
          setTimeout(() => {
            el.classList.remove('aether-reveal--hidden');
            el.classList.add('aether-reveal--visible');
          }, delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.01, rootMargin: '0px 0px 80px 0px' });

    targets.forEach(el => observer.observe(el));
  }

  // ── 5. Hero entrance choreography ──
  function setupHeroEntrance() {
    const hero = $('.aether-hero');
    if (!hero) return;

    const steps = $$('[data-hero-step]', hero);
    steps.forEach(el => { el.classList.add('aether-hero-step--hidden'); });

    // Cascade after a tiny initial delay
    requestAnimationFrame(() => {
      steps.forEach((el, i) => {
        const base = parseInt(el.dataset.heroStep || '0', 10);
        setTimeout(() => {
          el.classList.remove('aether-hero-step--hidden');
          el.classList.add('aether-hero-step--visible');
        }, base);
      });
    });
  }

  // ── 6. Dark mode ──
  function setupDarkMode() {
    const toggle = $('.aether-dark-toggle');
    if (!toggle) return;

    const root = document.documentElement;
    const STORAGE_KEY = 'aether-color-scheme';

    function applyScheme(scheme) {
      root.setAttribute('data-color-scheme', scheme);
      toggle.setAttribute('aria-label', scheme === 'dark' ? document.body.dataset.aetherLightLabel : document.body.dataset.aetherDarkLabel);
      toggle.textContent = scheme === 'dark' ? '☀' : '☾';
    }

    // Determine initial scheme
    const stored = localStorage.getItem(STORAGE_KEY);
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (systemDark ? 'dark' : 'light');
    applyScheme(initial);

    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-color-scheme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      applyScheme(next);
    });

    // Listen for system changes (only if no manual override)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyScheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  onReady(() => {
    document.querySelectorAll('.aether-visual img, .aether-photo img').forEach(img => {
      const card = img.closest('.aether-visual, .aether-photo');
      let timer;
      const failed = () => card.classList.add('is-unavailable');
      img.addEventListener('error', () => { clearTimeout(timer); failed(); }, { once: true });
      img.addEventListener('load', () => { clearTimeout(timer); card.classList.remove('is-unavailable'); }, { once: true });
      if (img.complete) { if (!img.naturalWidth) failed(); return; }
      // Bound the blank state only when the reader reaches the photographs.
      const observer = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        if (!img.naturalWidth) timer = setTimeout(failed, 8000);
        observer.disconnect();
      });
      observer.observe(img);
    });
    const menuToggle = $('.site-nav-toggle .toggle');
    if (menuToggle) {
      const nav = $('.site-nav');
      if (nav) { nav.id = 'aether-navigation'; menuToggle.setAttribute('aria-controls', nav.id); }
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && document.body.classList.contains('site-nav-on')) {
          menuToggle.click();
          menuToggle.focus();
        }
      });
      menuToggle.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); menuToggle.click(); }
      });
      new MutationObserver(() => {
        menuToggle.setAttribute('aria-expanded', String(document.body.classList.contains('site-nav-on')));
      }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
    }
    setupReadingProgress();
    setupCmdKFallback();
    setupHeaderScroll();
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) setupScrollReveal();
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) setupHeroEntrance();
    setupDarkMode();
  });
})();
