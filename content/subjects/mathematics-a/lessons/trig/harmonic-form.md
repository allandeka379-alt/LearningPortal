---
{
  "key": "trig.harmonic-form",
  "title": "The harmonic form R sin(θ ± α) and R cos(θ ± α)",
  "summary": "Express a sin θ + b cos θ as a single sine or cosine, find R and α, and use the harmonic form to solve equations such as 3 cos θ + 2 sin θ = 1 and to find maximum and minimum values and where they occur.",
  "concepts": ["amaths.trig.harmonic-form"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

When two waves of the same period are added, the result is another wave of that period. In symbols, any expression $a\sin\theta + b\cos\theta$ can be written as a single sine or cosine curve $R\sin(\theta + \alpha)$, with amplitude $R$ and a shift $\alpha$. Electrical engineers at ZESA use this to combine alternating voltages, and in A-Level mathematics it turns awkward equations into easy ones and answers "what is the greatest value?" in one line.

This is examined in Cambridge 9709 Paper 2 (AS) and Paper 3 (A Level), usually as a two- or three-part question: "express in the form $R\cos(\theta - \alpha)$", then "hence solve" and "hence find the greatest value". ZIMSEC teaches it within trigonometrical identities in Form 5 and examines it the same way.

## Key definitions

:::definition{term="Harmonic form"}
Writing $a\sin\theta + b\cos\theta$ as a single trigonometric function such as $R\sin(\theta + \alpha)$ or $R\cos(\theta - \alpha)$, where $R > 0$ and $\alpha$ is usually acute.
:::

:::formula{name="R and α (derived from the compound-angle formulae)"}
$$
R = \sqrt{a^2 + b^2} \qquad \tan\alpha = \frac{\text{coefficient matched to } R\sin\alpha}{\text{coefficient matched to } R\cos\alpha}
$$
:::

MF19 does not print these results, but it does print the compound-angle formulae they come from. Always derive $R$ and $\alpha$ by expanding and comparing coefficients; it takes three lines and avoids sign errors.

## The method

To express $3\cos\theta + 4\sin\theta$ as $R\cos(\theta - \alpha)$:

1. Expand the target: $R\cos(\theta - \alpha) = R\cos\theta\cos\alpha + R\sin\theta\sin\alpha$.
2. Compare coefficients: $R\cos\alpha = 3$ (coefficient of $\cos\theta$) and $R\sin\alpha = 4$ (coefficient of $\sin\theta$).
3. Square and add: $R^2(\cos^2\alpha + \sin^2\alpha) = 9 + 16$, so $R = 5$.
4. Divide: $\tan\alpha = \frac{4}{3}$, so $\alpha = 53.13^\circ$.

Choose the form so that the signs match and $\alpha$ is acute:

| Expression | Convenient form |
| --- | --- |
| $a\sin\theta + b\cos\theta$ | $R\sin(\theta + \alpha)$ |
| $a\sin\theta - b\cos\theta$ | $R\sin(\theta - \alpha)$ |
| $a\cos\theta + b\sin\theta$ | $R\cos(\theta - \alpha)$ |
| $a\cos\theta - b\sin\theta$ | $R\cos(\theta + \alpha)$ |

(with $a, b > 0$). The question usually tells you which form to use.

:::worked-solution[Example 1: express $3\cos\theta + 4\sin\theta$ in the form $R\cos(\theta - \alpha)$, where $R > 0$ and $0^\circ < \alpha < 90^\circ$]
1. $R\cos(\theta - \alpha) = R\cos\theta\cos\alpha + R\sin\theta\sin\alpha$.
2. Compare: $R\cos\alpha = 3$, $R\sin\alpha = 4$.
3. $R = \sqrt{3^2 + 4^2} = 5$.
4. $\tan\alpha = \frac{4}{3}$, $\alpha = 53.13^\circ$ (2 decimal places).
5. So $3\cos\theta + 4\sin\theta = 5\cos(\theta - 53.13^\circ)$.
:::

Keep $\alpha$ to at least 2 decimal places (or 4 significant figures in radians) when you will use it in a later part, so that final answers are accurate to 1 decimal place.

## Solving equations

Once the expression is a single cosine (or sine), the equation is a standard one: find the compound angle first, then undo the shift. Adjust the interval for the compound angle before solving.

:::worked-solution[Example 2: solve $3\cos\theta + 2\sin\theta = 1$ for $0^\circ \le \theta \le 360^\circ$]
1. Write $3\cos\theta + 2\sin\theta = R\cos(\theta - \alpha)$: $R\cos\alpha = 3$, $R\sin\alpha = 2$.
2. $R = \sqrt{13}$ and $\alpha = \tan^{-1}\frac{2}{3} = 33.69^\circ$.
3. The equation becomes $\sqrt{13}\cos(\theta - 33.69^\circ) = 1$, so $\cos(\theta - 33.69^\circ) = \dfrac{1}{\sqrt{13}}$.
4. The interval for $\theta - 33.69^\circ$ is $-33.69^\circ$ to $326.31^\circ$.
5. $\cos^{-1}\dfrac{1}{\sqrt{13}} = 73.90^\circ$, so $\theta - 33.69^\circ = 73.90^\circ$ or $-73.90^\circ$.
6. $\theta = 107.6^\circ$ or $\theta = -40.21^\circ$, which is outside the interval; adding $360^\circ$ gives $319.8^\circ$.
7. Solutions: $\theta = 107.6^\circ$ and $319.8^\circ$.
:::

![Graph of y = 3 cos t + 2 sin t = sqrt(13) cos(t - 33.69 degrees) for 0 to 360 degrees: a cosine wave of amplitude sqrt(13), about 3.61, with its maximum at 33.69 degrees; the line y = 1 meets it at 107.6 and 319.8 degrees, the two solutions of 3 cos t + 2 sin t = 1.](media:diagrams/harmonic-form-3cos-2sin-equals-1.png "Figure: the wave √13 cos(θ − 33.69°) meets y = 1 at 107.6° and 319.8°")

## Maximum and minimum values

Because $-1 \le \cos(\theta - \alpha) \le 1$, the expression $R\cos(\theta - \alpha)$ lies between $-R$ and $R$. The maximum occurs where the compound angle is $0^\circ$ (or $360^\circ$), the minimum where it is $180^\circ$. The same idea answers questions about reciprocals: a fraction is greatest when its denominator is least (provided the denominator stays positive).

:::worked-solution[Example 3: find the greatest and least values of $5 + 3\cos\theta + 4\sin\theta$ and of $\dfrac{12}{7 + 3\cos\theta + 4\sin\theta}$, and where the first is greatest]
1. From Example 1, $5 + 3\cos\theta + 4\sin\theta = 5 + 5\cos(\theta - 53.13^\circ)$.
2. Greatest value $5 + 5 = 10$, when $\theta - 53.13^\circ = 0^\circ$, i.e. $\theta = 53.1^\circ$.
3. Least value $5 - 5 = 0$, when $\theta - 53.13^\circ = 180^\circ$, i.e. $\theta = 233.1^\circ$.
4. The denominator $7 + 5\cos(\theta - 53.13^\circ)$ lies between $2$ and $12$ (always positive).
5. So $\dfrac{12}{7 + \ldots}$ has greatest value $\dfrac{12}{2} = 6$ and least value $\dfrac{12}{12} = 1$.
:::

## Exact forms in radians

With exact coefficients such as $\sqrt{3}$ and $1$, the angle $\alpha$ is a familiar one.

:::worked-solution[Example 4: express $\sqrt{3}\sin x - \cos x$ as $R\sin(x - \alpha)$ and solve $\sqrt{3}\sin x - \cos x = 1$ for $0 \le x \le 2\pi$]
1. $R\sin(x - \alpha) = R\sin x\cos\alpha - R\cos x\sin\alpha$, so $R\cos\alpha = \sqrt{3}$ and $R\sin\alpha = 1$.
2. $R = \sqrt{3 + 1} = 2$ and $\tan\alpha = \frac{1}{\sqrt{3}}$, so $\alpha = \frac{\pi}{6}$.
3. The equation is $2\sin\left(x - \frac{\pi}{6}\right) = 1$, so $\sin\left(x - \frac{\pi}{6}\right) = \frac{1}{2}$.
4. $x - \frac{\pi}{6}$ lies between $-\frac{\pi}{6}$ and $\frac{11\pi}{6}$: it equals $\frac{\pi}{6}$ or $\frac{5\pi}{6}$.
5. $x = \frac{\pi}{3}$ or $x = \pi$.
:::

## When there are no solutions

Since $a\sin\theta + b\cos\theta$ never exceeds $R = \sqrt{a^2 + b^2}$ in size, the equation $a\sin\theta + b\cos\theta = c$ has solutions only when $|c| \le \sqrt{a^2 + b^2}$. For example $2\sin x + \cos x = 3$ has none, because $\sqrt{5} < 3$.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge examines the harmonic form in Paper 2 (AS only) and Paper 3 (A Level only), with the form and the range of $\alpha$ always stated. ZIMSEC teaches it within trigonometrical identities (Form 5) and expects the same method; questions may ask for the form in radians.
:::

## Common mistakes

:::mistake{title="Swapping the coefficients in tan α"}
With $R\cos\alpha = 3$ and $R\sin\alpha = 4$, $\tan\alpha = \frac{4}{3}$, not $\frac{3}{4}$. Write the two equations before dividing.
:::

:::mistake{title="Rounding α too early"}
Using $\alpha = 53^\circ$ instead of $53.13^\circ$ can move a final answer by $0.1^\circ$ or more.
:::

:::mistake{title="Forgetting to shift the interval"}
Solve for $\theta - \alpha$ over the shifted interval; otherwise a solution near the end of the range is lost.
:::

:::mistake{title="Minimum of a reciprocal"}
The greatest value of $\frac{k}{c + R\cos(\theta - \alpha)}$ comes from the **least** denominator, $c - R$ (when it is positive).
:::

## Exam tips

:::exam-tip
Show the expansion and the two coefficient equations; then $R = \sqrt{a^2 + b^2}$ and $\tan\alpha$ follow. Give $R$ exactly (e.g. $\sqrt{13}$) if it is not an integer.
:::

:::exam-tip
"Hence" questions expect you to use the form you have just found; solving by another method may lose marks.
:::

:::exam-tip
For "state the greatest value and the value of θ at which it occurs", give both, with θ in the requested interval.
:::

## Summary

:::summary
- $a\sin\theta + b\cos\theta = R\sin(\theta + \alpha)$ etc., with $R = \sqrt{a^2 + b^2}$; find $\alpha$ from $\tan\alpha$ after comparing coefficients.
- Solve by finding the compound angle in the shifted interval, then subtracting or adding $\alpha$.
- $R\sin(\theta + \alpha)$ has greatest value $R$ and least value $-R$.
- For a reciprocal, the greatest value uses the least (positive) denominator.
- $a\sin\theta + b\cos\theta = c$ has solutions only if $|c| \le \sqrt{a^2 + b^2}$.
:::
