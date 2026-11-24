// Configuration serveur de l'authentification (Better Auth) : e-mail + mot de passe, Google,
// vérification d'adresse, mot de passe oublié et e-mails automatiques.
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "./db";
import * as schema from "./db/schema";
import { passwordChangedEmail, resetPasswordEmail, sendEmail, verificationEmail, welcomeEmail } from "./email";
import { site } from "./site-config";

const trustedOrigins = ["http://localhost:3000", site.url];
if (process.env.VERCEL_URL) trustedOrigins.push(`https://${process.env.VERCEL_URL}`);
if (process.env.VERCEL_BRANCH_URL) trustedOrigins.push(`https://${process.env.VERCEL_BRANCH_URL}`);

export const auth = betterAuth({
  appName: site.name,
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins,
  database: drizzleAdapter(db, { provider: "pg", schema }),

  user: {
    // Suppression du compte depuis Paramètres › Sécurité (la boutique est supprimée en cascade)
    deleteUser: { enabled: true },
    additionalFields: {
      phone: { type: "string", required: false },
      country: { type: "string", required: false },
    },
  },

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    // L'adresse est vérifiée par e-mail, sans bloquer la connexion
    requireEmailVerification: false,
    resetPasswordTokenExpiresIn: 60 * 60,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({ to: user.email, ...resetPasswordEmail(user.name, url) });
    },
    onPasswordReset: async ({ user }) => {
      await sendEmail({ to: user.email, ...passwordChangedEmail(user.name) });
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60 * 24,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({ to: user.email, ...verificationEmail(user.name, url) });
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      prompt: "select_account",
    },
  },

  account: {
    // Un compte créé par e-mail peut ensuite se connecter avec Google (même adresse)
    accountLinking: { enabled: true, trustedProviders: ["google"] },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
    cookieCache: { enabled: true, maxAge: 5 * 60 },
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await sendEmail({ to: user.email, ...welcomeEmail(user.name) });
        },
      },
    },
  },

  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
