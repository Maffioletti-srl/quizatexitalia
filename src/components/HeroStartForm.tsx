"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState, type FormEvent } from "react";
import { btnPrimary } from "@/components/ui";
import { useLocale, useMessages } from "@/i18n/client";
import { localePath } from "@/i18n/config";
import { createLeadFieldsSchema } from "@/lib/lead-schema";
import { savePrefill } from "@/lib/prefill";

type Field = "azienda" | "email";

const START_FORM_ID = "inizia";

/**
 * Départ du questionnaire depuis le hero : azienda + email aziendale, validés
 * avec les mêmes règles que le formulaire final (emails personnels refusés),
 * puis repris par celui-ci et envoyés à Nexo avec le résultat.
 */
export function HeroStartForm() {
  const router = useRouter();
  const locale = useLocale();
  const m = useMessages();
  const t = m.landing;
  const startSchema = useMemo(
    () => createLeadFieldsSchema(m.form.errors).pick({ azienda: true, email: true }),
    [m],
  );
  const [values, setValues] = useState<Record<Field, string>>({ azienda: "", email: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const refs = { azienda: useRef<HTMLInputElement>(null), email: useRef<HTMLInputElement>(null) };

  const validate = (v: Record<Field, string>) => {
    const res = startSchema.safeParse(v);
    const errs: Partial<Record<Field, string>> = {};
    if (!res.success) for (const i of res.error.issues) errs[i.path[0] as Field] ??= i.message;
    return { res, errs };
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { res, errs } = validate(values);
    setErrors(errs);
    if (!res.success) {
      const first = (["azienda", "email"] as Field[]).find((f) => errs[f]);
      if (first) refs[first].current?.focus();
      return;
    }
    savePrefill(res.data);
    router.push(localePath(locale, "/valutazione"));
  };

  const set = (f: Field, v: string) => {
    const next = { ...values, [f]: v };
    setValues(next);
    // Une erreur affichée se met à jour pendant la correction
    if (errors[f]) setErrors((er) => ({ ...er, [f]: validate(next).errs[f] }));
  };

  const field = (f: Field, type: string, autoComplete: string, label: string, placeholder: string) => (
    <div>
      <label htmlFor={`start-${f}`} className="text-sm font-medium">
        {label}
      </label>
      <input
        ref={refs[f]}
        id={`start-${f}`}
        name={f}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={values[f]}
        onChange={(e) => set(f, e.target.value)}
        aria-invalid={errors[f] ? true : undefined}
        aria-describedby={errors[f] ? `start-${f}-err` : undefined}
        className={`mt-1.5 block w-full rounded-lg border bg-surface px-3.5 py-2.5 text-ink placeholder:text-muted/70 ${
          errors[f] ? "border-level-critico" : "border-line hover:border-muted"
        }`}
      />
      {errors[f] && (
        <p id={`start-${f}-err`} className="mt-1 text-sm text-level-critico">
          {errors[f]}
        </p>
      )}
    </div>
  );

  return (
    <form id={START_FORM_ID} onSubmit={onSubmit} noValidate className="scroll-mt-24">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_auto] xl:items-start">
        {field("azienda", "text", "organization", t.startForm.azienda, t.startForm.aziendaPlaceholder)}
        {field("email", "email", "email", t.startForm.email, t.startForm.emailPlaceholder)}
        {/* Aligné sur les champs : hauteur du label + marge */}
        <button type="submit" className={`${btnPrimary} h-[2.875rem] px-5 py-0 sm:col-span-2 xl:col-span-1 xl:mt-[1.625rem]`}>
          {t.cta}
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <p className="mt-2.5 text-xs text-muted short:hidden">
        {t.duration} · {t.startForm.note}
      </p>
    </form>
  );
}
