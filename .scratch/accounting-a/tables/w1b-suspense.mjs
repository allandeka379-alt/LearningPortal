// Lesson: verification.suspense
import { t, money, fmt, check, chk, r2, sum, table, statement, journal, tAccount } from "../lib.mjs";
import { writeLesson, U } from "./w1b-lib.mjs";

// True trial balance (Rudo's bakery, Harare) and the three errors that upset it.
const accts = [
  // [account, true debit, true credit, effect of error on draft balance (signed amount added to the draft balance on its own side)]
  ["Premises", 60000, null, 0],
  ["Plant and equipment", 18500, null, 0],
  ["Inventory at 1 January 2025", 5200, null, 0],
  ["Purchases", 52800, null, 0],
  ["Sales", null, 96740, -740],
  ["Wages", 14600, null, 0],
  ["Insurance", 4300, null, -1500],
  ["Rent", 3600, null, 0],
  ["Trade receivables", 9400, null, 0],
  ["Bank", 6240, null, 0],
  ["Trade payables", null, 7600, 540],
  ["Drawings", 12000, null, 0],
  ["Capital", null, 82300, 0],
];
const trueDr = sum(accts.map((a) => a[1]));
const trueCr = sum(accts.map((a) => a[2]));
check("true TB", trueDr, trueCr);
const draft = accts.map(([n, d, c, e]) => [n, d === null ? null : d + e, c === null ? null : c + e]);
const draftDr = sum(draft.map((a) => a[1]));
const draftCr = sum(draft.map((a) => a[2]));
const diff = r2(draftCr - draftDr);
chk(diff, 1300);
const tbRows = [...draft.map(([n, d, c], i) => [n, d, c, accts[i][1], accts[i][2]]), ["Suspense", diff, null, null, null]];
const dTot = sum(tbRows.map((r) => r[1])); const cTot = sum(tbRows.map((r) => r[2]));
check("draft TB with suspense", dTot, cTot);
const t1 = table(["Account", `Draft debit ${U}`, `Draft credit ${U}`, `Corrected debit ${U}`, `Corrected credit ${U}`],
  [...tbRows, ["**Total**", `**${fmt(dTot)}**`, `**${fmt(cTot)}**`, `**${fmt(trueDr)}**`, `**${fmt(trueCr)}**`]]);

// Journals and suspense account
const j = journal([
  { date: "1", lines: [["Trade payables: Gweru Traders", 540, null], ["Suspense", null, 540]], narrative: "Payment of 540 credited to bank but not debited to the supplier" },
  { date: "2", lines: [["Suspense", 740, null], ["Sales", null, 740]], narrative: "Credit sale of 740 debited to the customer but not credited to sales" },
  { date: "3", lines: [["Insurance", 1500, null], ["Suspense", null, 1500]], narrative: "Insurance account under-added by 1,500" },
]);
const susp = tAccount("Suspense account", [["31 Dec", "Trial balance difference", 1300], ["31 Dec", "Sales", 740]], [["31 Dec", "Trade payables: Gweru Traders", 540], ["31 Dec", "Insurance", 1500]]);

// Corrected profit and working capital
const draftGP = 61800, draftPFY = 24300;
const corr = [["Sale of 740 not credited to sales", 740, 740], ["Insurance under-added by 1,500", 0, -1500], ["Repairs to van of 650 debited to motor vans (principle)", 0, -650], ["Payment of 540 not debited to supplier (balance sheet only)", 0, 0]];
const cGP = draftGP + sum(corr.map((c) => c[1]));
const cPFY = draftPFY + sum(corr.map((c) => c[2]));
chk(cGP, 62540); chk(cPFY, 22890);
const t3 = statement("Statement of corrected profit", [
  ["Draft figures", draftGP, draftPFY],
  ...corr.map(([l, g, p]) => [l, g || null, p || null]),
  ["Corrected figures", cGP, cPFY],
], { cols: ["Gross profit US\\$", "Profit for the year US\\$"], checks: [["gp", draftGP + sum(corr.map((c) => c[1])), cGP], ["pfy", draftPFY + sum(corr.map((c) => c[2])), cPFY]] });
const CA = 41200, CL = 19600;
const CL2 = CL - 540;
const t4 = statement("Corrected working capital", [
  ["Current assets (unchanged)", CA],
  ["Draft current liabilities", CL],
  ["Less trade payables overstated (payment not debited)", -540],
  ["Corrected current liabilities", CL2],
  ["Draft working capital (41,200 − 19,600)", CA - CL],
  ["Corrected working capital (41,200 − 19,060)", CA - CL2],
], { cols: [U], checks: [["wc", CA - CL2, 22140]] });

