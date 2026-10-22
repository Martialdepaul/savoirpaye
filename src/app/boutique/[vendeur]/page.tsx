import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, MessageCircle, Star, Users } from "lucide-react";
import Logo from "@/components/ui/Logo";
import ProductGrid from "@/components/sales/ProductGrid";
import { catalog, seller } from "@/lib/catalog";

type Props = { params: Promise<{ vendeur: string }> };

export function generateStaticParams() {
  return [{ vendeur: seller.slug }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if ((await params).vendeur !== seller.slug) return {};
  return { title: `Boutique de ${seller.name} | SavoirPaye`, description: seller.bio };
}

export default async function ShopPage({ params }: Props) {
  if ((await params).vendeur !== seller.slug) notFound();
  const products = catalog.filter((p) => p.status === "En ligne");
  const students = products.reduce((n, p) => n + p.students, 0);
  const rated = products.filter((p) => p.reviewsCount > 0);
  const rating = rated.reduce((s, p) => s + p.rating * p.reviewsCount, 0) / Math.max(1, rated.reduce((n, p) => n + p.reviewsCount, 0));
  const wa = `https://wa.me/${seller.whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-page/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <a href="/connexion" className="-mr-3 px-3 py-3 text-sm font-medium text-ink-2 hover:text-ink">Connexion</a>
        </div>
      </header>

      <section className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:py-12">
          <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-2xl font-extrabold text-white sm:size-24">{seller.initials}</span>
          <div className="min-w-0 flex-1">
            <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">{seller.name}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-2"><MapPin size={15} /> {seller.city}</p>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-2">{seller.bio}</p>
            <div className="num mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5"><Star size={15} className="fill-gold text-gold" /> <strong>{rating.toFixed(1).replace(".", ",")}</strong> <span className="text-ink-2">note moyenne</span></span>
              <span className="flex items-center gap-1.5"><Users size={15} className="text-ink-2" /> <strong>{students.toLocaleString("fr-FR")}</strong> <span className="text-ink-2">clients</span></span>
            </div>
          </div>
          <a href={wa} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-btn border border-line bg-white px-5 font-semibold hover:bg-primary-light">
            <MessageCircle size={18} className="text-success" /> Contacter sur WhatsApp
          </a>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:py-12">
        <h2 className="mb-5 font-heading text-xl font-extrabold">Produits ({products.length})</h2>
        <ProductGrid products={products} />
      </main>

      <footer className="border-t border-line py-8 text-center text-sm text-ink-2">
        Boutique propulsée par <a href="/" className="inline-block py-2 font-semibold text-primary hover:underline">savoirpay</a>
      </footer>
    </div>
  );
}
