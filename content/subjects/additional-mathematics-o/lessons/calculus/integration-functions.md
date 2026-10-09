---
{
  "key": "calculus.integration-functions",
  "title": "Integrating exponential, trigonometric and linear-composite functions",
  "summary": "Integrate (ax + b)ⁿ for any rational n, 1/x and 1/(ax + b), e^(ax + b), sin(ax + b), cos(ax + b) and (Cambridge) sec²(ax + b), with angles in radians, and use a derivative found earlier to integrate a product.",
  "concepts": ["amath.calculus.integration-functions"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

The power rule from the previous lesson integrates polynomials and roots. Real models need more: the temperature of a cooling borehole pump falls exponentially, the depth of water at the Kariba dam wall rises and falls with the seasons like a sine curve, and the rate at which a crop of maize near Chinhoyi takes up fertiliser may be modelled by $\frac{1}{x}$. This lesson gives the standard integrals for these functions.

Every result here is a derivative from your differentiation lessons **read backwards**, with one extra idea: when $x$ is replaced by a linear expression $ax + b$, divide by $a$. Both ZIMSEC and Cambridge examine these integrals; only Cambridge lists $\sec^2(ax + b)$.

You should know the derivatives of $e^x$, $\ln x$, $\sin x$, $\cos x$ and $\tan x$, and the chain rule.

## Key definitions

:::formula{name="Standard integrals (none of these is in Cambridge's List of formulas)"}
$$
\int (ax + b)^n\,dx = \frac{(ax + b)^{n+1}}{a(n + 1)} + c \quad (n \neq -1)
$$

$$
\int \frac{1}{x}\,dx = \ln x + c, \qquad \int \frac{1}{ax + b}\,dx = \frac{1}{a}\ln(ax + b) + c
$$

$$
\int e^{ax + b}\,dx = \frac{1}{a}e^{ax + b} + c
$$

$$
\int \sin(ax + b)\,dx = -\frac{1}{a}\cos(ax + b) + c, \qquad \int \cos(ax + b)\,dx = \frac{1}{a}\sin(ax + b) + c
$$

$$
\int \sec^2(ax + b)\,dx = \frac{1}{a}\tan(ax + b) + c
$$
:::

:::definition{term="Linear composite"}
A function of $ax + b$ rather than of $x$, such as $(3x - 2)^4$, $e^{2x + 1}$ or $\cos 5x$. Its integral is the integral of the outer function, divided by $a$, the coefficient of $x$.
:::

:::keyfact{title="Radians"}
The trigonometric integrals are true only when angles are measured in **radians**. Set your calculator to radians for every calculus question involving $\sin$, $\cos$ or $\tan$.
:::

## Why we divide by a

By the chain rule, $\dfrac{d}{dx}\left[(ax + b)^{n+1}\right] = a(n + 1)(ax + b)^n$. The factor $a$ appears when differentiating, so integrating must divide by it. The same happens with every outer function: $\dfrac{d}{dx}e^{4x} = 4e^{4x}$, so $\displaystyle\int e^{4x}\,dx = \frac{1}{4}e^{4x} + c$.

This shortcut works **only** when the inside is linear. $\displaystyle\int (x^2 + 1)^3\,dx$ is not $\frac{(x^2 + 1)^4}{4 \times 2x}$; that integrand must be expanded first.

:::worked-solution[Example 1: find $\displaystyle\int (3x - 2)^4\,dx$]
1. Treat $3x - 2$ as one block: raise the power to 5 and divide by 5, giving $\dfrac{(3x - 2)^5}{5}$.
2. Divide by $a = 3$, the coefficient of $x$: $\dfrac{(3x - 2)^5}{15}$.
3. $\displaystyle\int (3x - 2)^4\,dx = \frac{(3x - 2)^5}{15} + c$.
4. Check: $\dfrac{d}{dx}\dfrac{(3x - 2)^5}{15} = \dfrac{5 \times 3(3x - 2)^4}{15} = (3x - 2)^4$. ✓
:::

The same rule handles roots and reciprocals of linear expressions, as long as $n \neq -1$. For example, $\displaystyle\int \frac{1}{\sqrt{4x + 1}}\,dx = \int (4x + 1)^{-\frac{1}{2}}\,dx = \frac{(4x + 1)^{\frac{1}{2}}}{4 \times \frac{1}{2}} + c = \frac{1}{2}\sqrt{4x + 1} + c$.

## Logarithms and exponentials

The case $n = -1$ is the reciprocal: $\dfrac{d}{dx}\ln x = \dfrac{1}{x}$, so $\displaystyle\int \frac{1}{x}\,dx = \ln x + c$ for $x > 0$. With a linear denominator, divide by the coefficient of $x$: $\displaystyle\int \frac{6}{3x - 1}\,dx = 6 \times \frac{1}{3}\ln(3x - 1) + c = 2\ln(3x - 1) + c$.

:::worked-solution[Example 2: find $\displaystyle\int \left(e^{4x} + \frac{6}{3x - 1}\right)dx$]
1. $\displaystyle\int e^{4x}\,dx = \frac{1}{4}e^{4x}$ (divide by 4).
2. $\displaystyle\int \frac{6}{3x - 1}\,dx = 6 \times \frac{1}{3}\ln(3x - 1) = 2\ln(3x - 1)$.
3. Answer: $\dfrac{1}{4}e^{4x} + 2\ln(3x - 1) + c$, valid for $x > \frac{1}{3}$.
:::

When the coefficient of $x$ is negative, the division brings a minus sign: $\displaystyle\int \frac{6}{1 - 2x}\,dx = -3\ln|1 - 2x| + c$ and $\displaystyle\int e^{-x}\,dx = -e^{-x} + c$. The modulus sign keeps the logarithm defined when $1 - 2x$ is negative; at this level you may also state the values of $x$ for which the answer is valid.

## Sine, cosine and sec²

Reading derivatives backwards, and watching the signs:

| Derivative fact | Integral |
| --- | --- |
| $\frac{d}{dx}\sin x = \cos x$ | $\int \cos x\,dx = \sin x + c$ |
| $\frac{d}{dx}\cos x = -\sin x$ | $\int \sin x\,dx = -\cos x + c$ |
| $\frac{d}{dx}\tan x = \sec^2 x$ | $\int \sec^2 x\,dx = \tan x + c$ |

:::worked-solution[Example 3: find $\displaystyle\int \left(\cos 3x - 2\sin\frac{x}{2}\right)dx$]
1. $\displaystyle\int \cos 3x\,dx = \frac{1}{3}\sin 3x$.
2. $\displaystyle\int \sin\frac{x}{2}\,dx = -\frac{1}{\frac{1}{2}}\cos\frac{x}{2} = -2\cos\frac{x}{2}$.
3. So $\displaystyle\int -2\sin\frac{x}{2}\,dx = -2 \times \left(-2\cos\frac{x}{2}\right) = 4\cos\frac{x}{2}$.
4. Answer: $\dfrac{1}{3}\sin 3x + 4\cos\dfrac{x}{2} + c$.
:::

Cambridge also expects $\displaystyle\int \sec^2(ax + b)\,dx = \frac{1}{a}\tan(ax + b) + c$; for example $\displaystyle\int \sec^2 2x\,dx = \frac{1}{2}\tan 2x + c$. Combined with the identity $\tan^2 x = \sec^2 x - 1$, it also integrates $\tan^2 x$.

## Integrating a product with "hence"

There is no product rule for integration, but a product that came from the product rule can be integrated by reading that result backwards.

:::worked-solution[Example 4: (a) find $\dfrac{d}{dx}\left(xe^{2x}\right)$; (b) hence find $\displaystyle\int xe^{2x}\,dx$]
1. (a) Product rule: $\dfrac{d}{dx}\left(xe^{2x}\right) = e^{2x} + 2xe^{2x}$.
2. (b) Integrate both sides: $xe^{2x} = \displaystyle\int e^{2x}\,dx + \int 2xe^{2x}\,dx$.
3. $\displaystyle\int e^{2x}\,dx = \frac{1}{2}e^{2x}$, so $2\displaystyle\int xe^{2x}\,dx = xe^{2x} - \frac{1}{2}e^{2x}$.
4. Divide by 2: $\displaystyle\int xe^{2x}\,dx = \frac{1}{2}xe^{2x} - \frac{1}{4}e^{2x} + c$.
5. Check by differentiating: $\frac{1}{2}e^{2x} + xe^{2x} - \frac{1}{2}e^{2x} = xe^{2x}$. ✓
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC lists $x^n$ (including $n = -1$), $\sin x$, $\cos x$, $e^x$, $(ax + b)^n$, $e^{ax + b}$ and $\sin(ax + b)$; $\cos(ax + b)$ follows in the same way. Cambridge adds $\sec^2(ax + b)$ and requires exact answers on the non-calculator Paper 1, for example $\ln 3$ or $\frac{1}{2}(e^2 - 1)$.
:::

## Common mistakes

:::mistake{title="Multiplying by a instead of dividing"}
$\int e^{3x}\,dx = \frac{1}{3}e^{3x} + c$, not $3e^{3x} + c$. Multiplying by $a$ is what differentiation does.
:::

:::mistake{title="Wrong sign on sine"}
$\int \sin x\,dx = -\cos x + c$. The minus sign belongs to sine when integrating and to cosine when differentiating.
:::

:::mistake{title="Using the power rule on 1/x"}
$\int x^{-1}\,dx$ is not $\frac{x^0}{0}$. It is $\ln x + c$, and $\int \frac{1}{ax + b}\,dx = \frac{1}{a}\ln(ax + b) + c$.
:::

:::mistake{title="Degrees in calculus"}
$\int \cos x\,dx = \sin x + c$ only in radians. A calculator left in degree mode gives wrong values for every trigonometric integral.
:::

## Exam tips

:::exam-tip
Differentiate your answer to check it, especially the factor $\frac{1}{a}$ and the sign of each trigonometric term.
:::

:::exam-tip
On Cambridge Paper 1 leave answers exact: $\frac{1}{3}\ln 7$, not $0.649$. On calculator papers give 3 significant figures unless told otherwise.
:::

:::exam-tip
When part (a) asks for a derivative and part (b) says "hence integrate", rearrange the result of (a) so that the required integral stands alone.
:::

## Summary

:::summary
- For a linear inside $ax + b$, integrate the outer function and divide by $a$.
- $\int (ax + b)^n\,dx = \dfrac{(ax + b)^{n+1}}{a(n+1)} + c$ for $n \neq -1$; $\int \dfrac{1}{ax + b}\,dx = \dfrac{1}{a}\ln(ax + b) + c$.
- $\int e^{ax + b}\,dx = \dfrac{1}{a}e^{ax + b} + c$.
- $\int \sin(ax + b)\,dx = -\dfrac{1}{a}\cos(ax + b) + c$, $\int \cos(ax + b)\,dx = \dfrac{1}{a}\sin(ax + b) + c$, $\int \sec^2(ax + b)\,dx = \dfrac{1}{a}\tan(ax + b) + c$; radians throughout.
- A product from the product rule can be integrated by reading that derivative backwards.
:::
