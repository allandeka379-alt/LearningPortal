---
{
  "key": "algorithms.trace-tables",
  "title": "Trace tables and dry runs",
  "summary": "How to dry-run an algorithm by hand, recording every change to the variables, the outputs and the user prompts in a trace table; and how to use a completed trace to find the purpose of an algorithm or an error in it.",
  "concepts": ["comp.algorithms.trace-tables"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Before a new kombi route opens, an inspector rides it once with an empty vehicle, noting every stop and checking that the timetable works. Programmers do the same with algorithms: before trusting an algorithm, they **dry-run** it, playing the part of the computer and following every line with real values.

A **trace table** is the record of a dry run. Trace tables appear in almost every Cambridge Paper 2 and in ZIMSEC Paper 2: you may be asked to complete a trace table, to state the output, to say what the algorithm does, or to use the trace to find an error. These are some of the most reliable marks on the paper if you work carefully.

## Key definitions

:::definition{term="Dry run"}
Working through an algorithm by hand, one statement at a time, with chosen input data, to see what it does without running it on a computer.
:::

:::definition{term="Trace table"}
A table with one column for each variable (and for the output) in which a dry run is recorded, showing every value each variable takes in the order the values change.
:::

## Setting up a trace table

1. Make one column for each variable in the order the question gives (or in the order they first appear), and a column headed **OUTPUT**. Cambridge also expects **user prompts** (text output before an `INPUT`) in the OUTPUT column.
2. Write any starting values in the first row.
3. Work through the algorithm one line at a time. Each time a variable **changes**, write its new value in its column. Move down to a new row when the loop goes round again or when a value would otherwise be overwritten in the same cell.
4. Leave a cell blank if the value did not change; you never need to copy unchanged values down.
5. When the algorithm outputs something, write exactly what is displayed, including any text.

For a condition, work it out with the current values and write nothing in the table, but let the result decide which line you go to next.

:::worked-solution[A REPEAT loop with prompts]
Dry-run this algorithm with the inputs 4, -2, 5, 3.

```
Count ← 0
Product ← 1
REPEAT
    OUTPUT "Enter a number"
    INPUT Number
    IF Number > 0
        THEN
            Product ← Product * Number
            Count ← Count + 1
    ENDIF
UNTIL Count = 3
OUTPUT "Result: ", Product
```

| Count | Product | Number | OUTPUT |
|:-:|:-:|:-:|:-:|
| 0 | 1 |  |  |
|  |  |  | Enter a number |
| 1 | 4 | 4 |  |
|  |  |  | Enter a number |
|  |  | -2 |  |
|  |  |  | Enter a number |
| 2 | 20 | 5 |  |
|  |  |  | Enter a number |
| 3 | 60 | 3 |  |
|  |  |  | Result: 60 |

1. The starting values 0 and 1 go in the first row.
2. Each pass begins with the prompt, which goes in the OUTPUT column.
3. -2 is not greater than 0, so neither `Product` nor `Count` changes on that pass.
4. After the input 3, `Count` is 3 and the `UNTIL` condition is true, so the loop stops and the result is output with its text.
5. Purpose: to multiply together the first three positive numbers entered.
:::

## Tracing loops

Loops are where most mistakes happen. Keep these rules in mind:

- `FOR Index ← 2 TO 5` runs with `Index` = 2, 3, 4 and 5: four passes. The loop variable takes the end value on the last pass.
- A `WHILE` loop tests its condition **before** each pass, so it may run zero times.
- A `REPEAT … UNTIL` loop tests **after** each pass, so it always runs at least once, and it stops when the condition becomes **true**.
- Count the passes as you go and check them at the end: if a loop should process five values, your table should show five passes.

## Using a trace to find the purpose

If you are asked what an algorithm does, a trace with simple data usually makes it obvious.

:::worked-solution[What does this algorithm do?]
The array `Values` holds 7, 3, 9, 2, 6 in positions 1 to 5.

```
Position ← 1
FOR Index ← 2 TO 5
    IF Values[Index] < Values[Position]
        THEN
            Position ← Index
    ENDIF
NEXT Index
OUTPUT Position
```

| Index | Position | OUTPUT |
|:-:|:-:|:-:|
|  | 1 |  |
| 2 | 2 |  |
| 3 |  |  |
| 4 | 4 |  |
| 5 |  |  |
|  |  | 4 |

1. `Index` = 2: `Values[2]` = 3 is less than `Values[1]` = 7, so `Position` becomes 2.
2. `Index` = 3: 9 is not less than 3; no change.
3. `Index` = 4: 2 is less than 3, so `Position` becomes 4.
4. `Index` = 5: 6 is not less than 2; no change.
5. The output is 4, the position of 2, the smallest value. Purpose: **to find and output the position of the smallest value in the array**.
:::

## Using a trace to find an error

A trace that gives an unexpected result shows that the algorithm has a **logic error**. Comparing what happened with what should have happened points to the faulty line.

:::example{title="An off-by-one error"}
Tendai's algorithm should output the total of the whole numbers 1 to 5, which is 15.

```
Total ← 0
Counter ← 1
WHILE Counter < 5 DO
    Total ← Total + Counter
    Counter ← Counter + 1
ENDWHILE
OUTPUT Total
```

| Counter | Total | OUTPUT |
|:-:|:-:|:-:|
| 1 | 0 |  |
| 2 | 1 |  |
| 3 | 3 |  |
| 4 | 6 |  |
| 5 | 10 |  |
|  |  | 10 |

The trace shows that when `Counter` reaches 5 the condition `5 < 5` is false, so 5 is never added and the output is 10. The correction is `WHILE Counter <= 5 DO`.
:::

## Common mistakes

:::mistake{title="Copying values that did not change"}
Writing the same value again and again in every row makes the table harder to read and can confuse the order of events. Only record a value when it changes (the mark scheme follows this convention).
:::

:::mistake{title="Leaving out the prompts and text"}
If the algorithm outputs `"Result: ", Product`, the OUTPUT cell must show `Result: 60`, not just 60. Cambridge also awards marks for the prompts that come before each input.
:::

:::mistake{title="Stopping a REPEAT loop at the wrong time"}
`REPEAT … UNTIL Count = 3` keeps going while the condition is **false** and stops when it becomes **true**. Students often stop one pass early or late. Check the condition after every pass.
:::

## Exam tips

:::exam-tip
Use the columns in the order the question gives them, and move down one row at a time. Do not squeeze two values for the same variable into one cell.
:::

:::exam-tip
When asked for the purpose after a trace, describe the **job**, such as "finds the position of the smallest value", not the lines of code.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC introduces dry runs in Form 1 with sequence algorithms and uses trace tables for selection and loops in Forms 2 and 3. Cambridge 0478 expects the trace table to show, at each step, the variables, the outputs and the user prompts.
:::

## Summary

:::summary
- A dry run follows an algorithm by hand with test data; a trace table records it.
- One column per variable plus OUTPUT; record a value only when it changes; include prompts and output text.
- `FOR` loops include the end value; `WHILE` tests before each pass; `REPEAT … UNTIL` tests after and stops when the condition is true.
- A trace with simple data reveals the purpose of an algorithm.
- An unexpected result in a trace shows a logic error and where to correct it.
:::
