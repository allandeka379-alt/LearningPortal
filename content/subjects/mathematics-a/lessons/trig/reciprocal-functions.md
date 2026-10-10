---
{
  "key": "trig.reciprocal-functions",
  "title": "Secant, cosecant and cotangent",
  "summary": "Define sec, cosec and cot, describe their graphs, evaluate them exactly and with a calculator, and use the identities sec²θ ≡ 1 + tan²θ and cosec²θ ≡ 1 + cot²θ to prove results and solve equations such as tan θ + cot θ = 4.",
  "concepts": ["amaths.trig.reciprocal-functions"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

The three reciprocal functions secant, cosecant and cotangent add no new information (each is one over a familiar ratio), but they make many expressions and identities much shorter. They appear constantly in calculus: the derivative of $\tan x$ is $\sec^2 x$, and integrals often need $\sec^2 x$ or $\operatorname{cosec}^2 x$.

This topic is ZIMSEC Pure Mathematics (trigonometrical functions, Form 5) and Cambridge 9709 Paper 2 (AS) and Paper 3 (A Level), topics 2.3 and 3.3. Typical questions: prove an identity involving sec and tan, solve a quadratic equation in $\tan\theta$ after using $\sec^2\theta = 1 + \tan^2\theta$, and sketch or describe the graphs.

## Key definitions

:::definition{term="Secant, cosecant, cotangent"}
$$
\sec\theta = \frac{1}{\cos\theta} \qquad \operatorname{cosec}\theta = \frac{1}{\sin\theta} \qquad \cot\theta = \frac{1}{\tan\theta} = \frac{\cos\theta}{\sin\theta}
$$

Each is undefined where the denominator is zero.
:::

:::formula{name="Pythagorean identities (in MF19; ZIMSEC prints no list)"}
$$
\sec^2\theta \equiv 1 + \tan^2\theta \qquad \operatorname{cosec}^2\theta \equiv 1 + \cot^2\theta
$$
:::

A useful way to remember the pairing: the third letter of each reciprocal tells you the function it inverts. **Se**c goes with **c**os, **co**sec with **s**in, **co**t with **t**an.

## Where the new identities come from

Divide $\sin^2\theta + \cos^2\theta \equiv 1$ by $\cos^2\theta$:

$$
\frac{\sin^2\theta}{\cos^2\theta} + 1 \equiv \frac{1}{\cos^2\theta} \quad\Rightarrow\quad \tan^2\theta + 1 \equiv \sec^2\theta
$$

Divide it by $\sin^2\theta$ instead to get $1 + \cot^2\theta \equiv \operatorname{cosec}^2\theta$. MF19 prints both identities for Cambridge candidates; ZIMSEC candidates must remember them, and this two-line derivation recovers them.

## Exact values and calculator values

Find the cosine, sine or tangent first, then take the reciprocal. Calculators have no sec, cosec or cot keys: use $1 \div \cos$, and so on.

:::worked-solution[Example 1: find the exact values of $\sec\frac{\pi}{3}$, $\operatorname{cosec}225^\circ$ and $\cot\frac{5\pi}{6}$]
1. $\cos\frac{\pi}{3} = \frac{1}{2}$, so $\sec\frac{\pi}{3} = 2$.
2. $\sin 225^\circ = -\sin 45^\circ = -\frac{1}{\sqrt{2}}$, so $\operatorname{cosec}225^\circ = -\sqrt{2}$.
3. $\tan\frac{5\pi}{6} = -\frac{1}{\sqrt{3}}$, so $\cot\frac{5\pi}{6} = -\sqrt{3}$.
:::

## The graphs

Every graph of a reciprocal function can be drawn from the original: where the original is 0 the reciprocal has a vertical asymptote; where the original is $\pm 1$ the reciprocal is also $\pm 1$; where the original is small the reciprocal is large.

- $y = \sec x$: period $360^\circ$; asymptotes at $x = 90^\circ, 270^\circ, \ldots$ (where $\cos x = 0$); U-shaped branches with minimum points $(0^\circ, 1)$ and $(360^\circ, 1)$ and an upside-down branch with maximum point $(180^\circ, -1)$. Range $y \le -1$ or $y \ge 1$.
- $y = \operatorname{cosec}x$: period $360^\circ$; asymptotes at $x = 0^\circ, 180^\circ, 360^\circ, \ldots$; minimum point $(90^\circ, 1)$ and maximum point $(270^\circ, -1)$. Same range as $\sec x$.
- $y = \cot x$: period $180^\circ$; asymptotes at $x = 0^\circ, 180^\circ, 360^\circ, \ldots$; crosses the axis at $90^\circ, 270^\circ$; decreasing on each branch.

The range tells you at once that equations such as $\sec x = 0.5$ have no solutions.

## Proving identities

The same strategy as before works: write everything in terms of $\sin$ and $\cos$, or use the new Pythagorean identities directly.

:::worked-solution[Example 2: prove that $\sec\theta - \cos\theta \equiv \sin\theta\tan\theta$]
1. $\text{LHS} = \dfrac{1}{\cos\theta} - \cos\theta = \dfrac{1 - \cos^2\theta}{\cos\theta}$.
2. Use $1 - \cos^2\theta = \sin^2\theta$: $\text{LHS} = \dfrac{\sin^2\theta}{\cos\theta}$.
3. Split: $\sin\theta \times \dfrac{\sin\theta}{\cos\theta} = \sin\theta\tan\theta = \text{RHS}$.
:::

## Solving equations

The commonest exam pattern is an equation containing $\sec^2\theta$ and $\tan\theta$ (or $\operatorname{cosec}^2\theta$ and $\cot\theta$). Replace the squared reciprocal using its identity, collect terms and solve a quadratic in $\tan\theta$ (or $\cot\theta$).

:::worked-solution[Example 3: solve $2\sec^2\theta - \tan\theta = 5$ for $0^\circ \le \theta \le 360^\circ$]
1. Replace $\sec^2\theta$: $2(1 + \tan^2\theta) - \tan\theta = 5$.
2. Rearrange: $2\tan^2\theta - \tan\theta - 3 = 0$.
3. Factorise: $(2\tan\theta - 3)(\tan\theta + 1) = 0$.
4. $\tan\theta = 1.5$: $\theta = 56.3^\circ$ or $56.3^\circ + 180^\circ = 236.3^\circ$.
5. $\tan\theta = -1$: $\theta = 135^\circ$ or $315^\circ$.
6. In order: $\theta = 56.3^\circ, 135^\circ, 236.3^\circ, 315^\circ$.
:::

:::worked-solution[Example 4: solve $\tan\theta + \cot\theta = 4$ for $0^\circ < \theta < 180^\circ$]
1. Write $\cot\theta = \dfrac{1}{\tan\theta}$ and multiply by $\tan\theta$: $\tan^2\theta + 1 = 4\tan\theta$.
2. So $\tan^2\theta - 4\tan\theta + 1 = 0$, and by the quadratic formula $\tan\theta = \dfrac{4 \pm \sqrt{12}}{2} = 2 \pm \sqrt{3}$.
3. $\tan\theta = 2 + \sqrt{3}$ gives $\theta = 75^\circ$; $\tan\theta = 2 - \sqrt{3}$ gives $\theta = 15^\circ$.
4. Both tangents are positive, and in $0^\circ < \theta < 180^\circ$ tangent is positive only in the first quadrant, so $\theta = 15^\circ$ or $75^\circ$.
:::

## Using one ratio to find another

When one ratio and the quadrant are given, use a Pythagorean identity (or a right-angled triangle) for the size and the quadrant for the sign.

:::worked-solution[Example 5: given that $\sec\theta = -3$ and $90^\circ < \theta < 180^\circ$, find the exact value of $\tan\theta$]
1. $\tan^2\theta = \sec^2\theta - 1 = 9 - 1 = 8$, so $\tan\theta = \pm 2\sqrt{2}$.
2. In the second quadrant tangent is negative: $\tan\theta = -2\sqrt{2}$.
3. Check: $\cos\theta = -\frac{1}{3}$ fits the second quadrant.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC examines this at Form 5 with the other trigonometrical functions. Cambridge examines it in Paper 2 (AS only) and Paper 3 (A Level only); the notation is $\operatorname{cosec}$, never csc, in both. Cambridge prints both Pythagorean identities in MF19; ZIMSEC prints no formula list, so be ready to derive them.
:::

## Common mistakes

:::mistake{title="Pairing the wrong functions"}
$\sec\theta$ is $\frac{1}{\cos\theta}$, not $\frac{1}{\sin\theta}$. Use the third-letter rule.
:::

:::mistake{title="Wrong sign in the identity"}
$\sec^2\theta = 1 + \tan^2\theta$, so $\tan^2\theta = \sec^2\theta - 1$, not $1 - \sec^2\theta$.
:::

:::mistake{title="Using sec⁻¹ on the calculator"}
To solve $\sec x = 2.5$, write $\cos x = 0.4$ and use $\cos^{-1}$. The $\cos^{-1}$ key is not "sec".
:::

:::mistake{title="Forgetting impossible values"}
$\operatorname{cosec}x = 0.5$ means $\sin x = 2$: no solutions.
:::

## Exam tips

:::exam-tip
In "show that" questions, write the identity you use ("using $\sec^2\theta = 1 + \tan^2\theta$") so the examiner can award the method mark.
:::

:::exam-tip
Solving a quadratic in $\tan\theta$ gives up to four solutions in $0^\circ$ to $360^\circ$; list them in order and give each to 1 decimal place.
:::

:::exam-tip
Multiplying through by $\tan\theta$ or $\sin\theta$ is safe only where it is non-zero; check that no solution makes a term in the original equation undefined.
:::

## Summary

:::summary
- $\sec\theta = \frac{1}{\cos\theta}$, $\operatorname{cosec}\theta = \frac{1}{\sin\theta}$, $\cot\theta = \frac{1}{\tan\theta}$.
- $\sec^2\theta \equiv 1 + \tan^2\theta$ and $\operatorname{cosec}^2\theta \equiv 1 + \cot^2\theta$ (divide $\sin^2 + \cos^2 = 1$ by $\cos^2$ or $\sin^2$).
- $\sec$ and $\operatorname{cosec}$ have range $|y| \ge 1$ and period $360^\circ$; $\cot$ has period $180^\circ$; asymptotes where the original function is zero.
- Equations with $\sec^2$ and $\tan$ become quadratics in $\tan\theta$.
- Use the quadrant for the sign when finding one ratio from another.
:::
