---
{
  "key": "numerical.locating-roots",
  "title": "Locating roots and fixed-point iteration",
  "summary": "Locate a root of an equation by sketching graphs or by a change of sign, rearrange the equation into the form x = F(x), use the iteration xₙ₊₁ = F(xₙ) to find the root to a stated accuracy, and recognise when an iteration fails to converge.",
  "concepts": ["amaths.numerical.locating-roots"],
  "estimatedMinutes": 45,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Most equations met in real problems cannot be solved exactly. An engineer sizing a borehole pump in Masvingo or a statistician fitting a model may end up with something like $x^3 - 3x - 5 = 0$ or $x^2 = 2 + \mathrm{e}^{-x}$, for which there is no neat formula. Numerical methods find the root to any accuracy you want, using repeated, simple arithmetic: exactly the kind of work a calculator or computer does well.

This lesson covers the first two tools: locating a root (between which two numbers is it?) and fixed-point iteration (how do we home in on it?). Cambridge examines both in Paper 2 (AS, topic 2.6) and Paper 3 (A Level, topic 3.6), nearly always as a three-part question. ZIMSEC examines them in Pure Mathematics Form 6 (topic 6.6, Numerical methods), and also asks learners to derive an iteration that converges.

## Key definitions

:::definition{term="Root of an equation"}
A value $\alpha$ with $f(\alpha) = 0$. Graphically, it is where the curve $y = f(x)$ crosses (or touches) the $x$-axis, or where two curves $y = g(x)$ and $y = h(x)$ meet if the equation is $g(x) = h(x)$.
:::

:::definition{term="Change of sign"}
If $f$ is **continuous** on $[a, b]$ and $f(a)$ and $f(b)$ have opposite signs, then $f(x) = 0$ has at least one root between $a$ and $b$.
:::

:::formula{name="Fixed-point iteration"}
$$
x_{n+1} = F(x_n)
$$
:::

If the sequence $x_1, x_2, x_3, \dots$ converges to a limit $\alpha$, then $\alpha = F(\alpha)$, so $\alpha$ is a root of the equation $x = F(x)$. MF19 does not print this; it is part of the method.

## Locating a root

**Graphically.** Rearrange the equation as $g(x) = h(x)$ with two curves you can sketch. The number of intersections is the number of roots, and the sketch shows roughly where they are. For example, $\ln x = 3 - x$ has exactly one root, because the increasing curve $y = \ln x$ meets the decreasing line $y = 3 - x$ once.

**By a change of sign.** Evaluate $f$ at the ends of an interval and look for a sign change.

:::worked-solution[Example 1: show that $x^3 - 3x - 5 = 0$ has a root between 2 and 3]
1. Let $f(x) = x^3 - 3x - 5$, which is continuous (a polynomial).
2. $f(2) = 8 - 6 - 5 = -3 < 0$.
3. $f(3) = 27 - 9 - 5 = 13 > 0$.
4. There is a change of sign and $f$ is continuous, so there is a root between 2 and 3.
:::

Two warnings. A change of sign can come from a discontinuity rather than a root: $f(x) = \frac{1}{x - 1}$ changes sign between 0 and 2 but has no root. And **no** change of sign does not prove there is no root: an interval may contain two roots, or the curve may just touch the axis.

## Iteration

Rearrange $f(x) = 0$ into the form $x = F(x)$, choose a starting value $x_1$ near the root, and repeat $x_{n+1} = F(x_n)$. Use the calculator's ANS key: type $x_1$, press =, type $F(\text{ANS})$ and keep pressing =.

:::worked-solution[Example 2: use the iteration $x_{n+1} = \sqrt[3]{3x_n + 5}$ with $x_1 = 2$ to find the root of $x^3 - 3x - 5 = 0$ correct to 2 decimal places]
1. If $x = \sqrt[3]{3x + 5}$, then $x^3 = 3x + 5$, which is the original equation: the iteration is a rearrangement of it.
2. $x_2 = \sqrt[3]{11} = 2.2240$, $x_3 = 2.2684$, $x_4 = 2.2770$, $x_5 = 2.2786$, $x_6 = 2.2789$, $x_7 = 2.2790$.
3. The iterates agree to 2 decimal places: $\alpha = 2.28$.
4. Check: $f(2.275) = -0.050$ and $f(2.285) = 0.075$. The sign changes, so the root lies in $[2.275, 2.285)$ and rounds to $2.28$.
:::

![Graphs of y = x (dashed) and y = cube root of (3x + 5) with the iteration staircase starting at x1 = 2: the steps go up to the curve and across to the line, giving x2 = 2.2240, x3 = 2.2684 and so on, closing in on the intersection at x = 2.279, the root.](media:diagrams/iteration-staircase-converging.png "Figure: the iteration x(n+1) = ∛(3xn + 5) climbs a staircase to the root 2.28")

The final check, an interval of half a unit either side of the answer, is how you **prove** a stated accuracy. "Iterates agreeing to 2 d.p." is accepted by the examiners as the stopping rule, but the sign check is safer.

## When iteration fails

Not every rearrangement works. The same cubic can also be written $x = \frac{x^3 - 5}{3}$, but starting from $x_1 = 2$ this gives $1, -1.333, -2.457, -6.61, -97.9, \dots$, running away from the root.

The reason is the gradient of $F$ near the root. Iteration converges if $|F'(x)| < 1$ near $\alpha$ (and the start is close enough), and fails if $|F'(x)| > 1$. For $F(x) = \sqrt[3]{3x + 5}$, $F'(\alpha) = \frac{1}{(3\alpha + 5)^{2/3}} \approx 0.19$: comfortably less than 1, so it converges quickly. For $F(x) = \frac{x^3 - 5}{3}$, $F'(\alpha) = \alpha^2 \approx 5.2$: it diverges. Graphically, iteration is a staircase or cobweb between $y = x$ and $y = F(x)$; it closes in when $y = F(x)$ is flatter than $y = x$.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge (Paper 2, AS, and Paper 3, A Level) always gives you the iteration or the rearrangement to show; the convergence condition $|F'(\alpha)| < 1$ is not required. ZIMSEC (Form 6) asks learners to derive a converging iterative formula themselves, so you should be able to choose between rearrangements using $|F'(x)| < 1$.
:::

## A typical exam question

:::worked-solution[Example 3: the curves $y = x^2$ and $y = 2 + \mathrm{e}^{-x}$ meet at a point with $x$-coordinate $\alpha$, where $\alpha > 0$. (a) Show that $1 < \alpha < 2$. (b) Show that $\alpha$ satisfies $x = \sqrt{2 + \mathrm{e}^{-x}}$. (c) Use an iteration based on this equation with $x_1 = 1.5$ to find $\alpha$ correct to 3 decimal places.]
1. (a) Let $g(x) = x^2 - 2 - \mathrm{e}^{-x}$ (continuous). $g(1) = 1 - 2 - 0.3679 = -1.368 < 0$ and $g(2) = 4 - 2 - 0.1353 = 1.865 > 0$. Sign change, so $1 < \alpha < 2$.
2. (b) At the intersection, $\alpha^2 = 2 + \mathrm{e}^{-\alpha}$. Since $\alpha > 0$, take the positive square root: $\alpha = \sqrt{2 + \mathrm{e}^{-\alpha}}$.
3. (c) $x_{n+1} = \sqrt{2 + \mathrm{e}^{-x_n}}$: $x_1 = 1.5$, $x_2 = 1.49102$, $x_3 = 1.49169$, $x_4 = 1.49164$, $x_5 = 1.49164$.
4. To 3 decimal places, $\alpha = 1.492$.
5. Check: $g(1.4915) = -0.00046 < 0$ and $g(1.4925) = 0.0027 > 0$, confirming $\alpha = 1.492$ to 3 d.p.
:::

![Graphs of y = x^2 and y = 2 + e^(-x) for x from 0 to 2.6: they cross once for x > 0 at x = alpha, about 1.492, between 1 and 2; the parabola is below the exponential curve before alpha and above it afterwards.](media:diagrams/intersection-parabola-and-exponential.png "Figure: y = x² and y = 2 + e⁻ˣ meet at x = α ≈ 1.492, between 1 and 2")

Always show the iterates to at least one more decimal place than the answer requires, as in step 3.

## Common mistakes

:::mistake{title="Forgetting continuity"}
State that the function is continuous on the interval when you use a sign change: it is part of the argument.
:::

:::mistake{title="Stopping too early"}
Iterate until two consecutive values agree to the required accuracy, and record each iterate to at least one more decimal place.
:::

:::mistake{title="Degrees mode"}
Iterations involving $\sin$, $\cos$ or $\tan$ use radians. A calculator in degree mode gives a different, wrong root.
:::

:::mistake{title="Rounding the iterates"}
Feed the full calculator value back in (use ANS); rounding each iterate can stop the sequence settling.
:::

## Exam tips

:::exam-tip
"Show that the root satisfies $x = F(x)$" is a "show that": rearrange step by step from the original equation (or the intersection condition) and end with the given form.
:::

:::exam-tip
"Give the result of each iteration to 4 decimal places" is an instruction about the working; the final answer is to the accuracy asked for in the question.
:::

:::exam-tip
In a sign-change argument, give numerical values (not just "negative") and a conclusion sentence.
:::

## Summary

:::summary
- A root lies between $a$ and $b$ if $f$ is continuous and $f(a)$, $f(b)$ have opposite signs.
- Sketches of $y = g(x)$ and $y = h(x)$ show how many roots $g(x) = h(x)$ has and roughly where.
- Rearrange $f(x) = 0$ as $x = F(x)$ and iterate $x_{n+1} = F(x_n)$; a limit of the sequence is a root.
- Confirm a root to $n$ decimal places with a sign change half a unit either side.
- Iteration converges when $|F'(x)| < 1$ near the root and diverges when $|F'(x)| > 1$.
:::
