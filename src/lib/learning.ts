// Espace « Mes achats » : accès aux produits achetés (ou à ses propres produits, en aperçu).
import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { progress } from "./db/schema";
import { getProductBySlug, getPurchases } from "./store";
import type { Account } from "./account";

export async function getLibrary(account: Account) {
  const purchases = await getPurchases(account.user.email);
  const rows = await db.select().from(progress).where(eq(progress.userId, account.user.id));
  return purchases.map((p) => ({ ...p, completed: rows.find((r) => r.productId === p.product.id)?.completed ?? [] }));
}

/** Produit complet si l'utilisateur l'a acheté ou s'il en est le vendeur ; null sinon */
export async function getOwnedProduct(account: Account, slug: string) {
  const found = await getProductBySlug(slug);
  if (!found) return null;
  const isSeller = found.ownerId === account.user.id;
  if (!isSeller) {
    const library = await getPurchases(account.user.email);
    if (!library.some((p) => p.product.id === found.product.id)) return null;
  }
  const [row] = await db.select().from(progress).where(and(eq(progress.userId, account.user.id), eq(progress.productId, found.product.id))).limit(1);
  return { product: found.product, isSeller, completed: row?.completed ?? [] };
}
