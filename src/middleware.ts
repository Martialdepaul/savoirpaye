import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Espaces réservés aux utilisateurs connectés : sans session, redirection vers la connexion.
// (Vérification rapide du cookie ; la session elle-même est validée par l'API.)
export function middleware(request: NextRequest) {
  if (getSessionCookie(request)) return NextResponse.next();
  const url = new URL("/connexion", request.url);
  url.searchParams.set("suite", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/dashboard/:path*", "/onboarding/:path*"] };
