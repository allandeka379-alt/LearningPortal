---
{
  "key": "functions.inverse",
  "title": "Inverse functions",
  "summary": "Decide when a function has an inverse and explain why one does not, restrict a domain so that it does, find f⁻¹(x) algebraically for linear, rational, quadratic, exponential and logarithmic functions, state its domain and range, and relate the graphs of f and f⁻¹ by reflection in y = x.",
  "concepts": ["amath.functions.inverse"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A phone company converts your airtime balance in US dollars into minutes of talk time with a formula. To answer "how many dollars do I need for 90 minutes?", you run the formula backwards. Running a function backwards is finding its **inverse**.

Inverse functions are examined every year by both boards, often together with composite functions. You will need them again for logarithms (the inverse of an exponential) and for trigonometry. You should be confident with domain, range, one-one functions, rearranging formulas and completing the square.

## Key definitions

:::definition{term="Inverse function"}
The inverse of a function $f$, written $f^{-1}$, reverses the effect of $f$: if $f(a) = b$ then $f^{-1}(b) = a$.
:::

:::keyfact{title="When does an inverse exist?"}
Only **one-one** functions have inverses. If $f$ is many-one, say $f(-2) = f(2) = 4$, then $f^{-1}(4)$ would have to be both $-2$ and $2$, which is not allowed for a function.
:::

:::keyfact{title="Domain and range swap"}
The domain of $f^{-1}$ is the range of $f$, and the range of $f^{-1}$ is the domain of $f$. Also $ff^{-1}(x) = x$ and $f^{-1}f(x) = x$.
:::

:::keyfact{title="Graphs"}
The graph of $y = f^{-1}(x)$ is the reflection of the graph of $y = f(x)$ in the line $y = x$, because swapping inputs and outputs swaps the coordinates of every point.
:::

$f^{-1}(x)$ is **not** $\dfrac{1}{f(x)}$. The index $-1$ here means "inverse function", not "reciprocal".

## Finding an inverse: the method

1. Write $y = f(x)$.
2. Rearrange to make $x$ the subject.
3. Swap: write $f^{-1}(x)$ with $x$ in place of $y$.
4. State the domain of $f^{-1}$ (the range of $f$).

:::worked-solution[Example 1: find $f^{-1}(x)$ for $f(x) = 4x - 7$, $x \in \mathbb{R}$]
1. $y = 4x - 7$.
2. $y + 7 = 4x$, so $x = \dfrac{y + 7}{4}$.
3. $f^{-1}(x) = \dfrac{x + 7}{4}$, for $x \in \mathbb{R}$.
4. Check: $f(3) = 5$ and $f^{-1}(5) = \frac{12}{4} = 3$.
:::

When $x$ appears twice, collect the $x$ terms on one side and factorise.

:::worked-solution[Example 2: find $f^{-1}(x)$ for $f(x) = \dfrac{2x + 1}{x - 3}$, $x \neq 3$]
1. $y = \dfrac{2x + 1}{x - 3}$, so $y(x - 3) = 2x + 1$.
2. $xy - 3y = 2x + 1$. Collect $x$ terms: $xy - 2x = 3y + 1$.
3. Factorise: $x(y - 2) = 3y + 1$, so $x = \dfrac{3y + 1}{y - 2}$.
4. $f^{-1}(x) = \dfrac{3x + 1}{x - 2}$, for $x \neq 2$.
:::

## Quadratics: restrict the domain first

A quadratic on all real numbers is many-one, so it has no inverse. Restricted to one side of its vertex it is one-one. Complete the square, then rearrange.

:::worked-solution[Example 3: $f(x) = (x - 1)^2 + 4$ for $x \geq 1$. Find $f^{-1}(x)$ and state its domain and range]
1. The vertex is $(1, 4)$ and the domain $x \geq 1$ is the right-hand half, so $f$ is one-one with range $f(x) \geq 4$.
2. $y = (x - 1)^2 + 4$, so $(x - 1)^2 = y - 4$.
3. $x - 1 = \pm\sqrt{y - 4}$. Since $x \geq 1$, $x - 1 \geq 0$: take the positive root.
4. $f^{-1}(x) = 1 + \sqrt{x - 4}$.
5. Domain of $f^{-1}$: $x \geq 4$ (the range of $f$). Range of $f^{-1}$: $f^{-1}(x) \geq 1$ (the domain of $f$).
:::

Choosing the sign of the square root is where most marks are lost: use the original domain to decide.

## Exponential and logarithmic functions

$\mathrm{e}^x$ and $\ln x$ are inverses of each other: $\ln(\mathrm{e}^x) = x$ and $\mathrm{e}^{\ln x} = x$ for $x > 0$. Use them to "undo" each other when rearranging.

:::worked-solution[Example 4: find the inverses of $f(x) = \mathrm{e}^{2x} + 3$, $x \in \mathbb{R}$, and $g(x) = \ln(x + 1)$, $x > -1$]
1. $y = \mathrm{e}^{2x} + 3$, so $\mathrm{e}^{2x} = y - 3$ and $2x = \ln(y - 3)$.
2. $f^{-1}(x) = \frac{1}{2}\ln(x - 3)$, for $x > 3$ (the range of $f$, since $\mathrm{e}^{2x} > 0$).
3. $y = \ln(x + 1)$, so $x + 1 = \mathrm{e}^y$ and $x = \mathrm{e}^y - 1$.
4. $g^{-1}(x) = \mathrm{e}^x - 1$, for $x \in \mathbb{R}$, with range $g^{-1}(x) > -1$.
:::

## Graphs of f and its inverse

To sketch $y = f^{-1}(x)$, reflect the graph of $y = f(x)$ in the line $y = x$. Intercepts swap: if $f$ crosses the $y$-axis at $(0, c)$, then $f^{-1}$ crosses the $x$-axis at $(c, 0)$. Asymptotes swap too: the horizontal asymptote $y = 3$ of $y = \mathrm{e}^{2x} + 3$ becomes the vertical asymptote $x = 3$ of its inverse.

For an **increasing** function, any point where the graphs of $f$ and $f^{-1}$ meet lies on the line $y = x$, so you can find it by solving $f(x) = x$.

:::worked-solution[Example 5: $f(x) = x^2 - 6$ for $x \geq 0$. Find the point where the graphs of $f$ and $f^{-1}$ meet]
1. $f$ is increasing on $x \geq 0$, so the graphs meet on $y = x$.
2. Solve $x^2 - 6 = x$: $x^2 - x - 6 = 0$, so $(x - 3)(x + 2) = 0$.
3. $x = 3$ (reject $x = -2$, which is outside the domain).
4. The graphs meet at $(3, 3)$. Check: $f(3) = 3$ and $f^{-1}(3) = \sqrt{3 + 6} = 3$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards ask you to find $f^{-1}(x)$ and to illustrate a function and its inverse graphically. Cambridge also asks you to "explain in words why a given function does not have an inverse" (answer: it is many-one, with an example) and expects the domain of $f^{-1}$ stated with correct notation.
:::

## Common mistakes

:::mistake{title="Writing the reciprocal"}
$f^{-1}(x)$ is the inverse function, not $\frac{1}{f(x)}$. For $f(x) = 4x - 7$, $f^{-1}(x) = \frac{x + 7}{4}$, not $\frac{1}{4x - 7}$.
:::

:::mistake{title="Wrong sign of the square root"}
For $f(x) = (x - 1)^2 + 4$, $x \geq 1$, the inverse is $1 + \sqrt{x - 4}$. For the domain $x \leq 1$ it would be $1 - \sqrt{x - 4}$.
:::

:::mistake{title="Forgetting the domain of the inverse"}
State it: the domain of $f^{-1}$ is the range of $f$. Many questions give a mark for it.
:::

:::mistake{title="Not collecting the x terms"}
In Example 2 you cannot make $x$ the subject until all the $x$ terms are on one side and $x$ is factorised out.
:::

## Exam tips

:::exam-tip
"Explain why $f$ has no inverse": say that $f$ is not one-one and give two inputs with the same output, e.g. "$f(-2) = f(2)$".
:::

:::exam-tip
Check your inverse with one number: choose $x$, find $f(x)$, then check that $f^{-1}$ takes you back.
:::

:::exam-tip
When asked to sketch $f$ and $f^{-1}$ on the same axes, draw the line $y = x$ and make the two graphs mirror images, with swapped intercepts and asymptotes labelled.
:::

## Summary

:::summary
- Only one-one functions have inverses; restrict a quadratic to one side of its vertex.
- Find $f^{-1}$: write $y = f(x)$, make $x$ the subject, then replace $y$ by $x$.
- Domain of $f^{-1}$ = range of $f$; range of $f^{-1}$ = domain of $f$.
- $\mathrm{e}^x$ and $\ln x$ undo each other.
- The graph of $f^{-1}$ is the reflection of the graph of $f$ in $y = x$; $ff^{-1}(x) = x$.
:::
