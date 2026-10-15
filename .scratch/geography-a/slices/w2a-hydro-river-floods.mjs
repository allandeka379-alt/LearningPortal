// W2a: hydro.river-floods (both boards). Numbers computed: runoff coefficient, percentage change, lag time, density, share flooded
// (see tables/w2a-hydro-river-floods.mjs).
import { concept, P, geographyLevels, chk, rnd, ZIM } from "../lib.mjs";
import { mc, tbl } from "../tables/w2a-_q.mjs";

// Struct 1: hydrograph before and after clearing (illustrative)
const H = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const RAIN = [0, 6, 22, 10, 0, 0, 0, 0, 0, 0];
const QB = [4, 4, 5, 7, 12, 19, 26, 30, 24, 15];
const QA = [4, 5, 9, 22, 38, 48, 40, 27, 17, 10];
const HT = tbl(["Time (h)", ...H], [["Rainfall (mm/h)", ...RAIN], ["Discharge before clearing (m³/s)", ...QB], ["Discharge after clearing (m³/s)", ...QA]]);
const rainPeak = H[RAIN.indexOf(Math.max(...RAIN))];
const lagB = chk(H[QB.indexOf(Math.max(...QB))] - rainPeak, 5);
const lagA = chk(H[QA.indexOf(Math.max(...QA))] - rainPeak, 3);
const pkB = chk(Math.max(...QB), 30);
const pkA = chk(Math.max(...QA), 48);
const pctUp = chk(((pkA - pkB) / pkB) * 100, 60, 1e-9);
const BANKFULL = 40;
const over = chk(pkA - BANKFULL, 8);
// Struct 2: two settlements (illustrative)
const PA = { pop: 1800, km2: 0.6, houses: 480, flooded: 312 };
const QS = { pop: 900, km2: 1.5, houses: 360, flooded: 54 };
const dens = chk(PA.pop / PA.km2, 3000, 1e-9);
const pctFl = chk((PA.flooded / PA.houses) * 100, 65, 1e-9);
const densQ = chk(QS.pop / QS.km2, 600, 1e-9);
const pctFlQ = chk((QS.flooded / QS.houses) * 100, 15, 1e-9);
const ST = tbl(["", "Settlement P (on the floodplain)", "Settlement Q (on higher ground)"], [
  ["Population", PA.pop.toLocaleString("en-GB"), QS.pop],
  ["Built-up area (km²)", PA.km2, QS.km2],
  ["Houses", PA.houses, QS.houses],
  ["Houses flooded", PA.flooded, QS.flooded],
  ["Walls: mud brick without cement (%)", 70, 25],
  ["Warning received before the flood", "Few households", "Most households"],
]);
// Singles
const rain1 = chk(30 * 1e6 * 0.06, 1.8e6, 1e-6);
const coef1 = chk(0.54e6 / rain1, 0.3, 1e-9);
const pct2 = chk(((78 - 52) / 52) * 100, 50, 1e-9);
const exc = chk(66 - 45, 21);

