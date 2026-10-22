import type { Metadata } from "next";
import MarketingLayout from "@/components/landing/MarketingLayout";
import HowItWorks from "@/components/landing/HowItWorks";
import PaymentStrip from "@/components/landing/PaymentStrip";

export const metadata: Metadata = {
  title: "Comment ça marche | SavoirPaye",
  description: "Créez votre compte, construisez votre cours, fixez votre prix en FCFA et encaissez par Mobile Money.",
};

export default function HowItWorksPage() {
  return (
    <MarketingLayout>
      <HowItWorks level="h1" />
      <PaymentStrip />
      <div className="h-12 sm:h-16" />
    </MarketingLayout>
  );
}
