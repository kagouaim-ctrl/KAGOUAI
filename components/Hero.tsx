"use client";
import Link from "next/link";
import {motion} from "framer-motion";
import {useT} from "@/lib/i18n";
const N:[string,number,number][]=[["Sales",220,60],["Operations",372,170],["Customer Success",318,352],["Research",122,352],["Administration",68,170]];
export default function Hero(){
  const {t}=useT();
  return <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-[5vw] pt-28 lg:grid-cols-[1.1fr_1fr]">
    <div>
      <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.9}} className="text-[clamp(38px,7vw,84px)] font-semibold leading-[1.15]">{t.h1}</motion.h1>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.3,duration:.9}} className="mt-6 text-[clamp(18px,2.2vw,26px)]">{t.h2}</motion.p>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.5,duration:.9}} className="mb-9 mt-2 text-mu">{t.he}</motion.p>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7}} className="flex flex-wrap gap-3.5">
        <Link href="/product" className="rounded-sm bg-paper px-6 py-3 text-sm text-black transition-colors hover:bg-ac hover:text-white">{t.explore}</Link>
        <Link href="/contact" className="rounded-sm border border-paper px-6 py-3 text-sm transition-colors hover:border-ac hover:bg-ac">{t.contactUs}</Link>
      </motion.div>
    </div>
    <svg viewBox="0 0 440 440" className="w-full" aria-label="AI workforce">
      {N.map(([,x,y],i)=><motion.line key={i} x1={220} y1={220} x2={x} y2={y} stroke="#555" strokeDasharray="3 5" animate={{strokeDashoffset:-32}} transition={{duration:3,repeat:Infinity,ease:"linear"}}/>)}
      <circle cx={220} cy={220} r={34} fill="#111" stroke="#3a3a3a"/>
      <text x={220} y={224} textAnchor="middle" fill="#f4f2ee" fontSize={11} fontWeight={700} letterSpacing={2}>KAGOU</text>
      {N.map(([n,x,y],i)=><g key={n}>
        <motion.rect whileHover={{stroke:"#f4f2ee"}} x={x-60} y={y-18} width={120} height={36} fill="#111" stroke="#3a3a3a"/>
        <text x={x} y={y+4} textAnchor="middle" fill="#f4f2ee" fontSize={11}>{n}</text>
        <motion.circle cx={x-50} cy={y-8} r={2.5} fill="#e8553d" animate={{opacity:[1,.25,1]}} transition={{duration:2.6,repeat:Infinity,delay:i*.5}}/>
      </g>)}
    </svg>
  </section>;
}
