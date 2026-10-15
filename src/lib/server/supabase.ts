import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Client Supabase avec la clé service_role (Supabase du CRM Nexo).
 * Serveur uniquement : la clé n'a pas de préfixe NEXT_PUBLIC et ce module
 * est protégé par « server-only ».
 */
export function getSupabase(): SupabaseClient {
  if (client) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant");
  }
  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

export const LEADS_TABLE = "quiz_leads";
