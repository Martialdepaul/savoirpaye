"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Globe, PartyPopper } from "lucide-react";
import AuthShell from "../../components/auth/AuthShell";
import Field, { inputCls } from "../../components/auth/Field";
import { onboardingGoals } from "../../lib/site-data";
import { paymentMethods } from "../../lib/mock-data";

const steps = ["Votre objectif", "Votre boutique", "Vos retraits"];

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState("formations");
  const [shop, setShop] = useState("Aïssata Formations");
  const [method, setMethod] = useState("Orange Money");
  const [done, setDone] = useState(false);
  const slug = slugify(shop) || "ma-boutique";

  if (done) {
    return (
      <AuthShell>
        <div className="text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-gold-light text-gold-ink"><PartyPopper size={30} /></span>
          <h1 className="mt-6 font-heading text-3xl font-extrabold">Votre boutique est prête !</h1>
          <p className="mt-2 text-ink-2">Elle est accessible à l'adresse :</p>
          <p className="mt-3 break-all rounded-btn bg-mint px-4 py-3 font-semibold text-primary">savoirpay.com/boutique/{slug}</p>
          <div className="mt-8 grid gap-3">
            <a href="/dashboard/produits/nouveau" className="rounded-btn bg-gold py-3.5 font-bold text-forest hover:bg-gold-hover">Créer mon premier produit</a>
            <a href="/dashboard" className="rounded-btn border border-line py-3.5 font-semibold hover:bg-page">Aller au tableau de bord</a>
          </div>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <ol className="mb-8 flex items-center gap-2" aria-label="Progression">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 flex-col gap-2">
            <span className={`h-1.5 rounded-full ${i <= step ? "bg-primary" : "bg-line"}`} />
            <span className={`text-xs font-medium ${i === step ? "text-ink" : "text-ink-2"}`}>{s}</span>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <>
          <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Que souhaitez-vous vendre ?</h1>
          <p className="mt-2 text-ink-2">Nous adaptons votre espace à votre activité. Vous pourrez tout changer plus tard.</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {onboardingGoals.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setGoal(g.id)}
                aria-pressed={goal === g.id}
                className={`relative flex flex-col items-start gap-3 rounded-card border p-4 text-left text-sm font-semibold transition-colors ${
                  goal === g.id ? "border-primary bg-primary-light text-primary ring-1 ring-primary" : "border-line hover:border-primary/40"
                }`}
              >
                <g.icon size={22} />
                {g.label}
                {goal === g.id && <Check size={16} className="absolute right-3 top-3" />}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Nommez votre boutique</h1>
          <p className="mt-2 text-ink-2">C'est le nom que verront vos clients. Chaque boutique a son propre espace sécurisé.</p>
          <div className="mt-6 space-y-4">
            <Field label="Nom de la boutique" value={shop} onChange={(e) => setShop(e.target.value)} required />
            <div className="rounded-btn border border-dashed border-primary/40 bg-mint p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary"><Globe size={14} /> Adresse de votre boutique</div>
              <div className="mt-1 break-all text-sm"><span className="text-ink-2">savoirpay.com/boutique/</span><span className="font-semibold">{slug}</span></div>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">Catégorie</span>
              <select className={inputCls}>
                {["Business et entrepreneuriat", "Informatique et bureautique", "Beauté et bien-être", "Langues", "Cuisine", "Développement personnel", "Autre"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Où recevoir vos gains ?</h1>
          <p className="mt-2 text-ink-2">Choisissez le moyen de retrait par défaut. Vous pourrez en ajouter d'autres.</p>
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {paymentMethods.map((m) => (
              <button
                key={m.name}
                type="button"
                onClick={() => setMethod(m.name)}
                aria-pressed={method === m.name}
                className={`flex items-center gap-2 rounded-btn border px-3 py-3 text-left text-sm font-semibold ${method === m.name ? "border-primary bg-primary-light ring-1 ring-primary" : "border-line"}`}
              >
                <span className="size-3 shrink-0 rounded-full" style={{ background: m.color }} aria-hidden /> {m.name}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <Field label={method === "Carte bancaire" ? "IBAN ou numéro de compte" : `Numéro ${method}`} type="tel" placeholder="+221 77 000 00 00" />
          </div>
        </>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 rounded-btn px-3 py-3 text-sm font-semibold text-ink-2 hover:text-ink">
            <ArrowLeft size={16} /> Retour
          </button>
        ) : (
          <button onClick={() => router.push("/dashboard")} className="px-3 py-3 text-sm font-semibold text-ink-2 hover:text-ink">Passer</button>
        )}
        <button
          onClick={() => (step < steps.length - 1 ? setStep(step + 1) : setDone(true))}
          className="flex items-center gap-2 rounded-btn bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-hover"
        >
          {step < steps.length - 1 ? "Continuer" : "Terminer"} <ArrowRight size={17} />
        </button>
      </div>
    </AuthShell>
  );
}
