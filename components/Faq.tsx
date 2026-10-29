"use client";
import { useT } from "@/lib/i18n";
import { Section } from "./ui";

export default function Faq() {
  const { t } = useT();
  const f = t.faq;
  return (
    <Section id="faq" n="08" label={f.label}>
      <h2 className="display pad pb-10 pt-8 text-[clamp(30px,4.2vw,60px)]">{f.title}</h2>
      <div className="border-t border-line">
        {f.items.map(([q, a], i) => (
          <details key={q} className="group border-b border-line last:border-b-0" open={i === 0}>
            <summary className="pad flex cursor-pointer list-none items-baseline gap-4 py-5 transition-colors hover:bg-surface [&::-webkit-details-marker]:hidden">
              <span className="font-mono text-[12px] text-muted">Q{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 text-[17px] font-medium sm:text-[19px]">{q}</span>
              <span aria-hidden className="font-mono text-[16px] text-muted group-open:hidden">+</span>
              <span aria-hidden className="hidden font-mono text-[16px] text-muted group-open:inline">−</span>
            </summary>
            <p className="pad max-w-[60rem] pb-6 text-[16px] leading-relaxed text-muted sm:pl-[calc(2.5rem+4ch)] lg:pl-[calc(2.5rem+4ch)]">
              {a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
