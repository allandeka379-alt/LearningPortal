// Slice G1b: exam-format items — ZIMSEC Paper 2 Section A (ecosystems) x1; Cambridge Paper 1 topic 3 (Changing
// ecosystems) x2. Types, marks and applies are fixed by the brief: STRUCTURED, 25 marks.
import { concept, P, geographyLevels, ZIM, CAM } from "../lib.mjs";

concept("geo.ecosystems.savanna-desert", { file: "exam/zim-p2-a-ecosystems", keyPrefix: "exam.zim-p2-a-ecosystems", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", secs: 2100, examStyle: true, paper: "Paper 2", applies: ZIM,
    concepts: ["geo.ecosystems.savanna-desert", "geo.ecosystems.components", "geo.ecosystems.soils"],
    stem: "A Form 4 class surveyed vegetation along an 800 m transect running from a protected miombo woodland into a communal grazing area that is burned every dry season (fictional data). At each site they counted trees in a 10 m by 10 m quadrat and estimated grass cover and bare ground.\n\nTable 1: vegetation survey results.\n\n| Site | Distance from start (m) | Trees per 100 m² | Grass cover (%) | Bare ground (%) |\n| --- | --- | --- | --- | --- |\n| 1 (protected woodland) | 0 | 18 | 85 | 5 |\n| 2 | 200 | 15 | 80 | 8 |\n| 3 | 400 | 9 | 60 | 25 |\n| 4 | 600 | 4 | 35 | 50 |\n| 5 (grazing area) | 800 | 2 | 20 | 70 |",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Miombo woodland belongs to which biome?",
        options: [
          ["Savanna (tropical continental)", "Correct: deciduous woodland with a long dry season."],
          ["Tropical rainforest", "Rainforest needs rain in every month."],
          ["Hot desert", "Miombo areas receive far more rain than a desert."],
          ["Temperate grassland", "Temperate grasslands lie in mid-latitudes."],
        ],
        answer: "A",
        explanation: "Miombo is a deciduous savanna woodland of Zimbabwe's higher plateau.",
      }),
      P.num({
        label: "(b)",
        marks: 2,
        stem: "Calculate the percentage decrease in the number of trees from Site 1 to Site 5. Give your answer to one decimal place.",
        value: 88.9, tol: 0.05, unit: "%", answer: "88.9",
        explanation: "Decrease = 18 − 2 = 16; $16 \\div 18 \\times 100 = 88.9\\%$.",
      }),
      P.num({
        label: "(c)",
        marks: 1,
        stem: "Calculate the mean grass cover for the five sites.",
        value: 56, unit: "%",
        explanation: "$(85 + 80 + 60 + 35 + 20) \\div 5 = 280 \\div 5 = 56\\%$.",
      }),
      P.manual({
        label: "(d)",
        marks: 3,
        stem: "Describe the changes in vegetation and ground cover along the transect.",
        points: [
          "Tree numbers fall from 18 to 2 per 100 m²",
          "Grass cover falls from 85% to 20%",
          "Bare ground increases from 5% to 70%, with the biggest change between Sites 2 and 4",
        ],
        modelAnswer: "Moving from the woodland into the grazing area, trees fall from 18 to 2 per 100 m² and grass cover falls from 85% to 20%, while bare ground rises from 5% to 70%. The sharpest change is between Sites 2 and 4.",
      }),
      P.manual({
        label: "(e)",
        marks: 4,
        stem: "Explain **two** ways in which miombo trees are adapted to the long dry season and to fire.",
        points: [
          "Deciduous: shed leaves in the dry season",
          "Reduces water loss by transpiration when soil water is scarce",
          "Thick, corky bark",
          "Insulates the living tissue so trees survive dry-season fires (or: deep roots reach water lower in the soil)",
        ],
        modelAnswer: "Miombo trees are deciduous: they drop their leaves in the dry season, which cuts water loss by transpiration. They have thick, corky bark that insulates the living tissue, so they survive the grass fires of the dry season.",
      }),
      P.short({
        label: "(f)",
        stem: "Name the process by which heavy rain washes nutrients down through bare soil, out of reach of plant roots.",
        accepted: ["leaching"],
        wrong: ["gleying"],
        explanation: "Leaching removes soluble nutrients downwards through the soil.",
      }),
      P.manual({
        label: "(g)",
        marks: 3,
        stem: "For the protected woodland at Site 1, identify **one** input, **one** process and **one** output.",
        points: [
          "Input, e.g. sunlight / rainfall / nutrients from weathered rock",
          "Process, e.g. photosynthesis / decomposition of leaf litter / browsing",
          "Output, e.g. water vapour by evapotranspiration / oxygen / runoff",
        ],
        modelAnswer: "Input: rainfall in the wet season. Process: decomposition of leaf litter by termites and fungi. Output: water vapour by evapotranspiration.",
      }),
      P.match({
        label: "(h)",
        stem: "Match each human activity to its most likely effect at Site 5.",
        pairs: [
          ["Overgrazing", "grass eaten down and trampled, exposing soil"],
          ["Burning every dry season", "tree seedlings killed and litter destroyed"],
        ],
        explanation: "Overgrazing removes grass cover; frequent burning kills seedlings and destroys litter that would protect and feed the soil.",
      }),
      P.manual({
        label: "(i)",
        type: "EXTENDED_RESPONSE",
        marks: 8,
        stem: "With reference to Zimbabwe, explain how human activities such as grazing, burning and woodcutting change savanna ecosystems, and evaluate ways of managing them.",
        points: [
          "Overgrazing removes grass cover and compacts soil, leading to erosion and bush encroachment",
          "Frequent or late-season burning kills seedlings and trees and destroys litter and soil organic matter",
          "Woodcutting for firewood and clearing for fields removes trees around settlements and growth points",
          "Effects on soil and water: bare ground, leaching, gullies, siltation of rivers and dams",
          "Management: controlled stocking / rotational grazing, with a strength or limitation",
          "Management: fireguards and early controlled burning, with a strength or limitation",
          "Management: woodlots, efficient stoves, protected areas or CAMPFIRE-type benefit sharing, with a strength or limitation",
          "Judgement on which approach is most effective and why",
        ],
        levels: geographyLevels(8),
        modelAnswer: "In many communal areas of Zimbabwe, more cattle graze the same land each year. Grass is eaten down and trampled, the soil is compacted and exposed, and rain washes it away, cutting gullies and silting dams; unpalatable shrubs may spread. Burning every dry season, especially late in the season, kills tree seedlings and destroys litter, so organic matter and nutrients are lost and the bare soil is leached. Woodcutting for firewood and clearing for fields removes the miombo trees around villages. Rotational grazing and keeping stock within carrying capacity let grass recover, but families value cattle and may resist reducing herds. Fireguards and early, controlled burning prevent hot late fires, but they need community cooperation. Woodlots and efficient stoves reduce cutting, while benefit-sharing schemes such as CAMPFIRE give people a reason to keep woodland. The most effective approach combines these, because grazing, fire and woodcutting act together; controlling grazing is the most important, since grass cover protects the soil.",
      }),
    ],
    hints: ["Use the figures in Table 1.", "Link each human activity to its effect on vegetation and soil."],
    explanation: "The question links savanna characteristics, ecosystem components and soils to human impacts and management, as in ZIMSEC Paper 2 Section A.",
  });
});

