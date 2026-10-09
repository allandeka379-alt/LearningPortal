// W2b exam-format items, ZIMSEC Business Enterprise and Skills: P2 Section B essay (20), P1 structured (17, 16) and
// P2 Section A case study (40). Mark splits within items are ours (the syllabus does not print them).
import { concept, P, BES, money, table, f, check, round } from "../lib.mjs";

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

const L8 = [
  [3, 6, 8, "Well-developed explanation of a range of relevant points, applied with examples."],
  [2, 3, 5, "Some explanation of relevant points; limited development or examples."],
  [1, 1, 2, "Points identified or listed with little or no explanation."],
];
const L12 = [
  [3, 9, 12, "Balanced discussion of both sides, developed with examples, and a justified conclusion."],
  [2, 5, 8, "Some discussion, mostly one-sided or not fully developed; weak or unsupported conclusion."],
  [1, 1, 4, "Simple points with little explanation and no judgement."],
];

// --- 17-mark: TS Bricks ---
const tsSales = 96600, tsMkt = 420000, tsCosts = 81900, rivalSales = 37800;
const tsShare = f.marketShare(tsSales, tsMkt); // 23
const tsProfit = f.profit(tsSales, tsCosts); // 14700
const tsCombined = f.marketShare(tsSales + rivalSales, tsMkt); // 32
check("ts share", tsShare, 23);
check("ts combined", tsCombined, 32);

// --- 16-mark: market garden pump ---
const pumpCash = 690, pumpDep = 180, pumpInst = 64, pumpN = 10;
const pumpHp = pumpDep + pumpInst * pumpN; // 820
const pumpExtra = pumpHp - pumpCash; // 130

// --- 40-mark case: Zvido Bakeries ---
const yrs = ["Year 1", "Year 2"];
const zRev = [184000, 211600];
const zCost = [161500, 194800];
const zProfit = zRev.map((r, i) => f.profit(r, zCost[i])); // 22500, 16800
const zRevPct = ((zRev[1] - zRev[0]) / zRev[0]) * 100; // 15
const zMkt = 920000;
const zShare = f.marketShare(zRev[1], zMkt); // 23
const zRival = 64400;
const zCombined = f.marketShare(zRev[1] + zRival, zMkt); // 30
check("z pct", zRevPct, 15);
check("z combined", zCombined, 30);
if (!(zProfit[1] < zProfit[0])) throw new Error("case wording assumes profit fell");
const zTable = table(["", ...yrs], [
  ["Sales revenue (US\\$)", ...zRev],
  ["Total costs (US\\$)", ...zCost],
  ["Number of employees", 21, 29],
  ["Number of shops", 1, 2],
  ["Price paid for a 50 kg bag of flour (US\\$)", 38, 46],
]);

