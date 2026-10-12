---
{
  "key": "algo.trace-tables",
  "title": "Dry runs, trace tables and finding errors in algorithms",
  "summary": "Dry running an algorithm with a trace table, choosing test data, stating the purpose of an algorithm from its trace, finding and correcting logic errors in pseudocode and tracing nested loops.",
  "concepts": ["acs.algo.trace-tables"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

A programmer at a Bulawayo bank writes an algorithm to add up the digits of an account number, as part of a check. It looks right, but how can the programmer be sure before running it on a real system? One way is to be the computer: follow the algorithm by hand with some test data, writing down the value of every variable after each step. This is a **dry run**, and the table in which the values are recorded is a **trace table**.

Dry runs are used to check that an algorithm works, to work out what an unfamiliar algorithm does and to find the line where a logic error happens. Every trace table in this lesson was produced by running a program that mirrors the pseudocode, so each value is the one a correct dry run gives. You should already know sequence, selection and iteration, and the pseudocode style of the previous lesson.

## Key definitions

:::definition{term="Dry run"}
Following an algorithm by hand, statement by statement, with chosen test data, recording the value of each variable and each output without running the algorithm on a computer.
:::

:::definition{term="Trace table"}
A table with one column for each variable and one for the output, in which a new row is written each time a value changes. It shows how the values develop during a dry run.
:::

:::definition{term="Logic error"}
An error in the design of an algorithm that lets it run but gives a wrong result, such as using the wrong comparison operator or starting a total at the wrong value.
:::

:::definition{term="Test data"}
Values chosen to try an algorithm. Normal data is expected and valid, boundary data is at the limit of what is allowed, and abnormal data should be rejected.
:::

## Building a trace table

1. List every variable (and array element used) as a column heading, then a column for `OUTPUT`.
2. Write the starting values in the first row.
3. Follow the statements in order. Each time a variable is assigned a new value, write it in the row for that step; leave a cell blank if the value has not changed.
4. For a loop, write one row per pass, starting a new row each time the loop body runs.
5. Write each `OUTPUT` value in the output column at the point it is produced.

Take care with `DIV(x, y)` (whole-number division, ignoring the remainder) and `MOD(x, y)` (the remainder), which the pseudocode guide writes as functions: `MOD(2764, 10)` is 4 and `DIV(2764, 10)` is 276.

:::worked-solution{title="Dry run of a digit-sum algorithm"}
This algorithm uses `MOD` and `DIV` to take the digits of a number one at a time:

```
Number ← 2764
Total ← 0
WHILE Number > 0 DO
    Digit ← MOD(Number, 10)
    Total ← Total + Digit
    Number ← DIV(Number, 10)
ENDWHILE
OUTPUT Total
```

Dry run with the number 2764. A cell is left blank when its value has not changed.

| Number | Total | Digit | OUTPUT |
|:-:|:-:|:-:|:-:|
| 2764 | 0 |  |  |
| 276 | 4 | 4 |  |
| 27 | 10 | 6 |  |
| 2 | 17 | 7 |  |
| 0 | 19 | 2 |  |
|  |  |  | 19 |

The digit is taken from the right-hand end each time (4, 6, 7, 2) and added to `Total`; the number loses its last digit. When `Number` reaches 0 the condition `Number > 0` is false and the loop ends. The output is **19**, which is 4 + 6 + 7 + 2. The Python version, checked by running it, gives the same answer:

```python
number = 2764
total = 0
while number > 0:
    digit = number % 10
    total = total + digit
    number = number // 10
print(total)
```

The **purpose** of the algorithm is to output the sum of the digits of the number.
:::

## Stating the purpose of an algorithm

Questions often ask "state the purpose". Trace the algorithm with one or two sets of simple data, look at what the output is related to the input, and describe it in one sentence using the context of the problem ("outputs the sum of the digits of the number entered"). Do not describe the individual steps; describe the overall result.

## Choosing test data

A good set of test data tries each path through the algorithm. For the digit-sum algorithm, a table of tests with expected results worked out in advance:

| Number entered | Type of test | Expected Total |
|:-:|:-:|:-:|
| 2764 | normal | 19 |
| 5 | boundary: one digit | 5 |
| 0 | boundary: loop never runs | 0 |
| 10 | ends in zero | 1 |

Normal data checks the usual case. The boundary tests check a one-digit number and the number 0, where the loop body never runs. The expected result is worked out before the dry run, so that the trace can be compared with it.

## Finding and correcting a logic error

To find an error, dry run with data for which the correct answer is known and look for the row where the trace first goes wrong.

:::worked-solution{title="Finding the error in a largest-value algorithm"}
The algorithm should output the largest of four values stored in the array `Value`, but a tester says it gives the wrong result. The array holds 12, 31, 7 and 25.

```
Largest ← Value[1]
FOR Index ← 2 TO 4
    IF Value[Index] < Largest THEN
        Largest ← Value[Index]
    ENDIF
NEXT Index
OUTPUT Largest
```

Dry run:

| Index | Value[Index] | Largest | OUTPUT |
|:-:|:-:|:-:|:-:|
|  |  | 12 |  |
| 2 | 31 |  |  |
| 3 | 7 | 7 |  |
| 4 | 25 |  |  |
|  |  |  | 7 |

The correct answer is 31, but the output is 7. In the row for `Index` 2 the value 31 is larger than `Largest` (12), yet `Largest` was not changed, because the condition `Value[Index] < Largest` is true only for a *smaller* value. At `Index` 3, the value 7 replaced it. The algorithm finds the **smallest** value. The error is in the comparison operator; the correction is to use `>`:

```
Largest ← Value[1]
FOR Index ← 2 TO 4
    IF Value[Index] > Largest THEN
        Largest ← Value[Index]
    ENDIF
NEXT Index
OUTPUT Largest
```

Dry run of the corrected algorithm with the same data:

| Index | Value[Index] | Largest | OUTPUT |
|:-:|:-:|:-:|:-:|
|  |  | 12 |  |
| 2 | 31 | 31 |  |
| 3 | 7 |  |  |
| 4 | 25 |  |  |
|  |  |  | 31 |

The output is now **31**, which is correct.
:::

Other common logic errors found in these questions are a total not set to 0 before a loop, a loop that runs one time too few or too many (`FOR Index ← 1 TO 9` for ten items), a counter updated outside the `IF` that should control it, and the wrong variable output.

## Nested loops

When a loop is inside another loop, the inner loop runs completely for each pass of the outer loop. A trace table with a column for each loop variable shows this clearly.

:::worked-solution{title="Tracing nested loops"}
```
FOR Row ← 1 TO 3
    FOR Col ← 1 TO 2
        OUTPUT Row * Col
    NEXT Col
NEXT Row
```

The outer loop variable `Row` takes the values 1, 2 and 3. For each of them the inner loop variable `Col` takes the values 1 and 2, so the output statement runs 3 × 2 = 6 times.

| Row | Col | OUTPUT |
|:-:|:-:|:-:|
| 1 | 1 | 1 |
|  | 2 | 2 |
| 2 | 1 | 2 |
|  | 2 | 4 |
| 3 | 1 | 3 |
|  | 2 | 6 |

The outputs, in order, are 1, 2, 2, 4, 3, 6. The inner variable `Col` is reset to 1 each time the outer variable changes.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect trace tables, dry runs, stating the purpose of an algorithm and locating and correcting errors (ZIMSEC Form 5; Cambridge AS Level, Paper 2). Cambridge Paper 2 often gives a trace table with some cells already filled. Nested loops of up to three levels may be traced.
:::

## Common mistakes

:::mistake{title="Tracing what the algorithm should do"}
A dry run must follow what the pseudocode says, even if that is wrong. Tracing the intended result hides the error.
:::

:::mistake{title="Starting a new row at the wrong time"}
Write a new row each time the loop body runs or a value changes. Putting several passes of a loop in one row loses the order of events.
:::

:::mistake{title="Mixing up DIV and MOD"}
`DIV` gives the whole-number quotient and `MOD` the remainder: `DIV(17, 5)` is 3 and `MOD(17, 5)` is 2.
:::

:::mistake{title="Describing the steps instead of the purpose"}
"It divides by 10 each time" is a step. "It outputs the sum of the digits" is the purpose.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 1 and Cambridge Papers 1 and 2 give an algorithm and ask you to **complete** a trace table, **state** the output or **state the purpose**. Copy the column headings exactly, work one row per change, and check the last row against the output. Always follow the code literally.
:::

:::exam-tip
To **identify an error**, quote the line (or give its number) and say what is wrong with it; to **correct** it, write the replacement line. One correct line is worth more than a description of the whole algorithm.
:::

## Summary

:::summary
- A dry run follows an algorithm by hand with test data; a trace table records each variable and the output as a row for every change.
- Follow the code exactly, using `DIV` for whole-number division and `MOD` for the remainder.
- The purpose of an algorithm is its overall result, stated in the context of the problem.
- Test data should include normal and boundary cases, with the expected results worked out first.
- Logic errors are found by comparing the trace with the correct result; typical errors are a wrong operator, a total not initialised and an off-by-one loop limit.
:::
