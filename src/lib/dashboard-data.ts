export const seller = { name: "Aminata Diallo", role: "Formatrice à Dakar", initials: "AD" };

export const fcfa = (n: number) =>
  `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FCFA`;

export const periods = [
  { id: "7", label: "7 jours" },
  { id: "30", label: "30 jours" },
  { id: "90", label: "90 jours" },
] as const;
export type PeriodId = (typeof periods)[number]["id"];

export const statsByPeriod: Record<PeriodId, { revenue: number; sales: number; orders: number; clients: number; d: [number, number, number, number] }> = {
  "7": { revenue: 312500, sales: 21, orders: 26, clients: 14, d: [12.4, 8.2, 5.1, 21.7] },
  "30": { revenue: 1284500, sales: 86, orders: 103, clients: 57, d: [18.2, 11.5, 9.3, 24.6] },
  "90": { revenue: 3496000, sales: 241, orders: 289, clients: 162, d: [32.8, 19.4, -2.6, 28.1] },
};

export const wallet = { available: 842500, pending: 156000 };

export function revenueSeries(days: number) {
  const out: { label: string; value: number }[] = [];
  const end = new Date(2026, 9, 14);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(end.getDate() - i);
    const k = days - i;
    const base = 30000 + k * (days === 7 ? 1500 : 450);
    const wave = Math.sin(k * 0.9) * 9000 + Math.cos(k * 0.37) * 7000;
    const weekend = d.getDay() === 0 || d.getDay() === 6 ? 8000 : 0;
    out.push({
      label: d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" }),
      value: Math.max(8000, Math.round((base + wave + weekend) / 500) * 500),
    });
  }
  return out;
}

export const topProducts = [
  { name: "Maîtriser Excel en 7 jours", type: "Formation", sales: 34, revenue: 850000 },
  { name: "Lancer son e-commerce en Afrique", type: "Formation", sales: 22, revenue: 770000 },
  { name: "Pack de 50 modèles de factures", type: "Produit numérique", sales: 61, revenue: 305000 },
  { name: "Comptabilité simple pour freelances", type: "Formation", sales: 15, revenue: 225000 },
];

export type OrderStatus = "Payé" | "En attente" | "Échoué";
export const orders: { id: string; client: string; product: string; amount: number; method: string; status: OrderStatus; when: string }[] = [
  { id: "#SP-4821", client: "Moussa Ndiaye", product: "Maîtriser Excel en 7 jours", amount: 25000, method: "Wave", status: "Payé", when: "Il y a 8 min" },
  { id: "#SP-4820", client: "Awa Sarr", product: "Lancer son e-commerce en Afrique", amount: 35000, method: "Orange Money", status: "Payé", when: "Il y a 42 min" },
  { id: "#SP-4819", client: "Cheikh Fall", product: "Pack de 50 modèles de factures", amount: 5000, method: "Wave", status: "En attente", when: "Il y a 1 h" },
  { id: "#SP-4818", client: "Mariama Ba", product: "Maîtriser Excel en 7 jours", amount: 25000, method: "Carte bancaire", status: "Échoué", when: "Il y a 3 h" },
  { id: "#SP-4817", client: "Ibrahima Sow", product: "Comptabilité simple pour freelances", amount: 15000, method: "Orange Money", status: "Payé", when: "Hier" },
];
