// Slice G2b: Cambridge IGCSE Paper 1 (Physical Geography), topic 2 Changing coastal environments (2 × 25 marks).
import { concept, P, CAM, geographyLevels } from "../lib.mjs";

const FIG1 = "**Fig. 1.1: Wave and beach observations at two fictional sites in winter**\n\n| Site | Waves breaking in 4 minutes | Mean wave height (m) | Beach width at low tide (m) | Beach gradient (°) |\n|---|---|---|---|---|\n| X (exposed, faces a long fetch) | 52 | 2.4 | 18 | 14 |\n| Y (sheltered bay) | 26 | 0.7 | 85 | 5 |\n\n**Fig. 1.2: Description of the fictional coast (diagram in words)**: the coast runs north-south. Bands of chalk and of soft clay run east-west, at right angles to the coast. A chalk headland at the north end has a cave, an arch and two pillars of rock offshore. South of the headland is a bay cut in clay. The prevailing wind is from the north-east, and at the southern end, where the coast turns sharply west into a river estuary, a narrow ridge of sand and shingle extends 1.8 km southwards across the estuary mouth, with a hooked end and salt marsh behind it.";

const FIG2 = "**Fig. 2.1: Location of six coral reef areas (approximate latitudes)**\n\n| Reef area | Ocean or sea | Approximate latitude |\n|---|---|---|\n| Great Barrier Reef, Australia | Pacific (Coral Sea) | 10° S to 24° S |\n| Belize Barrier Reef | Caribbean Sea | 16° N to 18° N |\n| Red Sea reefs | Red Sea | 16° N to 28° N |\n| Maldives | Indian Ocean | 0° to 7° N |\n| Hawaiian Islands | Pacific | 19° N to 22° N |\n| Bazaruto archipelago, Mozambique | Indian Ocean | 21° S to 22° S |\n\n**Fig. 2.2: Survey of a fictional reef island, 2015 and 2025**\n\n| | 2015 | 2025 |\n|---|---|---|\n| Live coral cover (%) | 55 | 31 |\n| Mangrove area on the sheltered side (ha) | 640 | 410 |\n| Tourist visits per year | 17,000 | 47,000 |\n| Hotels built on cleared mangrove land | 1 | 6 |";

