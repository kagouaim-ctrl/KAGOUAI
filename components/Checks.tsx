"use client";
import { useT } from "@/lib/i18n";
import { Section, Square, toneText } from "./ui";

export default function Checks() {
  const { t } = useT();
  const c = t.checks;
  return (
    <Section id="product" n="02" label={c.label}>
      <h2 className="display pad pb-10 pt-8 text-[clamp(30px,4.2vw,60px)]">{c.title}</h2>
      <p className="label pad pb-2 md:hidden">{t.common.scrollHint}</p>
      <div className="overflow-x-auto border-t border-line" role="region" aria-label={c.scroll} tabIndex={0}>
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              {c.head.map((h, i) => (
                <th
                  key={h}
                  scope="col"
                  className={`label px-4 py-3 font-normal first:pl-4 sm:first:pl-6 lg:first:pl-10 ${i > 0 ? "border-l border-line" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.rows.map((r) => {
              const tone = r.tone as "ok" | "review" | "block";
              return (
                <tr key={r.out} className="border-b border-line align-top last:border-b-0">
                  <td className="w-[30%] py-6 pl-4 pr-4 font-mono text-[13px] sm:pl-6 lg:pl-10">
                    <span className="text-muted">&gt; </span>
                    {r.req}
                  </td>
                  <td className="w-[22%] border-l border-line px-4 py-6 font-mono text-[12px] leading-relaxed text-muted">
                    {r.checks}
                  </td>
                  <td className="w-[22%] border-l border-line px-4 py-6 text-[14px] leading-relaxed">{r.rule}</td>
                  <td className="border-l border-line px-4 py-6">
                    <p className={`flex items-center gap-2 font-mono text-[13px] font-medium ${toneText(tone)}`}>
                      <Square tone={tone} />
                      {r.out}
                    </p>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">{r.outNote}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pad border-t border-line py-8">
        <p className="max-w-[60rem] text-[17px] leading-relaxed sm:text-[19px]">{c.note}</p>
      </div>
    </Section>
  );
}
