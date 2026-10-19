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
    q13: {
      text: "Have the combustible dusts present (e.g. flour, sugar, wood, metal or plastic dusts) been considered in the explosion risk assessment?",
      hint: "Reference: EN/IEC 60079-10-2.",
      options: {
        "q13-a": "Yes, with characterisation of the dusts (minimum ignition energy, cloud and layer ignition temperatures, Kst) and classification into zones 20/21/22",
        "q13-b": "Yes, but without laboratory data on the dust characteristics",
        "q13-c": "Only for the most obvious areas (silos, filters), not for deposits and layers",
        "q13-d": "No, the dust-related risk has not been assessed",
      },
    },
    q14: {
      text: "For the classification, do you have the safety characteristics of the substances (flash point, explosive limits, ignition temperature, group)?",
      options: {
        "q14-a": "Yes, from safety data sheets or recognised databases, collected in an up-to-date list of substances",
        "q14-b": "Yes, but not for all substances or not always up to date",
        "q14-c": "We have the safety data sheets, but the parameters relevant to classification have not been extracted from them",
        "q14-d": "No, this information is not collected",
      },
    },
    q15: {
      text: "Have the sources of release (flanges, seals, valves, vents, loading points) been identified and characterised (grade of release, release rate, ventilation)?",
      hint: "The EN/IEC 60079-10-1 method starts from the sources of release to define the type and extent of zones.",
      options: {
        "q15-a": "Yes, with a list of sources and documented calculations for each one",
        "q15-b": "Yes, but the extent of the zones was estimated without calculations",
        "q15-c": "The zones were defined by judgement, without an analysis of the sources",
        "q15-d": "No, no analysis of the sources of release has been carried out",
      },
    },
    q16: {
      text: "Are the entrances to areas where explosive atmospheres may occur marked on site?",
      hint: "Triangular \"EX\" warning sign required by Directive 1999/92/EC (Annex III) and, in Italy, by Legislative Decree 81/08 (Annex LI).",
      options: {
        "q16-a": "Yes, at all entrances, with signs consistent with the classification drawings",
        "q16-b": "Yes, but not at all entrances or not updated after changes",
        "q16-c": "Only in some areas",
        "q16-d": "No, the areas are not marked",
      },
    },
    q17: {
      text: "Is the ventilation (natural or artificial) on which the classification is based documented and kept under control?",
      options: {
        "q17-a": "Yes: degree and availability of ventilation are documented, with alarms or interlocks in case of failure of artificial ventilation",
        "q17-b": "It is documented in the classification, but not monitored over time",
        "q17-c": "Ventilation was only considered qualitatively",
        "q17-d": "Ventilation was not considered in the classification",
      },
    },
    q18: {
      text: "Does the EPD describe, for each area, the prevention and protection measures adopted (inerting, gas detection, control of ignition sources, explosion venting or suppression)?",
      options: {
        "q18-a": "Yes, area by area, with the persons responsible and the way each measure is verified",
        "q18-b": "Yes, but in general terms, without reference to individual areas",
        "q18-c": "Only partly",
        "q18-d": "No, the measures are not described",
      },
    },
    q19: {
      text: "Has the risk of ignition from static electricity (transfers, drums, belts, plastic pipes, clothing) been assessed?",
      hint: "Reference: IEC/TS 60079-32-1.",
      options: {
        "q19-a": "Yes, with documented measures (verified bonding and earthing, dissipative materials, antistatic footwear and clothing)",
        "q19-b": "Yes, but only for some operations (e.g. solvent transfers)",
        "q19-c": "We only earth the main metal parts",
        "q19-d": "No, static electricity has not been considered",
      },
    },
    q20: {
      text: "Who drew up the hazardous area classification and the EPD?",
      options: {
        "q20-a": "A working group with documented Ex competence, involving production, maintenance and HSE",
        "q20-b": "A qualified external consultant, with limited involvement of in-house personnel",
        "q20-c": "An in-house person without specific Ex training",
        "q20-d": "They were copied from another site or a template, without adapting them to the plant",
      },
    },
    q21: {
      text: "Does the classification also take account of non-routine operations (start-up, shutdown, cleaning, maintenance, sampling)?",
      options: {
        "q21-a": "Yes, every operating mode has been analysed and temporary measures are defined",
        "q21-b": "Only the most frequent non-routine operations",
        "q21-c": "No, it only considers normal operation",
        "q21-d": "No, and non-routine operations are carried out without specific measures",
      },
    },
    q22: {
      text: "Is there an Ex equipment register showing the marking, certificate number and installation zone of each item?",
      options: {
        "q22-a": "Yes, complete, up to date and linked to the inspection plan",
        "q22-b": "Yes, but it does not cover all equipment or is not up to date",
        "q22-c": "Only partial lists exist (e.g. motors only or instrumentation only)",
        "q22-d": "No, there is no register",
      },
    },
    q23: {
      text: "Is the non-electrical equipment installed in classified areas (pumps, gearboxes, fans, couplings, brakes) suitable for use in explosive atmospheres?",
      hint: "Directive 2014/34/EU also applies to non-electrical equipment (EN ISO 80079-36 and -37).",
      options: {
        "q23-a": "Yes, checked for all of it, with marking and documentation available",
        "q23-b": "Yes for recent equipment; not always for older equipment",
        "q23-c": "We have only checked electrical equipment",
        "q23-d": "No, non-electrical equipment has not been considered",
      },
    },
    q24: {
      text: "For equipment whose certificate carries the \"X\" suffix, do you comply with the specific conditions of use?",
      hint: "The \"X\" suffix indicates specific conditions for safe use, stated in the certificate and instructions.",
      options: {
        "q24-a": "Yes, the conditions are identified, communicated to installers and checked during inspections",
        "q24-b": "We only know them for the main equipment",
        "q24-c": "Certificates are rarely consulted",
        "q24-d": "No, the specific conditions are not considered",
      },
    },
    q25: {
      text: "Are custom-built panels, junction boxes and assemblies for Ex areas certified or assessed as a whole?",
      options: {
        "q25-a": "Yes, with a certificate or declaration of conformity for the assembly and the related technical documentation",
        "q25-b": "The individual components are certified, but the assembly has not been assessed",
        "q25-c": "Modifications and additions are carried out in-house, without assessment",
        "q25-d": "There are non-Ex panels or boxes in classified areas",
      },
    },
    q26: {
      text: "Is the temperature class of equipment (or the maximum surface temperature, for dusts) compared with the ignition temperature of the substances present?",
      options: {
        "q26-a": "Yes, systematically, including for dust layers and with the safety margins required by the standards",
        "q26-b": "Yes for gases, not always for dusts",
        "q26-c": "Only at the purchasing stage, without checks on existing equipment",
        "q26-d": "No, the comparison is not made",
      },
    },
    q27: {
      text: "Is the equipment suitable for the actual ambient temperature at the installation location (exposure to sun, proximity to furnaces or hot pipes)?",
      hint: "Unless otherwise stated in the marking, equipment is designed for an ambient temperature range of −20 °C to +40 °C.",
      options: {
        "q27-a": "Yes, the actual temperature has been checked and compared with the range stated in the marking",
        "q27-b": "We only check it in obvious cases",
        "q27-c": "We always assume the standard range of −20 °C to +40 °C",
        "q27-d": "It has never been checked",
      },
    },
    q28: {
      text: "Are the portable devices used in classified areas (gas detectors, torches, radios, phones, tablets, power tools) suitable for the zone?",
      options: {
        "q28-a": "Yes: only devices certified for the zone, with a written rule and checks",
        "q28-b": "There is a rule, but it is not always followed (e.g. for personal phones)",
        "q28-c": "Only gas detectors are certified",
        "q28-d": "There is no specific rule",
      },
    },
    q29: {
      text: "On receipt of Ex equipment, do you check that it conforms to the order (marking, certificate, instructions, EU declaration of conformity)?",
      options: {
        "q29-a": "Yes, with a documented check and filing of the documents in the installation dossier",
        "q29-b": "We check the marking, but not always the documents",
        "q29-c": "The check depends on who receives the goods",
        "q29-d": "No check is carried out on receipt",
      },
    },
    q30: {
      text: "Are the gas detection systems used as a protection measure adequate and kept in working order?",
      hint: "Detectors complying with EN/IEC 60079-29-1, selected and installed in accordance with EN/IEC 60079-29-2.",
      options: {
        "q30-a": "Yes: certified detectors, periodic calibration and documented automatic actions",
        "q30-b": "Yes, but calibration and functional tests are not always regular",
        "q30-c": "There are detectors, but without a defined response logic",
        "q30-d": "There are no detection systems where they would be needed",
      },
    },
    q31: {
      text: "Are cable entry systems (cable glands, blanking elements, adapters) certified and compatible with the type of protection of the enclosure?",
      hint: "For example Ex d cable glands on Ex d enclosures and certified blanking elements on unused entries.",
      options: {
        "q31-a": "Yes, checked at installation and during inspections",
        "q31-b": "Generally yes, but we find non-compliant ones during inspections",
        "q31-c": "Whatever cable glands are in stock are used",
        "q31-d": "This is not checked",
      },
    },
    q32: {
      text: "Are intrinsically safe (Ex i) circuits verified by a calculation or a descriptive system document?",
      hint: "References: EN/IEC 60079-14 and EN/IEC 60079-25.",
      options: {
        "q32-a": "Yes, for every circuit: parameters of barriers, cables and instruments compared and filed",
        "q32-b": "Only for the most recent circuits",
        "q32-c": "We rely on the barriers, without calculations",
        "q32-d": "No, the circuits are not verified",
      },
    },
    q33: {
      text: "Are the cables laid in classified areas selected in accordance with the requirements of EN/IEC 60079-14 (type, mechanical protection, flame propagation)?",
      options: {
        "q33-a": "Yes, with documented and verified selection criteria",
        "q33-b": "Yes on new installations, not verified on existing ones",
        "q33-c": "The same cables as in non-classified areas are used",
        "q33-d": "There are no specific criteria",
      },
    },
    q34: {
      text: "On flameproof enclosures (Ex d), are the installation requirements met (flamepaths free from obstruction, original screws, no unauthorised holes)?",
      options: {
        "q34-a": "Yes, checked at the initial inspection and at every inspection",
        "q34-b": "Generally yes, but with known exceptions not yet resolved",
        "q34-c": "Modifications have been made (holes, replaced screws) without verification",
        "q34-d": "This is not checked",
      },
    },
    q35: {
      text: "Are the earthing system and equipotential bonding in classified areas designed and verified?",
      options: {
        "q35-a": "Yes, with a design, documented measurements and periodic checks",
        "q35-b": "They are only checked during the statutory periodic verifications",
        "q35-c": "They exist, but without documentation",
        "q35-d": "No, they are neither designed nor verified",
      },
    },
    q36: {
      text: "Is the initial inspection (detailed inspection before commissioning) carried out and documented for every new installation and every modification?",
      hint: "Required by EN/IEC 60079-14 and 60079-17.",
      options: {
        "q36-a": "Yes, always, with a report signed by qualified personnel",
        "q36-b": "Yes for new installations, not always for modifications",
        "q36-c": "Only a functional test, without specific Ex checks",
        "q36-d": "No, it is not carried out",
      },
    },
    q37: {
      text: "Do temporary installations in classified areas (construction sites, maintenance, rented equipment) follow the same rules as permanent ones?",
      options: {
        "q37-a": "Yes, with authorisation, an Ex check before use and a permit to work",
        "q37-b": "Yes, but without a systematic Ex check",
        "q37-c": "Only for major jobs",
        "q37-d": "No, temporary installations are not checked",
      },
    },
    q38: {
      text: "Is installed equipment protected against external influences (corrosion, vibration, impact, UV, water, dust) as required by the manufacturer's instructions?",
      options: {
        "q38-a": "Yes, environmental conditions are assessed and IP rating and mechanical protection are adequate",
        "q38-b": "Generally yes, but some equipment shows signs of deterioration",
        "q38-c": "We only act after failures",
        "q38-d": "This is not a criterion considered at installation",
      },
    },
    q39: {
      text: "Are the intervals between periodic inspections defined and justified (type of equipment, environment, failure history)?",
      hint: "EN/IEC 60079-17 states that the interval between periodic inspections should not exceed 3 years without an expert assessment.",
      options: {
        "q39-a": "Yes, with justified intervals reviewed on the basis of inspection results",
        "q39-b": "Yes, but with the same fixed interval for all equipment",
        "q39-c": "Inspections are carried out when there is time",
        "q39-d": "No interval is defined",
      },
    },
    q40: {
      text: "Do Ex inspections follow checklists specific to each type of protection (Ex d, Ex e, Ex i, Ex p, Ex t…)?",
      options: {
        "q40-a": "Yes, the EN/IEC 60079-17 checklists, adapted to the plant",
        "q40-b": "A generic checklist, the same for all equipment",
        "q40-c": "No checklist: the inspection relies on the inspector's experience",
        "q40-d": "Inspections are not documented",
      },
    },
    q41: {
      text: "Are inspection results recorded in a way that allows the history of each item of equipment to be traced?",
      options: {
        "q41-a": "Yes, in a database or software linked to the Ex equipment register",
        "q41-b": "In filed reports, but hard to consult for a single item of equipment",
        "q41-c": "Only anomalies are recorded",
        "q41-d": "No, results are not recorded",
      },
    },
    q42: {
      text: "Do safety-critical non-conformities (damaged Ex d enclosure, missing cable gland, open cover) lead to immediate removal from service?",
      options: {
        "q42-a": "Yes: non-conformities are classified by severity, with defined immediate actions",
        "q42-b": "Yes, but the decision is left to the inspector's judgement",
        "q42-c": "They are recorded and resolved at the next convenient shutdown",
        "q42-d": "No, the equipment remains in service",
      },
    },
    q43: {
      text: "Do Ex inspections also cover non-electrical equipment (couplings, bearings, belts, surface temperatures)?",
      options: {
        "q43-a": "Yes, with specific checks included in the inspection plan",
        "q43-b": "Only as part of routine maintenance, without Ex criteria",
        "q43-c": "Rarely",
        "q43-d": "No, Ex inspections only cover the electrical installation",
      },
    },
    q44: {
      text: "Do you carry out special inspections after particular events (lightning, flooding, fire, impact, long plant shutdowns)?",
      options: {
        "q44-a": "Yes, a documented special inspection is required",
        "q44-b": "Only if the event caused visible damage",
        "q44-c": "Rarely",
        "q44-d": "No, they are not planned",
      },
    },
    q45: {
      text: "Is the status of Ex installations (inspections carried out, open non-conformities, delays) reviewed by management?",
      options: {
        "q45-a": "Yes, with periodic indicators and a management review",
        "q45-b": "Only on the occasion of audits or incidents",
        "q45-c": "The data exist, but are not analysed",
        "q45-d": "No data are available",
      },
    },
    q46: {
      text: "Before starting, do inspectors have the necessary documentation (hazardous area classification, certificates, instructions, previous reports)?",
      hint: "EN/IEC 60079-17 requires this documentation to be available and up to date.",
      options: {
        "q46-a": "Yes, in an up-to-date dossier made available before each inspection campaign",
        "q46-b": "Partly: the documentation often has to be reconstructed",
        "q46-c": "Only the hazardous area classification",
        "q46-d": "No, inspectors work without documentation",
      },
    },
    q47: {
      text: "Is a permit to work required for work in classified areas (in particular for hot work)?",
      options: {
        "q47-a": "Yes, with a risk analysis, atmosphere testing and formal authorisation before each job",
        "q47-b": "Yes, but only for hot work",
        "q47-c": "A verbal go-ahead is given",
        "q47-d": "No, it is not required",
      },
    },
    q48: {
      text: "Are the spare parts for Ex equipment (screws, gaskets, lamps, terminals, glass) those specified by the manufacturer?",
      options: {
        "q48-a": "Yes, original parts or those specified in the instructions, managed in stock with dedicated codes",
        "q48-b": "Usually yes, but parts considered equivalent are sometimes used",
        "q48-c": "Standard parts are used when original ones are not available",
        "q48-d": "Ex spare parts are not distinguished from standard ones",
      },
    },
    q49: {
      text: "Is repaired Ex equipment marked and accompanied by a repair report?",
      hint: "EN/IEC 60079-19 requires repair marking and documentation of the work carried out.",
      options: {
        "q49-a": "Yes, always, and the report is filed with the equipment register",
        "q49-b": "Only for repairs carried out externally",
        "q49-c": "Rarely",
        "q49-d": "No",
      },
    },
    q50: {
      text: "Is Ex equipment opened only after isolation and in the absence of an explosive atmosphere?",
      options: {
        "q50-a": "Yes, with written procedures (isolation, waiting times, atmosphere testing)",
        "q50-b": "Yes, but the procedures are not written",
        "q50-c": "It depends on how urgent the job is",
        "q50-d": "There is no specific rule",
      },
    },
    q51: {
      text: "After work, is the integrity of the type of protection (gaskets, screws, flamepaths, cable glands) verified before the equipment is returned to service?",
      options: {
        "q51-a": "Yes, with a signed checklist",
        "q51-b": "Yes, but without any record",
        "q51-c": "It depends on the technician",
        "q51-d": "No, it is not verified",
      },
    },
    q52: {
      text: "Are dust deposits on equipment and surfaces in zones 21 and 22 removed regularly?",
      options: {
        "q52-a": "Yes, with a defined cleaning schedule and suitable methods (vacuum cleaners suitable for the zone, no compressed air)",
        "q52-b": "Yes, but without defined frequencies",
        "q52-c": "Only during shutdowns",
        "q52-d": "No, dust deposits are common",
      },
    },
    q53: {
      text: "Are modifications to individual items of Ex equipment (additional holes, replacement of components, changing lamps or motors) assessed before they are carried out?",
      options: {
        "q53-a": "Yes, they are only allowed if covered by the certificate or approved by the manufacturer",
        "q53-b": "Yes, but the assessment is informal",
        "q53-c": "They are carried out if the technician considers them safe",
        "q53-d": "There is no rule",
      },
    },
    q54: {
      text: "Before any contractor works in classified areas, are they given information on the explosion risk (zone drawings, access rules, interference risk assessment document such as the DUVRI in Italy)?",
      options: {
        "q54-a": "Yes, with a coordination meeting, documentation and a permit to work",
        "q54-b": "Yes, but only through the general interference risk assessment document",
        "q54-c": "Only verbally",
        "q54-d": "No, no specific information",
      },
    },
    q55: {
      text: "Has a person been appointed as responsible for managing Ex installations?",
      options: {
        "q55-a": "Yes, with duties, authority and competence defined in writing",
        "q55-b": "Yes, but the role is not formalised",
        "q55-c": "Responsibility is shared between several functions, without a clear point of reference",
        "q55-d": "No",
      },
    },
    q56: {
      text: "Are production operators working in classified areas trained on explosion risks and how to behave?",
      hint: "An employer obligation under Directive 1999/92/EC (in Italy, Title XI of Legislative Decree 81/08).",
      options: {
        "q56-a": "Yes, with periodic training, assessment of learning and operating instructions",
        "q56-b": "Yes, when hired, but without refresher training",
        "q56-c": "They only receive general information",
        "q56-d": "No",
      },
    },
    q57: {
      text: "Is there an Ex training plan with needs defined by role (designers, installers, inspectors, maintenance staff, managers)?",
      options: {
        "q57-a": "Yes, with a training needs analysis, refresher deadlines and a dedicated budget",
        "q57-b": "There is a plan, but it is not linked to roles",
        "q57-c": "Training is provided on request",
        "q57-d": "No",
      },
    },
    q58: {
      text: "Is the effectiveness of Ex training verified (tests, mentoring, on-the-job assessment)?",
      options: {
        "q58-a": "Yes, with documented tests and practical assessment",
        "q58-b": "Only with a final test",
        "q58-c": "Only with a certificate of attendance",
        "q58-d": "No",
      },
    },
    q59: {
      text: "Do personnel working on Ex equipment know the types of protection (Ex d, Ex e, Ex i, Ex p, Ex t)?",
      options: {
        "q59-a": "Yes, they can recognise them from the marking and apply the related work rules",
        "q59-b": "Only the types of protection most common in the plant",
        "q59-c": "They have only a superficial knowledge of them",
        "q59-d": "No",
      },
    },
    q60: {
      text: "When a person with Ex competence leaves the company or changes role, is their competence replaced or transferred?",
      options: {
        "q60-a": "Yes, coverage of critical competences is planned (substitutes, mentoring)",
        "q60-b": "We deal with it when it happens",
        "q60-c": "We are often left without cover for long periods",
        "q60-d": "We have never considered the issue",
      },
    },
    q61: {
      text: "Are executives and managers aware of the employer's obligations regarding explosive atmospheres (Directive 1999/92/EC and its national transposition, e.g. Title XI of Legislative Decree 81/08 in Italy)?",
      options: {
        "q61-a": "Yes, they have received specific training and check that the obligations are applied",
        "q61-b": "They have a general awareness of them",
        "q61-c": "They consider it a purely technical matter",
        "q61-d": "No",
      },
    },
    q62: {
      text: "Is personnel's Ex competence kept up to date with developments in the standards (new editions of EN/IEC 60079)?",
      options: {
        "q62-a": "Yes, with periodic refresher training and monitoring of standards",
        "q62-b": "Occasionally, e.g. through seminars or newsletters",
        "q62-c": "Only when problems arise",
        "q62-d": "No",
      },
    },
  },
};
