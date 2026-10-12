// Lesson generator: standards.ias-37
import { fmt, chk, r2, sum, table, journal, tAccount } from "../lib.mjs";
import { writeLesson, front } from "./w3a-lib.mjs";

// Example 1: warranty provision
const units = 1200, rate = 4, avgRepair = 120;
const prov1 = r2(units * (rate / 100) * avgRepair); chk(prov1, 5760);
const j1 = journal([{ date: "31 Dec 2025", lines: [["Warranty expense (statement of profit or loss)", prov1, null], ["Provision for warranty claims (current liabilities)", null, prov1]], narrative: "Provision for repairs expected on machines sold in 2025" }], { title: "Journal at 31 December 2025" });
// year 2: repairs used 4,900, new estimate 6,100
const used = 4900, target = 6100;
const left = r2(prov1 - used); chk(left, 860);
const topUp = r2(target - left); chk(topUp, 5240);
const provT = tAccount("Provision for warranty claims", [["2026", "Repairs paid (used)", used], ["31 Dec 2026", "Balance c/d", target]], [["1 Jan 2026", "Balance b/d", prov1], ["31 Dec 2026", "Statement of profit or loss (top-up)", topUp]], { balance: false });
chk(used + target, prov1 + topUp);

// Example 2: classification
const items = [
  { id: 1, text: "A customer is suing for US$24,000. The lawyers say it is probable that the company will lose and the amount can be estimated reliably.", chance: "Probable", treat: "Recognise a provision", provision: 24000, discl: 0 },
  { id: 2, text: "Another customer is suing for US$18,000. The lawyers say it is possible, but less than probable, that the company will lose.", chance: "Possible", treat: "Contingent liability: disclose in a note", provision: 0, discl: 18000 },
  { id: 3, text: "A claim for US$9,500 is thought to have a remote chance of success.", chance: "Remote", treat: "No provision and no disclosure", provision: 0, discl: 0 },
  { id: 4, text: "The company is claiming US$15,000 in damages. Success is probable but not certain.", chance: "Probable inflow", treat: "Contingent asset: disclose in a note, do not recognise", provision: 0, discl: 0 },
  { id: 5, text: "The board decided in December to close a depot, announced the plan in detail to the staff and has a US$14,000 cost of redundancy payments.", chance: "Constructive obligation", treat: "Recognise a provision for redundancy costs", provision: 14000, discl: 0 },
];
const totalProv = sum(items.map((i) => i.provision)); chk(totalProv, 38000);
const totalDiscl = sum(items.map((i) => i.discl)); chk(totalDiscl, 18000);
const clsTable = table(["No.", "Situation", "Likelihood", "Treatment"], items.map((i) => [String(i.id), i.text.split("US$").join("US\\$"), i.chance, i.treat]), ["l", "l", "l", "l"]);