concept("ageo.hydro.river-floods", { file: "hydro/river-floods", keyPrefix: "hydro.river-floods" }, (b) => {
  mc(b, 2, "RECALL", "What is meant by **bankfull discharge**?", [
    ["The greatest discharge a channel can carry without overflowing its banks", "Correct: above this value the river floods."],
    ["The average discharge of a river over a whole year", "That is the mean annual discharge."],
    ["The discharge reached at the peak of every storm hydrograph in the basin", "The peak of a storm is not always bankfull."],
    ["The lowest discharge recorded at the end of the dry season", "That is the minimum or baseflow."],
  ], "A flood begins when discharge **exceeds bankfull discharge**.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which is a human cause of increased flood risk?", [
    ["Replacing woodland with paved surfaces and drains", "Correct: less infiltration and faster runoff."],
    ["A long period of heavy rain during the main rainy season", "That is a physical cause."],
    ["Steep slopes on impermeable rock", "Slope and rock are physical characteristics of the basin."],
    ["Soil already saturated after a wet month", "Antecedent soil moisture is a physical condition."],
  ], "Urbanisation increases runoff and shortens the lag time.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which long-term effect of flooding can benefit people on a floodplain?", [
    ["Deposition of fertile silt that renews the soil", "Correct: farmers plant on the nutrient-rich alluvium."],
    ["Loss of crops and livestock on the low-lying floodplain", "That is a short-term harm."],
    ["Contamination of water supplies by sewage", "That is a hazard, not a benefit."],
    ["Damage to bridges and roads", "That is damage to infrastructure."],
  ], "Floods can **replenish soils**, wetlands and groundwater.");
  mc(b, 3, "APPLICATION", "A flash flood is most likely in which type of basin?", [
    ["Small, steep and paved, with a dense network of drains", "Correct: water reaches the channel quickly."],
    ["Large, flat and covered by thick permeable woodland and soils", "Water is slowed and stored, giving a long lag time."],
    ["Large, with deep sandy soils and wetlands", "Soil and wetlands store water and delay runoff."],
    ["Elongated, with gentle slopes and thick grass", "Shape and vegetation slow the flow."],
  ], "Small, steep, impermeable basins give very short lag times.", { hints: ["Which basin sends water fastest to the channel?"] });
  mc(b, 3, "UNDERSTANDING", "Why does poverty increase vulnerability to river floods?", [
    ["Poorer households have fewer resources to prepare, move and rebuild", "Correct: capacity to cope and recover is lower."],
    ["Poor people live only in areas that never flood", "Poorer groups often live in the most exposed places."],
    ["Floods are larger in countries with a low income", "The size of the flood does not depend on income."],
    ["Warnings are not needed when people have little property", "People always need warning to protect their lives."],
  ], "Vulnerability depends on **capacity to cope**, not only on the hazard.", { hints: ["Think about preparation and recovery."] });
  mc(b, 3, "APPLICATION", "On a hydrograph, which change most clearly shows the effect of deforestation upstream?", [
    ["A shorter lag time and a higher peak discharge", "Correct: less interception and infiltration give faster, larger runoff."],
    ["A longer lag time and a lower peak discharge", "That is the effect of afforestation or storage."],
    ["A longer baseflow period before the storm", "Baseflow is not the main signal of deforestation."],
    ["No change in the peak but a higher rainfall total", "Rainfall is not changed by clearing the basin."],
  ], "Clearing trees gives a **flashier** hydrograph.", { hints: ["Trees intercept rain and encourage infiltration."] });
  mc(b, 2, "RECALL", "Which season carries the greatest risk of river floods in Zimbabwe?", [
    ["The rainy season, November to March", "Correct: most rain falls then, and cyclones add to the risk."],
    ["The cool dry season, May to August", "Rivers are low then."],
    ["The hot dry season, September to October", "Flows are at their lowest."],
    ["All months equally", "Rainfall is strongly seasonal."],
  ], "Zimbabwe has a **summer rainfall regime**.");

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A flood is a hazard even if no people or property are exposed to it.", answer: false,
    feedbackFalse: "Correct: a hazard needs people or property to be threatened.", feedbackTrue: "Not so: without exposure there is no threat to people.",
    explanation: "A river rising in an empty valley is a natural event; it becomes a **hazard** when it threatens people and property." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Soil that is already saturated increases the risk of flooding in a heavy storm.", answer: true,
    feedbackTrue: "Correct: little more water can infiltrate, so more runs off.", feedbackFalse: "Not so: saturated soil has little spare storage.",
    explanation: "Antecedent saturation increases overland flow and peak discharge." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each cause of flooding to its effect on the drainage basin.",
    pairs: [
      ["Deforestation", "Less interception and infiltration, so more overland flow"],
      ["Urbanisation", "Impermeable surfaces and drains give a short lag time"],
      ["Draining a wetland", "Natural storage of floodwater is lost"],
      ["Prolonged rain", "Soils become saturated, so runoff rises"],
      ["Straightening a channel", "Water is carried downstream more quickly"],
    ], explanation: "Each cause changes storage, infiltration or the speed of runoff." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A flood that follows intense rain after a very short lag time is a {{blank:a}} flood. The ease with which people are harmed by a hazard is their {{blank:b}}. Silt left on a floodplain is called {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["flash"], choices: ["flash", "coastal", "seasonal"] },
      { id: "b", accepted: ["vulnerability"], choices: ["vulnerability", "resilience", "mitigation"] },
      { id: "c", accepted: ["alluvium"], choices: ["alluvium", "scree", "laterite"] },
    ], explanation: "Flash floods are rapid; vulnerability measures susceptibility to harm; alluvium is river-deposited sediment." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the tropical cyclone that brought heavy rain, floods and landslides to the Eastern Highlands of Zimbabwe in March 2019.",
    accepted: ["idai", "cyclone idai", "tropical cyclone idai"], explanation: "**Cyclone Idai** (March 2019) caused floods and landslides in Chimanimani and neighbouring districts." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "%", daily: true,
    stem: "The peak discharge of a river rose from 52 m³/s to 78 m³/s after woodland upstream was cleared. Calculate the percentage increase.",
    hints: ["Increase ÷ original × 100."],
    value: pct2, wrong: [33.3, 26],
    explanation: "Increase = 78 − 52 = 26. 26 ÷ 52 × 100 = **50%**. The value 33.3 divides by the new value; 26 is the actual increase." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "m³/s",
    stem: "A channel can carry 45 m³/s within its banks. In a storm the discharge peaked at 66 m³/s. By how much did the discharge exceed the bankfull discharge, in m³/s?",
    hints: ["Subtract bankfull discharge from the peak."],
    value: exc, wrong: [111, 1.47],
    explanation: "66 − 45 = **21 m³/s**. The value 111 adds the two numbers; 1.47 is their ratio." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "A basin of 30 km² receives 60 mm of rain. The volume of water that runs off into the river is 0.54 million m³. Calculate the runoff coefficient as a percentage of the rainfall.",
    hints: ["Rainfall volume = area in m² × depth in m.", "Runoff coefficient = runoff ÷ rainfall × 100."],
    value: coef1 * 100, wrong: [0.3, 54],
    explanation: "1. Area = 30 × 10⁶ m²; depth = 0.060 m, so rainfall volume = 1.8 × 10⁶ m³.\n2. Runoff ÷ rainfall = 0.54 ÷ 1.8 = 0.30.\n3. The coefficient is **30%**. The value 0.3 is the proportion rather than the percentage." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how deforestation can increase the risk of flooding in a river basin.",
    hints: ["Think about interception, infiltration and soil."],
    points: [
      "Fewer trees means less interception, so more rain reaches the ground quickly.",
      "Roots and leaf litter that help water to infiltrate are lost, so infiltration falls and overland flow increases.",
      "Water reaches the channel faster, so the lag time shortens and the peak discharge rises.",
      "Soil erosion adds silt to the river, which raises the bed, reduces channel capacity and makes overflow more likely.",
    ],
    modelAnswer: "Fewer trees means less interception, and the loss of roots and litter reduces infiltration, so more rain runs over the surface to the channel. The lag time shortens and the peak rises. Eroded soil is washed into the river, raising the bed and reducing the capacity of the channel, so it overflows more easily.",
    explanation: "Link the cause to infiltration, runoff and channel capacity." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the short-term and long-term impacts of a flood on a farming community on a floodplain.",
    hints: ["Give at least one short-term and one long-term impact, and one benefit."],
    points: [
      "Short-term: homes, crops and livestock are lost and people may be displaced or injured.",
      "Short-term: roads and bridges are cut, so aid and markets are hard to reach.",
      "Long-term: debts and the cost of rebuilding reduce incomes and may cause food shortages.",
      "Long-term: fertile silt deposited on the fields can raise yields, and groundwater is recharged.",
    ],
    modelAnswer: "In the short term crops, livestock and homes are lost, people are displaced and roads and bridges are cut. In the long term, rebuilding costs and lost income cause debt and food shortages, though the silt left on the fields can renew the soil and raise later yields.",
    explanation: "Separate the short and long term and include a benefit." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Suggest why a flood of the same size may cause fewer deaths in one country than in another.",
    hints: ["Use the factors that affect vulnerability."],
    points: [
      "Better forecasting and warning systems give people time to leave.",
      "Stronger buildings, defences, drainage and roads reduce damage and speed up rescue.",
      "More wealth, insurance and emergency services improve preparation and recovery (accept education or lower population density on floodplains).",
    ],
    modelAnswer: "A wealthier country is likely to have forecasts and warnings, stronger buildings and defences and better emergency services, so fewer people are caught by the water and rescue is faster. Lower population density on the floodplain also reduces exposure.",
    explanation: "Vulnerability and capacity differ between places." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a river in Zimbabwe is more likely to flood in February than in September.",
    hints: ["Link the season, soil moisture and runoff."],
    points: [
      "February is in the rainy season, when rainfall is heavy and sometimes intense (tropical cyclones and depressions).",
      "By February soils are already wet after earlier rain, so infiltration is low and runoff is high.",
      "In September it is the end of the dry season: soils are dry and baseflow is low.",
    ],
    modelAnswer: "February is in the rainy season, with heavy rain and sometimes cyclones. By then the soils are wet, so most rain runs off and the river rises. In September, at the end of the dry season, soils are dry, little rain falls and flows are at their lowest.",
    explanation: "Seasonal rainfall and soil moisture control flood risk." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Hourly rainfall and discharge for two similar storms on a river in Zimbabwe are given before and after woodland in the basin was cleared. The channel carries up to ${BANKFULL} m³/s within its banks (illustrative data, invented for this exercise).\n\n${HT}`,
    hints: ["Lag time = hour of peak discharge − hour of peak rainfall.", "Percentage increase = increase ÷ original × 100."],
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the lag time after clearing, in hours.", value: lagA, unit: "h", wrong: [5, 4],
        explanation: "Peak rainfall at hour 2; peak discharge after clearing at hour 5. Lag = 3 hours (5 hours before clearing)." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage increase in peak discharge after clearing.", value: pctUp, unit: "%", wrong: [37.5, 18],
        explanation: "Peaks: 30 before, 48 after. 18 ÷ 30 × 100 = 60%." }),
      P.num({ label: "(c)", marks: 1, stem: "By how much did the peak discharge after clearing exceed bankfull discharge, in m³/s?", value: over, unit: "m³/s", wrong: [18, 88],
        explanation: "48 − 40 = 8 m³/s." }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain the changes shown in the discharge after clearing.",
        points: [
          "Fewer trees means less interception and infiltration, so more overland flow.",
          "Water reaches the river faster over cleared ground, so the lag time falls from 5 to 3 hours.",
          "More water arrives in a shorter time, so the peak rises from 30 to 48 m³/s.",
          "The higher peak exceeds the 40 m³/s bankfull discharge, so the river floods, which did not happen before.",
        ],
        modelAnswer: "Cleared land has less interception and infiltration, so more rain becomes overland flow. Water reaches the channel faster, so the lag time shortens from 5 to 3 hours, and the peak rises from 30 to 48 m³/s. The new peak is above the bankfull discharge of 40 m³/s, so the river overflows its banks.",
        explanation: "Link clearing to runoff, lag time, peak and flooding." }),
    ], explanation: "Interpret the hydrographs and explain the effect of deforestation." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, applies: ZIM,
    stem: `After a flood, two settlements in a southern African river valley were surveyed (illustrative data, invented for this exercise).\n\n${ST}`,
    hints: ["Population density = people ÷ area.", "Percentage flooded = houses flooded ÷ houses × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the population density of settlement P, in people per km².", value: dens, unit: "people/km²", wrong: [1200, 1800],
        explanation: "1 800 ÷ 0.6 = 3 000 people per km²." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage of houses flooded in settlement P.", value: pctFl, unit: "%", wrong: [35, 312],
        explanation: "312 ÷ 480 × 100 = 65%." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which statement is supported by the table?", options: [
        ["A larger share of houses was flooded in P than in Q", "Correct: 65% against 15%."],
        ["Settlement Q is more densely populated than P", "Q has 600 people per km² against 3 000 for P."],
        ["Most households in P received a warning", "Only a few households in P were warned."],
        ["Mud-brick walls are more common in Q than in P", "70% of walls in P are mud brick against 25% in Q."],
      ], answer: "A", explanation: "Settlement P suffered a much larger share of flooded houses (65%, compared with 15% in Q)." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why settlement P is more vulnerable to flooding than settlement Q.",
        points: [
          "P is on the floodplain, so it is exposed to overflow, while Q is on higher ground.",
          "P has a much higher population density, so more people and property are exposed.",
          "Walls of mud brick without cement are weak when wet, and few households received a warning.",
        ],
        modelAnswer: "Settlement P is on the floodplain, so floodwater reaches it, but Q is on higher ground. P is far more crowded (3 000 people per km² against 600), so more people and property are exposed. Seventy per cent of its walls are weak mud brick and few households were warned, so damage and losses are greater.",
        explanation: "Location, density, building quality and warning explain vulnerability." }),
      P.manual({ label: "(e)", marks: 4, stem: "Suggest why recovery from the flood may take longer for poorer households in settlement P.",
        points: [
          "They have little savings or insurance to pay for rebuilding or replacing lost possessions and crops.",
          "Houses of weak materials may have collapsed completely and need to be rebuilt.",
          "Roads, bridges and water supply may be damaged, delaying aid, markets and work.",
          "Loss of income and rising health costs from disease reduce their ability to recover, and aid is limited.",
        ],
        modelAnswer: "Poorer households have little savings or insurance to rebuild, and weak mud-brick houses may have collapsed completely. Damage to roads and water supplies delays aid and work, and lost income and disease increase costs, so recovery takes longer.",
        explanation: "Wealth and infrastructure control the speed of recovery." }),
    ], explanation: "Calculate exposure and explain differences in vulnerability." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the relative importance of physical and human causes of river floods.",
    hints: ["Give both kinds of cause with explanation.", "Weigh them and reach a judgement, using an example."],
    points: [
      "Physical: intense or prolonged rain exceeds infiltration capacity and fills stores; cyclones can bring extreme totals.",
      "Physical: saturated soils, steep slopes, impermeable rock and a circular basin shorten the lag time and raise the peak.",
      "Human: deforestation and poor farming reduce interception and infiltration and increase erosion.",
      "Human: urbanisation, drains and straightened channels speed water to the river.",
      "Human: building on floodplains does not cause the flood but increases the harm done (vulnerability).",
      "Rainfall is the trigger: without heavy rain, human changes alone do not produce a flood.",
      "Human factors are important at small scales and in smaller storms, while very large storms such as Cyclone Idai overwhelm any land use.",
      "Judgement: physical causes are the trigger, but human actions often decide how large the flood is and how much damage results.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Heavy and prolonged rain is the trigger for almost every flood, and its effect is increased by saturated soils, steep slopes and impermeable rock. These physical causes are most important in extreme events, as when a tropical cyclone brings very large rainfall totals. Human activities change how the basin responds: deforestation and poor farming reduce infiltration, urban surfaces and drains shorten the lag time, and straightened channels pass water on more quickly. Building on floodplains greatly raises the damage. In small and moderate storms the human causes decide whether the channel overflows, but in an extreme storm the physical cause dominates. Overall, the physical cause is the trigger but human factors often determine the size of the flood and its impact.",
    wordLimit: { max: 300 }, explanation: "Weigh trigger factors against modifying factors and reach a judgement." });

  b.card("DEFINITION", "River flood", "Discharge exceeds bankfull discharge and water spills onto the floodplain.");
  b.card("CONCEPT", "Physical causes of floods", "Intense or prolonged rain, saturated soil, snowmelt (elsewhere), steep impermeable circular basins with a high drainage density and little vegetation.");
  b.card("CONCEPT", "Human causes of floods", "Deforestation, poor farming, urbanisation, wetland drainage, channel straightening, dam failure and building on floodplains.");
  b.card("DEFINITION", "Vulnerability to floods", "How easily people and property are harmed and how little they can cope and recover.");
  b.card("CONCEPT", "Factors increasing vulnerability", "Scale and duration, population density, weak infrastructure, poverty, lack of warning and preparation, age and health.");
  b.card("FORMULA", "Runoff coefficient", "Runoff ÷ rainfall (as a volume or depth) × 100 = percentage of rainfall that runs off.");
  b.card("FACT", "Flood season in Zimbabwe", "Rivers are highest between about December and March (summer rainfall) and lowest in the late dry season; cyclones add risk in the east.");
  b.card("FACT", "Cyclone Idai", "March 2019: heavy rain brought floods and landslides to the Eastern Highlands of Zimbabwe, as well as Mozambique and Malawi.");
  b.card("CONCEPT", "Benefits of floods", "Fertile silt on floodplains, replenished wetlands and groundwater, and fish stocks.");
});
