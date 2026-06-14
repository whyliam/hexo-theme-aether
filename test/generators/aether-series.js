'use strict';

const Hexo = require('hexo');

describe('aether-series', () => {
  let hexo,
      generatorFn;

  function makeLocals(posts) {
    return {
      posts: {
        toArray: () => posts,
        filter : fn => {
          const r = posts.filter(fn);
          return { toArray: () => r };
        },
        length: posts.length
      }
    };
  }

  function run(locals) {
    const result = generatorFn.call(hexo, locals);
    if (result && typeof result.value === 'function') return result.value();
    return result;
  }

  before(() => {
    hexo = new Hexo(__dirname, { silent: true });
    hexo.theme.config = { scheme: 'Aether', aether: {} };
    global.hexo = hexo;
    require('../../scripts/generators/aether-series');
    generatorFn = hexo.extend.generator.list()['aether-series'];
  });

  after(() => {
    delete global.hexo;
  });

  it('generates index and per-series pages', () => {
    const posts = [
      { title: 'A1', date: new Date('2026-01-01'), path: 'a1/', series: 'Alpha' },
      { title: 'A2', date: new Date('2026-02-01'), path: 'a2/', series: 'Alpha' },
      { title: 'B1', date: new Date('2026-03-01'), path: 'b1/', series: 'Beta' }
    ];
    const result = run(makeLocals(posts));
    result.should.have.length(3);
    result[0].path.should.equal('series/index.html');
    result[0].data.series_list.should.have.length(2);
    result.find(r => r.path === 'series/alpha/index.html').should.not.equal(undefined);
    result.find(r => r.path === 'series/beta/index.html').should.not.equal(undefined);
  });

  it('sorts series_list by latest_date desc', () => {
    const posts = [
      { title: 'Old', date: new Date('2020-01-01'), path: 'o/', series: 'OldSeries' },
      { title: 'New', date: new Date('2026-06-01'), path: 'n/', series: 'NewSeries' }
    ];
    const result = run(makeLocals(posts));
    result[0].data.series_list[0].name.should.equal('NewSeries');
  });

  it('returns empty when no series posts', () => {
    const posts = [
      { title: 'P', date: new Date('2026-01-01'), path: 'p/' }
    ];
    run(makeLocals(posts)).should.have.length(0);
  });

  it('generates inferred series pages from stable content signals', () => {
    const posts = [
      { title: 'L121_意图驱动时代', date: new Date('2026-06-01'), path: '2026/06/newsletter-121/' },
      { title: 'Agent Runtime 实践', date: new Date('2026-05-01'), path: 'agent-runtime/', tags: ['Agent'] }
    ];
    const result = run(makeLocals(posts));
    result.find(r => r.path === 'series/newsletter-周刊/index.html').should.not.equal(undefined);
    result.find(r => r.path === 'series/agent-runtime/index.html').should.not.equal(undefined);
  });

  it('returns empty when scheme is not Aether', () => {
    const orig = hexo.theme.config.scheme;
    hexo.theme.config.scheme = 'Muse';
    const posts = [{ title: 'P', date: new Date('2026-01-01'), path: 'p/', series: 'S' }];
    run(makeLocals(posts)).should.have.length(0);
    hexo.theme.config.scheme = orig;
  });

  it('returns empty when explicitly disabled', () => {
    hexo.theme.config.aether = { series_pages: { enable: false } };
    const posts = [{ title: 'P', date: new Date('2026-01-01'), path: 'p/', series: 'S' }];
    run(makeLocals(posts)).should.have.length(0);
    hexo.theme.config.aether = {};
  });

  it('slugifies CJK series names', () => {
    const posts = [
      { title: 'P', date: new Date('2026-01-01'), path: 'p/', series: 'Newsletter 周刊' }
    ];
    const result = run(makeLocals(posts));
    result.find(r => r.path.includes('newsletter-周刊')).should.not.equal(undefined);
  });

  it('includes recent_posts in series_list for index page', () => {
    const posts = [
      { title: 'A1', date: new Date('2026-01-01'), path: 'a1/', series: 'Alpha' },
      { title: 'A2', date: new Date('2026-02-01'), path: 'a2/', series: 'Alpha' },
      { title: 'A3', date: new Date('2026-03-01'), path: 'a3/', series: 'Alpha' },
      { title: 'A4', date: new Date('2026-04-01'), path: 'a4/', series: 'Alpha' }
    ];
    const result = run(makeLocals(posts));
    const list = result[0].data.series_list[0];
    list.recent_posts.should.have.length(3);
    list.recent_posts[0].title.should.equal('A4');
    list.recent_posts[2].title.should.equal('A2');
  });

  it('includes post details in series page data', () => {
    const posts = [
      { title: 'First', date: new Date('2026-01-01'), path: 'f/', permalink: 'http://test/f/', series: 'S', description: 'Desc', excerpt: 'Ex' },
      { title: 'Second', date: new Date('2026-02-01'), path: 's/', permalink: 'http://test/s/', series: 'S' }
    ];
    const result = run(makeLocals(posts));
    const seriesPage = result.find(r => r.layout === 'series');
    seriesPage.data.series_posts.should.have.length(2);
    seriesPage.data.series_posts[0].index.should.equal('01');
    seriesPage.data.series_posts[0].title.should.equal('Second');
    seriesPage.data.series_posts[1].title.should.equal('First');
  });
});
