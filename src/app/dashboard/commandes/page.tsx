"use client";

import { useState } from "react";
import { Search, X, Mail } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import BottomNav from "@/components/dashboard/BottomNav";
import { fcfa, type OrderStatus } from "@/lib/dashboard-data";
import { StatusBadge } from "@/components/dashboard/LatestOrders";

const allOrders = [
  { id: "#SP-4821", client: "Moussa Ndiaye", email: "moussa@email.com", product: "Maîtriser Excel en 7 jours", amount: 25000, method: "Wave", status: "Payé" as OrderStatus, when: "14 oct. 2026, 09:12" },
  { id: "#SP-4820", client: "Awa Sarr", email: "awa@email.com", product: "Lancer son e-commerce en Afrique", amount: 35000, method: "Orange Money", status: "Payé" as OrderStatus, when: "14 oct. 2026, 08:30" },
  { id: "#SP-4819", client: "Cheikh Fall", email: "cheikh@email.com", product: "Pack de 50 modèles de factures", amount: 5000, method: "Wave", status: "En attente" as OrderStatus, when: "14 oct. 2026, 07:58" },
  { id: "#SP-4818", client: "Mariama Ba", email: "mariama@email.com", product: "Maîtriser Excel en 7 jours", amount: 25000, method: "Carte bancaire", status: "Échoué" as OrderStatus, when: "13 oct. 2026, 17:20" },
  { id: "#SP-4817", client: "Ibrahima Sow", email: "ibrahima@email.com", product: "Comptabilité simple pour freelances", amount: 15000, method: "Orange Money", status: "Payé" as OrderStatus, when: "13 oct. 2026, 14:05" },
  { id: "#SP-4816", client: "Fatou Diop", email: "fatou@email.com", product: "Vendre sur WhatsApp Business", amount: 20000, method: "Wave", status: "Payé" as OrderStatus, when: "12 oct. 2026, 11:30" },
  { id: "#SP-4815", client: "Omar Faye", email: "omar@email.com", product: "Lancer son e-commerce en Afrique", amount: 35000, method: "Wave", status: "Payé" as OrderStatus, when: "12 oct. 2026, 09:15" },
  { id: "#SP-4814", client: "Rokhaya Niang", email: "rokhaya@email.com", product: "Pack de 50 modèles de factures", amount: 5000, method: "Orange Money", status: "En attente" as OrderStatus, when: "11 oct. 2026, 16:40" },
  { id: "#SP-4813", client: "Seydou Diallo", email: "seydou@email.com", product: "Maîtriser Excel en 7 jours", amount: 25000, method: "Wave", status: "Payé" as OrderStatus, when: "11 oct. 2026, 10:20" },
  { id: "#SP-4812", client: "Aissatou Bah", email: "aissatou@email.com", product: "Comptabilité simple pour freelances", amount: 15000, method: "Carte bancaire", status: "Échoué" as OrderStatus, when: "10 oct. 2026, 14:00" },
];

type StatusFilter = "Toutes" | OrderStatus;
const statusFilters: StatusFilter[] = ["Toutes", "Payé", "En attente", "Échoué"];

export default function CommandesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Toutes");
  const [selected, setSelected] = useState<(typeof allOrders)[0] | null>(null);

  const filtered = allOrders.filter((o) => {
    const matchSearch =
      o.client.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "Toutes" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

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
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-card border border-line bg-white p-4 shadow-soft">
              <p className="text-xs text-ink-2">Total commandes</p>
              <p className="num mt-1 text-2xl font-extrabold text-ink">{allOrders.length}</p>
            </div>
            <div className="rounded-card border border-line bg-white p-4 shadow-soft">
              <p className="text-xs text-ink-2">Payées</p>
              <p className="num mt-1 text-2xl font-extrabold text-success">{paid.length}</p>
              <p className="text-xs text-ink-2">{paidPct}% du total</p>
            </div>
            <div className="rounded-card border border-line bg-white p-4 shadow-soft">
              <p className="text-xs text-ink-2">Chiffre d&apos;affaires</p>
              <p className="num mt-1 text-xl font-extrabold text-gold-ink">{fcfa(totalRevenue)}</p>
            </div>
          </div>

          {/* Search + filter */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
                  className={`whitespace-nowrap rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                    statusFilter === s ? "bg-primary text-white" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile cards */}
          <ul className="space-y-3 sm:hidden">
            {filtered.map((o) => (
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
          <section className="hidden overflow-hidden rounded-card border border-line bg-white shadow-soft sm:block">
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
                  {filtered.map((o) => (
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
                      <td className="num px-6 py-4 text-right font-semibold text-gold-ink">{fcfa(o.amount)}</td>
                      <td className="px-6 py-4 text-ink-2">{o.method}</td>
                      <td className="px-6 py-4"><StatusBadge status={o.status} /></td>
                      <td className="px-6 py-4 text-ink-2">{o.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
      <BottomNav active="Commandes" />

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
                onClick={() => {}}
                className="inline-flex w-full items-center justify-center gap-2 rounded-btn bg-primary px-5 py-2.5 font-bold text-white hover:bg-primary-hover"
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
