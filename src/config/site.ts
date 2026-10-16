/** Paramètres du site lus depuis l'environnement, avec valeurs par défaut. */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://quiz.atexitalia.it",
  privacyUrl: process.env.NEXT_PUBLIC_PRIVACY_URL || "https://www.atexitalia.it/privacy",
  mainSiteUrl: "https://www.atexitalia.it",
  /** Coordonnées affichées dans le footer (source : atexitalia.it/contatti). */
  email: "info@atexitalia.it",
  phone: "+39 035 578 8848",
  phoneHref: "tel:+390355788848",
  vat: "IT02664950165",
  linkedinUrl: "https://www.linkedin.com/company/atex-italia/",
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",
};

/** Adresse du CTA « Parla con un esperto » — serveur uniquement. */
export function contactEmail(): string {
  return process.env.CONTACT_EMAIL || "info@atexitalia.it";
}
