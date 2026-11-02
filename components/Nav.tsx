"use client";
import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";
import { site } from "@/content/site";
import { Arrow, LangSwitch } from "./ui";
import Marquee from "./Marquee";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <svg aria-hidden viewBox="0 0 28 28" className="h-7 w-7">
        <rect width="28" height="28" rx="8" fill="#516af6" />
        <path d="M9 7v14M9 14l8-7M12 11.5 19 21" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      <span className="text-[18px] font-bold tracking-[-0.02em]">KAGOU</span>
    </span>
  );
}

export default function Nav({ marquee = true }: { marquee?: boolean }) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`sticky top-0 z-50 border-b transition-colors ${scrolled || open ? "border-line bg-bg/85 backdrop-blur-xl" : "border-transparent bg-bg/0"}`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-text focus:px-3 focus:py-2 focus:text-bg"
      >
        {t.ui.skip}
      </a>
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <a href="/#top" aria-label="KAGOU home">
            <Logo />
          </a>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
            {t.nav.links.map(([name, href]) => (
              <a key={href} href={`/${href}`} className="rounded-lg px-3 py-2 text-[14px] font-medium text-muted transition-colors hover:bg-white/5 hover:text-text">
                {name}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <LangSwitch className="hidden sm:flex" />
          <a href={site.appHref} className="btn-primary h-10 px-4 text-[14px]">
            {t.nav.app}
            <Arrow className="hidden sm:block" />
          </a>
          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? <path d="M5 5l10 10M15 5 5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="border-t border-line lg:hidden">
          <div className="wrap py-2">
            {t.nav.links.map(([name, href]) => (
              <a key={href} href={`/${href}`} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-3 text-[16px] font-medium hover:bg-white/5">
                {name}
              </a>
            ))}
            <div className="px-2 py-3">
              <LangSwitch className="inline-flex" />
            </div>
          </div>
        </div>
      )}
      {marquee && <Marquee />}
    </header>
  );
}
