// Lesson generator: concepts.recording
import { table, check, sum, r2, fmt, ratios, chk, statement, journal, t } from "../lib.mjs";
import { writeLesson } from "./w1a-lib.mjs";

// Example 1: business entity (private expense)
const draftProfit = 22600;
const privateElec = 180;
const privateSchool = 650;
const adj = r2(privateElec + privateSchool);
const correctProfit = r2(draftProfit + adj);
check("correctProfit", correctProfit, 23430);
const j1 = journal([{ date: "31 Dec", lines: [["Drawings", adj, null], ["Electricity", null, privateElec], ["General expenses (school fees)", null, privateSchool]], narrative: "Owner's personal expenses paid by the business removed from business expenses" }]);
const e1 = statement(
  "Corrected profit for the year ended 31 December 2025",
  [
    ["Draft profit for the year", draftProfit],
    ["Add back: private electricity", privateElec],
    ["Add back: school fees of the owner's child", privateSchool],
    ["**Corrected profit for the year**", correctProfit],
  ],
  { cols: ["US\\$"], checks: [["profit", correctProfit, 23430]] },
);

// Example 2: historical cost
const landCost = 25000;
const landNow = 90000;
const otherCapital = 35000;
const profit = 12000;
const roceCost = ratios.roce(profit, landCost + otherCapital);
const roceCur = ratios.roce(profit, landNow + otherCapital);
chk(roceCost, 20, 0.0001);
chk(roceCur, 9.6, 0.0001);
const e2 = table(
  ["", "Land at historical cost", "Land at current value"],
  [
    ["Land US$", landCost, landNow],
    ["Other net assets US$", otherCapital, otherCapital],
    ["Capital employed US$", landCost + otherCapital, landNow + otherCapital],
    ["Profit for the year US$", profit, profit],
    ["Return on capital employed", "20.0%", "9.6%"],
  ],
).replace(/US\$/g, "US\\$");

// Example 3: what is recorded
const rec = table(
  ["Item", "Recorded in the accounts?", "Concept"],
  [
    ["Purchase of a delivery van for US$18,000", "Yes, at cost", "Historical cost; money measurement; objectivity (invoice)"],
    ["The skills and loyalty of the bakery staff", "No", "Money measurement: they cannot be measured reliably in money"],
    ["The owner's personal car", "No (not a business asset)", "Business entity"],
    ["An increase in the market value of the shop premises", "No (at cost) unless the business revalues", "Historical cost"],
    ["A good reputation built over twenty years (goodwill)", "No, unless bought when purchasing a business", "Money measurement; objectivity"],
    ["A sale of goods on credit", "Yes: two accounts affected", "Duality"],
  ],
  ["l", "l", "l"],
).replace(/US\$18,000/, "US\\$18,000");

const terms = table(
  ["ZIMSEC (common usage)", "Cambridge 9706"],
  [
    ["Business entity; money measurement; historical cost; duality; objectivity", "Same concepts; Cambridge adds prudence and others in the reporting lesson"],
    ["Income statement", "Statement of profit or loss"],
  ],
  ["l", "l"],
);

