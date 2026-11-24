import Link from "next/link";
import { BarChart3, Bell, GraduationCap, Package, ShoppingBag, Users, Wallet } from "lucide-react";

const icons = { package: Package, orders: ShoppingBag, clients: Users, wallet: Wallet, stats: BarChart3, bell: Bell, learn: GraduationCap };

/** Écran vide expliquant ce qui apparaîtra ici et comment y arriver */
export default function EmptyState({ icon, title, text, cta, compact = false }: {
  icon: keyof typeof icons;
  title: string;
  text: string;
  cta?: { label: string; href: string };
  compact?: boolean;
}) {
  const Icon = icons[icon];
  return (
    <div className={`rounded-card border border-dashed border-line bg-white text-center ${compact ? "px-4 py-8" : "px-5 py-12"}`}>
      <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-mint text-primary"><Icon size={26} /></span>
      <p className="mt-4 font-heading text-lg font-bold">{title}</p>
      <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-ink-2">{text}</p>
      {cta && (
        <Link href={cta.href} className="mt-5 inline-flex min-h-12 items-center justify-center rounded-btn bg-primary px-6 font-semibold text-white hover:bg-primary-hover">
          {cta.label}
        </Link>
      )}
    </div>
  );
}
