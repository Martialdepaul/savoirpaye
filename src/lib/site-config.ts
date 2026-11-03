// Informations officielles de la plateforme : source unique pour le site, les pages légales,
// les e-mails affichés et les métadonnées. Les valeurs entre [crochets] sont à compléter
// avec les informations réelles de la société avant la mise en ligne.

export const site = {
  name: "Savoirpay",
  domain: "savoirpay.com",
  // Adresse publique du site (variable d'environnement en production, déploiement Vercel par défaut)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://savoirpaye.vercel.app",
  tagline: "Transformez votre savoir en revenu",
  description:
    "Créez, vendez et gérez vos formations, produits numériques et séances de coaching. Vos clients paient par Mobile Money ou carte, vous retirez vos gains en FCFA.",
  founded: 2023,
  cities: ["Dakar, Sénégal", "Abidjan, Côte d'Ivoire", "Cotonou, Bénin"],
};

export const emails = {
  contact: `contact@${site.domain}`,
  support: `support@${site.domain}`,
  privacy: `donnees@${site.domain}`,
  legal: `juridique@${site.domain}`,
  abuse: `signalement@${site.domain}`,
};

export const phones = {
  whatsapp: "+221 77 000 00 00", // [numéro WhatsApp du support]
  office: "+221 33 000 00 00", // [numéro du standard]
};

/** Lien wa.me à partir d'un numéro affiché (« +221 77 … » → « https://wa.me/22177… ») */
export const waLink = (phone: string, text?: string) =>
  `https://wa.me/${phone.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const company = {
  legalName: "[Raison sociale]",
  legalForm: "[forme juridique]",
  capital: "[montant]",
  address: "[adresse complète du siège], Dakar, Sénégal",
  rccm: "[numéro RCCM]",
  ninea: "[numéro NINEA]",
  director: "[nom du directeur de la publication]",
  host: "[nom de l'hébergeur]",
  hostAddress: "[adresse de l'hébergeur]",
  law: "sénégalais",
  court: "Dakar",
  dataAuthority: "Commission de protection des données personnelles (CDP) du Sénégal",
};

export const year = 2026;
