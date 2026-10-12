// Lesson: ledger.depreciation. Prints the checked tables and writes the lesson file.
import { t, money, fmt, check, chk, r2, sum, tAccount, statement, table, depreciation } from "../lib.mjs";
import { writeLesson, U } from "./w1b-lib.mjs";

// Example 1: straight line with a residual value (oven, bought 1 January 2023)
const cost1 = 18500, res1 = 2500, life1 = 5;
const sl1 = chk((cost1 - res1) / life1, 3200);
const sched1 = table(["Year", `Charge ${U}`, `Accumulated depreciation ${U}`, `Carrying amount ${U}`],
  Array.from({ length: life1 }, (_, i) => [`${2023 + i}`, sl1, sl1 * (i + 1), cost1 - sl1 * (i + 1)]));
check("oven ends at residual", cost1 - sl1 * life1, res1);
const prov1 = tAccount("Provision for depreciation: oven, year ended 31 December 2024",
  [], [["1 Jan 2024", "Balance b/d", sl1], ["31 Dec 2024", "Statement of profit or loss", sl1]],
  { cdDate: "31 Dec 2024", bdDate: "1 Jan 2025" });
const exp1 = tAccount("Depreciation expense: oven, year ended 31 December 2024",
  [["31 Dec 2024", "Provision for depreciation", sl1]], [["31 Dec 2024", "Statement of profit or loss", sl1]]);
const sofp1 = statement("Extract from the statement of financial position at 31 December 2024", [
  ["Non-current assets", null, null],
  ["Oven at cost", null, cost1],
  ["Less accumulated depreciation", null, -2 * sl1],
  ["Carrying amount", null, cost1 - 2 * sl1],
], { cols: [U, U], checks: [["carrying amount", cost1 - 2 * sl1, 12100]] });

// Example 2: reducing balance against straight line (van)
const cost2 = 24000;
const rb = depreciation.reducingBalance(cost2, 25, 3);
const slCharge2 = cost2 * 0.2;
const cmp2 = table(["Year", `Straight line 20% of cost: charge ${U}`, `Carrying amount ${U}`, `Reducing balance 25%: charge ${U}`, `Carrying amount ${U}`],
  rb.map((r, i) => [`Year ${r.year}`, slCharge2, cost2 - slCharge2 * (i + 1), r.charge, r.nbv]));
check("rb y3", rb[2].nbv, 10125);

