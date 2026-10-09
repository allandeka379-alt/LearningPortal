---
{
  "key": "indices.indices",
  "title": "Indices and exponential equations",
  "summary": "Use the laws of indices, including zero, negative and fractional indices, to simplify expressions without a calculator, and solve exponential equations by matching bases or by a substitution that gives a quadratic.",
  "concepts": ["amath.indices.indices"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Indices are the shorthand of algebra. Compound interest on a savings account in Harare, the growth of a bacteria culture in a laboratory in Bulawayo, the decay of a medicine in the bloodstream: all of these are written with powers such as $2^{x}$ or $(1.05)^{n}$. Before you can work with logarithms, exponential graphs or calculus, you must be fluent with the laws of indices.

In ZIMSEC Additional Mathematics, indices are tested directly: you simplify expressions with negative and fractional indices **without a calculator**, and you solve **exponential equations** where the unknown is in the power. Cambridge 0606 does not examine this topic on its own, but uses it in almost every question on logarithms, exponentials and calculus, so it is assumed knowledge there.

You should already know how to multiply out brackets, factorise quadratics and work with fractions.

## Key definitions

:::definition{term="Index (power, exponent)"}
In $a^{n}$, the number $a$ is the **base** and $n$ is the **index**. For a positive whole number $n$, $a^{n}$ means $n$ copies of $a$ multiplied together.
:::

:::definition{term="Exponential equation"}
An equation in which the unknown appears in an index, for example $3^{x} = 81$ or $2^{2x} - 6 \times 2^{x} + 8 = 0$.
:::

:::formula{name="The laws of indices"}
For $a > 0$ and any rational $m$ and $n$:

$$
a^{m} \times a^{n} = a^{m+n} \qquad a^{m} \div a^{n} = a^{m-n} \qquad \left(a^{m}\right)^{n} = a^{mn}
$$

$$
a^{0} = 1 \qquad a^{-n} = \frac{1}{a^{n}} \qquad a^{\frac{1}{n}} = \sqrt[n]{a} \qquad a^{\frac{m}{n}} = \left(\sqrt[n]{a}\right)^{m}
$$

Also $(ab)^{n} = a^{n}b^{n}$ and $\left(\dfrac{a}{b}\right)^{n} = \dfrac{a^{n}}{b^{n}}$. These are not in any formula list: learn them.
:::

## Zero, negative and fractional indices

The three "unusual" indices all come from keeping the law $a^{m} \div a^{n} = a^{m-n}$ true.

- $a^{3} \div a^{3} = 1$, but the law gives $a^{0}$. So $a^{0} = 1$ for any non-zero $a$.
- $a^{2} \div a^{5} = \dfrac{1}{a^{3}}$, but the law gives $a^{-3}$. So a **negative index means a reciprocal**. It never makes the answer negative: $2^{-3} = \frac{1}{8}$.
- $a^{\frac{1}{2}} \times a^{\frac{1}{2}} = a^{1}$, so $a^{\frac{1}{2}} = \sqrt{a}$. In general the **denominator of a fractional index is a root** and the numerator is a power.

When you evaluate $a^{\frac{m}{n}}$ by hand, **take the root first**, then the power. The numbers stay small: $27^{\frac{2}{3}} = 3^{2} = 9$ is much easier than finding the cube root of $27^{2} = 729$.

A negative fractional index combines all three steps: reciprocal, root, power, in any order that keeps the numbers small.

:::worked-solution[Example 1: evaluate $27^{\frac{2}{3}} \times 16^{-\frac{3}{4}}$ without a calculator]
1. $27^{\frac{2}{3}} = \left(\sqrt[3]{27}\right)^{2} = 3^{2} = 9$.
2. $16^{-\frac{3}{4}} = \dfrac{1}{16^{\frac{3}{4}}} = \dfrac{1}{\left(\sqrt[4]{16}\right)^{3}} = \dfrac{1}{2^{3}} = \dfrac{1}{8}$.
3. Multiply: $9 \times \dfrac{1}{8} = \dfrac{9}{8}$.
:::

## Simplifying algebraic expressions

To simplify a product or quotient of terms, deal with the **numbers** and with **each letter separately**. Add indices when multiplying the same base, subtract when dividing. Give the final answer with positive indices unless the question asks for another form.

:::worked-solution[Example 2: simplify $\dfrac{6x^{3}y^{-2} \times 2x^{-1}y^{5}}{4x^{2}y}$]
1. Numbers: $\dfrac{6 \times 2}{4} = 3$.
2. Powers of $x$: $x^{3} \times x^{-1} \div x^{2} = x^{3 - 1 - 2} = x^{0} = 1$.
3. Powers of $y$: $y^{-2} \times y^{5} \div y^{1} = y^{-2 + 5 - 1} = y^{2}$.
4. The expression simplifies to $3y^{2}$.
:::

## Exponential equations: matching the base

If $a^{p} = a^{q}$ with $a > 0$ and $a \neq 1$, then $p = q$. So the plan is:

1. Write every term as a power of the **same prime base** ($4 = 2^{2}$, $8 = 2^{3}$, $\frac{1}{9} = 3^{-2}$, $\sqrt{5} = 5^{\frac{1}{2}}$).
2. Use the laws of indices to collect each side into a single power.
3. Equate the indices and solve the linear (or quadratic) equation that results.

:::worked-solution[Example 3: solve $9^{x+1} = 27^{x}$]
1. Both 9 and 27 are powers of 3: $9 = 3^{2}$ and $27 = 3^{3}$.
2. Left side: $9^{x+1} = \left(3^{2}\right)^{x+1} = 3^{2x+2}$. Right side: $27^{x} = 3^{3x}$.
3. Equate the indices: $2x + 2 = 3x$.
4. So $x = 2$. Check: $9^{3} = 729$ and $27^{2} = 729$.
:::

## Exponential equations that become quadratics

Some equations contain both $a^{2x}$ and $a^{x}$. Because $a^{2x} = \left(a^{x}\right)^{2}$, the substitution $u = a^{x}$ turns the equation into a quadratic in $u$. Solve it, then return to $x$.

Remember that $a^{x} > 0$ for every real $x$. A **negative or zero value of $u$ gives no solution** and must be rejected with a reason.

:::worked-solution[Example 4: solve $3^{2x} - 12 \times 3^{x} + 27 = 0$]
1. Let $u = 3^{x}$, so $3^{2x} = u^{2}$.
2. The equation becomes $u^{2} - 12u + 27 = 0$.
3. Factorise: $(u - 3)(u - 9) = 0$, so $u = 3$ or $u = 9$.
4. $3^{x} = 3$ gives $x = 1$; $3^{x} = 9 = 3^{2}$ gives $x = 2$.
5. Solutions: $x = 1$ or $x = 2$.
:::

Terms such as $a^{x+3}$ or $a^{x-1}$ are written using $a^{x}$ first: $a^{x+3} = a^{3} \times a^{x}$ and $a^{x-1} = \dfrac{a^{x}}{a}$.

:::worked-solution[Example 5: show that $2^{x+3} + 2^{x} = 9 \times 2^{x}$ and hence solve $2^{x+3} + 2^{x} = 72$]
1. $2^{x+3} = 2^{3} \times 2^{x} = 8 \times 2^{x}$.
2. So $2^{x+3} + 2^{x} = 8 \times 2^{x} + 1 \times 2^{x} = 9 \times 2^{x}$, as required.
3. Hence $9 \times 2^{x} = 72$, so $2^{x} = 8 = 2^{3}$.
4. Therefore $x = 3$. Check: $2^{6} + 2^{3} = 64 + 8 = 72$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC examines this topic in its own right (Paper 1, no tables or calculator needed). Cambridge 0606 assumes it: the same skills appear inside questions on logarithms, exponential functions and equations reducible to quadratic form (for example $u = 2^{x}$).
:::

## Common mistakes

:::mistake{title="Making a negative index negative"}
$5^{-2}$ is $\frac{1}{25}$, not $-25$. A negative index means "one over"; it does not change the sign.
:::

:::mistake{title="Multiplying the bases"}
$2^{3} \times 3^{2}$ is $8 \times 9 = 72$; it is not $6^{5}$. You can only add indices when the **bases are the same**.
:::

:::mistake{title="Adding powers of a sum"}
$2^{x} + 2^{x} = 2 \times 2^{x} = 2^{x+1}$, not $2^{2x}$ and not $4^{x}$. Collect like terms; do not add the indices.
:::

:::mistake{title="Keeping an impossible root"}
In a substitution $u = a^{x}$, a value such as $u = -2$ gives no solution because $a^{x}$ is always positive. State this when you reject it.
:::

## Exam tips

:::exam-tip
**Evaluate** and **simplify** questions are set to be done by hand. Show the root and the power as separate steps; a bare answer from a calculator may lose the method marks.
:::

:::exam-tip
In "**show that** … **hence** solve" questions, the first part is the key to the second. Write each line of the rewrite clearly, end with the given expression, then use it straight away in the "hence" part.
:::

:::exam-tip
After solving, substitute your value back into the original equation. It takes ten seconds and catches sign slips and lost solutions.
:::

## Summary

:::summary
- Multiply: add indices; divide: subtract; power of a power: multiply. Only for the same base.
- $a^{0} = 1$, $a^{-n} = \dfrac{1}{a^{n}}$, $a^{\frac{m}{n}} = \left(\sqrt[n]{a}\right)^{m}$: take the root first.
- To solve $a^{p} = a^{q}$, write both sides as powers of the same base and equate the indices.
- Equations with $a^{2x}$ and $a^{x}$ become quadratics with $u = a^{x}$; reject $u \leq 0$.
- Rewrite $a^{x+k}$ as $a^{k} \times a^{x}$ before collecting terms.
:::
