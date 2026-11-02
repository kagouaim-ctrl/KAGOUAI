"use client";
import { useT } from "@/lib/i18n";
import { useMarket } from "@/lib/market";
import { CoinIcon, Pct, Price } from "./ui";

// Scrolling price strip under the nav, like an exchange header.
export default function Marquee() {
  const { t } = useT();
  const { coins, live } = useMarket();
  const row = coins.map((c) => (
    <span key={c.address} className="flex shrink-0 items-center gap-2 px-5 text-[12px]">
      <CoinIcon src={c.image} symbol={c.symbol} size={16} />
      <span className="font-semibold">{c.symbol}</span>
      <span className="text-muted">
        <Price v={c.price} />
      </span>
      <Pct v={c.h24} />
    </span>
  ));
  return (
    <div className="border-t border-line bg-surface/60">
      <div className="wrap flex h-9 items-center gap-3">
        <span className={`flex shrink-0 items-center gap-1.5 text-[11px] font-semibold ${live ? "text-up" : "text-warn"}`} title={live ? undefined : t.market.snapshotNote}>
          <span className={`h-1.5 w-1.5 rounded-full ${live ? "animate-pulseDot bg-up" : "bg-warn"}`} />
          {live ? t.market.live : t.market.snapshot}
        </span>
        <div className="fade-x relative flex-1 overflow-hidden" aria-hidden>
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            <div className="flex">{row}</div>
            <div className="flex">{row}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
