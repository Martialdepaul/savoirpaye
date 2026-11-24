"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Mail, MessageCircle } from "lucide-react";
import { fcfa } from "../../lib/dashboard-data";
import type { CatalogProduct } from "../../lib/catalog";
import type { Buyer } from "./CheckoutForm";
import { useSession } from "../../lib/auth-client";

/** Confirmation après la commande : accès immédiat (gratuit) ou commande en attente du paiement */
export function Success({ buyer, product: p, orderRef, paid }: { buyer: Buyer; product: CatalogProduct; orderRef: string; paid: boolean }) {
  const { data } = useSession();
  const sameAccount = data?.user.email.toLowerCase() === buyer.email.trim().toLowerCase();
  const first = buyer.name.trim().split(" ")[0];
  const seller = p.seller.name.split(" ")[0];
  const rows = [
    ["Référence", orderRef],
    [p.type, p.name],
    ...(p.price > 0 ? [["Paiement", buyer.method]] : []),
    ["Montant", p.price === 0 ? "Gratuit" : fcfa(p.price)],
  ];
  const accessHref = sameAccount ? "/dashboard/mes-formations" : `/inscription?suite=/dashboard/mes-formations`;

  return (
    <div className="mx-auto max-w-md text-center">
      {paid ? (
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#ECF8EF] text-success"><CheckCircle2 size={34} /></span>
      ) : (
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#FDF3E3] text-pending"><Clock size={32} /></span>
      )}
      <h1 className="mt-5 font-heading text-2xl font-extrabold">{paid ? "C'est à vous !" : "Commande enregistrée"}</h1>
      <p className="mt-2 leading-relaxed text-ink-2">
        {paid
          ? p.type === "Coaching" ? `Merci ${first}, ${seller} vous contacte pour fixer la date de la séance.` : `Merci ${first}, votre accès est prêt.`
          : `Merci ${first}. ${seller} vous contacte${p.seller.phone ? " sur WhatsApp" : ""} pour recevoir le paiement par ${buyer.method}. Dès sa confirmation, vous recevez votre accès par e-mail.`}
      </p>
      <dl className="num mt-6 divide-y divide-line rounded-card border border-line bg-white text-left text-sm shadow-soft">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 px-4 py-3">
            <dt className="shrink-0 text-ink-2">{k}</dt>
            <dd className={`min-w-0 break-words text-right font-semibold ${k === "Montant" ? "text-gold-ink" : ""}`}>{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 flex items-center justify-center gap-2 text-sm text-ink-2"><Mail size={15} className="shrink-0" /> <span className="break-all">Un récapitulatif a été envoyé à {buyer.email}</span></p>

      {paid && p.type !== "Coaching" && (
        <>
          <Link href={accessHref} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-btn bg-primary px-6 font-semibold text-white hover:bg-primary-hover">
            {sameAccount ? "Accéder à mon achat" : "Créer mon compte pour y accéder"} <ArrowRight size={18} />
          </Link>
          {!sameAccount && (
            <p className="mt-3 text-sm text-ink-2">Utilisez l'adresse <strong className="break-all text-ink">{buyer.email}</strong>. Déjà un compte ? <Link href="/connexion?suite=/dashboard/mes-formations" className="font-semibold text-primary hover:underline">Connectez-vous</Link></p>
          )}
        </>
      )}
      {!paid && p.seller.phone && (
        <a href={`https://wa.me/${p.seller.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Bonjour, je viens de commander « ${p.name} » (${orderRef}). Comment puis-je payer par ${buyer.method} ?`)}`}
          target="_blank" rel="noopener" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-btn bg-primary px-6 font-semibold text-white hover:bg-primary-hover">
          <MessageCircle size={18} /> Écrire à {seller} sur WhatsApp
        </a>
      )}
      <Link href={`/boutique/${p.seller.shopSlug}`} className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-btn border border-line bg-white px-6 font-semibold hover:bg-page">Retour à la boutique</Link>
    </div>
  );
}
