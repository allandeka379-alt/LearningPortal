// Lesson generator: cost.behaviour
import { t, table, check, chk, r2, costing, fmt } from "../lib.mjs";
import { writeLesson, front } from "./w4a-lib.mjs";

// Example 1: Harare Spring Water, fixed and variable costs
const rent = 12000, varPer = 0.4;
const levels = [10000, 20000, 30000];
const rows1 = levels.map((u) => {
  const tv = varPer * u;
  const total = rent + tv;
  return [fmt(u), rent, tv, total, (rent / u).toFixed(2), varPer.toFixed(2), (total / u).toFixed(2)];
});
chk(rows1[1][3], 20000);
const tab1 = table(["Bottles made", "Fixed cost US\\$", "Variable cost US\\$", "Total cost US\\$", "Fixed cost per bottle US\\$", "Variable cost per bottle US\\$", "Total cost per bottle US\\$"], rows1, ["r", "r", "r", "r", "r", "r", "r"]);

// Stepped cost
const stepRows = [4000, 5000, 6000, 10000, 11000].map((u) => {
  const n = Math.ceil(u / 5000);
  return [fmt(u), n, n * 1200];
});
chk(stepRows[3][2], 2400);
const tabStep = table(["Bottles made", "Supervisors needed", "Supervision cost US\\$"], stepRows, ["r", "r", "r"]);

// Example 2: high-low
const pts = [[2000, 1900], [3000, 2500], [3800, 2980], [4500, 3400], [2600, 2260]];
const hl = costing.highLow(pts);
chk(hl.variablePerUnit, 0.6, 1e-9);
chk(hl.fixed, 700, 1e-9);
const est = 700 + 0.6 * 3400;
chk(est, 2740);
const tabPts = table(["Month", "Units", "Total cost US\\$"], [["February", fmt(2000), 1900], ["March", fmt(3000), 2500], ["April", fmt(3800), 2980], ["May", fmt(4500), 3400], ["June", fmt(2600), 2260]], ["l", "r", "r"]);
const tabHL = table(["", "Units", "Cost US\\$"], [["Highest activity (May)", fmt(4500), 3400], ["Lowest activity (February)", fmt(2000), 1900], ["Difference", fmt(2500), 1500]], ["l", "r", "r"]);

const terms = table(["ZIMSEC (syllabus and common usage)", "Cambridge 9706"], [
  ["Semi-fixed or semi-variable cost", "Semi-variable cost"],
  ["Fixed, variable, stepped costs", "Fixed, variable, semi-variable, stepped costs"],
  ["Cost behaviour graphs (described)", "Described in words or from a table; not drawn in examinations"],
], ["l", "l"]);

