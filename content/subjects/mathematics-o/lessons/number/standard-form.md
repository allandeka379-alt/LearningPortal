---
{
  "key": "number.standard-form",
  "title": "Standard form",
  "summary": "Write very large and very small numbers as A × 10ⁿ with 1 ≤ A < 10, convert back to ordinary numbers, and calculate with standard form with and without a calculator.",
  "concepts": ["math.number.standard-form"],
  "objectives": ["zimsec/o-level/mathematics:1.4.1", "zimsec/o-level/mathematics:1.4.2", "cambridge/igcse/mathematics:1.8.1", "cambridge/igcse/mathematics:1.8.2"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

The Sun is about $150\,000\,000$ km from the Earth. Light travels about $300\,000\,000$ metres every second. A bacterium can be less than $0.000\,002$ m long. Numbers like these are hard to read and easy to copy wrongly, because it is difficult to count the zeros. **Standard form** writes them compactly: $1.5 \times 10^8$ km, $3 \times 10^8$ m/s and $2 \times 10^{-6}$ m.

You should already be able to multiply and divide by powers of 10 and use the laws of indices, such as $10^5 \times 10^3 = 10^8$.

## Key definitions

:::definition{term="Standard form"}
A number written as $A \times 10^n$, where $1 \leq A < 10$ and $n$ is an integer. For example, $45\,600\,000 = 4.56 \times 10^7$.
:::

:::keyfact{title="Checking the form"}
$A$ must have exactly one non-zero digit before the decimal point. So $3.5 \times 10^4$ is in standard form, but $35 \times 10^3$ and $0.35 \times 10^5$ are not, even though they have the same value.
:::

## Converting to and from standard form

For a **large** number, the power $n$ is positive: it counts how many places the decimal point moves to the left to give a number between 1 and 10. For a **small** number (less than 1), $n$ is negative.

:::worked-solution[Example 1: write $45\,600\,000$ and $0.000\,308$ in standard form]
1. $45\,600\,000$: put the point after the first digit, $4.56$. The point has moved 7 places to the left.
2. So $45\,600\,000 = 4.56 \times 10^7$.
3. $0.000\,308$: the first non-zero digit is 3, so $A = 3.08$. The point moves 4 places to the right.
4. So $0.000\,308 = 3.08 \times 10^{-4}$.
:::

To convert back, move the decimal point $n$ places: to the right if $n$ is positive, to the left if $n$ is negative. For example $6.2 \times 10^{-3} = 0.0062$ and $7.05 \times 10^5 = 705\,000$.

## Ordering numbers in standard form

Compare the powers of 10 first: the larger power gives the larger number (for positive numbers). Only when the powers are equal do you compare the values of $A$.

:::example{title="Put in order, smallest first: $4.1 \times 10^{-3}$, $3.9 \times 10^{-2}$, $8 \times 10^{-4}$, $5 \times 10^{-3}$"}
The powers are $-3$, $-2$, $-4$ and $-3$. The smallest power, $10^{-4}$, gives the smallest number, and $10^{-2}$ gives the largest. The two numbers with $10^{-3}$ are compared by $A$: $4.1 < 5$. So the order is $8 \times 10^{-4}$, $4.1 \times 10^{-3}$, $5 \times 10^{-3}$, $3.9 \times 10^{-2}$.
:::

## Multiplying and dividing without a calculator

Deal with the numbers and the powers of 10 separately, then adjust so that $A$ is between 1 and 10.

:::worked-solution[Example 2: work out $(4 \times 10^5) \times (6 \times 10^3)$]
1. Multiply the numbers: $4 \times 6 = 24$.
2. Multiply the powers: $10^5 \times 10^3 = 10^8$.
3. So the product is $24 \times 10^8$, which is not yet in standard form.
4. $24 = 2.4 \times 10^1$, so the answer is $2.4 \times 10^9$.
:::

:::worked-solution[Example 3: work out $(9 \times 10^4) \div (3 \times 10^{-2})$]
1. Divide the numbers: $9 \div 3 = 3$.
2. Divide the powers: $10^4 \div 10^{-2} = 10^{4 - (-2)} = 10^6$.
3. Answer: $3 \times 10^6$.
:::

## Adding and subtracting

The powers of 10 must match before you can add, so it is usually easiest to change to ordinary numbers.

:::worked-solution[Example 4: work out $3.2 \times 10^4 + 5.1 \times 10^3$]
1. $3.2 \times 10^4 = 32\,000$ and $5.1 \times 10^3 = 5\,100$.
2. $32\,000 + 5\,100 = 37\,100$.
3. In standard form: $3.71 \times 10^4$.
:::

## Using a calculator

Calculators have a key, usually marked $\times 10^x$ or EXP, for entering standard form. To enter $3 \times 10^8$, press 3, then that key, then 8. Do **not** type "$\times 10$" as well, or the value will be ten times too big. On Cambridge Core papers, calculations in standard form are done on the calculator paper.

:::worked-solution[Example 5: how long does sunlight take to reach the Earth?]
Light travels at about $3 \times 10^8$ m/s and the Sun is about $1.5 \times 10^{11}$ m away.
1. Time $= \dfrac{\text{distance}}{\text{speed}} = \dfrac{1.5 \times 10^{11}}{3 \times 10^8}$.
2. $1.5 \div 3 = 0.5$ and $10^{11} \div 10^8 = 10^3$.
3. $0.5 \times 10^3 = 500$ seconds, which is $8$ minutes $20$ seconds.
:::

## Common mistakes

:::mistake{title="Leaving A outside the range 1 to 10"}
$24 \times 10^8$ and $0.5 \times 10^3$ have the right value but are not in standard form. Write $2.4 \times 10^9$ and $5 \times 10^2$.
:::

:::mistake{title="Getting the sign of the power wrong"}
Numbers smaller than 1 have a **negative** power of 10: $0.0062 = 6.2 \times 10^{-3}$, not $6.2 \times 10^3$.
:::

:::mistake{title="Multiplying the powers instead of adding them"}
$10^5 \times 10^3 = 10^8$, not $10^{15}$.
:::

:::mistake{title="Adding without matching the powers"}
$3.2 \times 10^4 + 5.1 \times 10^3$ is not $8.3 \times 10^7$. Convert to ordinary numbers first.
:::

## Exam tips

:::exam-tip
When the question says "give your answer in standard form", an ordinary number such as $37\,100$ loses the final mark even if it is correct.
:::

:::exam-tip
Check the size of your answer: a very small number must have a negative power; multiplying two large numbers must give a larger power.
:::

:::exam-tip
Write the calculator display in full before rounding $A$ to the accuracy asked for, for example $1.17 \times 10^5$ to 3 significant figures.
:::

## Summary

:::summary
- Standard form is $A \times 10^n$ with $1 \leq A < 10$ and $n$ an integer.
- Large numbers have positive powers; numbers less than 1 have negative powers.
- Multiply or divide the numbers and the powers of 10 separately, then adjust $A$.
- To add or subtract, change to ordinary numbers (or equal powers) first.
- On a calculator use the $\times 10^x$ (EXP) key, not "$\times 10$".
:::
