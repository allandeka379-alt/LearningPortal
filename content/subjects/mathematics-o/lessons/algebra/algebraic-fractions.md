---
{
  "key": "algebra.algebraic-fractions",
  "title": "Algebraic fractions",
  "summary": "Find the HCF and LCM of algebraic expressions, simplify algebraic fractions by factorising, and add, subtract, multiply and divide them.",
  "concepts": ["math.algebra.algebraic-fractions"],
  "objectives": ["zimsec/o-level/mathematics:7.1.4", "cambridge/igcse/mathematics:2.3.1", "cambridge/igcse/mathematics:2.3.2"],
  "estimatedMinutes": 35,
  "level": "extended"
}
---
## Introduction

You already know how to work with number fractions: $\frac{6}{9} = \frac{2}{3}$ because 3 is a common factor, and $\frac{1}{3} + \frac{1}{4} = \frac{7}{12}$ because 12 is a common denominator. **Algebraic fractions** follow exactly the same rules; the only difference is that the factors are often brackets such as $(x + 3)$.

Algebraic fractions appear when you solve equations about speed and time, rearrange formulas, and work with rates. A minibus that covers 120 km at $x$ km/h takes $\frac{120}{x}$ hours, and comparing two such journeys means combining algebraic fractions.

This topic is in the ZIMSEC syllabus and is Cambridge **Extended** content. It relies completely on factorising, so revise that first if you need to.

## Key definitions

:::definition{term="Algebraic fraction"}
A fraction with letters in the numerator, the denominator or both, such as $\frac{3}{x}$ or $\frac{x^2 - 9}{x + 3}$.
:::

:::definition{term="HCF and LCM of expressions"}
The **highest common factor** is the largest expression that divides each one: take the factors they share, each to the **lowest** power. The **lowest common multiple** is the smallest expression that each one divides: take every factor, each to the **highest** power.
:::

:::keyfact{title="Cancel factors, never terms"}
Only a factor of the **whole** numerator and the **whole** denominator can be cancelled. In $\frac{x + 6}{6}$ the 6 on top is a term, so nothing cancels.
:::

## HCF and LCM of algebraic expressions

:::worked-solution[Example 1: HCF and LCM of $8x^3y$ and $12xy^2$]
1. Numbers: HCF of 8 and 12 is 4; LCM is 24.
2. Letters for the HCF (lowest powers): $x$ and $y$.
3. Letters for the LCM (highest powers): $x^3$ and $y^2$.
4. HCF $= 4xy$; LCM $= 24x^3y^2$.
:::

For expressions with brackets, factorise first. Since $x^2 - 9 = (x - 3)(x + 3)$ and $x^2 - x - 6 = (x - 3)(x + 2)$, the HCF is $(x - 3)$ and the LCM is $(x - 3)(x + 3)(x + 2)$.

## Simplifying

Factorise the numerator and the denominator completely, then cancel whole factors.

:::worked-solution[Example 2: simplify $\dfrac{x^2 - 16}{x^2 + 7x + 12}$]
1. Numerator: $x^2 - 16 = (x - 4)(x + 4)$.
2. Denominator: $x^2 + 7x + 12 = (x + 3)(x + 4)$.
3. Cancel the common factor $(x + 4)$: $\dfrac{x - 4}{x + 3}$.
:::

Trinomials with $a \neq 1$ work in the same way. Factorising often reveals a common bracket that was hidden.

:::worked-solution[Example 3: simplify $\dfrac{3x^2 - 5x - 2}{9x^2 - 1}$]
1. Numerator: $3x^2 - 5x - 2 = (3x + 1)(x - 2)$ (check: $3x^2 - 6x + x - 2$).
2. Denominator: $9x^2 - 1 = (3x - 1)(3x + 1)$, a difference of two squares.
3. Cancel $(3x + 1)$: $\dfrac{x - 2}{3x - 1}$.
4. Nothing else cancels: $x - 2$ and $3x - 1$ have no common factor.
:::

## Multiplying and dividing

