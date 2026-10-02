"use client";
import {animate,useInView} from "framer-motion";
import {useEffect,useRef} from "react";
export default function Counter({to,prefix="",suffix="",dec=0}:{to:number;prefix?:string;suffix?:string;dec?:number}){
  const r=useRef<HTMLSpanElement>(null);const v=useInView(r,{once:true});
  useEffect(()=>{
    if(!v||!r.current)return;const el=r.current;
    const c=animate(0,to,{duration:1.4,ease:"easeOut",onUpdate:x=>{el.textContent=prefix+x.toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g,",")+suffix}});
    return()=>c.stop();
  },[v,to,prefix,suffix,dec]);
  return <span ref={r}>{prefix}0{suffix}</span>;
}
