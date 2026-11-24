"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "@/lib/site-config";
import { useAccount, useShopData } from "./AccountContext";

/** Étapes de démarrage, cochées d'après les vraies données ; disparaît après la première vente */
export default function GettingStarted() {
  const account = useAccount();
  const { products, orders } = useShopData();
  const [copied, setCopied] = useState(false);
  if (!account || orders.some((o) => o.status === "Payé")) return null;

  const shop = account.shop;
  const published = products.some((p) => p.status === "En ligne");
  const url = shop ? `${site.url}/boutique/${shop.slug}` : "";
  const steps = [
    { done: !!shop, title: "Configurer votre boutique", text: "Nom, catégorie et compte de retrait.", href: "/onboarding", cta: "Configurer" },
    { done: products.length > 0, title: "Créer votre premier produit", text: "Formation, produit numérique ou séance de coaching.", href: "/dashboard/produits/nouveau", cta: "Créer" },
    { done: published, title: "Le mettre en ligne", text: "Choisissez « En ligne » dans l'éditeur pour ouvrir la vente.", href: products[0] ? `/dashboard/produits/${products[0].id}/modifier` : "/dashboard/produits/nouveau", cta: "Publier" },
    { done: orders.length > 0, title: "Partager le lien de votre boutique", text: "Sur WhatsApp, Facebook, Instagram ou TikTok.", href: "", cta: "" },
  ];
  const doneCount = steps.filter((s) => s.done).length;
  const next = steps.findIndex((s) => !s.done);

  const copy = () => navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }, () => {});

  return (
    <section className="rounded-card border border-line bg-white p-4 shadow-soft sm:p-6">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-heading text-lg font-bold">Premiers pas</h2>
        <span className="num text-sm text-ink-2">{doneCount} / {steps.length}</span>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-page"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(doneCount / steps.length) * 100}%` }} /></div>
      <ol className="mt-4 space-y-2">
        {steps.map((s, i) => (
          <li key={s.title} className={`flex flex-wrap items-center gap-3 rounded-btn p-3 sm:flex-nowrap ${i === next ? "bg-mint" : ""}`}>
            <span className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${s.done ? "bg-primary text-white" : "border-2 border-line text-ink-2"}`}>
              {s.done ? <Check size={14} strokeWidth={3} /> : i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-semibold ${s.done ? "text-ink-2 line-through" : ""}`}>{s.title}</p>
              {!s.done && <p className="text-xs text-ink-2">{s.text}</p>}
            </div>
            {i === next && (i === 3 ? (
              url && (
                <button type="button" onClick={copy} className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-btn bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-hover sm:w-auto">
                  {copied ? <><Check size={15} /> Lien copié</> : <><Copy size={15} /> Copier le lien</>}
                </button>
              )
            ) : (
              <Link href={s.href} className="inline-flex min-h-11 w-full items-center justify-center rounded-btn bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-hover sm:w-auto">{s.cta}</Link>
            ))}
          </li>
        ))}
      </ol>
    </section>
  );
}
