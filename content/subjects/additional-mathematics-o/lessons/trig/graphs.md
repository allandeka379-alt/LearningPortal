---
{
  "key": "trig.graphs",
  "title": "Graphs of trigonometric functions",
  "summary": "Describe the graphs of sine, cosine and tangent in degrees and radians, find the amplitude, period, maximum and minimum of y = a sin bx + c, y = a cos bx + c and y = a tan bx + c, locate intercepts and asymptotes, find a, b and c from a graph, and count the solutions of an equation from intersections.",
  "concepts": ["amath.trig.graphs"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Trigonometric graphs model anything that repeats: the depth of water at the Kariba dam wall over a year, the height of a seat on a turning wheel, the voltage of the mains supply. In the examination you are asked to **sketch** curves such as $y = 3\sin 2x + 1$, to read the constants of a curve from its maximum, minimum and period, and to use a sketch to say **how many solutions** an equation has.

A sketch must show the correct shape, the maximum and minimum values, the intercepts with the axes and, for tangent curves, the asymptotes. Because we cannot draw here, every graph in this lesson is described precisely and backed by a table of values: practise drawing each one yourself on paper.

## Key definitions

:::definition{term="Periodic function"}
A function whose values repeat at regular intervals. The **period** is the length of the shortest interval after which the graph repeats.
:::

:::definition{term="Amplitude"}
For a sine or cosine curve, half the distance between the maximum and minimum values: $\text{amplitude} = \dfrac{\max - \min}{2}$. A tangent curve has no amplitude because it has no maximum or minimum.
:::

:::definition{term="Asymptote"}
A line that a curve approaches more and more closely without meeting it. The graph of $y = \tan x$ has vertical asymptotes where $\cos x = 0$: $x = 90°, 270°, \ldots$ (or $\frac{\pi}{2}, \frac{3\pi}{2}, \ldots$).
:::

:::formula{name="Properties of the transformed curves (not in the List of formulas)"}
For $a > 0$:

$$
y = a\sin bx + c \text{ and } y = a\cos bx + c: \quad \text{amplitude } a, \quad \text{period } \frac{360°}{b} = \frac{2\pi}{b}, \quad \max = c + a, \quad \min = c - a
$$

$$
y = a\tan bx + c: \quad \text{period } \frac{180°}{b} = \frac{\pi}{b}
$$
:::

## The three basic graphs

- $y = \sin x$ starts at the origin, rises to a maximum of 1 at $x = 90°$, returns to 0 at $180°$, falls to $-1$ at $270°$ and is back to 0 at $360°$. Period $360°$ ($2\pi$), amplitude 1.
- $y = \cos x$ has the same wave shape shifted: it starts at its maximum $(0, 1)$, crosses the $x$-axis at $90°$, reaches $-1$ at $180°$, crosses again at $270°$ and returns to 1 at $360°$.
- $y = \tan x$ passes through the origin, increases steeply towards $+\infty$ as $x$ approaches $90°$, reappears from $-\infty$ just after $90°$, crosses the $x$-axis at $180°$ and approaches the next asymptote $x = 270°$. Period $180°$ ($\pi$); it takes every real value.

## The effect of a, b and c

In $y = a\sin bx + c$:

- $a$ **stretches the curve vertically**: the wave goes $a$ units above and below its centre line. If $a$ is negative the curve is also reflected in the centre line.
- $b$ **squeezes the curve horizontally**: there are $b$ complete waves in $360°$, so the period is $\frac{360°}{b}$. A fraction such as $b = \frac{1}{2}$ stretches the curve, doubling the period.
- $c$ **moves the curve up**: the centre line becomes $y = c$.

The same rules hold for cosine. For tangent, $a$ stretches vertically, the period is $\frac{180°}{b}$, $c$ moves the curve up, and the asymptotes are where $bx = 90°, 270°, \ldots$

:::worked-solution[Example 1: describe the graph of $y = 3\sin 2x + 1$ for $0° \leq x \leq 360°$]
1. Amplitude $a = 3$; period $\frac{360°}{2} = 180°$, so there are two complete waves.
2. Centre line $y = 1$; maximum $1 + 3 = 4$; minimum $1 - 3 = -2$.
3. Maximum where $2x = 90°, 450°$: at $x = 45°$ and $x = 225°$. Minimum where $2x = 270°, 630°$: at $x = 135°$ and $x = 315°$.
4. $y$-intercept: $x = 0$ gives $y = 1$, the point $(0, 1)$.
5. The curve crosses the $x$-axis four times (where $\sin 2x = -\frac{1}{3}$), near $x = 99.7°$, $170.3°$, $279.7°$ and $350.3°$.
6. Table of values:

| $x$ | $0°$ | $45°$ | $90°$ | $135°$ | $180°$ | $225°$ | $270°$ | $315°$ | $360°$ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $y$ | 1 | 4 | 1 | $-2$ | 1 | 4 | 1 | $-2$ | 1 |
:::

:::worked-solution[Example 2: describe the graph of $y = 2\cos\dfrac{x}{2} - 1$ for $0 \leq x \leq 2\pi$]
1. $a = 2$, $b = \frac{1}{2}$, $c = -1$. Period $\frac{2\pi}{1/2} = 4\pi$, so only **half** a wave fits in $0$ to $2\pi$.
2. At $x = 0$: $y = 2(1) - 1 = 1$, the maximum. At $x = \pi$: $y = 2\cos\frac{\pi}{2} - 1 = -1$. At $x = 2\pi$: $y = 2\cos\pi - 1 = -3$, the minimum.
3. The curve decreases throughout the interval, from $(0, 1)$ to $(2\pi, -3)$.
4. $x$-intercept: $\cos\frac{x}{2} = \frac{1}{2}$ gives $\frac{x}{2} = \frac{\pi}{3}$, so $x = \frac{2\pi}{3}$.
:::

:::worked-solution[Example 3: describe the graph of $y = \tan 3x$ for $0° \leq x \leq 180°$]
1. Period $\frac{180°}{3} = 60°$, so the interval holds three branches.
2. Asymptotes where $3x = 90°, 270°, 450°$: the lines $x = 30°$, $x = 90°$ and $x = 150°$.
3. $x$-intercepts where $3x = 0°, 180°, 360°, 540°$: at $x = 0°, 60°, 120°, 180°$.
4. Each branch rises from left to right, passing through an intercept midway between two asymptotes.
:::

## Finding a, b and c from a graph

Read the maximum and minimum to get $a$ and $c$, and the period to get $b$:

$$
a = \frac{\max - \min}{2}, \qquad c = \frac{\max + \min}{2}, \qquad b = \frac{360°}{\text{period}}
$$

Then decide between sine and cosine from where the curve starts: a sine curve starts on its centre line going up, a cosine curve starts at its maximum.

:::worked-solution[Example 4: a curve $y = a\cos bx + c$ has a maximum at $(0, 5)$, next reaches its minimum $-1$ at $x = 60°$ and repeats every $120°$. Find $a$, $b$ and $c$]
1. $a = \frac{5 - (-1)}{2} = 3$.
2. $c = \frac{5 + (-1)}{2} = 2$.
3. Period $120°$: $b = \frac{360°}{120°} = 3$.
4. So $y = 3\cos 3x + 2$. Check: $x = 60°$ gives $3\cos 180° + 2 = -1$. ✓
:::

## Counting solutions with a sketch

The solutions of $f(x) = g(x)$ are the $x$-coordinates of the points where $y = f(x)$ and $y = g(x)$ meet. Sketch both on the same axes and **count the intersections** in the given interval.

:::worked-solution[Example 5: how many solutions has $3\sin 2x + 1 = 2$ for $0° \leq x \leq 360°$?]
1. Use the curve of Example 1, which goes between $-2$ and 4 twice.
2. The horizontal line $y = 2$ lies strictly between the minimum and maximum, so it crosses each of the two waves twice.
3. There are **4** solutions. (The line $y = 4$ would only touch the two maxima: 2 solutions; $y = 5$ would give none.)
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC asks you to sketch the graphs of trigonometric functions; Cambridge 0606 adds the general forms $a\sin bx + c$, $a\cos bx + c$ and $a\tan bx + c$, with $a$ a positive integer, $b$ a simple fraction or integer and $c$ an integer, and expects the amplitude, period, maximum, minimum and asymptotes to be labelled. Both use degrees and radians.
:::

## Common mistakes

:::mistake{title="Taking the period as 360b"}
The period of $\sin bx$ is $\frac{360°}{b}$, not $360b°$. A larger $b$ means **more** waves and a **shorter** period.
:::

:::mistake{title="Forgetting c in the maximum and minimum"}
For $y = 3\sin 2x + 1$ the maximum is $3 + 1 = 4$, not 3.
:::

:::mistake{title="Using 360° for the period of tan"}
$\tan x$ repeats every $180°$, so $\tan bx$ has period $\frac{180°}{b}$.
:::

:::mistake{title="Drawing tangent through its asymptotes"}
The curve never meets an asymptote. Draw the asymptotes as dashed lines and make each branch approach them.
:::

## Exam tips

:::exam-tip
In a **sketch** question, label the maximum and minimum values on the $y$-axis, the end points of the interval, the intercepts and the asymptotes (with their equations). Marks are given for each correct feature, not for neatness.
:::

:::exam-tip
Check the units of the interval: $0 \leq x \leq 2\pi$ means radians, so the period of $\cos\frac{x}{2}$ is $4\pi$, not $720°$.
:::

:::exam-tip
"Hence state the number of solutions" means use your sketch: count intersections, do not solve.
:::

## Summary

:::summary
- $\sin x$ and $\cos x$: period $360°$ ($2\pi$), between $-1$ and 1; $\tan x$: period $180°$ ($\pi$), asymptotes at $x = 90° + 180°n$.
- $y = a\sin bx + c$ and $y = a\cos bx + c$: amplitude $a$, period $\frac{360°}{b}$, maximum $c + a$, minimum $c - a$.
- $y = a\tan bx + c$: period $\frac{180°}{b}$; asymptotes where $bx = 90°, 270°, \ldots$
- From a graph: $a = \frac{\max - \min}{2}$, $c = \frac{\max + \min}{2}$, $b = \frac{360°}{\text{period}}$.
- The number of solutions of $f(x) = g(x)$ is the number of intersections of the two graphs.
:::
