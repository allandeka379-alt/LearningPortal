// W4b: agri.factors-location (ZIMSEC only; items are tagged to ZIMSEC automatically). All data are illustrative.
// Computed: rent = price - cost - rate x d; veg 200 - 10d, maize 140 - 4d (lesson); tomatoes 150 - 6d, cotton 60 - 2d; mean rainfall 715.
import { concept, P, geographyLevels, chk, mean, ZIM } from "../lib.mjs";
import { mc, tbl } from "../tables/w4b-_q.mjs";

const rent = (price, cost, rate, d) => price - cost - rate * d;
const maize15 = chk(rent(320, 180, 4, 15), 80);
const maizeMargin = chk((320 - 180) / 4, 35);
const vegMargin = chk((600 - 400) / 10, 20);
const cross = chk((600 - 400 - (320 - 180)) / (10 - 4), 10);
const tomRent10 = chk(rent(450, 300, 6, 10), 90);
const cotMargin = chk((260 - 200) / 2, 30);
const tomMargin = chk((450 - 300) / 6, 25);
const crossB = chk((450 - 300 - (260 - 200)) / (6 - 2), 22.5);
const RAIN = [["A", 1080], ["B", 820], ["C", 560], ["D", 400]];
const meanRain = chk(mean(RAIN.map((r) => r[1])), 715);
const RT = tbl(["Station", "Mean annual rainfall (mm)"], RAIN);
const ST = tbl(["Crop", "Price (US\\$ per tonne)", "Production cost (US\\$ per tonne)", "Transport cost (US\\$ per tonne per km)"], [["Tomatoes", 450, 300, 6], ["Cotton", 260, 200, 2]]);

