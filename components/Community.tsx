"use client";
import { useT } from "@/lib/i18n";
import { site } from "@/content/site";
import { Arrow, Reveal, SectionHead } from "./ui";

export default function Community() {
  const { t } = useT();
  const c = t.community;
  return (
    <section id="community" className="relative overflow-hidden border-y border-line bg-surface/40 py-16 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-accent/10 blur-[120px]" />
      <div className="wrap relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow={c.eyebrow} title={c.title} sub={c.sub} />
          <ul className="mt-8 space-y-3">
            {c.points.map((p, i) => (
              <li key={p}>
                <Reveal delay={i * 0.06} className="flex gap-3 text-[15px] leading-relaxed">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/20 text-[#9aa8ff]">
                    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-muted">{p}</span>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-4">
            <a href={site.appHref} className="btn-ghost h-11 px-5 text-[14px]">
              {t.nav.app}
              <Arrow />
            </a>
            <span className="pill">
              <span className="h-1.5 w-1.5 rounded-full bg-warn" />
              {c.soon}
            </span>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="mx-auto w-full max-w-[460px]">
          <div className="overflow-hidden rounded-[28px] border border-line bg-bg p-2 shadow-[0_40px_120px_-30px_rgba(81,106,246,0.45)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/shots/chat.webp" alt="" width={800} height={1537} loading="lazy" className="block max-h-[620px] w-full rounded-[22px] object-cover object-top" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
