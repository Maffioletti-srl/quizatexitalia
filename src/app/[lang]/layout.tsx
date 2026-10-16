import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { site } from "@/config/site";
import { LocaleProvider } from "@/i18n/client";
import { INTL_LOCALES, LOCALES, localePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { getMessages } from "@/messages";
import "../globals.css";

// next/font/google télécharge la police au build et la sert depuis notre
// domaine : aucun appel aux serveurs Google depuis le navigateur (RGPD).
// Pour passer aux fichiers fournis : next/font/local avec src/fonts/*.woff2.
const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = getMessages(locale);
  return {
    metadataBase: new URL(site.url),
    title: m.meta.title,
    description: m.meta.description,
    openGraph: {
      type: "website",
      locale: INTL_LOCALES[locale].replace("-", "_"),
      siteName: m.common.brand,
      title: m.meta.title,
      description: m.meta.description,
      url: localePath(locale, "/"),
    },
    robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#F6F3EE",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${beVietnam.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
