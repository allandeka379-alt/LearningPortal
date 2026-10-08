// Slice G3b: trade, imbalances and trading blocs (ZIMSEC 7.12.3).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.trade.patterns-blocs", { file: "trade/patterns-blocs", keyPrefix: "trade.patterns-blocs" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **balance of trade**?",
    options: [
      ["The value of exports minus the value of imports", "Correct: it compares what a country earns from selling goods abroad with what it spends on buying them."],
      ["The value of imports minus the value of exports", "This is the wrong way round; a deficit would then appear as a positive number."],
      ["The total value of all goods produced in a country", "This describes national output (GDP), not trade."],
      ["The weight of goods crossing a country's borders", "Trade balances are measured in money values, not weight."],
    ],
    answer: "A",
    explanation: "Balance of trade = exports − imports. Positive = surplus (favourable); negative = deficit (unfavourable).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an example of **domestic** trade?",
    options: [
      ["A farmer in Mutoko selling tomatoes at a market in Harare", "Correct: the buyer and seller are in the same country."],
      ["A Zimbabwean company selling tobacco to a buyer in China", "This crosses a national border, so it is foreign trade."],
      ["A Harare shop importing cooking oil from South Africa", "Importing is foreign trade."],
      ["A mine in Zimbabwe exporting chrome through Beira", "Exporting is foreign trade."],
    ],
    answer: "A",
    explanation: "Domestic (internal) trade takes place within one country; foreign trade crosses borders.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which pair describes Zimbabwe's trade most accurately?",
    options: [
      ["Exports mainly minerals and tobacco; imports mainly fuel and manufactured goods", "Correct: Zimbabwe exports primary products and imports processed and manufactured goods."],
      ["Exports mainly vehicles and machinery; imports mainly minerals and tobacco", "This reverses the real pattern."],
      ["Exports mainly crude oil; imports mainly gold and platinum", "Zimbabwe has no oil production and is a gold and platinum producer."],
      ["Exports mainly fish and timber; imports mainly maize and tobacco", "Fish and timber are not major exports, and Zimbabwe grows tobacco for export."],
    ],
    answer: "A",
    explanation: "Gold, platinum-group metals, nickel, chrome, diamonds, lithium and tobacco dominate exports; fuel, machinery, vehicles, chemicals and some foods dominate imports.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In which city is the **SADC** secretariat?",
    options: [
      ["Gaborone", "Correct: SADC's headquarters are in Gaborone, Botswana."],
      ["Lusaka", "Lusaka hosts the COMESA secretariat."],
      ["Abuja", "Abuja is the headquarters of ECOWAS."],
      ["Vienna", "Vienna is the headquarters of OPEC."],
    ],
    answer: "A",
    explanation: "SADC: Gaborone; COMESA: Lusaka; ECOWAS: Abuja; OPEC: Vienna.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How is **OPEC** different from a trading bloc such as SADC?",
    options: [
      ["It is a producers' group that agrees oil output to influence prices", "Correct: OPEC members co-ordinate oil production; they do not form a free trade area."],
      ["It removes all tariffs on goods traded between its members", "That is what a free trade area does; it is not OPEC's purpose."],
      ["It is made up only of countries in one region of Africa", "OPEC members are in Africa, the Middle East and South America."],
      ["It is a group of countries that import oil from abroad", "OPEC members are oil exporters, not importers."],
    ],
    answer: "A",
    explanation: "OPEC (formed in 1960, headquarters in Vienna) is an organisation of oil-exporting countries, including Nigeria, Algeria and Libya.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an **invisible** export for Zimbabwe?",
    options: [
      ["Money spent by foreign tourists at Victoria Falls", "Correct: tourism is a service, so the income is an invisible export."],
      ["Tobacco bales shipped to buyers overseas", "Tobacco is a physical good, so it is a visible export."],
      ["Platinum concentrate sent to a refinery abroad", "Minerals are goods, so they are visible exports."],
      ["Fuel imported through the Beira pipeline", "Fuel is a good, and it is an import, not an export."],
    ],
    answer: "A",
    explanation: "Visible trade is in goods; invisible trade is in services such as tourism, transport, banking and insurance.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do many African countries that export mainly raw materials tend to have **trade deficits**?",
    options: [
      ["Raw material prices are low and unstable, while manufactured imports cost more", "Correct: they earn little per tonne of exports but pay high prices for processed imports, so their terms of trade are poor."],
      ["They are not allowed to sell raw materials to other countries", "They do sell them; the problem is the low and unstable price."],
      ["Raw materials are always worth more than manufactured goods", "The opposite is generally true: processing adds value."],
      ["They import no manufactured goods from other countries", "They import large amounts of manufactured goods."],
    ],
    answer: "A",
    hints: ["Compare the value of a tonne of ore with the value of a machine made from it.", "Think about how prices of primary products change from year to year."],
    explanation: "Dependence on primary exports with falling or fluctuating prices, set against rising import prices, leads to deficits and debt.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which action would most directly help Zimbabwe **earn more** from each tonne of its mineral exports?",
    options: [
      ["Processing ores into refined metals before export", "Correct: processing (beneficiation) adds value, so each tonne sells for more and jobs are created at home."],
      ["Exporting larger amounts of unprocessed ore at lower prices", "This increases volume but lowers the value per tonne."],
      ["Raising import tariffs on fuel and machinery from abroad", "This affects imports, not the value of mineral exports."],
      ["Leaving every regional trading bloc it belongs to", "Leaving blocs would shrink markets rather than add value to exports."],
    ],
    answer: "A",
    hints: ["Think about value added."],
    explanation: "Adding value through processing and manufacturing is a main way to reduce trade imbalances.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which reason best explains why trade **between African countries** is a small share of their total trade?",
    options: [
      ["Many produce similar primary goods and links between neighbours are poor", "Correct: neighbours often have little to sell each other, and roads and railways mostly run to the coast."],
      ["African countries are not allowed to trade with each other", "There is no such ban; blocs such as SADC and COMESA promote it."],
      ["African countries have no goods that could be exported", "They export large amounts of minerals, oil and crops."],
      ["All African trade must first pass through Europe", "Goods can and do move directly between African countries."],
    ],
    answer: "A",
    hints: ["Think about what neighbouring countries produce.", "Think about the shape of African transport networks."],
    explanation: "Similar exports, transport networks built for export to overseas markets and border delays all limit intra-African trade.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Zimbabwe is a member of both SADC and COMESA.",
    answer: true,
    explanation: "True. Zimbabwe belongs to both SADC and COMESA, like several other countries in the region.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A country with a trade deficit earns more from its exports than it spends on its imports.",
    answer: false,
    explanation: "False. A deficit means imports are worth more than exports; a country that earns more from exports has a surplus.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each organisation with its description.",
    pairs: [
      ["SADC", "Southern African bloc with its secretariat in Gaborone"],
      ["COMESA", "Eastern and southern African common market based in Lusaka"],
      ["ECOWAS", "West African community with headquarters in Abuja"],
      ["OPEC", "Oil exporters' organisation with headquarters in Vienna"],
    ],
    explanation: "SADC (Gaborone), COMESA (Lusaka), ECOWAS (Abuja) and OPEC (Vienna).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "A tax on imported goods is a {{blank:a}}. A limit on the amount of a good that may be imported is a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["tariff"], choices: ["tariff", "quota", "subsidy", "surplus"] },
      { id: "b", accepted: ["quota"], choices: ["tariff", "quota", "subsidy", "deficit"] },
    ],
    explanation: "Trading blocs reduce or remove tariffs and quotas between their members.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A fictional country exported goods worth US\\$4.6 billion and imported goods worth US\\$3.9 billion. Calculate its balance of trade in billions of US dollars (use a minus sign for a deficit).",
    value: 0.7, tol: 0.005,
    wrong: [-0.7, 8.5],
    explanation: "Balance = exports − imports = 4.6 − 3.9 = +0.7, a surplus of US\\$0.7 billion.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "%",
    stem: "A fictional country's exports were worth US\\$8,000 million, of which tobacco earned US\\$1,200 million. What percentage of export earnings came from tobacco?",
    value: 15, tol: 0.05,
    wrong: [6.67, 1200],
    explanation: "1,200 ÷ 8,000 × 100 = 15%.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "%",
    stem: "A fictional country's exports rose from US\\$2,400 million to US\\$3,000 million in one year. Calculate the percentage increase.",
    value: 25, tol: 0.05,
    wrong: [20, 600],
    hints: ["Find the increase first.", "Divide the increase by the ORIGINAL value."],
    workedSolution: "1. Increase = 3,000 − 2,400 = 600.\n2. Percentage increase = 600 ÷ 2,400 × 100 = 25%.",
    explanation: "Increase of 600 divided by the original 2,400, times 100, gives 25%.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why countries trade with each other.",
    points: [
      "States a reason, such as uneven distribution of resources / different climates / surpluses and shortages / differences in skills and technology.",
      "Develops it with an explanation or example (for example Zimbabwe has platinum but no oil, so it exports minerals and imports fuel).",
      "States a second, different reason.",
      "Develops the second reason (for example specialising in what a country produces best lowers costs, and trade supplies the rest).",
    ],
    modelAnswer: "Resources are unevenly spread: Zimbabwe has platinum and gold but no oil, so it sells minerals and buys fuel. Climates differ, so tropical countries export crops such as tea and coffee that cooler countries cannot grow, and import goods they cannot make.",
    explanation: "Each reason needs explaining, ideally with an example.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how trade is unevenly distributed **within** Zimbabwe.",
    hints: ["Compare large cities with remote rural areas.", "Think about transport links."],
    points: [
      "Most trade is handled in the large cities such as Harare and Bulawayo (factories, banks, wholesalers, transport hubs).",
      "Mining and commercial farming areas with good road and rail links trade more.",
      "Remote rural / communal areas with poor transport trade little beyond local markets.",
    ],
    modelAnswer: "Harare and Bulawayo handle most trade because they have factories, wholesalers and the best transport links. Mining and farming areas near main roads and railways also trade a lot, while remote communal areas trade little beyond local markets.",
    explanation: "Internal trade imbalance follows the pattern of industry, wealth and transport.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 720,
    stem: "Table 1 shows the exports of a fictional southern African country in one year (US\\$ million, fictional data). Its imports in the same year were worth US\\$8,400 million.\n\n| Export | Gold | Platinum | Tobacco | Nickel | Other goods | Total |\n|---|---|---|---|---|---|---|\n| Value (US\\$ million) | 2,100 | 1,400 | 1,050 | 700 | 1,750 | 7,000 |",
    hints: ["Balance = exports − imports.", "Add the four named primary products before finding the percentage."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the balance of trade in US\\$ million (use a minus sign for a deficit).", value: -1400, wrong: [1400, 15400], explanation: "7,000 − 8,400 = −1,400, a deficit of US\\$1,400 million." }),
      P.num({ label: "(b)", unit: "%", stem: "Calculate the percentage of export earnings that came from gold, platinum, tobacco and nickel together.", value: 75, tol: 0.05, wrong: [25, 5250], explanation: "2,100 + 1,400 + 1,050 + 700 = 5,250; 5,250 ÷ 7,000 × 100 = 75%." }),
      P.mcq({
        label: "(c)", stem: "What does the table suggest about the country's economy?",
        options: [
          ["It depends heavily on exporting primary products", "Correct: three-quarters of export earnings come from minerals and an unprocessed crop."],
          ["It exports mainly manufactured goods", "The named exports are minerals and a farm crop, not manufactured goods."],
          ["It earns most of its income from tourism", "Tourism is an invisible export and is not shown in the table."],
          ["It imports less than it exports", "Imports (8,400) are greater than exports (7,000)."],
        ],
        answer: "A", explanation: "Heavy dependence on a few primary products is typical of many African economies.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain **two** problems the country may face because of this pattern of exports.",
        points: ["Earnings fall sharply when world prices of gold, platinum or tobacco fall (unstable income).", "Low value is added at home / few manufacturing jobs, and expensive imports lead to a deficit and debt."],
        modelAnswer: "If the world price of platinum or tobacco falls, export earnings drop sharply. Because the raw materials are processed abroad, jobs and profits from adding value are lost, and costly imports keep the trade balance in deficit.",
        explanation: "Dependence on primary products makes income unstable and limits value added.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest **two** ways the country could improve its balance of trade.",
        points: ["Add value before export (refine minerals, manufacture tobacco or other products).", "Diversify exports / promote tourism and other services / produce substitutes for imports / use regional markets in SADC and COMESA."],
        modelAnswer: "It could refine platinum and nickel before export so each tonne earns more, and develop new exports such as processed foods and tourism to reduce dependence on a few products.",
        explanation: "Value addition and diversification are the main strategies.",
      }),
    ],
    explanation: "This item practises balance-of-trade and percentage calculations and links the export pattern to trade imbalances.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 600,
    stem: "Table 2 shows where a fictional SADC country's exports went in two years (percentage of total exports, fictional data).\n\n| Destination | Year 1 (%) | Year 2 (%) |\n|---|---|---|\n| Other SADC countries | 22 | 31 |\n| Rest of Africa | 4 | 5 |\n| Europe | 34 | 26 |\n| Asia | 33 | 32 |\n| Rest of the world | 7 | 6 |",
    hints: ["Compare each row across the two years.", "Think about what a free trade area changes for members."],
    parts: [
      P.num({ label: "(a)", stem: "By how many percentage points did the share of exports going to other SADC countries change between Year 1 and Year 2?", value: 9, wrong: [41, -9], explanation: "31 − 22 = 9 percentage points (an increase)." }),
      P.num({ label: "(b)", unit: "%", stem: "What percentage of exports went to countries **outside Africa** in Year 2?", value: 64, wrong: [36, 58], explanation: "26 + 32 + 6 = 64%." }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest **two** reasons why exports to other SADC countries increased.",
        points: ["Reduced or removed tariffs under the SADC free trade area made goods cheaper for neighbours.", "Improved transport links / faster border crossing / nearby markets with lower transport costs."],
        modelAnswer: "Under the SADC free trade area tariffs on most goods were cut, so the country's goods became cheaper in neighbouring markets, and better roads and quicker border posts lowered transport costs.",
        explanation: "Trading blocs and better transport encourage regional trade.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Give **two** other reasons why countries form trading blocs.",
        points: ["To create a larger combined market that attracts investment and allows larger-scale production.", "To bargain together with powerful outside partners / protect members with a common external tariff / co-operate on shared infrastructure."],
        modelAnswer: "A bloc gives small economies a large shared market, attracting investors, and lets members negotiate together with large trading partners.",
        explanation: "Blocs form for market size, protection, bargaining power and co-operation.",
      }),
    ],
    explanation: "Regional exports rise when trading blocs lower barriers and transport links improve.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "Evaluate the advantages and disadvantages for Zimbabwe of belonging to regional trading blocs such as SADC and COMESA.",
    hints: ["Give advantages and disadvantages, each explained.", "End with a judgement on whether membership is beneficial overall."],
    points: [
      "Advantage: lower or no tariffs give Zimbabwean producers access to larger regional markets.",
      "Advantage: cheaper imports of goods from member countries for consumers and industries.",
      "Advantage: co-operation on transport corridors, border posts and power pools (for example the Beira and North–South corridors).",
      "Advantage: greater bargaining power with large outside trading partners; attracts investment to a larger market.",
      "Disadvantage: local industries may struggle against cheaper goods from stronger economies such as South Africa.",
      "Disadvantage: loss of customs revenue / overlapping memberships of SADC and COMESA create confusing rules.",
      "Judgement: benefits outweigh costs if Zimbabwe adds value to its exports and improves competitiveness; reasoned conclusion.",
    ],
    levels: geographyLevels(7),
    modelAnswer: "Membership of SADC and COMESA removes or lowers tariffs, so Zimbabwean goods reach a much larger market and imports from neighbours are cheaper for consumers and factories. The blocs also support shared projects such as transport corridors to Beira and Durban and faster border posts, which matter greatly to a landlocked country, and together members bargain more strongly with large outside partners. However, Zimbabwean manufacturers may struggle to compete with cheaper goods from South Africa, the government loses customs revenue, and belonging to two blocs with different rules adds cost and confusion for traders. On balance membership is beneficial, but the gains depend on Zimbabwe processing more of its own products so that it sells into the regional market rather than mainly buying from it.",
    explanation: "Evaluate both sides with Zimbabwean detail and reach a reasoned judgement.",
  });

  b.card("DEFINITION", "**Balance of trade**", "Value of exports minus value of imports; positive = surplus, negative = deficit.", undefined);
  b.card("DEFINITION", "Domestic vs foreign trade", "Domestic trade is within one country; foreign trade crosses borders and involves imports and exports.", undefined);
  b.card("DEFINITION", "Visible vs invisible trade", "Visible: trade in goods. Invisible: trade in services such as tourism, transport and banking.", undefined);
  b.card("DEFINITION", "**Tariff** and **quota**", "A tariff is a tax on imports; a quota is a limit on the quantity imported.", undefined);
  b.card("DEFINITION", "**Trading bloc**", "A group of countries that reduce or remove trade barriers between themselves.", "SADC, COMESA, ECOWAS, EU.");
  b.card("FACT", "Bloc headquarters", "SADC: Gaborone. COMESA: Lusaka. ECOWAS: Abuja. OPEC: Vienna.", undefined);
  b.card("CONCEPT", "OPEC", "A producers' organisation of oil exporters that agree on output to influence oil prices; not a free trade area.", "Formed in 1960.");
  b.card("CONCEPT", "Zimbabwe's trade pattern", "Exports: minerals (gold, platinum-group metals, nickel, chrome, diamonds, lithium) and tobacco. Imports: fuel, machinery, vehicles, chemicals.", "South Africa is the largest source of imports.");
  b.card("CONCEPT", "Why trading blocs form", "Remove tariffs, enlarge markets, attract investment, common external tariff, bargaining power, shared infrastructure.", undefined);
  b.card("CONCEPT", "Reducing trade imbalances", "Add value before export, diversify exports, improve transport links and use regional markets.", undefined);
});
