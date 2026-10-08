---
{
  "key": "finance.exponential-growth-and-decay",
  "title": "Exponential growth and decay",
  "summary": "Use a repeated multiplier to model depreciation, appreciation and population change, find the value after n periods, and find by trial how many periods it takes to pass a target.",
  "concepts": ["math.number.exponential-growth-and-decay"],
  "objectives": ["zimsec/o-level/mathematics:3.1.6", "cambridge/igcse/mathematics:1.17.1"],
  "estimatedMinutes": 30,
  "level": "extended"
}
---
## Introduction

A family in Harare buys a car for US\$18,000. Every year the car is worth less than the year before: it **depreciates**. A town's population grows by a few per cent each year. A dose of medicine leaves the bloodstream a fixed percentage at a time. In each case a quantity changes by the **same percentage** in every time period. This is called **exponential** growth or decay.

ZIMSEC examines depreciation as part of consumer arithmetic; Cambridge examines exponential growth and decay on the Extended papers. Compound interest, which you have already met, is one example of exponential growth.

You should already be able to use percentage multipliers and powers on your calculator.

## Key definitions

:::definition{term="Exponential growth"}
An increase by the same percentage in every period, so the quantity is multiplied by the same number (greater than 1) each time.
:::

:::definition{term="Exponential decay"}
A decrease by the same percentage in every period, so the quantity is multiplied by the same number (between 0 and 1) each time.
:::

:::definition{term="Depreciation and appreciation"}
Depreciation is a fall in the value of an item over time (cars, machines, phones). Appreciation is a rise in value (land, some buildings).
:::

:::formula{name="Value after n periods"}
$$
V = P\left(1 + \frac{r}{100}\right)^n \quad \text{(growth)} \qquad V = P\left(1 - \frac{r}{100}\right)^n \quad \text{(decay)}
$$

where $P$ is the starting value, $r\%$ the rate per period and $n$ the number of periods.
:::

## Depreciation

:::worked-solution[Example 1: a car losing 15% of its value each year]
A car costs US\$18,000 and depreciates by 15% each year. Find its value after 3 years.

1. The multiplier for a 15% decrease is $0.85$.
2. After 1 year: $18\,000 \times 0.85 = 15\,300$ dollars.
3. After 3 years: $18\,000 \times 0.85^3 = 11\,054.25$ dollars.
4. The car is worth US\$11,054.25.
:::

Each year the car loses 15% of its value **at the start of that year**, so the amount lost gets smaller: US\$2700 in the first year, then US\$2295, and so on. The value never reaches zero.

:::note{title="Straight-line depreciation"}
Some businesses instead take off the same **amount** each year, for example US\$1500 a year. That is linear (straight-line) depreciation, not exponential. Read the question carefully to see which kind is meant.
:::

## Growth

:::worked-solution[Example 2: population growth]
A town has 45,000 people and its population grows by 4% each year. Find the population after 2 years.

1. Multiplier: $1.04$.
2. $45\,000 \times 1.04^2 = 45\,000 \times 1.0816 = 48\,672$.
3. The population is about 48,672 people.
:::

## How many periods? Use trial

Without logarithms, find the number of periods by trying values of $n$ until the target is passed.

:::worked-solution[Example 3: when is the car worth less than half its price?]
The car in Example 1 loses 15% of its value each year. After how many complete years is it first worth less than half of what it cost?

1. We need $0.85^n < 0.5$.
2. $0.85^4 = 0.522\ldots$, which is more than $0.5$.
3. $0.85^5 = 0.443\ldots$, which is less than $0.5$.
4. So after **5** years it is first worth less than half its price.
:::

Notice that you do not need the price itself: the multiplier alone decides when the value halves.

## Working backwards

To find the starting value, divide by the multiplier as many times as there were periods.

:::worked-solution[Example 4: the price of a laptop]
A laptop depreciates by 20% each year. After 2 years it is worth US\$512. Find its original price.

1. $P \times 0.8^2 = 512$.
2. $0.8^2 = 0.64$, so $P = 512 \div 0.64 = 800$.
3. The laptop cost US\$800.
:::

:::example{title="Decay in medicine"}
The amount of a medicine in a patient's blood falls by 25% every hour. Starting from 200 mg, after 3 hours there is $200 \times 0.75^3 = 84.375 \approx 84.4$ mg left.
:::

## Common mistakes

:::mistake{title="Multiplying the percentage by the number of years"}
Losing 15% a year for 3 years is not a 45% loss. The value is $0.85^3 = 0.614$ of the original, a loss of about 38.6%.
:::

:::mistake{title="Using the rate as the multiplier"}
For a 15% decrease the multiplier is $0.85$, not $0.15$. $18\,000 \times 0.15^3$ would give a value of about US\$61, which is clearly wrong.
:::

:::mistake{title="Thinking the value reaches zero"}
A car losing 20% a year is not worth nothing after 5 years. Each year it keeps 80% of its value: after 5 years it still has $0.8^5 = 32.8\%$ of its price.
:::

## Exam tips

:::exam-tip
Write the expression, such as $18\,000 \times 0.85^3$, before the answer. It earns the method mark even if you press a wrong key.
:::

:::exam-tip
In "how many years" questions, show the trial values on both sides of the target, for example $0.85^4 = 0.522$ and $0.85^5 = 0.444$. That is the evidence examiners look for.
:::

:::exam-tip
Round sensibly at the end: money to the nearest cent, populations to a whole number (or 3 significant figures if asked).
:::

## Summary

:::summary
- Exponential change multiplies by the same factor every period: $V = P \times (\text{multiplier})^n$.
- Growth by $r\%$: multiplier $1 + \frac{r}{100}$; decay or depreciation by $r\%$: multiplier $1 - \frac{r}{100}$.
- Find the number of periods by trial, showing values either side of the target.
- Find a starting value by dividing by the multiplier raised to the power $n$.
- Exponential depreciation never reaches zero; straight-line depreciation takes off a fixed amount each year.
:::
