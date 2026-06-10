#!/usr/bin/env node
/**
 * Aether content applier
 *
 * 读 audit-plan.json，把 series/type 字段 append 到 .md 文件的 frontmatter。
 * 字符串级别 append（不重写 YAML），保留原格式 / 顺序 / 缩进风格。
 *
 * 用法：
 *   node tools/aether-content-apply.js [--dry] [--repo=path]
 *
 * --dry  只打印改动，不写文件
 * --repo 指定目标根（默认 audit-plan.json 里记录的 contentDir）
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const isDry = args.includes('--dry');
const repoArg = args.find(a => a.startsWith('--repo='));
const PLAN_PATH = path.join(__dirname, '..', 'audit-plan.json');
const LOG_PATH = path.join(__dirname, '..', 'audit-log.md');

function loadPlan() {
  if (!fs.existsSync(PLAN_PATH)) {
    console.error(`audit-plan.json not found at ${PLAN_PATH}. Run aether-content-audit.js first.`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(PLAN_PATH, 'utf8'));
}

function getFmBlock(raw) {
  const m = raw.match(/^(---\r?\n)([\s\S]*?\r?\n)(---\r?\n?)/);
  if (!m) return null;
  return {
    start: m[1],
    fields: m[2],
    end: m[3],
    rest: raw.slice(m[0].length)
  };
}

/**
 * 在 fields block 末尾追加一个字段。如果该 key 已存在，replace。
 */
function upsertField(fields, key, value) {
  const lineRe = new RegExp(`^${key}:.*$`, 'm');
  const newLine = `${key}: ${value}`;
  if (lineRe.test(fields)) {
    return fields.replace(lineRe, newLine);
  }
  // 在最后追加一行，确保以 \n 结尾
  const sep = fields.endsWith('\n') ? '' : '\n';
  return fields + sep + newLine + '\n';
}

function quoteIfNeeded(s) {
  // YAML 安全：如果有 :、#、& 等，加引号
  if (/[:#&\*\?\|\>\!\%\@\`]/.test(s) || /^\s/.test(s) || /\s$/.test(s)) {
    return `"${s.replace(/"/g, '\\"')}"`;
  }
  return s;
}

function applyToFile(repoDir, decision, logRows) {
  const fp = path.join(repoDir, decision.file);
  if (!fs.existsSync(fp)) {
    logRows.push({ file: decision.file, status: 'MISSING', detail: 'file does not exist in repo' });
    return false;
  }

  const raw = fs.readFileSync(fp, 'utf8');
  const fmBlock = getFmBlock(raw);
  if (!fmBlock) {
    logRows.push({ file: decision.file, status: 'NO_FM', detail: 'no frontmatter block found' });
    return false;
  }

  let newFields = fmBlock.fields;
  const changes = [];

  if (decision.addSeries) {
    newFields = upsertField(newFields, 'series', quoteIfNeeded(decision.addSeries));
    changes.push(`series=${decision.addSeries}`);
  }
  if (decision.addType) {
    newFields = upsertField(newFields, 'type', decision.addType);
    changes.push(`type=${decision.addType}`);
  }

  if (newFields === fmBlock.fields) {
    logRows.push({ file: decision.file, status: 'NO_CHANGE', detail: 'all target fields already present' });
    return false;
  }

  const out = fmBlock.start + newFields + fmBlock.end + fmBlock.rest;

  if (!isDry) {
    fs.writeFileSync(fp, out);
  }

  logRows.push({
    file: decision.file,
    status: 'WRITE',
    detail: changes.join(', ')
  });
  return true;
}

function main() {
  const plan = loadPlan();
  const repoDir = repoArg ? repoArg.slice('--repo='.length) : plan.contentDir;

  if (!fs.existsSync(repoDir)) {
    console.error(`Repo dir not found: ${repoDir}`);
    process.exit(1);
  }

  console.log(`Repo: ${repoDir}`);
  console.log(`Mode: ${isDry ? 'DRY RUN (no file writes)' : 'WRITE'}`);
  console.log(`Decisions to apply: ${plan.decisions.length}\n`);

  const logRows = [];
  let written = 0;
  let skipped = 0;

  for (const d of plan.decisions) {
    const did = applyToFile(repoDir, d, logRows);
    if (did) written++;
    else skipped++;
  }

  // 写 audit-log.md
  if (!isDry) {
    let md = `# Aether Content Audit Log\n\n`;
    md += `> 写入时间：${new Date().toISOString().slice(0, 19) + 'Z'}\n`;
    md += `> 目标仓库：\`${repoDir}\`\n`;
    md += `> 改动文件数：${written}\n\n`;
    md += `## 改动列表\n\n`;
    md += `| 状态 | 文件 | 改动 |\n|---|---|---|\n`;
    for (const r of logRows) {
      md += `| ${r.status} | \`${r.file}\` | ${r.detail} |\n`;
    }
    fs.writeFileSync(LOG_PATH, md);
    console.log(`\nLog written to: ${LOG_PATH}`);
  }

  console.log(`\nResult:`);
  console.log(`  Files written:  ${written}`);
  console.log(`  Files skipped:  ${skipped}`);
}

main();
