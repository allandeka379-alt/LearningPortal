---
{
  "key": "modulus.equations",
  "title": "Modulus equations",
  "summary": "Understand |x| as the non-negative size of a number and solve |ax + b| = c, |ax + b| = cx + d, |ax + b| = |cx + d| and |ax² + bx + c| = d by cases or by squaring, checking every solution.",
  "concepts": ["amath.modulus.equations"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

Two kombis leave the same rank on the Harare–Mutare road, one heading east and one heading west. After ten minutes each is 8 km from the rank: their positions are $+8$ and $-8$, but their **distance** from the rank is the same. The modulus (absolute value) $|x|$ measures exactly this kind of size without direction.

Modulus equations are a Cambridge 0606 topic, and they appear on both papers, often on the non-calculator Paper 1. The key skill is splitting a modulus equation into **cases** and then **checking** each answer, because the cases can produce answers that do not satisfy the original equation. You need to be able to solve linear and quadratic equations.

## Key definitions

:::definition{term="Modulus"}
The modulus of a real number $x$, written $|x|$, is its size without its sign: $|x| = x$ if $x \geq 0$ and $|x| = -x$ if $x < 0$. For example $|5| = 5$, $|-5| = 5$ and $|0| = 0$.
:::

:::keyfact{title="Properties to use"}
$|x| \geq 0$ for every $x$; $|x|^2 = x^2$; $|ab| = |a|\,|b|$; $|x| = |-x|$. But in general $|a + b| \neq |a| + |b|$: for example $|3 + (-5)| = 2$ while $|3| + |-5| = 8$.
:::

The graph of $y = |ax + b|$ is a V shape: the part of the line $y = ax + b$ below the $x$-axis is reflected in the axis. Graphs of modulus functions have their own lesson; here we solve equations algebraically and use graphs only to count or check solutions.

## Type 1: $|ax + b| = c$

If $c > 0$, the expression inside is either $c$ or $-c$. If $c = 0$, there is one solution. If $c < 0$ there is **no** solution, because a modulus is never negative.

:::worked-solution[Example 1: solve $|2x - 3| = 7$]
1. Either $2x - 3 = 7$ or $2x - 3 = -7$.
2. First case: $2x = 10$, so $x = 5$.
3. Second case: $2x = -4$, so $x = -2$.
4. Check: $|10 - 3| = 7$ and $|-4 - 3| = 7$. Solutions $x = -2$ or $x = 5$.
:::

## Type 2: $|ax + b| = cx + d$

Now the right-hand side contains $x$, and it must be **non-negative** for a solution to exist. Solve both cases, then reject any answer that makes $cx + d$ negative.

:::worked-solution[Example 2: solve $|x + 4| = 2x - 1$]
1. Case 1: $x + 4 = 2x - 1$, so $x = 5$. Check: $2(5) - 1 = 9 \geq 0$ and $|5 + 4| = 9$. Valid.
2. Case 2: $x + 4 = -(2x - 1) = -2x + 1$, so $3x = -3$ and $x = -1$.
3. Check: $2(-1) - 1 = -3 < 0$, but a modulus cannot equal $-3$. Reject $x = -1$.
4. The only solution is $x = 5$.
:::

A graph explains the rejected root: the V-shaped graph $y = |x + 4|$ meets the line $y = 2x - 1$ only once, at $(5, 9)$. The value $x = -1$ is where the line meets $y = -(x + 4)$, the left arm of the V **extended below the $x$-axis**, at $(-1, -3)$; that point is not on the V itself.

## Type 3: $|ax + b| = |cx + d|$

Two numbers have the same modulus when they are equal or opposite. There are two methods.

- **Cases:** $ax + b = cx + d$ or $ax + b = -(cx + d)$.
- **Squaring:** since both sides are non-negative, $|P| = |Q| \iff P^2 = Q^2$. Squaring gives a quadratic with the same solutions, and no checking is needed.

:::worked-solution[Example 3: solve $|3x - 1| = |x + 5|$]
1. Case 1: $3x - 1 = x + 5$, so $2x = 6$ and $x = 3$.
2. Case 2: $3x - 1 = -(x + 5)$, so $4x = -4$ and $x = -1$.
3. Check by squaring: $(3x - 1)^2 = (x + 5)^2$ gives $9x^2 - 6x + 1 = x^2 + 10x + 25$.
4. So $8x^2 - 16x - 24 = 0$, that is $x^2 - 2x - 3 = 0$ and $(x - 3)(x + 1) = 0$: the same answers.
5. Solutions $x = -1$ or $x = 3$.
:::

## Type 4: $|ax^2 + bx + c| = d$

Each case is now a quadratic, so there can be up to **four** solutions.

:::worked-solution[Example 4: solve $|x^2 - 5x| = 6$]
1. Case 1: $x^2 - 5x = 6$, so $x^2 - 5x - 6 = 0$, $(x - 6)(x + 1) = 0$, giving $x = 6$ or $x = -1$.
2. Case 2: $x^2 - 5x = -6$, so $x^2 - 5x + 6 = 0$, $(x - 2)(x - 3) = 0$, giving $x = 2$ or $x = 3$.
3. All four satisfy the original equation (the right-hand side 6 is a positive constant, so no check fails).
4. Solutions $x = -1, 2, 3, 6$.
:::

Graphically, $y = |x^2 - 5x|$ is the parabola $y = x^2 - 5x$ with the part between $x = 0$ and $x = 5$ reflected upwards. The reflected arch has its highest point at $\left(\frac{5}{2}, \frac{25}{4}\right)$. Because $6 < \frac{25}{4}$, the line $y = 6$ cuts the arch twice and the outer branches twice: four solutions.

When the right-hand side contains $x$, combine types 2 and 4: solve both quadratics and check the sign condition.

:::worked-solution[Example 5: solve $|x^2 - 4| = 3x$]
1. The right-hand side must be non-negative, so any solution has $x \geq 0$.
2. Case 1: $x^2 - 4 = 3x$, so $x^2 - 3x - 4 = 0$ and $(x - 4)(x + 1) = 0$: $x = 4$ or $x = -1$. Reject $x = -1$.
3. Case 2: $x^2 - 4 = -3x$, so $x^2 + 3x - 4 = 0$ and $(x + 4)(x - 1) = 0$: $x = -4$ or $x = 1$. Reject $x = -4$.
4. Check: $|16 - 4| = 12 = 3(4)$ and $|1 - 4| = 3 = 3(1)$. Solutions $x = 1$ or $x = 4$.
:::

## Choosing a method

| Equation | Method |
| --- | --- |
| $\lvert ax + b \rvert = c$ | two cases, $\pm c$; no solution if $c < 0$ |
| $\lvert ax + b \rvert = cx + d$ | two cases, then reject roots with $cx + d < 0$ |
| $\lvert ax + b \rvert = \lvert cx + d \rvert$ | two cases, or square both sides |
| $\lvert \text{quadratic} \rvert = d$ | two quadratics, up to four roots |

Do **not** square when only one side is a modulus and the other side might be negative (type 2): squaring then creates extra roots, so you must still check.

## Common mistakes

:::mistake{title="Not checking in type 2"}
In $|x + 4| = 2x - 1$, the value $x = -1$ comes out of the algebra but gives $|3| = -3$, which is false. Always substitute back.
:::

:::mistake{title="Solving |x + 2| = −3"}
A modulus is never negative, so there is no solution. Writing $x + 2 = \pm 3$ gives two false answers.
:::

:::mistake{title="Forgetting the brackets in the second case"}
The second case of $|3x - 1| = |x + 5|$ is $3x - 1 = -(x + 5) = -x - 5$, not $3x - 1 = -x + 5$.
:::

:::mistake{title="Stopping after one quadratic"}
$|x^2 - 5x| = 6$ needs **both** $x^2 - 5x = 6$ and $x^2 - 5x = -6$. Missing the second case loses half the solutions.
:::

## Exam tips

:::exam-tip
Show both cases clearly, labelled, and state which roots you reject and why. "Solve" questions on modulus equations usually have a mark for the check.
:::

:::exam-tip
On Paper 1 (no calculator), expect solutions that are integers, fractions or simple surds. If you get awkward decimals, recheck the expansion.
:::

:::exam-tip
A quick sketch of the V or the reflected parabola tells you how many solutions to expect before you start.
:::

## Summary

:::summary
- $|x|$ is the non-negative size of $x$; a modulus equation splits into the cases "inside $= +$" and "inside $= -$".
- $|ax + b| = c$ has no solution when $c < 0$.
- For $|ax + b| = cx + d$, reject any root that makes $cx + d$ negative.
- For $|P| = |Q|$, use $P = \pm Q$ or square both sides.
- $|\text{quadratic}| = d$ gives two quadratics and up to four solutions.
:::
