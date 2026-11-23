"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { signOut, useSession } from "../../lib/auth-client";
import Logo from "../ui/Logo";
import { activeLabel, navItems, secondaryNav } from "./nav";
import { seller } from "../../lib/dashboard-data";
import { plans } from "../../lib/mock-data";

const plan = plans.find((p) => p.name === seller.plan)!;

export function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const current = activeLabel(usePathname());
  const item = (n: (typeof navItems)[number] | (typeof secondaryNav)[number], ai = false) => {
    const active = n.label === current;
    return (
      <Link
        key={n.label}
        href={n.href}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        className={`flex items-center gap-3 rounded-btn px-3 py-2.5 text-sm font-medium transition-colors ${
          active ? "bg-primary text-white shadow-soft" : "text-ink-2 hover:bg-mint hover:text-ink"
        }`}
      >
        <n.icon size={18} className={ai && !active ? "text-ai" : ""} />
        {n.label}
        {ai && <span className={`ml-auto rounded-md px-1.5 py-0.5 text-[11px] font-bold ${active ? "bg-white/20 text-white" : "bg-ai-light text-ai"}`}>IA</span>}
      </Link>
    );
  };
  return (
    <>
      <nav className="space-y-1" aria-label="Navigation du tableau de bord">
        {navItems.map((n) => item(n, "ai" in n && !!n.ai))}
      </nav>
      <div className="my-4 h-px bg-line" />
      <nav className="space-y-1" aria-label="Liens utiles">
        {secondaryNav.map((n) => item(n))}
      </nav>
    </>
  );
}

/** Photo de l'utilisateur connecté (Google) ou ses initiales */
export function UserAvatar({ className = "size-10" }: { className?: string }) {
  const { data } = useSession();
  const u = data?.user;
  if (u?.image) return <img src={u.image} alt="" referrerPolicy="no-referrer" className={`${className} shrink-0 rounded-full object-cover`} />;
  const initials = (u?.name ?? "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("");
  return (
    <span aria-hidden className={`${className} flex shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary`}>
      {initials || "·"}
    </span>
  );
}

/** Bouton de déconnexion (ferme la session puis renvoie vers la page de connexion) */
export function SignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await signOut();
        router.push("/connexion");
        router.refresh();
      }}
      aria-label="Se déconnecter"
      title="Se déconnecter"
      className="flex size-11 shrink-0 items-center justify-center rounded-btn text-ink-2 hover:bg-page hover:text-danger disabled:opacity-60"
    >
      {busy ? <Loader2 size={18} className="animate-spin" /> : <LogOut size={18} />}
    </button>
  );
}

export function SellerCard() {
  const { data, isPending } = useSession();
  const u = data?.user;
  return (
    <div className="flex min-w-0 items-center gap-3">
      <UserAvatar />
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold">{isPending ? "…" : u?.name ?? seller.name}</div>
        <div className="truncate text-xs text-ink-2">{u?.email ?? seller.role}</div>
      </div>
    </div>
  );
}

// `active` est conservé pour compatibilité ; l'entrée active est déduite de l'URL.
export default function Sidebar(_: { active?: string }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-line bg-white lg:flex">
      <div className="flex h-16 shrink-0 items-center px-6"><Logo href="/dashboard" /></div>
      <div className="flex-1 overflow-y-auto px-3 py-2"><NavList /></div>
      <div className="border-t border-line p-4">
        <div className="mb-4 rounded-card bg-forest p-4 text-white">
          <div className="text-xs text-white/70">Plan actuel</div>
          <div className="font-heading font-bold">{plan.name} · <span className="text-gold">{plan.price}</span><span className="text-xs font-medium text-white/70"> / mois</span></div>
          <Link href="/tarifs" className="mt-1 inline-block py-1.5 text-xs font-semibold text-gold hover:underline">Passer à Business</Link>
        </div>
        <div className="flex items-center justify-between gap-2">
          <SellerCard />
          <SignOutButton />
        </div>
      </div>
    </aside>
  );
}
