// Slice G4a: factors influencing the location of industry (ZIMSEC 7.10.2; Cambridge 9.1.3).
import { concept, P, ZIM, CAM, geographyLevels } from "../lib.mjs";

concept("geo.industry.location-factors", { file: "industry/location-factors", keyPrefix: "industry.location-factors" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a **physical** factor of industrial location?",
    options: [
      ["A supply of water", "Correct: water is a natural (physical) resource."],
      ["Government grants", "Grants are a human (political) factor."],
      ["A large market", "Markets are a human (economic) factor."],
      ["A skilled workforce", "Labour is a human factor."],
    ],
    answer: "A",
    explanation: "Physical factors are raw materials, power, water and land; the rest are human factors.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **footloose** industry?",
    options: [
      ["One that is not tied to raw materials or markets and can locate in many places", "Correct: light, high-value inputs and products free it from these ties."],
      ["One that must always locate right beside the source of its raw materials", "That is a raw-material-oriented industry."],
      ["One that must locate in the centre of a large city", "That describes a market-oriented industry needing customer contact."],
      ["One that moves from place to place every season", "Footloose refers to freedom of location, not to seasonal movement."],
    ],
    answer: "A",
    explanation: "Footloose industries, such as electronics assembly or software, have wide freedom of location.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are sugar mills built close to the cane fields?",
    options: [
      ["Cane is bulky and loses its sugar soon after cutting", "Correct: heavy, perishable cane that loses weight in processing should travel as little as possible."],
      ["Sugar is a fragile product that breaks during transport", "Bagged sugar travels well; the problem is the cane."],
      ["Most sugar is eaten by the farmworkers on the estates", "Sugar is sold across the country and exported."],
      ["Sugar mills need very little water or labour", "Mills and estates need large amounts of both."],
    ],
    answer: "A",
    explanation: "Sugar milling is raw-material-oriented: the raw material is heavy, perishable and loses weight.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A soft-drinks bottling plant is usually **market-oriented**. Why?",
    options: [
      ["Water is added, so the product weighs more than the inputs", "Correct: it is cheaper to transport concentrate and bottles than the finished drinks."],
      ["Its raw materials are perishable and must be processed at once", "Concentrate, sugar and bottles do not spoil quickly."],
      ["It uses so much electricity that it must be near a power station", "Bottling is not a heavy power user."],
      ["It needs highly qualified research scientists", "Bottling mainly needs semi-skilled workers."],
    ],
    answer: "A",
    explanation: "Weight-gaining industries locate near their markets.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is meant by **agglomeration**?",
    options: [
      ["The clustering of related firms that benefit from sharing services and suppliers", "Correct: firms gain from being close together."],
      ["The closure of factories when raw materials run out", "That is industrial decline."],
      ["Moving factories out of large cities to new rural growth points", "That is decentralisation."],
      ["Packing goods in standard steel boxes for transport", "That is containerisation."],
    ],
    answer: "A",
    explanation: "Agglomeration economies include shared skilled labour, suppliers, repair services and banks.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Compare the weight of the inputs with the weight of the product.", "Which input loses most weight?"],
    stem: "A smelter needs 4 tonnes of ore to make 1 tonne of metal (fictional data). Where is it likely to locate, other things being equal?",
    options: [
      ["Near the ore deposit, to avoid transporting waste rock", "Correct: three-quarters of the ore's weight is lost, so moving ore far is wasteful."],
      ["In the capital city, to be close to customers", "Carrying 4 tonnes to the market to sell 1 tonne raises costs."],
      ["At a port, because ore is always imported", "The question gives a local deposit; there is no reason to import it."],
      ["Anywhere, because smelting is a footloose industry", "Smelting is a heavy, raw-material-oriented industry."],
    ],
    answer: "A",
    explanation: "Weight-losing industries locate near raw materials to reduce transport costs.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which factor has become more widely available over time?"],
    stem: "Why is **power** a less important location factor for most factories today than it was 150 years ago?",
    options: [
      ["Electricity is distributed through a national grid to most areas", "Correct: factories no longer need to be on a coalfield or beside a river."],
      ["Factories today use no energy in production", "Factories still use a great deal of energy."],
      ["Every factory now produces all of its own power with solar panels", "Some use solar panels, but most rely on the grid."],
      ["Coal has become too cheap to affect costs", "Cost is not the reason; the spread of electricity is."],
    ],
    answer: "A",
    explanation: "The national grid frees most industries from power sources; only very heavy users are still drawn to cheap, reliable power.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: ZIM,
    hints: ["What does Harare offer that smaller towns do not?"],
    stem: "Which combination best explains why many food-processing and clothing factories are in **Harare**?",
    options: [
      ["The largest market, a large labour supply and good transport links", "Correct: these human factors favour the capital."],
      ["Large deposits of raw materials found within the city", "The raw materials for food and clothing come from farms across the country."],
      ["Cheap land and an absence of other industries", "Land in Harare costs more and many industries already cluster there."],
      ["Hot lowland climate and irrigation water from Lowveld dams", "These describe the south-east Lowveld, not Harare."],
    ],
    answer: "A",
    explanation: "Market-oriented and labour-oriented industries benefit from the capital's market, workforce, transport hub and agglomeration.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Government policy can influence where industries locate.",
    answer: true,
    explanation: "True. Grants, tax relief, special economic zones and planning controls attract industry to some areas and restrict it in others.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Industrial inertia means an industry moves as soon as its original location factors disappear.",
    answer: false,
    explanation: "False. Industrial inertia is the opposite: the industry stays because buildings, skilled workers and links are already there.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each industry with the location it is most likely to be drawn to.",
    pairs: [
      ["Cotton ginning", "Near cotton-growing areas"],
      ["A bakery", "Near its customers in a town"],
      ["Software development", "Anywhere with good internet and skilled workers"],
      ["Paper making", "Beside a large supply of water and timber"],
    ],
    explanation: "Ginning is raw-material-oriented; baking is market-oriented (perishable product); software is footloose; paper needs water and timber.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Goods packed in standard steel boxes that move between ship, rail and lorry are carried by {{blank:a}}. An industry that stays in place after its first location factors have gone shows industrial {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["containerisation"], choices: ["containerisation", "agglomeration", "decentralisation", "beneficiation"] },
      { id: "b", accepted: ["inertia"], choices: ["inertia", "linkage", "relocation", "momentum"] },
    ],
    explanation: "Containerisation cuts transport costs; inertia keeps industries where they are.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    hints: ["Find the weight of the product.", "Compare the cost of moving the inputs and the cost of moving the product."],
    stem: "A fictional mill crushes 900 tonnes of cane a day to make 100 tonnes of sugar. Transport costs US\\$2 per tonne per 10 km. The market is 50 km away. How much would the mill save each day (in US\\$) by being beside the fields rather than at the market? (Fictional data.)",
    value: 8000,
    wrong: [9000, 1000],
    workedSolution: "1. Cost per tonne over 50 km = 2 × 5 = US\\$10.\n2. Mill at the market: carry 900 t of cane = 900 × 10 = US\\$9,000.\n3. Mill at the fields: carry 100 t of sugar = 100 × 10 = US\\$1,000.\n4. Saving = 9,000 − 1,000 = US\\$8,000 a day.",
    explanation: "Moving 100 t of sugar costs US\\$1,000; moving 900 t of cane costs US\\$9,000; the saving is US\\$8,000.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "%",
    stem: "In a fictional processing industry, 25 tonnes of raw material produce 5 tonnes of finished product (fictional data). What percentage of the raw material's weight is lost?",
    value: 80,
    wrong: [20, 500],
    explanation: "Weight lost = 25 − 5 = 20 t; 20 ÷ 25 × 100 = 80%.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for an industry located close to its customers.",
    accepted: ["market-oriented", "market oriented", "market-orientated", "market orientated", "market-oriented industry", "market orientated industry", "market-based industry"],
    wrong: ["footloose"],
    explanation: "Market-oriented (market-orientated) industries locate near their customers.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4, applies: ZIM,
    stem: "Explain **two** factors that influence the location of sugar milling at Triangle and Hippo Valley.",
    points: [
      "Raw material: sugar cane is grown on the surrounding estates and outgrower farms.",
      "Development: cane is bulky/heavy and loses sucrose quickly after cutting, so it must be crushed nearby.",
      "Water: irrigation water from dams such as Lake Mutirikwi (Kyle) supports cane in the dry Lowveld.",
      "Development: plus a hot climate and flat land suit cane / labour from settlements / rail links take sugar to markets.",
    ],
    modelAnswer: "The mills are surrounded by cane estates. Cane is heavy and starts losing its sugar soon after cutting, so it must be crushed close by. The Lowveld is dry, but irrigation water from dams such as Lake Mutirikwi allows cane to be grown on the hot, flat land.",
    explanation: "Each factor needs a statement and a development linked to the place.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3, applies: CAM,
    hints: ["Think about what is light and what can be sent electronically.", "What do these firms need most?"],
    stem: "Explain why many high-technology firms are described as footloose.",
    points: [
      "Their components and products are light and high in value, so transport costs are a small part of total costs.",
      "They use electricity from the grid and send information electronically, so they are not tied to power or raw-material sites.",
      "They are drawn instead by skilled workers, universities, good communications or pleasant environments.",
    ],
    modelAnswer: "High-tech firms use small, light, valuable parts and products, so transport costs matter little. They rely on grid electricity and the internet rather than heavy raw materials. They can therefore locate in many places and choose sites near skilled workers, universities and airports.",
    explanation: "Footloose industries are free of raw-material and market ties.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows the weekly costs (US\\$, fictional data) of running the same factory at three possible sites, A, B and C.\n\n| Cost | Site A (near raw materials) | Site B (near the market) | Site C (port) |\n|---|---|---|---|\n| Transporting raw materials | 1,200 | 6,400 | 4,100 |\n| Transporting products | 5,300 | 900 | 2,800 |\n| Labour | 7,800 | 9,600 | 8,200 |\n| Land and rent | 1,100 | 2,300 | 1,900 |",
    hints: ["Add the four costs for each site.", "The best site has the lowest total cost."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the total weekly cost at Site A (US\\$).", value: 15400, wrong: [14300, 6500], explanation: "1,200 + 5,300 + 7,800 + 1,100 = 15,400." }),
      P.num({ label: "(b)", stem: "Calculate the total weekly cost at Site B (US\\$).", value: 19200, wrong: [16900, 7300], explanation: "6,400 + 900 + 9,600 + 2,300 = 19,200." }),
      P.mcq({
        label: "(c)", stem: "Site C costs US\\$17,000 a week. Which site has the lowest total cost?",
        options: [
          ["Site A", "Correct: US\\$15,400 is lower than 17,000 (C) and 19,200 (B)."],
          ["Site B", "Site B is the most expensive at US\\$19,200."],
          ["Site C", "Site C, at US\\$17,000, costs more than Site A."],
          ["Sites B and C cost the same", "B costs 19,200 and C costs 17,000."],
        ],
        answer: "A", explanation: "A: 15,400; C: 17,000; B: 19,200.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** reasons why the owner might still choose a site that is **not** the cheapest.",
        points: ["Government grants or tax relief could reduce costs at another site.", "Being near the market allows faster delivery and closer contact with customers / agglomeration benefits.", "Availability of skilled labour, reliable power and water, or room to expand may be better elsewhere."],
        modelAnswer: "A government grant could make another site cheaper overall. Being near customers allows quick delivery and contact with buyers. Another site may have more skilled workers, a more reliable power supply or space for future expansion.",
        explanation: "Costs are not the only factor: policy, markets and the quality of factors also count.",
      }),
    ],
    explanation: "This item practises comparing location costs and recognising factors beyond cost.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 480,
    stem: "A company plans to build a large brewery. It needs a large volume of clean water, grain from farms, a big market for its heavy bottled product and a site of about 10 ha of flat land. Three possible sites are described:\n\n- **Site 1:** beside a river on the edge of a large city, next to a main road and railway.\n- **Site 2:** in a remote farming area 300 km from the nearest city, beside a dam.\n- **Site 3:** a small, steep plot in the city centre with a piped water supply.",
    hints: ["Which site satisfies the most needs?"],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which site is most suitable?",
        options: [
          ["Site 1", "Correct: it has water, flat land, transport and is close to the large market."],
          ["Site 2", "Site 2 is far from the market, so carrying heavy bottled beer would be costly."],
          ["Site 3", "Site 3 is small and steep; the brewery needs about 10 ha of flat land."],
          ["Sites 2 and 3 equally", "Each has a serious drawback; Site 1 has none."],
        ],
        answer: "A", explanation: "Site 1 meets the water, land, transport and market needs.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why a brewery is usually a market-oriented industry.",
        points: ["Water is added, so the bottled product is much heavier and bulkier than the grain.", "Bottles are fragile, so short journeys to customers reduce cost and breakages."],
        modelAnswer: "Brewing adds water, so the beer is much heavier than the grain used. Transporting heavy, fragile bottles is expensive, so it is cheaper to brew close to the drinkers.",
        explanation: "Weight-gaining, fragile products favour market locations.",
      }),
    ],
    explanation: "This item practises applying location factors to choose a site.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6, applies: ZIM,
    hints: ["Compare raw-material-oriented and market-oriented industries in Zimbabwe.", "Reach a judgement about which factor is most important."],
    stem: "\"Raw materials are the most important factor in the location of industry in Zimbabwe.\" To what extent do you agree?",
    points: [
      "Raw materials dominate for weight-losing or perishable industries: sugar milling at Triangle and Hippo Valley.",
      "Ore smelting (ferrochrome at Kwekwe near the Great Dyke) and cotton ginning near growing areas.",
      "But markets and labour attract much manufacturing to Harare and Bulawayo (food, drink, clothing, printing).",
      "Transport (railways, roads) and power supply explain clusters along the main line of rail.",
      "Government policy (growth points, special economic zones) and agglomeration also matter.",
      "Judgement: raw materials matter most for primary processing; human factors matter most for most manufacturing.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "Raw materials are decisive for some Zimbabwean industries. Sugar mills at Triangle and Hippo Valley sit among the cane estates because cane is heavy and spoils quickly, and ferrochrome smelters at Kwekwe are close to the chrome of the Great Dyke. Cotton ginneries are in cotton-growing areas. However, most manufacturing is in Harare and Bulawayo, where the attraction is the large market, a big labour force, banks and head offices, and road, rail and air links. Food, drink and clothing factories gain from being near customers and from agglomeration. Government policies such as growth points have also tried to steer industry. I agree only partly: raw materials are most important for heavy processing industries, but human factors such as markets, labour and transport explain the location of most manufacturing.",
    explanation: "Weigh raw materials against other factors with Zimbabwean examples, then judge.",
  });

  b.card("DEFINITION", "Raw-material-oriented industry", "An industry sited near its raw materials because they are heavy, bulky, perishable or lose weight in processing (e.g. sugar milling).");
  b.card("DEFINITION", "Market-oriented industry", "An industry sited near its customers because the product gains weight, is bulky, fragile or perishable (e.g. bottling, baking).");
  b.card("DEFINITION", "Footloose industry", "An industry not tied to raw materials or markets, free to locate in many places (e.g. electronics, software).");
  b.card("DEFINITION", "Agglomeration", "The clustering of related industries so they share suppliers, services, skilled labour and infrastructure.");
  b.card("VOCABULARY", "Industrial inertia", "An industry staying in its original location after the first location factors have gone.");
  b.card("VOCABULARY", "Containerisation", "Moving goods in standard steel containers that transfer easily between ship, rail and lorry, cutting transport costs.");
  b.card("CONCEPT", "Physical location factors", "Raw materials, power, water and land (site).");
  b.card("CONCEPT", "Human location factors", "Labour, capital, markets, transport, government policy, technology and communications, agglomeration.");
  b.card("FACT", "Sugar milling location in Zimbabwe", "Triangle and Hippo Valley in the south-east Lowveld: next to irrigated cane estates, as cane is heavy and perishable.", undefined, { applies: ZIM });
});
