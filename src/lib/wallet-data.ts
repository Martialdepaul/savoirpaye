import { fcfa } from "./dashboard-data";
export { fcfa };

export type TxType = "vente" | "commission" | "retrait";

export interface Transaction {
  id: string;
  date: string;
  label: string;
  type: TxType;
  amount: number; // positive = credit, negative = debit
  status: "Confirmé" | "En attente" | "Traité";
  method?: string;
}

export const walletBalance = {
  available: 842500,
  pending: 156000,
  totalWithdrawn: 2180000,
};

export const transactions: Transaction[] = [
  { id: "TX-1042", date: "14 oct. 2026", label: "Vente — Maîtriser Excel en 7 jours", type: "vente", amount: 25000, status: "Confirmé", method: "Wave" },
  { id: "TX-1041", date: "14 oct. 2026", label: "Vente — Lancer son e-commerce en Afrique", type: "vente", amount: 35000, status: "Confirmé", method: "Orange Money" },
  { id: "TX-1040", date: "14 oct. 2026", label: "Commission plateforme (5 %)", type: "commission", amount: -3000, status: "Confirmé" },
  { id: "TX-1039", date: "13 oct. 2026", label: "Retrait vers Wave — +221 77 000 00 00", type: "retrait", amount: -200000, status: "Traité", method: "Wave" },
  { id: "TX-1038", date: "13 oct. 2026", label: "Vente — Pack de 50 modèles de factures", type: "vente", amount: 5000, status: "Confirmé", method: "Wave" },
  { id: "TX-1037", date: "12 oct. 2026", label: "Vente — Maîtriser Excel en 7 jours", type: "vente", amount: 25000, status: "Confirmé", method: "Carte bancaire" },
  { id: "TX-1036", date: "12 oct. 2026", label: "Commission plateforme (5 %)", type: "commission", amount: -1250, status: "Confirmé" },
  { id: "TX-1035", date: "11 oct. 2026", label: "Vente — Comptabilité simple pour freelances", type: "vente", amount: 15000, status: "En attente", method: "Orange Money" },
  { id: "TX-1034", date: "10 oct. 2026", label: "Retrait vers Orange Money — +221 76 000 00 00", type: "retrait", amount: -150000, status: "Traité", method: "Orange Money" },
  { id: "TX-1033", date: "9 oct. 2026", label: "Vente — Lancer son e-commerce en Afrique", type: "vente", amount: 35000, status: "Confirmé", method: "Wave" },
  { id: "TX-1032", date: "8 oct. 2026", label: "Commission plateforme (5 %)", type: "commission", amount: -1750, status: "Confirmé" },
  { id: "TX-1031", date: "7 oct. 2026", label: "Vente — Maîtriser Excel en 7 jours", type: "vente", amount: 25000, status: "Confirmé", method: "Wave" },
];

// Mouvements plus anciens (données de démonstration) pour remplir plusieurs pages
const olderSales = [
  { name: "Maîtriser Excel en 7 jours", price: 25000 },
  { name: "Lancer son e-commerce en Afrique", price: 35000 },
  { name: "Pack de 50 modèles de factures", price: 5000 },
  { name: "Comptabilité simple pour freelances", price: 15000 },
  { name: "Vendre sur WhatsApp Business", price: 20000 },
];
const olderMethods = ["Wave", "Orange Money", "Carte bancaire", "MTN MoMo"];
for (let i = 0; i < 28; i++) {
  const day = 6 - Math.floor(i / 6);
  const date = day > 0 ? `${day} oct. 2026` : `${30 + day} sept. 2026`;
  const id = `TX-${1030 - i}`;
  if (i % 9 === 8) {
    transactions.push({ id, date, label: "Retrait vers Wave — +221 77 000 00 00", type: "retrait", amount: -100000 - (i % 3) * 25000, status: "Traité", method: "Wave" });
  } else if (i % 4 === 3) {
    transactions.push({ id, date, label: "Commission plateforme (5 %)", type: "commission", amount: -1250 - (i % 3) * 500, status: "Confirmé" });
  } else {
    const prod = olderSales[i % olderSales.length];
    transactions.push({ id, date, label: `Vente — ${prod.name}`, type: "vente", amount: prod.price, status: "Confirmé", method: olderMethods[i % olderMethods.length] });
  }
}

export const mobileMoneyProviders = [
  { id: "wave", label: "Wave", fee: 0.01 }, // 1%
  { id: "orange-money", label: "Orange Money", fee: 0.015 }, // 1.5%
  { id: "free-money", label: "Free Money", fee: 0.01 },
  { id: "mtn-momo", label: "MTN MoMo", fee: 0.015 },
];
