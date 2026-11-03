import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { company, emails, phones, site } from "@/lib/site-config";

export const metadata: Metadata = { title: "Mentions légales" };

const mail = (to: string) => <a href={`mailto:${to}`} className="font-semibold text-primary hover:underline">{to}</a>;

const sections: LegalSection[] = [
  {
    id: "editeur",
    title: "Éditeur du site",
    body: (
      <ul>
        <li><strong>Raison sociale :</strong> {company.legalName}, {company.legalForm} au capital de {company.capital} FCFA</li>
        <li><strong>Siège social :</strong> {company.address}</li>
        <li><strong>RCCM :</strong> {company.rccm} · <strong>NINEA :</strong> {company.ninea}</li>
        <li><strong>Directeur de la publication :</strong> {company.director}</li>
        <li><strong>Contact :</strong> {mail(emails.contact)} · {phones.office}</li>
      </ul>
    ),
  },
  {
    id: "hebergement",
    title: "Hébergement",
    body: <p>Le site est hébergé par <strong>{company.host}</strong>, {company.hostAddress}.</p>,
  },
  {
    id: "propriete",
    title: "Propriété intellectuelle",
    body: <p>La marque {site.name}, le logo, la charte graphique et l'ensemble des éléments du site (hors contenus publiés par les Vendeurs) sont la propriété de {company.legalName}. Toute reproduction sans autorisation est interdite.</p>,
  },
  {
    id: "contenus",
    title: "Contenus des Vendeurs",
    body: <p>Les formations, produits et pages de vente publiés par les Vendeurs relèvent de leur seule responsabilité. Pour signaler un contenu illicite, écrivez à {mail(emails.abuse)} en précisant l'adresse de la page concernée.</p>,
  },
];

export default function LegalNoticePage() {
  return (
    <LegalPage
      current="/mentions-legales"
      title="Mentions légales"
      updated="22 octobre 2026"
      intro={<p>Informations sur l'éditeur et l'hébergeur du site {site.name}.</p>}
      sections={sections}
    />
  );
}
