"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Mail, CheckCircle2, Ban, Loader2, MessageCircle, Info } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import BottomNav from "@/components/dashboard/BottomNav";
import EmptyState from "@/components/dashboard/EmptyState";
import { fcfa, formatDateTime, isPaid, timeAgo, type Order, type OrderStatus } from "@/lib/dashboard-data";
import { StatusBadge } from "@/components/dashboard/LatestOrders";
import { useAccount, useShopData } from "@/components/dashboard/AccountContext";
import Pagination, { usePagination } from "@/components/ui/Pagination";
import { useToast } from "@/components/ui/Toast";
import { cancelOrder, markOrderPaid, resendOrderEmail } from "@/app/actions/orders";

type StatusFilter = "Toutes" | OrderStatus;
const statusFilters: StatusFilter[] = ["Toutes", "En attente", "Payé", "Annulé"];

const waLink = (phone: string, text: string) => `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

function OrderDrawer({ order: o, onClose, notify }: { order: Order; onClose: () => void; notify: (m: string) => void }) {
  const router = useRouter();
  const shopName = useAccount()?.shop?.name ?? "";
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const run = async (key: string, fn: () => Promise<{ ok: boolean; error?: string } | null>, msg: string, confirm?: string) => {
    if (confirm && !window.confirm(confirm)) return;
    setBusy(key);
    setError("");
    const res = await fn().catch(() => null);
    setBusy(null);
    if (!res || !res.ok) return setError(res?.error ?? "Connexion impossible. Réessayez.");
    notify(msg);
    router.refresh();
    if (key !== "mail") onClose();
  };

  const message = o.status === "En attente"
    ? `Bonjour ${o.client.split(" ")[0]}, merci pour votre commande ${o.ref} « ${o.product} » (${fcfa(o.amount)}) sur ${shopName}. Pour finaliser, vous pouvez payer par ${o.method} sur ce numéro. Dès réception, vous recevez votre accès par e-mail.`
    : `Bonjour ${o.client.split(" ")[0]}, merci pour votre achat « ${o.product} » (commande ${o.ref}).`;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={`Commande ${o.ref}`}>
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <h2 className="font-heading text-lg font-bold">Commande <span className="num">{o.ref}</span></h2>
          <button onClick={onClose} aria-label="Fermer" className="flex size-11 items-center justify-center rounded-btn text-ink-2 hover:bg-page hover:text-ink"><X size={20} /></button>
        </div>
        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          <div className="flex items-center justify-between gap-3">
            <StatusBadge status={o.status} />
            <span className="text-sm text-ink-2">{formatDateTime(o.date)}</span>
          </div>
          {o.status === "En attente" && (
            <p className="flex items-start gap-2 rounded-btn bg-[#FDF3E3] p-3 text-sm text-ink">
              <Info size={16} className="mt-0.5 shrink-0 text-pending" />
              Contactez votre client pour recevoir le paiement ({o.method}). Une fois l'argent reçu, marquez la commande comme payée : il reçoit aussitôt son accès par e-mail.
            </p>
          )}
          <div className="rounded-card border border-line bg-page p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-2">Client</p>
            <p className="font-semibold text-ink">{o.client}</p>
            <a href={`mailto:${o.email}`} className="block break-all text-sm text-primary hover:underline">{o.email}</a>
            <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="block text-sm text-ink-2 hover:text-ink">{o.phone}</a>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-ink-2">Produit</p>
            <p className="text-sm text-ink">{o.product}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-card border border-line bg-page p-3">
              <p className="text-xs text-ink-2">Montant</p>
              <p className="num mt-1 font-bold text-gold-ink">{fcfa(o.amount)}</p>
            </div>
            <div className="rounded-card border border-line bg-page p-3">
              <p className="text-xs text-ink-2">Paiement</p>
              <p className="mt-1 font-semibold text-ink">{o.method}</p>
            </div>
          </div>
          {isPaid(o) && (
            <p className="text-sm text-ink-2">
              Payée le {formatDateTime(o.paidAt ?? o.date)}{o.offPlatform ? " · paiement reçu directement par vous (hors portefeuille Savoirpay)" : ""}.
            </p>
          )}
          {error && <p role="alert" className="text-sm text-danger">{error}</p>}
        </div>
        <div className="space-y-2 border-t border-line p-5">
          {o.status === "En attente" && (
            <button onClick={() => run("paid", () => markOrderPaid(o.id), "Commande payée : l'accès a été envoyé au client", `Confirmez-vous avoir reçu ${fcfa(o.amount)} de ${o.client} ?`)} disabled={!!busy}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-btn bg-primary px-5 font-bold text-white hover:bg-primary-hover disabled:opacity-60">
              {busy === "paid" ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />} Marquer comme payée
            </button>
          )}
          <a href={waLink(o.phone, message)} target="_blank" rel="noopener" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-btn border border-line bg-white px-5 font-semibold text-ink hover:bg-page">
            <MessageCircle size={16} className="text-success" /> Écrire sur WhatsApp
          </a>
          {o.status !== "Annulé" && (
            <button onClick={() => run("mail", () => resendOrderEmail(o.id), `E-mail renvoyé à ${o.email}`)} disabled={!!busy}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-btn border border-line bg-white px-5 font-semibold text-ink hover:bg-page disabled:opacity-60">
              {busy === "mail" ? <Loader2 size={16} className="animate-spin" /> : <Mail size={16} />} {isPaid(o) ? "Renvoyer l'accès par e-mail" : "Renvoyer le récapitulatif"}
            </button>
          )}
          {o.status === "En attente" && (
            <button onClick={() => run("cancel", () => cancelOrder(o.id), "Commande annulée", "Annuler cette commande ? Le client ne recevra pas d'accès.")} disabled={!!busy}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-btn px-5 text-sm font-semibold text-danger hover:bg-[#FCEDED] disabled:opacity-60">
              {busy === "cancel" ? <Loader2 size={15} className="animate-spin" /> : <Ban size={15} />} Annuler la commande
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CommandesPage() {
  const { orders } = useShopData();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Toutes");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, showToast] = useToast();

  // Ouverture directe d'une commande (?commande=…), depuis l'accueil ou une notification
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("commande");
    if (id) setSelectedId(id);
  }, []);
  const selected = orders.find((o) => o.id === selectedId) ?? null;

  const q = search.toLowerCase();
  const filtered = orders.filter((o) =>
    (o.client.toLowerCase().includes(q) || o.ref.toLowerCase().includes(q) || o.product.toLowerCase().includes(q) || o.email.includes(q)) &&
    (statusFilter === "Toutes" || o.status === statusFilter));
  const pager = usePagination(filtered, 10, `${search}|${statusFilter}`);

  const paid = orders.filter(isPaid);
  const pending = orders.filter((o) => o.status === "En attente");
  const totalRevenue = paid.reduce((s, o) => s + o.amount, 0);

  return (
    <div className="min-h-screen">
      <Sidebar active="Commandes" />
      <div className="lg:pl-64">
        <Topbar />
        <main className="mx-auto max-w-6xl space-y-5 px-4 pb-32 pt-6 sm:px-8 lg:pb-12">
          <div>
            <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Commandes</h1>
            <p className="mt-1 text-sm text-ink-2">Toutes les commandes passées sur vos pages de vente.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            <div className="rounded-card border border-line bg-white p-4 shadow-soft">
              <p className="text-xs text-ink-2">En attente de paiement</p>
              <p className="num mt-1 text-2xl font-extrabold text-pending">{pending.length}</p>
            </div>
            <div className="rounded-card border border-line bg-white p-4 shadow-soft">
              <p className="text-xs text-ink-2">Payées</p>
              <p className="num mt-1 text-2xl font-extrabold text-success">{paid.length}</p>
              <p className="text-xs text-ink-2">sur {orders.length} commande{orders.length > 1 ? "s" : ""}</p>
            </div>
            <div className="col-span-2 rounded-card border border-line bg-white p-4 shadow-soft sm:col-span-1">
              <p className="text-xs text-ink-2">Chiffre d&apos;affaires</p>
              <p className="num mt-1 text-xl font-extrabold text-gold-ink">{fcfa(totalRevenue)}</p>
            </div>
          </div>

          {orders.length === 0 ? (
            <EmptyState icon="orders" title="Aucune commande pour le moment"
              text="Quand un client commande sur l'une de vos pages de vente, sa commande apparaît ici et vous recevez un e-mail."
              cta={{ label: "Voir mes produits", href: "/dashboard/produits" }} />
          ) : (
            <>
              <div ref={pager.anchorRef} className="flex scroll-mt-20 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative sm:w-[280px]">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-2" />
                  <input type="search" placeholder="Client, référence, produit…" aria-label="Rechercher une commande" value={search} onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-btn border border-line bg-white py-2.5 pl-9 pr-4 text-base focus:border-primary focus:outline-none sm:text-sm" />
                </div>
                <div className="flex gap-1 overflow-x-auto rounded-btn border border-line bg-white p-1">
                  {statusFilters.map((s) => (
                    <button key={s} onClick={() => setStatusFilter(s)} aria-pressed={statusFilter === s}
                      className={`min-h-10 whitespace-nowrap rounded-lg px-4 text-sm font-medium transition-colors ${statusFilter === s ? "bg-primary text-white" : "text-ink-2 hover:text-ink"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:hidden">
                {pager.pageItems.map((o) => (
                  <li key={o.id}>
                    <button onClick={() => setSelectedId(o.id)} className="block w-full rounded-card border border-line bg-white p-4 text-left shadow-soft hover:border-primary/40">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-ink">{o.client}</p>
                          <p className="truncate text-xs text-ink-2">{o.email}</p>
                          <p className="mt-1 truncate text-xs text-ink-2">{o.product}</p>
                        </div>
                        <StatusBadge status={o.status} />
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="num font-bold text-gold-ink">{fcfa(o.amount)}</span>
                        <span className="text-xs text-ink-2">{timeAgo(o.date)}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>

              <section className="hidden overflow-hidden rounded-card border border-line bg-white shadow-soft md:block">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-line bg-page text-xs uppercase tracking-wider text-ink-2">
                        {["Commande", "Client", "Produit", "Montant", "Paiement", "Statut", "Date"].map((h) => (
                          <th key={h} scope="col" className={`px-6 py-3 font-semibold ${h === "Montant" ? "text-right" : ""}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {pager.pageItems.map((o) => (
                        <tr key={o.id} onClick={() => setSelectedId(o.id)} className="cursor-pointer hover:bg-page/60">
                          <td className="num px-6 py-4"><button onClick={() => setSelectedId(o.id)} className="text-ink-2 hover:text-primary">{o.ref}</button></td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-ink">{o.client}</div>
                            <div className="text-xs text-ink-2">{o.email}</div>
                          </td>
                          <td className="max-w-[200px] truncate px-6 py-4 text-ink-2">{o.product}</td>
                          <td className="num whitespace-nowrap px-6 py-4 text-right font-semibold text-gold-ink">{fcfa(o.amount)}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-ink-2">{o.method}</td>
                          <td className="px-6 py-4"><StatusBadge status={o.status} /></td>
                          <td className="whitespace-nowrap px-6 py-4 text-ink-2">{timeAgo(o.date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {filtered.length === 0 ? (
                <p className="rounded-card border border-dashed border-line bg-white py-12 text-center text-sm text-ink-2">Aucune commande ne correspond à votre recherche.</p>
              ) : (
                <Pagination {...pager} onChange={pager.setPage} label="commandes" />
              )}
            </>
          )}
        </main>
      </div>
      <BottomNav active="Commandes" />
      {toast}
      {selected && <OrderDrawer order={selected} onClose={() => setSelectedId(null)} notify={showToast} />}
    </div>
  );
}
