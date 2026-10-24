"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, MailCheck } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Field, SubmitButton, inputCls, isEmail, isPhone } from "@/components/auth/fields";

export default function ForgotPasswordPage() {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const send = () => {
    setLoading(true);
    // Simulation de l'envoi, à remplacer par l'API
    setTimeout(() => { setLoading(false); setSent(true); setCooldown(30); }, 800);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmail(id) && !isPhone(id)) {
      setError("Saisissez votre adresse e-mail ou votre numéro de téléphone.");
      return document.getElementById("reset-id")?.focus();
    }
    send();
  };

  const back = <Link href="/connexion" className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:underline"><ArrowLeft size={16} /> Retour à la connexion</Link>;

  if (sent) {
    return (
      <AuthLayout title="Vérifiez vos messages" footer={back}>
        <div className="rounded-card border border-line bg-white p-6 text-center shadow-soft">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-light text-primary"><MailCheck size={28} /></span>
          <p className="mt-4 leading-relaxed text-ink-2">
            Si un compte est associé à <strong className="break-all text-ink">{id}</strong>, vous allez recevoir un lien pour choisir un nouveau mot de passe. Il est valable 30 minutes.
          </p>
          <button type="button" onClick={send} disabled={cooldown > 0 || loading}
            className="num mt-5 min-h-11 rounded-btn px-4 text-sm font-semibold text-primary hover:bg-primary-light disabled:text-ink-2 disabled:hover:bg-transparent">
            {cooldown > 0 ? `Renvoyer le lien (${cooldown} s)` : loading ? "Envoi…" : "Renvoyer le lien"}
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Mot de passe oublié" subtitle="Indiquez l'e-mail ou le numéro de votre compte. Nous vous envoyons un lien pour le réinitialiser." footer={back}>
      <form onSubmit={submit} noValidate className="space-y-5">
        <Field id="reset-id" label="E-mail ou numéro de téléphone" error={error}>
          <input id="reset-id" autoComplete="username" value={id} onChange={(e) => { setId(e.target.value); setError(""); }} placeholder="vous@exemple.com"
            aria-invalid={!!error} aria-describedby={error ? "reset-id-error" : undefined} className={inputCls(!!error)} />
        </Field>
        <SubmitButton loading={loading}>{loading ? "Envoi…" : "Envoyer le lien"}</SubmitButton>
      </form>
    </AuthLayout>
  );
}
