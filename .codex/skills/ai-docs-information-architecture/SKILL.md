---
name: ai-docs-information-architecture
description: Use when planning ai-docs sections, routes, page hierarchy, navigation, sidebar grouping, redirects, indexes, or documentation taxonomy before writing pages
---

# AI Docs Information Architecture

## Overview

信息架构（Information Architecture，组织内容让读者可找到、可理解、可行动的方法）决定文档是否可维护。Theme Hope 的结构化侧边栏让文件树和 frontmatter 成为目录系统的事实来源，因此新内容必须先确定栏目、路由、索引页和排序。

## When to Use

- Adding a new section, directory, landing page, or top-level documentation category.
- Moving pages, splitting long pages, merging duplicated pages, or changing sidebar/navbar.
- Deciding where a new AI workflow, reference, tutorial, troubleshooting page, or configuration page belongs.
- Designing docs for a new product area before writing content.

Do not use for single-paragraph copyedits that do not affect structure.

## Current Project Model

| Element | Current State |
| --- | --- |
| Docs root | `src` |
| Home route | `src/README.md` -> `/` |
| Main section | `src/getting-started/` -> `/getting-started/` |
| Navbar | `/` and `快速入门` in `src/.vuepress/navbar.ts` |
| Sidebar | Root sidebar with `getting-started/` group and `children: "structure"` |
| Ordering | Page frontmatter `order`; folder groups use `dir.order` in `README.md` |

Do not manually list every page in the sidebar while `children: "structure"` is the chosen convention.

## Route Rules

| File | Route |
| --- | --- |
| `src/README.md` | `/` |
| `src/foo.md` | `/foo.html` |
| `src/foo/README.md` | `/foo/` |
| `src/foo/bar.md` | `/foo/bar.html` |

Use `README.md` for every directory that needs a landing page. Avoid orphan pages that are not linked from a section index or sidebar.

## Placement Decision

| Content Type | Preferred Location |
| --- | --- |
| First-run setup, commands, platform basics | Existing `src/getting-started/` |
| Repeatable AI coding workflow | A workflow page under the most relevant section |
| Configuration reference | A reference/config page, not buried in tutorial prose |
| Troubleshooting | A symptom-driven troubleshooting page |
| Quick lookup | A quick-reference page or table inside an existing reference page |
| Opinionated best practice | Best-practices page with scope and tradeoffs |
| One-off announcement | Usually not a durable doc; avoid adding unless explicitly requested |

If content has more than one natural home, choose the reader's first question, then cross-link from secondary locations.

## Section Design Checklist

Before creating or moving pages:

- Define the primary reader and task.
- List the pages needed for a minimal complete section.
- Choose `README.md` content: overview, page map, recommended reading path, and links.
- Assign route-friendly file names in English kebab-case, e.g. `project-setup.md`.
- Assign stable `order` values with gaps, e.g. 10, 20, 30, so future pages can fit between.
- Choose one category name per section unless the page clearly belongs to multiple categories.
- Decide whether the top-level section needs navbar exposure.
- Decide whether sidebar should be structure-generated or manually curated.

## Navbar Strategy

- Top-level navbar is for primary reader journeys only.
- Keep labels short and Chinese.
- Use object format when page title is too long or icon needs override.
- Use dropdowns for secondary collections instead of crowding the top bar.
- Use root-relative links such as `/getting-started/`.

## Sidebar Strategy

- Use `children: "structure"` for file-tree-owned sections.
- Use frontmatter `order` for page order.
- Use frontmatter `index: false` to exclude pages from sidebar/catalog.
- Use directory `README.md` frontmatter `dir` for group metadata:

```md
---
title: 工作流
icon: route
dir:
  order: 20
  text: 工作流
  icon: route
  collapsible: true
  expanded: false
---
```

- Put more specific sidebar object keys before fallback `/` when using multiple sidebars.

## Page Splitting Rules

Split a page when:

- It serves two different reader intents.
- It has more than one independent workflow.
- It mixes reference tables with tutorial steps and becomes hard to scan.
- It needs different validation or troubleshooting sections.
- It would force deep heading nesting beyond `###`.

Keep a page together when:

- The sections are sequential steps in one workflow.
- Splitting would create tiny pages with no independent purpose.
- The page is a quick reference intentionally designed as a compact index.

## Common Mistakes

| Mistake | Fix |
| --- | --- |
| Adding content to the first plausible page | Check reader task and section map first. |
| Creating a directory without `README.md` | Add a landing page or use a single `.md` page instead. |
| Duplicating navbar and sidebar responsibilities | Navbar chooses journeys; sidebar exposes local hierarchy. |
| Using `order` without gaps | Use increments such as 10 to leave insertion space. |
| Moving pages without fixing links | Search old paths and update relative links. |
| Treating generated `dist` routes as source | Edit `src` and rebuild. |

## Official Anchors

- Theme Hope project content and routes: https://theme-hope.vuejs.press/get-started/content.html
- Theme Hope project structure: https://theme-hope.vuejs.press/get-started/structure.html
- Navbar guide: https://theme-hope.vuejs.press/guide/layout/navbar.html
- Sidebar guide: https://theme-hope.vuejs.press/guide/layout/sidebar.html
