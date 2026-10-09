---
{
  "key": "functions.composite",
  "title": "Composite functions",
  "summary": "Form composite functions such as fg(x) = f(g(x)) and f²(x) = f(f(x)), see why fg and gf usually differ, find the domain and range of a composite, evaluate composites and solve equations such as fg(x) = 5.",
  "concepts": ["amath.functions.composite"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

At a maize mill in Chinhoyi, a machine first removes the husks, then a second machine grinds the grain. The output of the first machine is the input of the second. Doing one function and then another in the same way gives a **composite function**.

Composite functions are examined every year by both boards, usually in a multi-part question that also asks for an inverse function. You must be confident with function notation, substituting expressions (not just numbers) into a function, and expanding brackets.

## Key definitions

:::definition{term="Composite function"}
$fg(x) = f(g(x))$: apply $g$ first, then apply $f$ to the result. Some books write $f \circ g$ for $fg$.
:::

:::definition{term="Repeated function"}
$f^2(x) = ff(x) = f(f(x))$: apply $f$ twice. This is **not** $[f(x)]^2$.
:::

:::keyfact{title="Order matters"}
In $fg(x)$ the function written **nearest to $x$ acts first**. In general $fg(x) \neq gf(x)$.
:::

## Forming a composite

To find $fg(x)$, take the formula for $f$ and replace every $x$ in it by the whole expression $g(x)$, in brackets.

:::worked-solution[Example 1: $f(x) = 2x + 3$ and $g(x) = x^2 - 1$. Find $fg(x)$ and $gf(x)$, and evaluate $fg(2)$ and $gf(2)$]
1. $fg(x) = f(x^2 - 1) = 2(x^2 - 1) + 3 = 2x^2 + 1$.
2. $gf(x) = g(2x + 3) = (2x + 3)^2 - 1 = 4x^2 + 12x + 9 - 1 = 4x^2 + 12x + 8$.
3. $fg(2) = 2(4) + 1 = 9$. Check step by step: $g(2) = 3$, then $f(3) = 9$.
4. $gf(2) = 16 + 24 + 8 = 48$. Check: $f(2) = 7$, then $g(7) = 48$.
5. The two composites are different functions.
:::

For a single value it is often quicker to work from the inside out, as in the checks above, instead of finding the whole formula.

:::worked-solution[Example 2: with $f(x) = 2x + 3$, find $f^2(x)$]
1. $f^2(x) = f(f(x)) = f(2x + 3)$.
2. Replace $x$ in $2x + 3$ by $(2x + 3)$: $2(2x + 3) + 3$.
3. $f^2(x) = 4x + 9$.
:::

## Solving equations with composites

Form the composite first, then solve the equation as usual.

:::worked-solution[Example 3: with $f(x) = 2x + 3$ and $g(x) = x^2 - 1$, solve $fg(x) = 19$]
1. From Example 1, $fg(x) = 2x^2 + 1$.
2. $2x^2 + 1 = 19$, so $2x^2 = 18$ and $x^2 = 9$.
3. $x = 3$ or $x = -3$.
4. Check: $g(3) = 8$ and $f(8) = 19$.
:::

## Domain and range of a composite

$fg(x) = f(g(x))$ only makes sense when the output $g(x)$ is an allowed input of $f$. So:

- **the range of $g$ must lie inside the domain of $f$** for $fg$ to be defined for every $x$ in the domain of $g$;
- the domain of $fg$ is the set of $x$ in the domain of $g$ whose image $g(x)$ is in the domain of $f$;
- the range of $fg$ is found by applying $f$ to the range of $g$.

:::worked-solution[Example 4: domains and ranges of composites]
1. $f(x) = \ln x$ for $x > 0$ and $g(x) = x - 5$ for $x \in \mathbb{R}$. Then $fg(x) = \ln(x - 5)$, which needs $x - 5 > 0$. So $fg$ is defined only for $x > 5$, although $g$ itself accepts every real number.
2. $f(x) = \mathrm{e}^x$ and $g(x) = 3x + 1$, both for $x \in \mathbb{R}$. Then $gf(x) = 3\mathrm{e}^x + 1$.
3. The range of $f$ is $f(x) > 0$. Applying $g$ to these values: $3(\text{positive}) + 1 > 1$.
4. The range of $gf$ is $gf(x) > 1$.
:::

:::worked-solution[Example 5: $f(x) = \dfrac{4}{x + 3}$ for $x \neq -3$, and $g(x) = x^2 + 1$ for $x \in \mathbb{R}$. Find $fg(x)$, its range, and solve $fg(x) = \frac{1}{2}$]
1. $fg(x) = f(x^2 + 1) = \dfrac{4}{x^2 + 1 + 3} = \dfrac{4}{x^2 + 4}$.
2. The range of $g$ is $g(x) \geq 1$, so $g(x)$ is never $-3$: $fg$ is defined for all real $x$.
3. $x^2 + 4 \geq 4$, so $0 < \dfrac{4}{x^2 + 4} \leq 1$, with $1$ reached at $x = 0$. Range: $0 < fg(x) \leq 1$.
4. $\dfrac{4}{x^2 + 4} = \dfrac{1}{2}$ gives $x^2 + 4 = 8$, so $x^2 = 4$ and $x = \pm 2$.
:::

## Working backwards

Sometimes you are given $fg(x)$ and one function and asked for the other, or you need $x$ with $f^2(x) = k$. Write down the composite in terms of the unknown and compare.

For example, if $f(x) = x + 4$ and $fg(x) = 3x^2 + 1$, then $g(x) + 4 = 3x^2 + 1$, so $g(x) = 3x^2 - 3$.

:::worked-solution[Example 6: $f(x) = 2x - 1$ and $fg(x) = 6x^2 + 5$. Find $g(x)$ and then $gf(x)$]
1. $fg(x) = f(g(x)) = 2g(x) - 1$, because $f$ doubles its input and subtracts 1.
2. So $2g(x) - 1 = 6x^2 + 5$, giving $2g(x) = 6x^2 + 6$ and $g(x) = 3x^2 + 3$.
3. Check with a number: $g(2) = 15$ and $f(15) = 29$, while $6(2)^2 + 5 = 29$.
4. Now $gf(x) = g(2x - 1) = 3(2x - 1)^2 + 3 = 3(4x^2 - 4x + 1) + 3 = 12x^2 - 12x + 6$.
:::

When the **outer** function is unknown instead (you know $g$ and $fg$), substitute a new letter for $g(x)$. For instance, if $g(x) = x + 1$ and $fg(x) = x^2 + 2x$, put $u = x + 1$: then $x = u - 1$ and $f(u) = (u - 1)^2 + 2(u - 1) = u^2 - 1$, so $f(x) = x^2 - 1$.

These "working backwards" questions reward careful notation. Write each step as an equation between functions, keep the brackets, and check the result with one numerical value, as in step 3 above.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards use $fg(x)$ for "$g$ first, then $f$" and $f^2(x)$ for $ff(x)$. Cambridge stresses that the range of the inner function must lie in the domain of the outer one; ZIMSEC questions usually ask you to form and evaluate composites and solve equations with them.
:::

## Common mistakes

:::mistake{title="Applying the functions in the wrong order"}
$fg(x)$ means $g$ first. For $f(x) = 2x + 3$, $g(x) = x^2 - 1$: $fg(x) = 2x^2 + 1$, not $(2x + 3)^2 - 1$.
:::

:::mistake{title="Multiplying instead of composing"}
$fg(x)$ is not $f(x) \times g(x)$. Composition substitutes one function into the other.
:::

:::mistake{title="Reading f²(x) as a square"}
$f^2(x) = f(f(x))$. For $f(x) = 2x + 3$, $f^2(x) = 4x + 9$, whereas $[f(x)]^2 = 4x^2 + 12x + 9$.
:::

:::mistake{title="Losing brackets"}
$g(2x + 3)$ with $g(x) = x^2 - 1$ is $(2x + 3)^2 - 1$. Writing $2x + 3^2 - 1$ is wrong.
:::

## Exam tips

:::exam-tip
Write the composite as $f(g(x))$ before you simplify; it shows the examiner the method and earns the method mark even if the algebra slips.
:::

:::exam-tip
When asked for the range of a composite, start from the range of the inner function, then apply the outer function to it.
:::

:::exam-tip
Check a numerical answer by working inside out: find $g(x)$ first, then $f$ of that.
:::

## Summary

:::summary
- $fg(x) = f(g(x))$: $g$ acts first, then $f$.
- $f^2(x) = f(f(x))$, not $[f(x)]^2$.
- In general $fg \neq gf$.
- $fg$ is defined only where $g(x)$ lies in the domain of $f$; its range comes from applying $f$ to the range of $g$.
- To solve $fg(x) = k$, form the composite, then solve.
:::
