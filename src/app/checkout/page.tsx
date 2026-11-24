import Link from "next/link";
import { Lock, PackageX } from "lucide-react";
import Logo from "@/components/ui/Logo";
import CheckoutFlow from "@/components/checkout/CheckoutFlow";
import { loadSalesPage } from "@/lib/sales-page";
import { getProductBySlug } from "@/lib/store";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ produit?: string }> };

export default async function CheckoutPage({ searchParams }: Props) {
  const slug = (await searchParams).produit ?? "";
  const found = slug ? await getProductBySlug(slug).catch(() => null) : null;
  const page = found ? await loadSalesPage(slug, found.product.type === "Formation") : null;
  const product = page && page.product.status === "En ligne" ? page.product : null;

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4 sm:px-5">
          <Logo />
          <span className="flex items-center gap-1.5 text-sm text-ink-2"><Lock size={15} className="text-success" /> Commande sécurisée</span>
        </div>
      </header>
      {product ? (
        <CheckoutFlow product={product} />
      ) : (
        <main className="mx-auto max-w-md px-4 py-16 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-page text-ink-2"><PackageX size={26} /></span>
          <h1 className="mt-4 font-heading text-2xl font-extrabold">Ce produit n'est pas disponible</h1>
          <p className="mt-2 text-ink-2">Il n'existe pas ou n'est plus en vente. Vérifiez le lien reçu ou contactez le vendeur.</p>
          <Link href="/" className="mt-6 inline-flex min-h-12 items-center rounded-btn bg-primary px-6 font-semibold text-white hover:bg-primary-hover">Retour à l'accueil</Link>
        </main>
      )}
    </div>
  );
}
