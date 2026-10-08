---
{
  "key": "algebra.factorising",
  "title": "Factorising algebraic expressions",
  "summary": "Factorise fully by taking out common factors, by grouping, as a difference of two squares, as a perfect square and as a quadratic trinomial, including ax² + bx + c and (Cambridge Extended) ax³ + bx² + cx.",
  "concepts": ["math.algebra.expanding-and-factorising"],
  "objectives": ["zimsec/o-level/mathematics:7.1.3", "cambridge/igcse/mathematics:2.2.3", "cambridge/igcse/mathematics:2.2.4"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Expanding turns a product into a sum: $3x(2x + 3) = 6x^2 + 9x$. **Factorising** goes the other way, turning a sum back into a product. It is one of the most useful skills in algebra: you need it to solve quadratic equations, to simplify algebraic fractions and even to do some arithmetic quickly. For example, a builder in Bulawayo who knows that $32.5^2 - 7.5^2 = (32.5 - 7.5)(32.5 + 7.5) = 25 \times 40$ can find an area of 1000 m² in his head.

In this lesson you will meet five types of factorisation and a routine for choosing between them. Cambridge Core needs common factors only; Cambridge Extended and ZIMSEC need all of them.

You should already be able to expand brackets confidently, because every factorisation is checked by expanding.

## Key definitions

:::definition{term="Factorise"}
To write an expression as a product of factors. “Factorise **completely**” (or “fully”) means that no factor can be factorised any further.
:::

:::definition{term="Highest common factor (HCF) of terms"}
The largest number and the highest powers of letters that divide every term. For $15p^2q$ and $25pq^2$ the HCF is $5pq$.
:::

:::formula{name="Difference of two squares"}
$$
a^2 - b^2 = (a - b)(a + b)
$$
:::

:::formula{name="Perfect squares"}
$$
a^2 + 2ab + b^2 = (a + b)^2 \qquad a^2 - 2ab + b^2 = (a - b)^2
$$
:::

## A routine for any expression

1. **Common factor first.** Always take out the HCF before anything else.
2. **Count the terms** that are left.
   - Two terms: is it a difference of two squares?
   - Three terms: is it a perfect square or a trinomial $ax^2 + bx + c$?
   - Four terms: try grouping in pairs.
3. **Check** by expanding, and look again at each bracket in case it factorises further.

## Common factors

:::worked-solution[Example 1: factorise completely $15p^2q - 25pq^2$]
1. HCF of 15 and 25 is 5. Both terms contain $p$ and $q$ at least once, so the HCF is $5pq$.
2. Divide each term by $5pq$: $15p^2q \div 5pq = 3p$ and $25pq^2 \div 5pq = 5q$.
3. Answer: $5pq(3p - 5q)$.
:::

Writing $pq(15p - 25q)$ is correct but not complete: 5 is still a common factor inside the bracket.

## Grouping

Four terms can often be split into two pairs that share a bracket.

:::worked-solution[Example 2: factorise $2x^2 - 6x + xy - 3y$]
1. Group in pairs: $(2x^2 - 6x) + (xy - 3y)$.
2. Factorise each pair: $2x(x - 3) + y(x - 3)$.
3. The bracket $(x - 3)$ is common: $(x - 3)(2x + y)$.
:::

## Difference of two squares and perfect squares

Two square terms with a minus sign between them factorise as a difference of two squares: $9a^2 - 16b^2 = (3a - 4b)(3a + 4b)$. Look for a common factor first: $2x^2 - 50 = 2(x^2 - 25) = 2(x - 5)(x + 5)$.

A trinomial whose first and last terms are squares and whose middle term is twice their product is a perfect square: $x^2 - 12x + 36 = (x - 6)^2$.

## Quadratic trinomials

For $x^2 + bx + c$, find two numbers that **multiply** to $c$ and **add** to $b$. For $x^2 - 9x + 20$ these are $-4$ and $-5$, so $x^2 - 9x + 20 = (x - 4)(x - 5)$.

When the coefficient of $x^2$ is not 1, split the middle term.

:::worked-solution[Example 3: factorise $2x^2 + 7x - 15$]
1. Multiply $a \times c = 2 \times (-15) = -30$.
2. Two numbers with product $-30$ and sum $7$: $10$ and $-3$.
3. Split the middle term: $2x^2 + 10x - 3x - 15$.
4. Group: $2x(x + 5) - 3(x + 5)$.
5. Answer: $(x + 5)(2x - 3)$. Check: $2x^2 - 3x + 10x - 15 = 2x^2 + 7x - 15$. ✓
:::

## Cubic expressions $ax^3 + bx^2 + cx$ (Cambridge Extended)

Every term contains $x$, so take it out first and then factorise the quadratic that is left.

:::worked-solution[Example 4: factorise completely $3x^3 + 5x^2 - 2x$]
1. Common factor $x$: $x(3x^2 + 5x - 2)$.
2. $a \times c = 3 \times (-2) = -6$; numbers with product $-6$ and sum $5$: $6$ and $-1$.
3. $3x^2 + 6x - x - 2 = 3x(x + 2) - (x + 2) = (x + 2)(3x - 1)$.
4. Answer: $x(3x - 1)(x + 2)$.
:::

## Common mistakes

:::mistake{title="Stopping too early"}
$5(x^2 - 4)$ is not fully factorised: $x^2 - 4 = (x - 2)(x + 2)$, so the full answer is $5(x - 2)(x + 2)$. Always look inside each bracket again.
:::

:::mistake{title="Treating a sum of squares as a difference"}
$x^2 + 25$ does **not** equal $(x + 5)(x - 5)$; that product is $x^2 - 25$. A sum of two squares has no factors of this type.
:::

:::mistake{title="Sign errors in trinomials"}
For $x^2 - x - 12$ the numbers must add to $-1$: they are $-4$ and $+3$, giving $(x - 4)(x + 3)$. Writing $(x + 4)(x - 3)$ gives $x^2 + x - 12$. Expand to check.
:::

:::mistake{title="Missing the common factor"}
Factorising $12p^2 - 75q^2$ as $(2p - 5q)(2p + 5q)$ loses the factor 3. Take out the HCF first: $3(4p^2 - 25q^2) = 3(2p - 5q)(2p + 5q)$.
:::

## Exam tips

:::exam-tip
“Factorise completely” is a signal that there is probably a common factor **and** a second step. One mark is often given for the common factor and one for the rest.
:::

:::exam-tip
If an earlier part asks you to factorise and the next part says **hence**, use the factors: for example to solve an equation, simplify a fraction or evaluate $76^2 - 24^2 = 52 \times 100 = 5200$ without a calculator.
:::

:::exam-tip
Factor order does not matter: $(x - 4)(x - 5)$ and $(x - 5)(x - 4)$ are the same answer. What matters is that your brackets expand to the original expression.
:::

## Summary

:::summary
- Factorising writes an expression as a product; check every answer by expanding.
- Take out the highest common factor first, then count the terms left.
- Two terms: difference of two squares $a^2 - b^2 = (a - b)(a + b)$; three terms: perfect square or trinomial; four terms: grouping.
- For $ax^2 + bx + c$, find two numbers with product $ac$ and sum $b$, split the middle term and group.
- “Completely” means no bracket can be factorised any further.
:::
