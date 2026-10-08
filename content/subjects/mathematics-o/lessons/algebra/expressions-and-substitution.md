---
{
  "key": "algebra.expressions-and-substitution",
  "title": "Algebraic expressions and substitution",
  "summary": "Use letters for numbers, write expressions and formulas from words, collect like terms, and substitute positive, negative and fractional values into expressions and formulas.",
  "concepts": ["math.algebra.expressions-and-substitution"],
  "objectives": ["zimsec/o-level/mathematics:7.1.1", "cambridge/igcse/mathematics:2.1.1", "cambridge/igcse/mathematics:2.1.2"],
  "estimatedMinutes": 30,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

A kombi operator in Harare charges each passenger US\$1 a trip. On a day when the kombi makes $n$ trips with 15 passengers each, the takings are $15n$ dollars. The letter $n$ stands for a number that changes from day to day, and the **expression** $15n$ works for every day at once. That is the power of algebra: one short statement describes many calculations.

In this lesson you will learn the language of algebra, how to write expressions from words, how to simplify them by collecting like terms, and how to **substitute** numbers (including negative numbers and fractions) into expressions and formulas. Every later algebra topic depends on these skills.

You should already be confident with the order of operations and with adding, subtracting, multiplying and dividing negative numbers.

## Key definitions

:::definition{term="Variable"}
A letter that stands for a number that can change or is not yet known, such as $x$, $n$ or $t$.
:::

:::definition{term="Term and coefficient"}
A **term** is a part of an expression separated from the rest by $+$ or $-$ signs. The **coefficient** is the number multiplying the letters in a term, including its sign. In $5x^2 - 3x + 8$ the terms are $5x^2$, $-3x$ and $8$, and the coefficient of $x$ is $-3$.
:::

:::definition{term="Expression, equation and formula"}
An **expression** has no equals sign, for example $3a + 2b$. An **equation** says two expressions are equal and can be solved, for example $3a + 2 = 14$. A **formula** connects quantities, for example $A = lw$ for the area of a rectangle.
:::

:::definition{term="Like terms"}
Terms with exactly the same letters raised to the same powers, such as $4xy$ and $-7yx$. Only like terms can be added or subtracted.
:::

:::keyfact{title="Algebraic shorthand"}
- $3 \times a$ is written $3a$ (the number comes first).
- $a \times b$ is written $ab$, and $a \times a$ is written $a^2$.
- $a \div b$ is written $\frac{a}{b}$.
:::

## Writing expressions from words

Read the words carefully and decide which operation each phrase describes. The order matters for subtraction and division.

| Words | Expression |
| --- | --- |
| 5 more than $x$ | $x + 5$ |
| 5 less than $x$ | $x - 5$ |
| $x$ less than 5 | $5 - x$ |
| twice the sum of $a$ and $b$ | $2(a + b)$ |
| $p$ shared equally among 4 | $\frac{p}{4}$ |
| the square of $3y$ | $(3y)^2 = 9y^2$ |

Brackets show that a whole expression is treated as one quantity.

:::worked-solution[Example 1: Rudo’s stationery]
Rudo buys $n$ exercise books at US\$0.75 each and one pen for US\$1.20. Write an expression for the total cost, and for her change from US\$10.

1. The books cost $0.75 \times n = 0.75n$ dollars.
2. Total cost: $0.75n + 1.20$ dollars.
3. Change: $10 - (0.75n + 1.20)$.
4. Remove the bracket: the minus sign applies to both terms, giving $10 - 0.75n - 1.20 = 8.80 - 0.75n$ dollars.
:::

## Collecting like terms

To simplify an expression, add or subtract the coefficients of like terms. Each term takes the sign in front of it, so it helps to underline or circle the terms of each kind.

:::worked-solution[Example 2: simplify $7a + 3b - 2a - 5b + 4$]
1. The $a$ terms: $7a - 2a = 5a$.
2. The $b$ terms: $3b - 5b = -2b$.
3. The number term stays as $+4$.
4. Answer: $5a - 2b + 4$.
:::

Terms with different powers are **unlike**: $4x^2 + 3x$ cannot be simplified, because $x^2$ and $x$ are different quantities. But $5ab - 2ba = 3ab$, because $ab$ and $ba$ are the same product.

## Substitution

To **substitute** means to replace each letter by a given number and then work out the value. Two habits prevent most errors:

1. Write the numbers in brackets, especially negative numbers and fractions.
2. Follow the order of operations: brackets, then indices (powers), then multiplication and division, then addition and subtraction.

:::worked-solution[Example 3: find $a^2 - 2ab + b$ when $a = -3$ and $b = 4$]
1. Substitute with brackets: $(-3)^2 - 2(-3)(4) + (4)$.
2. Powers first: $(-3)^2 = 9$.
3. Multiply: $2 \times (-3) \times 4 = -24$, so $-2ab = -(-24) = +24$.
4. Add: $9 + 24 + 4 = 37$.
:::

:::worked-solution[Example 4: a formula with a negative value]
The formula $F = \frac{9C}{5} + 32$ changes degrees Celsius to degrees Fahrenheit. A freezer is set to $C = -15$. Find $F$.

1. $9C = 9 \times (-15) = -135$.
2. $\frac{-135}{5} = -27$.
3. $F = -27 + 32 = 5$.
:::

Fractions work in exactly the same way.

:::worked-solution[Example 5: find $6xy - 4x^2$ when $x = \frac{1}{2}$ and $y = -\frac{1}{3}$]
1. $6xy = 6 \times \frac{1}{2} \times \left(-\frac{1}{3}\right) = 3 \times \left(-\frac{1}{3}\right) = -1$.
2. $x^2 = \left(\frac{1}{2}\right)^2 = \frac{1}{4}$, so $4x^2 = 1$.
3. $6xy - 4x^2 = -1 - 1 = -2$.
:::

## Common mistakes

:::mistake{title="Squaring a negative number without brackets"}
When $x = -3$, some students write $x^2 = -9$. In fact $(-3)^2 = (-3) \times (-3) = +9$. The expression $-3^2$ means $-(3^2) = -9$, which is why brackets are essential.
:::

:::mistake{title="Squaring the coefficient as well"}
$2x^2$ means $2 \times x^2$. When $x = 3$ it equals $2 \times 9 = 18$, not $(2 \times 3)^2 = 36$. Only the letter directly before the index is squared.
:::

:::mistake{title="Combining unlike terms"}
$3x + 2y$ is not $5xy$, and $x^2 + x^2$ is $2x^2$, not $x^4$. You can only add the coefficients of like terms.
:::

:::mistake{title="Reversing a subtraction"}
“7 less than $n$” is $n - 7$, not $7 - n$. Check with a number: 7 less than 10 is 3, and $10 - 7 = 3$.
:::

## Exam tips

:::exam-tip
When a question says **write an expression**, give an expression with no equals sign and simplify it fully. When it says **find the value**, show the substitution line, for example $2(7) - 5(-1)$: a method mark is often available for it.
:::

:::exam-tip
In a context question, finish with units or a sentence, such as “Her change is US\$5.05.” Money answers should have two decimal places.
:::

:::exam-tip
Check a simplified expression by substituting a simple number, such as $x = 2$, into the original and into your answer. If the values differ, look for a sign error.
:::

## Summary

:::summary
- Letters stand for numbers; write $3a$, $ab$, $a^2$ and $\frac{a}{b}$ in algebra.
- Translate words carefully: “less than” and “divided by” depend on order, and brackets group a whole quantity.
- Only like terms (same letters, same powers) can be collected; each term keeps its own sign.
- Substitute with brackets and follow the order of operations; $(-3)^2 = 9$ but $-3^2 = -9$.
- Show the substitution step in exams, and check simplifications with a test value.
:::