concept("geo.ecosystems.antarctic", { file: "exam/cam-p1-ecosystems", keyPrefix: "exam.cam-p1-ecosystems", applies: CAM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", secs: 2100, examStyle: true, paper: "Paper 1", applies: CAM,
    concepts: ["geo.ecosystems.antarctic", "geo.ecosystems.antarctic-threats"],
    stem: "Table 1 shows changes at a fictional Adélie penguin colony on the Antarctic Peninsula (fictional data).\n\n| Year | 1990 | 2000 | 2010 | 2020 |\n| --- | --- | --- | --- | --- |\n| Days of sea-ice cover near the colony | 160 | 140 | 115 | 95 |\n| Breeding pairs of Adélie penguins | 12,400 | 10,900 | 8,300 | 6,200 |",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Almost all of Antarctica lies south of which line of latitude?",
        options: [
          ["The Antarctic Circle", "Correct: about 66.5° S."],
          ["The Tropic of Capricorn", "The Tropic of Capricorn is at about 23.5° S, crossing southern Africa."],
          ["The equator", "The equator is at 0°."],
          ["The Arctic Circle", "The Arctic Circle is in the northern hemisphere."],
        ],
        answer: "A",
        explanation: "Antarctica lies almost entirely south of the Antarctic Circle, about 66.5° S.",
      }),
      P.num({
        label: "(b)",
        marks: 2,
        stem: "Calculate the percentage decrease in breeding pairs from 1990 to 2020.",
        value: 50, unit: "%",
        explanation: "Decrease = 12,400 − 6,200 = 6,200; $6\\,200 \\div 12\\,400 \\times 100 = 50\\%$.",
      }),
      P.manual({
        label: "(c)",
        marks: 3,
        stem: "Describe the relationship between sea-ice cover and the number of breeding pairs shown in Table 1.",
        points: [
          "Positive relationship: as sea-ice days fall, breeding pairs fall",
          "Uses paired figures, e.g. 160 days and 12,400 pairs in 1990; 95 days and 6,200 pairs in 2020",
          "Both decline in every decade / the fastest fall in pairs is 2000-2010 (2,600)",
        ],
        modelAnswer: "There is a positive relationship: both fell every decade. In 1990 there were 160 days of sea ice and 12,400 pairs; by 2020 only 95 days and 6,200 pairs. The largest fall in pairs was between 2000 and 2010.",
      }),
      P.manual({
        label: "(d)",
        marks: 4,
        stem: "Explain **two** characteristics of the climate of Antarctica.",
        points: [
          "Very cold",
          "Because of the low sun angle / long polar night / high albedo / high altitude",
          "Very dry (polar desert) / very windy",
          "Because cold, sinking air under high pressure holds little moisture / katabatic winds flow off the ice sheet",
        ],
        modelAnswer: "Antarctica is extremely cold because the sun is always low in the sky and snow and ice reflect most of its energy. It is also very dry, because cold air holds little moisture and sinks under high pressure, so few clouds form.",
      }),
      P.manual({
        label: "(e)",
        marks: 4,
        stem: "Using Table 1, explain how a change in an abiotic factor can affect animals in the Antarctic food web.",
        points: [
          "Less sea ice (abiotic) means less ice algae / habitat for krill in winter",
          "So krill numbers fall",
          "Penguins depend on krill for food",
          "So fewer penguins breed successfully / numbers fall; seals and whales are also affected",
        ],
        modelAnswer: "Fewer days of sea ice mean less algae growing under the ice, which young krill feed on in winter, so krill numbers fall. Adélie penguins feed mainly on krill, so with less food fewer pairs breed successfully, as the fall from 12,400 to 6,200 pairs suggests. Seals and whales that eat krill are affected in the same way.",
      }),
      P.manual({
        label: "(f)",
        marks: 4,
        stem: "Describe **two** ways in which animals are adapted to the Antarctic environment.",
        points: [
          "A named adaptation, e.g. blubber / dense waterproof feathers or fur",
          "How it helps, e.g. insulation against extreme cold",
          "A second adaptation, e.g. emperor penguins huddle / migration north in winter / antifreeze proteins in fish",
          "How it helps, e.g. reduces heat loss to the wind / avoids winter darkness and food shortage / stops blood freezing",
        ],
        modelAnswer: "Seals and whales have a thick layer of blubber that insulates them against the cold water. Emperor penguins huddle in large groups in winter, taking turns on the outside, which reduces each bird's heat loss to the wind.",
      }),
      P.manual({
        label: "(g)",
        type: "EXTENDED_RESPONSE",
        marks: 7,
        stem: "Evaluate the strategies used to protect Antarctica from threats such as fishing, tourism and climate change.",
        points: [
          "Antarctic Treaty (1959): peace and science; strength and limitation",
          "Environmental Protocol (1991): mining ban and EIA for all activities",
          "Fishing agreements (CCAMLR): catch limits for krill and toothfish, marine protected areas",
          "Limitation of fishing management: illegal fishing hard to police in a huge ocean",
          "Tourism guidelines: limits ashore, distances from wildlife; voluntary, numbers growing",
          "Climate change cannot be controlled by Antarctic agreements; needs global emissions cuts",
          "Overall judgement: effective for local activities, weak against global threats",
        ],
        levels: geographyLevels(7),
        modelAnswer: "The Antarctic Treaty of 1959 has kept the continent for peace and science, and the 1991 Environmental Protocol bans mining and requires an environmental impact assessment for every activity, so no commercial mining has taken place. CCAMLR sets catch limits for krill and toothfish and has created large marine protected areas, although illegal fishing is hard to police across such a huge ocean. Tourism guidelines limit how many people land at once and how close they go to wildlife, but they are voluntary and visitor numbers keep rising. None of these measures can stop climate change, which is reducing sea ice and, as Table 1 suggests, affecting penguins. Overall the strategies are very effective for activities in Antarctica, but protecting it from climate change depends on global cuts in emissions.",
      }),
    ],
    hints: ["Compare the two rows of Table 1 decade by decade."],
    explanation: "A Cambridge Paper 1 topic 3 question on the Antarctic ecosystem and its management.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", secs: 2100, examStyle: true, paper: "Paper 1", applies: CAM,
    concepts: ["geo.ecosystems.rainforest", "geo.ecosystems.rainforest-threats"],
    stem: "Table 1 shows land use in a fictional rainforest region in an LIC (fictional data).\n\n| Land use (% of area) | 1985 | 1995 | 2005 | 2015 |\n| --- | --- | --- | --- | --- |\n| Rainforest | 92 | 81 | 66 | 58 |\n| Cattle pasture | 5 | 13 | 22 | 25 |\n| Crops (e.g. soya) | 2 | 4 | 9 | 13 |\n| Other (roads, mines, settlements) | 1 | 2 | 3 | 4 |",
    parts: [
      P.num({
        label: "(a)",
        marks: 1,
        stem: "By how many percentage points did rainforest cover fall between 1985 and 2015?",
        value: 34,
        explanation: "$92 - 58 = 34$ percentage points.",
      }),
      P.manual({
        label: "(b)",
        marks: 3,
        stem: "Describe the changes in land use shown in Table 1.",
        points: [
          "Rainforest fell in every period, from 92% to 58%",
          "Cattle pasture increased most, from 5% to 25%",
          "Crops increased from 2% to 13% and other uses from 1% to 4%",
        ],
        modelAnswer: "Rainforest fell steadily from 92% to 58%. Most of the cleared land became cattle pasture, which rose from 5% to 25%, while crops rose from 2% to 13% and roads, mines and settlements from 1% to 4%.",
      }),
      P.mcq({
        label: "(c)",
        stem: "Which layer of the rainforest forms a dense, continuous roof about 25-40 m above the ground?",
        options: [
          ["Canopy", "Correct: most leaves, flowers, fruit and animals."],
          ["Emergents", "Emergents are scattered tall trees above the canopy."],
          ["Shrub layer", "The shrub layer is low and shaded."],
          ["Forest floor", "The floor is at ground level and very dim."],
        ],
        answer: "A",
        explanation: "The canopy is the continuous layer of tree crowns, roughly 25-40 m up.",
      }),
      P.manual({
        label: "(d)",
        marks: 3,
        stem: "Explain why the equatorial climate has heavy rainfall throughout the year.",
        points: [
          "High sun angle all year heats the ground strongly",
          "Warm, moist air rises by convection (low pressure, ITCZ)",
          "It cools and condenses into cumulonimbus clouds, giving heavy afternoon rain",
        ],
        modelAnswer: "The sun is high in the sky all year, so the ground is strongly heated. Warm, moist air rises by convection in the low-pressure zone, cools and condenses into cumulonimbus clouds that give heavy rain most afternoons.",
      }),
      P.manual({
        label: "(e)",
        marks: 4,
        stem: "Explain **two** ways in which rainforest plants are adapted to their environment.",
        points: [
          "A named adaptation, e.g. drip tips / buttress roots / lianas / epiphytes / large leaves in the shrub layer",
          "How it helps, e.g. sheds heavy rain so fungi do not grow / supports tall trees in shallow soil",
          "A second adaptation",
          "How it helps, e.g. reaches light in the canopy / catches weak light",
        ],
        modelAnswer: "Many leaves have drip tips that shed heavy rain quickly, so fungi and algae cannot grow on them. Tall trees have buttress roots that support them in the shallow soil.",
      }),
      P.manual({
        label: "(f)",
        marks: 4,
        stem: "Describe **two** global impacts of the changes shown in Table 1.",
        points: [
          "Release of carbon dioxide by burning and decay",
          "Contributes to climate change / fewer trees absorb carbon",
          "Loss of biodiversity / species extinction",
          "Loss of potential medicines, foods and genetic resources for the world / changes to rainfall patterns",
        ],
        modelAnswer: "Burning and clearing the forest releases stored carbon as carbon dioxide, adding to global climate change. Many species lose their habitat and may become extinct, so the world loses potential medicines and foods.",
      }),
      P.manual({
        label: "(g)",
        marks: 2,
        stem: "Suggest why some cleared land becomes unsuitable for farming after only a few years.",
        points: [
          "Leaf fall stops, so the nutrient cycle is broken / nutrients were stored in the biomass",
          "Heavy rain leaches and erodes the exposed soil",
        ],
        modelAnswer: "Most nutrients were stored in the trees, so once they are removed the soil gets no new leaf litter, and heavy rain leaches and erodes the exposed soil.",
      }),
      P.manual({
        label: "(h)",
        type: "EXTENDED_RESPONSE",
        marks: 7,
        stem: "For a named area of tropical rainforest, describe the threats it faces and evaluate how it is being managed. (Detailed specific example.)",
        points: [
          "Names and locates the area (e.g. the Brazilian Amazon; states such as Pará or Mato Grosso)",
          "Specific threats, e.g. cattle ranching (largest), soya, roads such as the Trans-Amazonian Highway",
          "Further threats, e.g. mining (Carajás), HEP (Belo Monte on the Xingu), logging",
          "Management strategy explained, e.g. protected areas and indigenous territories / Forest Code legal reserve",
          "Further strategy, e.g. satellite monitoring and enforcement / Soy Moratorium / Amazon Fund",
          "Evidence of success or failure, e.g. clearance fell sharply after the mid-2000s and later rose again",
          "Judgement on the effectiveness of management",
        ],
        levels: geographyLevels(7),
        modelAnswer: "In the Brazilian Amazon, in states such as Pará and Mato Grosso, the largest threat is cattle ranching, followed by soya farming. Roads such as the Trans-Amazonian Highway opened the forest to settlers, the Carajás area has a huge iron-ore mine, and the Belo Monte dam on the Xingu River flooded forest. Management includes national parks and indigenous territories, the Forest Code, which requires landowners to keep much of their land forested, satellite monitoring that directs enforcement teams to new clearings, and the Soy Moratorium, under which traders refuse soya from newly cleared land. When these worked together after the mid-2000s, the annual rate of clearance fell sharply, but it rose again when enforcement weakened. Management can be effective, but only with consistent enforcement and when local people and global buyers benefit from keeping the forest.",
      }),
    ],
    hints: ["Compare the first and last columns of Table 1.", "Use named places and schemes in the extended answer."],
    explanation: "A Cambridge Paper 1 topic 3 question on the rainforest ecosystem, deforestation and its management, ending with a detailed specific example.",
  });
});
