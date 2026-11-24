"use client";

import Link from "next/link";
import { use } from "react";
import { PackageX } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import ProductEditor from "@/components/editor/ProductEditor";
import { draftFrom } from "@/components/editor/types";
import { useShopData } from "@/components/dashboard/AccountContext";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const p = useShopData().products.find((x) => x.id === id);
  if (!p) {
    return (
      <DashboardShell active="Produits">
        <main className="mx-auto max-w-md px-4 pb-32 pt-16 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-page text-ink-2"><PackageX size={26} /></span>
          <h1 className="mt-4 font-heading text-2xl font-extrabold">Produit introuvable</h1>
          <p className="mt-2 text-ink-2">Ce produit n'existe pas ou a été supprimé.</p>
          <Link href="/dashboard/produits" className="mt-6 inline-flex min-h-12 items-center rounded-btn bg-primary px-6 font-semibold text-white hover:bg-primary-hover">Mes produits</Link>
        </main>
      </DashboardShell>
    );
  }
  return <ProductEditor key={p.id} initial={draftFrom(p)} isNew={false} productId={p.id} />;
}
