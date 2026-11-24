"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Plus, FileDown, GraduationCap, Video } from "lucide-react";

const items: { label: string; icon: typeof Plus; href: string; ai?: boolean }[] = [
  { label: "Nouvelle formation", icon: GraduationCap, href: "/dashboard/produits/nouveau?type=formation" },
  { label: "Nouveau produit numérique", icon: FileDown, href: "/dashboard/produits/nouveau?type=numerique" },
  { label: "Nouvelle séance de coaching", icon: Video, href: "/dashboard/produits/nouveau?type=coaching" },
];

export function CreateMenuList({ onPick }: { onPick: () => void }) {
  const router = useRouter();
  return (
    <ul role="menu">
      {items.map((i) => (
        <li key={i.label} role="none">
          <button
            role="menuitem"
            onClick={() => { onPick(); router.push(i.href); }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium hover:bg-page ${i.ai ? "text-ai" : "text-ink"}`}
          >
            <i.icon size={18} /> {i.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

export function CreateButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-btn bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
      >
        <Plus size={17} /> Créer
      </button>
      {open && (
        <div className="absolute right-0 top-12 w-60 rounded-card border border-line bg-white p-1.5 shadow-[0_8px_30px_rgb(28_25_23/0.1)]">
          <CreateMenuList onPick={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}
