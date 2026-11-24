import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SalesView from "@/components/sales/SalesView";
import { loadSalesPage, salesMetadata } from "@/lib/sales-page";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return salesMetadata((await params).slug, false);
}

export default async function ProductSalesPage({ params }: Props) {
  const r = await loadSalesPage((await params).slug, false);
  if (!r) notFound();
  return <SalesView product={r.product} isOwner={r.isOwner} />;
}
