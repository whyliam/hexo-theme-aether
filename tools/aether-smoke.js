'use strict';

// Exercise the actual npm tarball in an isolated consumer, not the repository checkout.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const yaml = require('js-yaml');

const repository = path.resolve(__dirname, '..');
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'aether-consumer-'));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
function run(binary, args, cwd = temporary) {
  return execFileSync(binary, args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 180000, shell: process.platform === 'win32' });
}
function write(file, content) {
  const target = path.join(temporary, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}
function read(file) { return fs.readFileSync(path.join(temporary, 'public', file), 'utf8'); }
function generate(config, theme) {
  write('_config.yml', yaml.dump({ title: 'Independent Notes', author: 'Aether User', description: 'A clean consumer fixture.', language: 'en', timezone: 'UTC', theme: 'aether', permalink: ':year/:month/:title/', archive: 1, ...config }));
  write('_config.aether.yml', yaml.dump(theme));
  const cli = path.join(temporary, 'node_modules/hexo/bin/hexo');
  run(process.execPath, [cli, 'clean']);
  run(process.execPath, [cli, 'generate']);
}

try {
  const packed = JSON.parse(run(npm, ['pack', '--json', '--pack-destination', temporary], repository))[0];
  const tarball = path.join(temporary, packed.filename);
  write('package.json', JSON.stringify({ name        : 'aether-consumer', private     : true, hexo        : { version: '8.1.1' }, dependencies: {
    'hexo-theme-aether'      : `file:${tarball}`, hexo                     : '8.1.1', 'hexo-renderer-stylus'   : '3.0.1', 'hexo-renderer-marked'   : '7.0.1',
    'hexo-generator-index'   : '4.0.0', 'hexo-generator-archive' : '2.0.0', 'hexo-generator-category': '2.0.0', 'hexo-generator-tag'     : '2.0.0'
  } }, null, 2));
  run('git', ['init']);
  run('git', ['config', 'core.hooksPath', '.existing-hooks']);
  run(npm, ['install', '--no-audit', '--no-fund']);
  assert.equal(run('git', ['config', 'core.hooksPath']).trim(), '.existing-hooks');
  const installed = JSON.parse(fs.readFileSync(path.join(temporary, 'node_modules/hexo-theme-aether/package.json'), 'utf8'));
  assert.equal(installed.name, 'hexo-theme-aether');
  assert.equal(installed.scripts.prepare, undefined);
  assert.ok(fs.existsSync(path.join(temporary, 'node_modules/hexo-theme-aether/LICENSE.md')));
  assert.ok(!fs.existsSync(path.join(temporary, 'node_modules/hexo-theme-aether/docs/design/archive')));

  // Empty default installation must build without personal content or missing data errors.
  generate({ url: 'https://example.test', root: '/' }, {});
  let html = read('index.html');
  assert.ok(html.includes('Aether User'));
  assert.ok(read('archives/index.html').includes('Your archive starts with the first post.'));
  assert.ok(html.includes('menu-item-home') && html.includes('menu-item-archives'));
  assert.ok(!html.includes('我是 Liam'));
  assert.ok(!html.includes('github.com/whyliam'));

  for (const [slug, type] of [['writing-one', ''], ['writing-two', ''], ['field-note', 'note'], ['photograph', 'visual']]) {
    write(`source/_posts/${slug}.md`, yaml.dump({ title: slug, date: '2026-10-01', type, series: type ? '' : 'Fieldwork', cover: type === 'visual' ? '/images/sample.svg' : undefined }).replace(/^/, '---\n') + '---\n\nA standalone fixture with a real article body.');
  }
  write('source/images/sample.svg', '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480"><rect width="640" height="480" fill="#88aa99"/></svg>');
  const theme = { aether: {
    home      : { sections: ['latest', 'hero', 'personal', 'series'] },
    hero      : { artwork: false }, latest    : { limit: 1 }, notes     : { enable: false }, visuals   : { enable: true, limit: 1 },
    appearance: { palette: { light: { accent: '#663399' } }, glass: { enable: false } }
  } };
  generate({ url: 'https://example.test/journal/', root: '/journal/' }, theme);
  html = read('index.html');
  assert.ok(html.indexOf('id="aether-latest"') < html.indexOf('class="aether-intro'));
  assert.equal((html.match(/class="aether-row(?: is-latest)?"/g) || []).length, 1);
  assert.equal((html.match(/class="aether-note"/g) || []).length, 0);
  assert.equal((html.match(/class="aether-visual /g) || []).length, 1);
  assert.ok(!html.includes('data-organic'));
  assert.ok(html.includes('--aether-accent:#663399'));
  assert.ok(html.includes('data-aether-pointer="false"'));
  const index = JSON.parse(read('aether-search.json'));
  assert.ok(index.entries.length > 0 && index.entries.every(entry => entry.path.startsWith('/journal/')));
  assert.ok(html.includes('/journal/aether-search.json'));
  for (const match of html.matchAll(/(?:href|src)="(\/[^"\s]*)"/g)) {
    const url = match[1].split('#')[0].split('?')[0];
    if (url.startsWith('//')) continue;
    assert.ok(url.startsWith('/journal/'), `Unprefixed URL: ${url}`);
    const file = decodeURI(url.slice('/journal/'.length));
    assert.ok(fs.existsSync(path.join(temporary, 'public', file.endsWith('/') ? file + 'index.html' : file)), `Missing asset: ${url}`);
  }
  theme.aether.latest.limit = 0;
  theme.aether.notes_visuals = { enable: false };
  generate({ url: 'https://example.test', root: '/' }, theme);
  html = read('index.html');
  assert.ok(!html.includes('id="aether-latest"') && !html.includes('id="aether-personal"'));
  // The documented clone-style runtime installation also leaves consumer hooks intact.
  const clone = path.join(temporary, 'themes/aether');
  fs.mkdirSync(path.dirname(clone), { recursive: true });
  fs.cpSync(path.join(temporary, 'node_modules/hexo-theme-aether'), clone, { recursive: true });
  run(npm, ['install', '--prefix', clone, '--omit=dev', '--no-audit', '--no-fund']);
  generate({ url: 'https://example.test', root: '/' }, theme);
  assert.equal(run('git', ['config', 'core.hooksPath']).trim(), '.existing-hooks');
  assert.ok(read('index.html').includes('Aether User'));
  console.warn('Consumer smoke passed: npm install, empty site, module order/limits, glass off, palette, subdirectory assets and search.');
  console.warn(`Consumer fixture: ${temporary}`);
} catch (error) {
  if (error.stdout) console.warn(String(error.stdout).slice(-5000));
  if (error.stderr) console.warn(String(error.stderr).slice(-5000));
  console.warn(`Consumer fixture retained: ${temporary}`);
  throw error;
}
