"use client";

import { useState } from "react";
import { Plus, Search, Edit2, Eye, MoreVertical } from "lucide-react";
import Pagination, { usePagination } from "@/components/ui/Pagination";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import BottomNav from "@/components/dashboard/BottomNav";
import { fcfa } from "@/lib/dashboard-data";

type ProductStatus = "En ligne" | "Brouillon" | "Archivé";
type ProductType = "Formation" | "Produit numérique" | "Coaching";

interface Product {
  id: string;
  name: string;
  type: ProductType;
  price: number;
  sales: number;
  revenue: number;
  status: ProductStatus;
  createdAt: string;
}

const products: Product[] = [
  { id: "P001", name: "Maîtriser Excel en 7 jours", type: "Formation", price: 25000, sales: 34, revenue: 850000, status: "En ligne", createdAt: "3 mars 2026" },
  { id: "P002", name: "Lancer son e-commerce en Afrique", type: "Formation", price: 35000, sales: 22, revenue: 770000, status: "En ligne", createdAt: "12 jan. 2026" },
  { id: "P003", name: "Pack de 50 modèles de factures", type: "Produit numérique", price: 5000, sales: 61, revenue: 305000, status: "En ligne", createdAt: "5 fév. 2026" },
  { id: "P004", name: "Comptabilité simple pour freelances", type: "Formation", price: 15000, sales: 15, revenue: 225000, status: "En ligne", createdAt: "20 jan. 2026" },
  { id: "P005", name: "Vendre sur WhatsApp Business", type: "Formation", price: 20000, sales: 8, revenue: 160000, status: "En ligne", createdAt: "1 avr. 2026" },
  { id: "P006", name: "Modèles de contrats freelance", type: "Produit numérique", price: 8000, sales: 0, revenue: 0, status: "Brouillon", createdAt: "10 oct. 2026" },
  { id: "P007", name: "Coaching 1h — Stratégie digitale", type: "Coaching", price: 50000, sales: 3, revenue: 150000, status: "Archivé", createdAt: "15 juil. 2026" },
];

function statusBadge(status: ProductStatus) {
  if (status === "En ligne")
    return <span className="shrink-0 whitespace-nowrap rounded-full bg-[#ECF8EF] px-2.5 py-1 text-xs font-bold text-success">{status}</span>;
  if (status === "Brouillon")
    return <span className="shrink-0 whitespace-nowrap rounded-full bg-page px-2.5 py-1 text-xs font-bold text-ink-2">{status}</span>;
  return <span className="shrink-0 whitespace-nowrap rounded-full bg-line px-2.5 py-1 text-xs font-bold text-ink-2">{status}</span>;
}

function typeBadge(type: ProductType) {
  if (type === "Formation")
    return <span className="rounded-md bg-primary-light px-2 py-0.5 text-[11px] font-bold text-primary">{type}</span>;
  if (type === "Coaching")
    return <span className="rounded-md bg-ai-light px-2 py-0.5 text-[11px] font-bold text-ai">{type}</span>;
  return <span className="rounded-md bg-gold-light px-2 py-0.5 text-[11px] font-bold text-gold-ink">{type}</span>;
}

