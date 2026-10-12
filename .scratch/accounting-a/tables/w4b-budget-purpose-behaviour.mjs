import { table, chk, r2, costing } from "../lib.mjs";
import { F, usd, p2, writeLesson, front } from "./w4b-lib.mjs";

// Example 1: limiting factor
const hours = 3600;
const prods = [
  { name: "Small pot", demand: 2000, hrs: 1, contribution: 6 },
  { name: "Large pot", demand: 1500, hrs: 2, contribution: 9 },
];
const needed = prods.reduce((s, p) => s + p.demand * p.hrs, 0);
chk(needed, 5000);
const ranked = costing.rankByLimitingFactor(prods.map((p) => ({ name: p.name, contributionPerUnit: p.contribution, resourcePerUnit: p.hrs })));
chk(ranked[0].perResource, 6); chk(ranked[1].perResource, 4.5);
const smallUnits = 2000, smallHrs = 2000;
const largeHrs = hours - smallHrs, largeUnits = largeHrs / 2;
chk(largeUnits, 800);
const contrib = smallUnits * 6 + largeUnits * 9;
chk(contrib, 19200);
const t1 = table(["Product", "Demand (units)", "Hours per unit", "Hours needed", "Contribution per unit US\\$", "Contribution per hour US\\$", "Rank"], [
  ["Small pot", F(2000), "1", F(2000), p2(6), p2(6), "1"],
  ["Large pot", F(1500), "2", F(3000), p2(9), p2(4.5), "2"],
  ["**Total hours needed**", "", "", `**${F(needed)}**`, "", "", ""],
  ["Hours available", "", "", F(hours), "", "", ""],
], ["l", "r", "r", "r", "r", "r", "r"]);
const t1b = table(["Budget produced", "Units", "Hours", "Contribution US\\$"], [
  ["Small pots (full demand)", F(smallUnits), F(smallHrs), F(smallUnits * 6)],
  ["Large pots (remaining hours ÷ 2)", F(largeUnits), F(largeHrs), F(largeUnits * 9)],
  ["**Total**", "", `**${F(hours)}**`, `**${F(contrib)}**`],
], ["l", "r", "r", "r"]);

// Example 2: slack
const requested = 56000, needed2 = 48000, slack = requested - needed2;
const actual = 49300;
chk(slack, 8000);
const slackPct = (slack / needed2) * 100;
chk(slackPct, 16.667, 0.01);
const varSlack = requested - actual;
const varReal = needed2 - actual;
chk(varSlack, 6700); chk(varReal, -1300);
const t2 = table(["", "Padded budget US\\$", "Realistic budget US\\$"], [
  ["Budget for the department's costs", requested, needed2],
  ["Actual costs", actual, actual],
  ["Variance", `${F(varSlack)} F`, `${F(Math.abs(varReal))} A`],
], ["l", "r", "r"]);

