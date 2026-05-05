---
name: ai-docs-style-assets
description: Use when changing ai-docs Theme Hope styles, SCSS variables, colors, fonts, layout widths, static assets, logos, favicons, images, videos, or public files
---

# AI Docs Style Assets

## Overview

Theme Hope 的样式系统分为 SCSS 变量、CSS 变量注入、全局样式和静态资源。优先使用官方样式入口，不要在 Markdown 页面里堆 inline CSS，除非确实没有更稳定的表达方式。

## When to Use

- Editing `src/.vuepress/styles/config.scss`, `palette.scss`, or `index.scss`.
- Adding or changing logo, favicon, screenshots, videos, images, downloadable files, or public assets.
- Changing theme color, fonts, content width, sidebar width, navbar height, dark/light colors, or global visual behavior.
- Debugging style differences across desktop/mobile or light/dark mode.

## Style Files

| File | Purpose | Use For |
| --- | --- | --- |
| `config.scss` | Pure SCSS variable config | Breakpoints, `$theme-color`, code block colors, color lists. |
| `palette.scss` | CSS variable injection | Text/background/accent/border/control colors, layout, fonts, transitions. |
| `index.scss` | Global CSS/SCSS injected after theme/plugin styles | Selectors, component overrides, small global rules. |

Do not put broad global selectors in Markdown pages. Keep style changes centralized.

## Current Project State

Current style files are minimal:

- `config.scss` sets `$theme-color: #096dd9;`.
- `palette.scss` and `index.scss` currently contain only placeholder comments.

Preserve this simplicity unless a real design requirement exists.

## Variable Strategy

| Need | Preferred Location |
| --- | --- |
| Theme brand color | `config.scss` with `$theme-color`. |
| Light/dark text or background colors | `palette.scss` map variables. |
| Accent color family | `palette.scss` variables such as `$vp-c-accent`, `$vp-c-accent-bg`, `$vp-c-accent-text`, `$vp-c-accent-soft`. |
| Navbar/sidebar/content widths | `palette.scss` layout variables. |
| Font families | `palette.scss` font variables. |
| One-off global override | `index.scss` with narrow selector. |
| Page-specific semantic callout | Prefer Markdown container before custom CSS. |

When overriding accent colors, ensure text/background contrast remains readable in both light and dark modes.

## Static Assets

| Asset Type | Location | Reference |
| --- | --- | --- |
| Site-wide logo/favicon/download | `src/.vuepress/public` | `/logo.svg`, `/favicon.ico`, `/assets/file.pdf` |
| Page-local image/video | Near the Markdown page if only that page uses it | `./images/example.png` |
| Generated build output | `src/.vuepress/dist` | Never edit manually. |

For local logos, official Theme Hope guidance expects absolute site paths and files under `.vuepress/public`.

## Media Rules

- Use descriptive file names in English kebab-case.
- Compress large screenshots and videos before committing when practical.
- Add meaningful alt text to Markdown images.
- Keep videos local only when they are necessary and not too large for repository use.
- Prefer root paths for public assets and relative paths for page-local media.
- After moving media, rebuild to catch broken references.

## Responsive and Browser Rules

- Theme Hope uses newer CSS logical properties such as `padding-inline`, `margin-block`, and `inset-inline-start`.
- Do not add browser-specific workarounds unless there is a reproduced browser issue.
- Check mobile impact for navbar, sidebar, tables, wide code blocks, and embedded videos.
- For wide tables, prefer concise columns or split content before adding custom overflow styles.

## Dark Mode Rules

- If a color differs by mode, use Sass maps in `palette.scss`, not ad hoc `[data-theme="dark"]` blocks everywhere.
- Test both light and dark assumptions when changing text/background/accent variables.
- Use `logoDark` only when the normal logo does not work on dark backgrounds.

## Common Mistakes

| Mistake | Fix |
| --- | --- |
| Editing generated CSS in `dist` | Change `styles` source and rebuild. |
| Putting site-wide CSS in Markdown HTML | Move to `index.scss`. |
| Using a relative logo path in theme config | Put logo in `public` and use root path such as `/logo.svg`. |
| Overriding many CSS variables without design intent | Change the smallest variable set that solves the issue. |
| Ignoring dark mode | Use light/dark maps or verify the same value works in both modes. |
| Adding huge media files silently | Compress or ask before adding large assets. |

## Verification

- Run `pnpm docs:build` after style or asset changes.
- Inspect generated routes for pages that use changed media.
- If visual behavior matters, run the dev server and inspect desktop/mobile and light/dark states.

## Official Anchors

- Style config: https://theme-hope.vuejs.press/config/style.html
- Project structure: https://theme-hope.vuejs.press/get-started/structure.html
- Navbar logo guidance: https://theme-hope.vuejs.press/guide/layout/navbar.html
