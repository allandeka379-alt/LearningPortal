---
{
  "key": "algebra.laws-of-indices",
  "title": "Laws of indices in algebra",
  "summary": "Simplify algebraic terms with positive, zero, negative and fractional indices, and solve equations such as 9ˣ = 243 by writing both sides as powers of the same base.",
  "concepts": ["math.algebra.laws-of-indices"],
  "objectives": ["zimsec/o-level/mathematics:7.4.1", "zimsec/o-level/mathematics:7.4.2", "cambridge/igcse/mathematics:2.4.1", "cambridge/igcse/mathematics:2.4.2"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A colony of bacteria that doubles every hour grows from $N$ cells to $N \times 2^t$ cells after $t$ hours, and a sum of money invested at 10% a year grows by a factor of $1.1^n$ in $n$ years. Formulas like these contain powers of letters, and to work with them you need the **laws of indices** applied to algebra.

You may already have used these laws with numbers, such as $2^3 \times 2^4 = 2^7$. In this lesson you will use them with letters and coefficients, meet zero, negative and fractional indices in algebraic terms, and solve equations in which the unknown is the index. Fractional indices are Cambridge Extended and ZIMSEC content.

## Key definitions

:::definition{term="Base and index"}
In $x^5$, $x$ is the **base** and 5 is the **index** (or power, or exponent). It means five $x$s multiplied together.
:::

:::formula{name="The three laws"}
$$
x^m \times x^n = x^{m+n} \qquad x^m \div x^n = x^{m-n} \qquad \left(x^m\right)^n = x^{mn}
$$
:::

:::formula{name="Zero, negative and fractional indices"}
$$
x^0 = 1 \qquad x^{-n} = \frac{1}{x^n} \qquad x^{\frac{1}{n}} = \sqrt[n]{x} \qquad x^{\frac{m}{n}} = \left(\sqrt[n]{x}\right)^m
$$
:::

The laws only combine powers of the **same base**: $x^3 \times x^4 = x^7$, but $x^3 \times y^4$ stays as it is.

## Terms with coefficients

Deal with the numbers and each letter separately: multiply or divide the numbers in the usual way, and use the laws for the indices.

:::worked-solution[Example 1: simplify $4p^3 \times 6p^5$ and $20a^6b^4 \div 5a^2b$]
1. $4 \times 6 = 24$ and $p^{3+5} = p^8$, so $4p^3 \times 6p^5 = 24p^8$.
2. $20 \div 5 = 4$, $a^{6-2} = a^4$ and $b^{4-1} = b^3$.
3. So $20a^6b^4 \div 5a^2b = 4a^4b^3$.
:::

A power of a bracket applies to **every** factor inside it, including the number.

:::worked-solution[Example 2: simplify $(3x^2y)^2 \times 2xy^{-3}$]
1. Square each factor: $(3x^2y)^2 = 3^2 x^4 y^2 = 9x^4y^2$.
2. Multiply by $2xy^{-3}$: $9 \times 2 = 18$, $x^{4+1} = x^5$, $y^{2-3} = y^{-1}$.
3. Answer: $18x^5y^{-1}$, which can be written $\dfrac{18x^5}{y}$.
:::

## Zero and negative indices

Any non-zero base to the power 0 is 1, because $x^3 \div x^3 = x^0$ and also equals 1. Take care with coefficients: $7x^0 = 7 \times 1 = 7$, while $(7x)^0 = 1$.

A negative index means a **reciprocal**, not a negative number: $x^{-4} = \frac{1}{x^4}$. Again, notice exactly what the index applies to:

- $3x^{-2} = \frac{3}{x^2}$ (only $x$ has the negative index);
- $(3x)^{-2} = \frac{1}{9x^2}$ (the whole bracket does).

## Fractional indices (Cambridge Extended, ZIMSEC)

The denominator of a fractional index is a root and the numerator is a power. Take the root first to keep numbers small.

:::worked-solution[Example 3: simplify $\left(81x^{12}\right)^{\frac{3}{4}}$]
1. Fourth root: $\sqrt[4]{81} = 3$ and $(x^{12})^{\frac{1}{4}} = x^3$, giving $3x^3$.
2. Cube: $(3x^3)^3 = 27x^9$.
3. Answer: $27x^9$.
:::

:::worked-solution[Example 4: simplify $\left(64a^9\right)^{-\frac{2}{3}}$]
1. Ignore the minus sign for now. Cube root: $(64a^9)^{\frac{1}{3}} = 4a^3$.
2. Square: $(4a^3)^2 = 16a^6$.
3. The negative index gives the reciprocal: $\dfrac{1}{16a^6}$.
:::

## Equations with the unknown in the index

Write both sides as powers of the **same base**. If $a^p = a^q$, then $p = q$.

:::worked-solution[Example 5: solve $9^x = 243$]
1. Both 9 and 243 are powers of 3: $9 = 3^2$ and $243 = 3^5$.
2. $(3^2)^x = 3^5$, so $3^{2x} = 3^5$.
3. Equate the indices: $2x = 5$, so $x = \frac{5}{2}$.
:::

:::worked-solution[Example 6: solve $2^{3x + 1} = \frac{1}{16}$]
1. $16 = 2^4$, so $\frac{1}{16} = 2^{-4}$.
2. $2^{3x + 1} = 2^{-4}$, so $3x + 1 = -4$.
3. $3x = -5$ and $x = -\frac{5}{3}$.
:::

Harder equations have several powers multiplied together. Write each one with the same base, then add the indices.

:::worked-solution[Example 7: solve $9^x \times \left(\frac{1}{3}\right)^{x + 2} = 27$]
1. Write each number as a power of 3: $9 = 3^2$, $\frac{1}{3} = 3^{-1}$ and $27 = 3^3$.
2. $9^x = 3^{2x}$ and $\left(\frac{1}{3}\right)^{x + 2} = 3^{-x - 2}$.
3. Multiplying adds the indices: $3^{2x - x - 2} = 3^3$, so $x - 2 = 3$.
4. $x = 5$.
:::

## Putting the laws together

In a longer simplification, deal with brackets first, then multiplication and division, and finish by writing any negative indices as fractions if the question asks for positive indices.

:::worked-solution[Example 8: simplify $\dfrac{x^{\frac{5}{2}} \times x^{-\frac{1}{2}}}{x^{-2}}$]
1. Numerator: $x^{\frac{5}{2} - \frac{1}{2}} = x^2$.
2. Divide: $x^{2 - (-2)} = x^4$.
3. Check with $x = 4$: $\frac{32 \times \frac{1}{2}}{\frac{1}{16}} = 256 = 4^4$. ✓
:::

## Common mistakes

:::mistake{title="Multiplying indices when you should add"}
$x^4 \times x^6 = x^{10}$, not $x^{24}$. Multiply indices only for a power of a power: $(x^4)^6 = x^{24}$.
:::

:::mistake{title="Forgetting the coefficient inside a bracket"}
$(3x^2)^3 = 27x^6$, not $3x^6$ or $9x^6$. The 3 is raised to the power 3: $3^3 = 27$.
:::

:::mistake{title="Reading a negative index as a negative number"}
$x^{-2}$ is $\frac{1}{x^2}$, which is positive when $x = 3$: it equals $\frac{1}{9}$, not $-9$.
:::

:::mistake{title="Adding coefficients"}
$2a^3 \times 7a^2$ is $14a^5$, not $9a^5$: the coefficients are multiplied.
:::

## Exam tips

:::exam-tip
“Simplify” with indices usually means one term with each letter appearing once. If the question asks for **positive indices**, rewrite $x^{-4}$ as $\frac{1}{x^4}$ at the end.
:::

:::exam-tip
In index equations, show the line where both sides have the same base, such as $3^{2x} = 3^5$. That line usually earns the method mark.
:::

:::exam-tip
Learn the small powers by heart: powers of 2 up to 128, of 3 up to 243, of 5 up to 625, and squares and cubes. Non-calculator papers rely on them.
:::

## Summary

:::summary
- Multiply: add indices; divide: subtract indices; power of a power: multiply indices.
- Treat coefficients separately, and raise every factor in a bracket to the power.
- $x^0 = 1$, $x^{-n} = \frac{1}{x^n}$, and $x^{\frac{m}{n}}$ is the $n$th root raised to the power $m$.
- To solve $a^{f(x)} = b$, write both sides as powers of the same base and equate the indices.
:::
