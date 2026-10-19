/**
 * Configuration de la scorecard « Scorecard sicurezza Ex ».
 *
 * Fichier destiné à la relecture par l'équipe technique Atex Italia :
 * tout le contenu métier (aree, domande, risposte, raccomandazioni, servizi)
 * est ici. Toute modification du contenu ou des poids doit s'accompagner
 * d'une incrémentation de QUIZ_VERSION (enregistrée avec chaque lead).
 *
 * Poids : 0 = situation à risque … 3 = bonne pratique.
 * « Non so » vaut 0 : ne pas savoir est déjà un signal.
 */

export const QUIZ_VERSION = "1.0";

export type Weight = 0 | 1 | 2 | 3;

export type AreaId =
  | "classificazione"
  | "apparecchiature"
  | "installazione"
  | "verifiche"
  | "manutenzione"
  | "competenza";

export interface AnswerOption {
  /** Identifiant stable, enregistré dans `risposte` : ne pas renommer après la mise en ligne. */
  id: string;
  label: string;
  weight: Weight;
  /** Réponse « Non so » (affichée à part dans l'interface). */
  unknown?: boolean;
}

export interface Question {
  /** Identifiant stable (q1…q12). */
  id: string;
  areaId: AreaId;
  text: string;
  /** Précision facultative affichée sous la question. */
  hint?: string;
  options: AnswerOption[];
}

export interface AtexService {
  name: string;
  description: string;
  /** Placeholder : à remplacer par la page définitive du site atexitalia.it */
  url: string;
}

export interface Area {
  id: AreaId;
  title: string;
  /** Libellé court pour le radar et la barre de progression. */
  shortTitle: string;
  description: string;
  /** Recommandation affichée quand l'area fait partie des plus faibles. */
  recommendation: string;
  service: AtexService;
}

const NON_SO = (questionId: string): AnswerOption => ({
  id: `${questionId}-nonso`,
  label: "Non so",
  weight: 0,
  unknown: true,
});

