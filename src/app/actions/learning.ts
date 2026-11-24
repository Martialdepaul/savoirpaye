"use server";

import { db } from "@/lib/db";
import { progress } from "@/lib/db/schema";
import { getAccount } from "@/lib/account";
import { getOwnedProduct } from "@/lib/learning";

/** Enregistre la liste des leçons terminées d'une formation achetée */
export async function saveProgress(slug: string, completed: string[]): Promise<{ ok: boolean }> {
  const account = await getAccount();
  if (!account) return { ok: false };
  const owned = await getOwnedProduct(account, slug);
  if (!owned) return { ok: false };
  const valid = new Set(owned.product.modules.flatMap((m) => m.lessons.map((l) => l.id)));
  const list = [...new Set(completed)].filter((id) => valid.has(id));
  await db.insert(progress)
    .values({ id: crypto.randomUUID(), userId: account.user.id, productId: owned.product.id, completed: list })
    .onConflictDoUpdate({ target: [progress.userId, progress.productId], set: { completed: list } });
  return { ok: true };
}
