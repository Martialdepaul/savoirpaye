"use client";

import { useState } from "react";
import { Home, Package, Plus, ShoppingBag, Wallet } from "lucide-react";
import { CreateMenuList } from "./CreateMenu";

const left = [{ label: "Accueil", icon: Home }, { label: "Produits", icon: Package }];
const right = [{ label: "Commandes", icon: ShoppingBag }, { label: "Portefeuille", icon: Wallet }];

function Item({ label, icon: Icon, active }: { label: string; icon: typeof Home; active?: boolean }) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-current={active ? "page" : undefined}
      className={`flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium ${active ? "text-primary" : "text-ink-2"}`}
    >
      <Icon size={21} /> {label}
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
        <div className="mx-auto flex max-w-md items-end px-2">
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
          {right.map((n) => <Item key={n.label} {...n} />)}
        </div>
      </nav>
    </>
  );
}
