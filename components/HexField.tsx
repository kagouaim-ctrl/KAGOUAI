"use client";
import { useEffect, useRef } from "react";

// Faint 0-9a-f matrix behind the page. Characters near the pointer brighten a
// little. Max opacity 6%. Off on low-end devices and touch; static under
// reduced motion.

const CELL = 18;
const BASE = 0.025;
const PEAK = 0.06;
const RADIUS = 140;

export default function HexField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const lowEnd =
      (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4 || nav.connection?.saveData === true;
    const fine = matchMedia("(pointer: fine)").matches;
    if (lowEnd || !fine) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const base = document.createElement("canvas");
    const bctx = base.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cols = 0;
    let rows = 0;
    let chars: string[] = [];
    let mouse: { x: number; y: number } | null = null;
    let raf = 0;
    const font = `11px ${getComputedStyle(document.body).getPropertyValue("--font-mono") || "monospace"}, monospace`;

    const setup = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      for (const c of [canvas, base]) {
        c.width = w * dpr;
        c.height = h * dpr;
      }
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);
      chars = Array.from({ length: cols * rows }, () => "0123456789abcdef"[(Math.random() * 16) | 0]);
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.clearRect(0, 0, w, h);
      bctx.font = font;
      bctx.fillStyle = `rgba(237,237,237,${BASE})`;
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) bctx.fillText(chars[r * cols + c], c * CELL + 4, r * CELL + 13);
      draw();
    };

    const draw = () => {
      raf = 0;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(base, 0, 0);
      if (!mouse) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = font;
      const c0 = Math.max(0, Math.floor((mouse.x - RADIUS) / CELL));
      const c1 = Math.min(cols - 1, Math.ceil((mouse.x + RADIUS) / CELL));
      const r0 = Math.max(0, Math.floor((mouse.y - RADIUS) / CELL));
      const r1 = Math.min(rows - 1, Math.ceil((mouse.y + RADIUS) / CELL));
      for (let r = r0; r <= r1; r++)
        for (let c = c0; c <= c1; c++) {
          const d = Math.hypot(c * CELL + 8 - mouse.x, r * CELL + 9 - mouse.y);
          if (d > RADIUS) continue;
          const a = (PEAK - BASE) * (1 - d / RADIUS) ** 2;
          ctx.fillStyle = `rgba(237,237,237,${a})`;
          ctx.fillText(chars[r * cols + c], c * CELL + 4, r * CELL + 13);
        }
    };

    const onMove = (e: PointerEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const onLeave = () => {
      mouse = null;
      if (!raf) raf = requestAnimationFrame(draw);
    };

    setup();
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setup, 150);
    };
    window.addEventListener("resize", onResize);
    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }
    canvas.style.opacity = "1";
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-0 transition-opacity duration-700"
    />
  );
}
