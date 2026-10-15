"use client";

import dynamic from "next/dynamic";

// Le questionnaire lit sessionStorage dès son initialisation :
// rendu uniquement côté client pour éviter tout écart d'hydratation.
const Quiz = dynamic(() => import("./Quiz"), {
  ssr: false,
  loading: () => <div className="mx-auto h-96 w-full max-w-2xl" aria-busy="true" />,
});

export function QuizLoader() {
  return <Quiz />;
}
