import type { Metadata, Viewport } from "next";
import { Caveat, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-jakarta" });
const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-caveat" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { type: "website", locale: "fr_FR", siteName: site.name, title: `${site.name} · ${site.tagline}`, description: site.description, images: ["/images/hero-createur.jpg"] },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#08362a" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${jakarta.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
