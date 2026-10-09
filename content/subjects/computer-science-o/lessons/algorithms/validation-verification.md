---
{
  "key": "algorithms.validation-verification",
  "title": "Validation and verification of input data",
  "summary": "Why input data must be checked; the validation checks (range, length, type, presence, format and check digit) and the verification checks (visual check and double entry); and how to write algorithms in pseudocode that validate or verify input.",
  "concepts": ["comp.algorithms.validation-verification"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

At a school in Harare, a clerk enters exam marks into the results system. If she types 810 instead of 81, a learner could appear to have scored more than the maximum. If she types 18 instead of 81, the mark looks perfectly sensible but is wrong, and the learner may be told they failed. Computers process whatever they are given ("garbage in, garbage out"), so input must be checked **before** it is stored or used.

There are two kinds of checks. **Validation** is done automatically by the program and asks: is this data **sensible and allowed**? **Verification** asks: is this data **the same as the original**? Both boards examine this. Cambridge Paper 2 regularly asks you to name a suitable check, give test data, and **write pseudocode** that validates or verifies input.

## Key definitions

:::definition{term="Validation"}
An automatic check carried out by a program to make sure that input data is reasonable and meets set rules before it is accepted. It cannot prove the data is correct.
:::

:::definition{term="Verification"}
A check that data has been entered or copied accurately, so that it matches the original source.
:::

:::definition{term="Check digit"}
An extra digit added to the end of a number, calculated from the other digits, which is recalculated on input to detect errors such as a mistyped or swapped digit.
:::

## Validation checks

| Check | What it tests | Example |
|:--|:--|:--|
| Range check | The value lies between a lower and an upper limit | A mark from 0 to 100; an age from 11 to 20 |
| Length check | The number of characters is exactly, at least or at most a given number | A password of at least 8 characters; a phone number of exactly 10 digits |
| Type check | The data is of the correct data type | A quantity must be a whole number, not `2.5` or `ten` |
| Presence check | The data has been entered (the field is not empty) | A surname must be given |
| Format check | The data follows a set pattern of characters | A product code of two letters followed by four digits, such as `TK4821` |
| Check digit | The final digit agrees with the value calculated from the other digits | ISBNs on books; bar codes on products |

Validation reduces errors but **cannot guarantee accuracy**. A mark of 18 passes a range check of 0 to 100 even if the real mark was 81. That is why verification is also needed.

## Writing validation algorithms

The usual pattern is a **loop that repeats the input until the data is valid**, with an error message each time it is not. A `REPEAT … UNTIL` loop always runs at least once, which suits input:

```
REPEAT
    OUTPUT "Enter a mark from 0 to 100"
    INPUT Mark
    IF Mark < 0 OR Mark > 100
        THEN
            OUTPUT "Invalid mark, try again"
    ENDIF
UNTIL Mark >= 0 AND Mark <= 100
OUTPUT "Mark accepted"
```

:::worked-solution[Tracing the range check]
The user enters 105, then -3, then 72. Complete a trace table.

| Mark | OUTPUT |
|:-:|:--|
| 105 | Invalid mark, try again |
| -3 | Invalid mark, try again |
| 72 |  |
|  | Mark accepted |

1. 105 is greater than 100, so the error message is output and the `UNTIL` condition is false: the loop repeats.
2. -3 is less than 0: error message, loop repeats.
3. 72 is between 0 and 100: no message; the `UNTIL` condition is true, so the loop ends and "Mark accepted" is output.
:::

A `WHILE` loop can be used too, with the first input before the loop. Here is a **length check** and a **presence check**:

```
OUTPUT "Enter a password of at least 8 characters"
INPUT Password
WHILE LENGTH(Password) < 8 DO
    OUTPUT "Password too short, enter again"
    INPUT Password
ENDWHILE

OUTPUT "Enter your surname"
INPUT Surname
WHILE Surname = "" DO
    OUTPUT "Surname must not be blank"
    INPUT Surname
ENDWHILE
```

A **type check** for a whole number can compare the value with its rounded value: if `Quantity <> ROUND(Quantity, 0)` the number has a fractional part and is rejected.

A **format check** examines each character. This checks a code of two upper-case letters followed by four digits:

```
Valid ← TRUE
IF LENGTH(Code) <> 6
    THEN
        Valid ← FALSE
    ELSE
        FOR Position ← 1 TO 6
            Character ← SUBSTRING(Code, Position, 1)
            IF Position <= 2
                THEN
                    IF Character < "A" OR Character > "Z"
                        THEN
                            Valid ← FALSE
                    ENDIF
                ELSE
                    IF Character < "0" OR Character > "9"
                        THEN
                            Valid ← FALSE
                    ENDIF
            ENDIF
        NEXT Position
ENDIF
```

## Check digits

A check digit is calculated from the other digits when the number is created. When the number is typed or scanned, the computer recalculates the check digit and compares it with the one entered. If they differ, the number is rejected. Check digits detect most single-digit errors and many **transposition** errors (two digits swapped).

For a 13-digit ISBN, each of the first 12 digits is multiplied alternately by 1 and 3, the products are added, and the check digit is the number that must be added to make the total a multiple of 10.

:::worked-solution[Calculating an ISBN-13 check digit]
Find the check digit for the fictional ISBN 978-1-77906-412-?.

| Digit | 9 | 7 | 8 | 1 | 7 | 7 | 9 | 0 | 6 | 4 | 1 | 2 |
|:--|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Weight | 1 | 3 | 1 | 3 | 1 | 3 | 1 | 3 | 1 | 3 | 1 | 3 |
| Product | 9 | 21 | 8 | 3 | 7 | 21 | 9 | 0 | 6 | 12 | 1 | 6 |

1. Add the products: 9 + 21 + 8 + 3 + 7 + 21 + 9 + 0 + 6 + 12 + 1 + 6 = 103.
2. 103 MOD 10 = 3.
3. Check digit = 10 − 3 = 7, so the full ISBN ends in 7.
4. If a clerk swaps the 0 and the 6 when typing, the products total 115, which needs a check digit of 5, not 7. The computer sees the mismatch and rejects the number.
:::

## Verification checks

| Check | How it works | Strength and weakness |
|:--|:--|:--|
| Visual check | The user compares the data on screen with the source document, or the program displays the data and asks the user to confirm it | Quick and cheap, but the user may miss errors |
| Double entry | The data is entered twice (often by two people, or twice by the same person) and the computer compares the two entries; it is accepted only if they match | Catches most typing errors, but takes twice as long; the same error made twice is not detected |

Double entry is used when you create a new password: you type it twice, because you cannot see what you typed.

```
REPEAT
    OUTPUT "Enter new password"
    INPUT Password1
    OUTPUT "Enter the password again"
    INPUT Password2
    IF Password1 <> Password2
        THEN
            OUTPUT "Passwords do not match"
    ENDIF
UNTIL Password1 = Password2
OUTPUT "Password saved"
```

A visual check can also be written as an algorithm:

```
REPEAT
    INPUT PhoneNumber
    OUTPUT "You entered ", PhoneNumber, ". Is this correct? (Y/N)"
    INPUT Answer
UNTIL Answer = "Y"
```

:::example{title="Choosing checks for a form"}
A clinic in Bulawayo registers patients. Suitable checks:

- **Surname**: presence check (must not be blank).
- **Age**: type check (whole number) and range check (0 to 120).
- **Phone number**: length check (exactly 10 digits) and visual check on screen.
- **Patient code** such as `BY2207`: format check (two letters, four digits).
- **Medical aid number**: check digit, because it is long and easily mistyped.
:::

## Common mistakes

:::mistake{title="Saying validation makes data correct"}
Validation only shows data is **sensible**. A wrong value inside the allowed range still passes. Say "reasonable" or "allowed", never "correct".
:::

:::mistake{title="Calling double entry a validation check"}
Double entry and visual checks are **verification**: they compare the data with the original. Range, length, type, presence, format and check digit are **validation**.
:::

:::mistake{title="Using IF instead of a loop"}
An `IF` statement checks the input once. If the user enters invalid data a second time it is accepted. Use a loop so the input is repeated until it is valid.
:::

## Exam tips

:::exam-tip
When asked to "write an algorithm to validate", include: a prompt, the `INPUT`, a loop, the correct condition with the right boundaries (`>=` and `<=`), an error message, and re-input inside the loop.
:::

:::exam-tip
When naming a check, link it to the field: "a range check on the age, so only values from 11 to 20 are accepted". A bare name may not score.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine validation and verification. Cambridge 0478 expects you to write the pseudocode for each check and to know ISBNs and bar codes as check-digit examples. ZIMSEC Form 3 asks you to verify and validate data, usually in a scenario about a form or a database.
:::

## Summary

:::summary
- Validation is an automatic check that data is reasonable; verification checks it matches the original.
- Validation checks: range, length, type, presence, format and check digit. They cannot prove data is correct.
- Verification checks: visual check and double entry.
- Validation algorithms repeat the input in a loop, with an error message, until the data is valid.
- A check digit is recalculated from the other digits on entry; a mismatch shows a typing or transposition error.
:::
