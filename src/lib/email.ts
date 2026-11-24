// Envoi des e-mails automatiques (côté serveur uniquement).
// Par défaut via Resend ; si GMAIL_USER et GMAIL_APP_PASSWORD sont renseignés, via Gmail (SMTP).
// Sans domaine vérifié chez Resend, seuls les envois vers l'adresse du compte Resend aboutissent.
import { Resend } from "resend";
import nodemailer from "nodemailer";
import { site } from "./site-config";

type Mail = { to: string; subject: string; html: string; text: string };

// `||` et non `??` : une ligne « EMAIL_FROM= » vide doit aussi prendre l'expéditeur par défaut
const FROM_RESEND = process.env.EMAIL_FROM?.trim() || `${site.name} <onboarding@resend.dev>`;

export async function sendEmail(mail: Mail) {
  try {
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
      });
      await transport.sendMail({ from: `${site.name} <${process.env.GMAIL_USER}>`, ...mail });
      return;
    }
    if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY manquante");
    const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({ from: FROM_RESEND, ...mail });
    if (error) throw new Error(`${error.name} : ${error.message}`);
  } catch (e) {
    // Un e-mail qui échoue ne doit jamais bloquer l'inscription ou la connexion
    console.error(`[e-mail] Échec de l'envoi « ${mail.subject} » à ${mail.to} :`, e);
  }
}

/* ---------- Gabarit commun ---------- */

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function layout({ title, intro, cta, outro }: { title: string; intro: string[]; cta?: { label: string; url: string }; outro?: string[] }) {
  const p = (t: string) => `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#10231c">${t}</p>`;
  const small = (t: string) => `<p style="margin:0 0 12px;font-size:13px;line-height:1.6;color:#5b6b64">${t}</p>`;
  const button = cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px"><tr><td style="border-radius:10px;background:#0d4d3b">
        <a href="${cta.url}" style="display:inline-block;padding:14px 26px;font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:10px">${cta.label}</a>
      </td></tr></table>
      ${small(`Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br><a href="${cta.url}" style="color:#0d4d3b;word-break:break-all">${cta.url}</a>`)}`
    : "";
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#f7faf8;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7faf8;padding:24px 12px"><tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
      <tr><td style="padding:0 4px 16px;font-size:22px;font-weight:800;color:#0d4d3b">${site.name}</td></tr>
      <tr><td style="background:#ffffff;border:1px solid #e3ebe7;border-radius:16px;padding:28px 24px">
        <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#10231c">${title}</h1>
        ${intro.map(p).join("")}
        ${button}
        ${(outro ?? []).map(small).join("")}
      </td></tr>
      <tr><td style="padding:16px 4px;font-size:12px;line-height:1.6;color:#5b6b64">
        ${site.name} · ${site.tagline}<br>Vous recevez cet e-mail car un compte ${site.name} est associé à cette adresse.
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

const firstName = (name: string) => esc(name.trim().split(/\s+/)[0] || "");

/* ---------- E-mails ---------- */

export const verificationEmail = (name: string, url: string) => ({
  subject: `Confirmez votre adresse e-mail · ${site.name}`,
  html: layout({
    title: "Confirmez votre adresse e-mail",
    intro: [`Bonjour ${firstName(name)},`, "Merci pour votre inscription. Confirmez votre adresse e-mail pour sécuriser votre compte et recevoir vos notifications de vente."],
    cta: { label: "Confirmer mon adresse", url },
    outro: ["Ce lien est valable 24 heures.", "Vous n'êtes pas à l'origine de cette inscription ? Ignorez simplement cet e-mail."],
  }),
  text: `Bonjour ${name},\n\nConfirmez votre adresse e-mail en ouvrant ce lien (valable 24 heures) :\n${url}\n\nVous n'êtes pas à l'origine de cette inscription ? Ignorez cet e-mail.`,
});

export const welcomeEmail = (name: string) => {
  const url = `${process.env.BETTER_AUTH_URL ?? site.url}/onboarding`;
  return {
    subject: `Bienvenue sur ${site.name} !`,
    html: layout({
      title: `Bienvenue sur ${site.name}, ${firstName(name)} !`,
      intro: [
        "Votre compte est créé. Il ne vous reste que quelques minutes pour ouvrir votre boutique et commencer à vendre vos formations et produits numériques.",
        "<strong>1.</strong> Configurez votre boutique<br><strong>2.</strong> Ajoutez votre premier produit<br><strong>3.</strong> Partagez votre lien : vos clients paient par Mobile Money",
      ],
      cta: { label: "Configurer ma boutique", url },
      outro: ["Une question ? Répondez simplement à cet e-mail, notre équipe vous aide."],
    }),
    text: `Bienvenue sur ${site.name}, ${name} !\n\nVotre compte est créé. Configurez votre boutique ici :\n${url}`,
  };
};

export const resetPasswordEmail = (name: string, url: string) => ({
  subject: `Réinitialisez votre mot de passe · ${site.name}`,
  html: layout({
    title: "Choisissez un nouveau mot de passe",
    intro: [`Bonjour ${firstName(name)},`, "Vous avez demandé à réinitialiser le mot de passe de votre compte. Cliquez sur le bouton pour en choisir un nouveau."],
    cta: { label: "Choisir un nouveau mot de passe", url },
    outro: ["Ce lien est valable 1 heure et ne peut servir qu'une fois.", "Vous n'avez rien demandé ? Ignorez cet e-mail : votre mot de passe reste inchangé."],
  }),
  text: `Bonjour ${name},\n\nPour choisir un nouveau mot de passe, ouvrez ce lien (valable 1 heure) :\n${url}\n\nVous n'avez rien demandé ? Ignorez cet e-mail.`,
});

