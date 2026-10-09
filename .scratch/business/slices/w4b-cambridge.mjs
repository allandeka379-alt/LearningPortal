// W4b exam-format items, Cambridge IGCSE Business 0264: Paper 1 (20 marks) and a complete Paper 2 case study (80).
// Mark splits within parts are ours. All figures are fictional and computed below.
import { concept, P, CAM, money, fmt, r2, round, table, cashFlow, f, check } from "../lib.mjs";

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

const LV4 = [
  [2, 3, 4, "Two points explained and applied to the business."],
  [1, 1, 2, "Points identified with little explanation."],
];
const LV8P1 = [
  [3, 6, 8, "Both options analysed in context using the data, with a justified recommendation."],
  [2, 3, 5, "Some analysis of one or both options; recommendation weakly supported."],
  [1, 1, 2, "Simple points with no justified decision."],
];
const LV8 = [
  [3, 6, 8, "Two points explained and clearly applied to the business in the case, using the data."],
  [2, 3, 5, "Points explained with limited application to the case."],
  [1, 1, 2, "Points identified with little explanation or application."],
];
const LV12 = [
  [3, 9, 12, "Developed analysis of both options or sides, applied to the case with data, and a justified recommendation or conclusion."],
  [2, 5, 8, "Analysis of relevant points with some application; conclusion weakly supported."],
  [1, 1, 4, "Points identified or described with little application and no supported judgement."],
];

// ---- Paper 1 (20): a juice processor considering a new machine.
const j = { fc: 4200, price: 1.2, vc: 0.5, sales: 9000 };
const jBe = r2(f.breakEvenOutput(j.fc, j.price, j.vc));
const jMos = f.marginOfSafety(j.sales, jBe);
const jAc = f.averageCost(f.totalCost(j.fc, j.vc * j.sales), j.sales);
const m = { fc: 5700, vc: 0.3 };
const mBe = r2(f.breakEvenOutput(m.fc, j.price, m.vc));
const jProfitNow = r2((j.price - j.vc) * j.sales - j.fc), jProfitM = r2((j.price - m.vc) * j.sales - m.fc);
const jTbl = table(["Per month", "Now", "With new bottling machine"], [["Fixed costs (US\\$)", j.fc, m.fc], ["Variable cost per bottle (US\\$)", j.vc.toFixed(2), m.vc.toFixed(2)], ["Selling price per bottle (US\\$)", j.price.toFixed(2), j.price.toFixed(2)], ["Expected sales (bottles)", j.sales, j.sales]]);

// ---- Paper 2 (80): Msasa Furniture Ltd.
const Y1 = { rev: 615000, gp: 246000, p: 73800, ce: 492000, ca: 153600, inv: 71700, cl: 102400 };
const Y2 = { rev: 738000, gp: 258300, p: 66420, ce: 553500, ca: 174080, inv: 112700, cl: 139300 };
const ratios = (y) => ({ gpm: f.grossMargin(y.gp, y.rev), pm: f.profitMargin(y.p, y.rev), roce: f.roce(y.p, y.ce), cr: f.current(y.ca, y.cl), at: f.acidTest(y.ca, y.inv, y.cl) });
const R1 = ratios(Y1), R2 = ratios(Y2);
check("gpm1", R1.gpm, 40); check("gpm2", R2.gpm, 35); check("roce2", R2.roce, 12);
const app1 = table(["US\\$", "Year 1", "Year 2"], [["Revenue", Y1.rev, Y2.rev], ["Gross profit", Y1.gp, Y2.gp], ["Profit for the year", Y1.p, Y2.p], ["Capital employed", Y1.ce, Y2.ce], ["Current assets", Y1.ca, Y2.ca], ["of which inventory", Y1.inv, Y2.inv], ["Current liabilities", Y1.cl, Y2.cl]]);
const pr = { o1: 9640, w1: 40, o2: 10550, w2: 50, rej1: 3, rej2: 5 };
const lp1 = f.labourProductivity(pr.o1, pr.w1), lp2 = f.labourProductivity(pr.o2, pr.w2);
const app2 = table(["Production", "Year 1", "Year 2"], [["Units made (desks, chairs and beds)", pr.o1, pr.o2], ["Production workers", pr.w1, pr.w2], ["Units per worker per year", lp1, lp2], ["Units rejected at inspection", `${pr.rej1}%`, `${pr.rej2}%`]]);
const desk = { price: 52, sales: 910, bfc: 8060, bvc: 39, ffc: 15120, fvc: 31, bmax: 1050, fmax: 2200 };
const LINE = 246500, RATE = 13.5, KILN = 14800;
const bBe = r2(f.breakEvenOutput(desk.bfc, desk.price, desk.bvc)), fBe = r2(f.breakEvenOutput(desk.ffc, desk.price, desk.fvc));
const bP = (desk.price - desk.bvc) * desk.sales - desk.bfc, fP = (desk.price - desk.fvc) * desk.sales - desk.ffc;
const tender = 1430;
const fPT = (desk.price - desk.fvc) * tender - desk.ffc;
const app3 = table(["School desks (per month)", "Batch production now", "Proposed flow production line"], [["Fixed costs (US\\$)", desk.bfc, desk.ffc], ["Variable cost per desk (US\\$)", desk.bvc, desk.fvc], ["Selling price per desk (US\\$)", desk.price, desk.price], ["Maximum output (desks)", desk.bmax, desk.fmax], ["Cost to set up (US\\$)", "-", LINE]]);
const cf = cashFlow({
  months: ["Month 1", "Month 2", "Month 3"],
  opening: 4730,
  inflows: [["Cash sales", [38690, 44300, 52600]], ["Receipts from schools and shops", [19700, 17900, 45300]]],
  outflows: [["Timber and materials", [29800, 31900, 28300]], ["Wages", [22150, 22150, 22150]], ["Other costs", [7950, 7950, 7950]], ["New drying kiln", [0, KILN, 0]]],
});
const app4 = cf.md;

