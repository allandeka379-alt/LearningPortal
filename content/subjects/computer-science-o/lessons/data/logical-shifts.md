---
{
  "key": "data.logical-shifts",
  "title": "Logical binary shifts",
  "summary": "Carry out single and multiple logical left and right shifts on a positive 8-bit binary integer, describe their effect (multiplying or dividing by a power of 2), and explain when a shift loses bits and gives an incorrect result.",
  "concepts": ["comp.data.logical-shifts"],
  "estimatedMinutes": 25,
  "level": "core"
}
---
## Introduction

In denary, you multiply by 10 by moving every digit one place to the left and putting a 0 on the end: 37 becomes 370. Processors use the same trick in binary. Moving every bit one place to the left **doubles** a number; moving every bit to the right **halves** it. These moves are called **logical shifts**, and a processor can do them much faster than a full multiplication or division.

Cambridge 0478 asks you to carry out single and multiple shifts on a positive 8-bit integer, describe the effect, and spot when the result goes wrong because bits are lost. Questions are short but precise, so the details in this lesson matter.

## Key definitions

:::definition{term="Logical shift"}
An operation that moves every bit in a register a given number of places to the left or right. Bits moved out of the register are lost, and the empty places at the other end are filled with zeros.
:::

:::definition{term="Most and least significant bit"}
The most significant bit (MSB) is the leftmost bit, worth 128 in an 8-bit register. The least significant bit (LSB) is the rightmost bit, worth 1.
:::

## Logical left shift

In a **left shift**, every bit moves towards the MSB. The bits that move past the left end are lost, and zeros fill the empty places on the right. Each place shifted left **multiplies the value by 2**, as long as no 1s are lost.

| Places shifted left | Effect on the value |
|:-:|:-:|
| 1 | × 2 |
| 2 | × 4 |
| 3 | × 8 |
| $n$ | × $2^n$ |

:::worked-solution{title="Shift 00011010 two places to the left"}
1. The value before the shift is $16 + 8 + 2 = 26$.
2. Move every bit two places left. The two leftmost bits (both 0) fall off the end.
3. Fill the two empty places on the right with 0s: 01101000.
4. The new value is $64 + 32 + 8 = 104$.
5. Check the effect: a 2-place left shift multiplies by $2^2 = 4$, and $26 \times 4 = 104$.
:::

| | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 | Denary |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Before | 0 | 0 | 0 | 1 | 1 | 0 | 1 | 0 | 26 |
| After left 2 | 0 | 1 | 1 | 0 | 1 | 0 | 0 | 0 | 104 |

## Logical right shift

In a **right shift**, every bit moves towards the LSB. Bits that move past the right end are lost, and zeros fill the empty places on the left. Each place shifted right **divides the value by 2**, and any remainder is thrown away (this is integer division).

:::worked-solution{title="Shift 10110100 three places to the right"}
1. The value before the shift is $128 + 32 + 16 + 4 = 180$.
2. Move every bit three places right. The three rightmost bits, 100, fall off the end.
3. Fill the three empty places on the left with 0s: 00010110.
4. The new value is $16 + 4 + 2 = 22$.
5. Check the effect: a 3-place right shift divides by $2^3 = 8$. $180 \div 8 = 22.5$, and the 0.5 has been lost, so the result is 22.
:::

| | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 | Denary |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Before | 1 | 0 | 1 | 1 | 0 | 1 | 0 | 0 | 180 |
| After right 3 | 0 | 0 | 0 | 1 | 0 | 1 | 1 | 0 | 22 |

The bit that was lost (the 1 in the 4s place) carried the remainder. Whenever a **1** is shifted out of the right-hand end, the division is not exact and some precision is lost.

## When shifts go wrong

Losing 0s does no harm, but losing a **1** changes the answer.

- **Left shift:** if a 1 is shifted out of the MSB, the true result is bigger than 255 and cannot fit in 8 bits. The value left in the register is wrong. This is the same idea as overflow.
- **Right shift:** if a 1 is shifted out of the LSB, the remainder of the division is lost, so the result is rounded down.

:::worked-solution{title="Shift 11000011 two places to the left"}
1. The value before the shift is $128 + 64 + 2 + 1 = 195$.
2. Shifting two places left pushes out the two leftmost bits, which are both **1**.
3. The register now holds 00001100, which is 12.
4. The correct answer, $195 \times 4 = 780$, needs 10 bits. Because 1s were lost, the result is wrong.
:::

:::example{title="Fast multiplication in a game"}
Sipho is writing a simple game. Each tile on the screen is 8 pixels wide, so to find where tile number 13 starts he multiplies 13 by 8. Instead of a full multiplication, the processor can shift 00001101 three places left to get 01101000, which is 104. The shift is quick, and it is exact because only 0s were pushed out. For tile number 40, though, $40 \times 8 = 320$ does not fit in 8 bits: a 1 would be shifted out and the result would be wrong, so a 16-bit register would be needed.
:::

:::keyfact{title="Cambridge only"}
Logical shifts are a Cambridge 0478 objective (positive 8-bit integers). They are not in the ZIMSEC O-Level syllabus. Cambridge uses only **logical** shifts at this level: the empty places are always filled with 0s.
:::

## Common mistakes

:::mistake{title="Filling the gaps with 1s or copying the old bits"}
In a logical shift the new places are **always** filled with 0s, whatever bits were there before.
:::

:::mistake{title="Changing the number of bits"}
The register stays 8 bits wide. After a left shift of 2, do not write a 10-bit answer: the two leftmost bits have gone.
:::

:::mistake{title="Mixing up the directions"}
Left shift multiplies, right shift divides. A useful memory aid: moving digits left in denary (37 → 370) makes the number bigger, and binary works the same way.
:::

:::mistake{title="Saying a right shift always divides exactly"}
If a 1 falls off the right-hand end, the remainder is lost. For example 7 shifted right 1 place gives 3, not 3.5.
:::

## Exam tips

:::exam-tip{title="Describe the effect fully"}
For "describe the effect" give the direction, the number of places and the factor: "a logical left shift of 3 places multiplies the value by 8". Then say whether the result is correct, and why.
:::

:::exam-tip{title="Look at the bits that fall off"}
Before writing your answer, look at the bits that leave the register. If any of them is a 1, say that bits have been lost, so the multiplication overflows or the division is not exact.
:::

:::exam-tip{title="Write all 8 bits"}
Always give the result as a full 8-bit number with any leading or trailing zeros. Count the bits before you move on.
:::

## Summary

:::summary
- A logical shift moves every bit left or right; bits that leave the register are lost and the empty places fill with 0s.
- A left shift of $n$ places multiplies by $2^n$; a right shift of $n$ places divides by $2^n$ (integer division).
- If a 1 is shifted out of the left end, the result is too big for 8 bits and is wrong.
- If a 1 is shifted out of the right end, the remainder is lost and the result is rounded down.
- Always give 8 bits and check the bits that fell off.
:::
