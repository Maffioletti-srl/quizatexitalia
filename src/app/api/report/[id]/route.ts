import { readFile } from "node:fs/promises";
import path from "node:path";
import { createElement, type ReactElement } from "react";
import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer";
import { contactEmail, site } from "@/config/site";
import { DEFAULT_LOCALE, hasLocale, localePath } from "@/i18n/config";
import { isUuid } from "@/lib/results";
import { getPublicResult } from "@/lib/server/results";
import { getMessages } from "@/messages";
import { ReportDocument } from "@/pdf/ReportDocument";

/**
 * GET /api/report/[id]?lang=en — le rapport PDF d'un résultat, dans la
 * langue demandée (italien par défaut).
 * Même règle que la page : l'UUID non devinable suffit, et le document ne
 * contient que des scores (aucune donnée personnelle).
 * Les images de public/ sont incluses dans le bundle via
 * `outputFileTracingIncludes` (next.config.ts).
 */

let images: Promise<{ logo: Buffer; banner: Buffer }> | null = null;
function loadImages() {
  const dir = path.join(process.cwd(), "public");
  images ??= Promise.all([
    readFile(path.join(dir, "logoatexitalia.png")),
    readFile(path.join(dir, "header-3-curva.jpg")),
  ]).then(([logo, banner]) => ({ logo, banner }));
  return images;
}

export async function GET(req: Request, ctx: RouteContext<"/api/report/[id]">) {
  const { id } = await ctx.params;
  const lang = new URL(req.url).searchParams.get("lang");
  const locale = hasLocale(lang) ? lang : DEFAULT_LOCALE;
  const m = getMessages(locale);
  if (!isUuid(id)) return new Response("Not found", { status: 404 });

  let result;
  try {
    result = await getPublicResult(id);
  } catch (err) {
    console.error("[report] lecture du résultat", err);
    return new Response(m.report.tempError, { status: 503 });
  }
  if (!result) return new Response("Not found", { status: 404 });

  try {
    const doc = createElement(ReportDocument, {
      locale,
      result,
      resultUrl: `${site.url}${localePath(locale, `/risultati/${result.id}`)}`,
      contactEmail: contactEmail(),
      siteUrl: site.mainSiteUrl,
      images: await loadImages(),
    }) as unknown as ReactElement<DocumentProps>;
    const pdf = await renderToBuffer(doc);

    return new Response(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${m.pdf.fileName}"`,
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch (err) {
    console.error("[report] génération du PDF", err);
    return new Response(m.report.renderError, { status: 500 });
  }
}
