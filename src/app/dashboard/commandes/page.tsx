"use client";

import { useState } from "react";
import { Search, X, Mail } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import BottomNav from "@/components/dashboard/BottomNav";
import { fcfa, orders, type Order, type OrderStatus } from "@/lib/dashboard-data";
import { StatusBadge } from "@/components/dashboard/LatestOrders";
import Pagination, { usePagination } from "@/components/ui/Pagination";
import { useToast } from "@/components/ui/Toast";

const allOrders = orders;

type StatusFilter = "Toutes" | OrderStatus;
const statusFilters: StatusFilter[] = ["Toutes", "Payé", "En attente", "Échoué"];

export default function CommandesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Toutes");
  const [selected, setSelected] = useState<Order | null>(null);
  const [toast, showToast] = useToast();

  const filtered = allOrders.filter((o) => {
    const matchSearch =
      o.client.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "Toutes" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });
  const pager = usePagination(filtered, 10, `${search}|${statusFilter}`);

  const paid = allOrders.filter((o) => o.status === "Payé");
  const paidPct = Math.round((paid.length / allOrders.length) * 100);
  const totalRevenue = paid.reduce((s, o) => s + o.amount, 0);

  return (
    <div className="min-h-screen">
      <Sidebar active="Commandes" />
      <div className="lg:pl-64">
        <Topbar />
        <main className="mx-auto max-w-6xl space-y-5 px-4 pb-32 pt-6 sm:px-8 lg:pb-12">
          {/* Header */}
          <div>
            <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Commandes</h1>
            <p className="mt-1 text-sm text-ink-2">Historique de toutes vos transactions.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            <div className="rounded-card border border-line bg-white p-4 shadow-soft">
              <p className="text-xs text-ink-2">Total commandes</p>
              <p className="num mt-1 text-2xl font-extrabold text-ink">{allOrders.length}</p>
            </div>
            <div className="rounded-card border border-line bg-white p-4 shadow-soft">
              <p className="text-xs text-ink-2">Payées</p>
              <p className="num mt-1 text-2xl font-extrabold text-success">{paid.length}</p>
              <p className="text-xs text-ink-2">{paidPct}% du total</p>
            </div>
            <div className="col-span-2 rounded-card border border-line bg-white p-4 shadow-soft sm:col-span-1">
              <p className="text-xs text-ink-2">Chiffre d&apos;affaires</p>
              <p className="num mt-1 text-xl font-extrabold text-gold-ink">{fcfa(totalRevenue)}</p>
            </div>
          </div>

          {/* Search + filter */}
          <div ref={pager.anchorRef} className="flex scroll-mt-20 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative sm:w-[280px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-2" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-btn border border-line bg-white py-2.5 pl-9 pr-4 text-sm focus:border-primary focus:outline-none"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto rounded-btn border border-line bg-white p-1">
              {statusFilters.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`min-h-10 whitespace-nowrap rounded-lg px-4 text-sm font-medium transition-colors ${
                    statusFilter === s ? "bg-primary text-white" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile cards */}
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:hidden">
            {pager.pageItems.map((o) => (
              <li
                key={o.id}
                onClick={() => setSelected(o)}
                className="rounded-card border border-line bg-white p-4 shadow-soft cursor-pointer hover:border-primary/40"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">{o.client}</p>
                    <p className="text-xs text-ink-2">{o.email}</p>
                    <p className="mt-1 truncate text-xs text-ink-2">{o.product}</p>
                  </div>
                  <StatusBadge status={o.status} />
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="num font-bold text-gold-ink">{fcfa(o.amount)}</span>
                  <span className="text-xs text-ink-2">{o.when}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* Desktop table */}
          <section className="hidden overflow-hidden rounded-card border border-line bg-white shadow-soft md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line bg-page text-xs uppercase tracking-wider text-ink-2">
                    {["Commande", "Client", "Produit", "Montant", "Méthode", "Statut", "Date"].map((h) => (
                      <th key={h} scope="col" className={`px-6 py-3 font-semibold ${h === "Montant" ? "text-right" : ""}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {pager.pageItems.map((o) => (
                    <tr
                      key={o.id}
                      onClick={() => setSelected(o)}
                      className="cursor-pointer hover:bg-page/60"
                    >
                      <td className="num px-6 py-4 text-ink-2">{o.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-ink">{o.client}</div>
                        <div className="text-xs text-ink-2">{o.email}</div>
                      </td>
                      <td className="max-w-[200px] truncate px-6 py-4 text-ink-2">{o.product}</td>
                      <td className="num whitespace-nowrap px-6 py-4 text-right font-semibold text-gold-ink">{fcfa(o.amount)}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-ink-2">{o.method}</td>
                      <td className="px-6 py-4"><StatusBadge status={o.status} /></td>
                      <td className="whitespace-nowrap px-6 py-4 text-ink-2">{o.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {filtered.length === 0 ? (
            <p className="rounded-card border border-dashed border-line bg-white py-12 text-center text-sm text-ink-2">Aucune commande ne correspond à votre recherche.</p>
          ) : (
            <Pagination {...pager} onChange={pager.setPage} label="commandes" />
          )}
        </main>
      </div>
      <BottomNav active="Commandes" />
      {toast}

      {/* Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-ink/40" />
          <div
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <h2 className="font-heading text-lg font-bold">Détails de la commande</h2>
              <button onClick={() => setSelected(null)} className="rounded p-1.5 text-ink-2 hover:bg-page hover:text-ink">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-2">Référence</p>
                <p className="num mt-1 font-bold text-ink">{selected.id}</p>
                <p className="text-sm text-ink-2">{selected.when}</p>
              </div>
              <div className="rounded-card border border-line bg-page p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-2 mb-2">Client</p>
                <p className="font-semibold text-ink">{selected.client}</p>
                <p className="text-sm text-ink-2">{selected.email}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-2 mb-1">Produit acheté</p>
                <p className="text-sm text-ink">{selected.product}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-card border border-line bg-page p-3">
                  <p className="text-xs text-ink-2">Montant</p>
                  <p className="num mt-1 font-bold text-gold-ink">{fcfa(selected.amount)}</p>
                </div>
                <div className="rounded-card border border-line bg-page p-3">
                  <p className="text-xs text-ink-2">Méthode</p>
                  <p className="mt-1 font-semibold text-ink">{selected.method}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-2 mb-2">Statut</p>
                <StatusBadge status={selected.status} />
              </div>
            </div>
            <div className="border-t border-line p-6">
              <button
                onClick={() => showToast(`Reçu envoyé à ${selected.email}`)}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-btn bg-primary px-5 font-bold text-white hover:bg-primary-hover"
              >
                <Mail size={16} />
                Envoyer un reçu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
