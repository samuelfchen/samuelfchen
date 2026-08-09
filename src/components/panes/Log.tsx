"use client";

import { useEffect, useState } from "react";

type Commit = { hash: string; refs: string; subject: string; ts: number };

function parseLog(log: string): Commit[] {
  return log
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [hash = "", refs = "", subject = "", tsRaw = ""] = line.split("\x1f");
      return { hash, refs, subject, ts: parseInt(tsRaw, 10) || 0 };
    });
}

const UNITS: [number, string][] = [
  [60, "sec"],
  [60, "min"],
  [24, "hour"],
  [30, "day"],
  [12, "month"],
  [Infinity, "year"],
];

function ago(ts: number): string {
  if (!ts) return "";
  let diff = Math.max(0, Math.floor((Date.now() - ts * 1000) / 1000));
  for (const [div, label] of UNITS) {
    if (diff < div) return `${diff} ${label}${diff !== 1 ? "s" : ""} ago`;
    diff = Math.floor(diff / div);
  }
  return "";
}

export default function Log({
  branch,
  log,
}: {
  branch: string;
  log: string;
}) {
  const commits = parseLog(log);
  const [, bump] = useState(0);

  useEffect(() => {
    const id = setInterval(() => bump((n) => n + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="log">
      <div>
        <span className="pk-path">~/samuelfchen</span>{" "}
        <span className="pk-name">{branch}</span>
      </div>
      <div>
        <span className="pk-arrow">❯</span>{" "}
        <span className="pk-arrow">git</span> log --oneline --decorate -n 10
      </div>
      {commits.map((c, i) => (
        <div className="log-cmt" key={i}>
          <span className="graph">* </span>
          <span className="meta">{c.hash}</span>
          {c.refs && <span className="ref"> {c.refs}</span>}
          <span className="msg"> {c.subject}</span>
          <span className="log-date"> ({ago(c.ts)})</span>
        </div>
      ))}
      <div className="blink">▋</div>
    </div>
  );
}
