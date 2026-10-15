import { NextResponse, type NextRequest } from "next/server";
import { QUIZ_VERSION } from "@/config/questions";
import { leadRequestSchema, type LeadErrorCode, type LeadResponse } from "@/lib/lead-schema";
import { InvalidAnswersError, computeScores, snapshotAnswers } from "@/lib/scoring";
import { hasRecentSubmission, insertLead } from "@/lib/server/leads";
import { verifyTurnstile } from "@/lib/server/turnstile";

// Runtime Node.js : c'est le défaut (l'option `runtime` est incompatible avec cacheComponents).

const fail = (error: LeadErrorCode, status: number, fieldErrors?: Record<string, string>) =>
  NextResponse.json<LeadResponse>({ ok: false, error, ...(fieldErrors && { fieldErrors }) }, { status });

const orNull = (v: string | undefined) => (v ? v : null);

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("invalid", 400);
  }
  const raw = (body ?? {}) as { turnstileToken?: unknown; website?: unknown };

  // 1. Turnstile (vérification serveur)
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  const token = typeof raw.turnstileToken === "string" ? raw.turnstileToken : "";
  if (!(await verifyTurnstile(token, ip))) {
    return fail("turnstile", 403);
  }

  // 2. Honeypot
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    console.warn("[lead] honeypot rempli, requête ignorée");
    return fail("invalid", 400);
  }

  // 3. Validation Zod
  const parsed = leadRequestSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      if (issue.path[0] === "lead" && typeof issue.path[1] === "string") {
        fieldErrors[issue.path[1]] ??= issue.message;
      }
    }
    return fail("validation", 400, fieldErrors);
  }
  const { lead, answers, tracking } = parsed.data;

  // 5. Scores recalculés à partir des réponses brutes (jamais ceux du client)
  let scores;
  try {
    scores = computeScores(answers);
  } catch (err) {
    if (err instanceof InvalidAnswersError) return fail("answers", 400);
    throw err;
  }

  try {
    // 4. Anti-abus : une soumission par email toutes les 2 minutes
    if (await hasRecentSubmission(lead.email)) {
      return fail("too_soon", 429);
    }

    // 6. Insertion (clé service_role, côté serveur uniquement)
    const id = await insertLead({
      nome: lead.nome,
      cognome: lead.cognome,
      email: lead.email,
      azienda: lead.azienda,
      ruolo: lead.ruolo,
      settore: lead.settore,
      paese: lead.paese,
      telefono: orNull(lead.telefono),
      risposte: snapshotAnswers(answers),
      punteggio_totale: scores.total,
      punteggi_area: scores.areas,
      livello: scores.level,
      consenso_privacy: lead.consensoPrivacy,
      consenso_newsletter: lead.consensoNewsletter,
      utm_source: orNull(tracking.utm_source),
      utm_medium: orNull(tracking.utm_medium),
      utm_campaign: orNull(tracking.utm_campaign),
      utm_content: orNull(tracking.utm_content),
      referrer: orNull(tracking.referrer),
      versione_quiz: QUIZ_VERSION,
      user_agent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
    });

    // 7. id du résultat
    return NextResponse.json<LeadResponse>({ ok: true, id }, { status: 201 });
  } catch (err) {
    console.error("[lead] erreur Supabase", err);
    return fail("server", 500);
  }
}
