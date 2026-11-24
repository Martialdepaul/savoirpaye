// Lecture en base des produits, commandes et retraits (côté serveur uniquement).
import { and, desc, eq, inArray } from "drizzle-orm";
import { db } from "./db";
import { orders, product, shop, user, withdrawal } from "./db/schema";
import type { CatalogProduct, ProductSeller, ProductStatus, ProductType } from "./catalog";

type ProductRow = typeof product.$inferSelect;
type OrderRow = typeof orders.$inferSelect;
type WithdrawalRow = typeof withdrawal.$inferSelect;

/* ---------- Conversions vers les types de l'interface (dates en texte ISO) ---------- */

export type OrderDTO = {
  id: string; ref: string; client: string; email: string; phone: string; productId: string | null; product: string; productType: string;
  amount: number; method: string; status: "Payé" | "En attente" | "Annulé"; offPlatform: boolean; commission: number; date: string; paidAt: string | null;
};
export type WithdrawalDTO = { id: string; amount: number; fee: number; method: string; number: string; status: "En attente" | "Traité" | "Refusé"; date: string };

export const orderRef = (n: number) => `#SP-${1000 + n}`;

export const toOrderDTO = (o: OrderRow): OrderDTO => ({
  id: o.id, ref: orderRef(o.number), client: o.buyerName, email: o.buyerEmail, phone: o.buyerPhone, productId: o.productId, product: o.productName,
  productType: o.productType, amount: o.amount, method: o.method, status: o.status as OrderDTO["status"], offPlatform: o.offPlatform,
  commission: o.commission, date: o.createdAt.toISOString(), paidAt: o.paidAt?.toISOString() ?? null,
});

const toWithdrawalDTO = (w: WithdrawalRow): WithdrawalDTO => ({
  id: w.id, amount: w.amount, fee: w.fee, method: w.method, number: w.number, status: w.status as WithdrawalDTO["status"], date: w.createdAt.toISOString(),
});

function toProduct(p: ProductRow, seller: ProductSeller, paid: OrderRow[] = []): CatalogProduct {
  const mine = paid.filter((o) => o.productId === p.id);
  return {
    id: p.id, slug: p.slug, name: p.name, type: p.type as ProductType, price: p.price, comparePrice: p.comparePrice, status: p.status as ProductStatus,
    subtitle: p.subtitle, description: p.description, cover: p.cover, goals: p.goals, modules: p.modules, files: p.files, coaching: p.coaching,
    createdAt: p.createdAt.toISOString(), sales: mine.length, revenue: mine.reduce((s, o) => s + o.amount, 0), seller,
  };
}

/** Version publique : les liens des vidéos, textes et fichiers payants ne quittent pas le serveur */
export function publicView(p: CatalogProduct): CatalogProduct {
  return {
    ...p,
    modules: p.modules.map((m) => ({ ...m, lessons: m.lessons.map((l) => (l.preview ? l : { ...l, url: "", content: "" })) })),
    files: p.files.map((f) => ({ ...f, url: "" })),
  };
}

/* ---------- Requêtes ---------- */

async function sellerOfShop(shopId: string): Promise<ProductSeller | null> {
  const [r] = await db
    .select({ name: user.name, image: user.image, phone: user.phone, shopName: shop.name, shopSlug: shop.slug })
    .from(shop).innerJoin(user, eq(shop.userId, user.id)).where(eq(shop.id, shopId)).limit(1);
  return r ?? null;
}

/** Tout ce dont le tableau de bord a besoin pour une boutique */
export async function getShopData(shopId: string) {
  const [seller, productRows, orderRows, withdrawalRows] = await Promise.all([
    sellerOfShop(shopId),
    db.select().from(product).where(eq(product.shopId, shopId)).orderBy(desc(product.createdAt)),
    db.select().from(orders).where(eq(orders.shopId, shopId)).orderBy(desc(orders.createdAt)),
    db.select().from(withdrawal).where(eq(withdrawal.shopId, shopId)).orderBy(desc(withdrawal.createdAt)),
  ]);
  const paid = orderRows.filter((o) => o.status === "Payé");
  return {
    products: seller ? productRows.map((p) => toProduct(p, seller, paid)) : [],
    orders: orderRows.map(toOrderDTO),
    withdrawals: withdrawalRows.map(toWithdrawalDTO),
  };
}
export type ShopData = Awaited<ReturnType<typeof getShopData>>;

/** Produit par adresse, avec son vendeur et l'identifiant du propriétaire (complet : à filtrer avant affichage public) */
export async function getProductBySlug(slug: string) {
  const [row] = await db
    .select({ p: product, ownerId: shop.userId, name: user.name, image: user.image, phone: user.phone, shopName: shop.name, shopSlug: shop.slug })
    .from(product).innerJoin(shop, eq(product.shopId, shop.id)).innerJoin(user, eq(shop.userId, user.id))
    .where(eq(product.slug, slug)).limit(1);
  if (!row) return null;
  const paid = await db.select().from(orders).where(and(eq(orders.productId, row.p.id), eq(orders.status, "Payé")));
  const seller = { name: row.name, image: row.image, phone: row.phone, shopName: row.shopName, shopSlug: row.shopSlug };
  return { product: toProduct(row.p, seller, paid), ownerId: row.ownerId, shopId: row.p.shopId };
}

/** Produits en ligne d'une boutique (version publique) */
export async function getPublishedProducts(shopId: string) {
  const seller = await sellerOfShop(shopId);
  if (!seller) return [];
  const rows = await db.select().from(product).where(and(eq(product.shopId, shopId), eq(product.status, "En ligne"))).orderBy(desc(product.createdAt));
  const paid = rows.length ? await db.select().from(orders).where(and(inArray(orders.productId, rows.map((r) => r.id)), eq(orders.status, "Payé"))) : [];
  return rows.map((p) => publicView(toProduct(p, seller, paid)));
}

/** Achats payés d'un acheteur (par adresse e-mail), avec le contenu complet des produits */
export async function getPurchases(email: string) {
  const paid = await db.select().from(orders).where(and(eq(orders.buyerEmail, email.toLowerCase()), eq(orders.status, "Payé"))).orderBy(desc(orders.paidAt));
  const ids = [...new Set(paid.map((o) => o.productId).filter((x): x is string => !!x))];
  if (!ids.length) return [];
  const rows = await db
    .select({ p: product, name: user.name, image: user.image, phone: user.phone, shopName: shop.name, shopSlug: shop.slug })
    .from(product).innerJoin(shop, eq(product.shopId, shop.id)).innerJoin(user, eq(shop.userId, user.id))
    .where(inArray(product.id, ids));
  return ids
    .map((id) => rows.find((r) => r.p.id === id))
    .filter((r): r is NonNullable<typeof r> => !!r)
    .map((r) => ({
      product: toProduct(r.p, { name: r.name, image: r.image, phone: r.phone, shopName: r.shopName, shopSlug: r.shopSlug }),
      purchasedAt: (paid.find((o) => o.productId === r.p.id)!.paidAt ?? paid.find((o) => o.productId === r.p.id)!.createdAt).toISOString(),
    }));
}
