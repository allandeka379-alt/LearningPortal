// W2b exam-format items, Cambridge IGCSE Business 0264: Paper 1 (20 marks) and a complete Paper 2 case study (80 marks).
// Mark splits within parts are ours. All interest rates are stated as assumptions in the stimulus.
import { concept, P, CAM, money, table, sum, f, round, check } from "../lib.mjs";

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

// --- Paper 1: Kudu Furniture ---
const quarters = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];
const kSales = [86500, 81200, 72400, 60550];
const kYear = sum(kSales); // 300650
const kFall = ((kSales[0] - kSales[3]) / kSales[0]) * 100; // 30
const kLoan = 56000, kR0 = 8, kR1 = 13;
const kExtraInt = (kLoan * (kR1 - kR0)) / 100; // 2800
check("kudu fall", kFall, 30);
check("kudu interest", kExtraInt, 2800);
const kTab = table(["", ...quarters], [["Sales revenue (US\\$)", ...kSales]]);

// --- Paper 2: Mazvita Dairies ---
const yrs = ["Year 1", "Year 2"];
const prod = [["Yoghurt", 410000, 416000], ["Maas (sour milk)", 260000, 268000], ["Cheese", 180000, 126000]];
const md = yrs.map((_, i) => sum(prod.map((p) => p[i + 1]))); // 850000, 810000
const mdCosts = [758000, 749000];
const mdProfit = md.map((r, i) => f.profit(r, mdCosts[i])); // 92000, 61000
const regionMkt = 4500000;
const mdShare = f.marketShare(md[1], regionMkt); // 18
const hcSales = 405000;
const shareA = f.marketShare(md[1] + hcSales, regionMkt); // 27
const extraB = 160000;
const shareB = f.marketShare(md[1] + extraB, regionMkt); // 21.6
const cheeseFall = ((prod[2][1] - prod[2][2]) / prod[2][1]) * 100; // 35
check("md totals", md[1], 810000);
check("md share", mdShare, 18);
check("A share", shareA, 27);
check("cheese fall", cheeseFall, 30);
const loanNow = 600000, rNow = 10, rNew = 14;
const extraInterest = (loanNow * (rNew - rNow)) / 100; // 18000
const app1 = table(["Sales revenue (US\\$)", ...yrs], [...prod.map(([n, a, c]) => [n, a, c]), ["**Total sales revenue**", ...md], ["Total costs", ...mdCosts]]);
const app2 = [
  "> **Clean Rivers Marondera** (a fictional pressure group)",
  ">",
  "> \"Every week, waste water from the Mazvita Dairies factory flows into the stream behind the factory. It smells, it kills fish and cattle downstream will not drink it. We have collected 3,200 signatures. We ask shoppers to choose other brands until Mazvita cleans up, and we have written to the supermarkets that sell its products. A new national rule on factory waste water comes into force in 18 months. Why should our children wait that long?\"",
].join("\n");
const app3 = table(["", "Option A: buy Highveld Creamery", "Option B: new yoghurt line in Marondera"], [
  ["Cost (US\\$)", 1350000, 380000],
  ["Annual sales revenue added (US\\$)", hcSales, extraB],
  ["Finance", "bank loan of US\\$1,000,000 plus retained profit", "retained profit and a small bank loan"],
  ["Time before extra sales", "immediate", "8 months"],
  ["Other points", "Highveld's factory is old; its 90 workers have different working methods", "uses MD's own recipes and staff; more milk needed from farmers"],
]);

