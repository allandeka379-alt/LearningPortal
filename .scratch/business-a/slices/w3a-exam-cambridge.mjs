// W3a exam-format items: Cambridge. AS (Papers 1 and 2): two 5-mark questions, one 30-mark data response, one 20-mark essay.
// A Level: one 20-mark essay (Paper 4), two 8-mark questions, one 16-mark question and one 12-mark extended response (Paper 3).
import { concept, P, EXAM, checkExam, CAM, table, money, chk, r2, pctChange, market, elasticity, invest, stats, movingAverage4 } from "../lib.mjs";
import { pmc, LV8, LV12 } from "../tables/w3a-lib.mjs";

const LV8E = [[1, 1, 2, "Assertion with little support; no judgement"], [2, 3, 5, "Arguments for and against, partly applied; judgement stated"], [3, 6, 8, "Balanced, applied arguments and a justified recommendation with a condition"]];
const LV5 = [[1, 1, 1, "Assertion with little support"], [2, 2, 3, "Developed points applied to the case"], [3, 4, 5, "Developed, applied advice with a justified recommendation"]];
const LV6 = [[1, 1, 2, "Assertion with little support"], [2, 3, 4, "Developed points applied to the case"], [3, 5, 6, "Developed, applied analysis with a clear chain of reasoning"]];

