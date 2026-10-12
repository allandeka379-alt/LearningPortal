---
{
  "key": "sdlc.testing-maintenance",
  "title": "Testing, errors and maintenance",
  "summary": "Syntax, logic and run-time errors and how to find them, dry runs and walkthroughs, white-box and black-box, alpha, beta, acceptance, integration and stub testing, normal, abnormal and extreme test data, test strategies and plans, and corrective, adaptive and perfective maintenance.",
  "concepts": ["acs.sdlc.testing-maintenance"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

A programmer in Harare writes a program that finds a class average. It runs without any message, and prints 50.0. The teacher, who worked out 65 by hand, does not trust it. Who is right? Only testing can tell. The programmer was lucky: the program gave a wrong answer in front of someone who knew the right one. Most faults are found only if somebody deliberately looks for them.

This lesson covers the kinds of **error** in a program, the ways of finding them, the types of **testing** and **test data**, how testing is planned, and how a program is **maintained** after it has been delivered. Testing cannot prove that a program has no faults; it can only show that tests have not found any.

You should know what a trace table is and be able to read short Python or pseudocode programs.

## Key definitions

:::definition{term="Syntax error"}
A mistake in the rules of the language, such as a missing colon or bracket. The translator reports it and the program does not run.
:::

:::definition{term="Logic error"}
A mistake in the algorithm. The program runs but gives a wrong result.
:::

:::definition{term="Run-time error"}
An error that occurs while the program is running, such as division by zero or opening a file that does not exist, which makes the program stop.
:::

:::definition{term="Test plan"}
A document listing each test: its purpose, the test data, the expected result, the actual result and whether the test passed.
:::

## Types of error

**Syntax errors** are the easiest to find because the translator points to them. For example `for i in range(3)` without a colon gives a `SyntaxError` and the program does not start.

```python
for i in range(3)
    print(i)
```

**Run-time errors** appear only when the program runs, usually for particular data. This program fails for an empty list because it divides by zero. Python reports `ZeroDivisionError: division by zero`.

```python
marks = []
total = 0
count = len(marks)
average = total / count
print(average)
```

**Logic errors** are the hardest to find because the program runs without any message. This program should find the average of four marks, but the loop starts at index 1 instead of 0.

```python
marks = [60, 72, 48, 80]
total = 0
for i in range(1, len(marks)):
    total = total + marks[i]
average = total / len(marks)
print("Average:", average)
```

```
Average: 50.0
```

:::worked-solution{title="Finding the logic error with a dry run"}
A **dry run** follows the program by hand with a trace table. The marks are 60, 72, 48 and 80.

| i | marks[i] | total |
|:-:|:-:|:-:|
|  |  | 0 |
| 1 | 72 | 72 |
| 2 | 48 | 120 |
| 3 | 80 | 200 |

1. The loop runs for `i` = 1, 2 and 3, so `marks[0]` (the 60) is never added.
2. The total is 200 instead of 260.
3. The program divides by `len(marks)` = 4 and prints 50.0 instead of 65.0.
4. The correction is to start the loop at `range(0, len(marks))`. With this change the total is 260 and the output is as follows.

```python
marks = [60, 72, 48, 80]
total = 0
for i in range(0, len(marks)):
    total = total + marks[i]
average = total / len(marks)
print("Average:", average)
```

```
Average: 65.0
```
:::

## Methods of finding errors

- **Dry run**: following the program by hand with test data and a trace table.
- **Walkthrough**: the programmer explains the code step by step to colleagues who look for errors.
- **Translator error messages**: line numbers and messages for syntax errors.
- **Debugging tools**: breakpoints, stepping through the code one line at a time and watching variables.
- **White-box testing**: tests are chosen by looking at the **code**, so that every path (each branch of every selection and loop) is run.
- **Black-box testing**: tests are chosen from the **specification** only, without looking at the code, by checking that inputs give the expected outputs.

## Stages of testing

| Type | What is tested | Who |
|---|---|---|
| Module (unit) testing | Each procedure or function on its own | Programmer |
| Stub testing | A module that calls modules not yet written; a **stub** is a simple stand-in that returns a fixed value | Programmer |
| Integration testing | The modules joined together | Programmer or tester |
| Alpha testing | The nearly finished program, by the developers' own staff in-house | Developer's team |
| Beta testing | A release to a few real users in their own setting, who report faults | Selected users |
| Acceptance testing | The customer tests the system against the requirements and agrees (or refuses) to accept it | Customer |

## Test data

Test data is chosen from three types.

- **Normal** data is valid data that the program should accept.
- **Abnormal** data is invalid data that the program should reject (including values just outside the range and data of the wrong type).
- **Extreme** (boundary) data is valid data at the very edge of the allowed range.

The rule is that a mark must be a whole number from 0 to 100 inclusive. This function was run with each test value to find the expected results.

```python
def check(mark):
    if type(mark) is not int:
        return "rejected"
    if mark >= 0 and mark <= 100:
        return "accepted"
    return "rejected"
```

| Type of test data | Test value | Expected result |
|:-:|:-:|:-:|
| Normal | 57 | accepted |
| Extreme (boundary) | 0 | accepted |
| Extreme (boundary) | 100 | accepted |
| Abnormal | -1 | rejected |
| Abnormal | 101 | rejected |
| Abnormal | "abc" | rejected |

The two boundary values, 0 and 100, are accepted, and the values just outside, -1 and 101, are rejected. Boundary data is important because the most common mistake is writing `<` where `<=` is needed.

## The test strategy and test plan

A **test strategy** is the overall approach: which kinds of testing will be done, in what order, by whom, with what tools, and what counts as success. A **test plan** is a detailed list of the individual tests.

| Test | Purpose | Test data | Expected result | Actual result | Pass? |
|:-:|:-:|:-:|:-:|:-:|:-:|
| 1 | Normal mark accepted | 57 | accepted |  |  |
| 2 | Lower boundary accepted | 0 | accepted |  |  |
| 3 | Upper boundary accepted | 100 | accepted |  |  |
| 4 | Just below range rejected | -1 | rejected with message |  |  |
| 5 | Just above range rejected | 101 | rejected with message |  |  |
| 6 | Wrong type rejected | abc | rejected with message |  |  |

The first four columns are written **before** the tests are run (so that the expected results are not influenced by what the program does); the last two columns are filled in during testing. If a test fails, the fault is corrected and the tests are repeated.

## Maintenance

After the program is delivered it must be maintained.

| Type | Purpose | Example |
|---|---|---|
| Corrective | Fix faults found after delivery | Correct a total that is wrong when the list is empty |
| Adaptive | Change the program because its environment changes | Update to a new tax rate or a new version of the operating system |
| Perfective | Improve the program, or add a feature, although it works correctly | Make a report run faster or add a new menu option |

To **amend** an existing program the programmer reads the documentation and the code to understand it, makes the change, tests the change, and then **repeats the earlier tests** to make sure nothing else has stopped working (regression testing).

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the three error types, dry runs and walkthroughs, white-box and black-box testing, normal, abnormal and extreme test data, test plans, and the three types of maintenance. Cambridge also names alpha, beta, acceptance, integration and stub testing and asks for a test strategy and test plan. ZIMSEC includes these stages within its testing and implementation stages.
:::

## Common mistakes

:::mistake{title="Calling a wrong answer a syntax error"}
A program that runs and gives a wrong result has a **logic** error. A syntax error stops the program before it starts.
:::

:::mistake{title="Using only normal data"}
Normal data alone does not test the limits. Always include boundary values and invalid values.
:::

:::mistake{title="Writing the expected result after the test"}
The expected result must come from the specification, before the test is run. If it is copied from the program's output, a wrong program would appear to pass.
:::

:::mistake{title="Confusing alpha and beta testing"}
Alpha testing is done in-house by the developers' staff. Beta testing is done by selected real users outside the development team.
:::

## Exam tips

:::exam-tip
Paper 1 for both boards, and Cambridge Paper 2 (topic 12). "**State** the type of error" needs the exact name and a reason from the code. "**Complete** the test plan" needs test data of each type with the **expected** result. For "**describe** the maintenance", name the type (corrective, adaptive or perfective) and tie it to the reason.
:::

:::exam-tip
To choose test data for a range, write one normal value, the two boundary values, and values just outside each boundary, plus one of the wrong type. Give the expected result of each.
:::

## Summary

:::summary
- Syntax errors stop the program starting; logic errors give wrong results; run-time errors stop the program while it runs.
- Find errors with a dry run and trace table, a walkthrough, debugging tools, white-box tests (from the code) and black-box tests (from the specification).
- Stages: module, stub, integration, alpha, beta and acceptance testing.
- Test data: normal, abnormal and extreme (boundary); the expected results come from the specification.
- Maintenance is corrective (faults), adaptive (changed environment) or perfective (improvement); retest after every change.
:::
