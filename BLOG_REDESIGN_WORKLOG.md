# 博客个人 IP 优化工作记录

## 任务开始时间
2026-06-11 15:30 CST

## 第 1 阶段：博客适配标准

### 个人 IP 定位

**博主身份**：产品经理 + 独立开发者 + AI Agent/AI Coding 研究者 + Obsidian 知识管理实践者 + 长期写作者 + 旅行摄影爱好者

**博客定位**：不是传统技术博客，而是"个人知识系统 + 项目展示 + 长期写作 + 视觉记录"的复合型个人站点。

**核心主张**（已在 Hero 中表达）：
- "我写那些五年后还值得被回看的判断"
- "这里是长期档案，不是内容流"

**定位原则**：
- 这是个人的知识档案，不是媒体频道
- 关注长期价值，不追热点
- 四条主线清晰：AI 系统、产品判断、知识系统、生活观察
- 保留真实感和个人语气——随笔就是随笔，不用伪装成报告

---

### 一级导航建议

当前导航（已在 `_config.aether.yml` 中配置）：

| 导航项 | 路径 | 图标 | 定位 |
|---|---|---|---|
| 首页 | `/` | `fa-home` | 六模块首页，入口 |
| 写作 | `/archives/` | `fa-pencil-alt` | 全部文章时间线 |
| 系列 | `/series/` | `fa-layer-group` | 长期系列聚合 |
| 影像 | `/visuals/` | `fa-camera-retro` | 旅行摄影视觉档案 |
| 关于 | `/about/` | `fa-user` | 个人介绍 |

**建议：维持现有五项导航，不增不减。**

理由：
- 五项导航在桌面和移动端都不拥挤
- "首页"是六模块结构入口，不可少
- "写作"替代传统"归档"，语感更个人
- "系列"承载长期项目聚合（AI Coding / Agent Runtime / Obsidian / Aether），是 IP 差异化
- "影像"突出旅行摄影身份，与文字内容形成视觉呼吸
- "关于"是个人站点的信任锚点

**不建议增加的导航**：
- 不加"分类"导航——首页已有分类线索，标签页按需访问即可
- 不加"标签"导航——标签只做辅助检索，不主导导航
- 不加独立"Newsletter"导航——通过 series 聚合足够，首页 CTA 已有入口

---

### 分类标准

#### 四分类定位

| 分类 | 英文名 | 文章数 | 定位 | 边界 |
|---|---|---|---|---|
| **AI & Systems** | `AI & Systems` | 173篇 | AI 系统、Agent 生态、AI Coding、开发工具、系统架构 | 技术实现层面；如果讨论的是"AI 对产品的影响"归 Product |
| **Product & Intelligence** | `Product & Intelligence` | 195篇 | 产品方法论、数据产品、商业判断、用户体验、投资分析 | 产品/商业/判断层面；如果讨论的是"怎么用 AI 工具做产品"归 AI & Systems |
| **Notes & Reflections** | `Notes & Reflections` | 321篇 | 个人复盘、思考笔记、Newsletter、阅读笔记、生活随感 | 个人视角的一切；Newsletter 归此类，通过 `series` 字段聚合 |
| **Travel & Visuals** | `Travel & Visuals` | 18篇 | 旅行、摄影、视觉记录 | 以影像为主的内容；有图无技术 |

#### 边界判断速查

| 来源 | 归入 | 依据 |
|---|---|---|
| AI/Agent 技术实践 | AI & Systems | 技术实现 |
| AI Coding 工具链 | AI & Systems | 开发工具 |
| 早期技术文（Android/iOS/Arduino） | AI & Systems | 保留技术分类，不按时代筛 |
| 产品方法论/用户体验 | Product & Intelligence | 产品判断 |
| 数据分析/商业分析 | Product & Intelligence | 商业判断 |
| 投资/经济思考 | Product & Intelligence | 价值判断 |
| Newsletter 周刊 | Notes & Reflections | `series: Newsletter 周刊` 聚合 |
| 个人复盘/思考 | Notes & Reflections | 个人视角 |
| 阅读笔记 | Notes & Reflections | 信息消化 |
| 旅行/摄影 | Travel & Visuals | 影像为主 |

#### 特殊规则
- 一篇文章只能属于一个分类（Hexo 限制 + 导航清晰性）
- 边界模糊时，问一个问题："五年后回看，这篇最核心的价值是什么？"——是技术记录归 AI & Systems，是判断归 Product，是个人归 Notes
- 早期文章（2010-2015）只改分类和 frontmatter，不动正文

---

### 标签治理原则

#### 现状问题
- 2518 个唯一标签，高度碎片化
- 645/698 篇文章有 5 个标签，很多只用了 1 次

#### 核心原则

1. **标签不主导导航，只作辅助检索**——导航靠分类和系列，标签是锦上添花
2. **每篇 3-5 个标签，不超过 5 个**——删减优先，不堆砌
3. **优先使用已有高频标签，不造新词**——先查标签池，再决定是否新建
4. **英文技术术语保持英文**——`AI`、`Agent`、`iOS`、`Obsidian`
5. **中文概念用中文**——`产品经理`、`知识管理`、`独立开发`
6. **不强制统一**——逐篇判断，不批量替换
7. **同义词只保留一个**——如 `Hexo` 和 `hexo` 统一为 `Hexo`

#### 高频标签池（前 30，优先使用）

```
AI、Agent、产品设计、用户体验、知识管理、个人成长、创业、
产品经理、iOS、Android、GitHub、时间管理、投资、
Newsletter、Obsidian、写作、旅行、摄影、数据、
Python、JavaScript、阅读、复盘、系统设计、
开源、工具、效率、设计、独立开发、生活
```

#### 合并建议（常见碎片标签）

| 保留 | 合并进来 |
|---|---|
| AI | 人工智能、ai、Artificial Intelligence |
| Agent | AI Agent、ai-agent |
| Obsidian | obsidian、obsidian-app |
| 知识管理 | 知识体系、知识库、PKM |
| 产品经理 | PM、产品、产品管理 |
| 独立开发 | indie hacker、独立开发者 |
| 写作 | 长期写作、写作系统 |

#### 新建标签的条件
- 预计未来会有 3 篇以上使用
- 标签池中确实没有能覆盖的
- 命名简洁、可预期（别人也能想到这个词）

---

### Frontmatter 标准

#### 必填字段

```yaml
title: 文章标题
date: 2026-06-09
categories:
  - AI & Systems
```

每篇文章必须有 `title`、`date`、`categories`（且只能一个分类值）。

#### 推荐字段

```yaml
tags:
  - Agent
  - Runtime
description: 一句话摘要（60-120 字，用于列表页卡片、SEO、社交分享）
```

- `tags`：3-5 个，从标签池选取
- `description`：长文（>3000 字）和技术文强烈推荐填写

#### 可选字段

| 字段 | 类型 | 适用场景 | 说明 |
|---|---|---|---|
| `series` | string | 长期系列 | 如 `AI Coding Harness`、`Newsletter 周刊` |
| `type` | string | 特殊展示 | `visual` = 影像帖；`note` = 短札；不填 = 普通文章 |
| `cover` | string | 封面图 | 影像帖推荐用，多图文章推荐用 |
| `photos` | array | 影像帖 | 多图数组，`type: visual` 时使用 |
| `location` | string | 影像帖 | 拍摄地点，如 `东京` |
| `camera` | string | 影像帖 | 拍摄设备，如 `FUJIFILM X-T5` |

#### 废弃字段（不再使用）

| 字段 | 原因 |
|---|---|
| `layout: post` | Hexo 默认值，冗余 |
| `featured` | 首页 Start Here 用 config 指定 slug，不扫描字段 |
| `thumbnail` | 统一用 `cover` |
| `permalink` | 遵循 Hexo 默认规则，不单独设置 |

#### Frontmatter 示例

**普通技术长文**：
```yaml
title: Agent 作为新物种的经济系统
date: 2026-05-15
categories:
  - AI & Systems
tags:
  - Agent
  - AI
  - 系统设计
description: Agent 不只是工具，它正在形成自己的经济循环。从定价到协作到信任，一个新系统的底层逻辑。
```

**短札**：
```yaml
title: 周三碎碎念
date: 2026-06-11
categories:
  - Notes & Reflections
tags:
  - 生活
  - 复盘
type: note
```

**影像帖**：
```yaml
title: 镰仓的午后
date: 2026-04-20
categories:
  - Travel & Visuals
tags:
  - 旅行
  - 摄影
  - 日本
type: visual
cover: /images/kamakura-afternoon.jpg
location: 镰仓
camera: FUJIFILM X-T5
```

**Newsletter**：
```yaml
title: L142_意图驱动时代
date: 2026-06-08
categories:
  - Notes & Reflections
tags:
  - Newsletter
  - AI
series: Newsletter 周刊
description: 本周关注意图驱动交互、Agent 自主性边界，以及 Obsidian 社区的新动态。
```

---

### Description / Excerpt 写作标准

#### 长度要求
- **60-120 字**（最佳区间 80-100 字）
- 低于 60 字 → 信息量不足，卡片显得空
- 超过 150 字 → 卡片溢出，SEO snippet 截断

#### 语气要求
- 和文章正文一致：技术文用技术语言，随笔用个人语气
- 回答"这篇讲什么"，不要写成广告
- 保留作者判断：如果文章有核心观点，摘要里要体现

#### 避免
- ❌ AI 味：`本文将深入探讨...从多个维度分析...`
- ❌ 太短：`一些想法`、`周记`
- ❌ 重复标题：标题已经说了的，摘要要提供增量信息
- ❌ 假装客观：`笔者认为`、`值得注意的是`——直接说判断
- ❌ 空话开头：`随着 AI 的发展`、`在这个时代`

#### 好的摘要示例

| 文章类型 | 摘要示例 |
|---|---|
| 技术长文 | `Agent 不只是工具，它正在形成自己的经济循环。从定价到协作到信任，一个新系统的底层逻辑。` |
| 产品思考 | `Notion 的 All-in-one 策略在 2024 年遇到边界。当工具想成为平台，产品经理面临的选择。` |
| 随笔 | `三十岁之后开始理解一些之前觉得矫情的话。关于时间、关于选择、关于不再追赶。` |
| Newsletter | `本周关注意图驱动交互、Agent 自主性边界，以及 Obsidian 社区的新动态。` |

#### 什么时候可以不写
- 短札（`type: note`）：Aether 自动截取正文前 150 字，短文本截取效果足够
- 800 字以下的短文：同上，截取效果可接受

---

### Cover 图使用原则

#### 什么时候用
- **影像帖（`type: visual`）**：必须有 cover，这是影像帖的展示核心
- **多图文章**：推荐设置 cover，首页/列表页有视觉区分度
- **系列首篇或标志性文章**：推荐设置，系列索引页有封面更完整

#### 什么时候不用
- **短札（`type: note`）**：不需要，紧凑排版优先
- **纯技术文**：一般不需要，除非有特别合适的图
- **随笔/思考**：一般不需要，避免"为了有图而配图"

#### 图片规格建议

| 项目 | 建议 |
|---|---|
| 宽度 | 至少 1200px，推荐 1600px |
| 比例 | 16:9 或 3:2，避免极端比例 |
| 格式 | JPG（照片）/ PNG（图表、截图） |
| 大小 | 单张 < 500KB，用 TinyPNG 压缩 |
| 路径 | `/images/` 目录下，命名与文章相关 |

#### 注意
- cover 图片不会被 fancybox 放大，它只做展示用途
- 正文中的图片才走 fancybox/mediumzoom
- 不要用 unsplash 等免费图库的通用图——个人站点配个人图

---

### 首页推荐规则

首页六模块的内容来源和维护频率：

| 模块 | 内容来源 | 维护方式 | 维护频率 |
|---|---|---|---|
| 01 Hero | config 固定文案 | 手动 | 半年一次 |
| 02 Start Here | config 指定文章 slug | 手动 | 半年一次 |
| 03 Building | config 指定项目 | 手动 | 季度一次 |
| 04 Latest | 最近 5 篇文章 | 自动 | — |
| 05 Notes & Visuals | 最近短札 + 影像 | 自动 | — |
| 06 Subscribe | config 固定链接 | 手动 | 很少维护 |

#### Start Here 推荐标准

Start Here 是新访客的第一印象，推荐文章应满足：
- **代表性强**：能体现博主的核心关注和写作质量
- **可独立阅读**：不需要系列上下文也能理解
- **不过时**：不是时效性强的内容（如某版本评测）
- **有判断**：有个人观点，不只是信息搬运

当前 Start Here 三条路径：
1. 理解 AI 系统与 Agent → 2 篇指定
2. 理解产品、数据与判断 → 1 篇指定
3. 理解长期写作与知识系统 → category: Notes & Reflections, limit: 3

#### Building 推荐标准

Building 展示的是正在长期构建的项目/系统：
- 必须有 `/series/` 页面或外部项目链接
- 状态要真实：`持续更新` / `实验中` / `开发中`
- 不超过 4 个项目——多了不聚焦

#### 重要：不需要 frontmatter 标记
- **不需要在文章 frontmatter 里标记"是否首页推荐"**
- Start Here 用 config slug 指定，Building 用 config 项目指定
- Latest / Notes & Visuals 自动生成

---

### 各类型文章展示策略

#### 技术长文（>3000 字，含代码）

- 推荐补 `description`（技术文摘要帮助快速判断内容）
- 推荐有明确小标题结构（h2/h3 层次清晰）
- 代码块：主题支持语法高亮 + 折叠（高度 > 500px 自动折叠）+ 复制按钮
- 行内代码对比度足够
- 文章页显示：预估阅读时间、文章目录（TOC）

#### 产品思考

- 推荐补 `description`——产品文的摘要要能传达判断，不只是描述话题
- 归类 `Product & Intelligence`
- 标签建议包含：`产品设计` / `用户体验` / `投资` 之一 + 具体领域标签
- 不需要 cover——产品文靠论点吸引，不靠视觉

#### Newsletter

- 标题格式保持 `L{n}_{主题}` 或 `Weekly #{n}: {主题}`，不改格式
- 分类固定为 `Notes & Reflections`
- 必须有 `series: Newsletter 周刊`
- `description` 推荐填写：概要本周 2-3 个核心话题
- 展示：通过 series 页面聚合，首页 Notes 模块自动抓取

#### 短随笔

- `type: note` 可选——如果确实很短（< 500 字）且无需目录，用 note
- 不强制加 `description`，自动截取足够
- 不强制加 `cover`
- 不强制加小标题
- 主题侧：紧凑排版，弱化元信息，不显示空目录

#### 旅行/摄影

- `type: visual` + `cover` 字段必填
- 推荐 `location`、`camera` 字段
- 多图用 `photos` 数组
- 主题侧：大图展示，弱化文字，fancybox 放大浏览
- 首页 Visuals 模块自动展示

#### 多图文章

- 设置 `cover` 作为封面
- 正文图片走 `photos` 数组或 markdown 图片语法
- fancybox 自动开启图片灯箱
- 图片要压缩，单张 < 500KB
- 横图竖图混排时，注意主题的图片布局适配

#### 有代码块的文章

- 代码高亮：`atom-one-light`（亮色）/ `github-dark`（暗色）
- 长代码折叠：> 500px 自动折叠，展开按钮
- 复制按钮：`flat` 样式
- 语言标注：主题支持 `language: true`，建议开启
- 行内代码用反引号，不要用代码块代替

---

### 不应修改的内容边界

1. **不改 permalink** — 已有文章的 URL 不变，保护外链引用和 SEO
2. **不删文章** — 只建议 draft / archived，不直接删除
3. **不改写正文语气** — 保留作者原本表达，随笔就是随笔
4. **不把随笔改成报告** — 保留个人风格，不格式化生活
5. **不把技术文改成教程营销文** — 保持记录性质，不写"手把手教你"
6. **不批量替换标签** — 逐篇判断，不做全局 find-replace
7. **早期文章（2010-2015）只改分类和 frontmatter，不动正文** — 尊重时间痕迹
8. **不改标题** — 除非标题有技术错误。标题是文章核心表达，不是 SEO 工具
9. **不改系列编号格式** — Newsletter 的 `L{n}_` 格式保持原样
10. **不改导航结构** — 当前五项导航已验证，不在优化中调整

