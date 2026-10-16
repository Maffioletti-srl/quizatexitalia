/**
 * Schéma Zod du formulaire lead — partagé client (messages d'erreur
 * immédiats) et serveur (validation qui fait foi).
 */
import { z } from "zod";
import { PAESI, RUOLI, SETTORI, isFreeEmail } from "@/config/lead";
import { LOCALES } from "@/i18n/config";
import { it, type Messages } from "@/messages/it";

type ErrorMessages = Messages["form"]["errors"];

const text = (e: ErrorMessages, max: number) =>
  z.string({ error: e.required }).trim().min(1, { error: e.required }).max(max, { error: e.tooLong });

const optionalText = (max: number) => z.string().trim().max(max).optional().default("");

/** Champs saisis par l'utilisateur, avec les messages d'erreur d'une langue. */
export const createLeadFieldsSchema = (e: ErrorMessages) =>
  z.object({
    nome: text(e, 80),
    cognome: text(e, 80),
    email: z
      .string({ error: e.required })
      .trim()
      .toLowerCase()
      .min(1, { error: e.required })
      .max(254, { error: e.tooLong })
      .pipe(z.email({ error: e.email }))
      .refine((v) => !isFreeEmail(v), { error: e.freeEmail }),
    azienda: text(e, 160),
    ruolo: z.enum(RUOLI, { error: e.select }),
    settore: z.enum(SETTORI, { error: e.select }),
    paese: z.enum(PAESI, { error: e.select }),
    telefono: z
      .string()
      .trim()
      .max(30, { error: e.tooLong })
      .refine((v) => v === "" || /^\+?[0-9 ()./-]{6,}$/.test(v), {
        error: e.phone,
      })
      .optional()
      .default(""),
    consensoPrivacy: z.literal(true, { error: e.privacy }),
    consensoNewsletter: z.boolean().optional().default(false),
  });

/** Schéma avec les messages italiens (référence, tests). */
export const leadFieldsSchema = createLeadFieldsSchema(it.form.errors);

export type LeadFields = z.input<typeof leadFieldsSchema>;
export type LeadFieldName = keyof LeadFields;

/** Corps complet de POST /api/lead. */
export const createLeadRequestSchema = (e: ErrorMessages) =>
  z.object({
    lead: createLeadFieldsSchema(e),
    /** Langue de l'interface : messages d'erreur renvoyés au client. */
    locale: z.enum(LOCALES).optional().default("it"),
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
      .default({
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        utm_content: "",
        referrer: "",
      }),
    turnstileToken: z.string().max(4096).optional().default(""),
    /** Honeypot : doit rester vide. */
    website: z.string().max(500).optional().default(""),
  });

export const leadRequestSchema = createLeadRequestSchema(it.form.errors);

export type LeadRequest = z.input<typeof leadRequestSchema>;

export type LeadErrorCode = "invalid" | "validation" | "turnstile" | "answers" | "too_soon" | "server";

/** Réponse de POST /api/lead. */
export type LeadResponse =
  { ok: true; id: string } | { ok: false; error: LeadErrorCode; fieldErrors?: Record<string, string> };
