import type { AreaId } from "@/config/questions";

/**
 * Traduction du contenu métier de config/questions.ts (italien, référence).
 * Seuls les textes sont traduits : identifiants, poids et URL restent ceux
 * de questions.ts. Les clés de `questions` et `options` sont les id de
 * questions.ts (q1…q12, q1-a…) ; l'option « Non so » utilise `unknownLabel`.
 */
export interface ContentTranslation {
  /** Libellé de la réponse « Non so ». */
  unknownLabel: string;
  areas: Record<
    AreaId,
    {
      title: string;
      shortTitle: string;
      description: string;
      recommendation: string;
      service: { name: string; description: string };
    }
  >;
  questions: Record<
    string,
    {
      text: string;
      hint?: string;
      /** id d'option (sans l'option « Non so ») → libellé. */
      options: Record<string, string>;
    }
  >;
}
