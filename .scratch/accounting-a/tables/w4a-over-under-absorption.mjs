// Lesson generator: cost.over-under-absorption
import { t, table, check, chk, r2, costing, fmt, tAccount, statement } from "../lib.mjs";
import { writeLesson, front } from "./w4a-lib.mjs";

// Example 1: over-absorption
const budOH = 96000, budMH = 12000;
const rate = costing.oar(budOH, budMH);
chk(rate, 8);
const actMH = 12900, actOH = 99300;
const absorbed = actMH * rate;
chk(absorbed, 103200);
const diff = costing.overUnder(absorbed, actOH);
chk(diff, 3900);
const spend = actOH - budOH; // adverse 3,300
const activity = (actMH - budMH) * rate; // 7,200
chk(activity - spend, diff);
const ex1 = table(["", "Working", "US\\$"], [
  ["Overhead absorbed", "12,900 hours × 8.00", absorbed],
  ["Actual overhead", "", -actOH],
  ["**Over-absorbed overhead**", "absorbed - actual", diff],
], ["l", "l", "r"]);
const causes1 = table(["Cause", "Working", "Effect on absorption US\\$"], [
  ["Overspending: actual overhead exceeds the budget", "99,300 - 96,000", -spend],
  ["Higher activity than budget", "(12,900 - 12,000) × 8.00", activity],
  ["**Net over-absorption**", "", diff],
], ["l", "l", "r"]);
const ctl = tAccount("Production overhead control account", [["31 Dec", "Various (actual overheads incurred)", actOH]], [["31 Dec", "Work in progress (12,900 hours × 8.00)", absorbed]], { cdDate: "31 Dec", cd: "Statement of profit or loss (over-absorbed)" }).split("\n").slice(0, -1).join("\n");
chk(actOH + diff, absorbed);

// Example 2: under-absorption and profit
const actMH2 = 11200, actOH2 = 98400;
const abs2 = actMH2 * rate;
chk(abs2, 89600);
const under = costing.overUnder(abs2, actOH2);
chk(under, -8800);
const profitBefore = 62000;
const profitAfter = profitBefore + under;
chk(profitAfter, 53200);
const ex2 = table(["", "Working", "US\\$"], [
  ["Overhead absorbed", "11,200 hours × 8.00", abs2],
  ["Actual overhead", "", -actOH2],
  ["**Under-absorbed overhead**", "absorbed - actual", under],
], ["l", "l", "r"]);
const prof = statement("Adjusting the profit for under-absorption (year 2)", [
  ["Profit using overheads absorbed at the budgeted rate", profitBefore],
  ["Less under-absorbed overhead", under],
  ["**Profit after adjustment**", profitAfter],
], { cols: ["US\\$"] });
const effectTab = table(["", "Over-absorbed", "Under-absorbed"], [
  ["Absorbed compared with actual", "Absorbed > actual", "Absorbed < actual"],
  ["Cost of products", "Overstated", "Understated"],
  ["Adjustment to profit", "Add (credit to profit or loss)", "Deduct (debit to profit or loss)"],
], ["l", "l", "l"]);

const terms = table(["ZIMSEC (syllabus and common usage)", "Cambridge 9706"], [
  ["Over-absorption; under-absorption (over- or under-recovery)", "Over-absorption; under-absorption"],
  ["Overhead control account", "Production overhead control account"],
  ["Adjustment to the profit for the period", "Adjustment to the profit in the statement of profit or loss"],
], ["l", "l"]);

