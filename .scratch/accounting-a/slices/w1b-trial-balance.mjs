// W1b: ledger.trial-balance
import { concept, P, money, fmt, check, chk, r2, sum, rd, table, trialBalance } from "../lib.mjs";
import { mc, U } from "../tables/w1b-lib.mjs";

concept("aacc.ledger.trial-balance", { file: "ledger/trial-balance", keyPrefix: "ledger.trial-balance" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What does a trial balance that agrees show?",
    right: ["The total of the debit balances equals the total of the credit balances", "Correct: it is an arithmetic check on the double entry."],
    wrong: [["That every transaction of the year has been recorded in the ledger", "Omitted transactions leave the totals equal."], ["That the profit shown by the final accounts will be correct", "Entries in the wrong account leave the totals equal."], ["That each entry has been posted to the correct ledger account", "Errors of commission do not affect the totals."]],
    explanation: "An agreeing trial balance shows only that debits equal credits for the balances listed.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these accounts has a **debit** balance in a trial balance?",
    right: ["Drawings", "Correct: drawings are recorded with a debit and reduce capital."],
    wrong: [["Capital", "Capital is a credit balance: it is owed to the owner."], ["Returns outwards", "Returns outwards reduce purchases and are credit balances."], ["Allowance for irrecoverable debts", "Allowances and provisions are credit balances."]],
    explanation: "Assets, expenses, purchases, returns inwards and drawings are debit balances.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In which column does a bank overdraft appear in the trial balance?",
    right: ["Credit, because it is a liability", "Correct: the bank is owed money."],
    wrong: [["Debit, because it is a bank account", "A debit bank balance means the business has funds in the bank."], ["Debit, because it is an expense", "An overdraft is a liability; interest on it is the expense."], ["It is not shown, because it is a temporary balance", "All ledger balances are listed."]],
    explanation: "An overdrawn bank account has a credit balance, so it is listed in the credit column.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "The debit column of a trial balance is US\\$1,440 higher than the credit column. Which error could explain this?",
    right: ["A credit balance of US\\$1,440 was left out of the trial balance", "Correct: the credit column is short by 1,440."],
    wrong: [["A debit balance of US\\$1,440 was left out of the trial balance", "That would make the debit column lower."], ["A debit balance of US\\$1,440 was entered in the credit column", "That would make the credit column higher by 2,880 relative to debits."], ["A sale of US\\$1,440 was posted to the sales account but not to the customer's account", "The debit entry is missing, which makes the debit column lower."]],
    hints: ["Which column is short?"],
    explanation: "Debits exceed credits by 1,440, so credits are 1,440 short: a credit balance omitted.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A trial balance does not agree: the difference is US\\$270. Which single error would produce exactly this difference?",
    right: ["US\\$4,580 was entered as US\\$4,850", "Correct: a transposition; 4,850 − 4,580 = 270."],
    wrong: [["US\\$4,580 was entered as US\\$4,805", "The difference would be 225."], ["US\\$4,580 was entered as US\\$4,508", "The difference would be 72."], ["US\\$4,580 was entered as US\\$5,480", "The difference would be 900."]],
    hints: ["Work out each difference."],
    explanation: "Transpositions give differences divisible by 9; only 4,850 − 4,580 equals 270.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement about the trial balance is correct?",
    right: ["It provides the balances from which the final accounts are prepared", "Correct."],
    wrong: [["It is part of the double entry system", "It is only a list; no entries are made in it."], ["It replaces the need to balance each ledger account", "The ledger accounts are balanced first."], ["It is a legal document that must be sent to the tax authority", "It is an internal check, not a statutory report."]],
    hints: ["What is the trial balance used for after it agrees?"],
    explanation: "The trial balance is a list of balances and the starting point for the statement of profit or loss and statement of financial position.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "After correcting an addition error, a trial balance agrees. Which conclusion is justified?",
    right: ["The ledger debits and credits are equal, but some errors may remain", "Correct: many errors do not affect the totals."],
    wrong: [["The profit shown in the final accounts will be correct", "The profit could still be wrong, for example from an error of principle."], ["All sales and purchases have been recorded", "Complete omissions do not affect the totals."], ["The ledger contains no errors", "Compensating errors are hidden by agreeing totals."]],
    hints: ["Think about errors that do not upset the totals."],
    explanation: "The only safe conclusion is arithmetical agreement of the listed balances.",
  });

  // --- True / false
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The capital account of the owner normally appears as a credit balance in the trial balance.",
    answer: true,
    explanation: "True. Capital is owed by the business to the owner.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "If the trial balance agrees, the statement of profit or loss prepared from it must be correct.",
    answer: false,
    explanation: "False. Errors such as omissions, errors of principle and compensating errors do not affect the totals.",
  });

  // --- Match
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each balance to the trial balance column in which it appears.",
    pairs: ["Carriage inwards", "Discount received", "Allowance for irrecoverable debts", "Drawings"],
    right: ["Debit", "Credit"],
    rightIndex: [0, 1, 1, 0],
    explanation: "Carriage inwards and drawings are debits; discount received and the allowance are credits.",
  });

  // --- Fill in the blank
  b.fib({
    d: 1, skill: "RECALL",
    stem: "Complete the sentences about the trial balance.",
    template: "A trial balance lists the {{blank:a}} of all ledger accounts. If the two columns do not agree, the difference is first entered in a {{blank:b}} account.",
    blanks: [
      { id: "a", accepted: ["balances"], choices: ["balances", "transactions", "totals of the journals"] },
      { id: "b", accepted: ["suspense"], choices: ["suspense", "control", "disposal"] },
    ],
    explanation: "The trial balance lists balances, and an unexplained difference is held in a suspense account until found.",
  });

  // --- Numerical
  const cap = { debits: [["Premises", 24200], ["Inventory at 1 January 2025", 6100], ["Purchases", 39600], ["Wages", 8400], ["Trade receivables", 5600], ["Bank", 3790], ["Drawings", 5000]], credits: [["Sales", 61500], ["Trade payables", 6250], ["Loan from bank", 12000]] };
  const capDr = sum(cap.debits.map((x) => x[1]));
  const capCr = sum(cap.credits.map((x) => x[1]));
  const capV = r2(capDr - capCr);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: capV, wrong: [r2(capDr + capCr), r2(capCr - capDr)],
    stem: `Chipo's trial balance at 31 December 2025 is complete except for capital. The debit balances and credit balances are:\n\n${table(["Debit balances", U], cap.debits)}\n\n${table(["Credit balances (excluding capital)", U], cap.credits)}\n\nCalculate the figure for capital that makes the two columns agree.`,
    hints: ["Total each column first."],
    explanation: `Debits ${fmt(capDr)}; credits other than capital ${fmt(capCr)}. Capital = ${fmt(capDr)} − ${fmt(capCr)} = ${fmt(capV)}.`,
  });
  const od = { overdraft: 1720, trueTotal: 126710 };
  const odDr = od.trueTotal + od.overdraft;
  const odCr = od.trueTotal - od.overdraft;
  b.num({
    d: 4, skill: "ANALYSIS", kind: "money", calculator: true,
    value: chk((odDr - odCr) / 2, 1720), wrong: [r2(odDr - odCr)],
    stem: `Thandeka's trial balance totals are: debit column ${money(odDr)}, credit column ${money(odCr)}. She discovers that one account, the bank overdraft, has been listed in the wrong column and that there is no other error. What is the amount of the bank overdraft?`,
    hints: ["Moving a balance from one column to the other changes the difference by twice its amount."],
    explanation: "The difference is 128,430 − 124,990 = 3,440. A balance in the wrong column causes a difference of twice its amount, so the overdraft is 3,440 ÷ 2 = 1,720. Moving it to the credit column gives totals of 126,710 each.",
  });
  const col = [["Motor vehicle", 17500], ["Purchases", 28450], ["Returns inwards", 690], ["Wages", 9200], ["Electricity", 1080], ["Drawings", 3600], ["Trade receivables", 4260], ["Inventory at 1 January 2025", 3950]];
  const colTot = sum(col.map((x) => x[1]));
  b.calc({
    d: 2, skill: "APPLICATION", kind: "money",
    value: colTot, wrong: [r2(colTot - 2 * 690), r2(colTot - 3600)],
    stem: `Nyasha's trial balance includes the following debit balances. Calculate the total of the debit column for these accounts.\n\n${table(["Account", U], col)}`,
    explanation: `Add all eight balances: ${col.map((x) => fmt(x[1])).join(" + ")} = ${fmt(colTot)}. Returns inwards and drawings are debits and must be included.`,
  });

  // --- Short answer
  b.short({
    d: 2, skill: "RECALL",
    stem: "In which column of the trial balance is the allowance for irrecoverable debts shown?",
    accepted: ["credit", "credit column", "the credit column", "credit side"],
    explanation: "An allowance reduces the receivables asset, so it has a credit balance.",
  });

  // --- Self-marked short answers
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** uses of a trial balance.",
    points: ["It checks that total debits equal total credits (arithmetic accuracy of the double entry)", "Explained: if the totals differ, an error has been made and must be found", "It provides the balances for preparing the statement of profit or loss and statement of financial position", "Explained: all the balances are listed in one place, so the statements can be drawn up from it"],
    modelAnswer: "A trial balance checks the arithmetic of the double entry: if the debit and credit totals differ, the books contain an error that must be found. It is also the source of the figures for the statement of profit or loss and statement of financial position, because every balance is listed in one place.",
    explanation: "Give each use and say why it helps.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** types of error that a trial balance would **not** reveal.",
    points: ["Names one type, such as omission of a transaction", "Explains why the totals still agree (both debit and credit are missing)", "Names a second type, such as an error of principle or compensating errors", "Explains why the totals still agree"],
    modelAnswer: "An error of omission leaves a transaction out of both accounts, so debits still equal credits. An error of commission puts an entry in the wrong account of the same class, so the debit and credit amounts are equal but the accounts are wrong.",
    hints: ["Think of errors where both sides of the entry are affected equally."],
    explanation: "Any two of omission, commission, principle, original entry, reversal and compensating errors, each with the reason.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Farai's trial balance agrees and he says: \"The books are now correct, so I can prepare the final accounts without checking anything else.\" Evaluate his statement.",
    points: ["Agreeing totals show only arithmetic accuracy", "Some errors (omission, principle, compensating) do not affect the totals", "Adjustments such as depreciation and accruals have still to be made", "Conclusion: he should review the ledger accounts and make adjustments first"],
    modelAnswer: "The statement is only partly right. An agreeing trial balance shows that debits equal credits, but errors such as omissions and errors of principle are not revealed. Adjustments for depreciation, accruals and inventory must also be made before the final accounts are reliable, so he should review the accounts first.",
    hints: ["What is the trial balance unable to detect?"],
    explanation: "A balanced judgement contrasts what the trial balance proves with what it does not.",
  });

  // --- Practice structured 1 (10 marks): prepare from a list
  const l1 = [
    ["Equipment", 12500, null], ["Motor van", 16400, null], ["Inventory at 1 January 2025", 5200, null], ["Purchases", 36900, null], ["Sales", null, 68200],
    ["Wages", 11800, null], ["Rent", 3600, null], ["Trade receivables", 6150, null], ["Trade payables", null, 5300], ["Bank overdraft", null, 1450],
    ["Loan from Mr Zhou", null, 9000], ["Drawings", 6200, null],
  ];
  const dr1 = sum(l1.map((x) => x[1]));
  const cr1 = sum(l1.map((x) => x[2]));
  const cap1 = r2(dr1 - cr1);
  const full1 = trialBalance("Sipho's welding shop: trial balance at 31 December 2025", [...l1, ["Capital", null, cap1]]);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Sipho runs a welding shop in Gweru. At 31 December 2025 the ledger balances, in no particular order, were:\n\n${table(["Account", "Balance", "Type"], l1.map(([a, d, c]) => [a, d ?? c, d ? "Debit" : "Credit"]))}\n\nSipho's capital account has not yet been balanced.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: dr1, wrong: [cr1], stem: "Calculate the total of the debit balances (excluding capital).", explanation: `Total debits ${fmt(dr1)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: cap1, wrong: [r2(dr1 + cr1)], stem: "Calculate the capital balance that makes the trial balance agree.", explanation: `Capital = ${fmt(dr1)} − ${fmt(cr1)} = ${fmt(cap1)}.` }),
      P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare Sipho's trial balance at 31 December 2025.", points: ["Correct heading with date", "Debit balances in the debit column (own figures)", "Credit balances including the bank overdraft and capital in the credit column", "Both totals agree at the correct figure"], modelAnswer: full1.md, explanation: "The overdraft is a credit balance." }),
      P.manual({ label: "(d)", marks: 2, stem: "State **two** errors which would not be revealed by the trial balance.", points: ["One valid error type (omission, commission, principle, original entry, reversal, compensating)", "A second valid error type"], modelAnswer: "An error of omission and an error of principle.", explanation: "Any two valid types." }),
    ],
    hints: ["Provisions and overdrafts are credit balances.", "Capital is the balancing figure."],
    explanation: "This item practises listing balances in the correct columns and finding capital as the balancing figure.",
  });

  // --- Practice structured 2 (12 marks): locating a difference
  const e = { total: 91450, rent: 600, disc: 330, wages: 5400, wagesWrong: 5040 };
  const effects = { rent: e.rent, disc: 2 * e.disc, wages: e.wages - e.wagesWrong };
  const diff = effects.rent + effects.disc + effects.wages;
  const drTot = e.total - diff + 0; // placeholder replaced below
  const trueTot = e.total;
  const draftDr = trueTot - effects.rent - e.disc - effects.wages;
  const draftCr = trueTot + e.disc;
  const diffC = r2(draftCr - draftDr);
  check("diff", diffC, effects.rent + effects.disc + effects.wages);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Rudo's trial balance for her bakery in Mutare at 31 December 2025 does not agree. The debit column totals ${money(draftDr)} and the credit column totals ${money(draftCr)}. An investigation finds three errors:\n\n1. A payment of ${money(e.rent)} for rent was credited to the bank account but the debit entry in the rent account was missed.\n2. The balance on the discount allowed account, ${money(e.disc)}, was entered in the credit column instead of the debit column.\n3. The balance on the wages account, ${money(e.wages)}, was copied into the trial balance as ${money(e.wagesWrong)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: diffC, wrong: [draftCr], stem: "Calculate the difference between the two columns.", explanation: `${fmt(draftCr)} − ${fmt(draftDr)} = ${fmt(diffC)}.` }),
      P.group({ label: "(b)", stem: "Calculate the effect of each error on the difference between the columns (the amount by which it makes the debit column too low relative to the credit column):", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: effects.rent, stem: "Error 1", explanation: "The debit of 600 is missing from the debit column." }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: effects.disc, wrong: [e.disc], stem: "Error 2", explanation: "The debit is missing (330) and the credit column is 330 too high: 660." }),
        P.num({ label: "(iii)", marks: 2, kind: "money", value: effects.wages, wrong: [e.wagesWrong], stem: "Error 3", explanation: "5,400 − 5,040 = 360." }),
      ] }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: trueTot, wrong: [draftDr], stem: "Calculate the total of each column after all three errors are corrected.", explanation: `Debit ${fmt(draftDr)} + 600 + 330 + 360 = ${fmt(trueTot)}; credit ${fmt(draftCr)} − 330 = ${fmt(trueTot)}.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Rudo also left a sale of US\\$1,480 out of the books completely. Explain why this error does not affect the trial balance.", points: ["Neither the debit entry nor the credit entry was made", "So the debit and credit totals are still equal"], modelAnswer: "The transaction was omitted from both the sales account and the receivable or bank account, so debits and credits are both lower by 1,480 and the totals still agree.", explanation: "An error of omission leaves equal totals." }),
    ],
    hints: ["Think about which column each error makes too low or too high.", "Add the effects together to check against the difference in (a)."],
    explanation: "This item practises analysing a trial balance difference into its causes.",
  });

  // --- Flashcards
  b.card("DEFINITION", "Trial balance", "A list of all ledger balances in a debit column and a credit column, to check that total debits equal total credits.");
  b.card("FACT", "Debit balances in a trial balance", "Assets, expenses, purchases, returns inwards, carriage inwards, drawings.");
  b.card("FACT", "Credit balances in a trial balance", "Capital, liabilities (including an overdraft and loans), income, sales, returns outwards, provisions and allowances.");
  b.card("CONCEPT", "What an agreeing trial balance proves", "Only that total debits equal total credits for the balances listed.");
  b.card("CONCEPT", "Errors not revealed by the trial balance", "Omission, commission, principle, original entry, reversal and compensating errors.");
  b.card("FACT", "Difference equal to twice a balance", "Suggests that balance was entered in the wrong column.");
  b.card("FACT", "Difference divisible by 9", "Suggests two digits were transposed, for example 4,580 written as 4,850.");
  b.card("FACT", "Where does an unexplained difference go?", "Into a suspense account, until the cause is found.");
  b.card("CONCEPT", "Use of the trial balance after it agrees", "It is the starting point for the statement of profit or loss and statement of financial position, after adjustments.");
});
