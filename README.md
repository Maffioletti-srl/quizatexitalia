# Scorecard sicurezza Ex — Atex Italia

Autovalutazione pubblica per gli **esercenti di impianti in atmosfera esplosiva**
(ATEX / IECEx), pubblicata su **https://quiz.atexitalia.it**.

12 domande (circa 5 minuti) su 6 aree → punteggio di maturità, profilo radar,
3 priorità d'intervento con il servizio Atex Italia collegato e report PDF.
Ogni valutazione completata diventa un **lead nel CRM Nexo** (tabella
`quiz_leads` del Supabase di Nexo, pagina *Vendite → Lead quiz*).

| | |
|---|---|
| Framework | Next.js 16 (App Router, Cache Components) · React 19 · TypeScript strict |
| Stile | Tailwind CSS 4 · font Be Vietnam Pro servito dal nostro dominio (nessuna chiamata a Google) |
| Validazione | Zod 4 (stesso schema lato client e lato server) |
| Grafici / PDF | Recharts (radar) · @react-pdf/renderer (report) |
| Dati | Supabase del CRM Nexo, solo lato server con la chiave `service_role` |
| Anti-bot | Cloudflare Turnstile + campo honeypot + 1 invio ogni 2 minuti per email |
| Test | Vitest |
| Hosting | Vercel · DNS su SiteGround (CNAME `quiz`) |

---

## 1. Avvio in locale

Requisiti: **Node.js 20.9 o superiore** (consigliato 22/24) e npm.

```bash
npm install
cp .env.example .env.local   # poi compilare i valori (vedi §2)
npm run dev                  # http://localhost:3000
```

In sviluppo è disponibile un risultato dimostrativo, senza database:
`http://localhost:3000/risultati/00000000-0000-4000-8000-000000000000`
(e il relativo PDF su `/api/report/00000000-0000-4000-8000-000000000000`).
In produzione questo indirizzo risponde «Risultato non trovato».

### Comandi

| Comando | Cosa fa |
|---|---|
| `npm run dev` | server di sviluppo |
| `npm run build` / `npm start` | build e avvio di produzione |
| `npm run lint` | ESLint |
| `npm run typecheck` | controllo TypeScript |
| `npm test` | test Vitest (punteggi, questionario, validazione del modulo) |

---

## 2. Variabili d'ambiente

Il modello completo è in [`.env.example`](.env.example). `.env.local` non va
mai nel repository (è in `.gitignore`).

| Variabile | Dove serve | Esempio / note |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | link assoluti, Open Graph, link del risultato nell'email e nel PDF | `https://quiz.atexitalia.it` (in locale `http://localhost:3000`) |
| `NEXT_PUBLIC_PRIVACY_URL` | link della casella privacy obbligatoria | `https://www.atexitalia.it/privacy` |
| `NEXT_PUBLIC_INDEXABLE` | `true` = indicizzabile; qualsiasi altro valore = `noindex` | lasciare `false` fino alla messa in linea ufficiale |
| `CONTACT_EMAIL` | destinatario del pulsante «Parla con un esperto» e contatto nel PDF | solo server |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | widget Turnstile nel browser | vedi §4 |
| `TURNSTILE_SECRET_KEY` | verifica Turnstile lato server | **segreta**, solo server |
| `SUPABASE_URL` | Supabase di Nexo | `https://<progetto>.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | scrittura dei lead e lettura dei risultati | **segreta**, solo server — mai con il prefisso `NEXT_PUBLIC_` |

> Le variabili `NEXT_PUBLIC_*` sono incorporate al momento della build: dopo
> averle modificate su Vercel serve un **nuovo deploy**.

Chiavi Turnstile di **test** (il widget passa sempre), utili in locale:
site key `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA`.

---

## 3. Database (Supabase di Nexo)

Il sito **non ha un database proprio**: scrive nella tabella `public.quiz_leads`
del Supabase del CRM Nexo.

- La **migrazione vive nel repository di Nexo** (unica fonte di verità per quel
  database): `crm-pipeline/supabase/migrations/20261017120000_lead_quiz.sql`
  (+ `_rollback.sql`). **Già applicata in produzione il 15/10/2026.**
  Crea/completa `quiz_leads`, la cronologia `quiz_lead_eventi`, la funzione
  `quiz_result_public`, la sezione Nexo `lead_quiz` e il contatore del menu.
- Sicurezza: RLS attiva; il ruolo `anon` non ha alcun accesso; da Nexo gli utenti
  con la sezione «Lead quiz» leggono e cambiano solo `stato` / `crm_contatto_id`.
  Il sito usa la chiave `service_role` **solo lato server**.
- La pagina pubblica `/risultati/[id]` legge tramite `quiz_result_public(id)`:
  **solo punteggi e livello, mai i dati personali**. L'id è un UUID non indovinabile.

Per una nuova installazione da zero: eseguire quella migrazione nel SQL Editor del
progetto Supabase (o `npx supabase db push` dal repo di Nexo), poi verificare con
la query commentata in fondo al file.

### Che cosa arriva in Nexo

Una riga per valutazione: nome, cognome, email aziendale, azienda, ruolo, settore,
paese, telefono (facoltativo), **risposte** (array autoportante con testo della
domanda e della risposta, peso e area), punteggio totale, punteggi per area,
livello, consensi (privacy obbligatoria, newsletter facoltativa e separata), UTM,
referrer, versione del questionario, user agent. Stato iniziale: `nuovo`.

I punteggi sono **sempre ricalcolati dal server** a partire dalle risposte grezze:
il punteggio inviato dal browser non viene mai considerato.

---

## 4. Cloudflare Turnstile

1. Cloudflare Dashboard → **Turnstile** → **Add widget**.
2. Nome: `quiz.atexitalia.it` · Hostname: `quiz.atexitalia.it`
   (aggiungere anche l'URL di anteprima Vercel se si vuole provare il modulo lì).
3. Widget mode: **Managed**.
4. Copiare **Site Key** → `NEXT_PUBLIC_TURNSTILE_SITE_KEY` e
   **Secret Key** → `TURNSTILE_SECRET_KEY` (variabili Vercel, ambiente Production).

La Content Security Policy (`next.config.ts`) autorizza già
`https://challenges.cloudflare.com`.

