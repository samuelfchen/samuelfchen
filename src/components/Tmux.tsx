"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Pane from "./Pane";
import Face from "./panes/Face";
import Log from "./panes/Log";
import type { GitInfo } from "../lib/git";

const LINKS = [
  { name: "github", href: "https://github.com/samuelfchen" },
  { name: "linkedin", href: "https://linkedin.com/in/samuelfchen" },
  { name: "email", href: "mailto:hi@samuelfchen.com" },
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

  if (prevSlug !== slug) {
    setPrevSlug(slug);
    setTabs((t) => (t.includes(slug) ? t : [...t, slug]));
  }

  const open = (s: string) => router.push(s === "index" ? "/" : `/${s}`);

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
              {i + 1}:{l.name}
            </a>
          ))}
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
              <div className="nvim-tabs">
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

              <div className="nvim-buf">{children}</div>

              <div className="nvim-status">
                <span>
                  <span className="st-mode">N</span>
                  <span className="st-git">   main</span>
                  <span className="st-file">   -  {slug}.md</span>
                </span>
                <span>
                  <span className="st-ft">   markdown</span>
                  <span className="st-pos">  1:1</span>
                </span>
              </div>
            </div>
          </Pane>
        </div>
      </div>
    </div>
  );
}
