import "server-only";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Vérifie un token Turnstile côté serveur. */
export async function verifyTurnstile(token: string, ip?: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("[turnstile] TURNSTILE_SECRET_KEY manquant");
    return false;
  }
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!data.success) console.warn("[turnstile] échec", data["error-codes"]);
    return data.success === true;
  } catch (err) {
    console.error("[turnstile] erreur de vérification", err);
    return false;
  }
}