const body = t`
## Introduction

Tendai owns a hardware shop in Gweru. In December he pays his home electricity bill and his child's school fees from the business bank account. He also bought land for the shop in 2010 for US\$25,000, and it is now worth much more. He wonders whether to record the extra value, whether to count the skill of his staff as an asset and whether the shop's accounts should include his own spending. The recording concepts answer these questions. They are the basic rules on which every other accounting rule rests.

This lesson covers five **recording concepts**: business entity, historical cost, money measurement, duality and objectivity. The **reporting concepts** (prudence, matching, realisation, materiality, consistency, going concern and substance over form) are in the next lesson. Double entry is explained in detail in the ledger lessons.

:::keyfact{title="ZIMSEC and Cambridge terms"}
${terms}

Both boards ask you to name the concept behind a treatment and apply it to a described situation, and to state the effect on profit or assets.
:::

## Key definitions

:::definition{term="Business entity concept"}
The business is treated as separate from its owner. Only the transactions of the business are recorded; the owner's private affairs are excluded.
:::

:::definition{term="Historical cost concept"}
Assets are recorded at the price paid for them when they were acquired, not at a later or estimated value.
:::

:::definition{term="Money measurement concept"}
Only items that can be measured in money terms are recorded.
:::

:::definition{term="Duality concept"}
Every transaction has two aspects, a debit and an equal credit, so the accounting equation always holds.
:::

:::definition{term="Objectivity concept"}
Accounting records should be based on verifiable evidence, such as invoices and receipts, and not on the opinion of those preparing them.
:::

## Business entity

The business and the owner are separate **for accounting**, even if the law does not separate them for a sole trader. The owner's investment is recorded as **capital**, a liability of the business to its owner; what the owner takes out for private use is **drawings**. This is why personal items paid from the business bank account are not expenses.

:::worked-solution[Example 1: private expenses paid by the business]
The draft profit of Tendai's shop for 2025 was US\$22,600. A review of the expenses shows that the electricity account includes US\$180 for his home and general expenses include school fees of US\$650 for his child.

${j1}

${e1}

1. The two private items are not business costs, so they are removed from expenses.
2. They become drawings, which reduce Tendai's capital but never appear in the statement of profit or loss.
3. Profit rises by 180 + 650 = 830 to 23,430.
:::

## Historical cost

An asset is recorded at its cost on the day it was bought. This is **objective**, because an invoice proves the price, and it is simple. Its weakness is that, with rising prices, old assets are carried at amounts far below their present value, so the statement of financial position understates asset values and profitability measures can be misleading.

:::worked-solution[Example 2: the effect of historical cost on a ratio]
Land bought in 2010 for US\$25,000 is now worth US\$90,000. Other net assets are US\$35,000 and the profit for the year is US\$12,000.

${e2}

1. At historical cost the capital employed is 25,000 + 35,000 = 60,000, so the return is 12,000 ÷ 60,000 = 20.0%.
2. At current value it is 90,000 + 35,000 = 125,000, so the return is 12,000 ÷ 125,000 = 9.6%.
3. The first figure flatters the business because the land is shown at a value from 2010. The second is nearer to what the owner could earn by selling the land and investing elsewhere.
:::

## Money measurement

Only items that have a monetary value and can be measured reliably are recorded. The skills of staff, the quality of management, the loyalty of customers and a good location are valuable but are excluded because there is no objective cost or amount. Money measurement also assumes a stable value of money; with inflation, figures from different years are not directly comparable.

## Duality and objectivity

Duality is the basis of double entry and the accounting equation (see the ledger lessons). Objectivity means that a figure should be supported by evidence: a supplier's invoice for a purchase, a receipt for cash, a stock count for inventory, a bank statement for the bank balance. Opinions may be needed for estimates such as depreciation and allowances, but they should be based on evidence and applied consistently.

:::worked-solution[Example 3: what is recorded and why]
Chipo's bakery in Chinhoyi. For each item decide whether it is recorded and name the concept.

${rec}

1. The test for each item is: is it business activity, is there evidence of cost and can it be measured in money?
2. Items that fail are left out of the statements, even though they may matter greatly to the value of the business.
:::

## Strengths and weaknesses

- **Strengths:** records are objective and checkable, simple to apply, and consistent between businesses.
- **Weaknesses:** historical cost values assets out of date, money measurement ignores valuable but unmeasurable resources, and inflation reduces the meaning of old figures. The statement of financial position is therefore **not** a valuation of the business.

## Common mistakes

:::mistake{title="Recording the owner's private spending as an expense"}
Anything paid for the owner's private use is drawings. It must not reduce the profit of the business.
:::

:::mistake{title="Confusing historical cost with prudence"}
Historical cost concerns the value at which assets are recorded. Prudence concerns not overstating profit or assets. Use the right name.
:::

:::mistake{title="Saying goodwill is always recorded"}
Internally generated goodwill is not recorded because it cannot be measured objectively. Only purchased goodwill appears in the statements.
:::

:::mistake{title="Naming the concept without applying it"}
Say how the concept affects the figure: for example, historical cost means land bought in 2010 is still shown at US\$25,000.
:::

## Exam tips

:::exam-tip
Multiple-choice questions in ZIMSEC Paper 1 and Cambridge Paper 1 ask you to name the concept in a short scenario. In longer questions, *explain* means give the concept, apply it to the facts and state the effect on profit or assets. *Evaluate* historical cost by giving an advantage (objective, simple) and a disadvantage (assets out of date) and then a judgement.
:::

:::exam-tip
Draw the connection between a concept and a number whenever you can. For example, a shopkeeper's private spending removed from expenses raises profit by exactly that amount.
:::

## Summary

:::summary
- The business is separate from its owner: private spending is drawings, not an expense.
- Assets are recorded at historical cost, which is objective but can be out of date.
- Only items measurable in money are recorded: staff skills and good reputation are excluded.
- Duality gives two equal entries for every transaction.
- Objectivity needs evidence such as invoices and receipts.
- The statement of financial position is therefore not a valuation of the business.
:::
`;

writeLesson(
  "concepts/recording.md",
  {
    key: "concepts.recording",
    title: "Concepts of recording: entity, historical cost, money measurement, duality, objectivity",
    summary: "Apply the business entity, historical cost, money measurement, duality and objectivity concepts to described situations, name the concept breached and state the effect on profit and asset values.",
    concepts: ["aacc.concepts.recording"],
    estimatedMinutes: 40,
    level: "core",
  },
  body,
);
