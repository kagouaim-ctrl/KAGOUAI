"use client";
import { useT } from "@/lib/i18n";
import { site } from "@/content/site";
import ChatReplay from "./ChatReplay";
import { nb, ext } from "./ui";

export default function Hero() {
  const { t } = useT();
  const h = t.hero;
  return (
    <section id="top" className="wrap grid grid-cols-1 lg:min-h-[calc(100svh-84px)] lg:grid-cols-12">
      <div className="pad flex flex-col justify-between gap-10 py-10 sm:py-14 lg:col-span-6 lg:py-16">
        <p className="label">{h.kicker}</p>
        <div>
          <h1 className="display text-[clamp(40px,6.4vw,92px)] lg:text-[clamp(44px,4.9vw,84px)]">{nb(h.title)}</h1>
          <p className="mt-6 max-w-[34rem] text-[16px] leading-[1.65] text-muted sm:text-[17px]">{h.sub}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={site.demoHref} className="btn btn-signal">
              {h.cta} ↗
            </a>
            <a href={site.accessHref} {...ext(site.accessHref)} className="btn btn-line">
              {h.secondary}
            </a>
          </div>
        </div>
        <p className="font-mono text-[12px] text-muted">{h.fine}</p>
      </div>
      <div className="flex flex-col justify-center border-t border-line p-3 sm:p-6 lg:col-span-6 lg:border-l lg:border-t-0 lg:p-8">
        <ChatReplay />
        <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted">{t.replay.caption}</p>
        <p className="mt-4 border-t border-line pt-4 font-mono text-[12px] text-muted">{h.proof}</p>
      </div>
    </section>
  );
}
