import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { eq } from "drizzle-orm";
import { MessageCircle, PackageOpen, Tag, Users } from "lucide-react";
import Logo from "@/components/ui/Logo";
import AccountLink from "@/components/auth/AccountLink";
import ProductGrid from "@/components/sales/ProductGrid";
import { db } from "@/lib/db";
import { shop, user } from "@/lib/db/schema";
import { getSession } from "@/lib/account";
import { getPublishedProducts } from "@/lib/store";

type Props = { params: Promise<{ vendeur: string }> };

export const dynamic = "force-dynamic";

const findShop = cache(async (slug: string) => {
  const [row] = await db
    .select({ id: shop.id, name: shop.name, slug: shop.slug, description: shop.description, category: shop.category, userId: shop.userId, owner: user.name, image: user.image, phone: user.phone })
    .from(shop)
    .innerJoin(user, eq(shop.userId, user.id))
    .where(eq(shop.slug, slug))
    .limit(1);
  return row ?? null;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = await findShop((await params).vendeur).catch(() => null);
  return s ? { title: s.name, description: s.description || `Boutique de ${s.owner} sur Savoirpay` } : {};
}

export default async function ShopPage({ params }: Props) {
  const s = await findShop((await params).vendeur);
  if (!s) notFound();
  const [session, products] = await Promise.all([getSession().catch(() => null), getPublishedProducts(s.id)]);
  const isOwner = session?.user.id === s.userId;
  const initials = s.owner.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("");
  const clients = products.reduce((n, p) => n + p.sales, 0);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-line bg-page/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-5">
          <Logo />
          <AccountLink />
        </div>
      </header>
      {isOwner && (
        <div role="status" className="bg-ink px-4 py-2.5 text-center text-sm text-white">
          Vous voyez votre boutique telle que vos clients la verront. <Link href="/dashboard/parametres?onglet=boutique" className="font-semibold text-gold underline">Modifier ma boutique</Link>
        </div>
      )}
      <section className="border-b border-line bg-white">
        <div className="bg-forest-glow h-28 sm:h-40" />
        <div className="mx-auto -mt-12 flex max-w-6xl flex-col gap-6 px-4 pb-8 sm:-mt-14 sm:flex-row sm:items-end sm:px-5 sm:pb-12">
          {s.image ? (
            <img src={s.image} alt={`Photo de ${s.owner}`} referrerPolicy="no-referrer" className="relative size-24 shrink-0 rounded-full object-cover ring-4 ring-white sm:size-28" />
          ) : (
            <span className="relative flex size-24 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-3xl font-extrabold text-white ring-4 ring-white sm:size-28">{initials}</span>
          )}
          <div className="min-w-0 flex-1">
            <h1 className="break-words font-heading text-2xl font-extrabold sm:text-3xl">{s.name}</h1>
            <p className="mt-1 text-sm text-ink-2">par {s.owner}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {s.category && <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1 text-xs font-semibold text-primary"><Tag size={13} /> {s.category}</span>}
              {clients > 0 && <span className="num inline-flex items-center gap-1.5 rounded-full bg-page px-3 py-1 text-xs font-semibold text-ink-2"><Users size={13} /> {clients} client{clients > 1 ? "s" : ""}</span>}
            </div>
            {s.description && <p className="mt-3 max-w-2xl whitespace-pre-line break-words leading-relaxed text-ink-2">{s.description}</p>}
          </div>
          {s.phone && (
            <a href={`https://wa.me/${s.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-btn border border-line bg-white px-5 font-semibold hover:bg-primary-light">
              <MessageCircle size={18} className="text-success" /> Contacter sur WhatsApp
            </a>
          )}
        </div>
      </section>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-5 sm:py-12">
        <h2 className="num mb-5 font-heading text-xl font-extrabold">Produits ({products.length})</h2>
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="rounded-card border border-dashed border-line bg-white p-8 text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-mint text-primary"><PackageOpen size={26} /></span>
            <p className="mt-4 font-semibold">Aucun produit pour le moment</p>
            <p className="mt-1 text-sm text-ink-2">
              {isOwner ? "Vos produits apparaîtront ici dès que vous les mettrez en ligne." : "Revenez bientôt : de nouveaux contenus arrivent."}
            </p>
            {isOwner && <Link href="/dashboard/produits/nouveau" className="mt-5 inline-flex min-h-11 items-center rounded-btn bg-primary px-5 font-semibold text-white hover:bg-primary-hover">Créer un produit</Link>}
          </div>
        )}
      </main>
      <footer className="border-t border-line py-8 text-center text-sm text-ink-2">
        Boutique propulsée par <Link href="/" className="inline-block py-3 font-semibold text-primary hover:underline">Savoirpay</Link>
      </footer>
    </div>
  );
}
