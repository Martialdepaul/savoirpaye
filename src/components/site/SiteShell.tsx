import type { ReactNode } from "react";
import Header from "../landing/Header";
import Footer from "../landing/Footer";
import CtaBand from "../landing/CtaBand";

export default function SiteShell({ children, cta = true }: { children: ReactNode; cta?: boolean }) {
  return (
    <>
      <Header />
      <main>
        {children}
        {cta && <CtaBand />}
      </main>
      <Footer />
    </>
  );
}
