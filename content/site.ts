// Facts and links shared by every language. Values marked TODO are unknown and
// must be filled in before launch; components render them visibly as placeholders.

export const TODO = (s: string) => `[${s}]`;
export const isTodo = (s: string) => s.startsWith("[");

export const site = {
  url: "https://kagouai.com",
  // Founder handles.
  telegram: "cc_XBNB",
  x: "KAGOUAI",
  github: "https://github.com/kagouaim-ctrl",
  // Where "Request early access" goes: the founder on Telegram until self-serve sign-up exists.
  accessHref: "https://t.me/cc_XBNB",
  demoHref: "/demo/",

  // Roadmap stage that gets YOU ARE HERE (index into roadmap.stages).
  // 1 = private beta: the console and runtime are built; real-model runs with first teams are next.
  currentStage: 1,
};

export const short = (a: string, head = 6, tail = 4) => `${a.slice(0, head)}…${a.slice(-tail)}`;

// Chat replay in the hero. Sample conversations, shown under a SAMPLE label; the copy lives per language.
export type Turn =
  | { k: "user"; text: string }
  | { k: "route"; agent: string; why: string }
  | { k: "step"; text: string }
  | { k: "hand"; agent: string; text: string }
  | { k: "result"; tone: "ok" | "review"; text: string }
  | { k: "approval"; text: string };
