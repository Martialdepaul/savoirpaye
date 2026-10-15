export const paymentMethods = [
  { name: "Orange Money", color: "#FF7900" },
  { name: "Wave", color: "#1DC8FF" },
  { name: "MTN MoMo", color: "#FFCC00" },
  { name: "Moov Money", color: "#0072CE" },
  { name: "Airtel Money", color: "#E40000" },
  { name: "Carte bancaire", color: "#1C1917" },
];

export const steps = [
  { title: "Créez votre compte", text: "Inscrivez-vous en deux minutes, sans carte bancaire ni frais d'ouverture." },
  { title: "Construisez votre cours", text: "Importez vos vidéos et documents, ou laissez l'IA structurer le plan à votre place." },
  { title: "Fixez votre prix", text: "Choisissez un tarif en FCFA, un abonnement ou un paiement unique, et publiez votre page de vente." },
  { title: "Encaissez et retirez", text: "Vos élèves paient par Mobile Money ou carte. Retirez vos gains sur votre numéro en quelques minutes." },
];

export const plans = [
  {
    name: "Starter",
    price: "0 FCFA",
    tagline: "Pour lancer votre premier produit.",
    featured: false,
    cta: "Commencer gratuitement",
    features: ["1 cours ou produit numérique", "Paiements Mobile Money et carte", "Page de vente personnalisable", "Commission de 8 % par vente"],
  },
  {
    name: "Pro",
    price: "9 900 FCFA",
    tagline: "Pour les créateurs qui développent leur audience.",
    featured: true,
    cta: "Choisir Pro",
    features: ["Cours et produits illimités", "Créateur IA : 20 générations par mois", "Commission réduite à 3 %", "Codes promo et ventes groupées", "Retraits prioritaires"],
  },
  {
    name: "Business",
    price: "24 900 FCFA",
    tagline: "Pour les écoles et les équipes de formation.",
    featured: false,
    cta: "Choisir Business",
    features: ["Tout le plan Pro", "Créateur IA illimité", "Aucune commission sur les ventes", "Nom de domaine personnalisé", "Jusqu'à 5 membres d'équipe", "Assistance dédiée sur WhatsApp"],
  },
];

export const faqs = [
  { q: "Quels moyens de paiement mes élèves peuvent-ils utiliser ?", a: "Vos élèves règlent par Orange Money, Wave, MTN MoMo, Moov Money, Airtel Money ou par carte bancaire. Les montants s'affichent en FCFA, sans conversion." },
  { q: "Comment et quand puis-je retirer mes gains ?", a: "Depuis votre tableau de bord, cliquez sur « Retirer » et choisissez votre numéro Mobile Money ou votre compte bancaire. Les retraits Mobile Money sont généralement crédités en quelques minutes." },
  { q: "Dois-je payer pour commencer ?", a: "Non. Le plan Starter est gratuit et sans engagement. Vous ne payez qu'une commission lorsque vous réalisez une vente." },
  { q: "Que fait exactement le Créateur IA ?", a: "Il propose le plan de votre cours, rédige les leçons, les quiz et la page de vente à partir de votre sujet. Vous relisez, modifiez et validez chaque contenu avant publication." },
  { q: "Mes contenus sont-ils protégés contre le piratage ?", a: "Vos vidéos et fichiers sont accessibles uniquement aux élèves ayant payé, avec des liens sécurisés et un filigrane au nom de l'élève." },
  { q: "Puis-je changer de formule à tout moment ?", a: "Oui. Vous pouvez passer à une formule supérieure ou revenir à Starter à tout moment, sans frais cachés." },
];
