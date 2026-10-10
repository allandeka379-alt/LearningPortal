---
{
  "key": "trig.basic-identities-equations",
  "title": "Basic trigonometric identities and equations",
  "summary": "Use tan θ ≡ sin θ / cos θ and sin²θ + cos²θ ≡ 1 to prove identities and simplify expressions, and find every solution of a trigonometric equation in a given interval, in degrees or radians, including quadratic equations in sin θ or cos θ.",
  "concepts": ["amaths.trig.basic-identities-equations"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

An identity is true for every angle; an equation is true only for particular angles. Most A-Level trigonometry questions mix the two: you use an identity to rewrite an equation in a form you can solve, and then you find **all** the solutions in a stated interval. The skills here are the foundation for the later work on reciprocal functions, compound angles and the harmonic form.

This topic is in ZIMSEC Pure Mathematics (trigonometrical functions, Form 5) and Cambridge 9709 Paper 1 (topic 1.5). Typical questions: "Prove the identity…", "Hence solve…", and quadratic equations such as $3\sin^2\theta - 5\cos\theta - 1 = 0$. Cambridge does not require general solutions; you list the solutions in the given interval.

## Key definitions

:::definition{term="Identity"}
A statement that is true for every value of the variable for which both sides are defined, written with $\equiv$. For example $\sin^2\theta + \cos^2\theta \equiv 1$.
:::

:::definition{term="Principal value"}
The value your calculator gives for $\sin^{-1}k$, $\cos^{-1}k$ or $\tan^{-1}k$; the other solutions come from the symmetry of the graph.
:::

:::formula{name="Basic identities (in MF19; ZIMSEC prints no list)"}
$$
\tan\theta \equiv \frac{\sin\theta}{\cos\theta} \qquad \sin^2\theta + \cos^2\theta \equiv 1
$$
:::

The second identity rearranges to $\sin^2\theta \equiv 1 - \cos^2\theta$ and $\cos^2\theta \equiv 1 - \sin^2\theta$; dividing it by $\cos^2\theta$ gives $1 + \tan^2\theta \equiv \sec^2\theta$, which you meet in the lesson on reciprocal functions.

## Proving identities

Start with the more complicated side and work towards the other side, one step per line. Useful moves: write everything in terms of $\sin$ and $\cos$, combine fractions over a common denominator, replace $\sin^2\theta + \cos^2\theta$ by $1$, and factorise.

:::worked-solution[Example 1: prove that $\dfrac{1 + \sin\theta}{\cos\theta} + \dfrac{\cos\theta}{1 + \sin\theta} \equiv \dfrac{2}{\cos\theta}$]
1. Combine over the common denominator $\cos\theta(1 + \sin\theta)$: $\text{LHS} = \dfrac{(1 + \sin\theta)^2 + \cos^2\theta}{\cos\theta(1 + \sin\theta)}$.
2. Expand the numerator: $1 + 2\sin\theta + \sin^2\theta + \cos^2\theta$.
3. Use $\sin^2\theta + \cos^2\theta = 1$: the numerator is $2 + 2\sin\theta = 2(1 + \sin\theta)$.
4. Cancel $(1 + \sin\theta)$: $\text{LHS} = \dfrac{2}{\cos\theta} = \text{RHS}$.
:::

Never "do the same thing to both sides" of an identity you are proving: that assumes the result. Work on one side only.

## Solving equations in an interval

For $\sin x = k$, $\cos x = k$ or $\tan x = k$:

1. Find the principal value with the inverse function (or an exact value).
2. Use the graph or the CAST diagram to find the second solution in one cycle: for sine, $180^\circ - \alpha$; for cosine, $360^\circ - \alpha$; for tangent, $\alpha + 180^\circ$.
3. Add or subtract whole periods ($360^\circ$ for sine and cosine, $180^\circ$ for tangent) until you have every solution in the interval.

When the angle is a multiple such as $2x$, first change the interval: if $-\pi < x < \pi$, then $-2\pi < 2x < 2\pi$. Find every value of $2x$, then divide.

:::worked-solution[Example 2: solve $3\sin 2x + 1 = 0$ for $-\pi < x < \pi$]
1. $\sin 2x = -\frac{1}{3}$, with $-2\pi < 2x < 2\pi$.
2. The related acute angle is $\alpha = \sin^{-1}\frac{1}{3} = 0.3398$.
3. Sine is negative in the third and fourth quadrants: $2x = \pi + \alpha$ or $2\pi - \alpha$, and subtracting $2\pi$ gives $-\pi + \alpha$ and $-\alpha$.
4. So $2x = -2.8018, -0.3398, 3.4814, 5.9434$.
5. Divide by 2: $x = -1.40, -0.170, 1.74, 2.97$ (3 significant figures).
:::

## Equations that need an identity

If an equation contains both $\sin^2\theta$ and $\cos\theta$, use $\sin^2\theta = 1 - \cos^2\theta$ to make a quadratic in $\cos\theta$, then factorise. If it contains $\sin\theta$ and $\cos\theta$ to the first power only, divide by $\cos\theta$ to get $\tan\theta$.

:::worked-solution[Example 3: solve $3\sin^2\theta - 5\cos\theta - 1 = 0$ for $0^\circ \le \theta \le 360^\circ$]
1. Replace $\sin^2\theta$: $3(1 - \cos^2\theta) - 5\cos\theta - 1 = 0$.
2. Rearrange: $3\cos^2\theta + 5\cos\theta - 2 = 0$.
3. Factorise: $(3\cos\theta - 1)(\cos\theta + 2) = 0$.
4. $\cos\theta = -2$ has no solutions, since $-1 \le \cos\theta \le 1$.
5. $\cos\theta = \frac{1}{3}$: $\theta = 70.5^\circ$ or $360^\circ - 70.5^\circ = 289.5^\circ$.
:::

:::worked-solution[Example 4: solve $\tan\theta = 2\sin\theta$ for $0^\circ \le \theta \le 360^\circ$]
1. Write $\tan\theta = \dfrac{\sin\theta}{\cos\theta}$: $\dfrac{\sin\theta}{\cos\theta} - 2\sin\theta = 0$.
2. Factorise (do not divide by $\sin\theta$): $\sin\theta\left(\dfrac{1}{\cos\theta} - 2\right) = 0$.
3. $\sin\theta = 0$: $\theta = 0^\circ, 180^\circ, 360^\circ$.
4. $\cos\theta = \frac{1}{2}$: $\theta = 60^\circ, 300^\circ$.
5. Five solutions: $0^\circ, 60^\circ, 180^\circ, 300^\circ, 360^\circ$.
:::

Dividing both sides by $\sin\theta$ in step 2 would have lost the three solutions with $\sin\theta = 0$. Always factorise instead.

:::worked-solution[Example 5: solve $2\sin x = 3\cos x$ for $0^\circ \le x \le 360^\circ$]
1. $\cos x = 0$ is not a solution (it would force $\sin x = 0$ too), so divide by $\cos x$: $\tan x = \frac{3}{2}$.
2. Principal value: $x = \tan^{-1}1.5 = 56.3^\circ$.
3. Tangent repeats every $180^\circ$: $x = 56.3^\circ$ or $236.3^\circ$.
:::

## Checking your answers

Substitute each solution into the original equation with a calculator. Count the solutions you expect from the graph: an equation in $\sin 2x$ on $0^\circ$ to $360^\circ$ usually has twice as many solutions as one in $\sin x$. And keep the accuracy asked for: degrees to 1 decimal place, radians to 3 significant figures, unless exact values are possible.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine identities and solutions in a given interval in the same way. Cambridge states that general solutions are not required; ZIMSEC questions also give an interval. Solutions in radians are common in both.
:::

## Common mistakes

:::mistake{title="Dividing by a trigonometric function"}
Dividing $\tan\theta = 2\sin\theta$ by $\sin\theta$ loses the solutions with $\sin\theta = 0$. Factorise.
:::

:::mistake{title="Forgetting the second solution"}
$\cos\theta = \frac{1}{3}$ has two solutions in $0^\circ$ to $360^\circ$: $70.5^\circ$ and $289.5^\circ$.
:::

:::mistake{title="Not adjusting the interval for multiple angles"}
For $\sin 2x$ with $0^\circ \le x \le 360^\circ$, search $0^\circ \le 2x \le 720^\circ$, then halve.
:::

:::mistake{title="Accepting impossible values"}
$\cos\theta = -2$ or $\sin\theta = 1.5$ has no solution: say so and discard it.
:::

## Exam tips

:::exam-tip
"Prove" or "show that" an identity: start from one side, end with the other, and write "= RHS" at the end.
:::

:::exam-tip
"Hence solve" means use the identity you have just proved: the equation will simplify to one already solved.
:::

:::exam-tip
List solutions in ascending order and check the number against a quick sketch of the graph.
:::

## Summary

:::summary
- $\tan\theta \equiv \frac{\sin\theta}{\cos\theta}$ and $\sin^2\theta + \cos^2\theta \equiv 1$ prove identities and turn equations into quadratics.
- Prove identities by working on one side only.
- Solve $\sin$, $\cos$, $\tan$ $= k$ by the principal value, the symmetry of the graph, and adding periods.
- For $\sin kx$, change the interval to $kx$ first, then divide.
- Factorise rather than divide; reject values outside $[-1, 1]$ for sine and cosine.
:::
