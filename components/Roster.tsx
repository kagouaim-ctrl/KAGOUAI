"use client";
import { useT } from "@/lib/i18n";
import { Section } from "./ui";

export default function Roster() {
  const { t } = useT();
  const r = t.roster;
  return (
    <Section n="05" label={r.label}>
      <h2 className="display pad pb-10 pt-8 text-[clamp(30px,4.2vw,60px)]">{r.title}</h2>
      <div className="border-t border-line">
        <div className="pad hidden grid-cols-12 border-b border-line py-3 md:grid">
          <span className="label col-span-6">{r.head[0]}</span>
          <span className="label col-span-3">{r.head[1]}</span>
          <span className="label col-span-3">{r.head[2]}</span>
        </div>
        {r.rows.map(([role, what, money, status], i) => (
          <div
            key={role}
            className={`pad grid grid-cols-2 gap-y-2 border-b border-line py-5 last:border-b-0 md:grid-cols-12 ${i === 0 ? "" : "text-muted"}`}
          >
            <div className="col-span-2 md:col-span-6">
              <p className="text-[18px] font-medium">{role}</p>
              <p className="mt-1 text-[14px] text-muted">{what}</p>
            </div>
            <p className="font-mono text-[12px] md:col-span-3 md:text-[13px]">
              <span className="label md:hidden">{r.head[1]} · </span>
              {money}
            </p>
            <p className="font-mono text-[12px] md:col-span-3 md:text-[13px]">
              <span className={i === 0 ? "border border-text px-1.5 py-0.5 text-text" : ""}>{status}</span>
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
