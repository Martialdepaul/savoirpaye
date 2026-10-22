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

export function SubmitButton({ loading, children }: { loading: boolean; children: ReactNode }) {
  return (
    <button type="submit" disabled={loading} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-btn bg-primary px-6 font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-70">
      {loading && <Loader2 size={18} className="animate-spin" />} {children}
    </button>
  );
}

export const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim());
export const isPhone = (v: string) => v.replace(/\D/g, "").length >= 8;
