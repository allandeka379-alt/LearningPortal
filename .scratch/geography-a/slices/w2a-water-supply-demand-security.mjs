// W2a: water.supply-demand-security (both boards; groundwater, boreholes and indigenous knowledge are ZIMSEC detail).
// Numbers computed: demand, deficit, mean yield, recharge volume, leakage share (see tables/w2a-water-supply-demand-security.mjs).
import { concept, P, geographyLevels, chk, rnd, mean, ZIM } from "../lib.mjs";
import { mc, tbl } from "../tables/w2a-_q.mjs";

// litres per person per day x people -> m3 per day
const demandM3 = (people, lpd) => (people * lpd) / 1000;
// Struct 1: town (illustrative)
const POP = 320000;
const dWet = chk(demandM3(POP, 90), 28800, 1e-9);
const dDry = chk(demandM3(POP, 130), 41600, 1e-9);
const SUP = { wet: 41000, dry: 29000 };
const defDry = chk(dDry - SUP.dry, 12600, 1e-9);
const defPct = rnd((defDry / dDry) * 100, 1, 30.3, "defPct");
const T1 = tbl(["Season", "Water supplied (m³ per day)", "Use per person (litres per day)"], [["Wet (November to March)", SUP.wet, 90], ["Dry (July to October)", SUP.dry, 130]]);
// Struct 2: boreholes (illustrative)
const BH = [["B1", 42, 12, 35], ["B2", 65, 30, 60], ["B3", 38, 8, 12], ["B4", 55, 25, 48], ["B5", 47, 15, 25]];
const meanY = chk(mean(BH.map((r) => r[2])), 18, 1e-9);
const T2 = tbl(["Borehole", "Depth (m)", "Yield (litres per minute)", "Distance to nearest pit latrine (m)"], BH);
// Singles
const d1 = chk(demandM3(200000, 110), 22000, 1e-9);
const rech = chk(25 * 1e6 * 0.08, 2.0e6, 1e-6);
const leak = chk((24000 / 80000) * 100, 30, 1e-9);
const nrw = chk(80000 - 24000, 56000);

