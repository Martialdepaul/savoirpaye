"use client";

import { Suspense, useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import Logo from "../../components/ui/Logo";
import Summary from "../../components/checkout/Summary";
import CheckoutForm, { type Buyer } from "../../components/checkout/CheckoutForm";
import Waiting from "../../components/checkout/Waiting";
import { Success, Failure } from "../../components/checkout/Result";
import { findProduct, productUrl } from "../../lib/catalog";

type Phase = "form" | "waiting" | "success" | "failure";

const DEFAULT_PRODUCT = "vendre-sur-whatsapp-business";

function Checkout() {
  const params = useSearchParams();
  const product = findProduct(params.get("produit") ?? DEFAULT_PRODUCT) ?? findProduct(DEFAULT_PRODUCT)!;
  const [phase, setPhase] = useState<Phase>("form");
  const [reason, setReason] = useState<"expired" | "declined">("declined");
  const [buyer, setBuyer] = useState<Buyer>({ name: "", email: "", phone: "", country: "Sénégal", method: "" });

  const fail = useCallback((r: "expired" | "declined") => { setReason(r); setPhase("failure"); }, []);
  const go = (p: Phase) => { setPhase(p); window.scrollTo({ top: 0 }); };

  return (
    <main className="mx-auto max-w-5xl px-5 py-8 sm:py-12">
      {phase === "form" && (
        <>
          <a href={productUrl(product)} className="mb-2 -ml-1 inline-flex items-center gap-2 px-1 py-3 text-sm font-medium text-ink-2 hover:text-ink"><ArrowLeft size={16} /> Retour au produit</a>
          <h1 className="mb-6 font-heading text-3xl font-extrabold">Finaliser votre commande</h1>
          <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-10">
            <div className="order-2 lg:order-1"><CheckoutForm value={buyer} price={product.price} onChange={setBuyer} onSubmit={() => go("waiting")} /></div>
            <div className="order-1 lg:sticky lg:top-6 lg:order-2"><Summary product={product} /></div>
          </div>
        </>
      )}
      {phase === "waiting" && <Waiting buyer={buyer} price={product.price} onSuccess={() => go("success")} onFailure={fail} onCancel={() => go("form")} />}
      {phase === "success" && <Success buyer={buyer} product={product} />}
      {phase === "failure" && <Failure reason={reason} product={product} onRetry={() => go("form")} />}
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <Logo />
          <span className="flex items-center gap-1.5 text-sm text-ink-2"><Lock size={15} className="text-success" /> Paiement sécurisé</span>
        </div>
      </header>
      <Suspense fallback={<div className="mx-auto h-96 max-w-5xl animate-pulse px-5 py-12" aria-busy="true" />}>
        <Checkout />
      </Suspense>
    </div>
  );
}
