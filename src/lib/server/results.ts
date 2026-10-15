import "server-only";
import { DEMO_RESULT_ID, type PublicResult } from "@/lib/results";
import { computeScores } from "@/lib/scoring";
import { fetchPublicResult } from "./leads";

const DEMO_ANSWERS = {
  q1: "q1-b", q2: "q2-c",
  q3: "q3-b", q4: "q4-b",
  q5: "q5-a", q6: "q6-b",
  q7: "q7-c", q8: "q8-b",
  q9: "q9-b", q10: "q10-c",
  q11: "q11-c", q12: "q12-nonso",
};

/** Lecture d'un résultat public ; null si introuvable. */
export async function getPublicResult(id: string): Promise<PublicResult | null> {
  if (id === DEMO_RESULT_ID && process.env.NODE_ENV !== "production") {
    return { id, createdAt: new Date().toISOString(), ...computeScores(DEMO_ANSWERS) };
  }
  return fetchPublicResult(id);
}
