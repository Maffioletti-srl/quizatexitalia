"use client";

import { usePathname } from "next/navigation";
import { useLocale, useMessages } from "@/i18n/client";
import { LOCALES, LOCALE_NAMES, localePath, stripLocale } from "@/i18n/config";

/**
 * Choix de la langue : même page, autre préfixe. Liens simples (rechargement
 * complet, la langue change le layout racine) ; un questionnaire en cours est
 * conservé (sessionStorage).
 */
export function LanguageSwitcher() {
  return <LanguageLinks path={stripLocale(usePathname() ?? "/")} />;
}

/** Liens vers `path` dans chaque langue (aussi utilisé comme repli pendant le streaming, avec path="/"). */
export function LanguageLinks({ path }: { path: string }) {
  const locale = useLocale();
  const m = useMessages();

  return (
    <nav aria-label={m.common.languageLabel}>
      <ul className="flex items-center rounded-lg border border-line bg-surface p-0.5 text-xs font-semibold">
        {LOCALES.map((l) => {
          const current = l === locale;
          return (
            <li key={l}>
              <a
                href={localePath(l, path)}
                hrefLang={l}
                lang={l}
                title={LOCALE_NAMES[l]}
                aria-current={current ? "true" : undefined}
                className={`block rounded-md px-2.5 py-1.5 uppercase transition-colors ${
                  current ? "bg-navy text-white" : "text-muted hover:bg-surface-2 hover:text-ink"
                }`}
              >
                <span aria-hidden="true">{l}</span>
                <span className="sr-only">{LOCALE_NAMES[l]}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
