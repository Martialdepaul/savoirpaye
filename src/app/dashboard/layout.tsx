import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAccount } from "@/lib/account";
import { AccountProvider } from "@/components/dashboard/AccountContext";

export const metadata: Metadata = { title: "Tableau de bord", robots: { index: false } };
export const dynamic = "force-dynamic";

// Session vérifiée côté serveur : un cookie expiré ou falsifié renvoie vers la connexion
export default async function Layout({ children }: { children: React.ReactNode }) {
  const account = await getAccount();
  if (!account) redirect("/connexion?suite=/dashboard");
  return <AccountProvider value={account}>{children}</AccountProvider>;
}
