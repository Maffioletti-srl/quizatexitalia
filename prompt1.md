Tu vas créer de zéro le projet "atex-quiz" : une scorecard d'auto-évaluation publique pour Atex Italia, hébergée sur quiz.atexitalia.it (déploiement Vercel, DNS chez SiteGround via CNAME). Travaille par phases et ARRÊTE-TOI à la fin de chaque phase pour que je valide.

## Contexte
Atex Italia (gruppo Maffioletti, Osio Sotto BG) distribue, produit et assure des services pour les atmosphères explosives (ATEX / IECEx). Modèle d'inspiration : https://landing.exveritas.com/exveritasscorecard — une scorecard de 12 questions (~5 min) qui donne un score de maturité, un profil par area et un rapport, avec capture de lead. MAIS notre cible est différente : les EXPLOITANTS d'installations industrielles (chimica e petrolchimica, oil & gas, manifatturiero, farmaceutico, energia, alimentare), pas les fabricants. Le but est commercial : générer des leads qualifiés et orienter vers nos offres (prodotti certificati Ex, soluzioni Custom Ex, verifiche e ispezioni, formazione/Academy).

Titre de travail : "Scorecard sicurezza Ex — Quanto è sicuro e conforme il tuo impianto?"

## Stack
- Next.js (dernière version stable, App Router) + TypeScript strict + Tailwind CSS
- Zod pour la validation, Recharts pour le radar, @react-pdf/renderer pour le PDF
- Supabase (@supabase/supabase-js) côté serveur uniquement
- Cloudflare Turnstile pour l'anti-bot
- Pas de base de données propre au quiz : les leads vont dans le Supabase du CRM interne "Nexo"
- Interface en italien ; textes centralisés dans un fichier de messages pour ajouter l'anglais plus tard (pas de lib i18n lourde pour l'instant)

