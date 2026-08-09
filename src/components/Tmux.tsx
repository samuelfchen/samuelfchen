"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Pane from "./Pane";
import VimNav from "./VimNav";
import Face from "./panes/Face";
import Log from "./panes/Log";
import type { GitInfo } from "../lib/git";

const EMAIL = "[EMAIL]";

const LINKS = [
  { name: "github", icon: "\uf09b", short: "gh", href: "https://github.com/samuelfchen" },
  { name: "linkedin", icon: "\uf08c", short: "in", href: "https://linkedin.com/in/samuelfchen" },
];

function slugOf(pathname: string): string {
  const clean = pathname.replace(/^\//, "");
  return clean === "" ? "index" : clean;
}

export default function Tmux({
  children,
  git,
}: {
  children: React.ReactNode;
  git: GitInfo;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const slug = slugOf(pathname);
  const [tabs, setTabs] = useState<string[]>(["index"]);
  const [prevSlug, setPrevSlug] = useState<string | null>(null);
  const [pos, setPos] = useState({ row: 1, col: 1 });
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const tabsRef = useRef<HTMLDivElement | null>(null);

  const handleCopy = () => {
    void navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1500);
  };

  if (prevSlug !== slug) {
    setPrevSlug(slug);
    setTabs((t) => (t.includes(slug) ? t : [...t, slug]));
  }

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    let raf = 0;
    const check = () => {
      if (el.scrollWidth > el.clientWidth + 1) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          setTabs((cur) => {
            const target = cur.find((t) => t !== "index" && t !== slug);
            return target ? cur.filter((t) => t !== target) : cur;
          });
        });
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", check);
    };
  }, [tabs, slug]);

  const open = (s: string) => router.push(s === "index" ? "/" : `/${s}`);

  const prevTab = () => {
    const i = tabs.indexOf(slug);
    if (i <= 0) return;
    open(tabs[i - 1]);
  };

  const nextTab = () => {
    const i = tabs.indexOf(slug);
    if (i < 0 || i >= tabs.length - 1) return;
    open(tabs[i + 1]);
  };

  const close = (s: string) => {
    if (s === "index") return;
    const i = tabs.indexOf(s);
    if (i === -1) return;
    const next = tabs.filter((x) => x !== s);
    setTabs(next);
    if (s === slug && next.length) {
      open(next[Math.min(i, next.length - 1)]);
    }
  };

  return (
    <div className="tmux">
      <div className="tmx-status">
        <div className="tmx-wins">
          <span className="tmx-session">samuelfchen</span>
          <span className="tmx-win active">0:main</span>
          {LINKS.map((l, i) => (
            <a
              key={l.name}
              className="tmx-win"
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="tmx-label">
                {i + 1}:{l.name}
              </span>
              <span className="tmx-icon" aria-hidden="true">
                {l.icon}
              </span>
              <span className="tmx-short">{l.short}</span>
            </a>
          ))}
          <span className="tmx-win tmx-email">
            <span className="tmx-label">
              <span
                role="button"
                tabIndex={0}
                aria-label="Copy email to clipboard"
                onClick={handleCopy}
                onKeyDown={(e) => { if (e.key === "Enter") handleCopy(); }}
              >
                {copied ? "copied!" : "3:email"}
              </span>
            </span>
            <span
              className="tmx-short"
              role="button"
              tabIndex={0}
              aria-label="Copy email to clipboard"
              onClick={handleCopy}
              onKeyDown={(e) => { if (e.key === "Enter") handleCopy(); }}
            >
              {copied ? "done" : "[copy]"}
            </span>
          </span>
        </div>
        <span className="tmx-host">macbook-m1-pro</span>
      </div>

      <div className="tmx-panes">
        <div className="col-left">
          <Pane>
            <Face />
          </Pane>
          <Pane>
            <Log branch={git.branch} log={git.log} />
          </Pane>
        </div>
        <div className="col-right">
          <Pane active>
            <div className="nvim" aria-label={`nvim editing ${slug}.md`}>
              <div className="nvim-tabs" ref={tabsRef}>
                {tabs.map((t, i) => (
                  <span key={t}>
                    {i > 0 && (
                      <span
                        className={`nvim-sep${slug === t ? " active" : ""}`}
                      >
                        {slug === t ? "▍" : "▕"}
                      </span>
                    )}
                    <button
                      type="button"
                      className={`nvim-tab${slug === t ? " active" : ""}`}
                      onClick={() => open(t)}
                    >
                      <span className="nvim-ind">
                        {slug === t && i === 0 ? "▍" : ""}
                      </span>
                      <span className="nvim-ic"></span>
                      <span> {t}.md</span>
                      {t !== "index" && (
                        <span
                          className="nvim-close"
                          role="button"
                          aria-label={`close ${t}.md`}
                          onClick={(e) => {
                            e.stopPropagation();
                            close(t);
                          }}
                        >
                          
                        </span>
                      )}
                    </button>
                  </span>
                ))}
              </div>

              <VimNav
                key={slug}
                slug={slug}
                onOpen={open}
                onClose={() => close(slug)}
                onPrevTab={prevTab}
                onNextTab={nextTab}
                onPosChange={(row, col) => setPos({ row, col })}
              >
                {children}
              </VimNav>

              <div className="nvim-hint">
                <span>j/k move · h/l char · w/e/b word · enter open link · H/L buffer · x close</span>
              </div>
              <div className="nvim-status">
                <span>
                  <span className="st-mode">N</span>
                  <span className="st-git">   main</span>
                  <span className="st-file">   -  {slug}.md</span>
                </span>
                <span>
                  <span className="st-ft">   markdown</span>
                  <span className="st-pos">  {pos.row}:{pos.col}</span>
                </span>
              </div>
            </div>
          </Pane>
        </div>
      </div>
    </div>
  );
}
