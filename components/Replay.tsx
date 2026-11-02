"use client";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { Reveal, SectionHead, useReduced } from "./ui";

// A scripted replay of one trade: candles are drawn one by one, and each agent step lands
// on the chart and in the log at its candle. Sample data, labeled as such.

const N = 64;
const STEP = 340; // ms per candle
const HOLD = 4200;
const W = 760;
const H = 420;
const VOL_H = 64;
const PAD = { l: 8, r: 64, t: 18, b: 8 };

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Candle = { o: number; h: number; l: number; c: number; v: number };

function series(): Candle[] {
  const r = rng(7);
  const target = (i: number) =>
    i < 20 ? 0.0212 + Math.sin(i / 3) * 0.0004 : i < 34 ? 0.0206 + (i - 20) * 0.00003 : i < 57 ? 0.0212 + (i - 34) * 0.00052 : 0.0331 - (i - 57) * 0.00022;
  const out: Candle[] = [];
  let prev = 0.0212;
  for (let i = 0; i < N; i++) {
    const c = target(i) + (r() - 0.5) * 0.0011;
    const o = prev;
    const h = Math.max(o, c) + r() * 0.0006;
    const l = Math.min(o, c) - r() * 0.0006;
    const v = 0.3 + r() * 0.7 + (i > 34 && i < 57 ? 0.8 : 0) + (i === 8 ? 1.2 : 0);
    out.push({ o, h, l, c, v });
    prev = c;
  }
  return out;
}

const kindColor: Record<string, string> = { discover: "#516af6", notrade: "#9a9cb3", buy: "#21c95e", sell: "#ff622e" };
const agentColor: Record<string, string> = {
  Scout: "text-[#9aa8ff]",
  Security: "text-up",
  "On-chain": "text-[#7fd0ff]",
  Strategy: "text-[#c3a6ff]",
  Quant: "text-warn",
  Risk: "text-up",
  Execution: "text-text",
  Position: "text-down",
};

