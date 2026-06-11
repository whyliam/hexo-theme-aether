#!/usr/bin/env node
/**
 * Aether — series suggestion scanner
 *
 * Scans a Hexo blog's source/_posts/ for frontmatter, groups titles by
 * heuristic keyword clusters, and writes `series-proposal.md` for review.
 *
 * Does NOT modify any post frontmatter. The proposal is meant for the
 * blog author to read, edit, and apply manually.
 *
 * Usage:
 *   node scripts/tools/aether-series-suggest.js <hexo-blog-root>
 *   # e.g. from this theme dir:
 *   node scripts/tools/aether-series-suggest.js /Users/xingquan/Code/blog.naaln.com
 */
'use strict';

const fs = require('fs');
const path = require('path');

const BLOG_ROOT = process.argv[2];
if (!BLOG_ROOT) {
  console.error('Usage: aether-series-suggest.js <hexo-blog-root>');
  process.exit(1);
}

const POSTS_DIR = path.join(BLOG_ROOT, 'source', '_posts');
const OUT_FILE = path.join(BLOG_ROOT, 'series-proposal.md');

// --- Cluster definitions ---
// Each cluster has: name (proposed series), match (regex or array of keywords).
// Lower clusters take precedence over higher ones when titles match multiple.
const CLUSTERS = [
  { name: 'AI Coding 演进',     match: /(ai\s*coding|copilot|cursor|claude\s*code|claude\s*agent|harness|aider|continue)/i },
  { name: 'AI Agent 设计',      match: /(agent|多代理|agentic|claude\s*agent|tool\s*use|mcp|ai\s*agent)/i },
  { name: 'AI 产品方法论',      match: /(ai\s*产品|ai\s*应用|ai\s*工具|llm\s*产品|gpt\s*应用|prompt\s*engineering)/i },
  { name: 'Obsidian 知识系统',  match: /(obsidian|second\s*brain|知识管理|笔记系统|个人知识|para|pkm)/i },
  { name: '个人行动系统',       match: /(个人行动|行动系统|时间账户|工具试用卡|todo|gtd|周复盘|月复盘)/i },
  { name: 'Newsletter',         match: /(newsletter|周刊|月报|信刊)/i },
  { name: '产品判断与组织',     match: /(产品判断|产品经理|产品组织|pm\s|product\s*management)/i },
  { name: '数据产品',           match: /(数据产品|data\s*product|metric|指标|ab\s*test|实验)/i },
];

// --- YAML frontmatter parser (just enough for our needs) ---
function parseFrontmatter(content) {
  const m = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!m) return null;
  const fm = {};
  const block = m[1];
  block.split('\n').forEach(line => {
    const km = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!km) return;
    let val = km[2].trim();
    // strip quotes
    if ((val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    fm[km[1]] = val;
  });
  return fm;
}

function walk(dir) {
  let out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else if (e.isFile() && e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

function main() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`No source/_posts/ at ${POSTS_DIR}`);
    process.exit(2);
  }

  const files = walk(POSTS_DIR);
  const buckets = new Map(CLUSTERS.map(c => [c.name, []]));
  let scanned = 0, untagged = 0, alreadyTagged = 0, skipped = 0;
  const alreadySeries = new Map();

  for (const f of files) {
    let raw;
    try { raw = fs.readFileSync(f, 'utf8'); } catch { skipped++; continue; }
    const fm = parseFrontmatter(raw);
    if (!fm || !fm.title) { skipped++; continue; }
    scanned++;

    const title = fm.title;
    if (fm.series) {
      alreadyTagged++;
      if (!alreadySeries.has(fm.series)) alreadySeries.set(fm.series, []);
      alreadySeries.get(fm.series).push({ title, file: path.relative(BLOG_ROOT, f), date: fm.date || '' });
      continue;
    }

    let matched = null;
    for (const c of CLUSTERS) {
      if (c.match.test(title)) { matched = c.name; break; }
    }
    if (matched) {
      buckets.get(matched).push({ title, file: path.relative(BLOG_ROOT, f), date: fm.date || '' });
    } else {
      untagged++;
    }
  }

  const lines = [];
  lines.push('# Series 提议 — Aether');
  lines.push('');
  lines.push(`> 生成时间：${new Date().toISOString().slice(0, 16).replace('T', ' ')}`);
  lines.push(`> 扫描博客：\`${BLOG_ROOT}\``);
  lines.push(`> 文章总数：${scanned}  ·  已打 series：${alreadyTagged}  ·  未匹配任何 cluster：${untagged}  ·  跳过（无标题/解析失败）：${skipped}`);
  lines.push('');
  lines.push('## 使用方法');
  lines.push('');
  lines.push('1. 浏览下面每个提议系列，**人工删掉不该归入的文章**（启发式会误判）。');
  lines.push('2. 一个系列至少留 3 篇文章才有意义；少于 3 篇的删掉整个系列。');
  lines.push('3. 把保留下来的文章 frontmatter 加上 `series: "系列名"`。');
  lines.push('4. 跑 `hexo clean && hexo s`，首页的 Series 区块会自动出现。');
  lines.push('');
  lines.push('---');
  lines.push('');

  // Already tagged
  if (alreadySeries.size) {
    lines.push('## 已打标的系列');
    lines.push('');
    [...alreadySeries.entries()].sort().forEach(([name, posts]) => {
      lines.push(`### ${name}  · ${posts.length} 篇`);
      lines.push('');
      posts.sort((a, b) => String(a.date).localeCompare(String(b.date)))
        .forEach(p => lines.push(`- \`${p.file}\` — ${p.title}`));
      lines.push('');
    });
    lines.push('---');
    lines.push('');
  }

  // Proposed clusters
  lines.push('## 提议的新系列');
  lines.push('');
  for (const [name, posts] of buckets) {
    if (!posts.length) continue;
    lines.push(`### ${name}  · 候选 ${posts.length} 篇`);
    lines.push('');
    posts.sort((a, b) => String(a.date).localeCompare(String(b.date)))
      .forEach(p => {
        lines.push(`- [ ] \`${p.file}\` — ${p.title}`);
      });
    lines.push('');
    if (posts.length >= 3) {
      lines.push(`  **建议 frontmatter**: \`series: "${name}"\``);
      lines.push('');
    } else {
      lines.push(`  > ⚠️ 候选不足 3 篇，建议跳过或合并到其他系列。`);
      lines.push('');
    }
  }

  fs.writeFileSync(OUT_FILE, lines.join('\n'));
  console.log(`✓ Wrote ${OUT_FILE}`);
  console.log(`  Scanned ${scanned} posts → ${[...buckets.values()].reduce((s, a) => s + a.length, 0)} candidates across ${[...buckets.values()].filter(b => b.length).length} clusters.`);
  console.log(`  Already tagged: ${alreadyTagged} posts in ${alreadySeries.size} series.`);
}

main();