concept("ageo.agri.factors-location", { file: "agri/factors-location", keyPrefix: "agri.factors-location" }, (b) => {
  mc(b, 1, "RECALL", "Which of Zimbabwe's agro-ecological regions receives the highest rainfall, mostly in the Eastern Highlands?", [
    ["Region I", "Correct: it receives over 1 000 mm and is cool and moist."],
    ["Region III", "Region III has about 650–800 mm with mid-season dry spells."],
    ["Region IV", "Region IV is semi-arid with frequent seasonal droughts."],
    ["Region V", "Region V is the driest, below about 450 mm."],
  ], "**Region I** is the wettest, over about 1 000 mm.");
  mc(b, 2, "UNDERSTANDING", "Which farming system is best suited to Region V, where rainfall is below about 450 mm?", [
    ["Extensive ranching and wildlife use", "Correct: low, erratic rain supports grazing, not rain-fed crops."],
    ["Rain-fed intensive maize and tobacco", "These need the reliable rain of Region II."],
    ["Tea and coffee plantations", "These need cool, wet highland conditions."],
    ["Market gardening without irrigation", "Vegetables fail without reliable water."],
  ], "Region V suits **extensive ranching**; crops there depend on irrigation.");
  mc(b, 2, "UNDERSTANDING", "Which is one of von Thünen's assumptions?", [
    ["The land is a flat plain with uniform soil and climate", "Correct: this removes physical differences so that distance alone explains location."],
    ["Farmers choose crops at random without considering prices or costs", "He assumed profit-maximising farmers."],
    ["Several large towns of equal size compete as the markets for crops", "The model has one central market town."],
    ["Governments fix prices and decide what is grown", "There was no government intervention."],
  ], "The model assumes a **flat, uniform plain** with one market.");
  mc(b, 3, "APPLICATION", "According to von Thünen, why are dairy farms and market gardens found nearest the market town?", [
    ["Their products are perishable and costly to move, so only short journeys pay", "Correct: high transport cost per unit of value forces them close in."],
    ["They need large areas of cheap land far from a town, where rents are low", "They use small, expensive land near the market."],
    ["Their products have low value per tonne and can be moved long distances cheaply", "They are high-value and costly to transport."],
    ["They are protected by tariffs from cheap imports", "The model has no tariffs."],
  ], "Perishable, high-value products with **high transport cost** locate nearest the market.", { hints: ["Think about milk and fresh vegetables during a long journey."] });
  mc(b, 3, "ANALYSIS", "Which of the following is an economic factor rather than a physical factor in the location of farming?", [
    ["The price offered for tobacco at the auction floors", "Correct: price is an economic factor."],
    ["The depth and drainage of the soil in the farmer's main field", "Soil is physical."],
    ["The slope of the land on a hillside field above the river", "Slope is physical."],
    ["The length of the growing season", "Growing season is a climatic (physical) factor."],
  ], "Prices, costs and subsidies are **economic**; soil, slope and growing season are physical.", { hints: ["Ask whether the factor is natural or comes from markets and money."] });
  mc(b, 4, "EVALUATION", "A student finds a belt of irrigated vegetable farms 30 km from a town, beyond a zone of maize. Which is the best explanation of why this departs from von Thünen's rings?", [
    ["A river supplies irrigation water, so one place has a local advantage that the model ignores", "Correct: the uniform plain assumption fails."],
    ["Von Thünen's model is correct only for vegetables grown far out from the town", "The model predicts vegetables nearest the town."],
    ["Transport costs for vegetables fall to zero with distance", "Costs rise with distance in the model."],
    ["Farmers in the belt do not try to make a profit", "Profit seeking is still assumed."],
  ], "Water, soil or roads create **local advantages** which the model's uniform plain ignores.", { hints: ["Which assumption does a river break?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Region II of Zimbabwe receives less rainfall than Region IV.", answer: false,
    feedbackFalse: "Correct: Region II receives about 750–1 000 mm, Region IV about 450–650 mm.",
    feedbackTrue: "Not so: rainfall falls from Region I to Region V.",
    explanation: "Region II is wetter than Region IV." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In von Thünen's model economic rent for a crop falls as distance from the market increases.", answer: true,
    feedbackTrue: "Correct: transport costs rise with distance, so rent falls.",
    feedbackFalse: "Not so: transport cost rises with distance, which reduces the surplus.",
    explanation: "Economic rent = price − production cost − transport cost, and transport cost increases with distance." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "At the margin of cultivation, economic rent is {{blank:a}}. Crops that are {{blank:b}} are grown nearest the market.",
    blanks: [
      { id: "a", accepted: ["zero"], choices: ["zero", "highest", "negative"] },
      { id: "b", accepted: ["perishable"], choices: ["perishable", "durable", "light"] },
    ], explanation: "Rent is **zero** at the margin; **perishable** crops locate closest." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each agro-ecological region to the farming it best supports.",
    pairs: [
      ["Region I", "Tea, coffee, fruit and forestry"],
      ["Region II", "Intensive maize, tobacco and cotton"],
      ["Region IV", "Cattle and drought-tolerant sorghum and millets"],
      ["Region V", "Extensive ranching; crops only under irrigation"],
    ], explanation: "Farming becomes less intensive as rainfall falls from Region I to Region V." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "US$",
    stem: "In this exercise maize sells at US\\$320 per tonne, costs US\\$180 per tonne to produce, and transport costs US\\$4 per tonne per km. Calculate the economic rent per tonne at 15 km from the market, in US\\$.",
    hints: ["Rent = price − production cost − transport cost.", "Transport cost = 4 × 15."],
    value: maize15, wrong: [140, 60],
    explanation: "Rent = 320 − 180 − (4 × 15) = 140 − 60 = **US\\$80 per tonne**. The value 140 forgets transport cost." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "km",
    stem: "Using the same maize figures (price US\\$320, production cost US\\$180, transport US\\$4 per tonne per km), calculate the margin of cultivation, in km.",
    hints: ["The margin is where rent is zero.", "Solve 140 − 4d = 0."],
    value: maizeMargin, wrong: [140, 45],
    explanation: "Rent = 140 − 4d = 0, so d = 140 ÷ 4 = **35 km**." });
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true, unit: "km",
    stem: "Vegetables earn rent of 200 − 10d and maize 140 − 4d (US\\$ per tonne, d in km). Calculate the distance from the market at which both crops earn the same rent, in km.",
    hints: ["Set the two rent expressions equal.", "Collect the d terms on one side."],
    value: cross, wrong: [20, 35, 13.3],
    explanation: "1. Set 200 − 10d = 140 − 4d.\n2. 200 − 140 = 10d − 4d, so 60 = 6d.\n3. d = **10 km**. Nearer than this vegetables earn more; farther out maize earns more." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the German landowner who published a model of agricultural land use around a market town in 1826.",
    accepted: ["von Thünen", "Johann von Thünen", "Johann Heinrich von Thünen", "von Thunen", "Thünen", "Thunen"], wrong: ["Weber"],
    explanation: "**Johann Heinrich von Thünen**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "What term describes the distance at which economic rent for a crop falls to zero?",
    accepted: ["margin of cultivation", "the margin of cultivation", "limit of cultivation", "margin of production"], wrong: ["rent gradient"],
    explanation: "The **margin of cultivation**." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why tea and coffee are grown mainly in Region I of Zimbabwe.",
    hints: ["Think about rainfall, temperature and altitude."],
    points: [
      "Region I has high and reliable rainfall (over about 1 000 mm), which the evergreen tea bush needs through the year.",
      "Highland altitude gives cool temperatures and a long growing season without frost damage.",
      "Soils are deep, acid and well drained, which suit tea and coffee, and estates can use steep slopes with terracing.",
    ],
    modelAnswer: "Region I has high, reliable rainfall of over about 1 000 mm, which tea needs all year. The highlands are cool with little frost, giving a long growing season, and the soils are deep and well drained.",
    explanation: "Rainfall, temperature and soil." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Suggest four reasons why real farm locations do not follow von Thünen's rings exactly.",
    hints: ["Each assumption of the model can fail in real life."],
    points: [
      "Soil, relief and climate vary from place to place, so some land is more productive than other land.",
      "Roads, railways and rivers make some places cheaper to reach than others, so land use forms strips along them.",
      "Refrigeration and fast transport reduce the cost of moving perishable goods.",
      "Governments influence what is grown through prices, subsidies, quotas and land policy, and there are many markets rather than one.",
    ],
    modelAnswer: "Soil, relief and climate vary, so some places are better for farming. Roads and railways make some places cheaper to reach, so land use follows transport routes in strips. Refrigeration and fast transport lower the cost of moving perishables, and governments influence what is grown through prices and subsidies, while there are many markets, not just one.",
    explanation: "Physical variation, transport routes, technology and policy break the assumptions." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the farming found in Region IV of Zimbabwe and explain one reason for it.",
    hints: ["Give the rainfall and the type of farming."],
    points: [
      "Region IV has about 450–650 mm of rain, with frequent seasonal droughts.",
      "Farming is semi-extensive: cattle ranching and drought-tolerant crops such as sorghum and millets.",
      "Reason: unreliable rain makes maize risky, so livestock and hardy crops reduce the chance of total failure.",
    ],
    modelAnswer: "Region IV has about 450–650 mm of rain and frequent seasonal droughts. Farming is semi-extensive, with cattle ranching and drought-tolerant crops such as sorghum and millets. Because rain is unreliable, maize is risky, so livestock and hardy crops spread the risk.",
    explanation: "Describe with rainfall figures, then explain." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `Four rainfall stations in a district of Zimbabwe record mean annual rainfall as follows (data invented for this exercise).\n\n${RT}`,
    hints: ["Mean = total ÷ number of stations.", "Compare each value with the rainfall ranges of the regions."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean annual rainfall of the four stations, in mm.", value: meanRain, unit: "mm", wrong: [2860, 560],
        explanation: "(1 080 + 820 + 560 + 400) ÷ 4 = 2 860 ÷ 4 = 715 mm. The value 2 860 is the total." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which station has rainfall in the range of Region V (below about 450 mm)?", options: [
        ["D", "Correct: 400 mm is below 450 mm."],
        ["A", "A has 1 080 mm, in the Region I range."],
        ["B", "B has 820 mm, in the Region II range."],
        ["C", "C has 560 mm, in the Region IV range."],
      ], answer: "A", explanation: "Only D, with 400 mm, falls below 450 mm." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why farmers at station B are likely to grow different crops from farmers at station C.",
        points: [
          "B has about 820 mm, which is reliable enough for intensive rain-fed crops such as maize and tobacco.",
          "C has about 560 mm, with frequent droughts, so maize often fails.",
          "Farmers at C choose drought-tolerant crops such as sorghum, or livestock, to reduce risk.",
        ],
        modelAnswer: "B has about 820 mm, reliable enough for maize and tobacco. C has about 560 mm with frequent droughts, so maize often fails and farmers choose sorghum or cattle to reduce risk.",
        explanation: "Link rainfall amount and reliability to crop choice." }),
      P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Assess how far rainfall alone explains the farming found at the four stations.",
        points: [
          "Rainfall decides which crops can grow without irrigation: A suits tea or intensive crops, D only ranching.",
          "Reliability and timing matter as well as the total: dry spells at B or C may harm crops.",
          "Soil type and drainage change how much of the rainfall crops can use.",
          "Irrigation can overcome low rainfall at D if water from a river or dam is available.",
          "Market access, roads and prices determine whether farmers can sell what they grow.",
          "Judgement: rainfall is the main physical limit, but capital, water supply and markets also shape the farming.",
        ],
        wordLimit: { max: 220 },
        modelAnswer: "Rainfall decides what can be grown without irrigation: A suits tea and intensive crops, while D can support only ranching. Its reliability and timing matter too, and soils change how much water crops can use. Irrigation can overcome low rainfall at D where a river or dam is available, and roads, markets and prices decide whether farmers can sell their produce. Rainfall is the main physical limit, but capital, water supply and markets also shape the farming.",
        explanation: "Weigh rainfall against other factors and judge." }),
    ], explanation: "Calculate mean rainfall, identify the region range and explain how rainfall affects farming." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `In this exercise (illustrative figures) a market town is surrounded by flat land of uniform fertility. Farmers choose between two crops.\n\n${ST}\n\nEconomic rent = price − production cost − transport cost.`,
    hints: ["Tomatoes: rent = 150 − 6d.", "Cotton: rent = 60 − 2d."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the economic rent for tomatoes at 10 km from the town, in US\\$ per tonne.", value: tomRent10, unit: "US$", wrong: [150, 60],
        explanation: "450 − 300 − (6 × 10) = 150 − 60 = US\\$90 per tonne." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the margin of cultivation for cotton, in km.", value: cotMargin, unit: "km", wrong: [60, 25],
        explanation: "Cotton rent = 60 − 2d = 0, so d = 30 km." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the distance at which tomatoes and cotton earn the same rent, in km.", value: crossB, unit: "km", wrong: [25, 30, 15],
        explanation: "150 − 6d = 60 − 2d gives 90 = 4d, so d = 22.5 km." }),
      P.manual({ label: "(d)", marks: 2, stem: "State two assumptions of von Thünen's model that are used in this exercise.",
        points: [
          "The land is flat with uniform soil fertility.",
          "Transport cost rises in proportion to distance from a single market town, and farmers aim to maximise profit.",
        ],
        modelAnswer: "The land is flat with uniform fertility, and transport costs rise in proportion to distance from a single market town to which farmers sell for profit.",
        explanation: "Uniform plain, one market, proportional transport costs and profit maximising." }),
    ], explanation: "Apply economic rent calculations to two crops." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the extent to which physical factors, rather than human and economic factors, explain the location of different types of farming in Zimbabwe.",
    hints: ["Give examples of physical control (the natural regions) and of human control (markets, policy, irrigation).", "Reach a judgement."],
    points: [
      "Rainfall amount and reliability set the broad pattern: intensive farming in Regions I and II, extensive ranching in Regions IV and V.",
      "Temperature and altitude confine tea and coffee to the Eastern Highlands.",
      "Soils and relief affect which fields are ploughed, terraced or left for grazing.",
      "Irrigation allows sugarcane and citrus in the dry lowveld, so human capital overcomes a physical limit.",
      "Markets and transport favour dairy and horticulture near Harare and other cities.",
      "Government policy, prices and land tenure influence crop choice and farm size, such as the area planted to tobacco or cotton in a season.",
      "Capital and technology decide who can irrigate, mechanise and use fertiliser.",
      "Judgement: physical factors set the limits, but human and economic factors decide what is actually grown within them.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Physical factors set the broad pattern. Rainfall amount and reliability make intensive farming possible in Regions I and II and confine Regions IV and V to ranching and drought-tolerant crops, while altitude and temperature restrict tea and coffee to the Eastern Highlands. Soils and relief decide which fields are ploughed or left for grazing. However, human factors can overcome physical limits: irrigation allows sugarcane and citrus in the dry lowveld, and markets and roads favour dairy and horticulture near cities. Government policy, prices and land tenure influence crop choice, and capital decides who can irrigate or mechanise. I conclude that physical factors set the limits, but human and economic factors decide what is grown within them.",
    wordLimit: { max: 300 }, explanation: "Weigh physical limits against human and economic choices and judge." });

  b.card("DEFINITION", "Economic rent (von Thünen)", "The surplus per unit of land after production and transport costs: price − production cost − transport cost.");
  b.card("DEFINITION", "Margin of cultivation", "The distance from the market at which economic rent falls to zero, so the crop is no longer worth growing.");
  b.card("FORMULA", "Economic rent for a crop at distance d", "Rent = price − production cost − (transport rate × d). Transport rate is cost per tonne per kilometre.");
  b.card("FACT", "Zimbabwe's agro-ecological regions", "Five regions, I to V: rainfall falls and becomes less reliable from I (over 1 000 mm) to V (below about 450 mm).");
  b.card("FACT", "Region I farming", "Tea, coffee, fruit, forestry and dairy in the cool, wet Eastern Highlands.");
  b.card("FACT", "Region V farming", "Extensive ranching and wildlife; crops such as sugarcane and citrus only with irrigation.");
  b.card("CONCEPT", "Von Thünen's assumptions", "Isolated state, one market town, flat uniform plain, profit-maximising farmers, transport cost proportional to distance, no government.");
  b.card("CONCEPT", "Von Thünen's predicted rings", "Market gardening and dairying, forestry, arable crops, livestock ranching, then wilderness, in rings around the market.");
  b.card("CONCEPT", "Limits of von Thünen's model", "Real land is not uniform; transport, refrigeration, irrigation and policy alter the rings, and there are many markets.");
});
