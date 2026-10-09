// Slice G1b: ecosystems — wetlands: types, importance, threats and protection (ZIMSEC 7.3.6).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.ecosystems.wetlands", { file: "ecosystems/wetlands", keyPrefix: "ecosystems.wetlands" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which description best defines a **wetland**?",
    options: [
      ["Land covered by shallow water or with saturated soil for all or part of the year", "Correct: saturation for at least part of the year is the key feature."],
      ["Any area that receives more than 1,000 mm of rain in a year", "High rainfall alone does not make a wetland; well-drained land can be wet only briefly."],
      ["A deep lake that holds open water all year round, even in a severe drought year", "Deep open water is a lake, not a wetland; wetlands are shallow or waterlogged."],
      ["A river channel that flows only in the rainy season", "That is a seasonal (ephemeral) river, not a wetland."],
    ],
    answer: "A",
    explanation: "A wetland has shallow water or waterlogged soil for all or part of the year, and plants and animals adapted to wet conditions. A vlei can look like dry grassland yet still be a wetland.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the usual Zimbabwean name for a shallow, grassy, seasonally waterlogged hollow at the head of a stream?",
    options: [
      ["Vlei", "Correct: called a dambo in Zambia and Malawi."],
      ["Kopje", "A kopje is a small rocky hill, often a granite outcrop."],
      ["Donga", "A donga is a deep gully cut by erosion."],
      ["Pan", "A pan is a shallow closed depression, common in dry areas such as parts of Hwange."],
    ],
    answer: "A",
    explanation: "A vlei (dambo) is a grassy, seasonally waterlogged depression, usually at the source or along the upper course of a stream.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does a vlei help a stream keep flowing in the dry season?",
    options: [
      ["It stores rainwater in its soil and releases it slowly", "Correct: the vlei acts like a sponge."],
      ["It increases the rainfall over the catchment", "Wetlands do not noticeably increase rainfall."],
      ["It speeds up surface runoff into the stream after storms", "A vlei slows runoff down; it does not speed it up."],
      ["It stops all evaporation from the catchment", "Water still evaporates from a vlei and its plants transpire."],
    ],
    answer: "A",
    explanation: "Rain soaks into the vlei in the wet season and seeps out slowly for months afterwards, so the stream below keeps flowing after the rains end.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a benefit of wetlands for **flood control**?",
    options: [
      ["They hold back storm water and reduce flood peaks downstream", "Correct: storage lowers and delays the peak."],
      ["They make rivers flow faster during storms", "Faster flow would raise flood risk, not lower it."],
      ["They remove all the silt and sand from the river bed during floods", "Wetlands trap silt from water passing through; this is purification, not flood control."],
      ["They raise the height of river banks", "Wetlands do not build up banks; levées form by deposition on floodplains."],
    ],
    answer: "A",
    explanation: "A wetland stores water during heavy rain and releases it gradually, so the flood peak downstream is lower and comes later.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Water leaving a reed marsh is often cleaner than the water entering it. Why?",
    options: [
      ["Silt settles and plants and bacteria take up nutrients", "Correct: slow flow and dense plants filter the water."],
      ["Reeds add oxygen by burning organic matter", "Plants do not burn matter; they photosynthesise and respire."],
      ["Fish in the marsh drink the polluted water", "Fish do not remove pollutants by drinking."],
      ["The marsh water evaporates and leaves salt behind", "Evaporation would concentrate salts, not clean the water."],
    ],
    answer: "A",
    explanation: "Water moves slowly through dense vegetation, so silt settles out, and plants and bacteria take up nutrients and some pollutants. Wetlands act as natural filters.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "The Ramsar Convention is an international agreement on which type of environment?",
    options: [
      ["Wetlands", "Correct: signed in 1971 at Ramsar in Iran."],
      ["Deserts", "Desertification is covered by a different UN convention."],
      ["Oceans and fisheries", "Fishing is covered by other agreements."],
      ["The ozone layer", "The ozone layer is covered by the Montreal Protocol."],
    ],
    answer: "A",
    explanation: "Under the Ramsar Convention (1971) countries agree to use wetlands wisely and list important ones as Wetlands of International Importance.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A town drains a vlei at the head of a stream to build houses. Which change downstream is **most likely**?",
    options: [
      ["The stream dries up earlier in the dry season", "Correct: the stored water that fed the stream is lost."],
      ["The stream flows more steadily all year", "Loss of storage makes flow less steady, not more."],
      ["Floods downstream become smaller", "Hard surfaces and drains make floods larger and quicker."],
      ["Water in the stream becomes cleaner", "The natural filter is lost and urban runoff adds pollution."],
    ],
    answer: "A",
    hints: ["What job did the vlei do for the stream?", "Think about storage being removed."],
    explanation: "Draining removes the sponge that released water slowly, so the stream dries earlier. Roofs and roads also send rain off quickly, so floods become sharper and water quality falls.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which use of a vlei is **most** compatible with keeping it as a working wetland?",
    options: [
      ["Controlled grazing and reed cutting on the edges", "Correct: wise use keeps the core wet and vegetated."],
      ["Digging drains to grow maize across the centre", "Drains lower the water table and destroy the wetland."],
      ["Moulding bricks from clay in the wettest part", "Pits and fuel-wood cutting scar and dry the wetland."],
      ["Dumping household waste to raise the ground", "Dumping pollutes the water and fills the wetland in."],
    ],
    answer: "A",
    hints: ["Which activity leaves the soil wet and the plants in place?"],
    explanation: "Wise use means limited activities that keep the wetland functioning: controlled grazing, reed harvesting and small gardens at the edges, with the wet core left intact.",
  });
  b.tf({
    d: 1, skill: "UNDERSTANDING",
    stem: "A vlei must have open water all year to count as a wetland.",
    answer: false,
    explanation: "False. A vlei may look like grassland for much of the year. It is a wetland because its soil is waterlogged for part of the year.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    daily: true,
    stem: "In Zimbabwe, activities that may harm a wetland, such as building on it, need approval from the Environmental Management Agency (EMA).",
    answer: true,
    explanation: "True. Under the Environmental Management Act, the EMA controls activities on wetlands, often after an environmental impact assessment.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of wetland to its description.",
    pairs: [
      ["Vlei (dambo)", "grassy hollow, waterlogged in the wet season"],
      ["Marsh", "shallow water with reeds, sedges and grasses"],
      ["Swamp", "wetland dominated by trees or tall papyrus"],
      ["Floodplain", "flat land beside a river, flooded in the wet season"],
    ],
    explanation: "Vleis are grassy and seasonal; marshes have reeds and sedges in shallow water; swamps have trees or papyrus; floodplains are flooded by a river.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The international treaty on wetlands was signed in 1971 at {{blank:a}} in Iran, and wetlands listed under it are called Wetlands of International {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Ramsar"], wrong: "Kyoto" },
      { id: "b", accepted: ["Importance"], wrong: "Heritage" },
    ],
    explanation: "The Ramsar Convention (1971) lists Wetlands of International Importance, known as Ramsar sites.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the process by which waterlogged soils in a vlei turn grey or blue-grey because there is little oxygen.",
    accepted: ["gleying", "gleisation", "gleization"],
    wrong: ["leaching", "laterisation"],
    explanation: "**Gleying**: in waterlogged soil there is little air, so iron compounds are reduced and the soil turns grey or blue-grey, often with rusty mottles.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "State **three** ways in which people living near a vlei benefit from it.",
    points: [
      "Water supply, e.g. shallow wells at the edge / stream flow in the dry season",
      "Dry-season grazing for cattle / vegetable gardens on the margins",
      "Materials, e.g. reeds or sedges for mats, baskets or thatch / clay for pottery",
    ],
    modelAnswer: "Shallow wells at the edge of the vlei hold water in the dry season; cattle graze the green vlei grass when the upland grass has dried; reeds are cut for mats and baskets.",
    explanation: "Benefits include water, grazing, gardens, crafts materials, wildlife and recreation. Each point must be a different benefit.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which cultivating the centre of a vlei can damage it.",
    points: [
      "Ploughing / clearing removes the natural sedges and grasses",
      "So the soil is exposed and eroded / gullies form",
      "Drains dug to dry the soil lower the water table",
      "So less water is stored and the stream below dries earlier",
    ],
    hints: ["Name the action, then say what it does to the wetland."],
    modelAnswer: "Ploughing removes the sedges that hold the soil, so the bare soil is washed away and gullies form. Farmers often dig drains so crops do not rot, which lowers the water table, so the vlei stores less water and the stream below dries up earlier.",
    explanation: "For each threat, name the human action, then explain the effect on the wetland and on the area downstream.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "A Form 3 class measured the depth to water in shallow wells across a vlei and the land beside it in late July (fictional data).\n\n| Well | Position | Depth to water (m) |\n| --- | --- | --- |\n| W1 | Upper slope, red soil | 6.5 |\n| W2 | Lower slope | 3.0 |\n| W3 | Vlei edge | 1.2 |\n| W4 | Vlei centre | 0.4 |",
    parts: [
      P.num({
        label: "(a)",
        marks: 1,
        stem: "Calculate the difference in depth to water between W1 and W4.",
        value: 6.1, tol: 0.05, unit: "m", answer: "6.1",
        explanation: "$6.5 - 0.4 = 6.1$ m.",
      }),
      P.num({
        label: "(b)",
        marks: 1,
        stem: "Calculate the mean depth to water for the four wells.",
        value: 2.775, tol: 0.01, unit: "m", answer: "2.775",
        explanation: "$(6.5 + 3.0 + 1.2 + 0.4) \\div 4 = 11.1 \\div 4 = 2.775$ m.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "Describe how the depth to water changes from the upper slope to the vlei centre.",
        points: [
          "The water is deeper on the upper slope and shallower towards the vlei / depth decreases downslope",
          "Uses figures, e.g. from 6.5 m at W1 to 0.4 m at W4",
        ],
        modelAnswer: "The depth to water decreases steadily downslope, from 6.5 m on the upper slope (W1) to only 0.4 m in the vlei centre (W4).",
      }),
      P.manual({
        label: "(d)",
        marks: 2,
        stem: "Suggest why the soil at W4 is likely to be grey rather than red.",
        points: [
          "The soil is waterlogged because the water table is very close to the surface",
          "Little oxygen, so gleying turns iron compounds grey / blue-grey",
        ],
        modelAnswer: "At W4 the water table is only 0.4 m down, so the soil is waterlogged and short of oxygen; gleying reduces the iron compounds and turns the soil grey.",
      }),
    ],
    hints: ["Add the four depths, then divide by the number of wells."],
    explanation: "The water table rises towards the vlei, which is why its soils are waterlogged and gleyed and why shallow wells at the vlei edge hold water in the dry season.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 600,
    stem: "Read this newspaper-style report about a fictional town.\n\n*Over ten years the town's built-up area spread on to a large vlei at the source of the stream that feeds its supply dam. Residents now report that the stream stops flowing in August instead of October, that flash floods damage roads after storms, and that algae cover the dam in summer.*",
    parts: [
      P.short({
        label: "(a)",
        stem: "Name the main human activity that has damaged the vlei.",
        accepted: ["building", "urban development", "construction", "housing", "building houses", "urban expansion", "urbanisation", "urbanization"],
        wrong: ["fishing"],
        explanation: "The town's built-up area spread on to the vlei: urban development.",
      }),
      P.mcq({
        label: "(b)",
        stem: "The stream now stops flowing in August instead of October. By how many months has the dry period lengthened?",
        options: [
          ["Two", "Correct: from the end of August to the end of October is about two months."],
          ["One", "August to October is more than one month."],
          ["Three", "Count again: September and October."],
          ["Four", "This is too many months."],
        ],
        answer: "A",
        explanation: "The stream now dries in August rather than October, so it is dry for about two extra months (September and October).",
      }),
      P.manual({
        label: "(c)",
        marks: 3,
        stem: "Explain why flash floods have become more common.",
        points: [
          "The vlei no longer stores storm water like a sponge",
          "Roofs, roads and paving are impermeable, so less water infiltrates",
          "Drains carry water quickly to the stream, so the flood peak is higher and sooner",
        ],
        modelAnswer: "The vlei used to soak up storm water, but it has been built over. Roofs and roads are impermeable, so rain runs off instead of soaking in, and drains carry it quickly to the stream, giving a higher, faster flood peak.",
      }),
      P.manual({
        label: "(d)",
        marks: 2,
        stem: "Suggest why algae now cover the dam in summer.",
        points: [
          "The wetland no longer filters nutrients (e.g. from sewage or fertiliser) before water reaches the dam",
          "Extra nutrients cause algae to grow rapidly (eutrophication)",
        ],
        modelAnswer: "Without the vlei to filter it, nutrient-rich water from sewage and gardens flows straight into the dam, and the extra nutrients make algae grow rapidly (eutrophication).",
      }),
      P.manual({
        label: "(e)",
        marks: 2,
        stem: "Suggest **two** ways the town could protect the remaining wetland.",
        points: [
          "One method, e.g. zone the wetland as open space where building is not allowed / require an EIA",
          "A second, different method, e.g. community monitoring and clean-ups / replanting wetland plants / education",
        ],
        modelAnswer: "The council could zone the rest of the vlei as protected open space, and residents' groups could monitor it, clear litter and replant sedges.",
      }),
    ],
    hints: ["Think of the three jobs a vlei does: storing, slowing and cleaning water."],
    explanation: "Building on a vlei removes water storage, flood control and natural filtering, so streams dry earlier, floods are sharper and dams suffer eutrophication.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "\"Vleis near towns should be used for housing because the land is otherwise wasted.\" With reference to Zimbabwe, discuss this view.",
    points: [
      "Recognises the pressure for land: growing urban population and housing shortage",
      "Explains water storage: vleis feed streams and supply dams in the dry season",
      "Explains flood control: building increases runoff and flash flooding",
      "Explains purification: loss of filtering leads to pollution / eutrophication of supply dams",
      "Explains biodiversity / grazing / gardens / crafts values that would be lost",
      "Considers costs of building on waterlogged ground (damp, cracking foundations, flooding of houses)",
      "Refers to protection: Ramsar sites (e.g. Monavale Vlei, Harare) / Environmental Management Act and EMA approval",
      "Reaches a judgement, e.g. wetlands are not wasted; build on dry land and allow only wise use of vleis",
    ],
    levels: geographyLevels(8),
    hints: ["List what a vlei provides before deciding whether it is wasted.", "Use a Zimbabwean example."],
    wordLimit: { max: 400 },
    modelAnswer: "Towns such as Harare are growing fast and need land for housing, so an open, grassy vlei can look like wasted space. However, vleis do important work. They store water in the wet season and release it slowly, so streams and supply dams receive water through the dry season. They hold back storm water, so building on them increases runoff and flash floods. They filter silt and nutrients, so losing them adds to pollution and algae in dams. They also provide dry-season grazing, gardens, reeds for crafts and habitats for birds and frogs. Houses built on waterlogged ground suffer damp, cracking and flooding. For these reasons some vleis, such as Monavale Vlei in Harare, are protected as Ramsar sites, and building on wetlands needs EMA approval. Overall the view is wrong: vleis are not wasted land. Housing should go on well-drained land, and vleis should be kept for wise uses such as controlled grazing.",
    explanation: "A good answer weighs the need for housing against the water, flood, purification and biodiversity value of vleis, uses a Zimbabwean example and reaches a clear judgement.",
  });
  b.card("DEFINITION", "What is a **wetland**?", "An area covered by shallow water or with saturated soil for all or part of the year, with plants and animals adapted to wet conditions.");
  b.card("VOCABULARY", "What is a **vlei** (dambo)?", "A shallow, grassy, seasonally waterlogged hollow, usually at the head of a stream.");
  b.card("VOCABULARY", "Marsh, swamp and floodplain", "Marsh: shallow water with reeds and sedges. Swamp: wetland with trees or papyrus. Floodplain: flat land beside a river flooded in the wet season.");
  b.card("CONCEPT", "Why is a wetland called a sponge?", "It soaks up water in the wet season and releases it slowly, keeping streams flowing and reducing flood peaks.");
  b.card("CONCEPT", "How does a wetland purify water?", "Slow flow lets silt settle; plants and bacteria take up nutrients and some pollutants.");
  b.card("FACT", "What is the Ramsar Convention?", "The international wetlands treaty signed in 1971 at Ramsar, Iran; countries list Wetlands of International Importance and promise wise use.");
  b.card("FACT", "Name two Zimbabwean Ramsar sites.", "For example Monavale Vlei (Harare) and Mana Pools (Zambezi valley).");
  b.card("CONCEPT", "Main threats to wetlands", "Drainage, cultivation, building, pollution, overgrazing and burning, brick moulding and over-abstraction of water.");
  b.card("FACT", "Which body approves activities on wetlands in Zimbabwe?", "The Environmental Management Agency (EMA), under the Environmental Management Act.");
});
