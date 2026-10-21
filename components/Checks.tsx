"use client";
import { useT } from "@/lib/i18n";
import { Section, Square, toneText } from "./ui";

export default function Checks() {
  const { t } = useT();
  const c = t.checks;
  return (
    <Section id="product" n="02" label={c.label}>
      <h2 className="display pad pb-10 pt-8 text-[clamp(30px,4.2vw,60px)]">{c.title}</h2>
      <ol className="border-t border-line md:hidden">
        {c.rows.map((r) => {
          const tone = r.tone as "ok" | "review" | "block";
          return (
            <li key={r.out} className="pad space-y-3 border-b border-line py-6 last:border-b-0">
              <p className={`flex items-center gap-2 font-mono text-[13px] font-medium ${toneText(tone)}`}>
                <Square tone={tone} />
                {r.out}
              </p>
              <p className="font-mono text-[13px]">
                <span className="text-muted">&gt; </span>
                {r.req}
              </p>
              <dl className="grid grid-cols-[9ch_1fr] gap-x-3 gap-y-2 text-[14px]">
                <dt className="label pt-0.5">{c.head[1]}</dt>
                <dd className="font-mono text-[12px] leading-relaxed text-muted">{r.checks}</dd>
                <dt className="label pt-0.5">{c.head[2]}</dt>
                <dd className="leading-relaxed">{r.rule}</dd>
                <dt className="label pt-0.5">{c.head[3]}</dt>
                <dd className="leading-relaxed text-muted">{r.outNote}</dd>
              </dl>
            </li>
          );
        })}
      </ol>
      <div className="hidden border-t border-line md:block">
        <table className="w-full border-collapse text-left">
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
