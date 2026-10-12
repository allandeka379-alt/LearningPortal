// Lesson generator: standards.ias-8-10
import { fmt, chk, check, r2, sum, table, depreciation } from "../lib.mjs";
import { writeLesson, front } from "./w3a-lib.mjs";

// Example 1: change in estimate, change in policy, prior-period error
const cost = 90000, life = 10, elapsed = 4, newLife = 12;
const oldCharge = depreciation.straightLine(cost, 0, life); chk(oldCharge, 9000);
const accDep = r2(oldCharge * elapsed); chk(accDep, 36000);
const cv = r2(cost - accDep); chk(cv, 54000);
const remaining = newLife - elapsed; chk(remaining, 8);
const newCharge = r2(cv / remaining); chk(newCharge, 6750);
const profitUp = r2(oldCharge - newCharge); chk(profitUp, 2250);
const errInv = 5200, retOpen = 61800;
const retRestated = r2(retOpen - errInv); chk(retRestated, 56600);
const ex1 = table(["Matter", "Type", "Treatment", "Effect in 2025"], [
  ["Machine life revised from 10 to 12 years in total", "Change in accounting estimate", "Prospective: from 2025 onward; no restatement", `Depreciation falls from ${fmt(oldCharge)} to ${fmt(newCharge)}; profit rises by ${fmt(profitUp)}`],
  ["Closing inventory of 2024 overstated by US\\$5,200 (counting error found in 2025)", "Prior-period error", "Retrospective: restate 2024 comparatives and opening retained earnings", `Opening retained earnings fall from ${fmt(retOpen)} to ${fmt(retRestated)}`],
], ["l", "l", "l", "l"]);

// Example 2: IAS 10
const profit0 = 84000;
const events = [
  { n: 1, text: "On 20 January 2026 a customer who owed US$7,400 at the year end was declared insolvent; the debt arose in 2025.", kind: "Adjusting", effect: -7400, action: "Write off the debt as an irrecoverable debt in 2025" },
  { n: 2, text: "In January 2026 inventory that cost US$12,000 at the year end was sold for a net US$8,500.", kind: "Adjusting", effect: -3500, action: "Write inventory down to NRV in 2025 (IAS 2)" },
  { n: 3, text: "In February 2026 a fire destroyed a warehouse that was fully insured except for a US$30,000 excess.", kind: "Non-adjusting", effect: 0, action: "Disclose the nature and estimated effect in a note" },
  { n: 4, text: "In February 2026 the directors declared a final dividend of US$18,000.", kind: "Non-adjusting", effect: 0, action: "Disclose; no liability at the year end" },
  { n: 5, text: "In January 2026 a court case was settled, with damages of US$9,200 against the company. A provision of US$6,000 had been made.", kind: "Adjusting", effect: -3200, action: "Increase the provision by 3,200 in 2025" },
];
const adjProfit = r2(profit0 + sum(events.map((e) => e.effect))); chk(adjProfit, 69900);
const evTable = table(["No.", "Event after the year end", "Type", "Action", "Effect on profit US\\$"], events.map((e) => [String(e.n), e.text.replace("US$", "US\\$").replace("US$", "US\\$"), e.kind, e.action, e.effect]), ["l", "l", "l", "l", "r"]);

