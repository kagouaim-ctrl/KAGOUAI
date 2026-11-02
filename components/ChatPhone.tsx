"use client";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { useReduced } from "./ui";

// The token chat from the app, rebuilt in HTML so messages arrive one by one.
const avatar: Record<string, string> = {
  agent: "bg-gradient-to-br from-[#f6c35a] to-[#c46b2f]",
  human: "bg-gradient-to-br from-[#ff8fb1] to-[#7bdcb5]",
};

export default function ChatPhone() {
  const { t } = useT();
  const c = t.chat;
  const reduce = useReduced();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [n, setN] = useState(c.msgs.length);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (reduce) return setN(c.msgs.length);
    if (inView) setN(0);
  }, [inView, reduce, c.msgs.length]);

  useEffect(() => {
    if (reduce || !inView) return;
    if (n >= c.msgs.length) {
      const id = setTimeout(() => setN(0), 5200);
      return () => clearTimeout(id);
    }
    setTyping(true);
    const id = setTimeout(() => {
      setTyping(false);
      setN((x) => x + 1);
    }, n === 0 ? 700 : 1700);
    return () => clearTimeout(id);
  }, [n, inView, reduce, c.msgs.length]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[380px]">
      <div aria-hidden className="absolute -inset-10 rounded-full bg-accent/20 blur-[100px]" />
      <div className="relative rounded-[44px] border border-white/15 bg-[#0b0a14] p-2.5 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)]">
        <div className="overflow-hidden rounded-[36px] bg-bg">
          <div className="flex justify-center pt-2.5">
            <span className="h-[22px] w-[96px] rounded-full bg-black" />
          </div>
          <div className="flex items-center justify-between border-b border-line px-4 pb-3 pt-3">
            <div className="flex items-center gap-2.5">
              <span className="h-8 w-8 rounded-full bg-gradient-to-br from-[#ff7ad9] via-[#8f7bff] to-[#4cc9f0]" />
              <div>
                <p className="text-[14px] font-semibold">{c.group}</p>
                <p className="flex items-center gap-1 text-[11px] text-up">
                  <span className="h-1.5 w-1.5 rounded-full bg-up" />
                  {c.online}
                </p>
              </div>
            </div>
            <span className="text-[18px] leading-none text-muted">⋯</span>
          </div>
          <div className="flex h-[440px] flex-col justify-end gap-3 overflow-hidden px-3 py-4">
            <AnimatePresence initial={false}>
              {c.msgs.slice(0, n).map(([kind, who, pos, text], k) => {
                const mine = kind === "me" || kind === "myagent";
                return (
                  <motion.div
                    key={`${k}-${text.slice(0, 8)}`}
                    layout
                    initial={{ opacity: 0, y: 14, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                    className={`flex gap-2 ${mine ? "justify-end" : ""}`}
                  >
                    {!mine && (
                      <span className={`relative mt-5 h-8 w-8 shrink-0 rounded-full ${avatar[kind] ?? avatar.human}`}>
                        {kind === "agent" && <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-accent px-1 text-[8px] font-bold leading-[12px] text-white">AI</span>}
                      </span>
                    )}
                    <div className={`max-w-[78%] ${mine ? "items-end text-right" : ""} flex flex-col`}>
                      <p className={`mb-1 flex items-center gap-1.5 text-[11px] ${mine ? "justify-end" : ""}`}>
                        <span className="font-semibold text-text">{who || c.you}</span>
                        <span className={`rounded px-1 py-px text-[10px] ${pos.includes("−") ? "bg-down/15 text-down" : "bg-up/15 text-up"}`}>{pos}</span>
                      </p>
                      <p
                        className={`rounded-2xl px-3 py-2 text-left text-[13px] leading-relaxed ${
                          kind === "me" ? "rounded-tr-md bg-up text-[#04130a]" : kind === "myagent" ? "rounded-tr-md bg-accent text-white" : "rounded-tl-md bg-raised text-text"
                        }`}
                      >
                        {text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {typing && n < c.msgs.length && (
              <div className={`flex ${c.msgs[n][0] === "me" || c.msgs[n][0] === "myagent" ? "justify-end" : "pl-10"}`}>
                <span className="flex gap-1 rounded-2xl bg-raised px-3 py-2.5">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-muted" style={{ animationDelay: `${d * 0.18}s` }} />
                  ))}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 border-t border-line p-3">
            <span className="flex-1 truncate rounded-full bg-raised px-4 py-2.5 text-[12px] text-faint">{c.input}</span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-white">➤</span>
          </div>
        </div>
      </div>
    </div>
  );
}
