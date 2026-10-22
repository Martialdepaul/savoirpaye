import type { Metadata } from "next";
import MarketingLayout from "@/components/landing/MarketingLayout";
import Faq from "@/components/landing/Faq";

export const metadata: Metadata = {
  title: "Questions fréquentes | SavoirPaye",
  description: "Moyens de paiement, retraits, Créateur IA, protection des contenus : les réponses à vos questions.",
};

export default function FaqPage() {
  return (
    <MarketingLayout>
      <Faq level="h1" />
      <p className="-mt-4 px-5 pb-12 text-center text-ink-2 sm:pb-16">
        Vous ne trouvez pas votre réponse ? <a href="mailto:aide@savoirpay.com" className="inline-block py-2 font-semibold text-primary hover:underline">Écrivez-nous</a>
      </p>
    </MarketingLayout>
  );
}