export default function ProduitsPage() {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const pager = usePagination(filtered, 10, search);

  const totalOnline = products.filter((p) => p.status === "En ligne").length;
  const totalSales = products.reduce((s, p) => s + p.sales, 0);
  const totalRevenue = products.reduce((s, p) => s + p.revenue, 0);

  return (
    <div className="min-h-screen">
      <Sidebar active="Produits" />
      <div className="lg:pl-64">
        <Topbar />
        <main className="mx-auto max-w-6xl space-y-5 px-4 pb-32 pt-6 sm:px-8 lg:pb-12">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Produits</h1>
              <p className="mt-1 text-sm text-ink-2">Gérez vos produits et formations.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-btn bg-primary px-5 py-2.5 font-bold text-white hover:bg-primary-hover">
              <Plus size={18} />
              Nouveau produit
            </button>
          </div>

          {/* Search */}
          <div className="relative sm:w-[280px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-2" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-btn border border-line bg-white py-2.5 pl-9 pr-4 text-sm focus:border-primary focus:outline-none"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            <div className="rounded-card border border-line bg-white p-4 shadow-soft">
              <p className="text-xs text-ink-2">Total produits</p>
              <p className="num mt-1 text-2xl font-extrabold text-ink">{totalOnline}</p>
              <p className="text-xs text-ink-2">en ligne</p>
            </div>
            <div className="rounded-card border border-line bg-white p-4 shadow-soft">
              <p className="text-xs text-ink-2">Ventes ce mois</p>
              <p className="num mt-1 text-2xl font-extrabold text-ink">{totalSales}</p>
              <p className="text-xs text-ink-2">commandes</p>
            </div>
            <div className="col-span-2 rounded-card border border-line bg-white p-4 shadow-soft sm:col-span-1">
              <p className="text-xs text-ink-2">Revenu total</p>
              <p className="num mt-1 text-xl font-extrabold text-gold-ink">{fcfa(totalRevenue)}</p>
              <p className="text-xs text-ink-2">tous produits</p>
            </div>
          </div>

          <div ref={pager.anchorRef} className="scroll-mt-20 space-y-5">
          {/* Mobile cards */}
          <ul className="space-y-3 sm:hidden">
            {pager.pageItems.map((p) => (
              <li key={p.id} className="rounded-card border border-line bg-white p-4 shadow-soft">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-ink">{p.name}</p>
                    <div className="mt-1">{typeBadge(p.type)}</div>
                  </div>
                  {statusBadge(p.status)}
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="num font-bold text-gold-ink">{fcfa(p.price)}</span>
                  <span className="text-ink-2">{p.sales} ventes</span>
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
                    {["Produit", "Type", "Prix", "Ventes", "Revenu", "Statut", "Actions"].map((h) => (
                      <th key={h} scope="col" className={`px-6 py-3 font-semibold ${h === "Prix" || h === "Ventes" || h === "Revenu" ? "text-right" : ""}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {pager.pageItems.map((p) => (
                    <tr key={p.id} className="hover:bg-page/60">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-ink">{p.name}</div>
                        <div className="text-xs text-ink-2">Créé le {p.createdAt}</div>
                      </td>
                      <td className="px-6 py-4">{typeBadge(p.type)}</td>
                      <td className="num whitespace-nowrap px-6 py-4 text-right font-semibold text-gold-ink">{fcfa(p.price)}</td>
                      <td className="num px-6 py-4 text-right text-ink-2">{p.sales}</td>
                      <td className="num whitespace-nowrap px-6 py-4 text-right font-semibold">{fcfa(p.revenue)}</td>
                      <td className="px-6 py-4">{statusBadge(p.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button onClick={() => {}} className="flex size-10 items-center justify-center rounded-lg text-ink-2 hover:bg-page hover:text-ink" title="Modifier" aria-label="Modifier">
                            <Edit2 size={15} />
                          </button>
                          <button onClick={() => {}} className="flex size-10 items-center justify-center rounded-lg text-ink-2 hover:bg-page hover:text-ink" title="Aperçu" aria-label="Aperçu">
                            <Eye size={15} />
                          </button>
                          <button onClick={() => {}} className="flex size-10 items-center justify-center rounded-lg text-ink-2 hover:bg-page hover:text-ink" title="Plus" aria-label="Plus">
                            <MoreVertical size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {filtered.length === 0 ? (
            <p className="rounded-card border border-dashed border-line bg-white py-12 text-center text-sm text-ink-2">Aucun produit ne correspond à votre recherche.</p>
          ) : (
            <Pagination {...pager} onChange={pager.setPage} label="produits" />
          )}
          </div>
        </main>
      </div>
      <BottomNav active="Produits" />
    </div>
  );
}
