---
{
  "key": "data.number-bases",
  "title": "Number systems: binary, denary, hexadecimal, octal and BCD",
  "summary": "Convert whole numbers between binary, denary, hexadecimal and octal by place value and bit grouping, encode digits in BCD, and use binary and decimal storage prefixes.",
  "concepts": [
    "acs.data.number-bases"
  ],
  "estimatedMinutes": 45,
  "level": "core",
  "freePreview": true
}
---
## Introduction

Every number a computer stores, from a pupil's mark in a Harare school database to the address of a memory cell, is held as bits. People prefer to read and write numbers in denary (base 10), so programmers need to move comfortably between **binary** (base 2), **denary**, **hexadecimal** (base 16) and, for ZIMSEC, **octal** (base 8). A technician in Bulawayo reading a memory dump or a web designer choosing a colour code is using hexadecimal as a shorthand for long strings of bits.

You should already know that a bit is a 0 or a 1 and that a byte is eight bits. This lesson gives you the place-value method for converting whole numbers, the grouping shortcuts between binary, hexadecimal and octal, Binary Coded Decimal (BCD), and the binary and decimal storage prefixes.

## Key definitions

:::definition{term="Number base"}
The number of different digits a positional number system uses. Base 2 uses 0 and 1; base 8 uses 0 to 7; base 10 uses 0 to 9; base 16 uses 0 to 9 and A to F, where A to F stand for 10 to 15.
:::

:::definition{term="Place value"}
The worth of a digit because of its position. In base $b$ each place is worth $b$ times the place to its right, so binary places are worth 1, 2, 4, 8, 16 and so on.
:::

:::definition{term="Binary Coded Decimal (BCD)"}
A code in which each denary digit of a number is stored separately as its own 4-bit binary group, so a number with four digits needs 16 bits.
:::

:::definition{term="Binary prefix"}
A storage unit based on powers of 2: kibi (2^10 = 1024), mebi (2^20), gibi (2^30) and tebi (2^40). The decimal prefixes kilo, mega, giga and tera are powers of 10 (1000, 1 000 000 and so on).
:::

:::keyfact{title="Digits and groups"}
One hexadecimal digit stands for exactly 4 bits (a nibble). One octal digit stands for exactly 3 bits. This is why hexadecimal and octal are used as short forms of binary, and why conversion between them needs no arithmetic.
:::

## Binary to denary

Write the place values above the bits, then add the place values that sit above a 1.

:::worked-solution{title="Convert 01101101 (binary) to denary"}
1. Write the place values above the bits:

| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 0 | 1 | 1 | 0 | 1 | 1 | 0 | 1 |

2. The 1s are under 64, 32, 8, 4, 1.
3. Add them: 64 + 32 + 8 + 4 + 1 = **109**.
:::

## Denary to binary

The repeated-division method divides by 2 and records each remainder. The remainders, read from the last to the first, give the binary number.

:::worked-solution{title="Convert 183 (denary) to binary"}
1. Divide repeatedly by 2 until the quotient is 0:

| Divide | Quotient | Remainder |
|:-:|:-:|:-:|
| 183 ÷ 2 | 91 | 1 |
| 91 ÷ 2 | 45 | 1 |
| 45 ÷ 2 | 22 | 1 |
| 22 ÷ 2 | 11 | 0 |
| 11 ÷ 2 | 5 | 1 |
| 5 ÷ 2 | 2 | 1 |
| 2 ÷ 2 | 1 | 0 |
| 1 ÷ 2 | 0 | 1 |

2. Read the remainders from the bottom up: 10110111.
3. In 8 bits this is **10110111**. Check: 128 + 32 + 16 + 4 + 2 + 1 = 183.
:::

An alternative is to subtract the largest place value that fits, write 1 under it, and carry on with the remainder, writing 0 under places that do not fit.

## Hexadecimal

Hexadecimal digits run 0 to 9 then A (10), B (11), C (12), D (13), E (14) and F (15). To convert **binary to hexadecimal**, split the bits into groups of four starting from the right and convert each group. To convert **hexadecimal to binary**, replace each digit by its four bits.

:::worked-solution{title="Convert 10111101 to hexadecimal and 3F7 to binary and denary"}
1. Groups of four: 1011 1101. The first group is 1011 = 11 = B; the second is 1101 = 13 = D. So 10111101 = **BD**.
2. For 3F7: 3 = 0011, F = 1111, 7 = 0111. Together: **0011 1111 0111** (the leading zeros of the first group may be dropped).
3. Denary value of 3F7: place values are 256, 16 and 1, so 3 × 256 + 15 × 16 + 7 = 768 + 240 + 7 = **1015**.
:::

