"use client";
import { useT } from "@/lib/i18n";
import { useMarket, fmtUsd } from "@/lib/market";
import { site } from "@/content/site";
import { Arrow, CoinIcon, Pct, Price, Reveal, SectionHead } from "./ui";

export default function Markets() {
  const { t } = useT();
  const m = t.market;
  const { coins, live } = useMarket();
  const rows = [...coins].sort((a, b) => b.mcap - a.mcap).slice(0, 6);
  return (
    <section id="markets" className="wrap py-16 sm:py-24">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHead eyebrow={m.eyebrow} title={m.title} sub={m.sub} />
        <a href={site.appHref} className="btn-ghost h-11 shrink-0 self-start px-5 text-[14px] md:self-auto">
          {m.more}
          <Arrow />
        </a>
      </div>
      <Reveal className="card mt-10 overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
          <span className={`flex items-center gap-2 text-[12px] font-semibold ${live ? "text-up" : "text-warn"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${live ? "animate-pulseDot bg-up" : "bg-warn"}`} />
            {live ? m.live : m.snapshot}
            <span className="font-normal text-faint">· Solana</span>
          </span>
          <span className="hidden text-[12px] text-faint sm:block">{live ? m.source : m.snapshotNote}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="text-left text-[12px] text-faint">
                <th className="py-3 pl-4 font-medium sm:pl-6">{m.cols[0]}</th>
                <th className="py-3 pr-4 text-right font-medium">{m.cols[1]}</th>
                <th className="py-3 pr-4 text-right font-medium">{m.cols[3]}</th>
                <th className="hidden py-3 pr-4 text-right font-medium sm:table-cell">{m.cols[4]}</th>
                <th className="hidden py-3 pr-4 text-right font-medium lg:table-cell">{m.cols[5]}</th>
                <th className="hidden py-3 pr-4 sm:table-cell sm:pr-6" />
              </tr>
            </thead>
            <tbody>
              {rows.map((c, i) => (
                <tr key={c.address} className="group border-t border-line transition-colors hover:bg-white/[0.025]">
                  <td className="py-3.5 pl-4 sm:pl-6">
                    <div className="flex items-center gap-3">
                      <span className="num hidden w-4 text-[12px] text-faint sm:inline">{i + 1}</span>
                      <CoinIcon src={c.image} symbol={c.symbol} />
                      <div className="min-w-0">
                        <p className="font-semibold">{c.symbol}</p>
                        <p className="max-w-[7rem] truncate text-[12px] text-faint sm:max-w-[10rem]">{c.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 text-right font-medium">
                    <Price v={c.price} />
                  </td>
                  <td className="py-3.5 pr-4 text-right">
                    <Pct v={c.h24} className="font-medium" />
                  </td>
                  <td className="num hidden py-3.5 pr-4 text-right text-muted sm:table-cell">{fmtUsd(c.mcap)}</td>
                  <td className="num hidden py-3.5 pr-4 text-right text-muted lg:table-cell">{fmtUsd(c.liq)}</td>
                  <td className="hidden py-3.5 pr-4 text-right sm:table-cell sm:pr-6">
                    <a href={site.appHref} className="inline-flex h-8 items-center gap-1 rounded-lg bg-accent/15 px-3 text-[13px] font-semibold text-[#9aa8ff] transition-colors hover:bg-accent hover:text-white">
                      {m.action}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="border-t border-line px-4 py-3 text-[12px] text-faint sm:hidden">{live ? m.source : m.snapshotNote}</p>
      </Reveal>
    </section>
  );
}

