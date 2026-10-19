import type { ContentTranslation } from "./types";

/** Contenu métier — traduction française de config/questions.ts. */
export const fr: ContentTranslation = {
  unknownLabel: "Je ne sais pas",
  areas: {
    classificazione: {
      title: "Classement des zones et documentation",
      shortTitle: "Classement",
      description:
        "Classement des zones dangereuses gaz et poussières et Document relatif à la protection contre les explosions (DRPCE), tenus à jour.",
      recommendation:
        "Vérifiez que le classement des zones couvre toutes les substances inflammables (gaz, vapeurs et poussières) selon les EN/IEC 60079-10-1 et 60079-10-2, et que le DRPCE est révisé à chaque modification de l'installation, du procédé ou des substances. C'est la base dont dépendent le choix du matériel et le plan d'inspection.",
      service: {
        name: "Assistance technique au classement des zones et au DRPCE",
        description:
          "Accompagnement dans la révision du classement des zones et la mise à jour du document relatif à la protection contre les explosions.",
      },
    },
    apparecchiature: {
      title: "Conformité du matériel",
      shortTitle: "Matériel",
      description:
        "Marquage ATEX/IECEx, catégorie/EPL, groupe de gaz ou de poussières et classe de température adaptés à la zone d'installation.",
      recommendation:
        "Constituez un registre du matériel Ex (Ex register) qui compare, pour chaque équipement, le marquage aux exigences de la zone : catégorie/EPL, groupe IIA/IIB/IIC ou IIIA/IIIB/IIIC, classe de température et plage de température ambiante. Remplacez en priorité le matériel non certifié ou non adapté.",
      service: {
        name: "Produits certifiés Ex",
        description:
          "Une large gamme de matériels et de composants certifiés ATEX/IECEx, avec une aide au choix selon la zone, le groupe et la classe de température.",
      },
    },
    installazione: {
      title: "Installation",
      shortTitle: "Installation",
      description:
        "Conception et réalisation des installations selon l'EN/IEC 60079-14 : modes de protection, câbles et presse-étoupes, documentation de l'installation.",
      recommendation:
        "Appuyez la conception et l'installation sur l'EN/IEC 60079-14 : choix justifié des modes de protection, systèmes d'entrée de câbles certifiés, vérification des systèmes de sécurité intrinsèque. Rassemblez dans un dossier unique la documentation de l'installation (classement, certificats, notices, schémas) et rendez-la accessible aux intervenants.",
      service: {
        name: "Solutions Custom Ex",
        description:
          "Armoires, boîtes et systèmes conçus sur mesure et certifiés pour les zones dangereuses, avec une documentation complète pour le dossier de l'installation.",
      },
    },
    verifiche: {
      title: "Vérifications et inspections",
      shortTitle: "Vérifications",
      description:
        "Inspections initiales et périodiques selon l'EN/IEC 60079-17, vérifications réglementaires obligatoires et suivi des non-conformités.",
      recommendation:
        "Définissez un plan d'inspection selon l'EN/IEC 60079-17 (inspection initiale, inspections périodiques visuelles, rapprochées et détaillées) avec des intervalles justifiés, respectez les échéances des vérifications périodiques obligatoires prévues par la réglementation nationale et suivez chaque non-conformité jusqu'à sa levée.",
      service: {
        name: "Vérifications et inspections Ex",
        description:
          "Inspection des installations en atmosphère explosive selon l'EN/IEC 60079-17, avec rapport détaillé et plan d'actions correctives.",
      },
    },
    manutenzione: {
      title: "Maintenance, réparation et gestion des modifications",
      shortTitle: "Maintenance",
      description:
        "Réparation et révision selon l'EN/IEC 60079-19, pièces de rechange adaptées et gestion des modifications dans les zones classées.",
      recommendation:
        "Confiez la réparation et la révision du matériel Ex à des ateliers qualifiés selon l'EN/IEC 60079-19, utilisez uniquement les pièces de rechange prévues par le fabricant et mettez en place une procédure de gestion des modifications (MOC) qui évalue l'impact sur le risque d'explosion avant toute intervention.",
      service: {
        name: "Assistance, pièces de rechange et réparations Ex",
        description:
          "Pièces de rechange d'origine, assistance technique et interventions sur le matériel Ex dans le respect de la certification.",
      },
    },
    competenza: {
      title: "Compétence du personnel",
      shortTitle: "Compétence",
      description:
        "Formation Ex, qualifications et mise à niveau du personnel interne et des entreprises extérieures.",
      recommendation:
        "Recensez les personnes qui conçoivent, installent, inspectent ou entretiennent les installations Ex et prévoyez pour chacune une formation spécifique avec recyclage périodique. Vérifiez les compétences Ex des entreprises extérieures avant de leur confier des travaux.",
      service: {
        name: "Atex Italia Academy",
        description:
          "Formations sur les atmosphères explosives pour techniciens, agents de maintenance, concepteurs et responsables HSE.",
      },
    },
  },
  questions: {
    q1: {
      text: "Les emplacements à risque d'explosion de votre installation sont-ils classés en zones (0/1/2 pour les gaz, 20/21/22 pour les poussières) ?",
      hint: "Références : EN/IEC 60079-10-1 (gaz) et EN/IEC 60079-10-2 (poussières).",
      options: {
        "q1-a": "Oui, pour tous les emplacements et toutes les substances, avec des plans à jour",
        "q1-b": "Oui, mais certains emplacements ou substances (par exemple les poussières) ne sont pas couverts",
        "q1-c": "Un classement existe, mais il est ancien ou ne se réfère pas aux normes en vigueur",
        "q1-d": "Non, les zones n'ont pas été formellement classées",
      },
    },
    q2: {
      text: "Le Document relatif à la protection contre les explosions (DRPCE) est-il à jour ?",
      hint: "Exigé par l'article 8 de la directive 1999/92/CE (ATEX « lieux de travail »), il fait partie intégrante de l'évaluation des risques (document unique).",
      options: {
        "q2-a": "Oui, et il est révisé à chaque modification de l'installation, du procédé ou des substances",
        "q2-b": "Il a été mis à jour récemment, mais pas systématiquement après les modifications",
        "q2-c": "Il existe, mais n'a pas été révisé depuis plusieurs années",
        "q2-d": "Nous n'avons pas de DRPCE",
      },
    },
    q3: {
      text: "Le matériel installé dans les zones classées est-il adapté à la zone (marquage ATEX/IECEx, catégorie/EPL, groupe, classe de température) ?",
      options: {
        "q3-a": "Oui, vérifié pour chaque équipement et consigné dans un registre dédié",
        "q3-b": "Globalement oui, mais la vérification n'a pas été faite sur tout le matériel",
        "q3-c": "Seulement pour le matériel récent ; pour le plus ancien, nous n'avons pas de certitude",
        "q3-d": "Nous savons qu'il existe du matériel non certifié ou non adapté à la zone",
      },
    },
    q4: {
      text: "Comment choisissez-vous le matériel neuf et les pièces de rechange destinés aux zones Ex ?",
      options: {
        "q4-a": "Avec une spécification technique fondée sur le classement (zone, groupe, classe T, température ambiante) et un contrôle des certificats",
        "q4-b": "Nous nous fions au fournisseur et contrôlons le marquage à la livraison",
        "q4-c": "Nous nous fions au fournisseur, sans contrôle spécifique",
        "q4-d": "Le prix et la disponibilité priment ; la conformité Ex n'est pas toujours vérifiée",
      },
    },
    q5: {
      text: "Les installations en zones Ex sont-elles conçues et réalisées selon l'EN/IEC 60079-14 ?",
      hint: "Choix des modes de protection, câbles et presse-étoupes, systèmes de sécurité intrinsèque, vérification initiale.",
      options: {
        "q5-a": "Oui, avec un projet, des installateurs qualifiés Ex et une vérification initiale documentée",
        "q5-b": "Oui, mais la qualification Ex des installateurs (y compris externes) n'est pas toujours vérifiée",
        "q5-c": "Nous suivons les règles générales d'installation, avec une prise en compte Ex seulement partielle",
        "q5-d": "Il n'y a pas de référence spécifique à l'EN/IEC 60079-14",
      },
    },
    q6: {
      text: "La documentation de l'installation pour les zones Ex est-elle disponible (classement, certificats, notices, schémas, calculs des circuits de sécurité intrinsèque) ?",
      options: {
        "q6-a": "Oui, dans un dossier complet et à jour, consultable par les intervenants",
        "q6-b": "L'essentiel existe, mais il est dispersé ou pas toujours à jour",
        "q6-c": "Seulement en partie (par exemple les certificats de certains équipements)",
        "q6-d": "Non, la documentation Ex de l'installation n'est pas disponible",
      },
    },
    q7: {
      text: "Réalisez-vous des inspections spécifiques des installations Ex selon l'EN/IEC 60079-17 ?",
      hint: "Inspection initiale et inspections périodiques, visuelles, rapprochées ou détaillées.",
      options: {
        "q7-a": "Oui, avec un plan d'inspection défini, des intervalles justifiés et des niveaux d'inspection adaptés",
        "q7-b": "Oui, périodiquement, mais sans plan formalisé selon la norme",
        "q7-c": "Seulement de manière occasionnelle ou à la suite de pannes",
        "q7-d": "Non, nous ne réalisons pas d'inspections spécifiques Ex",
      },
    },
    q8: {
      text: "Les vérifications périodiques obligatoires prévues par la réglementation nationale sont-elles à jour, et les non-conformités relevées sont-elles traitées ?",
      options: {
        "q8-a": "Oui : vérifications à jour, registres tenus et non-conformités levées avec des actions tracées",
        "q8-b": "Les vérifications sont à jour, mais la levée des non-conformités n'est pas toujours tracée",
        "q8-c": "Les vérifications sont en retard ou les registres sont incomplets",
        "q8-d": "Nous ne réalisons pas les vérifications périodiques obligatoires",
      },
    },
    q9: {
      text: "La réparation et la révision du matériel Ex sont-elles effectuées selon l'EN/IEC 60079-19 ?",
      options: {
        "q9-a": "Oui, par le fabricant ou par des ateliers qualifiés, avec des pièces d'origine et un rapport de réparation",
        "q9-b": "En général oui, mais nous intervenons parfois en interne sans procédure spécifique",
        "q9-c": "La maintenance interne les répare comme du matériel standard",
        "q9-d": "Nous ne faisons pas de distinction entre matériel Ex et non Ex en maintenance",
      },
    },
    q10: {
      text: "Comment gérez-vous les modifications dans les zones classées (nouveau matériel, remplacements, changements de procédé ou de substances) ?",
      options: {
        "q10-a": "Avec une procédure de gestion des modifications qui évalue l'impact Ex et met à jour le classement et le DRPCE",
        "q10-b": "Nous évaluons les modifications importantes, pas les mineures (remplacements, petites interventions)",
        "q10-c": "Au cas par cas, sans procédure formalisée",
        "q10-d": "Les modifications ne sont pas évaluées sous l'angle du risque d'explosion",
      },
    },
    q11: {
      text: "Le personnel qui conçoit, installe, inspecte ou entretient les installations Ex a-t-il reçu une formation spécifique ?",
      options: {
        "q11-a": "Oui, une formation Ex structurée, avec recyclage périodique et registre des compétences",
        "q11-b": "Oui, mais pas pour toutes les fonctions concernées ou sans recyclage périodique",
        "q11-c": "Seulement une formation générale à la sécurité, avec quelques notions ATEX",
        "q11-d": "Aucune formation spécifique Ex",
      },
    },
    q12: {
      text: "Les compétences Ex du personnel interne et des entreprises extérieures sont-elles vérifiées et documentées ?",
      hint: "Par exemple certificats IECEx CoPC ou qualifications conformes aux EN/IEC 60079-14, -17 et -19.",
      options: {
        "q12-a": "Oui, pour le personnel interne comme pour les entreprises extérieures, avant de confier les travaux",
        "q12-b": "Seulement pour le personnel interne",
        "q12-c": "Nous nous fions aux déclarations des entreprises, sans vérification",
        "q12-d": "Les compétences Ex ne sont pas un critère de sélection",
      },
    },
    q13: {
      text: "Les poussières combustibles présentes (par exemple farines, sucre, bois, poussières métalliques ou plastiques) ont-elles été prises en compte dans l'évaluation du risque d'explosion ?",
      hint: "Référence : EN/IEC 60079-10-2.",
      options: {
        "q13-a": "Oui, avec une caractérisation des poussières (énergie minimale d'inflammation, températures d'inflammation en nuage et en couche, Kst) et un classement en zones 20/21/22",
        "q13-b": "Oui, mais sans données de laboratoire sur les caractéristiques des poussières",
        "q13-c": "Seulement pour les emplacements les plus évidents (silos, filtres), pas pour les dépôts et les couches",
        "q13-d": "Non, le risque lié aux poussières n'a pas été évalué",
      },
    },
    q14: {
      text: "Pour le classement, disposez-vous des caractéristiques de sécurité des substances (point d'éclair, limites d'explosivité, température d'auto-inflammation, groupe) ?",
      options: {
        "q14-a": "Oui, issues des fiches de données de sécurité ou de bases de données reconnues, réunies dans une liste des substances à jour",
        "q14-b": "Oui, mais pas pour toutes les substances ou pas toujours à jour",
        "q14-c": "Nous avons les fiches de données de sécurité, mais les paramètres utiles au classement n'en ont pas été extraits",
        "q14-d": "Non, ces informations ne sont pas recueillies",
      },
    },
    q15: {
      text: "Les sources de dégagement (brides, garnitures d'étanchéité, vannes, évents, points de chargement) ont-elles été identifiées et caractérisées (degré de dégagement, débit, ventilation) ?",
      hint: "La méthode de l'EN/IEC 60079-10-1 part des sources de dégagement pour définir le type et l'étendue des zones.",
      options: {
        "q15-a": "Oui, avec une liste des sources et des calculs documentés pour chacune",
        "q15-b": "Oui, mais l'étendue des zones a été estimée sans calcul",
        "q15-c": "Les zones ont été définies par jugement, sans analyse des sources",
        "q15-d": "Non, aucune analyse des sources de dégagement n'a été réalisée",
      },
    },
    q16: {
      text: "Les accès aux emplacements à risque d'explosion sont-ils signalés sur place ?",
      hint: "Panneau d'avertissement triangulaire « EX » prévu par la directive 1999/92/CE (annexe III).",
      options: {
        "q16-a": "Oui, à tous les accès, avec une signalisation cohérente avec les plans de classement",
        "q16-b": "Oui, mais pas à tous les accès ou pas mise à jour après les modifications",
        "q16-c": "Seulement dans certains emplacements",
        "q16-d": "Non, les emplacements ne sont pas signalés",
      },
    },
    q17: {
      text: "La ventilation (naturelle ou artificielle) sur laquelle repose le classement est-elle documentée et surveillée ?",
      options: {
        "q17-a": "Oui : degré et disponibilité de la ventilation sont documentés, avec alarmes ou asservissements en cas de défaillance de la ventilation artificielle",
        "q17-b": "Elle est documentée dans le classement, mais n'est pas contrôlée dans le temps",
        "q17-c": "La ventilation n'a été prise en compte que de manière qualitative",
        "q17-d": "La ventilation n'a pas été prise en compte dans le classement",
      },
    },
    q18: {
      text: "Le DRPCE décrit-il, pour chaque emplacement, les mesures de prévention et de protection adoptées (inertage, détection de gaz, maîtrise des sources d'inflammation, évents ou suppression d'explosion) ?",
      options: {
        "q18-a": "Oui, emplacement par emplacement, avec les responsables et les modalités de vérification de chaque mesure",
        "q18-b": "Oui, mais de manière générique, sans lien avec chaque emplacement",
        "q18-c": "Seulement en partie",
        "q18-d": "Non, les mesures ne sont pas décrites",
      },
    },
    q19: {
      text: "Le risque d'inflammation dû à l'électricité statique (transvasements, fûts, convoyeurs à bande, tuyauteries en plastique, vêtements) a-t-il été évalué ?",
      hint: "Référence : IEC/TS 60079-32-1.",
      options: {
        "q19-a": "Oui, avec des mesures documentées (liaisons équipotentielles et mises à la terre vérifiées, matériaux dissipatifs, chaussures et vêtements antistatiques)",
        "q19-b": "Oui, mais seulement pour certaines opérations (par exemple les transvasements de solvants)",
        "q19-c": "Nous nous limitons à la mise à la terre des principales parties métalliques",
        "q19-d": "Non, l'électricité statique n'a pas été prise en compte",
      },
    },
    q20: {
      text: "Qui a réalisé le classement des zones et le DRPCE ?",
      options: {
        "q20-a": "Un groupe de travail aux compétences Ex documentées, associant la production, la maintenance et le HSE",
        "q20-b": "Un consultant externe qualifié, avec une implication limitée du personnel interne",
        "q20-c": "Une personne interne sans formation Ex spécifique",
        "q20-d": "Ils ont été repris d'un autre site ou d'un modèle, sans adaptation à l'installation",
      },
    },
    q21: {
      text: "Le classement tient-il compte aussi des opérations non courantes (démarrages, arrêts, nettoyages, maintenance, prélèvements d'échantillons) ?",
      options: {
        "q21-a": "Oui, chaque mode de fonctionnement a été analysé et les mesures temporaires sont définies",
        "q21-b": "Seulement les opérations non courantes les plus fréquentes",
        "q21-c": "Non, il ne considère que le fonctionnement normal",
        "q21-d": "Non, et les opérations non courantes se déroulent sans mesures spécifiques",
      },
    },
    q22: {
      text: "Existe-t-il un registre du matériel Ex indiquant, pour chaque équipement, le marquage, le numéro de certificat et la zone d'installation ?",
      options: {
        "q22-a": "Oui, complet, à jour et lié au plan d'inspection",
        "q22-b": "Oui, mais il ne couvre pas tout le matériel ou n'est pas à jour",
        "q22-c": "Il n'existe que des listes partielles (par exemple seulement les moteurs ou seulement l'instrumentation)",
        "q22-d": "Non, il n'existe pas de registre",
      },
    },
    q23: {
      text: "Le matériel non électrique installé dans les zones classées (pompes, réducteurs, ventilateurs, accouplements, freins) est-il adapté à une utilisation en atmosphère explosive ?",
      hint: "La directive 2014/34/UE s'applique aussi au matériel non électrique (EN ISO 80079-36 et -37).",
      options: {
        "q23-a": "Oui, vérifié pour tout le matériel, avec marquage et documentation disponibles",
        "q23-b": "Oui pour le matériel récent ; pas toujours pour le plus ancien",
        "q23-c": "Nous avons vérifié uniquement le matériel électrique",
        "q23-d": "Non, le matériel non électrique n'a pas été pris en compte",
      },
    },
    q24: {
      text: "Pour le matériel dont le certificat porte le suffixe « X », respectez-vous les conditions spécifiques d'utilisation ?",
      hint: "Le suffixe « X » signale des conditions particulières d'utilisation sûre, indiquées dans le certificat et la notice.",
      options: {
        "q24-a": "Oui, les conditions sont identifiées, communiquées aux installateurs et contrôlées lors des inspections",
        "q24-b": "Nous les connaissons seulement pour le matériel principal",
        "q24-c": "Les certificats sont rarement consultés",
        "q24-d": "Non, les conditions spécifiques ne sont pas prises en compte",
      },
    },
    q25: {
      text: "Les armoires, boîtes et ensembles réalisés sur mesure pour les zones Ex sont-ils certifiés ou évalués en tant qu'ensemble ?",
      options: {
        "q25-a": "Oui, avec un certificat ou une déclaration de conformité de l'ensemble et la documentation technique correspondante",
        "q25-b": "Les composants sont certifiés individuellement, mais l'ensemble n'a pas été évalué",
        "q25-c": "Les modifications et ajouts sont réalisés en interne, sans évaluation",
        "q25-d": "Des armoires ou boîtes non Ex sont présentes dans les zones classées",
      },
    },
    q26: {
      text: "La classe de température (ou la température de surface maximale, pour les poussières) du matériel est-elle comparée à la température d'inflammation des substances présentes ?",
      options: {
        "q26-a": "Oui, systématiquement, y compris pour les couches de poussière et avec les marges de sécurité prévues par les normes",
        "q26-b": "Oui pour les gaz, pas toujours pour les poussières",
        "q26-c": "Seulement à l'achat, sans vérification du matériel existant",
        "q26-d": "Non, la comparaison n'est pas faite",
      },
    },
    q27: {
      text: "Le matériel est-il adapté à la température ambiante réelle du lieu d'installation (exposition au soleil, proximité de fours ou de tuyauteries chaudes) ?",
      hint: "Sauf indication contraire dans le marquage, le matériel est prévu pour une température ambiante de −20 à +40 °C.",
      options: {
        "q27-a": "Oui, la température réelle a été vérifiée et comparée à la plage indiquée dans le marquage",
        "q27-b": "Nous le vérifions seulement dans les cas évidents",
        "q27-c": "Nous considérons toujours la plage standard de −20 à +40 °C",
        "q27-d": "Cela n'a jamais été vérifié",
      },
    },
    q28: {
      text: "Les appareils portatifs utilisés dans les zones classées (détecteurs de gaz, lampes, radios, téléphones, tablettes, outils électriques) sont-ils adaptés à la zone ?",
      options: {
        "q28-a": "Oui : uniquement des appareils certifiés pour la zone, avec une règle écrite et des contrôles",
        "q28-b": "Une règle existe, mais elle n'est pas toujours respectée (par exemple pour les téléphones personnels)",
        "q28-c": "Seuls les détecteurs de gaz sont certifiés",
        "q28-d": "Il n'existe aucune règle spécifique",
      },
    },
    q29: {
      text: "À la réception du matériel Ex, vérifiez-vous sa conformité à la commande (marquage, certificat, notice, déclaration UE de conformité) ?",
      options: {
        "q29-a": "Oui, avec un contrôle documenté et l'archivage des documents dans le dossier de l'installation",
        "q29-b": "Nous contrôlons le marquage, mais pas toujours les documents",
        "q29-c": "Le contrôle dépend de la personne qui réceptionne le matériel",
        "q29-d": "Aucun contrôle n'est fait à la réception",
      },
    },
    q30: {
      text: "Les systèmes de détection de gaz utilisés comme mesure de protection sont-ils adaptés et maintenus en bon état de fonctionnement ?",
      hint: "Détecteurs conformes à l'EN/IEC 60079-29-1, choisis et installés selon l'EN/IEC 60079-29-2.",
      options: {
        "q30-a": "Oui : détecteurs certifiés, étalonnages périodiques et actions automatiques documentées",
        "q30-b": "Oui, mais les étalonnages et les essais fonctionnels ne sont pas toujours réguliers",
        "q30-c": "Il y a des détecteurs, mais sans logique d'action définie",
        "q30-d": "Il n'y a pas de système de détection là où il serait nécessaire",
      },
    },
    q31: {
      text: "Les systèmes d'entrée de câbles (presse-étoupes, bouchons, adaptateurs) sont-ils certifiés et compatibles avec le mode de protection de l'enveloppe ?",
      hint: "Par exemple des presse-étoupes Ex d sur des enveloppes Ex d et des bouchons certifiés sur les entrées non utilisées.",
      options: {
        "q31-a": "Oui, vérifié à l'installation et lors des inspections",
        "q31-b": "En général oui, mais nous en trouvons des non conformes lors des inspections",
        "q31-c": "Nous utilisons les presse-étoupes disponibles en stock",
        "q31-d": "Ce n'est pas un point contrôlé",
      },
    },
    q32: {
      text: "Les circuits de sécurité intrinsèque (Ex i) sont-ils vérifiés par un calcul ou un document descriptif du système ?",
      hint: "Références : EN/IEC 60079-14 et EN/IEC 60079-25.",
      options: {
        "q32-a": "Oui, pour chaque circuit : paramètres des barrières, des câbles et des instruments comparés et archivés",
        "q32-b": "Seulement pour les circuits les plus récents",
        "q32-c": "Nous nous fions aux barrières, sans calcul",
        "q32-d": "Non, les circuits ne sont pas vérifiés",
      },
    },
    q33: {
      text: "Les câbles posés dans les zones classées sont-ils choisis selon les prescriptions de l'EN/IEC 60079-14 (type, protection mécanique, non-propagation de la flamme) ?",
      options: {
        "q33-a": "Oui, avec des critères de choix documentés et vérifiés",
        "q33-b": "Oui sur les installations neuves, non vérifié sur les existantes",
        "q33-c": "Nous utilisons les mêmes câbles que dans les emplacements non classés",
        "q33-d": "Il n'y a aucun critère spécifique",
      },
    },
    q34: {
      text: "Sur les enveloppes antidéflagrantes (Ex d), les prescriptions d'installation sont-elles respectées (joints sans obstruction, vis d'origine, aucun perçage non prévu) ?",
      options: {
        "q34-a": "Oui, vérifié lors de l'inspection initiale et à chaque inspection",
        "q34-b": "En général oui, avec des exceptions connues non encore résolues",
        "q34-c": "Des modifications (perçages, remplacement de vis) ont été faites sans vérification",
        "q34-d": "Ce n'est pas un point vérifié",
      },
    },
    q35: {
      text: "La mise à la terre et les liaisons équipotentielles dans les zones classées sont-elles conçues et vérifiées ?",
      options: {
        "q35-a": "Oui, avec un projet, des mesures documentées et des vérifications périodiques",
        "q35-b": "Elles ne sont vérifiées qu'à l'occasion des vérifications périodiques réglementaires",
        "q35-c": "Elles existent, mais sans documentation",
        "q35-d": "Non, elles ne sont ni conçues ni vérifiées",
      },
    },
    q36: {
      text: "L'inspection initiale (inspection détaillée avant la mise en service) est-elle réalisée et documentée pour chaque nouvelle installation et chaque modification ?",
      hint: "Prévue par les EN/IEC 60079-14 et 60079-17.",
      options: {
        "q36-a": "Oui, toujours, avec un rapport signé par du personnel qualifié",
        "q36-b": "Oui pour les nouvelles installations, pas toujours pour les modifications",
        "q36-c": "Seulement un essai de fonctionnement, sans contrôle spécifique Ex",
        "q36-d": "Non, elle n'est pas réalisée",
      },
    },
    q37: {
      text: "Les installations temporaires dans les zones classées (chantiers, maintenance, matériel de location) suivent-elles les mêmes règles que les installations fixes ?",
      options: {
        "q37-a": "Oui, avec autorisation, vérification Ex avant utilisation et permis de travail",
        "q37-b": "Oui, mais sans vérification Ex systématique",
        "q37-c": "Seulement pour les travaux les plus importants",
        "q37-d": "Non, les installations temporaires ne sont pas contrôlées",
      },
    },
    q38: {
      text: "Le matériel installé est-il protégé contre les influences externes (corrosion, vibrations, chocs, rayonnement UV, eau, poussières) comme l'exige la notice du fabricant ?",
      options: {
        "q38-a": "Oui, les conditions d'environnement sont évaluées, et l'indice IP et la protection mécanique sont adaptés",
        "q38-b": "En général oui, mais certains équipements présentent des signes de dégradation",
        "q38-c": "Nous intervenons seulement après les pannes",
        "q38-d": "Ce n'est pas un critère pris en compte à l'installation",
      },
    },
    q39: {
      text: "Les intervalles entre inspections périodiques sont-ils définis et justifiés (type de matériel, environnement, historique des défaillances) ?",
      hint: "L'EN/IEC 60079-17 recommande de ne pas dépasser 3 ans entre deux inspections périodiques sans évaluation par des experts.",
      options: {
        "q39-a": "Oui, avec des intervalles justifiés et révisés selon les résultats des inspections",
        "q39-b": "Oui, mais avec un intervalle fixe identique pour tout le matériel",
        "q39-c": "Les inspections sont faites quand le temps le permet",
        "q39-d": "Aucun intervalle n'est défini",
      },
    },
    q40: {
      text: "Les inspections Ex suivent-elles des listes de contrôle spécifiques à chaque mode de protection (Ex d, Ex e, Ex i, Ex p, Ex t…) ?",
      options: {
        "q40-a": "Oui, les listes de contrôle de l'EN/IEC 60079-17, adaptées à l'installation",
        "q40-b": "Une liste de contrôle générique, identique pour tout le matériel",
        "q40-c": "Aucune liste : le contrôle repose sur l'expérience de l'inspecteur",
        "q40-d": "Les inspections ne sont pas documentées",
      },
    },
    q41: {
      text: "Les résultats des inspections sont-ils enregistrés de façon à retracer l'historique de chaque équipement ?",
      options: {
        "q41-a": "Oui, dans une base de données ou un logiciel lié au registre du matériel Ex",
        "q41-b": "Dans des rapports archivés, mais difficiles à consulter équipement par équipement",
        "q41-c": "Seules les anomalies sont notées",
        "q41-d": "Non, les résultats ne sont pas enregistrés",
      },
    },
    q42: {
      text: "Les non-conformités critiques pour la sécurité (enveloppe Ex d endommagée, presse-étoupe manquant, couvercle ouvert) entraînent-elles une mise hors service immédiate ?",
      options: {
        "q42-a": "Oui : les non-conformités sont classées par gravité, avec des actions immédiates définies",
        "q42-b": "Oui, mais la décision est laissée à l'appréciation de l'inspecteur",
        "q42-c": "Elles sont notées et corrigées au premier arrêt possible",
        "q42-d": "Non, l'équipement reste en service",
      },
    },
    q43: {
      text: "Les inspections Ex couvrent-elles aussi le matériel non électrique (accouplements, roulements, courroies, températures de surface) ?",
      options: {
        "q43-a": "Oui, avec des contrôles spécifiques intégrés au plan d'inspection",
        "q43-b": "Seulement dans le cadre de la maintenance courante, sans critères Ex",
        "q43-c": "Rarement",
        "q43-d": "Non, les inspections Ex ne concernent que l'installation électrique",
      },
    },
    q44: {
      text: "Réalisez-vous des inspections exceptionnelles après des événements particuliers (foudre, inondation, incendie, chocs, longs arrêts de l'installation) ?",
      options: {
        "q44-a": "Oui, un contrôle exceptionnel documenté est prévu",
        "q44-b": "Seulement si l'événement a causé des dommages visibles",
        "q44-c": "Rarement",
        "q44-d": "Non, elles ne sont pas prévues",
      },
    },
    q45: {
      text: "L'état des installations Ex (inspections réalisées, non-conformités ouvertes, retards) est-il analysé par la direction ?",
      options: {
        "q45-a": "Oui, avec des indicateurs périodiques et une revue de direction",
        "q45-b": "Seulement à l'occasion d'audits ou d'incidents",
        "q45-c": "Les données existent, mais ne sont pas analysées",
        "q45-d": "Aucune donnée n'est disponible",
      },
    },
    q46: {
      text: "Avant de commencer, les inspecteurs disposent-ils de la documentation nécessaire (classement des zones, certificats, notices, rapports précédents) ?",
      hint: "L'EN/IEC 60079-17 exige que cette documentation soit disponible et à jour.",
      options: {
        "q46-a": "Oui, dans un dossier à jour mis à disposition avant chaque campagne",
        "q46-b": "En partie : la documentation doit souvent être reconstituée",
        "q46-c": "Seulement le classement des zones",
        "q46-d": "Non, les inspecteurs travaillent sans documentation",
      },
    },
    q47: {
      text: "Un permis de travail est-il prévu pour les travaux dans les zones classées (en particulier pour les travaux par point chaud) ?",
      options: {
        "q47-a": "Oui, avec analyse des risques, mesure de l'atmosphère et autorisation formelle avant chaque intervention",
        "q47-b": "Oui, mais seulement pour les travaux par point chaud",
        "q47-c": "Un accord verbal est donné",
        "q47-d": "Non, ce n'est pas prévu",
      },
    },
    q48: {
      text: "Les pièces de rechange du matériel Ex (vis, joints, lampes, bornes, verres) sont-elles celles prévues par le fabricant ?",
      options: {
        "q48-a": "Oui, des pièces d'origine ou indiquées dans la notice, gérées en stock avec des références dédiées",
        "q48-b": "En général oui, mais on utilise parfois des pièces jugées équivalentes",
        "q48-c": "Des pièces standard sont utilisées quand les pièces d'origine ne sont pas disponibles",
        "q48-d": "Les pièces de rechange Ex ne sont pas distinguées des pièces standard",
      },
    },
    q49: {
      text: "Le matériel Ex réparé est-il marqué et accompagné d'un rapport de réparation ?",
      hint: "L'EN/IEC 60079-19 prévoit un marquage de réparation et la documentation des interventions.",
      options: {
        "q49-a": "Oui, toujours, et le rapport est archivé avec le registre du matériel",
        "q49-b": "Seulement pour les réparations effectuées à l'extérieur",
        "q49-c": "Rarement",
        "q49-d": "Non",
      },
    },
    q50: {
      text: "Le matériel Ex n'est-il ouvert qu'après mise hors tension et en l'absence d'atmosphère explosive ?",
      options: {
        "q50-a": "Oui, avec des procédures écrites (sectionnement, temps d'attente, contrôle de l'atmosphère)",
        "q50-b": "Oui, mais les procédures ne sont pas écrites",
        "q50-c": "Cela dépend de l'urgence de l'intervention",
        "q50-d": "Aucune règle spécifique n'est prévue",
      },
    },
    q51: {
      text: "Après une intervention, le rétablissement du mode de protection (joints, vis, interstices, presse-étoupes) est-il vérifié avant la remise en service ?",
      options: {
        "q51-a": "Oui, avec une liste de contrôle signée",
        "q51-b": "Oui, mais sans enregistrement",
        "q51-c": "Cela dépend du technicien",
        "q51-d": "Non, ce n'est pas vérifié",
      },
    },
    q52: {
      text: "Les dépôts de poussière sur le matériel et les surfaces dans les zones 21 et 22 sont-ils éliminés régulièrement ?",
      options: {
        "q52-a": "Oui, avec un programme de nettoyage défini et des méthodes adaptées (aspirateurs adaptés à la zone, pas d'air comprimé)",
        "q52-b": "Oui, mais sans fréquences définies",
        "q52-c": "Seulement lors des arrêts",
        "q52-d": "Non, les dépôts de poussière sont fréquents",
      },
    },
    q53: {
      text: "Les modifications apportées à un équipement Ex (perçages supplémentaires, remplacement de composants, changement de lampes ou de moteurs) sont-elles évaluées avant d'être réalisées ?",
      options: {
        "q53-a": "Oui, elles ne sont admises que si elles sont prévues par le certificat ou approuvées par le fabricant",
        "q53-b": "Oui, mais l'évaluation est informelle",
        "q53-c": "Elles sont réalisées si le technicien les juge sûres",
        "q53-d": "Il n'existe aucune règle",
      },
    },
    q54: {
      text: "Avant chaque intervention d'une entreprise extérieure dans les zones classées, les informations sur le risque d'explosion (plans de zonage, règles d'accès, plan de prévention) sont-elles fournies ?",
      options: {
        "q54-a": "Oui, avec une réunion de coordination, une documentation et un permis de travail",
        "q54-b": "Oui, mais uniquement via le plan de prévention général (DUVRI en Italie)",
        "q54-c": "Seulement oralement",
        "q54-d": "Non, aucune information spécifique",
      },
    },
    q55: {
      text: "Une personne responsable de la gestion des installations Ex a-t-elle été désignée ?",
      options: {
        "q55-a": "Oui, avec des missions, une autorité et des compétences définies par écrit",
        "q55-b": "Oui, mais le rôle n'est pas formalisé",
        "q55-c": "La responsabilité est partagée entre plusieurs fonctions, sans référent clair",
        "q55-d": "Non",
      },
    },
    q56: {
      text: "Les opérateurs de production qui travaillent dans les zones classées sont-ils formés aux risques d'explosion et aux comportements à adopter ?",
      hint: "Obligation de l'employeur prévue par la directive 1999/92/CE (en Italie, titre XI du décret législatif 81/08).",
      options: {
        "q56-a": "Oui, avec une formation périodique, une vérification des acquis et des consignes opérationnelles",
        "q56-b": "Oui, à l'embauche, mais sans recyclage",
        "q56-c": "Ils reçoivent seulement des informations générales",
        "q56-d": "Non",
      },
    },
    q57: {
      text: "Existe-t-il un plan de formation Ex avec des besoins définis par fonction (concepteurs, installateurs, inspecteurs, agents de maintenance, responsables) ?",
      options: {
        "q57-a": "Oui, avec une analyse des besoins, des échéances de recyclage et un budget dédié",
        "q57-b": "Un plan existe, mais il n'est pas lié aux fonctions",
        "q57-c": "La formation se fait à la demande",
        "q57-d": "Non",
      },
    },
    q58: {
      text: "L'efficacité de la formation Ex est-elle vérifiée (tests, tutorat, évaluation sur le terrain) ?",
      options: {
        "q58-a": "Oui, avec des tests et une évaluation pratique documentés",
        "q58-b": "Seulement par un test final",
        "q58-c": "Seulement par l'attestation de présence",
        "q58-d": "Non",
      },
    },
    q59: {
      text: "Le personnel qui intervient sur le matériel Ex connaît-il les modes de protection (Ex d, Ex e, Ex i, Ex p, Ex t) ?",
      options: {
        "q59-a": "Oui, il sait les reconnaître au marquage et en appliquer les règles d'intervention",
        "q59-b": "Seulement les modes de protection les plus répandus dans l'installation",
        "q59-c": "Il en a une connaissance superficielle",
        "q59-d": "Non",
      },
    },
    q60: {
      text: "Lorsqu'une personne ayant des compétences Ex quitte l'entreprise ou change de poste, ses compétences sont-elles remplacées ou transmises ?",
      options: {
        "q60-a": "Oui, la couverture des compétences critiques est planifiée (suppléants, tutorat)",
        "q60-b": "Nous le gérons au moment venu",
        "q60-c": "Nous restons souvent sans couverture pendant de longues périodes",
        "q60-d": "Nous ne nous sommes jamais posé la question",
      },
    },
    q61: {
      text: "Les dirigeants et responsables connaissent-ils les obligations de l'employeur en matière d'atmosphères explosives (directive 1999/92/CE et sa transposition nationale) ?",
      options: {
        "q61-a": "Oui, ils ont suivi une formation spécifique et en contrôlent l'application",
        "q61-b": "Ils en ont une connaissance générale",
        "q61-c": "Ils le considèrent comme un sujet purement technique",
        "q61-d": "Non",
      },
    },
    q62: {
      text: "Les compétences Ex du personnel sont-elles mises à jour en fonction de l'évolution des normes (nouvelles éditions des EN/IEC 60079) ?",
      options: {
        "q62-a": "Oui, avec des mises à jour périodiques et une veille normative",
        "q62-b": "Occasionnellement, par exemple via des séminaires ou des newsletters",
        "q62-c": "Seulement quand des problèmes apparaissent",
        "q62-d": "Non",
      },
    },
  },
};
