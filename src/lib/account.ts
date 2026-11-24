// Lecture côté serveur du compte connecté (utilisateur + boutique).
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { auth } from "./auth";
import { db } from "./db";
import { shop, type Payout } from "./db/schema";

export type AccountUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  phone: string | null;
  emailVerified: boolean;
};

export type AccountShop = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  plan: string;
  payouts: Payout[];
  autoWithdraw: boolean;
};

export type Account = { user: AccountUser; shop: AccountShop | null };

// Lecture directe en base (sans le cache du cookie) : un nom ou un téléphone modifié s'affiche immédiatement
export async function getSession() {
  return auth.api.getSession({ headers: await headers(), query: { disableCookieCache: true } });
}

export async function getShopByUser(userId: string): Promise<AccountShop | null> {
  const [s] = await db.select().from(shop).where(eq(shop.userId, userId)).limit(1);
  if (!s) return null;
  return { id: s.id, name: s.name, slug: s.slug, description: s.description, category: s.category, plan: s.plan, payouts: s.payouts, autoWithdraw: s.autoWithdraw };
}

/** Compte complet de l'utilisateur connecté, ou null sans session valide */
export async function getAccount(): Promise<Account | null> {
  const session = await getSession();
  if (!session) return null;
  const u = session.user;
  return {
    user: { id: u.id, name: u.name, email: u.email, image: u.image ?? null, phone: (u.phone as string | null | undefined) ?? null, emailVerified: u.emailVerified },
    shop: await getShopByUser(u.id),
  };
}
