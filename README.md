# Aether

> 基于 NexT v8.27.0 的个人知识档案馆主题，为长期写作者设计。

把博客当作低维护成本的个人内容系统——编辑式首页自动组装、系列聚合、影像归档、⌘K 全站搜索。Aether 不追求功能堆砌，而是为「持续输出十年」的写作者提供一套有秩序的内容容器。

## 特性

- 📐 **编辑式首页** — 6 模块自动组装（Hero / Start Here / Building / Latest / Notes & Visuals / Subscribe）
- 📚 **系列聚合** — 通过 `series` 字段自动生成系列索引页与导航
- 📷 **影像归档** — `type: visual` 专属画廊布局，独立于文章流
- 📝 **短札系统** — `type: note` 用于碎片化思考与每日记录
- 🔍 **⌘K 全站搜索** — 命令面板式搜索，支持文章、系列、标签
- 🌙 **深色模式** — 自动跟随系统 + 手动切换，平滑无闪烁
- 🎨 **2027 设计趋势** — 排版驱动、灰色分层、呼吸感留白
- ♿ **无障碍** — `focus-visible`、`prefers-reduced-motion`、语义 HTML
- 🇨🇳 **中文优化** — pangu.js 自动空格、中英混排衬线正文
- 📖 **ToC 追踪** — IntersectionObserver 实现的目录高亮

## 快速开始

```sh
# 1. 克隆主题到 Hexo 项目
cd hexo-site
git clone https://github.com/your-org/hexo-theme-aether themes/aether

# 2. 启用主题（修改站点 _config.yml）
echo "theme: aether" >> _config.yml

# 3. 复制并编辑主题配置
cp themes/aether/_config.yml _config.aether.yml

# 4. 启动本地预览
hexo s
```

## 内容类型

Aether 提供三种内容类型，对应不同的写作节奏：

```yaml
# 长文 / 文章（默认）
---
title: 关于 Agent Runtime 的思考
date: 2026-06-01
categories: [AI & Systems]
series: agent-runtime
---

# 影像归档
---
title: 京都行记
date: 2026-04-12
type: visual
cover: /images/kyoto.jpg
---

# 短札 / 碎片
---
title: 今日所思
date: 2026-06-10
type: note
---
```

## 首页模块

首页由 6 个模块自动组装，所有数据从文章 frontmatter 推导，无需手动维护：

| 模块 | 说明 |
| --- | --- |
| **Hero** | 头图 + 标语 + 个人介绍 |
| **Start Here** | 精选入门文章（`featured: true`） |
| **Building** | 当前在做的项目卡片 |
| **Latest** | 最新文章流 |
| **Notes & Visuals** | 短札 + 影像双栏聚合 |
| **Subscribe** | Newsletter 订阅入口 |

详细配置见 [docs/AETHER.md](docs/AETHER.md)。

## 文档

- 📖 [完整配置文档](docs/AETHER.md) — 所有模块、字段、自定义项
- 📐 [设计分析](DESIGN_ANALYSIS.md) — 设计语言与排版决策
- 📋 [改造工作日志](BLOG_REDESIGN_WORKLOG.md) — 实现细节与权衡

## 技术栈

- [Hexo](https://hexo.io) 8.1.1+
- [NexT](https://theme-next.js.org) 8.27.0（Aether Scheme）
- [Stylus](https://stylus-lang.com) / [Nunjucks](https://mozilla.github.io/nunjucks/)
- Node.js ≥ 18.18

## License

[AGPL-3.0](LICENSE.md) — 基于 NexT 主题构建，遵循其原始许可。
