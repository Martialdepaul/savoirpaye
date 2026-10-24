import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import SiteShell from "../../components/site/SiteShell";
import PageHero from "../../components/site/PageHero";
import AiCreator from "../../components/landing/AiCreator";
import PaymentStrip from "../../components/landing/PaymentStrip";
import { featureGroups } from "../../lib/site-data";

export const metadata: Metadata = {
  title: "Fonctionnalités · Savoirpay",
  description: "Créez, vendez et gérez vos formations et produits numériques avec Savoirpay.",
};

export default function FonctionnalitesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Fonctionnalités"
        title={<>Tous les outils pour <span className="text-gold">vivre de votre savoir</span></>}
        text="Créer vos contenus, encaisser en Mobile Money, suivre vos ventes et retirer vos gains : Savoirpay réunit tout ce dont un créateur a besoin."
      >
        <nav aria-label="Sections" className="mt-8 flex flex-wrap gap-2">
          {featureGroups.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              {g.eyebrow}
            </a>
          ))}
        </nav>
      </PageHero>

      <PaymentStrip />

      {featureGroups.map((g, i) => (
        <section key={g.id} id={g.id} className={`scroll-mt-20 ${i % 2 ? "bg-mint" : "bg-white"}`}>
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-5 lg:grid-cols-2 lg:gap-16 lg:py-24">
            <div className={i % 2 ? "lg:order-2" : ""}>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">{g.eyebrow}</p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">{g.title}</h2>
              <p className="mt-4 leading-relaxed text-ink-2">{g.text}</p>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                {g.items.map((it) => (
                  <li key={it.title}>
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary-light text-primary"><it.icon size={19} /></span>
                    <h3 className="mt-3 font-heading text-base font-bold">{it.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">{it.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`relative ${i % 2 ? "lg:order-1" : ""}`}>
              <img src={g.image} alt="" className="aspect-[4/3] w-full rounded-[24px] object-cover shadow-lift" loading="lazy" />
              <span aria-hidden className="absolute -bottom-4 left-4 rounded-full bg-gold px-4 py-2 font-heading text-sm font-bold text-forest shadow-lift sm:left-6">
                {g.eyebrow}
              </span>
            </div>
          </div>
        </section>
      ))}

      <AiCreator />

      <section className="bg-white pb-20 pt-4 text-center lg:pb-24">
        <Link href="/tarifs" className="inline-flex items-center gap-2 rounded-btn border border-primary/40 px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary-light">
          Comparer les offres <ArrowRight size={17} />
        </Link>
      </section>
    </SiteShell>
  );
}
