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
| `content/site.ts` | Shared links and facts: handles, early-access and demo links, roadmap stage, the chat replay's types. |
| `components/` | One component per section, plus `ChatReplay` (hero), `Nav` (with the block ticker) and `HexField`. |
| `lib/chain.tsx` | BSC block ticker. Reads a public RPC; shows `SIM` when no RPC answers. |
| `public/og.png` | Social preview image. |

## Before launch

- Drop the founder photo at `public/founder.jpg` and rebuild. The page picks it up automatically.
- Set `currentStage` in `content/site.ts` when a roadmap gate is passed.
- Old routes `/product` `/solutions` `/company` `/contact` redirect to the matching section.
