import type { Locale } from "@/i18n/config";
import { en } from "./en";
import { fr } from "./fr";
import { it, type Messages } from "./it";

const MESSAGES: Record<Locale, Messages> = { it, en, fr };

/** Textes de l'interface dans une langue. */
export function getMessages(locale: Locale): Messages {
  return MESSAGES[locale];
}

export type { Messages };
