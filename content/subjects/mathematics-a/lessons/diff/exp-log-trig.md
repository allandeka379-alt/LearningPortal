---
{
  "key": "diff.exp-log-trig",
  "title": "Derivatives of exponential, logarithmic and trigonometric functions",
  "summary": "Differentiate eˣ, ln x, sin x, cos x and tan x with constant multiples, sums and composites such as e^(1 − x²), ln(3x + 2) and sin²3x, and (Cambridge Paper 3) tan⁻¹x.",
  "concepts": ["amaths.diff.exp-log-trig"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Polynomials are not enough to model the world. The charge on a ZESA capacitor, the cooling of a pot of sadza and the growth of a savings account follow **exponential** laws; sound and tides follow **trigonometric** ones; and **logarithms** turn up whenever you undo an exponential. This lesson adds these functions to your differentiation toolkit.

The good news is that there are only a few new facts to learn. Combined with the chain rule from the earlier lesson, they let you differentiate a huge range of functions.

ZIMSEC Pure Mathematics (Form 5) examines all of these functions. Cambridge 9709 examines them in Paper 2 (AS) and Paper 3 (A Level), topics 2.4 and 3.4; the derivative of $\tan^{-1}x$ is Paper 3 only.

You should know the chain rule, the laws of logarithms, and that $\ln$ means $\log_{\mathrm{e}}$.

## Key definitions

:::formula{name="Standard derivatives"}
$$
\frac{d}{dx}\left(\mathrm{e}^{x}\right) = \mathrm{e}^{x}, \qquad \frac{d}{dx}(\ln x) = \frac{1}{x}
$$

$$
\frac{d}{dx}(\sin x) = \cos x, \qquad \frac{d}{dx}(\cos x) = -\sin x, \qquad \frac{d}{dx}(\tan x) = \sec^{2}x
$$

All of these, and $\frac{d}{dx}(\tan^{-1}x) = \frac{1}{1 + x^{2}}$, are in Cambridge's formula list MF19. The trigonometric results need $x$ in **radians**.
:::

:::formula{name="With the chain rule"}
$$
\frac{d}{dx}\mathrm{e}^{f(x)} = f'(x)\,\mathrm{e}^{f(x)}, \qquad \frac{d}{dx}\ln f(x) = \frac{f'(x)}{f(x)}
$$

$$
\frac{d}{dx}\sin(ax + b) = a\cos(ax + b), \qquad \frac{d}{dx}\cos(ax + b) = -a\sin(ax + b), \qquad \frac{d}{dx}\tan(ax + b) = a\sec^{2}(ax + b)
$$
:::

:::definition{term="The number e"}
$\mathrm{e} \approx 2.718$ is the base for which the gradient of $y = \mathrm{e}^{x}$ equals its height at every point. That is why $\mathrm{e}^{x}$ is its own derivative.
:::

## Exponentials

The exponential function is its own derivative. With an inner function, the chain rule multiplies by the derivative of the power.

:::worked-solution[Example 1: differentiate $y = \mathrm{e}^{1 - x^{2}}$ and find the gradient at $x = 1$]
1. The power is $u = 1 - x^{2}$, with $\dfrac{du}{dx} = -2x$.
2. $\dfrac{dy}{dx} = -2x\,\mathrm{e}^{1 - x^{2}}$.
3. At $x = 1$: $-2 \times \mathrm{e}^{0} = -2$.
:::

Note that $\mathrm{e}^{3x}$ differentiates to $3\mathrm{e}^{3x}$, but $3^{x}$ is **not** an exponential in base e: it is $\mathrm{e}^{x\ln 3}$, so its derivative is $3^{x}\ln 3$.

## Logarithms

The derivative of $\ln f(x)$ is "the derivative of the inside over the inside". Before differentiating, use the laws of logarithms to simplify: it is often much quicker.

:::worked-solution[Example 2: differentiate $\ln(3x + 2)$ and $\ln\big((2x - 1)^{3}\big)$]
1. $\dfrac{d}{dx}\ln(3x + 2) = \dfrac{3}{3x + 2}$.
2. For the second, use the power law first: $\ln\big((2x - 1)^{3}\big) = 3\ln(2x - 1)$.
3. Then $\dfrac{d}{dx}\,3\ln(2x - 1) = 3 \times \dfrac{2}{2x - 1} = \dfrac{6}{2x - 1}$.
:::

A useful consequence: $\frac{d}{dx}\ln(kx) = \frac{1}{x}$ for any constant $k > 0$, because $\ln(kx) = \ln k + \ln x$ and $\ln k$ is a constant.

Logarithms of products and quotients split in the same way. To differentiate $\ln\big(x^{2}(x + 4)\big)$, write it as $2\ln x + \ln(x + 4)$ and differentiate each term, giving $\frac{2}{x} + \frac{1}{x + 4}$. This avoids the product rule entirely. Remember that $\ln f(x)$ is defined only where $f(x) > 0$, so state any restriction on $x$ when a question asks for the domain.

## Trigonometric functions

Work in radians. For a power of a trigonometric function, such as $\sin^{2}3x = (\sin 3x)^{2}$, use the chain rule twice: the square first, then the sine, then the $3x$.

:::worked-solution[Example 3: differentiate $y = \sin^{2}3x$]
1. Write $y = (\sin 3x)^{2}$.
2. Outer: $2\sin 3x$. Middle: $\dfrac{d}{dx}\sin 3x = 3\cos 3x$.
3. $\dfrac{dy}{dx} = 2\sin 3x \times 3\cos 3x = 6\sin 3x\cos 3x$.
4. With the double-angle formula $2\sin A\cos A = \sin 2A$: $\dfrac{dy}{dx} = 3\sin 6x$.
5. At $x = \dfrac{\pi}{12}$: $3\sin\dfrac{\pi}{2} = 3$.
:::

### Other trigonometric functions

You do not need new rules for $\sec x$, $\operatorname{cosec} x$ or $\cot x$: write them as powers of $\cos x$, $\sin x$ or $\tan x$ and use the chain rule. For example, $\sec x = (\cos x)^{-1}$, so

$$
\frac{d}{dx}\sec x = -(\cos x)^{-2} \times (-\sin x) = \frac{\sin x}{\cos^{2}x} = \sec x\tan x.
$$

In the same way $\frac{d}{dx}\operatorname{cosec} x = -\operatorname{cosec} x\cot x$ and $\frac{d}{dx}\cot x = -\operatorname{cosec}^{2}x$. Each derivative of a "co-" function carries a minus sign, which is an easy pattern to remember.

## Using the derivatives

These functions appear in the usual applications: tangents, normals, stationary points and rates of change. Equations such as $\mathrm{e}^{2x} = 3$ are solved with logarithms.

:::worked-solution[Example 4: an exam-style stationary point]
The curve $y = \mathrm{e}^{2x} - 6x$ has one stationary point. Show that its $x$-coordinate is $\frac{1}{2}\ln 3$, find its $y$-coordinate exactly, and determine its nature.

1. $\dfrac{dy}{dx} = 2\mathrm{e}^{2x} - 6 = 0$ gives $\mathrm{e}^{2x} = 3$.
2. Take logarithms: $2x = \ln 3$, so $x = \frac{1}{2}\ln 3$, as required.
3. $y = \mathrm{e}^{\ln 3} - 6 \times \frac{1}{2}\ln 3 = 3 - 3\ln 3$ (about $-0.296$).
4. $\dfrac{d^{2}y}{dx^{2}} = 4\mathrm{e}^{2x} = 4 \times 3 = 12 > 0$, so it is a minimum.
:::

### The inverse tangent (Cambridge Paper 3)

:::worked-solution[Example 5: differentiate $y = \tan^{-1}(2x)$]
1. Standard result: $\dfrac{d}{du}\tan^{-1}u = \dfrac{1}{1 + u^{2}}$, with $u = 2x$.
2. Chain rule: $\dfrac{dy}{dx} = \dfrac{1}{1 + (2x)^{2}} \times 2 = \dfrac{2}{1 + 4x^{2}}$.
3. At $x = \frac{1}{2}$: $\dfrac{2}{1 + 1} = 1$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC (Form 5) differentiates natural logarithms, exponentials and trigonometric functions; it does not name inverse trigonometric derivatives. Cambridge: Papers 2 and 3 for $\mathrm{e}^{x}$, $\ln x$, $\sin x$, $\cos x$, $\tan x$; $\tan^{-1}x$ is Paper 3 only ($\sin^{-1}x$ and $\cos^{-1}x$ are not required).
:::

## Common mistakes

:::mistake{title="Differentiating eˣ to xeˣ⁻¹"}
The power rule does not apply to $\mathrm{e}^{x}$: the variable is in the exponent. $\frac{d}{dx}\mathrm{e}^{x} = \mathrm{e}^{x}$.
:::

:::mistake{title="The sign of the cosine derivative"}
$\frac{d}{dx}\cos x = -\sin x$, but $\frac{d}{dx}\sin x = +\cos x$. A useful check: at $x = 0$ the graph of $\cos x$ is at a maximum, and just after it the gradient is negative.
:::

:::mistake{title="ln(2x) differentiated to 2/x"}
$\frac{d}{dx}\ln(2x) = \frac{2}{2x} = \frac{1}{x}$. The 2 from the inside cancels with the 2 in the denominator.
:::

:::mistake{title="Using degrees"}
$\frac{d}{dx}\sin x = \cos x$ only when $x$ is in radians. Set your calculator to radians when evaluating gradients.
:::

## Exam tips

:::exam-tip
Simplify logarithms with the laws of logs **before** differentiating: $\ln\sqrt{x^{2} + 1} = \frac{1}{2}\ln(x^{2} + 1)$ is far quicker than the chain rule on a square root.
:::

:::exam-tip
"Find the exact value" means leave $\ln 3$, $\mathrm{e}^{2}$ or $\pi$ in the answer; do not round.
:::

:::exam-tip
After differentiating $\sin^{2}$ or $\cos^{2}$ terms, look for a double-angle formula to simplify; the next part of the question often depends on it.
:::

## Summary

:::summary
- $\frac{d}{dx}\mathrm{e}^{f(x)} = f'(x)\mathrm{e}^{f(x)}$ and $\frac{d}{dx}\ln f(x) = \frac{f'(x)}{f(x)}$.
- $\sin \to \cos$, $\cos \to -\sin$, $\tan \to \sec^{2}$, with a factor $a$ for $(ax + b)$; radians only.
- Simplify logarithms with the log laws first; use double-angle formulae to tidy trigonometric answers.
- Cambridge Paper 3 only: $\frac{d}{dx}\tan^{-1}x = \frac{1}{1 + x^{2}}$.
:::
