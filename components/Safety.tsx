"use client";
import { useT } from "@/lib/i18n";
import { Reveal, SectionHead } from "./ui";
import Injection from "./Injection";

export default function Safety() {
  const { t } = useT();
  const s = t.safety;
  return (
    <section id="safety" className="wrap py-16 sm:py-24">
      <SectionHead eyebrow={s.eyebrow} title={s.title} center />
      <Injection />
      <ul className="mt-4 grid gap-4 md:grid-cols-2">
        {s.items.map(([title, body], i) => (
          <li key={title}>
            <Reveal delay={(i % 2) * 0.06} className="card relative h-full overflow-hidden p-6 sm:p-8">
              <span className="num absolute right-6 top-5 text-[56px] font-bold leading-none text-white/[0.04]">0{i + 1}</span>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-up/10 text-up">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
                  <path d="M12 3 4 6v6c0 4.4 3.4 8 8 9 4.6-1 8-4.6 8-9V6l-8-3Z" />
                </svg>
              </span>
              <h3 className="mt-5 text-[19px] font-semibold">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