## Parcours utilisateur
1. **Landing** (/) : titre, sous-titre, 4 cartes "Cosa ottieni" (punteggio di maturità, radar per area, priorità d'intervento, report PDF scaricabile), section "A chi è rivolto", mention "12 domande · circa 5 minuti", bouton "Inizia la valutazione". Logo Atex Italia (placeholder /public/logo-atex-italia.svg que je remplacerai).
2. **Questionnaire** (/valutazione) : une question par écran, barre de progression avec le nom de l'area, bouton Indietro, réponses en grandes cartes cliquables (navigation clavier OK). État conservé en sessionStorage (try/catch) pour ne rien perdre en cas de rechargement.
3. **Formulaire lead** (avant les résultats) : nome, cognome, email aziendale (refuser gmail/hotmail/yahoo/outlook/libero/icloud… avec un message gentil), azienda, ruolo, settore (select), paese (select, Italia par défaut), telefono (facultatif), case privacy obligatoire avec lien vers https://www.atexitalia.it/privacy (à paramétrer), case newsletter FACULTATIVE et séparée. Honeypot caché + Turnstile.
4. **Résultats** (/risultati/[id]) :
   - score global en % + niveau : 0–39 Critico, 40–64 Da migliorare, 65–84 Buono, 85–100 Eccellente
   - radar des 6 aree
   - les 3 aree les plus faibles avec une recommandation concrète + le servizio Atex Italia associé
   - CTA "Parla con un esperto" (mailto vers une adresse en variable d'env) et "Scarica il report PDF"
   - avertissement bien visible : "Punteggio indicativo basato sulle risposte fornite. Non costituisce una valutazione di conformità né sostituisce le verifiche previste dalla normativa."
   L'id dans l'URL est un UUID non devinable ; la page ne montre que le score, jamais les données personnelles.

## Contenu (fichier src/config/questions.ts)
6 aree × 2 domande = 12 questions, 4 réponses par question avec poids 0 / 1 / 2 / 3 (0 = situation à risque, 3 = bonne pratique). Ajoute une réponse "Non so" valant 0 quand c'est pertinent : ne pas savoir est un signal en soi.
Aree :
1. Classificazione delle aree e documentazione (classificazione zone, DPCE / documento sulla protezione contro le esplosioni, aggiornamento)
2. Conformità delle apparecchiature (marcatura ATEX/IECEx, categoria/EPL, gruppo gas/polveri, classe di temperatura adeguati alla zona)
3. Installazione (EN/IEC 60079-14, scelta dei modi di protezione, documentazione d'impianto)
4. Verifiche e ispezioni (EN/IEC 60079-17, ispezioni iniziali/periodiche, registri)
5. Manutenzione, riparazione e gestione delle modifiche (EN/IEC 60079-19, ricambi, gestione del cambiamento)
6. Competenza del personale (formazione Ex, qualifiche, aggiornamento)
Rédige une première version réaliste et professionnelle en italien. Les questions seront relues par notre équipe technique : garde-les dans ce fichier de config, avec pour chaque area : titre, description courte, recommandation si score faible, servizio Atex Italia associé, URL de destination (placeholder).
Ajoute un champ `version` (ex. "1.0") à la config, enregistré avec chaque lead.

## Calcul
- score area = somme des poids / max possible × 100
- score global = moyenne des 6 aree
- calcul dans un module pur (src/lib/scoring.ts) avec tests unitaires (Vitest)
- le score est RECALCULÉ côté serveur à partir des réponses brutes (ne jamais faire confiance au score envoyé par le client)

## Envoi du lead vers le CRM
Route API POST /api/lead (runtime Node) :
1. vérifie le token Turnstile côté serveur
2. rejette si honeypot rempli
3. valide le corps avec Zod
4. anti-abus simple : refuse si le même email a soumis il y a moins de 2 minutes (requête sur la table)
5. recalcule les scores
6. insère dans la table Supabase `quiz_leads` avec la clé service_role (variable SUPABASE_SERVICE_ROLE_KEY, jamais exposée au client, pas de préfixe NEXT_PUBLIC)
7. renvoie l'id du résultat
En cas d'échec Supabase : message d'erreur clair à l'utilisateur et log serveur, sans perdre ses réponses.

Migration SQL à fournir (supabase/migrations/xxxx_quiz_leads.sql), table `public.quiz_leads` :
id uuid pk default gen_random_uuid(), created_at timestamptz default now(),
nome, cognome, email, azienda, ruolo, settore, paese, telefono (text),
risposte jsonb, punteggio_totale int, punteggi_area jsonb, livello text,
consenso_privacy boolean not null, consenso_newsletter boolean default false,
utm_source, utm_medium, utm_campaign, utm_content, referrer (text),
versione_quiz text, user_agent text,
stato text default 'nuovo' (nuovo / in_lavorazione / convertito / scartato) — pour le suivi dans Nexo,
crm_contatto_id uuid null (rempli plus tard par Nexo).
RLS activée, AUCUNE policy publique (seule la service_role écrit/lit). Index sur created_at et email.
Pour la page résultats publique : une fonction ou requête serveur qui ne renvoie que les scores et le niveau à partir de l'id.

Récupère les UTM et le referrer à l'arrivée sur la landing et garde-les jusqu'à la soumission.

## Design
- Sobre, industriel, crédible : fond sombre #0E1013, surfaces #1A1D22, texte off-white, accent rouge Atex #EC0B0B
- Police Be Vietnam Pro AUTO-HÉBERGÉE via next/font/local (pas d'appel aux serveurs Google, RGPD) — prévois le dossier, je fournirai les fichiers si besoin, sinon utilise next/font/google qui auto-héberge au build
- Mobile first, accessible (contrastes AA, focus visibles, labels, aria sur la progression)
- Animations discrètes, respecter prefers-reduced-motion
- Pas de cookies de tracking ; pas de bannière nécessaire tant qu'on n'ajoute pas d'analytics

## SEO / sécurité
- metadata italiennes, Open Graph, favicon
- `robots: noindex` tant que la variable NEXT_PUBLIC_INDEXABLE n'est pas "true"
- headers de sécurité dans next.config (CSP adaptée à Turnstile, X-Frame-Options, Referrer-Policy)
- .env.example complet ; .env.local dans .gitignore

## Livrables
- le projet complet et lançable (`npm run dev`)
- tests du scoring
- README en français : installation, variables d'environnement, exécution de la migration dans Supabase, création du widget Turnstile, déploiement Vercel, ajout du domaine quiz.atexitalia.it dans Vercel puis CNAME `quiz` dans SiteGround (Site Tools → Domain → DNS Zone Editor, PAS le menu Subdomains)

## Phases (arrête-toi après chacune)
1. Arborescence du projet + src/config/questions.ts complet (je le fais valider par l'équipe)
2. Scoring + tests
3. Landing + questionnaire + résultats avec données fictives (sans backend)
4. Formulaire + Turnstile + route API + migration SQL
5. PDF du rapport
6. README, vérification complète (lint, typecheck, tests, build) et checklist de mise en ligne

Commence par la phase 1.