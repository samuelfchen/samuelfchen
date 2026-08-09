import MarkdownViewer from "../../components/MarkdownViewer";
import { getMarkdown, getPageMeta, getSlugs } from "../../lib/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.filter((s) => s !== "index").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const files = await getSlugs();
  if (!files.includes(slug)) return {};

  const content = await getMarkdown(slug);
  const { title, description } = getPageMeta(content);

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description },
    alternates: {
      canonical: `https://samuelfchen.com/${slug}`,
    },
  };
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
