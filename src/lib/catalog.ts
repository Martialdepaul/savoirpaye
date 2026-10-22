// Catalogue central des produits du vendeur (données de démonstration).
// Partagé par le tableau de bord, l'éditeur, les pages de vente, la boutique et le paiement.
import { COVER as WHATSAPP_COVER, course as whatsapp, curriculum as whatsappCurriculum, goals as whatsappGoals, includes as whatsappIncludes, reviews as whatsappReviews, type Review } from "./sales-data";

export type ProductType = "Formation" | "Produit numérique" | "Coaching";
export type ProductStatus = "En ligne" | "Brouillon" | "Archivé";

export type CatalogLesson = { title: string; duration: string; preview: boolean };
export type CatalogModule = { title: string; lessons: CatalogLesson[]; quiz?: string };
export type CatalogFile = { name: string; size: string };

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  type: ProductType;
  price: number;
  comparePrice?: number;
  sales: number;
  revenue: number;
  status: ProductStatus;
  createdAt: string;
  subtitle: string;
  description: string;
  cover: string;
  goals: string[];
  includes: string[];
  modules?: CatalogModule[];
  files?: CatalogFile[];
  coaching?: { duration: string; format: string };
  rating: number;
  reviewsCount: number;
  reviews?: Review[];
  students: number;
  duration?: string;
}

export const seller = {
  slug: "aminata-diallo",
  name: "Aminata Diallo",
  initials: "AD",
  role: "Formatrice à Dakar",
  bio: "J'aide les commerçants et indépendants d'Afrique de l'Ouest à vendre en ligne : WhatsApp, e-commerce, gestion et outils bureautiques. Plus de 2 000 élèves formés depuis 2021.",
  city: "Dakar, Sénégal",
  whatsapp: "+221 77 123 45 67",
};

const img = (id: string) => `https://images.unsplash.com/${id}?w=1400&h=800&fit=crop&auto=format`;

const mod = (title: string, lessons: [string, string][], quiz?: string, previewFirst = false): CatalogModule => ({
  title,
  lessons: lessons.map(([t, d], i) => ({ title: t, duration: d, preview: previewFirst && i === 0 })),
  quiz,
});

