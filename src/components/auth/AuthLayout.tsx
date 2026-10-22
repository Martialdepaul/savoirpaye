import type { ReactNode } from "react";
import { Check } from "lucide-react";
import Logo from "../ui/Logo";

const perks = [
  "Encaissez par Wave, Orange Money, MTN MoMo et carte",
  "Créez votre formation en quelques heures avec l'IA",
  "Retirez vos gains sur votre numéro en quelques minutes",
];

export default function AuthLayout({ title, subtitle, children, footer }: { title: string; subtitle?: ReactNode; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[1fr_minmax(420px,0.9fr)]">
      <div className="flex min-h-screen flex-col px-5 py-6 sm:px-8">
        <header><Logo /></header>
        <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <h1 className="font-heading text-[28px] font-extrabold leading-tight sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-2 text-ink-2">{subtitle}</p>}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-8 text-center text-sm text-ink-2">{footer}</div>}
        </main>
        <p className="text-center text-xs text-ink-2">
          © 2026 savoirpay · <a href="/cgu" className="inline-block px-1.5 py-3 hover:text-ink">CGU</a> · <a href="/confidentialite" className="inline-block px-1.5 py-3 hover:text-ink">Confidentialité</a>
        </p>
      </div>

      <aside className="relative hidden overflow-hidden bg-primary p-12 text-white lg:flex lg:flex-col lg:justify-center">
        <div className="absolute -right-24 -top-24 size-96 rounded-full bg-white/5" aria-hidden="true" />
        <div className="absolute -bottom-32 -left-16 size-80 rounded-full bg-gold/15" aria-hidden="true" />
        <div className="relative max-w-md">
          <p className="font-heading text-3xl font-extrabold leading-tight">Transformez votre savoir en revenus, en FCFA.</p>
          <ul className="mt-8 space-y-4">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-3 text-white/90">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/15"><Check size={14} strokeWidth={3} /></span> {p}
              </li>
            ))}
          </ul>
          <figure className="mt-10 rounded-card bg-white/10 p-5 backdrop-blur">
            <blockquote className="text-[15px] leading-relaxed text-white/90">« J'ai vendu ma première formation en 3 jours. Mes élèves paient avec Wave, et je retire le soir même. »</blockquote>
            <figcaption className="mt-3 text-sm font-semibold">Aminata D., formatrice à Dakar</figcaption>
          </figure>
        </div>
      </aside>
    </div>
  );
}
