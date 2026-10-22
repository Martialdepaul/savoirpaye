import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: "Mentions légales | SavoirPaye" };

const sections: LegalSection[] = [
  {
    id: "editeur",
    title: "Éditeur du site",
    body: (
      <ul>
        <li><strong>Raison sociale :</strong> [Raison sociale], [forme juridique] au capital de [montant] FCFA</li>
        <li><strong>Siège social :</strong> [adresse complète]</li>
        <li><strong>RCCM :</strong> [numéro] · <strong>NINEA :</strong> [numéro]</li>
        <li><strong>Directeur de la publication :</strong> [nom du dirigeant]</li>
        <li><strong>Contact :</strong> <a href="mailto:contact@savoirpay.com" className="font-semibold text-primary hover:underline">contact@savoirpay.com</a></li>
      </ul>
    ),
  },
  {
    id: "hebergement",
    title: "Hébergement",
    body: <p>Le site est hébergé par <strong>[nom de l'hébergeur]</strong>, [adresse de l'hébergeur].</p>,
  },
  {
    id: "propriete",
    title: "Propriété intellectuelle",
    body: <p>La marque savoirpay, le logo, la charte graphique et l'ensemble des éléments du site (hors contenus publiés par les Vendeurs) sont la propriété de [Raison sociale]. Toute reproduction sans autorisation est interdite.</p>,
  },
  {
    id: "contenus",
    title: "Contenus des Vendeurs",
    body: <p>Les formations, produits et pages de vente publiés par les Vendeurs relèvent de leur seule responsabilité. Pour signaler un contenu illicite, écrivez à <a href="mailto:signalement@savoirpay.com" className="font-semibold text-primary hover:underline">signalement@savoirpay.com</a> en précisant l'adresse de la page concernée.</p>,
  },
];

export default function LegalNoticePage() {
  return (
    <LegalPage
      current="/mentions-legales"
      title="Mentions légales"
      updated="22 octobre 2026"
      intro={<p>Informations sur l'éditeur et l'hébergeur du site savoirpay.</p>}
      sections={sections}
    />
  );
}
