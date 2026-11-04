import Link from "next/link";
import Logo from "../ui/Logo";
import { seller } from "../../lib/catalog";
import { site, year } from "../../lib/site-config";

const cols = [
  {
    title: "Produit",
    links: [
      { label: "Fonctionnalités", href: "/fonctionnalites" },
      { label: "Tarifs", href: "/tarifs" },
      { label: "Créateur IA", href: "/createur-ia" },
      { label: "Exemple de boutique", href: `/boutique/${seller.slug}` },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Blog des créateurs", href: "/ressources" },
      { label: "Comment ça marche", href: "/comment-ca-marche" },
      { label: "Questions fréquentes", href: "/faq" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const legal = [
  { label: "CGU", href: "/cgu" },
  { label: "Confidentialité", href: "/confidentialite" },
  { label: "Mentions légales", href: "/mentions-legales" },
];

export default function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-5 lg:py-14">
        <div className="sm:grid sm:grid-cols-3 sm:gap-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          <div className="mb-3 sm:col-span-3 sm:mb-0 lg:col-span-1">
            <Logo tone="light" className="text-2xl" />
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/70">
              Vendez vos formations et produits numériques, payés en Mobile Money.
            </p>
          </div>
          {/* Sur mobile, tous les liens se suivent en ligne (intitulés réservés aux lecteurs d'écran) pour un pied de page compact */}
          <nav aria-label="Liens du site" className="flex flex-wrap gap-x-5 sm:contents">
          {cols.map((c) => (
            <div key={c.title} className="contents sm:block">
              <h2 className="sr-only font-heading text-sm font-bold sm:not-sr-only">{c.title}</h2>
              <ul className="contents sm:mt-1 sm:block lg:mt-2">
                {c.links.map((l) => (
                  <li key={l.label}><Link href={l.href} className="inline-flex min-h-11 items-center text-sm text-white/70 transition-colors hover:text-white sm:pr-3">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          </nav>
        </div>
        <div className="mt-4 flex flex-col gap-1 border-t border-white/10 pt-4 text-sm text-white/60 lg:mt-10 lg:flex-row lg:items-center lg:justify-between lg:pt-6">
          <ul className="flex flex-wrap gap-x-5">
            {legal.map((l) => (
              <li key={l.href}><Link href={l.href} className="inline-flex min-h-11 items-center transition-colors hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
          <p>© {year} {site.name} · {site.cities.map((c) => c.split(",")[0]).join(" · ")}</p>
        </div>
      </div>
    </footer>
  );
}
