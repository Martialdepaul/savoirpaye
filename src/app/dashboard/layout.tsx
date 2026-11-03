import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tableau de bord", robots: { index: false } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
