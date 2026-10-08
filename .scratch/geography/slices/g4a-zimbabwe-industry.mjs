// Slice G4a: manufacturing and processing industries in Zimbabwe (ZIMSEC 7.10.3). ZIMSEC-only concept.
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.industry.zimbabwe-industry", { file: "industry/zimbabwe-industry", keyPrefix: "industry.zimbabwe-industry" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which city has the largest concentration of manufacturing industry in Zimbabwe?",
    options: [
      ["Harare", "Correct: the capital is the largest market, transport hub and labour pool."],
      ["Masvingo", "Masvingo is a provincial centre with relatively little manufacturing."],
      ["Chiredzi", "Chiredzi is the centre of the sugar industry, but it is far smaller."],
      ["Victoria Falls", "Victoria Falls is mainly a tourist town."],
    ],
    answer: "A",
    explanation: "Harare has the largest and most varied group of industries, followed by Bulawayo.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where are Zimbabwe's two large sugar mills?",
    options: [
      ["Triangle and Hippo Valley, near Chiredzi", "Correct: both are in the irrigated south-east Lowveld."],
      ["Kwekwe and Gweru, in the Midlands", "The Midlands are known for metal and mineral processing."],
      ["Mutare and Nyanga, in the Eastern Highlands", "The Eastern Highlands are known for timber, tea and fruit."],
      ["Hwange and Binga, in the north-west", "The north-west is known for coal and kapenta fishing."],
    ],
    answer: "A",
    explanation: "Triangle and Hippo Valley mill cane from irrigated estates in the Lowveld.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is **beneficiation**?",
    options: [
      ["Adding value to a raw material inside the country before exporting it", "Correct: for example smelting chrome into ferrochrome before export."],
      ["Selling raw materials abroad at the highest possible price", "That is exporting, not adding value."],
      ["Giving workers benefits such as medical aid", "That is a conditions-of-service issue, not processing."],
      ["Importing machinery to replace old equipment", "That is retooling."],
    ],
    answer: "A",
    explanation: "Beneficiation means processing raw materials at home to earn more and create jobs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement best describes the **distribution** of manufacturing in Zimbabwe?",
    options: [
      ["Concentrated along the Harare–Bulawayo railway, sparse in most rural areas", "Correct: the main towns on the line of rail have most factories."],
      ["Spread fairly evenly across all of the provinces and rural districts", "Industry is very unevenly distributed."],
      ["Concentrated in the Zambezi valley around Kariba", "The Zambezi valley has tourism and fishing but little manufacturing."],
      ["Found mainly in the communal lands of the south", "Communal lands have very little manufacturing."],
    ],
    answer: "A",
    explanation: "Distribution means where industry is concentrated and where it is sparse.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which industry uses chrome ore from the Great Dyke?",
    options: [
      ["Ferrochrome smelting in the Midlands", "Correct: smelters near Kwekwe turn chromite into ferrochrome."],
      ["Ethanol production at Triangle", "Ethanol is made from molasses, a by-product of sugar."],
      ["Sawmilling in Mutare", "Sawmills process timber from plantations."],
      ["Grain milling in Harare", "Grain mills process maize and wheat."],
    ],
    answer: "A",
    explanation: "Ferrochrome is an alloy used in stainless steel, made from chromite ore.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Ethanol is produced at Triangle from which by-product?",
    options: [
      ["Molasses from sugar milling", "Correct: molasses left after sugar is crystallised is fermented and distilled."],
      ["Cotton seed from ginning", "Cotton seed is used for oil and cattle feed."],
      ["Sawdust from timber mills", "Sawdust is not the raw material for ethanol at Triangle."],
      ["Coal from Hwange", "Coal is not used to make ethanol."],
    ],
    answer: "A",
    explanation: "Molasses is a sugar by-product; ethanol from it can be blended with petrol.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Match each solution to the problem it solves.", "Which option tackles the cause, not a different problem?"],
    stem: "A clothing factory in Bulawayo is losing customers to cheaper imported clothes. Which measure most directly tackles this problem?",
    options: [
      ["Import duties on competing clothes plus loans to modernise machinery", "Correct: duties narrow the price gap and modern machines cut the factory's costs."],
      ["Building a new hydro-electric power station on the Zambezi", "More power helps output but does not directly make clothes cheaper than imports."],
      ["Opening more tourist lodges in Hwange National Park", "Tourism does not affect clothing competition."],
      ["Moving the factory to the cotton-growing areas of Gokwe", "Moving would lose the urban market and labour without solving the price gap."],
    ],
    answer: "A",
    explanation: "Competition from imports is tackled by protection and by making local firms more efficient.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which problem stops machines running?"],
    stem: "A food factory loses six hours of production a day. Which problem is the most likely cause?",
    options: [
      ["Load-shedding of electricity", "Correct: scheduled power cuts stop machines for hours at a time."],
      ["Competition from imported food", "Competition reduces sales, not daily running hours."],
      ["Emigration of skilled engineers", "This reduces skills over time, not hours each day."],
      ["The long distance to the port of Beira", "Distance raises transport costs but does not stop production."],
    ],
    answer: "A",
    explanation: "Power shortages are a major cause of lost production hours.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mutare's industries include timber processing using wood from Eastern Highlands plantations.",
    answer: true,
    explanation: "True. Pine and eucalyptus plantations supply sawmills and board-making in and around Mutare.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Import substitution means exporting goods instead of importing them.",
    answer: false,
    explanation: "False. Import substitution means making goods at home that used to be imported.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each processing industry with an area where it is found in Zimbabwe.",
    pairs: [
      ["Sugar milling", "Triangle"],
      ["Ferrochrome smelting", "Kwekwe"],
      ["Tea processing", "Chipinge"],
      ["Timber processing", "Mutare"],
    ],
    explanation: "Sugar–Triangle (Lowveld); ferrochrome–Kwekwe (Midlands); tea–Chipinge and the Honde Valley; timber–Mutare.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Processing farm products such as sugar cane, cotton and tea is called {{blank:a}}. Most of Zimbabwe's manufacturing is found along the railway between Harare and {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["agro-processing"], choices: ["agro-processing", "beneficiation", "mining", "retailing"] },
      { id: "b", accepted: ["Bulawayo"], choices: ["Bulawayo", "Mutare", "Kariba", "Chiredzi"] },
    ],
    explanation: "Agro-processing is processing agricultural products; the Harare–Bulawayo line of rail is the main industrial axis.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "%",
    stem: "A fictional country had 640 manufacturing firms. 368 of them were in its two largest cities (fictional data). What percentage of firms were in the two cities?",
    value: 57.5,
    tol: 0.05,
    wrong: [42.5, 174],
    explanation: "368 ÷ 640 × 100 = 57.5%.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "%",
    hints: ["Find the fall first.", "Divide by the first year's output."],
    stem: "A fictional factory produced 2,500 tonnes of cooking oil in Year 1. Because of power cuts it produced 1,900 tonnes in Year 2. Calculate the percentage decrease in output (fictional data).",
    value: 24,
    tol: 0.05,
    wrong: [31.6, 76],
    workedSolution: "1. Fall = 2,500 − 1,900 = 600 t.\n2. 600 ÷ 2,500 × 100 = 24%.",
    explanation: "Percentage decrease = 600 ÷ 2,500 × 100 = 24%.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the alloy produced by smelting chromite ore in the Midlands.",
    accepted: ["ferrochrome", "ferro-chrome", "ferrochromium", "ferro chrome", "high-carbon ferrochrome", "high carbon ferrochrome"],
    wrong: ["stainless steel"],
    explanation: "Ferrochrome (an alloy of iron and chromium) is used to make stainless steel.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which agro-processing industries are important to Zimbabwe.",
    points: [
      "They add value to farm products (e.g. cane to sugar, cotton to lint and cloth).",
      "Development: processed goods sell for more / earn more foreign currency when exported.",
      "They provide a market for farmers' crops / employ many workers in rural and urban areas.",
      "Development: farmers earn income; wages are spent locally; estate settlements get schools and clinics.",
    ],
    modelAnswer: "Agro-processing adds value: a sugar mill turns low-value cane into sugar and ethanol that earn far more, including export earnings. It also gives farmers a guaranteed market and employs thousands of workers, whose wages support shops and services in places such as Chiredzi.",
    explanation: "Each way needs a point and a development.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Think about transport, markets and minerals."],
    stem: "Explain why manufacturing in Zimbabwe is concentrated along the Harare–Bulawayo railway.",
    points: [
      "The railway and main roads allow cheap movement of raw materials and products.",
      "The largest towns on the line provide markets, labour, banks and services.",
      "Power, water and minerals (Great Dyke, greenstone belts) are available nearby, and agglomeration attracted more firms.",
    ],
    modelAnswer: "The railway and main road carry bulky inputs and goods cheaply. Harare, Bulawayo and the Midlands towns are the largest markets with the most workers and services. Minerals from the Great Dyke are close by, power and water were developed early, and once firms clustered, others followed.",
    explanation: "Link the pattern to transport, markets, resources and agglomeration.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows the number of manufacturing firms in five fictional towns of a Zimbabwe-like country (fictional data).\n\n| Town | On the main railway? | Number of firms |\n|---|---|---|\n| P | Yes | 420 |\n| Q | Yes | 260 |\n| R | Yes | 95 |\n| S | No | 15 |\n| T | No | 10 |",
    hints: ["Add the firms to find the total.", "Compare towns on and off the railway."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the total number of firms in the five towns.", value: 800, wrong: [775, 680], explanation: "420 + 260 + 95 + 15 + 10 = 800." }),
      P.num({ label: "(b)", marks: 2, unit: "%", stem: "Calculate the percentage of firms found in towns on the main railway.", value: 96.875, answer: "96.9", tol: 0.05, wrong: [3.1, 775], explanation: "(420 + 260 + 95) = 775; 775 ÷ 800 × 100 = 96.875 ≈ 96.9%." }),
      P.manual({
        label: "(c)", marks: 3, stem: "Suggest **three** problems that firms in town P might face.",
        points: ["Power cuts / load-shedding stop production.", "Shortage of foreign currency to import spare parts and machinery / obsolete machines.", "Competition from cheaper imported goods / high transport costs to ports."],
        modelAnswer: "Firms in P may lose production during power cuts, struggle to find foreign currency to replace old machines, and lose sales to cheaper imports.",
        explanation: "Use the problems facing Zimbabwean manufacturing.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest **one** way in which the government could encourage industry to locate in towns S and T.",
        points: ["Names a measure: tax relief / grants / special economic zone / cheap serviced land / better roads and power.", "Explains how it lowers costs or attracts firms to these towns."],
        modelAnswer: "The government could declare S and T special economic zones with tax relief, which would lower costs for firms that move there.",
        explanation: "A measure plus how it works.",
      }),
    ],
    explanation: "This item practises describing an uneven industrial distribution and suggesting causes, problems and policies.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 480,
    stem: "Read the description of a fictional cotton chain in Zimbabwe.\n\n\"Small-scale farmers in a dry district grow cotton. A ginnery in the district separates lint from seed. The lint goes by rail to a spinning and weaving mill in a Midlands town. The seed is crushed for cooking oil and cattle cake.\"",
    hints: ["Think about weight loss and linkages."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Why is the ginnery located in the cotton-growing district?",
        options: [
          ["Raw cotton is bulky and loses weight when the seed is removed", "Correct: carrying only lint and seed in useful form cuts transport costs."],
          ["The district has the largest market for cloth", "The market for cloth is in towns."],
          ["Ginning needs highly skilled research workers", "Ginning uses mostly semi-skilled labour."],
          ["Ginneries are footloose and can locate anywhere", "Ginning is raw-material-oriented."],
        ],
        answer: "A", explanation: "Ginning is a raw-material-oriented processing industry.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Describe **three** linkages shown in the description.",
        points: ["Farmers supply raw cotton to the ginnery (backward linkage).", "The ginnery supplies lint to the textile mill (forward linkage).", "Seed is supplied to oil and stockfeed processors; transport (rail) links the stages."],
        modelAnswer: "Farmers sell cotton to the ginnery; the ginnery sends lint by rail to the textile mill; and the seed goes to oil and cattle-cake makers.",
        explanation: "Linkages are flows of goods and services between firms.",
      }),
    ],
    explanation: "This item practises location and linkages in agro-processing.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    hints: ["Describe each problem with an example.", "Judge which solutions would work best and why."],
    stem: "Discuss the problems facing manufacturing industry in Zimbabwe and evaluate possible solutions.",
    points: [
      "Power shortages and load-shedding (low water at Kariba, ageing Hwange units) cut production.",
      "Shortage of foreign currency to import machinery, spares and inputs; obsolete machinery raises costs.",
      "Competition from cheaper imports from South Africa and Asia (clothing, food).",
      "High transport costs (landlocked; declining railway); loss of skilled workers through emigration.",
      "Solution evaluated: new power capacity and solar projects; effective but slow and costly.",
      "Solution evaluated: credit lines for retooling and joint ventures improve efficiency but need stable conditions.",
      "Solution evaluated: import duties and buy-local campaigns protect firms but can raise prices and reduce pressure to improve.",
      "Judgement: reliable power and access to capital are the priorities because other measures depend on them.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Manufacturing in Zimbabwe faces several linked problems. Power cuts are common when water in Lake Kariba is low or old units at Hwange break down, so factories lose production. Firms struggle to find foreign currency for imported spares and machinery, so many work with obsolete equipment that raises costs. Cheap imported clothing and food from South Africa and Asia take customers from local firms. Being landlocked, with a declining railway, raises transport costs, and many skilled workers have emigrated. Solutions include expanding power stations and encouraging solar generation, which would remove a major cause of lost output but takes years and heavy investment. Long-term loans for retooling and joint ventures with foreign firms would modernise factories, but investors need stable economic conditions. Import duties and buy-local campaigns protect local firms quickly, but they raise prices for consumers and may reduce the pressure to become efficient. Overall, reliable power and access to capital should come first, because without them protection alone cannot make local factories competitive.",
    explanation: "Discuss the problems with detail, then evaluate the solutions and reach a judgement.",
  });

  b.card("DEFINITION", "Agro-processing", "Processing agricultural products (crops, livestock, timber) into food, drink, fibre and other goods.");
  b.card("DEFINITION", "Beneficiation", "Adding value to a raw material, especially a mineral, inside the country before export.");
  b.card("DEFINITION", "Import substitution", "Making goods at home that were previously imported, to save foreign currency and create jobs.");
  b.card("FACT", "Distribution of manufacturing in Zimbabwe", "Concentrated along the Harare–Bulawayo railway (Harare, Bulawayo, Kadoma, Kwekwe, Gweru); Mutare and the Lowveld are smaller centres.");
  b.card("FACT", "Sugar milling and ethanol", "Triangle and Hippo Valley near Chiredzi mill irrigated cane; molasses is used to make ethanol at Triangle.");
  b.card("FACT", "Mineral processing in the Midlands", "Ferrochrome smelting near Kwekwe uses chrome ore from the Great Dyke; the Redcliff steelworks stopped production in the late 2000s.");
  b.card("CONCEPT", "Problems of manufacturing in Zimbabwe", "Power cuts, foreign-currency shortages, obsolete machinery, competition from imports, high transport costs, emigration of skilled workers.");
  b.card("CONCEPT", "Solutions for manufacturing", "More power capacity and solar, credit for retooling, import duties and buy-local campaigns, railway rehabilitation, special economic zones.");
  b.card("VOCABULARY", "Linkages", "Flows of goods and services between firms: backward linkages to suppliers, forward linkages to customers.");
});
