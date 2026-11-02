"use client";
import { useT } from "@/lib/i18n";
import { site } from "@/content/site";
import { LangSwitch, ext } from "./ui";
import { Logo } from "./Nav";

export default function Footer() {
  const { t } = useT();
  const f = t.footer;
  const contacts: [string, string][] = [
    [`Telegram @${site.telegram}`, `https://t.me/${site.telegram}`],
    [`X @${site.x}`, `https://x.com/${site.x}`],
    ["GitHub", site.github],
  ];
  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="wrap grid gap-10 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 max-w-[22rem] text-[14px] leading-relaxed text-muted">{f.tagline}</p>
          <LangSwitch className="mt-6 inline-flex" />
        </div>
        <nav className="md:col-span-3" aria-label={f.product}>
          <p className="text-[13px] font-semibold">{f.product}</p>
          <ul className="mt-4 space-y-2.5 text-[14px]">
            <li>
              <a href={site.appHref} className="text-muted transition-colors hover:text-text">
                {t.nav.app}
              </a>
            </li>
            {t.nav.links.map(([name, href]) => (
              <li key={href}>
                <a href={`/${href}`} className="text-muted transition-colors hover:text-text">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <p className="text-[13px] font-semibold">{f.contact}</p>
          <ul className="mt-4 space-y-2.5 text-[14px]">
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
      <div className="border-t border-line">
        <div className="wrap space-y-4 py-6 text-[12px] leading-relaxed text-faint">
          <p className="max-w-[60rem]">{f.risk}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-muted">{f.place}</span>
            <a href="/privacy/" className="hover:text-text">
              {f.privacy}
            </a>
            <span>© 2026 KAGOU</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
