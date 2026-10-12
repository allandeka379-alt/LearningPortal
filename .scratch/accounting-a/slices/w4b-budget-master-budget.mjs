// W4b: budget.master-budget
import { concept, P, table, chk, r2, ratios } from "../lib.mjs";
import { mc, F, usd } from "../tables/w4b-lib.mjs";
import { masterBudget } from "../tables/w4b-master.mjs";

concept("aacc.budget.master-budget", { file: "budget/master-budget", keyPrefix: "budget.master-budget" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What does the master budget contain?",
    ok: ["A budgeted statement of profit or loss and of financial position", "Correct: it brings the other budgets together."],
    bad: [["Only the sales and production budgets for the period ahead", "These are two of the budgets it summarises."], ["Only a list of the variances for the year, with their causes and actions", "Variances come after the period, from actual results."], ["The owner's personal budget", "The master budget is for the business."]],
    explanation: "The master budget summarises the operating and cash budgets as budgeted final statements.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is the closing retained earnings figure in a budgeted statement of financial position found?",
    ok: ["Opening retained earnings + budgeted profit - dividends", "Correct: profit adds and dividends reduce retained earnings."],
    bad: [["Opening retained earnings + dividends - budgeted profit for the period", "The signs of profit and dividends are reversed."], ["Opening retained earnings + sales", "Sales are revenue, not profit."], ["Budgeted profit only", "The opening balance must be included."]],
    explanation: "Closing retained earnings = opening + profit for the period - dividends.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Where does the closing cash figure in a budgeted statement of financial position come from?",
    ok: ["The cash budget", "Correct: closing bank balance of the cash budget."],
    bad: [["The budgeted profit for the period", "Profit is not cash."], ["The sales budget", "Sales include credit sales not yet collected."], ["The opening cash balance only", "It must be updated for the receipts and payments."]],
    explanation: "The cash budget gives the closing bank balance.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A budgeted statement of financial position does not balance. What should the preparer do?",
    ok: ["Look for an omitted or wrongly treated transaction", "Correct: an imbalance signals an error."],
    bad: [["Insert the difference as an extra asset called suspense", "A forced figure hides the error."], ["Reduce the budgeted profit until it balances", "Profit is calculated, not adjusted to balance."], ["Ignore it, because budgets only approximate", "The statement must balance whatever the estimates."]],
    hints: ["Think about what an imbalance means."],
    explanation: "A statement built from consistent budgets balances; if not, a transaction has been missed.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Which item reduces the carrying amount of non-current assets in the budgeted statement of financial position but does NOT reduce the cash balance?",
    ok: ["The depreciation charge for the period", "Correct: depreciation is a non-cash expense."],
    bad: [["The purchase of new equipment for cash", "This increases non-current assets and reduces cash."], ["Repayment of a bank loan", "This reduces cash and liabilities, not assets' carrying amount."], ["Payment of a dividend", "This reduces cash and retained earnings."]],
    hints: ["Which entry involves no payment?"],
    explanation: "Depreciation reduces profit and the carrying amount but no cash leaves the business.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A budgeted statement of profit or loss shows a large profit, but the budgeted bank balance is an overdraft. Which is the most likely cause?",
    ok: ["Heavy investment in receivables, inventory or equipment during the period", "Correct: cash is tied up in other assets."],
    bad: [["The profit is stated incorrectly because budgeted profit must always equal the cash balance", "Profit does not equal cash."], ["Depreciation has been paid in cash", "Depreciation is not a cash payment."], ["Retained earnings are too high", "Retained earnings do not directly produce an overdraft."]],
    hints: ["Profit and cash are not the same."],
    explanation: "Cash can be low when profits are invested in receivables, inventory or new assets or paid out as dividends.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A master budget shows profit above target but an overdraft in the third month. Which is the best advice to the owner?",
    ok: ["Arrange finance or delay dividends or purchases to cover the overdraft", "Correct: a plan that runs out of cash must be adjusted."],
    bad: [["Accept the plan, because profit is above target", "Profit alone does not pay the bills."], ["Cancel all sales to protect cash", "This removes the profit as well."], ["Ignore the cash budget, because it is only a forecast and may be wrong", "A forecast is made to anticipate and prevent problems."]],
    hints: ["Plan to fix the problem in advance."],
    explanation: "A budget is a planning tool: use it to arrange funds or change the plan before the problem arises.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In a budgeted statement of financial position, total assets must equal total equity and liabilities.", answer: true, explanation: "True. If they differ, the budgets are inconsistent." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "The closing balance of trade payables in the master budget is taken from the trade payables budget.", answer: true, hints: ["Which budget shows what is owed at the end of the period?"], explanation: "True. The payables budget gives the amount unpaid at the end of the period." });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item in the budgeted statement of financial position to its source.",
    pairs: ["Closing bank balance", "Closing trade receivables", "Closing retained earnings", "Closing carrying amount of equipment"],
    right: ["The cash budget", "The trade receivables budget", "Opening retained earnings + profit - dividends", "Opening cost + purchases - accumulated depreciation"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Each balance is updated from the relevant budget or calculation.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "Depreciation reduces {{blank:a}} and non-current assets but does not affect {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["profit"], choices: ["profit", "sales", "cash"] }, { id: "b", accepted: ["cash"], choices: ["cash", "profit", "capital"] }],
    explanation: "Depreciation is an expense but not a cash payment.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Name the budget that provides the closing bank balance for the master budget.", accepted: ["cash budget", "the cash budget"], explanation: "It is the cash budget." });

  {
    const o = 14200, p = 6800, dv = 2500;
    const c = o + p - dv;
    chk(c, 18500);
    b.num({ d: 2, skill: "APPLICATION", kind: "money", value: c, calculator: true, wrong: [o + p, o - p + dv],
      stem: `A company's retained earnings at the start of a quarter are ${usd(o)}. Budgeted profit for the quarter is ${usd(p)} and a dividend of ${usd(dv)} will be paid. Calculate the budgeted retained earnings at the end of the quarter.`,
      explanation: `${F(o)} + ${F(p)} - ${F(dv)} = ${usd(c)}. Forgetting the dividend gives ${usd(o + p)}.` });
  }
  {
    const cost = 40000, add = 7500, dep = 11000, chg = 3200;
    const nbv = cost + add - dep - chg;
    chk(nbv, 33300);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: nbv, calculator: true, wrong: [cost + add - chg, cost + add - dep],
      stem: `A workshop's non-current assets have a cost of ${usd(cost)} and accumulated depreciation of ${usd(dep)} at the start of the period. During the period equipment costing ${usd(add)} is bought and the depreciation charge is ${usd(chg)}. Calculate the carrying amount of non-current assets in the budgeted statement of financial position at the end of the period.`,
      hints: ["Cost + additions - accumulated depreciation (old + new)."],
      explanation: `Cost ${F(cost + add)} - accumulated depreciation ${F(dep + chg)} = ${usd(nbv)}. Leaving out the old accumulated depreciation gives ${usd(cost + add - chg)}.` });
  }
  {
    const o = 6400, s = 52000, c = 7900;
    const col = o + s - c;
    chk(col, 50500);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: col, calculator: true, wrong: [s, o + s + c],
      stem: `All sales are on credit. Trade receivables are ${usd(o)} at the start of the period and are budgeted to be ${usd(c)} at the end. Budgeted sales are ${usd(s)}. Calculate the cash to be received from customers.`,
      hints: ["Opening + sales - closing."],
      explanation: `${F(o)} + ${F(s)} - ${F(c)} = ${usd(col)}. Assuming all sales are collected gives ${usd(s)}.` });
  }
  {
    const pbit = 9200, ce = 46000;
    const r = ratios.roce(pbit, ce);
    chk(r, 20, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: r, calculator: true, wrong: [(pbit - 1000) / ce * 100, pbit / 52000 * 100],
      stem: `A budgeted statement of profit or loss shows profit from operations of ${usd(pbit)}. Capital employed (share capital, reserves and non-current liabilities) in the budgeted statement of financial position is ${usd(ce)}. Calculate the return on capital employed, to one decimal place.`,
      hints: ["Profit from operations ÷ capital employed."],
      explanation: `${F(pbit)} ÷ ${F(ce)} × 100 = ${r.toFixed(1)}%. Profit from operations is used because capital employed includes the loans.` });
  }
  {
    const tot = 71400, nca = 40100, inv = 6200, rec = 12300;
    const cash = tot - nca - inv - rec;
    chk(cash, 12800);
    b.calc({ d: 4, skill: "ANALYSIS", kind: "money", value: cash, calculator: true, wrong: [tot - nca, nca + inv + rec],
      stem: `A budgeted statement of financial position shows total equity and liabilities of ${usd(tot)}. The assets other than cash are non-current assets ${usd(nca)}, inventory ${usd(inv)} and trade receivables ${usd(rec)}. Assuming the statement balances, calculate the budgeted cash and bank balance.`,
      hints: ["Total assets = total equity and liabilities."],
      explanation: `Other assets = ${F(nca)} + ${F(inv)} + ${F(rec)} = ${F(nca + inv + rec)}. Cash = ${F(tot)} - ${F(nca + inv + rec)} = ${usd(cash)}.` });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a master budget helps a business to check that its separate budgets are consistent.",
    points: ["It combines the sales, production, purchases, labour, overhead and cash budgets in one set of statements", "The budgeted statement of financial position must balance, so a missing or inconsistent item is revealed", "Managers can then see the effect of the whole plan on profit and cash"],
    modelAnswer: "The master budget brings all the budgets into one statement of profit or loss and one statement of financial position. The statement of financial position must balance, so an inconsistency shows up and managers see the effect of the plan as a whole.",
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "A master budget shows a high profit but a low bank balance. Explain two possible reasons.",
    points: ["Cash is tied up in receivables because customers pay slowly", "Profit has been invested in inventory or new equipment", "A large dividend or loan repayment has been paid", "Developed: these items are not expenses in the statement of profit or loss but use cash"],
    modelAnswer: "Profit may be tied up in receivables or inventory, or spent on equipment, dividends or loan repayments. None of these reduces profit but all use cash.",
    hints: ["List things that use cash without being expenses."],
    explanation: "One mark for each reason and one for developing it.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Evaluate the usefulness of a master budget as a basis for deciding whether to approve a business plan.",
    points: ["It shows the profit, cash and financial position that would result from the plan", "It can be tested with 'what if' changes to sales or costs", "It depends on estimates, so errors in the assumptions make it unreliable", "Judgement: useful as a guide, but decision-makers should test the sensitivity and consider non-financial factors"],
    modelAnswer: "The master budget shows the expected profit, cash and financial position and can be tested for changes. It relies on estimates, so it should be used with sensitivity tests and non-financial factors rather than alone.",
    hints: ["Strengths, then limitations, then a judgement."],
    explanation: "One mark for each point.",
  });

  // Struct 1 (14 marks)
  {
    const m = masterBudget({
      units: 3200, price: 20, openFGUnits: 150, closeFGUnits: 250, matUnit: 8, labUnit: 3, vohUnit: 1,
      fixedOverhead: 9600, depreciation: 2400, admin: 7200, interest: 400, dividend: 3500, equipment: 4800,
      openRec: 12000, closeRec: 14000, openPay: 7000, closePay: 8500, openBank: 3200,
      ncaCost: 48000, ncaDep: 12000, shareCapital: 28000, openRE: 12500, loan: 5500,
    });
    chk(m.sales, 64000); chk(m.production, 3300); chk(m.cos, 38400); chk(m.profit, 8400); chk(m.collections, 62000); chk(m.closeBank, 4000); chk(m.assets1, 59400);
    b.struct({
      d: 5, skill: "ANALYSIS", calculator: true,
      stem: `Kuda Packaging Ltd in Mutare makes cartons. For the coming quarter it budgets to sell ${F(m.units)} cartons, all on credit, at US\\$20 each. Finished goods are valued at the variable cost of US\\$12 a carton (materials US\\$8, labour US\\$3 and variable overhead US\\$1); there is no other inventory. Finished goods inventory is ${F(m.openFGUnits)} cartons at the start and ${F(m.closeFGUnits)} at the end. Fixed production overhead is ${usd(m.fixedOverhead)} (including depreciation of ${usd(m.depreciation)}), administration and selling expenses ${usd(m.admin)}, and loan interest ${usd(m.interest)}. Materials are bought on credit; labour and other costs are paid as incurred. A dividend of ${usd(m.dividend)} will be paid and equipment costing ${usd(m.equipment)} will be bought for cash.\n\n${table(["Balances at the start of the quarter", "US\\$"], [["Non-current assets at cost", m.ncaCost], ["Accumulated depreciation", m.ncaDep], ["Trade receivables", m.openRec], ["Cash and bank", m.openBank], ["Trade payables (materials only)", m.openPay], ["Share capital", m.shareCapital], ["Loan (non-current)", m.loan]])}\n\nTrade receivables are budgeted to be ${usd(m.closeRec)} and trade payables ${usd(m.closePay)} at the end of the quarter.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "units", value: m.production, wrong: [m.units, m.units - 100], stem: "Calculate the number of cartons to be produced.", explanation: `${F(m.units)} + ${F(m.closeFGUnits)} - ${F(m.openFGUnits)} = ${F(m.production)} cartons.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: m.cos, wrong: [m.prodCost, r2(m.units * 8)], stem: "Calculate the budgeted cost of sales.", explanation: `Cost of sales = opening ${F(m.openFG)} + production ${F(m.prodCost)} - closing ${F(m.closeFG)} = ${usd(m.cos)} (3,200 × US\\$12).` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: m.profit, wrong: [m.pbit, r2(m.sales - m.cos)], stem: "Calculate the budgeted profit for the quarter.", explanation: `Gross profit ${F(m.gp)} - fixed overhead ${F(m.fixedOverhead)} - administration ${F(m.admin)} = ${F(m.pbit)}; less interest ${F(m.interest)} = ${usd(m.profit)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: m.collections, wrong: [m.sales, r2(m.openRec + m.sales + m.closeRec)], stem: "Calculate the budgeted cash received from customers.", explanation: `${F(m.openRec)} + ${F(m.sales)} - ${F(m.closeRec)} = ${usd(m.collections)}.` }),
        P.num({ label: "(e)", marks: 2, kind: "money", value: m.closeBank, wrong: [r2(m.closeBank - m.depreciation), r2(m.closeBank + m.depreciation)], stem: "Calculate the budgeted cash and bank balance at the end of the quarter.", explanation: `Payments: suppliers ${F(m.toSuppliers)} (${F(m.materials)} + ${F(m.openPay)} - ${F(m.closePay)}), labour ${F(m.labour)}, variable overhead ${F(m.voh)}, fixed overhead paid ${F(m.fixedCash)} (excluding depreciation), administration ${F(m.admin)}, interest ${F(m.interest)}, dividend ${F(m.dividend)}, equipment ${F(m.equipment)} = ${F(m.payments)}. Closing bank = ${F(m.openBank)} + ${F(m.collections)} - ${F(m.payments)} = ${usd(m.closeBank)}.` }),
        P.num({ label: "(f)", marks: 2, kind: "money", value: m.assets1, wrong: [m.eqLiab0, r2(m.assets1 + m.depreciation)], stem: "Calculate the total assets in the budgeted statement of financial position at the end of the quarter.", explanation: `Non-current assets ${F(m.nca)} + inventory ${F(m.closeFG)} + receivables ${F(m.closeRec)} + bank ${F(m.closeBank)} = ${usd(m.assets1)}. Check: equity ${F(m.shareCapital + m.re1)} + loan ${F(m.loan)} + payables ${F(m.closePay)} = ${F(m.eqLiab1)}.` }),
        P.manual({ label: "(g)", marks: 2, stem: "Comment on the budgeted bank balance.", points: ["The bank balance of US\\$4,000 is positive but small compared with payments of US\\$61,200 for the quarter", "A fall in sales or slower collection from customers could remove it, so an overdraft should be arranged or the dividend or equipment purchase delayed"], modelAnswer: "The balance of US\\$4,000 is small compared with the quarter's payments, so a small fall in sales or slower payment by customers could create an overdraft. The owner should arrange an overdraft or delay the dividend or equipment.", explanation: "One mark for each point." }),
      ],
      hints: ["Cost of sales = 3,200 cartons at the variable cost.", "Depreciation is not a cash payment."],
      explanation: "This item builds the main figures of a master budget and checks the statement of financial position.",
    });
  }

  // Struct 2 (10 marks): assessing a plan
  {
    const rev = 78000, gp = 27300, pfo = 11400, profit = 9800;
    const inv = 8200, rec = 14600, bank = 1300, pay = 13200, loan = 6500, sc = 31000, re = 17000;
    const ca = inv + rec + bank, cl = pay;
    const gm = ratios.grossMargin(gp, rev), cr = ratios.current(ca, cl), at = ratios.acidTest(ca, inv, cl), ce = sc + re + loan, roce = ratios.roce(pfo, ce);
    chk(ca, 24100); chk(gm, 35, 1e-9); chk(ce, 54500);
    b.struct({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: `The master budget of Chipo Plastics Ltd in Gweru shows the following budgeted figures for next year.\n\n${table(["Budgeted figures", "US\\$"], [["Revenue", rev], ["Gross profit", gp], ["Profit from operations", pfo], ["Profit for the year", profit], ["Closing inventory", inv], ["Closing trade receivables", rec], ["Closing bank balance", bank], ["Trade payables (current)", pay], ["Loan (non-current)", loan], ["Share capital", sc], ["Retained earnings", re]])}\n\nGive percentages to one decimal place and ratios to two decimal places as x : 1.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: gm, wrong: [(profit / rev) * 100, (gp / (rev - gp)) * 100], stem: "Calculate the budgeted gross profit margin.", explanation: `${F(gp)} ÷ ${F(rev)} × 100 = ${gm.toFixed(1)}%.` }),
        P.num({ label: "(b)", marks: 2, kind: "ratio", value: cr, wrong: [at, ca / pay + 1], stem: "Calculate the budgeted current ratio.", explanation: `Current assets ${F(ca)} ÷ current liabilities ${F(cl)} = ${cr.toFixed(2)} : 1.` }),
        P.num({ label: "(c)", marks: 2, kind: "ratio", value: at, wrong: [cr, (ca - rec) / cl], stem: "Calculate the budgeted acid test ratio.", explanation: `(${F(ca)} - ${F(inv)}) ÷ ${F(cl)} = ${at.toFixed(2)} : 1.` }),
        P.num({ label: "(d)", marks: 2, kind: "pct", value: roce, wrong: [(profit / ce) * 100, (pfo / (sc + re)) * 100], stem: "Calculate the budgeted return on capital employed.", explanation: `Capital employed = ${F(sc)} + ${F(re)} + ${F(loan)} = ${F(ce)}. ${F(pfo)} ÷ ${F(ce)} × 100 = ${roce.toFixed(1)}%.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Advise the directors whether the plan is satisfactory, using the ratios.", points: ["Profitability and the return on capital employed look satisfactory, and the current ratio is above 1", "But the bank balance (US\\$1,300) is very low and receivables are large, so liquidity is weak in practice; improve collection or arrange an overdraft"], modelAnswer: "Margins and the return on capital employed are good and the current ratio is above 1, but the bank balance of US\\$1,300 is very low and cash is tied up in receivables. The directors should speed up collections or arrange an overdraft.", explanation: "One mark for each point." }),
      ],
      hints: ["Use year-end balances.", "Capital employed = share capital + reserves + non-current liabilities."],
      explanation: "This item assesses a plan with ratios from budgeted statements.",
    });
  }

  b.card("DEFINITION", "Master budget", "The summary of all budgets as a budgeted statement of profit or loss and statement of financial position (and cash).");
  b.card("FORMULA", "Closing retained earnings (budget)", "Opening retained earnings + budgeted profit for the period - dividends.");
  b.card("FORMULA", "Closing non-current assets (budget)", "Cost + additions - accumulated depreciation (opening + charge for the period).");
  b.card("CONCEPT", "Closing cash in the master budget", "Taken from the cash budget, not calculated from profit.");
  b.card("CONCEPT", "Balancing test", "Total assets must equal total equity and liabilities; if not, a transaction has been missed.");
  b.card("CONCEPT", "Profit v cash in a plan", "High budgeted profit can still coincide with an overdraft because of receivables, inventory, equipment, dividends and loan repayments.");
  b.card("CONCEPT", "Sensitivity (what if) tests", "Change an assumption such as sales or credit terms and recalculate profit and cash to see how robust the plan is.");
  b.card("CONCEPT", "Ratios from the master budget", "Gross margin, profit margin, current ratio, acid test and ROCE can be calculated from the budgeted statements.");
  b.card("FACT", "Cost of sales with inventory change", "Opening finished goods + production cost - closing finished goods.");
});
