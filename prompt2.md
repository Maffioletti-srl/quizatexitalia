Dans Nexo, ajoute la réception des leads de la scorecard publique quiz.atexitalia.it. La table public.quiz_leads existe déjà dans notre Supabase (colonnes : id, created_at, nome, cognome, email, azienda, ruolo, settore, paese, telefono, risposte jsonb, punteggio_totale, punteggi_area jsonb, livello, consenso_privacy, consenso_newsletter, utm_*, referrer, versione_quiz, stato, crm_contatto_id).

À faire :
1. Une page "Lead quiz" dans la section Vendite, sous le tenant Atex Italia : liste triable/filtrable (date, livello, settore, stato), badge "nuovo", fiche détail avec le score, les 6 punteggi_area et les réponses lisibles.
2. Bouton "Converti in contatto" : crée ou rattache le Contatto et l'Azienda (rapprochement par email et dominio), remplit crm_contatto_id, passe stato à 'convertito'.
3. Changement de stato depuis la fiche.
4. Compteur des nouveaux leads dans la sidebar.
5. Si consenso_newsletter = true : prévoir l'ajout à la liste Atex Italia de listmonk (réutilise l'intégration existante si elle est en place, sinon laisse un TODO clair).
Respecte les conventions existantes du repo (auth, rôles, structure des modules). Montre-moi le plan avant de coder.