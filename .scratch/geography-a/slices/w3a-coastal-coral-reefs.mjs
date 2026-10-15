// W3a: coastal.coral-reefs (Cambridge only, A Level Paper 3 option 8). Data are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, sum, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3a-_q.mjs";

// Singles
const age = chk(90 / 1.8, 50, 1e-9);
const relDecline = rnd(((52 - 31) / 52) * 100, 1, 40.4, "relDecline");
const acidRise = rnd((10 ** 0.2 - 1) * 100, 1, 58.5, "acidRise");
const heat = rnd(sum([0.4, 0.9, 1.4, 1.1, 0.7, 0.3]), 1, 4.8, "heat");
// Struct 1: reef survey (coral cover %, fish biomass)
const SV = [[2013, 58, 55], [2015, 36, 34], [2017, 41, 35], [2019, 47, 36], [2021, 50, 37]];
const SVTAB = tbl(["Year", "Coral cover, protected site (%)", "Coral cover, open to fishing (%)"], SV.map((r) => [r[0], r[1], r[2]]));
const declineP = rnd(((58 - 36) / 58) * 100, 1, 37.9, "declineP");
const recP = rnd((50 / 58) * 100, 1, 86.2, "recP");
const recF = rnd((37 / 55) * 100, 1, 67.3, "recF");
// Struct 2: rezoning
const TOT = 12000;
const noTakeBefore = chk(TOT * 0.08, 960, 1e-9);
const noTakeAfter = chk(TOT * 0.33, 3960, 1e-9);
const gain = chk(noTakeAfter - noTakeBefore, 3000, 1e-9);
const fmt = (n) => String(n).replace(/(\d)(?=(\d{3})$)/, "$1 ");
const ZTAB = tbl(["Zone", "Before rezoning: share of park (%)", "Before: area (km²)", "After rezoning: share of park (%)", "After: area (km²)"], [
  ["No-take (no fishing)", 8, fmt(noTakeBefore), 33, fmt(noTakeAfter)],
  ["Other zones (some fishing allowed)", 92, fmt(TOT - noTakeBefore), 67, fmt(TOT - noTakeAfter)],
]);

