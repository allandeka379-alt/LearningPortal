// W1b exam-format items, Cambridge IGCSE Business 0264: Paper 1 (20 marks) and a complete Paper 2 case study (80 marks).
// Mark splits within parts are ours. Cambridge does not assess exchange-rate calculations: none are asked.
import { concept, P, CAM, money, table, sum, f, round, check } from "../lib.mjs";

// Sub-parts: a STRUCTURED part holding (i), (ii) ... answered by label path, e.g. "(a)(i)".
function group(label, stem, subs) {
  const marks = subs.reduce((t, x) => t + x.part.marks, 0);
  return { part: { label, type: "STRUCTURED", marks, stem, parts: subs.map((x) => x.part) }, model: null, wrong: [], subs };
}
function addSubResponses(q, groups) {
  const model = {};
  const wrong = {};
  for (const g of groups) {
    for (const x of g.subs) {
      if (x.model) model[g.part.label + x.part.label] = x.model;
      if (x.wrong[0]) wrong[g.part.label + x.part.label] = x.wrong[0];
    }
  }
  if (Object.keys(model).length) q.modelResponse = { type: "STRUCTURED", parts: { ...(q.modelResponse?.parts ?? {}), ...model } };
  if (Object.keys(wrong).length) q.wrongResponses = [{ type: "STRUCTURED", parts: { ...(q.wrongResponses?.[0]?.parts ?? {}), ...wrong } }];
  return q;
}

const LV8 = [
  [3, 6, 8, "Two or more points explained and clearly applied to the business in the case."],
  [2, 3, 5, "Points explained with limited application to the case."],
  [1, 1, 2, "Points identified with little explanation or application."],
];
const LV12 = [
  [3, 9, 12, "Developed analysis of both options or sides, applied to the case, with a justified recommendation or conclusion."],
  [2, 5, 8, "Analysis of relevant points with some application; conclusion weakly supported."],
  [1, 1, 4, "Points identified or described with little analysis, application or judgement."],
];

// --- Paper 1 stimulus ---
const exportsByMarket = [["Botswana", 84000], ["Zambia", 63000], ["Mozambique", 41000]];
const exportTotal = sum(exportsByMarket.map(([, v]) => v)); // 188,000
const homeSales = 236000;
const revenueP1 = exportTotal + homeSales; // 424,000
const costsP1 = 377000;
const profitP1 = f.profit(revenueP1, costsP1); // 47,000
const botswanaMarket = 1200000;
const shareP1 = f.marketShare(84000, botswanaMarket); // 7
check("p1 export total", exportTotal, 188000);
check("p1 profit", profitP1, 47000);
check("p1 share", shareP1, 7);

// --- Paper 2 appendices ---
const years = ["Year 1", "Year 2"];
const salesHome = [610000, 545000];
const salesExport = [190000, 260000];
const salesTotal = years.map((_, i) => salesHome[i] + salesExport[i]);
const costJars = [72000, 61000];
check("p2 sales", salesTotal[1], 805000);
const M = (n) => money(n);
if (!(salesTotal[1] > salesTotal[0])) throw new Error("p2: wording assumes total sales rose");

const app1 = table(["", ...years], [
  ["Sales in Zimbabwe (US\\$)", ...salesHome],
  ["Export sales (US\\$)", ...salesExport],
  ["Total sales revenue (US\\$)", ...salesTotal],
  ["Cost of imported glass jars (US\\$)", ...costJars],
]);
const app2 = [
  "- Every jar must show a full list of ingredients, the net weight, a best-before date and the name and address of the producer.",
  "- Health claims (for example \"good for your heart\") are allowed only if they can be supported by evidence.",
  "- A product described as \"natural\" or \"pure\" must not contain added colourings, flavourings or preservatives.",
  "- Businesses have twelve months to change their labels. Products that break the rules may be withdrawn from sale and the business fined.",
].join("\n");
const zFactoryCost = 900000;
const optA = [zFactoryCost, 420000];
const optB = [85000, 150000];
if (!(optB[1] / optB[0] > 1.7 && optA[1] / optA[0] < 0.5)) throw new Error("p2: option ratio wording");
const app3 = table(["", "Option A: factory in Zambia", "Option B: online exports"], [
  ["Initial cost (US\\$)", optA[0], optB[0]],
  ["Expected extra sales revenue in the first year (US\\$)", optA[1], optB[1]],
  ["Time before sales start", "18 months", "4 months"],
  ["Main risk", "unfamiliar laws and managing staff abroad", "delivery costs and online competition"],
]);

