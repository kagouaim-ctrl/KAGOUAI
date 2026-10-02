"use client";
import Link from "next/link";
import {motion} from "framer-motion";
import {useT} from "@/lib/i18n";
import Reveal from "./Reveal";
import Counter from "./Counter";
const S="mx-auto max-w-6xl px-[5vw] py-32 max-md:py-20";
const H="text-[clamp(28px,4.4vw,52px)] font-semibold leading-tight";
const shapes=["polygon(0 0,100% 0,100% 100%)","circle(50%)","inset(0)","polygon(50% 0,100% 50%,50% 100%,0 50%)","polygon(0 100%,50% 0,100% 100%)"];

export function Problem(){const {t}=useT();return <section className={S}>
  <Reveal><h2 className={H}>{t.pT}</h2><p className="mt-4 text-mu">{t.pS}</p></Reveal>
  <Reveal d={.15} className="mt-12 grid gap-5 md:grid-cols-2">
    <div className="border border-line bg-card p-8"><b className="mb-3 block text-xs tracking-[.15em] text-mu">{t.trad}</b><div className="text-[clamp(17px,2.2vw,24px)]">Ask → Answer → Done</div></div>
    <div className="border border-[#555] bg-card p-8"><b className="mb-3 block text-xs tracking-[.15em] text-mu">KAGOU</b><div className="text-[clamp(17px,2.2vw,24px)]">Goal → Think → Act → Learn → Report</div></div>
  </Reveal></section>}

export function Employees({title=true}:{title?:boolean}){const {t}=useT();return <section className={S}>
  {title&&<Reveal><h2 className={H}>{t.mT}</h2></Reveal>}
  <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-4">
    {t.cards.map((c,i)=><motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08,duration:.7}}
      whileHover={{y:-4,borderColor:"#555"}} className="border border-line bg-card p-6">
      <div className="relative h-9 w-9 border border-[#444]"><div className="absolute inset-2 bg-paper/85" style={{clipPath:shapes[i]}}/></div>
      <h3 className="mb-2 mt-5 flex items-center gap-2 text-base">{c[0]}<motion.i className="h-[7px] w-[7px] rounded-full bg-ac" animate={{opacity:[1,.25,1]}} transition={{duration:2.6,repeat:Infinity,delay:i*.4}}/></h3>
      <p className="text-sm text-mu">{c[1]}</p></motion.div>)}
  </div></section>}

const steps=["Understand","Plan","Act","Learn","Report"];
const log=["Search","Analyze","Qualify","Contact · Follow up","Update CRM","Report — 100 / 100 ✓"];
export function Execution(){const {t}=useT();return <section className={S}>
  <Reveal><h2 className={H}>{t.xT}</h2></Reveal>
  <Reveal d={.1} className="my-10 flex flex-wrap gap-2.5 text-[13px] tracking-widest text-mu">{steps.map((s,i)=><span key={s} className="border border-line px-4 py-2">{s}{i<4&&<span className="ml-3.5 text-[#555]">→</span>}</span>)}</Reveal>
  <div className="max-w-[720px] border border-line bg-card p-6 font-mono text-[13px]">
    <div>▸ Goal: “Find 100 qualified customers in Japan.”</div>
    {log.map((l,i)=><motion.div key={l} initial={{opacity:0,x:-8}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:.5+i*.6}} className="py-1 text-mu"><span className="mr-2.5 text-ac">{i+1}</span>{l}</motion.div>)}
  </div></section>}

