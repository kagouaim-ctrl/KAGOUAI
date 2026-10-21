"use client";
import { useT } from "@/lib/i18n";
import { nb, Roll, Section } from "./ui";

export default function Pricing() {
  const { t } = useT();
  const p = t.pricing;
  return (
    <Section id="pricing" n="09" label={p.label}>
      <h2 className="display pad max-w-[19ch] pb-10 pt-8 text-[clamp(30px,4.2vw,60px)]">{nb(p.title)}</h2>
      <div className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {p.plans.map((pl, i) => {
          const rec = pl.name === "Pro";
          return (
            <div
              key={pl.name}
              className={`relative px-4 py-8 sm:px-6 ${i > 0 ? "border-t border-line sm:border-t-0" : ""} ${i % 2 ? "sm:border-l" : ""} ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} lg:border-l lg:first:border-l-0`}
            >
              {rec && <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-signal" />}
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[13px]">{pl.name}</p>
                {rec && <p className="label">{p.recommended}</p>}
              </div>
              <p className="mt-6 flex items-baseline gap-2">
                {pl.unit && pl.name === "Team" && <span className="font-mono text-[12px] text-muted">{pl.unit}</span>}
                <Roll to={Number(pl.price)} className="display text-[64px] leading-none" />
              </p>
              <p className="mt-2 font-mono text-[12px] text-muted">
                {p.per}
                {pl.name === "Trial" ? ` · ${pl.unit}` : ""}
              </p>
              <ul className="mt-8 space-y-2 border-t border-line pt-5 text-[14px]">
                {pl.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <span className="font-mono text-muted">—</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="pad space-y-1 border-t border-line py-5 font-mono text-[13px]">
        <p>{p.note}</p>
        <p className="text-muted">{p.later}</p>
      </div>
    </Section>
  );
}
