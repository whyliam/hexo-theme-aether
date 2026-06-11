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

function inferredSeriesName(post) {
  if (!post) return null;
  if (post.series) return String(post.series);

  const title = String(post.title || '');
  const identity = `${post.slug || ''} ${post.path || ''} ${title}`;

  if (/newsletter[-_]?\d+/i.test(identity) || /^L\d+[_:：]/i.test(title)) {
    return 'Newsletter 周刊';
  }
  if (
    hasTaxonomy(post.tags, ['AI Coding'])
    || /AI Coding|Vibe Coding|Claude Code|Cursor|Copilot|Codex|Aider|Cline/i.test(title)
  ) {
    return 'AI Coding Harness';
  }
  if (
    hasTaxonomy(post.tags, ['Agent', 'AgenticAI'])
    || /\bAgent\b|智能体|OpenClaw|MCP|Manus/i.test(title)
  ) {
    return 'Agent Runtime';
  }
  if (
    hasTaxonomy(post.tags, ['Obsidian'])
    || /Obsidian|知识管理|笔记系统|\bPKM\b|Second Brain/i.test(title)
  ) {
    return 'Obsidian Knowledge System';
  }
  if (/2016.*设计年鉴|design-yearbook-of-2016/i.test(identity)) {
    return '2016 设计年鉴';
  }
  return null;
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

module.exports = {
  inferredSeriesName,
  isNotePost,
  isRegularPost,
  isVisualPost,
  slugifySeries,
  taxonomyNames
};
