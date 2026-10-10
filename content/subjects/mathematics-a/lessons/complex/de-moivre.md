---
{
  "key": "complex.de-moivre",
  "title": "De Moivre's theorem and nth roots",
  "summary": "Prove de Moivre's theorem by induction, use it to find powers of complex numbers, express cos nθ and sin nθ in powers of cos θ and sin θ (and powers in multiple angles), solve zⁿ = w and work with the nth roots of unity.",
  "concepts": ["amaths.complex.de-moivre"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Multiplying complex numbers in polar form adds their arguments. Multiplying a number by itself $n$ times therefore multiplies its argument by $n$: that is de Moivre's theorem. It makes $(1 + \mathrm{i}\sqrt{3})^{6}$ a one-line calculation, produces formulae such as $\cos 3\theta = 4\cos^3\theta - 3\cos\theta$ without any compound-angle work, and solves equations like $z^5 = 1$ completely. Engineers use the same ideas to analyse alternating currents and vibrations.

De Moivre's theorem is in the ZIMSEC Pure Mathematics syllabus (Form 6, topic 6.7): learners derive it, prove it, and use it to prove trigonometrical identities and to solve equations, including the $n$th roots of unity. It is not in Cambridge 9709.

## Key definitions

:::formula{name="De Moivre's theorem"}
$$
(\cos\theta + \mathrm{i}\sin\theta)^n = \cos n\theta + \mathrm{i}\sin n\theta \qquad \text{for every integer } n
$$
:::

In exponential form this is simply $(\mathrm{e}^{\mathrm{i}\theta})^n = \mathrm{e}^{\mathrm{i}n\theta}$. For a general number, $\left(r\mathrm{e}^{\mathrm{i}\theta}\right)^n = r^n\mathrm{e}^{\mathrm{i}n\theta}$.

:::definition{term="nth roots of unity"}
The $n$ solutions of $z^n = 1$: $z = \mathrm{e}^{2k\pi\mathrm{i}/n}$ for $k = 0, 1, \dots, n - 1$. They lie on the unit circle at the vertices of a regular $n$-sided polygon, one vertex at $1$, and (for $n \ge 2$) their sum is 0.
:::

## Proving the theorem

**Positive integers (induction).** For $n = 1$ both sides equal $\cos\theta + \mathrm{i}\sin\theta$. Assume $(\cos\theta + \mathrm{i}\sin\theta)^k = \cos k\theta + \mathrm{i}\sin k\theta$ for some positive integer $k$. Then

$$
(\cos\theta + \mathrm{i}\sin\theta)^{k+1} = (\cos k\theta + \mathrm{i}\sin k\theta)(\cos\theta + \mathrm{i}\sin\theta)
$$

$$
= (\cos k\theta\cos\theta - \sin k\theta\sin\theta) + \mathrm{i}(\sin k\theta\cos\theta + \cos k\theta\sin\theta) = \cos(k + 1)\theta + \mathrm{i}\sin(k + 1)\theta
$$

using the compound-angle formulae. So the result for $k$ implies the result for $k + 1$; since it is true for $n = 1$, it is true for every positive integer $n$.

**Negative integers.** Let $n = -m$ with $m$ a positive integer. Then $(\cos\theta + \mathrm{i}\sin\theta)^{-m} = \dfrac{1}{\cos m\theta + \mathrm{i}\sin m\theta}$. Multiplying top and bottom by $\cos m\theta - \mathrm{i}\sin m\theta$ gives $\cos m\theta - \mathrm{i}\sin m\theta = \cos(-m\theta) + \mathrm{i}\sin(-m\theta)$, which is $\cos n\theta + \mathrm{i}\sin n\theta$. For $n = 0$ both sides are 1.

## Powers of complex numbers

Convert to polar form, raise the modulus to the power $n$ and multiply the argument by $n$, then convert back.

:::worked-solution[Example 1: find $(1 + \mathrm{i}\sqrt{3})^6$]
1. $|1 + \mathrm{i}\sqrt{3}| = 2$ and $\arg(1 + \mathrm{i}\sqrt{3}) = \frac{\pi}{3}$, so $1 + \mathrm{i}\sqrt{3} = 2\mathrm{e}^{\mathrm{i}\pi/3}$.
2. $(2\mathrm{e}^{\mathrm{i}\pi/3})^6 = 2^6\mathrm{e}^{6\mathrm{i}\pi/3} = 64\mathrm{e}^{2\pi\mathrm{i}}$.
3. $\mathrm{e}^{2\pi\mathrm{i}} = \cos 2\pi + \mathrm{i}\sin 2\pi = 1$, so the answer is $64$.
:::

## Multiple angles in powers of cos θ and sin θ

Expand $(\cos\theta + \mathrm{i}\sin\theta)^n$ with the binomial theorem, and compare it with $\cos n\theta + \mathrm{i}\sin n\theta$. Write $c = \cos\theta$ and $s = \sin\theta$ to keep the working short.

:::worked-solution[Example 2: show that $\cos 3\theta = 4\cos^3\theta - 3\cos\theta$ and find $\sin 3\theta$ in terms of $\sin\theta$]
1. By de Moivre, $\cos 3\theta + \mathrm{i}\sin 3\theta = (c + \mathrm{i}s)^3$.
2. Binomial expansion: $(c + \mathrm{i}s)^3 = c^3 + 3c^2(\mathrm{i}s) + 3c(\mathrm{i}s)^2 + (\mathrm{i}s)^3 = c^3 + 3\mathrm{i}c^2s - 3cs^2 - \mathrm{i}s^3$.
3. Real parts: $\cos 3\theta = c^3 - 3cs^2 = c^3 - 3c(1 - c^2) = 4c^3 - 3c$.
4. Imaginary parts: $\sin 3\theta = 3c^2s - s^3 = 3(1 - s^2)s - s^3 = 3s - 4s^3$.
:::

## Powers of cos θ in multiple angles

Let $z = \cos\theta + \mathrm{i}\sin\theta$. Then $z^{-1} = \cos\theta - \mathrm{i}\sin\theta$, and more generally

$$
z^n + \frac{1}{z^n} = 2\cos n\theta, \qquad z^n - \frac{1}{z^n} = 2\mathrm{i}\sin n\theta
$$

Expanding $\left(z + \frac{1}{z}\right)^n$ and pairing terms turns a power of $\cos\theta$ into a sum of multiple angles, which is what you need to integrate $\cos^4\theta$ or $\sin^5\theta$.

:::worked-solution[Example 3: express $\cos^4\theta$ in the form $a\cos 4\theta + b\cos 2\theta + c$]
1. $(2\cos\theta)^4 = \left(z + \frac{1}{z}\right)^4 = z^4 + 4z^2 + 6 + \frac{4}{z^2} + \frac{1}{z^4}$.
2. Pair the terms: $\left(z^4 + \frac{1}{z^4}\right) + 4\left(z^2 + \frac{1}{z^2}\right) + 6 = 2\cos 4\theta + 8\cos 2\theta + 6$.
3. So $16\cos^4\theta = 2\cos 4\theta + 8\cos 2\theta + 6$.
4. $\cos^4\theta = \frac{1}{8}\cos 4\theta + \frac{1}{2}\cos 2\theta + \frac{3}{8}$.
:::

## Solving zⁿ = w

Write $w = R\mathrm{e}^{\mathrm{i}\phi}$. Every argument of $w$ has the form $\phi + 2k\pi$, so the solutions are

$$
z = R^{1/n}\mathrm{e}^{\mathrm{i}(\phi + 2k\pi)/n}, \qquad k = 0, 1, \dots, n - 1
$$

There are exactly $n$ distinct roots, all with modulus $R^{1/n}$, spaced $\frac{2\pi}{n}$ apart: the vertices of a regular $n$-gon centred at the origin.

:::worked-solution[Example 4: solve $z^3 = 8\mathrm{i}$, giving the roots in the form $x + \mathrm{i}y$]
1. $8\mathrm{i} = 8\mathrm{e}^{\mathrm{i}\pi/2}$, so $|z| = 8^{1/3} = 2$.
2. Arguments: $\frac{1}{3}\left(\frac{\pi}{2} + 2k\pi\right)$ for $k = 0, 1, 2$, giving $\frac{\pi}{6}$, $\frac{5\pi}{6}$, $\frac{3\pi}{2}$. Take $-\frac{\pi}{2}$ as the principal value of the last.
3. $2\mathrm{e}^{\mathrm{i}\pi/6} = \sqrt{3} + \mathrm{i}$, $2\mathrm{e}^{5\pi\mathrm{i}/6} = -\sqrt{3} + \mathrm{i}$ and $2\mathrm{e}^{-\mathrm{i}\pi/2} = -2\mathrm{i}$.
4. Check one: $(-2\mathrm{i})^3 = -8\mathrm{i}^3 = 8\mathrm{i}$.
:::

## Roots of unity

The cube roots of unity are $1$, $\omega = \mathrm{e}^{2\pi\mathrm{i}/3} = -\frac{1}{2} + \frac{\sqrt{3}}{2}\mathrm{i}$ and $\omega^2 = -\frac{1}{2} - \frac{\sqrt{3}}{2}\mathrm{i}$. Because $\omega^3 = 1$ and $\omega \ne 1$, factorising $\omega^3 - 1 = (\omega - 1)(\omega^2 + \omega + 1) = 0$ gives $1 + \omega + \omega^2 = 0$. The same argument shows that the $n$ roots of unity always sum to zero. Geometrically, they are the vertices of a regular polygon centred at the origin, so their vector sum is zero.

## Common mistakes

:::mistake{title="Raising cos and sin to the power instead of the angle"}
$(\cos\theta + \mathrm{i}\sin\theta)^5 = \cos 5\theta + \mathrm{i}\sin 5\theta$, not $\cos^5\theta + \mathrm{i}\sin^5\theta$.
:::

:::mistake{title="Forgetting the modulus"}
$(2\mathrm{e}^{\mathrm{i}\pi/3})^6$ has modulus $2^6 = 64$, not 2.
:::

:::mistake{title="Giving only one nth root"}
$z^n = w$ has $n$ roots. Add $2k\pi$ to the argument **before** dividing by $n$.
:::

:::mistake{title="Using de Moivre on a number not in polar form"}
$(1 + \mathrm{i})^4 \ne 1 + \mathrm{i}^4$. Convert to $r\mathrm{e}^{\mathrm{i}\theta}$ first.
:::

## Exam tips

:::exam-tip
In "prove by induction" questions, state the basis, the assumption for $n = k$, the step to $n = k + 1$ (with the compound-angle formulae), and the conclusion in words.
:::

:::exam-tip
When expressing $\cos n\theta$ in powers of $\cos\theta$, replace $\sin^2\theta$ by $1 - \cos^2\theta$ only at the end, after equating real parts.
:::

:::exam-tip
Give roots in the form asked (polar with arguments in $(-\pi, \pi]$, or $x + \mathrm{i}y$ exactly) and check one root by raising it to the power.
:::

## Summary

:::summary
- $(\cos\theta + \mathrm{i}\sin\theta)^n = \cos n\theta + \mathrm{i}\sin n\theta$ for all integers $n$; proved by induction for positive $n$.
- $(r\mathrm{e}^{\mathrm{i}\theta})^n = r^n\mathrm{e}^{\mathrm{i}n\theta}$ gives powers quickly.
- Binomial expansion of $(c + \mathrm{i}s)^n$ gives $\cos n\theta$ and $\sin n\theta$ in powers of $c$ and $s$.
- $z^n + z^{-n} = 2\cos n\theta$ and $z^n - z^{-n} = 2\mathrm{i}\sin n\theta$ turn powers into multiple angles.
- $z^n = R\mathrm{e}^{\mathrm{i}\phi}$ has $n$ roots $R^{1/n}\mathrm{e}^{\mathrm{i}(\phi + 2k\pi)/n}$, forming a regular $n$-gon; the $n$th roots of unity sum to 0.
:::
