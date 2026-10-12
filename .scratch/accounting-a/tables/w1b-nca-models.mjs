// Lesson: valuation.nca-models
import { t, money, fmt, check, chk, r2, sum, tAccount, statement, table, journal } from "../lib.mjs";
import { writeLesson, U } from "./w1b-lib.mjs";

// Example 1: cost of a machine
const price = 42000, disc = 5, duty = 2100, deliv = 1300, inst = 1800, test = 600, train = 900, maint = 750;
const net = chk(price * (1 - disc / 100), 39900);
const cost1 = chk(net + duty + deliv + inst + test, 45700);
const t1 = table(["Item", `US$`, "Treatment"], [
  ["Invoice price", price, "Capital"],
  [`Less trade discount ${disc}%`, -(price - net), "Reduces cost"],
  ["Import duty (not recoverable)", duty, "Capital"],
  ["Delivery to the factory", deliv, "Capital"],
  ["Installation", inst, "Capital"],
  ["Testing before use", test, "Capital"],
  ["Training of operators", train, "Expense: not part of cost"],
  ["Annual maintenance contract", maint, "Expense: running cost"],
], ["l", "r", "l"]).replace("| US$ |", `| ${U} |`);
const t1cost = `Cost of the machine = 39,900 + 2,100 + 1,300 + 1,800 + 600 = ${fmt(cost1)}`;

