import { FileDown, GraduationCap, Video } from "lucide-react";
import type { ProductType } from "../../lib/catalog";

const icons: Record<ProductType, typeof GraduationCap> = { Formation: GraduationCap, "Produit numérique": FileDown, Coaching: Video };

/** Image de couverture d'un produit, ou un visuel aux couleurs de Savoirpay s'il n'en a pas */
export default function Cover({ src, type, className = "", iconSize = 40 }: { src: string; type: ProductType; className?: string; iconSize?: number }) {
  if (src) return <img src={src} alt="" loading="lazy" className={`object-cover ${className}`} />;
  const Icon = icons[type] ?? GraduationCap;
  return (
    <span aria-hidden className={`bg-forest-glow flex items-center justify-center text-white/85 ${className}`}>
      <Icon size={iconSize} />
    </span>
  );
}
