---
{
  "key": "data.number-systems",
  "title": "Number systems: why computers use binary",
  "summary": "Why every kind of data inside a computer is stored as binary, what a bit is, and how place value works in the denary (base 10), binary (base 2) and hexadecimal (base 16) number systems.",
  "concepts": ["comp.data.number-systems"],
  "estimatedMinutes": 25,
  "level": "core"
}
---
## Introduction

When Rudo pays for bread at a shop in Gweru with a bank card, the till, the card reader and the bank's server all handle the amount, her account number and the time of the sale. A photo she sends on her phone, a song she streams and the text of this lesson are handled in the same way. Inside every one of these devices, all of that data is stored and processed as patterns of just two values: **0** and **1**.

This lesson explains why computers work in **binary**, what a **bit** is, and how the place value idea you already use for ordinary numbers works in three number systems: denary, binary and hexadecimal. The conversions themselves come in the next lessons, but every one of them depends on the place values you meet here. Both ZIMSEC and Cambridge expect you to explain *why* computers use binary, not just to state that they do.

## Key definitions

:::definition{term="Binary"}
A number system with base 2. It uses only the digits 0 and 1, and each place value is double the one to its right.
:::

:::definition{term="Bit"}
Short for **binary digit**: a single 0 or 1. It is the smallest unit of data a computer can store.
:::

:::definition{term="Denary"}
The base 10 number system people use every day, with the digits 0 to 9. It is also called decimal.
:::

:::definition{term="Hexadecimal"}
A number system with base 16. It uses the digits 0 to 9 and the letters A to F (A stands for 10, F for 15).
:::

:::definition{term="Place value"}
The value a digit has because of its position in a number. In any base, each place is worth the base times the place to its right.
:::

## Why computers use binary

A computer is built from millions of tiny electronic **switches** called transistors. Each switch can be in one of two states: **on** (current flows) or **off** (no current). Two states fit two digits exactly, so it is natural to let off stand for 0 and on stand for 1.

The two-state idea appears all through the hardware:

- **Logic gates** (AND, OR, NOT and so on) take inputs that are high or low voltage and give a high or low output.
- **Registers** and **memory** cells hold a fixed number of bits, each one either 0 or 1.
- **Storage** keeps bits as two states too: magnetised one way or the other on a hard disk, a charge present or absent in flash memory, a pit or no pit on an optical disc.

Two states are also **reliable**. A circuit only has to tell "high" from "low", so a small amount of electrical noise does not change the value. A circuit that had to tell ten different voltage levels apart (for denary) would be more complicated, more expensive and much more likely to make mistakes.

:::keyfact{title="All data is binary"}
Numbers, text, images, sound, video and the program instructions themselves are all stored as binary. Before a computer can process any data, it must be converted to binary; the computer then processes it using logic gates and stores it in registers and memory.
:::

### How many values can a group of bits hold?

One bit gives two patterns: 0 and 1. Every extra bit doubles the number of patterns, because each old pattern can now be followed by a 0 or by a 1. With three bits there are eight patterns: 000, 001, 010, 011, 100, 101, 110 and 111.

| Number of bits | Different patterns | Largest unsigned value |
|:-:|:-:|:-:|
| 1 | 2 | 1 |
| 2 | 4 | 3 |
| 4 | 16 | 15 |
| 8 | 256 | 255 |
| 16 | 65536 | 65535 |

In general, $n$ bits give $2^n$ patterns, so the largest whole number they can hold is $2^n - 1$ (one pattern is used for zero). An 8-bit register can therefore hold any whole number from 0 to 255.

## Place value in three number systems

### Denary (base 10)

In the denary number 4072 each place is ten times the place to its right:

| 1000 | 100 | 10 | 1 |
|:-:|:-:|:-:|:-:|
| 4 | 0 | 7 | 2 |

The value is $4 \times 1000 + 0 \times 100 + 7 \times 10 + 2 \times 1 = 4072$. You do this without thinking, but it is exactly the method used in the other bases.

### Binary (base 2)

In binary each place is **two** times the place to its right. For an 8-bit number the place values, from the right, are 1, 2, 4, 8, 16, 32, 64 and 128:

| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|

Each digit is 0 or 1, so a place either counts (1) or does not (0). The leftmost bit has the largest value and is called the **most significant bit** (MSB); the rightmost bit is the **least significant bit** (LSB).

### Hexadecimal (base 16)

In hexadecimal each place is **sixteen** times the place to its right: 1, 16, 256, 4096 and so on. A single place can hold a value up to 15, so letters are borrowed for the values ten to fifteen: A = 10, B = 11, C = 12, D = 13, E = 14 and F = 15.

Hexadecimal is not used by the hardware. It is a **shorthand for people**, because one hexadecimal digit stands for exactly four bits (16 = $2^4$). The lesson on hexadecimal shows how this makes long binary numbers much easier to read.

:::worked-solution{title="Find the denary value of the binary number 10110011"}
1. Write the 8-bit place values above the bits: 128, 64, 32, 16, 8, 4, 2, 1.
2. The bits are 1, 0, 1, 1, 0, 0, 1, 1, so the places that count are 128, 32, 16, 2 and 1.
3. Add them: $128 + 32 + 16 + 2 + 1 = 179$.
4. The binary number 10110011 has the denary value 179.
:::

:::worked-solution{title="Find the denary value of the hexadecimal number 2E"}
1. The place values are 16 (left digit) and 1 (right digit).
2. The digit 2 is worth $2 \times 16 = 32$.
3. The digit E stands for 14, worth $14 \times 1 = 14$.
4. Add them: $32 + 14 = 46$.
:::

:::example{title="Explaining binary to a customer"}
Tatenda works at a computer shop in Mutare. A customer asks why the computer cannot "just use normal numbers". A good answer: the processor and memory are made of switches that are only ever on or off, so each switch can only store one of two values. Binary needs exactly two digits, so each bit maps onto one switch. Two states are easy to tell apart, so data is stored and processed reliably. Normal (denary) numbers are converted to binary on input and back to denary on output, so the user never has to see the binary.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect you to explain why computers use binary. Cambridge 0478 adds denary and hexadecimal in the same objective and tests conversions up to 16 bits. ZIMSEC introduces binary in Form 1, conversions in Form 2, and octal (base 8) and hexadecimal in Form 3; octal has its own lesson.
:::

## Common mistakes

:::mistake{title="Saying computers use binary because it is faster to calculate"}
The real reason is the hardware: switches, logic gates and storage have two states, and two states are reliable to detect. Speed is not the reason binary was chosen.
:::

:::mistake{title="Thinking hexadecimal is used inside the processor"}
The processor only ever works in binary. Hexadecimal is a way of *displaying* binary that is shorter and easier for humans to read.
:::

:::mistake{title="Starting binary place values at 2"}
The rightmost place in every number system is worth 1 (the base to the power 0). In binary the places run 1, 2, 4, 8, … from the right.
:::

:::mistake{title="Saying 8 bits can store the number 256"}
Eight bits give 256 different patterns, but one of them is zero, so the largest value is 255.
:::

## Exam tips

:::exam-tip{title="Explain why computers use binary"}
For an *explain* question give linked points: computers contain switches or logic gates; each has two states (on/off); binary has two digits, 1 and 0, so each state is a bit; two states are reliable. A bare "computers only understand 1s and 0s" earns little.
:::

:::exam-tip{title="Show your place values"}
In any conversion, write the place values above the digits. If you make an addition slip, the working can still earn method marks.
:::

:::exam-tip{title="Know the powers of 2"}
Learn 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024 by heart. No calculator is allowed in the Cambridge papers, and these numbers appear in conversions, storage units and file sizes.
:::

## Summary

:::summary
- Computers use binary because their switches, logic gates, registers and storage each have two states, and two states are reliable to detect.
- A bit is one binary digit (0 or 1); $n$ bits give $2^n$ patterns, so 8 bits hold 0 to 255.
- Denary is base 10, binary is base 2 and hexadecimal is base 16 (digits 0 to 9 and A to F).
- In every base the rightmost place is worth 1 and each place is the base times the place to its right.
- Hexadecimal is a shorthand for humans: one hex digit stands for four bits.
:::
