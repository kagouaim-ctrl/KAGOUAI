"use client";
import { useT } from "@/lib/i18n";
import { site } from "@/content/site";

// Floating Telegram button on every page: the founder answers trial and support questions there.
export default function TelegramFab() {
  const { t } = useT();
  return (
    <a
      href={`https://t.me/${site.telegram}`}
      target="_blank"
      rel="noreferrer"
      aria-label={t.ui.telegram}
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 border border-line bg-bg px-3 py-2.5 font-mono text-[12px] text-text shadow-[0_4px_24px_rgba(0,0,0,.35)] transition-colors hover:border-text sm:bottom-6 sm:right-6 sm:px-4"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M21.94 4.3a1 1 0 0 0-1.36-1.07L2.6 10.2a1 1 0 0 0 .07 1.88l4.47 1.43 1.73 5.48a1 1 0 0 0 1.68.38l2.5-2.55 4.4 3.24a1 1 0 0 0 1.57-.6l3.04-14.2a1 1 0 0 0-.12-.96ZM9.9 14.1l-.53 3.1-1.16-3.69 9.5-6.36L9.9 14.1Z" />
      </svg>
      <span className="hidden sm:inline">{t.ui.telegram}</span>
      <span className="sm:hidden">Telegram</span>
    </a>
  );
}
