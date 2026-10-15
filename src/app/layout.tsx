import type { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
  title: "SavoirPaye",
  description: "La plateforme pour vendre votre savoir",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
