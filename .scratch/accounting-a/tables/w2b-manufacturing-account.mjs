// Lesson: manufacturing.account
import { money, fmt, chk, r2, sum, table } from "../lib.mjs";
import { writeLesson, U, mfg } from "./w2b-lib.mjs";

// Example 1: Mutasa Furniture
const rent = 16000, factoryRent = chk(rent * 0.75, 12000);
const e1 = mfg({
  rmOpen: 14200, rmPurch: 96500, carriageIn: 2300, rmReturns: 1800, rmClose: 16700, labour: 58000,
  directExp: [["Royalties on chairs produced", 3500]],
  overheads: [["Indirect factory wages", 12400], ["Factory power", 9200], ["Depreciation of machinery", 6500], ["Factory share of rent (three quarters of 16,000)", factoryRent], ["Factory insurance", 2100]],
  wipOpen: 7300, wipClose: 8900,
}, { title: "Mutasa Furniture: manufacturing account for the year ended 31 December 2025" });
chk(e1.rmUsed, 94500); chk(e1.prime, 156000); chk(e1.foh, 42200); chk(e1.cop, 196600);
const units = 2000;
const perUnit = chk(e1.cop / units, 98.3);

// Example 2: apportionment of shared expenses and cost per unit
const shared = [
  ["Rent and rates", 18000, 0.75], ["Electricity", 10000, 0.8], ["Insurance of machines and building", 6000, 0.7], ["Depreciation: machinery (10% on cost 85,000)", 8500, 1], ["Depreciation: office equipment (20% on cost 12,000)", 2400, 0],
];
chk(85000 * 0.1, 8500); chk(12000 * 0.2, 2400);
const appRows = shared.map(([l, t, f]) => [l, t, r2(t * f), r2(t * (1 - f))]);
const tot = [sum(shared.map((x) => x[1])), sum(appRows.map((x) => x[2])), sum(appRows.map((x) => x[3]))];
chk(tot[0], tot[1] + tot[2]);
const appTable = table(["Expense", `Total ${U}`, `Factory ${U}`, `Office ${U}`], [...appRows, ["**Total**", `**${fmt(tot[0])}**`, `**${fmt(tot[1])}**`, `**${fmt(tot[2])}**`]], ["l", "r", "r", "r"]);
const e2rm = 61800, e2lab = 40200, e2ind = 9600, e2open = 5200, e2close = 4600;
const e2factoryCost = e2rm + e2lab + e2ind + tot[1];
const e2cop = chk(e2factoryCost + e2open - e2close, e2rm + e2lab + e2ind + tot[1] + e2open - e2close);
const e2units = 1500;
const costTable = table(["", `US\\$`], [
  ["Cost of raw materials consumed", e2rm], ["Direct labour", e2lab], ["**Prime cost**", `**${fmt(e2rm + e2lab)}**`], ["Indirect factory wages", e2ind], ["Factory share of shared expenses", tot[1]], ["**Factory cost**", `**${fmt(e2factoryCost)}**`],
  ["Add opening work in progress", e2open], ["Less closing work in progress", -e2close], ["**Cost of production**", `**${fmt(e2cop)}**`],
], ["l", "r"]);
const e2unit = e2cop / e2units;

