// W2b: mining.prospecting-mineralogy (ZIMSEC only; items are tagged to ZIMSEC automatically).
// Computed: SG = Wair/(Wair - Wwater): 38.6/2.0 = 19.3 (gold), 25.0/5.0 = 5.0 (pyrite), 26.5/10.0 = 2.65 (quartz); grade 12.5 g / 2.5 t = 5 g/t;
// 40 t x 5 = 200 g; copper background (25+30+25+30)/4 = 27.5, anomaly 310/27.5 = 11.3.
import { concept, P, geographyLevels, chk, rnd, mean } from "../lib.mjs";
import { mc, tbl } from "../tables/w2b-_q.mjs";

const sg = (air, water) => air / (air - water);
const sgGold = chk(sg(38.6, 36.6), 19.3, 1e-9);
const sgPyrite = chk(sg(25.0, 20.0), 5.0);
const sgQuartz = chk(sg(26.5, 16.5), 2.65, 1e-9);
const grade = chk(12.5 / (2500 / 1000), 5);
const goldIn40 = chk(40 * grade, 200);
const CU = [25, 30, 25, 310, 30, 140, 28];
const bg = chk(mean([CU[0], CU[1], CU[2], CU[4]]), 27.5);
const anomaly = rnd(310 / bg, 1, 11.3, "anomaly");
const CUTAB = tbl(["Station", ...CU.map((_, i) => i + 1)], [["Copper in soil (ppm)", ...CU]]);
const SAMP = tbl(["Sample", "Colour and lustre", "Weight in air (g)", "Weight in water (g)"], [["A", "Brassy yellow, metallic, brittle", "25.0", "20.0"], ["B", "Golden yellow, metallic, bends without breaking", "38.6", "36.6"]]);
const ratioHard = chk(Math.round((7 / 2.5) * 10) / 10, 2.8);

