// Lesson generator: company.notes-schedules
import { fmt, chk, check, r2, sum, table } from "../lib.mjs";
import { writeLesson, front } from "./w3a-lib.mjs";
import { ncaSchedule } from "./w3a-models.mjs";

// Example 1 data
const landOpen = 240000, landReval = 30000, bldgCost = 140000, bldgRate = 2, landDepOpen = 36000;
const plantOpen = 180000, plantAdd = 45000, plantDispCost = 30000, plantDispAcc = 21000, plantProceeds = 6500, plantRate = 10, plantDepOpen = 72000;
const vanOpen = 64000, vanAdd = 18000, vanRate = 25, vanDepOpen = 32000;
const landCharge = r2((bldgCost * bldgRate) / 100); chk(landCharge, 2800);
const plantClose = r2(plantOpen + plantAdd - plantDispCost); chk(plantClose, 195000);
const plantCharge = r2((plantClose * plantRate) / 100); chk(plantCharge, 19500);
const vanClose = r2(vanOpen + vanAdd); chk(vanClose, 82000);
const vanCharge = r2((vanClose * vanRate) / 100); chk(vanCharge, 20500);
const dispCv = r2(plantDispCost - plantDispAcc);
const dispResult = r2(plantProceeds - dispCv); chk(dispResult, -2500);
const sch = ncaSchedule(
  [
    { name: "Land and buildings", costOpen: landOpen, reval: landReval, depOpen: landDepOpen, charge: landCharge },
    { name: "Plant", costOpen: plantOpen, add: plantAdd, disp: plantDispCost, depOpen: plantDepOpen, charge: plantCharge, depDisp: plantDispAcc },
    { name: "Vehicles", costOpen: vanOpen, add: vanAdd, depOpen: vanDepOpen, charge: vanCharge },
  ],
  { title: "Note 2: Property, plant and equipment", when: "year ended 31 December 2025" },
);
chk(sch.t.cv, 231200 + 124500 + 29500, 0.01, "carrying total");
const cvOpen = sch.t.cvOpen, cvClose = sch.t.cv;
const totalCharge = sch.t.charge; chk(totalCharge, 42800);
const recon = r2(cvOpen + plantAdd + vanAdd + landReval - dispCv - totalCharge); chk(recon, cvClose);
const reconTable = table(["Reconciliation of carrying amount", "US\\$"], [["Carrying amount at 1 January 2025", cvOpen], ["Additions (plant and vehicles)", plantAdd + vanAdd], ["Revaluation of land", landReval], ["Disposal (carrying amount of plant sold)", -dispCv], ["Depreciation for the year", -totalCharge], ["**Carrying amount at 31 December 2025**", cvClose]]);
const dispTable = table(["Disposal of plant", "US\\$"], [["Cost", plantDispCost], ["Less: accumulated depreciation", -plantDispAcc], ["Carrying amount", dispCv], ["Proceeds", plantProceeds], ["**Loss on disposal**", dispResult]]);

// Example 2: notes
const dirRem = 48000, auditFee = 3600;
const authorised = 600000, issued = 400000, prem = 40000;
const loan = 80000, loanDue1 = 20000;
const dps = 0.04, interim = r2(issued * dps); chk(interim, 16000);
const finalProp = 24000;
const notesPbt = table(["Note 3: Profit before tax is stated after charging", "US\\$"], [["Depreciation of property, plant and equipment", totalCharge], ["Loss on disposal of plant", -dispResult], ["Directors' remuneration", dirRem], ["Auditor's remuneration", auditFee]]);
const notesCap = table(["Note 4: Share capital and reserves", "US\\$"], [["Authorised: 600,000 ordinary shares of US\\$1 each", authorised], ["Issued and fully paid: 400,000 ordinary shares of US\\$1 each", issued], ["Share premium", prem]]);
const notesLoan = table(["Note 5: Borrowings (9% loan notes repayable in 2030)", "US\\$"], [["Repayable within one year (current liability)", loanDue1], ["Repayable after more than one year (non-current liability)", r2(loan - loanDue1)], ["**Total loan notes**", loan]]);
const notesDiv = table(["Note 6: Dividends", "US\\$"], [["Interim dividend paid: US\\$0.04 per share on 400,000 shares", interim], ["Final dividend proposed after the year end (not recognised as a liability)", finalProp]]);

