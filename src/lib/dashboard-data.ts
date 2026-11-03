// Données de démonstration du tableau de bord vendeur.
// Commandes, clients, statistiques et graphique sont tous calculés à partir de la même
// liste de commandes, elle-même générée depuis le catalogue : les chiffres concordent partout.
import { catalog, findProduct, seller as catalogSeller } from "./catalog";

export const seller = catalogSeller;

export const fcfa = (n: number) =>
  `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FCFA`;

/* ---------- Dates ---------- */

/** « Maintenant » de la démonstration : toutes les dates sont relatives à cet instant */
export const NOW = new Date(2026, 9, 14, 9, 20);
const DAY = 86_400_000;

const months = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
const pad = (n: number) => String(n).padStart(2, "0");
/** « 14 oct. 2026 » */
export const formatDate = (d: Date) => `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
/** « 14 oct. 2026, 09:12 » */
export const formatDateTime = (d: Date) => `${formatDate(d)}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
/** « Il y a 8 min », « Hier », « Il y a 3 jours »… */
export function timeAgo(d: Date) {
  const min = Math.round((NOW.getTime() - d.getTime()) / 60_000);
  if (min < 60) return `Il y a ${Math.max(1, min)} min`;
  if (min < 24 * 60 && d.getDate() === NOW.getDate()) return `Il y a ${Math.round(min / 60)} h`;
  const days = Math.round((new Date(NOW).setHours(0, 0, 0, 0) - new Date(d).setHours(0, 0, 0, 0)) / DAY);
  return days <= 1 ? "Hier" : days < 7 ? `Il y a ${days} jours` : formatDate(d);
}

/* ---------- Commandes ---------- */

export type OrderStatus = "Payé" | "En attente" | "Échoué";
export type PaymentMethod = "Wave" | "Orange Money" | "MTN MoMo" | "Moov Money" | "Airtel Money" | "Carte bancaire";

export interface Order {
  id: string;
  client: string;
  email: string;
  phone: string;
  productId: string;
  product: string;
  amount: number;
  method: PaymentMethod;
  status: OrderStatus;
  date: Date;
  when: string;
}

const emailOf = (name: string) =>
  `${name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z]+/g, ".").replace(/^\.|\.$/g, "")}@exemple.com`;

// Générateur pseudo-aléatoire déterministe : mêmes données au serveur et au navigateur
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = rng(2026);
const pick = <T,>(list: readonly T[]) => list[Math.floor(rand() * list.length)];

const phoneOf = (i: number) => `+221 7${[7, 6, 8, 0][i % 4]} ${pad(10 + ((i * 37) % 90))}${(i * 7) % 10} ${pad((i * 13) % 100)} ${pad((i * 29) % 100)}`;

function makeOrder(n: number, client: string, slug: string, method: PaymentMethod, status: OrderStatus, date: Date): Order {
  const p = findProduct(slug)!;
  return { id: `#SP-${n}`, client, email: emailOf(client), phone: phoneOf(n), productId: p.id, product: p.name, amount: p.price, method, status, date, when: formatDateTime(date) };
}

const at = (day: number, h: number, m: number) => new Date(2026, 9, day, h, m);

// Les commandes les plus récentes, reprises dans les notifications
const recent: [string, string, PaymentMethod, OrderStatus, Date][] = [
  ["Moussa Ndiaye", "maitriser-excel-7-jours", "Wave", "Payé", at(14, 9, 12)],
  ["Awa Sarr", "lancer-ecommerce-afrique", "Orange Money", "Payé", at(14, 8, 38)],
  ["Cheikh Fall", "pack-50-modeles-factures", "Wave", "En attente", at(14, 8, 5)],
  ["Mariama Ba", "maitriser-excel-7-jours", "Carte bancaire", "Échoué", at(14, 6, 21)],
  ["Ibrahima Sow", "comptabilite-freelances", "Orange Money", "Payé", at(13, 17, 46)],
  ["Fatou Diop", "vendre-sur-whatsapp-business", "Wave", "Payé", at(13, 11, 30)],
  ["Omar Faye", "lancer-ecommerce-afrique", "Wave", "Payé", at(12, 21, 15)],
  ["Rokhaya Niang", "pack-50-modeles-factures", "Orange Money", "Payé", at(12, 16, 40)],
  ["Seydou Diallo", "maitriser-excel-7-jours", "MTN MoMo", "Payé", at(12, 10, 20)],
  ["Aïssatou Bah", "comptabilite-freelances", "Carte bancaire", "Échoué", at(11, 14, 0)],
];

