"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "../ui/Logo";

export const links = [
  { label: "Comment ça marche", href: "/comment-ca-marche" },
  { label: "Créateur IA", href: "/createur-ia" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "FAQ", href: "/faq" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
          {links.map((l) => (
            <a key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined}
              className={`py-3 text-sm font-medium transition-colors hover:text-ink ${pathname === l.href ? "text-primary" : "text-ink-2"}`}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href="/connexion" className="rounded-btn px-3 py-2 text-sm font-medium text-ink hover:bg-black/5">Connexion</a>
          <a href="/inscription" className="rounded-btn bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
            Commencer gratuitement
          </a>
        </div>
        <button
          className="flex size-11 items-center justify-center rounded-btn border border-line bg-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-page px-5 pb-5 lg:hidden">
          <nav className="flex flex-col py-2" aria-label="Navigation mobile">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} aria-current={pathname === l.href ? "page" : undefined}
                className={`border-b border-line py-3.5 text-base font-medium ${pathname === l.href ? "text-primary" : "text-ink"}`}>
                {l.label}
              </a>
            ))}
            <a href="/connexion" className="py-3.5 text-base font-medium text-ink">Connexion</a>
          </nav>
          <a href="/inscription" className="mt-1 block rounded-btn bg-primary py-3 text-center font-semibold text-white">
            Commencer gratuitement
          </a>
        </div>
      )}
    </header>
  );
}