const body = t`
## Introduction

When Rudo's bakery in Harare adds up its trial balance, the credit column is US\$1,300 higher than the debit column. The accounts cannot be left in disagreement, and the final accounts cannot be delayed, so the difference is placed in a **suspense account**. The search for the errors then continues. Every error found is corrected by a journal that clears the suspense account until it has no balance.

This lesson follows the lessons on the trial balance and on errors. It is examined in ZIMSEC Papers 1 to 3 and in Cambridge Papers 1 and 2, usually as a journal, a suspense account, a corrected trial balance and a statement of corrected profit.

:::keyfact{title="ZIMSEC and Cambridge terms"}
Both boards use the **suspense account**. ZIMSEC may ask for the **corrected net profit** (or net loss); Cambridge asks for **profit for the year**, **gross profit** and **working capital**. A statement of financial position was formerly called a balance sheet.
:::

## Key definitions

:::definition{term="Suspense account"}
A temporary ledger account that holds the difference between the debit and credit totals of a trial balance until the errors that caused it are found and corrected.
:::

:::definition{term="One-sided entry"}
A transaction in which only the debit or only the credit entry has been made.
:::

:::definition{term="Corrected trial balance"}
A trial balance prepared after the errors are corrected, in which the totals agree and the suspense account has been cleared.
:::

:::definition{term="Statement of corrected profit"}
A statement that starts with the draft profit and adjusts it for the effect of each error to give the corrected profit.
:::

## Opening the suspense account

- If the **credit column is higher**, debit suspense with the difference, so debits are increased.
- If the **debit column is higher**, credit suspense with the difference.

The suspense balance is put in the trial balance only so that it agrees. It is not an asset or a liability.

## Which errors go through suspense

Only errors that **made the trial balance disagree** are corrected through suspense:

- one-sided entries;
- entries with different amounts on the debit and credit sides;
- addition errors in an account.

Errors that do not affect the trial balance (omission, commission, principle, original entry, reversal and compensating) are corrected directly between the accounts concerned, as in the previous lesson. One error may need both treatments, for example a payment recorded in the wrong account **and** on one side only.

A **balance omitted from the trial balance**, or copied wrongly, does not need a journal: only the trial balance is corrected.

## Rules for the correcting entries

1. Decide what has been left out or entered wrongly.
2. Make the entry to the account that was incorrect. The other half of the entry is the suspense account.
3. If suspense was debited when it was opened, errors that put debits short are corrected by **crediting** suspense; errors that put credits short are corrected by **debiting** suspense.
4. After the last error is corrected the suspense account balances at nil.

:::worked-solution[Example 1: clearing the suspense account]
Rudo's draft trial balance has credits of US\$${fmt(draftCr)} and debits of US\$${fmt(draftDr)}. The difference of US\$${fmt(diff)} is debited to a suspense account. Three errors are then found:

1. A payment of 540 to a supplier, Gweru Traders, was credited to bank but not debited to the supplier's account.
2. A credit sale of 740 was debited to the customer's account but not credited to sales.
3. The insurance account was added up 1,500 too low on the debit side.

${j}

${susp}

The suspense account balances with no remainder, so all the errors have been found. The corrected trial balance agrees at US\$${fmt(trueDr)}.
:::

:::worked-solution[Example 2: the draft and corrected trial balances]
The effect of the errors on the account balances is shown below. The sales balance was 740 too low, the insurance balance 1,500 too low and the trade payables balance 540 too high.

${t1}

The draft columns agree only because suspense is included. The corrected columns agree without it.
:::

## Corrected profit and working capital

Start with the draft figure and adjust it for each error. Remember:

- A change in sales or an expense changes gross profit or profit for the year.
- An error that affects only an asset or a liability changes the statement of financial position but not profit.
- Working capital is current assets less current liabilities; only errors that change a current asset or liability alter it.

:::worked-solution[Example 3: corrected profit and working capital]
Rudo's draft figures were gross profit US\$61,800, profit for the year US\$24,300, current assets US\$41,200 and current liabilities US\$19,600. In addition to the three errors above, repairs of 650 on a motor van were debited to the motor vans account (an error of principle, not involving suspense).

${t3}

The overstated trade payables are corrected by the entry in error 1, so current liabilities fall:

${t4}
:::

## Presentation in the statement of financial position

After the corrections the suspense account has no balance and does not appear. If a difference cannot be found before the statements are drawn up, the suspense balance is shown in the statement of financial position and the errors are reported to the owner; it is not hidden in another account.

## Common mistakes

:::mistake{title="Using suspense for every error"}
Errors that do not disturb the trial balance are corrected directly. Suspense is only for the errors that caused the difference.
:::

:::mistake{title="Debiting suspense when it should be credited"}
Look at the side on which suspense was opened. Errors that fix the debit shortage credit suspense.
:::

:::mistake{title="Forgetting that the draft profit is the starting point"}
A statement of corrected profit starts with the draft profit and adjusts it for each error. Do not recalculate the whole account.
:::

:::mistake{title="Changing profit for errors that affect only balance sheet items"}
A payment recorded on the supplier account changes trade payables, not profit.
:::

## Exam tips

:::exam-tip
ZIMSEC and Cambridge Papers 1 to 3 usually ask you to **state** the amount and side of the opening suspense entry, **prepare** the correcting journals, **prepare** the suspense account and **calculate** corrected profit. Check that the suspense account balances at nil: if it does not, an error has been missed or an entry is on the wrong side.
:::

:::exam-tip
For **explain** questions, say that suspense is temporary and that clearing it does not mean the books are free of other errors, because errors that do not affect the trial balance remain.
:::

## Summary

:::summary
- A trial balance difference is entered in a suspense account so that the trial balance agrees.
- Credits higher: debit suspense. Debits higher: credit suspense.
- Errors that caused the difference are corrected through suspense; others are corrected directly.
- When all errors are found the suspense account balances at nil.
- Corrected profit starts with the draft profit and adjusts for each error; working capital changes only for current items.
- Unresolved suspense balances are shown in the statement of financial position and reported.
:::
`;

writeLesson("verification/suspense", {
  key: "verification.suspense",
  title: "Suspense accounts, corrected trial balances and corrected profit",
  summary: "Open a suspense account for a trial balance difference, correct the errors through journals, clear the account, and work out corrected profit and working capital.",
  concepts: ["aacc.verification.suspense"],
  estimatedMinutes: 45,
}, body);
