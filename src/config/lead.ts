/**
 * Listes du formulaire lead. Les valeurs (italien) sont enregistrées telles
 * quelles dans quiz_leads (lisibles dans Nexo) : ne pas les renommer à la
 * légère. Les libellés affichés sont traduits dans messages/*.ts (lead.*).
 */

export const SETTORI = [
  "Chimica e petrolchimica",
  "Oil & gas",
  "Manifatturiero",
  "Farmaceutico",
  "Energia",
  "Alimentare",
  "Trattamento acque e rifiuti",
  "Altro",
] as const;

export const RUOLI = [
  "Direzione / Titolare",
  "Responsabile di stabilimento",
  "HSE / RSPP",
  "Manutenzione",
  "Ingegneria / Progettazione",
  "Servizio tecnico / Strumentazione",
  "Acquisti",
  "Qualità",
  "Consulente",
  "Altro",
] as const;

export const PAESI = [
  "Italia",
  "Svizzera",
  "San Marino",
  "Austria",
  "Belgio",
  "Croazia",
  "Francia",
  "Germania",
  "Grecia",
  "Paesi Bassi",
  "Polonia",
  "Portogallo",
  "Regno Unito",
  "Romania",
  "Slovenia",
  "Spagna",
  "Altro paese europeo",
  "Paese extraeuropeo",
] as const;

export type Settore = (typeof SETTORI)[number];
export type Ruolo = (typeof RUOLI)[number];
export type Paese = (typeof PAESI)[number];

export const DEFAULT_PAESE: (typeof PAESI)[number] = "Italia";

/** Domaines de messagerie personnelle refusés (email aziendale obligatoire). */
export const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "hotmail.com",
  "hotmail.it",
  "outlook.com",
  "outlook.it",
  "live.com",
  "live.it",
  "msn.com",
  "yahoo.com",
  "yahoo.it",
  "ymail.com",
  "libero.it",
  "virgilio.it",
  "tiscali.it",
  "alice.it",
  "tim.it",
  "email.it",
  "inwind.it",
  "iol.it",
  "fastwebnet.it",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "gmx.com",
  "gmx.it",
  "gmx.de",
  "web.de",
  "proton.me",
  "protonmail.com",
  "pm.me",
  "mail.com",
  "yandex.com",
  "zoho.com",
]);

export function isFreeEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@")[1] ?? "";
  return FREE_EMAIL_DOMAINS.has(domain);
}
