---
{
  "key": "prog.operators",
  "title": "Operators and library routines",
  "summary": "Arithmetic operators including DIV and MOD, relational operators that produce TRUE or FALSE, the logical operators AND, OR and NOT, the order in which operators are applied, and the library routines ROUND and RANDOM.",
  "concepts": ["comp.prog.operators"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A sports teacher in Bulawayo has 53 learners to put into teams of 6 for a netball tournament. How many full teams can she make, and how many learners are left over? A taxi rank program must decide whether a passenger qualifies for a student fare: are they under 19 **and** carrying a school ID? A quiz app needs a random question number each time it runs.

Each of these jobs is done with **operators**: symbols and keywords that combine values to produce a new value. Programs use arithmetic operators to calculate, relational operators to compare, and logical operators to combine comparisons into conditions. Cambridge 0478 also expects you to use the library routines `DIV`, `MOD`, `ROUND` and `RANDOM`. Questions on this topic ask you to evaluate expressions, complete conditions and choose the right operator, so precise working matters.

## Key definitions

:::definition{term="Operator"}
A symbol or keyword that carries out an operation on one or more values (operands) to produce a result, for example `+`, `>=` or `AND`.
:::

:::definition{term="Relational operator"}
An operator that compares two values and gives a Boolean result, TRUE or FALSE: `=`, `<`, `<=`, `>`, `>=`, `<>`.
:::

:::definition{term="Logical operator"}
An operator that combines or reverses Boolean values: `AND`, `OR` and `NOT`.
:::

:::definition{term="Library routine"}
A ready-made, tested subroutine supplied with a language, such as `ROUND` or `RANDOM`, that a programmer can call instead of writing the code.
:::

## Arithmetic operators

| Operator | Meaning | Example | Result |
|:-:|:--|:-:|:-:|
| `+` | addition | `17 + 4` | 21 |
| `-` | subtraction | `17 - 4` | 13 |
| `*` | multiplication | `17 * 4` | 68 |
| `/` | division | `17 / 4` | 4.25 |
| `^` | raised to the power of | `2 ^ 5` | 32 |
| `DIV` | whole-number quotient | `DIV(17, 4)` | 4 |
| `MOD` | remainder | `MOD(17, 4)` | 1 |

Notice that `/` gives a REAL result, even when both values are integers. `DIV` throws away the fractional part and `MOD` gives what is left over: 17 is 4 lots of 4, remainder 1. In 0478 pseudocode both are written as functions with two integer values in brackets.

### Uses of DIV and MOD

- **Grouping**: 53 learners in teams of 6 make `DIV(53, 6)` full teams, with `MOD(53, 6)` learners left over.
- **Odd or even**: a number is even when `MOD(Number, 2) = 0`.
- **Every n-th item**: `MOD(Count, 10) = 0` is TRUE on the 10th, 20th, 30th … pass of a loop.
- **Splitting a number into digits**: `MOD(Number, 10)` is the units digit and `DIV(Number, 10)` removes it.

:::worked-solution[Converting seconds into minutes and seconds]
A stopwatch app records 437 seconds. Convert it into minutes and seconds.

```
TotalSeconds ← 437
Minutes ← DIV(TotalSeconds, 60)
Seconds ← MOD(TotalSeconds, 60)
OUTPUT Minutes, " min ", Seconds, " s"
```

1. `DIV(437, 60)`: 60 goes into 437 seven whole times (7 × 60 = 420), so `Minutes` is 7.
2. `MOD(437, 60)`: the remainder is 437 − 420 = 17, so `Seconds` is 17.
3. The output is `7 min 17 s`.

The same pattern converts minutes to hours (divide by 60) or days to weeks (divide by 7).
:::

## Order of operations

When an expression has several operators, the computer follows the normal rules of mathematics:

1. brackets first;
2. then powers (`^`);
3. then multiplication and division (`*`, `/`), working left to right;
4. then addition and subtraction (`+`, `-`), working left to right.

So `3 + 4 * 2 ^ 2` is 3 + 4 × 4 = 19, but `(3 + 4) * 2 ^ 2` is 7 × 4 = 28. An average of two marks must be written `(Mark1 + Mark2) / 2`; without the brackets only `Mark2` is halved. Use brackets whenever the order could be misread: they never cost marks and they make your intention clear.

## Relational operators

| Operator | Meaning | `Mark` = 64 | Result |
|:-:|:--|:-:|:-:|
| `=` | equal to | `Mark = 64` | TRUE |
| `<>` | not equal to | `Mark <> 64` | FALSE |
| `<` | less than | `Mark < 50` | FALSE |
| `<=` | less than or equal to | `Mark <= 64` | TRUE |
| `>` | greater than | `Mark > 70` | FALSE |
| `>=` | greater than or equal to | `Mark >= 50` | TRUE |

A comparison always produces a BOOLEAN value, so it can be stored: `HasPassed ← Mark >= 50`. Take care at the boundaries: "50 or more" is `>= 50`, but "more than 50" is `> 50`.

## Logical operators

`AND` is TRUE only when both conditions are TRUE; `OR` is TRUE when at least one is TRUE; `NOT` reverses a value. With 1 for TRUE and 0 for FALSE:

| A | B | A AND B | A OR B | NOT A |
|:-:|:-:|:-:|:-:|:-:|
| 0 | 0 | 0 | 0 | 1 |
| 0 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 | 0 |

A **range check** uses AND, because the value must satisfy both limits: `Mark >= 0 AND Mark <= 100`. The opposite, "out of range", uses OR: `Mark < 0 OR Mark > 100`. Each side of AND or OR must be a complete comparison; `Mark >= 0 AND <= 100` is not valid.

:::example{title="Building conditions for a student fare"}
A bus company gives a student fare to passengers under 19 who show a school ID, and a free ride to children under 5.

- Student fare: `Age < 19 AND HasSchoolID`
- Free ride: `Age < 5`
- Full fare: `Age >= 19 OR NOT HasSchoolID` (and not a free ride)

For Thandeka, aged 16 with no ID: `Age < 19` is TRUE but `HasSchoolID` is FALSE, so the student fare condition is FALSE and the full-fare condition is TRUE. Use brackets, such as `(Age < 19) AND (NOT HasSchoolID)`, when you mix operators.
:::

## The library routines ROUND and RANDOM

`ROUND(Value, Places)` returns `Value` rounded to the given number of decimal places: `ROUND(3.14159, 2)` returns 3.14 and `ROUND(7.6, 0)` returns 8.

`RANDOM()` returns a random real number from 0 to 1 inclusive. Multiply and round it to get whole numbers in a range: `ROUND(RANDOM() * 6, 0)` gives a whole number from 0 to 6, and `ROUND(RANDOM() * 5, 0) + 1` gives a whole number from 1 to 6, like a dice roll.

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC Form 1 asks learners to apply arithmetic, relational and logical operators to solve problems, and learners meet them in Visual Basic or Python as well as pseudocode. Python writes integer division as `//`, the remainder as `%` and powers as `**`; Visual Basic uses `\` and `Mod`. Cambridge 0478 uses the pseudocode forms in this lesson and also names `ROUND` and `RANDOM` as library routines.
:::

## Common mistakes

:::mistake{title="Mixing up DIV and MOD"}
`DIV` gives how many whole times one number goes into another; `MOD` gives the remainder. `DIV(20, 3)` is 6 and `MOD(20, 3)` is 2.
:::

:::mistake{title="Leaving out brackets in an average"}
`Mark1 + Mark2 / 2` adds `Mark1` to half of `Mark2`. Write `(Mark1 + Mark2) / 2`.
:::

:::mistake{title="Incomplete conditions"}
`IF Age > 12 AND < 20` is wrong: both sides of `AND` need a full comparison, `Age > 12 AND Age < 20`.
:::

:::mistake{title="Using AND where OR is needed"}
"Reject the mark if it is below 0 or above 100" needs OR. `Mark < 0 AND Mark > 100` can never be TRUE.
:::

## Exam tips

:::exam-tip
When asked to evaluate an expression, show the order you used (brackets, powers, multiply and divide, add and subtract). A single slip in order is the most common reason for losing the mark.
:::

:::exam-tip
Read boundary words carefully: "at least", "no more than", "between … inclusive". Translate each into `>=`, `<=` or `>`/`<` before you write the condition.
:::

## Summary

:::summary
- Arithmetic: `+ - * / ^`, with `DIV(a, b)` for the whole-number quotient and `MOD(a, b)` for the remainder.
- Order: brackets, powers, multiply and divide, add and subtract; use brackets to make your meaning clear.
- Relational operators `= <> < <= > >=` compare values and give TRUE or FALSE.
- `AND` needs both conditions TRUE, `OR` needs at least one, `NOT` reverses; a range check uses AND.
- `ROUND(x, n)` rounds to n decimal places; `RANDOM()` gives a real number from 0 to 1 inclusive.
:::
