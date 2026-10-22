import { slugify, type CatalogProduct, type ProductStatus, type ProductType } from "../../lib/catalog";

export type EditorLesson = { id: string; title: string; duration: string; kind: "Vidéo" | "Texte"; preview: boolean; file?: string };
export type EditorModule = { id: string; title: string; lessons: EditorLesson[] };
export type EditorFile = { id: string; name: string; size: string };

export type Draft = {
  type: ProductType;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  cover: string;
  price: string;
  comparePrice: string;
  goals: string[];
  modules: EditorModule[];
  files: EditorFile[];
  coachingDuration: string;
  coachingFormat: string;
  status: ProductStatus;
};

let seq = 0;
/** Identifiant unique côté client pour les éléments ajoutés pendant l'édition */
export const uid = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${(seq++).toString(36)}`;

export const formatSize = (bytes: number) =>
  bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} Mo` : `${Math.max(1, Math.round(bytes / 1024))} Ko`;

export const emptyLesson = (): EditorLesson => ({ id: uid("l"), title: "", duration: "", kind: "Vidéo", preview: false });
export const emptyModule = (): EditorModule => ({ id: uid("m"), title: "", lessons: [emptyLesson()] });

export function draftFrom(p: CatalogProduct): Draft {
  return {
    type: p.type,
    name: p.name,
    slug: p.slug,
    subtitle: p.subtitle,
    description: p.description,
    cover: p.cover,
    price: String(p.price),
    comparePrice: p.comparePrice ? String(p.comparePrice) : "",
    goals: [...p.goals],
    modules: (p.modules ?? []).map((m, mi) => ({
      id: `m${mi}`,
      title: m.title,
      lessons: m.lessons.map((l, li) => ({ id: `m${mi}l${li}`, title: l.title, duration: l.duration, kind: "Vidéo", preview: l.preview, file: `${slugify(l.title)}.mp4` })),
    })),
    files: (p.files ?? []).map((f, i) => ({ id: `f${i}`, ...f })),
    coachingDuration: p.coaching?.duration ?? "60 min",
    coachingFormat: p.coaching?.format ?? "Visio (Google Meet ou WhatsApp)",
    status: p.status,
  };
}

export function newDraft(type: ProductType): Draft {
  return {
    type,
    name: "",
    slug: "",
    subtitle: "",
    description: "",
    cover: "",
    price: "",
    comparePrice: "",
    goals: ["", "", ""],
    modules: type === "Formation" ? [{ id: "m0", title: "", lessons: [{ id: "m0l0", title: "", duration: "", kind: "Vidéo", preview: true }] }] : [],
    files: [],
    coachingDuration: "60 min",
    coachingFormat: "Visio (Google Meet ou WhatsApp)",
    status: "Brouillon",
  };
}

export type Errors = Partial<Record<"name" | "slug" | "price" | "comparePrice" | "content" | "goals", string>>;

export function validate(d: Draft): Errors {
  const e: Errors = {};
  const price = Number(d.price);
  if (d.name.trim().length < 5) e.name = "Donnez un titre d'au moins 5 caractères.";
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(d.slug)) e.slug = "Utilisez uniquement des lettres minuscules, des chiffres et des tirets.";
  if (d.price === "" || !Number.isInteger(price) || price < 0) e.price = "Indiquez un prix en FCFA (nombre entier).";
  else if (price > 0 && price < 500) e.price = "Le prix minimum est de 500 FCFA (ou 0 pour un produit gratuit).";
  if (d.comparePrice !== "" && !(Number(d.comparePrice) > price)) e.comparePrice = "Le prix barré doit être supérieur au prix de vente.";
  if (d.status === "En ligne") {
    if (d.type === "Formation" && !d.modules.some((m) => m.lessons.some((l) => l.title.trim()))) e.content = "Ajoutez au moins une leçon avant de publier.";
    if (d.type === "Produit numérique" && d.files.length === 0) e.content = "Ajoutez au moins un fichier avant de publier.";
    if (d.goals.filter((g) => g.trim()).length === 0) e.goals = "Ajoutez au moins un point clé avant de publier.";
  }
  return e;
}
