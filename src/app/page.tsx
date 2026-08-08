import MarkdownViewer from "../components/MarkdownViewer";
import { getMarkdown, getSlugs } from "../lib/content";

export default async function Page() {
  const [content, files] = await Promise.all([getMarkdown("index"), getSlugs()]);
  return <MarkdownViewer content={content} files={files} />;
}
