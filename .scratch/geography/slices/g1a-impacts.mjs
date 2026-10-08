// Slice G1a: impacts of climate change at different scales.
import { concept, P, geographyLevels, CAM, ZIM } from "../lib.mjs";

const YD = "| Season (fictional ward) | Rainfall (mm) | Days above 35 °C | Maize yield (tonnes per hectare) |\n|---|---|---|---|\n| 2016-17 | 780 | 6 | 1.8 |\n| 2018-19 | 520 | 19 | 0.9 |\n| 2020-21 | 840 | 4 | 2.0 |\n| 2022-23 | 610 | 14 | 1.2 |\n| 2023-24 | 430 | 27 | 0.6 |";

concept("geo.climate-change.impacts", { file: "climate-change/impacts", keyPrefix: "climate-change.impacts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which **two** processes are the main causes of sea-level rise?",
    options: [
      ["Thermal expansion of sea water and melting ice on land", "Correct: warming water expands and land ice adds water."],
      ["Melting floating sea ice and heavier rainfall", "Floating ice barely changes sea level when it melts."],
      ["Stronger tides and more rivers flowing", "Tides do not rise because of warming."],
      ["Volcanic eruptions and earthquakes", "These are not the causes of the long-term rise."],
    ],
    answer: "A",
    explanation: "**Thermal expansion** and melting of **glaciers and ice sheets on land** raise sea level.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What happens to coral reefs when sea water becomes too warm?",
    options: [
      ["They bleach and may die", "Correct: corals expel the algae that feed and colour them."],
      ["They grow much faster", "Heat stress damages coral rather than speeding growth."],
      ["They move to deeper water", "Corals are fixed; they cannot move."],
      ["They turn into mangroves", "Mangroves are trees, not a stage of coral."],
    ],
    answer: "A",
    explanation: "Warm water causes **coral bleaching**; repeated bleaching kills reefs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is climate change expected to affect rain-fed maize in much of Zimbabwe?",
    options: [
      ["Lower yields from more heat and longer dry spells", "Correct: maize is sensitive to heat and drought at flowering."],
      ["Higher yields from much more reliable rain", "Southern Africa is expected to become drier and less predictable."],
      ["No change, as maize is not affected by weather", "Maize yields depend strongly on rain and temperature."],
      ["Maize will grow best in the lowveld", "The hot, dry lowveld is already poorly suited to rain-fed maize."],
    ],
    answer: "A",
    explanation: "Hotter, drier and less predictable seasons are expected to **reduce maize yields**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can low water levels in Lake Kariba lead to power cuts?",
    options: [
      ["Less water passes through the HEP turbines", "Correct: HEP output depends on water."],
      ["Coal at Hwange needs lake water in order to burn", "Coal burns without lake water; Kariba's power is hydro-electric."],
      ["Fishing boats can no longer reach the dam wall", "Fishing does not generate electricity."],
      ["Low lake levels damage the national power lines", "Lines are not damaged by the lake level."],
    ],
    answer: "A",
    explanation: "Kariba's power stations depend on water flowing through **turbines**: less water, less electricity.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a possible **positive** impact of climate change?",
    options: [
      ["Longer growing seasons in some cold regions", "Correct: parts of Canada and Russia may grow new crops."],
      ["More coral bleaching", "This harms reefs and fisheries."],
      ["Higher storm surges in Bangladesh", "This increases flood risk."],
      ["Lower water levels in reservoirs", "This harms water and power supply."],
    ],
    answer: "A",
    explanation: "Some high-latitude regions may gain **longer growing seasons**, though negative impacts dominate overall.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: CAM,
    stem: "Why are people in LICs often more **vulnerable** to climate change impacts than people in HICs?",
    options: [
      ["They have less money for defences and recovery", "Correct: wealth affects the ability to cope."],
      ["Climate change happens only in the poorest countries", "Climate change is global."],
      ["LICs produce the most greenhouse gases today", "HICs have produced far more historically."],
      ["People in LICs do not depend on farming", "Many people in LICs depend on rain-fed farming."],
    ],
    answer: "A",
    explanation: "Vulnerability depends on **wealth and resources**: LICs have less money for irrigation, sea walls, insurance and health care.",
    hints: ["Who can afford to protect themselves?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might malaria spread to higher areas, such as parts of the Eastern Highlands, as the climate warms?",
    options: [
      ["Mosquitoes can survive in warmer highlands", "Correct: cooler highlands once limited mosquitoes."],
      ["Higher areas will receive much less rain", "Mosquitoes need water to breed, so less rain would not help them."],
      ["People will all move away from the lowlands", "The question is about mosquitoes reaching new areas."],
      ["Malaria is caused directly by the heat itself", "Malaria is a parasite spread by mosquitoes."],
    ],
    answer: "A",
    explanation: "Low temperatures used to limit **mosquitoes** in highlands; warming can extend their range uphill.",
    hints: ["What limits mosquitoes at high altitude today?"],
  });
  b.calc({
    d: 2, skill: "APPLICATION",
    stem: "A fictional district has a mean hot-season maximum of 30.8 °C. A model projects warming of 0.3 °C per decade. What will the mean maximum be after 4 decades?",
    value: 32, unit: "°C", tol: 0.05,
    wrong: [1.2, 31.1],
    explanation: "Rise = 0.3 × 4 = 1.2 °C; 30.8 + 1.2 = 32.0 °C.",
    workedSolution: "1. Rise = 0.3 × 4 = 1.2 °C.\n2. Projected = 30.8 + 1.2 = 32.0 °C.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "If sea level rises at 4 mm per year, how many centimetres will it rise in 30 years?",
    value: 12, unit: "cm",
    wrong: [120, 1.2],
    explanation: "4 × 30 = 120 mm = 12 cm.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: `Study the fictional data.\n\n${YD}\n\nCalculate the percentage fall in maize yield from 2020-21 to 2023-24.`,
    value: 70, unit: "%", tol: 0.5,
    wrong: [1.4, 30],
    explanation: "Fall = 2.0 − 0.6 = 1.4 t/ha; 1.4 ÷ 2.0 × 100 = 70 %.",
    workedSolution: "1. Fall = 2.0 − 0.6 = 1.4 tonnes per hectare.\n2. 1.4 ÷ 2.0 = 0.7.\n3. × 100 = 70 %.",
    hints: ["Percentage fall = fall ÷ original × 100.", "The original is the 2020-21 yield."],
  });
  b.num({
    d: 3, skill: "ANALYSIS",
    stem: `Study the fictional data.\n\n${YD}\n\nCalculate the mean maize yield for the five seasons (tonnes per hectare). Give your answer to two decimal places.`,
    value: 1.3, tol: 0.005, answer: "1.30",
    wrong: [6.5, 1.2],
    explanation: "1.8 + 0.9 + 2.0 + 1.2 + 0.6 = 6.5; 6.5 ÷ 5 = 1.30 t/ha.",
    hints: ["Add all five yields.", "Divide by 5."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Most of the land of the {{blank:a}} is less than about 1 m above sea level, so sea-level rise threatens the whole country.",
    blanks: [
      { id: "a", accepted: ["Maldives", "the Maldives", "Maldive Islands"], wrong: "Zimbabwe" },
    ],
    explanation: "The **Maldives** in the Indian Ocean is one of the lowest-lying countries on Earth.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each impact with the sector it mainly affects.",
    pairs: [
      ["Salt water entering rice fields in Bangladesh", "Food production"],
      ["Malaria spreading to cooler highlands", "Health"],
      ["Bleaching of coral reefs", "Ecosystems"],
      ["Lower hydro-electric output at Kariba", "Energy and the economy"],
    ],
    explanation: "Impacts reach farming, health, ecosystems and the economy.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "When floating Arctic sea ice melts, it is a major cause of global sea-level rise.",
    answer: false,
    explanation: "False. Floating ice already displaces its own weight of water. Sea level rises mainly from thermal expansion and land ice melting.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Southern Africa is expected to become hotter, with more variable rainfall.",
    answer: true,
    explanation: "True. Higher temperatures and more variable rainfall, with many areas becoming drier, are expected.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the process in which sea water expands as it warms, raising sea level.",
    accepted: ["thermal expansion", "thermal expansion of water", "thermal expansion of sea water"],
    wrong: ["evaporation"],
    explanation: "**Thermal expansion**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4, applies: ZIM,
    stem: "Describe **four** impacts of climate change on Zimbabwe.",
    points: [
      "More frequent or severe droughts and dry spells, lowering crop yields (food insecurity).",
      "Shorter, less reliable rainy seasons (later start, earlier end).",
      "Lower dam levels (e.g. Kariba) reducing water supply and hydro-electric power.",
      "Heat stress on people and livestock / water holes drying up for wildlife / malaria spreading to higher areas / more intense floods.",
    ],
    modelAnswer: "Droughts and mid-season dry spells are becoming more frequent, reducing maize yields and causing food shortages. Rainy seasons tend to start later and end earlier. Lower river flows and more evaporation reduce water in dams such as Kariba, cutting hydro-electric power. Heat stress affects people and cattle, water holes in parks dry up, and malaria may spread to higher areas.",
    explanation: "Credit four different impacts on Zimbabwe.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: `Study the fictional data.\n\n${YD}\n\nDescribe the relationship between days above 35 °C and maize yield, using data.`,
    points: [
      "Negative relationship: more hot days, lower yield.",
      "Data: 4 days with 2.0 t/ha in 2020-21 compared with 27 days and 0.6 t/ha in 2023-24.",
      "Seasons with fewer hot days also had more rain (e.g. 840 mm), so both heat and low rain reduce yield.",
    ],
    modelAnswer: "There is a negative relationship: as the number of days above 35 °C rises, maize yield falls. In 2020-21 there were only 4 such days and the yield was 2.0 t/ha, but in 2023-24 there were 27 days and the yield was just 0.6 t/ha. The hottest seasons were also the driest, so heat and low rainfall together reduce yields.",
    explanation: "Credit the direction of the relationship, paired data and the link with rainfall.",
    hints: ["As one variable rises, what happens to the other?", "Quote a pair of seasons."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "\"The impacts of climate change will be mainly negative.\" Discuss this statement, referring to different scales and places.",
    points: [
      ["Global negative: sea-level rise threatening low coasts (Maldives, Bangladesh).", 1],
      ["Global negative: more extreme heatwaves, droughts, floods; coral bleaching.", 1],
      ["Regional/national negative: lower maize yields, low Kariba levels, water shortages in Zimbabwe/southern Africa.", 1],
      ["Health and economic negatives: malaria spreading, heat stress, damage costs.", 1],
      ["Positive: longer growing seasons in cold regions (Canada, Russia).", 1],
      ["Positive: Arctic shipping routes, milder winters; some places wetter.", 1],
      ["Judgement: positives are limited and local; negatives dominate, especially for the poorest/LICs.", 1],
    ],
    levels: geographyLevels(7),
    modelAnswer: "At the global scale most impacts are negative. Sea level is rising through thermal expansion and melting land ice, threatening low countries such as the Maldives, where most land is under about 1 m above sea level, and the crowded delta of Bangladesh. Heatwaves, droughts and floods are becoming more intense, and warmer seas bleach coral reefs.\n\nIn southern Africa, Zimbabwe faces hotter, less reliable seasons. Maize yields fall in drought years, water levels in Lake Kariba drop and cut hydro-electric power, and malaria may spread into cooler highlands.\n\nThere are some positives. Parts of Canada and Russia may gain longer growing seasons, melting Arctic ice opens shipping routes and winters in high latitudes are milder.\n\nOverall the statement is largely true: the benefits are limited to a few, mostly richer, cold regions, while the negative impacts are widespread and fall hardest on poorer countries and rain-fed farmers.",
    explanation: "Weigh negative and positive impacts at different scales with named places and reach a judgement.",
    hints: ["Use global, regional and national examples.", "Include at least one positive impact."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study the fictional data for a ward in natural region IV.\n\n${YD}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Which season had the most days above 35 °C?", accepted: ["2023-24", "2023 24", "2023/24", "2023-2024", "202324"], wrong: ["2018-19"], explanation: "2023-24, with 27 days." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the difference in rainfall between the wettest and driest seasons.", value: 410, unit: "mm", wrong: [840], explanation: "840 − 430 = 410 mm." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest how the changes shown could affect food security in the ward.", points: [
        "Lower yields mean less food is harvested, leading to hunger or dependence on food aid.",
        "Less income from crop sales, so families cannot buy food when prices rise.",
      ], explanation: "Credit availability and access to food." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest **two** other impacts of hotter, drier seasons on this ward.", points: [
        "Water shortages: boreholes, wells and small dams dry up.",
        "Livestock deaths or poor condition from lack of water and grazing / heat stress on people.",
      ], explanation: "Credit impacts beyond crops." }),
    ],
    hints: ["Find the largest value in the hot-days column.", "Wettest minus driest."],
    explanation: "Practice in analysing climate impacts on farming.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", applies: CAM,
    stem: "A fictional report compares two coastal cities facing a projected sea-level rise of 0.5 m by 2100. City X (HIC) has sea walls, flood barriers and insurance for most homes. City Y (LIC) has many informal homes on low land beside the shore and no flood defences.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which city is more vulnerable?", options: [
        ["City Y", "Correct: it is exposed, poorly protected and has fewer resources."],
        ["City X", "City X has defences and insurance."],
        ["Both equally", "Their exposure and ability to cope differ."],
        ["Neither, as 0.5 m is too small to matter", "Half a metre greatly raises flood risk during storms."],
      ], answer: "A", explanation: "Exposure plus few resources make City Y more vulnerable." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe **three** impacts that sea-level rise could have on City Y.", points: [
        "Flooding of homes on low land, especially during storm surges.",
        "Salt water entering wells and farmland (contaminated water, crop loss).",
        "Coastal erosion destroying property and roads; people displaced.",
      ], explanation: "Credit flooding, salinisation and erosion/displacement." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why City X may still suffer some impacts.", points: [
        "Defences can be overtopped or fail in extreme storms.",
        "Maintaining and raising defences is costly; some areas or ecosystems remain unprotected.",
      ], explanation: "Even HICs face residual risk (e.g. defence failures)." }),
    ],
    hints: ["Who can afford to protect themselves?", "Can defences fail?"],
    explanation: "Practice in comparing vulnerability in HICs and LICs.",
  });
  b.card("DEFINITION", "Sea-level rise", "Rise in average sea level from thermal expansion and melting land ice (glaciers, ice sheets).");
  b.card("CONCEPT", "Global impacts", "Heatwaves, sea-level rise, changing rainfall, more intense extremes, coral bleaching, species shifts.");
  b.card("CONCEPT", "Impacts on Zimbabwe", "Lower maize yields, shorter less reliable seasons, low Kariba levels and power cuts, stress on wildlife, heat and malaria.");
  b.card("FACT", "Sea-level rise so far", "About 20 cm since 1900 (approximate); further rise expected this century.");
  b.card("FACT", "Maldives", "Most land is less than about 1 m above sea level: highly threatened by sea-level rise.");
  b.card("CONCEPT", "Positive impacts", "Longer growing seasons in cold regions, Arctic shipping routes, milder high-latitude winters.");
  b.card("DEFINITION", "Vulnerability", "How likely people are to be harmed, depending on exposure, wealth, health and ability to cope.");
  b.card("CONCEPT", "Health impacts", "Heat stress, malaria spreading to cooler highlands, water-borne disease after floods.");
});
