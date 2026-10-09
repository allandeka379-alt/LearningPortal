---
{
  "key": "prog.iteration",
  "title": "Iteration with FOR, WHILE and REPEAT loops",
  "summary": "Count-controlled FOR loops with STEP, pre-condition WHILE loops and post-condition REPEAT … UNTIL loops: how each one works, how many times it runs, how to choose the right loop, and nested loops.",
  "concepts": ["comp.prog.iteration"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A cashier at a supermarket in Mutare scans item after item until the customer's basket is empty. A teacher enters the marks of exactly 40 learners. A cash machine asks for a PIN again and again until the right one is typed. Each of these is a job that repeats, and none of them would be practical if the programmer had to write the same statements forty times.

**Iteration** (repetition, or looping) runs a block of statements several times. There are three kinds of loop in pseudocode, and the skill examiners test most is choosing the right one: a **FOR** loop when you know how many times to repeat, a **WHILE** loop when the repetition may not be needed at all, and a **REPEAT … UNTIL** loop when the statements must run at least once. You will also trace loops with trace tables and write them inside the longer algorithms of Paper 2.

## Key definitions

:::definition{term="Iteration"}
Repeating a set of statements, either a fixed number of times or until a condition is met.
:::

:::definition{term="Count-controlled loop"}
A loop that repeats a known number of times, controlled by a counter variable that changes by a fixed step on each pass (a FOR loop).
:::

:::definition{term="Pre-condition loop"}
A loop whose condition is tested **before** each pass, so the statements may run zero times (a WHILE loop).
:::

:::definition{term="Post-condition loop"}
A loop whose condition is tested **after** each pass, so the statements always run at least once (a REPEAT … UNTIL loop).
:::

## Count-controlled loops: FOR

```
FOR Learner ← 1 TO 40
    OUTPUT "Enter mark for learner ", Learner
    INPUT Mark
NEXT Learner
```

The counter `Learner` takes each value from 1 to 40 in turn, so the body runs 40 times. The counter must be an integer, and you should not change it yourself inside the loop. If the start value is greater than the end value, the body does not run at all.

`STEP` changes the amount added each time; a negative step counts down. The loop stops once the counter would go past the end value.

:::worked-solution[A FOR loop with a negative step]
```
FOR Count ← 20 TO 2 STEP -6
    OUTPUT Count
NEXT Count
```

| Count | OUTPUT |
|:-:|:-:|
| 20 | 20 |
| 14 | 14 |
| 8 | 8 |
| 2 | 2 |

1. `Count` starts at 20 and 6 is subtracted on each pass: 20, 14, 8, 2.
2. The next value would be −4, which is past the end value 2, so the loop stops.
3. The body runs 4 times. For a step that does not land exactly on the end value, the last value output is the last one that has not passed the end.
:::

## Pre-condition loops: WHILE

```
OUTPUT "Enter a price (0 to finish)"
INPUT Price
WHILE Price <> 0 DO
    Total ← Total + Price
    OUTPUT "Enter a price (0 to finish)"
    INPUT Price
ENDWHILE
```

The condition is checked first. If the very first price is 0, the body never runs. While the condition is TRUE the body repeats; the loop ends when it becomes FALSE. Something inside the loop must change the condition (here, a new input), or the loop runs forever: an **infinite loop**.

:::worked-solution[Tracing a WHILE loop]
How many times must 1 be tripled to pass 100?

```
Number ← 1
Steps ← 0
WHILE Number < 100 DO
    Number ← Number * 3
    Steps ← Steps + 1
ENDWHILE
OUTPUT Steps, " steps"
```

| Number | Steps | OUTPUT |
|:-:|:-:|:-:|
| 1 | 0 |  |
| 3 | 1 |  |
| 9 | 2 |  |
| 27 | 3 |  |
| 81 | 4 |  |
| 243 | 5 |  |
|  |  | 5 steps |

1. Before each pass the condition `Number < 100` is tested: TRUE for 1, 3, 9, 27 and 81.
2. After the fifth pass `Number` is 243, the condition is FALSE and the loop ends.
3. A FOR loop could not be used here, because the number of passes is not known in advance.
:::

## Post-condition loops: REPEAT … UNTIL

```
REPEAT
    OUTPUT "Enter your age (5 to 18)"
    INPUT Age
UNTIL Age >= 5 AND Age <= 18
```

The body runs first and the condition is tested at the end. This is perfect for **validation**: the user must enter at least one value, and the loop repeats until a valid one is entered. Note that the loop stops when the condition becomes **TRUE**, the opposite of WHILE, which stops when its condition becomes FALSE.

## Choosing the right loop

| Loop | Condition tested | Minimum passes | Best for |
|:--|:--|:-:|:--|
| FOR … NEXT | (counter reaches end value) | 0 | a known number of repetitions, processing every array element |
| WHILE … ENDWHILE | before each pass | 0 | input ended by a rogue value; repeating while something is true |
| REPEAT … UNTIL | after each pass | 1 | validation; menus that must be shown at least once |

Any problem can be solved with a WHILE loop, but the best answer uses the loop that matches the problem. "Input the marks of 30 learners" is a FOR loop; "keep asking until the password is correct" is REPEAT … UNTIL.

## Nested loops

A loop can sit inside another loop. The inner loop runs completely for **every** pass of the outer loop, so the total number of passes is the product of the two counts.

:::example{title="Labelling seats in a hall"}
A school hall in Masvingo has 3 rows of 4 seats. The program outputs a label for every seat.

```
FOR Row ← 1 TO 3
    FOR Seat ← 1 TO 4
        OUTPUT "Row ", Row, " Seat ", Seat
    NEXT Seat
NEXT Row
```

The first lines are `Row 1 Seat 1`, `Row 1 Seat 2`, `Row 1 Seat 3`, `Row 1 Seat 4`, then `Row 2 Seat 1`. The inner loop restarts at 1 for each new row, and 3 × 4 = 12 lines are output in total. Cambridge allows nesting up to three levels, for example rows, seats and sessions.
:::

## Common mistakes

:::mistake{title="Off-by-one errors"}
`FOR Count ← 0 TO 10` runs 11 times, not 10. Check the first and last values, and count them.
:::

:::mistake{title="Forgetting the new input inside a WHILE loop"}
If the value tested by the condition never changes inside the loop, the loop never ends. Read the next value at the end of the body.
:::

:::mistake{title="Writing the REPEAT condition the wrong way round"}
`UNTIL Age < 5 OR Age > 18` stops on an **invalid** age. The UNTIL condition describes when to stop, so for validation it is the valid condition.
:::

:::mistake{title="Using FOR when the number of passes is unknown"}
"Keep reading prices until 0 is entered" cannot be a FOR loop, because nobody knows how many prices there will be.
:::

## Exam tips

:::exam-tip
When asked to *rewrite* a loop as another type, keep the behaviour the same: a FOR loop rewritten as WHILE needs the counter set before the loop and increased inside it.
:::

:::exam-tip
When asked to *explain* your choice of loop, use the key ideas: known number of repetitions (FOR), condition checked before so it may not run (WHILE), condition checked after so it runs at least once (REPEAT).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC calls loops "repetition" structures and asks learners to apply and dry-run them in Form 2. In Python `for i in range(1, 11)` runs for 1 to 10 (the end value is not included) and there is no REPEAT … UNTIL, so a `while` loop is used; Visual Basic has `For … Next`, `Do While … Loop` and `Do … Loop Until`. Cambridge 0478 uses the three pseudocode loops in this lesson, nested up to three levels.
:::

## Summary

:::summary
- FOR loops repeat a known number of times; STEP sets the change in the counter, and can be negative.
- WHILE loops test the condition first and may run zero times; they stop when the condition is FALSE.
- REPEAT … UNTIL loops test the condition last, always run at least once and stop when the condition is TRUE.
- Something inside a condition-controlled loop must change the condition, or it becomes an infinite loop.
- In nested loops the inner loop runs fully on every pass of the outer loop; total passes = product of the counts.
:::
