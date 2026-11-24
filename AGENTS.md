# savoirpaye

Plateforme de vente de formations et produits numériques pour l'Afrique francophone (paiement Mobile Money). Next.js 15 (App Router) + React 19 + Tailwind CSS v4. Interface entièrement en français.

## Commandes

- `pnpm dev` : serveur de développement
- `pnpm build` : build de production (vérifie aussi les types)
- `pnpm start` : sert le build de production

## Structure

- `src/app/` : routes (App Router)
  - `page.tsx` : accueil court (hero avec photos, moyens de paiement, témoignages, bandeau final)
  - `fonctionnalites/`, `comment-ca-marche/`, `createur-ia/`, `tarifs/`, `faq/`, `ressources/` (+ `[slug]`), `a-propos/`, `contact/` : site public, une page par sujet, via `SiteShell` + `PageHero` (`src/components/site/`)
  - `inscription/`, `connexion/`, `mot-de-passe-oublie/`, `reinitialiser-mot-de-passe/` : comptes (e-mail ou Google via `GoogleButton` de `components/auth/fields.tsx`)
  - `onboarding/` : configuration de la boutique en 3 étapes, après l'inscription
  - `formations/[slug]/` et `produits/[slug]/` : pages de vente lues en base (`src/lib/sales-page.ts`) ; brouillons et produits archivés visibles seulement par leur vendeur
  - `boutique/[vendeur]/` : boutique publique du vendeur (produits en ligne)
  - `checkout/` : commande (`/checkout?produit=<slug>`)
  - `cgu/`, `confidentialite/`, `mentions-legales/` : pages légales (les `[crochets]` sont à compléter)
  - `dashboard/` : espace vendeur (accueil, produits, `produits/nouveau`, `produits/[id]/modifier`, commandes, clients, statistiques, portefeuille, paramètres, notifications, aide ; créateur IA = page « bientôt disponible ») et espace acheteur « Mes achats » (`mes-formations/`, `mes-formations/[slug]` = lecteur de formation ou téléchargements)
