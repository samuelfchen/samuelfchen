"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Cell = { ch: string; cls: string; tw?: { chars: string[]; phase: number } };

const randInt = (a: number, b: number) => {
  if (b < a) return a;
  return a + Math.floor(Math.random() * (b - a + 1));
};
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function drawSegment(
  grid: Cell[][],
  x0: number,
  y0: number,
  x1: number,
  y1: number
) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const dist = Math.hypot(dx, dy) || 1;
  const px = -dy / dist;
  const py = dx / dist;
  const sag = (Math.random() - 0.5) * 2.4;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  for (let t = 0; t <= steps; t++) {
    const u = t / steps;
    const bow = sag * Math.sin(u * Math.PI);
    const x = Math.round(x0 + dx * u + px * bow);
    const y = Math.round(y0 + dy * u + py * bow);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) continue;
    grid[y][x] = { ch: "·", cls: "" };
  }
}

function gen(cols: number, rows: number): Cell[][] {
  const grid: Cell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ ch: " ", cls: "" }))
  );

  const regionsX = Math.max(2, Math.round(cols / 14));
  const regionsY = Math.max(2, Math.round(rows / 9));

  for (let ry = 0; ry < regionsY; ry++) {
    for (let rx = 0; rx < regionsX; rx++) {
      if (Math.random() < 0.25) continue;
      const x0 = Math.floor((rx / regionsX) * cols) + 1;
      const x1 = Math.floor(((rx + 1) / regionsX) * cols) - 1;
      const y0 = Math.floor((ry / regionsY) * rows) + 1;
      const y1 = Math.floor(((ry + 1) / regionsY) * rows) - 1;
      if (x1 < x0 || y1 < y0) continue;
      let x = randInt(x0, x1);
      let y = randInt(y0, y1);
      const vertices: [number, number][] = [[x, y]];
      const segs = randInt(3, 5);
      for (let s = 0; s < segs; s++) {
        const dx = randInt(-1, 1);
        let dy = randInt(-1, 1);
        if (dx === 0 && dy === 0) dy = Math.random() < 0.5 ? -1 : 1;
        const len = randInt(2, 6);
        const nx = clamp(x + dx * len, 1, cols - 2);
        const ny = clamp(y + dy * len, 1, rows - 2);
        drawSegment(grid, x, y, nx, ny);
        x = nx;
        y = ny;
        vertices.push([x, y]);
      }
      for (const [vx, vy] of vertices) {
        const big = Math.random() < 0.3;
        grid[vy][vx] = {
          ch: big ? "★" : "✦",
          cls: "",
          tw: {
            chars: big ? ["✦", "★", "✦", "*"] : ["*", "✦", "·", "✦"],
            phase: randInt(0, 3),
          },
        };
      }
    }
  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x].ch === " " && Math.random() < 0.03) {
        grid[y][x] = { ch: "*", cls: "" };
      }
    }
  }

  return grid;
}

function renderRow(cells: Cell[], tick: number) {
  const out: ReactNode[] = [];
  let text = "";
  let cls = "";
  const flush = () => {
    if (!text) return;
    out.push(
      cls ? (
        <span key={out.length} className={cls}>
          {text}
        </span>
      ) : (
        <span key={out.length}>{text}</span>
      )
    );
    text = "";
  };
  for (const c of cells) {
    if (c.tw) {
      flush();
      cls = "";
      out.push(
        <span key={out.length}>
          {c.tw.chars[(tick + c.tw.phase) % c.tw.chars.length]}
        </span>
      );
      continue;
    }
    if (c.cls !== cls) flush();
    cls = c.cls;
    text += c.ch;
  }
  flush();
  return out;
}

export default function Face() {
  const ref = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const cs = getComputedStyle(el);
      const fs = Math.max(parseFloat(cs.fontSize) || 16, 1);
      const charW = Math.max(fs * 0.6, 1);
      const charH = Math.max(fs * 1.4, 1);
      const cols = Math.max(12, Math.min(240, Math.floor(el.clientWidth / charW)));
      const rows = Math.max(8, Math.min(80, Math.floor(el.clientHeight / charH)));
      setGrid(gen(cols, rows));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="face" aria-label="starry night sky">
      <div className="nebula" ref={ref}>
        {grid.map((row, i) => (
          <div key={i} className="neb-row">
            {renderRow(row, tick)}
          </div>
        ))}
      </div>
    </div>
  );
}
