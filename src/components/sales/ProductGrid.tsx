"use client";

import Link from "next/link";
import { useState } from "react";
import { FileDown, GraduationCap, Star, Users, Video } from "lucide-react";
import Pagination, { usePagination } from "../ui/Pagination";
import { fcfa } from "../../lib/dashboard-data";
import { productUrl, type CatalogProduct, type ProductType } from "../../lib/catalog";

const icons: Record<ProductType, typeof GraduationCap> = { Formation: GraduationCap, "Produit numérique": FileDown, Coaching: Video };
type Filter = "Tout" | ProductType;
const labels: Record<Filter, string> = { Tout: "Tout", Formation: "Formations", "Produit numérique": "Produits numériques", Coaching: "Coaching" };

export default function ProductGrid({ products }: { products: CatalogProduct[] }) {
  const [filter, setFilter] = useState<Filter>("Tout");
  const available = (["Formation", "Produit numérique", "Coaching"] as ProductType[]).filter((t) => products.some((p) => p.type === t));
  const filters: Filter[] = available.length > 1 ? ["Tout", ...available] : [];
  const visible = filter === "Tout" ? products : products.filter((p) => p.type === filter);
  const pager = usePagination(visible, 9, filter);

  return (
    <div ref={pager.anchorRef} className="scroll-mt-6 space-y-6">
      {filters.length > 0 && (
        <div role="tablist" aria-label="Type de produit" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)}
              className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors ${filter === f ? "border-primary bg-primary text-white" : "border-line bg-white text-ink-2 hover:text-ink"}`}>
              {labels[f]}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="rounded-card border border-dashed border-line bg-white py-12 text-center text-sm text-ink-2">Aucun produit pour le moment.</p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pager.pageItems.map((p) => {
            const Icon = icons[p.type];
            return (
              <li key={p.id}>
                <Link href={productUrl(p)} className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-soft transition-shadow hover:shadow-[0_4px_20px_rgb(28_25_23/0.1)]">
                  <div className="relative aspect-[16/9] bg-primary-light">
                    <img src={p.cover} alt="" loading="lazy" className="size-full object-cover" />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold"><Icon size={13} className="text-primary" /> {p.type}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-heading text-base font-bold leading-snug group-hover:text-primary">{p.name}</h3>
                    <p className="mt-1.5 line-clamp-2 text-sm text-ink-2">{p.subtitle}</p>
                    <div className="num mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-2">
                      {p.reviewsCount > 0 && <span className="flex items-center gap-1"><Star size={13} className="fill-gold text-gold" /> <strong className="text-ink">{String(p.rating).replace(".", ",")}</strong> ({p.reviewsCount})</span>}
                      {p.students > 0 && <span className="flex items-center gap-1"><Users size={13} /> {p.students.toLocaleString("fr-FR")}</span>}
                    </div>
                    <div className="mt-auto flex items-baseline gap-2 pt-4">
                      <span className="num font-heading text-lg font-extrabold text-gold-ink">{p.price === 0 ? "Gratuit" : fcfa(p.price)}</span>
                      {p.comparePrice && <span className="num text-xs text-ink-2 line-through">{fcfa(p.comparePrice)}</span>}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <Pagination {...pager} onChange={pager.setPage} label="produits" />
    </div>
  );
}
