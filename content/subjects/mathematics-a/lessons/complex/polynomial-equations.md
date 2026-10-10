---
{
  "key": "complex.polynomial-equations",
  "title": "Polynomial equations with complex roots",
  "summary": "Use the fact that non-real roots of a real polynomial come in conjugate pairs to solve cubic and quartic equations when one complex root is known, find unknown coefficients by substitution, and build a polynomial from its roots.",
  "concepts": ["amaths.complex.polynomial-equations"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

With complex numbers, every polynomial equation of degree $n$ has exactly $n$ roots (counting repeats). A cubic always has three, a quartic four. When the coefficients are real, the non-real roots arrive in pairs: if $2 + 3\mathrm{i}$ is a root, so is $2 - 3\mathrm{i}$. This one fact turns "solve this quartic" from impossible into routine, because one known root immediately gives you a second root and a quadratic factor.

Cambridge examines this in Paper 3 (A Level only, topic 3.9), usually for cubics and quartics. ZIMSEC (Pure Mathematics, Form 6, topic 6.7) asks for polynomial equations up to degree five with at least one pair of non-real roots.

## Key definitions

:::definition{term="Polynomial with real coefficients"}
A polynomial such as $p(z) = z^3 - 5z^2 + 11z - 15$ in which every coefficient is a real number. All the polynomials in this lesson are of this kind.
:::

:::definition{term="Conjugate root theorem"}
If $p(z)$ has real coefficients and $p(w) = 0$, then $p(w^{*}) = 0$. Non-real roots of a real polynomial occur in conjugate pairs.
:::

:::formula{name="Quadratic factor from a conjugate pair"}
$$
(z - (a + b\mathrm{i}))(z - (a - b\mathrm{i})) = z^2 - 2az + (a^2 + b^2)
$$
:::

The middle coefficient is minus the sum of the roots ($2a$); the constant is their product ($a^2 + b^2 = |w|^2$). MF19 does not print this; derive or remember it.

## Why the roots pair up

Taking the conjugate of a sum or product is the same as conjugating each part: $(z + w)^{*} = z^{*} + w^{*}$ and $(zw)^{*} = z^{*}w^{*}$. So if $p(w) = a_nw^n + \dots + a_1w + a_0 = 0$ with real $a_k$, conjugating the whole equation gives $a_n(w^{*})^n + \dots + a_1w^{*} + a_0 = 0^{*} = 0$, because each real $a_k$ is its own conjugate. Hence $w^{*}$ is a root too.

Two consequences:

- A real cubic has either three real roots, or one real root and a conjugate pair. It always has at least one real root.
- A real quartic has four real roots, two real roots and a pair, or two conjugate pairs.

## Solving when one root is known

The standard method has three steps:

1. Write down the conjugate of the given root.
2. Multiply the two linear factors to get a real quadratic factor.
3. Divide the polynomial by the quadratic (long division or comparing coefficients) and solve what is left.

:::worked-solution[Example 1: given that $1 + 2\mathrm{i}$ is a root of $z^3 - 5z^2 + 11z - 15 = 0$, find the other roots]
1. Real coefficients, so $1 - 2\mathrm{i}$ is also a root.
2. Quadratic factor: $z^2 - 2(1)z + (1^2 + 2^2) = z^2 - 2z + 5$.
3. Compare coefficients: $z^3 - 5z^2 + 11z - 15 = (z^2 - 2z + 5)(z + c)$. The constant terms give $5c = -15$, so $c = -3$.
4. Check the $z^2$ term: $c - 2 = -5$. Correct.
5. The roots are $1 + 2\mathrm{i}$, $1 - 2\mathrm{i}$ and $3$.
:::

:::worked-solution[Example 2: given that $3 + 2\mathrm{i}$ is a root of $z^4 - 6z^3 + 14z^2 - 6z + 13 = 0$, solve the equation]
1. $3 - 2\mathrm{i}$ is also a root, giving the factor $z^2 - 6z + 13$.
2. Write $z^4 - 6z^3 + 14z^2 - 6z + 13 = (z^2 - 6z + 13)(z^2 + pz + q)$.
3. Constant terms: $13q = 13$, so $q = 1$. $z^3$ terms: $p - 6 = -6$, so $p = 0$.
4. Check the $z$ term: $13p - 6q = -6$. Correct.
5. $z^2 + 1 = 0$ gives $z = \pm\mathrm{i}$.
6. The four roots are $3 \pm 2\mathrm{i}$ and $\pm\mathrm{i}$: two conjugate pairs, as a real quartic with no real roots must have.
:::

## Finding unknown coefficients

If the coefficients contain unknowns, substitute the given root, simplify the powers, and equate real and imaginary parts to zero. You get two equations for two unknowns.

:::worked-solution[Example 3 (exam style): $1 + \mathrm{i}$ is a root of $z^3 + az^2 + bz + 6 = 0$, where $a$ and $b$ are real. (a) Find $a$ and $b$. (b) Find the other two roots.]
1. Powers: $(1 + \mathrm{i})^2 = 1 + 2\mathrm{i} - 1 = 2\mathrm{i}$ and $(1 + \mathrm{i})^3 = 2\mathrm{i}(1 + \mathrm{i}) = -2 + 2\mathrm{i}$.
2. Substitute: $(-2 + 2\mathrm{i}) + a(2\mathrm{i}) + b(1 + \mathrm{i}) + 6 = 0$.
3. Real parts: $-2 + b + 6 = 0$, so $b = -4$.
4. Imaginary parts: $2 + 2a + b = 0$, so $2a = 2$ and $a = 1$.
5. (b) The equation is $z^3 + z^2 - 4z + 6 = 0$. The conjugate $1 - \mathrm{i}$ is a root, so $z^2 - 2z + 2$ is a factor.
6. $(z^2 - 2z + 2)(z + 3) = z^3 + z^2 - 4z + 6$, so the third root is $-3$.
7. Roots: $1 + \mathrm{i}$, $1 - \mathrm{i}$, $-3$.
:::

## Building a polynomial from its roots

To find a polynomial with given roots, multiply the factors. With real coefficients, remember to include the conjugate of every non-real root you are given.

:::worked-solution[Example 4: find the cubic with real coefficients and leading coefficient 1 that has roots 3 and $2 - \mathrm{i}$]
1. The roots are $3$, $2 - \mathrm{i}$ and $2 + \mathrm{i}$.
2. Quadratic factor from the pair: $z^2 - 4z + 5$.
3. Multiply: $(z - 3)(z^2 - 4z + 5) = z^3 - 4z^2 + 5z - 3z^2 + 12z - 15$.
4. So the cubic is $z^3 - 7z^2 + 17z - 15$.
:::

## Higher degree (ZIMSEC)

ZIMSEC extends the same method to degree five. A real quintic with two non-real roots given (say $\mathrm{i}$ and $1 + \mathrm{i}$, not conjugates of each other) has four known roots: two quadratic factors $z^2 + 1$ and $z^2 - 2z + 2$. Their product is a quartic, and dividing leaves a linear factor that gives the fifth (real) root. A quintic always has at least one real root, because non-real roots pair up and five is odd.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge Paper 3 limits questions to cubics and quartics, often with "showing all necessary working" so that substitution is done by hand. ZIMSEC (Form 6) asks for polynomial equations up to degree five and may combine this with the factor theorem from Form 5.
:::

## Common mistakes

:::mistake{title="Using the root itself as a factor"}
If $1 + 2\mathrm{i}$ is a root, the factor is $z - (1 + 2\mathrm{i})$, not $z + (1 + 2\mathrm{i})$. Check: the constant of the quadratic factor is the product of the roots, $1^2 + 2^2 = 5$.
:::

:::mistake{title="Applying the theorem to a non-real polynomial"}
The conjugate pair rule needs real coefficients. For $z^2 - \mathrm{i}z + 2 = 0$ the roots $2\mathrm{i}$ and $-\mathrm{i}$ are not conjugates.
:::

:::mistake{title="Sign of the middle term"}
The quadratic factor for $a \pm b\mathrm{i}$ is $z^2 - 2az + (a^2 + b^2)$, with a **minus** before $2a$.
:::

:::mistake{title="Equating only one part"}
After substituting a complex root, both the real part and the imaginary part must be zero: that gives two equations, not one.
:::

## Exam tips

:::exam-tip
"Show that $2 + 3\mathrm{i}$ is a root" needs the substitution with every power worked out; finding $z^2$ first and then $z^3 = z^2 \times z$ keeps the arithmetic short.
:::

:::exam-tip
After dividing, multiply back (or check one more coefficient) before solving the remaining factor.
:::

:::exam-tip
State the conjugate root explicitly ("since the coefficients are real, $1 - 2\mathrm{i}$ is also a root"): the reason is often worth a mark.
:::

## Summary

:::summary
- A real polynomial of degree $n$ has $n$ complex roots; its non-real roots come in conjugate pairs.
- The pair $a \pm b\mathrm{i}$ gives the real factor $z^2 - 2az + (a^2 + b^2)$.
- Divide (or compare coefficients) to find the remaining factor and roots.
- To find unknown coefficients, substitute the root and set real and imaginary parts to zero.
- To build a polynomial, include the conjugate of each non-real root and multiply the factors.
:::
