---
{
  "key": "calculus.small-increments",
  "title": "Small increments and approximations",
  "summary": "Use δy ≈ (dy/dx) δx to estimate the change in a quantity caused by a small change in another, find approximate percentage changes (for example in the area of a square or the volume of a sphere), and approximate values of functions near a known value.",
  "concepts": ["amath.calculus.small-increments"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A metalworker in Bulawayo cuts a steel ball with radius 10 cm, but the radius comes out 0.2 cm too large. Roughly how much extra steel was used? A surveyor measures the side of a square plot with a 3% error. Roughly what is the percentage error in the area? You could work out both exactly, but calculus gives a quick, accurate estimate in one line.

The idea is that, very close to a point, a curve is almost the same as its tangent. A small step $\delta x$ along the tangent changes $y$ by the gradient times the step. This "small increments" method is in both the ZIMSEC syllabus (applications of differentiation: approximations) and Cambridge 0606 (topic 14.7), where it often appears in a short question asking for the approximate change "in terms of $p$".

## Key definitions

:::definition{term="Small increment"}
A small change in a variable, written with the Greek letter delta: $\delta x$ is a small change in $x$, and $\delta y$ the resulting change in $y$. $\delta x$ is one symbol, not $\delta \times x$.
:::

:::formula{name="Small increments (not in the List of formulas)"}
$$
\delta y \approx \frac{dy}{dx} \times \delta x
$$
:::

:::definition{term="Percentage change"}
$\dfrac{\delta y}{y} \times 100\%$: the change as a percentage of the original value.
:::

The approximation comes straight from the definition of the derivative. For small $\delta x$, the chord gradient $\dfrac{\delta y}{\delta x}$ is close to the tangent gradient $\dfrac{dy}{dx}$, so $\dfrac{\delta y}{\delta x} \approx \dfrac{dy}{dx}$. Multiplying by $\delta x$ gives the formula. The smaller $\delta x$, the better the approximation.

## Approximate changes

1. Write the formula linking the two quantities.
2. Differentiate and evaluate $\dfrac{dy}{dx}$ at the **original** value of $x$.
3. Multiply by $\delta x$, which is the new value minus the old value (negative for a decrease).

:::worked-solution[Example 1: $y = x^3$. Use calculus to estimate the change in $y$ when $x$ increases from 2 to 2.01]
1. $\dfrac{dy}{dx} = 3x^2 = 12$ at $x = 2$.
2. $\delta x = 2.01 - 2 = 0.01$.
3. $\delta y \approx 12 \times 0.01 = 0.12$.
4. Check: exactly, $2.01^3 - 2^3 = 8.120601 - 8 = 0.120601$. The estimate is very close.
:::

:::worked-solution[Example 2: the radius of a steel ball is meant to be 10 cm but is 10.2 cm. Estimate the extra volume of steel]
1. $V = \frac{4}{3}\pi r^3$, so $\dfrac{dV}{dr} = 4\pi r^2 = 400\pi$ at $r = 10$.
2. $\delta r = 0.2$.
3. $\delta V \approx 400\pi \times 0.2 = 80\pi \approx 251$ cm³.
4. (The exact increase is about 256 cm³: the estimate is good because 0.2 is small compared with 10.)
:::

## Changes in terms of a letter

Cambridge often writes the small change as a letter such as $p$ or $h$. The method is identical; the answer is an expression in $p$.

:::worked-solution[Example 3: $y = \dfrac{16}{x}$. Find the approximate change in $y$ as $x$ increases from 4 to $4 + p$, where $p$ is small]
1. $y = 16x^{-1}$, so $\dfrac{dy}{dx} = -16x^{-2} = -\dfrac{16}{x^2}$.
2. At $x = 4$: $\dfrac{dy}{dx} = -\dfrac{16}{16} = -1$.
3. $\delta x = p$, so $\delta y \approx -1 \times p = -p$.
4. So $y$ decreases by approximately $p$.
:::

## Percentage changes

For a percentage change in $x$ of $k\%$, $\delta x = \dfrac{k}{100}x$. Keep $x$ as a letter: it usually cancels.

:::worked-solution[Example 4: the side of a square increases by 3%. Find the approximate percentage increase in its area]
1. $A = x^2$, $\dfrac{dA}{dx} = 2x$.
2. $\delta x = 0.03x$.
3. $\delta A \approx 2x \times 0.03x = 0.06x^2$.
4. Percentage change $= \dfrac{\delta A}{A} \times 100 = \dfrac{0.06x^2}{x^2} \times 100 = 6\%$.
:::

A useful pattern: if $y = kx^n$, a small $k\%$ change in $x$ gives approximately an $nk\%$ change in $y$. So a 1% error in the radius of a sphere gives about a 3% error in its volume, because $V$ is proportional to $r^3$. (The exact change for the square is $1.03^2 - 1 = 6.09\%$; the approximation ignores the tiny $0.03^2$ term.)

## Approximate values of functions

To estimate $f(a + \delta x)$ when $f(a)$ is easy, use

$$
f(a + \delta x) \approx f(a) + f'(a)\,\delta x
$$

:::worked-solution[Example 5: use calculus to find an approximate value of $\sqrt{25.3}$]
1. Let $y = \sqrt{x}$; the nearby easy value is $x = 25$, where $y = 5$.
2. $\dfrac{dy}{dx} = \dfrac{1}{2\sqrt{x}} = \dfrac{1}{10}$ at $x = 25$.
3. $\delta x = 0.3$, so $\delta y \approx \frac{1}{10} \times 0.3 = 0.03$.
4. $\sqrt{25.3} \approx 5 + 0.03 = 5.03$. (A calculator gives $5.0299\ldots$)
:::

![Graph of y = square root of x with its tangent at (25, 5), gradient 1/10: close to x = 25 the tangent and curve almost coincide, so sqrt(25.3) is approximately 5 + 0.1 x 0.3 = 5.03.](media:diagrams/small-increments-sqrt-tangent.png "Figure: near x = 25 the tangent is a good stand-in for the curve, giving √25.3 ≈ 5.03")

:::keyfact{title="ZIMSEC and Cambridge"}
Both syllabuses examine $\delta y \approx \frac{dy}{dx}\delta x$. Cambridge typically sets it with a letter ("$x$ increases from 2 to $2 + p$; find the approximate change in $y$ in terms of $p$") or as part of a connected-rates question. ZIMSEC more often asks for a numerical approximation, an approximate value or a percentage error.
:::

## Common mistakes

:::mistake{title="Evaluating the derivative at the new value"}
Use the original value ($x = 2$, not 2.01). The difference is small, but the method expects the known point.
:::

:::mistake{title="Giving the new value instead of the change"}
$\delta y$ is the **change**. If the question asks for the approximate new value, add $\delta y$ to the original $y$.
:::

:::mistake{title="Wrong sign for a decrease"}
If $x$ falls from 5 to 4.98, then $\delta x = -0.02$.
:::

:::mistake{title="Using a percentage as a number"}
A 3% increase means $\delta x = 0.03x$, not $\delta x = 3$.
:::

## Exam tips

:::exam-tip
Write the formula $\delta y \approx \frac{dy}{dx} \times \delta x$ first, then the value of $\frac{dy}{dx}$, then $\delta x$. Each is usually a mark.
:::

:::exam-tip
"Hence find an approximate value" means use the derivative you have just found; a calculator answer without the method scores nothing.
:::

:::exam-tip
Use the "$\approx$" sign: the result is an approximation, and examiners expect it.
:::

## Summary

:::summary
- $\delta y \approx \dfrac{dy}{dx} \times \delta x$, with $\dfrac{dy}{dx}$ evaluated at the original value.
- $\delta x$ = new value $-$ old value; negative for a decrease.
- Percentage change $= \dfrac{\delta y}{y} \times 100$; for $y = kx^n$ it is about $n$ times the percentage change in $x$.
- Approximate values: $f(a + \delta x) \approx f(a) + f'(a)\delta x$.
- The approximation is better the smaller $\delta x$ is.
:::
