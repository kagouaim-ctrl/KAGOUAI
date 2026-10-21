"use client";
import { useT } from "@/lib/i18n";
import { Section } from "./ui";

export default function Hiring() {
  const { t } = useT();
  const h = t.hiring;
  return (
    <Section n="06" label={h.label}>
      <h2 className="display pad max-w-[22ch] pb-10 pt-8 text-[clamp(30px,4.2vw,60px)]">{h.title}</h2>
      <ol className="grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {h.steps.map(([title, body], i) => (
          <li
            key={title}
            className="bg-bg px-4 py-7 sm:px-6 lg:px-10"
          >
            <p className="font-mono text-[12px] text-muted">STEP 0{i + 1}</p>
            <p className="mt-3 text-[19px] font-medium">{title}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
