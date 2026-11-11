'use strict';

function toArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value.toArray === 'function') return value.toArray();
  return [value];
}

function taxonomyNames(value) {
  return toArray(value)
    .map(item => (typeof item === 'string' ? item : item && item.name))
    .filter(Boolean);
}

function hasTaxonomy(value, names) {
  const wanted = new Set(names.map(name => name.toLowerCase()));
  return taxonomyNames(value).some(name => wanted.has(String(name).toLowerCase()));
}

function isExplicitType(post, kind) {
  return Boolean(post) && String(post.type || post.layout || '').toLowerCase() === kind;
}

function isVisualPost(post) {
  return isExplicitType(post, 'visual')
    || hasTaxonomy(post && post.categories, ['Travel & Visuals', 'Travel-Visuals']);
}

function isNotePost(post) {
  return isExplicitType(post, 'note');
}

function isRegularPost(post) {
  return !isVisualPost(post) && !isNotePost(post);
}

function inferredSeriesName(post, rules = []) {
  if (!post) return null;
  if (post.series) return String(post.series);
  const rule = rules.find(item => {
    if (!item.name) return false;
    return (item.title_pattern && new RegExp(item.title_pattern, 'i').test(post.title || ''))
      || (item.path_pattern && new RegExp(item.path_pattern, 'i').test(`${post.slug || ''} ${post.path || ''}`))
      || hasTaxonomy(post.tags, item.tags || [])
      || hasTaxonomy(post.categories, item.categories || []);
  });
  return rule ? rule.name : null;
}

function slugifySeries(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[\s\u3000]+/g, '-')
    .replace(/[^\w一-鿿-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    || 'series';
}

// Presentation only: keep canonical titles, URLs and search identities intact.
function postIssue(post, rules = []) {
  const rule = rules.find(item => item.name === inferredSeriesName(post, rules));
  const match = rule?.issue_pattern && new RegExp(rule.issue_pattern, 'i').exec(String(post?.title || ''));
  return match ? match[1] || '' : '';
}

function displayTitle(post, rules = []) {
  const title = String(post?.title || '');
  const rule = rules.find(item => item.name === inferredSeriesName(post, rules));
  return rule?.issue_pattern ? title.replace(new RegExp(rule.issue_pattern, 'i'), '') : title;
}

// One aggregation contract for home, series pages and newsletter.
function aggregateSeries(input, rules = []) {
  const groups = new Map();
  toArray(input).filter(isRegularPost).forEach(post => {
    const name = inferredSeriesName(post, rules);
    if (!name) return;
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push(post);
  });
  return [...groups].map(([name, items]) => {
    const posts = items.slice().sort((a, b) => a.date - b.date || String(a.path).localeCompare(String(b.path)))
      .map((post, index) => ({ index      : String(index + 1).padStart(2, '0'), title      : post.title, path       : post.path,
        url        : '/' + post.path, permalink  : post.permalink, date       : post.date, updated    : post.updated,
        series     : name, description: post.description, excerpt    : post.excerpt, content    : post.content }));
    const slug = slugifySeries(name);
    return { name, slug, url         : '/series/' + encodeURI(slug) + '/', count       : posts.length,
      first_date  : posts[0].date, latest_date : posts[posts.length - 1].date,
      posts, recent_posts: posts.slice(-3).reverse() };
  }).sort((a, b) => b.latest_date - a.latest_date || a.name.localeCompare(b.name));
}

module.exports = {
  aggregateSeries,
  displayTitle,
  postIssue,
  inferredSeriesName,
  isNotePost,
  isRegularPost,
  isVisualPost,
  slugifySeries,
  taxonomyNames
};
