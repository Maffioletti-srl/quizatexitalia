# Scorecard sicurezza Ex — Atex Italia

Autovalutazione pubblica per gli **esercenti di impianti in atmosfera esplosiva**
(ATEX / IECEx), pubblicata su **https://quiz.atexitalia.it**.

## 1. Avvio in locale

Per una nuova installazione da zero: eseguire quella migrazione nel SQL Editor del
progetto Supabase (o `npx supabase db push` dal repo di Nexo), poi verificare con
la query commentata in fondo al file.

### Che cosa arriva in Nexo

## 4. Cloudflare Turnstile

## 6. Dominio `quiz.atexitalia.it`

## 7. Dove modificare i contenuti

| Cosa | File |
|---|---|
| Domande, risposte e pesi, aree, raccomandazioni, servizi e loro URL, 
| Settori, ruoli, paesi, domini email personali rifiutati 
| Testi dell'interfaccia e del PDF (italiano) 
| Calcolo dei punteggi e soglie dei livelli 
| Colori (crema `#F6F3EE`, arancio logo `#F49934`) 
| Report PDF
| Intestazioni di sicurezza (CSS)

**Regole importanti per il questionario**

- Ogni modifica a domande, risposte o pesi → **incrementare `QUIZ_VERSION`**
  (salvata con ogni lead; le sessioni in corso con una versione diversa ripartono da zero).
- **Non rinominare gli id** (`q1`, `q1-a`, …): sono salvati nelle risposte dei lead.
- Ogni domanda deve avere i pesi 0, 1, 2, 3 una volta ciascuno (+ «Non so» = 0
  facoltativo): i test lo verificano (`npm test`).
- `questions.ts` è una **banca di domande** (62): ogni valutazione ne estrae a caso
  `QUESTIONS_PER_AREA` (2) per area, cioè 12. Ogni area deve averne almeno 2.
- Ogni nuova domanda va tradotta in `src/config/content/en.ts` e `fr.ts`
  (i test segnalano le traduzioni mancanti).
- Livelli: 0–39 Critico · 40–64 Da migliorare · 65–84 Buono · 85–100 Eccellente.

Per aggiungere l'inglese: creare `src/messages/en.ts` con la stessa forma di
`it.ts` e selezionarlo in `src/messages/index.ts` (le domande andranno tradotte
in `questions.ts`).

---

## 8. Checklist di messa in linea

**Prova completa in produzione**

**Ultimo passo**

## 9. Note tecniche

- **Privacy**: 
- **Sicurezza**: 
- **Next.js 16**: 
- **PDF**: 
- **Accessibilità**: 
