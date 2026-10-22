"use client";

import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Field, PasswordInput, SubmitButton, inputCls, isEmail, isPhone } from "@/components/auth/fields";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ id?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: typeof errors = {};
    if (!isEmail(id) && !isPhone(id)) er.id = "Saisissez votre adresse e-mail ou votre numéro de téléphone.";
    if (!password) er.password = "Saisissez votre mot de passe.";
    setErrors(er);
    if (er.id) return document.getElementById("login-id")?.focus();
    if (er.password) return document.getElementById("password")?.focus();
    setLoading(true);
    // Simulation de la connexion, à remplacer par l'API
    setTimeout(() => (window.location.href = "/dashboard"), 800);
  };

  return (
    <AuthLayout
      title="Bon retour parmi nous"
      subtitle="Connectez-vous pour gérer votre boutique et suivre vos ventes."
      footer={<>Pas encore de compte ? <a href="/inscription" className="inline-block py-2 font-semibold text-primary hover:underline">Créer un compte gratuit</a></>}
    >
      <form onSubmit={submit} noValidate className="space-y-5">
        <Field id="login-id" label="E-mail ou numéro de téléphone" error={errors.id}>
          <input id="login-id" autoComplete="username" value={id} onChange={(e) => { setId(e.target.value); setErrors({ ...errors, id: undefined }); }}
            placeholder="vous@exemple.com ou 77 123 45 67" aria-invalid={!!errors.id} aria-describedby={errors.id ? "login-id-error" : undefined} className={inputCls(!!errors.id)} />
        </Field>
        <Field id="password" label="Mot de passe" error={errors.password}>
          <PasswordInput id="password" autoComplete="current-password" value={password} onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, password: undefined }); }} invalid={!!errors.password} />
        </Field>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm text-ink-2">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="size-5 accent-[var(--color-primary)]" />
            Rester connecté
          </label>
          <a href="/mot-de-passe-oublie" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary hover:underline">Mot de passe oublié ?</a>
        </div>
        <SubmitButton loading={loading}>{loading ? "Connexion…" : "Se connecter"}</SubmitButton>
      </form>
    </AuthLayout>
  );
}
