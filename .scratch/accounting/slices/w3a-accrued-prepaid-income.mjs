// W3a: accrued and prepaid income (rent and commission receivable).
import { concept, P, money, check, sum, r2, tAccount, statement } from "../lib.mjs";
import { table, U } from "../tables/w3a-lib.mjs";

const f = (v) => v.toLocaleString("en-GB", { maximumFractionDigits: 2, minimumFractionDigits: Number.isInteger(v) ? 0 : 2 });

concept("acc.adjustments.accrued-prepaid-income", { file: "adjustments/accrued-prepaid-income", keyPrefix: "adjustments.accrued-prepaid-income" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **accrued income**?",
    options: [
      ["Income earned in the year but not yet received", "Correct: it is owed to the business."],
      ["Income received in advance for next year", "That is income received in advance (prepaid income)."],
      ["An expense owing at the year end", "That is an accrued expense."],
      ["Income from the sale of goods on credit", "Credit sales create trade receivables, not accrued income."],
    ],
    answer: "A",
    explanation: "Accrued income has been earned but not received: a current asset.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is rent received in advance shown in the statement of financial position?",
    options: [
      ["As a current liability (other payables)", "Correct: the business owes the tenant the use of the property."],
      ["As a current asset (other receivables)", "Accrued income is an asset; income in advance is a liability."],
      ["Added to capital", "It is not income of this year, so it does not reach capital."],
      ["As a non-current liability", "It will be earned within the next year."],
    ],
    answer: "A",
    explanation: "Income received in advance is owed back in services, so it is a current liability.",
  });
  const c1 = { rec: 5340, acc: 460 };
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Commission received during 2025 was US\\$5,340. At 31 December 2025 commission of US\\$460 was due but not received. What is the commission income for 2025?",
    options: [
      [money(r2(c1.rec + c1.acc)), "Correct: received plus the amount due."],
      [money(r2(c1.rec - c1.acc)), "The accrued income was deducted instead of added."],
      [money(c1.rec), "This ignores the commission due."],
      [money(c1.acc), "This is only the amount due."],
    ],
    answer: "A",
    explanation: `5,340 + 460 = ${f(r2(c1.rec + c1.acc))}.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Where is rent receivable shown in the income statement?",
    options: [
      ["Added to gross profit as other income", "Correct."],
      ["Added to sales revenue", "It does not come from selling goods."],
      ["Deducted from expenses", "It is income, shown separately."],
      ["Deducted from cost of sales", "It has nothing to do with the cost of goods sold."],
    ],
    answer: "A",
    explanation: "Other income (rent, commission, interest receivable) is added to gross profit.",
  });
  const r = { monthly: 850, rec: 11050 };
  const rAdv = r2(r.rec - r.monthly * 12);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Tatenda lets a room above his shop for US\\$850 a month. During 2025 he received US\\$11,050. There were no balances at 1 January 2025. What is the balance on the rent receivable account at 31 December 2025?",
    options: [
      [`${money(rAdv)} received in advance (credit balance)`, "Correct: 11,050 − 10,200 = 850, one month in advance."],
      [`${money(rAdv)} accrued (debit balance)`, "More was received than earned, so it is in advance, a credit balance."],
      [`${money(r.rec)} credit balance (the rent received)`,"The income earned is transferred to the income statement."],
      [`${money(10200)} debit balance (the rent earned)`,"This is the income for the year, not the balance."],
    ],
    answer: "A",
    hints: ["Compare the rent earned (12 months) with the rent received."],
    explanation: `Earned 850 × 12 = 10,200; received 11,050; received in advance ${f(rAdv)}, carried down on the debit side and brought down as a credit balance.`,
  });
  check("rAdv", rAdv, 850);
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A business forgets to adjust for commission receivable of US\\$400 that was due but not received at the year end. What is the effect?",
    options: [
      ["Profit understated by US\\$400; current assets understated by US\\$400", "Correct: income and other receivables are both too low."],
      ["Profit overstated by US\\$400; current assets understated by US\\$400", "Leaving out income makes profit too low."],
      ["Profit understated by US\\$400; current liabilities understated by US\\$400", "Accrued income is an asset, not a liability."],
      ["No effect on profit, because the cash has not been received", "Income is recognised when earned (matching)."],
    ],
    answer: "A",
    hints: ["Accrued income is added to income and is an asset."],
    explanation: "The missing accrual understates income (so profit) and other receivables by 400.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Income received in advance is deducted from the amount received to find the income for the year.",
    answer: true,
    explanation: "True. It belongs to a later period.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a rent receivable account, the transfer to the income statement is on the credit side.",
    answer: false,
    explanation: "False. Income accounts are credited with receipts; the income earned is transferred on the debit side.",
  });

  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each balance with its classification in the statement of financial position.",
    pairs: ["Rent receivable owing by a tenant", "Commission received in advance", "Electricity owing", "Insurance paid in advance"],
    right: ["Current asset (other receivables)", "Current liability (other payables)"],
    rightIndex: [0, 1, 1, 0],
    hints: ["Who owes whom?"],
    explanation: "Amounts owed to the business (accrued income, prepaid expenses) are assets; amounts it owes, in money or service (accrued expenses, income in advance), are liabilities.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Complete the year-end journal entry for commission of US\\$540 received in advance.",
    template: "Debit {{blank:a}} US\\$540; credit {{blank:b}} US\\$540.",
    blanks: [
      { id: "a", accepted: ["Commission receivable"], choices: ["Commission receivable", "Other payables", "Other receivables", "Bank"] },
      { id: "b", accepted: ["Other payables"], choices: ["Other payables", "Commission receivable", "Other receivables", "Bank"] },
    ],
    explanation: "Income in advance reduces the income (debit) and creates a liability (credit other payables).",
  });

  const i1 = { oAcc: 290, rec: 3870, cAdv: 340 };
  const i1v = r2(i1.rec - i1.oAcc - i1.cAdv);
  b.num({
    d: 3, kind: "money", value: i1v, calculator: true, wrong: [r2(i1.rec + i1.oAcc - i1.cAdv), r2(i1.rec - i1.oAcc + i1.cAdv)],
    stem: "At 1 January 2025 commission of US\\$290 was owing to Rudo's business. During 2025 she received US\\$3,870 in commission. At 31 December 2025 US\\$340 of this had been received in advance. Calculate the commission income for 2025.",
    hints: ["The opening amount owing was earned in 2024."],
    explanation: `3,870 − 290 − 340 = ${f(i1v)}. Adding the opening accrual gives 3,820; adding the amount in advance gives 3,920.`,
  });
  check("i1v", i1v, 3240);
  const i2 = { oAdv: 450, rec: 4800, cAcc: 375 };
  const i2v = r2(i2.oAdv + i2.rec + i2.cAcc);
  b.calc({
    d: 4, kind: "money", value: i2v, calculator: true, wrong: [r2(i2.rec - i2.oAdv + i2.cAcc)],
    stem: "On 1 January 2025 Sipho had received US\\$450 rent in advance from a tenant. During 2025 he received US\\$4,800 rent. At 31 December 2025 the tenant owed US\\$375. Calculate the rent receivable for 2025 shown in the income statement.",
    hints: ["Rent received in advance last year is earned this year.", "Rent owing at the end is earned but not received."],
    explanation: `450 + 4,800 + 375 = ${f(i2v)}. Deducting the opening amount in advance gives 4,725.`,
  });
  check("i2v", i2v, 5625);

  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 2,
    stem: "Thandeka received a full year's rent from a tenant on 1 October 2025. She wants to include all of it as income in the year ended 31 December 2025. Explain why this is not correct.",
    points: ["Only the rent for October to December (3 months) is earned in 2025 (matching)", "The other 9 months are received in advance: a current liability; including them would overstate profit"],
    modelAnswer: "Only three months' rent has been earned in 2025. The remaining nine months belong to 2026 and are owed back as a service, so they are a current liability. Including them would overstate profit.",
    hints: ["Has the rent for 2026 been earned yet?"],
    explanation: "Income is recognised when earned, not when received.",
  });

  // Practice structured 1: ledger account and SOFP
  const k = { oAdv: 380, rec: 9460, monthly: 760 };
  const kInc = r2(k.monthly * 12);
  const kClose = r2(k.oAdv + k.rec - kInc);
  check("kClose", kClose, 720);
  const kMd = tAccount("Rent receivable account", [["31 Dec 2025", "Income statement", kInc]], [["1 Jan 2025", "Received in advance b/d", k.oAdv], ["Various", "Bank", k.rec]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026", cd: "Received in advance c/d", bd: "Received in advance b/d" });
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Farai lets part of his warehouse in Mutare for US\\$760 a month. On 1 January 2025 the tenant had paid US\\$380 in advance. During 2025 Farai received US\\$9,460 from the tenant. His year end is 31 December.",
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: kInc, stem: "Calculate the rent receivable for 2025 to be shown in the income statement.", explanation: "760 × 12 = 9,120." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: kClose, wrong: [r2(k.rec - kInc)], stem: "Calculate the rent received in advance at 31 December 2025.", explanation: `380 + 9,460 − 9,120 = ${f(kClose)}.` }),
      P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the rent receivable account for 2025, bringing down the balance on 1 January 2026.", points: ["Received in advance b/d 380 on the credit side", "Bank 9,460 on the credit side", "Income statement 9,120 on the debit side", "Received in advance c/d 720 on the debit side, totals 9,840, balance b/d 720 on the credit side"], modelAnswer: kMd, explanation: "Income in advance is carried down on the debit side and brought down as a credit." }),
      P.mcq({ label: "(d)", stem: "How is the balance brought down on 1 January 2026 shown in the statement of financial position at 31 December 2025?", options: [["Current liability: other payables", "Correct."], ["Current asset: other receivables", "A credit balance in advance is owed by the business."], ["Non-current liability", "It will be earned within a year."], ["Deducted from rent receivable in the next year's income statement", "It is part of next year's income, not a deduction."]], answer: "A", explanation: "Rent received in advance is a current liability." }),
    ],
    hints: ["Earned = 12 months; compare with opening advance + cash received."],
    explanation: "This item practises an income account with opening and closing amounts in advance.",
  });

  // Practice structured 2: several incomes and expenses, SOFP current items
  const d = { gp: 26400, rentRec: 5200, rentAcc: 400, comRec: 2890, comAdv: 310, intRec: 180, exps: 19650 };
  const rentI = r2(d.rentRec + d.rentAcc), comI = r2(d.comRec - d.comAdv);
  const totInc = r2(d.gp + rentI + comI + d.intRec);
  const np = r2(totInc - d.exps);
  check("np", np, 15110);
  const isMd = statement("for the year ended 31 December 2025", [["Gross profit", null, d.gp], ["Add: Rent receivable (5,200 + 400)", null, rentI], ["Add: Commission receivable (2,890 − 310)", null, comI], ["Add: Interest receivable", null, d.intRec], [null, null, totInc], ["Less: Expenses", null, -d.exps], ["**Profit for the year**", null, `**${f(np)}**`]], { checks: [["totInc", totInc, 34760]] });
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Chipo runs an agricultural supplies shop in Chinhoyi. For the year ended 31 December 2025:\n\n" +
      table(["Item", U], [["Gross profit", d.gp], ["Rent receivable received", d.rentRec], ["Commission receivable received", d.comRec], ["Interest receivable received", d.intRec], ["Total expenses (already adjusted)", d.exps]]) +
      "\n\nAt 31 December 2025: rent of US\\$400 was due from the tenant but not received; commission of US\\$310 had been received in advance. There were no opening balances.",
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: rentI, stem: "Calculate the rent receivable for the year.", explanation: "5,200 + 400 = 5,600." }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: comI, wrong: [r2(d.comRec + d.comAdv)], stem: "Calculate the commission receivable for the year.", explanation: "2,890 − 310 = 2,580." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: np, wrong: [r2(d.gp + d.rentRec + d.comRec + d.intRec - d.exps)], stem: "Calculate the profit for the year.", explanation: `26,400 + 5,600 + 2,580 + 180 − 19,650 = ${f(np)}.` }),
      P.manual({ label: "(d)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare an extract of the income statement (statement of profit or loss) from gross profit to profit for the year.", points: ["Heading with the year end; other incomes added to gross profit", "Rent 5,600, commission 2,580 and interest 180; total 34,760", "Expenses deducted; profit 15,110"], modelAnswer: `**Chipo's Agro Supplies**\n\n**Income statement (extract)**\n\n${isMd}`, explanation: "Adjusted incomes are added to gross profit." }),
      P.manual({ label: "(e)", marks: 2, stem: "State how the two adjustments appear in the statement of financial position at 31 December 2025.", points: ["Rent due 400: current asset, other receivables", "Commission in advance 310: current liability, other payables"], modelAnswer: "Rent receivable due of US\\$400 under current assets (other receivables); commission received in advance of US\\$310 under current liabilities (other payables).", explanation: "Each adjustment appears in both statements." }),
    ],
    hints: ["Add income due; deduct income received in advance."],
    explanation: "This item practises adjusting other income.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for income received during the year that belongs to the next year.",
    accepted: ["income received in advance", "prepaid income", "income in advance", "deferred income"],
    explanation: "Income received in advance (prepaid income) is a current liability.",
  });

  b.card("DEFINITION", "Accrued income", "Income earned this year but not yet received; a current asset (other receivables).");
  b.card("DEFINITION", "Income received in advance", "Income received this year for next year; a current liability (other payables).");
  b.card("FORMULA", "Income for the year", "Received − opening accrued + opening in advance + closing accrued − closing in advance.");
  b.card("FACT", "Accrued income in the ledger", "Accrued c/d on the credit side; accrued b/d on the debit side.");
  b.card("FACT", "Income in advance in the ledger", "Received in advance c/d on the debit side; b/d on the credit side.");
  b.card("FACT", "Where does other income go?", "Added to gross profit in the income statement (not to sales).");
  b.card("CONCEPT", "Why is income in advance a liability?", "The business owes the service (or a refund) until it is earned.");
  b.card("FACT", "Journal for accrued income", "Dr Other receivables; Cr Income account.");
});