const body = `
## Introduction

Mutasa Furniture in Mutare buys timber, pays workers to saw and assemble chairs, and uses a factory with machines, power and a supervisor. The owner cannot find the profit of the business from a simple trading account, because the cost of the chairs it sells is not a purchase price: it is built up from materials, labour and factory costs. A **manufacturing account** shows how the cost of the goods made is calculated. Its result, the **cost of production**, replaces "purchases" in the trading account.

The manufacturing account is ZIMSEC Form 5 and, for Cambridge, A Level only (Paper 3). You should already know the trading account and statement of profit or loss of a retailer, and the difference between capital and revenue expenditure.

:::keyfact{title="ZIMSEC and Cambridge terms"}
ZIMSEC: **manufacturing account**, **prime cost**, **factory overheads**, **work in progress**, **small to medium and large firms**. Cambridge: **manufacturing account**, **prime cost**, **factory overheads**, **work in progress**. Both boards use the same layout. In Cambridge a manufacturing account is part of the A Level paper on financial accounting.
:::

## Key definitions

:::definition{term="Prime cost"}
The total of the direct costs of production: the cost of direct materials, direct labour and direct expenses.
:::

:::definition{term="Factory overheads (indirect manufacturing costs)"}
Costs of running the factory that cannot be traced to a single unit of product, such as indirect wages, factory power, depreciation of machines and a share of rent.
:::

:::definition{term="Work in progress"}
Goods that have been started but are not yet finished at the end of the period. Their cost is carried forward to the next period.
:::

:::definition{term="Cost of production"}
The total cost of the goods completed in the period: prime cost plus factory overheads, adjusted for the change in work in progress.
:::

## Classifying manufacturing costs

| Class | Examples | Where it appears |
| --- | --- | --- |
| Direct materials | Timber for chairs, flour for a bakery | In cost of raw materials consumed |
| Direct labour | Wages of workers who make the product | In prime cost |
| Direct expenses | Royalties per unit made, hire of a special machine for one job | In prime cost |
| Factory overheads | Indirect wages, factory power, machine depreciation, factory rent | After prime cost |
| Administration and selling costs | Office salaries, advertising, delivery | In the statement of profit or loss, **not** the manufacturing account |

Costs shared between factory and office (rent, electricity, insurance) are **apportioned** on a sensible basis stated in the question, such as floor area or an agreed percentage.

## The layout

1. Start with **raw materials consumed**: opening inventory + purchases + carriage inwards − returns outwards − closing inventory.
2. Add direct labour and direct expenses to give **prime cost**.
3. Add the factory overheads to give **factory cost**.
4. Adjust for **work in progress**: add the opening and deduct the closing, to give the **cost of production**.

:::keyfact
Cost of production = raw materials consumed + direct labour + direct expenses + factory overheads + opening work in progress − closing work in progress. Cost per unit = cost of production ÷ units produced.
:::

:::worked-solution[Example 1: a full manufacturing account]
Mutasa Furniture, Mutare, year ended 31 December 2025. Raw materials: opening inventory ${money(14200)}, purchases ${money(96500)}, carriage inwards ${money(2300)}, returns outwards ${money(1800)}, closing inventory ${money(16700)}. Manufacturing wages ${money(58000)}. Royalties on chairs produced ${money(3500)}. Indirect factory wages ${money(12400)}, factory power ${money(9200)}, depreciation of machinery ${money(6500)}, factory insurance ${money(2100)}. Total rent was ${money(16000)}, of which three quarters relates to the factory. Work in progress: opening ${money(7300)}, closing ${money(8900)}. The factory made 2,000 chairs.

1. Rent for the factory: 16,000 × 3/4 = 12,000.
2. Raw materials consumed: 14,200 + 96,500 + 2,300 − 1,800 − 16,700 = 94,500.
3. Prime cost: 94,500 + 58,000 + 3,500 = 156,000.
4. Factory overheads: 12,400 + 9,200 + 6,500 + 12,000 + 2,100 = 42,200.
5. Cost of production: 156,000 + 42,200 + 7,300 − 8,900 = 196,600.

${e1.md}

Cost per chair = 196,600 ÷ 2,000 = US\\$98.30.
:::

## Apportioning shared expenses

The office part of a shared expense belongs in the statement of profit or loss (administration expenses); the factory part is a factory overhead. Depreciation is charged on the assets that are used in each place.

:::worked-solution[Example 2: apportionment and cost per unit]
A bakery-equipment maker has the following shared expenses for the year: rent and rates ${money(18000)} (three quarters factory, by floor area), electricity ${money(10000)} (80% factory), insurance ${money(6000)} (70% factory), machinery depreciation 10% on cost of ${money(85000)} (all factory) and office equipment depreciation 20% on cost of ${money(12000)} (all office). Also: raw materials consumed ${money(e2rm)}, direct labour ${money(e2lab)}, indirect factory wages ${money(e2ind)}, opening work in progress ${money(e2open)} and closing work in progress ${money(e2close)}. 1,500 units were completed.

1. Apportion the shared expenses.

${appTable}

2. Build up the cost of production.

${costTable}

3. Cost per unit: ${fmt(e2cop)} ÷ 1,500 = US\\$${fmt(Math.round(e2unit * 100) / 100)}.

The office share of expenses (${money(tot[2])}) is not part of the cost of production: it is charged in the statement of profit or loss.
:::

## From the manufacturing account to the trading account

The cost of production is carried to the trading account, where it takes the place of purchases. The opening and closing inventories of **finished goods** are still adjusted there: cost of sales = opening finished goods + cost of production − closing finished goods. The next two lessons show the profit on transfers at market value and the complete final accounts.

## Common mistakes

:::mistake{title="Including selling and administration costs"}
Advertising, delivery and office salaries are not manufacturing costs. They belong in the statement of profit or loss.
:::

:::mistake{title="Treating carriage inwards as an overhead"}
Carriage inwards is part of the cost of raw materials. It is added to purchases before finding the cost of materials consumed.
:::

:::mistake{title="Mixing up opening and closing work in progress"}
Add the opening work in progress and deduct the closing: the opening was started last period, the closing is carried forward.
:::

:::mistake{title="Putting prime cost and factory cost in the wrong order"}
Prime cost contains only direct costs. Factory overheads are added afterwards to give factory cost.
:::

## Exam tips

:::exam-tip
ZIMSEC Papers 2 and 3 and Cambridge Paper 3 test this topic. With **prepare**, give the heading, the sub-totals (cost of raw materials consumed, prime cost, factory cost, cost of production) and brackets for deductions. With **calculate**, show the apportionment working. With **explain**, say why the account is used: to find the cost of goods made, to control costs and to compare cost with the market price.
:::

## Summary

:::summary
- A manufacturing account finds the cost of production; it replaces purchases in the trading account.
- Prime cost = raw materials consumed + direct labour + direct expenses.
- Factory overheads are indirect factory costs; shared expenses are apportioned to the factory and the office.
- Adjust for work in progress: add opening, deduct closing.
- Selling and administration costs stay in the statement of profit or loss.
- Cost per unit = cost of production ÷ units produced.
:::
`;

writeLesson("manufacturing/account", {
  key: "manufacturing.account",
  title: "The manufacturing account",
  summary: "Find the prime cost, factory cost and cost of production of a manufacturer, apportion shared expenses and calculate the cost per unit.",
  concepts: ["aacc.manufacturing.account"],
  estimatedMinutes: 50,
}, body);
