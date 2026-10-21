"use client";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

// BSC block ticker. Reads the real head from a public RPC, then advances locally
// every 0.75s and resyncs every 30s. If no RPC answers, it estimates from block
// time and says so (live=false renders as SIM).

const RPCS = ["https://bsc-dataseed.bnbchain.org", "https://bsc-dataseed1.binance.org", "https://bsc-rpc.publicnode.com"];
const BLOCK_MS = 750;
// Rough anchor for the offline estimate only.
const ANCHOR = { block: 106_000_000, t: Date.UTC(2026, 9, 1) };

type Chain = { block: number; gasGwei: number; live: boolean };
const Ctx = createContext<Chain>({ block: 0, gasGwei: 0.1, live: false });

async function rpc(url: string, signal: AbortSignal) {
  const body = JSON.stringify([
    { jsonrpc: "2.0", id: 1, method: "eth_blockNumber", params: [] },
    { jsonrpc: "2.0", id: 2, method: "eth_gasPrice", params: [] },
  ]);
  const r = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body, signal });
  const j = (await r.json()) as { id: number; result: string }[];
  const get = (id: number) => j.find((x) => x.id === id)?.result;
  const block = parseInt(get(1) ?? "", 16);
  const gas = parseInt(get(2) ?? "", 16) / 1e9;
  if (!Number.isFinite(block) || block <= 0) throw new Error("bad block");
  return { block, gasGwei: Number.isFinite(gas) ? gas : 0.1 };
}

async function head(): Promise<{ block: number; gasGwei: number } | null> {
  for (const url of RPCS) {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 3500);
    try {
      return await rpc(url, ctl.signal);
    } catch {
    } finally {
      clearTimeout(timer);
    }
  }
  return null;
}

const estimate = () => ANCHOR.block + Math.floor((Date.now() - ANCHOR.t) / BLOCK_MS);

export function ChainProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [state, setState] = useState<Chain>({ block: 0, gasGwei: 0.1, live: false });
  const base = useRef<{ block: number; at: number } | null>(null);

  useEffect(() => {
    let alive = true;
    const sync = async () => {
      const h = await head();
      if (!alive) return;
      if (h) {
        base.current = { block: h.block, at: Date.now() };
        setState({ block: h.block, gasGwei: h.gasGwei, live: true });
      } else if (!base.current) {
        base.current = { block: estimate(), at: Date.now() };
        setState((s) => ({ ...s, block: base.current!.block, live: false }));
      }
    };
    sync();
    const resync = setInterval(sync, 30_000);
    return () => {
      alive = false;
      clearInterval(resync);
    };
  }, []);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      const b = base.current;
      if (!b || document.hidden) return;
      const block = b.block + Math.floor((Date.now() - b.at) / BLOCK_MS);
      setState((s) => (s.block === block ? s : { ...s, block }));
    }, BLOCK_MS);
    return () => clearInterval(id);
  }, [reduce]);

  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
}

export const useChain = () => useContext(Ctx);
