---
{
  "key": "trig.graphs-exact-values",
  "title": "Trigonometric graphs, exact values and inverse functions",
  "summary": "Sketch and transform the graphs of sine, cosine and tangent in degrees and radians, recall exact values for 30°, 45°, 60° and related angles, use the principal values of sin⁻¹, cos⁻¹ and tan⁻¹, and (ZIMSEC) sketch the inverse trigonometric graphs.",
  "concepts": ["amaths.trig.graphs-exact-values"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Anything that repeats regularly can be modelled with a sine or cosine curve: the height of a seat on a Ferris wheel at an agricultural show, daily temperatures in Bulawayo through the year, the alternating current from the ZESA grid. To use these models you need to know the shapes of the basic graphs, how stretches and translations change them, and the exact values that let you work without a calculator.

This content is in ZIMSEC Pure Mathematics (trigonometrical functions, Form 5) and Cambridge 9709 Paper 1 (topic 1.5). Questions ask you to sketch a transformed graph, state its period, amplitude or range, find constants from a graph, evaluate exact values, and use inverse functions correctly. ZIMSEC also asks you to sketch the graphs of the inverse trigonometric functions.

## Key definitions

:::definition{term="Period"}
The smallest positive length after which a graph repeats: $360^\circ$ ($2\pi$) for $\sin x$ and $\cos x$, $180^\circ$ ($\pi$) for $\tan x$.
:::

:::definition{term="Amplitude"}
For $y = a\sin(kx) + c$ or $y = a\cos(kx) + c$, the amplitude is $|a|$: half the distance between the maximum and minimum values.
:::

:::definition{term="Principal value"}
The single value returned by an inverse function: $\sin^{-1}x \in \left[-\frac{\pi}{2}, \frac{\pi}{2}\right]$, $\cos^{-1}x \in [0, \pi]$, $\tan^{-1}x \in \left(-\frac{\pi}{2}, \frac{\pi}{2}\right)$. These ranges are printed in Cambridge's MF19; the exact values are not.
:::

:::formula{name="Transformations of y = sin x (similarly cos and tan)"}
$$
y = a\sin x: \text{ stretch in } y, \text{ factor } a \qquad y = \sin kx: \text{ stretch in } x, \text{ factor } \tfrac{1}{k}, \text{ period } \tfrac{360^\circ}{k}
$$

$$
y = \sin(x + b): \text{ translation } \begin{pmatrix} -b \\ 0 \end{pmatrix} \qquad y = \sin x + c: \text{ translation } \begin{pmatrix} 0 \\ c \end{pmatrix}
$$
:::

## The three basic graphs

- $y = \sin x$ starts at the origin, rises to a maximum of 1 at $90^\circ$ ($\frac{\pi}{2}$), returns to 0 at $180^\circ$, reaches $-1$ at $270^\circ$ and is back to 0 at $360^\circ$.
- $y = \cos x$ has the same shape shifted left by $90^\circ$: it starts at its maximum $(0, 1)$, crosses the axis at $90^\circ$ and $270^\circ$, with a minimum of $-1$ at $180^\circ$.
- $y = \tan x$ passes through the origin, increases through every value, and has vertical asymptotes at $x = \pm 90^\circ, 270^\circ, \ldots$ ($x = \frac{\pi}{2} + n\pi$). Its period is $180^\circ$.

The symmetries of these graphs give the related-angle rules: $\sin(180^\circ - x) = \sin x$, $\cos(360^\circ - x) = \cos x$, $\tan(180^\circ + x) = \tan x$. The CAST diagram summarises which ratios are positive in each quadrant.

## Exact values

| $\theta$ | $0$ | $\frac{\pi}{6}$ ($30^\circ$) | $\frac{\pi}{4}$ ($45^\circ$) | $\frac{\pi}{3}$ ($60^\circ$) | $\frac{\pi}{2}$ ($90^\circ$) |
| --- | --- | --- | --- | --- | --- |
| $\sin\theta$ | $0$ | $\frac{1}{2}$ | $\frac{\sqrt{2}}{2}$ | $\frac{\sqrt{3}}{2}$ | $1$ |
| $\cos\theta$ | $1$ | $\frac{\sqrt{3}}{2}$ | $\frac{\sqrt{2}}{2}$ | $\frac{1}{2}$ | $0$ |
| $\tan\theta$ | $0$ | $\frac{1}{\sqrt{3}}$ | $1$ | $\sqrt{3}$ | undefined |

These come from an equilateral triangle of side 2 cut in half (for $30^\circ$ and $60^\circ$) and an isosceles right-angled triangle with shorter sides 1 (for $45^\circ$). Related angles inherit the size; the quadrant decides the sign.

:::worked-solution[Example 1: find the exact values of $\sin 240^\circ$, $\cos\frac{7\pi}{4}$ and $\tan\frac{5\pi}{6}$]
1. $240^\circ = 180^\circ + 60^\circ$ is in the third quadrant, where sine is negative: $\sin 240^\circ = -\sin 60^\circ = -\dfrac{\sqrt{3}}{2}$.
2. $\frac{7\pi}{4} = 2\pi - \frac{\pi}{4}$ is in the fourth quadrant, where cosine is positive: $\cos\frac{7\pi}{4} = \cos\frac{\pi}{4} = \dfrac{\sqrt{2}}{2}$.
3. $\frac{5\pi}{6} = \pi - \frac{\pi}{6}$ is in the second quadrant, where tangent is negative: $\tan\frac{5\pi}{6} = -\dfrac{1}{\sqrt{3}}$.
:::

## Transformed graphs

To sketch a transformed graph, find the period and the amplitude, then plot the key points: maxima, minima and axis crossings.

:::worked-solution[Example 2: describe the graph of $y = 3\sin 2x$ for $0 \le x \le 2\pi$]
1. Amplitude $3$: the graph lies between $y = -3$ and $y = 3$.
2. Period $\dfrac{2\pi}{2} = \pi$: two complete cycles in the interval.
3. Maxima $(3)$ where $2x = \frac{\pi}{2}, \frac{5\pi}{2}$: at $x = \frac{\pi}{4}$ and $\frac{5\pi}{4}$.
4. Minima $(-3)$ at $x = \frac{3\pi}{4}$ and $\frac{7\pi}{4}$.
5. It crosses the $x$-axis at $x = 0, \frac{\pi}{2}, \pi, \frac{3\pi}{2}, 2\pi$.
:::

:::worked-solution[Example 3: describe the graph of $y = 1 - 2\cos x$ for $0 \le x \le 2\pi$]
1. Start with $y = \cos x$, stretch by factor 2 and reflect in the $x$-axis ($-2\cos x$), then translate up by 1.
2. At $x = 0$: $y = 1 - 2 = -1$ (a minimum). At $x = \pi$: $y = 1 + 2 = 3$ (a maximum).
3. Range: $-1 \le y \le 3$.
4. It crosses the $x$-axis where $\cos x = \frac{1}{2}$: $x = \frac{\pi}{3}$ and $x = \frac{5\pi}{3}$.
:::

:::worked-solution[Example 4: the graph of $y = a + b\sin x$ ($b > 0$) has maximum value 7 and minimum value $-1$. Find $a$ and $b$]
1. The maximum is $a + b = 7$ and the minimum is $a - b = -1$.
2. Adding: $2a = 6$, so $a = 3$. Subtracting: $2b = 8$, so $b = 4$.
3. So $y = 3 + 4\sin x$: the centre line is $y = 3$ and the amplitude is 4.
:::

The number of solutions of an equation such as $\sin 2x = 0.3$ is the number of times the line $y = 0.3$ crosses the graph. For $0^\circ \le x \le 360^\circ$, $y = \sin 2x$ has two cycles, each crossing $y = 0.3$ twice, so there are 4 solutions ($8.7^\circ$, $81.3^\circ$, $188.7^\circ$, $261.3^\circ$).

## Inverse trigonometric functions

Because $\sin x = 0.5$ has infinitely many solutions, $\sin^{-1}$ can only be a function if its range is restricted. The **principal value** ranges are chosen so that each inverse covers every possible output once.

:::worked-solution[Example 5: find $\sin^{-1}\left(-\frac{1}{2}\right)$, $\cos^{-1}\left(-\frac{1}{2}\right)$, $\tan^{-1}(-\sqrt{3})$ and $\cos\left(\sin^{-1}\frac{3}{5}\right)$]
1. $\sin^{-1}\left(-\frac{1}{2}\right) = -\frac{\pi}{6}$ (in $\left[-\frac{\pi}{2}, \frac{\pi}{2}\right]$).
2. $\cos^{-1}\left(-\frac{1}{2}\right) = \frac{2\pi}{3}$ (in $[0, \pi]$; not $-\frac{\pi}{3}$).
3. $\tan^{-1}(-\sqrt{3}) = -\frac{\pi}{3}$.
4. Let $\alpha = \sin^{-1}\frac{3}{5}$, an acute angle with opposite 3 and hypotenuse 5. The adjacent side is 4, so $\cos\alpha = \frac{4}{5}$.
:::

**Graphs of the inverses (ZIMSEC).** Each inverse graph is the reflection of the restricted original in the line $y = x$:

- $y = \sin^{-1}x$: domain $-1 \le x \le 1$, range $-\frac{\pi}{2} \le y \le \frac{\pi}{2}$, increasing, through the origin, endpoints $\left(-1, -\frac{\pi}{2}\right)$ and $\left(1, \frac{\pi}{2}\right)$.
- $y = \cos^{-1}x$: domain $-1 \le x \le 1$, range $0 \le y \le \pi$, decreasing from $(-1, \pi)$ through $\left(0, \frac{\pi}{2}\right)$ to $(1, 0)$.
- $y = \tan^{-1}x$: domain all real $x$, range $-\frac{\pi}{2} < y < \frac{\pi}{2}$, increasing through the origin, with horizontal asymptotes $y = \pm\frac{\pi}{2}$.

Transformations work as before: $y = 2\sin^{-1}(x - 1)$ has domain $0 \le x \le 2$ and range $-\pi \le y \le \pi$.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine the graphs, transformations, exact values and principal values. Sketching and transforming the graphs of $\sin^{-1}x$, $\cos^{-1}x$ and $\tan^{-1}x$ is ZIMSEC only. Cambridge Paper 1 often asks for exact values without a calculator.
:::

## Common mistakes

:::mistake{title="Wrong period for a stretch"}
$y = \sin 3x$ has period $\frac{360^\circ}{3} = 120^\circ$, not $3 \times 360^\circ$. Multiplying $x$ squeezes the graph.
:::

:::mistake{title="Translating the wrong way"}
$y = \cos\left(x - \frac{\pi}{4}\right)$ is $y = \cos x$ moved $\frac{\pi}{4}$ to the **right**.
:::

:::mistake{title="Principal value outside the range"}
$\cos^{-1}(-0.5)$ is $\frac{2\pi}{3}$, not $-\frac{\pi}{3}$; cosine's principal values lie between 0 and $\pi$.
:::

:::mistake{title="Confusing sin⁻¹x with 1/sin x"}
$\sin^{-1}x$ is the inverse function; $\dfrac{1}{\sin x} = \operatorname{cosec} x$.
:::

## Exam tips

:::exam-tip
When asked to sketch, label the axis intercepts, the maximum and minimum points and any asymptotes, and show the full stated interval.
:::

:::exam-tip
"Exact value" means surds and fractions, never decimals: $\frac{\sqrt{3}}{2}$, not $0.866$.
:::

:::exam-tip
To find constants from a graph, use the maximum and minimum to get the centre line and amplitude, and the period to get $k$.
:::

## Summary

:::summary
- $\sin x$ and $\cos x$ have period $360^\circ$ ($2\pi$) and range $[-1, 1]$; $\tan x$ has period $180^\circ$ ($\pi$) and asymptotes at $x = 90^\circ + 180^\circ n$.
- $y = a\sin(kx + b) + c$: amplitude $|a|$, period $\frac{360^\circ}{k}$, centre line $y = c$.
- Learn the exact values for $30^\circ$, $45^\circ$, $60^\circ$ and use quadrant signs for related angles.
- Principal values: $\sin^{-1}$ in $\left[-\frac{\pi}{2}, \frac{\pi}{2}\right]$, $\cos^{-1}$ in $[0, \pi]$, $\tan^{-1}$ in $\left(-\frac{\pi}{2}, \frac{\pi}{2}\right)$.
- ZIMSEC: the inverse graphs are reflections of the restricted graphs in $y = x$.
:::
