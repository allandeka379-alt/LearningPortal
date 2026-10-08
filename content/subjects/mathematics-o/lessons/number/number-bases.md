---
{
  "key": "number.number-bases",
  "title": "Number bases",
  "summary": "Understand place value in bases two to ten, convert between base ten and other bases and between two non-denary bases, add and subtract in other bases, and find an unknown base.",
  "concepts": ["math.number.number-bases"],
  "objectives": ["zimsec/o-level/mathematics:1.5.1", "zimsec/o-level/mathematics:1.5.2", "zimsec/o-level/mathematics:1.5.3"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

We count in tens because we have ten fingers, but there is nothing special about ten. Computers store everything in **base two** (binary), using only the digits 0 and 1. Our clocks use base sixty for minutes and seconds. In ZIMSEC O-Level Mathematics you must be able to work in any base from two to ten, and number bases are a common source of short exam questions.

You should already understand place value in base ten: in $3\,407$ the 4 stands for 4 hundreds, because each place is worth ten times the place to its right.

## Key definitions

:::definition{term="Base"}
The number of different digits used, and the number each place value is multiplied by as you move one place to the left. Base five uses the digits 0, 1, 2, 3 and 4, and its place values are $1, 5, 25, 125, \ldots$
:::

:::definition{term="Denary"}
Base ten, the ordinary number system. A number with no base written is in base ten.
:::

:::keyfact{title="Writing the base"}
The base is written as a small subscript: $2143_5$ means "2143 in base five". A digit can never be equal to or larger than the base, so $2153_5$ is impossible.
:::

## Place value and converting to base ten

| Base | Place values (right to left) |
| --- | --- |
| 2 | $1,\ 2,\ 4,\ 8,\ 16,\ 32,\ 64$ |
| 5 | $1,\ 5,\ 25,\ 125,\ 625$ |
| 6 | $1,\ 6,\ 36,\ 216$ |
| 8 | $1,\ 8,\ 64,\ 512$ |

To convert to base ten, multiply each digit by its place value and add.

:::worked-solution[Example 1: convert $2143_5$ to base ten]
1. Place values from the right: $1, 5, 25, 125$.
2. $2 \times 125 + 1 \times 25 + 4 \times 5 + 3 \times 1$.
3. $= 250 + 25 + 20 + 3 = 298$.
4. So $2143_5 = 298_{10}$.
:::

## Converting from base ten: repeated division

Divide by the new base again and again, writing down each remainder. Read the remainders from the **bottom up**.

:::worked-solution[Example 2: convert 146 to base six]
1. $146 \div 6 = 24$ remainder $2$.
2. $24 \div 6 = 4$ remainder $0$.
3. $4 \div 6 = 0$ remainder $4$.
4. Reading the remainders upwards: $146 = 402_6$.
5. Check: $4 \times 36 + 0 \times 6 + 2 = 146$.
:::

:::worked-solution[Example 3: convert 75 to base two]
1. $75 \div 2 = 37$ r $1$; $37 \div 2 = 18$ r $1$; $18 \div 2 = 9$ r $0$; $9 \div 2 = 4$ r $1$.
2. $4 \div 2 = 2$ r $0$; $2 \div 2 = 1$ r $0$; $1 \div 2 = 0$ r $1$.
3. Reading upwards: $75 = 1001011_2$.
4. Check: $64 + 8 + 2 + 1 = 75$.
:::

## Between two non-denary bases

Go **through base ten**: convert to base ten first, then to the new base.

:::worked-solution[Example 4: convert $212_3$ to base five]
1. To base ten: $2 \times 9 + 1 \times 3 + 2 = 23$.
2. To base five: $23 \div 5 = 4$ r $3$; $4 \div 5 = 0$ r $4$.
3. So $212_3 = 43_5$.
:::

## Adding and subtracting in other bases

Work column by column as in base ten, but **carry or borrow the base**, not ten.

:::worked-solution[Example 5: work out $1101_2 + 111_2$]
1. Units: $1 + 1 = 2 = 10_2$. Write 0, carry 1.
2. Twos: $0 + 1 + 1 = 2$. Write 0, carry 1.
3. Fours: $1 + 1 + 1 = 3 = 11_2$. Write 1, carry 1.
4. Eights: $1 + 1 = 2$. Write 0, carry 1, which goes into the sixteens column.
5. Answer: $10100_2$. Check in base ten: $13 + 7 = 20 = 16 + 4$.
:::

:::worked-solution[Example 6: work out $423_5 - 144_5$]
1. Units: $3 - 4$ is not possible, so borrow 1 five from the fives column: $3 + 5 - 4 = 4$.
2. Fives: the 2 is now 1; $1 - 4$ is not possible, so borrow 1 twenty-five: $1 + 5 - 4 = 2$.
3. Twenty-fives: the 4 is now 3; $3 - 1 = 2$.
4. Answer: $224_5$. Check: $113 - 49 = 64$, and $224_5 = 50 + 10 + 4 = 64$.
:::

## Finding an unknown base

Write the number in terms of the base $b$ and form an equation.

:::worked-solution[Example 7: find $b$ if $52_b = 37$]
1. $52_b = 5 \times b + 2$.
2. $5b + 2 = 37$, so $5b = 35$ and $b = 7$.
3. Check: the digits 5 and 2 are both less than 7, so base seven is possible.
:::

Sometimes the equation is a quadratic: $121_b = 64$ gives $b^2 + 2b + 1 = 64$, so $(b + 1)^2 = 64$ and $b = 7$ (the base must be positive).

## Common mistakes

:::mistake{title="Reading the remainders downwards"}
In repeated division the **first** remainder is the units digit. Read the remainders from the bottom up.
:::

:::mistake{title="Carrying ten instead of the base"}
In base five, $3 + 4 = 7 = 12_5$: write 2 and carry 1. Writing 7 is impossible, because 7 is not a digit in base five.
:::

:::mistake{title="Using digits that are too large"}
The digits in base $b$ go from 0 to $b - 1$. The largest digit in base seven is 6.
:::

:::mistake{title="Converting between two bases directly"}
Do not try to "translate" $212_3$ digit by digit into base five. Go through base ten.
:::

## Exam tips

:::exam-tip
Always check a conversion by converting back. It takes a few seconds and catches most slips.
:::

:::exam-tip
Show the repeated division (or the place-value sum) as working. A correct method can earn credit even if one remainder is wrong.
:::

:::exam-tip
When the question says "give your answer in base five", write the base: $224_5$.
:::

## Summary

:::summary
- In base $b$ the place values are $1, b, b^2, b^3, \ldots$ and the digits are 0 to $b - 1$.
- To base ten: multiply each digit by its place value and add.
- From base ten: divide repeatedly by the base and read the remainders upwards.
- Between two other bases, go through base ten.
- Add and subtract column by column, carrying or borrowing the base.
- For an unknown base, write the number in terms of $b$ and solve the equation.
:::
