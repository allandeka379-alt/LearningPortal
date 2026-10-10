---
{
  "key": "series.maclaurin-taylor",
  "title": "Maclaurin and Taylor series",
  "summary": "Find Maclaurin series by repeated differentiation, use the standard series for eˣ, sin x, cos x, ln(1 + x) and (1 + x)ⁿ with their ranges of validity, build series of products and composite functions, find Taylor series about x = a, and use series for approximations and limits.",
  "concepts": ["amaths.series.maclaurin-taylor"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

How does a calculator find $\sin 0.3$ or $\mathrm{e}^{0.2}$? It does not draw a triangle. It adds up a few terms of a power series: a polynomial that matches the function very closely near a chosen point. Maclaurin series are built at $x = 0$; Taylor series are built at any point $x = a$. They turn hard functions into polynomials, which are easy to evaluate, multiply, differentiate and integrate.

This topic is ZIMSEC Pure Mathematics (series, Form 6). Questions ask you to derive a series by differentiation ("show that the first three non-zero terms are…"), to use standard series to expand products and composites such as $\mathrm{e}^x\sin x$ or $\ln(1 + 2x)$, to state ranges of validity, to find Taylor series about a point, and to estimate values or limits.

## Key definitions

:::definition{term="Maclaurin series"}
The power series of $f(x)$ about $x = 0$, whose coefficients come from the derivatives of $f$ at 0.
:::

:::definition{term="Taylor series"}
The power series of $f(x)$ about $x = a$, written in powers of $(x - a)$. A Maclaurin series is the Taylor series with $a = 0$.
:::

:::formula{name="Maclaurin and Taylor series"}
$$
f(x) = f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \frac{f'''(0)}{3!}x^3 + \cdots
$$

$$
f(x) = f(a) + f'(a)(x - a) + \frac{f''(a)}{2!}(x - a)^2 + \frac{f'''(a)}{3!}(x - a)^3 + \cdots
$$
:::

:::formula{name="Standard series and their validity"}
$$
\mathrm{e}^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots \ (\text{all } x) \qquad \ln(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots \ (-1 < x \le 1)
$$

$$
\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots \qquad \cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots \ (\text{all } x, \text{ in radians})
$$
:::

The binomial series $(1 + x)^n = 1 + nx + \frac{n(n - 1)}{2!}x^2 + \cdots$ ($|x| < 1$) is also a Maclaurin series. ZIMSEC prints no formula list, so learn these.

## Deriving a Maclaurin series

Differentiate repeatedly, evaluate each derivative at $x = 0$, and substitute into the formula. The pattern of the derivatives often repeats, which gives the general term.

:::worked-solution[Example 1: derive the Maclaurin series of $\mathrm{e}^x$ and of $\cos x$ up to the term in $x^4$]
1. $f(x) = \mathrm{e}^x$: every derivative is $\mathrm{e}^x$, so every derivative at 0 equals 1.
2. $\mathrm{e}^x = 1 + x + \dfrac{x^2}{2!} + \dfrac{x^3}{3!} + \dfrac{x^4}{4!} + \cdots$
3. $f(x) = \cos x$: $f' = -\sin x$, $f'' = -\cos x$, $f''' = \sin x$, $f^{(4)} = \cos x$.
4. At 0: $1, 0, -1, 0, 1$.
5. $\cos x = 1 - \dfrac{x^2}{2!} + \dfrac{x^4}{4!} - \cdots$: only even powers, as expected for an even function.
:::

## Using standard series

It is usually quicker to substitute into a standard series than to differentiate. Replace $x$ by the new expression **throughout**, in brackets, and adjust the range of validity.

:::worked-solution[Example 2: expand $\ln(1 + 2x)$ up to the term in $x^3$ and state the range of validity]
1. Replace $x$ by $2x$ in $\ln(1 + x) = x - \dfrac{x^2}{2} + \dfrac{x^3}{3} - \cdots$
2. $\ln(1 + 2x) = 2x - \dfrac{(2x)^2}{2} + \dfrac{(2x)^3}{3} = 2x - 2x^2 + \dfrac{8x^3}{3} - \cdots$
3. Valid for $-1 < 2x \le 1$, i.e. $-\dfrac{1}{2} < x \le \dfrac{1}{2}$.
:::

## Products and composites

To expand a product, multiply the two series and keep only the powers you need. For a composite such as $\mathrm{e}^{\sin x}$, substitute one series into the other and collect terms carefully.

:::worked-solution[Example 3: find the Maclaurin series of $\mathrm{e}^x\sin x$ up to the term in $x^3$]
1. $\mathrm{e}^x = 1 + x + \dfrac{x^2}{2} + \cdots$ and $\sin x = x - \dfrac{x^3}{6} + \cdots$
2. Multiply, keeping powers up to $x^3$: $x \cdot 1 + x \cdot x + x \cdot \dfrac{x^2}{2} - \dfrac{x^3}{6} \cdot 1$.
3. $\mathrm{e}^x\sin x = x + x^2 + \left(\dfrac{1}{2} - \dfrac{1}{6}\right)x^3 = x + x^2 + \dfrac{x^3}{3} + \cdots$
:::

## Approximations and limits

Near the centre of the series, a few terms give an excellent approximation. Series also find limits of the form $\frac{0}{0}$: expand the numerator and denominator, cancel the lowest power, and let $x \to 0$.

:::worked-solution[Example 4: estimate $\mathrm{e}^{0.1}$ using four terms, and find $\displaystyle\lim_{x \to 0}\frac{1 - \cos x}{x^2}$]
1. $\mathrm{e}^{0.1} \approx 1 + 0.1 + \dfrac{0.01}{2} + \dfrac{0.001}{6} = 1.105167$ (calculator: $1.1051709$).
2. $1 - \cos x = \dfrac{x^2}{2} - \dfrac{x^4}{24} + \cdots$, so $\dfrac{1 - \cos x}{x^2} = \dfrac{1}{2} - \dfrac{x^2}{24} + \cdots$
3. As $x \to 0$ the limit is $\dfrac{1}{2}$.
:::

## Taylor series about x = a

To approximate $f$ near a point $a$ where $f$ is known exactly, use the Taylor series about $a$. Functions such as $\ln x$ and $\sqrt{x}$ have no Maclaurin series (they misbehave at 0), but they have Taylor series about $a = 1$ or $a = 4$.

:::worked-solution[Example 5: find the Taylor series of $\sqrt{x}$ about $x = 4$ up to the term in $(x - 4)^2$, and estimate $\sqrt{4.1}$]
1. $f(x) = x^{\frac{1}{2}}$, $f'(x) = \frac{1}{2}x^{-\frac{1}{2}}$, $f''(x) = -\frac{1}{4}x^{-\frac{3}{2}}$.
2. At $x = 4$: $f(4) = 2$, $f'(4) = \frac{1}{4}$, $f''(4) = -\frac{1}{32}$.
3. $\sqrt{x} \approx 2 + \dfrac{1}{4}(x - 4) - \dfrac{1}{64}(x - 4)^2$.
4. With $x = 4.1$: $2 + 0.025 - 0.00015625 = 2.02484375$ (calculator: $2.0248457$).
:::

## A series from awkward derivatives

:::worked-solution[Example 6: show that the Maclaurin series of $\tan x$ begins $x + \dfrac{x^3}{3}$]
1. $f(x) = \tan x$, $f(0) = 0$.
2. $f'(x) = \sec^2 x$, so $f'(0) = 1$.
3. $f''(x) = 2\sec^2 x\tan x$, so $f''(0) = 0$.
4. $f'''(x) = 2\sec^4 x + 4\sec^2 x\tan^2 x$ (product rule), so $f'''(0) = 2$.
5. $\tan x = 0 + x + 0 + \dfrac{2}{3!}x^3 + \cdots = x + \dfrac{x^3}{3} + \cdots$
:::

These results confirm the small-angle approximations met earlier: $\sin x \approx x$, $\tan x \approx x$ and $\cos x \approx 1 - \frac{x^2}{2}$ are just the first terms of the Maclaurin series.

## Common mistakes

:::mistake{title="Forgetting the factorials"}
The coefficient of $x^r$ is $\frac{f^{(r)}(0)}{r!}$, not $f^{(r)}(0)$.
:::

:::mistake{title="Substituting without brackets"}
In $\mathrm{e}^{3x}$ the $x^2$ term is $\frac{(3x)^2}{2} = \frac{9x^2}{2}$, not $\frac{3x^2}{2}$.
:::

:::mistake{title="Degrees instead of radians"}
The series for $\sin x$ and $\cos x$ need $x$ in radians: $\sin 31^\circ$ uses $x = \frac{31\pi}{180}$.
:::

:::mistake{title="Ignoring the range of validity"}
$\ln(1 + x)$'s series is valid only for $-1 < x \le 1$; it cannot be used directly for $\ln 3$.
:::

## Exam tips

:::exam-tip
In "show that" questions, show each derivative and its value at 0 (or at $a$) before writing the series.
:::

:::exam-tip
When multiplying series, write down only the products that give powers up to the one required.
:::

:::exam-tip
State the range of validity whenever you substitute into $\ln(1 + x)$ or $(1 + x)^n$.
:::

## Summary

:::summary
- Maclaurin: $f(x) = \sum \frac{f^{(r)}(0)}{r!}x^r$; Taylor about $a$: $\sum \frac{f^{(r)}(a)}{r!}(x - a)^r$.
- $\mathrm{e}^x$, $\sin x$, $\cos x$ are valid for all $x$; $\ln(1 + x)$ for $-1 < x \le 1$; $(1 + x)^n$ for $|x| < 1$.
- Substitute with brackets; multiply series keeping only the powers needed.
- Use a few terms near the centre for approximations, and series to find $\frac{0}{0}$ limits.
- Use a Taylor series about a convenient point $a$ when the function has no Maclaurin series or $x$ is far from 0.
:::
