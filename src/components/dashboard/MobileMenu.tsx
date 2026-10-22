"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { navItems } from "./nav";
import { seller } from "../../lib/dashboard-data";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        className="flex size-10 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-white lg:hidden"
      >
        {seller.initials}
      </button>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-ink/30" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col bg-white shadow-[0_8px_30px_rgb(28_25_23/0.15)]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-line p-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-white">{seller.initials}</span>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{seller.name}</div>
                  <div className="truncate text-xs text-ink-2">{seller.role}</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Fermer le menu" className="flex size-11 shrink-0 items-center justify-center rounded-btn text-ink-2 hover:bg-page hover:text-ink">
                <X size={20} />
              </button>
            </div>
            <nav aria-label="Navigation du tableau de bord" className="flex-1 space-y-1 overflow-y-auto p-3">
              {navItems.map((n) => {
                const active = pathname === n.href;
                const Icon = n.icon;
                return (
                  <a
                    key={n.label}
                    href={n.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-12 items-center gap-3 rounded-btn px-3 text-sm font-medium transition-colors ${
                      active ? "bg-primary-light text-primary" : "text-ink-2 hover:bg-page hover:text-ink"
                    }`}
                  >
                    <Icon size={18} className={n.ai ? "text-ai" : ""} />
                    {n.label}
                    {n.ai && <span className="ml-auto rounded-md bg-ai-light px-1.5 py-0.5 text-[11px] font-bold text-ai">IA</span>}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
