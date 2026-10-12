// W2a: statements.sole-trader
import { concept, P, table, check, sum, r2, fmt, money, chk, ratios } from "../lib.mjs";
import { mc } from "../tables/w2a-lib.mjs";
import { tradingModel, adjustmentNotes } from "../tables/w2a-models.mjs";

concept("aacc.statements.sole-trader", { file: "statements/sole-trader", keyPrefix: "statements.sole-trader" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL", daily: false,
    stem: "In the statement of profit or loss of a trading business, carriage inwards is part of:",
    ok: ["cost of sales", "Correct: it is a cost of getting the goods ready for sale."],
    bad: [["distribution costs", "That heading is for carriage outwards and other costs of delivering to customers."], ["administrative expenses", "Carriage inwards is a cost of purchasing, so it is not an overhead."], ["other income", "It is a cost, not income."]],
    explanation: "Carriage inwards increases the cost of the goods purchased, so it goes in the cost of sales calculation.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which item is deducted from sales to arrive at revenue?",
    ok: ["Returns inwards", "Correct: goods returned by customers reduce sales."],
    bad: [["Returns outwards", "Returns outwards reduce purchases, not sales."], ["Discount allowed", "Discount allowed is an expense."], ["Carriage outwards", "Carriage outwards is a distribution cost."]],
    explanation: "Only returns inwards are deducted from sales; discounts and carriage are shown separately.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "How does the statement of profit or loss of a service business differ from that of a trading business?",
    ok: ["It has no cost of sales or gross profit", "Correct: no goods are bought for resale."],
    bad: [["It has no expenses", "A service business has many expenses, such as wages and rent."], ["It does not show profit for the year", "Every business shows its profit for the year."], ["It shows drawings as an expense", "Drawings are never an expense."]],
    explanation: "A service business starts with revenue (fees) and deducts expenses; there is no cost of sales.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which item would be shown as a distribution cost?",
    ok: ["Carriage outwards", "Correct: it is the cost of delivering goods to customers."],
    bad: [["Carriage inwards", "Carriage inwards is part of cost of sales."], ["Rent of the office", "Office rent is an administrative expense."], ["Interest on a bank loan", "Loan interest is a finance cost."]],
    explanation: "Distribution costs are the costs of selling and delivering goods to customers.",
  });
  const o1 = 6200;
  const p1 = 41300;
  const c1 = 750;
  const r1 = 900;
  const k1 = 7100;
  const cos1 = r2(o1 + p1 + c1 - r1 - k1);
  chk(cos1, 40250);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Opening inventory was ${money(o1)}, purchases ${money(p1)}, carriage inwards ${money(c1)}, returns outwards ${money(r1)} and closing inventory ${money(k1)}. What is the cost of sales?`,
    ok: [money(cos1), "Correct: 6,200 + 41,300 + 750 - 900 - 7,100."],
    bad: [[money(r2(cos1 - c1)), "Carriage inwards has been left out."], [money(r2(o1 + p1 + c1 + r1 - k1)), "Returns outwards have been added instead of deducted."], [money(r2(o1 + p1 + c1 - r1 + k1)), "Closing inventory has been added instead of deducted."]],
    hints: ["Closing inventory is deducted, returns outwards are deducted."],
    explanation: "Cost of sales = 6,200 + 41,300 + 750 - 900 - 7,100 = 40,250.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Closing capital of a sole trader is calculated as:",
    ok: ["opening capital + profit for the year - drawings", "Correct: profit increases capital and drawings reduce it."],
    bad: [["opening capital + drawings - profit for the year", "Drawings reduce capital and profit increases it."], ["opening capital - profit for the year + drawings", "The signs are reversed."], ["opening capital + profit for the year + drawings", "Drawings are withdrawn from the business, not added."]],
    hints: ["What does the owner add and what does the owner take out?"],
    explanation: "Capital grows by profit retained and shrinks by what the owner withdraws.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Closing inventory of US\\$8,400 was omitted from both statements. What is the effect?",
    ok: ["Gross profit, profit and total assets are all understated", "Correct: cost of sales is too high by 8,400 and current assets lack the inventory."],
    bad: [["Gross profit is overstated and total assets are overstated", "Without the deduction cost of sales is too high, so gross profit is understated."], ["Gross profit is understated but total assets are correct", "Inventory is a current asset, so total assets are also understated."], ["Profit is correct but current assets are understated", "Profit is understated as well because cost of sales is overstated."]],
    hints: ["Closing inventory is deducted from cost of sales."],
    explanation: "Omitting closing inventory overstates cost of sales and understates gross profit, profit, current assets and capital by the same amount.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "In a year a sole trader's profit was US\\$14,000 and drawings were US\\$17,500. Which statement is the best conclusion?",
    ok: ["Capital has fallen by US\\$3,500, so the owner is taking out more than the business earned", "Correct: closing capital = opening + 14,000 - 17,500."],
    bad: [["Capital has risen by US\\$3,500 because drawings are an income", "Drawings reduce capital; they are not income."], ["Profit must have been misstated because drawings cannot exceed profit", "Drawings may exceed profit; it simply reduces capital."], ["Capital is unchanged because drawings are not an expense", "Drawings are not an expense but they still reduce capital."]],
    hints: ["Apply the capital formula."],
    explanation: "Capital falls by 3,500 (14,000 - 17,500). Continued withdrawals above profit weaken the business.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A service business has a gross profit figure in its statement of profit or loss.", answer: false, explanation: "False. A service business has no cost of sales, so it has no gross profit; fees are revenue and costs are expenses." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "Goods taken by the owner for personal use increase the drawings used to calculate closing capital.", answer: true, hints: ["The owner has taken value out of the business."], explanation: "True. They are recorded as drawings at cost, so closing capital is reduced by them." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item to the heading under which it appears in the statement of profit or loss.",
    pairs: ["Carriage outwards", "Loan interest", "Commission received", "Office wages"],
    right: ["Distribution costs", "Finance costs", "Other income", "Administrative expenses"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Costs of delivery are distribution costs, interest is a finance cost, commission earned is other income and wages of office staff are administrative.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the formula for non-current assets.",
    template: "Carrying amount = cost {{blank:a}} accumulated depreciation, shown within {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["minus"], choices: ["plus", "minus"] },
      { id: "b", accepted: ["non-current assets"], choices: ["non-current assets", "current assets", "capital"] },
    ],
    explanation: "Carrying amount is cost less accumulated depreciation and appears under non-current assets.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the heading under which interest on a bank loan is shown in the statement of profit or loss.",
    accepted: ["finance costs", "finance cost", "interest payable", "financing costs"],
    explanation: "Interest on borrowings is a finance cost.",
  });

  // numerical
  const revN = r2(92400 - 1800);
  const cosN = 61350;
  const gpN = r2(revN - cosN);
  chk(gpN, 29250);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: gpN, daily: true, calculator: true, wrong: [r2(92400 - cosN), r2(92400 - 1800 + cosN)],
    stem: `A trader's sales were ${money(92400)} and returns inwards ${money(1800)}. Cost of sales was ${money(cosN)}. Calculate the gross profit.`,
    explanation: "Revenue = 92,400 - 1,800 = 90,600; gross profit = 90,600 - 61,350 = 29,250. Ignoring the returns gives 31,050.",
  });
  const gp2 = 38500;
  const prof2 = r2(gp2 + 640 - 24900 - 3200);
  chk(prof2, 11040);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: prof2, calculator: true, wrong: [r2(gp2 - 640 - 24900 - 3200), r2(gp2 + 640 - 24900)],
    stem: `A business has gross profit of ${money(gp2)}, discount received of ${money(640)}, expenses of ${money(24900)} before depreciation and depreciation of ${money(3200)}. Calculate the profit for the year.`,
    hints: ["Discount received is other income."],
    explanation: "38,500 + 640 - 24,900 - 3,200 = 11,040. Deducting the discount gives 9,760 and omitting depreciation gives 14,240.",
  });
  const ta = 61400;
  const tl = 18950;
  const clo = r2(ta - tl);
  const op = 36000;
  const dr = 9420;
  const pr = r2(clo - op + dr);
  chk(clo, 42450);
  chk(pr, 15870);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: pr, calculator: true, wrong: [r2(clo - op), r2(clo - op - dr)],
    stem: `At 31 December 2025 a sole trader's total assets were ${money(ta)} and total liabilities ${money(tl)}. Capital at 1 January 2025 was ${money(op)} and drawings during the year were ${money(dr)}. Calculate the profit for the year.`,
    hints: ["Closing capital = assets - liabilities.", "Rearrange: profit = closing capital - opening capital + drawings."],
    explanation: "Closing capital 61,400 - 18,950 = 42,450. Profit = 42,450 - 36,000 + 9,420 = 15,870. Forgetting drawings gives 6,450.",
  });
  const pm = ratios.profitMargin(15870, 88000);
  chk(pm, 18.0341, 0.001);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: pm, calculator: true, wrong: [r2(ratios.grossMargin(15870, 88000 - 15870)), r2((15870 / 42450) * 100)],
    stem: `A business had revenue of ${money(88000)} and profit for the year of ${money(15870)}. Calculate the profit margin (profit for the year ÷ revenue × 100) as a percentage to one decimal place.`,
    hints: ["Use revenue, not cost of sales, as the base."],
    explanation: "15,870 ÷ 88,000 × 100 = 18.0%.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the statement of profit or loss of a driving school has no cost of sales.",
    points: ["A service business does not buy goods for resale", "Its costs, such as wages, fuel and rent, are expenses of providing the service"],
    modelAnswer: "A driving school sells lessons, not goods, so there is no purchase of inventory to resell. Its costs are expenses of running the business and are deducted from fee revenue.",
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Distinguish between revenue and other income, giving one example of each.",
    points: ["Revenue arises from the main activity of the business (e.g. sales of goods or fees)", "Other income arises from secondary activities (e.g. commission or discount received)", "Both increase profit, but only revenue is used to calculate the gross profit and the profit margin"],
    modelAnswer: "Revenue is income from the main trade, such as sales of goods. Other income arises from secondary items, such as commission received or discount received. Revenue is the base for gross profit and the margins; other income is added after gross profit.",
    hints: ["Which items are added after gross profit?"],
    explanation: "Marks for the definitions with examples and for the use of revenue.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Chipo's profit was US\\$9,800 but she took drawings of US\\$14,300. Evaluate the effect on the business and advise her.",
    points: ["Capital falls by US\\$4,500 (9,800 - 14,300), so the owner is taking out more than the business earned", "The business may have to sell assets or borrow to pay the drawings and may be unable to replace equipment", "Drawings may be justified in the short term for personal needs or if earlier profits were retained", "Advice: reduce drawings to below profit or raise profit, and keep cash for creditors"],
    modelAnswer: "Capital falls by US\\$4,500, so Chipo is drawing on the business's past profits. This weakens liquidity and may force borrowing or the sale of assets. It may be acceptable for a short time, but she should reduce drawings to below profit or improve profit.",
    hints: ["Apply the capital formula, then think about cash."],
    explanation: "One mark each for the figure, the consequence, the balancing point and the advice.",
  });

  // Structured 1 (10 marks)
  const dA = {
    biz: "Dube Hardware", nca: [{ label: "Equipment", cost: 18400, accDep: 4600, rate: 10 }],
    sales: 96540, returnsIn: 1370, openInv: 7860, purchases: 58230, carriageIn: 655, returnsOut: 915, closingInv: 9240,
    income: [{ label: "Discount received", tb: 415 }],
    expenses: [{ label: "Wages", tb: 12640, acc: 715 }, { label: "Rent", tb: 4230 }, { label: "Electricity", tb: 1935, acc: 145 }, { label: "Carriage outwards", tb: 985 }],
    recv: 8360, writeOff: 315, allowPct: 4, allowOpen: 255, bank: 3675, payables: 6435, drawings: 8215,
  };
  const mA = tradingModel(dA);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Farai Dube owns a hardware shop in Gweru. His trial balance at 31 December 2025 and the year-end adjustments are below. The statements are for internal use.\n\n${mA.tb.md}\n\n${adjustmentNotes(dA)}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: mA.revenue, wrong: [dA.sales], stem: "Calculate the revenue.", explanation: `Sales ${fmt(dA.sales)} - returns inwards ${fmt(dA.returnsIn)} = ${fmt(mA.revenue)}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: mA.cos, wrong: [r2(mA.cos - dA.carriageIn), r2(dA.openInv + dA.purchases - dA.returnsOut - dA.closingInv)], stem: "Calculate the cost of sales.", explanation: `Opening inventory ${fmt(dA.openInv)} + purchases ${fmt(dA.purchases)} + carriage inwards ${fmt(dA.carriageIn)} - returns outwards ${fmt(dA.returnsOut)} - closing inventory ${fmt(dA.closingInv)} = ${fmt(mA.cos)}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: mA.profit, wrong: [r2(mA.profit + mA.irrExp), r2(mA.gp)], stem: "Calculate the profit for the year.", explanation: `Gross profit ${fmt(mA.gp)} + discount received ${fmt(415)} - expenses ${fmt(mA.expensesTotal)} = ${fmt(mA.profit)}. Expenses: wages ${fmt(mA.exps[0].amt)}, rent ${fmt(mA.exps[1].amt)}, electricity ${fmt(mA.exps[2].amt)}, carriage outwards ${fmt(mA.exps[3].amt)}, depreciation ${fmt(mA.depTotal)}, irrecoverable debts ${fmt(mA.irrExp)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: mA.capClose, wrong: [r2(mA.capOpen + mA.profit)], stem: "Calculate the closing capital.", explanation: `Opening capital ${fmt(mA.capOpen)} + profit ${fmt(mA.profit)} - drawings ${fmt(dA.drawings)} = ${fmt(mA.capClose)}.` }),
    ],
    hints: ["Do not forget carriage inwards in cost of sales.", "The allowance is calculated after the write-off."],
    explanation: "This item tests revenue, cost of sales, profit and closing capital from a trial balance.",
  });
  chk(mA.expensesTotal, r2(mA.exps.reduce((x, y) => x + y.amt, 0) + mA.depTotal + mA.irrExp), 0.001, "expA");

  // Structured 2 (16 marks)
  const dB = {
    biz: "Mutare Bakery Supplies", grouped: true,
    nca: [{ label: "Delivery van", cost: 31500, accDep: 12600, rate: 25, group: "dist" }, { label: "Equipment", cost: 12400, accDep: 3720, rate: 10 }],
    sales: 214380, returnsIn: 3120, openInv: 15640, purchases: 142350, carriageIn: 1215, returnsOut: 2140, closingInv: 17960, ownUse: 385,
    income: [{ label: "Rent received", tb: 2430, acc: 585 }],
    expenses: [{ label: "Wages", tb: 26830, acc: 1315 }, { label: "Rent", tb: 7850 }, { label: "Delivery costs", tb: 4325, group: "dist" }, { label: "Insurance", tb: 2640, pre: 515 }, { label: "Loan interest", tb: 1215, acc: 290, group: "fin" }, { label: "General expenses", tb: 5365 }, { label: "Discount allowed", tb: 1655 }],
    recv: 21430, writeOff: 925, allowPct: 5, allowOpen: 815, bank: 6345, cash: 460, payables: 12740, loan: 15500, drawings: 11050,
  };
  const mB = tradingModel(dB);
  const vanDep = mB.nca[0].charge;
  const distTotal = r2(4325 + vanDep);
  const drawB = r2(dB.drawings + dB.ownUse);
  const hasBalancingModel = mB.spl.md.length > 0;
  void hasBalancingModel;
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Rudo Chikwanha trades as Mutare Bakery Supplies. Her trial balance at 31 December 2025 and the year-end adjustments follow. Use the IAS 1 headings (distribution costs, administrative expenses, finance costs). The statements are for internal use.\n\n${mB.tb.md}\n\n${adjustmentNotes(dB)}`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: mB.cos, wrong: [r2(mB.cos + dB.ownUse), r2(mB.cos - dB.carriageIn)], stem: "Calculate the cost of sales (remember the goods taken by the owner).", explanation: `Purchases ${fmt(dB.purchases)} - ${fmt(dB.ownUse)} = ${fmt(dB.purchases - dB.ownUse)}; cost of sales = ${fmt(dB.openInv)} + ${fmt(dB.purchases - dB.ownUse)} + ${fmt(dB.carriageIn)} - ${fmt(dB.returnsOut)} - ${fmt(dB.closingInv)} = ${fmt(mB.cos)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: distTotal, wrong: [4325], stem: "Calculate the total distribution costs (delivery costs and depreciation of the delivery van).", explanation: `Delivery costs 4,325 + depreciation 25% × ${fmt(31500)} = ${fmt(vanDep)}; total ${fmt(distTotal)}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: mB.profit, wrong: [r2(mB.profit - dB.ownUse), r2(mB.profit - mB.irrExp)], stem: "Calculate the profit for the year.", explanation: `Revenue ${fmt(mB.revenue)} - cost of sales ${fmt(mB.cos)} = gross profit ${fmt(mB.gp)}; add rent received ${fmt(3015)}; deduct expenses ${fmt(mB.expensesTotal)}; profit ${fmt(mB.profit)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: mB.assets, wrong: [r2(mB.assets - 515)], stem: "Calculate total assets at 31 December 2025.", explanation: `Non-current assets ${fmt(mB.ncaTotal)} + current assets ${fmt(mB.caTotal)} = ${fmt(mB.assets)}.` }),
      P.manual({ label: "(e)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of profit or loss for the year ended 31 December 2025.", points: [`Heading, revenue ${fmt(mB.revenue)} and cost of sales ${fmt(mB.cos)} giving gross profit ${fmt(mB.gp)}`, "Other income, then distribution costs, administrative expenses and finance costs with correct items under each heading", `Profit for the year ${fmt(mB.profit)}`], modelAnswer: mB.spl.md, explanation: "Award marks for each section; allow follow-through." }),
      P.manual({ label: "(f)", marks: 2, stem: `Rudo drew US\\$${fmt(dB.drawings)} plus goods of US\\$${fmt(dB.ownUse)}. Comment on whether the business can sustain these drawings.`, points: [`Profit for the year was ${fmt(mB.profit)} and total drawings ${fmt(drawB)}, so capital rises by ${fmt(r2(mB.profit - drawB))}`, "The business must still meet loan interest and replace the van and equipment, so drawings should not rise further without a reserve of cash"], modelAnswer: `Profit of US\\$${fmt(mB.profit)} exceeds total drawings of US\\$${fmt(drawB)}, so capital grows. But cash is only US\\$${fmt(dB.bank + dB.cash)} and a loan must be serviced, so she should not increase drawings.`, explanation: "One mark for the comparison with figures, one for a reasoned conclusion." }),
    ],
    hints: ["Reduce purchases by the goods taken before cost of sales.", "Depreciate the van at 25% and put it under distribution costs."],
    explanation: "This item tests cost of sales, grouped expenses, profit, total assets and the preparation of the statement.",
  });
  chk(mB.assets, r2(mB.capClose + dB.loan + mB.clTotal), 0.001, "assets B");

  b.card("DEFINITION", "What is **revenue**?", "Income from the main activity of the business: sales (or fees) less returns inwards.");
  b.card("FORMULA", "Cost of sales", "Opening inventory + purchases + carriage inwards - returns outwards - closing inventory.");
  b.card("FORMULA", "Closing capital of a sole trader", "Opening capital + profit for the year - drawings (including goods taken for own use).");
  b.card("FACT", "Carriage inwards or outwards?", "Carriage inwards is in cost of sales; carriage outwards is a distribution cost.");
  b.card("FACT", "Service business statements", "No cost of sales, no gross profit and no inventory: fees (revenue) less expenses give profit for the year.");
  b.card("FACT", "IAS 1 expense headings", "Distribution costs, administrative expenses and finance costs.");
  b.card("DEFINITION", "What is **carrying amount**?", "Cost of a non-current asset less accumulated depreciation (ZIMSEC: net book value).");
  b.card("CONCEPT", "Check that a statement of financial position balances", "Total assets = closing capital + non-current liabilities + current liabilities.");
  b.card("FACT", "Where does discount received appear?", "As other income (added after gross profit). Discount allowed is an administrative expense.");
});
