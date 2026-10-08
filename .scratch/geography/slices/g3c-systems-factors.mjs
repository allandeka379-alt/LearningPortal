// Slice G3c: farming systems and factors influencing agriculture (ZIMSEC 7.9.1; Cambridge 10.1).
import { concept, P, ZIM, CAM, geographyLevels } from "../lib.mjs";

concept("geo.agriculture.systems-factors", { file: "agriculture/systems-factors", keyPrefix: "agriculture.systems-factors" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a **physical** input to a farm?",
    options: [
      ["Rainfall", "Correct: rainfall is part of the natural environment."],
      ["Fertiliser", "Fertiliser is bought, so it is an economic input."],
      ["Family labour", "Labour is a human input."],
      ["A bank loan", "Money (capital) is an economic input."],
    ],
    answer: "A",
    explanation: "Physical inputs come from nature: rainfall, temperature, sunshine, soil, relief and water.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **pastoral** farming?",
    options: [
      ["Rearing livestock such as cattle, sheep and goats", "Correct: pastoral farming is based on animals."],
      ["Growing crops such as maize and wheat", "That is arable farming."],
      ["Growing crops and rearing livestock together", "That is mixed farming."],
      ["Growing plants in a nutrient solution", "That is hydroponics."],
    ],
    answer: "A",
    explanation: "Arable = crops; pastoral = livestock; mixed = both.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an example of **feedback** in a farming system?",
    options: [
      ["Money from selling a crop is used to buy next season's seed", "Correct: an output returns to become an input."],
      ["Rain falls on the fields during the wet season", "Rainfall is a physical input."],
      ["The farmer weeds the maize field", "Weeding is a process."],
      ["Milk is sold to a dairy company", "Milk is an output; feedback happens when its value returns as an input."],
    ],
    answer: "A",
    explanation: "Feedback links outputs back to inputs, for example profit reinvested, seed saved or manure returned to the soil.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In which method do fish and plants support each other in a linked system?",
    options: [
      ["Aquaponics", "Correct: fish waste feeds the plants, and the plants clean the water for the fish."],
      ["Aeroponics", "Aeroponics sprays plant roots with a nutrient mist; there are no fish."],
      ["Hydroponics", "Hydroponics grows plants in nutrient solution without fish."],
      ["Shifting cultivation", "Shifting cultivation clears and farms land in the forest, then moves on."],
    ],
    answer: "A",
    explanation: "Aquaponics combines fish farming (aquaculture) with hydroponics.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A farmer keeps 2,000 cattle on 15,000 ha of dry grassland with few workers. How is this farm best described?",
    options: [
      ["Extensive, commercial, pastoral", "Correct: low inputs over a large area, for sale, based on livestock."],
      ["Intensive, subsistence, arable", "Large herds on a huge area are not intensive, and cattle are not crops."],
      ["Intensive, commercial, mixed", "There are no crops and inputs per hectare are low."],
      ["Extensive, subsistence, arable", "2,000 cattle are kept for sale, not to feed one household."],
    ],
    answer: "A",
    explanation: "Large-scale cattle ranching is extensive (low inputs per ha), commercial and pastoral.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **political** factor that influences farming?",
    options: [
      ["A guaranteed price set by the government", "Correct: it is a government decision."],
      ["The fertility of the soil", "Soil fertility is physical."],
      ["The distance to the nearest market", "This is a socio-economic (market and transport) factor."],
      ["The amount of capital a farmer has", "Capital is an economic factor."],
    ],
    answer: "A",
    explanation: "Political factors include land policy, subsidies, price controls, marketing boards and trade rules.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why can hydroponic farms be set up in **towns and cities**, far from good farmland?",
    options: [
      ["They do not need soil and use little land or water", "Correct: plants grow in nutrient solution, often in stacked trays in greenhouses or buildings."],
      ["They need no inputs of electricity or capital", "Pumps, lighting and equipment need capital and power."],
      ["They only grow crops that tolerate drought", "Many crops, especially vegetables and herbs, are grown this way."],
      ["They depend on heavy rainfall to water the plants", "Water is supplied in a controlled system, not from rain."],
    ],
    answer: "A",
    hints: ["What is missing from a hydroponic system compared with a field?"],
    explanation: "Freedom from soil and low land and water use let hydroponics locate close to urban markets.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "In a communal area, villagers' cattle often stray into crops and gardens are dug on stream banks. Which measure would **best** reduce both problems?",
    options: [
      ["Zoning the land into separate grazing, arable and wetland areas", "Correct: zoning separates uses, keeps cattle from fields and protects stream banks."],
      ["Increasing the number of cattle each family keeps", "More cattle would make straying and overgrazing worse."],
      ["Ploughing the grazing land to plant more maize", "This would push cattle into even less space."],
      ["Moving all gardens closer to the stream", "This would increase stream-bank cultivation and erosion."],
    ],
    answer: "A",
    hints: ["Both problems are caused by land uses being mixed up."],
    explanation: "Land-use zoning reduces conflict between users and protects fragile areas.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Subsistence farming produces food mainly for the farmer's own household.",
    answer: true,
    explanation: "True. Any small surplus may be sold, but the main purpose is to feed the family.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Intensive farming always means farming for sale.",
    answer: false,
    explanation: "False. Intensive describes high inputs per hectare. A small subsistence vegetable garden watered and weeded daily is intensive but not commercial.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Classify each item in a farming system.",
    pairs: [
      ["Draught oxen bought by the farmer", "Economic input"],
      ["The farmer's knowledge of planting dates", "Human input"],
      ["Spraying cotton against pests", "Process"],
      ["Bales of tobacco sold at auction", "Output"],
    ],
    explanation: "Inputs (physical, human, economic) pass through processes to give outputs.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Growing crops only is {{blank:a}} farming. Keeping both crops and livestock is {{blank:b}} farming. Spraying plant roots with a nutrient mist is called {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["arable"], choices: ["arable", "pastoral", "mixed", "nomadic"] },
      { id: "b", accepted: ["mixed"], choices: ["arable", "pastoral", "mixed", "extensive"] },
      { id: "c", accepted: ["aeroponics"], choices: ["aeroponics", "hydroponics", "aquaponics", "irrigation"] },
    ],
    explanation: "Know the basic types and the three soil-free methods.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A smallholder harvests 6 tonnes of maize from 4 ha (fictional figures). What is the yield in tonnes per hectare?",
    value: 1.5, tol: 0.005,
    wrong: [24, 0.67],
    explanation: "Yield = output ÷ area = 6 ÷ 4 = 1.5 t/ha.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A farmer grows 5 ha of soya beans. Inputs cost US\\$380 per ha. The yield is 2 t/ha, sold at US\\$450 per tonne (fictional figures). Calculate the profit in US dollars.",
    value: 2600,
    wrong: [4500, 1900, 70],
    hints: ["Find the total cost and the total income separately.", "Profit = income − cost."],
    workedSolution: "1. Cost = 5 × 380 = US\\$1,900.\n2. Output = 5 × 2 = 10 t; income = 10 × 450 = US\\$4,500.\n3. Profit = 4,500 − 1,900 = US\\$2,600.",
    explanation: "Income US\\$4,500 minus costs US\\$1,900 gives a profit of US\\$2,600.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how **two** physical factors influence the type of farming in an area.",
    points: [
      "Rainfall: amount and reliability decide whether crops can be grown without irrigation (1).",
      "Example/effect: low, unreliable rain leads to cattle ranching or drought-tolerant crops; high reliable rain allows intensive cropping (1).",
      "Soil, temperature/altitude or relief (1).",
      "Example/effect: fertile, deep soils suit crops while thin, sandy soils suit grazing / frost limits crops on high ground / steep slopes erode and are hard to plough (1).",
    ],
    modelAnswer: "Where rainfall is high and reliable, crops such as maize and tobacco can be grown intensively, but where it is low and unreliable farmers keep cattle or grow drought-tolerant sorghum. Deep, fertile soils suit crops, while thin, sandy soils are better for grazing.",
    explanation: "Each factor needs its effect on farming.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4, applies: ZIM,
    hints: ["Think about the different parts of a holding and the shared village land."],
    stem: "Name **four** elements of a communal farm in Zimbabwe and state what each is used for.",
    points: [
      "Homestead: houses, granary and kraals for living, storing grain and keeping animals.",
      "Arable fields: growing maize, sorghum, groundnuts and other crops.",
      "Garden near water: growing vegetables, often in the dry season.",
      "Grazing land (commons) or woodland: grazing cattle and goats / firewood, poles and wild fruit.",
    ],
    modelAnswer: "The homestead has the houses, granary and cattle kraal. The arable fields grow maize and groundnuts. A garden by the stream grows vegetables. The shared grazing land feeds the village's cattle and goats.",
    explanation: "Name the element and its use.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    hints: ["Sort each item into inputs, processes, outputs or feedback.", "Yield = output ÷ area."],
    stem: "A description of a fictional mixed farm: \"The farm has 8 ha of crops and 20 cattle. The family and two hired workers plough with oxen, plant maize and beans, weed and dip the cattle weekly. This season the farm produced 12 t of maize, 1.6 t of beans and 400 litres of milk a month. Manure is spread on the fields and some maize is kept as seed.\"",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which of these is a **process** on this farm?",
        options: [
          ["Dipping the cattle", "Correct: dipping is an activity carried out on the farm."],
          ["The 20 cattle", "Livestock are an input (or produce outputs), not a process."],
          ["400 litres of milk", "Milk is an output."],
          ["The hired workers", "Workers are a human input."],
        ],
        answer: "A", explanation: "Processes are the activities that turn inputs into outputs.",
      }),
      P.num({ label: "(b)", stem: "The maize was grown on 6 of the 8 ha. Calculate the maize yield in tonnes per hectare.", value: 2, tol: 0.005, wrong: [1.5, 72], explanation: "12 ÷ 6 = 2 t/ha." }),
      P.manual({
        label: "(c)", marks: 2, stem: "Give **two** examples of feedback on this farm.",
        points: ["Manure (an output) is spread on the fields to fertilise the next crop.", "Some maize is kept as seed for the next season / income from milk buys inputs."],
        modelAnswer: "Manure from the cattle is spread on the fields, and some of the maize harvest is kept as seed for next season.",
        explanation: "Feedback turns an output into a future input.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why this farm is described as **mixed** farming and give **one** advantage of mixed farming.",
        points: ["It grows crops (maize, beans) and keeps livestock (cattle).", "Advantage: crops and animals support each other (manure for crops, crop residues and oxen for draught).", "Development: spreads risk, so if one enterprise fails (e.g. drought hits crops) the other still provides food or income."],
        modelAnswer: "The farm grows maize and beans and also keeps cattle, so it is mixed. Cattle provide manure and draught power, while crop residues feed the cattle, and if a drought spoils the crops the cattle still provide milk and income.",
        explanation: "Mixed farming links crops and livestock and spreads risk.",
      }),
    ],
    explanation: "Apply the systems model to a described farm.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 540, applies: CAM,
    hints: ["Think about the inputs each system needs and where they are easiest to provide."],
    stem: "Table 1 compares two fictional lettuce farms (fictional data).\n\n| | Farm X (field, LIC) | Farm Y (hydroponic greenhouse, HIC) |\n|---|---|---|\n| Area (ha) | 2.0 | 0.5 |\n| Lettuce produced per year (t) | 30 | 60 |\n| Water used per tonne of lettuce (m³) | 250 | 20 |\n| Workers | 12 | 4 |",
    parts: [
      P.num({ label: "(a)", stem: "Calculate the yield of Farm Y in tonnes per hectare per year.", value: 120, wrong: [30, 15], explanation: "60 ÷ 0.5 = 120 t/ha." }),
      P.num({ label: "(b)", stem: "How many times more water does Farm X use per tonne than Farm Y?", value: 12.5, tol: 0.05, wrong: [230, 0.08], explanation: "250 ÷ 20 = 12.5 times." }),
      P.manual({
        label: "(c)", marks: 3, stem: "Suggest why Farm Y is more likely to be found in a high-income country (HIC).",
        points: ["It needs high capital to build greenhouses and buy pumps and control systems.", "It needs reliable electricity and technical skills.", "Labour is expensive in HICs, so a system with few workers and high output suits them / near large urban markets willing to pay for fresh produce."],
        modelAnswer: "A hydroponic greenhouse needs a lot of capital, a reliable power supply and trained staff, which are easier to find in an HIC. It uses few workers, which suits a country where wages are high, and it can sit close to large city markets.",
        explanation: "Intensive, capital-heavy systems suit places with capital, power, skills and high wages.",
      }),
    ],
    explanation: "Compare a field farm with a hydroponic system using data.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "\"Physical factors are the most important influence on the type of farming in an area.\" To what extent do you agree?",
    hints: ["Give the physical case with examples.", "Then show how money, technology, markets and government can overcome physical limits."],
    points: [
      "Physical: rainfall amount and reliability, temperature and soils set what can grow (e.g. ranching in dry areas, tea in wet highlands).",
      "Physical: relief and water supply affect mechanisation and irrigation.",
      "Socio-economic: capital and technology can overcome physical limits, e.g. irrigation of sugar cane in a dry lowveld, hydroponics in greenhouses.",
      "Socio-economic: markets and transport decide what is profitable (market gardens near cities).",
      "Political: land policy, subsidies, prices and marketing boards change what farmers grow.",
      "Judgement: physical factors set the limits, especially for poor farmers, but human factors decide what is actually farmed where capital is available.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "Physical factors are very important. Low, unreliable rainfall and thin soils mean that dry areas are mainly used for cattle ranching or drought-tolerant crops, while cool, wet highlands suit tea and forestry. However, human factors can change this. With capital and irrigation, sugar cane is grown in hot, dry lowlands, and hydroponic greenhouses grow vegetables almost anywhere. Market gardens are found close to cities because of demand and transport costs, and government prices and subsidies encourage particular crops. For poor smallholders without capital, physical factors are the strongest influence, but where money and technology are available, economic and political factors often decide what is grown.",
    explanation: "Weigh physical against human factors and judge for different kinds of farmer.",
  });

  b.card("DEFINITION", "**Farming system**", "Inputs → processes → outputs, with feedback linking outputs back to inputs.", undefined);
  b.card("CONCEPT", "Types of farm inputs", "Physical (rain, soil, relief), human (labour, skills), economic (seed, fertiliser, capital, machinery).", undefined);
  b.card("DEFINITION", "**Intensive farming**", "High inputs of labour or capital per hectare, giving high yields per hectare.", undefined);
  b.card("DEFINITION", "**Extensive farming**", "Low inputs per hectare over a large area; low yields per hectare.", "Example: cattle ranching.");
  b.card("VOCABULARY", "**Hydroponics**", "Growing plants with roots in a nutrient solution instead of soil.", undefined);
  b.card("VOCABULARY", "**Aquaponics**", "Fish farming linked to hydroponics: fish waste feeds plants; plants clean the water.", undefined);
  b.card("VOCABULARY", "**Aeroponics**", "Plant roots hang in air and are sprayed with a nutrient mist.", undefined);
  b.card("CONCEPT", "Factors influencing farming", "Physical (climate, soil, relief, water), political (policy, subsidies, prices), socio-economic (capital, labour, markets, technology, culture).", undefined);
  b.card("CONCEPT", "Why zone land in a community?", "Avoid conflict between users, protect wetlands and stream banks, reduce overgrazing and plan services.", undefined, { applies: ZIM });
});
