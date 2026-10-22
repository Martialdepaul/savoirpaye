"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import BottomNav from "@/components/dashboard/BottomNav";
import WalletBalance from "@/components/wallet/WalletBalance";
import TransactionHistory from "@/components/wallet/TransactionHistory";
import WithdrawalDrawer from "@/components/wallet/WithdrawalDrawer";

export default function PortefeuillePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Ouvre directement le retrait depuis le bouton « Retirer » de l'accueil
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("retrait")) setDrawerOpen(true);
  }, []);
  return (
    <div className="min-h-screen">
      <Sidebar active="Portefeuille" />
      <div className="lg:pl-64">
        <Topbar />
        <main className="mx-auto max-w-4xl space-y-6 px-4 pb-32 pt-6 sm:px-8 lg:pb-12">
          <div>
            <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Portefeuille</h1>
            <p className="mt-1 text-sm text-ink-2">Gérez vos revenus et vos retraits.</p>
          </div>
          <WalletBalance onWithdraw={() => setDrawerOpen(true)} />
          <TransactionHistory />
        </main>
      </div>
      <BottomNav active="Portefeuille" />
      <WithdrawalDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
