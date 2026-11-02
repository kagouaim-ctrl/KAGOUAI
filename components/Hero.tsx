"use client";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { site } from "@/content/site";
import { Arrow, Frame, ext } from "./ui";

export default function Hero() {
  const { t } = useT();
  const h = t.hero;
  const f = h.float;
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />
      <div className="wrap relative flex flex-col items-center pb-10 pt-14 text-center sm:pt-20 lg:pt-24">
        <motion.a
          href={site.appHref}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pill hover:border-white/25 hover:text-text"
        >
          <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-up" />
          {h.badge}
          <Arrow className="h-3.5 w-3.5" />
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="h-display mt-6 text-[clamp(38px,6.6vw,84px)]"
        >
          {h.title}
          <br />
          <span className="bg-gradient-to-r from-[#8fa0ff] via-accent to-[#21c95e] bg-clip-text text-transparent lg:whitespace-nowrap">{h.accent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 max-w-[40rem] text-[16px] leading-relaxed text-muted sm:text-[18px]"
        >
          {h.sub}
        </motion.p>

        {/* The main entry: centered, one button. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-9 flex w-full flex-col items-center gap-4"
        >
          <a href={site.appHref} className="btn-primary group h-14 w-full max-w-[20rem] px-10 text-[17px] shadow-[0_12px_40px_-8px_rgba(81,106,246,0.7)] sm:w-auto sm:max-w-none">
            {h.cta}
            <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href={site.accessHref} {...ext(site.accessHref)} className="text-[14px] font-medium text-muted underline decoration-line underline-offset-4 transition-colors hover:text-text hover:decoration-text">
            {h.secondary}
          </a>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex max-w-[44rem] flex-wrap justify-center gap-2"
        >
          {h.chips.map((c) => (
            <li key={c} className="pill">
              <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5 text-up" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {c}
            </li>
          ))}
        </motion.ul>

        {/* App preview with two decision cards taken from the app's sample data. */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.2, 0.7, 0.1, 1] }}
          className="relative mt-14 w-full max-w-[1120px] sm:mt-16"
        >
          <Frame label="kagouai.com/meme">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/shots/discover.webp" alt="" width={1920} height={1200} className="block w-full" />
          </Frame>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent" />
          <FloatCard className="-left-2 top-[22%] hidden md:block lg:-left-12" tone="up" title={f.buyTitle} body={f.buyBody} tag={f.sample} delay={0.9} />
          <FloatCard className="-right-2 top-[52%] hidden md:block lg:-right-12" tone="down" title={f.vetoTitle} body={f.vetoBody} tag={f.sample} delay={1.1} />
        </motion.div>
        <p className="relative -mt-4 text-[12px] text-faint">{h.note}</p>
      </div>
    </section>
  );
}

function FloatCard({ className, tone, title, body, tag, delay }: { className: string; tone: "up" | "down"; title: string; body: string; tag: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`absolute w-[300px] rounded-2xl border border-line bg-raised/90 p-4 text-left shadow-2xl backdrop-blur-xl ${className}`}
    >
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${tone === "up" ? "bg-up/15 text-up" : "bg-down/15 text-down"}`}>
          {tone === "up" ? (
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          ) : (
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" /></svg>
          )}
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[14px] font-semibold">
            {title}
          </p>
          <p className="mt-1 text-[12.5px] leading-snug text-muted">{body}</p>
          <p className="mt-2 inline-block rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-faint">{tag}</p>
        </div>
      </div>
    </motion.div>
  );
}
