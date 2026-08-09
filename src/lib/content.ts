import { promises as fs } from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "content");

export async function getSlugs(): Promise<string[]> {
  const files = await fs.readdir(DIR);
  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .filter((s) => s !== "404")
    .sort();
}

export async function getMarkdown(slug: string): Promise<string> {
  return fs.readFile(path.join(DIR, `${slug}.md`), "utf8");
}

export function getPageMeta(content: string): { title: string; description: string } {
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
