---
{
  "key": "numerical.trapezium-errors",
  "title": "The trapezium rule and numerical errors",
  "summary": "Estimate a definite integral with the trapezium rule, decide from the shape of the curve whether the estimate is too large or too small, bound an area with rectangles, and work with absolute and relative errors in measurements and calculations.",
  "concepts": ["amaths.numerical.trapezium-errors"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Some integrals cannot be found exactly: there is no elementary antiderivative of $\sqrt{1 + x^3}$ or $\mathrm{e}^{-x^2}$. Others come from data, such as a table of river depths across the Zambezi measured every 5 metres, where there is no formula at all. In both cases we estimate the area under a curve by splitting it into thin strips and replacing each strip by a trapezium. The result is an approximation, so we also need language for **how wrong** an answer might be: absolute and relative error.

Cambridge examines the trapezium rule in Paper 2 only (AS, topic 2.5), with a question on whether the estimate is an over- or under-estimate. ZIMSEC (Pure Mathematics Form 6, topic 6.6) asks learners to derive the rule, to bound areas using rectangles or trapezia, and to define and estimate errors.

## Key definitions

:::formula{name="Trapezium rule (in MF19)"}
$$
\int_a^b y\,\mathrm{d}x \approx \frac{1}{2}h\left[y_0 + 2(y_1 + y_2 + \dots + y_{n-1}) + y_n\right], \qquad h = \frac{b - a}{n}
$$
:::

Here $n$ is the number of **strips** (intervals) of equal width $h$, and $y_0, y_1, \dots, y_n$ are the $n + 1$ **ordinates** (heights) at $x = a, a + h, \dots, b$. Cambridge prints this in the list of formulae MF19; ZIMSEC expects you to know and derive it.

:::definition{term="Absolute and relative error"}
If $X$ is the true value and $x$ an approximation, the **error** is $x - X$, the **absolute error** is $|x - X|$, and the **relative error** is $\dfrac{|x - X|}{|X|}$ (often given as a percentage).
:::

## Deriving the rule

Divide $[a, b]$ into $n$ strips of width $h$. The strip between $x_{r}$ and $x_{r+1}$ is approximated by a trapezium with parallel sides $y_r$ and $y_{r+1}$ and width $h$, so its area is $\frac{1}{2}h(y_r + y_{r+1})$. Adding all $n$ trapezia:

$$
\frac{1}{2}h(y_0 + y_1) + \frac{1}{2}h(y_1 + y_2) + \dots + \frac{1}{2}h(y_{n-1} + y_n) = \frac{1}{2}h\left[y_0 + 2(y_1 + \dots + y_{n-1}) + y_n\right]
$$

Every inner ordinate belongs to two trapezia, which is why it is doubled; the two end ordinates are used once.

## Using the rule

Make a table of $x$ and $y$ values, keep at least 4 decimal places in the $y$ values, and only round the final answer.

:::worked-solution[Example 1: use the trapezium rule with 4 strips to estimate $\displaystyle\int_0^2 \sqrt{1 + x^3}\,\mathrm{d}x$, giving your answer to 3 significant figures]
1. $h = \frac{2 - 0}{4} = 0.5$, so the $x$ values are $0, 0.5, 1, 1.5, 2$.
2. Ordinates: $y_0 = 1$, $y_1 = 1.0607$, $y_2 = 1.4142$, $y_3 = 2.0917$, $y_4 = 3$.
3. Sum: $y_0 + y_4 = 4$ and $2(y_1 + y_2 + y_3) = 2(4.5665) = 9.1331$.
4. Estimate $= \frac{1}{2}(0.5)(4 + 9.1331) = 3.2833$.
5. To 3 significant figures, the integral is approximately $3.28$.
:::

![Graph of y = sqrt(1 + x^3) from x = 0 to 2 divided into four strips of width 0.5: the ordinates are 1, 1.0607, 1.4142, 2.0917 and 3, and the tops of the trapezia are straight chords that lie slightly above the curve, so the trapezium rule estimate is 3.2833.](media:diagrams/trapezium-rule-four-strips.png "Figure: four trapezia of width 0.5 under y = √(1 + x³)")

A common slip is to use $n = 5$ because there are five ordinates: the number of **strips** is one less than the number of ordinates.

## Over-estimate or under-estimate?

The tops of the trapezia are chords of the curve. Where the curve is **convex** (bends upwards, $y'' > 0$), chords lie above the curve and the rule **over-estimates**. Where it is **concave** (bends downwards, $y'' < 0$), chords lie below the curve and the rule **under-estimates**. If the curve changes concavity in the interval, you cannot decide without more work.

:::worked-solution[Example 2: estimate $\displaystyle\int_1^3 \ln x\,\mathrm{d}x$ with 4 strips and explain whether the estimate is too large or too small]
1. $h = 0.5$; ordinates at $x = 1, 1.5, 2, 2.5, 3$: $0$, $0.4055$, $0.6931$, $0.9163$, $1.0986$.
2. Estimate $= \frac{1}{2}(0.5)\left[0 + 2(0.4055 + 0.6931 + 0.9163) + 1.0986\right] = 1.2821$.
3. $y = \ln x$ has $y'' = -\frac{1}{x^2} < 0$: the curve is concave, so the chords lie below it.
4. The estimate $1.28$ is therefore an **under-estimate**. (The exact value, by parts, is $3\ln 3 - 2 = 1.2958$.)
:::

![Graph of y = ln x from x = 1 to 3 with four trapezia: because the curve is concave (bends downwards) every chord lies below it, so the trapezium estimate 1.2821 is an under-estimate of the true area 1.2958.](media:diagrams/trapezium-rule-concave-underestimate.png "Figure: for the concave curve y = ln x the chords lie below the curve, so the rule under-estimates")

Using more strips makes the chords hug the curve more closely, so the error shrinks: doubling $n$ divides the error by roughly 4.

## Bounding an area with rectangles (ZIMSEC)

For a function that is **decreasing** on $[a, b]$, rectangles whose heights are the left-hand ordinates stand above the curve (an upper bound), and rectangles using the right-hand ordinates sit below it (a lower bound). For an increasing function the roles swap. The true area lies between the two sums.

:::worked-solution[Example 3: use 4 rectangles of width 0.25 to find lower and upper bounds for $\displaystyle\int_1^2 \frac{1}{x}\,\mathrm{d}x$]
1. $y = \frac{1}{x}$ is decreasing, with ordinates at $1, 1.25, 1.5, 1.75, 2$: $1, 0.8, 0.6667, 0.5714, 0.5$.
2. Upper bound (left ordinates): $0.25(1 + 0.8 + 0.6667 + 0.5714) = 0.7595$.
3. Lower bound (right ordinates): $0.25(0.8 + 0.6667 + 0.5714 + 0.5) = 0.6345$.
4. So $0.6345 < \displaystyle\int_1^2 \frac{1}{x}\,\mathrm{d}x < 0.7595$. (The true value is $\ln 2 = 0.6931$; the trapezium rule, the average of the two sums, gives $0.6970$.)
:::

## Errors in measurements and calculations (ZIMSEC)

A measurement given "to the nearest 0.1 cm" can be wrong by up to 0.05 cm: its maximum absolute error is half a unit of the last digit. When measured values are combined, find the greatest and least possible results to see how the errors spread.

:::worked-solution[Example 4: a tobacco-drying rack is measured as 12.4 m by 7.6 m, each to the nearest 0.1 m. Find the calculated area, its greatest possible absolute error and the corresponding relative error]
1. Calculated area: $12.4 \times 7.6 = 94.24$ m².
2. Greatest possible area: $12.45 \times 7.65 = 95.2425$ m². Least: $12.35 \times 7.55 = 93.2425$ m².
3. The greatest possible absolute error is about $95.2425 - 94.24 = 1.00$ m².
4. Relative error $\approx \dfrac{1.00}{94.24} = 0.0106$, about $1.1\%$.
:::

Useful rules of thumb: when quantities are added or subtracted, absolute errors add; when they are multiplied or divided, relative errors (approximately) add. Here $\frac{0.05}{12.4} + \frac{0.05}{7.6} = 0.0106$, matching step 4.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge: the trapezium rule is AS only (Paper 2), not in Paper 3; questions ask for an estimate and for over/under with a reason. ZIMSEC (Form 6) also asks you to derive the rule, bound areas with rectangles or trapezia, and estimate absolute and relative errors in calculations.
:::

## Common mistakes

:::mistake{title="Counting ordinates as strips"}
Five $x$ values make four strips, so $h = \frac{b - a}{4}$.
:::

:::mistake{title="Doubling the end ordinates"}
Only the inner ordinates are doubled.
:::

:::mistake{title="Rounding the ordinates too early"}
Keep at least 4 decimal places in the table; round only the final estimate.
:::

:::mistake{title="Reasoning about over-estimates from the gradient"}
Whether the rule over- or under-estimates depends on the **concavity** (the sign of $y''$), not on whether the curve is increasing or decreasing.
:::

## Exam tips

:::exam-tip
Set out the table of $x$ and $y$ values: method marks are given for correct ordinates even if the final arithmetic slips.
:::

:::exam-tip
For "state, with a reason, whether your estimate is an over-estimate or an under-estimate", mention the shape ("the curve is concave/convex, so the tops of the trapezia lie below/above the curve").
:::

:::exam-tip
In trigonometric integrands use radians for the ordinates.
:::

## Summary

:::summary
- Trapezium rule: $\int_a^b y\,\mathrm{d}x \approx \frac{1}{2}h[y_0 + 2(y_1 + \dots + y_{n-1}) + y_n]$, $h = \frac{b - a}{n}$.
- Convex curve ($y'' > 0$): over-estimate. Concave curve ($y'' < 0$): under-estimate.
- More strips give a better estimate.
- Rectangles with left and right ordinates bound the area of a monotonic function.
- Absolute error $|x - X|$; relative error $\frac{|x - X|}{|X|}$; a measurement to the nearest unit has maximum error half a unit.
:::
