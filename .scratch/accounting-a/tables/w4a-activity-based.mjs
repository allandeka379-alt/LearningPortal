// Lesson generator: cost.activity-based (free preview; Cambridge A Level only)
import { t, table, check, chk, r2, statement, fmt } from "../lib.mjs";
import { writeLesson, front } from "./w4a-lib.mjs";

const S = { units: 4000, lh: 1.5, price: 105, direct: 70, setups: 10, insp: 40, moves: 100 };
const C = { units: 500, lh: 4, price: 190, direct: 120, setups: 20, insp: 60, moves: 100 };
const pools = { setup: 36000, insp: 24000, moves: 20000, general: 40000 };
const totalOH = pools.setup + pools.insp + pools.moves + pools.general;
chk(totalOH, 120000);
const lhS = S.units * S.lh, lhC = C.units * C.lh;
chk(lhS, 6000); chk(lhC, 2000);
const trRate = totalOH / (lhS + lhC);
chk(trRate, 15);
const trS = trRate * lhS, trC = trRate * lhC;
const rates = {
  setup: pools.setup / (S.setups + C.setups),
  insp: pools.insp / (S.insp + C.insp),
  moves: pools.moves / (S.moves + C.moves),
  general: pools.general / (lhS + lhC),
};
chk(rates.setup, 1200); chk(rates.insp, 240); chk(rates.moves, 100); chk(rates.general, 5);
const abcS = rates.setup * S.setups + rates.insp * S.insp + rates.moves * S.moves + rates.general * lhS;
const abcC = rates.setup * C.setups + rates.insp * C.insp + rates.moves * C.moves + rates.general * lhC;
chk(abcS, 61600); chk(abcC, 58400); chk(abcS + abcC, totalOH);
const poolTab = table(["Cost pool", "Cost US\\$", "Cost driver", "Total driver activity", "Rate US\\$"], [
  ["Machine set-ups", pools.setup, "Number of set-ups", "30", rates.setup],
  ["Quality inspection", pools.insp, "Number of inspections", "100", rates.insp],
  ["Materials handling", pools.moves, "Number of material movements", "200", rates.moves],
  ["General factory costs", pools.general, "Direct labour hours", "8,000", rates.general],
  ["**Total**", totalOH, "", "", ""],
], ["l", "r", "l", "r", "r"]);
const allocTab = table(["", "Standard gates US\\$", "Custom gates US\\$"], [
  ["Set-ups: 10 and 20 × US\\$1,200", rates.setup * S.setups, rates.setup * C.setups],
  ["Inspections: 40 and 60 × US\\$240", rates.insp * S.insp, rates.insp * C.insp],
  ["Material movements: 100 and 100 × US\\$100", rates.moves * S.moves, rates.moves * C.moves],
  ["General factory: 6,000 and 2,000 hours × US\\$5", rates.general * lhS, rates.general * lhC],
  ["**Total overhead (ABC)**", abcS, abcC],
  ["Number of gates", fmt(S.units), fmt(C.units)],
  ["**Overhead per gate (ABC)**", abcS / S.units, abcC / C.units],
], ["l", "r", "r"]);
const unitTrS = trS / S.units, unitTrC = trC / C.units;
const unitAbcS = abcS / S.units, unitAbcC = abcC / C.units;
chk(unitTrS, 22.5); chk(unitTrC, 60); chk(unitAbcS, 15.4); chk(unitAbcC, 116.8);
const cmp = table(["Per gate", "Standard: traditional US\\$", "Standard: ABC US\\$", "Custom: traditional US\\$", "Custom: ABC US\\$"], [
  ["Direct cost", S.direct, S.direct, C.direct, C.direct],
  ["Overhead", unitTrS, unitAbcS, unitTrC, unitAbcC],
  ["**Total cost**", S.direct + unitTrS, S.direct + unitAbcS, C.direct + unitTrC, C.direct + unitAbcC],
  ["Selling price", S.price, S.price, C.price, C.price],
  ["**Profit or (loss)**", S.price - S.direct - unitTrS, S.price - S.direct - unitAbcS, C.price - C.direct - unitTrC, C.price - C.direct - unitAbcC],
], ["l", "r", "r", "r", "r"]);
chk(S.price - S.direct - unitAbcS, 19.6); chk(C.price - C.direct - unitAbcC, -46.8);
const totalCostC = C.direct + unitAbcC;
const priceC = totalCostC / 0.8;
chk(priceC, 296);

const terms = table(["Cambridge 9706 (A Level only)", "ZIMSEC"], [
  ["Activity based costing (ABC); cost driver; cost pool", "Not in the syllabus"],
  ["Traditional absorption costing (labour or machine hour rate)", "Absorption costing (overhead absorption rates)"],
], ["l", "l"]);

