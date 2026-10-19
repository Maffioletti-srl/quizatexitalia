import { describe, expect, it } from "vitest";
import {
  AREAS,
  MAX_WEIGHT,
  QUESTIONS,
  QUESTIONS_PER_AREA,
  QUIZ_VERSION,
  type AreaId,
  type Weight,
} from "@/config/questions";
import {
  InvalidAnswersError,
  computeScores,
  drawQuestionIds,
  levelFor,
  selectedQuestions,
  snapshotAnswers,
  validateAnswers,
  type Answers,
} from "./scoring";

/** Tirage de référence pour les tests : les 12 questions historiques q1…q12. */
const BASE = QUESTIONS.filter((q) => Number(q.id.slice(1)) <= 12);

/** Répond à chaque question du tirage avec l'option (hors « Non so ») du poids demandé. */
function answerAll(weightFor: (questionId: string, areaId: AreaId) => Weight, questions = BASE): Answers {
  return Object.fromEntries(
    questions.map((q) => {
      const w = weightFor(q.id, q.areaId);
      const option = q.options.find((o) => o.weight === w && !o.unknown);
      if (!option) throw new Error(`Pas d'option de poids ${w} pour ${q.id}`);
      return [q.id, option.id];
    }),
  );
}

describe("config questions", () => {
  it("a une version", () => {
    expect(QUIZ_VERSION).toMatch(/^\d+\.\d+$/);
  });

  it("contient 6 aree et une banque de 62 domande, au moins 10 par area", () => {
    expect(AREAS).toHaveLength(6);
    expect(QUESTIONS).toHaveLength(62);
    expect(QUESTIONS_PER_AREA).toBe(2);
    for (const area of AREAS) {
      expect(QUESTIONS.filter((q) => q.areaId === area.id).length).toBeGreaterThanOrEqual(10);
    }
  });

  it("a des ids de questions et de réponses uniques", () => {
    const qIds = QUESTIONS.map((q) => q.id);
    const oIds = QUESTIONS.flatMap((q) => q.options.map((o) => o.id));
    expect(new Set(qIds).size).toBe(qIds.length);
    expect(new Set(oIds).size).toBe(oIds.length);
  });

  it("propose les poids 0 à 3 une fois chacun, et « Non so » vaut 0", () => {
    for (const q of QUESTIONS) {
      const weights = q.options.filter((o) => !o.unknown).map((o) => o.weight).sort();
      expect(weights, q.id).toEqual([0, 1, 2, 3]);
      for (const o of q.options.filter((o) => o.unknown)) expect(o.weight).toBe(0);
    }
    expect(MAX_WEIGHT).toBe(3);
  });
});

describe("levelFor", () => {
  it.each([
    [0, "critico"],
    [39, "critico"],
    [40, "da_migliorare"],
    [64, "da_migliorare"],
    [65, "buono"],
    [84, "buono"],
    [85, "eccellente"],
    [100, "eccellente"],
  ])("%i → %s", (score, level) => {
    expect(levelFor(score)).toBe(level);
  });
});

describe("computeScores", () => {
  it("toutes bonnes pratiques → 100 % eccellente", () => {
    const r = computeScores(answerAll(() => 3));
    expect(r.total).toBe(100);
    expect(r.level).toBe("eccellente");
    for (const a of AREAS) expect(r.areas[a.id]).toBe(100);
  });

  it("toutes réponses à risque → 0 % critico", () => {
    const r = computeScores(answerAll(() => 0));
    expect(r.total).toBe(0);
    expect(r.level).toBe("critico");
  });

  it("« Non so » compte comme 0", () => {
    const answers = answerAll(() => 3);
    answers.q1 = "q1-nonso";
    answers.q2 = "q2-nonso";
    const r = computeScores(answers);
    expect(r.areas.classificazione).toBe(0);
    // 5 aree à 100, 1 à 0 → 83,33 → 83
    expect(r.total).toBe(83);
    expect(r.level).toBe("buono");
  });

  it("score area = somme des poids / max × 100", () => {
    // classificazione : 3 + 1 = 4 / 6 → 66,67 → 67
    const answers = answerAll((id) => (id === "q2" ? 1 : 3));
    expect(computeScores(answers).areas.classificazione).toBe(67);
  });

  it("score global = moyenne des aree (non arrondies)", () => {
    // Chaque area : une réponse à 2, une à 1 → 3/6 = 50 %
    const answers = answerAll((id) => (Number(id.slice(1)) % 2 === 0 ? 2 : 1));
    const r = computeScores(answers);
    expect(r.total).toBe(50);
    expect(r.level).toBe("da_migliorare");
  });

  it("calcule la moyenne sur les valeurs exactes avant d'arrondir", () => {
    // 3 aree à 4/6 (66,67) et 3 à 100 → 83,33 → 83 (et non (67×3+100×3)/6 = 83,5 → 84)
    const low: AreaId[] = ["classificazione", "apparecchiature", "installazione"];
    const answers = answerAll((id, area) =>
      low.includes(area) && Number(id.slice(1)) % 2 === 0 ? 1 : 3,
    );
    const r = computeScores(answers);
    expect(r.areas.classificazione).toBe(67);
    expect(r.total).toBe(83);
  });

  it("renvoie les 3 aree les plus faibles, de la plus faible à la moins faible", () => {
    const scores: Record<AreaId, Weight> = {
      classificazione: 3,
      apparecchiature: 0,
      installazione: 2,
      verifiche: 1,
      manutenzione: 3,
      competenza: 2,
    };
    const r = computeScores(answerAll((_, area) => scores[area]));
    expect(r.weakest).toEqual(["apparecchiature", "verifiche", "installazione"]);
  });

  it("à égalité, garde l'ordre de la config", () => {
    const r = computeScores(answerAll(() => 2));
    expect(r.weakest).toEqual(["classificazione", "apparecchiature", "installazione"]);
  });
});

