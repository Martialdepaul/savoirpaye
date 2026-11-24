"use server";

// Création, modification et suppression des produits du vendeur connecté.
import { and, count, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { orders, product, shop } from "@/lib/db/schema";
import { getSession } from "@/lib/account";
import { isLink, productStatuses, productTypes, productUrl, type CatalogFile, type CatalogModule, type ProductStatus, type ProductType } from "@/lib/catalog";
import { onlineLimits, planOf } from "@/lib/plans";

type Result<T = object> = ({ ok: true } & T) | { ok: false; error: string };

export type ProductInput = {
  type: ProductType;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  cover: string;
  price: number;
  comparePrice: number | null;
  goals: string[];
  modules: CatalogModule[];
  files: CatalogFile[];
  coaching: { duration: string; format: string } | null;
  status: ProductStatus;
};

const MAX_COVER = 700_000; // image compressée dans le navigateur (data URL)
const txt = (s: unknown, max: number) => (typeof s === "string" ? s.trim().slice(0, max) : "");
const RESERVED = new Set(["nouveau", "admin", "api"]);

async function ownShop() {
  const session = await getSession();
  if (!session) return null;
  const [s] = await db.select().from(shop).where(eq(shop.userId, session.user.id)).limit(1);
  return s ?? null;
}

function clean(input: ProductInput): ProductInput | string {
  if (!productTypes.includes(input.type)) return "Type de produit inconnu.";
  if (!productStatuses.includes(input.status)) return "Statut inconnu.";
  const name = txt(input.name, 90);
  if (name.length < 5) return "Donnez un titre d'au moins 5 caractères.";
  const slug = txt(input.slug, 80);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug) || RESERVED.has(slug)) return "L'adresse de la page ne doit contenir que des lettres minuscules, des chiffres et des tirets.";
  const price = Number(input.price);
  if (!Number.isInteger(price) || price < 0 || price > 10_000_000) return "Indiquez un prix en FCFA (nombre entier).";
  if (price > 0 && price < 500) return "Le prix minimum est de 500 FCFA (ou 0 pour un produit gratuit).";
  const comparePrice = input.comparePrice ? Number(input.comparePrice) : null;
  if (comparePrice !== null && !(Number.isInteger(comparePrice) && comparePrice > price)) return "Le prix barré doit être supérieur au prix de vente.";
  const cover = typeof input.cover === "string" ? input.cover : "";
  if (cover && !(cover.startsWith("data:image/") || isLink(cover))) return "Image de couverture invalide.";
  if (cover.length > MAX_COVER) return "L'image de couverture est trop lourde. Choisissez une image plus petite.";
  const goals = (Array.isArray(input.goals) ? input.goals : []).map((g) => txt(g, 160)).filter(Boolean).slice(0, 6);

  const modules: CatalogModule[] = input.type !== "Formation" ? [] : (Array.isArray(input.modules) ? input.modules : []).slice(0, 50).map((m) => ({
    id: txt(m.id, 40) || crypto.randomUUID(),
    title: txt(m.title, 120),
    lessons: (Array.isArray(m.lessons) ? m.lessons : []).slice(0, 100).map((l) => ({
      id: txt(l.id, 40) || crypto.randomUUID(),
      title: txt(l.title, 160),
      duration: txt(l.duration, 20),
      kind: l.kind === "Texte" ? "Texte" as const : "Vidéo" as const,
      preview: !!l.preview,
      url: l.kind === "Texte" ? "" : txt(l.url, 500),
      content: l.kind === "Texte" ? txt(l.content, 20_000) : "",
    })).filter((l) => l.title),
  })).filter((m) => m.title || m.lessons.length);
  for (const m of modules) for (const l of m.lessons) if (l.url && !isLink(l.url)) return `Le lien de la vidéo « ${l.title} » n'est pas valide (il doit commencer par https://).`;

  const files: CatalogFile[] = input.type !== "Produit numérique" ? [] : (Array.isArray(input.files) ? input.files : []).slice(0, 30)
    .map((f) => ({ id: txt(f.id, 40) || crypto.randomUUID(), name: txt(f.name, 120), url: txt(f.url, 500) })).filter((f) => f.name || f.url);
  for (const f of files) {
    if (!f.name) return "Donnez un nom à chaque fichier.";
    if (!isLink(f.url)) return `Le lien du fichier « ${f.name} » n'est pas valide (il doit commencer par https://).`;
  }

  const coaching = input.type === "Coaching" ? { duration: txt(input.coaching?.duration, 20) || "60 min", format: txt(input.coaching?.format, 60) || "Visio" } : null;

  if (input.status === "En ligne") {
    if (input.type === "Formation") {
      const lessons = modules.flatMap((m) => m.lessons);
      if (!lessons.length) return "Ajoutez au moins une leçon avant de publier.";
      const empty = lessons.find((l) => (l.kind === "Vidéo" ? !l.url : !l.content));
      if (empty) return `La leçon « ${empty.title} » n'a pas encore de contenu (${empty.kind === "Vidéo" ? "lien de la vidéo" : "texte"}).`;
    }
    if (input.type === "Produit numérique" && !files.length) return "Ajoutez au moins un fichier avant de publier.";
    if (!goals.length) return "Ajoutez au moins un point clé avant de publier.";
  }

  return {
    type: input.type, name, slug, subtitle: txt(input.subtitle, 160), description: txt(input.description, 10_000), cover, price, comparePrice,
    goals, modules, files, coaching, status: input.status,
  };
}

