/**
 * UTM et referrer capturés à l'arrivée sur la landing, conservés en
 * sessionStorage jusqu'à la soumission du formulaire (pas de cookie).
 */
import { readSession, writeSession } from "./session-storage";

const KEY = "atex-quiz:tracking";

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

export type Tracking = Partial<Record<(typeof UTM_KEYS)[number] | "referrer", string>>;

const MAX_LEN = 300;

/** À appeler à l'arrivée : la première visite de la session fait foi. */
export function captureTracking(): void {
  if (readSession<Tracking>(KEY)) return;

  const params = new URLSearchParams(window.location.search);
  const data: Tracking = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) data[k] = v.slice(0, MAX_LEN);
  }
  // Referrer externe uniquement (une navigation interne n'apporte rien)
  if (document.referrer) {
    try {
      if (new URL(document.referrer).origin !== window.location.origin) {
        data.referrer = document.referrer.slice(0, MAX_LEN);
      }
    } catch {
      // referrer illisible : ignoré
    }
  }
  writeSession(KEY, data);
}

export function getTracking(): Tracking {
  return readSession<Tracking>(KEY) ?? {};
}
