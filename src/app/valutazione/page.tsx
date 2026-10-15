import type { Metadata } from "next";
import { QuizLoader } from "@/components/quiz/QuizLoader";
import { SiteHeader } from "@/components/SiteHeader";
import { TrackingCapture } from "@/components/TrackingCapture";

export const metadata: Metadata = {
  title: "Valutazione — Scorecard sicurezza Ex",
};

export default function ValutazionePage() {
  return (
    <>
      <TrackingCapture />
      <SiteHeader />
      <main id="main" className="flex flex-1 flex-col">
        <QuizLoader />
      </main>
    </>
  );
}