concept("ageo.mining.prospecting-mineralogy", { file: "mining/prospecting-mineralogy", keyPrefix: "mining.prospecting-mineralogy" }, (b) => {
  mc(b, 1, "RECALL", "What is the **streak** of a mineral?", [
    ["The colour of its powder when rubbed on an unglazed tile", "Correct: streak is more reliable than surface colour."],
    ["The shine of its surface in sunlight", "That is lustre."],
    ["The way it breaks along flat planes", "That is cleavage."],
    ["Its mass compared with the mass of an equal volume of water", "That is specific gravity."],
  ], "The **streak** is the colour of the powdered mineral.");
  mc(b, 2, "UNDERSTANDING", "Why do prospectors use an ultraviolet lamp in the dark?", [
    ["Some minerals glow under ultraviolet light", "Correct: scheelite, for example, fluoresces."],
    ["It melts rocks so that the metal can be collected", "UV light does not melt rock."],
    ["It makes every mineral turn the same colour", "Minerals respond differently."],
    ["It measures the depth of a deposit below the surface", "It cannot measure depth."],
  ], "Some minerals **fluoresce** under UV light.");
  mc(b, 2, "UNDERSTANDING", "Which method measures properties such as magnetism and electrical resistance from the surface?", [
    ["Geophysical survey", "Correct: it detects physical anomalies in the rocks."],
    ["Geochemical survey", "That analyses the chemistry of soil or rock samples."],
    ["Panning", "Panning separates heavy grains by washing."],
    ["Pegging", "Pegging marks the boundary of a claim."],
  ], "A **geophysical** survey measures physical properties.");
  mc(b, 2, "UNDERSTANDING", "Which test best distinguishes gold from pyrite?", [
    ["Specific gravity, because gold is much denser", "Correct: gold is 19.3 and pyrite about 5.0."],
    ["Surface colour, because gold is always brighter", "Both are yellow and surface colour can mislead."],
    ["Taste, because gold has no taste and pyrite is salty", "Minerals must never be tasted."],
    ["Sound, because gold rings when struck", "Sound is not a reliable test."],
  ], "**Specific gravity** (and hardness) separate gold from pyrite.");
  mc(b, 3, "APPLICATION", "A mineral scratches calcite but is scratched by fluorite. What is its hardness on the Mohs scale?", [
    ["Between 3 and 4", "Correct: calcite is 3 and fluorite is 4."],
    ["Between 4 and 5", "It is scratched by fluorite (4), so it is softer."],
    ["Between 6 and 7", "It would scratch fluorite if it were this hard."],
    ["Exactly 10", "It could not be scratched by fluorite."],
  ], "It is harder than calcite (3) and softer than fluorite (4).", { hints: ["What can scratch it, and what can it scratch?"] });
  mc(b, 3, "ANALYSIS", "A geochemical survey shows copper in soil 11 times the background at one station, but the surrounding area is covered by deep soil. What is the best next step?", [
    ["Trench or drill near the station to check the rock beneath", "Correct: the anomaly needs confirming at depth."],
    ["Open a large mine at once", "An anomaly alone does not prove a deposit."],
    ["Ignore the result because soil samples are always unreliable", "Anomalies are valuable clues."],
    ["Repeat the survey in a different country", "The next step is local follow-up."],
  ], "An anomaly is a **clue**; trenching or drilling tests it.", { hints: ["An anomaly does not prove a deposit."] });
  b.tf({ d: 1, skill: "RECALL", stem: "Gangue is the worthless rock and mineral that occurs with an ore.", answer: true,
    feedbackTrue: "Correct: quartz is common gangue in gold reefs.",
    feedbackFalse: "Not so: gangue is the unwanted material mixed with the ore.",
    explanation: "**Gangue** is the unwanted material." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Dilute hydrochloric acid fizzes when dropped on calcite.", answer: true,
    feedbackTrue: "Correct: carbonates effervesce, releasing carbon dioxide.",
    feedbackFalse: "Not so: calcite reacts with dilute acid.",
    explanation: "Calcite is a carbonate and fizzes in acid." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Quartz has a hardness of {{blank:a}} on the Mohs scale. The ratio of the density of a mineral to that of water is its specific {{blank:b}}. Valuable rock mined at a profit is called {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["7"], choices: ["7", "3", "10"] },
      { id: "b", accepted: ["gravity"], choices: ["gravity", "streak", "cleavage"] },
      { id: "c", accepted: ["ore"], choices: ["ore", "gangue", "soil"] },
    ], explanation: "Quartz 7; specific gravity; ore." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each mineral to a key property.",
    pairs: [
      ["Gold", "Soft, malleable and very dense (SG 19.3)"],
      ["Galena", "Cubic cleavage and high density (SG about 7.5)"],
      ["Magnetite", "Attracted by a magnet"],
      ["Calcite", "Fizzes in dilute acid"],
    ], explanation: "These properties help to identify each mineral." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, dp: 1,
    stem: "A yellow metallic sample weighs 38.6 g in air and 36.6 g in water. Calculate its specific gravity, using SG = weight in air ÷ (weight in air − weight in water), to 1 decimal place.",
    hints: ["Find the loss of weight in water first."],
    value: sgGold, wrong: [1.05, 2],
    explanation: "Loss in water = 38.6 − 36.6 = 2.0 g. SG = 38.6 ÷ 2.0 = **19.3**, which matches gold." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, dp: 1,
    stem: "A brassy yellow sample weighs 25.0 g in air and 20.0 g in water. Calculate its specific gravity to 1 decimal place.",
    hints: ["SG = weight in air ÷ (weight in air − weight in water)."],
    value: sgPyrite, wrong: [1.25, 0.8],
    explanation: "Loss = 25.0 − 20.0 = 5.0 g. SG = 25.0 ÷ 5.0 = **5.0**, which matches pyrite, not gold." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, dp: 0,
    stem: "A 2 500 kg sample of ore contains 12.5 g of gold. Calculate the grade, in grams of gold per tonne of ore.",
    hints: ["Convert the ore mass to tonnes first (1 tonne = 1 000 kg)."],
    value: grade, wrong: [0.005, 200],
    explanation: "Ore = 2 500 ÷ 1 000 = 2.5 t. Grade = 12.5 ÷ 2.5 = **5 g per tonne**. Dividing 12.5 by 2 500 gives 0.005, which forgets the conversion." });
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true, dp: 1, unit: "times",
    stem: `Copper in soil along a line of seven stations:\n\n${CUTAB}\n\nThe background value is the mean of stations 1, 2, 3 and 5. How many times greater than the background is the value at station 4? Give the answer to 1 decimal place.`,
    hints: ["Find the background mean first.", "Divide station 4 by the background."],
    value: anomaly, wrong: [11.5, 282.5],
    explanation: "1. Background = (25 + 30 + 25 + 30) ÷ 4 = 27.5 ppm.\n2. Ratio = 310 ÷ 27.5 = **11.3**.\n3. Subtracting (282.5) gives a difference, not a ratio." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the scale used to compare the hardness of minerals, from 1 (talc) to 10 (diamond).",
    accepted: ["Mohs", "Mohs scale", "the Mohs scale", "Mohs hardness scale", "Mohs' scale"], wrong: ["Richter"],
    explanation: "The **Mohs scale**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the common non-valuable mineral that forms the glassy gangue in many gold reefs and has a hardness of 7.",
    accepted: ["quartz", "quartz."], wrong: ["calcite"],
    explanation: "**Quartz**." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how indigenous knowledge can be used to prospect for minerals.",
    hints: ["Think of plants, termites, soils and old workings."],
    points: [
      "Indicator plants that grow only on soils rich in a metal, such as the copper flower, show where metal is present.",
      "Termite mounds bring up material from below the surface, so samples from the mounds can be tested.",
      "Colour changes in soil, place names and old workings point to earlier discoveries.",
    ],
    modelAnswer: "Indicator plants, such as the copper flower, grow on metal-rich soil. Termite mounds bring up material from depth that can be tested, and soil colours, place names and old workings indicate earlier discoveries.",
    explanation: "Plants, termites and local signs." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why specific gravity is a better test than colour for distinguishing gold from pyrite.",
    hints: ["Compare the values and say why colour can mislead."],
    points: [
      "Both have a yellow metallic appearance, so colour cannot separate them reliably.",
      "Surface colour changes with weathering and tarnish.",
      "Gold has a specific gravity of 19.3 and pyrite only about 5.0, a large and measurable difference.",
      "SG is found by weighing in air and in water, which needs only simple equipment.",
    ],
    modelAnswer: "Both minerals are yellow and metallic, and surface colour changes with weathering, so colour is unreliable. Gold has an SG of 19.3 and pyrite about 5.0, a large difference that can be found by weighing in air and in water with simple equipment.",
    explanation: "Colour misleads; SG gives a measurable difference." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: `Two yellow samples are tested.\n\n${SAMP}\n\nIdentify which sample is gold, using calculations, and give two other tests that would support your conclusion.`,
    hints: ["Calculate SG = weight in air ÷ (air − water) for each."],
    points: [
      "Sample A has SG = 25.0 ÷ 5.0 = 5.0.",
      "Sample B has SG = 38.6 ÷ 2.0 = 19.3, which matches gold; sample A matches pyrite.",
      "Hardness: gold is soft (2.5–3) and can be scratched by a knife, whereas pyrite (6–6.5) cannot.",
      "Streak or malleability: gold gives a golden-yellow streak and bends without breaking; pyrite gives a greenish-black streak and is brittle.",
    ],
    modelAnswer: "Sample A has SG = 25.0 ÷ 5.0 = 5.0, which matches pyrite. Sample B has SG = 38.6 ÷ 2.0 = 19.3, which matches gold. Supporting tests are hardness (gold is scratched by a knife, pyrite is not) and streak or malleability (gold gives a golden-yellow streak and bends, pyrite gives a greenish-black streak and is brittle).",
    explanation: "Calculate SG and support it with hardness and streak." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `Pupils on a field trip collected two yellow metallic samples and tested them (illustrative data).\n\n${SAMP}`,
    hints: ["SG = weight in air ÷ (weight in air − weight in water)."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the specific gravity of sample A, to 1 decimal place.", value: sgPyrite, dp: 1, wrong: [1.25, 0.8],
        explanation: "25.0 ÷ (25.0 − 20.0) = 5.0." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the specific gravity of sample B, to 1 decimal place.", value: sgGold, dp: 1, wrong: [1.05, 2],
        explanation: "38.6 ÷ (38.6 − 36.6) = 19.3." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which conclusion do the results support?", options: [
        ["Sample B is gold and sample A is pyrite", "Correct: 19.3 matches gold and 5.0 matches pyrite."],
        ["Both samples are gold", "Their SG values are very different."],
        ["Sample A is gold and sample B is pyrite", "The identification is the wrong way round."],
        ["Both samples are quartz", "Quartz has SG 2.65 and is not metallic."],
      ], answer: "A", explanation: "SG separates the two samples." }),
      P.manual({ label: "(d)", marks: 3, stem: "State three safety precautions pupils should take when collecting and testing mineral samples.",
        points: [
          "Wear eye protection and gloves when breaking rock and handling acids.",
          "Never taste samples, and wash hands afterwards; keep chemicals labelled and away from children.",
          "Stay out of unsupported pits and old shafts, work in a group and tell someone where you are going.",
        ],
        modelAnswer: "Wear eye protection and gloves when breaking rock or handling acid. Never taste samples, wash hands afterwards and keep chemicals labelled. Stay out of unsupported pits and old shafts, work in a group and tell someone where you are going.",
        explanation: "Protect eyes and skin, avoid ingestion, avoid hazardous sites." }),
    ], explanation: "Use density tests to identify minerals and work safely." });

  b.struct({ d: 3, skill: "ANALYSIS",
    stem: `A geochemical survey measured copper in soil at seven stations (illustrative data).\n\n${CUTAB}`,
    hints: ["The background is the mean of stations 1, 2, 3 and 5.", "Anomaly = highest value ÷ background."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean copper in soil at stations 1, 2, 3 and 5, in ppm to 1 decimal place.", value: bg, dp: 1, unit: "ppm", wrong: [85.7, 110],
        explanation: "(25 + 30 + 25 + 30) ÷ 4 = 27.5 ppm." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate how many times greater station 4 is than this background, to 1 decimal place.", value: anomaly, dp: 1, unit: "times", wrong: [282.5, 5.1],
        explanation: "310 ÷ 27.5 = 11.3." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest two steps that should follow the survey.",
        points: [
          "Take more soil samples around station 4 on a closer grid or an extra line to map the extent of the anomaly.",
          "Dig trenches or drill boreholes near station 4 to reach the rock and measure the grade.",
        ],
        modelAnswer: "Take more soil samples around station 4 on a closer grid to show the size of the anomaly, then trench or drill near it to reach the rock and measure the grade.",
        explanation: "Map the anomaly, then test at depth." }),
    ], explanation: "Interpret a geochemical anomaly and plan follow-up." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the usefulness of indigenous knowledge compared with modern scientific methods in prospecting for minerals.",
    hints: ["Give strengths and weaknesses of both.", "Say how they can be combined."],
    points: [
      "Indigenous knowledge (indicator plants, termite mounds, old workings) is cheap, local and gives first clues quickly.",
      "It needs no equipment and uses the experience of people who know the area.",
      "Its weaknesses are that it is not systematic, may be limited to the surface, and cannot give the size or grade of a deposit.",
      "Geochemical and geophysical surveys cover large areas systematically and detect hidden deposits.",
      "Remote sensing and GIS combine many layers to select areas quickly.",
      "Drilling and sampling measure the depth and grade, which is needed to decide on mining.",
      "Modern methods are costly and need skilled staff and laboratories, which small-scale miners may lack.",
      "Judgement: the methods work best together; indigenous clues guide where to apply modern surveys, which then prove the deposit.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Indigenous knowledge, such as indicator plants, termite mounds and old workings, is cheap and local and gives first clues quickly, but it is not systematic, is limited to the surface and cannot show the size or grade of a deposit. Geochemical and geophysical surveys cover large areas systematically and find hidden deposits, remote sensing and GIS combine many layers to select areas, and drilling measures depth and grade. However, modern methods are costly and need skilled staff and laboratories. I conclude that the methods work best together: indigenous clues guide where to use modern surveys, which then prove the deposit.",
    wordLimit: { max: 300 }, explanation: "Weigh strengths and weaknesses and judge." });

  b.card("FORMULA", "Specific gravity", "SG = weight in air ÷ (weight in air − weight in water). Gold 19.3; pyrite about 5.0; quartz 2.65.");
  b.card("FACT", "Mohs scale", "Talc 1, gypsum 2, calcite 3, fluorite 4, apatite 5, orthoclase 6, quartz 7, topaz 8, corundum 9, diamond 10.");
  b.card("DEFINITION", "Streak", "The colour of a mineral's powder when rubbed on an unglazed tile; more reliable than surface colour.");
  b.card("DEFINITION", "Ore and gangue", "Ore: rock with enough valuable mineral to mine at a profit. Gangue: the worthless material mixed with it.");
  b.card("CONCEPT", "Prospecting methods", "Indigenous knowledge, panning and trenching, UV lamp, geochemical, geophysical, remote sensing and GIS, drilling.");
  b.card("FORMULA", "Ore grade", "Grade = mass of metal ÷ mass of ore, usually in grams per tonne.");
  b.card("CONCEPT", "Gold or pyrite?", "Gold: soft (2.5–3), malleable, SG 19.3, golden streak. Pyrite: hard (6–6.5), brittle, SG about 5.0, greenish-black streak.");
  b.card("CONCEPT", "Mineral associations in Zimbabwe", "Gold with quartz and pyrite in greenstone belts; PGMs, chromite, nickel and copper on the Great Dyke; lithium minerals in pegmatites (Bikita).");
  b.card("CONCEPT", "Safety when testing minerals", "Eye protection and gloves, never taste samples, ventilation, labelled chemicals, avoid unsupported pits and old shafts.");
});