- `src/lib/site-config.ts` : nom, URL (`NEXT_PUBLIC_SITE_URL`), e-mails, téléphones, villes et informations légales de la société (valeurs `[entre crochets]` à compléter) ; à utiliser au lieu d'écrire une adresse ou un numéro en dur
- `src/lib/catalog.ts` : types et fonctions des produits (`CatalogProduct`, `productUrl`, `checkoutUrl`, `includesOf`, `slugify`), sans données
- `src/lib/store.ts` (serveur) : lecture des produits, commandes et retraits ; `publicView()` retire liens vidéo, textes et fichiers payants avant tout affichage public
- `src/lib/dashboard-data.ts` : `fcfa`, dates et calculs (statistiques, clients, graphique, meilleurs produits) à partir des vraies commandes ; `src/lib/wallet-data.ts` : solde et historique ; `src/lib/plans.ts` : commissions (Starter 8 %, Pro 3 %, Business 0 %) et limite Starter d'1 produit en ligne
- `src/lib/site-data.ts` : contenus du site public (menu, fonctionnalités, comparatif, articles, équipe, aide)
- `src/lib/mock-data.ts` : contenus fixes (moyens de paiement, frais de retrait, offres, FAQ, témoignages du site)
- `public/videos/` : vidéo de démonstration (`savoirpay-demo.mp4`, H.264, et son image `savoirpay-demo.jpg`), lue par `components/landing/DemoVideo.tsx` (fenêtre « Voir la démo » de l'accueil et section de « Comment ça marche ») ; à réenregistrer quand l'interface change, hors Git LFS
- `public/images/` : photos du site (Unsplash, voir `CREDITS.md`), versionnées hors Git LFS pour que Vercel les serve
- `src/components/` : composants par domaine (`landing`, `sales`, `checkout`, `dashboard`, `editor`, `auth`, `legal`, `student`, `wallet`, `ui`)
- `src/components/editor/` : éditeur de produit (`ProductEditor`, `ModulesEditor`, validation et compression de la couverture dans `types.ts`) ; vidéos et fichiers donnés par lien (YouTube, Vimeo, Google Drive, Dropbox), lus par `src/lib/video.ts`
- `src/components/dashboard/nav.ts` : source unique de la navigation du tableau de bord (`navItems`, `secondaryNav`, `activeLabel` qui déduit l'entrée active de l'URL) ; `NavList` est partagée par la barre latérale et le menu ☰ du Topbar
- `src/components/ui/Pagination.tsx` : `usePagination` + `<Pagination>`, à utiliser pour toute liste longue
- `src/components/ui/Toast.tsx` : `useToast()` pour les confirmations

Aucune donnée de démonstration dans le parcours : tout ce qui s'affiche vient de la base, avec un écran vide explicatif (`EmptyState`) quand il n'y a rien.

## Back-end

- Comptes : Better Auth (`src/lib/auth.ts`, route `src/app/api/auth/[...all]/route.ts`, client `src/lib/auth-client.ts` avec `useSession`, `signOut` et `authErrorMessage` pour les erreurs en français). E-mail + mot de passe, Google, vérification d'adresse (non bloquante), mot de passe oublié.
- Base : PostgreSQL Neon via Drizzle (`src/lib/db/`). Après une modification de `schema.ts` : `pnpm db:push`. `pnpm db:studio` pour consulter les données.
- E-mails : `src/lib/email.ts` (gabarits HTML en français + `sendEmail`, qui n'interrompt jamais le parcours en cas d'échec). Resend par défaut ; Gmail si `GMAIL_USER` et `GMAIL_APP_PASSWORD` sont définis. Sans domaine vérifié chez Resend, seuls les envois vers l'adresse du compte Resend aboutissent.
- `src/middleware.ts` redirige `/dashboard` et `/onboarding` vers `/connexion?suite=…` sans cookie de session ; les layouts de ces deux espaces revérifient la session côté serveur (`getAccount()` de `src/lib/account.ts`).
- Côté client du tableau de bord : `useAccount()` (utilisateur + boutique) et `useShopData()` (produits, commandes, retraits) de `components/dashboard/AccountContext.tsx`, chargés par `app/dashboard/layout.tsx`. Après une action serveur : `router.refresh()`.
- Tables : `shop` (une par compte), `product`, `orders`, `withdrawal`, `progress` (leçons terminées). Actions serveur dans `src/app/actions/` (`shop.ts`, `products.ts`, `orders.ts`, `learning.ts`), qui revérifient toujours la session et la propriété.
- Parcours de vente : le client commande sur `/checkout` → commande « En attente » + e-mails (client et vendeur) → le vendeur reçoit le paiement (Wave, Orange Money…) et clique « Marquer comme payée » dans Commandes → le client reçoit son accès et le retrouve dans « Mes achats » avec l'adresse de sa commande. Produit gratuit : accès immédiat. Ces ventes « hors plateforme » comptent dans les statistiques mais pas dans le solde du portefeuille, réservé aux futurs paiements encaissés par Savoirpay (intégration Mobile Money à venir).
- Notifications : déduites des commandes et retraits (`useNotifications.ts`), état « lu » mémorisé dans le navigateur.
- Site public : `AccountLink` (et l'en-tête de l'accueil) affichent « Mon tableau de bord » quand l'utilisateur est connecté ; `/connexion` et `/inscription` redirigent un utilisateur déjà connecté.
- Variables d'environnement : voir `.env.example` (valeurs réelles dans `.env.local`, jamais versionné, et dans les réglages Vercel).

## Conventions UI

- Mobile d'abord : tout doit fonctionner sans défilement horizontal dès 320 px de large.
- Cibles tactiles d'au moins 44 px sur mobile.
- Sur mobile, les tableaux deviennent des listes de cartes (`sm:hidden` / `hidden sm:block`).
- Les grilles contenant des graphiques Recharts doivent avoir `grid-cols-1` (sinon le graphique élargit la page).
- Montants : utiliser `fcfa()` de `src/lib/dashboard-data.ts`, avec `whitespace-nowrap` dans les tableaux.
- Thème et tokens de couleur dans `src/app/globals.css` (Tailwind v4, pas de fichier de config Tailwind) ; polices hébergées dans `src/app/fonts/` et chargées par `next/font/local` dans `src/app/layout.tsx` (pas de `next/font/google` : son téléchargement au build échouait par intermittence sur Vercel).
- Liens internes avec `next/link`, redirections avec `useRouter()` de `next/navigation` (jamais `<a href="/…">` ni `window.location.href`).

## Contenus

- Marque : « Savoirpay » dans les textes, titres de page via le gabarit `%s · Savoirpay` de `layout.tsx` (ne pas répéter la marque dans `metadata.title`).
- Les pages client (`"use client"`) reçoivent leur titre par un `layout.tsx` voisin.
- E-mails de démonstration en `@exemple.com`.

## Qualité du code

- Utiliser des guillemets doubles pour les chaînes contenant une apostrophe (`"Voici l'activité"`).
- Composants exportés par défaut.
