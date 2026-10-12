// W3a: company.profit-or-loss
import { concept, P, table, check, sum, r2, fmt, money, chk, ratios } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";
import { coModel } from "../tables/w3a-models.mjs";

concept("aacc.company.profit-or-loss", { file: "company/profit-or-loss", keyPrefix: "company.profit-or-loss" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which item is NOT shown in a company's statement of profit or loss?",
    ok: ["A final dividend", "Correct: dividends are shown in the statement of changes in equity."],
    bad: [["Income tax expense", "Income tax is deducted to reach profit for the year."], ["Directors' remuneration", "It is an administrative expense."], ["Loan note interest", "It is a finance cost."]],
    explanation: "Dividends are a distribution of profit to shareholders, not an expense, so they appear in the statement of changes in equity.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under which heading is the interest on loan notes shown in the statement of profit or loss?",
    ok: ["Finance costs", "Correct: interest on borrowing is a finance cost."],
    bad: [["Distribution costs", "Distribution costs are the costs of delivering goods to customers."], ["Administrative expenses", "Administrative expenses are the costs of running the business."], ["Cost of sales", "Cost of sales is the cost of the goods sold."]],
    explanation: "IAS 1 groups interest payable on loan notes and overdrafts under finance costs.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Directors' remuneration is shown in the statement of profit or loss of the company as:",
    ok: ["an administrative expense", "Correct: directors are paid for managing the company."],
    bad: [["an appropriation of profit", "Remuneration is paid for services; it is not a share of profit."], ["a deduction from revenue", "Revenue is reduced only by returns inwards."], ["drawings", "A company has no drawings."]],
    explanation: "Directors' fees and salaries are costs of running the company and are included in administrative expenses.",
  });
  const cy = 12400, under = 500;
  const tx = r2(cy + under);
  chk(tx, 12900);
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: `The tax charge for the year is estimated at ${money(cy)}. The previous year's tax was estimated at ${money(7800)} but settled at ${money(7800 + under)}. What is the income tax expense in the statement of profit or loss?`,
    ok: [money(tx), "Correct: 12,400 + 500 under-provision."],
    bad: [[money(cy), "The under-provision of last year has been ignored."], [money(r2(cy - under)), "An under-provision is added, not deducted."], [money(r2(cy + 7800 + under)), "Last year's whole tax has been added again instead of only the difference."]],
    hints: ["Compare last year's estimate with the amount settled."],
    explanation: "The shortfall of 500 is charged in the current year: 12,400 + 500 = 12,900.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A company revalues its land upwards. The gain is reported in:",
    ok: ["other comprehensive income", "Correct: it is reported outside profit for the year."],
    bad: [["revenue", "A revaluation is not a sale."], ["other income within profit for the year", "That would make an unrealised gain part of profit."], ["distribution costs", "It is a gain, not a cost."]],
    hints: ["Which reserve receives the gain?"],
    explanation: "A revaluation gain is other comprehensive income and is credited to the revaluation reserve.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which order is correct for a company's statement of profit or loss?",
    ok: ["Gross profit, other income, expenses, profit before tax, income tax, profit for the year", "Correct: tax is deducted after profit before tax."],
    bad: [["Gross profit, income tax, expenses, profit before tax, profit for the year", "Tax is calculated on profit, so it comes after profit before tax."], ["Profit before tax, gross profit, expenses, income tax, profit for the year", "Gross profit comes before profit before tax."], ["Gross profit, dividends, expenses, profit before tax, profit for the year", "Dividends are not deducted in this statement."]],
    hints: ["Tax is charged on the profit before tax."],
    explanation: "Profit before tax is reached after all expenses and finance costs; income tax expense then gives profit for the year.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Loan note interest of US\\$3,000 owing at the year end was not accrued. What is the effect on the statement of profit or loss?",
    ok: ["Finance costs are understated and profit before tax is overstated by US\\$3,000", "Correct: the expense belongs to the year."],
    bad: [["Finance costs are overstated and profit before tax is understated by US\\$3,000", "The expense has been left out, not over-charged."], ["Profit is correct but current liabilities are overstated", "Profit is overstated because the cost is omitted."], ["Distribution costs are understated by US\\$3,000", "Interest is a finance cost."]],
    hints: ["Accruals concept: the cost belongs to the year in which it was incurred."],
    explanation: "Omitting the accrual understates finance costs and overstates profit; the statement of financial position also omits the liability.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "An interim dividend of US\\$9,000 is paid during the year. What is its effect on profit before tax and on profit for the year?",
    ok: ["No effect on either, because dividends are not an expense", "Correct: it reduces retained earnings only."],
    bad: [["Both are reduced by US\\$9,000", "Dividends are not deducted in the statement of profit or loss."], ["Profit before tax is unchanged but profit for the year is reduced by US\\$9,000", "Profit for the year is after tax only."], ["Profit before tax is reduced but profit for the year is not", "Dividends affect neither."]],
    hints: ["Where do dividends appear?"],
    explanation: "Dividends are distributed out of profit after it has been measured, so neither measure of profit changes.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Depreciation of a delivery lorry is shown within distribution costs.", answer: true, explanation: "True. The lorry is used to deliver goods to customers, so its depreciation is a distribution cost." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "A final dividend that the directors recommend after the year end is recognised as a liability at the year end.", answer: false, hints: ["Was there an obligation at the reporting date?"], explanation: "False. There was no obligation at the year end, so it is disclosed in a note and is not a liability." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item to the heading under which it appears in a company's statement of profit or loss.",
    pairs: ["Carriage outwards", "Interest on loan notes", "Directors' fees", "Income tax"],
    right: ["Distribution costs", "Finance costs", "Administrative expenses", "Income tax expense"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Delivery costs are distribution costs, interest is a finance cost, directors' fees are administrative and tax has its own line.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about the end of the statement.",
    template: "Profit before tax {{blank:a}} income tax expense = profit for the year. Dividends are shown in the statement of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["minus"], choices: ["plus", "minus"] },
      { id: "b", accepted: ["changes in equity"], choices: ["changes in equity", "cash flows", "financial position"] },
    ],
    explanation: "Tax is deducted from profit before tax; dividends reduce retained earnings in the statement of changes in equity.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the name of the total that adds other comprehensive income to the profit for the year.",
    accepted: ["total comprehensive income"],
    explanation: "Profit for the year plus other comprehensive income is total comprehensive income.",
  });

  // numerical
  const ln = 75000, rate = 9;
  const fin1 = r2((ln * rate) / 100);
  chk(fin1, 6750);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: fin1, calculator: true, wrong: [3400, r2(ln / 100)],
    stem: `A company has ${money(ln)} of ${rate}% loan notes in issue all year. It paid ${money(3400)} during the year and the balance is owing. Calculate the finance cost for the year.`,
    explanation: "The finance cost is the interest for the whole year, 9% × 75,000 = 6,750, whether paid or owing. The paid amount alone (3,400) understates the cost.",
  });
  const pbt = 64800, tx2 = 16200, under2 = 1100;
  const prof = r2(pbt - (tx2 - under2));
  chk(prof, 49700);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: prof, calculator: true, wrong: [r2(pbt - tx2), r2(pbt - tx2 - under2)],
    stem: `Profit before tax was ${money(pbt)}. The tax charge for the year is ${money(tx2)}. Last year's tax had been over-provided by ${money(under2)}. Calculate the profit for the year.`,
    hints: ["An over-provision reduces this year's tax expense."],
    explanation: "Income tax expense = 16,200 - 1,100 = 15,100, so profit for the year = 64,800 - 15,100 = 49,700. Ignoring the over-provision gives 48,600.",
  });
  const rev = 286400, pfy = 31360;
  const pmg = ratios.profitMargin(pfy, rev);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: pmg, calculator: true, wrong: [r2((pfy / (rev - 140000)) * 100), r2(((pfy + 9000) / rev) * 100)],
    stem: `A company's revenue was ${money(rev)} and its profit for the year was ${money(pfy)}. Calculate the profit margin (profit for the year ÷ revenue × 100) as a percentage to one decimal place.`,
    hints: ["Use revenue as the base, not cost of sales."],
    explanation: "31,360 ÷ 286,400 × 100 = 10.9%.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why an interim dividend is not an expense of the company.",
    points: ["An expense is a cost incurred in earning revenue; a dividend is a share of profit distributed to owners", "It is therefore deducted from retained earnings in the statement of changes in equity, not from profit"],
    modelAnswer: "A dividend is not a cost of earning revenue. It is profit shared with the shareholders, so it reduces retained earnings, not the profit for the year.",
    explanation: "One mark for the idea of a distribution and one for where it is shown.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a gain on the revaluation of land is not included in the profit for the year.",
    points: ["The gain is unrealised: the land has not been sold", "IAS 1 requires it to be reported as other comprehensive income", "It is credited to the revaluation reserve in equity, so it cannot be distributed as profit"],
    modelAnswer: "The land has not been sold, so the gain is unrealised. It is shown as other comprehensive income and credited to a revaluation reserve, so it does not increase profit for the year or retained earnings.",
    hints: ["Think about what has actually happened to the land."],
    explanation: "One mark each for unrealised, other comprehensive income and the reserve.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A company earned a profit for the year of US\\$40,000 and paid dividends of US\\$38,000. Evaluate this policy for the shareholders and for the company.",
    points: ["Shareholders receive a high return: 95% of the profit is paid out (38,000 ÷ 40,000)", "The company retains only US\\$2,000, so little is available for new non-current assets or to repay loans", "Paying out almost all profit may be sensible for a mature business with few investment needs", "Judgement: the policy suits shareholders in the short term but weakens growth unless the business can raise finance elsewhere"],
    modelAnswer: "Shareholders gain because 95% of profit is paid out. The company keeps only US\\$2,000, so it must borrow or issue shares to grow. The policy suits a mature business but not a growing one.",
    hints: ["Express the dividend as a percentage of profit."],
    explanation: "One mark for the percentage, one for the effect on retained profit, one for a balancing point and one for a judgement.",
  });

  // Structured 1 (12 marks)
  const dA = {
    name: "Bindura Timber Ltd", sc: 85000, genRes: 14730, loan: 64000, loanLabel: "9% loan notes",
    ppe: [{ label: "Land", cost: 72000, accDep: 0, rate: 0 }, { label: "Machinery", cost: 66000, accDep: 19800, rate: 10 }, { label: "Lorries", cost: 54000, accDep: 27000, rate: 25, group: "dist" }],
    openInv: 24300, closeInv: 20400, sales: 518700, returnsIn: 8350, purchases: 321650, carriageIn: 4380, returnsOut: 5120,
    income: [{ label: "Commission received", tb: 4650, acc: 380 }],
    expenses: [{ label: "Wages", tb: 73250, acc: 3190 }, { label: "Directors' fees", tb: 43500 }, { label: "Fuel", tb: 14950, group: "dist" }, { label: "Insurance", tb: 7120, pre: 1180 }, { label: "Repairs", tb: 5480 }, { label: "Loan note interest", tb: 2800, acc: 2960, group: "fin" }, { label: "General expenses", tb: 11630 }, { label: "Discount allowed", tb: 3070 }],
    recv: 52350, writeOff: 1650, allowPct: 4, allowOpen: 2240, retOpen: 36500, cash: 1350, payables: 32780, tax: 17250, intDiv: 11500, toGeneral: 7500,
  };
  const mA = coModel(dA);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Bindura Timber Ltd, a sawmill in Mutare, has the trial balance below at 31 December 2025. Its statements are for internal use.\n\n${mA.tb.md}\n\n${mA.notesMd}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: mA.revenue, wrong: [dA.sales], stem: "Calculate the revenue.", explanation: `Sales ${fmt(dA.sales)} - returns inwards ${fmt(dA.returnsIn)} = ${fmt(mA.revenue)}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: mA.cos, wrong: [r2(mA.cos - dA.carriageIn), r2(dA.openInv + dA.purchases - dA.returnsOut - dA.closeInv)], stem: "Calculate the cost of sales.", explanation: `${fmt(dA.openInv)} + ${fmt(dA.purchases)} + ${fmt(dA.carriageIn)} - ${fmt(dA.returnsOut)} - ${fmt(dA.closeInv)} = ${fmt(mA.cos)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: mA.fin, wrong: [dA.expenses[5].tb], stem: "Calculate the finance costs.", explanation: `Interest paid ${fmt(2800)} + owing ${fmt(2960)} = ${fmt(mA.fin)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: mA.pbt, wrong: [mA.profit, r2(mA.pbt + dA.tax)], stem: "Calculate the profit before tax.", explanation: `Gross profit ${fmt(mA.gp)} + commission ${fmt(mA.incomeTotal)} - distribution costs ${fmt(mA.dist)} - administrative expenses ${fmt(mA.admin)} - finance costs ${fmt(mA.fin)} = ${fmt(mA.pbt)}. Administrative expenses include depreciation of machinery ${fmt(mA.nca[1].charge)} and irrecoverable debts ${fmt(mA.irrCharge)}.` }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: mA.profit, wrong: [mA.pbt], stem: "Calculate the profit for the year.", explanation: `${fmt(mA.pbt)} - tax ${fmt(dA.tax)} = ${fmt(mA.profit)}.` }),
    ],
    hints: ["Land is not depreciated.", "Distribution costs include the lorries' depreciation and fuel."],
    explanation: "This item tests revenue, cost of sales, finance costs and the profit measures of a company.",
  });

  // Structured 2 (16 marks): service company with revaluation
  const dB = {
    name: "Chipinge Coaches Ltd", trading: false, salesLabel: "Revenue", sc: 95000, genRes: 0, loan: 42000, loanLabel: "10% loan notes",
    ppe: [{ label: "Land and depot", cost: 65000, accDep: 0, rate: 0, revalTo: 84000 }, { label: "Buses", cost: 180000, accDep: 57000, rate: 15 }, { label: "Workshop equipment", cost: 28000, accDep: 8400, rate: 10 }],
    sales: 372800,
    income: [{ label: "Interest received", tb: 950, acc: 150 }],
    expenses: [{ label: "Drivers' wages", tb: 88200, acc: 4300 }, { label: "Directors' remuneration", tb: 33600 }, { label: "Fuel", tb: 61400 }, { label: "Repairs", tb: 12800 }, { label: "Insurance", tb: 9400, pre: 1600 }, { label: "Loan note interest", tb: 2100, acc: 2100, group: "fin" }, { label: "Office expenses", tb: 7650 }],
    recv: 19200, allowPct: 3, allowOpen: 420, retOpen: 41000, cash: 880, payables: 14700, tax: 9100, intDiv: 6000, finalDiv: 7000,
  };
  const mB = coModel(dB);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Chipinge Coaches Ltd runs passenger buses between Chipinge and Mutare. It has no inventory for resale, so its statement has no cost of sales. The trial balance at 31 December 2025 and the year-end information follow. Use the IAS 1 headings. The statements are for internal use.\n\n${mB.tb.md}\n\n${mB.notesMd}`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: mB.pbt, wrong: [mB.profit, r2(mB.pbt + mB.fin)], stem: "Calculate the profit before tax.", explanation: `Revenue ${fmt(mB.revenue)} + interest ${fmt(mB.incomeTotal)} - administrative expenses ${fmt(mB.admin)} - finance costs ${fmt(mB.fin)} = ${fmt(mB.pbt)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: mB.profit, wrong: [mB.pbt], stem: "Calculate the profit for the year.", explanation: `${fmt(mB.pbt)} - ${fmt(dB.tax)} = ${fmt(mB.profit)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: mB.tci, wrong: [mB.profit], stem: "Calculate the total comprehensive income.", explanation: `Profit for the year ${fmt(mB.profit)} + revaluation gain ${fmt(mB.revalGain)} = ${fmt(mB.tci)}.` }),
      P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of profit or loss and other comprehensive income for the year ended 31 December 2025.", points: ["Heading with the company name, statement and date", `Revenue ${fmt(mB.revenue)} and interest received ${fmt(mB.incomeTotal)} shown`, `Administrative expenses ${fmt(mB.admin)} (including depreciation) correct`, `Finance costs ${fmt(mB.fin)}, profit before tax ${fmt(mB.pbt)}, tax and profit for the year ${fmt(mB.profit)}`, `Revaluation gain ${fmt(mB.revalGain)} as other comprehensive income and total comprehensive income ${fmt(mB.tci)}`], modelAnswer: mB.spl, explanation: "One mark for each line of the layout; allow follow-through." }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: mB.retClose, wrong: [r2(mB.retClose + dB.finalDiv), r2(mB.retClose + dB.intDiv + dB.finalDiv)], stem: "Calculate retained earnings at 31 December 2025, after the interim dividend paid and the final dividend declared.", explanation: `${fmt(mB.retOpen)} + ${fmt(mB.profit)} - ${fmt(dB.intDiv)} - ${fmt(dB.finalDiv)} = ${fmt(mB.retClose)}. The revaluation gain goes to the revaluation reserve.` }),
      P.manual({ label: "(f)", marks: 2, stem: `Dividends of US\\$${fmt(dB.intDiv + dB.finalDiv)} were declared in the year. Comment on whether the company could afford them.`, points: [`Dividends are ${fmt(r2(((dB.intDiv + dB.finalDiv) / mB.profit) * 100))}% of the profit for the year (${fmt(dB.intDiv + dB.finalDiv)} ÷ ${fmt(mB.profit)}), so some of the profit is kept`, "The company also has loan notes to service and buses to replace, so it should keep enough cash before paying more"], modelAnswer: `Dividends take about ${fmt(r2(((dB.intDiv + dB.finalDiv) / mB.profit) * 100))}% of profit, so they are affordable, but the buses will need replacing, so the company should not pay more.`, explanation: "One mark for the percentage and one for a reasoned conclusion." }),
    ],
    hints: ["Land is revalued, not depreciated.", "The gain is not part of profit for the year."],
    explanation: "This item tests a service company's profit measures, other comprehensive income and dividends.",
  });
  void check; void sum; void table;

  b.card("DEFINITION", "What is **income tax expense** in a company's statement of profit or loss?", "The tax charge for the year plus any under-provision (or minus any over-provision) on last year's estimate.");
  b.card("FACT", "Where are dividends shown?", "In the statement of changes in equity. They are a distribution of profit, not an expense, so they are never deducted in the statement of profit or loss.");
  b.card("FACT", "IAS 1 expense headings for a company", "Distribution costs, administrative expenses and finance costs; income tax expense is shown separately after profit before tax.");
  b.card("FORMULA", "Profit for the year", "Profit before tax - income tax expense.");
  b.card("FORMULA", "Total comprehensive income", "Profit for the year + other comprehensive income (for example a revaluation gain).");
  b.card("DEFINITION", "What is **other comprehensive income**?", "Gains that IAS 1 reports outside profit or loss, such as a revaluation gain on land; the gain is credited to the revaluation reserve.");
  b.card("FACT", "Where is directors' remuneration shown?", "As an administrative expense. Directors are paid for their services; this is not a dividend or drawings.");
  b.card("FACT", "Finance cost for the year", "Interest for the whole year, whether paid or still owing. The unpaid part is an accrual in current liabilities.");
  b.card("CONCEPT", "ZIMSEC title for the statement", "Statement of profit and loss and other comprehensive income (or income statement); Cambridge uses statement of profit or loss.");
});
