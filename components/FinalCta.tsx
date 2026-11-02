"use client";
import { useT } from "@/lib/i18n";
import { site } from "@/content/site";
import { Arrow, Reveal, ext } from "./ui";

export default function FinalCta() {
  const { t } = useT();
  const c = t.cta;
  return (
    <section className="wrap pb-20 pt-4 sm:pb-28">
      <Reveal className="relative overflow-hidden rounded-3xl border border-line px-6 py-16 text-center sm:py-20">
        <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />
        <div className="relative">
          <h2 className="h-display mx-auto max-w-[18ch] text-[clamp(32px,5vw,60px)]">{c.title}</h2>
          <p className="mx-auto mt-4 max-w-[34rem] text-[16px] text-muted sm:text-[17px]">{c.sub}</p>
          <div className="mt-9 flex flex-col items-center gap-4">
            <a href={site.appHref} className="btn-primary group h-14 w-full max-w-[20rem] px-10 text-[17px] shadow-[0_12px_40px_-8px_rgba(81,106,246,0.7)] sm:w-auto">
              {c.primary}
              <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href={site.accessHref} {...ext(site.accessHref)} className="text-[14px] font-medium text-muted underline decoration-line underline-offset-4 hover:text-text">
              {c.secondary}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
