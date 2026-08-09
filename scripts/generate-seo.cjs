const fs = require("fs");
const path = require("path");

function walk(dir, prefix = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const slugs = [];
  for (const e of entries) {
    if (e.isDirectory()) {
      slugs.push(...walk(path.join(dir, e.name), `${prefix}${e.name}/`));
    } else if (e.name.endsWith(".md")) {
      slugs.push(`${prefix}${e.name.replace(/\.md$/, "")}`);
    }
  }
  return slugs;
}

const slugs = walk(path.join(__dirname, "..", "content")).filter(
  (s) => s !== "404" && s !== "index"
);

const BASE = "https://samuelfchen.com";

const robots = `User-agent: *
Allow: /

Sitemap: ${BASE}/sitemap.xml
`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${slugs
  .map((s) => {
    const prio = s === "index" ? "1.0" : "0.8";
    return `  <url>
    <loc>${BASE}/${s}</loc>
    <changefreq>weekly</changefreq>
    <priority>${prio}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, "..", "public", "robots.txt"), robots);
fs.writeFileSync(path.join(__dirname, "..", "public", "sitemap.xml"), sitemap);

console.log("Generated robots.txt and sitemap.xml");
