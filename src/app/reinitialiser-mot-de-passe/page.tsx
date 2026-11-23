"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Field, FormError, PasswordInput, PasswordStrength, SubmitButton, passwordOk } from "@/components/auth/fields";
import { authClient, authErrorMessage } from "@/lib/auth-client";

export default function ResetPasswordPage() {
  // Jeton transmis par le lien de l'e-mail (?token=…), ou ?error=INVALID_TOKEN s'il a expiré
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("error") ? null : params.get("token"));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: typeof errors = {};
    if (!passwordOk(password)) er.password = "Le mot de passe ne respecte pas encore toutes les règles.";
    if (confirm !== password) er.confirm = "Les deux mots de passe ne sont pas identiques.";
    setErrors(er);
    if (Object.keys(er).length || !token) return;
    setLoading(true);
    setFormError("");
    const { error } = await authClient.resetPassword({ newPassword: password, token });
    setLoading(false);
    if (error) return setFormError(authErrorMessage(error));
    setDone(true);
  };

  if (done) {
    return (
      <AuthLayout title="Mot de passe modifié">
        <div className="rounded-card border border-line bg-white p-6 text-center shadow-soft">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#ECF8EF] text-success"><CheckCircle2 size={28} /></span>
          <p className="mt-4 text-ink-2">Votre nouveau mot de passe est enregistré. Vous pouvez maintenant vous connecter.</p>
          <Link href="/connexion" className="mt-5 flex min-h-12 items-center justify-center rounded-btn bg-primary font-semibold text-white hover:bg-primary-hover">Se connecter</Link>
        </div>
      </AuthLayout>
    );
  }

  if (token === null) {
    return (
      <AuthLayout title="Lien expiré">
        <div className="rounded-card border border-line bg-white p-6 text-center shadow-soft">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-gold-light text-gold-ink"><AlertTriangle size={28} /></span>
          <p className="mt-4 text-ink-2">Ce lien de réinitialisation n'est plus valable : il a expiré ou a déjà été utilisé.</p>
          <Link href="/mot-de-passe-oublie" className="mt-5 flex min-h-12 items-center justify-center rounded-btn bg-primary font-semibold text-white hover:bg-primary-hover">Recevoir un nouveau lien</Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Nouveau mot de passe" subtitle="Choisissez un mot de passe que vous n'utilisez pas ailleurs.">
      <form onSubmit={submit} noValidate className="space-y-5">
        <FormError>{formError}</FormError>
        <Field id="password" label="Nouveau mot de passe" error={errors.password}>
          <PasswordInput id="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} invalid={!!errors.password} />
          <PasswordStrength value={password} />
        </Field>
        <Field id="confirm" label="Confirmer le mot de passe" error={errors.confirm}>
          <PasswordInput id="confirm" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} invalid={!!errors.confirm} />
        </Field>
        <SubmitButton loading={loading} disabled={token === undefined}>{loading ? "Enregistrement…" : "Enregistrer le mot de passe"}</SubmitButton>
      </form>
    </AuthLayout>
  );
}
