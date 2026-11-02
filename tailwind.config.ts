import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        raised: "rgb(var(--raised) / <alpha-value>)",
        line: "var(--line)",
        text: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        faint: "rgb(var(--faint) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        up: "rgb(var(--up) / <alpha-value>)",
        down: "rgb(var(--down) / <alpha-value>)",
        warn: "rgb(var(--warn) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-cjk)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { page: "1280px" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        pulseDot: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".35" } },
        flowX: { from: { transform: "translateX(-100%)" }, to: { transform: "translateX(300%)" } },
        flowY: { from: { transform: "translateY(-100%)" }, to: { transform: "translateY(300%)" } },
        shine: { from: { transform: "translateX(-120%) skewX(-20deg)" }, to: { transform: "translateX(320%) skewX(-20deg)" } },
      },
      animation: {
        marquee: "marquee 60s linear infinite",
        pulseDot: "pulseDot 1.6s ease-in-out infinite",
        flowX: "flowX 1.8s linear infinite",
        flowY: "flowY 1.8s linear infinite",
        shine: "shine 3.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
