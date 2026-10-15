// W2a: water.global-resources (Cambridge only, AS). Numbers computed: water per person, withdrawal ratio, shares
// (see tables/w2a-water-global-resources.mjs).
import { concept, P, geographyLevels, chk, rnd, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w2a-_q.mjs";

// per person in m3 from km3 and millions of people
const perPerson = (km3, popM) => (km3 * 1e9) / (popM * 1e6);
// Struct 1: four countries (illustrative)
const C = [["A", 60, 12, 6], ["B", 9.6, 8, 4.8], ["C", 2.4, 6, 2.0], ["D", 105, 35, 10.5]];
const CT = tbl(["Country", "Renewable water resources (km³ per year)", "Population (millions)", "Withdrawals (km³ per year)"], C);
const ppB = chk(perPerson(9.6, 8), 1200, 1e-9);
const ppC = chk(perPerson(2.4, 6), 400, 1e-9);
const wdC = rnd((2.0 / 2.4) * 100, 1, 83.3, "wdC");
chk(perPerson(60, 12), 5000, 1e-9);
chk(perPerson(105, 35), 3000, 1e-9);
// Struct 2: sector shares (percentages given)
const ST = tbl(["Sector", "Country X (low income): share of withdrawals (%)", "Country Y (high income): share of withdrawals (%)"], [["Agriculture", 90, 40], ["Industry", 4, 45], ["Domestic", 6, 15]]);
chk(90 + 4 + 6, 100);
chk(40 + 45 + 15, 100);
const agX = chk(0.9 * 12, 10.8, 1e-9);
// Singles
const pp1 = chk(perPerson(7.2, 4), 1800, 1e-9);
const sh1 = chk((36 / 48) * 100, 75, 1e-9);
const fall = rnd(((perPerson(8.4, 6) - perPerson(8.4, 7)) / perPerson(8.4, 6)) * 100, 1, 14.3, "fall");
chk(perPerson(8.4, 6), 1400, 1e-9);
chk(perPerson(8.4, 7), 1200, 1e-9);

concept("ageo.water.global-resources", { file: "water/global-resources", keyPrefix: "water.global-resources", applies: CAM }, (b) => {
  mc(b, 1, "RECALL", "Roughly what share of the world's water is salt water in the oceans?", [
    ["About 97%", "Correct: only about 2.5-3% is fresh water."],
    ["About 50%", "Salt water is far more than half of all water."],
    ["About 75%", "The share is greater than this."],
    ["About 10%", "Fresh water is the smaller share, not the ocean water."],
  ], "About **97%** of water is salt water.");
  mc(b, 2, "UNDERSTANDING", "Which store holds the largest share of the world's fresh water?", [
    ["Ice caps and glaciers", "Correct: about two thirds, mostly in Antarctica and Greenland."],
    ["Rivers and streams across all of the continents", "Rivers hold a tiny share, though they are an important source."],
    ["Freshwater lakes", "Lakes hold a small share of fresh water."],
    ["Soil moisture", "Soil moisture is a small store."],
  ], "Most fresh water is **locked in ice**; groundwater is the next largest store.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is **economic water scarcity**?", [
    ["A lack of money and infrastructure to capture and deliver water that exists", "Correct: water is present but not accessible to all."],
    ["A lack of rainfall and rivers in an arid region with high evaporation and heat", "That is physical scarcity."],
    ["The high price of bottled water in shops", "Economic scarcity is about access to water supply, not bottled water."],
    ["Water use above 1 700 m³ per person", "That is not scarcity: the stress threshold is below 1 700 m³."],
  ], "Economic scarcity is about **access**, not about the amount of water.", { daily: true });
  mc(b, 3, "APPLICATION", "A country has 1 400 m³ of renewable water per person per year. How is it best described?", [
    ["Water-stressed, but not yet water-scarce", "Correct: below 1 700 m³ and above 1 000 m³."],
    ["Water-abundant, with more than enough for all uses", "Above 1 700 m³ would be needed to avoid stress."],
    ["In absolute scarcity", "Absolute scarcity is below about 500 m³."],
    ["Free of any water problem", "At this level supply is already under pressure."],
  ], "Stress is under about 1 700 m³; scarcity under about 1 000 m³.", { hints: ["Compare the figure with the thresholds."] });
  mc(b, 3, "UNDERSTANDING", "How does deforestation upstream usually change the water cycle?", [
    ["Less interception and infiltration, so more runoff and a higher flood risk", "Correct: water reaches the river faster."],
    ["More interception and transpiration, so less runoff and a lower flood risk", "That describes afforestation."],
    ["Higher groundwater recharge and steadier river flow", "Infiltration is reduced, so recharge falls."],
    ["No change, because trees do not affect water", "Vegetation strongly affects the cycle."],
  ], "Clearing trees means **more runoff and less infiltration**.", { hints: ["Which stage of the cycle do trees control?"] });
  mc(b, 3, "ANALYSIS", "Which is a likely effect of heavy abstraction from an aquifer in a coastal area?", [
    ["Saltwater intrusion as the water table falls", "Correct: sea water moves into the depleted aquifer."],
    ["A rise in the water table", "Over-abstraction lowers the water table."],
    ["Fewer wells run dry", "More wells would run dry."],
    ["Lower salt levels in the groundwater near the coast", "Salinity is likely to rise."],
  ], "Over-abstraction lowers water tables and can draw in **salt water**.", { hints: ["What replaces the fresh water that is pumped out?"] });
  mc(b, 2, "RECALL", "Which use accounts for the largest share of global freshwater withdrawals?", [
    ["Agriculture, mainly irrigation", "Correct: about 70% of global withdrawals."],
    ["Domestic use in homes, towns and cities", "Households use a smaller share than farming."],
    ["Industry", "Industry uses less than agriculture globally."],
    ["Hydropower generation", "Hydropower is mostly non-consumptive and is counted separately."],
  ], "Irrigation dominates global withdrawals (about 70%).");

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Treated waste water that is used again for irrigation is part of the reuse stage of the human water cycle.", answer: true,
    feedbackTrue: "Correct: reuse reduces the demand for new abstraction.", feedbackFalse: "Not so: reuse is the final stage of the human cycle.",
    explanation: "The human cycle is capture, use, disposal and **reuse**." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A country with plenty of renewable water cannot suffer from water scarcity.", answer: false,
    feedbackFalse: "Correct: economic scarcity can occur where there is not enough money or infrastructure to deliver the water.", feedbackTrue: "Not so: economic scarcity occurs even where water is plentiful.",
    explanation: "Economic scarcity is a lack of **access**, not of water." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each human activity to its usual effect on the water cycle.",
    pairs: [
      ["Urbanisation", "Impermeable surfaces increase runoff and reduce infiltration"],
      ["Deforestation", "Less interception and transpiration, more runoff"],
      ["Large dam", "Stores floodwater and gives a steadier dry-season flow"],
      ["Irrigation", "Water is abstracted and much is evaporated"],
      ["Over-pumping groundwater", "The water table falls and wells may run dry"],
    ], explanation: "Each activity changes storage, transfers or outputs of the cycle." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Water stress is generally defined as below about {{blank:a}} m³ per person per year. Underground rock that stores and yields water is an {{blank:b}}. Water that evaporates from fields is a {{blank:c}} use.",
    blanks: [
      { id: "a", accepted: ["1700"], choices: ["1700", "500", "5000"] },
      { id: "b", accepted: ["aquifer"], choices: ["aquifer", "watershed", "estuary"] },
      { id: "c", accepted: ["consumptive"], choices: ["consumptive", "non-consumptive", "recycled"] },
    ], explanation: "Stress is below about 1 700 m³; aquifers store groundwater; irrigation water lost to the air is consumptive." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the process of removing salt from sea water to produce fresh water.",
    accepted: ["desalination", "desalinisation", "desalinization"], explanation: "**Desalination** gives fresh water from the sea but uses a lot of energy." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "A country has 7.2 km³ of renewable water resources per year and 4.0 million people. Calculate the water available per person, in m³ per year. (1 km³ = 1 000 000 000 m³.)",
    hints: ["Convert km³ to m³ first."],
    value: pp1, wrong: [1.8, 28800],
    explanation: "7.2 × 10⁹ ÷ 4.0 × 10⁶ = **1 800 m³ per person per year**. The value 1.8 is in thousands of m³, and 28 800 multiplies instead of dividing." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "Agriculture withdraws 36 km³ of water out of a national total of 48 km³ per year. What percentage is used by agriculture?",
    hints: ["Share = part ÷ total × 100."],
    value: sh1, wrong: [133, 25],
    explanation: "36 ÷ 48 × 100 = **75%**. The value 133 divides the total by the part; 25 is the share of the other sectors." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "A country has 8.4 km³ of renewable water a year. Its population is expected to rise from 6 million to 7 million with the same resources. Calculate the percentage fall in water available per person, to 1 decimal place.",
    hints: ["Find the water per person before and after.", "Percentage fall = fall ÷ original × 100."],
    value: ((perPerson(8.4, 6) - perPerson(8.4, 7)) / perPerson(8.4, 6)) * 100, dp: 1, wrong: [16.7, 200],
    explanation: "1. Now: 8.4 × 10⁹ ÷ 6 × 10⁶ = 1 400 m³ per person.\n2. Later: 8.4 × 10⁹ ÷ 7 × 10⁶ = 1 200 m³ per person.\n3. Fall = 200 ÷ 1 400 × 100 = **14.3%**. The value 16.7 divides by the new value (200 ÷ 1 200)." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how urbanisation changes the water cycle in a city.",
    hints: ["Think about surfaces, drains and abstraction."],
    points: [
      "Roofs and roads are impermeable, so less rain infiltrates and groundwater recharge falls.",
      "More rain becomes surface runoff, carried quickly by drains to rivers, so floods become more likely.",
      "Water is abstracted for supply, and waste water is returned to rivers, often polluted.",
      "Leaking pipes and sewers may add to groundwater, and the city's heat can increase evaporation.",
    ],
    modelAnswer: "Roofs and roads are impermeable, so less rain infiltrates and groundwater recharge falls. More rain runs off and drains carry it quickly to rivers, raising flood peaks. The city abstracts water for supply and returns waste water to the river, often polluted. Leaking pipes may recharge groundwater.",
    explanation: "Urban surfaces increase runoff and reduce infiltration; supply and disposal change flows." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Distinguish between physical and economic water scarcity, giving an example of a place where each occurs.",
    hints: ["Say what is missing in each case."],
    points: [
      "Physical scarcity: not enough water resources to meet demand.",
      "It occurs in arid regions or where withdrawals approach the renewable supply, for example North Africa or the Middle East.",
      "Economic scarcity: water exists but there is a lack of money, infrastructure or institutions to capture, treat and deliver it.",
      "It occurs in parts of sub-Saharan Africa and South Asia where rivers are plentiful but many people lack piped safe water.",
    ],
    modelAnswer: "Physical scarcity is a lack of water resources, as in North Africa and the Middle East where rainfall is low and withdrawals are close to the renewable supply. Economic scarcity occurs where water exists but money, infrastructure or institutions are lacking, as in parts of sub-Saharan Africa where many people have no piped safe water.",
    explanation: "One is a lack of water, the other a lack of access." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the stages of the human water cycle.",
    points: [
      "Capture and storage: abstraction from rivers and aquifers and storage in reservoirs.",
      "Treatment, supply and use in homes, farms and industry.",
      "Disposal of waste water and its reuse (recycling).",
    ],
    modelAnswer: "Water is captured by abstraction and stored in reservoirs, then treated and supplied for use in homes, farms and industry. Waste water is disposed of, and some is treated and reused.",
    explanation: "Capture, use, disposal and reuse." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the share of water used for industry and domestic purposes is usually higher in richer countries.",
    hints: ["Think about economic structure and standards of living."],
    points: [
      "Richer countries have a larger industrial and energy sector that uses water for processing and cooling.",
      "Higher incomes mean more household water use (piped water, washing machines, flush toilets).",
      "Poorer countries use most water for farming, so the agricultural share is higher.",
    ],
    modelAnswer: "Richer countries have a larger industrial and energy sector, which uses a lot of water, and households with higher incomes use more piped water. In poorer countries farming takes most water, so the industrial and domestic shares are smaller.",
    explanation: "Economic structure and income control the pattern of use." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table gives data for four countries (illustrative data, invented for this exercise). 1 km³ = 1 000 000 000 m³.\n\n${CT}`,
    hints: ["Water per person = resources ÷ population, converting km³ to m³.", "Withdrawal ratio = withdrawals ÷ resources × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the water available per person in country B, in m³ per year.", value: ppB, wrong: [1.2, 0.0012],
        explanation: "9.6 × 10⁹ ÷ 8 × 10⁶ = 1 200 m³ per person." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the water available per person in country C, in m³ per year.", value: ppC, wrong: [0.4, 14400],
        explanation: "2.4 × 10⁹ ÷ 6 × 10⁶ = 400 m³ per person." }),
      P.mcq({ label: "(c)", marks: 1, stem: "How is country C best described?", options: [
        ["In absolute water scarcity (below about 500 m³ per person)", "Correct: 400 m³ is below the absolute scarcity threshold."],
        ["Water-stressed but not yet in absolute scarcity (below 1 700 m³)", "Stress is below 1 700 m³ and scarcity below 1 000 m³; 400 m³ is lower."],
        ["Free of water stress", "Stress occurs below about 1 700 m³."],
        ["Water-abundant", "Country C has the least water per person of the four."],
      ], answer: "A", explanation: "400 m³ per person is below the absolute scarcity threshold of about 500 m³." }),
      P.num({ label: "(d)", marks: 2, stem: "Calculate the withdrawals of country C as a percentage of its renewable resources, to 1 decimal place.", value: wdC, dp: 1, unit: "%", wrong: [120, 8.3],
        explanation: "2.0 ÷ 2.4 × 100 = 83.3%. The value 120 divides resources by withdrawals." }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain why country C may suffer physical water scarcity.",
        points: [
          "It has very little renewable water (2.4 km³) compared with its population, so each person has little.",
          "Withdrawals are about 83% of the renewable supply, so little is left for the environment and any drought leaves a deficit.",
          "A likely arid climate with low and variable rainfall and high evaporation limits renewal (accept growing population or irrigation demand).",
        ],
        modelAnswer: "Country C has only 2.4 km³ of renewable water for 6 million people, which is 400 m³ each. It withdraws about 83% of this supply, so there is little margin in a dry year and the environment gets little. A dry climate with high evaporation would limit recharge.",
        explanation: "Low supply, high withdrawals and climate cause physical scarcity." }),
      P.manual({ label: "(f)", marks: 2, stem: "Suggest one way that country C could increase supply and one way it could reduce demand.",
        points: [
          "Increase supply: build reservoirs, harvest rainwater, desalinate sea water, or reuse treated waste water.",
          "Reduce demand: irrigation efficiency, pricing or metering, leak repair or education.",
        ],
        modelAnswer: "It could increase supply by building reservoirs or reusing treated waste water, and reduce demand by improving irrigation efficiency and repairing leaking pipes.",
        explanation: "One supply measure and one demand measure." }),
    ], explanation: "Calculate water per person, classify stress and explain scarcity." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table shows the share of water withdrawals by sector in two countries (illustrative data, invented for this exercise).\n\n${ST}`,
    hints: ["Quote figures and make comparisons.", "Agriculture volume = share × total."],
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe the differences in water use between the two countries.",
        points: [
          "Agriculture takes 90% of the water in X but only 40% in Y.",
          "Industry takes only 4% in X but 45% in Y, the largest sector there.",
          "Domestic use is lower in X (6%) than in Y (15%); in Y use is spread more evenly among sectors.",
        ],
        modelAnswer: "In country X agriculture takes 90% of withdrawals, while in Y it takes only 40%. Industry is the largest sector in Y at 45%, but only 4% in X. Domestic use is 6% in X and 15% in Y, so water use is more evenly spread in Y.",
        explanation: "Use figures and compare each sector." }),
      P.num({ label: "(b)", marks: 2, stem: "The total withdrawal of country X is 12 km³ per year. Calculate the volume used by agriculture, in km³.", value: agX, dp: 1, wrong: [1.08, 13.3],
        explanation: "90% of 12 = 0.90 × 12 = 10.8 km³." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why the share of water used for industry is higher in country Y.",
        points: [
          "A high-income country usually has a large manufacturing, energy and processing sector that uses water for cooling and production.",
          "Industrial growth means that agriculture is a smaller part of the economy.",
          "Technology and money allow industry to abstract, treat and reuse water; in X few factories exist and most people farm.",
        ],
        modelAnswer: "Country Y is a high-income country with a large manufacturing and energy sector, which uses water for cooling and production, and agriculture is a smaller part of its economy. It has the money and technology to abstract and treat water. In X most people farm and there is little industry.",
        explanation: "Economic structure and wealth explain the sector shares." }),
    ], explanation: "Describe and explain differences in sector use." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the importance of economic water scarcity compared with physical water scarcity in explaining differences in water access between countries.",
    hints: ["Define both kinds of scarcity.", "Weigh them with examples and reach a judgement."],
    points: [
      "Physical scarcity: arid regions such as North Africa and the Middle East have little renewable water per person and high evaporation.",
      "Rising populations and irrigation can push withdrawals close to the renewable supply.",
      "Economic scarcity: many countries with enough water, such as parts of sub-Saharan Africa, lack money for dams, treatment works and pipes.",
      "Weak institutions, conflict and poverty restrict investment and maintenance, so poor people lack safe water.",
      "Richer arid countries use money and technology (desalination, transfers) to overcome physical limits.",
      "Many places suffer both; physical scarcity limits what can be supplied, economic scarcity limits who gets it.",
      "Inequality within countries means national averages hide local problems.",
      "Judgement: economic factors are more important for explaining differences in access, because wealth can compensate for low natural supply.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Physical scarcity matters most in arid regions such as North Africa and the Middle East, where renewable water per person is very low, and where population growth and irrigation push withdrawals near the limit. But many countries with enough water, including parts of sub-Saharan Africa, lack the money and institutions to build dams, treatment works and pipes, so poor people have no safe supply. Rich arid countries overcome physical scarcity through desalination and transfers. Many places suffer both. Overall economic scarcity is more important in explaining differences in access, since money can compensate for low natural supply, but physical limits set the ceiling.",
    wordLimit: { max: 300 }, explanation: "Weigh natural limits against money and infrastructure." });

  b.card("DEFINITION", "Water stress and scarcity", "Stress: below about 1 700 m³ per person per year. Scarcity: below about 1 000 m³. Absolute scarcity: below about 500 m³.");
  b.card("FACT", "Global water", "About 97% of water is salt water; about 2.5-3% is fresh; about two thirds of fresh water is ice and almost 30% groundwater.");
  b.card("CONCEPT", "Human water cycle", "Capture, treatment and supply, use, disposal and reuse.");
  b.card("DEFINITION", "Physical scarcity", "A lack of water resources to meet demand, as in arid regions or where withdrawals are too high.");
  b.card("DEFINITION", "Economic scarcity", "Water exists but money, infrastructure or institutions to capture and deliver it are lacking.");
  b.card("CONCEPT", "Effects of deforestation on the water cycle", "Less interception and transpiration; less infiltration; more runoff, erosion and flood risk.");
  b.card("CONCEPT", "Effects of urbanisation on the water cycle", "More impermeable surfaces: more runoff, less infiltration and recharge, shorter lag times.");
  b.card("FACT", "Global water use", "Agriculture (mostly irrigation) accounts for about 70% of global freshwater withdrawals.");
  b.card("CONCEPT", "Effects of over-abstraction", "A falling water table, reduced river flow, dry wells, saltwater intrusion near coasts and ground subsidence.");
});
