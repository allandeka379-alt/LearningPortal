// Slice G1b: ecosystems — threats to tropical rainforests and their management (Cambridge 3.4).
import { concept, P, geographyLevels } from "../lib.mjs";

const LOSS =
  "Table 1: forest cleared each year in a fictional rainforest province (fictional data).\n\n| Year | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 |\n| --- | --- | --- | --- | --- | --- | --- |\n| Forest cleared (km²) | 1,250 | 1,180 | 1,420 | 1,760 | 1,940 | 2,110 |";

concept("geo.ecosystems.rainforest-threats", { file: "ecosystems/rainforest-threats", keyPrefix: "ecosystems.rainforest-threats" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which term means the permanent removal of forest so the land can be used for something else?",
    options: [
      ["Deforestation", "Correct: the forest does not return."],
      ["Afforestation", "Afforestation is planting trees where there was no forest."],
      ["Reforestation", "Reforestation is replanting trees where forest was cut."],
      ["Desertification", "Desertification is land becoming desert-like in dry areas."],
    ],
    answer: "A",
    explanation: "Deforestation is the permanent clearing of forest for farming, mining, settlement or other uses.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which activity has been the largest single cause of forest clearance in the Brazilian Amazon?",
    options: [
      ["Cattle ranching", "Correct: forest is burned and sown with pasture for beef cattle."],
      ["Ecotourism", "Ecotourism depends on the forest staying intact."],
      ["Fishing in the rivers", "Fishing does not require clearing the forest."],
      ["Collecting rubber latex", "Tapping rubber trees keeps the forest standing."],
    ],
    answer: "A",
    explanation: "Cattle ranching accounts for the largest share of cleared land in the Brazilian Amazon, ahead of soya farming, logging and mining.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do new roads through a rainforest often lead to much more deforestation?",
    options: [
      ["They open remote areas to loggers, ranchers and settlers", "Correct: clearing spreads out from the road."],
      ["Road building itself uses most of the timber that is cut", "Road building uses little timber; the main effect is access."],
      ["Vehicles change the climate along the road", "Vehicle emissions are not the main reason clearing spreads."],
      ["Roads make the soil more fertile", "Roads compact and erode soil; they do not improve it."],
    ],
    answer: "A",
    explanation: "Roads give access. Loggers, farmers and settlers follow them, and clearings spread out on both sides in a fishbone pattern.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does deforestation contribute to climate change?",
    options: [
      ["Burning and decay release stored carbon as carbon dioxide", "Correct: and fewer trees remain to absorb CO₂."],
      ["Cleared land reflects more heat back into space", "Higher reflection would tend to cool the surface, not warm the planet."],
      ["Cutting and burning trees releases large amounts of ozone", "Felling trees does not release ozone."],
      ["Logging machinery cools the air near the ground", "Machinery does not cool the air."],
    ],
    answer: "A",
    explanation: "Rainforests store large amounts of carbon. Burning and rotting release it as carbon dioxide, a greenhouse gas, and the lost trees can no longer absorb it.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is a **debt-for-nature swap**?",
    options: [
      ["Debt is reduced in return for spending on conservation", "Correct: part of a country's debt is cancelled for conservation."],
      ["A country sells its forest to pay its debts", "Selling forest would usually lead to clearance."],
      ["Loggers swap timber for farm machinery", "That is barter, not a conservation scheme."],
      ["Farmers exchange their cleared land for areas of forest land", "That would not reduce debt or protect forest."],
    ],
    answer: "A",
    explanation: "In a debt-for-nature swap, a lender or conservation group cancels part of a country's foreign debt and the country spends money on protecting nature.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which is the **main limitation** of protected areas as a way of managing rainforests?",
    options: [
      ["Huge remote areas are hard to patrol, so illegal clearing continues", "Correct: enforcement is the weak point."],
      ["They allow unlimited logging of all tree species inside the park", "Protected areas restrict logging; that is their purpose."],
      ["They always force indigenous people to leave", "Many protected areas are indigenous territories where people stay."],
      ["They increase the amount of carbon released", "Keeping forest standing stores carbon."],
    ],
    answer: "A",
    hints: ["Think about how rules are enforced in a vast forest."],
    explanation: "Protected areas give legal protection, but they cover huge, remote areas with few rangers, so illegal logging and mining can continue unless enforcement is strong.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which strategy is the **most sustainable** way for a farming family to use rainforest land?",
    options: [
      ["Growing crops such as cocoa beneath and among trees", "Correct: agroforestry keeps tree cover and protects the soil."],
      ["Clearing all trees and planting maize every year", "Continuous cropping on cleared land leaches and erodes the soil."],
      ["Burning the forest to plant pasture for cattle", "Ranching on cleared land degrades soils quickly."],
      ["Selling all the large trees to a logging company", "This removes the trees without replacing them."],
    ],
    answer: "A",
    hints: ["Which option keeps tree cover over the soil?"],
    explanation: "Agroforestry keeps a tree canopy, so roots hold the soil and leaf fall continues the nutrient cycle while the family still earns an income.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "After clearance, a river downstream of a rainforest becomes brown and floods more often. Which is the **best** explanation?",
    options: [
      ["More runoff carries eroded soil into the river", "Correct: no canopy or roots to slow and hold water and soil."],
      ["The river receives more groundwater from the bare land", "Infiltration falls on bare compacted soil, so groundwater flow falls."],
      ["Rainfall over the cleared area doubles", "Clearance tends to reduce local rainfall, not increase it."],
      ["Fish disturb the river bed as numbers grow", "Fish numbers usually fall with silt and pollution."],
    ],
    answer: "A",
    hints: ["What used to intercept rain and hold the soil?"],
    explanation: "Without interception by the canopy and roots holding the soil, rain runs off quickly carrying soil, so rivers become muddy, silt up and flood more often.",
  });
  b.tf({
    d: 1, skill: "UNDERSTANDING",
    stem: "Selective logging removes all the trees in an area at one time.",
    answer: false,
    explanation: "False. Selective logging cuts only chosen mature trees, leaving the rest so the forest can regenerate. Removing all trees is clear-felling.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Forest cleared each year in a fictional rainforest district (fictional data).\n\n| Year | 2010 | 2011 | 2012 | 2013 | 2014 |\n| --- | --- | --- | --- | --- | --- |\n| Forest cleared (km²) | 840 | 910 | 1,030 | 980 | 1,150 |\n\nCalculate the mean area of forest cleared per year.",
    value: 982, unit: "km²",
    wrong: [4910, 995],
    explanation: "Total = 4,910 km²; mean = $4\\,910 \\div 5 = 982$ km² per year.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "In a fictional rainforest state, 1,350 km² of forest was cleared in 2015 and 2,295 km² in 2022 (fictional data). Calculate the percentage increase in the area cleared.",
    value: 70, tol: 0.05, unit: "%", answer: "70",
    wrong: [41.2, 945],
    hints: ["Find the increase first.", "Divide the increase by the 2015 value and multiply by 100."],
    workedSolution: "1. Increase = 2,295 − 1,350 = 945 km².\n2. Percentage increase = $\\dfrac{945}{1\\,350} \\times 100 = 70\\%$.",
    explanation: "$(2\\,295 - 1\\,350) \\div 1\\,350 \\times 100 = 70\\%$.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cause of deforestation to the way it destroys forest.",
    pairs: [
      ["Cattle ranching", "forest burned and sown with grass"],
      ["HEP scheme", "forest flooded behind a dam"],
      ["Gold mining", "riverbanks cleared and rivers polluted with mercury"],
      ["Commercial logging", "valuable hardwoods felled, others damaged by machines"],
    ],
    explanation: "Each cause removes forest in a different way: pasture, flooding, mining pits and pollution, or felling.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Growing crops among or beneath trees is called {{blank:a}}, and low-impact tourism that benefits local people is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["agroforestry", "agro-forestry"], wrong: "plantation farming" },
      { id: "b", accepted: ["ecotourism", "eco-tourism"], wrong: "mass tourism" },
    ],
    explanation: "Agroforestry and ecotourism are sustainable ways of earning an income while keeping the forest.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe **three** impacts of deforestation on indigenous people living in the rainforest.",
    points: [
      "Loss of land / homes / forced to move",
      "Loss of food and resources from hunting, fishing and gathering / rivers polluted",
      "Loss of culture and way of life / conflict with loggers, ranchers or miners / exposure to new diseases",
    ],
    modelAnswer: "They lose the land they live on, the animals and plants they hunt and gather, and their traditional way of life; conflicts with loggers and miners can also become violent.",
    explanation: "Each point must be a different impact on the people, not on the forest itself.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Evaluate satellite monitoring as a strategy for reducing deforestation.",
    points: [
      "Strength: covers huge, remote areas and detects new clearings quickly",
      "Strength: gives evidence for fines or prosecution / shows trends over time",
      "Limitation: it does not stop clearing by itself; it needs enforcement teams on the ground / political will",
      "Judgement: effective only when combined with enforcement and other measures",
    ],
    hints: ["Give strengths, a limitation and a final judgement."],
    modelAnswer: "Satellites can watch the whole forest and spot new clearings within days, giving evidence for fines. However, satellites cannot stop anyone: if there are too few inspectors, or the government does not act, clearing continues. It is very effective only when combined with enforcement.",
    explanation: "Evaluate means weighing strengths against limitations and reaching a judgement.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: LOSS,
    parts: [
      P.short({
        label: "(a)",
        stem: "In which year was the least forest cleared?",
        accepted: ["2017"],
        wrong: ["2016"],
        explanation: "2017 had the lowest figure, 1,180 km².",
      }),
      P.num({
        label: "(b)",
        marks: 1,
        stem: "The province had 48,000 km² of forest in 2016. What percentage of it was cleared in the six years shown? Give your answer to one decimal place.",
        value: 20.1, tol: 0.05, unit: "%", answer: "20.1",
        explanation: "Total cleared = 9,660 km²; $9\\,660 \\div 48\\,000 \\times 100 = 20.125$, so 20.1%.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "Describe the trend shown in Table 1.",
        points: [
          "Clearance fell slightly from 2016 to 2017, then rose every year",
          "Uses figures, e.g. from 1,180 km² in 2017 to 2,110 km² in 2021",
        ],
        modelAnswer: "Clearance fell slightly to 1,180 km² in 2017 and then rose every year to 2,110 km² in 2021.",
      }),
      P.manual({
        label: "(d)",
        marks: 3,
        stem: "Suggest **three** reasons why clearance might increase in this way.",
        points: [
          "A new road / railway opens up the forest",
          "Higher demand or prices for beef, soya, palm oil, timber or minerals",
          "Weaker enforcement / changes in government policy / population growth and settlement",
        ],
        modelAnswer: "A new road may have opened up the forest; world prices for beef and soya may have risen; and enforcement of forest laws may have been relaxed.",
      }),
    ],
    hints: ["Add all six years before working out the percentage."],
    explanation: "The table shows rising clearance; causes include access, global demand and policy.",
  });
  b.struct({
    d: 3, skill: "EVALUATION", secs: 720,
    stem: "Read the proposals for a fictional rainforest district (fictional).\n\n*Proposal 1: a company will clear-fell 300 km² and plant oil palm, creating 900 jobs.*\n*Proposal 2: the district will become a reserve with a lodge for ecotourism, employing 60 local guides.*\n*Proposal 3: 2,000 farming families will be helped to grow cocoa and bananas beneath the existing trees.*",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which proposal is an example of agroforestry?",
        options: [
          ["Proposal 3", "Correct: crops grown beneath the trees."],
          ["Proposal 1", "Clear-felling for oil palm removes the forest."],
          ["Proposal 2", "A reserve with a lodge is ecotourism."],
          ["Proposals 1 and 3 together", "Proposal 1 clear-fells the forest, so it is not agroforestry."],
        ],
        answer: "A",
        explanation: "Agroforestry grows crops among or beneath trees: proposal 3.",
      }),
      P.manual({
        label: "(b)",
        marks: 3,
        stem: "Give **one** advantage and **two** disadvantages of Proposal 1.",
        points: [
          "Advantage: many jobs (900) / export income",
          "Disadvantage: loss of habitat and biodiversity / carbon release",
          "Second disadvantage: soil erosion / river pollution / loss of land for local people",
        ],
        modelAnswer: "It creates 900 jobs, but it destroys habitats and releases carbon, and the bare land between young palms erodes into rivers.",
      }),
      P.manual({
        label: "(c)",
        marks: 6,
        stem: "Which proposal would be the most sustainable? Justify your choice by comparing it with the other two.",
        points: [
          "Chooses a proposal with a clear reason",
          "Environmental argument for the choice (e.g. forest cover kept / soil protected)",
          "Economic argument (e.g. number of families who benefit / income)",
          "Social argument (e.g. local people involved / land rights kept)",
          "Weakness of a rejected proposal explained",
          "Weakness of the chosen proposal acknowledged or a balanced conclusion",
        ],
        levels: geographyLevels(6),
        modelAnswer: "Proposal 3 is most sustainable. The forest canopy stays, so the soil is protected and carbon is stored, and 2,000 families earn an income, far more people than the 900 jobs of Proposal 1. Proposal 1 destroys 300 km² of forest permanently, while Proposal 2 protects the forest but employs only 60 guides and depends on tourists arriving. Cocoa yields are lower than intensive farming, but Proposal 3 balances income for many people with keeping the forest for the future.",
      }),
    ],
    hints: ["Sustainable means meeting needs now without harming the future."],
    explanation: "A sustainable choice balances environmental, economic and social outcomes now and in the future.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "For a named rainforest area you have studied, evaluate the success of strategies used to manage it. (Detailed specific example.)",
    points: [
      "Names and locates the rainforest (e.g. the Brazilian Amazon, states such as Pará or Mato Grosso)",
      "Describes the main threats (e.g. cattle ranching, soya, roads such as the Trans-Amazonian Highway, mining, HEP)",
      "Explains a strategy, e.g. protected areas and indigenous territories, with a strength and a weakness",
      "Explains a second strategy, e.g. satellite monitoring and enforcement / the Forest Code legal reserve",
      "Explains a third strategy, e.g. the Soy Moratorium / Amazon Fund / certification",
      "Uses specific evidence, e.g. deforestation rates fell sharply after the mid-2000s and later rose again",
      "Reaches a judgement on overall success and what makes management work",
    ],
    levels: geographyLevels(7),
    hints: ["Use specific place names and named schemes.", "Say how successful each strategy has been."],
    wordLimit: { max: 400 },
    modelAnswer: "In the Brazilian Amazon, forest is cleared mainly for cattle ranching and soya, helped by roads such as the Trans-Amazonian Highway, and by mining at Carajás and dams such as Belo Monte. Large areas have been protected as national parks and indigenous territories, which slows clearance where they are respected, but illegal loggers and gold miners still enter them. Satellite monitoring finds new clearings quickly and guided enforcement teams in the 2000s, when the annual rate of deforestation fell sharply. The Soy Moratorium meant traders refused soya from newly cleared land, which reduced clearing for soya. However, deforestation rose again when enforcement was weakened. Overall the strategies can succeed, but only when laws are enforced, local people benefit and buyers refuse products from newly cleared land.",
    explanation: "Credit specific, located detail and a judgement about how well each strategy works, not a general list.",
  });
  b.card("DEFINITION", "What is **deforestation**?", "The permanent removal of forest so the land can be used for farming, mining, settlement or other purposes.");
  b.card("CONCEPT", "Main causes of rainforest deforestation", "Logging, cattle ranching, commercial and subsistence farming, mining, roads, HEP dams and settlement.");
  b.card("CONCEPT", "Local impacts of deforestation", "Soil erosion and infertility, flooding and silting, loss of biodiversity, harm to indigenous people, drier local climate.");
  b.card("CONCEPT", "Global impacts of deforestation", "Release of carbon dioxide (climate change), loss of species and future resources, changes to rainfall patterns.");
  b.card("DEFINITION", "What is **selective logging**?", "Cutting only chosen mature trees, leaving the rest of the forest to regenerate.");
  b.card("DEFINITION", "What is a **debt-for-nature swap**?", "Part of a country's foreign debt is cancelled in return for spending on conservation.");
  b.card("VOCABULARY", "Agroforestry and ecotourism", "Agroforestry: crops grown among trees. Ecotourism: small-scale, low-impact tourism that benefits locals and conserves nature.");
  b.card("FACT", "Amazon: main drivers of clearance", "Cattle ranching (largest), soya, roads such as the Trans-Amazonian Highway, mining (e.g. Carajás), HEP (e.g. Belo Monte), logging.");
  b.card("FACT", "Amazon: management measures", "Protected areas and indigenous territories, the Forest Code legal reserve, satellite monitoring, the Soy Moratorium, the Amazon Fund.");
});
