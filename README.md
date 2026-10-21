# KAGOU site

Next.js 14 (App Router) + Tailwind + Framer Motion, exported as a static site (`out/`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/, deploy as-is on Vercel
```

## Where things live

| Path | What |
|---|---|
| `content/en.ts` `zh.ts` `ja.ts` | All copy. EN is the default; `?lang=ja` / `?lang=zh` or the switcher changes it. |
| `content/site.ts` | Shared facts and links: testnet agent ID, wallet, limits, handles, roadmap stage, terminal script. |
| `components/` | One component per section, plus `Terminal`, `Nav` (with the block ticker) and `HexField`. |
| `lib/chain.tsx` | BSC block ticker. Reads a public RPC; shows `SIM` when no RPC answers. |
| `public/og.png` | Social preview image. |

## Before launch

- Fill the `[telegram]` and `[x]` handles in `content/site.ts`. They render as dashed placeholders until then.
- Drop the founder photo at `public/founder.jpg` and rebuild. The page picks it up automatically.
- Set `currentStage` in `content/site.ts` when a roadmap gate is passed.
- Old routes `/product` `/solutions` `/company` `/contact` redirect to the matching section.
