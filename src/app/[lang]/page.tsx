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
    <div className="flex min-h-dvh flex-col desk:h-dvh desk:overflow-hidden">
      <TrackingCapture />
      <SiteHeader />
      <main id="main" className="flex flex-1 desk:min-h-0">
        <section className="relative grid w-full overflow-hidden desk:grid-cols-[var(--img)_1fr] desk:[--img:34vw] xl:desk:[--img:40vw]">
          <HeroImage />

          {/* Colonne droite : titre en haut, cartes au milieu, formulaire en bas (près du footer) ; sur desktop, collés à la photo (l'espace libre reste à droite) */}
          <div className="relative z-10 flex min-w-0 flex-col items-center gap-8 px-4 pt-2 pb-10 sm:px-6 md:gap-10 md:px-10 md:pb-14 desk:items-start desk:justify-between desk:gap-4 desk:pt-8 desk:pb-6 xl:px-14 short:pt-4 short:pb-4">
            <div className="animate-fade-up w-full max-w-2xl text-balance text-center desk:max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-text">{t.eyebrow}</p>
              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl short:text-4xl">
                {t.title}
                <span className="mt-1 block text-2xl font-semibold tracking-normal text-muted md:text-3xl short:text-2xl">
                  {t.titleQuestion}
                </span>
              </h1>
              <p className="mt-4 text-muted short:hidden">{t.subtitle}</p>
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
    <div className="relative z-20 h-44 sm:h-60 md:h-80 desk:h-auto">
      <Image
        src={heroImage}
        alt={t.heroImageAlt}
        preload
        fill
        placeholder="blur"
        sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 34vw, 100vw"
        className="-scale-x-100 object-cover object-[70%_center]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-bg desk:bg-gradient-to-r desk:from-transparent desk:from-50% desk:via-bg/60 desk:via-80% desk:to-bg"
      />
    </div>
  );
}

/*
 * Cartes : version complète par défaut (mobile, tablette, écrans hauts),
 * version compacte (`compact:`) sur desktop de moins de 900 px de haut pour
 * que la home tienne sans scroll. Deux tons de la charte, en alternance :
 * navy et orange.
 */
type Tone = "navy" | "orange";

const TONE = {
  navy: {
    badge: "bg-navy/10 text-navy",
    eyebrow: "text-navy/70",
    bar: "bg-navy",
    soft: "bg-navy/[0.07] text-navy",
    // Forme décorative : quart de cercle en bas à droite
    shape: "-right-16 -bottom-16 h-44 w-44 rounded-full bg-navy/[0.06]",
  },
  orange: {
    badge: "bg-accent/15 text-accent-text",
    eyebrow: "text-accent-text",
    bar: "bg-accent",
    soft: "bg-accent/15 text-accent-text",
    // Forme décorative : coin arrondi en haut à droite
    shape: "top-0 right-0 h-20 w-20 rounded-bl-[4rem] bg-accent/40",
  },
} as const;