---

## 5. Deploy su Vercel

1. Vercel → **Add New… → Project** → importare il repository GitHub
   `Maffioletti-srl/quizatexitalia`. Framework rilevato: **Next.js** (nessuna
   impostazione di build da cambiare).
2. **Settings → Environment Variables**: inserire tutte le variabili del §2 per
   l'ambiente *Production* (e *Preview* se serve), con i valori reali.
3. **Settings → Functions → Function Region**: scegliere la regione più vicina
   al progetto Supabase (es. `fra1` — Francoforte) per ridurre la latenza.
4. **Deploy**. Verificare l'URL `*.vercel.app` (vedi checklist §8).

Ogni push sul ramo principale genera un nuovo deploy di produzione; le altre
branch generano anteprime.

---

## 6. Dominio `quiz.atexitalia.it`

### 6.1 In Vercel

Progetto → **Settings → Domains → Add** → `quiz.atexitalia.it`.
Vercel mostra il record DNS da creare: un **CNAME** per `quiz` con il valore
indicato (di solito `cname.vercel-dns.com`, o un valore specifico del progetto
del tipo `xxxxxxxx.vercel-dns-0xx.com` — usare **quello mostrato da Vercel**).

### 6.2 In SiteGround

> ⚠️ Usare **Site Tools → Domain → DNS Zone Editor**, **NON** il menu
> *Subdomains* (che crea un sottodominio ospitato su SiteGround e un record A che
> andrebbe in conflitto con Vercel).

1. SiteGround → **Site Tools** del sito `atexitalia.it` → **Domain → DNS Zone Editor**.
2. Se esiste già un record `quiz` (A o CNAME), eliminarlo.
3. **Create New Record → CNAME**:
   - Name: `quiz` (diventa `quiz.atexitalia.it`)
   - Resolves to: il valore dato da Vercel (es. `cname.vercel-dns.com`)
   - TTL: predefinito
4. Salvare e tornare su Vercel → Domains: lo stato passa a **Valid Configuration**
   (da pochi minuti a qualche ora). Il certificato HTTPS è emesso automaticamente.

Controllo da terminale: `dig quiz.atexitalia.it CNAME +short`.

---

## 7. Dove modificare i contenuti

| Cosa | File |
|---|---|
| Domande, risposte e pesi, aree, raccomandazioni, servizi e loro URL, `QUIZ_VERSION` | [`src/config/questions.ts`](src/config/questions.ts) |
| Settori, ruoli, paesi, domini email personali rifiutati | [`src/config/lead.ts`](src/config/lead.ts) |
| Testi dell'interfaccia e del PDF (italiano) | [`src/messages/it.ts`](src/messages/it.ts) |
| Calcolo dei punteggi e soglie dei livelli | [`src/lib/scoring.ts`](src/lib/scoring.ts) |
| Colori (crema `#F6F3EE`, arancio logo `#F49934`) | [`src/app/globals.css`](src/app/globals.css) |
| Report PDF | [`src/pdf/ReportDocument.tsx`](src/pdf/ReportDocument.tsx) |
| Intestazioni di sicurezza (CSP…) | [`next.config.ts`](next.config.ts) |