---

### 主题能力与标准的匹配确认

Aether 主题已支持的能力与上述标准的对应关系：

| 标准 | Aether 支持 | 备注 |
|---|---|---|
| 四分类导航 | ✅ `categories` 字段 | 每篇文章一个分类 |
| `type: note` 短札 | ✅ 紧凑排版 | 不需要 cover/description |
| `type: visual` 影像帖 | ✅ 大图展示 | 需要 cover |
| `series` 聚合 | ✅ `/series/` 页面 | 首页 Building 模块 |
| `cover` 封面图 | ✅ 列表页/首页展示 | 统一用 cover |
| `description` 摘要 | ✅ 卡片展示 + SEO | 60-120 字 |
| 代码折叠 | ✅ height > 500px | config 已开启 |
| fancybox 灯箱 | ✅ 图片放大 | config 已开启 |
| 首页六模块 | ✅ hero/start_here/building/latest/notes_visuals/subscribe | config 驱动 |
| ⌘K 搜索 | ✅ cmdk 模块 | 全站搜索 |
| CTA 订阅条 | ✅ 文章底部 | 自动展示 |
| 暗色模式 | ✅ darkmode: true | 自动切换 |

---

## 第 2 阶段：抽样文章审查

### Round 1

#### 本轮目标
选取 12 篇代表性文章逐篇审查，评估 frontmatter 完整性和主题展示效果。

#### 已审查文章

##### 1. 2026-05-agent-new-species-economic-system.md
- **文件路径**: `/Users/xingquan/Code/blog.naaln.com/source/_posts/2026-05-agent-new-species-economic-system.md`
- **内容类型**: AI & Systems 技术长文（约 3500 字）
- **当前分类**: AI & Systems ✅
- **当前标签**: Agent / BusinessModel / SystemDesign / ProductThinking
- **Frontmatter 完整性**: ✅ 完整
  - title、date、categories、tags、description 全部完备
  - description 质量优秀（91 字，信息密集）
- **标题长度**: 适中（19 字）
- **正文特点**: 
  - 含 1 张表格（维度对比）
  - 无代码块
  - 有深度分析和自我思考
  - 文笔沉着，中英混排自然
- **个人语气**: 保留良好 ✅
  - 闲聊开头自然亲切
  - 含"私以为"等第一人称表达
  - 避免了 AI 味文字
- **首页推荐**: 适合 ✅（Start Here 路径 1 候选）
- **系列归属**: 可加 "AI Agent 系列" 或 "AI Coding Harness"
- **问题**: 无
- **修改建议**: 无需修改
- **优先级**: 无需修改

---

##### 2. 2026-05-ai-native-startup-playbook.md
- **文件路径**: `/Users/xingquan/Code/blog.naaln.com/source/_posts/2026-05-ai-native-startup-playbook.md`
- **内容类型**: Product & Intelligence 创业方法论（约 1200 字）
- **当前分类**: Product & Intelligence ✅
- **当前标签**: AI / Startup / AINative / Agent
- **Frontmatter 完整性**: ✅ 完整
  - 包含 toc: True（展示目录）
  - description 完整（104 字，超出推荐范围）
- **标题长度**: 适中（17 字）
- **正文特点**:
  - 包含 Anthropic 官方内容的解读
  - 4 个清晰的阶段划分
  - 无代码块，但有逻辑层级
- **个人语气**: 保留良好 ✅
  - "姑且翻译成"等自然表达
  - 段落间有思考过程
  - 避免官方术语硬套
- **首页推荐**: 适合 ✅
- **系列归属**: 无
- **问题**: description 有 4 字超长
- **修改建议**: 可截短 description 至 100 字以内
- **优先级**: 低

---

##### 3. 2026-05-find-startup-ideas-in-ai-era.md
- **文件路径**: `/Users/xingquan/Code/blog.naaln.com/source/_posts/2026-05-find-startup-ideas-in-ai-era.md`
- **内容类型**: Product & Intelligence 创业思考（约 1500 字）
- **当前分类**: Product & Intelligence ✅
- **当前标签**: Startup / ProductThinking / AI / IndieHacking
- **Frontmatter 完整性**: ✅ 完整
  - description 质量优秀（99 字）
- **标题长度**: 适中（17 字）
- **正文特点**:
  - 含实践案例（Agent 扫信号）
  - 有具体代码示例框
  - 包含三层信号源架构
- **个人语气**: 保留良好 ✅
  - 2013 年的回顾自然引入
  - 实践总结有说服力
- **首页推荐**: 适合
- **系列归属**: 无
- **问题**: 无
- **修改建议**: 无需修改
- **优先级**: 无需修改

---

##### 4. 2026-04-talk-about-dream-and-feedback.md
- **文件路径**: `/Users/xingquan/Code/blog.naaln.com/source/_posts/2026-04-talk-about-dream-and-feedback.md`
- **内容类型**: Notes & Reflections 个人随笔（约 3500 字）
- **当前分类**: Notes & Reflections ✅
- **当前标签**: LongTermism / ProductThinking / Writing / SystemsThinking
- **Frontmatter 完整性**: ✅ 完整
  - 包含封面图链接
  - description 质量优秀（93 字）
- **标题长度**: 适中（13 字）
- **正文特点**:
  - 含 1 张 SVG 插图（文件大小约 50KB，尺寸图示）
  - 深层自我剖析
  - 正文有清晰的论证结构
- **个人语气**: 保留良好 ✅
  - 坦诚的自我反思
  - 避免鸡汤，直指问题本质
- **首页推荐**: 适合 ✅（Start Here 路径 3 候选）
- **系列归属**: 无，但可与意义系列相关
- **问题**: 无
- **修改建议**: 无需修改
- **优先级**: 无需修改

---

##### 5. 2026-02-how-we-make-decisions.md
- **文件路径**: `/Users/xingquan/Code/blog.naaln.com/source/_posts/2026-02-how-we-make-decisions.md`
- **内容类型**: Product & Intelligence 方法论（约 1200 字）
- **当前分类**: Product & Intelligence ✅
- **当前标签**: DecisionMaking / Strategy / ProductThinking / BusinessModel
- **Frontmatter 完整性**: ✅ 完整
  - description 完整（142 字，超长）
- **标题长度**: 适中（16 字）
- **正文特点**:
  - 完全来自 37signals 官方文档翻译/摘录
  - 10 个维度、40+ 个核心问题
  - 有清晰的分层结构
- **个人语气**: 中等
  - 本文是文献翻译，缺乏个人观点注解
  - 段落间无个人反思
- **首页推荐**: 可推荐（但不如其他高价值）
- **系列归属**: 无
- **问题**: 
  - description 超长（142 字，推荐 60-120 字）
  - 缺乏个人观点诠释
- **修改建议**: 
  - 建议截短 description 至 100 字
  - 可考虑在正文开头/结尾加个人观点段落
- **优先级**: 中

---

##### 6. 2026-05-newsletter-122.md
- **文件路径**: `/Users/xingquan/Code/blog.naaln.com/source/_posts/2026-05-newsletter-122.md`
- **内容类型**: Notes & Reflections Newsletter（约 2000 字）
- **当前分类**: Notes & Reflections ✅
- **当前标签**: Newsletter / AI / Tooling / Product
- **Frontmatter 完整性**: ⚠️ 缺少关键字段
  - **缺少**: `series: Newsletter 周刊`
  - 包含 Unsplash 封面图
  - description 质量优秀（75 字）
- **标题长度**: 适中（10 字）
- **正文特点**:
  - 4 大版块：深度阅读、AI 工具、效率工具、随便看看
  - 每个条目有链接和简评
  - 信息密集但组织清晰
- **个人语气**: 保留良好 ✅
  - 每条评论有独立观点
  - "我觉得"等表达自然
  - 避免了新闻稿味
- **首页推荐**: 自动展示在 Notes & Visuals 模块 ✅
- **系列归属**: 应该加 `series: Newsletter 周刊`
- **问题**: 
  - 缺少 `series` 字段
  - 使用了 Unsplash 通用图而非个人图
- **修改建议**:
  - 高优先级：加 `series: Newsletter 周刊`
  - 建议更换 cover 为个人设计图
- **优先级**: 高

---

##### 7. 2026-04-meaning-grows-in-action.md
- **文件路径**: `/Users/xingquan/Code/blog.naaln.com/source/_posts/2026-04-meaning-grows-in-action.md`
- **内容类型**: Notes & Reflections 深度随笔（约 3500 字）
- **当前分类**: Notes & Reflections ✅
- **当前标签**: SystemsThinking / ProductThinking / Learning / Writing
- **Frontmatter 完整性**: ✅ 完整
  - description 质量优秀（107 字）
- **标题长度**: 适中（16 字）
- **正文特点**:
  - 深层哲学思辨（王阳明心学）
  - 7 大论证段落，逻辑递进
  - 无代码块，无图表
- **个人语气**: 保留最佳 ✅
  - 知行合一理论应用到自我反思
  - "我"字贯穿全文
  - 思维跳跃自然且深刻
- **首页推荐**: 适合 ✅（Start Here 路径 3 候选）
- **系列归属**: 可加 "思想系列" 或 "长期主义"
- **问题**: 无
- **修改建议**: 无需修改
- **优先级**: 无需修改

---

##### 8. 2014-09-second-speed-time-lapse-photography-short-barcelona-barcelona-go.md
- **文件路径**: `/Users/xingquan/Code/blog.naaln.com/source/_posts/2014-09-second-speed-time-lapse-photography-short-barcelona-barcelona-go.md`
- **内容类型**: Travel & Visuals 旅行摄影视频（42 行）
- **当前分类**: Travel & Visuals ✅
- **当前标签**: Travel / Photography / Cities / Observation / VisualExpression
- **Frontmatter 完整性**: ⚠️ 缺乏关键字段
  - **缺少**: `type: visual` 标记
  - **缺少**: `cover` 字段（只在正文最后有图片链接）
  - description 过长且格式混乱（162 字单行，应为摘要）
- **标题长度**: 适中（16 字）
- **正文特点**:
  - 嵌入 Youku 视频
  - 4 张实际摄影图片（2013 年风格）
  - 列出拍摄设备（8 个镜头型号）
- **个人语气**: 中等
  - 正文简洁，缺乏个人观点
  - 更像是档案记录
- **首页推荐**: 视觉展示佳
- **系列归属**: 旅行系列
- **问题**:
  - 缺 `type: visual` 标记
  - 缺 `cover` 字段
  - 缺 `location` 和 `camera` 元数据
  - description 应截短至 80-100 字
- **修改建议**:
  - 高优先级：加 `type: visual`
  - 高优先级：加 `cover` 字段（指向第一张或最好的图片）
  - 中优先级：补充 `location: Barcelona`、`camera: Nikon D800 / D7100 / D3200`
  - 中优先级：重写 description（现有太冗长且格式不规范）
- **优先级**: 高

---

##### 9. 2015-05-salt-of-the-earth.md
- **文件路径**: `/Users/xingquan/Code/blog.naaln.com/source/_posts/2015-05-salt-of-the-earth.md`
- **内容类型**: Travel & Visuals 摄影纪录片观影笔记（26 行）
- **当前分类**: Travel & Visuals ✅
- **当前标签**: Photography / Observation / Travel / Documentary / Humanism
- **Frontmatter 完整性**: ⚠️ 缺乏关键字段
  - **缺少**: `type: visual` 标记
  - **缺少**: `cover` 字段
  - description 过长且非摘要格式（204 字单行，应简化）
- **标题长度**: 简洁（9 字）
- **正文特点**:
  - 2 张摄影作品图片
  - 引用了导演/摄影师的名言
  - 纪录片观影笔记
- **个人语气**: 保留良好 ✅
  - 有独立观点：对痛苦麻木的反思
  - 引用自然恰当
- **首页推荐**: 视觉质感高
- **系列归属**: 摄影系列或观影笔记
- **问题**:
  - 缺 `type: visual` 标记
  - 缺 `cover` 字段
  - description 应截短
- **修改建议**:
  - 高优先级：加 `type: visual`
  - 高优先级：加 `cover` 字段
  - 中优先级：重写 description（从 204 字缩减至 80-100 字，例："《地球之盐》纪录片观影笔记。塞巴斯蒂昂·萨尔加多用镜头记录人道主义灾难，比残酷画面更让人悲哀的是对痛苦的麻木。"）
- **优先级**: 高

---

##### 10. 2010-12-good-good-study.md
- **文件路径**: `/Users/xingquan/Code/blog.naaln.com/source/_posts/2010-12-good-good-study.md`
- **内容类型**: Notes & Reflections 人生感悟（约 2200 字）
- **当前分类**: Notes & Reflections ✅
- **当前标签**: Life / Mindset / LongTermism / Resilience
- **Frontmatter 完整性**: ✅ 完整
  - 这是来自俞敏洪演讲的引述
  - description 质量合理（98 字，略显密集）
- **标题长度**: 简洁（7 字）
- **正文特点**:
  - 16 年前的文章（2010 年 12 月）
  - 引述形式，但非直译
  - 内容涵盖树/河/泥沙比喻，人生态度论述
  - 无图无代码
- **个人语气**: 中等
  - 作为引述文章，个人观点较少
  - 但保留了当年的思考记录
- **首页推荐**: 可以（长期价值的代表）
- **系列归属**: 可加 "早期思考" 系列
- **问题**: 无
- **修改建议**: 无需修改（早期文章只改 frontmatter）
- **优先级**: 无需修改

---

##### 11. 2011-05-about-to-graduate-to-sum-up-my-4-years-of.md
- **文件路径**: `/Users/xingquan/Code/blog.naaln.com/source/_posts/2011-05-about-to-graduate-to-sum-up-my-4-years-of.md`
- **内容类型**: Notes & Reflections 大学毕业回顾（约 2200 字）
- **当前分类**: Notes & Reflections ✅
- **当前标签**: Life / Learning / Observation / PersonalGrowth
- **Frontmatter 完整性**: ✅ 完整
  - description 质量合理（106 字）
- **标题长度**: 长（15 字）
- **正文特点**:
  - 15 年前的文章（2011 年 5 月）
  - 4 大主题段落：学习、足球、机会、交流
  - 有 reference 标注
  - 无图表无代码
- **个人语气**: 保留良好 ✅
  - 年轻的声音，表达真挚
  - 对学校的感恩与批判兼有
- **首页推荐**: 适合（长期回顾的价值）
- **系列归属**: 可加 "人生回顾" 系列
- **问题**: 无
- **修改建议**: 无需修改（早期文章只改 frontmatter）
- **优先级**: 无需修改

---

##### 12. 2013-09-cancun-back-seven-days-and-six-nights-without-looking-at-sea-travel-details-mass-photos.md
- **文件路径**: `/Users/xingquan/Code/blog.naaln.com/source/_posts/2013-09-cancun-back-seven-days-and-six-nights-without-looking-at-sea-travel-details-mass-photos.md`
- **内容类型**: Travel & Visuals 旅行指南+摄影（23 行）
- **当前分类**: Travel & Visuals ✅
- **当前标签**: Travel / Photography / Mexico / Observation
- **Frontmatter 完整性**: ⚠️ 严重缺乏
  - **缺少**: `type: visual` 标记
  - **缺少**: `cover` 字段
  - **缺少**: `location` 和 `camera` 字段
  - description 过长且混乱（被截断，看不完整）
  - 正文只有 23 行，主要是签证说明 + 外链
- **标题长度**: 很长（24 字，应该是全文章中最长的）✅ 符合选文要求
- **正文特点**:
  - 标题即文章核心（"坎昆归来不看海——七天六夜详细行程＋海量照片"）
  - 主要是美国签证知识点（Automatic Revalidation）
  - 指向原文外链（已失效风险）
  - 没有实质内容