concept("ageo.water.supply-demand-security", { file: "water/supply-demand-security", keyPrefix: "water.supply-demand-security" }, (b) => {
  mc(b, 1, "RECALL", "Which is a **physical** factor affecting water supply?", [
    ["Geology, such as permeable sandstone that stores groundwater", "Correct: rock type controls storage and yield."],
    ["The price charged for water", "Price affects demand, and it is a human factor."],
    ["The number of pipes in a town", "Pipes are infrastructure, a human factor."],
    ["The amount of money spent on building new dams and pipelines", "Investment is a human factor."],
  ], "Climate, geology, drainage and relief are **physical** factors.");
  mc(b, 2, "UNDERSTANDING", "Why does demand for water often peak when supply is lowest?", [
    ["Hot dry months increase garden, livestock and irrigation use while rivers and dams are falling", "Correct: demand rises as supply declines."],
    ["Households and farms use less water in hot dry weather, so that demand falls as supply falls", "Use usually rises in hot, dry weather."],
    ["Rivers are at their highest in the dry season", "Flows are lowest in the dry season in Zimbabwe."],
    ["Dams are filled in the dry season", "Dams fill in the rainy season."],
  ], "Seasonal demand and supply are **out of phase**.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which best defines **water security**?", [
    ["Reliable access to enough safe, affordable water for health and livelihoods", "Correct: it covers availability, access, quality and reliability."],
    ["Having the largest dam and the biggest reservoir anywhere in the whole country", "A dam is one way to store water, not a definition of security."],
    ["Having more rainfall each year than any other country in the region", "Security depends on access and management, not only on rain."],
    ["Using as little water as possible", "Security is about reliable access, not minimal use."],
  ], "Water security combines **availability, access, quality and reliability**.", { daily: true });
  mc(b, 3, "APPLICATION", "In a region of granite, boreholes less than 1 km apart have very different yields. What is the best explanation?", [
    ["Water is found in the weathered zone and in fractures, which vary locally", "Correct: crystalline rock stores water only where it is weathered or fractured."],
    ["Granite is a highly porous rock that holds water evenly throughout the area", "Fresh granite is almost impermeable."],
    ["All boreholes are drilled to exactly the same depth", "Depth varies and does not explain the pattern."],
    ["Rain falls only on the boreholes with high yields", "Rainfall is similar across such a short distance."],
  ], "In crystalline rock, **fractures and the weathered zone** hold the water.", { hints: ["Is fresh granite permeable?"] });
  mc(b, 3, "ANALYSIS", "A town's water works treat 80 000 m³ per day, but only 56 000 m³ reaches customers. The most likely main cause of the loss is:", [
    ["Leakage from ageing pipes and illegal connections", "Correct: this is non-revenue water, a common problem."],
    ["Evaporation of water from the pipes in hot weather", "Water in closed pipes does not evaporate."],
    ["A fall in the town's population", "That would reduce demand, not cause a loss between works and customers."],
    ["Too much rainfall in the catchment", "Rainfall does not cause losses in pipes."],
  ], "Leaks and illegal connections reduce the supply that reaches customers.", { hints: ["Where can water be lost between the works and the tap?"] });
  mc(b, 3, "UNDERSTANDING", "Which of these is most likely to cause **economic** water insecurity?", [
    ["A lack of money to maintain pumps and pipes in a country with plenty of rain", "Correct: water exists, but access fails."],
    ["Very low annual rainfall and high evaporation", "That is physical scarcity."],
    ["A long period of drought in an arid region with little groundwater", "That is a physical cause."],
    ["A natural fall in the water table after a dry year", "That is a physical cause."],
  ], "Economic insecurity is about **money, infrastructure and institutions**.", { hints: ["Is the water missing, or is the access missing?"] });
  mc(b, 2, "RECALL", "Which pair of impacts of drought affects the **environment**?", [
    ["Falling river levels and loss of wetlands", "Correct: both are environmental effects."],
    ["Higher food prices and loss of income", "Those are economic and social effects."],
    ["Rationing and queues at standpipes", "Those affect people."],
    ["Lower hydropower and reduced industrial output", "Those are economic effects."],
  ], "Drought lowers river and lake levels and damages wetlands and habitats.");

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Groundwater is a limitless resource because it is stored underground.", answer: false,
    feedbackFalse: "Correct: recharge is limited and over-abstraction lowers the water table.", feedbackTrue: "Not so: aquifers recharge slowly.",
    explanation: "Abstraction above **recharge** is not sustainable." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A borehole sited close to a pit latrine increases the risk that the water becomes contaminated.", answer: true,
    feedbackTrue: "Correct: bacteria and nitrates can reach the borehole.", feedbackFalse: "Not so: contamination risk rises with proximity to latrines.",
    explanation: "Boreholes should be sited well away from latrines and other pollution sources." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each factor to its effect on water supply or demand.",
    pairs: [
      ["Dams and tanks", "Store wet-season flow for the dry season"],
      ["Water transfer", "Moves water from a surplus area to a deficit area"],
      ["Rising incomes", "Increase water use per person"],
      ["Leaking pipes", "Waste treated water and reduce supply"],
      ["Desalination", "Produces fresh water from sea water at a high energy cost"],
    ], explanation: "Some factors affect supply and some demand." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A rock that stores water and yields it to wells is an {{blank:a}}. A deficit occurs when {{blank:b}} exceeds supply. A borehole is {{blank:c}} when abstraction does not exceed recharge.",
    blanks: [
      { id: "a", accepted: ["aquifer"], choices: ["aquifer", "levee", "watershed"] },
      { id: "b", accepted: ["demand"], choices: ["demand", "recharge", "runoff"] },
      { id: "c", accepted: ["sustainable"], choices: ["sustainable", "unsustainable", "saline"] },
    ], explanation: "Aquifers store water; a deficit is demand above supply; sustainable abstraction stays within recharge." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the layer of weathered rock above fresh crystalline basement rock in which a borehole in Zimbabwe often finds water.",
    accepted: ["regolith", "weathered zone", "weathered layer", "the regolith", "weathered rock"], explanation: "The **regolith (weathered zone)** stores water, along with fractures in the fresh rock." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "A town of 200 000 people uses 110 litres per person per day. Calculate the total demand, in m³ per day. (1 m³ = 1 000 litres.)",
    hints: ["Total litres per day ÷ 1 000."],
    value: d1, wrong: [22000000, 2200],
    explanation: "200 000 × 110 = 22 000 000 litres = 22 000 000 ÷ 1 000 = **22 000 m³ per day**. The value 22 000 000 is in litres." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true,
    stem: "A groundwater catchment of 25 km² receives recharge of 80 mm per year. Calculate the annual recharge volume, in m³. (1 km² = 1 000 000 m²; 80 mm = 0.08 m.)",
    hints: ["Volume = area in m² × depth in m."],
    value: rech, wrong: [2000, 200000],
    explanation: "25 × 10⁶ m² × 0.08 m = **2 000 000 m³ (2.0 million m³)** per year. The value 2 000 forgets that 1 km² is a million square metres." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "A treatment works produces 80 000 m³ per day, but 24 000 m³ per day is lost through leaks before it reaches customers. Calculate the percentage lost.",
    hints: ["Percentage = loss ÷ amount produced × 100."],
    value: leak, wrong: [42.9, 70],
    explanation: "1. Loss = 24 000 m³ per day.\n2. 24 000 ÷ 80 000 × 100 = **30%**. The value 42.9 divides by the amount delivered (56 000)." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why water supply may be unreliable in a town in Zimbabwe even in a year of average rainfall.",
    hints: ["Think of seasonality, evaporation and infrastructure."],
    points: [
      "Rain falls in about five months, so water must be stored for the long dry season.",
      "Evaporation from reservoirs is high, and streams on impermeable rock dry up.",
      "Old pipes leak, pumps need power, and cuts stop supply.",
      "Demand has grown faster than supply, and pollution raises the cost of treatment.",
    ],
    modelAnswer: "Most rain falls in a few months and must be stored for the dry season, but evaporation from reservoirs is high and streams on impermeable rock dry up. Old pipes leak and power cuts stop pumping. Population growth has also increased demand faster than supply, and pollution raises the cost of treatment.",
    explanation: "Seasonality, losses, infrastructure and demand growth." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Describe and explain the impacts of drought on people in a rural area.",
    hints: ["Include food, water and health."],
    points: [
      "Crops fail and livestock die, so food is short and incomes fall.",
      "Wells and streams dry up, so people walk far for water (mainly women and children).",
      "Unsafe sources and poor hygiene raise the risk of disease such as diarrhoea.",
      "Food prices rise and families may migrate or sell assets, so poverty increases.",
    ],
    modelAnswer: "Crops fail and livestock die, so food is short and incomes fall. Wells and streams dry up, so people, mainly women and children, walk long distances for water. Unsafe sources and poor hygiene increase disease. Prices rise and some families sell assets or migrate.",
    explanation: "Link the loss of water to food, time, health and income." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how indigenous knowledge helps communities to protect water supplies.",
    points: [
      "Traditional rules and taboos protect springs, wetlands and headwater forests from clearing.",
      "People know where water lies in dry sand riverbeds and dig shallow wells.",
      "Local knowledge can be combined with scientific surveys to site boreholes and manage them.",
    ],
    modelAnswer: "Communities protect springs, wetlands and headwater trees with traditional rules, and they know where water can be found in sand riverbeds. This knowledge can be combined with scientific surveys when siting boreholes.",
    explanation: "Protection, local knowledge and combination with science." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Suggest why a poor household in an informal settlement may be more water-insecure than a wealthy household in the same town.",
    hints: ["Think about access, cost and reliability."],
    points: [
      "The poor household may have no piped connection and depend on a distant shared standpipe or a vendor.",
      "Vendors charge more per litre, and the poor have no money to buy tanks or boreholes to store or draw water.",
      "Supplies to poor areas may be rationed first or have lower pressure, and sources may be unsafe.",
    ],
    modelAnswer: "The poor household may have no connection and rely on a shared standpipe or vendors who charge more per litre. It cannot afford tanks or a borehole to store water, and supply to its area may be cut first and may be unsafe.",
    explanation: "Access, cost and storage differ with wealth." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, applies: ZIM,
    stem: `A town in Zimbabwe has ${POP.toLocaleString("en-GB")} people. The table shows the water supplied and the use per person in each season (illustrative data, invented for this exercise). 1 m³ = 1 000 litres.\n\n${T1}`,
    hints: ["Demand in m³ per day = people × litres per person ÷ 1 000.", "Deficit = demand − supply."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the demand for water in the wet season, in m³ per day.", value: dWet, wrong: [28800000, 2880],
        explanation: "320 000 × 90 = 28 800 000 litres = 28 800 m³ per day." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the demand for water in the dry season, in m³ per day.", value: dDry, wrong: [41600000, 4160],
        explanation: "320 000 × 130 = 41 600 000 litres = 41 600 m³ per day." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the dry-season deficit as a percentage of dry-season demand, to 1 decimal place.", value: defPct, dp: 1, unit: "%", wrong: [43.4, 12600],
        explanation: "Deficit = 41 600 − 29 000 = 12 600 m³ per day. 12 600 ÷ 41 600 × 100 = 30.3%. The value 43.4 divides by the supply (29 000)." }),
      P.mcq({ label: "(d)", marks: 1, stem: "Which statement describes the town in the dry season?", options: [
        ["Demand exceeds supply, so there is a deficit and rationing is likely", "Correct: 41 600 m³ demand against 29 000 m³ supply."],
        ["Supply exceeds demand, so there is a surplus and no rationing", "Supply is below demand in the dry season."],
        ["Demand and supply are equal", "The two values differ by 12 600 m³ per day."],
        ["Demand is lower than in the wet season", "Use per person is higher in the dry season."],
      ], answer: "A", explanation: "There is a dry-season deficit." }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain why use per person is higher in the dry season, while the water supplied is lower.",
        points: [
          "Hot dry weather increases watering of gardens, washing and drinking, and livestock needs.",
          "Rivers and reservoirs are falling and evaporation is high, so less water can be abstracted and treated.",
          "Rainfall is highly seasonal, so supply is lowest at the end of the dry season when demand is highest.",
        ],
        modelAnswer: "In hot dry weather households water gardens and use more, while livestock need more water. At the same time rivers and reservoirs fall and evaporation is high, so less water can be abstracted. Rainfall is seasonal, so supply is lowest just when demand is highest.",
        explanation: "Seasonal demand and supply are out of phase." }),
      P.manual({ label: "(f)", marks: 2, stem: "Suggest two ways in which the town could reduce the dry-season deficit.",
        points: [
          "Repair leaking pipes, meter use and charge for water to cut waste.",
          "Increase supply by drilling boreholes, building storage or harvesting rainwater (accept water-saving education and rationing plans).",
        ],
        modelAnswer: "The town could repair leaks and meter use to cut waste, and increase supply by drilling boreholes or building more storage.",
        explanation: "One demand measure and one supply measure." }),
    ], explanation: "Calculate demand and deficit and explain the seasonal imbalance." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, applies: ZIM,
    stem: `Five boreholes were drilled in a granite area of Zimbabwe (illustrative data, invented for this exercise).\n\n${T2}`,
    hints: ["Mean = sum ÷ number.", "Which borehole is closest to a latrine?"],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean yield of the five boreholes, in litres per minute.", value: meanY, wrong: [90, 15],
        explanation: "(12 + 30 + 8 + 25 + 15) ÷ 5 = 90 ÷ 5 = 18 litres per minute." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which borehole is at greatest risk of contamination from a pit latrine?", options: [
        ["B3", "Correct: it is only 12 m from a latrine."],
        ["B2", "B2 is 60 m away, the greatest distance."],
        ["B4", "B4 is 48 m from a latrine."],
        ["B5", "B5 is 25 m from a latrine; B3 is closer."],
      ], answer: "A", explanation: "The nearest latrine to B3 is 12 m away." }),
      P.manual({ label: "(c)", marks: 3, stem: "Suggest why the yields of the boreholes differ so widely in the same granite area.",
        points: [
          "Fresh granite is almost impermeable; water is held in the weathered zone and in fractures.",
          "The depth and thickness of the weathered zone and the number of fractures intersected vary from site to site.",
          "Some boreholes hit a fracture with good recharge, while others (such as B3 with 8 litres per minute) hit dry rock.",
        ],
        modelAnswer: "Fresh granite is almost impermeable, so water is held in the weathered zone and in fractures. The thickness of the weathered zone and the number of fractures hit differ between sites, so one borehole may meet a productive fracture while another, such as B3, meets mainly dry rock.",
        explanation: "Crystalline aquifers are patchy." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two actions to make the use of these boreholes more sustainable.",
        points: [
          "Monitor water levels and limit abstraction to recharge; space the boreholes apart.",
          "Protect the recharge area (afforestation, no cutting of trees), and site latrines and farms away from the boreholes to protect quality.",
        ],
        modelAnswer: "Monitor the water level and limit abstraction to the recharge, spacing the boreholes. Protect the recharge area with tree cover and keep latrines well away from the boreholes.",
        explanation: "Sustainable use controls quantity and quality." }),
    ], explanation: "Use borehole data to calculate and judge sustainability." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the impacts of drought on a country's people, economy and environment.",
    hints: ["Cover all three, with short- and long-term effects.", "Say which is the most serious and why."],
    points: [
      "People: crop failure and hunger, loss of livestock, disease from unsafe water and poor hygiene, rationing and migration.",
      "Vulnerable groups, such as the poor, rural households, women and children, are affected more.",
      "Economy: lower farm output and exports, lower hydropower (as at Lake Kariba) and industrial output, higher food prices and relief spending.",
      "Environment: falling river and lake levels, loss of wetlands and wildlife, soil erosion and bush fires.",
      "Long-term: poverty and debt can last for years, and lost education or health harms development.",
      "Effects depend on vulnerability: wealthy countries with storage and insurance cope better.",
      "A located example (for example the 2015-16 southern African drought) shows the scale of the effects.",
      "Judgement: the impact on people and the economy is usually most serious because they are linked through food and energy, but environmental damage may last longest.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Drought causes crop failure and loss of livestock, so food and income fall, and unsafe water increases disease. The poor, rural families, women and children are affected most. The economy suffers through lower farm output, lower hydropower (Lake Kariba levels fell in dry years), and higher food prices and relief costs. The environment suffers from falling rivers, lost wetlands and more erosion. Long-term effects include debt, poverty and migration. Wealthier countries with storage cope better. Overall the effects on people and the economy are the most serious because they are linked through food and energy, though environmental damage may last longest.",
    wordLimit: { max: 300 }, explanation: "Cover people, economy and environment, and judge the greatest impact." });

  b.card("DEFINITION", "Water security", "Reliable access to enough safe, affordable water for health, livelihoods and ecosystems (availability, access, quality, reliability).");
  b.card("CONCEPT", "Physical factors of water supply", "Climate (rainfall, seasonality, evaporation), geology, drainage and relief.");
  b.card("CONCEPT", "Human factors of water supply", "Storage, transfers, abstraction, desalination, treatment and infrastructure (including leaks and power).");
  b.card("CONCEPT", "Factors raising water demand", "Population growth, rising income, economic structure (irrigation, industry), seasonal peaks, low prices.");
  b.card("CONCEPT", "Impacts of drought", "People: hunger, disease, migration. Economy: lower output and hydropower. Environment: falling rivers, lost wetlands, erosion.");
  b.card("FACT", "Groundwater in crystalline rock", "Stored in the weathered zone (regolith) and fractures; yields are patchy and often low.");
  b.card("CONCEPT", "Sustainable borehole use", "Abstract no more than recharge, space boreholes, protect recharge areas, site them away from latrines and monitor water levels.");
  b.card("DEFINITION", "Aquifer", "A rock that stores and yields enough water to wells and springs.");
  b.card("FORMULA", "Demand from per-person use", "People × litres per person per day ÷ 1 000 = m³ per day.");
});
