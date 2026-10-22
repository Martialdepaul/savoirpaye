import {
  BarChart3, BookOpen, Bot, CreditCard, FileText, Gift, Globe, GraduationCap, Heart, LayoutTemplate, Lock, Mail,
  MessageCircle, Palette, Phone, Rocket, ShieldCheck, Smartphone, Sparkles, Tag, Target, Users, Video, Wallet, Zap,
} from "lucide-react";

export const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Fonctionnalités", href: "/fonctionnalites" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Ressources", href: "/ressources" },
  { label: "À propos", href: "/a-propos" },
];

/* ---------- Fonctionnalités ---------- */

export const featureGroups = [
  {
    id: "creer",
    eyebrow: "Créer",
    title: "Créez des contenus qui se vendent",
    text: "Formations vidéo, e-books, templates ou coaching : publiez tout ce que vous savez faire, au même endroit.",
    image: "/images/feature-creer.jpg",
    items: [
      { icon: Video, title: "Cours vidéo et PDF", text: "Organisez vos leçons en modules, ajoutez vidéos, documents et ressources téléchargeables." },
      { icon: GraduationCap, title: "Quiz et certificats", text: "Validez les acquis de vos apprenants et délivrez un certificat à la fin du parcours." },
      { icon: FileText, title: "Produits numériques", text: "Vendez e-books, modèles, logiciels ou packs de fichiers avec livraison automatique." },
      { icon: Sparkles, title: "Assistant IA", text: "Générez un plan de cours, des leçons, des quiz et votre page de vente en quelques minutes." },
    ],
  },
  {
    id: "vendre",
    eyebrow: "Vendre",
    title: "Encaissez comme vos clients aiment payer",
    text: "Mobile Money, carte bancaire, prix en FCFA : vos clients achètent sans friction, depuis leur téléphone.",
    image: "/images/feature-vendre.jpg",
    items: [
      { icon: Smartphone, title: "Mobile Money", text: "Orange Money, Wave, MTN MoMo, Moov Money et Airtel Money, sans intégration technique." },
      { icon: CreditCard, title: "Carte bancaire", text: "Visa et Mastercard acceptées pour vos clients de la diaspora et de l'international." },
      { icon: LayoutTemplate, title: "Pages de vente", text: "Des pages prêtes à convertir, personnalisables à vos couleurs, optimisées pour mobile." },
      { icon: Tag, title: "Codes promo et offres", text: "Créez des réductions, des ventes groupées et des offres limitées dans le temps." },
    ],
  },
  {
    id: "gerer",
    eyebrow: "Gérer",
    title: "Pilotez votre activité en toute sérénité",
    text: "Suivez vos ventes, vos clients et vos revenus en temps réel, et retirez vos gains quand vous le souhaitez.",
    image: "/images/feature-gerer.jpg",
    items: [
      { icon: BarChart3, title: "Statistiques détaillées", text: "Chiffre d'affaires, taux de conversion, produits phares : tout est visible en un coup d'œil." },
      { icon: Users, title: "Gestion des clients", text: "Retrouvez l'historique de chaque client et communiquez avec vos apprenants." },
      { icon: Wallet, title: "Retraits rapides", text: "Retirez vos gains sur votre numéro Mobile Money ou votre compte bancaire en quelques minutes." },
      { icon: ShieldCheck, title: "Sécurité multi-tenant", text: "Chaque boutique est isolée : vos données et celles de vos clients restent protégées." },
    ],
  },
];

/* ---------- Tarifs : comparatif ---------- */

export const comparison: { label: string; values: [string | boolean, string | boolean, string | boolean] }[] = [
  { label: "Produits et formations", values: ["1", "Illimités", "Illimités"] },
  { label: "Commission par vente", values: ["8 %", "3 %", "0 %"] },
  { label: "Paiements Mobile Money et carte", values: [true, true, true] },
  { label: "Page de vente personnalisable", values: [true, true, true] },
  { label: "Créateur IA", values: [false, "20 / mois", "Illimité"] },
  { label: "Codes promo et ventes groupées", values: [false, true, true] },
  { label: "Retraits prioritaires", values: [false, true, true] },
  { label: "Nom de domaine personnalisé", values: [false, false, true] },
  { label: "Membres d'équipe", values: ["1", "1", "Jusqu'à 5"] },
  { label: "Assistance", values: ["E-mail", "E-mail et chat", "WhatsApp dédié"] },
];

/* ---------- Ressources (blog) ---------- */

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  author: { name: string; role: string; photo: string };
  body: { h?: string; p: string }[];
};

