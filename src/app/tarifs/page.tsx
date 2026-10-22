import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import SiteShell from "../../components/site/SiteShell";
import PageHero from "../../components/site/PageHero";
import Pricing from "../../components/landing/Pricing";
import Faq from "../../components/landing/Faq";
import { comparison } from "../../lib/site-data";
import { plans } from "../../lib/mock-data";

export const metadata: Metadata = {
  title: "Tarifs · Savoirpay",
  description: "Des tarifs simples en FCFA. Commencez gratuitement, sans engagement.",
};

function Cell({ v }: { v: string | boolean }) {
  if (v === true) return <Check size={18} className="mx-auto text-primary" aria-label="Inclus" />;
  if (v === false) return <Minus size={18} className="mx-auto text-ink-2/40" aria-label="Non inclus" />;
  return <span className="font-medium">{v}</span>;
}

export default function TarifsPage() {
  return (
    <SiteShell>
      <PageHero
        center
        eyebrow="Tarifs"
        title={<>Des prix simples, <span className="text-gold">en FCFA</span></>}
        text="Commencez gratuitement. Passez à une offre supérieure quand vos ventes décollent. Sans engagement, sans frais cachés."
      />

      <Pricing />

      <section className="bg-page">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-5 lg:py-24">
          <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">Comparer les offres en détail</h2>

          {/* Mobile : une carte par fonctionnalité */}
          <ul className="mt-8 space-y-3 md:hidden">
            {comparison.map((row) => (
              <li key={row.label} className="rounded-card border border-line bg-white p-4 shadow-soft">
                <div className="text-sm font-semibold">{row.label}</div>
                <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                  {plans.map((p, i) => (
                    <div key={p.name} className={`rounded-lg py-2 ${p.featured ? "bg-primary-light" : "bg-page"}`}>
                      <dt className="font-semibold text-ink-2">{p.name}</dt>
                      <dd className="mt-1"><Cell v={row.values[i]} /></dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>

          {/* Desktop : tableau */}
          <div className="mt-8 hidden overflow-hidden rounded-card border border-line bg-white shadow-soft md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="w-2/5 px-6 py-4 text-left font-heading text-base">Fonctionnalité</th>
                  {plans.map((p) => (
                    <th key={p.name} scope="col" className={`px-6 py-4 text-center font-heading text-base ${p.featured ? "bg-primary-light text-primary" : ""}`}>
                      {p.name}
                      <div className="num mt-0.5 text-xs font-medium text-ink-2">{p.price} / mois</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {comparison.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="px-6 py-3.5 text-left font-medium text-ink-2">{row.label}</th>
                    {row.values.map((v, i) => (
                      <td key={i} className={`px-6 py-3.5 text-center ${plans[i].featured ? "bg-primary-light/50" : ""}`}><Cell v={v} /></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Faq />
    </SiteShell>
  );
}
