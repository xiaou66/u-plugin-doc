---
name: ai-docs-verification
description: Use when ai-docs documentation, VuePress Theme Hope config, navigation, sidebar, Markdown enhancements, assets, styles, or published routes may be complete or failing
---

# AI Docs Verification

## Overview

文档改动不能只靠“看起来写完了”判断完成。必须用可复现检查证明：Markdown 可解析、路由可生成、Theme Hope 配置有效、链接与资源路径正确、构建失败已经定位到具体原因。

## When to Use

- Before saying docs edits are complete.
- After changing `src/**/*.md`, `src/.vuepress/**`, package scripts, dependencies, assets, or styles.
- When a page, route, sidebar, navbar, Markdown enhancement, plugin, style, asset, or Theme Hope feature might be affected.
- When dev server, build, hydration, dependency, or browser behavior is failing.

## Verification Ladder

Run the smallest checks that prove the change:

| Change | Minimum verification |
| --- | --- |
| Markdown text only | Check nearby style consistency, local links, and run `pnpm docs:build`. |
| Frontmatter, order, category, tag | Confirm YAML, route, structure sidebar expectations, and run build. |
| Navbar/sidebar/theme config | Run build; inspect route output or dev site when active state/layout is involved. |
| Markdown enhancement syntax | Confirm feature is enabled and dependency gate is satisfied, then build. |
| Static assets/styles | Confirm asset path and build; inspect rendered page if visual behavior matters. |
| Dependency or package script | Check package manager state, then build with timeout. |
| Reported error | Reproduce, classify, apply one fix, verify again. |

## Required Build

Use a hard timeout so the task cannot hang indefinitely. On this macOS environment, the tool timeout can provide the 60-second guard if `timeout`/`gtimeout` is unavailable:

```bash
pnpm docs:build
```

## Local Inspection Commands

Use only checks that prove the current change:

```bash
pnpm --version
node -v
find src -name '*.md' | sort
find .codex/skills -maxdepth 2 -name SKILL.md -print | sort
```

For route assumptions after build:

```bash
find src/.vuepress/dist -maxdepth 3 -type f | sort
```

For changed docs and config:

```bash
git diff -- src .codex package.json pnpm-lock.yaml
```

## Docs Review Checklist

- Frontmatter exists and is valid YAML.
- `title` matches the first `#` heading unless there is a clear reason.
- New section pages use `README.md` for directory indexes.
- Local links resolve against the file location.
- `order` produces the intended structure sidebar position.
- `category` and `tag` values are intentional, not copied blindly.
- Pages that should be excluded use `index: false`; pages that hide sidebar use `sidebar: false`.
- Commands, config keys, logs, and identifiers remain untranslated.
- External claims have a primary source or are clearly marked as assumptions.

## Config Review Checklist

- Config files keep ESM `.js` import suffixes.
- No generated cache or dist files are manually treated as source.
- VuePress core config remains in `config.ts`; Theme Hope config remains in `theme.ts`.
- Theme-bundled plugins are configured under `plugins` in `theme.ts`, not duplicated in top-level `config.ts`.
- Structured sidebar object keys are ordered from specific prefix to fallback `/`.
- `hostname` includes full protocol when changed.
- Markdown features that need optional packages are not used unless dependency and config are present.
- Final response states exactly which verification ran and whether it passed.

## Troubleshooting Flow

1. Reproduce with the smallest command, usually `pnpm docs:build`.
2. Read the first real error, not the final cascade.
3. Classify the failure: dependency tree, config scope, Markdown syntax, route/link, asset path, style/browser, or SSR/hydration.
4. Inspect only the files in that class.
5. Apply the smallest source fix; never patch `dist`, `.cache`, or `.temp`.
6. Re-run the same failing command before claiming success.

## FAQ-Based Failure Handling

| Failure | Response |
| --- | --- |
| Build timeout | Report timeout and inspect likely cause before claiming completion. |
| Broken import/config | Fix source config, not generated files. |
| Missing dependency for Markdown feature | Add/configure dependency intentionally or remove feature usage. |
| Route not generated | Check file location, `README.md` naming, frontmatter, and build output. |
| `useXXX() is called without provider` | Check duplicate `vue`/`vuepress` versions and consider `pnpm dlx vp-update`. |
| Peer dependency warnings | Align VuePress, bundler, theme, and plugin versions; do not ignore if behavior fails. |
| Theme says plugin cannot be used directly | Move options into Theme Hope `plugins.<shortName>`. |
| `xxx is not installed` | Install the optional dependency only if the feature is intentionally enabled. |
| Hydration mismatch | Check CDN/minifier transforms first; then isolate SSR/CSR-only components and use `<ClientOnly />` where needed. |
| Hot reload not updating sidebar/blog/git info | Restart dev server or enable `hotReload: true` with performance tradeoff acknowledged. |
| Browser/style issue | Check supported browsers and newer CSS features such as logical properties. |

## Escalation Package

If an issue cannot be solved locally, collect:

- Exact command and full log, preferably `vuepress dev [docs-dir] --debug` when using upstream Theme Hope support.
- Browser console screenshot/log if client-side errors occur.
- Related route URL, Markdown file, config file, and minimal reproduction steps.
- Minimal reproduction repo only when the problem likely belongs to VuePress Theme Hope or a plugin.

## Official Anchors

- Theme Hope FAQ: https://theme-hope.vuejs.press/faq/
- Troubleshooting: https://theme-hope.vuejs.press/faq/troubleshooting.html
- Common errors: https://theme-hope.vuejs.press/faq/common-error.html
- Vite FAQ: https://theme-hope.vuejs.press/faq/vite.html
