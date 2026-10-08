---
{
  "key": "finance.taxes",
  "title": "Taxes and duties",
  "summary": "Calculate income tax (PAYE) from given tax bands and allowances, value added tax and sales tax, and customs and excise duty, always using the rates given in the question.",
  "concepts": ["math.number.taxes"],
  "objectives": ["zimsec/o-level/mathematics:3.1.4"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Governments raise money through taxes to pay for schools, clinics, roads and other public services. Workers pay **income tax**, usually deducted from their pay each month. Shoppers pay **value added tax (VAT)** that is included in the price of many goods. A trader bringing goods across the border at Beitbridge or Forbes may pay **customs duty**, and products such as fuel carry **excise duty**.

This topic is part of the ZIMSEC consumer arithmetic syllabus. Tax rates, bands and allowances are set by government and change from time to time, so examination questions always **give** the rates to use. The rates in this lesson are invented for practice and are not current national rates.

You should already be confident with percentages, multipliers and reverse percentages.

## Key definitions

:::definition{term="Income tax and PAYE"}
Income tax is a tax on earnings. Under PAYE (Pay As You Earn) the employer deducts it from each pay packet and passes it to the tax authority.
:::

:::definition{term="Allowances and taxable income"}
Allowances (sometimes called tax-free allowances or deductions) are amounts of income on which no tax is charged. (A tax **credit** is different: it is subtracted from the tax itself.) Taxable income $=$ gross income $-$ allowances.
:::

:::definition{term="Tax bands"}
Slices of taxable income that are taxed at different rates. Each rate applies only to the part of the income inside its band.
:::

:::definition{term="Value added tax (VAT) or sales tax"}
A tax added as a percentage of the price of goods and services. A price "including VAT" already contains the tax.
:::

:::definition{term="Customs duty and excise duty"}
Customs duty is a tax on goods imported into a country, usually a percentage of their value. Excise duty is a tax on certain goods such as fuel, alcohol and tobacco, often a fixed amount per litre or per unit.
:::

## Income tax with bands

In the examples below, use these **invented** annual tax bands:

| Taxable income (per year) | Rate |
| --- | --- |
| first US\$3600 | 0% |
| next US\$3600 (from US\$3600 to US\$7200) | 20% |
| everything above US\$7200 | 25% |

:::worked-solution[Example 1: annual income tax and monthly PAYE]
Rudo earns US\$9600 a year. Her allowances total US\$1200.

1. Taxable income: $9600 - 1200 = 8400$ dollars.
2. First US\$3600 at 0%: tax $= 0$.
3. Next US\$3600 at 20%: $0.20 \times 3600 = 720$ dollars.
4. The remaining $8400 - 7200 = 1200$ dollars at 25%: $0.25 \times 1200 = 300$ dollars.
5. Total tax: $0 + 720 + 300 = 1020$ dollars a year.
6. Monthly PAYE: $1020 \div 12 = 85$ dollars.
:::

Notice that Rudo does **not** pay 25% on all of her income. Only the US\$1200 in the top band is taxed at 25%.

## VAT and sales tax

To add VAT at 15% (the rate given in these examples), multiply by $1.15$. To remove VAT from a price that includes it, **divide** by $1.15$.

:::worked-solution[Example 2: adding and removing VAT at 15%]
1. A school bag costs US\$80 before VAT. Price including VAT: $80 \times 1.15 = 92$ dollars, so the VAT is US\$12.
2. A pair of shoes costs US\$69 **including** VAT. Price before VAT: $69 \div 1.15 = 60$ dollars.
3. The VAT included in the US\$69 is $69 - 60 = 9$ dollars.
:::

The VAT in a VAT-inclusive price is **not** 15% of that price: 15% of US\$69 is US\$10.35, but the VAT is only US\$9.

## Customs and excise duty

Duty is often charged first, and then VAT is charged on the value **plus** the duty. Always follow the order given in the question.

:::worked-solution[Example 3: importing a fridge]
A trader imports a fridge valued at US\$450. In this question customs duty is 40% of the value, and VAT of 15% is then charged on the value plus the duty.

1. Duty: $0.40 \times 450 = 180$ dollars.
2. Value plus duty: $450 + 180 = 630$ dollars.
3. VAT: $0.15 \times 630 = 94.50$ dollars.
4. Total cost: $630 + 94.50 = 724.50$, so US\$724.50.
5. Total taxes paid: $180 + 94.50 = 274.50$ dollars.
:::

:::example{title="Excise duty per litre"}
If the excise duty on a fuel is US\$0.30 per litre, a delivery of 5000 litres carries $5000 \times 0.30 = 1500$ dollars of duty.
:::

## Common mistakes

:::mistake{title="Taxing all the income at the top rate"}
Each rate applies only to the income inside its band. With the bands above, US\$8400 of taxable income pays US\$1020, not $0.25 \times 8400 = 2100$ dollars.
:::

:::mistake{title="Forgetting the allowances"}
Tax is calculated on **taxable** income. Subtract the allowances from gross income before using the bands.
:::

:::mistake{title="Taking 15% off a VAT-inclusive price"}
$69 \times 0.85 = 58.65$ is wrong. The VAT was 15% of the price **before** VAT, so divide: $69 \div 1.15 = 60$.
:::

:::mistake{title="Charging VAT on the value only"}
If the question says VAT is charged on the value plus the duty, add the duty first and then work out the VAT.
:::

## Exam tips

:::exam-tip
Set out a tax calculation band by band, one line per band. Examiners award a method mark for each band handled correctly.
:::

:::exam-tip
Check whether a question asks for the **annual** tax or the **monthly** PAYE, and whether a price is "before VAT" or "including VAT".
:::

:::exam-tip
Never use a tax rate you remember from the news: use only the rates printed in the question.
:::

## Summary

:::summary
- Taxable income $=$ gross income $-$ allowances; tax each band at its own rate and add.
- Monthly PAYE $=$ annual tax $\div 12$.
- Add VAT at $r\%$: multiply by $1 + \frac{r}{100}$; remove it: divide by $1 + \frac{r}{100}$.
- Customs duty is a percentage of the value of imports; excise duty is often an amount per unit; VAT may be charged on the value plus the duty.
- Always use the rates given in the question.
:::