function Panel({
  tone,
  icon,
  eyebrow,
  title,
  children,
}: {
  tone: Tone;
  icon: ReactNode;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  const c = TONE[tone];
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-line/70 bg-surface p-6 shadow-[0_8px_30px_-12px_rgb(8_36_60/0.18)] desk:h-[24rem] compact:h-52 compact:p-4">
      <div aria-hidden="true" className={`pointer-events-none absolute ${c.shape} compact:hidden`} />
      <div className="relative flex items-center gap-4 compact:gap-2.5">
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${c.badge} compact:h-8 compact:w-8`}
        >
          <Icon className="h-7 w-7 compact:h-4 compact:w-4">{icon}</Icon>
        </span>
        <div className="min-w-0">
          <p className={`text-xs font-semibold uppercase tracking-wider ${c.eyebrow} compact:hidden`}>{eyebrow}</p>
          <h2 className="text-xl font-bold leading-tight compact:text-sm">{title}</h2>
          <span aria-hidden="true" className={`mt-2 block h-1 w-10 rounded-full ${c.bar} compact:hidden`} />
        </div>
      </div>
      <div className="relative mt-5 compact:mt-3">{children}</div>
    </div>
  );
}

async function BenefitsPanel() {
  const { t } = await landing();
  return (
    <Panel tone="navy" icon={ICONS.award} eyebrow={t.benefitsEyebrow} title={t.benefitsTitle}>
      <ul className="space-y-3 compact:space-y-2">
        {t.benefits.map((b, i) => (
          <li key={b.title} className="flex items-start gap-3 compact:items-center">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${TONE.navy.soft} compact:h-7 compact:w-7`}
            >
              <Icon className="h-[1.125rem] w-[1.125rem]">{BENEFIT_ICONS[i]}</Icon>
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
    <Panel tone="orange" icon={ICONS.shield} eyebrow={t.areasEyebrow} title={t.areasTitle}>
      <ol className="space-y-2 compact:space-y-1">
        {areas.map((a, i) => (
          <li key={a.id} className="flex min-w-0 items-center gap-3 compact:items-baseline compact:gap-2">
            <span
              aria-hidden="true"
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${TONE.orange.soft} text-xs font-bold tabular-nums compact:h-auto compact:w-auto compact:bg-transparent`}
            >
              {i + 1}
            </span>
            <span className="min-w-0 text-sm font-medium leading-snug compact:leading-tight">
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
    <Panel tone="navy" icon={ICONS.users} eyebrow={t.audienceEyebrow} title={t.audienceTitle}>
      <p className="text-sm text-muted compact:hidden">{t.audienceText}</p>
      <p className="hidden text-xs leading-snug text-muted compact:block">{t.audienceShort}</p>
      <ul className="mt-4 flex flex-wrap gap-2 compact:mt-2 compact:gap-1">
        {t.sectors.map((s, i) => (
          <li
            key={s}
            className={`flex items-center gap-1.5 rounded-full ${TONE.navy.soft} px-3 py-1.5 text-sm font-medium compact:px-2 compact:py-px compact:text-xs`}
          >
            <Icon className="h-4 w-4 shrink-0 compact:hidden">{SECTOR_ICONS[i]}</Icon>
            <span className="text-ink">{s}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

async function HowPanel() {
  const { t } = await landing();
  return (
    <Panel tone="orange" icon={ICONS.gear} eyebrow={t.howEyebrow} title={t.howTitle}>
      <ol className="divide-y divide-line compact:divide-y-0">
        {t.howSteps.map((step, i) => (
          <li key={step} className="flex items-center gap-3 py-2.5 first:pt-0 compact:gap-2.5 compact:py-1">
            <span
              aria-hidden="true"
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${TONE.orange.soft} text-base font-bold compact:h-6 compact:w-6 compact:text-xs`}
            >
              {i + 1}
            </span>
            <Icon className="h-5 w-5 shrink-0 text-accent-text compact:hidden">{STEP_ICONS[i]}</Icon>
            <p className="text-sm leading-snug">{step}</p>
          </li>
        ))}
      </ol>
      <p className="mt-3 flex items-center gap-3 rounded-xl bg-bg px-4 py-2.5 text-sm text-muted compact:hidden">
        <Icon className="h-5 w-5 shrink-0 text-accent-text">{ICONS.clock}</Icon>
        <span aria-hidden="true" className="h-5 w-px bg-accent/50" />
        {t.duration}
      </p>
    </Panel>
  );
}

function Icon({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/* Icônes au trait (tracés de Lucide, licence ISC). */
const ICONS = {
  award: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11" />
    </>
  ),
  shield: (
    <>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  gear: (
    <>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
};

/** Une icône par secteur, dans l'ordre de `landing.sectors`. */
const SECTOR_ICONS = [
  // Chimica e petrolchimica
  <path key="0" d="M10 2v7.53a2 2 0 0 1-.21.9L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.07-10.13A2 2 0 0 1 14 9.53V2M8.5 2h7M7 16h10" />,
  // Oil & gas
  <path key="1" d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z" />,
  // Manifatturiero
  <path key="2" d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2ZM17 18h1M12 18h1M7 18h1" />,
  // Farmaceutico
  <path key="3" d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7ZM8.5 8.5l7 7" />,
  // Energia
  <path key="4" d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />,
  // Alimentare
  <path key="5" d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />,
];

/** Icônes des étapes : questionnaire, données, résultats. */
const STEP_ICONS = [
  <path key="0" d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7ZM14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8" />,
  <path key="1" d="M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM20 21a8 8 0 0 0-16 0" />,
  <path key="2" d="M13 17V9M18 17V5M3 3v16a2 2 0 0 0 2 2h16M8 17v-3" />,
];
