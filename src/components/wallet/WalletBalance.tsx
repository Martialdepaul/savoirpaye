import { Wallet, Clock, ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { walletBalance, fcfa } from "@/lib/wallet-data";

export default function WalletBalance({ onWithdraw }: { onWithdraw: () => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {/* Disponible — spans 2 cols on sm+ */}
      <div className="rounded-card border border-gold/30 bg-gold-light p-5 shadow-soft sm:col-span-2 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gold-ink">
              <Wallet size={16} /> Solde disponible
            </div>
            <div className="num mt-1.5 font-heading text-4xl font-extrabold text-gold-ink sm:text-5xl">
              {fcfa(walletBalance.available)}
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-gold-ink/80">
              <Clock size={15} />
              <span className="num font-semibold">{fcfa(walletBalance.pending)}</span> en attente de validation
            </div>
          </div>
          <button
            onClick={onWithdraw}
            className="flex items-center justify-center gap-2 rounded-btn bg-gold px-6 py-3 font-bold text-ink transition-colors hover:bg-[#d4922c]"
          >
            Retirer <ArrowUpRight size={18} />
          </button>
        </div>
      </div>

      {/* En attente */}
      <div className="rounded-card border border-line bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink-2">En attente</span>
          <Clock size={16} className="text-pending" />
        </div>
        <div className="num mt-3 font-heading text-2xl font-extrabold text-pending">{fcfa(walletBalance.pending)}</div>
        <div className="mt-1 text-xs text-ink-2">Validé sous 24–48 h ouvrées</div>
      </div>

      {/* Total retiré */}
      <div className="rounded-card border border-line bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink-2">Total retiré</span>
          <ArrowDownToLine size={16} className="text-ink-2" />
        </div>
        <div className="num mt-3 font-heading text-2xl font-extrabold">{fcfa(walletBalance.totalWithdrawn)}</div>
        <div className="mt-1 text-xs text-ink-2">Depuis la création du compte</div>
      </div>
    </div>
  );
}
