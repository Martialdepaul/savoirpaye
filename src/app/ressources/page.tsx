import type { Metadata } from "next";
import SiteShell from "../../components/site/SiteShell";
import PageHero from "../../components/site/PageHero";
import ArticleList from "../../components/site/ArticleList";

export const metadata: Metadata = {
  title: "Ressources · Savoirpay",
  description: "Guides, conseils et témoignages pour vendre vos formations en ligne.",
};

export default function RessourcesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Ressources"
        title={<>Le blog des <span className="text-gold">créateurs</span></>}
        text="Guides pratiques, stratégies marketing et histoires de créateurs africains qui vivent de leur savoir."
      />
      <ArticleList />
    </SiteShell>
  );
}
