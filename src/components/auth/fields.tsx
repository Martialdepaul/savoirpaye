"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export const inputCls = (invalid?: boolean) =>
  `mt-2 w-full rounded-btn border bg-white px-3.5 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${invalid ? "border-danger" : "border-line"}`;

export function Field({ id, label, error, hint, children }: { id: string; label: ReactNode; error?: string; hint?: ReactNode; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">{label}</label>
      {children}
      {error ? <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-danger">{error}</p> : hint}
    </div>
  );
}

export function PasswordInput({ invalid, ...props }: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  const [shown, setShown] = useState(false);
  return (
    <div className="relative">
      <input {...props} type={shown ? "text" : "password"} aria-invalid={invalid} className={`${inputCls(invalid)} pr-12`} />
      <button type="button" onClick={() => setShown(!shown)} aria-label={shown ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        className="absolute right-1 top-1/2 mt-1 flex size-11 -translate-y-1/2 items-center justify-center rounded-btn text-ink-2 hover:text-ink">
        {shown ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}

/** Règles de mot de passe affichées en direct sous le champ */
export const passwordRules = [
  { label: "8 caractères minimum", test: (p: string) => p.length >= 8 },
  { label: "Une lettre", test: (p: string) => /[a-zA-Z]/.test(p) },
  { label: "Un chiffre", test: (p: string) => /\d/.test(p) },
];
export const passwordOk = (p: string) => passwordRules.every((r) => r.test(p));

export function PasswordStrength({ value }: { value: string }) {
  const passed = passwordRules.filter((r) => r.test(value)).length;
  const colors = ["bg-line", "bg-danger", "bg-pending", "bg-success"];
  return (
    <div className="mt-2" aria-live="polite">
      <div className="flex gap-1.5" aria-hidden="true">
        {passwordRules.map((_, i) => <span key={i} className={`h-1.5 flex-1 rounded-full ${i < passed ? colors[passed] : "bg-line"}`} />)}
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {passwordRules.map((r) => (
          <li key={r.label} className={r.test(value) ? "text-success" : "text-ink-2"}>{r.test(value) ? "✓" : "•"} {r.label}</li>
        ))}
      </ul>
    </div>
  );
}

export function SubmitButton({ loading, disabled, children }: { loading: boolean; disabled?: boolean; children: ReactNode }) {
  return (
    <button type="submit" disabled={loading || disabled} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-btn bg-primary px-6 font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-70">
      {loading && <Loader2 size={18} className="animate-spin" />} {children}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.96 10.96 0 0 0 12 1 11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

/** Bouton « Continuer avec Google » (respecte les consignes de marque Google : logo en couleurs, fond blanc) */
export function GoogleButton({ loading, disabled, onClick, children = "Continuer avec Google" }: { loading: boolean; disabled?: boolean; onClick: () => void; children?: ReactNode }) {
  return (
    <button type="button" onClick={onClick} disabled={loading || disabled} aria-busy={loading}
      className="flex min-h-12 w-full items-center justify-center gap-3 rounded-btn border border-line bg-white px-4 text-[15px] font-semibold text-ink transition-colors hover:border-ink-2/40 hover:bg-page disabled:opacity-70">
      {loading ? <Loader2 size={20} className="animate-spin text-ink-2" /> : <GoogleIcon />}
      {loading ? "Connexion à Google…" : children}
    </button>
  );
}

export function Divider({ children = "ou" }: { children?: ReactNode }) {
  return (
    <div className="my-6 flex items-center gap-3 text-sm text-ink-2" role="separator">
      <span className="h-px flex-1 bg-line" /> {children} <span className="h-px flex-1 bg-line" />
    </div>
  );
}

export const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim());
export const isPhone = (v: string) => v.replace(/\D/g, "").length >= 8;
