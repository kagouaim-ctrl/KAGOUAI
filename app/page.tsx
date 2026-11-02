import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Markets from "@/components/Markets";
import Replay from "@/components/Replay";
import Agents from "@/components/Agents";
import Community from "@/components/Community";
import Safety from "@/components/Safety";
import Roadmap from "@/components/Roadmap";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Markets />
        <Replay />
        <Agents />
        <Community />
        <Safety />
        <Roadmap />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
