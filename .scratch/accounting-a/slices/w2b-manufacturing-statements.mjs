// W2b: manufacturing.statements
import { concept, P, money, fmt, chk, r2, sum, statement, ratios } from "../lib.mjs";
import { mc, U, mfg } from "../tables/w2b-lib.mjs";

concept("aacc.manufacturing.statements", { file: "manufacturing/statements", keyPrefix: "manufacturing.statements" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which three kinds of inventory does a manufacturer show in its statement of financial position?",
    right: ["Raw materials, work in progress and finished goods", "Correct: each is counted and shown separately."],
    wrong: [["Direct materials, indirect materials and consumables", "These are types of materials, not stages of production."], ["Opening inventory, closing inventory and spare parts", "Opening inventory is a figure for the start of the year."], ["Purchases, factory costs and sales", "These are not inventories."]],
    explanation: "A manufacturer holds inventories at three stages: materials, partly made goods and finished goods.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In which statement is the depreciation of factory machinery shown?",
    right: ["The manufacturing account, as a factory overhead", "Correct: it is a cost of making the goods."],
    wrong: [["The statement of profit or loss, as an administration expense", "Only the depreciation of office assets is administration."], ["The statement of financial position only", "The charge is an expense; the accumulated depreciation is in the statement of financial position."], ["The trading section, as part of cost of sales", "The cost of sales uses the cost of production, which already includes it."]],
    explanation: "Depreciation of machinery in the factory is an overhead in the manufacturing account.",
  });
  const q3 = { fo: 14500, cop: 82300, fc: 12800 };
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: `Opening finished goods ${money(q3.fo)}, cost of production ${money(q3.cop)} and closing finished goods ${money(q3.fc)}. What is the cost of sales?`,
    right: [money(q3.fo + q3.cop - q3.fc), "Correct: 14,500 + 82,300 − 12,800."],
    wrong: [[money(q3.cop), "Opening and closing finished goods must be adjusted."], [money(q3.cop - q3.fo + q3.fc), "The opening and closing figures are reversed."], [money(q3.fo + q3.cop + q3.fc), "Closing finished goods must be deducted."]],
    hints: ["Cost of production replaces purchases."],
    explanation: "Cost of sales = 14,500 + 82,300 − 12,800 = 84,000.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Factory power of US\\$600 is owing at the year end. How is it dealt with in the final accounts?",
    right: ["It is added to factory power in the manufacturing account and shown as a current liability", "Correct: the expense belongs to the year, and the unpaid amount is owed."],
    wrong: [["It is added to administration expenses in the statement of profit or loss", "It is a factory cost."], ["It is deducted from factory overheads as a prepayment", "An amount owing is an accrual, not a prepayment."], ["It is ignored until it is paid", "Expenses are matched to the year in which they are incurred."]],
    hints: ["Is the cost of power a factory or an office cost?"],
    explanation: "An accrued factory expense increases the factory overhead and is a current liability.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "In which section is the depreciation of office equipment shown?",
    right: ["Administration expenses in the statement of profit or loss", "Correct: office equipment is not used in making the goods."],
    wrong: [["Factory overheads in the manufacturing account", "Only factory assets belong there."], ["Prime cost as a direct expense", "Depreciation of office equipment is not a direct cost of any product."], ["Cost of sales", "Cost of sales uses the cost of production."]],
    hints: ["Where is the equipment used?"],
    explanation: "Office equipment depreciation is an administration expense.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "How is the inventory of a manufacturing business shown in current assets?",
    right: ["On separate lines: materials, work in progress and finished goods", "Correct: each stage is valued and disclosed."],
    wrong: [["As a single total for the three kinds of inventory held together", "The statement of financial position gives the three kinds separately."], ["Only finished goods are shown, and the others are treated as expenses", "Materials and work in progress are assets until used."], ["At the transfer price less all the depreciation charged", "Inventory is valued at the lower of cost and net realisable value."]],
    hints: ["Think about what the owner needs to know."],
    explanation: "Showing the three inventories separately shows how much is held at each stage.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which items appear in the statements of a manufacturing company but NOT in those of a manufacturing sole trader?",
    right: ["Finance costs on loan notes, income tax and share capital", "Correct: they arise only in a company."],
    wrong: [["Raw materials, work in progress and finished goods", "These appear in both."], ["Prime cost and factory overheads", "The manufacturing account is the same."], ["Depreciation of machinery", "Both charge depreciation."]],
    hints: ["What is different about the owners?"],
    explanation: "A company has tax, finance costs on borrowings and share capital with reserves.",
  });
  const q8 = { rev: 142000, fo: 12000, cop: 86400, fc: 10400 };
  const q8g = chk(q8.rev - (q8.fo + q8.cop - q8.fc), 54000);
  mc(b, {
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `Revenue ${money(q8.rev)}; opening finished goods ${money(q8.fo)}; cost of production ${money(q8.cop)}; closing finished goods ${money(q8.fc)}. What is the gross profit?`,
    right: [money(q8g), "Correct: cost of sales is 88,000."],
    wrong: [[money(q8.rev - q8.cop), "The finished goods have not been adjusted."], [money(q8.rev - (q8.fc + q8.cop - q8.fo)), "Opening and closing finished goods are reversed."], [money(q8.rev - q8.fo - q8.cop - q8.fc), "Closing finished goods must be deducted, not added."]],
    hints: ["Find the cost of sales first."],
    explanation: "Cost of sales = 12,000 + 86,400 − 10,400 = 88,000. Gross profit = 142,000 − 88,000 = 54,000.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In the statement of profit or loss of a manufacturer, the cost of production takes the place of purchases.",
    answer: true,
    explanation: "True. The goods are made, not bought, so the cost of production is used in cost of sales.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Closing work in progress is deducted in the trading section, with closing finished goods.",
    answer: false,
    hints: ["Which account adjusts work in progress?"],
    explanation: "False. Work in progress is adjusted in the manufacturing account; only finished goods are adjusted in the trading section.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item with the place where it is shown.",
    pairs: [["Wages of workers who make the goods", "Manufacturing account (prime cost)"], ["Depreciation of office equipment", "Statement of profit or loss (administration expenses)"], ["Closing work in progress", "Manufacturing account and current assets"], ["Delivery costs to customers", "Statement of profit or loss (distribution expenses)"]],
    explanation: "Factory costs go to the manufacturing account; selling and administration costs to the statement of profit or loss.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements about final accounts of a manufacturer.",
    template: "The {{blank:a}} account is prepared first. Its result, the cost of production, is used in the {{blank:b}} section of the statement of profit or loss. The statement of financial position shows {{blank:c}} types of inventory.",
    blanks: [
      { id: "a", accepted: ["manufacturing"], choices: ["manufacturing", "appropriation", "cash flow"] },
      { id: "b", accepted: ["trading"], choices: ["trading", "equity", "financing"] },
      { id: "c", accepted: ["three"], choices: ["three", "one", "two"] },
    ],
    explanation: "Manufacturing account first; trading section next; three inventories.",
  });

  // --- Numerical / calculations
  const n1 = { prime: 94200, foh: 27800, wo: 4100, wc: 5300, fo: 15000, fc: 13400 };
  const n1cop = chk(n1.prime + n1.foh + n1.wo - n1.wc, 120800);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n1.fo + n1cop - n1.fc, 122400), wrong: [n1cop, n1.fo + n1cop + n1.fc],
    stem: `Prime cost ${money(n1.prime)}; factory overheads ${money(n1.foh)}; work in progress opening ${money(n1.wo)} and closing ${money(n1.wc)}; finished goods opening ${money(n1.fo)} and closing ${money(n1.fc)}. Calculate the cost of sales.`,
    hints: ["Cost of production first, then adjust finished goods."],
    explanation: "Cost of production 94,200 + 27,800 + 4,100 − 5,300 = 120,800. Cost of sales 15,000 + 120,800 − 13,400 = 122,400.",
  });
  const n2 = { cost: 64000, rate: 0.1 };
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", daily: true, calculator: true,
    value: chk(n2.cost * n2.rate, 6400), wrong: [n2.cost * 0.2, n2.cost],
    stem: "Factory machinery cost US\\$64,000 and is depreciated at 10% per annum on cost. Calculate the amount charged in the manufacturing account.",
    explanation: "64,000 × 10% = 6,400, a factory overhead.",
  });
  const n3 = { rm: 6200, wip: 3800, fg: 9100, rec: 11500, bank: 4200, pre: 700 };
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n3.rm + n3.wip + n3.fg + n3.rec + n3.bank + n3.pre, 35500), wrong: [n3.rm + n3.fg + n3.rec + n3.bank + n3.pre, n3.rm + n3.wip + n3.fg],
    stem: `A manufacturer's closing inventories are raw materials ${money(n3.rm)}, work in progress ${money(n3.wip)} and finished goods ${money(n3.fg)}. Trade receivables are ${money(n3.rec)}, a prepayment ${money(n3.pre)} and bank ${money(n3.bank)}. Calculate the total current assets.`,
    hints: ["Include all three inventories."],
    explanation: "6,200 + 3,800 + 9,100 + 11,500 + 700 + 4,200 = 35,500.",
  });
  const n4 = { pbt: 72500, rate: 0.25 };
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n4.pbt * (1 - n4.rate), 54375), wrong: [n4.pbt * n4.rate, n4.pbt],
    stem: "A manufacturing company has a profit before tax of US\\$72,500. Income tax is charged at 25% (an assumption given for this question). Calculate the profit for the year.",
    hints: ["Deduct the tax."],
    explanation: "Tax 18,125. Profit for the year 72,500 − 18,125 = 54,375.",
  });

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the inventory of goods that have been started but not completed at the year end.",
    accepted: ["work in progress", "work-in-progress", "wip"],
    explanation: "Goods partly made at the year end are work in progress.",
  });

  // --- Self-marked short answers
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why office equipment depreciation is not included in the manufacturing account.",
    points: ["The manufacturing account shows only the cost of making the goods", "Office equipment is not used in production", "Its depreciation is an administration expense in the statement of profit or loss"],
    modelAnswer: "The manufacturing account shows only the cost of making the goods. Office equipment is not used in production, so its depreciation is an administration expense in the statement of profit or loss.",
    hints: ["Does it help to make the goods?"],
    explanation: "One mark each for purpose, use and the correct place.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a manufacturer shows raw materials, work in progress and finished goods separately in the statement of financial position.",
    points: ["Each is at a different stage of production and has a different value or risk", "The separate figures help the owner to control the level of inventory at each stage", "The user can judge liquidity, since finished goods are closer to being sold"],
    modelAnswer: "Each is at a different stage with a different value and risk. Separate figures help the owner control inventory at each stage and help users judge liquidity because finished goods are closer to sale.",
    hints: ["What does each stage tell the reader?"],
    explanation: "One mark each for stage, control and liquidity.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "The closing work in progress of a manufacturer rose sharply this year. Evaluate what this might mean.",
    points: ["It may show growing orders, with more work started at the year end", "It may show delays or bottlenecks in production, which tie up cash", "Compare with sales and finished goods before drawing a conclusion", "Conclusion: neither good nor bad on its own; investigate the cause"],
    modelAnswer: "More work in progress may mean more orders have been started, or it may reflect delays and bottlenecks that tie up cash. The owner should compare it with sales and finished goods and find the cause before deciding.",
    hints: ["Think of two possible explanations."],
    explanation: "A balanced answer gives both interpretations and a conclusion.",
  });

  // --- Practice structured 1 (12 marks): sole trader
  const s1m = mfg({
    rmOpen: 6000, rmPurch: 39000, rmClose: 7500, labour: 24000,
    overheads: [["Factory expenses", 9500], ["Depreciation of machinery", 4500]],
    wipOpen: 2100, wipClose: 2700,
  }, { title: "Farai Joinery: manufacturing account for the year ended 31 December 2025" });
  const s1 = { fo: 11000, fc: 9500, sales: 128000, adm: 17300, sell: 8200, dep: 1800 };
  const s1cos = chk(s1.fo + s1m.cop - s1.fc, 76400);
  const s1gp = chk(s1.sales - s1cos, 51600);
  const s1np = chk(s1gp - s1.adm - s1.sell - s1.dep, 24300);
  chk(s1m.prime, 61500); chk(s1m.cop, 74900);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Farai Joinery makes doors. For the year ended 31 December 2025: raw materials opening inventory ${money(6000)}, purchases ${money(39000)}, closing inventory ${money(7500)}; manufacturing wages ${money(24000)}; factory expenses ${money(9500)}; depreciation of machinery ${money(4500)}; work in progress opening ${money(2100)}, closing ${money(2700)}. Finished goods: opening ${money(s1.fo)}, closing ${money(s1.fc)}. Goods are transferred at cost. Sales ${money(s1.sales)}; administration expenses ${money(s1.adm)}; selling expenses ${money(s1.sell)}; depreciation of office equipment ${money(s1.dep)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: s1m.prime, wrong: [s1m.rmUsed], stem: "Calculate the prime cost.", explanation: "Raw materials consumed 37,500; prime cost 37,500 + 24,000 = 61,500." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: s1m.cop, wrong: [s1m.factoryCost], stem: "Calculate the cost of production.", explanation: "61,500 + 14,000 = 75,500; + 2,100 − 2,700 = 74,900." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: s1gp, wrong: [s1.sales - s1m.cop], stem: "Calculate the gross profit.", explanation: "Cost of sales 11,000 + 74,900 − 9,500 = 76,400; gross profit 128,000 − 76,400 = 51,600." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: s1np, wrong: [s1gp - s1.adm - s1.sell], stem: "Calculate the profit for the year.", explanation: "Expenses 17,300 + 8,200 + 1,800 = 27,300; 51,600 − 27,300 = 24,300." }),
      P.manual({ label: "(e)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the manufacturing account for the year.", points: ["Cost of raw materials consumed 37,500 and prime cost 61,500", "Factory overheads 14,000 listed", "Opening and closing work in progress", "Cost of production 74,900 with heading"], modelAnswer: s1m.md, explanation: "The cost of production is transferred to the trading section." }),
    ],
    hints: ["Raw materials consumed = opening + purchases − closing.", "Depreciation of office equipment is not a factory cost."],
    explanation: "This item practises the manufacturing account and the profit of a sole trader.",
  });

  // --- Practice structured 2 (16 marks): company
  const s2 = { cop: 268400, rev: 455000, fo: 30000, fc: 38400, dist: 42000, adm: 61600, fin: 5000, taxRate: 0.25, prevGp: 44.0 };
  const s2cos = chk(s2.fo + s2.cop - s2.fc, 260000);
  const s2gp = chk(s2.rev - s2cos, 195000);
  const s2pbt = chk(s2gp - s2.dist - s2.adm - s2.fin, 86400);
  const s2tax = chk(s2pbt * s2.taxRate, 21600);
  const s2pfy = chk(s2pbt - s2tax, 64800);
  const s2gm = ratios.grossMargin(s2gp, s2.rev);
  const s2pl = statement("Bulawayo Furniture Ltd: statement of profit or loss for the year ended 31 December 2025", [
    ["Revenue", null, s2.rev], ["Opening inventory of finished goods", s2.fo, null], ["Cost of production", s2.cop, null], ["Less closing inventory of finished goods", -s2.fc, null], ["Cost of sales", null, -s2cos],
    ["**Gross profit**", null, s2gp], ["Distribution costs", null, -s2.dist], ["Administrative expenses", null, -s2.adm], ["Finance costs", null, -s2.fin], ["**Profit before tax**", null, s2pbt], ["Income tax", null, -s2tax], ["**Profit for the year**", null, s2pfy],
  ], { cols: [U, U], checks: [["pbt", s2pbt, s2gp - s2.dist - s2.adm - s2.fin], ["pfy", s2pfy, s2pbt - s2tax]] });
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Bulawayo Furniture Ltd had a cost of production of ${money(s2.cop)} for the year ended 31 December 2025. Revenue ${money(s2.rev)}. Finished goods: opening ${money(s2.fo)}, closing ${money(s2.fc)}. Distribution costs ${money(s2.dist)}, administrative expenses ${money(s2.adm)}, finance costs ${money(s2.fin)}. Income tax is 25% of profit before tax (an assumption for this question). Last year's gross profit margin was 44.0%.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: s2cos, wrong: [s2.cop, s2.fo + s2.cop + s2.fc], stem: "Calculate the cost of sales.", explanation: "30,000 + 268,400 − 38,400 = 260,000." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: s2gp, wrong: [s2.rev - s2.cop], stem: "Calculate the gross profit.", explanation: "455,000 − 260,000 = 195,000." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: s2pbt, wrong: [s2gp - s2.dist - s2.adm], stem: "Calculate the profit before tax.", explanation: "195,000 − 42,000 − 61,600 − 5,000 = 86,400." }),
      P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of profit or loss for the year.", points: ["Cost of sales built from opening finished goods, cost of production and closing finished goods", "Gross profit 195,000", "Distribution costs, administrative expenses and finance costs deducted", "Profit before tax 86,400 and income tax 21,600", "Profit for the year 64,800"], modelAnswer: s2pl, explanation: "Each sub-total follows from the one before it." }),
      P.num({ label: "(e)", marks: 2, kind: "pct", dp: 1, value: s2gm, wrong: [ratios.markUp(s2gp, s2cos), ratios.profitMargin(s2pfy, s2.rev)], stem: "Calculate the gross profit margin, to one decimal place.", explanation: "195,000 ÷ 455,000 × 100 = 42.86%, which is 42.9%." }),
      P.manual({ label: "(f)", marks: 3, stem: "Comment on the gross profit margin compared with last year's 44.0%, and suggest one reason from the manufacturing side.", points: ["The margin has fallen from 44.0% to 42.9%", "A possible reason is a rise in the cost of production (materials, wages or factory overheads) relative to revenue", "The company should compare each element of cost of production with last year to find the cause"], modelAnswer: "The margin fell from 44.0% to 42.9%. A rise in the cost of materials, wages or factory overheads relative to revenue may be the cause, so each element of the cost of production should be compared with last year.", explanation: "One mark each for the change, a reason and a next step." }),
    ],
    hints: ["Use cost of production in place of purchases.", "Margin = gross profit ÷ revenue."],
    explanation: "This item practises the statement of profit or loss of a manufacturing company and a margin comparison.",
  });

  // --- Flashcards
  b.card("FORMULA", "Cost of sales (manufacturer)", "Opening finished goods + cost of production − closing finished goods.");
  b.card("FACT", "Three inventories", "Raw materials, work in progress and finished goods: each shown separately in current assets.");
  b.card("FACT", "Where raw materials and WIP are adjusted", "In the manufacturing account; finished goods are adjusted in the trading section.");
  b.card("FACT", "Depreciation", "Machinery depreciation is a factory overhead; office equipment depreciation is an administration expense.");
  b.card("FACT", "Accrued factory expense", "Added to the factory overhead and shown as a current liability.");
  b.card("CONCEPT", "Order of preparation", "Adjustments, manufacturing account, statement of profit or loss, statement of financial position.");
  b.card("CONCEPT", "Company differences", "Distribution costs, administrative expenses, finance costs, income tax, equity with share capital and reserves.");
  b.card("FORMULA", "Net assets (sole trader)", "Capital at the start + profit for the year − drawings = capital at the end.");
  b.card("CONCEPT", "Balance check", "Total assets must equal capital (or equity) plus liabilities.");
});
