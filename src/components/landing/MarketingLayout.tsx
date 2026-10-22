import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

/** Bandeau d'appel à l'action affiché en bas des pages marketing */
function CtaBand() {
  return (
    <section className="px-5 pb-12 sm:pb-16 lg:pb-20">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 rounded-[20px] bg-primary p-6 text-white sm:p-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-heading text-2xl font-extrabold sm:text-3xl">Prêt à vendre votre savoir ?</p>
          <p className="mt-2 text-white/80">Créez votre boutique gratuitement, sans carte bancaire.</p>
        </div>
        <a href="/inscription" className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-btn bg-gold px-6 font-bold text-ink transition-colors hover:bg-[#d4922c] md:w-auto">
          Commencer gratuitement <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}

export default function MarketingLayout({ children, cta = true }: { children: ReactNode; cta?: boolean }) {
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
