// W4b exam-format items, ZIMSEC Business Enterprise and Skills: Paper 2 essay (20), Paper 1 structured (17 and 16)
// and a Paper 2 Section A case study (40). Mark splits within the items are ours (the syllabus does not print them).
import { concept, P, BES, money, fmt, r2, round, sum, table, cashFlow, f } from "../lib.mjs";

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
  [3, 6, 8, "Four budgets explained accurately, each with what it shows and who uses it."],
  [2, 3, 5, "Budgets identified with some explanation."],
  [1, 1, 2, "Budgets listed with little or no explanation."],
];
const L12 = [
  [3, 9, 12, "Balanced discussion of importance and limitations, applied to a small enterprise, with a justified conclusion."],
  [2, 5, 8, "Some discussion, mostly one-sided or not applied; weak conclusion."],
  [1, 1, 4, "Simple points with little explanation and no judgement."],
];
const LV4 = [
  [2, 3, 4, "Two limitations explained in the context of the business."],
  [1, 1, 2, "Limitations stated with little explanation."],
];
const LV9 = [
  [3, 7, 9, "Both options analysed using the case data, with a justified recommendation."],
  [2, 4, 6, "Some analysis with limited use of data; recommendation weakly supported."],
  [1, 1, 3, "Simple points; no supported decision."],
];
const LV6 = [
  [3, 5, 6, "Two points explained and applied to the bakery using the data."],
  [2, 3, 4, "Points explained with limited application."],
  [1, 1, 2, "Points identified only."],
];

// ---- P1 17-mark: break-even for a peanut butter enterprise.
const pb = { fc: 1560, price: 3.5, vc: 2.3, sales: 1850 };
const pbTc = f.totalCost(pb.fc, pb.vc * pb.sales);
const pbBe = r2(f.breakEvenOutput(pb.fc, pb.price, pb.vc));
const pbMos = f.marginOfSafety(pb.sales, pbBe);

// ---- P1 16-mark: income statement for a hardware store.
const hw = { rev: 62000, open: 7400, purch: 41000, close: 8200, exp: [["Rent", 4800], ["Wages", 7800], ["Electricity", 1300], ["Transport", 1700]], ca: 15900, cl: 9400 };
const hwCos = f.costOfSales(hw.open, hw.purch, hw.close), hwGp = hw.rev - hwCos, hwTe = sum(hw.exp.map((e) => e[1])), hwNp = hwGp - hwTe;
const hwTbl = table(["Item (year ended 30 June)", "US\\$"], [["Sales", hw.rev], ["Opening stock", hw.open], ["Purchases", hw.purch], ["Closing stock", hw.close], ...hw.exp, ["Current assets at 30 June", hw.ca], ["Current liabilities at 30 June", hw.cl]]);

// ---- P2 40-mark case: a bakery co-operative.
const bk = { rev: 96350, open: 2630, purch: 47880, close: 3470, exp: 31560 };
const bkCos = f.costOfSales(bk.open, bk.purch, bk.close), bkGp = bk.rev - bkCos, bkNp = bkGp - bk.exp;
const loaf = { fc: 2233, price: 1.45, vc: 0.87, sales: 4960 };
const loafBe = r2(f.breakEvenOutput(loaf.fc, loaf.price, loaf.vc));
const schoolRec = [610, 290, 3940], vanDep = 2550;
const cf = cashFlow({
  months: ["October", "November", "December"],
  opening: 870,
  inflows: [["Cash sales", [7640, 7370, 9860]], ["Receipts from schools", schoolRec]],
  outflows: [["Flour and ingredients", [4330, 4180, 5140]], ["Wages", [2430, 2430, 2430]], ["Rent and electricity", [1090, 1090, 1090]], ["Delivery van deposit", [0, vanDep, 0]]],
  blanks: ["Closing balance:1", "Opening balance:2"],
});
const bkTbl = table(["Bakery figures for last year", "US\\$"], [["Sales", bk.rev], ["Stock of ingredients at start of year", bk.open], ["Purchases of ingredients", bk.purch], ["Stock of ingredients at end of year", bk.close], ["Expenses (wages, rent, electricity, transport)", bk.exp]]);
const loafTbl = table(["Standard loaf (per month)", "Figure"], [["Fixed costs", money(loaf.fc)], ["Selling price per loaf", money(loaf.price)], ["Variable cost per loaf", money(loaf.vc)], ["Expected sales", `${fmt(loaf.sales)} loaves`]]);

