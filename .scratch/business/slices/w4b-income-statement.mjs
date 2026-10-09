// W4b: the income statement / statement of profit or loss (BES 7.5.3, CAM 5.3.2).
// Preparing a statement and cost of sales from inventory are ZIMSEC-only (applies BES); Cambridge reads and interprets.
import { concept, P, BES, CAM, money, fmt, r2, round, sum, table, statement, f } from "../lib.mjs";

concept("bus.finance.income-statement", { file: "finance/income-statement", keyPrefix: "finance.income-statement" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does an income statement (statement of profit or loss) show?",
    options: [
      ["Revenue, costs and profit or loss over a period", "Correct: it measures performance over a period such as a year."],
      ["Assets and liabilities on one particular date", "That is the statement of financial position."],
      ["Cash inflows and outflows expected each month", "That is a cash flow forecast (cash budget)."],
      ["The names and duties of the managers of the business", "That would be shown on an organisation chart."],
    ],
    answer: "A",
    explanation: "The income statement shows revenue, cost of sales, gross profit, expenses and profit for a period.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In an income statement, which item is deducted from revenue to find **gross** profit?",
    options: [
      ["Cost of sales", "Correct: gross profit = revenue − cost of sales."],
      ["Rent of the shop", "Rent is an expense deducted after gross profit."],
      ["Wages of office staff", "Wages are an expense deducted after gross profit."],
      ["Dividends to shareholders", "Dividends are paid out of profit after tax."],
    ],
    answer: "A",
    explanation: "Only the cost of the goods sold is deducted to find gross profit; expenses come next.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is an **expense** in an income statement?",
    options: [
      ["Insurance of the business premises", "Correct: a running cost deducted from gross profit."],
      ["Purchase of a new delivery lorry", "A lorry is a non-current asset, shown in the statement of financial position."],
      ["Money borrowed from a commercial bank", "A loan is a liability, not an expense."],
      ["Capital introduced by the owner", "Capital is the owner's investment, not a cost."],
    ],
    answer: "A",
    explanation: "Expenses are the running costs of the period, such as rent, wages, insurance and electricity.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "A shop's revenue rose this year, but its gross profit stayed the same. What is the **most** likely reason?",
    options: [
      ["The cost of the goods it sold rose as fast as its revenue", "Correct: higher cost of sales absorbed the extra revenue."],
      ["Its rent and wages were higher than last year", "Rent and wages are expenses; they affect profit, not gross profit."],
      ["It paid larger dividends to its owners this year than last year", "Dividends do not affect gross profit."],
      ["It bought a new building for its business", "A building is an asset, not part of gross profit."],
    ],
    answer: "A",
    explanation: "Gross profit = revenue − cost of sales. If both rise by the same amount, gross profit does not change.",
    hints: ["Which items are used to calculate gross profit?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Gross profit has risen but profit for the year has fallen. Which action should the owner look at **first**?",
    options: [
      ["Reducing the expenses such as rent and electricity", "Correct: rising expenses explain the fall in profit."],
      ["Finding a cheaper supplier of the goods sold", "Gross profit has risen, so cost of sales is not the problem."],
      ["Raising the selling price of the goods", "Gross profit is already rising; expenses are the issue."],
      ["Buying a larger amount of inventory", "Inventory does not explain the fall in profit."],
    ],
    answer: "A",
    explanation: "Profit = gross profit − expenses. If gross profit rose but profit fell, expenses must have risen more.",
    hints: ["What is deducted from gross profit to give profit?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Who is **most** likely to use an income statement to decide whether to buy shares in a company?",
    options: [
      ["A potential investor", "Correct: investors look at profit to judge future dividends and growth."],
      ["A customer buying one product", "Customers rarely study a company's accounts."],
      ["A delivery driver employed by the company", "Employees may read it, but they are not deciding about shares."],
      ["The local traffic police department", "They have no reason to use the accounts."],
    ],
    answer: "A",
    explanation: "Investors use the statement of profit or loss to judge whether the company earns enough to pay dividends.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: BES,
    stem: "A trader's opening inventory was US\\$2,000, purchases US\\$15,000 and closing inventory US\\$3,000. What was the cost of sales?",
    options: [
      ["US\\$14,000", "Correct: 2,000 + 15,000 − 3,000 = 14,000."],
      ["US\\$16,000", "This adds closing inventory and subtracts opening inventory."],
      ["US\\$15,000", "Purchases alone ignore the change in inventory."],
      ["US\\$20,000", "This adds all three figures."],
    ],
    answer: "A",
    explanation: "Cost of sales = opening inventory + purchases − closing inventory = US\\$14,000.",
    hints: ["Start with opening inventory and add the purchases."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Cambridge calls the income statement the statement of profit or loss.",
    answer: true, applies: null,
    explanation: "True. ZIMSEC uses income statement; Cambridge 0264 uses statement of profit or loss. They show the same information.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The cost of buying a new machine is shown as an expense in the income statement for the year it is bought.",
    answer: false,
    explanation: "False. A machine is a non-current asset shown in the statement of financial position; only running costs are expenses.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item with where it belongs in an income statement.",
    right: ["Revenue", "Cost of sales", "Expenses"],
    pairs: ["Sales of goods to customers", "Goods bought for resale, adjusted for inventory", "Rent of the shop", "Wages of the shop assistants", "Electricity for the premises"],
    rightIndex: [0, 1, 2, 2, 2],
    explanation: "Sales are revenue; goods bought for resale form the cost of sales; running costs such as rent, wages and electricity are expenses.",
  });
  b.fib({
    d: 2,
    stem: "Complete the formulas.",
    template: "Gross profit = revenue − {{blank:a}}. Profit for the year = gross profit − {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["cost of sales"], choices: ["cost of sales", "expenses", "dividends", "capital"] },
      { id: "b", accepted: ["expenses"], choices: ["expenses", "cost of sales", "revenue", "inventory"] },
    ],
    explanation: "Cost of sales comes off first to give gross profit; expenses then give profit.",
  });
  const rv = 36500, cs = 21900, ex = [2400, 4100, 950, 650];
  const gp = rv - cs, np = gp - sum(ex);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: np, daily: true,
    stem: `A clothing shop has revenue of ${money(rv)} and cost of sales of ${money(cs)}. Its expenses are rent ${money(ex[0])}, wages ${money(ex[1])}, electricity ${money(ex[2])} and insurance ${money(ex[3])}. Calculate the profit for the year.`,
    wrong: [gp, rv - sum(ex)],
    explanation: `Gross profit = ${fmt(rv)} − ${fmt(cs)} = ${fmt(gp)}; expenses = ${fmt(sum(ex))}; profit = ${money(np)}.`,
  });
  const o2 = 4200, pu2 = 26800, c2 = 3700;
  const cos2 = f.costOfSales(o2, pu2, c2);
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: cos2, applies: BES,
    stem: `A grocery wholesaler had opening inventory of ${money(o2)}, made purchases of ${money(pu2)} and had closing inventory of ${money(c2)}. Calculate the cost of sales.`,
    wrong: [pu2, o2 + pu2 + c2, pu2 + c2 - o2],
    explanation: `${fmt(o2)} + ${fmt(pu2)} − ${fmt(c2)} = ${money(cos2)}.`,
    workedSolution: `1. Goods available for sale = ${fmt(o2)} + ${fmt(pu2)} = ${fmt(o2 + pu2)}.\n2. Cost of sales = ${fmt(o2 + pu2)} − ${fmt(c2)} = ${money(cos2)}.`,
    hints: ["Add opening inventory and purchases.", "Then take off the goods still in store at the end."],
  });
  const rvA = 80000, gpA = 30000, pA = 12000;
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: gpA - pA,
    stem: `A statement of profit or loss shows revenue of ${money(rvA)}, gross profit of ${money(gpA)} and profit for the year of ${money(pA)}. Calculate the total expenses.`,
    wrong: [rvA - pA, rvA - gpA],
    explanation: `Expenses = gross profit − profit = ${fmt(gpA)} − ${fmt(pA)} = ${money(gpA - pA)}.`,
    workedSolution: `1. Profit = gross profit − expenses, so expenses = gross profit − profit.\n2. ${fmt(gpA)} − ${fmt(pA)} = ${money(gpA - pA)}.`,
    hints: ["Rearrange: profit = gross profit − expenses."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways the owner of a business could use its income statement to make decisions.",
    points: [
      "Use 1, e.g. compare gross profit with previous years to judge prices or supplier costs (1)",
      "Explained: if gross profit is falling relative to revenue, change supplier or price (1)",
      "Use 2, e.g. check expenses / decide whether to expand / support a loan application (1)",
      "Explained: cut rising expenses; profit shows whether growth can be afforded / bank sees ability to repay (1)",
    ],
    modelAnswer: "The owner can compare gross profit with last year. If it has fallen compared with revenue, she may look for a cheaper supplier or raise prices. She can also check which expenses have risen, such as rent, and look for savings before deciding whether the business can afford to expand.",
    explanation: "The statement supports decisions on prices, suppliers, cost control, expansion and finance.",
    hints: ["Think about gross profit and about expenses."],
  });
  // Structured 1 (BES): prepare a statement.
  const d = { rev: 54000, open: 6500, purch: 33000, close: 4500, exp: [["Rent", 6600], ["Wages", 7200], ["Electricity and water", 1800], ["Advertising", 1350]] };
  const cosD = f.costOfSales(d.open, d.purch, d.close), gpD = d.rev - cosD, teD = sum(d.exp.map((e) => e[1])), npD = gpD - teD;
  const dataTbl = table(["Item (year ended 30 June)", "US\\$"], [["Revenue", d.rev], ["Opening inventory", d.open], ["Purchases", d.purch], ["Closing inventory", d.close], ...d.exp]);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 840, calculator: true, applies: BES,
    stem: `Thandeka runs a general dealer's store in Bulawayo as a sole trader. Her records for the year are shown below.\n\n${dataTbl}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "money", value: cosD, stem: "Calculate the cost of sales.", wrong: [d.purch, d.open + d.purch + d.close], explanation: `${fmt(d.open)} + ${fmt(d.purch)} − ${fmt(d.close)} = ${money(cosD)}.` }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: gpD, stem: "Calculate the gross profit.", wrong: [d.rev - d.purch], explanation: `${fmt(d.rev)} − ${fmt(cosD)} = ${money(gpD)}.` }),
      P.num({ label: "(c)", marks: 2, type: "CALCULATION", kind: "money", value: npD, stem: "Calculate the net profit for the year.", wrong: [d.rev - teD, gpD], explanation: `Expenses = ${fmt(teD)}; net profit = ${fmt(gpD)} − ${fmt(teD)} = ${money(npD)}.` }),
      P.manual({ label: "(d)", marks: 3, stem: "Prepare Thandeka's income statement for the year ended 30 June, using a correct layout.", points: ["Heading with name and period; revenue shown first (1)", "Cost of sales section: opening inventory + purchases − closing inventory, gross profit shown (1)", "Expenses listed and totalled; net profit shown and labelled (1)"] }),
      P.manual({ label: "(e)", marks: 4, stem: "Thandeka wants to increase her net profit next year. Recommend **one** action she should take. Justify your answer.", points: ["Identifies an action, e.g. reduce wages or rent / find cheaper supplier / raise prices (1)", "Uses the data, e.g. wages are the largest expense at US\\$7,200 (1)", "Explains the effect on gross profit or expenses (1)", "Justified, with a drawback considered (1)"] }),
    ],
    explanation: `Cost of sales ${money(cosD)}; gross profit ${money(gpD)}; expenses ${money(teD)}; net profit ${money(npD)}.`,
    workedSolution: `1. Cost of sales = ${fmt(d.open)} + ${fmt(d.purch)} − ${fmt(d.close)} = ${fmt(cosD)}.\n2. Gross profit = ${fmt(d.rev)} − ${fmt(cosD)} = ${fmt(gpD)}.\n3. Expenses = ${d.exp.map((e) => fmt(e[1])).join(" + ")} = ${fmt(teD)}.\n4. Net profit = ${fmt(gpD)} − ${fmt(teD)} = ${money(npD)}.`,
    hints: ["Cost of sales = opening inventory + purchases − closing inventory.", "Expenses come off gross profit."],
  });
  // Structured 2: interpret a statement (all boards).
  const sp = statement("Kariba Tiles Ltd: statement of profit or loss (extract)", [
    ["Revenue", 250000, 300000],
    ["Cost of sales", -150000, -195000],
    ["Gross profit", 100000, 105000],
    ["Expenses", -70000, -72000],
    ["Profit for the year", 30000, 33000],
  ], { cols: ["Year 1 US\\$", "Year 2 US\\$"], checks: [["gp1", 250000 - 150000, 100000], ["gp2", 300000 - 195000, 105000], ["p1", 100000 - 70000, 30000], ["p2", 105000 - 72000, 33000]] });
  const g1 = f.grossMargin(100000, 250000), g2 = f.grossMargin(105000, 300000);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780, calculator: true,
    stem: `Kariba Tiles Ltd makes floor tiles in Harare. Its directors are pleased that profit has risen.\n\n${sp}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: 300000 - 250000, stem: "Calculate the increase in revenue from Year 1 to Year 2.", wrong: [33000 - 30000], explanation: "300,000 − 250,000 = 50,000." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", kind: "pct", value: g2, stem: "Calculate the gross profit as a percentage of revenue in Year 2, to one decimal place.", wrong: [round(f.profitMargin(33000, 300000), 1), round(g1, 1)], explanation: `105,000 ÷ 300,000 × 100 = ${round(g2, 1)}%.` }),
      P.manual({ label: "(c)", marks: 3, stem: `In Year 1 the figure in (b) was ${round(g1, 1)}%. Explain **two** possible reasons why it changed.`, points: ["It fell (from 40% to 35%) (1)", "Reason 1, e.g. cost of clay, cement or electricity rose (1)", "Reason 2, e.g. prices cut to win more sales / discounts to large customers (1)"] }),
      P.manual({ label: "(d)", marks: 4, stem: "Discuss whether the directors are right to be pleased with the results.", points: ["Profit rose by US\\$3,000 and revenue by 20% (1)", "But gross profit per dollar of sales fell; costs rising faster than revenue (1)", "Expenses well controlled (only up US\\$2,000) (1)", "Justified conclusion, e.g. partly; must tackle cost of sales (1)"] }),
    ],
    explanation: `Revenue up US\\$50,000; gross profit as a percentage of revenue fell from ${round(g1, 1)}% to ${round(g2, 1)}%.`,
    hints: ["Gross profit ÷ revenue × 100."],
  });
  b.card("DEFINITION", "Income statement (statement of profit or loss)", "Shows revenue, cost of sales, gross profit, expenses and profit for a period.");
  b.card("FORMULA", "Cost of sales", "Opening inventory + purchases − closing inventory.", null, { applies: BES });
  b.card("FORMULA", "Gross profit", "Revenue − cost of sales.");
  b.card("FORMULA", "Profit for the year (net profit)", "Gross profit − expenses.");
  b.card("CONCEPT", "Order of the income statement", "Revenue → cost of sales → gross profit → expenses → profit (then tax, dividends and retained profit for a company).");
  b.card("CONCEPT", "Uses of the income statement", "Compare with past years, budgets and rivals; decide prices, suppliers, cost cuts, expansion; investors and lenders judge performance.");
  b.card("CONCEPT", "Limitations", "Historical; shows profit not cash; ignores non-financial factors; some figures are estimates.");
  b.card("FACT", "Assets are not expenses", "Buying a vehicle or machine is shown in the statement of financial position, not as an expense.");
});
