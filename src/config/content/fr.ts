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
  },
};
