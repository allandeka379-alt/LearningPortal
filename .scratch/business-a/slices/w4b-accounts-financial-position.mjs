// W4b: accounts.financial-position
import { concept, P, table, r2, ratios, chk, fmt } from "../lib.mjs";
import { mc } from "../tables/w4b-lib.mjs";

concept("abus.accounts.financial-position", { file: "accounts/financial-position", keyPrefix: "accounts.financial-position" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In the statement of financial position, net assets are always equal to which item?",
    ok: ["Total equity", "Correct: what the business has, after its debts, belongs to the owners."],
    bad: [["Total current assets", "Current assets are only part of the assets."], ["Capital employed", "Capital employed also includes non-current liabilities."], ["Profit for the year", "Profit for the year is a flow for the period, not a balance at a date."]],
    explanation: "Net assets (assets less liabilities) equal equity: issued shares plus reserves.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How should a bank loan that is repayable in five years' time be classified?",
    ok: ["As a non-current liability", "Correct: it falls due after more than a year."],
    bad: [["As a current liability", "Current liabilities are due within a year."], ["As a current asset", "A loan owed is a liability, not an asset."], ["As part of reserves", "Reserves are profits kept in the business, not borrowings."]],
    explanation: "Amounts due after more than twelve months are non-current liabilities.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following is a **current asset**?",
    ok: ["Inventory held for resale", "Correct: it is expected to be turned into cash within a year."],
    bad: [["A delivery vehicle used for five years", "Vehicles are non-current assets."], ["A building owned by the business", "Buildings are non-current assets."], ["A long-term bank loan received", "A loan is a liability."]],
    explanation: "Inventories, trade receivables and cash are current assets.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional company buys machinery for US\\$18,000 on credit from a supplier who must be paid in 60 days. What is the effect?",
    ok: ["Non-current assets and payables rise; net assets do not change", "Correct: net current assets fall but net assets are unchanged."],
    bad: [["Non-current assets rise and cash falls by US\\$18,000", "No cash is paid at purchase; the purchase is on credit."], ["Net assets rise by US\\$18,000, because an asset has been added", "The liability to the supplier rises by the same amount."], ["Current assets rise and non-current liabilities rise", "A 60-day supplier credit is a current liability."]],
    hints: ["Record both sides of the transaction."],
    explanation: "Non-current assets rise by 18,000 and trade payables (a current liability) rise by 18,000, so net current assets fall by 18,000 but net assets do not change.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the link between the statement of profit or loss and the statement of financial position?",
    ok: ["Retained profit for the year is added to reserves", "Correct: profit kept in the business increases equity."],
    bad: [["Profit for the year is added to current assets as cash", "Profit is not necessarily held as cash; it increases equity."], ["Dividends are added to non-current liabilities", "Dividends reduce reserves or become a current liability if unpaid."], ["Revenue is deducted from inventories", "Revenue has no such link."]],
    hints: ["Think about the equity section."],
    explanation: "Closing reserves = opening reserves + retained profit for the year.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional company writes off an irrecoverable debt of US\\$3,000 owed by a customer. What is the effect on the statement of financial position?",
    ok: ["Trade receivables and reserves both fall by US\\$3,000", "Correct: an asset is lost and the loss reduces profit and so reserves."],
    bad: [["Trade receivables fall and trade payables fall by US\\$3,000", "The write-off does not change what the company owes."], ["Trade receivables fall and cash rises by US\\$3,000", "No cash is received for a bad debt."], ["Reserves rise by US\\$3,000 as the debt is removed", "The loss reduces reserves, not raises them."]],
    hints: ["Two sides: which asset falls and which part of equity falls?"],
    explanation: "The asset (receivables) falls by 3,000 and the loss reduces profit and therefore reserves by 3,000, so the statement still balances.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Non-current assets are normally shown at their net book value, which is cost less accumulated depreciation.",
    answer: true,
    explanation: "True. Net book value is the value after deducting accumulated depreciation.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "If a business pays a trade payable of US\\$5,000 with cash, its net assets fall by US\\$5,000.",
    answer: false,
    hints: ["Cash falls and a liability falls."],
    explanation: "False. Cash (an asset) falls by 5,000 and trade payables (a liability) fall by 5,000, so net assets are unchanged.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item to the section of the statement of financial position in which it appears.",
    pairs: [["Delivery vehicles", "Non-current assets"], ["Trade receivables", "Current assets"], ["Tax payable within a year", "Current liabilities"], ["Issued shares and reserves", "Equity"]],
    explanation: "Items are classified by how long they last and who owns or is owed them.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Net current assets are current assets less {{blank:a}} liabilities, and net assets are equal to {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["current"], choices: ["current", "non-current", "total"] },
      { id: "b", accepted: ["equity"], choices: ["equity", "revenue", "profit"] },
    ],
    explanation: "Net current assets = current assets − current liabilities; net assets = equity.",
  });

  // ---- numerical items
  const nca1 = 61300 + 27800 + 9400 - (38200 + 12100);
  chk(nca1, 48200);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: nca1, calculator: true, wrong: [61300 + 27800 + 9400, 38200 + 12100],
    stem: "A fictional company has inventories of US\\$61,300, trade receivables of US\\$27,800, cash of US\\$9,400, trade payables of US\\$38,200 and tax payable of US\\$12,100. Calculate the net current assets.",
    hints: ["Add the current assets, then deduct the current liabilities."],
    explanation: "Current assets = 61,300 + 27,800 + 9,400 = 98,500. Current liabilities = 38,200 + 12,100 = 50,300. Net current assets = US\\$48,200.",
  });
  const ce2 = ratios.capitalEmployed(90000, 64500, 55000);
  chk(ce2, 209500);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: ce2, calculator: true, daily: true, wrong: [90000 + 64500, 64500 + 55000],
    stem: "A fictional company has issued shares of US\\$90,000, reserves of US\\$64,500, non-current liabilities of US\\$55,000 and current liabilities of US\\$31,000. Calculate its capital employed.",
    hints: ["Capital employed = issued shares + reserves + non-current liabilities."],
    explanation: "90,000 + 64,500 + 55,000 = US\\$209,500. Current liabilities are not part of capital employed.",
  });
  const na3 = 236000 + (82000 - 47500) - 70000;
  chk(na3, 200500);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: na3, calculator: true, wrong: [236000 + 82000, 236000 + (82000 - 47500)],
    stem: "A fictional company has non-current assets of US\\$236,000, current assets of US\\$82,000, current liabilities of US\\$47,500 and non-current liabilities of US\\$70,000. Calculate its net assets.",
    hints: ["Net assets = non-current assets + net current assets − non-current liabilities."],
    explanation: "Net current assets = 82,000 − 47,500 = 34,500. Net assets = 236,000 + 34,500 − 70,000 = US\\$200,500.",
    workedSolution: "1. Net current assets = 82,000 − 47,500 = 34,500.\n2. Net assets = 236,000 + 34,500 − 70,000 = 200,500.",
  });
  const res4 = 228000 + (74500 - 51200) - 85000 - 100000;
  chk(res4, 66300);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: res4, calculator: true, wrong: [166300, 228000 + 74500 - 51200 - 100000],
    stem: "A fictional company's statement of financial position shows non-current assets of US\\$228,000, current assets of US\\$74,500, current liabilities of US\\$51,200, non-current liabilities of US\\$85,000 and issued shares of US\\$100,000. The reserves figure has been left blank. Calculate the reserves.",
    hints: ["Net assets must equal issued shares plus reserves."],
    explanation: "Net assets = 228,000 + (74,500 − 51,200) − 85,000 = 166,300. Reserves = 166,300 − 100,000 = US\\$66,300. The figure of 166,300 is the total equity, not the reserves.",
    workedSolution: "1. Net assets = 228,000 + 23,300 − 85,000 = 166,300.\n2. Reserves = 166,300 − 100,000 = 66,300.",
  });
  const ncaNew = (82000 + 3000) - (46500 + 3000 + 9000) - 0;
  const before = 82000 - 46500;
  // buys equipment 15,000 for cash and 9,000 on credit: cash -15,000; payables +9,000
  const ncaAfter = before - 15000 - 9000;
  chk(before, 35500); chk(ncaAfter, 11500);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: ncaAfter, calculator: true, wrong: [before, before - 15000],
    stem: "A fictional company has current assets of US\\$82,000 and current liabilities of US\\$46,500. It buys a machine for US\\$24,000, paying US\\$15,000 in cash and owing the rest to the supplier for 30 days. Calculate its net current assets after the purchase.",
    hints: ["Cash falls by the cash paid, and current liabilities rise by the amount owed."],
    explanation: "Before: 82,000 − 46,500 = 35,500. Current assets fall to 67,000 (cash paid 15,000) and current liabilities rise to 55,500 (9,000 owed). Net current assets = 67,000 − 55,500 = US\\$11,500, a fall of US\\$24,000, the whole cost of the machine.",
    workedSolution: "1. Current assets = 82,000 − 15,000 = 67,000.\n2. Current liabilities = 46,500 + 9,000 = 55,500.\n3. Net current assets = 67,000 − 55,500 = 11,500.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the section of the statement of financial position that contains issued shares and reserves.",
    accepted: ["equity", "capital and reserves", "shareholders' equity", "owners' equity", "total equity"],
    explanation: "Equity (also called capital and reserves).",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the statement of financial position always balances.",
    points: ["It shows what the business has (assets) and what it owes (liabilities)", "The difference, the net assets, has been financed by the owners", "So net assets always equal equity, because each transaction is recorded on two sides"],
    modelAnswer: "The statement shows what the business owns and owes. The difference, the net assets, has been financed by the owners' capital and the profits kept in the business, so net assets always equal equity. Every transaction is recorded on two sides, so the balance is kept.",
    hints: ["Think about where the assets came from."],
    explanation: "Assets less liabilities equal what the owners have put in or left in.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A fictional company has net assets of US\\$250,000 but is short of cash. Analyse how this can happen.",
    points: ["Net assets are mainly non-current assets and inventory, which are not cash", "The company's cash may have been spent on equipment, inventory or loan repayments", "Customers may owe a lot (trade receivables), so cash has not yet been received", "So it may be unable to pay short-term debts although it is worth a lot"],
    modelAnswer: "Net assets are measured at book value and may be mostly non-current assets and inventory, which are not cash. Cash may have been spent on equipment, inventory or loan repayments, and customers may owe a lot so that cash has not yet arrived. The company may therefore be unable to pay short-term debts although it is worth a lot.",
    hints: ["What are the assets actually made of?"],
    explanation: "Value and liquidity are different things.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Evaluate how useful the statement of financial position is to a supplier who is deciding whether to sell goods on credit to a company.",
    points: ["It shows current assets and current liabilities, so the supplier can calculate the current ratio and acid test", "It shows how much the company already owes and to whom", "It shows non-current assets that could be security", "It shows the position at one date only and may be affected by window dressing", "Book values may differ from market values, and it does not show future cash flow", "Judgement and reason, for example use it with the previous year's statement and the company's payment record"],
    modelAnswer: "The statement shows current assets and current liabilities, so the supplier can calculate liquidity ratios, and it shows how much the company owes and what assets it has. But it gives the position at one date only, may be affected by window dressing, uses book values and does not show future cash flow. The supplier should use it together with the previous year's statement and the company's record of paying on time.",
    hints: ["Say what the supplier can learn and what the statement hides."],
    explanation: "Uses and limits weighed, with a conditional judgement.",
  });

  // ---- practice structured items
  const Z = { nca: 142000, inv: 18200, rec: 12600, cash: 7400, pay: 21500, od: 6500, loan: 45000, sh: 80000 };
  const zCA = Z.inv + Z.rec + Z.cash, zCL = Z.pay + Z.od, zNCA = zCA - zCL, zNA = Z.nca + zNCA - Z.loan, zRes = zNA - Z.sh;
  chk(zNCA, 10200); chk(zNA, 107200); chk(zRes, 27200);
  const tbl1 = table(["US\\$", "Amount"], [["Non-current assets (net book value)", Z.nca], ["Inventories", Z.inv], ["Trade receivables", Z.rec], ["Cash", Z.cash], ["Trade payables", Z.pay], ["Bank overdraft", Z.od], ["Bank loan repayable in 2030", Z.loan], ["Issued shares", Z.sh]]);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Zenzele Bakery Ltd is a fictional company in Masvingo. At 31 December 2025 its accounting records show the balances below. During the year the company's profit for the year was US\\$17,000 and it paid dividends of US\\$7,600.\n\n${tbl1}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: zNCA, wrong: [zCA, zCL], stem: "Calculate the net current assets.", explanation: "Current assets = 18,200 + 12,600 + 7,400 = 38,200. Current liabilities = 21,500 + 6,500 = 28,000 (the overdraft is a current liability). Net current assets = US\\$10,200." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: zNA, type: "CALCULATION", wrong: [zNA + Z.loan, zNCA + Z.nca], stem: "Calculate the net assets.", explanation: "Net assets = 142,000 + 10,200 − 45,000 = US\\$107,200.", workedSolution: "1. Net current assets = 38,200 − 28,000 = 10,200.\n2. Net assets = 142,000 + 10,200 − 45,000 = 107,200." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain how the statement of profit or loss for the year affects the reserves in the statement of financial position.", points: ["The profit for the year of US\\$17,000 is added to reserves", "Dividends of US\\$7,600 are deducted", "So reserves increased by retained profit of US\\$9,400", "Reserves at the end are US\\$27,200, so the opening reserves were US\\$17,800"], modelAnswer: "The profit for the year of US\\$17,000 is added to reserves and the dividends of US\\$7,600 are deducted, so reserves increased by the retained profit of US\\$9,400. Reserves at the end of the year are US\\$27,200, so the opening reserves were US\\$17,800.", explanation: "Closing reserves = opening reserves + retained profit." }),
    ],
    hints: ["The overdraft is due within a year.", "Net assets must equal shares plus reserves."],
    explanation: "Net current assets US\\$10,200; net assets US\\$107,200; reserves US\\$27,200 after retaining US\\$9,400.",
  });
  const M = { nca: 210000, inv: 52000, rec: 36000, cash: 22000, pay: 48000, tax: 12000, loan: 80000, sh: 120000 };
  const mCA = M.inv + M.rec + M.cash, mCL = M.pay + M.tax, mRes = M.nca + (mCA - mCL) - M.loan - M.sh;
  chk(mRes, 60000);
  const A = { nca: 240000, cash: 12000, loan: 100000 };
  const aCA = M.inv + M.rec + A.cash, aNCA = aCA - mCL;
  const ce0 = ratios.capitalEmployed(M.sh, mRes, M.loan), ce1 = ratios.capitalEmployed(M.sh, mRes, A.loan);
  const g0 = ratios.gearing(M.loan, ce0), g1 = ratios.gearing(A.loan, ce1), cr1 = ratios.currentRatio(aCA, mCL), cr0 = ratios.currentRatio(mCA, mCL);
  chk(aNCA, 40000); chk(g0, 30.769, 1e-3); chk(g1, 35.714, 1e-3); chk(cr1, 1.66667, 1e-4); chk(cr0, 1.83333, 1e-4);
  const tbl2 = table(["US\\$", "Before the purchase"], [["Non-current assets", M.nca], ["Inventories", M.inv], ["Trade receivables", M.rec], ["Cash", M.cash], ["Trade payables", M.pay], ["Tax payable", M.tax], ["Non-current liabilities (bank loan)", M.loan], ["Issued shares", M.sh], ["Reserves", mRes]]);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Mushandira Farm Supplies Ltd is a fictional company in Gweru. Its statement of financial position is summarised below. The directors buy a delivery vehicle for US\\$30,000, paying US\\$10,000 in cash and the remaining US\\$20,000 from a new five-year bank loan.\n\n${tbl2}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: aNCA, wrong: [mCA - mCL, 30000], stem: "Calculate the net current assets after the purchase.", explanation: "Current assets = 52,000 + 36,000 + 12,000 = 100,000 (cash is 22,000 − 10,000). Current liabilities = 60,000. Net current assets = US\\$40,000." }),
      P.group({ label: "(b)", stem: "After the purchase, calculate:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "ratio", value: cr1, wrong: [cr0, r2(60000 / 100000)], stem: "the current ratio, as x : 1 to two decimal places;", explanation: "100,000 ÷ 60,000 = 1.67, so 1.67 : 1 (down from 1.83 : 1)." }),
        P.num({ label: "(ii)", marks: 2, kind: "pct", value: g1, wrong: [g0, r2((20000 / 280000) * 100)], stem: "the gearing ratio, to one decimal place.", explanation: "Non-current liabilities = 80,000 + 20,000 = 100,000. Capital employed = 120,000 + 60,000 + 100,000 = 280,000. Gearing = 100,000 ÷ 280,000 × 100 = 35.7% (up from 30.8%)." }),
      ] }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why the purchase has not changed the net assets of the company.", points: ["The vehicle is a non-current asset worth US\\$30,000", "Cash falls by US\\$10,000 and a new loan of US\\$20,000 is owed", "Assets rise by 20,000 net (30,000 − 10,000) and liabilities rise by 20,000, so net assets are unchanged at US\\$180,000"], modelAnswer: "The vehicle adds US\\$30,000 to non-current assets, but cash falls by US\\$10,000 and a new loan of US\\$20,000 is owed. Assets rise by a net US\\$20,000 and liabilities rise by US\\$20,000, so net assets are unchanged at US\\$180,000.", explanation: "Both sides of the transaction change by the same net amount." }),
      P.manual({ label: "(d)", marks: 5, stem: "Evaluate whether it was sensible to finance the vehicle partly by a loan rather than entirely from cash.", points: ["Paying all US\\$30,000 in cash would use more than the US\\$22,000 of cash the company holds", "The loan keeps US\\$12,000 of cash for day-to-day needs, so the current ratio stays at 1.67 : 1", "But gearing rises from 30.8% to 35.7% and interest is compulsory", "A five-year loan matches the life of the vehicle; the vehicle also earns revenue to pay the interest", "Judgement and reason, e.g. sensible because gearing is still moderate and liquidity is protected"], levels: [[3, 4, 5, "Uses both the liquidity and gearing figures with the case; a justified judgement"], [2, 2, 3, "Explains some effects with some figures; judgement weakly supported"], [1, 1, 1, "States an advantage or disadvantage with little development"]], modelAnswer: "Paying the whole US\\$30,000 in cash would have been impossible, since the company holds only US\\$22,000. The loan keeps US\\$12,000 of cash for daily needs, so the current ratio stays at a safe 1.67 : 1. The cost is that gearing rises from 30.8% to 35.7% and interest must now be paid. Because the loan lasts five years, in line with the life of the vehicle, and the vehicle earns revenue to pay the interest, the decision was sensible, as gearing is still moderate and liquidity is protected.", hints: ["Look at both liquidity and gearing."], explanation: "The loan protects liquidity at the cost of higher gearing." }),
    ],
    hints: ["Cash falls by the amount paid; the loan is a non-current liability."],
    explanation: "Net current assets US\\$40,000; current ratio 1.67 : 1; gearing 35.7%; net assets unchanged.",
  });

  b.card("DEFINITION", "Statement of financial position", "A statement listing a business's assets, liabilities and equity at a particular date (also called a balance sheet).");
  b.card("FORMULA", "Net current assets", "Current assets − current liabilities (working capital).");
  b.card("FORMULA", "Net assets", "Non-current assets + net current assets − non-current liabilities = equity.");
  b.card("FORMULA", "Capital employed", "Issued shares + reserves + non-current liabilities.");
  b.card("CONCEPT", "Non-current and current items", "Non-current: used or due after more than a year. Current: expected to be turned into cash, or due, within a year.");
  b.card("CONCEPT", "Retained profit and reserves", "Closing reserves = opening reserves + profit for the year − dividends.");
  b.card("CONCEPT", "Depreciation and net book value", "Net book value = cost − accumulated depreciation; the yearly charge is an expense.");
  b.card("CONCEPT", "Amending the statement", "Record both sides of the change, recalculate subtotals and check that net assets still equal equity.");
  b.card("CONCEPT", "Limits of the statement", "One date only, book values not market values, open to window dressing, no future cash flows.");
});
