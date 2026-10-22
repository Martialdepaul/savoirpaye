import { Lock, ShieldCheck } from "lucide-react";
import { fcfa } from "../../lib/dashboard-data";
import { lessonCount, seller, type CatalogProduct } from "../../lib/catalog";

export default function Summary({ product: p }: { product: CatalogProduct }) {
  const meta = p.modules ? `${p.modules.length} modules · ${lessonCount(p)} leçons` : p.files ? `${p.files.length} fichier${p.files.length > 1 ? "s" : ""} à télécharger` : p.coaching ? `Séance de ${p.coaching.duration}` : "";
  return (
    <div className="rounded-card border border-line bg-white p-5 shadow-soft">
      <h2 className="font-heading text-lg font-bold">Récapitulatif</h2>
      <div className="mt-4 flex gap-4">
        <img src={p.cover} alt="" className="size-20 shrink-0 rounded-lg bg-primary object-cover" />
        <div className="min-w-0">
          <div className="font-heading font-bold leading-snug">{p.name}</div>
          <div className="mt-1 text-sm text-ink-2">par {seller.name}</div>
          {meta && <div className="num mt-1 text-xs text-ink-2">{meta}</div>}
        </div>
      </div>
      <dl className="num mt-5 space-y-2.5 border-t border-line pt-4 text-sm">
        <div className="flex justify-between"><dt className="text-ink-2">{p.type}</dt><dd>{fcfa(p.price)}</dd></div>
        <div className="flex justify-between"><dt className="text-ink-2">Frais de service</dt><dd>0 FCFA</dd></div>
        <div className="flex items-baseline justify-between border-t border-line pt-3">
          <dt className="font-semibold">Total à payer</dt>
          <dd className="font-heading text-2xl font-extrabold text-gold-ink">{fcfa(p.price)}</dd>
        </div>
      </dl>
      <p className="mt-4 flex items-start gap-2 text-xs text-ink-2"><ShieldCheck size={15} className="mt-0.5 shrink-0 text-success" /> Garantie satisfait ou remboursé pendant 7 jours.</p>
      <p className="mt-2 flex items-start gap-2 text-xs text-ink-2"><Lock size={14} className="mt-0.5 shrink-0" /> Paiement sécurisé et chiffré.</p>
    </div>
  );
}
