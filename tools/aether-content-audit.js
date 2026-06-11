#!/usr/bin/env node
/**
 * Aether content auditor
 *
 * 扫描博客源仓库（扁平 .md），按规则给每篇打 series / type 标签建议。
 * 不修改文件，只输出 audit-plan.json + audit-plan.md。
 *
 * 用法：
 *   node tools/aether-content-audit.js [content-dir]
 *
 * 默认 content-dir = /Users/xingquan/Code/博客
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONTENT_DIR = process.argv[2] || '/Users/xingquan/Code/博客';
const OUT_JSON = path.join(__dirname, '..', 'audit-plan.json');
const OUT_MD   = path.join(__dirname, '..', 'audit-plan.md');

// ─── Series 规则 ───────────────────────────────────────────────────────
// 优先级从上到下，每篇文章只归入一个 series（match first wins）
const SERIES_RULES = [
  {
    name: 'Newsletter 周刊',
    match: ({ file, title }) =>
      /newsletter[-_]?\d+/i.test(file) ||
      /^L\d+[_:：]/i.test(title) ||
      /周刊/.test(title)
  },
  {
    name: 'AI Coding',
    match: ({ title, tags, cats, body }) =>
      /AI Coding|Vibe Coding|Claude Code|Cursor|Copilot|Codex|Aider|Cline|Continue\.dev/i.test(title + ' ' + tags.join(' ') + ' ' + cats.join(' '))
  },
  {
    name: 'AI Agent',
    match: ({ title, tags, cats }) =>
      /Agent|MCP|智能体|OpenClaw|Moltbot/i.test(title + ' ' + tags.join(' ') + ' ' + cats.join(' '))
  },
  {
    name: 'Obsidian 与知识系统',
    match: ({ title, tags, cats }) =>
      /Obsidian|知识管理|笔记系统|PKM|second brain/i.test(title + ' ' + tags.join(' ') + ' ' + cats.join(' '))
  },
  {
    name: '产品判断与方法论',
    match: ({ title, cats }) =>
      cats.some(c => /^产品/.test(c)) &&
      /产品经理|PM|产品判断|产品思考|方法论|核心价值|工作清单|图书推荐|认知|发展|职责|复盘报告/i.test(title)
  },
  {
    name: '2016 设计年鉴',
    match: ({ file }) => /2016-12-design-yearbook-of-2016/.test(file)
  },
  {
    name: '年度复盘',
    match: ({ title }) =>
      /年终|年中|年度|年报|N年回顾|\d{4}年.*(总结|回顾|复盘)/i.test(title) ||
      /^\d{4}.*(总结|回顾|复盘)$/.test(title)
  }
];

// ─── Type 规则 ─────────────────────────────────────────────────────────
// Visual 用 whitelist —— 算法误判率太高（图片数与游记性质无关），高确信手工挑
const VISUAL_WHITELIST = new Set([
  '2013-09-cancun-back-seven-days-and-six-nights-without-looking-at-sea-travel-details-mass-photos.md',
  '2014-09-second-speed-time-lapse-photography-short-barcelona-barcelona-go.md',
  '2013-08-become-a-tired-dreams-one-night-in-paris.md'
]);

function inferType({ file, title, cats, body, wordCount, isInSeries }) {
  if (VISUAL_WHITELIST.has(file)) return 'visual';

  // Note：真正的"短札"——字数 < 500 + 随笔/情感类 category + 不在系列 + 非长文标题
  const isNoteCats = cats.some(c => /^(随笔|个人成长|情感|青春|爱情|杂谈|生活)$/.test(c));
  const isLongFormTitle = /^(如何|什么是|怎么|为什么|关于.*的|.*方法论|.*经验|.*总结|.*指南)/.test(title);
  if (!isInSeries && wordCount < 500 && isNoteCats && !isLongFormTitle) {
    return 'note';
  }

  return null;
}

// ─── Utilities ─────────────────────────────────────────────────────────
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { fm: {}, body: raw };
  try {
    const fm = yaml.load(m[1]) || {};
    return { fm, body: m[2] || '' };
  } catch (e) {
    return { fm: {}, body: m[2] || '', error: e.message };
  }
}

function countWords(body) {
  // 粗略字数：去掉代码块、图片、链接 url、HTML
  const cleaned = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[#*_>~`-]/g, '');
  // 中文字符 + 英文 word 各算 1
  const chinese = (cleaned.match(/[一-鿿]/g) || []).length;
  const english = (cleaned.match(/[A-Za-z]+/g) || []).length;
  return chinese + english;
}

function normArr(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v.map(x => String(x));
  return [String(v)];
}

// ─── Main ──────────────────────────────────────────────────────────────
function main() {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  console.log(`Scanning ${files.length} files in ${CONTENT_DIR}...`);

  const seriesIndex = {};  // name -> [{file, title}]
  const typeIndex = { note: [], visual: [] };
  const skipped = [];
  const decisions = [];   // {file, title, addSeries, addType, hadSeries, hadType}

  for (const file of files) {
    const fp = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(fp, 'utf8');
    const { fm, body, error } = parseFrontmatter(raw);
    if (error) {
      skipped.push({ file, reason: `frontmatter parse error: ${error}` });
      continue;
    }
    const title = String(fm.title ?? '');
    if (!title) {
      skipped.push({ file, reason: 'no title' });
      continue;
    }
    const tags = normArr(fm.tags);
    const cats = normArr(fm.categories);
    const wordCount = countWords(body);
    const hadSeries = fm.series ? String(fm.series) : null;
    const hadType = fm.type ? String(fm.type) : null;

    // Series 匹配（first wins）
    let matchedSeries = null;
    for (const rule of SERIES_RULES) {
      if (rule.match({ file, title, tags, cats, body })) {
        matchedSeries = rule.name;
        break;
      }
    }

    // Type 推断
    const inferredType = inferType({
      file, title, cats, body, wordCount,
      isInSeries: !!matchedSeries
    });

    const addSeries = matchedSeries && matchedSeries !== hadSeries ? matchedSeries : null;
    const addType = inferredType && inferredType !== hadType ? inferredType : null;

    if (matchedSeries) {
      (seriesIndex[matchedSeries] ||= []).push({ file, title, hadSeries });
    }
    if (inferredType) {
      typeIndex[inferredType].push({ file, title, hadType });
    }

    decisions.push({
      file, title, wordCount,
      cats, tags,
      matchedSeries, inferredType,
      hadSeries, hadType,
      addSeries, addType
    });
  }

  // 过滤系列：少于 3 篇的剔除（合并到 type 推断不变，但不真的加 series）
  const finalSeries = {};
  const droppedSeries = {};
  for (const [name, items] of Object.entries(seriesIndex)) {
    if (items.length >= 3) {
      finalSeries[name] = items;
    } else {
      droppedSeries[name] = items;
    }
  }

  // 修正 decisions：被 drop 的 series 重置 addSeries
  const droppedSet = new Set(Object.keys(droppedSeries));
  for (const d of decisions) {
    if (d.addSeries && droppedSet.has(d.addSeries)) {
      d.addSeries = null;
      d.matchedSeries = null;
    }
  }

  const willAddSeries = decisions.filter(d => d.addSeries).length;
  const willAddType = decisions.filter(d => d.addType).length;
  const noChange = decisions.filter(d => !d.addSeries && !d.addType).length;

  // ─── 输出 JSON ────────────────────────────────────────────────────
  const json = {
    generatedAt: new Date().toISOString().slice(0, 19) + 'Z',
    contentDir: CONTENT_DIR,
    totalFiles: files.length,
    counts: {
      willAddSeries,
      willAddType,
      noChange,
      skipped: skipped.length
    },
    seriesAdopted: Object.entries(finalSeries)
      .map(([name, items]) => ({ name, count: items.length }))
      .sort((a, b) => b.count - a.count),
    seriesDropped: Object.entries(droppedSeries)
      .map(([name, items]) => ({ name, count: items.length, items: items.map(i => i.file) })),
    typeCounts: {
      note: typeIndex.note.length,
      visual: typeIndex.visual.length
    },
    decisions: decisions.filter(d => d.addSeries || d.addType),
    skipped
  };
  fs.writeFileSync(OUT_JSON, JSON.stringify(json, null, 2));

  // ─── 输出 Markdown 报告 ───────────────────────────────────────────
  let md = `# Aether Content Audit Plan\n\n`;
  md += `> 生成时间：${json.generatedAt}\n`;
  md += `> 扫描目录：\`${CONTENT_DIR}\`\n`;
  md += `> 总文件数：${json.totalFiles}\n\n`;

  md += `## 摘要\n\n`;
  md += `| 维度 | 数量 |\n|---|--:|\n`;
  md += `| 将新增 series 字段 | ${willAddSeries} |\n`;
  md += `| 将新增 type 字段 | ${willAddType} |\n`;
  md += `| 无需改动 | ${noChange} |\n`;
  md += `| 跳过（解析失败/无标题）| ${skipped.length} |\n\n`;

  md += `## 采纳的系列（≥ 3 篇）\n\n`;
  for (const [name, items] of Object.entries(finalSeries).sort((a, b) => b[1].length - a[1].length)) {
    md += `### ${name}  ·  ${items.length} 篇\n\n`;
    for (const it of items.slice(0, 15)) {
      const mark = it.hadSeries === name ? '✓ 已有' : '＋ 新加';
      md += `- ${mark}  \`${it.file}\` — ${it.title}\n`;
    }
    if (items.length > 15) md += `- … 还有 ${items.length - 15} 篇\n`;
    md += `\n`;
  }

  md += `## 候选不足 3 篇的系列（跳过）\n\n`;
  for (const [name, items] of Object.entries(droppedSeries)) {
    md += `- **${name}** (${items.length} 篇)：${items.map(i => i.title).join('、')}\n`;
  }
  md += `\n`;

  md += `## Type 推断\n\n`;
  md += `### type: note  ·  ${typeIndex.note.length} 篇\n\n`;
  for (const it of typeIndex.note.slice(0, 30)) {
    const mark = it.hadType === 'note' ? '✓' : '＋';
    md += `- ${mark} \`${it.file}\` — ${it.title}\n`;
  }
  if (typeIndex.note.length > 30) md += `- … 还有 ${typeIndex.note.length - 30} 篇\n`;
  md += `\n### type: visual  ·  ${typeIndex.visual.length} 篇\n\n`;
  for (const it of typeIndex.visual) {
    const mark = it.hadType === 'visual' ? '✓' : '＋';
    md += `- ${mark} \`${it.file}\` — ${it.title}\n`;
  }
  md += `\n`;

  if (skipped.length) {
    md += `## 跳过的文件\n\n`;
    for (const s of skipped) md += `- \`${s.file}\` — ${s.reason}\n`;
  }

  fs.writeFileSync(OUT_MD, md);

  console.log(`\nDone.`);
  console.log(`  Will add series: ${willAddSeries}`);
  console.log(`  Will add type:   ${willAddType}`);
  console.log(`  Adopted series:  ${Object.keys(finalSeries).length}`);
  console.log(`  Dropped series:  ${Object.keys(droppedSeries).length}`);
  console.log(`  Skipped:         ${skipped.length}`);
  console.log(`\nPlan written to:`);
  console.log(`  ${OUT_JSON}`);
  console.log(`  ${OUT_MD}`);
}

main();