concept("bus.enterprise.business-growth", { file: "exam/w2b-bes", keyPrefix: "exam.w2b-bes", applies: BES }, (b) => {
  // BES P2 Section B essay (20).
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.enterprise.stakeholders", "bus.enterprise.objectives"],
    stem: "Every enterprise has stakeholders whose interests it must consider.",
    parts: [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Explain the interests of **four** stakeholders of a small manufacturing enterprise.",
        points: [
          ["Owners: profit, growth and a return on the capital they risked, with example.", 2],
          ["Employees: fair wages, safe conditions, job security, with example.", 2],
          ["Customers: good-quality products at fair prices, with example.", 2],
          ["One external group (suppliers, lenders, government, community) and its interest, with example.", 2],
        ],
        levels: L8,
        modelAnswer: "The **owners** of a small furniture workshop want profit as a reward for the savings they risked, and they may want the business to grow. **Employees** such as carpenters want fair wages paid on time, safe machines and secure jobs. **Customers** want strong, well-finished furniture at fair prices and delivered when promised. The **local community** wants jobs for local people, but it also wants the workshop to avoid noise late at night and to dispose of sawdust and off-cuts safely.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 550 },
        stem: "Discuss how conflicts between stakeholders can affect an enterprise, and how the enterprise should deal with them.",
        points: [
          ["Example of a conflict: owners want higher profit vs employees want higher wages / customers want lower prices.", 2],
          ["Effects: strikes, low morale and productivity, lost customers, poor reputation.", 2],
          ["Example of a conflict with the community or suppliers (pollution, late payment) and its effects (complaints, supply problems).", 2],
          ["Methods: consultation and communication; compromise.", 2],
          ["Methods: prioritising key stakeholders; acting responsibly (CSR); clear objectives.", 2],
          ["Justified conclusion on the best approach.", 2],
        ],
        levels: L12,
        modelAnswer: "Stakeholders often want different things. Owners want higher profit, while employees want higher wages and customers want lower prices; a decision that pleases one group can upset another. If wages are kept low to raise profit, workers may lose motivation, work slowly or leave, so output and quality fall. If prices are raised, customers may go to rivals. Conflicts with the community, for example over noise or waste, can lead to complaints to the local authority and damage the enterprise's reputation, while paying suppliers late can mean poorer service or stopped deliveries. An enterprise should first communicate and consult: explaining why a decision is needed and listening to concerns often reduces opposition. It can then compromise, for example by linking pay rises to higher output, or introducing changes gradually. It must sometimes prioritise the stakeholders it depends on most, usually customers and employees in a small enterprise, while acting responsibly towards the community. The best approach is consultation followed by fair compromise, because an enterprise cannot succeed for long if any key group is strongly opposed to it.",
      }),
    ],
    hints: ["(a) Name each stakeholder and what it wants, with an example.", "(b) Give examples of conflicts, their effects, then ways of managing them."],
    explanation: "(a) Owners, employees, customers and an external group, each with its interests. (b) Conflicts cause low morale, lost customers and complaints; consultation, compromise and responsible behaviour reduce them.",
  });

  // BES P1 structured (17).
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 1080, paper: "Paper 1", calculator: true,
    concepts: ["bus.enterprise.business-size", "bus.enterprise.business-growth"],
    stem: `Tariro and Sipho run TS Bricks (a fictional business), a brick-making partnership near Masvingo. It employs 18 workers. Last year its sales revenue was ${money(tsSales)} and its total costs were ${money(tsCosts)}. Total sales of bricks in the district were ${money(tsMkt)}. The partners want the business to grow. They can either buy a neighbouring brickfield, whose sales last year were ${money(rivalSales)}, or build a second kiln on their own site.`,
    parts: [
      P.short({
        label: "(a)", marks: 1,
        stem: "State **one** method of measuring business size, other than the number of employees.",
        accepted: ["capital employed", "sales revenue", "sales", "value of sales", "turnover", "output", "value of output", "volume of output", "market share"],
        rejected: ["profit", "profits"],
        wrong: ["profit"],
      }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate TS Bricks' market share last year as a percentage to one decimal place.", kind: "pct", value: tsShare, wrong: [round((tsSales / (tsMkt - tsSales)) * 100, 1)], explanation: `${tsSales.toLocaleString("en-GB")} ÷ ${tsMkt.toLocaleString("en-GB")} × 100 = ${tsShare.toFixed(1)}%.` }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate TS Bricks' profit last year.", kind: "money", value: tsProfit, wrong: [tsSales], explanation: `${money(tsSales)} − ${money(tsCosts)} = ${money(tsProfit)}.` }),
      P.num({ label: "(d)", marks: 2, stem: "Calculate the market share TS Bricks would have had if it had owned the neighbouring brickfield last year, as a percentage to one decimal place.", kind: "pct", value: tsCombined, wrong: [round(tsShare, 1)], explanation: `(${tsSales.toLocaleString("en-GB")} + ${rivalSales.toLocaleString("en-GB")}) ÷ ${tsMkt.toLocaleString("en-GB")} × 100 = ${tsCombined.toFixed(1)}%.` }),
      P.manual({
        label: "(e)", marks: 4,
        stem: "Explain **two** reasons why Tariro and Sipho may want TS Bricks to grow.",
        points: [
          "Economies of scale / lower average cost per brick.",
          "E.g. buying coal or fuel in bulk; more profit per brick.",
          "Higher profit / larger market share / more security against competitors.",
          "Explains the second reason applied to TS Bricks.",
        ],
        modelAnswer: "A larger business can buy fuel for its kilns in bulk and use its workers and equipment more fully, so the average cost of each brick falls and profit per brick rises. Growth would also increase TS Bricks' share of the district market, making it more secure against competitors and able to supply larger building contracts.",
      }),
      P.manual({
        label: "(f)", marks: 6,
        stem: "Recommend whether TS Bricks should buy the neighbouring brickfield or build a second kiln. Justify your recommendation.",
        points: [
          `Buying: market share rises at once (from ${round(tsShare, 1)}% to ${round(tsCombined, 1)}%) and removes a competitor.`,
          "Buying: expensive; may need a large loan; different working methods and staff to manage.",
          "Kiln: internal growth, lower cost, partners keep control and methods.",
          "Kiln: slower; extra bricks must be sold by winning customers from rivals.",
          "Considers finance available / profit of the business.",
          "Justified recommendation.",
        ],
        modelAnswer: `Buying the brickfield would raise TS Bricks' market share from ${round(tsShare, 1)}% to ${round(tsCombined, 1)}% immediately and remove a competitor, but it would probably need a large loan, and the partners would have to manage a second site and workers used to different methods. Building a second kiln is cheaper and keeps everything on one site under their control, although growth would be slower and they would have to win customers for the extra bricks. With a profit of only ${money(tsProfit)} last year, the partners cannot afford a large debt, so they should build the second kiln and consider buying the brickfield later once profits have grown.`,
      }),
    ],
    hints: ["(b)(d) Market share = sales of the business ÷ total market sales × 100.", "(c) Profit = revenue − total costs.", "(f) Compare speed, cost, risk and control."],
    explanation: `(a) Capital employed, sales, output or market share (not profit). (b) ${tsShare.toFixed(1)}%. (c) ${money(tsProfit)}. (d) ${tsCombined.toFixed(1)}%. (e) Economies of scale, profit, market share, security. (f) Justified choice between external and internal growth.`,
    workedSolution: `1. Market share = ${tsSales.toLocaleString("en-GB")} ÷ ${tsMkt.toLocaleString("en-GB")} × 100 = ${tsShare.toFixed(1)}%.\n2. Profit = ${tsSales.toLocaleString("en-GB")} − ${tsCosts.toLocaleString("en-GB")} = ${tsProfit.toLocaleString("en-GB")}.\n3. Combined share = ${(tsSales + rivalSales).toLocaleString("en-GB")} ÷ ${tsMkt.toLocaleString("en-GB")} × 100 = ${tsCombined.toFixed(1)}%.`,
  });

  // BES P1 structured (16).
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 1020, paper: "Paper 1", calculator: true,
    concepts: ["bus.environment.resources-capabilities", "bus.environment.business-environment"],
    stem: `Nyasha plans to start a market-gardening enterprise on a family plot near Chinhoyi, growing tomatoes and leafy vegetables for a nearby town. She studied horticulture at college and has a good reputation with local traders from working on a neighbour's farm. The plot has a borehole. She needs an irrigation pump, which costs ${money(pumpCash)} cash, or can be bought on hire purchase with a deposit of ${money(pumpDep)} and ${pumpN} monthly instalments of ${money(pumpInst)}. Rainfall in the area has been unreliable in recent seasons, and several large farms already supply vegetables to the town's supermarkets.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2,
        stem: "Classify each of Nyasha's resources.",
        template: "The borehole is a {{blank:a}} resource. Nyasha's knowledge of horticulture is an {{blank:b}} resource.",
        blanks: [
          { id: "a", accepted: ["tangible"], choices: ["tangible", "intangible"] },
          { id: "b", accepted: ["intangible"], choices: ["intangible", "tangible"] },
        ],
      }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the total hire purchase price of the pump.", kind: "money", value: pumpHp, wrong: [pumpInst * pumpN], explanation: `${money(pumpDep)} + ${pumpN} × ${money(pumpInst)} = ${money(pumpHp)}.` }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate how much more the pump costs on hire purchase than for cash.", kind: "money", value: pumpExtra, wrong: [pumpHp], explanation: `${money(pumpHp)} − ${money(pumpCash)} = ${money(pumpExtra)}.` }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Using the information, identify **one** strength, **one** weakness, **one** opportunity and **one** threat for Nyasha's enterprise.",
        points: [
          "Strength: horticulture training / reputation with traders / borehole.",
          "Weakness: lack of capital (cannot easily pay cash for the pump) / new, no record of her own.",
          "Opportunity: demand for vegetables from the nearby town / traders who know her.",
          "Threat: unreliable rainfall / competition from large farms.",
        ],
        modelAnswer: "Strength: her horticulture training and good reputation with traders. Weakness: little capital, so even the pump is hard to afford. Opportunity: a nearby town that buys vegetables. Threat: competition from large farms that already supply the supermarkets (and unreliable rainfall).",
      }),
      P.manual({
        label: "(e)", marks: 2,
        stem: "Explain how the unreliable rainfall acts as an ecological constraint on Nyasha's enterprise.",
        points: ["Crops need water; poor rains reduce yields or cause crop failure.", "She depends on the borehole and pump, raising costs / borehole may run low."],
        modelAnswer: "Without reliable rain, her vegetables depend entirely on irrigation from the borehole, so she must buy the pump and pay to run it, and in a very dry season the borehole may not supply enough water, cutting her output.",
      }),
      P.manual({
        label: "(f)", marks: 4,
        stem: "Recommend whether Nyasha should buy the pump for cash or on hire purchase. Justify your answer.",
        points: [
          `Hire purchase costs ${money(pumpExtra)} more in total.`,
          "But needs only a deposit now, keeping cash for seeds, fertiliser and transport.",
          "She can pay instalments from vegetable sales; risk if a season fails.",
          "Justified recommendation.",
        ],
        modelAnswer: `Paying cash is ${money(pumpExtra)} cheaper, but it would take most of a new enterprise's money. Hire purchase needs only ${money(pumpDep)} now, leaving cash for seeds, fertiliser and transport, and the instalments can be paid from vegetable sales. Because she has little capital and must buy other inputs before her first harvest, she should use hire purchase, accepting the extra cost to protect her cash.`,
      }),
    ],
    hints: ["(b) Deposit + number of instalments × instalment.", "(d) Strengths and weaknesses are internal; opportunities and threats are external."],
    explanation: `(a) Tangible; intangible. (b) ${money(pumpHp)}. (c) ${money(pumpExtra)}. (d) SWOT from the case. (e) Dependence on irrigation. (f) Justified choice; hire purchase protects her cash.`,
    workedSolution: `1. Instalments = ${pumpN} × ${pumpInst} = ${(pumpInst * pumpN).toLocaleString("en-GB")}.\n2. HP price = ${pumpDep} + ${(pumpInst * pumpN).toLocaleString("en-GB")} = ${pumpHp.toLocaleString("en-GB")}.\n3. Extra cost = ${pumpHp} − ${pumpCash} = ${pumpExtra}.`,
  });

  // BES P2 Section A case study (40).
  const gA = group("(a)", "Answer both parts.", [
    P.mcq({
      label: "(i)", stem: "Which of the following is an internal stakeholder of Zvido Bakeries?",
      options: [["The bakers employed by the partners", "Correct: employees are internal."], ["The flour supplier in Harare", "Suppliers are external."], ["The residents of the street", "The community is external."], ["The supermarket chain", "Competitors are external."]],
      answer: "A",
    }),
    P.fib({
      label: "(ii)", marks: 3,
      stem: "Classify the resources of Zvido Bakeries.",
      template: "The four ovens are {{blank:a}} resources. The head baker's twenty years of experience is an {{blank:b}} resource. The bakery's good name in Mutare is an {{blank:c}} resource.",
      blanks: [
        { id: "a", accepted: ["tangible"], choices: ["tangible", "intangible"] },
        { id: "b", accepted: ["intangible"], choices: ["intangible", "tangible"] },
        { id: "c", accepted: ["intangible"], choices: ["intangible", "tangible"] },
      ],
    }),
  ]);
  const gB = group("(b)", "Use Table 1.", [
    P.num({ label: "(i)", marks: 2, stem: "Calculate Zvido Bakeries' profit in Year 2.", kind: "money", value: zProfit[1], wrong: [zProfit[0]], explanation: `${money(zRev[1])} − ${money(zCost[1])} = ${money(zProfit[1])}.` }),
    P.num({ label: "(ii)", marks: 2, stem: "Calculate the percentage increase in sales revenue from Year 1 to Year 2, to one decimal place.", kind: "pct", value: zRevPct, wrong: [round(((zRev[1] - zRev[0]) / zRev[1]) * 100, 1)], explanation: `(${zRev[1].toLocaleString("en-GB")} − ${zRev[0].toLocaleString("en-GB")}) ÷ ${zRev[0].toLocaleString("en-GB")} × 100 = ${zRevPct.toFixed(1)}%.` }),
  ]);
  const gC = group("(c)", "Answer all parts.", [
    P.num({ label: "(i)", marks: 2, stem: `Total sales of bread and baked goods in Mutare in Year 2 were ${money(zMkt)}. Calculate Zvido Bakeries' market share in Year 2, to one decimal place.`, kind: "pct", value: zShare, wrong: [round((zRev[1] / (zMkt - zRev[1])) * 100, 1)], explanation: `${zRev[1].toLocaleString("en-GB")} ÷ ${zMkt.toLocaleString("en-GB")} × 100 = ${zShare.toFixed(1)}%.` }),
    P.num({ label: "(ii)", marks: 2, stem: `Mama's Bakery has annual sales of ${money(zRival)}. Calculate the market share of the combined business if Zvido buys it, to one decimal place (use Year 2 figures).`, kind: "pct", value: zCombined, wrong: [round(zShare, 1)], explanation: `(${zRev[1].toLocaleString("en-GB")} + ${zRival.toLocaleString("en-GB")}) ÷ ${zMkt.toLocaleString("en-GB")} × 100 = ${zCombined.toFixed(1)}%.` }),
    P.short({ label: "(iii)", marks: 1, stem: "State the type of integration if Zvido buys Mama's Bakery.", accepted: ["horizontal", "horizontal integration", "horizontal merger", "horizontal takeover"], wrong: ["vertical"] }),
  ]);
  const gD = group("(d)", "Answer both parts.", [
    P.mcq({
      label: "(i)", stem: "Which unethical practice did the new flour supplier suggest?",
      options: [["Giving short measure to customers", "Correct: lighter loaves sold at the full price."], ["Using child labour", "Nothing in the case involves children."], ["Bribing an official", "No official is involved."], ["Dumping waste in a river", "The case does not mention waste disposal."]],
      answer: "A",
    }),
    P.manual({
      label: "(ii)", marks: 2,
      stem: "Explain **one** reason why the partners were right to refuse the supplier's suggestion.",
      points: ["Short measure is dishonest and illegal / breaks consumer trust.", "Applied: the bakery's good name is its key resource; fines or lost customers would cost more than the saving."],
      modelAnswer: "Selling lighter loaves at the full price cheats customers and breaks the law; if discovered, Zvido could be fined and would lose the good name that brings customers to it.",
    }),
  ]);

  addSubResponses(b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 3000, paper: "Paper 2", calculator: true,
    concepts: [
      "bus.enterprise.stakeholders", "bus.environment.resources-capabilities", "bus.environment.business-environment",
      "bus.enterprise.ethics", "bus.enterprise.success-failure", "bus.communication.methods", "bus.enterprise.business-growth",
      "bus.enterprise.business-size",
    ],
    stem: [
      "**Zvido Bakeries** (a fictional business)",
      "",
      "Farai and Thandeka Moyo started Zvido Bakeries as a partnership in Mutare eight years ago. They began with one oven in a rented building, selling bread and buns to tuck shops and households in their suburb. Today the bakery has four ovens, a delivery van and a reputation for fresh, good-value bread. Its head baker, Mr Sibanda, has twenty years of experience and has trained most of the younger bakers. Many customers say that Zvido's bread \"tastes like home\", and its good name in Mutare is the partners' proudest achievement.",
      "",
      "The partners' objectives are to make a steady profit, to grow the business and to provide secure jobs for local people. Eighteen months ago, to grow, they opened a second shop in another suburb, managed by their nephew Tendai. Sales revenue rose, but profit fell (see Table 1).",
      "",
      `**Table 1: Zvido Bakeries, selected information**\n\n${zTable}`,
      "",
      "**Rising costs.** Wheat flour is the bakery's main raw material. Its price has risen sharply because of a poor wheat harvest and higher transport costs. The partners have not raised the price of their standard loaf, because they fear losing customers to a new in-store bakery opened by a supermarket chain in the town centre. The supermarket bakery sells a cheaper loaf and is open until late in the evening.",
      "",
      "A new flour supplier offered Zvido a lower price, on condition that the bakery bought larger quantities. The supplier's sales representative also suggested that Zvido could \"save more\" by making its 700 g loaves slightly lighter while keeping the label and the price the same. Farai and Thandeka refused this suggestion immediately.",
      "",
      "**Problems at the second shop.** Tendai is hard-working and popular with customers, but he has no training in management. He does not keep daily records of sales and stock. He often allows tuck-shop owners to take bread on credit, and some have not paid for months. At the end of each week unsold bread is thrown away. When Thandeka visited last month, she found that the shop could not say how much cash it had taken that week.",
      "",
      "**Communication.** The bakers start work at 3 a.m. in a hot, noisy bakery. Instructions about changes to orders are usually written on a scrap of paper by whichever partner took the order the evening before and left on the table. Last month, two large orders for a school function were baked with the wrong fillings, and the customer refused to pay. The bakers complain that they \"only hear about problems when something goes wrong\". Several have asked for regular meetings with the partners.",
      "",
      "**Staff.** Zvido now employs 29 people, most of them young bakers and shop assistants from the local area. The partners pay wages on time and give each worker a loaf of bread every day, and staff turnover has been low. However, since the second shop opened, Farai and Thandeka spend much of their time driving between the two sites, and the bakers say they see the partners less often than before.",
      "",
      "**Neighbours.** Residents living next to the main bakery have complained that the delivery van starts its engine and loads bread noisily before 5 a.m. They have threatened to report the bakery to the local authority.",
      "",
      "**A growth opportunity.** Mrs Chari, the owner of Mama's Bakery, a small bakery in a third suburb, wants to retire. She has offered to sell her business, including two ovens, her building and the goodwill of her loyal customers, to Zvido. The partners would need a bank loan to buy it. Thandeka thinks they should first solve the problems at the second shop. Farai thinks that if they do not buy Mama's Bakery, the supermarket chain might buy it instead.",
      "",
      "The partners must decide what to do in the next few months. They know that their reputation for fresh, honest bread is their greatest strength, and they want to protect it whatever they decide.",
    ].join("\n"),
    parts: [
      gA,
      gB,
      gC,
      gD,
      P.manual({
        label: "(e)", marks: 4,
        stem: "Using the case, identify **one** strength, **one** weakness, **one** opportunity and **one** threat for Zvido Bakeries.",
        points: [
          "Strength: reputation / experienced head baker / four ovens.",
          "Weakness: poor management and records at the second shop / poor internal communication.",
          "Opportunity: buying Mama's Bakery and its loyal customers.",
          "Threat: rising flour prices / supermarket bakery / neighbours' complaints.",
        ],
        modelAnswer: "Strength: its reputation for fresh, honest bread and its experienced head baker. Weakness: poor records and credit control at the second shop. Opportunity: buying Mama's Bakery with its loyal customers. Threat: the supermarket's cheaper in-store bakery (and rising flour prices).",
      }),
      P.manual({
        label: "(f)", marks: 5,
        stem: "Explain **two** causes of the problems at the second shop and suggest a solution for each.",
        points: [
          "Poor record keeping: no daily records of sales, stock or cash.",
          "Solution: keep daily sales and cash records / simple bookkeeping training.",
          "Too much credit to tuck shops: cash tied up in debts, some unpaid for months.",
          "Solution: limit credit, set payment dates, chase debts.",
          "Applied to Year 2 data: costs rose faster than revenue, so profit fell.",
        ],
        modelAnswer: `First, Tendai keeps no daily records, so nobody knows how much is sold, wasted or taken in cash; he should record sales, stock and cash every day, and the partners should arrange basic bookkeeping training for him. Second, he gives too much credit to tuck shops, some of which have not paid for months, so cash is tied up in debts; he should limit credit, set clear payment dates and chase what is owed. These problems help to explain why costs rose faster than revenue and profit fell from ${money(zProfit[0])} to ${money(zProfit[1])}.`,
      }),
      P.manual({
        label: "(g)", marks: 3,
        stem: "Recommend a better method of passing order changes to the bakers. Justify your answer.",
        points: [
          "Recommends a method, e.g. an order book or board in a fixed place plus a short briefing at the start of the shift / messaging group.",
          "Justifies: written record that cannot be lost; clear and checked.",
          "Justifies: two-way, bakers can ask questions (meets their request), avoiding errors like the school order.",
        ],
        modelAnswer: "The partners should write every order change in an order book kept on a board in the bakery and give a five-minute briefing at the start of each shift. The book gives a clear written record that cannot be lost like a scrap of paper, and the briefing lets bakers ask questions, which they have asked for and which would have prevented the mistake with the school order.",
      }),
      P.manual({
        label: "(h)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "Should Farai and Thandeka buy Mama's Bakery now? Evaluate the evidence and justify your decision.",
        points: [
          [`For: market share would rise from ${round(zShare, 1)}% to ${round(zCombined, 1)}%; growth objective; ovens, building and loyal customers acquired at once.`, 2],
          ["For: stops the supermarket chain buying it and becoming even stronger.", 2],
          [`Against: profit already fell (${money(zProfit[0])} to ${money(zProfit[1])}); a bank loan adds interest costs while flour prices rise.`, 2],
          ["Against: management problems at the second shop show they cannot yet control two shops; a third would stretch them further.", 2],
          ["Considers reputation and stakeholders: risk to quality and good name; jobs; neighbours.", 2],
          ["Justified decision (e.g. fix the second shop first, or buy only with a trained manager and records in place).", 2],
        ],
        levels: L12,
        modelAnswer: `Buying Mama's Bakery would help Zvido meet its growth objective. Its market share would rise from ${round(zShare, 1)}% to ${round(zCombined, 1)}%, and it would gain two ovens, a building and loyal customers immediately. Farai is also right that if the supermarket chain bought Mama's Bakery, Zvido's main competitor would become even stronger. However, the evidence suggests the partners are not ready. Profit fell from ${money(zProfit[0])} to ${money(zProfit[1])} even though sales rose by ${round(zRevPct, 1)}%, because flour costs have risen and the second shop is badly managed: it has no records, too much credit and wasted bread. A bank loan would add interest payments when profit is already falling, and a third shop would stretch the partners' time even further, risking the reputation for fresh, honest bread that is their greatest strength. I agree with Thandeka. The partners should first put records, credit control and a trained manager in place at the second shop, and make an offer for Mama's Bakery only when the second shop is profitable. If Mrs Chari cannot wait, they could ask her to accept payment in instalments, reducing the size of the bank loan.`,
      }),
    ],
    hints: [
      "(b)(i) Profit = revenue − total costs. (b)(ii) Divide the increase by the Year 1 figure.",
      "(c) Market share = sales of the business ÷ total market sales × 100.",
      "(h) Use the figures in Table 1 and the problems at the second shop before you decide.",
    ],
    explanation: `(a) Bakers (employees); tangible, intangible, intangible. (b) ${money(zProfit[1])}; ${zRevPct.toFixed(1)}%. (c) ${zShare.toFixed(1)}%; ${zCombined.toFixed(1)}%; horizontal. (d) Short measure; dishonest, illegal and damaging to reputation. (e) SWOT from the case. (f) Poor records and too much credit. (g) Order book and shift briefing. (h) A justified decision weighing growth against falling profit and weak management.`,
    workedSolution: `1. Year 2 profit = ${zRev[1].toLocaleString("en-GB")} − ${zCost[1].toLocaleString("en-GB")} = ${zProfit[1].toLocaleString("en-GB")}.\n2. Increase in revenue = ${(zRev[1] - zRev[0]).toLocaleString("en-GB")}; ${(zRev[1] - zRev[0]).toLocaleString("en-GB")} ÷ ${zRev[0].toLocaleString("en-GB")} × 100 = ${zRevPct.toFixed(1)}%.\n3. Market share = ${zRev[1].toLocaleString("en-GB")} ÷ ${zMkt.toLocaleString("en-GB")} × 100 = ${zShare.toFixed(1)}%.\n4. Combined share = ${(zRev[1] + zRival).toLocaleString("en-GB")} ÷ ${zMkt.toLocaleString("en-GB")} × 100 = ${zCombined.toFixed(1)}%.`,
  }), [gA, gB, gC, gD]);
});
