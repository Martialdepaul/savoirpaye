"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Wallet, Clock, ArrowUpRight } from "lucide-react";
import { fcfa, walletFrom } from "../../lib/wallet-data";
import { MIN_WITHDRAWAL } from "../../lib/plans";
import { useShopData } from "./AccountContext";

export default function BalanceCard() {
  const { orders, withdrawals } = useShopData();
  const wallet = useMemo(() => walletFrom(orders, withdrawals), [orders, withdrawals]);
  const canWithdraw = wallet.available >= MIN_WITHDRAWAL;
  return (
    <section aria-label="Solde" className="bg-forest-glow rounded-card p-5 text-white shadow-lift sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm font-medium text-white/75"><Wallet size={16} /> Solde disponible</div>
          <div className="num mt-1.5 break-words font-heading text-4xl font-extrabold sm:text-5xl">{fcfa(wallet.available)}</div>
          <div className="mt-3 flex items-center gap-2 text-sm text-white/75">
            <Clock size={15} className="shrink-0" /> <span><span className="num font-semibold text-gold">{fcfa(wallet.pending)}</span> en attente de validation</span>
          </div>
        </div>
        {canWithdraw ? (
          <Link href="/dashboard/portefeuille?retrait=1" className="flex min-h-12 items-center justify-center gap-2 rounded-btn bg-gold px-6 font-bold text-forest transition-colors hover:bg-gold-hover">
            Retirer <ArrowUpRight size={18} />
          </Link>
        ) : (
          <Link href="/dashboard/portefeuille" className="flex min-h-12 items-center justify-center gap-2 rounded-btn border border-white/30 px-6 font-semibold text-white transition-colors hover:bg-white/10">
            Voir le portefeuille
          </Link>
        )}
      </div>
    </section>
  );
}
