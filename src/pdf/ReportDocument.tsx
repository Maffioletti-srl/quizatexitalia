/**
 * Rapport PDF de la scorecard (@react-pdf/renderer, rendu côté serveur).
 * Ne contient que des scores et des recommandations : aucune donnée personnelle.
 *
 * Police : Helvetica intégrée (pas de fichier à charger). Elle couvre le
 * Latin-1 (accents italiens, « », —) mais pas des symboles comme « → » :
 * à éviter dans les textes du rapport.
 */
import { Document, Image, Line, Page, Polygon, StyleSheet, Svg, Text, View } from "@react-pdf/renderer";
import { getAreas } from "@/config/content";
import type { Area } from "@/config/questions";
import { INTL_LOCALES, type Locale } from "@/i18n/config";
import type { PublicResult } from "@/lib/results";
import type { LevelId } from "@/lib/scoring";
import { getMessages, type Messages } from "@/messages";

const C = {
  ink: "#16181C",
  muted: "#5B616B",
  line: "#E2E4E8",
  soft: "#F6F3EE", // crème de la bannière
  accent: "#F49934", // orange du logo (barres, radar)
  accentText: "#A35400", // orange foncé pour le texte (lisible à l'impression)
  accentSoft: "#FDF1E3",
};

const LEVEL_COLOR: Record<LevelId, string> = {
  critico: "#C81E1E",
  da_migliorare: "#B7791F",
  buono: "#4D7C0F",
  eccellente: "#15803D",
};

const s = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 56,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: C.ink,
  },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
  meta: { fontSize: 8.5, color: C.muted, textAlign: "right", lineHeight: 1.4 },
  title: { fontFamily: "Helvetica-Bold", fontSize: 22 },
  subtitle: { fontSize: 12, color: C.muted, marginTop: 2, marginBottom: 18 },
  h2: { fontFamily: "Helvetica-Bold", fontSize: 13, marginBottom: 10 },
  box: { borderWidth: 1, borderColor: C.line, borderRadius: 6, padding: 14 },
  row: { flexDirection: "row" },
  label: { fontSize: 8, color: C.muted, textTransform: "uppercase", letterSpacing: 0.8 },
  bigScore: { fontFamily: "Helvetica-Bold", fontSize: 44, marginTop: 4 },
  level: { fontFamily: "Helvetica-Bold", fontSize: 15, marginTop: 2 },
  body: { fontSize: 10, lineHeight: 1.45, color: C.ink },
  small: { fontSize: 8.5, lineHeight: 1.4, color: C.muted },
  barTrack: { height: 6, backgroundColor: C.soft, borderRadius: 3, marginTop: 3 },
  disclaimer: {
    marginTop: 16,
    padding: 10,
    backgroundColor: "#FFF8E6",
    borderLeftWidth: 3,
    borderLeftColor: "#B7791F",
    borderRadius: 3,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: C.muted,
    borderTopWidth: 1,
    borderTopColor: C.line,
    paddingTop: 6,
  },
});


export interface ReportProps {
  locale: Locale;
  result: PublicResult;
  resultUrl: string;
  contactEmail: string;
  siteUrl: string;
  /** Images lues par la route (public/) : logo officiel et bannière. */
  images: { logo: Buffer; banner: Buffer };
}

