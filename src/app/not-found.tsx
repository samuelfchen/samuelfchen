import MarkdownViewer from "../components/MarkdownViewer";
import { getMarkdown, getSlugs } from "../lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "This page doesn't exist.",
  robots: { index: false },
};

export default async function NotFound() {
  const content = await getMarkdown("404");
  const files = await getSlugs();
  return <MarkdownViewer content={content} files={files} />;
}
