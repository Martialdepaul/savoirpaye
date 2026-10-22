"use client";

import { useState } from "react";
import { Home, Package, Plus, ShoppingBag, Wallet } from "lucide-react";
import { CreateMenuList } from "./CreateMenu";

const left = [
  { label: "Accueil", icon: Home, href: "/dashboard" },
  { label: "Produits", icon: Package, href: "/dashboard/produits" },
];
const right = [
  { label: "Commandes", icon: ShoppingBag, href: "/dashboard/commandes" },
  { label: "Portefeuille", icon: Wallet, href: "/dashboard/portefeuille" },
];

function Item({ label, icon: Icon, href, active }: { label: string; icon: typeof Home; href: string; active?: boolean }) {
  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium min-[360px]:text-[11px] ${active ? "text-primary" : "text-ink-2"}`}
    >
      <Icon size={21} className="shrink-0" /> <span className="max-w-full truncate">{label}</span>
    </a>
  );
}

export default function BottomNav({ active = "Accueil" }: { active?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-ink/30" />
          <div onClick={(e) => e.stopPropagation()} className="absolute inset-x-3 bottom-24 rounded-card border border-line bg-white p-2 shadow-[0_8px_30px_rgb(28_25_23/0.15)]">
            <CreateMenuList onPick={() => setOpen(false)} />
          </div>
        </div>
      )}
      <nav aria-label="Navigation principale" className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
        <div className="mx-auto flex max-w-md items-end px-1 min-[360px]:px-2">
          {left.map((n) => <Item key={n.label} {...n} active={n.label === active} />)}
          <div className="flex flex-1 justify-center">
            <button
              onClick={() => setOpen(!open)}
              aria-label="Créer"
              aria-expanded={open}
              className="-mt-5 flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_6px_16px_rgb(11_93_85/0.35)] ring-4 ring-page transition-colors hover:bg-primary-hover"
            >
              <Plus size={26} className={`transition-transform ${open ? "rotate-45" : ""}`} />
            </button>
          </div>
          {right.map((n) => <Item key={n.label} {...n} active={n.label === active} />)}
        </div>
      </nav>
    </>
  );
}
