import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site-config";
import "./globals.css";

// Polices hébergées dans le projet (sous-ensemble latin, polices variables) :
// le build ne dépend pas du téléchargement depuis Google Fonts.
const inter = localFont({ src: "./fonts/inter.woff2", weight: "400 600", variable: "--font-inter", display: "swap" });
const jakarta = localFont({ src: "./fonts/plus-jakarta-sans.woff2", weight: "500 800", variable: "--font-jakarta", display: "swap" });
const caveat = localFont({ src: "./fonts/caveat.woff2", weight: "600 700", variable: "--font-caveat", display: "swap" });

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
