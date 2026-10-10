---
{
  "key": "functions.domain-range",
  "title": "Functions and relations: mappings, domain and range",
  "summary": "Define a function as a mapping, find the range of a function on a given domain, decide whether a function is one-one, and (ZIMSEC) classify relations and functions as injective, surjective or bijective.",
  "concepts": ["amaths.functions.domain-range"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A function is a rule that takes an input and gives exactly one output. You have used functions for years without the formal language: the ZESA bill as a function of units used, the height of a stone as a function of time. At A Level the language becomes precise, because questions on inverses, composite functions and graphs depend on knowing exactly which inputs are allowed (the **domain**) and which outputs are produced (the **range**).

ZIMSEC Pure Mathematics (Form 5, *Relations*) defines relations and functions with domain, co-domain and range, and classifies functions as injective, surjective or bijective. Cambridge 9709 (Paper 1, topic 1.2) uses function, domain, range and one-one function, and asks you to find ranges in simple cases. Completing the square, from the quadratics lessons, is the main tool.

## Key definitions

:::definition{term="Relation and mapping"}
A **relation** pairs elements of one set (the domain) with elements of another. A relation can be one-one, one-many, many-one or many-many.
:::

:::definition{term="Function"}
A relation in which **every** element of the domain is mapped to **exactly one** output. So one-one and many-one relations can be functions; one-many relations cannot. We write $f : x \mapsto 2x + 1$ or $f(x) = 2x + 1$, together with the domain, for example $x \in \mathbb{R}$ or $x \geq 0$.
:::

:::definition{term="Domain, co-domain and range"}
The **domain** is the set of allowed inputs. The **range** is the set of outputs actually produced. ZIMSEC also uses the **co-domain**, the set the outputs are declared to lie in, written $f : A \to B$; the range is a subset of the co-domain.
:::

:::definition{term="One-one (injective) function"}
A function in which different inputs always give different outputs: $f(a) = f(b) \Rightarrow a = b$. Its graph is cut **at most once** by every horizontal line.
:::

:::definition{term="Surjective and bijective (ZIMSEC)"}
$f : A \to B$ is **surjective** (onto) if its range is the whole co-domain $B$. It is **bijective** if it is both injective and surjective.
:::

## Finding the range

The range depends on the domain as much as on the rule. The safest method is to **sketch the graph over the given domain** and read off the lowest and highest $y$-values. For quadratics, complete the square to locate the vertex.

:::worked-solution[Example 1: find the range of $f(x) = \dfrac{1}{x}$ for $x \geq 2$]
1. For $x > 0$, $\frac{1}{x}$ decreases as $x$ increases.
2. At $x = 2$, $f(2) = \frac{1}{2}$, the greatest value.
3. As $x$ grows, $\frac{1}{x}$ gets closer and closer to $0$ but never reaches it.
4. Range: $0 < f(x) \leq \dfrac{1}{2}$.
:::

:::worked-solution[Example 2: the range of $f(x) = x^{2} - 4x + 7$ for (a) $x \in \mathbb{R}$ and (b) $0 \leq x \leq 5$]
1. Complete the square: $f(x) = (x - 2)^{2} + 3$, so the vertex is the minimum point $(2, 3)$.
2. (a) Over all real numbers, $(x - 2)^{2} \geq 0$, so the range is $f(x) \geq 3$.
3. (b) The vertex $x = 2$ lies inside $0 \leq x \leq 5$, so the least value is $3$.
4. Check the ends: $f(0) = 7$ and $f(5) = 25 - 20 + 7 = 12$. The greatest value is $12$.
5. Range for (b): $3 \leq f(x) \leq 12$.
:::

A common trap in (b) is to evaluate only the end points, giving $7 \leq f(x) \leq 12$. Always ask whether the turning point is inside the domain.

:::worked-solution[Example 3: find the range of $f(x) = 3 - \dfrac{2}{x + 1}$ for $x \geq 0$]
1. For $x \geq 0$, $x + 1 \geq 1$, so $0 < \dfrac{2}{x + 1} \leq 2$.
2. Subtract from 3 (this reverses the inequalities): $3 - 2 \leq f(x) < 3 - 0$.
3. Range: $1 \leq f(x) < 3$. The value $1$ is reached at $x = 0$; the value $3$ is approached but never reached.
:::

## One-one functions

A function needs to be one-one to have an inverse, so this test matters for the next lesson.

- **Graph test:** if some horizontal line meets the graph twice, the function is not one-one.
- **Algebraic test:** find two different inputs with the same output (to show it is not one-one), or show $f(a) = f(b)$ forces $a = b$.

:::worked-solution[Example 4: is $f(x) = x^{2} - 4x + 7$ one-one?]
1. For $x \in \mathbb{R}$: $f(1) = 4$ and $f(3) = 4$, two inputs with the same output. Not one-one.
2. This happens because the graph is symmetrical about $x = 2$.
3. For the domain $x \geq 2$, the graph is only the right half of the parabola, which is always increasing, so every horizontal line meets it at most once: one-one.
:::

Restricting the domain to one side of the vertex is the standard way to make a quadratic one-one.

## Injective, surjective, bijective (ZIMSEC)

With a stated co-domain, ask two questions: does each output come from at most one input (injective), and is every element of the co-domain actually reached (surjective)?

:::worked-solution[Example 5: classify three functions]
1. $f : \mathbb{R} \to \mathbb{R}$, $f(x) = 2x + 1$. Different inputs give different outputs, and any $y$ is reached by $x = \frac{y - 1}{2}$. **Bijective.**
2. $g : \mathbb{R} \to \mathbb{R}$, $g(x) = x^{2}$. $g(-2) = g(2)$, so not injective; $-1$ is never reached, so not surjective. **Neither.**
3. $h : \mathbb{R} \to \{y : y \geq 0\}$, $h(x) = x^{2}$. Every non-negative $y$ is reached by $x = \sqrt{y}$, so it is **surjective**, but still not injective.
:::

Changing the co-domain changes surjectivity; changing the domain can change injectivity. Only a bijection has an inverse function defined on the whole co-domain.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge uses "one-one function" and does not use the words co-domain, injective, surjective or bijective. ZIMSEC uses all of them and also asks you to describe types of relation (one-one, one-many, many-one, many-many).
:::

## Common mistakes

:::mistake{title="Ignoring the domain when finding the range"}
The range of $x^{2} - 4x + 7$ is $f(x) \geq 3$ only when the domain includes $x = 2$. On $x \geq 4$ it is $f(x) \geq 7$.
:::

:::mistake{title="Using x instead of f(x)"}
The range is a statement about outputs: write "$f(x) \geq 3$" (or $y \geq 3$), not "$x \geq 3$".
:::

:::mistake{title="Calling a one-many relation a function"}
$y = \pm\sqrt{x}$ gives two outputs for each $x > 0$, so it is a relation but not a function.
:::

:::mistake{title="Strict and non-strict inequalities"}
$\frac{1}{x}$ for $x \geq 2$ reaches $\frac{1}{2}$ but never $0$: $0 < f(x) \leq \frac{1}{2}$. Decide at each end whether the value is attained.
:::

## Exam tips

:::exam-tip
"State the range" usually expects a short answer such as $f(x) \geq -5$. Use the completed-square form from an earlier part.
:::

:::exam-tip
To show a function is not one-one, a single counter-example with numbers ($f(1) = f(3) = 4$) earns full credit.
:::

:::exam-tip
When asked for the largest domain on which a quadratic is one-one, the answer is always one side of the vertex: $x \geq h$ or $x \leq h$.
:::

## Summary

:::summary
- A function maps every input in its domain to exactly one output; the range is the set of outputs.
- Find ranges by sketching over the given domain; complete the square for quadratics and check whether the vertex is inside the domain.
- One-one: every horizontal line meets the graph at most once.
- ZIMSEC: injective = one-one; surjective = range equals co-domain; bijective = both.
- Restricting the domain to one side of a turning point makes a function one-one.
:::
