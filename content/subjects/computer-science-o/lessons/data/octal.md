---
{
  "key": "data.octal",
  "title": "Octal: the base 8 number system",
  "summary": "The octal (base 8) number system: its digits and place values, converting between octal and denary, converting between octal and binary with groups of three bits, and how octal compares with hexadecimal.",
  "concepts": ["comp.data.octal"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

Nyasha's Form 3 class in Masvingo has just learnt hexadecimal, where one digit stands for four bits. Their teacher writes 110 010 111 on the board and asks: "What if we grouped the bits in **threes** instead of fours?" Each group of three bits has eight possible patterns, so each group can be written as one digit from 0 to 7. That is the **octal** number system.

The ZIMSEC syllabus asks you to convert denary numbers to octal and back, and you should also be able to convert between octal and binary and compare octal with hexadecimal. Octal is less common today than hexadecimal, but it is still used, for example to write file permissions on some operating systems, and it is a good test of whether you really understand place value.

## Key definitions

:::definition{term="Octal"}
The base 8 number system. It uses the eight digits 0 to 7, and each place value is eight times the place to its right: 1, 8, 64, 512, 4096, …
:::

:::definition{term="Base (radix)"}
The number of different digits a number system uses, which is also the multiplier between neighbouring place values: 2 for binary, 8 for octal, 10 for denary and 16 for hexadecimal.
:::

## Octal digits and place values

Octal has no digits 8 or 9. Counting in octal goes 0, 1, 2, 3, 4, 5, 6, 7, then 10 (one eight and no units), 11, 12, … 17, then 20.

| Denary | Octal | Binary (3 bits) |
|:-:|:-:|:-:|
| 0 | 0 | 000 |
| 1 | 1 | 001 |
| 2 | 2 | 010 |
| 3 | 3 | 011 |
| 4 | 4 | 100 |
| 5 | 5 | 101 |
| 6 | 6 | 110 |
| 7 | 7 | 111 |

Because $2^3 = 8$, every octal digit matches **exactly three bits**, just as every hexadecimal digit matches exactly four.

## Octal and denary

### Octal to denary

Multiply each digit by its place value (1, 8, 64, 512, …) and add the results.

:::worked-solution{title="Convert the octal number 345 to denary"}
1. Place values from the right: 1, 8, 64.
2. $3 \times 64 = 192$.
3. $4 \times 8 = 32$.
4. $5 \times 1 = 5$.
5. Add: $192 + 32 + 5 = 229$.
:::

To show which base a number is in, it can be written with a small subscript: $345_8 = 229_{10}$.

### Denary to octal

Divide by 8 repeatedly, writing down each remainder, until the quotient is 0. Read the remainders from the **bottom up**. Each remainder is always between 0 and 7.

:::worked-solution{title="Convert the denary number 500 to octal"}
1. Divide by 8 and record each remainder, as in the table below.
2. Stop when the quotient is 0.
3. Read the remainders from the bottom up: 7, 6, 4.
4. So 500 in octal is 764.
5. Check: $7 \times 64 + 6 \times 8 + 4 = 448 + 48 + 4 = 500$.
:::

| Division | Quotient | Remainder |
|:-:|:-:|:-:|
| 500 ÷ 8 | 62 | 4 |
| 62 ÷ 8 | 7 | 6 |
| 7 ÷ 8 | 0 | 7 |

For small numbers a single division is enough: 45 ÷ 8 = 5 remainder 5, so 45 is 55 in octal.

## Octal and binary

### Octal to binary

Replace **each octal digit with its 3-bit group**, keeping the zeros inside each group.

:::worked-solution{title="Convert the octal number 627 to binary"}
1. 6 → 110.
2. 2 → 010 (keep the leading zero inside the group).
3. 7 → 111.
4. Join the groups: 110 010 111, so the binary number is 110010111.
:::

### Binary to octal

Split the bits into **groups of three from the right**, add zeros to the left of the last group if needed, then write each group as one octal digit.

:::worked-solution{title="Convert the binary number 10111010 to octal"}
1. Group in threes from the right: 10 111 010.
2. Pad the leftmost group: 010 111 010.
3. 010 = 2, 111 = 7, 010 = 2.
4. So 10111010 in octal is 272.
:::

## Comparing octal and hexadecimal

The same byte can be written in several bases. For example, the binary number 10111010 is 186 in denary, 272 in octal and BA in hexadecimal.

| Feature | Octal | Hexadecimal |
|:-:|:-:|:-:|
| Base | 8 | 16 |
| Digits | 0-7 | 0-9 and A-F |
| Bits per digit | 3 | 4 |
| Digits for one byte | 3 (the byte does not divide evenly into threes) | 2 (exactly) |
| Common uses | File permissions on some operating systems, older computer systems | MAC addresses, colour codes, memory dumps, error codes |

Both are shorthands for binary that people find easier to read than long strings of 0s and 1s. Hexadecimal is used far more today because computers group bits in bytes (8 bits), and a byte splits exactly into two 4-bit hex digits but not into 3-bit octal groups. Octal has the advantage of using only ordinary digits, with no letters.

:::example{title="File permissions"}
On some operating systems a file's permissions are written as three octal digits, such as 754. Each digit stands for three bits: read, write and execute. 7 = 111 (read, write and execute for the owner), 5 = 101 (read and execute for the group) and 4 = 100 (read only for everyone else). Three bits per digit is exactly what each set of permissions needs, which is why octal is used here.
:::

:::keyfact{title="ZIMSEC only"}
Octal is in the ZIMSEC syllabus (Form 3, with hexadecimal) but not in Cambridge 0478. ZIMSEC questions usually ask for denary ↔ octal conversions; octal ↔ binary is a quick check and a useful route.
:::

## Common mistakes

:::mistake{title="Using the digits 8 or 9"}
Octal has only the digits 0 to 7. An answer such as 189 cannot be an octal number. If a remainder ever comes out as 8 or more, the division is wrong.
:::

:::mistake{title="Using groups of four bits"}
Groups of four bits are for hexadecimal. For octal, always use groups of **three**, starting from the right.
:::

:::mistake{title="Reading the remainders from the top down"}
As with binary, the first remainder is the least significant digit. Read the remainders from the bottom up.
:::

:::mistake{title="Using place values of 10 or 16"}
Octal place values are 1, 8, 64, 512. Writing $3 \times 100$ for the left digit of 345 treats it as denary.
:::

## Exam tips

:::exam-tip{title="Label the base"}
When a question mixes bases, label each number, for example $345_8$ or "345 (octal)", so the examiner can follow your working.
:::

:::exam-tip{title="Go through binary if it is easier"}
To convert octal to hexadecimal, change to binary first (groups of three), then regroup in fours from the right. For example, octal 272 → 010 111 010 → 1011 1010 → BA.
:::

:::exam-tip{title="Check with multiplication"}
After converting denary to octal, multiply back: each digit × its place value, then add. It catches nearly every slip.
:::

## Summary

:::summary
- Octal is base 8: digits 0 to 7; place values 1, 8, 64, 512.
- Octal → denary: multiply each digit by its place value and add.
- Denary → octal: divide by 8 repeatedly and read the remainders from the bottom up.
- Each octal digit is exactly three bits; group binary in threes from the right.
- Hexadecimal (4 bits per digit) is more common because a byte splits into exactly two hex digits.
:::
