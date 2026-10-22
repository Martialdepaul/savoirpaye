import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SalesView from "@/components/sales/SalesView";
import { catalog, findProduct } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

const getProduct = (slug: string) => {
  const p = findProduct(slug);
  return p && p.type !== "Formation" ? p : undefined;
};

export function generateStaticParams() {
  return catalog.filter((p) => p.type !== "Formation").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return { title: `${p.name} | SavoirPaye`, description: p.subtitle, openGraph: { title: p.name, description: p.subtitle, images: [p.cover] } };
}

export default async function ProductSalesPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  return <SalesView product={p} />;
}
