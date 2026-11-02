"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { langs, useT } from "@/lib/i18n";
import { fmtPct, fmtPrice } from "@/lib/market";

// Fades content up once when it scrolls into view.
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.7, 0.1, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ eyebrow, title, sub, center = false }: { eyebrow: string; title: string; sub?: string; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-[52rem] text-center" : "max-w-[52rem]"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h-section mt-3">{title}</h2>
      {sub && <p className="mt-4 text-[16px] leading-relaxed text-muted sm:text-[17px]">{sub}</p>}
    </Reveal>
  );
}

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useT();
  return (
    <div className={`flex items-center rounded-lg border border-line p-0.5 text-[12px] font-medium ${className}`} role="group" aria-label="Language">
      {langs.map((l) => (
        <button
          key={l.id}
          onClick={() => setLang(l.id)}
          aria-pressed={lang === l.id}
          className={`rounded-md px-2 py-1 transition-colors ${lang === l.id ? "bg-white/10 text-text" : "text-muted hover:text-text"}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

// $0.0{5}2843 is rendered with a subscript zero count, the way trading terminals do.
export function Price({ v }: { v: number }) {
  const s = fmtPrice(v);
  const m = s.match(/^\$0\.0\{(\d+)\}(\d+)$/);
  if (!m) return <span className="num">{s}</span>;
  return (
    <span className="num">
      $0.0<sub className="text-[0.75em]">{m[1]}</sub>
      {m[2]}
    </span>
  );
}

export function Pct({ v, className = "" }: { v: number; className?: string }) {
  const c = v > 0 ? "text-up" : v < 0 ? "text-down" : "text-muted";
  return <span className={`num ${c} ${className}`}>{fmtPct(v)}</span>;
}

export function CoinIcon({ src, symbol, size = 32 }: { src: string; symbol: string; size?: number }) {
  const [bad, setBad] = useState(!src);
  const style = { width: size, height: size };
  if (bad)
    return (
      <span style={style} className="grid shrink-0 place-items-center rounded-full bg-raised text-[11px] font-bold text-muted">
        {symbol.slice(0, 2)}
      </span>
    );
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${src}?width=64&height=64&quality=90&format=auto`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      onError={() => setBad(true)}
      style={style}
      className="shrink-0 rounded-full bg-raised object-cover"
    />
  );
}

// Browser-window frame around app screenshots.
export function Frame({ children, label, className = "" }: { children: ReactNode; label?: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_40px_120px_-30px_rgba(81,106,246,0.35)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        {label && <span className="ml-3 truncate font-mono text-[11px] text-faint">{label}</span>}
      </div>
      {children}
    </div>
  );
}

// useReducedMotion reads matchMedia on the first client render, which differs
// from the static HTML. Report false until mounted to keep hydration stable.
export function useReduced() {
  const r = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!r;
}

// Props for links that leave the page.
export const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