concept("geo.coasts.landforms", { file: "exam/cam-p1-coasts", keyPrefix: "exam.cam-p1-coasts", applies: CAM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 1", secs: 2250,
    concepts: ["geo.coasts.processes", "geo.coasts.landforms", "geo.coasts.management"],
    stem: `Study Fig. 1.1 and Fig. 1.2.\n\n${FIG1}`,
    hints: ["Waves per minute = waves counted ÷ minutes.", "For the extended answer, choose a named coastline and give specific detail on causes and management."],
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the number of waves per minute at site X.", value: 13, wrong: [52, 6.5], explanation: "52 ÷ 4 = 13 waves per minute." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which type of wave is most likely at site Y?", options: [
        ["Constructive", "Correct: low (0.7 m), infrequent (6.5 a minute) waves and a wide, gentle beach."],
        ["Destructive", "Destructive waves are high and frequent, as at site X."],
        ["Plunging storm waves", "These are high and steep, unlike the waves at Y."],
        ["Tsunami", "Nothing in the data suggests a tsunami."],
      ], answer: "A", explanation: "Low, infrequent waves and a wide, gently sloping beach indicate constructive waves." }),
      P.manual({ label: "(c)", marks: 3, stem: "Using Fig. 1.1, describe the differences between the beaches at X and Y and explain them.", points: [
        "X is narrower (18 m) and steeper (14°) than Y (85 m, 5°).",
        "Destructive waves at X have a strong backwash that removes sediment, narrowing and steepening the beach.",
        "Constructive waves at Y have a strong swash that deposits sediment, building a wide, gentle beach.",
      ], explanation: "Data comparison plus wave-type explanation." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how longshore drift moves sediment along this coast.", points: [
        "The prevailing north-east wind makes waves approach the beach at an angle.",
        "Swash carries sediment up the beach at that angle; backwash returns straight down under gravity.",
        "Sediment zigzags along the coast towards the south (with the prevailing wind).",
      ], explanation: "Process and direction." }),
      P.manual({ label: "(e)", marks: 4, stem: "Name the landform at the southern end of the coast and explain its formation.", points: [
        "Names it as a spit.",
        "Longshore drift carries sand and shingle southwards.",
        "Where the coast turns west into the estuary, drift continues into calmer water and material is deposited, extending the ridge.",
        "Changing wind/wave direction forms the hooked end; mud settles in the sheltered water behind to form salt marsh.",
      ], explanation: "Name plus three formation points." }),
      P.manual({ label: "(f)", marks: 4, stem: "Explain how the two pillars of rock offshore from the chalk headland were formed.", points: [
        "Waves attack lines of weakness (joints, faults) in the chalk by hydraulic action and abrasion.",
        "Cracks are widened into caves.",
        "Caves are eroded through the headland to form an arch.",
        "The arch roof collapses, leaving isolated stacks.",
      ], explanation: "Sequence from crack to stack." }),
      P.manual({ label: "(g)", marks: 2, stem: "Is this a concordant or discordant coastline? Explain your answer.", points: [
        "Discordant.",
        "Rock bands run at right angles to the coast, so weaker clay forms bays and resistant chalk forms headlands.",
      ], explanation: "Type plus reason." }),
      P.manual({
        label: "(h)", marks: 7, type: "EXTENDED_RESPONSE",
        stem: "For a named stretch of coastline, describe the causes of coastal erosion and evaluate the methods used to manage it.",
        points: [
          ["Named coastline with located detail (e.g. Holderness, eastern England: Hornsea, Mappleton, Withernsea).", 1],
          ["Geological cause specific (e.g. soft boulder clay that slumps when wet).", 1],
          ["Wave/beach cause specific (e.g. long fetch from the north-east, narrow beaches; roughly 1.5-2 m a year retreat).", 1],
          ["Hard engineering described with location (e.g. sea walls and groynes at Hornsea and Withernsea; Mappleton rock groynes and armour, 1991).", 1],
          ["Other approaches (e.g. rock armour at Easington gas terminal; no active intervention elsewhere).", 1],
          ["Evaluation: towns protected but beaches starved downdrift (erosion south of Mappleton); costs and fairness.", 1],
          ["Overall judgement on effectiveness/sustainability.", 1],
        ],
        levels: geographyLevels(7),
        modelAnswer: "The Holderness coast in eastern England, an HIC, runs for about 60 km from Flamborough Head to Spurn Head and retreats on average by roughly 1.5 to 2 m a year. Its cliffs are made of soft boulder clay, which is easily eroded by waves and slumps when saturated by rain. Waves from the North Sea arrive with a long fetch from the north-east, especially in winter storms, and the beaches are narrow, so they absorb little wave energy before it reaches the cliff foot.\n\nThe main towns are protected. Hornsea and Withernsea have sea walls, groynes and rock armour. At Mappleton, two rock groynes and rock armour at the cliff foot were built in 1991 for about £2 million to protect the village and the coast road, and rock armour protects the gas terminal at Easington. Most of the remaining coast is left to erode because protection would cost more than the land is worth.\n\nThese schemes have successfully protected the towns and Mappleton. However, by trapping sediment the groynes have starved beaches to the south, and erosion just south of Mappleton has increased, while less sediment reaches Spurn Head. Farmers and homeowners on unprotected stretches lose land with little compensation. Overall the strategy is cost-effective for the places protected but not fully sustainable, because it moves the problem along the coast; managed retreat on low-value stretches is a more sustainable long-term approach.",
        explanation: "Level 3 answers give specific, located causes and evaluate named schemes with a judgement.",
      }),
    ],
    explanation: "Cambridge Paper 1 style question on waves, longshore drift, coastal landforms and management.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 1", secs: 2250,
    concepts: ["geo.coasts.coral-mangroves", "geo.coasts.management"],
    stem: `Study Fig. 2.1 and Fig. 2.2.\n\n${FIG2}`,
    hints: ["Use latitudes and oceans to describe a distribution.", "For the extended answer, choose a named reef and evaluate its management."],
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Using Fig. 2.2, calculate the fall in live coral cover between 2015 and 2025, in percentage points.", value: 24, wrong: [31, 86], explanation: "55 − 31 = 24 percentage points." }),
      P.num({ type: "CALCULATION", label: "(b)", marks: 2, stem: "Calculate the percentage loss of mangrove area between 2015 and 2025, to one decimal place.", value: 35.9375, unit: "%", tol: 0.05, answer: "35.9", wrong: [230, 64.1], explanation: "Loss = 640 − 410 = 230 ha; 230 ÷ 640 × 100 = 35.9 %.", workedSolution: "1. Loss = 640 − 410 = 230 ha.\n2. 230 ÷ 640 = 0.359375.\n3. × 100 = 35.9 % (to one decimal place)." }),
      P.manual({ label: "(c)", marks: 3, stem: "Using Fig. 2.1, describe the distribution of coral reefs.", points: [
        "All lie within the tropics / between about 30° N and 30° S (from about 0° to 28° in the figure).",
        "Found in several oceans: Pacific, Indian Ocean, Caribbean and Red Sea.",
        "Mainly on eastern coasts of continents or around islands (e.g. east Australia, Mozambique, Maldives).",
      ], explanation: "Latitude range, oceans and a pattern." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why coral reefs are found only in these areas.", points: [
        "They need warm water, above about 18 °C, found in tropical seas.",
        "They need shallow, clear water so their algae get sunlight.",
        "Cold currents along western coasts (and fresh water/sediment near large river mouths) prevent reef growth.",
      ], explanation: "Conditions linked to the distribution." }),
      P.manual({ label: "(e)", marks: 3, stem: "Using Fig. 2.2, suggest how the growth of tourism may have contributed to the loss of coral and mangroves.", points: [
        "Hotels built on cleared mangrove land (from 1 to 6), removing mangroves.",
        "More visitors (17,000 to 47,000) damage coral through trampling, anchors and souvenir collecting.",
        "More sewage and sediment from construction pollute the water, encouraging algae and smothering coral.",
      ], explanation: "Use the data and link to processes." }),
      P.manual({ label: "(f)", marks: 3, stem: "Explain why the loss of mangroves increases the risk of coastal hazards for people on the island.", points: [
        "Mangrove roots absorb wave energy and slow storm surges.",
        "They trap sediment and hold the shoreline together, reducing erosion.",
        "Without them, storm surges and waves reach homes and hotels with more force, increasing flooding and erosion.",
      ], explanation: "Protective role and consequence." }),
      P.manual({ label: "(g)", marks: 3, stem: "Suggest **three** ways the island could manage its reef and mangroves more sustainably.", points: [
        "Marine protected area with zoning / no-take zones and mooring buoys instead of anchors.",
        "Ban further mangrove clearance and replant mangroves on the sheltered side.",
        "Limit visitor numbers, treat hotel sewage, educate tourists / eco-tourism fees funding conservation.",
      ], explanation: "Three distinct, realistic strategies." }),
      P.manual({
        label: "(h)", marks: 7, type: "EXTENDED_RESPONSE",
        stem: "For a named coral reef, describe its importance and the threats to it, and evaluate how it is protected and managed.",
        points: [
          ["Named reef with located detail (e.g. Great Barrier Reef, Queensland, Australia; more than 2,300 km).", 1],
          ["Importance: biodiversity and coastal protection.", 1],
          ["Importance: tourism and fishing (e.g. billions of Australian dollars a year, tens of thousands of jobs).", 1],
          ["Threats: mass bleaching in marine heatwaves (e.g. 2016, 2017, 2020, 2022, 2024).", 1],
          ["Threats: farm run-off, crown-of-thorns starfish, cyclones, shipping.", 1],
          ["Management: marine park; 2004 zoning (about a third no-take); run-off programmes; starfish culling; Reef 2050.", 1],
          ["Evaluation and judgement: local pressures reduced but warming needs global action.", 1],
        ],
        levels: geographyLevels(7),
        modelAnswer: "The Great Barrier Reef lies off the coast of Queensland in north-east Australia, an HIC, and stretches for more than 2,300 km, made up of thousands of individual reefs. It is a World Heritage Site with thousands of species of fish, corals and molluscs, and nesting sites for turtles. It shelters the coast from waves, supports fishing, and its tourism is worth billions of Australian dollars a year and supports tens of thousands of jobs.\n\nThe biggest threat is warming seas: marine heatwaves caused mass bleaching in 2016, 2017, 2020, 2022 and 2024, killing large areas of coral. Sediment, fertiliser and pesticides from sugar-cane and cattle farms reduce water quality, and nutrient run-off is linked to outbreaks of crown-of-thorns starfish. Cyclones and shipping cause further damage.\n\nThe reef is managed as a marine park. The 2004 zoning plan made about a third of it no-take zones, where fish populations have recovered. Farmers receive funding to reduce run-off, divers cull crown-of-thorns starfish, and the Reef 2050 plan coordinates long-term action. These measures reduce local pressures and make the reef one of the best-managed in the world, but they cannot prevent ocean warming. Bleaching events are now so frequent that coral has little time to recover, so the reef's long-term survival depends on global reductions in greenhouse gas emissions.",
        explanation: "Level 3 answers give specific detail on importance and threats and evaluate named management.",
      }),
    ],
    explanation: "Cambridge Paper 1 style question on coral reefs, mangroves and coastal management.",
  });
});