const body = `## Introduction

A statement of financial position tells you that Mutoko Quarry Ltd has US$${fmt(cvClose)} of property, plant and equipment, but not what it consists of, what was bought or sold during the year or how it is depreciated. For that, the company gives **notes** and a **schedule of non-current assets**. Examiners treat the schedule as a calculation in itself, and the notes as a test of whether you know what each statement figure contains.

You should be able to prepare the three statements of a company. In this lesson you go behind the totals: you build the schedule, check it against the ledger, and write the main notes. Remember that the statements in ZIMSEC questions are for internal use, not for publication. Cambridge tests the notes in Paper 3 only.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| Notes to the accounts; fixed asset schedule; non-current asset note | Notes to the financial statements; schedule of non-current assets |
| Net book value | Carrying amount |
| Provision for depreciation | Accumulated depreciation |
| Profit or loss on sale of a fixed asset | Profit or loss on disposal of a non-current asset |

Both boards examine the schedule in the format below. The notes are required for ZIMSEC Form 5 and for Cambridge A Level (Paper 3) only.
:::

## Key definitions

:::definition{term="Schedule of non-current assets"}
A table that shows, for each class of asset, the cost or valuation and the accumulated depreciation at the start and the end of the year, with the movements (additions, disposals, revaluation and the depreciation charge) between them.
:::

:::definition{term="Notes to the financial statements"}
Extra information that explains and supports the figures in the statements: the accounting policies, analysis of items such as property, plant and equipment, share capital and borrowings, and items the statements cannot show.
:::

:::definition{term="Carrying amount"}
The cost or valuation of a non-current asset less accumulated depreciation. The carrying amount of an asset on disposal is compared with the proceeds to find the profit or loss.
:::

:::definition{term="Accounting policy"}
The specific method an entity chooses to prepare its statements, for example straight-line depreciation at stated rates.
:::

## Building the schedule

Use one column for each class and a total column. The cost section runs from the opening cost, adding purchases and any revaluation, deducting the cost of assets sold. The depreciation section runs from the opening accumulated depreciation, adds the charge for the year and deducts the depreciation on the assets sold. The carrying amounts are cost less accumulated depreciation at each date.

Three points save marks. First, the disposal is removed at **cost** in the cost section and at its **accumulated depreciation** in the depreciation section. Second, only assets held at the year end are depreciated if the policy says that no charge is made in the year of disposal. Third, a revaluation of land adds to the cost or valuation column, and the gain goes to the revaluation reserve, not to profit.

:::worked-solution[Example 1: the schedule of non-current assets]
Mutoko Quarry Ltd holds the following at 1 January 2025.

- Land and buildings: cost or valuation US$${fmt(landOpen)} (buildings US$${fmt(bldgCost)}); accumulated depreciation US$${fmt(landDepOpen)}.
- Plant: cost US$${fmt(plantOpen)}; accumulated depreciation US$${fmt(plantDepOpen)}.
- Vehicles: cost US$${fmt(vanOpen)}; accumulated depreciation US$${fmt(vanDepOpen)}.

During 2025 the land was revalued upwards by US$${fmt(landReval)}. Plant costing US$${fmt(plantDispCost)} with accumulated depreciation of US$${fmt(plantDispAcc)} was sold for US$${fmt(plantProceeds)}. New plant costing US$${fmt(plantAdd)} and vehicles costing US$${fmt(vanAdd)} were bought. Depreciation: buildings ${bldgRate}% of cost, plant ${plantRate}% and vehicles ${vanRate}% of cost of assets held at the year end. Land is not depreciated. Prepare the schedule and the reconciliation, and find the result of the disposal.

1. Depreciation: buildings ${bldgRate}% × ${fmt(bldgCost)} = ${fmt(landCharge)}; plant ${plantRate}% × (${fmt(plantOpen)} + ${fmt(plantAdd)} - ${fmt(plantDispCost)}) = ${fmt(plantCharge)}; vehicles ${vanRate}% × (${fmt(vanOpen)} + ${fmt(vanAdd)}) = ${fmt(vanCharge)}.
2. Carrying amount of the plant sold: ${fmt(plantDispCost)} - ${fmt(plantDispAcc)} = ${fmt(dispCv)}; proceeds ${fmt(plantProceeds)}; loss ${fmt(-dispResult)}.

${sch.md}

${dispTable}

${reconTable}
:::

## Writing the notes

Notes are short tables or sentences, numbered and referred to from the statements. The usual notes are: the accounting policies (for example, depreciation of buildings 2% a year on cost, plant 10% and vehicles 25% on the cost of assets held at the year end); the schedule of property, plant and equipment; items charged in arriving at profit before tax; share capital and reserves; borrowings; and dividends.

:::worked-solution[Example 2: notes to the financial statements]
Further information about Mutoko Quarry Ltd: directors' remuneration US$${fmt(dirRem)}; auditor's remuneration US$${fmt(auditFee)}; authorised share capital 600,000 ordinary shares of US$1; issued and fully paid 400,000 shares; share premium US$${fmt(prem)}; 9% loan notes of US$${fmt(loan)} repayable in 2030 by annual instalments, the next US$${fmt(loanDue1)} falling due in 2026; an interim dividend of US$0.04 per share was paid and a final dividend of US$${fmt(finalProp)} was proposed after the year end. Prepare notes 3 to 6.

${notesPbt}

${notesCap}

${notesLoan}

${notesDiv}

Note 3 uses the depreciation and loss from Example 1. The loss on disposal is added back in the statement of cash flows. The dividend note shows the proposed dividend only as information, because it is not a liability at the year end.
:::

## Using the schedule and notes

The schedule must agree with the statement of financial position: the total carrying amount ${fmt(cvClose)} is the figure for property, plant and equipment. If it does not, an addition or disposal is wrong. The depreciation charge in the schedule must equal the depreciation in the statement of profit or loss and the figure added back in the cash flow. The notes also let users check whether depreciation policies are sensible and how much of the debt falls due soon.

## Common mistakes

:::mistake{title="Removing the sale proceeds from the schedule"}
A disposal is removed at cost (cost section) and at accumulated depreciation (depreciation section). The proceeds are used only to find the profit or loss.
:::

:::mistake{title="Depreciating land"}
Land is not depreciated. Only the buildings on it are, and the revaluation of the land is shown in the cost or valuation column.
:::

:::mistake{title="Leaving out depreciation on disposed assets from the accumulated total"}
The accumulated depreciation of an asset sold must be deducted from the closing balance, or the carrying amount is understated.
:::

:::mistake{title="Showing the proposed dividend as a liability"}
A final dividend proposed after the year end is disclosed in the notes. It is not included in current liabilities.
:::

:::mistake{title="Not splitting loan notes into current and non-current parts"}
The instalment due within twelve months is a current liability; the rest is non-current.
:::

## Exam tips

:::exam-tip
Schedules appear in ZIMSEC Papers 2 and 3 and in Cambridge Paper 3. For *prepare*, give the headings, one column per class and a total column, and show the depreciation of disposals separately. For *calculate the profit or loss on disposal*, show the carrying amount and the proceeds. For *reconcile*, start from the opening carrying amount and make each movement visible.
:::

:::exam-tip
Cross-check three figures: the closing carrying amount against the statement of financial position, the depreciation charge against the statement of profit or loss and the loss on disposal against the cash flow adjustments.
:::

## Summary

:::summary
- The schedule of non-current assets shows cost or valuation and accumulated depreciation with all movements, class by class.
- Disposals leave the schedule at cost and at their accumulated depreciation; the carrying amount compared with proceeds gives the profit or loss.
- A revaluation of land adds to cost or valuation; the gain is other comprehensive income.
- Notes explain policies, items charged to profit, share capital, borrowings and dividends.
- The schedule must agree with the statements of financial position and profit or loss.
:::
`;
writeLesson("company/notes-schedules.md", front("company.notes-schedules", "Notes and the schedule of non-current assets", "Prepare the schedule of non-current assets and the main notes to a company's financial statements, find the result of a disposal and reconcile the carrying amount.", ["aacc.company.notes-schedules"], 60), body.split("US$").join("US\\$"));
