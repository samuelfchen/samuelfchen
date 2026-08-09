const fs = require("fs");
const path = require("path");

const slugs = fs
  .readdirSync(path.join(__dirname, "..", "content"))
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""))
  .filter((s) => s !== "404");

const BASE = "https://samuelfchen.com";

const robots = `User-agent: *
Allow: /

Sitemap: ${BASE}/sitemap.xml
`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${slugs
  .map((s) => {
    const url = s === "index" ? BASE : `${BASE}/${s}`;
    const prio = s === "index" ? "1.0" : "0.8";
    return `  <url>
    <loc>${url}</loc>
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
