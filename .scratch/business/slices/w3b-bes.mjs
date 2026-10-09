// W3b exam-format items, ZIMSEC Business Enterprise and Skills: Paper 1 structured (17 and 16 marks), Paper 2
// Section A case study (40 marks) and a Section B essay (20 marks). Mark splits are ours (not printed in the syllabus).
import { concept, P, BES, f, money, r2, round, table, check } from "../lib.mjs";

const L8 = [
  [3, 6, 8, "Well-developed explanation of relevant points, applied to an enterprise."],
  [2, 3, 5, "Some explanation of relevant points; limited application."],
  [1, 1, 2, "Points identified with little or no explanation."],
];
const L12 = [
  [3, 9, 12, "Balanced discussion, developed with examples, and a justified conclusion."],
  [2, 5, 8, "Some discussion, mostly one-sided or not fully developed; weak conclusion."],
  [1, 1, 4, "Simple points with little explanation and no judgement."],
];
const LMIX = [
  [3, 9, 12, "A consistent mix for the target market, each element justified with case evidence, and a clear overall recommendation."],
  [2, 5, 8, "Relevant elements of the mix explained with some use of the case; limited justification."],
  [1, 1, 4, "Elements of the mix listed with little explanation or application."],
];

// ---- P1 17-mark: jam enterprise ----
const jFixed = 540, jVc = 1.05, jQ = 900, jMu = 40, jRival = 1.9;
const jTc = f.totalCost(jFixed, f.totalVariableCost(jVc, jQ)); // 1485
const jAc = f.averageCost(jTc, jQ); // 1.65
const jCp = r2(jAc * (1 + jMu / 100)); // 2.31
const jProfitRival = r2((jRival - jAc) * jQ); // 225

// ---- P1 16-mark: bakery quality and technology ----
const bkMade = 3200, bkRej = 112;
const bkRate = (bkRej / bkMade) * 100; // 3.5
const bkOut0 = 2400, bkW0 = 8, bkOut1 = 3200, bkW1 = 8;
const bkP0 = f.labourProductivity(bkOut0, bkW0); // 300
const bkP1 = f.labourProductivity(bkOut1, bkW1); // 400
const bkPct = ((bkP1 - bkP0) / bkP0) * 100; // 33.33

// ---- P2 40-mark case study: Sunrise Snacks ----
const survey = [["Very likely to buy", 62], ["Quite likely to buy", 82], ["Unlikely to buy", 56], ["Would never buy", 40]];
const sTot = survey.reduce((s, r) => s + r[1], 0); // 200
check("survey", sTot, 240);
const likely = survey[0][1] + survey[1][1]; // 120
const likelyPct = (likely / sTot) * 100; // 60
const qtr = [["Quarter 1", 4200], ["Quarter 2", 4650], ["Quarter 3", 5040], ["Quarter 4", 5490]];
const qInc = qtr.slice(1).map(([, x], i) => x - qtr[i][1]); // 450, 390, 450
const qAvg = qInc.reduce((a, c) => a + c, 0) / qInc.length; // 430
const qF = qtr[3][1] + qAvg; // 5920
const nFixed = 1260, nVc = 0.62, nQ = 1750, nMu = 40;
const nAc = f.averageCost(f.totalCost(nFixed, f.totalVariableCost(nVc, nQ)), nQ); // 1.32
const nPrice = r2(nAc * (1 + nMu / 100)); // 1.876 -> exact
const nPriceExact = nAc * (1 + nMu / 100); // 1.876
const elec = 420, solarPct = 55;
const solarSave = (elec * solarPct) / 100; // 231
const surveyTbl = table(["Answer to \"How likely are you to buy honey-roasted groundnuts?\"", "Number of people"], [...survey, ["Total", sTot]]);
const salesTbl = table(["Quarter (last year)", "Jars of peanut butter sold"], qtr);
const costTbl = table(["Honey-roasted groundnuts (per month)", "Amount"], [["Expected sales (packets)", nQ.toLocaleString("en-GB")], ["Fixed costs", money(nFixed)], ["Variable cost per packet", money(nVc)], ["Rival's price for a similar packet", money(1.8)]]);

