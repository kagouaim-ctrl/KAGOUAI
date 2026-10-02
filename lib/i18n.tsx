"use client";
import {createContext,useContext,useEffect,useState,ReactNode} from "react";
import {dict,Lang} from "./dict";
const Ctx=createContext<{l:Lang;setL:(l:Lang)=>void}>({l:"ja",setL:()=>{}});
export function LangProvider({children}:{children:ReactNode}){
  const [l,setL]=useState<Lang>("ja");
  useEffect(()=>{document.documentElement.lang=l==="cn"?"zh-CN":l},[l]);
  return <Ctx.Provider value={{l,setL}}>{children}</Ctx.Provider>;
}
export const useT=()=>{const {l,setL}=useContext(Ctx);return {t:dict[l],l,setL}};