// Example 3: additions in the year, monthly basis (plant)
const costB = 60000, provB = 18000, add = 12000, rate = 10;
const chargeOld = (costB * rate) / 100;
const chargeNew = chk((add * rate) / 100 * (9 / 12), 900);
const charge3 = chk(chargeOld + chargeNew, 6900);
const costAcc = tAccount("Plant and machinery at cost account, year ended 31 December 2025",
  [["1 Jan 2025", "Balance b/d", costB], ["1 Apr 2025", "Bank", add]], [], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" });
const provAcc = tAccount("Provision for depreciation: plant and machinery, year ended 31 December 2025",
  [], [["1 Jan 2025", "Balance b/d", provB], ["31 Dec 2025", "Statement of profit or loss", charge3]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" });
const provClose = provB + charge3;
const sofp3 = statement("Extract from the statement of financial position at 31 December 2025", [
  ["Plant and machinery at cost", null, costB + add],
  ["Less accumulated depreciation", null, -provClose],
  ["Carrying amount", null, costB + add - provClose],
], { cols: [U, U], checks: [["carrying amount", costB + add - provClose, 47100]] });

const body = t`
## Introduction

Chipo runs a bakery in Gweru. She buys an industrial oven for US\$18,500 and expects to use it for five years. If she charged the whole US\$18,500 to the profit of the year of purchase, that year would look disastrous and the next four would look far too good. Depreciation spreads the cost of the oven over the years in which it helps to earn revenue.

Depreciation is examined every year, on its own and inside larger questions on final accounts. ZIMSEC Paper 2 and Paper 3 and Cambridge Papers 1 and 2 expect you to calculate the charge by both methods, post the three accounts involved and show the result in the financial statements. You should already know double entry and the difference between capital and revenue expenditure.

:::keyfact{title="ZIMSEC and Cambridge terms"}
The balance on the **provision for depreciation** account (ZIMSEC) is the **accumulated depreciation** (Cambridge). **Net book value** (ZIMSEC) is the **carrying amount** (Cambridge). The charge goes to the **income statement** (ZIMSEC) or **statement of profit or loss** (Cambridge). Both boards examine straight-line and reducing-balance methods and monthly or part-year charges when the question states the rule.
:::

## Key definitions

:::definition{term="Depreciation"}
The systematic allocation of the depreciable amount of a non-current asset over its useful life, so that part of the cost is charged as an expense in each period that benefits from the asset.
:::

:::definition{term="Useful life"}
The period over which a business expects to use the asset, or the number of units it expects to produce with it. It is an estimate and may be reviewed.
:::

:::definition{term="Residual value"}
The amount the business expects to receive when the asset is sold at the end of its useful life, less the cost of selling it.
:::

:::definition{term="Carrying amount (net book value)"}
Cost less accumulated depreciation. It is not the market value of the asset.
:::

:::keyfact{title="Depreciable amount"}
Depreciable amount = cost − residual value. The cost includes delivery, installation and legal fees needed to bring the asset into use.
:::

## Why assets lose value

Four causes are usually named, and a question may ask you to match them to examples.

- **Wear and tear:** physical use. A delivery van's engine and tyres wear with every kilometre.
- **Obsolescence:** a newer, better or cheaper model makes the asset out of date even though it still works. Computers and tills are typical.
- **Passage of time (legal limits):** a lease, licence or patent runs out on a fixed date, whether or not the business uses it.
- **Depletion:** the asset is used up as the resource is extracted, as in a quarry or a mine.

## Why depreciation is charged

1. **Matching:** the cost of using the asset is set against the revenue it helps to produce in the same year.
2. **Prudence and a fair profit:** without depreciation, profit and the value of the asset in the statement of financial position would both be overstated.
3. **A realistic carrying amount:** the asset is shown at cost less the part already used up.

:::mistake{title="Depreciation is not a savings fund"}
Charging depreciation does not put cash aside to replace the asset. It is a book entry: profit falls and the carrying amount falls, but the bank balance does not change.
:::

## The two methods

### Straight line

The same charge every year. Annual charge = (cost − residual value) ÷ useful life. It suits assets that give about the same benefit each year, such as buildings and furniture. It is often given as a percentage of cost.

### Reducing balance

A fixed percentage of the carrying amount at the start of the year. The charge is highest in year 1 and falls each year, and it never reaches zero, so the residual value is not used in the calculation. It suits assets that lose most value early or whose repair costs rise with age, such as vehicles and computers.

:::formula{name="Reducing balance charge"}
Charge for the year = rate × (cost − accumulated depreciation at the start of the year)
:::

## The accounts

Three accounts are involved:

- The **asset at cost** account never changes because of depreciation.
- The **provision for depreciation** account is credited each year with the charge, so it builds up the accumulated depreciation.
- The **depreciation expense** account (sometimes combined in the question) is debited with the charge and closed to the statement of profit or loss.

Entry each year: debit depreciation expense; credit provision for depreciation. At the year end, debit statement of profit or loss; credit depreciation expense.

:::worked-solution[Example 1: straight line with a residual value]
Chipo bought an oven on 1 January 2023 for US\$18,500. She expects to use it for five years and then sell it for US\$2,500. Her year end is 31 December. She uses the straight-line method.

1. Depreciable amount: 18,500 − 2,500 = 16,000.
2. Annual charge: 16,000 ÷ 5 = 3,200.
3. The schedule shows the carrying amount falling to the residual value at the end of year 5:

${sched1}

4. Ledger accounts for 2024 (second year):

${prov1}

${exp1}

5. Statement of financial position at 31 December 2024:

${sofp1}
:::

:::worked-solution[Example 2: reducing balance compared with straight line]
Rudo's transport business buys a pick-up for US\$24,000. Compare two policies for the first three years: straight line at 20% of cost with no residual value, and reducing balance at 25% a year.

1. Straight line: 20% × 24,000 = 4,800 every year.
2. Reducing balance year 1: 25% × 24,000 = 6,000; carrying amount 18,000.
3. Year 2: 25% × 18,000 = 4,500; carrying amount 13,500.
4. Year 3: 25% × 13,500 = 3,375; carrying amount 10,125.

${cmp2}

The reducing balance method charges more in year 1 and less in year 3. The total over the three years is 13,875 compared with 14,400 under straight line, because the charge is on a shrinking balance.
:::

## Part-year and additions

A question states the rule: for example "a full year in the year of purchase and none in the year of sale", or "on a monthly basis". On a monthly basis an asset bought on 1 April and charged to 31 December attracts nine months of depreciation. Always charge each asset for the time it was owned, using its cost, not the balance on the account.

:::worked-solution[Example 3: additions during the year, monthly basis]
At 1 January 2025 Farai's workshop in Mutare had plant and machinery at cost of US\$60,000 and accumulated depreciation of US\$18,000. On 1 April 2025 he bought a machine for US\$12,000 by bank transfer. Plant is depreciated at 10% per annum on cost, straight line, on a monthly basis. His year end is 31 December.

1. Old plant: 10% × 60,000 = 6,000 for the full year.
2. New machine: 10% × 12,000 × 9/12 = 900.
3. Total charge for 2025: 6,900.
4. Provision at 31 December 2025: 18,000 + 6,900 = 24,900.

${costAcc}

${provAcc}

${sofp3}
:::

## Choosing a method

Neither method is right for every asset. Straight line is simple and gives a steady expense. Reducing balance matches the fall in value of an asset that loses value quickly and recognises that older assets cost more to repair, so the total of depreciation plus repairs is more level. Whichever method is chosen should be applied consistently from year to year, and the useful life and residual value are reviewed if circumstances change. Freehold land is not normally depreciated because its useful life is not limited.

## Common mistakes

:::mistake{title="Using the residual value in reducing balance"}
The percentage is applied to the carrying amount, never to cost less residual value. Only straight line deducts the residual value first.
:::

:::mistake{title="Applying the reducing balance rate to cost every year"}
That gives a straight-line charge. From year 2 the base is cost less the depreciation already charged.
:::

:::mistake{title="Reducing the asset account"}
The asset stays at cost in the ledger. The depreciation is accumulated in the provision account and deducted in the statement of financial position.
:::

:::mistake{title="Treating depreciation as a cash payment"}
Depreciation is not paid to anyone. In a cash flow statement it is added back to profit; it never appears as a bank entry.
:::

## Exam tips

:::exam-tip
ZIMSEC Papers 1, 2 and 3 and Cambridge Papers 1 and 2 test depreciation. With **calculate** show the base, the rate and the time fraction; with **prepare** give each account with dates, narratives and a balance carried down; with **explain** give the reason and its effect on profit, carrying amount or both.
:::

:::exam-tip
For **evaluate** or **advise** questions on the choice of method, name the pattern of benefit the asset gives, state which method matches it, and use figures from the stem for at least one year. Mention consistency.
:::

## Summary

:::summary
- Depreciation spreads the depreciable amount (cost − residual value) over the useful life: matching and prudence.
- Causes: wear and tear, obsolescence, passage of time and depletion.
- Straight line: (cost − residual value) ÷ life. Reducing balance: rate × carrying amount at the start of the year.
- Debit depreciation expense, credit provision for depreciation; the asset stays at cost.
- Apply the question's rule for part years; charge each asset for the months it was owned.
- Depreciation reduces profit and carrying amount but does not affect cash.
:::
`;

writeLesson("ledger/depreciation", {
  key: "ledger.depreciation",
  title: "Depreciation: causes, methods and accounting entries",
  summary: "Why non-current assets lose value, how to calculate depreciation by the straight-line and reducing-balance methods, and how to record it in the asset, provision and expense accounts.",
  concepts: ["aacc.ledger.depreciation"],
  estimatedMinutes: 45,
}, body);
