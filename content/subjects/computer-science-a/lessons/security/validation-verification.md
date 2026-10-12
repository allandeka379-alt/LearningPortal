---
{
  "key": "security.validation-verification",
  "title": "Data validation and verification",
  "summary": "Validation checks (range, format, length, presence, existence, limit, check digit), test data, verification during data entry and during data transfer (parity, checksum), a validation routine in pseudocode, and why these checks protect integrity but cannot guarantee that data is correct.",
  "concepts": ["acs.security.validation-verification"],
  "estimatedMinutes": 60,
  "level": "core"
}
---
## Introduction

A clerk at a school in Gweru types the marks of 80 learners into a database. One mark is typed as 650 instead of 65, another is typed as "6o" with the letter o instead of a zero, and one learner's mark is simply left out. Later the same file is sent to the district office over a poor line, and a few bits change on the way. Each of these damages the **integrity** of the data. Two families of checks defend against such errors: **validation**, which checks that data is *reasonable*, and **verification**, which checks that data has been *copied correctly*.

This lesson explains the validation checks and how to choose test data for them, writes a validation routine, shows a check-digit calculation, and then covers verification during entry and during transfer, including parity and checksums. You should already know the meaning of integrity and how to convert between denary and binary.

## Key definitions

:::definition{term="Data validation"}
An automatic check by a program that data entered is reasonable and allowed. It does not prove that the data is correct.
:::

:::definition{term="Data verification"}
A check that data has been entered or transferred accurately, by comparing it with the original or with a second copy.
:::

:::definition{term="Check digit"}
An extra digit added to a number, calculated from the other digits, which is recalculated when the number is entered to detect typing and transcription errors.
:::

:::definition{term="Parity check"}
A check on binary data in which an extra bit is added so that the number of 1s is always even (even parity) or always odd (odd parity); the receiver counts the 1s.
:::

## Validation checks

| Check | What it tests | Example of data rejected |
|---|---|---|
| **Range** | The value lies between a lowest and a highest value | A mark of 150 when marks are 0 to 100 |
| **Limit** | One end only: at least, or at most | A quantity below 1 |
| **Length** | The number of characters is allowed | A phone number with 7 digits when 10 are needed |
| **Format** | The data matches a pattern | A date typed as 31/31/2026 or a name that contains digits |
| **Presence** | A required field is not empty | A learner record with no surname |
| **Existence** | The value is on a list of allowed values | A class code that is not in the class table |
| **Check digit** | The final digit agrees with the others | An identity number with two digits swapped |

:::keyfact{title="Validation is not proof"}
A mark of 67 typed instead of 76 passes every check above. Validation can only say that the data is *possible*, so it is combined with verification.
:::

## Test data

A validation routine is tested with three kinds of data.

- **Normal data**: valid values, which must be accepted (a mark of 67).
- **Extreme (boundary) data**: valid values on the edge of the allowed range, which must be accepted (0 and 100).
- **Abnormal data**: invalid values, which must be rejected (101, a blank, "6a", -5).

The test data must also check *just outside* the boundary: 101 should be rejected, and -1 too. Good tests state the **expected result** before the routine is run.

## A validation routine

The function below checks a mark typed as text. It combines presence, length, format and range checks.

```
FUNCTION ValidMark(Text : STRING) RETURNS BOOLEAN
    DECLARE i : INTEGER
    DECLARE Value : INTEGER
    IF LENGTH(Text) = 0 OR LENGTH(Text) > 3 THEN     // presence and length checks
        RETURN FALSE
    ENDIF
    FOR i ← 1 TO LENGTH(Text)
        IF MID(Text, i, 1) < "0" OR MID(Text, i, 1) > "9" THEN     // digits only
            RETURN FALSE
        ENDIF
    NEXT i
    Value ← STR_TO_NUM(Text)
    RETURN Value >= 0 AND Value <= 100     // range check
ENDFUNCTION
```

The same logic in Python, with the test data of the table below, was run for real:

```python
def valid_mark(text):
    if len(text) == 0 or len(text) > 3:
        return False
    for ch in text:
        if ch < "0" or ch > "9":
            return False
    return 0 <= int(text) <= 100


for item in ["67", "100", "0", "101", "", "6a", "-5", "1000"]:
    print(repr(item), valid_mark(item))
```

```
'67' True
'100' True
'0' True
'101' False
'' False
'6a' False
'-5' False
'1000' False
```

:::worked-solution{title="Test data table for ValidMark"}
| Input | Type of test data | Expected result | Which check rejects it |
|---|---|---|---|
| 67 | Normal | Accepted | None |
| 0 and 100 | Extreme | Accepted | None |
| 101 | Abnormal (just outside) | Rejected | Range |
| (empty) | Abnormal | Rejected | Presence |
| 6a | Abnormal | Rejected | Format (digits only) |
| -5 | Abnormal | Rejected | Format, because the minus sign is not a digit |
| 1000 | Abnormal | Rejected | Length |

1. The output of the real run matches the expected column for every input.
2. The programmer chose both boundary values and the first value outside the upper boundary, because errors are most likely at the edges.
3. The routine does not say whether 67 is the learner's *true* mark: that needs verification.
:::

## Check digits

