"use client";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { langs, useT } from "@/lib/i18n";

export function Section({
  id,
  n,
  label,
  children,
  className = "",
}: {
  id?: string;
  n?: string;
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className="wrap relative">
      <Hairline />
      {label && (
        <div className="pad pt-6">
          <span className="label">
            {n ? `[${n}] / ` : ""}
            {label}
          </span>
        </div>
      )}
      <div className={className}>{children}</div>
    </section>
  );
}

export function Hairline({ className = "" }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={`absolute inset-x-0 top-0 h-px origin-left bg-line ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: [0.2, 0.7, 0.1, 1] }}
    />
  );
}

// Counts up to `to` in mono digits when scrolled into view.
export function Roll({ to, decimals = 0, className = "" }: { to: number; decimals?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReduced();
  const fmt = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const [v, setV] = useState(fmt(to));

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.1, ease: [0.2, 0.7, 0.1, 1], onUpdate: (x) => setV(fmt(x)) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className={`num ${className}`}>
      {v}
    </span>
  );
}

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useT();
  return (
    <div className={`flex items-center font-mono text-[12px] ${className}`} role="group" aria-label="Language">
      {langs.map((l, i) => (
        <span key={l.id} className="flex items-center">
          {i > 0 && <span className="text-line">/</span>}
          <button
            onClick={() => setLang(l.id)}
            aria-pressed={lang === l.id}
            className={`px-1.5 py-1 transition-colors ${lang === l.id ? "text-text" : "text-muted hover:text-text"}`}
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  );
}

export function Placeholder({ value, prefix = "" }: { value: string; prefix?: string }) {
  if (value.startsWith("["))
    return (
      <span className="border border-dashed border-muted px-1 text-muted" title="To be filled in">
        {prefix}
        {value}
      </span>
    );
  return (
    <>
      {prefix}
      {value}
    </>
  );
}

export function Square({ tone, className = "" }: { tone: "ok" | "review" | "block"; className?: string }) {
  const c = tone === "ok" ? "bg-ok" : tone === "review" ? "bg-review" : "bg-block";
  return <span aria-hidden className={`inline-block h-2.5 w-2.5 shrink-0 ${c} ${className}`} />;
}

export const toneText = (tone: string) =>
  tone === "ok" ? "text-ok" : tone === "review" ? "text-review" : "text-block";

// useReducedMotion reads matchMedia on the first client render, which differs
// from the static HTML. Report false until mounted to keep hydration stable.
export function useReduced() {
  const r = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!r;
}

// Keeps hyphenated words like "on-chain" from breaking at the hyphen in big headlines.
export function nb(text: string) {
  return text.split(/(\S*-\S*)/).map((part, i) =>
    part.includes("-") ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

// Block-explorer style copy button for addresses and hashes.
export function Copy({ value }: { value: string }) {
  const { t } = useT();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          setTimeout(() => setDone(false), 1400);
        } catch {}
      }}
      className="ml-2 border border-line px-1.5 py-px align-[1px] text-[10px] tracking-wider text-muted transition-colors hover:border-text hover:text-text"
      aria-label={`${t.ui.copy} ${value}`}
    >
      {done ? t.ui.copied : t.ui.copy}
    </button>
  );
}

// Props for links that leave the page.
export const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});