concept("ageo.coastal.coral-reefs", { file: "coastal/coral-reefs", keyPrefix: "coastal.coral-reefs", applies: CAM }, (b) => {
  mc(b, 1, "RECALL", "What are the algae that live inside the tissues of reef-building corals called?", [
    ["Zooxanthellae", "Correct: they photosynthesise and feed the coral."],
    ["Plankton", "Plankton drift in the water, not in coral tissue."],
    ["Polyps", "Polyps are the coral animals themselves."],
    ["Kelp", "Kelp is a large brown seaweed of cold coastal waters."],
  ], "**Zooxanthellae** are the symbiotic algae of coral.");
  mc(b, 2, "UNDERSTANDING", "Why do coral reefs grow only in shallow water?", [
    ["The zooxanthellae in the coral need sunlight to photosynthesise", "Correct: light fades with depth."],
    ["Coral polyps cannot survive in any water more than a metre deep", "Reefs can occur to depths of tens of metres."],
    ["The sea is always saltier in deeper water and kills the coral", "Salinity is not the main reason for the depth limit."],
    ["Waves are too small in deep water to bring food to the coral", "The depth limit is mainly caused by light."],
  ], "Zooxanthellae need **light**, which limits reefs to the upper tens of metres.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why are coral reefs absent near the mouths of large rivers?", [
    ["The water is fresher, muddier and clouded with sediment", "Correct: low salinity and sediment kill polyps and block light."],
    ["The sea is much warmer near river mouths than in other places", "River mouths are not warmer, and temperature is not the reason."],
    ["The waves are too strong for coral to attach to any surface", "Waves help reefs, which need moving water."],
    ["The sea floor is always too deep for coral to be able to grow", "Depth near river mouths is often shallow."],
  ], "River mouths are **fresh and turbid**, which coral cannot tolerate.");
  mc(b, 2, "UNDERSTANDING", "What happens when a coral bleaches?", [
    ["It expels its zooxanthellae and loses its colour and food supply", "Correct: the white skeleton shows through the tissue."],
    ["It releases large amounts of calcium carbonate into the water", "Bleaching is not the release of calcium carbonate."],
    ["It grows more quickly by absorbing extra nutrients from the sea", "A bleached coral is starved, not growing faster."],
    ["It dies at once and can never recover once the water cools down", "Bleached coral may recover if the stress ends."],
  ], "Bleaching is the **expulsion of the algae** under stress.");
  mc(b, 3, "ANALYSIS", "Why does ocean acidification harm coral?", [
    ["It reduces the carbonate ions that corals use to build their skeletons", "Correct: calcification slows and the skeleton becomes weaker."],
    ["It raises the temperature of the sea water above the bleaching threshold", "Acidification is a chemical change and not a heating effect."],
    ["It removes the oxygen from the water so that polyps suffocate", "The main effect is on carbonate chemistry."],
    ["It increases the amount of sunlight which reaches the coral", "Acidification does not change the light."],
  ], "More CO₂ lowers pH and **reduces carbonate** for skeletons.", { hints: ["What is the coral skeleton made of?"] });
  mc(b, 3, "APPLICATION", "A farm upstream of a reef starts to use more fertiliser. Which effect on the reef is most likely?", [
    ["Run-off feeds algae that overgrow the coral and cloud the water", "Correct: nutrients and sediment reduce light and shade the polyps."],
    ["Run-off cools the water and lets the coral grow more rapidly", "Nutrients do not cool the water or speed growth."],
    ["Run-off raises salinity and so protects the coral from bleaching", "Run-off is fresh and lowers salinity."],
    ["Run-off has no effect because the sea is too large to be changed", "Nutrient run-off is a well-documented threat."],
  ], "Nutrients and sediment from run-off cause **algal overgrowth and poor light**.", { hints: ["What do algae do when nutrients are plentiful?"] });
  mc(b, 3, "EVALUATION", "Which statement best evaluates the use of no-take zones to protect a reef?", [
    ["They help recovery and resilience but cannot stop warming", "Correct: local protection cannot control global temperature."],
    ["They stop bleaching because fish are not allowed to be caught there", "Protection from fishing does not prevent heat stress."],
    ["They have no benefit, since fish do not move between zones at all", "No-take zones can increase fish and coral recovery."],
    ["They are enough on their own to protect any reef from all threats", "Global threats need global action."],
  ], "No-take zones give **local benefits** but cannot remove global warming.", { hints: ["Which threats can be controlled locally, and which cannot?"] });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Coral is a plant that grows on rock in warm seas.", answer: false,
    feedbackTrue: "Not so: coral is an animal.", feedbackFalse: "Correct: corals are animals (polyps); the zooxanthellae are the algae living in them.",
    explanation: "A coral polyp is an **animal** with algae living inside it." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each reef type or term to its description.",
    pairs: [
      ["Fringing reef", "Reef growing close to the shore"],
      ["Barrier reef", "Reef separated from the land by a lagoon"],
      ["Atoll", "Ring-shaped reef surrounding a lagoon"],
      ["Zooxanthellae", "Algae living inside the coral tissue"],
      ["Crown-of-thorns", "Starfish that feeds on coral"],
    ], explanation: "Reef types differ in position, and the algae and starfish are the biological actors." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Coral polyps secrete a skeleton of calcium {{blank:a}}. Warm water can cause {{blank:b}}, when the coral loses its algae. A ring-shaped reef around a lagoon is an {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["carbonate"], choices: ["carbonate", "chloride", "sulphate"] },
      { id: "b", accepted: ["bleaching"], choices: ["bleaching", "calcification", "erosion"] },
      { id: "c", accepted: ["atoll"], choices: ["atoll", "estuary", "isthmus"] },
    ], explanation: "Calcium carbonate, bleaching and atoll are the key terms." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the process by which the oceans become more acidic as they absorb carbon dioxide.",
    accepted: ["ocean acidification", "acidification", "ocean acidification."], explanation: "**Ocean acidification** lowers the pH of sea water." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "years",
    stem: "A boulder-shaped coral head is 90 cm high and grows by 1.8 cm each year (illustrative data). Calculate its approximate age, in years.",
    hints: ["Height ÷ growth rate."],
    value: age, wrong: [162, 0.02],
    explanation: "90 ÷ 1.8 = **50 years**. The value 162 multiplies the two numbers." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "Live coral cover on a reef fell from 52% to 31% after a bleaching event (illustrative data). Calculate the fall as a percentage of the original cover, to one decimal place.",
    hints: ["Do not give the fall in percentage points; give the relative fall."],
    value: relDecline, dp: 1, wrong: [21, 67.7],
    explanation: "The fall is 52 − 31 = 21 percentage points. Relative fall = 21 ÷ 52 × 100 = **40.4%**. The value 21 is the fall in percentage points, and 67.7 divides by the final cover (21 ÷ 31)." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "Sea-water pH falls from 8.2 to 8.0 (illustrative values). The pH scale is logarithmic, so the hydrogen ion concentration is multiplied by $10^{\\text{(fall in pH)}}$. Calculate the percentage increase in hydrogen ion concentration, to one decimal place.",
    hints: ["Calculate $10^{0.2}$ and subtract 1."],
    value: acidRise, dp: 1, wrong: [2.5, 158.5, 20],
    explanation: "1. Fall in pH = 8.2 − 8.0 = 0.2.\n2. Ratio = $10^{0.2}$ = 1.585.\n3. Increase = 0.585 × 100 = **58.5%**. The value 158.5 is the ratio as a percentage, not the increase." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true,
    stem: "Over six weeks the sea temperature exceeded the bleaching threshold by 0.4, 0.9, 1.4, 1.1, 0.7 and 0.3 °C (illustrative data). The cumulative heat stress is the sum of the weekly excesses, in °C-weeks. Calculate it, to one decimal place.",
    hints: ["Add the six values."],
    value: heat, dp: 1, wrong: [0.8, 6.0, 4.4],
    explanation: "0.4 + 0.9 + 1.4 + 1.1 + 0.7 + 0.3 = **4.8 °C-weeks**. The value 0.8 is the mean weekly excess (4.8 ÷ 6)." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the symbiotic relationship between coral polyps and zooxanthellae.",
    points: [
      "The zooxanthellae live inside the coral tissue and photosynthesise using sunlight, providing the coral with most of its food energy.",
      "The coral gives the algae shelter, carbon dioxide and nutrients from its waste.",
      "Both benefit, which allows reefs to grow in nutrient-poor tropical water.",
    ],
    modelAnswer: "The zooxanthellae live inside the coral tissue and photosynthesise using sunlight, giving the coral most of its food energy. The coral gives the algae shelter, carbon dioxide and nutrients from its waste. Both benefit, which lets reefs grow in nutrient-poor tropical water.",
    explanation: "Both partners gain: food for the coral and shelter and nutrients for the algae." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why reefs grow only in particular conditions of temperature, depth and water quality.",
    hints: ["Pair each condition with a reason."],
    points: [
      "Warm water (about 23–29 °C) is needed for coral growth and the activity of the algae; below about 18 °C most reefs cannot grow.",
      "Shallow water is needed so that enough light reaches the zooxanthellae for photosynthesis.",
      "Clear water with little sediment prevents the light from being blocked and the polyps from being smothered.",
      "Normal salinity (32–36 parts per thousand) and moving, oxygenated water are needed, and fresh water from rivers kills the coral.",
    ],
    modelAnswer: "Warm water of about 23–29 °C is needed for growth and for the algae to work. Shallow water is needed so that enough light reaches the zooxanthellae. Clear water prevents the light from being blocked and the polyps from being smothered. Normal salinity and moving, oxygenated water are needed, and fresh water from rivers kills the coral.",
    explanation: "Pair temperature, light, water clarity and salinity with their reasons." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how global warming threatens coral reefs.",
    hints: ["Mention temperature, acidity, storms and sea level."],
    points: [
      "Warmer water causes the corals to expel their zooxanthellae (bleaching); prolonged or repeated bleaching causes the coral to die.",
      "More carbon dioxide dissolves in the sea, lowering its pH (acidification) and reducing the carbonate that corals need for their skeletons.",
      "Warming may increase the intensity of tropical cyclones, which damage reefs, and repeated events limit the time to recover.",
      "Sea-level rise may drown weakened reefs that cannot grow upwards quickly enough.",
    ],
    modelAnswer: "Warmer water causes corals to expel their zooxanthellae, and prolonged or repeated bleaching kills them. More carbon dioxide dissolves in the sea and lowers its pH, reducing the carbonate that corals need for skeletons. Warming may increase the intensity of tropical cyclones, which damage reefs and limit time to recover, and sea-level rise may drown weakened reefs.",
    explanation: "Bleaching, acidification, storms and sea-level rise." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3,
    stem: "Evaluate the use of coral nurseries and transplanting to restore damaged reefs.",
    hints: ["Give a strength, a limit and a judgement."],
    points: [
      "Fragments of coral are grown in nurseries and planted on damaged reefs, which can speed recovery of small areas and reintroduce heat-tolerant colonies.",
      "It is slow, labour-intensive and costly, and covers only a small area compared with the size of reefs.",
      "Judgement: useful as a supplement, but without cuts in emissions and local pressures new corals can be bleached again, so it cannot replace protection.",
    ],
    modelAnswer: "Coral fragments grown in nurseries and planted on damaged reefs can speed up recovery of small areas and introduce heat-tolerant colonies. It is slow, labour-intensive and costly, and covers only a small part of the reef. It is a useful supplement, but it cannot replace protection and cuts in emissions, because new corals can be bleached again.",
    explanation: "Weigh the benefit against the scale and cost." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Live coral cover was surveyed at two sites on the same reef at five dates. A bleaching event occurred in 2015 (illustrative data, invented for this exercise).\n\n${SVTAB}`,
    hints: ["Percentage decline = fall ÷ 58 × 100.", "Which site was protected from fishing, and what do fish do for a reef?"],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage decline in coral cover at the protected site between 2013 and 2015, to one decimal place.", value: declineP, dp: 1, unit: "%", wrong: [22, 61.1, 62.1],
        explanation: "Fall = 58 − 36 = 22 percentage points. 22 ÷ 58 × 100 = 37.9%. The value 22 is the fall in percentage points." }),
      P.manual({ label: "(b)", marks: 3, stem: "Compare the recovery of coral cover at the two sites between 2015 and 2021.",
        points: [
          "At the protected site cover rose from 36% to 50%, recovering to about 86% of its 2013 level (58%).",
          "At the site open to fishing cover rose only from 34% to 37%, recovering to about 67% of its 2013 level (55%).",
          "The protected site recovered more quickly and by a greater amount (14 points compared with 3 points), and the gap between the sites widened.",
        ],
        modelAnswer: "At the protected site cover rose from 36% to 50%, about 86% of its 2013 level of 58%. At the site open to fishing cover rose only from 34% to 37%, about 67% of its 2013 level. The protected site recovered more quickly and by more, 14 percentage points compared with 3, so the gap between the sites widened.",
        explanation: "Quote the changes and compare with the 2013 starting point." }),
      P.manual({ label: "(c)", marks: 3, stem: "Suggest reasons why the protected site recovered faster.",
        points: [
          "Fish that graze algae are more numerous in the protected area, so algae are kept in check and coral larvae can settle.",
          "There is less physical damage from fishing gear and anchors, and fewer people, so remaining colonies survive.",
          "More healthy coral nearby supplies larvae, and the site may be less polluted or have a stronger monitoring effort.",
        ],
        modelAnswer: "Fish that graze algae are more numerous in the protected area, so algae are kept in check and coral larvae can settle. There is less damage from fishing gear and anchors, so surviving colonies are not lost. More healthy coral nearby supplies larvae to the site.",
        explanation: "Grazers, less damage and larval supply." }),
    ], explanation: "Calculate a decline, compare recovery and suggest reasons." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `A marine park of ${TOT.toLocaleString("en-GB").replace(",", " ")} km² was rezoned to give more protection to its reefs (illustrative data, invented for this exercise).\n\n${ZTAB}`,
    hints: ["Area = share × total area of the park.", "Think about which threats a no-take zone can and cannot control."],
    parts: [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the increase in the area of the no-take zones, in km².", value: gain, unit: "km²", wrong: [2640, 25, 3960],
            explanation: "After − before = 3 960 − 960 = 3 000 km². The value 3 960 is the area after rezoning." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "What is the percentage point increase in the share of the park that is no-take?", options: [
            ["25", "Correct: 33 − 8 = 25 percentage points."],
            ["41", "This is 33 + 8."],
            ["75", "This is 100 − 25."],
            ["312.5", "This is the relative increase (25 ÷ 8 × 100), not the increase in percentage points."],
          ], answer: "A", explanation: "33% − 8% = 25 percentage points." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain how no-take zones can help a reef to recover.",
        points: [
          "Fishing is banned, so numbers and sizes of fish increase, including grazers that keep algae from overgrowing coral.",
          "There is less physical damage from nets, anchors and destructive fishing.",
          "A healthier reef with more coral and fish is more resilient and supplies larvae to nearby areas.",
        ],
        modelAnswer: "Fishing is banned, so the numbers and sizes of fish increase, including grazers that keep algae from overgrowing coral. There is less physical damage from nets, anchors and destructive fishing. A healthier reef is more resilient and supplies larvae to nearby areas.",
        explanation: "Fish, less damage and larval supply." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why the rezoning cannot protect the park from mass bleaching.",
        points: [
          "Bleaching is caused by unusually warm sea water, a result of global warming, which a park manager cannot control.",
          "Zone boundaries do not stop warm water, so all zones, including no-take zones, are exposed to the same heat stress.",
          "Rising levels of carbon dioxide and acidification are also global, so only international cuts in emissions address the cause.",
        ],
        modelAnswer: "Bleaching is caused by unusually warm sea water as a result of global warming, which a park manager cannot control. Zone boundaries do not stop warm water, so all zones are exposed to the same heat stress. Acidification is also global, so only international cuts in emissions address the cause.",
        explanation: "Global drivers cannot be managed by local zoning." }),
      P.manual({ label: "(d)", marks: 3, stem: "Assess how successful the rezoning is likely to be in protecting the reef.",
        points: [
          "The no-take share has risen from 8% to 33% (3 000 km² more), which should increase fish stocks and the reef's resilience and recovery.",
          "But local pressure is only part of the problem: climate-related bleaching, run-off from the land and enforcement outside the park remain.",
          "Judgement: partly successful, since it improves the resilience of the reef, but it needs to be combined with better water quality and global action.",
        ],
        modelAnswer: "The no-take share has risen from 8% to 33%, 3 000 km² more, which should increase fish stocks and the resilience and recovery of the reef. But climate-related bleaching, run-off from the land and enforcement problems remain. The rezoning is likely to be partly successful, but must be combined with better water quality and global action.",
        explanation: "Weigh the benefit of protection against the threats that it cannot control." }),
    ], explanation: "Calculate change in protected area, explain benefits and limits and assess success." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "To what extent can local management protect coral reefs from the effects of climate change?",
    hints: ["Separate local threats from global threats.", "Use a named reef such as the Great Barrier Reef."],
    points: [
      "Local management can reduce stresses that make corals less resilient: overfishing, destructive fishing, anchor damage, tourism pressure and pollution.",
      "Marine protected areas and zoning (for example the Great Barrier Reef Marine Park, rezoned in 2004 to protect about a third in no-take zones) increase fish stocks and recovery.",
      "Improving water quality reduces run-off of sediment and fertiliser and the risk of crown-of-thorns outbreaks.",
      "Restoration (nurseries, transplanting heat-tolerant corals) helps in small areas but is costly and slow.",
      "But local management cannot stop sea-temperature rise or acidification, which are global: the Great Barrier Reef has suffered repeated mass bleaching since 2016 despite its protection.",
      "Healthy, well-managed reefs recover better after bleaching, so local action buys time.",
      "Long-term protection needs cuts in greenhouse gas emissions through international agreements.",
      "Judgement: local management reduces the impact and helps recovery, but it can protect reefs from climate change only to a limited extent without global action.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Local management can reduce stresses that make corals less resilient, such as overfishing, anchor damage, tourism pressure and pollution. In the Great Barrier Reef Marine Park, rezoning in 2004 placed about a third of the park in no-take zones, which increases fish stocks and recovery, and water-quality plans reduce run-off and the risk of crown-of-thorns outbreaks. Restoration through nurseries can help in small areas, but it is slow and costly. However, local management cannot stop sea-temperature rise or acidification, which are global: the reef has suffered repeated mass bleaching since 2016 despite its protection. Healthy, well-managed reefs recover better, so local action buys time. I conclude that local management can reduce the impact and help recovery, but it protects reefs from climate change only to a limited extent unless emissions are cut globally.",
    wordLimit: { max: 300 }, explanation: "Separate local and global threats and judge the limits of local management." });

  b.card("DEFINITION", "Coral", "A marine animal (polyp) that secretes a calcium carbonate skeleton and, in reef-building species, lives with algae; many generations build a reef.");
  b.card("DEFINITION", "Zooxanthellae", "Algae that live in the tissues of reef-building coral, supplying food by photosynthesis in exchange for shelter and nutrients (symbiosis).");
  b.card("CONCEPT", "Conditions for coral growth", "Warm water (about 23–29 °C), shallow and clear water for light, salinity of 32–36 parts per thousand, moving oxygenated water and a hard base.");
  b.card("DEFINITION", "Coral bleaching", "Expulsion of zooxanthellae by stressed coral, usually in unusually warm water; the coral loses colour and food and may die.");
  b.card("DEFINITION", "Ocean acidification", "A fall in the pH of sea water as it absorbs carbon dioxide, reducing carbonate ions available for skeletons and shells.");
  b.card("CONCEPT", "Types of reef", "Fringing reefs grow near the shore, barrier reefs are separated by a lagoon, and atolls are rings of reef around a lagoon.");
  b.card("FACT", "Great Barrier Reef bleaching events", "Mass bleaching in 2016, 2017, 2020, 2022 and 2024.");
  b.card("FACT", "Great Barrier Reef Marine Park", "Established in 1975; rezoned in 2004 so that about a third of the park became no-take zones.");
  b.card("CONCEPT", "Why local management is limited", "Local action can reduce pollution, fishing and damage and aid recovery, but it cannot stop warming and acidification, which need global cuts in emissions.");
});
