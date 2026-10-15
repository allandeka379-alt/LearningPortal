// W3b: hazard.volcanoes (Cambridge only, A Level Paper 3 option 9). Data are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3b-_q.mjs";

const veiRatio = chk(10 ** (6 - 4), 100);
const pfMin = chk((14 / 120) * 60, 7, 1e-9);
const lahar = chk(25 * 3.6, 90, 1e-9);
const pctA = rnd((1900 / 60000) * 100, 1, 3.2, "pctA");
const ERT = tbl(["Eruption", "Type of volcano", "VEI", "Main hazard", "Deaths", "People living within 20 km"], [
  ["A", "Stratovolcano", 5, "Pyroclastic flows", "1 900", "60 000"],
  ["B", "Shield volcano", 1, "Lava flows", 0, "8 000"],
  ["C", "Stratovolcano", 3, "Lahars", "4 300", "25 000"],
]);
const VILL = [["X", 6, 1200], ["Y", 21, 3600], ["Z", 40, 5500]];
const totPop = chk(VILL.reduce((s, v) => s + v[2], 0), 10300);
const near = chk(VILL.filter((v) => v[1] <= 25).reduce((s, v) => s + v[2], 0), 4800);
const pctNear = rnd((near / totPop) * 100, 1, 46.6, "pctNear");
const tY = chk((21 / 42) * 60, 30, 1e-9);
const VT = tbl(["Village", "Distance from the crater along the valley (km)", "Population"], VILL.map((v) => [v[0], v[1], String(v[2]).replace(/(\d)(\d{3})$/, "$1 $2")]));

