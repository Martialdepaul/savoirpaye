"use client";

import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import BottomNav from "../../components/dashboard/BottomNav";
import BalanceCard from "../../components/dashboard/BalanceCard";
import StatCards from "../../components/dashboard/StatCards";
import RevenueChart from "../../components/dashboard/RevenueChart";
import TopProducts from "../../components/dashboard/TopProducts";
import LatestOrders from "../../components/dashboard/LatestOrders";
import { periods, type PeriodId } from "../../lib/dashboard-data";
import { firstName, useAccount } from "../../components/dashboard/AccountContext";

export default function DashboardPage() {
  const [period, setPeriod] = useState<PeriodId>("30");
  const account = useAccount();
  const name = firstName(account?.user.name);
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="lg:pl-64">
        <Topbar />
        <main className="mx-auto max-w-6xl space-y-5 px-4 pb-32 pt-6 sm:px-8 lg:pb-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Bonjour{name ? `, ${name}` : ""}</h1>
              <p className="mt-1 text-sm text-ink-2">{account?.shop ? <>Voici l'activité de <strong className="text-ink">{account.shop.name}</strong>.</> : "Voici un aperçu de votre futur tableau de bord."}</p>
            </div>
            <div role="tablist" aria-label="Période" className="flex w-full rounded-btn border border-line bg-white p-1 sm:w-auto">
              {periods.map((p) => (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={period === p.id}
                  onClick={() => setPeriod(p.id)}
                  className={`flex-1 rounded-lg min-h-11 px-4 text-sm font-medium transition-colors sm:flex-none ${
                    period === p.id ? "bg-primary text-white" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <BalanceCard />
          <StatCards period={period} />
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.5fr_1fr]">
            <RevenueChart period={period} />
            <TopProducts />
          </div>
          <LatestOrders />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
