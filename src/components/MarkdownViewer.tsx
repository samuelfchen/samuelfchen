import Link from "next/link";
import { Fragment, type ReactNode } from "react";

function resolveInternal(href: string, files: string[]): string | null {
  const clean = href.replace(/^\.\//, "");
  const slug = clean.replace(/\.md$/, "").replace(/^\//, "");
  if (slug === "index") return "/";
  if (files.includes(slug)) return `/${slug}`;
  return null;
}

const INLINE_RE =
  /(`[^`]+`)|(\*\*[^*]+\*\*)|(__[^_]+__)|(\*[^*]+\*)|(_[^_]+_)|(\[[^\]]*\]\([^)]*\))|(~~[^~]+~~)/g;

function inlineToken(m: RegExpMatchArray, files: string[]): ReactNode {
  const t = m[0];
  if (t.startsWith("`")) {
    return (
      <>
        <span className="tok-delim">`</span>
        <span className="tok-code">{t.slice(1, -1)}</span>
        <span className="tok-delim">`</span>
      </>
    );
  }
  if (t.startsWith("**")) {
    return (
      <>
        <span className="tok-delim">**</span>
        <strong>{t.slice(2, -2)}</strong>
        <span className="tok-delim">**</span>
      </>
    );
  }
  if (t.startsWith("__")) {
    return (
      <>
        <span className="tok-delim">__</span>
        <strong>{t.slice(2, -2)}</strong>
        <span className="tok-delim">__</span>
      </>
    );
  }
  if (t.startsWith("*")) {
    return (
      <>
        <span className="tok-delim">*</span>
        <em>{t.slice(1, -1)}</em>
        <span className="tok-delim">*</span>
      </>
    );
  }
  if (t.startsWith("_")) {
    return (
      <>
        <span className="tok-delim">_</span>
        <em>{t.slice(1, -1)}</em>
        <span className="tok-delim">_</span>
      </>
    );
  }
  if (t.startsWith("[")) {
    const close = t.indexOf("](");
    const label = t.slice(1, close);
    const rest = t.slice(close + 2, -1);
    const url = rest.split(/\s+/)[0];
    const to = resolveInternal(url, files);
    if (to) return <Link href={to}>{label}</Link>;
    const external = /^https?:\/\//.test(url);
    if (external) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      );
    }
    const cleaned = url.replace(/^\.\//, "").replace(/\.md$/, "").replace(/^\//, "");
    return <Link href={`/${cleaned}`}>{label}</Link>;
  }
  if (t.startsWith("~~")) {
    return (
      <>
        <span className="tok-delim">~~</span>
        <del>{t.slice(2, -2)}</del>
        <span className="tok-delim">~~</span>
      </>
    );
  }
  return t;
}

function renderInline(text: string, files: string[]): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(INLINE_RE)) {
    const i = m.index;
    if (i > last) out.push(text.slice(last, i));
    out.push(<Fragment key={key++}>{inlineToken(m, files)}</Fragment>);
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function lineClass(line: string): string {
  if (line.trim() === "") return "blank";
  const h = /^(#{1,6})\s/.exec(line);
  if (h) return `h${h[1].length}`;
  if (/^(-{3,}|\*{3,})$/.test(line.trim())) return "hr";
  if (/^\s*([-*+])\s/.test(line) || /^\s*\d+\.\s/.test(line)) return "list";
  if (/^>\s?/.test(line)) return "quote";
  return "para";
}

export default function MarkdownViewer({
  content,
  files,
}: {
  content: string;
  files: string[];
}) {
  const rows: ReactNode[] = [];
  let inFence = false;
  content.split("\n").forEach((line, i) => {
    const isFence = /^(`{3,})/.test(line.trim());
    if (isFence) {
      inFence = !inFence;
      rows.push(
        <div className="md-row fence" key={i}>
          <span className="tok-fence">{line}</span>
        </div>
      );
      return;
    }
    const cls = lineClass(line);
    const heading = /^(#{1,6})(\s?)(.*)$/.exec(line);
    let body: ReactNode;
    if (cls.startsWith("h") && heading) {
      body = (
        <>
          <span className="tok-head">{heading[1]}</span>
          <span>{heading[2]}</span>
          {renderInline(heading[3], files)}
        </>
      );
    } else if (cls === "list") {
      const m = /^(\s*)([-*+]|\d+\.)(\s+)(.*)$/.exec(line);
      body = m ? (
        <>
          <span>{m[1]}</span>
          <span className="tok-list">{m[2]}</span>
          <span>{m[3]}</span>
          {renderInline(m[4], files)}
        </>
      ) : (
        renderInline(line, files)
      );
    } else if (cls === "quote") {
      const m = /^(>)(\s?)(.*)$/.exec(line);
      body = m ? (
        <>
          <span className="tok-quote">{m[1]}</span>
          <span>{m[2]}</span>
          {renderInline(m[3], files)}
        </>
      ) : (
        renderInline(line, files)
      );
    } else if (cls === "hr") {
      body = <span className="tok-hr">{line}</span>;
    } else if (inFence) {
      body = <span className="tok-code-block">{line}</span>;
    } else {
      body = renderInline(line, files);
    }
    const className = `md-row ${cls}`;
    rows.push(
      <div className={className} key={i}>
        {body}
      </div>
    );
  });

  return <div className="nvim-md">{rows}</div>;
}
