import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: "Conditions générales d'utilisation | SavoirPaye" };

const sections: LegalSection[] = [
  {
    id: "objet",
    title: "Objet",
    body: <p>Les présentes conditions générales d'utilisation (« CGU ») encadrent l'utilisation de la plateforme savoirpay, éditée par <strong>[Raison sociale]</strong>, qui permet à des créateurs (« Vendeurs ») de vendre des formations, des produits numériques et des séances de coaching à des acheteurs (« Clients »), avec paiement par Mobile Money ou carte bancaire. Toute inscription ou tout achat vaut acceptation des CGU.</p>,
  },
  {
    id: "compte",
    title: "Création et sécurité du compte",
    body: (
      <ul>
        <li>L'inscription est réservée aux personnes majeures ou disposant de l'autorisation de leur représentant légal.</li>
        <li>Les informations fournies (nom, e-mail, numéro de téléphone) doivent être exactes et tenues à jour. Le numéro de téléphone sert aux notifications et aux retraits.</li>
        <li>Vous êtes responsable de la confidentialité de votre mot de passe et de toute activité réalisée depuis votre compte. Signalez sans délai toute utilisation non autorisée.</li>
      </ul>
    ),
  },
  {
    id: "role",
    title: "Rôle de savoirpay",
    body: <p>savoirpay fournit un service technique d'hébergement de contenus, de pages de vente et d'encaissement. Le contrat de vente est conclu directement entre le Vendeur et le Client. Le Vendeur est seul responsable du contenu, de la qualité et de la conformité des produits qu'il propose.</p>,
  },
  {
    id: "vendeurs",
    title: "Engagements des Vendeurs",
    body: (
      <ul>
        <li>Ne publier que des contenus dont vous détenez les droits ou les autorisations nécessaires.</li>
        <li>Décrire vos produits de façon honnête : programme, durée, contenu livré et prix.</li>
        <li>Répondre aux questions de vos Clients dans un délai raisonnable.</li>
        <li>Respecter la réglementation applicable à votre activité, notamment fiscale.</li>
      </ul>
    ),
  },
  {
    id: "interdits",
    title: "Contenus interdits",
    body: <p>Sont notamment interdits : les contenus illicites, contrefaisants, haineux, violents ou à caractère pornographique ; les promesses de gains garantis ou les systèmes pyramidaux ; la revente de contenus appartenant à des tiers. savoirpay peut retirer tout contenu signalé comme contraire aux CGU et suspendre le compte concerné.</p>,
  },
  {
    id: "paiements",
    title: "Paiements, commissions et retraits",
    body: (
      <ul>
        <li>Les prix sont affichés et payés en francs CFA (FCFA), toutes taxes comprises le cas échéant.</li>
        <li>Les paiements sont traités par des prestataires agréés (opérateurs Mobile Money et réseaux de cartes). savoirpay ne conserve pas vos données de carte bancaire.</li>
        <li>savoirpay prélève sur chaque vente la commission prévue par l'offre souscrite par le Vendeur (Starter, Pro ou Business), telle qu'affichée sur la page Tarifs.</li>
        <li>Les sommes encaissées deviennent disponibles au retrait après un délai de validation de 24 à 48 heures ouvrées. Les retraits sont effectués vers le numéro Mobile Money ou le compte bancaire vérifié du Vendeur.</li>
      </ul>
    ),
  },
  {
    id: "remboursements",
    title: "Garantie et remboursements",
    body: <p>Le Client peut demander le remboursement d'une formation ou d'un produit numérique dans les 7 jours suivant l'achat, si le produit ne correspond pas à sa description. La demande se fait depuis l'e-mail de confirmation ou auprès du support. Le remboursement est effectué sur le moyen de paiement utilisé et le montant correspondant est déduit du solde du Vendeur. Une séance de coaching déjà réalisée n'est pas remboursable.</p>,
  },
  {
    id: "propriete",
    title: "Propriété intellectuelle",
    body: <p>Le Vendeur conserve tous les droits sur ses contenus et accorde à savoirpay une licence limitée, non exclusive, pour les héberger, les afficher et les diffuser aux Clients dans le cadre du service. Le Client obtient un droit d'utilisation personnel : il ne peut ni partager ses accès, ni copier, ni revendre les contenus achetés.</p>,
  },
  {
    id: "resiliation",
    title: "Suspension et résiliation",
    body: <p>Vous pouvez fermer votre compte à tout moment depuis vos paramètres, après retrait de votre solde disponible. En cas de manquement grave aux CGU (fraude, contenu interdit, impayé), savoirpay peut suspendre ou fermer un compte, après notification sauf urgence.</p>,
  },
  {
    id: "responsabilite",
    title: "Responsabilité",
    body: <p>savoirpay met tout en œuvre pour assurer la disponibilité et la sécurité du service, sans pouvoir garantir une absence totale d'interruption. Sa responsabilité ne saurait être engagée pour les contenus publiés par les Vendeurs, ni pour les incidents propres aux opérateurs de paiement ou de télécommunication.</p>,
  },
  {
    id: "droit",
    title: "Droit applicable et litiges",
    body: <p>Les CGU sont régies par le droit <strong>[sénégalais]</strong>. En cas de différend, les parties recherchent d'abord une solution amiable. À défaut, le litige est porté devant les juridictions compétentes de <strong>[Dakar]</strong>.</p>,
  },
];

export default function CguPage() {
  return (
    <LegalPage
      current="/cgu"
      title="Conditions générales d'utilisation"
      updated="22 octobre 2026"
      intro={<p>Merci de lire attentivement ces conditions. Elles décrivent vos droits et obligations, que vous vendiez vos savoirs sur savoirpay ou que vous y achetiez un produit.</p>}
      sections={sections}
    />
  );
}
