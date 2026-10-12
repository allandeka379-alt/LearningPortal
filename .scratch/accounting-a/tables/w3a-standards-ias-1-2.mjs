// Lesson generator: standards.ias-1-2
import { fmt, chk, check, r2, sum, table, ratios, inventory } from "../lib.mjs";
import { writeLesson, front } from "./w3a-lib.mjs";

// Example 1: IAS 2, lower of cost and NRV item by item
const items = [
  { name: "Cement (50 kg bags)", units: 4000, cost: 7.2, price: 9.5, sell: 0.6 },
  { name: "Roofing sheets", units: 1500, cost: 18, price: 17, sell: 1.5 },
  { name: "Paint (20 litre tins)", units: 900, cost: 36, price: 52, sell: 4 },
  { name: "Damaged door frames", units: 400, cost: 25, price: 30, sell: 12 },
];
const rows = items.map((i) => {
  const nrv = r2(i.price - i.sell);
  const lower = inventory.lowerOfCostAndNrv(i.cost, i.price, i.sell);
  return { ...i, nrv, lower: r2(lower), costTotal: r2(i.units * i.cost), valTotal: r2(i.units * lower), basis: lower === i.cost ? "Cost" : "NRV" };
});
const costAll = sum(rows.map((r) => r.costTotal));
const valAll = sum(rows.map((r) => r.valTotal));
const writeDown = r2(costAll - valAll);
chk(costAll, 4000 * 7.2 + 1500 * 18 + 900 * 36 + 400 * 25);
chk(writeDown, 1500 * 2.5 + 400 * 7);
chk(rows[1].nrv, 15.5); chk(rows[3].nrv, 18);
const invTable = table(["Item", "Units", "Cost per unit US\\$", "NRV per unit US\\$", "Lower per unit US\\$", "Cost total US\\$", "Value used US\\$"], rows.map((r) => [r.name, String(r.units), String(r.cost.toFixed(2)), r.nrv.toFixed(2), `${r.lower.toFixed(2)} (${r.basis})`, r.costTotal, r.valTotal]), ["l", "r", "r", "r", "r", "r", "r"]);
const totalNrvWrong = r2(rows.reduce((s, r) => s + r.units * r.nrv, 0));
const gpBefore = 248000, gpAfter = r2(gpBefore - writeDown);

// Example 2: IAS 1 draft review
const draft = { ca: 80000, cl: 40000 };
const off = 6000, loanCurrent = 25000;
const fixed = { ca: r2(draft.ca + off), cl: r2(draft.cl + off + loanCurrent) };
const crDraft = ratios.current(draft.ca, draft.cl), crFixed = ratios.current(fixed.ca, fixed.cl);
chk(crDraft, 2); chk(fixed.ca, 86000); chk(fixed.cl, 71000);
const corr = table(["Item in the draft", "Breach", "Correction", "Current assets US\\$", "Current liabilities US\\$"], [
  ["Draft totals", "", "", draft.ca, draft.cl],
  ["Receivable of US\\$6,000 from a customer who is also a supplier set off against the payable", "Offsetting", "Show both gross", off, off],
  ["Loan of US\\$25,000 repayable in eight months shown as non-current", "Classification", "Show as current liability", 0, loanCurrent],
  ["**Corrected totals**", "", "", fixed.ca, fixed.cl],
], ["l", "l", "l", "r", "r"]);

