// W3a: irrecoverable (bad) debts and debts recovered.
import { concept, P, money, check, sum, r2, tAccount, journal } from "../lib.mjs";
import { table, U } from "../tables/w3a-lib.mjs";

const f = (v) => v.toLocaleString("en-GB", { maximumFractionDigits: 2, minimumFractionDigits: Number.isInteger(v) ? 0 : 2 });

concept("acc.adjustments.irrecoverable-debts", { file: "adjustments/irrecoverable-debts", keyPrefix: "adjustments.irrecoverable-debts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which entry writes off an irrecoverable (bad) debt owed by a customer?",
    options: [
      ["Debit irrecoverable debts; credit the customer's account", "Correct: an expense, and the debt is removed."],
      ["Debit the customer's account; credit irrecoverable debts", "This is the reverse entry (used to reinstate a debt)."],
      ["Debit sales; credit the customer's account", "Sales are not reduced by bad debts."],
      ["Debit irrecoverable debts; credit bank", "No cash is paid when a debt is written off."],
    ],
    answer: "A",
    explanation: "The expense account is debited and the customer is credited to clear the debt.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which accounting concept is the main reason for writing off irrecoverable debts?",
    options: [
      ["Prudence", "Correct: assets must not be overstated, and known losses are recognised."],
      ["Going concern", "Going concern is about the business continuing."],
      ["Duality", "Duality explains the two entries, not the reason."],
      ["Realisation", "Realisation is about when revenue is recognised."],
    ],
    answer: "A",
    explanation: "Keeping an uncollectable debt would overstate trade receivables and profit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the effect of writing off an irrecoverable debt of US\\$500?",
    options: [
      ["Profit and trade receivables both fall by US\\$500", "Correct."],
      ["Profit falls by US\\$500; cash falls by US\\$500", "No cash moves when a debt is written off."],
      ["Trade receivables fall by US\\$500; profit is unchanged", "The write-off is an expense, so profit falls."],
      ["Sales and trade receivables both fall by US\\$500", "Sales are not changed."],
    ],
    answer: "A",
    explanation: "Expense up 500 (profit down 500); trade receivables down 500; cash unchanged.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A debt of US\\$720 written off last year is received in full this year. What is the **first** entry under the recommended method?",
    options: [
      ["Debit the customer; credit irrecoverable debts recovered", "Correct: reinstate the debt before recording the receipt."],
      ["Debit bank; credit irrecoverable debts recovered", "This skips reinstating the customer's account."],
      ["Debit bank; credit the customer", "This is the second entry."],
      ["Debit irrecoverable debts recovered; credit the customer", "This is the reverse of the reinstatement."],
    ],
    answer: "A",
    explanation: "Reinstate first so the customer's record shows the debt was eventually paid; then debit bank, credit the customer.",
  });
  const pp = { owed: 3600, pct: 35 };
  const ppWo = r2(pp.owed * (1 - pp.pct / 100));
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "A customer owing US\\$3,600 is declared bankrupt and pays 35 cents in the dollar in full and final settlement. How much is written off?",
    options: [
      [money(ppWo), "Correct: 65% of 3,600."],
      [money(r2((pp.owed * pp.pct) / 100)), "This is the amount received."],
      [money(pp.owed), "Part of the debt was paid, so not all of it is written off."],
      [money(r2(pp.owed - 35)), "35 cents in the dollar means 35%, not 35 dollars."],
    ],
    answer: "A",
    explanation: `Received 35% × 3,600 = 1,260; written off 3,600 − 1,260 = ${f(ppWo)}.`,
  });
  check("ppWo", ppWo, 2340);
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "After the trial balance was prepared, a further debt of US\\$290 was found to be irrecoverable. Which pair of adjustments is needed in the financial statements?",
    options: [
      ["Add 290 to irrecoverable debts in the income statement and deduct 290 from trade receivables", "Correct: the adjustment affects both statements."],
      ["Add 290 to irrecoverable debts in the income statement and deduct 290 from cash at bank","Cash is not affected."],
      ["Deduct 290 from sales and from trade receivables", "Sales are not reduced."],
      ["Deduct 290 from trade receivables only", "The expense must also be recognised."],
    ],
    answer: "A",
    hints: ["Every year-end adjustment is used twice."],
    explanation: "Expense up 290 and trade receivables down 290.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: null,
    stem: "Why does the recommended method reinstate a recovered debt in the customer's account before recording the cash?",
    options: [
      ["So the customer's account shows a full history, including that the debt was paid", "Correct: useful if the customer later asks for credit."],
      ["Because cash can only be credited to an expense account", "Cash is credited to the customer, not an expense."],
      ["To increase the total of trade receivables shown at the year end","Trade receivables end up unchanged: debit and credit cancel."],
      ["Because the recovered amount must be added to sales", "Recoveries are other income, not sales."],
    ],
    answer: "A",
    hints: ["Think about what the credit controller sees in the account."],
    explanation: "Reinstatement keeps a complete record of the customer's payment history.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Writing off an irrecoverable debt reduces the business's bank balance.",
    answer: false,
    explanation: "False. No money is paid; the debt is simply removed.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Irrecoverable debts recovered are shown as other income (or deducted from irrecoverable debts) in the income statement.",
    answer: true,
    explanation: "True. The recovery increases profit in the year it is received.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each event with its double entry.",
    pairs: [["Debt written off", "Dr Irrecoverable debts, Cr Customer"], ["Written-off debt reinstated", "Dr Customer, Cr Irrecoverable debts recovered"], ["Cash received for reinstated debt", "Dr Bank, Cr Customer"], ["Year-end transfer of debts written off", "Dr Income statement, Cr Irrecoverable debts"]],
    explanation: "Write-off, reinstatement, receipt and closing transfer.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "A debt that will certainly not be paid is {{blank:a}}; a debt that might not be paid is {{blank:b}}. Only the first kind is written off.",
    blanks: [
      { id: "a", accepted: ["irrecoverable"], choices: ["irrecoverable", "doubtful"] },
      { id: "b", accepted: ["doubtful"], choices: ["doubtful", "irrecoverable"] },
    ],
    explanation: "Doubtful debts are covered by an allowance (provision); irrecoverable debts are written off.",
  });

  const t1 = { tr: 18650, wo: [430, 1125], rec: 0 };
  const t1v = r2(t1.tr - sum(t1.wo));
  b.num({
    d: 2, kind: "money", value: t1v, daily: true, wrong: [t1.tr],
    stem: "Trade receivables at 31 December 2025 were US\\$18,650 before two debts of US\\$430 and US\\$1,125 were written off. What are trade receivables after the write-offs?",
    explanation: `18,650 − 430 − 1,125 = ${f(t1v)}.`,
  });
  check("t1v", t1v, 17095);
  const t2 = { gp: 23480, exp: 14260, wo: 980, rec: 340 };
  const t2v = r2(t2.gp + t2.rec - t2.exp - t2.wo);
  b.calc({
    d: 3, kind: "money", value: t2v, calculator: true, wrong: [r2(t2.gp - t2.exp - t2.wo - t2.rec), r2(t2.gp - t2.exp)],
    stem: "Nyasha's gross profit for 2025 was US\\$23,480 and her other expenses were US\\$14,260. During the year she wrote off irrecoverable debts of US\\$980 and recovered US\\$340 from a customer whose debt had been written off in 2023. Calculate her profit for the year.",
    hints: ["A recovery is income; a write-off is an expense."],
    explanation: `23,480 + 340 − 14,260 − 980 = ${f(t2v)}. Treating the recovery as an expense gives 7,900.`,
  });
  check("t2v", t2v, 8580);

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Give **two** situations in which a business would write off a customer's debt as irrecoverable.",
    points: ["The customer is bankrupt / has gone out of business with no assets", "The customer has died with no estate, or cannot be traced / has left the country"],
    modelAnswer: "When the customer is declared bankrupt and cannot pay, and when the customer cannot be traced after leaving the area.",
    explanation: "A debt is written off only when there is no realistic chance of payment.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Sipho does not want to write off a debt of US\\$2,100 owed by a customer who has left the country, because 'it will make my profit look worse'. Advise him.",
    points: ["He should write it off: the debt will not be received, so it is not an asset", "Keeping it overstates trade receivables and profit (prudence)", "Users would be misled / he might take drawings based on a profit that does not exist"],
    modelAnswer: "Sipho should write the debt off. It cannot be collected, so leaving it in trade receivables overstates assets and profit, breaking the prudence concept. He and the bank would be misled and he might withdraw money the business never had.",
    hints: ["Which concept requires losses to be recognised?"],
    explanation: "A true and fair view needs the loss to be recognised.",
  });

  // Practice structured 1: journal and ledger
  const s = { mutsa: 1870, pct: 25, banda: 655, rec: 1240 };
  const sMutsaCash = r2((s.mutsa * s.pct) / 100);
  const sMutsaWo = r2(s.mutsa - sMutsaCash);
  const sTot = r2(sMutsaWo + s.banda);
  check("sTot", sTot, 2057.5);
  const jMd = journal([
    { date: "10 Mar 2025", lines: [["Bank", sMutsaCash, null], ["Irrecoverable debts", sMutsaWo, null], ["Mutsa Hardware", null, s.mutsa]], narrative: "Final dividend of 25 cents in the dollar received; balance written off" },
    { date: "28 Jun 2025", lines: [["Irrecoverable debts", s.banda, null], ["Banda Contractors", null, s.banda]], narrative: "Debt written off: customer cannot be traced" },
    { date: "5 Oct 2025", lines: [["Zuva Electrical", s.rec, null], ["Irrecoverable debts recovered", null, s.rec]], narrative: "Debt written off in 2024 reinstated" },
    { date: "5 Oct 2025", lines: [["Bank", s.rec, null], ["Zuva Electrical", null, s.rec]], narrative: "Amount received from Zuva Electrical" },
  ]);
  const idMd = tAccount("Irrecoverable debts account", [["10 Mar 2025", "Mutsa Hardware", sMutsaWo], ["28 Jun 2025", "Banda Contractors", s.banda]], [["31 Dec 2025", "Income statement", sTot]]);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Rudo sells electrical goods on credit in Gweru. During 2025:\n\n" +
      table(["Date", "Event"], [["10 Mar", "Mutsa Hardware, owing US\\$1,870, was declared bankrupt. A final payment of 25 cents in the dollar was received by bank transfer and the rest was written off."], ["28 Jun", "Banda Contractors, owing US\\$655, could not be traced. The debt was written off."], ["5 Oct", "Zuva Electrical paid US\\$1,240 by bank transfer. This debt had been written off in 2024."]]),
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: sMutsaWo, wrong: [sMutsaCash], stem: "Calculate the amount written off for Mutsa Hardware.", explanation: `Received 25% × 1,870 = ${f(sMutsaCash)}; written off ${f(sMutsaWo)}.` }),
      P.manual({ label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare journal entries to record the three events. Narratives are required.", points: ["10 Mar: Dr Bank 467.50 and Dr Irrecoverable debts 1,402.50", "Cr Mutsa Hardware 1,870", "28 Jun: Dr Irrecoverable debts 655, Cr Banda Contractors 655", "5 Oct: Dr Zuva Electrical 1,240, Cr Irrecoverable debts recovered 1,240", "5 Oct: Dr Bank 1,240, Cr Zuva Electrical 1,240", "Dates and narratives"], modelAnswer: jMd, explanation: "Reinstate the recovered debt before recording the receipt." }),
      P.num({ label: "(c)", marks: 1, kind: "money", value: sTot, stem: "Calculate the amount transferred from the irrecoverable debts account to the income statement for 2025.", explanation: `1,402.50 + 655 = ${f(sTot)}.` }),
      P.manual({ label: "(d)", marks: 2, type: "EXTENDED_RESPONSE", stem: "Prepare the irrecoverable debts account for 2025.", points: ["Debits: Mutsa Hardware 1,402.50 and Banda Contractors 655", "Credit: Income statement 2,057.50; totals"], modelAnswer: idMd, explanation: "The recovery is in a separate account." }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: r2(sTot - s.rec), wrong: [r2(s.rec + sTot)], stem: "Calculate the net effect of these events on Rudo's profit for 2025. Enter the amount by which profit is reduced.", explanation: "Expense 2,057.50 − recovery 1,240 = 817.50 reduction." }),
    ],
    hints: ["25 cents in the dollar = 25%.", "Recovered debts are income."],
    explanation: "This item practises writing off and recovering debts.",
  });

  // Practice structured 2: year-end adjustment effect
  const y = { tr: 26840, extra: 760, gp: 31250, exp: 18930, bdTb: 1150 };
  const yTr = r2(y.tr - y.extra);
  const yBd = r2(y.bdTb + y.extra);
  const yNp = r2(y.gp - y.exp - yBd);
  check("yNp", yNp, 10410);
  b.struct({
    d: 3, examStyle: true, skill: "APPLICATION", calculator: true, applies: null,
    stem: "Thandeka's trial balance at 31 December 2025 included trade receivables US\\$26,840 and irrecoverable (bad) debts US\\$1,150. Gross profit was US\\$31,250 and other expenses were US\\$18,930. After the trial balance was prepared, she learned that a customer owing US\\$760 had died with no estate.",
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: yBd, wrong: [y.bdTb], stem: "Calculate the irrecoverable debts expense for the year.", explanation: "1,150 + 760 = 1,910." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: yNp, wrong: [r2(y.gp - y.exp - y.bdTb)], stem: "Calculate the profit for the year.", explanation: `31,250 − 18,930 − 1,910 = ${f(yNp)}.` }),
      P.num({ label: "(c)", marks: 1, kind: "money", value: yTr, wrong: [y.tr], stem: "Calculate trade receivables to be shown in the statement of financial position.", explanation: "26,840 − 760 = 26,080." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the US\\$760 is written off now rather than when the customer's estate is finally closed.", points: ["It is already known the debt will not be received", "Prudence: losses are recognised as soon as they are known, so assets and profit are not overstated"], modelAnswer: "The loss is already certain, and prudence requires known losses to be recognised immediately so that trade receivables and profit are not overstated.", explanation: "Recognise known losses promptly." }),
    ],
    hints: ["A late write-off changes both the expense and trade receivables."],
    explanation: "This item practises a year-end write-off.",
  });

  b.card("DEFINITION", "Irrecoverable (bad) debt", "A debt the business is certain it will not receive; written off as an expense.");
  b.card("FACT", "Writing off a debt", "Dr Irrecoverable debts; Cr Customer (trade receivables).");
  b.card("FACT", "Debt recovered: two entries", "Dr Customer, Cr Irrecoverable debts recovered; then Dr Bank, Cr Customer.");
  b.card("FACT", "Where do irrecoverable debts go?", "Expense in the income statement; trade receivables are reduced.");
  b.card("FACT", "Where do debts recovered go?", "Other income in the income statement (or deducted from irrecoverable debts).");
  b.card("CONCEPT", "Concept behind writing off", "Prudence: do not overstate assets or profit; recognise known losses.");
  b.card("CONCEPT", "Irrecoverable vs doubtful", "Irrecoverable: will not be paid, written off. Doubtful: might not be paid, covered by an allowance.");
  b.card("FACT", "Effect on cash of a write-off", "None: no money moves.");
  b.card("FACT", "Terms", "ZIMSEC: bad debts. Cambridge: irrecoverable debts.");
});
