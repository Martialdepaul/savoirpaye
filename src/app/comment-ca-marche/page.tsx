import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import PageHero from "@/components/site/PageHero";
import HowItWorks from "@/components/landing/HowItWorks";
import PaymentStrip from "@/components/landing/PaymentStrip";

export const metadata: Metadata = {
  title: "Comment ça marche · Savoirpay",
  description: "Inscrivez-vous, créez vos contenus, recevez vos paiements en Mobile Money et retirez vos gains.",
};

export default function HowItWorksPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Comment ça marche"
        title={<>De votre expertise <span className="text-gold">à vos premiers revenus</span></>}
        text="Quatre étapes simples, depuis votre téléphone ou votre ordinateur. Aucune compétence technique n'est nécessaire."
      />
      <HowItWorks />
      <div id="paiements" className="scroll-mt-16"><PaymentStrip /></div>
    </SiteShell>
  );
}
