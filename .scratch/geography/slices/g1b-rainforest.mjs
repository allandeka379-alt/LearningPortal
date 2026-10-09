// Slice G1b: ecosystems — the tropical rainforest ecosystem (ZIMSEC 7.3.3; Cambridge 3.3).
import { concept, P, geographyLevels, CAM } from "../lib.mjs";

const STATION =
  "Table 1: climate data for a fictional lowland station at 2° S (fictional data).\n\n| Month | J | F | M | A | M | J | J | A | S | O | N | D |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| Temperature (°C) | 26.4 | 26.8 | 27.1 | 27.0 | 26.6 | 25.9 | 25.3 | 25.6 | 26.1 | 26.5 | 26.7 | 26.5 |\n| Rainfall (mm) | 265 | 230 | 305 | 275 | 210 | 145 | 95 | 115 | 190 | 245 | 285 | 270 |";

concept("geo.ecosystems.rainforest", { file: "ecosystems/rainforest", keyPrefix: "ecosystems.rainforest" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Between which latitudes are most tropical rainforests found?",
    options: [
      ["About 10° N and 10° S of the equator", "Correct: the equatorial belt with no long dry season."],
      ["About 15° and 30° N and S of the equator", "These latitudes are dominated by hot deserts under subtropical high pressure."],
      ["About 40° and 60° N and S", "These are temperate latitudes with deciduous and coniferous forest."],
      ["North of the Arctic Circle", "This is the tundra and ice of high latitudes."],
    ],
    answer: "A",
    explanation: "Tropical rainforests lie mainly within about 10° of the equator, in the Amazon Basin, the Congo Basin and South-East Asia.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which river basin contains the largest area of tropical rainforest in the world?",
    options: [
      ["Amazon", "Correct: the Amazon Basin in South America."],
      ["Congo", "The Congo Basin is the second largest area of rainforest."],
      ["Zambezi", "The Zambezi basin is mainly savanna woodland."],
      ["Nile", "The Nile flows mostly through savanna and desert."],
    ],
    answer: "A",
    explanation: "The Amazon Basin holds the largest rainforest; the Congo Basin in central Africa is the second largest.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do temperatures in the equatorial climate stay high in every month?",
    options: [
      ["The midday sun is high in the sky all year", "Correct: insolation is strong in every month."],
      ["Cold ocean currents flow along the coasts", "Cold currents lower temperatures; they do not raise them."],
      ["The land is high above sea level", "Most rainforest is lowland; height would lower temperatures."],
      ["Dry air allows strong heating at night", "The air is humid and cloudy, not dry."],
    ],
    answer: "A",
    explanation: "Near the equator the sun is high at midday throughout the year and overhead twice a year, so insolation, and therefore temperature, stays high in every month.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What type of rainfall gives most of the heavy afternoon storms in the rainforest?",
    options: [
      ["Convectional", "Correct: strong heating makes moist air rise, cool and condense."],
      ["Relief (orographic)", "Relief rain needs air forced over mountains; most rainforest is lowland."],
      ["Frontal", "Frontal rain forms where warm and cold air masses meet in mid-latitude depressions."],
      ["Cyclonic from tropical storms", "Tropical cyclones rarely form within about 5° of the equator."],
    ],
    answer: "A",
    explanation: "Morning sunshine heats the ground; hot, moist air rises, cools and condenses into cumulonimbus clouds, giving heavy afternoon rain and thunder.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which layer of the rainforest forms a dense, continuous roof and holds most of the forest's animal life?",
    options: [
      ["Canopy", "Correct: the canopy has most leaves, flowers, fruit and animals."],
      ["Emergents", "Emergents are scattered tall trees that rise above the canopy."],
      ["Shrub layer", "The shrub layer is low and dim, below the under-canopy."],
      ["Forest floor", "The floor is very dark and has relatively little plant growth."],
    ],
    answer: "A",
    explanation: "The canopy, roughly 25-40 m up, is a continuous layer of crowns where most photosynthesis takes place and most animals live.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Rainforest vegetation is lush, yet its soils are poor. Which statement best explains this?",
    options: [
      ["Nutrients are stored mainly in the plants and recycled quickly", "Correct: the fast cycle keeps nutrients in the biomass."],
      ["The soils are fertilised each year by river floods", "Most rainforest soils are not on floodplains."],
      ["Heavy daily rain adds nutrients faster than plants can use them", "Heavy rain leaches nutrients away rather than adding them."],
      ["The deep leaf litter acts as a store of fertility", "Litter decomposes within weeks, so the layer is thin."],
    ],
    answer: "A",
    hints: ["Where is most of the nutrient store in a rainforest?", "Think about how quickly leaves rot."],
    explanation: "Leaves fall all year and decompose quickly in the heat and humidity; shallow roots take the nutrients up at once. Most nutrients are in the biomass, so the leached soil itself is poor.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which adaptation helps a rainforest tree shed heavy rain quickly so that fungi and algae do not grow on its leaves?",
    options: [
      ["Drip tips", "Correct: pointed tips let water run off."],
      ["Buttress roots", "Buttresses support tall trees in shallow soil."],
      ["Thick, corky bark", "Thick bark protects savanna trees from fire; rainforest bark is thin."],
      ["Small, needle-shaped leaves", "Needle leaves reduce water loss in cold or dry climates."],
    ],
    answer: "A",
    hints: ["Which feature is on the leaf itself?"],
    explanation: "Drip tips are pointed leaf ends that channel water off quickly, keeping the leaf surface dry enough to stop fungi and algae growing.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do plants in the shrub layer often have very large, dark green leaves?",
    options: [
      ["To catch as much of the weak light as possible", "Correct: only a few per cent of the light gets through the canopy."],
      ["To store water for the dry season", "There is no long dry season in the rainforest."],
      ["To protect themselves from frequent veld fires", "Fire is rare in undisturbed rainforest."],
      ["To shed snow in the cool season", "It never snows in lowland equatorial forest."],
    ],
    answer: "A",
    explanation: "The canopy blocks most sunlight, so plants near the ground have large leaves with plenty of chlorophyll to trap the little light that reaches them.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Mean monthly temperatures at a fictional station in the Congo Basin (fictional data).\n\n| Month | J | F | M | A | M | J | J | A | S | O | N | D |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| Temperature (°C) | 27.9 | 28.1 | 28.3 | 28.2 | 27.8 | 27.4 | 27.0 | 27.2 | 27.6 | 28.0 | 28.1 | 27.9 |\n\nCalculate the annual temperature range.",
    value: 1.3, tol: 0.05, unit: "°C", answer: "1.3",
    wrong: [28.3, 27.0, 55.3],
    explanation: "Range = highest monthly mean − lowest monthly mean = $28.3 - 27.0 = 1.3$ °C, a typical small equatorial range.",
  });
  b.calc({
    d: 2, skill: "APPLICATION",
    stem: "Mean monthly rainfall at a fictional station in the Amazon Basin (fictional data).\n\n| Month | J | F | M | A | M | J | J | A | S | O | N | D |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| Rainfall (mm) | 310 | 280 | 340 | 300 | 240 | 160 | 120 | 140 | 205 | 260 | 295 | 320 |\n\nCalculate the total annual rainfall.",
    value: 2970, unit: "mm",
    wrong: [2870, 248],
    workedSolution: "1. Add the twelve monthly totals: 310 + 280 + 340 + 300 + 240 + 160 + 120 + 140 + 205 + 260 + 295 + 320.\n2. Total = 2,970 mm.",
    explanation: "The twelve months add up to 2,970 mm, well above the roughly 2,000 mm typical of the equatorial climate.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "Mean monthly temperatures at a fictional rainforest station in Borneo (fictional data).\n\n| Month | J | F | M | A | M | J | J | A | S | O | N | D |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| Temperature (°C) | 24.6 | 24.9 | 25.2 | 25.1 | 24.8 | 24.2 | 23.8 | 24.0 | 24.4 | 24.7 | 25.0 | 24.8 |\n\nCalculate the mean annual temperature. Give your answer to one decimal place.",
    value: 24.6, tol: 0.05, unit: "°C", answer: "24.6",
    wrong: [24.5, 295.5],
    hints: ["Add the twelve monthly temperatures.", "Divide by 12."],
    workedSolution: "1. Sum of the monthly means = 295.5 °C.\n2. Mean = $295.5 \\div 12 = 24.625$ °C.\n3. To one decimal place: 24.6 °C.",
    explanation: "$295.5 \\div 12 = 24.625$, which rounds to 24.6 °C.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The equatorial climate has a long, clear dry season each year.",
    answer: false,
    explanation: "False. Rain falls in every month; a long dry season is a feature of the savanna climate.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each rainforest plant feature to how it helps the plant.",
    pairs: [
      ["Buttress roots", "support a tall tree in shallow soil"],
      ["Drip tip", "sheds heavy rain from the leaf"],
      ["Liana", "climbs from the ground to reach the light"],
      ["Epiphyte", "perches on branches high in the canopy"],
    ],
    explanation: "Buttresses give support; drip tips shed water; lianas climb from the ground; epiphytes grow on other plants to reach light without roots in the soil.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Heavy rainfall washes nutrients down through rainforest soils in a process called {{blank:a}}, and the red colour of the soil comes from {{blank:b}} oxides left behind.",
    blanks: [
      { id: "a", accepted: ["leaching"], wrong: "gleying" },
      { id: "b", accepted: ["iron"], wrong: "calcium" },
    ],
    explanation: "Leaching removes soluble nutrients; iron (and aluminium) oxides stay behind, giving latosols their red colour.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the farming system in which indigenous rainforest people clear and burn a small plot, farm it for a few years and then move on.",
    accepted: ["shifting cultivation", "slash and burn", "slash-and-burn", "slash and burn cultivation", "slash-and-burn cultivation", "slash and burn farming", "slash-and-burn farming", "shifting agriculture"],
    wrong: ["plantation farming"],
    explanation: "**Shifting cultivation** (slash and burn) is sustainable at low population densities because the forest has time to regrow.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why rainforest soils quickly become infertile when the forest is cleared.",
    points: [
      "Leaf fall stops, so no new nutrients are added to the soil",
      "Heavy rain leaches the remaining nutrients out of reach of roots",
      "Bare soil is eroded by runoff, removing the thin topsoil",
    ],
    hints: ["Where were the nutrients stored before clearance?"],
    modelAnswer: "Most nutrients were held in the trees, so once they are removed there is no leaf litter to replace them. Heavy rain then leaches the remaining nutrients downwards, and runoff on the bare ground erodes the thin topsoil.",
    explanation: "Clearing breaks the fast nutrient cycle; leaching and erosion then remove what fertility is left.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4, applies: CAM,
    stem: "Explain **two** links between abiotic and biotic factors in a tropical rainforest.",
    points: [
      "An abiotic factor, e.g. high temperature and rainfall all year",
      "Linked to a biotic response, e.g. continuous plant growth / evergreen forest",
      "A second abiotic factor, e.g. heavy rain causing leaching / low light on the forest floor",
      "Linked to a biotic response, e.g. nutrients held in biomass with shallow roots / large leaves in the shrub layer",
    ],
    hints: ["Pick a feature of the climate or soil, then say how living things respond to it."],
    modelAnswer: "High temperatures and rain in every month mean plants can grow all year, so the forest is evergreen and dense. Heavy rain leaches the soil, so trees keep nutrients in their own biomass and have shallow roots that take up nutrients as soon as litter decays.",
    explanation: "Each link names an abiotic factor and explains how plants or animals respond, or how the living forest changes the abiotic environment.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 660,
    stem: STATION,
    parts: [
      P.short({
        label: "(a)",
        stem: "Name the driest month.",
        accepted: ["July", "Jul"],
        wrong: ["March"],
        explanation: "July has the lowest rainfall, 95 mm.",
      }),
      P.num({
        label: "(b)",
        marks: 1,
        stem: "How many months have less than 100 mm of rain?",
        value: 1,
        explanation: "Only July (95 mm) is below 100 mm.",
      }),
      P.manual({
        label: "(c)",
        marks: 3,
        stem: "Describe the main features of the climate shown in Table 1.",
        points: [
          "High temperatures all year, about 25-27 °C",
          "Very small annual range (1.8 °C)",
          "Heavy rainfall (2,630 mm), with rain in every month and a slightly drier period around July",
        ],
        modelAnswer: "Temperatures are high all year, between 25.3 and 27.1 °C, so the range is only 1.8 °C. Rainfall is heavy at 2,630 mm and falls in every month, although June to August are a little drier.",
      }),
      P.manual({
        label: "(d)",
        marks: 3,
        stem: "Explain why rain falls in most afternoons at this station.",
        points: [
          "Strong morning heating of the ground by the high sun",
          "Warm, moist air rises (convection) and cools",
          "Water vapour condenses into cumulonimbus clouds, giving afternoon storms",
        ],
        modelAnswer: "The high sun heats the ground strongly during the morning. Warm, moist air rises by convection, cools and condenses to form cumulonimbus clouds, which release heavy rain and thunderstorms in the afternoon.",
      }),
    ],
    hints: ["Use figures from the table in (c)."],
    explanation: "The table shows a classic equatorial climate: hot, wet, small range, and convectional rain in every month.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 600,
    stem: "Read this description of a cross-section through a rainforest (fictional study).\n\n*Layer V: scattered giant trees reaching 55 m, in full sun and wind. Layer W: a dense roof of crowns from 25 m to 40 m, full of fruit, birds and monkeys. Layer X: young trees 10-20 m tall in deep shade. Layer Y: shrubs and saplings up to 6 m with very large leaves. Layer Z: dim and humid, with a thin layer of rotting leaves and many fungi.*",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which layer is the emergent layer?",
        options: [
          ["V", "Correct: scattered giant trees above the canopy."],
          ["W", "W is the continuous canopy."],
          ["X", "X is the under-canopy."],
          ["Y", "Y is the shrub layer."],
        ],
        answer: "A",
        explanation: "Emergents are the scattered tallest trees that rise above the canopy, here layer V.",
      }),
      P.manual({
        label: "(b)",
        marks: 2,
        stem: "Suggest why most animals live in layer W.",
        points: [
          "Most food is there: fruit, flowers, leaves and insects",
          "It receives the most light, so photosynthesis and plant growth are greatest / gives shelter from predators",
        ],
        modelAnswer: "Layer W is the canopy, where most sunlight is caught, so it has the most leaves, flowers and fruit for animals to eat.",
      }),
      P.manual({
        label: "(c)",
        marks: 3,
        stem: "Explain why the leaf layer in Z is thin even though leaves fall all year.",
        points: [
          "Hot, humid conditions favour decomposers (bacteria, fungi, termites)",
          "So leaves decompose very quickly, within weeks",
          "And the released nutrients are taken up at once by shallow roots",
        ],
        modelAnswer: "The forest floor is hot and humid, ideal for fungi, bacteria and termites, so fallen leaves rot within weeks and their nutrients are taken up immediately by shallow roots. The litter never builds up.",
      }),
    ],
    hints: ["Emergents rise above the canopy."],
    explanation: "Linking each layer to its light and humidity conditions explains where animals live and why litter is thin.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "\"In the tropical rainforest, climate is the most important factor controlling the ecosystem.\" To what extent do you agree?",
    points: [
      "High temperatures and rainfall all year allow continuous growth and an evergreen forest",
      "Climate drives fast decomposition and the rapid nutrient cycle",
      "Heavy rain causes leaching, so soils are poor and nutrients are held in biomass",
      "Biotic factors also control conditions: the canopy shades the floor and keeps it humid, shaping lower layers",
      "People change the ecosystem (shifting cultivation at low density is sustainable; large-scale clearance changes it)",
      "A reasoned conclusion, e.g. climate sets the conditions, but plants and people shape how the ecosystem works",
    ],
    levels: geographyLevels(6),
    hints: ["Consider climate, soil, the vegetation itself and people."],
    wordLimit: { max: 300 },
    modelAnswer: "Climate is the starting point. Temperatures of about 27 °C and over 2,000 mm of rain in every month allow plants to grow all year, so the forest is evergreen and dense. The heat and humidity make decomposers work fast, giving a rapid nutrient cycle, while heavy rain leaches the soil, so nutrients are held in the biomass. However, the vegetation also controls conditions: the canopy blocks most light and keeps the floor humid, which decides what can grow in the lower layers. People matter too: shifting cultivation at low density lets the forest recover, but large-scale clearance destroys the nutrient cycle. I largely agree, because climate sets the conditions, but the forest itself and human activity decide how the ecosystem works.",
    explanation: "A strong answer shows how climate drives growth, decomposition and leaching, then weighs it against biotic factors and people before concluding.",
  });
  b.card("DEFINITION", "What is a **biome**?", "A large-scale ecosystem, such as tropical rainforest, savanna or hot desert, defined mainly by its climate and natural vegetation.");
  b.card("FACT", "Where are the three main areas of tropical rainforest?", "The Amazon Basin (largest), the Congo Basin and South-East Asia (e.g. Indonesia, Malaysia).");
  b.card("CONCEPT", "Key features of the equatorial climate", "About 26-28 °C all year, small annual range (2-3 °C), over about 2,000 mm of rain, no real dry season, high humidity.");
  b.card("CONCEPT", "Why does it rain most afternoons in the rainforest?", "Strong heating makes moist air rise by convection; it cools and condenses into cumulonimbus clouds that give afternoon storms.");
  b.card("VOCABULARY", "The five rainforest layers (top to bottom)", "Emergents, canopy, under-canopy, shrub layer, forest floor.");
  b.card("CONCEPT", "Why are rainforest soils infertile?", "Heavy rain leaches nutrients; most nutrients are held in the biomass and recycled quickly, so the soil itself is poor.");
  b.card("VOCABULARY", "Buttress roots and drip tips", "Buttresses: plank-like roots that support tall trees in shallow soil. Drip tips: pointed leaf ends that shed rain.");
  b.card("VOCABULARY", "Lianas and epiphytes", "Lianas: woody climbers rooted in the ground. Epiphytes: plants such as orchids that grow on branches for support.");
  b.card("CONCEPT", "Why is shifting cultivation sustainable at low density?", "Plots are small and are left for many years, so the forest regrows and the soil recovers.");
});
