import Stars from "../sales/Stars";
import { testimonials } from "../../lib/mock-data";

export default function Testimonials() {
  return (
    <section id="temoignages" className="bg-forest-glow text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:py-24">
        <p className="text-xs font-bold uppercase tracking-wider text-gold">Ils nous font confiance</p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">Ce qu'ils disent de Savoirpay</h2>
        <ul className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 lg:mx-0 lg:mt-10 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0" aria-label="Témoignages (faites glisser pour en voir plus)">
          {testimonials.map((t) => (
            <li key={t.name} className="flex w-[85%] shrink-0 snap-start gap-4 rounded-card bg-white p-5 text-ink shadow-lift sm:w-[60%] lg:w-auto">
              <img src={t.photo} alt={`Portrait de ${t.name}`} className="size-16 shrink-0 rounded-full object-cover ring-4 ring-mint" />
              <figure className="min-w-0">
                <blockquote className="text-sm leading-relaxed">« {t.quote} »</blockquote>
                <figcaption className="mt-3">
                  <div className="text-sm font-bold">{t.name}</div>
                  <div className="text-xs text-ink-2">{t.role}</div>
                  <div className="mt-1.5"><Stars value={5} size={14} /></div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
