// Lesson generator: ledger.capital-revenue (Cambridge only)
import { statement, journal, table, check, sum, r2, fmt, t } from "../lib.mjs";
import { writeLesson } from "./w1a-lib.mjs";

// Example 1: classification schedule
const pay = [
  ["Purchase of a second-hand lorry", 21500, "C"],
  ["Fuel for the lorry", 3260, "R"],
  ["New engine that extends the lorry's life by four years", 4800, "C"],
  ["Replacing worn tyres on the lorry", 1240, "R"],
  ["Painting the depot office", 720, "R"],
  ["Building a new weighbridge at the depot", 9600, "C"],
  ["Drivers' wages", 8400, "R"],
];
const capTotal = sum(pay.filter((p) => p[2] === "C").map((p) => p[1]));
const revTotal = sum(pay.filter((p) => p[2] === "R").map((p) => p[1]));
check("cap", capTotal, 35900);
check("rev", revTotal, 13620);
check("all", capTotal + revTotal, sum(pay.map((p) => p[1])));
const ex1 = table(
  ["Payment", "US\\$", "Classification"],
  pay.map((p) => [p[0], p[1], p[2] === "C" ? "Capital" : "Revenue"]),
  ["l", "r", "l"],
);
const ex1tot = table(["", "US\\$"], [["Total capital expenditure", capTotal], ["Total revenue expenditure", revTotal]]);

// Example 2: cost of a machine
const list = 18000;
const disc = r2(list * 0.05);
const net = r2(list - disc);
const parts = [
  ["List price", list],
  ["Less: trade discount 5%", -disc],
  ["Delivery to the factory", 640],
  ["Foundations for the machine", 900],
  ["Wages of employees who installed it", 480],
];
const cost = sum(parts.map((p) => p[1]));
check("cost", cost, 19120);
const costTbl = statement("Cost of the machine to be capitalised", parts.map((p) => [p[0], p[1]]).concat([["**Cost of the machine**", cost]]), { cols: ["US\\$"], checks: [["cost", cost, 19120]] });
const revItems = table(["Not capitalised: revenue expenditure", "US\\$"], [["Training of operators", 350], ["Maintenance contract for the first year", 720]]);

// Example 3: misclassification
const draft = 41300;
const van = 14500;
const rep = 1350;
const dep = r2(van * 0.2);
const corrected = r2(draft + van - rep - dep);
check("corrected", corrected, 51550);
const vanCarry = r2(van - dep);
check("vanCarry", vanCarry, 11600);
const j = journal(
  [
    { date: "31 Dec", lines: [["Motor vehicles (cost)", van, null], ["Repairs and maintenance", null, van]], narrative: "Delivery van purchased, wrongly debited to repairs" },
    { date: "31 Dec", lines: [["Repairs and maintenance", rep, null], ["Buildings (cost)", null, rep]], narrative: "Repair to the roof wrongly added to the cost of the buildings" },
    { date: "31 Dec", lines: [["Depreciation expense: motor vehicles", dep, null], ["Accumulated depreciation: motor vehicles", null, dep]], narrative: "Depreciation of the van at 20% a year for a full year" },
  ],
  { title: "Journal" },
);
const prof = statement(
  "Corrected profit for the year ended 31 December 2025",
  [
    ["Draft profit for the year", draft],
    ["Add: van purchase removed from repairs", van],
    ["Less: roof repair now charged as an expense", -rep],
    ["Less: depreciation on the van", -dep],
    ["**Corrected profit for the year**", corrected],
  ],
  { cols: ["US\\$"], checks: [["corrected", corrected, 51550]] },
);

const receipts = table(
  ["Receipt", "Capital or revenue", "Where it is recorded"],
  [
    ["Sales of goods", "Revenue", "Statement of profit or loss"],
    ["Commission received", "Revenue", "Statement of profit or loss"],
    ["Loan from a bank", "Capital", "Non-current liabilities"],
    ["Capital introduced by the owner", "Capital", "Capital in the statement of financial position"],
    ["Proceeds of selling an old machine", "Capital", "Disposal account; the profit or loss on disposal is revenue"],
  ],
  ["l", "l", "l"],
);

