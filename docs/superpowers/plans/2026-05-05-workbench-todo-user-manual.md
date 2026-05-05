# Workbench Todo User Manual Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a multi-page Chinese user manual for the “优秀待办” todo module under `src/workbench/todo/`.

**Architecture:** Keep the work scoped to VuePress Markdown content and static images. `src/workbench/todo/README.md` is the todo module index, and each child page explains one user workflow with screenshots or blank image placeholders.

**Tech Stack:** VuePress 2, `vuepress-theme-hope`, Markdown frontmatter, local image assets, optional browser preview through the target project's `utools-browser-preview` skill.

---

## File Structure

- Create `src/workbench/todo/README.md`: todo module landing page, reading path, feature overview.
- Create `src/workbench/todo/task-list.md`: task creation, editing, completion, deletion, restore.
- Create `src/workbench/todo/view-mode.md`: list, grid, quadrant, calendar view usage.
- Create `src/workbench/todo/group-tag-filter.md`: groups, tags, filters, search.
- Create `src/workbench/todo/remind-repeat-subtask.md`: reminder, recurring task, subtask.
- Create `src/workbench/todo/widget.md`: todo widget and quick operations.
- Create `src/workbench/todo/image/.gitkeep`: keep image directory present before screenshots are available.
- Create or update screenshot files under `src/workbench/todo/image/`: `todo-overview.png`, `task-list.png`, `view-mode.png`, `group-tag-filter.png`, `remind-repeat-subtask.png`, `widget.png`.
- Modify `src/workbench/README.md` only if the todo index needs a clear link from the workbench landing page. Do not document other workbench modules.

## Implementation Notes

- All prose must be Simplified Chinese.
- Keep code identifiers, routes, commands, and filenames in original language.
- Use Theme Hope frontmatter: `title`, `order`, and `dir.order` where relevant.
- Use relative image paths such as `![](./image/task-list.png)`.
- If browser screenshots fail, create blank placeholder PNG files with the planned filenames so Markdown image links do not break.
- Do not modify `/Users/xiaou/code/utools/todo/u-todo-pro` source code.
- Treat existing staged changes in this repository as user-owned. Do not revert or include them in commits unless the task explicitly touches the same files.

---

### Task 1: Create Todo Manual Page Skeleton

**Files:**
- Create: `src/workbench/todo/README.md`
- Create: `src/workbench/todo/task-list.md`
- Create: `src/workbench/todo/view-mode.md`
- Create: `src/workbench/todo/group-tag-filter.md`
- Create: `src/workbench/todo/remind-repeat-subtask.md`
- Create: `src/workbench/todo/widget.md`
- Create: `src/workbench/todo/image/.gitkeep`

- [ ] **Step 1: Add the todo module index**

Create `src/workbench/todo/README.md` with:

```markdown
---
title: 待办
order: 1
dir:
  order: 1
---

# 待办

待办模块用于集中管理日常任务、项目事项和有明确时间要求的工作。你可以在这里创建任务、拆分子任务、设置提醒、按分组或标签整理任务，并在不同视图中查看当前安排。

![](./image/todo-overview.png)

## 适合哪些场景

- 记录今天必须完成的事项，避免临时任务被遗忘。
- 将项目拆成多个任务，并用分组保持上下文清晰。
- 使用标签标记优先级、场景或协作对象，方便后续筛选。
- 为有截止时间的任务设置提醒或重复规则。
- 用四象限和日历视图安排不同节奏的工作。

## 推荐阅读路径

1. 先阅读 [任务列表](./task-list.md)，了解如何创建和处理任务。
2. 再阅读 [视图模式](./view-mode.md)，选择适合自己的任务查看方式。
3. 如果任务变多，继续阅读 [分组、标签与筛选](./group-tag-filter.md)。
4. 对有时间要求的任务，阅读 [提醒、重复任务与子任务](./remind-repeat-subtask.md)。
5. 需要在桌面快速查看任务时，阅读 [待办小组件](./widget.md)。

## 功能入口

在优秀待办工作台中，点击左侧菜单的“任务”即可进入待办模块。进入后，左侧用于切换分类、分组、标签和筛选条件，右侧用于查看和处理当前任务列表。
```

- [ ] **Step 2: Add `task-list.md` skeleton**

Create `src/workbench/todo/task-list.md` with:

