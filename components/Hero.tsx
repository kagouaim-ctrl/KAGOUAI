"use client";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { site } from "@/content/site";
import { Arrow, Frame, ext, useReduced } from "./ui";

export default function Hero() {
  const { t } = useT();
  const h = t.hero;
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[-420px] h-[900px] w-[900px] -translate-x-1/2 animate-[spin_40s_linear_infinite] rounded-full bg-[conic-gradient(from_90deg,transparent_0deg,rgba(81,106,246,0.22)_60deg,transparent_120deg,rgba(33,201,94,0.10)_200deg,transparent_260deg,rgba(255,98,46,0.08)_320deg,transparent_360deg)] blur-3xl" />
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
          <a href={site.appHref} className="btn-primary group relative h-14 overflow-hidden w-full max-w-[20rem] px-10 text-[17px] shadow-[0_12px_40px_-8px_rgba(81,106,246,0.7)] sm:w-auto sm:max-w-none">
            {h.cta}
            <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/30 to-transparent" />
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

        {/* App preview: tilted back in 3D, flattens as you scroll. A live-looking agent feed floats beside it. */}
        <Preview />
        <p className="relative -mt-4 text-[12px] text-faint">{h.note}</p>
      </div>
    </section>
  );
}


const toneCls: Record<string, string> = {
  up: "bg-up/15 text-up",
  down: "bg-down/15 text-down",
  muted: "bg-white/10 text-muted",
  accent: "bg-accent/20 text-[#9aa8ff]",
};
const toneIcon: Record<string, string> = { up: "M3.5 8.5l3 3 6-7", down: "M4 4l8 8M12 4l-8 8", muted: "M4 8h8", accent: "M7 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm3 7 3 3" };

function Preview() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReduced();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 25%"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const rotateX = useTransform(p, [0, 1], [24, 0]);
  const scale = useTransform(p, [0, 1], [0.9, 1]);
  const y = useTransform(p, [0, 1], [40, 0]);
  return (
    <div ref={ref} className="relative mt-14 w-full max-w-[1120px] [perspective:1600px] sm:mt-16">
      <motion.div style={reduce ? undefined : { rotateX, scale, y, transformOrigin: "50% 0%" }} className="relative">
        <div aria-hidden className="absolute -inset-x-10 -top-10 bottom-0 rounded-[40px] bg-accent/25 blur-[90px]" />
        <Frame label="kagouai.com/meme" className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/shots/discover.webp" alt="" width={1920} height={1200} className="block w-full" />
        </Frame>
        <Feed />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}

// Stacked toasts: one new sample event every few seconds, newest on top.
function Feed() {
  const { t } = useT();
  const f = t.feed;
  const reduce = useReduced();
  const [n, setN] = useState(3);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setN((x) => x + 1), 2600);
    return () => clearInterval(id);
  }, [reduce]);
  const shown = [0, 1, 2].map((k) => {
    const i = n - 1 - k;
    return { key: i, item: f.items[((i % f.items.length) + f.items.length) % f.items.length] };
  });
  return (
    <div className="absolute -right-3 top-[14%] hidden w-[310px] md:block lg:-right-14">
      <div className="mb-2 flex items-center justify-between px-1 text-[11px] font-semibold">
        <span className="flex items-center gap-1.5 text-text">
          <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-up" />
          {f.title}
        </span>
        <span className="rounded bg-white/5 px-1.5 py-0.5 font-medium text-faint">{f.sample}</span>
      </div>
      <ul className="relative space-y-2">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map(({ key, item: [tone, title, body] }, k) => (
            <motion.li
              key={key}
              layout
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1 - k * 0.22, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="flex items-start gap-3 rounded-2xl border border-line bg-raised/90 p-3.5 text-left shadow-2xl backdrop-blur-xl"
            >
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${toneCls[tone]}`}>
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={toneIcon[tone]} />
                </svg>
              </span>
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold">{title}</p>
                <p className="mt-0.5 text-[12px] leading-snug text-muted">{body}</p>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
