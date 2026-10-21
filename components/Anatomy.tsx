"use client";
import { useT } from "@/lib/i18n";
import { Section } from "./ui";

export default function Anatomy() {
  const { t } = useT();
  const a = t.anatomy;
  return (
    <Section n="04" label={a.label}>
      <h2 className="display pad max-w-[22ch] pb-10 pt-8 text-[clamp(30px,4.2vw,60px)]">{a.title}</h2>
      <dl className="border-t border-line">
        {a.rows.map(([part, what, how], i) => (
          <div key={part} className="grid border-b border-line md:grid-cols-12">
            <dt className="pad flex items-baseline gap-4 pt-5 font-mono text-[13px] md:col-span-3 md:py-5">
              <span className="text-muted">0{i + 1}</span>
              {part}
            </dt>
            <dd className="pad pb-1 pt-2 text-[16px] leading-relaxed md:col-span-6 md:border-l md:border-line md:py-5">
              {what}
            </dd>
            <dd className="pad pb-5 font-mono text-[12px] text-muted md:col-span-3 md:border-l md:border-line md:py-5 md:text-[13px]">
              {how}
            </dd>
          </div>
        ))}
      </dl>
      <p className="pad max-w-[64rem] py-6 text-[17px] leading-relaxed sm:text-[19px]">{a.note}</p>
    </Section>
  );
}
