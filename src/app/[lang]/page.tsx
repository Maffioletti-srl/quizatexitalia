import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { getAreas } from "@/config/content";
import { HeroCarousel } from "@/components/HeroCarousel";
import { HeroStartForm } from "@/components/HeroStartForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrackingCapture } from "@/components/TrackingCapture";
import { INTL_LOCALES, LOCALES, localePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { getMessages } from "@/messages";
import heroImage from "../../../public/hero-impianto.jpg";

/** URL canonique et versions linguistiques (hreflang) de la home. */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    alternates: {
      canonical: localePath(locale, "/"),
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [INTL_LOCALES[l], localePath(l, "/")])),
        "x-default": "/",
      },
    },
  };
}

/** Textes de la home et aires dans la langue de la requête. */
async function landing() {
  const locale = await getLocale();
  return { t: getMessages(locale).landing, areas: getAreas(locale) };
}

const BENEFIT_ICONS = [
  // Punteggio
  <path key="0" d="M12 3a9 9 0 1 0 9 9M12 3v9l6.4-6.4" />,
  // Radar
  <path key="1" d="M12 3l8 5.5v7L12 21l-8-5.5v-7zM12 8l4 3v3l-4 3-4-3v-3z" />,
  // Priorità
  <path key="2" d="M4 6h16M4 12h10M4 18h6" />,
  // PDF
  <path key="3" d="M7 3h7l5 5v13H7zM14 3v5h5M10 14h6M10 17h4" />,
];

/**
 * Home sur un seul écran (desktop) : header, hero et footer visibles sans
 * scroll. Le hero contient la photo à gauche et, à droite, le titre, les
 * cartes des sections (présentées deux par deux) et le formulaire de départ.
 * Mobile : la page défile normalement.
 */
export default async function LandingPage() {
  const { t } = await landing();
  return (
    <div className="flex min-h-dvh flex-col md:h-dvh md:overflow-hidden">
      <TrackingCapture />
      <SiteHeader />
      <main id="main" className="flex flex-1 md:min-h-0">
        <section className="relative grid w-full overflow-hidden md:grid-cols-[var(--img)_1fr] md:[--img:42vw] lg:[--img:34vw] xl:[--img:40vw]">
          <HeroImage />

          {/* Colonne droite : titre en haut, cartes au milieu, formulaire en bas (près du footer) */}
          <div className="relative z-10 flex min-w-0 flex-col items-center gap-8 px-4 pt-2 pb-10 sm:px-6 md:justify-between md:gap-4 md:px-10 md:pt-8 md:pb-6 xl:px-14 md:short:pt-4 md:short:pb-4">
            <div className="animate-fade-up max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-text">{t.eyebrow}</p>
              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight lg:text-5xl md:short:text-3xl lg:short:text-4xl">
                {t.title}
                <span className="mt-1 block text-2xl font-semibold tracking-normal text-muted lg:text-3xl md:short:text-xl lg:short:text-2xl">
                  {t.titleQuestion}
                </span>
              </h1>
              <p className="mt-4 text-muted md:short:hidden">{t.subtitle}</p>
            </div>

            <HeroCarousel
              className="w-full max-w-4xl"
              panels={[
                <BenefitsPanel key="benefits" />,
                <AreasPanel key="areas" />,
                <AudiencePanel key="audience" />,
                <HowPanel key="how" />,
              ]}
            />

            <div className="w-full max-w-4xl">
              <HeroStartForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

/**
 * Photo du hero, au-dessus des cartes (z-20) : la carte de gauche sort en
 * glissant sous le fondu vers le crème. Desktop : colonne gauche bord à bord ;
 * mobile : bandeau en haut. Image retournée : le technicien passe à gauche.
 */
async function HeroImage() {
  const { t } = await landing();
  return (
    <div className="relative z-20 h-44 sm:h-60 md:h-auto">
      <Image
        src={heroImage}
        alt={t.heroImageAlt}
        preload
        fill
        placeholder="blur"
        sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 34vw, (min-width: 768px) 42vw, 100vw"
        className="-scale-x-100 object-cover object-[70%_center]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-bg md:bg-gradient-to-r md:from-transparent md:from-50% md:via-bg/60 md:via-80% md:to-bg"
      />
    </div>
  );
}

/*
 * Cartes : version complète par défaut (mobile et écrans hauts), version
 * compacte (`compact:`) sur desktop de moins de 900 px de haut pour que la
 * home tienne sans scroll.
 */
function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm md:h-[22rem] compact:h-52 compact:rounded-xl compact:p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-accent-text compact:text-xs">{title}</h2>
      <div className="mt-4 compact:mt-3">{children}</div>
    </div>
  );
}

async function BenefitsPanel() {
  const { t } = await landing();
  return (
    <Panel title={t.benefitsTitle}>
      <ul className="space-y-3.5 compact:space-y-2.5">
        {t.benefits.map((b, i) => (
          <li key={b.title} className="flex items-start gap-3 compact:items-center">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-text compact:h-8 compact:w-8">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {BENEFIT_ICONS[i]}
              </svg>
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold">{b.title}</p>
              <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-muted compact:hidden">{b.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

async function AreasPanel() {
  const { t, areas } = await landing();
  return (
    <Panel title={t.areasTitle}>
      <ol className="space-y-2.5 compact:grid compact:grid-cols-2 compact:gap-x-4 compact:gap-y-3.5 compact:space-y-0">
        {areas.map((a, i) => (
          <li key={a.id} className="flex min-w-0 items-center gap-3 compact:items-baseline compact:gap-2">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line bg-bg text-xs font-bold tabular-nums text-accent-text compact:h-auto compact:w-auto compact:border-0 compact:bg-transparent"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 text-sm font-medium leading-snug">
              <span className="compact:hidden">{a.title}</span>
              <span className="hidden compact:inline">{a.shortTitle}</span>
            </span>
          </li>
        ))}
      </ol>
    </Panel>
  );
}

async function AudiencePanel() {
  const { t } = await landing();
  return (
    <Panel title={t.audienceTitle}>
      <p className="text-sm text-muted compact:hidden">{t.audienceText}</p>
      <p className="hidden text-xs leading-snug text-muted compact:block">{t.audienceShort}</p>
      <ul className="mt-4 flex flex-wrap gap-2 compact:mt-2 compact:gap-1">
        {t.sectors.map((s) => (
          <li
            key={s}
            className="rounded-full border border-line bg-bg px-3 py-1 text-sm compact:px-2 compact:py-px compact:text-xs"
          >
            {s}
          </li>
        ))}
      </ul>
    </Panel>
  );
}

async function HowPanel() {
  const { t } = await landing();
  return (
    <Panel title={t.howTitle}>
      <ol className="space-y-4 compact:space-y-2.5">
        {t.howSteps.map((step, i) => (
          <li key={step} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-ink compact:h-6 compact:w-6 compact:text-xs"
            >
              {i + 1}
            </span>
            <p className="pt-1 text-sm leading-snug compact:pt-0">{step}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 border-t border-line pt-4 text-sm font-medium text-muted compact:hidden">{t.duration}</p>
    </Panel>
  );
}
