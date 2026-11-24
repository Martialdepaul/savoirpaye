"use server";

// Commandes : création depuis la page de paiement (publique), puis suivi par le vendeur.
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { orders, product, shop, user, withdrawal } from "@/lib/db/schema";
import { getSession } from "@/lib/account";
import { getShopData, orderRef } from "@/lib/store";
import { newOrderEmail, orderPaidEmail, orderReceivedEmail, sendEmail } from "@/lib/email";
import { paymentMethods, withdrawalFees } from "@/lib/mock-data";
import { MIN_WITHDRAWAL } from "@/lib/plans";
import { walletFrom } from "@/lib/wallet-data";

type Result<T = object> = ({ ok: true } & T) | { ok: false; error: string };
const txt = (s: unknown, max: number) => (typeof s === "string" ? s.trim().replace(/\s+/g, " ").slice(0, max) : "");
const METHODS = new Set(paymentMethods.map((m) => m.name));

async function orderInfo(orderId: string) {
  const [r] = await db
    .select({ o: orders, sellerName: user.name, sellerPhone: user.phone, ownerId: shop.userId, shopSlug: shop.slug })
    .from(orders).innerJoin(shop, eq(orders.shopId, shop.id)).innerJoin(user, eq(shop.userId, user.id))
    .where(eq(orders.id, orderId)).limit(1);
  if (!r) return null;
  const o = r.o;
  return {
    row: o, ownerId: r.ownerId, shopSlug: r.shopSlug,
    info: { ref: orderRef(o.number), buyerName: o.buyerName, buyerEmail: o.buyerEmail, buyerPhone: o.buyerPhone, product: o.productName, productType: o.productType, amount: o.amount, method: o.method, sellerName: r.sellerName, sellerPhone: r.sellerPhone },
  };
}

/** Page de paiement : enregistre la commande (gratuite = accès immédiat) */
export async function createOrder(input: { productSlug: string; name: string; email: string; phone: string; method: string }): Promise<Result<{ ref: string; paid: boolean }>> {
  const name = txt(input.name, 80);
  const email = txt(input.email, 120).toLowerCase();
  const phone = txt(input.phone, 30);
  if (name.length < 3) return { ok: false, error: "Indiquez votre nom complet." };
  if (!/^\S+@\S+\.\S+$/.test(email)) return { ok: false, error: "Saisissez une adresse e-mail valide." };
  if (phone.replace(/\D/g, "").length < 8) return { ok: false, error: "Saisissez un numéro de téléphone valide." };

  const [p] = await db
    .select({ p: product, sellerId: shop.userId, sellerName: user.name, sellerEmail: user.email, sellerPhone: user.phone })
    .from(product).innerJoin(shop, eq(product.shopId, shop.id)).innerJoin(user, eq(shop.userId, user.id))
    .where(eq(product.slug, txt(input.productSlug, 80))).limit(1);
  if (!p || p.p.status !== "En ligne") return { ok: false, error: "Ce produit n'est plus en vente." };

  const free = p.p.price === 0;
  const method = free ? "Gratuit" : txt(input.method, 40);
  if (!free && !METHODS.has(method)) return { ok: false, error: "Choisissez un moyen de paiement." };

  // Déjà acheté avec cette adresse : pas de doublon
  const [already] = await db.select({ id: orders.id, number: orders.number }).from(orders)
    .where(and(eq(orders.productId, p.p.id), eq(orders.buyerEmail, email), eq(orders.status, "Payé"))).limit(1);
  if (already) return { ok: false, error: "Vous avez déjà accès à ce produit avec cette adresse e-mail. Connectez-vous pour le retrouver dans « Mes achats »." };

  const id = crypto.randomUUID();
  const now = new Date();
  const [row] = await db.insert(orders).values({
    id, shopId: p.p.shopId, productId: p.p.id, productName: p.p.name, productType: p.p.type, amount: p.p.price,
    buyerName: name, buyerEmail: email, buyerPhone: phone, method, status: free ? "Payé" : "En attente", paidAt: free ? now : null,
  }).returning({ number: orders.number });

  const info = { ref: orderRef(row.number), buyerName: name, buyerEmail: email, buyerPhone: phone, product: p.p.name, productType: p.p.type, amount: p.p.price, method, sellerName: p.sellerName, sellerPhone: p.sellerPhone };
  await Promise.all([
    sendEmail({ to: email, ...(free ? orderPaidEmail(info) : orderReceivedEmail(info)) }),
    sendEmail({ to: p.sellerEmail, ...newOrderEmail(info, free) }),
  ]);
  revalidatePath("/dashboard", "layout");
  return { ok: true, ref: info.ref, paid: free };
}

