import { existsSync } from "node:fs";
import { join } from "node:path";
import Nav from "@/components/Nav";
import HexField from "@/components/HexField";
import Hero from "@/components/Hero";
import Hiring from "@/components/Hiring";
import Anatomy from "@/components/Anatomy";
import Roster from "@/components/Roster";
import Problem from "@/components/Problem";
import Usage from "@/components/Usage";
import Founder from "@/components/Founder";
import Roadmap from "@/components/Roadmap";
import Cta from "@/components/Cta";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

// Drop a photo at public/founder.jpg and rebuild; until then a placeholder shows.
const hasPhoto = existsSync(join(process.cwd(), "public", "founder.jpg"));

export default function Home() {
  return (
    <>
      <HexField />
      <Nav />
      <main id="main">
        <Hero />
        <Hiring />
        <Anatomy />
        <Roster />
        <Problem />
        <Usage />
        <Founder photo={hasPhoto} />
        <Roadmap />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
