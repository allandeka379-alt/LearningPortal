---
{
  "key": "algebra.logarithms",
  "title": "Logarithms",
  "summary": "Connect indices and logarithms, use the product, quotient and power laws to evaluate and simplify logarithms such as log₂ 8 and log 2 + log 5 without tables, and solve simple logarithmic equations.",
  "concepts": ["math.algebra.logarithms"],
  "objectives": ["zimsec/o-level/mathematics:7.4.3"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

How many times must you double US\$1 to reach US\$1 024? You need the power $x$ in $2^x = 1024$. A **logarithm** is exactly that power: we write $\log_2 1024 = 10$. Logarithms turn questions about powers into questions about ordinary numbers, and before calculators they were the main tool for multiplying large numbers by hand.

In the ZIMSEC O-Level syllabus you need to switch between index form and logarithm form, use the three laws of logarithms, evaluate expressions without tables or a calculator, and solve simple equations. (Logarithms are not in the Cambridge IGCSE syllabus.)

You should already know the laws of indices and the powers of small numbers, such as $2^5 = 32$ and $3^4 = 81$.

## Key definitions

:::definition{term="Logarithm"}
If $a^x = N$, then $\log_a N = x$, where the base $a$ is positive and not equal to 1. The logarithm of $N$ to base $a$ is the power to which $a$ must be raised to give $N$.
:::

:::definition{term="Common logarithm"}
A logarithm to base 10. It is usually written without the base: $\log 1000 = 3$ because $10^3 = 1000$.
:::

:::keyfact{title="Two values to know"}
$\log_a a = 1$ because $a^1 = a$, and $\log_a 1 = 0$ because $a^0 = 1$. In particular $\log 10 = 1$ and $\log 1 = 0$.
:::

:::formula{name="Laws of logarithms (same base)"}
$$
\log a + \log b = \log(ab) \qquad \log a - \log b = \log \frac{a}{b} \qquad \log a^n = n\log a
$$
:::

## Index form and logarithm form

Every index statement can be written as a logarithm statement, and the other way round. The base stays the base, and the logarithm equals the index.

| Index form | Logarithm form |
| --- | --- |
| $2^6 = 64$ | $\log_2 64 = 6$ |
| $10^{-2} = 0.01$ | $\log 0.01 = -2$ |
| $9^{\frac{1}{2}} = 3$ | $\log_9 3 = \frac{1}{2}$ |

:::worked-solution[Example 1: evaluate $\log_5 625$, $\log_2 \frac{1}{8}$ and $\log_8 4$]
1. $5^4 = 625$, so $\log_5 625 = 4$.
2. $\frac{1}{8} = 2^{-3}$, so $\log_2 \frac{1}{8} = -3$.
3. Let $\log_8 4 = y$. Then $8^y = 4$, so $2^{3y} = 2^2$, giving $y = \frac{2}{3}$.
:::

## Using the laws

The laws come straight from the laws of indices: multiplying numbers adds their powers, so adding logarithms multiplies the numbers.

:::worked-solution[Example 2: evaluate $3\log 2 + \log 125$ without a calculator]
1. Power law: $3\log 2 = \log 2^3 = \log 8$.
2. Product law: $\log 8 + \log 125 = \log 1000$.
3. $10^3 = 1000$, so the value is $3$.
:::

:::worked-solution[Example 3: given $\log 2 = p$ and $\log 3 = q$, express $\log 108$ and $\log 0.75$]
1. $108 = 2^2 \times 3^3$, so $\log 108 = 2\log 2 + 3\log 3 = 2p + 3q$.
2. $0.75 = \frac{3}{4} = \frac{3}{2^2}$, so $\log 0.75 = \log 3 - 2\log 2 = q - 2p$.
:::

## Solving equations

Two strategies cover most O-Level equations:

- If the equation is “one logarithm = a number”, change it into **index form**.
- If there are several logarithms, combine them into **one** logarithm on each side using the laws.

:::worked-solution[Example 4: solve $\log_2 (3x + 2) = 5$]
1. Index form: $3x + 2 = 2^5 = 32$.
2. $3x = 30$, so $x = 10$.
3. Check: $\log_2 32 = 5$. ✓
:::

:::worked-solution[Example 5: solve $\log x + \log(x + 21) = 2$]
1. Product law: $\log[x(x + 21)] = 2$.
2. Index form: $x(x + 21) = 10^2 = 100$, so $x^2 + 21x - 100 = 0$.
3. Factorise: $(x + 25)(x - 4) = 0$, so $x = 4$ or $x = -25$.
4. $\log(-25)$ does not exist, so reject $x = -25$. The solution is $x = 4$ (check: $\log 4 + \log 25 = \log 100 = 2$).
:::

## Common mistakes

:::mistake{title="Inventing a law for sums"}
$\log(a + b)$ is **not** $\log a + \log b$. For example $\log 4 + \log 25 = \log 100 = 2$, but $\log 29 \approx 1.46$.
:::

:::mistake{title="Dividing logarithms instead of subtracting"}
$\frac{\log 9}{\log 3}$ is not $\log 3$. Since $\log 9 = 2\log 3$, $\frac{\log 9}{\log 3} = 2$. The quotient law is about $\log 9 - \log 3 = \log 3$.
:::

:::mistake{title="Squaring the logarithm"}
$\log 7^2 = 2\log 7$, not $(\log 7)^2$. The power comes down in front as a multiplier.
:::

:::mistake{title="Keeping impossible solutions"}
Only positive numbers have logarithms. Check every solution in the original equation and reject any value that needs the logarithm of zero or a negative number.
:::

## Exam tips

:::exam-tip
Questions often say “without using tables or a calculator”. That is a signal that the numbers combine into a power of the base, such as $\log 50 + \log 2 = \log 100 = 2$.
:::

:::exam-tip
Name the law you use on each line (product, quotient or power). Clear steps earn method marks even if the final number is wrong.
:::

:::exam-tip
In “express in terms of $p$ and $q$” questions, first write the number as a product of the given numbers and powers of 10, for example $0.3 = \frac{3}{10}$, so $\log 0.3 = q - 1$.
:::

## Summary

:::summary
- $\log_a N = x$ means $a^x = N$: a logarithm is an index.
- $\log_a a = 1$ and $\log_a 1 = 0$; $\log$ without a base means base 10.
- Product, quotient and power laws: $\log ab = \log a + \log b$, $\log \frac{a}{b} = \log a - \log b$, $\log a^n = n\log a$.
- Solve by changing to index form or by combining into a single logarithm.
- Reject solutions that need the logarithm of a zero or negative number.
:::
