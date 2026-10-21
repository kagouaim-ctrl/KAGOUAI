"use client";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { LangProvider } from "@/lib/i18n";
import { ChainProvider } from "@/lib/chain";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <ChainProvider>{children}</ChainProvider>
      </LangProvider>
    </MotionConfig>
  );
}
