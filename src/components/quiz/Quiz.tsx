"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { getAreas, getQuestions } from "@/config/content";
import { QUESTIONS, QUIZ_VERSION } from "@/config/questions";
import { btnPrimary, btnSecondary } from "@/components/ui";
import type { Answers } from "@/lib/scoring";
import { readSession, removeSession, writeSession } from "@/lib/session-storage";
import { useLocale, useMessages } from "@/i18n/client";
import { localePath } from "@/i18n/config";
import { LeadForm } from "./LeadForm";

const STORAGE_KEY = "atex-quiz:state";
const TOTAL = QUESTIONS.length;
/** Délai avant de passer à la question suivante après un clic souris. */
const AUTO_ADVANCE_MS = 280;

interface QuizState {
  version: string;
  /** 0…TOTAL-1 : questions ; TOTAL : formulaire. */
  step: number;
  answers: Answers;
}

const initialState: QuizState = { version: QUIZ_VERSION, step: 0, answers: {} };

function loadState(): QuizState {
  // /valutazione?nuova=1 : repartir de zéro (lien « Rifai la valutazione »)
  if (new URLSearchParams(window.location.search).has("nuova")) {
    removeSession(STORAGE_KEY);
    window.history.replaceState(null, "", window.location.pathname);
    return initialState;
  }
  const saved = readSession<QuizState>(STORAGE_KEY);
  // Une nouvelle version du questionnaire invalide les réponses en cours.
  if (!saved || saved.version !== QUIZ_VERSION) return initialState;
  const step = Math.min(Math.max(0, Number(saved.step) || 0), TOTAL);
  return { version: QUIZ_VERSION, step, answers: saved.answers ?? {} };
}

export default function Quiz() {
  const router = useRouter();
  const locale = useLocale();
  // Rendu client uniquement (voir QuizLoader) : lecture directe du stockage.
  const [state, setState] = useState<QuizState>(loadState);

  useEffect(() => {
    writeSession(STORAGE_KEY, state);
  }, [state]);

  const goTo = (step: number) => setState((s) => ({ ...s, step }));

  const restart = () => {
    removeSession(STORAGE_KEY);
    setState(initialState);
  };

  if (state.step >= TOTAL) {
    return (
      <>
        {/* Questionnaire terminé : barre de progression pleine */}
        <div aria-hidden="true" className="h-1.5 w-full bg-accent" />
        <LeadForm
          answers={state.answers}
          onBack={() => goTo(TOTAL - 1)}
          onSuccess={(id) => {
            // Réponses enregistrées : on peut vider la session
            removeSession(STORAGE_KEY);
            router.replace(localePath(locale, `/risultati/${id}`));
          }}
        />
      </>
    );
  }

  return (
    <QuestionStep
      key={state.step}
      index={state.step}
      selected={state.answers[QUESTIONS[state.step].id]}
      onSelect={(optionId) =>
        setState((s) => ({
          ...s,
          answers: { ...s.answers, [QUESTIONS[s.step].id]: optionId },
        }))
      }
      onNext={() => goTo(state.step + 1)}
      onBack={state.step > 0 ? () => goTo(state.step - 1) : undefined}
      onRestart={state.step > 0 ? restart : undefined}
    />
  );
}

interface QuestionStepProps {
  index: number;
  selected: string | undefined;
  onSelect: (optionId: string) => void;
  onNext: () => void;
  onBack?: () => void;
  onRestart?: () => void;
}

