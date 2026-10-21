import { existsSync } from "node:fs";
import { join } from "node:path";
import Nav from "@/components/Nav";
import HexField from "@/components/HexField";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Checks from "@/components/Checks";
import Gates from "@/components/Gates";
import EmployeeFile from "@/components/EmployeeFile";
import Roster from "@/components/Roster";
import Stack from "@/components/Stack";
import Pricing from "@/components/Pricing";
import Founder from "@/components/Founder";
import Roadmap from "@/components/Roadmap";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

// Drop a photo at public/founder.jpg and rebuild; until then a placeholder shows.
const hasPhoto = existsSync(join(process.cwd(), "public", "founder.jpg"));

export default function Home() {
  return (
    <>
      <HexField />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Checks />
        <Gates />
        <EmployeeFile />
        <Roster />
        <Stack />
        <Pricing />
        <Founder photo={hasPhoto} />
        <Roadmap />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