describe("validation des réponses", () => {
  it("accepte un jeu complet", () => {
    expect(() => validateAnswers(answerAll(() => 1))).not.toThrow();
  });

  it("refuse une réponse manquante", () => {
    const answers = answerAll(() => 1);
    delete answers.q7;
    expect(() => computeScores(answers)).toThrow(InvalidAnswersError);
  });

  it("refuse une question inconnue", () => {
    const answers = { ...answerAll(() => 1), q99: "q99-a" };
    expect(() => computeScores(answers)).toThrow(InvalidAnswersError);
  });

  it("refuse une réponse qui n'appartient pas à la question", () => {
    const answers = { ...answerAll(() => 1), q1: "q2-a" };
    expect(() => computeScores(answers)).toThrow(InvalidAnswersError);
  });

  it("refuse une option absente (pas de « Non so » sur q4)", () => {
    const answers = { ...answerAll(() => 1), q4: "q4-nonso" };
    expect(() => computeScores(answers)).toThrow(InvalidAnswersError);
  });
});

describe("tirage des questions", () => {
  it("tire 2 questions distinctes par area, dans l'ordre des aree", () => {
    for (let i = 0; i < 50; i++) {
      const ids = drawQuestionIds();
      expect(ids).toHaveLength(12);
      expect(new Set(ids).size).toBe(12);
      const areaOrder = ids.map((id) => QUESTIONS.find((q) => q.id === id)!.areaId);
      expect(areaOrder).toEqual(AREAS.flatMap((a) => [a.id, a.id]));
    }
  });

  it("peut tirer chaque question de la banque", () => {
    const seen = new Set<string>();
    for (let i = 0; i < 2000; i++) drawQuestionIds().forEach((id) => seen.add(id));
    expect(seen.size).toBe(QUESTIONS.length);
  });

  it("un tirage complet est accepté et noté", () => {
    const ids = drawQuestionIds();
    const drawn = QUESTIONS.filter((q) => ids.includes(q.id));
    const r = computeScores(answerAll(() => 3, drawn));
    expect(r.total).toBe(100);
    expect(selectedQuestions(answerAll(() => 3, drawn)).map((q) => q.id).sort()).toEqual([...ids].sort());
  });

  it("refuse 3 réponses dans une area", () => {
    const answers = { ...answerAll(() => 1), q13: "q13-a" };
    expect(() => computeScores(answers)).toThrow(InvalidAnswersError);
  });

  it("refuse une area sans réponse suffisante", () => {
    const answers = answerAll(() => 1);
    delete answers.q1;
    delete answers.q2;
    expect(() => computeScores(answers)).toThrow(InvalidAnswersError);
  });
});

describe("snapshotAnswers", () => {
  it("produit une entrée lisible par question, dans l'ordre", () => {
    const answers = answerAll(() => 2);
    answers.q12 = "q12-nonso";
    const snap = snapshotAnswers(answers);
    expect(snap).toHaveLength(12);
    expect(snap.map((s) => s.domanda_id)).toEqual(BASE.map((q) => q.id));
    expect(snap[0]).toMatchObject({
      domanda_id: "q1",
      area_id: "classificazione",
      area: AREAS[0].title,
      domanda: QUESTIONS[0].text,
      peso: 2,
      non_so: false,
    });
    expect(snap[11]).toMatchObject({ risposta: "Non so", peso: 0, non_so: true });
  });

  it("refuse des réponses invalides", () => {
    expect(() => snapshotAnswers({ q1: "q1-a" })).toThrow(InvalidAnswersError);
  });
});
