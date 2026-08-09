# Architecture

## Tech stack

- **Framework**: Next.js 16.2 (Turbopack, React 19.2)
- **Routing**: App Router with `output: "export"` (fully static)
- **Styling**: CSS modules via `globals.css` — no CSS-in-JS or Tailwind
- **Font**: JetBrains Mono Nerd Font (local, self-hosted in `src/fonts/`)
- **Hosting**: Cloudflare Pages (GitHub integration, auto-deploy)
- **No database, no CMS**, no API routes. Pure static.

## File structure

```
content/               # All page content as markdown
  index.md             # Homepage
  about.md             # /about
  blog.md              # /blog — auto-generated listing
  blog/                # Nested blog posts
    test.md            # /blog/test
  now.md               # /now
  projects.md          # /projects
  404.md               # Custom 404 content
agents/                # Agent documentation
src/
  app/
    layout.tsx         # Root layout: fonts, metadata, JSON-LD Person schema, Tmux shell
    page.tsx           # Homepage (/index → /)
    not-found.tsx      # Custom 404 page (reads content/404.md)
    [...slug]/         # Catch-all route for all pages
      page.tsx         # /about, /blog, /blog/test, etc.
    globals.css        # All styles (tmux chrome, nvim tabs, markdown tokens, cursor)
  components/
    Tmux.tsx           # Client: tmux status bar, tab management, email copy, vim statusline
    MarkdownViewer.tsx # Server: renders raw .md as source-verbatim lines with inline tokens
    VimNav.tsx         # Client: vim cursor, keyboard navigation, link following
    Pane.tsx           # Layout wrapper for panes
    panes/
      Log.tsx          # Client: git log with live relative timestamps
      Face.tsx         # Static brand pane
  lib/
    content.ts         # Server: recursive slug walker, markdown reader, frontmatter parser
    git.ts             # Server: reads git log with %at timestamps
scripts/
  generate-seo.cjs     # Generates sitemap.xml + robots.txt (pre-build)
  generate-blog-listing.cjs  # Generates content/blog.md from blog post frontmatter (pre-build)
public/
  favicon.svg          # Blue ~ (#61afef)
  sitemap.xml          # Generated at build
  robots.txt           # Generated at build
```

## Routing

A single catch-all `[...slug]/page.tsx` handles every page. `getSlugs()` recursively walks `content/` and returns flat path strings like `"about"`, `"blog"`, `"blog/test"`. These are split by `/` into `{ slug: string[] }` for `generateStaticParams`.

The homepage (`/`) is a separate `page.tsx` that reads `content/index.md`.

## Component tree

```
layout.tsx
├── <html> with --font-mono variable
├── <body>
│   ├── JSON-LD Person schema
│   ├── <Tmux git={info}>
│   │   ├── Status bar: tabs, social links, email
│   │   ├── <Pane><Face /></Pane> — brand/graphics pane
│   │   ├── <Pane><Log /></Pane>  — git log pane
│   │   └── <Pane>
│   │       └── <VimNav slug={slug} onOpen/onClose/onPrevTab/onNextTab>
│   │           └── <MarkdownViewer content={content} files={slugs} />  — current page
│   │       </Pane>
│   │   └── Vim statusline (row:col, filename)
│   └── Corner link (v1 site)
```

## Content pipeline

```
content/*.md (authored by human)
  ↓
scripts/generate-seo.cjs          → public/sitemap.xml, public/robots.txt
scripts/generate-blog-listing.cjs → content/blog.md (overwritten)
  ↓
next build (static export)
  ↓
  content.ts → walk() → getSlugs() → generateStaticParams
  content.ts → getMarkdown(slug) → getPageMeta() → metadata
  content.ts → getMarkdown(slug) → MarkdownViewer → HTML
  ↓
out/ (deployed to Cloudflare Pages)
```

## Markdown rendering (MarkdownViewer.tsx)

Server component. Reads raw markdown, splits by newline, renders each line as a `<div class="md-row">` with source-verbatim inline tokenization:

- **Headings**: `#` → `.h1`, `##` → `.h2`, etc. Rendered as `<span>` tags (not `<h1>` elements).
- **Lists**: `- ` → `.md-list` with `::before` bullets. Indented bullets get `.md-indent-N` for stepped colours.
- **Inline tokens**: regex-based (`INLINE_RE`) — code, bold, italic, links, strikethrough. Each token wraps delimiters in `.tok-delim` spans for syntax highlighting.
- **Code blocks**: ` ``` ` delimited, rendered as `.md-code` blocks.
- **Blockquotes**: `> ` prefixed, rendered with `.md-blockquote`.

Links at the cursor column (`linkAtCol` in VimNav) perform a DOM tree-walk to find `<a>` elements covering the column, enabling `Enter`/`gx` to follow links.

## Frontmatter

Optional `---` block at the top of any `.md` file:

```md
---
title: Post Title
date: 2026-08-09
description: Short summary for SEO.
---

# Post Title
```

Parsed by `parseFrontmatter()` in `content.ts`. Used by:
- `getPageMeta()` → page `<title>`, meta description, OG tags
- `generateMetadata()` → `og:type article`, `article:publishedTime`
- `generate-blog-listing.cjs` → auto-generates `blog.md` listing sorted by date desc

## SEO

| Signal | Scope | Source |
|---|---|---|
| `<title>` / meta description | per-page | frontmatter or `# heading` |
| OG title/description/type/author | per-page | `generateMetadata()` |
| `article:publishedTime` | blog posts | frontmatter `date` |
| Twitter card (`summary_large_image`) | blog posts | `generateMetadata()` |
| Canonical URL | per-page | `generateMetadata()` |
| JSON-LD Person + `sameAs` | site-wide | `layout.tsx` |
| JSON-LD BlogPosting | blog posts | `[...slug]/page.tsx` |
| Sitemap | site-wide | `scripts/generate-seo.cjs` |
| robots: index, follow | site-wide | `layout.tsx` metadata |

## Vim navigation (VimNav.tsx)

Client component. Key bindings:

| Key | Action |
|---|---|
| `j`/`k` | Move cursor down/up |
| `h`/`l` | Move cursor left/right |
| `w` | Next word start |
| `e` | Word end (current if mid-word, else next) |
| `b` | Previous word start |
| `0`/`$` | Start/end of line |
| `g`+`g` | Top of file |
| `G` | Bottom of file |
| `Enter` | Open link under cursor |
| `g`+`x` | Open link (vim fallback) |
| `H`/`L` | Previous/next buffer (no repeat) |
| `x` | Close current tab |

Cursor position is cached per-tab in `sessionStorage` under key `"nvim-pos"`. `row` state initializes from cache via `useState` initializer. `col` is a ref restored in a mount effect. Position is saved before navigation in `follow()` (keyboard) and at the end of `onMouseDown` (mouse).

## Deployment

Cloudflare Pages auto-deploys from GitHub `main` branch. Build settings:

```
Build command: node scripts/generate-seo.cjs && node scripts/generate-blog-listing.cjs && next build
Output dir: out
```

The git log pane (`Log.tsx`) needs full history. Cloudflare shallow-clones (`GIT_DEPTH=1`). Prepend `git fetch --unshallow || true` to the build command if history is incomplete.
