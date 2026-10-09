// W4b: econ.trade.international-trade — home and foreign trade compared, exports and imports, specialisation by
// country, advantages and disadvantages of international trade. Figures differ from the lesson's worked example.
import { concept, P, table, fmt, pct, pctChange, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.trade.international-trade", { file: "trade/international-trade", keyPrefix: "trade.international-trade" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **specialisation by country**?",
    options: [
      ["Concentrating on the goods it makes most efficiently and trading for others", "Correct."],
      ["A country producing every good its people need without any trade", "That is self-sufficiency, the opposite of specialisation."],
      ["A worker concentrating on one task in a factory", "That is the division of labour within a firm."],
      ["A government banning imports of any goods that are also made locally", "That is protection, not specialisation."],
    ],
    answer: "A",
    explanation: "Specialisation by country means using resources where they are most efficient (lowest cost) and relying on trade for other goods.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which feature applies to foreign trade but **not** to home trade?",
    options: [
      ["Currencies must be exchanged", "Correct: buyers and sellers in different countries usually use different currencies."],
      ["Goods are bought and sold for money", "Both home and foreign trade involve buying and selling."],
      ["Transport is needed to move goods to buyers", "Home trade also needs transport."],
      ["Traders try to make a profit", "Profit is a motive in both."],
    ],
    answer: "A",
    explanation: "Foreign trade involves exchanging currencies, customs procedures, longer distances and more risk.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which transaction is an **export** for Zimbabwe?",
    options: [
      ["A tourist from Germany pays for a safari in Hwange National Park", "Correct: a service sold to a non-resident brings money in."],
      ["A Zimbabwean family buys a car made in Japan", "This is an import."],
      ["A Harare firm buys maize from a farmer in Chinhoyi", "This is home trade."],
      ["A Zimbabwean student pays fees to a university in the United Kingdom", "This is an import of a service."],
    ],
    answer: "A",
    explanation: "Spending by foreign tourists is an (invisible) export: Zimbabwe sells a service and money flows in.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does foreign trade usually involve more **risk** than home trade?",
    options: [
      ["Exchange rates may change and payment from distant buyers is harder to enforce", "Correct."],
      ["Foreign buyers always pay in the seller's own currency", "Not always; often the seller must accept foreign currency."],
      ["There is always less demand for goods in foreign markets than in the home market", "World markets are much larger."],
      ["Home trade is not subject to any laws", "Home trade is regulated too."],
    ],
    answer: "A",
    explanation: "Exchange rate movements, distance, different laws and political events all add risk to foreign trade.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How does international trade allow firms to gain **economies of scale**?",
    options: [
      ["Larger markets let them raise output and lower average costs", "Correct."],
      ["It lets them charge higher prices to customers in their home market", "Economies of scale are about lower average costs, not higher prices."],
      ["It protects them from competition by foreign firms", "Trade increases competition."],
      ["It lets them avoid paying any taxes on their output", "Trade does not remove taxes."],
    ],
    answer: "A",
    hints: ["What happens to average cost as output grows?"],
    explanation: "Selling to world markets lets firms produce on a larger scale, spreading fixed costs and buying in bulk, so average costs fall.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which is the main **disadvantage** for a country that specialises in exporting one or two primary products?",
    options: [
      ["A fall in world prices of those products sharply reduces its export earnings", "Correct: narrow specialisation concentrates risk."],
      ["It cannot import any goods from other countries", "Specialised countries rely on imports."],
      ["It loses all of its comparative advantage in producing those products", "Specialising builds on comparative advantage."],
      ["Its producers face no foreign buyers", "Exports by definition have foreign buyers."],
    ],
    answer: "A",
    hints: ["Think about what happens when demand for its main product falls."],
    explanation: "Dependence on a few exports means price falls or demand shocks hit incomes, jobs, government revenue and foreign currency all at once.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an advantage of international trade for **consumers**?",
    options: [
      ["A wider choice of goods, often at lower prices", "Correct."],
      ["Protection of local firms from foreign competition", "Trade increases competition, so this is not a result of trade."],
      ["Fewer goods available in the shops", "Trade increases the range of goods."],
      ["Higher prices for imported goods", "Trade usually lowers prices."],
    ],
    answer: "A",
    explanation: "Imports widen choice and competition tends to lower prices and raise quality.",
  });

  // Numericals.
  {
    const ex = [["Platinum", 840], ["Cotton lint", 210], ["Beef", 280], ["Processed foods", 70]];
    const tot = ex.reduce((s, x) => s + x[1], 0), sh = (840 / tot) * 100;
    check("tot", tot, 1400); check("sh", sh, 60);
    const T = table(["Export", "Value (US\\$ million)"], ex);
    b.num({
      d: 2, skill: "APPLICATION", kind: "pct", value: sh, daily: true,
      stem: `The table shows the exports of a fictional country.\n\n${T}\n\nCalculate platinum's share of total exports, as a percentage to one decimal place.`,
      wrong: [(840 / (tot - 840)) * 100],
      explanation: `Total = ${ex.map((x) => x[1]).join(" + ")} = ${fmt(tot)}. Share = 840 ÷ ${fmt(tot)} × 100 = **${pct(sh, 1)}**. Dividing by the other exports only (560) gives ${pct((840 / 560) * 100, 1)}.`,
    });
  }
  {
    const ex2 = [["Copper", 900], ["Coffee", 150], ["Tea", 180], ["Cut flowers", 270]];
    const tot2 = ex2.reduce((s, x) => s + x[1], 0), fall = 0.2 * 900, fallPct = (fall / tot2) * 100;
    check("tot2", tot2, 1500); check("fallPct", fallPct, 12);
    const T2 = table(["Export", "Value (US\\$ million)"], ex2);
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "pct", value: fallPct, calculator: true,
      stem: `The table shows the exports of another fictional country.\n\n${T2}\n\nThe world price of copper falls by 20% while the quantity exported and all other exports stay the same. Calculate the percentage fall in the country's total export earnings. Give your answer to one decimal place.`,
      wrong: [20, (fall / (tot2 - fall)) * 100],
      hints: ["Work out the fall in copper earnings in US\\$ million.", "Express it as a percentage of total exports."],
      explanation: `1. Total exports = ${fmt(tot2)}; fall in copper earnings = 20% × 900 = ${fmt(fall)}.\n2. Total exports fall from ${fmt(tot2)} to ${fmt(tot2 - fall)}.\n3. Percentage fall = ${fmt(fall)} ÷ ${fmt(tot2)} × 100 = **${pct(fallPct, 1)}**. The fall is large because copper makes up 60% of exports.`,
    });
  }
  {
    const m0 = 2500, m1 = 2850, ch = pctChange(m0, m1);
    check("ch", ch, 14);
    b.num({
      d: 2, skill: "APPLICATION", kind: "pct", value: ch,
      stem: `A fictional country's imports rose from US\\$${fmt(m0)} million in 2025 to US\\$${fmt(m1)} million in 2026. Calculate the percentage increase in imports. Give your answer to one decimal place.`,
      wrong: [pctChange(m1, m0) * -1, m1 - m0],
      explanation: `(${fmt(m1)} − ${fmt(m0)}) ÷ ${fmt(m0)} × 100 = **${pct(ch, 1)}**. Use the 2025 value as the base.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Imports are goods and services bought by residents of a country from producers in other countries.",
    answer: true,
    explanation: "True. Money flows out of the country to pay for imports.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Only physical goods can be exported; services cannot be traded between countries.",
    answer: false,
    explanation: "False. Services such as tourism, transport, insurance and education are traded internationally (invisible trade).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each feature with the type of trade it describes best.",
    pairs: [
      ["Paid for in one currency", "Home trade"],
      ["Needs customs declarations at a border", "Foreign trade"],
      ["Gives producers access to much larger markets", "Specialisation and foreign trade"],
      ["Concentrating resources on the lowest-cost goods", "Specialisation by country"],
    ],
    explanation: "Home trade uses one currency; foreign trade crosses borders; specialisation lets countries sell to world markets and use resources where they are cheapest.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Choose the correct words.",
    template: "When Zimbabwe sells tobacco to China, tobacco is a {{blank:a}} export, and money flows {{blank:b}} Zimbabwe. When Zimbabweans buy insurance from a foreign company, this is an {{blank:c}} import.",
    blanks: [
      { id: "a", accepted: ["visible"], choices: ["visible", "invisible"] },
      { id: "b", accepted: ["into"], choices: ["into", "out of"] },
      { id: "c", accepted: ["invisible"], choices: ["visible", "invisible"] },
    ],
    wrong: [["invisible", "out of", "visible"]],
    explanation: "Goods are visible trade; services such as insurance are invisible. Exports bring money in.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **two** differences between home trade and foreign trade.",
    points: [
      "Currency: home trade uses one currency…",
      "…foreign trade needs currency exchange, with exchange rate risk.",
      "Regulations/distance/documents: home trade has one set of laws and shorter distances…",
      "…foreign trade involves customs duties, documents and longer, costlier transport.",
    ],
    modelAnswer: "First, home trade uses one currency, while foreign trade usually requires one currency to be exchanged for another, and changes in the exchange rate add risk. Second, home trade is under one set of laws over shorter distances, while foreign trade must pass through customs, with tariffs and documents such as certificates of origin, and goods travel further, which raises transport costs, especially for a landlocked country.",
    hints: ["Think about money, laws, distance and risk."],
    explanation: "Two marks per difference: each side of the comparison.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Explain why a country may benefit from importing goods that it could produce itself.",
    points: [
      "Other countries may produce the goods at a lower (opportunity) cost, so imports are cheaper.",
      "The country can use its resources on goods it produces more efficiently and export them.",
      "Total output and consumption rise; consumers gain lower prices and more choice.",
    ],
    modelAnswer: "Even if a country can make a good, other countries may produce it at a lower cost. By importing it, the country can move its resources into the goods it produces most efficiently, export those, and use the earnings to buy the imports. The country ends up with more goods in total, and consumers enjoy lower prices and more choice.",
    hints: ["Think about opportunity cost."],
    explanation: "Lower cost abroad → resources moved to best use → more total output.",
  });

  // Structured 1 (8 marks).
  {
    const ex = [["Tobacco", 650], ["Gold", 520], ["Citrus fruit", 130]];
    const exv = ex.map((x) => x[1]);
    const tot = exv.reduce((s, x) => s + x, 0), share = ((650 + 520) / tot) * 100;
    check("tot", tot, 1300); check("share", share, 90);
    const T = table(["Export", "Value in 2026 (US\\$ million)"], ex);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `Country D is a fictional landlocked country in southern Africa. Its exports in 2026 were:\n\n${T}\n\nIt imports almost all its fuel, vehicles and machinery.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: tot, stem: "Calculate the total value of Country D's exports, in US\\$ million.", wrong: [650 + 520], explanation: `650 + 520 + 130 = ${fmt(tot)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: share, stem: "Calculate the percentage of exports earned from tobacco and gold together. Give your answer to one decimal place.", wrong: [(650 / tot) * 100], explanation: `(650 + 520) ÷ ${fmt(tot)} × 100 = ${pct(share, 1)}.` }),
        P.manual({
          label: "(c)", marks: 2,
          stem: "Explain one problem Country D faces in foreign trade because it is landlocked.",
          points: ["It must transport exports and imports through neighbouring countries to reach ports.", "This raises transport costs and delays, making exports less competitive and imports dearer."],
          modelAnswer: "Country D has no seaport, so its exports and imports must travel by road or rail through neighbouring countries. This adds transport costs and border delays, which make its exports dearer abroad and its imports of fuel and machinery more expensive at home.",
          explanation: "Identify + effect.",
        }),
        P.manual({
          label: "(d)", marks: 3, levels: LV(3),
          stem: "Discuss whether Country D benefits from being so specialised.",
          points: [
            "Benefits: exports goods where it has a comparative advantage (tobacco, gold); earns foreign currency to import fuel and machinery it cannot make; scale and jobs.",
            "Risks: 90% of earnings from two products, so price falls, droughts or falling tobacco demand cut earnings sharply; dependence on imported essentials.",
            "Justified conclusion, e.g. benefits now but should diversify (e.g. processing, furniture and textiles).",
          ],
          modelAnswer: `Country D gains because it exports goods in which it has a comparative advantage, and the foreign currency pays for fuel, vehicles and machinery that it cannot make itself. However, ${pct(share, 0)} of its export earnings come from tobacco and gold, so a fall in their prices, a drought or falling world demand for tobacco would cut its earnings sharply, and it depends heavily on imported essentials. It benefits at present, but it should diversify gradually, for example by processing its products and developing manufacturing such as furniture and textiles.`,
          explanation: "Gains versus concentration risk; conclude.",
        }),
      ],
      hints: ["Share = value ÷ total × 100."],
      explanation: `Total exports US\\$${fmt(tot)} million; tobacco and gold make up ${pct(share, 1)}.`,
    });
  }
  // Structured 2 (12 marks).
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "A fictional developing country has cut its tariffs and opened its markets to foreign trade. Cheap imported clothing and electrical goods now fill its shops, while its mines and farms are selling more abroad. Some local clothing factories have closed.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which change in the passage is an example of an increase in exports?",
        options: [["Mines and farms selling more abroad", "Correct: goods sold to foreign buyers."], ["Imported clothing filling the shops", "These are imports."], ["Local clothing factories closing", "This is a result of import competition."], ["Cutting tariffs", "This is a change in trade policy."]],
        answer: "A",
        explanation: "Exports are goods and services sold to buyers in other countries.",
      }),
      P.tf({ label: "(b)", marks: 1, stem: "The closure of the clothing factories is likely to cause structural unemployment.", answer: true, explanation: "True. Workers lose jobs because of a change in the structure of the economy, and their skills may not suit other industries." }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** advantages of international trade for this country.",
        points: [
          "Consumers gain cheaper imported clothing and electrical goods and more choice…",
          "…raising their real incomes.",
          "Mines and farms sell to larger markets, earning foreign currency / gaining economies of scale…",
          "…which creates jobs and pays for imports.",
        ],
        modelAnswer: "First, consumers can buy cheaper clothing and electrical goods and have a wider choice, so their real incomes rise. Second, mines and farms can sell to much larger world markets; they earn foreign currency that pays for imports, gain economies of scale and create jobs in mining areas and on farms.",
        explanation: "Two marks per advantage.",
      }),
      P.manual({
        label: "(d)", marks: 6, levels: LV(6),
        stem: "Discuss whether the country has gained from opening its markets to foreign trade.",
        points: [
          "Gains: cheaper goods and choice for consumers; higher exports, foreign currency and jobs in mining and farming; competition raises efficiency.",
          "Gains: resources move to industries with comparative advantage; access to technology and inputs.",
          "Losses: clothing factories close; structural unemployment, workers' skills may not transfer; regional hardship.",
          "Losses: dependence on primary exports with volatile prices; infant manufacturing cannot develop; possible current account problems if imports grow faster.",
          "Depends on: whether displaced workers find jobs, how fast exports grow, government support (retraining).",
          "Justified conclusion.",
        ],
        modelAnswer: "Opening to trade has brought clear gains: consumers pay less for clothing and electrical goods and have more choice, and mines and farms are selling more abroad, earning foreign currency and creating jobs. Resources are moving into industries where the country has a comparative advantage, and competition pushes local firms to become more efficient. However, clothing workers have lost their jobs, and their skills may not suit mining or farming, so there is structural unemployment and hardship in some towns. The country also becomes more dependent on primary exports whose prices are volatile, and new manufacturing industries may find it hard to start. Whether the country has gained overall depends on how quickly displaced workers find new jobs and on how stable export prices are. On balance the country probably gains in total, but the government should help workers retrain and encourage processing of its minerals and crops so that the gains are shared more widely.",
        explanation: "Consumer and exporter gains versus job losses and dependence; conclude.",
      }),
    ],
    hints: ["Who gains and who loses from cheaper imports and higher exports?"],
    explanation: "Trade brings gains to consumers and exporters but costs to firms and workers that compete with imports.",
  });

  b.card("DEFINITION", "Define **home (domestic) trade** and **foreign trade**.", "Home trade: buying and selling within one country. Foreign trade: exchange of goods and services between countries.");
  b.card("DEFINITION", "Define **specialisation by country**.", "Concentrating resources on the goods a country produces most efficiently and trading for the rest.");
  b.card("DEFINITION", "What are **exports** and **imports**?", "Exports: goods/services sold to other countries (money in). Imports: goods/services bought from other countries (money out).");
  b.card("CONCEPT", "Give four differences between home and foreign trade.", "Currency exchange; distance and transport; customs laws and documents; language and culture; greater risk.");
  b.card("CONCEPT", "Give four advantages of international trade.", "Access to goods not produced at home; lower prices; more choice; larger markets and economies of scale; foreign currency; competition; technology.");
  b.card("CONCEPT", "Give four disadvantages of international trade and specialisation.", "Dependence on a few exports; dependence on imported essentials; closure of local firms; exchange rate risk; harm to infant industries.");
  b.card("FACT", "Is spending by foreign tourists in Zimbabwe an export or an import?", "An (invisible) export of services: money flows into Zimbabwe.");
  b.card("CONCEPT", "Why is a landlocked country at a disadvantage in foreign trade?", "Goods must travel through other countries to reach ports, adding transport costs and delays.");
});
