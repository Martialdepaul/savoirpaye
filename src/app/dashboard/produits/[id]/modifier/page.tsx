import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductEditor from "@/components/editor/ProductEditor";
import { draftFrom } from "@/components/editor/types";
import { catalog, findProductById } from "@/lib/catalog";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return catalog.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = findProductById((await params).id);
  return { title: p ? `Modifier « ${p.name} » | SavoirPaye` : "Produit introuvable" };
}

export default async function EditProductPage({ params }: Props) {
  const p = findProductById((await params).id);
  if (!p) notFound();
  return <ProductEditor initial={draftFrom(p)} isNew={false} />;
}