concept("bus.marketing.market-research", { file: "exam/w3b-bes", keyPrefix: "exam.w3b-bes", applies: BES }, (b) => {
  // P1 17
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 1080, paper: "Paper 1", calculator: true,
    concepts: ["bus.marketing.price", "bus.marketing.product", "bus.marketing.product-life-cycle"],
    stem: `Rudo runs a small jam-making enterprise in Mutare. Her mixed-fruit jam has sold well for six years, but sales have stopped growing. She has just launched a new chilli-and-mango jam in 375 g jars with a bright label showing the Eastern Highlands. She expects to sell ${jQ} jars of the new jam a month. Fixed costs are ${money(jFixed)} a month and the variable cost is ${money(jVc)} a jar. A rival's similar jam sells for ${money(jRival)}.`,
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which stage of the product life cycle has the mixed-fruit jam reached?",
        options: [["Maturity", "Correct: sales have stopped growing after six years."], ["Introduction", "It was launched six years ago."], ["Growth", "Sales are no longer rising."], ["Development", "It is already on sale."]],
        answer: "A",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the average cost of one jar of the new jam.",
        kind: "money", value: jAc, wrong: [jVc, r2(jFixed / jQ)],
        explanation: `Total cost = ${money(jFixed)} + ${money(jVc)} × ${jQ} = ${money(jTc)}; ÷ ${jQ} = ${money(jAc)}.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: `Calculate the price Rudo would charge using cost-plus pricing with a ${jMu}% mark-up.`,
        kind: "money", value: jCp, wrong: [r2(jVc * (1 + jMu / 100)), r2(jAc + jMu / 100)],
        explanation: `${money(jAc)} × 1.${jMu} = ${money(jCp)}.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: `Calculate Rudo's monthly profit on the new jam if she instead charges the rival's price of ${money(jRival)} and sells ${jQ} jars.`,
        kind: "money", value: jProfitRival, wrong: [r2(jRival * jQ), r2((jRival - jVc) * jQ)],
        explanation: `(${money(jRival)} − ${money(jAc)}) × ${jQ} = ${money(jProfitRival)}.`,
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Explain **two** roles of the new jar's packaging.",
        points: ["Protects / preserves the jam (sealed glass jar keeps it fresh and safe).", "So it can be transported and stored without spoiling.", "Attracts attention / builds brand (bright label, Eastern Highlands image).", "So it stands out on the shelf and suggests local quality / gives information (ingredients, date)."],
      }),
      P.manual({
        label: "(f)", marks: 6, stem: "Recommend whether Rudo should use cost-plus pricing or competitive pricing for the new jam. Justify your answer.",
        points: [`Cost-plus gives about ${money(jCp)}, above the rival's ${money(jRival)}.`, "Customers may choose the cheaper, known rival; new product needs trial.", `Competitive price ${money(jRival)} still covers average cost; profit ${money(jProfitRival)} a month.`, "Cost-plus guarantees a margin per jar only if sales reach the forecast.", "Distinctive product / attractive packaging might support a slightly higher price later.", "Justified recommendation."],
        modelAnswer: `Cost-plus pricing gives about ${money(jCp)}, which is above the rival's ${money(jRival)}, so customers trying a new jam may prefer the cheaper one they know. At ${money(jRival)} Rudo still covers her average cost of ${money(jAc)} and makes ${money(jProfitRival)} a month if she sells ${jQ} jars. Her distinctive flavour and label may later justify a higher price, but at launch she needs customers to try it. She should use competitive pricing now and review the price once the jam is known.`,
      }),
    ],
    hints: ["(b) Total cost ÷ number of jars.", "(c) Average cost plus 40% of it.", "(d) (Price − average cost) × jars."],
    explanation: `(a) Maturity. (b) ${money(jAc)}. (c) About ${money(jCp)}. (d) ${money(jProfitRival)}. (e) Protect and attract/inform. (f) Competitive pricing, justified.`,
    workedSolution: `1. Total cost = ${jFixed} + ${jVc} × ${jQ} = ${jTc}.\n2. Average cost = ${jTc} ÷ ${jQ} = ${jAc.toFixed(2)}.\n3. Cost-plus price = ${jAc.toFixed(2)} × 1.${jMu} = ${jCp.toFixed(2)}.\n4. Profit at ${jRival.toFixed(2)} = (${jRival.toFixed(2)} − ${jAc.toFixed(2)}) × ${jQ} = ${jProfitRival}.`,
  });

  // P1 16
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 1020, paper: "Paper 1", calculator: true,
    concepts: ["bus.operations.quality", "bus.operations.technology", "bus.operations.location"],
    stem: `Nyasha owns a bakery in Gweru with 8 workers. Last month the bakery made ${bkOut0.toLocaleString("en-GB")} loaves a day. Inspectors checked a week's output of ${bkMade.toLocaleString("en-GB")} loaves and rejected ${bkRej} as under-weight or burnt. Nyasha is thinking of buying an automatic dough divider and oven timer, which a supplier says would let the same 8 workers make ${bkOut1.toLocaleString("en-GB")} loaves a day. She chose her site because it is close to two large schools and a hospital that buy bread every morning.`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Define the term *quality assurance*.", points: ["Checking quality at every stage of production (not only at the end).", "By the workers themselves against agreed standards, to prevent faults."] }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the reject rate for the week checked, as a percentage to one decimal place.",
        kind: "pct", value: bkRate, wrong: [round((bkMade / bkRej), 1), round((bkRej / (bkMade - bkRej)) * 100, 1)],
        explanation: `${bkRej} ÷ ${bkMade.toLocaleString("en-GB")} × 100 = ${round(bkRate, 1)}%.`,
      }),
      P.num({
        label: "(c)", marks: 3, stem: "Calculate the percentage increase in labour productivity (loaves per worker per day) if the new equipment works as the supplier says. Give your answer to one decimal place.",
        kind: "pct", value: bkPct, wrong: [round(((bkP1 - bkP0) / bkP1) * 100, 1), bkP1 - bkP0],
        explanation: `Before: ${bkOut0.toLocaleString("en-GB")} ÷ ${bkW0} = ${bkP0}. After: ${bkOut1.toLocaleString("en-GB")} ÷ ${bkW1} = ${bkP1}. Increase = ${bkP1 - bkP0} ÷ ${bkP0} × 100 = ${round(bkPct, 1)}%.`,
      }),
      P.mcq({
        label: "(d)", marks: 1, stem: "Which term describes machines that work under computer or timer control with little human involvement?",
        options: [["Automation", "Correct."], ["Mechanisation", "In mechanisation workers operate the machines."], ["Quality control", "That is checking products."], ["Job rotation", "That is moving workers between tasks."]],
        answer: "A",
      }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain **one** reason why Nyasha's location suits a bakery.", points: ["Close to the market (schools and hospital buying daily).", "Bread is perishable / delivered fresh every morning at low transport cost."] }),
      P.manual({
        label: "(f)", marks: 6, stem: "Recommend whether Nyasha should buy the new equipment. Justify your answer.",
        points: [`Productivity could rise by ${round(bkPct, 1)}% (from ${bkP0} to ${bkP1} loaves per worker).`, `Consistent weights and baking times may cut the ${round(bkRate, 1)}% reject rate.`, "Costs: purchase price, training, maintenance; power cuts stop machines.", "Can she sell the extra loaves? Schools and hospital demand may be limited.", "Alternative: quality assurance training for workers is cheaper.", "Justified recommendation."],
        modelAnswer: `The equipment could raise output from ${bkP0} to ${bkP1} loaves per worker a day, a rise of ${round(bkPct, 1)}%, and accurate dividing and timing should cut the ${round(bkRate, 1)}% of loaves rejected as under-weight or burnt. However, it costs money, needs training and stops in a power cut, and the extra 800 loaves a day must be sold, beyond the schools and hospital. Nyasha should first train her workers in quality assurance, which is cheap and tackles the rejects, and buy the equipment only when she has found buyers for the extra bread.`,
      }),
    ],
    hints: ["(b) Rejects ÷ loaves checked × 100.", "(c) Work out productivity before and after first."],
    explanation: `(a) Checks at every stage by workers to prevent faults. (b) ${round(bkRate, 1)}%. (c) ${round(bkPct, 1)}%. (d) Automation. (e) Near customers; bread is perishable. (f) A justified decision.`,
  });

  // P2 Section B essay 20
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.marketing.market-research", "bus.marketing.demand-forecasting"],
    stem: "Many new enterprises fail because their owners do not know enough about their customers.",
    parts: [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Explain **four** methods of primary research an enterprise could use to find out about its customers.",
        points: [
          ["Questionnaire / survey: set questions to a sample; easy to count answers.", 2],
          ["Interview: face to face or by phone; can follow up answers.", 2],
          ["Focus group: small group discusses a product; detailed opinions.", 2],
          ["Observation or test marketing: watching/counting behaviour, or selling in a small area first.", 2],
        ],
        levels: L8,
        modelAnswer: "An enterprise could give a **questionnaire** with clear, mostly closed questions to a sample of possible customers; answers are easy to count. It could hold **interviews**, in which the owner can explain questions and follow up interesting answers, although this takes time. A **focus group** of six to ten customers could discuss a new product, giving detailed opinions and ideas. Finally, **observation**, such as counting how many people pass a proposed stall each hour, shows what people actually do, and **test marketing** in one area shows whether they really buy.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 550 },
        stem: "Discuss the importance of market research and demand forecasting to a new enterprise.",
        points: [
          ["Market research shows whether there is demand and what customers want (product, price, place).", 2],
          ["Reduces the risk of costly mistakes; identifies competitors and target market.", 2],
          ["Demand forecasting allows planning of production, stock, staff and cash budget.", 2],
          ["Supports loan applications / business plans with evidence.", 2],
          ["Limitations: costs money and time; samples may be biased; forecasts can be wrong; new enterprise has no sales history.", 2],
          ["Justified conclusion (e.g. simple, low-cost research and cautious forecasts are essential).", 2],
        ],
        levels: L12,
        modelAnswer: "Market research tells a new enterprise whether people want its product, what they will pay and where they shop, and who its competitors are. This reduces the risk of spending savings on a product that does not sell. Demand forecasting turns this information into an estimate of sales, which is the basis for deciding how much to produce, how much stock and how many workers are needed, and for preparing a cash budget. Evidence from research and a forecast also helps the owner persuade a bank or micro-finance institution to lend. However, research costs money and time that a new enterprise may not have, samples may be small or biased, and with no sales history forecasts rely on judgement and can be wrong. Even so, simple, cheap research, such as a short questionnaire and observation, combined with a cautious forecast that is reviewed each month, is essential, because the cost of not knowing customers is usually far greater than the cost of finding out.",
      }),
    ],
    hints: ["(a) Name each method and explain how it works.", "(b) Consider benefits, limitations and a judgement."],
    explanation: "(a) Questionnaires, interviews, focus groups, observation or test marketing. (b) Research and forecasting reduce risk and support planning and finance, despite cost and inaccuracy.",
  });

  // P2 Section A case study 40
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 3000, paper: "Paper 2", calculator: true,
    concepts: [
      "bus.marketing.market-research", "bus.marketing.demand-forecasting", "bus.marketing.product", "bus.marketing.price",
      "bus.marketing.promotion", "bus.marketing.place", "bus.marketing.marketing-strategy", "bus.marketing.foreign-markets",
      "bus.operations.location", "bus.operations.sustainability",
    ],
    stem: [
      "**Sunrise Snacks** (a fictional enterprise)",
      "",
      "Tatenda and his sister Chipo started Sunrise Snacks five years ago in a rented workshop in Gweru. They make peanut butter from groundnuts bought from small-scale farmers in the Midlands, and sell it in 375 g jars. The business now employs nine workers and sells mainly to tuck shops, school canteens and two supermarkets in Gweru and Kwekwe. Customers say they like the smooth texture and the fact that the groundnuts are grown locally.",
      "",
      "Sales of peanut butter have grown steadily (see Table 2), but competition is increasing. Two larger manufacturers now sell peanut butter in Gweru, and one has cut its price. Tatenda believes that the business must not depend on one product. He wants to launch **honey-roasted groundnuts** in 100 g packets, aimed at students and office workers who want a healthy snack. The honey would come from a beekeepers' co-operative in Gokwe.",
      "",
      "Before deciding, Chipo carried out market research. She designed a short questionnaire and asked 240 people outside a college, an office block and a supermarket in Gweru to taste a sample and answer one question. Her results are shown in Table 1. Some of the people asked said they would buy the snack only if it cost less than US\\$1.50. Chipo also read a trade magazine article which said that sales of packaged healthy snacks were growing across Southern Africa.",
      "",
      "Chipo was pleased with the results, but she noticed that most of the people outside the college were students who had just finished lectures and were hungry, and that she had not asked anyone in Kwekwe. She also found that people liked the taste but disliked the plain plastic packet used for the samples. Several said that they would want a packet that could be closed again, so that they could eat some of the nuts and keep the rest in a bag or desk drawer. Tatenda wants the packet to show that the groundnuts and honey come from Zimbabwean farmers and beekeepers, because customers already trust the Sunrise name for this reason.",
      "",
      "Tatenda has worked out the expected monthly costs of the new product (Table 3). He wants to use cost-plus pricing with a 40% mark-up, as he does for peanut butter. Chipo thinks this ignores the rival snack, which already sells for US\\$1.80.",
      "",
      "The brother and sister also disagree about promotion. Tatenda wants to pay for advertisements on a national radio station. Chipo points out that their promotion budget is only US\\$650 for the launch, and that most of their target customers are young and use their phones all day.",
      "",
      "There are two further decisions to make. First, the workshop is too small for the new production line. The landlord has offered a larger unit in the same industrial area, but a cheaper unit is available on the edge of Kwekwe, closer to many of the groundnut farmers and on the main road to Harare. Most of the business's present workers live in Gweru, and the two supermarket customers are in Gweru and Kwekwe.",
      "",
      "Second, a trader in Francistown, Botswana, has asked to stock their peanut butter. Exporting would bring new customers, but Tatenda knows little about Botswana's labelling rules or how he would be paid, and transport would add to costs.",
      "",
      "Finally, power cuts during the day sometimes stop the roasting and grinding machines. The electricity bill is US\\$420 a month. A supplier has quoted for solar panels that would cut the bill by 55%. Chipo likes the idea because \"customers care about the environment, and we would keep working during power cuts\", but the panels are expensive.",
      "",
      "Tatenda and Chipo want to grow carefully. They are proud of their reputation for quality and of buying from local farmers, and they do not want to borrow more than they can repay.",
      "",
      `**Table 1: Market research results for honey-roasted groundnuts**\n\n${surveyTbl}`,
      "",
      `**Table 2: Peanut butter sales last year**\n\n${salesTbl}`,
      "",
      `**Table 3: Expected monthly figures for honey-roasted groundnuts**\n\n${costTbl}`,
    ].join("\n"),
    parts: [
      P.mcq({
        label: "(a)", marks: 1, stem: "What type of research did Chipo carry out when she asked 240 people to taste the snack?",
        options: [["Primary research", "Correct: new data collected first-hand."], ["Secondary research", "That is the magazine article."], ["Desk research", "Desk research uses existing data."], ["Demand forecasting", "Forecasting estimates future sales from data."]],
        answer: "A",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Using Table 1, calculate the percentage of people who were very likely or quite likely to buy the snack.",
        kind: "pct", dp: 0, value: likelyPct, wrong: [round((survey[0][1] / sTot) * 100, 0), likely],
        explanation: `${survey[0][1]} + ${survey[1][1]} = ${likely}; ${likely} ÷ ${sTot} × 100 = ${likelyPct}%.`,
      }),
      P.num({
        label: "(c)", marks: 3, stem: "Using the average change per quarter in Table 2, forecast peanut butter sales for Quarter 1 of this year.",
        kind: "units", value: qF, wrong: [qtr[3][1] + qInc[2], qtr[3][1] + (qtr[3][1] - qtr[0][1])],
        explanation: `Changes: ${qInc.join(", ")}; average = ${qInc.reduce((a, c) => a + c, 0)} ÷ 3 = ${qAvg}. Forecast = ${qtr[3][1].toLocaleString("en-GB")} + ${qAvg} = ${qF.toLocaleString("en-GB")} jars.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Using Table 3, calculate the average cost of one packet of honey-roasted groundnuts.",
        kind: "money", value: nAc, wrong: [nVc, r2(nFixed / nQ)],
        explanation: `(${money(nFixed)} + ${money(nVc)} × ${nQ.toLocaleString("en-GB")}) ÷ ${nQ.toLocaleString("en-GB")} = ${money(nAc)}.`,
      }),
      P.num({
        label: "(e)", marks: 2, stem: "Calculate the price Tatenda would charge using cost-plus pricing with a 40% mark-up, to the nearest cent.",
        kind: "money", value: nPriceExact, dp: 2, tol: 0.0045, answer: r2(nPriceExact).toFixed(2), wrong: [r2(nVc * 1.4), r2(nAc + 0.4)],
        explanation: `${money(nAc)} × 1.40 = US\\$${nPriceExact.toFixed(3)}, about ${money(r2(nPriceExact))}.`,
      }),
      P.manual({
        label: "(f)", marks: 4, stem: "Explain **two** methods of promotion suitable for launching the snack, given the budget and target market.",
        points: ["Method 1, e.g. social media / targeted phone adverts or messaging groups.", "Applied: young target customers use phones; cheap within US\\$650.", "Method 2, e.g. free tasting at colleges and offices / launch discount / point-of-sale displays.", "Applied: encourages trial of a new snack; low cost."],
      }),
      P.manual({
        label: "(g)", marks: 4, stem: "Explain **two** factors Sunrise Snacks should consider when choosing between the two new sites.",
        points: ["Factor 1, e.g. labour: workers live in Gweru; may not move to Kwekwe.", "Explained: risk of losing skilled staff / recruitment and training costs.", "Factor 2, e.g. raw materials (near farmers) / market and transport (main road, customers in both towns) / cost of rent.", "Explained and applied to the case."],
      }),
      P.num({
        label: "(h)", marks: 2, stem: "Calculate the monthly saving on electricity from the solar panels.",
        kind: "money", value: solarSave, wrong: [elec - solarPct, r2(elec * 0.45)],
        explanation: `${solarPct}% × ${money(elec)} = ${money(solarSave)}.`,
      }),
      P.manual({
        label: "(i)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Evaluate whether Sunrise Snacks should start exporting peanut butter to Botswana.",
        points: [
          ["Benefit: new customers and growth when local competition is increasing.", 1],
          ["Benefit: spreads risk; regional demand for healthy foods growing (magazine).", 1],
          ["Problem: lack of knowledge of labelling rules / legal requirements.", 1],
          ["Problem: payment and currency risk; transport costs reduce profit.", 1],
          ["Ways to reduce problems: use the Francistown trader as agent/distributor, payment in advance, research rules.", 2],
          ["Considers capacity and priorities (new product launch, new site at the same time).", 1],
          ["Justified conclusion.", 1],
        ],
        levels: L8,
        modelAnswer: "Exporting would give Sunrise Snacks new customers at a time when two larger rivals are competing in Gweru, and selling in two countries spreads risk. The trader in Francistown already wants the product, which reduces the problem of finding outlets. However, Tatenda does not know Botswana's labelling rules, payment in another country is risky and transport adds costs. These problems can be reduced by asking for payment in advance, checking the labelling rules before sending stock, and using the trader as the distributor. But the business is also launching a new product and moving site, and managing all three at once could harm quality. It should accept a small trial order through the trader with payment in advance, and expand exports only after the new product and site are settled.",
      }),
      P.manual({
        label: "(j)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "Recommend a marketing mix (product, price, place and promotion) for the honey-roasted groundnuts. Justify your recommendation using evidence from the case.",
        points: [
          ["Product: 100 g packet, healthy, local honey and groundnuts; packaging that attracts students and protects freshness.", 2],
          [`Price: cost-plus gives about ${money(r2(nPriceExact))}, above the rival's US\\$1.80 and above the US\\$1.50 some customers want; suggests a competitive or penetration price that still covers the average cost of ${money(nAc)}.`, 3],
          ["Place: tuck shops, college and office canteens, supermarkets already supplied in Gweru and Kwekwe.", 2],
          ["Promotion: social media and tastings within the US\\$650 budget rather than national radio.", 2],
          [`Consistency and use of evidence: ${likelyPct}% likely to buy; mix fits young target market; overall justified recommendation.`, 3],
        ],
        levels: LMIX,
        modelAnswer: `The product should be a 100 g packet in attractive, resealable packaging that stresses local groundnuts and honey, appealing to health-conscious students and office workers and keeping the nuts fresh. On price, cost-plus gives about ${money(r2(nPriceExact))}, above the rival's US\\$1.80 and well above the US\\$1.50 some respondents mentioned, so Tatenda should charge about US\\$1.60 at launch: this is below the rival, still above the average cost of ${money(nAc)}, and encourages trial. For place, the snack should go to the outlets the business already supplies, school and office canteens, tuck shops near colleges and the two supermarkets, which reach the target customers at low cost. Promotion should use social media adverts and messaging groups, which young people check all day, and free tastings at colleges and offices, all within the US\\$650 budget; national radio would use the whole budget on many people outside the target market. With ${likelyPct}% of those asked likely to buy, this consistent, low-cost mix gives the product a good chance while limiting the risk to the business.`,
      }),
    ],
    hints: ["(b) Add the first two rows of Table 1.", "(c) Find the three quarterly changes and their average.", "(d) Total monthly cost ÷ packets.", "(j) Make every P fit the young target market and the budget."],
    explanation: `(a) Primary. (b) ${likelyPct}%. (c) ${qF.toLocaleString("en-GB")} jars. (d) ${money(nAc)}. (e) About ${money(r2(nPriceExact))}. (f) Low-cost digital promotion and tastings. (g) Labour, raw materials, market, costs. (h) ${money(solarSave)}. (i) A cautious trial export. (j) A consistent, justified mix.`,
    workedSolution: `1. (b) ${likely} ÷ ${sTot} × 100 = ${likelyPct}%.\n2. (c) Average change = (${qInc.join(" + ")}) ÷ 3 = ${qAvg}; forecast = ${qtr[3][1]} + ${qAvg} = ${qF}.\n3. (d) Total cost = ${nFixed} + ${nVc} × ${nQ} = ${r2(nFixed + nVc * nQ)}; average = ${r2(nFixed + nVc * nQ)} ÷ ${nQ} = ${nAc.toFixed(2)}.\n4. (e) ${nAc.toFixed(2)} × 1.40 = ${nPriceExact.toFixed(3)} ≈ ${r2(nPriceExact).toFixed(2)}.\n5. (h) 0.${solarPct} × ${elec} = ${solarSave}.`,
  });
});
