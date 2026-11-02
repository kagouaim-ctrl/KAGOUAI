"use client";
import { useT } from "@/lib/i18n";
import { site } from "@/content/site";
import { Reveal, SectionHead } from "./ui";

export default function Roadmap() {
  const { t } = useT();
  const r = t.roadmap;
  return (
    <section id="roadmap" className="border-y border-line bg-surface/40 py-16 sm:py-24">
      <div className="wrap">
        <SectionHead eyebrow={r.eyebrow} title={r.title} />
        <ol className="relative mt-12 grid gap-4 lg:grid-cols-5">
          <div aria-hidden className="absolute left-0 right-0 top-[22px] hidden h-px bg-line lg:block" />
          {r.stages.map(([name, what], i) => {
            const here = i === site.currentStage;
            const done = i < site.currentStage;
            return (
              <li key={name} className="relative">
                <Reveal delay={i * 0.06} className="h-full">
                  <span
                    className={`relative z-10 grid h-11 w-11 place-items-center rounded-full border text-[13px] font-bold ${
                      here ? "border-accent bg-accent text-white shadow-[0_0_0_6px_rgba(81,106,246,0.18)]" : done ? "border-up/40 bg-up/15 text-up" : "border-line bg-bg text-faint"
                    }`}
                  >
                    {done ? "✓" : i + 1}
                  </span>
                  <div className={`card mt-4 h-[calc(100%-60px)] p-5 ${here ? "border-accent/50" : ""}`}>
                    {(here || done) && (
                      <p className={`mb-2 text-[11px] font-semibold ${here ? "text-[#9aa8ff]" : "text-up"}`}>{here ? r.here : r.done}</p>
                    )}
                    <p className={`text-[16px] font-semibold ${!here && !done ? "text-muted" : ""}`}>{name}</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">{what}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
