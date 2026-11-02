import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import NotFound from "@/components/NotFound";

export default function Page() {
  return (
    <>
      <Nav marquee={false} />
      <NotFound />
      <Footer />
    </>
  );
}
