"use client";

import { useState } from "react";
import { Bell, CheckCheck, MessageSquareQuote, Sparkles, ShoppingBag, Wallet } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { notifications as initial, type Notif } from "@/lib/site-data";

const kinds: Record<Notif["kind"], { icon: typeof Bell; cls: string }> = {
  vente: { icon: ShoppingBag, cls: "bg-[#ECF8EF] text-success" },
  retrait: { icon: Wallet, cls: "bg-gold-light text-gold-ink" },
  avis: { icon: MessageSquareQuote, cls: "bg-primary-light text-primary" },
  ia: { icon: Sparkles, cls: "bg-ai-light text-ai" },
  systeme: { icon: Bell, cls: "bg-page text-ink-2" },
};

const filters = [
  { id: "all", label: "Toutes" },
  { id: "unread", label: "Non lues" },
  { id: "vente", label: "Ventes" },
  { id: "retrait", label: "Retraits" },
] as const;

export default function NotificationsPage() {
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const list = items.filter((n) => (filter === "all" ? true : filter === "unread" ? n.unread : n.kind === filter));
  const unread = items.filter((n) => n.unread).length;

  return (
    <DashboardShell active="Notifications">
      <main className="mx-auto max-w-3xl space-y-5 px-4 pb-32 pt-6 sm:px-8 lg:pb-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Notifications</h1>
            <p className="mt-1 text-sm text-ink-2">{unread > 0 ? `${unread} notification${unread > 1 ? "s" : ""} non lue${unread > 1 ? "s" : ""}` : "Vous êtes à jour."}</p>
          </div>
          <button
            onClick={() => setItems(items.map((n) => ({ ...n, unread: false })))}
            disabled={unread === 0}
            className="inline-flex items-center justify-center gap-2 rounded-btn border border-line bg-white px-4 py-2.5 text-sm font-semibold hover:bg-page disabled:opacity-50"
          >
            <CheckCheck size={16} /> Tout marquer comme lu
          </button>
        </div>

        <div role="tablist" aria-label="Filtrer" className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {filters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${filter === f.id ? "bg-primary text-white" : "border border-line bg-white text-ink-2"}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="divide-y divide-line overflow-hidden rounded-card border border-line bg-white shadow-soft">
          {list.length === 0 && <li className="p-10 text-center text-sm text-ink-2">Aucune notification ici.</li>}
          {list.map((n) => {
            const k = kinds[n.kind];
            return (
              <li key={n.id}>
                <button
                  onClick={() => setItems(items.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))}
                  className={`flex w-full gap-3 p-4 text-left transition-colors hover:bg-page sm:gap-4 sm:p-5 ${n.unread ? "bg-mint/60" : ""}`}
                >
                  <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${k.cls}`}><k.icon size={18} /></span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-sm font-semibold">{n.title}</span>
                      <span className="shrink-0 text-xs text-ink-2">{n.when}</span>
                    </span>
                    <span className="mt-0.5 block text-sm text-ink-2">{n.text}</span>
                  </span>
                  {n.unread && <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-gold" aria-label="Non lue" />}
                </button>
              </li>
            );
          })}
        </ul>
      </main>
    </DashboardShell>
  );
}
