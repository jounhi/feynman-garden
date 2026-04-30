# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev          # Start dev server at localhost:4321
npm run build        # Build production site to ./dist/
npm run preview      # Preview built site locally
npm run astro check  # Type-check Astro files
```

## Architecture

### Stack

- **Astro 6** — static site generation, zero-JS-by-default
- **Content Collections** (`src/content.config.ts`) — all blog posts live in `src/content/blog/` as `.md` or `.mdx` files, validated by a Zod schema (title, description, pubDate, updatedDate?, heroImage?)
- **@astrojs/mdx** — allows embedding Astro components inside Markdown
- **@astrojs/rss** — generates RSS feed at `/rss.xml`
- **@astrojs/sitemap** — auto-generates sitemap
- **Sharp** — image optimization via `astro:assets` `<Image />` component
- **Atkinson Hyperlegible** — local WOFF font, configured via Astro's font API

### Key patterns

- **Routing**: file-based under `src/pages/`. Blog posts use a dynamic route `[...slug].astro` (`getStaticPaths` generates all post pages from the blog collection).
- **Content pipeline**: `getCollection('blog')` reads from `src/content/blog/` → sorts by `pubDate` descending → renders via `render()` in the slug template → wrapped in `BlogPost.astro` layout.
- **No client JS**: this site is fully static. There are no interactive components (no `client:*` directives used).
- **Styling**: scoped `<style>` tags in `.astro` components + one global CSS file (`src/styles/global.css`). No CSS framework.

### Directory structure

```
src/
  components/    # Reusable .astro components (Header, Footer, BaseHead, FormattedDate)
  layouts/       # BlogPost.astro — wraps article content with HTML shell
  pages/         # Routes: index, about, blog/index, blog/[...slug], rss.xml.js
  content/       # Blog posts (markdown + mdx), validated by content.config.ts
  styles/        # global.css (Bear Blog theme)
  consts.ts      # SITE_TITLE, SITE_DESCRIPTION
```

### Writing a new post

Create a `.md` or `.mdx` file in `src/content/blog/` with frontmatter:

```yaml
---
title: "Post Title"
description: "Short summary"
pubDate: 2024-01-01
updatedDate: 2024-01-05  # optional
heroImage: ./image.jpg    # optional, path relative to post file
---
```

The post automatically appears on `/blog` and gets its own page at `/blog/:slug/`.

### Deployment

Git push triggers: Gitee → GitHub mirror → Vercel auto-deploy. No manual steps needed after merge.
