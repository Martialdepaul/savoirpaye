// Tables de Better Auth (comptes, sessions, connexions Google, jetons de vérification)
// + champs propres à Savoirpay sur l'utilisateur (téléphone, pays).
import { boolean, index, integer, jsonb, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import type { CatalogFile, CatalogModule, Coaching } from "../catalog";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  phone: text("phone"),
  country: text("country"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  },
  (t) => [index("session_user_id_idx").on(t.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()).notNull(),
  },
  (t) => [index("account_user_id_idx").on(t.userId)],
);

export type Payout = { id: string; method: string; number: string };

/** Boutique du vendeur (une par compte), créée à l'onboarding et modifiable dans Paramètres */
export const shop = pgTable("shop", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().unique().references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull().default(""),
  category: text("category").notNull().default(""),
  goal: text("goal").notNull().default(""),
  plan: text("plan").notNull().default("Starter"),
  payouts: jsonb("payouts").$type<Payout[]>().notNull().default([]),
  autoWithdraw: boolean("auto_withdraw").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
});

/** Produits du vendeur : formations, produits numériques et séances de coaching */
export const product = pgTable(
  "product",
  {
    id: text("id").primaryKey(),
    shopId: text("shop_id").notNull().references(() => shop.id, { onDelete: "cascade" }),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    type: text("type").notNull(),
    status: text("status").notNull().default("Brouillon"),
    price: integer("price").notNull().default(0),
    comparePrice: integer("compare_price"),
    subtitle: text("subtitle").notNull().default(""),
    description: text("description").notNull().default(""),
    cover: text("cover").notNull().default(""),
    goals: jsonb("goals").$type<string[]>().notNull().default([]),
    modules: jsonb("modules").$type<CatalogModule[]>().notNull().default([]),
    files: jsonb("files").$type<CatalogFile[]>().notNull().default([]),
    coaching: jsonb("coaching").$type<Coaching | null>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
  },
  (t) => [index("product_shop_id_idx").on(t.shopId)],
);

/**
 * Commandes passées sur les pages de vente.
 * status : « En attente » (paiement à recevoir), « Payé », « Annulé ».
 * offPlatform : paiement reçu directement par le vendeur (hors Savoirpay), donc absent du portefeuille.
 */
export const orders = pgTable(
  "orders",
  {
    id: text("id").primaryKey(),
    number: serial("number").notNull(),
    shopId: text("shop_id").notNull().references(() => shop.id, { onDelete: "cascade" }),
    productId: text("product_id").references(() => product.id, { onDelete: "set null" }),
    productName: text("product_name").notNull(),
    productType: text("product_type").notNull(),
    amount: integer("amount").notNull(),
    buyerName: text("buyer_name").notNull(),
    buyerEmail: text("buyer_email").notNull(),
    buyerPhone: text("buyer_phone").notNull(),
    method: text("method").notNull(),
    status: text("status").notNull().default("En attente"),
    offPlatform: boolean("off_platform").notNull().default(false),
    commission: integer("commission").notNull().default(0),
    paidAt: timestamp("paid_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("orders_shop_id_idx").on(t.shopId), index("orders_buyer_email_idx").on(t.buyerEmail)],
);

/** Progression d'un acheteur dans une formation (leçons terminées) */
export const progress = pgTable(
  "progress",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    productId: text("product_id").notNull().references(() => product.id, { onDelete: "cascade" }),
    completed: jsonb("completed").$type<string[]>().notNull().default([]),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
  },
  (t) => [uniqueIndex("progress_user_product_idx").on(t.userId, t.productId)],
);

/** Demandes de retrait du solde vendeur */
export const withdrawal = pgTable("withdrawal", {
  id: text("id").primaryKey(),
  shopId: text("shop_id").notNull().references(() => shop.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(),
  fee: integer("fee").notNull(),
  method: text("method").notNull(),
  number: text("number").notNull(),
  status: text("status").notNull().default("En attente"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
  },
  (t) => [index("verification_identifier_idx").on(t.identifier)],
);
