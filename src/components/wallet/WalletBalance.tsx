"use client";

import { useMemo } from "react";
import { Wallet, Clock, ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { fcfa, walletFrom } from "@/lib/wallet-data";
import { MIN_WITHDRAWAL, VALIDATION_HOURS } from "@/lib/plans";
import { useShopData } from "@/components/dashboard/AccountContext";

export default function WalletBalance({ onWithdraw }: { onWithdraw: () => void }) {
  const { orders, withdrawals } = useShopData();
  const w = useMemo(() => walletFrom(orders, withdrawals), [orders, withdrawals]);
  const canWithdraw = w.available >= MIN_WITHDRAWAL;
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-card border border-gold/30 bg-gold-light p-5 shadow-soft sm:col-span-3 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm font-medium text-gold-ink"><Wallet size={16} /> Solde disponible</div>
            <div className="num mt-1.5 break-words font-heading text-4xl font-extrabold text-gold-ink sm:text-5xl">{fcfa(w.available)}</div>
            {!canWithdraw && <p className="mt-2 text-sm text-gold-ink/80">Retrait possible à partir de {fcfa(MIN_WITHDRAWAL)}.</p>}
          </div>
          <button onClick={onWithdraw} disabled={!canWithdraw}
            className="flex min-h-12 items-center justify-center gap-2 rounded-btn bg-gold px-6 font-bold text-ink transition-colors hover:bg-gold-hover disabled:cursor-not-allowed disabled:opacity-50">
            Retirer <ArrowUpRight size={18} />
          </button>
        </div>
      </div>

      <div className="rounded-card border border-line bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between"><span className="text-sm text-ink-2">En validation</span><Clock size={16} className="text-pending" /></div>
        <div className="num mt-3 font-heading text-2xl font-extrabold text-pending">{fcfa(w.pending)}</div>
        <div className="mt-1 text-xs text-ink-2">Disponible {VALIDATION_HOURS} h après chaque vente</div>
      </div>
      <div className="rounded-card border border-line bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between"><span className="text-sm text-ink-2">Retraits en cours</span><ArrowUpRight size={16} className="text-ink-2" /></div>
        <div className="num mt-3 font-heading text-2xl font-extrabold">{fcfa(w.withdrawalsInProgress)}</div>
        <div className="mt-1 text-xs text-ink-2">Versés sous 24 h ouvrées</div>
      </div>
      <div className="rounded-card border border-line bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between"><span className="text-sm text-ink-2">Total retiré</span><ArrowDownToLine size={16} className="text-ink-2" /></div>
        <div className="num mt-3 font-heading text-2xl font-extrabold">{fcfa(w.totalWithdrawn)}</div>
        <div className="mt-1 text-xs text-ink-2">Depuis la création du compte</div>
      </div>
    </div>
  );
}
