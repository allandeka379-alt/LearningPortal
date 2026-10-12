// Lesson generator: ledger.irrecoverable-debts
import { statement, journal, table, check, sum, r2, t } from "../lib.mjs";
import { writeLesson, tAcct } from "./w1a-lib.mjs";

// Example 1: write-offs and recovery
const w1 = 1400;
const w2 = 550;
const rec = 300;
const written = sum([w1, w2]);
const idCharge = r2(written - rec);
check("idCharge", idCharge, 1650);
const idAcc = tAcct(
  "Irrecoverable debts account (year ended 31 December 2025)",
  [["Various", "Nyasha Stores", w1], ["Various", "Chipo Traders", w2]],
  [["Various", "Bank (debt recovered)", rec], ["31 Dec", "Statement of profit or loss", idCharge]],
  null,
);
check("idAcc totals", written, rec + idCharge);
const j1 = journal(
  [
    { date: "14 Mar", lines: [["Irrecoverable debts", w1, null], ["Nyasha Stores", null, w1]], narrative: "Debt written off: Nyasha Stores has been declared insolvent" },
    { date: "9 Sep", lines: [["Bank", rec, null], ["Irrecoverable debts", null, rec]], narrative: "Cash received from Gweru Trading, a debt written off in 2024" },
  ],
);

// Example 2: creating / increasing the allowance
const recvBefore = 50000;
const recvAfter = r2(recvBefore - written);
check("recvAfter", recvAfter, 48050);
const rate = 5;
const allowNeeded = r2((recvAfter * rate) / 100);
const allowOpen = 1900;
const increase = r2(allowNeeded - allowOpen);
check("allowNeeded", allowNeeded, 2402.5);
check("increase", increase, 502.5);
const allowAcc = tAcct(
  "Allowance for irrecoverable debts account",
  [["31 Dec 2025", "Balance c/d", allowNeeded]],
  [["1 Jan 2025", "Balance b/d", allowOpen], ["31 Dec 2025", "Statement of profit or loss (increase)", increase]],
  { side: "cr", date: "1 Jan 2026", details: "Balance b/d", amount: allowNeeded },
);
const j2 = journal([{ date: "31 Dec", lines: [["Irrecoverable debts (allowance adjustment)", increase, null], ["Allowance for irrecoverable debts", null, increase]], narrative: "Increase in the allowance from 1,900 to 2,402.50" }]);
const plTotal = r2(written - rec + increase);
check("plTotal", plTotal, 2152.5);
const pl = statement(
  "Statement of profit or loss (extract) for the year ended 31 December 2025",
  [
    ["Irrecoverable debts written off", null, written],
    ["Less: irrecoverable debts recovered", null, -rec],
    ["Increase in allowance for irrecoverable debts", null, increase],
    ["Total irrecoverable debts expense", null, plTotal],
  ],
  { cols: ["", "US\\$"], checks: [["pl", plTotal, 2152.5]] },
);
const net = r2(recvAfter - allowNeeded);
check("net", net, 45647.5);
const sofp = statement(
  "Statement of financial position (extract) at 31 December 2025",
  [
    ["Trade receivables", null, recvAfter],
    ["Less: allowance for irrecoverable debts", null, -allowNeeded],
    ["Net trade receivables", null, net],
  ],
  { cols: ["", "US\\$"], checks: [["net", net, 45647.5]] },
);

// Example 3: three years of allowance
const yrs = [
  ["2025", recvAfter, 5],
  ["2026", 36000, 5],
  ["2027", 41200, 4],
];
let open = 0;
const yrRows = [];
for (const [y, rc, rt] of yrs) {
  const need = r2((rc * rt) / 100);
  const open0 = y === "2025" ? allowOpen : open;
  const move = r2(need - open0);
  yrRows.push([y, rc, `${rt}%`, need, open0, move, move > 0 ? "Increase: expense" : move < 0 ? "Decrease: credit to profit" : "No change"]);
  open = need;
}
check("2026 need", 1800, r2(36000 * 0.05));
check("2027 need", 1648, r2(41200 * 0.04));
const tbl3 = table(["Year", "Trade receivables US\\$", "Rate", "Allowance required US\\$", "Opening allowance US\\$", "Movement US\\$", "Treatment"], yrRows, ["l", "r", "r", "r", "r", "r", "l"]);
const dec2026 = r2(2402.5 - 1800);
check("dec2026", dec2026, 602.5);
const dec2027 = r2(1800 - 1648);
check("dec2027", dec2027, 152);

const terms = table(
  ["ZIMSEC (common usage)", "Cambridge 9706"],
  [
    ["Bad debts; bad debts recovered", "Irrecoverable debts; irrecoverable debts recovered"],
    ["Allowance (older papers: provision) for doubtful debts", "Allowance for irrecoverable debts"],
    ["Debtors; income statement", "Trade receivables; statement of profit or loss"],
  ],
  ["l", "l"],
);

