"use client";
import { useT } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useT();
  return (
    <main id="main" className="wrap pad flex min-h-[60vh] flex-col justify-center py-20">
      <p className="label">ERROR 404 · NOT FOUND</p>
      <h1 className="display mt-6 text-[clamp(36px,6vw,88px)]">{t.ui.notFound}</h1>
      <a href="/" className="link mt-10 font-mono text-[13px]">
        ← {t.ui.home}
      </a>
    </main>
  );
}
