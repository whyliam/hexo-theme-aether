'use strict';
const vm = require('node:vm');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const source = fs.readFileSync(require.resolve('../../source/js/aether-liquid.js'), 'utf8');

describe('glass lifecycle', () => {
  function setup({ disabled = false, reduced = false, fail = false, ready = true, library = true, height = 1000 } = {}) {
    const events = {};
    const timers = new Map();
    const observers = [];
    const records = [];
    const media = {};
    let sequence = 0;
    let frameTime = 0;
    function element() {
      const listeners = {};
      const properties = {};
      return {
        dataset              : { aetherGlass: 'surface' }, isConnected          : true, shown                : true, listeners, properties,
        style                : { setProperty(name, value) { properties[name] = value; }, removeProperty(name) { delete properties[name]; } },
        addEventListener(name, callback) { listeners[name] = callback; },
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 }),
        getClientRects() { return this.shown ? [1] : []; }, matches              : () => false
      };
    }
    const header = element();
    const panel = element();
    panel.shown = false;
    const palette = { addEventListener: (name, fn) => { events['palette:' + name] = fn; } };
    const body = { hasAttribute: () => true, dataset: { aetherGlass: String(!disabled) }, scrollHeight: height, scrollWidth: 1000 };
    const document = {
      body, documentElement : {}, readyState      : 'complete', hidden          : false,
      querySelector   : () => palette,
      querySelectorAll: selector => (selector.startsWith('[data-aether-glass') ? [header, panel] : []),
      addEventListener: (name, fn) => { events[name] = fn; }
    };
    const context = {
      document,
      window    : { addEventListener: (name, fn) => { events[name] = fn; } },
      matchMedia: query => {
        const preference = { matches: reduced && query.includes('transparency'), addEventListener(name, fn) { this.change = fn; } };
        media[query.includes('transparency') ? 'transparency' : 'motion'] = preference;
        return preference;
      },
      MutationObserver: class {
        constructor(callback) { this.callback = callback; observers.push(this); }
        observe() {}
      },
      getComputedStyle     : () => ({ visibility: 'visible', getPropertyValue: () => '#ffffff' }),
      innerWidth           : 1000,
      setTimeout           : (fn, delay) => { timers.set(++sequence, { fn, delay }); return sequence; },
      clearTimeout         : id => timers.delete(id),
      requestAnimationFrame: fn => { timers.set(++sequence, { fn() { fn(frameTime += 16); }, delay: 16 }); return sequence; },
      cancelAnimationFrame : id => timers.delete(id),
      performance          : { now: () => frameTime },
      console              : { warn() {} }
    };
    if (library) {
      context.liquidGL = options => {
        if (fail) throw new Error('GPU failed');
        const record = { options, destroyed: false, tintChanges: 0 };
        records.push(record);
        if (ready) options.on.init();
        return { destroy() { record.destroyed = true; }, setTint() { record.tintChanges++; } };
      };
    }
    vm.runInNewContext(source, context);
    function flush(delay = 100) {
      for (const [id, item] of [...timers]) if (item.delay === delay) { timers.delete(id); item.fn(); }
    }
    flush();
    return { events, flush, records, header, panel, media, document, appearance: observers[0].callback, visibility: observers[1].callback };
  }
  for (const options of [{ disabled: true }, { reduced: true }, { library: false }, { height: 100000 }]) {
    it('retains native content without creating unsupported lenses: ' + JSON.stringify(options), () => {
      const app = setup(options);
      assert.equal(app.records.length, 0);
      assert.equal(app.header.dataset.aetherLens, undefined);
    });
  }
  it('adds and removes dialog lenses without recreating navigation', () => {
    const app = setup();
    const id = app.header.dataset.aetherLens;
    app.panel.shown = true;
    app.visibility(); app.flush();
    assert.equal(app.records.length, 2);
    assert.equal(app.header.dataset.aetherLens, id);
    app.panel.shown = false;
    app.visibility(); app.flush();
    assert.equal(app.records[1].destroyed, true);
    assert.equal(app.records[0].destroyed, false);
    assert.equal(app.panel.dataset.aetherLens, undefined);
  });
  it('refreshes theme snapshots and releases old instances', () => {
    const app = setup();
    app.appearance(); app.flush();
    assert.equal(app.records.length, 2);
    assert.equal(app.records[0].destroyed, true);
    assert.equal(app.header.dataset.aetherGlassState, 'ready');
  });
  it('changes filter tint without recreating the dialog or navigation', () => {
    const app = setup();
    app.events['palette:click']({ target: { closest: () => true } }); app.flush();
    assert.equal(app.records.length, 1);
    assert.equal(app.records[0].tintChanges, 1);
  });
  it('cleans up before PJAX and page exit and resumes once', () => {
    const app = setup();
    app.events['pjax:send']();
    assert.equal(app.records[0].destroyed, true);
    app.events['pjax:complete'](); app.flush();
    app.events.pagehide();
    assert.equal(app.records[1].destroyed, true);
    app.events.pageshow(); app.flush();
    assert.equal(app.records.length, 3);
    assert.equal(app.header.dataset.aetherGlassState, 'ready');
  });
  it('releases GPU work when hidden and respects reduced transparency on return', () => {
    const app = setup();
    app.document.hidden = true; app.events.visibilitychange();
    assert.equal(app.records[0].destroyed, true);
    app.media.transparency.matches = true;
    app.document.hidden = false; app.events.visibilitychange(); app.flush();
    assert.equal(app.records.length, 1);
    assert.equal(app.header.dataset.aetherLens, undefined);
  });
  it('turns off fluid interaction for reduced motion', () => {
    const app = setup();
    app.media.motion.matches = true; app.media.motion.change(); app.flush();
    assert.equal(app.records[1].options.interaction, 'none');
    assert.equal(app.records[1].options.specular, false);
  });
  it('restores failed or timed-out targets and avoids retry loops', () => {
    for (const options of [{ ready: false }, { fail: true }]) {
      const app = setup(options);
      app.flush(8000);
      assert.equal(app.header.dataset.aetherLens, undefined);
      const count = app.records.length;
      app.visibility(); app.flush();
      assert.equal(app.records.length, count);
      assert.ok(app.records.every(record => record.destroyed));
    }
  });
  it('retains pointer highlights only for CSS fallback and removes them on leave', () => {
    const fallback = setup({ library: false });
    fallback.header.listeners.pointermove({ pointerType: 'mouse', clientX: 50, clientY: 50 });
    fallback.flush(16);
    assert.equal(fallback.header.properties['--aether-liquid-x'], '50.00%');
    fallback.header.listeners.pointerleave();
    assert.deepEqual(fallback.header.properties, {});
    const gpu = setup();
    gpu.header.listeners.pointermove({ pointerType: 'mouse', clientX: 50, clientY: 50 });
    gpu.flush(16);
    assert.deepEqual(gpu.header.properties, {});
  });
});
