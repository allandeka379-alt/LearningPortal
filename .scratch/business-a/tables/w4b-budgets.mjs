// Writes lessons/finance/budgets-variances.md from checked figures.
import { variances, table, chk, r2, fmt } from "../lib.mjs";
import { lesson, D } from "./w4b-lib.mjs";

const fa = (v) => (v.fa === "nil" ? "nil" : `${fmt(v.amount)} ${v.fa}`);
// Example 1
const bud = { rev: 48000, mat: 14400, lab: 9600, fix: 8000 }, act = { rev: 46500, mat: 15900, lab: 9000, fix: 8400 };
const bp = bud.rev - bud.mat - bud.lab - bud.fix, ap = act.rev - act.mat - act.lab - act.fix;
chk(bp, 16000); chk(ap, 13200);
const v = { rev: variances.revenue(bud.rev, act.rev), mat: variances.cost(bud.mat, act.mat), lab: variances.cost(bud.lab, act.lab), fix: variances.cost(bud.fix, act.fix), prof: variances.revenue(bp, ap) };
chk(v.rev.value, -1500); chk(v.mat.value, -1500); chk(v.lab.value, 600); chk(v.fix.value, -400); chk(v.prof.value, -2800);
chk(v.rev.value + v.mat.value + v.lab.value + v.fix.value, v.prof.value);
const t1 = table(["US\\$", "Budget", "Actual", "Variance"], [
  ["Sales revenue", bud.rev, act.rev, fa(v.rev)], ["Direct materials", bud.mat, act.mat, fa(v.mat)], ["Direct labour", bud.lab, act.lab, fa(v.lab)], ["Fixed overheads", bud.fix, act.fix, fa(v.fix)], ["**Profit**", bp, ap, fa(v.prof)],
], ["l", "r", "r", "r"]);
// Example 2: flexed
const units0 = 4000, units1 = 3800;
const price = 12, matU = 3.6, labU = 2.4;
chk(units0 * price, 48000); chk(units0 * matU, 14400); chk(units0 * labU, 9600);
const fx = { rev: units1 * price, mat: variances.flex(matU, units1), lab: variances.flex(labU, units1), fix: 8000 };
const fp = fx.rev - fx.mat - fx.lab - fx.fix;
chk(fx.rev, 45600); chk(fx.mat, 13680); chk(fx.lab, 9120); chk(fp, 14800);
const w = { rev: variances.revenue(fx.rev, act.rev), mat: variances.cost(fx.mat, act.mat), lab: variances.cost(fx.lab, act.lab), fix: variances.cost(fx.fix, act.fix), prof: variances.revenue(fp, ap) };
chk(w.rev.value, 900); chk(w.mat.value, -2220); chk(w.lab.value, 120); chk(w.fix.value, -400); chk(w.prof.value, -1600);
chk(w.rev.value + w.mat.value + w.lab.value + w.fix.value, w.prof.value);
const t2 = table(["US\\$", "Original budget (4,000 units)", "Flexed budget (3,800 units)", "Actual (3,800 units)", "Variance (flexed v actual)"], [
  ["Sales revenue", bud.rev, fx.rev, act.rev, fa(w.rev)], ["Direct materials", bud.mat, fx.mat, act.mat, fa(w.mat)], ["Direct labour", bud.lab, fx.lab, act.lab, fa(w.lab)], ["Fixed overheads", bud.fix, fx.fix, act.fix, fa(w.fix)], ["**Profit**", bp, fp, ap, fa(w.prof)],
], ["l", "r", "r", "r", "r"]);

