import Link from "next/link";
import { Check } from "lucide-react";
import { plans } from "../../lib/mock-data";

export default function Pricing() {
  return (
    <section id="tarifs" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Nos offres</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">Choisissez le plan qui correspond à vos objectifs</h2>
          <p className="mt-3 text-ink-2">Des tarifs simples et transparents. Sans engagement. Vous pouvez changer à tout moment.</p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-card border bg-white p-7 ${p.featured ? "border-primary shadow-lift ring-1 ring-primary lg:-my-3 lg:py-10" : "border-line shadow-soft"}`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">Le plus populaire</span>
              )}
              <h3 className="font-heading text-xl font-bold">{p.name}</h3>
              <p className="mt-1 text-sm text-ink-2">{p.tagline}</p>
              <div className="num mt-6 flex items-baseline gap-1.5">
                <span className="font-heading text-4xl font-extrabold text-ink">{p.price}</span>
                <span className="text-sm text-ink-2">/ mois</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[15px]">
                    <Check size={17} className="mt-0.5 shrink-0 text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/inscription?offre=${p.name.toLowerCase()}`}
                className={`mt-8 rounded-btn px-5 py-3 text-center font-semibold transition-colors ${
                  p.featured ? "bg-primary text-white hover:bg-primary-hover" : "border border-primary/40 bg-white text-primary hover:bg-primary-light"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