export const AREAS: readonly Area[] = [
  {
    id: "classificazione",
    title: "Classificazione delle aree e documentazione",
    shortTitle: "Classificazione",
    description:
      "Classificazione delle zone pericolose per gas e polveri e Documento sulla protezione contro le esplosioni (DPCE), mantenuti aggiornati.",
    recommendation:
      "Verificate che la classificazione delle aree copra tutte le sostanze infiammabili (gas, vapori e polveri) secondo EN/IEC 60079-10-1 e 60079-10-2, e che il DPCE venga rivisto a ogni modifica di impianto, processo o sostanza. È la base da cui dipendono la scelta delle apparecchiature e il piano di ispezione.",
    service: {
      name: "Supporto tecnico alla classificazione e al DPCE",
      description:
        "Affiancamento nella revisione della classificazione delle aree e nell'aggiornamento del documento sulla protezione contro le esplosioni.",
      url: "https://www.atexitalia.it/consulenza/classificazione-zone-atex/",
    },
  },
  {
    id: "apparecchiature",
    title: "Conformità delle apparecchiature",
    shortTitle: "Apparecchiature",
    description:
      "Marcatura ATEX/IECEx, categoria/EPL, gruppo gas o polveri e classe di temperatura adeguati alla zona di installazione.",
    recommendation:
      "Costruite un registro delle apparecchiature Ex (Ex register) che metta a confronto, per ogni elemento, la marcatura con i requisiti della zona: categoria/EPL, gruppo IIA/IIB/IIC o IIIA/IIIB/IIIC, classe di temperatura e campo di temperatura ambiente. Sostituite in priorità le apparecchiature non certificate o non idonee.",
    service: {
      name: "Prodotti certificati Ex",
      description:
        "Ampia gamma di apparecchiature e componenti certificati ATEX/IECEx, con supporto nella scelta in base a zona, gruppo e classe di temperatura.",
      url: "https://www.atexitalia.it/consulenza/",
    },
  },
  {
    id: "installazione",
    title: "Installazione",
    shortTitle: "Installazione",
    description:
      "Progettazione e realizzazione degli impianti secondo EN/IEC 60079-14: modi di protezione, cavi e pressacavi, documentazione d'impianto.",
    recommendation:
      "Riferite progettazione e installazione alla EN/IEC 60079-14: scelta motivata dei modi di protezione, sistemi di ingresso cavi certificati, verifica dei sistemi a sicurezza intrinseca. Raccogliete in un fascicolo unico la documentazione d'impianto (classificazione, certificati, istruzioni, schemi) e rendetela accessibile a chi interviene.",
    service: {
      name: "Soluzioni Custom Ex",
      description:
        "Quadri, cassette e sistemi progettati su misura e certificati per le zone pericolose, con documentazione completa per il fascicolo d'impianto.",
      url: "https://www.atexitalia.it/consulenza/progettazione-prodotti-ex/",
    },
  },
  {
    id: "verifiche",
    title: "Verifiche e ispezioni",
    shortTitle: "Verifiche",
    description:
      "Ispezioni iniziali e periodiche secondo EN/IEC 60079-17, verifiche obbligatorie e registri delle non conformità.",
    recommendation:
      "Definite un piano di ispezione secondo EN/IEC 60079-17 (ispezione iniziale, periodiche a vista, ravvicinate e dettagliate) con intervalli motivati, rispettate le scadenze delle verifiche periodiche obbligatorie (DPR 462/01) e tracciate ogni non conformità fino alla sua chiusura.",
    service: {
      name: "Verifiche e ispezioni Ex",
      description:
        "Ispezioni degli impianti in atmosfera esplosiva secondo EN/IEC 60079-17, con rapporto dettagliato e piano di azioni correttive.",
      url: "https://www.atexitalia.it/ispezioni/",
    },
  },
  {
    id: "manutenzione",
    title: "Manutenzione, riparazione e gestione delle modifiche",
    shortTitle: "Manutenzione",
    description:
      "Riparazione e revisione secondo EN/IEC 60079-19, ricambi idonei e gestione del cambiamento nelle zone classificate.",
    recommendation:
      "Affidate riparazioni e revisioni delle apparecchiature Ex a officine qualificate secondo EN/IEC 60079-19, usate solo ricambi previsti dal costruttore e introducete una procedura di gestione delle modifiche (MOC) che valuti l'impatto sul rischio esplosione prima di ogni intervento.",
    service: {
      name: "Assistenza, ricambi e riparazioni Ex",
      description:
        "Ricambi originali, assistenza tecnica e interventi sulle apparecchiature Ex nel rispetto della certificazione.",
      url: "https://www.atexitalia.it/contatti/",
    },
  },
  {
    id: "competenza",
    title: "Competenza del personale",
    shortTitle: "Competenza",
    description:
      "Formazione Ex, qualifiche e aggiornamento del personale interno e delle imprese esterne.",
    recommendation:
      "Mappate le figure che progettano, installano, ispezionano o manutengono gli impianti Ex e prevedete per ciascuna una formazione specifica con aggiornamento periodico. Verificate le competenze Ex delle imprese esterne prima di affidare i lavori.",
    service: {
      name: "Atex Italia Academy",
      description:
        "Corsi di formazione sulle atmosfere esplosive per tecnici, manutentori, progettisti e responsabili HSE.",
      url: "https://www.atexitalia.it/formazione/",
    },
  },
];

