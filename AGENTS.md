# savoirpaye

Plateforme de vente de formations et produits numériques pour l'Afrique francophone (paiement Mobile Money). Next.js 15 (App Router) + React 19 + Tailwind CSS v4. Interface entièrement en français.

## Commandes

- `pnpm dev` : serveur de développement
- `pnpm build` : build de production (vérifie aussi les types)
- `pnpm start` : sert le build de production

## Structure

- `src/app/` : routes (App Router)
  - `page.tsx` : landing page
  - `inscription/`, `connexion/`, `mot-de-passe-oublie/`, `reinitialiser-mot-de-passe/` : comptes
  - `formations/[slug]/` et `produits/[slug]/` : pages de vente générées depuis le catalogue
  - `boutique/[vendeur]/` : boutique publique du vendeur
  - `checkout/` : paiement Mobile Money (`/checkout?produit=<slug>`)
  - `cgu/`, `confidentialite/`, `mentions-legales/` : pages légales (les `[crochets]` sont à compléter)
  - `dashboard/` : espace vendeur (accueil, produits, `produits/nouveau`, `produits/[id]/modifier`, commandes, clients, créateur IA, statistiques, portefeuille, paramètres) et espace apprenant (`mes-formations/`)
- `src/lib/catalog.ts` : catalogue central des produits (source unique pour tableau de bord, éditeur, pages de vente, boutique et paiement) + `productUrl`, `checkoutUrl`, `slugify`
- `src/lib/*-data.ts` : autres données de démonstration (pas encore de back-end)
- `src/components/` : composants par domaine (`landing`, `sales`, `checkout`, `dashboard`, `editor`, `auth`, `legal`, `creator`, `student`, `wallet`, `ui`)
- `src/components/editor/` : éditeur de produit (`ProductEditor`, `ModulesEditor`, validation dans `types.ts`)
- `src/components/dashboard/nav.ts` : source unique de la navigation du tableau de bord (Sidebar desktop, MobileMenu)
- `src/components/ui/Pagination.tsx` : `usePagination` + `<Pagination>`, à utiliser pour toute liste longue
- `src/components/ui/Toast.tsx` : `useToast()` pour les confirmations

Les appels serveur sont simulés (`setTimeout`) et marqués `// Simulation … à remplacer par l'API`.

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