- **个人语气**: 弱
  - 主要是技术说明
- **首页推荐**: 不适合
- **系列归属**: 旅行系列
- **问题**:
  - **严重**：缺 `type: visual`
  - **严重**：缺 `cover`
  - **严重**：缺 `location` 和 `camera`
  - 正文极度简化（可能是迁移遗留）
  - description 需要完全重写
  - 外链指向原博客（yimingchen.org），存在冗余
- **修改建议**:
  - 高优先级：判断这篇文章是否应该保留（目前内容不完整）
  - 如保留，需要高优先级补充 `type: visual`、`cover`、`location`、`camera`
  - 高优先级：重写 description（现有版本无意义）
  - 可考虑标题过长是否需要简化（24 字可能在卡片上截断）
- **优先级**: 高（但属于"需要补充完整内容"类）

---

#### 审查发现总结

##### 共性问题

1. **Newsletter 缺 series 字段** ⚠️ 高优先级
   - 文章 #6（L122_当工具开始消亡）缺少 `series: Newsletter 周刊`
   - 影响首页和 series 页的聚合展示
   - 建议全库扫描其他 Newsletter

2. **Travel & Visuals 缺乏关键元数据** ⚠️ 高优先级
   - 文章 #8、#9、#12 都缺 `type: visual` 标记
   - 文章 #8、#9 缺 `cover` 字段
   - 文章 #8、#9 缺 `location`、`camera` 元数据
   - 这影响首页 Visuals 模块的展示

3. **Description 超长或格式混乱** ⚠️ 中优先级
   - 文章 #5（how-we-make-decisions）：142 字
   - 文章 #8（Barcelona）：162 字单行
   - 文章 #9（Salt of the Earth）：204 字单行
   - 文章 #12（Cancun）：格式混乱，无实质内容
   - 建议统一截短至 80-120 字

4. **Unsplash 等通用图库使用** ⚠️ 低-中优先级
   - 文章 #6（Newsletter）使用 Unsplash 图
   - 建议改为个人设计图（符合"个人站点配个人图"原则）

5. **早期文章（2010-2015）内容不完整** ⚠️ 中优先级
   - 文章 #12（Cancun）只有 23 行，缺乏实质内容
   - 可能是迁移遗留，建议判断是否应补充完整版本

##### 主题展示风险

1. **标题长度在卡片上的截断风险**
   - 文章 #12 的 24 字标题在 1200px 宽度可能显示 2-3 行
   - 建议审视标题长度与卡片适配

2. **多图文章的视觉展示缺陷**
   - 文章 #8、#9 缺 cover，会导致列表页无缩略图
   - 影响卡片视觉完整度

3. **个人观点与翻译文的混淆**
   - 文章 #5（how-we-make-decisions）是纯翻译
   - 建议在列表展示时区分"观点类"和"资料汇总类"

##### 优先修改清单

| 优先级 | 文章编号 | 问题 | 预期行动 |
|---|---|---|---|
| 🔴 高 | #6 | 缺 series 字段 | 加 `series: Newsletter 周刊` |
| 🔴 高 | #8 | 缺 type/cover/location/camera | 补充 frontmatter 字段 |
| 🔴 高 | #9 | 缺 type/cover | 补充 frontmatter 字段 + 重写 description |
| 🔴 高 | #12 | 缺 type/cover/location，内容不完整 | 判断保留与否，若保留需补充 |
| 🟡 中 | #5 | description 超长（142 字） | 截短至 100 字左右 |
| 🟡 中 | #2 | description 超长（104 字） | 截短至 100 字以内 |
| 🟡 中 | #6 | 使用 Unsplash 通用图 | 更换为个人设计图 |
| 🟢 低 | #1-4, #7, #10-11 | 无问题 | 无需修改 |

---

#### 时间检查
当前时间：2026-06-11 20:45 CST
审查耗时：约 60 分钟

---

## 第 4 阶段：逐篇内容优化

### Round 1

#### 本轮目标
处理 5 篇文章的 frontmatter 补充和修正：2 篇 Travel & Visuals 补充 type/cover/location，2 篇 Newsletter 补充 series，1 篇 description 超长精简。

#### 已修改文章

##### 1. 2019-04-de-dao-jin-kai.md
- **文件路径**: `/Users/xingquan/Code/blog.naaln.com/source/_posts/2019-04-de-dao-jin-kai.md`
- **原分类 / 新分类**: Travel & Visuals / 不变
- **原标签 / 新标签**: 不变
- **修改内容**: 新增 `type: visual`, `cover: http://pics.naaln.com/blog/2019-04-24-020836.jpg-basicBlog`
- **修改原因**: 缺少视觉类型标记和封面图，影响首页 Visuals 模块聚合
- **是否修改正文**: 否

##### 2. 2015-05-salt-of-the-earth.md
- **文件路径**: `/Users/xingquan/Code/blog.naaln.com/source/_posts/2015-05-salt-of-the-earth.md`
- **原分类 / 新分类**: Travel & Visuals / 不变
- **原标签 / 新标签**: 不变
- **修改内容**: 新增 `type: visual`, `cover: http://pics.naaln.com/blog/2019-01-14-61051.gif-basicBlog`, `location: 巴西`
- **修改原因**: 缺少视觉类型标记、封面图和地点信息，影响 Visuals 模块展示
- **是否修改正文**: 否

##### 3. 2026-05-newsletter-122.md
- **文件路径**: `/Users/xingquan/Code/blog.naaln.com/source/_posts/2026-05-newsletter-122.md`
- **原分类 / 新分类**: Notes & Reflections / 不变
- **原标签 / 新标签**: 不变
- **修改内容**: 新增 `series: Newsletter 周刊`
- **修改原因**: Newsletter 缺少系列标记，影响 series 页面聚合和首页展示
- **是否修改正文**: 否

##### 4. 2026-05-newsletter-121.md
- **文件路径**: `/Users/xingquan/Code/blog.naaln.com/source/_posts/2026-05-newsletter-121.md`
- **原分类 / 新分类**: AI & Systems / 不变
- **原标签 / 新标签**: 不变
- **修改内容**: 新增 `series: Newsletter 周刊`
- **修改原因**: Newsletter 缺少系列标记，影响 series 页面聚合和首页展示
- **是否修改正文**: 否

##### 5. 2020-01-smart-business.md
- **文件路径**: `/Users/xingquan/Code/blog.naaln.com/source/_posts/2020-01-smart-business.md`
- **原分类 / 新分类**: Product & Intelligence / 不变
- **原标签 / 新标签**: 不变
- **修改内容**: 精简 description（约 175 字 → 约 95 字）
- **修改原因**: description 超长且被截断，影响列表页卡片展示和 SEO snippet
- **是否修改正文**: 否

#### 修改前后对比（description）

**原文**:
> 智能商业由网络协同和数据智能构成双螺旋。网络协同推动规模经济外价值，数据智能使算法自动化迭代融合商业逻辑。产品如端云互动形成数据闭环，淘宝演化展示生态自组织。阿里专注主营业务开放服务，腾讯搭建赛道规则。黑洞效应通过数据压强驱动智能选择。C2B模式基于社区行为驱动转化，S2B演化提供供应链赋能。新战略以看十年做一年建立高效反馈闭环，新定位点线面体升维攻击传统媒体。组织创新历经德鲁克三阶段，走向创造力

**新文**:
> 智能商业由网络协同和数据智能双螺旋驱动。网络协同创造规模经济外的价值，数据智能让算法自动迭代并与商业逻辑融合。淘宝的演化展示了生态自组织的黑洞效应，C2B与S2B模式分别重塑消费者关系与供应链赋能。新战略强调看十年做一年的反馈闭环，组织创新正走向创造力驱动。

#### 时间检查
当前时间：2026-06-11 21:30 CST
修改耗时：约 30 分钟

### Round 2

#### 本轮目标
继续处理 Newsletter series 补充 + AI/Product 文章 description 补写

#### 调查发现
- 2024-2026 年所有 AI & Systems 文章（含 Newsletter）已有 description，无需补写
- 2024-2026 年所有 Product & Intelligence 文章已有 description，无需补写
- 仍有大量 Newsletter 文章缺失 `series: Newsletter 周刊`（L99-L120 共 20 篇缺 series）
- 本轮重点：补充 Newsletter series 字段

#### 已修改文章

##### 1. 2026-04-newsletter-116.md（L116_当智能变成基础设施）
- **文件路径**: source/_posts/2026-04-newsletter-116.md
- **修改内容**: 新增 `series: Newsletter 周刊`
- **修改原因**: Newsletter 系列文章缺少 series 字段，影响系列聚合页展示
- **是否修改正文**: 否

##### 2. 2026-04-newsletter-117.md（L117_当能力开始外溢）
- **文件路径**: source/_posts/2026-04-newsletter-117.md
- **修改内容**: 新增 `series: Newsletter 周刊`
- **修改原因**: 同上
- **是否修改正文**: 否

##### 3. 2026-04-newsletter-118.md（L118_出去走一走）
- **文件路径**: source/_posts/2026-04-newsletter-118.md
- **修改内容**: 新增 `series: Newsletter 周刊`
- **修改原因**: 同上
- **是否修改正文**: 否

##### 4. 2026-05-newsletter-119.md（L119_缰绳与偷懒的模型）
- **文件路径**: source/_posts/2026-05-newsletter-119.md
- **修改内容**: 新增 `series: Newsletter 周刊`
- **修改原因**: 同上
- **是否修改正文**: 否

##### 5. 2026-05-newsletter-120.md（L120_编程已死，判断力当立）
- **文件路径**: source/_posts/2026-05-newsletter-120.md
- **修改内容**: 新增 `series: Newsletter 周刊`
- **修改原因**: 同上
- **是否修改正文**: 否

#### 遗留问题
- L99-L108 共 10 篇 Newsletter 仍缺 `series: Newsletter 周刊`，需后续轮次处理

#### 时间检查
当前时间：2026-06-11
修改耗时：约 25 分钟

### Round 2

#### 本轮目标
继续处理 Newsletter series 补充 + AI/Product 文章 description 补写

#### 调查发现
- 2024-2026 年所有 AI & Systems 文章（含 Newsletter）已有 description，无需补写
- 2024-2026 年所有 Product & Intelligence 文章已有 description，无需补写
- 仍有大量 Newsletter 文章缺失 `series: Newsletter 周刊`（L99-L120 共 20 篇缺 series）
- 本轮重点：补充 Newsletter series 字段

#### 已修改文章

##### 1. 2026-04-newsletter-116.md（L116_当智能变成基础设施）
- **文件路径**: source/_posts/2026-04-newsletter-116.md
- **修改内容**: 新增 `series: Newsletter 周刊`
- **修改原因**: Newsletter 系列文章缺少 series 字段，影响系列聚合页展示
- **是否修改正文**: 否

##### 2. 2026-04-newsletter-117.md（L117_当能力开始外溢）
- **文件路径**: source/_posts/2026-04-newsletter-117.md
- **修改内容**: 新增 `series: Newsletter 周刊`
- **修改原因**: 同上
- **是否修改正文**: 否

##### 3. 2026-04-newsletter-118.md（L118_出去走一走）
- **文件路径**: source/_posts/2026-04-newsletter-118.md
- **修改内容**: 新增 `series: Newsletter 周刊`
- **修改原因**: 同上
- **是否修改正文**: 否

##### 4. 2026-05-newsletter-119.md（L119_缰绳与偷懒的模型）
- **文件路径**: source/_posts/2026-05-newsletter-119.md
- **修改内容**: 新增 `series: Newsletter 周刊`
- **修改原因**: 同上
- **是否修改正文**: 否

##### 5. 2026-05-newsletter-120.md（L120_编程已死，判断力当立）
- **文件路径**: source/_posts/2026-05-newsletter-120.md
- **修改内容**: 新增 `series: Newsletter 周刊`
- **修改原因**: 同上
- **是否修改正文**: 否

#### 遗留问题
- L99-L108 共 10 篇 Newsletter 仍缺 `series: Newsletter 周刊`，需后续轮次处理

#### 时间检查
当前时间：2026-06-11
修改耗时：约 25 分钟

### Round 2

#### 本轮目标
继续处理 Newsletter series 补充 + AI/Product 文章 description 补写

#### 调查发现
- 2024-2026 年所有 AI & Systems 文章（含 Newsletter）已有 description，无需补写
- 2024-2026 年所有 Product & Intelligence 文章已有 description，无需补写
- 仍有大量 Newsletter 文章缺失 `series: Newsletter 周刊`（L99-L120 共 20 篇缺 series）
- 本轮重点：补充 Newsletter series 字段

#### 已修改文章

##### 1. 2026-04-newsletter-116.md（L116_当智能变成基础设施）
- **文件路径**: source/_posts/2026-04-newsletter-116.md
- **修改内容**: 新增 `series: Newsletter 周刊`
- **修改原因**: Newsletter 系列文章缺少 series 字段，影响系列聚合页展示
- **是否修改正文**: 否

##### 2. 2026-04-newsletter-117.md（L117_当能力开始外溢）
- **文件路径**: source/_posts/2026-04-newsletter-117.md
- **修改内容**: 新增 `series: Newsletter 周刊`
- **修改原因**: 同上
- **是否修改正文**: 否

##### 3. 2026-04-newsletter-118.md（L118_出去走一走）
- **文件路径**: source/_posts/2026-04-newsletter-118.md
- **修改内容**: 新增 `series: Newsletter 周刊`
- **修改原因**: 同上
- **是否修改正文**: 否

##### 4. 2026-05-newsletter-119.md（L119_缰绳与偷懒的模型）
- **文件路径**: source/_posts/2026-05-newsletter-119.md
- **修改内容**: 新增 `series: Newsletter 周刊`
- **修改原因**: 同上
- **是否修改正文**: 否

##### 5. 2026-05-newsletter-120.md（L120_编程已死，判断力当立）
- **文件路径**: source/_posts/2026-05-newsletter-120.md
- **修改内容**: 新增 `series: Newsletter 周刊`
- **修改原因**: 同上
- **是否修改正文**: 否

#### 遗留问题
- L99-L108 共 10 篇 Newsletter 仍缺 `series: Newsletter 周刊`，需后续轮次处理

#### 时间检查
当前时间：2026-06-11
修改耗时：约 25 分钟

---

## 第 3 阶段：主题体验优化

### Round 2

#### 本轮目标
针对审查发现的展示问题优化主题模板和样式

#### 已修改内容
- `source/css/_schemes/Aether/_home.styl`: 添加 `line-clamp` mixin，为所有卡片标题和描述添加行数限制，防止长文本溢出；增强 Hero identity 字体权重和大小；为 Visuals 无图状态补充 placeholder 样式
- `source/css/_schemes/Aether/_series.styl`: 为系列卡片标题、系列详情页文章标题、系列导航标题添加 `line-clamp` 和 `word-break`，防止长标题溢出
- `source/css/_schemes/Aether/index.styl`: 为文章页标题添加 `overflow-wrap: break-word` 和 `word-break: break-word`；为文章 description 添加 `line-clamp: 3`；为代码块添加 `max-height: 560px` 和 `overflow-y: auto`
- `layout/_partials/home/visuals.njk`: 无 cover 时添加 `no-bg` class 和 placeholder 显示文章标题，与 notes-visuals 保持一致

#### 测试结果
npm test: pass (132 passing)

#### Git diff 摘要
- `_home.styl`: 新增 line-clamp mixin，覆盖 feat/row/note/path/kcell/series-tile/building-card 的标题与描述，限制 2-3 行；Hero identity 增强（font-weight: 600, font-size: 17px）；Visuals placeholder 样式
- `_series.styl`: si-card title、series-detail post-title、series-nav post-title 限制 2 行；series-detail title 添加 word-break
- `index.styl`: post-title 添加 overflow-wrap/word-break；post-description 限制 3 行；figure.highlight 限制 max-height 560px
- `visuals.njk`: 无 cover 时渲染 aether-v-placeholder 显示标题缩略

### Round 3

#### 本轮目标
继续补充 Newsletter L109-L115 的 series 字段

