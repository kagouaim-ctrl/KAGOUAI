"use client";
import { useT } from "@/lib/i18n";
import { Section } from "./ui";

// Security: one row per worry, and what the product does about it.
export default function Problem() {
  const { t } = useT();
  const s = t.security;
  return (
    <Section id="security" n="04" label={s.label}>
      <h2 className="display pad max-w-[18ch] pb-14 pt-10 text-[clamp(36px,6vw,96px)] sm:pb-20 lg:max-w-[16ch]">
        {s.title}
      </h2>
      <ol>
        {s.items.map((it, i) => (
          <li key={i} className="grid grid-cols-[auto_1fr] border-t border-line md:grid-cols-12">
            <p className="display num py-7 pl-4 text-[32px] text-muted sm:pl-6 sm:text-[72px] md:col-span-3 md:py-10 md:pr-6 lg:col-span-2 lg:pl-10">
              0{i + 1}
            </p>
            <div className="pad pb-8 pt-7 md:col-span-4 md:border-l md:border-line md:py-10 lg:col-span-4">
              <p className="text-[16px] leading-snug text-muted">{it.worry}</p>
              <h3 className="mt-3 text-[22px] font-medium leading-snug sm:text-[26px]">{it.title}</h3>
            </div>
            <div className="col-span-2 px-4 pb-8 sm:px-6 md:col-span-5 md:border-l md:border-line md:py-10 lg:col-span-6 lg:px-10">
              <p className="max-w-[40rem] text-[16px] leading-relaxed text-muted">{it.body}</p>
              {it.note && <p className="mt-4 font-mono text-[12px] leading-relaxed text-muted">// {it.note}</p>}
            </div>
          </li>
        ))}
      </ol>
      <div className="pad space-y-1 border-t border-line py-5 font-mono text-[13px]">
        <p>{s.log}</p>
        <p className="text-muted">{s.anchor}</p>
      </div>
    </Section>
  );
}
