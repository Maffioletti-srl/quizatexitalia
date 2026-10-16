"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useMessages } from "@/i18n/client";

/** Temps d'affichage d'une paire de cartes. */
const HOLD_MS = 10_000;
/** Durée d'entrée / de sortie (doit correspondre à duration-700). */
const MOVE_MS = 700;

/** enter : nouvelle paire hors champ · shown : affichée · leave : en sortie. */
type Phase = "enter" | "shown" | "leave";

/**
 * Cartes présentées deux par deux : celle de gauche arrive depuis la gauche
 * (sous la photo du hero), celle de droite depuis la droite. La paire reste
 * 10 s puis repart, et la suivante arrive ; en boucle.
 * Pause au survol, au focus et via le bouton (WCAG 2.2.2) ; points pour
 * choisir une paire.
 */
export function HeroCarousel({ panels, className = "" }: { panels: ReactNode[]; className?: string }) {
  const pairs: ReactNode[][] = [];
  for (let i = 0; i < panels.length; i += 2) pairs.push(panels.slice(i, i + 2));

  const t = useMessages().landing;
  const [pair, setPair] = useState(0);
  const [phase, setPhase] = useState<Phase>("shown");
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const stopped = paused || hovered;

  useEffect(() => {
    if (phase === "enter") {
      // Double frame : le navigateur peint la paire hors champ avant la transition d'entrée
      let id = requestAnimationFrame(() => {
        id = requestAnimationFrame(() => setPhase("shown"));
      });
      return () => cancelAnimationFrame(id);
    }
    if (phase === "shown") {
      if (stopped) return;
      const id = window.setTimeout(() => setPhase("leave"), HOLD_MS);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => {
      setPair((p) => (p + 1) % pairs.length);
      setPhase("enter");
    }, MOVE_MS);
    return () => window.clearTimeout(id);
  }, [phase, stopped, pairs.length]);

  const goTo = (i: number) => {
    if (i === pair && phase === "shown") return;
    setPair(i);
    setPhase("enter");
  };

  const visible = phase === "shown";

  return (
    <section
      aria-label={t.carouselLabel}
      aria-roledescription="carousel"
      className={`relative ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {pairs[pair].map((panel, side) => (
          <div
            key={side}
            role="group"
            aria-roledescription="slide"
            className="transition-[transform,opacity] duration-700 ease-in-out"
            style={
              visible
                ? undefined
                : { transform: `translateX(${side === 0 ? "-120%" : "120%"})`, opacity: 0 }
            }
          >
            {panel}
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center gap-2">
        {pairs.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={t.carouselGoTo(i + 1, pairs.length)}
            aria-current={i === pair || undefined}
            className="flex h-6 items-center"
          >
            <span
              aria-hidden="true"
              className={`block h-1.5 rounded-full transition-all ${
                i === pair ? "w-6 bg-accent" : "w-1.5 bg-line hover:bg-muted"
              }`}
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? t.carouselPlay : t.carouselPause}
          title={paused ? t.carouselPlay : t.carouselPause}
          className="ml-1 flex h-6 w-6 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
            {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
          </svg>
        </button>
      </div>
    </section>
  );
}