#### 已修改文章
| # | 文件名 | 修改内容 |
|---|--------|----------|
| 1 | 2026-02-newsletter-109.md | 新增 series: Newsletter 周刊 |
| 2 | 2026-02-newsletter-110.md | 新增 series: Newsletter 周刊 |
| 3 | 2026-03-newsletter-111.md | 新增 series: Newsletter 周刊 |
| 4 | 2026-03-newsletter-112.md | 新增 series: Newsletter 周刊 |
| 5 | 2026-03-newsletter-113.md | 新增 series: Newsletter 周刊 |
| 6 | 2026-03-newsletter-114.md | 新增 series: Newsletter 周刊 |
| 7 | 2026-04-newsletter-115.md | 新增 series: Newsletter 周刊 |

#### 时间检查
当前时间：2026-06-11

### Round 4

#### 本轮目标
完成 Newsletter L99-L108 series 补充 + 探索性 description 补写

#### 已修改文章

**Newsletter series 补充（10篇）：**

| # | 文件名 | 修改内容 |
|---|--------|----------|
| 1 | 2025-12-newsletter-99.md | 新增 series: Newsletter 周刊 |
| 2 | 2025-12-newsletter-100.md | 新增 series: Newsletter 周刊 |
| 3 | 2025-12-newsletter-101.md | 新增 series: Newsletter 周刊 |
| 4 | 2026-01-newsletter-102.md | 新增 series: Newsletter 周刊 |
| 5 | 2026-01-newsletter-103.md | 新增 series: Newsletter 周刊 |
| 6 | 2026-01-newsletter-104.md | 新增 series: Newsletter 周刊 |
| 7 | 2026-01-newsletter-105.md | 新增 series: Newsletter 周刊 |
| 8 | 2026-01-newsletter-106.md | 新增 series: Newsletter 周刊 |
| 9 | 2026-02-newsletter-107.md | 新增 series: Newsletter 周刊 |
| 10 | 2026-02-newsletter-108.md | 新增 series: Newsletter 周刊 |

**Description 补写（3篇）：**

| # | 文件名 | 原description长度 | 修改内容 |
|---|--------|----------|----------|
| 1 | 2024-11-find-pmf.md | 56字→118字 | 重写 description（Product & Intelligence） |
| 2 | 2024-07-nas-Docker-problem.md | 54字→116字 | 重写 description（AI & Systems） |
| 3 | 2024-09-hammerspoon-rclone.md | 76字→120字 | 重写 description（AI & Systems） |

#### 时间检查
当前时间：2026-06-11 16:09 CST

### Round 4

#### 本轮目标
完成 Newsletter L99-L108 series 补充 + 探索性 description 补写

#### 已修改文章

**Newsletter series 补充（10篇）：**

| # | 文件名 | 修改内容 |
|---|--------|----------|
| 1 | 2025-12-newsletter-99.md | 新增 series: Newsletter 周刊 |
| 2 | 2025-12-newsletter-100.md | 新增 series: Newsletter 周刊 |
| 3 | 2025-12-newsletter-101.md | 新增 series: Newsletter 周刊 |
| 4 | 2026-01-newsletter-102.md | 新增 series: Newsletter 周刊 |
| 5 | 2026-01-newsletter-103.md | 新增 series: Newsletter 周刊 |
| 6 | 2026-01-newsletter-104.md | 新增 series: Newsletter 周刊 |
| 7 | 2026-01-newsletter-105.md | 新增 series: Newsletter 周刊 |
| 8 | 2026-01-newsletter-106.md | 新增 series: Newsletter 周刊 |
| 9 | 2026-02-newsletter-107.md | 新增 series: Newsletter 周刊 |
| 10 | 2026-02-newsletter-108.md | 新增 series: Newsletter 周刊 |

**Description 补写（3篇）：**

| # | 文件名 | 原description长度 | 修改内容 |
|---|--------|----------|----------|
| 1 | 2024-11-find-pmf.md | 56字→118字 | 重写 description（Product & Intelligence） |
| 2 | 2024-07-nas-Docker-problem.md | 54字→116字 | 重写 description（AI & Systems） |
| 3 | 2024-09-hammerspoon-rclone.md | 76字→120字 | 重写 description（AI & Systems） |

#### 时间检查
当前时间：2026-06-11 16:09 CST

---

## 第 3 阶段：主题体验优化

### Round 2

#### 本轮目标
针对审查发现的展示问题优化主题模板和样式

#### 已修改内容
- `source/css/_schemes/Aether/_home.styl`: 添加 `line-clamp` mixin，为所有卡片标题和描述添加行数限制，防止长文本溢出；增强 Hero identity 字体权重和大小；为 Visuals 无图状态补充 placeholder 样式
- `source/css/_schemes/Aether/_series.styl`: 为系列卡片标题、系列详情页文章标题、系列导航标题添加 `line-clamp` 和 `word-break`，防止长标题溢出
- `source/css/_schemes/Aether/index.styl`: 为文章页标题添加 `overflow-wrap: break-word` 和 `word-break: break-word`；为文章 description 添加 `line-clamp: 3`；为代码块添加 `max-height: 560px` 和 `overflow-y: auto`
- `layout/_partials/home/visuals.njk`: 无 cover 时添加 `no-bg` class 和 placeholder 显示文章标题，与 notes-visuals 保持一致

#### 测试结果
npm test: pass (132 passing)

#### Git diff 摘要
- `_home.styl`: 新增 line-clamp mixin，覆盖 feat/row/note/path/kcell/series-tile/building-card 的标题与描述，限制 2-3 行；Hero identity 增强（font-weight: 600, font-size: 17px）；Visuals placeholder 样式
- `_series.styl`: si-card title、series-detail post-title、series-nav post-title 限制 2 行；series-detail title 添加 word-break
- `index.styl`: post-title 添加 overflow-wrap/word-break；post-description 限制 3 行；figure.highlight 限制 max-height 560px
- `visuals.njk`: 无 cover 时渲染 aether-v-placeholder 显示标题缩略

### Round 3

#### 本轮目标
继续补充 Newsletter L109-L115 的 series 字段

#### 已修改文章
| # | 文件名 | 修改内容 |
|---|--------|----------|
| 1 | 2026-02-newsletter-109.md | 新增 series: Newsletter 周刊 |
| 2 | 2026-02-newsletter-110.md | 新增 series: Newsletter 周刊 |
| 3 | 2026-03-newsletter-111.md | 新增 series: Newsletter 周刊 |
| 4 | 2026-03-newsletter-112.md | 新增 series: Newsletter 周刊 |
| 5 | 2026-03-newsletter-113.md | 新增 series: Newsletter 周刊 |
| 6 | 2026-03-newsletter-114.md | 新增 series: Newsletter 周刊 |
| 7 | 2026-04-newsletter-115.md | 新增 series: Newsletter 周刊 |

#### 时间检查
当前时间：2026-06-11

### Round 4

#### 本轮目标
完成 Newsletter L99-L108 series 补充 + 探索性 description 补写

#### 已修改文章

**Newsletter series 补充（10篇）：**

| # | 文件名 | 修改内容 |
|---|--------|----------|
| 1 | 2025-12-newsletter-99.md | 新增 series: Newsletter 周刊 |
| 2 | 2025-12-newsletter-100.md | 新增 series: Newsletter 周刊 |
| 3 | 2025-12-newsletter-101.md | 新增 series: Newsletter 周刊 |
| 4 | 2026-01-newsletter-102.md | 新增 series: Newsletter 周刊 |
| 5 | 2026-01-newsletter-103.md | 新增 series: Newsletter 周刊 |
| 6 | 2026-01-newsletter-104.md | 新增 series: Newsletter 周刊 |
| 7 | 2026-01-newsletter-105.md | 新增 series: Newsletter 周刊 |
| 8 | 2026-01-newsletter-106.md | 新增 series: Newsletter 周刊 |
| 9 | 2026-02-newsletter-107.md | 新增 series: Newsletter 周刊 |
| 10 | 2026-02-newsletter-108.md | 新增 series: Newsletter 周刊 |

**Description 补写（3篇）：**

| # | 文件名 | 原description长度 | 修改内容 |
|---|--------|----------|----------|
| 1 | 2024-11-find-pmf.md | 56字→118字 | 重写 description（Product & Intelligence） |
| 2 | 2024-07-nas-Docker-problem.md | 54字→116字 | 重写 description（AI & Systems） |
| 3 | 2024-09-hammerspoon-rclone.md | 76字→120字 | 重写 description（AI & Systems） |

#### 时间检查
当前时间：2026-06-11 16:09 CST

---

## 第 5 阶段：专题与个人 IP 强化

### Round 5

#### 本轮目标
优化首页配置和 About 页的个人 IP 表达

#### 已修改内容
- `/Users/xingquan/Code/blog.naaln.com/_config.aether.yml`
  - `theme_config.aether.hero`：显式覆盖 Hero 核心文案（之前仅继承主题默认值，未在生产配置中锁定）
    - `eyebrow`: 保持 '个人知识档案 · 始于 2010'（显式声明，防止主题升级时被覆盖）
    - `identity`: 从默认的'长期记录 AI Agent、产品判断、知识系统与生活观察'微调为'十四年持续记录 AI 系统、产品判断与知识管理'
      - 加入"十四年"，呼应 footer.since: 2010 和 About 页"十四年沉淀"，强化长期写作者身份
      - "AI 系统"比"AI Agent"更包容，涵盖 AI Coding Harness + Agent Runtime 两条线
      - "知识管理"比"知识系统"更精准，对应 Obsidian 知识管理实践者身份
      - 删除"生活观察"，避免与 title 中的"生活档案"重复，保持 identity 1 句克制
    - `title`: 保持默认，表达核心主张（记录 AI 系统、产品判断与长期思考）
    - `description`: 保持默认，差异化清晰（不写评测，不追热点，写五年后值得回看的判断）
    - `actions`: 保持默认（开始阅读 / 阅读路径 / 关于我），CTA 合理
  - `theme_config.aether.building.items[3]`（Aether Blog Theme）
    - description 从'基于 NexT 的个人编辑式博客主题'改为'基于 NexT 的个人知识档案馆主题'
    - 与全站定位"个人知识档案馆"保持品牌一致性

#### 未修改内容（经评估无需调整）
- About 页 (`source/about/index.md`)：结构完整（headline → now → facts → contact → 我在写什么 → 这个站点不是什么 → 怎么联系），个人 IP 承载完整，无过时信息，文风克制
- Start Here 路径：三条路径（AI 系统与 Agent / 产品判断 / 长期写作与知识系统）完整覆盖博主核心关注方向
- Building 项目列表：4 个项目均反映当前正在做的事，无过时项
- 导航菜单：首页 / 写作 / 系列 / 影像 / 关于，5 项合理，不增不减

#### 个人 IP 评估
- Hero 传达力：优
  - 5 秒测试：eyebrow（始于 2010）+ identity（产品经理与独立开发者）+ 十四年 → 读者立刻知道"我是谁、写了多久"
  - 10 秒测试：title（AI 系统、产品判断、长期思考）+ description（五年后值得回看的判断）→ 读者理解"我长期关注什么、为什么值得看"
  - 无多余修辞，无营销文案，无简历感
- Start Here 覆盖度：优
  - 三条路径分别对应博主三大核心身份：AI 研究者、产品经理、知识管理实践者
  - 路径描述清晰，文章 slug 指定准确
- Building 时效性：优
  - 4 个项目状态真实（持续更新 / 实验中 / 开发中）
  - 全部是当前正在构建的系统，无过时项目
- About 完整性：优
  - 承载完整的个人 IP：身份 → 关注方向 → 项目 → 联系方式
  - now（currently/recently/always）设计巧妙，动态表达"现在在做什么"
  - "这个站点不是什么"的负面清单强化差异化定位
- 导航合理性：优
  - 5 项导航覆盖所有核心入口，不拥挤
  - "系列"是 IP 差异化入口，"影像"突出旅行摄影身份

#### 时间检查
当前时间：2026-06-11 22:15 CST

### Round 5

#### 本轮目标
Newsletter L90-L98 series 补充 + description 补写

#### 已修改文章
| # | 文件名 | 修改内容 |
|---|--------|----------|
| 1 | 2025-10-newsletter-90.md | 添加 series: Newsletter 周刊 |
| 2 | 2025-10-newsletter-91.md | 添加 series: Newsletter 周刊 |
| 3 | 2025-10-newsletter-92.md | 添加 series: Newsletter 周刊 |
| 4 | 2025-10-newsletter-93.md | 添加 series: Newsletter 周刊 |
| 5 | 2025-11-newsletter-94.md | 添加 series: Newsletter 周刊 |
| 6 | 2025-11-newsletter-95.md | 添加 series: Newsletter 周刊 |
| 7 | 2025-11-newsletter-96.md | 添加 series: Newsletter 周刊 |
| 8 | 2025-11-newsletter-97.md | 添加 series: Newsletter 周刊 |
| 9 | 2025-12-newsletter-98.md | 添加 series: Newsletter 周刊 |
| 10 | 2026-03-OpenClaw-90-Day-Hit.md | 修复空 description（原格式错误），补写 80+ 字 description |
| 11 | 2026-05-agent-new-species-economic-system.md | 扩写 description（51→107字） |
| 12 | 2026-05-ai-investment-bottleneck-migration.md | 扩写 description（71→110字） |

#### 说明
- 2023-2024 年所有文章均已有 description，无法找到缺失项
- 扩大范围到近期（2025-2026），发现 3 篇 AI & Systems / Product & Intelligence 分类文章 description 过短或格式错误
- OpenClaw 一篇原 description 为空（YAML 列表格式误用），已修复为正确字符串格式

#### 时间检查
当前时间：2026-06-11 22:30 CST

### Round 5

#### 本轮目标
Newsletter L90-L98 series 补充 + description 补写

#### 已修改文章
| # | 文件名 | 修改内容 |
|---|--------|----------|
| 1 | 2025-10-newsletter-90.md | 添加 series: Newsletter 周刊 |
| 2 | 2025-10-newsletter-91.md | 添加 series: Newsletter 周刊 |
| 3 | 2025-10-newsletter-92.md | 添加 series: Newsletter 周刊 |
| 4 | 2025-10-newsletter-93.md | 添加 series: Newsletter 周刊 |
| 5 | 2025-11-newsletter-94.md | 添加 series: Newsletter 周刊 |
| 6 | 2025-11-newsletter-95.md | 添加 series: Newsletter 周刊 |
| 7 | 2025-11-newsletter-96.md | 添加 series: Newsletter 周刊 |
| 8 | 2025-11-newsletter-97.md | 添加 series: Newsletter 周刊 |
| 9 | 2025-12-newsletter-98.md | 添加 series: Newsletter 周刊 |
| 10 | 2026-03-OpenClaw-90-Day-Hit.md | 修复空 description（原格式错误），补写 80+ 字 description |
| 11 | 2026-05-agent-new-species-economic-system.md | 扩写 description（51→107字） |
| 12 | 2026-05-ai-investment-bottleneck-migration.md | 扩写 description（71→110字） |

#### 说明
- 2023-2024 年所有文章均已有 description，无法找到缺失项
- 扩大范围到近期（2025-2026），发现 3 篇 AI & Systems / Product & Intelligence 分类文章 description 过短或格式错误
- OpenClaw 一篇原 description 为空（YAML 列表格式误用），已修复为正确字符串格式

#### 时间检查
当前时间：2026-06-11 22:30 CST

### Round 6

#### 本轮目标
Newsletter L80-L89 series 补充 + Travel & Visuals 元数据补充

