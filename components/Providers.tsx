"use client";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { LangProvider } from "@/lib/i18n";
import { MarketProvider } from "@/lib/market";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <MarketProvider>{children}</MarketProvider>
      </LangProvider>
    </MotionConfig>
  );
}
