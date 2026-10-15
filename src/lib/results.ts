/** Types et utilitaires du résultat public (utilisables client et serveur). */
import type { AreaId } from "@/config/questions";
import type { LevelId } from "./scoring";

export { weakestAreas } from "./scoring";

export interface PublicResult {
  id: string;
  createdAt: string;
  total: number;
  areas: Record<AreaId, number>;
  level: LevelId;
  weakest: AreaId[];
}

/** Résultat fictif, disponible uniquement hors production (dev, aperçu PDF). */
export const DEMO_RESULT_ID = "00000000-0000-4000-8000-000000000000";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID_RE.test(value);
}
