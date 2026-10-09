---
{
  "key": "algorithms.scenario-problems",
  "title": "Writing algorithms for scenario questions",
  "summary": "A step-by-step method for writing complete algorithms for described problems: reading the requirements, planning the data structures, combining input and validation with loops, selection, arrays, totals and output, and checking the answer against the requirements, as needed for the Cambridge 15-mark scenario question and ZIMSEC project-style tasks.",
  "concepts": ["comp.algorithms.scenario-problems"],
  "estimatedMinutes": 60,
  "level": "core"
}
---
## Introduction

The last question on Cambridge Paper 2 describes a real-looking problem (a sports day, a shop's stock, a class's test results) and asks you to write a complete program for it. It is worth 15 marks, about a fifth of the paper, and you have roughly 30 minutes. ZIMSEC learners face a similar challenge in their Form 4 project, where a program must be designed and coded from a written brief.

These questions do not test any new topic. They test whether you can **combine** everything else: variables, arrays, loops, selection, validation, totalling, counting, finding the maximum or minimum, and clear output. Students who have learned each piece separately often lose marks because they do not plan. This lesson gives you a method that works every time.

## Key definitions

:::definition{term="Requirement"}
One thing that the program must do, as stated in the scenario; each requirement usually earns marks of its own.
:::

:::definition{term="Parallel arrays"}
Two or more arrays in which the elements at the same index belong to the same item, such as `Athletes[5]` and `Times[5, 1]` both referring to the fifth athlete.
:::

:::definition{term="Two-dimensional array"}
An array with rows and columns, whose elements are identified by two indexes, such as `Times[Athlete, Run]`.
:::

## Step 1: read and list the requirements

Read the scenario twice. Underline every verb that asks for something: *input*, *validate*, *store*, *calculate*, *find*, *output*. Then write the requirements as a numbered list in the margin. Note exactly:

- which arrays already exist, their names, sizes and data types (use these names exactly; you must not rename them);
- whether "all inputs must be validated", and the valid range for each input;
- what must be output, and in what format (for example "to two decimal places" or "with a suitable message").

## Step 2: plan the data

Decide which variables you need: totals, counters, the current maximum or minimum and where it was found, loop counters. Give each a meaningful name and a data type. Declaring them at the start of your answer shows the examiner your plan and earns credit.

## Step 3: build the structure

Most scenarios follow the same shape:

1. Declarations and initial values (totals and counters to 0; minimum to a high value or the first value).
2. An outer loop over the items (athletes, products, learners).
3. Inside it, an inner loop over the parts of each item (runs, days, tests), with input and **validation** of each value.
4. Calculations for the item (its total and average), then comparisons that update overall results (the fastest, the count selected).
5. Output for the item, if required.
6. After the loops, the overall output.

## Step 4: check against the requirements

Go back to your list and tick each requirement against a line of your answer. Check every loop's limits match the array sizes, every total is initialised, and every output has a message.

:::example{title="A complete answer: athletics trials"}
**Scenario.** A school in Masvingo holds trials for its athletics team. The names of 20 athletes are stored in the array `Athletes[1:20]`. The two-dimensional array `Times[1:20, 1:3]` has been declared to hold each athlete's times for three 100 m runs. Write a program that:

- inputs and stores the three times for each athlete; each time must be from 9.5 to 25.0 seconds inclusive; all inputs must be validated;
- calculates each athlete's average time and outputs their name with the average to two decimal places;
- finds and outputs the name and average of the fastest athlete (the lowest average);
- counts and outputs how many athletes have an average under 13.0 seconds.

**Model answer.**

```
DECLARE Athlete : INTEGER
DECLARE Run : INTEGER
DECLARE Total : REAL
DECLARE AverageTime : REAL
DECLARE FastestAverage : REAL
DECLARE FastestName : STRING
DECLARE Selected : INTEGER

FastestAverage ← 999
Selected ← 0
FOR Athlete ← 1 TO 20
    Total ← 0
    FOR Run ← 1 TO 3
        REPEAT
            OUTPUT "Enter time ", Run, " for ", Athletes[Athlete]
            INPUT Times[Athlete, Run]
            IF Times[Athlete, Run] < 9.5 OR Times[Athlete, Run] > 25.0
                THEN
                    OUTPUT "Time must be from 9.5 to 25.0 seconds"
            ENDIF
        UNTIL Times[Athlete, Run] >= 9.5 AND Times[Athlete, Run] <= 25.0
        Total ← Total + Times[Athlete, Run]
    NEXT Run
    AverageTime ← Total / 3
    OUTPUT Athletes[Athlete], " average time: ", ROUND(AverageTime, 2)
    IF AverageTime < FastestAverage
        THEN
            FastestAverage ← AverageTime
            FastestName ← Athletes[Athlete]
    ENDIF
    IF AverageTime < 13.0
        THEN
            Selected ← Selected + 1
    ENDIF
NEXT Athlete
OUTPUT "Fastest athlete: ", FastestName, " with ", ROUND(FastestAverage, 2), " seconds"
OUTPUT "Number with an average under 13.0 seconds: ", Selected
```

