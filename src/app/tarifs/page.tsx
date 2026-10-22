import type { Metadata } from "next";
import MarketingLayout from "@/components/landing/MarketingLayout";
import Pricing from "@/components/landing/Pricing";

export const metadata: Metadata = {
  title: "Tarifs | SavoirPaye",
  description: "Commencez gratuitement. Des offres simples en FCFA, sans engagement.",
};

export default function PricingPage() {
  return (
    <MarketingLayout cta={false}>
      <Pricing level="h1" />
      <p className="px-5 pb-12 text-center text-ink-2 sm:pb-16">
        Une question sur les offres ? <a href="/faq" className="inline-block py-2 font-semibold text-primary hover:underline">Consultez la FAQ</a>
      </p>
    </MarketingLayout>
  );
}