const aissata = { name: "Aïssata Traoré", role: "Formatrice en développement personnel", photo: "/images/avatar-aissata.jpg" };
const kevin = { name: "Kevin Mensah", role: "Créateur de contenu YouTube", photo: "/images/avatar-kevin.jpg" };
const moussa = { name: "Moussa Diallo", role: "Coach business", photo: "/images/avatar-moussa.jpg" };

export const categories = ["Tous", "Démarrer", "Marketing", "Paiements", "Témoignages"];

export const articles: Article[] = [
  {
    slug: "creer-sa-premiere-formation-en-ligne",
    title: "Créer sa première formation en ligne en 7 étapes",
    excerpt: "Du choix du sujet à la publication, la méthode simple pour lancer votre premier cours sans vous éparpiller.",
    category: "Démarrer",
    readTime: "6 min",
    date: "14 octobre 2026",
    image: "/images/article-formation.jpg",
    author: aissata,
    body: [
      { p: "Vous maîtrisez un sujet et des personnes vous posent souvent les mêmes questions ? C'est le meilleur signe qu'une formation peut fonctionner. Voici la méthode que nous recommandons aux créateurs qui se lancent." },
      { h: "1. Choisir un problème précis", p: "Une bonne formation résout un problème concret pour un public identifié. « Apprendre Excel » est trop large ; « Faire sa comptabilité de commerçant sur Excel en 7 jours » parle directement à quelqu'un." },
      { h: "2. Valider la demande", p: "Avant d'enregistrer la moindre vidéo, posez la question à votre audience sur WhatsApp ou dans vos statuts. Proposez une prévente à prix réduit : si dix personnes paient, vous avez votre réponse." },
      { h: "3. Construire le plan", p: "Découpez votre sujet en 4 à 6 modules, chacun avec un objectif clair. L'assistant IA de Savoirpay peut vous proposer un premier plan à partir de votre sujet, que vous ajustez ensuite." },
      { h: "4. Enregistrer simplement", p: "Un smartphone récent, un micro-cravate et une pièce calme suffisent. Privilégiez des leçons courtes, de 5 à 10 minutes : elles sont plus faciles à suivre sur mobile." },
      { h: "5. Fixer son prix en FCFA", p: "Comparez avec ce que coûte le problème à votre client. Une formation qui fait gagner 100 000 FCFA par mois peut se vendre 25 000 FCFA sans difficulté." },
      { h: "6. Publier la page de vente", p: "Mettez en avant la transformation promise, le programme détaillé et des témoignages. Activez Mobile Money et carte bancaire pour ne perdre aucune vente." },
      { h: "7. Lancer auprès de votre réseau", p: "Vos premiers clients sont souvent vos contacts. Partagez le lien dans vos statuts, vos groupes et par message privé, puis demandez des avis dès les premières semaines." },
    ],
  },
  {
    slug: "vendre-avec-whatsapp-et-les-statuts",
    title: "Vendre avec WhatsApp : la méthode des statuts",
    excerpt: "Comment transformer vos statuts WhatsApp en vitrine qui génère des ventes chaque semaine.",
    category: "Marketing",
    readTime: "5 min",
    date: "2 octobre 2026",
    image: "/images/article-whatsapp.jpg",
    author: moussa,
    body: [
      { p: "En Afrique de l'Ouest, WhatsApp est souvent le premier canal de vente. Bien utilisés, vos statuts peuvent devenir votre meilleur commercial." },
      { h: "Publier avec régularité", p: "Trois à cinq statuts par jour, répartis entre conseils gratuits, coulisses et offres. La régularité installe la confiance." },
      { h: "Raconter des résultats", p: "Partagez les progrès de vos apprenants (avec leur accord). Un témoignage en capture d'écran vaut mieux qu'un long discours." },
      { h: "Toujours finir par un lien", p: "Chaque statut d'offre doit mener à votre page de vente Savoirpay. Le paiement Mobile Money se fait en deux minutes, sans quitter le téléphone." },
    ],
  },
  {
    slug: "fixer-le-prix-de-sa-formation",
    title: "Comment fixer le bon prix pour sa formation",
    excerpt: "Trop cher, pas assez ? Trois méthodes concrètes pour trouver le prix juste en FCFA.",
    category: "Démarrer",
    readTime: "4 min",
    date: "24 septembre 2026",
    image: "/images/article-prix.jpg",
    author: kevin,
    body: [
      { p: "Le prix est l'une des décisions les plus stressantes pour un créateur. Pourtant, quelques repères simples suffisent." },
      { h: "Partir de la valeur", p: "Demandez-vous combien votre formation fait gagner ou économiser à votre client. Votre prix peut représenter 10 à 30 % de cette valeur." },
      { h: "Tester par paliers", p: "Lancez à un prix d'ouverture, puis augmentez à chaque nouvelle session. Vous mesurez ainsi la sensibilité de votre audience." },
      { h: "Proposer plusieurs formules", p: "Une version essentielle et une version avec accompagnement permettent de toucher des budgets différents." },
    ],
  },
  {
    slug: "mobile-money-guide-createurs",
    title: "Mobile Money : le guide complet pour les créateurs",
    excerpt: "Orange Money, Wave, MTN MoMo : comment fonctionnent les paiements et les retraits sur Savoirpay.",
    category: "Paiements",
    readTime: "7 min",
    date: "10 septembre 2026",
    image: "/images/article-mobile-money.jpg",
    author: moussa,
    body: [
      { p: "Le Mobile Money est le moyen de paiement préféré de vos clients. Savoirpay l'intègre nativement pour que vous n'ayez rien à configurer." },
      { h: "Comment paie votre client", p: "Il choisit son opérateur, saisit son numéro, puis valide le paiement sur son téléphone. La commande est confirmée en quelques secondes." },
      { h: "Quand l'argent arrive", p: "Les ventes apparaissent immédiatement dans votre tableau de bord. Après une courte période de validation, elles passent dans votre solde disponible." },
      { h: "Retirer vos gains", p: "Depuis votre portefeuille, choisissez « Retirer », votre opérateur et le montant. Les retraits Mobile Money sont généralement crédités en quelques minutes." },
    ],
  },
  {
    slug: "de-coiffeuse-a-formatrice",
    title: "De coiffeuse à formatrice : l'histoire de Fatou",
    excerpt: "Comment Fatou a vendu plus de 400 formations en tressage depuis Abidjan.",
    category: "Témoignages",
    readTime: "5 min",
    date: "28 août 2026",
    image: "/images/article-temoignage.jpg",
    author: aissata,
    body: [
      { p: "Fatou tient un salon à Abidjan depuis dix ans. Ses clientes lui demandaient souvent de leur apprendre ses techniques de tressage." },
      { h: "Un premier cours filmé au téléphone", p: "Elle a enregistré six leçons avec son smartphone, un soir après la fermeture. La première semaine, 23 personnes ont acheté." },
      { h: "Un revenu complémentaire stable", p: "Aujourd'hui, sa formation lui rapporte chaque mois l'équivalent de deux semaines de salon, sans travail supplémentaire." },
    ],
  },
  {
    slug: "utiliser-l-ia-pour-creer-ses-cours",
    title: "Utiliser l'IA pour créer ses cours plus vite",
    excerpt: "Plan, leçons, quiz, page de vente : ce que l'assistant IA peut faire pour vous, et ce qu'il faut garder pour vous.",
    category: "Marketing",
    readTime: "6 min",
    date: "15 août 2026",
    image: "/images/article-ia.jpg",
    author: kevin,
    body: [
      { p: "L'IA ne remplace pas votre expertise, mais elle vous fait gagner des heures sur la structuration et la rédaction." },
      { h: "Ce que l'IA fait bien", p: "Proposer un plan logique, reformuler, générer des questions de quiz et rédiger un premier jet de page de vente." },
      { h: "Ce qui reste à vous", p: "Vos exemples, vos anecdotes et votre façon d'expliquer. C'est ce qui fait que vos apprenants vous choisissent." },
    ],
  },
];