**Checking it against the requirements.**

| Requirement | Where it is met |
|:--|:--|
| Input and store three times per athlete | Nested `FOR` loops; `INPUT Times[Athlete, Run]` |
| Validate each time | `REPEAT … UNTIL` with the range 9.5 to 25.0 and an error message |
| Average per athlete, to 2 decimal places | `Total ← 0` before the inner loop, `Total / 3` after it, `ROUND(AverageTime, 2)` |
| Fastest athlete | `FastestAverage` starts at 999; replaced by any lower average, with the name stored too |
| Count under 13.0 | `Selected ← 0` before the loops; `+ 1` inside an `IF` |
| Use of the given arrays | `Athletes` and `Times` used with the correct indexes and limits |
:::

Notice that `Total ← 0` is **inside** the outer loop but **before** the inner loop: each athlete needs a fresh total. This placement is one of the most common places to lose a mark.

## Working with two-dimensional arrays

Nested loops are the natural way to process a two-dimensional array: the outer loop picks the row, the inner loop moves along the columns.

:::worked-solution[Totalling each row of a 2D array]
A sports day stores points in `Points[1:3, 1:3]`: three houses (rows) in three events (columns).

| House | Event 1 | Event 2 | Event 3 |
|:-:|:-:|:-:|:-:|
| 1 | 8 | 5 | 7 |
| 2 | 6 | 9 | 4 |
| 3 | 5 | 6 | 9 |

```
FOR House ← 1 TO 3
    HouseTotal ← 0
    FOR Event ← 1 TO 3
        HouseTotal ← HouseTotal + Points[House, Event]
    NEXT Event
    OUTPUT "House ", House, ": ", HouseTotal
NEXT House
```

| House | Event | HouseTotal | OUTPUT |
|:-:|:-:|:-:|:-:|
| 1 |  | 0 |  |
|  | 1 | 8 |  |
|  | 2 | 13 |  |
|  | 3 | 20 |  |
|  |  |  | House 1: 20 |
| 2 |  | 0 |  |
|  | 1 | 6 |  |
|  | 2 | 15 |  |
|  | 3 | 19 |  |
|  |  |  | House 2: 19 |
| 3 |  | 0 |  |
|  | 1 | 5 |  |
|  | 2 | 11 |  |
|  | 3 | 20 |  |
|  |  |  | House 3: 20 |

1. The inner loop runs completely (three events) for every pass of the outer loop.
2. `HouseTotal` is reset to 0 at the start of each house, before the inner loop.
3. The output for each house comes after its inner loop has finished.
:::

## Writing in program code

Cambridge allows the 15-mark scenario to be answered in pseudocode, Python, Visual Basic or Java; everywhere else in Paper 2 code must be pseudocode. Whatever you choose, use one language consistently, and remember that Python lists start at index 0 unless you plan around it. ZIMSEC projects are coded in a high-level language, usually Visual Basic or Python, from a design written in pseudocode first.

## Common mistakes

:::mistake{title="Renaming or redeclaring the given arrays"}
If the scenario says the names are in `Athletes[1:20]`, use exactly that name and size. Declaring a new array of names, or reading the names in again, wastes time and may lose the "uses the given arrays" marks.
:::

:::mistake{title="Validating with IF instead of a loop"}
An `IF` rejects one bad value but accepts a second bad value. Use `REPEAT … UNTIL` or `WHILE` so the input repeats until it is valid.
:::

:::mistake{title="Forgetting the output format"}
If the question asks for averages to two decimal places, use `ROUND(…, 2)`. If it asks for the name of the fastest athlete, output the name, not the index.
:::

## Exam tips

:::exam-tip
Marks are awarded for the parts of the algorithm, not only for a perfect whole. Even if you cannot finish, write the declarations, the loops with input and validation, and the outputs: each earns marks on its own.
:::

:::exam-tip
Use comments (`// validate the time`) to show which requirement each section meets, and indent consistently; a clear structure helps the examiner find your creditworthy steps.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
The Cambridge 0478 Paper 2 ends with a 15-mark scenario of about 30 minutes, marked against levels and points: data structures, input with validation, loops, calculations, selection and output. ZIMSEC tests the same skills through programming questions in Paper 2 and through the Form 4 project, where a program is designed and coded from pre-release material.
:::

## Summary

:::summary
- List every requirement before you write: inputs, validation rules, calculations and outputs.
- Plan the data: use the given arrays exactly; declare totals, counters, maximum/minimum and loop variables.
- Typical structure: initialise, outer loop over items, inner loop with input and validation, per-item calculations and comparisons, output.
- Reset per-item totals inside the outer loop but before the inner loop.
- Check each requirement off against your answer; marks are awarded for each creditworthy part.
:::
