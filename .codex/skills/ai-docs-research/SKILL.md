---
name: ai-docs-research
description: Use when ai-docs content depends on external facts, official documentation, product behavior, CLI flags, package versions, Theme Hope capabilities, or claims that may change
---

# AI Docs Research

## Overview

本 skill 用于把外部资料转成可靠文档事实。原则是：先确认来源，再写结论；优先官方文档和项目源码；把不确定性显式写出来，不把猜测包装成事实。

## When to Use

- Writing or updating docs from URLs, release notes, product docs, blog posts, courses, or issue discussions.
- Mentioning CLI flags, config keys, package versions, dependencies, browser support, deployment behavior, API behavior, or pricing-like information.
- Explaining VuePress, Theme Hope, Claude Code, OpenAI, MCP, browser automation, automation workflows, or any fast-changing tool behavior.
- Investigating a reported docs bug where the current page may disagree with upstream docs.

Do not use for purely local copyediting where no factual claim changes.

## Source Priority

| Priority | Source | Use |
| --- | --- | --- |
| 1 | Official docs, official repo, official changelog, source code | Normative facts and exact config behavior. |
| 2 | Maintainer issues/discussions with accepted answers | Edge cases and known limitations. |
| 3 | Current project files | Local implementation and enabled features. |
| 4 | Third-party tutorials | Ideas only; verify against priority 1 before writing. |
| 5 | Model memory or old notes | Starting hypothesis only, never final evidence. |

When the user provides specific URLs, read those URLs first. For Theme Hope, prefer `theme-hope.vuejs.press` and the official `vuepress-theme-hope` GitHub repo.

## Research Workflow

1. Identify the claim categories: installation, project structure, routing, config, frontmatter, Markdown syntax, plugin, style, deployment, or troubleshooting.
2. Open the official page that owns each category.
3. Cross-check local project state, especially `package.json`, `src/.vuepress/theme.ts`, `navbar.ts`, `sidebar.ts`, and existing Markdown pages.
4. Record only facts that matter to the current document; avoid copying full upstream docs.
5. If official docs and local config differ, document the local behavior as "本项目当前配置", not Theme Hope global behavior.
6. For facts likely to change, include the source link in the doc or final response.

## Theme Hope Source Map

| Need | Official Entry |
| --- | --- |
| Project setup, commands, content, routes, config, structure, deployment | https://theme-hope.vuejs.press/get-started/ |
| Theme features, layout, Markdown, components, blog, customization | https://theme-hope.vuejs.press/guide/ |
| Theme options, Markdown config, plugin config, frontmatter config, style config | https://theme-hope.vuejs.press/config/ |
| Troubleshooting, common errors, Vite problems, support requirements | https://theme-hope.vuejs.press/faq/ |
| VuePress core config and plugin behavior | https://vuejs.press/ |

## Fact Boundaries

- "Theme Hope supports X" means official docs list X and current installed version plausibly includes it.
- "This project supports X" means `src/.vuepress/theme.ts` enables it and required dependencies exist in `package.json` or transitive docs clearly cover it.
- "You can use X syntax in Markdown" means the relevant Markdown option is enabled. If it requires optional packages, those packages must be installed.
- "Route is Y" means it follows VuePress route mapping from file path, not a guessed URL.
- "Sidebar will update automatically" is false in dev server for structured sidebar unless `hotReload` is enabled or the dev server restarts.

## Output Requirements

When research affects docs, include:

- Confirmed facts.
- Source links.
- Local project differences.
- Unknowns or assumptions.
- Verification path.

Do not paste long upstream excerpts. Summarize and link.

## Common Mistakes

| Mistake | Fix |
| --- | --- |
| Copying a tutorial without checking official docs | Verify against official docs and local config first. |
| Treating upstream default as local enabled behavior | Inspect `theme.ts` and `package.json`. |
| Writing "latest" from memory | Check current source before using time-sensitive language. |
| Hiding uncertainty | State "未确认" and provide the next verification step. |
| Using a feature because docs mention it | Check whether the project has enabled it and installed required packages. |
