---
{
  "key": "algorithms.errors-debugging",
  "title": "Finding and correcting errors in algorithms",
  "summary": "The three types of program error (syntax, logic and run-time); how to identify errors in a given algorithm and suggest corrections; debugging techniques such as dry runs, breakpoints, stepping and watching variables; and simple error handling.",
  "concepts": ["comp.algorithms.errors-debugging"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Very few programs work perfectly the first time they are written. A teacher in Gweru writes a program to average her class's marks and finds that it says the average is 3 when it should be about 60. A cashier's program in Harare stops with an error message whenever no sales have been made. Finding and fixing faults like these is called **debugging**, and it takes up a large part of every programmer's time.

Cambridge Paper 2 almost always includes a question that gives you an algorithm containing errors, with numbered lines, and asks you to identify each error and write the corrected line. ZIMSEC asks you to identify types of errors, to correct errors in an algorithm and to apply error-handling techniques. The skills in this lesson turn those questions into reliable marks.

## Key definitions

:::definition{term="Syntax error"}
An error that breaks the grammar rules of the programming language, such as a misspelt keyword or a missing `ENDIF`; the translator reports it and the program cannot be run until it is corrected.
:::

:::definition{term="Logic error"}
An error in the design of the algorithm that lets the program run but makes it produce the wrong result, such as using `<` instead of `>`.
:::

:::definition{term="Run-time error"}
An error that happens while the program is running and makes it stop unexpectedly (crash), such as dividing by zero or using an array index that does not exist.
:::

:::definition{term="Debugging"}
The process of finding, locating and correcting errors in a program.
:::

## The three types of error

| Type | When it shows | Examples | How it is found |
|:--|:--|:--|:--|
| Syntax | Before the program runs (during translation) | `OUPUT Total`; `IF` without `ENDIF`; missing bracket | The compiler or interpreter reports it, usually with a line number |
| Logic | While the program runs, as wrong output | `Total ← Number` instead of `Total ← Total + Number`; `<` instead of `<=`; dividing by the wrong count | Testing with known results; dry runs and trace tables |
| Run-time | While the program runs, as a crash | Division by zero; array index out of range; opening a file that does not exist; running out of memory | The program stops with an error message; testing with abnormal data |

A logic error is the hardest to find, because the program gives no warning: it simply produces wrong answers. That is why every program must be tested with data whose correct results are already known.

## Finding errors in a given algorithm

When a question gives you an algorithm with errors, work methodically:

1. Read the description of what the algorithm **should** do.
2. Check each standard part: are totals and counters initialised before the loop? Is the loop the right length? Does the loop variable in `NEXT` match the `FOR`? Are the comparison operators the right way round? Is the average divided by the right value? Is everything output that should be?
3. Dry-run it with a few simple values whose answers you know.
4. For each error, give the **line number**, describe the error, and write the **whole corrected line** in pseudocode.

:::worked-solution[Identify and correct four errors]
This algorithm should input 20 positive numbers, then output their average and the highest number.

```
1   Total ← 0
2   Highest ← 0
3   FOR Count ← 1 TO 20
4       INPUT Number
5       Total ← Number
6       IF Number < Highest
7           THEN
8               Highest ← Number
9       ENDIF
10  NEXT Number
11  Average ← Total / Count
12  OUTPUT Average, " ", Highest
```

| Line | Error | Correction |
|:-:|:--|:--|
| 5 | The total is replaced, not added to | `Total ← Total + Number` |
| 6 | The comparison finds smaller numbers, not the highest | `IF Number > Highest` |
| 10 | The loop variable is `Count`, not `Number` | `NEXT Count` |
| 11 | The value of `Count` after the loop should not be relied on; the total must be divided by the number of values | `Average ← Total / 20` |

1. Lines 1 and 2 are correct: the total starts at 0, and because the numbers are positive, 0 is a safe starting value for `Highest`.
2. Line 5 would leave only the last number in `Total`. This is a logic error.
3. Line 6 with `<` never replaces 0 with a positive number, so the output would always be 0. This is a logic error.
4. Line 10 does not match the `FOR` on line 3, which breaks the syntax of a count-controlled loop.
5. Line 11 should divide by 20, the number of values input.
:::

## Run-time errors and simple error handling

Run-time errors often come from data the programmer did not expect. Good programs prevent them before they happen:

- check that a divisor is not zero before dividing;
- validate input so that only sensible values are processed;
- check that an array index is within the declared bounds before using it;
- check that a file exists before reading it.

:::worked-solution[A crash caused by a missing statement]
This algorithm should output the average of marks entered until -1 is typed.

```
Count ← 0
Total ← 0
INPUT Mark
WHILE Mark <> -1 DO
    Total ← Total + Mark
    INPUT Mark
ENDWHILE
OUTPUT Total / Count
```

1. Dry-run with 60, 70, -1: `Total` becomes 60, then 130. `Count` is never changed, so it is still 0.
2. The last line calculates 130 ÷ 0, a **division by zero**, so the program stops with a run-time error.
3. Correction: add `Count ← Count + 1` inside the loop, after `Total ← Total + Mark`.
4. Even with that fix, if the first input is -1 then `Count` is 0. Protect the division: `IF Count > 0 THEN OUTPUT Total / Count ELSE OUTPUT "No marks entered" ENDIF`.
:::

Many languages also let a program **catch** a run-time error instead of crashing. In Python this is done with `try` and `except`:

```python
while True:
    try:
        meals = int(input("How many meals? "))
        break
    except ValueError:
        print("Please enter a whole number")
print("You ordered", meals, "meals")
```

When the user types `two` and then `2`, the screen shows (the typed inputs are not repeated here):

```
How many meals? Please enter a whole number
How many meals? You ordered 2 meals
```

Converting `"two"` to a whole number raises a `ValueError`; instead of crashing, the program shows a message and asks again.

## Debugging techniques

| Technique | How it helps |
|:--|:--|
| Dry run with a trace table | Shows the value of every variable at each step, so you can see where the values first go wrong |
| Breakpoints | Pause the program at a chosen line so the values at that moment can be inspected |
| Stepping (single-step) | Runs the program one line at a time, so the path through the code can be followed |
| Watching variables | Displays chosen variables' values as they change while the program runs |
| Extra `OUTPUT` statements | Temporarily print values at key points to check them (removed afterwards) |
| Error diagnostics | The translator's messages give the line and type of a syntax error |
| Testing with known results | Normal, abnormal, extreme and boundary data with expected results show which cases fail |

Breakpoints, stepping, variable watches and error diagnostics are features of an **integrated development environment** (IDE).

## Common mistakes

:::mistake{title="Describing the error without correcting it"}
"Line 5 is wrong" scores nothing. Give the line number, say what is wrong, and write the full corrected line, such as `Total ← Total + Number`.
:::

:::mistake{title="Calling every error a syntax error"}
If the program would run but give a wrong answer, the error is a **logic** error, even if it is only one character such as `<` for `>`.
:::

:::mistake{title="Rewriting the whole algorithm"}
When asked to correct errors, change only the faulty lines. Rewriting correct lines wastes time and can introduce new errors.
:::

## Exam tips

:::exam-tip
Check the usual suspects first: initial values, the `FOR … NEXT` variable, loop limits (`<` versus `<=`), `+ 1` on counters, the direction of comparisons, what the average is divided by, and whether results are output.
:::

:::exam-tip
When a question asks you to "suggest a correction", make it work for all data, not just the example given. For a division, think about what happens if the count is zero.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge 0478 asks you to identify errors in given algorithms and suggest corrections (topic 7.8). ZIMSEC (Form 3 programming) also asks you to identify the types of error and apply error-handling techniques, which in Visual Basic or Python include catching exceptions, as in the `try … except` example above.
:::

## Summary

:::summary
- Syntax errors break the language's rules and stop the program from being translated.
- Logic errors give wrong results without any warning; they are found by testing and dry runs.
- Run-time errors crash a running program: division by zero, index out of range, missing file.
- To correct an algorithm, give the line number, the error and the full corrected line.
- Debugging tools: trace tables, breakpoints, stepping, variable watches, extra outputs, error diagnostics.
- Prevent run-time errors by validating input and checking before dividing or indexing; some languages can catch errors with `try … except`.
:::
