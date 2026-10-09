---
{
  "key": "data.twos-complement",
  "title": "Two's complement: negative binary numbers",
  "summary": "Represent positive and negative integers in 8-bit two's complement (range −128 to 127), convert from denary to two's complement and back, and explain the meaning of the most significant bit.",
  "concepts": ["comp.data.twos-complement"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

A cold room at a fruit packing shed in Mutare must stay below freezing, and its sensor reports temperatures such as −18 °C. A bank account can go into overdraft. A game character can move left as well as right. Computers clearly need **negative numbers**, but a register holds only 0s and 1s: there is no minus sign.

The method used by almost every processor is called **two's complement**. Cambridge 0478 expects you to represent positive and negative 8-bit integers in two's complement and convert in both directions. Once you see how the most significant bit works, the conversions are quick.

## Key definitions

:::definition{term="Two's complement"}
A way of representing positive and negative whole numbers in binary in which the most significant bit has a **negative** place value. In 8 bits the place values are −128, 64, 32, 16, 8, 4, 2, 1.
:::

:::definition{term="Most significant bit (MSB) in two's complement"}
The leftmost bit. Its place value is −128 in 8 bits. If it is 1 the number is negative; if it is 0 the number is zero or positive.
:::

:::definition{term="Range of 8-bit two's complement"}
From −128 (10000000) to +127 (01111111): 256 different values in all.
:::

## The place values

The only change from ordinary binary is the leftmost column:

| −128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|

- **Positive numbers** (0 to 127) have MSB 0 and look exactly like ordinary 8-bit binary. For example 77 is 01001101 in both systems.
- **Negative numbers** have MSB 1. The value is −128 plus whatever the other seven bits add up to.

Because the MSB tells you the sign immediately, it is sometimes called the **sign bit**, but remember it is not just a sign: it also has the value −128.

## Two's complement to denary

Write the place values over the bits and add them, using −128 for the MSB.

:::worked-solution{title="Convert the two's complement number 11101010 to denary"}
1. Place values: −128, 64, 32, 16, 8, 4, 2, 1 over the bits 1, 1, 1, 0, 1, 0, 1, 0.
2. The 1s are under −128, 64, 32, 8 and 2.
3. Add: $-128 + 64 + 32 + 8 + 2 = -22$.
4. So 11101010 represents −22.
:::

A positive example: 01011100 has MSB 0, so it is simply $64 + 16 + 8 + 4 = 92$.

## Denary to two's complement

### Positive numbers

Convert to 8-bit binary as usual. The MSB must be 0, which is why the largest positive number is 127.

### Negative numbers: invert and add 1

1. Write the **positive** version of the number in 8-bit binary.
2. **Invert** every bit (change each 0 to 1 and each 1 to 0).
3. **Add 1** to the result.

:::worked-solution{title="Convert −45 to 8-bit two's complement"}
1. Write +45 in 8 bits: 00101101.
2. Invert every bit: 11010010.
3. Add 1: $11010010 + 1 = 11010011$.
4. Check: $-128 + 64 + 16 + 2 + 1 = -45$.
:::

### Negative numbers: start from −128

An alternative that suits people who like place values: a negative number is −128 plus something.

:::worked-solution{title="Convert −100 to 8-bit two's complement"}
1. The MSB is 1, contributing −128.
2. Find what must be added to −128 to reach −100: $-100 - (-128) = 28$.
3. Write 28 in the remaining seven bits (64 down to 1): $28 = 16 + 8 + 4$, which is 0011100.
4. Put the MSB in front: 10011100.
5. Check by invert-and-add-1: +100 = 01100100 → inverted 10011011 → add 1 → 10011100. Both methods agree.
:::

## Useful values to know

| Denary | Two's complement |
|:-:|:-:|
| 127 | 01111111 |
| 1 | 00000001 |
| 0 | 00000000 |
| −1 | 11111111 |
| −127 | 10000001 |
| −128 | 10000000 |

Notice that −1 is all 1s ($-128 + 127$), and that −128 has no positive partner in 8 bits: +128 would need a ninth bit. That is why the range is **−128 to +127**, not −127 to +127.

:::example{title="Why processors like two's complement"}
Thandeka adds 5 and −5 in two's complement: 00000101 + 11111011. The column addition gives 1 00000000; the ninth bit is discarded and the register holds 00000000, which is 0. With two's complement the processor can use the same adder circuit for positive and negative numbers, so it does not need separate circuits for subtraction. There is also only one pattern for zero, so no values are wasted.
:::

:::keyfact{title="Cambridge only"}
Two's complement is a Cambridge 0478 objective (8-bit integers, conversions in both directions). ZIMSEC O-Level does not require it; ZIMSEC covers subtraction of positive binary numbers by borrowing instead.
:::

## Common mistakes

:::mistake{title="Inverting the bits but forgetting to add 1"}
Inverting alone gives the one's complement, which is one less than the right answer. −45 inverted from 00101101 is 11010010 (that is −46): you must add 1 to get 11010011.
:::

:::mistake{title="Treating the MSB as +128"}
In two's complement the leftmost place is **−128**. Reading 11101010 as 234 uses ordinary binary, not two's complement. Always check which representation the question uses.
:::

:::mistake{title="Inverting a positive number"}
Positive numbers are not changed: +77 is 01001101, the same as ordinary binary. Only negative numbers need the invert-and-add-1 step.
:::

:::mistake{title="Using too few bits"}
Write the positive number in **8 bits** before inverting. If you invert 101101 (six bits) instead of 00101101, the leading bits will be wrong.
:::

## Exam tips

:::exam-tip{title="Show the stages"}
For a negative conversion, write three lines: the positive number in 8 bits, the inverted bits, and the result after adding 1. Each line can earn a method mark.
:::

:::exam-tip{title="Always check with −128"}
After any conversion, add the place values with −128 for the MSB. It takes a few seconds and confirms your answer.
:::

:::exam-tip{title="Quick sign check"}
If the denary number is negative, your answer must start with 1. If it is positive, it must start with 0.
:::

## Summary

:::summary
- In 8-bit two's complement the MSB has place value −128; the other places are 64 to 1.
- MSB 1 means negative; MSB 0 means zero or positive.
- Range: −128 (10000000) to +127 (01111111).
- Negative denary → two's complement: write the positive in 8 bits, invert every bit, add 1 (or −128 plus the remainder).
- Two's complement → denary: add the place values, using −128 for the MSB.
:::
