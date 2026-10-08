// Slice G2b: coastal opportunities, hazards and management (hard and soft engineering).
import { concept, P, geographyLevels } from "../lib.mjs";

const SCHEMES = "**Table 1: Coastal protection options for 1.2 km of eroding coast in front of a fictional seaside town**\n\n| Option | Cost (US\\$ million) | Expected life (years) | Notes |\n|---|---|---|---|\n| Sea wall | 14.4 | 60 | Protects the promenade; beach in front may be lowered |\n| Rock armour | 4.8 | 30 | Absorbs wave energy; restricts beach access |\n| Beach nourishment | 1.5 every 5 years | 5 | Wider beach for tourists; sand dredged offshore |\n| Managed retreat | 2.1 (compensation) | Permanent | 35 caravans and a car park moved inland |";

const RISK = "**Table 2: Land at risk along a fictional 10 km stretch of soft-cliff coast over the next 50 years**\n\n| Section | Main land use | Value at risk (US\\$ million) | Cost of protection (US\\$ million) |\n|---|---|---|---|\n| 1 | Town of 8,000 people | 120 | 18 |\n| 2 | Farmland | 3 | 9 |\n| 3 | Gas terminal | 400 | 12 |\n| 4 | Nature reserve with salt marsh | 1 | 6 |";

