/**
 * Schéma Zod du formulaire lead — partagé client (messages d'erreur
 * immédiats) et serveur (validation qui fait foi).
 */
import { z } from "zod";
import { PAESI, RUOLI, SETTORI, isFreeEmail } from "@/config/lead";
import { m } from "@/messages";

const e = m.form.errors;

const text = (max: number) =>
  z
    .string({ error: e.required })
    .trim()
    .min(1, { error: e.required })
    .max(max, { error: e.tooLong });

const optionalText = (max: number) => z.string().trim().max(max).optional().default("");

/** Champs saisis par l'utilisateur. */
export const leadFieldsSchema = z.object({
  nome: text(80),
  cognome: text(80),
  email: z
    .string({ error: e.required })
    .trim()
    .toLowerCase()
    .min(1, { error: e.required })
    .max(254, { error: e.tooLong })
    .pipe(z.email({ error: e.email }))
    .refine((v) => !isFreeEmail(v), { error: e.freeEmail }),
  azienda: text(160),
  ruolo: z.enum(RUOLI, { error: e.select }),
  settore: z.enum(SETTORI, { error: e.select }),
  paese: z.enum(PAESI, { error: e.select }),
  telefono: z
    .string()
    .trim()
    .max(30, { error: e.tooLong })
    .refine((v) => v === "" || /^\+?[0-9 ()./-]{6,}$/.test(v), { error: e.phone })
    .optional()
    .default(""),
  consensoPrivacy: z.literal(true, { error: e.privacy }),
  consensoNewsletter: z.boolean().optional().default(false),
});

export type LeadFields = z.input<typeof leadFieldsSchema>;
export type LeadFieldName = keyof LeadFields;

/** Corps complet de POST /api/lead. */
export const leadRequestSchema = z.object({
  lead: leadFieldsSchema,
  /** id de question → id de réponse ; contrôlé ensuite par le scoring. */
  answers: z.record(z.string().max(20), z.string().max(30)).refine((a) => Object.keys(a).length <= 50),
  tracking: z
    .object({
      utm_source: optionalText(300),
      utm_medium: optionalText(300),
      utm_campaign: optionalText(300),
      utm_content: optionalText(300),
      referrer: optionalText(300),
    })
    .optional()
    .default({ utm_source: "", utm_medium: "", utm_campaign: "", utm_content: "", referrer: "" }),
  turnstileToken: z.string().max(4096).optional().default(""),
  /** Honeypot : doit rester vide. */
  website: z.string().max(500).optional().default(""),
});

export type LeadRequest = z.input<typeof leadRequestSchema>;

export type LeadErrorCode = "invalid" | "validation" | "turnstile" | "answers" | "too_soon" | "server";

/** Réponse de POST /api/lead. */
export type LeadResponse =
  | { ok: true; id: string }
  | { ok: false; error: LeadErrorCode; fieldErrors?: Record<string, string> };
