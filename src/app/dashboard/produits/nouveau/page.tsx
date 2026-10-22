"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import ProductEditor, { TypePicker } from "@/components/editor/ProductEditor";
import { newDraft } from "@/components/editor/types";
import type { ProductType } from "@/lib/catalog";

const byParam: Record<string, ProductType> = { formation: "Formation", numerique: "Produit numérique", coaching: "Coaching" };
const toParam = (t: ProductType) => Object.keys(byParam).find((k) => byParam[k] === t)!;

function NewProduct() {
  const router = useRouter();
  const type = byParam[useSearchParams().get("type") ?? ""];

  if (type) return <ProductEditor key={type} initial={newDraft(type)} isNew />;

  return (
    <DashboardShell active="Produits">
      <main className="mx-auto max-w-4xl space-y-6 px-4 pb-32 pt-6 sm:px-8 lg:pb-12">
        <div>
          <a href="/dashboard/produits" className="-ml-1 inline-flex items-center gap-2 px-1 py-2 text-sm font-medium text-ink-2 hover:text-ink"><ArrowLeft size={16} /> Produits</a>
          <h1 className="mt-1 font-heading text-2xl font-extrabold sm:text-3xl">Que voulez-vous vendre ?</h1>
          <p className="mt-1 text-sm text-ink-2">Choisissez un type de produit. Vous pourrez tout modifier ensuite.</p>
        </div>
        <TypePicker onPick={(t) => router.push(`/dashboard/produits/nouveau?type=${toParam(t)}`)} />
      </main>
    </DashboardShell>
  );
}

export default function NewProductPage() {
  return (
    <Suspense fallback={null}>
      <NewProduct />
    </Suspense>
  );
}