function QuestionStep({ index, selected, onSelect, onNext, onBack, onRestart }: QuestionStepProps) {
  const locale = useLocale();
  const m = useMessages();
  const areas = getAreas(locale);
  const question = getQuestions(locale)[index];
  const areaIndex = areas.findIndex((a) => a.id === question.areaId);
  const area = areas[areaIndex];
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timer = useRef<number | undefined>(undefined);

  // Focus sur la question à chaque écran (lecteurs d'écran et clavier).
  useEffect(() => {
    headingRef.current?.focus();
    return () => window.clearTimeout(timer.current);
  }, []);

  const mainOptions = question.options.filter((o) => !o.unknown);
  const unknownOptions = question.options.filter((o) => o.unknown);
  const isLast = index === TOTAL - 1;
  const progress = Math.round((index / TOTAL) * 100);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selected) onNext();
  };

  // Clic souris (detail > 0) : passage automatique. Clavier (flèches) : non,
  // l'utilisateur valide avec Entrée ou le bouton « Avanti ».
  // Écouté sur le label : un clic souris y a detail ≥ 1, alors que le clic
  // synthétique déclenché par le clavier (flèches, espace) a detail = 0.
  const handleClick = (e: MouseEvent<HTMLLabelElement>) => {
    if (e.detail > 0) {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(onNext, AUTO_ADVANCE_MS);
    }
  };

  const optionCard = (o: (typeof question.options)[number], small = false) => {
    const checked = selected === o.id;
    return (
      <label
        key={o.id}
        onClick={handleClick}
        className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink sm:p-5 ${
          checked ? "border-accent bg-accent/10" : "border-line bg-surface hover:border-muted"
        } ${small ? "py-3 sm:py-3" : ""}`}
      >
        <input
          type="radio"
          name={question.id}
          value={o.id}
          checked={checked}
          onChange={() => onSelect(o.id)}
          className="sr-only"
        />
        <span
          aria-hidden="true"
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
            checked ? "border-accent" : "border-muted"
          }`}
        >
          {checked && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}
        </span>
        <span className={small ? "text-muted" : ""}>{o.label}</span>
      </label>
    );
  };

  return (
    <div className="w-full">
      {/* Barre de progression pleine largeur, juste sous le header */}
      <div
        role="progressbar"
        aria-label={m.quiz.progressLabel(index + 1, TOTAL)}
        aria-valuemin={0}
        aria-valuemax={TOTAL}
        aria-valuenow={index + 1}
        aria-valuetext={`${m.quiz.progressLabel(index + 1, TOTAL)} · ${area.title}`}
        className="h-1.5 w-full bg-surface-2"
      >
        <div
          className="h-full bg-accent transition-[width] duration-500"
          style={{ width: `${Math.max(progress, 3)}%` }}
        />
      </div>

      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 flex items-baseline justify-between gap-4 text-sm">
          <p className="font-semibold text-accent-text">
            {m.quiz.areaLabel(areaIndex + 1, areas.length, area.title)}
          </p>
          <p className="shrink-0 text-muted">{m.quiz.progressLabel(index + 1, TOTAL)}</p>
        </div>

        <form onSubmit={handleSubmit} className="animate-fade-up">
          <fieldset>
            <legend className="contents">
              <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-bold leading-snug outline-none sm:text-3xl">
                {question.text}
              </h1>
            </legend>
            {question.hint && <p className="mt-3 text-sm text-muted">{question.hint}</p>}

            <div className="mt-8 space-y-3">{mainOptions.map((o) => optionCard(o))}</div>
            {unknownOptions.length > 0 && (
              <div className="mt-3 border-t border-line pt-3">{unknownOptions.map((o) => optionCard(o, true))}</div>
            )}
          </fieldset>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            {onBack ? (
              <button type="button" onClick={onBack} className={btnSecondary}>
                <span aria-hidden="true">←</span> {m.quiz.back}
              </button>
            ) : (
              <Link href={localePath(locale, "/")} className={btnSecondary}>
                <span aria-hidden="true">←</span> {m.quiz.back}
              </Link>
            )}
            <button type="submit" disabled={!selected} className={btnPrimary} aria-describedby={selected ? undefined : "choose-hint"}>
              {isLast ? m.quiz.finish : m.quiz.next} <span aria-hidden="true">→</span>
            </button>
          </div>
          {!selected && (
            <p id="choose-hint" className="mt-3 text-right text-sm text-muted">
              {m.quiz.chooseHint}
            </p>
          )}
        </form>

        {onRestart && (
          <p className="mt-10 text-center">
            <button type="button" onClick={onRestart} className="text-sm text-muted underline underline-offset-4 hover:text-ink">
              {m.quiz.restart}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