concept("bus.finance.budgets", { file: "exam/w4b-bes", keyPrefix: "exam.w4b-bes", applies: BES }, (b) => {
  // ---- Paper 2 Section B essay (20).
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.finance.budgets", "bus.finance.cash-flow-problems"],
    stem: "Every enterprise, however small, should plan its finances.",
    parts: [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Explain **four** types of budget that an enterprise may prepare.",
        points: [
          ["Sales budget: expected units sold and revenue each month (units × price); prepared first.", 2],
          ["Production budget: units to make = planned sales + closing inventory − opening inventory.", 2],
          ["Purchases budget: materials or goods to be bought and their cost, based on production.", 2],
          ["Cash budget: expected cash inflows, outflows and balances each month; shows shortages.", 2],
        ],
        levels: L8,
        modelAnswer: "The **sales budget** shows the number of units an enterprise expects to sell each month and the revenue (units × price); it is prepared first because everything else depends on sales. The **production budget** shows how many units must be made: planned sales plus the stock wanted at the end, less the stock held at the start. The **purchases budget** follows from production and shows the quantity and cost of raw materials or goods to be bought, so that buying is done at the right time. The **cash budget** brings these together and shows expected cash inflows, outflows and the balance each month, so the enterprise can see when it will be short of cash.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 550 },
        stem: "Discuss the importance and the limitations of budgeting for a small enterprise.",
        points: [
          ["Planning: thinks ahead; cash budget warns of shortages so an overdraft can be arranged early.", 2],
          ["Control: comparing actual with budget (variances) shows overspending; action taken.", 2],
          ["Targets and coordination; supports applications for loans from banks or support schemes.", 2],
          ["Limitations: forecasts may be wrong (prices, demand change), especially for new enterprises.", 2],
          ["Limitations: time and skill needed; inflexibility; unrealistic targets demotivate.", 2],
          ["Justified conclusion: benefits outweigh limits if budgets are simple and reviewed regularly.", 2],
        ],
        levels: L12,
        modelAnswer: "Budgeting helps a small enterprise **plan**. A cash budget may show that cash will be short in the month a machine is bought, so the owner can arrange an overdraft or delay the purchase before the problem happens. Budgets also help **control**: comparing actual spending with the budget shows where costs are higher than planned, so action can be taken, for example finding a cheaper supplier. They set **targets** for sales and coordinate buying with production, and banks and support schemes usually ask for budgets before lending. However, budgets are based on **forecasts**, and a new enterprise has no past figures to guide it; prices of inputs and demand can change quickly. Preparing budgets takes **time and skill** that a busy owner may lack, and if budgets are followed too rigidly the enterprise may miss opportunities. Targets that are too high can also discourage workers. On balance, budgeting is very important even for a small enterprise, provided budgets are kept simple and are reviewed each month against what actually happens.",
      }),
    ],
    hints: ["(a) Name each budget and say what it shows.", "(b) Give both sides and a conclusion."],
    explanation: "(a) Sales, production, purchases and cash budgets. (b) Planning, control, targets and finance against forecasting errors, time, inflexibility and demotivation.",
  });

  // ---- Paper 1 (17).
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1080, paper: "Paper 1", calculator: true,
    concepts: ["bus.operations.costs", "bus.operations.break-even-calculation", "bus.operations.break-even-chart"],
    stem: `Thandeka runs a small enterprise in Masvingo making peanut butter. She sells it in 375 g jars at ${money(pb.price)} each. The variable cost (groundnuts, oil, salt, jar and label) is ${money(pb.vc)} a jar. Her fixed costs, including rent of a small workshop and the wage of one helper, are ${money(pb.fc)} a month. She sells about ${fmt(pb.sales)} jars a month.`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State **two** examples of fixed costs, other than those given, that Thandeka's enterprise might have.", points: ["e.g. insurance / licence fees (1)", "e.g. loan interest / security / telephone line rental (1)"] }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", kind: "money", value: pbTc, stem: `Calculate Thandeka's total costs for a month in which she makes ${fmt(pb.sales)} jars.`, wrong: [r2(pb.vc * pb.sales)], explanation: `${fmt(pb.fc)} + ${pb.vc.toFixed(2)} × ${fmt(pb.sales)} = ${money(pbTc)}.` }),
      P.num({ label: "(c)", marks: 3, type: "CALCULATION", kind: "units", value: pbBe, stem: "Calculate the number of jars Thandeka must sell each month to break even.", wrong: [round(pb.fc / pb.price, 0)], explanation: `Contribution = ${pb.price.toFixed(2)} − ${pb.vc.toFixed(2)} = ${(pb.price - pb.vc).toFixed(2)}; ${fmt(pb.fc)} ÷ ${(pb.price - pb.vc).toFixed(2)} = ${fmt(pbBe)} jars.` }),
      P.num({ label: "(d)", marks: 2, type: "CALCULATION", kind: "units", value: pbMos, stem: "Calculate her margin of safety.", wrong: [pb.sales], explanation: `${fmt(pb.sales)} − ${fmt(pbBe)} = ${fmt(pbMos)} jars.` }),
      P.manual({ label: "(e)", marks: 4, stem: "Explain **two** limitations of break-even analysis for Thandeka's enterprise.", points: ["Limitation 1, e.g. assumes all jars are sold at the same price (1)", "Applied: she may give discounts to shops buying in bulk (1)", "Limitation 2, e.g. groundnut prices change, so variable cost is not constant / forecasts may be wrong (1)", "Applied: a poor harvest raises costs and the break-even point (1)"], levels: LV4 }),
      P.manual({ label: "(f)", marks: 4, stem: `A supermarket offers to buy 640 extra jars a month at ${money(3.1)} each. Recommend whether Thandeka should accept. Justify your answer.`, points: [`Each extra jar contributes ${money(r2(3.1 - pb.vc))}; extra profit ${money(r2(640 * (3.1 - pb.vc)))} a month as fixed costs are already covered (1)`, "Wider market / regular orders / brand known in a supermarket (1)", "Risks: capacity and helper's time; existing customers may want the lower price; late payment by supermarket (1)", "Justified recommendation (1)"] }),
    ],
    hints: ["(b) Total cost = fixed + variable cost × jars.", "(c) Divide fixed costs by contribution per jar."],
    explanation: `(b) ${money(pbTc)}. (c) ${fmt(pbBe)} jars. (d) ${fmt(pbMos)} jars. (f) Extra contribution ${money(r2(640 * (3.1 - pb.vc)))} a month.`,
    workedSolution: `1. Total cost = ${fmt(pb.fc)} + ${pb.vc.toFixed(2)} × ${fmt(pb.sales)} = ${fmt(pbTc)}.\n2. Contribution = ${pb.price.toFixed(2)} − ${pb.vc.toFixed(2)} = ${(pb.price - pb.vc).toFixed(2)}; break-even = ${fmt(pb.fc)} ÷ ${(pb.price - pb.vc).toFixed(2)} = ${fmt(pbBe)}.\n3. Margin of safety = ${fmt(pb.sales)} − ${fmt(pbBe)} = ${fmt(pbMos)}.`,
  });

  // ---- Paper 1 (16).
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1020, paper: "Paper 1", calculator: true,
    concepts: ["bus.finance.income-statement", "bus.finance.financial-position", "bus.finance.profit"],
    stem: `Farai owns a hardware store in Chinhoyi as a sole trader. The following figures relate to his business.\n\n${hwTbl}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "money", value: hwCos, stem: "Calculate the cost of sales.", wrong: [hw.purch, hw.open + hw.purch + hw.close], explanation: `${fmt(hw.open)} + ${fmt(hw.purch)} − ${fmt(hw.close)} = ${money(hwCos)}.` }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: hwGp, stem: "Calculate the gross profit.", wrong: [hw.rev - hw.purch], explanation: `${fmt(hw.rev)} − ${fmt(hwCos)} = ${money(hwGp)}.` }),
      P.num({ label: "(c)", marks: 2, type: "CALCULATION", kind: "money", value: hwNp, stem: "Calculate the net profit for the year.", wrong: [hw.rev - hwTe], explanation: `Expenses = ${fmt(hwTe)}; ${fmt(hwGp)} − ${fmt(hwTe)} = ${money(hwNp)}.` }),
      P.num({ label: "(d)", marks: 2, type: "CALCULATION", kind: "money", value: hw.ca - hw.cl, stem: "Calculate the working capital at 30 June.", wrong: [hw.ca + hw.cl], explanation: `${fmt(hw.ca)} − ${fmt(hw.cl)} = ${money(hw.ca - hw.cl)}.` }),
      P.manual({ label: "(e)", marks: 4, stem: "Explain **two** reasons why profit is important to Farai.", points: ["Reason 1, e.g. reward for risk / his income (1)", "Explained in context: his own savings are invested in the store (1)", "Reason 2, e.g. retained profit to expand stock or premises / evidence for a bank loan (1)", "Explained: no interest on retained profit / bank more willing to lend (1)"] }),
      P.manual({ label: "(f)", marks: 5, stem: "Farai wants to increase his net profit next year. Recommend **one** action he should take. Justify your answer.", points: ["Identifies an action, e.g. cut wages or transport / buy in bulk from a cheaper supplier / raise prices (1)", `Uses the data, e.g. wages ${money(hw.exp[1][1])} are the largest expense (1)`, "Explains the effect on gross profit or expenses (1)", "Considers a drawback, e.g. service suffers / customers switch (1)", "Justified recommendation (1)"] }),
    ],
    hints: ["(a) Opening stock + purchases − closing stock.", "(d) Current assets − current liabilities."],
    explanation: `(a) ${money(hwCos)}. (b) ${money(hwGp)}. (c) ${money(hwNp)}. (d) ${money(hw.ca - hw.cl)}.`,
    workedSolution: `1. Cost of sales = ${fmt(hw.open)} + ${fmt(hw.purch)} − ${fmt(hw.close)} = ${fmt(hwCos)}.\n2. Gross profit = ${fmt(hw.rev)} − ${fmt(hwCos)} = ${fmt(hwGp)}.\n3. Expenses = ${hw.exp.map((e) => fmt(e[1])).join(" + ")} = ${fmt(hwTe)}; net profit = ${fmt(hwNp)}.\n4. Working capital = ${fmt(hw.ca)} − ${fmt(hw.cl)} = ${fmt(hw.ca - hw.cl)}.`,
  });

  // ---- Paper 2 Section A case study (40).
  const gB = group("(b)", "Use the bakery figures for last year.", [
    P.num({ label: "(i)", marks: 2, type: "CALCULATION", kind: "money", value: bkCos, stem: "Calculate the cost of sales (cost of ingredients used).", wrong: [bk.purch], explanation: `${fmt(bk.open)} + ${fmt(bk.purch)} − ${fmt(bk.close)} = ${money(bkCos)}.` }),
    P.num({ label: "(ii)", marks: 1, kind: "money", value: bkGp, stem: "Calculate the gross profit.", wrong: [bk.rev - bk.purch], explanation: `${fmt(bk.rev)} − ${fmt(bkCos)} = ${money(bkGp)}.` }),
    P.num({ label: "(iii)", marks: 2, type: "CALCULATION", kind: "money", value: bkNp, stem: "Calculate the net profit.", wrong: [bk.rev - bk.exp], explanation: `${fmt(bkGp)} − ${fmt(bk.exp)} = ${money(bkNp)}.` }),
  ]);
  const gF = group("(f)", "Inventory at the bakery.", [
    P.mcq({ label: "(i)", marks: 1, stem: "Bread dough that has been mixed but not yet baked is an example of:", options: [["work in progress", "Correct: partly finished goods."], ["raw materials", "Raw materials are unused flour, yeast and sugar."], ["finished goods", "Finished goods are baked loaves ready for sale."], ["non-current assets", "Inventory is a current asset."]], answer: "A" }),
    P.manual({ label: "(ii)", marks: 3, stem: "Explain why the bakery should keep only small stocks of finished bread.", points: ["Bread is perishable / goes stale within days (1)", "Unsold bread is wasted, raising costs (1)", "Cash is tied up; bake to daily orders instead (1)"] }),
  ]);
  const caseText = [
    "**Kumusha Bakery Co-operative** (a fictional enterprise)",
    "",
    "Kumusha Bakery is a co-operative of nine women in Masvingo. It was formed five years ago with help from a church group, which lent the members two second-hand ovens. The members bake standard white loaves, brown loaves, buns and scones. Most of the bread is sold for cash from the bakery's own counter and to small tuck shops in the high-density suburbs. Three boarding schools also buy bread on credit and pay at the end of each school term.",
    "",
    "The chairperson, Rudo Moyo, keeps the accounts in an exercise book, and a teacher who volunteers on Saturdays has helped the members to prepare simple financial statements and a cash budget for the first time. Rudo was pleased to find that the bakery made a profit last year. However, there are often weeks when there is not enough cash to pay the flour supplier, and the members have sometimes waited for their wages.",
    "",
    "Flour, sugar, yeast and cooking oil are bought from a wholesaler in the town centre every week. The wholesaler gives a discount on orders of 20 bags of flour or more, and Rudo would like to buy in bulk. But the storeroom is small and damp, and last rainy season several bags of flour went mouldy and had to be thrown away. Rudo has also noticed that on some days unsold bread is left at the end of the day, while on others the counter runs out before midday.",
    "",
    "The members want to grow. One school has offered a contract to supply 1,170 loaves a week, and two supermarkets have asked about stocking Kumusha bread. To deliver, the co-operative wants to buy a used delivery van. The dealer wants a deposit in November and monthly payments after that under a hire purchase agreement. The members have also discussed buying a new electric oven, which would bake faster and use less electricity, but they cannot afford both the van and the oven this year.",
    "",
    "Production starts at four o'clock each morning. Two members mix the dough by hand while the others shape the loaves, bake and pack. Because the ovens are old, one of them breaks down about once a month, and on those days the bakery cannot meet all its orders. The members are proud of the quality of their bread: they use more yeast and less water than some competitors, and customers say Kumusha bread stays fresh for longer. Each member is paid a fixed weekly wage, and any profit left at the end of the year is shared or kept in the business, as the members decide at their annual meeting. Last year they agreed to keep most of the profit to save for the van.",
    "",
    "The supermarkets would pay 60 days after delivery and want the bread wrapped and labelled with the date it was baked. This would add to the cost of each loaf. The school contract would be paid monthly, but the school wants a fixed price for the whole year, even if the price of flour rises.",
    "",
    "The volunteer teacher has warned the members that their cash budget shows a problem in November, when the van deposit is due and the schools are not paying. She has suggested several ways to deal with it: asking the schools to pay monthly instead of at the end of term, asking the bank for an overdraft, delaying the van until the new year, or asking the wholesaler for 30 days' credit. Some members are worried that asking the schools to pay sooner could lose the bakery its best customers.",
    "",
    "Rudo has also worked out the costs of the standard loaf, which is the bakery's best seller. She is unsure whether the price of the standard loaf is right, as a large bakery in town sells a similar loaf for a few cents less. Several members think the co-operative should not grow too fast, because the bakery depends on the skills of its members and on the goodwill of its customers. Others believe that unless it grows, the bakery will lose customers to the large bakeries.",
    "",
    `**Table 1: Bakery figures for last year**\n\n${bkTbl}`,
    "",
    `**Table 2: Standard loaf**\n\n${loafTbl}`,
    "",
    `**Table 3: Cash budget (US\\$)**\n\n${cf.md}`,
  ].join("\n");
  addSubResponses(b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 3000, paper: "Paper 2", calculator: true,
    concepts: ["bus.finance.budgets", "bus.finance.income-statement", "bus.finance.profit", "bus.finance.cash-flow-problems", "bus.finance.cash-flow-forecast", "bus.operations.purchasing-inventory", "bus.operations.costs", "bus.operations.break-even-calculation"],
    stem: caseText,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Define the term **budget**.", points: ["A financial plan (1)", "For a future period, of expected income / spending / output (1)"] }),
      gB,
      P.num({ label: "(c)", marks: 3, type: "CALCULATION", kind: "units", value: loafBe, stem: "Using Table 2, calculate the number of standard loaves the bakery must sell each month to break even.", wrong: [round(loaf.fc / loaf.price, 0)], explanation: `Contribution = ${loaf.price.toFixed(2)} − ${loaf.vc.toFixed(2)} = ${(loaf.price - loaf.vc).toFixed(2)}; ${fmt(loaf.fc)} ÷ ${(loaf.price - loaf.vc).toFixed(2)} = ${fmt(loafBe)} loaves.` }),
      P.num({ label: "(d)", marks: 2, type: "CALCULATION", kind: "units", value: f.marginOfSafety(loaf.sales, loafBe), stem: "Calculate the margin of safety for the standard loaf.", wrong: [loaf.sales], explanation: `${fmt(loaf.sales)} − ${fmt(loafBe)} = ${fmt(f.marginOfSafety(loaf.sales, loafBe))} loaves.` }),
      P.num({ label: "(e)", marks: 3, type: "CALCULATION", kind: "money", value: -cf.closing[1], stem: "Using Table 3, calculate the size of the overdraft the bakery would need at the end of November (enter a positive number).", wrong: [-cf.net[1], r2(-cf.net[1] + cf.opening[1])], explanation: `November net cash flow = ${fmt(cf.totalIn[1])} − ${fmt(cf.totalOut[1])} = (${fmt(-cf.net[1])}); closing = ${fmt(cf.opening[1])} − ${fmt(-cf.net[1])} = (${fmt(-cf.closing[1])}).` }),
      gF,
      P.manual({ label: "(g)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Explain **two** reasons why Kumusha Bakery is short of cash even though it made a profit.", points: ["Reason 1: schools buy on credit and pay at the end of term (1)", "Explained: revenue counted but cash arrives late (1)", `Applied: receipts from schools only ${money(schoolRec[1])} in November (1)`, "Reason 2: van deposit / buying non-current assets / flour wasted (1)", "Explained: large cash outflow not matched by inflow that month (1)", `Applied: deposit of ${money(vanDep)} in November (1)`], levels: LV6, modelAnswer: `First, the three boarding schools buy on credit and pay only at the end of term. Their purchases are counted as sales and profit, but in November the bakery receives only ${money(schoolRec[1])} from them. Second, the co-operative must pay a deposit of ${money(vanDep)} on the van in November. This large outflow comes in the same month as the low receipts, so the cash budget shows an overdraft of ${money(-cf.closing[1])} at the end of November, even though the bakery made a net profit of ${money(bkNp)} last year.` }),
      P.manual({ label: "(h)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Explain **two** ways the bakery could improve its purchasing and inventory control.", points: ["Way 1, e.g. dry, secure storage before bulk buying (1)", "Explained: gains the 20-bag discount without mouldy flour (1)", "Applied to the case (1)", "Way 2, e.g. keep records of daily sales and bake to forecasts / orders (1)", "Explained: less unsold bread and fewer stock-outs before midday (1)", "Applied to the case (1)"], levels: LV6, modelAnswer: "First, the bakery should make its storeroom dry and secure before buying flour in bulk. It could then take the wholesaler's discount on 20 bags or more without losing flour to mould, as happened last rainy season. Second, Rudo should record how many loaves of each kind are sold each day and bake to these figures and to firm orders from schools and shops. This would reduce the bread left unsold at the end of some days and stop the counter running out before midday on others." }),
      P.manual({
        label: "(i)", marks: 9, type: "EXTENDED_RESPONSE",
        stem: "The bakery could solve its November cash problem by asking the schools to pay monthly or by arranging a bank overdraft. Evaluate these two options and recommend which the co-operative should choose.",
        points: [
          "Schools pay monthly: cash arrives sooner; no interest (1)",
          "But schools may refuse or move to another supplier; they are the best customers (1)",
          "Overdraft: quick, covers a short gap; repaid in December when schools pay (1)",
          `Uses data: December closing balance ${money(cf.closing[2])} shows it can be repaid (1)`,
          "Overdraft drawbacks: interest, bank may want security or records; co-operative's records are basic (1)",
          "Other options: delay the van / supplier credit (1)",
          "Considers growth plans: van needed for the school contract (1)",
          ["Justified recommendation (2)", 2],
        ],
        levels: LV9,
        modelAnswer: `The schools pay at the end of term, so in November the bakery receives only a little from them while it must pay the van deposit, leaving an overdraft of ${money(-cf.closing[1])} at the end of the month. Asking the schools to pay monthly would bring cash in sooner without any interest cost, but the schools are the bakery's best customers and may refuse or buy from a larger bakery that gives credit. An overdraft is quick and suits a short gap: the cash budget shows a December closing balance of ${money(cf.closing[2])}, so it could be repaid within a month. However, interest must be paid, and the bank may ask for better records or security. I recommend a short overdraft for November and December, because it protects the relationship with the schools, which the new 1,170-loaf contract depends on, and the forecast shows it can be repaid quickly. In future the bakery should agree monthly payment terms with any new school contract.`,
      }),
    ],
    hints: ["(b)(i) Opening stock + purchases − closing stock.", "(c) Fixed costs ÷ contribution per loaf.", "(e) Closing balance = opening balance + net cash flow."],
    explanation: `(b) Cost of sales ${money(bkCos)}; gross profit ${money(bkGp)}; net profit ${money(bkNp)}. (c) ${fmt(loafBe)} loaves. (d) ${fmt(f.marginOfSafety(loaf.sales, loafBe))}. (e) ${money(-cf.closing[1])}. (f) Work in progress; bread is perishable. (g)-(i) Credit to schools and the van deposit cause the shortage; an overdraft or faster payment solves it.`,
    workedSolution: `1. Cost of sales = ${fmt(bk.open)} + ${fmt(bk.purch)} − ${fmt(bk.close)} = ${fmt(bkCos)}; gross profit = ${fmt(bkGp)}; net profit = ${fmt(bkGp)} − ${fmt(bk.exp)} = ${fmt(bkNp)}.\n2. Contribution = ${(loaf.price - loaf.vc).toFixed(2)}; break-even = ${fmt(loaf.fc)} ÷ ${(loaf.price - loaf.vc).toFixed(2)} = ${fmt(loafBe)}; margin of safety = ${fmt(loaf.sales)} − ${fmt(loafBe)} = ${fmt(f.marginOfSafety(loaf.sales, loafBe))}.\n3. November: inflows ${fmt(cf.totalIn[1])}, outflows ${fmt(cf.totalOut[1])}, net (${fmt(-cf.net[1])}); closing = ${fmt(cf.opening[1])} − ${fmt(-cf.net[1])} = (${fmt(-cf.closing[1])}).`,
  }), [gB, gF]);
});
