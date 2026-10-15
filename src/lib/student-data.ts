export type LessonType = "video" | "text" | "quiz";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number; // index
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration?: string; // e.g. "8 min"
  completed: boolean;
  videoUrl?: string; // placeholder
  content?: string; // markdown-ish text
  quiz?: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Formation {
  slug: string;
  title: string;
  instructor: string;
  cover: string; // color for placeholder
  progress: number; // 0-100
  totalLessons: number;
  completedLessons: number;
  modules: Module[];
}

export const formations: Formation[] = [
  {
    slug: "maitriser-excel-7-jours",
    title: "Maîtriser Excel en 7 jours",
    instructor: "Aminata Diallo",
    cover: "#0b5d55",
    progress: 65,
    totalLessons: 20,
    completedLessons: 13,
    modules: [
      {
        id: "m1",
        title: "Module 1 — Les bases d'Excel",
        lessons: [
          { id: "l1", title: "Introduction et interface", type: "video", duration: "6 min", completed: true, videoUrl: "#" },
          { id: "l2", title: "Saisir et formater des données", type: "video", duration: "9 min", completed: true, videoUrl: "#" },
          { id: "l3", title: "Les formules essentielles", type: "text", completed: true, content: "## Les formules essentielles\n\nExcel dispose de centaines de formules. Voici les plus utiles pour démarrer :\n\n**SOMME** — additionne une plage de cellules.\n```\n=SOMME(A1:A10)\n```\n\n**MOYENNE** — calcule la moyenne.\n```\n=MOYENNE(B2:B20)\n```\n\n**SI** — effectue un test logique.\n```\n=SI(C1>100;\"Bon\";\"Faible\")\n```\n\nMaîtrisez ces trois formules et vous serez déjà plus efficace que 80 % des utilisateurs." },
          {
            id: "l4", title: "Quiz — Les bases", type: "quiz", completed: true, quiz: [
              { id: "q1", question: "Quelle formule permet de calculer la somme d'une plage ?", options: ["=TOTAL(A1:A10)", "=SOMME(A1:A10)", "=AJOUTER(A1:A10)", "=PLUS(A1:A10)"], correct: 1, explanation: "La fonction =SOMME() est la formule de base pour additionner une plage de cellules dans Excel." },
              { id: "q2", question: "Comment fixer une cellule dans une formule ?", options: ["En ajoutant ** autour", "En utilisant le signe $", "En appuyant sur F4 puis Entrée", "En mettant la cellule en gras"], correct: 1, explanation: "Le symbole $ devant la lettre et/ou le chiffre ($A$1) fixe la référence absolue. F4 permet de basculer entre les types de références." },
            ]
          },
        ],
      },
      {
        id: "m2",
        title: "Module 2 — Tableaux et graphiques",
        lessons: [
          { id: "l5", title: "Créer un tableau structuré", type: "video", duration: "11 min", completed: true, videoUrl: "#" },
          { id: "l6", title: "Trier et filtrer les données", type: "video", duration: "8 min", completed: true, videoUrl: "#" },
          { id: "l7", title: "Créer votre premier graphique", type: "video", duration: "10 min", completed: false, videoUrl: "#" },
          { id: "l8", title: "Personnaliser un graphique", type: "text", completed: false, content: "## Personnaliser un graphique\n\nUne fois votre graphique créé, double-cliquez dessus pour accéder aux options de mise en forme.\n\n**Titre** — cliquez sur « Titre du graphique » pour le modifier directement.\n\n**Couleurs** — onglet Création > Modifier les couleurs.\n\n**Type** — cliquez droit > Modifier le type de graphique pour passer de Barres à Courbes, etc.\n\nUn graphique bien présenté vaut mille tableaux de chiffres." },
        ],
      },
      {
        id: "m3",
        title: "Module 3 — Fonctions avancées",
        lessons: [
          { id: "l9", title: "RECHERCHEV et RECHERCHEX", type: "video", duration: "14 min", completed: false, videoUrl: "#" },
          { id: "l10", title: "Tableaux croisés dynamiques", type: "video", duration: "16 min", completed: false, videoUrl: "#" },
          {
            id: "l11", title: "Quiz — Fonctions avancées", type: "quiz", completed: false, quiz: [
              { id: "q3", question: "À quoi sert la fonction RECHERCHEV ?", options: ["Rechercher une valeur dans une colonne verticale", "Calculer la TVA automatiquement", "Créer un tableau croisé", "Protéger une feuille"], correct: 0, explanation: "RECHERCHEV (Vertical) cherche une valeur dans la première colonne d'un tableau et renvoie une valeur depuis la même ligne dans une autre colonne." },
            ]
          },
        ],
      },
    ],
  },
  {
    slug: "lancer-ecommerce-afrique",
    title: "Lancer son e-commerce en Afrique",
    instructor: "Aminata Diallo",
    cover: "#5b4bd6",
    progress: 20,
    totalLessons: 15,
    completedLessons: 3,
    modules: [
      {
        id: "m1",
        title: "Module 1 — Comprendre le marché",
        lessons: [
          { id: "l1", title: "Le e-commerce en Afrique en 2026", type: "video", duration: "12 min", completed: true, videoUrl: "#" },
          { id: "l2", title: "Choisir sa niche", type: "video", duration: "9 min", completed: true, videoUrl: "#" },
          { id: "l3", title: "Analyser la concurrence", type: "text", completed: true, content: "## Analyser la concurrence\n\nAvant de vous lancer, prenez 2 heures pour analyser vos concurrents directs.\n\n**Ce qu'il faut regarder :**\n- Leurs prix\n- Leurs avis clients\n- Leurs canaux de vente (WhatsApp, site, réseaux)\n- Leurs points faibles\n\nVotre avantage concurrentiel naîtra de ce qu'ils font mal." },
        ],
      },
      {
        id: "m2",
        title: "Module 2 — Créer sa boutique",
        lessons: [
          { id: "l4", title: "Choisir sa plateforme", type: "video", duration: "8 min", completed: false, videoUrl: "#" },
          { id: "l5", title: "Configurer les paiements mobiles", type: "video", duration: "11 min", completed: false, videoUrl: "#" },
        ],
      },
    ],
  },
  {
    slug: "comptabilite-freelances",
    title: "Comptabilité simple pour freelances",
    instructor: "Aminata Diallo",
    cover: "#e3a03a",
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    modules: [
      {
        id: "m1",
        title: "Module 1 — Les fondamentaux",
        lessons: [
          { id: "l1", title: "Pourquoi tenir une comptabilité", type: "video", duration: "7 min", completed: false, videoUrl: "#" },
          { id: "l2", title: "Recettes vs dépenses", type: "video", duration: "10 min", completed: false, videoUrl: "#" },
        ],
      },
    ],
  },
];

export function getAllLessons(formation: Formation): { lesson: Lesson; moduleIndex: number; lessonIndex: number }[] {
  const all: { lesson: Lesson; moduleIndex: number; lessonIndex: number }[] = [];
  formation.modules.forEach((mod, mi) => {
    mod.lessons.forEach((lesson, li) => {
      all.push({ lesson, moduleIndex: mi, lessonIndex: li });
    });
  });
  return all;
}
