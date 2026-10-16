import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, hasLocale, stripLocale } from "@/i18n/config";

/**
 * Langue dans l'URL : /en/… et /fr/… sont servis tels quels ; une URL sans
 * préfixe est en italien (réécrite en interne vers /it/…) ; /it/… redirige
 * vers l'URL sans préfixe pour éviter les doublons.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = stripLocale(pathname);
    return NextResponse.redirect(url, 308);
  }
  if (hasLocale(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Pages uniquement : ni API, ni fichiers internes, ni fichiers statiques (point dans le nom)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