export function Control(){const {t}=useT();return <section className={S}>
  <Reveal><h2 className={H}>{t.rT}</h2><p className="mt-4 max-w-2xl text-mu">{t.rS}</p>
    <div className="mt-7 flex flex-wrap gap-2.5">{["Knowledge","Permissions","Tools","Goals","Workflows","Human approval"].map(x=><span key={x} className="border border-line px-3.5 py-1.5 text-[13px] text-mu">{x}</span>)}</div></Reveal>
  <div className="mt-10 grid gap-4 md:grid-cols-3">{["AUTO","REVIEW","HUMAN"].map((x,i)=><Reveal key={x} d={i*.1}><motion.div whileHover={{y:-4,borderColor:"#555"}} className="h-full border border-line bg-card p-6"><b className="text-[22px] tracking-[.2em]">{x}</b><p className="mt-3 text-sm text-mu">{t.tiers[i]}</p></motion.div></Reveal>)}</div></section>}

const emp=[["Sales AI","Active"],["Operations AI","Active"],["Research AI","Working"],["Customer Success AI","Waiting for review"]];
export function Dashboard(){const {t}=useT();return <section className={S}>
  <Reveal><h2 className={H}>{t.dT}</h2></Reveal>
  <Reveal d={.1} className="mt-11 grid border border-line bg-card md:grid-cols-[1.2fr_1fr]">
    <div className="border-b border-line p-7 md:border-b-0 md:border-r">{emp.map(([n,s])=><div key={n} className="flex justify-between border-b border-line py-3 text-sm last:border-0"><span>{n}</span><span className="text-[13px] text-mu">{s==="Active"&&<i className="mr-2 inline-block h-[7px] w-[7px] animate-pulse rounded-full bg-ac"/>}{s}</span></div>)}</div>
    <div className="grid grid-cols-2 gap-6 p-7">
      {([["Tasks completed",12840,"","",0],["Customers contacted",3256,"","",0],["Hours saved",1920,"","",0],["Revenue influenced",4.8,"¥","M",1]] as const).map(([l,n,p,s,d])=><div key={l}><b className="block text-[clamp(28px,4vw,42px)] font-semibold leading-none"><Counter to={n} prefix={p} suffix={s} dec={d}/></b><small className="text-xs text-mu">{l}</small></div>)}
    </div></Reveal></section>}

export function Future(){const {t}=useT();return <section className={S+" text-center"}>
  <Reveal><h2 className={H}>{t.fT}</h2></Reveal><Reveal d={.15}><h2 className={H+" text-mu"}>{t.fU}</h2></Reveal>
  <Reveal d={.3}><p className="mt-8">{t.fM}</p></Reveal></section>}

export function Cta(){const {t}=useT();return <section className="mx-[5vw] border border-line bg-black px-[5vw] py-24 text-center">
  <Reveal><h2 className={H+" mx-auto mb-8 max-w-2xl"}>{t.cT}</h2>
  <Link href="/contact" className="inline-block rounded-sm bg-paper px-6 py-3 text-sm text-black transition-colors hover:bg-ac hover:text-white">{t.cB}</Link>
  <p className="mt-12 text-[13px] text-mu">KAGOU株式会社<br/>Tokyo, Japan</p></Reveal></section>}

export function PageTitle({k}:{k:"prT"|"cmT"|"ctT"}){const {t}=useT();return <section className="mx-auto max-w-6xl px-[5vw] pb-6 pt-40"><Reveal><h1 className="text-[clamp(34px,6vw,68px)] font-semibold leading-tight">{t[k]}</h1>{k==="cmT"&&<p className="mt-6 max-w-2xl text-mu">{t.cmB}</p>}{k==="cmT"&&<p className="mt-4 text-sm">Tokyo, Japan</p>}</Reveal></section>}

export function Features(){return <section className="mx-auto max-w-6xl px-[5vw] py-10"><div className="grid grid-cols-2 gap-4 md:grid-cols-4">
  {["AI Employee","AI Agent","Memory","Knowledge","Tools","Permissions","Workflows","Human-in-the-loop"].map((f,i)=><Reveal key={f} d={(i%4)*.08}><motion.div whileHover={{y:-4,borderColor:"#555"}} className="border border-line bg-card p-6 text-sm"><span className="mb-6 block text-xs text-ac">0{i+1}</span>{f}</motion.div></Reveal>)}</div></section>}
