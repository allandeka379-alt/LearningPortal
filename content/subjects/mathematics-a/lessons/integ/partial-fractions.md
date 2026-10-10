---
{
  "key": "integ.partial-fractions",
  "title": "Integration using partial fractions",
  "summary": "Integrate rational functions by first splitting them into partial fractions (distinct linear, repeated linear and quadratic factors, and for ZIMSEC improper fractions), combining the logarithms in the answer and giving exact definite integrals.",
  "concepts": ["amaths.integ.partial-fractions"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

How would you integrate $\dfrac{x + 7}{(x - 1)(x + 3)}$? It is not a standard form, and the numerator is not the derivative of the denominator. But split it into partial fractions, $\dfrac{2}{x - 1} - \dfrac{1}{x + 3}$, and each piece integrates at sight to a logarithm. That is the whole idea of this lesson: **decompose first, integrate second**.

Integrals of this kind model, for example, the spread of a rumour through a Bulawayo school or the growth of a fish population in Lake Kariba, which lead to differential equations with rational functions. ZIMSEC Pure Mathematics (Form 5) examines this, including improper fractions; Cambridge 9709 examines it in Paper 3 only (topic 3.5), with proper fractions.

You need the partial-fraction methods of the algebra lesson, the integral $\int \frac{1}{ax + b}\,dx = \frac{1}{a}\ln|ax + b|$, and the laws of logarithms.

## Key definitions

:::formula{name="The integrals you will need"}
$$
\int \frac{A}{ax + b}\,dx = \frac{A}{a}\ln|ax + b| + c, \qquad \int \frac{B}{(ax + b)^{2}}\,dx = -\frac{B}{a(ax + b)} + c
$$

$$
\int \frac{2x}{x^{2} + k}\,dx = \ln(x^{2} + k) + c, \qquad \int \frac{1}{x^{2} + k}\,dx = \frac{1}{\sqrt{k}}\tan^{-1}\frac{x}{\sqrt{k}} + c \quad (k > 0)
$$

The partial-fraction forms themselves are not in MF19; $\int \frac{1}{x^{2} + a^{2}}\,dx$ is.
:::

:::definition{term="Combining logarithms"}
Answers such as $2\ln|x - 1| - \ln|x + 3|$ may be left as they are, or combined with the laws of logs into $\ln\left|\dfrac{(x - 1)^{2}}{x + 3}\right|$. Definite integrals are usually asked for as a single logarithm, $\ln k$.
:::

## Distinct linear factors

:::worked-solution[Example 1: find $\displaystyle\int\frac{x + 7}{(x - 1)(x + 3)}\,dx$]
1. Partial fractions: $x + 7 \equiv A(x + 3) + B(x - 1)$.
2. $x = 1$: $8 = 4A$, so $A = 2$. $x = -3$: $4 = -4B$, so $B = -1$.
3. Integrand: $\dfrac{2}{x - 1} - \dfrac{1}{x + 3}$.
4. Integrate: $2\ln|x - 1| - \ln|x + 3| + c = \ln\left|\dfrac{(x - 1)^{2}}{x + 3}\right| + c$.
:::

:::worked-solution[Example 2: the exact value of $\displaystyle\int_{2}^{4}\frac{x + 7}{(x - 1)(x + 3)}\,dx$]
1. From Example 1: $\Big[2\ln(x - 1) - \ln(x + 3)\Big]_{2}^{4}$ (both brackets are positive on $[2, 4]$).
2. Upper: $2\ln 3 - \ln 7$. Lower: $2\ln 1 - \ln 5 = -\ln 5$.
3. Difference: $2\ln 3 - \ln 7 + \ln 5 = \ln 9 + \ln 5 - \ln 7$.
4. Single logarithm: $\ln\dfrac{45}{7}$ (about 1.86).
:::

## Repeated linear factors

The term $\dfrac{B}{(x + 1)^{2}}$ does **not** give a logarithm: it is a power, $B(x + 1)^{-2}$, which integrates to $-B(x + 1)^{-1}$.

:::worked-solution[Example 3: evaluate $\displaystyle\int_{0}^{1}\frac{x + 3}{(x + 1)^{2}}\,dx$]
1. $x + 3 \equiv A(x + 1) + B$. $x = -1$: $B = 2$. Coefficients of $x$: $A = 1$.
2. Integrand: $\dfrac{1}{x + 1} + \dfrac{2}{(x + 1)^{2}}$.
3. Integrate: $\Big[\ln(x + 1) - \dfrac{2}{x + 1}\Big]_{0}^{1}$.
4. $= (\ln 2 - 1) - (0 - 2) = \ln 2 + 1$ (about 1.69).
:::

## A quadratic factor

A term $\dfrac{Bx + C}{x^{2} + k}$ splits into $\dfrac{Bx}{x^{2} + k}$, which gives a logarithm by recognition, and $\dfrac{C}{x^{2} + k}$, which gives an inverse tangent (Cambridge Paper 3; a ZIMSEC standard integral).

:::worked-solution[Example 4: find $\displaystyle\int\frac{x^{2} + x + 4}{x(x^{2} + 4)}\,dx$]
1. Form: $\dfrac{A}{x} + \dfrac{Bx + C}{x^{2} + 4}$; identity $x^{2} + x + 4 \equiv A(x^{2} + 4) + (Bx + C)x$.
2. $x = 0$: $4 = 4A$, $A = 1$. $x^{2}$: $1 = A + B$, $B = 0$. $x$: $1 = C$.
3. Integrand: $\dfrac{1}{x} + \dfrac{1}{x^{2} + 4}$.
4. Integrate: $\ln|x| + \dfrac{1}{2}\tan^{-1}\dfrac{x}{2} + c$.
:::

## Improper fractions (ZIMSEC)

If the numerator's degree is at least the denominator's, divide first; the polynomial part integrates by the power rule.

:::worked-solution[Example 5: find $\displaystyle\int\frac{x^{2} + 1}{(x - 1)(x + 1)}\,dx$]
1. $\dfrac{x^{2} + 1}{x^{2} - 1} = 1 + \dfrac{2}{x^{2} - 1}$.
2. $\dfrac{2}{(x - 1)(x + 1)} = \dfrac{1}{x - 1} - \dfrac{1}{x + 1}$.
3. Integrate: $x + \ln|x - 1| - \ln|x + 1| + c = x + \ln\left|\dfrac{x - 1}{x + 1}\right| + c$.
:::

## A checklist for any rational integrand

Before splitting anything, look for a quicker route. If the numerator is a multiple of the derivative of the denominator, recognition gives a single logarithm at once: $\int \frac{2x + 3}{x^{2} + 3x + 2}\,dx = \ln|x^{2} + 3x + 2| + c$, with no partial fractions needed (although they give the same answer). If the denominator is a single power of $x$, divide each term instead. Otherwise:

1. Check whether the fraction is proper; if not, divide (ZIMSEC).
2. Factorise the denominator completely.
3. Write the correct partial-fraction form and find the constants.
4. Check the constants at a spare value of $x$.
5. Integrate term by term, remembering the factor $\frac{1}{a}$ for each $ax + b$.
6. For a definite integral, substitute the limits and combine the logarithms.

These integrals are also the key step in solving separable differential equations such as $\frac{dx}{dt} = kx(10 - x)$, which model logistic growth; there the partial fractions of $\frac{1}{x(10 - x)}$ do the work.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge: Paper 3 only, proper fractions with the three standard denominator types; answers are often required "in the form $\ln k$" or "$a + \ln b$". ZIMSEC (Form 5): improper fractions too, so you may need to divide first.
:::

## Common mistakes

:::mistake{title="A logarithm from a squared factor"}
$\int \frac{2}{(x + 1)^{2}}\,dx = -\frac{2}{x + 1} + c$, not $2\ln(x + 1)^{2}$.
:::

:::mistake{title="Forgetting the coefficient of x"}
$\int \frac{3}{2x + 1}\,dx = \frac{3}{2}\ln|2x + 1|$: divide by the 2 inside the bracket.
:::

:::mistake{title="Wrong log laws"}
$2\ln 3 - \ln 7 + \ln 5 = \ln\frac{9 \times 5}{7}$, not $\ln(6 - 7 + 5)$. The coefficient becomes a power before you combine.
:::

:::mistake{title="Errors in the constants"}
A slip in $A$ or $B$ spoils every later step. Check the partial fractions at a convenient value of $x$ before integrating.
:::

## Exam tips

:::exam-tip
Questions are often in two parts: "(a) express in partial fractions; (b) hence find the integral". Part (b) usually allows follow-through from wrong constants, so always attempt it.
:::

:::exam-tip
"Give your answer in the form $\ln k$" means one logarithm with a single number $k$, such as $\ln\frac{45}{7}$.
:::

:::exam-tip
On a definite integral, note whether the brackets are positive on the interval; then the modulus signs can be dropped.
:::

## Summary

:::summary
- Split the integrand into partial fractions first (divide first if improper, ZIMSEC).
- $\frac{A}{ax + b} \to \frac{A}{a}\ln|ax + b|$; $\frac{B}{(ax + b)^{2}} \to -\frac{B}{a(ax + b)}$.
- $\frac{Bx + C}{x^{2} + k}$ gives a logarithm plus an inverse tangent.
- Combine logarithms with the log laws; give exact answers.
- Cambridge Paper 3: proper fractions only.
:::
