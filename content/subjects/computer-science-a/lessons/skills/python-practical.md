---
{
  "key": "skills.python-practical",
  "title": "Practical programming in Python: planning, coding, testing and evidence",
  "summary": "Planning a program from a scenario, designing it in pseudocode, writing console-mode Python in functions with safe input, testing with a plan of normal, boundary and abnormal data, debugging a boundary fault and keeping evidence.",
  "concepts": [
    "acs.skills.python-practical"
  ],
  "estimatedMinutes": 60,
  "level": "core"
}
---
## Introduction

In the practical papers you are not asked to describe a program; you must write one that works. Cambridge Paper 4 and ZIMSEC Paper 2 give you a scenario and a computer, and the marks go to a program that does what the scenario asks, handles the awkward inputs, is tested and is easy to read. Writing such a program is a skill with a routine: plan the program, design it in pseudocode, write the Python in small functions, test it with chosen data, find and fix the faults, and keep the evidence. In the written papers the same routine appears as questions on test data, trace tables and writing code on paper.

This lesson follows one small task from the scenario to the evidence. Every program and every test result was produced by running the code. You should know the programming constructs from the earlier lessons.

## Key definitions

:::definition{term="Test plan"}
A table prepared before testing that lists each test, its purpose, the input, and the expected result, with a column for the actual result and the outcome.
:::

:::definition{term="Normal, boundary and abnormal data"}
Normal data is valid and typical. Boundary (extreme) data is at the limits of what is valid. Abnormal (erroneous) data should be rejected.
:::

:::definition{term="Debugging"}
Finding and correcting the faults in a program, by comparing the actual results of tests with the expected ones, tracing the code, and printing the values of variables.
:::

## Step 1: plan from the scenario

Read the scenario twice and make a plan before writing code. For the task "a teacher enters the marks of a test until -1 and wants a summary", the plan is:

| Part of the plan | For the marks program |
|:-:|:-:|
| Problem | A teacher enters the marks of a test until she types -1 and wants a summary |
| Inputs | Marks as whole numbers from 0 to 100, ended by -1 |
| Processing | Check each mark; count the valid marks; total them; find the highest; count the passes (50 or more); work out the average |
| Outputs | Number of marks, average (1 decimal place), highest mark, number of passes; a message if no marks were entered |
| Data to store | A list of the valid marks |
| Possible problems | Text instead of a number; marks outside 0 to 100; no marks at all (division by zero) |

The last row is the most useful: listing what could go wrong tells you which tests you will need.

## Step 2: design in pseudocode

The pseudocode divides the problem into subroutines, each with one job. This is the design of the main parts (reading a valid mark, analysing the list):

```
FUNCTION ReadMark() RETURNS INTEGER
    REPEAT
        OUTPUT "Enter a mark (0 to 100, or -1 to finish)"
        INPUT Mark
        IF Mark <> -1 AND (Mark < 0 OR Mark > 100) THEN
            OUTPUT "Mark must be from 0 to 100"
        ENDIF
    UNTIL Mark = -1 OR (Mark >= 0 AND Mark <= 100)
    RETURN Mark
ENDFUNCTION
```

The Python version needs one extra step that the pseudocode hides: the text typed must be converted to a number, and the conversion can fail.

## Step 3: write the Python

Console-mode Python, with these habits: meaningful names, one job per function, safe input with `try/except`, no global variables, and a short comment where the code is not obvious.

:::worked-solution{title="The marks program, run with awkward input"}
```python
def read_mark():
    while True:
        print("Enter a mark (0 to 100, or -1 to finish)")
        text = input()
        try:
            mark = int(text)
        except ValueError:
            print("Please enter a whole number")
            continue
        if mark == -1 or 0 <= mark <= 100:
            return mark
        print("Mark must be from 0 to 100")


def analyse(marks):
    total = 0
    highest = marks[0]
    passes = 0
    for mark in marks:
        total = total + mark
        if mark > highest:
            highest = mark
        if mark >= 50:
            passes = passes + 1
    return len(marks), total / len(marks), highest, passes


def main():
    marks = []
    mark = read_mark()
    while mark != -1:
        marks.append(mark)
        mark = read_mark()
    if len(marks) == 0:
        print("No marks entered")
    else:
        count, average, highest, passes = analyse(marks)
        print("Marks entered:", count)
        print("Average:", round(average, 1))
        print("Highest:", highest)
        print("Passes:", passes)


main()
```

The inputs typed were 56, 71, abc, 120, 45, 88, 50 and -1. The program prints a prompt each time, so the lines of results and messages are:

```
Please enter a whole number
Mark must be from 0 to 100
Marks entered: 5
Average: 62.0
Highest: 88
Passes: 4
```

The text `abc` could not be converted, so the program printed a message and asked again instead of crashing. Python's own message for that failure, captured by running it, is `invalid literal for int() with base 10: 'abc'`. The mark 120 was rejected as out of range. The five valid marks are 56, 71, 45, 88 and 50, whose total is 310, so the average is 62.0; the highest is 88; and four marks (56, 71, 88 and 50) are passes.
:::