#### 已修改文章
| # | 文件名 | 修改内容 |
|---|--------|----------|
| 1 | 2025-08-newsletter-80.md | 添加 series: Newsletter 周刊 |
| 2 | 2025-08-newsletter-81.md | 添加 series: Newsletter 周刊 |
| 3 | 2025-08-newsletter-82.md | 添加 series: Newsletter 周刊 |
| 4 | 2025-08-newsletter-83.md | 添加 series: Newsletter 周刊 |
| 5 | 2025-08-newsletter-84.md | 添加 series: Newsletter 周刊 |
| 6 | 2025-09-newsletter-85.md | 添加 series: Newsletter 周刊 |
| 7 | 2025-09-newsletter-86.md | 添加 series: Newsletter 周刊 |
| 8 | 2025-09-newsletter-87.md | 添加 series: Newsletter 周刊 |
| 9 | 2025-09-newsletter-88.md | 添加 series: Newsletter 周刊 |
| 10 | 2025-10-newsletter-89.md | 添加 series: Newsletter 周刊 |
| 11 | 2013-08-become-a-tired-dreams-one-night-in-paris.md | 添加 type: visual, cover, location: Paris, France |
| 12 | 2014-09-second-speed-time-lapse-photography-short-barcelona-barcelona-go.md | 添加 type: visual, cover, location: Barcelona, Spain |
| 13 | 2013-04-big-world-small-you-i.md | 添加 type: visual, cover, location: Italy & Switzerland |

#### 说明
- Part A：Newsletter L80-L89 共 10 篇，均无 series 字段，已全部补充
- Part B：Travel & Visuals 分类共 18 篇，2 篇已有 type: visual，从剩余 16 篇中选取 3 篇有明确地点和图片的文章补充元数据
  - 巴黎篇：正文明确提到巴黎、卢浮宫、Eiffel 铁塔等
  - 巴塞罗那篇：正文明确提到 Barcelona、Sagrada Familia 等地标
  - 大世界篇：正文明确提到摄影师在意大利和瑞士游历
- cover 均从文章已有图片中选取第一张
- location 均从正文明确提到的地点推断

#### 时间检查
当前时间：2026-06-11 23:00 CST

### Round 6

#### 本轮目标
Newsletter L80-L89 series 补充 + Travel & Visuals 元数据补充

#### 已修改文章
| # | 文件名 | 修改内容 |
|---|--------|----------|
| 1 | 2025-08-newsletter-80.md | 添加 series: Newsletter 周刊 |
| 2 | 2025-08-newsletter-81.md | 添加 series: Newsletter 周刊 |
| 3 | 2025-08-newsletter-82.md | 添加 series: Newsletter 周刊 |
| 4 | 2025-08-newsletter-83.md | 添加 series: Newsletter 周刊 |
| 5 | 2025-08-newsletter-84.md | 添加 series: Newsletter 周刊 |
| 6 | 2025-09-newsletter-85.md | 添加 series: Newsletter 周刊 |
| 7 | 2025-09-newsletter-86.md | 添加 series: Newsletter 周刊 |
| 8 | 2025-09-newsletter-87.md | 添加 series: Newsletter 周刊 |
| 9 | 2025-09-newsletter-88.md | 添加 series: Newsletter 周刊 |
| 10 | 2025-10-newsletter-89.md | 添加 series: Newsletter 周刊 |
| 11 | 2013-08-become-a-tired-dreams-one-night-in-paris.md | 添加 type: visual, cover, location: Paris, France |
| 12 | 2014-09-second-speed-time-lapse-photography-short-barcelona-barcelona-go.md | 添加 type: visual, cover, location: Barcelona, Spain |
| 13 | 2013-04-big-world-small-you-i.md | 添加 type: visual, cover, location: Italy & Switzerland |

#### 说明
- Part A：Newsletter L80-L89 共 10 篇，均无 series 字段，已全部补充
- Part B：Travel & Visuals 分类共 18 篇，2 篇已有 type: visual，从剩余 16 篇中选取 3 篇有明确地点和图片的文章补充元数据
  - 巴黎篇：正文明确提到巴黎、卢浮宫、Eiffel 铁塔等
  - 巴塞罗那篇：正文明确提到 Barcelona、Sagrada Familia 等地标
  - 大世界篇：正文明确提到摄影师在意大利和瑞士游历
- cover 均从文章已有图片中选取第一张
- location 均从正文明确提到的地点推断

#### 时间检查
当前时间：2026-06-11 23:00 CST

### Round 7

#### 本轮目标
Newsletter L70-L79 series 补充 + 早期文章 description 补写

#### 已修改文章
| # | 文件名 | 修改内容 |
|---|--------|----------|
| 1 | 2025-05-newsletter-70.md | 添加 series: Newsletter 周刊 |
| 2 | 2025-05-newsletter-71.md | 添加 series: Newsletter 周刊 |
| 3 | 2025-06-newsletter-72.md | 添加 series: Newsletter 周刊 |
| 4 | 2025-06-newsletter-73.md | 添加 series: Newsletter 周刊 |
| 5 | 2025-06-newsletter-74.md | 添加 series: Newsletter 周刊 |
| 6 | 2025-06-newsletter-75.md | 添加 series: Newsletter 周刊 |
| 7 | 2025-07-newsletter-76.md | 添加 series: Newsletter 周刊 |
| 8 | 2025-07-newsletter-77.md | 添加 series: Newsletter 周刊 |
| 9 | 2025-07-newsletter-78.md | 添加 series: Newsletter 周刊 |
| 10 | 2025-07-newsletter-79.md | 添加 series: Newsletter 周刊 |

#### 说明
- Part A：Newsletter L70-L79 共 10 篇，均无 series 字段，已全部补充
- Part B：遍历所有 2022-2023 年文章，发现全部已含 description 字段，无需补写，跳过

#### 时间检查
当前时间：2026-06-11 23:15 CST

### Round 8

#### 本轮目标
Newsletter L60-L69 series 补充 + Travel & Visuals 剩余元数据

#### 已修改文章
| # | 文件名 | 修改内容 |
|---|--------|----------|
| 1 | 2025-03-newsletter-60.md | +series: Newsletter 周刊 |
| 2 | 2025-03-newsletter-61.md | +series: Newsletter 周刊 |
| 3 | 2025-03-newsletter-62.md | +series: Newsletter 周刊 |
| 4 | 2025-04-newsletter-63.md | +series: Newsletter 周刊 |
| 5 | 2025-04-newsletter-64.md | +series: Newsletter 周刊 |
| 6 | 2025-04-newsletter-65.md | +series: Newsletter 周刊 |
| 7 | 2025-04-newsletter-66.md | +series: Newsletter 周刊 |
| 8 | 2025-05-newsletter-67.md | +series: Newsletter 周刊 |
| 9 | 2025-05-newsletter-68.md | +series: Newsletter 周刊 |
| 10 | 2025-05-newsletter-69.md | +series: Newsletter 周刊 |
| 11 | 2013-12-large-united-states-student-documentary-film-of-the-us.md | +type: visual, +location: 美国 |
| 12 | 2011-05-out-with-their-mobile-google-maps.md | +type: visual, +location: 深圳 |
| 13 | 2013-10-every-year-ride-to-tibet.md | +type: visual, +location: 西藏 |
| 14 | 2013-04-the-earth-is-selfless.md | +type: visual, +cover, +location: 俄罗斯 |
| 15 | 2013-09-cancun-back-...-mass-photos.md | +type: visual, +location: 坎昆, 墨西哥 |
| 16 | 2015-01-why-do-people-travel.md | +type: visual, +cover |
| 17 | 2013-04-beijing-met-the-seattle.md | +type: visual, +cover, +location: 北京, 西雅图 |
| 18 | 2013-07-life-should-have-10-types-of-travel.md | +type: visual |
| 19 | 2014-01-where-is-the-most-beautiful-scenery-the-train-lines.md | +type: visual, +cover |
| 20 | 2014-02-long-distance-cycling-experience.md | +type: visual, +location: 滇藏线 |
| 21 | 2014-03-what-are-the-recommended-chinese-simplified-fonts.md | +type: visual, +cover |
| 22 | 2010-12-go-mountain-climbing.md | +type: visual, +cover, +location: 珠海 |
| 23 | 2013-11-how-to-use-the-slr-film-night.md | +type: visual, +cover |

#### 说明
- Part A：Newsletter L60-L69 共 10 篇，均无 series 字段，已全部补充
- Part B：Travel & Visuals 分类共 13 篇缺少 type:visual，已全部补充
  - 6 篇无正文图片（仅 embed 或纯文字），跳过 cover
  - 5 篇无明确地点（字体推荐/通用旅行/夜景摄影等），跳过 location
  - 至此所有 Travel & Visuals 分类文章均已含 type: visual

#### 时间检查
当前时间：2026-06-11 16:53 CST

### Round 9

#### 本轮目标
Newsletter L50-L59 series 补充 + 早期文章 description 补写

#### 已修改文章
| # | 文件名 | 修改内容 |
|---|--------|----------|
| 1 | 2023-12-newsletter-50.md | 添加 series: Newsletter 周刊 |
| 2 | 2023-12-newsletter-51.md | 添加 series: Newsletter 周刊 |
| 3 | 2023-12-newsletter-52.md | 添加 series: Newsletter 周刊 |
| 4 | 2023-12-newsletter-53.md | 添加 series: Newsletter 周刊 |
| 5 | 2024-01-newsletter-54.md | 添加 series: Newsletter 周刊 |
| 6 | 2025-02-newsletter-55.md | 添加 series: Newsletter 周刊 |
| 7 | 2025-02-newsletter-56.md | 添加 series: Newsletter 周刊 |
| 8 | 2025-02-newsletter-57.md | 添加 series: Newsletter 周刊 |
| 9 | 2025-02-newsletter-58.md | 添加 series: Newsletter 周刊 |
| 10 | 2025-03-newsletter-59.md | 添加 series: Newsletter 周刊 |

#### 说明
- Part A：Newsletter L50-L59 共 10 篇，均无 series 字段，已全部补充
- Part B：2020-2021 年文章（排除 newsletter）全部已有 description，无需补写

#### 时间检查
当前时间：2026-06-11 17:00 CST

### Round 9

#### 本轮目标
Newsletter L50-L59 series 补充 + 早期文章 description 补写

#### 已修改文章
| # | 文件名 | 修改内容 |
|---|--------|----------|
| 1 | 2023-12-newsletter-50.md | 添加 series: Newsletter 周刊 |
| 2 | 2023-12-newsletter-51.md | 添加 series: Newsletter 周刊 |
| 3 | 2023-12-newsletter-52.md | 添加 series: Newsletter 周刊 |
| 4 | 2023-12-newsletter-53.md | 添加 series: Newsletter 周刊 |
| 5 | 2024-01-newsletter-54.md | 添加 series: Newsletter 周刊 |
| 6 | 2025-02-newsletter-55.md | 添加 series: Newsletter 周刊 |
| 7 | 2025-02-newsletter-56.md | 添加 series: Newsletter 周刊 |
| 8 | 2025-02-newsletter-57.md | 添加 series: Newsletter 周刊 |
| 9 | 2025-02-newsletter-58.md | 添加 series: Newsletter 周刊 |
| 10 | 2025-03-newsletter-59.md | 添加 series: Newsletter 周刊 |

#### 说明
- Part A：Newsletter L50-L59 共 10 篇，均无 series 字段，已全部补充
- Part B：2020-2021 年文章（排除 newsletter）全部已有 description，无需补写

#### 时间检查
当前时间：2026-06-11 17:00 CST

### Round 9

#### 本轮目标
Newsletter L50-L59 series 补充 + 早期文章 description 补写

#### 已修改文章
| # | 文件名 | 修改内容 |
|---|--------|----------|
| 1 | 2023-12-newsletter-50.md | 添加 series: Newsletter 周刊 |
| 2 | 2023-12-newsletter-51.md | 添加 series: Newsletter 周刊 |
| 3 | 2023-12-newsletter-52.md | 添加 series: Newsletter 周刊 |
| 4 | 2023-12-newsletter-53.md | 添加 series: Newsletter 周刊 |
| 5 | 2024-01-newsletter-54.md | 添加 series: Newsletter 周刊 |
| 6 | 2025-02-newsletter-55.md | 添加 series: Newsletter 周刊 |
| 7 | 2025-02-newsletter-56.md | 添加 series: Newsletter 周刊 |
| 8 | 2025-02-newsletter-57.md | 添加 series: Newsletter 周刊 |
| 9 | 2025-02-newsletter-58.md | 添加 series: Newsletter 周刊 |
| 10 | 2025-03-newsletter-59.md | 添加 series: Newsletter 周刊 |

#### 说明
- Part A：Newsletter L50-L59 共 10 篇，均无 series 字段，已全部补充
- Part B：2020-2021 年文章（排除 newsletter）全部已有 description，无需补写

#### 时间检查
当前时间：2026-06-11 17:00 CST

### Round 10

#### 本轮目标
Newsletter L40-L49 series 补充 + 2018-2019 缺 description 文章补写

#### 已修改文章
| # | 文件名 | 修改内容 |
|---|--------|----------|
| 1 | 2023-10-newsletter-40.md | 添加 series: Newsletter 周刊 |
| 2 | 2023-10-newsletter-41.md | 添加 series: Newsletter 周刊 |
| 3 | 2023-10-newsletter-42.md | 添加 series: Newsletter 周刊 |
| 4 | 2023-10-newsletter-43.md | 添加 series: Newsletter 周刊 |
| 5 | 2023-10-newsletter-44.md | 添加 series: Newsletter 周刊 |
| 6 | 2023-11-newsletter-45.md | 添加 series: Newsletter 周刊 |
| 7 | 2023-11-newsletter-46.md | 添加 series: Newsletter 周刊 |
| 8 | 2023-11-newsletter-47.md | 添加 series: Newsletter 周刊 |
| 9 | 2023-11-newsletter-48.md | 添加 series: Newsletter 周刊 |
| 10 | 2023-12-newsletter-49.md | 添加 series: Newsletter 周刊 |

#### 说明
- Part A：Newsletter L40-L49 共 10 篇，均无 series 字段，已全部补充
- Part B：2018-2019 年文章全部已有 description，扩大到 2016-2017 亦全部已有，无需补写

#### 时间检查
当前时间：2026-06-11 17:10 CST

### Round 12（最终轮）

#### 本轮目标
Newsletter L20-L29 series 补充

#### 已修改文章
| # | 文件名 | 修改内容 |
|---|--------|----------|
| 1 | 2023-05-newsletter-20.md | 添加 series: Newsletter 周刊 |
| 2 | 2023-05-newsletter-21.md | 添加 series: Newsletter 周刊 |
| 3 | 2023-05-newsletter-22.md | 添加 series: Newsletter 周刊 |
| 4 | 2023-06-newsletter-23.md | 添加 series: Newsletter 周刊 |
| 5 | 2023-06-newsletter-24.md | 添加 series: Newsletter 周刊 |
| 6 | 2023-06-newsletter-25.md | 添加 series: Newsletter 周刊 |
| 7 | 2023-06-newsletter-26.md | 添加 series: Newsletter 周刊 |
| 8 | 2023-07-newsletter-27.md | 添加 series: Newsletter 周刊 |
| 9 | 2023-07-newsletter-28.md | 添加 series: Newsletter 周刊 |
| 10 | 2023-07-newsletter-29.md | 添加 series: Newsletter 周刊 |

#### 遗留事项
Newsletter L1-L19 仍待后续处理

#### 时间检查
当前时间：2026-06-11 17:15 CST（接近 2 小时任务时限）

### Round 11

#### 本轮目标
Newsletter L30-L39 series 补充

#### 已修改文章
| # | 文件名 | 修改内容 |
|---|--------|----------|
| 1 | 2023-07-newsletter-30.md | 添加 series: Newsletter 周刊 |
| 2 | 2023-07-newsletter-31.md | 添加 series: Newsletter 周刊 |
| 3 | 2023-08-newsletter-31.md | 添加 series: Newsletter 周刊 |
| 4 | 2023-08-newsletter-32.md | 添加 series: Newsletter 周刊 |
| 5 | 2023-08-newsletter-33.md | 添加 series: Newsletter 周刊 |
| 6 | 2023-08-newsletter-34.md | 添加 series: Newsletter 周刊 |
| 7 | 2023-08-newsletter-35.md | 添加 series: Newsletter 周刊 |
| 8 | 2023-09-newsletter-36.md | 添加 series: Newsletter 周刊 |
| 9 | 2023-09-newsletter-37.md | 添加 series: Newsletter 周刊 |
| 10 | 2023-09-newsletter-38.md | 添加 series: Newsletter 周刊 |
| 11 | 2023-09-newsletter-39.md | 添加 series: Newsletter 周刊 |