const body = t`
## Introduction

Tatenda sells building materials on credit to contractors in Gweru. In March a customer, Nyasha Stores, is declared insolvent and will never pay the US\$1,400 it owes. Tatenda cannot go on showing the debt as an asset. At the year end he also knows that, from experience, some of the remaining customers will not pay. The accounts must not overstate profit or assets, which is the **prudence** concept.

Both boards examine the ledger entries for writing off a debt, receiving a debt that was written off and creating, increasing and reducing an allowance. The same entries appear again in full sets of financial statements, so the ledger skills here are used throughout the course.

:::keyfact{title="ZIMSEC and Cambridge terms"}
${terms}

Cambridge papers say "irrecoverable debts" and "allowance for irrecoverable debts". ZIMSEC papers may say "bad debts" and "provision for doubtful debts"; use "allowance" because current practice has replaced "provision" for this purpose.
:::

## Key definitions

:::definition{term="Irrecoverable (bad) debt"}
An amount owed by a customer that the business has decided it will not be able to collect. It is written off as an expense.
:::

:::definition{term="Irrecoverable debt recovered"}
Cash received from a customer whose debt was written off in an earlier period. It is recorded as income (a credit that reduces the irrecoverable debts expense).
:::

:::definition{term="Allowance for irrecoverable (doubtful) debts"}
A credit balance, set up from profit, that reduces trade receivables to the amount expected to be collected. It is an estimate against debts that have not yet been identified as lost.
:::

:::keyfact{title="Write-off against allowance"}
A write-off deals with a **known** loss and goes through the customer's account. An allowance deals with an **expected** loss and goes through the allowance account. The customers' accounts are never changed by the allowance.
:::

## Writing off and recovering a debt

When a debt is known to be lost, debit **Irrecoverable debts** and credit the customer's account to remove the asset. If cash is later received from that customer, credit Irrecoverable debts with the cash received and debit Bank. Some businesses use a separate account for debts recovered; the effect on profit is the same.

## The allowance

1. Calculate the allowance **after** the known irrecoverable debts have been written off, as a percentage of the remaining trade receivables.
2. Compare it with the balance already on the allowance account (the opening balance).
3. The difference is the charge (an increase) or the credit (a decrease) to the statement of profit or loss.
4. The closing allowance is deducted from trade receivables in the statement of financial position.

Only the **change** in the allowance is charged to profit. Charging the whole closing allowance each year would count the same expectation twice.

:::worked-solution[Example 1: writing off and recovering debts]
In 2025 Tatenda writes off Nyasha Stores (US\$1,400) and Chipo Traders (US\$550). In September he receives US\$300 from Gweru Trading, a customer whose debt was written off in 2024.

${j1}

${idAcc}

The expense for the year from write-offs less recoveries is 1,650.
:::

:::worked-solution[Example 2: increasing the allowance]
Trade receivables at 31 December 2025 were US\$50,000 before the write-offs in Example 1. The allowance is to be 5% of the remaining trade receivables. The allowance account had a balance of US\$1,900 at 1 January 2025.

1. Receivables after write-offs: 50,000 - 1,400 - 550 = 48,050.
2. Allowance required: 48,050 × 5% = 2,402.50.
3. Increase: 2,402.50 - 1,900 = 502.50, charged to profit.

${j2}

${allowAcc}

${pl}

${sofp}
:::

:::worked-solution[Example 3: three years of movements]
The movement depends on the opening allowance, so a table makes the pattern clear. The 2026 and 2027 figures are given as assumptions.

${tbl3}

1. 2026: the allowance falls from 2,402.50 to 1,800. The reduction of 602.50 is **credited** to the statement of profit or loss (debit Allowance, credit Irrecoverable debts).
2. 2027: the rate is reduced to 4% of 41,200, giving 1,648. The reduction of 152 is again credited to profit.
3. In every year the closing allowance becomes the next year's opening allowance.
:::

## Prudence and the choice of rate

The allowance rate is a judgement based on the business's past experience of customers. A rate that is too low overstates profit and assets (imprudent); a rate that is too high understates them. A business may also use an **ageing schedule**, with higher percentages for older debts. Changing the rate to manage profit is not acceptable.

## Common mistakes

:::mistake{title="Charging the whole allowance each year"}
Only the increase or decrease in the allowance is an expense or a gain. The full closing allowance stays on the allowance account.
:::

:::mistake{title="Calculating the allowance before the write-offs"}
The percentage is applied to receivables remaining after known irrecoverable debts are written off.
:::

:::mistake{title="Crediting the customer's account with the allowance"}
The customer still owes the money. The allowance is a separate credit balance that is deducted in the statement of financial position.
:::

:::mistake{title="Treating a decrease as an expense"}
A reduction in the allowance increases profit. It is credited to the statement of profit or loss, normally by reducing the irrecoverable debts expense.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 2 and 3 ledger and statement questions, and Cambridge Papers 1 and 2, use this topic almost every series. For *calculate the charge to the statement of profit or loss* include write-offs, deduct recoveries and add or deduct the change in the allowance. Show the allowance calculation (receivables × rate) and the comparison with the opening balance.
:::

:::exam-tip
For *explain why an allowance is created* use the words *prudence*, *matching* and *not overstating profit or assets*, and link them to the fact that the loss is expected but not yet certain.
:::

## Summary

:::summary
- A known lost debt is written off: debit Irrecoverable debts, credit the customer.
- A recovery of a written-off debt is credited to Irrecoverable debts (or a recoveries account) and debited to Bank.
- The allowance is a percentage of receivables remaining after write-offs.
- Only the change in the allowance is charged (increase) or credited (decrease) to profit.
- In the statement of financial position the closing allowance is deducted from trade receivables.
- The allowance applies the prudence concept; the rate is a judgement, not a profit-smoothing device.
:::
`;

writeLesson(
  "ledger/irrecoverable-debts.md",
  {
    key: "ledger.irrecoverable-debts",
    title: "Irrecoverable (bad) debts, recoveries and allowances for doubtful debts",
    summary: "Write off irrecoverable debts, record recoveries, and create, increase or reduce an allowance as a percentage of trade receivables, with the charge to profit and the statement of financial position presentation.",
    concepts: ["aacc.ledger.irrecoverable-debts"],
    estimatedMinutes: 50,
    level: "core",
  },
  body,
);
