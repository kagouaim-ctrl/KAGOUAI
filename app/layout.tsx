import "./globals.css";
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_JP, Inter_Tight, JetBrains_Mono, Noto_Sans_SC } from "next/font/google";
import { en } from "@/content/en";
import { site } from "@/content/site";
import Providers from "@/components/Providers";

const inter = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
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
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "KAGOU — AI agents that trade meme coins for you" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: en.meta.title, description: en.meta.description, images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#060510", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KAGOU",
  url: site.url,
  logo: `${site.url}/favicon.svg`,
  description: en.meta.description,
  sameAs: [`https://x.com/${site.x}`, `https://t.me/${site.telegram}`, site.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = [inter, plexJp, notoSc, mono].map((f) => f.variable).join(" ");
  return (
    <html lang="en" className={fonts}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
