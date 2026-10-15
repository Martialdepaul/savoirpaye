import { ArrowRight, BellRing, BookOpen, TrendingUp, Wallet, ShieldCheck, Smartphone } from "lucide-react";

const sales = [
  { who: "Aminata D.", what: "Maîtriser Excel en 7 jours", amt: "25 000 FCFA", status: "Payé", ok: true },
  { who: "Koffi A.", what: "Lancer son e-commerce", amt: "35 000 FCFA", status: "Payé", ok: true },
  { who: "Fatou S.", what: "Maîtriser Excel en 7 jours", amt: "25 000 FCFA", status: "En attente", ok: false },
];

function DashboardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div className="rounded-card border border-line bg-white p-4 shadow-soft sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary-light text-primary"><BookOpen size={15} /></span>
            Tableau de bord
          </div>
          <span className="text-xs text-ink-2">Octobre 2026</span>
        </div>

        <div className="rounded-card bg-gold-light p-4 ring-1 ring-gold/30">
          <div className="flex items-center gap-2 text-xs font-medium text-gold-ink"><Wallet size={14} /> Solde disponible</div>
          <div className="num mt-1 font-heading text-3xl font-extrabold text-gold-ink sm:text-4xl">1 284 500 <span className="text-lg font-bold">FCFA</span></div>
          <div className="mt-3 flex items-center justify-between">
            <span className="num flex items-center gap-1 text-xs font-medium text-success"><TrendingUp size={13} /> +18 % ce mois-ci</span>
            <span className="rounded-btn bg-gold px-3.5 py-1.5 text-xs font-bold text-ink">Retirer</span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          {[["Élèves inscrits", "1 247"], ["Ventes du mois", "86"]].map(([l, v]) => (
            <div key={l} className="rounded-xl border border-line p-3">
              <div className="text-xs text-ink-2">{l}</div>
              <div className="num font-heading text-xl font-bold">{v}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink-2">Dernières ventes</div>
        <ul className="mt-2 divide-y divide-line">
          {sales.map((s, i) => (
            <li key={i} className="flex items-center justify-between gap-3 py-2.5">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{s.who}</div>
                <div className="truncate text-xs text-ink-2">{s.what}</div>
              </div>
              <div className="shrink-0 text-right">
                <div className="num text-sm font-semibold text-gold-ink">{s.amt}</div>
                <div className={`text-xs font-medium ${s.ok ? "text-success" : "text-pending"}`}>{s.status}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="floatin absolute -bottom-5 left-2 flex items-center gap-3 rounded-card border border-line bg-white px-4 py-3 shadow-[0_8px_30px_rgb(28_25_23/0.1)] sm:-left-8">
        <span className="flex size-9 items-center justify-center rounded-full bg-primary-light text-primary"><BellRing size={17} /></span>
        <div>
          <div className="text-[11px] text-ink-2">À l'instant</div>
          <div className="num text-sm font-semibold">Nouvelle vente : <span className="text-gold-ink">25 000 FCFA</span></div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_80%_20%,#eefaf7,transparent)]" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-28 lg:pt-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink-2">
            <Smartphone size={14} className="text-primary" /> Pensé pour le Mobile Money
          </span>
          <h1 className="mt-5 font-heading text-[40px] font-extrabold leading-[1.05] sm:text-6xl lg:text-[64px]">
            Transformez votre savoir <span className="text-primary">en revenu.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
            Créez, vendez et gérez vos cours en ligne et produits numériques. Vos élèves paient par Orange Money, Wave ou carte bancaire, et vous retirez vos gains en FCFA.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#" className="inline-flex items-center justify-center gap-2 rounded-btn bg-primary px-6 py-3.5 font-semibold text-white transition-colors hover:bg-primary-hover">
              Commencer gratuitement <ArrowRight size={18} />
            </a>
            <a href="#comment-ca-marche" className="inline-flex items-center justify-center rounded-btn border border-line bg-white px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-primary-light">
              Voir comment ça marche
            </a>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-ink-2">
            <ShieldCheck size={16} className="text-success" /> Sans carte bancaire. Sans engagement.
          </p>
        </div>
        <DashboardMockup />
      </div>
    </section>
  );
}
