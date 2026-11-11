'use strict';

const Hexo = require('hexo');

describe('aether-data', () => {
  let hexo;

  function makePosts(arr) {
    return {
      toArray: () => arr,
      filter : fn => {
        const r = arr.filter(fn);
        return { toArray: () => r };
      },
      length: arr.length
    };
  }

  function makeCategories(arr) {
    return {
      toArray: () => arr.map(c => ({
        name  : c.name,
        path  : `categories/${c.name}/`,
        length: c.count,
        posts : makePosts(c.posts || [])
      }))
    };
  }

  before(() => {
    hexo = new Hexo(__dirname, { silent: true });
    global.hexo = hexo;
    require('../../scripts/helpers/aether-data');
  });

  after(() => {
    delete global.hexo;
  });

  function callHelper(name, args, ctx) {
    const fn = hexo.extend.helper.list()[name];
    return fn.call(ctx, ...args);
  }

  function baseCtx(posts, extra) {
    return {
      site : { posts: makePosts(posts), categories: makeCategories([]) },
      theme: { aether: {} },
      ...extra
    };
  }

  describe('shared archives', () => {
    it('keeps home and generated series in sync without mutating input', () => {
      const { aggregateSeries } = require('../../scripts/lib/aether-content');
      const posts = [
        { title: 'L145_New', path: 'newsletter-145/', date: new Date('2026-11-07') },
        { title: 'L144_Old', path: 'newsletter-144/', date: new Date('2026-10-31') },
        { title: 'Photo', type: 'visual', series: 'Newsletter 周刊', date: new Date() }
      ];
      const home = callHelper('aether_series', [], baseCtx(posts));
      home.should.deep.equal(aggregateSeries(makePosts(posts)));
      home[0].count.should.equal(2);
      home[0].posts[0].title.should.equal('L144_Old');
      home[0].recent_posts[0].path.should.equal('newsletter-145/');
      posts[0].title.should.equal('L145_New');
    });
    it('preserves unselected visual records and selected order', () => {
      const posts = [
        { title: 'Font', path: 'font/', type: 'visual', date: new Date('2026-01-01') },
        { title: 'Paris', path: 'paris/', type: 'visual', date: new Date('2024-01-01') },
        { title: 'Train', path: 'train/', type: 'visual', date: new Date('2025-01-01') }
      ];
      const ctx = baseCtx(posts, { theme: { aether: { visuals: { posts: ['train/', 'missing/', 'paris/', 'train/'] } } } });
      ctx.aether_visuals = limit => callHelper('aether_visuals', [limit], ctx);
      const result = callHelper('aether_visual_archive', [], ctx);
      result.selected.map(p => p.path).should.deep.equal(['train/', 'paris/']);
      result.others.map(p => p.path).should.deep.equal(['font/']);
    });
    it('does not truncate series and orders ties by recency then name', () => {
      const items = Array.from({ length: 8 }, (_, i) => ({ name: String(i), count: 2, latest_date: new Date('2026-01-01') }));
      items[7].latest_date = new Date('2026-11-01');
      const result = callHelper('aether_series_selection', [items, 'missing'], baseCtx([]));
      result.others.should.have.length(8);
      result.others[0].name.should.equal('7');
      result.others[1].name.should.equal('0');
    });
  });

  describe('newsletter presentation', () => {
    it('separates the issue from a newsletter heading without changing the post', () => {
      const post = { title: 'L144_门禁：智能正在变便宜', series: 'Newsletter 周刊' };
      callHelper('aether_post_issue', [post], baseCtx([])).should.equal('144');
      callHelper('aether_display_title', [post], baseCtx([])).should.equal('门禁：智能正在变便宜');
      post.title.should.equal('L144_门禁：智能正在变便宜');
    });

    it('preserves ordinary titles and explicitly different series', () => {
      for (const post of [{ title: '知识管理' }, { title: 'L2_协议', series: '网络协议' }]) {
        callHelper('aether_display_title', [post], baseCtx([])).should.equal(post.title);
        callHelper('aether_post_issue', [post], baseCtx([])).should.equal('');
      }
    });
  });

  // ---------- stripTags (tested via aether_summary) ----------
  describe('aether_summary', () => {
    it('strips HTML tags', () => {
      const ctx = baseCtx([]);
      const result = callHelper('aether_summary', [{ content: '<p>Hello <b>world</b></p>' }], ctx);
      result.should.equal('Hello world');
    });

    it('truncates long text with ellipsis', () => {
      const long = '这是一段很长的中文内容。' + '重复内容'.repeat(30);
      const ctx = baseCtx([]);
      const result = callHelper('aether_summary', [{ content: long }, 20], ctx);
      result.length.should.be.at.most(25);
      result.should.match(/…$/);
    });

    it('returns empty for null post', () => {
      const ctx = baseCtx([]);
      callHelper('aether_summary', [null], ctx).should.equal('');
    });

    it('prefers description over content', () => {
      const ctx = baseCtx([]);
      const result = callHelper('aether_summary', [{ description: 'Desc', content: 'Content' }], ctx);
      result.should.equal('Desc');
    });
  });

  // ---------- aether_latest ----------
  describe('aether_latest', () => {
    it('returns regular posts sorted by date desc', () => {
      const posts = [
        { title: 'A', date: new Date('2026-01-01'), path: 'a/' },
        { title: 'B', date: new Date('2026-06-01'), path: 'b/' },
        { title: 'C', date: new Date('2026-03-01'), path: 'c/' }
      ];
      const ctx = baseCtx(posts);
      const result = callHelper('aether_latest', [], ctx);
      result.should.have.length(3);
      result[0].title.should.equal('B');
      result[1].title.should.equal('C');
    });

    it('excludes visual and note types', () => {
      const posts = [
        { title: 'Post', date: new Date('2026-06-01'), path: 'p/' },
        { title: 'Visual', date: new Date('2026-06-02'), path: 'v/', type: 'visual' },
        { title: 'Note', date: new Date('2026-06-03'), path: 'n/', type: 'note' }
      ];
      const ctx = baseCtx(posts);
      const result = callHelper('aether_latest', [], ctx);
      result.should.have.length(1);
      result[0].title.should.equal('Post');
    });

    it('respects limit argument', () => {
      const posts = Array.from({ length: 10 }, (_, i) => ({
        title: `P${i}`, date: new Date(`2026-01-${String(i + 1).padStart(2, '0')}`), path: `p${i}/`
      }));
      const ctx = baseCtx(posts);
      const result = callHelper('aether_latest', [3], ctx);
      result.should.have.length(3);
    });

    it('returns empty when no posts', () => {
      const ctx = baseCtx([]);
      callHelper('aether_latest', [], ctx).should.have.length(0);
    });
  });

  // ---------- aether_visuals ----------
  describe('aether_visuals', () => {
    it('returns only visual posts', () => {
      const posts = [
        { title: 'Photo', date: new Date('2026-06-01'), path: 'ph/', type: 'visual' },
        { title: 'Post', date: new Date('2026-06-02'), path: 'p/' }
      ];
      const ctx = baseCtx(posts);
      const result = callHelper('aether_visuals', [], ctx);
      result.should.have.length(1);
      result[0].title.should.equal('Photo');
    });

    it('defaults to 5 items', () => {
      const posts = Array.from({ length: 8 }, (_, i) => ({
        title: `V${i}`, date: new Date(`2026-01-${String(i + 1).padStart(2, '0')}`), path: `v${i}/`, type: 'visual'
      }));
      const ctx = baseCtx(posts);
      callHelper('aether_visuals', [], ctx).should.have.length(5);
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
      const ctx = baseCtx(posts);
      callHelper('aether_visuals', [], ctx)[0].title.should.equal('Paris');
    });
  });

  describe('aether_series_selection', () => {
    it('features the configured identity and orders other series by accumulated writing', () => {
      const items = [{ name: 'One', count: 1 }, { name: 'Journal', slug: 'journal', count: 145 }, { name: 'Archive', count: 12 }];
      const result = callHelper('aether_series_selection', [items, 'journal'], baseCtx([]));
      result.featured.name.should.equal('Journal');
      result.others.map(item => item.name).should.deep.equal(['Archive', 'One']);
      items[0].name.should.equal('One');
    });
    it('does not invent a featured series when the configured identity is absent', () => {
      const result = callHelper('aether_series_selection', [[{ name: 'One', count: 1 }], 'Missing'], baseCtx([]));
      (result.featured === null).should.equal(true);
      result.others.should.have.length(1);
      callHelper('aether_series_selection', [[], 'Journal'], baseCtx([])).others.should.have.length(0);
    });
  });

  describe('aether_visual_cover', () => {
    it('respects curated photography order, skips missing posts, and deduplicates', () => {
      const posts = [
        { title: 'Paris', path: '2013/paris/' },
        { title: 'Barcelona', path: '2014/barcelona/' }
      ];
      const ctx = baseCtx(posts, { theme: { aether: { visuals: { posts: ['/2014/barcelona/', '/missing/', '/2013/paris/', '/2014/barcelona/'] } } } });
      callHelper('aether_visuals', [], ctx).map(post => post.title).should.deep.equal(['Barcelona', 'Paris']);
      callHelper('aether_visuals', [1], ctx).map(post => post.title).should.deep.equal(['Barcelona']);
    });
    it('prefers an editorial cover over embedded images', () => {
      callHelper('aether_visual_cover', [{ cover: '/cover.jpg', content: '<img src="/body.jpg">' }], baseCtx([])).should.equal('/cover.jpg');
    });
    it('supports photo arrays and article image fallback', () => {
      callHelper('aether_visual_cover', [{ photos: [{ url: '/photo.jpg' }] }], baseCtx([])).should.equal('/photo.jpg');
      callHelper('aether_visual_cover', [{ content: '<p>Travel</p><img alt="sea" src="/sea.jpg">' }], baseCtx([])).should.equal('/sea.jpg');
    });
    it('upgrades the confirmed image host without changing unrelated URLs', () => {
      callHelper('aether_visual_cover', [{ cover: 'http://pics.naaln.com/blog/photo.jpg' }], baseCtx([])).should.equal('https://pics.naaln.com/blog/photo.jpg');
      callHelper('aether_visual_cover', [{ content: '<img src="http://pics.naaln.com/blog/sea.jpg">' }], baseCtx([])).should.equal('https://pics.naaln.com/blog/sea.jpg');
      callHelper('aether_visual_cover', [{ cover: 'http://example.org/photo.jpg' }], baseCtx([])).should.equal('http://example.org/photo.jpg');
    });
    it('keeps missing photography empty instead of inventing a cover', () => {
      callHelper('aether_visual_cover', [{}], baseCtx([])).should.equal('');
    });
    it('excludes typography articles from homepage photography', () => {
      const posts = [
        { title: 'Font', categories: ['Travel & Visuals'], tags: ['Typography'] },
        { title: 'Sea', categories: ['Travel & Visuals'], tags: ['Photography'] }
      ];
      callHelper('aether_visuals', [], baseCtx(posts)).map(post => post.title).should.deep.equal(['Sea']);
    });
  });

  // ---------- aether_notes ----------
  describe('aether_notes', () => {
    it('returns only note posts', () => {
      const posts = [
        { title: 'Memo', date: new Date('2026-06-01'), path: 'n/', type: 'note' },
        { title: 'Post', date: new Date('2026-06-02'), path: 'p/' }
      ];
      const ctx = baseCtx(posts);
      const result = callHelper('aether_notes', [], ctx);
      result.should.have.length(1);
      result[0].title.should.equal('Memo');
    });

    it('defaults to 4 items', () => {
      const posts = Array.from({ length: 7 }, (_, i) => ({
        title: `N${i}`, date: new Date(`2026-01-${String(i + 1).padStart(2, '0')}`), path: `n${i}/`, type: 'note'
      }));
      const ctx = baseCtx(posts);
      callHelper('aether_notes', [], ctx).should.have.length(4);
    });
  });

  // ---------- aether_series ----------
  describe('aether_series', () => {
    it('aggregates posts by series name', () => {
      const posts = [
        { title: 'A1', date: new Date('2026-01-01'), path: 'a1/', series: 'Alpha' },
        { title: 'A2', date: new Date('2026-02-01'), path: 'a2/', series: 'Alpha' },
        { title: 'B1', date: new Date('2026-03-01'), path: 'b1/', series: 'Beta' }
      ];
      const ctx = baseCtx(posts);
      const result = callHelper('aether_series', [], ctx);
      result.should.have.length(2);
      result.find(s => s.name === 'Alpha').count.should.equal(2);
      result.find(s => s.name === 'Beta').count.should.equal(1);
    });

    it('sorts series by latest update desc', () => {
      const posts = [
        { title: 'A1', date: new Date('2026-01-01'), path: 'a1/', series: 'Old' },
        { title: 'B1', date: new Date('2026-06-01'), path: 'b1/', series: 'New' }
      ];
      const ctx = baseCtx(posts);
      const result = callHelper('aether_series', [], ctx);
      result[0].name.should.equal('New');
    });

    it('generates slug from series name', () => {
      const posts = [
        { title: 'P', date: new Date('2026-01-01'), path: 'p/', series: 'AI Coding Evolution' }
      ];
      const ctx = baseCtx(posts);
      const result = callHelper('aether_series', [], ctx);
      result[0].slug.should.equal('ai-coding-evolution');
    });

    it('excludes visual/note from series', () => {
      const posts = [
        { title: 'P', date: new Date('2026-01-01'), path: 'p/', series: 'S', type: 'visual' }
      ];
      const ctx = baseCtx(posts);
      callHelper('aether_series', [], ctx).should.have.length(0);
    });

    it('infers stable series when frontmatter series is absent', () => {
      const posts = [
        { title: 'L121_意图驱动时代', date: new Date('2026-06-01'), path: 'newsletter-121/' },
        { title: 'Claude Code 实践', date: new Date('2026-05-01'), path: 'claude-code/', tags: ['AI Coding'] },
        { title: 'OpenClaw 观察', date: new Date('2026-04-01'), path: 'openclaw/', tags: ['Agent'] }
      ];
      const ctx = baseCtx(posts);
      const names = callHelper('aether_series', [], ctx).map(series => series.name);
      names.should.include('Newsletter 周刊');
      names.should.include('AI Coding Harness');
      names.should.include('Agent Runtime');
    });
  });

  // ---------- aether_kindex ----------
  describe('aether_kindex', () => {
    it('uses configured items when present', () => {
      const ctx = baseCtx([], {
        theme: {
          aether: {
            kindex: {
              items: [{ index: '01', category: 'AI', title: 'AI', count: 10, url: '/cat/ai/' }]
            }
          }
        }
      });
      const result = callHelper('aether_kindex', [], ctx);
      result.should.have.length(1);
      result[0].category.should.equal('AI');
    });

    it('auto-derives from categories when no items', () => {
      const cats = [
        { name : 'AI & Systems', count: 50, posts: [
          { title: 'P1', date: new Date('2026-06-01'), description: 'Desc' }
        ] },
        { name : 'Notes & Essays', count: 30, posts: [
          { title: 'P2', date: new Date('2026-05-01') }
        ] }
      ];
      const ctx = {
        site : { posts: makePosts([]), categories: makeCategories(cats) },
        theme: { aether: {} }
      };
      const result = callHelper('aether_kindex', [], ctx);
      result.should.have.length(2);
      result[0].count.should.equal(50);
    });
  });

  // ---------- aether_paths ----------
  describe('aether_paths', () => {
    it('resolves posts by slug', () => {
      const posts = [
        { title: 'Found', path: '2026/01/01/found/', slug: 'found', date: new Date('2026-01-01'), categories: { length: 0 } }
      ];
      const ctx = baseCtx(posts, {
        theme: {
          aether: {
            start_here: {
              items: [{ intent: 'Test', posts: [{ slug: 'found' }] }]
            }
          }
        }
      });
      const result = callHelper('aether_paths', [], ctx);
      result.should.have.length(1);
      result[0].posts.should.have.length(1);
      result[0].posts[0].title.should.equal('Found');
    });

    it('falls back to category matching', () => {
      const posts = [
        { title     : 'CatPost', path      : 'cp/', date      : new Date('2026-06-01'),
          categories: { length: 1, toArray: () => [{ name: 'AI & Systems' }] } }
      ];
      const ctx = baseCtx(posts, {
        theme: {
          aether: {
            start_here: {
              items: [{ intent: 'AI Path', category: 'AI & Systems', limit: 2 }]
            }
          }
        }
      });
      const result = callHelper('aether_paths', [], ctx);
      result.should.have.length(1);
      result[0].posts[0].title.should.equal('CatPost');
    });

    it('drops paths with no posts and no url', () => {
      const ctx = baseCtx([], {
        theme: {
          aether: {
            start_here: {
              items: [{ intent: 'Empty', category: 'Nonexistent' }]
            }
          }
        }
      });
      callHelper('aether_paths', [], ctx).should.have.length(0);
    });

    it('creates CTA card when url is present but no posts', () => {
      const ctx = baseCtx([], {
        theme: {
          aether: {
            start_here: {
              items: [{ intent: 'About', url: '/about/' }]
            }
          }
        }
      });
      const result = callHelper('aether_paths', [], ctx);
      result.should.have.length(1);
      result[0].url.should.equal('/about/');
      result[0].posts.should.have.length(0);
    });
  });

  // ---------- aether_reading_time ----------
  describe('aether_reading_time', () => {
    it('returns at least 1 minute', () => {
      const ctx = baseCtx([]);
      callHelper('aether_reading_time', [{ content: 'Short' }], ctx).should.be.at.least(1);
    });

    it('returns 0 for null post', () => {
      const ctx = baseCtx([]);
      callHelper('aether_reading_time', [null], ctx).should.equal(0);
    });

    it('scales with content length', () => {
      const ctx = baseCtx([]);
      const short = callHelper('aether_reading_time', [{ content: 'Hello world' }], ctx);
      const long = callHelper('aether_reading_time', [{ content: 'word '.repeat(1000) }], ctx);
      long.should.be.above(short);
    });
  });

  // ---------- aether_pad ----------
  describe('aether_pad', () => {
    it('pads single digit', () => {
      const ctx = baseCtx([]);
      callHelper('aether_pad', [3], ctx).should.equal('03');
    });

    it('custom width', () => {
      const ctx = baseCtx([]);
      callHelper('aether_pad', [3, 3], ctx).should.equal('003');
    });
  });

  // ---------- aether_iso_date ----------
  describe('aether_iso_date', () => {
    it('formats date', () => {
      const ctx = baseCtx([]);
      callHelper('aether_iso_date', [new Date('2026-06-09')], ctx).should.equal('2026-06-09');
    });

    it('handles Moment-like toDate()', () => {
      const ctx = baseCtx([]);
      const momentLike = { toDate: () => new Date('2026-01-15') };
      callHelper('aether_iso_date', [momentLike], ctx).should.equal('2026-01-15');
    });

    it('returns empty for null', () => {
      const ctx = baseCtx([]);
      callHelper('aether_iso_date', [null], ctx).should.equal('');
    });
  });

  // ---------- aether_post_url ----------
  describe('aether_post_url', () => {
    it('returns /path', () => {
      const ctx = baseCtx([]);
      callHelper('aether_post_url', [{ path: '2026/06/01/hello/' }], ctx).should.equal('/2026/06/01/hello/');
    });

    it('returns # for null', () => {
      const ctx = baseCtx([]);
      callHelper('aether_post_url', [null], ctx).should.equal('#');
    });
  });

  // ---------- aether_post_category ----------
  describe('aether_post_category', () => {
    it('returns first category label', () => {
      const ctx = baseCtx([]);
      const post = { categories: { length: 1, toArray: () => [{ name: 'AI & Systems' }] } };
      callHelper('aether_post_category', [post], ctx).should.equal('AI 与系统');
    });

    it('returns empty for no categories', () => {
      const ctx = baseCtx([]);
      callHelper('aether_post_category', [{ categories: { length: 0 } }], ctx).should.equal('');
    });
  });
});
