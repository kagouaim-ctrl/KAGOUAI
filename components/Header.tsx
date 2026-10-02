"use client";
import Link from "next/link";
import {useT} from "@/lib/i18n";
import type {Lang} from "@/lib/dict";
const paths=["/product","/solutions","/company","/contact"];
export default function Header(){
  const {t,l,setL}=useT();
  return <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-line bg-ink/80 px-[5vw] py-4 backdrop-blur">
    <Link href="/" className="text-[17px] font-bold tracking-[.28em]">KAGOU</Link>
    <nav className="hidden gap-7 text-[13px] text-mu md:flex">{paths.map((p,i)=><Link key={p} href={p} className="transition-colors hover:text-paper">{t.nav[i]}</Link>)}</nav>
    <div className="flex items-center gap-4">
      <div className="text-xs tracking-widest text-mu">{(["ja","en","cn"] as Lang[]).map((k,i)=><span key={k}>{i>0&&"/"}<button onClick={()=>setL(k)} className={`p-1 ${l===k?"text-paper":""}`}>{k==="ja"?"JP":k.toUpperCase()}</button></span>)}</div>
      <Link href="/contact" className="rounded-sm bg-paper px-4 py-2 text-[13px] text-black transition-colors hover:bg-ac hover:text-white">{t.start}</Link>
    </div>
  </header>;
}
