import { ArrowRight, ChevronRight } from "lucide-react";
import { steps } from "../../lib/mock-data";

export default function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1fr_2fr] lg:items-center lg:py-24">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Comment ça marche ?</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">En 4 étapes, vous passez de l'expertise aux revenus</h2>
          <p className="mt-4 leading-relaxed text-ink-2">
            Savoirpay est simple et rapide à prendre en main. En quelques minutes, vous pouvez déjà commencer à vendre vos formations ou produits numériques.
          </p>
          <a href="/inscription" className="mt-7 inline-flex items-center gap-2 rounded-btn bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
            Créer mon compte maintenant <ArrowRight size={16} />
          </a>
        </div>
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative text-center">
              <div className="relative mx-auto w-fit">
                <span className="flex size-20 items-center justify-center rounded-full bg-mint text-primary"><s.icon size={30} strokeWidth={1.75} /></span>
                <span className="num absolute -left-1 -top-1 flex size-7 items-center justify-center rounded-full bg-primary font-heading text-xs font-bold text-white ring-4 ring-white">{i + 1}</span>
              </div>
              {i < steps.length - 1 && (
                <ChevronRight aria-hidden size={20} className="absolute -right-4 top-8 hidden text-ink-2/50 lg:block" />
              )}
              <h3 className="mt-5 font-heading text-base font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
