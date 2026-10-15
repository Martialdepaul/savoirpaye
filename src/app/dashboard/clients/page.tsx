"use client";

import { useState } from "react";
import { Search, X, MessageSquare } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import BottomNav from "@/components/dashboard/BottomNav";
import { fcfa } from "@/lib/dashboard-data";

interface Client {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  purchases: number;
  totalSpent: number;
  lastPurchase: string;
  joinedAt: string;
  products: string[];
}

const clients: Client[] = [
  { id: "C001", name: "Moussa Ndiaye", initials: "MN", email: "moussa@email.com", phone: "+221 77 123 45 67", purchases: 3, totalSpent: 75000, lastPurchase: "14 oct. 2026", joinedAt: "12 jan. 2026", products: ["Maîtriser Excel en 7 jours", "Lancer son e-commerce en Afrique", "Pack de 50 modèles de factures"] },
  { id: "C002", name: "Awa Sarr", initials: "AS", email: "awa@email.com", phone: "+221 76 234 56 78", purchases: 2, totalSpent: 60000, lastPurchase: "14 oct. 2026", joinedAt: "3 mars 2026", products: ["Lancer son e-commerce en Afrique", "Comptabilité simple pour freelances"] },
  { id: "C003", name: "Ibrahima Sow", initials: "IS", email: "ibrahima@email.com", phone: "+221 78 345 67 89", purchases: 1, totalSpent: 15000, lastPurchase: "13 oct. 2026", joinedAt: "13 oct. 2026", products: ["Comptabilité simple pour freelances"] },
  { id: "C004", name: "Fatou Diop", initials: "FD", email: "fatou@email.com", phone: "+221 77 456 78 90", purchases: 2, totalSpent: 55000, lastPurchase: "12 oct. 2026", joinedAt: "20 jan. 2026", products: ["Vendre sur WhatsApp Business", "Maîtriser Excel en 7 jours"] },
  { id: "C005", name: "Omar Faye", initials: "OF", email: "omar@email.com", phone: "+221 76 567 89 01", purchases: 1, totalSpent: 35000, lastPurchase: "12 oct. 2026", joinedAt: "12 oct. 2026", products: ["Lancer son e-commerce en Afrique"] },
  { id: "C006", name: "Rokhaya Niang", initials: "RN", email: "rokhaya@email.com", phone: "+221 78 678 90 12", purchases: 1, totalSpent: 5000, lastPurchase: "11 oct. 2026", joinedAt: "5 sept. 2026", products: ["Pack de 50 modèles de factures"] },
  { id: "C007", name: "Seydou Diallo", initials: "SD", email: "seydou@email.com", phone: "+221 77 789 01 23", purchases: 1, totalSpent: 25000, lastPurchase: "11 oct. 2026", joinedAt: "11 oct. 2026", products: ["Maîtriser Excel en 7 jours"] },
  { id: "C008", name: "Aissatou Bah", initials: "AB", email: "aissatou@email.com", phone: "+221 76 890 12 34", purchases: 1, totalSpent: 15000, lastPurchase: "10 oct. 2026", joinedAt: "2 août 2026", products: ["Comptabilité simple pour freelances"] },
];

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Client | null>(null);

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalSpentAll = clients.reduce((s, c) => s + c.totalSpent, 0);
  const totalPurchasesAll = clients.reduce((s, c) => s + c.purchases, 0);
  const avgValue = totalPurchasesAll > 0 ? totalSpentAll / totalPurchasesAll : 0;

  return (
    <div className="min-h-screen">
      <Sidebar active="Clients" />
      <div className="lg:pl-64">
        <Topbar />
        <main className="mx-auto max-w-6xl space-y-5 px-4 pb-32 pt-6 sm:px-8 lg:pb-12">
          {/* Header */}
          <div>
            <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Clients</h1>
            <p className="mt-1 text-sm text-ink-2">Base de données de vos acheteurs.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-card border border-line bg-white p-4 shadow-soft">
              <p className="text-xs text-ink-2">Total clients</p>
              <p className="num mt-1 text-2xl font-extrabold text-ink">{clients.length}</p>
            </div>
            <div className="rounded-card border border-line bg-white p-4 shadow-soft">
              <p className="text-xs text-ink-2">Nouveaux ce mois</p>
              <p className="num mt-1 text-2xl font-extrabold text-primary">14</p>
            </div>
            <div className="rounded-card border border-line bg-white p-4 shadow-soft">
              <p className="text-xs text-ink-2">Valeur moyenne</p>
              <p className="num mt-1 text-xl font-extrabold text-gold-ink">{fcfa(avgValue)}</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative sm:w-[280px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-2" />
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-btn border border-line bg-white py-2.5 pl-9 pr-4 text-sm focus:border-primary focus:outline-none"
            />
          </div>

          {/* Mobile cards */}
          <ul className="space-y-3 sm:hidden">
            {filtered.map((c) => (
              <li
                key={c.id}
                onClick={() => setSelected(c)}
                className="rounded-card border border-line bg-white p-4 shadow-soft cursor-pointer hover:border-primary/40"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-white">
                    {c.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">{c.name}</p>
                    <p className="truncate text-xs text-ink-2">{c.email}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-ink-2">{c.purchases} achat{c.purchases > 1 ? "s" : ""}</span>
                  <span className="num font-bold text-gold-ink">{fcfa(c.totalSpent)}</span>
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
                    {["Client", "Achats", "Total dépensé", "Dernier achat", "Inscrit le", ""].map((h, i) => (
                      <th key={i} scope="col" className={`px-6 py-3 font-semibold ${h === "Achats" || h === "Total dépensé" ? "text-right" : ""}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {filtered.map((c) => (
                    <tr key={c.id} className="cursor-pointer hover:bg-page/60" onClick={() => setSelected(c)}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-white">
                            {c.initials}
                          </span>
                          <div>
                            <div className="font-semibold text-ink">{c.name}</div>
                            <div className="text-xs text-ink-2">{c.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="num px-6 py-4 text-right text-ink-2">{c.purchases}</td>
                      <td className="num px-6 py-4 text-right font-semibold text-gold-ink">{fcfa(c.totalSpent)}</td>
                      <td className="px-6 py-4 text-ink-2">{c.lastPurchase}</td>
                      <td className="px-6 py-4 text-ink-2">{c.joinedAt}</td>
                      <td className="px-6 py-4">
                        <button className="rounded-btn border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink-2 hover:text-ink">
                          Voir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
      <BottomNav active="Clients" />

      {/* Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-ink/40" />
          <div
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <h2 className="font-heading text-lg font-bold">Profil client</h2>
              <button onClick={() => setSelected(null)} className="rounded p-1.5 text-ink-2 hover:bg-page hover:text-ink">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Avatar + info */}
              <div className="flex items-center gap-4">
                <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-xl font-bold text-white">
                  {selected.initials}
                </span>
                <div>
                  <p className="font-heading text-lg font-bold text-ink">{selected.name}</p>
                  <p className="text-sm text-ink-2">{selected.email}</p>
                  <p className="text-sm text-ink-2">{selected.phone}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-card border border-line bg-page p-3">
                  <p className="text-xs text-ink-2">Achats</p>
                  <p className="num mt-1 text-xl font-extrabold text-ink">{selected.purchases}</p>
                </div>
                <div className="rounded-card border border-line bg-page p-3">
                  <p className="text-xs text-ink-2">Total dépensé</p>
                  <p className="num mt-1 text-base font-extrabold text-gold-ink">{fcfa(selected.totalSpent)}</p>
                </div>
              </div>

              {/* Products */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-2 mb-3">Formations achetées</p>
                <ul className="space-y-2">
                  {selected.products.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-ink-2">
                <span className="font-semibold">Dernier achat :</span> {selected.lastPurchase}
              </div>
              <div className="text-xs text-ink-2">
                <span className="font-semibold">Inscrit le :</span> {selected.joinedAt}
              </div>
            </div>
            <div className="border-t border-line p-6">
              <button
                onClick={() => {}}
                className="inline-flex w-full items-center justify-center gap-2 rounded-btn bg-primary px-5 py-2.5 font-bold text-white hover:bg-primary-hover"
              >
                <MessageSquare size={16} />
                Envoyer un message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
