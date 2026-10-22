"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import Logo from "../ui/Logo";
import { CreateButton } from "./CreateMenu";
import { NavList, SellerCard } from "./Sidebar";
import Notifications from "./Notifications";

const today = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-line bg-page/90 px-4 backdrop-blur sm:px-8">
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            className="-ml-2 flex size-11 items-center justify-center rounded-btn text-ink hover:bg-white"
          >
            <Menu size={22} />
          </button>
          <Logo href="/dashboard" />
        </div>
        <div suppressHydrationWarning className="hidden text-sm capitalize text-ink-2 lg:block">{today}</div>
        <div className="flex items-center gap-2 sm:gap-3">
          <CreateButton />
          <Notifications />
          <a href="/dashboard/parametres" aria-label="Mon profil" className="lg:hidden">
            <img src="/images/team-1.jpg" alt="" className="size-10 rounded-full object-cover" />
          </a>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-xs flex-col bg-white shadow-lift">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
              <Logo />
              <button onClick={() => setOpen(false)} aria-label="Fermer le menu" className="flex size-10 items-center justify-center rounded-btn hover:bg-page"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-3"><NavList onNavigate={() => setOpen(false)} /></div>
            <div className="flex items-center justify-between border-t border-line p-4">
              <SellerCard />
              <a href="/connexion" aria-label="Se déconnecter" className="flex size-10 items-center justify-center rounded-btn text-ink-2 hover:bg-page hover:text-danger"><LogOut size={18} /></a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
