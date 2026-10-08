---
{
  "key": "number.percentages",
  "title": "Percentages",
  "summary": "Find percentages of quantities, express one quantity as a percentage of another, and calculate percentage increases, decreases, changes, repeated changes and (Extended) reverse percentages using multipliers.",
  "concepts": ["math.number.percentages"],
  "objectives": ["zimsec/o-level/mathematics:1.1.3", "zimsec/o-level/mathematics:1.1.4", "cambridge/igcse/mathematics:1.13.1", "cambridge/igcse/mathematics:1.13.2", "cambridge/igcse/mathematics:1.13.4"],
  "estimatedMinutes": 35,
  "level": "extended"
}
---
## Introduction

Percentages are everywhere in daily life in Zimbabwe: a shop in Gweru advertises 15% off school shoes, a farmer's maize yield rises by 25%, your examination mark is reported as a percentage, and prices in US dollars or ZiG change from month to month. "Per cent" means "out of 100", so a percentage is simply a fraction with a denominator of 100.

In this lesson you will learn one powerful tool, the **multiplier**, which turns almost every percentage problem into a single multiplication or division. The last section, on reverse percentages, is Cambridge Extended material; ZIMSEC candidates should also learn it because it appears in consumer arithmetic.

You should already be able to convert between fractions, decimals and percentages.

## Key definitions

:::definition{term="Percentage"}
A number of parts per hundred: $35\% = \frac{35}{100} = 0.35$.
:::

:::definition{term="Multiplier"}
The decimal you multiply by to find a percentage of an amount or to apply a percentage change. An increase of $r\%$ has multiplier $1 + \frac{r}{100}$; a decrease of $r\%$ has multiplier $1 - \frac{r}{100}$.
:::

:::definition{term="Percentage change"}
The change as a percentage of the **original** value:

$$
\text{percentage change} = \frac{\text{new value} - \text{original value}}{\text{original value}} \times 100
$$

A positive answer is an increase; a negative answer is a decrease.
:::

:::definition{term="Reverse percentage"}
A problem where you know the value **after** a percentage change and must find the original value (Cambridge Extended).
:::

## Percentages of quantities

To find $r\%$ of an amount, multiply by $\frac{r}{100}$. To write one quantity as a percentage of another, make a fraction (with both quantities in the **same units**) and multiply by 100.

:::worked-solution[Example 1: find 15% of US\$240, then write 45 cm as a percentage of 2 m]
1. $15\% = 0.15$, and $0.15 \times 240 = 36$, so 15% of US\$240 is US\$36.
2. For the second part, change 2 m into centimetres: $2\ \text{m} = 200\ \text{cm}$.
3. $\frac{45}{200} \times 100 = 22.5$, so 45 cm is $22.5\%$ of 2 m.
:::

## Percentage increase and decrease

| Change | Multiplier |
| --- | --- |
| increase by 12% | $1.12$ |
| decrease by 12% | $0.88$ |
| increase by 150% | $2.5$ |
| decrease by 5% | $0.95$ |

:::worked-solution[Example 2: increase US\$85 by 12%, and decrease 650 kg by 12%]
1. Increase: $85 \times 1.12 = 95.20$, so the new amount is US\$95.20.
2. Decrease: $650 \times 0.88 = 572$ kg.
3. Check the first: 12% of 85 is $10.20$, and $85 + 10.20 = 95.20$.
:::

## Percentage change

:::worked-solution[Example 3: maize yields and bread prices]
A farmer's maize yield rises from 2.4 tonnes per hectare to 3.0 tonnes per hectare. The price of a loaf falls from US\$3.50 to US\$2.80. Find each percentage change.

1. Yield: change $= 3.0 - 2.4 = 0.6$; percentage $= \frac{0.6}{2.4} \times 100 = 25\%$ increase.
2. Price: change $= 2.80 - 3.50 = -0.70$; percentage $= \frac{-0.70}{3.50} \times 100 = -20\%$, a 20% decrease.
3. In both cases we divided by the **original** value.
:::

### Percentages over 100%

A percentage can be more than 100. If a tobacco crop grows from 1.8 tonnes to 4.5 tonnes, the new crop is $\frac{4.5}{1.8} \times 100 = 250\%$ of the old one, which is an **increase of 150%** (because $250\% - 100\% = 150\%$). An increase of 150% has multiplier $2.5$.

## Repeated percentage changes

For several changes one after another, multiply by each multiplier in turn. **Never add the percentages.**

:::worked-solution[Example 4: up 10%, then down 10%]
A price of US\$50 is increased by 10% and the new price is then decreased by 10%.

1. After the increase: $50 \times 1.1 = 55$.
2. After the decrease: $55 \times 0.9 = 49.50$.
3. Overall multiplier: $1.1 \times 0.9 = 0.99$, which is a 1% **decrease**, not "no change".
:::

The second 10% is taken from a **bigger** amount (US\$55), so it removes more than the first 10% added.

## Reverse percentages (Extended)

If you know the amount **after** a change, divide by the multiplier to get back to the original.

:::worked-solution[Example 5: the price before a discount]
In a sale, a radio costs US\$68 after a 15% discount. Find the original price.

1. A 15% decrease has multiplier $0.85$, so original $\times 0.85 = 68$.
2. Original $= 68 \div 0.85 = 80$.
3. The original price was US\$80. Check: $80 \times 0.85 = 68$.
:::

## Common mistakes

:::mistake{title="Taking the percentage of the new value"}
To undo a 15% discount on US\$68, do **not** add 15% of 68 (that gives US\$78.20). The 15% was taken from the original price, so divide by $0.85$ to get US\$80.
:::

:::mistake{title="Dividing by the new value in a percentage change"}
From US\$3.50 to US\$2.80 is a 20% decrease, because you divide the change by the **original** US\$3.50. Dividing by US\$2.80 gives the wrong answer of 25%.
:::

:::mistake{title="Adding repeated percentages"}
An increase of 20% followed by a decrease of 25% is not a 5% decrease. The overall multiplier is $1.2 \times 0.75 = 0.9$, a 10% decrease.
:::

:::mistake{title="Confusing 'of' and 'increase by'"}
"250% of" means multiply by $2.5$, but "increase by 250%" means multiply by $3.5$.
:::

## Exam tips

:::exam-tip
Write the multiplier in your working, for example "$\times 0.88$". It shows the examiner your method and earns a method mark even if you slip with the calculator.
:::

:::exam-tip
"Calculate the percentage increase" needs the change **and** the original value. Write the fraction $\frac{\text{change}}{\text{original}}$ before multiplying by 100.
:::

:::exam-tip
For a reverse percentage, check your answer by applying the percentage change to it: you should get back the value given in the question.
:::

## Summary

:::summary
- $r\%$ of an amount: multiply by $\frac{r}{100}$; one quantity as a percentage of another: $\frac{\text{part}}{\text{whole}} \times 100$ (same units).
- Increase by $r\%$: multiply by $1 + \frac{r}{100}$; decrease by $r\%$: multiply by $1 - \frac{r}{100}$.
- Percentage change $= \frac{\text{change}}{\text{original}} \times 100$.
- Repeated changes: multiply the multipliers; never add the percentages.
- Reverse percentages (Extended): divide the final amount by the multiplier.
:::
