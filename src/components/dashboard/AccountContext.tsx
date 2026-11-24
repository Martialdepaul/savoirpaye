"use client";

// Compte connecté (utilisateur + boutique) et données de la boutique (produits, commandes, retraits),
// chargés côté serveur par le layout du tableau de bord. Après une modification, `router.refresh()` les recharge.
import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Account } from "@/lib/account";
import type { ShopData } from "@/lib/store";
import type { Order } from "@/lib/dashboard-data";
import type { Withdrawal } from "@/lib/wallet-data";
import type { CatalogProduct } from "@/lib/catalog";

const AccountContext = createContext<Account | null>(null);
const ShopDataContext = createContext<ShopData | null>(null);

export function AccountProvider({ value, data, children }: { value: Account; data?: ShopData | null; children: ReactNode }) {
  return (
    <AccountContext.Provider value={value}>
      <ShopDataContext.Provider value={data ?? null}>{children}</ShopDataContext.Provider>
    </AccountContext.Provider>
  );
}

/** Compte connecté ; null hors du tableau de bord */
export function useAccount() {
  return useContext(AccountContext);
}

export type ShopDataView = { products: CatalogProduct[]; orders: Order[]; withdrawals: Withdrawal[] };

/** Produits, commandes et retraits de la boutique (listes vides sans boutique) */
export function useShopData(): ShopDataView {
  const raw = useContext(ShopDataContext);
  return useMemo(() => ({
    products: raw?.products ?? [],
    orders: (raw?.orders ?? []).map((o) => ({ ...o, date: new Date(o.date), paidAt: o.paidAt ? new Date(o.paidAt) : null })),
    withdrawals: (raw?.withdrawals ?? []).map((w) => ({ ...w, date: new Date(w.date) })),
  }), [raw]);
}

export const firstName = (name?: string | null) => (name ?? "").trim().split(/\s+/)[0] ?? "";
export const initials = (name?: string | null) =>
  (name ?? "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("");
