"use client";
import { useT } from "@/lib/i18n";
import { Section } from "./ui";

export default function Stack() {
  const { t } = useT();
  const s = t.stack;
  return (
    <Section n="06" label={s.label}>
      <h2 className="display pad pb-10 pt-8 text-[clamp(30px,4.2vw,60px)]">{s.title}</h2>
      <ul className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {s.items.map(([name, what], i) => (
          <li
            key={name}
            className={`pad border-b border-line py-6 ${i % 2 ? "sm:border-l" : ""} lg:border-l lg:[&:nth-child(3n+1)]:border-l-0 ${i >= 3 ? "lg:border-b-0" : ""} ${i >= 4 ? "sm:border-b-0" : ""} max-sm:last:border-b-0`}
          >
            <p className="font-mono text-[14px]">{name}</p>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{what}</p>
          </li>
        ))}
      </ul>
      <p className="pad border-t border-line py-4 font-mono text-[12px] text-muted">{s.note}</p>
    </Section>
  );
}