const body = `## Introduction

A customer in Gweru is suing Mukwa Engineering Ltd for faulty work. The company has sold machines with a one-year guarantee. The directors plan to close a depot. At the year end none of these has cost any money yet, but each might. **IAS 37** answers three questions: which uncertain future costs are recorded as liabilities (a **provision**), which are mentioned only in a note (a **contingent liability**), and when a possible gain can be mentioned (a **contingent asset**).

You have studied the accruals concept and prudence. This lesson shows how they apply to uncertain obligations. IAS 37 is **Cambridge A Level only**. It is not in the ZIMSEC list of standards, so ZIMSEC candidates do not need it. The explanation is in our own words and covers the main provisions.

:::keyfact{title="Who needs this lesson"}
| Board | Status |
| --- | --- |
| Cambridge 9706 | Paper 3 (A Level): provisions, contingent liabilities, contingent assets |
| ZIMSEC | Not examined; ZIMSEC candidates use the allowance for irrecoverable debts and accruals, which are covered elsewhere |
:::

## Key definitions

:::definition{term="Provision"}
A liability of uncertain timing or amount. It is recognised when there is a present obligation from a past event, an outflow of resources is probable and a reliable estimate can be made.
:::

:::definition{term="Contingent liability"}
A possible obligation that depends on a future event, or a present obligation that is not recognised because an outflow is not probable or cannot be measured reliably. It is disclosed unless the chance is remote.
:::

:::definition{term="Contingent asset"}
A possible asset that arises from a past event and depends on a future event outside the company's control. It is disclosed when an inflow is probable; it is recognised only when it is virtually certain.
:::

:::definition{term="Constructive obligation"}
An obligation created by the company's own actions, for example by announcing a detailed plan to others who then expect it to be carried out.
:::

## The recognition rules

A provision is recognised only if **all three** conditions hold: a present obligation (legal or constructive) from a past event; a probable outflow of economic benefits; and a reliable estimate. Probable means more likely than not. If one condition is missing, the item is a contingent liability or nothing at all.

:::keyfact{title="Decision rule for an uncertain obligation"}
- Probable and reliably measurable: **recognise a provision**.
- Possible (not probable): **disclose a contingent liability**.
- Remote: **do nothing**.
- Contingent assets: disclose when an inflow is probable; recognise only when virtually certain (then it is no longer contingent).
:::

A provision is not made for **future operating losses**, because there is no obligation yet. A provision for restructuring needs a detailed formal plan and a valid expectation in those affected, for example because the plan has been announced. It includes only direct costs of the restructuring, such as redundancy payments. At each reporting date the provision is reviewed. Costs are charged against it when incurred. If the estimate changes, the difference is taken to profit or loss. Unused provisions are released.

:::worked-solution[Example 1: a warranty provision]
Mukwa Engineering Ltd sold ${fmt(units)} machines in 2025, each with a one-year repair guarantee. Experience shows that ${rate}% need repair at an average cost of US\\$${fmt(avgRepair)}. In 2026 repairs of US\\$${fmt(used)} were charged against the provision and the new estimate of the provision needed at 31 December 2026 is US\\$${fmt(target)}. Calculate the provision, show the entries and find the charge for 2026.

1. Provision at 31 December 2025: ${fmt(units)} × ${rate}% × ${fmt(avgRepair)} = ${fmt(prov1)}.
2. The entry creates an expense and a liability.

${j1}

3. In 2026 repairs of ${fmt(used)} are charged against the provision, leaving ${fmt(prov1)} - ${fmt(used)} = ${fmt(left)}.
4. To bring the provision to ${fmt(target)}, the charge to profit or loss is ${fmt(target)} - ${fmt(left)} = ${fmt(topUp)}.

${provT}
:::

## Classifying situations

:::worked-solution[Example 2: provision, contingent liability or contingent asset?]
At 31 December 2025 Mukwa Engineering Ltd has the five situations below. State the treatment of each and the total of provisions recognised.

${clsTable}

1. Situation 1: all three conditions hold, so a provision of ${fmt(24000)} is recognised.
2. Situation 2: only possible, so the ${fmt(18000)} is disclosed as a contingent liability.
3. Situation 3: remote, so nothing is shown.
4. Situation 4: an inflow is probable, so the claim is disclosed but not recognised as an asset. An asset is recognised only when the receipt is virtually certain.
5. Situation 5: the closure has been announced in detail, so a constructive obligation exists. The provision is for the direct costs of ${fmt(14000)} only.
6. Total provisions recognised: ${fmt(24000)} + ${fmt(14000)} = ${fmt(totalProv)}. Contingent liabilities disclosed: ${fmt(totalDiscl)}.
:::

## Why it matters

Without IAS 37 a company could hide a likely loss until it was paid, or create a large provision in a good year and release it in a bad year to smooth profit. The standard requires a loss to be recorded when it is probable, and forbids provisions for general future risks. Disclosure of contingent liabilities warns users about risks that are not yet recorded.

## Common mistakes

:::mistake{title="Providing for a possible, but not probable, loss"}
If the loss is only possible, the item is a contingent liability disclosed in the notes. No entry is made.
:::

:::mistake{title="Recognising a probable gain"}
A contingent asset is recognised only when it is virtually certain. A probable gain is disclosed only.
:::

:::mistake{title="Providing for future operating losses"}
There is no obligation for losses that the business expects to make. They are not provided for.
:::

:::mistake{title="Making a restructuring provision on a board decision alone"}
A detailed plan must also be announced, or begun, so that those affected expect it. A decision in the boardroom is not enough.
:::

:::mistake{title="Charging the whole provision again each year"}
Only the increase (or decrease) needed to reach the new estimate is charged or credited. Costs incurred are charged against the provision.
:::

## Exam tips

:::exam-tip
Tested in Cambridge Papers 1 and 3 only. For *state*, give the three recognition conditions. For *explain the treatment*, say whether the item is probable, possible or remote and name the treatment. For *calculate*, show the provision, the amount used and the top-up charged to profit or loss. For *advise*, compare the treatment with the effect on profit and on the users.
:::

:::exam-tip
Use the words of the decision rule: "present obligation", "probable outflow", "reliable estimate", "disclosed in a note", "virtually certain". Each earns a mark when applied to the case.
:::

## Summary

:::summary
- A provision is recognised if there is a present obligation from a past event, an outflow is probable and a reliable estimate can be made.
- A possible obligation is a contingent liability (disclosed); a remote one is ignored.
- A contingent asset is disclosed if probable and recognised only when virtually certain.
- The entry for a provision is Dr expense, Cr provision; later costs are charged against it and the balance is adjusted to the new estimate.
- No provision is made for future operating losses, and a restructuring provision needs an announced detailed plan.
:::
`;
writeLesson("standards/ias-37.md", front("standards.ias-37", "IAS 37: provisions, contingent liabilities and contingent assets", "Decide whether an uncertain obligation or possible gain is a provision, a contingent liability or a contingent asset, and record a provision (Cambridge A Level).", ["aacc.standards.ias-37"], 50), body.split("US$").join("US\\$"));
