"use client";

import { useSyncExternalStore } from "react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";

export interface RadarPoint {
  area: string;
  score: number;
}

const QUERY = "(prefers-reduced-motion: reduce)";

function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(QUERY);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(QUERY).matches,
    () => true,
  );
}

/**
 * Radar des 6 aree. Décoratif pour les lecteurs d'écran : la liste
 * des scores par area affichée à côté en est l'équivalent textuel.
 */
export function AreaRadar({ data, label }: { data: RadarPoint[]; label: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <div role="img" aria-label={label} className="h-72 w-full sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="70%" margin={{ top: 8, right: 56, bottom: 8, left: 56 }}>
          <PolarGrid stroke="var(--color-line)" />
          <PolarAngleAxis dataKey="area" tick={{ fill: "var(--color-muted)", fontSize: 11 }} />
          <PolarRadiusAxis domain={[0, 100]} tickCount={5} tick={false} axisLine={false} />
          <Radar
            dataKey="score"
            stroke="var(--color-accent)"
            strokeWidth={2}
            fill="var(--color-accent)"
            fillOpacity={0.25}
            dot={{ r: 3, fill: "var(--color-accent)" }}
            isAnimationActive={!reducedMotion}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
