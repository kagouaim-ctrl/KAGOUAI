"use client";
import { useT } from "@/lib/i18n";
import { SectionHead } from "./ui";

export default function Faq() {
  const { t } = useT();
  const f = t.faq;
  return (
    <section id="faq" className="wrap grid gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_1.6fr]">
      <SectionHead eyebrow={f.eyebrow} title={f.title} />
      <div className="space-y-3">
        {f.items.map(([q, a], i) => (
          <details key={q} className="card group overflow-hidden" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[16px] font-semibold transition-colors hover:bg-white/[0.02] sm:px-6 [&::-webkit-details-marker]:hidden">
              {q}
              <span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/5 text-muted transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted sm:px-6">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
