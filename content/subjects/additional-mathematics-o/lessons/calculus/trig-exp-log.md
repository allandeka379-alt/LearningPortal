---
{
  "key": "calculus.trig-exp-log",
  "title": "Derivatives of trigonometric, exponential and logarithmic functions",
  "summary": "Know the derivatives of sin x, cos x, tan x (x in radians), eˣ, ln x and 1/x, and differentiate composites such as e^(3x−1), ln(2x + 5), sin 3x and cos²x with the chain rule, together with the product and quotient rules.",
  "concepts": ["amath.calculus.trig-exp-log"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Powers of $x$ are not the only functions that model the world. The depth of water at Kariba harbour rises and falls with a sine curve, a borehole pump's efficiency may decay exponentially, and the loudness of a sound is measured on a logarithmic scale. To find gradients, maxima and rates of change for these models you need the derivatives of the trigonometric, exponential and logarithmic functions.

There are only six new results to learn, and the chain, product and quotient rules then extend them to every function in the syllabus. Both ZIMSEC (Form 3: $\ln x$, $\sin x$, $\cos x$, $\tan x$, $\frac{1}{x}$ and $\mathrm{e}^x$) and Cambridge 0606 (topic 14.3) examine them, and Cambridge's Paper 1 expects exact answers such as $\frac{\sqrt{3}}{2}$ or $\mathrm{e}^2$ without a calculator.

**Radians are essential.** The derivative of $\sin x$ is $\cos x$ only when $x$ is measured in radians. In degrees an awkward factor $\frac{\pi}{180}$ appears, so all calculus with trigonometric functions is done in radians.

## Key definitions

:::definition{term="Exponential function"}
$y = \mathrm{e}^x$, where $\mathrm{e} \approx 2.718$. It is the only exponential function whose gradient at every point equals its own value.
:::

:::definition{term="Natural logarithm"}
$y = \ln x$, the inverse of $\mathrm{e}^x$, defined for $x > 0$: $\ln x = k$ means $\mathrm{e}^k = x$.
:::

:::formula{name="Standard derivatives (none is in Cambridge's List of formulas)"}
$$
\frac{d}{dx}(\sin x) = \cos x, \qquad \frac{d}{dx}(\cos x) = -\sin x, \qquad \frac{d}{dx}(\tan x) = \sec^2 x
$$

$$
\frac{d}{dx}(\mathrm{e}^x) = \mathrm{e}^x, \qquad \frac{d}{dx}(\ln x) = \frac{1}{x}, \qquad \frac{d}{dx}\left(\frac{1}{x}\right) = -\frac{1}{x^2}
$$
:::

:::formula{name="With a linear inside (chain rule)"}
$$
\frac{d}{dx}\left(\mathrm{e}^{ax + b}\right) = a\mathrm{e}^{ax + b}, \qquad \frac{d}{dx}\big(\ln(ax + b)\big) = \frac{a}{ax + b}
$$

$$
\frac{d}{dx}\big(\sin(ax + b)\big) = a\cos(ax + b), \qquad \frac{d}{dx}\big(\cos(ax + b)\big) = -a\sin(ax + b)
$$
:::

More generally, $\dfrac{d}{dx}\left(\mathrm{e}^{f(x)}\right) = f'(x)\mathrm{e}^{f(x)}$ and $\dfrac{d}{dx}\big(\ln f(x)\big) = \dfrac{f'(x)}{f(x)}$.

## Composite functions

:::worked-solution[Example 1: differentiate (a) $\mathrm{e}^{3x - 1}$, (b) $\ln(2x + 5)$, (c) $\sin 3x$]
1. (a) The inside $3x - 1$ has derivative 3, and $\mathrm{e}^u$ differentiates to itself: $\dfrac{d}{dx}\mathrm{e}^{3x - 1} = 3\mathrm{e}^{3x - 1}$.
2. (b) $\dfrac{d}{dx}\ln(2x + 5) = \dfrac{1}{2x + 5} \times 2 = \dfrac{2}{2x + 5}$.
3. (c) $\dfrac{d}{dx}\sin 3x = \cos 3x \times 3 = 3\cos 3x$.
:::

A surprising consequence of (b): $\dfrac{d}{dx}\ln(3x) = \dfrac{3}{3x} = \dfrac{1}{x}$, the same as the derivative of $\ln x$. That is because $\ln 3x = \ln 3 + \ln x$, and the constant $\ln 3$ differentiates to zero.

:::worked-solution[Example 2: differentiate (a) $\cos^2 x$, (b) $\tan 2x$]
1. (a) $\cos^2 x$ means $(\cos x)^2$. Outside: $2\cos x$; inside: $\dfrac{d}{dx}\cos x = -\sin x$.
2. $\dfrac{d}{dx}\cos^2 x = 2\cos x \times (-\sin x) = -2\sin x\cos x$, which can also be written $-\sin 2x$.
3. (b) $\dfrac{d}{dx}\tan 2x = \sec^2 2x \times 2 = 2\sec^2 2x$.
:::

Keep the notation straight: $\cos^2 x = (\cos x)^2$, whereas $\cos x^2 = \cos(x^2)$, whose derivative is $-2x\sin(x^2)$.

## Using the laws of logarithms first

Simplify a logarithm of a product, quotient or power **before** differentiating. It turns a quotient-rule problem into simple terms.

:::worked-solution[Example 3: differentiate $y = \ln\big(x^2(x + 1)\big)$ for $x > 0$]
1. Laws of logarithms: $y = \ln x^2 + \ln(x + 1) = 2\ln x + \ln(x + 1)$.
2. $\dfrac{dy}{dx} = \dfrac{2}{x} + \dfrac{1}{x + 1}$.
3. Over a common denominator: $\dfrac{dy}{dx} = \dfrac{2(x + 1) + x}{x(x + 1)} = \dfrac{3x + 2}{x(x + 1)}$.
:::

## Combining with the product and quotient rules

:::worked-solution[Example 4: differentiate $y = \mathrm{e}^{2x}\sin x$ and find the gradient at the origin]
1. $u = \mathrm{e}^{2x}$, $\dfrac{du}{dx} = 2\mathrm{e}^{2x}$; $v = \sin x$, $\dfrac{dv}{dx} = \cos x$.
2. $\dfrac{dy}{dx} = \mathrm{e}^{2x}\cos x + 2\mathrm{e}^{2x}\sin x = \mathrm{e}^{2x}(2\sin x + \cos x)$.
3. At $x = 0$: $\mathrm{e}^0 = 1$, $\sin 0 = 0$ and $\cos 0 = 1$, so the gradient is $1 \times (0 + 1) = 1$.
:::

:::worked-solution[Example 5: show that $\dfrac{d}{dx}\big(\ln(\sin x)\big) = \cot x$ for $0 < x < \pi$, and find the gradient of $y = \ln(\sin x)$ at $x = \frac{\pi}{4}$]
1. Chain rule with $f(x) = \sin x$: $\dfrac{d}{dx}\ln(\sin x) = \dfrac{f'(x)}{f(x)} = \dfrac{\cos x}{\sin x}$.
2. $\dfrac{\cos x}{\sin x} = \cot x$, as required.
3. At $x = \frac{\pi}{4}$: $\cot \frac{\pi}{4} = 1$.
:::

## A quick reference

| Function | Derivative |
| --- | --- |
| $5\mathrm{e}^{-2x}$ | $-10\mathrm{e}^{-2x}$ |
| $\ln(4 - x)$ | $-\dfrac{1}{4 - x}$ |
| $\cos(5x + 1)$ | $-5\sin(5x + 1)$ |
| $\ln 3x$ | $\dfrac{1}{x}$ |

The second derivative of $\sin x$ is $-\sin x$, and of $\cos x$ is $-\cos x$; differentiating sine or cosine four times brings you back where you started. For $\mathrm{e}^{kx}$, every differentiation multiplies by $k$.

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC writes $\log x$ for base 10 and $\ln x$ for base $\mathrm{e}$; only $\ln x$ has the simple derivative $\frac{1}{x}$, so convert any other base first ($\log_{10} x = \frac{\ln x}{\ln 10}$). Cambridge writes $\lg x$ for base 10. Both boards use radians for calculus, and Cambridge includes $\sec^2 x$ as the derivative of $\tan x$.
:::

## Common mistakes

:::mistake{title="Using degrees"}
$\frac{d}{dx}\sin x = \cos x$ is true only in radians. Set your calculator to radian mode in every calculus question with trigonometric functions.
:::

:::mistake{title="Sign of the derivative of cos x"}
$\dfrac{d}{dx}\cos x = -\sin x$ (negative), while $\dfrac{d}{dx}\sin x = +\cos x$.
:::

:::mistake{title="Using the power rule on eˣ"}
$\dfrac{d}{dx}\mathrm{e}^x$ is not $x\mathrm{e}^{x - 1}$. The power rule is for $x^n$, where the base varies; in $\mathrm{e}^x$ the exponent varies. The exponent stays the same: $\dfrac{d}{dx}\mathrm{e}^{3x} = 3\mathrm{e}^{3x}$.
:::

:::mistake{title="Differentiating ln(2x + 5) as 1/(2x + 5)"}
The derivative of the inside is missing. $\dfrac{d}{dx}\ln(2x + 5) = \dfrac{2}{2x + 5}$.
:::

## Exam tips

:::exam-tip
Learn the exact values of sine, cosine and tangent at $0$, $\frac{\pi}{6}$, $\frac{\pi}{4}$, $\frac{\pi}{3}$ and $\frac{\pi}{2}$: Paper 1 (non-calculator) gradients use them.
:::

:::exam-tip
"Give your answer in terms of e" means leave $\mathrm{e}^2$ or $\ln 3$ in the answer, exactly. Do not round unless asked.
:::

:::exam-tip
For a logarithm of a product or quotient, split it with the laws of logarithms before differentiating. It is shorter and less error-prone than the quotient rule.
:::

## Summary

:::summary
- $\sin x \to \cos x$, $\cos x \to -\sin x$, $\tan x \to \sec^2 x$ ($x$ in radians).
- $\mathrm{e}^x \to \mathrm{e}^x$, $\ln x \to \frac{1}{x}$, $\frac{1}{x} \to -\frac{1}{x^2}$.
- Chain rule: $\mathrm{e}^{f(x)} \to f'(x)\mathrm{e}^{f(x)}$, $\ln f(x) \to \frac{f'(x)}{f(x)}$, $\sin(ax + b) \to a\cos(ax + b)$.
- $\cos^2 x = (\cos x)^2$: differentiate with the chain rule.
- Simplify logarithms with the laws first; combine with the product and quotient rules as needed.
:::