A common scheme multiplies each digit by a **weight**, adds the products, and chooses the check digit so that the total is a multiple of 11.

:::worked-solution{title="Calculating and using a check digit"}
A school gives each learner a six-digit number. The weights from the left are 7, 6, 5, 4, 3, 2 and the check digit has weight 1. Find the check digit for 482915.

1. 4×7 + 8×6 + 2×5 + 9×4 + 1×3 + 5×2 = 28 + 48 + 10 + 36 + 3 + 10 = 135.
2. 135 ÷ 11 = 12 remainder 3.
3. The check digit is 11 − 3 = 8, so the full number is **4829158**.
4. Check: with the weight 1 on the 8, the total is 135 + 8 = 143 = 11 × 13, a multiple of 11.

A clerk types 4289158 (the 8 and 2 are swapped).

5. 4×7 + 2×6 + 8×5 + 9×4 + 1×3 + 5×2 + 8×1 = 28 + 12 + 40 + 36 + 3 + 10 + 8 = 137.
6. 137 ÷ 11 = 12 remainder 5, which is not 0, so the number is rejected.
:::

If the remainder is 0 the check digit is 0; if the calculation gives 10, many schemes use the letter X.

## Verification during data entry

- **Visual check.** The person reading the screen compares it with the source document. It is slow and people overlook mistakes.
- **Double entry.** The data is typed twice, often by different people, and the program compares the two copies. A difference is reported and corrected. It is more reliable but takes twice as long.

## Verification during data transfer

**Parity check (byte).** Each byte carries a parity bit chosen so that the number of 1s is even (even parity). The receiver counts the 1s in each byte received. An odd count means at least one bit has changed. A single check cannot find a second changed bit in the same byte, and does not say which bit is wrong.

**Parity check (block).** Data is sent as a block of bytes, with a parity bit on each row and a parity byte for the columns. If one bit changes, one row and one column fail, and the bit where they cross is the wrong one and can be corrected.

:::worked-solution{title="Block parity with even parity"}
The characters K, A, D and I are sent as 7-bit codes with an even parity bit on each row, followed by a parity byte.

| Character | Bit 7 | Bit 6 | Bit 5 | Bit 4 | Bit 3 | Bit 2 | Bit 1 | Parity bit |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| K | 1 | 0 | 0 | 1 | 0 | 1 | 1 | 0 |
| A | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 0 |
| D | 1 | 0 | 0 | 0 | 1 | 0 | 0 | 0 |
| I | 1 | 0 | 0 | 1 | 0 | 0 | 1 | 1 |
| Parity byte | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 |

During transmission one bit changes, and the receiver gets this block.

| Character | Bit 7 | Bit 6 | Bit 5 | Bit 4 | Bit 3 | Bit 2 | Bit 1 | Parity bit |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| K | 1 | 0 | 0 | 1 | 0 | 1 | 1 | 0 |
| A | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 0 |
| D | 1 | 0 | 0 | 1 | 1 | 0 | 0 | 0 |
| I | 1 | 0 | 0 | 1 | 0 | 0 | 1 | 1 |
| Parity byte | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 |

1. Count the 1s in each row. Only the row for D has an odd number of 1s (three).
2. Count the 1s in each column, including the parity byte. Only the Bit 4 column has an odd number.
3. The error is where row D crosses the Bit 4 column. Changing that bit from 1 back to 0 corrects the block.
:::

**Checksum.** A value calculated from all the data (for example, the sum of the byte values modulo 256) is sent with it and recalculated by the receiver. A different value shows an error; the same value does not prove there is none.

:::keyfact{title="Cambridge"}
This topic is examined in Cambridge Paper 1: you must describe and *use* the checks, including test data and a check-digit calculation, and write a short validation routine in pseudocode. ZIMSEC has no separate sub-topic; the ideas appear when it discusses data integrity and project testing.
:::

## Common mistakes

:::mistake{title="Saying that validation makes data correct"}
Validation only checks that data is reasonable. A wrong but possible value, such as 67 instead of 76, passes. That is why verification is also used.
:::

:::mistake{title="Using test data that is all valid"}
Test data must include abnormal values to prove that the routine rejects them, and the boundary values to prove that it accepts the limits.
:::

:::mistake{title="Mixing up the two parity checks"}
A single parity bit per byte only says that a byte is wrong. Block parity uses row and column checks to locate the changed bit.
:::

## Exam tips

:::exam-tip
Cambridge Paper 1 asks you to *describe* a check, *state* the check that fits a field (a date: format; a quantity: range; a customer ID: check digit), *calculate* a check digit or parity bit, and *choose test data* with an expected result. Paper 2 may ask you to write the validation in pseudocode. Name the check, say what it tests and give an example of data it rejects. Never say validation "makes sure the data is correct".
:::

## Summary

:::summary
- Validation checks that data is reasonable (range, limit, length, format, presence, existence, check digit); it cannot prove it is correct.
- Test data has three kinds: normal, extreme (boundary) and abnormal, each with an expected result.
- A check digit is recalculated on entry and detects most typing errors, including swapped digits.
- Verification during entry uses a visual check or double entry; verification during transfer uses parity (byte and block) and checksums.
- Block parity finds the position of a single changed bit; a checksum shows an error but cannot prove there is none.
:::
