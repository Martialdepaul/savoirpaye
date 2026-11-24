"use client";

// Lien « Connexion » des pages publiques, remplacé par « Mon tableau de bord » quand l'utilisateur est connecté.
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function AccountLink({ className = "-mr-3 px-3 py-3 text-sm font-medium text-ink-2 hover:text-ink" }: { className?: string }) {
  const { data, isPending } = useSession();
  if (isPending) return <span className={`${className} invisible`} aria-hidden>Connexion</span>;
  return data ? (
    <Link href="/dashboard" className={`${className} inline-flex items-center gap-1.5`}>
      <LayoutDashboard size={16} /> Mon tableau de bord
    </Link>
  ) : (
    <Link href="/connexion" className={className}>Connexion</Link>
  );
}
