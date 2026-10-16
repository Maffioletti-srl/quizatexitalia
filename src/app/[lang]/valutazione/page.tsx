import type { Metadata } from "next";
import { QuizLoader } from "@/components/quiz/QuizLoader";
import { SiteHeader } from "@/components/SiteHeader";
import { TrackingCapture } from "@/components/TrackingCapture";
import { getLocale } from "@/i18n/server";
import { getMessages } from "@/messages";

export async function generateMetadata(): Promise<Metadata> {
  return { title: getMessages(await getLocale()).meta.quizTitle };
}

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
