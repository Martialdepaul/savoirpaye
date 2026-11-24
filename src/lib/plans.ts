// Règles des offres (identiques à la page Tarifs, voir `plans` dans mock-data.ts)

export type PlanName = "Starter" | "Pro" | "Business";

/** Commission prélevée par Savoirpay sur chaque vente encaissée par la plateforme */
export const commissionRates: Record<PlanName, number> = { Starter: 0.08, Pro: 0.03, Business: 0 };

/** Nombre maximum de produits en ligne en même temps (null = illimité) */
export const onlineLimits: Record<PlanName, number | null> = { Starter: 1, Pro: null, Business: null };

export const planOf = (p?: string | null): PlanName => (p === "Pro" || p === "Business" ? p : "Starter");
export const commissionOf = (plan?: string | null) => commissionRates[planOf(plan)];

/** Délai avant qu'une vente encaissée devienne retirable */
export const VALIDATION_HOURS = 48;
/** Montant minimum d'un retrait */
export const MIN_WITHDRAWAL = 5000;
