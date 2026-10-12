// Lesson: club.subscriptions
import { money, fmt, chk, r2, sum, table, statement } from "../lib.mjs";
import { writeLesson, U, subs } from "./w2b-lib.mjs";

const e1 = subs({ date0: "1 Jan 2025", date1: "31 Dec 2025", o: { arrears: 420, advance: 150 }, c: { arrears: 360, advance: 210 }, received: 8460, title: "Subscriptions account for the year ended 31 December 2025" });
chk(e1.income, 8340);
const ext1 = statement("Extracts at 31 December 2025", [
  ["Income and expenditure account: subscriptions", null, e1.income],
  ["Statement of financial position: current assets: subscriptions in arrears", null, 360],
  ["Statement of financial position: current liabilities: subscriptions received in advance", null, 210],
], { cols: [U, U] });

const e2 = subs({ date0: "1 Jul 2025", date1: "30 Jun 2026", o: { arrears: 300, advance: 120 }, c: { arrears: 240, advance: 180 }, received: 7380, writeOff: 120, title: "Subscriptions account for the year ended 30 June 2026" });
chk(e2.income, 7380);
chk(123 * 60, 7380);
const members = table(["Check", "Calculation", `US\\$`], [["Number of members × annual fee", "123 × 60", 7380], ["Subscriptions income from the account", "balancing figure", e2.income]], ["l", "l", "r"]);
const roll = table(["Item", "Effect on income (compared with cash received)"], [
  ["Arrears at the start of the year", "Deduct: the income was recorded last year"],
  ["Arrears at the end of the year", "Add: earned this year but not yet received"],
  ["Advance at the start of the year", "Add: received last year but earned this year"],
  ["Advance at the end of the year", "Deduct: received this year but belongs to next year"],
  ["Irrecoverable subscription written off", "Not deducted from income; it is an expense in the income and expenditure account"],
], ["l", "l"]);

const body = `
## Introduction

The main income of most clubs is the annual subscription paid by members. Some members pay late and fall into arrears; some pay early and are in advance. At Mutare Cricket Club the treasurer collects most fees in January, but a few members pay in December for the following year. The cash received in a year is therefore not the same as the subscriptions that belong to that year. A **subscriptions account** matches the cash to the year, and the figure that balances the account is the income for the income and expenditure account.

The topic is ZIMSEC Form 5 and, for Cambridge, A Level only (Paper 3). You should already know accruals and prepayments and the basic receipts and payments account.

:::keyfact{title="ZIMSEC and Cambridge terms"}
ZIMSEC: **subscriptions in arrears**, **subscriptions in advance**, **bad debts / irrecoverable subscriptions**. Cambridge: **subscriptions in arrears**, **subscriptions received in advance**, **irrecoverable subscriptions**. The method is the same for both.
:::

## Key definitions

:::definition{term="Subscriptions in arrears"}
Subscriptions that belong to the year (or an earlier year) but that members have not paid. They are a current asset.
:::

:::definition{term="Subscriptions received in advance"}
Subscriptions received in the year that belong to a later year. They are a current liability.
:::

:::definition{term="Irrecoverable subscription"}
A subscription in arrears that the club decides it will never receive. It is written off as an expense.
:::

## The subscriptions account

The account is a ledger account kept in the two-sided format.

- **Debit side:** arrears at the start (brought down), the income for the year (the balancing figure, transferred to the income and expenditure account) and any advance carried down.
- **Credit side:** advance at the start (brought down), cash received, subscriptions written off as irrecoverable, and arrears carried down.

The income for the year is therefore:

:::keyfact
Subscriptions income = cash received + irrecoverable subscriptions written off + closing arrears + opening advance − opening arrears − closing advance.
:::

The effects of the adjustments are easier to remember in a table.

${roll}

:::worked-solution[Example 1: arrears and advances]
Mutare Cricket Club has the following subscription balances: at 1 January 2025 arrears ${money(420)} and received in advance ${money(150)}; at 31 December 2025 arrears ${money(360)} and received in advance ${money(210)}. During 2025 subscriptions of ${money(8460)} were received.

1. Income = 8,460 + 360 + 150 − 420 − 210 = 8,340.

${e1.md}

${ext1}

The statement of financial position shows arrears among current assets and the advance among current liabilities.
:::

## Irrecoverable subscriptions and checking the answer

If a member has left and will never pay, the arrears are **written off**. The write-off reduces the arrears in the subscriptions account (a credit), but the loss is an **expense** (debit to the income and expenditure account). It is not deducted from the subscriptions income. If members pay the same fee each year, the income can be checked against **members × fee**.

:::worked-solution[Example 2: a write-off and a check on the answer]
Gweru Tennis Club has 123 members who each pay an annual fee of ${money(60)}. At 1 July 2025: arrears ${money(300)} and subscriptions received in advance ${money(120)}. During the year ended 30 June 2026 subscriptions of ${money(7380)} were received. Two members who owed ${money(120)} left the district and the club wrote off the amount. At 30 June 2026: arrears ${money(240)} and subscriptions received in advance ${money(180)}.

1. Income = 7,380 + 120 + 240 + 120 − 300 − 180 = 7,380.
2. The expense of 120 for the irrecoverable subscriptions is charged separately in the income and expenditure account.

${e2.md}

${members}

The two figures agree, so the working is reliable.
:::

## Subscriptions for an earlier or later period

If a member pays last year's fee this year, the cash is received this year but belongs to last year, so it is part of last year's arrears and does not add to this year's income. If a member pays next year's fee now, the amount is an advance. The subscriptions account handles both automatically through its opening and closing balances.

## Why the matching matters

Income belongs to the period in which it is earned, not the period in which cash is received (the accruals concept). Counting cash received would overstate the surplus in a year when many members paid late fees from before, and understate it when members pay early. The same logic applies to other items such as hall hire and insurance.

## Common mistakes

:::mistake{title="Deducting arrears at the end of the year"}
Closing arrears are **added** to the cash received: they are earned this year but not yet received. Opening arrears are deducted.
:::

:::mistake{title="Deducting the write-off from the income"}
The income is found first with the write-off on the credit side of the account. The loss is charged as an expense.
:::

:::mistake{title="Showing the advance as an asset"}
Subscriptions received in advance are a liability, because the club must give the member the service in the future.
:::

:::mistake{title="Putting the balancing figure on the wrong side"}
The income is a debit balancing figure (transferred to the income and expenditure account), not a credit.
:::

## Exam tips

:::exam-tip
ZIMSEC Papers 2 and 3 and Cambridge Paper 3 test this topic with club accounts. With **prepare** the subscriptions account, label the opening and closing balances and the balancing figure. With **calculate** the income, show the formula. With **explain**, say that the statement of financial position shows arrears as a current asset and advances as a current liability.
:::

## Summary

:::summary
- The subscriptions account matches cash received to the year; the balancing figure is the income.
- Income = cash + closing arrears + opening advance − opening arrears − closing advance (+ write-offs on the credit side).
- Arrears are a current asset; subscriptions in advance are a current liability.
- A write-off is an expense, not a deduction from income.
- Check the income against members × fee when the fee is constant.
- Income is matched to the period in which it is earned.
:::
`;

writeLesson("club/subscriptions", {
  key: "club.subscriptions",
  title: "Subscriptions: advance, arrears and the subscriptions account",
  summary: "Prepare the subscriptions account of a club, deal with arrears, advances and irrecoverable subscriptions and calculate subscriptions income for the year.",
  concepts: ["aacc.club.subscriptions"],
  estimatedMinutes: 40,
}, body);