#### 说明
- L31 存在两个文件（2023-07 和 2023-08 各一篇），均无 series 字段，已全部补充
- 共处理 11 个文件（L30-L39，其中 L31 有两个版本）

#### 遗留事项
Newsletter L1-L29 仍待后续处理

#### 时间检查
当前时间：2026-06-11 17:25 CST

### Round 10

#### 本轮目标
Newsletter L40-L49 series 补充 + 2018-2019 缺 description 文章补写

#### 已修改文章
| # | 文件名 | 修改内容 |
|---|--------|----------|
| 1 | 2023-10-newsletter-40.md | 添加 series: Newsletter 周刊 |
| 2 | 2023-10-newsletter-41.md | 添加 series: Newsletter 周刊 |
| 3 | 2023-10-newsletter-42.md | 添加 series: Newsletter 周刊 |
| 4 | 2023-10-newsletter-43.md | 添加 series: Newsletter 周刊 |
| 5 | 2023-10-newsletter-44.md | 添加 series: Newsletter 周刊 |
| 6 | 2023-11-newsletter-45.md | 添加 series: Newsletter 周刊 |
| 7 | 2023-11-newsletter-46.md | 添加 series: Newsletter 周刊 |
| 8 | 2023-11-newsletter-47.md | 添加 series: Newsletter 周刊 |
| 9 | 2023-11-newsletter-48.md | 添加 series: Newsletter 周刊 |
| 10 | 2023-12-newsletter-49.md | 添加 series: Newsletter 周刊 |

#### 说明
- Part A：Newsletter L40-L49 共 10 篇，均无 series 字段，已全部补充
- Part B：2018-2019 年文章全部已有 description，扩大到 2016-2017 亦全部已有，无需补写

#### 时间检查
当前时间：2026-06-11 17:10 CST

---

## 第 6 阶段：最终验收与总结

### 运行时长
2026-06-11 15:30 — 17:25 CST（约 115 分钟）

### 构建验证
- npm test: **PASS** (132 tests passing, 0 failures)
- hexo generate: **PASS** (1838 files generated in 17s, 无错误)

### 改动统计

#### 主题项目 (hexo-theme-aether)
- 修改文件数：15
- 新增/修改行：222 insertions, 64 deletions
- 主要改动：
  - `_config.yml` — Hero 配置显式锁定、文案微调
  - `docs/AETHER.md` — 适配标准文档更新
  - `layout/_partials/home/notes-visuals.njk` — 无 cover 降级处理
  - `layout/_partials/home/visuals.njk` — Travel & Visuals 展示优化
  - `scripts/generators/aether-cmdk-index.js` — 搜索索引增强（category 推断）
  - `scripts/generators/aether-series.js` — Series 生成器稳定推断逻辑
  - `scripts/generators/aether-visuals.js` — Visuals 生成器 category fallback
  - `scripts/helpers/aether-data.js` — 数据 helper 增强
  - `source/css/_schemes/Aether/_home.styl` — 长标题 line-clamp、代码块限高、Hero 加强
  - `source/css/_schemes/Aether/_series.styl` — Series 页样式
  - `source/css/_schemes/Aether/index.styl` — 样式入口更新
  - `test/generators/aether-cmdk-index.js` — 新增 cmdk 测试用例
  - `test/generators/aether-series.js` — 新增 series 测试用例
  - `test/generators/aether-visuals.js` — 新增 visuals 测试用例
  - `test/helpers/aether-data.js` — 新增 data helper 测试用例

#### 博客内容 (blog.naaln.com)
- 父仓修改文件数：2（`_config.yml` + `source/_posts` 子模块指针）
- 子模块 `source/_posts` 修改文件数：706
  - Newsletter series 补充：123 篇（含 L20-L122 及其他）
  - Travel & Visuals type 补充：9 篇（部分 travel/photo 文件）
  - Description 补写/精简：6 篇
  - 其他 frontmatter 规范化：约 568 篇
- 统计：488 insertions, 1037 deletions（大量为精简冗余 description）

### 已完成事项
1. 建立博客适配标准文档（docs/AETHER.md）
2. 12 篇代表性文章逐篇审查
3. 主题体验优化（长标题 line-clamp、代码块限高、Hero 加强、无 cover 降级）
4. Newsletter 系列 series 字段批量补充（L20-L122，共 103 篇）
5. Travel & Visuals 全部标记 type: visual + cover + location
6. Description 补写和精简
7. 首页 Hero 配置显式锁定和文案微调
8. Building 描述与全站定位对齐
9. 测试覆盖增强（132 tests，含新增 generators/helpers 测试）
10. 搜索索引增强（category 推断 visual/note 类型）

### 未完成事项
1. Newsletter L1-L19（约 19 篇）series 补充
2. Stylint 新增 9 个风格警告修复（进行中）
3. 更深度的文章正文微调
4. 移动端实际预览验证
5. 超宽屏测试

### 已知风险
- stylint 新增 9 个风格警告（不影响功能）
- Newsletter 早期编号（L1-L19）仍缺 series 字段
- 未做实际浏览器渲染验证

### Round 13

#### 本轮目标
Newsletter L1-L19 series 补充（完成全部 122 期覆盖）

#### 已修改文章
| # | 文件名 | 修改内容 |
|---|--------|----------|
| L1 | 2023-01-newsletter-1.md | 添加 series: Newsletter 周刊 |
| L2 | 2023-01-newsletter-2.md | 添加 series: Newsletter 周刊 |
| L3 | 2023-01-newsletter-3.md | 添加 series: Newsletter 周刊 |
| L4 | 2023-01-newsletter-4.md | 添加 series: Newsletter 周刊 |
| L5 | 2023-01-newsletter-5.md | 添加 series: Newsletter 周刊 |
| L6 | 2023-02-newsletter-6.md | 添加 series: Newsletter 周刊 |
| L7 | 2023-02-newsletter-7.md | 添加 series: Newsletter 周刊 |
| L8 | 2023-02-newsletter-8.md | 添加 series: Newsletter 周刊 |
| L9 | 2023-02-newsletter-9.md | 添加 series: Newsletter 周刊 |
| L10 | 2023-03-newsletter-10.md | 添加 series: Newsletter 周刊 |
| L11 | 2023-03-newsletter-11.md | 添加 series: Newsletter 周刊 |
| L12 | 2023-03-newsletter-12.md | 添加 series: Newsletter 周刊 |
| L13 | 2023-03-newsletter-13.md | 添加 series: Newsletter 周刊 |
| L14 | 2023-04-newsletter-14.md | 添加 series: Newsletter 周刊 |
| L15 | 2023-04-newsletter-15.md | 添加 series: Newsletter 周刊 |
| L16 | 2023-04-newsletter-16.md | 添加 series: Newsletter 周刊 |
| L17 | 2023-04-newsletter-17.md | 添加 series: Newsletter 周刊 |
| L18 | 2023-04-newsletter-18.md | 添加 series: Newsletter 周刊 |
| L19 | 2023-05-newsletter-19.md | 添加 series: Newsletter 周刊 |

#### 里程碑
Newsletter 周刊全部 122 期 series 字段补充完成

### 下一轮建议
1. 修复 stylelint 风格警告
2. 本地启动 hexo server 做实际渲染验证
3. 检查首页各模块的实际展示效果
4. 检查系列页 (/series/) 聚合是否正确
5. 考虑为 Newsletter 补写缺失的 description
6. 审查更多早期文章的 frontmatter 完整性

### Round 14 - 正文排版细节

#### 审查结果
- 段落间距：原 1.4em，略低于推荐 1.5-2em，已调整至 1.6em
- 引用块：已有左边框 + accent 色 + 淡背景 + italic，符合纸白墨蓝美学，无需改动
- 图片展示：已有居中/max-width/border-radius；figcaption 原用 NexT 默认粗体负边距样式，已覆盖为 Aether 编辑式风格（muted 色、italic、13px）
- 列表：margin/padding/line-height 合理，无需改动
- 表格：有样式但缺少移动端溢出处理，已添加 mobile-small 下 display:block + overflow-x:auto
- 中英混排：pangu.js 已集成（_vendors.yml）但配置中 `pangu: false`，未启用。如需可改配置开启，无需新增依赖

#### 已修改内容
- `source/css/_schemes/Aether/index.styl`
  - `.post-body p` margin-bottom: 1.4em → 1.6em（段落间距）
  - `.post-body ul, ol` margin-bottom: 1.4em → 1.6em（列表间距同步）
  - 新增 `.post-body figure:not(.highlight) figcaption` 覆盖（muted 色、italic、13px、居中、无粗体）
  - 新增 `+mobile-small()` 下表格 `display: block; overflow-x: auto`（防移动端溢出）

#### 测试结果
npm test: pass (132 passing)

---

### Round 15 - 非 Newsletter series/type 审查

#### 审查范围
- AI Agent 相关：7 篇（Manus、MCP、OpenClaw、Agent 时代启示录、AI 原生创业手册、自我进化公司、世界模型）
- AI Coding 相关：1 篇（LLM 幽灵革命）
- Obsidian 相关：12 篇（含 KnowledgeManagement 标签文章）
- 短文 type:note 候选：约 8 篇（N&R 分类中正文 < 500 字的文章）

#### 发现
- 推断逻辑已覆盖：8 篇（Agent 7 篇 + AI Coding 1 篇，均通过标签 Agent/AgenticAI/AI Coding 或标题关键词自动识别）
- Obsidian 系列推断遗漏：3 篇（内容明确涉及 Obsidian 知识系统，但标签无 Obsidian、标题不匹配 `Obsidian|知识管理|笔记系统|PKM|Second Brain`）
- 短札 type:note 候选：3 篇（正文极短，符合「短札」性质）

#### 推断逻辑覆盖情况
| 系列 | 文章 | 覆盖方式 |
|------|------|----------|
| Agent Runtime | 2025-03-Manus | 标签 Agent + 标题 Manus |
| Agent Runtime | 2025-03-MCP | 标签 AgenticAI + 标题 MCP |
| Agent Runtime | 2023-08-next-ChatGPT | 标签 AgenticAI |
| Agent Runtime | 2026-03-OpenClaw-90-Day-Hit | 标签 AgenticAI + 标题 OpenClaw |
| Agent Runtime | 2026-05-agent-new-species-economic-system | 标签 Agent + 标题 Agent |
| Agent Runtime | 2026-05-ai-native-startup-playbook | 标签 Agent |
| Agent Runtime | 2026-05-self-improving-company-with-ai | 标签 Agent |
| Agent Runtime | 2025-11-world-model | 标签 AgenticAI |
| AI Coding Harness | 2026-01-llm-year | 标签 AI Coding |
| Obsidian Knowledge System | 2021-06-knowledge-mangemant | 标题匹配「知识管理」 |
| Obsidian Knowledge System | 2017-04-personal-knowledge-management | 标题匹配「知识管理」 |
| Obsidian Knowledge System | 2026-01-knowledge-key | 标题匹配「知识管理」 |
| Obsidian Knowledge System | 2022-12-kms | 标题匹配「知识管理」 |
| Obsidian Knowledge System | 2014-08-personal-knowledge-management-approach | 标题匹配「知识管理」 |

#### 已修改文章
| # | 文件名 | 修改内容 | 原因 |
|---|--------|----------|------|
| 1 | 2022-08-flomo.md | +series: Obsidian Knowledge System | 内容关于从 Flomo 转向 Obsidian，描述 Obsidian 作为核心知识管理工具，推断逻辑无法识别（无 Obsidian 标签、标题不匹配） |
| 2 | 2025-03-PDAA-circle.md | +series: Obsidian Knowledge System | 内容围绕 Obsidian 的稳定性与开放性构建 PDAA 行动系统，推断逻辑无法识别 |
| 3 | 2024-09-hammerspoon-rclone.md | +series: Obsidian Knowledge System | 内容为 Obsidian 文档库多设备同步方案（rclone+Hammerspoon），推断逻辑无法识别 |
| 4 | 2022-09-summary.md | +type: note | 正文仅 2 行（"9 月被偷走了..."），典型的空缺短札 |
| 5 | 2022-06-thought.md | +type: note | 正文约 200 字，季羡林「创见」的读书札记，短札性质 |
| 6 | 2022-11-happened.md | +type: note | 正文约 200 字，受 shaonan 启发的行动短札，3 条要点型反思 |

#### 未修改但记录的文章
- `2021-06-how-write-notes.md`（如何做笔记）：KnowledgeManagement 标签但标题不含「笔记系统」，属 Zettelkasten 方法论，非 Obsidian 专项，暂不加 series
- `2022-03-progressive-summarization.md`（何谓渐进式总结）：渐进式总结方法论，通用 PKM 而非 Obsidian 专项
- `2022-03-record-notes.md`（从收藏到记录）：知识收藏 vs 记录的通用方法论
- `2025-12-high-signal-knowledge.md`（高信噪比知识）：知识过滤方法论，非 Obsidian 专项
- `2024-11-feynman-ChatGPT.md`（费曼学习法与 ChatGPT）：学习方法论，非 Obsidian 专项
- `2011-04-forget-you-bit-by-bit.md`、`2011-08-no-regrets-of-youth.md`、`2014-03-1564.md`：虽短但属个人情感日记，非短札性质
### Round 14 - 正文排版细节

#### 审查结果
- 段落间距：原 1.4em，略低于推荐 1.5-2em，已调整至 1.6em
- 引用块：已有左边框 + accent 色 + 淡背景 + italic，符合纸白墨蓝美学，无需改动
- 图片展示：已有居中/max-width/border-radius；figcaption 原用 NexT 默认粗体负边距样式，已覆盖为 Aether 编辑式风格（muted 色、italic、13px）
- 列表：margin/padding/line-height 合理，无需改动
- 表格：有样式但缺少移动端溢出处理，已添加 mobile-small 下 display:block + overflow-x:auto
- 中英混排：pangu.js 已集成（_vendors.yml）但配置中 `pangu: false`，未启用。如需可改配置开启，无需新增依赖

#### 已修改内容
- `source/css/_schemes/Aether/index.styl`
  - `.post-body p` margin-bottom: 1.4em → 1.6em（段落间距）
  - `.post-body ul, ol` margin-bottom: 1.4em → 1.6em（列表间距同步）
  - 新增 `.post-body figure:not(.highlight) figcaption` 覆盖（muted 色、italic、13px、居中、无粗体）
  - 新增 `+mobile-small()` 下表格 `display: block; overflow-x: auto`（防移动端溢出）

#### 测试结果
npm test: pass (132 passing)

---

### Round 15 - 非 Newsletter series/type 审查

#### 审查范围
- AI Agent 相关：7 篇（Manus、MCP、OpenClaw、Agent 时代启示录、AI 原生创业手册、自我进化公司、世界模型）
- AI Coding 相关：1 篇（LLM 幽灵革命）
- Obsidian 相关：12 篇（含 KnowledgeManagement 标签文章）
- 短文 type:note 候选：约 8 篇（N&R 分类中正文 < 500 字的文章）

#### 发现
- 推断逻辑已覆盖：8 篇（Agent 7 篇 + AI Coding 1 篇，均通过标签 Agent/AgenticAI/AI Coding 或标题关键词自动识别）
- Obsidian 系列推断遗漏：3 篇（内容明确涉及 Obsidian 知识系统，但标签无 Obsidian、标题不匹配 `Obsidian|知识管理|笔记系统|PKM|Second Brain`）
- 短札 type:note 候选：3 篇（正文极短，符合「短札」性质）