/** Crée (sans id) ou met à jour un produit de la boutique du vendeur connecté */
export async function saveProduct(input: ProductInput, id?: string): Promise<Result<{ id: string; slug: string }>> {
  const s = await ownShop();
  if (!s) return { ok: false, error: "Votre session a expiré ou votre boutique n'est pas configurée." };
  const data = clean(input);
  if (typeof data === "string") return { ok: false, error: data };

  if (id) {
    const [existing] = await db.select({ id: product.id, shopId: product.shopId, type: product.type }).from(product).where(eq(product.id, id)).limit(1);
    if (!existing || existing.shopId !== s.id) return { ok: false, error: "Produit introuvable." };
    if (existing.type !== data.type) return { ok: false, error: "Le type d'un produit ne peut pas être modifié." };
  }

  const [taken] = await db.select({ id: product.id }).from(product).where(id ? and(eq(product.slug, data.slug), ne(product.id, id)) : eq(product.slug, data.slug)).limit(1);
  if (taken) return { ok: false, error: "Cette adresse de page est déjà utilisée. Choisissez-en une autre." };

  const limit = onlineLimits[planOf(s.plan)];
  if (data.status === "En ligne" && limit !== null) {
    const [{ n }] = await db.select({ n: count() }).from(product)
      .where(id ? and(eq(product.shopId, s.id), eq(product.status, "En ligne"), ne(product.id, id)) : and(eq(product.shopId, s.id), eq(product.status, "En ligne")));
    if (n >= limit) return { ok: false, error: `Le plan ${planOf(s.plan)} permet ${limit} produit en ligne à la fois. Archivez l'autre produit ou passez au plan Pro.` };
  }

  const values = { ...data, coaching: data.coaching };
  let productId = id;
  if (id) {
    await db.update(product).set(values).where(eq(product.id, id));
  } else {
    productId = crypto.randomUUID();
    await db.insert(product).values({ id: productId, shopId: s.id, ...values });
  }
  revalidatePath("/dashboard", "layout");
  revalidatePath(productUrl(data));
  revalidatePath(`/boutique/${s.slug}`);
  return { ok: true, id: productId!, slug: data.slug };
}

/** Supprime un produit sans commande ; un produit déjà vendu doit être archivé (les acheteurs gardent leur accès) */
export async function deleteProduct(id: string): Promise<Result> {
  const s = await ownShop();
  if (!s) return { ok: false, error: "Votre session a expiré." };
  const [p] = await db.select({ id: product.id, shopId: product.shopId }).from(product).where(eq(product.id, id)).limit(1);
  if (!p || p.shopId !== s.id) return { ok: false, error: "Produit introuvable." };
  const [{ n }] = await db.select({ n: count() }).from(orders).where(eq(orders.productId, id));
  if (n > 0) return { ok: false, error: "Ce produit a déjà des commandes : archivez-le plutôt que de le supprimer, pour que vos acheteurs gardent leur accès." };
  await db.delete(product).where(eq(product.id, id));
  revalidatePath("/dashboard", "layout");
  revalidatePath(`/boutique/${s.slug}`);
  return { ok: true };
}