```markdown
---
title: 任务列表
order: 2
---

# 任务列表

任务列表是处理待办事项的主要区域。你可以在这里新建任务、查看任务详情、标记完成、删除任务，也可以从已完成或回收站中继续查看历史任务。

![](./image/task-list.png)

## 新建任务

1. 进入左侧菜单的“任务”。
2. 在任务输入区域填写任务标题。
3. 根据需要补充时间、标签、分组或更多设置。
4. 确认后，任务会出现在当前分类或分组中。

## 编辑任务

点击任务进入详情区域后，可以修改任务标题、描述、时间、标签、优先级等信息。适合在任务从一句话变成具体执行计划时使用。

## 完成任务

完成任务时，点击任务前的勾选区域。任务会进入已完成状态，后续可以在已完成分类中查看。

## 删除与恢复

不再需要的任务可以删除。删除后的任务会进入回收站类目，误删时可以从回收站中找回。

## 使用建议

- 临时想到的事项先快速创建，稍后再补充分组和标签。
- 项目任务建议放入对应分组，避免和日常待办混在一起。
- 已完成任务可以保留一段时间，用于回顾工作进度。
```

- [ ] **Step 3: Add `view-mode.md` skeleton**

Create `src/workbench/todo/view-mode.md` with:

```markdown
---
title: 视图模式
order: 3
---

# 视图模式

同一批任务可以用不同视图查看。视图模式用于改变任务的呈现方式，不会改变任务本身。

![](./image/view-mode.png)

## 列表视图

列表视图适合快速处理任务。它按当前分类、分组或筛选条件展示任务，适合日常清单式管理。

## 网格视图

网格视图适合在任务较多时快速浏览重点事项。相比列表视图，它更强调任务卡片之间的视觉区分。

## 四象限视图

四象限视图会按重要程度和紧急程度组织任务。它适合做优先级判断，帮助你先处理重要且紧急的任务。

## 日历视图

日历视图按日期展示任务，适合安排有明确开始时间、截止时间或周期节奏的事项。

## 切换建议

- 处理当天任务时优先使用列表视图。
- 梳理优先级时切换到四象限视图。
- 安排本周或本月任务时使用日历视图。
```

- [ ] **Step 4: Add `group-tag-filter.md` skeleton**

Create `src/workbench/todo/group-tag-filter.md` with:

```markdown
---
title: 分组、标签与筛选
order: 4
---

# 分组、标签与筛选

当任务数量变多后，可以用分组、标签和筛选条件把任务整理成更容易查看的范围。

![](./image/group-tag-filter.png)

## 分组

分组适合表示项目、长期主题或固定工作区。例如“产品迭代”“学习计划”“家庭事务”。把任务放进分组后，可以在左侧分组中快速切换。

## 标签

标签适合表示任务的临时属性，例如“高优先级”“等待回复”“外出处理”。一个任务可以拥有多个标签。

## 筛选

筛选用于按条件查看任务，例如只看某类任务、某个时间范围内的任务或符合特定状态的任务。

## 搜索

当你记得任务标题或关键词时，可以使用搜索快速定位任务。搜索适合查找历史任务或跨分组查找内容。

## 使用建议

- 用分组表达“任务属于哪里”。
- 用标签表达“任务有什么特征”。
- 用筛选表达“现在只想看哪一批任务”。
```

- [ ] **Step 5: Add `remind-repeat-subtask.md` skeleton**

Create `src/workbench/todo/remind-repeat-subtask.md` with:

```markdown
---
title: 提醒、重复任务与子任务
order: 5
---

# 提醒、重复任务与子任务

提醒、重复任务和子任务用于处理更复杂的任务。它们分别解决“不想忘记”“周期执行”和“拆分执行”的问题。

![](./image/remind-repeat-subtask.png)

## 设置提醒

为任务设置提醒后，系统会在指定时间提醒你处理。它适合会议、截止时间、定时检查等不能错过的事项。

## 设置重复任务

重复任务适合固定周期出现的事项，例如每周复盘、每月缴费、每天习惯打卡。设置重复规则后，不需要每次手动重新创建。

## 使用子任务

子任务用于把较大的任务拆成多个更小的步骤。适合执行链路较长、需要逐步完成的任务。

## 使用建议

- 只给真正需要提醒的任务设置提醒，避免通知过多。
- 周期性事项优先使用重复任务，而不是手动复制任务。
- 超过三步才能完成的事项，建议拆成子任务。
```

- [ ] **Step 6: Add `widget.md` skeleton**

Create `src/workbench/todo/widget.md` with:

```markdown
---
title: 待办小组件
order: 6
---

# 待办小组件

待办小组件用于在主窗口之外快速查看和处理任务。它适合需要持续关注当天任务，但不想频繁打开完整工作台的场景。

![](./image/widget.png)

## 适合什么时候使用

- 工作时希望任务列表保持在桌面附近。
- 只需要快速查看、勾选或切换任务视图。
- 希望减少打开完整应用窗口的次数。

## 常见操作

在小组件中可以查看待办任务，并根据界面提供的按钮进行快捷切换或处理。具体可用操作会随当前版本和窗口状态变化。

## 使用建议

- 小组件适合做快速查看，不适合长时间编辑复杂任务内容。
- 需要补充详细描述、子任务或重复规则时，建议回到完整待办页面处理。
```

