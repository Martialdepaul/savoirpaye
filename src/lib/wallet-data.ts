import { NOW, fcfa, formatDate, orders } from "./dashboard-data";
import { mobileMoney, withdrawalFees } from "./mock-data";
import { seller, slugify } from "./catalog";
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

/** Commission prélevée par la plateforme selon l'offre du vendeur (voir la page Tarifs) */
export const COMMISSION_RATE = 0.03;
/** Délai de validation avant qu'une vente devienne retirable */
const VALIDATION_MS = 48 * 3_600_000;

const withdrawals: [Date, string, number][] = [
  [new Date(2026, 9, 13, 18, 5), "Orange Money", 150000],
  [new Date(2026, 9, 6, 9, 40), "Wave", 200000],
  [new Date(2026, 8, 29, 12, 15), "Wave", 175000],
  [new Date(2026, 8, 22, 19, 30), "Orange Money", 150000],
];
const payoutNumber = (method: string) => seller.payouts.find((p) => p.method === method)?.number ?? "";

// Historique des 30 derniers jours : ventes payées, commissions (regroupées par jour) et retraits
export const transactions: Transaction[] = (() => {
  const since = NOW.getTime() - 30 * 86_400_000;
  const sales = orders.filter((o) => o.status === "Payé" && o.date.getTime() >= since);
  const rows: (Transaction & { at: number })[] = sales.map((o) => ({
    id: `TX-${o.id.slice(4)}`,
    at: o.date.getTime(),
    date: formatDate(o.date),
    label: `Vente — ${o.product}`,
    type: "vente",
    amount: o.amount,
    status: NOW.getTime() - o.date.getTime() < VALIDATION_MS ? "En attente" : "Confirmé",
    method: o.method,
  }));
  const byDay = new Map<string, typeof sales>();
  for (const o of sales) byDay.set(formatDate(o.date), [...(byDay.get(formatDate(o.date)) ?? []), o]);
  for (const [day, list] of byDay) {
    const last = list[0].date;
    rows.push({
      id: `CM-${last.getMonth() + 1}${String(last.getDate()).padStart(2, "0")}`,
      at: new Date(last).setHours(23, 59),
      date: day,
      label: `Commission plateforme (${COMMISSION_RATE * 100} % sur ${list.length} vente${list.length > 1 ? "s" : ""})`,
      type: "commission",
      amount: -Math.round(list.reduce((s, o) => s + o.amount, 0) * COMMISSION_RATE),
      status: "Confirmé",
    });
  }
  withdrawals.forEach(([d, method, amount], i) => rows.push({
    id: `RT-${104 - i}`,
    at: d.getTime(),
    date: formatDate(d),
    label: `Retrait vers ${method} — ${payoutNumber(method)}`,
    type: "retrait",
    amount: -amount,
    status: "Traité",
    method,
  }));
  return rows.sort((x, y) => y.at - x.at).map(({ at: _, ...t }) => t);
})();

export const walletBalance = {
  available: 842500,
  /** Ventes encore en période de validation, commission déduite */
  pending: Math.round(transactions.filter((t) => t.status === "En attente").reduce((s, t) => s + t.amount, 0) * (1 - COMMISSION_RATE)),
  totalWithdrawn: 2180000,
};

export const mobileMoneyProviders = mobileMoney.map((m) => ({ id: slugify(m.name), label: m.name, fee: withdrawalFees[m.name] }));