concept("bus.economy.business-cycle", { file: "exam/w2b-cambridge", keyPrefix: "exam.w2b-cambridge", applies: CAM }, (b) => {
  // ---- Paper 1 (20) ----
  const pA = group("(a)", "Answer both parts.", [
    P.mcq({
      label: "(i)", stem: "What is meant by a recession?",
      options: [["A period when GDP falls and unemployment rises", "Correct: economic activity is falling."], ["A period when GDP rises quickly and prices rise", "That describes a boom."], ["A sustained rise in the general level of prices", "That is inflation."], ["A rise in the interest rate set by the central bank", "That is a change in monetary policy."]],
      answer: "A",
    }),
    P.num({ label: "(ii)", marks: 1, stem: "Calculate Kudu Furniture's total sales revenue for the year.", kind: "money", value: kYear, wrong: [kSales[0] * 4], explanation: `${kSales.map((x) => x.toLocaleString("en-GB")).join(" + ")} = ${kYear.toLocaleString("en-GB")}.` }),
  ]);
  const pB = group("(b)", "Use Table 1 and the information about the loan.", [
    P.num({ label: "(i)", marks: 2, stem: "Calculate the percentage fall in sales revenue from Quarter 1 to Quarter 4, to one decimal place.", kind: "pct", value: kFall, wrong: [round(((kSales[0] - kSales[3]) / kSales[3]) * 100, 1)], explanation: `(${kSales[0].toLocaleString("en-GB")} − ${kSales[3].toLocaleString("en-GB")}) ÷ ${kSales[0].toLocaleString("en-GB")} × 100 = ${kFall.toFixed(1)}%.` }),
    P.num({ label: "(ii)", marks: 2, stem: "Calculate the increase in Kudu Furniture's annual interest payment caused by the rise in the interest rate.", kind: "money", value: kExtraInt, wrong: [(kLoan * kR1) / 100], explanation: `${kLoan.toLocaleString("en-GB")} × (${kR1} − ${kR0}) ÷ 100 = ${kExtraInt.toLocaleString("en-GB")}.` }),
  ]);
  const pC = group("(c)", "Answer both parts.", [
    P.mcq({
      label: "(i)", stem: "Which government policy change would be most likely to increase Kudu Furniture's sales?",
      options: [["A cut in income tax", "Correct: customers would have more disposable income."], ["A rise in interest rates", "This makes credit dearer and reduces sales."], ["A rise in the tax on profits", "This reduces profit after tax, not sales."], ["A cut in government spending", "This reduces demand in the economy."]],
      answer: "A",
    }),
    P.manual({
      label: "(ii)", marks: 5,
      stem: "Explain **two** ways in which the rise in interest rates could affect Kudu Furniture.",
      points: [
        "Customers buy furniture on credit, so their repayments rise.",
        "Demand for beds and sofas falls further / sales fall.",
        `Kudu's own loan costs more: ${money(kExtraInt)} extra interest a year.`,
        "Profit falls / less money for investment or new designs.",
        "Applied: comes on top of a recession in which sales already fell.",
      ],
      modelAnswer: `Most of Kudu's customers buy on credit, so higher interest rates make their monthly repayments larger and fewer people will buy beds and sofas, adding to the fall in sales caused by the recession. Kudu's own loan of ${money(kLoan)} now costs ${money(kExtraInt)} more in interest each year, which reduces its profit and leaves less money to invest in new designs.`,
    }),
  ]);
  addSubResponses(b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1350, paper: "Paper 1", calculator: true,
    concepts: ["bus.economy.business-cycle", "bus.economy.government-policy"],
    stem: [
      `**Kudu Furniture** (a fictional business) is a private limited company in Bulawayo that makes beds and sofas. Most customers buy on credit from furniture shops. During the year the economy entered a recession and unemployment rose. To reduce inflation, the central bank raised interest rates. Assume that the interest rate on Kudu's bank loan of ${money(kLoan)} rose from ${kR0}% to ${kR1}% a year. Kudu employs 64 workers and has not yet cut any jobs.`,
      "",
      `**Table 1: Kudu Furniture, sales revenue last year**\n\n${kTab}`,
    ].join("\n"),
    parts: [
      pA,
      pB,
      pC,
      P.manual({
        label: "(d)", marks: 8,
        stem: "Kudu's directors are considering two responses to falling sales: (1) cut prices by 10%, or (2) reduce the workforce by a quarter until the economy recovers. Which response should Kudu choose? Justify your answer.",
        points: [
          ["Price cut: may keep customers and market share in a recession; but lowers profit per item when interest costs are rising.", 2],
          ["Price cut: customers' problem is credit cost and lower incomes, so demand may not rise much.", 2],
          ["Job cuts: reduce costs quickly; but lose skilled workers needed when the economy recovers; low morale; redundancy costs.", 2],
          ["Justified decision using the case (size of sales fall, the recession being temporary).", 2],
        ],
        levels: [
          [3, 6, 8, "Weighs both options with evidence from the case and reaches a justified decision."],
          [2, 3, 5, "Analysis of one option, or both with little use of the case."],
          [1, 1, 2, "Simple points with no judgement."],
        ],
        modelAnswer: `Cutting prices by 10% might help Kudu keep customers while incomes are falling, but each sale would earn less at a time when its interest costs have risen by ${money(kExtraInt)}. Customers' main problem is dearer credit and the fear of losing jobs, so lower prices may not raise sales much. Reducing the workforce by a quarter would cut costs quickly and match output to sales, which have fallen by ${round(kFall, 1)}%. However, Kudu would lose skilled furniture makers it will need when the economy recovers, and the remaining workers' morale may fall. Because recessions are temporary, Kudu should avoid permanent job cuts: it should reduce hours or overtime instead, and make only a small price cut on its cheapest beds, so it keeps both its skilled workers and its customers until demand returns.`,
      }),
    ],
    hints: ["(a)(ii) Add the four quarters.", "(b)(i) Divide the fall by the Quarter 1 figure.", "(b)(ii) Loan × increase in the interest rate ÷ 100."],
    explanation: `(a)(i) GDP falls and unemployment rises. (a)(ii) ${money(kYear)}. (b)(i) ${kFall.toFixed(1)}%. (b)(ii) ${money(kExtraInt)}. (c)(i) A cut in income tax. (c)(ii) Lower demand from credit buyers; higher interest on Kudu's own loan. (d) A justified choice between price cuts and job cuts.`,
    workedSolution: `1. Total = ${kSales.map((x) => x.toLocaleString("en-GB")).join(" + ")} = ${kYear.toLocaleString("en-GB")}.\n2. Fall = ${(kSales[0] - kSales[3]).toLocaleString("en-GB")}; ${(kSales[0] - kSales[3]).toLocaleString("en-GB")} ÷ ${kSales[0].toLocaleString("en-GB")} × 100 = ${kFall.toFixed(1)}%.\n3. Interest at ${kR0}% = ${((kLoan * kR0) / 100).toLocaleString("en-GB")}; at ${kR1}% = ${((kLoan * kR1) / 100).toLocaleString("en-GB")}; increase = ${kExtraInt.toLocaleString("en-GB")}.`,
  }), [pA, pB, pC]);

  // ---- Paper 2 (80) ----
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 5400, paper: "Paper 2",
    concepts: [
      "bus.economy.business-cycle", "bus.economy.government-policy", "bus.economy.external-costs-benefits",
      "bus.economy.environmental-issues", "bus.economy.pressure-groups", "bus.enterprise.stakeholders",
      "bus.enterprise.objectives", "bus.enterprise.business-growth", "bus.communication.methods", "bus.communication.barriers",
    ],
    stem: [
      "**Mazvita Dairies Ltd** (a fictional business)",
      "",
      "Mazvita Dairies Ltd (MD) is a private limited company in Marondera that turns fresh milk into yoghurt, maas (sour milk) and cheese. It was founded twenty years ago by Grace Mazvita, who still chairs the board of directors. MD employs 240 workers and sells its products through supermarkets and small shops across Zimbabwe. About 220 small-scale farmers in the district supply MD with milk. Grace is proud that MD buys from local farmers and pays them every two weeks, which she calls \"the heart of our business\".",
      "",
      `**Objectives.** The board's objectives for the next three years are to increase MD's share of the regional market for dairy products from ${round(mdShare, 1)}% to 20%, to remain profitable, and to keep buying all its milk from local farmers. Some directors believe that the growth objective should come first. Grace believes that the company's reputation and its links with farmers matter more than becoming bigger.`,
      "",
      "**Products and customers.** Yoghurt is MD's best-selling product and is popular with schoolchildren and office workers as a quick snack. Maas is bought mainly by families, who use it with sadza and in cooking. Cheese is a newer product, launched five years ago for supermarkets and hotels. MD's brand is well known in Mashonaland, and many customers say they choose it because it is made from local milk. MD competes with several other Zimbabwean dairies and with imported products, which are often cheaper but less fresh.",
      "",
      "Most of MD's 240 workers live in Marondera. Many have worked for the company for more than ten years, and Grace knows most of them by name. Managers meet the heads of each department every Monday, but factory workers usually hear about decisions from notices on the canteen wall.",
      "",
      `**A difficult economy.** The economy has been in recession for the past year. Unemployment has risen and many families have cut back their spending. Sales of yoghurt and maas, which many families see as everyday foods, have held up well, but sales of cheese, which customers treat as a luxury, have fallen sharply (see Appendix 1). To reduce inflation, the central bank has raised interest rates. Assume that the interest rate on MD's existing bank loan of US\\$600,000 has risen from ${rNow}% to ${rNew}% a year. MD's Finance Director, Tatenda Moyo, has warned the board that profit has already fallen and that borrowing more now would be risky.`,
      "",
      "**Waste water.** Making yoghurt and cheese produces large amounts of waste water containing milk solids and cleaning chemicals. For years MD has stored this water in open ponds next to the factory, from which some flows into a stream. Residents complain about the smell, and farmers downstream say their cattle will not drink from the stream. A local pressure group, Clean Rivers Marondera, has started a campaign against MD (see Appendix 2). Its posts on social media have been shared thousands of times. Two supermarket buyers have asked MD what it intends to do.",
      "",
      "A new national rule on factory waste water will come into force in 18 months. MD's Operations Director, Sipho Ndlovu, says a treatment plant that cleans the water before it leaves the factory would cost about US\\$210,000. He points out that the treated water could be used again for cleaning, which would reduce MD's water bills. Some directors want to wait until the rule comes into force; Sipho wants to start building now.",
      "",
      "**Farmers and communication.** To meet supermarkets' quality standards, MD will soon require all farmers to cool their milk within two hours of milking and to keep records of animal health. Many farmers live far from Marondera, some have no internet access and a few cannot read English well. In the past, MD has passed messages to farmers through the drivers who collect the milk. Last year a change to collection times was passed on wrongly by some drivers, and milk from several farms was left standing in the heat and had to be thrown away. The farmers' association has asked MD for meetings at which farmers can ask questions.",
      "",
      `**Growth.** The board is considering two ways to grow (see Appendix 3). Option A is to buy Highveld Creamery, a rival dairy in Harare that is for sale. This would increase MD's market share at once, but Highveld's factory is old and its workers are used to different methods. Option B is to build a new yoghurt production line at the Marondera factory. This would use MD's own recipes and staff but would need more milk from local farmers. Option A would need a bank loan of about US\\$1,000,000.`,
      "",
      "Grace is cautious: \"Highveld would make us bigger overnight, but bigger is not always better. Our customers and our farmers trust us because we are careful.\" The Marketing Director, Rudo Chikore, prefers Option A: \"If we do not buy Highveld, a larger rival will, and then we will be the small one.\"",
      "",
      "Highveld Creamery has been owned by the same family for thirty years. Its brand is well known in Harare, where MD sells little, and it supplies several hotels and schools. However, its owners have invested little in recent years: some machines often break down, and its products have been withdrawn from one supermarket after quality complaints. Rudo believes MD's managers could solve these problems within a year. Tatenda is less sure; he points out that MD's managers are already busy dealing with the recession, the new quality rules for farmers and the waste-water problem, and that the bank would want MD's factory as security for a large loan.",
      "",
      "The board meets next month. It must agree how to respond to the recession and the higher interest rate, what to do about the waste water, how to communicate the new quality rules to farmers, and which growth option to choose, if any.",
      "",
      `**Appendix 1: Selected financial information**\n\n${app1}`,
      "",
      `The total regional market for dairy products in Year 2 was worth ${money(regionMkt)}.`,
      "",
      `**Appendix 2: Leaflet from Clean Rivers Marondera**\n\n${app2}`,
      "",
      `**Appendix 3: Growth options**\n\n${app3}`,
    ].join("\n"),
    parts: [
      group("(1)", "Question 1", [
        P.manual({
          label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
          stem: "Explain **two** ways in which the recession has affected MD.",
          points: [
            ["Identifies: falling demand for luxury products (cheese).", 1],
            ["Explains: lower incomes and job losses lead customers to cut non-essential spending.", 1],
            [`Applies with evidence: cheese sales fell from ${money(prod[2][1])} to ${money(prod[2][2])}, a fall of ${round(cheeseFall, 1)}%, while yoghurt and maas held up.`, 2],
            ["Identifies: lower total revenue and profit.", 1],
            ["Explains: costs did not fall as fast as revenue / higher interest costs.", 1],
            [`Applies: total revenue fell from ${money(md[0])} to ${money(md[1])} and profit from ${money(mdProfit[0])} to ${money(mdProfit[1])}.`, 2],
          ],
          levels: LV8,
          modelAnswer: `First, the recession has reduced demand for products customers see as luxuries. As unemployment rose and incomes fell, families cut back on cheese, whose sales fell from ${money(prod[2][1])} to ${money(prod[2][2])}, a fall of ${round(cheeseFall, 1)}%, while everyday products such as yoghurt and maas held up. Second, MD's revenue and profit have fallen. Total sales revenue fell from ${money(md[0])} to ${money(md[1])}, but costs fell only slightly, so profit fell from ${money(mdProfit[0])} to ${money(mdProfit[1])}. This makes it harder for MD to pay for growth or for the waste-water plant from retained profit.`,
        }),
        P.manual({
          label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
          stem: "Consider the effects of the higher interest rate on MD. Should MD delay its growth plans until interest rates fall? Justify your answer.",
          points: [
            [`Higher cost of the existing loan: interest rises by ${money(extraInterest)} a year (US\\$600,000 × ${rNew - rNow}%), reducing profit further.`, 2],
            ["New borrowing (Option A's US\\$1,000,000 loan) would be expensive; risk if sales keep falling.", 2],
            ["Higher rates also reduce consumer spending, especially in a recession, so extra output may not sell.", 2],
            ["Against delay: Highveld may be bought by a rival; growth objective (20% share) missed; Option B needs less borrowing.", 2],
            ["Distinguishes between options: delaying a large loan-financed purchase vs going ahead with a cheaper internal option.", 2],
            ["Justified conclusion.", 2],
          ],
          levels: LV12,
          modelAnswer: `The rise from ${rNow}% to ${rNew}% increases the interest on MD's existing loan of US\\$600,000 by ${money(extraInterest)} a year, at a time when profit has already fallen to ${money(mdProfit[1])}. Option A would add a further loan of about US\\$1,000,000 at the higher rate, so its interest cost would be large and would continue even if sales kept falling. Higher rates also discourage consumer spending, so extra output may be hard to sell during the recession. On the other hand, if MD waits, a rival may buy Highveld Creamery, as Rudo fears, and MD would miss its target of a 20% market share. Option B is cheaper and can be paid for mainly from retained profit, so it is far less affected by interest rates. MD should therefore delay any large loan-financed purchase such as Option A until rates and the economy improve, but it does not need to delay all growth: a smaller internal project financed mainly from its own funds is still sensible.`,
        }),
      ]),
      group("(2)", "Question 2", [
        P.manual({
          label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
          stem: "Explain **two** external costs of MD's activities.",
          points: [
            ["Identifies: smell from the waste-water ponds.", 1],
            ["Explains: a cost borne by residents, not MD (lower quality of life, perhaps lower property values).", 1],
            ["Applies: residents near the factory complain; ponds are open.", 2],
            ["Identifies: pollution of the stream.", 1],
            ["Explains: harms people and businesses downstream, not paid for by MD.", 1],
            ["Applies: farmers' cattle will not drink; fish killed (Appendix 2).", 2],
          ],
          levels: LV8,
          modelAnswer: "First, the open waste-water ponds cause a bad smell. Residents living near the factory suffer this cost, not MD, and it reduces their quality of life. Second, waste water flowing into the stream behind the factory pollutes it. According to Clean Rivers Marondera, fish are dying and farmers' cattle downstream will not drink from it, so farmers must find water elsewhere at their own cost. MD's private costs do not include these harms, which is why they are external costs.",
        }),
        P.manual({
          label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
          stem: "Should MD build the waste-water treatment plant now, or wait until the new rule comes into force in 18 months? Justify your answer.",
          points: [
            ["Cost: about US\\$210,000 at a time of falling profit and higher interest rates; waiting delays the spending.", 2],
            ["Plant will be required by law in 18 months anyway; the cost cannot be avoided.", 2],
            ["Pressure group: campaign, petition, boycott call and supermarkets' questions threaten sales now.", 2],
            ["Benefits: reused water lowers water bills; reputation with customers, farmers and community.", 2],
            ["Links to objectives: Grace's view that reputation matters more than size; external costs reduced.", 2],
            ["Justified decision.", 2],
          ],
          levels: LV12,
          modelAnswer: "Waiting 18 months would delay spending about US\\$210,000 when profit has fallen and borrowing is more expensive. However, the plant will be required by law anyway, so MD cannot avoid the cost, only postpone it. Meanwhile Clean Rivers Marondera's campaign is spreading quickly on social media, it is asking shoppers to choose other brands, and two supermarket buyers have already asked what MD will do. Losing even one supermarket would cost far more than the plant. Building now would also cut water bills, because treated water can be reused, and would protect the reputation that Grace sees as MD's main strength. MD should start building now and announce its plans publicly, so that the campaign ends and supermarkets keep stocking its products.",
        }),
      ]),
      group("(3)", "Question 3", [
        P.manual({
          label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
          stem: "Explain **two** communication barriers that could stop MD's new quality rules reaching farmers correctly.",
          points: [
            ["Identifies: long chain of communication through drivers.", 1],
            ["Explains: messages can be changed or forgotten as they pass on.", 1],
            ["Applies: last year's collection-time change was passed on wrongly and milk was thrown away.", 2],
            ["Identifies: language / literacy / lack of access to internet.", 1],
            ["Explains: farmers may not understand written English messages or receive emails.", 1],
            ["Applies: some farmers live far away, have no internet, a few cannot read English well.", 2],
          ],
          levels: LV8,
          modelAnswer: "First, MD passes messages through the drivers who collect the milk. Each driver may forget or change part of the message, and the case shows that last year a change in collection times was passed on wrongly, so milk was left in the heat and thrown away. Second, there are language and access barriers. Some farmers cannot read English well and many have no internet, so a detailed written message or an email about cooling milk and keeping animal health records may not be received or understood.",
        }),
        P.manual({
          label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
          stem: "Consider the methods MD could use to tell farmers about the new quality rules. Recommend the most suitable method or combination of methods. Justify your answer.",
          points: [
            ["Meetings with farmers (through the farmers' association): two-way, questions answered, demonstrations of cooling; but cost and travel for distant farmers.", 2],
            ["Written leaflets in English and local languages with pictures: a record farmers can keep; but some cannot read well.", 2],
            ["Text or voice messages to mobile phones: fast, cheap, reach distant farmers; but short and one-way.", 2],
            ["Drivers alone: cheap but unreliable (evidence from last year).", 2],
            ["Need for feedback and a record because rules are important and detailed.", 2],
            ["Justified recommendation of a combination.", 2],
          ],
          levels: LV12,
          modelAnswer: "Meetings held with the farmers' association in several villages would let MD explain the rules, demonstrate milk cooling and answer questions, which the farmers have asked for, but they cost money and some distant farmers may not attend. Written leaflets give farmers a record they can keep, and using local languages and pictures would help those who do not read English well. Text or voice messages to farmers' phones are cheap and reach everyone quickly, but they are too short to explain detailed rules. Relying on drivers alone is not acceptable after last year's mistake. MD should hold meetings in each area, hand out illustrated leaflets in local languages at the meetings and through the drivers, and use voice or text messages as reminders before the rules start. This combination gives both feedback and a record, which these important rules need.",
        }),
      ]),
      group("(4)", "Question 4", [
        P.manual({
          label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
          stem: "Explain **two** stakeholder groups whose objectives might conflict with the directors' objective of growth.",
          points: [
            ["Identifies: local farmers.", 1],
            ["Explains their objective: regular sales at fair prices and prompt payment; buying from local farmers.", 1],
            ["Applies: Option A buys a Harare dairy with its own suppliers, so local farmers may lose importance / Option B needs more milk which may change their terms.", 2],
            ["Identifies: employees / residents / Grace as owner / lenders.", 1],
            ["Explains their objective (job security, quality of life, low risk).", 1],
            ["Applies: Highveld's 90 workers may face changes; residents fear more waste; bank wary of a large loan.", 2],
          ],
          levels: LV8,
          modelAnswer: "First, the 220 local farmers want regular sales at fair prices and prompt payment. If MD buys Highveld Creamery, it gains another factory with its own milk suppliers in Harare, so the local farmers may fear that MD will need less of their milk in future. Second, residents near the factory want less smell and pollution. Growth through a new yoghurt line would increase the amount of waste water, so unless the treatment plant is built first, their quality of life would get worse.",
        }),
        P.manual({
          label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
          stem: "Should MD choose Option A or Option B? Justify your answer using the case and Appendix 3.",
          points: [
            [`Option A: market share rises from ${round(mdShare, 1)}% to ${round(shareA, 1)}%, above the 20% target, immediately; removes a rival.`, 2],
            ["Option A: costs US\\$1,350,000, needs a US\\$1,000,000 loan at high interest; old factory; different working methods; culture clash.", 2],
            [`Option B: costs US\\$380,000, mainly retained profit; market share rises to ${round(shareB, 1)}%, above target; uses own recipes and staff.`, 2],
            ["Option B: 8 months before extra sales; needs more milk from local farmers (fits objective of buying locally).", 2],
            ["Links to recession, interest rates, falling profit and Grace's caution.", 2],
            ["Justified recommendation.", 2],
          ],
          levels: LV12,
          modelAnswer: `Option A would raise MD's market share from ${round(mdShare, 1)}% to ${round(shareA, 1)}% at once, well above the 20% target, and stop a larger rival buying Highveld. But it costs US\\$1,350,000 and needs a US\\$1,000,000 loan at a time when interest rates have risen and MD's profit has fallen to ${money(mdProfit[1])}. Highveld's factory is old and its workers use different methods, so problems combining the two businesses are likely. Option B costs only US\\$380,000, mostly from retained profit, and would raise market share to ${round(shareB, 1)}%, which still meets the 20% objective. It uses MD's own recipes and staff and needs more milk from local farmers, which supports Grace's objective of buying locally. Its sales start only after 8 months, and yoghurt has held up well in the recession, so the extra output should sell. I recommend Option B. It meets the market share objective at a fraction of the cost and risk of Option A, and it protects the reputation and farmer links that the case shows are MD's greatest strengths, while keeping finance available for the waste-water plant.`,
        }),
      ]),
    ],
    hints: ["Use the case and the appendices in every answer.", "In each (b) part, weigh both sides and finish with a justified decision."],
    explanation: `Q1: the recession cut cheese sales (${round(cheeseFall, 1)}% fall) and profit; higher rates add ${money(extraInterest)} a year in interest and make loan-financed growth risky. Q2: smell and stream pollution are external costs; building the plant now protects sales and reputation. Q3: drivers and language are barriers; meetings plus illustrated leaflets and phone reminders. Q4: farmers and residents may oppose growth; Option B meets the 20% target (${round(shareB, 1)}%) at far lower cost and risk than Option A (${round(shareA, 1)}%).`,
  });
});
