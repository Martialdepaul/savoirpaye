import type { ReactNode } from "react";
import { Smartphone, ShieldCheck, Sparkles } from "lucide-react";
import Logo from "../ui/Logo";

export default function AuthShell({ children, aside = true }: { children: ReactNode; aside?: boolean }) {
  return (
    <div className="flex min-h-dvh bg-white">
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between px-4 sm:px-8">
          <Logo />
          <a href="/" className="-mr-3 px-3 py-3 text-sm font-medium text-ink-2 hover:text-ink">Retour au site</a>
        </header>
        <main className="flex flex-1 items-start justify-center px-4 pb-12 pt-4 sm:items-center sm:px-8">
          <div className="w-full max-w-md">{children}</div>
        </main>
      </div>

      {aside && (
        <aside className="bg-forest-glow relative hidden w-[46%] max-w-[640px] flex-col justify-between overflow-hidden p-10 text-white lg:flex">
          <p className="font-hand text-3xl leading-tight text-gold">Votre savoir a de la valeur !</p>
          <div className="relative mx-auto w-full max-w-sm">
            <img src="/images/auth-creatrice.jpg" alt="" className="aspect-[4/5] w-full rounded-[28px] object-cover shadow-lift" />
            <div className="absolute -left-8 bottom-10 rounded-card bg-white px-4 py-3 text-ink shadow-lift">
              <div className="text-[11px] text-ink-2">Ventes ce mois</div>
              <div className="num font-heading text-lg font-extrabold">1 248 500 FCFA</div>
            </div>
            <div className="absolute -right-6 top-10 rounded-card bg-gold px-4 py-2.5 text-sm font-bold text-forest shadow-lift">+25 000 FCFA</div>
          </div>
          <ul className="space-y-3 text-sm">
            {[
              [Smartphone, "Paiements Mobile Money et carte bancaire"],
              [Sparkles, "Assistant IA pour créer vos cours"],
              [ShieldCheck, "Données isolées et retraits sécurisés"],
            ].map(([Icon, t]) => {
              const I = Icon as typeof Smartphone;
              return (
                <li key={t as string} className="flex items-center gap-3 text-white/85">
                  <span className="flex size-8 items-center justify-center rounded-full border border-white/20 text-gold"><I size={15} /></span>
                  {t as string}
                </li>
              );
            })}
          </ul>
        </aside>
      )}
    </div>
  );
}
