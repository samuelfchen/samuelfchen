import { promises as fs } from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "content");

export async function getSlugs(): Promise<string[]> {
  const files = await fs.readdir(DIR);
  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .sort();
}

export async function getMarkdown(slug: string): Promise<string> {
  return fs.readFile(path.join(DIR, `${slug}.md`), "utf8");
}
