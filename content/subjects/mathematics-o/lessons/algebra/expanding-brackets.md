---
{
  "key": "algebra.expanding-brackets",
  "title": "Expanding brackets",
  "summary": "Expand single brackets, products of two brackets, perfect squares and (Cambridge Extended) products of three brackets, then simplify by collecting like terms.",
  "concepts": ["math.algebra.expanding-brackets"],
  "objectives": ["zimsec/o-level/mathematics:7.1.2", "cambridge/igcse/mathematics:2.2.1", "cambridge/igcse/mathematics:2.2.2"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

Farai is planning a rectangular vegetable bed behind his school in Masvingo. It is 3 m longer than a square bed of side $x$ m and 2 m wider. Its area is $(x + 3)(x + 2)$ square metres. To compare it with other beds, or to form an equation, he needs to write this area without brackets. Removing brackets by multiplying out is called **expanding**.

Expanding is the reverse of factorising, and you will use it whenever you simplify expressions, solve equations or prove results. In this lesson you will expand single brackets, pairs of brackets and squares of brackets, and, for Cambridge Extended, products of three brackets.

You should already know how to collect like terms and multiply negative numbers.

## Key definitions

:::definition{term="Expand"}
To multiply out brackets so that an expression is written as a sum of terms. “Expand and simplify” means expand and then collect like terms.
:::

:::definition{term="Binomial"}
An expression with two terms, such as $x + 3$ or $2a - 5b$. The product of two binomials usually gives four terms before simplifying.
:::

:::keyfact{title="The distributive law"}
Every term inside a bracket is multiplied by the term outside:

$$
a(b + c) = ab + ac
$$
:::

:::formula{name="Special products"}
$$
(a + b)^2 = a^2 + 2ab + b^2 \qquad (a - b)^2 = a^2 - 2ab + b^2 \qquad (a + b)(a - b) = a^2 - b^2
$$
:::

## Single brackets

Multiply each term inside by the term outside, taking care with signs. A negative number outside the bracket changes every sign inside.

:::worked-solution[Example 1: expand and simplify $4(x + 3) - 3(x - 2)$]
1. $4(x + 3) = 4x + 12$.
2. $-3(x - 2) = -3x + 6$, because $-3 \times (-2) = +6$.
3. Collect like terms: $4x - 3x + 12 + 6 = x + 18$.
:::

Remember that multiplication comes before subtraction. In $7 - 3(x - 2)$ you cannot work out $7 - 3$ first: the $-3$ multiplies the bracket, giving $7 - 3x + 6 = 13 - 3x$.

## Two brackets

To expand $(a + b)(c + d)$, multiply **each** term in the first bracket by **each** term in the second, then collect like terms. There are four products: $ac + ad + bc + bd$.

A grid keeps the four products organised. For $(3x - 2)(x + 5)$:

| $\times$ | $x$ | $+5$ |
| :---: | :---: | :---: |
| $3x$ | $3x^2$ | $+15x$ |
| $-2$ | $-2x$ | $-10$ |

Adding the four cells gives $3x^2 + 15x - 2x - 10 = 3x^2 + 13x - 10$.

:::worked-solution[Example 2: expand and simplify $(x + 6)(x - 2)$]
1. First terms: $x \times x = x^2$.
2. Outer and inner: $x \times (-2) = -2x$ and $6 \times x = 6x$.
3. Last terms: $6 \times (-2) = -12$.
4. Collect: $x^2 - 2x + 6x - 12 = x^2 + 4x - 12$.
:::

The same method works with two letters: $(3a + b)(a - 2b) = 3a^2 - 6ab + ab - 2b^2 = 3a^2 - 5ab - 2b^2$, since $ab$ and $ba$ are like terms.

## Squares and the difference of two squares

A square of a bracket means the bracket multiplied by itself. Always write it as two brackets until you are confident.

:::worked-solution[Example 3: expand $(2x - 5)^2$]
1. Write $(2x - 5)^2 = (2x - 5)(2x - 5)$.
2. Products: $4x^2$, $-10x$, $-10x$ and $+25$.
3. Collect: $4x^2 - 20x + 25$.
4. Check with the formula $(a - b)^2 = a^2 - 2ab + b^2$: $a = 2x$, $b = 5$ gives $4x^2 - 20x + 25$. ✓
:::

When the brackets differ only in the sign, the middle terms cancel: $(x + 9)(x - 9) = x^2 - 9x + 9x - 81 = x^2 - 81$.

## Three brackets (Cambridge Extended)

Expand two of the brackets first, then multiply every term of the result by every term of the third bracket.

:::worked-solution[Example 4: expand and simplify $(x + 1)(x - 2)(x + 4)$]
1. $(x + 1)(x - 2) = x^2 - 2x + x - 2 = x^2 - x - 2$.
2. Multiply by $x$: $x^3 - x^2 - 2x$.
3. Multiply by $+4$: $4x^2 - 4x - 8$.
4. Add and collect: $x^3 - x^2 + 4x^2 - 2x - 4x - 8 = x^3 + 3x^2 - 6x - 8$.
5. Check with $x = 1$: $(2)(-1)(5) = -10$ and $1 + 3 - 6 - 8 = -10$. ✓
:::

## Common mistakes

:::mistake{title="Squaring each term separately"}
$(x + 4)^2$ is **not** $x^2 + 16$. Writing it as $(x + 4)(x + 4)$ shows the two middle terms: $x^2 + 8x + 16$. Test with $x = 1$: $5^2 = 25$, but $1 + 16 = 17$.
:::

:::mistake{title="Forgetting to multiply every term"}
In $5(x - 2) - 2(x - 3)$ the $-2$ multiplies both the $x$ and the $-3$: $-2x + 6$, not $-2x - 3$. The answer is $3x - 4$.
:::

:::mistake{title="Sign errors with a negative multiplier"}
$-2(x - 4) = -2x + 8$, because a negative times a negative is positive. Many students write $-2x - 8$.
:::

:::mistake{title="Missing a product in two brackets"}
$(x + 5)(x + 3)$ needs four products. Writing $x^2 + 15$ uses only the first and last terms and loses $8x$: the answer is $x^2 + 8x + 15$.
:::

## Exam tips

:::exam-tip
“Expand and simplify” needs a fully simplified answer: collect every pair of like terms. Write the four products on one line before collecting, so that a method mark is visible even if you slip.
:::

:::exam-tip
Check any expansion by substituting a small number, such as $x = 1$ or $x = 2$, into the brackets and into your answer. It takes a few seconds and catches most sign errors.
:::

:::exam-tip
In a **show that** question, such as showing that an area equals $2x^2 + 3x - 5$, every line of working must appear. Put a bracket round an expression you subtract.
:::

## Summary

:::summary
- Multiply every term inside a bracket by the term outside; a negative multiplier changes every sign inside.
- Two brackets give four products; collect the like terms (usually the two middle terms).
- $(a \pm b)^2 = a^2 \pm 2ab + b^2$ and $(a + b)(a - b) = a^2 - b^2$.
- For three brackets (Extended), expand two first, then multiply by the third.
- Check every expansion by substituting a simple value.
:::
