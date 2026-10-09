---
{
  "key": "functions.domain-range",
  "title": "Functions: mappings, domain and range",
  "summary": "Decide whether a mapping is a function and explain why, recognise one-one and many-one functions, use function notation, and find the domain and range of linear, quadratic, exponential and logarithmic functions, including on a restricted domain.",
  "concepts": ["amath.functions.domain-range"],
  "estimatedMinutes": 35,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

A school in Gweru gives every learner exactly one examination number. Each learner (the input) is matched to one number (the output). That rule is a **function**. A rule that matched one learner to two different numbers would cause chaos, and it would not be a function.

Functions are the language of the whole Additional Mathematics course: composite and inverse functions, graphs, logarithms, trigonometry and calculus all use them. Both ZIMSEC and Cambridge open the syllabus with this topic, and every paper asks for a domain, a range or an explanation of why something is (or is not) a function. You need to be confident with substituting into formulas, sketching straight lines and parabolas, and completing the square.

## Key definitions

:::definition{term="Mapping"}
A rule that links each element of one set (the inputs) to one or more elements of another set (the outputs).
:::

:::definition{term="Function"}
A mapping in which **every** input in the domain is mapped to **exactly one** output.
:::

:::definition{term="Domain"}
The set of input values ($x$-values) for which the function is defined.
:::

:::definition{term="Range (image set)"}
The set of all output values $f(x)$ produced when $x$ takes every value in the domain.
:::

:::definition{term="One-one function"}
A function in which different inputs always give different outputs. ZIMSEC calls this a **one-to-one mapping**.
:::

:::definition{term="Many-one function"}
A function in which at least two different inputs give the same output, such as $f(x) = x^2$, where $f(-3) = f(3) = 9$. ZIMSEC calls a quadratic a **two-to-one mapping**.
:::

## Notation

The function "square $x$ and add 1" can be written as

$$
f(x) = x^2 + 1 \qquad \text{or} \qquad f : x \mapsto x^2 + 1
$$

and $f(3) = 10$ means "the output when the input is 3". A complete definition states the domain too, for example $f(x) = x^2 + 1$ for $x \in \mathbb{R}$, or for $-2 \leq x \leq 3$.

## Is it a function?

Ask: does each input have exactly one output? On a graph, use the **vertical line test**: if any vertical line meets the graph more than once, the graph is not a function of $x$.

:::worked-solution[Example 1: decide whether each mapping is a function, and explain]
1. $\{1 \mapsto 4,\ 2 \mapsto 4,\ 3 \mapsto 7\}$: each input has exactly one output, so it is a function. Two inputs share the output 4, so it is **many-one**.
2. $x \mapsto \pm\sqrt{x}$ for $x > 0$: the input 9 gives two outputs, $3$ and $-3$, so it is **not** a function.
3. $f(x) = 2x - 5$, $x \in \mathbb{R}$: each $x$ gives one value, and different $x$ give different values (the graph is a straight line that is not horizontal), so it is a **one-one** function.
:::

For one-one versus many-one, use the **horizontal line test**: if some horizontal line meets the graph more than once, the function is many-one.

## Range of a linear function

A straight line is always increasing or always decreasing, so on an interval the range lies between the values at the two ends.

:::worked-solution[Example 2: find the range of $f(x) = 3x - 2$ for $-1 \leq x \leq 4$]
1. $f(-1) = -3 - 2 = -5$.
2. $f(4) = 12 - 2 = 10$.
3. The function is increasing, so the range is $-5 \leq f(x) \leq 10$.
:::

Write the range in terms of $f(x)$ (or $y$), not $x$. Writing "$-5 \leq x \leq 10$" loses the mark.

## Range of a quadratic function

Complete the square to find the vertex. If the vertex lies inside the domain, it gives the minimum (or maximum); then compare the values at the ends of the domain.

:::worked-solution[Example 3: find the range of $f(x) = x^2 - 6x + 10$ for $0 \leq x \leq 5$]
1. $x^2 - 6x + 10 = (x - 3)^2 + 1$, so the minimum point is $(3, 1)$.
2. $x = 3$ is inside $0 \leq x \leq 5$, so the least value is $1$.
3. Ends: $f(0) = 10$ and $f(5) = 25 - 30 + 10 = 5$. The greatest value is $10$.
4. Range: $1 \leq f(x) \leq 10$.
:::

## Exponential and logarithmic functions

The graph of $y = \mathrm{e}^x$ is always above the $x$-axis and approaches it as $x \to -\infty$, so $\mathrm{e}^x > 0$ for every $x$, but it never equals 0. The graph of $y = \ln x$ exists only for $x > 0$ and takes every real value.

:::worked-solution[Example 4: find the ranges of $f(x) = 2\mathrm{e}^x + 1$, $x \in \mathbb{R}$, and $g(x) = \ln(x - 2)$, $x > 2$]
1. $\mathrm{e}^x > 0$, so $2\mathrm{e}^x > 0$ and $2\mathrm{e}^x + 1 > 1$.
2. As $x \to -\infty$, $f(x)$ gets as close to 1 as we like, but never reaches it; as $x$ increases $f(x)$ grows without limit. Range of $f$: $f(x) > 1$.
3. As $x$ runs over $x > 2$, $x - 2$ runs over all positive numbers, and $\ln$ of all positive numbers gives every real number.
4. Range of $g$: $g(x) \in \mathbb{R}$ (all real numbers).
:::

The line $y = 1$ is a horizontal asymptote of $y = 2\mathrm{e}^x + 1$, and $x = 2$ is a vertical asymptote of $y = \ln(x - 2)$.

## Finding a domain

Sometimes you must decide which inputs are allowed. In this course the usual restrictions are:

- you cannot divide by zero: $\dfrac{1}{x - 3}$ needs $x \neq 3$;
- you cannot take the square root of a negative number: $\sqrt{4 - x}$ needs $x \leq 4$;
- you cannot take the logarithm of zero or a negative number: $\ln(2x - 1)$ needs $x > \frac{1}{2}$.

## Restricting a domain to make a function one-one

A quadratic is many-one on $\mathbb{R}$, but it becomes one-one if we keep only one side of the vertex.

:::worked-solution[Example 5: find the least value of $k$ for which $f(x) = x^2 - 4x + 5$, $x \geq k$, is one-one]
1. $x^2 - 4x + 5 = (x - 2)^2 + 1$, so the vertex is at $x = 2$.
2. To the right of $x = 2$ the graph is always increasing, so every horizontal line meets it at most once.
3. If $k < 2$, the domain includes points on both sides of the vertex, such as $f(1) = f(3) = 2$.
4. The least value is $k = 2$.
:::

This idea is needed for inverse functions, because only one-one functions have inverses.

:::keyfact{title="ZIMSEC and Cambridge"}
The ideas are the same; the words differ. ZIMSEC: one-to-one mapping, two-to-one mapping, $\log x$ for base 10. Cambridge: one-one function, many-one function, $\lg x$ for base 10. Both use "range" and accept "image set". Cambridge asks you to "explain in words why a given mapping is a function".
:::

## Common mistakes

:::mistake{title="Giving the range in terms of x"}
The range describes outputs: write $f(x) \geq 3$ or $y \geq 3$, never $x \geq 3$.
:::

:::mistake{title="Using only the end points for a quadratic"}
For $x^2 - 6x + 10$ on $0 \leq x \leq 5$, the end values are 10 and 5, but the least value is 1 at the vertex.
:::

:::mistake{title="Including the asymptote value"}
$\mathrm{e}^x + 3$ never equals 3, so its range is $f(x) > 3$, not $f(x) \geq 3$.
:::

:::mistake{title="Confusing many-one with not a function"}
A many-one mapping (two inputs, one output) **is** a function. A one-many mapping (one input, two outputs) is not.
:::

## Exam tips

:::exam-tip
When asked to "explain why" a mapping is or is not a function, refer to the definition with a specific value: "the input 9 has two images, 3 and $-3$".
:::

:::exam-tip
For a range on a restricted domain, sketch the graph over that domain first. It takes seconds and shows whether a turning point matters.
:::

:::exam-tip
Use the correct inequality signs: strict ($>$) for asymptote values that are never reached, non-strict ($\geq$) for values that are reached.
:::

## Summary

:::summary
- A function maps every input in its domain to exactly one output.
- One-one: different inputs give different outputs; many-one: some outputs are shared.
- The range is the set of outputs; write it in terms of $f(x)$.
- For quadratics, use the completed square and check whether the vertex is in the domain.
- $\mathrm{e}^x > 0$ for all $x$; $\ln x$ needs $x > 0$ and takes all real values.
- Restricting the domain to one side of a vertex makes a quadratic one-one.
:::
