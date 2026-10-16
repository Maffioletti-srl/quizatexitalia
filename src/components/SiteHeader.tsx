import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { LanguageLinks, LanguageSwitcher } from "@/components/LanguageSwitcher";
import { localePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { getMessages } from "@/messages";

export async function SiteHeader() {
  const locale = await getLocale();
  const m = getMessages(locale);
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={localePath(locale, "/")} aria-label={m.common.brand}>
          <Image src="/logoatexitalia.png" alt={m.common.logoAlt} width={150} height={50} preload />
        </Link>
        {/* Sur les pages dynamiques, l'URL n'est connue qu'à la requête : repli vers l'accueil de chaque langue */}
        <Suspense fallback={<LanguageLinks path="/" />}>
          <LanguageSwitcher />
        </Suspense>
      </div>
    </header>
  );
}