const body = t`
## Introduction

Farai runs a haulage business in Chinhoyi. This year he bought a second-hand lorry, fitted a new engine, replaced tyres and painted the depot office. All of it is "spending on the lorry or the depot", yet the accounts treat it differently: some of it becomes part of the cost of an asset that will serve the business for years, and some is simply a cost of running the business this year. Getting the classification wrong changes profit, the value of assets and the depreciation charge.

:::keyfact{title="Which board needs this lesson"}
This topic is **Cambridge AS Level** (Papers 1 and 2). ZIMSEC students meet the same idea in the sources of capital and valuation topics and in the O-Level course. The ideas here help ZIMSEC students with non-current asset accounts. Terms are the same in both boards, except that Cambridge writes "statement of profit or loss" where ZIMSEC may say "income statement".
:::

## Key definitions

:::definition{term="Capital expenditure"}
Spending to acquire, improve or extend the life or capacity of a non-current asset, including the costs of bringing it into use. It is recorded in the statement of financial position and depreciated.
:::

:::definition{term="Revenue expenditure"}
Spending on the day-to-day running of the business and on maintaining non-current assets in their existing condition. It is charged to the statement of profit or loss of the period.
:::

:::definition{term="Capital receipt"}
Cash received from sources other than trading, such as a loan, capital from the owner or the sale of a non-current asset. It does not appear in profit (except any profit or loss on disposal).
:::

:::definition{term="Revenue receipt"}
Income from the normal activities of the business, such as sales, commission, rent and interest received. It is credited to the statement of profit or loss.
:::

## How to classify

Ask three questions in order:

1. Does the spending **acquire** a non-current asset or **bring it into working condition** (delivery, installation, legal fees, foundations)? Capital.
2. Does it **improve** the asset or **extend its life or capacity** (a new engine, an extension)? Capital.
3. Does it merely **maintain** the asset in its present condition, or run the business (repairs, fuel, wages, insurance)? Revenue.

Mixed items must be split. A single invoice for a new roof section and routine repairs is part capital and part revenue.

:::worked-solution[Example 1: classifying a schedule of payments]
Farai's payments for the year:

${ex1}

${ex1tot}

1. The lorry (21,500), the new engine (4,800) and the weighbridge (9,600) add to non-current assets.
2. Tyres replace worn parts: revenue. Painting maintains the office: revenue. Fuel and wages are running costs.
3. Check: 35,900 + 13,620 = 49,520, which is the total of the seven payments.
:::

:::worked-solution[Example 2: the cost of a machine]
Rudo buys a packaging machine for her bakery in Mutare.

${costTbl}

${revItems}

1. Include the price after the trade discount, delivery, foundations and the wages of employees who installed it. Trade discount is deducted because the business never pays it.
2. Exclude operator training and the maintenance contract: they do not create or improve the machine.
3. Capital expenditure is 19,120. Revenue expenditure is 350 + 720 = 1,070.
:::

## The effect of misclassification

| Error | Profit | Non-current assets | Depreciation |
| --- | --- | --- | --- |
| Capital item charged as an expense | Understated | Understated | Understated |
| Revenue item capitalised | Overstated | Overstated | Overstated |

Because depreciation is charged on the capitalised amount, the profit effect in the first year is the amount misclassified **less** the depreciation on it.

:::worked-solution[Example 3: correcting errors and finding the corrected profit]
Draft profit for the year ended 31 December 2025 was US\$41,300. A delivery van costing US\$14,500 was debited to repairs and maintenance. A roof repair of US\$1,350 was added to the cost of buildings. Vans are depreciated at 20% a year straight line, for a full year in the year of purchase; no depreciation is charged on buildings.

1. Van: remove 14,500 from expenses (profit rises by 14,500); depreciation 14,500 × 20% = 2,900.
2. Roof repair: charge 1,350 as an expense (profit falls by 1,350).
3. Corrected profit: 41,300 + 14,500 - 1,350 - 2,900 = 51,550.

${j}

${prof}

The van is shown at carrying amount of 11,600 (cost less depreciation) and buildings fall by 1,350.
:::

## Capital and revenue receipts

${receipts}

Only revenue receipts affect profit. A business that treats a bank loan as income overstates profit and hides a liability.

## Common mistakes

:::mistake{title="Capitalising running costs"}
Fuel, insurance, repairs and routine servicing are revenue expenditure even when they relate to a non-current asset.
:::

:::mistake{title="Leaving out the cost of bringing the asset into use"}
Delivery, installation, testing, foundations and legal fees on buying property are capital. Excluding them understates the asset.
:::

:::mistake{title="Forgetting depreciation when correcting profit"}
When a capital item was charged as an expense, profit increases by the amount, but depreciation on the asset reduces it again.
:::

:::mistake{title="Calling a loan receipt income"}
A loan is a capital receipt and a liability. It is never in the statement of profit or loss.
:::

## Exam tips

:::exam-tip
Cambridge Paper 1 asks short classification and effect questions; Paper 2 includes journals correcting misclassified items inside the 30-mark question and the 15-mark questions. For *state the effect on profit* name the direction (overstated or understated) and the amount. For *explain why it matters* mention both the statement of profit or loss and the statement of financial position.
:::

:::exam-tip
Justify a classification with the test: *does it add to or improve the asset, or does it only keep it working?* One mark is usually for the test and one for the conclusion.
:::

## Summary

:::summary
- Capital expenditure acquires, improves or extends non-current assets, including the costs of getting them ready for use.
- Revenue expenditure runs the business and maintains assets as they are; it is charged to profit.
- Split mixed items into their capital and revenue parts.
- A capital item charged as an expense understates profit and assets; a revenue item capitalised overstates both.
- Correct the error by journal and remember depreciation on the capitalised amount.
- Loans, capital introduced and sale proceeds of assets are capital receipts; sales, commission and rent received are revenue receipts.
:::
`;

writeLesson(
  "ledger/capital-revenue.md",
  {
    key: "ledger.capital-revenue",
    title: "Capital and revenue expenditure and income",
    summary: "Classify expenditure and receipts as capital or revenue, split mixed items, work out the cost of a non-current asset and correct the effect of misclassification on profit and asset values.",
    concepts: ["aacc.ledger.capital-revenue"],
    estimatedMinutes: 45,
    level: "core",
  },
  body,
);
