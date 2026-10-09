---
{
  "key": "trig.equations-identities",
  "title": "Trigonometric equations using identities",
  "summary": "Solve trigonometric equations that need an identity first, such as 2 sin²x − cos x − 1 = 0, 2 sec²θ + tan θ − 3 = 0 and 4 cot θ = tan θ: choose the identity that leaves one function, solve the resulting quadratic, reject impossible values and find every solution in the interval.",
  "concepts": ["amath.trig.equations-identities"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Many examination equations contain **two different** trigonometric functions, for example $\sin^2 x$ and $\cos x$, or $\sec^2\theta$ and $\tan\theta$. You cannot solve them directly. The plan is always the same: use an identity to rewrite the equation in terms of **one** function, solve the resulting algebraic equation (usually a quadratic), and then solve the simple trigonometric equations that remain.

This combines the two previous lessons, identities and basic equations, and it is one of the most common longer questions on both boards, often worth 5 or 6 marks and often set as "show that the equation can be written as … hence solve …".

## Key definitions

:::definition{term="Quadratic in a trigonometric function"}
An equation of the form $a s^2 + b s + c = 0$ where $s$ stands for one function such as $\sin x$, $\cos x$ or $\tan x$. Solve it for $s$ like any quadratic, then solve $\sin x = s_1$, $\sin x = s_2$.
:::

:::definition{term="Impossible value"}
A value of the function that no angle can give: $\sin x$ and $\cos x$ lie between $-1$ and $1$; $\sec x$ and $\operatorname{cosec} x$ are never strictly between $-1$ and $1$. Such roots of the quadratic are **rejected** with a reason.
:::

:::formula{name="Identities used to change function (Pythagorean ones in Cambridge's List of formulas)"}
$$
\sin^2 x = 1 - \cos^2 x, \qquad \cos^2 x = 1 - \sin^2 x
$$

$$
\sec^2 x = 1 + \tan^2 x, \qquad \operatorname{cosec}^2 x = 1 + \cot^2 x
$$

$$
\tan x = \frac{\sin x}{\cos x}, \qquad \cot x = \frac{1}{\tan x}
$$
:::

## Choosing the identity

Look at the function that appears **unsquared** (to the first power). That is the function to keep; replace the squared function by an expression in it.

| The equation contains | Keep | Replace using |
| --- | --- | --- |
| $\sin^2 x$ and $\cos x$ | $\cos x$ | $\sin^2 x = 1 - \cos^2 x$ |
| $\cos^2 x$ and $\sin x$ | $\sin x$ | $\cos^2 x = 1 - \sin^2 x$ |
| $\sec^2 x$ and $\tan x$ | $\tan x$ | $\sec^2 x = 1 + \tan^2 x$ |
| $\cot^2 x$ and $\operatorname{cosec} x$ | $\operatorname{cosec} x$ | $\cot^2 x = \operatorname{cosec}^2 x - 1$ |
| $\cot x$ and $\tan x$ | $\tan x$ | $\cot x = \frac{1}{\tan x}$, then multiply by $\tan x$ |

## The method

1. Use the identity so that only one function remains.
2. Collect all terms on one side and arrange as a quadratic $as^2 + bs + c = 0$.
3. Factorise (or use the quadratic formula) to find the values of $s$.
4. Reject any impossible values, saying why.
5. Solve each remaining simple equation in the interval, using the principal value and symmetry.
6. Collect all solutions in order and check the number against a quick sketch.

:::worked-solution[Example 1: solve $2\sin^2 x - \cos x - 1 = 0$ for $0° \leq x \leq 360°$]
1. $\cos x$ appears unsquared, so replace $\sin^2 x = 1 - \cos^2 x$: $2(1 - \cos^2 x) - \cos x - 1 = 0$.
2. $2 - 2\cos^2 x - \cos x - 1 = 0$, so $2\cos^2 x + \cos x - 1 = 0$.
3. Factorise: $(2\cos x - 1)(\cos x + 1) = 0$, so $\cos x = \frac{1}{2}$ or $\cos x = -1$.
4. $\cos x = \frac{1}{2}$: $x = 60°$ or $360° - 60° = 300°$. $\cos x = -1$: $x = 180°$.
5. $x = 60°, 180°, 300°$.
:::

:::worked-solution[Example 2: solve $2\sec^2\theta + \tan\theta - 3 = 0$ for $0° \leq \theta \leq 360°$, giving answers to 1 decimal place]
1. Replace $\sec^2\theta = 1 + \tan^2\theta$: $2 + 2\tan^2\theta + \tan\theta - 3 = 0$.
2. $2\tan^2\theta + \tan\theta - 1 = 0$, so $(2\tan\theta - 1)(\tan\theta + 1) = 0$.
3. $\tan\theta = \frac{1}{2}$: $\theta = 26.57°$ or $26.57° + 180° = 206.57°$.
4. $\tan\theta = -1$: related angle $45°$, tangent negative in the second and fourth quadrants: $\theta = 135°$ or $315°$.
5. $\theta = 26.6°, 135°, 206.6°, 315°$.
:::

:::worked-solution[Example 3: solve $4\cot\theta = \tan\theta$ for $0° < \theta < 360°$]
1. $\frac{4}{\tan\theta} = \tan\theta$. Multiply by $\tan\theta$ (it cannot be zero here, since $\cot\theta$ must exist): $\tan^2\theta = 4$.
2. $\tan\theta = 2$ or $\tan\theta = -2$: **both** square roots.
3. $\tan\theta = 2$: $\theta = 63.4°$ or $243.4°$.
4. $\tan\theta = -2$: related angle $63.43°$, so $\theta = 180° - 63.43° = 116.6°$ or $360° - 63.43° = 296.6°$.
5. $\theta = 63.4°, 116.6°, 243.4°, 296.6°$.
:::

## Rejecting impossible values

A quadratic often gives one value that no angle can produce. Say so explicitly: "$\sin x = -2$ has no solutions since $-1 \leq \sin x \leq 1$". Examiners give the final accuracy mark only when the impossible value has been dealt with.

:::worked-solution[Example 4: solve $2\cos^2 x = 3\sin x$ for $0 \leq x \leq 2\pi$]
1. $\sin x$ is unsquared: $2(1 - \sin^2 x) = 3\sin x$.
2. $2\sin^2 x + 3\sin x - 2 = 0$, so $(2\sin x - 1)(\sin x + 2) = 0$.
3. $\sin x = -2$ is impossible because $-1 \leq \sin x \leq 1$: reject it.
4. $\sin x = \frac{1}{2}$: $x = \frac{\pi}{6}$ or $\pi - \frac{\pi}{6} = \frac{5\pi}{6}$.
:::

:::worked-solution[Example 5 (exam style): show that $\cot^2\theta = 3\operatorname{cosec}\theta - 3$ can be written as $\operatorname{cosec}^2\theta - 3\operatorname{cosec}\theta + 2 = 0$, and hence solve it for $0° < \theta < 360°$]
1. $\cot^2\theta = \operatorname{cosec}^2\theta - 1$, so $\operatorname{cosec}^2\theta - 1 = 3\operatorname{cosec}\theta - 3$.
2. Rearranging gives $\operatorname{cosec}^2\theta - 3\operatorname{cosec}\theta + 2 = 0$, as required.
3. Factorise: $(\operatorname{cosec}\theta - 1)(\operatorname{cosec}\theta - 2) = 0$.
4. $\operatorname{cosec}\theta = 1$ means $\sin\theta = 1$: $\theta = 90°$.
5. $\operatorname{cosec}\theta = 2$ means $\sin\theta = \frac{1}{2}$: $\theta = 30°$ or $150°$.
6. $\theta = 30°, 90°, 150°$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC's objective is to solve trigonometric equations "including those that need simple identities"; Cambridge 0606 asks you to solve equations involving all six functions using the identities. Cambridge prints the Pythagorean identities in the List of formulas; ZIMSEC candidates should learn them.
:::

## Common mistakes

:::mistake{title="Replacing the wrong function"}
In $2\sin^2 x - \cos x - 1 = 0$, replacing $\cos x$ by $\sqrt{1 - \sin^2 x}$ creates square roots. Replace the **squared** function and keep the one that appears to the first power.
:::

:::mistake{title="Taking only the positive square root"}
$\tan^2\theta = 4$ gives $\tan\theta = \pm 2$. Forgetting $-2$ loses half the solutions.
:::

:::mistake{title="Not rejecting impossible values"}
Writing "$\sin x = -2$, so $x$ = error" or simply leaving it out without comment loses a mark. State that it has no solutions and why.
:::

:::mistake{title="Sign errors when using 1 − cos²x"}
$2\sin^2 x = 2(1 - \cos^2 x) = 2 - 2\cos^2 x$. Use brackets; the minus sign applies to the whole term.
:::

## Exam tips

:::exam-tip
"Show that the equation can be written as …" gives you the quadratic. Show the identity substitution and the rearrangement in full, then use the given form even if your own working went wrong.
:::

:::exam-tip
After solving, count: a quadratic in $\sin x$ with two valid values usually gives up to four solutions in $0°$ to $360°$. If you have fewer, check each value again.
:::

:::exam-tip
Answers that are exact (such as $60°$ or $\frac{\pi}{6}$) should be given exactly; others in degrees to 1 decimal place, or in radians to 3 significant figures, unless the question says otherwise.
:::

## Summary

:::summary
- Use an identity so that only one trigonometric function remains; keep the function that appears unsquared.
- Rearrange into a quadratic in that function and solve it.
- Reject impossible values: $|\sin x| \leq 1$, $|\cos x| \leq 1$, $|\sec x| \geq 1$, $|\operatorname{cosec} x| \geq 1$.
- Solve each simple equation in the interval and list every solution.
- Remember both signs when taking a square root.
:::
