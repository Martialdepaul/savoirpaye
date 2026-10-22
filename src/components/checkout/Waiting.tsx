"use client";

import { useEffect, useState } from "react";
import { Smartphone } from "lucide-react";
import { fcfa } from "../../lib/dashboard-data";
import { countries, type Buyer } from "./CheckoutForm";

const TOTAL = 120;

export default function Waiting({ buyer, price, onSuccess, onFailure, onCancel }: { buyer: Buyer; price: number; onSuccess: () => void; onFailure: (r: "expired" | "declined") => void; onCancel: () => void }) {
  const [left, setLeft] = useState(TOTAL);

  useEffect(() => {
    if (left <= 0) { onFailure("expired"); return; }
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left, onFailure]);

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const dial = countries.find((c) => c.name === buyer.country)?.dial;
  const R = 54;
  const C = 2 * Math.PI * R;

  return (
    <div className="mx-auto max-w-md text-center">
      <div className="relative mx-auto size-40" role="timer" aria-label={`Temps restant : ${mm}:${ss}`}>
        <svg viewBox="0 0 120 120" className="size-full -rotate-90">
          <circle cx="60" cy="60" r={R} fill="none" stroke="#E7E5E4" strokeWidth="6" />
          <circle cx="60" cy="60" r={R} fill="none" stroke="#0B5D55" strokeWidth="6" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - left / TOTAL)} className="transition-[stroke-dashoffset] duration-1000 ease-linear" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Smartphone size={26} className="animate-pulse text-primary" />
          <span className="num mt-1 font-heading text-2xl font-extrabold">{mm}:{ss}</span>
        </div>
      </div>

      <h1 className="mt-6 font-heading text-2xl font-extrabold">Confirmez le paiement sur votre téléphone</h1>
      <p className="mt-3 leading-relaxed text-ink-2">
        Une demande de <span className="num font-semibold text-gold-ink">{fcfa(price)}</span> a été envoyée via {buyer.method} au <span className="num font-semibold text-ink">{dial} {buyer.phone}</span>.
        Saisissez votre code secret pour valider.
      </p>
      <p className="mt-2 text-sm text-ink-2">Ne fermez pas cette page.</p>

      <button onClick={onCancel} className="mt-6 rounded-btn border border-line bg-white px-5 py-3 text-sm font-semibold hover:bg-page">Annuler et modifier</button>

      <div className="mt-10 rounded-card border border-dashed border-line p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-ink-2">Simulation (démo)</div>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button onClick={onSuccess} className="rounded-btn bg-success/10 px-4 py-2.5 text-sm font-semibold text-success">Simuler un paiement réussi</button>
          <button onClick={() => onFailure("declined")} className="rounded-btn bg-danger/10 px-4 py-2.5 text-sm font-semibold text-danger">Simuler un échec</button>
        </div>
      </div>
    </div>
  );
}
