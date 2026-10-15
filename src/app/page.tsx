import Image from "next/image";
import { AREAS } from "@/config/questions";
import { HeroStartForm, ScrollToStartButton } from "@/components/HeroStartForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrackingCapture } from "@/components/TrackingCapture";
import { btnPrimary, card } from "@/components/ui";
import { m } from "@/messages";
import heroImage from "../../public/hero-impianto.jpg";

const t = m.landing;

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

export default function LandingPage() {
  return (
    <>
      <TrackingCapture />
      <SiteHeader />
      <main id="main" className="flex-1">
        {/* Hero : image sur la moitié gauche (bord à bord), fondue vers le texte */}
        <section className="relative overflow-hidden">
          <HeroImage />
          <div className="relative mx-auto grid max-w-5xl px-4 pt-2 pb-14 sm:px-6 md:min-h-[560px] md:grid-cols-2 md:items-center md:py-20">
            <div className="hidden md:block" aria-hidden="true" />
            <div className="animate-fade-up md:pl-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-text">{t.eyebrow}</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
                {t.title}
                <span className="mt-2 block text-2xl font-semibold text-muted sm:text-3xl">{t.titleQuestion}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted">{t.subtitle}</p>
              <HeroStartForm />
            </div>
          </div>
        </section>

        {/* Cosa ottieni */}
        <section aria-labelledby="benefits" className="border-t border-line bg-surface/40">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
            <h2 id="benefits" className="text-2xl font-bold sm:text-3xl">
              {t.benefitsTitle}
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.benefits.map((b, i) => (
                <li key={b.title} className={`${card} p-5`}>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-accent-text"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {BENEFIT_ICONS[i]}
                  </svg>
                  <h3 className="mt-4 font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted">{b.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Le 6 aree */}
        <section aria-labelledby="areas" className="border-t border-line">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
            <h2 id="areas" className="text-2xl font-bold sm:text-3xl">
              {t.areasTitle}
            </h2>
            <ol className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {AREAS.map((a, i) => (
                <li key={a.id} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line bg-surface font-semibold text-accent-text"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{a.title}</h3>
                    <p className="mt-1 text-sm text-muted">{a.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* A chi è rivolto + Come funziona */}
        <section className="border-t border-line bg-surface/40">
          <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2">
            <div aria-labelledby="audience">
              <h2 id="audience" className="text-2xl font-bold sm:text-3xl">
                {t.audienceTitle}
              </h2>
              <p className="mt-4 text-muted">{t.audienceText}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {t.sectors.map((s) => (
                  <li key={s} className="rounded-full border border-line bg-surface px-3 py-1 text-sm">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div aria-labelledby="how">
              <h2 id="how" className="text-2xl font-bold sm:text-3xl">
                {t.howTitle}
              </h2>
              <ol className="mt-6 space-y-4">
                {t.howSteps.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-ink"
                    >
                      {i + 1}
                    </span>
                    <p className="pt-0.5">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* CTA finale */}
        <section className="border-t border-line">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-14 text-center sm:px-6">
            <p className="text-2xl font-bold sm:text-3xl">{t.titleQuestion}</p>
            <ScrollToStartButton className={`${btnPrimary} text-lg`}>
              {t.cta}
              <span aria-hidden="true">→</span>
            </ScrollToStartButton>
            <p className="text-sm text-muted">{t.duration}</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/**
 * Visuel du hero. Desktop : moitié gauche de la section, de bord à bord, avec
 * un dégradé vers le crème du fond côté texte. Mobile : bandeau en haut,
 * fondu vers le bas. Image retournée : le technicien et le casque passent à
 * gauche, la raffinerie floue côté dégradé.
 */
function HeroImage() {
  return (
    <div className="relative h-64 sm:h-80 md:absolute md:inset-y-0 md:left-0 md:h-auto md:w-1/2">
      <Image
        src={heroImage}
        alt={t.heroImageAlt}
        priority
        fill
        placeholder="blur"
        sizes="(min-width: 768px) 50vw, 100vw"
        className="-scale-x-100 object-cover object-[70%_center]"
      />
      {/* Fondu vers le texte : à droite en desktop, en bas en mobile */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-bg md:bg-gradient-to-r md:from-transparent md:from-60% md:via-bg/50 md:via-85% md:to-bg"
      />
    </div>
  );
}
