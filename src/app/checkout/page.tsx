"use client";

import { useCallback, useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import Logo from "../../components/ui/Logo";
import Summary from "../../components/checkout/Summary";
import CheckoutForm, { type Buyer } from "../../components/checkout/CheckoutForm";
import Waiting from "../../components/checkout/Waiting";
import { Success, Failure } from "../../components/checkout/Result";
import { COURSE_URL } from "../../lib/sales-data";

type Phase = "form" | "waiting" | "success" | "failure";

export default function CheckoutPage() {
  const [phase, setPhase] = useState<Phase>("form");
  const [reason, setReason] = useState<"expired" | "declined">("declined");
  const [buyer, setBuyer] = useState<Buyer>({ name: "", email: "", phone: "", country: "Sénégal", method: "" });

  const fail = useCallback((r: "expired" | "declined") => { setReason(r); setPhase("failure"); }, []);
  const go = (p: Phase) => { setPhase(p); window.scrollTo({ top: 0 }); };

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <Logo />
          <span className="flex items-center gap-1.5 text-sm text-ink-2"><Lock size={15} className="text-success" /> Paiement sécurisé</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8 sm:py-12">
        {phase === "form" && (
          <>
            <a href={COURSE_URL} className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-ink-2 hover:text-ink"><ArrowLeft size={16} /> Retour à la formation</a>
            <h1 className="mb-6 font-heading text-3xl font-extrabold">Finaliser votre commande</h1>
            <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-10">
              <div className="order-2 lg:order-1"><CheckoutForm value={buyer} onChange={setBuyer} onSubmit={() => go("waiting")} /></div>
              <div className="order-1 lg:sticky lg:top-6 lg:order-2"><Summary /></div>
            </div>
          </>
        )}
        {phase === "waiting" && <Waiting buyer={buyer} onSuccess={() => go("success")} onFailure={fail} onCancel={() => go("form")} />}
        {phase === "success" && <Success buyer={buyer} />}
        {phase === "failure" && <Failure reason={reason} onRetry={() => go("form")} />}
      </main>
    </div>
  );
}
