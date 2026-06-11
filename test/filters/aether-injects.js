'use strict';

const Hexo = require('hexo');
const path = require('path');
const fs = require('fs');

describe('aether-injects', () => {
  let hexo,
      filterFn;

  function makeInjects() {
    const calls = [];
    return {
      postBodyEnd: {
        raw: (name, content, locals, opts) => {
          calls.push({ name, content, locals, opts });
        }
      },
      _calls: calls
    };
  }

  before(() => {
    hexo = new Hexo(path.resolve(__dirname, '..', '..'), { silent: true });
    global.hexo = hexo;
    require('../../scripts/filters/aether-injects');
    const filters = hexo.extend.filter.list();
    filterFn = filters.theme_inject[0];
  });

  after(() => {
    delete global.hexo;
  });

  it('skips when scheme is not Aether', () => {
    hexo.theme.config = { scheme: 'Muse', aether: { cta: {} } };
    const injects = makeInjects();
    filterFn(injects);
    injects._calls.should.have.length(0);
  });

  it('injects series-nav when scheme is Aether', () => {
    hexo.theme.config = { scheme: 'Aether', aether: {} };
    const injects = makeInjects();
    filterFn(injects);
    injects._calls.find(c => c.name === 'aether-series-nav').should.not.equal(undefined);
  });

  it('injects CTA when enabled', () => {
    hexo.theme.config = { scheme: 'Aether', aether: { cta: { enable: true } } };
    const injects = makeInjects();
    filterFn(injects);
    injects._calls.find(c => c.name === 'aether-cta').should.not.equal(undefined);
  });

  it('does not inject CTA when explicitly disabled', () => {
    hexo.theme.config = { scheme: 'Aether', aether: { cta: { enable: false } } };
    const injects = makeInjects();
    filterFn(injects);
    (injects._calls.find(c => c.name === 'aether-cta') === undefined).should.equal(true);
  });

  it('reads actual partial files', () => {
    const seriesNav = path.resolve(__dirname, '..', '..', 'layout', '_partials', 'post', 'aether-series-nav.njk');
    const cta = path.resolve(__dirname, '..', '..', 'layout', '_partials', 'post', 'aether-cta.njk');
    fs.existsSync(seriesNav).should.equal(true);
    fs.existsSync(cta).should.equal(true);
  });
});
