# 工作台待办模块用户手册设计

## 背景

当前文档站是 VuePress 2 + `vuepress-theme-hope`。工作台入口已经调整为 `src/workbench/README.md`，侧边栏使用 `/workbench: "structure"` 自动读取文件结构。待办模块目录为 `src/workbench/todo/`，目前需要补齐面向普通用户的使用手册。

目标项目是 `/Users/xiaou/code/utools/todo/u-todo-pro`，产品名为“优秀待办”。待办功能实现主要分布在 `src/views/TaskList`、`src/components/Tasks`、`src/views/FourQuadrant`、`src/views/CalendarView`、`src/widgets/TaskListWidget` 等位置。截图优先通过该项目内的 `utools-browser-preview` skill 从本地浏览器预览获取。

## 目标

- 只完善待办模块用户手册，不编写其他工作台模块文档。
- 在 `src/workbench/todo/` 下建立“模块首页 + 多个子页面”的结构。
- 使用普通用户能理解的语言说明功能入口、使用步骤、适用场景和注意事项。
- 为关键页面配置截图；如果截图流程失败，允许先保留空截图占位，由用户后续补图。
- 遵循现有文档站写法：Markdown 文件放在 `src` 下，图片使用相对路径，排序通过 frontmatter 控制。

## 非目标

- 不修改目标项目 `/Users/xiaou/code/utools/todo/u-todo-pro` 的源码行为。
- 不编写开发文档、架构说明或 MCP 接口说明。
- 不补齐工作台下除待办以外的模块。
- 不调整 Theme Hope 全局主题、样式或插件配置，除非正式实施时发现侧边栏无法展示待办目录且必须补最小配置。

## 页面结构

待办模块文档放在 `src/workbench/todo/`：

| 文件 | 目标 |
| --- | --- |
| `README.md` | 待办模块总览、核心能力、推荐阅读路径 |
| `task-list.md` | 创建、编辑、完成、删除、恢复任务，以及任务详情入口 |
| `view-mode.md` | 列表、网格、四象限、日历视图的用途和切换方式 |
| `group-tag-filter.md` | 分组、标签、筛选、搜索的使用方式 |
| `remind-repeat-subtask.md` | 提醒、重复任务、子任务 |
| `widget.md` | 待办小组件、快捷查看和快捷切换 |

`src/workbench/README.md` 作为工作台总览暂不展开其他模块，只在必要时保留到待办模块的入口链接。

## 内容边界

每个子页面遵循统一结构：

- 功能简介：说明该页解决什么问题。
- 使用步骤：用短步骤描述用户操作。
- 典型场景：说明什么时候应该使用该功能。
- 注意事项：说明限制、前置条件或容易误解的点。
- 截图：优先引用 `./image/<name>.png`。

首次出现的专业术语需要解释。正文避免使用开发视角，例如组件名、服务名、接口名只在必要时作为内部确认来源，不出现在用户手册正文中。

## 截图策略

截图目录为 `src/workbench/todo/image/`。

拟定截图文件：

| 文件 | 用途 |
| --- | --- |
| `todo-overview.png` | 待办主界面，用于模块首页 |
| `task-list.png` | 任务列表和创建入口 |
| `view-mode.png` | 视图切换入口或典型视图 |
| `group-tag-filter.png` | 左侧分组、标签、筛选区域 |
| `remind-repeat-subtask.png` | 任务详情或创建面板中的时间、提醒、重复、子任务区域 |
| `widget.png` | 小组件页面或小组件入口 |

截图流程：

1. 在目标项目运行 `npm run dev:prod -- --host 127.0.0.1`。
2. 打开 `http://127.0.0.1:4100/#/taskList`。
3. 按 `utools-browser-preview` skill 注入最小可用的 `window.utools` / Electron stub。
4. 使用浏览器截图保存到文档站图片目录。
5. 如果某张截图无法稳定生成，创建空占位文件或在 Markdown 中保留明确的图片引用，后续由用户替换。

普通浏览器预览不是完整 uTools runtime。真实窗口、小组件独立窗口、系统通知、后台提醒触发等行为如果无法验证，只写用户可理解的说明，不把它们描述为已截图验证。

## Theme Hope 规则

- 新增页面使用 frontmatter 设置 `title`、`order`，目录首页可设置 `dir.order`。
- 不手动编辑 `.cache`、`.temp` 或构建产物。
- 不修改全局主题配置，除非待办目录无法通过当前 `/workbench: "structure"` 被侧边栏发现。
- 图片使用相对路径，例如 `![](./image/task-list.png)`。

## 验证计划

- 静态检查：确认 Markdown frontmatter 有效、图片路径存在或有占位文件。
- 结构检查：确认 `src/workbench/todo/README.md` 和子页面能被结构侧边栏读取。
- 文档预览：运行文档站本地预览，访问 `/workbench/todo/` 和子页面。
- 截图检查：确认引用的截图文件位于 `src/workbench/todo/image/`。

## 已知限制

- 截图可能受普通浏览器 stub 环境限制，失败时保留空占位。
- 待办真实数据依赖本地环境，截图内容可能是空列表或演示数据。
- 本次只处理待办用户手册，不处理其他工作台模块的信息架构。