/* ---------- À propos ---------- */

export const aboutStats = [
  { value: "12 000+", label: "Créateurs actifs" },
  { value: "350 000+", label: "Apprenants" },
  { value: "14", label: "Pays couverts" },
  { value: "2,4 Mds", label: "FCFA reversés aux créateurs" },
];

export const values = [
  { icon: Target, title: "Accessible", text: "Une plateforme pensée pour le mobile, les paiements locaux et les connexions limitées." },
  { icon: Heart, title: "Au service des créateurs", text: "Nous gagnons de l'argent seulement quand vous en gagnez. Vos intérêts sont les nôtres." },
  { icon: Lock, title: "Digne de confiance", text: "Paiements sécurisés, données isolées par boutique et retraits transparents." },
  { icon: Rocket, title: "Ambitieux", text: "Faire du savoir africain une économie à part entière, visible dans le monde entier." },
];

export const team = [
  { name: "Aminata Diallo", role: "Co-fondatrice et CEO", photo: "/images/team-1.jpg" },
  { name: "Kevin Mensah", role: "Co-fondateur et CTO", photo: "/images/avatar-kevin.jpg" },
  { name: "Aïssata Traoré", role: "Responsable Créateurs", photo: "/images/avatar-aissata.jpg" },
  { name: "Moussa Diallo", role: "Responsable Paiements", photo: "/images/avatar-moussa.jpg" },
];