// Example 2: upward revaluation of a building
const bCost = 200000, bAcc = 40000, bVal = 260000, remLife = 40;
const carry = bCost - bAcc;
const surplus = chk(bVal - carry, 100000);
const oldCharge = bCost * 0.02;
const newCharge = chk(bVal / remLife, 6500);
const j2 = journal([
  { date: "1 Jan 2025", lines: [["Provision for depreciation: buildings", bAcc, null], ["Buildings at cost / valuation", bVal - bCost, null], ["Revaluation reserve", null, surplus]], narrative: "Revaluation of the buildings to 260,000; accumulated depreciation eliminated" },
]);
const bAccT = tAccount("Buildings account (cost or valuation)", [["1 Jan 2025", "Balance b/d", bCost], ["1 Jan 2025", "Revaluation reserve (increase)", bVal - bCost]], [], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" });
const provT = tAccount("Provision for depreciation: buildings",
  [["1 Jan 2025", "Revaluation (eliminated)", bAcc], ["31 Dec 2025", "Balance c/d", newCharge]],
  [["1 Jan 2025", "Balance b/d", bAcc], ["31 Dec 2025", "Statement of profit or loss", newCharge]]);
const revT = tAccount("Revaluation reserve", [], [["1 Jan 2025", "Buildings and provision", surplus]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" });
const sofp2 = statement("Extract from the statement of financial position at 31 December 2025", [
  ["Buildings at valuation", null, bVal],
  ["Less accumulated depreciation (260,000 ÷ 40)", null, -newCharge],
  ["Carrying amount", null, bVal - newCharge],
  ["Equity: revaluation reserve", null, surplus],
], { cols: [U, U], checks: [["carrying", bVal - newCharge, 253500]] });
const soce = statement("Extract from the statement of changes in equity for 2025", [
  ["Balance at 1 January 2025", 0],
  ["Revaluation surplus on buildings (other comprehensive income)", surplus],
  ["Balance at 31 December 2025", surplus],
], { cols: ["Revaluation reserve US\\$"], checks: [["reserve", 0 + surplus, 100000]] });

// Example 3: downward revaluation
const land = { cost: 80000, up: 110000, reserve: 30000 };
const down = (newVal) => {
  const dec = land.up - newVal;
  const toReserve = Math.min(dec, land.reserve);
  const toProfit = dec - toReserve;
  return { newVal, dec, toReserve, toProfit };
};
const caseA = down(85000), caseB = down(70000);
chk(caseA.toProfit, 0); chk(caseB.toProfit, 10000);
const t3 = table(["", "Case A: valued at 85,000", "Case B: valued at 70,000"], [
  ["Carrying amount before", land.up, land.up],
  ["Decrease in value", caseA.dec, caseB.dec],
  ["Charged to revaluation reserve", caseA.toReserve, caseB.toReserve],
  ["Charged to profit or loss (expense)", caseA.toProfit, caseB.toProfit],
  ["Revaluation reserve remaining", land.reserve - caseA.toReserve, land.reserve - caseB.toReserve],
]).replace("US$", U);

const body = t`
## Introduction

Rudo owns a workshop building in Harare that she bought for US\$200,000 ten years ago. The same building would now cost far more, but her statement of financial position still shows it at cost less depreciation. IAS 16 allows her a choice of two models for measuring her property, plant and equipment after purchase: the **cost model** or the **revaluation model**. This lesson explains how the cost of an asset is built up, how the two models work and how the different bases of valuation compare.

The topic is examined in ZIMSEC Papers 2 and 3 and in Cambridge Papers 1 and 2, usually as a journal entry, ledger accounts, or an extract from the statement of financial position. You should already know how to calculate depreciation and the difference between capital and revenue expenditure.

:::keyfact{title="ZIMSEC and Cambridge terms"}
ZIMSEC: **net book value**, **capital reserve**, **replacement cost**, **realisable value**. Cambridge: **carrying amount**, **revaluation reserve**, **replacement cost**, **net realisable value** (exit value). Both boards use **IAS 16**.
:::

## Key definitions

:::definition{term="Property, plant and equipment (IAS 16)"}
Tangible assets held for use in the business that are expected to be used for more than one period.
:::

:::definition{term="Cost model"}
Measuring an asset at its cost less accumulated depreciation.
:::

:::definition{term="Revaluation model"}
Measuring an asset at its revalued amount (its fair value at the date of revaluation) less any later accumulated depreciation. If one asset is revalued, the whole class of assets to which it belongs is revalued.
:::

:::definition{term="Revaluation reserve"}
A reserve in equity that records an increase in the carrying amount of an asset on revaluation. It is not profit and is not distributed.
:::

## The cost of a non-current asset

An asset is recognised when it will provide future economic benefits and its cost can be measured reliably. Its cost includes the purchase price (less trade discounts), import duties and non-refundable taxes, and every cost needed to bring it into working condition: delivery, installation, testing and professional fees. Training of staff, administrative costs and running costs are not part of cost; they are expenses of the period.

:::worked-solution[Example 1: the cost of a machine]
Farai buys a printing machine in Mutare from a supplier in South Africa. The invoice price is US\$42,000 with a 5% trade discount. He also pays:

${t1}

1. Trade discount: 5% × 42,000 = 2,100, so the net price is 39,900.
2. ${t1cost}.
3. Entry: debit machinery ${money(cost1)}; credit bank ${money(cost1)}. Training (900) and maintenance (750) are debited to expense accounts.
4. Later in the year Farai spends 4,000 on an engine upgrade that increases the machine's output, and 650 on repairing a worn belt. The upgrade is **capital expenditure** and is added to cost (the new cost is 49,700). The repair is **revenue expenditure** and is charged to profit or loss.
:::

## The cost model and the revaluation model

Under the **cost model** the asset stays at cost; depreciation reduces the carrying amount each year. This is objective and simple but, when prices rise, the statement of financial position can show assets at much less than their current value.

Under the **revaluation model** the asset is revalued regularly to a fair value. The accumulated depreciation is usually eliminated and the asset is restated to the new amount. The increase is credited to the **revaluation reserve** in equity (it appears in other comprehensive income), not to profit. After the revaluation, depreciation is charged on the revalued amount over the remaining useful life, so the annual charge rises when the asset is revalued upwards.

:::worked-solution[Example 2: upward revaluation of a building]
Rudo's building cost US\$200,000 on 1 January 2015 and is depreciated at 2% per annum on cost (a 50-year life). On 1 January 2025 the accumulated depreciation is 40,000 (ten years), so the carrying amount is 160,000. A valuer says the building is worth US\$260,000, and Rudo adopts the revaluation model.

1. Revaluation surplus: 260,000 − 160,000 = 100,000.
2. The remaining useful life is 40 years, so the new annual depreciation is 260,000 ÷ 40 = 6,500 (previously 4,000).
3. Journal entry on 1 January 2025:

${j2}

${bAccT}

${provT}

${revT}

${sofp2}

${soce}

The higher depreciation of 6,500 reduces profit for the year by 2,500 more than before. The revaluation surplus is not profit, so it does not appear in the statement of profit or loss.
:::

## Downward revaluation

If an asset is revalued downwards, the decrease is first charged against any revaluation reserve that was created by an earlier increase on **the same asset**. Any excess is an expense in the statement of profit or loss.

:::worked-solution[Example 3: land revalued downwards]
Nyasha's land in Gweru cost 80,000. It was revalued to 110,000 in an earlier year and a revaluation reserve of 30,000 was created. The land is now revalued downwards in two different cases.

${t3}

1. Case A: the decrease of 25,000 is less than the reserve of 30,000, so all of it is charged to the reserve; 5,000 remains.
2. Case B: the decrease of 40,000 is more than the reserve, so 30,000 is charged to the reserve and the remaining 10,000 is an expense in profit or loss.
3. Journal in Case B: debit revaluation reserve 30,000; debit revaluation loss (profit or loss) 10,000; credit land 40,000.
:::

## Bases of valuation

| Basis | Meaning | Useful when | Weakness |
| --- | --- | --- | --- |
| Historical cost | What the business paid | Verifiable, objective, simple | Out of date when prices change |
| Replacement cost | What it would cost today to replace the asset with a similar one | The business will continue and must replace assets | Estimates are subjective |
| Net realisable (exit) value | Amount received on sale, less selling costs | The business is closing or the asset is surplus | Not suitable for assets in continuing use |

## Common mistakes

:::mistake{title="Taking the surplus to profit"}
A revaluation surplus goes to the revaluation reserve, not to the statement of profit or loss.
:::

:::mistake{title="Revaluing only one asset"}
Under IAS 16, if an asset is revalued, every asset in its class is revalued.
:::

:::mistake{title="Continuing to depreciate the old cost"}
After a revaluation, depreciation is charged on the revalued amount over the remaining life.
:::

:::mistake{title="Including training or running costs in cost"}
Only costs of bringing the asset to working condition are capitalised.
:::

## Exam tips

:::exam-tip
ZIMSEC Papers 2 and 3 and Cambridge Papers 1 and 2 ask you to **prepare** the journal entry for a revaluation, to **calculate** the surplus and new depreciation, and to **explain** the effect on profit and equity. Show the carrying amount before, the valuation and the surplus as separate lines.
:::

:::exam-tip
In **evaluate** questions on the cost model against the revaluation model, give one benefit (a statement of financial position nearer to current values) and one drawback (valuation cost, subjectivity, higher depreciation) and link them to the business in the stem.
:::

## Summary

:::summary
- Cost = purchase price less trade discount plus duties, delivery, installation, testing; training and running costs are expenses.
- Subsequent expenditure that improves or extends the asset is capital; repairs are revenue.
- Cost model: cost less accumulated depreciation. Revaluation model: fair value less later depreciation, for the whole class.
- An upward revaluation is credited to the revaluation reserve (equity), not profit; depreciation then rises.
- A downward revaluation is charged first to the reserve on the same asset, the excess to profit or loss.
- Historical cost, replacement cost and net realisable value each suit different purposes.
:::
`;

writeLesson("valuation/nca-models", {
  key: "valuation.nca-models",
  title: "Non-current asset valuation: IAS 16, cost model and revaluation model",
  summary: "How the cost of an asset is built up, how the cost model and the revaluation model differ, how to record upward and downward revaluations and how the bases of valuation compare.",
  concepts: ["aacc.valuation.nca-models"],
  estimatedMinutes: 45,
}, body);
