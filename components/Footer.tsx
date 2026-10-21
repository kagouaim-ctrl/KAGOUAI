"use client";
import { useT } from "@/lib/i18n";
import { site } from "@/content/site";
import { LangSwitch, ext } from "./ui";

export default function Footer() {
  const { t } = useT();
  const f = t.footer;
  const contacts: [string, string][] = [
    [`Telegram @${site.telegram}`, `https://t.me/${site.telegram}`],
    [`X @${site.x}`, `https://x.com/${site.x}`],
    ["GitHub", site.github],
  ];
  return (
    <footer className="wrap relative border-t border-line">
      <div className="grid gap-px bg-line md:grid-cols-12">
        <div className="bg-bg px-4 py-10 sm:px-6 md:col-span-5 lg:px-10">
          <p className="display text-[22px]">KAGOU</p>
          <p className="mt-3 max-w-[22rem] text-[14px] leading-relaxed text-muted">{t.ui.tagline}</p>
          <LangSwitch className="-ml-1.5 mt-6" />
        </div>
        <nav className="bg-bg px-4 py-10 sm:px-6 md:col-span-3" aria-label={t.ui.product}>
          <p className="label">{t.ui.product}</p>
          <ul className="mt-4 space-y-2 text-[14px]">
            {t.nav.links.map(([name, href]) => (
              <li key={href}>
                <a href={`/${href}`} className="text-muted transition-colors hover:text-text">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="bg-bg px-4 py-10 sm:px-6 md:col-span-4">
          <p className="label">{t.ui.contact}</p>
          <ul className="mt-4 space-y-2 font-mono text-[13px]">
            {contacts.map(([label, href]) => (
              <li key={href}>
                <a href={href} {...ext(href)} className="text-muted transition-colors hover:text-text">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pad flex flex-col gap-3 border-t border-line py-6 font-mono text-[12px] text-muted md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="text-text">{f.place}</span>
          <a href="/privacy/" className="link">
            {f.privacy}
          </a>
          <span>{t.ui.affiliation}</span>
        </div>
        <p>{f.disclaimer}</p>
      </div>
    </footer>
  );
}
