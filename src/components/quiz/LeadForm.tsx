"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { DEFAULT_PAESE, PAESI, RUOLI, SETTORI } from "@/config/lead";
import { site } from "@/config/site";
import { btnPrimary, btnSecondary } from "@/components/ui";
import {
  leadFieldsSchema,
  type LeadErrorCode,
  type LeadFieldName,
  type LeadFields,
  type LeadResponse,
} from "@/lib/lead-schema";
import type { Answers } from "@/lib/scoring";
import { readPrefill } from "@/lib/prefill";
import { getTracking } from "@/lib/tracking";
import { m } from "@/messages";
import { Turnstile, type TurnstileHandle } from "./Turnstile";

const t = m.form;
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

type Values = {
  nome: string;
  cognome: string;
  email: string;
  azienda: string;
  ruolo: string;
  settore: string;
  paese: string;
  telefono: string;
  consensoPrivacy: boolean;
  consensoNewsletter: boolean;
};

const EMPTY: Values = {
  nome: "",
  cognome: "",
  email: "",
  azienda: "",
  ruolo: "",
  settore: "",
  paese: DEFAULT_PAESE,
  telefono: "",
  consensoPrivacy: false,
  consensoNewsletter: false,
};

/** Ordre des champs : sert à placer le focus sur la première erreur. */
const FIELD_ORDER: LeadFieldName[] = [
  "nome",
  "cognome",
  "email",
  "azienda",
  "ruolo",
  "settore",
  "paese",
  "telefono",
  "consensoPrivacy",
];

const SERVER_ERRORS: Record<LeadErrorCode, string> = {
  invalid: t.errors.server,
  validation: t.errors.summary,
  turnstile: t.errors.turnstile,
  answers: t.errors.answers,
  too_soon: t.errors.tooSoon,
  server: t.errors.server,
};

type FieldErrors = Partial<Record<LeadFieldName, string>>;

function validate(values: Values): FieldErrors {
  const res = leadFieldsSchema.safeParse(values as unknown as LeadFields);
  if (res.success) return {};
  const errors: FieldErrors = {};
  for (const issue of res.error.issues) {
    const key = issue.path[0] as LeadFieldName;
    errors[key] ??= issue.message;
  }
  return errors;
}

interface Props {
  answers: Answers;
  onBack: () => void;
  onSuccess: (resultId: string) => void;
}

