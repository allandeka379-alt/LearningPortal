---
{
  "key": "trigonometry.trig-graphs-and-equations",
  "title": "Graphs of trigonometric functions and equations",
  "summary": "Recognise, sketch and interpret the graphs of y = sin x, y = cos x and y = tan x for 0° ≤ x ≤ 360°, and use their symmetry to solve equations such as sin x = 0.4 or 3 sin x + 2 = 0, giving both solutions in the range.",
  "concepts": ["math.trigonometry.trig-functions"],
  "objectives": ["cambridge/igcse/mathematics:6.4.1", "cambridge/igcse/mathematics:6.4.2"],
  "estimatedMinutes": 25,
  "level": "extended"
}
---
## Introduction

The height of a seat on a turning Ferris wheel, the hours of daylight in Harare through the year, the voltage in a mains electricity cable: all of these rise and fall in a regular wave. The sine and cosine functions are the mathematics of such waves.

In this lesson you will sketch the graphs of $y = \sin x$, $y = \cos x$ and $y = \tan x$ from $0^\circ$ to $360^\circ$, and use their symmetry to solve trigonometric equations. A calculator gives only **one** solution of an equation such as $\sin x = 0.4$; the graphs show you where the others are.

:::note{title="Cambridge Extended only"}
Graphs of trigonometric functions and trigonometric equations are in the Cambridge IGCSE Extended syllabus (6.4). They are not listed in the ZIMSEC O-Level syllabus.
:::

You should already know the sine, cosine and tangent of obtuse angles.

## Key definitions

:::definition{term="Periodic function"}
A function whose graph repeats itself after a fixed interval, called the **period**.
:::

:::definition{term="Asymptote"}
A line that a graph approaches more and more closely but never meets.
:::

## The three graphs

:::keyfact{title="y = sin x"}
Starts at $(0^\circ, 0)$, rises to a maximum of $1$ at $90^\circ$, falls through $0$ at $180^\circ$ to a minimum of $-1$ at $270^\circ$, and returns to $0$ at $360^\circ$. Period $360^\circ$.
:::

:::keyfact{title="y = cos x"}
Starts at its maximum $(0^\circ, 1)$, falls through $0$ at $90^\circ$ to a minimum of $-1$ at $180^\circ$, rises through $0$ at $270^\circ$ and returns to $1$ at $360^\circ$. Period $360^\circ$. It is the sine curve shifted $90^\circ$ to the left.
:::

:::keyfact{title="y = tan x"}
Passes through $0$ at $0^\circ$, $180^\circ$ and $360^\circ$ and increases steadily between the asymptotes, but it is **undefined** at $90^\circ$ and $270^\circ$, where the graph has vertical asymptotes. Period $180^\circ$. Unlike sine and cosine, it takes every value, however large.
:::

| $x$ | $0^\circ$ | $90^\circ$ | $180^\circ$ | $270^\circ$ | $360^\circ$ |
| --- | :---: | :---: | :---: | :---: | :---: |
| $\sin x$ | $0$ | $1$ | $0$ | $-1$ | $0$ |
| $\cos x$ | $1$ | $0$ | $-1$ | $0$ | $1$ |
| $\tan x$ | $0$ | undefined | $0$ | undefined | $0$ |

## Solving equations: using symmetry

The graphs are symmetrical, which gives the second solution from the calculator's first one ($\alpha$):

:::keyfact{title="Second solutions between 0° and 360°"}
- $\sin x = k$: the sine curve is symmetrical about $x = 90^\circ$, so the solutions are $\alpha$ and $180^\circ - \alpha$.
- $\cos x = k$: the cosine curve is symmetrical about $x = 180^\circ$, so the solutions are $\alpha$ and $360^\circ - \alpha$.
- $\tan x = k$: the tangent repeats every $180^\circ$, so the solutions are $\alpha$ and $\alpha + 180^\circ$.
:::

If the calculator gives a negative angle $\alpha$ (this happens with $\sin^{-1}$ or $\tan^{-1}$ of a negative number), keep that $\alpha$ in the rules: for sine the solutions are $180^\circ - \alpha$ and $\alpha + 360^\circ$; for tangent they are $\alpha + 180^\circ$ and $\alpha + 360^\circ$. ($\cos^{-1}$ never gives a negative angle.)

## Worked examples

:::worked-solution[Example 1: solve $\sin x = 0.4$ for $0^\circ \leq x \leq 360^\circ$]
1. Calculator: $\alpha = \sin^{-1}(0.4) = 23.578\ldots^\circ$.
2. Second solution: $180^\circ - 23.578^\circ = 156.421\ldots^\circ$.
3. $x = 23.6^\circ$ or $x = 156.4^\circ$ (1 d.p.). Both are where the line $y = 0.4$ crosses the first hump of the sine curve.
:::

