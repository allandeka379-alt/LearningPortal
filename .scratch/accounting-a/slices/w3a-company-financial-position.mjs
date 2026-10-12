// W3a: company.financial-position
import { concept, P, table, check, sum, r2, fmt, money, chk, ratios } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";
import { coModel } from "../tables/w3a-models.mjs";

concept("aacc.company.financial-position", { file: "company/financial-position", keyPrefix: "company.financial-position" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "How is a bank overdraft classified in a company's statement of financial position?",
    ok: ["A current liability", "Correct: it is repayable on demand."],
    bad: [["A non-current liability", "An overdraft is normally repayable within twelve months."], ["A deduction from cash in hand", "It is not netted against cash in hand."], ["A reserve within equity", "An overdraft is a debt, not equity."]],
    explanation: "A credit balance at the bank is an overdraft and a current liability.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Income tax for the year that has not been paid at the year end is shown as:",
    ok: ["a current liability", "Correct: it is due within twelve months."],
    bad: [["a deduction from retained earnings", "Tax is deducted in the statement of profit or loss."], ["a non-current asset", "Unpaid tax is owed, not owned."], ["part of share capital", "Tax has nothing to do with share capital."]],
    explanation: "The tax charge is deducted in the statement of profit or loss; the amount unpaid is a current liability.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "At what amount is property, plant and equipment shown in the statement of financial position?",
    ok: ["Cost (or valuation) less accumulated depreciation", "Correct: this is the carrying amount."],
    bad: [["Cost only", "Depreciation must be deducted."], ["Market value at the date of the statement", "It is shown at depreciated cost unless revalued."], ["The amount of depreciation charged this year", "That is an expense, not the asset."]],
    explanation: "Property, plant and equipment is shown at carrying amount, which is cost or valuation less accumulated depreciation.",
  });
  const rec = 38600, wo = 900, pct = 4;
  const net = r2(rec - wo), allow = r2((net * pct) / 100), nr = r2(net - allow);
  chk(nr, 36192);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Trade receivables per the ledger are ${money(rec)}. An irrecoverable debt of ${money(wo)} must be written off and the allowance is to be ${pct}% of the remaining receivables. What amount is shown for trade receivables in the statement of financial position?`,
    ok: [money(nr), "Correct: 37,700 less 4% allowance of 1,508."],
    bad: [[money(r2(rec - (rec * pct) / 100)), "The write-off has been ignored before the allowance was calculated."], [money(net), "The allowance has not been deducted."], [money(r2(net + allow)), "The allowance has been added instead of deducted."]],
    hints: ["Write off first, then calculate the allowance on the remainder."],
    explanation: "38,600 - 900 = 37,700; allowance 4% × 37,700 = 1,508; net receivables 36,192.",
  });
  const ca = 74300, cl = 51800, wc = r2(ca - cl);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A company has inventory of ${money(21900)}, trade receivables of ${money(33400)}, cash and bank of ${money(19000)}, trade payables of ${money(36200)}, income tax payable of ${money(8600)} and a dividend payable of ${money(7000)}. What is the working capital?`,
    ok: [money(wc), "Correct: 74,300 - 51,800."],
    bad: [[money(r2(ca - 36200)), "Only trade payables have been deducted."], [money(r2(ca - 36200 - 8600)), "The dividend payable has been left out."], [money(r2(ca + cl)), "The liabilities have been added to the assets."]],
    hints: ["Working capital = current assets - current liabilities."],
    explanation: "Current assets 21,900 + 33,400 + 19,000 = 74,300; current liabilities 36,200 + 8,600 + 7,000 = 51,800; working capital 22,500.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "The directors recommend a final dividend after the year end. In the statement of financial position at the year end it is:",
    ok: ["not shown as a liability but disclosed in a note", "Correct: there was no obligation at the year end."],
    bad: [["shown as a current liability", "Only a dividend declared by the year end is a liability."], ["shown as a deduction from share capital", "Dividends never reduce share capital."], ["shown as a non-current liability", "It is not a liability at all at the year end."]],
    hints: ["Was the dividend declared on or before the year end?"],
    explanation: "A dividend proposed after the year end is a non-adjusting event, disclosed in a note.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Wages of US\\$3,200 owing at the year end have not been accrued. What is the effect on the statement of financial position?",
    ok: ["Liabilities are understated and equity overstated by US\\$3,200", "Correct: the unrecorded cost raised profit."],
    bad: [["Assets are overstated and liabilities are correct", "No asset is involved; the liability is missing."], ["Liabilities and equity are both understated by US\\$3,200", "Equity is overstated, because profit is too high."], ["Equity is understated and liabilities are correct", "The liability is missing and profit is too high."]],
    hints: ["The missing expense makes profit too high."],
    explanation: "Omitting the accrual leaves profit too high, so retained earnings (equity) are overstated, and current liabilities are understated.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A company has US\\$80,000 of loan notes. US\\$20,000 is repayable in nine months' time and the rest in six years. How are they shown?",
    ok: ["US\\$20,000 in current liabilities and US\\$60,000 in non-current liabilities", "Correct: each part is classified by its due date."],
    bad: [["All US\\$80,000 in non-current liabilities", "The part due within twelve months is current."], ["All US\\$80,000 in current liabilities", "Only the part due within twelve months is current."], ["US\\$20,000 deducted from equity and US\\$60,000 in non-current liabilities", "Loan repayments are not deducted from equity."]],
    hints: ["Look at the repayment date of each part."],
    explanation: "The portion repayable within twelve months is a current liability; the remainder is non-current.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A company's statement of financial position shows capital and reserves under equity, not as a liability.", answer: true, explanation: "True. Equity is the owners' residual interest; liabilities are amounts owed to outsiders." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "Prepaid insurance is shown as a current liability.", answer: false, hints: ["Is it owed or owned?"], explanation: "False. A prepayment is a current asset (other receivables): the company has paid for a benefit it has not yet used." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item to its classification in the statement of financial position.",
    pairs: ["Prepaid rent", "Loan notes repayable in six years", "Share premium", "Dividend declared and unpaid"],
    right: ["Current asset", "Non-current liability", "Equity", "Current liability"],
    rightIndex: [0, 1, 2, 3],
    explanation: "A prepayment is a current asset, long-term loan notes are non-current liabilities, share premium belongs to equity, and a declared dividend is owed within a year.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about the layout.",
    template: "Total assets equal total {{blank:a}} plus total liabilities. Inventory is a {{blank:b}} asset.",
    blanks: [
      { id: "a", accepted: ["equity"], choices: ["equity", "revenue", "profit"] },
      { id: "b", accepted: ["current"], choices: ["current", "non-current"] },
    ],
    explanation: "The accounting equation: assets = equity + liabilities. Inventory is expected to be sold within the year, so it is current.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the heading under which share capital and reserves are shown in a company's statement of financial position.",
    accepted: ["equity", "capital and reserves", "shareholders' equity", "shareholders equity", "equity and reserves"],
    explanation: "IAS 1 shows them as equity (ZIMSEC also uses capital and reserves).",
  });

  // numerical
  const ta = 268400, ncl = 70000, cl2 = 49300;
  const eq = r2(ta - ncl - cl2);
  chk(eq, 149100);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: eq, calculator: true, wrong: [r2(ta - ncl), r2(ta - cl2)],
    stem: `A company's statement of financial position shows total assets of ${money(ta)}, non-current liabilities of ${money(ncl)} and current liabilities of ${money(cl2)}. Calculate the total equity.`,
    hints: ["Assets = equity + liabilities."],
    explanation: "Equity = 268,400 - 70,000 - 49,300 = 149,100. Deducting only the non-current liabilities gives 198,400.",
  });
  const ca3 = 126400, cl3 = 79000;
  const cr = ratios.current(ca3, cl3);
  b.num({
    d: 3, skill: "APPLICATION", kind: "ratio", value: cr, calculator: true, wrong: [r2(ratios.acidTest(ca3, 38200, cl3)), r2(cl3 / ca3)],
    stem: `A company has current assets of ${money(ca3)} (including inventory of ${money(38200)}) and current liabilities of ${money(cl3)}. Calculate the current ratio, as x : 1 to two decimal places.`,
    hints: ["Current ratio = current assets ÷ current liabilities."],
    explanation: "126,400 ÷ 79,000 = 1.60 : 1. Deducting inventory gives the acid test ratio of 1.12 : 1; inverting the ratio gives 0.63.",
  });
  const rr = r2(36500 + 12400 - 8100);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: rr, daily: true, calculator: true, wrong: [r2(36500 + 12400), r2(36500 - 12400 - 8100)],
    stem: `Retained earnings at the start of the year were ${money(36500)}, profit for the year was ${money(12400)} and dividends of ${money(8100)} were declared before the year end. Calculate the retained earnings shown in the statement of financial position.`,
    explanation: "36,500 + 12,400 - 8,100 = 40,800. Ignoring the dividend gives 48,900.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why accrued expenses are shown as a liability in the statement of financial position.",
    points: ["The cost was incurred in the year, but has not yet been paid", "The company owes the amount to another party, so it is a liability due within twelve months"],
    modelAnswer: "The expense relates to the year but is unpaid, so the company owes the amount to someone at the year end. It is a current liability.",
    explanation: "One mark for incurred but unpaid, one for being an amount owed.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Distinguish between current liabilities and non-current liabilities, giving one example of each.",
    points: ["Current liabilities fall due within twelve months (or the operating cycle), for example trade payables", "Non-current liabilities fall due after more than twelve months, for example loan notes repayable in five years", "The distinction shows users how much must be paid soon, which is used to judge liquidity"],
    modelAnswer: "Current liabilities, such as trade payables, are due within twelve months. Non-current liabilities, such as loan notes repayable in five years, are due later. The split helps users judge liquidity.",
    hints: ["Look at the date on which each must be paid."],
    explanation: "One mark each for the two definitions with examples and one for the purpose.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A company has a current ratio of 0.8 : 1, a bank overdraft and long-term loan notes. Evaluate its liquidity and advise the directors.",
    points: ["A ratio below 1 means current liabilities exceed current assets, so the company may struggle to pay its short-term debts", "The overdraft is repayable on demand and adds to the risk", "The long-term loan notes do not fall due soon, which is a strength, but interest must still be paid", "Advice: collect receivables faster, reduce inventory or arrange a long-term loan to replace the overdraft"],
    modelAnswer: "A ratio of 0.8 : 1 means the company cannot pay all its current liabilities from its current assets. The overdraft is repayable on demand, but the loan notes are long-term. The directors should collect receivables sooner, cut inventory or replace the overdraft with a longer loan.",
    hints: ["What does a ratio below 1 mean?"],
    explanation: "One mark each for the ratio, the overdraft, the loan notes and a practical recommendation.",
  });

  // Structured 1 (12 marks)
  const dA = {
    name: "Plumtree Packaging Ltd", sc: 72000, prem: 17600, genRes: 9500, loan: 58000, loanLabel: "12% loan notes",
    ppe: [{ label: "Buildings", cost: 168000, accDep: 33600, rate: 2 }, { label: "Plant", cost: 92000, accDep: 36800, rate: 10 }, { label: "Vans", cost: 38000, accDep: 15200, rate: 20, group: "dist" }],
    openInv: 27800, closeInv: 31450, sales: 436900, returnsIn: 5750, purchases: 241300, carriageIn: 3480, returnsOut: 4260,
    income: [{ label: "Discount received", tb: 2260 }],
    expenses: [{ label: "Wages", tb: 84350, acc: 3170 }, { label: "Directors' fees", tb: 41900 }, { label: "Van expenses", tb: 12640, group: "dist" }, { label: "Insurance", tb: 6840, pre: 970 }, { label: "Light and heat", tb: 9120, acc: 730 }, { label: "Loan note interest", tb: 3480, acc: 3480, group: "fin" }, { label: "General expenses", tb: 13950 }],
    recv: 47300, writeOff: 1450, allowPct: 3, allowOpen: 1420, retOpen: 21800, cash: 1650, payables: 29640, tax: 11300, intDiv: 7600, finalDiv: 10400, toGeneral: 4500,
  };
  const mA = coModel(dA);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Plumtree Packaging Ltd, a packaging company in Bulawayo, has the trial balance below at 31 December 2025. The statements are for internal use.\n\n${mA.tb.md}\n\n${mA.notesMd}`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: mA.ppeCv, wrong: [sum(mA.nca.map((n) => n.cost)), r2(mA.ppeCv + sum(mA.nca.map((n) => n.charge)))], stem: "Calculate the total carrying amount of property, plant and equipment.", explanation: `Cost ${fmt(sum(mA.nca.map((n) => n.cost)))} less accumulated depreciation ${fmt(sum(mA.nca.map((n) => n.accClose)))} (including this year's charge ${fmt(sum(mA.nca.map((n) => n.charge)))}) = ${fmt(mA.ppeCv)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: mA.recvNet, wrong: [mA.irrNet, dA.recv], stem: "Calculate the trade receivables to be shown in current assets.", explanation: `${fmt(dA.recv)} - ${fmt(dA.writeOff)} = ${fmt(mA.irrNet)}; allowance ${fmt(mA.allowNew)}; net ${fmt(mA.recvNet)}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: mA.cl, wrong: [r2(mA.cl - dA.finalDiv), r2(mA.cl - dA.tax)], stem: "Calculate the total current liabilities.", explanation: `Trade payables ${fmt(dA.payables)} + other payables ${fmt(mA.otherPay)} + dividends payable ${fmt(dA.finalDiv)} + income tax ${fmt(dA.tax)} = ${fmt(mA.cl)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: mA.retClose, wrong: [r2(mA.retClose + dA.finalDiv), mA.profit], stem: "Calculate the retained earnings to be shown in equity.", explanation: `${fmt(mA.retOpen)} + ${fmt(mA.profit)} - ${fmt(dA.intDiv)} - ${fmt(dA.finalDiv)} - ${fmt(dA.toGeneral)} = ${fmt(mA.retClose)}.` }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: mA.equity, wrong: [r2(mA.equity + dA.finalDiv), r2(mA.assets)], stem: "Calculate the total equity.", explanation: `Share capital ${fmt(dA.sc)} + premium ${fmt(dA.prem)} + general reserve ${fmt(mA.genResClose)} + retained earnings ${fmt(mA.retClose)} = ${fmt(mA.equity)}.` }),
    ],
    hints: ["The allowance is calculated after the write-off.", "The trial balance shows the bank balance as a debit or credit."],
    explanation: "This item tests the main figures of a company statement of financial position built from a trial balance.",
  });
  chk(mA.assets, r2(mA.equity + mA.ncl + mA.cl), 0.001, "assets A");

  // Structured 2 (16 marks): corrections
  const dr = { ppe: 233500, inv: 42300, rec: 36400, bank: 12600, sc: 100000, prem: 20000, ret: 138000, loan: 32000, pay: 34800, profit: 52000 };
  const draftCa = r2(dr.inv + dr.rec + dr.bank);
  const draftAssets = r2(dr.ppe + draftCa);
  const draftEq = r2(dr.sc + dr.prem + dr.ret);
  const draftLiab = r2(dr.loan + dr.pay);
  check("draft balances", draftAssets, draftEq + draftLiab);
  const fx = { inv: 4200, dep: 5600, tax: 9600, wages: 2250, div: 11500 };
  const profitC = r2(dr.profit - fx.inv - fx.dep - fx.tax - fx.wages);
  const assetsC = r2(draftAssets - fx.inv - fx.dep);
  const eqC = r2(draftEq - fx.inv - fx.dep - fx.tax - fx.wages - fx.div);
  const clC = r2(dr.pay + fx.tax + fx.wages + fx.div);
  const liabC = r2(dr.loan + clC);
  check("corrected balances", assetsC, eqC + liabC);
  const caC = r2(draftCa - fx.inv);
  const crBefore = ratios.current(draftCa, dr.pay);
  const crAfter = ratios.current(caC, clC);
  const corrTable = table(["Correction", "Assets US\\$", "Equity US\\$", "Liabilities US\\$"], [["Draft", draftAssets, draftEq, draftLiab], ["(1) Inventory counted twice", -fx.inv, -fx.inv, 0], ["(2) Depreciation omitted", -fx.dep, -fx.dep, 0], ["(3) Income tax not provided", 0, -fx.tax, fx.tax], ["(4) Wages accrual omitted", 0, -fx.wages, fx.wages], ["(5) Final dividend declared", 0, -fx.div, fx.div], ["**Corrected**", assetsC, eqC, liabC]]);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `The draft statement of financial position of Mhondoro Dairies Ltd at 31 December 2025 showed: property, plant and equipment US\\$${fmt(dr.ppe)}; inventory US\\$${fmt(dr.inv)}; trade receivables US\\$${fmt(dr.rec)}; bank US\\$${fmt(dr.bank)}; share capital US\\$${fmt(dr.sc)}; share premium US\\$${fmt(dr.prem)}; retained earnings US\\$${fmt(dr.ret)}; loan notes (repayable in 2030) US\\$${fmt(dr.loan)}; trade payables US\\$${fmt(dr.pay)}. The draft retained earnings include a profit for the year of US\\$${fmt(dr.profit)}.\n\nThe following were then discovered.\n\n1. Inventory of US\\$${fmt(fx.inv)} was counted twice.\n2. Depreciation of US\\$${fmt(fx.dep)} on equipment was omitted.\n3. Income tax of US\\$${fmt(fx.tax)} for the year was not provided.\n4. Wages of US\\$${fmt(fx.wages)} owing at the year end were not accrued.\n5. A final dividend of US\\$${fmt(fx.div)} declared before the year end was not recorded.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: profitC, wrong: [r2(profitC + fx.tax), r2(profitC - fx.div)], stem: "Calculate the corrected profit for the year.", explanation: `${fmt(dr.profit)} - ${fmt(fx.inv)} - ${fmt(fx.dep)} - ${fmt(fx.tax)} - ${fmt(fx.wages)} = ${fmt(profitC)}. The dividend is not an expense.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: assetsC, wrong: [r2(draftAssets - fx.inv), draftAssets], stem: "Calculate the corrected total assets.", explanation: `${fmt(draftAssets)} - inventory ${fmt(fx.inv)} - depreciation ${fmt(fx.dep)} = ${fmt(assetsC)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: eqC, wrong: [r2(eqC + fx.div), r2(draftEq - fx.inv - fx.dep)], stem: "Calculate the corrected total equity.", explanation: `${fmt(draftEq)} - ${fmt(fx.inv)} - ${fmt(fx.dep)} - ${fmt(fx.tax)} - ${fmt(fx.wages)} - ${fmt(fx.div)} = ${fmt(eqC)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "ratio", value: crAfter, wrong: [crBefore, r2(ratios.current(draftCa, clC))], stem: "Calculate the corrected current ratio, as x : 1 to two decimal places.", explanation: `Corrected current assets ${fmt(caC)} ÷ corrected current liabilities ${fmt(clC)} (payables ${fmt(dr.pay)} + tax + wages + dividend) = ${fmt(r2(crAfter))} : 1.` }),
      P.manual({ label: "(e)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare a table that shows the effect of each correction on assets, equity and liabilities and the corrected totals.", points: ["Draft totals shown and balancing", "Each of the five corrections shown against the right headings", `Corrected totals ${fmt(assetsC)}, ${fmt(eqC)} and ${fmt(liabC)} that balance`], modelAnswer: corrTable, explanation: "One mark for each section; allow follow-through." }),
      P.manual({ label: "(f)", marks: 3, stem: `The draft current ratio was ${fmt(r2(crBefore))} : 1. Evaluate the effect of the corrections on liquidity.`, points: [`The current ratio falls from ${fmt(r2(crBefore))} : 1 to ${fmt(r2(crAfter))} : 1, because current liabilities rise by ${fmt(r2(fx.tax + fx.wages + fx.div))} and inventory falls by ${fmt(fx.inv)}`, "The company can still cover its current liabilities, but with a much smaller margin of safety", "The tax and dividend must be paid in cash soon, so the directors should check that the bank balance and collections from receivables are enough"], modelAnswer: `The current ratio falls from ${fmt(r2(crBefore))} : 1 to ${fmt(r2(crAfter))} : 1. It remains above 1, so the company can still pay its short-term debts, but the margin is smaller and cash must be found for the tax and dividend.`, explanation: "One mark for the comparison with figures, one for the judgement on safety and one for the cash consequence." }),
    ],
    hints: ["The dividend affects retained earnings but not profit.", "Only inventory affects current assets."],
    explanation: "This item tests the correction of a draft statement of financial position and its effect on liquidity.",
  });
  void check; void sum; void table;

  b.card("DEFINITION", "What is a **current liability**?", "An amount due within twelve months or in the normal operating cycle: trade payables, accruals, tax payable, declared dividends, a bank overdraft.");
  b.card("FORMULA", "Accounting equation for a company", "Total assets = total equity (share capital + reserves) + total liabilities.");
  b.card("FACT", "How is a bank overdraft shown?", "As a current liability. It is not netted against cash in hand.");
  b.card("FACT", "When is a dividend a liability?", "Only if it is declared before the year end. A dividend recommended later is a note.");
  b.card("FORMULA", "Working capital", "Current assets - current liabilities.");
  b.card("FORMULA", "Current ratio", "Current assets ÷ current liabilities, shown as x : 1.");
  b.card("DEFINITION", "What is **carrying amount**?", "Cost (or valuation) of a non-current asset less accumulated depreciation (ZIMSEC: net book value).");
  b.card("FACT", "Classification of loan notes", "Non-current liability if repayable after more than twelve months; the part due within twelve months is current.");
  b.card("CONCEPT", "Trade receivables in the statement", "Receivables after the write-off, less the allowance for irrecoverable debts.");
});
