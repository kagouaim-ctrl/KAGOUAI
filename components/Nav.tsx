"use client";
import { useState } from "react";
import { useT } from "@/lib/i18n";
import { useChain } from "@/lib/chain";
import { site } from "@/content/site";
import { LangSwitch } from "./ui";

export default function Nav() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-bg">
      <div className="border-b border-line">
        <div className="wrap pad flex h-14 items-center justify-between gap-4">
          <a href="#top" className="display text-[19px] tracking-[-0.02em]" aria-label="KAGOU home">
            KAGOU
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Sections">
            {t.nav.links.map(([name, href]) => (
              <a key={href} href={href} className="text-[13px] text-muted transition-colors hover:text-text">
                {name}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 sm:gap-4">
            <LangSwitch className="hidden sm:flex" />
            <a href={site.trialHref} className="btn btn-signal !px-3 !py-2 sm:!px-4">
              {t.nav.cta}
            </a>
            <button
              className="font-mono text-[12px] text-muted md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? t.nav.close : t.nav.menu}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="border-b border-line md:hidden">
          <div className="wrap">
            {t.nav.links.map(([name, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="pad block border-b border-line py-3 text-[15px] last:border-b-0"
              >
                {name}
              </a>
            ))}
            <div className="pad py-3">
              <LangSwitch />
            </div>
          </div>
        </div>
      )}
      <Ticker />
    </header>
  );
}

function Ticker() {
  const { t } = useT();
  const { block, gasGwei, live } = useChain();
  const s = block ? block.toLocaleString("en-US") : "—";
  const head = s.slice(0, -2);
  const tail = s.slice(-2);
  return (
    <div className="border-b border-line">
      <div className="wrap pad flex h-7 items-center justify-between font-mono text-[11px] text-muted">
        <p className="num truncate" aria-live="off">
          BSC <span className="text-text">#{head}</span>
          <span key={block} className="tick text-text">
            {tail}
          </span>
          <span className="hidden sm:inline"> · 0.75s · gas {gasGwei.toFixed(2)} gwei</span>
        </p>
        <p className="flex shrink-0 items-center gap-2" title={live ? undefined : t.ticker.simNote}>
          {live ? (
            <>
              <span aria-hidden className="h-1.5 w-1.5 bg-signal" />
              <span className="text-text">{t.ticker.live}</span>
            </>
          ) : (
            <>
              <span aria-hidden className="h-1.5 w-1.5 border border-muted" />
              <span>{t.ticker.sim}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
