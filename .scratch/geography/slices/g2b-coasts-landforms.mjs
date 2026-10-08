// Slice G2b: coastal landforms of erosion and deposition; concordant and discordant coasts.
import { concept, P, geographyLevels } from "../lib.mjs";

const CLIFF = "**Table 1: Distance from the cliff edge to a fixed post at four fictional sites, 2005 and 2025**\n\n| Site | Rock | Distance in 2005 (m) | Distance in 2025 (m) |\n|---|---|---|---|\n| A | Granite | 31.0 | 30.6 |\n| B | Chalk | 46.0 | 43.2 |\n| C | Boulder clay | 58.0 | 20.0 |\n| D | Boulder clay protected by rock armour since 2012 | 64.0 | 50.0 |";

const GEOL = "**Table 2: Rock bands along a fictional coastline running west to east (all bands run north-south, at right angles to the coast)**\n\n| Section (west to east) | Rock | Resistance to erosion | Length of coast (km) |\n|---|---|---|---|\n| 1 | Limestone | High | 2.5 |\n| 2 | Clay and sand | Low | 4.0 |\n| 3 | Chalk | High | 1.5 |\n| 4 | Clay | Low | 3.0 |";

concept("geo.coasts.landforms", { file: "coasts/landforms", keyPrefix: "coasts.landforms" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the correct order in which these landforms develop from a headland?",
    options: [
      ["Cave, arch, stack, stump", "Correct: each stage follows erosion of the one before."],
      ["Arch, cave, stump, stack", "A cave must form before it can become an arch."],
      ["Stack, arch, cave, stump", "A stack forms after an arch collapses."],
      ["Stump, stack, arch, cave", "This is the sequence reversed."],
    ],
    answer: "A",
    explanation: "Waves exploit a weakness to form a **cave**, which is eroded through into an **arch**; the roof collapses to leave a **stack**, which is worn down to a **stump**.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which landform is a ridge of sand or shingle joined to the land at one end and extending into the sea?",
    options: [
      ["Spit", "Correct: built by longshore drift."],
      ["Stack", "A stack is a pillar of rock, an erosional landform."],
      ["Wave-cut platform", "This is a rocky erosional surface at the foot of a cliff."],
      ["Bay", "A bay is an inlet between headlands."],
    ],
    answer: "A",
    explanation: "A **spit** is a depositional ridge attached to the land at one end.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "On a **discordant** coastline, why do bays form?",
    options: [
      ["Bands of weaker rock meet the sea and erode faster", "Correct: soft rock is worn back between harder headlands."],
      ["Rock bands run parallel to the coast and protect it", "That describes a concordant coast."],
      ["Constructive waves remove sand from the bays", "Constructive waves deposit sand, not remove it."],
      ["Longshore drift cuts the bays into hard rock", "Longshore drift moves sediment; it does not cut bays into rock."],
    ],
    answer: "A",
    explanation: "On a discordant coast the rock bands meet the sea at right angles; the weak bands erode into **bays** and the resistant bands remain as **headlands**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Where does a cave usually begin to form in a headland?",
    options: [
      ["Along a joint, crack or fault", "Correct: waves exploit lines of weakness."],
      ["At the top of the cliff", "Wave erosion acts at the base, between tide levels."],
      ["Where sand dunes meet the cliff", "Dunes form on depositional coasts, not at cave sites."],
      ["In the middle of a sandy beach", "Caves are eroded in rock, not sand."],
    ],
    answer: "A",
    explanation: "Hydraulic action and abrasion widen a **line of weakness** at the base of the headland into a cave.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does a spit form where the coastline changes direction?",
    options: [
      ["Longshore drift carries material on into calmer water", "Correct: material is deposited where energy falls."],
      ["Destructive waves build sand ridges out to sea", "Destructive waves remove material from beaches."],
      ["The river at the bend deposits all of its load", "Rivers can help, but spits are mainly built by longshore drift."],
      ["Wave refraction erodes a ridge out of the sea bed", "Spits are depositional, not erosional."],
    ],
    answer: "A",
    explanation: "Longshore drift continues in the same direction as the coast turns away, carrying material into deeper, calmer water, where it is deposited.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does the rate of cliff retreat often slow down as a wave-cut platform becomes wider?",
    options: [
      ["Waves break further out and lose energy crossing the platform", "Correct: the platform absorbs wave energy."],
      ["The platform makes the rock in the cliff harder", "The rock's strength does not change."],
      ["The tide no longer reaches the platform", "The platform is covered at high tide."],
      ["Sub-aerial weathering stops once a platform forms", "Weathering continues regardless of the platform."],
    ],
    answer: "A",
    explanation: "A wide, shallow platform makes waves break earlier and lose energy through friction, so less energy reaches the cliff foot.",
    hints: ["What happens to waves in shallow water?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A spit grows right across a bay with no river flowing into it. What landform results?",
    options: [
      ["A bar with a lagoon behind it", "Correct: like Slapton Sands and Slapton Ley."],
      ["A tombolo linking two islands", "A tombolo links an island to the mainland or another island; here it closes a bay."],
      ["A wave-cut platform", "This is erosional, not depositional."],
      ["A delta", "A delta forms where a river deposits at its mouth."],
    ],
    answer: "A",
    explanation: "With no river current to keep the bay open, the spit joins the far headland to form a **bar**, trapping a **lagoon**.",
    hints: ["What stops a spit from closing a river mouth?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "At Lulworth Cove, Dorset, the sea broke through a narrow band of resistant limestone into softer clays behind it. What does this tell you about the coast there?",
    options: [
      ["It is concordant: rock bands run parallel to the coast", "Correct: the hard outer band once protected the soft rock."],
      ["It is discordant: rock bands meet the sea at right angles", "Discordant coasts give headlands and bays, not a breached outer band."],
      ["It is a depositional coast built by longshore drift", "The cove is an erosional landform."],
      ["It is protected by a wide wave-cut platform", "The cove shows active erosion behind the limestone."],
    ],
    answer: "A",
    explanation: "On a concordant coast the resistant band faces the sea. Once breached, the weak rock behind is rapidly eroded into a rounded cove.",
    hints: ["Which way do the rock bands run relative to the coast?"],
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A cliff edge was 75 m from a farmhouse in 2000 and 48 m from it in 2024. Calculate the mean rate of retreat in metres per year, to two decimal places.",
    value: 1.125, unit: "m", tol: 0.006, answer: "1.13",
    wrong: [27, 0.89],
    explanation: "Retreat = 75 − 48 = 27 m over 24 years; 27 ÷ 24 = 1.125, about 1.13 m per year.",
    workedSolution: "1. Retreat = 75 − 48 = 27 m.\n2. Time = 2024 − 2000 = 24 years.\n3. Rate = 27 ÷ 24 = 1.125 m per year (1.13 to two decimal places).",
    hints: ["Rate = distance ÷ time."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Waves erode a {{blank:a}} at the base of a cliff. When the cliff retreats it leaves a gently sloping wave-cut {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["notch", "wave-cut notch", "wave cut notch"], wrong: "stack" },
      { id: "b", accepted: ["platform"], wrong: "beach" },
    ],
    explanation: "A **wave-cut notch** undercuts the cliff; retreat leaves a **wave-cut platform**.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each landform with its formation.",
    pairs: [
      ["Arch", "A cave eroded right through a headland"],
      ["Stack", "Isolated pillar left when an arch roof collapses"],
      ["Bar", "Ridge of sediment across a bay, trapping a lagoon"],
      ["Sand dune", "Wind-blown sand trapped and bound by marram grass"],
      ["Bay", "Inlet eroded in weak rock between headlands"],
    ],
    explanation: "Arches, stacks and bays are erosional; bars and dunes are depositional.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Headlands are made of more resistant rock than bays.",
    answer: true,
    explanation: "True. Resistant rock is eroded slowly and juts out; weaker rock is worn back into bays.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A spit can usually close a river mouth completely.",
    answer: false,
    explanation: "False. The river's current keeps a channel open. A complete ridge across a bay (a bar) forms only where no strong river flows out.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the grass that binds sand and helps coastal dunes to grow.",
    accepted: ["marram", "marram grass"],
    wrong: ["kikuyu"],
    explanation: "**Marram grass** has long roots and grows up through new sand, stabilising dunes.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the formation of a stack.",
    points: [
      "Waves attack a line of weakness (joint or fault) in a headland by hydraulic action and abrasion.",
      "The weakness is enlarged into a cave.",
      "The cave is eroded through the headland to form an arch.",
      "The arch is undercut and weathered until the roof collapses, leaving an isolated stack.",
    ],
    modelAnswer: "Waves attack a joint or fault in a headland by hydraulic action and abrasion, widening it into a cave. The cave is eroded right through the headland, often meeting a cave on the other side, to form an arch. Waves erode the base of the arch while weathering weakens its roof, until the roof collapses and leaves an isolated pillar of rock: a stack.",
    explanation: "Four stages in sequence.",
    hints: ["Start with a line of weakness."],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the formation of a spit.",
    points: [
      "Longshore drift moves sand and shingle along the coast in the direction of the prevailing wind.",
      "Where the coastline changes direction, drift continues into deeper, calmer water.",
      "Material is deposited and the ridge gradually extends out to sea.",
      "Changes in wind or wave direction curve the end (recurved end); salt marsh forms behind it.",
    ],
    modelAnswer: "Longshore drift carries sand and shingle along the coast in the direction of the prevailing wind. Where the coast changes direction, for example at an estuary, the drift continues into the open water, which is calmer, so material is deposited and the ridge grows out into the sea. Changing wind and wave directions curve its end into a hook, and mud collects in the sheltered water behind it to form salt marsh.",
    explanation: "Process, location, growth and features.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how geology influences the shape of a coastline and the landforms found there. Refer to examples.",
    points: [
      ["Rock resistance: hard rocks (granite, chalk, limestone) erode slowly; soft rocks (clay, sand) erode quickly.", 1],
      ["Discordant coast: bands at right angles give headlands and bays (e.g. Swanage Bay, Dorset).", 1],
      ["Concordant coast: bands parallel give a straighter coast; coves where the hard band is breached (e.g. Lulworth Cove).", 1],
      ["Rock structure: joints and faults are exploited to form caves, arches and stacks (e.g. Old Harry Rocks, Durdle Door).", 1],
      ["Soft cliffs slump and retreat rapidly (e.g. boulder clay); hard cliffs are steep and retreat slowly.", 1],
      ["Eroded soft rock supplies sediment for beaches and spits further along the coast (e.g. Spurn Head).", 1],
    ],
    levels: geographyLevels(6),
    modelAnswer: "Geology controls how fast each part of the coast is eroded. Resistant rocks such as granite, chalk and limestone are eroded slowly and form high, steep cliffs and headlands, while weak rocks such as clay and sand are eroded quickly. Where the bands of rock run at right angles to the coast, a discordant coastline of headlands and bays develops, as at Swanage Bay in Dorset, where soft clays have been worn back between chalk and limestone headlands. Where the bands run parallel to the coast, the coastline is concordant and fairly straight, but if the outer hard band is breached, the soft rock behind is scooped out into a cove, as at Lulworth Cove. Rock structure matters too: joints and faults in chalk and limestone are exploited to form caves, arches and stacks such as Durdle Door and Old Harry Rocks. Soft boulder-clay cliffs, as on the Holderness coast, slump and retreat quickly, and the material eroded from them is carried by longshore drift to build depositional landforms such as Spurn Head.",
    explanation: "Credit explanation of rock type and structure, with named examples.",
    hints: ["Think about resistance and the direction of rock bands.", "Name places for each type."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 1.\n\n${CLIFF}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the retreat at site C between 2005 and 2025.", value: 38, unit: "m", wrong: [78], explanation: "58.0 − 20.0 = 38 m." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the mean annual rate of retreat at site C.", value: 1.9, unit: "m", tol: 0.05, answer: "1.9", wrong: [38, 2.9], explanation: "38 m ÷ 20 years = 1.9 m per year." }),
      P.manual({ label: "(c)", marks: 3, stem: "Compare the retreat at sites A, B and C and suggest reasons for the differences.", points: [
        "Granite (A) retreated very little (0.4 m) while boulder clay (C) retreated most (38 m); chalk (B) is in between (2.8 m).",
        "Granite is hard and resistant with few weaknesses.",
        "Boulder clay is soft and unconsolidated; it slumps when saturated and is easily removed by waves.",
      ], explanation: "Data plus explanation by rock type." }),
      P.manual({ label: "(d)", marks: 2, stem: "Site D has the same rock as site C. Explain why it retreated less.", points: [
        "D retreated 14 m (0.7 m a year) against 38 m (1.9 m a year) at C.",
        "Rock armour absorbs wave energy at the foot of the cliff, reducing erosion since 2012.",
      ], explanation: "Compare with data and explain the protection." }),
    ],
    hints: ["Rate = retreat ÷ number of years."],
    explanation: "Practice using cliff-retreat data.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `Study Table 2.\n\n${GEOL}`,
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "What type of coastline is described?", options: [
        ["Discordant", "Correct: the bands run at right angles to the coast."],
        ["Concordant", "Concordant bands would run parallel to the coast."],
        ["Depositional", "The description is about rock bands and erosion."],
        ["Emergent", "Nothing describes a change in sea level."],
      ], answer: "A", explanation: "Rock bands at right angles to the coast make a discordant coastline." }),
      P.num({ label: "(b)", marks: 1, stem: "What percentage of the coastline is made of rock with low resistance?", value: 63.6, unit: "%", tol: 0.5, answer: "64", wrong: [36.4, 7], explanation: "Low resistance = 4.0 + 3.0 = 7.0 km of 11.0 km; 7 ÷ 11 × 100 = 63.6 %." }),
      P.manual({ label: "(c)", marks: 2, stem: "State which sections will form headlands and which will form bays.", points: [
        "Headlands: sections 1 and 3 (limestone and chalk).",
        "Bays: sections 2 and 4 (clay and sand, clay).",
      ], explanation: "Resistant rock forms headlands; weak rock forms bays." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe **three** landforms likely to develop on the headland of section 3 over time.", points: [
        "Caves along joints in the chalk.",
        "Arches where caves are eroded through.",
        "Stacks and stumps after arch roofs collapse (also cliffs and a wave-cut platform).",
      ], explanation: "Any three erosional headland landforms." }),
    ],
    hints: ["Add up the lengths first.", "Which rocks resist erosion?"],
    explanation: "Practice with a discordant coastline.",
  });
  b.card("CONCEPT", "Cave, arch, stack, stump", "Waves exploit a joint → cave → eroded through → arch → roof collapses → stack → undercut → stump.");
  b.card("CONCEPT", "Wave-cut platform", "Notch at the cliff base → overhang collapses → cliff retreats → gently sloping platform left, exposed at low tide.");
  b.card("CONCEPT", "Headlands and bays", "Discordant coast: weak rock eroded into bays; resistant rock left as headlands.");
  b.card("DEFINITION", "Concordant coast", "Rock bands parallel to the coast; fairly straight; coves where the outer band is breached (Lulworth Cove).");
  b.card("DEFINITION", "Discordant coast", "Rock bands at right angles to the coast; alternating headlands and bays (Swanage Bay).");
  b.card("CONCEPT", "Spit formation", "Longshore drift continues past a change in coastline direction; deposition in calm water; recurved end; salt marsh behind.");
  b.card("DEFINITION", "Bar", "Ridge of sediment across a bay joining two headlands, trapping a lagoon (Slapton Sands).");
  b.card("CONCEPT", "Sand dune development", "Embryo dunes → yellow (fore) dunes bound by marram grass → grey dunes → dune slacks.");
  b.card("FACT", "Named coastal landforms", "Durdle Door (arch), Old Harry Rocks (stack and stump), Spurn Head (spit), Slapton Sands (bar).");
});
