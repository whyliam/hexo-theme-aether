# Aether 内容与主题适配标准

本文档是 Aether 博客内容优化的执行标准，服务于长期维护。

## 一、Frontmatter 标准

### 必填字段

```yaml
title: 文章标题
date: 2026-06-09
categories:
  - AI & Systems
```

### 推荐字段

```yaml
tags:
  - Agent
  - Runtime
description: 一句话摘要（不超过 120 字，用于列表页、SEO、社交分享）
```

### 可选字段

| 字段 | 类型 | 说明 |
|---|---|---|
| `series` | string | 长期系列名（如 `Newsletter 周刊`、`AI Agent`） |
| `type` | string | `visual` = 影像帖；`note` = 短札；不填 = 普通文章 |
| `cover` | string | 封面图 URL，影像帖推荐用 |

### 废弃字段（不再使用）

| 字段 | 原因 |
|---|---|
| `layout: post` | Hexo 默认值，冗余 |
| `featured` | 首页 Start Here 用 config 指定，不再扫描 |
| `thumbnail` | 统一用 `cover` |

## 二、分类标准

### 新四分类

| 新分类 | 映射自 | 典型内容 |
|---|---|---|
| **AI & Systems** | 技术（AI/Agent/系统相关） | AI Agent、AI Coding、Harness、OpenClaw、系统设计、开发工具 |
| **Product & Intelligence** | 产品 + 经济 + 技术（产品方法论） | 产品思考、数据产品、投资判断、商业分析、用户体验 |
| **Notes & Reflections** | 随笔 + 资讯（Newsletter） | 个人复盘、思考笔记、Newsletter、阅读笔记、生活随感 |
| **Travel & Visuals** | 旅行 | 旅行、摄影、视觉记录 |

### 映射规则

- **技术 → AI & Systems**：AI、Agent、编程、开发工具、系统架构类文章
- **技术 → Product & Intelligence**：产品技术、数据分析、用户研究相关
- **产品 → Product & Intelligence**：产品方法论、用户体验、产品设计
- **经济 → Product & Intelligence**：投资、商业分析
- **随笔 → Notes & Reflections**：个人思考、生活随感、复盘、读书笔记
- **资讯 → Notes & Reflections**：Newsletter 周刊、信息整理
- **旅行 → Travel & Visuals**：旅行、摄影
- **资源 → AI & Systems**：技术资源类

### 边界判断

- 早期技术文章（Android/iOS/Arduino 等）→ **AI & Systems**（保留技术分类，不按时代筛选）
- 个人情感类随笔 → **Notes & Reflections**（保留个人语气，不改分类名）
- Newsletter 周刊 → **Notes & Reflections**（通过 `series: Newsletter 周刊` 做聚合）

## 三、标签治理

### 现状

- 2518 个唯一标签，645/698 篇文章有 5 个标签
- 标签高度碎片化，很多标签只用了 1 次

### 原则

1. **标签不主导导航**，只作辅助检索
2. **每篇 3-5 个标签**，不超过 5 个
3. **优先使用已有高频标签**，不造新词
4. **英文技术术语保持英文**（`AI`、`Agent`、`iOS`），中文概念用中文
5. **不强制统一**——逐篇判断，不批量替换

### 建议高频标签池（前 30）

AI、Agent、产品设计、用户体验、知识管理、个人成长、创业、
产品经理、iOS、Android、GitHub、时间管理、投资、
Newsletter、Obsidian、写作、旅行、摄影、数据、
Python、JavaScript、阅读、复盘、系统设计、
开源、工具、效率、设计、独立开发、生活

## 四、摘要策略

### description 字段

- **长度：60-120 字**
- **内容：回答"这篇文章讲什么"**
- **语气：和文章正文一致，不要写成广告**
- **不写时：** Aether 自动截取正文前 150 字

### 不适合的摘要

- 太短：`一些想法` → 没有信息量
- 太长：超过 150 字 → 卡片溢出
- AI 味：`本文将深入探讨...从多个维度分析...` → 改为自然描述
- 重复标题：摘要和标题说同一件事 → 提供补充信息

## 五、标题策略

### 长度范围

- **理想：8-25 字**
- **最短可接受：4 字**（如"杂想""碎碎念"，短文/随笔允许）
- **最长可接受：40 字**（超过 40 字在移动端卡片会折行过多）

### 长标题处理

主题侧 CSS 处理：
- 卡片标题 `line-clamp: 2`（最多 2 行）
- 文章页标题不限行，但字号随长度缩小

### 不改标题的情况

- 标题是文章核心表达（如"给明年依然年轻的我们"），保留原标题
- 标题是系列编号（如"L121_意图驱动时代"），保留编号格式
- 已发布超过 1 年的文章，不改标题（避免破坏外链引用）

## 六、内容类型展示策略

### 长文（>3000 字）

- 推荐补 `description`
- 推荐有明确小标题结构
- 主题侧：显示预估阅读时间、文章目录

### 短文（<800 字）

- 允许无 `description`（自动截取足够）
- 不强制加小标题
- 主题侧：弱化页面密度，不显示空目录

### 技术文

- 代码块样式清晰，支持语法高亮
- 行内代码和代码块对比度足够
- 长代码块可折叠

### 影像帖（type: visual）

- 需要 `cover` 字段
- 多图用 `photos` 数组
- 可选 `location`、`camera`
- 主题侧：大图展示，弱化文字

### 短札（type: note）

- 不需要 `cover`
- 不需要 `description`
- 主题侧：紧凑排版，弱化元信息

### Newsletter（series: Newsletter 周刊）

- 标题格式保持 `L{n}_{主题}` 或 `Weekly #{n}: {主题}`
- 分类：Notes & Reflections
- 通过 series 聚合，不需要额外标记

## 七、首页推荐规则

首页 6 模块的内容来源：

| 模块 | 内容来源 | 维护方式 |
|---|---|---|
| Hero | config 固定文案 | 手动，半年一次 |
| Start Here | config 指定文章 slug | 手动，半年一次 |
| Building | config 指定项目 | 手动，季度一次 |
| Latest | 最近 5 篇文章 | 自动 |
| Notes & Visuals | 最近短札 + 影像 | 自动 |
| Subscribe | config 固定链接 | 手动，很少维护 |

**不需要在文章 frontmatter 里标记"是否首页推荐"。**

## 八、不应修改的内容边界

1. **不改 permalink** — 已有文章的 URL 不变
2. **不删文章** — 只建议 draft/archived，不直接删
3. **不改写正文语气** — 保留作者原本表达
4. **不把随笔改成报告** — 保留个人风格
5. **不把技术文改成教程营销文** — 保持记录性质
6. **不批量替换标签** — 逐篇判断
7. **早期文章（2010-2015）** — 只改分类和 frontmatter，不动正文
