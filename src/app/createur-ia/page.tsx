import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import PageHero from "@/components/site/PageHero";
import AiCreator from "@/components/landing/AiCreator";

export const metadata: Metadata = {
  title: "Créateur IA · Savoirpay",
  description: "Décrivez votre sujet : l'IA propose le plan, rédige les leçons et les quiz, puis prépare votre page de vente.",
};

export default function AiCreatorPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Créateur IA"
        title={<>Votre formation prête <span className="text-gold">en quelques minutes</span></>}
        text="Plan de cours, leçons, quiz et page de vente : l'IA prépare tout, vous relisez et vous publiez."
      />
      <div className="bg-white pb-16 lg:pb-24"><AiCreator /></div>
    </SiteShell>
  );
}
