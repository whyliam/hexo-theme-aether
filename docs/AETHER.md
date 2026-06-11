# Aether

基于 [NexT](https://github.com/next-theme/hexo-theme-next) v8.27.0 的第 5 个 Scheme，为个人知识品牌站设计。

Aether 把博客当作「低维护成本的个人内容系统」——编辑式首页、长期系列聚合、影像归档、Cmd+K 全站搜索，写完文章即自动更新，首页几乎不需要手动运营。

---

## 快速开始

### 1. 安装

```bash
cd your-hexo-blog
git clone https://github.com/whyliam/hexo-theme-aether themes/aether
```

或软链开发：

```bash
ln -s /path/to/hexo-theme-aether themes/aether
```

### 2. 启用

创建 `_config.aether.yml`（与 `_config.yml` 同级）：

```yaml
theme: aether

theme_config:
  scheme: Aether

  menu:
    首页: / || fa fa-home
    写作: /archives/ || fa fa-pencil-alt
    系列: /series/ || fa fa-layer-group
    影像: /visuals/ || fa fa-camera-retro
    关于: /about/ || fa fa-user
```

### 3. 启动

```bash
hexo s --config _config.yml,_config.aether.yml
```

双配置叠加：`_config.aether.yml` 覆盖 `_config.yml` 的同名字段。原有主题配置不受影响，随时可以切回。

---

## 文章 Frontmatter

### 必填

```yaml
---
title: 文章标题
date: 2026-06-09
---
```

### 推荐

```yaml
---
title: Agent 时代启示录
date: 2026-06-09
categories:
  - AI & Systems
tags:
  - Agent
  - Runtime
description: 从 Copilot 到 Harness，AI 编程工具的三代演进。
---
```

`description` 不写时自动截取正文前 110 字。

### 系列文章

加一个 `series` 字段，值相同的文章自动归入同一系列：

```yaml
---
title: "Weekly #42: Agent 的下一步"
date: 2026-06-09
categories:
  - AI & Systems
series: Newsletter 周刊
---
```

系列页 `/series/newsletter-周刊/` 和首页「系列」模块自动生成，无需额外配置。

为兼容已有内容，未填写 `series` 时，Aether 也会根据稳定信号识别 Newsletter、AI Coding、Agent、Obsidian 与 2016 设计年鉴系列。显式 `series` 始终优先。

### 影像帖

```yaml
---
title: 坎昆的光
date: 2026-05-20
type: visual
cover: /images/cancun-cover.jpg
photos:
  - /images/cancun-01.jpg
  - /images/cancun-02.jpg
location: Cancún, Mexico
camera: Fujifilm X-T5
---
```

未填写 `type` 时，分类为 `Travel & Visuals` 的文章也会进入影像页；显式 `type: visual` 始终优先。

### 短札

```yaml
---
title: 关于 Context Window 的一个直觉
date: 2026-06-08
type: note
categories:
  - Notes & Essays
---
```

### 字段速查

| 字段 | 必填 | 类型 | 作用 |
|---|---|---|---|
| `title` | 是 | string | 文章标题 |
| `date` | 是 | date | 发布日期 |
| `categories` | 推荐 | string[] | 一级分类，建议不超过 4 个 |
| `tags` | 可选 | string[] | 辅助标签 |
| `description` | 可选 | string | 摘要，不写自动截取正文 |
| `series` | 可选 | string | 系列名，值相同的文章自动归组 |
| `type` | 可选 | string | `visual` = 影像帖，`note` = 短札，不填 = 普通文章 |
| `cover` | 可选 | string | 封面图 URL，影像帖和文章卡片使用 |
| `photos` | 可选 | string[] | 多图画廊，影像帖使用 |
| `location` | 可选 | string | 地点，影像帖显示 |
| `camera` | 可选 | string | 相机信息，影像归档页显示 |

不需要 `featured`、`thumbnail`、`subtitle`、`priority`、`card_description` 等字段。

---

## 首页模块配置

首页由 6 个模块组成，每个都可以独立启用/禁用。

### 模块顺序

```
01 Hero          — 个人定位 + 当前关注
02 Start Here    — 新访客阅读路径
03 Building      — 长期项目/系统
04 Latest        — 最近文章（自动）
05 Notes&Visuals — 短札 + 影像（自动）
06 Subscribe     — 订阅入口
```

### 01 Hero

```yaml
theme_config:
  aether:
    hero:
      enable: true
      eyebrow: '个人知识档案 · 始于 2010'
      identity: 行权 · Liam
      title: "写给构建者的\n思考笔记"
      description: AI · Data · Product · 影像记录
      actions:
        - text: 开始阅读
          url: '#aether-latest'
          variant: primary          # primary | default | ghost
        - text: 阅读路径
          url: '#aether-start-here'
          variant: default
        - text: 关于我
          url: /about/
          variant: ghost
      side_panel:
        enable: true
        title: 当前关注
        updated: '2026-06'
        items:
          - title: AI Coding Harness
            subtitle: 从 Copilot 到 Agent 的编程工具演进
            url: /series/ai-coding-evolution/
          - title: Agent Runtime
            subtitle: 构建可靠的 AI Agent 运行时
            url: /series/agent-runtime/
      meta_stats: []              # 空数组 = 自动统计文章/分类/标签数
```

`meta_stats` 留空会自动显示博客的文章、分类、标签总数（可点击跳转）。手动指定：

```yaml
      meta_stats:
        - label: 篇文章
          value: '702'
        - label: 个分类
          value: '4'
```

### 02 Start Here

```yaml
    start_here:
      enable: true
      section_label: '02 / 从这里开始'
      title: "不知道从哪开始？<em>试试这三条路径</em>"
      items:
        - intent: 理解 AI 系统与 Agent
          description: AI 编程工具的演进与实践
          posts:
            - slug: ai-coding-evolution-2026
            - slug: agent-runtime-design
          category: 'AI & Systems'   # posts 不够时从这个分类补
          limit: 3
        - intent: 理解产品、数据与判断
          description: 数据驱动的产品方法论
          category: 'Product & Intelligence'
          limit: 3
        - intent: 理解长期写作与知识系统
          description: 知识管理、写作方法与 Obsidian 实践
          category: 'Notes & Essays'
          limit: 3
```

每条路径的文章解析优先级：`posts`（按 slug 精确匹配）→ `category` + `limit` → `tag` + `limit` → `series` → `url`（作为 CTA 链接）。

### 03 Building

```yaml
    building:
      enable: true
      section_label: '03 / Building'
      title: 正在构建
      subtitle: 长期投入的系统与项目
      items:
        - name: AI Coding Harness
          description: 从 Copilot 到 Agent 的编程工具演进
          status: 持续更新
          status_variant: is-live    # is-live | is-rd | is-beta
          url: /series/ai-coding-evolution/
        - name: Aether Blog Theme
          description: 低维护个人内容系统
          status: 开发中
          status_variant: is-rd
          url: https://github.com/whyliam/hexo-theme-aether
          external: true
```

### 04 Latest

```yaml
    latest:
      enable: true
      section_label: '04 / 最近更新'
      title: 最近写的
      limit: 5                      # 显示篇数，默认 6
```

自动拉取最近的普通文章（排除 `type: visual` 和 `type: note`），无需手动维护。

### 05 Notes & Visuals

```yaml
    notes_visuals:
      enable: true
      section_label: '05 / 思考与影像'
      title: "一些思考碎片、城市观察\n<em>和影像记录</em>"
      notes_limit: 3
      visuals_limit: 4
```

左侧自动拉取 `type: note` 的文章，右侧自动拉取 `type: visual` 的文章。

### 06 Subscribe

```yaml
    newsletter:
      enable: true
      text: 关注更新
      channels:
        - label: RSS
          url: /atom.xml
        - label: Newsletter
          url: https://your-newsletter-url
        - label: GitHub
          url: https://github.com/yourname
          external: true
```

极简的一行订阅栏。`channels` 为空时不渲染。

---

## 文章页功能

### 系列导航

文章有 `series` 字段时，底部自动出现系列内的前后篇导航（← 上一篇 / 下一篇 →）和系列总目录链接。

### 文章底部 CTA

```yaml
    cta:
      enable: true
      eyebrow: 关注
      title: 我的输出渠道
      description: 每个渠道有不同的内容节奏和视角
      channels:
        - label: RSS
          url: /atom.xml
          hint: 全量输出
        - label: Newsletter
          url: https://your-newsletter-url
          hint: 精选 + 评论
        - label: GitHub
          url: https://github.com/yourname
          hint: 代码 + 工具
```

每篇普通文章底部显示。`enable_all: true` 时也会在短札和影像帖底部显示。

### 阅读进度条

```yaml
    reading_progress: true
```

文章页顶部显示 2px 阅读进度条。

---

## 全站搜索（Cmd+K）

```yaml
    cmdk:
      enable: true
      placeholder: 搜索文章、系列、标签...
      recent_count: 4
```

按 `Cmd+K`（macOS）或 `Ctrl+K` 打开命令面板，支持文章、系列、分类、页面的全文搜索。搜索索引在构建时自动生成（`aether-search.json`），无需外部服务。

---

## 自动生成的页面

这些页面由 Aether 的 generator 在构建时自动生成，无需手动创建：

| 页面 | 路径 | 触发条件 |
|---|---|---|
| 系列索引 | `/series/` | 有显式 `series`，或命中稳定系列识别规则 |
| 系列详情 | `/series/<slug>/` | 同上，每个系列一个页面 |
| 影像页 | `/visuals/` | 有 `type: visual`，或分类为 `Travel & Visuals` |
| 搜索索引 | `/aether-search.json` | `cmdk.enable` 不为 false |

### 需要手动创建的页面

`/about/` 页面需要手动创建：

```bash
hexo new page about
```

然后编辑 `source/about/index.md`。

---

## 品牌定制

### 品牌文字

```yaml
    brand:
      text: AETHER              # 导航栏品牌名
      dot: true                 # 品牌名后的装饰点
```

### 页脚

```yaml
  footer:
    since: 2010
    icon:
      name: fa fa-feather
      color: '#2a3a6b'
    copyright: 行权 · Liam
    powered: false              # 隐藏 "Powered by Hexo & NexT"
```

### 社交链接

```yaml
  social:
    GitHub: https://github.com/yourname || fab fa-github
    微博: https://weibo.com/yourname || fab fa-weibo
    X: https://twitter.com/yourname || fab fa-x-twitter
    RSS: /atom.xml || fa fa-rss
```

---

## 暗色模式

主题内置暗色模式支持。在 `_config.yml` 或 overlay 中：

```yaml
  darkmode: true
```

自动跟随系统偏好，也可通过导航栏切换按钮手动切换。

---

## 分类建议

Aether 建议一级分类不超过 4 个：

```
AI & Systems           — AI、工具与系统
Product & Intelligence — 产品、数据与判断
Notes & Essays         — 札记、随笔与复盘
Travel & Visuals       — 旅行、摄影与观看
```

分类是导航的主路径，标签是辅助检索，系列是长期主题沉淀。三者不混用。

---

## 维护频率

| 模块 | 维护方式 | 频率 |
|---|---|---|
| Hero 文案 | 手动 | 半年一次 |
| 当前关注 | 手动 | 季度一次 |
| Start Here | 手动 | 半年一次 |
| Building | 手动 | 季度一次 |
| Latest | 自动 | 不维护 |
| Notes & Visuals | 自动 | 不维护 |
| Subscribe | 手动 | 很少 |

首页有 3 个模块需要手动维护，其余全部自动生成。

---

## 与 NexT 的关系

Aether 是 NexT v8.27.0 的第 5 个 Scheme（与 Muse / Mist / Pisces / Gemini 并列）。所有 Aether 功能仅在 `scheme: Aether` 时激活，其余 Scheme 不受影响。

NexT 的核心功能（代码高亮、TOC、评论系统、数学公式、搜索等）在 Aether 下全部可用。

---

## 完整配置示例

```yaml
# _config.aether.yml

theme: aether

theme_config:
  scheme: Aether
  darkmode: true

  menu:
    首页: / || fa fa-home
    写作: /archives/ || fa fa-pencil-alt
    系列: /series/ || fa fa-layer-group
    影像: /visuals/ || fa fa-camera-retro
    关于: /about/ || fa fa-user

  social:
    GitHub: https://github.com/yourname || fab fa-github
    RSS: /atom.xml || fa fa-rss

  footer:
    since: 2010
    copyright: Your Name
    powered: false

  aether:
    brand:
      text: AETHER
      dot: true

    reading_progress: true

    hero:
      enable: true
      eyebrow: '个人知识档案'
      identity: Your Name
      title: "你的标题"
      description: 你的一句话定位
      actions:
        - text: 开始阅读
          url: '#aether-latest'
          variant: primary
        - text: 关于我
          url: /about/
          variant: ghost
      side_panel:
        enable: true
        title: 当前关注
        items:
          - title: 项目名称
            subtitle: 一句话说明
            url: /series/slug/

    start_here:
      enable: true
      section_label: '02 / 从这里开始'
      title: "不知道从哪开始？"
      items:
        - intent: 路径一
          description: 路径说明
          category: 'AI & Systems'
          limit: 3

    building:
      enable: true
      section_label: '03 / Building'
      title: 正在构建
      items:
        - name: 项目名
          description: 项目说明
          status: 持续更新
          status_variant: is-live
          url: /series/slug/

    latest:
      enable: true
      limit: 5

    notes_visuals:
      enable: true
      notes_limit: 3
      visuals_limit: 4

    newsletter:
      enable: true
      text: 关注更新
      channels:
        - label: RSS
          url: /atom.xml

    cmdk:
      enable: true

    cta:
      enable: true
      channels:
        - label: RSS
          url: /atom.xml
```
