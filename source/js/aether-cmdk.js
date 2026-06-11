/* Aether — ⌘K command palette client
 *
 * Lazy-loads /aether-search.json on first open, runs a tiny substring +
 * acronym scorer client-side, renders results with keyboard navigation.
 * No external dependencies (no Fuse.js, no lunr).
 */
(function () {
  'use strict';

  const PALETTE_SEL = '#aether-cmdk';
  const INDEX_URL = '/aether-search.json';
  const RECENT_KEY = 'aether-cmdk-recent';
  const RECENT_MAX = 6;
  const RESULT_LIMIT = 30;

  const palette = document.querySelector(PALETTE_SEL);
  if (!palette) return;

  const input    = palette.querySelector('.aether-cmdk__input');
  const list     = palette.querySelector('.aether-cmdk__results');
  const status   = palette.querySelector('.aether-cmdk__status');
  const filters  = [...palette.querySelectorAll('[data-cmdk-filter]')];
  const closeEls = [...palette.querySelectorAll('[data-cmdk-close]')];

  let entries = null;
  let loadingPromise = null;
  let activeFilter = 'all';
  let cursor = 0;
  let lastResults = [];

  // ---------- Index lazy load ----------
  function load() {
    if (entries) return Promise.resolve(entries);
    if (loadingPromise) return loadingPromise;
    setStatus('正在加载档案索引…');
    loadingPromise = fetch(INDEX_URL, { cache: 'force-cache' })
      .then(r => r.ok ? r.json() : Promise.reject(new Error('Index ' + r.status)))
      .then(data => {
        entries = data.entries || [];
        setStatus(entries.length + ' 条目已索引');
        return entries;
      })
      .catch(err => {
        setStatus('索引加载失败：' + err.message + '。Enter 跳转到归档搜索。');
        entries = [];
        return entries;
      });
    return loadingPromise;
  }

  // ---------- Open / close ----------
  function open() {
    palette.hidden = false;
    document.documentElement.classList.add('aether-cmdk-open');
    requestAnimationFrame(() => input.focus());
    load().then(() => render(input.value));
  }
  function close() {
    palette.hidden = true;
    document.documentElement.classList.remove('aether-cmdk-open');
    input.value = '';
    cursor = 0;
  }
  function isOpen() { return !palette.hidden; }

  closeEls.forEach(el => el.addEventListener('click', close));

  // ---------- Filters ----------
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('is-on'));
      btn.classList.add('is-on');
      activeFilter = btn.dataset.cmdkFilter;
      cursor = 0;
      render(input.value);
    });
  });

  // ---------- Score & filter ----------
  function score(entry, q) {
    if (!q) return 1;
    const ql = q.toLowerCase();
    const t = (entry.title || '').toLowerCase();
    const sum = (entry.summary || '').toLowerCase();
    const cat = (entry.category || '').toLowerCase();
    const tags = (entry.tags || []).join(' ').toLowerCase();
    const series = (entry.series || '').toLowerCase();

    let s = 0;
    if (t === ql) s += 100;
    else if (t.startsWith(ql)) s += 60;
    else if (t.includes(ql)) s += 30;
    if (series.includes(ql)) s += 15;
    if (cat.includes(ql)) s += 10;
    if (tags.includes(ql)) s += 8;
    if (sum.includes(ql)) s += 4;
    return s;
  }

  function search(q) {
    const list = (entries || []).filter(e => activeFilter === 'all' || e.kind === activeFilter);
    if (!q) {
      // recent + chronological fallback
      const recents = getRecent();
      const recentEntries = recents
        .map(r => list.find(e => e.path === r))
        .filter(Boolean);
      const rest = list
        .filter(e => !recents.includes(e.path))
        .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
        .slice(0, RESULT_LIMIT - recentEntries.length);
      return [...recentEntries, ...rest].slice(0, RESULT_LIMIT);
    }
    return list
      .map(e => ({ e, s: score(e, q) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s || (b.e.date || '').localeCompare(a.e.date || ''))
      .slice(0, RESULT_LIMIT)
      .map(x => x.e);
  }

  // ---------- Render ----------
  const KIND_LABEL = { post: '文章', series: '系列', visual: '影像', note: '短札', page: '页面', category: '分类' };

  function render(q) {
    const results = search(q.trim());
    lastResults = results;
    cursor = Math.min(cursor, Math.max(0, results.length - 1));
    if (!results.length) {
      list.innerHTML = '<li class="aether-cmdk__empty">没有匹配项 — 试试别的关键词或切换过滤器。</li>';
      setStatus('0 个结果');
      return;
    }
    setStatus(results.length + ' 个结果');
    list.innerHTML = results.map((r, idx) => `
      <li class="aether-cmdk__item${idx === cursor ? ' is-on' : ''}" data-idx="${idx}" data-path="${r.path}">
        <span class="aether-cmdk__kind">${KIND_LABEL[r.kind] || r.kind}</span>
        <span class="aether-cmdk__body">
          <span class="aether-cmdk__title">${escapeHtml(r.title)}</span>
          ${r.summary ? '<span class="aether-cmdk__sum">' + escapeHtml(r.summary.slice(0, 80)) + '</span>' : ''}
        </span>
        ${r.date ? '<span class="aether-cmdk__date">' + r.date + '</span>' : ''}
      </li>
    `).join('');
  }

  function setStatus(s) { if (status) status.textContent = s; }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  }

  // ---------- Keyboard ----------
  input.addEventListener('input', () => {
    cursor = 0;
    render(input.value);
  });

  list.addEventListener('mousemove', (e) => {
    const li = e.target.closest('.aether-cmdk__item');
    if (!li) return;
    const idx = +li.dataset.idx;
    if (idx !== cursor) {
      cursor = idx;
      updateCursor();
    }
  });

  list.addEventListener('click', (e) => {
    const li = e.target.closest('.aether-cmdk__item');
    if (!li) return;
    pickResult(+li.dataset.idx);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      isOpen() ? close() : open();
      return;
    }
    if (!isOpen()) return;
    if (e.key === 'Escape')      { e.preventDefault(); close(); }
    else if (e.key === 'ArrowDown'){ e.preventDefault(); cursor = Math.min(cursor + 1, lastResults.length - 1); updateCursor(); }
    else if (e.key === 'ArrowUp')  { e.preventDefault(); cursor = Math.max(cursor - 1, 0); updateCursor(); }
    else if (e.key === 'Enter')    { e.preventDefault(); pickResult(cursor); }
  });

  function updateCursor() {
    const items = list.querySelectorAll('.aether-cmdk__item');
    items.forEach((el, i) => el.classList.toggle('is-on', i === cursor));
    const active = items[cursor];
    if (active && active.scrollIntoView) {
      const rect = active.getBoundingClientRect();
      const parent = list.getBoundingClientRect();
      if (rect.bottom > parent.bottom) active.scrollIntoView({ block: 'nearest' });
      else if (rect.top < parent.top)  active.scrollIntoView({ block: 'nearest' });
    }
  }

  function pickResult(idx) {
    const r = lastResults[idx];
    if (!r) return;
    pushRecent(r.path);
    window.location.href = r.path;
  }

  // ---------- Recent ----------
  function getRecent() {
    try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]').slice(0, RECENT_MAX); }
    catch (e) { return []; }
  }
  function pushRecent(path) {
    try {
      const prev = getRecent().filter(p => p !== path);
      const next = [path, ...prev].slice(0, RECENT_MAX);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch (e) { /* swallow */ }
  }

  // ---------- External trigger (.aether-search-btn) ----------
  document.querySelectorAll('.aether-search-btn, [data-aether-cmdk-trigger]').forEach(btn => {
    btn.addEventListener('click', open);
  });

  // Expose for debugging
  window.AetherCmdk = { open, close, load };
})();
