"use client";
import { useT } from "@/lib/i18n";
import { site } from "@/content/site";
import { Section, ext } from "./ui";

export default function Cta() {
  const { t } = useT();
  const c = t.cta;
  return (
    <Section className="bg-bg">
      <div className="pad py-20 sm:py-28">
        <h2 className="display max-w-[20ch] text-[clamp(36px,6vw,96px)]">{c.title}</h2>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href={site.accessHref} {...ext(site.accessHref)} className="btn btn-signal">
            {c.primary}
          </a>
          <a href={site.demoHref} className="btn btn-line">
            {c.secondary} ↗
          </a>
        </div>
      </div>
    </Section>
  );
}
