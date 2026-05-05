---
name: ai-docs-theme-hope
description: Use when changing VuePress Theme Hope config, routing, navbar, sidebar, theme options, plugins, homepage layout, or documentation site behavior in ai-docs
---

# AI Docs Theme Hope

## Overview

本项目是 VuePress 2 + `vuepress-theme-hope` 文档站。Theme Hope 的能力分布在站点配置、主题配置、导航、侧边栏、页面 frontmatter、Markdown 增强、插件和样式文件中。改动时必须尊重这些作用域，不要把所有配置塞进一个文件。

## When to Use

- Editing `src/.vuepress/**`, `package.json`, or docs scripts.
- Adding top-level sections, navbar entries, sidebar groups, homepage layouts, theme plugins, or theme options.
- Debugging routes, sidebars, frontmatter ordering, structured sidebar, Theme Hope warnings, or dev/build behavior.
- Deciding whether a feature belongs in `config.ts`, `theme.ts`, frontmatter, `styles`, or page Markdown.

Use `ai-docs-information-architecture` before changing section structure. Use `ai-docs-markdown-enhancements` before enabling or using advanced Markdown syntax. Use `ai-docs-style-assets` before changing styles or static assets.

## Project Layout

| Path | Purpose |
| --- | --- |
| `src` | VuePress docs root; only Markdown and assets under this tree become site source. |
| `src/README.md` | Site homepage, route `/`. |
| `src/<dir>/README.md` | Section index, route `/<dir>/`. |
| `src/.vuepress/config.ts` | VuePress core site config via `defineUserConfig`. |
| `src/.vuepress/theme.ts` | Theme Hope config via `hopeTheme`. |
| `src/.vuepress/navbar.ts` | Navbar config, imported from `theme.ts`. |
| `src/.vuepress/sidebar.ts` | Sidebar config, imported from `theme.ts`. |
| `src/.vuepress/styles` | Theme variables and global style overrides. |
| `src/.vuepress/public` | Static files served from site root. |

## Config Scope Rules

- Keep TypeScript ESM config and `.js` local import suffixes.
- Put VuePress core options such as `base`, `lang`, `title`, `description`, and external VuePress plugins in `config.ts`.
- Put Theme Hope options such as `hostname`, `author`, `license`, `favicon`, `logo`, `repo`, `docsDir`, `navbar`, `sidebar`, `markdown`, `plugins`, `footer`, and `metaLocales` in `theme.ts`.
- Put page-specific values such as `title`, `description`, `icon`, `category`, `tag`, `navbar: false`, `sidebar: false`, `index`, `order`, `dir`, `prev`, and `next` in frontmatter.
- Use `navbar(...)` and `sidebar(...)` helpers from `vuepress-theme-hope`.
- Do not hand-edit `.cache`, `.temp`, or `dist`.
- Do not call Theme Hope bundled plugins directly in top-level VuePress `plugins` unless official docs say so. Configure theme-bundled plugins under `plugins.<shortName>` in `theme.ts`.

## Required Theme Basics

| Option | Rule |
| --- | --- |
| `hostname` | Required for deployed site metadata; include full protocol such as `https://example.com`. |
| `author` | Set globally when page info, copyright, or feed-like metadata relies on author data. |
| `license` | Use when footer or page metadata should show license. |
| `favicon` | Prefer files in `src/.vuepress/public`, referenced by root path such as `/favicon.ico`. |
| `logo` / `logoDark` | Use absolute site path from `public` for local logo assets. |
| `hotReload` | Enable only when you accept slower dev reloads for structured sidebar, git info, categories, tags, or blog recalculation. |

## Navigation Rules

| Task | Edit |
| --- | --- |
| Add page in an existing section | Add `src/<section>/<page>.md` with `order`. |
| Add a section landing page | Add `src/<section>/README.md`, then update navbar/sidebar if it is top-level. |
| Add top-level navbar item | Edit `src/.vuepress/navbar.ts`. |
| Add top-level sidebar group | Edit `src/.vuepress/sidebar.ts`. |
| Change ordering in structure sidebar | Edit page frontmatter `order`, not generated output. |
| Hide page from structure sidebar/catalog | Set `index: false` in page frontmatter. |
| Hide sidebar on one page | Set `sidebar: false` in page frontmatter. |
| Add a folder group title/icon | Add or update that folder's `README.md` frontmatter `dir`. |

