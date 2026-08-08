"use client";

import { useEffect, useState } from "react";

const LINE = 'echo "wip"';

export default function Page() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(LINE.slice(0, i));
      if (i >= LINE.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 90);
    return () => clearInterval(id);
  }, []);

  return (
    <main>
      <div className="prompt">
        <p className="line">
          <span className="cwd">~/samuelfchen</span>
          <span className="dir"> portfolio</span>
        </p>
        <p className="line" aria-label={LINE}>
          <span className="arrow">❯</span>
          <span> {typed}</span>
          <span className={`cursor${done ? " blink" : ""}`}>▋</span>
        </p>
      </div>

      <div className="corner left">
        <a
          className="icon"
          data-tooltip="github"
          href="https://github.com/samuelfchen"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="github"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        </a>
        <a
          className="icon"
          data-tooltip="linkedin"
          href="https://linkedin.com/in/samuelfchen"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="linkedin"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V9h4v1.2A6 6 0 0 1 16 8z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
      </div>

      <div className="corner right">
        <a
          className="v1"
          data-tooltip="2021 — My first portfolio website, built in GatsbyJS"
          href="https://v1.samuelfchen.com"
        >
          v1
        </a>
      </div>
    </main>
  );
}
