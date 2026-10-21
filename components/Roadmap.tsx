"use client";
import { useT } from "@/lib/i18n";
import { site } from "@/content/site";
import { Section } from "./ui";

export default function Roadmap() {
  const { t } = useT();
  const r = t.roadmap;
  return (
    <Section n="09" label={r.label}>
      <h2 className="display pad pb-10 pt-8 text-[clamp(30px,4.2vw,60px)]">{r.title}</h2>
      <ol className="grid border-t border-line md:grid-cols-5">
        {r.stages.map(([name, what, gate], i) => {
          const here = i === site.currentStage;
          const done = i < site.currentStage;
          return (
            <li
              key={i}
              className={`relative px-4 pb-8 pt-10 sm:px-6 ${i > 0 ? "border-t border-line md:border-l md:border-t-0" : ""} ${i > site.currentStage ? "text-muted" : ""}`}
            >
              <span
                aria-hidden
                className={`absolute left-4 top-[-5px] hidden h-2.5 w-2.5 sm:left-6 md:block ${here ? "bg-signal" : done ? "bg-text" : "border border-line bg-bg"}`}
              />
              <p className="flex items-center gap-3 font-mono text-[12px]">
                <span className={here ? "text-text" : "text-muted"}>0{i}</span>
                {here && (
                  <span className="flex items-center gap-2 text-text">
                    <span aria-hidden className="h-2 w-2 bg-signal md:hidden" />
                    {r.here}
                  </span>
                )}
              </p>
              <p className="mt-3 text-[18px] font-medium leading-snug">{name}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{what}</p>
              <p className="mt-3 border-t border-line pt-3 font-mono text-[12px] leading-relaxed text-muted">
                {r.gate}: {gate}
              </p>
              {i === 1 && (
                <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted">
                  {r.built} · {site.testnet.date}
                </p>
              )}
            </li>
          );
        })}
      </ol>
      <p className="pad border-t border-line py-5 font-mono text-[13px]">{r.note}</p>
    </Section>
  );
}
