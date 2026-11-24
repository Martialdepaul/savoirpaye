import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SalesView from "@/components/sales/SalesView";
import { loadSalesPage, salesMetadata } from "@/lib/sales-page";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return salesMetadata((await params).slug, true);
}

export default async function FormationSalesPage({ params }: Props) {
  const r = await loadSalesPage((await params).slug, true);
  if (!r) notFound();
  return <SalesView product={r.product} isOwner={r.isOwner} />;
}