const body = `
## Introduction

Sengwa Furniture is a fictional workshop in Kwekwe that makes school desks. At the start of each month the owner, Farai, writes down what he expects to sell and spend. At the end of the month he compares his plan with what actually happened. In October the workshop sold less than planned, spent more on timber and made US$2,800 less profit than planned. Farai now knows **what** went wrong; the next step is to find out **why** and what to do. A **budget** is the plan and the **variance** is the gap that tells managers where to look.

This lesson is tested in ZIMSEC Business Studies and Business Enterprise Skills (Form 6) and in Cambridge **AS Level** (Papers 1 and 2). You should know the main items in a statement of profit or loss and the idea of fixed and variable costs. All variances here are calculated in code and shown with F (favourable) or A (adverse).

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge |
| --- | --- |
| Budget; incremental, flexible and zero-based budgeting; BES: sales, purchases, cash and master budgets; adverse and favourable variances | Budgets and the measurement of performance; incremental, flexible and zero budgeting; adverse and favourable variances |

The cash, sales, purchases and master budgets are named in **Business Enterprise Skills**; Cambridge asks you to explain the purposes and types and to calculate and interpret variances.
:::

## Key definitions

:::definition{term="Budget"}
A financial plan for a future period, expressed in money, which sets targets for income and spending.
:::

:::definition{term="Variance"}
The difference between a budgeted figure and the actual figure.
:::

:::definition{term="Favourable variance"}
A variance that increases profit: revenue above budget or a cost below budget.
:::

:::definition{term="Adverse variance"}
A variance that reduces profit: revenue below budget or a cost above budget.
:::

## Purposes, benefits and drawbacks

Budgets are used to **plan** (set targets), **allocate resources** between departments, **control** spending (managers are responsible for their own budget), **coordinate** departments, **motivate** staff with targets and **monitor** performance by comparing actual results with the plan.

**Benefits:** targets give direction; spending is controlled; problems are found early; resources go where they are most needed; managers are held accountable. **Drawbacks:** forecasts may be wrong; setting budgets takes time and cost; budgets can be rigid and discourage change; managers may set easy targets or spend the whole budget to avoid a cut; and a budget imposed from above can demotivate staff.

### Types of budget

| Type | How it is set | Advantage | Drawback |
| --- | --- | --- | --- |
| **Incremental** | Last period's budget adjusted for inflation and expected changes | Quick and simple | Repeats past waste and inefficiency |
| **Flexible** | Adjusted for the actual level of output or sales | A fair comparison when output differs from the plan | More complex; needs costs split into fixed and variable |
| **Zero-based** | Every item is justified from zero each period | Removes waste; links spending to need | Time-consuming; may cause conflict over resources |

Business Enterprise Skills also names: a **sales budget** (expected sales), a **purchases budget** (goods to be bought), a **cash budget** (cash receipts and payments, like a cash flow forecast) and a **master budget** (the summary of the operating budgets, usually a budgeted profit statement and position).

## Variances

:::keyfact{title="Calculating variances"}
- Revenue or profit: variance = actual − budget (positive = favourable).
- A cost: variance = budget − actual (positive = favourable).
- A **flexed budget** restates variable items for the actual output: budget per unit × actual units; fixed costs stay as budgeted.
- Total profit variance = sum of the individual variances.
:::

Interpretation needs **reasons**, not just labels. An adverse materials variance may come from dearer timber, waste, theft or a poor quality supplier. A favourable labour variance may mean efficient working, or lower-grade workers who spoil the quality. Variances should be investigated where they are **large** or **repeated**, and the action taken must fit the cause.

:::worked-solution[Example 1: calculating variances]
**Context.** The budget and actual results for one month at Sengwa Furniture (a fictional business) are shown. The budget was based on 4,000 desks.

${t1}

1. Sales revenue: 46,500 − 48,000 = ${D}1,500 **adverse**.
2. Direct materials: 14,400 − 15,900 = ${D}1,500 **adverse** (a cost above budget).
3. Direct labour: 9,600 − 9,000 = ${D}600 **favourable**.
4. Fixed overheads: 8,000 − 8,400 = ${D}400 **adverse**.
5. Profit: 13,200 − 16,000 = ${D}2,800 **adverse**, which equals −1,500 − 1,500 + 600 − 400.
6. **Interpretation.** Profit is 17.5% below plan. Sales and materials account for ${D}3,000 of the adverse variances, which shows where to investigate first.
7. **Judgement.** The comparison is not fair, because the workshop made only 3,800 desks, not the budgeted 4,000. A flexed budget is needed before blaming managers.
:::

:::worked-solution[Example 2: case analysis, the flexed budget]
**Context.** The workshop made 3,800 desks. The budget assumed a selling price of ${D}12, materials of ${D}3.60 a desk and labour of ${D}2.40 a desk, with fixed overheads of ${D}8,000.

${t2}

**Point.** Once the budget is flexed to the actual output the picture changes.

**Application.** The flexed profit is ${D}14,800, so the profit variance is ${D}1,600 adverse, not ${D}2,800. The ${D}1,200 difference is simply the effect of making 200 fewer desks (200 × ${D}6 contribution per desk). Revenue is now ${D}900 **favourable**, because the average price received (${D}12.24) was higher than ${D}12. Materials are ${D}2,220 **adverse**, a large overspend.

**Analysis.** Materials cost ${D}4.18 a desk against the budgeted ${D}3.60. This points to dearer timber, waste or theft, and it is the real problem. Labour is slightly favourable at ${D}120 and fixed overheads ${D}400 adverse.

**Judgement.** The sales shortfall is partly a matter of volume, while the materials overspend needs action: check supplier prices, wastage and the stock records. The causes of the favourable revenue variance should also be checked in case the workshop is losing its low-price customers. The conclusions depend on the budget being realistic in the first place.
:::

## Common mistakes

:::mistake{title="Getting the direction of a cost variance wrong"}
A cost **below** budget is **favourable**; a cost **above** budget is **adverse**. For revenue and profit the opposite way round applies.
:::

:::mistake{title="Comparing actual results with an unflexed budget"}
If output differs from the plan, a flexed budget gives a fair comparison. Otherwise, variances are partly just a result of changed volume.
:::

:::mistake{title="Listing variances without explaining them"}
A variance is a signal. State a possible cause, the effect on profit and the action that should follow.
:::

## Exam tips

:::exam-tip
Business Studies and Business Enterprise Skills Papers 1 and 2 ask you to *state*, *outline*, *calculate* and *discuss* budgets and variances; Cambridge Papers 1 and 2 ask you to *explain*, *calculate*, *analyse* and *assess* them. Label each variance F or A, show the working, give a reason for the biggest variances and say what a manager should do. For *assess*, weigh the benefits against the drawbacks (forecast errors, rigidity, time) and reach a judgement.
:::

## Summary

:::summary
- A budget is a plan in money for a period; it is used to plan, control, allocate resources, coordinate and motivate.
- Incremental budgets adjust last year's figures; flexible budgets adjust to actual output; zero-based budgets justify every item from zero.
- Revenue and profit variance = actual − budget; cost variance = budget − actual; positive = favourable (F), negative = adverse (A).
- A flexed budget gives a fair comparison when actual output differs from the plan.
- Variances need investigation and action, not just labelling.
- Budgets are only as good as the forecasts behind them, and can be rigid or time-consuming.
:::
`;
lesson("finance/budgets-variances", { key: "finance.budgets-variances", title: "Budgets and variances", summary: "The purpose, benefits and drawbacks of budgets, incremental, flexible and zero-based budgeting (and BES budget types), and calculating and interpreting adverse and favourable variances.", concept: "abus.finance.budgets-variances", minutes: 55 }, body.replace(/US\$(?=\d)/g, "US\\$"));
