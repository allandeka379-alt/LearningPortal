// W4a: cost.absorption-statements
import { concept, P, table, chk, r2, statement } from "../lib.mjs";
import { mc, F, usd, p1 } from "../tables/w4a-lib.mjs";

concept("aacc.cost.absorption-statements", { file: "cost/absorption-statements", keyPrefix: "cost.absorption-statements" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "At what cost is closing inventory valued under absorption costing?",
    ok: ["Full production cost with fixed overhead", "Correct: all production costs are charged to units."],
    bad: [["Variable production cost only, without any fixed overhead", "That is marginal costing."], ["Prime cost only, without the production overheads", "Prime cost leaves out the production overheads."], ["Selling price less the usual profit margin on sales", "Inventory is valued at cost, not at a price less margin."]],
    explanation: "Absorption costing charges all production costs, fixed and variable, to units, so inventory is valued at full production cost.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How are selling and administration expenses treated in an absorption costing profit statement?",
    ok: ["As period costs deducted in full in the period", "Correct: they are not part of the production cost of inventory."],
    bad: [["As part of the cost of closing inventory", "Only production costs are carried in inventory."], ["As part of the cost of each unit produced", "Non-production costs are not absorbed into units."], ["They are ignored until the goods are sold", "They are charged to the period in which they are incurred."]],
    explanation: "Non-production overheads are period costs. They are deducted in the period and are not included in inventory valuation.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A product's full production cost is US\\$30 and the owner uses a mark-up of 40% on full cost. What is the selling price?",
    ok: ["US\\$42", "Correct: 30 × 1.40."],
    bad: [["US\\$12", "This is the mark-up only, not the price."], ["US\\$50", "This divides the cost by 0.6, treating 40% as a margin on price."], ["US\\$70", "This adds 40 to the cost as a dollar amount."]],
    hints: ["Mark-up is a percentage of cost."],
    explanation: "Selling price = 30 + 40% × 30 = US\\$42.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A business has 600 units in opening inventory, produces 5,400 units and sells 5,100 units. How many units are in closing inventory?",
    ok: ["900", "Correct: 600 + 5,400 - 5,100."],
    bad: [["300", "This is the difference between production and sales and leaves out the opening inventory."], ["1,200", "This adds the sales to the opening inventory."], ["600", "This is the opening inventory; the closing inventory has changed."]],
    hints: ["Opening + produced - sold."],
    explanation: "Closing units = opening 600 + produced 5,400 - sold 5,100 = 900.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Under absorption costing, production exceeds sales in a year and all costs and prices are unchanged. What happens to profit compared with a year in which production equals sales?",
    ok: ["Profit is higher, because fixed overhead is carried forward in inventory", "Correct: some fixed overhead is not charged to the year."],
    bad: [["Profit is lower, because fixed overhead is charged twice", "Fixed overhead is charged once, partly to the next period."], ["Profit is the same, because the total cost does not change", "The cost charged to the period changes with the inventory."], ["Profit is lower, because inventory is valued at variable cost", "Absorption costing values inventory at full cost."]],
    hints: ["What happens to the fixed overhead of the unsold units?"],
    explanation: "When inventory rises, part of the fixed production overhead is carried forward in closing inventory, so less is charged to the current year and profit is higher.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a limitation of absorption costing?",
    ok: ["The overhead per unit depends on the arbitrary bases chosen", "Correct: different apportionment bases give different unit costs."],
    bad: [["It cannot value inventory for the financial statements", "It is the method used for inventory valuation."], ["It ignores fixed production overhead completely", "It includes fixed production overhead."], ["It cannot be used for pricing", "Cost-plus pricing uses absorption cost."]],
    hints: ["Think about how overheads are shared."],
    explanation: "The allocation, apportionment and choice of base are arbitrary, so unit costs are estimates and may mislead short-run decisions.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A manager wants to refuse a special order priced above variable cost but below full absorption cost. What is the best comment?",
    ok: ["It may add to profit, as the fixed overhead is incurred anyway", "Correct: the fixed overhead is not avoidable in the short run."],
    bad: [["It must be refused, because every order must cover its full cost", "This ignores the fact that fixed costs do not change with the order."], ["It must be accepted, whatever the price that is offered", "A price below variable cost would reduce profit."], ["It is irrelevant, because it is a one-off order from one buyer", "One-off orders are evaluated on relevant cost."]],
    hints: ["Which costs will change if the order is accepted?"],
    explanation: "Full absorption cost includes fixed overhead that does not change with the order. If the price exceeds the extra costs the order adds to profit, subject to non-financial factors.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "When closing inventory is higher than opening inventory, profit under absorption costing is higher than it would be if all fixed production overhead had been charged to the year.", answer: true, explanation: "True. Fixed overhead in the extra inventory is carried forward to the next period." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "Absorption costing statements must include selling expenses in the valuation of closing inventory.", answer: false, hints: ["Which costs are product costs?"], explanation: "False. Only production costs are included in inventory; selling expenses are period costs." });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item to its treatment in an absorption costing profit statement.",
    pairs: ["Opening inventory", "Closing inventory", "Under-absorbed overhead", "Administration expenses"],
    right: ["Added to production cost in cost of goods available", "Deducted to give cost of sales", "Deducted from gross profit", "Deducted in full as a period cost"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Cost of sales = opening inventory + production cost - closing inventory. Under-absorption reduces profit; administration is a period cost.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Under absorption costing, closing inventory is valued at {{blank:a}} production cost. Selling expenses are {{blank:b}} costs.",
    blanks: [{ id: "a", accepted: ["full"], choices: ["full", "variable", "prime"] }, { id: "b", accepted: ["period"], choices: ["period", "product", "sunk"] }],
    explanation: "Inventory carries full production cost; selling expenses are period costs.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "State the method of setting a selling price by adding a percentage to the full cost of a unit.", accepted: ["cost-plus pricing", "cost plus pricing", "cost-plus", "cost plus"], explanation: "It is cost-plus pricing." });

  const dmU = 2.5, dlU = 1.5, vpoU = 0.5, fixB = 30000, bu = 10000, price = 11, sellU = 0.8, adm = 9000;
  const fr = fixB / bu, fullU = dmU + dlU + vpoU + fr;
  chk(fullU, 7.5);
  // numerical, closing inventory valuation
  const open = 800, prod = 9200, sold = 9500, close = open + prod - sold;
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: close * fullU, calculator: true, daily: true, wrong: [close * (dmU + dlU + vpoU), close * fr],
    stem: `Gweru Candle Works has a full production cost of ${usd(fullU)} a candle (direct materials ${usd(dmU)}, direct labour ${usd(dlU)}, variable overhead ${usd(vpoU)} and fixed overhead ${usd(fr)}). It had ${F(open)} candles in opening inventory, produced ${F(prod)} and sold ${F(sold)}. Calculate the value of the closing inventory at full production cost.`,
    hints: ["Find the closing units first."],
    explanation: `Closing units = ${open} + ${F(prod)} - ${F(sold)} = ${close}. Value = ${close} × ${fullU} = ${usd(close * fullU)}. Valuing at variable cost only would give ${usd(close * (dmU + dlU + vpoU))}.`,
  });
  const cosV = open * fullU + prod * fullU - close * fullU;
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: cosV, calculator: true, wrong: [prod * fullU, sold * (dmU + dlU + vpoU)],
    stem: "Using the same data and opening inventory valued at US\\$7.50 a candle, calculate the cost of sales.".replace("US$", "US\\$"),
    hints: ["Opening inventory + production cost - closing inventory."],
    explanation: `${F(open * fullU)} + ${F(prod * fullU)} - ${F(close * fullU)} = ${usd(cosV)}. This equals ${F(sold)} candles sold × ${fullU}.`,
  });
  const absF = prod * fr, underF = fixB - absF;
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: underF, calculator: true, wrong: [absF, fixB],
    stem: `Fixed production overhead is absorbed at ${usd(fr)} a candle and actual fixed production overhead was ${usd(fixB)}. Calculate the under-absorbed overhead for the production of ${F(prod)} candles.`,
    hints: ["Compare actual with the amount absorbed."],
    explanation: `Absorbed = ${F(prod)} × ${fr} = ${F(absF)}. Under-absorbed = ${F(fixB)} - ${F(absF)} = ${usd(underF)}.`,
  });
  const sales = sold * price, gp = sales - cosV - underF, profit = gp - sold * sellU - adm;
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: profit, calculator: true, wrong: [sales - cosV - sold * sellU - adm, gp],
    stem: `The selling price is ${usd(price)} a candle. Selling expenses are ${usd(sellU)} a candle sold and administration expenses are ${usd(adm)}. Using your answers above, calculate the profit for the year.`,
    hints: ["Do not forget the under-absorbed overhead."],
    explanation: `Sales ${F(sales)} - cost of sales ${F(cosV)} - under-absorbed ${F(underF)} = gross profit ${F(gp)}. Less selling ${F(sold * sellU)} and administration ${F(adm)} = ${usd(profit)}.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why selling and distribution expenses are not included in the valuation of inventory.",
    points: ["They are not costs of producing the goods but of selling them", "They are period costs that belong to the period in which they are incurred, so they are deducted in full from profit"],
    modelAnswer: "Selling and distribution are costs of selling, not of making, the goods. They are period costs, so they are charged in the period and not carried forward in inventory.",
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how a manager could increase reported profit under absorption costing without selling more goods.",
    points: ["Produce more than is sold, so that inventory rises", "Fixed production overhead in the extra inventory is carried forward and not charged to the year", "So profit rises, although no extra goods have been sold, and the cash position may worsen"],
    modelAnswer: "By producing more than he sells, closing inventory rises and part of the fixed overhead is carried forward in the inventory, so less is charged and reported profit rises. Cash is tied up in unsold goods.",
    hints: ["Where does the fixed overhead of unsold goods go?"],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "Evaluate the usefulness of absorption costing information to the owner of a small bakery.",
    points: ["It gives a full cost per loaf for pricing and shows whether the price covers all production costs", "It values unsold stock correctly for the financial statements", "Overhead per unit depends on arbitrary bases and on budgeted output, so it can mislead", "It does not show which costs change with output, so it is poor for short-run decisions such as special orders", "Judgement: useful for long-run pricing, but should be supported by marginal (contribution) data and non-financial factors"],
    modelAnswer: "Absorption cost shows what a loaf costs in full, which helps pricing and inventory valuation. However, overhead shares are arbitrary and fixed costs are hidden in unit cost, so it is unsuitable for short-run decisions. The owner needs both full cost and contribution information.",
    hints: ["Give uses, limitations and a conclusion."],
    explanation: "One mark for each of the five points.",
  });

  // Structured 1 (12 marks)
  const S = { dm: 3.1, dl: 2, vpo: 0.9, fixB: 32000, bu: 8000, price: 15, sell: 1.2, adm: 10500, open: 700, prod: 7600, sold: 8000 };
  const sFr = S.fixB / S.bu, sFull = S.dm + S.dl + S.vpo + sFr;
  chk(sFull, 10);
  const cl = S.open + S.prod - S.sold;
  const sales1 = S.sold * S.price;
  const cos1 = S.open * sFull + S.prod * sFull - cl * sFull;
  const abs1 = S.prod * sFr, und1 = S.fixB - abs1;
  const gp1 = sales1 - cos1 - und1;
  const np1 = gp1 - S.sold * S.sell - S.adm;
  chk(np1, 18300);
  const model1 = statement("Kwekwe Mats Ltd: absorption costing profit statement", [
    [`Sales (${F(S.sold)} × US\\$15)`, null, sales1],
    ["Opening inventory (700 × US\\$10)", S.open * sFull],
    [`Production cost (${F(S.prod)} × US\\$10)`, S.prod * sFull],
    ["Closing inventory (300 × US\\$10)", -cl * sFull],
    ["Cost of sales", null, -cos1],
    ["Under-absorbed fixed production overhead", null, -und1],
    ["**Gross profit**", null, gp1],
    [`Selling expenses (${F(S.sold)} × US\\$1.20)`, null, -S.sold * S.sell],
    ["Administration expenses", null, -S.adm],
    ["**Profit**", null, np1],
  ], { cols: ["US\\$", "US\\$"], checks: [["cos", S.open * sFull + S.prod * sFull - cl * sFull, cos1], ["np", gp1 - S.sold * S.sell - S.adm, np1]] });
  b.struct({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `Kwekwe Mats Ltd makes sleeping mats. Per mat: direct materials ${usd(S.dm)}, direct labour ${usd(S.dl)}, variable production overhead ${usd(S.vpo)}. Fixed production overhead is absorbed at ${usd(sFr)} a mat (budget ${usd(S.fixB)} for ${F(S.bu)} mats). Actual fixed production overhead was ${usd(S.fixB)}. The selling price is ${usd(S.price)}, selling expenses ${usd(S.sell)} a mat sold and administration ${usd(S.adm)}. Opening inventory was ${S.open} mats, production ${F(S.prod)} mats and sales ${F(S.sold)} mats.`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "units", value: cl, wrong: [S.sold - S.prod, S.open], stem: "Calculate the number of mats in closing inventory.", explanation: `${S.open} + ${F(S.prod)} - ${F(S.sold)} = ${cl}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: cos1, wrong: [S.prod * sFull, S.sold * (S.dm + S.dl + S.vpo)], stem: "Calculate the cost of sales.", explanation: `${F(S.open * sFull)} + ${F(S.prod * sFull)} - ${F(cl * sFull)} = ${usd(cos1)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: und1, wrong: [abs1, S.fixB], stem: "Calculate the under-absorbed fixed production overhead.", explanation: `${F(S.fixB)} - ${F(S.prod)} × ${sFr} = ${usd(und1)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: np1, wrong: [gp1, sales1 - cos1 - S.sold * S.sell - S.adm], stem: "Calculate the profit for the year.", explanation: `Gross profit ${F(sales1)} - ${F(cos1)} - ${F(und1)} = ${F(gp1)}; less ${F(S.sold * S.sell)} and ${F(S.adm)} = ${usd(np1)}.` }),
      P.manual({ label: "(e)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the absorption costing profit statement for the year.", points: [`Sales ${F(sales1)}`, `Cost of sales ${F(cos1)} with opening and closing inventory at ${usd(sFull)} a mat`, `Under-absorbed overhead ${F(und1)} deducted`, `Selling and administration expenses deducted; profit ${F(np1)}`], modelAnswer: model1, explanation: "One mark for each group of lines." }),
    ],
    hints: ["Full cost per mat is the sum of all four elements.", "Production was below the budgeted 8,000 mats."],
    explanation: "This item tests an absorption costing profit statement with under-absorbed overhead.",
  });

  // Structured 2 (16 marks): two years, inventory effect
  const sellB = 0.9, admB = 8500;
  const A = { prod: 10000, sold: 7500 }, B = { prod: 10000, sold: 10200 };
  const closeA = A.prod - A.sold, closeB = closeA + B.prod - B.sold;
  const profitA = A.sold * price - (A.prod * fullU - closeA * fullU) - A.sold * sellB - admB;
  const cosB = closeA * fullU + B.prod * fullU - closeB * fullU;
  const profitB = B.sold * price - cosB - B.sold * sellB - admB;
  chk(profitA, 11000); chk(profitB, 18020);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Gweru Candle Works (full cost ${usd(fullU)} a candle including fixed overhead of ${usd(fr)}, price ${usd(price)}, selling expenses ${usd(sellB)} a candle and administration ${usd(admB)} a year) started trading in year A with no inventory. Budgeted and actual production were ${F(bu)} candles in each year, so there was no under- or over-absorption. Year A: production ${F(A.prod)}, sales ${F(A.sold)}. Year B: production ${F(B.prod)}, sales ${F(B.sold)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: closeA * fullU, wrong: [closeA * (dmU + dlU + vpoU), A.sold * fullU], stem: "Calculate the value of the closing inventory at the end of year A.", explanation: `${F(closeA)} candles × ${fullU} = ${usd(closeA * fullU)}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: profitA, wrong: [A.sold * price - A.prod * fullU - A.sold * sellB - admB, A.sold * (price - fullU)], stem: "Calculate the profit for year A.", explanation: `Sales ${F(A.sold * price)}; cost of sales ${F(A.prod * fullU - closeA * fullU)}; selling ${F(A.sold * sellB)}; administration ${F(admB)}; profit ${usd(profitA)}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: profitB, wrong: [B.sold * price - B.prod * fullU - B.sold * sellB - admB, profitA], stem: "Calculate the profit for year B.", explanation: `Sales ${F(B.sold * price)}; cost of sales ${F(closeA * fullU)} + ${F(B.prod * fullU)} - ${F(closeB * fullU)} = ${F(cosB)}; selling ${F(B.sold * sellB)}; administration ${F(admB)}; profit ${usd(profitB)}.` }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain how the fixed production overhead is treated in each year and why profit per candle sold is not the same in the two years.", points: [`In year A, ${F(closeA)} candles are unsold, so ${F(closeA * fr)} of the fixed overhead is carried forward in inventory`, "In year B, part of that overhead is charged to cost of sales as the inventory is sold", "Profit depends on the number of units sold and on how much fixed overhead is released or deferred", "Profit per candle sold is therefore different although the cost per candle is the same"], modelAnswer: `In year A the fixed overhead of ${F(closeA * fr)} on ${F(closeA)} unsold candles is carried forward. In year B it is released as the stock is sold, together with the overhead of the current year, so the profit pattern depends on sales as well as production.`, hints: ["Look at the fixed overhead in closing inventory."], explanation: "One mark for each point." }),
      P.manual({ label: "(e)", marks: 5, stem: "The owner proposes to produce 20,000 candles in year C, although sales will stay at 10,200, to increase profit. Evaluate the proposal.", points: ["Absorption costing would defer fixed overhead in the extra inventory and so profit would increase on paper", "But cash is tied up in unsold stock and storage costs rise", "The candles may become obsolete or damaged", "The fixed overhead rate was based on 10,000 candles, so output of 20,000 would over-absorb overhead and the apparent profit is not real", "Recommendation: do not produce for stock merely to show profit; produce to meet expected demand"], modelAnswer: "Producing 20,000 candles would defer more fixed overhead in inventory and raise reported profit, but the extra stock ties up cash, costs storage and may not sell. Over-absorption would also have to be corrected. The owner should produce to meet expected demand.", hints: ["Reported profit and cash are different things."], explanation: "One mark for each point." }),
    ],
    hints: ["Closing inventory is valued at full cost.", "Year B opens with year A's closing inventory."],
    explanation: "This item shows the effect of inventory changes on absorption costing profit.",
  });

  b.card("DEFINITION", "Absorption costing", "All production costs, fixed and variable, are charged to units; inventory is valued at full production cost.");
  b.card("FORMULA", "Cost of sales (absorption)", "Opening inventory + production cost - closing inventory (all at full production cost per unit), adjusted for under- or over-absorbed overhead.");
  b.card("CONCEPT", "Non-production overheads", "Selling, distribution and administration costs are period costs, deducted in full in the period; never included in inventory.");
  b.card("CONCEPT", "Rising inventory under absorption costing", "Fixed overhead is carried forward in closing inventory, so profit is higher than if all fixed overhead were charged to the year.");
  b.card("CONCEPT", "Falling inventory under absorption costing", "Fixed overhead brought forward in opening inventory is released into cost of sales, so profit is lower.");
  b.card("FORMULA", "Closing inventory units", "Opening units + units produced - units sold.");
  b.card("DEFINITION", "Cost-plus pricing", "Selling price = full cost + mark-up (a percentage of cost).");
  b.card("CONCEPT", "Limitations of absorption costing", "Arbitrary overhead bases; unit cost depends on budgeted output; hides cost behaviour; may mislead short-run decisions.");
  b.card("CONCEPT", "Uses of absorption costing", "Inventory valuation for financial statements, full-cost pricing and quotations, recovering all production costs.");
});
void p1; void r2; void table;
