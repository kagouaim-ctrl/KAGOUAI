"use client";
import { useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { useChain } from "@/lib/chain";
import { script, type TLine } from "@/content/site";
import { toneText, useReduced } from "./ui";

const T = { char: 26, line: 240, afterReq: 420, hold: 1700, restart: 4200 };

type Row = TLine & { first: boolean; group: number };
const rows: Row[] = script.flatMap((req, g) => req.map((l, i) => ({ ...l, first: i === 0, group: g })));

export default function Terminal() {
  const { t } = useT();
  const { block } = useChain();
  const reduce = useReduced();
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { amount: 0.25 });
  const [paused, setPaused] = useState(false);
  const [i, setI] = useState(0); // row being revealed
  const [c, setC] = useState(0); // chars typed on a request row
  const [paidAt, setPaidAt] = useState<number | null>(null);

  const running = inView && !paused && !reduce;

  useEffect(() => {
    if (!running) return;
    if (i >= rows.length) {
      const id = setTimeout(() => {
        setI(0);
        setC(0);
        setPaidAt(null);
      }, T.restart);
      return () => clearTimeout(id);
    }
    const row = rows[i];
    if (row.k === "req" && c < row.text.length) {
      const id = setTimeout(() => setC((n) => n + 1), T.char);
      return () => clearTimeout(id);
    }
    const delay = row.k === "req" ? T.afterReq : row.k === "out" ? T.hold : T.line;
    const id = setTimeout(() => {
      setI((n) => n + 1);
      setC(0);
    }, delay);
    return () => clearTimeout(id);
  }, [running, i, c]);

  useEffect(() => {
    const row = rows[i - 1];
    if (row?.k === "out" && row.block && paidAt === null) setPaidAt(block);
  }, [i, block, paidAt]);

  const shown = reduce ? rows.length : i;
  const current = rows[Math.min(shown, rows.length - 1)].group;
  const blockNo = (paidAt ?? block) || null;

  const transcript = useMemo(
    () =>
      rows
        .map((r) =>
          r.k === "req"
            ? `> ${r.who}: ${r.text}`
            : r.k === "chk"
              ? `  ${r.label} ${r.ok === true ? "✓" : r.ok === false ? "✗" : ""} ${r.value}`
              : `  ${r.text}`,
        )
        .join("\n"),
    [],
  );

  return (
    <div ref={box} className="border border-line bg-bg">
      <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2 font-mono text-[12px]">
        <p className="truncate text-muted">
          <span className="text-text">{t.terminal.title}</span> · {t.terminal.tag}
        </p>
        {!reduce && (
          <button
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="shrink-0 border border-line px-2 py-0.5 text-muted transition-colors hover:border-text hover:text-text"
          >
            {paused ? t.terminal.play : t.terminal.pause}
          </button>
        )}
      </div>
      <pre className="sr-only">{transcript}</pre>
      <div aria-hidden className="px-3 py-4 max-md:min-h-[17.5rem] font-mono text-[12px] leading-[1.7] sm:px-4 sm:text-[13px]">
        {rows.map((r, n) => {
          const visible = n < shown || (n === shown && r.k === "req" && c > 0);
          const typing = n === shown && r.k === "req";
          // On phones only the request being replayed is shown, so the box stays short.
          const other = !reduce && r.group !== current ? "max-md:hidden" : "";
          return (
            <div key={n} className={`${visible ? "" : "invisible"} ${r.first && n > 0 ? "mt-4 max-md:mt-0" : ""} ${other}`}>
              <Line row={r} text={typing ? r.text.slice(0, c) : undefined} caret={typing && running} block={blockNo} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Line({ row, text, caret, block }: { row: Row; text?: string; caret: boolean; block: number | null }) {
  if (row.k === "req")
    return (
      <p className="break-words">
        <span className="text-muted">&gt; {row.who}: </span>
        <span className="text-text">{text ?? row.text}</span>
        {caret && <span className="caret ml-px inline-block h-[1.05em] w-[0.55em] translate-y-[2px] bg-text" />}
      </p>
    );
  if (row.k === "chk")
    return (
      <p className="grid grid-cols-[11ch_1fr] pl-[2ch]">
        <span className="text-muted">{row.label}</span>
        <span className="break-words">
          {row.ok === true && <span className="text-ok">✓ </span>}
          {row.ok === false && <span className="text-block">✗ </span>}
          <span className={row.ok === false ? "text-text" : "text-muted"}>{row.value}</span>
        </span>
      </p>
    );
  return (
    <p className={`pl-[2ch] font-medium ${toneText(row.tone)} break-words`}>
      ■ {row.text}
      {row.block && block ? <span className="font-normal text-muted"> · block #{block.toLocaleString("en-US")}</span> : null}
    </p>
  );
}
