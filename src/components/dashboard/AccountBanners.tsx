"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Info, MailWarning, Store, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useAccount } from "./AccountContext";

const DEMO_KEY = "savoirpay:demo-notice-hidden";
// Pages dont le contenu est encore un exemple (pas encore relié aux vraies ventes)
const demoPages = ["/dashboard/produits", "/dashboard/mes-formations", "/dashboard/createur-ia", "/dashboard/commandes", "/dashboard/clients", "/dashboard/portefeuille", "/dashboard/statistiques", "/dashboard/notifications"];

/** Bandeaux contextuels du tableau de bord : boutique à créer, e-mail à confirmer, données d'exemple */
export default function AccountBanners() {
  const account = useAccount();
  const pathname = usePathname();
  const [demoHidden, setDemoHidden] = useState(true);
  const [sent, setSent] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    try { setDemoHidden(sessionStorage.getItem(DEMO_KEY) === "1"); } catch { setDemoHidden(false); }
  }, []);

  if (!account) return null;
  const isDemoPage = pathname === "/dashboard" || demoPages.some((p) => pathname.startsWith(p));

  const resend = async () => {
    setSent("sending");
    const { error } = await authClient.sendVerificationEmail({ email: account.user.email, callbackURL: "/dashboard" });
    setSent(error ? "error" : "sent");
  };

  const hideDemo = () => {
    setDemoHidden(true);
    try { sessionStorage.setItem(DEMO_KEY, "1"); } catch {}
  };

  return (
    <div className="mx-auto max-w-6xl space-y-2 px-4 pt-4 empty:hidden sm:px-8">
      {!account.shop && (
        <div className="flex flex-col gap-3 rounded-card border border-gold/40 bg-gold-light p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3 text-sm text-gold-ink">
            <Store size={18} className="mt-0.5 shrink-0" />
            <span><strong>Votre boutique n'est pas encore configurée.</strong> Donnez-lui un nom et indiquez où recevoir vos gains : c'est 1 minute.</span>
          </p>
          <Link href="/onboarding" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-btn bg-gold px-4 text-sm font-bold text-forest hover:bg-gold-hover">Configurer ma boutique</Link>
        </div>
      )}

      {!account.user.emailVerified && (
        <div className="flex flex-col gap-3 rounded-card border border-line bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3 text-sm text-ink-2">
            <MailWarning size={18} className="mt-0.5 shrink-0 text-primary" />
            <span>
              Confirmez votre adresse <strong className="break-all text-ink">{account.user.email}</strong> grâce au lien reçu par e-mail.
              {sent === "sent" && <span className="block text-success">Nouveau lien envoyé. Pensez à regarder dans vos spams.</span>}
              {sent === "error" && <span className="block text-danger">Envoi impossible pour le moment. Réessayez dans une minute.</span>}
            </span>
          </p>
          {sent !== "sent" && (
            <button type="button" onClick={resend} disabled={sent === "sending"} className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-btn border border-line px-4 text-sm font-semibold text-primary hover:bg-primary-light disabled:opacity-60">
              {sent === "sending" ? "Envoi…" : "Renvoyer le lien"}
            </button>
          )}
        </div>
      )}

      {isDemoPage && !demoHidden && (
        <div role="note" className="flex items-start gap-3 rounded-card border border-primary/20 bg-mint p-3 pr-1 text-sm text-ink-2 sm:items-center">
          <Info size={17} className="mt-0.5 shrink-0 text-primary sm:mt-0" />
          <p className="flex-1"><strong className="text-ink">Mode découverte :</strong> les produits, ventes et statistiques affichés sont des exemples pour vous montrer l'outil. Vos vrais chiffres apparaîtront ici dès vos premières ventes.</p>
          <button type="button" onClick={hideDemo} aria-label="Masquer ce message" className="flex size-11 shrink-0 items-center justify-center rounded-btn text-ink-2 hover:bg-white hover:text-ink sm:size-9">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
