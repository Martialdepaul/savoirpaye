"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Divider, Field, FormError, GoogleButton, PasswordInput, SubmitButton, googleErrorFromUrl, inputCls, isEmail, nextPath } from "@/components/auth/fields";
import { authClient, authErrorMessage, useRedirectIfSignedIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [google, setGoogle] = useState(false);

  useEffect(() => setFormError(googleErrorFromUrl()), []);
  useRedirectIfSignedIn(() => nextPath());

  const withGoogle = async () => {
    setGoogle(true);
    setFormError("");
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: nextPath(),
      newUserCallbackURL: "/onboarding",
      errorCallbackURL: "/connexion",
    });
    if (error) {
      setGoogle(false);
      setFormError(authErrorMessage(error));
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: typeof errors = {};
    if (!isEmail(email)) er.email = "Saisissez votre adresse e-mail.";
    if (!password) er.password = "Saisissez votre mot de passe.";
    setErrors(er);
    if (er.email) return document.getElementById("login-id")?.focus();
    if (er.password) return document.getElementById("password")?.focus();
    setLoading(true);
    setFormError("");
    const { error } = await authClient.signIn.email({ email: email.trim(), password, rememberMe: remember });
    if (error) {
      setLoading(false);
      return setFormError(authErrorMessage(error));
    }
    router.push(nextPath());
    router.refresh();
  };

  return (
    <AuthLayout
      title="Bon retour parmi nous"
      subtitle="Connectez-vous pour gérer votre boutique et suivre vos ventes."
      footer={<>Pas encore de compte ? <Link href="/inscription" className="inline-block py-3 font-semibold text-primary hover:underline">Créer un compte gratuit</Link></>}
    >
      <GoogleButton loading={google} disabled={loading} onClick={withGoogle} />
      <Divider>ou avec votre e-mail</Divider>
      <form onSubmit={submit} noValidate className="space-y-5">
        <FormError>{formError}</FormError>
        <Field id="login-id" label="Adresse e-mail" error={errors.email}>
          <input id="login-id" type="email" inputMode="email" autoComplete="username" value={email} onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: undefined }); }}
            placeholder="vous@exemple.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "login-id-error" : undefined} className={inputCls(!!errors.email)} />
        </Field>
        <Field id="password" label="Mot de passe" error={errors.password}>
          <PasswordInput id="password" autoComplete="current-password" value={password} onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, password: undefined }); }} invalid={!!errors.password} />
        </Field>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm text-ink-2">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="size-5 accent-[var(--color-primary)]" />
            Rester connecté
          </label>
          <Link href="/mot-de-passe-oublie" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary hover:underline">Mot de passe oublié ?</Link>
        </div>
        <SubmitButton loading={loading} disabled={google}>{loading ? "Connexion…" : "Se connecter"}</SubmitButton>
      </form>
    </AuthLayout>
  );
}
