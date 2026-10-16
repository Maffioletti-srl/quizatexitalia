"use client";

import { createContext, useContext, type ReactNode } from "react";
import { getMessages } from "@/messages";
import { DEFAULT_LOCALE, type Locale } from "./config";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

/** Fournit la langue aux Client Components (placé dans app/[lang]/layout.tsx). */
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext value={locale}>{children}</LocaleContext>;
}

export const useLocale = (): Locale => useContext(LocaleContext);

export const useMessages = () => getMessages(useLocale());
