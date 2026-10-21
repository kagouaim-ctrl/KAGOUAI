import { existsSync } from "node:fs";
import { join } from "node:path";
import Nav from "@/components/Nav";
import HexField from "@/components/HexField";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Checks from "@/components/Checks";
import Anatomy from "@/components/Anatomy";
import EmployeeFile from "@/components/EmployeeFile";
import Hiring from "@/components/Hiring";
import Roster from "@/components/Roster";
import Pricing from "@/components/Pricing";
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
        <Problem />
        <Checks />
        <Anatomy />
        <EmployeeFile />
        <Hiring />
        <Roster />
        <Pricing />
        <Founder photo={hasPhoto} />
        <Roadmap />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
