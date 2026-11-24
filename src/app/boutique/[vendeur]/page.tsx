import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { eq } from "drizzle-orm";
import { MapPin, MessageCircle, PackageOpen, Star, Tag, Users } from "lucide-react";
import Logo from "@/components/ui/Logo";
import AccountLink from "@/components/auth/AccountLink";
import ProductGrid from "@/components/sales/ProductGrid";
import { catalog, seller } from "@/lib/catalog";
import { db } from "@/lib/db";
import { shop, user } from "@/lib/db/schema";
import { getSession } from "@/lib/account";

type Props = { params: Promise<{ vendeur: string }> };

// Boutiques réelles lues en base à chaque visite (la boutique de démonstration reste statique)
export const dynamic = "force-dynamic";

const findShop = cache(async (slug: string) => {
  const [row] = await db
    .select({ name: shop.name, slug: shop.slug, description: shop.description, category: shop.category, userId: shop.userId, owner: user.name, image: user.image, phone: user.phone })
    .from(shop)
    .innerJoin(user, eq(shop.userId, user.id))
    .where(eq(shop.slug, slug))
    .limit(1);
  return row ?? null;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).vendeur;
  if (slug === seller.slug) return { title: `Boutique de ${seller.name}`, description: seller.bio };
  const s = await findShop(slug).catch(() => null);
  return s ? { title: s.name, description: s.description || `Boutique de ${s.owner} sur Savoirpay` } : {};
}

function Header() {
  return (
    <header className="border-b border-line bg-page/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-5">
        <Logo />
        <AccountLink />
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line py-8 text-center text-sm text-ink-2">
      Boutique propulsée par <Link href="/" className="inline-block py-3 font-semibold text-primary hover:underline">Savoirpay</Link>
    </footer>
  );
}

const waLink = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "")}`;

export default async function ShopPage({ params }: Props) {
  const slug = (await params).vendeur;
  if (slug === seller.slug) return <DemoShop />;

  const s = await findShop(slug);
  if (!s) notFound();
  const session = await getSession().catch(() => null);
  const isOwner = session?.user.id === s.userId;
  const initials = s.owner.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {isOwner && (
        <div role="status" className="bg-ink px-4 py-2.5 text-center text-sm text-white">
          Vous voyez votre boutique telle que vos clients la verront. <Link href="/dashboard/parametres" className="font-semibold text-gold underline">Modifier ma boutique</Link>
        </div>
      )}
      <section className="border-b border-line bg-white">
        <div className="h-28 bg-forest-glow sm:h-40" />
        <div className="mx-auto -mt-12 flex max-w-6xl flex-col gap-6 px-4 pb-8 sm:-mt-14 sm:flex-row sm:items-end sm:px-5 sm:pb-12">
          {s.image ? (
            <img src={s.image} alt={`Photo de ${s.owner}`} referrerPolicy="no-referrer" className="relative size-24 shrink-0 rounded-full object-cover ring-4 ring-white sm:size-28" />
          ) : (
            <span className="relative flex size-24 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-3xl font-extrabold text-white ring-4 ring-white sm:size-28">{initials}</span>
          )}
          <div className="min-w-0 flex-1">
            <h1 className="break-words font-heading text-2xl font-extrabold sm:text-3xl">{s.name}</h1>
            <p className="mt-1 text-sm text-ink-2">par {s.owner}</p>
            {s.category && <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1 text-xs font-semibold text-primary"><Tag size={13} /> {s.category}</p>}
            {s.description && <p className="mt-3 max-w-2xl whitespace-pre-line leading-relaxed text-ink-2">{s.description}</p>}
          </div>
          {s.phone && (
            <a href={waLink(s.phone)} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-btn border border-line bg-white px-5 font-semibold hover:bg-primary-light">
              <MessageCircle size={18} className="text-success" /> Contacter sur WhatsApp
            </a>
          )}
        </div>
      </section>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-5 sm:py-12">
        <h2 className="mb-5 font-heading text-xl font-extrabold">Produits (0)</h2>
        <div className="rounded-card border border-dashed border-line bg-white p-8 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-mint text-primary"><PackageOpen size={26} /></span>
          <p className="mt-4 font-semibold">Aucun produit pour le moment</p>
          <p className="mt-1 text-sm text-ink-2">
            {isOwner ? "Vos formations et produits apparaîtront ici dès que vous les publierez." : "Revenez bientôt : de nouveaux contenus arrivent."}
          </p>
          {isOwner && <Link href="/dashboard" className="mt-5 inline-flex min-h-11 items-center rounded-btn bg-primary px-5 font-semibold text-white hover:bg-primary-hover">Retour au tableau de bord</Link>}
        </div>
      </main>
      <Footer />
    </div>
  );
}

/** Boutique de démonstration (vendeuse fictive du catalogue) */
function DemoShop() {
  const products = catalog.filter((p) => p.status === "En ligne");
  const students = products.reduce((n, p) => n + p.students, 0);
  const rated = products.filter((p) => p.reviewsCount > 0);
  const rating = rated.reduce((s, p) => s + p.rating * p.reviewsCount, 0) / Math.max(1, rated.reduce((n, p) => n + p.reviewsCount, 0));

  return (
    <div className="min-h-screen">
      <Header />
      <section className="border-b border-line bg-white">
        <div className="relative h-36 overflow-hidden bg-forest sm:h-52">
          <img src="/images/store-cover.jpg" alt="" className="size-full object-cover opacity-80" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest/70 to-transparent" />
        </div>
        <div className="mx-auto -mt-12 flex max-w-6xl flex-col gap-6 px-4 pb-8 sm:-mt-14 sm:flex-row sm:items-end sm:px-5 sm:pb-12">
          <img src="/images/team-1.jpg" alt={`Photo de ${seller.name}`} className="relative size-24 shrink-0 rounded-full object-cover ring-4 ring-white sm:size-28" />
          <div className="min-w-0 flex-1">
            <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">{seller.name}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-2"><MapPin size={15} /> {seller.city}</p>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-2">{seller.bio}</p>
            <div className="num mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5"><Star size={15} className="fill-gold text-gold" /> <strong>{rating.toFixed(1).replace(".", ",")}</strong> <span className="text-ink-2">note moyenne</span></span>
              <span className="flex items-center gap-1.5"><Users size={15} className="text-ink-2" /> <strong>{students.toLocaleString("fr-FR")}</strong> <span className="text-ink-2">clients</span></span>
            </div>
          </div>
          <a href={waLink(seller.whatsapp)} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-btn border border-line bg-white px-5 font-semibold hover:bg-primary-light">
            <MessageCircle size={18} className="text-success" /> Contacter sur WhatsApp
          </a>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-5 sm:py-12">
        <h2 className="mb-5 font-heading text-xl font-extrabold">Produits ({products.length})</h2>
        <ProductGrid products={products} />
      </main>
      <Footer />
    </div>
  );
}
