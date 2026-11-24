"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { MailWarning, Store } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useAccount } from "./AccountContext";

/** Bandeaux contextuels du tableau de bord : boutique à créer, e-mail à confirmer */
export default function AccountBanners() {
  const account = useAccount();
  const pathname = usePathname();
  const [sent, setSent] = useState<"idle" | "sending" | "sent" | "error">("idle");
  if (!account) return null;

  // Un acheteur qui consulte ses achats n'a pas à créer de boutique
  const showShop = !account.shop && !pathname.startsWith("/dashboard/mes-formations") && !pathname.startsWith("/dashboard/parametres");

  const resend = async () => {
    setSent("sending");
    const { error } = await authClient.sendVerificationEmail({ email: account.user.email, callbackURL: "/dashboard" });
    setSent(error ? "error" : "sent");
  };

  if (!showShop && account.user.emailVerified) return null;

  return (
    <div className="mx-auto max-w-6xl space-y-2 px-4 pt-4 sm:px-8">
      {showShop && (
        <div className="flex flex-col gap-3 rounded-card border border-gold/40 bg-gold-light p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3 text-sm text-gold-ink">
            <Store size={18} className="mt-0.5 shrink-0" />
            <span><strong>Vous voulez vendre ?</strong> Configurez votre boutique : un nom et un compte de retrait suffisent, c'est 1 minute.</span>
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
    </div>
  );
}
