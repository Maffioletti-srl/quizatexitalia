/**
 * Langues du site. L'italien est la langue par défaut, servie sans préfixe
 * (/valutazione) ; les autres ont un préfixe (/en/valutazione, /fr/…).
 * Le proxy (src/proxy.ts) réécrit les URL sans préfixe vers /it/….
 */
export const LOCALES = ["it", "en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "it";

/** Nom de chaque langue dans sa propre langue (sélecteur du header). */
export const LOCALE_NAMES: Record<Locale, string> = {
  it: "Italiano",
  en: "English",
  fr: "Français",
};

/** Locale BCP 47 pour Intl et Open Graph. */
export const INTL_LOCALES: Record<Locale, string> = { it: "it-IT", en: "en-GB", fr: "fr-FR" };

export function hasLocale(value: string | null | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

/** Chemin public d'une page dans une langue : localePath("en", "/valutazione") → "/en/valutazione". */
export function localePath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Retire le préfixe de langue d'un chemin public : "/en/valutazione" → "/valutazione". */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (hasLocale(first)) return `/${rest.join("/")}`;
  return pathname || "/";
}
