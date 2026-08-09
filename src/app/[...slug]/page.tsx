import MarkdownViewer from "../../components/MarkdownViewer";
import { getMarkdown, getPageMeta, getSlugs } from "../../lib/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs
    .filter((s) => s !== "index")
    .map((slug) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const flat = slug.join("/");
  const files = await getSlugs();
  if (!files.includes(flat)) return {};

  const content = await getMarkdown(flat);
  const { title, description, date } = getPageMeta(content);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: date ? "article" : "website",
      ...(date ? { publishedTime: date } : {}),
    },
    twitter: { title, description },
    alternates: {
      canonical: `https://samuelfchen.com/${flat}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const flat = slug.join("/");
  const files = await getSlugs();
  if (!files.includes(flat)) notFound();
  const content = await getMarkdown(flat);
  return <MarkdownViewer content={content} files={files} />;
}
