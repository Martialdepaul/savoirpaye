import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import PageHero from "@/components/site/PageHero";
import Faq from "@/components/landing/Faq";

export const metadata: Metadata = {
  title: "Questions fréquentes · Savoirpay",
  description: "Moyens de paiement, retraits, Créateur IA, protection des contenus : les réponses à vos questions.",
};

export default function FaqPage() {
  return (
    <SiteShell>
      <PageHero
        center
        eyebrow="Aide"
        title={<>Questions <span className="text-gold">fréquentes</span></>}
        text="Tout ce qu'il faut savoir pour vendre sur Savoirpay. Vous ne trouvez pas votre réponse ? Écrivez-nous depuis la page Contact."
      />
      <Faq />
    </SiteShell>
  );
}
