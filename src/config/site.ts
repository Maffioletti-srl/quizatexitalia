/** Paramètres du site lus depuis l'environnement, avec valeurs par défaut. */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://quiz.atexitalia.it",
  privacyUrl: process.env.NEXT_PUBLIC_PRIVACY_URL || "https://www.atexitalia.it/privacy",
  mainSiteUrl: "https://www.atexitalia.it",
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",
};

/** Adresse du CTA « Parla con un esperto » — serveur uniquement. */
export function contactEmail(): string {
  return process.env.CONTACT_EMAIL || "info@atexitalia.it";
}
