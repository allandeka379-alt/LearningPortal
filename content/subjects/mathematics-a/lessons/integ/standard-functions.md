---
{
  "key": "integ.standard-functions",
  "title": "Integrating exponential, reciprocal and trigonometric functions",
  "summary": "Integrate e^(ax+b), 1/(ax + b), sin(ax + b), cos(ax + b) and sec²(ax + b), use identities to integrate sin²x, cos²x and tan²x, and (Cambridge Paper 3, ZIMSEC standard integrals) integrate 1/(x² + a²).",
  "concepts": ["amaths.integ.standard-functions"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Every derivative you learnt in the exponential, logarithm and trigonometry lesson can be read backwards as an integral. Because $\frac{d}{dx}\mathrm{e}^{x} = \mathrm{e}^{x}$, the integral of $\mathrm{e}^{x}$ is $\mathrm{e}^{x}$; because $\frac{d}{dx}\ln x = \frac{1}{x}$, the integral of $\frac{1}{x}$ is $\ln x$, which fills the gap left by the power rule at $n = -1$.

These integrals model growth and decay (the charge on a capacitor in a ZESA substation, the cooling of water in a Kariba fish tank) and anything periodic. ZIMSEC Pure Mathematics (Form 5) examines them as standard integrals; Cambridge 9709 examines them in Papers 2 and 3 (topics 2.5 and 3.5), with $\frac{1}{x^{2} + a^{2}}$ in Paper 3 only.

You need the derivatives of $\mathrm{e}^{x}$, $\ln x$ and the trigonometric functions, and the double-angle formulae.

## Key definitions

:::formula{name="Standard integrals"}
$$
\int \mathrm{e}^{ax + b}\,dx = \frac{1}{a}\mathrm{e}^{ax + b} + c, \qquad \int \frac{1}{ax + b}\,dx = \frac{1}{a}\ln|ax + b| + c
$$

$$
\int \sin(ax + b)\,dx = -\frac{1}{a}\cos(ax + b) + c, \qquad \int \cos(ax + b)\,dx = \frac{1}{a}\sin(ax + b) + c
$$

$$
\int \sec^{2}(ax + b)\,dx = \frac{1}{a}\tan(ax + b) + c
$$

MF19 lists the basic forms ($\mathrm{e}^{x}$, $\frac{1}{x}$, $\sin x$, $\cos x$, $\sec^{2}x$); the factor $\frac{1}{a}$ for $(ax + b)$ comes from reversing the chain rule. Angles in radians.
:::

:::formula{name="The inverse tangent integral"}
$$
\int \frac{1}{x^{2} + a^{2}}\,dx = \frac{1}{a}\tan^{-1}\left(\frac{x}{a}\right) + c
$$

In MF19; Cambridge Paper 3 only. ZIMSEC includes it among the standard integrals.
:::

:::definition{term="The modulus in ln|x|"}
$\frac{1}{x}$ is defined for negative $x$ too, but $\ln x$ is not. Since $\frac{d}{dx}\ln(-x) = \frac{1}{x}$ as well, $\int \frac{1}{x}\,dx = \ln|x| + c$ covers both cases.
:::

## Exponential and reciprocal functions

The pattern is always: integrate as if the bracket were $x$, then **divide by $a$**, the coefficient of $x$.

:::worked-solution[Example 1: find $\displaystyle\int\left(\mathrm{e}^{3x - 1} + \frac{4}{2x + 1}\right)dx$]
1. $\int \mathrm{e}^{3x - 1}\,dx = \tfrac{1}{3}\mathrm{e}^{3x - 1}$.
2. $\int \dfrac{4}{2x + 1}\,dx = 4 \times \tfrac{1}{2}\ln|2x + 1| = 2\ln|2x + 1|$.
3. Answer: $\tfrac{1}{3}\mathrm{e}^{3x - 1} + 2\ln|2x + 1| + c$.
4. Check by differentiating: $\mathrm{e}^{3x - 1} + 2 \times \dfrac{2}{2x + 1}$.
:::

Definite integrals of reciprocals give logarithms, which you simplify with the log laws.

:::worked-solution[Example 2: show that $\displaystyle\int_{0}^{2}\frac{3}{2x + 1}\,dx = \tfrac{3}{2}\ln 5$]
1. $\displaystyle\int_{0}^{2}\frac{3}{2x + 1}\,dx = \Big[\tfrac{3}{2}\ln(2x + 1)\Big]_{0}^{2}$.
2. $= \tfrac{3}{2}\ln 5 - \tfrac{3}{2}\ln 1$.
3. Since $\ln 1 = 0$, the value is $\tfrac{3}{2}\ln 5$ (about 2.41), as required.
:::

## Trigonometric functions

Watch the signs: the integral of $\sin$ is $-\cos$. A quick check: differentiate your answer.

:::worked-solution[Example 3: evaluate $\displaystyle\int_{0}^{\pi/6}(\sin 3x + 2\cos x)\,dx$]
1. Integrate: $\Big[-\tfrac{1}{3}\cos 3x + 2\sin x\Big]_{0}^{\pi/6}$.
2. Upper limit: $\cos\frac{\pi}{2} = 0$ and $\sin\frac{\pi}{6} = \frac{1}{2}$, giving $0 + 1 = 1$.
3. Lower limit: $-\tfrac{1}{3}\cos 0 + 0 = -\tfrac{1}{3}$.
4. Answer: $1 - \left(-\tfrac{1}{3}\right) = \tfrac{4}{3}$.
:::

### Using identities

$\sin^{2}x$, $\cos^{2}x$ and $\tan^{2}x$ have no direct standard integral. Rewrite them first:

$$
\sin^{2}x = \tfrac{1}{2}(1 - \cos 2x), \qquad \cos^{2}x = \tfrac{1}{2}(1 + \cos 2x), \qquad \tan^{2}x = \sec^{2}x - 1.
$$

:::worked-solution[Example 4: integrals of $\sin^{2}x$ and $\tan^{2}x$]
1. $\int \sin^{2}x\,dx = \int \tfrac{1}{2}(1 - \cos 2x)\,dx = \tfrac{x}{2} - \tfrac{\sin 2x}{4} + c$.
2. So $\displaystyle\int_{0}^{\pi/2}\sin^{2}x\,dx = \left(\tfrac{\pi}{4} - 0\right) - 0 = \tfrac{\pi}{4}$.
3. $\int \tan^{2}x\,dx = \int(\sec^{2}x - 1)\,dx = \tan x - x + c$.
:::

The same idea handles $\cos^{2}2x = \tfrac{1}{2}(1 + \cos 4x)$: double the angle inside, then integrate with the factor $\frac{1}{4}$.

## The inverse tangent (Cambridge Paper 3; ZIMSEC)

Make the coefficient of $x^{2}$ equal to 1 first, then read off $a$.

:::worked-solution[Example 5: find $\displaystyle\int\frac{1}{2 + 3x^{2}}\,dx$]
1. Take out 3: $\dfrac{1}{3}\displaystyle\int \frac{1}{x^{2} + \frac{2}{3}}\,dx$, so $a = \sqrt{\tfrac{2}{3}}$.
2. Use the formula: $\dfrac{1}{3} \times \dfrac{1}{\sqrt{2/3}}\tan^{-1}\left(\dfrac{x}{\sqrt{2/3}}\right) + c$.
3. Simplify: $\dfrac{1}{3}\sqrt{\tfrac{3}{2}} = \dfrac{1}{\sqrt{6}}$, so the answer is $\dfrac{1}{\sqrt{6}}\tan^{-1}\left(\sqrt{\tfrac{3}{2}}\,x\right) + c$.
:::

## Choosing the right standard integral

Most integration questions in this topic are recognition exercises: you must spot which standard form the integrand matches, possibly after a little algebra. A useful order of questions to ask yourself:

1. Is the integrand a sum of terms? Integrate each term separately.
2. Is a term a power of $x$ or of a linear bracket (with power not $-1$)? Use the power rule.
3. Is it $\frac{k}{ax + b}$? It gives $\frac{k}{a}\ln|ax + b|$.
4. Is it $\mathrm{e}$ to a linear power, or $\sin$, $\cos$ or $\sec^{2}$ of a linear expression? Use the table, dividing by $a$.
5. Is it a square of a trigonometric function? Use an identity first.
6. Is it $\frac{1}{\text{constant} + \text{constant} \times x^{2}}$? Use the inverse tangent form.

If none of these fits, the integrand may need **expanding** (for example $(\mathrm{e}^{x} + 1)^{2} = \mathrm{e}^{2x} + 2\mathrm{e}^{x} + 1$), **dividing** (for example $\frac{x + 3}{x} = 1 + \frac{3}{x}$), or a technique from a later lesson: recognition, substitution, partial fractions or parts. Notice that the factor $\frac{1}{a}$ only works because the bracket is **linear**; for $\mathrm{e}^{x^{2}}$ or $\sin(x^{2})$ there is no such shortcut.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge: $\mathrm{e}^{ax + b}$, $\frac{1}{ax + b}$, $\sin$, $\cos$ and $\sec^{2}$ of $(ax + b)$ and the trigonometric identities are in Papers 2 and 3; $\frac{1}{x^{2} + a^{2}}$ is Paper 3 only. ZIMSEC (Form 5): all of these are standard integrals.
:::

## Common mistakes

:::mistake{title="Multiplying by a instead of dividing"}
$\int \mathrm{e}^{3x}\,dx = \frac{1}{3}\mathrm{e}^{3x}$, not $3\mathrm{e}^{3x}$ (that is the derivative).
:::

:::mistake{title="Wrong sign for sine"}
$\int \sin x\,dx = -\cos x + c$. The derivative of $\cos x$ is $-\sin x$, so the integral of $\sin x$ needs the minus.
:::

:::mistake{title="ln of a square"}
$\int \frac{1}{x^{2}}\,dx$ is $-\frac{1}{x}$, not $\ln x^{2}$. Only $\frac{1}{\text{linear}}$ gives a logarithm directly.
:::

:::mistake{title="Integrating sin²x as a power"}
$\int \sin^{2}x\,dx \neq \frac{\sin^{3}x}{3}$. Use the double-angle identity first.
:::

## Exam tips

:::exam-tip
"Exact value" answers involve $\ln$, $\mathrm{e}$ or $\pi$: $\frac{3}{2}\ln 5$, not 2.41. Combine logarithms with the log laws where you can.
:::

:::exam-tip
Set your calculator to radians for every trigonometric integral.
:::

:::exam-tip
A question that says "use the identity $\cos 2x = 1 - 2\sin^{2}x$" is telling you how to integrate $\sin^{2}x$: rearrange it to $\sin^{2}x = \frac{1}{2}(1 - \cos 2x)$.
:::

## Summary

:::summary
- $\int \mathrm{e}^{ax + b}\,dx = \frac{1}{a}\mathrm{e}^{ax + b}$; $\int \frac{1}{ax + b}\,dx = \frac{1}{a}\ln|ax + b|$.
- $\sin(ax + b) \to -\frac{1}{a}\cos$; $\cos(ax + b) \to \frac{1}{a}\sin$; $\sec^{2}(ax + b) \to \frac{1}{a}\tan$.
- Use $\sin^{2}x = \frac{1}{2}(1 - \cos 2x)$, $\cos^{2}x = \frac{1}{2}(1 + \cos 2x)$, $\tan^{2}x = \sec^{2}x - 1$.
- Paper 3 / ZIMSEC: $\int \frac{1}{x^{2} + a^{2}}\,dx = \frac{1}{a}\tan^{-1}\frac{x}{a}$.
- Always add $+ c$ and check by differentiating.
:::