Current sidebar uses `children: "structure"` for `getting-started/`; Theme Hope reads files and frontmatter. Use `README.md` frontmatter `dir` only for folder groups.

## Route Rules

| File | Route |
| --- | --- |
| `src/README.md` | `/` |
| `src/foo.md` | `/foo.html` |
| `src/foo/README.md` | `/foo/` |
| `src/foo/bar.md` | `/foo/bar.html` |

Use relative links in Markdown; use root-relative links in navbar/sidebar.

## Navbar Patterns

| Pattern | Use When |
| --- | --- |
| String item `"/guide/"` | Page frontmatter already has good `title` and `icon`. |
| Object item `{ text, icon, link }` | Nav text must be shorter or different from page title. |
| Dropdown `{ text, icon, prefix, children }` | Many related links should be grouped. |
| `activeMatch` | Default active matching is too broad or too narrow. |
| `navbar: false` | Hide navbar globally in theme options or for one page in frontmatter. |

Do not add many top-level navbar items. Put secondary content into dropdowns or sidebars.

## Sidebar Patterns

| Pattern | Use When |
| --- | --- |
| Array sidebar | Small fixed set of pages. |
| Object sidebar | Different route prefixes need different sidebars. Put more specific keys before `/`. |
| `children: "structure"` | Files under a prefix should generate sidebar from file tree and frontmatter. |
| `sidebar: "structure"` | Entire site should be generated from file structure. Use cautiously on large sites. |
| `dir` frontmatter | Folder grouping needs title, icon, order, collapse state, link behavior, or index behavior. |
| `sidebarSorter` | Default `["readme", "order", "title", "filename"]` sorting is insufficient. |

`README.md` is special in structured sidebar: unless excluded by `index: false` or used as a group link, it appears first.

## Plugin Rules

| Current Plugin Area | Project Rule |
| --- | --- |
| `components` | Register Theme Hope components before using them in Markdown, e.g. `Badge`, `VPCard`. |
| `icon` | Current prefix is `fa6-solid:`; page `icon` values usually omit the prefix. |
| `comment` | Treat current Giscus config as demo-like unless project owner provides real repo/category. |
| Search | Enable intentionally; search plugins usually surface automatically in navbar after configured. |
| Blog/feed/PWA/copyright | Add dependency and production-ready config deliberately, not by copying commented examples. |

## Homepage and Special Layouts

- `src/README.md` controls the homepage.
- Use Theme Hope frontmatter layouts such as project home, blog home, portfolio home, or normal page only after checking the matching frontmatter config.
- Keep landing-page content concise and route users into section index pages.
- Do not mix blog-mode assumptions into this project unless the user asks for blog features.

## Common Mistakes

| Mistake | Fix |
| --- | --- |
| Editing `src/.vuepress/dist` | Edit source, then rebuild. |
| Adding `.md` suffix inconsistently in nav/sidebar | Follow existing style; routes ending in `/` infer `README.md`. |
| Forgetting fallback sidebar order | Put more specific sidebar object keys before `/`. |
| Adding page but no `order` | Add `order` to control structure sidebar. |
| Enabling markdown feature without dependency | Install/configure the required package or avoid the feature. |
| Editing `config.ts` for a theme option | Move the option into `hopeTheme(...)` in `theme.ts`. |
| Calling bundled plugin manually | Configure it under `plugins` in theme options. |
| Expecting dev sidebar to update after Markdown frontmatter changes | Restart dev server or enable `hotReload` knowingly. |

## Official Anchors

- Theme Hope project config: https://theme-hope.vuejs.press/get-started/config.html
- Theme basic options: https://theme-hope.vuejs.press/config/theme/basic.html
- Navbar guide: https://theme-hope.vuejs.press/guide/layout/navbar.html
- Sidebar guide: https://theme-hope.vuejs.press/guide/layout/sidebar.html
- Frontmatter layout config: https://theme-hope.vuejs.press/config/frontmatter/layout.html
