# Aether 配置指南

Aether 基于 NexT 8.27.0，使用 Hexo、Nunjucks 和 Stylus。当前首页和内页设计见 [设计规范](DESIGN.md)，可用配置的完整清单以主题 [_config.yml](../_config.yml) 为准。

## 安装与启用

在已有 Hexo 站点中执行：

```sh
git clone --branch master https://github.com/whyliam/hexo-theme-aether themes/aether
npm install --prefix themes/aether --omit=dev
npx hexo config theme aether
cp themes/aether/_config.yml _config.aether.yml
npx hexo server
```

站点 `_config.yml` 中的 `theme: aether` 选择主题。与它同级的 `_config.aether.yml` 是 **主题配置文件**，直接填写 `scheme`、`menu`、`aether` 等字段，不包在 `theme_config` 下，也不作为 `--config` 的站点配置叠加文件使用。

如果已有 `_config.aether.yml`，保留并修改现有文件。不要重复复制覆盖。作者、站点标题和描述继续在站点 `_config.yml` 中配置。

```yaml
# _config.aether.yml（主题配置）
scheme: Aether
menu:
  首页: / || fa fa-home
  写作: /archives/ || fa fa-pencil-alt
  系列: /series/ || fa fa-layer-group
  影像: /visuals/ || fa fa-camera-retro
  关于: /about/ || fa fa-user

aether:
  hero:
    name: 你的名字
    intro: 记录技术、产品与长期思考。
    eyebrow: 个人知识档案
    caption: 写作，让思考慢慢成形。
    motion: true
  latest:
    enable: true
    title: 最近更新
    limit: 3
  series:
    enable: true
    title: 长期系列
    featured: agent-runtime
    featured_description: 持续记录 Agent 系统的设计与实践。
  newsletter:
    enable: true
    text: 关注更新
    channels:
      - label: RSS
        url: /atom.xml
```

## 首页与内容

首页默认顺序为介绍、最近更新、精选阅读、长期系列、短札与影像、订阅渠道，可通过 `aether.home.sections` 重排和省略。各模块支持 `enable: false`。没有内容的阅读路径、文章和系列模块会跳过；订阅渠道与作者文案由配置维护。

### 作者介绍

`aether.hero.name` 缺省时使用站点作者名；`intro` 缺省时读取站点描述。`motion: false` 禁用书页动效。移动设备及减少动态等回退路径使用静态图；桌面 WebGL 是否启用取决于设备能力。

