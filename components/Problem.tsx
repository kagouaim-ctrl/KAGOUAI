"use client";
import { useT } from "@/lib/i18n";
import { Section } from "./ui";

export default function Problem() {
  const { t } = useT();
  const p = t.problem;
  return (
    <Section n="01" label={p.label}>
      <h2 className="display pad max-w-[18ch] pb-14 pt-10 text-[clamp(36px,6vw,96px)] sm:pb-20 lg:max-w-[16ch]">
        {p.title}
      </h2>
      <div className="grid border-t border-line md:grid-cols-3">
        {p.items.map(([q, a], i) => (
          <div key={i} className={`pad py-8 sm:py-10 ${i > 0 ? "border-t border-line md:border-l md:border-t-0" : ""}`}>
            <p className="font-mono text-[12px] text-muted">0{i + 1}</p>
            <p className="mt-4 text-[17px] leading-snug text-muted">{q}</p>
            <p className="mt-3 text-[20px] font-medium leading-snug">{a}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