concept("abus.marketing.markets", { file: "exam/w3a-cambridge", keyPrefix: "exam.w3a-cambridge", applies: CAM }, (b) => {
  const pc = (extra = {}) => ({ examStyle: true, applies: CAM, ...extra });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 1: CAM_SHORT5 (market share)
  {
    const share = market.share(480000, 3200000);
    chk(share, 15, 1e-9);
    b.struct({
      ...pc({ d: 3, skill: EXAM.CAM_SHORT5.skill, secs: EXAM.CAM_SHORT5.secs, calculator: true, paper: "Cambridge Paper 1" }),
      concepts: ["abus.marketing.markets"],
      stem: "A fictional supermarket in Harare had sales of US\\$480,000 last year. The total sales of supermarkets in the city were US\\$3,200,000.",
      parts: checkExam(EXAM.CAM_SHORT5, [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: share, stem: "Calculate the supermarket's market share, to one decimal place.", wrong: [r2(3200000 / 480000), 6.7], explanation: "480,000 ÷ 3,200,000 × 100 = 15.0%." }),
        P.manual({ label: "(b)", marks: 3, stem: "Explain **one** way in which the supermarket could use information about its market share.", points: ["It can compare its share with rivals' shares", "Application: a share of 15% shows how much of the city's supermarket trade it holds", "It can set a target and judge whether its marketing is working, e.g. whether the share is rising"], modelAnswer: "The supermarket can compare its 15% share with its rivals' shares to see how strong it is in the city. It can then set a target for the share and judge whether its marketing is working by checking whether the share rises or falls.", explanation: "A use of market share applied to the case." }),
      ]),
      hints: ["Share = sales ÷ market sales × 100."],
      explanation: "Market share 15.0%; the share is used to compare with rivals and to set and monitor targets.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 2: CAM_SHORT5 (demand and supply)
  b.struct({
    ...pc({ d: 3, skill: EXAM.CAM_SHORT5.skill, secs: EXAM.CAM_SHORT5.secs, paper: "Cambridge Paper 1" }),
    concepts: ["abus.marketing.demand-supply"],
    stem: "A fictional bakery in Lusaka sells bread in a competitive market. Bread is a normal good.",
    parts: checkExam(EXAM.CAM_SHORT5, [
      P.mcq({
        label: "(a)", marks: 2, multiple: true, answer: ["A", "C"], stem: "Which **two** events would shift the demand curve for the bakery's bread to the right? Select two.",
        options: [
          ["A rise in consumers' incomes", "Correct: a normal good is bought more when incomes rise."],
          ["A fall in the cost of flour", "This shifts supply, not demand."],
          ["A successful advertising campaign for the bread", "Correct: advertising raises demand at every price."],
          ["A new tax on bakeries' ovens", "This shifts supply to the left."],
          ["A fall in the price of a rival bakery's bread", "Bread from the rival is a substitute, so demand for this bakery's bread falls."],
        ],
        explanation: "Income and advertising shift demand; flour costs and taxes shift supply.",
      }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain how a drought that raises the price of flour is likely to affect the market price of bread.", points: ["Flour is a main cost of bakeries, so costs rise", "Application: bakeries supply less bread at every price, so supply decreases", "The equilibrium price rises (and the quantity traded falls)"], modelAnswer: "Flour is a main cost for bakeries, so their costs rise and they supply less bread at every price. The supply curve shifts left, so the equilibrium price of bread rises and the quantity traded falls.", explanation: "A cost rise shifts supply left, raising price." }),
    ]),
    hints: ["Separate events that shift demand from events that shift supply."],
    explanation: "Income and advertising raise demand; a cost rise reduces supply and raises the price.",
  });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 3: CAM_DATA30 (Paper 2, AS)
  {
    const m25 = 1800000, m26 = 2016000, r25 = 216000, r26 = 226800;
    const s25 = market.share(r25, m25), s26 = market.share(r26, m26);
    chk(s25, 12, 1e-9);
    chk(s26, 11.25, 1e-9);
    const mg = market.growth(m25, m26);
    chk(mg, 12, 1e-9);
    const seg = [["Office workers", 240], ["Students", 100], ["Families", 60]];
    const st = stats.stratified(seg, 40);
    chk(st[1].sample, 10, 1e-9);
    const loyal = (120 / 400) * 100;
    chk(loyal, 30, 1e-9);
    b.struct({
      ...pc({ d: 4, skill: EXAM.CAM_DATA30.skill, secs: EXAM.CAM_DATA30.secs, calculator: true, paper: "Cambridge Paper 2" }),
      concepts: ["abus.marketing.markets", "abus.marketing.segmentation-niche", "abus.research.purposes-methods", "abus.marketing.role-objectives"],
      stem: "Read the case study. Ruvimbo Kitchen is a fictional business in Gaborone.\n\n**Ruvimbo Kitchen, Gaborone.** Ruvimbo Moeng sells ready-cooked meals for office workers, who order by phone for lunchtime delivery. She started the business four years ago and employs six people. Most of her customers are office workers, but students and families also buy. She sells no frozen or packaged meals in shops.\n\nSales have risen, but the market for ready meals in Gaborone has grown faster. Ruvimbo suspects that larger rivals with mass-market advertising are winning customers. She has just surveyed 400 of her customers using a questionnaire sent by message: 240 are office workers, 100 are students and 60 are families. She wants to know whether to continue serving office workers only or to widen her range to families. In the survey, 120 of the 400 customers said they would join a loyalty scheme with a free meal after ten orders.\n\n**Table: Ready-meals market in Gaborone**\n\n" +
        table(["", "2025 (US\\$)", "2026 (US\\$)"], [["Total market sales", m25, m26], ["Ruvimbo Kitchen sales", r25, r26]]) +
        "\n\nRuvimbo is considering a loyalty scheme costing US\\$3,000 a year, and a new family range costing US\\$9,000 to develop.",
      parts: checkExam(EXAM.CAM_DATA30, [
        P.fib({
          label: "(a)", marks: 2, stem: "Identify the type of research that Ruvimbo carried out and how the answers were collected.",
          template: "The survey is {{blank:a}} research because Ruvimbo collected the data herself, using a {{blank:b}}.",
          blanks: [
            { id: "a", accepted: ["primary"], choices: ["primary", "secondary"] },
            { id: "b", accepted: ["questionnaire"], choices: ["questionnaire", "focus group", "government report"] },
          ],
          explanation: "She collected the data first-hand with a questionnaire: primary research.",
        }),
        P.group({
          label: "(b)", stem: "Market share and growth",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "pct", value: s26, dp: 2, stem: "Calculate Ruvimbo Kitchen's market share in 2026, to two decimal places.", wrong: [12, 10.4], explanation: "226,800 ÷ 2,016,000 × 100 = 11.25%." }),
            P.num({ label: "(ii)", marks: 2, kind: "pct", value: mg, stem: "Calculate the growth of the market from 2025 to 2026, to one decimal place.", wrong: [r2(pctChange(r25, r26)), 10.7], explanation: "(2,016,000 − 1,800,000) ÷ 1,800,000 × 100 = 12.0%. Ruvimbo's own sales grew by 5.0%." }),
          ],
        }),
        P.group({
          label: "(c)", stem: "The survey",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "plain", value: st[1].sample, unit: "students", stem: "A stratified sample of 40 customers is taken from the 400. Calculate the number of students in the sample.", wrong: [24, 25], explanation: "100 ÷ 400 × 40 = 10 students." }),
            P.num({ label: "(ii)", marks: 2, kind: "pct", value: loyal, stem: "Calculate the percentage of the 400 customers who said they would join the loyalty scheme, to one decimal place.", wrong: [r2(120 / 240 * 100), 33.3], explanation: "120 ÷ 400 × 100 = 30.0%." }),
          ],
        }),
        P.manual({
          label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 }, levels: LV6,
          stem: "Analyse **two** reasons why Ruvimbo Kitchen's market share fell between 2025 and 2026.",
          points: ["The market grew by 12.0% but Ruvimbo's sales grew by only 5.0%", "So its share fell from 12.0% to 11.25%, even though sales rose", "Larger rivals with mass-market advertising may have won new customers", "Application: Ruvimbo serves mainly office workers by phone, so it may be missing students and families", "Rivals' advertising reaches more customers than a phone service can", "So the new customers in the growing market went elsewhere"],
          modelAnswer: "The market grew by 12.0% but Ruvimbo's sales grew by only 5.0%, so its share fell from 12.0% to 11.25% even though its sales rose. One reason is that larger rivals with mass-market advertising may have won the new customers. Ruvimbo's advertising is limited, so potential customers hear of the rivals first.\n\nA second reason is that Ruvimbo serves mainly office workers who order by phone, so she may be missing students and families who are part of the growing market. If these customers prefer other ways to order, they would go to rivals, so her share fell.",
          explanation: "Two reasons, supported by the figures.",
        }),
        P.manual({
          label: "(e)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 }, levels: LV6,
          stem: "Assess the benefits and costs of the loyalty scheme for Ruvimbo Kitchen.",
          points: ["Benefit: a free meal after ten orders encourages repeat orders", "Benefit: 30% of customers said they would join, so interest is reasonable", "Benefit: a customer list helps her contact customers and learn their tastes", "Cost: US\\$3,000 a year is large for a business with six employees", "Cost: free meals reduce the revenue per customer", "Assessment: worthwhile only if the extra repeat sales exceed US\\$3,000 and the free meals"],
          modelAnswer: "A free meal after ten orders encourages repeat orders, and 30% of customers said they would join, so interest is reasonable. A customer list would also help Ruvimbo to contact customers and learn their tastes. However, US\\$3,000 a year is large for a business with six employees, and free meals reduce revenue per customer. The scheme is worthwhile only if the extra repeat sales exceed the cost of the scheme and the free meals.",
          explanation: "Benefits and costs weighed against a condition.",
        }),
        P.manual({
          label: "(f)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 }, levels: LV8E,
          stem: "Advise Ruvimbo whether she should continue to serve office workers only or develop a family range. Justify your answer.",
          points: ["Office workers are 60% of her survey customers, so the niche is established", "Staying with office workers uses her existing skills and phone service at low cost", "But the niche market is limited and the market is growing faster than her sales", "Families (15% of customers) could widen her market", "A family range costs US\\$9,000, a large amount for a small business", "Families may need different products, prices and promotion", "Risk: spreading too widely may weaken her reputation with office workers", "Judgement with reason or condition, e.g. test a small family menu before committing the US\\$9,000"],
          modelAnswer: "Office workers are 60% of her survey customers, so the niche is established, and she can serve them with her existing skills and phone service at low cost. However, the niche is limited, and the market is growing faster than her sales. Families, 15% of her customers, could widen her market, but a family range costs US\\$9,000, which is large for a small business, and families may need different products, prices and promotion. Spreading too widely could also weaken her reputation with office workers. I advise her to test a small family menu using her existing kitchen before committing the full US\\$9,000, and to keep serving office workers as her core.",
          explanation: "A justified recommendation using the case figures.",
        }),
      ]),
      hints: ["Compare the growth of the market with the growth of the firm's sales."],
      explanation: "Primary research; share 11.25%; market growth 12.0%; 10 students; 30.0% would join; analysis, assessment and advice.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 4: CAM_ESSAY20 (Paper 1, AS: market research)
  b.struct({
    ...pc({ d: 4, skill: EXAM.CAM_ESSAY20.skill, secs: EXAM.CAM_ESSAY20.secs, paper: "Cambridge Paper 1" }),
    concepts: ["abus.research.purposes-methods", "abus.research.data-analysis"],
    stem: "Answer both parts of the question.",
    parts: checkExam(EXAM.CAM_ESSAY20, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 }, levels: LV8,
        stem: "Analyse **two** reasons why a business should carry out market research before launching a new product.",
        points: ["Reason 1: it shows how big the market is and how many customers might buy", "Development: so the firm can forecast sales and decide whether the product is worth launching", "Consequence: it avoids launching a product with too little demand", "Reason 2: it shows what customers want, such as features, price and packaging", "Development: the firm can design the product to fit their wants", "Consequence: sales and customer satisfaction are higher", "Context or limit: research costs money, and results are only as reliable as the sample", "Overall link: research reduces the risk of launching a product that fails"],
        modelAnswer: "Market research shows how large the market is and how many customers might buy. The firm can then forecast sales and decide whether the product is worth launching, which avoids launching a product with too little demand.\n\nResearch also shows what customers want, such as features, price and packaging. The firm can design the product to fit these wants, so sales and customer satisfaction are higher. However, research costs money and its results are only as reliable as the sample used. Overall, research reduces the risk of launching a product that fails.",
        explanation: "Two reasons analysed with chains of reasoning.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 450 }, levels: LV12,
        stem: "A fictional entrepreneur is about to open a new restaurant in Lusaka. She has US\\$15,000 in total and can spend up to US\\$800 on research. Evaluate whether she should use primary research, secondary research or both.",
        points: ["Secondary research (population, incomes, other restaurants) is cheap or free", "Secondary data is quick and shows the size and growth of the market", "But it may be out of date or not specific to her area", "Primary research (a survey of local people) gives specific, current information", "Primary research can show tastes, prices people would pay and competitors' weaknesses", "But a survey costs money and time, and a small sample may be biased", "US\\$800 is small relative to US\\$15,000 but a poor decision could lose all of it", "A small survey of 50 to 100 local people could fit the budget", "Using both gives the best evidence for the money", "Primary research would be more valuable if the area is unfamiliar", "Secondary research alone is risky for a decision of this size", "Judgement with a condition, e.g. secondary first, then a small survey within the US\\$800"],
        modelAnswer: "Secondary research on population, incomes and other restaurants in the area is cheap or free and quick, and it shows the size and growth of the market. However, it may be out of date or not specific to her area.\n\nPrimary research, such as a survey of local people, gives specific, current information on tastes, the prices people would pay and the weaknesses of competitors. But a survey costs money and time, and a small sample may be biased.\n\nUS\\$800 is small compared with the US\\$15,000 she can invest, but a poor decision could lose most of it, so research is worth its cost. A small survey of 50 to 100 local people could fit the budget. Using both methods gives the best evidence for the money. Secondary research alone is risky for a decision of this size, so she should start with secondary data and then carry out a small survey within the US\\$800, especially if the area is unfamiliar to her.",
        explanation: "Primary and secondary research weighed in context, with a conditional recommendation.",
      }),
    ]),
    hints: ["In (a) develop each reason to a consequence; in (b) weigh the cost of research against the risk."],
    explanation: "(a) two reasons for market research; (b) secondary then primary research within the budget.",
  });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 5: CAM_ESSAY20 (Paper 4, A Level: marketing plan and strategy)
  b.struct({
    ...pc({ d: 5, skill: EXAM.CAM_ESSAY20.skill, secs: EXAM.CAM_ESSAY20.secs, paper: "Cambridge Paper 4" }),
    concepts: ["abus.marketing.plan-strategy", "abus.marketing.international-marketing"],
    stem: "Case extract: Moyo Foods is a fictional company in Bulawayo that makes sauces and sells them to supermarkets in Zimbabwe. Its home sales have stopped growing. The directors have written a marketing plan aimed at doubling sales in three years. It has two parts: a new range of premium sauces for the home market, and exports to Zambia and Botswana. The plan has a budget of US\\$120,000, uses social media advertising and an AI tool that suggests offers to regular customers. The marketing manager says: \"We have never exported, and the plan was prepared in a hurry.\"\n\nAnswer both parts of the question.",
    parts: checkExam(EXAM.CAM_ESSAY20, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 }, levels: LV8,
        stem: "Analyse **two** benefits to Moyo Foods of preparing a marketing plan.",
        points: ["Benefit 1: it sets clear, measurable objectives (doubling sales in three years)", "Development: every department knows what it is working towards", "Consequence: effort and money are directed to the same goal", "Benefit 2: it sets a budget (US\\$120,000) and a timetable", "Development: the directors can check spending and results against the plan", "Consequence: problems such as slow export sales are spotted early and corrected", "Context or limit: a plan prepared in a hurry may rest on weak forecasts", "Overall link: a good plan improves control and coordination"],
        modelAnswer: "A marketing plan sets clear, measurable objectives, such as doubling sales in three years, so every department knows what it is working towards. Effort and money are then directed to the same goal.\n\nA plan also sets a budget of US\\$120,000 and a timetable, so the directors can check spending and results against it. Problems, such as slow export sales, can be spotted early and corrected. However, a plan prepared in a hurry may rest on weak forecasts. Overall, a good plan improves control and coordination.",
        explanation: "Two benefits analysed with chains of reasoning.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 450 }, levels: LV12,
        stem: "Evaluate whether Moyo Foods should go ahead with its plan to double sales in three years.",
        points: ["Home sales have stopped growing, so new markets or products are needed", "A premium range could earn higher margins and attract new customers", "Zambia and Botswana are nearby, so exporting can start with low investment", "Social media and the AI tool can target customers cheaply and personalise offers", "The plan has clear objectives and a budget", "Doubling sales in three years is ambitious, especially for a firm that has never exported", "Exports bring tariffs, transport costs, exchange-rate risk and differences in taste", "US\\$120,000 is a large sum, and a hurried plan may rest on weak forecasts", "The AI tool needs data and skills, and customers may object to the use of their data", "Two big changes at once (a premium range and exports) may stretch management", "A phased plan, e.g. exports first through an agent and a premium range later, would reduce risk", "Judgement with condition, e.g. go ahead only if research confirms demand and the plan is reviewed each year"],
        modelAnswer: "Home sales have stopped growing, so new markets or products are needed. A premium range could earn higher margins and attract new customers, and Zambia and Botswana are nearby, so exporting can start with low investment. Social media and the AI tool can target customers cheaply and personalise offers, and the plan has clear objectives and a budget.\n\nHowever, doubling sales in three years is ambitious for a firm that has never exported. Exports bring tariffs, transport costs, exchange-rate risk and differences in taste. US\\$120,000 is a large sum and a plan prepared in a hurry may rest on weak forecasts. The AI tool needs data and skills, and customers may object to the use of their data. Two big changes at once, a premium range and exports, may also stretch management.\n\nA phased plan, such as exports first through an agent and the premium range later, would reduce the risk. Moyo Foods should go ahead only if research confirms demand in the export markets and the plan is reviewed each year against its targets.",
        explanation: "A balanced evaluation of an ambitious plan with a phased, conditional recommendation.",
      }),
    ]),
    hints: ["In (b) weigh the growth opportunity against the size of the targets and the risks."],
    explanation: "(a) two benefits of planning; (b) the plan is promising but ambitious and risky; a phased approach is advised.",
  });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 6: CAM_P3_8 (elasticity)
  {
    const p0 = 4, p1 = 4.4, q0 = 2400, q1 = 1920;
    const ped = elasticity.price(p0, p1, q0, q1);
    chk(ped, -2, 1e-9);
    const r0 = p0 * q0, r1 = p1 * q1;
    chk(r0, 9600, 1e-6);
    chk(r1, 8448, 1e-6);
    b.struct({
      ...pc({ d: 4, skill: EXAM.CAM_P3_8.skill, secs: EXAM.CAM_P3_8.secs, calculator: true, paper: "Cambridge Paper 3" }),
      concepts: ["abus.marketing.elasticity"],
      stem: "Case extract: Mhofu Bakery is a fictional bakery in Gweru. It raised the price of a celebration cake from US\\$4.00 to US\\$4.40. Monthly sales of the cake fell from 2,400 to 1,920. The owner's other products are sold in a market with many close substitutes.",
      parts: checkExam(EXAM.CAM_P3_8, [
        P.num({ label: "(a)", marks: 3, type: "CALCULATION", kind: "index", dp: 1, value: ped, stem: "Calculate the price elasticity of demand for the cake, to one decimal place, including the sign. Show your working.", wrong: [-0.5, 2], explanation: "Price: +0.40 ÷ 4.00 × 100 = +10%. Quantity: −480 ÷ 2,400 × 100 = −20%. PED = −20 ÷ 10 = −2.0.", workedSolution: "1. % change in price = (4.40 − 4.00) ÷ 4.00 × 100 = +10%.\n2. % change in quantity = (1,920 − 2,400) ÷ 2,400 × 100 = −20%.\n3. PED = −20 ÷ +10 = −2.0." }),
        P.manual({ label: "(b)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { max: 200 }, levels: LV5, stem: "Advise Mhofu Bakery whether to reverse the price rise. Use your answer to (a).", points: ["PED of −2.0 is elastic: quantity fell by a larger percentage (20%) than price rose (10%)", "Revenue fell from US\\$9,600 to US\\$8,448, a fall of US\\$1,152 a month", "A price cut would be expected to raise revenue", "Profit also depends on costs: fewer cakes may mean lower costs too", "Recommendation: reduce the price, unless costs have risen enough to justify the higher price"], modelAnswer: "A PED of −2.0 is elastic: quantity fell by 20%, more than the 10% rise in price. Revenue fell from US\\$9,600 to US\\$8,448, so the price rise was unwise for revenue. A price cut would be expected to raise revenue. However, profit also depends on costs, so I advise reducing the price unless the cost of making the cake has risen enough to justify the higher price.", explanation: "Elastic demand: a price rise lowers revenue." }),
      ]),
      hints: ["Percentage changes are measured on the original value."],
      explanation: "PED −2.0 (elastic); revenue fell by US\\$1,152; advise reversing the rise unless costs justify it.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 7: CAM_P3_8 (sales forecasting)
  {
    const C = [61, 76, 90, 71, 73, 88, 102, 83, 85, 100, 114, 95];
    const LAB = ["Y1 Q1", "Y1 Q2", "Y1 Q3", "Y1 Q4", "Y2 Q1", "Y2 Q2", "Y2 Q3", "Y2 Q4", "Y3 Q1", "Y3 Q2", "Y3 Q3", "Y3 Q4"];
    const m = movingAverage4(C, { adjust: false });
    const c6 = m.rows[5].centred, s6 = m.rows[5].seasonal;
    chk(c6, 85, 1e-9);
    chk(s6, 3, 1e-9);
    const lastCentred = m.rows[9].centred;
    chk(lastCentred, 97, 1e-9);
    const fc = lastCentred + 3 * 3 + -9;
    chk(fc, 97, 1e-9);
    chk(m.seasonalAverage[0], -9, 1e-9);
    const tbl = table(["Period", "Sales (hundreds of units)", "Moving total of 4 quarters"], C.map((v, i) => [LAB[i], v, m.rows[i].movingTotal ?? ""]));
    b.struct({
      ...pc({ d: 4, skill: EXAM.CAM_P3_8.skill, secs: EXAM.CAM_P3_8.secs, calculator: true, paper: "Cambridge Paper 3" }),
      concepts: ["abus.marketing.sales-forecasting"],
      stem: "Case extract: Sibanda Beverages is a fictional drinks supplier in Harare. Its quarterly sales (hundreds of units) are shown below. Each moving total is placed between the quarter shown and the next quarter. The additive model is used and averages are not adjusted.\n\n" + tbl + "\n\nThe average seasonal variation for the first quarter is −9. The trend is expected to rise by 3.0 (hundred units) each quarter after the last centred moving average, which is 97 for Y3 Q2.",
      parts: checkExam(EXAM.CAM_P3_8, [
        P.group({
          label: "(a)", stem: "Y2 Q2 (the sixth period)",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "plain", value: c6, dp: 1, stem: "Calculate the centred moving average for Y2 Q2, to one decimal place.", wrong: [86, 334 / 4], explanation: "The totals either side are 334 and 346. Centred average = (334 + 346) ÷ 8 = 85." }),
            P.num({ label: "(ii)", marks: 1, kind: "plain", value: s6, dp: 1, stem: "Calculate the seasonal variation for Y2 Q2 (sales were 88).", wrong: [-3, 88], explanation: "88 − 85 = +3." }),
          ],
        }),
        P.num({ label: "(b)", marks: 3, type: "CALCULATION", kind: "plain", dp: 1, value: fc, stem: "Forecast sales for Y4 Q1, which is three quarters after Y3 Q2, to one decimal place.", wrong: [97 + 9 + 9, 97 - 9], explanation: "Trend = 97 + 3 × 3.0 = 106. Forecast = 106 + (−9) = 97.0 hundred units.", workedSolution: "1. Trend for Y4 Q1 = 97 + 3 × 3.0 = 106.\n2. Forecast = 106 − 9 = 97.0 (hundred units)." }),
        P.manual({ label: "(c)", marks: 2, stem: "State **two** limitations of this sales forecast.", points: ["It assumes the trend and seasonal pattern continue unchanged", "Outside shocks, such as a new rival, a recession or a price change, are not allowed for"], modelAnswer: "It assumes that the trend and the seasonal pattern continue unchanged, and it does not allow for outside shocks such as a new rival, a recession or a price change.", explanation: "Assumptions and shocks." }),
      ]),
      hints: ["Centre the average by adding the two totals either side and dividing by 8."],
      explanation: "Centred average 85; seasonal variation +3; Y4 Q1 forecast 97.0; limitations of assumptions and shocks.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 8: CAM_P3_16 (product development)
  {
    const cost = 36000, flow = 14400, yrs = 5;
    const pb = invest.payback(cost, Array(yrs).fill(flow));
    chk(pb, 2.5, 1e-9);
    const net = flow * yrs - cost;
    chk(net, 36000, 1e-9);
    b.struct({
      ...pc({ d: 5, skill: EXAM.CAM_P3_16.skill, secs: EXAM.CAM_P3_16.secs, calculator: true, paper: "Cambridge Paper 3" }),
      concepts: ["abus.marketing.product-development"],
      stem: `Case extract: Tonde Tools is a fictional manufacturer in Gaborone with 40 employees. It sells hand tools to hardware shops. A rival has launched a cordless power drill, and Tonde's sales of manual drills have fallen by 15% in a year. The directors are considering developing their own cordless drill. R&D and testing would cost US\\$30,000 and the launch US\\$6,000. They expect a net cash inflow of US\\$14,400 a year for five years, with the inflow arising evenly through each year. The R&D team has never worked on electrical products, and the rival holds a patent on its battery design.`,
      parts: checkExam(EXAM.CAM_P3_16, [
        P.group({
          label: "(a)", stem: "Calculations",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "years", value: pb, stem: "Calculate the payback period for the cordless drill, in years to two decimal places.", wrong: [5, 0.4], explanation: "Total cost = 30,000 + 6,000 = US\\$36,000. Payback = 36,000 ÷ 14,400 = 2.50 years." }),
            P.num({ label: "(ii)", marks: 2, kind: "money", value: net, stem: "Calculate the total net gain over the five years (total inflows minus the cost).", wrong: [72000, 6000], explanation: "Total inflows = 14,400 × 5 = US\\$72,000. Net gain = 72,000 − 36,000 = US\\$36,000." }),
          ],
        }),
        P.manual({
          label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 }, levels: LV6,
          stem: "Analyse **two** risks to Tonde Tools of developing the cordless drill.",
          points: ["The R&D team has no experience of electrical products, so development may take longer or fail", "Application: costs may exceed US\\$30,000 or the product may not work reliably", "The rival holds a patent on its battery design", "Application: Tonde may need to design around it or pay a licence fee, adding cost", "Sales may fall short of forecast because a rival is already established", "So the payback of 2.5 years may be longer, leaving the firm with less cash"],
          modelAnswer: "The R&D team has never worked on electrical products, so development may take longer, cost more than US\\$30,000 or produce a drill that does not work reliably. This would delay the launch and use up cash.\n\nThe rival also holds a patent on its battery design, so Tonde may have to design around it or pay a licence fee, which adds cost. In addition, a rival is already established, so sales may be lower than the forecast of US\\$14,400 a year. The payback of 2.5 years could then be much longer, leaving the firm with less cash.",
          explanation: "Two risks analysed.",
        }),
        P.manual({
          label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 }, levels: LV6,
          stem: "Evaluate whether Tonde Tools should develop its own cordless drill.",
          points: ["For: a payback of 2.5 years and a net gain of US\\$36,000 is attractive on the forecast", "For: sales of manual drills are falling, so a new product is needed", "Against: the R&D team lacks experience and the rival holds a patent", "Against: US\\$36,000 is large for a business of 40 employees and the forecast is uncertain", "Alternative: license a design or buy in drills for resale at lower risk", "Judgement with condition, e.g. go ahead only if a patent check and a small prototype test are successful"],
          modelAnswer: "On the forecast the project pays back in 2.5 years and gives a net gain of US\\$36,000, and as sales of manual drills are falling a new product is needed. However, the R&D team lacks experience, the rival holds a patent and US\\$36,000 is large for a firm with 40 employees, so the forecast is uncertain. Licensing a design or buying in drills for resale would carry less risk. Tonde should go ahead only if a patent check and a prototype test are successful; otherwise it should license or buy in drills.",
          explanation: "A balanced evaluation with a condition.",
        }),
      ]),
      hints: ["Total cost is R&D plus the launch."],
      explanation: "Payback 2.50 years; net gain US\\$36,000; the main risks are inexperience and the rival's patent.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 9: CAM_P3_12 (international marketing) - extended response
  b.ext({
    ...pc({ d: 5, skill: EXAM.CAM_P3_12.skill, secs: EXAM.CAM_P3_12.secs, paper: "Cambridge Paper 3" }),
    concepts: ["abus.marketing.international-marketing", "abus.marketing.plan-strategy"],
    marks: 12, wordLimit: { max: 450 }, levels: LV12,
    stem: "Case extract: Zambezi Chocolate is a fictional company in Harare with 80 employees. It makes premium chocolate bars with local cocoa and sells them in Zimbabwe, where sales are flat. A distributor in Johannesburg has offered to sell the bars in South Africa, but wants a 20% lower price and a smaller bar suited to local tastes. A Zimbabwean investor suggests building a factory in South Africa. The directors fear that selling at the lower price will damage the premium brand, and that exchange rates may change. Evaluate which entry strategy Zambezi Chocolate should choose: exporting through the distributor, a licence to a South African manufacturer, or building its own factory.",
    points: ["Exporting through the distributor: low investment and quick entry", "Exporting: the distributor's local knowledge and network", "Exporting: a 20% lower price reduces the margin and may weaken the premium brand", "Exporting: transport costs, tariffs and exchange-rate risk", "Licence: low cost and avoids tariffs", "Licence: loss of control over quality, so the premium brand could be damaged", "Licence: the licensee may learn the know-how and compete later", "Own factory: full control of quality and brand, close to customers", "Own factory: very high cost and risk for an 80-employee firm; unfamiliar laws", "Adaptation: a smaller bar suits local tastes but costs more to design and make", "The choice depends on resources, experience and the importance of the brand", "Judgement with condition, e.g. start with exporting through a distributor on a trial basis and review"],
    modelAnswer: "Exporting through the distributor needs little investment and gives quick entry with the distributor's local knowledge and network. However, a 20% lower price cuts the margin and may weaken the premium brand, and Zambezi would face transport costs, tariffs and exchange-rate risk.\n\nA licence would cost little and avoid tariffs, but the company would lose control of quality, so its premium brand could be damaged, and the licensee might learn the know-how and compete later. Building its own factory would give full control of quality and the brand and close contact with customers, but it is very costly and risky for a firm of 80 employees and involves unfamiliar laws.\n\nA smaller bar suited to local tastes would help sales but costs more to design and make. The best choice depends on the firm's resources and the importance of its brand. Zambezi should start with exporting through the distributor on a trial basis, negotiate a smaller price cut, and review results before committing more money.",
    hints: ["Weigh the cost, risk and control of each entry method, then judge with a condition."],
    explanation: "Three entry methods compared against cost, risk and brand control, with a conditional recommendation.",
  });
});
