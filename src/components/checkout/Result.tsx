import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Mail } from "lucide-react";
import { fcfa } from "../../lib/dashboard-data";
import { productUrl, seller, type CatalogProduct } from "../../lib/catalog";
import type { Buyer } from "./CheckoutForm";

const access = (p: CatalogProduct) =>
  p.type === "Formation"
    ? { text: "votre formation est disponible dès maintenant.", cta: "Accéder à la formation", href: "/dashboard/mes-formations" }
    : p.type === "Produit numérique"
      ? { text: "vos fichiers sont prêts à être téléchargés.", cta: "Télécharger mes fichiers", href: "/dashboard/mes-formations" }
      : { text: `${seller.name.split(" ")[0]} vous contacte sur WhatsApp pour fixer votre créneau.`, cta: "Retour à la boutique", href: `/boutique/${seller.slug}` };

export function Success({ buyer, product: p }: { buyer: Buyer; product: CatalogProduct }) {
  const a = access(p);
  const rows = [
    ["Référence", "#SP-4822"],
    [p.type, p.name],
    ["Moyen de paiement", buyer.method],
    ["Montant payé", fcfa(p.price)],
  ];
  return (
    <div className="mx-auto max-w-md text-center">
      <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#ECF8EF] text-success"><CheckCircle2 size={34} /></span>
      <h1 className="mt-5 font-heading text-2xl font-extrabold">Paiement confirmé</h1>
      <p className="mt-2 text-ink-2">Merci {buyer.name.split(" ")[0]}, {a.text}</p>
      <dl className="num mt-6 divide-y divide-line rounded-card border border-line bg-white text-left text-sm shadow-soft">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 px-4 py-3">
            <dt className="text-ink-2">{k}</dt>
            <dd className={`text-right font-semibold ${k === "Montant payé" ? "text-gold-ink" : ""}`}>{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 flex items-center justify-center gap-2 text-sm text-ink-2"><Mail size={15} /> Un reçu a été envoyé à {buyer.email}</p>
      <Link href={a.href} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-btn bg-primary px-6 py-3.5 font-semibold text-white hover:bg-primary-hover">
        {a.cta} <ArrowRight size={18} />
      </Link>
    </div>
  );
}

export function Failure({ reason, product, onRetry }: { reason: "expired" | "declined"; product: CatalogProduct; onRetry: () => void }) {
  return (
    <div className="mx-auto max-w-md text-center">
      <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#FCEDED] text-danger"><XCircle size={34} /></span>
      <h1 className="mt-5 font-heading text-2xl font-extrabold">Le paiement n'a pas abouti</h1>
      <p className="mt-2 leading-relaxed text-ink-2">
        {reason === "expired"
          ? "Le délai de confirmation est dépassé. Aucun montant n'a été débité."
          : "Le paiement a été refusé ou annulé. Aucun montant n'a été débité. Vérifiez votre solde et votre numéro, puis réessayez."}
      </p>
      <button onClick={onRetry} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-btn bg-primary px-6 py-3.5 font-semibold text-white hover:bg-primary-hover">
        <RotateCcw size={17} /> Réessayer
      </button>
      <Link href={productUrl(product)} className="mt-3 inline-flex w-full justify-center rounded-btn border border-line bg-white px-6 py-3.5 font-semibold hover:bg-page">Retour au produit</Link>
      <p className="mt-5 text-sm text-ink-2">Besoin d'aide ? Écrivez-nous à <span className="font-medium text-ink">aide@savoirpay.com</span></p>
    </div>
  );
}
