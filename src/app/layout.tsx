import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { site } from "@/config/site";
import { m } from "@/messages";
import "./globals.css";

// next/font/google télécharge la police au build et la sert depuis notre
// domaine : aucun appel aux serveurs Google depuis le navigateur (RGPD).
// Pour passer aux fichiers fournis : next/font/local avec src/fonts/*.woff2.
const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: m.meta.title,
  description: m.meta.description,
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: m.common.brand,
    title: m.meta.title,
    description: m.meta.description,
    url: "/",
  },
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#F6F3EE",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${beVietnam.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
