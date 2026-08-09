"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const ROW_SELECTOR = ".md-row";
const STORAGE_KEY = "nvim-pos";

function loadPos(): Record<string, { row: number; col: number }> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function savePos(slug: string, row: number, col: number) {
  try {
    const all = loadPos();
    all[slug] = { row, col };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {}
}

function lineOf(el: HTMLElement) {
  const before = getComputedStyle(el, "::before").content;
  let prefix = "";
  if (before !== "none" && before.startsWith('"')) {
    prefix = before.slice(1, -1);
  }
  const text = el.textContent ?? "";
  return { prefix, text, line: prefix + text };
}

function nextWordStart(line: string, from: number): number {
  const n = line.length;
  let p = from;
  if (p >= n) return n;
  while (p < n && /\S/.test(line[p])) p++;
  while (p < n && /\s/.test(line[p])) p++;
  return p;
}

function nextWordEnd(line: string, from: number): number {
  const n = line.length;
  if (n === 0) return 0;
  if (from >= n - 1) return n - 1;
  let p = from;
  if (p + 1 < n && /\S/.test(line[p + 1])) {
    while (p + 1 < n && /\S/.test(line[p + 1])) p++;
  } else {
    while (p + 1 < n && /\s/.test(line[p + 1])) p++;
    while (p + 1 < n && /\S/.test(line[p + 1])) p++;
  }
  return p;
}

function prevWordStart(line: string, from: number): number {
  let p = from;
  while (p > 0 && /\s/.test(line[p - 1])) p--;
  const atWordStart = p === 0 || /\s/.test(line[p - 1]);
  if (!atWordStart) {
    while (p > 0 && /\S/.test(line[p - 1])) p--;
  }
  return p;
}

function firstWordStart(line: string): number {
  let p = 0;
  while (p < line.length && /\s/.test(line[p])) p++;
  return p;
}

function firstWordEnd(line: string): number {
  let e = firstWordStart(line);
  while (e < line.length - 1 && /\S/.test(line[e + 1])) e++;
  return e;
}

function lastWordEnd(line: string): number {
  let e = line.length - 1;
  while (e >= 0 && /\s/.test(line[e])) e--;
  return Math.max(0, e);
}

export default function VimNav({
  children,
  slug,
  onOpen,
  onClose,
  onPrevTab,
  onNextTab,
  onPosChange,
}: {
  children: React.ReactNode;
  slug: string;
  onOpen: (s: string) => void;
  onClose: () => void;
  onPrevTab: () => void;
  onNextTab: () => void;
  onPosChange?: (row: number, col: number) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const onPosChangeRef = useRef(onPosChange);

  useEffect(() => {
    onPosChangeRef.current = onPosChange;
  });
  const hoverQuery = useMemo(
    () =>
      typeof window === "undefined"
        ? null
        : window.matchMedia("(hover: hover) and (pointer: fine)"),
    []
  );

  const enabled = useSyncExternalStore(
    (onStoreChange) => {
      if (!hoverQuery) return () => {};
      hoverQuery.addEventListener("change", onStoreChange);
      return () => hoverQuery.removeEventListener("change", onStoreChange);
    },
    () => hoverQuery?.matches ?? false,
    () => false
  );
  const [row, setRow] = useState(() => {
    const cached = loadPos()[slug];
    return cached?.row ?? 0;
  });
  const rowsRef = useRef<HTMLElement[]>([]);
  const rowRef = useRef(row);
  const colRef = useRef(0);
  const gRef = useRef(false);
  const gTimer = useRef(0);

  useEffect(() => {
    const cached = loadPos()[slug];
    if (cached) {
      colRef.current = cached.col;
    }
  }, [slug]);

  const position = useCallback(() => {
    const host = hostRef.current;
    const cursor = cursorRef.current;
    if (!host || !cursor) return;
    const target = rowsRef.current[rowRef.current];
    if (!target) return;
    const hostRect = host.getBoundingClientRect();
    const rowRect = target.getBoundingClientRect();
    const cs = getComputedStyle(target);
    const padL = parseFloat(cs.paddingLeft) || 0;
    const padT = parseFloat(cs.paddingTop) || 0;
    const { prefix, text } = lineOf(target);
    const maxCol = Math.max(0, prefix.length + text.length - 1);
    const col = Math.max(0, Math.min(colRef.current, maxCol));
    colRef.current = col;
    const cellW = cursor.getBoundingClientRect().width || 1;
    cursor.style.left = `${rowRect.left - hostRect.left + padL + col * cellW}px`;
    cursor.style.top = `${rowRect.top - hostRect.top + padT}px`;
    const ch = col < prefix.length ? prefix[col] : text[col - prefix.length] ?? " ";
    cursor.textContent = ch;
    onPosChangeRef.current?.(rowRef.current + 1, col + 1);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !enabled) return;
    host.focus();

    const go = (i: number) => {
      const rows = rowsRef.current;
      if (!rows.length) return;
      const next = Math.max(0, Math.min(i, rows.length - 1));
      setRow(next);
      rowRef.current = next;
      rows[next].scrollIntoView({ block: "nearest" });
    };

    const wordMove = (dir: "w" | "e" | "b") => {
      const rows = rowsRef.current;
      if (!rows.length) return;
      let r = rowRef.current;
      let c = colRef.current;
      const line = () => lineOf(rows[r]).line;
      if (dir === "w") {
        const next = nextWordStart(line(), c);
        if (next < line().length) {
          c = next;
        } else if (r < rows.length - 1) {
          r++;
          c = firstWordStart(line());
        } else {
          c = Math.max(0, line().length - 1);
        }
      } else if (dir === "e") {
        const next = nextWordEnd(line(), c);
        if (next > c) {
          c = next;
        } else if (r < rows.length - 1) {
          r++;
          c = firstWordEnd(line());
        } else {
          c = Math.max(0, line().length - 1);
        }
      } else {
        const next = prevWordStart(line(), c);
        if (next < c) {
          c = next;
        } else if (r > 0) {
          r--;
          c = lastWordEnd(line());
        } else {
          c = 0;
        }
      }
      rowRef.current = r;
      setRow(r);
      colRef.current = c;
      rows[r].scrollIntoView({ block: "nearest" });
      position();
    };

    const linkAtCol = (el: Element, col: number): HTMLAnchorElement | null => {
      let pos = 0;
      const walk = (node: Node): HTMLAnchorElement | null => {
        if (node.nodeType === 3) {
          const len = node.textContent?.length ?? 0;
          pos += len;
          if (col < pos) return null;
        } else if (node.nodeType === 1) {
          const e = node as HTMLElement;
          const start = pos;
          if (e.tagName === "A" && e.getAttribute("href")) {
            const len = e.textContent?.length ?? 0;
            if (col >= start && col < start + len) {
              return e as HTMLAnchorElement;
            }
            pos += len;
          } else {
            for (let i = 0; i < e.childNodes.length; i++) {
              const r = walk(e.childNodes[i]);
              if (r) return r;
            }
          }
        }
        return null;
      };
      for (let i = 0; i < el.childNodes.length; i++) {
        const r = walk(el.childNodes[i]);
        if (r) return r;
      }
      return null;
    };

    const follow = () => {
      const el = rowsRef.current[rowRef.current];
      let a = el ? linkAtCol(el, colRef.current) : null;
      if (!a) a = el?.querySelector<HTMLAnchorElement>("a[href]");
      const href = a?.getAttribute("href");
      if (!href) return;
      savePos(slug, rowRef.current, colRef.current);
      if (href.startsWith("/")) onOpen(href.replace(/^\//, ""));
      else window.open(href, "_blank", "noopener");
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (gRef.current) {
        gRef.current = false;
        clearTimeout(gTimer.current);
        if (e.key === "g") {
          e.preventDefault();
          go(0);
        } else if (e.key === "x" || e.key === "e") {
          e.preventDefault();
          follow();
        }
        return;
      }
      switch (e.key) {
        case "j":
          e.preventDefault();
          go(rowRef.current + 1);
          break;
        case "k":
          e.preventDefault();
          go(rowRef.current - 1);
          break;
        case "h":
          e.preventDefault();
          colRef.current -= 1;
          position();
          break;
        case "l":
          e.preventDefault();
          colRef.current += 1;
          position();
          break;
        case "0":
          e.preventDefault();
          colRef.current = 0;
          position();
          break;
        case "$":
          e.preventDefault();
          colRef.current = Number.MAX_SAFE_INTEGER;
          position();
          break;
        case "w":
          e.preventDefault();
          wordMove("w");
          break;
        case "e":
          e.preventDefault();
          wordMove("e");
          break;
        case "b":
          e.preventDefault();
          wordMove("b");
          break;
        case "H":
          if (e.repeat) break;
          e.preventDefault();
          onPrevTab();
          break;
        case "L":
          if (e.repeat) break;
          e.preventDefault();
          onNextTab();
          break;
        case "g":
          e.preventDefault();
          gRef.current = true;
          gTimer.current = window.setTimeout(() => {
            gRef.current = false;
          }, 600);
          break;
        case "G":
          e.preventDefault();
          go(Number.MAX_SAFE_INTEGER);
          break;
        case "x":
          e.preventDefault();
          onClose();
          break;
        case "Enter":
          e.preventDefault();
          follow();
          break;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(gTimer.current);
    };
  }, [enabled, slug, onClose, onOpen, onPrevTab, onNextTab, position]);

  useEffect(() => {
    const host = hostRef.current;
    const cursor = cursorRef.current;
    if (!host || !cursor || !enabled) return;
    const rows = Array.from(
      host.querySelectorAll<HTMLElement>(ROW_SELECTOR)
    ).filter((el) => el.offsetParent !== null);
    rowsRef.current = rows;
    if (!rows.length) return;
    rows.forEach((el) => el.classList.remove("cursor-line"));
    const clamped = Math.min(row, rows.length - 1);
    rows[clamped].classList.add("cursor-line");
    rowRef.current = clamped;

    const md = host.querySelector<HTMLElement>(".nvim-md");
    position();
    md?.addEventListener("scroll", position);
    window.addEventListener("resize", position);
    let cancelled = false;
    document.fonts?.ready?.then(() => {
      if (!cancelled) position();
    });
    return () => {
      md?.removeEventListener("scroll", position);
      window.removeEventListener("resize", position);
      cancelled = true;
    };
  }, [row, slug, enabled, position]);

  const onMouseDown = (e: React.MouseEvent) => {
    const host = hostRef.current;
    if (!host || !enabled) return;
    host.focus();
    const target = e.target as Element;
    const rowEl = target.closest<HTMLElement>(ROW_SELECTOR);
    if (!rowEl) return;
    const idx = rowsRef.current.indexOf(rowEl);
    if (idx >= 0) {
      setRow(idx);
      rowRef.current = idx;
      const rowRect = rowEl.getBoundingClientRect();
      const cs = getComputedStyle(rowEl);
      const padL = parseFloat(cs.paddingLeft) || 0;
      const hitX = e.clientX - rowRect.left - padL;
      const cursor = cursorRef.current;
      const cw = cursor?.getBoundingClientRect().width || 7.2;
      colRef.current = Math.max(0, Math.floor(hitX / cw));
      position();
    }
    savePos(slug, rowRef.current, colRef.current);
  };

  return (
    <div
      ref={hostRef}
      className={`nvim-buf${enabled ? " cursor-on" : ""}`}
      tabIndex={0}
      onMouseDown={onMouseDown}
    >
      {children}
      <div ref={cursorRef} className="nvim-cursor" aria-hidden="true" />
    </div>
  );
}
