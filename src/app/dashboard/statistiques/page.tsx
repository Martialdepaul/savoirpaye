"use client";

import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import BottomNav from "@/components/dashboard/BottomNav";
import StatCards from "@/components/dashboard/StatCards";
import RevenueChart from "@/components/dashboard/RevenueChart";
import EmptyState from "@/components/dashboard/EmptyState";
import { useShopData } from "@/components/dashboard/AccountContext";
import { periods, topProducts, fcfa, isPaid, type PeriodId } from "@/lib/dashboard-data";

function typeBadge(type: string) {
  if (type === "Formation") return <span className="rounded-md bg-primary-light px-2 py-0.5 text-[11px] font-bold text-primary">{type}</span>;
  if (type === "Coaching") return <span className="rounded-md bg-ai-light px-2 py-0.5 text-[11px] font-bold text-ai">{type}</span>;
  return <span className="rounded-md bg-gold-light px-2 py-0.5 text-[11px] font-bold text-gold-ink">{type}</span>;
}

export default function StatistiquesPage() {
  const [period, setPeriod] = useState<PeriodId>("30");
  const { orders, products } = useShopData();
  const top = topProducts(products, 6);

  const k = useMemo(() => {
    const since = Date.now() - Number(period) * 86_400_000;
    const list = orders.filter((o) => o.date.getTime() >= since);
    const paid = list.filter(isPaid);
    const decided = list.filter((o) => o.status !== "En attente");
    return {
      paymentRate: decided.length ? Math.round((paid.length / decided.length) * 100) : null,
      pending: list.filter((o) => o.status === "En attente").length,
      avgCart: paid.length ? Math.round(paid.reduce((s, o) => s + o.amount, 0) / paid.length) : 0,
    };
  }, [orders, period]);

  return (
    <div className="min-h-screen">
      <Sidebar active="Statistiques" />
      <div className="lg:pl-64">
        <Topbar />
        <main className="mx-auto max-w-6xl space-y-5 px-4 pb-32 pt-6 sm:px-8 lg:pb-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Statistiques</h1>
              <p className="mt-1 text-sm text-ink-2">Les performances de votre boutique, calculées à partir de vos commandes.</p>
            </div>
            <div role="tablist" aria-label="Période" className="flex w-full rounded-btn border border-line bg-white p-1 sm:w-auto">
              {periods.map((p) => (
                <button key={p.id} role="tab" aria-selected={period === p.id} onClick={() => setPeriod(p.id)}
                  className={`min-h-11 flex-1 rounded-lg px-4 text-sm font-medium transition-colors sm:flex-none ${period === p.id ? "bg-primary text-white" : "text-ink-2 hover:text-ink"}`}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <StatCards period={period} />

          <section className="rounded-card border border-line bg-white p-4 shadow-soft sm:p-6">
            <h2 className="mb-4 font-heading text-lg font-bold">Commandes et paiements</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              <div className="rounded-card border border-line bg-page p-4">
                <p className="text-xs text-ink-2">Taux de paiement</p>
                <p className="num mt-1 text-2xl font-extrabold text-primary">{k.paymentRate === null ? "—" : `${k.paymentRate} %`}</p>
                <p className="text-xs text-ink-2">des commandes traitées sont payées</p>
              </div>
              <div className="rounded-card border border-line bg-page p-4">
                <p className="text-xs text-ink-2">En attente de paiement</p>
                <p className="num mt-1 text-2xl font-extrabold text-pending">{k.pending}</p>
                <p className="text-xs text-ink-2">à relancer</p>
              </div>
              <div className="col-span-2 rounded-card border border-line bg-page p-4 sm:col-span-1">
                <p className="text-xs text-ink-2">Panier moyen</p>
                <p className="num mt-1 text-xl font-extrabold text-gold-ink">{fcfa(k.avgCart)}</p>
                <p className="text-xs text-ink-2">par vente payée</p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <RevenueChart period={period} />
            <section className="rounded-card border border-line bg-white p-4 shadow-soft sm:p-6">
              <h2 className="mb-4 font-heading text-lg font-bold">Meilleures ventes</h2>
              {top.length === 0 ? (
                <p className="flex h-64 items-center justify-center px-6 text-center text-sm text-ink-2">Le classement de vos produits apparaîtra dès votre première vente.</p>
              ) : (
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={top} margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
                      <CartesianGrid stroke="#E3EBE7" strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "#52615A", fontSize: 12 }} />
                      <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#52615A", fontSize: 11 }} width={112}
                        tickFormatter={(v: string) => (v.length > 22 ? `${v.slice(0, 21)}…` : v)} />
                      <Tooltip formatter={(v) => [`${v} vente${Number(v) > 1 ? "s" : ""}`, "Ventes"]} contentStyle={{ borderRadius: 10, border: "1px solid #E3EBE7", fontSize: 13 }} />
                      <Bar dataKey="sales" fill="#0d4d3b" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </section>
          </div>

          {top.length === 0 ? (
            orders.length === 0 && (
              <EmptyState icon="stats" compact title="Vos statistiques se rempliront avec vos ventes"
                text="Chiffre d'affaires, ventes, nouveaux clients et meilleurs produits sont calculés automatiquement à partir de vos commandes."
                cta={{ label: "Voir mes produits", href: "/dashboard/produits" }} />
            )
          ) : (
            <section className="rounded-card border border-line bg-white shadow-soft">
              <div className="px-4 py-4 sm:px-6 sm:pb-3"><h2 className="font-heading text-lg font-bold">Top produits</h2></div>
              <ul className="divide-y divide-line border-t border-line sm:hidden">
                {top.map((p) => (
                  <li key={p.id} className="flex items-start justify-between gap-3 px-4 py-3.5">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-ink">{p.name}</div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">{typeBadge(p.type)}<span className="num text-xs text-ink-2">{p.sales} vente{p.sales > 1 ? "s" : ""}</span></div>
                    </div>
                    <div className="num shrink-0 whitespace-nowrap text-sm font-semibold text-gold-ink">{fcfa(p.revenue)}</div>
                  </li>
                ))}
              </ul>
              <div className="hidden overflow-x-auto sm:block">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-y border-line bg-page text-xs uppercase tracking-wider text-ink-2">
                      {["Produit", "Type", "Ventes", "Revenu"].map((h) => (
                        <th key={h} scope="col" className={`px-6 py-3 font-semibold ${h === "Ventes" || h === "Revenu" ? "text-right" : ""}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {top.map((p) => (
                      <tr key={p.id} className="hover:bg-page/60">
                        <td className="px-6 py-4 font-medium text-ink">{p.name}</td>
                        <td className="px-6 py-4">{typeBadge(p.type)}</td>
                        <td className="num px-6 py-4 text-right text-ink-2">{p.sales}</td>
                        <td className="num whitespace-nowrap px-6 py-4 text-right font-semibold text-gold-ink">{fcfa(p.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </main>
      </div>
      <BottomNav active="Statistiques" />
    </div>
  );
}
