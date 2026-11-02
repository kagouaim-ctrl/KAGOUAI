"use client";
import { useT } from "@/lib/i18n";

export default function Privacy() {
  const { t } = useT();
  const p = t.privacy;
  return (
    <main id="main" className="wrap min-h-[60vh] py-16 sm:py-24">
      <h1 className="h-display text-[clamp(36px,5vw,64px)]">{p.title}</h1>
      <div className="mt-10 max-w-[44rem] space-y-5 text-[16px] leading-relaxed text-muted">
        {p.body.map((b) => (
          <p key={b}>{b}</p>
        ))}
      </div>
      <a href="/" className="btn-ghost mt-12 h-11 px-5 text-[14px]">
        ← {p.back}
      </a>
    </main>
  );
}