concept("bus.operations.break-even-calculation", { file: "exam/w4b-cambridge", keyPrefix: "exam.w4b-cambridge", applies: CAM }, (b) => {
  // ---- Paper 1 ----
  const pA = group("(a)", "Use the information in the table for the business now.", [
    P.num({ label: "(i)", marks: 2, kind: "money", value: jAc, stem: "Calculate the average cost of a bottle at expected sales.", wrong: [j.vc, round(j.fc / j.sales, 2)], explanation: `(${fmt(j.fc)} + ${j.vc.toFixed(2)} × ${fmt(j.sales)}) ÷ ${fmt(j.sales)} = ${money(jAc)}.` }),
    P.num({ label: "(ii)", marks: 2, kind: "units", value: jBe, stem: "Calculate the break-even output.", wrong: [round(j.fc / j.price, 0)], explanation: `${fmt(j.fc)} ÷ (${j.price.toFixed(2)} − ${j.vc.toFixed(2)}) = ${fmt(jBe)} bottles.` }),
  ]);
  const pB = group("(b)", "Use the information in the table.", [
    P.num({ label: "(i)", marks: 2, kind: "units", value: jMos, stem: "Calculate the margin of safety now.", wrong: [j.sales], explanation: `${fmt(j.sales)} − ${fmt(jBe)} = ${fmt(jMos)} bottles.` }),
    P.num({ label: "(ii)", marks: 2, kind: "units", value: Math.ceil(mBe), stem: "Calculate the break-even output with the new bottling machine, rounded up to a whole bottle.", wrong: [jBe, Math.floor(mBe)], explanation: `${fmt(m.fc)} ÷ (${j.price.toFixed(2)} − ${m.vc.toFixed(2)}) = ${round(mBe, 1)}, rounded up to ${fmt(Math.ceil(mBe))} bottles.` }),
  ]);
  const pC = P.manual({
    label: "(c)", marks: 4, type: "EXTENDED_RESPONSE",
    stem: "Explain **two** limitations of break-even analysis for Chipo's business.",
    points: [
      ["Limitation 1: assumes all bottles are sold at one price.", 1],
      ["Applied: shops buying in bulk may get discounts; tourists' demand varies with the season.", 1],
      ["Limitation 2: assumes costs are straight lines / forecasts may be wrong.", 1],
      ["Applied: fruit prices vary with the harvest, so the variable cost per bottle changes.", 1],
    ],
    levels: LV4,
    modelAnswer: "Break-even assumes every bottle sells at the same price, but Chipo may give discounts to shops that buy in bulk, so revenue would be lower than the chart shows. It also assumes the variable cost per bottle stays the same, but the cost of fruit rises when the harvest is poor, which would raise the break-even output.",
  });
  const pD = P.manual({
    label: "(d)", marks: 8, type: "EXTENDED_RESPONSE",
    stem: "Chipo is considering buying the new bottling machine. Recommend whether she should buy it. Justify your answer.",
    points: [
      [`Machine raises contribution from ${money(r2(j.price - j.vc))} to ${money(r2(j.price - m.vc))} a bottle.`, 2],
      [`Profit at expected sales rises from ${money(jProfitNow)} to ${money(jProfitM)} a month.`, 2],
      [`But fixed costs rise and break-even rises from ${fmt(jBe)} to about ${fmt(Math.ceil(mBe))} bottles; more risk if sales fall.`, 2],
      ["Justified recommendation, e.g. buy if sales are reliable / finance and capacity considered.", 2],
    ],
    levels: LV8P1,
    modelAnswer: `The machine lowers the variable cost from ${money(j.vc)} to ${money(m.vc)}, so each bottle contributes ${money(r2(j.price - m.vc))} instead of ${money(r2(j.price - j.vc))}. At expected sales of ${fmt(j.sales)} bottles, monthly profit would rise from ${money(jProfitNow)} to ${money(jProfitM)}. However, fixed costs rise to ${money(m.fc)}, so the break-even output rises from ${fmt(jBe)} to about ${fmt(Math.ceil(mBe))} bottles and the business would lose more if sales fell sharply. Because expected sales are well above both break-even levels and profit would rise by ${money(r2(jProfitM - jProfitNow))} a month, Chipo should buy the machine, provided she is confident sales will stay near ${fmt(j.sales)} bottles and can finance it without straining her cash flow.`,
  });
  addSubResponses(b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1350, paper: "Paper 1", calculator: true,
    concepts: ["bus.operations.break-even-calculation", "bus.operations.break-even-chart", "bus.operations.costs"],
    stem: `Chipo runs a small business in Mutare that makes fruit juice from local mangoes and oranges. She sells it in 500 ml bottles to shops and lodges. She is thinking of buying a new bottling machine.\n\n${jTbl}`,
    parts: [pA, pB, pC, pD],
    hints: ["(a)(ii) Fixed costs ÷ (price − variable cost).", "(b)(ii) Use the new fixed costs and variable cost."],
    explanation: `(a)(i) ${money(jAc)}. (a)(ii) ${fmt(jBe)} bottles. (b)(i) ${fmt(jMos)}. (b)(ii) ${round(mBe, 1)} (about ${Math.ceil(mBe)}). (c) One price; straight-line costs. (d) Higher profit but higher break-even.`,
    workedSolution: `1. Average cost = (${fmt(j.fc)} + ${j.vc.toFixed(2)} × ${fmt(j.sales)}) ÷ ${fmt(j.sales)} = ${money(jAc)}.\n2. Break-even now = ${fmt(j.fc)} ÷ ${(j.price - j.vc).toFixed(2)} = ${fmt(jBe)}; margin of safety = ${fmt(jMos)}.\n3. With machine: ${fmt(m.fc)} ÷ ${(j.price - m.vc).toFixed(2)} = ${round(mBe, 1)}.`,
  }), [pA, pB]);

  // ---- Paper 2 (80) ----
  const caseText = [
    "**Msasa Furniture Ltd** (a fictional business)",
    "",
    "Msasa Furniture Ltd (MF) is a private limited company in Chinhoyi that makes wooden school desks, chairs and beds. It was started fifteen years ago by Tendai Chikore as a small workshop and now employs 50 production workers and 12 office and sales staff. Tendai is the Managing Director and owns most of the shares; his sister Nyasha is the Finance Director.",
    "",
    "**Products and customers.** About half of MF's revenue comes from school desks and chairs, sold to schools in Mashonaland West and to the education departments of church organisations. Schools usually buy on credit and pay at the end of each term. Beds and other household furniture are sold through MF's showroom and through three furniture shops in Harare, which also pay after 60 days. MF has a good reputation for strong, long-lasting furniture made from hardwood timber.",
    "",
    "**Production.** All products are made by batch production. The factory makes a batch of 180 desks, then the machines are reset to make chairs or beds. Resetting takes most of a day. Timber is bought from a sawmill 165 km away, usually in large loads to gain a discount, and stored in the yard, where some planks crack in the sun. Last year Tendai employed ten extra workers to meet more orders, but output rose by less than he expected (Appendix 2). Rejected items have also increased, mostly because of poor joints, and some schools have complained.",
    "",
    "The Production Manager, Farai Moyo, wants to introduce just-in-time (JIT) for timber, with smaller deliveries every week. He also wants to start Kaizen groups, in which workers meet each week to suggest small improvements. Some long-serving workers say they have no time for meetings and that the new workers need training, not meetings.",
    "",
    "**A new production line.** The government has announced that it will buy desks for new schools, and MF has been invited to tender for a contract that could add up to 520 desks a month for two years. Farai proposes a flow production line just for school desks (Appendix 3). The line would cost US\\$246,500 and would have to be financed by a bank loan. It would lower the variable cost of each desk, but the fixed costs of the line are high. Nyasha points out that the contract has not been won yet, and that if MF loses the tender, sales of desks may stay at about 910 a month. Tendai believes that growing larger would also help MF to buy timber, finance and transport more cheaply.",
    "",
    "**Finance.** MF's revenue grew strongly in Year 2, but profit fell (Appendix 1). Nyasha has warned that the company's liquidity has become weaker. Inventory of timber and finished furniture has risen, and schools are paying more slowly than before. MF already has a bank overdraft, which is close to its limit. The cash flow forecast for the next three months (Appendix 4) includes a new drying kiln, which Farai says is needed to stop timber cracking. Nyasha has suggested several ways to deal with the cash shortage, including asking the bank to increase the overdraft, delaying the kiln, offering schools a small discount for paying within 30 days, and selling some of the excess stock of beds at reduced prices.",
    "",
    "**The bank.** Nyasha has asked MF's bank for a five-year loan for the production line. The bank manager has asked for the company's latest accounts and a cash flow forecast, and has said that the bank will look carefully at both profitability and liquidity. Assume the bank's interest rate on the loan would be 13.5% a year. The bank manager has also said that she would want the company's buildings as security.",
    "",
    "**People.** MF's workers are mostly local and many have worked there for years. Labour turnover has been low, but some skilled carpenters have recently left for better-paid work in Harare. Tendai makes most decisions himself, and workers say they rarely hear about plans until they are announced. He admits that, as the company has grown, it has become harder for him to know what is happening on the factory floor.",
    "",
    "**Competition.** Two larger furniture makers in Harare already use flow production for school desks and sell them at lower prices than MF. They also deliver large orders quickly with their own lorries. However, several schools have told MF's sales staff that the cheaper desks break within two or three years, and that they would rather pay a little more for MF's hardwood desks if delivery were reliable. Imported steel-framed desks are also becoming popular in towns because they are light and easy to move. Tendai believes that MF's quality is its main advantage, but he knows that the government tender will be won mainly on price and delivery time.",
    "",
    "**Quality and suppliers.** Most rejected items have poorly fitted joints. Farai believes that the main cause is that new workers are not shown the correct methods, and that cracked timber from the yard makes the problem worse. The sawmill has said it could deliver smaller loads every week, but it warned that roads are sometimes closed in the rainy season and that it cannot promise delivery dates in December and January. Another sawmill, 65 km away, sells softwood timber, which is cheaper but less strong.",
    "",
    "**Management.** As MF has grown, Tendai has continued to approve every purchase over US\\$380 himself and to deal with the largest customers personally. Nyasha believes he should appoint a production supervisor for each section of the factory and hold a short meeting with all staff each month to explain the company's plans.",
    "",
    "The board meets next month to decide how to improve production, whether to invest in the flow production line and how to solve the company's cash problems. Tendai wants MF to become the leading furniture maker in the region, but Nyasha believes the company must first get its finances under control.",
    "",
    `**Appendix 1: Extracts from the accounts**\n\n${app1}`,
    "",
    `**Appendix 2: Production data**\n\n${app2}`,
    "",
    `**Appendix 3: School desks: batch production and the proposed flow line**\n\nMF currently sells about ${desk.sales} desks a month. If it wins the government tender, it could sell about ${fmt(tender)} desks a month.\n\n${app3}`,
    "",
    `**Appendix 4: Cash flow forecast for the next three months (US\\$)**\n\n${app4}`,
  ].join("\n");

  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 5400, paper: "Paper 2", calculator: true,
    concepts: [
      "bus.operations.production-methods", "bus.operations.efficiency-lean", "bus.operations.purchasing-inventory",
      "bus.operations.economies-of-scale", "bus.operations.break-even-calculation",
      "bus.finance.cash-flow-problems", "bus.finance.cash-flow-forecast", "bus.finance.profitability-ratios",
      "bus.finance.liquidity-ratios", "bus.finance.users-of-accounts",
    ],
    stem: caseText,
    parts: [
      group("(1)", "Question 1", [
        P.manual({
          label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
          stem: "Explain **two** ways MF could increase its labour productivity.",
          points: [
            ["Identifies: training for the new workers.", 1],
            ["Explains: more skilled workers work faster and make fewer faulty joints.", 1],
            [`Applies: productivity fell from ${lp1} to ${lp2} units per worker; rejects rose from ${pr.rej1}% to ${pr.rej2}%.`, 2],
            ["Identifies: reduce time lost resetting machines / better organisation / Kaizen / motivation.", 1],
            ["Explains: more working time producing, so more output per worker.", 1],
            ["Applies: resetting takes most of a day between batches; workers rarely consulted.", 2],
          ],
          levels: LV8,
          modelAnswer: `Labour productivity fell from ${lp1} units per worker in Year 1 to ${lp2} in Year 2, after ten workers were added (Appendix 2). First, MF should train its new workers. Better-trained carpenters work faster and make fewer poor joints, so fewer items are rejected (rejects rose from ${pr.rej1}% to ${pr.rej2}%) and more good units are made per worker. Second, MF could reduce the time lost between batches. Resetting the machines takes most of a day, during which workers produce little; planning longer batches, or the Kaizen groups Farai suggests, could find ways to cut this time, raising output per worker without more staff.`,
        }),
        P.manual({
          label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
          stem: "Should MF introduce just-in-time (JIT) for its timber? Justify your answer.",
          points: [
            ["Benefits: less cash tied up in timber; inventory has risen and liquidity is weak.", 2],
            ["Less waste: timber cracks in the yard; less storage space needed.", 2],
            [`Uses data: inventory rose from ${money(Y1.inv)} to ${money(Y2.inv)}; acid test ${round(R2.at, 2).toFixed(2)} : 1.`, 2],
            ["Problems: sawmill 165 km away; late deliveries would stop production; loses bulk discounts.", 2],
            ["Large tender orders would need reliable supplies; weekly deliveries cost more transport.", 2],
            ["Justified recommendation, e.g. partial JIT with a small buffer stock / agreement with the sawmill.", 2],
          ],
          levels: LV12,
          modelAnswer: `JIT would reduce the cash tied up in timber at a time when MF's liquidity is weak: inventory rose from ${money(Y1.inv)} to ${money(Y2.inv)} and the acid test ratio fell to ${round(R2.at, 2).toFixed(2)} : 1. Smaller weekly deliveries would also mean less timber cracking in the yard and less storage space. However, the sawmill is 165 km away, so a late delivery could stop production, which would be serious if MF wins the government tender. MF would also lose the discount it gets for large loads and pay more for transport. MF should move towards JIT gradually: agree weekly deliveries with the sawmill, but keep a small buffer stock of timber under cover, so that cash is freed without risking production.`,
        }),
      ]),
      group("(2)", "Question 2", [
        P.manual({
          label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
          stem: "Explain **two** economies of scale MF could gain if it grows larger.",
          points: [
            ["Identifies: purchasing economies.", 1],
            ["Explains: buying timber in bulk gives discounts, lowering cost per desk.", 1],
            ["Applies: timber bought from the sawmill; a larger contract increases quantities.", 2],
            ["Identifies: technical / financial economies.", 1],
            ["Explains: flow line lowers variable cost; larger firms borrow more cheaply.", 1],
            [`Applies: variable cost per desk falls from ${money(desk.bvc)} to ${money(desk.fvc)}; bank loan needed for the line.`, 2],
          ],
          levels: LV8,
          modelAnswer: `First, MF could gain purchasing economies. If it wins the tender it will need much more timber, so the sawmill may give larger discounts, lowering the cost of each desk. Second, it could gain technical economies: the flow production line in Appendix 3 lowers the variable cost of a desk from ${money(desk.bvc)} to ${money(desk.fvc)}, because specialised machines work faster and waste less timber. As MF becomes larger, banks may also see it as less risky and lend at a lower rate, which would help finance the line.`,
        }),
        P.manual({
          label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
          stem: "Should MF invest in the flow production line for school desks? Justify your answer. Use Appendix 3.",
          points: [
            [`Break-even: batch ${fmt(Math.ceil(bBe))} desks, flow ${fmt(fBe)} desks a month.`, 2],
            [`Profit at ${desk.sales} desks: batch ${money(bP)}, flow ${money(fP)} a month: little difference.`, 2],
            [`If the tender is won (${fmt(tender)} desks): flow profit ${money(fPT)}; batch maximum output ${fmt(desk.bmax)}.`, 2],
            [`Cost ${money(LINE)} by bank loan: interest at an assumed ${RATE}%; liquidity already weak; overdraft near its limit.`, 2],
            ["Margin of safety smaller under flow at current sales; tender not yet won; risk of diseconomies.", 2],
            ["Justified recommendation, e.g. invest only if the tender is won / phased.", 2],
          ],
          levels: LV12,
          modelAnswer: `At current sales of ${desk.sales} desks a month, batch production breaks even at about ${fmt(Math.ceil(bBe))} desks and earns ${money(bP)} a month, while the flow line breaks even at ${fmt(fBe)} desks and earns ${money(fP)}, so the gain is small and the margin of safety is lower (${desk.sales - fBe} desks compared with about ${desk.sales - Math.ceil(bBe)}). If MF wins the tender and sells ${fmt(tender)} desks, the flow line would earn ${money(fPT)} a month, and batch production could not make that many, since its maximum is ${fmt(desk.bmax)}. However, the line costs US\\$246,500, financed by a loan at an assumed ${RATE}% interest, when MF's liquidity is already weak and its overdraft is near its limit. MF should not invest now. It should bid for the tender and invest in the line only if it wins the contract, when the higher volume would justify the cost and repay the loan.`,
        }),
      ]),
      group("(3)", "Question 3", [
        P.manual({
          label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
          stem: "Explain **two** reasons why MF has cash-flow problems even though it is profitable.",
          points: [
            ["Identifies: customers pay on credit / slowly.", 1],
            ["Explains: sales counted in profit, but cash received weeks later.", 1],
            ["Applies: schools pay at end of term and are paying more slowly; Harare shops pay after 60 days.", 2],
            ["Identifies: too much inventory / buying non-current assets.", 1],
            ["Explains: cash spent on stock or a kiln before it earns revenue.", 1],
            [`Applies: inventory up to ${money(Y2.inv)}; kiln ${money(KILN)} in Month 2; closing balance (${fmt(-cf.closing[1])}).`, 2],
          ],
          levels: LV8,
          modelAnswer: `First, most customers buy on credit. Schools pay at the end of each term and are now paying more slowly, and the Harare shops pay after 60 days, so revenue is counted in profit long before the cash arrives. Second, MF has spent cash on inventory and equipment. Inventory rose to ${money(Y2.inv)} in Year 2, and the forecast includes a ${money(KILN)} kiln in Month 2, when receipts are low. As a result the forecast shows a closing balance of (${money(-cf.closing[1])}) at the end of Month 2.`,
        }),
        P.manual({
          label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
          stem: "Recommend the best way for MF to solve its cash-flow problem over the next three months. Justify your answer.",
          points: [
            [`Uses the forecast: shortage of ${money(-cf.closing[1])} at the end of Month 2, positive again in Month 3 (${money(cf.closing[2])}).`, 2],
            ["Increase overdraft: quick, short-term, but near its limit and interest is costly.", 2],
            ["Delay the kiln: removes the shortage; but timber continues to crack.", 2],
            ["Discount for schools paying within 30 days: cash sooner but lower revenue; schools may still pay late.", 2],
            ["Sell excess beds at reduced prices: reduces inventory, raises cash; lower margins.", 2],
            ["Justified recommendation (one or a combination) linked to the size and length of the problem.", 2],
          ],
          levels: LV12,
          modelAnswer: `The forecast shows a cash shortage of ${money(-cf.closing[1])} at the end of Month 2, caused mainly by the ${money(KILN)} kiln and low receipts, but the balance becomes positive again in Month 3 (${money(cf.closing[2])}). Increasing the overdraft would cover the gap quickly, but MF is already close to its limit and the bank is assessing a loan application. A discount for prompt payment might bring cash in sooner, but it reduces revenue and schools may still pay late. Selling excess beds at reduced prices would cut the high inventory, though at a lower margin. The simplest solution is to delay buying the kiln by one month, until Month 3, when cash inflows rise. This removes the shortage without interest; meanwhile MF should cover the timber to reduce cracking and sell some excess stock to strengthen liquidity before the bank decides on the loan.`,
        }),
      ]),
      group("(4)", "Question 4", [
        P.manual({
          label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
          stem: "Using Appendix 1, explain **two** changes in MF's financial performance between Year 1 and Year 2.",
          points: [
            ["Identifies: profitability fell.", 1],
            [`Calculates: gross profit margin ${round(R1.gpm, 1)}% to ${round(R2.gpm, 1)}% / profit margin ${round(R1.pm, 1)}% to ${round(R2.pm, 1)}% / ROCE ${round(R1.roce, 1)}% to ${round(R2.roce, 1)}%.`, 2],
            ["Explains a cause, e.g. timber costs rose / rejected items / extra workers not productive.", 1],
            ["Identifies: liquidity weakened.", 1],
            [`Calculates: current ratio ${round(R1.cr, 2).toFixed(2)} to ${round(R2.cr, 2).toFixed(2)} : 1; acid test ${round(R1.at, 2).toFixed(2)} to ${round(R2.at, 2).toFixed(2)} : 1.`, 2],
            ["Explains: inventory rose and current liabilities rose; may struggle to pay debts.", 1],
          ],
          levels: LV8,
          modelAnswer: `First, profitability fell. Although revenue rose by ${money(Y2.rev - Y1.rev)}, the gross profit margin fell from ${round(R1.gpm, 1)}% to ${round(R2.gpm, 1)}% and ROCE from ${round(R1.roce, 1)}% to ${round(R2.roce, 1)}%, probably because of more rejected items and extra workers who did not raise output in proportion. Second, liquidity weakened: the current ratio fell from ${round(R1.cr, 2).toFixed(2)} : 1 to ${round(R2.cr, 2).toFixed(2)} : 1 and the acid test from ${round(R1.at, 2).toFixed(2)} : 1 to ${round(R2.at, 2).toFixed(2)} : 1, because inventory rose to ${money(Y2.inv)} and current liabilities rose. Without selling its stock, MF could pay less than half of its short-term debts.`,
        }),
        P.manual({
          label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
          stem: `Should the bank lend MF ${money(LINE)} for the production line? Justify your answer.`,
          points: [
            [`ROCE ${round(R2.roce, 1)}% is below the assumed ${RATE}% interest rate: the investment may not cover its cost.`, 2],
            ["Profit is still positive; revenue growing; good reputation and buildings as security.", 2],
            [`Liquidity weak: acid test ${round(R2.at, 2).toFixed(2)} : 1; overdraft near its limit; cash shortage forecast.`, 2],
            ["Tender not yet won; the line only pays if volume rises; management stretched (diseconomies).", 2],
            ["Limitations of accounts: historical; forecast may be wrong; non-financial factors (skills, reputation).", 2],
            ["Justified decision, e.g. lend only if the tender is won, with security and conditions.", 2],
          ],
          levels: LV12,
          modelAnswer: `In favour of lending, MF is still profitable, its revenue grew by ${money(Y2.rev - Y1.rev)} in Year 2, it has a good reputation and it can offer its buildings as security. However, its ROCE fell to ${round(R2.roce, 1)}%, below the assumed ${RATE}% interest rate, so borrowing to invest may not pay for itself unless sales rise. Its liquidity is weak: the acid test is only ${round(R2.at, 2).toFixed(2)} : 1, the overdraft is near its limit and the forecast shows a cash shortage in Month 2. The line only makes sense if MF wins the government tender, which is not yet certain. The accounts are also historical and do not show the loss of skilled carpenters or Tendai's difficulty in managing a larger business. The bank should not lend now; it should offer the loan only if MF wins the tender, with the buildings as security and a condition that MF reduces its inventory and improves its credit control.`,
        }),
      ]),
    ],
    hints: ["Use the figures in the appendices in your answers.", "Every (b) part needs a justified decision."],
    explanation: `Ratios: GPM ${round(R1.gpm, 1)}% → ${round(R2.gpm, 1)}%; ROCE ${round(R1.roce, 1)}% → ${round(R2.roce, 1)}%; acid test ${round(R1.at, 2).toFixed(2)} → ${round(R2.at, 2).toFixed(2)} : 1. Labour productivity ${lp1} → ${lp2}. Desk break-even: batch ${round(bBe, 1)}, flow ${fBe}. Month 2 closing balance (${fmt(-cf.closing[1])}).`,
  });
});
