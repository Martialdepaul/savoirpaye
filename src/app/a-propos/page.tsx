import type { Metadata } from "next";
import SiteShell from "../../components/site/SiteShell";
import PageHero from "../../components/site/PageHero";
import Testimonials from "../../components/landing/Testimonials";
import { aboutStats, team, values } from "../../lib/site-data";

export const metadata: Metadata = {
  title: "À propos · Savoirpay",
  description: "Notre mission : permettre à chaque expert africain de vivre de son savoir.",
};

export default function AProposPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="À propos"
        title={<>Faire du savoir africain <span className="text-gold">une source de revenus</span></>}
        text="Savoirpay est née à Dakar d'une conviction simple : nos formateurs, coachs et experts méritent des outils pensés pour eux, leurs clients et leurs moyens de paiement."
      />

      <section className="bg-white">
        <div className="mx-auto -mt-10 max-w-6xl px-4 sm:px-5">
          <dl className="grid grid-cols-2 gap-3 rounded-card border border-line bg-white p-4 shadow-lift sm:p-6 lg:grid-cols-4">
            {aboutStats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse rounded-xl bg-mint p-4 text-center sm:p-5">
                <dt className="text-xs text-ink-2 sm:text-sm">{s.label}</dt>
                <dd className="num font-heading text-2xl font-extrabold text-primary sm:text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-5 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Notre histoire</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">Tout a commencé par une formation Excel vendue sur WhatsApp</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-ink-2">
              <p>En 2023, Aminata vendait ses formations par messages privés, encaissait par Orange Money et envoyait les vidéos une par une. Ça fonctionnait, mais ça lui prenait des heures chaque semaine.</p>
              <p>Les plateformes existantes ne parlaient ni FCFA ni Mobile Money. Avec Kevin, elle a décidé de construire l'outil qu'elle aurait voulu avoir : simple, mobile, et payé comme on paie chez nous.</p>
              <p>Aujourd'hui, plus de 12 000 créateurs dans 14 pays utilisent Savoirpay pour transmettre leur savoir et en vivre.</p>
            </div>
          </div>
          <div className="relative">
            <img src="/images/team-1.jpg" alt="Aminata Diallo, co-fondatrice de Savoirpay" className="aspect-square w-full rounded-[24px] object-cover shadow-lift" />
            <p className="absolute -bottom-5 right-4 max-w-[240px] rotate-[-3deg] rounded-card bg-gold px-5 py-3 font-hand text-2xl leading-tight text-forest shadow-lift">
              « Ton expertise peut changer des vies. »
            </p>
          </div>
        </div>
      </section>

      <section className="bg-mint">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-5 lg:py-24">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Nos valeurs</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">Ce qui nous guide chaque jour</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <li key={v.title} className="rounded-card border border-line bg-white p-6 shadow-soft">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-gold"><v.icon size={20} /></span>
                <h3 className="mt-4 font-heading text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-5 lg:py-24">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">L'équipe</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">Des passionnés, entre Dakar, Abidjan et Cotonou</h2>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {team.map((m) => (
              <li key={m.name} className="text-center">
                <img src={m.photo} alt={`Portrait de ${m.name}`} loading="lazy" className="aspect-square w-full rounded-[20px] object-cover" />
                <div className="mt-3 font-heading text-base font-bold">{m.name}</div>
                <div className="text-sm text-ink-2">{m.role}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Testimonials />
    </SiteShell>
  );
}
