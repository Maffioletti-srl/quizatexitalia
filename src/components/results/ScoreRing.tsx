import type { LevelId } from "@/lib/scoring";

const CIRC = 2 * Math.PI * 42;

/** Anneau de score : purement visuel, la valeur est aussi écrite en texte. */
export function ScoreRing({ score, level }: { score: number; level: LevelId }) {
  return (
    <svg viewBox="0 0 100 100" className="h-36 w-36 -rotate-90 sm:h-44 sm:w-44" aria-hidden="true">
      <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-surface-2)" strokeWidth="9" />
      <circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke={`var(--color-level-${level})`}
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={`${(Math.max(score, 1) / 100) * CIRC} ${CIRC}`}
      />
    </svg>
  );
}
