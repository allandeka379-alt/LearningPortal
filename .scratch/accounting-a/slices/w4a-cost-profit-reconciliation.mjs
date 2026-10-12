// W4a: cost.profit-reconciliation
import { concept, P, table, chk, r2, statement, costing } from "../lib.mjs";
import { mc, F, usd, p1 } from "../tables/w4a-lib.mjs";

concept("aacc.cost.profit-reconciliation", { file: "cost/profit-reconciliation", keyPrefix: "cost.profit-reconciliation" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Why do marginal costing and absorption costing give different profits?",
    ok: ["They value inventory differently", "Correct: only absorption costing includes fixed overhead in inventory."],
    bad: [["They use different selling prices for the same goods", "Selling prices are the same under both methods."], ["They use different variable costs of production", "Variable costs are the same under both methods."], ["They count different numbers of units sold", "The units sold are the same under both methods."]],
    explanation: "Only the valuation of inventory differs: absorption costing carries a share of fixed production overhead in inventory, marginal costing does not.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a year when closing inventory is higher than opening inventory, which profit is higher?",
    ok: ["Absorption costing profit", "Correct: fixed overhead is carried forward in the extra inventory."],
    bad: [["Marginal costing profit", "Marginal costing charges all the fixed overhead in the year."], ["Both are equal", "They are equal only when inventory is unchanged."], ["It depends on the selling price", "The comparison depends on the change in inventory units."]],
    explanation: "When inventory rises, absorption costing defers part of the fixed overhead in closing inventory, so its profit is higher.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a year when opening and closing inventory are equal, how do the two profits compare?",
    ok: ["They are equal", "Correct: the fixed overhead carried in equals the amount carried out."],
    bad: [["Absorption profit is higher", "That is when inventory rises."], ["Marginal profit is higher", "That is when inventory rises as well; here there is no change."], ["The difference equals the total fixed overhead", "The difference is based on the change in inventory units."]],
    explanation: "No change in inventory means no change in the fixed overhead carried forward, so the profits are equal.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Opening inventory is 400 units and closing inventory 900 units. Fixed production overhead absorbed is US\\$2.50 a unit. By how much does absorption profit exceed marginal profit?",
    ok: ["US\\$1,250", "Correct: (900 - 400) × 2.50."],
    bad: [["US\\$2,250", "This multiplies the closing inventory by the rate and ignores the opening inventory."], ["US\\$1,000", "This multiplies the opening inventory by the rate."], ["US\\$3,250", "This adds the opening and closing inventory before multiplying."]],
    hints: ["Use the change in units."],
    explanation: "Difference = (900 - 400) × 2.50 = US\\$1,250. Absorption profit is higher because inventory rose.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Opening inventory is 1,800 units and closing inventory 1,100 units. Fixed production overhead per unit is US\\$6. The absorption profit is US\\$28,600. What is the marginal profit?",
    ok: ["US\\$32,800", "Correct: 28,600 + 700 × 6."],
    bad: [["US\\$24,400", "This deducts the difference; marginal profit is the higher figure when inventory falls."], ["US\\$28,600", "The profits differ when inventory changes."], ["US\\$39,400", "This uses the opening inventory of 1,800 units instead of the fall of 700 units."]],
    hints: ["When inventory falls, absorption profit is the lower."],
    explanation: "Inventory fell by 700 units, so absorption profit is lower by 700 × 6 = US\\$4,200. Marginal profit = 28,600 + 4,200 = US\\$32,800.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which method must be used to value inventory in published financial statements prepared under IAS 2?",
    ok: ["Absorption costing", "Correct: IAS 2 requires inventory at full production cost."],
    bad: [["Marginal costing", "It excludes fixed production overhead, which IAS 2 requires."], ["Valuation at selling price", "Inventory is valued at cost or net realisable value if lower."], ["Either method, at the preference of the manager", "IAS 2 does not allow the exclusion of fixed production overhead."]],
    hints: ["Think of which cost includes fixed production overhead."],
    explanation: "IAS 2 requires inventory to be valued at cost, including a share of fixed production overhead, so absorption costing is used for external reporting.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A manager is paid a bonus based on absorption costing profit. Near the year end she increases production without any extra sales. What is the effect?",
    ok: ["Reported profit rises, but cash is tied up in unsold inventory", "Correct: more fixed overhead is carried forward, and no cash is received."],
    bad: [["Reported profit falls, because more variable cost is charged", "Variable cost of unsold units is carried in inventory."], ["Reported profit is unchanged, because sales are unchanged", "Absorption profit depends on production through inventory valuation."], ["Cash improves, because inventory is an asset", "Cash is spent on production and not recovered until the goods are sold."]],
    hints: ["Where does the fixed overhead of unsold units go?"],
    explanation: "Extra production carries more fixed overhead into closing inventory under absorption costing, raising profit without extra sales. Cash falls.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "If inventory falls during the year, absorption costing profit is lower than marginal costing profit.", answer: true, explanation: "True. Fixed overhead from the opening inventory is released into cost of sales." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "Over the whole life of a business, total profit under absorption costing is different from total profit under marginal costing.", answer: false, hints: ["What happens to deferred overhead in later years?"], explanation: "False. Overhead deferred in one year is charged in a later year, so the totals are equal over the whole life; only the timing differs." });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each situation to the comparison of profits.",
    pairs: ["Closing inventory greater than opening", "Closing inventory less than opening", "Closing inventory equal to opening", "Sales greater than production"],
    right: ["Absorption profit is higher", "Absorption profit is lower", "The profits are equal", "Inventory falls, so absorption profit is lower"],
    rightIndex: [0, 1, 2, 3],
    explanation: "The comparison depends on whether inventory rises, falls or stays the same. Sales above production means a falling inventory.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "The difference in profit = change in {{blank:a}} units × fixed production overhead per {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["inventory"], choices: ["inventory", "sales", "production"] }, { id: "b", accepted: ["unit"], choices: ["unit", "hour", "dollar"] }],
    explanation: "The profits differ by the fixed overhead carried in the change in inventory units.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Which costing method values inventory at variable production cost only?", accepted: ["marginal costing", "marginal"], explanation: "Marginal costing." });

  const fb = 63000, bu = 18000, rt = fb / bu;
  chk(rt, 3.5);
  const o1 = 600, c1 = 1350;
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: (c1 - o1) * rt, calculator: true, daily: true, wrong: [c1 * rt, (c1 + o1) * rt],
    stem: `A Marondera bakery budgets fixed production overhead of ${usd(fb)} for ${F(bu)} loaves, so fixed overhead is absorbed at ${usd(rt)} a loaf. Opening inventory was ${o1} loaves and closing inventory ${F(c1)} loaves. By how much does absorption costing profit exceed marginal costing profit?`,
    hints: ["Work out the rate first, then use the change in units."],
    explanation: `Rate = ${F(fb)} ÷ ${F(bu)} = ${usd(rt)}. Difference = (${F(c1)} - ${o1}) × ${rt} = ${usd((c1 - o1) * rt)}. Using the closing inventory alone gives ${usd(c1 * rt)}.`,
  });
  const mp = 24800, op = 900, cp = 1200;
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: mp + (cp - op) * rt, calculator: true, wrong: [mp - (cp - op) * rt, mp + cp * rt],
    stem: `Marginal costing profit for a year was ${usd(mp)}. Opening inventory was ${op} units and closing inventory ${F(cp)} units. Fixed overhead absorbed is ${usd(rt)} a unit. Calculate the absorption costing profit.`,
    hints: ["Inventory rose, so absorption profit is higher."],
    explanation: `Inventory rose by ${cp - op} units: ${cp - op} × ${rt} = ${F((cp - op) * rt)}. Absorption profit = ${F(mp)} + ${F((cp - op) * rt)} = ${usd(mp + (cp - op) * rt)}.`,
  });
  const ap = 31400, r5 = 5, o3 = 2000, c3 = 1200;
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: ap + (o3 - c3) * r5, calculator: true, wrong: [ap - (o3 - c3) * r5, ap + o3 * r5],
    stem: `Absorption costing profit was ${usd(ap)}. Opening inventory was ${F(o3)} units, closing inventory ${F(c3)} units and fixed overhead absorbed is ${usd(r5)} a unit. Calculate the marginal costing profit.`,
    hints: ["Inventory fell, so absorption profit is the lower figure."],
    explanation: `Inventory fell by ${o3 - c3} units: ${o3 - c3} × ${r5} = ${F((o3 - c3) * r5)}. Marginal profit = ${F(ap)} + ${F((o3 - c3) * r5)} = ${usd(ap + (o3 - c3) * r5)}.`,
  });
  const o4 = 650, p4 = 7800, s4 = 8100;
  b.num({
    d: 2, skill: "APPLICATION", kind: "units", value: o4 + p4 - s4, wrong: [p4 - s4, o4 + s4 - p4],
    stem: `Opening inventory was ${o4} units, production ${F(p4)} units and sales ${F(s4)} units. Calculate the closing inventory in units.`,
    explanation: `${o4} + ${F(p4)} - ${F(s4)} = ${o4 + p4 - s4} units.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why absorption profit is higher than marginal profit when inventory increases.",
    points: ["Under absorption costing some fixed production overhead is included in the closing inventory", "So less fixed overhead is charged to the year, whereas marginal costing charges all of it"],
    modelAnswer: "Absorption costing carries part of the fixed overhead forward in closing inventory, so less is charged this year than under marginal costing, and profit is higher.",
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "A business made equal profits under the two methods in year 1 and had higher inventory at the end of year 2 than at the start of year 2. Describe the effect in year 3 if inventory then falls back to its year 1 level.",
    points: ["In year 2 absorption profit exceeded marginal profit", "In year 3 absorption costing releases the deferred fixed overhead into cost of sales", "So in year 3 absorption profit is below marginal profit, and over the three years the totals are equal"],
    modelAnswer: "In year 2 absorption profit is higher because overhead is deferred. In year 3 the deferred overhead is charged, so absorption profit is lower than marginal profit. Over the three years the totals are equal.",
    hints: ["Think about timing."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Evaluate which costing method gives the more useful profit figure for judging the performance of a manager.",
    points: ["Marginal costing profit depends on sales and is not affected by changes in inventory", "Absorption profit can be raised by building inventory, which does not improve performance", "Absorption costing follows IAS 2 and is needed for external reports", "Judgement: use marginal costing or contribution for internal performance and decisions, absorption costing for published accounts"],
    modelAnswer: "Marginal profit cannot be raised by producing for stock, so it is a fairer measure of a manager's performance. Absorption profit is needed for external reporting under IAS 2. The business should use marginal figures internally and absorption figures externally.",
    hints: ["Think about incentives."],
    explanation: "One mark for each point.",
  });

  // Structured 1 (12)
  const S = { price: 20, vpc: 11, vs: 1, fixP: 60000, bud: 15000, adm: 18000, open: 1000, prod: 15000, sold: 14200 };
  const r = S.fixP / S.bud;
  const fullC = S.vpc + r;
  const cl = S.open + S.prod - S.sold;
  const sales = S.sold * S.price;
  const mProfit = sales - S.sold * S.vpc - S.sold * S.vs - S.fixP - S.adm;
  const aProfit = sales - S.sold * fullC - S.sold * S.vs - S.adm;
  chk(mProfit, 35600); chk(aProfit, 38800);
  const diff = costing.profitDifference(S.open, cl, r);
  chk(aProfit - mProfit, diff);
  const model = statement("Reconciliation of profits", [
    ["Profit under marginal costing", mProfit],
    [`Add: increase in inventory (${F(cl)} - ${F(S.open)} = ${F(cl - S.open)} units) × ${usd(r)}`, diff],
    ["**Profit under absorption costing**", aProfit],
  ], { cols: ["US\\$"], checks: [["rec", mProfit + diff, aProfit]] });
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Marondera Maize Meal sells bags at ${usd(S.price)}. Variable production cost is ${usd(S.vpc)} a bag and variable selling cost ${usd(S.vs)} a bag sold. Fixed production overhead of ${usd(S.fixP)} is absorbed on a budgeted output of ${F(S.bud)} bags. Administration expenses are ${usd(S.adm)}. Opening inventory was ${F(S.open)} bags, production ${F(S.prod)} bags (as budgeted) and sales ${F(S.sold)} bags.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: mProfit, wrong: [mProfit + S.fixP, sales - S.sold * S.vpc - S.fixP - S.adm], stem: "Calculate the profit under marginal costing.", explanation: `Contribution = ${F(sales)} - ${F(S.sold * S.vpc)} - ${F(S.sold * S.vs)} = ${F(sales - S.sold * S.vpc - S.sold * S.vs)}; less fixed costs ${F(S.fixP + S.adm)} = ${usd(mProfit)}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: aProfit, wrong: [mProfit, aProfit + S.adm], stem: "Calculate the profit under absorption costing.", explanation: `Full cost ${fullC} a bag; cost of sales ${F(S.sold)} × ${fullC} = ${F(S.sold * fullC)}; gross profit ${F(sales - S.sold * fullC)}; less selling ${F(S.sold * S.vs)} and administration ${F(S.adm)} = ${usd(aProfit)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: diff, wrong: [cl * r, S.fixP], stem: "Calculate the difference between the two profits using the change in inventory.", explanation: `Closing bags = ${F(S.open)} + ${F(S.prod)} - ${F(S.sold)} = ${F(cl)}. Difference = (${F(cl)} - ${F(S.open)}) × ${r} = ${usd(diff)}.` }),
      P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Reconcile the two profits and explain why absorption costing gives the higher profit.", points: [`Start from marginal profit ${F(mProfit)}`, `Add ${F(cl - S.open)} bags × ${usd(r)} = ${F(diff)}`, `Arrive at absorption profit ${F(aProfit)}`, "Explain that inventory rose, so fixed overhead is carried forward in closing inventory"], modelAnswer: model, explanation: "One mark for each step." }),
    ],
    hints: ["Full cost per bag = variable cost + fixed overhead rate.", "Closing bags = opening + production - sales."],
    explanation: "This item tests both profit statements and the reconciliation when inventory rises.",
  });

  // Structured 2 (14): falling inventory with under-absorption, different business
  const T = { price: 12, vpc: 5, vs: 0.5, fixP: 40500, bud: 9000, adm: 9000, open: 1650, prod: 7500, sold: 8400 };
  const tr = T.fixP / T.bud;
  const tFull = T.vpc + tr;
  const tcl = T.open + T.prod - T.sold;
  const tSales = T.sold * T.price;
  const tM = tSales - T.sold * T.vpc - T.sold * T.vs - T.fixP - T.adm;
  const under = T.fixP - T.prod * tr;
  const tA = tSales - T.sold * tFull - under - T.sold * T.vs - T.adm;
  chk(tM, 5100); chk(tA, 1050); chk(under, 6750);
  const tdiff = costing.profitDifference(T.open, tcl, tr);
  chk(tA - tM, tdiff);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Chitungwiza Candles sells candles at ${usd(T.price)}. Variable production cost is ${usd(T.vpc)} and variable selling cost ${usd(T.vs)} a candle. Fixed production overhead of ${usd(T.fixP)} is absorbed on a budget of ${F(T.bud)} candles (${usd(tr)} a candle). Administration expenses are ${usd(T.adm)}. Opening inventory was ${F(T.open)} candles, production ${F(T.prod)} and sales ${F(T.sold)}. Under- or over-absorbed overhead is charged to the year's profit.`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "units", value: tcl, wrong: [T.sold - T.prod, T.open], stem: "Calculate the closing inventory in candles.", explanation: `${F(T.open)} + ${F(T.prod)} - ${F(T.sold)} = ${tcl}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: tM, wrong: [tM + T.fixP, tA], stem: "Calculate the profit under marginal costing.", explanation: `Contribution ${F(T.sold)} × ${T.price - T.vpc - T.vs} = ${F(T.sold * (T.price - T.vpc - T.vs))}; less fixed costs ${F(T.fixP + T.adm)} = ${usd(tM)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: under, wrong: [T.fixP, T.prod * tr], stem: "Calculate the under-absorbed fixed production overhead.", explanation: `${F(T.fixP)} - ${F(T.prod)} × ${tr} = ${usd(under)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: tA, wrong: [tA + under, tM], stem: "Calculate the profit under absorption costing.", explanation: `Sales ${F(tSales)} - cost of sales ${F(T.sold * tFull)} - under-absorbed ${F(under)} - selling ${F(T.sold * T.vs)} - administration ${F(T.adm)} = ${usd(tA)}.` }),
      P.manual({ label: "(e)", marks: 3, stem: "Reconcile the two profits.", points: [`Marginal profit ${F(tM)}`, `Less: decrease in inventory ${F(T.open - tcl)} candles × ${usd(tr)} = ${F(-tdiff)}`, `Absorption profit ${F(tA)}`], modelAnswer: `Marginal profit ${F(tM)} less ${F(T.open - tcl)} × ${tr} (${F(-tdiff)}) = ${F(tA)}, the absorption profit.`, explanation: "One mark for each step." }),
      P.manual({ label: "(f)", marks: 2, stem: "Explain why absorption profit is lower than marginal profit.", points: ["Inventory fell, so fixed overhead brought forward in the opening inventory was charged to this year", "Marginal costing charged only the fixed overhead incurred in the year"], modelAnswer: "Inventory fell, so fixed overhead carried in the opening inventory was charged to cost of sales under absorption costing; marginal costing charged only this year's fixed cost.", explanation: "One mark for each point." }),
    ],
    hints: ["Fixed overhead rate = budget ÷ budgeted output.", "Charge the under-absorbed overhead in the absorption statement."],
    explanation: "This item tests a reconciliation when inventory falls and fixed overhead is under-absorbed.",
  });

  b.card("FORMULA", "Profit difference", "Absorption profit - marginal profit = (closing units - opening units) × fixed overhead absorbed per unit.");
  b.card("CONCEPT", "Inventory rises", "Absorption profit is higher: fixed overhead is carried forward in closing inventory.");
  b.card("CONCEPT", "Inventory falls", "Absorption profit is lower: fixed overhead from opening inventory is charged to cost of sales.");
  b.card("CONCEPT", "Inventory unchanged", "The two profits are equal.");
  b.card("FACT", "Long-run effect", "Over the whole life of a business total profit is the same under both methods; only the timing differs.");
  b.card("FACT", "Which method for which purpose", "Absorption costing for published accounts (IAS 2) and full-cost pricing; marginal costing for decisions and performance measures.");
  b.card("CONCEPT", "Incentive to build inventory", "Under absorption costing, producing for stock raises profit without extra sales; marginal costing removes this.");
  b.card("CONCEPT", "Only the fixed rate matters", "Use the fixed production overhead per unit, not the full unit cost, in the reconciliation.");
});
void p1; void r2; void table;