**Regole importanti per il questionario**

- Ogni modifica a domande, risposte o pesi → **incrementare `QUIZ_VERSION`**
  (salvata con ogni lead; le sessioni in corso con una versione diversa ripartono da zero).
- **Non rinominare gli id** (`q1`, `q1-a`, …): sono salvati nelle risposte dei lead.
- Ogni domanda deve avere i pesi 0, 1, 2, 3 una volta ciascuno (+ «Non so» = 0
  facoltativo): i test lo verificano (`npm test`).
- Livelli: 0–39 Critico · 40–64 Da migliorare · 65–84 Buono · 85–100 Eccellente.

Per aggiungere l'inglese: creare `src/messages/en.ts` con la stessa forma di
`it.ts` e selezionarlo in `src/messages/index.ts` (le domande andranno tradotte
in `questions.ts`).

---

## 8. Checklist di messa in linea

**Contenuti**
- [ ] Domande, raccomandazioni e servizi validati dall'ufficio tecnico (`questions.ts`).
- [ ] URL reali dei servizi Atex Italia al posto dei segnaposto (`// TODO` in `questions.ts`).
- [ ] Confermare i servizi «Supporto tecnico alla classificazione e al DPCE» e
      «Assistenza, ricambi e riparazioni Ex».
- [ ] Informativa privacy di atexitalia.it aggiornata con il trattamento dei dati
      della scorecard (finalità, base giuridica, conservazione, newsletter facoltativa).
- [ ] `CONTACT_EMAIL` definitiva.

**Configurazione**
- [ ] Variabili Vercel di produzione complete (§2) — chiavi Turnstile **reali**, non quelle di test.
- [ ] Region delle funzioni Vercel vicina a Supabase.
- [ ] Dominio `quiz.atexitalia.it` valido su Vercel, HTTPS attivo.
- [ ] Nexo: branch `feat/lead-quiz` deployata; sezione «Lead quiz» assegnata a chi deve
      lavorare i lead (Direzione e CRM Manager già abilitati).
- [ ] listmonk: una sola lista newsletter con tag Atex Italia, oppure
      `LISTMONK_LISTA_QUIZ_ID` impostata sul server di Nexo.

**Prova completa in produzione**
- [ ] Landing → azienda + email (un indirizzo Gmail deve essere rifiutato) → 12 domande.
- [ ] Modulo → invio → pagina risultati con punteggio, radar, 3 priorità e avvertenza.
- [ ] «Scarica il report PDF» → 2 pagine con logo, banner e dati corretti.
- [ ] «Parla con un esperto» apre l'email verso `CONTACT_EMAIL`.
- [ ] Il lead compare in Nexo (*Vendite → Lead quiz*, con Atex Italia selezionata),
      con badge «nuovo», risposte leggibili e UTM.
- [ ] Conversione in contatto (+ newsletter se il consenso è stato dato).
- [ ] Un secondo invio con la stessa email entro 2 minuti viene rifiutato.

**Ultimo passo**
- [ ] `NEXT_PUBLIC_INDEXABLE=true` su Vercel + nuovo deploy, solo quando il sito è ufficialmente pubblico.

---

## 9. Note tecniche

- **Privacy**: nessun cookie, nessun analytics → nessun banner necessario. UTM e
  referrer restano in `sessionStorage` fino all'invio. Il font è servito dal nostro dominio.
- **Sicurezza**: CSP, `X-Frame-Options: DENY`, `Referrer-Policy`, HSTS,
  `Permissions-Policy` in `next.config.ts`; `poweredByHeader` disattivato.
- **Next.js 16**: questa versione cambia diverse API rispetto alle precedenti
  (Cache Components attivo, `params` asincroni, `runtime` non configurabile nelle
  route). Prima di modificare il codice leggere `node_modules/next/dist/docs/`
  (vedi `AGENTS.md`).
- **PDF**: generato al volo da `GET /api/report/[id]`; logo e banner sono letti da
  `public/` e inclusi nel bundle tramite `outputFileTracingIncludes`.
- **Accessibilità**: navigazione da tastiera nel questionario, focus visibili,
  etichette e messaggi d'errore collegati ai campi, `prefers-reduced-motion` rispettato.
