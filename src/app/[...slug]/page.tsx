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

  const isArticle = flat.startsWith("blog/") && !!date;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: isArticle ? "article" : "website",
      ...(isArticle
        ? {
            publishedTime: date,
            section: "Blog",
            authors: ["https://samuelfchen.com"],
          }
        : {}),
    },
    twitter: {
      card: isArticle ? "summary_large_image" : "summary",
      title,
      description,
    },
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
  const { title, description, date } = getPageMeta(content);

  return (
    <>
      {flat.startsWith("blog/") && date && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: title,
              description,
              datePublished: date,
              author: {
                "@type": "Person",
                name: "Samuel Chen",
                url: "https://samuelfchen.com",
              },
              publisher: {
                "@type": "Person",
                name: "Samuel Chen",
                url: "https://samuelfchen.com",
              },
              url: `https://samuelfchen.com/${flat}`,
            }),
          }}
        />
      )}
      <MarkdownViewer content={content} files={files} />
    </>
  );
}
