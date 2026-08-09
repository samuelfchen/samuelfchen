const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "..", "content", "blog");
const OUT = path.join(__dirname, "..", "content", "blog.md");

function parseFm(raw) {
  if (!raw.startsWith("---\n")) return {};
  const end = raw.indexOf("\n---\n", 4);
  if (end === -1) return {};
  const block = raw.slice(4, end);
  const out = {};
  for (const line of block.split("\n")) {
    const m = /^\s*(\w+)\s*:\s*(.+?)\s*$/.exec(line);
    if (m) out[m[1]] = m[2];
  }
  return out;
}

const posts = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const slug = f.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(DIR, f), "utf8");
    const fm = parseFm(raw);
    return {
      slug,
      title: fm.title || slug,
      date: fm.date || "",
      description: fm.description || "",
    };
  })
  .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

const lines = ["# blog", ""];
for (const p of posts) {
  const date = p.date ? ` — ${p.date}` : "";
  lines.push(`[${p.title}](./blog/${p.slug})${date}`);
}
lines.push("");

const content = lines.join("\n");
const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
if (content !== current) {
  fs.writeFileSync(OUT, content);
  console.log(`Updated blog.md with ${posts.length} post(s)`);
}
