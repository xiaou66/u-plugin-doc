---
name: ai-docs-writing
description: Use when creating, rewriting, expanding, localizing, or reorganizing Markdown documentation pages in the ai-docs VuePress site
---

# AI Docs Writing

## Overview

本项目是中文 AI 实践文档站，运行在 VuePress 2 与 VuePress Theme Hope 上。写作目标是形成可长期维护、可检索、可验证的文档页，而不是一次性聊天记录、营销稿或松散笔记。

## When to Use

- Adding or editing `src/**/*.md`.
- Turning source material,官方文档、课程笔记、经验总结或调研结果 into structured docs.
- Reorganizing headings, examples, links, frontmatter, categories, tags, or article flow.
- Converting English source material to Simplified Chinese docs while preserving commands and identifiers.

Do not use for config-only changes; use `ai-docs-theme-hope`. Do not invent facts; use `ai-docs-research` first when external behavior, CLI flags, versions, APIs, or product claims are involved.

## Document Contract

| Item | Rule |
| --- | --- |
| Audience | 先说明读者是谁、已经知道什么、想完成什么。 |
| Scope | 明确本文解决什么，不解决什么；避免无边界泛化。 |
| Outcome | 读者读完后应能执行一个流程、做出一个判断或查到一组规则。 |
| Evidence | 外部事实要有来源；不确定内容要标注未知点或验证方法。 |
| Maintainability | 内容按概念、步骤、配置、验证、排障拆分，便于未来增补。 |

## Frontmatter

每个正常文档页都应包含 YAML frontmatter（文件顶部 `---` 包裹的页面配置）：

```md
---
title: 页面标题
icon: lightbulb
order: 10
category:
  - 快速入门
---
```

| Field | Rule |
| --- | --- |
| `title` | 简短中文标题，应与第一个 `#` 标题一致，除非导航需要短标题。 |
| `shortTitle` | 仅当导航、侧边栏、面包屑需要更短文本时使用。 |
| `description` | 面向搜索和分享，说明页面价值，不堆关键词。 |
| `icon` | 使用当前 `fa6-solid:` 前缀下的短名，例如 `gear`、`rocket`。 |
| `order` | 控制 `children: "structure"` 侧边栏排序；正数靠前，负数靠后。 |
| `category` | 与栏目语义一致，避免每页随意新增分类。 |
| `tag` | 仅用于可检索主题，不把标题词机械重复为标签。 |
| `index: false` | 仅用于不应进入结构化侧边栏或目录的页面。 |
| `sidebar: false` | 仅用于明确不显示侧边栏的页面。 |

`README.md` 是目录索引页。目录分组行为要在该目录的 `README.md` 里用 `dir` 配置，不要在普通页面里伪造分组。

## Writing Pattern

1. Inspect nearby pages before writing; match tone, heading depth, frontmatter, icon style, and link style.
2. Define audience, prerequisites, outcome, and boundaries before drafting.
3. Start with the reader problem, then give the shortest actionable path.
4. Use compact tables for commands, options, comparisons, matrices, and quick references.
5. Split long procedures into prerequisites, steps, verification, rollback, and troubleshooting.
6. Explain specialist terms on first use, following `术语（中文全称 + 简单解释）`.
7. Keep commands, config keys, package names, code identifiers, logs, and errors in their original language.
8. Use relative local links like `./settings.md`; use full external URLs for external references.

## Page Patterns

| Page Type | Required Structure |
| --- | --- |
| 入门页 | 适用读者、前置条件、最小路径、下一步链接、常见误区。 |
| 配置页 | 配置位置、字段表、示例、默认行为、边界条件、验证方式。 |
| 工作流页 | 目标、输入、步骤、检查点、失败处理、可复用模板。 |
| 参考页 | 速查表、分类索引、字段说明、交叉链接。 |
| 排障页 | 症状、可能原因、确认命令、修复步骤、仍失败时需要的信息。 |
| 对比页 | 比较维度、适用场景、不适用场景、推荐决策树。 |

Do not mix unrelated page types in one page. If a page has two different reader tasks, split it.

## Project Style

- Keep explanations direct, high-density, and practical.
- Avoid marketing tone, hype, vague praise, and "AI can greatly improve efficiency" style filler.
- Prefer "何时使用、如何操作、如何验证、失败怎么办" over abstract background.
- Use realistic AI coding, docs maintenance, automation, or team examples.
- Do not invent product behavior. If a fact may have changed, verify it from primary documentation.
- Avoid giant paragraphs; prefer short paragraphs, tables, and focused lists.
- Do not overuse admonitions. Use `::: tip` for helpful shortcuts, `::: warning` for risky actions, `::: info` for context, and normal prose for ordinary notes.

## Markdown Components

| Need | Preferred Form |
| --- | --- |
| 多环境命令 | `::: code-tabs#shell` with `@tab pnpm` / `@tab npm` only if `codeTabs` syntax is appropriate. |
| 多方案内容 | `::: tabs#id` with stable tab ids. |
| 注意事项 | Theme Hope custom containers such as `::: tip`、`::: warning`、`::: info`。 |
| 任务清单 | GFM task list only for real checklists, not decorative bullets. |
| 复用片段 | `@include` only for stable shared content; avoid hidden coupling for short text. |
| 图片尺寸 | Use enabled image size syntax only when layout requires it. |

## Common Mistakes

| Mistake | Fix |
| --- | --- |
| Creating pages outside `src` | Move published Markdown into `src`. |
| Forgetting frontmatter | Add `title`, `icon`, `order`, and `category`. |
| Manually editing sidebar for normal section pages | Prefer `order` because this site uses `children: "structure"`. |
| Writing a narrative of one session | Rewrite as reusable guidance, checklist, or reference. |
| Adding unverified CLI/API behavior | Verify from official docs or mark as unknown. |
| Translating commands or config keys into Chinese | Keep the original command/config identifier and explain around it in Chinese. |
| Using a Markdown enhancement just because it exists | Use the simplest readable Markdown that proves the point. |
| Hiding failures in prose | Add verification and failure handling sections. |

## Official Anchors

- Theme Hope project content and route rules: https://theme-hope.vuejs.press/get-started/content.html
- Theme Hope frontmatter config: https://theme-hope.vuejs.press/config/frontmatter/
- Theme Hope Markdown guide: https://theme-hope.vuejs.press/guide/markdown/