const body = t`
## Introduction

Kariba Boats in Gweru builds fishing boats. At the start of the year it budgeted overheads of US\$96,000 and 12,000 machine hours, so it charged each boat US\$8.00 for every machine hour. At the year end the accounts show that the actual overheads were US\$99,300 and 12,900 machine hours were worked. The overhead charged to boats is not the same as the overhead actually spent. The difference is **over- or under-absorption**. Examiners expect you to calculate it, explain the causes, record it in the ledger and adjust the profit. It is tested in ZIMSEC Papers 2 and 3 and in Cambridge Paper 2 question 4.

You should be able to calculate an overhead absorption rate and to read a T account.

:::keyfact{title="ZIMSEC and Cambridge terms"}
${terms}

Both boards examine calculation, causes, ledger entries and the effect on profit. The overhead control account is shown in the ledger-account form in both syllabuses.
:::

## Key definitions

:::definition{term="Over-absorbed overhead"}
Overhead absorbed into production exceeds the actual overhead incurred. Cost of products has been overstated and profit is increased by the adjustment.
:::

:::definition{term="Under-absorbed overhead"}
Overhead absorbed into production is less than the actual overhead incurred. Cost of products has been understated and profit is reduced by the adjustment.
:::

:::definition{term="Production overhead control account"}
A ledger account in which actual overheads are debited and the overhead absorbed into work in progress is credited. Its balance is the over- or under-absorption.
:::

## Calculating the difference

:::keyfact{title="Over- and under-absorption"}
Over- or under-absorption = overhead absorbed - actual overhead.
Overhead absorbed = actual activity × pre-determined rate.
A positive answer is over-absorbed; a negative answer is under-absorbed.
:::

Because the rate was set from a forecast, the figures almost never agree exactly. There are two causes, and they can occur together:

1. **Activity differs from budget.** More hours than budgeted absorb more overhead than planned; fewer hours absorb less. Since a large part of the overhead is fixed, higher activity usually gives over-absorption.
2. **Actual spending differs from budget.** If the business spends more than the budget on overheads, absorption is lower than needed; if it spends less, absorption is higher.

:::worked-solution[Example 1: over-absorption at Kariba Boats]
Rate = 96,000 ÷ 12,000 = US\$8.00 per machine hour. Actual overhead was US\$99,300 and 12,900 machine hours were worked.

${ex1}

The difference can be explained by comparing activity with the budget and spending with the budget.

${causes1}

The activity effect of US\$7,200 (900 extra hours at US\$8.00) is greater than the overspending of US\$3,300, so overall the factory over-absorbed. In the ledger, actual overheads are debited to the control account over the year, and the absorbed overhead is credited as work in progress is charged. The balance is transferred to the statement of profit or loss.

${ctl}
:::

## Adjusting the profit

Products are costed at the absorbed overhead. If the overhead is under-absorbed, the cost of products was too low and the profit calculated with them is too high, so the under-absorbed amount is **deducted** from profit. If the overhead is over-absorbed, the profit is too low and the amount is **added**. The adjustment is made in the period in which it arises; there is no need to re-cost the inventory.

${effectTab}

:::worked-solution[Example 2: under-absorption in the following year]
In the next year Kariba Boats worked 11,200 machine hours and actual overheads were US\$98,400. The rate is still US\$8.00 an hour. Profit calculated using overheads absorbed at the budgeted rate was US\$62,000.

${ex2}

${prof}

Why under-absorbed? Hours were 800 below budget, so US\$6,400 less was absorbed than planned. Actual overhead exceeded the budget by US\$2,400. Together, 6,400 + 2,400 = US\$8,800. The business should ask whether the budget of 12,000 hours was too optimistic, and whether the rate for the next year should be raised.
:::

## Interpreting the amount

A large under-absorption means that products have been under-priced and the rate is too low. A large over-absorption means that prices may have been too high and customers may have been lost. Managers use the analysis of causes to decide whether to cut spending (when the cause is overspending), to change the budgeted activity (when the cause is activity) or to revise the rate. A small difference is normal and shows that the budget was reasonable.

## Common mistakes

:::mistake{title="Calculating actual minus absorbed"}
The syllabus convention is absorbed less actual. A positive result means over-absorbed; a negative result means under-absorbed. State the word as well as the sign.
:::

:::mistake{title="Using the actual activity to calculate the rate"}
The rate is based on budgeted figures. Actual activity is used to find the amount absorbed, not the rate.
:::

:::mistake{title="Adjusting profit in the wrong direction"}
Under-absorption means costs were not fully charged, so profit is reduced. Over-absorption increases profit.
:::

:::mistake{title="Forgetting the control account is cleared"}
After the balance is transferred to the statement of profit or loss the overhead control account has no balance. Do not carry the difference forward.
:::

## Exam tips

:::exam-tip
Over- and under-absorption appears in ZIMSEC Papers 2 and 3 and Cambridge Paper 2 question 4, often after an absorption rate calculation. For *calculate*, show absorbed overhead, actual overhead and the difference with the word over or under. For *prepare* the control account, put actual overheads on one side and absorbed overhead on the other, with the balance to profit or loss.
:::

:::exam-tip
For *explain* the causes, use figures: how many hours above or below budget, and how much more or less was spent than the budget. For *evaluate* or *advise*, say what management should do: revise the rate, improve the forecast or control the spending.
:::

## Summary

:::summary
- Over- or under-absorption = overhead absorbed (actual activity × budgeted rate) less actual overhead.
- Absorbed more than actual is over-absorbed; absorbed less is under-absorbed.
- Causes: activity different from budget, spending different from budget, or both.
- The difference is cleared to the statement of profit or loss: add for over-absorption and deduct for under-absorption.
- Large differences suggest a poor budget or an unsuitable rate.
:::
`;
writeLesson("cost/over-under-absorption.md", front("cost.over-under-absorption", "Over- and under-absorption of overheads", "Calculate over- or under-absorbed overhead, explain its causes, record it in the overhead control account and adjust the profit.", "aacc.cost.over-under-absorption", 50), body);
