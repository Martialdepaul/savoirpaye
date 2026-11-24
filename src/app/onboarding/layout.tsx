import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAccount } from "@/lib/account";
import { AccountProvider } from "@/components/dashboard/AccountContext";

export const metadata: Metadata = { title: "Configurer ma boutique", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const account = await getAccount();
  if (!account) redirect("/connexion?suite=/onboarding");
  // Boutique déjà configurée : rien à refaire ici (modifications dans Paramètres)
  if (account.shop) redirect("/dashboard");
  return <AccountProvider value={account}>{children}</AccountProvider>;
}
