'use strict';

const Hexo = require('hexo');

describe('Aether empty home', () => {
  let hexo, generate;
  before(() => {
    hexo = new Hexo(__dirname, { silent: true });
    hexo.theme.config = { scheme: 'Aether' };
    global.hexo = hexo;
    require('../../scripts/generators/aether-empty-home');
    generate = hexo.extend.generator.list()['aether-empty-home'];
  });
  after(() => { delete global.hexo; });
  function run(posts) {
    const result = generate.call(hexo, { posts });
    return result && typeof result.value === 'function' ? result.value() : result;
  }
  it('generates an empty homepage without replacing populated sites', () => {
    run({ length: 0 })[0].path.should.equal('index.html');
    run({ length: 1 }).should.deep.equal([]);
  });
  it('generates the empty archive at the configured path', () => {
    hexo.config.archive_dir = 'writing/archive';
    run({ length: 0 })[1].path.should.equal('writing/archive/index.html');
  });
  it('respects a configured index path', () => {
    hexo.config.index_generator = { path: '/writing/' };
    run({ length: 0 })[0].path.should.equal('writing/index.html');
  });
});
