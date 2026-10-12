// Lesson generator: cost.decisions
import { t, table, check, chk, r2, costing, fmt } from "../lib.mjs";
import { writeLesson, front } from "./w4a-lib.mjs";

// Example 1a: special order
const normal = 40, dm = 10, dl = 9, vo = 5, fixedAbs = 8;
const vc = dm + dl + vo;
chk(vc, 24);
const orderQty = 500, orderPrice = 28, extra = 300;
const contrib = (orderPrice - vc) * orderQty - extra;
chk(contrib, 1700);
const fullCost = vc + fixedAbs; // 32
const orderTab = table(["", "Per chair US\\$", "500 chairs US\\$"], [
  ["Special price", orderPrice, orderPrice * orderQty],
  ["Variable cost (10.00 + 9.00 + 5.00)", -vc, -vc * orderQty],
  ["Contribution", orderPrice - vc, (orderPrice - vc) * orderQty],
  ["Extra delivery cost for the order", "", -extra],
  ["**Gain from accepting**", "", contrib],
], ["l", "r", "r"]);
const absView = (orderPrice - fullCost) * orderQty;
chk(absView, -2000);

// Example 1b: make or buy
const units = 3000, makeVar = 9.5, avoidFixed = 1800, buyPrice = 11.2;
const makeCost = units * makeVar + avoidFixed;
const buyCost = units * buyPrice;
chk(makeCost, 30300); chk(buyCost, 33600);
const indiff = avoidFixed / (buyPrice - makeVar);
chk(indiff, 1058.8235294117646, 1e-6);
const mob = table(["", "Make US\\$", "Buy US\\$"], [
  ["Variable cost: 3,000 × 9.50", units * makeVar, ""],
  ["Avoidable fixed cost (supervisor and tooling)", avoidFixed, ""],
  ["Purchase: 3,000 × 11.20", "", buyCost],
  ["**Relevant cost**", makeCost, buyCost],
], ["l", "r", "r"]);

// Example 2: limiting factor
const items = [
  { name: "A", contributionPerUnit: 12, resourcePerUnit: 2, demand: 400 },
  { name: "B", contributionPerUnit: 15, resourcePerUnit: 3, demand: 300 },
  { name: "C", contributionPerUnit: 10, resourcePerUnit: 1, demand: 500 },
];
const ranked = costing.rankByLimitingFactor(items);
chk(ranked[0].perResource, 10); chk(ranked[1].perResource, 6); chk(ranked[2].perResource, 5);
let hoursLeft = 1900;
const plan = [];
for (const r of ranked) {
  const hrs = Math.min(hoursLeft, r.demand * r.resourcePerUnit);
  const u = hrs / r.resourcePerUnit;
  plan.push({ ...r, u, hrs });
  hoursLeft -= hrs;
}
chk(plan[0].u, 500); chk(plan[1].u, 400); chk(plan[2].u, 200);
const totContrib = plan.reduce((s, p) => s + p.u * p.contributionPerUnit, 0);
chk(totContrib, 12800);
const rankTab = table(["Product", "Contribution per unit US\\$", "Labour hours per unit", "Contribution per labour hour US\\$", "Maximum demand (units)", "Rank"], ranked.map((r, i) => [r.name, r.contributionPerUnit, r.resourcePerUnit, r.perResource, fmt(r.demand), i + 1]), ["l", "r", "r", "r", "r", "r"]);
const planTab = table(["Product", "Units made", "Hours used", "Contribution US\\$"], [
  ...plan.map((p) => [p.name, fmt(p.u), fmt(p.hrs), p.u * p.contributionPerUnit]),
  ["**Total**", "", fmt(plan.reduce((s, p) => s + p.hrs, 0)), totContrib],
], ["l", "r", "r", "r"]);