concept("ageo.hazard.volcanoes", { file: "hazard/volcanoes", keyPrefix: "hazard.volcanoes", applies: CAM }, (b) => {
  mc(b, 2, "RECALL", "Which type of volcano is built of alternating layers of lava and ash, with steep sides?", [
    ["Stratovolcano", "Correct: also called a composite volcano; viscous magma gives explosive eruptions."],
    ["Shield volcano", "A shield volcano has gentle slopes built of runny basalt lava."],
    ["Fissure volcano", "A fissure eruption produces sheets of lava with no cone."],
    ["Lava dome", "A dome is a rounded mound of very viscous lava, not a layered cone."],
  ], "A **stratovolcano** (composite volcano) has layers of lava and ash and steep slopes.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why do shield volcanoes such as Mauna Loa erupt mainly effusively?", [
    ["Their basalt magma is runny and loses gas easily", "Correct: low viscosity lets gas escape, so lava flows out gently."],
    ["Their magma is rich in silica and very sticky", "High-silica magma is viscous and gives explosive eruptions."],
    ["They lie above the subduction zones of the Pacific", "Shield volcanoes at hotspots are not above a subducting plate."],
    ["Their magma contains more dissolved gas than any other", "Gas-rich magma is more explosive, not less."],
  ], "**Low-viscosity basalt** lets gas escape, so eruptions are effusive.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is a lahar?", [
    ["A mud flow of volcanic material and water", "Correct: ash mixes with rain or melted ice and runs down valleys."],
    ["A cloud of hot gas and ash moving fast down a slope", "That describes a pyroclastic flow."],
    ["A flood caused by an eruption beneath a glacier", "That is a jökulhlaup."],
    ["A fragment of rock ejected from the crater in the air", "That is tephra (a volcanic bomb or block)."],
  ], "A **lahar** is a volcanic mud flow.");
  mc(b, 3, "ANALYSIS", "A VEI 5 eruption is compared with a VEI 3 eruption. Which statement is correct?", [
    ["The VEI 5 eruption ejects at least about 100 times more material", "Correct: each VEI step is about ten times the volume, so two steps give 10 × 10."],
    ["The VEI 5 eruption ejects about twice as much material as a VEI 3 eruption", "The scale is not linear."],
    ["The VEI 5 eruption always kills more people", "The VEI measures size, not deaths."],
    ["The two eruptions are of the same size but differ in type", "VEI measures size, so 5 and 3 differ."],
  ], "VEI is roughly logarithmic: two steps ≈ **100 times** the volume.", { hints: ["Each step is about ten times."] });
  mc(b, 3, "ANALYSIS", "Why did the 1991 eruption of Pinatubo cool the global climate for about two years?", [
    ["Sulfur dioxide formed aerosols in the stratosphere that reflected sunlight", "Correct: the aerosol layer reduced the sunlight reaching the surface."],
    ["Ash fell on the oceans and absorbed heat from the water", "The cooling came from aerosols high in the stratosphere."],
    ["Carbon dioxide from the eruption trapped heat near the surface of the Earth", "That would warm, not cool, and the amount was small."],
    ["Lava flows cooled the sea and reduced evaporation", "Lava has no global cooling effect."],
  ], "**Stratospheric sulfate aerosols** reflect incoming sunlight and cool the surface.", { hints: ["Think of what stays in the stratosphere for months."] });
  mc(b, 3, "APPLICATION", "Which hazard gives the least warning to people living 9 km from a stratovolcano after an eruption begins?", [
    ["Pyroclastic flows", "Correct: they travel at over 100 km/h and arrive within minutes."],
    ["Lava flows", "Viscous lava is slow, and people can usually walk away."],
    ["Lahars", "Lahars take longer to arrive, often giving time to reach high ground."],
    ["Slow, gradual ash fall", "Ash fall is slower to build up and can be sheltered from."],
  ], "**Pyroclastic flows** are fast and hot, and give almost no time to react.", { hints: ["Compare the speeds of the hazards."] });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Most deaths from volcanic eruptions are caused by slow-moving lava flows.", answer: false,
    feedbackTrue: "Not so: lava is usually slow enough to outrun.", feedbackFalse: "Correct: pyroclastic flows, lahars and ash-related impacts cause most deaths.",
    explanation: "Lava mostly destroys property. **Pyroclastic flows and lahars** kill the most people." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each term to its description.",
    pairs: [
      ["Pyroclastic flow", "Fast avalanche of hot gas, ash and rock"],
      ["Jökulhlaup", "Flood from melting of a glacier by an eruption"],
      ["Tephra", "Fragments of rock thrown out of a volcano"],
      ["Shield volcano", "Broad volcano built of runny basalt lava"],
      ["Lava dome", "Mound of very viscous lava in a crater"],
    ], explanation: "Each term names a volcanic hazard or type." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Magma with a high silica content is {{blank:a}} and tends to produce {{blank:b}} eruptions. The {{blank:c}} is a scale from 0 to 8 that classifies the size of an eruption.",
    blanks: [
      { id: "a", accepted: ["viscous"], choices: ["viscous", "runny", "cool"] },
      { id: "b", accepted: ["explosive"], choices: ["explosive", "effusive", "silent"] },
      { id: "c", accepted: ["VEI"], choices: ["VEI", "Richter scale", "Mercalli scale"] },
    ], explanation: "Viscous magma traps gas, giving explosive eruptions; the VEI classifies size." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the term for fragments of rock and ash ejected into the air in an eruption.",
    accepted: ["tephra", "pyroclastic material", "pyroclasts", "ash and tephra"],
    explanation: "**Tephra** includes ash, lapilli, bombs and blocks." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "times",
    stem: "Each step on the VEI is about ten times the volume of ejected material. About how many times larger is the minimum volume of a VEI 6 eruption than that of a VEI 4 eruption?",
    hints: ["Two steps, each a factor of 10."],
    value: veiRatio, wrong: [2, 20, 1000],
    explanation: "10 × 10 = **100**. The value 20 multiplies the step difference by 10 instead of using powers." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "min",
    stem: "A pyroclastic flow travels at 120 km/h down a valley. How many minutes does it take to reach a village 14 km from the vent?",
    hints: ["Time in hours = distance ÷ speed; multiply by 60."],
    value: pfMin, wrong: [0.117, 8.6, 1680],
    explanation: "1. Time = 14 ÷ 120 = 0.1167 h.\n2. 0.1167 × 60 = **7 minutes**.\n3. The value 0.117 is in hours." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "km/h",
    stem: "A lahar moves at 25 m/s. Convert this speed to km/h.",
    hints: ["1 m/s = 3.6 km/h."],
    value: lahar, wrong: [6.94, 900, 25],
    explanation: "25 × 3.6 = **90 km/h**. Dividing by 3.6 instead gives 6.94." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe three differences between a shield volcano and a stratovolcano.",
    points: [
      "Shape: shield volcanoes are broad with gentle slopes; stratovolcanoes are steep, symmetrical cones.",
      "Magma: shield volcanoes have runny basalt; stratovolcanoes have viscous, silica-rich magma.",
      "Eruptions: shield volcanoes erupt mostly effusively; stratovolcanoes erupt explosively, often with pyroclastic flows.",
    ],
    modelAnswer: "A shield volcano is broad with gentle slopes and a stratovolcano is a steep cone. Shield volcanoes have runny basalt lava, whereas stratovolcanoes have viscous silica-rich magma. Shield volcanoes erupt effusively, and stratovolcanoes erupt explosively.",
    explanation: "Compare shape, magma and eruption style." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a lahar forms and why it can be a deadly hazard far from the volcano.",
    hints: ["Water plus loose ash on steep slopes."],
    points: [
      "Loose volcanic ash and debris lie on steep slopes.",
      "Heavy rain, a crater lake or melted snow and ice add water, and the mixture flows as a dense mud flow.",
      "Lahars follow river valleys and can travel tens of kilometres, beyond the exclusion zone for other hazards.",
      "They are fast, strong and carry boulders, so they bury or sweep away settlements, often with little warning (Nevado del Ruiz, 1985).",
    ],
    modelAnswer: "Loose ash and debris lie on steep slopes. Heavy rain, melted snow or ice, or a crater lake adds water, and the mixture flows as a mud flow. Lahars follow river valleys for tens of kilometres, beyond the zone of other hazards. They are fast and carry boulders, so they bury settlements with little warning, as at Nevado del Ruiz in 1985.",
    explanation: "Ash + water + slope = lahar; valleys carry it far." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why volcanic eruptions can have long-term benefits as well as hazards.",
    hints: ["Think of soils, energy and resources."],
    points: [
      "Weathered volcanic ash and lava form fertile soils rich in minerals, so farming is productive and attracts people.",
      "Volcanic areas provide geothermal energy (for example Iceland).",
      "Volcanic landscapes attract tourists, which provides income and jobs.",
      "Mineral resources such as sulfur, building stone and gemstones are found near volcanoes.",
    ],
    modelAnswer: "Weathered volcanic ash and lava form fertile soils, so farming is productive. Volcanic areas provide geothermal energy, as in Iceland, and attract tourists who bring income and jobs. Minerals such as sulfur and building stone are also found near volcanoes.",
    explanation: "Soils, energy, tourism and minerals are the usual benefits." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Suggest why many people continue to live close to active volcanoes.",
    hints: ["Think about soils, jobs, poverty and perception."],
    points: [
      "Fertile soils support farming and livelihoods.",
      "Poverty and lack of land elsewhere, or family ties to the area, make it hard to move.",
      "Eruptions are infrequent, so people may underestimate the risk or trust that scientists will warn them.",
    ],
    modelAnswer: "Fertile soils support farming. Poverty and the lack of land elsewhere, or family ties, make it hard to move. Eruptions are rare, so people may underestimate the risk or trust that they will be warned.",
    explanation: "Benefits, lack of choice and risk perception." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table gives data for three eruptions (illustrative data, invented for this exercise).\n\n${ERT}`,
    hints: ["Percentage = deaths ÷ people within 20 km × 100.", "Compare the VEI with the deaths."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate deaths in eruption A as a percentage of the people living within 20 km, to one decimal place.", value: pctA, dp: 1, unit: "%", wrong: [1900, 31.6, 0.3],
        explanation: "1 900 ÷ 60 000 × 100 = 3.2%." }),
      P.mcq({ label: "(b)", marks: 1, stem: "What does the table show about the VEI and the number of deaths?", options: [
        ["A lower VEI can cause more deaths than a higher one", "Correct: eruption C (VEI 3) killed more than eruption A (VEI 5)."],
        ["A higher VEI always causes more deaths", "C has a lower VEI but more deaths."],
        ["The VEI is related to the number of people living near", "The table gives no such relationship."],
        ["Shield volcanoes have the highest VEI", "The shield volcano has the lowest VEI (1)."],
      ], answer: "A", explanation: "Deaths depend on hazard type, exposure and warning, not only size." }),
      P.manual({ label: "(c)", marks: 3, stem: "Suggest why eruption B caused no deaths.",
        points: ["The hazard was lava flow, which is slow, so people could walk away.", "The eruption was small (VEI 1) and affected a small area.", "Fewer people lived nearby (8 000) and warnings or monitoring allowed an evacuation."],
        modelAnswer: "The main hazard was lava flow, which is slow enough to outrun. The eruption was small (VEI 1) and affected a small area, and fewer people lived nearby, so evacuation was possible.",
        explanation: "Low hazard speed, small size, small exposed population." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why eruption C killed more people than eruption A, even though it was smaller.",
        points: ["Lahars travel far down valleys, beyond the area that was evacuated, and arrive quickly.", "A larger share of the population was exposed or not warned or evacuated in time."],
        modelAnswer: "Lahars travel far down valleys, beyond the evacuated area, and arrive quickly. A larger share of the people were exposed or were not warned in time.",
        explanation: "Hazard type and warning outweigh size." }),
    ], explanation: "Calculate a percentage, interpret the VEI and explain differences in deaths." });

  b.struct({ d: 5, skill: "ANALYSIS", examStyle: true,
    stem: `A stratovolcano is monitored for lahar risk. The table shows three villages along a river valley (illustrative data). A lahar is expected to travel down the valley at 42 km/h.\n\n${VT}`,
    hints: ["Time in minutes = distance ÷ speed × 60.", "Add the populations within 25 km first."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate how many minutes the lahar would take to reach village Y.", value: tY, unit: "min", wrong: [0.5, 50, 126],
        explanation: "21 ÷ 42 = 0.5 h = 30 minutes. The value 0.5 is in hours." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage of the population of the three villages that live within 25 km of the crater, to one decimal place.", value: pctNear, dp: 1, unit: "%", wrong: [4800, 53.4, 11.7],
        explanation: "Within 25 km: 1 200 + 3 600 = 4 800. Total = 10 300. 4 800 ÷ 10 300 × 100 = 46.6%." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why a lahar warning system is more effective for village Z than for village X.",
        points: ["Village Z is 40 km away, so the lahar takes about 57 minutes to arrive.", "Village X is 6 km away, so it would take only about 9 minutes, too little time to evacuate.", "Warning signals can therefore be sent to Z, and its people can move to high ground."],
        modelAnswer: "Village Z is 40 km away, so the lahar needs about 57 minutes to arrive, enough time to warn people and move to high ground. Village X is only 6 km away, so the lahar would arrive in about 9 minutes, too little time to evacuate.",
        explanation: "Warning time depends on distance and speed." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two measures to reduce the lahar risk to village X.",
        points: ["Evacuate or relocate the village to higher ground away from the valley floor.", "Build channels or sediment dams, or set up a monitoring system with sirens and clear evacuation routes."],
        modelAnswer: "Relocate the village to higher ground away from the valley floor. Build sediment dams and set up a monitoring system with sirens and clear evacuation routes.",
        explanation: "Reduce exposure or the hazard, and improve warning." }),
      P.manual({ label: "(e)", marks: 3, stem: "Assess how far the distance from the crater alone determines the risk from a volcano.",
        points: ["Distance matters because warning time and the intensity of hazards such as ash and pyroclastic flows fall with distance.", "But valleys channel lahars and floods, so villages far away may be at risk while others close by on high ground are safe.", "Population density, warning, evacuation routes and trust in the authorities also decide the risk, so distance is only one factor."],
        modelAnswer: "Distance matters because warning time and the intensity of hazards fall with distance. But valleys channel lahars far from the crater, and some places close by on high ground are safe. Population density, warning and evacuation routes also decide the risk, so distance is only one factor.",
        explanation: "Weigh distance against topography and vulnerability." }),
    ], explanation: "Calculate travel times and shares, explain warning times and suggest management." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the view that the impacts of a volcanic eruption last much longer than the eruption itself. Use examples.",
    hints: ["Think of Montserrat, Pinatubo and the climate.", "Include benefits as well as costs."],
    points: [
      "The eruption itself may be short (hours or days), so the immediate hazards (pyroclastic flows, ash fall) are brief.",
      "Lahars can continue for years after the eruption as rain remobilises ash, as at Pinatubo after 1991.",
      "Land and settlements can be lost permanently: Plymouth on Montserrat was abandoned after 1997 and the population fell as people left.",
      "Economic effects last: farming, tourism and infrastructure are damaged, and rebuilding is slow and costly.",
      "Global effects of sulfur dioxide, such as the cooling after Pinatubo, last about two years.",
      "Long-term benefits: fertile soils, geothermal power and tourism develop over time.",
      "Not always: small eruptions of effusive volcanoes (Hawaii) may leave short-lived impacts that are quickly repaired.",
      "Judgement: for large explosive eruptions the effects last far longer than the eruption, so the view is largely correct, though some impacts are short-lived or beneficial.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "For large explosive eruptions the impacts last far longer than the eruption. After Pinatubo in 1991 lahars continued for years as rain remobilised the ash, and farmland and communities were buried. On Montserrat the capital Plymouth was abandoned from 1997 and many people left the island, so the economy and population changed permanently. Sulfur dioxide from Pinatubo cooled the climate for about two years. Over decades, volcanic ash weathers into fertile soil and geothermal energy and tourism may bring benefits. However, small effusive eruptions, as in Hawaii, often have short-lived effects. I conclude that the view is largely correct for large explosive eruptions.",
    wordLimit: { max: 300 }, explanation: "Compare short-term and long-term effects, with named, dated examples, and judge." });

  b.card("DEFINITION", "Effusive and explosive eruptions", "Effusive: runny, low-viscosity lava flows out (shield volcanoes). Explosive: viscous, gas-rich magma is blasted into ash and fragments (stratovolcanoes).");
  b.card("CONCEPT", "Volcano types", "Stratovolcano: steep cone of lava and ash. Shield: broad, runny basalt. Cinder cone: small cone of fragments. Lava dome: mound of viscous lava. Fissure: lava sheets from long cracks.");
  b.card("DEFINITION", "Pyroclastic flow", "A fast avalanche of hot gas, ash and rock at several hundred degrees Celsius, travelling at over 100 km/h: the most lethal volcanic hazard.");
  b.card("DEFINITION", "Lahar", "A volcanic mud flow of ash and water (rain, melted ice or a crater lake) that follows valleys and can travel tens of kilometres.");
  b.card("DEFINITION", "Jökulhlaup", "A sudden flood caused by an eruption melting a glacier or ice cap (Iceland).");
  b.card("FACT", "Volcanic Explosivity Index", "A scale from 0 to 8 based mainly on erupted volume and column height; roughly logarithmic, with each step about ten times the volume.");
  b.card("FACT", "Mount Pinatubo, 15 June 1991", "VEI 6 eruption in the Philippines; about 800 deaths because of warnings and evacuation; sulfur dioxide cooled the global climate by about 0.5 °C for about two years.");
  b.card("FACT", "Nevado del Ruiz, November 1985", "A VEI 3 eruption in Colombia: lahars from melted ice buried Armero and killed about 23 000 people, as the warnings were not acted on in time.");
  b.card("CONCEPT", "Why people live near volcanoes", "Fertile soils, jobs in farming and tourism, geothermal energy, poverty, family ties, and underestimating rare risks.");
});