/* ---------- Contact ---------- */

export const contactChannels = [
  { icon: MessageCircle, title: "WhatsApp", value: "+221 77 000 00 00", text: "Réponse en moins de 2 h, du lundi au samedi." },
  { icon: Mail, title: "E-mail", value: "bonjour@savoirpay.com", text: "Pour toute question, partenariat ou presse." },
  { icon: Phone, title: "Téléphone", value: "+225 07 00 00 00 00", text: "De 9 h à 18 h (GMT), du lundi au vendredi." },
];

export const offices = ["Dakar, Sénégal", "Abidjan, Côte d'Ivoire", "Cotonou, Bénin"];

/* ---------- Pages légales ---------- */

export const legalPages: Record<string, { title: string; updated: string; sections: { h: string; p: string }[] }> = {
  conditions: {
    title: "Conditions générales d'utilisation",
    updated: "1er octobre 2026",
    sections: [
      { h: "1. Objet", p: "Les présentes conditions encadrent l'utilisation de la plateforme Savoirpay, qui permet aux créateurs de vendre des formations, produits numériques et services en ligne." },
      { h: "2. Création de compte", p: "L'inscription est gratuite. Vous vous engagez à fournir des informations exactes et à garder vos identifiants confidentiels." },
      { h: "3. Contenus des créateurs", p: "Chaque créateur reste propriétaire de ses contenus et garantit disposer des droits nécessaires à leur commercialisation." },
      { h: "4. Paiements et commissions", p: "Savoirpay encaisse les paiements pour le compte des créateurs et prélève la commission prévue par la formule choisie avant de reverser le solde." },
      { h: "5. Remboursements", p: "Les apprenants peuvent demander un remboursement dans les 7 jours suivant l'achat d'une formation, selon les conditions affichées sur la page de vente." },
      { h: "6. Résiliation", p: "Vous pouvez fermer votre compte à tout moment depuis vos paramètres. Les soldes disponibles restent retirables pendant 90 jours." },
    ],
  },
  confidentialite: {
    title: "Politique de confidentialité",
    updated: "1er octobre 2026",
    sections: [
      { h: "Données collectées", p: "Nous collectons les informations nécessaires à votre compte (nom, e-mail, téléphone), à vos ventes et à vos retraits." },
      { h: "Utilisation", p: "Ces données servent à fournir le service, traiter les paiements, prévenir la fraude et vous informer des évolutions de la plateforme." },
      { h: "Isolation des données", p: "Chaque boutique dispose d'un espace isolé : un créateur n'a jamais accès aux données des clients d'un autre créateur." },
      { h: "Vos droits", p: "Vous pouvez accéder à vos données, les corriger ou demander leur suppression en écrivant à confidentialite@savoirpay.com." },
    ],
  },
  "mentions-legales": {
    title: "Mentions légales",
    updated: "1er octobre 2026",
    sections: [
      { h: "Éditeur", p: "Savoirpay SAS, société au capital de 10 000 000 FCFA, siège social à Dakar, Sénégal." },
      { h: "Directrice de la publication", p: "Aminata Diallo, en qualité de présidente." },
      { h: "Hébergement", p: "Le site est hébergé sur une infrastructure cloud sécurisée, avec des sauvegardes quotidiennes." },
      { h: "Contact", p: "bonjour@savoirpay.com" },
    ],
  },
};

/* ---------- Boutique publique (multi-tenant) ---------- */

export const stores: Record<string, {
  name: string; tagline: string; bio: string; photo: string; cover: string; students: number; rating: number;
  socials: string[];
  products: { title: string; type: string; price: number; image: string; href: string; rating: number; students: number }[];
}> = {
  "aminata-diallo": {
    name: "Aminata Diallo",
    tagline: "Formatrice en bureautique et e-commerce à Dakar",
    bio: "J'aide les commerçants et les jeunes entrepreneurs à gagner du temps avec les outils numériques et à vendre en ligne. Plus de 1 200 apprenants formés depuis 2021.",
    photo: "/images/team-1.jpg",
    cover: "/images/store-cover.jpg",
    students: 1247,
    rating: 4.8,
    socials: ["WhatsApp", "Instagram", "YouTube"],
    products: [
      { title: "Vendre sur WhatsApp Business", type: "Formation", price: 25000, image: "/images/article-whatsapp.jpg", href: "/formations/vendre-sur-whatsapp-business", rating: 4.8, students: 312 },
      { title: "Maîtriser Excel en 7 jours", type: "Formation", price: 25000, image: "/images/article-formation.jpg", href: "/formations/vendre-sur-whatsapp-business", rating: 4.9, students: 540 },
      { title: "Lancer son e-commerce en Afrique", type: "Formation", price: 35000, image: "/images/feature-vendre.jpg", href: "/formations/vendre-sur-whatsapp-business", rating: 4.7, students: 220 },
      { title: "Pack de 50 modèles de factures", type: "Produit numérique", price: 5000, image: "/images/article-prix.jpg", href: "/formations/vendre-sur-whatsapp-business", rating: 4.6, students: 610 },
    ],
  },
};