const body = `
## Introduction

Mutare Pottery sells clay pots to garden centres and hardware shops. At the start of each year the owner agrees with each manager what they plan to sell, produce, spend and earn, and she checks the plan every month against what happened. This planning and checking is **budgeting** and **budgetary control**. A budget is a plan expressed in money; budgetary control compares actual results with the budget and takes action on the differences. The topic is Form 6 for ZIMSEC and A Level only for Cambridge (Paper 4). You should know cost behaviour and variances; the next lessons show how each budget is prepared.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (Form 6) | Cambridge 9706 (A Level only) |
| --- | --- |
| Budget; budgetary control | Budget; budgetary control |
| Principal budget factor; limiting factor | Limiting (principal budget) factor |
| Master budget | Master budget (budgeted statement of profit or loss and statement of financial position) |
| Budget committee, budget holder | Budget holder; participation in budget setting |
:::

## Key definitions

:::definition{term="Budget"}
A quantified plan for a future period, prepared in advance, showing expected income, expenditure and resources for a business or a part of it.
:::

:::definition{term="Budgetary control"}
Comparing actual results with the budget, finding the variances, and acting on them.
:::

:::definition{term="Limiting (principal budget) factor"}
The resource or demand that limits what the business can do, for example sales demand, machine hours or cash. It is identified first because every other budget depends on it.
:::

:::definition{term="Budget slack"}
The deliberate overstatement of expected costs or understatement of expected sales when a manager prepares a budget, so that it is easy to meet.
:::

## Purposes of budgets

1. **Planning**: turns the strategy into figures for the year ahead.
2. **Co-ordination**: sales, production and purchasing budgets must fit each other; production cannot exceed what can be sold or stored.
3. **Communication**: managers learn what is expected of them.
4. **Control**: actual results are compared with the plan and variances are investigated.
5. **Motivation**: a fair, achievable target encourages effort.
6. **Authorisation**: a budget gives managers permission to spend up to an approved amount.

## Advantages and disadvantages

**Advantages:** it forces managers to plan; it shows problems early (for example a cash shortage); it co-ordinates departments; it helps allocate scarce resources; it gives a yardstick for judging performance. **Disadvantages:** it takes time and cost; it can become out of date quickly if conditions change (a budget set in January may not suit a year of rapidly changing prices); it may make managers spend up to the limit to avoid a cut next year; it may encourage slack and conflict between departments; and it can be seen as a threat if managers do not accept it. **Spreadsheets** make budgets quicker to build and let managers ask "what if" questions (what if sales are 10% lower?), but errors in formulas can go unseen and the quality of the plan still depends on the assumptions.

## The limiting factor

Every business has one resource that limits its plans first: customer demand, labour skills, machine capacity, materials or cash. This is the **principal budget factor**. The budget process begins with it. If demand is the limit, the sales budget is prepared first. If machine hours are the limit, the production budget is prepared first and sales are planned from what can be made. Budgets that ignore the limiting factor cannot be achieved.

:::worked-solution[Example 1: Mutare Pottery and scarce machine hours]
Demand for the coming year is ${F(2000)} small pots and ${F(1500)} large pots. The kiln has ${F(hours)} hours available. A small pot needs 1 hour, a large pot 2 hours. The contribution is US\\$6 for a small pot and US\\$9 for a large pot.

${t1}

Demand needs ${F(needed)} hours but only ${F(hours)} are available, so machine hours are the limiting factor. To make the most contribution, the pots with the highest contribution per hour are made first: the small pots (US\\$6.00 an hour against US\\$4.50).

${t1b}

The production budget is therefore ${F(smallUnits)} small pots and ${F(largeUnits)} large pots, not the 3,500 demanded, and the sales budget must be reduced to match. Budgeted contribution is ${usd(contrib)}. The remaining 700 large pots demanded cannot be made unless the business buys more kiln time.
:::

## Behavioural aspects

How people feel about a budget affects how well it works.

| Approach | Features | Effect |
| --- | --- | --- |
| Imposed (top-down) | Senior managers set the figures | Fast and consistent, but managers may reject targets they did not agree |
| Participative (bottom-up) | Managers help to set their own budgets | Better knowledge and commitment, but slack may appear |
| Targets too tight | Almost impossible to meet | Staff give up; may cheat or ignore the budget |
| Targets too easy | Always met | No motivation to improve; wasted resources |

**Incentives** such as bonuses for meeting the budget can motivate but may encourage managers to understate sales or overstate costs. **Slack** arises when managers add a safety margin.

:::worked-solution[Example 2: slack in a department budget]
A Mutare depot manager needs ${usd(needed2)} to run the depot for the year but asks for ${usd(requested)}. Actual costs are ${usd(actual)}.

Budget slack = ${F(requested)} - ${F(needed2)} = ${usd(slack)}, which is ${p2(slackPct)}% of the realistic need.

${t2}

With the padded budget the manager reports a favourable variance of ${usd(varSlack)} and looks efficient; against the realistic budget the depot overspent by ${usd(Math.abs(varReal))}. The padded budget hides the real position and ties up resources that other departments could have used. Involving managers, checking their figures against past results and linking rewards to real improvement all reduce slack.
:::

## Common mistakes

:::mistake{title="Starting every budget with sales"}
Sales is the usual limiting factor, but not always. If machine hours or materials are scarcer than demand, the production budget comes first.
:::

:::mistake{title="Confusing a budget with a forecast"}
A forecast predicts what will probably happen. A budget is a plan of what the business intends to achieve, with targets and responsibilities.
:::

:::mistake{title="Saying participation always improves a budget"}
Participation improves commitment and information, but it also invites slack. A balanced answer gives both effects.
:::

:::mistake{title="Listing purposes without applying them"}
Write the purpose and explain it in the business context: "control: the monthly comparison shows that wages are US\\$900 over budget so the manager can act".
:::

## Exam tips

:::exam-tip
Budget theory appears in ZIMSEC Paper 1 and in the written parts of Papers 2 and 3 (Form 6), and in Cambridge Paper 4 (A Level only). For *state* or *explain* purposes, give the purpose and a short reason or example. For *discuss behavioural aspects*, give a benefit and a problem of participation and say what targets motivate.
:::

:::exam-tip
For *identify the limiting factor* from a table, compare the requirement with the availability for each resource and name the one that is exceeded first. For *evaluate* or *advise*, balance the advantages (planning, control) with the limitations (cost, rigidity, slack) and end with a judgement for the business described.
:::

## Summary

:::summary
- A budget is a quantified plan; budgetary control compares actual with the budget and acts on variances.
- Purposes: planning, co-ordination, communication, control, motivation and authorisation.
- Disadvantages include cost, rigidity, slack and conflict; spreadsheets help but errors and poor assumptions remain a risk.
- The limiting (principal budget) factor is identified first and decides which budget is prepared first.
- Participation improves commitment but can create slack; targets should be achievable but demanding.
:::
`;
writeLesson("budget/purpose-behaviour.md", front("budget.purpose-behaviour", "Budgetary control: purpose, advantages and behavioural aspects", "Explain why businesses budget, the advantages and disadvantages of budgetary control, the limiting factor, budget slack and the behavioural effects of targets and participation.", "aacc.budget.purpose-behaviour", 45), body);