:::worked-solution[Example 2: solve $\cos x = -0.6$ for $0^\circ \leq x \leq 360^\circ$]
1. Calculator: $\alpha = \cos^{-1}(-0.6) = 126.869\ldots^\circ$.
2. Second solution: $360^\circ - 126.869^\circ = 233.130\ldots^\circ$.
3. $x = 126.9^\circ$ or $x = 233.1^\circ$. Both lie in the part of the cosine curve below the axis, as a negative value requires.
:::

:::worked-solution[Example 3: solve $\tan x = 2.5$ for $0^\circ \leq x \leq 360^\circ$]
1. Calculator: $\alpha = \tan^{-1}(2.5) = 68.198\ldots^\circ$.
2. Second solution: $68.198^\circ + 180^\circ = 248.198\ldots^\circ$.
3. $x = 68.2^\circ$ or $x = 248.2^\circ$.
:::

:::worked-solution[Example 4: solve $3\sin x + 2 = 0$ for $0^\circ \leq x \leq 360^\circ$]
1. Rearrange first: $\sin x = -\frac{2}{3}$.
2. Calculator: $\sin^{-1}\left(-\frac{2}{3}\right) = -41.81^\circ$, which is outside the range. Adding $360^\circ$ gives $318.19^\circ$.
3. By symmetry about $90^\circ$ (equivalently, $180^\circ - (-41.81^\circ)$), the other solution is $221.81^\circ$.
4. $x = 221.8^\circ$ or $x = 318.2^\circ$. A negative sine means both angles are between $180^\circ$ and $360^\circ$, where the curve is below the axis.
:::

## Solving with a graph

Examination questions sometimes give an accurate graph of $y = \sin x$ or $y = \cos x$ and ask you to **use the graph** to solve an equation. Draw the horizontal line $y = k$, mark where it crosses the curve, and read down to the $x$-axis. Readings are usually accepted within a few degrees, because they come from a drawing.

:::example{title="Estimating from a sketch"}
To solve $\cos x = 0.5$ from the graph of $y = \cos x$, draw the line $y = 0.5$. It crosses the curve once on the way down (near $x = 60^\circ$) and once on the way up (near $x = 300^\circ$). The exact answers are $60^\circ$ and $360^\circ - 60^\circ = 300^\circ$, matching the symmetry rule for cosine.
:::

The graph also tells you how many solutions to expect. A line $y = k$ with $-1 < k < 1$ crosses the sine or cosine curve twice in $0^\circ$ to $360^\circ$; the lines $y = 1$ and $y = -1$ touch it once; and lines above $y = 1$ or below $y = -1$ miss it altogether. Every horizontal line except $y = 0$ crosses the tangent graph exactly twice in this range; the line $y = 0$ meets it three times, at $0^\circ$, $180^\circ$ and $360^\circ$.

## Common mistakes

:::mistake{title="Stopping at the calculator answer"}
Between $0^\circ$ and $360^\circ$, $\sin x = k$, $\cos x = k$ and $\tan x = k$ usually have **two** solutions. The calculator shows only one.
:::

:::mistake{title="Using the wrong symmetry"}
$180^\circ - \alpha$ is for sine, $360^\circ - \alpha$ is for cosine, $\alpha + 180^\circ$ is for tangent. Using $180^\circ - \alpha$ on a cosine equation gives a wrong answer: check every solution by substituting it back.
:::

:::mistake{title="Not rearranging first"}
In $3\sin x + 2 = 0$, find $\sin x = -\frac{2}{3}$ before using $\sin^{-1}$. Taking $\sin^{-1}$ of 2 or 3 is meaningless.
:::

:::mistake{title="Impossible values"}
$\sin x$ and $\cos x$ always lie between $-1$ and $1$. An equation like $\cos x = 1.3$ has no solutions; say so.
:::

## Exam tips

:::exam-tip
Sketch the curve and the horizontal line $y = k$ before solving. The number of crossing points is the number of solutions, and their positions show roughly where they are.
:::

:::exam-tip
Check every answer by substituting it into the original equation with your calculator.
:::

:::exam-tip
Give angles to 1 decimal place, and use the unrounded calculator value when you find the second solution.
:::

## Summary

:::summary
- $y = \sin x$ and $y = \cos x$ have period $360^\circ$ and values between $-1$ and $1$; $y = \tan x$ has period $180^\circ$ and asymptotes at $90^\circ$ and $270^\circ$.
- $\sin x = k$: solutions $\alpha$ and $180^\circ - \alpha$.
- $\cos x = k$: solutions $\alpha$ and $360^\circ - \alpha$.
- $\tan x = k$: solutions $\alpha$ and $\alpha + 180^\circ$.
- Rearrange to $\sin x =$, $\cos x =$ or $\tan x =$ first, bring negative calculator answers into range, and check by substitution.
:::