To multiply, factorise everything and cancel any factor on top with any factor underneath. To divide, multiply by the reciprocal of the second fraction.

:::worked-solution[Example 4: simplify $\dfrac{4x}{x - 3} \times \dfrac{x^2 - 9}{8x^2}$]
1. Factorise: $x^2 - 9 = (x - 3)(x + 3)$.
2. Write as one fraction: $\dfrac{4x(x - 3)(x + 3)}{(x - 3) \times 8x^2}$.
3. Cancel $(x - 3)$, and $4x$ into $8x^2$ (leaving $2x$): $\dfrac{x + 3}{2x}$.
:::

:::worked-solution[Example 5: simplify $\dfrac{6}{x - 2} \div \dfrac{3}{x^2 - 4}$]
1. Turn the second fraction upside down and multiply: $\dfrac{6}{x - 2} \times \dfrac{x^2 - 4}{3}$.
2. Factorise: $x^2 - 4 = (x - 2)(x + 2)$.
3. Cancel $(x - 2)$, and 6 with 3: $2(x + 2)$.
:::

## Adding and subtracting

Use a common denominator, ideally the LCM of the denominators. Multiply each numerator by whatever its denominator was multiplied by, and keep each numerator in a bracket.

:::worked-solution[Example 6: write $\dfrac{x + 2}{3} - \dfrac{x - 4}{2}$ as a single fraction]
1. Common denominator: 6.
2. $\dfrac{2(x + 2)}{6} - \dfrac{3(x - 4)}{6}$.
3. Numerator: $2x + 4 - 3x + 12 = 16 - x$ (note $-3 \times -4 = +12$).
4. Answer: $\dfrac{16 - x}{6}$.
:::

:::worked-solution[Example 7: write $\dfrac{3}{x - 1} - \dfrac{2}{x + 2}$ as a single fraction]
1. Common denominator: $(x - 1)(x + 2)$.
2. Numerator: $3(x + 2) - 2(x - 1)$.
3. Expand: $3x + 6 - 2x + 2 = x + 8$.
4. Answer: $\dfrac{x + 8}{(x - 1)(x + 2)}$. Leave the denominator factorised.
:::

## Common mistakes

:::mistake{title="Cancelling terms instead of factors"}
$\frac{x^2 - 25}{x - 5}$ is not $x - 5$ or $x^2 - 5$. Factorise first: $\frac{(x - 5)(x + 5)}{x - 5} = x + 5$. Similarly $\frac{a + b}{a + c} \neq \frac{b}{c}$.
:::

:::mistake{title="Losing a sign when subtracting"}
In $\frac{x + 2}{3} - \frac{x - 4}{2}$, the second numerator is subtracted as a whole: $-3(x - 4) = -3x + 12$. Without a bracket students write $-3x - 12$.
:::

:::mistake{title="Adding the denominators"}
$\frac{x}{2} + \frac{x}{5}$ is not $\frac{2x}{7}$. Fractions are added over a common denominator: $\frac{5x + 2x}{10} = \frac{7x}{10}$.
:::

:::mistake{title="Inverting the wrong fraction"}
When dividing, only the **second** fraction is turned upside down. Inverting the first gives the reciprocal of the right answer.
:::

## Exam tips

:::exam-tip
Questions often come in steps: “(a) factorise the numerator; (b) factorise the denominator; (c) **hence** simplify the fraction.” The common bracket from (a) and (b) is the one that cancels.
:::

:::exam-tip
When asked for a “single fraction”, leave the denominator factorised and simplify the numerator. Check that the numerator does not share a factor with the denominator.
:::

:::exam-tip
Test your final answer by substituting a value such as $x = 2$ (avoid values that make a denominator zero) into the original and the simplified forms.
:::

## Summary

:::summary
- Algebraic fractions follow the same rules as number fractions.
- HCF: shared factors to the lowest power; LCM: all factors to the highest power.
- To simplify, factorise top and bottom completely and cancel whole factors only.
- To divide, multiply by the reciprocal of the second fraction.
- To add or subtract, use a common denominator and keep each numerator in brackets.
:::
