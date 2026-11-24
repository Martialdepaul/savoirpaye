// Types et fonctions communes aux produits (utilisables côté serveur et navigateur).
// Les produits eux-mêmes sont en base (table `product`), lus par `src/lib/store.ts`.

export type ProductType = "Formation" | "Produit numérique" | "Coaching";
export type ProductStatus = "En ligne" | "Brouillon" | "Archivé";

export const productTypes: ProductType[] = ["Formation", "Produit numérique", "Coaching"];
export const productStatuses: ProductStatus[] = ["En ligne", "Brouillon", "Archivé"];

/** Leçon : vidéo (lien YouTube, Vimeo, Google Drive…) ou texte */
export type CatalogLesson = { id: string; title: string; duration: string; kind: "Vidéo" | "Texte"; preview: boolean; url: string; content: string };
export type CatalogModule = { id: string; title: string; lessons: CatalogLesson[] };
/** Fichier livré à l'acheteur : lien de téléchargement (Google Drive, Dropbox…) */
export type CatalogFile = { id: string; name: string; url: string };
export type Coaching = { duration: string; format: string };

/** Vendeur affiché sur les pages publiques */
export type ProductSeller = { name: string; image: string | null; phone: string | null; shopName: string; shopSlug: string };

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  type: ProductType;
  price: number;
  comparePrice: number | null;
  status: ProductStatus;
  subtitle: string;
  description: string;
  cover: string;
  goals: string[];
  modules: CatalogModule[];
  files: CatalogFile[];
  coaching: Coaching | null;
  createdAt: string;
  /** Ventes payées */
  sales: number;
  /** Chiffre d'affaires encaissé (ventes payées) */
  revenue: number;
  seller: ProductSeller;
}

export const productUrl = (p: Pick<CatalogProduct, "slug" | "type">) =>
  p.type === "Formation" ? `/formations/${p.slug}` : `/produits/${p.slug}`;

export const checkoutUrl = (p: Pick<CatalogProduct, "slug">) => `/checkout?produit=${p.slug}`;

export const lessonCount = (p: Pick<CatalogProduct, "modules">) => p.modules.reduce((n, m) => n + m.lessons.length, 0);

export const slugify = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Ce qui est inclus dans l'achat, déduit du contenu réel du produit */
export function includesOf(p: Pick<CatalogProduct, "type" | "modules" | "files" | "coaching">): string[] {
  if (p.type === "Formation") {
    const lessons = lessonCount(p);
    const videos = p.modules.reduce((n, m) => n + m.lessons.filter((l) => l.kind === "Vidéo").length, 0);
    return [
      `${p.modules.length} module${p.modules.length > 1 ? "s" : ""} · ${lessons} leçon${lessons > 1 ? "s" : ""}`,
      ...(videos ? [`${videos} leçon${videos > 1 ? "s" : ""} en vidéo`] : []),
      "Accès à vie, sur téléphone et ordinateur",
    ];
  }
  if (p.type === "Produit numérique") {
    return [`${p.files.length} fichier${p.files.length > 1 ? "s" : ""} à télécharger`, "Accès immédiat après le paiement"];
  }
  return p.coaching ? [`Séance de ${p.coaching.duration}`, p.coaching.format] : [];
}

export const isLink = (s: string) => /^https?:\/\/\S+\.\S+/.test(s.trim());
