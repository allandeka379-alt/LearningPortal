---
{
  "key": "algebra.partial-fractions",
  "title": "Partial fractions",
  "summary": "Split proper rational functions with linear, repeated linear and quadratic factors in the denominator into partial fractions, by substitution and by equating coefficients, and (ZIMSEC) divide first when the fraction is improper.",
  "concepts": ["amaths.algebra.partial-fractions"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Adding fractions is something you learnt long ago: $\dfrac{2}{x - 1} + \dfrac{3}{x + 2}$ combines into one fraction, $\dfrac{5x + 1}{(x - 1)(x + 2)}$. **Partial fractions** reverse this process. You start with one complicated fraction and split it into a sum of simpler ones.

Why bother? Because the simple pieces are easy to work with. $\dfrac{5x + 1}{(x - 1)(x + 2)}$ is awkward to integrate or expand as a series, but $\dfrac{2}{x - 1}$ and $\dfrac{3}{x + 2}$ are routine. Partial fractions are the first step in many longer A-Level questions: integration (giving logarithms), binomial series and the method of differences.

ZIMSEC Pure Mathematics (Form 5) examines partial fractions, **including improper fractions**. Cambridge 9709 examines them in Paper 3 only (topic 3.1) and restricts them to proper fractions with the three denominator types below. You should be confident with polynomial division and solving simultaneous equations.

## Key definitions

:::definition{term="Proper and improper fractions"}
A rational function $\dfrac{f(x)}{g(x)}$ is **proper** when the degree of $f$ is less than the degree of $g$, and **improper** otherwise. For example $\dfrac{x + 4}{x^{2} - 1}$ is proper and $\dfrac{x^{2} + 4}{x^{2} - 1}$ is improper.
:::

:::formula{name="The three standard forms"}
$$
\frac{px + q}{(ax + b)(cx + d)} \equiv \frac{A}{ax + b} + \frac{B}{cx + d}
$$

$$
\frac{px^{2} + qx + r}{(ax + b)(cx + d)^{2}} \equiv \frac{A}{ax + b} + \frac{B}{cx + d} + \frac{C}{(cx + d)^{2}}
$$

$$
\frac{px^{2} + qx + r}{(ax + b)(cx^{2} + d)} \equiv \frac{A}{ax + b} + \frac{Bx + C}{cx^{2} + d}
$$

The three-linear-factor case $(ax + b)(cx + d)(ex + f)$ simply has three constant numerators. These forms are not in Cambridge's MF19 list: learn them.
:::

The rule behind them: the numerator over each factor has degree **one less** than that factor. A linear factor gets a constant; an irreducible quadratic factor gets a linear numerator $Bx + C$; a repeated factor $(cx + d)^{2}$ needs both $\dfrac{B}{cx + d}$ and $\dfrac{C}{(cx + d)^{2}}$.

## Finding the constants

1. Write down the correct form with unknown constants.
2. Multiply both sides by the whole denominator to get an **identity** between polynomials.
3. **Substitute** values of $x$ that make factors zero; each gives one constant quickly.
4. **Equate coefficients** (often of $x^{2}$ or the constant term) for any constant still unknown.
5. Check by substituting another value, such as $x = 0$.

:::worked-solution[Example 1: express $\dfrac{5x + 1}{(x - 1)(x + 2)}$ in partial fractions]
1. Form: $\dfrac{5x + 1}{(x - 1)(x + 2)} \equiv \dfrac{A}{x - 1} + \dfrac{B}{x + 2}$.
2. Multiply by $(x - 1)(x + 2)$: $5x + 1 \equiv A(x + 2) + B(x - 1)$.
3. $x = 1$: $6 = 3A$, so $A = 2$.
4. $x = -2$: $-9 = -3B$, so $B = 3$.
5. Answer: $\dfrac{2}{x - 1} + \dfrac{3}{x + 2}$. Check at $x = 0$: left $\frac{1}{-2} = -\frac{1}{2}$; right $-2 + \frac{3}{2} = -\frac{1}{2}$.
:::

:::worked-solution[Example 2: a repeated factor, $\dfrac{5x^{2} + 2x + 1}{(x - 1)(x + 1)^{2}}$]
1. Form: $\dfrac{A}{x - 1} + \dfrac{B}{x + 1} + \dfrac{C}{(x + 1)^{2}}$.
2. Identity: $5x^{2} + 2x + 1 \equiv A(x + 1)^{2} + B(x - 1)(x + 1) + C(x - 1)$.
3. $x = 1$: $8 = 4A$, so $A = 2$.
4. $x = -1$: $5 - 2 + 1 = 4 = -2C$, so $C = -2$.
5. No value of $x$ isolates $B$, so equate coefficients of $x^{2}$: $5 = A + B$, so $B = 3$.
6. Answer: $\dfrac{2}{x - 1} + \dfrac{3}{x + 1} - \dfrac{2}{(x + 1)^{2}}$.
:::

:::worked-solution[Example 3: a quadratic factor, $\dfrac{5x^{2} - x + 4}{(x - 1)(x^{2} + 1)}$]
1. Form: $\dfrac{A}{x - 1} + \dfrac{Bx + C}{x^{2} + 1}$, since $x^{2} + 1$ has no real factors.
2. Identity: $5x^{2} - x + 4 \equiv A(x^{2} + 1) + (Bx + C)(x - 1)$.
3. $x = 1$: $8 = 2A$, so $A = 4$.
4. Coefficients of $x^{2}$: $5 = A + B$, so $B = 1$.
5. Constant terms: $4 = A - C$, so $C = 0$.
6. Answer: $\dfrac{4}{x - 1} + \dfrac{x}{x^{2} + 1}$. Check with the $x$ coefficients: $-1 = -B + C = -1$.
:::

## Improper fractions (ZIMSEC)

If the numerator's degree is at least the denominator's, divide first. Polynomial division gives a polynomial plus a **proper** fraction, which you then split as usual. For a quadratic over a quadratic, the polynomial part is just a constant.

:::worked-solution[Example 4: express $\dfrac{2x^{2} - 3x + 5}{(x - 1)(x - 3)}$ in partial fractions]
1. The denominator is $x^{2} - 4x + 3$, also degree 2, so the fraction is improper.
2. Divide: $2x^{2} - 3x + 5 = 2(x^{2} - 4x + 3) + (5x - 1)$.
3. So the fraction is $2 + \dfrac{5x - 1}{(x - 1)(x - 3)}$.
4. Write $5x - 1 \equiv A(x - 3) + B(x - 1)$. $x = 1$: $4 = -2A$, so $A = -2$. $x = 3$: $14 = 2B$, so $B = 7$.
5. Answer: $2 - \dfrac{2}{x - 1} + \dfrac{7}{x - 3}$.
:::

An equivalent method is to write the form $2 + \dfrac{A}{x - 1} + \dfrac{B}{x - 3}$ straight away, with the constant 2 from the ratio of the leading coefficients, and find $A$ and $B$ as before.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge: A Level only (Paper 3), proper fractions only, with denominators of the three standard types. ZIMSEC: Form 5, and improper fractions are included, so a ZIMSEC question may need division first.
:::

## Common mistakes

:::mistake{title="A constant over a quadratic factor"}
$\dfrac{B}{x^{2} + 1}$ is not enough: the numerator over an irreducible quadratic must be $Bx + C$. With only $B$ the identity usually has no solution.
:::

:::mistake{title="Forgetting one term for a repeated factor"}
$(x + 1)^{2}$ needs both $\dfrac{B}{x + 1}$ and $\dfrac{C}{(x + 1)^{2}}$. Missing one leaves two constants to fit three conditions.
:::

:::mistake{title="Splitting an improper fraction directly"}
$\dfrac{2x^{2} - 3x + 5}{(x - 1)(x - 3)}$ is **not** $\dfrac{A}{x - 1} + \dfrac{B}{x - 3}$: that sum is always proper. Divide first (ZIMSEC).
:::

:::mistake{title="Factorising $x^{2} + 4$"}
$x^{2} + 4$ has no real linear factors; $x^{2} - 4 = (x - 2)(x + 2)$ does. Check the denominator is fully factorised before choosing the form.
:::

## Exam tips

:::exam-tip
Always write the identity line ($5x + 1 \equiv A(x + 2) + B(x - 1)$). It earns the method mark even if a later substitution slips.
:::

:::exam-tip
Partial fractions are usually part (a) of a longer question. Check your constants at a third value of $x$ before you integrate or expand, because one error spoils every later part.
:::

:::exam-tip
For a repeated factor, use the two substitutions first, then equate the $x^{2}$ coefficients (or the constants) for the remaining constant.
:::

## Summary

:::summary
- Partial fractions reverse the addition of fractions; the fraction must be proper (or made proper by division, ZIMSEC).
- Linear factor: $\frac{A}{ax + b}$; repeated factor: $\frac{B}{cx + d} + \frac{C}{(cx + d)^{2}}$; quadratic factor: $\frac{Bx + C}{cx^{2} + d}$.
- Multiply by the denominator to get an identity, substitute the roots of the factors, then equate coefficients.
- Check the answer at a further value of $x$.
- Cambridge: Paper 3 only, proper fractions only.
:::
