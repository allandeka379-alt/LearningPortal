// Lesson generator: concepts.reporting
import { table, check, sum, r2, fmt, statement, journal, inventory, t } from "../lib.mjs";
import { writeLesson } from "./w1a-lib.mjs";

// Example 1: prudence / lower of cost and NRV
const lines = [
  ["Product A", 4800, 6500, 300],
  ["Product B", 3600, 3300, 200],
  ["Product C", 2900, 2500, 150],
];
const rows = lines.map(([n, cost, sp, sell]) => {
  const nrv = r2(sp - sell);
  const val = inventory.lowerOfCostAndNrv(cost, sp, sell);
  return [n, cost, nrv, val];
});
const totalCost = sum(lines.map((l) => l[1]));
const totalVal = sum(rows.map((r) => r[3]));
const writeDown = r2(totalCost - totalVal);
check("totalVal", totalVal, 4800 + 3100 + 2350);
check("writeDown", writeDown, 1050);
const invTbl = table(["Product", "Cost US\\$", "Net realisable value US\\$", "Value in the accounts US\\$"], rows.concat([["**Total**", `**${fmt(totalCost)}**`, "", `**${fmt(totalVal)}**`]]), ["l", "r", "r", "r"]);

// Example 2: realisation and matching
const sold = 14500;
const costSold = 9400;
const gp = r2(sold - costSold);
check("gp", gp, 5100);
const dep = r2((12000 - 2000) / 5);
check("dep", dep, 2000);
const rm = table(
  ["Event", "Date", "Treatment under realisation and matching"],
  [
    ["Goods worth US$14,500 delivered; customer pays in January", "28 December 2025", "Revenue of 14,500 belongs to 2025 (sale made); trade receivable of 14,500 at the year end"],
    ["Cost of those goods US$9,400", "Bought earlier", "Cost of sales 9,400 matched to the same sale in 2025; gross profit 5,100"],
    ["Machine costing US$12,000, residual value US$2,000, life 5 years", "Bought 1 Jan 2025", "Depreciation 2,000 a year charged over the five years in which the machine helps earn revenue"],
    ["Customer pays a deposit for goods to be delivered in February", "20 December 2025", "Not revenue of 2025: the sale is made on delivery; deposit is a liability"],
  ],
  ["l", "l", "l"],
).replace(/US\$/g, "US\\$");

// Example 3: substance over form (finance lease), going concern, materiality
const leaseAsset = 18000;
const j3 = journal([{ date: "1 Jan", lines: [["Machinery (leased under a finance lease)", leaseAsset, null], ["Finance lease liability", null, leaseAsset]], narrative: "Machine acquired under a lease which transfers the risks and rewards of ownership" }]);
const gc = table(
  ["Item", "Going concern basis US$", "Break-up basis US$"],
  [
    ["Inventory", 6000, 3500],
    ["Machinery", 20000, 8500],
    ["Total of these two assets", 26000, 12000],
    ["Fall in the value of these assets", "", 14000],
  ],
).replace(/US\$/g, "US\\$");
check("gc total", 6000 + 20000, 26000);
check("gc break-up", 3500 + 8500, 12000);
check("gc fall", 26000 - 12000, 14000);

const concepts = table(
  ["Concept", "Meaning", "Example of use"],
  [
    ["Prudence", "Do not overstate profit or assets or understate expenses or liabilities", "Inventory at the lower of cost and net realisable value; allowance for irrecoverable debts"],
    ["Realisation", "Revenue is recognised when the goods or services are supplied, not when cash is received", "A credit sale in December is revenue of that year"],
    ["Matching (accruals)", "Expenses are matched with the revenue they help to earn in the same period", "Accruals, prepayments, depreciation, cost of sales"],
    ["Materiality", "Small items that would not affect users' decisions may be treated simply", "A box of staples is expensed, not recorded as inventory"],
    ["Consistency", "The same methods are used from period to period unless there is good reason to change", "Straight-line depreciation each year"],
    ["Going concern", "The business is assumed to continue for the foreseeable future", "Assets valued at cost less depreciation, not at break-up value"],
    ["Substance over form", "Record the economic reality of a transaction rather than its legal form", "A finance lease shown as an asset and a liability"],
  ],
  ["l", "l", "l"],
);

const terms = table(
  ["ZIMSEC (common usage)", "Cambridge 9706"],
  [
    ["Accruals concept; matching concept", "Matching (accruals)"],
    ["Inventory (stock); net realisable value", "Inventory; net realisable value"],
    ["Income statement", "Statement of profit or loss"],
  ],
  ["l", "l"],
);

