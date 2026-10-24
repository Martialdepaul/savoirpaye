import Link from "next/link";
import { Wallet, Clock, ArrowUpRight } from "lucide-react";
import { fcfa, wallet } from "../../lib/dashboard-data";

export default function BalanceCard() {
  return (
    <section aria-label="Solde" className="bg-forest-glow rounded-card p-5 text-white shadow-lift sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-white/75"><Wallet size={16} /> Solde disponible</div>
          <div className="num mt-1.5 font-heading text-4xl font-extrabold sm:text-5xl">{fcfa(wallet.available)}</div>
          <div className="mt-3 flex items-center gap-2 text-sm text-white/75">
            <Clock size={15} /> <span className="num font-semibold text-gold">{fcfa(wallet.pending)}</span> en attente de validation
          </div>
        </div>
        <Link href="/dashboard/portefeuille?retrait=1" className="flex min-h-12 items-center justify-center gap-2 rounded-btn bg-gold px-6 font-bold text-forest transition-colors hover:bg-gold-hover">
          Retirer <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
