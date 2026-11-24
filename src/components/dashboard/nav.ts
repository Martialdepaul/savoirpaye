import { Home, Package, GraduationCap, Sparkles, ShoppingBag, Users, Wallet, BarChart3, Settings, Bell, LifeBuoy, Store, Globe } from "lucide-react";

export const navItems = [
  { label: "Accueil", icon: Home, href: "/dashboard" },
  { label: "Produits", icon: Package, href: "/dashboard/produits" },
  { label: "Mes achats", icon: GraduationCap, href: "/dashboard/mes-formations" },
  { label: "Créateur IA", icon: Sparkles, ai: true, href: "/dashboard/createur-ia" },
  { label: "Commandes", icon: ShoppingBag, href: "/dashboard/commandes" },
  { label: "Clients", icon: Users, href: "/dashboard/clients" },
  { label: "Portefeuille", icon: Wallet, href: "/dashboard/portefeuille" },
  { label: "Statistiques", icon: BarChart3, href: "/dashboard/statistiques" },
  { label: "Paramètres", icon: Settings, href: "/dashboard/parametres" },
];

/** Adresse de la boutique du vendeur connecté, ou l'onboarding s'il n'en a pas encore */
export const shopHref = (slug?: string | null) => (slug ? `/boutique/${slug}` : "/onboarding");

export const secondaryNav = [
  { label: "Notifications", icon: Bell, href: "/dashboard/notifications" },
  { label: "Centre d'aide", icon: LifeBuoy, href: "/dashboard/aide" },
  // href remplacé par l'adresse réelle de la boutique dans NavList
  { label: "Voir ma boutique", icon: Store, href: "/boutique" },
  { label: "Retour au site", icon: Globe, href: "/" },
];

/** Retourne le libellé de l'entrée active pour une URL donnée (correspondance la plus longue). */
export function activeLabel(pathname: string) {
  const all = [...navItems, ...secondaryNav].filter((n) => n.href.startsWith("/dashboard"));
  const match = all
    .filter((n) => pathname === n.href || pathname.startsWith(n.href + "/"))
    .sort((a, b) => b.href.length - a.href.length)[0];
  return match?.label ?? "Accueil";
}
