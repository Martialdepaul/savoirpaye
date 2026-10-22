"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Field, PasswordInput, PasswordStrength, SubmitButton, inputCls, isEmail, isPhone, passwordOk } from "@/components/auth/fields";
import { countries } from "@/components/checkout/CheckoutForm";

type Form = { name: string; email: string; country: string; phone: string; password: string; terms: boolean };
type Errors = Partial<Record<keyof Form, string>>;

const iso: Record<string, string> = { "Sénégal": "SN", "Côte d'Ivoire": "CI", Cameroun: "CM", Mali: "ML", "Bénin": "BJ", "Burkina Faso": "BF", Togo: "TG", Gabon: "GA" };
const offers: Record<string, string> = { starter: "Starter (gratuite)", pro: "Pro", business: "Business" };

function SignupForm() {
  const offer = offers[useSearchParams().get("offre") ?? ""];
  const [f, setF] = useState<Form>({ name: "", email: "", country: "Sénégal", phone: "", password: "", terms: false });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const set = <K extends keyof Form>(k: K, v: Form[K]) => { setF({ ...f, [k]: v }); if (errors[k]) setErrors({ ...errors, [k]: undefined }); };
  const dial = countries.find((c) => c.name === f.country)?.dial;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Errors = {};
    if (f.name.trim().length < 3) er.name = "Indiquez votre nom complet.";
    if (!isEmail(f.email)) er.email = "Saisissez une adresse e-mail valide.";
    if (!isPhone(f.phone)) er.phone = "Saisissez un numéro de téléphone valide.";
    if (!passwordOk(f.password)) er.password = "Le mot de passe ne respecte pas encore toutes les règles.";
    if (!f.terms) er.terms = "Vous devez accepter les conditions pour créer un compte.";
    setErrors(er);
    const first = Object.keys(er)[0];
    if (first) return document.getElementById(first)?.focus();
    setLoading(true);
    // Simulation de la création de compte, à remplacer par l'API
    setTimeout(() => (window.location.href = "/dashboard"), 900);
  };

  return (
    <AuthLayout
      title="Créez votre compte"
      subtitle="Gratuit, sans carte bancaire. Votre boutique est prête en 2 minutes."
      footer={<>Déjà un compte ? <a href="/connexion" className="inline-block py-2 font-semibold text-primary hover:underline">Se connecter</a></>}
    >
      {offer && (
        <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-gold-light px-3.5 py-2 text-sm font-semibold text-gold-ink">
          <Sparkles size={15} /> Offre {offer} sélectionnée
        </p>
      )}
      <form onSubmit={submit} noValidate className="space-y-5">
        <Field id="name" label="Nom complet" error={errors.name}>
          <input id="name" autoComplete="name" value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex. : Aminata Diallo"
            aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className={inputCls(!!errors.name)} />
        </Field>
        <Field id="email" label="Adresse e-mail" error={errors.email}>
          <input id="email" type="email" autoComplete="email" inputMode="email" value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="vous@exemple.com"
            aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className={inputCls(!!errors.email)} />
        </Field>
        <Field id="phone" label="Numéro WhatsApp" error={errors.phone} hint={<p className="mt-1.5 text-xs text-ink-2">Pour recevoir vos notifications de vente et retirer vos gains.</p>}>
          <div className="flex gap-2">
            <label htmlFor="country" className="sr-only">Indicatif du pays</label>
            <select id="country" value={f.country} onChange={(e) => set("country", e.target.value)} aria-label="Pays" className={`${inputCls().replace("w-full", "")} w-32 shrink-0 pl-3 pr-8`}>
              {countries.map((c) => <option key={c.name} value={c.name} aria-label={`${c.name} ${c.dial}`}>{iso[c.name] ?? ""} {c.dial}</option>)}
            </select>
            <input id="phone" type="tel" autoComplete="tel-national" inputMode="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} placeholder="77 123 45 67"
              aria-label={`Numéro de téléphone (${dial})`} aria-invalid={!!errors.phone} className={`${inputCls(!!errors.phone)} min-w-0`} />
          </div>
        </Field>
        <Field id="password" label="Mot de passe" error={errors.password}>
          <PasswordInput id="password" autoComplete="new-password" value={f.password} onChange={(e) => set("password", e.target.value)} invalid={!!errors.password} />
          <PasswordStrength value={f.password} />
        </Field>
        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-2">
            <input id="terms" type="checkbox" checked={f.terms} onChange={(e) => set("terms", e.target.checked)} aria-invalid={!!errors.terms} className="mt-0.5 size-5 shrink-0 accent-[var(--color-primary)]" />
            <span>J'accepte les <a href="/cgu" target="_blank" className="font-semibold text-primary hover:underline">conditions d'utilisation</a> et la <a href="/confidentialite" target="_blank" className="font-semibold text-primary hover:underline">politique de confidentialité</a>.</span>
          </label>
          {errors.terms && <p role="alert" className="mt-1.5 text-sm text-danger">{errors.terms}</p>}
        </div>
        <SubmitButton loading={loading}>{loading ? "Création du compte…" : "Créer mon compte"}</SubmitButton>
      </form>
    </AuthLayout>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupForm />
    </Suspense>
  );
}
