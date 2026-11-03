"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

export const inputCls =
  "w-full rounded-btn border border-line bg-white px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-ink-2/60 focus:border-primary focus:ring-2 focus:ring-primary/15";

export default function Field({
  label,
  hint,
  right,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: ReactNode; right?: ReactNode }) {
  const [show, setShow] = useState(false);
  const isPassword = props.type === "password";
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-sm font-semibold">
        {label}
        {right}
      </span>
      <span className="relative block">
        <input {...props} type={isPassword && show ? "text" : props.type} className={`${inputCls} ${isPassword ? "pr-12" : ""}`} />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-ink-2 hover:bg-page hover:text-ink"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </span>
      {hint && <span className="mt-1.5 block text-xs text-ink-2">{hint}</span>}
    </label>
  );
}