const gA = group("(a)", "Answer both parts.", [
      P.mcq({
        label: "(i)", stem: "What is meant by the **appreciation** of a currency?",
        options: [["A rise in its value against another currency", "Correct: one unit buys more of the other currency."], ["A fall in its value against another currency", "That is depreciation."], ["A rise in the general level of prices", "That is inflation."], ["A tax on imported goods", "That is a tariff."]],
        answer: "A",
      }),
      P.num({ label: "(ii)", marks: 1, stem: "Calculate Zambezi Footwear's total export sales last year.", kind: "money", value: exportTotal, wrong: [revenueP1] }),
]);
const gB = group("(b)", "Use Table 1.", [
      P.num({ label: "(i)", marks: 2, stem: "Calculate Zambezi Footwear's profit last year.", kind: "money", value: profitP1, wrong: [revenueP1, costsP1 - homeSales] }),
      P.num({ label: "(ii)", marks: 2, stem: "Calculate Zambezi Footwear's market share in Botswana. Give your answer as a percentage to one decimal place.", kind: "pct", value: shareP1, wrong: [round((84000 / exportTotal) * 100, 1)] }),
]);

concept("bus.economy.globalisation", { file: "exam/w1b-cambridge", keyPrefix: "exam.w1b-cambridge", applies: CAM }, (b) => {
  addSubResponses(b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1350, paper: "Paper 1", calculator: true,
    concepts: ["bus.economy.exchange-rates", "bus.economy.globalisation"],
    stem: [
      "**Zambezi Footwear** (a fictional business) is a private limited company in Bulawayo that makes school shoes. It sells in Zimbabwe and exports to three neighbouring countries. Most of its leather and soles are bought from suppliers in South Africa. Over the last year the US dollar has appreciated against the currencies of the countries it exports to and buys from. A regional free trade agreement means Zambezi pays no tariffs on these exports.",
      "",
      `**Table 1: Zambezi Footwear, results for last year**\n\n${table(["", "US\\$"], [...exportsByMarket.map(([m, v]) => [`Export sales: ${m}`, v]), ["Sales in Zimbabwe", homeSales], ["Total costs", costsP1]])}`,
      "",
      `The total market for school shoes in Botswana last year was worth ${money(botswanaMarket)}.`,
    ].join("\n"),
    parts: [
      gA,
      gB,
      P.manual({
        label: "(c)", marks: 6,
        stem: "Explain **two** ways in which the appreciation of the US dollar could affect Zambezi Footwear.",
        points: [
          ["Exports: shoes become dearer for buyers in neighbouring countries in their own currencies.", 1],
          ["So export sales may fall / Zambezi less competitive against local shoemakers there.", 1],
          ["Applied to Zambezi's export markets (e.g. Botswana, where it holds a small market share).", 1],
          ["Imports: South African leather and soles cost fewer US dollars.", 1],
          ["So costs fall, raising profit margins or allowing lower prices.", 1],
          ["Applied: most of its materials come from South Africa, so the saving is significant.", 1],
        ],
        modelAnswer: "First, Zambezi's shoes become more expensive for buyers in Botswana, Zambia and Mozambique when converted into their currencies, so its exports are less competitive and sales may fall, especially in Botswana where it has only a small share of the market. Second, because each dollar now buys more rand, the leather and soles it buys from South Africa cost fewer dollars. Its costs fall, so it can earn a higher margin on each pair or cut prices to protect its export sales.",
      }),
      P.manual({
        label: "(d)", marks: 8,
        stem: "Should Zambezi Footwear continue to export, or concentrate on sales in Zimbabwe? Justify your answer.",
        points: [
          ["Exports are a large part of revenue (over two-fifths), so stopping would cut sales sharply.", 2],
          ["Exporting spreads risk across markets; free trade agreement means no tariffs.", 2],
          ["Appreciation makes exports dearer and less competitive; cheaper inputs partly offset this.", 2],
          ["Justified recommendation weighing the evidence.", 2],
        ],
        levels: [
          [3, 6, 8, "Weighs evidence from the case on both sides and reaches a justified decision."],
          [2, 3, 5, "Analysis of one side, or both sides with little use of the case."],
          [1, 1, 2, "Simple points with no judgement."],
        ],
        modelAnswer: `Exports earned ${money(exportTotal)} of Zambezi's ${money(revenueP1)} revenue, so stopping would cut its sales by more than two-fifths, and the business made a profit of only ${money(profitP1)}. Selling in several countries spreads risk if demand in Zimbabwe falls, and the free trade agreement means no tariffs. Against this, the stronger dollar makes its shoes dearer abroad, and it has only a ${shareP1}% share of the Botswana market, so rivals there may win customers. However, its imported materials are now cheaper, which helps it to keep export prices competitive. Zambezi should continue to export, using its lower material costs to hold its prices, because giving up such a large share of its revenue would harm the business far more than the exchange-rate change does.`,
      }),
    ],
    hints: ["(a)(ii) Add the three export markets.", "(b)(i) Profit = revenue − total costs; revenue includes sales in Zimbabwe.", "(b)(ii) Market share = sales of the business ÷ total market sales × 100."],
    explanation: `(a)(i) A rise in value against another currency. (a)(ii) ${money(exportTotal)}. (b)(i) ${money(revenueP1)} − ${money(costsP1)} = ${money(profitP1)}. (b)(ii) 84,000 ÷ 1,200,000 × 100 = ${shareP1}%. (c) Dearer exports, cheaper imported materials. (d) A justified decision using the case.`,
    workedSolution: `1. Export sales = 84,000 + 63,000 + 41,000 = ${exportTotal.toLocaleString("en-GB")}.\n2. Total revenue = ${exportTotal.toLocaleString("en-GB")} + ${homeSales.toLocaleString("en-GB")} = ${revenueP1.toLocaleString("en-GB")}.\n3. Profit = ${revenueP1.toLocaleString("en-GB")} − ${costsP1.toLocaleString("en-GB")} = ${profitP1.toLocaleString("en-GB")}.\n4. Market share = 84,000 ÷ 1,200,000 × 100 = ${shareP1.toFixed(1)}%.`,
  }), [gA, gB]);

  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 5400, paper: "Paper 2",
    concepts: ["bus.economy.globalisation", "bus.economy.exchange-rates", "bus.consumer.legal-protection", "bus.organisation.multinationals", "bus.marketing.ecommerce"],
    stem: [
      "**Nhimbe Foods Ltd** (a fictional business)",
      "",
      "Nhimbe Foods Ltd (NF) is a private limited company in Harare that makes peanut butter, jams and fruit spreads. It was started fifteen years ago by Tendai and Rudo Marufu in a rented kitchen, selling jars to tuck shops in their neighbourhood. Today NF employs 140 workers in a factory in an industrial area of Harare and sells through supermarkets across Zimbabwe. Its brand is known for using local groundnuts and fruit bought from small-scale farmers, and its slogan is \"Pure taste of home\".",
      "",
      "NF's peanut butter is made using machines imported from Asia. The glass jars are bought from a supplier in South Africa because no local firm can supply jars of the right quality in the quantities NF needs. Most other inputs, such as groundnuts, sugar and fruit, are bought in Zimbabwe.",
      "",
      "NF's objectives, agreed by its board of directors, are to grow sales revenue by at least 10% a year, to remain profitable and to keep buying from local farmers. About 600 small-scale farmers in Mashonaland supply groundnuts to NF under contracts that guarantee them a fixed price before planting. NF provides seed and advice, and in return the farmers must meet its quality standards. This system gives NF a reliable supply of good groundnuts and has helped its reputation as a business that supports rural communities.",
      "",
      "Production is organised in batches: the factory makes peanut butter for several days, then cleans the machines and switches to jam. Quality checks take place at each stage. The factory is working at about 70% of its capacity, so it could produce more without new machinery.",
      "",
      "**Growing competition.** Over the last five years the shelves of Zimbabwean supermarkets have filled with imported spreads. Some come from large multinational food companies; others come from newly industrialised countries, where factories produce at very low cost. Container shipping and better road links through neighbouring countries have made it cheaper to bring these products into Zimbabwe. NF's managers believe that some imported spreads are sold at prices below NF's costs. Sales in Zimbabwe fell in Year 2 (see Appendix 1).",
      "",
      "**Exports.** At the same time, NF has found new customers abroad. Zimbabwe belongs to a regional free trade agreement, so NF's products enter several neighbouring countries without tariffs. Supermarkets in Zambia and Botswana now stock NF's peanut butter, and export sales rose strongly in Year 2. Rudo, the Marketing Director, receives orders by email and through a buyers' website, and customers pay electronically. She believes exports could grow much further: \"Customers in the region like our product. They trust a brand made from local groundnuts.\"",
      "",
      "**Exchange rates.** NF keeps its accounts in US dollars. During Year 2 the US dollar appreciated against the South African rand and against the currencies of NF's export markets. The Finance Director, Farai Gumbo, told the board: \"The stronger dollar has helped our costs, but our customers in Zambia and Botswana now find our jars more expensive in their own currencies. If the dollar keeps rising, we may lose those markets to cheaper rivals.\"",
      "",
      "**New labelling rules.** The government has announced new rules on food labelling to protect consumers from misleading promotion (see Appendix 2). Some of NF's jam contains a preservative, so it may no longer be able to use the slogan \"Pure taste of home\" on all its products. Tendai is worried: \"Our labels and adverts were designed around that slogan. Changing them will cost money, and some customers may think our products have changed.\" Rudo sees an opportunity: \"If every firm must tell the truth, customers will see that our peanut butter really is natural, while some imports are not.\"",
      "",
      "Rudo believes that the market for natural food products is growing in the region as incomes rise and consumers become more concerned about health. NF's research shows that customers in Zambia and Botswana are willing to pay more for spreads with short lists of natural ingredients, but that they compare prices carefully on the supermarket shelf.",
      "",
      "**Expansion.** The board wants to grow NF's international sales and is considering two options (see Appendix 3). Option A is to build a factory in Zambia, making NF a multinational company. The factory would be close to customers in Zambia and nearby countries and would buy groundnuts from Zambian farmers. Option B is to sell directly to consumers and shops in the region through NF's own website and online marketplaces, delivering from the Harare factory by courier. The board has enough retained profit to pay for Option B, but Option A would need a large bank loan.",
      "",
      "Tendai prefers Option A: \"A factory in Zambia would make us a real regional business. We would avoid the long delivery journeys and could react quickly to local tastes.\" Farai is more cautious: \"Zambia's laws, wages and culture are different, and we have never managed staff abroad. Option B is cheaper and we can start quickly.\"",
      "",
      "The board will meet next month to agree a plan for the next three years. The directors know that the business must respond to stronger competition at home, the changing exchange rate and the new labelling rules at the same time as it decides how to expand abroad. Whatever they decide, Tendai and Rudo want NF to keep its links with local farmers, which they see as the heart of the brand. Farai has asked each director to set out the evidence for their preferred choices, using the figures in the appendices, before the meeting.",
      "",
      `**Appendix 1: Selected financial information**\n\n${app1}`,
      "",
      `**Appendix 2: Summary of the new food labelling rules**\n\n${app2}`,
      "",
      `**Appendix 3: Expansion options**\n\n${app3}`,
    ].join("\n"),
    parts: [
      group("(1)", "Question 1", [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Explain **two** reasons for globalisation that have affected NF.",
        points: [
          ["Identifies a reason, e.g. improved transport links (container shipping, roads).", 1],
          ["Explains how it caused globalisation: cheaper, faster movement of goods between countries.", 1],
          ["Applies to NF: imported spreads now reach Zimbabwean supermarkets cheaply.", 2],
          ["Identifies a second reason, e.g. free trade agreements / technology and communication / newly industrialised countries.", 1],
          ["Explains how it caused globalisation.", 1],
          ["Applies to NF: tariff-free exports to Zambia and Botswana / orders by email and website / low-cost rivals.", 2],
        ],
        levels: LV8,
        modelAnswer: "**Improved transport links**: container shipping and better roads through neighbouring countries have made it cheaper to move goods between countries. This is why imported spreads now fill Zimbabwean supermarket shelves and compete with NF. **Free trade agreements**: Zimbabwe's regional agreement removes tariffs between members, which encourages trade across borders. As a result NF's peanut butter enters Zambia and Botswana without tariffs, helping its export sales to rise in Year 2.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "Consider the opportunities and threats that globalisation has created for NF. Do you think globalisation has been good or bad for NF overall? Justify your answer.",
        points: [
          [`Opportunity: tariff-free access to export markets; export sales rose from ${M(salesExport[0])} to ${M(salesExport[1])}.`, 2],
          ["Opportunity: cheaper imported machinery and jars / online orders and electronic payment widen the market.", 2],
          [`Threat: cheaper imports from multinationals and NICs; home sales fell from ${M(salesHome[0])} to ${M(salesHome[1])}.`, 2],
          ["Threat: exposure to exchange-rate changes / dependence on a foreign jar supplier.", 2],
          [`Analysis using Appendix 1: total sales rose only slightly, from ${M(salesTotal[0])} to ${M(salesTotal[1])}, so export growth just outweighed lost home sales.`, 2],
          ["Justified overall judgement.", 2],
        ],
        levels: LV12,
        modelAnswer: `Globalisation has given NF new opportunities. The free trade agreement lets it sell to Zambia and Botswana without tariffs, and export sales rose from ${M(salesExport[0])} in Year 1 to ${M(salesExport[1])} in Year 2. It also buys machinery from Asia and jars from South Africa, and online ordering and electronic payment make exporting easier. However, globalisation has also brought cheaper imported spreads from multinationals and newly industrialised countries, and NF's sales in Zimbabwe fell from ${M(salesHome[0])} to ${M(salesHome[1])}. NF is also exposed to exchange-rate changes and depends on a foreign supplier for its jars. Overall, total sales rose slightly, from ${M(salesTotal[0])} to ${M(salesTotal[1])}, because export growth more than made up for lost home sales. Globalisation has therefore been good for NF so far, but only because it has exported successfully; if the dollar keeps rising and imports keep growing, the balance could change, so NF must keep its costs down and build its brand.`,
      }),
      ]),
      group("(2)", "Question 2", [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Explain **two** ways in which the appreciation of the US dollar has affected NF.",
        points: [
          ["Identifies effect on imported inputs: jars from South Africa cost fewer US dollars.", 1],
          ["Explains: lower costs, higher profit margin or scope to cut prices.", 1],
          [`Applies with evidence: cost of imported jars fell from ${M(costJars[0])} to ${M(costJars[1])}.`, 2],
          ["Identifies effect on exports: products dearer for buyers in Zambia and Botswana.", 1],
          ["Explains: less price-competitive; risk of losing orders to cheaper rivals.", 1],
          ["Applies: Farai's warning; export sales still rose so far, perhaps because of brand trust.", 2],
        ],
        levels: LV8,
        modelAnswer: `First, NF buys its glass jars from South Africa. Because each dollar now buys more rand, the jars cost fewer dollars: the cost of imported jars fell from ${M(costJars[0])} to ${M(costJars[1])}, which lowers NF's costs and raises its profit margin. Second, NF's peanut butter is now more expensive for customers in Zambia and Botswana in their own currencies, so it is less competitive against cheaper rivals. Export sales still rose in Year 2, perhaps because customers trust the brand, but Farai fears that a further rise in the dollar could cost NF these markets.`,
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "Farai suggests two ways to protect NF's export sales from a further rise in the US dollar: (1) cut its export prices, or (2) keep prices the same and spend more on promoting the brand in Zambia and Botswana. Which option should NF choose? Justify your answer.",
        points: [
          ["Option 1: lower prices offset the stronger dollar and keep NF competitive.", 2],
          ["Option 1: reduces profit margin; savings on jars could fund it; rivals may cut too.", 2],
          ["Option 2: builds brand loyalty so customers are less sensitive to price.", 2],
          ["Option 2: promotion costs money and takes time; may not work if price gap is large.", 2],
          ["Uses the case: customers trust a brand made from local groundnuts; export sales rose despite the stronger dollar.", 2],
          ["Justified recommendation.", 2],
        ],
        levels: LV12,
        modelAnswer: "Cutting export prices would offset the stronger dollar, keeping NF's jars competitive in Zambia and Botswana. The lower cost of imported jars gives NF some room to do this. However, it reduces the profit on each export sale, and rivals may simply cut their prices too. Spending on promotion would build brand loyalty, so customers become less sensitive to price; the case suggests customers already trust a brand made from local groundnuts, which may be why export sales rose even though the dollar appreciated. But promotion costs money, takes time to work, and will fail if NF's prices become much higher than rivals'. I recommend option (2), supported by small price cuts only if needed, because NF's competitive advantage is its trusted, natural brand rather than low price, and multinationals and low-cost producers will always be able to undercut it.",
      }),
      ]),
      group("(3)", "Question 3", [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Explain **two** effects of the new labelling rules on NF's marketing.",
        points: [
          ["Identifies effect on promotion: slogan \"Pure taste of home\" cannot be used on jam with a preservative.", 1],
          ["Explains: must change adverts and brand message; loss of strong selling point.", 1],
          ["Applies: Tendai's concern that labels and adverts were designed around the slogan; customers may think products changed.", 2],
          ["Identifies effect on packaging / product: labels must list ingredients, weight, best-before date.", 1],
          ["Explains: redesign and reprinting costs; possibly reformulate jam without preservative.", 1],
          ["Applies: twelve months to change; risk of withdrawal and fines.", 2],
        ],
        levels: LV8,
        modelAnswer: "First, NF's promotion must change. Its jam contains a preservative, so the slogan \"Pure taste of home\" cannot be used on it. NF must redesign adverts built around that slogan, losing a strong selling point, and, as Tendai fears, some customers may think the products have changed. Second, NF's packaging must change. Every jar must list the ingredients, net weight, best-before date and producer's details, so NF must redesign and reprint its labels within twelve months, adding to costs. If it fails, its products could be withdrawn from sale and it could be fined.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "Tendai thinks the new labelling rules are bad for NF. Rudo thinks they are an opportunity. Who do you agree with? Justify your answer.",
        points: [
          ["Tendai: costs of new labels and adverts; loss of slogan on jam.", 2],
          ["Tendai: customer confusion; risk of fines if rules are broken.", 2],
          ["Rudo: honest labelling shows peanut butter really is natural; consumer trust.", 2],
          ["Rudo: imports with additives cannot claim to be natural, so NF can differentiate itself from cheaper rivals.", 2],
          ["Possible response: reformulate jam without preservatives; keep slogan for products that qualify.", 2],
          ["Justified judgement.", 2],
        ],
        levels: LV12,
        modelAnswer: "Tendai is right that the rules bring costs. NF must redesign labels and adverts, it may lose its slogan on the jam, and some customers may be confused; breaking the rules could mean fines and products withdrawn. However, Rudo's view is stronger. The rules stop every business making false claims, so imported spreads with additives can no longer be called natural, while NF's peanut butter, made from local groundnuts, can honestly keep its claim. This gives NF a way to stand out from cheaper imports. NF could also remove the preservative from its jam so that the whole range qualifies. I agree with Rudo: the costs are short-term, but honest labelling plays to NF's greatest strength at a time when it needs to compete on quality rather than price.",
      }),
      ]),
      group("(4)", "Question 4", [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Explain **two** advantages to NF of becoming a multinational company by building a factory in Zambia (Option A).",
        points: [
          ["Identifies: closer to customers / lower transport costs.", 1],
          ["Explains: cheaper, faster delivery and fresher stock for Zambian and nearby customers.", 1],
          ["Applies: avoids long delivery journeys; react quickly to local tastes (Tendai).", 2],
          ["Identifies: avoids exchange-rate and trade risks / local inputs / larger scale.", 1],
          ["Explains: costs and revenue in the same currency; local groundnuts; economies of scale.", 1],
          ["Applies with evidence: the larger expected extra revenue in the first year (Appendix 3).", 2],
        ],
        levels: LV8,
        modelAnswer: `First, the factory would be close to customers in Zambia and nearby countries, so NF would avoid long delivery journeys from Harare, cutting transport costs and delivery times, and it could adapt its products quickly to local tastes, as Tendai says. Second, the factory would buy groundnuts from Zambian farmers and sell in the same currency, so changes in the US dollar would matter much less to its Zambian business. Appendix 3 also shows the larger potential: ${M(optA[1])} of extra revenue in the first year, compared with ${M(optB[1])} from online sales.`,
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "Should NF choose Option A (a factory in Zambia) or Option B (online sales to the region)? Justify your answer using the case and Appendix 3.",
        points: [
          ["Option A: larger expected revenue but a much higher initial cost and 18 months before sales.", 2],
          ["Option A: needs a large bank loan; risks of unfamiliar laws, wages and managing staff abroad.", 2],
          ["Option B: low initial cost, paid from retained profit, sales in 4 months.", 2],
          ["Option B: smaller expected revenue; delivery costs; online competition; still exposed to exchange rates.", 2],
          ["Compares risk and return, e.g. revenue relative to cost for each option.", 2],
          ["Justified recommendation.", 2],
        ],
        levels: LV12,
        modelAnswer: `Option A promises the larger increase in revenue, ${M(optA[1])} in the first year, and would reduce NF's exposure to the dollar and to transport costs. But it costs ${M(optA[0])}, needs a large bank loan, and earns nothing for 18 months. NF has never managed a business abroad, and Zambia's laws, wages and culture are different, so the risk is high. Option B costs only ${M(optB[0])}, which NF can pay from retained profit, and sales start in 4 months. Its expected revenue is smaller, ${M(optB[1])}, and NF would still face delivery costs, online competition and exchange-rate changes. However, Option B's revenue in the first year is almost twice its cost, while Option A's revenue is less than half of its cost. I recommend Option B now: it is affordable and low-risk, and it would test demand across the region. If online sales grow strongly, NF will have better information and more retained profit to consider a Zambian factory later.`,
      }),
      ]),
    ],
    hints: ["Use the case and the appendices in every answer.", "In each (b) part, weigh both sides and finish with a justified decision."],
    explanation: "Q1: globalisation (transport, free trade agreements, technology, NICs; exports up, home sales down). Q2: a stronger dollar lowers the cost of imported jars but makes exports dearer. Q3: labelling rules raise costs but reward honest, natural products. Q4: a Zambian factory offers more revenue at far greater cost and risk than online exports.",
  });
});