## Step 4: test with a plan

The test plan was written from the list of possible problems. Normal data is tested, then the boundary values 0, 50 and 100 and the end marker, then abnormal inputs. The expected results were worked out by hand first; the actual results come from running the program.

| Test | Purpose | Input | Expected result | Actual result | Outcome |
|:-:|:-:|:-:|:-:|:-:|:-:|
| T1 | Normal data | 56, 71, 45, 88, 50, -1 | Marks entered: 5; Average: 62.0; Highest: 88; Passes: 4 | Marks entered: 5; Average: 62.0; Highest: 88; Passes: 4 | Pass |
| T2 | Boundary: smallest and largest valid marks | 0, 100, -1 | Marks entered: 2; Average: 50.0; Highest: 100; Passes: 1 | Marks entered: 2; Average: 50.0; Highest: 100; Passes: 1 | Pass |
| T3 | Boundary: the pass mark | 50, -1 | Marks entered: 1; Average: 50.0; Highest: 50; Passes: 1 | Marks entered: 1; Average: 50.0; Highest: 50; Passes: 1 | Pass |
| T4 | Extreme: no marks entered | -1 | No marks entered | No marks entered | Pass |
| T5 | Abnormal: text, and marks out of range | abc, 101, -2, 60, -1 | Please enter a whole number; Mark must be from 0 to 100; Mark must be from 0 to 100; Marks entered: 1; Average: 60.0; Highest: 60; Passes: 1 | Please enter a whole number; Mark must be from 0 to 100; Mark must be from 0 to 100; Marks entered: 1; Average: 60.0; Highest: 60; Passes: 1 | Pass |

All five tests gave the expected results. Test T3 was included on purpose: the pass mark 50 is a boundary, and mistakes between `>` and `>=` appear only there. Test T4 checks the case that would divide by zero.

## Step 5: debugging

A programmer who wrote `if mark > 50` instead of `if mark >= 50` would find that tests T1 and T3 fail, because they contain the mark 50, while the other tests still pass. Test T3 shows the fault most clearly:

:::worked-solution{title="Finding a boundary fault"}
Running the faulty version on test T3 (the input 50 and -1) printed:

```
Marks entered: 1
Average: 50.0
Highest: 50
Passes: 0
```

The expected line is `Passes: 1`. The fault is that 50 is not counted as a pass. To find it: compare each line with the expected result (only `Passes` differs), look for the code that produces that line (the `if` in `analyse`), and check the comparison against the specification, "50 or more". The correction is to change `>` to `>=`, after which every test is run again.
:::

Other debugging techniques are to add temporary `print` statements to show a variable, to trace the code with a trace table, and to test one function on its own.

## Step 6: keep the evidence

Marks in the practical papers are given for evidence: the program listing (readable, with comments and good names), screenshots of the program running with test data (the screen showing the input and the output), the test plan with expected and actual results, and any changes made after a fault was found. Comments should say *why*, and each function can have a short description at the top.

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC Paper 2 (and the project in Paper 4) and Cambridge Paper 4 are practical papers done on a computer in Python, Java or Visual Basic (Python is used here). Cambridge Paper 4 covers the A Level topics of file processing, classes, recursion and data structures; ZIMSEC Paper 2 adds algorithm design, arrays, files and SQL. The written papers test the same skills on paper. The routine of planning, designing, coding, testing and keeping evidence applies to both.
:::

## Common mistakes

:::mistake{title="Not converting input"}
`input()` returns text. Convert it with `int()` or `float()`, inside a `try` block if the data may be wrong.
:::

:::mistake{title="Testing only normal data"}
A program that works for normal data may fail at a boundary or on text. Include boundary, extreme and abnormal tests, with the expected results written first.
:::

:::mistake{title="Dividing by a count that may be zero"}
Check that at least one value was entered before calculating an average.
:::

:::mistake{title="Writing the expected result after seeing the output"}
Work out the expected result from the specification before running the test, or the test proves nothing.
:::

## Exam tips

:::exam-tip
In the practical papers, read the scenario for every output required and tick them off at the end. Validate input where the scenario says to, use functions, and test your program with the data in the question before the last few minutes. In written questions you may be asked to **choose test data** (normal, boundary, abnormal with the expected result for each), **identify** and **correct an error** in a Python program, or **complete** a function.
:::

:::exam-tip
Save your program often and keep the screenshots of your test runs, which are usually part of what is marked.
:::

## Summary

:::summary
- Work in steps: plan from the scenario, design in pseudocode, write Python in functions, test, debug, keep the evidence.
- Read input safely: convert with `int()` or `float()` in a `try` block and ask again after a failure.
- A test plan has the test, its purpose, the input, the expected result worked out in advance, the actual result and the outcome.
- Test normal, boundary and abnormal data, and the case with no data.
- Find faults by comparing actual and expected results, tracing, and printing variables; fix and re-run all the tests.
- Keep the listing, screenshots of test runs and the completed test plan as evidence.
:::
