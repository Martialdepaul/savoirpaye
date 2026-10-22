"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, User, ArrowRight } from "lucide-react";
import Logo from "../ui/Logo";
import { navLinks } from "../../lib/site-data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-forest/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-5">
        <Logo tone="light" />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
          {navLinks.map((l) => {
            const active = isActive(l.href);
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-3 text-sm font-medium transition-colors hover:text-white ${
                  active ? "text-white after:absolute after:inset-x-0 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-gold" : "text-white/75"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href="/connexion" className="inline-flex items-center gap-2 rounded-btn border border-white/30 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10">
            <User size={16} /> Se connecter
          </a>
          <a href="/inscription" className="rounded-btn bg-gold px-4 py-2.5 text-sm font-bold text-forest transition-colors hover:bg-gold-hover">
            Créer mon compte
          </a>
        </div>
        <button
          className="flex size-10 items-center justify-center rounded-btn border border-white/20 text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div id="menu-mobile" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-forest px-4 pb-8 sm:px-5 lg:hidden">
          <nav className="flex flex-col py-2" aria-label="Navigation mobile">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`flex items-center justify-between border-b border-white/10 py-4 text-base font-medium ${isActive(l.href) ? "text-gold" : "text-white"}`}
              >
                {l.label} <ArrowRight size={16} className="opacity-50" />
              </a>
            ))}
            <a href="/contact" className="flex items-center justify-between border-b border-white/10 py-4 text-base font-medium text-white">
              Contact <ArrowRight size={16} className="opacity-50" />
            </a>
          </nav>
          <div className="mt-6 grid gap-3">
            <a href="/inscription" className="block rounded-btn bg-gold py-3.5 text-center font-bold text-forest">Créer mon compte</a>
            <a href="/connexion" className="block rounded-btn border border-white/30 py-3.5 text-center font-semibold text-white">Se connecter</a>
          </div>
        </div>
      )}
    </header>
  );
}
