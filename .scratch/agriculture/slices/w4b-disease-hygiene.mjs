// Slice W4b: causes and spread of livestock diseases, hygiene.
import { concept, P, dilution, mortalityPct, round, check, table } from "../lib.mjs";

const fb = dilution({ ratio: 49, tankL: 25 });
check(fb.concentrateMl === 500, "fb");
const kn = dilution({ mlPerL: 15, tankL: 16 });
check(kn.concentrateMl === 240, "kn");
const mort = mortalityPct({ died: 9, started: 360 });
check(mort === 2.5, "mort");
// Struct 8: batches of broilers with and without hygiene.
const BATCHES = [["1", "No footbath; visitors allowed; house swept only", 500, 41], ["2", "Footbath; no visitors; house washed and disinfected, rested 2 weeks", 500, 14]];
const BT = table(["Batch", "Management", "Chicks placed", "Deaths"], BATCHES);
const m1 = mortalityPct({ died: 41, started: 500 });
const m2 = mortalityPct({ died: 14, started: 500 });
check(m1 === 8.2 && m2 === 2.8, "batches");
// Struct 6: footbath at 1:29 for 30 L.
const fb2 = dilution({ ratio: 29, tankL: 30 });
check(fb2.concentrateMl === 1000 && fb2.waterMl === 29000, "fb2");

