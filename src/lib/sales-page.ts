// Chargement d'une page de vente : produit en ligne pour tous, aperçu pour son propriétaire.
import { cache } from "react";
import type { Metadata } from "next";
import { getProductBySlug, publicView } from "./store";
import { getSession } from "./account";

export const loadSalesPage = cache(async (slug: string, formation: boolean) => {
  const found = await getProductBySlug(slug).catch(() => null);
  if (!found || (found.product.type === "Formation") !== formation) return null;
  const session = await getSession().catch(() => null);
  const isOwner = session?.user.id === found.ownerId;
  if (found.product.status !== "En ligne" && !isOwner) return null;
  return { product: publicView(found.product), isOwner };
});

export async function salesMetadata(slug: string, formation: boolean): Promise<Metadata> {
  const r = await loadSalesPage(slug, formation);
  if (!r) return {};
  const p = r.product;
  const description = p.subtitle || `${p.type} par ${p.seller.name}`;
  const images = /^https?:\/\//.test(p.cover) ? [p.cover] : undefined;
  return { title: p.name, description, openGraph: { title: p.name, description, images }, robots: p.status === "En ligne" ? undefined : { index: false } };
}
