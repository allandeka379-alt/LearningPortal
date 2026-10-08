---
{
  "key": "number.powers-and-roots",
  "title": "Powers and roots",
  "summary": "Recall squares, cubes and their roots without a calculator, find other powers and roots with one, and work with roots of decimals, fractions and negative numbers.",
  "concepts": ["math.number.powers-and-roots"],
  "objectives": ["zimsec/o-level/mathematics:1.1.7", "cambridge/igcse/mathematics:1.3.1", "cambridge/igcse/mathematics:1.3.2"],
  "estimatedMinutes": 25,
  "level": "core"
}
---
## Introduction

A square plot of land in Chinhoyi has an area of $169\ \text{m}^2$. How long is each side? A cube-shaped water tank holds $1\ \text{m}^3$. How long is each edge? Questions like these need **roots**, the reverse of **powers**.

On non-calculator papers you are expected to know the common squares and cubes by heart. On calculator papers you must use the power and root keys correctly. This lesson covers both.

You should already be able to multiply whole numbers and decimals.

## Key definitions

:::definition{term="Square and square root"}
The square of $n$ is $n^2 = n \times n$. A square root of $x$ is a number that gives $x$ when squared. The symbol $\sqrt{x}$ means the **positive** square root, so $\sqrt{49} = 7$.
:::

:::definition{term="Cube and cube root"}
The cube of $n$ is $n^3 = n \times n \times n$. The cube root $\sqrt[3]{x}$ is the number whose cube is $x$, so $\sqrt[3]{64} = 4$.
:::

:::definition{term="Power (index)"}
In $2^5$, the small number 5 is the power or index: $2^5 = 2 \times 2 \times 2 \times 2 \times 2 = 32$. The $n$th root $\sqrt[n]{x}$ reverses it: $\sqrt[5]{32} = 2$.
:::

## Facts to know without a calculator

:::keyfact{title="Squares of 1 to 15"}
| $n$ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $n^2$ | 1 | 4 | 9 | 16 | 25 | 36 | 49 | 64 | 81 | 100 | 121 | 144 | 169 | 196 | 225 |
:::

:::keyfact{title="Cubes of 1 to 5 and 10"}
$1^3 = 1$, $2^3 = 8$, $3^3 = 27$, $4^3 = 64$, $5^3 = 125$ and $10^3 = 1000$.
:::

Read the tables backwards for roots: $\sqrt{196} = 14$ and $\sqrt[3]{125} = 5$.

## Positive, negative and the two square roots

Both $7^2$ and $(-7)^2$ equal $49$, so 49 has **two** square roots, $7$ and $-7$. The symbol $\sqrt{49}$ means only the positive one. When you **solve** $x^2 = 49$ you must give both: $x = \pm 7$.

Cube roots are different. $(-4)^3 = -4 \times -4 \times -4 = -64$, so $\sqrt[3]{-64} = -4$. A negative number has exactly one cube root, and it is negative. A negative number has no square root among the numbers you use at this level, because every square is positive or zero.

## Decimals and fractions

Count decimal places: squaring doubles them, and a square root halves them.

- $0.3^2 = 0.09$ (because $3^2 = 9$ and one decimal place becomes two).
- $\sqrt{0.49} = 0.7$ and $\sqrt{0.0016} = 0.04$.
- $0.2^3 = 0.008$, so $\sqrt[3]{0.008} = 0.2$.
- For fractions, deal with the top and bottom separately: $\left(\frac{3}{5}\right)^2 = \frac{9}{25}$ and $\sqrt{\frac{16}{81}} = \frac{4}{9}$.

:::worked-solution[Example 1: without a calculator, work out $\sqrt{196} + \sqrt[3]{-64} - 0.3^2$]
1. $\sqrt{196} = 14$ because $14^2 = 196$.
2. $\sqrt[3]{-64} = -4$ because $(-4)^3 = -64$.
3. $0.3^2 = 0.3 \times 0.3 = 0.09$.
4. Total: $14 + (-4) - 0.09 = 10 - 0.09 = 9.91$.
:::

## Estimating a root

To estimate $\sqrt{75}$, find the squares on either side: $8^2 = 64$ and $9^2 = 81$. So $\sqrt{75}$ lies between 8 and 9, and since 75 is nearer to 81 than to 64, it is nearer to 9. (A calculator gives $8.66$.)

:::worked-solution[Example 2: between which two whole numbers does $\sqrt[3]{90}$ lie?]
1. List cubes: $4^3 = 64$ and $5^3 = 125$.
2. $64 < 90 < 125$, so $4 < \sqrt[3]{90} < 5$.
:::

## Using a calculator for powers and roots

Calculators have keys for $x^2$, $x^3$, a general power key (often marked $x^\square$ or $\wedge$), $\sqrt{\ }$, $\sqrt[3]{\ }$ and a general root key. Check what yours looks like and practise with answers you know, such as $2^5 = 32$.

:::worked-solution[Example 3: a cube with the same volume as a cuboid]
A cuboid measures 12 cm by 9 cm by 4 cm. A cube has the same volume. Find the length of an edge of the cube, correct to 3 significant figures.
1. Volume of the cuboid $= 12 \times 9 \times 4 = 432\ \text{cm}^3$.
2. Edge of the cube $= \sqrt[3]{432}$.
3. The calculator shows $7.5595\ldots$
4. Correct to 3 significant figures, the edge is $7.56$ cm.
:::

Use brackets with negative numbers: $(-3)^2 = 9$, but typing $-3^2$ on many calculators gives $-9$ because the calculator squares 3 first.

## Common mistakes

:::mistake{title="Doubling instead of squaring"}
$6^2 = 36$, not $12$. A power means repeated **multiplication**, not multiplication by the index.
:::

:::mistake{title="Losing decimal places"}
$0.2^2 = 0.04$, not $0.4$. Squaring a number with one decimal place gives two decimal places.
:::

:::mistake{title="Forgetting the negative solution"}
If $x^2 = 64$ then $x = 8$ **or** $x = -8$. But $\sqrt{64}$ on its own means just $8$.
:::

:::mistake{title="Thinking a negative number has no cube root"}
$\sqrt[3]{-8} = -2$, because $(-2)^3 = -8$. Only square roots of negative numbers are impossible here.
:::

## Exam tips

:::exam-tip
Learn the squares to $15^2$ and the cubes of 1 to 5 and 10 until they are automatic: many short non-calculator questions depend on them.
:::

:::exam-tip
On a calculator paper, write down the full calculator display (for example $7.5595\ldots$) before rounding. If your rounding is wrong, the working can still earn the method mark.
:::

:::exam-tip
Check roots by reversing them: if you claim $\sqrt[3]{0.008} = 0.2$, confirm $0.2 \times 0.2 \times 0.2 = 0.008$.
:::

## Summary

:::summary
- $n^2 = n \times n$ and $n^3 = n \times n \times n$; roots reverse powers.
- Know the squares of 1 to 15 and the cubes of 1 to 5 and 10, with their roots.
- $\sqrt{x}$ means the positive root, but $x^2 = 49$ has two solutions, $x = \pm 7$.
- A negative number has a negative cube root but no square root at this level.
- Squaring doubles the number of decimal places; a square root halves it.
- Use brackets for negative numbers on a calculator and round only at the end.
:::
