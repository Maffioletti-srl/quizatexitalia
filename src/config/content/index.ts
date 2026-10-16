import { AREAS, QUESTIONS, type Area, type Question } from "@/config/questions";
import type { Locale } from "@/i18n/config";
import { en } from "./en";
import { fr } from "./fr";
import type { ContentTranslation } from "./types";

/**
 * Contenu métier dans une langue : la structure (id, poids, URL) vient
 * toujours de config/questions.ts, seuls les textes sont remplacés.
 * Le scoring et l'instantané enregistré pour Nexo restent en italien.
 */
const TRANSLATIONS: Record<Exclude<Locale, "it">, ContentTranslation> = { en, fr };

const cache = new Map<Locale, { areas: readonly Area[]; questions: readonly Question[] }>();

function content(locale: Locale) {
  if (locale === "it") return { areas: AREAS, questions: QUESTIONS };
  let c = cache.get(locale);
  if (!c) {
    const tr = TRANSLATIONS[locale];
    c = {
      areas: AREAS.map((a) => {
        const t = tr.areas[a.id];
        return { ...a, ...t, service: { ...a.service, ...t.service } };
      }),
      questions: QUESTIONS.map((q) => {
        const t = tr.questions[q.id];
        return {
          ...q,
          text: t.text,
          hint: q.hint ? t.hint : undefined,
          options: q.options.map((o) => ({ ...o, label: o.unknown ? tr.unknownLabel : t.options[o.id] })),
        };
      }),
    };
    cache.set(locale, c);
  }
  return c;
}

export const getAreas = (locale: Locale): readonly Area[] => content(locale).areas;
export const getQuestions = (locale: Locale): readonly Question[] => content(locale).questions;