- [ ] **Step 7: Keep the image directory in git**

Create `src/workbench/todo/image/.gitkeep` as an empty file.

- [ ] **Step 8: Verify files exist**

Run:

```bash
find src/workbench/todo -maxdepth 2 -type f | sort
```

Expected output includes:

```text
src/workbench/todo/README.md
src/workbench/todo/group-tag-filter.md
src/workbench/todo/image/.gitkeep
src/workbench/todo/remind-repeat-subtask.md
src/workbench/todo/task-list.md
src/workbench/todo/view-mode.md
src/workbench/todo/widget.md
```

- [ ] **Step 9: Commit**

Run:

```bash
git add src/workbench/todo/README.md src/workbench/todo/task-list.md src/workbench/todo/view-mode.md src/workbench/todo/group-tag-filter.md src/workbench/todo/remind-repeat-subtask.md src/workbench/todo/widget.md src/workbench/todo/image/.gitkeep
git commit -m "docs: add todo manual structure"
```

---

### Task 2: Capture Screenshots Or Create Blank Placeholders

**Files:**
- Create: `src/workbench/todo/image/todo-overview.png`
- Create: `src/workbench/todo/image/task-list.png`
- Create: `src/workbench/todo/image/view-mode.png`
- Create: `src/workbench/todo/image/group-tag-filter.png`
- Create: `src/workbench/todo/image/remind-repeat-subtask.png`
- Create: `src/workbench/todo/image/widget.png`

- [ ] **Step 1: Start the target app dev server**

Run in `/Users/xiaou/code/utools/todo/u-todo-pro`:

```bash
npm run dev:prod -- --host 127.0.0.1
```

Expected: Vite prints a local URL using port `4100`, usually `http://127.0.0.1:4100/`.

If sandbox blocks the port with `listen EPERM`, rerun the same command with escalation.

- [ ] **Step 2: Open the task route with browser stubs**

Use the target project's `utools-browser-preview` workflow:

```text
http://127.0.0.1:4100/#/taskList
```

Inject the skill's minimal `window.utools`, Electron, filesystem, and IPC browser stubs before page load.

Expected: The real app renders the workbench with the “任务” route active, not just Vite devtools.

- [ ] **Step 3: Save available screenshots**

Capture screenshots into these exact paths:

```text
/Users/xiaou/code/web/utools/u-plugin-doc/src/workbench/todo/image/todo-overview.png
/Users/xiaou/code/web/utools/u-plugin-doc/src/workbench/todo/image/task-list.png
/Users/xiaou/code/web/utools/u-plugin-doc/src/workbench/todo/image/view-mode.png
/Users/xiaou/code/web/utools/u-plugin-doc/src/workbench/todo/image/group-tag-filter.png
/Users/xiaou/code/web/utools/u-plugin-doc/src/workbench/todo/image/remind-repeat-subtask.png
/Users/xiaou/code/web/utools/u-plugin-doc/src/workbench/todo/image/widget.png
```

Minimum screenshot expectations:

```text
todo-overview.png: main todo page with sidebar and task area
task-list.png: task input or task list area
view-mode.png: visible view switcher or a representative task view
group-tag-filter.png: left sidebar with group, tag, or filter sections
remind-repeat-subtask.png: task detail, creation controls, or time/reminder-related UI
widget.png: widget route or visible widget entry point
```

- [ ] **Step 4: Create blank placeholders for failed screenshots**

For any screenshot that cannot be captured, create a valid blank PNG with the same filename. Use a 1200x720 white image so VuePress does not show broken image links.

Recommended command from repository root:

```bash
sips -s format png --resampleHeightWidth 720 1200 src/workbench/image/cover.png --out src/workbench/todo/image/todo-overview.png
```

If `sips` is unavailable, use any available image tool to create valid PNG files with these exact names. Do not leave broken references in Markdown.

- [ ] **Step 5: Verify image files exist**

Run:

```bash
find src/workbench/todo/image -maxdepth 1 -type f | sort
```

Expected output includes:

```text
src/workbench/todo/image/group-tag-filter.png
src/workbench/todo/image/remind-repeat-subtask.png
src/workbench/todo/image/task-list.png
src/workbench/todo/image/todo-overview.png
src/workbench/todo/image/view-mode.png
src/workbench/todo/image/widget.png
```

- [ ] **Step 6: Commit**

Run:

```bash
git add src/workbench/todo/image
git commit -m "docs: add todo manual screenshots"
```

---

### Task 3: Polish User Manual Content

