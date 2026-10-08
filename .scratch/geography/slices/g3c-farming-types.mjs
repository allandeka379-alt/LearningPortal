// Slice G3c: farming types in Zimbabwe (ZIMSEC 7.9.2).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.agriculture.farming-types", { file: "agriculture/farming-types", keyPrefix: "agriculture.farming-types" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where are Zimbabwe's main **tea** estates?",
    options: [
      ["Chipinge and the Honde Valley", "Correct: tea needs the high rainfall and cool climate of the Eastern Highlands."],
      ["Triangle and Hippo Valley", "These Lowveld estates grow irrigated sugar cane."],
      ["The Zambezi valley near Binga", "This hot, dry area is unsuitable for tea."],
      ["Matabeleland near Gwanda", "This dry area is used for ranching."],
    ],
    answer: "A",
    explanation: "Tea is a Region I plantation crop of the Eastern Highlands.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which plantation crop is grown on irrigated estates around **Triangle and Hippo Valley**?",
    options: [
      ["Sugar cane", "Correct: the Lowveld estates grow sugar cane with water from dams."],
      ["Tea", "Tea is grown in the Eastern Highlands."],
      ["Coffee", "Coffee is grown mainly in the Chipinge area of the Eastern Highlands."],
      ["Pine trees", "Pine plantations are in the Eastern Highlands."],
    ],
    answer: "A",
    explanation: "Hot lowveld temperatures plus irrigation make sugar cane highly productive.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are commercial dairy farms usually located **close to towns**?",
    options: [
      ["Fresh milk is perishable and must reach buyers quickly", "Correct: nearness to processors and consumers keeps milk fresh and cuts transport cost."],
      ["Cows need less grazing land near towns", "Grazing needs are the same everywhere; location is about the market."],
      ["Land is cheapest near towns", "Land near towns is usually more expensive."],
      ["Dairy cows cannot survive in remote rural areas at all", "Cows can live anywhere with enough feed and water."],
    ],
    answer: "A",
    explanation: "Milk is bulky and perishable, so dairying locates near urban markets and processors.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a characteristic of **plantation agriculture**?",
    options: [
      ["A single crop grown on a large estate with many workers", "Correct: plantations specialise in one crop, often processed on site."],
      ["Many crops grown on a small family plot", "That describes subsistence or communal farming."],
      ["Cattle grazed extensively on natural pasture", "That describes cattle ranching."],
      ["Vegetables grown on small plots for a nearby town", "That describes market gardening."],
    ],
    answer: "A",
    explanation: "Plantations: large estates, monoculture, high capital, many workers, processing nearby, often for export.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are indigenous breeds such as Mashona and Tuli cattle popular on ranches in Regions IV and V?",
    options: [
      ["They tolerate heat, drought and ticks", "Correct: adapted breeds survive the harsh conditions better than imported breeds."],
      ["They produce the most milk of any breed", "High milk yield is a feature of dairy breeds such as Friesian."],
      ["They need planted pastures and bought feed", "Ranch cattle live mainly on natural grazing."],
      ["They can only be kept in cool highlands", "They are adapted to hot, dry lowlands."],
    ],
    answer: "A",
    explanation: "Adapted breeds suit extensive ranching in hot, dry, tick-infested areas.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which irrigation method wastes the **least** water?",
    options: [
      ["Drip irrigation", "Correct: water is delivered slowly to each plant's roots, with little evaporation or run-off."],
      ["Flood (basin) irrigation", "Flooding loses much water to evaporation and seepage."],
      ["Furrow irrigation", "Open furrows lose water to evaporation and seepage."],
      ["Overhead sprinklers on a windy day", "Spray drifts and evaporates in wind and heat."],
    ],
    answer: "A",
    explanation: "Drip irrigation is the most efficient, though costly to install.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "An outbreak of **foot-and-mouth disease** is reported in a ranching district. Which effect on ranchers is **most likely**?",
    options: [
      ["Cattle movements are restricted and beef exports may stop", "Correct: controls on movement and export bans prevent the spread of the disease."],
      ["Ranchers switch at once to tea plantations", "The climate of ranching areas is unsuitable for tea."],
      ["Milk yields from the dairy breeds in the district rise sharply", "The disease lowers productivity; it does not raise yields."],
      ["Water supplies for irrigation increase", "The disease has no effect on water supply."],
    ],
    answer: "A",
    hints: ["What do authorities do to stop an animal disease spreading?", "How do importing countries react?"],
    explanation: "Foot-and-mouth outbreaks bring quarantine, movement controls and export restrictions, cutting ranch incomes.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A vegetable grower 150 km from Harare sells tomatoes at Mbare Musika. Which change would **most** improve her profits?",
    options: [
      ["A tarred road that cuts journey time and losses from bruising", "Correct: perishable produce loses value on long, rough journeys."],
      ["A fall in the price of tomatoes in Harare", "Lower prices reduce income."],
      ["More growers planting tomatoes at the same time", "A glut lowers prices."],
      ["A rise in the cost of transport per kilometre", "Higher transport costs reduce profit."],
    ],
    answer: "A",
    hints: ["Tomatoes are perishable.", "Which option reduces costs or losses?"],
    explanation: "Market gardening depends on fast, cheap access to urban markets.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In communal farming, cattle provide draught power, manure and milk and are also a store of wealth.",
    answer: true,
    explanation: "True. Cattle have many uses in communal farming systems.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Irrigation can lead to salinisation of the soil if drainage is poor.",
    answer: true,
    explanation: "True. When irrigation water evaporates from poorly drained soil, salts are left behind and build up near the surface.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each farming type with an area or scheme in Zimbabwe where it is important.",
    pairs: [
      ["Tea plantations", "Honde Valley"],
      ["Irrigated sugar cane", "Hippo Valley"],
      ["Market gardening for Harare", "Mutoko"],
      ["Smallholder irrigation scheme", "Nyanyadzi"],
    ],
    explanation: "Honde Valley (tea), Hippo Valley (sugar), Mutoko (vegetables for Harare), Nyanyadzi (smallholder irrigation).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Growing cut flowers such as roses for export is part of {{blank:a}}. The flowers are sent to Europe by {{blank:b}} because they are {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["horticulture"], choices: ["horticulture", "ranching", "forestry", "dairying"] },
      { id: "b", accepted: ["air"], choices: ["air", "rail", "sea", "pipeline"] },
      { id: "c", accepted: ["perishable"], choices: ["perishable", "bulky", "cheap", "heavy"] },
    ],
    explanation: "Export horticulture relies on fast air freight for perishable, high-value produce.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Drip irrigation supplies 4 mm of water a day to a 3 ha field. If 1 mm over 1 ha equals 10 m³, how many cubic metres of water are used each day? (fictional figures)",
    value: 120,
    wrong: [12, 1200],
    explanation: "3 × 4 × 10 = 120 m³ per day.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A dairy herd of 60 cows gives an average of 18 litres per cow per day. The farmer is paid US\\$0.45 per litre (fictional figures). Calculate the farmer's income from milk in a 30-day month, in US dollars.",
    value: 14580,
    wrong: [486, 32400, 1080],
    hints: ["Find the litres produced per day first.", "Multiply by the number of days and by the price."],
    workedSolution: "1. Milk per day = 60 × 18 = 1,080 litres.\n2. Milk per month = 1,080 × 30 = 32,400 litres.\n3. Income = 32,400 × 0.45 = US\\$14,580.",
    explanation: "32,400 litres × US\\$0.45 = US\\$14,580.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** characteristics of cattle ranching in Zimbabwe.",
    points: [
      "Large ranches of thousands of hectares (extensive).",
      "Found in dry Regions IV and V, for example Matabeleland or the Lowveld.",
      "Cattle graze natural pasture with few workers per hectare.",
      "Hardy breeds such as Mashona, Tuli or Nkone (or Brahman crosses) / beef sold to abattoirs or for export.",
    ],
    modelAnswer: "Ranches cover thousands of hectares in the dry south and west, in Regions IV and V. Cattle graze natural grassland with few workers. Hardy breeds such as Mashona and Tuli are kept, and the beef is sold to abattoirs.",
    explanation: "Cover size, location, inputs and breeds or markets.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Think about water and soils.", "Each challenge needs an effect."],
    stem: "Explain **two** challenges faced by communal farmers in Regions IV and V.",
    points: [
      "Low, unreliable rainfall / droughts and dry spells (1).",
      "So rain-fed crops such as maize often fail and food shortages follow (1).",
      "Infertile sandy soils, overgrazing or lack of capital (1).",
      "Effect: low yields / soil erosion on shared grazing / cannot buy fertiliser or improved seed (1).",
    ],
    modelAnswer: "Rainfall is low and unreliable, so maize often wilts in dry spells and harvests fail. The soils are often sandy and infertile, and farmers lack money for fertiliser, so yields stay low.",
    explanation: "State each challenge and explain its effect.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 660,
    hints: ["Yield = output ÷ area.", "Compare the two systems row by row."],
    stem: "Table 1 compares a fictional rain-fed communal plot with a fictional plot in an irrigation scheme in the same district (fictional data).\n\n| | Rain-fed plot | Irrigated plot |\n|---|---|---|\n| Area (ha) | 2.0 | 0.5 |\n| Crops per year | 1 | 2 |\n| Maize harvested per year (t) | 1.6 | 3.0 |\n| Water and electricity cost per year (US\\$) | 0 | 240 |",
    parts: [
      P.num({ label: "(a)", stem: "Calculate the maize yield of the rain-fed plot in tonnes per hectare per year.", value: 0.8, tol: 0.005, wrong: [3.2, 1.25], explanation: "1.6 ÷ 2.0 = 0.8 t/ha." }),
      P.num({ label: "(b)", stem: "Calculate the maize yield of the irrigated plot in tonnes per hectare per year.", value: 6, tol: 0.005, wrong: [1.5, 3], explanation: "3.0 ÷ 0.5 = 6 t/ha." }),
      P.mcq({
        label: "(c)", stem: "Which statement is supported by Table 1?",
        options: [
          ["The irrigated plot produces more maize from a quarter of the area", "Correct: 3.0 t from 0.5 ha against 1.6 t from 2.0 ha."],
          ["The rain-fed plot has the higher maize yield per hectare", "Its yield (0.8 t/ha) is far lower than 6 t/ha."],
          ["Irrigation costs nothing to run on the irrigated plot", "It costs US\\$240 a year."],
          ["Both plots grow two crops each year", "Only the irrigated plot grows two."],
        ],
        answer: "A", explanation: "Irrigation allows two crops a year and much higher yields.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain **three** problems that irrigation schemes in Zimbabwe can face.",
        points: ["High costs of pumps, electricity and maintenance of canals.", "Siltation of dams or canals reduces water supply / disputes over water allocation.", "Waterlogging and salinisation of soils, or diseases such as bilharzia and malaria."],
        modelAnswer: "Pumps need electricity and canals need repair, which many farmers cannot afford. Dams and canals silt up, and poorly drained plots become waterlogged and salty. Canals can spread bilharzia.",
        explanation: "Problems are economic, environmental and health-related.",
      }),
    ],
    explanation: "Compare rain-fed and irrigated farming with yield calculations.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", secs: 540,
    hints: ["Think about climate, capital and processing."],
    stem: "A fictional estate in the Eastern Highlands grows tea on 1,200 ha. It employs 1,500 workers, has its own factory where leaves are withered, rolled and dried, and exports most of its tea.",
    parts: [
      P.manual({
        label: "(a)", marks: 3, stem: "State **three** characteristics of plantation agriculture shown by this estate.",
        points: ["A single crop (tea) on a large estate (1,200 ha).", "Many workers (1,500), much of the work by hand.", "Processing on the estate (factory) and/or production for export."],
        modelAnswer: "It grows one crop, tea, on a large estate; it employs many workers; and it processes the leaves in its own factory for export.",
        explanation: "Plantations are large, specialised, labour-intensive and export-oriented.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why the Eastern Highlands are suitable for tea.",
        points: ["High rainfall (more than about 1,000 mm) spread over much of the year.", "Cool temperatures at altitude / acid, well-drained soils on slopes."],
        modelAnswer: "Region I has high rainfall spread through much of the year, and its cool, well-drained, acidic hill soils suit tea bushes.",
        explanation: "Link the climate and soils of Region I to the crop's needs.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest **two** problems that could affect the estate.",
        points: ["Falling world tea prices / dependence on one crop.", "Drought, disease, rising costs of labour or power, or storm damage (e.g. a tropical cyclone)."],
        modelAnswer: "A fall in world tea prices would cut income because the estate depends on one crop, and a drought or storm could damage the bushes.",
        explanation: "Specialisation increases risk.",
      }),
    ],
    explanation: "Apply the characteristics of plantation agriculture to a described estate.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "\"Irrigation is the best solution to the problems of farming in Zimbabwe's dry regions.\" To what extent do you agree? Refer to named examples.",
    hints: ["Give the benefits with named schemes.", "Then weigh costs and alternatives such as ranching and drought-tolerant crops."],
    points: [
      "Irrigation allows farming in the dry season and drought; two or three crops a year.",
      "Example: Lowveld sugar estates (Triangle, Hippo Valley) using water from Lake Mutirikwi; Tugwi-Mukosi built partly for irrigation.",
      "Example: smallholder schemes such as Nyanyadzi raise yields and food security.",
      "Costs: dams, canals, pumps and electricity are expensive; maintenance often lacking.",
      "Problems: siltation, salinisation, waterlogging, bilharzia and malaria, water disputes.",
      "Alternatives: ranching and wildlife, drought-tolerant crops, conservation agriculture, water harvesting may suit most dry land better.",
      "Judgement: irrigation is very effective where water and money exist, but only a small part of dry land can be irrigated, so it must be combined with other strategies.",
    ],
    levels: geographyLevels(7),
    modelAnswer: "Irrigation transforms dry regions where water is available. In the Lowveld, canals from Lake Mutirikwi supply the sugar estates of Triangle and Hippo Valley, and Tugwi-Mukosi dam was built partly to extend irrigation. Smallholder schemes such as Nyanyadzi let families grow two crops a year and survive droughts. However, irrigation is expensive: dams, canals, pumps and electricity cost a great deal, and many schemes decline when maintenance fails. Poor drainage causes waterlogging and salinisation, canals can spread bilharzia, and dams silt up. Most of Regions IV and V are far from reliable water, so ranching, wildlife, drought-tolerant small grains and conservation agriculture remain essential. Irrigation is one of the best solutions where water and capital exist, but it cannot solve the problems of all the dry regions on its own.",
    explanation: "Use named examples on both sides and reach a balanced judgement.",
  });

  b.card("DEFINITION", "**Plantation agriculture**", "Large-scale growing of one crop on an estate with many workers, high capital and nearby processing.", "Tea, sugar cane, timber.");
  b.card("DEFINITION", "**Market gardening**", "Intensive growing of vegetables on small plots close to urban markets.", "Mutoko supplies Mbare Musika.");
  b.card("FACT", "Tea in Zimbabwe", "Grown in Chipinge and the Honde Valley (Eastern Highlands, Region I).", undefined);
  b.card("FACT", "Sugar cane in Zimbabwe", "Irrigated estates at Triangle and Hippo Valley near Chiredzi (Lowveld, Region V).", undefined);
  b.card("CONCEPT", "Dairy farm location", "Near towns in Regions I and II, because milk is perishable and bulky.", undefined);
  b.card("CONCEPT", "Cattle ranching", "Extensive grazing on large ranches in Regions IV and V; hardy breeds such as Mashona and Tuli.", undefined);
  b.card("CONCEPT", "Benefits of mixed farming", "Manure for crops, residues for animals, draught power, and risk spread between enterprises.", undefined);
  b.card("CONCEPT", "Problems of irrigation", "High costs, siltation, waterlogging, salinisation, bilharzia and malaria, water disputes.", undefined);
  b.card("VOCABULARY", "**Drip irrigation**", "Water delivered slowly to each plant's roots through pipes; the least wasteful method.", undefined);
});