concept("agri.health.disease-hygiene", { file: "health/disease-hygiene", keyPrefix: "health.disease-hygiene" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which type of organism causes Newcastle disease?",
    options: [
      ["A virus", "Correct."],
      ["A bacterium", "Anthrax and tetanus are bacterial."],
      ["A protozoan", "Trypanosomiasis and coccidiosis are protozoan."],
      ["A fungus", "Ringworm is fungal."],
    ],
    answer: "A",
    explanation: "Newcastle disease is a viral disease of poultry.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which disease is infectious but **not** contagious?",
    options: [
      ["Tetanus", "Correct: bacteria enter wounds from soil, not from other animals."],
      ["Foot-and-mouth disease", "Spreads very readily by contact."],
      ["Mange caused by mites", "Spreads by direct contact and rubbing."],
      ["Newcastle disease", "Spreads rapidly between birds."],
    ],
    answer: "A",
    explanation: "Tetanus is caused by soil bacteria entering a wound; it does not pass from animal to animal.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is a vector?",
    options: [
      ["An organism that carries a pathogen between animals", "Correct: e.g. ticks and tsetse flies."],
      ["A chemical that is used to kill pathogens on farm surfaces", "That is a disinfectant."],
      ["An animal that has recovered from a disease", "Recovered animals may be immune or carriers."],
      ["A pen used for keeping sick animals apart", "That is a sick (isolation) pen."],
    ],
    answer: "A",
    explanation: "Vectors, usually arthropods such as ticks and biting flies, carry pathogens from host to host.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Newly bought heifers are kept in a separate paddock for several weeks before joining the herd. What is this practice called?",
    options: [
      ["Quarantine", "Correct: new, apparently healthy stock are kept apart."],
      ["Isolation", "Isolation is for animals that are already sick."],
      ["Vaccination", "Vaccination builds immunity."],
      ["Disinfection", "Disinfection kills pathogens on surfaces."],
    ],
    answer: "A",
    explanation: "Quarantine keeps new or exposed animals apart until it is clear they are free from disease.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A poultry house floor is covered with old litter and droppings. What should be done **before** spraying disinfectant?",
    options: [
      ["Remove the litter and wash the floor", "Correct: organic matter weakens disinfectants."],
      ["Add fresh litter on top of the old", "Disinfectant would not reach the floor."],
      ["Move the new chicks in first", "Chicks must arrive after cleaning and resting."],
      ["Close all windows for a week", "Ventilation does not clean the floor."],
    ],
    answer: "A",
    hints: ["What stops a disinfectant from working?"],
    explanation: "Dung and litter shield pathogens and inactivate many disinfectants, so clean and wash first.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why do overcrowded, poorly ventilated pig houses have more respiratory disease?",
    options: [
      ["Pathogens spread easily in droplets and dust", "Correct: and crowding stresses the pigs."],
      ["Crowded pigs always eat too little protein in their feed", "Protein is not the main link."],
      ["Ventilation brings in tsetse flies", "Not the reason; tsetse carry trypanosomes."],
      ["Pigs in groups cannot be vaccinated", "Pigs in groups can be vaccinated."],
    ],
    answer: "A",
    hints: ["How do coughs spread?"],
    explanation: "Close contact and stale air concentrate airborne pathogens, and stress lowers resistance.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which practice does most to stop a disease being carried into a poultry unit from a neighbouring farm?",
    options: [
      ["No visitors, plus a footbath at each door", "Correct: blocks people, boots and vehicles."],
      ["Giving the birds extra feed and vitamins every day", "Feeding helps resistance but does not stop entry."],
      ["Keeping sick birds in the main house", "This spreads disease inside the unit."],
      ["Burying dead birds near the water tank", "This risks polluting the water."],
    ],
    answer: "A",
    hints: ["How do pathogens travel between farms?"],
    explanation: "Pathogens travel on people, boots, crates and vehicles; restricting visitors and disinfecting footwear blocks this route.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "How should the carcass of an animal that died of an infectious disease be disposed of?",
    options: [
      ["Buried deep with lime, or burned", "Correct: away from water sources."],
      ["Left out in the bush for scavengers to clear", "Scavengers spread the pathogen."],
      ["Thrown into the farm dam", "This contaminates the water."],
      ["Fed to the farm dogs", "This spreads disease and risks the dogs."],
    ],
    answer: "A",
    hints: ["Stop the pathogen reaching other animals and water."],
    explanation: "Deep burial with lime or burning, away from water, stops scavengers and water spreading the disease. (Suspected anthrax carcasses must not be opened; report them.)",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Poor feeding can make animals more likely to fall ill from pathogens that are always present on the farm.",
    answer: true,
    explanation: "True. Poor nutrition and stress lower resistance, so pathogens cause disease more easily.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each route of spread with an example.",
    pairs: [
      ["Vector", "Tsetse fly carrying trypanosomes"],
      ["Contaminated water", "Scours spread through a dirty trough"],
      ["Equipment and footwear", "Pathogens carried on boots and egg trays"],
      ["Air", "Coughing hens in a crowded house"],
      ["Direct contact", "Infected goats rubbing against healthy goats"],
    ],
    explanation: "Knowing the route shows which control measure will break it.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Separating a sick animal from the healthy herd is called {{blank:a}}; holding newly bought animals apart is called {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["isolation", "isolating"] }, { id: "b", accepted: ["quarantine", "quarantining"] }],
    explanation: "Isolation (sick); quarantine (new or exposed).",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the general term for a micro-organism, such as a bacterium or virus, that causes disease.",
    accepted: ["pathogen", "pathogens", "germ", "microbe", "disease-causing organism"],
    keywords: { any: ["pathogen"] },
    explanation: "A **pathogen**.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A disinfectant is mixed at 1 part concentrate to 49 parts water (assume). How much concentrate, in mL, is needed for a 25 L footbath?",
    value: fb.concentrateMl, unit: "mL", tol: 0, wrong: [round((25 * 1000) / 49, 1), 25 * 49],
    hints: ["Total parts = 1 + 49."],
    explanation: `Total parts = 50; 25,000 mL ÷ 50 = ${fb.concentrateMl} mL of concentrate (and 24,500 mL water). Dividing by 49 forgets the concentrate's own part.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A disinfectant spray is made at 15 mL of concentrate per litre of water (assume). How many mL of concentrate are needed for a 16 L knapsack sprayer?",
    value: kn.concentrateMl, unit: "mL", tol: 0, wrong: [15 + 16, round(16 / 15, 2)],
    explanation: `15 × 16 = ${kn.concentrateMl} mL.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A farmer places 360 broiler chicks and 9 die before slaughter. Calculate the mortality percentage.",
    value: mort, unit: "%", tol: 0.05, answer: "2.5", wrong: [9, round(360 / 9, 0)],
    explanation: `9 ÷ 360 × 100 = ${mort}%.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **two** ways in which infectious diseases spread from one farm to another, and state how each can be prevented.",
    hints: ["Think of what moves between farms."],
    points: [
      "Way 1, e.g. buying infected animals (or carriers).",
      "Prevention: buy from healthy sources and quarantine new stock.",
      "Way 2, e.g. on people's boots, vehicles, crates and equipment / by vectors / by wild animals.",
      "Prevention: restrict visitors, footbaths and wheel dips, disinfect equipment / control ticks and flies / fence out wild animals.",
    ],
    modelAnswer: "Diseases arrive with bought animals that carry them; buying from known sources and quarantining new stock prevents this. Pathogens also travel on visitors' boots and vehicles; keeping visitors out and using footbaths and disinfected equipment blocks this route.",
    explanation: "Route plus matching prevention.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "Explain why an all-in, all-out system reduces disease in a broiler unit.",
    hints: ["What happens between batches?"],
    points: [
      "All birds in a house are the same age and leave together, so there are no older birds to pass diseases to young chicks.",
      "The empty house can be fully cleaned and disinfected.",
      "Leaving it empty for a period breaks the cycle of pathogens and parasites before the next batch arrives.",
    ],
    modelAnswer: "All birds arrive and leave together, so no older carriers infect the new chicks. The empty house is cleaned, disinfected and rested, which kills or starves out pathogens and breaks the disease cycle between batches.",
    explanation: "No mixing of ages; clean break.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A school near Marondera kept records of two broiler batches.\n\n${BT}`,
    hints: ["Mortality % = deaths ÷ chicks placed × 100."],
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the mortality percentage of batch 1.",
        value: m1, unit: "%", tol: 0.05, answer: "8.2", wrong: [41, round(500 / 41, 1)],
        explanation: `41 ÷ 500 × 100 = ${m1}%.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the mortality percentage of batch 2.",
        value: m2, unit: "%", tol: 0.05, answer: "2.8", wrong: [14],
        explanation: `14 ÷ 500 × 100 = ${m2}%.`,
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain how **three** of the changes made for batch 2 reduced deaths.",
        points: ["Footbath disinfects boots, so pathogens are not walked in.", "Keeping visitors out stops pathogens carried on people and clothes from other farms.", "Washing, disinfecting and resting the house kills pathogens left by the previous batch / breaks the disease cycle."],
        explanation: "Each change blocks a route of infection.",
      }),
      P.mcq({
        label: "(d)", stem: "Why should the house be washed **before** it is disinfected?",
        options: [
          ["Dirt and dung inactivate the disinfectant", "Correct."],
          ["Water alone kills all viruses", "Water does not kill most pathogens."],
          ["Disinfectant works only on wet concrete", "Wetness is not the reason."],
          ["Washing makes the chicks grow faster", "Not the reason."],
        ],
        answer: "A",
        explanation: "Organic matter shields pathogens and weakens disinfectants.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "State **two** safety precautions when mixing the disinfectant concentrate.",
        points: ["Wear gloves (and overalls) and eye protection.", "Measure accurately in the open air / keep away from feed, water and children / store locked away / follow the label."],
        explanation: "Personal protection and safe storage.",
      }),
    ],
    explanation: "Compare mortality between batches and explain how hygiene and biosecurity reduce disease.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 6,
    stem: "Rudo is setting up a 30 L footbath at the door of her piggery near Chipinge. The disinfectant label (assume) says mix 1 part concentrate with 29 parts water. Last month a pig with diarrhoea was left in the main pen and several others then became ill.",
    hints: ["Total parts = 1 + 29."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the volume of concentrate needed, in mL.",
        value: fb2.concentrateMl, unit: "mL", tol: 0, wrong: [round(30000 / 29, 0), 30 * 29],
        explanation: `30,000 mL ÷ 30 parts = ${fb2.concentrateMl} mL (1 L) concentrate and ${fb2.waterMl.toLocaleString("en-GB")} mL water.`,
      }),
      P.short({
        label: "(b)", stem: "Name the practice Rudo should have used for the pig with diarrhoea.",
        accepted: ["isolation", "isolate it", "isolating", "isolation of the sick pig", "sick pen", "put it in a sick pen"],
        keywords: { any: ["isolat", "sick pen", "separat"] },
        explanation: "**Isolation** in a sick pen.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain how the disease probably spread to the other pigs, and how isolation would have prevented it.",
        points: ["The sick pig passed pathogens in its dung.", "Other pigs picked them up from the contaminated floor, feed or water / by direct contact.", "In an isolation pen with its own equipment, its dung and contact would be kept away from the healthy pigs."],
        explanation: "Faecal-oral spread.",
      }),
    ],
    explanation: "Make up a footbath and explain isolation.",
  });

  b.card("DEFINITION", "Pathogen", "A disease-causing micro-organism: bacterium, virus, protozoan or fungus.");
  b.card("CONCEPT", "Infectious versus contagious", "Infectious: caused by a pathogen that invades the body. Contagious: an infectious disease spread by contact. Tetanus is infectious but not contagious.");
  b.card("DEFINITION", "Vector", "An organism (usually a tick or biting fly) that carries a pathogen from one animal to another.");
  b.card("CONCEPT", "Quarantine versus isolation", "Quarantine: holding new or exposed, apparently healthy animals apart. Isolation: separating animals that are already sick.");
  b.card("CONCEPT", "Eight routes of disease spread", "Contact, air, feed and water, vectors, equipment and footwear, carriers, animal products, mother to young.");
  b.card("FACT", "Why clean before disinfecting?", "Dung and dirt shield pathogens and weaken disinfectants.");
  b.card("CONCEPT", "All-in, all-out", "All animals in a house arrive and leave together; the empty house is cleaned, disinfected and rested before the next batch.");
  b.card("FORMULA", "Concentrate for a 1 : n dilution", "Concentrate = total volume ÷ (n + 1); water = the rest.");
  b.card("FACT", "Safe disposal of a carcass after infectious disease", "Deep burial with lime or burning, away from water; never open a suspected anthrax carcass.");
});
