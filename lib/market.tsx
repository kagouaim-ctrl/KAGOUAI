"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { marketTokens } from "@/content/site";

// Live Solana meme-coin prices from the public DexScreener API (CORS open, no key).
// If it can't be reached, the snapshot below is shown and labeled as a snapshot.

export type Coin = {
  address: string;
  symbol: string;
  name: string;
  price: number;
  h1: number;
  h24: number;
  mcap: number;
  liq: number;
  image: string;
};

const SNAPSHOT: Coin[] = [
  {
    "address": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    "symbol": "BONK",
    "name": "Bonk",
    "price": 2.843e-06,
    "h1": -0.23,
    "h24": -2.71,
    "mcap": 250234258,
    "liq": 287464.9,
    "image": "https://cdn.dexscreener.com/cms/images/ba03c0370670d176dc33bbd212eb023337a460ad7edfa053ca96ae22f31c3dcf"
  },
  {
    "address": "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
    "symbol": "WIF",
    "name": "dogwifhat",
    "price": 0.1728,
    "h1": -0.67,
    "h24": -3.55,
    "mcap": 172605247,
    "liq": 5073257.45,
    "image": "https://cdn.dexscreener.com/cms/images/c3788335fe7010d9c32ede4f211118f4a703e0b47fee61cd503c33cc9cde242a"
  },
  {
    "address": "6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN",
    "symbol": "TRUMP",
    "name": "OFFICIAL TRUMP",
    "price": 1.62,
    "h1": -0.42,
    "h24": 2.19,
    "mcap": 459377034,
    "liq": 209823.9,
    "image": "https://cdn.dexscreener.com/cms/images/85a2613c51c8ded8e51b1b3910487ab66691cb60fecec7d0905481a603bba899"
  },
  {
    "address": "9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump",
    "symbol": "FARTCOIN",
    "name": "Fartcoin",
    "price": 0.12,
    "h1": 0.17,
    "h24": -1.14,
    "mcap": 120013495,
    "liq": 6509065.38,
    "image": "https://cdn.dexscreener.com/cms/images/9af5672845c89585e9ff1e3b26a640090324aa4d92222052d1043e60ef8182de"
  },
  {
    "address": "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr",
    "symbol": "POPCAT",
    "name": "Popcat",
    "price": 0.03951,
    "h1": -0.65,
    "h24": -2.08,
    "mcap": 38726656,
    "liq": 3148779.4,
    "image": "https://cdn.dexscreener.com/cms/images/Pp6Fvh41hc0bHGK8"
  },
  {
    "address": "ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82",
    "symbol": "BOME",
    "name": "BOOK OF MEME",
    "price": 0.0005819,
    "h1": 0.28,
    "h24": -5.23,
    "mcap": 40128318,
    "liq": 12221498.22,
    "image": "https://cdn.dexscreener.com/cms/images/1fdb1c93b76e5aed7324c2c541558fd75fe7ffb3d0d0fb9ee8370cbac5890e4e"
  },
  {
    "address": "2qEHjDLDLbuBgRYvsxhc5D6uDWAivNFZGan56P1tpump",
    "symbol": "PNUT",
    "name": "Peanut the Squirrel",
    "price": 0.03886,
    "h1": -0.45,
    "h24": -3.3,
    "mcap": 38855979,
    "liq": 2797195.05,
    "image": "https://cdn.dexscreener.com/cms/images/778498984ea5b6eb7c9d74e1e81a2547c88a41ae80f6c840c94a7c3b7829bcd5"
  },
  {
    "address": "MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5",
    "symbol": "MEW",
    "name": "cat in a dogs world",
    "price": 0.0004064,
    "h1": 1.17,
    "h24": -2.71,
    "mcap": 36124320,
    "liq": 8339432.16,
    "image": "https://cdn.dexscreener.com/cms/images/33effe52dd5b1f6574ca5baaca9c02fecdecb557607a2a72889ceb0537eae9be"
  },
  {
    "address": "ED5nyyWEzpPPiWimP8vYm7sD7TD3LAt3Q3gRTWHzPJBY",
    "symbol": "MOODENG",
    "name": "Moo Deng",
    "price": 0.03496,
    "h1": 0.26,
    "h24": -2.22,
    "mcap": 34611635,
    "liq": 2364634.17,
    "image": "https://cdn.dexscreener.com/cms/images/8e02e1e7dec93a4ef4b2404976232940a1d80595e774cf3c5f2d6f23026867a9"
  },
  {
    "address": "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump",
    "symbol": "GOAT",
    "name": "Goatseus Maximus",
    "price": 0.01377,
    "h1": 0.77,
    "h24": -2.03,
    "mcap": 13775049,
    "liq": 1367002.97,
    "image": "https://cdn.dexscreener.com/cms/images/e857505d98436d21d13451a83c93ff4db36d0b53829af8070ddae75845d9b459"
  }
];

