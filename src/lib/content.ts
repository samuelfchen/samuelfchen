import { promises as fs } from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "content");

async function walk(dir: string, prefix = ""): Promise<string[]> {
  const ents = await fs.readdir(dir, { withFileTypes: true });
  const out: string[] = [];
  for (const e of ents) {
    if (e.isDirectory()) {
      const sub = await walk(path.join(dir, e.name), `${prefix}${e.name}/`);
      out.push(...sub);
    } else if (e.name.endsWith(".md")) {
      out.push(`${prefix}${e.name.replace(/\.md$/, "")}`);
    }
  }
  return out;
}

export async function getSlugs(): Promise<string[]> {
  const slugs = await walk(DIR);
  return slugs.filter((s) => s !== "404" && s !== "index").sort();
}

export async function getMarkdown(slug: string): Promise<string> {
  return fs.readFile(path.join(DIR, `${slug}.md`), "utf8");
}

export interface PageMeta {
  title: string;
  description: string;
  date?: string;
}

export function getPageMeta(content: string): PageMeta {
  const fm = parseFrontmatter(content);
  if (fm) {
    const title = fm.title || "Samuel Chen";
    const description = fm.description || title;
    return { title, description, date: fm.date };
  }

  const lines = content.split("\n");
  let title = "";
  let description = "";

  for (const line of lines) {
    const h1 = /^#\s+(.+)/.exec(line);
    if (h1 && !title) {
      title = h1[1].trim();
      continue;
    }
    const trimmed = line.trim();
    if (!title || !trimmed) continue;
    if (/^#{1,6}\s/.test(trimmed)) continue;
    description = trimmed;
    break;
  }

  return {
    title: title || "Samuel Chen",
    description: description || title || "Samuel Chen",
  };
}

function parseFrontmatter(
  content: string
): { title?: string; description?: string; date?: string } | null {
  if (!content.startsWith("---\n")) return null;
  const end = content.indexOf("\n---\n", 4);
  if (end === -1) return null;
  const block = content.slice(4, end);
  const out: Record<string, string> = {};
  for (const line of block.split("\n")) {
    const m = /^\s*(\w+)\s*:\s*(.+?)\s*$/.exec(line);
    if (m) out[m[1]] = m[2];
  }
  return out;
}