/* ---------- Dashboard : notifications et aide ---------- */

export type Notif = { id: string; kind: "vente" | "retrait" | "avis" | "systeme" | "ia"; title: string; text: string; when: string; unread: boolean };

export const notifications: Notif[] = [
  { id: "n1", kind: "vente", title: "Nouvelle vente", text: "Moussa Ndiaye a acheté « Maîtriser Excel en 7 jours » (25 000 FCFA).", when: "Il y a 8 min", unread: true },
  { id: "n2", kind: "vente", title: "Nouvelle vente", text: "Awa Sarr a acheté « Lancer son e-commerce en Afrique » (35 000 FCFA).", when: "Il y a 42 min", unread: true },
  { id: "n3", kind: "avis", title: "Nouvel avis 5 étoiles", text: "« Très clair et concret, je recommande ! » sur Vendre sur WhatsApp Business.", when: "Il y a 2 h", unread: true },
  { id: "n4", kind: "retrait", title: "Retrait effectué", text: "150 000 FCFA ont été envoyés sur votre numéro Orange Money.", when: "Hier", unread: false },
  { id: "n5", kind: "ia", title: "Plan de cours prêt", text: "L'assistant IA a terminé le plan de « Comptabilité simple pour freelances ».", when: "Hier", unread: false },
  { id: "n6", kind: "systeme", title: "Nouveauté", text: "Les codes promo sont disponibles pour le plan Pro. Créez votre première offre.", when: "Il y a 3 jours", unread: false },
];

export const helpTopics = [
  { icon: Rocket, title: "Bien démarrer", text: "Créer votre boutique et votre premier produit." },
  { icon: CreditCard, title: "Paiements", text: "Moyens de paiement, frais et remboursements." },
  { icon: Wallet, title: "Retraits", text: "Délais, plafonds et opérateurs pris en charge." },
  { icon: Bot, title: "Assistant IA", text: "Générer un cours, un quiz ou une page de vente." },
  { icon: Palette, title: "Personnalisation", text: "Couleurs, logo, domaine et page de vente." },
  { icon: Globe, title: "Compte et sécurité", text: "Mot de passe, équipe et données personnelles." },
];

export const helpFaqs = [
  { q: "Combien de temps pour recevoir un retrait Mobile Money ?", a: "La plupart des retraits sont crédités en moins de 10 minutes. Un délai de 24 h peut s'appliquer lors du premier retrait, le temps de vérifier votre numéro." },
  { q: "Comment rembourser un client ?", a: "Ouvrez la commande dans « Commandes », puis cliquez sur « Rembourser ». Le montant est déduit de votre solde disponible." },
  { q: "Puis-je vendre un produit gratuit ?", a: "Oui, fixez le prix à 0 FCFA. C'est idéal pour un aimant à prospects ou une formation d'introduction." },
  { q: "Comment connecter mon propre nom de domaine ?", a: "Avec le plan Business, rendez-vous dans Paramètres > Boutique > Domaine, puis suivez les instructions DNS." },
];

export const productTypes = [
  { id: "formation", icon: GraduationCap, title: "Formation", text: "Cours en modules avec vidéos, PDF et quiz." },
  { id: "numerique", icon: FileText, title: "Produit numérique", text: "E-book, templates, fichiers à télécharger." },
  { id: "coaching", icon: Users, title: "Coaching / service", text: "Séance individuelle ou accompagnement." },
  { id: "communaute", icon: Gift, title: "Abonnement", text: "Contenu ou communauté en accès mensuel." },
];

export const onboardingGoals = [
  { id: "formations", icon: BookOpen, label: "Vendre des formations" },
  { id: "numerique", icon: FileText, label: "Vendre des produits numériques" },
  { id: "coaching", icon: Users, label: "Proposer du coaching" },
  { id: "decouvrir", icon: Zap, label: "Je découvre" },
];
