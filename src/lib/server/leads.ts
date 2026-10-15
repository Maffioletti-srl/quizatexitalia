import "server-only";
import { AREAS, type AreaId } from "@/config/questions";
import { isUuid, weakestAreas, type PublicResult } from "@/lib/results";
import type { AnswerSnapshot, LevelId } from "@/lib/scoring";
import { LEADS_TABLE, getSupabase } from "./supabase";

/** Délai minimal entre deux soumissions avec le même email. */
export const RESUBMIT_DELAY_MS = 2 * 60 * 1000;

export interface LeadRow {
  nome: string;
  cognome: string;
  email: string;
  azienda: string;
  ruolo: string;
  settore: string;
  paese: string;
  telefono: string | null;
  risposte: AnswerSnapshot[];
  punteggio_totale: number;
  punteggi_area: Record<AreaId, number>;
  livello: LevelId;
  consenso_privacy: boolean;
  consenso_newsletter: boolean;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  referrer: string | null;
  versione_quiz: string;
  user_agent: string | null;
}

/** true si cet email a déjà soumis il y a moins de RESUBMIT_DELAY_MS. */
export async function hasRecentSubmission(email: string): Promise<boolean> {
  const since = new Date(Date.now() - RESUBMIT_DELAY_MS).toISOString();
  const { count, error } = await getSupabase()
    .from(LEADS_TABLE)
    .select("id", { count: "exact", head: true })
    .eq("email", email)
    .gte("created_at", since);
  if (error) throw error;
  return (count ?? 0) > 0;
}

export async function insertLead(row: LeadRow): Promise<string> {
  const { data, error } = await getSupabase().from(LEADS_TABLE).insert(row).select("id").single();
  if (error) throw error;
  return data.id as string;
}

/**
 * Résultat public : uniquement les scores et le niveau, jamais les
 * données personnelles (colonnes sélectionnées explicitement).
 */
export async function fetchPublicResult(id: string): Promise<PublicResult | null> {
  if (!isUuid(id)) return null;
  // Fonction SQL qui ne renvoie que les colonnes de score (voir la migration)
  const { data, error } = await getSupabase()
    .rpc("quiz_result_public", { p_id: id })
    .maybeSingle<{
      id: string;
      created_at: string;
      punteggio_totale: number;
      punteggi_area: Record<string, unknown> | null;
      livello: string;
    }>();
  if (error) throw error;
  if (!data) return null;

  const areas = Object.fromEntries(
    AREAS.map((a) => [a.id, Number(data.punteggi_area?.[a.id]) || 0]),
  ) as Record<AreaId, number>;

  return {
    id: data.id,
    createdAt: data.created_at,
    total: data.punteggio_totale,
    areas,
    level: data.livello as LevelId,
    weakest: weakestAreas(areas),
  };
}
