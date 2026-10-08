// Slice G4b: urban land-use zones and urban models (ZIMSEC 7.11.3).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.settlement.urban-land-use", { file: "settlement/urban-land-use", keyPrefix: "settlement.urban-land-use" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which zone of a town has the highest land values?",
    options: [
      ["The central business district", "Correct: it is the most accessible point and in highest demand."],
      ["The rural-urban fringe", "Land at the edge is usually cheapest."],
      ["The high-density residential zone", "Land here is cheaper than in the CBD."],
      ["The low-density residential zone", "Plots are large but land per square metre is cheaper than the CBD."],
    ],
    answer: "A",
    explanation: "Accessibility makes CBD land the most valuable.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which model shows a town as a series of rings around the CBD?",
    options: [
      ["The concentric zone model", "Correct: Burgess's model is made of rings."],
      ["The sector model", "Hoyt's model is made of wedges along routes."],
      ["The multiple-nuclei model", "This model has several centres."],
      ["The settlement hierarchy", "The hierarchy ranks settlements, not zones."],
    ],
    answer: "A",
    explanation: "Burgess (1925): concentric rings.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which feature is typical of the CBD?",
    options: [
      ["Tall office blocks with few permanent residents", "Correct: offices and shops dominate and few people live there."],
      ["Large houses on big plots with gardens", "This describes low-density residential areas."],
      ["Small farms and smallholdings", "These are found on the rural-urban fringe."],
      ["Factories beside railway sidings", "This describes the industrial zone."],
    ],
    answer: "A",
    explanation: "The CBD has high-rise commercial buildings and few residents.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are industrial zones often located beside railway lines?",
    options: [
      ["Raw materials and products can be moved in bulk", "Correct: rail access cuts transport costs for heavy goods."],
      ["Land beside railways is the most expensive in town", "Industrial land is usually cheaper than CBD land."],
      ["Railways attract wealthy residents", "Wealthy residents tend to avoid railways and industry."],
      ["Railways reduce noise from factories", "Railways add noise rather than reducing it."],
    ],
    answer: "A",
    explanation: "Industry needs transport for bulky inputs and outputs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the sector model, where is low-income housing usually found?",
    options: [
      ["Beside the industrial sector", "Correct: workers live near factories, on cheaper land."],
      ["In the outer commuter ring", "That is the high-income zone of the concentric model."],
      ["Inside the CBD", "The CBD is commercial, with few homes."],
      ["Along the most attractive high ground", "High ground usually attracts high-income housing."],
    ],
    answer: "A",
    explanation: "Hoyt placed low-income housing next to the industrial sector.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which Harare suburb is a high-density residential area?",
    options: [
      ["Mbare", "Correct: Mbare is Harare's oldest high-density suburb."],
      ["Borrowdale", "Borrowdale is a low-density northern suburb."],
      ["Mount Pleasant", "Mount Pleasant is a low-density northern suburb."],
      ["Msasa", "Msasa is mainly an industrial area."],
    ],
    answer: "A",
    explanation: "High-density suburbs lie mainly to the south and west of Harare's CBD.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which model has wedges, and which has several centres?"],
    stem: "A town has industry and high-density housing extending south-west along a railway, and low-density housing extending north-east. Which model does this pattern fit best?",
    options: [
      ["Sector model", "Correct: wedges of land use extend outwards along routes."],
      ["Concentric zone model", "That model has rings, not wedges in different directions."],
      ["Multiple-nuclei model", "The description has no separate centres."],
      ["Central place model", "That describes settlement hierarchy, not internal zones."],
    ],
    answer: "A",
    explanation: "Opposite wedges of land use along routes are the sector model's key feature.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    hints: ["Think about how Zimbabwean towns were planned before 1980."],
    stem: "Which is the best reason why the Burgess model fits Harare poorly?",
    options: [
      ["Colonial planning placed residential areas by race in sectors", "Correct: segregation, not rings of wealth, shaped the city."],
      ["Harare has no central business district", "Harare has a clear CBD."],
      ["Harare has no industrial areas", "Harare has several industrial areas."],
      ["Land values in Harare are lowest in the CBD and rise towards the edge", "Land values are highest in the CBD."],
    ],
    answer: "A",
    explanation: "Planning history produced sectors rather than concentric rings.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["What mixes urban and rural uses?"],
    stem: "A study area contains smallholdings, a new shopping mall, a cemetery and a sewage works. Which zone is it most likely to be?",
    options: [
      ["The rural-urban fringe", "Correct: a mix of farming and land-hungry urban uses on cheap land."],
      ["The central business district", "The CBD has no smallholdings or sewage works."],
      ["The zone of transition", "This zone has old factories and housing close to the CBD."],
      ["The medium-density residential zone", "This zone is mainly houses."],
    ],
    answer: "A",
    explanation: "The fringe has cheap land and a mixture of rural and urban uses.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The multiple-nuclei model shows a town growing round several centres rather than one.",
    answer: true,
    explanation: "True. Harris and Ullman's model has several nuclei.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the concentric zone model, the wealthiest people live in the zone of transition next to the CBD.",
    answer: false,
    explanation: "False. The zone of transition has deteriorating housing; the wealthiest live in the outer commuter zone.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each zone with a typical land use or feature.",
    pairs: [
      ["CBD", "Banks, offices and department stores"],
      ["Industrial zone", "Factories and warehouses with railway sidings"],
      ["Low-density residential", "Large plots with gardens and trees"],
      ["Rural-urban fringe", "Smallholdings mixed with new housing estates"],
    ],
    explanation: "Each zone has a characteristic land use.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct name for each model.",
    template: "The concentric zone model was proposed by {{blank:a}}, and the sector model by {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Burgess"], choices: ["Burgess", "Hoyt", "Harris and Ullman", "Christaller"] },
      { id: "b", accepted: ["Hoyt"], choices: ["Burgess", "Hoyt", "Harris and Ullman", "Christaller"] },
    ],
    explanation: "Burgess (1925) concentric; Hoyt (1939) sector; Harris and Ullman (1945) multiple nuclei.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A fictional high-density housing scheme has 240 houses on 8 hectares. Calculate its residential density in houses per hectare.",
    value: 30, tol: 0,
    wrong: [1920, 0.033],
    explanation: "240 ÷ 8 = 30 houses per hectare.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    hints: ["Add the counts and divide by the number of sites."],
    stem: "Pedestrian counts (fictional data) taken for 10 minutes at five sites along a road leading out of a CBD were 186, 142, 95, 61 and 26. Calculate the mean count.",
    value: 102, tol: 0,
    wrong: [95, 510],
    workedSolution: "1. Total = 186 + 142 + 95 + 61 + 26 = 510.\n2. Mean = 510 ÷ 5 = 102.",
    explanation: "510 ÷ 5 = 102 pedestrians per 10 minutes.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** characteristics of the central business district of a town.",
    points: [
      "Tall, high-rise buildings.",
      "Offices, banks, large shops, hotels and government buildings.",
      "Highest land values / rents.",
      "Few residents; heavy traffic, congestion and many pedestrians by day.",
    ],
    modelAnswer: "The CBD has tall buildings housing offices, banks and large shops. Land values are the highest in the town. Few people live there, but it is crowded with traffic and pedestrians during the day.",
    explanation: "Give features that could be observed.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Think about cost of land, journey to work and planning history."],
    stem: "Explain why high-density suburbs in Harare are mostly located close to industrial areas.",
    points: [
      "Workers can walk or use cheap transport to factories.",
      "Land near industry is cheaper / less attractive, so suited to low-cost housing.",
      "Colonial planning placed townships for African workers near industry and away from low-density suburbs.",
    ],
    modelAnswer: "Workers can reach the factories cheaply on foot or by kombi. Land near industry is cheaper and less pleasant, so it was used for low-cost housing, and colonial planners deliberately placed workers' townships there, away from the low-density suburbs.",
    explanation: "Link each reason to the location.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    hints: ["Describe Harare's zones, then compare each model.", "End with which model fits best and why."],
    stem: "With reference to Harare or Bulawayo, evaluate how well the concentric zone, sector and multiple-nuclei models describe the town's land use.",
    points: [
      "Names the town and describes its CBD.",
      "Describes industrial areas (e.g. Workington, Southerton, Msasa in Harare) and their position near railways.",
      "Describes high-density suburbs (e.g. Mbare, Highfield, Glen View) mainly to the south and west.",
      "Describes low-density suburbs (e.g. Borrowdale, Mount Pleasant) mainly to the north and north-east.",
      "Sector model fits: wedges of industry with high-density housing, low-density housing in the opposite direction.",
      "Multiple-nuclei fits: suburban shopping and office centres, satellite towns; concentric fits poorly.",
      "Judgement with reasons: colonial planning, relief, informal growth explain the departures from the models.",
    ],
    levels: geographyLevels(7),
    modelAnswer: "Harare has a clear CBD of high-rise offices, banks and shops with the highest land values, which matches all three models. Industry lies mainly south and south-west along the railway in areas such as Workington and Southerton, with more in Msasa to the east. High-density suburbs such as Mbare, Highfield and Glen View lie mainly to the south and west near industry, while low-density suburbs such as Borrowdale and Mount Pleasant lie to the north and north-east. These wedges of land use match Hoyt's sector model well. Suburban shopping and office centres in the northern suburbs, and satellite towns such as Chitungwiza, show multiple nuclei. The concentric model fits poorly because wealth does not increase in rings outwards; instead colonial planning separated residential areas by race into sectors. Overall Harare is best described as a sector model with multiple nuclei, but no model fits perfectly because of its planning history, relief and recent informal growth at the edges.",
    explanation: "Describe the real town, compare with each model and judge.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 540,
    stem: "Table 1 shows land use along a transect from the centre of a fictional town (fictional data).\n\n| Distance from centre (km) | Main land use | Typical building height (storeys) | Plot size (m²) |\n|---|---|---|---|\n| 0.5 | Offices and shops | 12 | 400 |\n| 1.5 | Factories and warehouses | 2 | 5,000 |\n| 3.0 | Houses | 1 | 300 |\n| 6.0 | Houses | 1 | 2,000 |\n| 9.0 | Smallholdings and a new mall | 1 | 20,000 |",
    hints: ["Use building height and plot size together."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which zone is found at 3.0 km?",
        options: [
          ["High-density residential", "Correct: small plots of 300 m² with single-storey houses."],
          ["Low-density residential", "Low-density plots are large, like the 2,000 m² at 6 km."],
          ["Central business district", "The CBD is at 0.5 km with tall buildings."],
          ["Rural-urban fringe", "The fringe is at 9 km."],
        ],
        answer: "A", explanation: "Small plots mean high-density housing.",
      }),
      P.num({ label: "(b)", stem: "How many times larger is a plot at 6.0 km than a plot at 3.0 km? Give your answer to one decimal place.", value: 6.6667, answer: "6.7", tol: 0.05, wrong: [1700, 0.15], explanation: "2,000 ÷ 300 = 6.7 times." }),
      P.manual({
        label: "(c)", marks: 2, stem: "Describe how building height changes with distance from the centre.",
        points: ["Building height is greatest at the centre (12 storeys at 0.5 km).", "It falls sharply away from the centre to 1-2 storeys beyond 1.5 km."],
        modelAnswer: "Buildings are tallest in the centre (12 storeys) and fall to 2 storeys at 1.5 km and 1 storey further out.",
        explanation: "Describe the trend with data.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why buildings are tallest near the centre.",
        points: ["The centre is the most accessible place, so demand for land is highest.", "Land values/rents are therefore highest.", "Building upwards makes the most of expensive land / businesses there can afford high rents."],
        modelAnswer: "The centre is where routes meet, so it is the most accessible place and many businesses want to locate there. This makes land very expensive, so developers build upwards to fit more floor space on each plot.",
        explanation: "Accessibility → demand → land value → height.",
      }),
    ],
    explanation: "This item practises interpreting a land-use transect.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 420,
    stem: "A description of a fictional town: the CBD lies at a road and rail junction. A railway runs from the CBD to the south-west, with factories along it and small council houses on either side. A main road runs north-east to a reservoir, with large houses on hills along it. A university with its own shops lies 6 km east of the CBD.",
    hints: ["Look for wedges and separate centres."],
    parts: [
      P.mcq({
        label: "(a)", stem: "The factories and council houses along the railway best match which feature of the sector model?",
        options: [
          ["An industrial sector with low-income housing beside it", "Correct: a wedge along a transport route."],
          ["A concentric ring of high-income commuter housing", "Rings are part of the concentric model."],
          ["A separate business nucleus", "That is part of the multiple-nuclei model."],
          ["The zone of transition", "That is a ring round the CBD in the concentric model."],
        ],
        answer: "A", explanation: "Hoyt's industrial sector follows a transport route.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Suggest **two** reasons why large houses have been built on the hills along the road to the north-east.",
        points: ["Away from factory noise and pollution / on the opposite side of town to industry.", "Pleasant views, cooler, well-drained hills / near the reservoir; residents have cars to travel along the main road."],
        modelAnswer: "The hills are far from the factories in the south-west, so they are quieter and cleaner, and they have attractive views over the reservoir.",
        explanation: "Low-density housing seeks pleasant environments.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Which feature of the town suggests the multiple-nuclei model? Explain your answer.",
        points: ["The university with its own shops 6 km east of the CBD.", "It forms a separate centre (nucleus) of activity away from the CBD."],
        modelAnswer: "The university with its own shops is a second centre of activity, separate from the CBD, which is what the multiple-nuclei model shows.",
        explanation: "A nucleus is a separate centre.",
      }),
    ],
    explanation: "This item practises applying urban models to a described town.",
  });

  b.card("DEFINITION", "Central business district (CBD)", "The commercial centre of a town: main shops, offices, banks; highest land values and buildings; few residents.");
  b.card("DEFINITION", "Rural-urban fringe", "Edge-of-town zone mixing rural and urban uses: smallholdings, new housing, malls, cemeteries, sewage works.");
  b.card("VOCABULARY", "Residential density", "Number of houses or people per unit area: high density = small plots, low density = large plots.");
  b.card("CONCEPT", "Concentric zone model (Burgess, 1925)", "Rings round the CBD: transition zone, low-income, medium-income, high-income commuter zone.");
  b.card("CONCEPT", "Sector model (Hoyt, 1939)", "Wedges along transport routes: industry with low-income housing; high-income sector extending away from industry.");
  b.card("CONCEPT", "Multiple-nuclei model (Harris and Ullman, 1945)", "A town grows round several centres: CBD, outlying business districts, industrial districts, suburban centres.");
  b.card("FACT", "Harare's land use", "Industry south and south-west along the railway (Workington, Southerton) and east (Msasa); high-density suburbs south and west; low-density north and north-east.");
  b.card("CONCEPT", "Why African towns differ from the models", "Colonial racial planning, relief and wetlands, informal settlements, satellite towns; models were based on US cities.");
});
