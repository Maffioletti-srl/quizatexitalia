"use client";

import { btnPrimary } from "@/components/ui";
import { useMessages } from "@/i18n/client";

export default function ResultError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const m = useMessages();
  return (
    <main id="main" className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-start px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold">{m.resultError.title}</h1>
      <p className="mt-3 text-muted">{m.resultError.text}</p>
      <button type="button" onClick={() => retry()} className={`${btnPrimary} mt-8`}>
        {m.resultError.retry}
      </button>
    </main>
  );
}
