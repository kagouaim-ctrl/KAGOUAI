"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { Reveal, useReduced } from "./ui";

// Looping demo: a chat message tries to order a trade; the risk engine never sees it as input.
// phase 0 typing · 1 sent · 2..4 engine lines · 5 verdict
export default function Injection() {
  const { t } = useT();
  const d = t.injection;
  const reduce = useReduced();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [c, setC] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setC(0);
    setPhase(0);
  }, [d.msg]);

  useEffect(() => {
    if (reduce) {
      setC(d.msg.length);
      setPhase(5);
      return;
    }
    if (!inView) return;
    if (phase === 0) {
      if (c < d.msg.length) {
        const id = setTimeout(() => setC((x) => x + 1), 38);
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setPhase(1), 400);
      return () => clearTimeout(id);
    }
    if (phase < 5) {
      const id = setTimeout(() => setPhase((p) => p + 1), 650);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setC(0);
      setPhase(0);
    }, 3600);
    return () => clearTimeout(id);
  }, [c, phase, inView, reduce, d.msg.length]);

  return (
    <Reveal className="mt-12">
      <div ref={ref} className="relative overflow-hidden rounded-3xl border border-line bg-surface p-5 sm:p-8">
        <div aria-hidden className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-down/10 blur-[90px]" />
        <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-up/10 blur-[90px]" />
        <p className="relative text-[13px] font-semibold text-muted">{d.title}</p>
        <div className="relative mt-6 grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
          <div>
            <p className="mb-2 text-[12px] text-faint">{d.from}</p>
            <div className={`min-h-[4.5rem] rounded-2xl rounded-tl-md border px-4 py-3 text-[15px] leading-relaxed transition-colors ${phase >= 1 ? "border-down/40 bg-down/10" : "border-line bg-raised"}`}>
              {d.msg.slice(0, c)}
              {phase === 0 && !reduce && <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulseDot bg-text" />}
            </div>
          </div>
          <div aria-hidden className="flex justify-center">
            <motion.div
              animate={{ opacity: phase >= 1 ? 1 : 0.3, scale: phase >= 1 && phase < 5 ? [1, 1.08, 1] : 1 }}
              transition={{ duration: 0.6, repeat: phase >= 1 && phase < 5 ? Infinity : 0 }}
              className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-bg"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-up" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
                <path d="M12 3 4 6v6c0 4.4 3.4 8 8 9 4.6-1 8-4.6 8-9V6l-8-3Z" />
                {phase >= 5 && <path d="m8.5 12 2.5 2.5 4.5-5" strokeLinecap="round" />}
              </svg>
            </motion.div>
          </div>
          <div className="rounded-2xl border border-line bg-bg p-4 font-mono text-[12.5px]">
            <p className="mb-3 font-sans text-[12px] font-semibold text-muted">{d.engine}</p>
            <ul className="space-y-2">
              {d.lines.map((l, k) => (
                <li key={l} className={`flex items-center gap-2 transition-opacity duration-300 ${phase >= k + 2 ? "opacity-100" : "opacity-0"}`}>
                  <span className="text-faint">›</span>
                  <span className={k === 2 ? "text-up" : "text-text"}>{l}</span>
                </li>
              ))}
            </ul>
            <p className={`mt-4 inline-flex items-center gap-2 rounded-lg bg-up/15 px-3 py-1.5 font-sans text-[13px] font-semibold text-up transition-all duration-300 ${phase >= 5 ? "opacity-100" : "translate-y-1 opacity-0"}`}>
              ✓ {d.verdict}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
