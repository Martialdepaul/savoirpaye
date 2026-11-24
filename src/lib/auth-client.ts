// Client d'authentification utilisé par les pages (connexion, inscription, déconnexion…)
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});

export const { useSession, signOut } = authClient;

/** Sur les pages de connexion/inscription : un utilisateur déjà connecté part directement vers son espace */
export function useRedirectIfSignedIn(target: () => string) {
  const router = useRouter();
  const { data } = useSession();
  useEffect(() => {
    if (data) router.replace(target());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, router]);
}

/** Traduit les codes d'erreur de Better Auth en messages français */
export function authErrorMessage(error: { code?: string; message?: string; status?: number } | null | undefined) {
  switch (error?.code) {
    case "INVALID_EMAIL_OR_PASSWORD":
      return "E-mail ou mot de passe incorrect.";
    case "USER_ALREADY_EXISTS":
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
      return "Un compte existe déjà avec cette adresse e-mail. Connectez-vous ou réinitialisez votre mot de passe.";
    case "INVALID_EMAIL":
      return "Saisissez une adresse e-mail valide.";
    case "PASSWORD_TOO_SHORT":
      return "Le mot de passe doit contenir au moins 8 caractères.";
    case "PASSWORD_TOO_LONG":
      return "Le mot de passe est trop long.";
    case "INVALID_TOKEN":
      return "Ce lien n'est plus valable. Demandez-en un nouveau.";
    case "EMAIL_NOT_VERIFIED":
      return "Confirmez d'abord votre adresse e-mail grâce au lien reçu.";
    case "INVALID_PASSWORD":
      return "Mot de passe incorrect.";
    case "SESSION_EXPIRED":
    case "SESSION_NOT_FRESH":
      return "Par sécurité, déconnectez-vous puis reconnectez-vous avant de faire cette action.";
    case "FAILED_TO_UNLINK_LAST_ACCOUNT":
      return "Impossible : c'est votre seul moyen de connexion. Ajoutez d'abord un mot de passe.";
    case "SOCIAL_ACCOUNT_ALREADY_LINKED":
      return "Ce compte Google est déjà associé à un autre compte Savoirpay.";
  }
  if (error?.status === 429) return "Trop de tentatives. Patientez une minute puis réessayez.";
  return "Une erreur est survenue. Vérifiez votre connexion et réessayez.";
}
