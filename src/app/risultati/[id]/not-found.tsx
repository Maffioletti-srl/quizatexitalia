import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { btnPrimary } from "@/components/ui";
import { m } from "@/messages";

export default function ResultNotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-start px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold">{m.notFound.title}</h1>
        <p className="mt-3 text-muted">{m.notFound.text}</p>
        <Link href="/" className={`${btnPrimary} mt-8`}>
          {m.notFound.cta}
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