export const QUESTIONS: readonly Question[] = [
  // ── 1. Classificazione delle aree e documentazione ─────────────────────
  {
    id: "q1",
    areaId: "classificazione",
    text: "Le aree con pericolo di esplosione del vostro impianto sono classificate in zone (0/1/2 per gas, 20/21/22 per polveri)?",
    hint: "Riferimenti: EN/IEC 60079-10-1 (gas) e EN/IEC 60079-10-2 (polveri).",
    options: [
      { id: "q1-a", label: "Sì, per tutte le aree e tutte le sostanze, con planimetrie aggiornate", weight: 3 },
      { id: "q1-b", label: "Sì, ma alcune aree o sostanze (ad esempio le polveri) non sono coperte", weight: 2 },
      { id: "q1-c", label: "Esiste una classificazione, ma è datata o non fa riferimento alle norme attuali", weight: 1 },
      { id: "q1-d", label: "No, le aree non sono state classificate formalmente", weight: 0 },
      NON_SO("q1"),
    ],
  },
  {
    id: "q2",
    areaId: "classificazione",
    text: "Il Documento sulla protezione contro le esplosioni (DPCE) è aggiornato?",
    hint: "Previsto dall'art. 294 del D.Lgs. 81/08, parte integrante del DVR.",
    options: [
      { id: "q2-a", label: "Sì, e viene rivisto a ogni modifica di impianto, processo o sostanze", weight: 3 },
      { id: "q2-b", label: "È stato aggiornato di recente, ma non sistematicamente dopo le modifiche", weight: 2 },
      { id: "q2-c", label: "Esiste, ma non viene rivisto da diversi anni", weight: 1 },
      { id: "q2-d", label: "Non abbiamo un DPCE", weight: 0 },
      NON_SO("q2"),
    ],
  },

  // ── 2. Conformità delle apparecchiature ────────────────────────────────
  {
    id: "q3",
    areaId: "apparecchiature",
    text: "Le apparecchiature installate nelle zone classificate sono adeguate alla zona (marcatura ATEX/IECEx, categoria/EPL, gruppo, classe di temperatura)?",
    options: [
      { id: "q3-a", label: "Sì, verificato per ogni apparecchiatura e tracciato in un registro dedicato", weight: 3 },
      { id: "q3-b", label: "In generale sì, ma la verifica non è stata fatta su tutte le apparecchiature", weight: 2 },
      { id: "q3-c", label: "Solo per le apparecchiature recenti; sulle più vecchie non abbiamo certezze", weight: 1 },
      { id: "q3-d", label: "Sappiamo che ci sono apparecchiature non certificate o non idonee alla zona", weight: 0 },
      NON_SO("q3"),
    ],
  },
  {
    id: "q4",
    areaId: "apparecchiature",
    text: "Come scegliete nuove apparecchiature e ricambi destinati alle zone Ex?",
    options: [
      { id: "q4-a", label: "Con una specifica tecnica basata sulla classificazione (zona, gruppo, classe T, temperatura ambiente) e controllo dei certificati", weight: 3 },
      { id: "q4-b", label: "Ci affidiamo al fornitore e controlliamo la marcatura alla consegna", weight: 2 },
      { id: "q4-c", label: "Ci affidiamo al fornitore, senza controlli specifici", weight: 1 },
      { id: "q4-d", label: "Contano soprattutto prezzo e disponibilità; la conformità Ex non è sempre verificata", weight: 0 },
    ],
  },

  // ── 3. Installazione ───────────────────────────────────────────────────
  {
    id: "q5",
    areaId: "installazione",
    text: "Gli impianti nelle zone Ex sono progettati e realizzati secondo la EN/IEC 60079-14?",
    hint: "Scelta dei modi di protezione, cavi e pressacavi, sistemi a sicurezza intrinseca, verifica iniziale.",
    options: [
      { id: "q5-a", label: "Sì, con progetto, installatori qualificati Ex e verifica iniziale documentata", weight: 3 },
      { id: "q5-b", label: "Sì, ma la qualifica Ex degli installatori (anche esterni) non è sempre verificata", weight: 2 },
      { id: "q5-c", label: "Seguiamo le regole impiantistiche generali, con un'attenzione Ex solo parziale", weight: 1 },
      { id: "q5-d", label: "Non c'è un riferimento specifico alla EN/IEC 60079-14", weight: 0 },
      NON_SO("q5"),
    ],
  },
  {
    id: "q6",
    areaId: "installazione",
    text: "È disponibile la documentazione d'impianto per le zone Ex (classificazione, certificati, istruzioni, schemi, calcoli dei circuiti a sicurezza intrinseca)?",
    options: [
      { id: "q6-a", label: "Sì, in un fascicolo completo e aggiornato, consultabile da chi interviene", weight: 3 },
      { id: "q6-b", label: "La maggior parte esiste, ma è dispersa o non sempre aggiornata", weight: 2 },
      { id: "q6-c", label: "Solo in parte (ad esempio i certificati di alcune apparecchiature)", weight: 1 },
      { id: "q6-d", label: "No, la documentazione Ex d'impianto non è disponibile", weight: 0 },
      NON_SO("q6"),
    ],
  },

  // ── 4. Verifiche e ispezioni ───────────────────────────────────────────
  {
    id: "q7",
    areaId: "verifiche",
    text: "Effettuate ispezioni specifiche degli impianti Ex secondo la EN/IEC 60079-17?",
    hint: "Ispezione iniziale e periodiche, a vista, ravvicinate o dettagliate.",
    options: [
      { id: "q7-a", label: "Sì, con un piano di ispezione definito, intervalli motivati e gradi di ispezione adeguati", weight: 3 },
      { id: "q7-b", label: "Sì, periodicamente, ma senza un piano formalizzato secondo la norma", weight: 2 },
      { id: "q7-c", label: "Solo occasionalmente o in seguito a guasti", weight: 1 },
      { id: "q7-d", label: "No, non effettuiamo ispezioni specifiche Ex", weight: 0 },
      NON_SO("q7"),
    ],
  },
  {
    id: "q8",
    areaId: "verifiche",
    text: "Le verifiche periodiche obbligatorie (DPR 462/01) sono in regola e le non conformità rilevate vengono gestite?",
    options: [
      { id: "q8-a", label: "Sì: verifiche in regola, registri aggiornati e non conformità chiuse con azioni tracciate", weight: 3 },
      { id: "q8-b", label: "Le verifiche sono in regola, ma la chiusura delle non conformità non è sempre tracciata", weight: 2 },
      { id: "q8-c", label: "Le verifiche sono in ritardo o i registri sono incompleti", weight: 1 },
      { id: "q8-d", label: "Non effettuiamo le verifiche periodiche obbligatorie", weight: 0 },
      NON_SO("q8"),
    ],
  },

  // ── 5. Manutenzione, riparazione e gestione delle modifiche ────────────
  {
    id: "q9",
    areaId: "manutenzione",
    text: "Riparazioni e revisioni delle apparecchiature Ex sono eseguite secondo la EN/IEC 60079-19?",
    options: [
      { id: "q9-a", label: "Sì, dal costruttore o da officine qualificate, con ricambi originali e rapporto di riparazione", weight: 3 },
      { id: "q9-b", label: "Generalmente sì, ma a volte interveniamo internamente senza una procedura specifica", weight: 2 },
      { id: "q9-c", label: "La manutenzione interna le ripara come apparecchiature standard", weight: 1 },
      { id: "q9-d", label: "Non facciamo distinzione tra apparecchiature Ex e non Ex in manutenzione", weight: 0 },
      NON_SO("q9"),
    ],
  },
  {
    id: "q10",
    areaId: "manutenzione",
    text: "Come gestite le modifiche nelle zone classificate (nuove apparecchiature, sostituzioni, cambi di processo o di sostanze)?",
    options: [
      { id: "q10-a", label: "Con una procedura di gestione del cambiamento che valuta l'impatto Ex e aggiorna classificazione e DPCE", weight: 3 },
      { id: "q10-b", label: "Valutiamo le modifiche importanti, non quelle minori (sostituzioni, piccoli interventi)", weight: 2 },
      { id: "q10-c", label: "Caso per caso, senza una procedura formalizzata", weight: 1 },
      { id: "q10-d", label: "Le modifiche non vengono valutate dal punto di vista del rischio esplosione", weight: 0 },
      NON_SO("q10"),
    ],
  },

  // ── 6. Competenza del personale ────────────────────────────────────────
  {
    id: "q11",
    areaId: "competenza",
    text: "Il personale che progetta, installa, ispeziona o manutiene gli impianti Ex ha ricevuto una formazione specifica?",
    options: [
      { id: "q11-a", label: "Sì, formazione Ex strutturata, con aggiornamento periodico e registro delle competenze", weight: 3 },
      { id: "q11-b", label: "Sì, ma non per tutte le figure coinvolte o senza aggiornamento periodico", weight: 2 },
      { id: "q11-c", label: "Solo formazione generale sulla sicurezza, con qualche cenno ATEX", weight: 1 },
      { id: "q11-d", label: "Nessuna formazione specifica Ex", weight: 0 },
    ],
  },
  {
    id: "q12",
    areaId: "competenza",
    text: "Le competenze Ex del personale interno e delle imprese esterne sono verificate e documentate?",
    hint: "Ad esempio certificati IECEx CoPC o qualifiche conformi alle EN/IEC 60079-14, -17 e -19.",
    options: [
      { id: "q12-a", label: "Sì, sia per il personale interno sia per le imprese esterne, prima dell'affidamento dei lavori", weight: 3 },
      { id: "q12-b", label: "Solo per il personale interno", weight: 2 },
      { id: "q12-c", label: "Ci basiamo sulle dichiarazioni delle imprese, senza verifiche", weight: 1 },
      { id: "q12-d", label: "Le competenze Ex non sono un criterio di selezione", weight: 0 },
      NON_SO("q12"),
    ],
  },
];

/** Poids maximal d'une réponse : sert au calcul du score par area. */
export const MAX_WEIGHT: Weight = 3;
