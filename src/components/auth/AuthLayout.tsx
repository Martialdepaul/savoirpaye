import Link from "next/link";
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
          © 2026 savoirpay · <Link href="/cgu" className="inline-block px-1.5 py-3 hover:text-ink">CGU</Link> · <Link href="/confidentialite" className="inline-block px-1.5 py-3 hover:text-ink">Confidentialité</Link>
        </p>
      </div>

      <aside className="bg-forest-glow relative hidden overflow-hidden p-12 text-white lg:flex lg:flex-col lg:justify-center">
                        <div className="relative max-w-md">
          <p className="font-heading text-3xl font-extrabold leading-tight">Transformez votre savoir en <span className="text-gold">revenus</span>, en FCFA.</p>
          <ul className="mt-8 space-y-4">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-3 text-white/90">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/15"><Check size={14} strokeWidth={3} /></span> {p}
              </li>
            ))}
          </ul>
          <div className="relative mx-auto mt-10 w-full max-w-xs">
            <img src="/images/auth-creatrice.jpg" alt="" className="aspect-[4/5] w-full rounded-[28px] object-cover shadow-lift" />
            <div className="absolute -left-8 bottom-10 rounded-card bg-white px-4 py-3 text-ink shadow-lift">
              <div className="text-[11px] text-ink-2">Ventes ce mois</div>
              <div className="num font-heading text-lg font-extrabold">1 248 500 FCFA</div>
            </div>
            <div className="absolute -right-6 top-10 rounded-card bg-gold px-4 py-2.5 text-sm font-bold text-forest shadow-lift">+25 000 FCFA</div>
          </div>
        </div>
      </aside>
    </div>
  );
}