export const catalog: CatalogProduct[] = [
  {
    id: "P001",
    slug: "maitriser-excel-7-jours",
    name: "Maîtriser Excel en 7 jours",
    type: "Formation",
    price: 25000,
    comparePrice: 35000,
    sales: 34,
    revenue: 850000,
    status: "En ligne",
    createdAt: "3 mars 2026",
    subtitle: "Tableaux, formules et graphiques : devenez autonome sur Excel en une semaine, avec des exercices tirés du quotidien.",
    description: "Une formation progressive, une leçon par jour, pour passer de débutant à utilisateur confiant d'Excel.",
    cover: img("photo-1551288049-bebda4e38f71"),
    goals: [
      "Créer des tableaux propres et faciles à lire",
      "Utiliser les formules essentielles (SOMME, SI, RECHERCHEV)",
      "Construire des graphiques clairs pour vos rapports",
      "Suivre un budget ou un stock sans erreur",
    ],
    includes: ["7 modules et 21 leçons vidéo", "Fichiers d'exercices à télécharger", "Accès à vie", "Certificat de réussite"],
    modules: [
      mod("Jour 1 : prendre en main Excel", [["L'interface en 10 minutes", "10 min"], ["Saisir et mettre en forme", "12 min"], ["Enregistrer et partager", "6 min"]], "Quiz : les bases", true),
      mod("Jour 2 : les formules de base", [["Additionner, moyenne, min, max", "11 min"], ["Références relatives et absolues", "9 min"], ["Exercice : facture automatique", "14 min"]], "Quiz : formules"),
      mod("Jour 3 : la fonction SI", [["Comprendre la logique SI", "10 min"], ["SI imbriqués", "12 min"], ["Exercice : suivi des paiements", "13 min"]], "Quiz : conditions", true),
      mod("Jour 4 : rechercher des données", [["RECHERCHEV pas à pas", "14 min"], ["RECHERCHEX, la version moderne", "9 min"], ["Exercice : catalogue de prix", "12 min"]], "Quiz : recherches"),
      mod("Jour 5 : trier et filtrer", [["Tris simples et multiples", "7 min"], ["Filtres automatiques", "8 min"], ["Mise en forme conditionnelle", "10 min"]], "Quiz : tri et filtres"),
      mod("Jour 6 : les graphiques", [["Choisir le bon graphique", "8 min"], ["Créer votre premier graphique", "10 min"], ["Tableau de bord simple", "15 min"]], "Quiz : graphiques"),
      mod("Jour 7 : projet final", [["Budget mensuel complet", "18 min"], ["Gestion de stock", "16 min"], ["Conseils pour aller plus loin", "6 min"]], "Quiz final"),
    ],
    rating: 4.7,
    reviewsCount: 128,
    students: 534,
    duration: "4 h 30",
  },
  {
    id: "P002",
    slug: "lancer-ecommerce-afrique",
    name: "Lancer son e-commerce en Afrique",
    type: "Formation",
    price: 35000,
    sales: 22,
    revenue: 770000,
    status: "En ligne",
    createdAt: "12 jan. 2026",
    subtitle: "De l'idée à la première vente : boutique en ligne, paiement Mobile Money, livraison et marketing sur les réseaux sociaux.",
    description: "Tout le parcours pour ouvrir une boutique en ligne rentable, adaptée aux réalités africaines.",
    cover: img("photo-1556742049-0cfed4f6a45d"),
    goals: [
      "Choisir un produit et une niche rentables",
      "Ouvrir une boutique en ligne sans coder",
      "Encaisser par Wave, Orange Money et carte",
      "Organiser la livraison et le paiement à la livraison",
      "Attirer vos premiers clients avec Facebook et TikTok",
    ],
    includes: ["5 modules et 15 leçons vidéo", "Modèles de fiches produit", "Accès à vie", "Certificat de réussite"],
    modules: [
      mod("Trouver son produit", [["Les niches qui marchent en 2026", "12 min"], ["Valider une idée en 48 h", "10 min"], ["Trouver des fournisseurs fiables", "14 min"]], "Quiz : choisir son produit", true),
      mod("Créer sa boutique", [["Choisir sa plateforme", "9 min"], ["Rédiger des fiches produit qui vendent", "13 min"], ["Photos produit avec un téléphone", "11 min"]], "Quiz : boutique"),
      mod("Encaisser les paiements", [["Mobile Money : Wave, Orange, MTN", "10 min"], ["Paiement à la livraison sans pertes", "9 min"], ["Éviter la fraude", "8 min"]], "Quiz : paiements"),
      mod("Livrer ses clients", [["Livreurs et coursiers", "8 min"], ["Calculer ses frais de livraison", "7 min"], ["Gérer les retours", "6 min"]], "Quiz : livraison"),
      mod("Vendre sur les réseaux sociaux", [["Publicités Facebook à petit budget", "15 min"], ["TikTok pour les commerçants", "12 min"], ["Fidéliser avec WhatsApp", "9 min"]], "Quiz final"),
    ],
    rating: 4.8,
    reviewsCount: 87,
    students: 391,
    duration: "3 h 50",
  },
  {
    id: "P003",
    slug: "pack-50-modeles-factures",
    name: "Pack de 50 modèles de factures",
    type: "Produit numérique",
    price: 5000,
    sales: 61,
    revenue: 305000,
    status: "En ligne",
    createdAt: "5 fév. 2026",
    subtitle: "50 factures, devis et reçus prêts à l'emploi, au format Word, Excel et PDF, adaptés à la zone FCFA.",
    description: "Gagnez du temps et donnez une image professionnelle à votre activité avec des modèles modifiables.",
    cover: img("photo-1554224155-6726b3ff858f"),
    goals: [
      "Facturer vos clients en moins de 2 minutes",
      "Calculs automatiques de TVA et de totaux (Excel)",
      "Mentions adaptées à l'espace OHADA",
      "Modèles pour commerçants, freelances et artisans",
    ],
    includes: ["50 modèles modifiables", "Formats Word, Excel et PDF", "Mises à jour gratuites", "Téléchargement immédiat"],
    files: [
      { name: "Factures-Word.zip", size: "4,2 Mo" },
      { name: "Factures-Excel.zip", size: "3,1 Mo" },
      { name: "Factures-PDF.zip", size: "6,8 Mo" },
    ],
    rating: 4.9,
    reviewsCount: 54,
    students: 612,
  },
  {
    id: "P004",
    slug: "comptabilite-freelances",
    name: "Comptabilité simple pour freelances",
    type: "Formation",
    price: 15000,
    sales: 15,
    revenue: 225000,
    status: "En ligne",
    createdAt: "20 jan. 2026",
    subtitle: "Suivez vos revenus, vos dépenses et vos impôts sans être comptable, avec un tableau prêt à l'emploi.",
    description: "Les bases de la comptabilité pour indépendants, expliquées simplement.",
    cover: img("photo-1554224154-26032ffc0d07"),
    goals: [
      "Séparer argent personnel et professionnel",
      "Tenir un livre de recettes et de dépenses",
      "Fixer vos prix pour rester rentable",
      "Préparer votre déclaration fiscale",
    ],
    includes: ["4 modules et 12 leçons vidéo", "Tableau de suivi Excel offert", "Accès à vie", "Certificat de réussite"],
    modules: [
      mod("Les bases", [["Pourquoi tenir ses comptes", "6 min"], ["Compte pro et compte perso", "8 min"], ["Les documents à garder", "7 min"]], "Quiz : les bases", true),
      mod("Suivre son argent", [["Le livre de recettes", "10 min"], ["Classer ses dépenses", "9 min"], ["Le bilan du mois", "11 min"]], "Quiz : suivi"),
      mod("Fixer ses prix", [["Calculer son coût de revient", "12 min"], ["Taux horaire ou forfait", "9 min"], ["Négocier sans brader", "8 min"]], "Quiz : prix"),
      mod("Impôts et déclarations", [["Les statuts possibles", "10 min"], ["Ce que vous devez déclarer", "9 min"], ["Calendrier fiscal", "6 min"]], "Quiz final"),
    ],
    rating: 4.6,
    reviewsCount: 41,
    students: 187,
    duration: "2 h 10",
  },
  {
    id: "P005",
    slug: "vendre-sur-whatsapp-business",
    name: whatsapp.title,
    type: "Formation",
    price: 25000,
    sales: 8,
    revenue: 200000,
    status: "En ligne",
    createdAt: "1 avr. 2026",
    subtitle: whatsapp.subtitle,
    description: "La méthode complète pour transformer WhatsApp Business en véritable boutique.",
    cover: WHATSAPP_COVER,
    goals: whatsappGoals,
    includes: whatsappIncludes,
    modules: whatsappCurriculum,
    rating: whatsapp.rating,
    reviewsCount: whatsapp.reviewsCount,
    reviews: whatsappReviews,
    students: whatsapp.students,
    duration: whatsapp.duration,
  },
  {
    id: "P006",
    slug: "modeles-contrats-freelance",
    name: "Modèles de contrats freelance",
    type: "Produit numérique",
    price: 8000,
    sales: 0,
    revenue: 0,
    status: "Brouillon",
    createdAt: "10 oct. 2026",
    subtitle: "Contrats de prestation, conditions générales et accords de confidentialité, prêts à adapter.",
    description: "Protégez-vous avant chaque mission avec des contrats clairs.",
    cover: img("photo-1450101499163-c8848c66ca85"),
    goals: ["Sécuriser vos missions", "Être payé à temps grâce à des clauses claires", "Gagner en crédibilité"],
    includes: ["12 modèles Word", "Guide d'utilisation PDF", "Téléchargement immédiat"],
    files: [{ name: "Contrats-freelance.zip", size: "1,8 Mo" }],
    rating: 0,
    reviewsCount: 0,
    students: 0,
  },
  {
    id: "P007",
    slug: "coaching-strategie-digitale",
    name: "Coaching 1h — Stratégie digitale",
    type: "Coaching",
    price: 50000,
    sales: 3,
    revenue: 150000,
    status: "Archivé",
    createdAt: "15 juil. 2026",
    subtitle: "Une heure en visio pour analyser votre activité et repartir avec un plan d'action concret.",
    description: "Un accompagnement personnalisé pour débloquer votre présence en ligne.",
    cover: img("photo-1522202176988-66273c2fd55f"),
    goals: ["Audit de votre présence en ligne", "Plan d'action sur 30 jours", "Réponses à toutes vos questions"],
    includes: ["1 h de visio en direct", "Compte rendu écrit", "Suivi par WhatsApp pendant 7 jours"],
    coaching: { duration: "60 min", format: "Visio (Google Meet ou WhatsApp)" },
    rating: 5,
    reviewsCount: 3,
    students: 3,
  },
];

export const findProduct = (slug: string) => catalog.find((p) => p.slug === slug);
export const findProductById = (id: string) => catalog.find((p) => p.id === id);

/** URL publique de la page de vente d'un produit */
export const productUrl = (p: Pick<CatalogProduct, "slug" | "type">) =>
  p.type === "Formation" ? `/formations/${p.slug}` : `/produits/${p.slug}`;

export const checkoutUrl = (p: Pick<CatalogProduct, "slug">) => `/checkout?produit=${p.slug}`;

export const lessonCount = (p: CatalogProduct) => (p.modules ?? []).reduce((n, m) => n + m.lessons.length, 0);

/** Transforme un titre en identifiant d'URL : « Maîtriser Excel » → « maitriser-excel » */
export const slugify = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
