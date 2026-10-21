"use client";
import { useT } from "@/lib/i18n";

// Floating button on every page: opens the chat in the console demo, laid out like Telegram,
// so visitors talk to the AI team without leaving the site.
export default function ChatFab() {
  const { t } = useT();
  return (
    <a
      href="/demo/#chat"
      aria-label={t.ui.chat}
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 border border-line bg-bg px-3 py-2.5 font-mono text-[12px] text-text shadow-[0_4px_24px_rgba(0,0,0,.35)] transition-colors hover:border-text sm:bottom-6 sm:right-6 sm:px-4"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M12 3C6.5 3 2 6.8 2 11.5c0 2.4 1.2 4.6 3.1 6.1L4.5 21l3.9-1.9c1.1.3 2.3.5 3.6.5 5.5 0 10-3.8 10-8.5S17.5 3 12 3Zm-4.5 9.7a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm4.5 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm4.5 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z" />
      </svg>
      <span className="hidden sm:inline">{t.ui.chat}</span>
      <span className="sm:hidden">{t.ui.chat.length > 8 ? "Chat" : t.ui.chat}</span>
    </a>
  );
}
