// Lesson generator: standards.ias-16-36-38
import { fmt, chk, r2, sum, table } from "../lib.mjs";
import { writeLesson, front } from "./w3a-lib.mjs";

// Example 1: cost of PPE (IAS 16)
const listPrice = 52000, discPct = 8;
const net = r2(listPrice * (1 - discPct / 100)); chk(net, 47840);
const delivery = 1850, duty = 3200, install = 2750, testing = 640;
const training = 1200, overheads = 900, refTax = 7800;
const cost = r2(net + delivery + duty + install + testing); chk(cost, 56280);
const residual = 6280, life = 10;
const dep = r2((cost - residual) / life); chk(dep, 5000);
const costTable = table(["Item", "Included in cost?", "US\\$"], [
  [`List price US\\$${fmt(listPrice)} less ${discPct}% trade discount`, "Yes", net],
  ["Delivery to the site", "Yes", delivery],
  ["Import duty (not refundable)", "Yes", duty],
  ["Installation by the supplier", "Yes", install],
  ["Cost of testing before use", "Yes", testing],
  ["Training of operators", "No: expense", 0],
  ["General administration overheads", "No: expense", 0],
  ["Sales tax that can be reclaimed", "No: recoverable from the tax authority", 0],
  ["**Cost of the machine**", "", cost],
], ["l", "l", "r"]);

// Example 2: impairment and development
const carrying = 120000, fvLcd = 78000, viu = 91500;
const recoverable = Math.max(fvLcd, viu); chk(recoverable, 91500);
const loss = r2(carrying - recoverable); chk(loss, 28500);
const remainingLife = 5;
const depBefore = r2(carrying / remainingLife), depAfter = r2(recoverable / remainingLife);
chk(depBefore, 24000); chk(depAfter, 18300);
const research = 45000, devBefore = 22000, devAfter = 60000;
const capitalised = devAfter;
const expensed = r2(research + devBefore); chk(expensed, 67000);
const amort = r2(capitalised / 5); chk(amort, 12000);
const goodwillInternal = 90000;
const imp = table(["Impairment test", "US\\$"], [["Carrying amount of the machine", carrying], ["Fair value less costs of disposal", fvLcd], ["Value in use", viu], ["**Recoverable amount (the higher)**", recoverable], ["**Impairment loss**", loss]]);
const devTable = table(["Project expenditure", "Treatment", "US\\$"], [
  ["Research", "Expense", research],
  ["Development before the criteria were met", "Expense", devBefore],
  ["Development after the criteria were met", "Capitalise as an intangible asset", devAfter],
  ["Internally generated goodwill", "Not recognised", goodwillInternal],
], ["l", "l", "r"]);

