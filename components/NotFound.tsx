"use client";
import { useT } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useT();
  return (
    <main id="main" className="wrap flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">404</p>
      <h1 className="h-display mt-4 text-[clamp(32px,5vw,64px)]">{t.ui.notFound}</h1>
      <a href="/" className="btn-primary mt-10 h-12 px-6 text-[15px]">
        ← {t.ui.home}
      </a>
    </main>
  );
}
