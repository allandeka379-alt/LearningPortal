---
{
  "key": "number.indices",
  "title": "Indices with numbers",
  "summary": "Use the laws of indices with numbers, and evaluate zero, negative and fractional powers such as 2⁻³ and 8^(−2/3) without a calculator.",
  "concepts": ["math.number.indices"],
  "objectives": ["zimsec/o-level/mathematics:7.4.1", "cambridge/igcse/mathematics:1.7.1", "cambridge/igcse/mathematics:1.7.2", "cambridge/igcse/mathematics:1.7.3"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

Scientists write the mass of a bacterium and the distance to the Sun using powers of ten, and banks use powers to work out compound interest. To use powers confidently you need a small set of rules, the **laws of indices**, and you need to know what zero, negative and fractional indices mean.

This lesson works with numbers only. The same laws are used with letters, such as $x^3 \times x^4$, in algebra.

You should already know that $2^5$ means $2 \times 2 \times 2 \times 2 \times 2$, and know your squares and cubes.

## Key definitions

:::definition{term="Base and index"}
In $5^3$, the **base** is 5 and the **index** (power or exponent) is 3. It means three 5s multiplied together: $5^3 = 125$.
:::

:::formula{name="The laws of indices"}
$$
a^m \times a^n = a^{m+n} \qquad a^m \div a^n = a^{m-n} \qquad \left(a^m\right)^n = a^{mn}
$$
:::

:::formula{name="Zero and negative indices"}
$$
a^0 = 1 \qquad a^{-n} = \frac{1}{a^n} \qquad \left(\frac{a}{b}\right)^{-n} = \left(\frac{b}{a}\right)^n
$$
:::

:::formula{name="Fractional indices (Cambridge Extended and ZIMSEC)"}
$$
a^{\frac{1}{n}} = \sqrt[n]{a} \qquad a^{\frac{m}{n}} = \left(\sqrt[n]{a}\right)^m
$$
:::

The laws only work when the **bases are the same**: $2^3 \times 2^4 = 2^7$, but $2^3 \times 3^4$ cannot be combined this way.

## Why the rules make sense

- $3^5 \div 3^2 = \frac{3 \times 3 \times 3 \times 3 \times 3}{3 \times 3} = 3^3$: two 3s cancel, so subtract the indices.
- $5^2 \div 5^2 = 1$, but the law gives $5^{2-2} = 5^0$. So $5^0 = 1$. Any non-zero number to the power 0 is 1.
- $2^2 \div 2^5 = \frac{1}{2^3}$, but the law gives $2^{-3}$. So $2^{-3} = \frac{1}{8}$. A negative index means "one over", not a negative number.
- $9^{\frac{1}{2}} \times 9^{\frac{1}{2}} = 9^1 = 9$, so $9^{\frac{1}{2}}$ is the number that multiplies by itself to give 9: $9^{\frac{1}{2}} = \sqrt{9} = 3$.

## Worked examples

:::worked-solution[Example 1: evaluate $3^5 \times 3^2 \div 3^4$]
1. Multiply: add the indices, $3^{5+2} = 3^7$.
2. Divide: subtract the indices, $3^{7-4} = 3^3$.
3. $3^3 = 27$.
:::

:::worked-solution[Example 2: evaluate $5^0 + 4^{-1} + 2^{-2}$]
1. $5^0 = 1$.
2. $4^{-1} = \frac{1}{4}$.
3. $2^{-2} = \frac{1}{2^2} = \frac{1}{4}$.
4. Total: $1 + \frac{1}{4} + \frac{1}{4} = 1\frac{1}{2}$.
:::

:::worked-solution[Example 3: evaluate $\left(\frac{2}{3}\right)^{-2}$]
1. A negative index turns the fraction upside down: $\left(\frac{2}{3}\right)^{-2} = \left(\frac{3}{2}\right)^2$.
2. Square the top and the bottom: $\frac{9}{4} = 2\frac{1}{4}$.
:::

For a fractional index $\frac{m}{n}$, take the root first (the denominator $n$), then the power (the numerator $m$). Rooting first keeps the numbers small.

:::worked-solution[Example 4: evaluate $27^{\frac{2}{3}}$ and $8^{-\frac{2}{3}}$]
1. $27^{\frac{2}{3}}$: the cube root of 27 is 3, and $3^2 = 9$.
2. $8^{-\frac{2}{3}}$: deal with the negative sign last. The cube root of 8 is 2, and $2^2 = 4$.
3. The negative index gives the reciprocal: $8^{-\frac{2}{3}} = \frac{1}{4}$.
:::

:::worked-solution[Example 5: find $n$ when $2^n = \frac{1}{32}$]
1. $32 = 2^5$, so $\frac{1}{32} = 2^{-5}$.
2. $2^n = 2^{-5}$, so $n = -5$.
:::

Decimals can be written as fractions first: $0.25^{-\frac{1}{2}} = \left(\frac{1}{4}\right)^{-\frac{1}{2}} = 4^{\frac{1}{2}} = 2$.

## Writing numbers as powers of a common base

Many index questions become easy once every number is written as a power of the same small base. Learn these: $4 = 2^2$, $8 = 2^3$, $16 = 2^4$, $32 = 2^5$, $64 = 2^6$; $9 = 3^2$, $27 = 3^3$, $81 = 3^4$; $25 = 5^2$, $125 = 5^3$.

:::worked-solution[Example 6: evaluate $\left(2^3\right)^2 \times 4^{-2}$]
1. $\left(2^3\right)^2 = 2^6$.
2. $4^{-2} = \left(2^2\right)^{-2} = 2^{-4}$.
3. $2^6 \times 2^{-4} = 2^{2} = 4$.
:::

:::example{title="Comparing large powers without a calculator"}
Which is larger, $2^{30}$ or $3^{20}$?

Write both with the same index: $2^{30} = \left(2^3\right)^{10} = 8^{10}$ and $3^{20} = \left(3^2\right)^{10} = 9^{10}$. Since $9 > 8$, $3^{20}$ is larger.
:::

## Common mistakes

:::mistake{title="Making a negative index give a negative number"}
$4^{-1} = \frac{1}{4}$, not $-4$. The negative index means a reciprocal.
:::

:::mistake{title="Multiplying the base by the index"}
$2^5 = 32$, not $2 \times 5 = 10$; and $8^{\frac{1}{3}} = 2$, not $\frac{8}{3}$.
:::

:::mistake{title="Saying a⁰ = 0"}
$7^0 = 1$. Any non-zero number to the power zero is 1.
:::

:::mistake{title="Multiplying the bases"}
$3^2 \times 3^4 = 3^6$, not $9^6$. The base stays the same; only the indices are added.
:::

## Exam tips

:::exam-tip
In non-calculator questions such as "find the value of $16^{-\frac{3}{4}}$", show the three steps (root, power, reciprocal). Each correct step can earn credit.
:::

:::exam-tip
When the answer is a fraction, give it exactly, such as $\frac{1}{16}$, unless the question asks for a decimal.
:::

:::exam-tip
To find an unknown index, write both sides as powers of the **same** base, for example $9^n = 27$ becomes $3^{2n} = 3^3$.
:::

## Summary

:::summary
- Same base: multiply by adding indices, divide by subtracting, and multiply indices for a power of a power.
- $a^0 = 1$ for any non-zero $a$.
- $a^{-n} = \frac{1}{a^n}$: a negative index means a reciprocal, not a negative number.
- $a^{\frac{1}{n}} = \sqrt[n]{a}$ and $a^{\frac{m}{n}} = \left(\sqrt[n]{a}\right)^m$: root first, then power.
- Write numbers as powers of a common base to compare them or to find an unknown index.
:::