export function ReportDocument({ locale, result, resultUrl, contactEmail, siteUrl, images }: ReportProps) {
  const m = getMessages(locale);
  const t = m.pdf;
  const areas = getAreas(locale);
  const level = m.levels[result.level];
  const priorities = result.weakest.map((id) => areas.find((a) => a.id === id)).filter((a): a is Area => !!a);

  return (
    <Document title={t.docTitle} author="Atex Italia" subject={t.subtitle} language={locale}>
      {/* ── Page 1 : synthèse ─────────────────────────────────────────── */}
      <Page size="A4" style={s.page}>
        {/* Bannière Atex Italia (1536×338) sur toute la largeur utile */}
        {/* eslint-disable-next-line jsx-a11y/alt-text -- Image de react-pdf : pas d'attribut alt */}
        <Image src={images.banner} style={{ width: "100%", borderRadius: 4, marginBottom: 14 }} />
        <View style={[s.row, { justifyContent: "space-between", alignItems: "flex-end" }]}>
          <View>
            <Text style={s.title}>{t.title}</Text>
            <Text style={s.subtitle}>{t.subtitle}</Text>
          </View>
          <Meta result={result} m={m} locale={locale} />
        </View>

        <View style={[s.row, { gap: 14 }]}>
          <View style={[s.box, { flex: 1 }]}>
            <Text style={s.label}>{t.scoreLabel}</Text>
            <Text style={s.bigScore}>{result.total}%</Text>
            <Text style={[s.level, { color: LEVEL_COLOR[result.level] }]}>{level.label}</Text>
            <Text style={[s.body, { marginTop: 8, color: C.muted }]}>{level.text}</Text>
          </View>
          <View style={[s.box, { flex: 1.15, alignItems: "center" }]}>
            <Text style={[s.label, { alignSelf: "flex-start" }]}>{t.radarTitle}</Text>
            <Radar scores={areas.map((a) => result.areas[a.id])} labels={areas.map((a) => a.shortTitle)} />
          </View>
        </View>

        <View style={[s.box, { marginTop: 14 }]}>
          <Text style={[s.label, { marginBottom: 8 }]}>{t.areasTitle}</Text>
          {areas.map((a) => {
            const v = result.areas[a.id];
            return (
              <View key={a.id} style={{ marginBottom: 7 }} wrap={false}>
                <View style={[s.row, { justifyContent: "space-between" }]}>
                  <Text style={s.body}>{a.title}</Text>
                  <Text style={[s.body, { fontFamily: "Helvetica-Bold" }]}>{v}%</Text>
                </View>
                <View style={s.barTrack}>
                  <View
                    style={{ height: 6, borderRadius: 3, width: `${Math.max(v, 2)}%`, backgroundColor: C.accent }}
                  />
                </View>
              </View>
            );
          })}
        </View>

        <View style={s.disclaimer}>
          <Text style={[s.small, { color: C.ink }]}>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{t.disclaimerTitle}: </Text>
            {m.results.disclaimer}
          </Text>
        </View>

        <Footer m={m} />
      </Page>

      {/* ── Page 2 : priorités et prochaines étapes ───────────────────── */}
      <Page size="A4" style={s.page}>
        <Header result={result} logo={images.logo} m={m} locale={locale} />
        <Text style={s.h2}>{t.prioritiesTitle}</Text>

        {priorities.map((a, i) => (
          <View key={a.id} style={[s.box, { marginBottom: 8, padding: 12 }]} wrap={false}>
            <View style={[s.row, { justifyContent: "space-between", alignItems: "baseline" }]}>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 12 }}>
                <Text style={{ color: C.accentText }}>{i + 1}. </Text>
                {a.title}
              </Text>
              <Text style={[s.body, { fontFamily: "Helvetica-Bold", color: C.muted }]}>{result.areas[a.id]}%</Text>
            </View>
            <Text style={[s.label, { marginTop: 6 }]}>{t.recommendation}</Text>
            <Text style={[s.body, { marginTop: 2, lineHeight: 1.35 }]}>{a.recommendation}</Text>
            <View style={{ marginTop: 7, padding: 8, backgroundColor: C.soft, borderRadius: 4 }}>
              <Text style={s.label}>{t.service}</Text>
              <Text style={[s.body, { fontFamily: "Helvetica-Bold", marginTop: 3 }]}>{a.service.name}</Text>
              <Text style={[s.small, { marginTop: 2 }]}>{a.service.description}</Text>
              <Text style={[s.small, { marginTop: 3, color: C.accentText }]}>{a.service.url}</Text>
            </View>
          </View>
        ))}

        <View style={[s.box, { marginTop: 2, padding: 12, backgroundColor: C.accentSoft, borderColor: C.accentSoft }]} wrap={false}>
          <Text style={[s.h2, { marginBottom: 6 }]}>{t.nextTitle}</Text>
          <Text style={s.body}>{t.nextText}</Text>
          <Text style={[s.body, { marginTop: 8 }]}>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{t.contact}: </Text>
            {contactEmail} · {siteUrl.replace(/^https?:\/\//, "")}
          </Text>
          <Text style={[s.small, { marginTop: 6 }]}>{resultUrl}</Text>
        </View>

        <Footer m={m} />
      </Page>
    </Document>
  );
}

