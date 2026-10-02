"use client";
import Link from "next/link";
import {useT} from "@/lib/i18n";
export default function Footer(){
  const {t}=useT();
  return <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-8 px-[5vw] pb-10 pt-20 text-[13px] text-mu">
    <div><div className="font-bold tracking-[.28em] text-paper">KAGOU</div><p className="mt-2">{t.h1}</p></div>
    <div><div className="flex flex-wrap gap-5">{["/product","/solutions","/company","/contact"].map((p,i)=><Link key={p} href={p}>{t.nav[i]}</Link>)}<span>Privacy Policy</span></div><p className="mt-4">© 2026 KAGOU Inc.</p></div>
  </footer>;
}
