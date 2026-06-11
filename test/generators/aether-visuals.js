'use strict';

const Hexo = require('hexo');

describe('aether-visuals', () => {
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
    require('../../scripts/generators/aether-visuals');
    generatorFn = hexo.extend.generator.list()['aether-visuals'];
  });

  after(() => {
    delete global.hexo;
  });

  it('generates visuals index page', () => {
    const posts = [
      { title: 'Photo Set', date: new Date('2026-06-01'), path: 'ps/', type: 'visual', location: 'Tokyo', camera: 'X-T5', cover: '/img/cover.jpg', photos: ['/img/1.jpg'] }
    ];
    const result = run(makeLocals(posts));
    result.should.have.length(1);
    result[0].path.should.equal('visuals/index.html');
    result[0].data.visual_posts.should.have.length(1);
    result[0].data.visual_posts[0].location.should.equal('Tokyo');
    result[0].data.visual_posts[0].cover.should.equal('/img/cover.jpg');
  });

  it('uses photos[0] as cover fallback', () => {
    const posts = [
      { title: 'No Cover', date: new Date('2026-06-01'), path: 'nc/', type: 'visual', photos: ['/img/first.jpg', '/img/second.jpg'] }
    ];
    const result = run(makeLocals(posts));
    result[0].data.visual_posts[0].cover.should.equal('/img/first.jpg');
  });

  it('cover is null when no cover or photos', () => {
    const posts = [
      { title: 'Empty', date: new Date('2026-06-01'), path: 'e/', type: 'visual' }
    ];
    const result = run(makeLocals(posts));
    (result[0].data.visual_posts[0].cover === null).should.equal(true);
  });

  it('excludes non-visual posts', () => {
    const posts = [
      { title: 'Post', date: new Date('2026-06-01'), path: 'p/' },
      { title: 'Note', date: new Date('2026-06-01'), path: 'n/', type: 'note' },
      { title: 'Visual', date: new Date('2026-06-01'), path: 'v/', type: 'visual' }
    ];
    const result = run(makeLocals(posts));
    result[0].data.visual_posts.should.have.length(1);
    result[0].data.visual_posts[0].title.should.equal('Visual');
  });

  it('returns empty when no visual posts', () => {
    const posts = [
      { title: 'Post', date: new Date('2026-06-01'), path: 'p/' }
    ];
    run(makeLocals(posts)).should.have.length(0);
  });

  it('returns empty when scheme is not Aether', () => {
    const orig = hexo.theme.config.scheme;
    hexo.theme.config.scheme = 'Muse';
    const posts = [{ title: 'V', date: new Date('2026-06-01'), path: 'v/', type: 'visual' }];
    run(makeLocals(posts)).should.have.length(0);
    hexo.theme.config.scheme = orig;
  });

  it('returns empty when explicitly disabled', () => {
    hexo.theme.config.aether = { visuals_page: { enable: false } };
    const posts = [{ title: 'V', date: new Date('2026-06-01'), path: 'v/', type: 'visual' }];
    run(makeLocals(posts)).should.have.length(0);
    hexo.theme.config.aether = {};
  });

  it('sorts visuals by date desc', () => {
    const posts = [
      { title: 'Old', date: new Date('2020-01-01'), path: 'o/', type: 'visual' },
      { title: 'New', date: new Date('2026-06-01'), path: 'n/', type: 'visual' }
    ];
    const result = run(makeLocals(posts));
    result[0].data.visual_posts[0].title.should.equal('New');
  });

  it('uses layout field as type fallback', () => {
    const posts = [
      { title: 'LayoutVisual', date: new Date('2026-06-01'), path: 'lv/', layout: 'visual' }
    ];
    const result = run(makeLocals(posts));
    result.should.have.length(1);
    result[0].data.visual_posts[0].title.should.equal('LayoutVisual');
  });

  it('uses Travel & Visuals category when type is absent', () => {
    const posts = [
      {
        title     : 'Paris',
        date      : new Date('2026-06-01'),
        path      : 'paris/',
        categories: ['Travel & Visuals']
      }
    ];
    const result = run(makeLocals(posts));
    result[0].data.visual_posts[0].title.should.equal('Paris');
  });
});
