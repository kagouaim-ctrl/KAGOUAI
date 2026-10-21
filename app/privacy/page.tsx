import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Privacy from "@/components/Privacy";

export const metadata: Metadata = { title: "Privacy — KAGOU" };

export default function Page() {
  return (
    <>
      <Nav />
      <Privacy />
      <Footer />
    </>
  );
}