Hexadecimal is used wherever people must read or write long binary values: colour codes in web pages, MAC addresses of network cards, memory addresses and memory dumps in debugging, and error codes. A colour such as #FF8800 is three bytes, one each for red, green and blue: FF = 255, 88 = 136 and 00 = 0. It is easier to write and check than 24 binary digits, and less error-prone.

## Octal (ZIMSEC)

Octal groups bits in threes. Starting from the right, split the binary number into groups of three (adding leading zeros to the leftmost group) and convert each group to a digit from 0 to 7.

:::worked-solution{title="Convert 183 to octal"}
1. From the earlier example 183 = 10110111. Pad to 9 bits and group in threes: 010 110 111.
2. Convert each group: 2, 6, 7.
3. The octal number is **267**.
4. Check by place value: 2 × 64 + 6 × 8 + 7 = 183.
:::

## Binary Coded Decimal

BCD converts a number digit by digit instead of converting the whole value. It is used where the digits are displayed one at a time, such as digital clocks, calculators and meters, because no division is needed to find each digit. The cost is that BCD uses more bits than pure binary and the patterns 1010 to 1111 are never valid digits.

:::worked-solution{title="Write 2074 in BCD"}
1. Convert each denary digit to 4 bits: 2 = 0010, 0 = 0000, 7 = 0111, 4 = 0100.
2. The BCD is **0010 0000 0111 0100** (16 bits).
3. In pure binary 2074 is 100000011010 (12 bits). BCD needs 16 bits, which is more.
:::

BCD addition is not required in this course.

## Storage prefixes

Memory and file sizes are measured in bytes. Cambridge uses the IEC names KiB, MiB, GiB and TiB, each 1024 times the one before. The decimal units kB, MB and GB use 1000. ZIMSEC writes KB, MB, GB and TB; in ZIMSEC questions these are taken as 1 KB = 1024 bytes unless the question says otherwise.

:::example{title="Converting units"}
A 5 MiB photo is 5120 KiB because each MiB is 1024 KiB. A laptop with 8 GiB of memory has 8192 MiB. A flash drive sold as 64 GB (decimal, 64 000 000 000 bytes) holds about 59.6 GiB, which is why a drive shows less space than its label.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Octal is ZIMSEC detail; Cambridge 9618 does not ask for it. BCD, binary, denary and hexadecimal are required by both. Cambridge uses KiB, MiB, GiB and TiB for 1024-based units; ZIMSEC uses KB, MB, GB and TB for the same sizes.
:::

## Common mistakes

:::mistake{title="Reading remainders in the wrong order"}
In repeated division the first remainder is the least significant bit. Reading the remainders top to bottom reverses the answer.
:::

:::mistake{title="Treating A to F as ordinary letters"}
In hexadecimal, B means 11, not 2 and not 1 followed by 1. Write the denary value of each letter when you convert.
:::

:::mistake{title="Converting a whole BCD number as one binary number"}
BCD encodes each digit separately. 2074 in BCD is four groups of four bits, not the binary value of 2074.
:::

:::mistake{title="Grouping bits from the left"}
When grouping binary into fours or threes, start at the right-hand end and pad the left group with zeros. Starting from the left changes the place values.
:::

## Exam tips

:::exam-tip{title="Which papers test this"}
ZIMSEC Paper 1 asks for conversions between binary, denary, hexadecimal and octal, and hexadecimal appears in Paper 2 register work. Cambridge Paper 1 tests binary, denary, hexadecimal and BCD, and asks why hexadecimal is used. For **convert** and **calculate** show your working; for **state** the answer alone is enough; for **explain** give the reason (shorter, fewer errors, easy to convert to and from binary).
:::

:::exam-tip{title="Show the grouping"}
Write the groups of four bits under the hexadecimal digits. If you slip on one digit the examiner can still credit the method.
:::

:::exam-tip{title="Check by converting back"}
Convert your answer back to the starting base. A wrong place value shows up immediately.
:::

## Summary

:::summary
- Binary place values double from the right: 1, 2, 4, 8, 16, 32, 64, 128.
- Denary to binary: divide by 2 repeatedly and read the remainders from last to first.
- One hexadecimal digit = 4 bits; one octal digit = 3 bits (octal is ZIMSEC only).
- BCD stores each denary digit as its own 4-bit group, so a number needs more bits than in pure binary.
- Binary prefixes (KiB, MiB, GiB) use 1024; decimal prefixes (kB, MB, GB) use 1000.
:::
