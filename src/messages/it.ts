/**
 * Textes de l'interface — italien, langue de référence.
 * en.ts et fr.ts ont la même forme (type Messages) : toute clé ajoutée ici
 * doit y être traduite (le typecheck le signale).
 * Le contenu métier (domande, aree, raccomandazioni) est dans config/questions.ts
 * (italien) et config/content/{en,fr}.ts (traductions).
 */
import type { Paese, Ruolo, Settore } from "@/config/lead";
import type { LevelId } from "@/lib/scoring";

export const it = {
  meta: {
    title: "Scorecard sicurezza Ex — Atex Italia",
    description:
      "Quanto è sicuro e conforme il tuo impianto in atmosfera esplosiva? 12 domande, circa 5 minuti: punteggio di maturità, profilo per area e priorità d'intervento.",
    quizTitle: "Valutazione — Scorecard sicurezza Ex",
    resultsTitle: "Risultati — Scorecard sicurezza Ex",
  },
  common: {
    brand: "Atex Italia",
    logoAlt: "Atex Italia",
    privacyLink: "Privacy",
    footer: "Atex Italia · Gruppo Maffioletti · Osio Sotto (BG)",
    legal: "Atex Italia è un brand di Maffioletti S.r.l.",
    vatLabel: "P. IVA",
    phoneLabel: "Tel.",
    emailLabel: "Email",
    linkedinLabel: "Atex Italia su LinkedIn",
    languageLabel: "Lingua",
  },
  landing: {
    eyebrow: "Autovalutazione gratuita · ATEX / IECEx",
    title: "Scorecard sicurezza Ex",
    titleQuestion: "Quanto è sicuro e conforme il tuo impianto?",
    subtitle:
      "Valuta in pochi minuti il livello di maturità della gestione delle atmosfere esplosive nel tuo stabilimento: dalla classificazione delle aree alla competenza del personale.",
    duration: "12 domande · circa 5 minuti",
    startForm: {
      azienda: "Azienda",
      email: "Email aziendale",
      aziendaPlaceholder: "Nome dell'azienda",
      emailPlaceholder: "nome@azienda.it",
      note: "Riceverai i risultati e il report al termine del questionario.",
    },
    heroImageAlt: "Tecnico con casco di sicurezza davanti a un impianto petrolchimico",
    cta: "Inizia la valutazione",
    benefitsTitle: "Cosa ottieni",
    benefits: [
      {
        title: "Punteggio di maturità",
        text: "Un indice complessivo da 0 a 100 e il livello raggiunto, da «Critico» a «Eccellente».",
      },
      {
        title: "Radar per area",
        text: "Il profilo del tuo impianto sulle 6 aree chiave della sicurezza Ex, a colpo d'occhio.",
      },
      {
        title: "Priorità d'intervento",
        text: "Le 3 aree più deboli, con una raccomandazione concreta per ciascuna.",
      },
      {
        title: "Report PDF scaricabile",
        text: "Un documento da condividere con la direzione, l'HSE o la manutenzione.",
      },
    ],
    areasTitle: "Le 6 aree valutate",
    audienceTitle: "A chi è rivolto",
    audienceText:
      "A chi gestisce impianti in cui sono presenti gas, vapori o polveri combustibili: responsabili di stabilimento, HSE e RSPP, manutenzione, ingegneria e servizio tecnico.",
    sectors: [
      "Chimica e petrolchimica",
      "Oil & gas",
      "Manifatturiero",
      "Farmaceutico",
      "Energia",
      "Alimentare",
    ],
    audienceShort: "Responsabili di stabilimento, HSE e RSPP, manutenzione e ingegneria, nei settori:",
    carouselLabel: "Informazioni sulla scorecard",
    carouselPause: "Metti in pausa lo scorrimento",
    carouselPlay: "Riprendi lo scorrimento",
    carouselGoTo: (n: number, total: number) => `Mostra le schede ${n} di ${total}`,
    howTitle: "Come funziona",
    howSteps: [
      "Rispondi a 12 domande sulla gestione Ex del tuo impianto.",
      "Indica i tuoi dati per ricevere i risultati.",
      "Consulta punteggio, radar e priorità, e scarica il report.",
    ],
  },
  quiz: {
    progressLabel: (current: number, total: number) => `Domanda ${current} di ${total}`,
    areaLabel: (index: number, total: number, title: string) =>
      `Area ${index} di ${total} · ${title}`,
    back: "Indietro",
    next: "Avanti",
    finish: "Concludi",
    chooseHint: "Seleziona una risposta per continuare.",
    restart: "Ricomincia",
  },
  form: {
    title: "Ultimo passo: i tuoi dati",
    subtitle: "Inserisci i tuoi dati per vedere i risultati e scaricare il report.",
    requiredNote: "I campi contrassegnati con * sono obbligatori.",
    fields: {
      nome: "Nome",
      cognome: "Cognome",
      email: "Email aziendale",
      emailHint: "Usa l'indirizzo della tua azienda.",
      azienda: "Azienda",
      ruolo: "Ruolo",
      settore: "Settore",
      paese: "Paese",
      telefono: "Telefono",
      optional: "facoltativo",
      selectPlaceholder: "Seleziona…",
    },
    privacy: {
      before: "Ho letto l'",
      link: "informativa sulla privacy",
      after: " e acconsento al trattamento dei miei dati per ricevere i risultati ed essere ricontattato in merito alla valutazione.",
    },
    newsletter:
      "Desidero ricevere la newsletter di Atex Italia con novità su prodotti, normative e formazione (facoltativo).",
    honeypot: "Non compilare questo campo",
    submit: "Vedi i risultati",
    submitting: "Invio in corso…",
    turnstileLabel: "Verifica di sicurezza",
    errors: {
      required: "Campo obbligatorio.",
      tooLong: "Testo troppo lungo.",
      email: "Inserisci un indirizzo email valido.",
      freeEmail:
        "Per ricevere il report ti chiediamo un indirizzo email aziendale: gli indirizzi personali (Gmail, Libero, Outlook…) non sono accettati.",
      select: "Seleziona un'opzione.",
      phone: "Inserisci un numero di telefono valido.",
      privacy: "Per proseguire è necessario accettare l'informativa sulla privacy.",
      summary: "Controlla i campi evidenziati.",
      turnstile: "Completa la verifica di sicurezza e riprova.",
      tooSoon: "Abbiamo appena ricevuto una valutazione con questo indirizzo email. Riprova tra qualche minuto.",
      server:
        "Non è stato possibile salvare la valutazione per un problema tecnico. Le tue risposte sono conservate: riprova tra qualche istante.",
      network: "Connessione non riuscita. Controlla la rete e riprova: le tue risposte sono conservate.",
      answers: "Alcune risposte risultano mancanti. Torna indietro e completa il questionario.",
    },
  },
  results: {
    title: "I risultati della tua valutazione",
    scoreLabel: "Punteggio complessivo",
    levelLabel: "Livello",
    radarTitle: "Profilo per area",
    areaScoresTitle: "Punteggio per area",
    prioritiesTitle: "Le tue 3 priorità d'intervento",
    prioritiesIntro: "Le aree con il punteggio più basso, da cui partire.",
    recommendation: "Cosa fare",
    serviceLabel: "Come può aiutarti Atex Italia",
    serviceCta: "Scopri il servizio",
    ctaTitle: "Vuoi approfondire i risultati?",
    ctaText:
      "Un nostro tecnico può aiutarti a leggere il punteggio e a definire un piano d'azione per il tuo impianto.",
    ctaExpert: "Parla con un esperto",
    ctaPdf: "Scarica il report PDF",
    mailSubject: "Scorecard sicurezza Ex — richiesta di contatto",
    mailBody: (score: number, level: string, url: string) =>
      `Buongiorno,\n\nho completato la Scorecard sicurezza Ex (punteggio ${score}%, livello ${level}) e vorrei parlarne con un vostro tecnico.\n\nRisultato: ${url}\n`,
    disclaimer:
      "Punteggio indicativo basato sulle risposte fornite. Non costituisce una valutazione di conformità né sostituisce le verifiche previste dalla normativa.",
    restart: "Rifai la valutazione",
    dateLabel: "Valutazione del",
  },
  levels: {
    critico: {
      label: "Critico",
      text: "La gestione del rischio esplosione presenta lacune importanti. È consigliabile intervenire con priorità.",
    },
    da_migliorare: {
      label: "Da migliorare",
      text: "Le basi ci sono, ma diverse aree richiedono interventi per garantire sicurezza e conformità nel tempo.",
    },
    buono: {
      label: "Buono",
      text: "Una gestione Ex solida, con alcuni punti da consolidare.",
    },
    eccellente: {
      label: "Eccellente",
      text: "Una gestione Ex matura e strutturata. Mantenete il livello con verifiche e formazione continue.",
    },
  } satisfies Record<LevelId, { label: string; text: string }>,
  pdf: {
    fileName: "scorecard-sicurezza-ex-atex-italia.pdf",
    docTitle: "Scorecard sicurezza Ex — Report",
    title: "Scorecard sicurezza Ex",
    subtitle: "Report di autovalutazione",
    dateLabel: "Valutazione del",
    idLabel: "Riferimento",
    scoreLabel: "Punteggio complessivo",
    levelLabel: "Livello",
    radarTitle: "Profilo per area",
    areasTitle: "Punteggio per area",
    prioritiesTitle: "Le 3 priorità d'intervento",
    recommendation: "Cosa fare",
    service: "Come può aiutarti Atex Italia",
    nextTitle: "Prossimi passi",
    nextText:
      "Un tecnico Atex Italia può aiutarti a leggere questi risultati e a definire un piano d'azione per il tuo impianto.",
    contact: "Contatti",
    disclaimerTitle: "Avvertenza",
    page: (n: number, total: number) => `Pagina ${n} di ${total}`,
  },
  report: {
    tempError: "Errore temporaneo, riprova.",
    renderError: "Errore nella generazione del report.",
  },
  /** Libellés affichés des listes du formulaire (les valeurs enregistrées restent en italien). */
  lead: {
    ruoli: {
      "Direzione / Titolare": "Direzione / Titolare",
      "Responsabile di stabilimento": "Responsabile di stabilimento",
      "HSE / RSPP": "HSE / RSPP",
      Manutenzione: "Manutenzione",
      "Ingegneria / Progettazione": "Ingegneria / Progettazione",
      "Servizio tecnico / Strumentazione": "Servizio tecnico / Strumentazione",
      Acquisti: "Acquisti",
      Qualità: "Qualità",
      Consulente: "Consulente",
      Altro: "Altro",
    } satisfies Record<Ruolo, string>,
    settori: {
      "Chimica e petrolchimica": "Chimica e petrolchimica",
      "Oil & gas": "Oil & gas",
      Manifatturiero: "Manifatturiero",
      Farmaceutico: "Farmaceutico",
      Energia: "Energia",
      Alimentare: "Alimentare",
      "Trattamento acque e rifiuti": "Trattamento acque e rifiuti",
      Altro: "Altro",
    } satisfies Record<Settore, string>,
    paesi: {
      Italia: "Italia",
      Svizzera: "Svizzera",
      "San Marino": "San Marino",
      Austria: "Austria",
      Belgio: "Belgio",
      Croazia: "Croazia",
      Francia: "Francia",
      Germania: "Germania",
      Grecia: "Grecia",
      "Paesi Bassi": "Paesi Bassi",
      Polonia: "Polonia",
      Portogallo: "Portogallo",
      "Regno Unito": "Regno Unito",
      Romania: "Romania",
      Slovenia: "Slovenia",
      Spagna: "Spagna",
      "Altro paese europeo": "Altro paese europeo",
      "Paese extraeuropeo": "Paese extraeuropeo",
    } satisfies Record<Paese, string>,
  },
  resultError: {
    title: "Impossibile caricare il risultato",
    text: "Si è verificato un problema temporaneo. Riprova tra qualche istante.",
    retry: "Riprova",
  },
  notFound: {
    title: "Risultato non trovato",
    text: "Il link potrebbe essere errato o scaduto.",
    cta: "Torna alla scorecard",
  },
};

export type Messages = typeof it;
