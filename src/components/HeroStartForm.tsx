"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { btnPrimary } from "@/components/ui";
import { leadFieldsSchema } from "@/lib/lead-schema";
import { savePrefill } from "@/lib/prefill";
import { m } from "@/messages";

const t = m.landing;
const startSchema = leadFieldsSchema.pick({ azienda: true, email: true });

type Field = "azienda" | "email";

const START_FORM_ID = "inizia";

/**
 * Départ du questionnaire depuis le hero : azienda + email aziendale, validés
 * avec les mêmes règles que le formulaire final (emails personnels refusés),
 * puis repris par celui-ci et envoyés à Nexo avec le résultat.
 */
export function HeroStartForm() {
  const router = useRouter();
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
    router.push("/valutazione");
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
    <form id={START_FORM_ID} onSubmit={onSubmit} noValidate className="mt-8 max-w-xl scroll-mt-24 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {field("azienda", "text", "organization", t.startForm.azienda, t.startForm.aziendaPlaceholder)}
        {field("email", "email", "email", t.startForm.email, t.startForm.emailPlaceholder)}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <button type="submit" className={`${btnPrimary} text-lg`}>
          {t.cta}
          <span aria-hidden="true">→</span>
        </button>
        <p className="text-sm text-muted">{t.duration}</p>
      </div>
      <p className="text-xs text-muted">{t.startForm.note}</p>
    </form>
  );
}

/**
 * Bouton « Inizia la valutazione » du bas de page : remonte au formulaire du
 * hero et place le curseur dans « Azienda » (sans JS : simple ancre #inizia).
 */
export function ScrollToStartButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a
      href={`#${START_FORM_ID}`}
      className={className}
      onClick={(e) => {
        const input = document.getElementById("start-azienda");
        if (!input) return;
        e.preventDefault();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document
          .getElementById(START_FORM_ID)
          ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
        input.focus({ preventScroll: true });
      }}
    >
      {children}
    </a>
  );
}
