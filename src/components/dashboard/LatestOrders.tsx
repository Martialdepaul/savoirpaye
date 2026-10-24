import Link from "next/link";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { fcfa, orders, type OrderStatus } from "../../lib/dashboard-data";

const badge: Record<OrderStatus, { cls: string; icon: typeof Clock }> = {
  "Payé": { cls: "bg-[#ECF8EF] text-success", icon: CheckCircle2 },
  "En attente": { cls: "bg-[#FDF3E3] text-pending", icon: Clock },
  "Échoué": { cls: "bg-[#FCEDED] text-danger", icon: XCircle },
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const b = badge[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${b.cls}`}>
      <b.icon size={13} /> {status}
    </span>
  );
}

export default function LatestOrders() {
  return (
    <section className="rounded-card border border-line bg-white shadow-soft">
      <div className="flex items-center justify-between gap-3 p-4 sm:p-6 sm:pb-4">
        <h2 className="font-heading text-lg font-bold">Dernières commandes</h2>
        <Link href="/dashboard/commandes" className="-my-3 -mr-2 shrink-0 whitespace-nowrap px-2 py-3 text-sm font-medium text-primary hover:underline">Voir tout</Link>
      </div>

      <ul className="divide-y divide-line border-t border-line sm:hidden">
        {orders.map((o) => (
          <li key={o.id} className="flex items-center justify-between gap-3 px-4 py-3.5">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{o.client}</div>
              <div className="truncate text-xs text-ink-2">{o.product}</div>
              <div className="mt-1.5"><StatusBadge status={o.status} /></div>
            </div>
            <div className="shrink-0 text-right">
              <div className="num text-sm font-semibold text-gold-ink">{fcfa(o.amount)}</div>
              <div className="mt-1 text-xs text-ink-2">{o.when}</div>
            </div>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-y border-line bg-page text-xs uppercase tracking-wider text-ink-2">
              {["Commande", "Client", "Produit", "Montant", "Statut", "Date"].map((h) => (
                <th key={h} scope="col" className={`px-6 py-3 font-semibold ${h === "Montant" ? "text-right" : ""}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-page/60">
                <td className="num px-6 py-4 text-ink-2">{o.id}</td>
                <td className="px-6 py-4 font-medium">{o.client}</td>
                <td className="max-w-[220px] truncate px-6 py-4 text-ink-2">{o.product}</td>
                <td className="num px-6 py-4 text-right font-semibold text-gold-ink">{fcfa(o.amount)}</td>
                <td className="px-6 py-4"><StatusBadge status={o.status} /></td>
                <td className="px-6 py-4 text-ink-2">{o.when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
