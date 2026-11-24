// Portefeuille du vendeur, calculé à partir des vraies commandes et des demandes de retrait.
// Seuls les paiements encaissés par Savoirpay alimentent le solde (pas ceux reçus directement par le vendeur).
import { fcfa, formatDate, isPaid, type Order } from "./dashboard-data";
import { mobileMoney, withdrawalFees } from "./mock-data";
import { slugify } from "./catalog";
import { VALIDATION_HOURS } from "./plans";
export { fcfa };

export type TxType = "vente" | "commission" | "retrait";

export interface Transaction {
  id: string;
  date: string;
  at: number;
  label: string;
  type: TxType;
  amount: number; // positif = crédit, négatif = débit
  status: "Confirmé" | "En attente" | "Traité" | "Refusé";
  method?: string;
}

export interface Withdrawal {
  id: string;
  amount: number;
  fee: number;
  method: string;
  number: string;
  status: "En attente" | "Traité" | "Refusé";
  date: Date;
}

const platformSales = (orders: Order[]) => orders.filter((o) => isPaid(o) && !o.offPlatform);

export function walletFrom(orders: Order[], withdrawals: Withdrawal[], now = Date.now()) {
  const sales = platformSales(orders);
  const settledBefore = now - VALIDATION_HOURS * 3_600_000;
  const net = (o: Order) => o.amount - o.commission;
  const when = (o: Order) => (o.paidAt ?? o.date).getTime();
  const settled = sales.filter((o) => when(o) <= settledBefore).reduce((s, o) => s + net(o), 0);
  const pending = sales.filter((o) => when(o) > settledBefore).reduce((s, o) => s + net(o), 0);
  const requested = withdrawals.filter((w) => w.status !== "Refusé").reduce((s, w) => s + w.amount, 0);
  return {
    available: Math.max(0, settled - requested),
    pending,
    totalWithdrawn: withdrawals.filter((w) => w.status === "Traité").reduce((s, w) => s + w.amount, 0),
    withdrawalsInProgress: withdrawals.filter((w) => w.status === "En attente").reduce((s, w) => s + w.amount, 0),
  };
}

export function transactionsFrom(orders: Order[], withdrawals: Withdrawal[], now = Date.now()): Transaction[] {
  const settledBefore = now - VALIDATION_HOURS * 3_600_000;
  const rows: Transaction[] = [];
  for (const o of platformSales(orders)) {
    const d = o.paidAt ?? o.date;
    rows.push({ id: o.ref, at: d.getTime(), date: formatDate(d), label: `Vente : ${o.product}`, type: "vente", amount: o.amount, status: d.getTime() > settledBefore ? "En attente" : "Confirmé", method: o.method });
    if (o.commission > 0) rows.push({ id: `${o.ref}-C`, at: d.getTime() - 1, date: formatDate(d), label: `Commission Savoirpay sur ${o.ref}`, type: "commission", amount: -o.commission, status: "Confirmé" });
  }
  for (const w of withdrawals) {
    rows.push({ id: w.id.slice(0, 8).toUpperCase(), at: w.date.getTime(), date: formatDate(w.date), label: `Retrait vers ${w.method} : ${w.number}`, type: "retrait", amount: -w.amount, status: w.status === "En attente" ? "En attente" : w.status, method: w.method });
  }
  return rows.sort((a, b) => b.at - a.at);
}

export const mobileMoneyProviders = mobileMoney.map((m) => ({ id: slugify(m.name), label: m.name, fee: withdrawalFees[m.name] }));
