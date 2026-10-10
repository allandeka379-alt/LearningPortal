---
{
  "key": "diff.powers-chain",
  "title": "Differentiating powers of x and the chain rule",
  "summary": "Differentiate xⁿ for any rational n with constant multiples, sums and differences, differentiate composite functions such as √(2x³ + 5) and (3 − 2x)⁻⁴ by the chain rule, and find second derivatives.",
  "concepts": ["amaths.diff.powers-chain"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Differentiating from first principles shows what a derivative is, but it is slow. In practice you use a handful of rules that turn differentiation into quick algebra. This lesson gives the two rules you will use most: the **power rule** for $x^{n}$ and the **chain rule** for a function of a function.

A Masvingo engineer modelling the flow from a borehole pump, or an economist modelling the cost of maize storage, writes expressions like $\sqrt{2x^{3} + 5}$ or $\dfrac{8}{(3 - 2x)^{4}}$ every day. With these two rules you can find their gradients in a line or two.

Both boards examine this: ZIMSEC Pure Mathematics (Form 5) and Cambridge 9709 Paper 1 (topic 1.7). Every later calculus topic uses it. You should know the laws of indices: $\sqrt{x} = x^{\frac{1}{2}}$, $\dfrac{1}{x^{3}} = x^{-3}$ and $x^{a} \times x^{b} = x^{a + b}$.

## Key definitions

:::formula{name="The power rule"}
$$
\frac{d}{dx}\left(x^{n}\right) = nx^{n - 1} \quad \text{for any rational } n
$$

Constant multiples and sums: $\dfrac{d}{dx}\big(af(x) + bg(x)\big) = af'(x) + bg'(x)$, and the derivative of a constant is 0. The derivative of $x^{n}$ appears in Cambridge's formula list MF19, but you should know it by heart.
:::

:::formula{name="The chain rule"}
If $y$ is a function of $u$ and $u$ is a function of $x$, then

$$
\frac{dy}{dx} = \frac{dy}{du} \times \frac{du}{dx}.
$$

In particular $\dfrac{d}{dx}\big[(ax + b)^{n}\big] = an(ax + b)^{n - 1}$. The chain rule is not printed in MF19.
:::

:::definition{term="Composite function"}
A function of a function, such as $y = \sqrt{2x^{3} + 5}$: the **inner** function is $u = 2x^{3} + 5$ and the **outer** function is $y = \sqrt{u}$.
:::

## Using the power rule

The rule needs every term in the form $kx^{n}$. So the first job is often to **rewrite** roots and fractions as powers:

| Written as | Rewrite as | Derivative |
| --- | --- | --- |
| $\sqrt{x}$ | $x^{\frac{1}{2}}$ | $\frac{1}{2}x^{-\frac{1}{2}}$ |
| $\dfrac{5}{x^{2}}$ | $5x^{-2}$ | $-10x^{-3}$ |
| $\dfrac{1}{\sqrt{x}}$ | $x^{-\frac{1}{2}}$ | $-\frac{1}{2}x^{-\frac{3}{2}}$ |
| $\sqrt[3]{x^{2}}$ | $x^{\frac{2}{3}}$ | $\frac{2}{3}x^{-\frac{1}{3}}$ |

When you subtract 1 from a negative power, the power becomes **more negative**: $-2 - 1 = -3$.

:::worked-solution[Example 1: differentiate $y = 4x^{3} - 6\sqrt{x} + \dfrac{5}{x^{2}}$ and find the gradient at $x = 1$]
1. Rewrite: $y = 4x^{3} - 6x^{\frac{1}{2}} + 5x^{-2}$.
2. Differentiate term by term: $\dfrac{dy}{dx} = 12x^{2} - 3x^{-\frac{1}{2}} - 10x^{-3}$.
3. In surd form: $\dfrac{dy}{dx} = 12x^{2} - \dfrac{3}{\sqrt{x}} - \dfrac{10}{x^{3}}$.
4. At $x = 1$: $12 - 3 - 10 = -1$.
:::

A product or quotient of simple terms can often be **expanded or divided out first**, so that only the power rule is needed.

:::worked-solution[Example 2: find where the gradient of $y = \dfrac{(x + 2)^{2}}{x}$ is zero]
1. Expand the numerator: $(x + 2)^{2} = x^{2} + 4x + 4$.
2. Divide each term by $x$: $y = x + 4 + 4x^{-1}$.
3. Differentiate: $\dfrac{dy}{dx} = 1 - 4x^{-2} = 1 - \dfrac{4}{x^{2}}$.
4. Set it to zero: $x^{2} = 4$, so $x = 2$ or $x = -2$.
:::

## The chain rule

You cannot expand $\sqrt{2x^{3} + 5}$, so you need a new idea. Let $u = 2x^{3} + 5$; then $y = u^{\frac{1}{2}}$. A small change in $x$ changes $u$, which in turn changes $y$, and the rates multiply:

$$
\frac{dy}{dx} = \frac{dy}{du} \times \frac{du}{dx}.
$$

In words: **differentiate the outer function, keep the inner function unchanged inside it, then multiply by the derivative of the inner function.**

:::worked-solution[Example 3: differentiate $y = \sqrt{2x^{3} + 5}$]
1. Let $u = 2x^{3} + 5$, so $y = u^{\frac{1}{2}}$.
2. $\dfrac{dy}{du} = \frac{1}{2}u^{-\frac{1}{2}}$ and $\dfrac{du}{dx} = 6x^{2}$.
3. $\dfrac{dy}{dx} = \frac{1}{2}(2x^{3} + 5)^{-\frac{1}{2}} \times 6x^{2} = \dfrac{3x^{2}}{\sqrt{2x^{3} + 5}}$.
4. For example, at $x = 1$ the gradient is $\dfrac{3}{\sqrt{7}} \approx 1.13$.
:::

With practice you skip the letter $u$ and write the answer directly.

:::worked-solution[Example 4: differentiate $y = (3 - 2x)^{-4}$]
1. Outer function: power $-4$, giving $-4(3 - 2x)^{-5}$.
2. Inner function: $3 - 2x$, whose derivative is $-2$.
3. Multiply: $\dfrac{dy}{dx} = -4(3 - 2x)^{-5} \times (-2) = 8(3 - 2x)^{-5} = \dfrac{8}{(3 - 2x)^{5}}$.
4. At $x = 1$: $\dfrac{8}{1^{5}} = 8$.
:::

The two minus signs multiply to give a plus. Losing one of them is the most common error with $(a - bx)^{n}$.

## Second derivatives

Differentiate the first derivative again to get $\dfrac{d^{2}y}{dx^{2}}$. Use the same rules, and simplify $\dfrac{dy}{dx}$ first.

:::worked-solution[Example 5: an exam-style question]
Given $f(x) = (2x + 1)^{\frac{3}{2}}$, find $f'(x)$ and $f''(x)$, and show that $f''(4) = 1$.

1. Chain rule: $f'(x) = \frac{3}{2}(2x + 1)^{\frac{1}{2}} \times 2 = 3(2x + 1)^{\frac{1}{2}}$.
2. Again: $f''(x) = 3 \times \frac{1}{2}(2x + 1)^{-\frac{1}{2}} \times 2 = 3(2x + 1)^{-\frac{1}{2}}$.
3. At $x = 4$: $2x + 1 = 9$, so $f''(4) = \dfrac{3}{\sqrt{9}} = \dfrac{3}{3} = 1$, as required.
4. Also $f'(4) = 3\sqrt{9} = 9$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine the power rule for rational $n$, the chain rule and second derivatives at the same depth: ZIMSEC Pure Mathematics Form 5 and Cambridge Paper 1 (also used throughout Papers 2 and 3).
:::

## Common mistakes

:::mistake{title="Forgetting the inner derivative"}
$\dfrac{d}{dx}(5x - 1)^{4} = 4(5x - 1)^{3} \times 5 = 20(5x - 1)^{3}$, not $4(5x - 1)^{3}$. Always multiply by the derivative of the bracket.
:::

:::mistake{title="Differentiating a fraction top and bottom"}
$\dfrac{d}{dx}\left(\dfrac{x^{2} + 3}{x}\right)$ is not $\dfrac{2x}{1}$. Divide out first ($x + 3x^{-1}$), then differentiate: $1 - 3x^{-2}$.
:::

:::mistake{title="Negative powers going the wrong way"}
$\dfrac{d}{dx}(x^{-3}) = -3x^{-4}$, not $-3x^{-2}$. Subtracting 1 from $-3$ gives $-4$.
:::

:::mistake{title="Leaving roots in the denominator unconverted"}
$\dfrac{6}{\sqrt{x}}$ is $6x^{-\frac{1}{2}}$. Writing it as $6x^{\frac{1}{2}}$ (forgetting the minus) gives the wrong sign and power.
:::

## Exam tips

:::exam-tip
Show the rewritten form (powers of $x$) before differentiating. If you make an arithmetic slip later, the method mark is still earned.
:::

:::exam-tip
"Find $\frac{dy}{dx}$" usually accepts any correct unsimplified form, but if the next part uses the derivative, simplify it first: a tidy $\frac{dy}{dx}$ makes the second derivative and any equation much easier.
:::

:::exam-tip
Give exact gradients as fractions or surds unless the question asks for decimals; for decimals, use 3 significant figures.
:::

## Summary

:::summary
- Power rule: $\frac{d}{dx}(x^{n}) = nx^{n - 1}$ for any rational $n$; rewrite roots and fractions as powers first.
- Differentiate sums and constant multiples term by term; the derivative of a constant is 0.
- Chain rule: $\frac{dy}{dx} = \frac{dy}{du} \times \frac{du}{dx}$; for brackets, $\frac{d}{dx}(ax + b)^{n} = an(ax + b)^{n - 1}$.
- Second derivative: differentiate the simplified first derivative again.
- Watch the signs with $(a - bx)^{n}$ and with negative powers.
:::
