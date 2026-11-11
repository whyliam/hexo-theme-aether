# Aether 设计规范

更新日期：2026-11-11。适用于 `scheme: Aether`。本文是当前规范；`design/archive/` 中的趋势、配置和改造日志属于历史资料。

## 定位与信息架构

以长期阅读为主，使用苔绿、雾白、衬线标题与局部玻璃材质。文字与链接立即可用；动效用于装饰和指针反馈，不阻塞内容。

首页顺序：作者介绍 → 最近更新（默认 3 篇）→ 精选阅读 → 长期系列 → 短札与影像 → 订阅渠道。内容由真实文章及站点配置组合，主题不固定站点作者、文章数或精选标题。

- 介绍使用左文右书页；手机上下排列并缩短装饰区域。
- 最近更新采用统一文章行，首篇仅通过“最新发布”标记区分。
- 精选路径按阅读意图组织；一个显式指定的系列作为重点，其余使用轻量条目。
- 归档、分类和标签页共享文章行与年份分组，长标题自然换行。
- 长文、图片和列表保持稳定阅读面；玻璃主要用于导航、重点系列及少数操作容器。

## 颜色

主题颜色由 `_liquid-glass.styl` 统一：首页和内页共享语义变量，`_home-polish.styl` 补充材质与首页交互。基础 NexT 变量不代表 Aether 的最终颜色。

| Token | 浅色 | 深色 |
| --- | --- | --- |
| 页面 `--aether-paper` | `#f5f8f6` | `#101815` |
| 表面 `--aether-surface` | `#fbfdfc` | `#18251f` |
| 主文字 `--aether-ink` | `#18251f` | `#eaf2ed` |
| 次级文字 `--aether-ink-2` | `#30453a` | `#d0dfd5` |
| 辅助文字 `--aether-muted` | `#53665b` | `#acbfb2` |
| 强调 `--aether-accent` | `#345b4b` | `#a8d2bb` |
| 强调底 `--aether-accent-tint` | `#e1ede5` | `#243c2f` |
| 分隔 `--aether-rule` | `#d3dfd7` | `#354c3e` |

透明材质须检查实际底图上的可读性；已有实色 token 对比度不能代替透明背景的验收。

## 字体与布局

| 项目 | 桌面 | 手机 |
| --- | --- | --- |
| 作者姓名 | 原有衬线栈，40–58px | 36px |
| 模块标题 | 衬线，27px | 24px |
| 首页文章标题 | 衬线，23px | 21px |
| 摘要与辅助说明 | Sans，14px，行高 1.75 | 同左 |
| 日期与元信息 | 12px，行高 1.6 | 同左 |
| 外框 | 最大 1180px | 自适应 |
| 首页内容 | 外框内水平 50px | 水平 20px |
| 长文正文 | 最大 720px | 自适应 |

标题左对齐。网格使用 `minmax(0, 1fr)`，子项允许收缩。日期与期号不得挤占标题主要宽度；摘要可截断，正文和归档标题不截断。767px 为首页单列断点，导航在更宽的窄屏范围切换为可展开菜单。

## 交互与材质

- 紧凑主要操作目标至少 44px；键盘焦点使用实线，立即反馈。
- 颜色反馈使用 120–180ms；键盘动作不等待动画。
- liquidGL 使用窄边缘折射和低强度流体响应；关闭自主游动高光、倾斜和色散。后台释放 GPU 实例。CSS 回退高光在鼠标操作时调度，稳定后停止。
- 高光装饰层不接收指针事件，不移动正文与导航文字。
- 减少动态时关闭流体响应，减少透明度时使用实体表面。GPU 和脚本不可用时保留 CSS 材质与交互。
- Hero 书页保持独立的设备能力判断。玻璃使用本地 liquidGL，原生内容不参与 GPU 重绘。

## 实现入口

| 职责 | 文件 |
| --- | --- |
| 模块顺序 | `layout/index.njk` |
| 年份分组 / 共享文章行 | `scripts/helpers/aether-data.js` / `layout/_macro/aether-archive.njk` |
| 全站玻璃与内页 | `source/css/_schemes/Aether/_liquid-glass.styl` |
| 首页阅读结构 | `source/css/_schemes/Aether/_reading-home.styl` |
| 首页精修 | `_home-polish.styl` |
| 材质与实例生命周期 | `_glass-material.styl` / `source/js/aether-liquid.js` |
| 书页与回退 | `source/js/aether-organic.js` / `aether-organic-scene.mjs` |
| 搜索与焦点 | `source/js/aether-cmdk.js` |

## 验收

1. 320、390、768、1440px 下检查浅深色、长标题、空内容与缺图；无页面横向溢出。
2. 键盘可操作导航和搜索，关闭后恢复焦点；菜单展开状态与 `aria-expanded` 一致。
3. 系列数量与年份来自内容，分页不改变分类/标签总数；年份容器在每组循环中独立闭合。
4. 检查减少动态、减少透明度及静态书页回退；实际核验图片解码与目标链接。
5. ESLint、测试、`curlylint --include .njk layout` 与 Hexo 构建通过。

设计参考：[frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design)、[emil-design-eng](https://github.com/emilkowalski/skills)、[gradient-backdrops](https://github.com/nonlineartom/gradient-backdrops)、[liquidGL](https://github.com/naughtyduk/liquidGL)。具体历史验收见 [首页精修记录](https://github.com/whyliam/hexo-theme-aether/tree/master/docs/design/homepage-polish.md) 和 [玻璃材质记录](https://github.com/whyliam/hexo-theme-aether/tree/master/docs/design/liquid-glass.md)。

## liquidGL rendering

Aether bundles liquidGL v3.0.0 locally at commit `88f681ab7035fd55b04f63edff1841e32c4199e9`; see `source/js/vendor/liquidGL.README.md` for attribution. Explicit targets cover navigation, search, series cards, subscription panels and theme buttons. Native DOM content stays above the optical layer. Specular animation, tilt, dragging and chromatic aberration are disabled; reduced motion also disables fluid interaction.

`appearance.glass.enable` controls the integration; `pointer` controls fluid interaction. Surface and opacity configure tint. Legacy blur/saturation/reflection/rim/follow_duration settings apply to the CSS fallback. Reduced transparency uses solid surfaces. Opening search adds its own lenses without recapturing the navigation under the backdrop; closing search destroys those lenses. Theme changes and PJAX invalidate snapshots.

| Before | After | Why |
| --- | --- | --- |
| Broad grey navigation bevel | Narrow optical edge and restrained shadow | Keep the navigation light and text dominant |
| Background text visible through search | Nearly opaque reading surface over a blurred backdrop | Separate search results from the page behind them |
| Uniform material density | Separate navigation, card and dialog density | Match transparency to reading demands |
| Weak active controls in dark mode | Pale green primary control with dark text | Keep action hierarchy clear in both themes |
| Square mobile icon surfaces | Circular controls with preserved hit targets | Match the rounded navigation without changing its layout |