function Header({ result, logo, m, locale }: { result: PublicResult; logo: Buffer; m: Messages; locale: Locale }) {
  return (
    <View style={s.header}>
      {/* Logo officiel : 2500×834 → 3:1 */}
      {/* eslint-disable-next-line jsx-a11y/alt-text -- Image de react-pdf : pas d'attribut alt */}
      <Image src={logo} style={{ width: 108, height: 36 }} />
      <Meta result={result} m={m} locale={locale} />
    </View>
  );
}

function Meta({ result, m, locale }: { result: PublicResult; m: Messages; locale: Locale }) {
  const t = m.pdf;
  const dateFmt = new Intl.DateTimeFormat(INTL_LOCALES[locale], { dateStyle: "long", timeZone: "Europe/Rome" });
  return (
    <View style={{ marginBottom: 18 }}>
      <Text style={s.meta}>
        {t.dateLabel} {dateFmt.format(new Date(result.createdAt))}
      </Text>
      <Text style={s.meta}>
        {t.idLabel} {result.id.slice(0, 8).toUpperCase()}
      </Text>
    </View>
  );
}

function Footer({ m }: { m: Messages }) {
  return (
    <View style={s.footer} fixed>
      <Text>{m.common.footer}</Text>
      <Text render={({ pageNumber, totalPages }) => m.pdf.page(pageNumber, totalPages)} />
    </View>
  );
}

/** Radar hexagonal dessiné en SVG ; libellés positionnés autour. */
function Radar({ scores, labels }: { scores: number[]; labels: string[] }) {
  const W = 240;
  const H = 190;
  const cx = W / 2;
  const cy = H / 2;
  const R = 62;
  const n = scores.length;
  const pt = (i: number, r: number) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
  };
  const poly = (r: (i: number) => number) =>
    Array.from({ length: n }, (_, i) =>
      pt(i, r(i))
        .map((v) => v.toFixed(1))
        .join(","),
    ).join(" ");

  return (
    <View style={{ width: W, height: H, position: "relative", marginTop: 4 }}>
      <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {[0.25, 0.5, 0.75, 1].map((k) => (
          <Polygon key={k} points={poly(() => R * k)} stroke={C.line} strokeWidth={0.8} fill="none" />
        ))}
        {Array.from({ length: n }, (_, i) => {
          const [x, y] = pt(i, R);
          return <Line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={C.line} strokeWidth={0.8} />;
        })}
        <Polygon
          points={poly((i) => (R * Math.max(scores[i], 2)) / 100)}
          stroke={C.accent}
          strokeWidth={1.5}
          fill={C.accent}
          fillOpacity={0.18}
        />
      </Svg>
      {labels.map((label, i) => {
        const [x, y] = pt(i, R + 14);
        const left = x < cx - 5;
        const right = x > cx + 5;
        return (
          <Text
            key={label}
            style={{
              position: "absolute",
              top: y - 5,
              left: right ? x : left ? x - 80 : x - 40,
              width: 80,
              fontSize: 7.5,
              color: C.muted,
              textAlign: right ? "left" : left ? "right" : "center",
            }}
          >
            {label} {scores[i]}%
          </Text>
        );
      })}
    </View>
  );
}
