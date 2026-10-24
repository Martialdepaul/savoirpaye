import Link from "next/link";
import Logo from "../ui/Logo";

const cols = [
  {
    title: "Produit",
    links: [
      { label: "Fonctionnalités", href: "/fonctionnalites" },
      { label: "Tarifs", href: "/tarifs" },
      { label: "Créateur IA", href: "/createur-ia" },
      { label: "Exemple de boutique", href: "/boutique/aminata-diallo" },
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
      { label: "Conditions d'utilisation", href: "/cgu" },
      { label: "Confidentialité", href: "/confidentialite" },
      { label: "Mentions légales", href: "/mentions-legales" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-5 lg:py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          <div className="col-span-2 lg:col-span-1">
            <Logo tone="light" className="text-2xl" />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
              La plateforme des créateurs africains pour vendre formations, produits numériques et services, payés en Mobile Money.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h2 className="font-heading text-sm font-bold">{c.title}</h2>
              <ul className="mt-3 space-y-0.5">
                {c.links.map((l) => (
                  <li key={l.label}><Link href={l.href} className="inline-block py-2 text-sm text-white/70 transition-colors hover:text-white">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>© 2026 Savoirpay. Tous droits réservés.</p>
          <p>Dakar · Abidjan · Cotonou</p>
        </div>
      </div>
    </footer>
  );
}
