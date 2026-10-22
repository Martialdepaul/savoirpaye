import { Wallet, Clock, ArrowUpRight } from "lucide-react";
import { fcfa, wallet } from "../../lib/dashboard-data";

export default function BalanceCard() {
  return (
    <section aria-label="Solde" className="rounded-card border border-gold/30 bg-gold-light p-5 shadow-soft sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-gold-ink"><Wallet size={16} /> Solde disponible</div>
          <div className="num mt-1.5 font-heading text-4xl font-extrabold text-gold-ink sm:text-5xl">{fcfa(wallet.available)}</div>
          <div className="mt-3 flex items-center gap-2 text-sm text-gold-ink/80">
            <Clock size={15} /> <span className="num font-semibold">{fcfa(wallet.pending)}</span> en attente de validation
          </div>
        </div>
        <a href="/dashboard/portefeuille?retrait=1" className="flex min-h-12 items-center justify-center gap-2 rounded-btn bg-gold px-6 font-bold text-ink transition-colors hover:bg-[#d4922c]">
          Retirer <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
