import { CreditCard, GraduationCap, TrendingUp, UserRound } from "lucide-react";

export const paymentMethods = [
  { name: "Orange Money", color: "#FF7900" },
  { name: "Wave", color: "#1DC8FF" },
  { name: "MTN MoMo", color: "#FFCC00" },
  { name: "Moov Money", color: "#0072CE" },
  { name: "Airtel Money", color: "#E40000" },
  { name: "Carte bancaire", color: "#1C1917" },
];

/** Opérateurs Mobile Money (paiement et retrait) */
export const mobileMoney = paymentMethods.filter((m) => m.name !== "Carte bancaire");

/** Frais de retrait par opérateur, rappelés sur la page Tarifs */
export const withdrawalFees: Record<string, number> = { Wave: 0.01, "Orange Money": 0.015, "MTN MoMo": 0.015, "Moov Money": 0.015, "Airtel Money": 0.015 };

export const steps = [
  { icon: UserRound, title: "Inscrivez-vous", text: "Créez votre compte en quelques minutes. C'est gratuit." },
  { icon: GraduationCap, title: "Créez vos contenus", text: "Ajoutez vos formations, produits numériques ou services." },
  { icon: CreditCard, title: "Recevez vos paiements", text: "Vos clients paient via Mobile Money, carte bancaire ou autres moyens." },
  { icon: TrendingUp, title: "Retirez vos gains", text: "Suivez vos ventes et retirez vos fonds en toute sécurité." },
];

export const testimonials = [
  { quote: "Grâce à Savoirpay, j'ai pu vendre ma formation en ligne et générer mes premiers revenus. C'est simple et vraiment efficace !", name: "Aïssata Traoré", role: "Formatrice en développement personnel", photo: "/images/avatar-aissata.jpg" },
  { quote: "La plateforme est intuitive et le support est réactif. Je recommande à tous les créateurs de contenu !", name: "Moussa Diallo", role: "Coach business", photo: "/images/avatar-moussa.jpg" },
  { quote: "L'assistant IA m'a beaucoup aidé à créer mes cours plus rapidement. Savoirpay est une vraie opportunité pour nous les Africains.", name: "Kevin Mensah", role: "Créateur de contenu YouTube", photo: "/images/avatar-kevin.jpg" },
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
  { q: "Comment et quand puis-je retirer mes gains ?", a: "Depuis votre tableau de bord, cliquez sur « Retirer » et choisissez votre numéro Mobile Money ou votre compte bancaire. Les retraits Mobile Money sont généralement crédités en quelques minutes, avec des frais de 1 à 1,5 % selon l'opérateur." },
  { q: "Dois-je payer pour commencer ?", a: "Non. Le plan Starter est gratuit et sans engagement. Vous ne payez qu'une commission lorsque vous réalisez une vente." },
  { q: "Que fait exactement le Créateur IA ?", a: "Il propose le plan de votre cours, rédige les leçons, les quiz et la page de vente à partir de votre sujet. Vous relisez, modifiez et validez chaque contenu avant publication." },
  { q: "Mes contenus sont-ils protégés contre le piratage ?", a: "Vos vidéos et fichiers sont accessibles uniquement aux élèves ayant payé, avec des liens sécurisés et un filigrane au nom de l'élève." },
  { q: "Puis-je changer de formule à tout moment ?", a: "Oui. Vous pouvez passer à une formule supérieure ou revenir à Starter à tout moment, sans frais cachés." },
];
