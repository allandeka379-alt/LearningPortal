// Slice G4b: population distribution and density (ZIMSEC 7.11.7).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.population.distribution-density", { file: "population/distribution-density", keyPrefix: "population.distribution-density" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How is population density calculated?",
    options: [
      ["Total population divided by area", "Correct: people per km²."],
      ["Area divided by total population", "This gives km² per person."],
      ["Births divided by deaths", "This is not a density measure."],
      ["Total population multiplied by area", "Multiplying gives a meaningless number."],
    ],
    answer: "A",
    explanation: "Density = population ÷ area (people per km²).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which world region is **sparsely** populated?",
    options: [
      ["The Sahara", "Correct: extreme aridity limits settlement."],
      ["The Ganges plain", "This is one of the most densely populated areas."],
      ["Western Europe", "This is densely populated."],
      ["Eastern China", "This is densely populated."],
    ],
    answer: "A",
    explanation: "Deserts are sparsely populated because of lack of water.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is the Nile valley in Egypt densely populated even though it lies in a desert?",
    options: [
      ["Water and fertile alluvium", "Correct: water and soil support farming and settlement."],
      ["It receives very high rainfall", "Egypt has very little rainfall."],
      ["It is covered by tropical rainforest", "It is a desert region."],
      ["It has high, cool mountains", "The valley is lowland."],
    ],
    answer: "A",
    explanation: "Rivers in deserts attract dense settlement.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which area of Zimbabwe is **sparsely** populated?",
    options: [
      ["The Zambezi valley", "Correct: hot, dry, with poor soils and a history of tsetse fly."],
      ["Harare and Chitungwiza", "This is the most densely populated urban area."],
      ["The highveld of Mashonaland", "This has reliable rain, fertile soils and many towns."],
      ["Bulawayo", "Bulawayo is the second-largest city."],
    ],
    answer: "A",
    explanation: "Low rainfall, heat and disease kept the Zambezi valley sparsely settled.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **human** factor that leads to dense population?",
    options: [
      ["Plentiful jobs", "Correct: economic opportunities attract people."],
      ["Fertile volcanic soils", "Soils are a physical factor."],
      ["Reliable rainfall", "Climate is a physical factor."],
      ["Flat, low-lying land", "Relief is a physical factor."],
    ],
    answer: "A",
    explanation: "Human factors include jobs, transport, services and government policy.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "On a dot map, what does a large blank area show?",
    options: [
      ["A sparsely populated area", "Correct: no dots means very few people."],
      ["A densely populated area", "Dense areas have many dots."],
      ["An area with no data available", "Dot maps show blank areas where few people live."],
      ["The capital city", "Cities appear as clusters of dots."],
    ],
    answer: "A",
    explanation: "Dots represent people; their absence means sparse population.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["What could support many people in a dry area?"],
    stem: "A choropleth map shows one district in Zimbabwe's dry Lowveld with a high population density. What is the most likely explanation?",
    options: [
      ["An irrigated sugar estate", "Correct: irrigation and agro-industry support dense settlement."],
      ["High rainfall throughout the year", "The Lowveld has low, unreliable rainfall."],
      ["A large national park", "National parks have very few residents."],
      ["Cold winters with frost", "Frost would not attract settlement."],
    ],
    answer: "A",
    explanation: "Irrigated estates such as those around Chiredzi and Triangle create local concentrations.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    hints: ["What does an average hide?"],
    stem: "A district has a density of 40 people per km². Why might this figure be misleading?",
    options: [
      ["Most people may live in one town, leaving the rest empty", "Correct: density is an average that hides variation."],
      ["Density is always measured in people per hectare", "It is usually per km²."],
      ["It does not include children", "Density counts everyone."],
      ["It is the same as the birth rate", "Density and birth rate are unrelated measures."],
    ],
    answer: "A",
    explanation: "An average density can hide clusters and empty areas.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Think of colonial land policy."],
    stem: "Why do many communal areas of Zimbabwe have high rural population densities, even on poor soils?",
    options: [
      ["Colonial land policy confined many farmers to limited land", "Correct: a historical, political factor."],
      ["They have the country's richest soils and highest rainfall", "Many communal areas have poor soils and low rainfall."],
      ["They contain the country's largest factories", "Industry is mainly in towns."],
      ["They are national parks", "National parks are sparsely populated."],
    ],
    answer: "A",
    explanation: "Historical land allocation, not only physical factors, shapes density.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Population density is usually measured in people per square kilometre.",
    answer: true,
    explanation: "True: people per km².",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The Congo rainforest is densely populated because it has high rainfall.",
    answer: false,
    explanation: "False. Dense forest, leached soils and disease make it sparsely populated.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each area with the main reason for its population density.",
    pairs: [
      ["Siberia", "Very cold climate: sparse"],
      ["Rwanda", "Fertile volcanic soils and reliable rain: dense"],
      ["Kalahari", "Lack of water: sparse"],
      ["Bangladesh", "Fertile delta lowland: dense"],
    ],
    explanation: "Physical factors explain many dense and sparse areas.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "A map that shades areas according to their average density is a {{blank:a}} map. A map in which each symbol stands for a set number of people is a {{blank:b}} map.",
    blanks: [
      { id: "a", accepted: ["choropleth"], choices: ["choropleth", "dot", "isoline", "flow"] },
      { id: "b", accepted: ["dot"], choices: ["choropleth", "dot", "isoline", "flow"] },
    ],
    explanation: "Choropleth maps shade areas; dot maps use dots for people.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "people/km²", daily: true,
    stem: "A fictional district has 54,000 people on 1,350 km². Calculate its population density.",
    value: 40, tol: 0,
    wrong: [0.025, 72900000],
    explanation: "54,000 ÷ 1,350 = 40 people per km².",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    hints: ["Rearrange: population = density × area."],
    stem: "A fictional ward has an area of 2,400 km² and a population density of 35 people per km². Calculate its population.",
    value: 84000, tol: 0,
    wrong: [68.6, 2435],
    workedSolution: "1. Population = density × area.\n2. 35 × 2,400 = 84,000 people.",
    explanation: "35 × 2,400 = 84,000 people.",
  });
  b.num({
    d: 3, skill: "APPLICATION", unit: "people/km²",
    hints: ["Use approximate values: population ÷ area."],
    stem: "Zimbabwe had about 15.2 million people (2022 census) and has an area of about 390,000 km². Estimate its population density to the nearest whole number.",
    value: 38.97, answer: "39", tol: 0.6,
    wrong: [25.7, 3.9],
    explanation: "15,200,000 ÷ 390,000 ≈ 39 people per km².",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the highveld of Zimbabwe is more densely populated than the Zambezi valley.",
    points: [
      "Highveld has more reliable rainfall; the Zambezi valley is hot and dry.",
      "Highveld has more fertile soils for farming.",
      "Highveld has cities, industry, mines and jobs / good roads and railways.",
      "Zambezi valley has had tsetse fly and malaria / poor access / national parks and safari areas.",
    ],
    modelAnswer: "The highveld has reliable rainfall, a moderate climate and fertile soils, and it contains Harare and other towns with jobs, served by roads and railways. The Zambezi valley is hot and dry with poor soils, and tsetse fly and malaria discouraged settlement; much of it is protected wildlife land.",
    explanation: "Contrast physical and human factors in both areas.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    hints: ["Name dense and sparse regions of Africa."],
    stem: "Describe the distribution of population in Africa.",
    points: [
      "Dense in the Nile valley and delta.",
      "Dense along the West African coast (e.g. southern Nigeria) and in the Great Lakes region (Rwanda, Burundi, Uganda).",
      "Dense in the Ethiopian highlands / South African highveld and coasts.",
      "Sparse in the Sahara, Kalahari and Namib deserts and the Congo rainforest.",
    ],
    modelAnswer: "Africa's population is concentrated in the Nile valley, along the West African coast especially in Nigeria, around the Great Lakes, in the Ethiopian highlands and in parts of South Africa. The Sahara, Kalahari and Namib deserts and the Congo rainforest are sparsely populated.",
    explanation: "Name places for both dense and sparse areas.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    hints: ["Compare physical factors with human factors.", "Use examples from Zimbabwe."],
    stem: "\"Physical factors are more important than human factors in explaining population density in Zimbabwe.\" Discuss this statement.",
    points: [
      "Physical: rainfall and natural regions (highveld dense; Zambezi valley and Lowveld sparse).",
      "Physical: soils, relief, water and disease (tsetse fly, malaria).",
      "Human: towns and jobs (Harare, Bulawayo); mining towns along the Great Dyke.",
      "Human: irrigation schemes (Lowveld sugar estates) overcome physical limits.",
      "Human/historical: colonial land policy produced dense communal areas; national parks keep areas empty.",
      "Supported judgement (e.g. physical factors set the broad pattern but human factors explain many exceptions).",
    ],
    levels: geographyLevels(6),
    modelAnswer: "Physical factors explain the broad pattern: the wetter highveld and Eastern Highlands with fertile soils are densely settled, while the hot, dry Zambezi valley and Lowveld, once affected by tsetse fly, are sparse. However, human factors are very important. Harare, Bulawayo and the mining towns of the Great Dyke have dense populations because of jobs. Irrigation has created dense settlement around the Lowveld sugar estates despite low rainfall. Colonial land policy crowded many farmers into communal areas, some on poor soils, while national parks such as Hwange keep large areas nearly empty. Physical factors set the general pattern, but human factors explain the highest densities and many exceptions, so the statement is only partly true.",
    explanation: "Balance both groups of factors and judge.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows four fictional districts (fictional data).\n\n| District | Population | Area (km²) | Mean annual rainfall (mm) | Main activity |\n|---|---|---|---|---|\n| A | 312,000 | 2,600 | 850 | Town and commercial farming |\n| B | 96,000 | 2,400 | 720 | Mixed farming |\n| C | 18,500 | 925 | 480 | Irrigated sugar estate |\n| D | 41,000 | 8,200 | 450 | Cattle ranching and wildlife |",
    hints: ["Density = population ÷ area.", "Compare C and D, which have similar rainfall."],
    parts: [
      P.num({ label: "(a)", unit: "people/km²", stem: "Calculate the population density of District A.", value: 120, wrong: [0.0083, 811200], explanation: "312,000 ÷ 2,600 = 120 people per km²." }),
      P.num({ label: "(b)", unit: "people/km²", stem: "Calculate the population density of District D.", value: 5, wrong: [0.2, 200], explanation: "41,000 ÷ 8,200 = 5 people per km²." }),
      P.num({ label: "(c)", unit: "people/km²", stem: "Calculate the population density of District C.", value: 20, wrong: [0.05, 50], explanation: "18,500 ÷ 925 = 20 people per km²." }),
      P.manual({
        label: "(d)", marks: 3, stem: "Districts C and D have similar rainfall. Explain why C is more densely populated than D.",
        points: ["C has irrigation, so crops do not depend on rain.", "The sugar estate needs many workers for growing, cutting and milling.", "D's ranching and wildlife need large areas and few workers."],
        modelAnswer: "District C is irrigated, so sugar cane can grow despite low rainfall, and the estate and mill employ many workers. District D's cattle ranches and wildlife areas need large areas of land but very few workers.",
        explanation: "Human factors can override physical ones.",
      }),
    ],
    explanation: "This item practises density calculations and explanation.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 480,
    stem: "A fictional dot map uses 1 dot = 500 people. Grid square X contains 46 dots and has an area of 115 km². Grid square Y contains 3 dots and also has an area of 115 km².",
    hints: ["Convert dots to people first."],
    parts: [
      P.num({ label: "(a)", stem: "How many people live in square X?", value: 23000, wrong: [46, 5290], explanation: "46 × 500 = 23,000 people." }),
      P.num({ label: "(b)", unit: "people/km²", stem: "Calculate the population density of square X.", value: 200, wrong: [0.4, 0.005], explanation: "23,000 ÷ 115 = 200 people per km²." }),
      P.manual({
        label: "(c)", marks: 2, stem: "Give **two** limitations of dot maps for showing population.",
        points: ["Dots may be placed inaccurately within an area / clusters merge and are hard to count.", "Choosing the dot value is difficult: too large hides small settlements, too small crowds the map."],
        modelAnswer: "In crowded areas the dots merge so they are hard to count, and a single dot value cannot show both small villages and large towns well.",
        explanation: "Dot maps are good for pattern, weaker for exact values.",
      }),
    ],
    explanation: "This item practises using a dot map.",
  });

  b.card("DEFINITION", "Population distribution", "The way people are spread over an area: where they live and where they do not.");
  b.card("DEFINITION", "Population density", "Average number of people per km²: population ÷ area.");
  b.card("CONCEPT", "Physical factors for dense population", "Moderate climate, reliable rain, fertile soils, lowland or gentle plateau, water, few disease vectors.");
  b.card("CONCEPT", "Human factors for dense population", "Jobs, industry, mining, transport, services, capital cities, irrigation, historical land policy.");
  b.card("FACT", "Dense areas of Zimbabwe", "Harare, Bulawayo and other towns; the highveld; the Eastern Highlands; many communal areas; Lowveld irrigated estates.");
  b.card("FACT", "Sparse areas of Zimbabwe", "Zambezi valley, most of the Lowveld, national parks (Hwange, Gonarezhou), ranching areas.");
  b.card("FACT", "World population distribution", "Dense: South and East Asia, Western Europe, NE USA. Sparse: deserts, polar lands, high mountains, rainforests.");
  b.card("VOCABULARY", "Choropleth and dot maps", "Choropleth: areas shaded by density category. Dot map: each dot = a set number of people.");
  b.card("FACT", "Zimbabwe's density", "About 15.2 million people (2022) on about 390,000 km²: about 39 people per km² (approximate).");
});
