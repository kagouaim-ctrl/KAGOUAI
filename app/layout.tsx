import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Sans_JP, JetBrains_Mono, Noto_Sans_SC } from "next/font/google";
import { en } from "@/content/en";
import { site } from "@/content/site";
import Providers from "@/components/Providers";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex", display: "swap" });
const plexJp = IBM_Plex_Sans_JP({ weight: ["400", "500", "700"], variable: "--font-jp", display: "swap", preload: false });
const notoSc = Noto_Sans_SC({ weight: ["400", "500", "700"], variable: "--font-sc", display: "swap", preload: false });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: en.meta.title,
  description: en.meta.description,
  openGraph: {
    title: en.meta.title,
    description: en.meta.description,
    url: site.url,
    siteName: "KAGOU",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "KAGOU on-chain AI employees" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: en.meta.title, description: en.meta.description, images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#0b0b0c", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = [archivo, plex, plexJp, notoSc, mono].map((f) => f.variable).join(" ");
  return (
    <html lang="en" className={fonts}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
