import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: "Politique de confidentialité | SavoirPaye" };

const sections: LegalSection[] = [
  {
    id: "responsable",
    title: "Responsable du traitement",
    body: <p>Le responsable du traitement de vos données est <strong>[Raison sociale]</strong>, <strong>[adresse du siège]</strong>. Pour toute question : <a href="mailto:donnees@savoirpay.com" className="font-semibold text-primary hover:underline">donnees@savoirpay.com</a>.</p>,
  },
  {
    id: "donnees",
    title: "Données collectées",
    body: (
      <ul>
        <li><strong>Compte :</strong> nom, adresse e-mail, numéro de téléphone, mot de passe (stocké chiffré).</li>
        <li><strong>Achats et ventes :</strong> produits achetés ou vendus, montants, moyen de paiement utilisé, historique des transactions.</li>
        <li><strong>Retraits :</strong> numéro Mobile Money ou coordonnées bancaires du Vendeur.</li>
        <li><strong>Utilisation :</strong> progression dans les formations, résultats aux quiz, données techniques de connexion (adresse IP, appareil, navigateur).</li>
      </ul>
    ),
  },
  {
    id: "finalites",
    title: "Pourquoi nous les utilisons",
    body: (
      <ul>
        <li>Créer et gérer votre compte, et vous donner accès aux produits achetés.</li>
        <li>Traiter les paiements, les remboursements et les retraits.</li>
        <li>Vous envoyer les confirmations, reçus et notifications de vente (e-mail, SMS ou WhatsApp).</li>
        <li>Prévenir la fraude et sécuriser la plateforme.</li>
        <li>Améliorer le service à partir de statistiques d'utilisation anonymisées.</li>
      </ul>
    ),
  },
  {
    id: "partage",
    title: "Avec qui elles sont partagées",
    body: <p>Vos données ne sont jamais vendues. Elles sont transmises uniquement aux prestataires nécessaires au service : opérateurs de paiement (Mobile Money, cartes), hébergeur, services d'envoi d'e-mails et de messages. Lors d'un achat, le Vendeur reçoit le nom, l'e-mail et le numéro du Client afin d'assurer la livraison et le suivi.</p>,
  },
  {
    id: "conservation",
    title: "Durée de conservation",
    body: <p>Les données du compte sont conservées tant que le compte est actif, puis supprimées ou anonymisées dans un délai de 3 ans après la dernière activité. Les données de transaction sont conservées pendant la durée imposée par les obligations comptables et fiscales.</p>,
  },
  {
    id: "securite",
    title: "Sécurité",
    body: <p>Les échanges sont chiffrés (HTTPS), les mots de passe sont hachés et l'accès aux données est limité aux personnes qui en ont besoin. Les données de carte bancaire sont traitées directement par les prestataires de paiement certifiés et ne transitent pas par nos serveurs.</p>,
  },
  {
    id: "droits",
    title: "Vos droits",
    body: (
      <>
        <p>Conformément à la réglementation sur la protection des données personnelles applicable <strong>[au Sénégal : loi n° 2008-12]</strong>, vous disposez d'un droit d'accès, de rectification, d'opposition et de suppression de vos données.</p>
        <p>Pour les exercer, écrivez à <a href="mailto:donnees@savoirpay.com" className="font-semibold text-primary hover:underline">donnees@savoirpay.com</a>. Nous répondons sous 30 jours. Vous pouvez aussi saisir l'autorité de protection des données compétente <strong>[CDP]</strong>.</p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: <p>savoirpay utilise uniquement les cookies nécessaires au fonctionnement du service (connexion, sécurité, panier) et des mesures d'audience anonymisées. Aucun cookie publicitaire n'est déposé sans votre accord.</p>,
  },
  {
    id: "modifications",
    title: "Modifications",
    body: <p>Cette politique peut évoluer. En cas de changement important, vous en êtes informé par e-mail ou par un message dans votre tableau de bord avant son entrée en vigueur.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      current="/confidentialite"
      title="Politique de confidentialité"
      updated="22 octobre 2026"
      intro={<p>Cette politique explique quelles données nous collectons, pourquoi, combien de temps nous les gardons et comment exercer vos droits.</p>}
      sections={sections}
    />
  );
}
