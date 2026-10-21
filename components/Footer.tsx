"use client";
import { useT } from "@/lib/i18n";
import { LangSwitch } from "./ui";

export default function Footer() {
  const { t } = useT();
  const f = t.footer;
  return (
    <footer className="wrap relative border-t border-line">
      <div className="pad flex flex-col gap-4 py-8 font-mono text-[12px] text-muted md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="text-text">{f.place}</span>
          <LangSwitch className="-ml-1.5" />
          <a href="/privacy/" className="link">
            {f.privacy}
          </a>
        </div>
        <p>{f.disclaimer}</p>
      </div>
    </footer>
  );
}