const body = t`
## Introduction

Farai Ndlovu's workshop in Bulawayo makes two kinds of steel gate: standard gates in large numbers and custom gates to individual orders. His accountant charges all factory overhead at one rate per labour hour. Custom gates need four labour hours each, so they carry a large share of overhead. But Farai notices that custom gates need far more machine set-ups, inspections and special handling than the standard ones, and the cost of those activities is not related to labour hours. **Activity based costing (ABC)** charges overhead according to the activities that cause it.

**This lesson is Cambridge only (A Level, Paper 4). ZIMSEC does not set activity based costing.** It is free to preview because it shows how better cost information can change a pricing decision.

:::keyfact{title="ZIMSEC and Cambridge terms"}
${terms}

Cambridge A Level candidates may be asked to calculate cost driver rates, allocate overheads, compare with absorption costing and evaluate the use of ABC. ZIMSEC candidates can skip this lesson.
:::

## Key definitions

:::definition{term="Activity"}
A task or event in the business that consumes resources and causes cost, such as setting up a machine or inspecting a batch.
:::

:::definition{term="Cost driver"}
The factor that causes the cost of an activity to change, such as the number of set-ups or inspections. It is the measure used to share the cost among products.
:::

:::definition{term="Cost pool"}
The total cost of one activity, collected together before it is charged to products using the cost driver.
:::

:::definition{term="Activity based costing (ABC)"}
A method that collects overheads in cost pools by activity and charges them to products at a rate per unit of the cost driver, multiplied by the amount of the driver each product uses.
:::

## Steps of ABC

1. **Identify the activities** and collect the overhead of each in a cost pool.
2. **Choose a cost driver** for each pool.
3. **Calculate the cost driver rate** = cost of the pool ÷ total activity of the driver.
4. **Allocate** to each product: rate × the amount of the driver that the product uses.
5. Divide by the units made to obtain the **overhead per unit**, add the direct costs and obtain the unit cost and selling price.

Traditional absorption costing uses one (or a few) volume-based rate such as labour hours. When overheads are caused by activities that do not vary with volume, it spreads them unfairly: high-volume simple products subsidise low-volume complex products.

:::worked-solution[Example 1: gates costed in two ways]
Bulawayo Metal Works has overheads of US\$120,000. Production: 4,000 standard gates (1.5 labour hours each) and 500 custom gates (4 hours each), so 6,000 and 2,000 labour hours. Direct cost per gate: standard US\$70, custom US\$120. Selling prices: standard US\$105, custom US\$190.

**Traditional absorption:** rate = 120,000 ÷ 8,000 hours = US\$15 an hour. Standard gate overhead = 1.5 × 15 = US\$22.50; custom gate overhead = 4 × 15 = US\$60.

**ABC:** the overhead consists of four activities.

${poolTab}

${allocTab}

${cmp}

Under traditional costing the custom gate seems to make a profit of US\$10 and the standard gate US\$12.50. Under ABC the standard gate earns US\$19.60 but the custom gate makes a loss of US\$46.80 a gate. Custom gates use only 2,000 of the 8,000 labour hours, but cause two thirds of the set-ups and 60% of the inspections. To earn a margin of 20% on the selling price, the custom gate would need to be priced at (120 + 116.80) ÷ 0.80 = US\$296.
:::

## Comparison with traditional absorption costing

ABC does not change total overhead; it changes the way the overhead is **shared**. In the example the standard gates were over-costed (US\$22.50 against US\$15.40) and the custom gates under-costed (US\$60 against US\$116.80). The effects on decisions are important: standard gates might have been priced too high and lost sales; custom gates might have been sold at a loss without anyone noticing.

## Uses and limitations

**Uses:** more accurate product costs when overheads are large and caused by different activities; better pricing, product mix and cost control decisions; managers can see which activities to reduce (for example by reducing set-ups through larger batches), and it highlights unprofitable products.

**Limitations:** it needs time and money to identify activities and drivers and to collect data; some overheads (for example the managing director's salary) have no clear driver and still have to be shared arbitrarily; the choice of drivers is a matter of judgement; and the extra accuracy may not justify the cost in a business whose overheads are small or that makes similar products. ABC data are also historical, so they do not show future costs for a decision.

**Decisions using ABC data:** a business can reprice custom products, stop making unprofitable ones, change the batch size to cut set-ups or negotiate with customers. A good answer adds non-financial factors, such as the effect on customers who rely on custom gates and the cost of the change.

## Common mistakes

:::mistake{title="Using labour hours for every pool"}
The point of ABC is to use a driver for each activity. Use set-ups for set-up costs and inspections for inspection costs.
:::

:::mistake{title="Calculating a rate per product instead of per unit of driver"}
The cost driver rate is the cost of the pool divided by the **total** driver activity of all products. The rate is then multiplied by each product's use.
:::

:::mistake{title="Forgetting to divide by the number of units"}
The allocation gives the overhead for all the units of a product. Divide by the units made to get the overhead per unit.
:::

:::mistake{title="Saying ABC reduces total costs"}
ABC does not reduce the total overhead; it changes how it is shared. Cost savings come from decisions based on better information.
:::

## Exam tips

:::exam-tip
This lesson is for Cambridge A Level Paper 4 only. A typical question gives overheads by activity, the drivers and the usage by product, and asks for rates, the allocation, the unit cost under ABC and under traditional absorption, and an evaluation. For *calculate*, show rate = cost ÷ total driver activity. For *compare*, show both unit costs and the difference.
:::

:::exam-tip
For *evaluate* or *advise*, state which products are over- or under-costed under the traditional method and why, give a recommendation (for example reprice or stop a product) and add a limitation of ABC (cost of collecting data) and a non-financial factor.
:::

## Summary

:::summary
- ABC collects overheads by activity into cost pools and charges them using cost drivers.
- Cost driver rate = cost of pool ÷ total activity of the driver.
- Overhead per product = rate × driver activity used; divide by units for the overhead per unit.
- Traditional absorption over-costs high-volume simple products and under-costs low-volume complex ones.
- ABC needs data and judgement; it improves decisions but does not change total overhead.
:::
`;
writeLesson("cost/activity-based.md", front("cost.activity-based", "Activity based costing (ABC)", "Calculate cost driver rates, allocate overheads to products by their use of activities, compare ABC unit costs with traditional absorption costing and evaluate decisions based on ABC data (Cambridge A Level).", "aacc.cost.activity-based", 60, true), body);
void check; void r2; void statement;
