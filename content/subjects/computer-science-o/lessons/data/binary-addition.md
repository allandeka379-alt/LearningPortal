---
{
  "key": "data.binary-addition",
  "title": "Binary addition and overflow",
  "summary": "Add two positive 8-bit binary integers column by column using the four addition rules and carries, recognise when the result is too large for an 8-bit register (overflow), and explain why overflow errors happen.",
  "concepts": ["comp.data.binary-addition"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

A tuck-shop till at a school in Bulawayo adds up the items in each sale. Inside the processor, the **arithmetic logic unit (ALU)** does every addition in binary, one column at a time, exactly like the column addition you learnt in primary school, but with only the digits 0 and 1.

Because each register has a fixed number of bits, some answers are too big to fit. This is called **overflow**, and it is a favourite exam topic because it links arithmetic to how real hardware behaves. In this lesson you will add 8-bit binary numbers with carries, check your answers in denary, and explain overflow.

## Key definitions

:::definition{term="Carry"}
A 1 passed to the next column on the left when the total in a column is 2 or 3 (binary 10 or 11).
:::

:::definition{term="Register"}
A small, very fast storage location inside the processor that holds a fixed number of bits, for example 8 bits.
:::

:::definition{term="Overflow"}
An error that happens when the result of a calculation needs more bits than the register can hold. In an 8-bit register, any result greater than 255 overflows.
:::

## The four rules of binary addition

Every column of a binary addition uses one of these rules. Remember that in binary, 2 is written 10 and 3 is written 11.

| Column total | In binary | Write down | Carry to the next column |
|:-:|:-:|:-:|:-:|
| 0 + 0 = 0 | 0 | 0 | 0 |
| 0 + 1 = 1 | 1 | 1 | 0 |
| 1 + 1 = 2 | 10 | 0 | 1 |
| 1 + 1 + 1 (with a carry) = 3 | 11 | 1 | 1 |

## Adding two 8-bit numbers

Write the numbers one under the other with the place values lined up. Start at the **right-hand column** and work left. Write each carry above (or below) the next column so you do not forget it.

:::worked-solution{title="Add 00110101 and 01001110"}
1. 1s column: $1 + 0 = 1$. Write 1, no carry.
2. 2s column: $0 + 1 = 1$. Write 1, no carry.
3. 4s column: $1 + 1 = 10$. Write 0, carry 1.
4. 8s column: $0 + 1 + 1 = 10$. Write 0, carry 1.
5. 16s column: $1 + 0 + 1 = 10$. Write 0, carry 1.
6. 32s column: $1 + 0 + 1 = 10$. Write 0, carry 1.
7. 64s column: $0 + 1 + 1 = 10$. Write 0, carry 1.
8. 128s column: $0 + 0 + 1 = 1$. Write 1, no carry.
9. Answer: 10000011.
10. Check in denary: $53 + 78 = 131$, and $10000011 = 128 + 2 + 1 = 131$.
:::

The same working set out as a table, with the carry row showing the carries going **into** each column:

| | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| First number | 0 | 0 | 1 | 1 | 0 | 1 | 0 | 1 |
| Second number | 0 | 1 | 0 | 0 | 1 | 1 | 1 | 0 |
| Carry | 1 | 1 | 1 | 1 | 1 | | | |
| Sum | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 1 |

## Overflow

An 8-bit register can hold values from 0 to 255. If two 8-bit numbers add up to more than 255, the answer needs a ninth bit. There is a carry **out of** the 128s column with nowhere to go. That is an **overflow**.

:::worked-solution{title="Add 11010010 and 01110001 in an 8-bit register"}
1. 1s: $0 + 1 = 1$. 2s: $1 + 0 = 1$. 4s: $0 + 0 = 0$. 8s: $0 + 0 = 0$.
2. 16s: $1 + 1 = 10$. Write 0, carry 1.
3. 32s: $0 + 1 + 1 = 10$. Write 0, carry 1.
4. 64s: $1 + 1 + 1 = 11$. Write 1, carry 1.
5. 128s: $1 + 0 + 1 = 10$. Write 0, carry 1 **out of the register**.
6. The full answer is 101000011 (nine bits), which is $210 + 113 = 323$.
7. The register keeps only the right-hand 8 bits: 01000011, which is 67. The result stored is wrong: an overflow error has occurred.
:::

| | | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| First number | | 1 | 1 | 0 | 1 | 0 | 0 | 1 | 0 |
| Second number | | 0 | 1 | 1 | 1 | 0 | 0 | 0 | 1 |
| Carry | 1 | 1 | 1 | 1 | | | | | |
| Sum | (lost) | 0 | 1 | 0 | 0 | 0 | 0 | 1 | 1 |

### Why overflow happens

- A register has a **fixed size**. The processor cannot add an extra bit on the left just because an answer is big.
- The largest value $n$ bits can hold is $2^n - 1$. For 8 bits that is 255; any result above it does not fit.
- The carry out of the most significant bit is lost (or is used to set an **overflow flag**), so the value left in the register is wrong.

Processors detect this and signal an error, so a program can warn the user, use a larger register (for example 16 bits) or stop the calculation. Without checking, a program would carry on with a wrong value: a score, a total or a sensor reading would suddenly drop to a small number.

:::example{title="A step counter that resets"}
Farai's simple step counter stores the steps for each minute in an 8-bit register. If he takes 250 steps and then 10 more in the same minute, the total, 260, needs nine bits. The register is left holding $260 - 256 = 4$, so the counter shows 4 steps. Designers prevent this by using more bits or by checking for overflow before storing the result.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards ask you to add binary numbers. Cambridge 0478 states "two positive 8-bit binary integers" and also asks you to explain overflow and why it happens. ZIMSEC (Form 2) asks you to add binary numbers; it may use fewer bits, and it is good practice to check every answer in denary.
:::

## Common mistakes

:::mistake{title="Writing 2 in a column"}
Binary has no digit 2. When a column adds up to 2, write 0 and carry 1; when it adds up to 3, write 1 and carry 1.
:::

:::mistake{title="Forgetting a carry"}
Most wrong answers come from a carry that was worked out but not added into the next column. Write every carry down as soon as it appears.
:::

:::mistake{title="Saying overflow means the answer is 'too long'"}
Be precise: overflow happens because the result is **greater than 255** (the largest value 8 bits can hold), so it needs a ninth bit that the register does not have.
:::

:::mistake{title="Keeping the ninth bit when the question says 8-bit register"}
If the question asks what is **stored**, give only the 8 right-hand bits and say that overflow has occurred.
:::

## Exam tips

:::exam-tip{title="Show the carries"}
Write the carries in a row of their own. Examiners often give a mark for working, and visible carries let you find slips quickly.
:::

:::exam-tip{title="Check in denary"}
Convert both numbers and your answer to denary. If the denary sum matches (and is at most 255), the binary answer is right.
:::

:::exam-tip{title="Explaining overflow"}
A full answer has three parts: the register has a fixed number of bits (8); the result is greater than 255; so a ninth bit is needed, the extra bit is lost and the stored value is wrong.
:::

## Summary

:::summary
- Binary addition rules: 0 + 0 = 0; 0 + 1 = 1; 1 + 1 = 10 (write 0, carry 1); 1 + 1 + 1 = 11 (write 1, carry 1).
- Add from the right-hand column, carrying into the next column on the left.
- An 8-bit register holds 0 to 255.
- Overflow: the result is greater than 255, so a carry out of the 128s column is lost and the stored value is wrong.
- Overflow happens because registers have a fixed size; it can be prevented by using more bits or by checking the result.
:::
