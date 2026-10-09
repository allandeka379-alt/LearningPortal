---
{
  "key": "calculus.chain-rule",
  "title": "The chain rule for composite functions",
  "summary": "Differentiate composite functions such as (3x² + 4)⁵, 4/(2 − 5x)³ and √(x² + 9) with the chain rule, dy/dx = dy/du × du/dx, using either a substitution or the quick 'outside then inside' method.",
  "concepts": ["amath.calculus.chain-rule"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

How would you differentiate $y = (3x^2 + 4)^5$? You could expand the bracket, but that produces six terms with large coefficients, and $\sqrt{x^2 + 9}$ cannot be expanded at all. The **chain rule** differentiates a "function of a function" in one step, without expanding.

The idea is about linked rates. If $y$ changes 5 times as fast as $u$, and $u$ changes 3 times as fast as $x$, then $y$ changes $5 \times 3 = 15$ times as fast as $x$. Rates along a chain multiply. The same rule is used later for connected rates of change (how fast the water level in a cone-shaped tank rises), and in the next lessons for $\mathrm{e}^{3x - 1}$, $\ln(2x + 5)$ and $\sin 3x$.

Both ZIMSEC and Cambridge expect the chain rule. Cambridge lists it explicitly with the standard derivatives; it appears in almost every 0606 calculus question, often combined with the product or quotient rule.

## Key definitions

:::definition{term="Composite function"}
A function of a function, such as $y = (3x^2 + 4)^5$: an **inner** function $u = 3x^2 + 4$ is put into an **outer** function $y = u^5$.
:::

:::formula{name="Chain rule (not in Cambridge's List of formulas)"}
$$
\frac{dy}{dx} = \frac{dy}{du} \times \frac{du}{dx}
$$
:::

:::formula{name="Powers of a function"}
$$
\frac{d}{dx}\Big(\big[f(x)\big]^n\Big) = n\big[f(x)\big]^{n-1} \times f'(x)
$$

In particular, for a linear inner function: $\dfrac{d}{dx}\left[(ax + b)^n\right] = an(ax + b)^{n-1}$.
:::

## Method 1: substitution

Name the inner function $u$, differentiate both links, multiply, and finally replace $u$ by its expression in $x$.

:::worked-solution[Example 1: differentiate $y = (3x^2 + 4)^5$]
1. Let $u = 3x^2 + 4$, so $y = u^5$.
2. $\dfrac{dy}{du} = 5u^4$ and $\dfrac{du}{dx} = 6x$.
3. $\dfrac{dy}{dx} = \dfrac{dy}{du} \times \dfrac{du}{dx} = 5u^4 \times 6x$.
4. Replace $u$: $\dfrac{dy}{dx} = 30x(3x^2 + 4)^4$.
:::

The answer must be in terms of $x$ only. Leaving $u$ in the final line loses the accuracy mark.

Why does multiplying work? Give $x$ a small increase $\delta x$. Then $u$ changes by a small amount $\delta u$, and that in turn changes $y$ by $\delta y$. For non-zero changes, ordinary fractions cancel:

$$
\frac{\delta y}{\delta x} = \frac{\delta y}{\delta u} \times \frac{\delta u}{\delta x}
$$

As $\delta x \to 0$, $\delta u \to 0$ too, and each ratio of small changes becomes the matching derivative. This is not a formal proof, but it shows why the notation $\frac{dy}{du} \times \frac{du}{dx}$ behaves as if the $du$ cancelled, and it is a reliable way to remember which derivatives to multiply. The same "cancelling" idea appears again in connected rates of change, where $\frac{dV}{dt} = \frac{dV}{dr} \times \frac{dr}{dt}$.

## Method 2: outside, then inside

With practice you can skip the letter $u$. Say it in words: **differentiate the outside function, leaving the inside alone, then multiply by the derivative of the inside.**

:::worked-solution[Example 2: differentiate $y = \dfrac{4}{(2 - 5x)^3}$]
1. Rewrite as a power: $y = 4(2 - 5x)^{-3}$.
2. Outside: $4 \times (-3)(2 - 5x)^{-4} = -12(2 - 5x)^{-4}$.
3. Inside: $\dfrac{d}{dx}(2 - 5x) = -5$.
4. Multiply: $\dfrac{dy}{dx} = -12(2 - 5x)^{-4} \times (-5) = 60(2 - 5x)^{-4} = \dfrac{60}{(2 - 5x)^4}$.
:::

Notice that the two negative signs cancel. Forgetting the inner derivative $-5$ is the most common error with linear inner functions; it changes both the size and the sign of the answer.

## Roots of functions

Write the root as a power first, exactly as for a single power of $x$.

:::worked-solution[Example 3: find the gradient of $y = \sqrt{x^2 + 9}$ at the point $(4, 5)$]
1. $y = (x^2 + 9)^{\frac{1}{2}}$.
2. $\dfrac{dy}{dx} = \frac{1}{2}(x^2 + 9)^{-\frac{1}{2}} \times 2x = \dfrac{x}{\sqrt{x^2 + 9}}$.
3. At $x = 4$: $\dfrac{4}{\sqrt{16 + 9}} = \dfrac{4}{5}$.
4. The gradient at $(4, 5)$ is $\frac{4}{5}$.
:::

:::worked-solution[Example 4: given $y = \dfrac{1}{\sqrt{4x + 1}}$, show that $\dfrac{dy}{dx} = -\dfrac{2}{(4x + 1)^{\frac{3}{2}}}$ and find the gradient where $x = 2$]
1. $y = (4x + 1)^{-\frac{1}{2}}$.
2. $\dfrac{dy}{dx} = -\frac{1}{2}(4x + 1)^{-\frac{3}{2}} \times 4 = -2(4x + 1)^{-\frac{3}{2}}$.
3. So $\dfrac{dy}{dx} = -\dfrac{2}{(4x + 1)^{\frac{3}{2}}}$, as required.
4. At $x = 2$: $4x + 1 = 9$ and $9^{\frac{3}{2}} = 27$, so the gradient is $-\dfrac{2}{27}$.
:::

## When to use the chain rule

Look for a bracket (or a root) whose inside is more than just $x$, raised to a power. Then compare:

| Expression | Inner function | Derivative |
| --- | --- | --- |
| $(x^2 - 5)^3$ | $x^2 - 5$ | $3(x^2 - 5)^2 \times 2x = 6x(x^2 - 5)^2$ |
| $(7 - 2x)^6$ | $7 - 2x$ | $6(7 - 2x)^5 \times (-2) = -12(7 - 2x)^5$ |
| $\sqrt{1 + x^3}$ | $1 + x^3$ | $\frac{1}{2}(1 + x^3)^{-\frac{1}{2}} \times 3x^2 = \dfrac{3x^2}{2\sqrt{1 + x^3}}$ |

For the first row, the gradient at $x = 2$ is $6(2)(4 - 5)^2 = 12$. The chain rule also works with longer chains: for $y = \left[(x^2 + 1)^3 + 2\right]^4$ you multiply three derivatives, one for each layer, working from the outside in.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards use the chain rule in the form $\dfrac{dy}{dx} = \dfrac{dy}{du} \times \dfrac{du}{dx}$, and both accept either the substitution method or the direct method. Cambridge questions often ask for an answer "in the form $k x (3x^2 + 4)^n$" or similar, so be ready to tidy the constant and the power into a stated form.
:::

## Common mistakes

:::mistake{title="Forgetting the derivative of the inside"}
$\dfrac{d}{dx}(3x^2 + 4)^5$ is not $5(3x^2 + 4)^4$. The factor $6x$ from the inside is essential.
:::

:::mistake{title="Changing the inside function"}
Differentiate the outside function **leaving the inside unchanged**: the bracket in $5(3x^2 + 4)^4$ still contains $3x^2 + 4$, not $6x$.
:::

:::mistake{title="Sign of a linear inner function"}
For $(2 - 5x)^n$ the inner derivative is $-5$, not $5$. Track it carefully, especially with a negative power, where two negatives make a positive.
:::

:::mistake{title="Leaving u in the answer"}
After multiplying $\frac{dy}{du}$ by $\frac{du}{dx}$, substitute back so that the answer is in terms of $x$ only.
:::

## Exam tips

:::exam-tip
Show the two pieces separately, for example "$\frac{dy}{du} = 5u^4$, $\frac{du}{dx} = 6x$". If the final arithmetic slips, the method marks are still there.
:::

:::exam-tip
In "show that" questions, write the derivative in an intermediate form first, such as $-2(4x + 1)^{-\frac{3}{2}}$, and only then rewrite it in the given form. Every step must be visible.
:::

:::exam-tip
Without a calculator, evaluate powers like $9^{\frac{3}{2}}$ as $(\sqrt{9})^3 = 27$: root first, then power.
:::

## Summary

:::summary
- For a composite function, $\dfrac{dy}{dx} = \dfrac{dy}{du} \times \dfrac{du}{dx}$.
- Powers of a function: $\dfrac{d}{dx}[f(x)]^n = n[f(x)]^{n-1} f'(x)$; for $(ax + b)^n$ the extra factor is $a$.
- Rewrite roots and reciprocals as powers before differentiating.
- Outside first (leave the inside unchanged), then multiply by the derivative of the inside.
- Give the answer in terms of $x$ and simplify the constants.
:::
