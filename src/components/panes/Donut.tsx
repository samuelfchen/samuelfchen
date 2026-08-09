"use client";

import { useEffect, useRef, useState } from "react";

const { cos, sin, PI, hypot } = Math;
const HALF = PI / 2;
const FULL = PI * 2;
const CHARS = " .,-~:;!=*#$@";

const SUN = [
  cos(HALF / 2) * cos(PI / 3),
  cos(HALF / 2) * sin(PI / 3),
  sin(HALF / 2),
];
const CAM = [160, 0, 0];
const FOV = 350;
const PARAM = [35, 50];
const HOFFSET = FULL / 100;
const VOFFSET = FULL / 40;

function circle(angle: number, radius: number): [number, number] {
  return [radius * cos(angle), radius * sin(angle)];
}

function torus(alfa: number, t: number, w: number, R: number): [number, number, number] {
  const [cx, cy] = circle(t, w / 2);
  const a = cx + R;
  return [a * cos(alfa), a * sin(alfa), cy];
}

function project(point: [number, number, number]): [number, number] {
  const [x, y, z] = point;
  const d = 1 / hypot(CAM[0] - x, CAM[1] - y, CAM[2] - z);
  return [(y * FOV) * d, ((CAM[2] - z) * FOV) * d];
}

function rotateX(v: [number, number, number], a: number): [number, number, number] {
  const sa = sin(a);
  const ca = cos(a);
  return [v[0], v[1] * ca + v[2] * sa, v[1] * cos(a + HALF) + v[2] * sin(a + HALF)];
}
function rotateY(v: [number, number, number], a: number): [number, number, number] {
  const sa = sin(a);
  const ca = cos(a);
  return [v[0] * ca + v[2] * sa, v[1], v[0] * cos(a + HALF) + v[2] * sin(a + HALF)];
}
function rotateZ(v: [number, number, number], a: number): [number, number, number] {
  const sa = sin(a);
  const ca = cos(a);
  return [v[0] * ca + v[1] * sa, v[0] * cos(a + HALF) + v[1] * sin(a + HALF), v[2]];
}
function rotate(v: [number, number, number], rx: number, ry: number, rz: number): [number, number, number] {
  return rotateZ(rotateY(rotateX(v, rx), ry), rz);
}

export default function Donut() {
  const ref = useRef<HTMLPreElement>(null);
  const [dims, setDims] = useState({ cols: 80, rows: 44 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const parent = el.parentElement!;
      const cs = getComputedStyle(el);
      const fs = parseFloat(cs.fontSize) || 16;
      const charW = fs * 0.61;
      const charH = fs * 1.2;
      setDims({
        cols: Math.max(20, Math.floor(parent.clientWidth / charW)),
        rows: Math.max(8, Math.floor(parent.clientHeight / charH)),
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el.parentElement!);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let id: number;
    let ax = 0, ay = 0, az = 0;

    const render = () => {
      const { cols, rows } = dims;
      const zbuf: number[] = new Array(cols * rows).fill(0);
      const fbuf: number[] = new Array(cols * rows).fill(0);

      const [sx, sy, sz] = SUN;

      for (let a = 0; a <= FULL; a += HOFFSET) {
        for (let t = 0; t < FULL; t += VOFFSET) {
          const [w, r] = PARAM;
          const p = rotate(torus(a, t, w, r), ax, ay, az);
          const n = rotate(torus(a, t, w + 2, r), ax, ay, az);

          const [px, py, pz] = p;
          const [nx, ny, nz] = n;
          const na = nx - px;
          const nb = ny - py;
          const nc = nz - pz;

          const [projX, projY] = project(p);
          const cx = Math.floor(cols / 2 + projX * 0.145);
          const cy = Math.floor(rows / 2 + projY * 0.0725);

          if (cy < 0 || cy >= rows || cx < 0 || cx >= cols) continue;

          const d = 1 / hypot(CAM[0] - px, CAM[1] - py, CAM[2] - pz);
          const idx = cx + cy * cols;

          if (zbuf[idx] < d) {
            zbuf[idx] = d;
            const lit = na * sx + nb * sy + nc * sz;
            fbuf[idx] = Math.max(0, Math.min(1, (lit + 1) / 2));
          }
        }
      }

      const pixels: string[] = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const v = fbuf[x + y * cols];
          const ci = Math.round(v * (CHARS.length - 1));
          pixels.push(CHARS[ci] ?? " ");
        }
        if (y < rows - 1) pixels.push("\n");
      }

      if (ref.current) ref.current.textContent = pixels.join("");

      ax += 0.02 + Math.random() * 0.03;
      ay += 0.02 + Math.random() * 0.03;
      az += 0.02 + Math.random() * 0.03;
    };

    const loop = () => {
      render();
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [dims]);

  return <pre ref={ref} className="donut" />;
}