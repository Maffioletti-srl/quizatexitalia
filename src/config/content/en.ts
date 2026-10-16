/**
 * English translation of the business content in config/questions.ts.
 */
import type { ContentTranslation } from "./types";

export const en: ContentTranslation = {
  unknownLabel: "I don't know",
  areas: {
    classificazione: {
      title: "Hazardous area classification and documentation",
      shortTitle: "Classification",
      description:
        "Classification of hazardous areas for gas and dust and an Explosion Protection Document (EPD), both kept up to date.",
      recommendation:
        "Check that the hazardous area classification covers all flammable substances (gases, vapours and dusts) in accordance with EN/IEC 60079-10-1 and 60079-10-2, and that the EPD is reviewed after every change to the plant, process or substances. It is the basis for equipment selection and the inspection plan.",
      service: {
        name: "Technical support for area classification and the EPD",
        description:
          "Support in reviewing the hazardous area classification and updating the Explosion Protection Document.",
      },
    },
    apparecchiature: {
      title: "Equipment compliance",
      shortTitle: "Equipment",
      description:
        "ATEX/IECEx marking, equipment category/EPL, gas or dust group and temperature class suited to the installation zone.",
      recommendation:
        "Build an Ex equipment register that compares, for each item, its marking with the requirements of the zone: category/EPL, group IIA/IIB/IIC or IIIA/IIIB/IIIC, temperature class and ambient temperature range. Replace non-certified or unsuitable equipment as a priority.",
      service: {
        name: "Ex-certified products",
        description:
          "A wide range of ATEX/IECEx-certified equipment and components, with support in selecting them according to zone, group and temperature class.",
      },
    },
    installazione: {
      title: "Installation",
      shortTitle: "Installation",
      description:
        "Design and erection of electrical installations in accordance with EN/IEC 60079-14: types of protection, cables and cable glands, installation documentation.",
      recommendation:
        "Base design and installation on EN/IEC 60079-14: justified selection of types of protection, certified cable entry systems, verification of intrinsically safe systems. Gather the installation documentation (classification, certificates, instructions, drawings) in a single dossier and make it accessible to anyone working on the plant.",
      service: {
        name: "Custom Ex solutions",
        description:
          "Panels, enclosures and systems custom-designed and certified for hazardous areas, with complete documentation for the installation dossier.",
      },
    },
    verifiche: {
      title: "Inspections and verification",
      shortTitle: "Inspections",
      description:
        "Initial and periodic inspections in accordance with EN/IEC 60079-17, statutory verifications and non-conformity records.",
      recommendation:
        "Define an inspection plan in accordance with EN/IEC 60079-17 (initial inspection, then periodic visual, close and detailed inspections) with justified intervals, meet the deadlines for statutory periodic verifications required by national regulations (e.g. DPR 462/01 in Italy) and track every non-conformity through to close-out.",
      service: {
        name: "Ex inspections",
        description:
          "Inspections of installations in explosive atmospheres in accordance with EN/IEC 60079-17, with a detailed report and corrective action plan.",
      },
    },
    manutenzione: {
      title: "Maintenance, repair and management of change",
      shortTitle: "Maintenance",
      description:
        "Repair and overhaul in accordance with EN/IEC 60079-19, suitable spare parts and management of change in classified areas.",
      recommendation:
        "Entrust the repair and overhaul of Ex equipment to qualified service facilities in accordance with EN/IEC 60079-19, use only spare parts specified by the manufacturer, and introduce a management of change (MOC) procedure that assesses the impact on explosion risk before any work.",
      service: {
        name: "Ex service, spare parts and repairs",
        description:
          "Original spare parts, technical support and work on Ex equipment in compliance with its certification.",
      },
    },
    competenza: {
      title: "Personnel competence",
      shortTitle: "Competence",
      description:
        "Ex training, qualifications and refresher training for in-house personnel and contractors.",
      recommendation:
        "Map the people who design, install, inspect or maintain Ex installations and provide each of them with specific training and periodic refreshers. Verify contractors' Ex competence before awarding work.",
      service: {
        name: "Atex Italia Academy",
        description:
          "Training courses on explosive atmospheres for technicians, maintenance staff, designers and HSE managers.",
      },
    },
  },
  questions: {
    q1: {
      text: "Are the hazardous areas of your plant classified into zones (0/1/2 for gas, 20/21/22 for dust)?",
      hint: "References: EN/IEC 60079-10-1 (gas) and EN/IEC 60079-10-2 (dust).",
      options: {
        "q1-a": "Yes, for all areas and all substances, with up-to-date zone drawings",
        "q1-b": "Yes, but some areas or substances (e.g. dusts) are not covered",
        "q1-c": "A classification exists, but it is outdated or does not refer to current standards",
        "q1-d": "No, the areas have not been formally classified",
      },
    },
    q2: {
      text: "Is the Explosion Protection Document (EPD) up to date?",
      hint: "Required by the ATEX Workplace Directive 1999/92/EC (Article 8) as part of the workplace risk assessment.",
      options: {
        "q2-a": "Yes, and it is reviewed after every change to the plant, process or substances",
        "q2-b": "It was updated recently, but not systematically after changes",
        "q2-c": "It exists, but has not been reviewed for several years",
        "q2-d": "We do not have an EPD",
      },
    },
    q3: {
      text: "Is the equipment installed in classified areas suitable for the zone (ATEX/IECEx marking, category/EPL, group, temperature class)?",
      options: {
        "q3-a": "Yes, checked for every item of equipment and recorded in a dedicated register",
        "q3-b": "Generally yes, but not all equipment has been checked",
        "q3-c": "Only for recent equipment; we are not sure about older equipment",
        "q3-d": "We know there is equipment that is not certified or not suitable for the zone",
      },
    },
    q4: {
      text: "How do you select new equipment and spare parts for Ex areas?",
      options: {
        "q4-a": "With a technical specification based on the classification (zone, group, T class, ambient temperature) and a check of the certificates",
        "q4-b": "We rely on the supplier and check the marking on delivery",
        "q4-c": "We rely on the supplier, without specific checks",
        "q4-d": "Price and availability matter most; Ex compliance is not always checked",
      },
    },
    q5: {
      text: "Are installations in Ex areas designed and erected in accordance with EN/IEC 60079-14?",
      hint: "Selection of types of protection, cables and cable glands, intrinsically safe systems, initial inspection.",
      options: {
        "q5-a": "Yes, with a design, Ex-qualified installers and a documented initial inspection",
        "q5-b": "Yes, but the Ex qualification of installers (including contractors) is not always verified",
        "q5-c": "We follow general installation rules, with only partial attention to Ex requirements",
        "q5-d": "There is no specific reference to EN/IEC 60079-14",
      },
    },
    q6: {
      text: "Is installation documentation available for Ex areas (classification, certificates, instructions, drawings, intrinsic safety loop calculations)?",
      options: {
        "q6-a": "Yes, in a complete and up-to-date dossier, accessible to anyone working on the plant",
        "q6-b": "Most of it exists, but it is scattered or not always up to date",
        "q6-c": "Only partly (e.g. certificates for some equipment)",
        "q6-d": "No, Ex installation documentation is not available",
      },
    },
    q7: {
      text: "Do you carry out specific inspections of Ex installations in accordance with EN/IEC 60079-17?",
      hint: "Initial and periodic inspections, visual, close or detailed.",
      options: {
        "q7-a": "Yes, with a defined inspection plan, justified intervals and appropriate inspection grades",
        "q7-b": "Yes, periodically, but without a formal plan in line with the standard",
        "q7-c": "Only occasionally or following failures",
        "q7-d": "No, we do not carry out specific Ex inspections",
      },
    },
    q8: {
      text: "Are statutory periodic verifications (as required by national regulations, e.g. DPR 462/01 in Italy) up to date, and are the non-conformities found managed?",
      options: {
        "q8-a": "Yes: verifications up to date, records current and non-conformities closed with tracked actions",
        "q8-b": "Verifications are up to date, but close-out of non-conformities is not always tracked",
        "q8-c": "Verifications are overdue or records are incomplete",
        "q8-d": "We do not carry out the statutory periodic verifications",
      },
    },
    q9: {
      text: "Are repairs and overhauls of Ex equipment carried out in accordance with EN/IEC 60079-19?",
      options: {
        "q9-a": "Yes, by the manufacturer or qualified service facilities, with original spare parts and a repair report",
        "q9-b": "Generally yes, but we sometimes carry out repairs in-house without a specific procedure",
        "q9-c": "In-house maintenance repairs them like standard equipment",
        "q9-d": "We make no distinction between Ex and non-Ex equipment in maintenance",
      },
    },
    q10: {
      text: "How do you manage changes in classified areas (new equipment, replacements, process or substance changes)?",
      options: {
        "q10-a": "With a management of change procedure that assesses the Ex impact and updates the classification and EPD",
        "q10-b": "We assess major changes, but not minor ones (replacements, small jobs)",
        "q10-c": "Case by case, without a formal procedure",
        "q10-d": "Changes are not assessed from an explosion risk perspective",
      },
    },
    q11: {
      text: "Have the personnel who design, install, inspect or maintain Ex installations received specific training?",
      options: {
        "q11-a": "Yes, structured Ex training, with periodic refreshers and a competence register",
        "q11-b": "Yes, but not for all roles involved or without periodic refreshers",
        "q11-c": "Only general safety training, with some mention of ATEX",
        "q11-d": "No specific Ex training",
      },
    },
    q12: {
      text: "Is the Ex competence of in-house personnel and contractors verified and documented?",
      hint: "For example IECEx CoPC certificates or qualifications in line with EN/IEC 60079-14, -17 and -19.",
      options: {
        "q12-a": "Yes, for both in-house personnel and contractors, before work is awarded",
        "q12-b": "Only for in-house personnel",
        "q12-c": "We rely on contractors' declarations, without verification",
        "q12-d": "Ex competence is not a selection criterion",
      },
    },
  },
};
