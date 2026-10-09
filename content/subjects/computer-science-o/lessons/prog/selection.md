---
{
  "key": "prog.selection",
  "title": "Selection with IF and CASE statements",
  "summary": "How programs make decisions: IF statements with and without ELSE, nested IF statements, CASE statements with OTHERWISE, the order in which conditions are tested, and how to choose between IF and CASE.",
  "concepts": ["comp.prog.selection"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

When you dial a mobile money menu, the phone shows a list of choices: check balance, buy airtime, send money. Whatever key you press, the system runs a different piece of code. When a teacher's spreadsheet turns a mark into "Distinction", "Pass" or "Fail", it is making the same kind of decision. A program that always ran exactly the same statements in the same order could not do either job.

**Selection** is the construct that lets a program choose which statements to run, depending on a condition. Together with sequence and iteration it is one of the three building blocks of every algorithm. Both ZIMSEC and Cambridge expect you to write IF and CASE statements in pseudocode, to dry-run them with test values and to explain why one form suits a problem better than another.

## Key definitions

:::definition{term="Selection"}
A programming construct in which a condition is tested and the result decides which statements, if any, are executed next.
:::

:::definition{term="Condition"}
An expression that evaluates to TRUE or FALSE, such as `Mark >= 50` or `Choice = 'Y' AND Paid`.
:::

:::definition{term="Nested selection"}
An IF or CASE statement placed inside a branch of another IF or CASE statement, so that a second decision is made only after the first.
:::

:::definition{term="CASE statement"}
A selection statement that compares one variable with a list of values and runs the statement for the first value that matches; an OTHERWISE clause runs if none match.
:::

## IF statements

The simplest IF runs some statements only when the condition is TRUE, and does nothing otherwise:

```
IF Temperature > 30
    THEN
        OUTPUT "Drink plenty of water"
ENDIF
```

With an ELSE clause, exactly one of two branches always runs:

```
IF Mark >= 50
    THEN
        OUTPUT "Pass"
    ELSE
        OUTPUT "Fail"
ENDIF
```

Notice the layout used in 0478 pseudocode: THEN and ELSE on their own lines, indented, and the statements in each branch indented further. Every IF must be closed with ENDIF. The condition can combine comparisons with AND, OR and NOT, for example `IF Age >= 18 AND HasLicence`.

## Nested IF statements

When there are more than two outcomes, place a second IF inside the ELSE branch of the first. Each condition is only tested if the earlier ones were FALSE.

:::worked-solution[Grading marks with a nested IF]
A school in Gweru awards "Distinction" for 75 or more, "Pass" for 50 to 74 and "Fail" below 50.

```
INPUT Mark
IF Mark >= 75
    THEN
        OUTPUT "Distinction"
    ELSE
        IF Mark >= 50
            THEN
                OUTPUT "Pass"
            ELSE
                OUTPUT "Fail"
        ENDIF
ENDIF
```

Dry run with four marks:

| Mark | Mark >= 75? | Mark >= 50? | Output |
|:-:|:-:|:-:|:-:|
| 82 | TRUE | (not tested) | Distinction |
| 61 | FALSE | TRUE | Pass |
| 50 | FALSE | TRUE | Pass |
| 49 | FALSE | FALSE | Fail |

1. For 82 the first condition is TRUE, so "Distinction" is output and the inner IF is skipped.
2. For 61 and 50 the first condition is FALSE, so the inner IF is tested; both are at least 50.
3. 50 and 49 are **boundary** values: they check that `>=` rather than `>` was used.
:::

### The order of the conditions matters

If the test for 50 came first, every mark of 50 or more would stop at "Pass", and nobody would ever receive a distinction:

| Mark | Correct order | Wrong order |
|:-:|:-:|:-:|
| 82 | Distinction | Pass |
| 61 | Pass | Pass |

With nested IFs that test "at least", start with the **highest** boundary. Alternatively, write each condition as a complete range, such as `Mark >= 50 AND Mark < 75`, so the order no longer matters.

Separate IF statements (one after another, not nested) are a different thing: **every** one is tested. Use them when several outcomes can all apply, for example "free delivery" and "loyalty points" for the same order. Use nesting or ELSE when only one outcome may apply.

## CASE statements

When one variable is compared with several single values, a CASE statement is shorter and clearer than a chain of nested IFs:

```
INPUT Choice
CASE OF Choice
    'B' : OUTPUT "Balance"
    'T' : OUTPUT "Top up"
    'S' : OUTPUT "Send money"
    OTHERWISE OUTPUT "Invalid choice"
ENDCASE
```

The cases are checked in order; the statement for the first matching value runs, and control then jumps to the line after ENDCASE. OTHERWISE must be the last clause and catches every value not listed, which makes it ideal for an error message.

:::worked-solution[Dry run of the menu]
| Choice | Output |
|:-:|:-:|
| 'T' | Top up |
| 'S' | Send money |
| 'X' | Invalid choice |

1. `'T'` does not match `'B'`, matches `'T'`, so "Top up" is output and the remaining cases are not tested.
2. `'X'` matches none of the listed values, so the OTHERWISE clause runs.
3. Choices are compared exactly: a lower-case `'t'` would also reach OTHERWISE unless the program converts it with `UCASE` first.
:::

## Choosing between IF and CASE

| Use IF when … | Use CASE when … |
|:--|:--|
| the condition is a range, such as `Mark >= 50` | one variable is compared with a list of single values |
| conditions involve different variables | there are many possible values, such as menu options |
| conditions are combined with AND or OR | you want an OTHERWISE branch for every other value |

The 0478 pseudocode guide recommends single values in each case and an IF statement when the cases are more complex. Programming languages differ: Visual Basic's `Select Case` accepts ranges, and Python uses `if`, `elif` and `else`.

:::example{title="Choosing the structure for a delivery charge"}
A shop in Bulawayo charges delivery by zone: zone 1 costs 2 dollars, zone 2 costs 5 dollars, zone 3 costs 8 dollars, and any other zone is "not served". Orders worth 100 dollars or more are delivered free in any served zone.

- The zone is one variable with a few single values, so a CASE statement sets the charge, with OTHERWISE for "not served".
- The free-delivery rule is a range test on a different variable, so an IF statement follows the CASE.

```
CASE OF Zone
    1 : Charge ← 2
    2 : Charge ← 5
    3 : Charge ← 8
    OTHERWISE Charge ← -1
ENDCASE
IF Charge = -1
    THEN
        OUTPUT "Zone not served"
    ELSE
        IF OrderValue >= 100
            THEN
                Charge ← 0
        ENDIF
        OUTPUT "Delivery charge: ", Charge
ENDIF
```
:::

## Common mistakes

:::mistake{title="Testing the lower boundary first"}
In a nested IF using `>=`, testing `Mark >= 50` before `Mark >= 75` sends every high mark to the "Pass" branch. Start with the highest boundary.
:::

:::mistake{title="Forgetting ENDIF or ENDCASE"}
Every IF needs its own ENDIF and every CASE needs ENDCASE. In nested IFs, count them: two IFs need two ENDIFs.
:::

:::mistake{title="Putting ranges in a CASE statement"}
In 0478 pseudocode each case is a single value. A grade boundary such as "50 to 74" belongs in an IF statement.
:::

:::mistake{title="Using separate IFs when only one outcome should happen"}
Three separate IFs for Distinction, Pass and Fail can output two grades for one mark. Use ELSE so that only one branch runs.
:::

## Exam tips

:::exam-tip
When you dry-run selection, use test values on and either side of each boundary (49, 50, 74, 75). Examiners choose exactly these values to see whether you notice `>` and `>=`.
:::

:::exam-tip
If a question says "use a CASE statement", use one even if IF would work, and include OTHERWISE when invalid input is possible. When asked to *explain* a choice, mention single values versus ranges.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC Form 2 asks learners to explain the selection and repetition constructs and to dry-run algorithms that use them, and to develop programs with them in a language such as Visual Basic or Python. Cambridge 0478 asks for IF (with and without ELSE), nested IF up to three levels and CASE with OTHERWISE, written in its pseudocode.
:::

## Summary

:::summary
- Selection runs different statements depending on a condition that is TRUE or FALSE.
- `IF … THEN … ENDIF` may run nothing; `IF … THEN … ELSE … ENDIF` always runs exactly one branch.
- Nested IFs handle more than two outcomes; with `>=` tests, check the highest boundary first.
- `CASE OF … OTHERWISE … ENDCASE` compares one variable with single values; the first match runs, OTHERWISE catches the rest.
- Use IF for ranges and combined conditions, CASE for a list of single values such as menu choices.
:::