async function ownOrder(orderId: string) {
  const session = await getSession();
  if (!session) return null;
  const o = await orderInfo(orderId);
  return o && o.ownerId === session.user.id ? o : null;
}

/** Vendeur : paiement reçu directement (Wave, Orange Money…) → l'acheteur reçoit son accès */
export async function markOrderPaid(orderId: string): Promise<Result> {
  const o = await ownOrder(orderId);
  if (!o) return { ok: false, error: "Commande introuvable." };
  if (o.row.status !== "En attente") return { ok: false, error: "Seule une commande en attente peut être marquée comme payée." };
  await db.update(orders).set({ status: "Payé", offPlatform: true, paidAt: new Date() }).where(eq(orders.id, orderId));
  await sendEmail({ to: o.row.buyerEmail, ...orderPaidEmail(o.info) });
  revalidatePath("/dashboard", "layout");
  return { ok: true };
}

/** Vendeur : annule une commande en attente (paiement jamais reçu) */
export async function cancelOrder(orderId: string): Promise<Result> {
  const o = await ownOrder(orderId);
  if (!o) return { ok: false, error: "Commande introuvable." };
  if (o.row.status !== "En attente") return { ok: false, error: "Seule une commande en attente peut être annulée." };
  await db.update(orders).set({ status: "Annulé" }).where(eq(orders.id, orderId));
  revalidatePath("/dashboard", "layout");
  return { ok: true };
}

/** Vendeur : renvoie à l'acheteur l'e-mail de sa commande (accès si payée, récapitulatif sinon) */
export async function resendOrderEmail(orderId: string): Promise<Result> {
  const o = await ownOrder(orderId);
  if (!o) return { ok: false, error: "Commande introuvable." };
  if (o.row.status === "Annulé") return { ok: false, error: "Cette commande est annulée." };
  await sendEmail({ to: o.row.buyerEmail, ...(o.row.status === "Payé" ? orderPaidEmail(o.info) : orderReceivedEmail(o.info)) });
  return { ok: true };
}

/** Vendeur : demande de retrait du solde disponible (calculé côté serveur) */
export async function requestWithdrawal(input: { amount: number; method: string; number: string }): Promise<Result> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Votre session a expiré." };
  const [s] = await db.select().from(shop).where(eq(shop.userId, session.user.id)).limit(1);
  if (!s) return { ok: false, error: "Créez d'abord votre boutique." };
  const amount = Math.round(Number(input.amount));
  const method = txt(input.method, 40);
  const number = txt(input.number, 40);
  if (!(method in withdrawalFees)) return { ok: false, error: "Choisissez un opérateur." };
  if (number.replace(/\D/g, "").length < 8) return { ok: false, error: "Saisissez un numéro valide." };
  if (!Number.isInteger(amount) || amount < MIN_WITHDRAWAL) return { ok: false, error: `Le retrait minimum est de ${MIN_WITHDRAWAL.toLocaleString("fr-FR")} FCFA.` };
  const data = await getShopData(s.id);
  const wallet = walletFrom(
    data.orders.map((o) => ({ ...o, date: new Date(o.date), paidAt: o.paidAt ? new Date(o.paidAt) : null })),
    data.withdrawals.map((w) => ({ ...w, date: new Date(w.date) })),
  );
  if (amount > wallet.available) return { ok: false, error: "Ce montant dépasse votre solde disponible." };
  await db.insert(withdrawal).values({ id: crypto.randomUUID(), shopId: s.id, amount, fee: Math.round(amount * withdrawalFees[method]), method, number });
  revalidatePath("/dashboard", "layout");
  return { ok: true };
}
