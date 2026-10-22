import type { Metadata } from "next";
import MarketingLayout from "@/components/landing/MarketingLayout";
import AiCreator from "@/components/landing/AiCreator";

export const metadata: Metadata = {
  title: "Créateur IA | SavoirPaye",
  description: "Décrivez votre sujet : l'IA propose le plan, rédige les leçons et les quiz, puis prépare votre page de vente.",
};

export default function AiCreatorPage() {
  return (
    <MarketingLayout>
      <AiCreator level="h1" />
    </MarketingLayout>
  );
}
