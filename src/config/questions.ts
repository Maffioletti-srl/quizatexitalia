/**
 * Configuration de la scorecard « Scorecard sicurezza Ex ».
 *
 * Fichier destiné à la relecture par l'équipe technique Atex Italia :
 * tout le contenu métier (aree, domande, risposte, raccomandazioni, servizi)
 * est ici. Toute modification du contenu ou des poids doit s'accompagner
 * d'une incrémentation de QUIZ_VERSION (enregistrée avec chaque lead).
 *
 * Banque de questions : chaque évaluation en tire QUESTIONS_PER_AREA au
 * hasard par area (voir drawQuestionIds dans lib/scoring.ts).
 *
 * Poids : 0 = situation à risque … 3 = bonne pratique.
 * « Non so » vaut 0 : ne pas savoir est déjà un signal.
 */

export const QUIZ_VERSION = "2.0";

/** Questions tirées par area pour chaque évaluation (12 au total). */
export const QUESTIONS_PER_AREA = 2;

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
  /** Identifiant stable (q1…q62). */
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
  {
    id: "q13",
    areaId: "classificazione",
    text: "Le polveri combustibili presenti (ad esempio farine, zucchero, legno, polveri metalliche o plastiche) sono state considerate nella valutazione del rischio esplosione?",
    hint: "Riferimento: EN/IEC 60079-10-2.",
    options: [
      { id: "q13-a", label: "Sì, con caratterizzazione delle polveri (energia minima di accensione, temperature di accensione in nube e in strato, Kst) e classificazione in zone 20/21/22", weight: 3 },
      { id: "q13-b", label: "Sì, ma senza dati di laboratorio sulle caratteristiche delle polveri", weight: 2 },
      { id: "q13-c", label: "Solo per le aree più evidenti (silos, filtri), non per depositi e strati", weight: 1 },
      { id: "q13-d", label: "No, il rischio legato alle polveri non è stato valutato", weight: 0 },
      NON_SO("q13"),
    ],
  },
  {
    id: "q14",
    areaId: "classificazione",
    text: "Per la classificazione disponete delle caratteristiche di sicurezza delle sostanze (punto di infiammabilità, limiti di esplosività, temperatura di accensione, gruppo)?",
    options: [
      { id: "q14-a", label: "Sì, da schede di sicurezza o banche dati riconosciute, raccolte in un elenco delle sostanze aggiornato", weight: 3 },
      { id: "q14-b", label: "Sì, ma non per tutte le sostanze o non sempre aggiornate", weight: 2 },
      { id: "q14-c", label: "Abbiamo le schede di sicurezza, ma i parametri utili alla classificazione non ne sono stati estratti", weight: 1 },
      { id: "q14-d", label: "No, queste informazioni non sono raccolte", weight: 0 },
      NON_SO("q14"),
    ],
  },
  {
    id: "q15",
    areaId: "classificazione",
    text: "Le sorgenti di emissione (flange, tenute, valvole, sfiati, punti di carico) sono state individuate e caratterizzate (grado di emissione, portata, ventilazione)?",
    hint: "Il metodo della EN/IEC 60079-10-1 parte dalle sorgenti di emissione per definire tipo ed estensione delle zone.",
    options: [
      { id: "q15-a", label: "Sì, con un elenco delle sorgenti e calcoli documentati per ciascuna", weight: 3 },
      { id: "q15-b", label: "Sì, ma l'estensione delle zone è stata stimata senza calcoli", weight: 2 },
      { id: "q15-c", label: "Le zone sono state definite a giudizio, senza un'analisi delle sorgenti", weight: 1 },
      { id: "q15-d", label: "No, non è stata fatta alcuna analisi delle sorgenti di emissione", weight: 0 },
      NON_SO("q15"),
    ],
  },
  {
    id: "q16",
    areaId: "classificazione",
    text: "Gli accessi alle aree con pericolo di esplosione sono segnalati sul posto?",
    hint: "Cartello triangolare «EX» previsto dal D.Lgs. 81/08 (allegato LI).",
    options: [
      { id: "q16-a", label: "Sì, a tutti gli accessi, con segnaletica coerente con le planimetrie di classificazione", weight: 3 },
      { id: "q16-b", label: "Sì, ma non a tutti gli accessi o non aggiornata dopo le modifiche", weight: 2 },
      { id: "q16-c", label: "Solo in alcune aree", weight: 1 },
      { id: "q16-d", label: "No, le aree non sono segnalate", weight: 0 },
    ],
  },
  {
    id: "q17",
    areaId: "classificazione",
    text: "La ventilazione (naturale o artificiale) su cui si basa la classificazione è documentata e tenuta sotto controllo?",
    options: [
      { id: "q17-a", label: "Sì: grado e disponibilità della ventilazione sono documentati, con allarmi o interblocchi in caso di guasto della ventilazione artificiale", weight: 3 },
      { id: "q17-b", label: "È documentata nella classificazione, ma non viene controllata nel tempo", weight: 2 },
      { id: "q17-c", label: "La ventilazione è stata considerata solo in modo qualitativo", weight: 1 },
      { id: "q17-d", label: "La ventilazione non è stata considerata nella classificazione", weight: 0 },
      NON_SO("q17"),
    ],
  },
  {
    id: "q18",
    areaId: "classificazione",
    text: "Il DPCE descrive, per ogni area, le misure di prevenzione e protezione adottate (inertizzazione, rilevazione gas, controllo delle sorgenti di accensione, sfoghi o soppressione dell'esplosione)?",
    options: [
      { id: "q18-a", label: "Sì, area per area, con i responsabili e le modalità di verifica di ciascuna misura", weight: 3 },
      { id: "q18-b", label: "Sì, ma in modo generico, senza collegamento alle singole aree", weight: 2 },
      { id: "q18-c", label: "Solo in parte", weight: 1 },
      { id: "q18-d", label: "No, le misure non sono descritte", weight: 0 },
      NON_SO("q18"),
    ],
  },
  {
    id: "q19",
    areaId: "classificazione",
    text: "Il rischio di accensione dovuto all'elettricità statica (travasi, fusti, nastri, tubazioni in plastica, indumenti) è stato valutato?",
    hint: "Riferimento: IEC/TS 60079-32-1.",
    options: [
      { id: "q19-a", label: "Sì, con misure documentate (collegamenti equipotenziali e a terra verificati, materiali dissipativi, calzature e indumenti antistatici)", weight: 3 },
      { id: "q19-b", label: "Sì, ma solo per alcune operazioni (ad esempio i travasi di solventi)", weight: 2 },
      { id: "q19-c", label: "Ci limitiamo a collegare a terra le principali parti metalliche", weight: 1 },
      { id: "q19-d", label: "No, l'elettricità statica non è stata considerata", weight: 0 },
      NON_SO("q19"),
    ],
  },
  {
    id: "q20",
    areaId: "classificazione",
    text: "Chi ha redatto la classificazione delle aree e il DPCE?",
    options: [
      { id: "q20-a", label: "Un gruppo di lavoro con competenze Ex documentate, con il coinvolgimento di produzione, manutenzione e HSE", weight: 3 },
      { id: "q20-b", label: "Un consulente esterno qualificato, con un coinvolgimento limitato del personale interno", weight: 2 },
      { id: "q20-c", label: "Una persona interna senza formazione Ex specifica", weight: 1 },
      { id: "q20-d", label: "Sono stati ripresi da un altro sito o da un modello, senza adattarli all'impianto", weight: 0 },
      NON_SO("q20"),
    ],
  },
  {
    id: "q21",
    areaId: "classificazione",
    text: "La classificazione tiene conto anche delle operazioni non di routine (avviamenti, fermate, pulizie, manutenzioni, campionamenti)?",
    options: [
      { id: "q21-a", label: "Sì, ogni modalità operativa è stata analizzata e le misure temporanee sono definite", weight: 3 },
      { id: "q21-b", label: "Solo le operazioni non di routine più frequenti", weight: 2 },
      { id: "q21-c", label: "No, considera solo il funzionamento normale", weight: 1 },
      { id: "q21-d", label: "No, e le operazioni non di routine si svolgono senza misure specifiche", weight: 0 },
      NON_SO("q21"),
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
  {
    id: "q22",
    areaId: "apparecchiature",
    text: "Esiste un registro delle apparecchiature Ex con marcatura, numero di certificato e zona di installazione di ogni elemento?",
    options: [
      { id: "q22-a", label: "Sì, completo, aggiornato e collegato al piano di ispezione", weight: 3 },
      { id: "q22-b", label: "Sì, ma non copre tutte le apparecchiature o non è aggiornato", weight: 2 },
      { id: "q22-c", label: "Esistono solo elenchi parziali (ad esempio solo motori o solo strumentazione)", weight: 1 },
      { id: "q22-d", label: "No, non esiste un registro", weight: 0 },
      NON_SO("q22"),
    ],
  },
  {
    id: "q23",
    areaId: "apparecchiature",
    text: "Le apparecchiature non elettriche installate nelle zone classificate (pompe, riduttori, ventilatori, giunti, freni) sono idonee all'uso in atmosfera esplosiva?",
    hint: "La direttiva 2014/34/UE si applica anche alle apparecchiature non elettriche (EN ISO 80079-36 e -37).",
    options: [
      { id: "q23-a", label: "Sì, verificato per tutte, con marcatura e documentazione disponibili", weight: 3 },
      { id: "q23-b", label: "Per le apparecchiature recenti sì; per quelle più vecchie non sempre", weight: 2 },
      { id: "q23-c", label: "Abbiamo verificato solo le apparecchiature elettriche", weight: 1 },
      { id: "q23-d", label: "No, le apparecchiature non elettriche non sono state considerate", weight: 0 },
      NON_SO("q23"),
    ],
  },
  {
    id: "q24",
    areaId: "apparecchiature",
    text: "Per le apparecchiature con certificato contrassegnato dal suffisso «X» rispettate le condizioni specifiche di utilizzo?",
    hint: "Il suffisso «X» indica condizioni particolari per un uso sicuro, riportate nel certificato e nelle istruzioni.",
    options: [
      { id: "q24-a", label: "Sì, le condizioni sono individuate, comunicate a chi installa e controllate durante le ispezioni", weight: 3 },
      { id: "q24-b", label: "Le conosciamo solo per le apparecchiature principali", weight: 2 },
      { id: "q24-c", label: "I certificati vengono consultati raramente", weight: 1 },
      { id: "q24-d", label: "No, le condizioni specifiche non vengono considerate", weight: 0 },
      NON_SO("q24"),
    ],
  },
  {
    id: "q25",
    areaId: "apparecchiature",
    text: "Quadri, cassette e assiemi realizzati su misura per le zone Ex sono certificati o valutati come insieme?",
    options: [
      { id: "q25-a", label: "Sì, con certificato o dichiarazione di conformità dell'assieme e relativa documentazione tecnica", weight: 3 },
      { id: "q25-b", label: "I singoli componenti sono certificati, ma l'assieme non è stato valutato", weight: 2 },
      { id: "q25-c", label: "Modifiche e aggiunte vengono eseguite internamente, senza valutazione", weight: 1 },
      { id: "q25-d", label: "Nelle zone classificate sono presenti quadri o cassette non Ex", weight: 0 },
      NON_SO("q25"),
    ],
  },
  {
    id: "q26",
    areaId: "apparecchiature",
    text: "La classe di temperatura (o la temperatura superficiale massima, per le polveri) delle apparecchiature viene confrontata con la temperatura di accensione delle sostanze presenti?",
    options: [
      { id: "q26-a", label: "Sì, sistematicamente, anche per gli strati di polvere e con i margini di sicurezza previsti dalle norme", weight: 3 },
      { id: "q26-b", label: "Sì per i gas, non sempre per le polveri", weight: 2 },
      { id: "q26-c", label: "Solo in fase di acquisto, senza verifiche sulle apparecchiature esistenti", weight: 1 },
      { id: "q26-d", label: "No, il confronto non viene fatto", weight: 0 },
      NON_SO("q26"),
    ],
  },
  {
    id: "q27",
    areaId: "apparecchiature",
    text: "Le apparecchiature sono adatte alla temperatura ambiente reale del luogo di installazione (esposizione al sole, vicinanza a forni o tubazioni calde)?",
    hint: "Salvo diversa indicazione in marcatura, le apparecchiature sono previste per una temperatura ambiente da −20 a +40 °C.",
    options: [
      { id: "q27-a", label: "Sì, la temperatura reale è stata verificata e confrontata con il campo indicato in marcatura", weight: 3 },
      { id: "q27-b", label: "Lo verifichiamo solo nei casi evidenti", weight: 2 },
      { id: "q27-c", label: "Consideriamo sempre il campo standard da −20 a +40 °C", weight: 1 },
      { id: "q27-d", label: "Non è mai stato verificato", weight: 0 },
      NON_SO("q27"),
    ],
  },
  {
    id: "q28",
    areaId: "apparecchiature",
    text: "I dispositivi portatili usati nelle zone classificate (rilevatori di gas, torce, radio, telefoni, tablet, utensili elettrici) sono idonei alla zona?",
    options: [
      { id: "q28-a", label: "Sì: solo dispositivi certificati per la zona, con una regola scritta e controlli", weight: 3 },
      { id: "q28-b", label: "Esiste una regola, ma non sempre viene rispettata (ad esempio per i telefoni personali)", weight: 2 },
      { id: "q28-c", label: "Solo i rilevatori di gas sono certificati", weight: 1 },
      { id: "q28-d", label: "Non esiste alcuna regola specifica", weight: 0 },
    ],
  },
  {
    id: "q29",
    areaId: "apparecchiature",
    text: "Al ricevimento delle apparecchiature Ex ne verificate la conformità all'ordine (marcatura, certificato, istruzioni, dichiarazione UE di conformità)?",
    options: [
      { id: "q29-a", label: "Sì, con un controllo documentato e archiviazione dei documenti nel fascicolo d'impianto", weight: 3 },
      { id: "q29-b", label: "Controlliamo la marcatura, ma non sempre i documenti", weight: 2 },
      { id: "q29-c", label: "Il controllo dipende da chi riceve il materiale", weight: 1 },
      { id: "q29-d", label: "Non viene fatto alcun controllo al ricevimento", weight: 0 },
      NON_SO("q29"),
    ],
  },
  {
    id: "q30",
    areaId: "apparecchiature",
    text: "I sistemi di rilevazione gas usati come misura di protezione sono adeguati e mantenuti in efficienza?",
    hint: "Rilevatori conformi alla EN/IEC 60079-29-1, scelti e installati secondo la EN/IEC 60079-29-2.",
    options: [
      { id: "q30-a", label: "Sì: rilevatori certificati, tarature periodiche e azioni automatiche documentate", weight: 3 },
      { id: "q30-b", label: "Sì, ma tarature e prove funzionali non sono sempre regolari", weight: 2 },
      { id: "q30-c", label: "Ci sono rilevatori, ma senza una logica di intervento definita", weight: 1 },
      { id: "q30-d", label: "Non ci sono sistemi di rilevazione dove sarebbero necessari", weight: 0 },
      NON_SO("q30"),
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
  {
    id: "q31",
    areaId: "installazione",
    text: "I sistemi di ingresso cavo (pressacavi, tappi, adattatori) sono certificati e compatibili con il modo di protezione della custodia?",
    hint: "Ad esempio pressacavi Ex d su custodie Ex d e tappi certificati sugli ingressi non utilizzati.",
    options: [
      { id: "q31-a", label: "Sì, verificato in fase di installazione e durante le ispezioni", weight: 3 },
      { id: "q31-b", label: "In generale sì, ma durante le ispezioni ne troviamo di non conformi", weight: 2 },
      { id: "q31-c", label: "Si usano i pressacavi disponibili a magazzino", weight: 1 },
      { id: "q31-d", label: "Non è un aspetto controllato", weight: 0 },
      NON_SO("q31"),
    ],
  },
  {
    id: "q32",
    areaId: "installazione",
    text: "I circuiti a sicurezza intrinseca (Ex i) sono verificati con un calcolo o un documento descrittivo del sistema?",
    hint: "Riferimenti: EN/IEC 60079-14 e EN/IEC 60079-25.",
    options: [
      { id: "q32-a", label: "Sì, per ogni circuito: parametri di barriere, cavi e strumenti confrontati e archiviati", weight: 3 },
      { id: "q32-b", label: "Solo per i circuiti più recenti", weight: 2 },
      { id: "q32-c", label: "Ci affidiamo alle barriere, senza calcoli", weight: 1 },
      { id: "q32-d", label: "No, i circuiti non sono verificati", weight: 0 },
      NON_SO("q32"),
    ],
  },
  {
    id: "q33",
    areaId: "installazione",
    text: "I cavi posati nelle zone classificate sono scelti secondo le prescrizioni della EN/IEC 60079-14 (tipo, protezione meccanica, non propagazione della fiamma)?",
    options: [
      { id: "q33-a", label: "Sì, con criteri di scelta documentati e verificati", weight: 3 },
      { id: "q33-b", label: "Sì sui nuovi impianti, non verificato su quelli esistenti", weight: 2 },
      { id: "q33-c", label: "Si usano gli stessi cavi delle aree non classificate", weight: 1 },
      { id: "q33-d", label: "Non c'è alcun criterio specifico", weight: 0 },
      NON_SO("q33"),
    ],
  },
  {
    id: "q34",
    areaId: "installazione",
    text: "Sulle custodie a prova di esplosione (Ex d) vengono rispettate le prescrizioni di installazione (giunti liberi da ostruzioni, viti originali, nessun foro non previsto)?",
    options: [
      { id: "q34-a", label: "Sì, verificato alla verifica iniziale e a ogni ispezione", weight: 3 },
      { id: "q34-b", label: "In generale sì, ma con eccezioni note non ancora risolte", weight: 2 },
      { id: "q34-c", label: "Sono state fatte modifiche (fori, sostituzione di viti) non verificate", weight: 1 },
      { id: "q34-d", label: "Non è un aspetto verificato", weight: 0 },
      NON_SO("q34"),
    ],
  },
  {
    id: "q35",
    areaId: "installazione",
    text: "L'impianto di messa a terra e i collegamenti equipotenziali nelle zone classificate sono progettati e verificati?",
    options: [
      { id: "q35-a", label: "Sì, con progetto, misure documentate e verifiche periodiche", weight: 3 },
      { id: "q35-b", label: "Vengono verificati solo in occasione delle verifiche periodiche di legge", weight: 2 },
      { id: "q35-c", label: "Esistono, ma senza documentazione", weight: 1 },
      { id: "q35-d", label: "No, non sono né progettati né verificati", weight: 0 },
      NON_SO("q35"),
    ],
  },
  {
    id: "q36",
    areaId: "installazione",
    text: "La verifica iniziale (ispezione dettagliata prima della messa in servizio) viene eseguita e documentata per ogni nuovo impianto e ogni modifica?",
    hint: "Prevista dalle EN/IEC 60079-14 e 60079-17.",
    options: [
      { id: "q36-a", label: "Sì, sempre, con un rapporto firmato da personale qualificato", weight: 3 },
      { id: "q36-b", label: "Sì per i nuovi impianti, non sempre per le modifiche", weight: 2 },
      { id: "q36-c", label: "Solo una prova di funzionamento, senza controlli specifici Ex", weight: 1 },
      { id: "q36-d", label: "No, non viene eseguita", weight: 0 },
      NON_SO("q36"),
    ],
  },
  {
    id: "q37",
    areaId: "installazione",
    text: "Le installazioni temporanee nelle zone classificate (cantieri, manutenzioni, apparecchiature a noleggio) seguono le stesse regole di quelle fisse?",
    options: [
      { id: "q37-a", label: "Sì, con autorizzazione, verifica Ex prima dell'uso e permesso di lavoro", weight: 3 },
      { id: "q37-b", label: "Sì, ma senza una verifica Ex sistematica", weight: 2 },
      { id: "q37-c", label: "Solo per i lavori più importanti", weight: 1 },
      { id: "q37-d", label: "No, le installazioni temporanee non vengono controllate", weight: 0 },
      NON_SO("q37"),
    ],
  },
  {
    id: "q38",
    areaId: "installazione",
    text: "Le apparecchiature installate sono protette dalle influenze esterne (corrosione, vibrazioni, urti, raggi UV, acqua, polveri) come richiesto dalle istruzioni del costruttore?",
    options: [
      { id: "q38-a", label: "Sì, le condizioni ambientali sono valutate e grado IP e protezione meccanica sono adeguati", weight: 3 },
      { id: "q38-b", label: "In generale sì, ma alcune apparecchiature mostrano segni di degrado", weight: 2 },
      { id: "q38-c", label: "Interveniamo solo dopo i guasti", weight: 1 },
      { id: "q38-d", label: "Non è un criterio considerato in fase di installazione", weight: 0 },
      NON_SO("q38"),
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
  {
    id: "q39",
    areaId: "verifiche",
    text: "Gli intervalli tra le ispezioni periodiche sono definiti e motivati (tipo di apparecchiatura, ambiente, storico dei guasti)?",
    hint: "La EN/IEC 60079-17 indica di non superare i 3 anni tra due ispezioni periodiche senza una valutazione da parte di esperti.",
    options: [
      { id: "q39-a", label: "Sì, con intervalli motivati e rivisti in base ai risultati delle ispezioni", weight: 3 },
      { id: "q39-b", label: "Sì, ma con un intervallo fisso uguale per tutte le apparecchiature", weight: 2 },
      { id: "q39-c", label: "Le ispezioni vengono fatte quando c'è tempo", weight: 1 },
      { id: "q39-d", label: "Non è definito alcun intervallo", weight: 0 },
      NON_SO("q39"),
    ],
  },
  {
    id: "q40",
    areaId: "verifiche",
    text: "Le ispezioni Ex seguono liste di controllo specifiche per modo di protezione (Ex d, Ex e, Ex i, Ex p, Ex t…)?",
    options: [
      { id: "q40-a", label: "Sì, le liste di controllo della EN/IEC 60079-17, adattate all'impianto", weight: 3 },
      { id: "q40-b", label: "Una lista di controllo generica, uguale per tutte le apparecchiature", weight: 2 },
      { id: "q40-c", label: "Nessuna lista: il controllo si basa sull'esperienza dell'ispettore", weight: 1 },
      { id: "q40-d", label: "Le ispezioni non sono documentate", weight: 0 },
      NON_SO("q40"),
    ],
  },
  {
    id: "q41",
    areaId: "verifiche",
    text: "I risultati delle ispezioni sono registrati in modo da ricostruire lo storico di ogni apparecchiatura?",
    options: [
      { id: "q41-a", label: "Sì, in un database o software collegato al registro delle apparecchiature Ex", weight: 3 },
      { id: "q41-b", label: "In rapporti archiviati, ma difficili da consultare per singola apparecchiatura", weight: 2 },
      { id: "q41-c", label: "Vengono annotate solo le anomalie", weight: 1 },
      { id: "q41-d", label: "No, i risultati non vengono registrati", weight: 0 },
      NON_SO("q41"),
    ],
  },
  {
    id: "q42",
    areaId: "verifiche",
    text: "Le non conformità critiche per la sicurezza (custodia Ex d danneggiata, pressacavo mancante, coperchio aperto) portano a una messa fuori servizio immediata?",
    options: [
      { id: "q42-a", label: "Sì: le non conformità sono classificate per gravità, con azioni immediate definite", weight: 3 },
      { id: "q42-b", label: "Sì, ma la decisione è lasciata al giudizio dell'ispettore", weight: 2 },
      { id: "q42-c", label: "Vengono annotate e risolte alla prima fermata utile", weight: 1 },
      { id: "q42-d", label: "No, l'apparecchiatura resta in servizio", weight: 0 },
      NON_SO("q42"),
    ],
  },
  {
    id: "q43",
    areaId: "verifiche",
    text: "Le ispezioni Ex riguardano anche le apparecchiature non elettriche (accoppiamenti, cuscinetti, cinghie, temperature superficiali)?",
    options: [
      { id: "q43-a", label: "Sì, con controlli specifici inseriti nel piano di ispezione", weight: 3 },
      { id: "q43-b", label: "Solo nell'ambito della manutenzione ordinaria, senza criteri Ex", weight: 2 },
      { id: "q43-c", label: "Raramente", weight: 1 },
      { id: "q43-d", label: "No, le ispezioni Ex riguardano solo l'impianto elettrico", weight: 0 },
      NON_SO("q43"),
    ],
  },
  {
    id: "q44",
    areaId: "verifiche",
    text: "Effettuate ispezioni straordinarie dopo eventi particolari (fulmini, allagamenti, incendi, urti, lunghi fermi impianto)?",
    options: [
      { id: "q44-a", label: "Sì, è previsto un controllo straordinario documentato", weight: 3 },
      { id: "q44-b", label: "Solo se l'evento ha causato danni evidenti", weight: 2 },
      { id: "q44-c", label: "Raramente", weight: 1 },
      { id: "q44-d", label: "No, non sono previste", weight: 0 },
      NON_SO("q44"),
    ],
  },
  {
    id: "q45",
    areaId: "verifiche",
    text: "Lo stato degli impianti Ex (ispezioni eseguite, non conformità aperte, ritardi) viene analizzato dalla direzione?",
    options: [
      { id: "q45-a", label: "Sì, con indicatori periodici e un riesame da parte della direzione", weight: 3 },
      { id: "q45-b", label: "Solo in occasione di audit o incidenti", weight: 2 },
      { id: "q45-c", label: "I dati esistono, ma non vengono analizzati", weight: 1 },
      { id: "q45-d", label: "Non ci sono dati disponibili", weight: 0 },
      NON_SO("q45"),
    ],
  },
  {
    id: "q46",
    areaId: "verifiche",
    text: "Prima di iniziare, gli ispettori dispongono della documentazione necessaria (classificazione delle aree, certificati, istruzioni, rapporti precedenti)?",
    hint: "La EN/IEC 60079-17 richiede che questa documentazione sia disponibile e aggiornata.",
    options: [
      { id: "q46-a", label: "Sì, in un fascicolo aggiornato messo a disposizione prima di ogni campagna", weight: 3 },
      { id: "q46-b", label: "In parte: la documentazione va spesso ricostruita", weight: 2 },
      { id: "q46-c", label: "Solo la classificazione delle aree", weight: 1 },
      { id: "q46-d", label: "No, gli ispettori lavorano senza documentazione", weight: 0 },
      NON_SO("q46"),
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
  {
    id: "q47",
    areaId: "manutenzione",
    text: "Per i lavori nelle zone classificate è previsto un permesso di lavoro (in particolare per i lavori a caldo)?",
    options: [
      { id: "q47-a", label: "Sì, con analisi dei rischi, misura dell'atmosfera e autorizzazione formale prima di ogni intervento", weight: 3 },
      { id: "q47-b", label: "Sì, ma solo per i lavori a caldo", weight: 2 },
      { id: "q47-c", label: "Viene dato un via libera verbale", weight: 1 },
      { id: "q47-d", label: "No, non è previsto", weight: 0 },
    ],
  },
  {
    id: "q48",
    areaId: "manutenzione",
    text: "I ricambi delle apparecchiature Ex (viti, guarnizioni, lampade, morsetti, vetri) sono quelli previsti dal costruttore?",
    options: [
      { id: "q48-a", label: "Sì, ricambi originali o indicati nelle istruzioni, gestiti a magazzino con codici dedicati", weight: 3 },
      { id: "q48-b", label: "Di solito sì, ma a volte si usano ricambi ritenuti equivalenti", weight: 2 },
      { id: "q48-c", label: "Si usano ricambi standard quando quelli originali non sono disponibili", weight: 1 },
      { id: "q48-d", label: "I ricambi Ex non sono distinti da quelli standard", weight: 0 },
      NON_SO("q48"),
    ],
  },
  {
    id: "q49",
    areaId: "manutenzione",
    text: "Le apparecchiature Ex riparate vengono marcate e accompagnate da un rapporto di riparazione?",
    hint: "La EN/IEC 60079-19 prevede una marcatura di riparazione e la documentazione degli interventi.",
    options: [
      { id: "q49-a", label: "Sì, sempre, e il rapporto è archiviato con il registro delle apparecchiature", weight: 3 },
      { id: "q49-b", label: "Solo per le riparazioni eseguite all'esterno", weight: 2 },
      { id: "q49-c", label: "Raramente", weight: 1 },
      { id: "q49-d", label: "No", weight: 0 },
      NON_SO("q49"),
    ],
  },
  {
    id: "q50",
    areaId: "manutenzione",
    text: "Le apparecchiature Ex vengono aperte solo dopo la messa fuori tensione e in assenza di atmosfera esplosiva?",
    options: [
      { id: "q50-a", label: "Sì, con procedure scritte (sezionamento, tempi di attesa, verifica dell'atmosfera)", weight: 3 },
      { id: "q50-b", label: "Sì, ma le procedure non sono scritte", weight: 2 },
      { id: "q50-c", label: "Dipende dall'urgenza dell'intervento", weight: 1 },
      { id: "q50-d", label: "Non è prevista una regola specifica", weight: 0 },
    ],
  },
  {
    id: "q51",
    areaId: "manutenzione",
    text: "Dopo un intervento, il ripristino del modo di protezione (guarnizioni, viti, giunti, pressacavi) viene verificato prima della rimessa in servizio?",
    options: [
      { id: "q51-a", label: "Sì, con una lista di controllo firmata", weight: 3 },
      { id: "q51-b", label: "Sì, ma senza registrazione", weight: 2 },
      { id: "q51-c", label: "Dipende dal tecnico", weight: 1 },
      { id: "q51-d", label: "No, non viene verificato", weight: 0 },
      NON_SO("q51"),
    ],
  },
  {
    id: "q52",
    areaId: "manutenzione",
    text: "I depositi di polvere su apparecchiature e superfici nelle zone 21 e 22 vengono rimossi regolarmente?",
    options: [
      { id: "q52-a", label: "Sì, con un programma di pulizia definito e metodi idonei (aspiratori adatti alla zona, niente aria compressa)", weight: 3 },
      { id: "q52-b", label: "Sì, ma senza frequenze definite", weight: 2 },
      { id: "q52-c", label: "Solo in occasione delle fermate", weight: 1 },
      { id: "q52-d", label: "No, i depositi di polvere sono frequenti", weight: 0 },
      NON_SO("q52"),
    ],
  },
  {
    id: "q53",
    areaId: "manutenzione",
    text: "Le modifiche alle singole apparecchiature Ex (fori aggiuntivi, sostituzione di componenti, cambio di lampade o motori) vengono valutate prima dell'esecuzione?",
    options: [
      { id: "q53-a", label: "Sì, sono ammesse solo se previste dal certificato o approvate dal costruttore", weight: 3 },
      { id: "q53-b", label: "Sì, ma la valutazione è informale", weight: 2 },
      { id: "q53-c", label: "Vengono eseguite se il tecnico le ritiene sicure", weight: 1 },
      { id: "q53-d", label: "Non esiste alcuna regola", weight: 0 },
      NON_SO("q53"),
    ],
  },
  {
    id: "q54",
    areaId: "manutenzione",
    text: "Prima di ogni intervento di imprese esterne nelle zone classificate vengono fornite le informazioni sul rischio esplosione (planimetrie delle zone, regole di accesso, DUVRI)?",
    options: [
      { id: "q54-a", label: "Sì, con riunione di coordinamento, documentazione e permesso di lavoro", weight: 3 },
      { id: "q54-b", label: "Sì, ma solo tramite il DUVRI generale", weight: 2 },
      { id: "q54-c", label: "Solo verbalmente", weight: 1 },
      { id: "q54-d", label: "No, nessuna informazione specifica", weight: 0 },
      NON_SO("q54"),
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
  {
    id: "q55",
    areaId: "competenza",
    text: "È stata nominata una persona responsabile della gestione degli impianti Ex?",
    options: [
      { id: "q55-a", label: "Sì, con compiti, autorità e competenze definiti per iscritto", weight: 3 },
      { id: "q55-b", label: "Sì, ma il ruolo non è formalizzato", weight: 2 },
      { id: "q55-c", label: "La responsabilità è condivisa tra più funzioni, senza un riferimento chiaro", weight: 1 },
      { id: "q55-d", label: "No", weight: 0 },
      NON_SO("q55"),
    ],
  },
  {
    id: "q56",
    areaId: "competenza",
    text: "Gli operatori di produzione che lavorano nelle zone classificate sono formati sui rischi di esplosione e sui comportamenti da adottare?",
    hint: "Obbligo previsto dal Titolo XI del D.Lgs. 81/08.",
    options: [
      { id: "q56-a", label: "Sì, con formazione periodica, verifica dell'apprendimento e istruzioni operative", weight: 3 },
      { id: "q56-b", label: "Sì, all'assunzione, ma senza aggiornamenti", weight: 2 },
      { id: "q56-c", label: "Ricevono solo informazioni generiche", weight: 1 },
      { id: "q56-d", label: "No", weight: 0 },
    ],
  },
  {
    id: "q57",
    areaId: "competenza",
    text: "Esiste un piano di formazione Ex con fabbisogni definiti per ruolo (progettisti, installatori, ispettori, manutentori, responsabili)?",
    options: [
      { id: "q57-a", label: "Sì, con analisi dei fabbisogni, scadenze di aggiornamento e budget dedicato", weight: 3 },
      { id: "q57-b", label: "Esiste un piano, ma non è collegato ai ruoli", weight: 2 },
      { id: "q57-c", label: "La formazione si fa su richiesta", weight: 1 },
      { id: "q57-d", label: "No", weight: 0 },
      NON_SO("q57"),
    ],
  },
  {
    id: "q58",
    areaId: "competenza",
    text: "L'efficacia della formazione Ex viene verificata (test, affiancamento, valutazione sul campo)?",
    options: [
      { id: "q58-a", label: "Sì, con test e valutazione pratica documentati", weight: 3 },
      { id: "q58-b", label: "Solo con un test finale", weight: 2 },
      { id: "q58-c", label: "Solo con l'attestato di frequenza", weight: 1 },
      { id: "q58-d", label: "No", weight: 0 },
      NON_SO("q58"),
    ],
  },
  {
    id: "q59",
    areaId: "competenza",
    text: "Il personale che interviene sulle apparecchiature Ex conosce i modi di protezione (Ex d, Ex e, Ex i, Ex p, Ex t)?",
    options: [
      { id: "q59-a", label: "Sì, sa riconoscerli dalla marcatura e applicarne le regole di intervento", weight: 3 },
      { id: "q59-b", label: "Solo i modi di protezione più diffusi nell'impianto", weight: 2 },
      { id: "q59-c", label: "Ne ha una conoscenza superficiale", weight: 1 },
      { id: "q59-d", label: "No", weight: 0 },
      NON_SO("q59"),
    ],
  },
  {
    id: "q60",
    areaId: "competenza",
    text: "Quando una persona con competenze Ex lascia l'azienda o cambia ruolo, le sue competenze vengono sostituite o trasferite?",
    options: [
      { id: "q60-a", label: "Sì, la copertura delle competenze critiche è pianificata (sostituti, affiancamento)", weight: 3 },
      { id: "q60-b", label: "Lo gestiamo al momento", weight: 2 },
      { id: "q60-c", label: "Spesso restiamo scoperti per lunghi periodi", weight: 1 },
      { id: "q60-d", label: "Non ci siamo mai posti il problema", weight: 0 },
      NON_SO("q60"),
    ],
  },
  {
    id: "q61",
    areaId: "competenza",
    text: "Dirigenti e responsabili conoscono gli obblighi del datore di lavoro in materia di atmosfere esplosive (direttiva 1999/92/CE, Titolo XI del D.Lgs. 81/08)?",
    options: [
      { id: "q61-a", label: "Sì, hanno seguito una formazione specifica e ne verificano l'applicazione", weight: 3 },
      { id: "q61-b", label: "Ne hanno una conoscenza generale", weight: 2 },
      { id: "q61-c", label: "Lo considerano un tema esclusivamente tecnico", weight: 1 },
      { id: "q61-d", label: "No", weight: 0 },
      NON_SO("q61"),
    ],
  },
  {
    id: "q62",
    areaId: "competenza",
    text: "Le competenze Ex del personale vengono aggiornate all'evoluzione delle norme (nuove edizioni delle EN/IEC 60079)?",
    options: [
      { id: "q62-a", label: "Sì, con aggiornamenti periodici e un monitoraggio delle norme", weight: 3 },
      { id: "q62-b", label: "Occasionalmente, ad esempio tramite seminari o newsletter", weight: 2 },
      { id: "q62-c", label: "Solo quando emergono problemi", weight: 1 },
      { id: "q62-d", label: "No", weight: 0 },
      NON_SO("q62"),
    ],
  },
];

/** Poids maximal d'une réponse : sert au calcul du score par area. */
export const MAX_WEIGHT: Weight = 3;
