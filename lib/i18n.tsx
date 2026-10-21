"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { en, type Content } from "@/content/en";
import { zh } from "@/content/zh";
import { ja } from "@/content/ja";

export type Lang = "en" | "zh" | "ja";
export const langs: { id: Lang; label: string; html: string }[] = [
  { id: "ja", label: "JP", html: "ja" },
  { id: "en", label: "EN", html: "en" },
  { id: "zh", label: "中", html: "zh-CN" },
];
const content: Record<Lang, Content> = { en, zh, ja };
const KEY = "kagou.lang";

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "en", setLang: () => {} });

const isLang = (v: unknown): v is Lang => v === "en" || v === "zh" || v === "ja";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("lang");
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {}
    const next = isLang(q) ? q : isLang(saved) ? saved : null;
    if (next) setLangState(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = langs.find((l) => l.id === lang)!.html;
    document.title = content[lang].meta.title;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  };

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useT() {
  const { lang, setLang } = useContext(Ctx);
  return { t: content[lang], lang, setLang };
}