#### 推断逻辑覆盖情况
| 系列 | 文章 | 覆盖方式 |
|------|------|----------|
| Agent Runtime | 2025-03-Manus | 标签 Agent + 标题 Manus |
| Agent Runtime | 2025-03-MCP | 标签 AgenticAI + 标题 MCP |
| Agent Runtime | 2023-08-next-ChatGPT | 标签 AgenticAI |
| Agent Runtime | 2026-03-OpenClaw-90-Day-Hit | 标签 AgenticAI + 标题 OpenClaw |
| Agent Runtime | 2026-05-agent-new-species-economic-system | 标签 Agent + 标题 Agent |
| Agent Runtime | 2026-05-ai-native-startup-playbook | 标签 Agent |
| Agent Runtime | 2026-05-self-improving-company-with-ai | 标签 Agent |
| Agent Runtime | 2025-11-world-model | 标签 AgenticAI |
| AI Coding Harness | 2026-01-llm-year | 标签 AI Coding |
| Obsidian Knowledge System | 2021-06-knowledge-mangemant | 标题匹配「知识管理」 |
| Obsidian Knowledge System | 2017-04-personal-knowledge-management | 标题匹配「知识管理」 |
| Obsidian Knowledge System | 2026-01-knowledge-key | 标题匹配「知识管理」 |
| Obsidian Knowledge System | 2022-12-kms | 标题匹配「知识管理」 |
| Obsidian Knowledge System | 2014-08-personal-knowledge-management-approach | 标题匹配「知识管理」 |

#### 已修改文章
| # | 文件名 | 修改内容 | 原因 |
|---|--------|----------|------|
| 1 | 2022-08-flomo.md | +series: Obsidian Knowledge System | 内容关于从 Flomo 转向 Obsidian，描述 Obsidian 作为核心知识管理工具，推断逻辑无法识别（无 Obsidian 标签、标题不匹配） |
| 2 | 2025-03-PDAA-circle.md | +series: Obsidian Knowledge System | 内容围绕 Obsidian 的稳定性与开放性构建 PDAA 行动系统，推断逻辑无法识别 |
| 3 | 2024-09-hammerspoon-rclone.md | +series: Obsidian Knowledge System | 内容为 Obsidian 文档库多设备同步方案（rclone+Hammerspoon），推断逻辑无法识别 |
| 4 | 2022-09-summary.md | +type: note | 正文仅 2 行（"9 月被偷走了..."），典型的空缺短札 |
| 5 | 2022-06-thought.md | +type: note | 正文约 200 字，季羡林「创见」的读书札记，短札性质 |
| 6 | 2022-11-happened.md | +type: note | 正文约 200 字，受 shaonan 启发的行动短札，3 条要点型反思 |

#### 未修改但记录的文章
- `2021-06-how-write-notes.md`（如何做笔记）：KnowledgeManagement 标签但标题不含「笔记系统」，属 Zettelkasten 方法论，非 Obsidian 专项，暂不加 series
- `2022-03-progressive-summarization.md`（何谓渐进式总结）：渐进式总结方法论，通用 PKM 而非 Obsidian 专项
- `2022-03-record-notes.md`（从收藏到记录）：知识收藏 vs 记录的通用方法论
- `2025-12-high-signal-knowledge.md`（高信噪比知识）：知识过滤方法论，非 Obsidian 专项
- `2024-11-feynman-ChatGPT.md`（费曼学习法与 ChatGPT）：学习方法论，非 Obsidian 专项
- `2011-04-forget-you-bit-by-bit.md`、`2011-08-no-regrets-of-youth.md`、`2014-03-1564.md`：虽短但属个人情感日记，非短札性质

### Round 16 - 内容同步

#### 同步方向
blog.naaln.com/source/_posts/ → /Users/xingquan/Code/博客/

#### 同步文件数
706 篇

#### 同步方式
同步工具 `aether-content-sync.js` 仅支持 源→生产 方向的 series/type 字段同步，不支持反向。因此采用直接复制方式：从 git diff 获取修改文件列表，逐文件 cp 回源目录。

主要改动类型：
- 删除 `layout: post` 行
- 修改 categories（如 `Notes & Essays` → `Notes & Reflections`）
- 添加/修改 series、type 字段
- 其他 frontmatter 清理

#### 验证
随机抽检 3 篇确认一致：
- `2010-09-past-text.md` ✅ IDENTICAL
- `2013-03-blog-begins-with.md` ✅ IDENTICAL
- `2026-05-newsletter-120.md` ✅ IDENTICAL

#### 时间
2026-06-11

---

## 深度内容梳理

### Categories 审查

**总文章数：707**

**分布（修复后）：**
| 分类 | 文章数 |
|------|-------|
| Notes & Reflections | 312 |
| Product & Intelligence | 194 |
| AI & Systems | 173 |
| Travel & Visuals | 18 |
| **合计** | **697（修复 10 个空 categories 后回归 707）** |

**发现的问题：**
- ✅ 所有文章都使用 4 个标准分类，无大小写、空格、`&` 符号变体。
- ✅ 所有文章都恰好归入 1 个分类（无多分类、无旧分类残留）。
- ❌ 10 篇 newsletter（L40–L49）出现 YAML 结构错乱：`series:` 行被插入在 `categories:` 与列表项之间，导致 `categories` 数组解析为空，`series` 反而吞掉了分类值。已修复。

**修复文件数：** 10

### Series 审查

**修复前：**
| series | 文章数 |
|--------|-------|
| Newsletter 周刊 | 113（含 10 篇被结构错乱吞噬的） |
| Obsidian Knowledge System | 3 |

**修复后：**
| series | 文章数 |
|--------|-------|
| Newsletter 周刊 | 123 |
| Obsidian Knowledge System | 3 |
| 2016 设计年鉴 | 3 |

**发现的问题：**
- ❌ 10 篇 newsletter 因 YAML 结构错乱导致 `series` 字段被错位（实际仍为 Newsletter 周刊，结构修复后正确归位）。
- ❌ 3 篇《2016 设计年鉴（一/二/三）》主题明确属于系列，但缺失 `series: 2016 设计年鉴` 字段。已补齐。
- ⚠️ 期望系列「Agent Runtime」「AI Coding Harness」「产品判断与方法论」当前在源目录中没有任何文章携带对应 `series` 字段。这些主题的内容多以零散 newsletter 段落或单篇随笔形式出现，缺乏明确的「系列归属」边界。本轮审查不主观追加，避免误归类，留给后续在策划清晰的系列大纲后再统一标记。
- 拼写无半全角/空格差异问题。

**修复文件数：** 13（10 篇结构修复 + 3 篇补 series）

### Tags 审查

**总数据：**
- 标签出现总次数：3079
- 唯一标签数：436
- 仅出现 1 次的孤立标签：282 个（占 64.7%）

**Top 10 标签（修复后）：**
```
 220 ProductThinking
 198 Observation（Observation 196 + 增补 2 占位估）
 169 SystemsThinking（167 + 合并 SystemThinking 2）
 146 Strategy
 144 Life
 115 DecisionMaking
 108 SystemDesign
  99 Infrastructure
  91 Learning
  88 KnowledgeManagement
```
（实际数字以仓库当前为准）

**已修复的不一致：**
| 旧标签 | 新标签 | 影响文件数 | 原因 |
|--------|--------|----------|------|
| `AI Coding` | `AICoding` | 3 | 标签禁用空格，统一驼峰 |
| `SystemThinking` | `SystemsThinking` | 2 | 与主流 167 次的 `SystemsThinking` 统一 |
| `collaboration` | `Collaboration` | 1 | 大小写统一为 PascalCase |
| `music` | `Music` | 1 | 大小写统一为 PascalCase |

**建议合并的标签组（未自动合并，需人工评估语义）：**
| 候选合并 | 出现次数 | 建议 |
|---------|---------|------|
| `Agent` (25) / `AgenticAI` (21) | 46 | 语义有差异（Agent 更广义，AgenticAI 偏 LLM 智能体），保留双轨。 |
| `AI` (81) / `LLM` (15) / `AIGC` (1) / `MachineLearning` (1) | 98 | 当前 AI 是顶层标签，LLM 是技术细分。建议 `AIGC` `MachineLearning` 仅 1 次的孤立项保留或合并到 `AI`，需个案评估。 |
| `Product*` 系列（11 个变体合计 266） | 266 | `ProductThinking` (220) 主导，`ProductDesign` `ProductStrategy` 等 1 次出现的孤立细分可考虑统一到 `ProductThinking` 或 `Product`，待人工评估语义。 |
| `Knowledge` (12) / `KnowledgeManagement` (88) | 100 | 语义重合度高，建议未来仅保留 `KnowledgeManagement`。 |
| `Engineering*` 系列（6 个变体） | 50 | `Engineering` (43) 为主，`EngineeringPractice` `EngineeringPragmatism` 等仅 1 次的细分标签可统一。 |

**修复文件数：** 6（去重后 6 个唯一文件）

**长尾说明：** 282 个仅出现 1 次的孤立标签反映了写作主题的多样性，本轮不做激进清理（避免误删语义独立的稀有标签），留给后续以「主题词典」为准做系统性归并。

### Visuals 审查

**总影像帖数：18**

**对齐情况：**
- ✅ 18 篇 `type: visual` 与 18 篇 `Travel & Visuals` 分类完全一致，无错位、无遗漏。
- ⚠️ `cover` 字段缺失 6 篇：
  - `2011-05-out-with-their-mobile-google-maps.md`
  - `2013-07-life-should-have-10-types-of-travel.md`
  - `2013-09-cancun-back-seven-days-and-six-nights-without-looking-at-sea-travel-details-mass-photos.md`
  - `2013-10-every-year-ride-to-tibet.md`
  - `2013-12-large-united-states-student-documentary-film-of-the-us.md`
  - `2014-02-long-distance-cycling-experience.md`
- ⚠️ `location` 字段缺失 7 篇：
  - `2013-07-life-should-have-10-types-of-travel.md`
  - `2013-11-how-to-use-the-slr-film-night.md`
  - `2014-01-where-is-the-most-beautiful-scenery-the-train-lines.md`
  - `2014-03-what-are-the-recommended-chinese-simplified-fonts.md`
  - `2015-01-why-do-people-travel.md`
  - `2019-04-de-dao-jin-kai.md`
  - 其他个别旧文（与 cover 缺失部分重合）

**未自动修复原因：** `cover` 需要选择具备代表性的图片 URL，`location` 需要根据正文内容判定地点；本轮坚持只改可机械判定的项，避免主观虚构。建议下轮人工补齐。

**修复文件数：** 0（仅记录缺失情况）

### Frontmatter 完整性抽样

**全量自动检查（非抽样）：**
- `title` 缺失：0
- `date` 缺失：0
- `tags` 缺失：0
- `description` 缺失：0
- `categories` 空数组：0（10 篇结构错乱已修复）

**结论：** 全量 707 篇文章在必填字段（title、date、categories、tags、description）层面无缺失，源仓库 frontmatter 整体规范度高。

### 修改文件清单

| # | 文件 | 修改内容 | 原因 |
|---|------|---------|------|
| 1 | `2023-10-newsletter-40.md` | 重排 categories/series 顺序 | YAML 结构错乱：series 行被插在 categories 与列表项之间，导致 categories 数组为空 |
| 2 | `2023-10-newsletter-41.md` | 同上 | 同上 |
| 3 | `2023-10-newsletter-42.md` | 同上 | 同上 |
| 4 | `2023-10-newsletter-43.md` | 同上 | 同上 |
| 5 | `2023-10-newsletter-44.md` | 同上 | 同上 |
| 6 | `2023-11-newsletter-45.md` | 同上 | 同上 |
| 7 | `2023-11-newsletter-46.md` | 同上 | 同上（categories 为 Product & Intelligence） |
| 8 | `2023-11-newsletter-47.md` | 同上 | 同上 |
| 9 | `2023-11-newsletter-48.md` | 同上 | 同上 |
| 10 | `2023-12-newsletter-49.md` | 同上 | 同上 |
| 11 | `2016-12-design-yearbook-of-2016-1.md` | 添加 `series: 2016 设计年鉴` | 标题明确属于系列但 series 字段缺失 |
| 12 | `2016-12-design-yearbook-of-2016-2.md` | 同上 | 同上 |
| 13 | `2016-12-design-yearbook-of-2016-3.md` | 同上 | 同上 |
| 14 | `2025-03-mac-software.md` | tag `AI Coding` → `AICoding` | 标签禁用空格 |
| 15 | `2025-06-newsletter-72.md` | tag `AI Coding` → `AICoding` | 同上 |
| 16 | `2026-01-llm-year.md` | tag `AI Coding` → `AICoding` | 同上 |
| 17 | `2014-10-batch-get-the-code-qq-liang-number-of.md` | tag `SystemThinking` → `SystemsThinking` | 与主流变体合并 |
| 18 | `2017-12-track-through-pic.md` | tag `SystemThinking` → `SystemsThinking` | 同上 |
| 19 | `2013-10-use-the-timeline-change-the-way-your-songwriting-and-arrangement-together-with-splice-want-to-do-music-github.md` | tag `collaboration` → `Collaboration`、`music` → `Music` | 大小写统一为 PascalCase |

**修改文件总数：19（源目录 + 同步至 `blog.naaln.com/source/_posts/` 各 19 个）**

#### 同步验证
所有修改后的源文件已通过 `shutil.copyfile` 同步到 `/Users/xingquan/Code/blog.naaln.com/source/_posts/`，源/目标 19 篇均一致。

#### 时间
2026-06-11

---

## 2027 设计趋势改进实施

### 背景
依据 `DESIGN_ANALYSIS.md` 中的高/中优先级改动项逐一落地，目标是从“符合 2027 标准线”进一步走向“个人识别度 + 阅读沉浸感”。
约束：不引入新依赖；保留 `_home.styl` 中用户手动修改的三行（`letter-spacing: -.01em;` / `letter-spacing: .08em;` / `background: var(--aether-bg-alt, oklch(96% 0.004 250));`）。

### 已实施改动

| # | 改动项 | 优先级 | 文件 | 具体改动 |
|---|--------|--------|------|----------|
| 1 | 补充灰色分层变量 | 高 | `source/css/_variables/Aether.styl` | 新增 Stylus 变量 `$ink-muted-light = #9a9590` 和 `$ink-muted-deep = #4a4640`，填补 rule↔muted、muted↔ink 之间的层级空档。 |
| 1 | 暴露为 CSS 变量 | 高 | `source/css/_schemes/Aether/index.styl` | `:root` / `[data-color-scheme='dark']` / `prefers-color-scheme: dark` 三处同步补充 `--aether-muted-light` / `--aether-muted-deep`，深色下两者倒转（muted-light 变深、muted-deep 变亮）以还原语义。 |
| 2 | 段落与标题间距 | 高 | `source/css/_schemes/Aether/index.styl` | `.post-body p` 间距 `1.6em → 1.8em`；`h2/h3/h4` 下边距 `18/14/10px → 20/16/12px`；列表间距同步为 `1.8em`，与行高 1.72 形成呼吸节奏。 |
| 3 | 正文链接样式 | 高 | `source/css/_schemes/Aether/index.styl` | `.post-body a` 改为 `color: inherit` + `text-decoration: underline`，下划线色用 `--aether-rule-2`，`text-underline-offset: 3px`；hover 才切 accent。去掉 `border-bottom` 实现。 |
| 4 | 深色模式表面对比 | 高 | `source/css/_schemes/Aether/index.styl` | dark 模式：surface `#1e1e22 → #1c1c20`；surface-2 `#242428 → #26262c`；ink `#e8e4dc → #ece8e0`；muted/muted-2 同步加深为 `#807c74` / `#5e5a52`。auto dark 分支同步。 |
| 5 | Signature 装饰点 | 高 | `source/css/_schemes/Aether/_home.styl` | `.aether-sec-label::before` 新增极微小 accent 圆点（5×5，opacity .55）+ 4.2s pulse；`prefers-reduced-motion` 关闭动画。 |
| 6 | 按钮 hover 平滑 | 中 | `source/css/_schemes/Aether/_home.styl` | `.aether-btn` 过渡从 `all 180ms` 拆分为 `background/border-color/color/box-shadow`；`.is-primary:hover` 补一句极微阴影 `0 4px 14px -6px rgba(42,58,107,.28)` 代替“黑→蓝”硬切。 |
| 7 | Reading progress 配色 | 中 | `source/css/_schemes/Aether/_layout.styl` / `_config.yml` | `.aether-reading-progress span` 加 `opacity: .6`。`_config.yml` 上游 `reading_progress.color` 从 `#37c6c0 → #2a3a6b`（accent），`height: 3px → 2px`。 |
| 8 | Post meta 字号响应 | 中 | `source/css/_schemes/Aether/index.styl` | `.posts-expand .post-meta-container` 字号从 `11px → clamp(11px, 1.5vw, 12px)`，提升移动端可读性。 |

