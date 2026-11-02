# KAGOU site

Next.js 14 (App Router) + Tailwind + Framer Motion, exported as a static site (`out/`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/, deploy as-is on Vercel
```

## Where things live

The homepage presents KAGOU as an AI-agent meme-coin trading app. The app itself is the static build at `public/meme/`.

| Path | What |
|---|---|
| `content/en.ts` `zh.ts` `ja.ts` | All copy. EN is the default; `?lang=ja` / `?lang=zh` or the switcher changes it. |
| `content/site.ts` | Shared links (`appHref` is where every "Launch app" button goes), roadmap stage, and the tokens in the live market table. |
| `lib/market.tsx` | Live Solana prices from the public DexScreener API, refreshed every 30 s. Falls back to a dated snapshot and labels it as one. |
| `components/` | One component per homepage section, plus `Nav` (with the price marquee) and `Footer`. |
| `public/shots/` | Screenshots of the app at `/meme/` used on the homepage. Retake them when the app changes. |
| `public/og.png` | Social preview image. |

## Before launch

- Set `currentStage` in `content/site.ts` when a roadmap stage ships.
- Old routes `/product` `/solutions` `/company` `/contact` redirect to sections of the homepage.
- `/demo/` redirects to `/meme/` (see `vercel.json`).
