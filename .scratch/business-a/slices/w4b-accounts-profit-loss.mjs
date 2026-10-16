// W4b: accounts.profit-loss
import { concept, P, table, r2, ratios, chk, fmt, profitLoss } from "../lib.mjs";
import { mc } from "../tables/w4b-lib.mjs";

concept("abus.accounts.profit-loss", { file: "accounts/profit-loss", keyPrefix: "accounts.profit-loss" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "How is **gross profit** calculated?",
    ok: ["Revenue minus cost of sales", "Correct: the profit left after the direct cost of goods sold."],
    bad: [["Revenue minus all expenses", "That would give profit from operations if cost of sales were included in the expenses."], ["Cost of sales minus revenue", "This reverses the subtraction and would give a negative result for a profitable firm."], ["Profit from operations minus tax", "That is a step towards profit for the year."]],
    explanation: "Gross profit = revenue − cost of sales.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which item is **not** an expense in the statement of profit or loss?",
    ok: ["Dividends paid to shareholders", "Correct: dividends are a distribution of profit, shown below profit for the year."],
    bad: [["Wages paid to employees", "Wages are an expense of running the business."], ["Depreciation of the delivery equipment", "Depreciation is an expense for the year."], ["Rent paid on the premises", "Rent is an expense of the period."]],
    explanation: "Dividends are a share-out of the profit already made, not a cost of earning it.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "A bank is deciding whether to lend to a company. Which part of the statement of profit or loss will it study most closely to judge ability to pay interest?",
    ok: ["Profit from operations against finance costs", "Correct: profit before interest shows the margin available to pay interest."],
    bad: [["The size of the dividends paid to the shareholders", "Dividends are paid after interest and do not show ability to pay it."], ["The cost of the managing director's car", "That is just one expense and not the main measure."], ["The closing inventory figure alone", "Inventory alone says nothing about interest cover."]],
    explanation: "Lenders compare profit before finance costs with the interest to be paid.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional firm discovers that it left out a depreciation charge of US\\$4,000. What is the effect on its profit figures?",
    ok: ["Only profit from operations falls, by US\\$4,000", "Correct: depreciation is an expense below gross profit."],
    bad: [["Gross profit falls by US\\$4,000 and so does profit from operations", "Depreciation is not part of cost of sales in this layout."], ["Gross profit rises and profit from operations is unchanged", "Adding an expense cannot raise any profit figure."], ["Neither profit figure changes, as no cash is paid", "Depreciation is an expense even though no cash leaves the business."]],
    hints: ["Where does depreciation appear in the statement?"],
    explanation: "Depreciation is deducted after gross profit as an expense, so profit from operations (and everything below) falls; gross profit is unchanged.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Other things being equal, what is the effect of a **higher closing inventory** figure on cost of sales and gross profit?",
    ok: ["Cost of sales is lower and gross profit is higher", "Correct: closing inventory is deducted in the cost of sales calculation."],
    bad: [["Cost of sales is higher and gross profit is lower", "This is the effect of a lower closing inventory."], ["Cost of sales and gross profit are both higher", "Gross profit is revenue minus cost of sales, so they move in opposite directions."], ["Neither changes, because inventory is an asset", "Closing inventory affects cost of sales."]],
    hints: ["Cost of sales = opening inventory + purchases − closing inventory."],
    explanation: "A higher closing inventory is deducted from goods available for sale, so cost of sales is lower and gross profit is higher.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional company writes off US\\$12,600 of damaged inventory. Which statement is correct?",
    ok: ["Cost of sales rises, so gross profit and margin fall", "Correct: the loss is added to cost of sales."],
    bad: [["Expenses rise, so only the operating margin falls", "In this layout the write-off enters cost of sales, so gross profit falls too."], ["Revenue falls by the amount of the inventory written off", "Revenue is earned from sales, not from inventory held."], ["Profit rises because inventory is no longer held", "A write-off is a loss, not a gain."]],
    hints: ["Which line contains inventory movements?"],
    explanation: "A write-off reduces closing inventory, which raises cost of sales and lowers gross profit and profit below it.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Dividends are deducted from profit for the year to show the retained profit.",
    answer: true,
    explanation: "True. Retained profit = profit for the year − dividends; it is added to reserves.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Buying a new delivery van for US\\$18,000 is shown as an expense of US\\$18,000 in the statement of profit or loss.",
    answer: false,
    hints: ["What is the difference between capital and revenue expenditure?"],
    explanation: "False. The van is a non-current asset; only the depreciation charged each year appears as an expense.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Cost of sales", "Opening inventory + purchases − closing inventory"], ["Gross profit", "Revenue − cost of sales"], ["Profit from operations", "Gross profit − expenses, before finance costs and tax"], ["Retained profit", "Profit for the year − dividends"]],
    explanation: "Each term is a step in the statement.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Profit from operations is calculated {{blank:a}} finance costs and tax, while profit for the year is calculated {{blank:b}} them.",
    blanks: [
      { id: "a", accepted: ["before"], choices: ["before", "after", "without"] },
      { id: "b", accepted: ["after"], choices: ["before", "after", "without"] },
    ],
    explanation: "Profit from operations is before finance costs and tax; profit for the year is after both.",
  });

  // ---- numerical items
  const c1 = 18500 + 96400 - 21900;
  chk(c1, 93000);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: c1, calculator: true, wrong: [18500 + 96400 + 21900, 96400],
    stem: "A fictional shop's opening inventory was US\\$18,500, its purchases were US\\$96,400 and its closing inventory was US\\$21,900. Calculate its cost of sales.",
    hints: ["Opening inventory + purchases − closing inventory."],
    explanation: "18,500 + 96,400 = 114,900 goods available for sale; less closing inventory 21,900 = US\\$93,000. Adding the closing inventory gives US\\$136,800.",
  });
  const op2 = 318000 - 190800 - 82700;
  chk(op2, 44500);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: op2, calculator: true, daily: true, wrong: [318000 - 190800, 318000 - 82700],
    stem: "A fictional company has revenue of US\\$318,000, cost of sales of US\\$190,800 and total expenses of US\\$82,700. Calculate its profit from operations.",
    hints: ["Gross profit first, then deduct the expenses."],
    explanation: "Gross profit = 318,000 − 190,800 = 127,200. Profit from operations = 127,200 − 82,700 = US\\$44,500. US\\$127,200 is the gross profit, not the answer.",
  });
  const pfy3 = (52300 - 4800) * 0.75;
  chk(pfy3, 35625, 1e-6);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: pfy3, calculator: true, wrong: [52300 - 4800, 52300 * 0.75],
    stem: "A fictional company has profit from operations of US\\$52,300 and finance costs of US\\$4,800. Tax is charged at 25% of profit before tax. Calculate the profit for the year.",
    hints: ["Deduct finance costs before working out the tax."],
    explanation: "Profit before tax = 52,300 − 4,800 = 47,500. Tax = 25% × 47,500 = 11,875. Profit for the year = 47,500 − 11,875 = US\\$35,625. Taxing the profit from operations instead gives US\\$39,225.",
    workedSolution: "1. Profit before tax = 52,300 − 4,800 = 47,500.\n2. Tax = 0.25 × 47,500 = 11,875.\n3. Profit for the year = 47,500 − 11,875 = 35,625.",
  });
  const pfy4 = (48000 - 4200) * 0.8;
  chk(pfy4, 35040, 1e-6);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: pfy4, calculator: true, wrong: [48000 * 0.8, 48000 - 4200],
    stem: "A fictional company's draft statement shows profit before tax of US\\$48,000 and tax of US\\$9,600 (20% of profit before tax). The accountant then finds that US\\$4,200 of rent owed for the year was not recorded. Calculate the corrected profit for the year, with tax still at 20% of profit before tax.",
    hints: ["The extra expense reduces profit before tax, and the tax must be recalculated."],
    explanation: "Corrected profit before tax = 48,000 − 4,200 = 43,800. Tax = 20% × 43,800 = 8,760. Profit for the year = 43,800 − 8,760 = US\\$35,040. The original profit for the year was US\\$38,400.",
    workedSolution: "1. Profit before tax = 48,000 − 4,200 = 43,800.\n2. Tax = 0.2 × 43,800 = 8,760.\n3. Profit for the year = 43,800 − 8,760 = 35,040.",
  });
  const gm5 = ratios.grossMargin(420000 - 273000 - 12600, 420000);
  chk(gm5, 32, 1e-9);
  b.calc({
    d: 5, skill: "ANALYSIS", kind: "pct", value: gm5, calculator: true, wrong: [35, r2((12600 / 420000) * 100)],
    stem: "A fictional company has revenue of US\\$420,000 and cost of sales of US\\$273,000 (a gross margin of 35.0%). It then writes off damaged inventory costing US\\$12,600. Calculate the new gross profit margin, to one decimal place.",
    hints: ["The write-off is added to cost of sales."],
    explanation: "New cost of sales = 273,000 + 12,600 = 285,600. Gross profit = 420,000 − 285,600 = 134,400. Margin = 134,400 ÷ 420,000 × 100 = 32.0%, a fall of 3.0 percentage points.",
    workedSolution: "1. New cost of sales = 273,000 + 12,600 = 285,600.\n2. Gross profit = 420,000 − 285,600 = 134,400.\n3. Margin = 134,400 ÷ 420,000 × 100 = 32.0%.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the figure that is found by deducting cost of sales from revenue.",
    accepted: ["gross profit", "the gross profit"],
    explanation: "Gross profit.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why depreciation is charged in the statement of profit or loss although no cash is paid.",
    points: ["A non-current asset helps to earn revenue over several years", "Depreciation spreads the cost of the asset over its useful life, matching cost to the revenue it helps to earn", "Without it, profit would be overstated in the years of use and the asset would be shown at too high a value"],
    modelAnswer: "A non-current asset helps to earn revenue over several years. Depreciation spreads its cost over its useful life, so that the cost is matched with the revenue it helps to earn. Without it, profit would be overstated and the asset would be shown at too high a value.",
    hints: ["Think about matching costs with revenue."],
    explanation: "The matching concept.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A fictional company's gross profit rose but its profit from operations fell. Analyse two possible reasons.",
    points: ["Expenses such as wages, rent or marketing rose by more than gross profit", "So the extra gross profit was used up before profit from operations", "Depreciation or an exceptional expense, such as a write-off, rose", "These costs are deducted after gross profit, so profit from operations falls"],
    modelAnswer: "Expenses such as wages, rent or marketing may have risen by more than the gross profit, so the extra gross profit was used up before profit from operations. A higher depreciation charge or an exceptional expense is also deducted after gross profit, so profit from operations can fall even when gross profit rises.",
    hints: ["What is deducted between gross profit and profit from operations?"],
    explanation: "Expenses grew faster than gross profit.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Evaluate how useful the statement of profit or loss is to a bank deciding whether to lend to a company.",
    points: ["It shows profit from operations, which is available to pay interest", "Comparing years shows whether profit is rising or falling", "Ratios such as the margins can be calculated and compared with rivals", "It shows profit, not cash, so it does not show whether the company can pay on time", "It does not show assets, existing debts or future prospects", "Judgement and reason, for example use it with the statement of financial position and a cash flow forecast"],
    modelAnswer: "The statement shows profit from operations, which is available to pay interest, and comparing years and rivals shows trends. But it shows profit, not cash, so it does not show whether the company can pay on time, and it does not show assets, existing debts or future prospects. The bank should use it together with the statement of financial position and a cash flow forecast.",
    hints: ["Say what it shows and what it does not show."],
    explanation: "Uses and limits weighed, with a conditional judgement.",
  });

  // ---- practice structured items
  const T = { rev: 210000, open: 12000, purch: 118000, close: 15500, exp: [["Wages", 28000], ["Rent", 12000], ["Other expenses", 7500], ["Depreciation", 5000]], fin: 2000, tax: 4000 };
  const cosT = T.open + T.purch - T.close;
  const pl = profitLoss({ business: "x", period: "x", revenue: T.rev, costOfSales: cosT, expenses: T.exp, financeCosts: T.fin, tax: T.tax });
  chk(cosT, 114500); chk(pl.profitFromOperations, 43000); chk(pl.profitForYear, 37000);
  const tbl1 = table(["US\\$", "Amount"], [["Revenue", T.rev], ["Opening inventory", T.open], ["Purchases", T.purch], ["Closing inventory", T.close], ["Wages", 28000], ["Rent", 12000], ["Other expenses", 7500], ["Depreciation", 5000], ["Finance costs", T.fin], ["Tax", T.tax]]);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Nyasha's Tuckshop Ltd is a fictional company in Mutare. Its figures for the year are shown.\n\n${tbl1}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: cosT, wrong: [T.purch, T.open + T.purch + T.close], stem: "Calculate the cost of sales.", explanation: "12,000 + 118,000 − 15,500 = US\\$114,500." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: pl.profitFromOperations, type: "CALCULATION", wrong: [pl.grossProfit, pl.profitForYear], stem: "Calculate the profit from operations.", explanation: "Gross profit = 210,000 − 114,500 = 95,500. Expenses = 28,000 + 12,000 + 7,500 + 5,000 = 52,500. Profit from operations = 95,500 − 52,500 = US\\$43,000.", workedSolution: "1. Gross profit = 210,000 − 114,500 = 95,500.\n2. Expenses = 52,500.\n3. Profit from operations = 95,500 − 52,500 = 43,000." }),
      P.manual({ label: "(c)", marks: 4, stem: "The shop's profit for the year is US\\$37,000. Explain two reasons why this figure may not equal the increase in the shop's cash during the year.", points: ["Depreciation of US\\$5,000 is deducted as an expense but is not a cash payment", "So cash would be higher than profit suggests by that amount", "Inventory and credit sales: goods may be sold on credit (cash not yet received) or purchased for inventory", "Profit is measured when revenue is earned and costs incurred, not when cash moves, and cash may be spent on assets or loans"], modelAnswer: "Depreciation of US\\$5,000 is deducted as an expense but no cash is paid, so cash would be higher than the profit suggests. Profit is also measured when revenue is earned and costs incurred, not when cash moves: goods may be sold on credit so the cash has not yet been received, and cash may be spent on inventory, assets or loan repayments that do not reduce profit.", explanation: "Profit and cash differ because of non-cash items and timing." }),
    ],
    hints: ["Cost of sales needs both inventories.", "Add all four expenses."],
    explanation: "Cost of sales US\\$114,500; profit from operations US\\$43,000; profit and cash differ.",
  });
  const R = { rev: 504000, cos: 302400, exp: 128000, fin: 8000 };
  const base = profitLoss({ business: "x", period: "x", revenue: R.rev, costOfSales: R.cos, expenses: [["e", R.exp]], financeCosts: R.fin, tax: 16400 });
  chk(base.profitFromOperations, 73600); chk(base.profitForYear, 49200);
  const gp2 = R.rev - (R.cos + 9600), op2b = gp2 - (R.exp + 3200), pbt2 = op2b - R.fin, pfy2 = pbt2 * 0.75;
  chk(gp2, 192000); chk(op2b, 60800); chk(pbt2, 52800); chk(pfy2, 39600);
  const tbl2 = table(["US\\$", "Draft"], [["Revenue", R.rev], ["Cost of sales", R.cos], ["Gross profit", 201600], ["Expenses", R.exp], ["Profit from operations", 73600], ["Finance costs", R.fin], ["Profit before tax", 65600], ["Tax at 25%", 16400], ["Profit for the year", 49200]]);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `The draft statement of profit or loss of Bulawayo Bakery Ltd (a fictional company) is shown. The owner then finds that goods costing US\\$9,600 were stolen from the store room and have not been recorded, and that an electricity bill of US\\$3,200 for the last month of the year was left out. Tax is 25% of profit before tax.\n\n${tbl2}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: gp2, wrong: [201600, 201600 - 3200], stem: "Calculate the corrected gross profit.", explanation: "The stolen goods raise the cost of sales to 302,400 + 9,600 = 312,000. Gross profit = 504,000 − 312,000 = US\\$192,000." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: op2b, wrong: [73600, 73600 - 9600], stem: "Calculate the corrected profit from operations.", explanation: "Expenses = 128,000 + 3,200 = 131,200. Profit from operations = 192,000 − 131,200 = US\\$60,800." }),
      P.group({ label: "(c)", stem: "Calculate the corrected:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: pbt2, wrong: [65600, 60800], stem: "profit before tax;", explanation: "60,800 − 8,000 = US\\$52,800." }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: pfy2, wrong: [49200, 52800 - 16400], stem: "profit for the year.", explanation: "Tax = 25% × 52,800 = 13,200. Profit for the year = 52,800 − 13,200 = US\\$39,600." }),
      ] }),
      P.manual({ label: "(d)", marks: 6, stem: "Evaluate the importance of correcting the draft statement before it is sent to the bank and the tax authority.", points: [["Corrected profit for the year is US\\$39,600, US\\$9,600 lower than the draft (49,200)", 1], ["The draft overstates profit, which would mislead the bank about the ability to pay interest", 1], ["The draft overstates the tax payable, which is paid on profit; correcting it reduces the tax by US\\$3,200", 1], ["Correcting shows the true gross margin (38.1% against 40.0%) and highlights theft and weak stock control", 1], ["Costs of correction are small compared with the risk of misleading users or penalties", 1], ["Judgement and reason, for example correct before filing and investigate the theft", 1]], levels: [[3, 5, 6, "Uses corrected figures and several users; weighs consequences; a justified conclusion"], [2, 3, 4, "Explains some effects with some figures; judgement weakly supported"], [1, 1, 2, "States that accuracy matters with little development"]], modelAnswer: "The corrected profit for the year is US\\$39,600, US\\$9,600 lower than the draft of US\\$49,200. If the draft were sent, the bank would be misled about the bakery's ability to pay interest, and the draft overstates the tax payable by US\\$3,200. The corrections also show a true gross margin of 38.1% against 40.0%, which highlights the theft and weak stock control. The cost of correcting the statement is small compared with the risk of misleading users, so the owner should correct it before filing and investigate the theft.", hints: ["Compare the draft and corrected profit, then think about who uses the statement."], explanation: "Corrected profit is lower; accuracy matters for the bank, the tax authority and control of stock." }),
    ],
    hints: ["Stolen goods are added to cost of sales; the electricity bill is an expense."],
    explanation: "Gross profit US\\$192,000; profit from operations US\\$60,800; profit before tax US\\$52,800; profit for the year US\\$39,600.",
  });

  b.card("DEFINITION", "Statement of profit or loss", "A statement showing a business's revenue, costs and profit for a period (also called an income statement).");
  b.card("FORMULA", "Cost of sales", "Opening inventory + purchases − closing inventory.");
  b.card("FORMULA", "Gross profit", "Revenue − cost of sales.");
  b.card("FORMULA", "Profit from operations", "Gross profit − expenses, before finance costs and tax.");
  b.card("FORMULA", "Profit for the year", "Profit from operations − finance costs − tax.");
  b.card("FORMULA", "Retained profit", "Profit for the year − dividends; added to reserves.");
  b.card("CONCEPT", "Dividends and the statement", "Dividends are a distribution of profit, not an expense, and are shown below profit for the year.");
  b.card("CONCEPT", "Amending the statement", "Change the line affected, then recalculate every subtotal below it and any tax charged as a percentage of profit.");
  b.card("CONCEPT", "Depreciation and profit", "An expense that reduces profit from operations but involves no cash payment in the year.");
});
