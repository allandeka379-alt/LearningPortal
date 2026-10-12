---
{
  "key": "asm.bit-manipulation",
  "title": "Bit manipulation: shifts, masks and bitwise operations",
  "summary": "Logical, arithmetic and cyclic shifts and their effect on value and sign, shifts as multiplication and division by powers of 2, masking with AND, OR and XOR to test, set, clear and toggle bits, and using a control register to monitor and control a device.",
  "concepts": ["acs.asm.bit-manipulation"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

The controller of a borehole pump near Masvingo does not keep a separate memory location for every yes-or-no fact. One byte holds eight of them: bit 0 may say "water level low", bit 1 "tank full" and bit 4 "pump motor on". To read one fact, or change one, without disturbing the other seven, the program works on individual bits. This is **bit manipulation**.

The lesson covers shifting bits to the left and right (and what that does to the value), the bitwise operations AND, OR and XOR with a **mask**, and how a program monitors and controls a device by testing and setting bits of a register. All values in this lesson were computed by code and checked by running the 9618 instructions `AND`, `OR`, `XOR`, `LSL` and `LSR`.

You should already know binary numbers, two's complement and the accumulator.

## Key definitions

:::definition{term="Logical shift"}
A shift in which the bits move the stated number of places and zeros fill the empty positions; bits that move out of the register are lost.
:::

:::definition{term="Arithmetic shift"}
A shift of a two's complement number in which a right shift copies the sign bit into the empty positions, so that the sign of the number is kept.
:::

:::definition{term="Cyclic shift"}
A shift in which the bits that move out at one end re-enter at the other end, so no bit is lost.
:::

:::definition{term="Mask"}
A binary pattern used with AND, OR or XOR to select, set, clear or toggle particular bits of another value.
:::

## Shifts

| Shift | Before | Places | After | Value |
|:-:|:-:|:-:|:-:|:-:|
| Logical left | 0010 1101 | 2 | 1011 0100 | 45 → 180 |
| Logical right | 1011 0110 | 3 | 0001 0110 | 182 → 22 |
| Arithmetic right (signed) | 1101 0100 | 2 | 1111 0101 | -44 → -11 |
| Cyclic left | 1001 0110 | 1 | 0010 1101 | 150 → 45 |
| Cyclic right | 0000 1011 | 3 | 0110 0001 | 11 → 97 |

- **Logical left shift** by n places moves each bit n places towards the most significant end. The vacated places are filled with 0.
- **Logical right shift** moves each bit towards the least significant end. It is used for unsigned values.
- **Arithmetic right shift** keeps the sign bit, so a negative number stays negative. In the table, -44 shifted right two places becomes -11.
- **Cyclic (rotate) shifts** lose nothing: the bit that leaves one end enters the other.

In the 9618 instruction set, `LSL #n` and `LSR #n` are logical shifts of ACC by n places.

### Shifts and arithmetic

For an unsigned number, a left shift by one place **multiplies by 2** and a right shift by one place **divides by 2**, throwing away the remainder. Shifting by n places multiplies or divides by 2 to the power n.

| Start value | Instruction | Result | Same as |
|:-:|:-:|:-:|:-:|
| 13 | LSL #3 | 104 | 13 × 8 |
| 44 | LSR #2 | 11 | 44 ÷ 4 |
| 45 | LSR #2 | 11 | 45 ÷ 4, remainder lost |

A left shift can **overflow**: a bit that is shifted out of the top of the register is lost, so the result is wrong if the number was too large.

| Start value | Binary | After LSL #1 (8 bits) | Value | Doubled correctly? |
|:-:|:-:|:-:|:-:|:-:|
| 13 | 0000 1101 | 0001 1010 | 26 | yes |
| 100 | 0110 0100 | 1100 1000 | 200 | yes |
| 200 | 1100 1000 | 1001 0000 | 144 | no: the top bit was lost |

:::keyfact{title="Shifts: value and sign"}
Unsigned: LSL n multiplies by 2^n (if no 1 bit is lost); LSR n divides by 2^n and drops the remainder. Two's complement: use an arithmetic right shift to divide and keep the sign; a logical right shift of a negative number puts a 0 in the sign bit and gives a large positive value.
:::

## Masks: AND, OR and XOR

| Operation | Instruction | Mask | Result | What it does |
|:-:|:-:|:-:|:-:|:-:|
| Test a bit | `AND B00000100` | 00000100 | 0000 0100 | Keeps only bit 2; non-zero means bit 2 was 1 |
| Clear bits | `AND B11110000` | 11110000 | 1011 0000 | Sets the low four bits to 0, keeps the high four |
| Set bits | `OR B00001001` | 00001001 | 1011 1111 | Sets bits 0 and 3 to 1, keeps the others |
| Toggle bits | `XOR B00000110` | 00000110 | 1011 0000 | Flips bits 1 and 2 |

Each instruction works on every pair of bits at the same time:

- **AND** gives 1 only if both bits are 1. A mask bit of 1 *keeps* the bit; a mask bit of 0 *clears* it. Used to **test** a bit (clear all the others, then see whether the result is 0) or to **clear** a bit.
- **OR** gives 1 if either bit is 1. A mask bit of 1 *sets* the bit; a mask bit of 0 leaves it alone. Used to **set** a bit.
- **XOR** gives 1 if the bits differ. A mask bit of 1 *toggles* the bit; a mask bit of 0 leaves it alone.

Bits are numbered from 0 at the right-hand (least significant) end, so bit 4 in `00010000` is the fifth place from the right.

## Monitoring and controlling a device

A **status register** holds bits that the device sets (sensors); a **control register** holds bits that the program sets to switch things on and off. In the pump example, bit 0 of `Status` is the "water low" sensor and bit 4 of `Control` is the pump motor. The program below switches the pump on when the sensor bit is 1 and off when it is 0, and changes no other bit of `Control`.

```
800  LDD Status
801  AND B00000001
802  CMP #0
803  JPE Off
804  LDD Control
805  OR B00010000
806  STO Control
807  JMP Done
808  Off: LDD Control
809  AND B11101111
810  STO Control
811  Done: END
812  Status: B00000101
813  Control: B00000000
```

:::worked-solution{title="Running the pump program"}
First run: `Status` = 00000101 and `Control` = 00000000.

```
800 LDD Status → ACC 00000101
801 AND B00000001 → ACC 00000001
802 CMP #0 → ACC 00000001
803 JPE Off → ACC 00000001
804 LDD Control → ACC 00000000
805 OR B00010000 → ACC 00010000
806 STO Control → ACC 00010000
807 JMP Done → ACC 00010000
811 END → ACC 00010000
```

1. `AND B00000001` keeps only bit 0 of `Status`, giving 00000001.
2. `CMP #0` finds ACC not equal to 0, so `JPE Off` does not jump.
3. `LDD Control` and `OR B00010000` set bit 4 only; `STO Control` saves the result.
4. The program ran 9 instructions. The two runs give:

| Status (sensor bits) | Control before | Bit 0 of Status | Control after |
|:-:|:-:|:-:|:-:|
| 00000101 | 00000000 | 1 (water low) | 0001 0000 |
| 00000110 | 00010010 | 0 (water not low) | 0000 0010 |

In the second run bit 0 is 0, so the `Off` section clears bit 4 with `AND B11101111` while the other bits (here bit 1) stay as they were.
:::

:::example{title="Why not just use LDM and STO?"}
If the program used `LDM B00010000` and `STO Control` it would switch the pump on, but it would also set every other control bit to 0, which might switch off an alarm or a valve that another part of the program had set. The mask methods change only the bits you choose.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Bit manipulation with shifts, masks and the instructions `AND`, `OR`, `XOR`, `LSL` and `LSR` is Cambridge AS content (topic 4.3). The ZIMSEC syllabus does not list these instructions as a separate topic.
:::

## Common mistakes

:::mistake{title="Using AND to set a bit"}
`AND` can only clear bits or keep them. To set a bit use `OR` with a 1 in that position.
:::

:::mistake{title="Numbering bits from the left"}
Bit 0 is the least significant (right-hand) bit. Check the question to see how bits are numbered.
:::

:::mistake{title="Expecting a shift to double a number whatever its size"}
In an 8-bit register a left shift loses the top bit, so a value of 128 or more is not doubled correctly. A right shift also loses the lowest bit, so an odd number is not halved exactly.
:::

:::mistake{title="Using a logical right shift on a negative number"}
The sign bit becomes 0, so the answer is positive. Use an arithmetic shift when the number is two's complement.
:::

## Exam tips

:::exam-tip
Cambridge **Paper 1** and **Paper 2** give a byte and ask for the result of a shift or of AND, OR or XOR with a mask. Write both bytes one above the other in groups of four bits and work down column by column. State which kind of shift is meant.
:::

:::exam-tip
"**Explain** how a bit is tested": use `AND` with a mask that has a 1 only in the bit position, then compare the result with 0. "**Describe** how a bit is set / cleared / toggled": `OR` / `AND` with the inverse mask / `XOR`, each with the mask pattern.
:::

:::exam-tip
Give the effect of a shift in words and in numbers: "shifting left two places multiplies by 4, provided no 1 bit is lost off the left".
:::

## Summary

:::summary
- Logical shifts fill with zeros; arithmetic right shifts copy the sign bit; cyclic shifts bring the bits that leave back in at the other end.
- A left shift of an unsigned number multiplies by 2 for each place; a right shift divides by 2 and loses the remainder; bits shifted out are lost.
- AND with a mask tests or clears bits, OR sets them, XOR toggles them.
- A status register is read with AND masks; a control register is changed with OR and AND masks that leave the other bits alone.
- The 9618 instructions are `AND`, `OR`, `XOR`, `LSL #n` and `LSR #n`, operating on ACC.
:::
