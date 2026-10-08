---
{
  "key": "algebra.inverse-and-composite-functions",
  "title": "Inverse and composite functions",
  "summary": "Find inverse functions f⁻¹(x), form composite functions such as fg(x) = f(g(x)) using the Cambridge convention, and solve equations involving them.",
  "concepts": ["math.algebra.inverse-and-composite-functions"],
  "objectives": ["cambridge/igcse/mathematics:2.13.2", "cambridge/igcse/mathematics:2.13.3"],
  "estimatedMinutes": 30,
  "level": "extended"
}
---
## Introduction

A function that converts US dollars to South African rand multiplies by the exchange rate. Going back from rand to dollars needs the function that **undoes** it: divide by the rate. That “undoing” function is the **inverse** function.

Functions can also be chained. A shop might add a 15% tax to a price and then take off a US\$2 discount; each step is a function, and doing one after the other gives a **composite** function. The order matters: discount-then-tax gives a different price from tax-then-discount.

This lesson is Cambridge IGCSE **Extended** content. You should be confident with function notation and with changing the subject of a formula.

## Key definitions

:::definition{term="Inverse function"}
The function $f^{-1}$ that reverses $f$: if $f(a) = b$, then $f^{-1}(b) = a$. Applying $f$ and then $f^{-1}$ (or the other way round) returns the original value.
:::

:::definition{term="Composite function"}
A function made by applying one function and then another. In the Cambridge convention, $fg(x)$ means $f(g(x))$: apply $g$ **first**, then $f$.
:::

:::keyfact{title="Not a reciprocal"}
The $-1$ in $f^{-1}$ does **not** mean “one over”. For $f(x) = x^5$, the inverse is $f^{-1}(x) = \sqrt[5]{x}$, not $\frac{1}{x^5}$.
:::

## Finding an inverse function

:::keyfact{title="Method"}
1. Write $y = f(x)$.
2. Rearrange to make $x$ the subject.
3. Replace $y$ by $x$: the result is $f^{-1}(x)$.
4. Check with a number: $f$ then $f^{-1}$ should return your starting value.
:::

:::worked-solution[Example 1: find $f^{-1}(x)$ when $f(x) = \dfrac{3x - 2}{5}$]
1. $y = \dfrac{3x - 2}{5}$.
2. Multiply by 5: $5y = 3x - 2$.
3. Add 2 and divide by 3: $x = \dfrac{5y + 2}{3}$.
4. So $f^{-1}(x) = \dfrac{5x + 2}{3}$.
5. Check: $f(4) = \frac{10}{5} = 2$ and $f^{-1}(2) = \frac{12}{3} = 4$. ✓
:::

:::worked-solution[Example 2: find $f^{-1}(x)$ when $f(x) = \dfrac{5}{x - 1}$]
1. $y = \dfrac{5}{x - 1}$, so $y(x - 1) = 5$.
2. $x - 1 = \dfrac{5}{y}$, so $x = \dfrac{5}{y} + 1$.
3. $f^{-1}(x) = \dfrac{5}{x} + 1$.
:::

To find a single value such as $f^{-1}(17)$ you do not need the formula: solve $f(x) = 17$. For $f(x) = 5x + 2$, $5x + 2 = 17$ gives $f^{-1}(17) = 3$.

The same method works for powers and roots, because each operation has an inverse operation:

- $f(x) = x^3 - 2$: from $y = x^3 - 2$, $x^3 = y + 2$, so $f^{-1}(x) = \sqrt[3]{x + 2}$. Check: $f(2) = 6$ and $\sqrt[3]{6 + 2} = 2$.
- $f(x) = x^2 + 3$ for $x \geq 0$: $x^2 = y - 3$, so $f^{-1}(x) = \sqrt{x - 3}$. The condition $x \geq 0$ matters: without it, two inputs such as 2 and $-2$ would give the same output, 7, and there would be no single inverse.

## Composite functions

