// Slice G3c: Zimbabwe's natural (agro-ecological) regions (ZIMSEC 7.9.3).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.agriculture.natural-regions", { file: "agriculture/natural-regions", keyPrefix: "agriculture.natural-regions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which natural region covers the **Eastern Highlands** around Nyanga and Chimanimani?",
    options: [
      ["Region I", "Correct: Region I is the high-rainfall Eastern Highlands."],
      ["Region IIb", "Region IIb is part of the highveld with less reliable rain."],
      ["Region IV", "Region IV is a dry, drought-prone region in the south and west."],
      ["Region V", "Region V is the hot, dry Zambezi valley and Lowveld."],
    ],
    answer: "A",
    explanation: "Region I receives more than about 1,000 mm a year and suits tea, coffee, fruit and forestry.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which type of farming is best suited to **Region V**?",
    options: [
      ["Extensive cattle and game ranching", "Correct: rain is too low and erratic for reliable rain-fed crops."],
      ["Intensive rain-fed tobacco growing", "Tobacco needs the reliable rain of Region II (or irrigation)."],
      ["Tea and coffee plantations", "These need the high rainfall of Region I."],
      ["Dairy farming on planted pastures", "Dairying is concentrated in the wetter Regions I and II."],
    ],
    answer: "A",
    explanation: "Region V is suited to extensive ranching and, where dams provide water, irrigated sugar cane.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main difference between Region **IIa** and Region **IIb**?",
    options: [
      ["IIb has less reliable rain, with more severe dry spells", "Correct: totals are similar, but IIb is less reliable."],
      ["IIb receives much more rain than IIa", "Their mean totals are similar."],
      ["IIa is in the Lowveld while IIb is in the highveld", "Both are in the highveld."],
      ["IIa is used only for cattle ranching", "IIa is the most intensive cropping area."],
    ],
    answer: "A",
    explanation: "Reliability, not the total, separates IIa from IIb.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are sorghum and millets recommended in **Region IV**?",
    options: [
      ["They tolerate drought better than maize", "Correct: small grains survive dry spells that ruin maize."],
      ["They need more rain than maize", "They need less, which is why they suit dry regions."],
      ["They grow only on steep mountain slopes", "Small grains are grown on ordinary fields."],
      ["They are mainly grown as export crops", "They are mainly food and fodder crops."],
    ],
    answer: "A",
    explanation: "Region IV has low, unreliable rainfall and frequent droughts, so drought-tolerant crops and livestock are best.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does Region I receive the highest rainfall in Zimbabwe?",
    options: [
      ["Moist air from the east is forced to rise over high mountains", "Correct: relief rain falls as moist south-easterly air rises over the Eastern Highlands."],
      ["It lies at the lowest altitude in the country", "Region I is the highest land, not the lowest."],
      ["It is closest to the Kalahari Desert", "The Kalahari is to the west and is dry."],
      ["Moisture evaporating from Lake Kariba falls there as rain", "Kariba is in the north-west, far from the Eastern Highlands."],
    ],
    answer: "A",
    explanation: "Altitude and position facing the moist easterly air explain the high rainfall.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A fictional station on the southern lowveld has a mean annual rainfall of 360 mm and long droughts. What farming would you advise for most of its land?",
    options: [
      ["Cattle or game ranching, irrigating crops only near dams", "Correct: 360 mm is typical of Region V, too dry for rain-fed cropping."],
      ["Rain-fed maize and tobacco grown across all of the land", "Rain-fed maize and tobacco need about 750 mm or more of reliable rain."],
      ["Tea estates and pine plantations", "These need more than about 1,000 mm."],
      ["Intensive dairy on rain-fed pastures", "Pastures for dairying need much more reliable rain."],
    ],
    answer: "A",
    hints: ["Which region has rainfall well below 450 mm?", "What farming suits that region?"],
    explanation: "Very low, erratic rainfall points to Region V and extensive ranching.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Studies suggest Zimbabwe's drier regions have expanded since the 1960 map was drawn. Which is the **most likely** effect on farmers in areas that have shifted from Region III to Region IV?",
    options: [
      ["Maize fails more often, so small grains and livestock matter more", "Correct: drier conditions make maize riskier."],
      ["They can switch to tea and coffee", "These need much wetter conditions."],
      ["Irrigation is no longer needed anywhere in these newly drier areas", "Drier conditions make irrigation more, not less, valuable."],
      ["Yields of rain-fed maize rise every year", "Less, less reliable rain lowers maize yields."],
    ],
    answer: "A",
    hints: ["Is Region IV wetter or drier than Region III?"],
    explanation: "A shift towards drier conditions demands more drought-tolerant farming and better water management.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which crop is grown on large **irrigated** estates in the Lowveld (Region V)?",
    options: [
      ["Sugar cane", "Correct: sugar cane is irrigated with water from dams such as Lake Mutirikwi."],
      ["Tea", "Tea is grown in Region I in the Eastern Highlands."],
      ["Apples", "Apples need the cool climate of the Eastern Highlands."],
      ["Wattle", "Wattle is a plantation tree of the Eastern Highlands."],
    ],
    answer: "A",
    explanation: "Hot lowveld temperatures plus irrigation water make sugar cane a profitable crop in Region V.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Region II is the main area for intensive maize, tobacco and soya bean production.",
    answer: true,
    explanation: "True. Its reliable rainfall and fertile soils support intensive cropping.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Most of Zimbabwe's land lies in Regions I and II.",
    answer: false,
    explanation: "False. Regions IV and V together cover roughly 60% of the country; Regions I and II are much smaller.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each natural region with the farming system it is suited to.",
    pairs: [
      ["Region I", "Specialised and diversified (tea, fruit, forestry)"],
      ["Region II", "Intensive crops and livestock"],
      ["Region IV", "Semi-extensive livestock and drought-tolerant crops"],
      ["Region V", "Extensive ranching"],
    ],
    explanation: "Farming becomes less intensive as rainfall falls from Region I to Region V.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Region III suffers frequent mid-season {{blank:a}}, so it is suited to {{blank:b}} farming, with livestock and {{blank:c}} crops.",
    blanks: [
      { id: "a", accepted: ["dry spells"], choices: ["dry spells", "frosts", "floods", "cyclones"] },
      { id: "b", accepted: ["semi-intensive"], choices: ["semi-intensive", "specialised", "plantation", "extensive"] },
      { id: "c", accepted: ["drought-tolerant"], choices: ["drought-tolerant", "plantation", "high-altitude", "water-loving"] },
    ],
    explanation: "Region III: semi-intensive farming with livestock, fodder and drought-tolerant crops.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "mm",
    stem: "A fictional station recorded these annual rainfall totals over five years: 820, 760, 930, 690 and 850 mm. Calculate the mean annual rainfall.",
    value: 810, tol: 0.5,
    wrong: [4050, 220],
    explanation: "(820 + 760 + 930 + 690 + 850) ÷ 5 = 4,050 ÷ 5 = 810 mm.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "%",
    stem: "A fictional station has a mean annual rainfall of 600 mm. In a drought year it received 390 mm. By what percentage was that year's rainfall **below** the mean?",
    value: 35, tol: 0.05,
    wrong: [65, 210],
    hints: ["Find the shortfall in mm first.", "Express the shortfall as a percentage of the mean."],
    workedSolution: "1. Shortfall = 600 − 390 = 210 mm.\n2. 210 ÷ 600 × 100 = 35%.",
    explanation: "The drought year was 35% below the mean.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the characteristics of Region I and the farming activities carried out there.",
    points: [
      "High rainfall, more than about 1,000 mm a year, with some rain in most months.",
      "Cool temperatures because of high altitude / found in the Eastern Highlands (Nyanga, Chimanimani, Chipinge).",
      "Specialised crops such as tea, coffee or deciduous fruit (apples).",
      "Forestry (pine, eucalyptus, wattle) / dairy / potatoes.",
    ],
    modelAnswer: "Region I is the Eastern Highlands, with more than about 1,000 mm of rain a year and cool temperatures because of its altitude. Farmers grow tea, coffee and apples, and there are large plantations of pine and eucalyptus, as well as dairy farms.",
    explanation: "Give climate characteristics first, then the farming.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Link rainfall amount and reliability to the risk of crop failure."],
    stem: "Explain why livestock farming is more important than crop farming in Regions IV and V.",
    points: [
      "Rainfall is low and unreliable, with frequent droughts and dry spells.",
      "So rain-fed crops such as maize often fail, making cropping risky.",
      "Cattle and goats can graze natural grassland and browse over large areas, and can be moved or sold in drought.",
    ],
    modelAnswer: "Regions IV and V have low, unreliable rain and frequent droughts, so crops often fail. Cattle and goats can live on natural grazing spread over large areas, and they can be moved or sold in a drought.",
    explanation: "Link climate to the risk of each type of farming.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 660,
    hints: ["Compare the means first, then look at the range for reliability."],
    stem: "Table 1 shows annual rainfall (mm) at two fictional stations over five years (fictional data).\n\n| Year | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|\n| Station S | 880 | 850 | 910 | 840 | 870 |\n| Station T | 1,020 | 610 | 940 | 560 | 1,120 |",
    parts: [
      P.num({ label: "(a)", unit: "mm", stem: "Calculate the mean annual rainfall at Station S.", value: 870, tol: 0.5, wrong: [4350, 70], explanation: "(880 + 850 + 910 + 840 + 870) ÷ 5 = 4,350 ÷ 5 = 870 mm." }),
      P.num({ label: "(b)", unit: "mm", stem: "Calculate the mean annual rainfall at Station T.", value: 850, tol: 0.5, wrong: [4250, 560], explanation: "(1,020 + 610 + 940 + 560 + 1,120) ÷ 5 = 4,250 ÷ 5 = 850 mm." }),
      P.num({ label: "(c)", unit: "mm", stem: "Calculate the range of annual rainfall at Station T.", value: 560, wrong: [70, 1680], explanation: "1,120 − 560 = 560 mm." }),
      P.mcq({
        label: "(d)", stem: "Which station is more likely to be in Region **IIa**?",
        options: [
          ["Station S, because its rainfall is reliable", "Correct: S varies by only 70 mm, while T varies by 560 mm."],
          ["Station T, because it has the highest single total", "One wet year does not make rainfall reliable."],
          ["Station T, because its mean is higher", "T's mean (850 mm) is lower than S's (870 mm)."],
          ["Neither, because both means are below 500 mm", "Both means are well above 500 mm."],
        ],
        answer: "A", explanation: "Similar means, but S is far more reliable, so S fits IIa and T fits IIb.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest how a maize farmer near Station T could reduce the risk of crop failure.",
        points: ["Plant early-maturing or drought-tolerant varieties / small grains.", "Conserve or harvest water (mulching, tied ridges, irrigation from a dam or borehole)."],
        modelAnswer: "Plant a short-season, drought-tolerant maize variety and use mulching or supplementary irrigation in dry years.",
        explanation: "Unreliable rainfall needs risk-reducing strategies.",
      }),
    ],
    explanation: "Use rainfall data to compare amount and reliability and link them to the natural regions.",
  });
  b.struct({
    d: 2, skill: "UNDERSTANDING", secs: 480,
    stem: "A student's sketch map of Zimbabwe's natural regions is described: \"Area 1 is a narrow strip along the eastern border. Area 2 is a broad band across the north-eastern highveld around Harare. Area 3 is a large area of the south and west around Bulawayo. Area 4 is the low land of the Zambezi valley in the north and of the Lowveld in the south-east.\"",
    parts: [
      P.match({
        label: "(a)", stem: "Match each area of the sketch with its natural region.",
        pairs: [["Area 1", "Region I"], ["Area 2", "Region II"], ["Area 3", "Region IV"], ["Area 4", "Region V"]],
        explanation: "East strip = I; north-east highveld = II; south and west = IV; low valleys = V.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Give **two** things the student should add to make the sketch map complete.",
        points: ["A key explaining the shading of each region.", "A title / north arrow / labels for towns, rivers or highlands (any one)."],
        modelAnswer: "A key showing what each shading means, and a title with a north arrow.",
        explanation: "A sketch map needs a title, key, north arrow and labels.",
      }),
    ],
    explanation: "Practise reading and completing a sketch map of the natural regions.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "\"The natural regions map drawn around 1960 is still a reliable guide for farmers in Zimbabwe today.\" Discuss.",
    hints: ["Explain how the map links rainfall to farming.", "Consider how climate change and new technology affect its usefulness."],
    points: [
      "The map links rainfall amount and reliability, temperature and soils to suitable farming; it guides crop choice and advice.",
      "Broad pattern still holds: Eastern Highlands wettest (Region I), Lowveld and Zambezi valley driest (Region V).",
      "It is used to plan extension advice, seed recommendations and drought relief.",
      "But climate change: higher temperatures and changed rainfall have shifted boundaries; drier regions appear to have expanded.",
      "Boundaries are approximate and local conditions (soils, slopes, microclimate) vary within a region.",
      "Irrigation and drought-tolerant varieties now allow farming that the map did not predict (e.g. sugar cane in Region V).",
      "Judgement: still a useful general guide, but it needs updating with recent data and local knowledge.",
    ],
    levels: geographyLevels(7),
    modelAnswer: "The natural regions map is still useful because the broad pattern of rainfall has not changed: the Eastern Highlands remain the wettest area and suit tea and forestry, while the Zambezi valley and Lowveld are still too dry for most rain-fed crops. Extension officers use the regions to recommend seed varieties and to plan drought relief. However, the map is over sixty years old. Studies suggest that rising temperatures and changing rainfall have shifted the boundaries, with the drier Regions IV and V expanding, so farmers following the old map may plant maize where it now often fails. The boundaries were always approximate, and soils and slopes vary within each region. Irrigation also allows sugar cane to be grown in Region V. The map is still a good general guide, but it must be updated with recent climate data and combined with local knowledge.",
    explanation: "Give the map's strengths, its weaknesses and a balanced judgement.",
  });

  b.card("DEFINITION", "**Natural (agro-ecological) region**", "An area with similar rainfall, temperature and soils, suited to similar farming.", "Zimbabwe: Regions I to V (IIa and IIb).");
  b.card("FACT", "Region I", "Eastern Highlands; more than about 1,000 mm; specialised: tea, coffee, fruit, forestry, dairy.", undefined);
  b.card("FACT", "Region II", "Highveld around Harare; about 750–1,000 mm; intensive maize, tobacco, soya, wheat, livestock.", "IIa reliable; IIb more severe dry spells.");
  b.card("FACT", "Region III", "About 650–800 mm with mid-season dry spells; semi-intensive livestock and drought-tolerant crops.", undefined);
  b.card("FACT", "Region IV", "About 450–650 mm, frequent droughts; semi-extensive livestock, sorghum and millets.", undefined);
  b.card("FACT", "Region V", "Below about 450–650 mm; Zambezi valley and Lowveld; extensive ranching; irrigated sugar cane.", undefined);
  b.card("DEFINITION", "**Rainfall reliability**", "How much rainfall varies from year to year and within the season.", undefined);
  b.card("CONCEPT", "Climate change and the regions", "Boundaries appear to have shifted, with drier Regions IV and V expanding.", undefined);
  b.card("FACT", "Share of Regions IV and V", "Together roughly 60% of the country (approximate).", undefined);
});