const body = `## Introduction

Two standards sit behind almost every set of financial statements. **IAS 1** says how statements must be presented, so that those from Hwange Hardware Ltd can be compared with those from a competitor in Bulawayo. **IAS 2** says how inventory must be valued, because inventory is often the largest current asset and a small error moves profit.

You already know how to prepare statements and how to value inventory by FIFO and AVCO (the calculations are in the inventory lesson). Here you study the rules behind the layouts and the valuation: what the standards require, why, and how to apply them to a scenario. The standards are examined in ZIMSEC Form 6 and in Cambridge A Level only. The descriptions below are in our own words and cover the provisions the syllabus lists.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| IAS 1 Presentation of financial statements | IAS 1 Presentation of financial statements |
| IAS 2 Inventories (stocks) | IAS 2 Inventories |
| Net realisable value | Net realisable value |
| Prudence | Prudence (the lower of cost and NRV applies it) |

Both boards examine the same provisions. ZIMSEC questions often ask you to *state* the principle; Cambridge questions often ask you to *apply* it to a described situation.
:::

## Key definitions

:::definition{term="Fair presentation"}
Presenting the effects of transactions faithfully, in line with accounting standards, so that the statements show a true and fair view.
:::

:::definition{term="Going concern"}
The assumption that the business will continue in operation for the foreseeable future, so assets are not valued as if it were about to close.
:::

:::definition{term="Materiality"}
An item is material if omitting or misstating it could influence users' decisions. Material items of a different nature are shown separately; immaterial items may be aggregated.
:::

:::definition{term="Net realisable value (NRV)"}
The estimated selling price of inventory in the normal course of business, less the estimated costs of completion and the costs necessary to make the sale.
:::

## IAS 1: the rules of presentation

A complete set of financial statements has five parts: the statement of profit or loss and other comprehensive income, the statement of financial position, the statement of changes in equity, the statement of cash flows and the notes. Comparative figures for the previous period are shown for all amounts.

:::keyfact{title="Main requirements of IAS 1"}
- **Fair presentation and compliance** with standards.
- **Going concern:** the statements are prepared on that basis unless the directors plan to liquidate the business.
- **Accruals:** income and expenses are recognised when earned or incurred, not when cash moves.
- **Consistency:** presentation and classification stay the same from year to year, unless a change gives better information.
- **Materiality and aggregation:** material classes are shown separately; immaterial items are aggregated.
- **No offsetting** of assets and liabilities or of income and expenses unless a standard allows it.
- **Current and non-current** classification: an asset is current if it is expected to be realised within the normal operating cycle or twelve months; a liability is current if it is due within twelve months.
- **Minimum line items** appear on the face of the statements, for example revenue, finance costs, tax expense, inventories, trade receivables, cash, trade payables and provisions.
:::

## IAS 2: inventories

Inventory is measured at the **lower of cost and net realisable value**, item by item or for groups of similar items. This is prudence: a loss is recognised when it appears, a gain only when it is realised. Cost includes the purchase price, import duties, transport inwards and other direct costs of getting the goods to their present location. It excludes storage costs (unless essential to production), administrative overheads, selling costs and abnormal wastage. Cost is found by FIFO or weighted average (AVCO). LIFO is not permitted. The financial statements disclose the accounting policy, the carrying amount by category and the amount of any write-down.

:::worked-solution[Example 1: lower of cost and NRV]
At 31 December 2025 Hwange Hardware Ltd held the inventory below. Selling costs are the costs of selling each unit. Value the inventory under IAS 2 and find the write-down.

${invTable}

1. NRV per unit = selling price - selling costs. Cement: ${fmt(9.5)} - ${fmt(0.6)} = ${fmt(rows[0].nrv)}, above cost, so cost is used.
2. Roofing sheets: ${fmt(17)} - ${fmt(1.5)} = ${fmt(rows[1].nrv)}, below cost ${fmt(18)}, so NRV is used.
3. Paint: NRV ${fmt(rows[2].nrv)} is above cost. Door frames: NRV ${fmt(rows[3].nrv)} is below cost ${fmt(25)}, so NRV is used.
4. Inventory at cost ${fmt(costAll)}; inventory under IAS 2 ${fmt(valAll)}; write-down ${fmt(writeDown)} (${fmt(r2(1500 * 2.5))} on roofing sheets and ${fmt(r2(400 * 7))} on door frames).
5. The write-down is added to cost of sales; gross profit before it was ${fmt(gpBefore)}, after it ${fmt(gpAfter)}.

Note that the gain on the cement and the paint (NRV above cost) is **not** recognised. Using the total NRV of ${fmt(totalNrvWrong)} against the total cost of ${fmt(costAll)} would hide the losses and break the rule that items are valued one by one.
:::

## Applying IAS 1 to a draft

Exam questions often give a draft statement and ask which presentation rules are broken. Look for offsetting, wrong classification between current and non-current, missing comparatives and inconsistent headings.

:::worked-solution[Example 2: reviewing a draft against IAS 1]
The draft statement of financial position of Mazowe Tractors Ltd shows current assets of US\\$${fmt(draft.ca)} and current liabilities of US\\$${fmt(draft.cl)}. It was found that (1) a receivable of US\\$${fmt(off)} from a customer who is also a supplier had been set off against the payable to that supplier, and (2) a loan of US\\$${fmt(loanCurrent)} repayable in eight months had been shown as non-current. Correct the totals and comment on the current ratio.

${corr}

1. Offsetting is not allowed here, so the receivable and the payable are each shown gross: current assets and current liabilities both rise by ${fmt(off)}.
2. The loan is due within twelve months, so it is a current liability.
3. Current ratio before: ${fmt(draft.ca)} ÷ ${fmt(draft.cl)} = ${fmt(r2(crDraft))} : 1. After: ${fmt(fixed.ca)} ÷ ${fmt(fixed.cl)} = ${fmt(r2(crFixed))} : 1.

The company looks much less liquid after the corrections. Following the standard is not just a matter of layout: it changes how users judge the business.
:::

## Why standards matter

Standards make statements comparable between companies and between years. Prudence in IAS 2 prevents inventory from being overstated, while IAS 1's current and non-current split lets users judge liquidity. The rules also limit management's ability to present the figures in a flattering way.

## Common mistakes

:::mistake{title="Valuing inventory in total instead of item by item"}
Compare cost with NRV for each item (or group of similar items) and add the lower amounts. Totals hide the individual losses.
:::

:::mistake{title="Increasing inventory to NRV when NRV is above cost"}
Inventory is never valued above cost. The gain is recognised only when the goods are sold.
:::

:::mistake{title="Deducting selling costs from cost instead of from selling price"}
NRV = selling price - costs to complete and sell. The comparison is then with cost.
:::

:::mistake{title="Offsetting a receivable and a payable without permission"}
IAS 1 requires both to be shown gross unless a standard permits offsetting.
:::

:::mistake{title="Classifying a loan by its original term"}
Classify by the date of repayment from the reporting date: the part due within twelve months is current.
:::

## Exam tips

:::exam-tip
Tested in ZIMSEC Paper 2 and 3 questions on standards (Form 6) and in Cambridge Papers 1 and 3. For *state*, give the requirement in one sentence. For *explain*, link the requirement to its purpose (comparability, prudence). For *calculate*, show cost, NRV and the lower figure for each item. For *discuss the effect*, say what happens to profit, inventory and ratios.
:::

:::exam-tip
Name the principle when you describe a breach ("offsetting", "going concern", "consistency"). The marks are for naming and applying it, not for general comments.
:::

## Summary

:::summary
- IAS 1 requires fair presentation, going concern, accruals, consistency, materiality and aggregation, no offsetting, comparatives and a current/non-current split.
- A complete set has the statements of profit or loss, financial position, changes in equity, cash flows and notes.
- IAS 2 values inventory at the lower of cost and NRV, item by item; FIFO and AVCO are allowed, LIFO is not.
- NRV = estimated selling price - costs to complete and sell; a write-down increases cost of sales.
- Applying the standards changes reported profit and liquidity, so users can compare companies fairly.
:::
`;
writeLesson("standards/ias-1-2.md", front("standards.ias-1-2", "IAS 1 and IAS 2: presentation and inventories", "Describe the main requirements of IAS 1 and IAS 2 and apply them to a set of statements: the principles of presentation and the valuation of inventory at the lower of cost and NRV.", ["aacc.standards.ias-1-2"], 50), body.split("US$").join("US\\$"));