const body = t`
## Introduction

Farai Mhlanga bottles spring water in Harare. His rent is US\$12,000 a month whether he fills 10 bottles or 30,000, while the plastic and caps cost US\$0.40 for every bottle. When a customer asks for 5,000 extra bottles he must know how his total cost will move, and what cost per bottle to use for a price. **Cost behaviour** describes how a cost changes when the level of activity changes. It is the base of break-even analysis, flexible budgets, marginal costing and decision making, so it is tested in ZIMSEC Papers 1 to 3 and in Cambridge Paper 1 and Paper 2 question 4.

You should know the cost terms of the previous lesson and be comfortable with simple algebra.

:::keyfact{title="ZIMSEC and Cambridge terms"}
${terms}

Both boards examine the high-low method. Graphs are described or interpreted from a table of figures, not drawn.
:::

## Key definitions

:::definition{term="Fixed cost"}
A cost that stays the same in total when activity changes within the relevant range, such as rent, insurance and a manager's salary. Fixed cost per unit falls as output rises.
:::

:::definition{term="Variable cost"}
A cost that changes in total in direct proportion to activity, such as materials and piece-rate wages. Variable cost per unit stays the same.
:::

:::definition{term="Semi-variable cost"}
A cost with a fixed part and a variable part, such as electricity with a standing charge plus a charge for each unit used. ZIMSEC also calls it semi-fixed.
:::

:::definition{term="Stepped cost"}
A cost that is fixed within a range of activity but jumps to a higher fixed amount when activity passes a limit, such as one supervisor for every 5,000 units.
:::

:::definition{term="Relevant range"}
The range of activity over which the assumed cost behaviour holds. Outside it, rent may rise or machines may be added, so estimates are unreliable.
:::

## Total cost and unit cost

Students often mix totals and unit costs. For a **fixed** cost the total is constant and the cost per unit falls as output rises. For a **variable** cost the total rises with output while the cost per unit is constant. The total cost per unit therefore falls as output rises, because the fixed cost is spread over more units. That is why selling more units usually raises profit per unit.

:::worked-solution[Example 1: fixed, variable and stepped costs for Harare Spring Water]
Fixed rent and wages are US\$12,000 a month; the variable cost is US\$0.40 a bottle.

${tab1}

The fixed cost per bottle falls from US\$1.20 at 10,000 bottles to US\$0.40 at 30,000, while the variable cost stays at US\$0.40. The total cost per bottle falls from US\$1.60 to US\$0.80.

The business also needs one supervisor (US\$1,200 a month) for every 5,000 bottles or part of that amount. This stepped cost behaves as follows.

${tabStep}

Supervision is fixed between 5,001 and 10,000 bottles and jumps at 10,001 bottles. Over a wide range of output, a stepped cost is sometimes approximated as fixed or as variable, depending on the size of the steps.
:::

## Graphs described in words

Examiners describe graphs rather than ask you to draw them. A fixed cost is a horizontal line at the fixed amount. A variable cost is a straight line through zero that slopes upward. A semi-variable cost is a straight upward line that starts on the vertical axis at the fixed element. A stepped cost is a flight of steps. The cost per unit of a fixed cost is a curve that falls as output rises.

## Separating a semi-variable cost: the high-low method

If a cost is semi-variable you often have total costs for several periods but not the split. The **high-low method** uses the periods with the highest and lowest activity.

1. Variable cost per unit = (cost at highest activity - cost at lowest activity) ÷ (highest activity - lowest activity).
2. Fixed cost = total cost at either level - variable cost per unit × activity at that level.
3. Estimate for any level in the relevant range = fixed cost + variable cost per unit × activity.

Use the highest and lowest **activity**, not the highest and lowest cost, although they are usually the same months. The method is quick but uses only two points, so unusual months make it inaccurate.

:::worked-solution[Example 2: electricity at a Mutare printing shop]
The shop records its electricity bill and the units of printing work done in five months.

${tabPts}

${tabHL}

Variable cost per unit = 1,500 ÷ 2,500 = US\$0.60. Fixed cost = 3,400 - (0.60 × 4,500) = 3,400 - 2,700 = US\$700. Check with the lowest month: 700 + (0.60 × 2,000) = 1,900, which agrees.

The estimated bill for 3,400 units is 700 + (0.60 × 3,400) = US\$${fmt(est)}. This is inside the range of 2,000 to 4,500 units, so the estimate is reasonable. An estimate for 9,000 units would be unreliable because costs may have a step at higher activity.
:::

## Why cost behaviour matters

Break-even analysis needs fixed and variable costs separated. Marginal costing values inventory at variable cost only. Budgets are flexed by changing the variable costs and holding fixed costs. Pricing and make-or-buy decisions compare the extra cost of units with the extra revenue. If a manager treats all costs as variable, he will wrongly think that cutting output by half halves total cost.

## Common mistakes

:::mistake{title="Saying fixed cost per unit is fixed"}
The total fixed cost is fixed. The fixed cost per unit falls as output rises. Variable cost per unit is the constant one.
:::

:::mistake{title="Choosing the high and low cost instead of the high and low activity"}
The high-low method compares the highest and lowest activity. Occasionally a month of high cost and middling activity is unusual and must not be used.
:::

:::mistake{title="Forgetting that fixed costs are fixed only in the relevant range"}
Rent may double if output doubles because a second building is needed. State the range when you use a fixed cost for an estimate.
:::

:::mistake{title="Subtracting the fixed cost from the wrong total"}
After finding the variable cost per unit, subtract variable cost for the same level (units × rate) from the total cost of that level, not from another level's cost.
:::

## Exam tips

:::exam-tip
Cost behaviour is tested in ZIMSEC Paper 1 (classification and the effect of changing output) and Papers 2 and 3 as part of break-even, budgeting and decision questions. Cambridge tests it in Paper 1 and in Paper 2 question 4. For *calculate* the high-low variable cost, show both differences and the division, then the fixed cost with a check. For *classify*, name the behaviour and give a reason.
:::

:::exam-tip
For *explain* or *describe*, use words such as "total", "per unit", "within the relevant range" and give one figure from the data. For *evaluate* an estimate, mention that the high-low method uses two points only and that behaviour may change outside the range.
:::

## Summary

:::summary
- Fixed costs stay the same in total within the relevant range; variable costs rise in proportion to output.
- Fixed cost per unit falls as output rises; variable cost per unit is constant.
- A semi-variable cost has a fixed element and a variable element; a stepped cost jumps at activity limits.
- High-low: variable rate = change in cost ÷ change in activity; fixed cost = total cost - variable cost at the same level.
- Estimates are reliable only inside the relevant range.
:::
`;
writeLesson("cost/behaviour.md", front("cost.behaviour", "Cost behaviour: fixed, variable, semi-variable and stepped costs", "Describe fixed, variable, semi-variable and stepped costs, work out total and unit cost at different outputs, and separate a semi-variable cost with the high-low method.", "aacc.cost.behaviour", 50), body);
