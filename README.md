# samuelfchen.com

Personal website, v2 — a barebones terminal-style landing page. Built with
Next.js (static export) and JetBrains Mono, themed after the One Dark Pro
color scheme.

### Development

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

Static output goes to `out/`.

### Deploy

```bash
npm run deploy
```

Builds the static export and uploads it to the `samuelfchen` Cloudflare
Pages project via wrangler (requires `wrangler login`).
