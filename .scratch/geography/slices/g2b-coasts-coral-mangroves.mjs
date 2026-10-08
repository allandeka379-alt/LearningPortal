// Slice G2b: coral reefs and mangroves (distribution, conditions, importance, threats, management).
import { concept, P, geographyLevels } from "../lib.mjs";

const REEF = "**Table 1: Survey results at a fictional fringing reef**\n\n| Year | Live hard coral cover (%) | Mean summer sea temperature (°C) | Reef fish counted per 100 m transect |\n|---|---|---|---|\n| 2010 | 48 | 28.1 | 210 |\n| 2014 | 46 | 28.3 | 196 |\n| 2018 | 30 | 29.6 | 141 |\n| 2022 | 34 | 28.9 | 150 |";

const MANG = "**Table 2: Mangrove area in a fictional coastal district**\n\n| Year | Mangrove area (ha) | Area of shrimp ponds (ha) |\n|---|---|---|\n| 1990 | 12,500 | 300 |\n| 2005 | 9,800 | 2,700 |\n| 2020 | 7,600 | 4,600 |";

concept("geo.coasts.coral-mangroves", { file: "coasts/coral-mangroves", keyPrefix: "coasts.coral-mangroves" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **coral bleaching**?",
    options: [
      ["Coral expelling its algae when stressed, turning white", "Correct: usually triggered by unusually warm water."],
      ["Coral dissolving in fresh water from rivers", "Fresh water harms coral, but bleaching is the loss of algae."],
      ["Coral covered by white sand after a storm", "Sand burial is not bleaching."],
      ["Coral painted white to reflect sunlight", "This is not a natural or management process."],
    ],
    answer: "A",
    explanation: "Under stress, polyps expel their **zooxanthellae**, losing their colour and main food supply.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where do mangroves grow?",
    options: [
      ["Sheltered, muddy tropical estuaries", "Correct: low-energy intertidal zones."],
      ["Exposed rocky headlands in cold, stormy seas", "Mangroves need warm, sheltered, muddy coasts."],
      ["Deep ocean water far from land", "Mangroves are rooted in intertidal mud."],
      ["Mountain slopes above the tree line", "Mangroves are coastal trees."],
    ],
    answer: "A",
    explanation: "Mangroves grow in the **intertidal** zone of sheltered tropical and subtropical coasts: estuaries, deltas and lagoons.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do reef-building corals need **shallow, clear** water?",
    options: [
      ["Their algae need sunlight to photosynthesise", "Correct: light falls off quickly with depth and in muddy water."],
      ["Their skeletons dissolve in deep water", "The key limit is light for the algae."],
      ["Fish cannot reach coral in deep water", "Fish live at many depths; this is not the reason."],
      ["Waves are too weak in shallow water", "Shallow water usually has more wave action, not less."],
    ],
    answer: "A",
    explanation: "Corals depend on **zooxanthellae**, which need light. Light is reduced with depth and by sediment, so reefs grow in shallow, clear water.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How do mangroves help protect coasts?",
    options: [
      ["Their roots absorb wave energy and trap sediment", "Correct: they reduce erosion and storm-surge damage."],
      ["They raise the temperature of the sea", "Mangroves do not warm the sea."],
      ["They reflect waves back like a sea wall", "They absorb energy rather than reflecting it."],
      ["They stop tides from reaching the shore", "Tides still flood mangroves twice a day."],
    ],
    answer: "A",
    explanation: "Dense roots slow water, absorb wave energy and trap mud, protecting the land behind and even building it up.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main cause of mangrove loss in many tropical countries?",
    options: [
      ["Clearance for shrimp farms and building", "Correct: conversion of land is the largest cause."],
      ["Freezing winters killing the young trees", "Mangroves grow in the tropics, where frost is absent."],
      ["Too much shade from coral reefs", "Reefs are offshore and do not shade mangroves."],
      ["Lack of salt in coastal water", "Mangroves grow in salty water; salt is not lacking."],
    ],
    answer: "A",
    explanation: "Mangroves are cleared for aquaculture (especially shrimp ponds), farming, ports, resorts and housing, and cut for firewood and charcoal.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why are coral reefs largely absent from the **western** coasts of Africa and South America in the tropics?",
    options: [
      ["Cold ocean currents keep the water too cool", "Correct: e.g. the Benguela and Humboldt currents."],
      ["The water is too shallow on western coasts", "Depth is not the general reason."],
      ["There is too much sunlight on western coasts", "Sunlight is not limiting in the tropics."],
      ["Western coasts have no fish to feed the coral", "Cold-current coasts are often very rich in fish."],
    ],
    answer: "A",
    explanation: "Cold currents flowing towards the equator along western coasts lower sea temperatures below what reef-building corals need.",
    hints: ["Think about ocean currents and water temperature."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does fertiliser run-off from farms harm coral reefs?",
    options: [
      ["Nutrients feed algae that smother coral and block light", "Correct: and may encourage crown-of-thorns outbreaks."],
      ["Fertiliser makes the seawater too cold", "Fertiliser does not change temperature."],
      ["Fertiliser dissolves coral skeletons directly", "The main harm is through algal growth."],
      ["Fertiliser makes the water too salty", "Run-off adds nutrients, not salt."],
    ],
    answer: "A",
    explanation: "Extra nitrates and phosphates fuel algae that grow over coral and cloud the water. On the Great Barrier Reef nutrient run-off is also linked to crown-of-thorns starfish outbreaks.",
    hints: ["What do nutrients do to algae?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Why can local management such as zoning not fully protect the Great Barrier Reef?",
    options: [
      ["Ocean warming from global emissions still causes bleaching", "Correct: a global cause needs global action."],
      ["Zoning has made fish populations decline", "Zoning has helped fish recover in no-take areas."],
      ["Tourists are not allowed anywhere on the reef", "Tourism continues in suitable zones."],
      ["The reef is too small to be divided into zones", "It is more than 2,300 km long."],
    ],
    answer: "A",
    explanation: "Zoning controls fishing and other local pressures, but marine heatwaves caused by global warming bring mass bleaching that no local plan can stop.",
    hints: ["Which threat starts far beyond the reef?"],
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "Live coral cover on a reef fell from 55 % to 33 %. Calculate the loss as a percentage of the original cover.",
    value: 40, unit: "%",
    wrong: [22, 60],
    explanation: "Fall = 55 − 33 = 22 percentage points; 22 ÷ 55 × 100 = 40 %.",
    workedSolution: "1. Fall = 55 − 33 = 22 percentage points.\n2. As a share of the original: 22 ÷ 55 × 100 = 40 %.",
    hints: ["Divide the fall by the original value, not by the new value."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The algae living inside coral polyps are called {{blank:a}}. Mangrove roots that stick up out of the mud to take in oxygen are called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["zooxanthellae", "zooxanthella"], wrong: "plankton" },
      { id: "b", accepted: ["pneumatophores", "pneumatophore", "breathing roots"], wrong: "prop roots" },
    ],
    explanation: "**Zooxanthellae** feed the coral; **pneumatophores** let mangroves breathe in waterlogged mud.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of coral reef with its description.",
    pairs: [
      ["Fringing reef", "Grows close to the shore"],
      ["Barrier reef", "Separated from the shore by a lagoon"],
      ["Atoll", "Ring of reef around a lagoon, often over a sunken volcano"],
    ],
    explanation: "The three main reef types differ in their position relative to land.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Most coral reefs are found between about 30° N and 30° S.",
    answer: true,
    explanation: "True. Reef-building corals need warm water, found mainly in the tropics and subtropics.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Bleached coral is always dead.",
    answer: false,
    explanation: "False. Bleached coral is stressed and starving but can recover if the water cools quickly enough.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the starfish that eats coral and has had damaging outbreaks on the Great Barrier Reef.",
    accepted: ["crown-of-thorns", "crown of thorns", "crown-of-thorns starfish", "crown of thorns starfish", "COTS"],
    wrong: ["sea urchin"],
    explanation: "The **crown-of-thorns starfish** eats coral polyps; divers cull it in outbreak areas.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the importance of coral reefs.",
    points: [
      "Very high biodiversity: habitats for many marine species.",
      "Coastal protection: reefs break waves and reduce erosion and storm damage.",
      "Fisheries: food and income for coastal communities.",
      "Tourism (diving, snorkelling) / medicines / sand for beaches.",
    ],
    modelAnswer: "Coral reefs support a very large share of marine species in a small area. They break waves offshore, protecting coasts from erosion and storms. They provide fish for food and income, and attract tourists for diving and snorkelling. Some reef organisms are used in medicines.",
    explanation: "Four distinct points.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how mangroves are adapted to grow in salty, waterlogged mud.",
    points: [
      "Prop (stilt) roots anchor the tree in soft, shifting mud.",
      "Pneumatophores (breathing roots) grow upwards to take in oxygen from the air, because the mud has little oxygen.",
      "Salt is filtered out at the roots or excreted through the leaves.",
    ],
    modelAnswer: "Mangroves have prop roots that anchor them in soft mud. Because waterlogged mud contains little oxygen, many have breathing roots (pneumatophores) that stick up into the air. They cope with salt by filtering it out at the roots or excreting it through glands on their leaves.",
    explanation: "Three adaptations, each explained.",
    hints: ["Think about anchorage, oxygen and salt."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "For a named coral reef, describe its importance and the threats it faces, and evaluate how it is managed.",
    points: [
      ["Named reef with located detail (e.g. Great Barrier Reef, Queensland, Australia; more than 2,300 km long; World Heritage Site 1981).", 1],
      ["Importance: biodiversity, coastal protection.", 1],
      ["Importance: tourism (billions of Australian dollars a year, tens of thousands of jobs) and fishing.", 1],
      ["Threat: mass bleaching in marine heatwaves (e.g. 1998, 2016, 2017, 2020, 2022, 2024).", 1],
      ["Threat: farm run-off (sediment, fertiliser), crown-of-thorns starfish, cyclones, shipping.", 1],
      ["Management: marine park authority; 2004 zoning with about a third no-take; run-off programmes; starfish culling; Reef 2050.", 1],
      ["Evaluation: local threats better controlled and fish recovered in green zones, but warming cannot be managed locally; judgement.", 1],
    ],
    levels: geographyLevels(7),
    modelAnswer: "The Great Barrier Reef stretches more than 2,300 km along the coast of Queensland in north-east Australia, an HIC, and is the world's largest coral reef system. It is a World Heritage Site and home to thousands of species of fish, corals and molluscs, as well as turtles and seabirds. It protects the coast from waves, supports commercial fishing, and its tourism is worth billions of Australian dollars a year and supports tens of thousands of jobs.\n\nThe greatest threat is ocean warming: marine heatwaves have caused mass bleaching repeatedly, including in 1998, 2016, 2017, 2020, 2022 and 2024. Sediment, fertiliser and pesticides from sugar-cane and cattle farms reduce water quality, and nutrient run-off may contribute to outbreaks of coral-eating crown-of-thorns starfish. Cyclones, shipping and coastal development add further pressure.\n\nThe reef is managed as a marine park. The 2004 zoning plan made about a third of it no-take green zones, and fish numbers have increased in these areas. Farmers are paid and advised to reduce run-off, divers cull crown-of-thorns starfish, and the Reef 2050 plan coordinates action. These measures control local threats better than on most reefs. However, they cannot stop global warming, and bleaching events are now so frequent that coral has little time to recover. Management is effective locally, but the reef's survival depends on global cuts in greenhouse gas emissions.",
    explanation: "Level 3 answers use specific detail for importance and threats and evaluate named management.",
    hints: ["Separate local threats from global ones.", "Judge which threats management can and cannot control."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 1.\n\n${REEF}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the fall in live coral cover between 2014 and 2018, in percentage points.", value: 16, wrong: [46, 30], explanation: "46 − 30 = 16 percentage points." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the percentage decrease in reef fish counted between 2010 and 2018, to the nearest whole number.", value: 33, unit: "%", tol: 0.5, wrong: [69, 49], explanation: "210 − 141 = 69; 69 ÷ 210 × 100 = 32.9 %, about 33 %." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe the relationship between sea temperature and coral cover. Use data.", points: [
        "Negative relationship: when temperature rises, coral cover falls.",
        "Data: the highest temperature (29.6 °C in 2018) matches the lowest cover (30 %).",
        "As temperature fell to 28.9 °C in 2022 cover recovered slightly to 34 %.",
      ], explanation: "Relationship plus paired data." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why coral cover fell so sharply between 2014 and 2018.", points: [
        "Unusually warm water (29.6 °C) caused bleaching: polyps expelled their zooxanthellae.",
        "Without their algae many corals starved and died.",
      ], explanation: "Bleaching mechanism." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest why fish numbers fell as coral cover fell.", points: [
        "Coral provides shelter and breeding habitat for reef fish.",
        "Dead coral is overgrown by algae, reducing food sources for many fish.",
      ], explanation: "Habitat and food loss." }),
    ],
    hints: ["Percentage decrease = decrease ÷ original × 100.", "Look for the year with the highest temperature."],
    explanation: "Practice interpreting reef survey data.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 2.\n\n${MANG}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the mangrove area lost between 1990 and 2020.", value: 4900, unit: "ha", wrong: [4300, 20100], explanation: "12,500 − 7,600 = 4,900 ha." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the mean rate of mangrove loss per year between 1990 and 2020, to the nearest whole number.", value: 163, unit: "ha", tol: 0.5, wrong: [4900, 147], explanation: "4,900 ÷ 30 = 163.3, about 163 ha per year." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe the relationship between mangrove area and shrimp ponds.", points: [
        "As shrimp ponds increased, mangrove area decreased (negative relationship).",
        "Data: ponds rose from 300 to 4,600 ha while mangroves fell from 12,500 to 7,600 ha.",
      ], explanation: "Relationship with data." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain **three** consequences of this mangrove loss for the coastal district.", points: [
        "Less protection from storm surges and erosion, so more flooding and land loss.",
        "Fewer nursery areas, so offshore fish and prawn catches decline.",
        "Loss of biodiversity, timber, fuel and stored carbon (released when mangroves are cleared).",
      ], explanation: "Three consequences, each explained." }),
    ],
    hints: ["Rate = loss ÷ number of years."],
    explanation: "Practice on mangrove clearance data.",
  });
  b.card("DEFINITION", "Coral reef", "Ridge built from limestone skeletons of coral polyps in warm, shallow, clear tropical seas.");
  b.card("CONCEPT", "Coral reef conditions", "Above about 18 °C (best roughly 23-29 °C), shallow, clear, salty, unpolluted water; mainly 30° N-30° S, eastern coasts.");
  b.card("DEFINITION", "Coral bleaching", "Stressed coral (usually by warm water) expels its zooxanthellae and turns white; it starves if stress lasts.");
  b.card("DEFINITION", "Mangrove", "Salt-tolerant tree of sheltered, muddy tropical coasts; prop roots, pneumatophores, salt excretion.");
  b.card("CONCEPT", "Value of reefs and mangroves", "Biodiversity, coastal protection, fisheries and nurseries, tourism, timber and fuel, carbon storage.");
  b.card("CONCEPT", "Threats to reefs", "Warming and bleaching, acidification, farm run-off, sewage, overfishing, tourism damage, crown-of-thorns starfish, cyclones.");
  b.card("CONCEPT", "Threats to mangroves", "Clearance for shrimp farms, rice and development; cutting for charcoal; pollution; sea-level rise.");
  b.card("FACT", "Great Barrier Reef", "Queensland, Australia; more than 2,300 km; World Heritage 1981; 2004 zoning made about a third no-take; Reef 2050.");
  b.card("CONCEPT", "Reef types", "Fringing (close to shore), barrier (lagoon between reef and shore), atoll (ring round a lagoon).");
});
