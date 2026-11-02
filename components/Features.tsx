"use client";
import { useT } from "@/lib/i18n";
import { Reveal, SectionHead } from "./ui";

const icons = [
  // exit check
  <path key="0" d="M12 3 4 6v6c0 4.4 3.4 8 8 9 4.6-1 8-4.6 8-9V6l-8-3Zm-3.5 9 2.5 2.5 4.5-5" />,
  // fees
  <path key="1" d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Zm3 5h6M9 12h6M9 16h3" />,
  // paper vs live
  <path key="2" d="M4 5h7v14H4zM13 5h7v14h-7zM6.5 9h2M15.5 9h2" />,
  // pause
  <path key="3" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-2-12v6m4-6v6" />,
  // limits
  <path key="4" d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M6 14v6" />,
  // audit
  <path key="5" d="M7 3h10v4H7zM5 7h14v14H5zM9 12h6M9 16h4" />,
];

export default function Features() {
  const { t } = useT();
  const f = t.features;
  return (
    <section id="features" className="wrap py-16 sm:py-24">
      <SectionHead eyebrow={f.eyebrow} title={f.title} />
      <Reveal className="card mt-12 grid overflow-hidden lg:grid-cols-[1fr_1.5fr]">
        <div className="flex flex-col justify-center p-6 sm:p-10">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-[#9aa8ff]">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19h16M6 15l4-5 3 3 5-7" />
            </svg>
          </span>
          <h3 className="mt-5 text-[24px] font-semibold leading-snug sm:text-[28px]">{f.chart.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted sm:text-[16px]">{f.chart.body}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-[12px] font-medium">
            <Tag c="bg-accent/15 text-[#9aa8ff]">● DISCOVER</Tag>
            <Tag c="bg-white/5 text-muted">■ NO_TRADE</Tag>
            <Tag c="bg-up/10 text-up">▲ BUY</Tag>
            <Tag c="bg-down/10 text-down">▼ SELL</Tag>
          </div>
        </div>
        <div className="relative border-t border-line bg-bg lg:border-l lg:border-t-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/shots/chart.webp" alt="" width={1320} height={1537} loading="lazy" className="block h-full max-h-[520px] w-full object-cover object-top" />
        </div>
      </Reveal>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {f.items.map(([title, body], i) => (
          <li key={title}>
            <Reveal delay={(i % 3) * 0.06} className="card h-full p-6 transition-colors hover:border-white/20">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-text">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  {icons[i]}
                </svg>
              </span>
              <h3 className="mt-5 text-[17px] font-semibold">{title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Tag({ c, children }: { c: string; children: string }) {
  return <span className={`rounded-md px-2 py-1 ${c}`}>{children}</span>;
}
