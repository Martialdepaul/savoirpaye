"use server";

// Actions serveur de la boutique : création (onboarding), modification (Paramètres), comptes de retrait.
import { and, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { shop, type Payout } from "@/lib/db/schema";
import { getSession } from "@/lib/account";
import { slugify } from "@/lib/catalog";
import { mobileMoney } from "@/lib/mock-data";
import { shopCategories } from "@/lib/site-data";

type Result<T = object> = ({ ok: true } & T) | { ok: false; error: string };

const RESERVED = new Set(["admin", "api", "dashboard", "boutique", "savoirpay"]);
const PAYOUT_METHODS = new Set([...mobileMoney.map((m) => m.name), "Virement bancaire"]);
const clean = (s: unknown, max: number) => (typeof s === "string" ? s.trim().replace(/\s+/g, " ").slice(0, max) : "");

async function requireUser() {
  const session = await getSession();
  return session?.user ?? null;
}

/** Adresse unique de boutique à partir de son nom (« Les formations d'Awa » → « les-formations-d-awa », puis -2, -3…) */
async function uniqueSlug(name: string, userId: string) {
  const base = (slugify(name) || "boutique").slice(0, 48).replace(/-$/, "");
  for (let i = 1; i < 50; i++) {
    const candidate = i === 1 ? base : `${base}-${i}`;
    if (RESERVED.has(candidate)) continue;
    const [taken] = await db.select({ id: shop.id }).from(shop).where(and(eq(shop.slug, candidate), ne(shop.userId, userId))).limit(1);
    if (!taken) return candidate;
  }
  return `${base}-${Date.now().toString(36)}`;
}

function validPayout(method: string, number: string) {
  if (!PAYOUT_METHODS.has(method)) return "Choisissez un moyen de retrait.";
  if (number.replace(/\W/g, "").length < 8) return "Saisissez un numéro ou un compte valide.";
  return null;
}

/** Onboarding : crée la boutique (ou la met à jour si elle existe déjà) */
export async function createShop(input: { name: string; category: string; goal: string; payoutMethod: string; payoutNumber: string }): Promise<Result<{ slug: string }>> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Votre session a expiré. Reconnectez-vous." };
  const name = clean(input.name, 60);
  if (name.length < 2) return { ok: false, error: "Donnez un nom à votre boutique." };
  const category = shopCategories.includes(input.category) ? input.category : shopCategories[0];
  const method = clean(input.payoutMethod, 40);
  const number = clean(input.payoutNumber, 40);
  const payoutError = validPayout(method, number);
  if (payoutError) return { ok: false, error: payoutError };

  const payouts: Payout[] = [{ id: crypto.randomUUID(), method, number }];
  const [existing] = await db.select({ id: shop.id, slug: shop.slug }).from(shop).where(eq(shop.userId, user.id)).limit(1);
  if (existing) {
    await db.update(shop).set({ name, category, goal: clean(input.goal, 40), payouts }).where(eq(shop.id, existing.id));
    revalidatePath("/dashboard", "layout");
    return { ok: true, slug: existing.slug };
  }
  const slug = await uniqueSlug(name, user.id);
  await db.insert(shop).values({ id: crypto.randomUUID(), userId: user.id, name, slug, category, goal: clean(input.goal, 40), payouts });
  revalidatePath("/dashboard", "layout");
  return { ok: true, slug };
}

/** Paramètres › Boutique */
export async function updateShop(input: { name: string; description: string; category: string }): Promise<Result> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Votre session a expiré. Reconnectez-vous." };
  const name = clean(input.name, 60);
  if (name.length < 2) return { ok: false, error: "Donnez un nom à votre boutique." };
  const description = typeof input.description === "string" ? input.description.trim().slice(0, 600) : "";
  const category = shopCategories.includes(input.category) ? input.category : shopCategories[0];
  const res = await db.update(shop).set({ name, description, category }).where(eq(shop.userId, user.id)).returning({ slug: shop.slug });
  if (!res.length) return { ok: false, error: "Créez d'abord votre boutique." };
  revalidatePath("/dashboard", "layout");
  revalidatePath(`/boutique/${res[0].slug}`);
  return { ok: true };
}

/** Paramètres › Paiements : comptes de retrait et retrait automatique */
export async function updatePayouts(input: { payouts: { id?: string; method: string; number: string }[]; autoWithdraw: boolean }): Promise<Result> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Votre session a expiré. Reconnectez-vous." };
  if (!Array.isArray(input.payouts) || input.payouts.length > 5) return { ok: false, error: "5 comptes de retrait au maximum." };
  const payouts: Payout[] = [];
  for (const p of input.payouts) {
    const method = clean(p.method, 40);
    const number = clean(p.number, 40);
    const err = validPayout(method, number);
    if (err) return { ok: false, error: err };
    payouts.push({ id: typeof p.id === "string" && p.id ? p.id : crypto.randomUUID(), method, number });
  }
  const res = await db.update(shop).set({ payouts, autoWithdraw: !!input.autoWithdraw }).where(eq(shop.userId, user.id)).returning({ id: shop.id });
  if (!res.length) return { ok: false, error: "Créez d'abord votre boutique." };
  revalidatePath("/dashboard", "layout");
  return { ok: true };
}