const body = `## Introduction

Tatenda Bakeries Ltd buys a new oven, tests whether an old one is still worth its book value and spends money developing a new bread recipe. Each decision produces a number that goes into the statement of financial position: what cost to record for the oven, whether to reduce an asset's value and whether the recipe is an asset at all. Three standards guide these decisions: **IAS 16** for property, plant and equipment, **IAS 36** for impairment and **IAS 38** for intangible assets.

You know how to calculate depreciation (the calculations are in the non-current assets lessons). This lesson explains the rules behind the numbers: which costs are included, when an asset is written down, and which spending is capitalised. ZIMSEC tests it in Form 6 and Cambridge at A Level, both in our own wording of the main provisions.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| IAS 16 Property, plant and equipment (fixed assets) | IAS 16 Property, plant and equipment |
| IAS 36 Impairment of assets | IAS 36 Impairment of assets |
| IAS 38 Intangible assets | IAS 38 Intangible assets |
| Net book value | Carrying amount |
| Value in use; net selling price | Value in use; fair value less costs of disposal |
:::

## Key definitions

:::definition{term="Property, plant and equipment"}
Tangible assets held for use in production or supply of goods and services, for rental or for administration, which are expected to be used for more than one period.
:::

:::definition{term="Impairment"}
A fall in the value of an asset, so that its carrying amount is higher than the amount that could be recovered from it.
:::

:::definition{term="Recoverable amount"}
The higher of an asset's fair value less costs of disposal and its value in use.
:::

:::definition{term="Value in use"}
The present value of the future cash flows expected from using the asset and from its disposal at the end of its life.
:::

:::definition{term="Intangible asset"}
An identifiable non-monetary asset without physical substance, controlled by the entity, from which future economic benefits are expected, for example a licence, a patent or capitalised development costs.
:::

## IAS 16: property, plant and equipment

An item is recognised if future economic benefits are probable and the cost can be measured reliably. It is first measured at **cost**: the purchase price (including import duties and non-refundable taxes, after trade discounts) plus costs directly needed to bring it to its place and working condition, such as delivery, installation, site preparation and testing. Training, administrative overheads and recoverable taxes are not part of the cost. After recognition, a business uses either the cost model (cost less accumulated depreciation and impairment) or the revaluation model for a whole class of asset. Depreciation is charged systematically over the useful life. The residual value and the useful life are reviewed each year; a change in either is a change in estimate.

:::worked-solution[Example 1: the cost of a machine]
Tatenda Bakeries Ltd buys a machine with a list price of US\\$${fmt(listPrice)} less a trade discount of ${discPct}%. It pays US\\$${fmt(delivery)} delivery, US\\$${fmt(duty)} import duty, US\\$${fmt(install)} for installation and US\\$${fmt(testing)} for testing. It also pays US\\$${fmt(training)} to train operators, allocates US\\$${fmt(overheads)} of general overheads and pays US\\$${fmt(refTax)} of sales tax which can be reclaimed. The machine will be used for ${life} years with a residual value of US\\$${fmt(residual)}. Calculate the cost to be recorded and the annual depreciation.

${costTable}

1. Net price: ${fmt(listPrice)} × (100% - ${discPct}%) = ${fmt(net)}.
2. Cost: ${fmt(net)} + ${fmt(delivery)} + ${fmt(duty)} + ${fmt(install)} + ${fmt(testing)} = ${fmt(cost)}.
3. Annual depreciation: (${fmt(cost)} - ${fmt(residual)}) ÷ ${life} = ${fmt(dep)}.
4. Training (${fmt(training)}) and overheads (${fmt(overheads)}) are expenses of the year. The recoverable tax is a receivable.
:::

## IAS 36: impairment

At each reporting date the business looks for signs that an asset may be impaired: a large fall in market value, physical damage, obsolescence, adverse change in the market, or plans to stop using it. If there are signs, the asset is tested. The carrying amount is compared with its **recoverable amount**. If the carrying amount is higher, the asset is written down to the recoverable amount and an **impairment loss** is recognised in profit or loss. For an asset that has been revalued, the loss is first set against the revaluation surplus. After the write-down, depreciation is based on the new carrying amount over the remaining life.

## IAS 38: intangible assets

An intangible asset is recognised at cost if it is identifiable, controlled and probably brings future benefits. Purchased licences and patents are recognised. **Internally generated goodwill is never recognised**, because its cost cannot be measured reliably. Spending on **research** is always an expense. Spending on **development** is capitalised only when all the criteria are met: technical feasibility, intention to complete, ability to use or sell, probable future benefits, adequate resources and reliable measurement. The asset is amortised over its useful life, starting when it is available for use.

:::worked-solution[Example 2: impairment and development costs]
A machine has a carrying amount of US\\$${fmt(carrying)} and ${remainingLife} years of life left. Its fair value less costs of disposal is US\\$${fmt(fvLcd)} and its value in use is US\\$${fmt(viu)}. Separately, the company spent US\\$${fmt(research)} on research and US\\$${fmt(devBefore)} on development before the criteria were met, and US\\$${fmt(devAfter)} on development after they were met. The product will be sold for five years. The company estimates that its internally generated goodwill is worth US\\$${fmt(goodwillInternal)}. Calculate the impairment loss, the new depreciation, and the amount capitalised and amortised each year.

${imp}

${devTable}

1. Recoverable amount: the higher of ${fmt(fvLcd)} and ${fmt(viu)} is ${fmt(recoverable)}. Impairment loss: ${fmt(carrying)} - ${fmt(recoverable)} = ${fmt(loss)}, charged to profit or loss.
2. New depreciation: ${fmt(recoverable)} ÷ ${remainingLife} = ${fmt(depAfter)} a year, compared with ${fmt(depBefore)} before.
3. Expensed: research ${fmt(research)} + early development ${fmt(devBefore)} = ${fmt(expensed)}. Capitalised: ${fmt(capitalised)}. Amortisation: ${fmt(capitalised)} ÷ 5 = ${fmt(amort)} a year.
4. The goodwill of ${fmt(goodwillInternal)} is not recognised in the statement of financial position.
:::

## Why these rules matter

The cost rules in IAS 16 stop managers from capitalising ordinary expenses to flatter profit. The impairment test in IAS 36 stops assets from being carried above what they can earn. The development rules in IAS 38 allow genuine investments in new products to be recorded as assets while preventing wishful thinking about research or goodwill. Together they make the figures prudent and comparable.

## Common mistakes

:::mistake{title="Including training and overheads in the cost of an asset"}
Only costs that bring the asset to its location and working condition are included. Training, administration and initial operating losses are expenses.
:::

:::mistake{title="Using the lower of fair value and value in use as the recoverable amount"}
Recoverable amount is the higher of the two. The asset is written down only to that higher amount.
:::

:::mistake{title="Capitalising research"}
Research is always an expense. Only development that meets all the criteria is capitalised.
:::

:::mistake{title="Recognising internally generated goodwill"}
It is never recognised. Only goodwill bought in an acquisition appears in the statement of financial position.
:::

:::mistake{title="Not changing depreciation after an impairment"}
After an impairment, depreciation is based on the new, lower carrying amount over the remaining life.
:::

## Exam tips

:::exam-tip
Tested in ZIMSEC Papers 2 and 3 and in Cambridge Papers 1 and 3. For *calculate the cost of an asset*, list each item and state whether it is included. For *calculate the impairment loss*, show the recoverable amount first. For *explain*, give the rule and the reason (reliable measurement or prudence). For *discuss*, say how the treatment affects profit and the statement of financial position.
:::

:::exam-tip
Write the criterion when you decide: "probable future benefit", "reliable measurement", "higher of fair value less costs of disposal and value in use". Naming the test earns the mark.
:::

## Summary

:::summary
- Property, plant and equipment is recorded at cost: price after trade discount, duties, non-refundable taxes and costs of bringing it into use; training and overheads are expenses.
- An impairment loss = carrying amount - recoverable amount, where recoverable amount is the higher of fair value less costs of disposal and value in use.
- Research is expensed; development is capitalised only when all criteria are met; internally generated goodwill is never recognised.
- Intangible assets with finite lives are amortised over their useful lives.
- After an impairment, depreciation is based on the reduced carrying amount.
:::
`;
writeLesson("standards/ias-16-36-38.md", front("standards.ias-16-36-38", "IAS 16, IAS 36 and IAS 38: assets, impairment and intangibles", "Apply IAS 16 to the cost of property, plant and equipment, IAS 36 to the impairment of assets and IAS 38 to research, development and internally generated goodwill.", ["aacc.standards.ias-16-36-38"], 55), body.split("US$").join("US\\$"));
