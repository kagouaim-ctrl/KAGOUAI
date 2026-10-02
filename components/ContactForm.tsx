"use client";
import {useState} from "react";
import {useT} from "@/lib/i18n";
export default function ContactForm(){
  const {t}=useT();const [ok,setOk]=useState(false);
  const c="rounded-sm border border-line bg-transparent p-3.5 text-sm outline-none focus:border-[#666]";
  return <form onSubmit={e=>{e.preventDefault();setOk(true)}} className="mx-auto grid max-w-md gap-3 px-[5vw] pb-24 pt-8">
    <input required className={c} placeholder={t.ph[0]}/><input className={c} placeholder={t.ph[1]}/>
    <input required type="email" className={c} placeholder={t.ph[2]}/><textarea rows={4} className={c} placeholder={t.ph[3]}/>
    <button className="rounded-sm bg-paper px-6 py-3 text-sm text-black transition-colors hover:bg-ac hover:text-white">{ok?"✓":t.send}</button>
  </form>;
}
