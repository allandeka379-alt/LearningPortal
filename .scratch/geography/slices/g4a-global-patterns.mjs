// Slice G4a: global food supply and demand (Cambridge 10.2). Cambridge-only concept.
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.food.global-patterns", { file: "food/global-patterns", keyPrefix: "food.global-patterns" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which unit is daily calorie intake usually measured?",
    options: [
      ["Kilocalories (kcal) per person per day", "Correct: energy from food is measured in kilocalories."],
      ["Kilograms of food per household per year", "That measures weight of food, not energy."],
      ["Tonnes of grain per hectare", "That measures crop yield."],
      ["Litres of water per person per day", "That measures water use."],
    ],
    answer: "A",
    explanation: "Calorie intake is the energy from food, in kcal per person per day.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which region generally has the **highest** average daily calorie intake?",
    options: [
      ["North America and Europe", "Correct: many HICs average more than about 3,000 kcal per person per day."],
      ["Sub-Saharan Africa", "Many sub-Saharan countries have some of the lowest intakes."],
      ["South Asia", "Parts of South Asia have low average intakes."],
      ["Countries affected by long wars", "Conflict usually lowers calorie intake."],
    ],
    answer: "A",
    explanation: "High incomes and abundant, processed food give HICs the highest intakes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is meant by **food miles**?",
    options: [
      ["The distance food travels from where it is produced to where it is eaten", "Correct: long food miles usually mean more transport emissions."],
      ["The distance a farmer walks from home to his fields each day", "This is not the meaning of food miles."],
      ["The area of land needed to feed one person", "This is sometimes called a food or land footprint."],
      ["The amount of food wasted by supermarkets", "This is food waste."],
    ],
    answer: "A",
    explanation: "Food miles measure transport distance from farm to plate.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does rising income in MICs such as China increase the demand for grain, even if people eat less bread or rice?",
    options: [
      ["People eat more meat, and animals are fed large amounts of grain", "Correct: producing meat needs several times more grain than eating the grain directly."],
      ["Richer people always eat more bread and rice than poorer people", "As incomes rise, people often eat relatively less staple grain."],
      ["Grain is used to build new houses and roads", "Grain is not a building material."],
      ["Higher incomes make grain harvests smaller", "Income does not directly reduce harvests."],
    ],
    answer: "A",
    explanation: "Changing diets towards meat and dairy raise indirect demand for grain and water.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What was the **Green Revolution**?",
    options: [
      ["The use of high-yielding crop varieties with fertiliser and irrigation from the 1960s", "Correct: it greatly increased wheat and rice yields in Asia and Latin America."],
      ["A campaign to plant trees in deserts", "That is afforestation, not the Green Revolution."],
      ["A switch from growing crops to organic livestock farming in the 1960s", "The Green Revolution increased chemical inputs."],
      ["The banning of fertilisers to protect rivers", "The Green Revolution used more fertiliser, not less."],
    ],
    answer: "A",
    explanation: "HYVs, fertiliser, pesticides and irrigation were the core of the Green Revolution.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which product spoils fastest and is worth most per kilogram?"],
    stem: "Which product from Africa is most likely to be sent to Europe by **air freight**?",
    options: [
      ["Fresh cut flowers", "Correct: flowers are perishable and high in value, so fast air transport is worthwhile."],
      ["Bags of maize", "Maize is bulky and low in value; it travels by sea or rail."],
      ["Raw cotton lint", "Cotton lint does not spoil quickly and travels by sea."],
      ["Tea in sacks", "Tea keeps well and is shipped by sea."],
    ],
    answer: "A",
    explanation: "Air freight suits perishable, high-value produce.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Think about factors other than climate."],
    stem: "Two neighbouring fictional countries have the same climate and soils. Country X has a calorie intake of 2,900 kcal and Country Y 1,950 kcal. Which is the most likely explanation?",
    options: [
      ["Country Y has suffered years of civil war that disrupted farming and trade", "Correct: conflict destroys crops and blocks food supplies."],
      ["Country Y receives more reliable rainfall than Country X", "The question states the climates are the same."],
      ["Country Y has more fertile soils than Country X", "The soils are the same, and better soils would raise intake."],
      ["Country Y has a much smaller population growth rate than Country X", "Slower population growth would help, not reduce, food per person."],
    ],
    answer: "A",
    explanation: "When physical factors are equal, human factors such as conflict and poverty explain the difference.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    hints: ["Weigh the benefits and costs for the producing country."],
    stem: "Which statement is the most balanced view of exporting fresh vegetables from an LIC to Europe?",
    options: [
      ["It earns foreign currency and jobs, but uses scarce water and land that could grow local food", "Correct: it weighs benefits against costs."],
      ["It only benefits European consumers and supermarkets, and harms everyone in the LIC", "Workers and the government in the LIC gain jobs and income."],
      ["It has no environmental impact because vegetables are natural", "Air freight, water use and pesticides have impacts."],
      ["It always raises the calorie intake of everyone in the LIC", "Export crops do not necessarily feed local people."],
    ],
    answer: "A",
    explanation: "Globalised food supply creates both benefits and costs for producers.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Malnutrition can include eating too much as well as too little.",
    answer: true,
    explanation: "True. Malnutrition means an unbalanced diet; it includes undernutrition and obesity.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Low calorie intake in a country is always caused by drought.",
    answer: false,
    explanation: "False. Poverty, conflict, poor infrastructure and population growth are often more important than drought.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each reason for the globalisation of food with its description.",
    pairs: [
      ["Refrigerated containers", "Keep fresh food cool on long sea journeys"],
      ["Consumer demand", "Shoppers want tropical and out-of-season food all year"],
      ["Trade liberalisation", "Lower tariffs on imported food"],
      ["Agribusiness TNCs", "Large firms organise farming, processing and sales across countries"],
    ],
    explanation: "Transport technology, demand, trade policy and large companies all drive the globalisation of food.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Farming run as a large commercial business, often by companies that also process and sell food, is called {{blank:a}}. Not eating enough energy and protein for good health is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["agribusiness"], choices: ["agribusiness", "subsistence", "aquaculture", "pastoralism"] },
      { id: "b", accepted: ["undernutrition"], choices: ["undernutrition", "obesity", "food miles", "irrigation"] },
    ],
    explanation: "Agribusiness and undernutrition are key terms for this topic.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A fictional country has an average intake of 3,280 kcal per person per day; another has 2,040 kcal (fictional data). What is the difference in kcal?",
    value: 1240,
    wrong: [5320, 1340],
    explanation: "3,280 − 2,040 = 1,240 kcal.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "%",
    hints: ["Divide the intake by the guide value.", "Multiply by 100."],
    stem: "A guide value for an adult's needs is 2,400 kcal a day. A fictional country's average intake is 1,980 kcal (fictional data). Calculate the intake as a percentage of the guide value.",
    value: 82.5,
    tol: 0.05,
    wrong: [121.2, 17.5],
    workedSolution: "1. 1,980 ÷ 2,400 = 0.825.\n2. 0.825 × 100 = 82.5%.",
    explanation: "1,980 ÷ 2,400 × 100 = 82.5%.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for the farming of fish in ponds, tanks or cages.",
    accepted: ["aquaculture", "fish farming", "fish-farming", "pisciculture"],
    wrong: ["hydroponics"],
    explanation: "Aquaculture (fish farming) has grown as wild fish catches have levelled off.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why average calorie intake is low in many countries of sub-Saharan Africa.",
    points: [
      "Poverty: many households cannot afford enough food.",
      "Low farm productivity: little fertiliser, irrigation or machinery; unreliable rainfall or drought.",
      "Conflict or political instability disrupts farming and trade.",
      "Rapid population growth / poor roads and storage cause food losses.",
    ],
    modelAnswer: "Many people are too poor to buy enough food. Farmers use few fertilisers and little irrigation, so yields are low and drought often ruins harvests. In some countries conflict disrupts farming and trade, and rapid population growth means food per person stays low.",
    explanation: "Give a range of human and physical reasons.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Consider each group in turn."],
    stem: "Describe the impacts of the globalisation of food supplies on **consumers** and on the **environment**.",
    points: [
      "Consumers positive: wider choice and food available all year round.",
      "Consumers negative: loss of local or seasonal foods / more processed food and diet-related disease.",
      "Environment negative: more food miles and air freight increase greenhouse gas emissions.",
      "Environment negative: heavy water use in dry areas / deforestation for soya, palm oil or cattle / pesticide pollution.",
    ],
    modelAnswer: "Shoppers in HICs can buy almost any food at any time of year, but local and seasonal foods are replaced and more processed food is eaten. For the environment, flying and shipping food long distances adds greenhouse gases, and export farms use large amounts of water and can cause deforestation.",
    explanation: "Two impacts on each group.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows average daily calorie intake in four fictional countries (kcal per person, fictional data).\n\n| Country | Income level | Calorie intake |\n|---|---|---|\n| P | HIC | 3,520 |\n| Q | MIC | 2,880 |\n| R | LIC | 2,150 |\n| S | LIC affected by conflict | 1,840 |",
    hints: ["Compare each value with the others and with income level."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the range of calorie intake shown in Table 1.", value: 1680, wrong: [1370, 5360], explanation: "3,520 − 1,840 = 1,680 kcal." }),
      P.num({ label: "(b)", stem: "Calculate the mean calorie intake of the four countries.", value: 2597.5, answer: "2597.5", tol: 0.5, wrong: [2515, 10390], explanation: "(3,520 + 2,880 + 2,150 + 1,840) ÷ 4 = 10,390 ÷ 4 = 2,597.5 kcal." }),
      P.mcq({
        label: "(c)", stem: "What relationship does Table 1 suggest?",
        options: [
          ["Calorie intake tends to rise with income level", "Correct: the HIC has the highest intake and the LICs the lowest."],
          ["Calorie intake tends to fall as income rises", "The HIC has the highest intake, not the lowest."],
          ["Calorie intake is the same at all income levels", "Values range from 1,840 to 3,520."],
          ["Conflict raises calorie intake", "The country affected by conflict has the lowest intake."],
        ],
        answer: "A", explanation: "A positive relationship between income and calorie intake.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest why Country S has a lower intake than Country R, although both are LICs.",
        points: ["Fighting destroys crops, livestock and stores.", "Farmers flee as refugees / cannot plant or harvest.", "Trade routes and food aid are blocked; markets close and prices rise."],
        modelAnswer: "In Country S, fighting destroys crops and grain stores, farmers flee their land and cannot plant, and roads are unsafe so food cannot be traded or delivered.",
        explanation: "Conflict reduces both production and access to food.",
      }),
    ],
    explanation: "This item practises interpreting calorie data and explaining variations.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 480,
    stem: "A fictional horticulture company in an LIC grows mange-tout peas on irrigated land near the capital. Peas are picked, packed and chilled the same day, then flown overnight to supermarkets in Europe. The farm employs 800 workers, mostly women on seasonal contracts. Water for irrigation is taken from a river used by villages downstream.",
    hints: ["Separate impacts on producers from impacts on the environment."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain why the peas are flown rather than shipped to Europe.",
        points: ["Peas are perishable and must arrive fresh within a day or two.", "They are high in value, so the cost of air freight is worthwhile."],
        modelAnswer: "Fresh peas spoil quickly, so they must reach supermarkets within a day or two; their high value pays for the expensive flight.",
        explanation: "Air freight suits perishable, high-value goods.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Describe **two** positive and **two** negative impacts of the farm on the producing country.",
        points: ["Positive: 800 jobs, especially for women.", "Positive: export earnings / skills and technology / taxes.", "Negative: seasonal, insecure, often low-paid work / dependence on European buyers.", "Negative: irrigation reduces river water for villages downstream / pesticide pollution / air-freight emissions."],
        modelAnswer: "The farm provides 800 jobs and earns foreign currency. However, the contracts are seasonal and insecure, and taking river water for irrigation leaves less for villages downstream.",
        explanation: "Balance benefits and problems using the resource.",
      }),
    ],
    explanation: "This item practises the impacts of the globalisation of food supplies.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    hints: ["Think about producers, consumers and the environment.", "Decide who gains most and who loses most."],
    stem: "\"The globalisation of food supplies benefits consumers in HICs more than producers in LICs.\" To what extent do you agree?",
    points: [
      "HIC consumers gain wide choice, year-round supply and often low prices.",
      "LIC producers gain jobs and export earnings (e.g. Kenyan beans and flowers, Zimbabwean horticulture).",
      "But LIC workers often have low wages, seasonal contracts and depend on a few powerful buyers.",
      "Supermarkets and TNCs capture much of the final price.",
      "Environmental costs (water use, pesticides) fall largely on producing areas; emissions are global.",
      "Judgement: consumers generally gain more, though producers gain more where fair trade or local ownership exists.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "Consumers in HICs clearly benefit: they can buy fresh vegetables, fruit and flowers all year round, often at low prices. Producers in LICs also gain. Exporters of green beans and flowers in Kenya, and horticulture in Zimbabwe, provide many jobs and earn foreign currency. However, many workers are on seasonal contracts with low pay, and farms depend on a few supermarket buyers who can set prices and standards. Much of the final shop price is kept by supermarkets, importers and transport companies. Producing areas also bear environmental costs such as heavy water use and pesticides. I largely agree: HIC consumers gain more because they receive the benefits without the costs, but producers can gain more where they are organised in cooperatives or fair-trade schemes.",
    explanation: "Weigh benefits and costs for both groups and reach a judgement.",
  });

  b.card("DEFINITION", "Calorie intake", "The energy a person gets from food each day, in kilocalories (kcal); adults need very roughly 2,000-2,500 kcal.");
  b.card("DEFINITION", "Malnutrition", "An unbalanced diet: too little of some nutrients (undernutrition) or too much energy (obesity).");
  b.card("DEFINITION", "Food miles", "The distance food travels from where it is produced to where it is eaten.");
  b.card("DEFINITION", "Agribusiness", "Large-scale commercial farming, often controlled by companies that also process, transport and sell food.");
  b.card("CONCEPT", "Global pattern of calorie intake", "Highest in HICs (often above about 3,000 kcal); lowest in parts of sub-Saharan Africa and South Asia and in conflict zones.");
  b.card("CONCEPT", "Reasons for variation in calorie intake", "Income, food production methods, climate and hazards, conflict, population growth, infrastructure and diet.");
  b.card("CONCEPT", "Why food consumption is changing", "Population growth, rising incomes (more meat and dairy), urbanisation (processed food), global tastes.");
  b.card("CONCEPT", "Reasons for the globalisation of food", "Refrigerated containers and air freight, demand for year-round produce, cheap production in LICs, supermarkets and TNCs, lower tariffs.");
  b.card("VOCABULARY", "Green Revolution", "From the 1960s: high-yielding varieties of wheat and rice with fertiliser, pesticides and irrigation, raising yields in Asia and Latin America.");
});