:::worked-solution[Example 3: $f(x) = 3x - 2$ and $g(x) = x^2$]
1. $fg(2) = f(g(2)) = f(4) = 10$.
2. $gf(2) = g(f(2)) = g(4) = 16$. The order matters.
3. $fg(x) = f(x^2) = 3x^2 - 2$.
4. $gf(x) = g(3x - 2) = (3x - 2)^2 = 9x^2 - 12x + 4$.
5. $ff(x) = f(3x - 2) = 3(3x - 2) - 2 = 9x - 8$.
:::

To write $fg(x)$, take the rule for $f$ and replace every $x$ by the **whole** of $g(x)$, in brackets.

## Solving equations

Find the composite or inverse expression first, then solve.

:::worked-solution[Example 4: $f(x) = 2x + 3$ and $g(x) = x^2 - 1$; solve $fg(x) = 51$]
1. $fg(x) = 2(x^2 - 1) + 3 = 2x^2 + 1$.
2. $2x^2 + 1 = 51$, so $2x^2 = 50$ and $x^2 = 25$.
3. $x = 5$ or $x = -5$.
:::

:::worked-solution[Example 5: $f(x) = \dfrac{x + 4}{3}$ and $g(x) = 2x - 1$; solve $f(x) = g(x)$]
1. $\dfrac{x + 4}{3} = 2x - 1$.
2. Multiply by 3: $x + 4 = 6x - 3$.
3. $7 = 5x$, so $x = \dfrac{7}{5}$.
:::

Some questions combine everything. Work step by step and simplify each expression before using it.

:::worked-solution[Example 6: $f(x) = 3x + 1$ and $g(x) = \dfrac{x - 4}{3}$]
1. $fg(x) = 3\left(\dfrac{x - 4}{3}\right) + 1 = x - 4 + 1 = x - 3$.
2. The inverse of “subtract 3” is “add 3”, so $(fg)^{-1}(x) = x + 3$.
3. $f^{-1}(x) = \dfrac{x - 1}{3}$. Solving $f^{-1}(x) = g(x)$ would need $x - 1 = x - 4$, that is $-1 = -4$: impossible, so there is no solution.
4. Interpretation: $f^{-1}(x)$ is always exactly 1 more than $g(x)$, so they are never equal.
:::

## Common mistakes

:::mistake{title="Applying the functions in the wrong order"}
$fg(x)$ means $g$ first. With $f(x) = 3x - 2$ and $g(x) = x^2$, $fg(x) = 3x^2 - 2$, while $(3x - 2)^2$ is $gf(x)$.
:::

:::mistake{title="Treating the inverse as a reciprocal"}
For $f(x) = 4x + 7$, $f^{-1}(x) = \frac{x - 7}{4}$, not $\frac{1}{4x + 7}$.
:::

:::mistake{title="Undoing in the wrong order"}
$f(x) = \frac{3x - 2}{5}$ multiplies by 3, subtracts 2, then divides by 5. The inverse multiplies by 5, adds 2, then divides by 3. Undoing in the original order (divide by 3, add 2, multiply by 5) gives the wrong answer $\frac{5x}{3} + 10$.
:::

:::mistake{title="Missing brackets in composites"}
$f(x - 2)$ with $f(x) = 4x + 1$ is $4(x - 2) + 1 = 4x - 7$, not $4x - 2 + 1$.
:::

## Exam tips

:::exam-tip
Always check an inverse with one number. If $f(4) = 2$, then $f^{-1}(2)$ must be 4.
:::

:::exam-tip
For a value such as $gf(1)$, work from the inside out and write each step: with $f(x) = 2x + 3$ and $g(x) = x^2 - 1$, $f(1) = 5$, then $g(5) = 24$.
:::

:::exam-tip
If a question asks you to solve $fg(x) = k$ and the composite contains $x^2$, give both solutions unless the question asks only for the positive one.
:::

## Summary

:::summary
- $f^{-1}$ undoes $f$; it is not the reciprocal of $f$.
- To find $f^{-1}(x)$: write $y = f(x)$, make $x$ the subject, then swap $y$ for $x$.
- $fg(x) = f(g(x))$: apply $g$ first; usually $fg(x) \neq gf(x)$.
- To form $fg(x)$, replace $x$ in $f$ by the whole of $g(x)$ in brackets.
- To solve equations, find the composite or inverse expression first.
:::
