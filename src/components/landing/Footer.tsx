import Logo from "../ui/Logo";

const cols = [
  { title: "Produit", links: ["Fonctionnalités", "Créateur IA", "Tarifs", "Moyens de paiement"] },
  { title: "Ressources", links: ["Centre d'aide", "Blog des créateurs", "Contact"] },
  { title: "Légal", links: ["Conditions d'utilisation", "Politique de confidentialité", "Mentions légales"] },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="font-heading text-2xl font-extrabold"><span>savoir</span><span className="text-gold">pay</span></a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
              La plateforme pour créer et vendre vos cours en ligne partout en Afrique francophone.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-heading text-sm font-bold">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}><a href="#" className="text-sm text-white/70 transition-colors hover:text-white">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/60">
          © 2026 SavoirPay. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
