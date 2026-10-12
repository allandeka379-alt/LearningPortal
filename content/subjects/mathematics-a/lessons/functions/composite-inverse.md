---
{
  "key": "functions.composite-inverse",
  "title": "Composite and inverse functions",
  "summary": "Form composite functions fg and gf and decide when they exist, find the inverse of a one-one function (including after completing the square), restrict a domain so that an inverse exists, and relate the graphs of a function and its inverse.",
  "concepts": ["amaths.functions.composite-inverse"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Functions can be chained together. A Harare supermarket might convert a price in rand to US dollars and then add VAT: the final price is one function applied after another, a **composite function**. Functions can also be reversed: if you know the VAT-inclusive price, you can work back to the original. That reverse rule is the **inverse function**.

ZIMSEC Pure Mathematics (Form 5, *Relations*) asks you to find composite functions, find inverses and illustrate the relationship between a one-to-one function and its inverse graphically. Cambridge 9709 (Paper 1, topic 1.2) examines the same, including the condition for a composite to exist and inverses found after completing the square. You need the previous lesson's ideas of domain, range and one-one functions.

## Key definitions

:::definition{term="Composite function"}
$fg(x)$ means $f\big(g(x)\big)$: apply $g$ **first**, then $f$. In general $fg \neq gf$.
:::

:::keyfact{title="When does gf exist?"}
$gf$ exists only if the **range of $f$ lies within the domain of $g$**, because every output of $f$ must be a valid input for $g$.
:::

:::definition{term="Inverse function"}
For a one-one function $f$, the inverse $f^{-1}$ reverses it: $f^{-1}\big(f(x)\big) = x$. The **domain of $f^{-1}$ is the range of $f$**, and the range of $f^{-1}$ is the domain of $f$.
:::

:::keyfact{title="Graphs of f and its inverse"}
The graph of $y = f^{-1}(x)$ is the reflection of $y = f(x)$ in the line $y = x$. Any point $(a, b)$ on $y = f(x)$ becomes $(b, a)$ on $y = f^{-1}(x)$.
:::

None of these facts is on Cambridge's MF19 list.

## Composite functions

To find $fg(x)$, replace every $x$ in the rule for $f$ by the whole expression $g(x)$.

:::worked-solution[Example 1: $f(x) = 2x + 3$ and $g(x) = x^{2} - 1$ for $x \in \mathbb{R}$. Find $fg(x)$, $gf(x)$ and $fg(2)$]
1. $fg(x) = f\big(g(x)\big) = 2(x^{2} - 1) + 3 = 2x^{2} + 1$.
2. $gf(x) = g\big(f(x)\big) = (2x + 3)^{2} - 1 = 4x^{2} + 12x + 8$.
3. $fg(2) = 2(4) + 1 = 9$. Check: $g(2) = 3$, then $f(3) = 9$.
4. Note $gf(2) = 48 \neq 9$, so the order matters.
:::

:::worked-solution[Example 2: does $gf$ exist?]
Let $f(x) = 3 - x$ for $x \geq 0$, and $g(x) = \dfrac{1}{x - 4}$ for $x \neq 4$. Explain why $gf$ exists and find it.

1. The range of $f$ is $f(x) \leq 3$ (the largest value is $f(0) = 3$).
2. The domain of $g$ is every real number except $4$.
3. Every output of $f$ is at most $3$, so it is never $4$: the range of $f$ lies within the domain of $g$, and $gf$ exists.
4. $gf(x) = \dfrac{1}{(3 - x) - 4} = \dfrac{1}{-1 - x} = -\dfrac{1}{x + 1}$ for $x \geq 0$.
:::

If instead $f$ had domain $\mathbb{R}$, then $f(-1) = 4$ and $g(4)$ would be undefined, so $gf$ would not exist.

## Finding an inverse

1. Check that $f$ is one-one on its domain (otherwise there is no inverse).
2. Write $y = f(x)$.
3. Rearrange to make $x$ the subject.
4. Swap the letters: $f^{-1}(x) = \ldots$
5. State the domain of $f^{-1}$: it is the range of $f$.

:::worked-solution[Example 3: find the inverse of $f(x) = \dfrac{3x - 1}{x + 2}$, $x \neq -2$]
1. Let $y = \dfrac{3x - 1}{x + 2}$, so $y(x + 2) = 3x - 1$.
2. Expand and collect the $x$ terms: $xy + 2y = 3x - 1$, so $xy - 3x = -1 - 2y$.
3. Factorise: $x(y - 3) = -(1 + 2y)$, so $x = \dfrac{1 + 2y}{3 - y}$.
4. $f^{-1}(x) = \dfrac{2x + 1}{3 - x}$, for $x \neq 3$.
5. Check with $x = 1$: $f(1) = \frac{2}{3}$ and $f^{-1}\left(\frac{2}{3}\right) = \dfrac{\frac{7}{3}}{\frac{7}{3}} = 1$.
:::

Quadratics are not one-one on $\mathbb{R}$, so a question restricts the domain to one side of the vertex. Completing the square then makes the rearrangement easy.

:::worked-solution[Example 4: $f(x) = (x - 2)^{2} + 5$ for $x \geq 2$. Find $f^{-1}(x)$ and state its domain]
1. The vertex is $(2, 5)$ and the domain is to its right, so $f$ is one-one with range $f(x) \geq 5$.
2. $y = (x - 2)^{2} + 5$, so $(x - 2)^{2} = y - 5$.
3. $x - 2 = \sqrt{y - 5}$, taking the **positive** root because $x \geq 2$.
4. $f^{-1}(x) = 2 + \sqrt{x - 5}$, with domain $x \geq 5$ (the range of $f$).
:::

:::worked-solution[Example 5: an exam-style chain]
The function $f$ is defined by $f(x) = 2x^{2} - 8x + 5$ for $x \geq 2$.

(a) Express $f(x)$ in completed-square form. (b) Hence find $f^{-1}(x)$ and state its domain.

1. (a) $2(x^{2} - 4x) + 5 = 2\left[(x - 2)^{2} - 4\right] + 5 = 2(x - 2)^{2} - 3$.
2. (b) The range of $f$ is $f(x) \geq -3$, so $f^{-1}$ has domain $x \geq -3$.
3. $y = 2(x - 2)^{2} - 3 \Rightarrow (x - 2)^{2} = \dfrac{y + 3}{2}$.
4. Since $x \geq 2$, $x = 2 + \sqrt{\dfrac{y + 3}{2}}$.
5. $f^{-1}(x) = 2 + \sqrt{\dfrac{x + 3}{2}}$ for $x \geq -3$.
6. Check: $f(3) = -1$ and $f^{-1}(-1) = 2 + \sqrt{1} = 3$.
:::

## The graphs of f and its inverse

Because $f^{-1}$ swaps inputs and outputs, its graph is the mirror image of $y = f(x)$ in $y = x$. In Example 4, the graph of $f$ starts at $(2, 5)$ and rises steeply; the graph of $f^{-1}$ starts at $(5, 2)$ and rises slowly. If the graphs meet, they often meet on $y = x$, so solving $f(x) = x$ is a common shortcut for $f(x) = f^{-1}(x)$ when $f$ is increasing.

![Graphs of f(x) = (x - 2)^2 + 5 for x >= 2, starting at (2, 5), and its inverse f^-1(x) = 2 + sqrt(x - 5) starting at (5, 2): the two curves are mirror images in the dashed line y = x.](media:diagrams/inverse-reflection-in-y-equals-x.png "Figure: f starts at (2, 5), f⁻¹ at (5, 2); each is the reflection of the other in y = x")

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine composite and inverse functions and the reflection in $y = x$. ZIMSEC also frames inverses in terms of bijective functions and asks you to model situations with relations.
:::

## Common mistakes

:::mistake{title="Wrong order in a composite"}
$fg(x)$ applies $g$ first. Writing $g\big(f(x)\big)$ for $fg(x)$ is the most common error.
:::

:::mistake{title="Confusing the inverse with the reciprocal"}
$f^{-1}(x)$ is not $\dfrac{1}{f(x)}$. For $f(x) = 2x + 3$, $f^{-1}(x) = \dfrac{x - 3}{2}$ but $\dfrac{1}{f(x)} = \dfrac{1}{2x + 3}$.
:::

:::mistake{title="Taking the ± root"}
With the domain $x \geq 2$, $x - 2 \geq 0$, so only the positive root is correct. Writing $2 \pm \sqrt{x - 5}$ does not define a function.
:::

:::mistake{title="Omitting the domain of the inverse"}
"Find $f^{-1}(x)$ and state its domain" carries a mark for the domain: it is the range of $f$, not the domain of $f$.
:::

## Exam tips

:::exam-tip
To explain why an inverse does not exist, show the function is not one-one, for example two inputs with the same output.
:::

:::exam-tip
After finding an inverse, test one value: compute $f(a)$ and check that $f^{-1}$ returns $a$.
:::

:::exam-tip
When asked to sketch $f$ and $f^{-1}$ on one diagram, draw the line $y = x$ and make the two graphs clear mirror images, with end points such as $(2, 5)$ and $(5, 2)$ labelled.
:::

## Summary

:::summary
- $fg(x) = f\big(g(x)\big)$: apply $g$ first; $fg$ and $gf$ are usually different.
- $gf$ exists only when the range of $f$ lies inside the domain of $g$.
- Only one-one functions have inverses; find them by making $x$ the subject and swapping letters.
- Domain of $f^{-1}$ = range of $f$; choose the root sign using the domain of $f$.
- The graph of $f^{-1}$ is the reflection of the graph of $f$ in $y = x$.
:::
