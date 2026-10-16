// W4b: finance.budgets-variances
import { concept, P, table, r2, chk, fmt, variances, ZBE } from "../lib.mjs";
import { mc } from "../tables/w4b-lib.mjs";

const fa = (v) => (v.fa === "nil" ? "nil" : `${fmt(v.amount)} ${v.fa}`);

concept("abus.finance.budgets-variances", { file: "finance/budgets-variances", keyPrefix: "finance.budgets-variances" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is a **favourable variance**?",
    ok: ["A difference between budget and actual that increases profit", "Correct: revenue above budget or a cost below budget."],
    bad: [["A difference between budget and actual that reduces profit", "That is an adverse variance."], ["Any difference between the actual figure and last year's figure", "Variances compare actual figures with the budget."], ["A budget that has been approved by the directors", "Approval of the budget is not a variance."]],
    explanation: "A favourable variance increases profit: revenue above budget or costs below budget.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is **zero-based budgeting**?",
    ok: ["Every item of spending must be justified from zero", "Correct: no spending is accepted just because it was made last year."],
    bad: [["Each budget is last year's figures with a percentage added", "That is incremental budgeting."], ["The budget is adjusted to the level of output actually achieved", "That is flexible budgeting."], ["No budget is set and the business spends as needed", "Zero-based budgeting still sets a budget."]],
    explanation: "In zero-based budgeting every item has to be justified afresh, removing past waste.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main weakness of **incremental budgeting**?",
    ok: ["It carries forward the waste of earlier years", "Correct: past spending is accepted without question."],
    bad: [["It takes much longer than other methods to prepare each year", "Incremental budgets are quick to prepare."], ["It ignores the actual output of the business", "That describes a fixed budget, not the incremental method."], ["It requires managers to justify every cost", "That is zero-based budgeting."]],
    explanation: "Because the new budget starts from last year's figures, existing inefficiencies are repeated.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional factory budgeted US\\$20,000 for materials and actually spent US\\$21,400. How should the variance be described?",
    ok: ["An adverse variance of US\\$1,400", "Correct: the cost was above budget, so profit is reduced."],
    bad: [["A favourable variance of US\\$1,400", "A cost above budget reduces profit, so it is adverse."], ["An adverse variance of US\\$20,000", "The variance is the difference, not the budgeted amount."], ["A favourable variance of US\\$21,400", "The variance is the difference and cannot be favourable here."]],
    hints: ["Is the cost above or below the budget?"],
    explanation: "A cost above budget is adverse: 20,000 − 21,400 = −1,400, an adverse variance of US\\$1,400.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why do managers use a **flexible** budget when actual output differs from the plan?",
    ok: ["To compare results at exactly the same level of output", "Correct: it removes the effect of changed volume."],
    bad: [["To make the original budget impossible to compare", "A flexed budget makes comparison fairer, not impossible."], ["To remove the need to record actual costs", "Actual costs are still needed for comparison."], ["To keep fixed costs always in line with sales", "Fixed costs stay as budgeted when the budget is flexed."]],
    hints: ["Think about what is being compared."],
    explanation: "A flexed budget restates variable costs and revenue at the actual output, so variances show efficiency and price differences rather than volume.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional workshop has a favourable direct labour variance. Which explanation needs to be checked before praising the manager?",
    ok: ["Cheaper, less skilled workers were used and quality fell", "Correct: lower wage costs may have caused poorer output."],
    bad: [["The budget was prepared before the month began", "All budgets are prepared before the period."], ["Actual output was exactly the same as the budgeted output", "Equal output would make the variance a fair measure."], ["Wages are always a fixed cost of a small business", "Direct labour is normally treated as variable."]],
    hints: ["Why might labour cost less than planned?"],
    explanation: "A favourable variance is not always good news: cheaper workers may produce poorer quality, more waste or customer complaints.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Actual revenue above the budgeted revenue is an adverse variance.",
    answer: false,
    explanation: "False. Revenue above budget increases profit, so it is a favourable variance.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "In a flexed budget, fixed costs are changed in proportion to the actual output.",
    answer: false,
    hints: ["Fixed costs do not change with output in the short run."],
    explanation: "False. Only variable costs and revenue are flexed; fixed costs remain at the budgeted level.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of budget to its description.",
    pairs: [["Incremental budget", "Last period's figures adjusted for expected changes"], ["Flexible budget", "Adjusted to the actual level of output"], ["Zero-based budget", "Each item justified from zero"], ["Variance", "The difference between budgeted and actual figures"]],
    explanation: "Each term has its own meaning.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING", applies: ZBE,
    stem: "Match each type of operating budget to what it shows.",
    pairs: [["Sales budget", "Expected sales in units and money"], ["Purchases budget", "Goods and materials to be bought"], ["Cash budget", "Expected cash receipts and payments"], ["Master budget", "Summary of all the operating budgets"]],
    explanation: "The master budget summarises the sales, purchases and cash budgets.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "A cost that is {{blank:a}} the budget is an adverse variance, because it {{blank:b}} profit.",
    blanks: [
      { id: "a", accepted: ["above"], choices: ["above", "below", "equal to"] },
      { id: "b", accepted: ["reduces"], choices: ["reduces", "increases", "does not change"] },
    ],
    explanation: "A cost above budget reduces profit and is an adverse variance.",
  });

  // ---- numerical items
  const v1 = variances.revenue(62000, 58400);
  chk(v1.amount, 3600);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: v1.amount, calculator: true, wrong: [62000 + 58400, 4600],
    stem: "A fictional shop budgeted sales revenue of US\\$62,000 for the month and actually earned US\\$58,400. Calculate the size of the variance (the question does not ask for the direction).",
    hints: ["Find the difference between budget and actual."],
    explanation: "62,000 − 58,400 = US\\$3,600. Revenue is below budget, so the variance is adverse.",
  });
  const v2 = variances.cost(21500, 19800);
  chk(v2.amount, 1700);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: v2.amount, calculator: true, daily: true, wrong: [21500 + 19800, 1800],
    stem: "A fictional bakery budgeted US\\$21,500 for ingredients in a month and actually spent US\\$19,800, which is a favourable variance. Calculate the size of the variance.",
    hints: ["The difference between the budgeted and actual cost."],
    explanation: "21,500 − 19,800 = US\\$1,700 favourable, because a cost below budget increases profit.",
  });
  const bp = 80000 - 61500, ap = 76200 - 60400, pv = variances.revenue(bp, ap);
  chk(bp, 18500); chk(ap, 15800); chk(pv.amount, 2700);
  b.calc({
    d: 3, skill: "ANALYSIS", kind: "money", value: pv.amount, calculator: true, wrong: [3800 + 1100, 3800],
    stem: "A fictional firm budgeted revenue of US\\$80,000 and total costs of US\\$61,500. Actual revenue was US\\$76,200 and actual total costs were US\\$60,400. Calculate the size of the profit variance. (The question does not ask for the direction.)",
    hints: ["Find the budgeted and actual profit first."],
    explanation: "Budgeted profit = 80,000 − 61,500 = 18,500. Actual profit = 76,200 − 60,400 = 15,800. Profit variance = US\\$2,700, adverse. The revenue variance (3,800 A) and the cost variance (1,100 F) combine to give 2,700 A.",
    workedSolution: "1. Budgeted profit = 80,000 − 61,500 = 18,500.\n2. Actual profit = 76,200 − 60,400 = 15,800.\n3. Variance = 18,500 − 15,800 = 2,700 adverse.",
  });
  const fr = 14 * 3400;
  chk(fr, 47600);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: fr, calculator: true, wrong: [14 * 3000, 14 * 400],
    stem: "A fictional company budgeted to sell 3,000 units at US\\$14 each. Actual sales were 3,400 units. Calculate the sales revenue in the flexed budget.",
    hints: ["The flexed budget uses the actual number of units."],
    explanation: "Flexed revenue = 3,400 × 14 = US\\$47,600. The original budget was US\\$42,000.",
  });
  const flexMat = 3 * 2700, mv = variances.cost(flexMat, 8370);
  chk(flexMat, 8100); chk(mv.amount, 270);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: mv.amount, calculator: true, wrong: [8370 - 7500, 7500 - 8370 + 1000],
    stem: "A fictional furniture maker budgeted materials of US\\$7,500 for 2,500 units. It produced 2,700 units and actually spent US\\$8,370 on materials. Calculate the size of the materials variance against the flexed budget. (Direction is not asked for.)",
    hints: ["Materials are a variable cost: budget per unit × actual units."],
    explanation: "Budgeted cost per unit = 7,500 ÷ 2,500 = 3.00. Flexed budget = 3.00 × 2,700 = 8,100. Variance = 8,370 − 8,100 = US\\$270 adverse. Against the original budget the variance would be US\\$870, which would overstate the overspend.",
    workedSolution: "1. Materials per unit = 7,500 ÷ 2,500 = 3.00.\n2. Flexed budget = 3.00 × 2,700 = 8,100.\n3. Variance = 8,370 − 8,100 = 270 adverse.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State one benefit of using budgets in a business.",
    accepted: ["control spending", "sets targets", "helps planning", "motivates staff", "allocates resources", "monitors performance", "coordinates departments", "finds problems early"],
    keywords: { any: ["control", "target", "plan", "motivat", "allocat", "monitor", "coordinat", "problems"], minAny: 1 },
    explanation: "Accept planning, targets, control, allocation of resources, coordination, motivation or monitoring.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain one drawback of budgeting for a small business.",
    points: ["Budgets rely on forecasts of sales and costs, which may be inaccurate", "If the forecasts are wrong, targets may be unrealistic and variances meaningless", "Preparing and monitoring budgets takes time and cost, which a small business may lack"],
    modelAnswer: "Budgets rely on forecasts of sales and costs, which may be inaccurate, so targets may be unrealistic and the variances meaningless. Preparing and monitoring budgets also takes time and cost, which a small business may lack.",
    hints: ["Think about forecasts and time."],
    explanation: "Forecast errors and time cost.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A fictional manager is given a budget that is much lower than last year's spending. Analyse how this might affect the manager's motivation.",
    points: ["A target seen as unrealistic may be ignored", "The manager may feel the budget was imposed without consultation", "Staff may cut quality or avoid necessary spending to hit the target", "Participation in setting the budget would make the target more acceptable"],
    modelAnswer: "A target seen as unrealistic may be ignored, and the manager may feel it was imposed without consultation. Staff may cut quality or avoid necessary spending to hit the target. If the manager took part in setting the budget, the target would be more acceptable.",
    hints: ["Think about how the manager sees the target."],
    explanation: "Unrealistic imposed budgets demotivate.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Evaluate whether zero-based budgeting is better than incremental budgeting for a business with rising costs.",
    points: ["Zero-based budgeting forces managers to justify each item, which removes waste", "It links spending to current needs and priorities", "It is time-consuming and may cause conflict between departments", "Incremental budgeting is quick and easy but repeats past inefficiency", "When costs are rising, incremental budgets may simply add inflation to waste", "Judgement and reason, for example use zero-based occasionally for large costs and incremental for stable items"],
    modelAnswer: "Zero-based budgeting forces managers to justify each item, which removes waste and links spending to current needs, but it is time-consuming and may cause conflict between departments. Incremental budgeting is quick and easy but repeats past inefficiency, and when costs are rising it may simply add inflation to waste. A business with rising costs might use zero-based budgeting for large or growing costs and incremental budgeting for stable items.",
    hints: ["Weigh the benefit of removing waste against the time and conflict."],
    explanation: "Both methods weighed, with a conditional judgement.",
  });

  // ---- practice structured items
  const J = { rev: [30000, 32400], mat: [9200, 10550], wag: [7800, 7400] };
  const jr = variances.revenue(...J.rev), jm = variances.cost(...J.mat), jw = variances.cost(...J.wag);
  chk(jr.value, 2400); chk(jm.value, -1350); chk(jw.value, 400);
  const t1 = table(["US\\$", "Budget", "Actual"], [["Sales revenue", ...J.rev], ["Materials", ...J.mat], ["Wages", ...J.wag]]);
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `Mhofu Joinery is a fictional business in Gweru. The owner compares last month's budget with the actual figures.\n\n${t1}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: jr.amount, wrong: [30000, 2400 + 1350], stem: "Calculate the size of the sales revenue variance. (Direction is not asked for.)", explanation: "32,400 − 30,000 = US\\$2,400, favourable because revenue is above budget." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: jm.amount, wrong: [9200, 1350 + 400], stem: "Calculate the size of the materials variance. (Direction is not asked for.)", explanation: "10,550 − 9,200 = US\\$1,350, adverse because the cost is above budget." }),
      P.manual({ label: "(c)", marks: 5, stem: "Analyse possible reasons for the materials variance and recommend one action.", points: ["Materials cost about 15% more than budgeted (US\\$1,350 over)", "A rise in the price of timber would increase the cost per unit", "If sales were above budget, more materials were needed; this part of the variance would be expected", "Waste, theft or poor storage could also cause the overspend", "Action: compare the cost per unit with the budget, check supplier prices and stock records, and flex the budget to the actual output"], modelAnswer: "Materials cost about 15% more than budgeted, US\\$1,350 over. A rise in the price of timber would increase the cost per unit, and since sales were above budget more materials were needed, so part of the variance would be expected. Waste, theft or poor storage could also cause it. The owner should flex the budget to the actual output, compare the cost per unit with the budget, and check supplier prices and stock records.", explanation: "Price, volume and waste are possible causes." }),
    ],
    hints: ["For a cost, budget minus actual: a negative result is adverse."],
    explanation: "Revenue variance US\\$2,400 F; materials variance US\\$1,350 A; part of the materials overspend may be due to higher output.",
  });
  const Q = { u0: 2000, u1: 2400, price: 20, mat: 4, lab: 6, fix: 10000, aRev: 47400, aMat: 10560, aLab: 14000, aFix: 10900 };
  const fx = { rev: Q.u1 * Q.price, mat: Q.u1 * Q.mat, lab: Q.u1 * Q.lab, fix: Q.fix };
  const fprof = fx.rev - fx.mat - fx.lab - fx.fix, aprof = Q.aRev - Q.aMat - Q.aLab - Q.aFix, bprof = Q.u0 * Q.price - Q.u0 * Q.mat - Q.u0 * Q.lab - Q.fix;
  chk(fprof, 14000); chk(aprof, 11940); chk(bprof, 10000);
  const wm = variances.cost(fx.mat, Q.aMat), wl = variances.cost(fx.lab, Q.aLab), wr = variances.revenue(fx.rev, Q.aRev), wf = variances.cost(fx.fix, Q.aFix);
  chk(wm.value, -960); chk(wl.value, 400); chk(wr.value, -600); chk(wf.value, -900); chk(wr.value + wm.value + wl.value + wf.value, aprof - fprof);
  const t2 = table(["US\\$", "Original budget (2,000 units)", "Actual (2,400 units)"], [["Sales revenue (budget price US\\$20)", Q.u0 * Q.price, Q.aRev], ["Materials (budget US\\$4 a unit)", Q.u0 * Q.mat, Q.aMat], ["Direct labour (budget US\\$6 a unit)", Q.u0 * Q.lab, Q.aLab], ["Fixed overheads", Q.fix, Q.aFix], ["**Profit**", bprof, aprof]]);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Dube Crafts is a fictional business in Masvingo that sells carved stools. Its manager is told that the profit of US\\$11,940 is above the budgeted US\\$10,000 and that she should receive a bonus. The owner is not sure, because output was 20% higher than planned.\n\n${t2}`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: fprof, type: "CALCULATION", wrong: [bprof, aprof], stem: "Calculate the profit in the flexed budget for 2,400 units.", explanation: "Revenue = 2,400 × 20 = 48,000. Materials = 2,400 × 4 = 9,600. Labour = 2,400 × 6 = 14,400. Fixed overheads = 10,000. Profit = 48,000 − 9,600 − 14,400 − 10,000 = US\\$14,000.", workedSolution: "1. Revenue 48,000; materials 9,600; labour 14,400; fixed 10,000.\n2. Profit = 48,000 − 9,600 − 14,400 − 10,000 = 14,000." }),
      P.group({ label: "(b)", stem: "Calculate the size of the variance against the flexed budget for:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: wm.amount, wrong: [Q.aMat - Q.u0 * Q.mat, 400], stem: "materials (direction is not asked for);", explanation: "Flexed materials = 9,600. Actual = 10,560. Variance = US\\$960 adverse." }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: wl.amount, wrong: [Q.aLab - Q.u0 * Q.lab, 960], stem: "direct labour (direction is not asked for).", explanation: "Flexed labour = 14,400. Actual = 14,000. Variance = US\\$400 favourable." }),
      ] }),
      P.manual({ label: "(c)", marks: 3, stem: "Analyse why the comparison of actual profit with the original budget is misleading.", points: ["The original budget was for 2,000 units but 2,400 were produced and sold", "So extra revenue is partly offset by extra variable costs, and the profit is higher because of volume", "A flexed budget shows that the profit should have been US\\$14,000, so the actual US\\$11,940 is US\\$2,060 adverse"], modelAnswer: "The original budget was for 2,000 units but 2,400 were produced and sold, so the higher profit is partly just the effect of volume. A flexed budget shows that the profit at 2,400 units should have been US\\$14,000, so the actual profit of US\\$11,940 is in fact US\\$2,060 adverse.", explanation: "Volume explains part of the profit rise; the flexed comparison is adverse." }),
      P.manual({ label: "(d)", marks: 4, stem: "Evaluate whether the manager should receive the bonus.", points: ["Against the original budget profit is US\\$1,940 favourable, which suggests a bonus", "Against the flexed budget profit is US\\$2,060 adverse, because materials (US\\$960 A), revenue (US\\$600 A) and fixed overheads (US\\$900 A) are all over budget", "Labour (US\\$400 F) is the only favourable item", "Judgement and reason, for example no bonus until the causes of the overspending are investigated"], modelAnswer: "Against the original budget profit is US\\$1,940 higher, which suggests a bonus. But against the flexed budget it is US\\$2,060 adverse: materials are US\\$960 over, revenue US\\$600 below and fixed overheads US\\$900 over, and only labour (US\\$400) is favourable. The manager should not receive the bonus until the reasons for the overspending and the low average price have been investigated.", hints: ["Use the flexed comparison."], explanation: "The flexed budget shows an adverse performance, so a bonus is not justified yet." }),
    ],
    hints: ["Flex revenue and variable costs to 2,400 units; keep fixed costs at 10,000."],
    explanation: "Flexed profit US\\$14,000; materials US\\$960 A; labour US\\$400 F; actual profit US\\$2,060 below the flexed budget.",
  });

  b.card("DEFINITION", "Budget", "A financial plan in money for a future period, setting targets for income and spending.");
  b.card("DEFINITION", "Variance", "The difference between a budgeted and an actual figure.");
  b.card("FORMULA", "Revenue or profit variance", "Actual − budget; positive = favourable (F).");
  b.card("FORMULA", "Cost variance", "Budget − actual; positive = favourable (F), negative = adverse (A).");
  b.card("CONCEPT", "Incremental budgeting", "Last period's budget adjusted for expected changes; quick but repeats waste.");
  b.card("CONCEPT", "Flexible budgeting", "Variable costs and revenue are restated at the actual output; fixed costs unchanged.");
  b.card("CONCEPT", "Zero-based budgeting", "Every item is justified from zero each period; removes waste but takes time.");
  b.card("FACT", "Sales, purchases, cash and master budgets", "Sales budget, purchases budget, cash budget and master budget (summary of the operating budgets).", undefined, { applies: ZBE });
  b.card("CONCEPT", "Using variances", "Investigate large or repeated variances, find the cause and take action; flex the budget first if output differed.");
});