// Closure
const dep = table(["Department", "Sales US\\$", "Variable costs US\\$", "Contribution US\\$", "Avoidable fixed costs US\\$", "Gain or (loss) from keeping it US\\$"], [
  ["Haulage", 80000, 61000, 19000, 12000, 7000],
  ["Passenger buses", 54000, 49000, 5000, 9500, -4500],
], ["l", "r", "r", "r", "r", "r"]);

const terms = table(["ZIMSEC (syllabus and common usage)", "Cambridge 9706"], [
  ["Make or buy; special orders; closure of a department or product", "Make or buy; special order; closure of a product or business unit"],
  ["Limiting factor (scarce resource)", "Limiting factor (scarce resource)"],
  ["Cost-volume-profit analysis", "Cost-volume-profit analysis"],
], ["l", "l"]);

const body = t`
## Introduction

Chipo Mutasa manages a furniture workshop in Chitungwiza. In one week she receives a request for 500 chairs below her usual price, a quotation to buy a component she now makes, and a shortage of skilled hours that stops her making all she could sell. Each is a **short-run decision**. The right way to make each is to compare the **relevant costs and revenues**, supported by the non-financial factors. Short-run decisions are tested in ZIMSEC Papers 2 and 3 and in Cambridge Paper 2 question 4, usually as the last part of a long question with a recommendation.

You should know contribution, relevant costs and break-even analysis.

:::keyfact{title="ZIMSEC and Cambridge terms"}
${terms}

Both boards expect a recommendation supported by figures and a non-financial factor.
:::

## Key definitions

:::definition{term="Limiting factor"}
A scarce resource (such as labour hours, machine hours or material) that limits the output of the business. Where one exists, products are ranked by contribution per unit of the scarce resource.
:::

:::definition{term="Special order"}
A one-off order, usually at a price below the normal price, accepted if the extra revenue exceeds the extra cost and if there is spare capacity.
:::

:::definition{term="Avoidable fixed cost"}
A fixed cost that would stop if a decision were taken (for example a supervisor made redundant when a product line closes). Only avoidable costs are relevant.
:::

## Method for every decision

1. Identify the options.
2. List only the **relevant** costs and revenues: future cash flows that change. Ignore sunk costs, apportioned fixed overheads that do not change, and costs common to all options.
3. Compare the options (usually by contribution).
4. Consider **non-financial factors**: quality, reliability of supply, jobs and morale, reputation, effect on regular customers, ethics.
5. Make a recommendation and state the assumptions.

## Special orders and make-or-buy

A special order is worth accepting if the price exceeds the extra variable cost (plus any extra fixed costs) and there is spare capacity. The full cost, which includes an absorbed share of fixed overhead, is the wrong test.

For **make-or-buy**, compare the relevant cost of making (variable costs plus any avoidable fixed costs) with the purchase price. The decision also depends on quality, the reliability of the supplier and what the freed capacity could earn.

:::worked-solution[Example 1: a special order and a make-or-buy decision]
(a) Chitungwiza Furniture sells chairs at US\$40. The variable cost is US\$24 (materials 10, labour 9, variable overhead 5) and fixed overhead absorbed is US\$8 a chair, so the full cost is US\$32. A school offers US\$28 each for 500 chairs and the workshop has spare capacity. Delivery would cost an extra US\$300.

${orderTab}

On a full-cost basis the order loses (28 - 32) × 500 = US\$2,000, but fixed costs would be incurred anyway. The relevant analysis shows a gain of US\$1,700, so the order should be accepted, provided that regular customers do not learn of the low price and demand it too.

(b) The workshop makes 3,000 drawer handles a year at a variable cost of US\$9.50. Making them also needs a supervisor and tooling costing US\$1,800 a year that would be saved if handles were bought. A supplier offers them at US\$11.20.

${mob}

Making costs US\$3,300 less than buying, so the workshop should continue to make the handles. The two options cost the same at 1,800 ÷ (11.20 - 9.50) = about 1,059 handles a year; below that quantity buying is cheaper. A reliable supplier and spare capacity for other work would be non-financial reasons to buy.
:::

## Closing a department or product

A department that makes a loss should be closed only if its closure improves the business as a whole. Compare the **contribution lost** with the **avoidable fixed costs saved**. If the department's contribution exceeds its avoidable fixed costs, keep it, even if it shows a loss after apportioned fixed costs.

${dep}

The haulage department adds US\$7,000 to the business and should stay. The bus department's contribution of US\$5,000 does not cover its avoidable fixed costs of US\$9,500, so closing it improves profit by US\$4,500, subject to the loss of jobs, passenger goodwill and any link with the other department.

## Limiting factor decisions

When one resource is scarce, rank the products by **contribution per unit of the scarce resource**, not by contribution per unit of product. Produce the highest-ranked product up to its demand, then the next, until the resource is used up.

:::worked-solution[Example 2: labour hours are the limiting factor]
Three products use skilled labour. There are 1,900 hours available. Each has a maximum demand.

${rankTab}

Product C earns the most per hour, so make 500 units (500 hours). Then A, up to its demand of 400 units (800 hours). That leaves 1,900 - 500 - 800 = 600 hours for B, which makes 600 ÷ 3 = 200 units.

${planTab}

If the workshop had ranked by contribution per unit it would have chosen B first (US\$15), earning less overall. The ranking holds only while the scarce resource is the single limiting factor; if two resources are scarce, a more advanced method is needed (not examined).
:::

## Pricing and cost-volume-profit analysis

A target profit gives a price: the price must cover variable cost per unit, plus fixed costs and the target profit spread over the expected units. Cost-volume-profit (CVP) analysis is useful because it is quick and shows the effect of changes in price, cost and volume. Its limitations are the assumptions of constant price, constant variable cost per unit and a fixed sales mix, and that it considers only one period. A recommendation should use CVP figures but also state the non-financial factors.

## Common mistakes

:::mistake{title="Using full cost to judge a special order"}
Fixed overhead absorbed per unit does not change if the order is accepted. Use the variable cost and any extra fixed cost caused by the order.
:::

:::mistake{title="Closing a department because it shows a loss"}
A department with positive contribution that exceeds its avoidable fixed costs adds to profit. Closing it would reduce total profit.
:::

:::mistake{title="Ranking by contribution per unit when a resource is limited"}
Rank by contribution per unit of the limiting factor, and respect each product's maximum demand.
:::

:::mistake{title="Making a decision with no non-financial point"}
The question usually asks for a recommendation. State one or two non-financial factors such as quality, supplier reliability, jobs or customer reaction.
:::

## Exam tips

:::exam-tip
Decision questions appear in ZIMSEC Papers 2 and 3 and in Cambridge Paper 2 question 4, often worth 8 to 12 marks. For *calculate* the effect of an order, show the contribution and any extra fixed cost. For *prepare* a limiting factor plan, show the ranking, the hours used and the total contribution.
:::

:::exam-tip
For *advise* or *evaluate*, finish with a clear recommendation, quote the figures that support it, state one assumption and one non-financial factor. A recommendation without figures or without a reason earns few marks.
:::

## Summary

:::summary
- Decisions use relevant costs: future, avoidable cash flows. Ignore sunk costs and unchanged apportioned overheads.
- Accept a special order if the price exceeds the extra variable cost and spare capacity exists.
- Make-or-buy compares variable plus avoidable fixed cost of making with the buying price.
- Close a department only if its contribution is less than its avoidable fixed costs.
- With a limiting factor rank by contribution per unit of the scarce resource; always add non-financial factors.
:::
`;
writeLesson("cost/decisions.md", front("cost.decisions", "Short-run decisions and cost-volume-profit data", "Use relevant costs and contribution to decide on special orders, make-or-buy, closures and limiting factors, set a target-profit price and support a recommendation with figures and non-financial factors.", "aacc.cost.decisions", 60), body);
void check; void r2;
