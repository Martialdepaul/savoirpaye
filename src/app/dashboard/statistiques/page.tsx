"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import BottomNav from "@/components/dashboard/BottomNav";
import StatCards from "@/components/dashboard/StatCards";
import RevenueChart from "@/components/dashboard/RevenueChart";
import { periods, statsByPeriod, topProducts, fcfa, type PeriodId } from "@/lib/dashboard-data";

const productTypes: Record<string, string> = {
  "Formation": "Formation",
  "Produit numérique": "Produit numérique",
  "Coaching": "Coaching",
};

function typeBadge(type: string) {
  if (type === "Formation")
    return <span className="rounded-md bg-primary-light px-2 py-0.5 text-[11px] font-bold text-primary">{type}</span>;
  if (type === "Coaching")
    return <span className="rounded-md bg-ai-light px-2 py-0.5 text-[11px] font-bold text-ai">{type}</span>;
  return <span className="rounded-md bg-gold-light px-2 py-0.5 text-[11px] font-bold text-gold-ink">{type}</span>;
}

const visitors: Record<PeriodId, number> = { "7": 756, "30": 3240, "90": 8920 };

export default function StatistiquesPage() {
  const [period, setPeriod] = useState<PeriodId>("30");

  const stats = statsByPeriod[period];
  const visitorCount = visitors[period];
  const convRate = ((stats.sales / visitorCount) * 100).toFixed(1);
  const avgCart = stats.sales > 0 ? Math.round(stats.revenue / stats.sales) : 0;

  return (
    <div className="min-h-screen">
      <Sidebar active="Statistiques" />
      <div className="lg:pl-64">
        <Topbar />
        <main className="mx-auto max-w-6xl space-y-5 px-4 pb-32 pt-6 sm:px-8 lg:pb-12">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Statistiques</h1>
              <p className="mt-1 text-sm text-ink-2">Analysez la performance de votre boutique.</p>
            </div>
            <div role="tablist" aria-label="Période" className="flex w-full rounded-btn border border-line bg-white p-1 sm:w-auto">
              {periods.map((p) => (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={period === p.id}
                  onClick={() => setPeriod(p.id)}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors sm:flex-none ${
                    period === p.id ? "bg-primary text-white" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* KPI cards */}
          <StatCards period={period} />

          {/* Charts */}
          <div className="grid gap-5 xl:grid-cols-2">
            <RevenueChart period={period} />

            <section className="rounded-card border border-line bg-white p-4 shadow-soft sm:p-6">
              <h2 className="font-heading mb-4 text-lg font-bold">Meilleures ventes</h2>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={topProducts}
                    margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid stroke="#E7E5E4" strokeDasharray="3 3" horizontal={false} />
                    <XAxis
                      type="number"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#57534E", fontSize: 12 }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#57534E", fontSize: 11 }}
                      width={140}
                    />
                    <Tooltip
                      formatter={(v) => [`${v} ventes`, "Ventes"]}
                      contentStyle={{ borderRadius: 10, border: "1px solid #E7E5E4", fontSize: 13 }}
                    />
                    <Bar dataKey="sales" fill="#0b5d55" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>

          {/* Taux de conversion */}
          <section className="rounded-card border border-line bg-white p-4 shadow-soft sm:p-6">
            <h2 className="font-heading mb-4 text-lg font-bold">Taux de conversion</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-card border border-line bg-page p-4">
                <p className="text-xs text-ink-2">Visiteurs</p>
                <p className="num mt-1 text-2xl font-extrabold text-ink">{visitorCount.toLocaleString("fr-FR")}</p>
                <p className="text-xs text-ink-2">sur {period === "7" ? "7 j" : period === "30" ? "30 j" : "90 j"}</p>
              </div>
              <div className="rounded-card border border-line bg-page p-4">
                <p className="text-xs text-ink-2">Taux de conversion</p>
                <p className="num mt-1 text-2xl font-extrabold text-primary">{convRate}%</p>
                <p className="text-xs text-ink-2">des visiteurs achètent</p>
              </div>
              <div className="rounded-card border border-line bg-page p-4">
                <p className="text-xs text-ink-2">Panier moyen</p>
                <p className="num mt-1 text-xl font-extrabold text-gold-ink">{fcfa(avgCart)}</p>
                <p className="text-xs text-ink-2">par commande</p>
              </div>
            </div>
          </section>

          {/* Top products table */}
          <section className="rounded-card border border-line bg-white shadow-soft">
            <div className="px-4 py-4 sm:px-6 sm:pb-3">
              <h2 className="font-heading text-lg font-bold">Top produits</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-y border-line bg-page text-xs uppercase tracking-wider text-ink-2">
                    {["Produit", "Type", "Ventes", "Revenu"].map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className={`px-6 py-3 font-semibold ${h === "Ventes" || h === "Revenu" ? "text-right" : ""}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {topProducts.map((p, i) => (
                    <tr key={i} className="hover:bg-page/60">
                      <td className="px-6 py-4 font-medium text-ink">{p.name}</td>
                      <td className="px-6 py-4">{typeBadge(p.type)}</td>
                      <td className="num px-6 py-4 text-right text-ink-2">{p.sales}</td>
                      <td className="num px-6 py-4 text-right font-semibold text-gold-ink">{fcfa(p.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
      <BottomNav active="Statistiques" />
    </div>
  );
}
