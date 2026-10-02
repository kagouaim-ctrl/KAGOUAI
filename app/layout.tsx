import "./globals.css";
import type {Metadata} from "next";
import {LangProvider} from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export const metadata:Metadata={title:"KAGOU — AI Workforce",description:"未来の働き方をつくる。AI社員が、実際の仕事をこなす。"};
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="ja"><body><LangProvider><Header/>{children}<Footer/></LangProvider></body></html>;
}
