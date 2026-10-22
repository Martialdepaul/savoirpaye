import { Check, Clock, Users, ShieldCheck, Infinity as Inf, Award, PlayCircle } from "lucide-react";
import Logo from "../../../components/ui/Logo";
import Stars from "../../../components/sales/Stars";
import Curriculum from "../../../components/sales/Curriculum";
import Reviews from "../../../components/sales/Reviews";
import { fcfa } from "../../../lib/dashboard-data";
import { COURSE_PRICE, COVER, course, goals, includes } from "../../../lib/sales-data";

function BuyCard() {
  return (
    <div className="rounded-card border border-line bg-white p-6 shadow-soft">
      <div className="num font-heading text-4xl font-extrabold text-gold-ink">{fcfa(COURSE_PRICE)}</div>
      <p className="mt-1 text-sm text-ink-2">Paiement unique. Accès à vie.</p>
      <a href="/checkout" className="mt-5 block rounded-btn bg-primary py-3.5 text-center font-semibold text-white transition-colors hover:bg-primary-hover">
        Acheter maintenant
      </a>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-2"><ShieldCheck size={14} className="text-success" /> Remboursé sous 7 jours si la formation ne vous convient pas</p>
      <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
        {includes.map((t) => (
          <li key={t} className="flex items-start gap-2.5 text-sm"><Check size={16} className="mt-0.5 shrink-0 text-primary" /> {t}</li>
        ))}
      </ul>
    </div>
  );
}

export default function SalesPage() {
  return (
    <div className="min-h-screen pb-24 lg:pb-0">
      <header className="border-b border-line bg-page/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <a href="/dashboard" className="-mr-3 px-3 py-3 text-sm font-medium text-ink-2 hover:text-ink">Connexion</a>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[1fr_360px] lg:gap-12 lg:py-12">
        <main className="min-w-0 space-y-12">
          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-card bg-primary">
              <img src={COVER} alt="Une personne utilisant WhatsApp sur son téléphone" className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-sm font-semibold">
                <PlayCircle size={17} className="text-primary" /> Voir la présentation
              </span>
            </div>

            <h1 className="mt-6 font-heading text-3xl font-extrabold leading-tight sm:text-4xl">{course.title}</h1>
            <p className="mt-3 text-lg leading-relaxed text-ink-2">{course.subtitle}</p>

            <div className="num mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="flex items-center gap-2 font-semibold">{String(course.rating).replace(".", ",")} <Stars value={course.rating} size={15} /></span>
              <span className="text-ink-2">{course.reviewsCount} avis</span>
              <span className="flex items-center gap-1.5 text-ink-2"><Users size={15} /> {course.students.toLocaleString("fr-FR")} élèves</span>
              <span className="flex items-center gap-1.5 text-ink-2"><Clock size={15} /> {course.duration}</span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-white">{course.instructor.initials}</span>
              <div>
                <div className="text-sm font-semibold">{course.instructor.name}</div>
                <div className="text-xs text-ink-2">{course.instructor.role}</div>
              </div>
            </div>
          </div>

          <section>
            <h2 className="font-heading text-2xl font-extrabold">Ce que vous allez apprendre</h2>
            <ul className="mt-5 grid gap-3 rounded-card border border-line bg-white p-5 shadow-soft sm:grid-cols-2 sm:p-6">
              {goals.map((g) => (
                <li key={g} className="flex items-start gap-3 text-[15px]"><Check size={18} className="mt-0.5 shrink-0 text-primary" /> {g}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-2">
              <span className="flex items-center gap-2"><Inf size={16} className="text-primary" /> Accès à vie</span>
              <span className="flex items-center gap-2"><Award size={16} className="text-primary" /> Certificat de réussite</span>
            </div>
          </section>

          <Curriculum />
          <Reviews />
        </main>

        <aside className="hidden lg:block">
          <div className="sticky top-6"><BuyCard /></div>
        </aside>
      </div>

      <div className="lg:hidden">
        <section aria-label="Achat" className="mx-auto max-w-6xl px-5 pb-8"><BuyCard /></section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-4 border-t border-line bg-white px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
        <div className="min-w-0">
          <div className="text-xs text-ink-2">Paiement unique</div>
          <div className="num font-heading text-xl font-extrabold text-gold-ink">{fcfa(COURSE_PRICE)}</div>
        </div>
        <a href="/checkout" className="flex-1 rounded-btn bg-primary py-3.5 text-center font-semibold text-white hover:bg-primary-hover">Acheter maintenant</a>
      </div>
    </div>
  );
}
