import Link from "next/link";
import { redirect } from "next/navigation";
import { Lock } from "lucide-react";
import Player from "@/components/student/Player";
import { getAccount } from "@/lib/account";
import { getOwnedProduct } from "@/lib/learning";
import { productUrl } from "@/lib/catalog";
import { getProductBySlug } from "@/lib/store";

type Props = { params: Promise<{ slug: string }> };

export const metadata = { title: "Mes achats" };

export default async function LearnPage({ params }: Props) {
  const { slug } = await params;
  const account = await getAccount();
  if (!account) redirect(`/connexion?suite=/dashboard/mes-formations/${slug}`);
  const owned = await getOwnedProduct(account, slug);

  if (!owned) {
    const found = await getProductBySlug(slug).catch(() => null);
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-page text-ink-2"><Lock size={26} /></span>
        <h1 className="mt-4 font-heading text-2xl font-extrabold">Contenu réservé aux acheteurs</h1>
        <p className="mt-2 text-ink-2">
          Aucun achat de ce produit n'est associé à <strong className="break-all text-ink">{account.user.email}</strong>. Si vous avez payé avec une autre adresse e-mail, connectez-vous avec celle-ci.
        </p>
        <div className="mt-6 flex w-full flex-col gap-3">
          {found && found.product.status === "En ligne" && (
            <Link href={productUrl(found.product)} className="inline-flex min-h-12 items-center justify-center rounded-btn bg-primary px-6 font-semibold text-white hover:bg-primary-hover">Voir la page du produit</Link>
          )}
          <Link href="/dashboard/mes-formations" className="inline-flex min-h-12 items-center justify-center rounded-btn border border-line bg-white px-6 font-semibold hover:bg-page">Mes achats</Link>
        </div>
      </main>
    );
  }

  return <Player product={owned.product} initialCompleted={owned.completed} isSeller={owned.isSeller} />;
}
