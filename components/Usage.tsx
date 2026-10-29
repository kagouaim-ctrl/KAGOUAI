"use client";
import { useT } from "@/lib/i18n";
import { Roll, Section } from "./ui";

// Usage & Billing: what the console's page shows, next to a sample of it.
const SAMPLE = { today: 3.42, todayBudget: 10, month: 58.5, monthBudget: 200 };

export default function Usage() {
  const { t } = useT();
  const u = t.usage;
  const c = u.card;
  return (
    <Section id="usage" n="05" label={u.label}>
      <h2 className="display pad pb-10 pt-8 text-[clamp(30px,4.2vw,60px)]">{u.title}</h2>
      <div className="grid grid-cols-1 border-t border-line lg:grid-cols-12">
        <div className="lg:col-span-7">
          <dl className="font-mono text-[13px]">
            {u.rows.map(([k, v]) => (
              <div key={k} className="pad grid gap-1 border-b border-line py-4 sm:grid-cols-[20ch_1fr] sm:gap-4">
                <dt className="text-muted">{k}</dt>
                <dd className="font-sans text-[15px] leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="pad py-5 font-mono text-[13px] leading-relaxed">{u.note}</p>
        </div>
        <div className="border-t border-line p-4 sm:p-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:p-8">
          <div className="border border-line bg-surface font-mono text-[12px] sm:text-[13px]">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span>{c.title}</span>
              <span className="border border-line px-1.5 py-px text-[10px] tracking-wider text-muted">{c.sample}</span>
            </div>
            <div className="space-y-5 px-4 py-4">
              <Meter label={c.today} value={SAMPLE.today} budget={SAMPLE.todayBudget} of={c.of} />
              <Meter label={c.month} value={SAMPLE.month} budget={SAMPLE.monthBudget} of={c.of} />
              <div className="space-y-1.5 border-t border-line pt-4">
                <p className="text-muted">{c.byAgent}</p>
                {c.agents.map(([k, v]) => (
                  <p key={k} className="flex justify-between gap-4">
                    <span className="text-muted">{k}</span>
                    <span className="num">${v}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Meter({ label, value, budget, of }: { label: string; value: number; budget: number; of: string }) {
  const pct = Math.min(100, (value / budget) * 100);
  return (
    <div>
      <p className="flex items-baseline justify-between gap-4">
        <span className="text-muted">{label}</span>
        <span>
          <span className="display text-[32px] tracking-[-0.03em]">
            $<Roll to={value} decimals={2} />
          </span>
          <span className="ml-2 text-muted">
            {of} ${budget.toFixed(0)}
          </span>
        </span>
      </p>
      <div className="mt-2 h-1.5 w-full bg-line">
        <div className={`h-full ${pct >= 80 ? "bg-review" : "bg-text"}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
