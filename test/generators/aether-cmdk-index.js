'use strict';

const Hexo = require('hexo');

describe('aether-cmdk-index', () => {
  let hexo,
      generatorFn;

  function makeCollection(arr) {
    return {
      toArray: () => arr,
      filter : fn => {
        const r = arr.filter(fn);
        return { toArray: () => r };
      },
      length: arr.length
    };
  }

  function makeLocals(posts, pages, categories) {
    return {
      posts     : makeCollection(posts || []),
      pages     : makeCollection(pages || []),
      categories: makeCollection(categories || [])
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
    require('../../scripts/generators/aether-cmdk-index');
    generatorFn = hexo.extend.generator.list()['aether-cmdk-index'];
  });

  after(() => {
    delete global.hexo;
  });

  it('generates aether-search.json', () => {
    const posts = [
      { title: 'Hello', date: new Date('2026-06-01'), path: 'hello/', content: '<p>World</p>' }
    ];
    const result = run(makeLocals(posts));
    result.should.have.length(1);
    result[0].path.should.equal('aether-search.json');
    const data = JSON.parse(result[0].data);
    data.total.should.equal(1);
    data.entries[0].title.should.equal('Hello');
    data.entries[0].kind.should.equal('post');
    data.entries[0].path.should.equal('/hello/');
  });

  it('classifies visual and note types', () => {
    const posts = [
      { title: 'V', date: new Date('2026-06-01'), path: 'v/', type: 'visual' },
      { title: 'N', date: new Date('2026-06-01'), path: 'n/', type: 'note' },
      { title: 'P', date: new Date('2026-06-01'), path: 'p/' }
    ];
    const result = run(makeLocals(posts));
    const data = JSON.parse(result[0].data);
    data.entries.find(e => e.title === 'V').kind.should.equal('visual');
    data.entries.find(e => e.title === 'N').kind.should.equal('note');
    data.entries.find(e => e.title === 'P').kind.should.equal('post');
  });

  it('keeps category-only posts as regular posts', () => {
    const posts = [
      {
        title     : 'Paris',
        date      : new Date('2026-06-01'),
        path      : 'paris/',
        categories: ['Travel & Visuals']
      }
    ];
    const result = run(makeLocals(posts));
    const data = JSON.parse(result[0].data);
    data.entries.find(e => e.title === 'Paris').kind.should.equal('post');
  });

  it('includes series entries', () => {
    const posts = [
      { title: 'S1', date: new Date('2026-06-01'), path: 's1/', series: 'My Series' }
    ];
    const result = run(makeLocals(posts));
    const data = JSON.parse(result[0].data);
    const series = data.entries.find(e => e.kind === 'series');
    series.should.not.equal(undefined);
    series.title.should.equal('My Series');
    series.path.should.include('/series/');
  });

  it('includes inferred series entries', () => {
    const posts = [
      { title: 'L121_意图驱动时代', date: new Date('2026-06-01'), path: 'newsletter-121/' }
    ];
    const result = run(makeLocals(posts));
    const data = JSON.parse(result[0].data);
    const series = data.entries.find(e => e.kind === 'series');
    series.title.should.equal('Newsletter 周刊');
    series.path.should.equal('/series/newsletter-周刊/');
  });

  it('includes page entries', () => {
    const pages = [
      { title: 'About', date: new Date('2026-06-01'), path: 'about/', description: 'About me' }
    ];
    const result = run(makeLocals([], pages));
    const data = JSON.parse(result[0].data);
    data.entries.find(e => e.kind === 'page').title.should.equal('About');
  });

  it('includes category entries', () => {
    const cats = [{ name: 'Tech', path: 'categories/tech/', length: 42 }];
    const result = run(makeLocals([], [], cats));
    const data = JSON.parse(result[0].data);
    const cat = data.entries.find(e => e.kind === 'category');
    cat.title.should.equal('Tech');
    cat.summary.should.include('42');
  });

  it('deduplicates by kind+path', () => {
    const posts = [
      { title: 'Dup', date: new Date('2026-06-01'), path: 'dup/' },
      { title: 'Dup', date: new Date('2026-06-01'), path: 'dup/' }
    ];
    const result = run(makeLocals(posts));
    const data = JSON.parse(result[0].data);
    data.entries.filter(e => e.path === '/dup/').should.have.length(1);
  });

  it('strips HTML from summary', () => {
    const posts = [
      { title: 'Tag', date: new Date('2026-06-01'), path: 't/', description: '<b>Bold</b> text' }
    ];
    const result = run(makeLocals(posts));
    const data = JSON.parse(result[0].data);
    data.entries[0].summary.should.equal('Bold text');
  });

  it('returns empty when scheme is not Aether', () => {
    const orig = hexo.theme.config.scheme;
    hexo.theme.config.scheme = 'Muse';
    run(makeLocals([{ title: 'P', date: new Date(), path: 'p/' }])).should.have.length(0);
    hexo.theme.config.scheme = orig;
  });

  it('returns empty when cmdk disabled', () => {
    hexo.theme.config.aether = { cmdk: { enable: false } };
    run(makeLocals([{ title: 'P', date: new Date(), path: 'p/' }])).should.have.length(0);
    hexo.theme.config.aether = {};
  });

  it('extracts tags from posts', () => {
    const posts = [
      { title: 'Tagged', date : new Date('2026-06-01'), path : 'tg/',
        tags : { length: 2, toArray: () => [{ name: 'AI' }, { name: 'Agent' }] } }
    ];
    const result = run(makeLocals(posts));
    const data = JSON.parse(result[0].data);
    data.entries[0].tags.should.deep.equal(['AI', 'Agent']);
  });

  it('skips pages without title', () => {
    const pages = [
      { path: 'notitle/', date: new Date() },
      { title: 'HasTitle', path: 'has/', date: new Date() }
    ];
    const result = run(makeLocals([], pages));
    const data = JSON.parse(result[0].data);
    data.entries.filter(e => e.kind === 'page').should.have.length(1);
  });
});
