---
{
  "key": "data.hexadecimal",
  "title": "Hexadecimal: conversions and uses",
  "summary": "Convert positive whole numbers between hexadecimal and denary and between hexadecimal and binary using groups of four bits, and explain why hexadecimal is used and where: MAC addresses, colour codes, memory dumps, error codes and assembly code.",
  "concepts": ["comp.data.hexadecimal"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Thandeka is helping the IT technician at a college in Mutare register laptops on the network. Each laptop shows its network address as something like `3C-A9-F4-1E-07-B2`. Later, while editing the college web page, she sees the colour of a heading written as `#1F6E8C`. Both are written in **hexadecimal**, a base 16 number system.

Computers never work in hexadecimal: inside, everything is binary. But long binary numbers are hard for people to read, copy and check. Hexadecimal gives a short, exact way of writing them. Exams test both the conversions and the reasons hexadecimal is used, so you need both halves of this lesson.

## Key definitions

:::definition{term="Hexadecimal"}
The base 16 number system. It uses sixteen symbols: the digits 0 to 9 and the letters A to F, which stand for the values 10 to 15. Place values are 1, 16, 256, 4096, … from the right.
:::

:::definition{term="Nibble"}
A group of four bits. One nibble has $2^4 = 16$ patterns, so it matches exactly one hexadecimal digit.
:::

## Hexadecimal digits

Learn this table. The binary column is each value written as a 4-bit nibble.

| Denary | Binary | Hex |
|:-:|:-:|:-:|
| 0 | 0000 | 0 |
| 1 | 0001 | 1 |
| 2 | 0010 | 2 |
| 3 | 0011 | 3 |
| 4 | 0100 | 4 |
| 5 | 0101 | 5 |
| 6 | 0110 | 6 |
| 7 | 0111 | 7 |
| 8 | 1000 | 8 |
| 9 | 1001 | 9 |
| 10 | 1010 | A |
| 11 | 1011 | B |
| 12 | 1100 | C |
| 13 | 1101 | D |
| 14 | 1110 | E |
| 15 | 1111 | F |

## Hexadecimal and denary

### Hexadecimal to denary

Multiply each digit by its place value and add. Change letters to their values first.

:::worked-solution{title="Convert the hexadecimal number 1A7 to denary"}
1. Place values from the right: 1, 16, 256.
2. The digit 1 is in the 256s place: $1 \times 256 = 256$.
3. The digit A (10) is in the 16s place: $10 \times 16 = 160$.
4. The digit 7 is in the 1s place: $7 \times 1 = 7$.
5. Add: $256 + 160 + 7 = 423$.
:::

### Denary to hexadecimal

For a number up to 255, divide by 16. The **whole-number answer** is the left digit and the **remainder** is the right digit. Change any value from 10 to 15 into its letter.

:::worked-solution{title="Convert the denary number 188 to hexadecimal"}
1. $188 \div 16 = 11$ remainder 12 (because $11 \times 16 = 176$ and $188 - 176 = 12$).
2. 11 is the hex digit B, and 12 is the hex digit C.
3. So 188 in hexadecimal is BC.
4. Check: $11 \times 16 + 12 = 176 + 12 = 188$.
:::

For larger numbers, keep dividing the quotient by 16 and read the remainders from the bottom up, just like repeated division by 2 for binary. Another route that many students find easier is to convert the denary number to binary first and then group the bits into fours.

## Hexadecimal and binary

This is the conversion hexadecimal was made for, and it needs no arithmetic at all.

### Hexadecimal to binary

Replace **each hex digit with its 4-bit nibble**, keeping every leading zero inside each nibble.

:::worked-solution{title="Convert the hexadecimal number 3F9C to binary"}
1. 3 → 0011.
2. F (15) → 1111.
3. 9 → 1001.
4. C (12) → 1100.
5. Join the nibbles: 0011 1111 1001 1100, a 16-bit number.
:::

### Binary to hexadecimal

Split the bits into **groups of four starting from the right**, then replace each group with its hex digit. If the leftmost group has fewer than four bits, add zeros on the left.

:::worked-solution{title="Convert the binary number 110101101011 to hexadecimal"}
1. Group from the right: 1101 0110 1011.
2. 1101 = 13 = D; 0110 = 6; 1011 = 11 = B.
3. So the hexadecimal number is D6B.
:::

:::example{title="An awkward number of bits"}
Sipho must convert 1011100 (seven bits) to hexadecimal. Grouping from the left would give 1011 100, which is wrong. Grouping from the right gives 101 1100; padding the left group with a zero gives 0101 1100, so the answer is 5C.
:::

## Why hexadecimal is used

- It is **shorter**: one hex digit replaces four bits, so a byte needs just two characters and a 16-bit value four.
- It is **easier for people to read, remember and type** correctly than long strings of 0s and 1s, so fewer mistakes are made.
- It is **easy to convert** to and from binary, digit by digit, unlike denary.

Remember that hexadecimal is only how values are *shown* to people. The computer still stores and processes them in binary, using exactly the same number of bits.

### Where hexadecimal is used

| Use | Example | What it means |
|:-:|:-:|:-:|
| MAC addresses | 3C-A9-F4-1E-07-B2 | 48-bit hardware address of a network card: 12 hex digits |
| HTML colour codes | #FF8000 | Red, green and blue intensities, one byte each (FF, 80, 00) |
| Memory dumps | 0040: 4D 5A 90 00 | The contents of memory shown byte by byte for debugging |
| Error codes | 0x0000007B | A fault code shown by a program or operating system |
| Assembly code and addresses | JMP 1A2F | Memory addresses and machine code in low-level programming |

In the colour #FF8000, FF is 255 (full red), 80 is 128 (half green) and 00 is no blue, which gives orange. A programmer can read and adjust these values far more easily than 24 bits of binary.

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC (Form 3) asks you to convert denary numbers to hexadecimal and back. Cambridge 0478 adds hexadecimal ↔ binary, numbers up to 16 bits, and asks you to explain why hexadecimal is useful and identify where it is used. Learn the uses for both boards: they are popular short-answer questions.
:::

## Common mistakes

:::mistake{title="Grouping bits from the left"}
When converting binary to hexadecimal, always group in fours from the **right**. Pad the leftmost group with zeros if it is short.
:::

:::mistake{title="Writing 10 to 15 as two digits"}
A remainder of 12 is written as the single hex digit C, not as "12". Writing 1112 for 188 mixes denary into the answer.
:::

:::mistake{title="Dropping zeros inside a nibble"}
Hex 3 is 0011, not 11. Each hex digit must become exactly four bits, or the bits of the whole number shift into the wrong places.
:::

:::mistake{title="Saying hexadecimal saves memory"}
Hexadecimal is a display format. The value is still stored in binary with the same number of bits.
:::

## Exam tips

:::exam-tip{title="Reasons need a comparison"}
"Hexadecimal is easier" is not enough. Say what it is easier *than* and why: "shorter than binary, so it is easier for humans to read and fewer errors are made when copying it".
:::

:::exam-tip{title="Use binary as a stepping stone"}
For denary ↔ hexadecimal you can go through binary: 188 → 10111100 → 1011 1100 → BC. It avoids dividing by 16 without a calculator.
:::

:::exam-tip{title="Write hex letters in capitals"}
Mark schemes show A to F in capitals. Keep your answers in the same form.
:::

## Summary

:::summary
- Hexadecimal is base 16: digits 0-9 and A-F (10-15); place values 1, 16, 256, 4096.
- Hex → denary: multiply each digit by its place value and add. Denary → hex: divide by 16; the quotient and remainder give the digits.
- Hex ↔ binary: each hex digit is one 4-bit nibble; group bits in fours from the right.
- Hexadecimal is used because it is shorter and easier for humans to read than binary, with fewer errors, and converts easily.
- Uses: MAC addresses, HTML colour codes, memory dumps, error codes, assembly code and memory addresses.
:::
