import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import type { Components } from "react-markdown";

function resolveInternal(href: string, files: string[]): string | null {
  const clean = href.replace(/^\.\//, "");
  const slug = clean.replace(/\.md$/, "").replace(/^\//, "");
  if (slug === "index") return "/";
  if (files.includes(slug)) return `/${slug}`;
  return null;
}

export default function MarkdownViewer({
  content,
  files,
  isIndex = false,
}: {
  content: string;
  files: string[];
  isIndex?: boolean;
}) {
  const components: Components = {
    a: ({ href, children }) => {
      if (typeof href === "string") {
        const to = resolveInternal(href, files);
        if (to) {
          return <Link href={to}>{children}</Link>;
        }
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
  };

  return (
    <div className="nvim-md">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>

      {isIndex && (
        <>
          <h2>files</h2>
          <ul className="nvim-files">
            {files
              .filter((f) => f !== "index")
              .map((f) => (
                <li key={f}>
                  <Link href={`/${f}`}>{f}.md</Link>
                </li>
              ))}
          </ul>
        </>
      )}

      <div className="cursorline">
        <span className="blink">▋</span>
      </div>
    </div>
  );
}