**Files:**
- Modify: `src/workbench/todo/README.md`
- Modify: `src/workbench/todo/task-list.md`
- Modify: `src/workbench/todo/view-mode.md`
- Modify: `src/workbench/todo/group-tag-filter.md`
- Modify: `src/workbench/todo/remind-repeat-subtask.md`
- Modify: `src/workbench/todo/widget.md`

- [ ] **Step 1: Ensure every page has a user-oriented structure**

For each Markdown page, ensure it contains:

```markdown
---
title: 页面标题
order: 页面排序
---

# 页面标题

一段说明该页面解决的问题。

![](./image/对应图片.png)

## 使用步骤或主要功能

面向用户的说明。

## 适用场景

说明何时使用。

## 注意事项

说明限制、前置条件或容易误解的点。
```

Expected: No page uses internal component names such as `TaskView`、`ExtensionManager`、`TaskListWidget.vue` in user-facing prose.

- [ ] **Step 2: Add cross-links between related pages**

Add links where they help navigation:

```markdown
如果你刚开始使用，建议先阅读 [任务列表](./task-list.md)。
```

```markdown
如果任务数量较多，可以结合 [分组、标签与筛选](./group-tag-filter.md) 管理。
```

```markdown
如果任务有明确时间要求，可以继续阅读 [提醒、重复任务与子任务](./remind-repeat-subtask.md)。
```

Expected: The index links to all child pages, and child pages link only to directly relevant pages.

- [ ] **Step 3: Add terminology explanations**

Ensure first mentions explain these terms in plain Chinese:

```text
四象限视图：按重要程度和紧急程度划分任务的视图。
重复任务：按固定周期自动生成或延续的任务。
子任务：把一个大任务拆出来的较小执行步骤。
标签：给任务添加的特征标记，可用于筛选。
分组：承载任务的项目或主题空间。
```

Expected: Explanations appear naturally in relevant pages, without a dense glossary unless the page needs it.

- [ ] **Step 4: Remove unsupported claims**

Search content for claims that require real runtime confirmation:

```bash
rg -n "一定|自动弹出|系统通知|后台|所有|任意|完整支持" src/workbench/todo
```

For each match, keep it only if the behavior was confirmed in the target app or visible in screenshots. Otherwise rewrite to bounded wording such as:

```markdown
在支持的环境中，提醒会按你设置的时间触发。
```

Expected: The manual does not overstate behavior that normal browser preview cannot verify.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/workbench/todo
git commit -m "docs: polish todo user manual"
```

---

### Task 4: Verify VuePress Build And Routes

**Files:**
- Read: `package.json`
- Read: `src/.vuepress/sidebar.ts`
- Read: `src/workbench/todo/*.md`

- [ ] **Step 1: Run Markdown and path sanity checks**

Run:

```bash
rg -n "!\[.*\]\((?!\.\/image\/)" src/workbench/todo
```

Expected: No output. All todo manual images should use `./image/...`.

Run:

```bash
find src/workbench/todo/image -maxdepth 1 -type f | sort
```

Expected: All referenced image files exist.

- [ ] **Step 2: Build the docs site**

Run from repository root:

```bash
pnpm docs:build
```

Expected: VuePress completes successfully without broken Markdown or route errors.

If dependencies are missing or the command cannot access package manager cache due to sandbox restrictions, rerun with the required approval and record the limitation.

- [ ] **Step 3: Preview key routes**

Run:

```bash
pnpm docs:dev -- --host 127.0.0.1
```

Open:

```text
http://127.0.0.1:<printed-port>/workbench/todo/
http://127.0.0.1:<printed-port>/workbench/todo/task-list.html
http://127.0.0.1:<printed-port>/workbench/todo/view-mode.html
http://127.0.0.1:<printed-port>/workbench/todo/group-tag-filter.html
http://127.0.0.1:<printed-port>/workbench/todo/remind-repeat-subtask.html
http://127.0.0.1:<printed-port>/workbench/todo/widget.html
```

Expected: Each route renders with page title, body content, and no broken images.

- [ ] **Step 4: Capture final status**

Run:

```bash
git status --short
```

Expected: Only intentional user-owned pre-existing changes remain, or a clean tree for files touched by this plan.

- [ ] **Step 5: Commit verification fixes if needed**

If verification required changes, run:

```bash
git add src/workbench/todo
git commit -m "docs: fix todo manual verification issues"
```

If no changes were required, do not create an empty commit.

---

## Self-Review

- Spec coverage: The plan creates the requested module homepage and child pages under `src/workbench/todo/`, includes screenshot or blank placeholder handling, keeps other workbench modules out of scope, and verifies VuePress routes.
- Placeholder scan: The plan does not use unresolved placeholders. Blank screenshot files are an approved fallback behavior from the spec.
- Type and path consistency: All Markdown paths, image paths, route paths, and filenames are consistent across tasks.
