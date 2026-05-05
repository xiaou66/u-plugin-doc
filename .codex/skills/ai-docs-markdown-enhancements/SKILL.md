---
name: ai-docs-markdown-enhancements
description: Use when adding Theme Hope Markdown extensions, tabs, code tabs, demos, components, images, include snippets, charts, math, PlantUML, GFM, or advanced Markdown syntax in ai-docs
---

# AI Docs Markdown Enhancements

## Overview

Theme Hope extends Markdown through `markdown` options in `hopeTheme(...)`. This project already enables several extensions, but not every feature shown in upstream docs is available locally. Use enhanced syntax only when it improves clarity and the local config supports it.

## When to Use

- Writing tabs, code tabs, task lists, includes, components, demos, image sizing, PlantUML, or styled text.
- Deciding whether to enable Mermaid, Chart.js, ECharts, math, reveal.js, playgrounds, or other optional Markdown features.
- Debugging Markdown syntax that builds incorrectly.
- Reviewing docs that use non-standard Markdown containers or Vue components.

## Current Enabled Features

From `src/.vuepress/theme.ts`, this project currently enables:

| Feature | Status | Use Carefully For |
| --- | --- | --- |
| `align` | enabled | Text alignment blocks. |
| `attrs` | enabled | Adding attributes/classes to Markdown elements. |
| `codeTabs` | enabled | Package-manager or language-specific code alternatives. |
| `component` | enabled | Vue components in Markdown. |
| `demo` | enabled | Code demos when useful and verified. |
| `figure` | enabled | Standalone image to figure behavior. |
| `gfm` | enabled | Common GitHub Flavored Markdown behavior. |
| `imgLazyload` | enabled | Lazy loading Markdown images. |
| `imgSize` | enabled | Image size syntax. |
| `include` | enabled | Including Markdown/code fragments. |
| `mark` | enabled | Highlighted text. |
| `plantuml` | enabled | PlantUML diagrams. |
| `spoiler` | enabled | Hidden spoiler text. |
| `sub` / `sup` | enabled | Subscript and superscript. |
| `tabs` | enabled | Content tabs. |
| `tasklist` | enabled | Checkbox task lists. |
| `vPre` | enabled | Preventing Vue interpolation parsing. |

Do not assume `footnote`, `math`, `mermaid`, `chartjs`, `echarts`, `flowchart`, `markmap`, `revealjs`, `playground`, `vuePlayground`, or `sandpack` are available unless config and dependencies are added.

## Dependency Gates

| Feature | Rule |
| --- | --- |
| `math` | Install and configure `katex` or `mathjax` dependency intentionally. |
| `revealjs` | Install `@vuepress/plugin-revealjs` before enabling. |
| `chartjs` | Install `chart.js` before enabling. |
| `echarts` | Install `echarts` before enabling. |
| `flowchart` | Install `flowchart.ts` before enabling. |
| `mermaid` | Install `mermaid` before enabling. |
| `vuePlayground` | Install `@vue/repl` before enabling. |
| `sandpack` | Install `sandpack-vue3` before enabling. |

If a feature is optional and the document can be clear without it, prefer not adding dependencies.

## Syntax Patterns

### Tabs

Use tabs for mutually exclusive variants. Give related groups the same id when choices should sync.

````md
::: tabs#shell

@tab pnpm

```bash
pnpm docs:build
```

@tab npm

```bash
npm run docs:build
```

:::
````

### Code Tabs

Use code tabs for alternative code blocks only. Do not use them for long prose.

````md
::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-theme-hope
```

@tab npm

```bash
npm i -D vuepress-theme-hope
```

:::
````

### Include

Use `@include` for shared stable snippets, not to hide unique page content:

```md
<!-- @include: ./shared/checklist.md -->
```

Check included paths after moving files.

### Components

This project registers `Badge` and `VPCard` via `plugins.components`. Use component tags only if registered globally or imported by Theme Hope. If Vue reports `Failed to resolve component`, either register the component or remove the tag.

### Images

- Put static reusable files in `src/.vuepress/public` and reference with root paths.
- Put page-local media near the page only if it travels with that page.
- Always provide meaningful alt text unless the image is decorative.
- Use image size syntax only when layout needs deterministic sizing.

### PlantUML

Use PlantUML only for diagrams where text cannot express relationships clearly. Prefer short diagrams and verify build output.

## Safety Rules

- Do not enable `markdown.DANGEROUS_ALLOW_SCRIPT_EXECUTION` unless the user explicitly requests it and understands the risk.
- Do not paste raw `<script>` or unsafe HTML into Markdown.
- Avoid non-standard HTML tags such as `<center>` and `<font>`.
- Use `<ClientOnly />` for components that cannot render consistently in SSR.
- Keep enhanced syntax simple enough for future maintainers to edit.

## Common Mistakes

| Mistake | Fix |
| --- | --- |
| Using Mermaid because upstream docs mention it | Check `theme.ts`; enable dependency or use PlantUML/current Markdown. |
| Creating tabs for unrelated content | Split into sections instead. |
| Using `@include` for one sentence | Inline it. |
| Forgetting blank lines inside containers | Follow Theme Hope examples and rebuild. |
| Using components not registered by `plugins.components` | Register them or remove component syntax. |
| Adding optional dependencies without purpose | Prefer simple Markdown unless the feature materially improves the page. |

## Official Anchors

- Markdown guide: https://theme-hope.vuejs.press/guide/markdown/
- Markdown config: https://theme-hope.vuejs.press/config/markdown/
- Markdown grammar config: https://theme-hope.vuejs.press/config/markdown/grammar.html
- Markdown code config: https://theme-hope.vuejs.press/config/markdown/code.html
- Markdown chart config: https://theme-hope.vuejs.press/config/markdown/chart.html
