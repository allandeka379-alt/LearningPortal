---
{
  "key": "number.limits-of-accuracy",
  "title": "Limits of accuracy",
  "summary": "Find the upper and lower bounds of a rounded value and, for Cambridge Extended and ZIMSEC, of sums, differences, products and quotients of rounded values.",
  "concepts": ["math.number.limits-of-accuracy"],
  "objectives": ["zimsec/o-level/mathematics:1.2.3", "cambridge/igcse/mathematics:1.10.1", "cambridge/igcse/mathematics:1.10.2"],
  "estimatedMinutes": 30,
  "level": "extended"
}
---
## Introduction

A builder in Masvingo measures a wall as 4.6 m long, correct to the nearest 10 cm. The real length is not exactly 4.6 m: it could be anything from 4.55 m up to (but not including) 4.65 m. These two values are the **limits of accuracy**, or **bounds**, of the measurement. When rounded values are used in a calculation, the bounds tell us how far wrong the answer might be. Engineers use them so that parts always fit and structures are always strong enough.

You should already be able to round to decimal places and significant figures.

## Key definitions

:::definition{term="Lower bound"}
The smallest value that rounds to the given value.
:::

:::definition{term="Upper bound"}
The boundary value at which the number would start to round up to the next value. The true value is less than the upper bound, but the boundary itself is used in calculations.
:::

:::keyfact{title="Finding the bounds of a rounded value"}
The bounds are **half a unit** of the rounding either side of the value. If $x = 4.6$ correct to 1 decimal place, the unit is $0.1$, half of it is $0.05$, and

$$
4.55 \leq x < 4.65
$$
:::

## Bounds of a single value (Cambridge Core and Extended, ZIMSEC)

:::worked-solution[Example 1: a mass of 600 g]
Find the bounds of a mass of 600 g when it is correct to (a) the nearest 100 g and (b) 2 significant figures.
1. (a) The unit is 100 g, so half a unit is 50 g: $550 \leq m < 650$.
2. (b) Two significant figures means the 6 and the first 0 are significant, so the unit is 10 g.
3. Half a unit is 5 g: $595 \leq m < 605$.
:::

:::worked-solution[Example 2: a time of 12.4 s to the nearest tenth of a second]
1. The unit is $0.1$ s, so half a unit is $0.05$ s.
2. Lower bound $12.4 - 0.05 = 12.35$ s; upper bound $12.4 + 0.05 = 12.45$ s.
3. So $12.35 \leq t < 12.45$.
:::

Always use the **same units** as the value and write the bounds with one more decimal place than the rounded value when the unit is a decimal.

## Bounds of calculations (Cambridge Extended and ZIMSEC)

To find the largest or smallest possible result of a calculation, choose the bound of each value that pushes the answer the right way.

:::keyfact{title="Which bounds to use"}
| Calculation | Upper bound of the result | Lower bound of the result |
| --- | --- | --- |
| $a + b$ | $a_{\text{upper}} + b_{\text{upper}}$ | $a_{\text{lower}} + b_{\text{lower}}$ |
| $a - b$ | $a_{\text{upper}} - b_{\text{lower}}$ | $a_{\text{lower}} - b_{\text{upper}}$ |
| $a \times b$ | $a_{\text{upper}} \times b_{\text{upper}}$ | $a_{\text{lower}} \times b_{\text{lower}}$ |
| $a \div b$ | $a_{\text{upper}} \div b_{\text{lower}}$ | $a_{\text{lower}} \div b_{\text{upper}}$ |
:::

The surprising rows are subtraction and division: to make a difference or a quotient as **large** as possible, you take away or divide by the **smallest** possible value.

:::worked-solution[Example 3: the area of a rectangle]
A rectangle measures 7.2 cm by 4.5 cm, both correct to 1 decimal place. Find the bounds of its area.
1. Length: $7.15 \leq l < 7.25$. Width: $4.45 \leq w < 4.55$.
2. Lower bound of the area: $7.15 \times 4.45 = 31.8175\ \text{cm}^2$.
3. Upper bound of the area: $7.25 \times 4.55 = 32.9875\ \text{cm}^2$.
:::

:::worked-solution[Example 4: the speed of a sprinter]
A sprinter runs 100 m, correct to the nearest metre, in 12.4 s, correct to the nearest tenth of a second. Find the greatest and least possible average speeds.
1. Distance: $99.5 \leq d < 100.5$. Time: $12.35 \leq t < 12.45$.
2. Speed $= \dfrac{d}{t}$. The greatest speed uses the largest distance and the **smallest** time: $\dfrac{100.5}{12.35} = 8.1376\ldots \approx 8.14$ m/s.
3. The least speed uses the smallest distance and the **largest** time: $\dfrac{99.5}{12.45} = 7.9919\ldots \approx 7.99$ m/s.
:::

:::worked-solution[Example 5: a difference]
Two pieces of wood are 15 cm and 8 cm long, each to the nearest centimetre. Find the bounds of the difference in their lengths.
1. Bounds: $14.5 \leq a < 15.5$ and $7.5 \leq b < 8.5$.
2. Upper bound of $a - b$: $15.5 - 7.5 = 8$ cm.
3. Lower bound of $a - b$: $14.5 - 8.5 = 6$ cm.
:::

## Common mistakes

:::mistake{title="Using a whole unit instead of half"}
For 4.6 correct to 1 d.p., the bounds are $4.55$ and $4.65$, not $4.5$ and $4.7$.
:::

:::mistake{title="Misreading the accuracy of significant figures"}
600 to 2 s.f. is accurate to the nearest 10, so the bounds are 595 and 605, not 550 and 650.
:::

:::mistake{title="Using upper bounds for everything"}
The largest value of $a - b$ or $a \div b$ uses the **lower** bound of $b$. Think about which choice makes the answer bigger.
:::

:::mistake{title="Rounding the bounds too early"}
Keep the bounds exact in the calculation and round only the final answer, as the question instructs.
:::

## Exam tips

:::exam-tip
Write down both bounds of every measurement before you start a calculation. The examiner can then give method marks even if you choose the wrong combination.
:::

:::exam-tip
In context questions, check that the answer makes sense: the upper bound of an area must be larger than the area calculated from the rounded values.
:::

:::exam-tip
When asked "how many rolls (or buckets) are needed to be sure", use the bound that gives the worst case and then round **up** to a whole number.
:::

## Summary

:::summary
- The bounds of a rounded value are half a unit of the rounding below and above it.
- Write the result as an inequality, for example $4.55 \leq x < 4.65$.
- For a sum or a product, use upper with upper (or lower with lower).
- For a difference or a quotient, the upper bound uses the upper bound of the first value and the lower bound of the second, and the other way round for the lower bound.
- Keep full accuracy until the end of the calculation.
:::
