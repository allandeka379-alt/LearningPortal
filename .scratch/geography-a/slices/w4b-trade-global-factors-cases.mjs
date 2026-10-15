// W4b: trade.global-factors-cases (both boards). Case facts kept general and dated: Zambia (independence 1964; copper dominant;
// 2020 bond payment default; landlocked) and South Korea (export-led industrialisation from the 1960s; chaebol; KORUS/EU agreements).
// All numerical data are illustrative. Computed: tariff 15% of 200 = 30 -> 230; HHI A 5 480, B 2 100; car tariff 20% of 10 000 = 2 000 -> 12 000.
import { concept, P, geographyLevels, chk, sum, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w4b-_q.mjs";

const tar = chk(0.15 * 200, 30, 1e-9);
const price = chk(200 + tar, 230, 1e-9);
const A = [72, 8, 6, 0, 14], B = [25, 20, 15, 15, 25];
chk(sum(A), 100); chk(sum(B), 100);
const hhiA = chk(sum(A.map((x) => x * x)), 5480);
const hhiB = chk(sum(B.map((x) => x * x)), 2100);
const carTar = chk(0.2 * 10000, 2000, 1e-9);
const carPrice = chk(10000 + carTar, 12000, 1e-9);
const carGap = chk(carPrice - 11500, 500, 1e-9);
const top2 = chk(72 + 8, 80);
const AT = tbl(["Export", "Share of export earnings (%)"], [["Copper", 72], ["Cobalt", 8], ["Tobacco", 6], ["Other", 14]]);
const hhiA2 = chk(72 ** 2 + 8 ** 2 + 6 ** 2 + 14 ** 2, 5480);

concept("ageo.trade.global-factors-cases", { file: "trade/global-factors-cases", keyPrefix: "trade.global-factors-cases" }, (b) => {
  mc(b, 1, "RECALL", "What is protectionism?", [
    ["Policies that shield home producers from imports", "Correct: tariffs, quotas and subsidies are examples."],
    ["Policies that remove all barriers to imports", "That is free trade."],
    ["The protection of wild animals in national parks and reserves", "That is conservation."],
    ["The insurance of ships that carry goods", "That is marine insurance."],
  ], "**Protectionism** shields home producers from imports.");
  mc(b, 2, "UNDERSTANDING", "How did colonialism affect the trade pattern of many African countries?", [
    ["Colonies supplied raw materials, with routes built to ports", "Correct: this pattern often persists."],
    ["Colonies were encouraged to build factories to export cars abroad", "Industrial development was usually discouraged."],
    ["Colonies stopped trading with all other countries", "Trade continued with the ruling country."],
    ["Colonies had no mineral or farm resources to trade", "Many exported minerals and crops."],
  ], "Colonies **supplied raw materials**; routes served mines and farms.");
  mc(b, 2, "UNDERSTANDING", "Which of these is a transnational corporation from a newly emerging economy?", [
    ["Samsung of South Korea", "Correct: it produces and sells in many countries."],
    ["A village cooperative selling honey locally", "It is a local business."],
    ["A district council road department", "It is a public body."],
    ["A one-person market stall", "It is a small trader."],
  ], "**Samsung** is a TNC from an emerging economy.");
  mc(b, 3, "APPLICATION", "Why does copper-dependent Zambia find it hard to control its export earnings?", [
    ["The copper price is set on world exchanges and Zambia cannot set it", "Correct: producers are price takers."],
    ["Zambia sets the world price of copper each month for all buyers", "Zambia cannot set world prices."],
    ["Copper is not wanted by industry anywhere", "Copper is widely used."],
    ["Zambia has no copper deposits", "Copper is Zambia's main resource."],
  ], "Commodity producers are **price takers**.", { hints: ["Think about where copper prices are set."] });
  mc(b, 3, "ANALYSIS", "Which factor best explains why South Korea gained more from trade than Zambia between the 1960s and today?", [
    ["A strategy of exporting manufactures backed by investment in education", "Correct: manufactures carry more value and skills raise productivity."],
    ["A larger amount of copper under its soil", "South Korea has few mineral resources."],
    ["A landlocked position far from the sea and from large markets", "South Korea is coastal."],
    ["A policy of closing its borders to all trade", "South Korea promoted exports."],
  ], "South Korea pursued **export-led industrialisation** with skills.", { hints: ["Compare what each country mainly exports."] });
  mc(b, 4, "EVALUATION", "A government puts a 20% tariff on imported cars to protect a local assembly plant. Which statement is the best evaluation?", [
    ["The plant may gain, but buyers pay more and partners may retaliate", "Correct: it recognises gains and costs."],
    ["The tariff only helps; there are no costs to buyers or to other countries", "Buyers face higher prices."],
    ["The tariff lowers the price of imported cars", "It raises the price."],
    ["The tariff stops all cars from being bought", "People can still buy cars."],
  ], "A tariff has **winners and losers**.", { hints: ["Think about who pays the tariff."] });
  b.tf({ d: 1, skill: "RECALL", stem: "Zambia is a landlocked country.", answer: true,
    feedbackTrue: "Correct: Zambia has no coastline and uses ports in neighbouring countries.",
    feedbackFalse: "Not so: Zambia has no coastline.",
    explanation: "Zambia's goods travel through ports in other countries." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A tariff raises the price paid by consumers for imported goods.", answer: true,
    feedbackTrue: "Correct: the tax is added to the import price.",
    feedbackFalse: "Not so: a tariff is a tax that raises the price of imports.",
    explanation: "Tariffs increase the price of imports." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A firm that owns production in several countries is a {{blank:a}} corporation. A development strategy that builds industry to sell abroad is {{blank:b}}-led industrialisation.",
    blanks: [
      { id: "a", accepted: ["transnational"], choices: ["transnational", "village", "district"] },
      { id: "b", accepted: ["export"], choices: ["export", "import", "tourism"] },
    ], explanation: "**Transnational**; **export**-led." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each country to the description of its trade.",
    pairs: [
      ["Zambia", "Landlocked and dependent on copper exports"],
      ["South Korea", "Coastal exporter of vehicles, ships and semiconductors"],
      ["Newly emerging economy", "Fast-growing country moving towards high income"],
      ["Protectionism", "Policies that shield home producers from imports"],
    ], explanation: "Each is a key term or case." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "US$",
    stem: "A machine is imported at US\\$200 and a tariff of 15% is charged. Calculate the price after the tariff, in US\\$.",
    hints: ["Find 15% of 200 and add it."],
    value: price, wrong: [30, 215],
    explanation: "Tariff = 0.15 × 200 = 30. Price = 200 + 30 = **US\\$230**. The value 30 is the tariff only." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "units",
    stem: `Shares of a country's export earnings (illustrative data):\n\n${AT}\n\nCalculate the concentration index, the sum of the squares of the shares (72² + 8² + 6² + 14²).`,
    hints: ["Square each share and add the results."],
    value: hhiA2, wrong: [100, 80],
    explanation: "72² = 5 184; 8² = 64; 6² = 36; 14² = 196. Sum = **5 480**. A value near 10 000 means exports are highly concentrated." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "US$",
    stem: "An imported car costs US\\$10 000 and a tariff of 20% is charged. A locally assembled car costs US\\$11 500. Calculate how much more the imported car costs than the local car after the tariff, in US\\$.",
    hints: ["Add the tariff to the import price, then compare with the local price."],
    value: carGap, wrong: [2000, 1500],
    explanation: "1. Tariff = 0.20 × 10 000 = 2 000.\n2. Imported price = 12 000.\n3. Difference = 12 000 − 11 500 = **US\\$500**." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the Zambian mining region that produces most of the country's copper.",
    accepted: ["Copperbelt", "the Copperbelt", "Copperbelt Province"], wrong: ["Lusaka"],
    explanation: "The **Copperbelt**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "What name is given to the large family-owned conglomerates, such as Samsung and Hyundai, that led South Korea's industrial growth?",
    accepted: ["chaebol", "chaebols"], wrong: ["cartel"],
    explanation: "**Chaebol**." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how logistics and information technology have increased global trade.",
    hints: ["Think about containers, tracking and online orders."],
    points: [
      "Container shipping makes loading and unloading quick and cuts costs per unit.",
      "Larger ships and better ports carry more goods cheaply.",
      "Tracking systems and the internet let firms order, pay and monitor goods across the world.",
      "Air freight allows urgent or perishable goods to reach distant markets.",
    ],
    modelAnswer: "Container shipping makes loading and unloading quick and cuts costs per unit, and larger ships and better ports carry more goods cheaply. Tracking systems and the internet let firms order, pay and monitor goods across the world, and air freight lets urgent or perishable goods reach distant markets.",
    explanation: "Containers, ports, ICT and air freight." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how trade blocs affect the trade of their members.",
    hints: ["Think about tariffs, volume and non-members."],
    points: [
      "Members reduce or remove tariffs on goods traded between them.",
      "Trade between members increases because goods are cheaper than those from outside.",
      "Non-members may face higher barriers and may lose markets.",
    ],
    modelAnswer: "Members reduce or remove tariffs on goods traded between them, so trade between members increases because the goods are cheaper than those from outside. Non-members may face higher barriers and may lose markets.",
    explanation: "Lower internal tariffs raise internal trade." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, applies: CAM,
    stem: "Using Zambia as an example, explain why dependence on copper exports makes a country vulnerable.",
    hints: ["Give a dated fact about prices or debt."],
    points: [
      "Copper provides well over half of Zambia's export earnings, so there are few other sources of foreign currency.",
      "The price is set on world markets, so earnings change when the price changes.",
      "When copper prices fell from 2014 and 2015, the currency weakened and government finances came under strain.",
      "High borrowing and a missed payment on a foreign bond in 2020 led to debt restructuring talks, which shows the risk.",
    ],
    modelAnswer: "Copper provides well over half of Zambia's export earnings, so there are few other sources of foreign currency, and the price is set on world markets, so earnings change when the price changes. When copper prices fell from 2014 and 2015 the currency weakened and government finances came under strain, and high borrowing and a missed payment on a foreign bond in 2020 led to debt restructuring talks.",
    explanation: "Dependence, price taking and dated effects." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `The table shows the share of export earnings of a country dependent on copper (illustrative data).\n\n${AT}`,
    hints: ["Concentration index = sum of the squared shares.", "Add the shares of the two metals."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the concentration index, the sum of the squares of the four shares.", value: hhiA, unit: "units", wrong: [100, 80],
        explanation: "5 184 + 64 + 36 + 196 = 5 480." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage of export earnings that comes from copper and cobalt together.", value: top2, unit: "%", wrong: [72, 94],
        explanation: "72 + 8 = 80%." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why this country is vulnerable to changes in world metal prices.",
        points: [
          "Most export earnings come from two metals, so a fall in their price cuts foreign currency sharply.",
          "Prices are set on world markets, so the country is a price taker and cannot control them.",
        ],
        modelAnswer: "Most export earnings come from two metals, so a fall in their price cuts foreign currency sharply, and prices are set on world markets so the country cannot control them.",
        explanation: "Dependence and price taking." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two ways in which the country could reduce its dependence on copper.",
        points: [
          "Process the metal or make products from it to add value.",
          "Develop other exports such as farm products, tourism or manufactures.",
        ],
        modelAnswer: "Process the metal or make products from it to add value, and develop other exports such as farm products, tourism or manufactures.",
        explanation: "Value addition and diversification." }),
    ], explanation: "Analyse export concentration and vulnerability." });

  b.struct({ d: 4, skill: "EVALUATION",
    stem: "A government introduces a 20% tariff on imported cars to protect a local assembly plant. An imported car costs US\\$10 000 and a local car US\\$11 500 (illustrative data).",
    hints: ["Tariff = 20% of the import price.", "Think of consumers, the plant and trading partners."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the tariff on one imported car, in US\\$.", value: carTar, unit: "US$", wrong: [200, 10000],
        explanation: "0.20 × 10 000 = US\\$2 000." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the price of the imported car after the tariff, in US\\$.", value: carPrice, unit: "US$", wrong: [2000, 11500],
        explanation: "10 000 + 2 000 = US\\$12 000." }),
      P.num({ label: "(c)", marks: 1, stem: "By how much does the imported car now exceed the price of the local car, in US\\$?", value: carGap, unit: "US$", wrong: [2000, 1500],
        explanation: "12 000 − 11 500 = US\\$500." }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain the effects of the tariff on consumers and on the local plant.",
        points: [
          "Buyers pay more for imported cars and have less choice.",
          "The local plant now sells at a lower price than imports, so it gains sales and may add jobs.",
          "Without foreign competition, the plant may have less reason to improve quality or cut costs.",
          "Government collects tariff revenue on the cars that are still imported.",
        ],
        modelAnswer: "Buyers pay more for imported cars and have less choice. The local plant now sells at a lower price than imports, so it gains sales and may add jobs, but with less foreign competition it may have less reason to improve quality or cut costs. The government collects revenue on cars that are still imported.",
        explanation: "Consumers pay more; the plant gains protection; efficiency and revenue effects." }),
      P.manual({ label: "(e)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Assess whether protectionism is a good strategy for a developing country.",
        points: [
          "It can protect new industries ('infant industries') while they learn and grow.",
          "It may raise prices, reduce choice and cause trading partners to retaliate.",
          "Protection without a plan to become competitive can keep industries inefficient.",
          "Judgement: temporary, targeted protection tied to improvement can help; permanent protection usually costs consumers.",
        ],
        wordLimit: { max: 150 },
        modelAnswer: "Protection can shield new industries while they learn and grow, but it may raise prices, reduce choice and make partners retaliate, and without a plan to become competitive it can keep industries inefficient. I conclude that temporary, targeted protection tied to improvement can help, but permanent protection usually costs consumers.",
        explanation: "Weigh infant-industry gains against costs and judge." }),
    ], explanation: "Calculate a tariff effect and assess protectionism." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, applies: CAM,
    stem: "Using two contrasting countries, assess the extent to which a country's trade position is explained by its resources.",
    hints: ["Use Zambia and South Korea or other examples with dated facts.", "Reach a judgement."],
    points: [
      "Zambia's copper resource gives most of its export earnings and drove growth in the 2000s.",
      "Resource dependence leaves Zambia exposed to price falls, as in 2014 and 2015, and to debt problems, as in 2020.",
      "South Korea has few mineral resources yet became a major exporter of manufactures.",
      "South Korea's success came from state-led export policies from the 1960s, large firms and investment in education.",
      "Location matters: South Korea has ports on the coast, whereas Zambia is landlocked.",
      "Colonial history shaped Zambia's role as a raw-material supplier.",
      "Trade policy, skills and technology decide how much value a country keeps.",
      "Judgement: resources influence what a country exports, but policy, skills, location and history explain how much it gains.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Zambia's copper provides most of its export earnings and drove growth in the 2000s, but dependence left it exposed to price falls in 2014 and 2015 and to debt problems that led to a missed bond payment in 2020. South Korea has few mineral resources yet became a major exporter of manufactures through state-led export policies from the 1960s, large firms and investment in education, and its coastal location with ports helps trade, whereas Zambia is landlocked and its role as a raw-material supplier was shaped by colonial history. I conclude that resources influence what a country exports, but policy, skills, location and history explain how much it gains.",
    wordLimit: { max: 300 }, explanation: "Compare resources with policy, skills and location, and judge." });

  b.card("DEFINITION", "Protectionism", "Policies such as tariffs, quotas and subsidies that shield domestic producers from foreign competition.");
  b.card("DEFINITION", "Transnational corporation (TNC)", "A company that owns or controls production or services in more than one country; examples include Samsung, Tata and Huawei.");
  b.card("CONCEPT", "Factors influencing trade", "Physical (location, resources), historical (colonial legacy), economic (prices, logistics, finance, workforce) and political (blocs, protection).");
  b.card("CONCEPT", "Price taker", "A producer that cannot set the price of its product, as with copper priced on world exchanges.");
  b.card("FACT", "Zambia's trade", "Landlocked; copper from the Copperbelt provides well over half of export earnings; a missed bond payment in 2020 led to debt restructuring talks.", undefined, { applies: CAM });
  b.card("FACT", "South Korea's trade", "Export-led industrialisation from the 1960s through chaebol; exports vehicles, semiconductors, ships and petrochemicals.", undefined, { applies: CAM });
  b.card("FORMULA", "Price after a tariff", "Price after tariff = import price × (1 + tariff rate).");
  b.card("CONCEPT", "Effects of a tariff", "Higher prices and less choice for consumers, protection for local firms, revenue for government, possible retaliation.");
  b.card("CONCEPT", "Containerisation and ICT", "Containers, large ships, air freight and online systems cut transport and communication costs and expanded global trade.");
});
