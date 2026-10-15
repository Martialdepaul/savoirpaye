import { Home, Package, GraduationCap, Sparkles, ShoppingBag, Users, Wallet, BarChart3, Settings } from "lucide-react";

export const navItems = [
  { label: "Accueil", icon: Home, href: "/dashboard" },
  { label: "Produits", icon: Package, href: "/dashboard/produits" },
  { label: "Formations", icon: GraduationCap, href: "/dashboard/mes-formations" },
  { label: "Créateur IA", icon: Sparkles, ai: true, href: "/dashboard/createur-ia" },
  { label: "Commandes", icon: ShoppingBag, href: "/dashboard/commandes" },
  { label: "Clients", icon: Users, href: "/dashboard/clients" },
  { label: "Portefeuille", icon: Wallet, href: "/dashboard/portefeuille" },
  { label: "Statistiques", icon: BarChart3, href: "/dashboard/statistiques" },
  { label: "Paramètres", icon: Settings, href: "/dashboard/parametres" },
];