export function LeadForm({ answers, onBack, onSuccess }: Props) {
  // Azienda et email saisis dans le hero de la landing, s'il y en a.
  const [values, setValues] = useState<Values>(() => {
    const p = readPrefill();
    return { ...EMPTY, azienda: p.azienda ?? "", email: p.email ?? "" };
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const turnstile = useRef<TurnstileHandle>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => headingRef.current?.focus(), []);

  const update = (name: keyof Values, value: string | boolean) => {
    setValues((v) => ({ ...v, [name]: value }));
    // Une erreur affichée se met à jour en direct pendant la correction
    if (errors[name as LeadFieldName]) {
      const next = validate({ ...values, [name]: value });
      setErrors((e) => ({ ...e, [name]: next[name as LeadFieldName] }));
    }
  };

  const onBlur = (name: LeadFieldName) => {
    const value = values[name];
    if (value === "" || value === false) return; // pas d'erreur sur un champ simplement traversé
    setErrors((e) => ({ ...e, [name]: validate(values)[name] }));
  };

  const focusFirstError = (errs: FieldErrors) => {
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      focusFirstError(errs);
      return;
    }
    if (!token) {
      setFormError(t.errors.turnstile);
      alertRef.current?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead: values,
          answers,
          tracking: getTracking(),
          turnstileToken: token,
          website: honeypot,
        }),
      });
      const data = (await res.json().catch(() => null)) as LeadResponse | null;

      if (data?.ok) {
        onSuccess(data.id);
        return;
      }
      const code = data?.error ?? "server";
      if (code === "validation" && data && !data.ok && data.fieldErrors) {
        setErrors(data.fieldErrors as FieldErrors);
        focusFirstError(data.fieldErrors as FieldErrors);
      }
      setFormError(SERVER_ERRORS[code]);
    } catch {
      setFormError(t.errors.network);
    }
    // Un token Turnstile ne sert qu'une fois : on en redemande un.
    turnstile.current?.reset();
    setSubmitting(false);
    requestAnimationFrame(() => alertRef.current?.focus());
  };

  const textField = (name: "nome" | "cognome" | "email" | "azienda" | "telefono", extra: InputExtra = {}) => (
    <Field name={name} label={t.fields[name]} required={name !== "telefono"} error={errors[name]} hint={extra.hint}>
      {(a11y) => (
        <input
          {...a11y}
          type={extra.type ?? "text"}
          autoComplete={extra.autoComplete}
          inputMode={extra.inputMode}
          value={values[name]}
          onChange={(e: ChangeEvent<HTMLInputElement>) => update(name, e.target.value)}
          onBlur={() => onBlur(name)}
          className={inputClass(!!errors[name])}
        />
      )}
    </Field>
  );

  const selectField = (name: "ruolo" | "settore" | "paese", options: readonly string[]) => (
    <Field name={name} label={t.fields[name]} required error={errors[name]}>
      {(a11y) => (
        <select
          {...a11y}
          value={values[name]}
          onChange={(e) => update(name, e.target.value)}
          onBlur={() => onBlur(name)}
          className={inputClass(!!errors[name])}
        >
          <option value="" disabled>
            {t.fields.selectPlaceholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}
    </Field>
  );

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8 h-2 rounded-full bg-accent" aria-hidden="true" />
      <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-bold outline-none sm:text-3xl">
        {t.title}
      </h1>
      <p className="mt-3 text-muted">{t.subtitle}</p>
      <p className="mt-1 text-sm text-muted">{t.requiredNote}</p>

      <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {textField("nome", { autoComplete: "given-name" })}
          {textField("cognome", { autoComplete: "family-name" })}
        </div>
        {textField("email", { type: "email", autoComplete: "email", hint: t.fields.emailHint })}
        {textField("azienda", { autoComplete: "organization" })}
        <div className="grid gap-5 sm:grid-cols-2">
          {selectField("ruolo", RUOLI)}
          {selectField("settore", SETTORI)}
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {selectField("paese", PAESI)}
          {textField("telefono", { type: "tel", autoComplete: "tel", inputMode: "tel" })}
        </div>

        {/* Honeypot : invisible pour les humains, rempli par les robots */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            {t.honeypot}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </label>
        </div>

        {/* Consentements : privacy obligatoire, newsletter facultative et séparée */}
        <div className="space-y-3 pt-2">
          <Checkbox
            name="consensoPrivacy"
            checked={values.consensoPrivacy}
            onChange={(v) => update("consensoPrivacy", v)}
            error={errors.consensoPrivacy}
            required
          >
            {t.privacy.before}
            <a href={site.privacyUrl} target="_blank" rel="noopener" className="font-semibold text-ink underline underline-offset-4">
              {t.privacy.link}
            </a>
            {t.privacy.after}
          </Checkbox>
          <Checkbox
            name="consensoNewsletter"
            checked={values.consensoNewsletter}
            onChange={(v) => update("consensoNewsletter", v)}
          >
            {t.newsletter}
          </Checkbox>
        </div>

        <div aria-label={t.turnstileLabel} role="group">
          {TURNSTILE_SITE_KEY ? (
            <Turnstile ref={turnstile} siteKey={TURNSTILE_SITE_KEY} onToken={setToken} />
          ) : (
            <p className="text-sm text-level-critico">NEXT_PUBLIC_TURNSTILE_SITE_KEY manquant</p>
          )}
        </div>

        <div ref={alertRef} tabIndex={-1} role="alert" className="outline-none">
          {formError && (
            <p className="rounded-lg border border-level-critico/50 bg-level-critico/10 px-4 py-3 text-sm">{formError}</p>
          )}
        </div>

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
          <button type="button" onClick={onBack} className={btnSecondary} disabled={submitting}>
            <span aria-hidden="true">←</span> {m.quiz.back}
          </button>
          <button type="submit" className={btnPrimary} disabled={submitting} aria-busy={submitting}>
            {submitting ? t.submitting : t.submit} {!submitting && <span aria-hidden="true">→</span>}
          </button>
        </div>
      </form>
    </div>
  );
}

interface InputExtra {
  type?: string;
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text";
  hint?: string;
}

const inputClass = (invalid: boolean) =>
  `mt-1.5 block w-full rounded-lg border bg-surface px-3.5 py-2.5 text-ink placeholder:text-muted ${
    invalid ? "border-level-critico" : "border-line hover:border-muted"
  }`;

interface FieldProps {
  name: LeadFieldName;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: (a11y: {
    id: string;
    name: string;
    required?: boolean;
    "aria-invalid"?: boolean;
    "aria-describedby"?: string;
  }) => ReactNode;
}

function Field({ name, label, required, error, hint, children }: FieldProps) {
  const id = `f-${name}`;
  const describedBy = [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-accent-text">
            {" "}*
          </span>
        ) : (
          <span className="text-muted"> ({m.form.fields.optional})</span>
        )}
      </label>
      {children({ id, name, required, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy })}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className="mt-1 text-sm text-level-critico">
          {error}
        </p>
      )}
    </div>
  );
}

function Checkbox({
  name,
  checked,
  onChange,
  error,
  required,
  children,
}: {
  name: LeadFieldName | "consensoNewsletter";
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-accent)]"
        />
        <label htmlFor={id} className="text-sm text-muted">
          {children}
          {required && (
            <span aria-hidden="true" className="text-accent-text">
              {" "}*
            </span>
          )}
        </label>
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-1 ml-8 text-sm text-level-critico">
          {error}
        </p>
      )}
    </div>
  );
}
