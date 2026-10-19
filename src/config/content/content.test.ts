import { describe, expect, it } from "vitest";
import { QUESTIONS } from "@/config/questions";
import { en } from "./en";
import { fr } from "./fr";

describe.each([
  ["en", en],
  ["fr", fr],
])("traduction %s", (_, tr) => {
  it("traduit chaque question de la banque, avec ses options et son hint", () => {
    for (const q of QUESTIONS) {
      const t = tr.questions[q.id];
      expect(t, q.id).toBeDefined();
      expect(t.text, q.id).toBeTruthy();
      expect(Boolean(t.hint), `${q.id} hint`).toBe(Boolean(q.hint));
      const optionIds = q.options.filter((o) => !o.unknown).map((o) => o.id);
      expect(Object.keys(t.options).sort(), q.id).toEqual(optionIds.sort());
      for (const id of optionIds) expect(t.options[id], id).toBeTruthy();
    }
  });

  it("ne contient pas de question inconnue", () => {
    const ids = new Set(QUESTIONS.map((q) => q.id));
    for (const id of Object.keys(tr.questions)) expect(ids.has(id), id).toBe(true);
  });
});
