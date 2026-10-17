---
{
  "key": "data.binary-denary",
  "title": "Converting between binary and denary",
  "summary": "Convert positive whole numbers from binary to denary by adding place values, and from denary to binary by the place-value method or by repeated division by 2, for 8-bit and 16-bit numbers, writing 8-bit answers with leading zeros.",
  "concepts": ["comp.data.binary-denary"],
  "estimatedMinutes": 30,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Farai is checking the settings of the school's network switch in Harare. The screen shows a value as the bits 00011000, and he needs to know whether that means 24 or something else. A moment later he has to enter the denary number 200 into a field that only accepts binary. Both jobs need the same skill: converting between **binary** (base 2) and **denary** (base 10).

Conversions between binary and denary appear in almost every ZIMSEC Paper 2 and Cambridge Paper 1. They are quick marks if you use a clear method and show it. You should already know that binary place values double from the right: 1, 2, 4, 8, 16, 32, 64, 128.

## Key definitions

:::definition{term="Place value"}
The value a digit is worth because of its position. In binary the places, from the right, are worth 1, 2, 4, 8, 16, … (powers of 2).
:::

:::definition{term="Leading zeros"}
Zeros written on the left of a binary number so that it fills a fixed number of bits. They do not change the value: 101 and 00000101 both mean 5.
:::

:::definition{term="8-bit and 16-bit numbers"}
Binary numbers that use exactly 8 or 16 bits. An 8-bit unsigned number holds 0 to 255; a 16-bit unsigned number holds 0 to 65535.
:::

## Binary to denary

To convert binary to denary, write the place values above the bits and **add the place values where there is a 1**. Places with a 0 add nothing.

![Place-value grid for the binary number 11010110: the 1s are under 128, 64, 16, 4 and 2, and 128 + 64 + 16 + 4 + 2 = 214; the places holding 0 add nothing](media:diagrams/binary-place-values-11010110.png "Figure: converting 11010110 to denary by adding the place values that hold a 1")

:::worked-solution{title="Convert the binary number 11010110 to denary"}
1. Write the place values over the bits: 128, 64, 32, 16, 8, 4, 2, 1 over 1, 1, 0, 1, 0, 1, 1, 0.
2. The 1s are under 128, 64, 16, 4 and 2.
3. Add them: $128 + 64 + 16 + 4 + 2 = 214$.
4. So 11010110 in binary is 214 in denary.
:::

A quick check: if the rightmost bit is 1 the number is odd, and if it is 0 the number is even. 11010110 ends in 0, and 214 is even.

## Denary to binary: the place-value method

Work from the **largest** place value to the smallest. At each place ask: "Does this place value fit into what is left?" If it does, write 1 and subtract it. If it does not, write 0 and move on.

:::worked-solution{title="Convert the denary number 157 to 8-bit binary"}
1. 128 fits into 157: write 1. $157 - 128 = 29$ left.
2. 64 does not fit into 29: write 0. 32 does not fit into 29: write 0.
3. 16 fits into 29: write 1. $29 - 16 = 13$ left.
4. 8 fits into 13: write 1. $13 - 8 = 5$ left.
5. 4 fits into 5: write 1. $5 - 4 = 1$ left. 2 does not fit into 1: write 0.
6. 1 fits into 1: write 1. Nothing is left.
7. Answer: 10011101. Check: $128 + 16 + 8 + 4 + 1 = 157$.
:::

The working is clearest as a table:

| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 1 | 0 | 0 | 1 | 1 | 1 | 0 | 1 |

## Denary to binary: repeated division by 2

Some teachers prefer a second method. Divide the number by 2 again and again, writing down each **remainder** (0 or 1), until the quotient is 0. Then read the remainders from the **bottom up**: the last remainder is the most significant bit.

:::worked-solution{title="Convert the denary number 89 to binary by repeated division"}
1. Divide by 2 and record each remainder, as in the table below.
2. Stop when the quotient reaches 0.
3. Read the remainders from the bottom to the top: 1011001.
4. As an 8-bit number, add a leading zero: 01011001.
5. Check: $64 + 16 + 8 + 1 = 89$.
:::

| Division | Quotient | Remainder |
|:-:|:-:|:-:|
| 89 ÷ 2 | 44 | 1 |
| 44 ÷ 2 | 22 | 0 |
| 22 ÷ 2 | 11 | 0 |
| 11 ÷ 2 | 5 | 1 |
| 5 ÷ 2 | 2 | 1 |
| 2 ÷ 2 | 1 | 0 |
| 1 ÷ 2 | 0 | 1 |

Both methods always give the same answer. Use whichever you make fewer slips with, and always check by converting back.

## Numbers up to 16 bits

Cambridge asks for conversions up to 16 bits, so the place values carry on doubling past 128: 256, 512, 1024, 2048, 4096, 8192, 16384 and 32768. Splitting a 16-bit number into two groups of 8 (or four groups of 4) makes it easier to read.

:::worked-solution{title="Convert the 16-bit number 0000 0101 1101 1100 to denary"}
1. The left 8 bits, 00000101, sit on the place values 32768 down to 256. Their 1s are under 1024 and 256.
2. The right 8 bits, 11011100, sit on 128 down to 1. Their 1s are under 128, 64, 16, 8 and 4.
3. Add all of them: $1024 + 256 + 128 + 64 + 16 + 8 + 4 = 1500$.
:::

| 32768 | 16384 | 8192 | 4096 | 2048 | 1024 | 512 | 256 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 0 | 0 | 0 | 0 | 0 | 1 | 0 | 1 |

| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 1 | 1 | 0 | 1 | 1 | 1 | 0 | 0 |

:::example{title="Is the answer sensible?"}
Chipo converts 300 to binary and gets the 8-bit answer 00101100. She checks: the largest 8-bit value is 255, so 300 cannot fit in 8 bits at all. The correct answer needs nine bits: 100101100 ($256 + 32 + 8 + 4$). Checking the range first stops a silly error.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC (Form 2) asks you to convert numbers between binary and denary. Cambridge 0478 states positive integers up to 16 bits and often asks for an 8-bit answer, which must then include leading zeros. Either method of conversion is accepted by both boards.
:::

## Common mistakes

:::mistake{title="Reading the remainders from the top down"}
With repeated division, the first remainder is the **least** significant bit. Read the remainders from the bottom up, or you will write the number backwards.
:::

:::mistake{title="Dropping leading zeros when 8 bits are asked for"}
If a question says "8-bit binary", 1011001 is not enough: write 01011001. The examiner wants every bit of the register.
:::

:::mistake{title="Adding the place values of the 0s"}
Only the places with a 1 count. A common slip is to add every place value, or to add the bits themselves (1 + 1 + 0 + …) instead of their place values.
:::

:::mistake{title="Forgetting that 8 bits stop at 255"}
A denary number above 255 cannot be written in 8 bits. Check the range before you start.
:::

## Exam tips

:::exam-tip{title="Show the place-value row"}
Write 128 64 32 16 8 4 2 1 above your bits, even in a one-mark question. It makes errors easy to spot and can earn method credit in longer questions.
:::

:::exam-tip{title="Check by converting back"}
After converting denary to binary, add the place values of your answer. If you get the number you started with, the answer is right. This takes ten seconds and catches most slips.
:::

:::exam-tip{title="Odd or even?"}
The last bit gives a free check: an odd denary number always ends in 1 in binary, an even one in 0.
:::

## Summary

:::summary
- Binary to denary: add the place values (1, 2, 4, 8, …) where the bit is 1.
- Denary to binary: subtract the largest place value that fits, working from the left, writing 1 or 0 for each place.
- Or divide by 2 repeatedly and read the remainders from the bottom up.
- 8 bits hold 0 to 255; 16 bits hold 0 to 65535. When asked for 8 bits, keep the leading zeros.
- Always check an answer by converting it back.
:::