const body = `## Introduction

Kudakwashe Transport Ltd has just finished its audit. Two things can still change the statements: the directors discover that an earlier figure was wrong, or something happens in January that affects the year just ended. **IAS 8** deals with changes to policies, estimates and mistakes. **IAS 10** deals with events after the reporting period. Both explain when you adjust the figures and when you only add a note.

You should know how to prepare statements and the concepts of accruals and prudence. Here you learn to decide the type of change or event and to apply the correct treatment. The standards are tested in ZIMSEC Form 6 and in Cambridge at A Level (Paper 3). The explanations below are in our own words.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| IAS 8 Accounting policies, changes in accounting estimates and errors | IAS 8 Accounting policies, changes in accounting estimates and errors |
| IAS 10 Events after the reporting period (balance sheet date) | IAS 10 Events after the reporting period |
| Adjusting and non-adjusting events | Adjusting and non-adjusting events |
| Prior period adjustment | Retrospective restatement |
:::

## Key definitions

:::definition{term="Accounting policy"}
The specific principles, bases and rules applied in preparing the statements, such as FIFO for inventory or straight-line depreciation.
:::

:::definition{term="Change in accounting estimate"}
A revision of a judgement about an uncertain amount, such as the life of an asset or the allowance for irrecoverable debts, because of new information.
:::

:::definition{term="Prior-period error"}
An omission or misstatement in earlier statements, caused by arithmetical mistakes, misapplied policies, oversights or fraud, which is discovered later.
:::

:::definition{term="Adjusting event"}
An event after the reporting period that provides evidence of conditions that existed at the reporting date, so the figures are adjusted.
:::

:::definition{term="Non-adjusting event"}
An event after the reporting period that concerns conditions that arose after the reporting date. The figures are not changed, but material items are disclosed.
:::

## IAS 8: policies, estimates and errors

A business must use the same policies from year to year. It may change a policy only if a standard requires it or if the change gives more reliable and relevant information. A change in **policy** is applied **retrospectively**: the comparatives and the opening retained earnings are restated as though the new policy had always been used.

A change in an **estimate** is applied **prospectively**. The new estimate affects the current year and later years. Nothing is restated, because the earlier figures were the best estimate at the time.

A material **prior-period error** is corrected retrospectively: the comparative figures are restated and the opening balance of retained earnings is adjusted. An immaterial error is corrected in the current year.

:::worked-solution[Example 1: estimate against error]
Kudakwashe Transport Ltd bought a machine for US\\$${fmt(cost)} with no residual value. It was depreciated straight-line over ${life} years. After ${elapsed} years the directors reviewed its life and decided that the total life is ${newLife} years. Separately, in 2025 it was found that closing inventory at 31 December 2024 had been overstated by US\\$${fmt(errInv)}, and retained earnings at 1 January 2025 were reported as US\\$${fmt(retOpen)}. State the type of each matter, its treatment and its effect.

${ex1}

1. Annual charge before the change: ${fmt(cost)} ÷ ${life} = ${fmt(oldCharge)}. Accumulated depreciation after ${elapsed} years: ${fmt(accDep)}; carrying amount ${fmt(cv)}.
2. Remaining life: ${newLife} - ${elapsed} = ${remaining} years. New charge: ${fmt(cv)} ÷ ${remaining} = ${fmt(newCharge)}. Profit is ${fmt(profitUp)} higher each year.
3. The inventory error: closing inventory overstated means 2024 profit was overstated by ${fmt(errInv)}. Opening retained earnings are restated to ${fmt(retOpen)} - ${fmt(errInv)} = ${fmt(retRestated)}. The comparatives for 2024 are restated and a note describes the correction.
:::

## IAS 10: events after the reporting period

The period runs from the reporting date to the date the statements are authorised for issue. Ask one question: did the event give evidence about conditions that **existed at the year end**? If so it is adjusting. If the condition arose afterwards, it is non-adjusting. For non-adjusting events that are material, the notes describe their nature and estimate their financial effect. Dividends declared after the year end are not a liability at the year end.

:::worked-solution[Example 2: classifying events]
Profit before these items was US\\$${fmt(profit0)}. For each event after the reporting date of 31 December 2025, state whether it is adjusting or non-adjusting and state the action.

${evTable}

1. Events 1, 2 and 5 are adjusting: each gives evidence about conditions at 31 December 2025 (the debt, the value of the inventory and the claim already existed).
2. Events 3 and 4 are non-adjusting: the fire and the dividend declaration happened after the year end. They are disclosed in the notes.
3. Adjusted profit: ${fmt(profit0)} - ${fmt(7400)} - ${fmt(3500)} - ${fmt(3200)} = ${fmt(adjProfit)}.
:::

## Why the rules matter

Without these standards a company could hide a loss by pushing it into a later year, or change estimates each year to smooth profit. IAS 8 limits changes in policy and requires errors to be corrected openly. IAS 10 ensures that evidence available before the statements are issued is used, and that users are told about major events that happen soon after the year end.

## Common mistakes

:::mistake{title="Restating earlier years for a change in estimate"}
A change in estimate is prospective. Only the current and future periods change.
:::

:::mistake{title="Treating a fire after the year end as an adjusting event"}
The fire did not exist at the year end. It is non-adjusting and disclosed in a note.
:::

:::mistake{title="Recognising a dividend declared after the year end as a liability"}
There was no obligation at the year end. The dividend is disclosed and recognised in the next year.
:::

:::mistake{title="Correcting a material prior-period error through the current year's profit"}
Restate the comparatives and the opening retained earnings. Do not pass the correction through current profit.
:::

:::mistake{title="Applying a change of policy only from the current year"}
A change in policy is retrospective: the comparatives are restated as though the new policy had always been used.
:::

## Exam tips

:::exam-tip
Tested in ZIMSEC Papers 1 and 2 and in Cambridge Papers 1 and 3. For *state* or *identify*, name the type (estimate, policy, error; adjusting or non-adjusting) and give the treatment. For *calculate*, show the revised depreciation or adjusted profit step by step. For *explain*, give the reason: the earlier figures were the best estimate, or the event gives evidence of year-end conditions.
:::

:::exam-tip
Use the test "did the condition exist at the year end?" for IAS 10 and the test "new information about an estimate, or an earlier mistake?" for IAS 8. Write the test in your answer.
:::

## Summary

:::summary
- A change in accounting policy and the correction of a material prior-period error are retrospective; a change in estimate is prospective.
- A change in policy is allowed only if required by a standard or if it gives more reliable information.
- An adjusting event gives evidence of conditions at the year end and changes the figures; a non-adjusting event is disclosed only.
- A dividend declared after the year end is not a liability at the year end.
- A new estimate of an asset's life changes depreciation over the remaining life: carrying amount ÷ remaining life.
:::
`;
writeLesson("standards/ias-8-10.md", front("standards.ias-8-10", "IAS 8 and IAS 10: changes, errors and events after the year end", "Distinguish changes in accounting policy, changes in estimate and prior-period errors, and classify events after the reporting period as adjusting or non-adjusting.", ["aacc.standards.ias-8-10"], 50), body.split("US$").join("US\\$"));
