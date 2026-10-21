"use client";
import { useT } from "@/lib/i18n";
import { Section } from "./ui";

export default function Gates() {
  const { t } = useT();
  const g = t.gates;
  return (
    <Section id="security" n="03" label={g.label}>
      <h2 className="display pad pb-10 pt-8 text-[clamp(30px,4.2vw,60px)]">{g.title}</h2>
      <ol>
        {g.items.map((it, i) => (
          <li key={i} className="grid border-t border-line md:grid-cols-12">
            <p className="display pad num py-6 text-[56px] text-muted sm:text-[72px] md:col-span-3 md:py-10 lg:col-span-2">
              0{i + 1}
            </p>
            <div className="pad pb-8 md:col-span-9 md:border-l md:border-line md:py-10 lg:col-span-10">
              <h3 className="text-[22px] font-medium leading-snug sm:text-[26px]">{it.title}</h3>
              <p className="mt-3 max-w-[48rem] text-[16px] leading-relaxed text-muted">{it.body}</p>
              {it.note && <p className="mt-4 font-mono text-[12px] text-muted">// {it.note}</p>}
            </div>
          </li>
        ))}
      </ol>
      <div className="pad space-y-1 border-t border-line py-5 font-mono text-[13px]">
        <p>{g.kill}</p>
        <p className="text-muted">{g.incident}</p>
      </div>
    </Section>
  );
}