const base = () => process.env.BETTER_AUTH_URL ?? site.url;
const money = (n: number) => `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FCFA`;

type OrderInfo = { ref: string; buyerName: string; buyerEmail: string; buyerPhone: string; product: string; productType: string; amount: number; method: string; sellerName: string; sellerPhone?: string | null };

/** Acheteur : commande enregistrée, paiement à finaliser avec le vendeur */
export const orderReceivedEmail = (o: OrderInfo) => ({
  subject: `Commande ${o.ref} enregistrée · ${o.product}`,
  html: layout({
    title: "Votre commande est enregistrée",
    intro: [
      `Bonjour ${firstName(o.buyerName)},`,
      `Merci pour votre commande de <strong>${esc(o.product)}</strong> (${money(o.amount)}, référence <strong>${o.ref}</strong>).`,
      `${esc(o.sellerName)} va vous contacter${o.sellerPhone ? ` sur WhatsApp (${esc(o.sellerPhone)})` : ""} pour finaliser le paiement par ${esc(o.method)}. Dès que le paiement est confirmé, vous recevez votre accès par e-mail.`,
    ],
    outro: ["Gardez cette référence : elle vous sera demandée en cas de question."],
  }),
  text: `Bonjour ${o.buyerName},\n\nVotre commande ${o.ref} (${o.product}, ${money(o.amount)}) est enregistrée. ${o.sellerName} vous contacte pour finaliser le paiement par ${o.method}. Vous recevrez votre accès par e-mail dès la confirmation.`,
});

/** Acheteur : paiement confirmé, accès au produit */
export const orderPaidEmail = (o: OrderInfo) => {
  const coaching = o.productType === "Coaching";
  const url = `${base()}/dashboard/mes-formations`;
  const signup = `${base()}/inscription?suite=/dashboard/mes-formations`;
  return {
    subject: `${coaching ? "Réservation confirmée" : "Votre accès est prêt"} · ${o.product}`,
    html: layout({
      title: coaching ? "Votre séance est confirmée" : "Votre accès est prêt",
      intro: [
        `Bonjour ${firstName(o.buyerName)},`,
        coaching
          ? `Votre paiement pour <strong>${esc(o.product)}</strong> est confirmé (référence ${o.ref}). ${esc(o.sellerName)} vous contacte pour fixer la date de la séance.`
          : `Votre paiement pour <strong>${esc(o.product)}</strong> est confirmé (référence ${o.ref}). Retrouvez votre achat dans votre espace « Mes achats ».`,
        ...(coaching ? [] : [`Connectez-vous avec l'adresse <strong>${esc(o.buyerEmail)}</strong>. Pas encore de compte ? <a href="${signup}" style="color:#0d4d3b">Créez-le en 1 minute</a> avec cette même adresse.`]),
      ],
      cta: coaching ? undefined : { label: "Accéder à mon achat", url },
    }),
    text: coaching
      ? `Bonjour ${o.buyerName},\n\nVotre paiement pour ${o.product} est confirmé (${o.ref}). ${o.sellerName} vous contacte pour fixer la séance.`
      : `Bonjour ${o.buyerName},\n\nVotre paiement pour ${o.product} est confirmé (${o.ref}). Accédez à votre achat : ${url}\nPas encore de compte ? Créez-le avec ${o.buyerEmail} : ${signup}`,
  };
};

/** Vendeur : nouvelle commande */
export const newOrderEmail = (o: OrderInfo, paid: boolean) => {
  const url = `${base()}/dashboard/commandes`;
  return {
    subject: `${paid ? "Nouvelle inscription" : "Nouvelle commande"} ${o.ref} · ${o.product}`,
    html: layout({
      title: paid ? "Nouvel inscrit à votre produit gratuit" : "Vous avez une nouvelle commande",
      intro: [
        `<strong>${esc(o.buyerName)}</strong> a ${paid ? "obtenu" : "commandé"} <strong>${esc(o.product)}</strong>${o.amount ? ` (${money(o.amount)})` : ""}.`,
        `E-mail : ${esc(o.buyerEmail)}<br>Téléphone : ${esc(o.buyerPhone)}<br>Moyen de paiement choisi : ${esc(o.method)}`,
        ...(paid ? [] : ["Contactez votre client pour recevoir le paiement, puis marquez la commande comme payée : il recevra aussitôt son accès."]),
      ],
      cta: { label: "Voir la commande", url },
    }),
    text: `${o.buyerName} a ${paid ? "obtenu" : "commandé"} ${o.product} (${money(o.amount)}). ${o.buyerEmail} · ${o.buyerPhone}. Voir : ${url}`,
  };
};

export const passwordChangedEmail = (name: string) => {
  const url = `${process.env.BETTER_AUTH_URL ?? site.url}/mot-de-passe-oublie`;
  return {
    subject: `Votre mot de passe a été modifié · ${site.name}`,
    html: layout({
      title: "Votre mot de passe a été modifié",
      intro: [`Bonjour ${firstName(name)},`, `Le mot de passe de votre compte ${site.name} vient d'être modifié. Par sécurité, toutes vos autres sessions ont été déconnectées.`],
      outro: [`Ce n'était pas vous ? <a href="${url}" style="color:#0d4d3b">Réinitialisez immédiatement votre mot de passe</a> et contactez notre support.`],
    }),
    text: `Bonjour ${name},\n\nLe mot de passe de votre compte ${site.name} vient d'être modifié.\nCe n'était pas vous ? Réinitialisez-le immédiatement : ${url}`,
  };
};
