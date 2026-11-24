"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bell, ShoppingBag, ShoppingCart, Wallet } from "lucide-react";
import { useNotifications, type NotifKind } from "./useNotifications";

const icons: Record<NotifKind, typeof Bell> = { commande: ShoppingCart, vente: ShoppingBag, retrait: Wallet };

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const { items, unread, markAllRead } = useNotifications();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const click = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", click);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", click); document.removeEventListener("keydown", key); };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="true"
        aria-label={unread ? `Notifications, ${unread} non lue${unread > 1 ? "s" : ""}` : "Notifications"}
        className="relative flex size-11 items-center justify-center rounded-btn border border-line bg-white text-ink-2 hover:text-ink sm:size-10">
        <Bell size={18} />
        {unread > 0 && <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-danger ring-2 ring-white" />}
      </button>
      {open && (
        <div className="fixed inset-x-3 top-[4.25rem] z-50 rounded-card border border-line bg-white shadow-[0_8px_30px_rgb(28_25_23/0.12)] sm:absolute sm:inset-x-auto sm:right-0 sm:top-12 sm:w-96">
          <div className="flex items-center justify-between border-b border-line px-4 py-2">
            <p className="font-heading font-bold">Notifications</p>
            {unread > 0 && <button onClick={markAllRead} className="min-h-10 px-1 text-sm font-semibold text-primary hover:underline">Tout marquer comme lu</button>}
          </div>
          {items.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-ink-2">Vous serez prévenu ici de chaque nouvelle commande, vente et retrait.</p>
          ) : (
            <ul className="max-h-[60vh] divide-y divide-line overflow-y-auto">
              {items.slice(0, 5).map((n) => {
                const I = icons[n.kind];
                return (
                  <li key={n.id}>
                    <Link href={n.href} onClick={() => setOpen(false)} className="flex gap-3 px-4 py-3 hover:bg-page">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary"><I size={16} /></span>
                      <span className="min-w-0 flex-1">
                        <span className={`block text-sm ${n.unread ? "font-semibold text-ink" : "text-ink-2"}`}>{n.title}</span>
                        <span className="block text-xs text-ink-2">{n.text}</span>
                        <span className="mt-0.5 block text-xs text-ink-2">{n.when}</span>
                      </span>
                      {n.unread && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" aria-label="Non lue" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
          <Link href="/dashboard/notifications" onClick={() => setOpen(false)} className="flex min-h-11 items-center justify-center border-t border-line text-sm font-semibold text-primary hover:bg-page">Voir toutes les notifications</Link>
        </div>
      )}
    </div>
  );
}