const body = t`
## Introduction

Nyasha runs a clothing wholesaler in Bulawayo. At the year end she has unsold stock of one line that no longer sells, a customer who ordered goods in December but will pay in January and a machine which she rents on terms that make her responsible for it as if she owned it. The accountant must decide when to record the sale, what value to put on the stock and whether the machine belongs in the statement. These decisions are guided by the **reporting concepts**. They affect profit and the statement of financial position in almost every question you will meet in the course.

This lesson covers prudence, realisation, matching, materiality, consistency, going concern and substance over form. The recording concepts (entity, historical cost, money measurement, duality and objectivity) are in the previous lesson.

:::keyfact{title="ZIMSEC and Cambridge terms"}
${terms}

Both boards ask you to name the concept behind a treatment, apply it with figures and state the effect on profit and assets. Do not confuse realisation (when revenue is earned) with matching (which period expenses belong to).
:::

## Key definitions

:::definition{term="Prudence"}
Profit and assets should not be overstated and expenses and liabilities should not be understated. Provide for expected losses; do not anticipate profits.
:::

:::definition{term="Realisation"}
Revenue is recognised when the goods are delivered or the service is performed and the right to payment arises, not when cash is received.
:::

:::definition{term="Matching (accruals)"}
Expenses are charged in the period in which they help to earn the revenue, whether or not cash has been paid.
:::

:::definition{term="Net realisable value (NRV)"}
The estimated selling price less any costs still to be incurred to complete and sell the item.
:::

## The concepts at a glance

${concepts}

## Prudence and the value of inventory

Inventory is valued at the **lower of cost and net realisable value**. If goods can be sold for less than they cost, the loss is recognised now. If they can be sold for more, the profit is not recognised until they are sold.

:::worked-solution[Example 1: inventory at the lower of cost and NRV]
Nyasha has three product lines. The estimated selling prices and costs of selling are shown.

${invTbl}

1. Product A: NRV = 6,500 - 300 = 6,200, which is above cost of 4,800, so it stays at cost.
2. Product B: NRV = 3,300 - 200 = 3,100, below cost of 3,600, so it is valued at 3,100.
3. Product C: NRV = 2,500 - 150 = 2,350, below cost of 2,900, so it is valued at 2,350.
4. Inventory is 4,800 + 3,100 + 2,350 = 10,250. The write-down from cost of 11,300 is 1,050, which reduces profit.
5. The extra profit on Product A (6,200 - 4,800) is not recognised, because prudence does not anticipate profits.
:::

## Realisation, matching, materiality and consistency

:::worked-solution[Example 2: realisation and matching at the year end]
Four events of Nyasha's year ended 31 December 2025 and the treatment each requires.

${rm}

1. Realisation answers "in which year is the revenue earned?".
2. Matching answers "in which year is the cost used?".
3. **Materiality:** an item is material if leaving it out or misstating it could change a user's decision. A pack of paper clips is charged straight to expenses; an item that is large compared with profit is treated carefully.
4. **Consistency:** if the straight-line method of depreciation is used in 2025, the same method is used in 2026 unless a change gives a fairer picture, in which case the change and its effect are disclosed.
:::

## Going concern and substance over form

Statements are prepared on the assumption that the business will continue. Assets are then valued at cost less depreciation because they will be used up over time. If the business is expected to close, assets should be valued at what they would raise on a quick sale (break-up value), and liabilities may become payable immediately.

**Substance over form** records the economic reality. A machine acquired under a finance lease that gives the user the risks and rewards of ownership is shown as an asset with a matching liability, although the legal owner is the lessor.

:::worked-solution[Example 3: going concern and substance over form]
(a) A finance lease and (b) a business facing closure.

**(a)** Nyasha leases a machine for most of its life. The lease transfers the risks and rewards of ownership. The machine is worth US\$18,000.

${j3}

**(b)** The business is in difficulty and may close. The effect on two assets:

${gc}

1. On the going concern basis the two assets total 26,000. On the break-up basis they total 12,000, a fall of 14,000.
2. If doubt exists about going concern the directors must disclose it, because lenders and suppliers need to know.
3. In (a) the asset and the liability both appear in the statement of financial position, although the lessor is the legal owner.
:::

## Common mistakes

:::mistake{title="Anticipating profit"}
Prudence does not allow you to record a profit before it is realised. Inventory with an NRV above cost stays at cost.
:::

:::mistake{title="Confusing realisation with cash received"}
Revenue is recognised when the sale is made, even if payment comes later. A deposit before delivery is not yet revenue.
:::

:::mistake{title="Using prudence to understate profit deliberately"}
Prudence is not a licence for excessive allowances. It requires caution, not bias.
:::

:::mistake{title="Using only the name of the concept"}
State the concept, say how it applies to the facts and give the effect on profit or assets.
:::

## Exam tips

:::exam-tip
Multiple-choice questions in ZIMSEC Paper 1 and Cambridge Paper 1 name the concept from a short scenario. In longer questions, *explain why the treatment is correct* needs the concept, the facts and the effect. *Evaluate* a policy by weighing prudence against fair presentation and consistency against a better method.
:::

:::exam-tip
For inventory questions always compare cost with NRV item by item, not in total. A line-by-line table, as in Example 1, earns the method marks.
:::

## Summary

:::summary
- Prudence: do not overstate profit or assets; inventory is at the lower of cost and net realisable value.
- Realisation: revenue is recognised when earned, not when paid.
- Matching: expenses belong to the period in which they help to earn revenue.
- Materiality: only items large enough to affect decisions need detailed treatment.
- Consistency: use the same methods each period; disclose any change.
- Going concern: assume continuation; if not, value assets at break-up values.
- Substance over form: record economic reality, as with a finance lease.
:::
`;

writeLesson(
  "concepts/reporting.md",
  {
    key: "concepts.reporting",
    title: "Concepts of reporting: prudence, matching, realisation, materiality, consistency, going concern, substance over form",
    summary: "Apply prudence, realisation, matching, materiality, consistency, going concern and substance over form to inventory, depreciation, accruals and leases, and state the effect on profit and assets.",
    concepts: ["aacc.concepts.reporting"],
    estimatedMinutes: 45,
    level: "core",
  },
  body,
);
