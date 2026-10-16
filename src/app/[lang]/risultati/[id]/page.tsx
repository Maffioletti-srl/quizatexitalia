import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getAreas } from "@/config/content";
import { contactEmail, site } from "@/config/site";
import { AreaRadar } from "@/components/results/AreaRadar";
import { ScoreRing } from "@/components/results/ScoreRing";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { btnPrimary, btnSecondary, card } from "@/components/ui";
import { INTL_LOCALES, localePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { getPublicResult } from "@/lib/server/results";
import type { LevelId } from "@/lib/scoring";
import { getMessages } from "@/messages";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getMessages(await getLocale()).meta.resultsTitle,
    // Les pages de résultats ne sont jamais indexées.
    robots: { index: false, follow: false },
  };
}

// Classes explicites (Tailwind ne détecte pas les classes construites dynamiquement)
const LEVEL_TEXT: Record<LevelId, string> = {
  critico: "text-level-critico",
  da_migliorare: "text-level-da_migliorare",
  buono: "text-level-buono",
  eccellente: "text-level-eccellente",
};

export default function RisultatiPage({ params }: PageProps<"/[lang]/risultati/[id]">) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {/* Données propres à chaque requête : streamées sous la coquille statique */}
        <Suspense fallback={<ResultSkeleton />}>
          <ResultContent params={params} />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}

function ResultSkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14" aria-busy="true">
      <div className="h-9 w-2/3 animate-pulse rounded bg-surface" />
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className={`${card} h-56 animate-pulse`} />
        <div className={`${card} h-56 animate-pulse`} />
      </div>
    </div>
  );
}

async function ResultContent({ params }: { params: PageProps<"/[lang]/risultati/[id]">["params"] }) {
  const { id } = await params;
  const result = await getPublicResult(id);
  if (!result) notFound();

  const locale = await getLocale();
  const m = getMessages(locale);
  const t = m.results;
  const areas = getAreas(locale);
  const dateFormat = new Intl.DateTimeFormat(INTL_LOCALES[locale], { dateStyle: "long" });

  const level = m.levels[result.level];
  const radarData = areas.map((a) => ({ area: a.shortTitle, score: result.areas[a.id] }));
  const priorities = result.weakest.map((areaId) => areas.find((a) => a.id === areaId)!);

  const resultUrl = `${site.url}${localePath(locale, `/risultati/${result.id}`)}`;
  const mailto = `mailto:${contactEmail()}?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(
    t.mailBody(result.total, level.label, resultUrl),
  )}`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm text-muted">
        {t.dateLabel} {dateFormat.format(new Date(result.createdAt))}
      </p>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{t.title}</h1>

      {/* Avertissement bien visible */}
      <p
        role="note"
        className="mt-6 rounded-lg border border-level-da_migliorare/40 bg-level-da_migliorare/10 px-4 py-3 text-sm"
      >
        <span aria-hidden="true">⚠ </span>
        {t.disclaimer}
      </p>

      {/* Score global + radar */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="score" className={`${card} flex flex-col items-center gap-6 p-6 sm:flex-row sm:p-8`}>
          <div className="relative">
            <ScoreRing score={result.total} level={result.level} />
            <p className="absolute inset-0 flex items-center justify-center text-4xl font-bold sm:text-5xl">
              {result.total}%
            </p>
          </div>
          <div className="text-center sm:text-left">
            <h2 id="score" className="text-sm font-semibold uppercase tracking-wider text-muted">
              {t.scoreLabel}
            </h2>
            <p className={`mt-2 text-2xl font-bold ${LEVEL_TEXT[result.level]}`}>
              <span className="sr-only">{t.levelLabel}: </span>
              {level.label}
            </p>
            <p className="mt-2 text-muted">{level.text}</p>
          </div>
        </section>

        <section aria-labelledby="radar" className={`${card} p-6`}>
          <h2 id="radar" className="font-semibold">
            {t.radarTitle}
          </h2>
          <AreaRadar data={radarData} label={radarData.map((d) => `${d.area} ${d.score}%`).join(", ")} />
        </section>
      </div>

      {/* Scores par area (équivalent textuel du radar) */}
      <section aria-labelledby="areas" className={`${card} mt-6 p-6`}>
        <h2 id="areas" className="font-semibold">
          {t.areaScoresTitle}
        </h2>
        <ul className="mt-4 grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {areas.map((a) => (
            <li key={a.id}>
              <div className="flex justify-between gap-4 text-sm">
                <span>{a.title}</span>
                <span className="font-semibold tabular-nums">{result.areas[a.id]}%</span>
              </div>
              <div className="mt-1.5 h-2 rounded-full bg-surface-2" aria-hidden="true">
                <div className="h-2 rounded-full bg-accent" style={{ width: `${Math.max(result.areas[a.id], 2)}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Priorités */}
      <section aria-labelledby="priorities" className="mt-12">
        <h2 id="priorities" className="text-2xl font-bold">
          {t.prioritiesTitle}
        </h2>
        <p className="mt-2 text-muted">{t.prioritiesIntro}</p>
        <ol className="mt-6 space-y-4">
          {priorities.map((a, i) => (
            <li key={a.id} className={`${card} p-6`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold">
                  <span className="text-accent-text">{i + 1}.</span> {a.title}
                </h3>
                <span className="text-sm font-semibold tabular-nums text-muted">{result.areas[a.id]}%</span>
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-muted">{t.recommendation}</p>
              <p className="mt-1">{a.recommendation}</p>
              <div className="mt-5 rounded-lg border border-line bg-surface-2 p-4">
                <p className="text-sm text-muted">{t.serviceLabel}</p>
                <p className="mt-1 font-semibold">{a.service.name}</p>
                <p className="mt-1 text-sm text-muted">{a.service.description}</p>
                <a
                  href={a.service.url}
                  className="mt-3 inline-block text-sm font-semibold text-accent-text underline-offset-4 hover:underline"
                >
                  {t.serviceCta} <span aria-hidden="true">→</span>
                </a>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section aria-labelledby="cta" className={`${card} mt-12 border-accent/40 p-6 sm:p-8`}>
        <h2 id="cta" className="text-2xl font-bold">
          {t.ctaTitle}
        </h2>
        <p className="mt-2 max-w-2xl text-muted">{t.ctaText}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={mailto} className={btnPrimary}>
            {t.ctaExpert}
          </a>
          <a href={`/api/report/${result.id}?lang=${locale}`} className={btnSecondary} download>
            {t.ctaPdf}
          </a>
        </div>
      </section>

      <p className="mt-10 text-center">
        <Link href={localePath(locale, "/valutazione?nuova=1")} className="text-sm text-muted underline underline-offset-4 hover:text-ink">
          {t.restart}
        </Link>
      </p>
    </div>
  );
}
