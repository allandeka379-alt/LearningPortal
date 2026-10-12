---
{
  "key": "data.binary-arithmetic",
  "title": "Negative binary integers and binary arithmetic",
  "summary": "Represent negative integers in one's and two's complement, add and subtract in a fixed-width register, detect overflow, and (ZIMSEC) multiply and divide small binary values.",
  "concepts": [
    "acs.data.binary-arithmetic"
  ],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A school fees system in Harare must record both money received (positive) and refunds (negative), and the processor has to add and subtract such values using only bits. There is no minus sign in a register, so negative integers need a coding. This lesson covers the coding used by almost every modern computer, **two's complement**, and then shows how binary addition, subtraction and (for ZIMSEC) multiplication and division work, and how a result that is too big for the register is detected as **overflow**.

You should already be able to convert between binary and denary and to add two positive binary numbers column by column.

## Key definitions

:::definition{term="One's complement"}
The pattern obtained by changing every bit of a binary number: each 0 becomes 1 and each 1 becomes 0.
:::

:::definition{term="Two's complement"}
A way of storing signed integers in which the most significant bit has a negative place value. A negative number is found by inverting every bit of the positive number and adding 1.
:::

:::definition{term="Overflow"}
The condition in which the result of an arithmetic operation is too large (or too small) to be held in the number of bits available, so the stored result is wrong.
:::

:::keyfact{title="Range for n bits"}
In two's complement, n bits store the integers from −2^(n−1) to 2^(n−1) − 1. There is exactly one pattern for zero and one more negative value than positive values.
:::

| Bits | Smallest | Largest |
|:-:|:-:|:-:|
| 4 | -8 | 7 |
| 8 | -128 | 127 |
| 16 | -32768 | 32767 |

## Representing negative numbers

Sign-and-magnitude uses the first bit as a sign and the rest as the size. It is mentioned only to be rejected: it gives two patterns for zero (+0 and −0) and needs different circuits for adding and subtracting.

In **one's complement** a negative number is the inverted pattern of the positive one. It still has two zeros (all 0s and all 1s) and needs an extra "end-around carry" when adding, so it is rarely used.

**Two's complement** removes both problems. The leftmost bit is worth −128 in an 8-bit number (and −2^(n−1) in general), and the other bits keep their positive place values.

:::worked-solution{title="Write −45 as an 8-bit two's complement number"}
1. Write +45 in 8 bits: 00101101.
2. Invert every bit (one's complement): 11010010.
3. Add 1: 11010010 + 1 = **11010011**.
4. Check with place values: −128 + 64 + 16 + 2 + 1 = −45.
:::

:::worked-solution{title="Find the denary value of the 8-bit two's complement pattern 10110100"}
1. The leftmost bit is 1, so the number is negative and that bit is worth −128.
2. The other 1s are worth 32, 16 and 4.
3. Add: −128 + 32 + 16 + 4 = **−76**.
:::

A quick check: if the leftmost bit is 1 the number is negative; if it is 0 the number is zero or positive.

## Binary addition and carries

Add column by column from the right using 0 + 0 = 0, 0 + 1 = 1, 1 + 1 = 10 (write 0, carry 1) and 1 + 1 + 1 = 11 (write 1, carry 1). Any carry out of the leftmost column is discarded in a fixed-width register.

:::worked-solution{title="Add 58 and −23 using 8-bit two's complement"}
1. 58 = 00111010 and −23 = 11101001.
2. Add column by column from the right:

| Place | Top | Bottom | Carry in | Sum bit | Carry out |
|:-:|:-:|:-:|:-:|:-:|:-:|
| 1 | 0 | 1 | 0 | 1 | 0 |
| 2 | 1 | 0 | 0 | 1 | 0 |
| 4 | 0 | 0 | 0 | 0 | 0 |
| 8 | 1 | 1 | 0 | 0 | 1 |
| 16 | 1 | 0 | 1 | 0 | 1 |
| 32 | 1 | 1 | 1 | 1 | 1 |
| 64 | 0 | 1 | 1 | 0 | 1 |
| 128 | 0 | 1 | 1 | 0 | 1 |

3. The carry out of the leftmost column is discarded. The 8-bit result is **00100011**.
4. Its value is 35, which equals 58 − 23.
:::

## Subtraction as addition

The processor has no separate subtracter. To work out $A - B$, it adds the two's complement of $B$ to $A$.

:::worked-solution{title="Work out 71 − 96 in 8 bits"}
1. 71 = 01000111 and 96 = 01100000.
2. Negate 96: invert to 10011111 and add 1 to give 10100000.
3. Add 01000111 + 10100000 = **11100111**.
4. The leftmost bit is 1 so the answer is negative: −25. Check: 71 − 96 = −25.
:::

## Overflow

An 8-bit register holds −128 to 127. If the true answer is outside that range, the stored pattern is wrong. Overflow in two's complement addition happens when two numbers with the **same sign** produce a result with the **opposite sign**. Adding numbers of different signs can never overflow.

:::worked-solution{title="Add 100 and 60 in 8 bits"}
1. 100 = 01100100 and 60 = 00111100.
2. The sum of the bits is **10100000**.
3. Both numbers were positive, but the result starts with 1, so it is shown as −96. The true answer, 160, is bigger than 127, so overflow has occurred.
:::

Programs can respond to overflow by raising an error or by using more bits. Note that a carry out of the leftmost column is not the same as overflow: the carry was discarded in the 58 + (−23) example and the answer was still correct.

## Multiplication and division (ZIMSEC)

ZIMSEC asks for the binary multiplication and long division of small positive values. Multiplication is shift and add: for each 1 in the multiplier, write the multiplicand shifted left by that bit's position, then add the rows.

:::worked-solution{title="Multiply 1101 (13) by 110 (6)"}
1. Multiplier 110 has 1s in the 2s and 4s positions.
2. Partial products: 11010 and 110100.
3. Add them: 11010 + 110100 = **1001110**.
4. Check: 13 × 6 = 78.
:::

Division by long division works like denary long division, using subtraction of the divisor where it fits.

:::example{title="Binary long division"}
1101101 (109) divided by 101 (5) gives quotient 10101 (21) and remainder 100 (4). Check: 5 × 21 + 4 = 109.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards test two's complement representation, the value of a pattern, range, addition, subtraction by adding the negation, and overflow. Binary multiplication and long division are ZIMSEC detail. Cambridge also expects you to use a stated number of bits and to say why two's complement is used (one representation of zero, addition and subtraction use the same circuit).
:::

## Common mistakes

:::mistake{title="Forgetting to add 1"}
Inverting the bits gives only the one's complement. The two's complement needs the extra +1.
:::

:::mistake{title="Treating the leftmost bit as a separate sign"}
In two's complement the leftmost bit has a negative place value. 10000001 is −127, not "−1".
:::

:::mistake{title="Confusing carry with overflow"}
A carry out of the top column does not mean overflow. Check the signs: overflow occurs only when two same-sign numbers give a result of the opposite sign.
:::

:::mistake{title="Using the wrong number of bits"}
Pad to the stated width before inverting. Inverting a 4-bit pattern when the question says 8 bits gives the wrong answer.
:::

## Exam tips

:::exam-tip{title="Which papers test this"}
ZIMSEC Paper 1 and Cambridge Paper 1 give conversions to and from two's complement, binary addition and subtraction, and overflow. For **calculate** show the inversion, the +1 and the final addition. For **explain why overflow occurred** state the range of the register and the true answer.
:::

:::exam-tip{title="Check with denary"}
After any binary calculation convert the operands and the answer to denary and make sure they agree, or that the answer is clearly out of range.
:::

:::exam-tip{title="State the bits"}
Always give an answer with the number of bits the question asks for, including leading zeros.
:::

## Summary

:::summary
- Two's complement: invert the bits and add 1; the leftmost bit has a negative place value.
- n bits hold −2^(n−1) to 2^(n−1) − 1, with one pattern for zero.
- Subtraction is done by adding the two's complement of the second number.
- Overflow occurs when two numbers of the same sign give a result of the opposite sign (the true result is outside the range).
- Multiplication and division of small values by shift-and-add and long division are ZIMSEC detail.
:::
