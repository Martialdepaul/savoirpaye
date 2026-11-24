// Mise en forme et calculs du tableau de bord, à partir des vraies commandes de la boutique
// (chargées par le layout du tableau de bord, voir `useShopData()`).
import type { CatalogProduct } from "./catalog";

export const fcfa = (n: number) =>
  `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FCFA`;

/* ---------- Dates ---------- */

const DAY = 86_400_000;
const months = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
const pad = (n: number) => String(n).padStart(2, "0");
/** « 14 oct. 2026 » */
export const formatDate = (d: Date) => `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
/** « 14 oct. 2026, 09:12 » */
export const formatDateTime = (d: Date) => `${formatDate(d)}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
/** « Il y a 8 min », « Hier », « Il y a 3 jours »… */
export function timeAgo(d: Date, now = new Date()) {
  const min = Math.round((now.getTime() - d.getTime()) / 60_000);
  if (min < 1) return "À l'instant";
  if (min < 60) return `Il y a ${min} min`;
  if (min < 24 * 60 && d.getDate() === now.getDate()) return `Il y a ${Math.round(min / 60)} h`;
  const days = Math.round((new Date(now).setHours(0, 0, 0, 0) - new Date(d).setHours(0, 0, 0, 0)) / DAY);
  return days <= 1 ? "Hier" : days < 7 ? `Il y a ${days} jours` : formatDate(d);
}

/* ---------- Commandes ---------- */

export type OrderStatus = "Payé" | "En attente" | "Annulé";

export interface Order {
  id: string;
  /** Référence affichée : « #SP-1001 » */
  ref: string;
  client: string;
  email: string;
  phone: string;
  productId: string | null;
  product: string;
  productType: string;
  amount: number;
  method: string;
  status: OrderStatus;
  /** Paiement reçu directement par le vendeur (hors portefeuille Savoirpay) */
  offPlatform: boolean;
  commission: number;
  date: Date;
  paidAt: Date | null;
}

export const isPaid = (o: Order) => o.status === "Payé";

/* ---------- Clients (acheteurs ayant au moins une commande payée) ---------- */

export interface Client {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  purchases: number;
  totalSpent: number;
  lastPurchase: string;
  joinedAt: string;
  products: string[];
}

export function clientsFrom(orders: Order[]): Client[] {
  const byEmail = new Map<string, Order[]>();
  for (const o of orders) if (isPaid(o)) byEmail.set(o.email, [...(byEmail.get(o.email) ?? []), o]);
  return [...byEmail.entries()].map(([email, list]) => {
    const sorted = [...list].sort((a, b) => b.date.getTime() - a.date.getTime());
    const name = sorted[0].client;
    const words = name.split(/\s+/).filter(Boolean);
    return {
      id: email,
      name,
      initials: `${words[0]?.[0] ?? ""}${words.length > 1 ? words[words.length - 1][0] : ""}`.toUpperCase(),
      email,
      phone: sorted[0].phone,
      purchases: list.length,
      totalSpent: list.reduce((s, o) => s + o.amount, 0),
      lastPurchase: formatDate(sorted[0].date),
      joinedAt: formatDate(sorted[sorted.length - 1].date),
      products: [...new Set(list.map((o) => o.product))],
    };
  }).sort((a, b) => b.totalSpent - a.totalSpent);
}

/* ---------- Statistiques par période ---------- */

export const periods = [
  { id: "7", label: "7 jours" },
  { id: "30", label: "30 jours" },
  { id: "90", label: "90 jours" },
] as const;
export type PeriodId = (typeof periods)[number]["id"];

function totals(orders: Order[], from: number, to: number) {
  const list = orders.filter((o) => o.date.getTime() >= from && o.date.getTime() < to);
  const paid = list.filter(isPaid);
  const firstPurchase = new Map<string, number>();
  for (const o of orders.filter(isPaid)) firstPurchase.set(o.email, Math.min(firstPurchase.get(o.email) ?? Infinity, o.date.getTime()));
  return {
    revenue: paid.reduce((s, o) => s + o.amount, 0),
    sales: paid.length,
    orders: list.length,
    clients: new Set(paid.filter((o) => (firstPurchase.get(o.email) ?? 0) >= from).map((o) => o.email)).size,
  };
}

const change = (cur: number, prev: number) => (prev > 0 ? Math.round(((cur - prev) / prev) * 1000) / 10 : null);

/** Totaux de la période et évolution (%) par rapport à la période précédente (null si rien à comparer) */
export function statsFor(orders: Order[], days: number, now = Date.now()) {
  const cur = totals(orders, now - days * DAY, now + 1);
  const prev = totals(orders, now - 2 * days * DAY, now - days * DAY);
  return { ...cur, d: [change(cur.revenue, prev.revenue), change(cur.sales, prev.sales), change(cur.orders, prev.orders), change(cur.clients, prev.clients)] as (number | null)[] };
}

/** Chiffre d'affaires encaissé jour par jour */
export function revenueSeries(orders: Order[], days: number, now = new Date()) {
  const out: { label: string; value: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * DAY);
    const value = orders.filter((o) => isPaid(o) && o.date.toDateString() === d.toDateString()).reduce((s, o) => s + o.amount, 0);
    out.push({ label: `${d.getDate()} ${months[d.getMonth()]}`, value });
  }
  return out;
}

/** Produits qui rapportent le plus (ventes payées) */
export const topProducts = (products: CatalogProduct[], n = 4) =>
  products.filter((p) => p.revenue > 0).sort((a, b) => b.revenue - a.revenue).slice(0, n);
