# savoirpaye

Plateforme de vente de formations et produits numériques pour l'Afrique francophone (paiement Mobile Money). Next.js 15 (App Router) + React 19 + Tailwind CSS v4. Interface entièrement en français.

## Commandes

- `pnpm dev` : serveur de développement
- `pnpm build` : build de production (vérifie aussi les types)
- `pnpm start` : sert le build de production

## Structure

- `src/app/` : routes (App Router)
  - `page.tsx` : landing page
  - `formations/vendre-sur-whatsapp-business/` : page de vente
  - `checkout/` : paiement Mobile Money
  - `dashboard/` : espace vendeur (accueil, produits, commandes, clients, créateur IA, statistiques, portefeuille, paramètres) et espace apprenant (`mes-formations/`, `mes-formations/[slug]/`)
- `src/components/` : composants par domaine (`landing`, `sales`, `checkout`, `dashboard`, `creator`, `student`, `wallet`, `ui`)
- `src/components/dashboard/nav.ts` : source unique de la navigation du tableau de bord (Sidebar desktop, MobileMenu)
- `src/components/ui/Pagination.tsx` : `usePagination` + `<Pagination>`, à utiliser pour toute liste longue
- `src/lib/*-data.ts` : données de démonstration (pas encore de back-end)

## Conventions UI

- Mobile d'abord : tout doit fonctionner sans défilement horizontal dès 320 px de large.
- Cibles tactiles d'au moins 44 px sur mobile.
- Sur mobile, les tableaux deviennent des listes de cartes (`sm:hidden` / `hidden sm:block`).
- Les grilles contenant des graphiques Recharts doivent avoir `grid-cols-1` (sinon le graphique élargit la page).
- Montants : utiliser `fcfa()` de `src/lib/dashboard-data.ts`, avec `whitespace-nowrap` dans les tableaux.
- Thème et tokens de couleur dans `src/index.css` (Tailwind v4, pas de fichier de config Tailwind).

## Qualité du code

- Utiliser des guillemets doubles pour les chaînes contenant une apostrophe (`"Voici l'activité"`).
- Composants exportés par défaut.
