'use strict';

const { appearanceStyle, colorMode, glassOptions, homeSections, number, sitePath } = require('../../scripts/lib/aether-config');
const { aggregateSeries, inferredSeriesName } = require('../../scripts/lib/aether-content');

describe('Aether public configuration', () => {
  it('keeps subdirectory paths rooted exactly once', () => {
    sitePath('2026/note/', '/journal/').should.equal('/journal/2026/note/');
    sitePath('/journal/2026/note/', '/journal/').should.equal('/journal/2026/note/');
    sitePath('/archives/', '/journal').should.equal('/journal/archives/');
    sitePath('/archives/').should.equal('/archives/');
    sitePath('#reading', '/journal/').should.equal('#reading');
    sitePath('https://example.org/', '/journal/').should.equal('https://example.org/');
  });

  it('accepts reordered and omitted home sections without duplicates', () => {
    homeSections({ home: { sections: ['latest', 'hero', 'latest'] } }).should.deep.equal(['latest', 'hero']);
    homeSections({ home: { sections: [] } }).should.deep.equal([]);
    (() => homeSections({ home: { sections: ['unknown'] } })).should.throw(/home.sections/);
  });

  it('emits configured palette and typography without mutating configuration', () => {
    const config = { appearance: { palette: { light: { accent: '#663399' } }, font: { sans: 'Arial, sans-serif' } } };
    const before = JSON.stringify(config);
    const style = appearanceStyle(config);
    style.should.include('--aether-accent:#663399');
    style.should.include('--aether-ff-sans:Arial, sans-serif');
    JSON.stringify(config).should.equal(before);
  });

  it('rejects invalid CSS values rather than injecting them into the head', () => {
    (() => appearanceStyle({ appearance: { palette: { light: { accent: '</style>' } } } })).should.throw(/hex color/);
    (() => appearanceStyle({ appearance: { font: { sans: 'Arial; color:red' } } })).should.throw(/font family/);
    (() => appearanceStyle({ appearance: { glass: { opacity: { dark: 2 } } } })).should.throw(/between/);
  });

  it('disables glass decoration and pointer tracking together', () => {
    const config = { appearance: { glass: { enable: false } } };
    glassOptions(config).pointer.should.equal(false);
    appearanceStyle(config).should.include('backdrop-filter:none');
    glassOptions({ appearance: { glass: { pointer: false, follow_duration: 0 } } }).follow.should.equal(0);
  });

  it('validates a forced color scheme before emitting it in the head', () => {
    colorMode({ appearance: { mode: 'light' } }).should.equal('light');
    (() => colorMode({ appearance: { mode: '<script>' } })).should.throw(/appearance.mode/);
  });

  it('preserves zero limits and rejects out-of-range values', () => {
    number(0, 3, 0, 50).should.equal(0);
    (() => number(-1, 3, 0, 50)).should.throw();
  });

  it('does not invent personal series on an unconfigured site', () => {
    const post = { title: 'My Agent notes', path: 'agent/', date: new Date() };
    aggregateSeries([post]).should.deep.equal([]);
    (inferredSeriesName(post) === null).should.equal(true);
  });

  it('uses site-defined series rules while explicit frontmatter wins', () => {
    const rules = [{ name: 'Garden', tags: ['botany'] }];
    inferredSeriesName({ title: 'Orchids', tags: ['botany'] }, rules).should.equal('Garden');
    inferredSeriesName({ series: 'Field notes', tags: ['botany'] }, rules).should.equal('Field notes');
  });
});
