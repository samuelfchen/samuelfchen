<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: samuelfchen.com

Personal portfolio site styled as a tmux + neovim session. Markdown-driven content, vim navigation, deployed to Cloudflare Pages.

## Conventions

- Work directly on `main`. No feature branches or PRs.
- No push unless explicitly asked (Cloudflare Pages build limit).
- No comments in code unless truly necessary.
- Monospace everything: JetBrains Mono Nerd Font, `var(--font-mono)`.
- Favour existing patterns — look at neighbouring files before creating new ones.
- Markdown files in `content/` drive all pages. No database, no CMS.

## Commands

| Command | What |
|---|---|
| `npm run dev` | Next.js dev server |
| `npm run build` | Generate SEO assets + Next.js static export |
| `npm run lint` | ESLint (core-web-vitals + typescript) |
| `npm run deploy` | Build + wrangler pages deploy (manual) |

## Key learnings

### React 19 / Next.js 16
- **No setState in effects** — `react-hooks/set-state-in-effect` error. Use `useState` initializer function instead.
- **No reading/writing refs during render** — `react-hooks/refs` error. Use effects or event handlers.
- `useSyncExternalStore` for hover media query (no `window.matchMedia` with `useEffect`).
- `params` is a `Promise<{ slug }>` in page components — must `await`.

### Static export (`output: "export"`)
- `generateStaticParams` drives all route generation.
- No server components after build — everything is static HTML.

### Cloudflare Pages
- Auto-deploy from GitHub integration.
- Shallow clone (`GIT_DEPTH=1`) causes incomplete git log — prepend `git fetch --unshallow || true` to build command.
- Build command: `node scripts/generate-seo.cjs && node scripts/generate-blog-listing.cjs && next build`
- Output directory: `out`

### SessionStorage for cursor persistence
- `sessionStorage` key `"nvim-pos"` — survives full-page navigations but not tab/browser sessions.
- Refresh clears it (by design — starts fresh each visit).

### Monospace cursor positioning
- `cursor.getBoundingClientRect().width` gives exact char width.
- Use `Math.floor(hitX / charWidth)` for column — lands on clicked character, not adjacent.
- Account for `paddingLeft` on `.md-row` elements.
