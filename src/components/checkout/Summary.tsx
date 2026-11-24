import { Mail, MessageCircle } from "lucide-react";
import Cover from "../sales/Cover";
import { fcfa } from "../../lib/dashboard-data";
import { lessonCount, type CatalogProduct } from "../../lib/catalog";

export default function Summary({ product: p }: { product: CatalogProduct }) {
  const meta = p.type === "Formation"
    ? `${p.modules.length} module${p.modules.length > 1 ? "s" : ""} · ${lessonCount(p)} leçon${lessonCount(p) > 1 ? "s" : ""}`
    : p.type === "Produit numérique" ? `${p.files.length} fichier${p.files.length > 1 ? "s" : ""} à télécharger` : p.coaching ? `Séance de ${p.coaching.duration}` : "";
  return (
    <div className="rounded-card border border-line bg-white p-5 shadow-soft">
      <h2 className="font-heading text-lg font-bold">Récapitulatif</h2>
      <div className="mt-4 flex gap-4">
        <Cover src={p.cover} type={p.type} className="size-20 shrink-0 rounded-lg" iconSize={28} />
        <div className="min-w-0">
          <div className="break-words font-heading font-bold leading-snug">{p.name}</div>
          <div className="mt-1 text-sm text-ink-2">par {p.seller.name}</div>
          {meta && <div className="num mt-1 text-xs text-ink-2">{meta}</div>}
        </div>
      </div>
      <dl className="num mt-5 space-y-2.5 border-t border-line pt-4 text-sm">
        <div className="flex justify-between gap-3"><dt className="text-ink-2">{p.type}</dt><dd className="whitespace-nowrap">{p.price === 0 ? "Gratuit" : fcfa(p.price)}</dd></div>
        <div className="flex justify-between gap-3"><dt className="text-ink-2">Frais de service</dt><dd>0 FCFA</dd></div>
        <div className="flex items-baseline justify-between gap-3 border-t border-line pt-3">
          <dt className="font-semibold">Total</dt>
          <dd className="whitespace-nowrap font-heading text-2xl font-extrabold text-gold-ink">{p.price === 0 ? "Gratuit" : fcfa(p.price)}</dd>
        </div>
      </dl>
      <p className="mt-4 flex items-start gap-2 text-xs text-ink-2"><Mail size={15} className="mt-0.5 shrink-0 text-success" /> Votre accès vous est envoyé par e-mail.</p>
      {p.price > 0 && <p className="mt-2 flex items-start gap-2 text-xs text-ink-2"><MessageCircle size={14} className="mt-0.5 shrink-0" /> Paiement par Mobile Money, directement auprès de {p.seller.name.split(" ")[0]}.</p>}
    </div>
  );
}
