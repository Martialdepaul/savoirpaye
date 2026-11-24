"use client";

// Compte connecté (utilisateur + boutique), chargé côté serveur par le layout du tableau de bord.
// Après une modification, `router.refresh()` recharge ces données.
import { createContext, useContext, type ReactNode } from "react";
import type { Account } from "@/lib/account";

const AccountContext = createContext<Account | null>(null);

export function AccountProvider({ value, children }: { value: Account; children: ReactNode }) {
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

/** Compte connecté ; null hors du tableau de bord */
export function useAccount() {
  return useContext(AccountContext);
}

export const firstName = (name?: string | null) => (name ?? "").trim().split(/\s+/)[0] ?? "";
export const initials = (name?: string | null) =>
  (name ?? "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("");
