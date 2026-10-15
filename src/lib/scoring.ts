/**
 * Calcul des scores — module pur (aucune dépendance au navigateur ou au serveur).
 * Utilisé côté client pour l'aperçu et côté serveur, où le score est
 * systématiquement recalculé à partir des réponses brutes.
 */
import {
  AREAS,
  MAX_WEIGHT,
  QUESTIONS,
  type Area,
  type AreaId,
  type Question,
} from "@/config/questions";

/** Réponses brutes : id de question → id de réponse. */
export type Answers = Record<string, string>;

export type LevelId = "critico" | "da_migliorare" | "buono" | "eccellente";

/** Seuils (score global arrondi, en %) : borne basse incluse. */
export const LEVEL_THRESHOLDS: readonly { id: LevelId; min: number }[] = [
  { id: "eccellente", min: 85 },
  { id: "buono", min: 65 },
  { id: "da_migliorare", min: 40 },
  { id: "critico", min: 0 },
];

export interface ScoreResult {
  /** Score global 0–100, entier. */
  total: number;
  /** Score par area 0–100, entiers. */
  areas: Record<AreaId, number>;
  level: LevelId;
  /** Les 3 aree les plus faibles, de la plus faible à la moins faible. */
  weakest: AreaId[];
}

export class InvalidAnswersError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidAnswersError";
  }
}

export function levelFor(score: number): LevelId {
  const found = LEVEL_THRESHOLDS.find((l) => score >= l.min);
  return found ? found.id : "critico";
}

/**
 * Vérifie que chaque question a exactement une réponse valide
 * et qu'aucune question inconnue n'est présente.
 */
export function validateAnswers(
  answers: Answers,
  questions: readonly Question[] = QUESTIONS,
): void {
  const byId = new Map(questions.map((q) => [q.id, q]));

  for (const questionId of Object.keys(answers)) {
    if (!byId.has(questionId)) {
      throw new InvalidAnswersError(`Domanda sconosciuta: ${questionId}`);
    }
  }
  for (const q of questions) {
    const optionId = answers[q.id];
    if (optionId === undefined) {
      throw new InvalidAnswersError(`Risposta mancante: ${q.id}`);
    }
    if (!q.options.some((o) => o.id === optionId)) {
      throw new InvalidAnswersError(`Risposta non valida per ${q.id}: ${optionId}`);
    }
  }
}

export function computeScores(
  answers: Answers,
  questions: readonly Question[] = QUESTIONS,
  areas: readonly Area[] = AREAS,
): ScoreResult {
  validateAnswers(answers, questions);

  const exact = {} as Record<AreaId, number>;
  for (const area of areas) {
    const areaQuestions = questions.filter((q) => q.areaId === area.id);
    const max = areaQuestions.length * MAX_WEIGHT;
    const sum = areaQuestions.reduce((acc, q) => {
      const option = q.options.find((o) => o.id === answers[q.id]);
      return acc + (option?.weight ?? 0);
    }, 0);
    exact[area.id] = max === 0 ? 0 : (sum / max) * 100;
  }

  // Le global est la moyenne des scores exacts (non arrondis) des aree.
  const values = areas.map((a) => exact[a.id]);
  const total = Math.round(values.reduce((a, b) => a + b, 0) / values.length);

  const rounded = {} as Record<AreaId, number>;
  for (const area of areas) rounded[area.id] = Math.round(exact[area.id]);

  return { total, areas: rounded, level: levelFor(total), weakest: weakestAreas(exact, areas) };
}

/**
 * Les `count` aree les plus faibles, de la plus faible à la moins faible.
 * Tri stable : à égalité, l'ordre de la config est conservé.
 * (Avec 2 questions par area, l'arrondi ne change jamais l'ordre : les
 * scores possibles sont des multiples de 100/6.)
 */
export function weakestAreas(
  scores: Record<AreaId, number>,
  areas: readonly Area[] = AREAS,
  count = 3,
): AreaId[] {
  return [...areas]
    .sort((a, b) => scores[a.id] - scores[b.id])
    .slice(0, count)
    .map((a) => a.id);
}

/** Réponse enregistrée dans quiz_leads.risposte : autoportante et lisible dans Nexo. */
export interface AnswerSnapshot {
  domanda_id: string;
  area_id: AreaId;
  area: string;
  domanda: string;
  risposta_id: string;
  risposta: string;
  peso: number;
  non_so: boolean;
}

/**
 * Instantané des réponses avec les textes de la version courante du
 * questionnaire : les leads restent lisibles même si la config évolue.
 * À appeler après validateAnswers / computeScores.
 */
export function snapshotAnswers(
  answers: Answers,
  questions: readonly Question[] = QUESTIONS,
  areas: readonly Area[] = AREAS,
): AnswerSnapshot[] {
  validateAnswers(answers, questions);
  return questions.map((q) => {
    const option = q.options.find((o) => o.id === answers[q.id])!;
    const area = areas.find((a) => a.id === q.areaId)!;
    return {
      domanda_id: q.id,
      area_id: q.areaId,
      area: area.title,
      domanda: q.text,
      risposta_id: option.id,
      risposta: option.label,
      peso: option.weight,
      non_so: option.unknown === true,
    };
  });
}
