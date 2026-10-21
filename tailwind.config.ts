import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    borderRadius: { none: "0", DEFAULT: "2px", sm: "2px" },
    boxShadow: { none: "none" },
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        line: "var(--line)",
        text: "var(--text)",
        muted: "var(--muted)",
        signal: "var(--signal)",
        ok: "var(--ok)",
        review: "var(--review)",
        block: "var(--block)",
      },
      fontFamily: {
        display: ["var(--font-archivo)", "var(--font-cjk)", "sans-serif"],
        sans: ["var(--font-plex)", "var(--font-cjk)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { page: "1360px" },
    },
  },
  plugins: [],
} satisfies Config;
