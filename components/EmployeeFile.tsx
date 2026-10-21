"use client";
import { useT } from "@/lib/i18n";
import { site, short } from "@/content/site";
import { Roll, Section } from "./ui";

export default function EmployeeFile() {
  const { t } = useT();
  const f = t.file;
  const tn = site.testnet;
  const r = f.report;
  const rows: [string, React.ReactNode][] = [
    [
      f.rows.agent,
      <>
        ERC-8004 #{tn.agentId} <Tag>{t.common.testnet}</Tag>
      </>,
    ],
    [f.rows.role, f.roleValue],
    [
      f.rows.wallet,
      <>
        <a href={tn.walletUrl} target="_blank" rel="noreferrer" className="link">
          {short(tn.wallet)}
        </a>
        <span className="text-muted"> · {f.walletNote}</span> <Tag>{t.common.testnet}</Tag>
      </>,
    ],
    [
      f.rows.limits,
      <>
        per-tx {site.limits.perTx} {site.limits.token} · daily {site.limits.daily} {site.limits.token}
        <span className="text-muted"> · {f.limitsNote}</span>
      </>,
    ],
    [f.rows.reports, f.reportsValue],
    [f.rows.weekly, f.weeklyValue],
    [
      f.rows.history,
      <>
        {f.historyValue(tn.paid, tn.proposed, tn.blocked)}
        <span className="text-muted">
          {" "}
          · {f.historyNote} {tn.date} ·{" "}
          <a href={tn.firstTxUrl} target="_blank" rel="noreferrer" className="link">
            first tx {short(tn.firstTx)}
          </a>
        </span>{" "}
        <Tag>{t.common.testnet}</Tag>
      </>,
    ],
  ];
  return (
    <Section n="05" label={f.label}>
      <h2 className="display pad pb-10 pt-8 text-[clamp(30px,4.2vw,60px)]">{f.title}</h2>
      <div className="grid border-t border-line lg:grid-cols-12">
        <dl className="font-mono text-[13px] lg:col-span-7">
          {rows.map(([k, v]) => (
            <div key={k} className="pad grid gap-1 border-b border-line py-3.5 last:border-b-0 sm:grid-cols-[14ch_1fr] sm:gap-4">
              <dt className="text-muted">{k}</dt>
              <dd className="break-words leading-relaxed">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="border-t border-line p-4 sm:p-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:p-8">
          <div className="border border-line bg-surface font-mono text-[12px] sm:text-[13px]">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span>{r.title}</span>
              <Tag>{r.sample}</Tag>
            </div>
            <div className="space-y-1.5 px-4 py-4">
              <p className="text-muted">{r.period}</p>
              <KV k={r.inLabel} v={<><Roll to={12400} /> USDT</>} />
              <KV k={r.outLabel} v={<><Roll to={18950} /> USDT</>} />
              {r.cats.map(([k, v]) => (
                <KV key={k} k={`  ${k}`} v={v} muted />
              ))}
              <div className="!mt-3 border-t border-line pt-3">
                <KV k={r.treasury} v={<><Roll to={140200} /> USDT</>} />
              </div>
              <div className="flex items-baseline justify-between gap-4 pt-1">
                <span className="text-muted">{r.runway}</span>
                <span>
                  <Roll to={7.4} decimals={1} className="display text-[40px] tracking-[-0.03em]" />
                  <span className="ml-2 text-muted">{r.months}</span>
                </span>
              </div>
              <div className="!mt-3 border-t border-line pt-3">
                <KV k={r.anomalies} v={r.anomaly} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function KV({ k, v, muted }: { k: string; v: React.ReactNode; muted?: boolean }) {
  return (
    <p className={`flex justify-between gap-4 whitespace-pre ${muted ? "text-muted" : ""}`}>
      <span className="text-muted">{k}</span>
      <span className="num truncate">{v}</span>
    </p>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="ml-1 border border-line px-1.5 py-px align-[1px] text-[10px] tracking-wider text-muted">{children}</span>;
}