旧版 `hero.title`、`description`、`actions`、`side_panel`、`meta_stats` 不用于当前首页。未使用的字段已从默认配置中删除。迁移规则见 [0.1 迁移指南](MIGRATION-0.1.md)，旧配置保留在 [历史配置说明](https://github.com/whyliam/hexo-theme-aether/tree/master/docs/design/archive/legacy-configuration.md)，不应作为新站点设置依据。

### 精选阅读路径

当前同时支持 `aether.start_here` 与旧名称 `aether.paths`；前者存在时优先。文章引用可填写 slug 或路径对象。`notes.limit`、`visuals.limit` 与 `latest.limit` 支持 0；各自 `enable` 独立生效。无效文章会被跳过，避免输出失效链接。

```yaml
aether:
  paths:
    enable: true
    title: 从这里开始
    items:
      - intent: 理解 Agent 系统
        description: 从几篇代表作开始。
        posts:
          - slug: agent-runtime-introduction
          - slug: agent-design-notes
```

将此片段合并到已有 `aether` 下，不要在同一个 YAML 文件中重复定义顶层 `aether`。

### 文章、短札与影像

```yaml
---
title: 关于 Agent Runtime 的思考
date: 2026-06-01
categories: [AI & Systems]
series: agent-runtime
description: 可选的文章摘要。
---
```

- 普通文章无需 `type`；通过 `series` 归入长期主题。
- 短札使用 `type: note`；显示在短札流。
- 影像使用 `type: visual`，可配 `cover: /images/travel.jpg`；没有封面时尝试正文首图。
- 系列默认只读取显式 `series`；需要兼容旧文章时配置 `aether.series.rules`。显式字段优先；年份、篇数与最近更新均由真实内容计算。

`aether.visuals.posts` 可按顺序指定首页选片，空数组时按最近影像回退。影像归档保留其他历史记录。图片加载失败仍保留文章链接与占位尺寸。

### 页面与订阅

系列索引、系列详情、影像归档和搜索索引由主题生成。关于、分类索引、标签索引、订阅和留言板需要在站点 `source/` 中创建页面。

| 页面 | 建议文件 | Frontmatter |
| --- | --- | --- |
| 关于 | `source/about/index.md` | `layout: about` |
| 分类索引 | `source/categories/index.md` | `type: categories` |
| 标签索引 | `source/tags/index.md` | `type: tags` |
| 订阅 | `source/newsletter/index.md` | `layout: newsletter` |
| 留言板 | `source/boards/index.md` | `layout: guestbook` |

导航或订阅渠道的 URL 必须与实际文件路径一致。订阅页文案与目标由 `aether.newsletter` 的 `title`、`description`、`series`、`rss_url`、`rss_label`、`status`、`email_url`、`email_label`、`recent_title` 配置。RSS 需要安装并配置 `hexo-generator-feed`；主题链接本身不会生成订阅源。邮件订阅需要另行接入服务，默认模板不承诺已开放邮件订阅。评论沿用 NexT/Waline 配置，参见主题 `_config.yml`。

## 搜索、主题与玻璃效果

- `aether.cmdk.enable` 控制本地搜索；构建时生成 `aether-search.json`，检索标题、摘要、系列、分类与标签。`recent_count` 和 `result_limit` 控制展示数量；索引和结果链接支持子目录部署。Cmd/Ctrl+K 打开，方向键选择，Escape 关闭并返回焦点。
- 明暗主题初始跟随系统，手动切换后保存在浏览器中。
- 导航与重点系列使用玻璃材质；鼠标高光有轻微滞后，稳定后停止帧调度。
- 玻璃高光是 DOM/CSS 实现，参考 liquidGL 的视觉思路，并未集成其 GPU 背景折射。
- 减少动态、减少透明度及触控模式下停止跟手高光；不支持背景模糊时使用不透明表面。

## 外观与布局参数

所有外观参数放在 `aether.appearance`，无需直接修改 Stylus。

| 字段 | 默认 / 范围 | 用途 |
| --- | --- | --- |
| `mode` | `auto` / `light` / `dark` | 跟随系统和手动切换，或固定明暗主题 |
| `palette.light` / `palette.dark` | 对象，六位十六进制色值 | `paper`、`paper_tint`、`surface`、`surface_alt`、`ink`、`ink_secondary`、`muted`、`accent`、`accent_hover`、`accent_tint`、`rule`、`rule_strong`、`environment` |
| `layout.width` | 1180 / 800–1600px | 主版心与导航宽度 |
| `layout.article_width` | 720 / 480–960px | 文章宽度 |
| `layout.gutter` / `mobile_gutter` | 50 / 20px | 桌面与手机水平留白 |
| `font.serif` / `sans` / `mono` | 空值保留原有字体栈 | CSS 字体族列表 |
| `glass.enable` / `pointer` | true / true | 玻璃材质、鼠标跟手高光开关 |
| `glass.blur` / `saturation` | 16px / 160% | 背景模糊与饱和度 |
| `glass.surface.light` / `dark` | 六位颜色 | 玻璃底色 |
| `glass.opacity.light` / `dark` | .56 / .66 | 玻璃底色透明度，0–1 |
| `glass.reflection.light` / `dark` | .82 / .24 | 跟手高光强度，0–1 |
| `glass.rim.light` / `dark` | .95 / .36 | 内侧亮边强度，0–1 |
| `glass.follow_duration` | 100 / 0–500ms | 高光跟随时间常数；0 为即时响应 |

`home.sections` 可选 `hero`、`latest`、`paths`、`series`、`personal`、`subscribe`。默认使用全部模块；`[]` 隐藏全部首页模块。空值使用默认顺序，配置数组会替换默认顺序。`hero.links` 可配置多个 `{label, url}`；空数组显示默认档案入口。`hero.artwork: false` 隐藏书页，`hero.image` 可替换装饰图并自动停止 3D 动效。

默认 UI 根据站点语言提供英文/简体中文核心界面；可用 `aether.labels` 覆盖文案。类别显示名通过 `taxonomy.labels` 设置，原始分类和文章路径保持不变。

## 开发与升级

运行 [README 中的开发检查](../README.md#开发检查)。模板检查器依赖固定在 `requirements-dev.txt`。修改年份分组模板时，应保持每个循环和条件分支内的 HTML 标签独立闭合。

在 Hexo 站点执行 `npx hexo clean && npx hexo generate`，避免共享 Stylus 或模板更新后继续读取旧缓存。主题本身不包含站点文章、用户账号或部署凭据。许可证与上游致谢请保留。