export default function Replay() {
  const { t } = useT();
  const r = t.replay;
  const candles = useMemo(series, []);
  const reduce = useReduced();
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { amount: 0.3 });
  const [i, setI] = useState(N);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce) return setI(N);
    if (!inView) return;
    setI(4);
  }, [inView, reduce, run]);

  useEffect(() => {
    if (reduce || !inView) return;
    if (i >= N) {
      const id = setTimeout(() => setI(4), HOLD);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setI((x) => x + 1), STEP);
    return () => clearTimeout(id);
  }, [i, inView, reduce]);

  const lo = Math.min(...candles.map((c) => c.l)) * 0.97;
  const hi = Math.max(...candles.map((c) => c.h)) * 1.02;
  const plotH = H - VOL_H - PAD.t - PAD.b;
  const y = (v: number) => PAD.t + (1 - (v - lo) / (hi - lo)) * plotH;
  const cw = (W - PAD.l - PAD.r) / N;
  const x = (k: number) => PAD.l + k * cw + cw / 2;
  const vmax = Math.max(...candles.map((c) => c.v));

  const shown = candles.slice(0, i);
  const last = shown[shown.length - 1] ?? candles[0];
  const chg = ((last.c - candles[0].o) / candles[0].o) * 100;
  const lines = r.lines.filter(([at]) => at < i);
  const markers = lines.filter(([, , , k]) => k);
  const checksDone = Math.max(0, Math.min(5, i - 34));
  const grid = [0.25, 0.5, 0.75].map((f) => lo + (hi - lo) * f);

  return (
    <section id="replay" className="wrap py-16 sm:py-24">
      <SectionHead eyebrow={r.eyebrow} title={r.title} sub={r.sub} />
      <Reveal className="mt-10">
        <div ref={box} className="relative overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_40px_120px_-40px_rgba(81,106,246,0.45)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full bg-gradient-to-br from-[#ff7ad9] via-[#8f7bff] to-[#4cc9f0]" />
              <div>
                <p className="text-[14px] font-semibold">{r.pair}</p>
                <p className="num text-[12px] text-muted">
                  ${last.c.toFixed(5)} <span className={chg >= 0 ? "text-up" : "text-down"}>{(chg >= 0 ? "+" : "") + chg.toFixed(2)}%</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-warn/10 px-2 py-1 text-[11px] font-semibold text-warn">{r.sample}</span>
              {!reduce && (
                <button onClick={() => setRun((n) => n + 1)} className="rounded-md border border-line px-2.5 py-1 text-[12px] text-muted transition-colors hover:border-white/25 hover:text-text">
                  ↻ {r.restart}
                </button>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.65fr_1fr]">
            <div className="relative flex items-center border-b border-line p-2 sm:p-4 lg:border-b-0 lg:border-r">
              <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={r.pair}>
                {grid.map((g) => (
                  <g key={g}>
                    <line x1={PAD.l} x2={W - PAD.r} y1={y(g)} y2={y(g)} stroke="rgba(203,208,235,0.07)" />
                    <text x={W - PAD.r + 8} y={y(g) + 4} fontSize="10" fill="#62647a" className="num">
                      {g.toFixed(4)}
                    </text>
                  </g>
                ))}
                {shown.map((c, k) => {
                  const up = c.c >= c.o;
                  const col = up ? "#21c95e" : "#ff622e";
                  return (
                    <g key={k}>
                      <line x1={x(k)} x2={x(k)} y1={y(c.h)} y2={y(c.l)} stroke={col} strokeWidth="1" />
                      <rect x={x(k) - cw * 0.32} width={cw * 0.64} y={y(Math.max(c.o, c.c))} height={Math.max(1, Math.abs(y(c.o) - y(c.c)))} fill={col} rx="0.5" />
                      <rect x={x(k) - cw * 0.32} width={cw * 0.64} y={H - PAD.b - (c.v / vmax) * (VOL_H - 6)} height={(c.v / vmax) * (VOL_H - 6)} fill={col} opacity="0.28" />
                    </g>
                  );
                })}
                {/* last price line */}
                <line x1={PAD.l} x2={W - PAD.r} y1={y(last.c)} y2={y(last.c)} stroke="#ff622e" strokeDasharray="3 3" opacity="0.6" />
                <rect x={W - PAD.r + 2} y={y(last.c) - 9} width={PAD.r - 4} height="18" rx="3" fill={last.c >= last.o ? "#21c95e" : "#ff622e"} />
                <text x={W - PAD.r + 8} y={y(last.c) + 4} fontSize="10.5" fill="#fff" fontWeight="600" className="num">
                  {last.c.toFixed(4)}
                </text>
                {/* agent markers */}
                <AnimatePresence>
                  {markers.map(([at, , , kind]) => {
                    const c = candles[at];
                    const below = kind !== "sell";
                    const yy = below ? y(c.l) + 16 : y(c.h) - 16;
                    return (
                      <motion.g key={at} initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} style={{ transformOrigin: `${x(at)}px ${yy}px` }}>
                        <circle cx={x(at)} cy={yy} r="11" fill={kindColor[kind]} opacity="0.18" />
                        {kind === "buy" && <path d={`M${x(at)} ${yy - 6} l5 7 h-10 z`} fill={kindColor[kind]} />}
                        {kind === "sell" && <path d={`M${x(at)} ${yy + 6} l5 -7 h-10 z`} fill={kindColor[kind]} />}
                        {kind === "discover" && <circle cx={x(at)} cy={yy} r="4.5" fill={kindColor[kind]} />}
                        {kind === "notrade" && <rect x={x(at) - 4} y={yy - 4} width="8" height="8" fill={kindColor[kind]} />}
                        <text x={x(at)} y={below ? yy + 24 : yy - 16} textAnchor="middle" fontSize="10" fontWeight="700" fill={kindColor[kind]}>
                          {kind === "discover" ? "DISCOVER" : kind === "notrade" ? "NO_TRADE" : kind === "buy" ? "BUY $20" : "SELL ½"}
                        </text>
                      </motion.g>
                    );
                  })}
                </AnimatePresence>
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex-1 p-4 sm:p-5">
                <p className="mb-3 text-[12px] font-semibold text-muted">{r.log}</p>
                <ul className="space-y-2 font-mono text-[12px] leading-snug sm:min-h-[17rem]">
                  <AnimatePresence initial={false}>
                    {lines.map(([at, agent, text, kind]) => (
                      <motion.li
                        key={at}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex gap-2 rounded-lg px-2 py-1.5 ${kind === "buy" ? "bg-up/10" : kind === "sell" ? "bg-down/10" : ""}`}
                      >
                        <span className={`w-[5.5rem] shrink-0 font-semibold ${agentColor[agent] ?? "text-text"}`}>{agent}</span>
                        <span className="text-muted">{text}</span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>
              <div className="border-t border-line p-4 sm:p-5">
                <p className="mb-3 flex items-center justify-between text-[12px] font-semibold text-muted">
                  {r.checks}
                  <span className={`num ${checksDone === 5 ? "text-up" : "text-faint"}`}>{checksDone}/5</span>
                </p>
                <ul className="grid grid-cols-1 gap-1.5 text-[12.5px] sm:grid-cols-2">
                  {r.checkItems.map((c, k) => {
                    const ok = k < checksDone;
                    return (
                      <li key={c} className={`flex items-center gap-2 transition-colors ${ok ? "text-text" : "text-faint"}`}>
                        <span className={`grid h-4 w-4 place-items-center rounded-full text-[10px] transition-colors ${ok ? "bg-up text-bg" : "border border-line"}`}>{ok ? "✓" : ""}</span>
                        {c}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
