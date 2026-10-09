---
{
  "key": "logs.graphs",
  "title": "Graphs of exponential and logarithmic functions",
  "summary": "Describe and sketch the graphs of eˣ, ln x, aˣ and logₐ x and of transformed curves such as y = ke^(nx) + a and y = k ln(ax + b), finding intercepts and the equations of asymptotes, and use the fact that eˣ and ln x are inverse functions.",
  "concepts": ["amath.logs.graphs"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Exponential curves describe anything that grows or decays by the same factor in equal times: money in a savings account, a bacterial culture, the cooling of water from a kettle, the fall in value of a tractor. Logarithmic curves describe the reverse: quantities that rise quickly at first and then more and more slowly, like the loudness scale in decibels.

In the examination you are asked to **sketch** these graphs, which means showing the correct shape together with the key features: where the curve meets the axes, the equation of any asymptote, and whether the curve is increasing or decreasing. Cambridge asks for the graphs of $\mathrm{e}^x$ and $\ln x$ and their transformations; ZIMSEC asks you to sketch a logarithmic function and its inverse. You need the laws of logarithms and the idea of an inverse function.

## Key definitions

:::definition{term="Exponential function"}
A function $f(x) = a^x$ with base $a > 0$, $a \neq 1$. The most important one is $\mathrm{e}^x$, with base $\mathrm{e} \approx 2.718$.
:::

:::definition{term="Logarithmic function"}
A function $f(x) = \log_a x$, defined only for $x > 0$. The natural logarithm $\ln x$ has base $\mathrm{e}$.
:::

:::definition{term="Asymptote"}
A straight line that a curve approaches more and more closely but never reaches. An exponential curve has a **horizontal** asymptote $y = c$; a logarithmic curve has a **vertical** asymptote $x = c$.
:::

:::keyfact{title="Inverse functions"}
$y = a^x$ and $y = \log_a x$ are inverse functions, so each graph is the reflection of the other in the line $y = x$. In particular $\mathrm{e}^{\ln x} = x$ for $x > 0$ and $\ln(\mathrm{e}^x) = x$ for all $x$.
:::

## The basic curves

The graph of $y = 2^x$ and the graph of its inverse $y = \log_2 x$ can be drawn from these tables. Notice that the rows swap over.

| $x$ | $-2$ | $-1$ | $0$ | $1$ | $2$ | $3$ |
| --- | --- | --- | --- | --- | --- | --- |
| $2^x$ | $0.25$ | $0.5$ | $1$ | $2$ | $4$ | $8$ |

| $x$ | $0.25$ | $0.5$ | $1$ | $2$ | $4$ | $8$ |
| --- | --- | --- | --- | --- | --- | --- |
| $\log_2 x$ | $-2$ | $-1$ | $0$ | $1$ | $2$ | $3$ |

**The curve $y = a^x$ (with $a > 1$), including $y = \mathrm{e}^x$:**

- passes through $(0, 1)$, because $a^0 = 1$;
- is always above the $x$-axis, so it never meets it;
- increases ever more steeply as $x$ increases;
- approaches the $x$-axis as $x \to -\infty$: the asymptote is $y = 0$.

**The curve $y = \log_a x$ (with $a > 1$), including $y = \ln x$:**

- exists only for $x > 0$;
- passes through $(1, 0)$, because $\log_a 1 = 0$;
- increases ever more slowly as $x$ increases, but has no upper limit;
- falls steeply towards $-\infty$ as $x \to 0$ from the right: the asymptote is $x = 0$ (the $y$-axis).

The curve $y = \mathrm{e}^{-x}$ is the reflection of $y = \mathrm{e}^x$ in the $y$-axis: it passes through $(0, 1)$ and **decreases** towards the asymptote $y = 0$ as $x$ increases. This is the shape of every decay curve.

## Transformed exponential curves: $y = k\mathrm{e}^{nx} + a$

Each constant has a clear effect:

- $n > 0$ gives growth and $n < 0$ gives decay;
- $k$ stretches the curve vertically (and reflects it in the $x$-axis when $k < 0$);
- $a$ moves the curve up or down, so the **asymptote is $y = a$**.

To sketch it, find the asymptote, the $y$-intercept (put $x = 0$) and the $x$-intercept, if there is one (put $y = 0$).

:::worked-solution[Example 1: sketch $y = 3\mathrm{e}^{2x} - 4$, stating the intercepts and the asymptote]
1. Asymptote: as $x \to -\infty$, $\mathrm{e}^{2x} \to 0$, so $y \to -4$. The asymptote is $y = -4$.
2. $y$-intercept: $x = 0$ gives $y = 3(1) - 4 = -1$, so the curve passes through $(0, -1)$.
3. $x$-intercept: $3\mathrm{e}^{2x} = 4$, so $\mathrm{e}^{2x} = \frac{4}{3}$ and $x = \frac{1}{2}\ln\frac{4}{3} \approx 0.144$.
4. Shape: $n = 2 > 0$ and $k = 3 > 0$, so the curve rises from just above $y = -4$ on the left, through $(0, -1)$ and $(0.144, 0)$, and then climbs steeply (at $x = 1$, $y \approx 18.2$).
:::

## Transformed logarithmic curves: $y = k\ln(ax + b)$

The logarithm needs a positive argument, so the curve exists only where $ax + b > 0$. The **vertical asymptote** is where the argument is zero: $ax + b = 0$. The $x$-intercept is where the argument equals 1, since $\ln 1 = 0$.

:::worked-solution[Example 2: sketch $y = 2\ln(x + 3)$, stating the intercepts and the asymptote]
1. Domain: $x + 3 > 0$, so $x > -3$. The asymptote is $x = -3$.
2. $x$-intercept: $\ln(x + 3) = 0$ when $x + 3 = 1$, so $x = -2$: the point $(-2, 0)$.
3. $y$-intercept: $x = 0$ gives $y = 2\ln 3 \approx 2.20$: the point $(0, 2.20)$.
4. Shape: the curve comes up from $-\infty$ close to the line $x = -3$, crosses the $x$-axis at $-2$ and the $y$-axis at $2.20$, then keeps rising more and more slowly.
:::

## A logarithmic function and its inverse

To sketch a function and its inverse on the same axes, find the inverse algebraically, then reflect every feature in $y = x$: intercepts swap coordinates and a vertical asymptote $x = c$ becomes a horizontal asymptote $y = c$.

:::worked-solution[Example 3: $f(x) = \ln(2x - 1)$ for $x > \frac{1}{2}$. Find $f^{-1}(x)$ and describe both graphs]
1. Let $y = \ln(2x - 1)$. Then $\mathrm{e}^y = 2x - 1$, so $x = \dfrac{\mathrm{e}^y + 1}{2}$.
2. Hence $f^{-1}(x) = \dfrac{\mathrm{e}^x + 1}{2}$, defined for all real $x$ (the range of $f$).
3. Graph of $f$: vertical asymptote $x = \frac{1}{2}$, crosses the $x$-axis at $(1, 0)$, increasing, no $y$-intercept (since $x = 0$ is outside the domain).
4. Graph of $f^{-1}$: horizontal asymptote $y = \frac{1}{2}$, crosses the $y$-axis at $(0, 1)$, increasing, no $x$-intercept.
5. The two curves are reflections of each other in $y = x$; the point $(1, 0)$ on $f$ matches $(0, 1)$ on $f^{-1}$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC asks you to sketch the graph of a logarithmic function and of its inverse, as in Example 3. Cambridge expects the graphs of $\mathrm{e}^x$, $\ln x$ and $y = k\mathrm{e}^{nx} + a$ or $y = k\ln(ax + b)$ with intercepts and asymptotes, and uses the same skills in questions on functions. In both, a sketch is a careful description of features, not a plotted graph.
:::

## Common mistakes

:::mistake{title="Letting the curve cross its asymptote"}
$y = 3\mathrm{e}^{2x} - 4$ gets close to $y = -4$ but never reaches it, because $\mathrm{e}^{2x}$ is never zero. Draw the asymptote as a dashed line and keep the curve on one side.
:::

:::mistake{title="Giving the wrong asymptote for a log curve"}
For $y = \ln(x + 3)$ the asymptote is $x = -3$ (where the argument is 0), not $x = 3$ and not $y = 0$.
:::

:::mistake{title="Showing a y-intercept that does not exist"}
$y = \ln(2x - 1)$ is not defined at $x = 0$, so it has no $y$-intercept. Check the domain before substituting $x = 0$.
:::

:::mistake{title="Reflecting in the wrong line"}
The inverse is the reflection in $y = x$, not in the $x$-axis or the $y$-axis. Swapping the coordinates of each key point is a quick check.
:::

## Exam tips

:::exam-tip
A sketch earns marks for the correct **shape**, each **intercept** written as a coordinate, and the **asymptote** labelled with its equation. Label all three.
:::

:::exam-tip
Exact intercepts such as $x = \frac{1}{2}\ln\frac{4}{3}$ are expected on Cambridge Paper 1; on a calculator paper give 3 significant figures as well.
:::

:::exam-tip
When asked for the number of solutions of an equation such as $\mathrm{e}^x = 5 - x$, sketch both sides on the same axes and count the points of intersection.
:::

## Summary

:::summary
- $y = a^x$ ($a > 1$): through $(0, 1)$, increasing, asymptote $y = 0$; $y = \mathrm{e}^{-x}$ decreases towards $y = 0$.
- $y = \log_a x$: only for $x > 0$, through $(1, 0)$, increasing slowly, asymptote $x = 0$.
- $y = k\mathrm{e}^{nx} + a$ has asymptote $y = a$ and $y$-intercept $k + a$.
- $y = k\ln(ax + b)$ has asymptote $ax + b = 0$ and meets the $x$-axis where $ax + b = 1$.
- $\mathrm{e}^x$ and $\ln x$ are inverses: their graphs are reflections in $y = x$, and asymptotes and intercepts swap.
:::