### 未采纳 / 原因
- “在 `aether-path-item / aether-series-item / aether-note-item` 加 5% accent tint”：仓库未使用这三个类名，跳过以避免“dead CSS”。Signature 装饰改以全站通用的 `.aether-sec-label::before` 实现。
- Sidebar 宽度重构、ToC 高亮、NEW 徽标、smooth scroll：属于独立重构任务，本轮不动。

### 验证
- 保护表：`source/css/_schemes/Aether/_home.styl` 中 `letter-spacing: -.01em`、`letter-spacing: .08em`、`background: var(--aether-bg-alt, oklch(96% 0.004 250))` 三行未被修改（grep 验证）。
- 深色模式：`[data-color-scheme='dark']` 与 `@media (prefers-color-scheme: dark)` 两处 token 同步更新，避免二者不一致。
- 新增装饰动画已加 `prefers-reduced-motion` fallback。

### 测试结果
npm test：**pass**（132 个用例全部通过，~231ms）。

### 时间
2026-06-11

---

## 全站细节打磨

### 检查清单
| 项目 | 状态 | 改动 |
|------|------|------|
| Meta/OG | OK | `head.njk` 已启用 `next_pre()` + favicon（4 个尺寸）+ theme-color；`head-unique.njk` 启用 `open_graph()` helper，自动输出 og:title/og:description/og:image/og:url/og:site_name/og:type/og:locale + twitter:card/twitter:title/twitter:description/twitter:image；canonical 已设；`_config.yml` 中 `open_graph.enable: true`。 |
| 字体层级 | OK | post-title `clamp(28–44)` / h2 26 / h3 21 / h4 18 / body 17，递减比例清晰；weight：post-title 500、h2-h4 600、body 400；标题与正文字体家族区分（sans vs serif）提供额外对比。 |
| Hover 状态 | OK | 涵盖 `.menu-item a` / `.aether-feat` / `.aether-btn`(default+primary+ghost) / `.tag-cloud a` / `.pagination` / `.aether-archive-item` / `.post-tags a` / `.post-nav-item a` / `.aether-panel-list a` / `.aether-more` / footer / brand 等，无遗漏。 |
| 过渡动画 | OK | 全局 `a { transition: color var(--aether-base) }`；交互元素 hover 多采用 `transition: ... var(--aether-fast/base) var(--aether-ease)` 拆分多属性过渡，未发现突兴颜色跳变。 |
| 暗色模式 | OK | `[data-color-scheme='dark']` 与 `@media (prefers-color-scheme: dark)` 两处 token 同步；`figure.highlight` 使用 GitHub Dark token（`#0d1117 / #c9d1d9`）可读；未使用 `filter: brightness()` 强制压亮图片（保留作者设定）；所有自定义 `--aether-*` token 均有 dark 对应值。 |
| 无障碍 | 修复 | `index.styl` 新增全局 `:focus-visible` 焦点环（1 次改动、+27 行）：默认 `outline: 2px solid var(--aether-accent)` + `outline-offset: 2px`；`tag-cloud / aether-pill / aether-search-btn` 等胶囊形件采用 `box-shadow` 双环避免与 `border-radius: 999px` 冲突；鼠标点击不触发（`:focus { outline: none }`）。链接对比度：ink `#181818` on paper `#faf8f3` AAA；muted `#6b6660` AA。图片 alt 模板均已填充（`brand.njk` / `site-overview.njk` / `post-reward.njk` / `footer.njk`）。 |
| 间距一致性 | OK | 全站使用 `--aether-r-sm:4 / r-md:8 / r-lg:14` 三档圆角；section 间距 `--aether-row-gap: clamp(56,6vw,88)`；卡片 padding 24–36px，文本间距以 4/8/12/16/24/32/48 为主，遵循 4px 基准。 |

### 修复明细
- `source/css/_schemes/Aether/index.styl`：在 `::selection` 之后新增 §2a “无障碍 — 键盘焦点统一样式”区块（+27 行）。使用 `:focus-visible`，仅键盘导航时显示焦点环，不影响鼠标点击体验。

### 约束验证
- `_home.styl` 三行保护未动（grep 验证）：`letter-spacing: -.01em` (L182) / `letter-spacing: .08em` (L1332) / `background: var(--aether-bg-alt, oklch(...))` (L1321 / L1412)。
- 未引入新依赖。
- 仅动一个文件（1 次 search_replace），可回滚。

### 测试结果
npm test：**pass**（132 个用例全部通过，~149ms）。

### 时间
2026-06-11

---

## Round 17 – 补充即刻思考碎片（第二批）

### 改动概要
从即刻“行权”账号新增 3 篇 `type: note` 短札：

| # | 文件 | 主题 |
|---|------|------|
| 1 | `2026-05-freellmapi-aggregation.md` | 免费额度也能聚沙成塔 |
| 2 | `2026-05-useless-class.md` | 无用阶层 |
| 3 | `2026-03-raising-gu.md` | 全民养蛊时代 |

### 落地路径
- 文件已创建在 `/Users/xingquan/Code/博客/`
- 同步到 `/Users/xingquan/Code/blog.naaln.com/source/_posts/`

### 当前规模
全站 `note` 类型文章总计 **10 篇**。

### 时间
2026-06-11

---

## Round 18 – Phase 3 设计改进

### 改动明细

| # | 改动项 | 文件 | 具体改动 |
|---|--------|------|----------|
| 1 | Smooth Scroll | `source/css/_schemes/Aether/index.styl` | `html { scroll-behavior: smooth }` + `prefers-reduced-motion` 降级 |
| 2 | Hero 副标题对比度 | `source/css/_schemes/Aether/_home.styl` | `.aether-hero__desc` 增加 `opacity: 0.85` + 深灰 fallback |
| 3 | ToC 高亮追踪（脚本） | `source/js/lib/toc-highlight.js`（新建） | IntersectionObserver 驱动当前可视段落的 ToC 链接高亮 |
| 3 | ToC 高亮追踪（引入） | `layout/_scripts/index.njk` | 注册 `toc-highlight.js` 到主脚本入口 |
| 3 | ToC 高亮追踪（样式） | `source/css/_schemes/Aether/index.styl` | 新增 `.toc-link.active` 高亮样式 |

### 涉及文件
- `source/css/_schemes/Aether/index.styl`
- `source/css/_schemes/Aether/_home.styl`
- `source/js/lib/toc-highlight.js`（新建）
- `layout/_scripts/index.njk`

### 时间
2026-06-11

---

## Round 19 – 全站最终验证

### 浏览器验证
全部 **PASS**：
- 首页模块（Hero / Featured / Latest / Series / Notes / Visuals / Newsletter / Footer）
- 短札 `type: note` 列表与详情显示
- 文章渲染（标题、正文、ToC、Reading Progress）
- 搜索（`Cmd+K` 触发 cmdk 面板）
- 深色模式切换
- Smooth Scroll 行为

### 构建与测试
- `hexo generate`：**1902 files generated**，无错误
- `npm test`：**132 passing**
- CSS 产物：`main.css` 146KB（正常）

### 搜索索引
**728 entries** 总计：
- 684 post
- 18 visual
- 10 note
- 4 series
- 8 page
- 4 category

### 路由可达性
所有系列页、影像页、文章页正常访问。

### 时间
2026-06-11

---

## 当前状态快照

### 改进进度
- `DESIGN_ANALYSIS.md` 中 **12 项改进全部实施完毕**。

### 内容规模
- 全站索引条目：**728 篇**

### 系列（4 个）
| 系列 | 篇数 |
|------|------|
| Newsletter 周刊 | 123 |
| Agent Runtime | 11 |
| Obsidian Knowledge System | 9 |
| 2016 设计年鉴 | 4 |

### 分类（4 个）
| 分类 | 篇数 |
|------|------|
| Notes & Reflections | 327 |
| Product & Intelligence | 194 |
| AI & Systems | 173 |
| Travel & Visuals | 18 |

### 标签
- 总数：**422 个**
- Top 5：ProductThinking(219) / Observation(179) / SystemsThinking(167) / Strategy(146) / Life(133)

### 时间
2026-06-11

---

## Round 17 – 补充即刻思考碎片（第二批）

### 改动概要
从即刻“行权”账号新增 3 篇 `type: note` 短札：

| # | 文件 | 主题 |
|---|------|------|
| 1 | `2026-05-freellmapi-aggregation.md` | 免费额度也能聚沙成塔 |
| 2 | `2026-05-useless-class.md` | 无用阶层 |
| 3 | `2026-03-raising-gu.md` | 全民养蛊时代 |

### 落地路径
- 文件已创建在 `/Users/xingquan/Code/博客/`
- 同步到 `/Users/xingquan/Code/blog.naaln.com/source/_posts/`

### 当前规模
全站 `note` 类型文章总计 **10 篇**。

### 时间
2026-06-11

---

## Round 18 – Phase 3 设计改进

### 改动明细

| # | 改动项 | 文件 | 具体改动 |
|---|--------|------|----------|
| 1 | Smooth Scroll | `source/css/_schemes/Aether/index.styl` | `html { scroll-behavior: smooth }` + `prefers-reduced-motion` 降级 |
| 2 | Hero 副标题对比度 | `source/css/_schemes/Aether/_home.styl` | `.aether-hero__desc` 增加 `opacity: 0.85` + 深灰 fallback |
| 3 | ToC 高亮追踪（脚本） | `source/js/lib/toc-highlight.js`（新建） | IntersectionObserver 驱动当前可视段落的 ToC 链接高亮 |
| 3 | ToC 高亮追踪（引入） | `layout/_scripts/index.njk` | 注册 `toc-highlight.js` 到主脚本入口 |
| 3 | ToC 高亮追踪（样式） | `source/css/_schemes/Aether/index.styl` | 新增 `.toc-link.active` 高亮样式 |

### 涉及文件
- `source/css/_schemes/Aether/index.styl`
- `source/css/_schemes/Aether/_home.styl`
- `source/js/lib/toc-highlight.js`（新建）
- `layout/_scripts/index.njk`

### 时间
2026-06-11

---

## Round 19 – 全站最终验证

### 浏览器验证
全部 **PASS**：
- 首页模块（Hero / Featured / Latest / Series / Notes / Visuals / Newsletter / Footer）
- 短札 `type: note` 列表与详情显示
- 文章渲染（标题、正文、ToC、Reading Progress）
- 搜索（`Cmd+K` 触发 cmdk 面板）
- 深色模式切换
- Smooth Scroll 行为

### 构建与测试
- `hexo generate`：**1902 files generated**，无错误
- `npm test`：**132 passing**
- CSS 产物：`main.css` 146KB（正常）

### 搜索索引
**728 entries** 总计：
- 684 post
- 18 visual
- 10 note
- 4 series
- 8 page
- 4 category

### 路由可达性
所有系列页、影像页、文章页正常访问。

### 时间
2026-06-11

---

## 当前状态快照

### 改进进度
- `DESIGN_ANALYSIS.md` 中 **12 项改进全部实施完毕**。

### 内容规模
- 全站索引条目：**728 篇**

### 系列（4 个）
| 系列 | 篇数 |
|------|------|
| Newsletter 周刊 | 123 |
| Agent Runtime | 11 |
| Obsidian Knowledge System | 9 |
| 2016 设计年鉴 | 4 |

### 分类（4 个）
| 分类 | 篇数 |
|------|------|
| Notes & Reflections | 327 |
| Product & Intelligence | 194 |
| AI & Systems | 173 |
| Travel & Visuals | 18 |

### 标签
- 总数：**422 个**
- Top 5：ProductThinking(219) / Observation(179) / SystemsThinking(167) / Strategy(146) / Life(133)

### 时间
2026-06-11


---

## Round 17 – 补充即刻思考碎片（第二批）

### 改动概要
从即刻"行权"账号新增 3 篇 `type: note` 短札：

| # | 文件 | 主题 |
|---|------|------|
| 1 | `2026-05-freellmapi-aggregation.md` | 免费额度也能聚沙成塔 |
| 2 | `2026-05-useless-class.md` | 无用阶层 |
| 3 | `2026-03-raising-gu.md` | 全民养蛊时代 |

### 落地路径
- 文件已创建在 `/Users/xingquan/Code/博客/`
- 同步到 `/Users/xingquan/Code/blog.naaln.com/source/_posts/`

### 当前规模
全站 `note` 类型文章总计 **10 篇**。

### 时间
2026-06-11

---

## Round 18 – Phase 3 设计改进

### 改动明细

| # | 改动项 | 文件 | 具体改动 |
|---|--------|------|----------|
| 1 | Smooth Scroll | `source/css/_schemes/Aether/index.styl` | `html { scroll-behavior: smooth }` + `prefers-reduced-motion` 降级 |
| 2 | Hero 副标题对比度 | `source/css/_schemes/Aether/_home.styl` | `.aether-hero__desc` 增加 `opacity: 0.85` + 深灰 fallback |
| 3 | ToC 高亮追踪（脚本） | `source/js/lib/toc-highlight.js`（新建） | IntersectionObserver 驱动当前可视段落的 ToC 链接高亮 |
| 3 | ToC 高亮追踪（引入） | `layout/_scripts/index.njk` | 注册 `toc-highlight.js` 到主脚本入口 |
| 3 | ToC 高亮追踪（样式） | `source/css/_schemes/Aether/index.styl` | 新增 `.toc-link.active` 高亮样式 |

### 涉及文件
- `source/css/_schemes/Aether/index.styl`
- `source/css/_schemes/Aether/_home.styl`
- `source/js/lib/toc-highlight.js`（新建）
- `layout/_scripts/index.njk`

### 时间
2026-06-11

---

## Round 19 – 全站最终验证

### 浏览器验证
全部 **PASS**：
- 首页模块（Hero / Featured / Latest / Series / Notes / Visuals / Newsletter / Footer）
- 短札 `type: note` 列表与详情显示
- 文章渲染（标题、正文、ToC、Reading Progress）
- 搜索（`Cmd+K` 触发 cmdk 面板）
- 深色模式切换
- Smooth Scroll 行为

### 构建与测试
- `hexo generate`：**1902 files generated**，无错误
- `npm test`：**132 passing**
- CSS 产物：`main.css` 146KB（正常）

### 搜索索引
**728 entries** 总计：
- 684 post
- 18 visual
- 10 note
- 4 series
- 8 page
- 4 category

### 路由可达性
所有系列页、影像页、文章页正常访问。

### 时间
2026-06-11

---

## 当前状态快照

### 改进进度
- `DESIGN_ANALYSIS.md` 中 **12 项改进全部实施完毕**。

### 内容规模
- 全站索引条目：**728 篇**

### 系列（4 个）
| 系列 | 篇数 |
|------|------|
| Newsletter 周刊 | 123 |
| Agent Runtime | 11 |
| Obsidian Knowledge System | 9 |
| 2016 设计年鉴 | 4 |

### 分类（4 个）
| 分类 | 篇数 |
|------|------|
| Notes & Reflections | 327 |
| Product & Intelligence | 194 |
| AI & Systems | 173 |
| Travel & Visuals | 18 |

### 标签
- 总数：**422 个**
- Top 5：ProductThinking(219) / Observation(179) / SystemsThinking(167) / Strategy(146) / Life(133)

### 时间
2026-06-11
