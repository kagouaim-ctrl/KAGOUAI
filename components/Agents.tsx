"use client";
import { useT } from "@/lib/i18n";
import { Frame, Reveal, SectionHead } from "./ui";

// The decision pipeline: research agents -> lead agent -> code-only rails.
export default function Agents() {
  const { t } = useT();
  const a = t.agents;
  return (
    <section id="agents" className="relative border-y border-line bg-surface/40 py-16 sm:py-24">
      <div className="wrap">
        <SectionHead eyebrow={a.eyebrow} title={a.title} sub={a.sub} />
        <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
          <Column title={a.research.title} tag={a.research.tag} tone="muted" items={a.research.items} delay={0} />
          <Connector />
          <Reveal delay={0.08} className="flex">
            <div className="relative flex w-full flex-col justify-center overflow-hidden rounded-2xl border border-accent/50 bg-gradient-to-b from-accent/20 to-accent/5 p-6">
              <span aria-hidden className="absolute -right-16 -top-16 h-48 w-48 animate-[spin_14s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(81,106,246,0.45),transparent_40%)] blur-2xl" />
              <p className="text-[12px] font-semibold text-[#9aa8ff]">{a.lead.title}</p>
              <span className="mt-4 grid h-12 w-12 place-items-center rounded-2xl bg-accent text-white shadow-[0_10px_30px_-6px_rgba(81,106,246,0.8)]">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="4" y="7" width="16" height="12" rx="4" />
                  <path d="M12 3v4M9 12.5h.01M15 12.5h.01" strokeLinecap="round" strokeWidth="2.4" />
                </svg>
              </span>
              <p className="mt-4 text-[22px] font-semibold">{a.lead.name}</p>
              <p className="mt-1 text-[12px] font-medium text-[#9aa8ff]">{a.lead.tag}</p>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{a.lead.body}</p>
            </div>
          </Reveal>
          <Connector />
          <Column title={a.rails.title} tag={a.rails.tag} tone="up" items={a.rails.items} delay={0.16} />
        </div>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <p className="text-[22px] font-semibold leading-snug sm:text-[28px]">{a.shot}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Frame label="kagouai.com/meme · Agent">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/shots/agent.webp" alt="" width={1560} height={1390} loading="lazy" className="block w-full" />
            </Frame>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Column({ title, tag, tone, items, delay }: { title: string; tag: string; tone: "muted" | "up"; items: [string, string][]; delay: number }) {
  return (
    <Reveal delay={delay} className="flex">
      <div className="card w-full p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[12px] font-semibold text-muted">{title}</p>
          <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${tone === "up" ? "bg-up/10 text-up" : "bg-white/5 text-muted"}`}>{tag}</span>
        </div>
        <ul className="mt-4 space-y-2">
          {items.map(([name, what]) => (
            <li key={name} className="rounded-xl bg-white/[0.03] px-3.5 py-3">
              <p className="flex items-center gap-2 text-[14px] font-semibold">
                <span className={`h-1.5 w-1.5 rounded-full ${tone === "up" ? "bg-up" : "bg-accent"}`} />
                {name}
              </p>
              <p className="mt-1 text-[12.5px] leading-snug text-muted">{what}</p>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

// A line with light pulses running along it, from research to decision to execution.
function Connector() {
  return (
    <div aria-hidden className="flex items-center justify-center">
      <div className="relative h-10 w-px overflow-hidden bg-line lg:h-px lg:w-12">
        <span className="absolute left-0 top-0 h-4 w-px animate-flowY bg-gradient-to-b from-transparent via-accent to-transparent lg:hidden" />
        <span className="absolute left-0 top-0 hidden h-px w-6 animate-flowX bg-gradient-to-r from-transparent via-[#9aa8ff] to-transparent lg:block" />
      </div>
    </div>
  );
}
