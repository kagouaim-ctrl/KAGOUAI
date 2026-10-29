"use client";
import { useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import type { Turn } from "@/content/site";
import { toneText, useReduced } from "./ui";

const T = { char: 22, line: 420, afterUser: 520, hold: 2200, restart: 3600 };

type Row = Turn & { first: boolean };

// A sample conversation in the console, replayed: the request is typed, then the routing, steps,
// hand-offs and the result appear one by one. One conversation at a time.
export default function ChatReplay() {
  const { t } = useT();
  const r = t.replay;
  const groups: Row[][] = useMemo(() => r.script.map((turns) => turns.map((l, i) => ({ ...l, first: i === 0 }))), [r.script]);
  const reduce = useReduced();
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { amount: 0.25 });
  const [paused, setPaused] = useState(false);
  const [g, setG] = useState(0); // conversation on screen
  const [j, setJ] = useState(0); // rows revealed in it
  const [c, setC] = useState(0); // chars typed on the row being revealed

  const running = inView && !paused && !reduce;
  const rows = groups[g] ?? groups[0];

  // Language switch: start over so the typed text matches.
  useEffect(() => {
    setG(0);
    setJ(0);
    setC(0);
  }, [groups]);

  useEffect(() => {
    if (!running) return;
    if (j >= rows.length) {
      const id = setTimeout(
        () => {
          setG((n) => (n + 1) % groups.length);
          setJ(0);
          setC(0);
        },
        g === groups.length - 1 ? T.restart : T.hold,
      );
      return () => clearTimeout(id);
    }
    const row = rows[j];
    if (row.k === "user" && c < row.text.length) {
      const id = setTimeout(() => setC((n) => n + 1), T.char);
      return () => clearTimeout(id);
    }
    const id = setTimeout(
      () => {
        setJ((n) => n + 1);
        setC(0);
      },
      row.k === "user" ? T.afterUser : T.line,
    );
    return () => clearTimeout(id);
  }, [running, g, j, c, rows, groups.length]);

  const transcript = useMemo(
    () =>
      groups
        .flat()
        .map((x) =>
          x.k === "user"
            ? `> ${r.you}: ${x.text}`
            : x.k === "route"
              ? `  → ${x.agent} (${r.why}: ${x.why})`
              : x.k === "hand"
                ? `  ↳ ${x.agent}: ${x.text}`
                : `  ${x.text}`,
        )
        .join("\n"),
    [groups, r.you, r.why],
  );

  const view = reduce ? groups.flat() : rows;

  return (
    <div ref={box} className="border border-line bg-bg">
      <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2 font-mono text-[12px]">
        <p className="truncate text-muted">
          <span className="text-text">{r.title}</span> · {r.tag}
        </p>
        {!reduce && (
          <button
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="shrink-0 border border-line px-2 py-0.5 text-muted transition-colors hover:border-text hover:text-text"
          >
            {paused ? r.play : r.pause}
          </button>
        )}
      </div>
      <pre className="sr-only">{transcript}</pre>
      <div aria-hidden className="min-h-[23rem] px-3 py-4 font-mono text-[12px] leading-[1.7] sm:min-h-[25rem] sm:px-4 sm:text-[13px]">
        {view.map((x, n) => {
          const typing = !reduce && n === j && x.k === "user";
          const visible = reduce || n < j || (typing && c > 0);
          return (
            <div key={`${g}-${n}`} className={`${visible ? "" : "invisible"} ${reduce && x.first && n > 0 ? "mt-5 border-t border-line pt-4" : ""}`}>
              <Line row={x} text={typing ? x.text.slice(0, c) : undefined} caret={typing && running} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Line({ row, text, caret }: { row: Row; text?: string; caret: boolean }) {
  const { t } = useT();
  const r = t.replay;
  switch (row.k) {
    case "user":
      return (
        <div className="mb-3 flex justify-end">
          <p className="max-w-[88%] break-words border border-line bg-surface px-3 py-2 font-sans text-[14px] leading-relaxed text-text">
            {text ?? row.text}
            {caret && <span className="caret ml-px inline-block h-[1.05em] w-[0.5em] translate-y-[2px] bg-text" />}
          </p>
        </div>
      );
    case "route":
      return (
        <p className="break-words">
          <span className="text-signal">→ {row.agent}</span>
          <span className="text-muted">
            {"  "}
            {r.why}: {row.why}
          </span>
        </p>
      );
    case "step":
      return (
        <p className="break-words pl-[2ch]">
          <span className="text-ok">✓ </span>
          <span className="text-muted">{row.text}</span>
        </p>
      );
    case "hand":
      return (
        <p className="break-words">
          <span className="text-signal">↳ {row.agent}</span>
          <span className="text-muted">{"  "}{row.text}</span>
        </p>
      );
    case "result":
      return <p className={`mt-2 break-words font-medium ${toneText(row.tone)}`}>■ {row.text}</p>;
    case "approval":
      return (
        <div className="mt-3 border border-signal px-3 py-3">
          <p className="font-sans text-[14px] leading-relaxed text-text">{row.text}</p>
          <p className="mt-3 flex flex-wrap gap-2 text-[11px]">
            <span className="border border-line px-2 py-1 text-text">{r.approve[0]}</span>
            <span className="border border-line px-2 py-1 text-muted">{r.approve[1]}</span>
            <span className="bg-signal px-2 py-1 font-medium text-bg">{r.approve[2]}</span>
          </p>
        </div>
      );
  }
}
