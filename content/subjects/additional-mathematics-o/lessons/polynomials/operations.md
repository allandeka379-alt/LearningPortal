---
{
  "key": "polynomials.operations",
  "title": "Polynomials: terms, operations and long division",
  "summary": "Name the parts of a polynomial, add, subtract and multiply polynomials, and divide a polynomial by a linear expression ax + b using algebraic long division to find the quotient and remainder.",
  "concepts": ["amath.polynomials.operations"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Polynomials are the most common functions in Additional Mathematics. The volume of a water tank in Masvingo whose sides depend on $x$, the profit of a maize farmer as a function of the area planted, the height of a ball: all are modelled by expressions such as $2x^{3} + 5x^{2} - x - 6$.

This lesson gives you the basic toolkit: the vocabulary of polynomials, how to add, subtract and multiply them, and **algebraic long division** by a linear expression. Division is the engine behind the next two lessons, the remainder and factor theorems and solving cubic equations, so practise it until it is automatic. Both ZIMSEC and Cambridge 0606 examine it.

You should already be able to expand brackets and collect like terms.

## Key definitions

:::definition{term="Polynomial"}
An expression made of terms $a x^{n}$, where each index $n$ is a whole number $0, 1, 2, \ldots$ and each coefficient $a$ is a constant. For example $4x^{3} - 2x^{2} + 7$. Expressions with $\frac{1}{x}$ or $\sqrt{x}$ are not polynomials.
:::

:::definition{term="Degree, leading term, constant term"}
The **degree** is the highest power of $x$ with a non-zero coefficient. The **leading term** is the term with that power and its coefficient is the **leading coefficient**. The **constant term** has no $x$. In $4x^{3} - 2x^{2} + 7$: degree 3, leading term $4x^{3}$, leading coefficient 4, constant term 7, and the coefficient of $x$ is 0.
:::

:::definition{term="Quotient and remainder"}
When a polynomial $f(x)$ (the **dividend**) is divided by a **divisor**, the result is a **quotient** $q(x)$ and a **remainder** $r$. For a linear divisor, the remainder is a constant.
:::

:::formula{name="The division identity"}
$$
\text{dividend} \equiv \text{divisor} \times \text{quotient} + \text{remainder}
$$

For example, $f(x) \equiv (x - 2)\,q(x) + r$. This is not in a formula list; you will use it in every division question to check your answer.
:::

Polynomials of degree 1, 2, 3 and 4 are called **linear**, **quadratic**, **cubic** and **quartic**.

## Adding, subtracting and multiplying

To add or subtract, collect **like terms** (the same power of $x$). Put brackets round a polynomial you are subtracting so that every sign changes.

To multiply, multiply **every term** of the first polynomial by **every term** of the second, then collect like terms. When you multiply polynomials of degrees $m$ and $n$, the product has degree $m + n$.

:::worked-solution[Example 1: expand $\left(2x^{2} - 3x + 1\right)(x + 4)$]
1. Multiply each term of the first bracket by $x$: $2x^{3} - 3x^{2} + x$.
2. Multiply each term of the first bracket by $4$: $8x^{2} - 12x + 4$.
3. Collect like terms: $2x^{3} + (-3 + 8)x^{2} + (1 - 12)x + 4$.
4. Answer: $2x^{3} + 5x^{2} - 11x + 4$, a cubic (degree $2 + 1 = 3$).
:::

A quick way to find **one** coefficient without expanding everything: list only the pairs of terms whose powers add to the power you want. For the $x^{2}$ term above, the pairs are $2x^{2} \times 4 = 8x^{2}$ and $-3x \times x = -3x^{2}$, so the coefficient of $x^{2}$ is $8 - 3 = 5$.

## Algebraic long division

Long division of polynomials follows the same rhythm as long division of numbers: **divide, multiply, subtract, bring down**, repeated until the remainder has a lower degree than the divisor.

Write the dividend in **descending powers** and put in a $0$ coefficient for any missing power (for example $4x^{3} + 0x^{2} - 3x + 5$). Otherwise the columns go wrong.

:::worked-solution[Example 2: divide $2x^{3} - 3x^{2} + 4x - 5$ by $x - 2$]
1. Divide the leading terms: $2x^{3} \div x = 2x^{2}$. This is the first term of the quotient.
2. Multiply: $2x^{2}(x - 2) = 2x^{3} - 4x^{2}$. Subtract from $2x^{3} - 3x^{2}$: this leaves $x^{2}$. Bring down $+4x$: $x^{2} + 4x$.
3. Divide: $x^{2} \div x = x$. Multiply: $x(x - 2) = x^{2} - 2x$. Subtract: $6x$. Bring down $-5$: $6x - 5$.
4. Divide: $6x \div x = 6$. Multiply: $6(x - 2) = 6x - 12$. Subtract: $-5 - (-12) = 7$.
5. The quotient is $2x^{2} + x + 6$ and the remainder is $7$.
6. Check with the identity: $(x - 2)\left(2x^{2} + x + 6\right) + 7 = 2x^{3} - 3x^{2} + 4x - 12 + 7 = 2x^{3} - 3x^{2} + 4x - 5$. ✓
:::

The steps can be set out as a table, one row for each stage:

| Quotient term | Multiply back | Subtract to leave |
| --- | --- | --- |
| $2x^{2}$ | $2x^{3} - 4x^{2}$ | $x^{2} + 4x$ |
| $x$ | $x^{2} - 2x$ | $6x - 5$ |
| $6$ | $6x - 12$ | $7$ |

### Dividing by $ax + b$

The method is the same when the divisor is $ax + b$ with $a \neq 1$; each quotient term is found by dividing by $ax$.

:::worked-solution[Example 3: divide $4x^{3} - 3x + 5$ by $2x + 1$]
1. Insert the missing term: $4x^{3} + 0x^{2} - 3x + 5$.
2. $4x^{3} \div 2x = 2x^{2}$. Multiply: $2x^{2}(2x + 1) = 4x^{3} + 2x^{2}$. Subtract: $-2x^{2} - 3x$.
3. $-2x^{2} \div 2x = -x$. Multiply: $-x(2x + 1) = -2x^{2} - x$. Subtract: $-2x + 5$.
4. $-2x \div 2x = -1$. Multiply: $-1(2x + 1) = -2x - 1$. Subtract: $5 - (-1) = 6$.
5. Quotient $2x^{2} - x - 1$, remainder $6$.
6. Check: $(2x + 1)\left(2x^{2} - x - 1\right) + 6 = 4x^{3} - 3x - 1 + 6 = 4x^{3} - 3x + 5$. ✓
:::

## Unknown coefficients in a product

Exam questions often hide a constant in one factor and give information about the product.

:::worked-solution[Example 4: the expansion of $\left(x^{2} + px + 3\right)(2x - 1)$ has no $x^{2}$ term. Find $p$ and the full expansion]
1. The $x^{2}$ terms come from $x^{2} \times (-1)$ and $px \times 2x$: $(2p - 1)x^{2}$.
2. No $x^{2}$ term means $2p - 1 = 0$, so $p = \frac{1}{2}$.
3. The $x$ terms: $px \times (-1) + 3 \times 2x = (6 - p)x = \frac{11}{2}x$.
4. The expansion is $2x^{3} + \frac{11}{2}x - 3$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC limits addition, subtraction and multiplication to polynomials of order (degree) at most three. Both boards divide by linear expressions $ax + b$ only; division by quadratics is not required.
:::

## Common mistakes

:::mistake{title="Leaving out a missing power"}
Dividing $x^{3} - 8$ by $x - 2$ without writing $x^{3} + 0x^{2} + 0x - 8$ puts terms in the wrong columns. Always insert zero coefficients.
:::

:::mistake{title="Subtracting only the first term"}
In each stage you subtract the **whole** product. $\left(-5\right) - \left(-12\right) = 7$, not $-17$. Brackets help.
:::

:::mistake{title="Sign errors when subtracting a polynomial"}
$(3x^{2} + x) - (x^{2} - 4x) = 2x^{2} + 5x$, not $2x^{2} - 3x$: the minus sign changes the sign of **every** term in the bracket.
:::

## Exam tips

:::exam-tip
When asked to "**find the quotient and remainder**", state both clearly at the end, for example "quotient $2x^{2} + x + 6$, remainder 7".
:::

:::exam-tip
Check every division with the identity dividend $=$ divisor $\times$ quotient $+$ remainder. Expanding takes a minute and catches almost every slip.
:::

:::exam-tip
Paper 1 in Cambridge 0606 has no calculator, and ZIMSEC division questions are designed for hand working. Keep fractions as fractions.
:::

## Summary

:::summary
- Degree = highest power; leading coefficient = its coefficient; constant term = the term without $x$.
- Add or subtract by collecting like terms; multiply every term by every term.
- Long division: divide, multiply, subtract, bring down; insert $0$ for missing powers.
- Dividing by a linear expression leaves a constant remainder.
- Check with dividend $\equiv$ divisor $\times$ quotient $+$ remainder.
:::
