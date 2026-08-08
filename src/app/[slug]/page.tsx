import MarkdownViewer from "../../components/MarkdownViewer";
import { getMarkdown, getSlugs } from "../../lib/content";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.filter((s) => s !== "index").map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const files = await getSlugs();
  if (!files.includes(slug)) notFound();
  const content = await getMarkdown(slug);
  return <MarkdownViewer content={content} files={files} />;
}
