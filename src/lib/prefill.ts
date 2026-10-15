/**
 * Azienda et email saisis dans le hero de la landing : conservés en
 * sessionStorage et repris par le formulaire final, d'où ils partent vers
 * Nexo avec le résultat (aucun envoi avant la fin du questionnaire).
 */
import { readSession, writeSession } from "./session-storage";

const KEY = "atex-quiz:prefill";

export interface Prefill {
  azienda: string;
  email: string;
}

export function savePrefill(p: Prefill): void {
  writeSession(KEY, p);
}

export function readPrefill(): Partial<Prefill> {
  const p = readSession<Partial<Prefill>>(KEY);
  return {
    azienda: typeof p?.azienda === "string" ? p.azienda.slice(0, 160) : undefined,
    email: typeof p?.email === "string" ? p.email.slice(0, 254) : undefined,
  };
}
