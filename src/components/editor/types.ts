import { isLink, type CatalogFile, type CatalogLesson, type CatalogModule, type CatalogProduct, type ProductStatus, type ProductType } from "../../lib/catalog";

export type EditorLesson = CatalogLesson;
export type EditorModule = CatalogModule;
export type EditorFile = CatalogFile;

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

export const emptyLesson = (): EditorLesson => ({ id: uid("l"), title: "", duration: "", kind: "Vidéo", preview: false, url: "", content: "" });
export const emptyModule = (): EditorModule => ({ id: uid("m"), title: "", lessons: [emptyLesson()] });
export const emptyFile = (): EditorFile => ({ id: uid("f"), name: "", url: "" });

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
    goals: p.goals.length ? [...p.goals] : ["", "", ""],
    modules: p.modules,
    files: p.files,
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
    modules: type === "Formation" ? [{ id: uid("m"), title: "", lessons: [{ ...emptyLesson(), preview: true }] }] : [],
    files: type === "Produit numérique" ? [emptyFile()] : [],
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

  const lessons = d.modules.flatMap((m) => m.lessons).filter((l) => l.title.trim());
  const badLink = lessons.find((l) => l.kind === "Vidéo" && l.url.trim() && !isLink(l.url));
  if (badLink) e.content = `Le lien de la vidéo « ${badLink.title} » doit commencer par https://`;
  const files = d.files.filter((f) => f.name.trim() || f.url.trim());
  const badFile = files.find((f) => !f.name.trim() || !isLink(f.url));
  if (badFile) e.content = badFile.name.trim() ? `Le lien du fichier « ${badFile.name} » doit commencer par https://` : "Donnez un nom à chaque fichier.";

  if (d.status === "En ligne" && !e.content) {
    if (d.type === "Formation") {
      const empty = lessons.find((l) => (l.kind === "Vidéo" ? !l.url.trim() : !l.content.trim()));
      if (!lessons.length) e.content = "Ajoutez au moins une leçon avant de publier.";
      else if (empty) e.content = `Ajoutez le contenu de la leçon « ${empty.title} » (${empty.kind === "Vidéo" ? "lien de la vidéo" : "texte"}) avant de publier.`;
    }
    if (d.type === "Produit numérique" && files.length === 0) e.content = "Ajoutez au moins un fichier avant de publier.";
  }
  if (d.status === "En ligne" && d.goals.filter((g) => g.trim()).length === 0) e.goals = "Ajoutez au moins un point clé avant de publier.";
  return e;
}

/** Réduit une image (côté navigateur) pour la stocker avec le produit : 1400 px de large, JPEG */
export async function compressImage(file: File, maxWidth = 1400, quality = 0.8): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error("image"));
      i.src = url;
    });
    const scale = Math.min(1, maxWidth / img.width);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
    let q = quality;
    let data = canvas.toDataURL("image/jpeg", q);
    while (data.length > 600_000 && q > 0.4) data = canvas.toDataURL("image/jpeg", (q -= 0.1));
    return data;
  } finally {
    URL.revokeObjectURL(url);
  }
}
