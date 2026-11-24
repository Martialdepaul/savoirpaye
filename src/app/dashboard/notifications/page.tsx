"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, CheckCheck, ShoppingBag, ShoppingCart, Wallet } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import EmptyState from "@/components/dashboard/EmptyState";
import Pagination, { usePagination } from "@/components/ui/Pagination";
import { useNotifications, type NotifKind } from "@/components/dashboard/useNotifications";

const kinds: Record<NotifKind, { icon: typeof Bell; cls: string }> = {
  commande: { icon: ShoppingCart, cls: "bg-[#FDF3E3] text-pending" },
  vente: { icon: ShoppingBag, cls: "bg-[#ECF8EF] text-success" },
  retrait: { icon: Wallet, cls: "bg-gold-light text-gold-ink" },
};

const filters = [
  { id: "all", label: "Toutes" },
  { id: "unread", label: "Non lues" },
  { id: "commande", label: "Commandes" },
  { id: "vente", label: "Ventes" },
  { id: "retrait", label: "Retraits" },
] as const;

export default function NotificationsPage() {
  const { items, unread, markAllRead } = useNotifications();
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const list = items.filter((n) => (filter === "all" ? true : filter === "unread" ? n.unread : n.kind === filter));
  const pager = usePagination(list, 15, filter);

  return (
    <DashboardShell active="Notifications">
      <main className="mx-auto max-w-3xl space-y-5 px-4 pb-32 pt-6 sm:px-8 lg:pb-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Notifications</h1>
            <p className="mt-1 text-sm text-ink-2">{unread > 0 ? `${unread} notification${unread > 1 ? "s" : ""} non lue${unread > 1 ? "s" : ""}` : "Vous êtes à jour."}</p>
          </div>
          {items.length > 0 && (
            <button onClick={markAllRead} disabled={unread === 0}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-btn border border-line bg-white px-4 text-sm font-semibold hover:bg-page disabled:opacity-50">
              <CheckCheck size={16} /> Tout marquer comme lu
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <EmptyState icon="bell" title="Aucune notification"
            text="Vous serez prévenu ici, et par e-mail, de chaque nouvelle commande, vente payée et demande de retrait." />
        ) : (
          <>
            <div ref={pager.anchorRef} role="tablist" aria-label="Filtrer" className="-mx-4 flex scroll-mt-20 gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              {filters.map((f) => (
                <button key={f.id} role="tab" aria-selected={filter === f.id} onClick={() => setFilter(f.id)}
                  className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold ${filter === f.id ? "bg-primary text-white" : "border border-line bg-white text-ink-2"}`}>
                  {f.label}
                </button>
              ))}
            </div>

            <ul className="divide-y divide-line overflow-hidden rounded-card border border-line bg-white shadow-soft">
              {list.length === 0 && <li className="p-10 text-center text-sm text-ink-2">Aucune notification ici.</li>}
              {pager.pageItems.map((n) => {
                const k = kinds[n.kind];
                return (
                  <li key={n.id}>
                    <Link href={n.href} className={`flex w-full gap-3 p-4 text-left transition-colors hover:bg-page sm:gap-4 sm:p-5 ${n.unread ? "bg-mint/60" : ""}`}>
                      <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${k.cls}`}><k.icon size={18} /></span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-start justify-between gap-3">
                          <span className="text-sm font-semibold">{n.title}</span>
                          <span className="shrink-0 text-xs text-ink-2">{n.when}</span>
                        </span>
                        <span className="mt-0.5 block text-sm text-ink-2">{n.text}</span>
                      </span>
                      {n.unread && <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-gold" aria-label="Non lue" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Pagination {...pager} onChange={pager.setPage} label="notifications" />
          </>
        )}
      </main>
    </DashboardShell>
  );
}
