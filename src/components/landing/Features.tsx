import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { features } from "../../lib/mock-data";

export default function Features() {
  return (
    <section id="fonctionnalites" className="bg-mint">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1fr_2fr] lg:items-center lg:py-24">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Des outils puissants pour aller plus loin</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">Tout ce dont vous avez besoin au même endroit</h2>
          <p className="mt-4 leading-relaxed text-ink-2">
            Savoirpay vous offre une suite complète d'outils pour créer, vendre et gérer votre business en ligne, avec l'aide de l'IA.
          </p>
          <Link href="/fonctionnalites" className="mt-7 inline-flex items-center gap-2 rounded-btn bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
            Découvrir toutes les fonctionnalités <ArrowRight size={16} />
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <li key={f.title} className="rounded-card border border-line bg-white p-5 shadow-soft transition-shadow hover:shadow-[0_8px_24px_rgb(16_35_28/0.08)]">
              <span className={`flex size-11 items-center justify-center rounded-xl ${f.tint}`}><f.icon size={20} /></span>
              <h3 className="mt-4 font-heading text-base font-bold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
