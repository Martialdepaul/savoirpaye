export type ItemKind = "module" | "lesson" | "quiz";
export type CourseItem = {
  id: string;
  kind: ItemKind;
  moduleId: string;
  title: string;
  alt: string;
  meta: string;
  summary: string;
};

export const courseTitle = "Vendre sur WhatsApp Business";

export const ideaExamples = [
  "Vendre sur WhatsApp Business",
  "Comptabilité simple pour freelances",
  "Tontine digitale : bien gérer son groupe",
  "Photographier ses produits avec un téléphone",
];

export const levels = ["Débutant", "Intermédiaire", "Avancé"] as const;
export const languages = ["Français", "Anglais", "Portugais"];
export const durations = ["2 heures", "4 heures", "6 heures", "10 heures"];
export const styles = ["Pratique, avec exercices", "Théorique et structuré", "Études de cas africains", "Mixte"];

type Mod = { title: string; alt: string; summary: string; lessons: [string, string, string][]; quiz: [string, string] };

const mods: Mod[] = [
  {
    title: "Configurer son compte WhatsApp Business",
    alt: "Mettre en place sa vitrine WhatsApp Business",
    summary: "Passer d'un compte personnel à une vitrine professionnelle crédible.",
    lessons: [
      ["Créer et vérifier son profil professionnel", "Ouvrir son profil pro étape par étape", "8 min"],
      ["Rédiger une description qui rassure", "Écrire une présentation claire de son activité", "6 min"],
      ["Régler ses horaires et son message d'accueil", "Définir ses horaires d'ouverture et ses réponses d'accueil", "7 min"],
    ],
    quiz: ["Quiz : les bases du profil pro", "5 questions"],
  },
  {
    title: "Attirer ses premiers clients",
    alt: "Trouver ses 20 premiers clients",
    summary: "Utiliser ses contacts, les statuts et les groupes pour se faire connaître.",
    lessons: [
      ["Transformer ses contacts en clients potentiels", "Activer son réseau existant sans paraître insistant", "9 min"],
      ["Publier des statuts qui donnent envie d'acheter", "Créer des statuts visuels qui déclenchent des messages", "10 min"],
    ],
    quiz: ["Quiz : trouver des clients", "4 questions"],
  },
  {
    title: "Présenter ses produits avec le catalogue",
    alt: "Construire un catalogue qui vend",
    summary: "Photographier, décrire et fixer le prix de ses produits en FCFA.",
    lessons: [
      ["Prendre des photos de produits avec son téléphone", "Faire de belles photos sans matériel coûteux", "8 min"],
      ["Rédiger des fiches produit claires", "Décrire un produit avec prix, tailles et délais", "7 min"],
      ["Organiser son catalogue par collections", "Classer ses articles pour faciliter le choix", "6 min"],
    ],
    quiz: ["Quiz : le catalogue", "5 questions"],
  },
  {
    title: "Conclure la vente et encaisser par Mobile Money",
    alt: "De la discussion au paiement Wave ou Orange Money",
    summary: "Répondre aux objections et sécuriser chaque paiement.",
    lessons: [
      ["Répondre aux objections sur le prix", "Gérer « c'est trop cher » avec assurance", "9 min"],
      ["Envoyer un lien de paiement Wave ou Orange Money", "Faire payer simplement, sans quitter la conversation", "8 min"],
      ["Confirmer la commande et organiser la livraison", "Rassurer le client jusqu'à la réception", "7 min"],
    ],
    quiz: ["Quiz : encaisser en sécurité", "6 questions"],
  },
  {
    title: "Automatiser avec les réponses rapides",
    alt: "Gagner du temps grâce aux automatisations",
    summary: "Répondre vite, sans répéter les mêmes messages toute la journée.",
    lessons: [
      ["Créer ses réponses rapides", "Enregistrer ses 10 messages les plus utiles", "7 min"],
      ["Classer ses clients avec les étiquettes", "Suivre les prospects, commandes et clients fidèles", "6 min"],
    ],
    quiz: ["Quiz : les automatisations", "4 questions"],
  },
  {
    title: "Fidéliser et développer son activité",
    alt: "Faire revenir ses clients et grandir",
    summary: "Bâtir une relation durable et mesurer ses résultats.",
    lessons: [
      ["Relancer sans déranger", "Écrire des relances polies qui obtiennent une réponse", "7 min"],
      ["Utiliser les listes de diffusion", "Informer ses clients des nouveautés et promotions", "8 min"],
      ["Suivre ses ventes et fixer des objectifs", "Mesurer son chiffre d'affaires chaque semaine", "9 min"],
    ],
    quiz: ["Quiz final : développer son activité", "8 questions"],
  },
];

export function buildCourse(moduleCount: number): CourseItem[] {
  const out: CourseItem[] = [];
  mods.slice(0, moduleCount).forEach((m, mi) => {
    const mid = `m${mi}`;
    out.push({ id: mid, kind: "module", moduleId: mid, title: m.title, alt: m.alt, meta: `Module ${mi + 1}`, summary: m.summary });
    m.lessons.forEach((l, li) =>
      out.push({ id: `${mid}l${li}`, kind: "lesson", moduleId: mid, title: l[0], alt: l[1], meta: `Leçon · ${l[2]}`, summary: "" }),
    );
    out.push({ id: `${mid}q`, kind: "quiz", moduleId: mid, title: m.quiz[0], alt: `${m.quiz[0]} (version avancée)`, meta: m.quiz[1], summary: "" });
  });
  return out;
}
