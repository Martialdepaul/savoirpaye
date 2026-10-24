import Link from "next/link";
import { ArrowRight, Play, Smartphone, Zap, Sparkles, ShieldCheck, LayoutDashboard, Package, GraduationCap, ShoppingBag, Users, Wallet, BarChart3, TrendingUp } from "lucide-react";

const perks = [
  { icon: Smartphone, title: "Paiements", sub: "Mobile Money" },
  { icon: Zap, title: "Retraits rapides", sub: "et sécurisés" },
  { icon: Sparkles, title: "Assistant IA", sub: "pour créer vos cours" },
  { icon: ShieldCheck, title: "Sécurité multi-tenant", sub: "pour les professionnels" },
];

const side = [LayoutDashboard, Package, GraduationCap, ShoppingBag, Users, Wallet, BarChart3];

const sales = [
  { who: "Formation Excel", amt: "25 000" },
  { who: "E-book Marketing Digital", amt: "15 000" },
  { who: "Coaching 1h", amt: "35 000" },
];

const txs = [
  { who: "Paiement formation", amt: "+25 000", ok: true },
  { who: "Retrait Orange Money", amt: "−50 000", ok: false },
  { who: "Paiement e-book", amt: "+15 000", ok: true },
];

function Mockups() {
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[580px] sm:h-[500px]">
      {/* Photo du créateur */}
      <div className="absolute left-0 top-0 h-[92%] w-[78%] overflow-hidden rounded-[28px] ring-1 ring-white/15 sm:w-[52%]">
        <img src="/images/hero-createur.jpg" alt="Un créateur souriant en sweat à capuche" className="size-full object-cover object-top" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest/60 to-transparent" />
      </div>

      {/* Fenêtre tableau de bord */}
      <div className="absolute right-0 top-[16%] hidden w-[64%] overflow-hidden rounded-card bg-white text-ink shadow-lift ring-1 ring-black/5 sm:block">
        <div className="flex">
          <div className="hidden w-11 shrink-0 flex-col items-center gap-3 border-r border-line bg-mint py-4 sm:flex">
            {side.map((I, i) => (
              <span key={i} className={`flex size-7 items-center justify-center rounded-lg ${i === 0 ? "bg-primary text-white" : "text-ink-2"}`}>
                <I size={14} />
              </span>
            ))}
          </div>
          <div className="min-w-0 flex-1 p-4">
            <div className="text-[11px] text-ink-2">Revenus du mois</div>
            <div className="num flex items-baseline gap-2">
              <span className="font-heading text-xl font-extrabold text-ink">1 248 500 FCFA</span>
              <span className="flex items-center gap-0.5 text-[11px] font-semibold text-success"><TrendingUp size={11} /> +18 %</span>
            </div>
            <svg viewBox="0 0 300 70" className="mt-2 h-16 w-full" aria-hidden>
              <defs>
                <linearGradient id="heroArea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#1f9d6b" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#1f9d6b" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 58 L30 50 L60 54 L90 40 L120 44 L150 30 L180 34 L210 20 L240 26 L270 12 L300 8 L300 70 L0 70 Z" fill="url(#heroArea)" />
              <path d="M0 58 L30 50 L60 54 L90 40 L120 44 L150 30 L180 34 L210 20 L240 26 L270 12 L300 8" fill="none" stroke="#1f9d6b" strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[["Ventes", "156", "+15 %"], ["Clients", "124", "+12 %"], ["Formations", "8", "+2"]].map(([l, v, d]) => (
                <div key={l} className="rounded-lg border border-line p-2">
                  <div className="text-[10px] text-ink-2">{l}</div>
                  <div className="num font-heading text-sm font-bold">{v}</div>
                  <div className="num text-[10px] font-semibold text-success">{d}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-ink-2">Meilleures ventes</div>
            <ul className="mt-1 divide-y divide-line">
              {sales.map((s) => (
                <li key={s.who} className="flex items-center justify-between py-1.5 text-[11px]">
                  <span className="truncate">{s.who}</span>
                  <span className="num shrink-0 font-semibold text-ink">{s.amt} FCFA</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Téléphone */}
      <div className="floatin absolute bottom-0 right-0 w-[168px] rounded-[26px] bg-ink p-1.5 shadow-lift sm:-bottom-6 sm:right-[-12px] sm:w-[176px]">
        <div className="overflow-hidden rounded-[21px] bg-white text-ink">
          <div className="bg-forest px-3 pb-3 pt-4 text-white">
            <div className="font-heading text-[13px] font-extrabold">savoir<span className="text-gold">pay</span></div>
            <div className="mt-2 text-[9px] text-white/70">Solde disponible</div>
            <div className="num font-heading text-base font-extrabold">245 000 FCFA</div>
            <div className="mt-2 grid grid-cols-2 gap-1.5 text-[9px] font-bold">
              <span className="rounded-md bg-gold py-1 text-center text-forest">Retirer</span>
              <span className="rounded-md bg-white/15 py-1 text-center">Historique</span>
            </div>
          </div>
          <div className="px-3 py-2">
            <div className="text-[9px] font-semibold text-ink-2">Dernières transactions</div>
            <ul className="mt-1 divide-y divide-line">
              {txs.map((t) => (
                <li key={t.who} className="flex items-center justify-between gap-1 py-1.5">
                  <span className="truncate text-[9px]">{t.who}</span>
                  <span className={`num shrink-0 text-[9px] font-bold ${t.ok ? "text-success" : "text-danger"}`}>{t.amt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="bg-forest-glow relative overflow-hidden text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-10 pt-12 lg:grid-cols-[1fr_1.05fr] lg:gap-8 lg:pt-16">
        <div>
          <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/85">
            La plateforme des créateurs africains et du monde
          </span>
          <h1 className="mt-5 font-heading text-[40px] font-extrabold leading-[1.05] sm:text-6xl lg:text-[58px]">
            Transformez votre savoir en <span className="text-gold">revenu.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
            Créez, vendez et gérez vos formations, produits numériques et services en ligne. Vos clients paient par Mobile Money ou carte, et vous retirez vos gains en FCFA.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/inscription" className="inline-flex items-center justify-center gap-2 rounded-btn bg-gold px-6 py-3.5 font-bold text-forest transition-colors hover:bg-gold-hover">
              Commencer gratuitement <ArrowRight size={18} />
            </Link>
            <Link href="/comment-ca-marche" className="inline-flex items-center justify-center gap-2.5 rounded-btn border border-white/30 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10">
              <span className="flex size-6 items-center justify-center rounded-full bg-white text-forest"><Play size={12} fill="currentColor" /></span>
              Voir la démo
            </Link>
          </div>
        </div>

        <div className="relative">
          <p aria-hidden className="absolute -top-8 right-0 hidden rotate-[-6deg] text-right font-hand text-2xl leading-tight text-white/90 xl:block">
            Ton expertise<br />peut changer des vies !
          </p>
          <Mockups />
        </div>
      </div>

      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-5 px-5 pb-12 pt-6 lg:grid-cols-4 lg:pt-10">
        {perks.map((p) => (
          <li key={p.title} className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-gold"><p.icon size={18} /></span>
            <span className="text-sm leading-tight">
              <span className="block font-semibold">{p.title}</span>
              <span className="text-white/65">{p.sub}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
