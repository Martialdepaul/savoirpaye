"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, TrendingDown } from "lucide-react";
import { transactions, fcfa, type TxType } from "@/lib/wallet-data";

const filters: { id: TxType | "all"; label: string }[] = [
  { id: "all", label: "Tout" },
  { id: "vente", label: "Ventes" },
  { id: "commission", label: "Commissions" },
  { id: "retrait", label: "Retraits" },
];

function TxIcon({ type }: { type: TxType; amount: number }) {
  if (type === "vente") return <div className="flex size-9 items-center justify-center rounded-full bg-[#f0faf5] text-success"><ArrowDownLeft size={17} /></div>;
  if (type === "retrait") return <div className="flex size-9 items-center justify-center rounded-full bg-[#fef6ec] text-pending"><ArrowUpRight size={17} /></div>;
  return <div className="flex size-9 items-center justify-center rounded-full bg-line text-ink-2"><TrendingDown size={17} /></div>;
}

function statusBadge(status: string) {
  if (status === "Confirmé") return <span className="rounded-md bg-[#f0faf5] px-2 py-0.5 text-[11px] font-bold text-success">{status}</span>;
  if (status === "Traité") return <span className="rounded-md bg-primary-light px-2 py-0.5 text-[11px] font-bold text-primary">{status}</span>;
  return <span className="rounded-md bg-[#fef6ec] px-2 py-0.5 text-[11px] font-bold text-pending">{status}</span>;
}

export default function TransactionHistory() {
  const [filter, setFilter] = useState<TxType | "all">("all");
  const visible = filter === "all" ? transactions : transactions.filter((t) => t.type === filter);

  return (
    <section className="rounded-card border border-line bg-white shadow-soft">
      <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <h2 className="font-heading text-base font-bold">Historique des transactions</h2>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filtre des transactions">
          {filters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                filter === f.id ? "bg-primary text-white" : "bg-page text-ink-2 hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-line">
        {visible.length === 0 && (
          <div className="py-12 text-center text-sm text-ink-2">Aucune transaction</div>
        )}
        {visible.map((tx) => (
          <div key={tx.id} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
            <TxIcon type={tx.type} amount={tx.amount} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-ink">{tx.label}</span>
                {statusBadge(tx.status)}
              </div>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-ink-2">
                <span>{tx.date}</span>
                {tx.method && <><span>·</span><span>{tx.method}</span></>}
                <span>·</span><span className="text-ink-2/60">{tx.id}</span>
              </div>
            </div>
            <div className={`num shrink-0 font-heading text-base font-bold ${tx.amount > 0 ? "text-success" : "text-ink-2"}`}>
              {tx.amount > 0 ? "+" : ""}{fcfa(Math.abs(tx.amount))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
