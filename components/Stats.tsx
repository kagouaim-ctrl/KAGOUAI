"use client";
import { useT } from "@/lib/i18n";
import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal, useReduced } from "./ui";

export default function Stats() {
  const { t } = useT();
  return (
    <section className="wrap py-10 sm:py-14">
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
        {t.stats.map(([v, label], i) => (
          <li key={label} className="bg-bg px-5 py-6 sm:px-7 sm:py-8">
            <Reveal delay={i * 0.06}>
              <p className="num bg-gradient-to-b from-white to-white/60 bg-clip-text text-[34px] font-bold tracking-[-0.03em] text-transparent sm:text-[48px]">
                <Count value={v} />
              </p>
              <p className="mt-1 text-[13px] leading-snug text-muted sm:text-[14px]">{label}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Counts plain numbers ("10", "100%") up from zero when they scroll into view; other values show as is.
function Count({ value }: { value: string }) {
  const m = value.match(/^(\D*)(\d+)(\D*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReduced();
  const [v, setV] = useState(m ? Number(m[2]) : 0);
  useEffect(() => {
    if (!m || !inView || reduce) return;
    const c = animate(0, Number(m[2]), { duration: 1.2, ease: [0.2, 0.7, 0.1, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);
  if (!m) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref}>
      {m[1]}
      {v}
      {m[3]}
    </span>
  );
}
