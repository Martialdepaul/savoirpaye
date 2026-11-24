"use client";

// Notifications du vendeur, déduites de ses commandes et de ses retraits.
// L'état « lu » est mémorisé dans ce navigateur (date de dernière lecture, par compte).
import { useCallback, useEffect, useMemo, useState } from "react";
import { fcfa, timeAgo } from "@/lib/dashboard-data";
import { useAccount, useShopData } from "./AccountContext";

export type NotifKind = "commande" | "vente" | "retrait";
export type Notif = { id: string; kind: NotifKind; title: string; text: string; at: number; when: string; href: string; unread: boolean };

export function useNotifications() {
  const userId = useAccount()?.user.id ?? "";
  const { orders, withdrawals } = useShopData();
  const key = `savoirpay:notifs-seen:${userId}`;
  const [seen, setSeen] = useState(Number.MAX_SAFE_INTEGER);

  useEffect(() => {
    try { setSeen(Number(localStorage.getItem(key)) || 0); } catch { setSeen(0); }
  }, [key]);

  const items = useMemo<Notif[]>(() => {
    const list: Omit<Notif, "unread" | "when">[] = [];
    for (const o of orders) {
      const href = `/dashboard/commandes?commande=${o.id}`;
      if (o.status === "En attente") {
        list.push({ id: `c-${o.id}`, kind: "commande", title: "Nouvelle commande à confirmer", text: `${o.client} a commandé « ${o.product} » (${fcfa(o.amount)}) par ${o.method}.`, at: o.date.getTime(), href });
      } else if (o.status === "Payé") {
        const at = (o.paidAt ?? o.date).getTime();
        list.push(o.amount === 0
          ? { id: `v-${o.id}`, kind: "vente", title: "Nouvel inscrit", text: `${o.client} a obtenu « ${o.product} » (gratuit).`, at, href }
          : { id: `v-${o.id}`, kind: "vente", title: "Vente payée", text: `${o.client} a payé « ${o.product} » : ${fcfa(o.amount)}.`, at, href });
      }
    }
    for (const w of withdrawals) {
      list.push({
        id: `r-${w.id}`, kind: "retrait",
        title: w.status === "Traité" ? "Retrait versé" : w.status === "Refusé" ? "Retrait refusé" : "Demande de retrait enregistrée",
        text: `${fcfa(w.amount)} vers ${w.method} (${w.number}).`, at: w.date.getTime(), href: "/dashboard/portefeuille",
      });
    }
    const now = new Date();
    return list.sort((a, b) => b.at - a.at).slice(0, 100).map((n) => ({ ...n, when: timeAgo(new Date(n.at), now), unread: n.at > seen }));
  }, [orders, withdrawals, seen]);

  const markAllRead = useCallback(() => {
    const now = Date.now();
    setSeen(now);
    try { localStorage.setItem(key, String(now)); } catch {}
  }, [key]);

  return { items, unread: items.filter((n) => n.unread).length, markAllRead };
}
