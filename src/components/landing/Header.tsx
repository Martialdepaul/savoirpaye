"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../ui/Logo";

const links = [
  { label: "Fonctionnalités", href: "#fonctionnalites" },
  { label: "Créateur IA", href: "#createur-ia" },
  { label: "Tarifs", href: "#tarifs" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="py-3 text-sm font-medium text-ink-2 transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href="/dashboard" className="rounded-btn px-3 py-2 text-sm font-medium text-ink hover:bg-black/5">Connexion</a>
          <a href="#" className="rounded-btn bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
            Commencer gratuitement
          </a>
        </div>
        <button
          className="flex size-10 items-center justify-center rounded-btn border border-line bg-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-page px-5 pb-5 md:hidden">
          <nav className="flex flex-col py-2" aria-label="Navigation mobile">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-line py-3.5 text-base font-medium text-ink">
                {l.label}
              </a>
            ))}
            <a href="/dashboard" className="py-3.5 text-base font-medium text-ink">Connexion</a>
          </nav>
          <a href="#" className="mt-1 block rounded-btn bg-primary py-3 text-center font-semibold text-white">
            Commencer gratuitement
          </a>
        </div>
      )}
    </header>
  );
}
