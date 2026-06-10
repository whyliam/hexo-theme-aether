#!/usr/bin/env node
/**
 * Aether sync — copy series/type fields from source repo to mirror repo
 *
 * 用法：
 *   node tools/aether-content-sync.js <source-dir> <dest-dir>
 *
 * 只搬 series 和 type 两个字段。其他字段（category/tags/description）不动。
 * 如果 dest 已有相同 series/type，跳过。
 */

const fs = require('fs');
const path = require('path');

const SRC = process.argv[2] || '/Users/xingquan/Code/博客';
const DST = process.argv[3] || '/Users/xingquan/Code/blog.naaln.com/source/_posts';
const LOG_PATH = path.join(__dirname, '..', 'sync-log.md');

function getFm(raw) {
  const m = raw.match(/^(---\r?\n)([\s\S]*?\r?\n)(---\r?\n?)([\s\S]*)$/);
  return m ? { start: m[1], fields: m[2], end: m[3], rest: m[4] } : null;
}

function readField(fields, key) {
  const m = fields.match(new RegExp(`^${key}:\\s*(.*?)\\s*$`, 'm'));
  if (!m) return null;
  let v = m[1].trim();
  if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1).replace(/\\"/g, '"');
  return v;
}

function upsertField(fields, key, value) {
  const lineRe = new RegExp(`^${key}:.*$`, 'm');
  const valSafe = /[:#&\*\?\|\>\!\%\@\`]/.test(value) || /^\s|\s$/.test(value)
    ? `"${value.replace(/"/g, '\\"')}"` : value;
  const newLine = `${key}: ${valSafe}`;
  if (lineRe.test(fields)) return fields.replace(lineRe, newLine);
  const sep = fields.endsWith('\n') ? '' : '\n';
  return fields + sep + newLine + '\n';
}

function main() {
  const files = fs.readdirSync(SRC).filter(f => f.endsWith('.md'));
  console.log(`Source: ${SRC} (${files.length} files)`);
  console.log(`Dest:   ${DST}\n`);

  const rows = [];
  let synced = 0, skippedNoDest = 0, skippedNoChange = 0;

  for (const file of files) {
    const srcPath = path.join(SRC, file);
    const dstPath = path.join(DST, file);

    if (!fs.existsSync(dstPath)) {
      skippedNoDest++;
      continue;
    }

    const srcFm = getFm(fs.readFileSync(srcPath, 'utf8'));
    if (!srcFm) continue;

    const srcSeries = readField(srcFm.fields, 'series');
    const srcType = readField(srcFm.fields, 'type');

    if (!srcSeries && !srcType) continue;

    const dstRaw = fs.readFileSync(dstPath, 'utf8');
    const dstFm = getFm(dstRaw);
    if (!dstFm) continue;

    const dstSeries = readField(dstFm.fields, 'series');
    const dstType = readField(dstFm.fields, 'type');

    let newFields = dstFm.fields;
    const changes = [];
    if (srcSeries && srcSeries !== dstSeries) {
      newFields = upsertField(newFields, 'series', srcSeries);
      changes.push(`series=${srcSeries}`);
    }
    if (srcType && srcType !== dstType) {
      newFields = upsertField(newFields, 'type', srcType);
      changes.push(`type=${srcType}`);
    }

    if (changes.length === 0) {
      skippedNoChange++;
      continue;
    }

    fs.writeFileSync(dstPath, dstFm.start + newFields + dstFm.end + dstFm.rest);
    rows.push({ file, changes: changes.join(', ') });
    synced++;
  }

  let md = `# Aether Sync Log\n\n> ${new Date().toISOString().slice(0, 19)}Z\n> Source: \`${SRC}\`\n> Dest: \`${DST}\`\n> Synced: ${synced}\n\n`;
  md += `| 文件 | 同步字段 |\n|---|---|\n`;
  for (const r of rows) md += `| \`${r.file}\` | ${r.changes} |\n`;
  fs.writeFileSync(LOG_PATH, md);

  console.log(`Synced:               ${synced}`);
  console.log(`Skipped (no dest):    ${skippedNoDest}`);
  console.log(`Skipped (no change):  ${skippedNoChange}`);
  console.log(`\nLog: ${LOG_PATH}`);
}

main();
