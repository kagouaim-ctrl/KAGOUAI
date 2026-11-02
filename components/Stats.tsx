"use client";
import { useT } from "@/lib/i18n";
import { Reveal } from "./ui";

export default function Stats() {
  const { t } = useT();
  return (
    <section className="wrap py-10 sm:py-14">
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
        {t.stats.map(([v, label], i) => (
          <li key={label} className="bg-bg px-5 py-6 sm:px-7 sm:py-8">
            <Reveal delay={i * 0.06}>
              <p className="num text-[34px] font-bold tracking-[-0.03em] sm:text-[44px]">{v}</p>
              <p className="mt-1 text-[13px] leading-snug text-muted sm:text-[14px]">{label}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
