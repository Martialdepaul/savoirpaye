import { buildCourse } from "./course-data";

export const COURSE_PRICE = 25000;
export const COURSE_URL = "/formations/vendre-sur-whatsapp-business";
export const COVER = "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=1400&h=800&fit=crop&auto=format";

export const course = {
  title: "Vendre sur WhatsApp Business",
  subtitle: "Trouvez vos premiers clients, présentez vos produits et encaissez par Mobile Money, depuis votre téléphone.",
  instructor: { name: "Aminata Diallo", role: "Formatrice à Dakar", initials: "AD" },
  rating: 4.8,
  reviewsCount: 312,
  students: 1247,
  duration: "4 h 20",
  updated: "Octobre 2026",
};

export const goals = [
  "Créer une vitrine WhatsApp Business crédible et professionnelle",
  "Obtenir vos 20 premiers clients grâce à vos contacts et aux statuts",
  "Construire un catalogue de produits qui donne envie d'acheter",
  "Encaisser par Wave ou Orange Money sans quitter la conversation",
  "Gagner du temps avec les réponses rapides et les étiquettes",
  "Fidéliser vos clients et suivre votre chiffre d'affaires",
];

export const includes = ["6 modules et 17 leçons vidéo", "6 quiz pour valider vos acquis", "Accès à vie depuis votre téléphone", "Certificat de réussite", "Garantie satisfait ou remboursé 7 jours"];

export type Lesson = { title: string; duration: string; preview: boolean };
export type Module = { title: string; lessons: Lesson[]; quiz: string };

export const curriculum: Module[] = (() => {
  const items = buildCourse(6);
  return items.filter((i) => i.kind === "module").map((m, mi) => ({
    title: m.title,
    lessons: items
      .filter((i) => i.moduleId === m.moduleId && i.kind === "lesson")
      .map((l, li) => ({ title: l.title, duration: l.meta.replace("Leçon · ", ""), preview: mi < 2 && li === 0 })),
    quiz: items.find((i) => i.moduleId === m.moduleId && i.kind === "quiz")!.title,
  }));
})();

export type Review = { name: string; city: string; rating: number; date: string; text: string };

export const reviews: Review[] = [
  { name: "Fatou Sène", city: "Dakar", rating: 5, date: "Il y a 2 semaines", text: "En deux semaines j'ai doublé mes commandes de pagnes. Le module sur le catalogue m'a tout changé, et les explications sont très simples." },
  { name: "Koffi Yao", city: "Abidjan", rating: 5, date: "Il y a 1 mois", text: "Enfin une formation qui parle de Wave et d'Orange Money. J'envoie mes liens de paiement directement dans la discussion." },
  { name: "Mariam Traoré", city: "Bamako", rating: 4, date: "Il y a 1 mois", text: "Très concret, avec des exercices à faire tout de suite. J'aurais aimé un module de plus sur la livraison." },
  { name: "Ousmane Ba", city: "Thiès", rating: 5, date: "Il y a 2 mois", text: "Aminata explique avec patience. Les réponses rapides me font gagner au moins une heure par jour." },
];
export const ratingBars = [[5, 82], [4, 13], [3, 3], [2, 1], [1, 1]] as const;
