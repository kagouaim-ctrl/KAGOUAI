"use client";
import { useT } from "@/lib/i18n";
import { Section } from "./ui";

export default function Roster() {
  const { t } = useT();
  const r = t.agents;
  return (
    <Section id="agents" n="03" label={r.label}>
      <h2 className="display pad max-w-[24ch] pb-10 pt-8 text-[clamp(30px,4.2vw,60px)]">{r.title}</h2>
      <div className="border-t border-line">
        <div className="pad hidden grid-cols-12 gap-4 border-b border-line py-3 md:grid">
          <span className="label col-span-6">{r.head[0]}</span>
          <span className="label col-span-4">{r.head[1]}</span>
          <span className="label col-span-2">{r.head[2]}</span>
        </div>
        {r.rows.map(([name, what, perms, mode]) => (
          <div
            key={name}
            className="pad flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-line py-5 last:border-b-0 md:grid md:grid-cols-12"
          >
            <div className="w-full md:col-span-6">
              <p className="text-[18px] font-medium">{name}</p>
              <p className="mt-1 text-[14px] text-muted">{what}</p>
            </div>
            <p className="font-mono text-[12px] text-muted md:col-span-4 md:text-[13px]">
              <span className="label md:hidden">{r.head[1]}: </span>
              {perms}
            </p>
            <p className="font-mono text-[12px] md:col-span-2 md:text-[13px]">
              <span className="border border-line px-1.5 py-0.5">{mode}</span>
            </p>
          </div>
        ))}
      </div>
      <p className="pad border-t border-line py-5 font-mono text-[13px] leading-relaxed">{r.note}</p>
    </Section>
  );
}
