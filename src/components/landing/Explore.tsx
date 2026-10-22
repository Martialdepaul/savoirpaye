import { ArrowRight, BadgePercent, ChevronRight, HelpCircle, ListOrdered, Sparkles } from "lucide-react";

const pages = [
  { href: "/comment-ca-marche", icon: ListOrdered, title: "Comment ça marche", text: "De l'idée au premier paiement, en quatre étapes." },
  { href: "/createur-ia", icon: Sparkles, title: "Créateur IA", text: "Votre plan de cours et vos leçons rédigés en quelques minutes.", ai: true },
  { href: "/tarifs", icon: BadgePercent, title: "Tarifs", text: "Gratuit pour commencer, des offres simples en FCFA." },
  { href: "/faq", icon: HelpCircle, title: "Questions fréquentes", text: "Paiements, retraits, protection de vos contenus…" },
];

/** Raccourcis de l'accueil vers les pages détaillées */
export default function Explore() {
  return (
    <section aria-labelledby="explore-title" className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <h2 id="explore-title" className="font-heading text-2xl font-extrabold sm:text-3xl">Tout savoir sur savoirpay</h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {pages.map(({ href, icon: Icon, title, text, ai }) => (
          <li key={href}>
            <a href={href} className="group flex h-full items-center gap-4 rounded-card border border-line bg-white p-4 shadow-soft transition-colors hover:border-primary sm:flex-col sm:items-start sm:p-5">
              <span className={`flex size-11 shrink-0 items-center justify-center rounded-btn ${ai ? "bg-ai-light text-ai" : "bg-primary-light text-primary"}`}><Icon size={21} /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading text-base font-bold group-hover:text-primary sm:mt-4 sm:text-lg">{title}</span>
                <span className="mt-0.5 block text-sm leading-relaxed text-ink-2 sm:mt-1">{text}</span>
              </span>
              <ChevronRight size={20} className="shrink-0 text-ink-2 sm:hidden" aria-hidden="true" />
              <span className="mt-auto hidden items-center gap-1.5 pt-4 text-sm font-semibold text-primary sm:inline-flex">
                Découvrir <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