const firstNames = ["Khady", "Babacar", "Ndeye", "Lamine", "Coumba", "Pape", "Astou", "Modou", "Bineta", "Alioune", "Mame Diarra", "Abdou", "Yacine", "Dieynaba", "Moustapha", "Nafi", "Ousmane", "Marème", "Kouadio", "Adjoua", "Serge", "Aminata", "Kofi", "Awa", "Mamadou", "Fatoumata", "Issa", "Rokia", "Jean-Marc", "Grâce"];
const lastNames = ["Mbaye", "Gueye", "Thiam", "Cissé", "Kane", "Diouf", "Sy", "Lo", "Camara", "Ndour", "Fall", "Seck", "Touré", "Sall", "Koné", "Kouassi", "Traoré", "Coulibaly", "Mensah", "Hounsou"];
// Répartition des ventes proche de celle du catalogue
const weighted = ["maitriser-excel-7-jours", "maitriser-excel-7-jours", "maitriser-excel-7-jours", "lancer-ecommerce-afrique", "lancer-ecommerce-afrique",
  "pack-50-modeles-factures", "pack-50-modeles-factures", "pack-50-modeles-factures", "pack-50-modeles-factures", "comptabilite-freelances", "comptabilite-freelances",
  "vendre-sur-whatsapp-business", "vendre-sur-whatsapp-business", "vendre-sur-whatsapp-business"];
const methods: PaymentMethod[] = ["Wave", "Wave", "Wave", "Orange Money", "Orange Money", "Orange Money", "MTN MoMo", "Moov Money", "Airtel Money", "Carte bancaire", "Carte bancaire"];

export const orders: Order[] = recent.map(([c, s, m, st, d], i) => makeOrder(4821 - i, c, s, m, st, d));

// Historique des 90 derniers jours (environ 4 commandes par jour)
{
  const clients: string[] = [];
  let n = 4821 - recent.length;
  let t = at(11, 9, 0).getTime();
  const start = NOW.getTime() - 90 * DAY;
  while (t > start) {
    t -= (2 + rand() * 6) * 3_600_000;
    const d = new Date(t);
    if (d.getHours() < 7) continue;
    // Un client sur quatre a déjà acheté
    const client = clients.length > 10 && rand() < 0.25 ? pick(clients) : `${pick(firstNames)} ${pick(lastNames)}`;
    clients.push(client);
    const r = rand();
    const status: OrderStatus = r < 0.84 ? "Payé" : r < 0.93 ? "Échoué" : "En attente";
    orders.push(makeOrder(n--, client, pick(weighted), pick(methods), status, d));
  }
}

export const latestOrders = orders.slice(0, 5).map((o) => ({ ...o, when: timeAgo(o.date) }));

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

export const clients: Client[] = (() => {
  const byName = new Map<string, Order[]>();
  for (const o of orders) if (o.status === "Payé") byName.set(o.client, [...(byName.get(o.client) ?? []), o]);
  return [...byName.entries()].map(([name, list], i) => {
    const words = name.split(" ");
    return {
      id: `C${String(i + 1).padStart(3, "0")}`,
      name,
      initials: `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase(),
      email: list[0].email,
      phone: list[0].phone,
      purchases: list.length,
      totalSpent: list.reduce((s, o) => s + o.amount, 0),
      lastPurchase: formatDate(list[0].date),
      joinedAt: formatDate(list[list.length - 1].date),
      products: [...new Set(list.map((o) => o.product))],
    };
  });
})();

/* ---------- Statistiques par période ---------- */

export const periods = [
  { id: "7", label: "7 jours" },
  { id: "30", label: "30 jours" },
  { id: "90", label: "90 jours" },
] as const;
export type PeriodId = (typeof periods)[number]["id"];

const inPeriod = (days: number) => orders.filter((o) => NOW.getTime() - o.date.getTime() < days * DAY);

function statsFor(days: number, d: [number, number, number, number]) {
  const list = inPeriod(days);
  const paid = list.filter((o) => o.status === "Payé");
  const firstOrder = new Map<string, number>();
  for (const o of orders) firstOrder.set(o.client, o.date.getTime());
  const since = NOW.getTime() - days * DAY;
  return {
    revenue: paid.reduce((s, o) => s + o.amount, 0),
    sales: paid.length,
    orders: list.length,
    clients: new Set(paid.filter((o) => firstOrder.get(o.client)! >= since).map((o) => o.client)).size,
    /** Évolution (%) par rapport à la période précédente : CA, ventes, commandes, nouveaux clients */
    d,
  };
}

export const statsByPeriod: Record<PeriodId, ReturnType<typeof statsFor>> = {
  "7": statsFor(7, [12.4, 8.2, 5.1, 21.7]),
  "30": statsFor(30, [18.2, 11.5, 9.3, 24.6]),
  "90": statsFor(90, [32.8, 19.4, -2.6, 28.1]),
};

/** Chiffre d'affaires encaissé jour par jour */
export function revenueSeries(days: number) {
  const out: { label: string; value: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(NOW.getTime() - i * DAY);
    const value = orders
      .filter((o) => o.status === "Payé" && o.date.toDateString() === d.toDateString())
      .reduce((s, o) => s + o.amount, 0);
    out.push({ label: `${d.getDate()} ${months[d.getMonth()]}`, value });
  }
  return out;
}

/* ---------- Meilleurs produits (ventes depuis la mise en ligne) ---------- */

export const topProducts = [...catalog]
  .filter((p) => p.status === "En ligne")
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 4);