const API = "https://api.dexscreener.com/tokens/v1/solana/";
const EVERY = 30_000;

type Pair = {
  baseToken: { address: string; symbol: string; name: string };
  priceUsd?: string;
  priceChange?: { h1?: number; h24?: number };
  liquidity?: { usd?: number };
  marketCap?: number;
  fdv?: number;
  info?: { imageUrl?: string };
};

function parse(pairs: Pair[]): Coin[] {
  // One token has many pools; keep the deepest one.
  const best = new Map<string, Pair>();
  for (const p of pairs) {
    const a = p.baseToken.address;
    const cur = best.get(a);
    if (!cur || (p.liquidity?.usd ?? 0) > (cur.liquidity?.usd ?? 0)) best.set(a, p);
  }
  const out: Coin[] = [];
  for (const a of marketTokens) {
    const p = best.get(a);
    if (!p || !p.priceUsd) continue;
    out.push({
      address: a,
      symbol: p.baseToken.symbol.trim().replace(/^\$/, "").toUpperCase(),
      name: p.baseToken.name.trim(),
      price: Number(p.priceUsd),
      h1: p.priceChange?.h1 ?? 0,
      h24: p.priceChange?.h24 ?? 0,
      mcap: p.marketCap ?? p.fdv ?? 0,
      liq: p.liquidity?.usd ?? 0,
      image: (p.info?.imageUrl ?? "").split("?")[0],
    });
  }
  return out;
}

type State = { coins: Coin[]; live: boolean };
const Ctx = createContext<State>({ coins: SNAPSHOT, live: false });

export function MarketProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({ coins: SNAPSHOT, live: false });
  useEffect(() => {
    let stop = false;
    const load = async () => {
      if (document.hidden) return;
      try {
        const r = await fetch(API + marketTokens.join(","), { cache: "no-store" });
        if (!r.ok) throw new Error(String(r.status));
        const coins = parse(await r.json());
        if (!stop && coins.length >= 5) setState({ coins, live: true });
      } catch {
        if (!stop) setState((s) => ({ ...s, live: false }));
      }
    };
    load();
    const id = setInterval(load, EVERY);
    return () => {
      stop = true;
      clearInterval(id);
    };
  }, []);
  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
}

export const useMarket = () => useContext(Ctx);

export function fmtPrice(v: number) {
  if (v >= 1) return "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (v >= 0.01) return "$" + v.toFixed(4);
  // 0.000002843 -> $0.0{5}2843, the way trading terminals shorten it.
  const s = v.toFixed(12);
  const m = s.match(/^0\.(0+)(\d{4})/);
  if (m && m[1].length >= 4) return `$0.0{${m[1].length}}${m[2]}`;
  return "$" + v.toPrecision(4);
}

export function fmtUsd(v: number) {
  if (v >= 1e9) return "$" + (v / 1e9).toFixed(2) + "B";
  if (v >= 1e6) return "$" + (v / 1e6).toFixed(2) + "M";
  if (v >= 1e3) return "$" + (v / 1e3).toFixed(1) + "K";
  return "$" + v.toFixed(0);
}

export const fmtPct = (v: number) => (v > 0 ? "+" : "") + v.toFixed(2) + "%";
