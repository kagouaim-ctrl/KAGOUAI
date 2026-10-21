"use client";
import { useT } from "@/lib/i18n";

export default function Privacy() {
  const { t } = useT();
  const p = t.privacy;
  return (
    <main className="wrap pad min-h-[60vh] py-16">
      <h1 className="display text-[clamp(36px,5vw,72px)]">{p.title}</h1>
      <div className="mt-10 max-w-[44rem] space-y-5 text-[16px] leading-relaxed text-muted">
        {p.body.map((b) => (
          <p key={b}>{b}</p>
        ))}
      </div>
      <a href="/" className="link mt-12 inline-block font-mono text-[13px]">
        ← {p.back}
      </a>
    </main>
  );
}