concept("geo.coasts.management", { file: "coasts/management", keyPrefix: "coasts.management" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a **soft engineering** method of coastal management?",
    options: [
      ["Beach nourishment", "Correct: adding sand works with natural processes."],
      ["Sea wall", "A sea wall is a hard structure."],
      ["Rock armour", "Rock armour is hard engineering."],
      ["Gabions", "Gabions are rock-filled cages: hard engineering."],
    ],
    answer: "A",
    explanation: "Soft engineering includes **beach nourishment**, dune regeneration and managed retreat.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What do **groynes** do?",
    options: [
      ["Trap sand moved by longshore drift", "Correct: they build up a wider beach."],
      ["Reflect waves back out to sea", "That is the job of a sea wall."],
      ["Allow the sea to flood low-value land", "That is managed retreat."],
      ["Stop rain from washing over the cliff", "Cliff drainage does this, not groynes."],
    ],
    answer: "A",
    explanation: "**Groynes** run out at right angles to the beach and trap sediment carried by longshore drift.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why can groynes **increase** erosion further along the coast?",
    options: [
      ["They trap sediment, so beaches downdrift receive less", "Correct: starved beaches protect cliffs less."],
      ["They reflect waves towards the next town", "Groynes do not reflect waves like a sea wall."],
      ["They make waves bigger along the whole coast", "Groynes do not change wave size offshore."],
      ["They raise sea level next to the beach", "Structures do not raise sea level."],
    ],
    answer: "A",
    explanation: "Sand trapped by groynes no longer moves on down the coast, so beaches downdrift become narrower and cliffs behind them erode faster (as south of Mappleton on the Holderness coast).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What causes a **storm surge**?",
    options: [
      ["Low air pressure and strong onshore winds", "Correct: the sea surface is raised and pushed onto land."],
      ["An earthquake on the sea bed", "Earthquakes cause tsunamis, not storm surges."],
      ["The melting of sea ice in summer", "Melting floating ice does not cause sudden surges."],
      ["Constructive waves on a calm day", "Storm surges need storms."],
    ],
    answer: "A",
    explanation: "Low pressure lets the sea surface rise, and strong winds pile water against the coast: a **storm surge**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does the Holderness coast in England erode so quickly?",
    options: [
      ["Soft boulder clay cliffs, long fetch and narrow beaches", "Correct: weak rock and powerful waves with little protection."],
      ["Hard granite cliffs that crack apart in winter frosts", "Holderness cliffs are soft boulder clay, not granite."],
      ["A sheltered position where constructive waves dominate", "It faces the North Sea with a long fetch."],
      ["Wide, high beaches that reflect most wave energy", "Its beaches are narrow and absorb little energy."],
    ],
    answer: "A",
    explanation: "Soft boulder clay slumps when wet, waves arrive with a long fetch from the north-east, and narrow beaches give little protection.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which coastal management decision is most likely to be judged **sustainable**?",
    options: [
      ["Managed retreat of low-value farmland to create salt marsh", "Correct: cheap, natural defence, little maintenance."],
      ["A new sea wall to protect a few isolated farm fields", "Costly to build and maintain for little value."],
      ["Removing sand from a beach to use in construction", "This increases erosion."],
      ["Building groynes that starve the next village's beach", "This moves the problem to others."],
    ],
    answer: "A",
    explanation: "Managed retreat works with natural processes, creates a natural buffer and avoids long-term maintenance costs.",
    hints: ["Sustainable means long-lasting, affordable and not harming others or the environment."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A shoreline plan chooses 'no active intervention' for a stretch of eroding farmland. What is the most likely reason?",
    options: [
      ["The cost of protection is greater than the value of the land", "Correct: protection would not be cost-effective."],
      ["The farmland is in fact not eroding at all, so nothing is needed", "The question says it is eroding."],
      ["Farmers asked for the land to be lost", "Landowners usually want protection."],
      ["Hard engineering is always forbidden by law on farmland", "Hard engineering is used elsewhere where justified."],
    ],
    answer: "A",
    explanation: "Decisions compare the cost of defences with the value of what is protected. Low-value farmland often does not justify costly works.",
    hints: ["Compare cost with benefit."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A town builds a vertical sea wall. Ten years later the beach in front of it has almost disappeared. What is the most likely explanation?",
    options: [
      ["Reflected waves scour the beach, carrying sand offshore", "Correct: energy bounced back removes sediment."],
      ["The wall stopped longshore drift completely", "A wall along the beach does not block drift like a groyne."],
      ["Constructive waves increased because of the wall", "The wall tends to make wave action more destructive."],
      ["Sea level fell, exposing the sand to wind", "Sea level has not fallen; the cause is wave reflection."],
    ],
    answer: "A",
    explanation: "A vertical wall reflects wave energy; the turbulent backwash scours the beach in front, lowering it and eventually undermining the wall.",
    hints: ["Where does the wave energy go when it hits a wall?"],
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A sea wall 650 m long costs US\\$5.2 million. Calculate the cost per metre in US dollars.",
    value: 8000, unit: "",
    wrong: [800, 125],
    explanation: "5,200,000 ÷ 650 = US\\$8,000 per metre.",
    workedSolution: "1. Convert to dollars: US\\$5.2 million = 5,200,000.\n2. Cost per metre = 5,200,000 ÷ 650 = 8,000.",
    hints: ["Write US\\$5.2 million in full first."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Large boulders piled at the foot of a cliff are called rock {{blank:a}}. Wire cages filled with rocks are called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["armour", "armor"], wrong: "groynes" },
      { id: "b", accepted: ["gabions", "gabion"], wrong: "groynes" },
    ],
    explanation: "**Rock armour** (rip-rap) and **gabions** both absorb wave energy.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each method with how it reduces erosion or flooding.",
    pairs: [
      ["Sea wall", "Reflects wave energy away from the land"],
      ["Groynes", "Trap longshore drift to widen the beach"],
      ["Beach nourishment", "Adds sand so the beach absorbs more energy"],
      ["Dune regeneration", "Plants and fences stabilise a natural barrier"],
      ["Managed retreat", "Lets low-value land flood to form salt marsh"],
    ],
    explanation: "Two hard and three soft engineering methods.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Ports, tourism and fishing are opportunities of living on the coast.",
    answer: true,
    explanation: "True. Coasts support trade, tourism, fishing, energy and flat land for settlement.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Beach nourishment is a one-off scheme that never needs repeating.",
    answer: false,
    explanation: "False. Waves and longshore drift remove the added sand, so nourishment must be repeated every few years.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Mozambican port city near which Cyclone Idai made landfall in March 2019.",
    accepted: ["Beira"],
    wrong: ["Maputo"],
    explanation: "**Beira**, a low-lying port that serves Zimbabwe, was badly damaged by Idai.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the hazards of living near the coast.",
    points: [
      "Coastal erosion destroys homes, roads and farmland as cliffs retreat.",
      "Flooding from storm surges or high tides damages property and kills people.",
      "Tropical storms bring destructive winds and heavy rain.",
      "Salt water contaminates farmland and water supplies / sea-level rise increases these risks / tsunamis.",
    ],
    modelAnswer: "Cliff erosion can destroy homes, roads and farmland. Storm surges and very high tides flood low-lying coasts, damaging property and drowning people. Tropical storms bring violent winds and heavy rain. Salt water can spoil farmland and wells, and rising sea levels are making flooding and erosion worse.",
    explanation: "Four distinct hazards.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Evaluate the use of a sea wall to protect a coastal town.",
    points: [
      "Advantage: strong, long-lasting protection for valuable property.",
      "Advantage: may provide a promenade for tourists.",
      "Disadvantage: very expensive to build and maintain.",
      "Disadvantage: reflected waves scour the beach, and it can look unnatural / judgement that it suits only high-value places.",
    ],
    modelAnswer: "A sea wall gives strong, long-lasting protection for a town with valuable buildings and can carry a promenade that attracts visitors. However, it is very expensive to build and repair, and by reflecting waves it scours away the beach in front, which may undermine the wall itself. It is worthwhile only where the value protected is high.",
    explanation: "Advantages, disadvantages and a judgement.",
    hints: ["Think about cost, effectiveness and side effects."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "For a named stretch of coastline, describe the causes and impacts of coastal erosion and evaluate how it has been managed.",
    points: [
      ["Named coast with located detail (e.g. Holderness, eastern England: Hornsea, Mappleton, Withernsea, Easington).", 1],
      ["Causes: soft boulder clay that slumps when wet; long fetch from the north-east.", 1],
      ["Further cause/rate: narrow beaches; retreat of roughly 1.5-2 m a year, among the fastest in Europe.", 1],
      ["Impacts: farmland, homes and roads lost; caravan parks moved; property values fall.", 1],
      ["Management described: sea walls, groynes, rock armour at towns; Mappleton 1991 rock groynes and armour; Easington gas terminal.", 1],
      ["Evaluation: towns protected but beaches starved to the south (terminal groyne effect); unprotected owners lose out.", 1],
      ["Judgement on overall effectiveness and sustainability.", 1],
    ],
    levels: geographyLevels(7),
    modelAnswer: "The Holderness coast in eastern England runs for about 60 km from Flamborough Head to Spurn Head. Its cliffs are made of soft boulder clay, which slumps when saturated by rain, and waves from the North Sea arrive with a long fetch from the north-east. Beaches are narrow, so they absorb little wave energy, and the coast retreats on average by roughly 1.5 to 2 m a year, among the fastest rates in Europe.\n\nErosion has destroyed farmland and homes, left roads ending at the cliff edge and forced caravan parks to move inland, and property values on the cliff top have fallen.\n\nThe towns of Hornsea and Withernsea are protected by sea walls, groynes and rock armour. At Mappleton, two rock groynes and rock armour were built in 1991 for about £2 million to protect the village and coast road, and rock armour protects the nationally important gas terminal at Easington. Elsewhere the coast is left to erode because protection would cost more than the land is worth.\n\nThe schemes have protected the towns and Mappleton, but by trapping sediment they have starved beaches further south, so erosion just south of Mappleton has increased. Owners on unprotected stretches receive little help. Overall, management is cost-effective for the places protected, but it moves the problem along the coast, so it is only partly sustainable.",
    explanation: "Level 3 answers give specific located causes and impacts and evaluate named schemes with a judgement.",
    hints: ["Name places along the coast.", "Consider who wins and who loses."],
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: `Study Table 1.\n\n${SCHEMES}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the cost of the sea wall per metre of coast, in US dollars.", value: 12000, unit: "", wrong: [1200, 12], explanation: "US\\$14.4 million ÷ 1,200 m = US\\$12,000 per metre." }),
      P.num({ label: "(b)", marks: 2, stem: "Rock armour lasts 30 years, so it must be built twice in 60 years. Calculate its cost per year over 60 years, in US dollars.", value: 160000, unit: "", wrong: [80000, 4800000], explanation: "Two builds: 2 × 4.8 = US\\$9.6 million over 60 years; 9,600,000 ÷ 60 = US\\$160,000 per year." }),
      P.num({ label: "(c)", marks: 1, stem: "Calculate the total cost of beach nourishment over 60 years, in millions of US dollars.", value: 18, unit: "", wrong: [1.5, 7.5], explanation: "60 ÷ 5 = 12 rounds; 12 × 1.5 = US\\$18 million." }),
      P.manual({ label: "(d)", marks: 4, stem: "Recommend which option the town should choose. Justify your choice using the table.", points: [
        "Option chosen with a clear statement.",
        "Cost evidence used (e.g. rock armour US\\$9.6 million over 60 years versus sea wall US\\$14.4 million or nourishment US\\$18 million).",
        "Effectiveness or side effects considered (e.g. sea wall lowers beach; rock armour restricts access; nourishment keeps the tourist beach).",
        "Sustainability or the people affected considered (e.g. managed retreat cheapest and natural but caravan owners lose sites).",
      ], explanation: "Credit a justified decision using data and side effects." }),
    ],
    hints: ["Make the costs comparable over the same period.", "Think about tourism as well as cost."],
    explanation: "Practice evaluating coastal management options.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 2.\n\n${RISK}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the ratio of value at risk to cost of protection for section 1 (value ÷ cost), to one decimal place.", value: 6.7, tol: 0.05, answer: "6.7", wrong: [0.15, 102], explanation: "120 ÷ 18 = 6.67, about 6.7." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which section has the highest value-to-cost ratio?", options: [
        ["Section 3", "Correct: 400 ÷ 12 = 33.3."],
        ["Section 1", "120 ÷ 18 = 6.7, lower than section 3."],
        ["Section 2", "3 ÷ 9 = 0.33: protection costs more than the land is worth."],
        ["Section 4", "1 ÷ 6 = 0.17, the lowest."],
      ], answer: "A", explanation: "The gas terminal has by far the highest value protected for each dollar spent." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest a suitable management option for sections 2 and 4. Explain your choice.", points: [
        "No active intervention or managed retreat.",
        "The cost of protection is greater than the value at risk (ratios below 1); salt marsh in section 4 can grow as a natural defence.",
      ], explanation: "Use the cost-benefit evidence." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why protecting sections 1 and 3 might increase erosion elsewhere.", points: [
        "Defences such as groynes trap sediment / stop the cliffs supplying sediment.",
        "Less sediment moves along the coast, so beaches downdrift become narrower and erode faster.",
      ], explanation: "Sediment starvation downdrift." }),
    ],
    hints: ["Divide value by cost for each section."],
    explanation: "Practice in cost-benefit decisions on the coast.",
  });
  b.card("CONCEPT", "Coastal opportunities", "Ports and trade, tourism, fishing, flat land, energy (oil, gas, wind), recreation.");
  b.card("CONCEPT", "Coastal hazards", "Erosion, flooding (storm surges, tsunamis), tropical storms, salt contamination, sea-level rise.");
  b.card("CONCEPT", "Hard engineering (coasts)", "Sea walls, groynes, rock armour, gabions: strong local protection, costly, side effects downdrift.");
  b.card("CONCEPT", "Soft engineering (coasts)", "Beach nourishment, dune regeneration, managed retreat, mangrove protection: work with nature.");
  b.card("DEFINITION", "Storm surge", "Temporary sea-level rise from low pressure and strong onshore winds during a storm.");
  b.card("DEFINITION", "Managed retreat", "Allowing low-value land to erode or flood, often creating salt marsh as a natural defence.");
  b.card("CONCEPT", "Shoreline management options", "Hold the line, advance the line, managed retreat, no active intervention.");
  b.card("FACT", "Holderness coast", "Boulder clay; roughly 1.5-2 m a year retreat; Mappleton groynes (1991) starved beaches to the south.");
  b.card("FACT", "Beira", "Low-lying Mozambican port serving Zimbabwe; hit by Cyclone Idai in March 2019.");
});
